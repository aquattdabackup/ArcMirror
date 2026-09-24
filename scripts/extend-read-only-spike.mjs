import { readFile, writeFile } from 'node:fs/promises';
const destination = new URL('../docs/evidence/spike/', import.meta.url);
const main = 'https://rpc.mainnet.arc.io';
const hash = '0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87';
const allowed = new Set(['eth_chainId','eth_getCode','eth_getTransactionByHash','eth_getTransactionReceipt','eth_getBlockByNumber','eth_getBlockReceipts','debug_traceTransaction']);
let requestId=0;
async function rpc(endpoint,method,params) {
 if(!allowed.has(method)) throw Error('Read-only methods only');
 try { const r=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:++requestId,method,params}),signal:AbortSignal.timeout(15000)}); if(!r.ok) return {httpStatus:r.status}; return await r.json(); } catch(e) { return {transportError:e.name}; }
}
async function save(name,data) {await writeFile(new URL(name,destination),JSON.stringify(data,null,2)+'\n');}
const capabilities = await Promise.all(['https://rpc.blockdaemon.mainnet.arc.io','https://rpc.drpc.mainnet.arc.io','https://rpc.quicknode.mainnet.arc.io'].map(async endpoint=>{
 const chain=await rpc(endpoint,'eth_chainId',[]);
 if(chain.result!=='0x13b2') return {endpoint,chain};
 const callTrace=await rpc(endpoint,'debug_traceTransaction',[hash,{tracer:'callTracer'}]);
 const stateDiff=await rpc(endpoint,'debug_traceTransaction',[hash,{tracer:'prestateTracer',tracerConfig:{diffMode:true}}]);
 return {endpoint,chain,callTrace,stateDiff};
}));
await save('provider-capabilities.json',{observedAt:new Date().toISOString(),txHash:hash,capabilities});
console.log(JSON.stringify(capabilities.map(c=>({endpoint:c.endpoint,chain:c.chain.result??c.chain,callTrace:c.callTrace?.error??c.callTrace?.httpStatus??(c.callTrace?.result?'available':c.callTrace),stateDiff:c.stateDiff?.error??c.stateDiff?.httpStatus??(c.stateDiff?.result?'available':c.stateDiff)})),null,2));
const logs=JSON.parse(await readFile(new URL('recent-transfer-logs.json',destination),'utf8')).result;
const usdc='0x3600000000000000000000000000000000000000';
const group=new Map(); for(const l of logs){const arr=group.get(l.transactionHash)??[];arr.push(l);group.set(l.transactionHash,arr);}
const candidates=[...group].filter(([,ls])=>ls.length===2 && ls.some(l=>l.address.toLowerCase()===usdc)).slice(0,30);
const captured=[];
async function capture(tx,kind){
 const receipt=await rpc(main,'eth_getTransactionReceipt',[tx.result.hash]);
 if(!receipt.result) return;
 const block=await rpc(main,'eth_getBlockByNumber',[receipt.result.blockNumber,false]);
 const senderCode=await rpc(main,'eth_getCode',[tx.result.from,receipt.result.blockNumber]);
 const recipientCode=tx.result.to?await rpc(main,'eth_getCode',[tx.result.to,receipt.result.blockNumber]):null;
 const s={provenance:'Existing public mainnet transaction; not created by ArcMirror or the project owner.',observedAt:new Date().toISOString(),endpoint:main,chainId:5042,kind,tx,receipt,block,senderCode,recipientCode};
 await save(tx.result.hash+'.json',s);
 captured.push({hash:tx.result.hash,kind,status:receipt.result.status,block:receipt.result.blockNumber,logCount:receipt.result.logs.length,gasUsed:receipt.result.gasUsed,effectiveGasPrice:receipt.result.effectiveGasPrice,value:tx.result.value});
}
for(const [candidate] of candidates){const tx=await rpc(main,'eth_getTransactionByHash',[candidate]);if(tx.result?.to?.toLowerCase()===usdc && tx.result.input.startsWith('0xa9059cbb')){await capture(tx,'direct-erc20-transfer');break;}}
const dust=logs.find(l=>l.address.toLowerCase()!==usdc && BigInt(l.data)>0n && BigInt(l.data)<10n**12n);
if(dust) await capture(await rpc(main,'eth_getTransactionByHash',[dust.transactionHash]),'contains-native-dust');
const network=JSON.parse(await readFile(new URL('network.json',destination),'utf8'));
let failed=null;
for(let i=0n;i<5n;i++){
 const b='0x'+(BigInt(network.block.result.number)-i).toString(16);
 const receipts=await rpc(main,'eth_getBlockReceipts',[b]);
 if(receipts.error || !Array.isArray(receipts.result)){console.log('Block receipts unavailable');break;}
 failed=receipts.result.find(r=>r.status==='0x0');if(failed)break;
}
if(failed)await capture(await rpc(main,'eth_getTransactionByHash',[failed.transactionHash]),'confirmed-failed');
const eoa=await rpc(main,'eth_getTransactionByHash',[hash]);await capture(eoa,'native-transfer-code-check');
await save('additional-samples.json',{observedAt:new Date().toISOString(),samples:captured,dustFound:Boolean(dust),failedFound:Boolean(failed)});
console.log(JSON.stringify({captured,dustFound:Boolean(dust),failedFound:Boolean(failed)},null,2));
