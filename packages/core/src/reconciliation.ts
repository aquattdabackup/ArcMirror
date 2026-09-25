import { isAddress } from "viem";
import { exactAmount } from "./index.ts";
import { parseUsdc } from "./precision.ts";
import type { Report, Movement } from "./types.js";

export const CSV_MAX_BYTES = 256000;
export const CSV_MAX_ROWS = 500;
export interface ExpectedPayment {
  id: string;
  payer: string;
  recipient: string;
  amountNative18: string;
}
export interface ReconciledPayment extends ExpectedPayment {
  status: "matched" | "amount_mismatch" | "missing";
  movement: Movement | null;
  candidates: Movement[];
}

/** RFC-style quoted fields, CRLF/LF, BOM; strict columns and bounded input. */
export function parsePayoutCsv(input: string): ExpectedPayment[] {
  if (new TextEncoder().encode(input).length > CSV_MAX_BYTES)
    throw Error("CSV exceeds 256 KB.");
  const text = input.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const rows: string[][] = [];
  let row: string[] = [],
    field = "",
    quoted = false,
    closed = false;
  const endField = () => {
    row.push(field);
    field = "";
    closed = false;
  };
  const endRow = () => {
    endField();
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
    row = [];
    if (rows.length > CSV_MAX_ROWS + 1)
      throw Error("CSV supports at most 500 payments.");
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else field += c;
    } else if (c === ",") endField();
    else if (c === "\n" || c === "\r") endRow();
    else if (c === '"' && field === "" && !closed) quoted = true;
    else {
      if (closed || c === '"') throw Error("Malformed CSV quoting.");
      field += c;
    }
  }
  if (quoted) throw Error("Unclosed CSV quote.");
  if (field || row.length || closed) endRow();
  const header = rows.shift()?.map((s) => s.trim());
  if (header?.join(",") !== "id,payer,recipient,amount_usdc")
    throw Error("Use exactly these columns: id,payer,recipient,amount_usdc");
  if (!rows.length) throw Error("Add at least one expected payment.");
  const ids = new Set<string>();
  return rows.map((cells, index) => {
    const fail = (message: string): never => {
      throw Error(`Payment ${index + 1}: ${message}`);
    };
    if (cells.length !== 4) fail("expected four columns.");
    const [id, payer, recipient, amount] = cells.map((s) => s.trim());
    if (!/^[A-Za-z0-9][A-Za-z0-9 ._/-]{0,79}$/.test(id))
      fail(
        "use a short id starting with a letter or number (letters, numbers, spaces, . _ / - only).",
      );
    if (ids.has(id))
      fail("ids must be unique; repeated payments need separate ids.");
    ids.add(id);
    if (!isAddress(payer) || !isAddress(recipient))
      fail(
        "payer and recipient must be valid EVM addresses (check mixed-case checksum).",
      );
    let raw: bigint;
    try {
      raw = parseUsdc(amount);
    } catch {
      return fail(
        "invalid amount; use a plain decimal with at most 18 decimal places.",
      );
    }
    if (raw === 0n) fail("expected payment must be greater than zero.");
    return {
      id,
      payer: payer.toLowerCase(),
      recipient: recipient.toLowerCase(),
      amountNative18: raw.toString(),
    };
  });
}

/** Match exact rows first, so an incorrect amount never consumes a later exact match. */
export function reconcilePayouts(expected: ExpectedPayment[], report: Report) {
  if (
    report.chainId !== 5042 ||
    report.status !== "confirmed_success" ||
    report.proof.logs !== "consistent"
  )
    throw Error(
      "Reconciliation requires a successful Arc mainnet receipt with consistent movement logs. No payment conclusion is available for this report.",
    );
  if (!expected.length || expected.length > CSV_MAX_ROWS)
    throw Error("Use 1 to 500 expected payments.");
  const available = new Set(report.movements.map((_, i) => i));
  const sameParties = (p: ExpectedPayment, m: Movement) =>
    p.payer.toLowerCase() === m.payer.toLowerCase() &&
    p.recipient.toLowerCase() === m.payee.toLowerCase();
  const rows: ReconciledPayment[] = expected.map((p) => {
    const i = report.movements.findIndex(
      (m, i) =>
        available.has(i) &&
        sameParties(p, m) &&
        p.amountNative18 === m.amountNative18,
    );
    if (i >= 0) {
      available.delete(i);
      return {
        ...p,
        status: "matched",
        movement: report.movements[i],
        candidates: [],
      };
    }
    return { ...p, status: "missing", movement: null, candidates: [] };
  });
  for (const row of rows) {
    if (row.status === "matched") continue;
    row.candidates = [...available]
      .map((i) => report.movements[i])
      .filter((m) => sameParties(row, m));
    if (row.candidates.length) row.status = "amount_mismatch";
  }
  const unassigned = [...available].map((i) => report.movements[i]);
  return {
    schemaVersion: "1.0.0",
    kind: "arcmirror-payout-reconciliation",
    txHash: report.txHash,
    reportDigest: report.digest,
    evidenceLevel: report.evidenceLevel,
    counts: {
      expected: rows.length,
      matched: rows.filter((r) => r.status === "matched").length,
      amountMismatch: rows.filter((r) => r.status === "amount_mismatch").length,
      missing: rows.filter((r) => r.status === "missing").length,
      unassigned: unassigned.length,
    },
    expectedTotalExact: exactAmount(
      expected.reduce((sum, p) => sum + BigInt(p.amountNative18), 0n),
    ),
    matchedTotalExact: exactAmount(
      rows.reduce(
        (sum, r) => sum + (r.movement ? BigInt(r.movement.amountNative18) : 0n),
        0n,
      ),
    ),
    gasExact: report.gas?.feeExact ?? null,
    rows,
    unassigned,
    limits: [
      "One expected row matches at most one canonical movement in this transaction; gas is excluded.",
      "Matched amounts do not prove invoice identity, recipient ownership or settlement outside this transaction.",
      "Amount-mismatch candidates are not assigned; several expectations can reference the same candidate.",
      ...report.limits,
    ],
  };
}
