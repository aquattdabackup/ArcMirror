import Link from "next/link";
import { Search } from "../components/search";
import { Arrow, Check } from "../components/icons";
import { examples } from "../lib/examples";
import { FeaturedOwnerDemo, OwnerDemos } from "../components/owner-demos";
import { featuredOwnerDemo, ownerDemoHref } from "../lib/owner-demos";
export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> ARC MAINNET / USDC EVIDENCE
          </div>
          <h1>
            Understand
            <br />
            your USDC
            <br />
            <em>transaction.</em>
          </h1>
          <Search />
          <p className="hero-description">
            See who received what, what gas cost, and what the evidence
            supports. Understand your Arc payment, then share the result.
          </p>
          <p className="hero-demo-link">
            No hash yet?{" "}
            <Link className="text-link" href={ownerDemoHref(featuredOwnerDemo)}>
              Explore our 0.001 USDC demo <Arrow />
            </Link>
          </p>
          <div className="hero-small">
            <span>
              <Check /> See the actual gas fee
            </span>
            <span>
              <Check /> Check where each amount comes from
            </span>
          </div>
        </div>
        <FeaturedOwnerDemo />
      </section>
      <section className="principle-strip">
        <div className="shell principle-inner">
          <p>
            One hash. Three questions.
            <br />
            <strong>Start with the transaction report.</strong>
          </p>
          <div>
            <span className="step-number">01</span>
            <span>
              Who received what,
              <br />
              and what was the fee?
            </span>
          </div>
          <div>
            <span className="step-number">02</span>
            <span>
              Are the amounts
              <br />
              counted correctly?
            </span>
          </div>
          <div>
            <span className="step-number">03</span>
            <span>
              What evidence
              <br />
              can I share?
            </span>
          </div>
        </div>
      </section>
      <OwnerDemos />
      <section id="public-examples" className="shell section examples">
        <div className="section-heading">
          <div>
            <div className="eyebrow">ADDITIONAL PUBLIC EXAMPLES</div>
            <h2>
              Other transactions.
              <br />
              More evidence to inspect.
            </h2>
          </div>
          <p>
            Explore captured third-party activity: a payment and its gas,
            another paired-log example, and an amount that can round to zero.
          </p>
        </div>
        <div className="example-grid">
          {examples.map((e, i) => (
            <Link href={"/tx/" + e.hash} key={e.hash} className="example-card">
              <div className="card-top">
                <span className="mono">0{i + 1}</span>
                <span className="category">{e.category}</span>
                <Arrow />
              </div>
              <div className={"example-art art-" + i} aria-hidden="true">
                {i === 0 ? (
                  <>
                    <span className="art-log">18</span>
                    <span className="art-equal">=</span>
                    <span className="art-log">6</span>
                  </>
                ) : i === 1 ? (
                  <>
                    <span className="art-node" />
                    <span className="art-line" />
                    <span className="art-node end" />
                  </>
                ) : (
                  <span className="art-dust">
                    0.00000000000000000<b>1</b>
                  </span>
                )}
              </div>
              <h3>{e.title}</h3>
              <p>{e.question}</p>
              <div className="card-bottom">
                <span>
                  {i === 2
                    ? "1 native base unit"
                    : e.report.totals.grossMovementExact + " USDC"}
                </span>
                <span>View report ↗</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="caption">
          These three reports open as labelled snapshots of third-party activity.
          Use Re-verify live to fetch current RPC evidence.
        </p>
      </section>
      <section className="shell tools-home">
        <div>
          <span className="eyebrow">OPTIONAL / AFTER YOUR TRANSACTION REPORT</span>
          <h2>Have a payment list or a saved report?</h2>
          <p>
            Check expected transfers against one transaction, compare a saved
            report, or test rounding while building an Arc integration.
            You can understand and share a transaction without these tools.
          </p>
        </div>
        <Link href="/tools" className="button">
          Find the relevant tool <Arrow />
        </Link>
      </section>
      <section className="shell why-section">
        <div className="why-heading">
          <div className="eyebrow">BUILT TO BE CHECKED</div>
          <h2>
            Every number
            <br />
            has a source.
          </h2>
          <Link className="text-link" href="/how-it-works">
            See how we calculate it <Arrow />
          </Link>
        </div>
        <div className="why-items">
          <article>
            <span className="small-icon" aria-hidden="true">
              ◇
            </span>
            <div>
              <h3>One transfer, counted once</h3>
              <p>
                Match native and ERC-20 evidence one-to-one. Repeated transfers
                remain separate movements.
              </p>
            </div>
          </article>
          <article>
            <span className="small-icon" aria-hidden="true">
              ◇
            </span>
            <div>
              <h3>Confidence you can inspect</h3>
              <p>
                See which views agree, which are unavailable, and which need
                review. Missing evidence stays visible.
              </p>
            </div>
          </article>
          <article>
            <span className="small-icon" aria-hidden="true">
              ◇
            </span>
            <div>
              <h3>A report you can reproduce</h3>
              <p>
                Download exact raw amounts and a deterministic digest. Run the
                same algorithm with your own RPC.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
