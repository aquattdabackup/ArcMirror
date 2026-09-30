# ArcMirrorLab

**Deployed on Arc Mainnet, chain 5042.** Lab: [0xa64439ea7c88d56e2888c377d55ae3e174b415c1](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1). [Deployment transaction](https://arc.etherscan.io/tx/0x97bcd82e2d98eee0962c54e6bd2fbdbfa78ff908c0627d7f53fc52fe28032292) succeeded at block 23006461. [Manifest](deployments/5042.json), [RPC evidence](deployments/5042.rpc.json), and [five completed owner demos](../docs/mainnet-evidence.md).

The bounded experiment contract has two immutable recipients, a 0.01 USDC per-call cap, reentrancy guard, exact ERC-20 allowances, native forwarding, duplicate transfers, dust, batch and explicit revert. It has no owner/admin withdrawal role. Forced native balances may only be swept to the fixed first recipient. Source is MIT.

Run forge build and forge test -vv from this directory. From repository root run node scripts/verify-deployment.mjs --live to compare the deployed Lab and Forwarder with the compiled executable bytecode and exact immutable addresses. See the manifest for compiler/source identity. Solidity metadata is excluded; ArcScan source verification is not claimed.

The source remains identical to its deployed revision, including a historical pre-deployment comment. The dated manifest and mainnet evidence supersede that comment. Do not redeploy to update a status label.

Standard EVM mock tests do not reproduce Arc shared native/ERC-20 balances or system logs. The real five-scenario evidence now covers native transfer, direct ERC-20 transfer, nativeForward, batch and a mined intentionalFailure. Duplicate-transfer and dust contract calls remain optional, unclaimed mainnet coverage. The pure failure function's normal Remix button only simulates; the recorded failed transaction is identified separately in the evidence.

The [runbook](../docs/mainnet-demo.md) is retained for understanding/replaying the recorded flow. No additional signature or payment is required to view existing reports. New transactions, if ever requested, still require owner-local review and signing.
