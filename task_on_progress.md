# Current task

Continue ArcMirror v2 through owner-created mainnet demos and grant preparation. Software-first is authorized. Four public wallet addresses are now supplied; burner funding and owner-local signing are pending. Website is live at https://arcmirror-six.vercel.app.

## Owner decisions and Git

- No prior Circle/Arc funding confirmed. Owner approved MIT and builder profile https://github.com/aquattdabackup on 2026-09-25. No need to re-ask.
- Small verified milestone commits and prompt pushes are required. GitHub authentication as aquattdabackup works through repo-local credential selection; global account was not replaced.
- Pushed milestones: 272baa9 MIT/profile and 4bfa74d production browser/export evidence. Earlier: dc8035c implementation, a250839 handoff, d6e739f access, 0c77b1e deployment/API smoke. Application draft/handoff c188a8b is also pushed; check git status/log and origin/main for its exact hash.
- Vercel team Luong Tuan's projects/project arcmirror is approved. Current deployment dpl_BiNChHapbCXuHziRDX9gcg3uFxE6 is READY. There is no active approval/authentication blocker; the temporary automatic-review usage error was resolved by the later successful run.

## Completed and verified

- Core bigint analyzer, Next pages/APIs, server-only bounded RPC service, CLI verifier, 3 third-party mainnet vectors; locally tested Lab contract.
- 37 application tests, 10 spike tests, 16 Foundry tests including 256 fuzz runs; typecheck/build/package checks passed. Production dependency audit 0. No new runtime-code changes in license/production-evidence milestones.
- MIT applied to root/core LICENSE, package/lock metadata, Solidity SPDX. Package dry run now includes 7 files. Packages remain private; no npm publication.
- Anonymous public production APIs and desktop/mobile browser flows passed. Ordinary Edge Download JSON saved 8190 bytes to disk; unchanged file equals entire fixture, and fresh live CLI matched its digest. Mainnet live refresh returned matching digest. Details/screenshots in docs/evidence/production and docs/validation.md.
- Blockscout opened correct transaction/status/block/fee. ArcScan reached Cloudflare challenge; clipboard copy reports success but independent read is denied. Record these limits, not universal browser passes.
- Native example Verified; ERC-20 precompile example stays Needs Review despite logs/state agreement. Native call-value trace cannot certify those precompile mutations. Dune already deduplicates these representations; do not claim exclusive novelty.

## Remaining work

1. English draft is ready at docs/application-draft.md: 100-word description, longer description, real links, reviewer tour and requirement matrix; Lab/demo fields remain pending; reward address is supplied locally and should be entered by the owner into the final application. Official grant and Arc/Dune sources rechecked 2026-09-25. DoraHacks registration reached Human Verification; no form fields inspected or submitted.
2. Owner supplied burner, two recipients and reward address; all four are distinct/checksummed. Mapping is in ignored artifacts/owner-wallets.json, not public Git. Mainnet read-only check found zero balance/empty code, burner nonce 0. Constructor/init code is prepared in ignored artifacts/lab-deployment-unsigned.json. Ordinary estimate failed for insufficient balance; zero-gas-price simulation estimated 806827 gas (~0.0162172227 USDC at observed price), not an executable fee approval. See docs/wallet-preflight.md. Owner uses MetaMask and has no USDC. Official network/Portal funding guidance is in docs/funding.md; actual onramp availability/quote is unverified. Owner now asks about total costs, recovering a $5 deposit and zero-spend alternatives. No $5 funding requirement or spending approval exists. Explain costs and agree the intended scope before asking for funding; the existing read-only mainnet analyzer works without owner funds. Original Lab/five-demo scope has not been canceled. See docs/funding.md for the Portal off-ramp limitation. Await owner decision/funding; then rerun ordinary estimates and prepare exact owner-local signing. No transaction sent.
3. Complete final application matrix/link check after those artifacts exist; owner presses Submit.
4. P2 memo/CSV/dust tool/MCP/OG/Dune/video remain deferred. Do not add unrelated features.

## Operation and handoff

Read AGENTS.md, architecture.md, docs/HANDOFF.md and only targeted source. Original specification is docs/product-brief.vi.md. Current deployment settings in docs/deployment-settings.json; use linked official Vercel CLI from repo root. Connector inline uploads lost workspace files. .vercel and .env.local are ignored; never print their credentials.

Use npm.cmd on Windows. Gitleaks/Foundry are in ignored .local-tools. Node tooling can require sandbox escalation; preserve actual failures vs checks that later passed. Production browser sessions were closed after verification. For future checks, use an isolated browser profile and a persistent parent process: short-lived exec parents can kill browser daemons. Installed Edge succeeded at normal file download where cached Chromium failed.

Latest wallet milestone reran Foundry: 16 passed including 256 fuzz cases. No funds moved, contract deployed, npm package published or grant submitted. Keep this file until the remaining original task is complete. Before handing off, update docs/HANDOFF.md, commit/push and regenerate ignored artifacts/ArcMirror-handoff.bundle from main only (not --all).

Last updated 2026-09-25.
