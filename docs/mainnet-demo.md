# Owner mainnet demo runbook

Prepared 2026-09-27. The burner is funded; the Lab is **not deployed** and no owner demo has been executed by the agent. The current request authorizes balance checks and preparation. All amounts below are proposals for owner review, not permission for an agent to sign or broadcast.

ArcMirror analyzes transaction hashes. It does not connect a wallet, deploy contracts or send money. Use MetaMask for the direct native transfer and Remix with MetaMask for contract interactions. After each confirmed receipt, paste the hash into [ArcMirror](https://arcmirror-six.vercel.app), select **Analyze**, inspect the result and **Download JSON**. Do one transaction at a time.

## Recording order

Prepare the tabs and compiled contract before recording. A clean video can show the deployment once, then each of the five scenarios below. If the deployment already has a confirmed receipt, begin with its address and the two immutable recipient getters instead of deploying it again. The deployment is a setup transaction; it is separate from the five demos.

For each scenario: show the called action and small amount, review the MetaMask confirmation (Arc mainnet, burner, transaction value and fee), sign locally only when those fields match this runbook, wait for the confirmed receipt, copy its transaction hash, then switch to ArcMirror and analyze that hash. Keep the receipt/hash visible long enough for the viewer to connect the wallet action to the report. State the observed outcome and actual gas fee; don't imply a simulation is a mined transaction. If ArcMirror says **Needs Review**, explain what evidence is missing rather than calling the result verified.

Before recording, hide recovery phrases, QR codes, wallet passwords and unrelated accounts. Never show or enter secret wallet material. The fee is real. The proposed principal across the five transfers is 0.006 USDC; gas is additional and must be refreshed in MetaMask at recording time. Rehearse the screen order without signing extra mainnet transactions.

The local preparation is available in ignored `artifacts/demo-remix/`: unchanged source at `src/ArcMirrorLab.sol`, `USDC-transfer.abi`, `ArcMirrorLab.abi`, `Lab-failure-transaction.abi` and an unsigned `review.json` with the supplied public recipients. Transfer these address-only files privately for another-machine handoff. They contain no deployment address, signature or secret.

## 1. Prepare the wallet and deployment

1. In MetaMask select the supplied burner and **Arc mainnet**, chain **5042**, RPC `https://rpc.mainnet.arc.io`, currency USDC, explorer `https://explorer.arc.io`. Avoid Arc Testnet, chain 5042002. Arc's native and ERC-20 USDC share one balance. [Official network configuration](https://docs.arc.io/arc/references/connect-to-arc).
2. Use the existing recipient A/B from ignored `artifacts/owner-wallets.json`. The reward wallet is not a demo recipient. Never import a seed or private key into Remix, source files or chat.
3. Open [Remix](https://remix.ethereum.org) in the browser containing MetaMask. Put the unchanged `contracts/src/ArcMirrorLab.sol` at **`src/ArcMirrorLab.sol`** in the Remix workspace. Select Solidity **0.8.28+commit.7893614a**, **Cancun**, optimizer **enabled / 200 runs**, and compile. Select **ArcMirrorLab**, not ArcMirrorForwarder or IArcUSDC. Preserve compiler settings and source path so deployment bytecode can be compared with the reviewed artifact. [Compiler documentation](https://remix-ide.readthedocs.io/en/latest/compile.html).
4. In **Deploy & Run**, choose **Browser Extension → MetaMask** (older Remix versions call this Injected Provider). Confirm the burner and chain 5042. Constructor `a` is recipient A; `b` is recipient B. Set **Value = 0 wei**. Deployment creates the Lab and its Forwarder. [Wallet deployment documentation](https://remix-ide.readthedocs.io/en/latest/run.html).
5. Before the owner signs, refresh chain, balance, pending nonce and ordinary gas estimate. Compare full creation data against the reviewed artifact and recipients; the previously checked init-code hash is in `wallet-preflight.md`. Different bytecode requires review and a new estimate. Show the gas limit, max fee per gas and resulting maximum USDC cost. Do not reuse an expired fee quote or predicted address.
6. The owner reviews the MetaMask request and signs locally. Wait for receipt status 1, save its transaction hash and actual `contractAddress`, check deployed code, then read `recipientA()`, `recipientB()` and `forwarder()`. Confirm both immutable recipients and source-verify the deployment using the exact compiler/source/settings. Explorer verification support still needs checking; do not mark it verified until it succeeds.

The latest read-only deployment estimate was about **0.01614 USDC**, or **0.01936 USDC using a 20% gas-limit buffer at the same quoted price**. Fees must be refreshed, including the max fee shown by MetaMask. This is a deployment estimate, not an estimate for the whole demo. [Arc fee accounting](https://docs.arc.io/arc/references/gas-and-fees).

### If Remix's estimate says insufficient funds

Do not immediately add funds or increase Remix's gas limit. The gas limit is a count of computation units; it cannot fix a `maxFeePerGas` below Arc's current block base fee. In the owner's 2026-09-27 request, the fee cap was 0.10501705 Gwei while the live base fee was 20 Gwei, so Arc rejected the estimate. The on-chain burner balance was 5.409448 USDC, and the same deployment estimated at 806827 gas with valid 20/21 Gwei caps. If Remix offers **Force sending**, that only requests the wallet to proceed after estimation failed; it does not itself authorize you to sign. Continue to the MetaMask review only to inspect/edit the fee. If MetaMask offers a gas-fee pencil, select **Advanced**, refresh the fee quote, and ensure the max fee is at least the current base fee (the 20 Gwei observation is historical). A proposed snapshot cap of 21 Gwei with a 968193 gas limit would allow at most 0.020332053 USDC at that cap. Submit only if the chain, sender, constructor addresses, zero value and current fee all match; otherwise cancel. [MetaMask fee editing](https://support.metamask.io/th/configure/transactions/how-to-customize-gas-settings/).

## 2. Create the five owner transactions

Deployment is a prerequisite and does not count as one of these five. Proposed transfer value is **0.006 USDC total**, plus gas for deployment and the five transactions. Value goes to A/B; it is not a fee. Recovering it later requires control of those recipient wallets and another transaction fee.

| Step | Owner action | Exact proposed input | What ArcMirror should explain |
| --- | --- | --- | --- |
| 1. Native | MetaMask Send: burner → A | 0.001 USDC; no calldata | One 0.001 movement; gas shown separately. |
| 2. ERC-20 | USDC interface `transfer(A, 1000)` | Contract `0x3600000000000000000000000000000000000000`; transaction Value 0; amount 1000 in 6-decimal units | Native and interface logs describe one 0.001 payment, not 0.002. Precompile trace coverage may remain Needs Review. |
| 3. Multi-hop | Lab `nativeForward()` | Value **1000000000000000 wei** = 0.001 USDC | Burner → Lab → Forwarder → A. A receives 0.001; summing the three 0.001 edges is not the burner's unique spend. |
| 4. Batch | Lab `batch(1000000000000000, 2000000000000000)` | Value **3000000000000000 wei** = 0.003 USDC | Lab pays A 0.001 and B 0.002. The funding hop burner → Lab is also a movement, not another payout. |
| 5. Expected failure | A real transaction to Lab `intentionalFailure()` | Value **0 wei**; bounded gas reviewed separately | Receipt status 0, zero settled transfer movements, nonzero gas. It is intentionally unsuccessful. |

For steps 3/4 select the deployed **Lab** instance in Remix. Set Value and its **wei** unit explicitly before each call; do not rely on the previous Value field. Native raw amounts use 18 decimals, while ERC-20 arguments use 6. Estimate each successful Lab call against its real deployed address before the owner signs.

For step 2, load a `.abi` file containing this interface via Remix's **Add Contract** (older versions: At Address) at the USDC address above. Loading an ABI is read-only; call `transfer` only after reviewing the wallet request. Do not deploy the interface and do not grant an allowance for this direct transfer.

```json
[{"type":"function","name":"transfer","stateMutability":"nonpayable","inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"outputs":[{"type":"bool"}]}]
```

Step 5 needs care: the source function is `pure`, so its normal Remix button performs an **eth_call**. A simulation error has no mined hash and does not count as a mainnet demo. To request a transaction, load the following ABI against the already verified Lab address. It deliberately describes the same selector as nonpayable so Remix presents a transaction action; it does not alter the deployed source.

```json
[{"type":"function","name":"intentionalFailure","stateMutability":"nonpayable","inputs":[],"outputs":[]}]
```

First simulate and verify the expected `IntentionalFailure()` revert. Ordinary gas estimation is expected to reject this call. A proposed explicit gas bound is **100000 gas**, with a fresh fee cap reviewed before signing. MetaMask added a transaction-protection feature in September 2026, and its documentation lists Arc among the supported networks. Wallet behavior depends on account and protection mode; the simulation can warn about the intentional revert. Do not disable wallet protections to make a demo work. Only submit if MetaMask clearly offers the expected transaction for owner review and the owner deliberately approves the known revert, zero value and bounded fee. If the wallet blocks submission or its preview is unclear, stop; an on-screen simulation or an unsigned/rejected request is not the failed-transaction demo. Confirm the real receipt status is 0 and inspect its revert reason afterward, including that it was not an out-of-gas failure. [MetaMask simulation guidance](https://support.metamask.io/manage-crypto/transactions/simulations/).

## 3. Inspect and record each result

1. Wait for a receipt, then paste the hash into ArcMirror. Compare **What can I conclude?**, **Follow the money**, exact amounts/source logs and the separate **Network fee** against the transaction receipt.
2. Receipt success and evidence quality answer different questions. Incomplete evidence must retain **Needs Review**; the objective is a correct explanation, not five green badges.
3. Record scenario, hash, receipt status/block, actual gas fee, expected/actual recipient amounts, evidence level, report link and downloaded JSON. For the Lab scenarios also check Lab/Forwarder balances return to zero. Keep address-specific working notes in ignored artifacts until preparing the final public demo evidence.
4. After step 4, optionally reconcile the two expected payouts with CSV columns `id,payer,recipient,amount_usdc`. Use **the actual Lab address as payer**, A/0.001 and B/0.002 as recipients/amounts. Two matching payout rows do not erase the extra funding hop burner → Lab; review it under unassigned movements. Gas is not a payout row.
5. Optionally inspect one downloaded JSON and compare a fresh report. Matching digest means matching content, not proof that a report is authentic. Dust Lab is a local precision exercise and is not an additional mainnet transaction.

Multi-hop satisfies the third original category; batch satisfies the fourth. `twoIdenticalTransfers` and `dust` remain optional extra demonstrations. If later exercising duplicate transfers, the Lab requires an exact allowance of twice the proposed 6-decimal amount, not an unlimited approval. Memo is a separate P2 task and is not covered by these five scenarios.

Finish by source-verifying the real deployment, saving the five actual owner receipts/reports, then deriving regression vectors and updating README/application evidence. The original [owner specification](product-brief.vi.md) defines these five categories; completing this runbook alone is not organizer approval or grant submission.
