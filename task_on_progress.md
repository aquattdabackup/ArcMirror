# Current task

Continue ArcMirror v2 through owner-created mainnet demos and grant preparation. Software-first is authorized; wallet preparation is deferred. Website is live at https://arcmirror-six.vercel.app.

## Owner decisions and Git

- No prior Circle/Arc funding confirmed. Owner approved MIT and builder profile https://github.com/aquattdabackup on 2026-09-25. No need to re-ask.
- Small verified milestone commits and prompt pushes are required. GitHub authentication as aquattdabackup works through repo-local credential selection; global account was not replaced.
- Pushed milestones: 272baa9 MIT/profile and 4bfa74d production browser/export evidence. Earlier: dc8035c implementation, a250839 handoff, d6e739f access, 0c77b1e deployment/API smoke. The application-draft/handoff milestone accompanies this checkout; check git status/log and origin/main for its exact hash.
- Vercel team Luong Tuan's projects/project arcmirror is approved. Current deployment dpl_BiNChHapbCXuHziRDX9gcg3uFxE6 is READY. There is no active approval/authentication blocker; the temporary automatic-review usage error was resolved by the later successful run.

## Completed and verified

- Core bigint analyzer, Next pages/APIs, server-only bounded RPC service, CLI verifier, 3 third-party mainnet vectors; locally tested Lab contract.
- 37 application tests, 10 spike tests, 16 Foundry tests including 256 fuzz runs; typecheck/build/package checks passed. Production dependency audit 0. No new runtime-code changes in license/production-evidence milestones.
- MIT applied to root/core LICENSE, package/lock metadata, Solidity SPDX. Package dry run now includes 7 files. Packages remain private; no npm publication.
- Anonymous public production APIs and desktop/mobile browser flows passed. Ordinary Edge Download JSON saved 8190 bytes to disk; unchanged file equals entire fixture, and fresh live CLI matched its digest. Mainnet live refresh returned matching digest. Details/screenshots in docs/evidence/production and docs/validation.md.
- Blockscout opened correct transaction/status/block/fee. ArcScan reached Cloudflare challenge; clipboard copy reports success but independent read is denied. Record these limits, not universal browser passes.
- Native example Verified; ERC-20 precompile example stays Needs Review despite logs/state agreement. Native call-value trace cannot certify those precompile mutations. Dune already deduplicates these representations; do not claim exclusive novelty.

## Remaining work

1. English draft is ready at docs/application-draft.md: 100-word description, longer description, real links, reviewer tour and requirement matrix; Lab/demo/reward fields are explicitly pending. Official grant and Arc/Dune sources rechecked 2026-09-25. DoraHacks registration reached Human Verification; no form fields inspected or submitted.
2. Once owner supplies funded burner, two distinct controlled public recipients and separate reward address: prepare exact chain 5042 transaction/constructor/gas for owner-local signing. Deploy Lab, verify source if supported, then record five owner-created confirmed scenarios and vectors.
3. Complete final application matrix/link check after those artifacts exist; owner presses Submit.
4. P2 memo/CSV/dust tool/MCP/OG/Dune/video remain deferred. Do not add unrelated features.

## Operation and handoff

Read AGENTS.md, architecture.md, docs/HANDOFF.md and only targeted source. Original specification is docs/product-brief.vi.md. Current deployment settings in docs/deployment-settings.json; use linked official Vercel CLI from repo root. Connector inline uploads lost workspace files. .vercel and .env.local are ignored; never print their credentials.

Use npm.cmd on Windows. Gitleaks/Foundry are in ignored .local-tools. Node tooling can require sandbox escalation; preserve actual failures vs checks that later passed. Production browser sessions were closed after verification. For future checks, use an isolated browser profile and a persistent parent process: short-lived exec parents can kill browser daemons. Installed Edge succeeded at normal file download where cached Chromium failed.

No funds moved, contract deployed, npm package published or grant submitted. Keep this file until the remaining original task is complete. Before handing off, update docs/HANDOFF.md, commit/push and regenerate ignored artifacts/ArcMirror-handoff.bundle from main only (not --all).

Last updated 2026-09-25.
