/** Select one chain-valid provider with a complete deployment pair. Read-only. */
export async function openDeploymentRpc(transactionHash, {
  endpoint = process.env.ARC_DEPLOYMENT_RPC_URL,
  fetchImpl = globalThis.fetch,
  timeoutMs = 20_000,
} = {}) {
  const endpoints = endpoint
    ? [endpoint]
    : ['https://rpc.mainnet.arc.io', 'https://rpc.drpc.mainnet.arc.io'];
  for (const [providerIndex, url] of endpoints.entries()) {
    const rpc = async (method, params) => {
      const response = await fetchImpl(url, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error('Deployment RPC HTTP failure');
      const value = await response.json();
      if (value.error || value.id !== 1 || value.jsonrpc !== '2.0')
        throw new Error('Invalid deployment RPC response');
      return value.result;
    };
    try {
      const chainId = await rpc('eth_chainId', []);
      if (chainId !== '0x13b2') continue;
      const [transaction, receipt] = await Promise.all([
        rpc('eth_getTransactionByHash', [transactionHash]),
        rpc('eth_getTransactionReceipt', [transactionHash]),
      ]);
      if (!transaction || !receipt) continue;
      // Never combine partial responses or accept a different deployment pair.
      if (transaction.hash?.toLowerCase() !== transactionHash.toLowerCase() ||
          receipt.transactionHash?.toLowerCase() !== transactionHash.toLowerCase() ||
          !transaction.blockHash || !transaction.blockNumber ||
          receipt.blockHash !== transaction.blockHash ||
          receipt.blockNumber !== transaction.blockNumber) continue;
      return { chainId, transaction, receipt, rpc, providerIndex };
    } catch {
      // Do not expose endpoint credentials or raw upstream errors in CLI output.
    }
  }
  throw new Error('No configured Arc mainnet RPC returned a complete matching deployment transaction and receipt. Retry later or set ARC_DEPLOYMENT_RPC_URL to a working Arc mainnet endpoint. This does not establish that the contract is undeployed.');
}
