import Link from "next/link";
export const metadata = {
  title: "Tools",
  description:
    "Local CSV payout reconciliation, report integrity checks and exact USDC precision tools for Arc.",
};
const tools = [
  {
    href: "/tools/reconcile",
    label: "01 / PAYMENT OPERATIONS",
    glyph: "CSV / USDC",
    title: "Payout reconciliation",
    description:
      "Match your payment list to exact mainnet movements. Catch missing amounts and preserve every repeated payment.",
    action: "Reconcile a payment list",
  },
  {
    href: "/tools/inspect",
    label: "02 / REPRODUCIBLE EVIDENCE",
    glyph: "{ A : B }",
    title: "Report inspector",
    description:
      "Check a file's digest, compare two reports field by field, or request fresh mainnet evidence.",
    action: "Inspect a JSON report",
  },
  {
    href: "/tools/dust",
    label: "03 / PRECISION EXPLORER",
    glyph: "18 / 6",
    title: "Dust Lab",
    description:
      "See the twelve decimal places a six-decimal display leaves behind. Explore exact amounts and accumulated remainders.",
    action: "Explore the smallest amounts",
  },
];
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
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="tool-card tool-catalog-card"
          >
            <span className="eyebrow">{tool.label}</span>
            <div className="tool-glyph" aria-hidden="true">
              {tool.glyph}
            </div>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <span className="text-link">{tool.action}</span>
          </Link>
        ))}
      </div>
      <p className="tool-privacy">
        Your files stay in this browser. Only a transaction hash is sent when
        you request a report. Dust Lab runs entirely offline after the page
        loads.
      </p>
    </div>
  );
}
