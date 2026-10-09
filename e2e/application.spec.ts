import { expect, test, type Download, type Page } from "@playwright/test";
import { readFile, readFileSync } from "node:fs";
import { promisify } from "node:util";
import type { Example } from "../apps/web/lib/examples";

const examples: Example[] = JSON.parse(readFileSync(new URL("../apps/web/lib/snapshots.json", import.meta.url), "utf8"));
const native = examples.find((example) => example.hash === "0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87")!;
const openReport = (page: Page) => page.goto(`/tx/${native.hash}`);
const jsonFile = (value: unknown, name = "report.json") => ({ name, mimeType: "application/json", buffer: Buffer.from(JSON.stringify(value)) });
async function downloadedJson(download: Download) {
  expect(await download.failure()).toBeNull();
  const path = await download.path();
  expect(path).not.toBeNull();
  return JSON.parse(await promisify(readFile)(path!, "utf8"));
}

test("comparison links open eligible log pairs without inventing a native-only comparison", async ({ page }) => {
  const paired = examples[0];
  await page.goto(`/tx/${paired.hash}?compare=1#double-count`);
  const comparison = page.locator("#double-count");
  const toggle = page.getByRole("button", { name: "Hide comparison", exact: true });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(comparison.locator(".naive strong")).toContainText(paired.report.totals.naiveExact!);
  await toggle.click();
  await expect(page.getByRole("button", { name: "Show double-count comparison", exact: true })).toBeVisible();
  await page.reload();
  await expect(toggle).toBeVisible();
  await page.goto(`/tx/${native.hash}?compare=1`);
  await expect(page.getByRole("tab", { name: "Money flow" })).toBeVisible();
  await expect(page.locator("#double-count")).toHaveCount(0);
});

test("evidence tabs support arrows, wrapping, Home/End and focus into the labelled panel", async ({ page }) => {
  await openReport(page);
  const flow = page.getByRole("tab", { name: "Money flow" });
  const logs = page.getByRole("tab", { name: "Source logs" });
  const balances = page.getByRole("tab", { name: "Balance proof" });
  await flow.focus();
  await flow.press("ArrowRight");
  await expect(logs).toBeFocused();
  await expect(logs).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveAccessibleName("Source logs");
  await logs.press("Tab");
  await expect(page.getByRole("tabpanel")).toBeFocused();
  await logs.focus();
  await logs.press("End");
  await expect(balances).toBeFocused();
  await balances.press("ArrowRight");
  await expect(flow).toBeFocused();
  await flow.press("ArrowLeft");
  await expect(balances).toBeFocused();
  await balances.press("Home");
  await expect(flow).toBeFocused();
  await expect(page.getByRole("tabpanel")).toHaveAccessibleName("Money flow");
});

test("downloaded report is the complete captured JSON and can be inspected from disk", async ({ page }) => {
  await openReport(page);
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download JSON", exact: true }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe(`arcmirror-${native.hash}.json`);
  expect(await downloadedJson(download)).toEqual(native.report);
  const path = await download.path();
  await page.goto("/tools/inspect");
  await page.locator("#report-file-A").setInputFiles(path!);
  await expect(page.getByText("Digest matches file contents", { exact: true })).toBeVisible();
});

test("main pages fit the viewport and the header remains reachable while scrolling", async ({ page }, info) => {
  for (const [name, path] of [["home", "/"], ["report", `/tx/${native.hash}`], ["tools", "/tools"]]) {
    await page.goto(path);
    await expect(page.getByRole("main")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`${name}.png`), fullPage: true });
    await page.evaluate(() => window.scrollTo(0, 900));
    await expect.poll(async () => (await page.getByRole("banner").boundingBox())?.y).toBe(0);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  }
});

