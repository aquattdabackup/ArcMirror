"use client";
import { useState } from "react";
import Link from "next/link";
import {
  compareReports,
  inspectReportJson,
  REPORT_MAX_BYTES,
  type InspectedReport,
} from "../../../../packages/core/src/inspection";
import { downloadJson, readLocalFile } from "./files";

type Slot = { text: string; inspection: InspectedReport | null; error: string };
const empty: Slot = { text: "", inspection: null, error: "" };
function ReportInput({
  name,
  slot,
  disabled,
  onChange,
  onInspect,
  onFile,
}: {
  name: string;
  slot: Slot;
  disabled: boolean;
  onChange: (text: string) => void;
  onInspect: () => void;
  onFile: (file?: File) => void;
}) {
  const r = slot.inspection;
  return (
    <section className="tool-card">
      <h2>Report {name}</h2>
      <fieldset disabled={disabled}>
        <label htmlFor={"report-file-" + name}>
          Import JSON <small>Up to 2 MB. File stays on this device.</small>
        </label>
        <input
          id={"report-file-" + name}
          type="file"
          accept=".json,application/json"
          onChange={(e) => {
            onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <label htmlFor={"report-json-" + name}>Or paste report {name}</label>
        <textarea
          id={"report-json-" + name}
          rows={7}
          maxLength={REPORT_MAX_BYTES}
          value={slot.text}
          spellCheck={false}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the complete Download JSON report"
        />
        <button className="button primary" onClick={onInspect}>
          Inspect report {name}
        </button>
      </fieldset>
      {slot.error ? (
        <p role="alert" className="tool-error">
          {slot.error}
        </p>
      ) : null}
      {r ? (
        <div className="inspection-summary">
          <p
            role="status"
            className={r.digestMatches ? "result-good" : "result-review"}
          >
            {r.digestMatches
              ? "Digest matches file contents"
              : "Digest mismatch - contents or digest changed"}
          </p>
          <p>
            Schema 1.0.0 accepted. This checks structure and integrity, not
            authenticity.
          </p>
          <dl>
            <dt>Transaction</dt>
            <dd>
              <Link className="text-link" href={"/tx/" + r.report.txHash}>
                <code>{r.report.txHash}</code>
              </Link>
            </dd>
            <dt>Reported status / evidence</dt>
            <dd>
              {r.report.status.replaceAll("_", " ")} /{" "}
              {r.report.evidenceLevel.replaceAll("_", " ")}
            </dd>
            <dt>Computed digest</dt>
            <dd>
              <code>{r.computedDigest}</code>
            </dd>
            <dt>Algorithm</dt>
            <dd>{r.report.algorithmVersion}</dd>
          </dl>
        </div>
      ) : null}
    </section>
  );
}
export function InspectTool({ sampleJson }: { sampleJson: string }) {
  const [a, setA] = useState<Slot>(empty);
  const [b, setB] = useState<Slot>(empty);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [fresh, setFresh] = useState<InspectedReport | null>(null);
  const comparison =
    a.inspection && (fresh || b.inspection)
      ? compareReports(a.inspection.report, (fresh || b.inspection)!.report)
      : null;
  function change(name: "A" | "B", text: string) {
    (name === "A" ? setA : setB)({ text, inspection: null, error: "" });
    setFresh(null);
    setMessage("");
  }
  function inspect(name: "A" | "B", text: string) {
    const set = name === "A" ? setA : setB;
    setFresh(null);
    setMessage("");
    try {
      set({ text, inspection: inspectReportJson(text), error: "" });
    } catch (e) {
      set({
        text,
        inspection: null,
        error: e instanceof Error ? e.message : "Could not inspect report.",
      });
    }
  }
  async function upload(name: "A" | "B", file?: File) {
    if (!file) return;
    setBusy(true);
    setFresh(null);
    setMessage("");
    try {
      inspect(name, await readLocalFile(file, REPORT_MAX_BYTES));
    } catch (e) {
      (name === "A" ? setA : setB)({
        text: "",
        inspection: null,
        error: e instanceof Error ? e.message : "Could not read file.",
      });
    } finally {
      setBusy(false);
    }
  }
  async function live() {
    if (!a.inspection) return;
    setBusy(true);
    setFresh(null);
    setMessage("Fetching fresh mainnet evidence...");
    try {
      const response = await fetch(
        `/api/analyze/${a.inspection.report.txHash}?live=1`,
        { signal: AbortSignal.timeout(55000) },
      );
      const data = await response.json();
      if (!response.ok || !data.ok || data.report?.status === "rpc_error")
        throw Error(
          "Live evidence is unavailable. Your imported files are preserved.",
        );
      const inspected = inspectReportJson(JSON.stringify(data.report));
      if (
        !inspected.digestMatches ||
        inspected.report.txHash.toLowerCase() !==
          a.inspection.report.txHash.toLowerCase()
      )
        throw Error(
          "The live response could not be checked against the requested transaction.",
        );
      setFresh(inspected);
      setMessage(
        "Fresh RPC report loaded. Compare its fields below; this is not independent provider consensus.",
      );
    } catch (e) {
      setMessage(
        e instanceof Error
          ? e.message
          : "Could not fetch live evidence. Your files are preserved.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="tool-toolbar">
        <button
          className="button"
          disabled={busy}
          onClick={() => inspect("A", sampleJson)}
        >
          Load mainnet example into A
        </button>
        <span>Use B for an optional second report.</span>
      </div>
      <div className="tool-workspace">
        {(["A", "B"] as const).map((name) => (
          <ReportInput
            key={name}
            name={name}
            slot={name === "A" ? a : b}
            disabled={busy}
            onChange={(text) => change(name, text)}
            onInspect={() => inspect(name, (name === "A" ? a : b).text)}
            onFile={(file) => void upload(name, file)}
          />
        ))}
      </div>
      <div className="tool-note">
        <strong>
          A matching digest can still belong to a fabricated report.
        </strong>
        <p>
          Anyone can edit content and compute a new digest. These checks do not
          validate transaction execution or evidence claims. Fetch fresh mainnet
          evidence or rerun the CLI with your own provider to compare.
        </p>
        <button
          className="button"
          disabled={busy || !a.inspection}
          onClick={live}
        >
          {busy ? "Working..." : "Compare A with fresh RPC"}
        </button>
        {fresh && b.inspection ? (
          <button
            className="text-button"
            onClick={() => {
              setFresh(null);
              setMessage("");
            }}
          >
            Return to A vs B
          </button>
        ) : null}
        <p role="status">{message}</p>
      </div>
      {comparison ? (
        <section className="tool-results">
          <div className="tool-result-heading">
            <div>
              <span className="eyebrow">
                {fresh ? "REPORT A / FRESH RPC" : "REPORT A / REPORT B"}
              </span>
              <h2>
                {comparison.differences.length === 0
                  ? "The reports are identical."
                  : `${comparison.differences.length}${comparison.truncated ? "+" : ""} changed field${comparison.differences.length === 1 ? "" : "s"}`}
              </h2>
            </div>
            <button
              className="button"
              onClick={() =>
                downloadJson(
                  {
                    kind: "arcmirror-report-comparison",
                    leftDigest: a.inspection!.computedDigest,
                    rightDigest: (fresh || b.inspection)!.computedDigest,
                    leftIntegrity: a.inspection!.digestMatches,
                    rightIntegrity: (fresh || b.inspection)!.digestMatches,
                    source: fresh ? "fresh RPC" : "local report B",
                    ...comparison,
                    limit:
                      "Field equality and digest integrity do not establish authenticity or consensus.",
                  },
                  "arcmirror-comparison.json",
                )
              }
            >
              Export comparison JSON
            </button>
          </div>
          {!comparison.sameTransaction ? (
            <p className="tool-error">
              Different transactions. This comparison is exploratory; it is not
              a re-verification of the same transaction.
            </p>
          ) : null}
          {!comparison.sameAlgorithm ? (
            <p className="notice">
              Algorithm versions differ; computed evidence may not be directly
              comparable.
            </p>
          ) : null}
          {!(
            a.inspection!.digestMatches &&
            (fresh || b.inspection)!.digestMatches
          ) ? (
            <p className="tool-error">
              At least one file has a digest mismatch. Inspect its integrity
              before relying on the comparison.
            </p>
          ) : null}
          {comparison.differences.length ? (
            <div
              className="tool-table-scroll"
              tabIndex={0}
              aria-label="Changed report fields"
            >
              <table className="tool-table diff-table">
                <thead>
                  <tr>
                    <th>Field path</th>
                    <th>Report A</th>
                    <th>{fresh ? "Fresh RPC" : "Report B"}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.differences.map((d) => (
                    <tr key={d.path}>
                      <td>
                        <code>{d.path}</code>
                      </td>
                      <td>
                        <code>
                          {d.before.slice(0, 500)}
                          {d.before.length > 500 ? "..." : ""}
                        </code>
                      </td>
                      <td>
                        <code>
                          {d.after.slice(0, 500)}
                          {d.after.length > 500 ? "..." : ""}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>
              Every field is equal after canonical key ordering. This does not
              make the reported evidence independently verified.
            </p>
          )}
          <p className="field-help">
            Array order matters. Up to 200 changed fields are listed; long
            values are shortened on screen. The export includes full values for
            listed fields.
          </p>
        </section>
      ) : null}
    </>
  );
}
