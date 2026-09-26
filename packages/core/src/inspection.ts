import { z } from "zod";
import { canonicalJson, reportDigest } from "./index.ts";
import type { Report } from "./types.js";

export const REPORT_MAX_BYTES = 2000000;
const uint = z
  .string()
  .max(100)
  .regex(/^(0|[1-9][0-9]*)$/);
const signed = z
  .string()
  .max(101)
  .regex(/^-?(0|[1-9][0-9]*)$/);
const address = z.string().regex(/^0x[0-9a-fA-F]{40}$/);
const hash = z.string().regex(/^0x[0-9a-fA-F]{64}$/);
const amount = z
  .string()
  .max(120)
  .regex(/^(0|[1-9][0-9]*)(\.[0-9]{1,18})?$/);
const text = z.string().max(2000);
const evidence = z.enum(["verified", "consistent", "needs_review"]);
const movement = z.strictObject({
  payer: address,
  payee: address,
  amountNative18: uint,
  amountExact: amount,
  amountDisplay6: z.string().max(140),
  dustRemainder18: uint,
  sourceLogIndex: uint,
  corroboratingLogIndexes: z.array(uint).max(5000),
  evidenceLevel: evidence,
});
/** Strict, bounded schema: do not strip unknown fields before digesting user input. */
const reportSchema = z.strictObject({
  schemaVersion: z.literal("1.0.0"),
  algorithmVersion: z.string().min(1).max(50),
  chainId: z.literal(5042),
  txHash: hash,
  blockNumber: uint.nullable(),
  blockHash: hash.nullable(),
  txIndex: uint.nullable(),
  status: z.enum([
    "confirmed_success",
    "confirmed_failed",
    "pending",
    "not_found",
    "rpc_error",
    "unsupported_format",
    "insufficient_evidence",
  ]),
  evidenceLevel: evidence,
  reasons: z.array(text).max(100),
  warnings: z.array(text).max(100),
  gas: z
    .strictObject({
      payer: address,
      beneficiary: address.nullable(),
      gasUsed: uint,
      effectiveGasPrice: uint,
      feeNative18: uint,
      feeExact: amount,
    })
    .nullable(),
  movements: z.array(movement).max(5000),
  logs: z
    .array(
      z.strictObject({
        address,
        topics: z.array(hash).max(4),
        data: z
          .string()
          .max(200000)
          .regex(/^0x([0-9a-fA-F]{2})*$/),
        logIndex: uint,
        role: z.enum([
          "native_movement",
          "erc20_corroboration",
          "erc20_unmatched",
          "other",
        ]),
      }),
    )
    .max(5000),
  memo: z.null(),
  totals: z.strictObject({
    grossMovementNative18: uint,
    grossMovementExact: amount,
    interfaceNative18: uint,
    naiveNative18: uint,
    naiveExact: amount,
    phantomEligible: z.boolean(),
  }),
  proof: z.strictObject({
    logs: z.enum(["consistent", "incomplete"]),
    trace: z.enum(["matches", "unavailable", "incomplete"]),
    state: z.enum(["matches", "unavailable", "mismatch"]),
    balances: z
      .array(
        z.strictObject({
          address,
          expectedNative18: signed,
          actualNative18: signed.nullable(),
          residualNative18: signed.nullable(),
        }),
      )
      .max(5000),
  }),
  limits: z.array(text).max(100),
  digest: hash,
});
export interface InspectedReport {
  report: Report;
  computedDigest: string;
  digestMatches: boolean;
}
export function inspectReportJson(input: string): InspectedReport {
  if (new TextEncoder().encode(input).length > REPORT_MAX_BYTES)
    throw Error("Report exceeds 2 MB.");
  let value: unknown;
  try {
    value = JSON.parse(input.replace(/^\uFEFF/, ""));
  } catch {
    throw Error(
      "Invalid JSON. Import the report from Download JSON, or paste the complete object.",
    );
  }
  const parsed = reportSchema.safeParse(value);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue.path.map(String).join(".") || "report";
    throw Error(
      `Unsupported report at ${path}. Expected an Arc mainnet schema 1.0.0 report with all original fields and no extra fields.`,
    );
  }
  const report: Report = parsed.data;
  const computedDigest = reportDigest(report);
  return {
    report,
    computedDigest,
    digestMatches: computedDigest === report.digest.toLowerCase(),
  };
}
