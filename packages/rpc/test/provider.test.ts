import test from "node:test";
import assert from "node:assert/strict";
import { fetchBundle, RpcUnavailable } from "../src/index";
const H = "0x" + "11".repeat(32);
const response = (result: unknown) =>
  new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result }));
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
