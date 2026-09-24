# ArcMirror empirical spike

Checked: **2026-09-24**. Status: **read-only investigation validated; owner-signed experiment incomplete**.

All samples are existing public transactions, **not transactions created by ArcMirror or its owner**. Raw receipts, transactions, blocks, RPC errors and traces are in [evidence/spike](evidence/spike/README.md). No funds were moved.

## Network and provider observations

- The public primary RPC returned `eth_chainId = 0x13b2` (5042). First snapshot head: block 22533328. `eth_call` to `decimals()` at `0x3600000000000000000000000000000000000000` returned 6.
- `eth_getCode` at Memo candidate `0x5294E9927c3306DcBaDb03fe70b92e01cCede505` returned nonempty code. This does **not** establish source/ABI identity, EOA restrictions or memo bracket semantics.
- The system emitter observed in actual receipts is `0xfffffffffffffffffffffffffffffffffffffffe`.
- The initial shell connection failure was caused by restricted network execution. The authorized network call succeeded; do not describe the public endpoint as permissioned or down based on that failure.

| Public endpoint | Chain check | callTracer | prestateTracer diffMode |
| --- | --- | --- | --- |
| rpc.mainnet.arc.io | 5042 | -32601, unsupported | -32601, unsupported |
| rpc.blockdaemon.mainnet.arc.io | 5042 | -32601 | -32601 |
| rpc.quicknode.mainnet.arc.io | 5042 | -32601 | -32601 |
| rpc.drpc.mainnet.arc.io | 5042 | Returned real trace | Returned transaction-local balance diff |

These are observed capabilities, not service guarantees. No API key was needed for the successful dRPC samples. A future provider outage must lower evidence confidence instead of inventing proof.

## Native transfer and fee identity

Transaction: [0xa0311ec4…ae6ad87](https://explorer.arc.io/tx/0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87), block 22533201, receipt status `0x1`.

The transaction has empty input, one system Transfer log and no interface Transfer. Sender and recipient code queries at its block both return `0x` (block-end observation, not a general proof about arbitrary EIP-7702 transactions). Its call trace records the same sender, recipient and value.

| Quantity | Raw native units (18 decimals) | USDC |
| --- | --- | --- |
| Movement | 10000000000000000 | 0.01 |
| Gas, 21000 x 20000000000 | 420000000000000 | 0.00042 |
| Sender change | -10420000000000000 | -0.01042 |
| Recipient change | 10000000000000000 | 0.01 |
| Block beneficiary change | 420000000000000 | 0.00042 |

Every balance residual is zero. The beneficiary is the block's `miner`, `0xefd77206fec6a50e653e4dfaac0197b44d00a4fd`. There is no gas Transfer log in this receipt. This sample confirms that the full fee reaches the beneficiary; it does not prove every possible fee/payer mechanism.

## ERC-20 corroboration and a critical trace limitation

Transaction: [0x376b287a…a47b24f](https://explorer.arc.io/tx/0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f), block 22533201, receipt status `0x1`. This is a multi-call swap containing ERC-20 USDC transfers, **not** a direct EOA-to-USDC transfer call.

| System log index | Interface log index | Native raw amount | ERC-20 raw amount |
| --- | --- | --- | --- |
| 5 | 6 | 90000000000000000 | 90000 |
| 9 | 10 | 4409999000000000000 | 4409999 |

Each pair has identical from/to and `native = interface x 10^12`. The native log appears first in these observations; the algorithm must not require adjacency. Other emitters also have Transfer signatures and must not be counted as USDC.

The receipt has eight logs overall, so “an ERC-20 transaction always has exactly two logs” is false for composed transactions. Here the two USDC movements total 4.499999 USDC; adding both representations would give 8.999998. This gross movement sum is not a general statement about net recipient gain.

**Design correction:** every native `value` in this call tree is zero. The USDC interface calls native-coin precompile `0x1800000000000000000000000000000000000000` (observed selector `0xbeabacc8`). Summing CALL values misses both USDC movements. Nevertheless, system logs plus receipt fee reconcile exactly to the transaction-local native balance diff.

Do not label this sample three-way verified using a native-value-only tracer. Explicit precompile semantics would need independent validation, including reverted ancestors, delegate calls, mint/burn and authorization variants. Unsupported coverage must remain visible as `needs_review`; unavailable trace capability may fall back to log-only `consistent`. Three data representations do not necessarily mean three independent RPC operators.

## Dust

Transaction [0x37567ff7…777b3de](https://explorer.arc.io/tx/0x37567ff71a01f4966f0c4d5c4155dde45a293fd4450a57ce3c69d96c9777b3de) contains a system Transfer of **1 native raw unit = 0.000000000000000001 USDC**, with no USDC ERC-20 Transfer. A six-decimal display must say “less than 0.000001” and expose the exact value, rather than silently show zero.

## Documentation corrections and source references

- [Connection guide](https://docs.arc.io/arc/references/connect-to-arc) documents mainnet 5042 and the tested endpoints. [llms.txt](https://docs.arc.io/llms.txt) still includes a testnet-only statement, contradicted by direct RPC evidence and the dedicated guide.
- [USDC system events](https://docs.arc.io/arc/references/usdc-system-events) describes the two emitters. [EVM differences](https://docs.arc.io/arc/references/evm-differences) documents gas outside logs, fees to the beneficiary, value-transfer restrictions and nondecreasing timestamps.
- [Gas and fees](https://docs.arc.io/arc/references/gas-and-fees) contains an inconsistent native-send example: `parseUnits("1", 6)` is not one native USDC. Native units require 18 decimals. Some fee parameter notes still refer to testnet; do not carry them into mainnet assumptions without observation.
- [Deployment guide](https://docs.arc.io/integrate/deploy-on-arc) now recommends Arc Foundry, including `arc-anvil --network arc`. This differs from the prompt's generic simulator caveat. Standard Anvil still cannot be assumed to reproduce Arc behavior. The guide remains a testnet tutorial; do not copy its chain or key-handling examples into mainnet deployment.
- [Finality documentation](https://docs.arc.io/arc/concepts/deterministic-finality) states finality on committed inclusion. This is the basis for caching confirmed receipts; missing or malformed RPC data is never finality evidence.

## Unresolved experiments

- User-signed direct ERC-20 transfer, controlled failed transfer, repeated identical movements, Lab multi-hop and batch examples.
- A bounded search over five blocks found no failed receipt; this is not evidence that failure is impossible.
- The first 30 two-USDC-log candidates did not yield a direct `transfer` to the USDC interface. Existing composed calls are clearly labeled.
- Mainnet activation from genesis is not established. Do not claim genesis-wide support.
- Memo code identity and brackets are unverified. Keep P2 memo disabled.
- During the initial spike, the computer-use connector reported no browser. Explorer homepages were retrieved through web fetch; anonymous explorer UI coverage was not established by that probe. A separate Chromium CLI was later installed for local application verification, recorded in `docs/validation.md`.

## Validation

`node --test scripts/spike-evidence.test.mjs`: **10 tests passed, 0 failed** on 2026-09-24. Tests validate the saved observations, not a finished application or smart contract. See `validation.txt` for saved output.
