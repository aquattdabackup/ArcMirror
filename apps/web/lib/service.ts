import "server-only";
import {
  analyze,
  validHash,
  type Report,
} from "../../../packages/core/src/index";
import {
  analyzeLive,
  environmentOptions,
} from "../../../packages/rpc/src/index";
import { exampleFor } from "./examples";
export interface Result {
  report: Report;
  source: "snapshot" | "live" | "cache";
  capturedAt?: string;
  provenance?: string;
}
const cache = new Map<string, { expires: number; result: Result }>();
const inFlight = new Map<string, Promise<Result>>();
const windows = new Map<string, { count: number; expires: number }>();
export function admit(client: string, now = Date.now()): boolean {
  for (const [k, v] of windows) if (v.expires <= now) windows.delete(k);
  if (windows.size > 2048) return false;
  for (const key of ["global", client]) {
    const entry = windows.get(key) ?? { count: 0, expires: now + 60000 };
    if (entry.count >= (key === "global" ? 120 : 30)) return false;
  }
  for (const key of ["global", client]) {
    const e = windows.get(key) ?? { count: 0, expires: now + 60000 };
    e.count++;
    windows.set(key, e);
  }
  return true;
}
export async function getReport(hash: string, live = false): Promise<Result> {
  const key = hash.toLowerCase();
  if (!validHash(key))
    return {
      report: analyze({
        chainId: 5042,
        txHash: hash,
        transaction: null,
        receipt: null,
      }),
      source: "live",
    };
  const example = exampleFor(key);
  if (example && !live)
    return {
      report: example.report,
      source: "snapshot",
      capturedAt: example.capturedAt,
      provenance: example.provenance,
    };
  const saved = cache.get(key);
  if (!live && saved && saved.expires > Date.now())
    return { ...saved.result, source: "cache" };
  if (inFlight.has(key)) return inFlight.get(key)!;
  if (inFlight.size >= 8) throw new Error("busy");
  const promise = (async () => {
    try {
      const report = await analyzeLive(key, environmentOptions());
      const result: Result = { report, source: "live" };
      if (["confirmed_success", "confirmed_failed"].includes(report.status)) {
        if (cache.size >= 256) cache.delete(cache.keys().next().value!);
        cache.set(key, { expires: Date.now() + 3600000, result });
      }
      return result;
    } catch {
      return {
        report: analyze({
          chainId: 5042,
          txHash: key,
          transaction: null,
          receipt: null,
          rpcError: true,
        }),
        source: "live" as const,
      };
    } finally {
      inFlight.delete(key);
    }
  })();
  inFlight.set(key, promise);
  return promise;
}
