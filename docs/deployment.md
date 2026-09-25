# Deployment runbook

## Current state

**Production is READY:** https://arcmirror-six.vercel.app

Deployed on 2026-09-25 to the owner's explicitly approved Vercel team. Project: `prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh`; deployment: `dpl_BiNChHapbCXuHziRDX9gcg3uFxE6`. GitHub login/push and Vercel CLI login are complete. [Deployment record](evidence/production/deployment.json) and [anonymous API smoke result](evidence/production/api-smoke.txt). Public desktop/mobile flows and an ordinary JSON file save passed; [browser checks](evidence/production/browser-checks.json) records the ArcScan challenge and clipboard-read limitation.

The connector's inline-file deployments built only the web subtree, leaving out the workspace lockfile and shared source. The official authenticated CLI upload preserved the full monorepo and built successfully. Use CLI deployments from repository root with the project linked. Failed diagnostic builds were not promoted as working releases.

## Approved website configuration

Use the existing [GitHub repository](https://github.com/aquattdabackup/ArcMirror). Use the existing Vercel project `arcmirror` in the approved team. Do not modify unrelated projects or upgrade billing.

- Framework: Next.js.
- Root Directory: `apps/web`.
- Include source files outside Root Directory: enabled (workspace imports use `packages/core` and `packages/rpc`).
- Install: `if [ -f package-lock.json ]; then npm ci; else npm ci --prefix ../..; fi`, using the root lockfile whether install starts in root or apps/web.
- Build: `npm run build` from `apps/web` (runs next build); default output directory.
- Node: a supported Node 22+ version; local testing used Node 24.
- Optional server-only variables: `ARC_RPC_URLS`, `ARC_TRACE_RPC_URLS`; public defaults work without a key at observation time.
- No wallet key, deploy key or reward wallet belongs in application environment variables.

After deployment, record the real project/deployment ID, production URL, commit and timestamp. Open in an unauthenticated browser; test home, all examples, malformed/unknown hashes, how-it-works, JSON download, re-verify live, health/examples/analyze APIs, mobile layout and explorer links. Check headers and browser errors. Update README only with links verified against the deployed build.

Reproducible settings: [deployment-settings.json](deployment-settings.json). With Vercel CLI 59.26.0 authenticated, link the repository to this project and run `vercel deploy --prod --yes --scope luong-tuans-projects-a65355dc`. The generated `.vercel` and `.env.local` are ignored; never commit their credentials.

## Contract, after wallet preparation

See `contracts/README.md`. Confirm two distinct immutable public recipient addresses from the owner. Compile with pinned Solidity 0.8.28 and Cancun settings; run Foundry tests. Read the current [Arc deployment guide](https://docs.arc.io/integrate/deploy-on-arc) and recheck chain ID 5042 before preparing a signed transaction.

Prepare the exact constructor arguments, bytecode, chain, estimated gas and maximum deployment cost for review. Use an encrypted local Foundry account or a user-controlled wallet. The user enters credentials and signs locally. Never put private keys in chat, command arguments, source or `.env`.

Once deployment is mined, record actual address, hash, ABI, compiler settings and receipt in `contracts/deployments/`. Verify source on the explorer if supported and report the actual outcome. Then prepare the five bounded scenarios individually, displaying recipient, exact amount, gas and total cost before each signature. An intentional failure also spends gas. No unlimited ERC-20 approval.

## Release checklist still requiring real evidence

- Public website, anonymous APIs, desktop/mobile flows and actual browser file download: complete. ArcScan content and clipboard read remain limited by external browser challenges/permissions.
- Lab deployed and mainnet behavior checked; five owner-created transactions recorded.
- MIT and builder profile confirmed; separate reward wallet still pending.
- README and snapshots use real confirmed artifacts.
- Final history secret scan, dependency review, tests and build complete.
- Grant page/link check and English application pack after production/mainnet work.
- Owner presses the final submission button.
