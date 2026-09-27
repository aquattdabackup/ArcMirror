import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ReportGuide } from "../components/report-guide";
import { examples } from "../lib/examples";
import type { Report, Status } from "../../../packages/core/src/types";

const render = (r: Report) => renderToStaticMarkup(<ReportGuide report={r} />);
const native = examples[1].report;

test("native receipt explains the exact movement and keeps gas separate", () => {
  const html = render(native);
  assert.match(html, /receipt records 0\.01 USDC/);
  assert.match(html, /paid 0\.00042 USDC in gas, separately/);
  assert.match(html, /does not verify who owns an address or which invoice was paid/);
});

test("successful ERC-20 receipt does not become fully verified", () => {
  const html = render(examples[0].report);
  assert.match(html, /transaction succeeded/);
  assert.match(html, /analysis still needs review/);
  assert.match(html, /not the amount one recipient took home/);
  assert.doesNotMatch(html, /The supported evidence agrees/);
});

test("dust explanation preserves the amount rather than displaying zero", () => {
  assert.match(render(examples[2].report), /0\.000000000000000001 USDC/);
});

test("failed receipt cannot claim its attempted transfer settled", () => {
  // Deliberately retain movements to ensure the failed-status branch wins.
  const html = render({ ...native, status: "confirmed_failed" });
  assert.match(html, /attempted transfers did not settle/);
  assert.match(html, /0\.00042 USDC in gas/);
  assert.doesNotMatch(html, /receipt records 0\.01|transaction succeeded/);
});

test("unconfirmed and unsupported reports have no confirmed-payment guide", () => {
  for (const status of ["pending", "not_found", "rpc_error", "unsupported_format", "insufficient_evidence"] satisfies Status[]) {
    assert.equal(render({ ...native, status }), "", status);
  }
});

test("a successful call without movement evidence is not a payment claim", () => {
  const html = render({ ...native, movements: [], gas: null, evidenceLevel: "consistent" });
  assert.match(html, /does not establish that a payment was made/);
  assert.match(html, /gas cost is unavailable/);
  assert.match(html, /additional checks are unavailable/);
});
