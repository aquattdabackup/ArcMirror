import Link from "next/link";
import { InspectTool } from "../../../components/tools/inspect";
import { examples } from "../../../lib/examples";
export const metadata = {
  title: "Report inspector",
  description:
    "Check ArcMirror report integrity, compare JSON fields locally, and request fresh mainnet evidence.",
};
export default function InspectPage() {
  return (
    <div className="shell tool-page">
      <div className="breadcrumb">
        <Link href="/tools">Tools</Link>
        <span>/</span>
        <span>Report inspector</span>
      </div>
      <header className="tool-heading">
        <div className="eyebrow">REPORT INTEGRITY / LOCAL COMPARISON</div>
        <h1>
          Does this saved report
          <br />
          <em>match the evidence?</em>
        </h1>
        <p>
          For reviewers and developers checking a saved ArcMirror report.
          Find changes before using the file to explain a payment or debug an integration.
        </p>
      </header>
      <section className="tool-note" aria-label="When to inspect a saved report">
        <h2>Use this when you have a JSON export.</h2>
        <p>
          On a transaction report, choose Download JSON. Import it as Report A
          below and compare it with fresh mainnet evidence. If someone sent you
          a second export, use Report B to find the fields that changed.
        </p>
        <p>
          A digest mismatch flags inconsistent contents. A matching digest only
          checks the file against itself: someone can edit a file and recompute
          its digest. A fresh comparison checks against this service&apos;s RPC analysis,
          not independent consensus or proof of invoice payment.
        </p>
        <p>
          Only want to share a transaction?{" "}
          <Link className="text-link" href="/">Open it in the analyzer</Link>,
          use Copy link and ask the reader to choose Re-verify live. No JSON needed.
        </p>
      </section>
      <InspectTool sampleJson={JSON.stringify(examples[0].report, null, 2)} />
    </div>
  );
}
