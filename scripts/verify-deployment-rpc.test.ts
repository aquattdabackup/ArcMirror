import assert from "node:assert/strict";
import test from "node:test";

const { openDeploymentRpc } = await import(new URL("./deployment-rpc.mjs", import.meta.url).href);
const hash = "0x" + "ab".repeat(32);
const blockHash = "0x" + "cd".repeat(32);
const transaction = { hash, blockHash, blockNumber: "0x123" };
const receipt = { transactionHash: hash, blockHash, blockNumber: "0x123" };
const primary = "https://rpc.mainnet.arc.io";
const fallback = "https://rpc.drpc.mainnet.arc.io";
const response = (result: unknown) => new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result }));
const answer = (method: string) => method === "eth_chainId" ? "0x13b2"
  : method === "eth_getTransactionByHash" ? transaction
  : method === "eth_getTransactionReceipt" ? receipt : "0x6000";

test("deployment verification recovers a missing primary receipt and pins subsequent reads to fallback", async () => {
  const calls: string[] = [];
  const reader = await openDeploymentRpc(hash, { endpoint: "", fetchImpl: async (url: string, init: RequestInit) => {
    const { method } = JSON.parse(String(init.body));
    calls.push(`${url}:${method}`);
    return response(url === primary && method === "eth_getTransactionReceipt" ? null : answer(method));
  } });
  assert.equal(reader.providerIndex, 1);
  assert.deepEqual(reader.transaction, transaction);
  assert.deepEqual(reader.receipt, receipt);
  await reader.rpc("eth_getCode", ["0xabc", "latest"]);
  assert.equal(calls.at(-1), `${fallback}:eth_getCode`);
});

test("deployment verification rejects a wrong chain before fetching its transaction", async () => {
  const methods: string[] = [];
  const reader = await openDeploymentRpc(hash, { endpoint: "", fetchImpl: async (url: string, init: RequestInit) => {
    const { method } = JSON.parse(String(init.body));
    if (url === primary) methods.push(method);
    return response(url === primary ? "0x1" : answer(method));
  } });
  assert.equal(reader.providerIndex, 1);
  assert.deepEqual(methods, ["eth_chainId"]);
});

test("deployment verification never merges complementary partial provider pairs", async () => {
  await assert.rejects(openDeploymentRpc(hash, { endpoint: "", fetchImpl: async (url: string, init: RequestInit) => {
    const { method } = JSON.parse(String(init.body));
    return response((url === primary && method === "eth_getTransactionReceipt") ||
      (url === fallback && method === "eth_getTransactionByHash") ? null : answer(method));
  } }), /complete matching deployment/);
});

test("deployment verification rejects a receipt from a different block", async () => {
  await assert.rejects(openDeploymentRpc(hash, { endpoint: primary, fetchImpl: async (_url: string, init: RequestInit) => {
    const { method } = JSON.parse(String(init.body));
    return response(method === "eth_getTransactionReceipt" ? { ...receipt, blockHash: "0xother" } : answer(method));
  } }), /complete matching deployment/);
});

test("an explicit deployment RPC override is exclusive and its credentials never reach errors", async () => {
  const endpoint = "https://user:private-example@rpc.invalid/private-token";
  const urls: string[] = [];
  await assert.rejects(openDeploymentRpc(hash, { endpoint, fetchImpl: async (url: string) => {
    urls.push(url);
    throw new Error(`Cannot reach ${url}`);
  } }), (error: Error) => {
    assert.match(error.message, /does not establish that the contract is undeployed/);
    assert.ok(!error.message.includes("private-example"));
    assert.ok(!error.message.includes("private-token"));
    return true;
  });
  assert.deepEqual(urls, [endpoint]);
});

test("deployment verification falls back after primary JSON-RPC error", async () => {
  const reader = await openDeploymentRpc(hash, { endpoint: "", fetchImpl: async (url: string, init: RequestInit) => {
    if (url === primary) return new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, error: { code: -32000, message: "unavailable" } }));
    return response(answer(JSON.parse(String(init.body)).method));
  } });
  assert.equal(reader.providerIndex, 1);
});
