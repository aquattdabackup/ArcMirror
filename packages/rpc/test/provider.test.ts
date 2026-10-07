import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { analyze } from "../../core/src/index";
import { fetchBundle, RpcUnavailable } from "../src/index";
const H = "0x" + "11".repeat(32);
const response = (result: unknown) =>
  new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result }));
const native = JSON.parse(readFileSync(new URL("../../../vectors/owner/0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981.json", import.meta.url), "utf8")).input;

test("unavailable block metadata preserves the receipt, movements and gas", async () => {
  const fetcher: typeof fetch = async (_, init) => {
    const { method } = JSON.parse(init?.body as string);
    if (method === "eth_getBlockByNumber") throw Error("block lookup unavailable");
    const results: Record<string, unknown> = {
      eth_chainId: "0x13b2",
      eth_getTransactionByHash: native.transaction,
      eth_getTransactionReceipt: native.receipt,
    };
    return response(results[method]);
  };
  const report = analyze(await fetchBundle(native.txHash, {
    urls: ["https://ok.example"], fetcher, trace: false,
  }));
  const expected = analyze({ ...native, block: null, callTrace: undefined, stateDiff: undefined });
  assert.equal(report.status, "confirmed_success");
  assert.deepEqual(report.movements, expected.movements);
  assert.deepEqual(report.gas, expected.gas);
  assert.equal(report.gas?.feeNative18, analyze(native).gas?.feeNative18);
  assert.notEqual(report.evidenceLevel, "verified");
  assert.ok(report.warnings.includes("block_metadata_missing_or_mismatched"));
});
test("wrong chain provider skipped, fallback succeeds", async () => {
  const methods: string[] = [];
  const fetcher: typeof fetch = async (url, init) => {
    const b = JSON.parse(init?.body as string);
    methods.push(b.method);
    return response(
      b.method === "eth_chainId"
        ? String(url).includes("wrong")
          ? "0x4cef52"
          : "0x13b2"
        : null,
    );
  };
  const b = await fetchBundle(H, {
    urls: ["https://wrong.example", "https://right.example"],
    fetcher,
  });
  assert.equal(b.chainId, 5042);
  assert.equal(b.receipt, null);
  assert.equal(
    methods.filter((m) => m === "eth_getTransactionReceipt").length,
    1,
  );
});
test("429 falls back without exposing provider details", async () => {
  const fetcher: typeof fetch = async (url, init) =>
    String(url).includes("limited")
      ? new Response("secret upstream message", { status: 429 })
      : response(
          JSON.parse(init?.body as string).method === "eth_chainId"
            ? "0x13b2"
            : null,
        );
  assert.equal(
    (
      await fetchBundle(H, {
        urls: ["https://limited.example", "https://ok.example"],
        fetcher,
      })
    ).chainId,
    5042,
  );
});
test("all failures give a sanitized error", async () => {
  await assert.rejects(
    () =>
      fetchBundle(H, {
        urls: ["https://x.example/private-secret"],
        fetcher: async () => {
          throw Error("private-secret");
        },
      }),
    (e) => e instanceof RpcUnavailable && !e.message.includes("private-secret"),
  );
});
test("invalid hash never contacts RPC", async () => {
  let calls = 0;
  await assert.rejects(() =>
    fetchBundle("bad", {
      urls: ["https://ok.example"],
      fetcher: async () => {
        calls++;
        return response(null);
      },
    }),
  );
  assert.equal(calls, 0);
});
test("unsupported trace does not erase a fetched receipt", async () => {
  const fetcher: typeof fetch = async (_, init) => {
    const m = JSON.parse(init?.body as string).method;
    if (m === "eth_chainId") return response("0x13b2");
    if (m.startsWith("debug"))
      return new Response(
        JSON.stringify({ jsonrpc: "2.0", id: 1, error: { code: -32601 } }),
      );
    return response(
      m === "eth_getTransactionReceipt" ? { blockNumber: "0x1" } : {},
    );
  };
  const b = await fetchBundle(H, { urls: ["https://ok.example"], fetcher });
  assert.ok(b.receipt);
  assert.equal(b.callTrace, undefined);
});

test("one shared time budget stops mandatory RPC fallback", async () => {
  let calls = 0;
  await assert.rejects(() => fetchBundle(H, {
    urls: ["https://slow.example", "https://unused.example"],
    totalTimeoutMs: 40,
    timeoutMs: 1000,
    fetcher: async (_, init) => {
      calls++;
      await delay(150, undefined, { signal: init?.signal ?? undefined });
      throw Error("private upstream error");
    },
  }), RpcUnavailable);
  assert.equal(calls, 1, "must not start another provider after the budget expires");
});

test("shared deadline aborts optional traces and retains confirmed evidence", async () => {
  let aborted = 0;
  const providers = new Set<string>();
  const bundle = await fetchBundle(native.txHash, {
    urls: ["https://ok.example"],
    traceUrls: ["https://slow.example", "https://unused.example"],
    totalTimeoutMs: 80,
    timeoutMs: 1000,
    fetcher: async (url, init) => {
      providers.add(String(url));
      const { method } = JSON.parse(init?.body as string);
      if (method === "debug_traceTransaction") {
        try {
          await delay(150, undefined, { signal: init?.signal ?? undefined });
        } catch (error) {
          aborted++;
          throw error;
        }
        return response(null);
      }
      const results: Record<string, unknown> = {
        eth_chainId: "0x13b2",
        eth_getTransactionByHash: native.transaction,
        eth_getTransactionReceipt: native.receipt,
        eth_getBlockByNumber: native.block,
      };
      return response(results[method]);
    },
  });
  assert.equal(aborted, 2);
  assert.ok(!providers.has("https://unused.example"));
  assert.deepEqual(bundle.receipt, native.receipt);
  const report = analyze(bundle);
  assert.equal(report.status, "confirmed_success");
  assert.equal(report.evidenceLevel, "consistent");
  assert.ok(report.reasons.includes("call_trace_unavailable"));
});
