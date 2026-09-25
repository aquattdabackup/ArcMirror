# Deployment runbook

## Current state

The Next.js production build and core build run locally. The owner explicitly approved the Vercel destination on 2026-09-25, resolving the earlier automatic approval rejection. GitHub login as aquattdabackup and source push are complete.

Vercel project **arcmirror** has been created in **Luong Tuan's projects**, team `team_Yg9wzjkNzBRPceQM3wdOWbLs`, project `prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh`. Target alias: `arcmirror-luong-tuans-projects-a65355dc.vercel.app`. Builds are not READY yet; root lockfile detection is being diagnosed. Do not treat the alias as a verified live product yet. The connector can deploy without CLI login.

## Approved website configuration

Use the existing [GitHub repository](https://github.com/aquattdabackup/ArcMirror). Use the newly created Vercel project `arcmirror` in the approved team. Do not modify unrelated projects or upgrade billing.

- Framework: Next.js.
- Root Directory: `apps/web`.
- Include source files outside Root Directory: enabled (workspace imports use `packages/core` and `packages/rpc`).
- Install: npm with repository `package-lock.json` (`npm ci` at workspace root).
- Build: default Next.js `next build` from `apps/web`.
- Node: a supported Node 22+ version; local testing used Node 24.
- Optional server-only variables: `ARC_RPC_URLS`, `ARC_TRACE_RPC_URLS`; public defaults work without a key at observation time.
- No wallet key, deploy key or reward wallet belongs in application environment variables.

After deployment, record the real project/deployment ID, production URL, commit and timestamp. Open in an unauthenticated browser; test home, all examples, malformed/unknown hashes, how-it-works, JSON download, re-verify live, health/examples/analyze APIs, mobile layout and explorer links. Check headers and browser errors. Update README only with links verified against the deployed build.

## Contract, after wallet preparation

See `contracts/README.md`. Confirm two distinct immutable public recipient addresses from the owner. Compile with pinned Solidity 0.8.28 and Cancun settings; run Foundry tests. Read the current [Arc deployment guide](https://docs.arc.io/integrate/deploy-on-arc) and recheck chain ID 5042 before preparing a signed transaction.

Prepare the exact constructor arguments, bytecode, chain, estimated gas and maximum deployment cost for review. Use an encrypted local Foundry account or a user-controlled wallet. The user enters credentials and signs locally. Never put private keys in chat, command arguments, source or `.env`.

Once deployment is mined, record actual address, hash, ABI, compiler settings and receipt in `contracts/deployments/`. Verify source on the explorer if supported and report the actual outcome. Then prepare the five bounded scenarios individually, displaying recipient, exact amount, gas and total cost before each signature. An intentional failure also spends gas. No unlimited ERC-20 approval.

## Release checklist still requiring real evidence

- Public website and anonymous production smoke test.
- Lab deployed and mainnet behavior checked; five owner-created transactions recorded.
- License and builder profile confirmed; separate reward wallet prepared.
- README and snapshots use real confirmed artifacts.
- Final history secret scan, dependency review, tests and build complete.
- Grant page/link check and English application pack after production/mainnet work.
- Owner presses the final submission button.
