import {readFile,writeFile} from 'node:fs/promises';
const endpoint='https://rpc.drpc.mainnet.arc.io';
const hash='0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f';
async function rpc(method,params){const r=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params}),signal:AbortSignal.timeout(20000)});return r.json();}
const chain=await rpc('eth_chainId',[]);if(chain.result!=='0x13b2')throw Error('Wrong chain');
const callTrace=await rpc('debug_traceTransaction',[hash,{tracer:'callTracer'}]);
const stateDiff=await rpc('debug_traceTransaction',[hash,{tracer:'prestateTracer',tracerConfig:{diffMode:true}}]);
const traceEvidence={observedAt:new Date().toISOString(),endpoint,chainId:5042,txHash:hash,callTrace,stateDiff};
await writeFile('docs/evidence/spike/erc20-traces.json',JSON.stringify(traceEvidence,null,2)+'\n');
const rows=[];function walk(t,depth=0){if(!t)return;rows.push({depth,type:t.type,from:t.from,to:t.to,value:t.value??'0x0',selector:t.input?.slice(0,10),error:t.error});for(const c of t.calls??[])walk(c,depth+1);}walk(callTrace.result);
console.log(JSON.stringify({traceErrors:[callTrace.error,stateDiff.error],calls:rows,accounts:stateDiff.result?Object.keys(stateDiff.result.pre):[]},null,2));
