import snapshots from "./owner-snapshots.json";
import type { Report } from "../../../packages/core/src/index";

// Frozen owner-created mainnet evidence, separate from the public example list.
export const ownerSnapshots = snapshots as {
  hash: string;
  capturedAt: string;
  provenance: string;
  report: Report;
}[];

export function ownerSnapshotFor(hash: string) {
  return ownerSnapshots.find((snapshot) => snapshot.hash === hash.toLowerCase());
}
