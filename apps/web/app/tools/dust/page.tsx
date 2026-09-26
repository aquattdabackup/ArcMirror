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
        <div className="eyebrow">PRECISION EXPLORER / NO TRANSACTIONS</div>
        <h1>
          Every last digit
          <br />
          <em>has a place.</em>
        </h1>
        <p>
          Explore the gap between 18 native decimals and a 6-decimal interface.
          See the remainder, then see what happens when small amounts add up.
        </p>
      </header>
      <DustTool exampleHash={examples[2].hash} />
    </div>
  );
}
