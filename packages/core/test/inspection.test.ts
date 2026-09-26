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
