# Current task

Current milestone: owner requested and approved payout CSV reconciliation first, then a browser JSON inspector/comparison and Dust Lab (2026-09-25). Build, test, commit and deploy these focused additions before resuming funding. Continue ArcMirror v2 through owner-created mainnet demos and grant preparation afterward. Software-first is authorized. Four public wallet addresses are now supplied; burner funding and owner-local signing are pending. Website is live at https://arcmirror-six.vercel.app.

## Owner decisions and Git

- No prior Circle/Arc funding confirmed. Owner approved MIT and builder profile https://github.com/aquattdabackup on 2026-09-25. No need to re-ask.
- Small verified milestone commits and prompt pushes are required. GitHub authentication as aquattdabackup works through repo-local credential selection; global account was not replaced.
- Pushed milestones: 272baa9 MIT/profile and 4bfa74d production browser/export evidence. Earlier: dc8035c implementation, a250839 handoff, d6e739f access, 0c77b1e deployment/API smoke. Application draft/handoff c188a8b, wallet preparation abca5a7 and cost clarification b606f4a are pushed; check git status/log and origin/main for its exact hash.
- Vercel team Luong Tuan's projects/project arcmirror is approved. Current deployment dpl_BiNChHapbCXuHziRDX9gcg3uFxE6 is READY. There is no active approval/authentication blocker; the temporary automatic-review usage error was resolved by the later successful run.

## Completed and verified

- Core bigint analyzer, Next pages/APIs, server-only bounded RPC service, CLI verifier, 3 third-party mainnet vectors; locally tested Lab contract.
- 37 application tests, 10 spike tests, 16 Foundry tests including 256 fuzz runs; typecheck/build/package checks passed. Production dependency audit 0. No new runtime-code changes in license/production-evidence milestones.
- MIT applied to root/core LICENSE, package/lock metadata, Solidity SPDX. Package dry run now includes 7 files. Packages remain private; no npm publication.
- Anonymous public production APIs and desktop/mobile browser flows passed. Ordinary Edge Download JSON saved 8190 bytes to disk; unchanged file equals entire fixture, and fresh live CLI matched its digest. Mainnet live refresh returned matching digest. Details/screenshots in docs/evidence/production and docs/validation.md.
- Blockscout opened correct transaction/status/block/fee. ArcScan reached Cloudflare challenge; clipboard copy reports success but independent read is denied. Record these limits, not universal browser passes.
- Native example Verified; ERC-20 precompile example stays Needs Review despite logs/state agreement. Native call-value trace cannot certify those precompile mutations. Dune already deduplicates these representations; do not claim exclusive novelty.

## Feature expansion progress

CSV milestone is implemented: /tools/reconcile imports/pastes local CSV, matches exact payer/recipient/amount one-to-one, shows missing/mismatched and unassigned movements, preserves evidence grade, links the source report and exports reconciliation JSON. Core precision/reconciliation are independent package subpaths.

Validation: 44 application tests passed, build passed after fixing Turbopack runtime import extensions (standalone TypeScript build rewrites .ts to .js). ESM subpath imports passed. Local production browser at 1440px/390px: sample 2/2 matched; uploaded one-wei mismatch 0/1 matched, exact amount retained; errors/console empty; width 390/390, no overlay. UI copy encoding corrected afterward; typecheck re-run. Screenshots are in ignored artifacts/tools-check; final deploy evidence will follow the complete tool set. CSV is committed and pushed as a2787c8. JSON inspector/comparison and Dust Lab are now implemented. 49 tests, typecheck, production build and standalone inspector import pass. Local browser: original vs tampered report pinpoints /evidenceLevel and digest mismatch; original vs original and fresh RPC are identical; actual comparison and dust JSON downloads validated. Dust one-wei and micro-USDC arithmetic pass. All three local JSON downloads are validated, including one-use matching for duplicate expectations. Remaining: commit/push the inspector/Dust Lab milestone, deploy, verify public tools and update application draft/handoff. Final typecheck after small copy/input bounds passed.

## Latest readiness recheck

At 2026-09-25T14:16:25Z, production API smoke passed again; home/methodology/native report returned HTTP 200. Native and ERC-20 live endpoint reports exactly matched full golden vectors with the intended Verified/Needs Review grades. Evidence: docs/evidence/production/readiness-recheck.json. This is point-in-time functional verification, not load/uptime or security certification. No runtime code changed, so unrelated suites were not repeated.

## Remaining work

1. English draft is ready at docs/application-draft.md: 100-word description, longer description, real links, reviewer tour and requirement matrix; Lab/demo fields remain pending; reward address is supplied locally and should be entered by the owner into the final application. Official grant and Arc/Dune sources rechecked 2026-09-25. DoraHacks registration reached Human Verification; no form fields inspected or submitted.
2. Owner supplied burner, two recipients and reward address; all four are distinct/checksummed. Mapping is in ignored artifacts/owner-wallets.json, not public Git. Mainnet read-only check found zero balance/empty code, burner nonce 0. Constructor/init code is prepared in ignored artifacts/lab-deployment-unsigned.json. Ordinary estimate failed for insufficient balance; zero-gas-price simulation estimated 806827 gas (~0.0162172227 USDC at observed price), not an executable fee approval. See docs/wallet-preflight.md. Owner uses MetaMask and has no USDC. Official network/Portal funding guidance is in docs/funding.md; actual onramp availability/quote is unverified. Owner explicitly chose to continue obtaining USDC and the mainnet Lab/five-demo path after discussing costs. Do not re-open the scope decision. No exact purchase amount/provider/fee or deployment transaction has been approved or signed. User completes the crypto purchase and local signing; agent provides checks/guidance. Portal has no direct off-ramp. Await a reviewed funding quote/deposit; then rerun ordinary estimates and prepare exact owner-local signing. No transaction sent.
3. Complete final application matrix/link check after those artifacts exist; owner presses Submit.
4. CSV reconciliation, report inspector/comparison and Dust Lab are now authorized. Acceptance: exact bigint, one-to-one matching, local file processing, explicit evidence limits, usable desktop/mobile flows, tests and deployment evidence. Memo/MCP/OG/Dune/video remain deferred. The official Microgrants page does not state a feature cap or freeze before submission; this is an inference of fit, not organizer approval. Post-submission update review is unspecified. See docs/feature-expansion.md.

## Operation and handoff

Read AGENTS.md, architecture.md, docs/HANDOFF.md and only targeted source. Original specification is docs/product-brief.vi.md. Current deployment settings in docs/deployment-settings.json; use linked official Vercel CLI from repo root. Connector inline uploads lost workspace files. .vercel and .env.local are ignored; never print their credentials.

Use npm.cmd on Windows. Gitleaks/Foundry are in ignored .local-tools. Node tooling can require sandbox escalation; preserve actual failures vs checks that later passed. Production browser sessions were closed after verification. For future checks, use an isolated browser profile and a persistent parent process: short-lived exec parents can kill browser daemons. Installed Edge succeeded at normal file download where cached Chromium failed.

Latest wallet milestone reran Foundry: 16 passed including 256 fuzz cases. No funds moved, contract deployed, npm package published or grant submitted. Keep this file until the remaining original task is complete. Before handing off, update docs/HANDOFF.md, commit/push and regenerate ignored artifacts/ArcMirror-handoff.bundle from main only (not --all).

Last updated 2026-09-25.
