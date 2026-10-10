import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { FeaturedOwnerDemo } from "../components/owner-demos";
import { featuredOwnerDemo, ownerDemos, labAddress } from "../lib/owner-demos";
import { ownerSnapshots, ownerSnapshotFor } from "../lib/owner-snapshots";
import { analyze } from "../../../packages/core/src/index";

test("homepage owner-demo claims agree with captured mainnet reports and deployment", () => {
  assert.equal(new Set(ownerDemos.map(d => d.hash)).size, 5);
  for (const demo of ownerDemos) {
    const { expected } = JSON.parse(readFileSync(new URL(`../../../vectors/owner/${demo.hash}.json`, import.meta.url), "utf8"));
    assert.equal(expected.chainId, 5042);
    assert.equal(demo.status, expected.status);
    assert.equal(demo.evidenceLevel, expected.evidenceLevel);
    if (demo.id === "erc20") {
      assert.equal(expected.movements.length, 1);
      assert.equal(featuredOwnerDemo.amountExact, expected.movements[0].amountExact);
      assert.equal(featuredOwnerDemo.naiveExact, expected.totals.naiveExact);
      assert.equal(featuredOwnerDemo.gasExact, expected.gas.feeExact);
    }
  }
  const manifest = JSON.parse(readFileSync(new URL("../../../contracts/deployments/5042.json", import.meta.url), "utf8"));
  assert.equal(labAddress, manifest.contracts.ArcMirrorLab.address);
});

test("featured successful ERC-20 demo discloses incomplete evidence and recorded provenance", () => {
  const html = renderToStaticMarkup(<FeaturedOwnerDemo />);
  assert.match(html, /Payment succeeded · Evidence needs review/);
  assert.match(html, /Native call-value traces do not fully cover/);
  assert.match(html, /Recorded owner-signed result/);
  assert.doesNotMatch(html, /Logs \+ trace \+ state match|0 residual|Live RPC result/);
});

test("saved owner reports retain captured provenance and reproduce full mainnet evidence", () => {
  assert.equal(ownerSnapshots.length, ownerDemos.length);
  for (const demo of ownerDemos) {
    const vector = JSON.parse(readFileSync(new URL(`../../../vectors/owner/${demo.hash}.json`, import.meta.url), "utf8"));
    const snapshot = ownerSnapshotFor(demo.hash.toUpperCase());
    assert.ok(snapshot);
    assert.equal(snapshot.capturedAt, vector.capturedAt);
    assert.equal(snapshot.provenance, vector.provenance);
    assert.deepEqual(snapshot.report, vector.expected);
    assert.deepEqual(snapshot.report, analyze(vector.input));
  }
  assert.equal(ownerSnapshotFor("0x" + "0".repeat(64)), undefined);
});
