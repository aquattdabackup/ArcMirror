import { keccak256, stringToHex } from "viem";
import { z } from "zod";
import type {
  Bundle,
  Report,
  Evidence,
  ReportLog,
  Movement,
  BalanceRow,
} from "./types.js";
export type * from "./types.js";
export const CHAIN_ID = 5042;
export const ALGORITHM_VERSION = "0.1.0";
export const NATIVE_EMITTER = "0xfffffffffffffffffffffffffffffffffffffffe";
export const USDC = "0x3600000000000000000000000000000000000000";
export const TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
export const validHash = (s: string): boolean => /^0x[0-9a-fA-F]{64}$/.test(s);
const address = z
  .string()
  .regex(/^0x[0-9a-fA-F]{40}$/)
  .transform((s) => s.toLowerCase());
const hash = z
  .string()
  .regex(/^0x[0-9a-fA-F]{64}$/)
  .transform((s) => s.toLowerCase());
const quantity = z
  .string()
  .regex(/^0x(?:0|[1-9a-fA-F][0-9a-fA-F]*)$/)
  .refine((s) => s.length <= 66)
  .transform((s) => s.toLowerCase());
const hex = z
  .string()
  .regex(/^0x(?:[0-9a-fA-F]{2})*$/)
  .max(131074)
  .transform((s) => s.toLowerCase());
