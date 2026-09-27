import Link from "next/link";
import { DustTool } from "../../../components/tools/dust";
import { examples } from "../../../lib/examples";
export const metadata = {
  title: "Dust Lab",
  description:
    "Explore Arc USDC precision: exact 18-decimal amounts, six-decimal truncation and the remainder that must not disappear.",
};
export default function DustPage() {
  return (
    <div className="shell tool-page">
      <div className="breadcrumb">
        <Link href="/tools">Tools</Link>
        <span>/</span>
        <span>Dust Lab</span>
      </div>
      <header className="tool-heading">
        <div className="eyebrow">DEVELOPER TOOL / ARITHMETIC SIMULATION</div>
        <h1>
          Does rounding hide
          <br />
          <em>part of the amount?</em>
        </h1>
        <p>
          For developers building payment reports or balance displays. Compare
          an exact amount with truncating it to six decimals, then check what
          repeated truncation would leave out.
        </p>
      </header>
      <section className="tool-note" aria-label="When to use Dust Lab">
        <h2>Diagnose a rounding bug, without moving money.</h2>
        <p>
          Example: 0.0000009 USDC repeated 10 times totals 0.000009 USDC.
          Truncating each movement to six decimals first makes their displayed
          sum zero. Use this to decide whether your code preserves raw amounts
          until after summing.
        </p>
        <p>
          Enter an amount and count below. These are hypothetical calculations;
          this tool does not inspect your wallet or find money you can recover.
          To understand a particular tiny transfer,{" "}
          <Link className="text-link" href={"/tx/" + examples[2].hash}>open the real dust transaction</Link>.
        </p>
      </section>
      <DustTool exampleHash={examples[2].hash} />
    </div>
  );
}
