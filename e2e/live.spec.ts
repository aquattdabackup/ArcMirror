import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
const hash = "0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981";

test("owner transaction can be re-verified live and downloaded without mocked requests", async ({ page }) => {
  test.setTimeout(120_000);
  const { expected } = JSON.parse(await readFile(new URL(`../vectors/owner/${hash}.json`, import.meta.url), "utf8"));
  await page.goto(`/tx/${hash}`);
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
