import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
const hash = "0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d";

test("homepage owner demo opens the comparison, re-verifies live and downloads without mocked requests", async ({ page }) => {
  test.setTimeout(120_000);
  const { expected } = JSON.parse(await readFile(new URL(`../vectors/owner/${hash}.json`, import.meta.url), "utf8"));
  await page.goto("/");
  await page.getByRole("link", { name: "Explore our 0.001 USDC demo" }).click();
  await expect(page).toHaveURL(`/tx/${hash}?compare=1#double-count`);
  await expect(page.locator("#double-count")).toBeInViewport({ ratio: 0.9 });
  await expect(page.getByRole("button", { name: "Hide comparison" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#double-count")).toContainText("0.002");
  await expect(page.locator("#double-count")).toContainText("0.001");
  await expect(page.locator("#double-count")).toContainText("needs review");
  const request = page.waitForResponse(response => response.url().endsWith(`/api/analyze/${hash}?live=1`));
  await page.getByRole("button", { name: "Re-verify live" }).click();
  const response = await request;
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.source).toBe("live");
  expect(body.report).toEqual(expected);
  await expect(page.getByRole("status")).toContainText("same report digest");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download JSON", exact: true }).click();
  const download = await pending;
  expect(await download.failure()).toBeNull();
  expect(JSON.parse(await readFile((await download.path())!, "utf8"))).toEqual(expected);
});
