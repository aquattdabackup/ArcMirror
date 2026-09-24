import Link from "next/link";
import { Arrow } from "../../components/icons";
import { examples } from "../../lib/examples";
export const metadata = { title: "How it works" };
export default function How() {
  return (
    <div className="shell how-page">
      <div className="eyebrow">THE METHOD, IN THE OPEN</div>
      <h1>
        Every number.
        <br />
        <em>Back to its source.</em>
      </h1>
      <p className="intro">
        Arc exposes native USDC at 18 decimals and an ERC-20 interface at 6
        decimals. They share one balance. ArcMirror explains their evidence
        without adding the same movement twice.
      </p>
      <div className="method-grid">
        <article className="panel">
          <span className="step-number">01</span>
          <h2>Read the right emitter</h2>
          <p>
            The native system address supplies canonical USDC movements. A
            Transfer event from any other token is excluded, even when its event
            signature is identical.
          </p>
          <code>0xfffffffffffffffffffffffffffffffffffffffe</code>
        </article>
        <article className="panel">
          <span className="step-number">02</span>
          <h2>Pair, without collapsing</h2>
          <p>
            Match each interface log to one unused system log with the same
            sender, recipient and exact scaled amount. The closest log index
            wins, with lower index as the tie-breaker.
          </p>
          <code>value18 = value6 × 10^12</code>
        </article>
        <article className="panel">
          <span className="step-number">03</span>
          <h2>Account for the fee</h2>
          <p>
            Gas comes from the receipt, outside movement totals. Trace and
            transaction-local state diff can corroborate the movement and fee
            beneficiary when supported.
          </p>
          <code>gasUsed × effectiveGasPrice</code>
        </article>
      </div>
      <section className="method-section">
        <h2>Precision is part of the evidence.</h2>
        <p>
          All arithmetic uses integers. A native amount of 1 is exactly
          0.000000000000000001 USDC. A six-decimal display marks this as less
          than 0.000001, and every amount opens its exact value and raw units.
          There is no floating-point rounding in the report.
        </p>
      </section>
      <section className="method-section">
        <h2>Three evidence levels.</h2>
        <div className="evidence-explain">
          <div>
            <span className="badge verified">Verified</span>
            <p>
              System movements, supported call-value edges and transaction-local
              balance deltas all match, including the paid fee and beneficiary.
            </p>
          </div>
          <div>
            <span className="badge">Consistent</span>
            <p>
              Log evidence is internally consistent. At least one additional
              view is unavailable. This is a useful explanation with a stated
              limit.
            </p>
          </div>
          <div>
            <span className="badge needs_review">Needs review</span>
            <p>
              Evidence is missing, malformed, unmatched or outside supported
              trace coverage. Any unexplained balance residual remains visible.
            </p>
          </div>
        </div>
        <p className="notice">
          Our real mainnet spike found ERC-20 USDC movements through a native
          precompile with zero CALL values. A simple sum of call values cannot
          verify them. ArcMirror exposes that limitation rather than declaring a
          match.
        </p>
      </section>
      <section className="method-section">
        <h2>Re-run the same calculation.</h2>
        <p>
          Download a report and run the verifier from the repository. Configure
          your own provider locally with ARC_RPC_URLS and ARC_TRACE_RPC_URLS.
          The CLI recomputes the canonical JSON and its keccak256 digest, and
          names any fields that differ.
        </p>
        <pre>
          npm install{"\n"}npm run verify -- &lt;transaction-hash&gt; --report
          report.json
        </pre>
        <p>
          No collection timestamps or RPC credentials are part of the canonical
          report. Different evidence availability or algorithm versions can
          legitimately change the digest. Three views are not necessarily three
          independent providers; the digest is not a proof of chain consensus.
        </p>
      </section>
      <section className="method-section">
        <h2>A focused tool, with open limits.</h2>
        <p>
          ArcMirror handles USDC evidence on Arc mainnet, chain 5042. It does
          not infer payment intent, interpret other tokens, decode memos or
          claim historical fork coverage. Failed transactions retain their gas
          fee; pending transactions are never reported as successful. Existing
          indexers, including Dune, already deduplicate Arc USDC. Our focus is a
          clear, reproducible explanation of one transaction.
        </p>
        <p>
          <a
            href="https://docs.arc.io/arc/references/usdc-system-events"
            target="_blank"
            rel="noreferrer"
          >
            Arc system events ↗
          </a>{" "}
          ·{" "}
          <a
            href="https://docs.dune.com/data-catalog/curated/token-transfers/arc/arc-token-transfers"
            target="_blank"
            rel="noreferrer"
          >
            Dune methodology ↗
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/aquattdabackup/ArcMirror"
            target="_blank"
            rel="noreferrer"
          >
            Source and test vectors ↗
          </a>
        </p>
      </section>
      <Link className="button primary" href={"/tx/" + examples[0].hash}>
        Explore a real report <Arrow />
      </Link>
    </div>
  );
}
