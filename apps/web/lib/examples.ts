import snapshots from "./snapshots.json";
import type { Report } from "../../../packages/core/src/index";
export interface Example {
  hash: string;
  title: string;
  question: string;
  category: string;
  provenance: string;
  capturedAt: string;
  report: Report;
}
export const examples = snapshots as Example[];
export function exampleFor(hash: string) {
  return examples.find((e) => e.hash === hash.toLowerCase());
}