const txSchema = z.object({
  hash,
  from: address,
  to: address.nullable(),
  value: quantity,
  blockHash: hash.nullable(),
  blockNumber: quantity.nullable(),
  transactionIndex: quantity.nullable(),
});
const logSchema = z.object({
  address,
  topics: z.array(hash).max(4),
  data: hex,
  logIndex: quantity,
  transactionHash: hash,
  blockHash: hash,
  transactionIndex: quantity,
  blockNumber: quantity,
  removed: z.boolean().optional(),
});
const receiptSchema = z.object({
  transactionHash: hash,
  blockHash: hash,
  blockNumber: quantity,
  transactionIndex: quantity,
  status: quantity,
  gasUsed: quantity,
  effectiveGasPrice: quantity,
  logs: z.array(logSchema).max(10000),
});
const blockSchema = z.object({ hash, number: quantity, miner: address });
const traceSchema: z.ZodType<Trace> = z.lazy(() =>
  z.object({
    type: z.string(),
    from: address,
    to: address.optional(),
    value: quantity.optional(),
    error: z.string().optional(),
    calls: z.array(traceSchema).optional(),
  }),
);
interface Trace {
  type: string;
  from: string;
  to?: string;
  value?: string;
  error?: string;
  calls?: Trace[];
}
const stateAccount = z.object({ balance: quantity.optional() }).passthrough();
const stateSchema = z.object({
  pre: z.record(address, stateAccount),
  post: z.record(address, stateAccount),
});
export function exactAmount(n: bigint): string {
  const sign = n < 0n ? "-" : "";
  const a = n < 0n ? -n : n;
  const f = (a % 10n ** 18n).toString().padStart(18, "0").replace(/0+$/, "");
  return sign + (a / 10n ** 18n).toString() + (f ? "." + f : "");
}
export function displayAmount(n: bigint): string {
  if (n > 0n && n < 10n ** 12n) return "<0.000001";
  const q = n / 10n ** 12n;
  return (
    (q / 1000000n).toString() +
    "." +
    (q % 1000000n).toString().padStart(6, "0") +
    (n % 10n ** 12n !== 0n ? " + dust" : "")
  );
}
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value))
    return "[" + value.map(canonicalJson).join(",") + "]";
  return (
    "{" +
    Object.keys(value)
      .sort()
      .map(
        (k) =>
          JSON.stringify(k) +
          ":" +
          canonicalJson((value as Record<string, unknown>)[k]),
      )
      .join(",") +
    "}"
  );
}
export function reportDigest(report: Omit<Report, "digest"> | Report): string {
  const { digest: _, ...body } = report as Report;
  return keccak256(stringToHex(canonicalJson(body)));
}
const limits = [
  "USDC only; other tokens are visible as raw logs, excluded from totals.",
  "Gross movement sums count each hop; they are not net wallet income.",
  "Native call-value tracing does not cover USDC precompile mutations.",
  "Memo decoding, historical fork coverage and independent provider consensus are not certified.",
  "Digest commits to this report; it is not a cryptographic proof of blockchain consensus.",
];
function empty(input: Bundle): Report {
  return {
    schemaVersion: "1.0.0",
    algorithmVersion: ALGORITHM_VERSION,
    chainId: input.chainId,
    txHash: input.txHash.toLowerCase(),
    blockNumber: null,
    blockHash: null,
    txIndex: null,
    status: "insufficient_evidence",
    evidenceLevel: "needs_review",
    reasons: [],
    warnings: [],
    gas: null,
    movements: [],
    logs: [],
    memo: null,
    totals: {
      grossMovementNative18: "0",
      grossMovementExact: "0",
      interfaceNative18: "0",
      naiveNative18: "0",
      naiveExact: "0",
      phantomEligible: false,
    },
    proof: {
      logs: "incomplete",
      trace: "unavailable",
      state: "unavailable",
      balances: [],
    },
    limits: [...limits],
    digest: "",
  };
}
function finish(r: Report): Report {
  r.reasons = [...new Set(r.reasons)].sort();
  r.warnings = [...new Set(r.warnings)].sort();
  r.digest = reportDigest(r);
  return r;
}
function stop(r: Report, status: Report["status"], reason: string): Report {
  r.status = status;
  r.reasons.push(reason);
  return finish(r);
}
export function analyze(input: Bundle): Report {
  const r = empty(input);
  if (!validHash(input.txHash))
    return stop(r, "unsupported_format", "invalid_transaction_hash");
  if (input.chainId !== CHAIN_ID)
    return stop(r, "unsupported_format", "wrong_chain_mainnet_5042_required");
  if (input.rpcError) return stop(r, "rpc_error", "rpc_unavailable");
  if (input.transaction == null && input.receipt == null)
    return stop(r, "not_found", "transaction_not_returned_by_provider");
  const txResult = txSchema.safeParse(input.transaction);
  if (!txResult.success)
    return stop(r, "insufficient_evidence", "transaction_missing_or_malformed");
  const tx = txResult.data;
  if (tx.hash !== r.txHash)
    return stop(r, "unsupported_format", "transaction_hash_mismatch");
  if (input.receipt == null)
    return stop(
      r,
      tx.blockNumber === null ? "pending" : "insufficient_evidence",
      tx.blockNumber === null
        ? "receipt_not_yet_available"
        : "mined_transaction_missing_receipt",
    );
  const receiptResult = receiptSchema.safeParse(input.receipt);
  if (!receiptResult.success)
    return stop(r, "unsupported_format", "receipt_missing_or_malformed");
  const rc = receiptResult.data;
  if (
    rc.transactionHash !== r.txHash ||
    rc.blockHash !== tx.blockHash ||
    rc.blockNumber !== tx.blockNumber ||
    rc.transactionIndex !== tx.transactionIndex
  )
    return stop(
      r,
      "unsupported_format",
      "receipt_transaction_binding_mismatch",
    );
  if (rc.status !== "0x1" && rc.status !== "0x0")
    return stop(r, "unsupported_format", "receipt_status_not_supported");
  r.blockHash = rc.blockHash;
  r.blockNumber = BigInt(rc.blockNumber).toString();
  r.txIndex = BigInt(rc.transactionIndex).toString();
  r.status = rc.status === "0x1" ? "confirmed_success" : "confirmed_failed";
  const b = blockSchema.safeParse(input.block);
  const block =
    b.success &&
    b.data.hash === rc.blockHash &&
    b.data.number === rc.blockNumber
      ? b.data
      : null;
  if (!block) r.warnings.push("block_metadata_missing_or_mismatched");
  const fee = BigInt(rc.gasUsed) * BigInt(rc.effectiveGasPrice);
  r.gas = {
    payer: tx.from,
    beneficiary: block?.miner ?? null,
    gasUsed: BigInt(rc.gasUsed).toString(),
    effectiveGasPrice: BigInt(rc.effectiveGasPrice).toString(),
    feeNative18: fee.toString(),
    feeExact: exactAmount(fee),
  };
  const indexes = new Set<string>();
  for (const l of rc.logs) {
    if (
      l.removed ||
      l.transactionHash !== r.txHash ||
      l.blockHash !== rc.blockHash ||
      l.blockNumber !== rc.blockNumber ||
      l.transactionIndex !== rc.transactionIndex ||
      indexes.has(l.logIndex)
    )
      return stop(
        empty(input),
        "unsupported_format",
        "invalid_log_binding_or_duplicate_index",
      );
    indexes.add(l.logIndex);
  }
  const logs = [...rc.logs].sort((a, b) =>
    BigInt(a.logIndex) < BigInt(b.logIndex) ? -1 : 1,
  );
  const interfaces: {
    from: string;
    to: string;
    value: bigint;
    log: ReportLog;
  }[] = [];
  let logIncomplete = r.status === "confirmed_failed" && rc.logs.length > 0;
  if (logIncomplete) r.warnings.push("failed_receipt_contains_logs");
  for (const l of logs) {
    const row: ReportLog = {
      address: l.address,
      topics: l.topics,
      data: l.data,
      logIndex: BigInt(l.logIndex).toString(),
      role: "other",
    };
    r.logs.push(row);
    if (
      l.topics[0] !== TRANSFER_TOPIC ||
      ![NATIVE_EMITTER, USDC].includes(l.address)
    )
      continue;
    if (
      l.topics.length !== 3 ||
      !/^0x[0-9a-f]{64}$/.test(l.data) ||
      !l.topics.slice(1).every((t) => /^0x0{24}[0-9a-f]{40}$/.test(t))
    ) {
      r.warnings.push("malformed_usdc_transfer_log");
      logIncomplete = true;
      continue;
    }
    if (r.status === "confirmed_failed") {
      logIncomplete = true;
      r.warnings.push("failed_receipt_contains_transfer_logs");
      continue;
    }
    const from = "0x" + l.topics[1].slice(-40),
      to = "0x" + l.topics[2].slice(-40),
      value = BigInt(l.data);
    if (l.address === NATIVE_EMITTER) {
      row.role = "native_movement";
      r.movements.push({
        payer: from,
        payee: to,
        amountNative18: value.toString(),
        amountExact: exactAmount(value),
        amountDisplay6: displayAmount(value),
        dustRemainder18: (value % 10n ** 12n).toString(),
        sourceLogIndex: row.logIndex,
        corroboratingLogIndexes: [],
        evidenceLevel: "consistent",
      });
    } else {
      row.role = "erc20_unmatched";
      interfaces.push({ from, to, value, log: row });
    }
  }
  for (const e of interfaces) {
    const candidates = r.movements.filter(
      (m) =>
        m.corroboratingLogIndexes.length === 0 &&
        m.payer === e.from &&
        m.payee === e.to &&
        BigInt(m.amountNative18) === e.value * 10n ** 12n,
    );
    const distance = (m: Movement) => {
      const d = BigInt(m.sourceLogIndex) - BigInt(e.log.logIndex);
      return d < 0n ? -d : d;
    };
    candidates.sort((a, b) =>
      distance(a) < distance(b)
        ? -1
        : distance(a) > distance(b)
          ? 1
          : BigInt(a.sourceLogIndex) < BigInt(b.sourceLogIndex)
            ? -1
            : 1,
    );
    if (candidates[0]) {
      candidates[0].corroboratingLogIndexes.push(e.log.logIndex);
      e.log.role = "erc20_corroboration";
    } else {
      logIncomplete = true;
      r.warnings.push("unmatched_erc20_transfer");
    }
  }
  if (
    r.status === "confirmed_success" &&
    BigInt(tx.value) > 0n &&
    !r.movements.some(
      (m) =>
        m.payer === tx.from &&
        m.payee === tx.to &&
        BigInt(m.amountNative18) === BigInt(tx.value),
    )
  ) {
    logIncomplete = true;
    r.warnings.push("top_level_value_not_accounted_for");
  }
  const gross = r.movements.reduce((a, m) => a + BigInt(m.amountNative18), 0n),
    inter = interfaces.reduce((a, e) => a + e.value * 10n ** 12n, 0n);
  r.totals = {
    grossMovementNative18: gross.toString(),
    grossMovementExact: exactAmount(gross),
    interfaceNative18: inter.toString(),
    naiveNative18: (gross + inter).toString(),
    naiveExact: exactAmount(gross + inter),
    phantomEligible: !logIncomplete && interfaces.length > 0,
  };
  r.proof.logs = logIncomplete ? "incomplete" : "consistent";
  // Only successful CALL/CREATE/CREATE2/SELFDESTRUCT edges move value; a reverted ancestor rolls back all descendants.
  if (input.callTrace != null) {
    const trace = traceSchema.safeParse(input.callTrace);
    const edges: string[] = [];
    let coverage = true;
    const key = (a: string, b: string, v: bigint) => `${a}:${b}:${v}`;
    function visit(t: Trace, root = false) {
      if (t.error) return;
      if (
        ![
          "CALL",
          "STATICCALL",
          "DELEGATECALL",
          "CALLCODE",
          "CREATE",
          "CREATE2",
          "SELFDESTRUCT",
        ].includes(t.type)
      )
        coverage = false;
      const v = BigInt(t.value ?? "0x0");
      if (
        ["CALL", "CREATE", "CREATE2", "SELFDESTRUCT"].includes(t.type) &&
        v > 0n
      ) {
        if (!t.to) coverage = false;
        else edges.push(key(t.from, t.to, v));
      }
      if (
        t.to === USDC ||
        t.to === "0x1800000000000000000000000000000000000000"
      )
        coverage = false;
      for (const c of t.calls ?? []) visit(c);
    }
    if (trace.success) {
      const t = trace.data;
      if (
        t.from !== tx.from ||
        (tx.to !== null && t.to !== tx.to) ||
        BigInt(t.value ?? "0x0") !== BigInt(tx.value) ||
        Boolean(t.error) !== (r.status === "confirmed_failed")
      )
        coverage = false;
      visit(t, true);
      const expected = r.movements
        .filter((m) => BigInt(m.amountNative18) > 0n)
        .map((m) => key(m.payer, m.payee, BigInt(m.amountNative18)))
        .sort();
      r.proof.trace =
        coverage && canonicalJson(edges.sort()) === canonicalJson(expected)
          ? "matches"
          : "incomplete";
    } else r.proof.trace = "incomplete";
    if (r.proof.trace === "incomplete")
      r.reasons.push("call_trace_coverage_incomplete");
  } else r.reasons.push("call_trace_unavailable");
  if (input.stateDiff != null && block) {
    const result = stateSchema.safeParse(input.stateDiff);
    if (result.success) {
      const { pre, post } = result.data;
      const exp = new Map<string, bigint>();
      const add = (a: string, v: bigint) => exp.set(a, (exp.get(a) ?? 0n) + v);
      for (const m of r.movements) {
        add(m.payer, -BigInt(m.amountNative18));
        add(m.payee, BigInt(m.amountNative18));
      }
      add(tx.from, -fee);
      add(block.miner, fee);
      for (const a of [
        ...new Set([...exp.keys(), ...Object.keys(pre), ...Object.keys(post)]),
      ].sort()) {
        let actual: bigint | null = null;
        const p = pre[a],
          q = post[a];
        if (p && q) {
          actual =
            BigInt(q.balance ?? p.balance ?? "0x0") -
            BigInt(p.balance ?? "0x0");
        } else if (!p && q) {
          actual = BigInt(q.balance ?? "0x0");
        } else if (p && !q) {
          actual = -BigInt(p.balance ?? "0x0");
        } else if ((exp.get(a) ?? 0n) === 0n) {
          actual = 0n;
        }
        const expected = exp.get(a) ?? 0n;
        r.proof.balances.push({
          address: a,
          expectedNative18: expected.toString(),
          actualNative18: actual?.toString() ?? null,
          residualNative18:
            actual === null ? null : (actual - expected).toString(),
        });
      }
      r.proof.state = r.proof.balances.every((b) => b.residualNative18 === "0")
        ? "matches"
        : "mismatch";
    } else r.proof.state = "mismatch";
    if (r.proof.state === "mismatch")
      r.reasons.push("state_delta_unexplained_or_missing");
  } else r.reasons.push("state_diff_or_block_unavailable");
  r.evidenceLevel =
    logIncomplete ||
    r.proof.trace === "incomplete" ||
    r.proof.state === "mismatch"
      ? "needs_review"
      : r.proof.trace === "matches" && r.proof.state === "matches"
        ? "verified"
        : "consistent";
  if (logIncomplete) r.reasons.push("log_evidence_incomplete");
  if (r.evidenceLevel === "verified")
    r.reasons.push("logs_call_values_and_transaction_state_match");
  for (const m of r.movements) m.evidenceLevel = r.evidenceLevel;
  return finish(r);
}
