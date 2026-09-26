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
          Trust starts
          <br />
          <em>with a second look.</em>
        </h1>
        <p>
          Inspect a downloaded report. Find exactly what changed between two
          files, or compare with fresh mainnet evidence.
        </p>
      </header>
      <InspectTool sampleJson={JSON.stringify(examples[0].report, null, 2)} />
    </div>
  );
}
