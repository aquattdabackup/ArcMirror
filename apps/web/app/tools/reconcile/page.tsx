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
          Were the expected
          <br />
          <em>transfers recorded?</em>
        </h1>
        <p>
          For someone checking a batch of transfers: compare your expected
          sender, recipient and amount against one successful Arc transaction.
          Use the results to investigate differences before marking your own records.
        </p>
      </header>
      <section className="tool-note" aria-label="When to use reconciliation">
        <h2>Start with what you expected to pay.</h2>
        <p>
          For example, if your list expects 2 USDC from A to B but the transaction
          records 1.9, the row shows an amount mismatch. Two identical expected
          payments need two separate recorded movements to both match.
        </p>
        <p>
          Bring a CSV prepared from your payment instructions, not copied from
          this report. A missing match only means it was not found in this
          transaction; it does not establish unpaid debt or check other transactions.
          This tool does not send payments or identify invoices.
        </p>
        <p>
          To learn the controls, try the sample, change one amount, then reconcile
          again. Its payment ids are invented for a public transaction; it is
          not a real customer payout. Only checking one transfer?{" "}
          <Link className="text-link" href="/">Use the transaction analyzer</Link>.
        </p>
      </section>
      <ReconcileTool
        sample={sample}
        sampleCsv={csv}
        initialHash={typeof tx === "string" ? tx.slice(0, 256) : ""}
      />
    </div>
  );
}
