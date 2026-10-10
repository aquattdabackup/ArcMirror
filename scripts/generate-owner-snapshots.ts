import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { analyze, type Bundle, type Report } from "../packages/core/src/index";
import { ownerDemos } from "../apps/web/lib/owner-demos";

// Reuse captured public evidence; never replace its capture date with today's date.
const snapshots = [];
for (const demo of ownerDemos) {
  const vector: { input: Bundle; expected: Report; capturedAt: string; provenance: string } =
    JSON.parse(await readFile(new URL(`../vectors/owner/${demo.hash}.json`, import.meta.url), "utf8"));
  assert.equal(vector.input.chainId, 5042);
  assert.equal(vector.expected.txHash, demo.hash);
  assert.equal(vector.expected.status, demo.status);
  assert.equal(vector.expected.evidenceLevel, demo.evidenceLevel);
  assert.ok(Number.isFinite(Date.parse(vector.capturedAt)), "Capture date required");
  assert.match(vector.provenance, /Owner-created/);
  assert.deepEqual(analyze(vector.input), vector.expected, "Review changed analysis before publishing a snapshot");
  snapshots.push({ hash: demo.hash, capturedAt: vector.capturedAt, provenance: vector.provenance, report: vector.expected });
}
await writeFile(new URL("../apps/web/lib/owner-snapshots.json", import.meta.url), JSON.stringify(snapshots, null, 2) + "\n");
console.log(`Generated ${snapshots.length} owner snapshots from captured mainnet evidence.`);
