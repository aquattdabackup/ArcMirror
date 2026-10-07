"use client";
import type { KeyboardEvent } from "react";

const views = ["flow", "logs", "balances"] as const;
export type EvidenceView = (typeof views)[number];
const labels: Record<EvidenceView, string> = {
  flow: "Money flow", logs: "Source logs", balances: "Balance proof",
};

export function EvidenceTabs({ value, onChange, id }: {
  value: EvidenceView;
  onChange: (value: EvidenceView) => void;
  id: string;
}) {
  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = views.indexOf(value);
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % views.length; break;
      case "ArrowLeft": next = (index + views.length - 1) % views.length; break;
      case "Home": next = 0; break;
      case "End": next = views.length - 1; break;
      default: return;
    }
    event.preventDefault();
    onChange(views[next]);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }
  return (
    <div className="tabs" role="tablist" aria-label="Evidence view">
      {views.map((view) => (
        <button
          key={view}
          type="button"
          role="tab"
          id={`${id}-${view}`}
          aria-controls={`${id}-panel`}
          aria-selected={value === view}
          tabIndex={value === view ? 0 : -1}
          onClick={() => onChange(view)}
          onKeyDown={keyDown}
        >
          {labels[view]}
        </button>
      ))}
    </div>
  );
}
