export type Status =
  | "confirmed_success"
  | "confirmed_failed"
  | "pending"
  | "not_found"
  | "rpc_error"
  | "unsupported_format"
  | "insufficient_evidence";
export type Evidence = "verified" | "consistent" | "needs_review";
export type RpcRecord = Record<string, unknown>;
export interface Bundle {
  chainId: number;
  txHash: string;
  transaction: unknown;
  receipt: unknown;
  block?: unknown;
  callTrace?: unknown;
  stateDiff?: unknown;
  rpcError?: boolean;
}
export interface Movement {
  payer: string;
  payee: string;
  amountNative18: string;
  amountExact: string;
  amountDisplay6: string;
  dustRemainder18: string;
  sourceLogIndex: string;
  corroboratingLogIndexes: string[];
  evidenceLevel: Evidence;
}
export interface ReportLog {
  address: string;
  topics: string[];
  data: string;
  logIndex: string;
  role: "native_movement" | "erc20_corroboration" | "erc20_unmatched" | "other";
}
export interface BalanceRow {
  address: string;
  expectedNative18: string;
  actualNative18: string | null;
  residualNative18: string | null;
}
export interface Report {
  schemaVersion: "1.0.0";
  algorithmVersion: string;
  chainId: number;
  txHash: string;
  blockNumber: string | null;
  blockHash: string | null;
  txIndex: string | null;
  status: Status;
  evidenceLevel: Evidence;
  reasons: string[];
  warnings: string[];
  gas: {
    payer: string;
    beneficiary: string | null;
    gasUsed: string;
    effectiveGasPrice: string;
    feeNative18: string;
    feeExact: string;
  } | null;
  movements: Movement[];
  logs: ReportLog[];
  memo: null;
  totals: {
    grossMovementNative18: string;
    grossMovementExact: string;
    interfaceNative18: string;
    naiveNative18: string;
    naiveExact: string;
    phantomEligible: boolean;
  };
  proof: {
    logs: "consistent" | "incomplete";
    trace: "matches" | "unavailable" | "incomplete";
    state: "matches" | "unavailable" | "mismatch";
    balances: BalanceRow[];
  };
  limits: string[];
  digest: string;
}
