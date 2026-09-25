import Link from "next/link";
export const metadata = {
  title: "Tools",
  description: "Practical tools for exact Arc USDC evidence.",
};
export default function ToolsPage() {
  return (
    <div className="shell tool-page">
      <header className="tool-heading">
        <div className="eyebrow">THE ARCMIRROR WORKBENCH</div>
        <h1>
          From numbers
          <br />
          <em>to answers.</em>
        </h1>
        <p>
          Practical tools for payment operations and Arc builders. No wallet
          connection. No funds to move.
        </p>
      </header>
      <div className="tool-catalog">
        <Link href="/tools/reconcile" className="tool-card tool-catalog-card">
          <span className="eyebrow">01 / PAYMENT OPERATIONS</span>
          <div className="tool-glyph" aria-hidden="true">
            CSV / USDC
          </div>
          <h2>Payout reconciliation</h2>
          <p>
            Match your payment list to exact mainnet movements. Catch missing
            amounts and preserve every repeated payment.
          </p>
          <span className="text-link">Reconcile a payment list</span>
        </Link>
      </div>
      <p className="tool-privacy">
        Your files stay in this browser. Only a transaction hash is sent when
        you request a report.
      </p>
    </div>
  );
}
