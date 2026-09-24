import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { analyze } from "../src/index";
const path = new URL("../../../vectors/", import.meta.url);
for (const file of readdirSync(path).filter((f) => f.endsWith(".json"))) {
  test("frozen mainnet vector " + file.slice(0, 14), () => {
    const v = JSON.parse(readFileSync(new URL(file, path), "utf8"));
    assert.deepEqual(analyze(v.input), v.expected);
    assert.ok(v.provenance.includes("Not created by ArcMirror"));
  });
}
