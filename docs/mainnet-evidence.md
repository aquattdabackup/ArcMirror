# ArcMirror mainnet evidence

Verified 2026-09-30T01:59:12.665Z. The live analyzer reads **Arc Mainnet, chain 5042**. ArcMirrorLab is deployed, and all five owner-created demo categories have mined receipts. This is technical evidence, not organizer acceptance or a security audit.

## Deployment

- Lab: [0xa64439ea7c88d56e2888c377d55ae3e174b415c1](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1).
- Forwarder: [0x28fcbbf10fac1bad051d1870c8cb30fd9d3ded17](https://arc.etherscan.io/address/0x28fcbbf10fac1bad051d1870c8cb30fd9d3ded17).
- [Deployment transaction](https://arc.etherscan.io/tx/0x97bcd82e2d98eee0962c54e6bd2fbdbfa78ff908c0627d7f53fc52fe28032292): block **23006461**, receipt status **1**, 2026-09-27T09:24:31.000Z. Deployment is separate from the five demos.
- [Machine-readable manifest](../contracts/deployments/5042.json), [captured RPC evidence](../contracts/deployments/5042.rpc.json), [deployed source](https://github.com/aquattdabackup/ArcMirror/blob/52f6c9f6dc8f24562e57c628f21ba12e98f0e037/contracts/src/ArcMirrorLab.sol).
- Solidity 0.8.28+commit.7893614a, Cancun, optimizer enabled with 200 runs. Both RPCs returned chain 5042 and the same Lab code hash. Lab and Forwarder balances were zero at the recorded check, not an assertion about every future block.

## Five owner-created demos

The owner signed these transactions locally. The agent only read existing chain data. The reward wallet is not part of this evidence; no private wallet material is published.

| Scenario | Public links | Block | Receipt outcome | Analysis evidence | Gas (USDC) |
| --- | --- | --- | --- | --- | --- |
| native | [Report](https://arcmirror-six.vercel.app/tx/0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981) / [ArcScan](https://arc.etherscan.io/tx/0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981) | 23009545 | confirmed_success | verified | 0.0004515 |
| erc20 | [Report](https://arcmirror-six.vercel.app/tx/0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d) / [ArcScan](https://arc.etherscan.io/tx/0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d) | 23199433 | confirmed_success | needs_review | 0.001052167 |
| forwarding | [Report](https://arcmirror-six.vercel.app/tx/0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41) / [ArcScan](https://arc.etherscan.io/tx/0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41) | 23315455 | confirmed_success | verified | 0.0009599535 |
| batch | [Report](https://arcmirror-six.vercel.app/tx/0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8) / [ArcScan](https://arc.etherscan.io/tx/0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8) | 23458272 | confirmed_success | verified | 0.0015050215 |
| intentional-failure | [Report](https://arcmirror-six.vercel.app/tx/0x87b456003ef9194f99c71ea5af94273ba242beaffaaeacc4fb466885a2b47fe1) / [ArcScan](https://arc.etherscan.io/tx/0x87b456003ef9194f99c71ea5af94273ba242beaffaaeacc4fb466885a2b47fe1) | 23461134 | confirmed_failed | verified | 0.0004573265 |

[Full hashes, timestamps, digests and checks](evidence/mainnet/checks.json). [Raw RPC bundles and expected reports](../vectors/owner/) include call/state traces. Standalone JSON reports are in [evidence/mainnet](evidence/mainnet/).

- Native and ERC-20 each transfer **0.001 USDC**. The ERC-20 native/interface logs describe the same payment; its naive sum is 0.002, canonical amount 0.001. **Needs Review** correctly preserves the unsupported precompile call-value coverage.
- Forwarding sends **0.001 USDC** through burner -> Lab -> Forwarder -> recipient. Gross movement 0.003 counts three hops, not three independent payments.
- Batch sends **0.003 USDC** into Lab, paying recipient A 0.001 and B 0.002. Gross movement 0.006 includes the funding hop. For CSV reconciliation the payout payer is Lab.
- Intentional failure has receipt status **0**, no settled movements, and a nonzero fee. The call trace returns **0xdaf7d1b0**, the selector of IntentionalFailure(), with execution reverted. This is a mined failure, not an eth_call simulation or out-of-gas claim. The Verified evidence grade does not mean payment success.
- Total transferred principal across these demos is **0.006 USDC**; actual five-demo gas is **0.0044259685 USDC**. Deployment gas was **0.017185294 USDC**, separately. No repeat transaction or deposit is needed to replay these reports.

## Reproduce independently

1. Clone the public repo and install locked dependencies with npm ci (npm.cmd on Windows).
2. Run forge build from contracts, then return to repository root.
3. Run node scripts/verify-deployment.mjs for the captured evidence, or append --live to query current mainnet RPC. ARC_DEPLOYMENT_RPC_URL can select another endpoint; chain 5042 is enforced. No key or signature is needed.
4. Run npm test for the five frozen owner scenarios and existing regressions. The owner vectors are separate from the three third-party homepage snapshots.
5. Open any report above, select Re-verify live, and download JSON. For example:

```sh
npm run verify -- 0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41 --report docs/evidence/mainnet/forwarding.report.json
```

The collector compared each entire production live report with the local analyzer result, and compared primary/secondary receipt block hashes, statuses and logs. All five matched. These provider checks are observations, not independent consensus. Fresh reports may differ when optional trace availability changes; the analyzer must preserve that limitation.

## Source verification scope

ArcScan displayed **Verify and Publish** at 2026-09-30T01:55:05.711Z; no explorer verification badge is claimed. The included verifier checks the pinned source hash and compiler settings, receipt/address, executable bytecode of both contracts, every immutable address and live getters. Solidity CBOR metadata is excluded because source paths affect metadata. This is a reproducible executable comparison, not exact creation-bytecode or explorer source verification.

The source file is preserved unchanged from deployment. Its pre-deployment comment about pending validation is historical and superseded by this dated evidence. Standard Foundry mocks still do not emulate Arc. The five captured scenarios establish only their observed behavior, not all contract paths, memo support or all-history correctness.

## Current public application

[Production](https://arcmirror-six.vercel.app) analyzes these hashes through its existing live RPC path; no application redeployment was needed for this evidence update. The three homepage snapshots remain clearly labelled third-party examples. The [application draft](application-draft.md) links this owner evidence separately. Final application review and submission remain owner actions.
