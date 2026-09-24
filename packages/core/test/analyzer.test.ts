import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  analyze,
  reportDigest,
  canonicalJson,
  exactAmount,
  displayAmount,
  NATIVE_EMITTER,
  USDC,
  TRANSFER_TOPIC,
  type Bundle,
} from "../src/index";
const A = "0x" + "11".repeat(20),
  B = "0x" + "22".repeat(20),
  C = "0x" + "33".repeat(20),
  MINER = "0x" + "44".repeat(20),
  H = "0x" + "aa".repeat(32),
  BH = "0x" + "bb".repeat(32);
const hex = (n: bigint | number) => "0x" + n.toString(16);
const topic = (a: string) => "0x" + "0".repeat(24) + a.slice(2);
function log(emitter: string, n: bigint, index: number, from = A, to = B) {
  return {
    address: emitter,
    topics: [TRANSFER_TOPIC, topic(from), topic(to)],
    data: "0x" + n.toString(16).padStart(64, "0"),
    logIndex: hex(index),
    transactionHash: H,
    blockHash: BH,
    blockNumber: "0x1",
    transactionIndex: "0x0",
  };
}
function bundle(logs: unknown[] = [], value = 0n): Bundle {
  return {
    chainId: 5042,
    txHash: H,
    transaction: {
      hash: H,
      from: A,
      to: B,
      value: hex(value),
      blockHash: BH,
      blockNumber: "0x1",
      transactionIndex: "0x0",
    },
    receipt: {
      transactionHash: H,
      blockHash: BH,
      blockNumber: "0x1",
      transactionIndex: "0x0",
      status: "0x1",
      gasUsed: "0x5208",
      effectiveGasPrice: hex(20000000000n),
      logs,
    },
    block: { hash: BH, number: "0x1", miner: MINER },
  };
}
test("native transfer: one movement with separate exact fee", () => {
  const r = analyze(bundle([log(NATIVE_EMITTER, 10n ** 18n, 0)], 10n ** 18n));
  assert.equal(r.movements.length, 1);
  assert.equal(r.gas?.feeNative18, "420000000000000");
  assert.equal(r.totals.grossMovementExact, "1");
  assert.equal(r.evidenceLevel, "consistent");
});
test("interface pair counts one economic movement", () => {
  const r = analyze(
    bundle([log(NATIVE_EMITTER, 10n ** 18n, 4), log(USDC, 1000000n, 5)]),
  );
  assert.equal(r.movements.length, 1);
  assert.deepEqual(r.movements[0].corroboratingLogIndexes, ["5"]);
  assert.equal(r.totals.naiveExact, "2");
  assert.equal(r.totals.phantomEligible, true);
});
test("identical movements remain distinct and match one-to-one", () => {
  const r = analyze(
    bundle([
      log(USDC, 1000000n, 3),
      log(NATIVE_EMITTER, 10n ** 18n, 0),
      log(NATIVE_EMITTER, 10n ** 18n, 2),
      log(USDC, 1000000n, 1),
    ]),
  );
  assert.equal(r.movements.length, 2);
  assert.deepEqual(
    r.movements.map((m) => m.corroboratingLogIndexes),
    [["1"], ["3"]],
  );
  assert.equal(r.totals.grossMovementExact, "2");
});
test("nearest unmatched log wins, no adjacency requirement", () => {
  const r = analyze(
    bundle([
      log(NATIVE_EMITTER, 10n ** 18n, 0),
      log(NATIVE_EMITTER, 10n ** 18n, 8),
      log(USDC, 1000000n, 9),
    ]),
  );
  assert.deepEqual(r.movements[1].corroboratingLogIndexes, ["9"]);
});
test("multi-hop payer is log sender, not tx.from", () => {
  const r = analyze(
    bundle([
      log(NATIVE_EMITTER, 1n, 0, A, C),
      log(NATIVE_EMITTER, 1n, 1, C, B),
    ]),
  );
  assert.equal(r.movements[1].payer, C);
  assert.equal(r.totals.grossMovementNative18, "2");
});
test("dust never silently displays zero", () => {
  const r = analyze(bundle([log(NATIVE_EMITTER, 1n, 0)]));
  assert.equal(r.movements[0].amountDisplay6, "<0.000001");
  assert.equal(r.movements[0].amountExact, "0.000000000000000001");
  assert.equal(r.movements[0].dustRemainder18, "1");
});
test("large uint256 and non-six-decimal values stay exact", () => {
  const n = 2n ** 256n - 1n;
  const r = analyze(bundle([log(NATIVE_EMITTER, n, 0)]));
  assert.equal(r.movements[0].amountNative18, n.toString());
  assert.equal(exactAmount(1000000000000000001n), "1.000000000000000001");
  assert.equal(displayAmount(1000000000000000001n), "1.000000 + dust");
});
test("same event on unrelated emitter cannot count as USDC", () => {
  const r = analyze(bundle([log(C, 999n, 0)]));
  assert.equal(r.movements.length, 0);
  assert.equal(r.logs[0].role, "other");
});
test("unmatched interface evidence is never counted and hides phantom comparison", () => {
  const r = analyze(bundle([log(USDC, 100n, 0)]));
  assert.equal(r.evidenceLevel, "needs_review");
  assert.equal(r.movements.length, 0);
  assert.equal(r.totals.phantomEligible, false);
});
test("malformed transfer data is surfaced", () => {
  const l = log(NATIVE_EMITTER, 1n, 0);
  l.data = "0x01";
  const r = analyze(bundle([l]));
  assert.equal(r.evidenceLevel, "needs_review");
  assert.ok(r.warnings.includes("malformed_usdc_transfer_log"));
});
test("duplicate log index rejects report rather than double count", () => {
  assert.equal(
    analyze(bundle([log(NATIVE_EMITTER, 1n, 0), log(NATIVE_EMITTER, 1n, 0)]))
      .status,
    "unsupported_format",
  );
});
test("foreign transaction/block receipt or log rejected", () => {
  const x = bundle([log(NATIVE_EMITTER, 1n, 0)]);
  (x.receipt as any).logs[0].blockHash = H;
  assert.equal(analyze(x).status, "unsupported_format");
  const y = bundle();
  (y.receipt as any).transactionHash = BH;
  assert.equal(analyze(y).status, "unsupported_format");
});
test("failed receipt keeps fee and has no movement", () => {
  const x = bundle();
  (x.receipt as any).status = "0x0";
  const r = analyze(x);
  assert.equal(r.status, "confirmed_failed");
  assert.equal(r.movements.length, 0);
  assert.ok(r.gas);
});
test("failed receipt with contradictory transfers needs review", () => {
  const x = bundle([log(NATIVE_EMITTER, 1n, 0)]);
  (x.receipt as any).status = "0x0";
  const r = analyze(x);
  assert.equal(r.movements.length, 0);
  assert.equal(r.evidenceLevel, "needs_review");
});
test("pending, not found, missing receipt, RPC failure and wrong chain distinct", () => {
  const x = bundle();
  x.receipt = null;
  assert.equal(analyze(x).status, "insufficient_evidence");
  Object.assign(x.transaction as any, {
    blockNumber: null,
    blockHash: null,
    transactionIndex: null,
  });
  assert.equal(analyze(x).status, "pending");
  x.transaction = null;
  assert.equal(analyze(x).status, "not_found");
  x.rpcError = true;
  assert.equal(analyze(x).status, "rpc_error");
  x.chainId = 5042002;
  assert.equal(analyze(x).status, "unsupported_format");
});
test("invalid hash and absent receipt status cannot produce success", () => {
  const x = bundle();
  x.txHash = "hello";
  assert.equal(analyze(x).status, "unsupported_format");
  const y = bundle();
  delete (y.receipt as any).status;
  assert.equal(analyze(y).status, "unsupported_format");
});
test("missing native log for nonzero tx value is incomplete", () => {
  assert.equal(analyze(bundle([], 1n)).evidenceLevel, "needs_review");
});
test("canonical digest ignores key insertion and log input order", () => {
  assert.equal(canonicalJson({ b: 1, a: 2 }), canonicalJson({ a: 2, b: 1 }));
  const a = analyze(bundle([log(NATIVE_EMITTER, 1n, 0), log(USDC, 0n, 1)]));
  assert.equal(a.digest, reportDigest(a));
  const b = analyze(bundle([log(USDC, 0n, 1), log(NATIVE_EMITTER, 1n, 0)]));
  assert.equal(a.digest, b.digest);
});
function verifiedBundle() {
  const x = bundle([log(NATIVE_EMITTER, 10n, 0)], 10n);
  x.callTrace = { type: "CALL", from: A, to: B, value: hex(10n) };
  x.stateDiff = {
    pre: {
      [A]: { balance: hex(10n ** 18n) },
      [B]: { balance: "0x0" },
      [MINER]: { balance: "0x0" },
    },
    post: {
      [A]: { balance: hex(10n ** 18n - 10n - 420000000000000n) },
      [B]: { balance: hex(10n) },
      [MINER]: { balance: hex(420000000000000n) },
    },
  };
  return x;
}
test("three-way native reconciliation verified only when all match", () => {
  const r = analyze(verifiedBundle());
  assert.equal(r.evidenceLevel, "verified");
  assert.ok(r.proof.balances.every((b) => b.residualNative18 === "0"));
});
test("state residual and missing account balances remain visible", () => {
  const x = verifiedBundle();
  (x.stateDiff as any).post[B].balance = "0x9";
  const r = analyze(x);
  assert.equal(r.evidenceLevel, "needs_review");
  assert.equal(
    r.proof.balances.find((b) => b.address === B)?.residualNative18,
    "-1",
  );
  delete (x.stateDiff as any).pre[B];
  delete (x.stateDiff as any).post[B];
  assert.equal(
    analyze(x).proof.balances.find((b) => b.address === B)?.actualNative18,
    null,
  );
});
test("reverted ancestor excludes descendant calls", () => {
  const x = verifiedBundle();
  (x.callTrace as any).calls = [
    {
      type: "CALL",
      from: A,
      to: C,
      value: "0x0",
      error: "revert",
      calls: [{ type: "CALL", from: C, to: B, value: "0x99" }],
    },
  ];
  assert.equal(analyze(x).proof.trace, "matches");
});
test("delegatecall value is not a second native movement", () => {
  const x = verifiedBundle();
  (x.callTrace as any).calls = [
    { type: "DELEGATECALL", from: B, to: C, value: "0xa" },
  ];
  assert.equal(analyze(x).proof.trace, "matches");
});
test("trace root mismatch cannot be verified", () => {
  const x = verifiedBundle();
  (x.callTrace as any).from = C;
  assert.equal(analyze(x).evidenceLevel, "needs_review");
});
test("precompile call coverage never overclaims verification", () => {
  const x = verifiedBundle();
  (x.callTrace as any).calls = [
    { type: "CALL", from: B, to: USDC, value: "0x0" },
  ];
  assert.equal(analyze(x).evidenceLevel, "needs_review");
});
test("log-only fallback has explicit unavailable reasons", () => {
  const r = analyze(bundle());
  assert.equal(r.evidenceLevel, "consistent");
  assert.ok(r.reasons.includes("call_trace_unavailable"));
});
const path = new URL("../../../docs/evidence/spike/", import.meta.url);
const read = (f: string) =>
  JSON.parse(readFileSync(new URL(f, path), "utf8").replace(/^\uFEFF/, ""));
