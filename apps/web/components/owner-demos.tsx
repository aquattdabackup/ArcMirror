import Link from "next/link";
import { Arrow } from "./icons";
import { featuredOwnerDemo as demo, labAddress, ownerDemoHref, ownerDemos, ownerEvidenceUrl } from "../lib/owner-demos";

export function FeaturedOwnerDemo() {
  return (
    <section className="hero-visual featured-owner" aria-label="Recorded owner ERC-20 demonstration">
      <div className="visual-grid" />
      <div className="visual-top">
        <span className="mono">OUR MAINNET DEMO</span>
        <span className="pill">Arc · chain 5042</span>
      </div>
      <div className="visual-title">{demo.amountExact} USDC sent.</div>
      <p className="visual-subtitle">Two log entries describe this one payment.</p>
      <div className="orbit" aria-hidden="true">
        <span className="orbit-line" />
        <div className="coin"><span>$</span><small>ONE PAYMENT</small></div>
        <div className="orbit-tag tag-one">18 decimals <span>native log</span></div>
        <div className="orbit-tag tag-two">6 decimals <span>ERC-20 log</span></div>
      </div>
      <div className="visual-ledger">
        <div className="owner-naive"><span>If both logs were added</span><strong>{demo.naiveExact} <small>USDC</small></strong></div>
        <div><span>Actual movement</span><strong>{demo.amountExact} <small>USDC</small></strong></div>
        <div><span>Gas paid separately</span><strong>{demo.gasExact} <small>USDC</small></strong></div>
      </div>
      <p className="owner-evidence-note"><strong>Payment succeeded · Evidence needs review</strong><br />
        Native call-value traces do not fully cover this ERC-20 transfer.
      </p>
      <Link href={ownerDemoHref(demo)} className="visual-cta">Inspect the two source records <Arrow /></Link>
      <p className="visual-footnote">Recorded owner-signed result. Open the report to re-verify live.</p>
    </section>
  );
}

export function OwnerDemos() {
  return (
    <section id="examples" className="shell section owner-demos" aria-labelledby="owner-demos-title">
      <div className="section-heading">
        <div><div className="eyebrow">BUILT AND TESTED ON ARC MAINNET</div><h2 id="owner-demos-title">Five transactions.<br />Five things you can check.</h2></div>
        <p>These transactions were created for ArcMirror. The outcomes below come from recorded evidence; opening a report uses Arc RPC or a recent cached analysis. Receipt outcome and evidence coverage are separate.</p>
      </div>
      <div className="owner-demo-grid">
        {ownerDemos.map((item, index) => (
          <Link className="owner-demo-card" href={ownerDemoHref(item)} key={item.id}>
            <span className="owner-demo-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{item.title}</h3><p>{item.question}</p>
              <span className="owner-demo-status">Recorded: {item.status === "confirmed_failed" ? "failed receipt" : "successful receipt"} · evidence {item.evidenceLevel.replaceAll("_", " ")}</span>
            </div><Arrow />
          </Link>
        ))}
      </div>
      <div className="owner-proof-links">
        <a className="text-link" href={ownerEvidenceUrl}>Deployment and all five receipts <Arrow /></a>
        <a className="text-link" href={`https://arc.etherscan.io/address/${labAddress}`}>ArcMirrorLab on ArcScan <Arrow /></a>
        <span>No wallet connection or new transaction needed.</span>
      </div>
    </section>
  );
}
