"use client";
import { useState } from "react";
import Link from "next/link";
import { exactAmount, validHash } from "../../../../packages/core/src/index";
import {
  CSV_MAX_BYTES,
  parsePayoutCsv,
  reconcilePayouts,
} from "../../../../packages/core/src/reconciliation";
import type { Report } from "../../../../packages/core/src/types";
import { downloadJson, readLocalFile } from "./files";

type Output = { result: ReturnType<typeof reconcilePayouts>; source: string };
export function ReconcileTool({
  sample,
  sampleCsv,
  initialHash,
}: {
  sample: Report;
  sampleCsv: string;
  initialHash: string;
}) {
  const [hash, setHash] = useState(initialHash);
  const [csv, setCsv] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [output, setOutput] = useState<Output | null>(null);
  const [live, setLive] = useState(false);
  function clear() {
    setOutput(null);
    setError("");
  }
  async function run() {
    clear();
    try {
      const rows = parsePayoutCsv(csv);
      if (!validHash(hash.trim()))
        throw Error(
          "Enter a full 0x transaction hash with 64 hexadecimal characters.",
        );
      setBusy(true);
      const response = await fetch(
        `/api/analyze/${hash.trim()}${live ? "?live=1" : ""}`,
        { signal: AbortSignal.timeout(55000) },
      );
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw Error(
          data.error?.message ?? "Unable to load this transaction. Try again.",
        );
      setOutput({
        result: reconcilePayouts(rows, data.report),
        source:
          data.source === "snapshot"
            ? "Saved mainnet snapshot"
            : data.source === "cache"
              ? "Cached mainnet report"
              : "Live RPC report",
      });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Unable to reconcile. Check the CSV and transaction.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    clear();
    setBusy(true);
    try {
      setCsv(await readLocalFile(file, CSV_MAX_BYTES));
    } catch (e) {
      setCsv("");
      setError(e instanceof Error ? e.message : "Could not read file.");
    } finally {
      setBusy(false);
    }
  }
  function example() {
    setHash(sample.txHash);
    setCsv(sampleCsv);
    setLive(false);
    setError("");
    setOutput({
      result: reconcilePayouts(parsePayoutCsv(sampleCsv), sample),
      source: "Saved mainnet snapshot - illustrative expectations",
    });
  }
  return (
    <>
      <div className="tool-workspace">
        <section className="tool-card">
          <div className="tool-card-heading">
            <span className="step-number">01</span>
            <h2>Expected payments</h2>
          </div>
          <p>
            One row per payment. Up to 500 rows, 256 KB. Amounts accept up to 18
            decimals.
          </p>
          <fieldset disabled={busy}>
            <label htmlFor="payout-file">
              Import CSV <small>Processed on this device</small>
            </label>
            <input
              id="payout-file"
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => {
                void upload(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <label htmlFor="payout-csv">Or paste CSV</label>
            <textarea
              id="payout-csv"
              rows={9}
            maxLength={CSV_MAX_BYTES}
              spellCheck={false}
              value={csv}
              onChange={(e) => {
                setCsv(e.target.value);
                clear();
              }}
              placeholder="id,payer,recipient,amount_usdc"
              aria-describedby="csv-help"
            />
            <p id="csv-help" className="field-help">
              Columns: <code>id,payer,recipient,amount_usdc</code>. Use a unique
              id for each row, including repeated payments.
            </p>
            <button className="button" onClick={example}>
              Try mainnet example
            </button>
          </fieldset>
        </section>
        <section className="tool-card">
          <div className="tool-card-heading">
            <span className="step-number">02</span>
            <h2>Observed movements</h2>
          </div>
          <p>
            Compare with one successful transaction on Arc mainnet. Only the
            transaction hash is sent to our API.
          </p>
          <fieldset disabled={busy}>
            <label htmlFor="payout-hash">Transaction hash</label>
            <input
              id="payout-hash"
              type="text"
              spellCheck={false}
              autoComplete="off"
              value={hash}
              onChange={(e) => {
                setHash(e.target.value);
                clear();
              }}
              placeholder="0x..."
            />
            <label className="check-label">
              <input
                type="checkbox"
                checked={live}
                onChange={(e) => {
                  setLive(e.target.checked);
                  clear();
                }}
              />{" "}
              Fetch fresh RPC evidence
            </label>
            <button className="button primary" onClick={run}>
              {busy ? "Checking evidence..." : "Reconcile payments"}
            </button>
          </fieldset>
          <div className="tool-note">
            <strong>Match the movement, keep the evidence.</strong>
            <p>
              Each match needs the same payer, recipient and exact amount. Gas
              is separate. Matches do not prove invoice identity or recipient
              ownership. Missing trace coverage remains visible.
            </p>
          </div>
        </section>
      </div>
      {error ? (
        <p role="alert" className="tool-error">
          {error}
        </p>
      ) : null}
      {output ? (
        <section className="tool-results" aria-label="Reconciliation results">
          <div className="tool-result-heading">
            <div>
              <span className="eyebrow">{output.source}</span>
              <h2>
                {output.result.counts.matched} of{" "}
                {output.result.counts.expected} expectations matched
              </h2>
            </div>
            <button
              className="button"
              onClick={() =>
                downloadJson(
                  output.result,
                  `arcmirror-reconciliation-${output.result.txHash}.json`,
                )
              }
            >
              Export reconciliation JSON
            </button>
          </div>
          <p role="status">
            {output.result.counts.amountMismatch} amount mismatches /{" "}
            {output.result.counts.missing} missing matches /{" "}
            {output.result.counts.unassigned} unassigned movements
          </p>
          <div className="tool-evidence">
            <span className="badge">
              Evidence: {output.result.evidenceLevel.replaceAll("_", " ")}
            </span>
            <Link className="text-link" href={"/tx/" + output.result.txHash}>
              Inspect transaction evidence
            </Link>
          </div>
          <div className="tool-stats">
            <div>
              <small>Expected total</small>
              <strong>{output.result.expectedTotalExact} USDC</strong>
            </div>
            <div>
              <small>Matched total</small>
              <strong>{output.result.matchedTotalExact} USDC</strong>
            </div>
            <div>
              <small>Gas, excluded from matches</small>
              <strong>{output.result.gasExact ?? "Unavailable"} USDC</strong>
            </div>
          </div>
          <div
            className="tool-table-scroll"
            tabIndex={0}
            aria-label="Expected payment results"
          >
            <table className="tool-table">
              <thead>
                <tr>
                  <th>Expected payment</th>
                  <th>Exact USDC</th>
                  <th>Result</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                {output.result.rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.id}</strong>
                      <details>
                        <summary>Addresses</summary>
                        <small>Payer</small>
                        <code>{row.payer}</code>
                        <small>Recipient</small>
                        <code>{row.recipient}</code>
                      </details>
                    </td>
                    <td className="mono">
                      {exactAmount(BigInt(row.amountNative18))}
                    </td>
                    <td>
                      <span
                        className={
                          row.status === "matched"
                            ? "result-good"
                            : "result-review"
                        }
                      >
                        {row.status.replaceAll("_", " ")}
                      </span>
                    </td>
                    <td>
                      {row.movement ? (
                        <>
                          Native log {row.movement.sourceLogIndex}
                          <small>
                            Interface logs:{" "}
                            {row.movement.corroboratingLogIndexes.join(", ") ||
                              "none"}
                          </small>
                        </>
                      ) : row.candidates.length ? (
                        <>
                          {row.candidates.map((m) => (
                            <small key={m.sourceLogIndex}>
                              {m.amountExact} USDC / native log{" "}
                              {m.sourceLogIndex}
                            </small>
                          ))}
                          <small>Candidates only; not assigned</small>
                        </>
                      ) : (
                        "No unassigned movement with these parties"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {output.result.unassigned.length ? (
            <details className="tool-note">
              <summary>
                {output.result.unassigned.length} unassigned movements
              </summary>
              <p>
                These may be unrelated payments or candidates for an amount
                mismatch. They are not automatically errors.
              </p>
              {output.result.unassigned.map((m) => (
                <div className="unassigned-row" key={m.sourceLogIndex}>
                  <strong>
                    {m.amountExact} USDC / native log {m.sourceLogIndex}
                  </strong>
                  <code>
                    {m.payer} to {m.payee}
                  </code>
                </div>
              ))}
            </details>
          ) : null}
          <p className="field-help">
            A match compares recorded movements with your expectations in this
            transaction only. The mainnet example uses invented payment ids
            against an existing public transaction; it is not the owner's
            payout.
          </p>
        </section>
      ) : (
        <div className="tool-empty">
          <span className="step-number">03</span>
          <p>
            Your results will show matched, missing and unmatched amounts, with
            original log references.
          </p>
        </div>
      )}
    </>
  );
}
