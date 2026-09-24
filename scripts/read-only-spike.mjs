// Read-only public-chain investigation. No wallet, key or write RPC methods.
import { mkdir, writeFile } from 'node:fs/promises';
const endpoint = 'https://rpc.mainnet.arc.io';
const allowed = new Set(['eth_chainId', 'eth_getBlockByNumber', 'eth_getCode', 'eth_call', 'eth_getLogs', 'eth_getTransactionByHash', 'eth_getTransactionReceipt', 'debug_traceTransaction']);
const runStamp = new Date().toISOString().replaceAll(':', '-');
const destination = new URL('../docs/evidence/runs/' + runStamp + '/', import.meta.url);
await mkdir(destination, { recursive: true });
let id = 0;
async function rpc(method, params) {
  if (!allowed.has(method)) throw new Error('Read-only RPC allowlist violation');
  const response = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: ++id, method, params }), signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`RPC HTTP ${response.status}`);
  return response.json();
}
async function save(name, value) { await writeFile(new URL(name, destination), JSON.stringify(value, null, 2) + '\n'); }
const chain = await rpc('eth_chainId', []);
if (chain.result !== '0x13b2') throw new Error('Refusing a chain other than Arc mainnet 5042');
const block = await rpc('eth_getBlockByNumber', ['latest', false]);
if (!block.result?.number) throw new Error('No latest block available');
const height = BigInt(block.result.number);
const nativeEmitter = '0xfffffffffffffffffffffffffffffffffffffffe';
const usdc = '0x3600000000000000000000000000000000000000';
const memo = '0x5294E9927c3306DcBaDb03fe70b92e01cCede505';
const baseline = { observedAt: new Date().toISOString(), endpoint, chain, block, usdcCode: await rpc('eth_getCode', [usdc, block.result.number]), decimals: await rpc('eth_call', [{ to: usdc, data: '0x313ce567' }, block.result.number]), memoCode: await rpc('eth_getCode', [memo, block.result.number]) };
await save('network.json', baseline);
const transferTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const logResponse = await rpc('eth_getLogs', [{ fromBlock: '0x' + (height > 127n ? height - 127n : 0n).toString(16), toBlock: block.result.number, address: [nativeEmitter, usdc], topics: [transferTopic] }]);
await save('recent-transfer-logs.json', logResponse);
const logs = logResponse.result ?? [];
const interfaceHashes = [...new Set(logs.filter(log => log.address.toLowerCase() === usdc).map(log => log.transactionHash))];
const nativeHashes = [...new Set(logs.filter(log => log.address.toLowerCase() === nativeEmitter).map(log => log.transactionHash))];
const selected = [...new Set([...interfaceHashes.slice(0, 2), ...nativeHashes.filter(hash => !interfaceHashes.includes(hash)).slice(0, 2)])];
const samples = [];
for (const hash of selected) {
  const tx = await rpc('eth_getTransactionByHash', [hash]);
  const receipt = await rpc('eth_getTransactionReceipt', [hash]);
  const callTrace = await rpc('debug_traceTransaction', [hash, { tracer: 'callTracer' }]);
  const stateDiff = await rpc('debug_traceTransaction', [hash, { tracer: 'prestateTracer', tracerConfig: { diffMode: true } }]);
  const sampleBlock = receipt.result?.blockNumber ? await rpc('eth_getBlockByNumber', [receipt.result.blockNumber, false]) : null;
  const sample = { provenance: 'Existing public mainnet transaction; not created by ArcMirror or the project owner.', observedAt: new Date().toISOString(), endpoint, chainId: 5042, tx, receipt, callTrace, stateDiff, block: sampleBlock };
  await save(`${hash}.json`, sample);
  samples.push({ hash, status: receipt.result?.status, to: tx.result?.to, value: tx.result?.value, logs: receipt.result?.logs?.map(log => ({ address: log.address, logIndex: log.logIndex, topics: log.topics, data: log.data })), callTraceError: callTrace.error ?? null, stateDiffError: stateDiff.error ?? null });
}
const summary = { chainId: 5042, observedAt: baseline.observedAt, latestBlock: height.toString(), decimals: baseline.decimals, memoCodeExists: typeof baseline.memoCode.result === 'string' ? baseline.memoCode.result !== '0x' : null, logQueryError: logResponse.error ?? null, logCount: logs.length, samples };
await save('summary.json', summary);
console.log(JSON.stringify({ ...summary, samples: summary.samples.map(({ logs, ...sample }) => ({ ...sample, logCount: logs?.length })), evidenceDirectory: destination.pathname }, null, 2));
