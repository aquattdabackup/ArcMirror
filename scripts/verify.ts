import { readFile, writeFile } from "node:fs/promises";
import {
  analyze,
  reportDigest,
  canonicalJson,
  validHash,
  type Report,
  type Bundle,
} from "../packages/core/src/index";
import { fetchBundle, environmentOptions } from "../packages/rpc/src/index";
const args = process.argv.slice(2);
const value = (flag: string) => {
  const i = args.indexOf(flag);
  return i < 0 ? undefined : args[i + 1];
};
const hash = args[0];
if (!hash || !validHash(hash)) {
  console.error(
    "Usage: npm run verify -- <hash> [--report report.json] [--out fresh.json] [--fixture vector.json] [--logs-only]\nSet ARC_RPC_URLS and ARC_TRACE_RPC_URLS locally to use your own provider.",
  );
  process.exit(2);
}
try {
  let input: Bundle;
  if (value("--fixture")) {
    const v = JSON.parse(await readFile(value("--fixture")!, "utf8"));
    input = v.input ?? v;
    if (input.txHash.toLowerCase() !== hash.toLowerCase())
      throw Error("Fixture hash does not match requested hash");
  } else
    input = await fetchBundle(hash, {
      ...environmentOptions(),
      trace: !args.includes("--logs-only"),
    });
  const report = analyze(input);
  if (value("--out"))
    await writeFile(value("--out")!, JSON.stringify(report, null, 2) + "\n");
  console.log(
    JSON.stringify(
      {
        mode: value("--fixture") ? "offline fixture" : "live RPC",
        txHash: report.txHash,
        status: report.status,
        evidenceLevel: report.evidenceLevel,
        digest: report.digest,
        reasons: report.reasons,
      },
      null,
      2,
    ),
  );
  if (value("--report")) {
    const file = JSON.parse(await readFile(value("--report")!, "utf8"));
    const expected: Report = file.expected ?? file.report ?? file;
    if (expected.digest !== reportDigest(expected))
      throw Error("Supplied report digest is invalid");
    if (report.digest !== expected.digest) {
      console.error(
        "Digest mismatch. Evidence availability and algorithm versions can change a report.",
      );
      for (const key of Object.keys(report) as (keyof Report)[]) {
        if (canonicalJson(report[key]) !== canonicalJson(expected[key]))
          console.error(`Different field: ${key}`);
      }
      process.exitCode = 1;
    } else console.log("MATCH: digest and canonical report agree.");
  }
  if (
    [
      "rpc_error",
      "unsupported_format",
      "insufficient_evidence",
      "not_found",
      "pending",
    ].includes(report.status)
  )
    process.exitCode = 1;
} catch {
  console.error(
    "Verification failed. Check the hash, local files and configured RPC availability. Provider credentials are not printed.",
  );
  process.exitCode = 2;
}
