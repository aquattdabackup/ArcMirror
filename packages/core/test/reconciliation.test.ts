import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parsePayoutCsv, reconcilePayouts } from "../src/reconciliation";
import { parseUsdc, precisionBreakdown, MAX_UINT256 } from "../src/precision";
import type { Report } from "../src/types";
const report: Report = JSON.parse(
  readFileSync(
    new URL(
      "../../../vectors/0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f.json",
      import.meta.url,
    ),
    "utf8",
  ),
).expected;
const first = report.movements[0];
const header = "id,payer,recipient,amount_usdc\n";
const line = (id: string, amount = "0.09") =>
  `${id},${first.payer},${first.payee},${amount}`;
test("CSV matches mainnet canonical movements once, preserves evidence grade and excludes gas", () => {
  const csv =
    header +
    report.movements
      .map((m, i) => `${i},${m.payer},${m.payee},${m.amountExact}`)
      .join("\n");
  const result = reconcilePayouts(parsePayoutCsv(csv), report);
  assert.deepEqual(result.counts, {
    expected: 2,
    matched: 2,
    amountMismatch: 0,
    missing: 0,
    unassigned: 0,
  });
  assert.equal(result.matchedTotalExact, "4.499999");
  assert.equal(result.evidenceLevel, "needs_review");
  assert.equal(result.rows[0].movement?.sourceLogIndex, "5");
});
test("duplicate expected rows cannot reuse a movement; genuine duplicate movements can match separately", () => {
  const rows = parsePayoutCsv(header + line("A") + "\n" + line("B"));
  assert.equal(reconcilePayouts(rows, report).counts.matched, 1);
  const doubled = structuredClone(report);
  doubled.movements.push({ ...first, sourceLogIndex: "99" });
  assert.equal(reconcilePayouts(rows, doubled).counts.matched, 2);
});
test("CSV accepts BOM, CRLF and quoted fields, rejects malformed/ambiguous input", () => {
  assert.equal(
    parsePayoutCsv(
      "\uFEFF" + header.replace("\n", "\r\n") + line('"Invoice 1"') + "\r\n",
    )[0].id,
    "Invoice 1",
  );
  for (const csv of [
    header,
    header + line("A") + "\n" + line("A"),
    header + line("=SUM(1)"),
    header + line('"bad'),
    header + line('"A"x'),
    header + line("A", "1e-6"),
    header + line("A", "0"),
    header + line("A", "-1"),
    header + line("A", "0.0000000000000000001"),
    header + line("A").replace(first.payer, "0x123"),
    header + line("A") + ",extra",
    header + Array.from({ length: 501 }, (_, i) => line(String(i))).join("\n"),
  ])
    assert.throws(() => parsePayoutCsv(csv));
});
test("precision preserves one wei and values above Number safe integer", () => {
  assert.equal(parseUsdc("0.000000000000000001"), 1n);
  assert.equal(
    parseUsdc("9007199254740993.000000000000000001"),
    9007199254740993000000000000000001n,
  );
  const dust = precisionBreakdown("0.000000999999999999", 1000000);
  assert.equal(dust.truncated6, "0.000000");
  assert.equal(dust.accumulatedDustExact, "0.999999999999");
  assert.throws(() => parseUsdc(MAX_UINT256.toString()));
  assert.throws(() => precisionBreakdown("1", 1.5));
});
