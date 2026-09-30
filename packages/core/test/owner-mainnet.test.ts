import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { analyze } from "../src/index";

const read = (path: string) => JSON.parse(readFileSync(new URL("../../../" + path, import.meta.url), "utf8"));
const deployment = read("contracts/deployments/5042.json");
const checks = read("docs/evidence/mainnet/checks.json");
const lab = deployment.contracts.ArcMirrorLab.address;
const forwarder = deployment.contracts.ArcMirrorForwarder.address;
const [a, b] = deployment.constructorArguments;

for (const scenario of checks.scenarios) {
  test("owner mainnet evidence: " + scenario.scenario, () => {
    const vector = read("vectors/owner/" + scenario.hash + ".json");
    assert.match(vector.provenance, /^Owner-created ArcMirror/);
    const r = analyze(vector.input);
    assert.deepEqual(r, vector.expected);
    assert.equal(r.digest, scenario.reportDigest);
    assert.equal(r.chainId, 5042);
    assert.equal(r.gas?.feeNative18,
      (BigInt(vector.input.receipt.gasUsed) * BigInt(vector.input.receipt.effectiveGasPrice)).toString());
    const edge = (from: string, to: string, amount: string) =>
      assert.equal(r.movements.filter(m => m.payer === from && m.payee === to && m.amountExact === amount).length, 1);
    const sender = vector.input.transaction.from;
    if (scenario.scenario === "intentional-failure") {
      assert.equal(r.status, "confirmed_failed");
      assert.equal(vector.input.transaction.to, lab);
      assert.equal(vector.input.transaction.input, "0x9012dd4c");
      assert.equal(vector.input.callTrace.output, "0xdaf7d1b0");
      assert.match(vector.input.callTrace.error, /revert/i);
      assert.equal(r.movements.length, 0);
      assert.equal(r.totals.grossMovementExact, "0");
      assert.ok(BigInt(r.gas!.feeNative18) > 0n);
      return;
    }
    assert.equal(r.status, "confirmed_success");
    if (scenario.scenario === "native" || scenario.scenario === "erc20") {
      edge(sender, a, "0.001");
      assert.equal(r.movements.length, 1);
      if (scenario.scenario === "erc20") {
        assert.equal(r.totals.naiveExact, "0.002");
        assert.equal(r.evidenceLevel, "needs_review");
      }
    } else if (scenario.scenario === "forwarding") {
      edge(sender, lab, "0.001"); edge(lab, forwarder, "0.001"); edge(forwarder, a, "0.001");
      assert.equal(r.movements.length, 3);
      assert.equal(r.totals.grossMovementExact, "0.003");
    } else if (scenario.scenario === "batch") {
      edge(sender, lab, "0.003"); edge(lab, a, "0.001"); edge(lab, b, "0.002");
      assert.equal(r.movements.length, 3);
      assert.equal(r.totals.grossMovementExact, "0.006");
    } else assert.fail("Unexpected scenario");
  });
}
