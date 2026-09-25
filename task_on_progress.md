# Current task

Implement ArcMirror v2 through production/mainnet validation and grant preparation. Owner confirmed no Circle/Arc funding and authorized software-first; do not ask those two questions again. Wallet preparation remains deferred.

## Git state and owner workflow

- Implementation `dc8035c`, handoff `a250839`, and access milestone `d6e739f` are pushed to GitHub.
- Owner requires small commits at every completed milestone, followed by push when access permits. Root `AGENTS.md` records this for future agents.
- Owner chose local GitHub sign-in as `aquattdabackup`. GCM now has that credential; repo-local credential username is set to aquattdabackup. No global account was replaced. The earlier aquattda403 and missing-login blockers are resolved.
- Owner explicitly approved Vercel source upload and production deployment to Luong Tuan's projects, project arcmirror. Do not ask for this approval again.
- Vercel project created: `prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh`. Production is READY at https://arcmirror-six.vercel.app, deployment `dpl_BiNChHapbCXuHziRDX9gcg3uFxE6`. Anonymous API smoke passed; public browser/export checks are next.

## Completed software

- Pure bigint core with conservative pairing, statuses, trace/state reconciliation, canonical digest and compiled ESM/declarations.
- Next.js pages and API, server-only multi-RPC access, bounded per-process cache/rate/concurrency, real saved examples, source attribution, JSON generation, live refresh.
- CLI verify, 3 public third-party mainnet vectors/snapshots; five frozen spike samples are not owner-created demos.
- ArcMirrorLab immutable-recipient contract, bounded calls, exact approvals, reentrancy guard, fixed sweeps; not deployed.
- English README/core docs/provenance, deployment/owner runbook, source survey and evidence validation.

## Verified results

37 analyzer/vector/RPC tests, 10 spike tests, 16 Foundry tests including 256 fuzz runs all passed. Typecheck and core/Next production build passed. Compiled core imported independently; package dry run passed. Production dependency audit: 0. Git-visible publication scan: 0; exact staged-source scan: 0; full history scan covering the initial and implementation commits: 0. See docs/validation.md and docs/evidence/validation/ for actual results.

Desktop/mobile local UI, source logs, amount expansion, phantom comparison, balance view, invalid/valid search, API status/headers checked. Re-verify live produced matching digest. Actual browser-created JSON payload matched the complete vector and a fresh live CLI analysis. Normal browser file saving remains unverified: test browser canceled both report and unrelated JSON downloads. Clipboard read permission was denied. Do not report these two checks as full passes.

## Important findings

ERC-20/precompile movements can have all zero native call values: logs and state match but call coverage is incomplete. Never promote this example to verified. Native example does reconcile all 3 supported views. Native 18 / ERC 6, emitter addresses and chain 5042 measured from mainnet. Memo identity and genesis/fork coverage unverified. Dune already deduplicates these streams.

## Current deployment diagnosis and owner-only items

- Vercel build issue resolved via authenticated official CLI full-repository upload. Connector inline uploads flattened the web subtree and lost outside source/lockfile. Persisted project settings in docs/deployment-settings.json; root apps/web, outside-source enabled. Build completed in 24s and READY. Root .vercel/.env.local are ignored (CLI-generated OIDC credential must never be printed or committed).
- GitHub and Vercel authorization/login are resolved. No more account permission questions are needed for these destinations.
- Owner approved MIT and public builder profile aquattdabackup on 2026-09-25. License files, package metadata/lockfile and Solidity SPDX markers updated; npm publication remains disabled.
- Wallets remain deferred: need funded burner, two distinct immutable recipients and separate reward address before user-signed mainnet demos. No keys in chat.

## Remaining work

- Commit and push each completed milestone promptly; continue updating this handoff.
- Finish anonymous production desktop/mobile/export/explorer checks. API smoke already passed.
- After wallets ready: prepare reviewed deployment/signatures, source verification, five owner-created confirmed scenarios and vectors.
- Only after production/mainnet work: English application pack/requirements matrix, final link/deadline check; user presses Submit.
- P2 memo/CSV/dust tool/MCP/OG/Dune/video not implemented. Do not add features while production is blocked.

## Handoff

Start with AGENTS.md and docs/HANDOFF.md, then architecture.md, docs/validation.md, docs/deployment.md and docs/spike-findings.md. npm.cmd required on Windows; tooling may require sandbox escalation. Foundry and gitleaks binaries in ignored .local-tools. No funds moved, contract deployed, npm publication or grant submission. Website is deployed and READY.

The previous local next start served 127.0.0.1:3000 (tool session 35852); processes may disappear between user turns, so probe before reusing. The previous persistent browser PowerShell session 12855 owned agent-browser sessions arcmirror and arc-export-final. Browsers launched from short-lived exec cells can disappear; use persistent parent or verify session state. Keep browser snapshots separate from production evidence.

Last updated 2026-09-25.
