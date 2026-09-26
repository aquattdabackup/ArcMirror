"use client";
import { useState } from "react";
import Link from "next/link";
import { precisionBreakdown } from "../../../../packages/core/src/precision";
import { downloadJson } from "./files";
const presets = [
  { name: "One native unit", value: "0.000000000000000001" },
  { name: "Just below one micro-USDC", value: "0.000000999999999999" },
  { name: "Exactly one micro-USDC", value: "0.000001" },
  { name: "One USDC plus dust", value: "1.000000000000000001" },
];
export function DustTool({ exampleHash }: { exampleHash: string }) {
  const [value, setValue] = useState("0.000000999999999999");
  const [count, setCount] = useState("1000");
  let result: ReturnType<typeof precisionBreakdown> | null = null;
  let error = "";
  try {
    if (!/^[1-9][0-9]{0,6}$/.test(count))
      throw Error("Repeat count must be a whole number from 1 to 1,000,000.");
    result = precisionBreakdown(value, Number(count));
  } catch (e) {
    error =
      e instanceof Error ? e.message : "Check the amount and repeat count.";
  }
  const decimals = result?.rawNative18.padStart(19, "0") ?? "";
  return (
    <>
      <div className="tool-workspace">
        <section className="tool-card">
          <div className="tool-card-heading">
            <span className="step-number">01</span>
            <h2>Choose an exact amount</h2>
          </div>
          <label htmlFor="dust-amount">USDC per movement</label>
          <input
            id="dust-amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby="dust-help"
          />
          <p id="dust-help" className="field-help">
            Up to 18 decimals. Decimal arithmetic is exact; amounts are never
            converted to floating point.
          </p>
          <div className="dust-presets" aria-label="Amount presets">
            {presets.map((p) => (
              <button
                className="button"
                key={p.value}
                onClick={() => setValue(p.value)}
                aria-pressed={value === p.value}
              >
                {p.name}
              </button>
            ))}
          </div>
          <label htmlFor="dust-count">Number of identical movements</label>
          <input
            id="dust-count"
            type="text"
            inputMode="numeric"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <p className="field-help">
            1 to 1,000,000. This is a calculation, not a batch of transactions.
          </p>
        </section>
        <section className="tool-card dust-visual">
          <span className="eyebrow">02 / A CLOSER LOOK AT PRECISION</span>
          <h2>
            Six places visible.
            <br />
            Twelve more matter.
          </h2>
          {result ? (
            <>
              <div
                className="dust-digits"
                aria-label={"Exact amount: " + result.exact + " USDC"}
              >
                <span>{decimals.slice(0, -18)}.</span>
                <span className="dust-six">{decimals.slice(-18, -12)}</span>
                <span className="dust-twelve">{decimals.slice(-12)}</span>
              </div>
              <div className="dust-legend">
                <span>First 6 decimal places</span>
                <span>Remaining 12 places</span>
              </div>
              <div className="dust-equation">
                <code>{result.rawNative18}</code>
                <span>native base units</span>
                <strong>=</strong>
                <code>{result.interfaceUnits6} x 10^12</code>
                <span>whole micro-USDC portion</span>
                <strong>+</strong>
                <code>{result.dustRaw18}</code>
                <span>remainder in native units</span>
              </div>
            </>
          ) : (
            <p>Enter a valid amount to see every decimal place.</p>
          )}
        </section>
      </div>
      {error ? (
        <p role="alert" className="tool-error">
          {error}
        </p>
      ) : null}
      {result ? (
        <section className="tool-results" aria-label="Precision calculation">
          <div className="tool-result-heading">
            <div>
              <span className="eyebrow">EXACT ARITHMETIC / SIMULATION</span>
              <h2>
                {result.dustRaw18 === "0"
                  ? "No remainder at six decimals."
                  : "Small is still nonzero."}
              </h2>
            </div>
            <button
              className="button"
              onClick={() =>
                downloadJson(
                  {
                    kind: "arcmirror-precision-simulation",
                    ...result,
                    limits: [
                      "Arithmetic illustration only. No transaction or onchain balance is represented.",
                      "Six-decimal truncation per amount is a model, not a prediction of contract or indexer behavior.",
                    ],
                  },
                  "arcmirror-dust-simulation.json",
                )
              }
            >
              Export calculation JSON
            </button>
          </div>
          <div className="tool-stats">
            <div>
              <small>Exact USDC per movement</small>
              <strong>{result.exact}</strong>
            </div>
            <div>
              <small>If truncated to six decimals</small>
              <strong>{result.truncated6}</strong>
            </div>
            <div>
              <small>Remainder per movement, USDC</small>
              <strong>{result.dustExact}</strong>
            </div>
          </div>
          <div className="dust-total">
            <div>
              <h3>
                Across {result.count.toLocaleString("en-US")} identical
                movements
              </h3>
              <p>
                Truncate each amount, then add them: how much precision would
                disappear from that total?
              </p>
            </div>
            <dl>
              <dt>Sum of exact amounts</dt>
              <dd>{result.totalExact} USDC</dd>
              <dt>Sum after per-amount truncation</dt>
              <dd>{result.totalAfterPerAmountTruncation} USDC</dd>
              <dt>Omitted remainder</dt>
              <dd className="result-review">
                {result.accumulatedDustExact} USDC
              </dd>
            </dl>
          </div>
          <div className="tool-note">
            <strong>Precision is not a second balance.</strong>
            <p>
              Arc exposes native USDC at 18 decimals and its ERC-20 interface at
              6. Splitting the number above does not create two assets. This
              model does not guarantee that every native movement emits a
              matching interface log, and gas is a separate cost.
            </p>
            <Link href={"/tx/" + exampleHash} className="text-link">
              Inspect a real mainnet transfer of one native base unit
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
