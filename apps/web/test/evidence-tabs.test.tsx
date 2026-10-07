import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { EvidenceTabs } from "../components/evidence-tabs";

test("evidence tabs expose one keyboard entry and identify their controlled panel", () => {
  for (const value of ["flow", "logs", "balances"] as const) {
    const html = renderToStaticMarkup(<EvidenceTabs id="evidence" value={value} onChange={() => {}} />);
    assert.equal((html.match(/tabindex="0"/g) ?? []).length, 1);
    assert.equal((html.match(/tabindex="-1"/g) ?? []).length, 2);
    assert.equal((html.match(/aria-controls="evidence-panel"/g) ?? []).length, 3);
    assert.match(html, new RegExp(`id="evidence-${value}"[^>]+aria-selected="true"[^>]+tabindex="0"`));
  }
});
