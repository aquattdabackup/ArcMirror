# Owner wallet and unsigned deployment checkpoint

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

## Next owner action and continuation

The burner needs real USDC on **Arc mainnet**. Recipient and reward wallets do not need funding for this check. The owner uses MetaMask and has no USDC. See [funding steps](funding.md); provider availability and an actual purchase quote remain unchecked. Do not assume testnet faucet funds or USDC on another network pay Arc mainnet gas.

[Official network configuration](https://docs.arc.io/arc/references/connect-to-arc) confirms chain 5042, native USDC and the mainnet RPC. The [current Arc deployment tutorial](https://docs.arc.io/integrate/deploy-on-arc) describes Arc Foundry and testnet examples; do not copy its testnet chain or private-key command into this production workflow. Owner-local wallet signing or an encrypted keystore remains required.
