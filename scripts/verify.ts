import { readFile, writeFile } from "node:fs/promises";
import {
  analyze,
  reportDigest,
  canonicalJson,
  type Report,
  type Bundle,
} from "../packages/core/src/index";
import { fetchBundle, environmentOptions } from "../packages/rpc/src/index";
import { parseVerifyOptions, VERIFY_USAGE } from "./verify-options";
let options: ReturnType<typeof parseVerifyOptions>;
try {
  options = parseVerifyOptions(process.argv.slice(2));
} catch {
  console.error(VERIFY_USAGE);
  process.exit(2);
}
const { hash } = options;
try {
  let input: Bundle;
  if (options.fixture) {
    const v = JSON.parse(await readFile(options.fixture, "utf8"));
    input = v.input ?? v;
    if (input.txHash.toLowerCase() !== hash.toLowerCase())
      throw Error("Fixture hash does not match requested hash");
  } else
    input = await fetchBundle(hash, {
      ...environmentOptions(),
      trace: !options.logsOnly,
    });
  const report = analyze(input);
  if (options.out)
    await writeFile(options.out, JSON.stringify(report, null, 2) + "\n");
  console.log(
    JSON.stringify(
      {
        mode: options.fixture ? "offline fixture" : "live RPC",
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
  if (options.report) {
    const file = JSON.parse(await readFile(options.report, "utf8"));
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
