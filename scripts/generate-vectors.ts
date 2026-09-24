import { readFile, mkdir, writeFile } from "node:fs/promises";
import { analyze, type Bundle } from "../packages/core/src/index";
const source = new URL("../docs/evidence/spike/", import.meta.url);
const read = async (name: string) =>
  JSON.parse(
    (await readFile(new URL(name, source), "utf8")).replace(/^\uFEFF/, ""),
  );
const caps = await read("provider-capabilities.json");
const erc = await read("erc20-traces.json");
const specs = [
  {
    hash: erc.txHash,
    title: "Two logs. One movement.",
    question: "Would your indexer count this USDC twice?",
    category: "ERC-20 reconciliation",
  },
  {
    hash: caps.txHash,
    title: "Where did the cent go?",
    question: "Follow 0.01 USDC, then account for the gas.",
    category: "Native transfer",
  },
  {
    hash: "0x37567ff71a01f4966f0c4d5c4155dde45a293fd4450a57ce3c69d96c9777b3de",
    title: "Smaller than a microdollar.",
    question: "What disappears in a six-decimal view?",
    category: "Native dust",
  },
];
await mkdir(new URL("../vectors/", import.meta.url), { recursive: true });
const examples = [];
for (const spec of specs) {
  const s = await read(spec.hash + ".json");
  const input: Bundle = {
    chainId: 5042,
    txHash: spec.hash,
    transaction: s.tx.result,
    receipt: s.receipt.result,
    block: s.block.result,
  };
  if (spec.hash === caps.txHash) {
    const c = caps.capabilities.find((x: any) => x.endpoint.includes("drpc"));
    input.callTrace = c.callTrace.result;
    input.stateDiff = c.stateDiff.result;
  }
  if (spec.hash === erc.txHash) {
    input.callTrace = erc.callTrace.result;
    input.stateDiff = erc.stateDiff.result;
  }
  const report = analyze(input);
  if (report.status !== "confirmed_success")
    throw Error("Refusing an unconfirmed example");
  const provenance =
    "Existing public Arc mainnet transaction. Not created by ArcMirror or its owner.";
  const vector = {
    provenance,
    capturedAt: s.observedAt,
    input,
    expected: report,
  };
  await writeFile(
    new URL("../vectors/" + spec.hash + ".json", import.meta.url),
    JSON.stringify(vector, null, 2) + "\n",
  );
  examples.push({ ...spec, provenance, capturedAt: s.observedAt, report });
}
await mkdir(new URL("../apps/web/lib/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../apps/web/lib/snapshots.json", import.meta.url),
  JSON.stringify(examples, null, 2) + "\n",
);
console.log(
  `Generated ${examples.length} verified-source snapshots and deterministic expected reports.`,
);
