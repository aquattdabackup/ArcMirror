"use client";
import { useState } from "react";
import Link from "next/link";
import type { Report } from "../../../packages/core/src/types";
import type { Result } from "../lib/service";
import { Arrow, Check } from "./icons";
import { Search } from "./search";
const short = (s: string) => s.slice(0, 8) + "…" + s.slice(-6);
const label = (s: string) => s.replaceAll("_", " ");
const reasons: Record<string, string> = {
  call_trace_coverage_incomplete:
    "The call trace does not fully represent these USDC movements. ERC-20 calls through the native precompile can move USDC with a call value of zero.",
  call_trace_unavailable: "The provider did not return a supported call trace.",
  state_diff_or_block_unavailable:
    "A transaction-local state diff or matching block is unavailable.",
  state_delta_unexplained_or_missing:
    "Some balance changes are missing or unexplained. Inspect the residuals below.",
  log_evidence_incomplete:
    "Some movement evidence is missing, malformed or unmatched.",
  logs_call_values_and_transaction_state_match:
    "System logs, supported native call values and transaction-local balance changes agree.",
};
function Address({ value }: { value: string }) {
  return (
    <a
      className="address"
      href={"https://explorer.arc.io/address/" + value}
      target="_blank"
      rel="noreferrer"
      title={value}
    >
      {short(value)} <span aria-hidden="true">↗</span>
    </a>
  );
}
export function TransactionReport({ initial }: { initial: Result }) {
  const [result, setResult] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [phantom, setPhantom] = useState(false);
  const [tab, setTab] = useState<"flow" | "logs" | "balances">("flow");
  const r: Report = result.report;
  const confirmed =
    r.status === "confirmed_success" || r.status === "confirmed_failed";
  async function refresh() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/analyze/" + r.txHash + "?live=1", {
        signal: AbortSignal.timeout(55000),
      });
      const data = await response.json();
      if (!data.ok || data.report.status === "rpc_error") {
        setMessage(
          data.error?.message ??
            "RPC is unavailable. The current report is preserved.",
        );
        return;
      }
      setResult(data);
      setMessage(
        data.report.digest === r.digest
          ? "Live verification returned the same report digest."
          : "Live evidence changed the report. Review the evidence and new digest.",
      );
    } catch {
      setMessage(
        "Could not complete live verification. The current report is preserved.",
      );
    } finally {
      setBusy(false);
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(r, null, 2) + "\n"], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `arcmirror-${r.txHash}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + "/tx/" + r.txHash,
      );
      setMessage("Report link copied.");
    } catch {
      setMessage("Copy the transaction URL from your address bar.");
    }
  }
  return (
    <div className="shell report-page">
      <div className="breadcrumb">
        <Link href="/">ArcMirror</Link>
        <span>/</span>
        <span>Transaction report</span>
      </div>
      <div className="report-heading">
        <div>
          <div className="eyebrow">ARC MAINNET · CHAIN 5042</div>
          <h1>
            Every movement,
            <br />
            <em>in the open.</em>
          </h1>
        </div>
        <div className="report-actions">
          <button className="button" onClick={copy}>
            Copy link
          </button>
          <button className="button primary" onClick={download}>
            Download JSON
          </button>
        </div>
      </div>
      <div className="transaction-meta">
        <code>{r.txHash}</code>
        <a
          href={"https://explorer.arc.io/tx/" + r.txHash}
          target="_blank"
          rel="noreferrer"
        >
          Blockscout ↗
        </a>
        <a
          href={"https://arc.etherscan.io/tx/" + r.txHash}
          target="_blank"
          rel="noreferrer"
        >
          ArcScan ↗
        </a>
      </div>
      <div className="snapshot-banner">
        <div>
          <span className="badge">
            {result.source === "snapshot"
              ? "Saved mainnet snapshot"
              : result.source === "cache"
                ? "Cached mainnet report"
                : "Live RPC result"}
          </span>
          <span>
            {result.source === "snapshot"
              ? `Captured ${result.capturedAt?.slice(0, 10)}. ${result.provenance}`
              : "Evidence reflects the latest completed analysis."}
          </span>
        </div>
        <button className="text-button" onClick={refresh} disabled={busy}>
          {busy ? "Checking RPC…" : "Re-verify live"} <Arrow />
        </button>
      </div>
      {message ? (
        <p role="status" className="notice">
          {message}
        </p>
      ) : null}
      <div className="metrics">
        <div className="metric">
          <span>Transaction status</span>
          <strong className={"status-" + r.status}>
            {r.status === "confirmed_success"
              ? "Confirmed success"
              : r.status === "confirmed_failed"
                ? "Confirmed failed"
                : label(r.status)}
          </strong>
          <small>
            {r.blockNumber
              ? "Block " + r.blockNumber
              : "No confirmed block evidence"}
          </small>
        </div>
        <div className="metric">
          <span>USDC across all movements</span>
          <strong>
            {confirmed ? r.totals.grossMovementExact : "—"} <small>USDC</small>
          </strong>
          <small>
            {r.movements.length} movement{r.movements.length === 1 ? "" : "s"} ·
            each hop counted once
          </small>
        </div>
        <div className="metric">
          <span>Gas paid separately</span>
          <strong>
            {r.gas?.feeExact ?? "—"} <small>USDC</small>
          </strong>
          <small>Receipt gas used × effective price</small>
        </div>
      </div>
      {!confirmed ? (
        <div className="empty-state">
          <h2>
            {r.status === "pending"
              ? "Waiting for a receipt"
              : r.status === "not_found"
                ? "Transaction not found"
                : r.status === "rpc_error"
                  ? "The RPC is unavailable"
                  : "More evidence is needed"}
          </h2>
          <p>
            {r.status === "not_found"
              ? "Check the full hash and confirm it belongs to Arc mainnet. Testnet is a different chain."
              : r.status === "unsupported_format"
                ? "Check the hash. ArcMirror only supports Arc mainnet and internally consistent transaction data."
                : "Try re-verifying shortly. No successful transfer is claimed without a confirmed receipt."}
          </p>
          <Search compact />
        </div>
      ) : (
        <>
          <div className="analysis-grid">
            <section className="panel flow-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">THE MONEY TRAIL</span>
                  <h2>Where did the dollar go?</h2>
                </div>
                <span className="mono count">
                  {String(r.movements.length).padStart(2, "0")} MOVEMENTS
                </span>
              </div>
              <div className="tabs" role="tablist" aria-label="Evidence view">
                {(["flow", "logs", "balances"] as const).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                  >
                    {t === "flow"
                      ? "Money flow"
                      : t === "logs"
                        ? "Source logs"
                        : "Balance proof"}
                  </button>
                ))}
              </div>
              {tab === "flow" ? (
                <div className="flows">
                  {r.movements.length === 0 ? (
                    <p className="empty-inline">
                      {r.status === "confirmed_failed"
                        ? "The transaction failed. No successful USDC movements are counted. Gas was still paid."
                        : "No canonical USDC movements were found in this receipt."}
                    </p>
                  ) : (
                    r.movements.map((m, i) => (
                      <details className="movement" key={m.sourceLogIndex}>
                        <summary>
                          <span className="movement-number">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="movement-party">
                            <small>FROM</small>
                            <span className="mono">{short(m.payer)}</span>
                          </span>
                          <span className="movement-value">
                            <strong>
                              {m.amountDisplay6} <small>USDC</small>
                            </strong>
                            <span className="flow-arrow">
                              <Arrow />
                            </span>
                            <small>Inspect amount & source +</small>
                          </span>
                          <span className="movement-party">
                            <small>TO</small>
                            <span className="mono">{short(m.payee)}</span>
                          </span>
                        </summary>
                        <div className="movement-detail">
                          <div className="detail-grid">
                            <div>
                              <small>Exact USDC</small>
                              <code>{m.amountExact}</code>
                            </div>
                            <div>
                              <small>Native raw units · 18 decimals</small>
                              <code>{m.amountNative18}</code>
                            </div>
                            <div>
                              <small>System log</small>
                              <code>#{m.sourceLogIndex}</code>
                            </div>
                            <div>
                              <small>ERC-20 corroboration</small>
                              <code>
                                {m.corroboratingLogIndexes.length
                                  ? m.corroboratingLogIndexes
                                      .map((x) => "#" + x)
                                      .join(", ")
                                  : "No paired interface log"}
                              </code>
                            </div>
                          </div>
                          <p>
                            From <Address value={m.payer} /> to{" "}
                            <Address value={m.payee} />
                          </p>
                          <pre>
                            {JSON.stringify(
                              r.logs.filter(
                                (l) =>
                                  l.logIndex === m.sourceLogIndex ||
                                  m.corroboratingLogIndexes.includes(
                                    l.logIndex,
                                  ),
                              ),
                              null,
                              2,
                            )}
                          </pre>
                        </div>
                      </details>
                    ))
                  )}
                  {r.gas ? (
                    <details className="gas-row">
                      <summary>
                        <span className="gas-symbol">◇</span>
                        <div>
                          <strong>Network fee</strong>
                          <small>Outside the transfer total</small>
                        </div>
                        <strong>{r.gas.feeExact} USDC</strong>
                        <span>Inspect +</span>
                      </summary>
                      <div className="movement-detail">
                        <p>
                          Payer <Address value={r.gas.payer} />
                        </p>
                        <p>
                          Block beneficiary{" "}
                          {r.gas.beneficiary ? (
                            <Address value={r.gas.beneficiary} />
                          ) : (
                            "Unknown"
                          )}
                        </p>
                        <code>
                          {r.gas.gasUsed} gas × {r.gas.effectiveGasPrice} ={" "}
                          {r.gas.feeNative18} native raw units
                        </code>
                      </div>
                    </details>
                  ) : null}
                  <p className="caption">
                    Click a movement amount to inspect its original logs.
                    Movement totals count each hop; they are not net wallet
                    income.
                  </p>
                </div>
              ) : tab === "logs" ? (
                <div className="logs-list">
                  {r.logs.map((l) => (
                    <details key={l.logIndex}>
                      <summary>
                        <span className="mono">#{l.logIndex}</span>
                        <strong>{label(l.role)}</strong>
                        <code>{short(l.address)}</code>
                      </summary>
                      <pre>{JSON.stringify(l, null, 2)}</pre>
                    </details>
                  ))}
                </div>
              ) : (
                <div className="balance-view">
                  <p>
                    Transaction-local balance change = incoming − outgoing −
                    paid gas + received gas. Values below are exact native raw
                    units.
                  </p>
                  {r.proof.balances.length ? (
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Address</th>
                            <th>Expected</th>
                            <th>Observed</th>
                            <th>Residual</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.proof.balances.map((b) => (
                            <tr key={b.address}>
                              <td>
                                <Address value={b.address} />
                              </td>
                              <td>{b.expectedNative18}</td>
                              <td>{b.actualNative18 ?? "Unknown"}</td>
                              <td>{b.residualNative18 ?? "Unknown"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>
                      No transaction-local state diff is available.
                      Block-to-block balances are not a substitute.
                    </p>
                  )}
                </div>
              )}
            </section>
            <aside className="panel evidence-panel">
              <span className="eyebrow">EVIDENCE CHECK</span>
              <div className={"evidence-title " + r.evidenceLevel}>
                {r.evidenceLevel === "verified" ? (
                  <Check />
                ) : (
                  <span aria-hidden="true">!</span>
                )}
                <h2>{label(r.evidenceLevel)}</h2>
              </div>
              <p>
                {r.evidenceLevel === "verified"
                  ? "All three supported views reconcile."
                  : r.evidenceLevel === "consistent"
                    ? "Logs are internally consistent. Additional proof is unavailable."
                    : "Some evidence needs a closer look."}
              </p>
              <div className="proof-checks">
                {Object.entries({
                  Logs: r.proof.logs,
                  "Call trace": r.proof.trace,
                  "State diff": r.proof.state,
                }).map(([name, status]) => (
                  <div key={name}>
                    <span>{name}</span>
                    <span
                      className={
                        status === "matches" || status === "consistent"
                          ? "positive"
                          : "review"
                      }
                    >
                      {label(status)}{" "}
                      {status === "matches" || status === "consistent"
                        ? "✓"
                        : "!"}
                    </span>
                  </div>
                ))}
              </div>
              {r.reasons.map((reason) => (
                <p className="reason" key={reason}>
                  {reasons[reason] ?? label(reason)}
                </p>
              ))}
              <Link href="/how-it-works" className="text-link">
                Understand the evidence levels <Arrow />
              </Link>
            </aside>
          </div>
          {r.totals.phantomEligible ? (
            <section
              className={"phantom panel " + (phantom ? "phantom-on" : "")}
            >
              <div>
                <div className="eyebrow">PHANTOM DOUBLE COUNT</div>
                <h2>
                  Seeing two logs?
                  <br />
                  Count the movement once.
                </h2>
                <p>
                  The same USDC appears through two interfaces.
                  <br />
                  Summing both representations inflates the result.
                </p>
                <button
                  className="button"
                  onClick={() => setPhantom(!phantom)}
                  aria-pressed={phantom}
                >
                  {phantom ? "Hide comparison" : "Show double-count comparison"}{" "}
                  <Arrow />
                </button>
              </div>
              <div className="phantom-numbers">
                <div className={phantom ? "naive active" : "naive"}>
                  <span>If both log streams were added</span>
                  <strong>
                    {phantom ? r.totals.naiveExact : "—"} <small>USDC</small>
                  </strong>
                </div>
                <div className="reconciled">
                  <span>Reconciled movement total</span>
                  <strong>
                    {r.totals.grossMovementExact} <small>USDC</small>
                  </strong>
                  <small>
                    Matched by sender, recipient and exact scaled amount.
                  </small>
                </div>
              </div>
            </section>
          ) : null}
        </>
      )}
      <section className="proof-export panel">
        <div>
          <div className="eyebrow">TAKE THE EVIDENCE WITH YOU</div>
          <h2>A shareable, reproducible report.</h2>
          <p>
            Algorithm {r.algorithmVersion} · schema {r.schemaVersion}. Download
            this JSON, then compare it using your own RPC.
          </p>
        </div>
        <div className="digest-box">
          <span className="mono">KECCAK256 / CANONICAL REPORT</span>
          <code>{r.digest}</code>
          <code className="command">
            npm run verify -- {r.txHash} --report report.json
          </code>
        </div>
      </section>
      <details className="limitations">
        <summary>Scope, warnings and limitations</summary>
        <ul>
          {[...r.warnings.map(label), ...r.limits].map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
        <p>
          A digest detects report differences. It does not establish consensus
          or prove an RPC operator is honest.
        </p>
      </details>
    </div>
  );
}
