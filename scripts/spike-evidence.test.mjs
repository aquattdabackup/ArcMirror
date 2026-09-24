import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
const root=new URL('../docs/evidence/spike/',import.meta.url);
async function read(name){return JSON.parse(await readFile(new URL(name,root),'utf8'));}
const native='0xfffffffffffffffffffffffffffffffffffffffe',usdc='0x3600000000000000000000000000000000000000';
const topic='0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const cap=await read('provider-capabilities.json');
const nativeSample=await read(cap.txHash+'.json');
const pairHash='0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f';
const pairSample=await read(pairHash+'.json');
const nativeTrace=cap.capabilities.find(c=>c.endpoint==='https://rpc.drpc.mainnet.arc.io');
const ercTrace=await read('erc20-traces.json');
function movements(sample){return sample.receipt.result.logs.filter(l=>l.address.toLowerCase()===native&&l.topics[0]===topic).map(l=>({from:'0x'+l.topics[1].slice(-40),to:'0x'+l.topics[2].slice(-40),value:BigInt(l.data),index:l.logIndex}));}
function ledger(sample,diff){
 const expected=new Map();const add=(a,v)=>expected.set(a,(expected.get(a)??0n)+v);
 for(const m of movements(sample)){add(m.from,-m.value);add(m.to,m.value);}
 const fee=BigInt(sample.receipt.result.gasUsed)*BigInt(sample.receipt.result.effectiveGasPrice);
 add(sample.tx.result.from,-fee);add(sample.block.result.miner,fee);
 return [...new Set([...expected.keys(),...Object.keys(diff.pre),...Object.keys(diff.post)])].map(address=>{
  const pre=diff.pre[address]?.balance,post=diff.post[address]?.balance;
  // This spike verifier deliberately only handles observed balance shapes.
  // A missing post balance means unchanged only when the account is in post.
  if(pre!==undefined && post===undefined && !(address in diff.post))throw Error('Account deletion needs review');
  const actual=BigInt(post??pre??'0x0')-BigInt(pre??'0x0');
  return {address,expected:(expected.get(address)??0n).toString(),actual:actual.toString(),residual:(actual-(expected.get(address)??0n)).toString()};
 });
}
test('network is mainnet 5042 and ERC-20 decimals is 6',async()=>{const n=await read('network.json');assert.equal(n.chain.result,'0x13b2');assert.equal(BigInt(n.decimals.result),6n);assert.notEqual(n.memoCode.result,'0x');});
test('all five captured transactions are bound to their successful receipt and block',async()=>{
 const names=(await readdir(root)).filter(n=>/^0x[0-9a-f]{64}\.json$/.test(n));assert.equal(names.length,5);
 for(const name of names){const s=await read(name);assert.equal(s.chainId,5042);assert.equal(s.tx.result.hash,name.slice(0,-5));assert.equal(s.receipt.result.transactionHash,s.tx.result.hash);assert.equal(s.receipt.result.blockHash,s.block.result.hash);assert.equal(s.receipt.result.status,'0x1');for(const l of s.receipt.result.logs){assert.equal(l.transactionHash,s.tx.result.hash);assert.equal(l.blockHash,s.block.result.hash);}}
});
test('native EOA transfer is exactly 0.01 USDC and gas is separate',()=>{assert.equal(nativeSample.senderCode.result,'0x');assert.equal(nativeSample.recipientCode.result,'0x');assert.equal(nativeSample.tx.result.input,'0x');const ms=movements(nativeSample);assert.equal(ms.length,1);assert.equal(ms[0].value,10n**16n);assert.equal(nativeSample.receipt.result.logs.length,1);assert.equal(BigInt(nativeSample.receipt.result.gasUsed)*BigInt(nativeSample.receipt.result.effectiveGasPrice),420000000000000n);});
test('two observed USDC interface logs each have their own equal-scaled system log',()=>{const logs=pairSample.receipt.result.logs;const es=logs.filter(l=>l.address.toLowerCase()===usdc&&l.topics[0]===topic);assert.equal(es.length,2);const used=new Set();for(const e of es){const match=logs.find(n=>n.address===native&&n.topics[1]===e.topics[1]&&n.topics[2]===e.topics[2]&&BigInt(n.data)===BigInt(e.data)*10n**12n&&!used.has(n.logIndex));assert.ok(match);used.add(match.logIndex);}assert.equal(used.size,2);});
test('native dust is one raw unit and has no ERC-20 corroboration',async()=>{const s=await read('0x37567ff71a01f4966f0c4d5c4155dde45a293fd4450a57ce3c69d96c9777b3de.json');const ms=movements(s);assert.equal(ms.length,1);assert.equal(ms[0].value,1n);assert.ok(!s.receipt.result.logs.some(l=>l.address===usdc&&l.topics[0]===topic));});
test('native call trace matches the system movement',()=>{const t=nativeTrace.callTrace.result,m=movements(nativeSample)[0];assert.equal(t.type,'CALL');assert.equal(t.from,m.from);assert.equal(t.to,m.to);assert.equal(BigInt(t.value),m.value);assert.ok(!t.error);});
test('native state delta identity balances for sender, recipient and fee beneficiary',()=>{const rows=ledger(nativeSample,nativeTrace.stateDiff.result);assert.equal(rows.length,3);for(const row of rows)assert.equal(row.residual,'0',row.address);});
test('ERC-20 native balance identity agrees with system logs plus fee',()=>{for(const row of ledger(pairSample,ercTrace.stateDiff.result))assert.equal(row.residual,'0',row.address);});
test('ERC-20 counterexample: summing native call values misses real balance movements',()=>{let value=0n;function walk(t){assert.ok(!t.error);value+=BigInt(t.value??'0x0');for(const c of t.calls??[])walk(c);}walk(ercTrace.callTrace.result);assert.equal(value,0n);assert.equal(movements(pairSample).reduce((n,m)=>n+m.value,0n),4499999000000000000n);});
test('primary provider trace unavailability is explicit',()=>{assert.equal(pairSample.callTrace.error.code,-32601);assert.equal(pairSample.stateDiff.error.code,-32601);});
await writeFile(new URL('balance-identities.json',root),JSON.stringify({native:{txHash:cap.txHash,rows:ledger(nativeSample,nativeTrace.stateDiff.result)},erc20:{txHash:pairHash,rows:ledger(pairSample,ercTrace.stateDiff.result),callValueCoverage:'incomplete: all call values are zero'}},null,2)+'\n');
