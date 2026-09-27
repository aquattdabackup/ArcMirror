# Continue ArcMirror with another AI

## Paste into the next coding agent

> Continue ArcMirror. Read AGENTS.md, architecture.md, task_on_progress.md and docs/HANDOFF.md first. Preserve owner decisions. Check git status/log and origin/main, continue unfinished work without rebuilding completed milestones, make small verified commits and push them. Update portable memory before stopping. Report in Vietnamese. Never invent deployment, signatures, owner-created mainnet demos or grant submission.

## Current release

Latest owner direction (2026-09-27): restore the original P0 transaction-explanation focus; the three extra tools were hard to understand and their usefulness was unclear. Funding/signing is deferred. The correction is delivered; owner comprehension is still to be assessed. Read docs/product-review.md and start the owner at the homepage's one-minute native-transfer link, not the Tools catalog.

Current production is `dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC`, READY from `229ba77`. ReportGuide explains receipt outcome, amount and gas before evidence detail; direct links lead to flow, double-count comparison and sharing. All optional tools state their audience/input/output/limits. There are 55 passing tests (49 existing + 6 report explanation guards), passing typecheck/local and remote builds, and verified production flow/mobile/API checks. See docs/evidence/product-focus/checks.json and screenshots. A stale-heading smoke expectation was corrected in `5ef87ab`; production smoke then passed. Evidence is committed/pushed in `a96c1bc`. The later commits are tests/docs only and do not need another deploy.

[Live website](https://arcmirror-six.vercel.app), [tools](https://arcmirror-six.vercel.app/tools), [public MIT repo](https://github.com/aquattdabackup/ArcMirror). Builder aquattdabackup and the existing Vercel destination are approved; access works.

Earlier work: CSV payout reconciliation (`a2787c8`), JSON inspector/comparison and Dust Lab (`aebf0c6`); readable typography `ff95384` through `93ba99b`; BETA removal `a429cff`; sticky navigation `6e9682c`. These implementations remain available as optional workflows. The current short owner walkthrough is in docs/owner-test-flow.vi.md (`761ccfa`), and the application draft now leads with the core transaction use case (`cfe3604`). Do not restart completed features or equate technical completeness with validated usefulness.

49 application tests, typecheck, core ESM imports and local/remote production builds passed. Existing 10 spike and 16 Foundry tests (256 fuzz runs) were previously passing; contracts/spike did not change. The CSS-only typography release passed a fresh local build, production API smoke, desktop/mobile visual inspection, computed-style checks and a Vercel error-log scan. Browser verification also covers the earlier CSV/JSON imports, exact duplicate/mismatch behavior, modified digests, fresh mainnet comparison, dust arithmetic and exported files. No funds moved or wallet connection added.

The app reads Arc mainnet, chain 5042; Lab remains **not deployed**. Three saved transactions are third-party examples, not the owner's five demos. ERC-20 precompile evidence remains Needs Review. Digest integrity does not establish authenticity. See docs/validation.md.

## Commit history clarification

The owner requested smaller commits. A retrospective series of 55 focused commits was merged from `history/workbench-granular` into main; original published commits remain in history. docs/commit-map.md records that history-only reconstruction. New work uses separate audit, report, test, homepage, catalog, tool route, packaging, documentation and evidence commits. No force-push or further reconstruction is needed.

## Exact next work

1. Check working tree and origin/main. Production application source is `229ba77`; consult git log for the final handoff hash. The only pre-existing uncommitted change is LICENSE indentation; preserve it. The ignored bundle is regenerated after handoff push; verify its head against main before using it.
2. Have the owner try the core walkthrough and identify any remaining unclear step. The review explicitly found a usability gap despite technical checks. No extra feature request is implied. Published grant criteria emphasize Arc relevance/credibility/quality/potential, not these three tools. No organizer acceptance or award is guaranteed; DoraHacks form remains behind human verification.
3. Resume the original mainnet Lab/five-demo stage when the owner returns to it after product review. Four public addresses are validated in ignored artifacts/owner-wallets.json; never ask for secrets. Last reported state: MetaMask, no USDC. Read docs/funding.md and docs/wallet-preflight.md. No exact purchase quote/provider/amount, transfer or signed deployment is approved.
4. User purchases/funds/signs locally. Once funded, recheck live chain, balance, nonce and ordinary gas estimate. Review exact recipients, constructor arguments, amounts and gas before owner signing. The existing unsigned payload and predicted address are not a deployment. Record the real Lab address/source verification and five confirmed owner-created scenarios afterward.
5. Finalize the application with real artifacts and recheck official rules/links. Owner submits. No npm publication or final submission is authorized.

## Portable context and operation

The 2026-09-27 automatic approval-review usage-limit interruption was resolved after the owner's continuation request; resumed production checks, commits and pushes worked. No active approval blocker. The test browser and local server were closed. Preserve these facts rather than asking for already-granted GitHub/Vercel permissions again.

Use npm.cmd on Windows. CLI deployment from linked repository root includes shared workspace source; connector inline-file upload previously omitted it. Use only the existing approved arcmirror project/team. Never print .env/.vercel credentials. See docs/deployment.md.

Project memory and original brief are in architecture.md, task_on_progress.md and docs/product-brief.vi.md. The ignored bundle artifacts/ArcMirror-handoff.bundle contains main only; GitHub is canonical. The address-only local file must be transferred privately to another machine if needed. No Codex-specific skill or original chat is needed to resume.

Browser note: use an isolated Edge profile with a persistent parent process. After a download, select the actual app tab again; the Edge download-hub target cannot emulate viewport metrics. Functional tests on that popup target are not desktop viewport evidence. Screenshots recorded as desktop use the real app target.
