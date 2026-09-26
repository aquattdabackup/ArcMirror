import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import {
  inspectReportJson,
  REPORT_MAX_BYTES,
} from "../src/inspection";
import { reportDigest } from "../src/index";
import type { Report } from "../src/types";
const vectorDir = new URL("../../../vectors/", import.meta.url);
const reports: Report[] = readdirSync(vectorDir)
  .filter((s) => s.endsWith(".json"))
  .map((s) => JSON.parse(readFileSync(new URL(s, vectorDir), "utf8")).expected);
const base = reports[1];
test("all mainnet exports pass strict shape and digest; whitespace/key order do not matter", () => {
  for (const report of reports) {
    const result = inspectReportJson(
      "\uFEFF" +
        JSON.stringify(
          Object.fromEntries(Object.entries(report).reverse()),
          null,
          2,
        ),
    );
    assert.equal(result.digestMatches, true);
    assert.deepEqual(result.report, report);
  }
});
test("modified content fails old digest, but recomputed digest is only integrity not authenticity", () => {
  const fake = structuredClone(base);
  fake.evidenceLevel = "verified";
  assert.equal(inspectReportJson(JSON.stringify(fake)).digestMatches, false);
  fake.digest = reportDigest(fake);
  assert.equal(inspectReportJson(JSON.stringify(fake)).digestMatches, true);
  assert.notEqual(fake.digest, base.digest);
});
test("rejects malformed, oversized, wrong-chain, future-schema, extra-field and unsafe amount reports", () => {
  for (const value of [
    { ...base, chainId: 5042002 },
    { ...base, schemaVersion: "2" },
    { ...base, extra: true },
    {
      ...base,
      movements: [{ ...base.movements[0], amountNative18: 9007199254740993 }],
    },
    { ...base, totals: { ...base.totals, naiveNative18: "1e30" } },
  ])
    assert.throws(
      () => inspectReportJson(JSON.stringify(value)),
      /Unsupported/,
    );
  assert.throws(() => inspectReportJson("{"), /Invalid JSON/);
  assert.throws(
    () => inspectReportJson(" ".repeat(REPORT_MAX_BYTES + 1)),
    /exceeds/,
  );
});
