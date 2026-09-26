import test from "node:test";
import assert from "node:assert/strict";
import { parseUsdc, precisionBreakdown, MAX_UINT256 } from "../src/precision";
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