test("CSV file reconciliation detects exact payment and amount mismatch, then exports evidence", async ({ page }) => {
  const movement = native.report.movements[0];
  const csv = `id,payer,recipient,amount_usdc\npayment-1,${movement.payer},${movement.payee},0.01\n`;
  await page.goto("/tools/reconcile");
  await page.locator("#payout-file").setInputFiles({ name: "payments.csv", mimeType: "text/csv", buffer: Buffer.from(csv) });
  await page.getByLabel("Transaction hash", { exact: true }).fill(native.hash);
  await page.getByRole("button", { name: "Reconcile payments", exact: true }).click();
  await expect(page.getByRole("heading", { name: "1 of 1 expectations matched" })).toBeVisible();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export reconciliation JSON" }).click();
  const exported = await downloadedJson(await pending);
  expect(exported.txHash).toBe(native.hash);
  expect(exported.counts.matched).toBe(1);
  expect(exported.gasExact).toBe("0.00042");
  await page.getByLabel("Or paste CSV").fill(csv.replace(",0.01\n", ",0.02\n"));
  await expect(page.getByRole("region", { name: "Reconciliation results" })).toHaveCount(0);
  await page.getByRole("button", { name: "Reconcile payments", exact: true }).click();
  await expect(page.getByRole("heading", { name: "0 of 1 expectations matched" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("1 amount mismatches");
});

test("Inspector compares real files and detects altered contents without claiming authenticity", async ({ page }) => {
  await page.goto("/tools/inspect");
  await page.locator("#report-file-A").setInputFiles(jsonFile(native.report));
  await page.locator("#report-file-B").setInputFiles(jsonFile(native.report));
  await expect(page.getByRole("heading", { name: "The reports are identical." })).toBeVisible();
  const changed = { ...native.report, gas: { ...native.report.gas, feeExact: "1" } };
  await page.locator("#report-file-B").setInputFiles(jsonFile(changed, "changed.json"));
  await expect(page.getByText("Digest mismatch - contents or digest changed", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "1 changed field", exact: true })).toBeVisible();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export comparison JSON" }).click();
  const exported = await downloadedJson(await pending);
  expect(exported.leftIntegrity).toBe(true);
  expect(exported.rightIntegrity).toBe(false);
  expect(exported.source).toBe("local report B");
  expect(exported.differences).toHaveLength(1);
});

test("Dust Lab preserves one native unit and exports the exact accumulated remainder", async ({ page }) => {
  await page.goto("/tools/dust");
  await page.getByRole("button", { name: "One native unit", exact: true }).click();
  await page.getByLabel("Number of identical movements").fill("1000000");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export calculation JSON" }).click();
  const exported = await downloadedJson(await pending);
  expect(exported.kind).toBe("arcmirror-precision-simulation");
  expect(exported.rawNative18).toBe("1");
  expect(exported.accumulatedDustExact).toBe("0.000000000001");
  expect(exported.totalAfterPerAmountTruncation).toBe("0");
  await page.getByLabel("Number of identical movements").fill("1000001");
  await expect(page.getByRole("alert").filter({ hasText: "Repeat count must be a whole number" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Export calculation JSON" })).toHaveCount(0);
});

test("a simulated RPC outage preserves the visible report and its downloadable evidence", async ({ page }) => {
  await openReport(page);
  // Only this error-path check intercepts a request; it is not mainnet proof.
  await page.route(`**/api/analyze/${native.hash}?live=1`, (route) => route.fulfill({
    status: 503, json: { ok: false, error: { message: "RPC is unavailable. The current report is preserved." } },
  }));
  await page.getByRole("button", { name: "Re-verify live" }).click();
  await expect(page.getByRole("status")).toContainText("The current report is preserved.");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download JSON", exact: true }).click();
  expect(await downloadedJson(await pending)).toEqual(native.report);
});

test("hash entry rejects invalid input and navigates to a saved real transaction", async ({ page }) => {
  await page.goto("/");
  const input = page.getByLabel("Paste an Arc mainnet transaction hash");
  await input.fill("invalid");
  await page.getByRole("button", { name: "Analyze", exact: true }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await input.fill(native.hash);
  await input.press("Enter");
  await expect(page).toHaveURL(new RegExp(`/tx/${native.hash}$`));
  await expect(page.getByRole("tab", { name: "Money flow" })).toBeVisible();
});
