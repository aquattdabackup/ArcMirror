// Read-only verification. Run `forge build` in contracts first.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { keccak256, toHex, encodeAbiParameters, encodeFunctionData, decodeFunctionResult } from 'viem';

const read = path => JSON.parse(readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const manifest = read('contracts/deployments/5042.json');
const evidence = read('contracts/deployments/5042.rpc.json');
const live = process.argv.includes('--live');
const endpoint = process.env.ARC_DEPLOYMENT_RPC_URL ?? 'https://rpc.mainnet.arc.io';
async function rpc(method, params) {
  const response = await fetch(endpoint, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    signal: AbortSignal.timeout(20000),
  });
  assert.ok(response.ok, 'RPC HTTP failure');
  const value = await response.json();
  assert.equal(value.error, undefined, 'RPC returned an error');
  assert.equal(value.id, 1);
  return value.result;
}
// Solidity appends CBOR metadata plus a two-byte length. It is not executable identity.
function executable(hex) {
  const bytes = Buffer.from(hex.replace(/^0x/, ''), 'hex');
  const length = bytes.readUInt16BE(bytes.length - 2);
  assert.ok(length > 0 && length + 2 < bytes.length, 'Invalid metadata length');
  return bytes.subarray(0, bytes.length - length - 2).toString('hex');
}
assert.equal(manifest.chainId, 5042);
assert.equal(evidence.chainId, 5042);
const source = readFileSync(new URL('../contracts/src/ArcMirrorLab.sol', import.meta.url));
assert.equal(keccak256(toHex(source)), manifest.source.keccak256, 'Use the recorded deployed source revision');
const chainId = live ? await rpc('eth_chainId', []) : '0x' + evidence.chainId.toString(16);
assert.equal(chainId, '0x13b2');
const tx = live ? await rpc('eth_getTransactionByHash', [manifest.transactionHash]) : evidence.deployment.tx;
const receipt = live ? await rpc('eth_getTransactionReceipt', [manifest.transactionHash]) : evidence.deployment.receipt;
assert.equal(tx.hash, manifest.transactionHash);
assert.equal(tx.chainId, '0x13b2');
assert.equal(tx.to, null);
assert.equal(BigInt(tx.value), 0n);
assert.equal(receipt.transactionHash, tx.hash);
assert.equal(receipt.blockHash, tx.blockHash);
assert.equal(receipt.blockNumber, tx.blockNumber);
assert.equal(receipt.status, '0x1');
assert.equal(receipt.contractAddress.toLowerCase(), manifest.contracts.ArcMirrorLab.address);
assert.equal(Number(BigInt(receipt.blockNumber)), manifest.blockNumber);
const args = encodeAbiParameters([{ type: 'address' }, { type: 'address' }], manifest.constructorArguments);
assert.ok(tx.input.endsWith(args.slice(2)), 'Constructor arguments mismatch');

for (const [name, spec] of Object.entries(manifest.contracts)) {
  const artifact = read('contracts/out/ArcMirrorLab.sol/' + name + '.json');
  assert.equal(artifact.metadata.compiler.version, manifest.compiler.version);
  assert.equal(artifact.metadata.sources['src/ArcMirrorLab.sol'].keccak256, manifest.source.keccak256);
  assert.equal(artifact.metadata.settings.evmVersion, manifest.compiler.evmVersion);
  assert.deepEqual(artifact.metadata.settings.optimizer, manifest.compiler.optimizer);
  const runtime = live ? await rpc('eth_getCode', [spec.address, 'latest']) : evidence.runtimes[spec.address];
  assert.equal(keccak256(runtime), spec.runtimeKeccak256, name + ' runtime hash');
  const expected = Buffer.from(artifact.deployedBytecode.object.slice(2), 'hex');
  assert.deepEqual(Object.keys(artifact.deployedBytecode.immutableReferences).sort(), Object.keys(spec.immutableValues).sort());
  for (const [id, ranges] of Object.entries(artifact.deployedBytecode.immutableReferences)) {
    const word = Buffer.from(spec.immutableValues[id].slice(2).padStart(64, '0'), 'hex');
    for (const range of ranges) {
      assert.equal(range.length, word.length);
      word.copy(expected, range.start);
    }
  }
  assert.equal(executable(runtime), executable('0x' + expected.toString('hex')), name + ' executable/immutable identity');
  if (live) for (const [getter, expectedAddress] of Object.entries(spec.getters)) {
    const data = await rpc('eth_call', [{ to: spec.address, data: encodeFunctionData({ abi: artifact.abi, functionName: getter }) }, 'latest']);
    const address = decodeFunctionResult({ abi: artifact.abi, functionName: getter, data });
    assert.equal(address.toLowerCase(), expectedAddress);
  }
}
console.log(JSON.stringify({ mode: live ? 'live RPC' : 'captured RPC evidence', chainId: 5042,
  deployment: manifest.transactionHash, contracts: Object.keys(manifest.contracts),
  result: 'PASS: receipt, source hash, compiler, executable bytecode and immutable addresses match',
  scope: 'Solidity CBOR metadata is excluded; this is not an explorer verification badge or an audit.' }, null, 2));
