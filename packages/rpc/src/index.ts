import {
  analyze,
  validHash,
  CHAIN_ID,
  type Bundle,
  type Report,
} from "../../core/src/index";
export class RpcUnavailable extends Error {
  constructor() {
    super("Arc RPC is temporarily unavailable. Try again shortly.");
  }
}
type Fetcher = typeof fetch;
export interface RpcOptions {
  urls: string[];
  traceUrls?: string[];
  timeoutMs?: number;
  fetcher?: Fetcher;
  trace?: boolean;
}
function urls(values: string[]): string[] {
  if (values.length === 0 || values.length > 4)
    throw new Error("Configure one to four RPC endpoints");
  return values.map((v) => {
    const u = new URL(v);
    if (!["https:", "http:"].includes(u.protocol))
      throw new Error("Invalid RPC protocol");
    return v;
  });
}
export async function rpcRequest(
  endpoint: string,
  method: string,
  params: unknown[],
  options: Pick<RpcOptions, "timeoutMs" | "fetcher"> = {},
): Promise<unknown> {
  const response = await (options.fetcher ?? fetch)(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal: AbortSignal.timeout(options.timeoutMs ?? 6500),
    cache: "no-store",
  });
  if (!response.ok) throw new RpcUnavailable();
  const reader = response.body?.getReader();
  if (!reader) throw new RpcUnavailable();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4_000_000) {
        await reader.cancel();
        throw new RpcUnavailable();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const data = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    data.set(c, offset);
    offset += c.byteLength;
  }
  const json = JSON.parse(new TextDecoder().decode(data));
  if (
    json.jsonrpc !== "2.0" ||
    json.id !== 1 ||
    json.error ||
    !Object.hasOwn(json, "result")
  )
    throw new RpcUnavailable();
  return json.result;
}
export async function fetchBundle(
  txHash: string,
  options: RpcOptions,
): Promise<Bundle> {
  if (!validHash(txHash))
    throw new Error(
      "A transaction hash must be 0x followed by 64 hexadecimal characters.",
    );
  const endpoints = urls(options.urls);
  let bundle: Bundle | null = null;
  for (const endpoint of endpoints) {
    try {
      if ((await rpcRequest(endpoint, "eth_chainId", [], options)) !== "0x13b2")
        continue;
      const [transaction, receipt] = await Promise.all([
        rpcRequest(endpoint, "eth_getTransactionByHash", [txHash], options),
        rpcRequest(endpoint, "eth_getTransactionReceipt", [txHash], options),
      ]);
      let block: unknown = null;
      const blockNumber = (receipt as { blockNumber?: unknown } | null)
        ?.blockNumber;
      if (
        typeof blockNumber === "string" &&
        /^0x[0-9a-f]+$/i.test(blockNumber)
      ) {
        block = await rpcRequest(
          endpoint,
          "eth_getBlockByNumber",
          [blockNumber, false],
          options,
        );
      }
      bundle = { chainId: CHAIN_ID, txHash, transaction, receipt, block };
      break;
    } catch {
      /* Credentials and upstream response bodies never cross this boundary. */
    }
  }
  if (!bundle) throw new RpcUnavailable();
  if (bundle.receipt && options.trace !== false) {
    for (const endpoint of urls(
      options.traceUrls?.length ? options.traceUrls : endpoints,
    )) {
      try {
        if (
          (await rpcRequest(endpoint, "eth_chainId", [], options)) !== "0x13b2"
        )
          continue;
        const [call, state] = await Promise.allSettled([
          rpcRequest(
            endpoint,
            "debug_traceTransaction",
            [txHash, { tracer: "callTracer" }],
            options,
          ),
          rpcRequest(
            endpoint,
            "debug_traceTransaction",
            [
              txHash,
              { tracer: "prestateTracer", tracerConfig: { diffMode: true } },
            ],
            options,
          ),
        ]);
        if (call.status === "fulfilled") bundle.callTrace = call.value;
        if (state.status === "fulfilled") bundle.stateDiff = state.value;
        if (bundle.callTrace && bundle.stateDiff) break;
      } catch {
        /* Optional evidence; analyzer records unavailable coverage. */
      }
    }
  }
  return bundle;
}
export async function analyzeLive(
  hash: string,
  options: RpcOptions,
): Promise<Report> {
  return analyze(await fetchBundle(hash, options));
}
export function environmentOptions(): RpcOptions {
  return {
    urls: (
      process.env.ARC_RPC_URLS ??
      "https://rpc.mainnet.arc.io,https://rpc.drpc.mainnet.arc.io"
    )
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    traceUrls: (
      process.env.ARC_TRACE_RPC_URLS ?? "https://rpc.drpc.mainnet.arc.io"
    )
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
}
