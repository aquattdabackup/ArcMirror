import type { Report } from "../../../packages/core/src/types";

/** Explain the existing evidence; never infer settlement from receipt success. */
export function ReportGuide({ report: r }: { report: Report }) {
  if (r.status !== "confirmed_success" && r.status !== "confirmed_failed")
    return null;
  const short = (s: string) => s.slice(0, 8) + "…" + s.slice(-6);
  const movement = r.movements.length === 1 ? r.movements[0] : null;
  return (
    <section className="report-guide panel" aria-labelledby="report-guide-title">
      <div>
        <span className="eyebrow">READ THIS FIRST</span>
        <h2 id="report-guide-title">What can I conclude?</h2>
        <p>
          {r.status === "confirmed_failed"
            ? "The transaction failed. Its attempted transfers did not settle."
            : movement
              ? `The receipt records ${movement.amountExact} USDC from ${short(movement.payer)} to ${short(movement.payee)}.`
              : r.movements.length
                ? `The transaction succeeded and its receipt records ${r.movements.length} USDC movements. Follow each sender and recipient below.`
                : "The transaction succeeded, but this report found no canonical USDC movements. This does not establish that a payment was made."}
        </p>
        <p>
          {r.gas
            ? `The transaction sender paid ${r.gas.feeExact} USDC in gas, separately from any amount received.`
            : "The gas cost is unavailable in this report."}
          {r.movements.length > 1 && r.status === "confirmed_success"
            ? " The movement total adds every hop; it is not the amount one recipient took home."
            : ""}
        </p>
      </div>
      <div className="report-verdict">
        <strong>
          {r.evidenceLevel === "verified"
            ? "The supported evidence agrees."
            : r.evidenceLevel === "consistent"
              ? "The logs agree; additional checks are unavailable."
              : "The analysis still needs review."}
        </strong>
        <p>
          {r.evidenceLevel === "verified"
            ? "Logs, supported call values and balance changes reconcile. This does not verify who owns an address or which invoice was paid."
            : "Receipt status and evidence completeness are separate. Read the missing or conflicting checks before using this report to explain a payment."}
        </p>
        <a className="text-link" href="#evidence-check">Read the evidence checks →</a>
      </div>
    </section>
  );
}
