import Link from "next/link";
import { ReconcileTool } from "../../../components/tools/reconcile";
import { examples } from "../../../lib/examples";
export const metadata = {
  title: "Payout reconciliation",
  description:
    "Match an expected CSV to exact Arc mainnet USDC movements. Your payment list stays in your browser.",
};
export default async function ReconcilePage({
  searchParams,
}: {
  searchParams: Promise<{ tx?: string }>;
}) {
  const { tx } = await searchParams;
  const sample = examples[0].report;
  const csv =
    "id,payer,recipient,amount_usdc\n" +
    sample.movements
      .map((m, i) => `example-${i + 1},${m.payer},${m.payee},${m.amountExact}`)
      .join("\n");
  return (
    <div className="shell tool-page">
      <div className="breadcrumb">
        <Link href="/tools">Tools</Link>
        <span>/</span>
        <span>Payout reconciliation</span>
      </div>
      <header className="tool-heading">
        <div className="eyebrow">PAYMENT OPERATIONS / ARC MAINNET</div>
        <h1>
          Expected. Observed.
          <br />
          <em>Accounted for.</em>
        </h1>
        <p>
          Bring a payment list. Find the matching USDC movements, spot
          differences, and take the evidence with you.
        </p>
      </header>
      <ReconcileTool
        sample={sample}
        sampleCsv={csv}
        initialHash={typeof tx === "string" ? tx.slice(0, 66) : ""}
      />
    </div>
  );
}
