# ArcMirror: a short reviewer walkthrough

ArcMirror helps Arc payment support teams and developers explain a USDC transaction without counting the same movement twice. It connects exact amounts to source evidence, separates gas and produces a report that another person can reproduce. This is a working prototype; external user adoption has not been measured.

[Live application](https://arcmirror-six.vercel.app) · [Public source](https://github.com/aquattdabackup/ArcMirror) · [Deployment and five owner demos](mainnet-evidence.md) · [Latest review](grant-review-2026-10-08.md)

## Start with the Arc-specific problem

Open the [owner-created ERC-20 transfer](https://arcmirror-six.vercel.app/tx/0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d). The actual transfer is **0.001 USDC**. Arc records native 18-decimal and interface 6-decimal representations of that movement. Adding both would incorrectly suggest **0.002 USDC**.

1. Read **What can I conclude?** and the separate gas fee.
2. Select **See why two logs are not two payments** to open the comparison. Expand the movement to inspect the two source logs.
3. Read **Needs Review**: the receipt confirms success, but native call-value traces cannot fully cover the USDC precompile mutation. The app preserves this distinction.
4. Select **Re-verify live**, then **Download JSON**. The current RPC result and exported report can be checked independently using the public source and CLI.

The review path is designed to take roughly one minute excluding network waits; this is a walkthrough target, not a measured usability result. The comparison demonstrates what naive addition would do, not that every explorer or indexer has this bug. [Dune already excludes the duplicate interface stream](https://docs.dune.com/data-catalog/curated/token-transfers/arc/arc-token-transfers). ArcMirror's focus is explaining and reproducing an individual transaction's evidence.

## Optional: check a real two-recipient payout

Open [Payout reconciliation](https://arcmirror-six.vercel.app/tools/reconcile). Paste the CSV below, enter the owner batch hash and select **Fetch fresh RPC evidence**, then **Reconcile payments**.

```text
0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8
```

```csv
id,payer,recipient,amount_usdc
demo-a,0xa64439ea7c88d56e2888c377d55ae3e174b415c1,0x9078519c691084110f44ea8f85d40850ac91acd4,0.001
demo-b,0xa64439ea7c88d56e2888c377d55ae3e174b415c1,0x7f045edecd9e1466e7e033e713344e9cb891cd22,0.002
```

Expected result: **2 of 2 expectations matched**, matched total **0.003 USDC**, and **1 unassigned movement**. That extra movement funds the Lab; the two payout movements originate from the Lab. The CSV describes the owner's demo expectations, not customer invoices. The result checks one transaction and cannot establish invoice identity or offchain settlement.

Report Inspector can compare a downloaded report to fresh RPC evidence. Dust Lab is an optional local precision demonstration. Neither tool is required to understand the core transaction report, and neither is additional onchain activity.

## Independently check deployment

Lab is deployed on Arc mainnet, chain **5042**, at [0xa64439ea7c88d56e2888c377d55ae3e174b415c1](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1). The [evidence index](mainnet-evidence.md) includes the deployment receipt, five owner transactions and source/compiler manifest. After installing the repo and building the contracts, run:

```sh
node scripts/verify-deployment.mjs --live
```

The verifier checks executable bytecode and immutable values using a complete pair from a chain-valid provider. An unavailable primary falls back to dRPC by default. This is read-only and costs no gas. It excludes Solidity metadata and does not claim an explorer verification badge or independent security audit.
