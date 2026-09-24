# Current task

Implement ArcMirror v2 through production/mainnet validation and grant preparation. Owner confirmed no Circle/Arc funding and authorized software-first; do not ask those two questions again. Wallet preparation remains deferred.

## Completed software

- Pure bigint core with conservative pairing, statuses, trace/state reconciliation, canonical digest and compiled ESM/declarations.
- Next.js pages and API, server-only multi-RPC access, bounded per-process cache/rate/concurrency, real saved examples, source attribution, JSON generation, live refresh.
- CLI verify, 3 public third-party mainnet vectors/snapshots; five frozen spike samples are not owner-created demos.
- ArcMirrorLab immutable-recipient contract, bounded calls, exact approvals, reentrancy guard, fixed sweeps; not deployed.
- English README/core docs/provenance, deployment/owner runbook, source survey and evidence validation.

## Verified results

37 analyzer/vector/RPC tests, 10 spike tests, 16 Foundry tests including 256 fuzz runs all passed. Typecheck and core/Next production build passed. Compiled core imported independently; package dry run passed. Production dependency audit: 0. Git-visible publication scan: 0; initial full history scan: 0. See docs/validation.md and docs/evidence/validation/ for actual results.

Desktop/mobile local UI, source logs, amount expansion, phantom comparison, balance view, invalid/valid search, API status/headers checked. Re-verify live produced matching digest. Actual browser-created JSON payload matched the complete vector and a fresh live CLI analysis. Normal browser file saving remains unverified: test browser canceled both report and unrelated JSON downloads. Clipboard read permission was denied. Do not report these two checks as full passes.

## Important findings

ERC-20/precompile movements can have all zero native call values: logs and state match but call coverage is incomplete. Never promote this example to verified. Native example does reconcile all 3 supported views. Native 18 / ERC 6, emitter addresses and chain 5042 measured from mainnet. Memo identity and genesis/fork coverage unverified. Dune already deduplicates these streams.

## Blockers requiring owner actions

1. Automatic review explicitly rejected `vercel_deploy_to_vercel` because source upload destination/account was not explicitly approved. Visible team: Luong Tuan's projects (`luong-tuans-projects-a65355dc`). No ArcMirror project existed; no website has been deployed. Do not bypass rejection via another deploy tool or indirect Git automation. Request explicit permission to create `arcmirror` in this team only after delivering the concrete tested source.
2. Vercel CLI is logged out; connector visibility does not imply CLI auth. Interactive login may be needed after destination approval.
3. MIT and builder profile aquattdabackup await confirmation. All packages private; Solidity UNLICENSED; no LICENSE yet.
4. Need owner-controlled funded burner, two distinct immutable recipient addresses and separate reward wallet. Never accept keys/seeds in chat. All spending is user-signed after exact amounts/gas review.

## Remaining work

- Finish final staged-source/history scan, commit and push tested source to existing authorized public GitHub repo if credentials permit. Do not trigger Vercel deployment.
- After hosting permission/login: create new project with root apps/web and outside-root source enabled; anonymous production/mobile/API/export/explorer checks.
- After wallets ready: prepare reviewed deployment/signatures, source verification, five owner-created confirmed scenarios and vectors.
- Only after production/mainnet work: English application pack/requirements matrix, final link/deadline check; user presses Submit.
- P2 memo/CSV/dust tool/MCP/OG/Dune/video not implemented. Do not add features while production is blocked.

## Handoff

Read architecture.md, docs/validation.md, docs/deployment.md and docs/spike-findings.md. npm.cmd required on Windows; tooling may require sandbox escalation. Foundry and gitleaks binaries in ignored .local-tools. No funds moved, contract deployed, website deployed, npm publication or grant submission.

Local next start currently serves 127.0.0.1:3000 (tool session 35852); it may disappear between user turns. Persistent browser PowerShell session 12855 owns agent-browser sessions arcmirror and arc-export-final. Browsers launched from short-lived exec cells can disappear; use persistent parent or verify session state. Keep browser snapshots separate from production evidence.

Last updated 2026-09-25.
