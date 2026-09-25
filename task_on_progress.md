# Current task

Implement ArcMirror v2 through production/mainnet validation and grant preparation. Owner confirmed no Circle/Arc funding and authorized software-first; do not ask those two questions again. Wallet preparation remains deferred.

## Git state and owner workflow

- Implementation `dc8035c` and handoff `a250839` are both pushed to GitHub; `origin/main` was verified at `a250839`.
- Owner requires small commits at every completed milestone, followed by push when access permits. Root `AGENTS.md` records this for future agents.
- Owner chose local GitHub sign-in as `aquattdabackup`. GCM now has that credential; repo-local credential username is set to aquattdabackup. No global account was replaced. The earlier aquattda403 and missing-login blockers are resolved.
- Owner explicitly approved Vercel source upload and production deployment to Luong Tuan's projects, project arcmirror. Do not ask for this approval again.
- Vercel project created: `prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh`. Target alias: `arcmirror-luong-tuans-projects-a65355dc.vercel.app`. No READY deployment yet: build diagnosis is in progress.

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

- Vercel connector deployment works without CLI login. First two builds (`dpl_5zQE1cKg6XjCCy3beTxLwQjxvLAv`, `dpl_374YBF635QWAih4sGmKR7k4mtY7Y`) failed npm ci with missing_lock_file. Source payload included32 files, root package-lock and packages. Diagnosing rootDirectory/encoding with an explicit UTF-8 payload and sanitized file-location output; do not mark URL live until READY.
- GitHub and Vercel destination approvals are resolved. CLI login is not currently needed for Vercel connector deployment.
- MIT and builder profile confirmation remain pending; no license selected or npm publication.
- Wallets remain deferred: need funded burner, two distinct immutable recipients and separate reward address before user-signed mainnet demos. No keys in chat.

## Remaining work

- Commit and push each completed milestone promptly; continue updating this handoff.
- Resolve Vercel build, then anonymous production/mobile/API/export/explorer checks.
- After wallets ready: prepare reviewed deployment/signatures, source verification, five owner-created confirmed scenarios and vectors.
- Only after production/mainnet work: English application pack/requirements matrix, final link/deadline check; user presses Submit.
- P2 memo/CSV/dust tool/MCP/OG/Dune/video not implemented. Do not add features while production is blocked.

## Handoff

Start with AGENTS.md and docs/HANDOFF.md, then architecture.md, docs/validation.md, docs/deployment.md and docs/spike-findings.md. npm.cmd required on Windows; tooling may require sandbox escalation. Foundry and gitleaks binaries in ignored .local-tools. No funds moved, contract deployed, website deployed, npm publication or grant submission.

The previous local next start served 127.0.0.1:3000 (tool session 35852); processes may disappear between user turns, so probe before reusing. The previous persistent browser PowerShell session 12855 owned agent-browser sessions arcmirror and arc-export-final. Browsers launched from short-lived exec cells can disappear; use persistent parent or verify session state. Keep browser snapshots separate from production evidence.

Last updated 2026-09-25.
