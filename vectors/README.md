# Mainnet vectors

Each `<txHash>.json` includes `provenance`, `capturedAt`, raw RPC `input` and the exact analyzer `expected` report. The three transactions are existing public third-party Arc mainnet transactions captured on September 24, 2026, not owner-created demos. Capture time/provenance are outside the canonical report digest.

- `0xa031...ad87`: native 0.01 USDC transfer, call/state/log reconciliation.
- `0x376b...7b24f`: composed ERC-20 movements, doubled interface representation, incomplete native call-value coverage.
- `0x3756...b3de`: one-raw-unit native dust, no ERC-20 interface log.

`npm test` re-analyzes every vector offline and deep-compares the complete expected report. Synthetic corner cases are separately labeled unit tests in `packages/core/test/analyzer.test.ts`. Do not describe synthetic tests as mainnet transactions.

`npm run vectors` regenerates these reports and `apps/web/lib/snapshots.json` from frozen evidence under `docs/evidence/spike/`. It does not create transactions or fetch fresh evidence. Review any output change before accepting a new expected result. Use the CLI with `--fixture <file>` for offline comparisons; omit that flag to fetch live data.

Five owner-created mainnet vectors are now published in `owner/`, with their provenance distinct from the three third-party root vectors. `owner-mainnet.test.ts` checks the complete frozen reports plus exact scenario behavior. See [mainnet evidence](../docs/mainnet-evidence.md) and the [deployment manifest](../contracts/deployments/5042.json). The existing snapshot generator intentionally continues to generate only the three third-party homepage examples.
