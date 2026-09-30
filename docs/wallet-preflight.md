# Owner wallet and unsigned deployment checkpoint

**Current status (2026-09-30):** Lab is deployed and all five owner-created demos are confirmed in [mainnet evidence](mainnet-evidence.md). Balances, nonces and estimates below are historical, not current signing instructions.

## Historical funded check: 2026-09-27

The owner resumed mainnet preparation and requested a balance check. At **08:13:10 UTC / 15:13:10 Vietnam time**, primary RPC chain 5042, block **22998025**, reported **5.409448 USDC** in the burner. The ERC-20 interface returned 5409448 raw units (6 decimals), agreeing with the native 5409448000000000000 raw units (18 decimals). These are two views of one balance, not funds to add together. dRPC independently returned the same native balance and block hash. Confirmed/pending nonce were both 0; burner code was empty.

Ordinary, funded `eth_estimateGas` succeeded without a balance override or zero-gas-price simulation:

| Draft operation | Gas estimate | Fee at observed price | Gas limit with 20% buffer |
| --- | ---: | ---: | ---: |
| Lab deployment, value 0 | 806827 | 0.016136540000806827 USDC | 968193 |
| Native transfer, 0.001 USDC | 21000 | 0.000420000000021 USDC | 25200 |
| ERC-20 transfer, 1000 raw units = 0.001 USDC | 74814 | 0.001496280000074814 USDC | 89777 |

Observed gas price: 20000000001 native base units per gas. Deployment with the buffered gas limit would cost at most **0.019363860000968193 USDC at that price**. This is not a submitted fee cap or a current quote for a later signature. The burner covers these estimates individually. Calls to the not-yet-deployed Lab still require fresh estimation after deployment; no complete-demo fee has been measured.

The existing unsigned creation data exactly matches the compiled artifact plus the supplied constructor recipients, with the same init-code hash recorded below. Nothing was signed or broadcast. Address-specific evidence remains local in ignored `artifacts/wallet-preflight-current.json`. No additional funding is indicated for the next deployment step at this observation. Refresh each quote before signing and treat the older preparation below as historical.

### Remix error diagnosis: 2026-09-27 09:09 UTC

The owner pasted Remix's deployment estimate error. Its transaction data has both constructor recipient arguments and value `0x0`; Remix then records **Transaction canceled by user**, so this attempt was not broadcast and did not deploy the Lab. The request set `maxFeePerGas` to `0x6426eda` = **105017050 wei / 0.10501705 Gwei**. At block 23004692, live Arc base fee was **20 Gwei**. Both primary and dRPC rejected that fee as below the block base fee. This independently demonstrates an underpriced request on Arc, but does not establish the sole cause of the original generic `insufficient funds` message: the Remix screenshot also showed an ambiguous network badge. The fee-cap probe used the locally prepared payload, not a byte-for-byte reproduction of the Remix metadata. Do not diagnose a need to top up from that message alone.

The burner balance still reads **5.409448 USDC** at the same block; native and ERC-20 views agree. The locally prepared deployment estimates recorded at that block: with `maxFeePerGas = 20 Gwei` and priority fee 0, **806827 gas**; with max fee 21 Gwei and priority fee 1 Gwei, **806827 gas**. With a 968193 gas limit and a 21 Gwei fee cap, the transaction maximum is **0.020332053 USDC**. This is a snapshot, not an evergreen quote. If MetaMask lets the owner edit fees on the confirmation screen, refresh the base fee and set the cap at or above it; do not sign if the fee remains below the current base fee. Remix's gas-limit field controls gas units, not fee per gas. The missing-address `value=""` console entry in the screenshot is separate from the latest request, whose transaction data contains both arguments.

## Historical check: 2026-09-25

Checked 2026-09-25. The owner supplied a burner, two recipients and a separate reward address. All four pass EIP-55 checksum validation and are distinct. Addresses are owner-supplied; no wallet signature or ownership challenge was performed.

The address mapping is retained locally in ignored `artifacts/owner-wallets.json`; it is not published to GitHub. The reward address is for the application, not a constructor argument. For a handoff to another machine, the owner must transfer this address-only file or supply the public addresses again. Never include keys or seeds.

## Mainnet read-only checks

RPC: `https://rpc.mainnet.arc.io`; chain ID 5042; observed block 22682376. At the observation time, all four addresses had zero native USDC and empty code. Burner pending nonce was 0. Full address-specific results are in ignored `artifacts/wallet-preflight.json`.

Fresh build: Solidity 0.8.28+commit.7893614a, Cancun, optimizer enabled with 200 runs. All 16 Lab tests passed again, including 256 fuzz cases. These remain standard EVM mock tests, not proof of deployed Arc behavior.

The unsigned creation payload includes only recipient A and B and sends zero USDC. Init code is 3851 bytes; its keccak256 is `0x2e82d93896b8819df1df0576a006cd75ab95c3e628cc2329b8fcde6174e6d4ad`. Constructor bytes and complete creation data are saved locally in `artifacts/lab-deployment-unsigned.json`. Its predicted CREATE address is explicitly **not a deployment** and must be recomputed if the burner nonce changes.

## Gas observation, not execution approval

Ordinary `eth_estimateGas` using the burner and quoted gas price failed with `gas required exceeds allowance (0)`, consistent with the empty balance.

A separate read-only estimate with simulated gas price zero succeeded: **806827 gas**. Multiplying by the observed price of **20100000000 native base units per gas** gives approximately **0.0162172227 USDC** for deployment alone. A provisional 20% gas-limit buffer is 968193 gas, or 0.0194606793 USDC at that same quoted price. These are arithmetic estimates, not a fee guarantee or a total budget for all demos.

No balance override, signature, transaction broadcast or mainnet state change was made. After funding, rerun the ordinary estimate, chain/nonce/balance/code checks and current fee quote; present exact recipients, deployment data, gas limit and fee cap for the owner's local review and signature. Do not broadcast the saved payload automatically.

## Historical funding status and continuation

At the September 25 check, the burner needed real USDC on **Arc mainnet** and the owner reported using MetaMask with no USDC. The funded September 27 observation above supersedes that status. Recipient and reward wallets do not need funding for the demo. The [funding steps](funding.md) remain background information; do not repeat a purchase merely because this older check was empty.

[Official network configuration](https://docs.arc.io/arc/references/connect-to-arc) confirms chain 5042, native USDC and the mainnet RPC. The [current Arc deployment tutorial](https://docs.arc.io/integrate/deploy-on-arc) describes Arc Foundry and testnet examples; do not copy its testnet chain or private-key command into this production workflow. Owner-local wallet signing or an encrypted keystore remains required.
