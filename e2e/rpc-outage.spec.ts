import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { ownerDemos } from "../apps/web/lib/owner-demos";

// The local Next.js server uses unreachable RPC endpoints via Playwright config.
// No browser request interception: these assertions cover the real API/service path.
test("server RPC outage cannot turn saved owner evidence into a live response", async ({ request }) => {
  for (const demo of ownerDemos) {
    const response = await request.get(`/api/analyze/${demo.hash}?live=1`);
    expect(response.status()).toBe(503);
    const body = await response.json();
    // The envelope contains a valid error report; HTTP/status carry the RPC failure.
    expect(body.source).toBe("live");
    expect(body.report.status).toBe("rpc_error");
    expect(body.report.movements).toEqual([]);
    expect(body.capturedAt).toBeUndefined();
  }
  const response = await request.get(`/api/analyze/0x${"1".repeat(64)}`);
  expect(response.status()).toBe(503);
  expect((await response.json()).report.status).toBe("rpc_error");
});

test("server RPC outage preserves owner success and failure reports, labels and downloads", async ({ page }) => {
  for (const demo of ownerDemos.filter(d => d.id === "erc20" || d.id === "failed")) {
    const vector = JSON.parse(await readFile(new URL(`../vectors/owner/${demo.hash}.json`, import.meta.url), "utf8"));
    await page.goto(`/tx/${demo.hash}`);
    const banner = page.locator(".snapshot-banner");
    await expect(banner).toContainText("Saved mainnet snapshot");
    await expect(banner).toContainText(vector.capturedAt.slice(0, 10));
    await expect(banner).toContainText("Owner-created");
    await expect(page.locator(".metrics")).toContainText(demo.id === "failed" ? "Confirmed failed" : "Confirmed success");
    if (demo.id === "erc20") await expect(page.locator(".report-verdict")).toContainText(/needs review/i);
    const response = page.waitForResponse(r => r.url().endsWith(`/api/analyze/${demo.hash}?live=1`));
    await page.getByRole("button", { name: "Re-verify live" }).click();
    expect((await response).status()).toBe(503);
    await expect(page.getByRole("status")).toContainText("preserved");
    await expect(banner).toContainText("Saved mainnet snapshot");
    const pending = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download JSON", exact: true }).click();
    const download = await pending;
    expect(await download.failure()).toBeNull();
    expect(JSON.parse(await readFile((await download.path())!, "utf8"))).toEqual(vector.expected);
  }
});