test("actual mainnet native sample reconciles with real traces", () => {
  const c = read("provider-capabilities.json");
  const s = read(c.txHash + ".json");
  const t = c.capabilities.find((v: any) => v.endpoint.includes("drpc"));
  const r = analyze({
    chainId: 5042,
    txHash: c.txHash,
    transaction: s.tx.result,
    receipt: s.receipt.result,
    block: s.block.result,
    callTrace: t.callTrace.result,
    stateDiff: t.stateDiff.result,
  });
  assert.equal(r.evidenceLevel, "verified");
  assert.equal(r.gas?.feeExact, "0.00042");
});
test("actual composed mainnet ERC-20 sample preserves trace limitation", () => {
  const t = read("erc20-traces.json");
  const s = read(t.txHash + ".json");
  const r = analyze({
    chainId: 5042,
    txHash: t.txHash,
    transaction: s.tx.result,
    receipt: s.receipt.result,
    block: s.block.result,
    callTrace: t.callTrace.result,
    stateDiff: t.stateDiff.result,
  });
  assert.equal(r.totals.grossMovementExact, "4.499999");
  assert.equal(r.proof.state, "matches");
  assert.equal(r.proof.trace, "incomplete");
  assert.equal(r.evidenceLevel, "needs_review");
});

test("failed receipt with any surviving logs is contradictory", () => {
  const x = bundle([log(C, 1n, 0)]);
  (x.receipt as any).status = "0x0";
  assert.equal(analyze(x).evidenceLevel, "needs_review");
});

test("hex casing cannot disguise a duplicate log index", () => {
  const a = log(NATIVE_EMITTER, 1n, 10);
  const b = {...a, logIndex: "0xA"};
  const result = analyze(bundle([a,b]));
  assert.equal(result.status, "unsupported_format");
  assert.equal(result.movements.length, 0);
});
