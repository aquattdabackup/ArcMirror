import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { ownerDemos } from "../apps/web/lib/owner-demos";

test("saved owner demos expose original dates and exact mainnet reports", async ({ request }) => {
  for (const demo of ownerDemos) {
    const vector = JSON.parse(readFileSync(new URL(`../vectors/owner/${demo.hash}.json`, import.meta.url), "utf8"));
    const response = await request.get(`/api/analyze/${demo.hash}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.source).toBe("snapshot");
    expect(body.capturedAt).toBe(vector.capturedAt);
    expect(body.provenance).toBe(vector.provenance);
    expect(body.report).toEqual(vector.expected);
  }
});
