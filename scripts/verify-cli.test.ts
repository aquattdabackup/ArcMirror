import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseVerifyOptions } from "./verify-options";

const hash = "0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981";
const fixture = `vectors/owner/${hash}.json`;

test("CLI rejects missing values, unknown flags and ambiguous positionals", () => {
  for (const args of [
    [], ["bad"], [hash, "extra"], [hash, "--reprot", "report.json"],
    ...["--fixture", "--out", "--report"].flatMap((flag) => [
      [hash, flag], [hash, flag, "--logs-only"], [hash, flag, ""],
    ]),
  ]) assert.throws(() => parseVerifyOptions(args), JSON.stringify(args));
});

test("CLI retains supported flags and file paths with spaces", () => {
  assert.deepEqual(parseVerifyOptions([
    hash, "--fixture", fixture, "--report", "saved report.json", "--out", "fresh.json", "--logs-only",
  ]), { hash, fixture, report: "saved report.json", out: "fresh.json", logsOnly: true });
});

const run = (args: string[]) => spawnSync(process.execPath, ["--import", "tsx", "scripts/verify.ts", ...args], {
  cwd: fileURLToPath(new URL("..", import.meta.url)),
  encoding: "utf8",
  timeout: 15_000,
});

test("CLI missing report path exits 2 before analysis instead of silently succeeding", () => {
  const result = run([hash, "--fixture", fixture, "--report"]);
  assert.equal(result.error, undefined);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /Usage:/);
  assert.equal(result.stdout, "");
});

test("CLI still verifies a real captured owner report offline", () => {
  const result = run([hash, "--fixture", fixture, "--report", fixture]);
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /MATCH: digest and canonical report agree/);
});
