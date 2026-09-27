import Link from "next/link";
export const metadata = {
  title: "Optional tools",
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
      "I have a list of expected transfers. Do they appear in this transaction?",
    audience: "Payment operations or a developer checking a batch.",
    input: "Your expected-payment CSV and one successful Arc transaction hash.",
    output: "See which rows match, which amounts differ, and which have no match in this transaction.",
    limit: "Does not send payments or prove an invoice is paid. Missing here does not mean unpaid elsewhere.",
    action: "Check a payment list",
  },
  {
    href: "/tools/inspect",
    label: "02 / REPRODUCIBLE EVIDENCE",
    glyph: "{ A : B }",
    title: "Report inspector",
    description:
      "Someone sent me an ArcMirror report. Does it match a fresh analysis?",
    audience: "A reviewer or developer checking saved evidence.",
    input: "An ArcMirror JSON export; optionally a second file or a fresh RPC check.",
    output: "Find changed fields and inconsistent file contents before relying on the report.",
    limit: "A matching digest does not prove authenticity. For ordinary sharing, use the transaction link and Re-verify live.",
    action: "Inspect a JSON report",
  },
  {
    href: "/tools/dust",
    label: "03 / PRECISION EXPLORER",
    glyph: "18 / 6",
    title: "Dust Lab",
    description:
      "My integration rounds tiny transfers to zero. What did it leave out?",
    audience: "Developers implementing USDC amounts and displays.",
    input: "An exact USDC amount and a repetition count.",
    output: "Compare the exact total with truncating each amount to six decimals.",
    limit: "An arithmetic simulation. It does not read your wallet, find lost funds or recover money.",
    action: "Test a rounding case",
  },
];
export default function ToolsPage() {
  return (
    <div className="shell tool-page">
      <header className="tool-heading">
        <div className="eyebrow">OPTIONAL FOLLOW-UP TOOLS</div>
        <h1>
          What do you
          <br />
          <em>need to check?</em>
        </h1>
        <p>
          Only checking where a payment went or how much gas it cost?{" "}
          <Link className="text-link" href="/">Start with the transaction analyzer</Link>.
          The tools below address specific follow-up questions. You do not need
          them to read or share a transaction.
        </p>
      </header>
      <div className="tool-catalog">
        {tools.map((tool) => (
          <article
            key={tool.href}
            className="tool-card tool-catalog-card"
          >
            <span className="eyebrow">{tool.label}</span>
            <div className="tool-glyph" aria-hidden="true">
              {tool.glyph}
            </div>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <dl className="tool-use-case">
              <dt>Who needs it</dt><dd>{tool.audience}</dd>
              <dt>Bring</dt><dd>{tool.input}</dd>
              <dt>What you can check</dt><dd>{tool.output}</dd>
            </dl>
            <p>{tool.limit}</p>
            <Link className="text-link" href={tool.href}>{tool.action} →</Link>
          </article>
        ))}
      </div>
      <p className="tool-privacy">
        Built-in examples are optional starters. Bring your own payout CSV,
        report JSON, Arc mainnet transaction hash, or exact amount. Your files
        stay in this browser; only a transaction hash is sent when you request
        a report. Dust Lab runs entirely offline after the page loads.
      </p>
    </div>
  );
}
