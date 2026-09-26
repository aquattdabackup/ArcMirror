import Link from "next/link";
import { Search } from "../components/search";
import { Arrow, Check } from "../components/icons";
import { examples } from "../lib/examples";
export default function Home() {
  const native = examples[1];
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> ARC MAINNET / USDC EVIDENCE
          </div>
          <h1>
            One movement.
            <br />
            Every trace
            <br />
            <em>accounted for.</em>
          </h1>
          <p className="hero-description">
            Two representations. One USDC balance.
            <br />
            See where the money went, what gas cost, and why the numbers add up.
          </p>
          <Search />
          <div className="hero-small">
            <span>
              <Check /> Exact integer amounts
            </span>
            <span>
              <Check /> Reproducible reports
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-grid" />
          <div className="visual-top">
            <span className="mono">A CLOSER LOOK</span>
            <span className="pill">Real mainnet example</span>
          </div>
          <div className="visual-title">Follow the cent.</div>
          <div className="visual-subtitle">
            One transfer. Three matching views.
          </div>
          <div className="orbit">
            <span className="orbit-line" />
            <div className="coin">
              <span>$</span>
              <small>USDC</small>
            </div>
            <div className="orbit-tag tag-one">
              18 decimals <span>native</span>
            </div>
            <div className="orbit-tag tag-two">
              6 decimals <span>ERC-20 interface</span>
            </div>
          </div>
          <div className="visual-ledger">
            <div>
              <span>Recipient received</span>
              <strong>
                0.010000 <small>USDC</small>
              </strong>
            </div>
            <div>
              <span>Gas paid separately</span>
              <strong>
                0.000420 <small>USDC</small>
              </strong>
            </div>
            <div className="ledger-final">
              <span>
                <Check /> Logs + trace + state match
              </span>
              <span>0 residual</span>
            </div>
          </div>
          <Link href={"/tx/" + native.hash} className="visual-cta">
            Inspect the evidence <Arrow />
          </Link>
          <div className="visual-footnote">
            Public transaction · snapshot from September 24, 2026
          </div>
        </div>
      </section>
      <section className="principle-strip">
        <div className="shell principle-inner">
          <p>
            A receipt is a starting point.
            <br />
            <strong>Understanding it should be simple.</strong>
          </p>
          <div>
            <span className="step-number">01</span>
            <span>
              Follow each
              <br />
              USDC movement
            </span>
          </div>
          <div>
            <span className="step-number">02</span>
            <span>
              Inspect its
              <br />
              original evidence
            </span>
          </div>
          <div>
            <span className="step-number">03</span>
            <span>
              Export and
              <br />
              re-run the proof
            </span>
          </div>
        </div>
      </section>
      <section id="examples" className="shell section examples">
        <div className="section-heading">
          <div>
            <div className="eyebrow">START WITH THE EVIDENCE</div>
            <h2>
              Small transactions.
              <br />
              Useful questions.
            </h2>
          </div>
          <p>
            Start with three saved mainnet cases, or analyze your own hash
            above.
            <br />
            Snapshots stay available when an RPC does not.
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
          These reusable starter cases come from existing public activity.
          ArcMirror also analyzes other Arc mainnet transaction hashes;
          owner-created Lab cases are planned.
        </p>
      </section>
      <section className="shell tools-home">
        <div>
          <span className="eyebrow">PUT THE EVIDENCE TO WORK</span>
          <h2>A workbench for exact answers.</h2>
          <p>
            Reconcile a payout CSV, compare downloaded reports, or explore the
            smallest USDC amounts.
          </p>
        </div>
        <Link href="/tools" className="button primary">
          Open the tools <Arrow />
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
