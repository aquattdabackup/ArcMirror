import { parseArgs } from "node:util";
import { validHash } from "../packages/core/src/index";

export const VERIFY_USAGE =
  "Usage: npm run verify -- <hash> [--report report.json] [--out fresh.json] [--fixture vector.json] [--logs-only]\nSet ARC_RPC_URLS and ARC_TRACE_RPC_URLS locally to use your own provider.";

/** Validate all arguments before any file or network access. */
export function parseVerifyOptions(args: string[]) {
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    strict: true,
    options: {
      report: { type: "string" },
      out: { type: "string" },
      fixture: { type: "string" },
      "logs-only": { type: "boolean", default: false },
    },
  });
  if (positionals.length !== 1 || !validHash(positionals[0]))
    throw Error("Supply exactly one transaction hash");
  for (const path of [values.report, values.out, values.fixture]) {
    if (path !== undefined && !path.trim()) throw Error("File paths cannot be empty");
  }
  return {
    hash: positionals[0],
    report: values.report,
    out: values.out,
    fixture: values.fixture,
    logsOnly: values["logs-only"],
  };
}
