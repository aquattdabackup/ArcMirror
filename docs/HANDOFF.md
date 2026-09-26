# Continue ArcMirror with another AI

## Paste into the next coding agent

> Continue ArcMirror. Read AGENTS.md, architecture.md, task_on_progress.md and docs/HANDOFF.md first. Preserve owner decisions. Check git status/log and origin/main, continue unfinished work without rebuilding completed milestones, make small verified commits and push them. Update portable memory before stopping. Report in Vietnamese. Never invent deployment, signatures, owner-created mainnet demos or grant submission.

## Current release

[Live website](https://arcmirror-six.vercel.app), [tools](https://arcmirror-six.vercel.app/tools), [public MIT repo](https://github.com/aquattdabackup/ArcMirror). Builder aquattdabackup and the existing Vercel destination are approved; access works.

Owner requested feature expansion before further funding work. Completed in order: CSV payout reconciliation (`a2787c8`), local JSON report inspector/comparison and Dust Lab (`aebf0c6`), all pushed. Readable typography shipped from `ff95384` through `93ba99b`; BETA branding was removed in `a429cff`; sticky navigation is `6e9682c`; home/tools now distinguish optional starter examples from user inputs in `51516f0` and `701edfa`. The full Vietnamese owner test and bug-isolation flow is `docs/owner-test-flow.vi.md`. Deployment `dpl_55YdtVKkThygJ2gxd5oegeGi3LpQ` is READY from `701edfa` at the public URL. See docs/evidence/tools, docs/evidence/production/typography-checks.json and deployment.json. Do not restart these features.

49 application tests, typecheck, core ESM imports and local/remote production builds passed. Existing 10 spike and 16 Foundry tests (256 fuzz runs) were previously passing; contracts/spike did not change. The CSS-only typography release passed a fresh local build, production API smoke, desktop/mobile visual inspection, computed-style checks and a Vercel error-log scan. Browser verification also covers the earlier CSV/JSON imports, exact duplicate/mismatch behavior, modified digests, fresh mainnet comparison, dust arithmetic and exported files. No funds moved or wallet connection added.

The app reads Arc mainnet, chain 5042; Lab remains **not deployed**. Three saved transactions are third-party examples, not the owner's five demos. ERC-20 precompile evidence remains Needs Review. Digest integrity does not establish authenticity. See docs/validation.md.

## Commit history clarification

The owner requested smaller commits. A retrospective series of 55 focused commits was merged from `history/workbench-granular` into main; original published commits remain in history. docs/commit-map.md lists each hash, the merge and tree-equality checks. The reconstruction changed history organization only. The current deployed application source is `701edfa`; later commits update evidence and handoff only. Future commits should separate independent core, tests, UI/routes, package, documentation and evidence work, as AGENTS.md specifies.

## Exact next work

1. Check working tree and origin/main. Production application source is `701edfa`; documentation/evidence/handoff commits follow and do not require redeployment. Consult git log for the final handoff hash. The ignored bundle is regenerated after the handoff push; verify its head against main before using it.
2. Feature expansion is delivered. Review docs/application-draft.md (updated 100-word description and tool tour) and docs/feature-expansion.md. Published grant rules do not cap features or freeze improvements before submission; post-submission update review is unspecified. Additional features do not guarantee selection. DoraHacks form remains behind human verification.
3. Resume the original mainnet Lab/five-demo stage when the owner is ready. Four public addresses are already validated in ignored artifacts/owner-wallets.json; never ask for secrets. Owner uses MetaMask and has no USDC. They previously chose to obtain USDC, then prioritized these features. Read docs/funding.md and docs/wallet-preflight.md. No exact purchase quote/provider/amount, funds transfer or signed deployment is approved.
4. User purchases/funds/signs locally. Once funded, recheck live chain, balance, nonce and ordinary gas estimate. Review exact recipients, constructor arguments, amounts and gas before owner signing. The existing unsigned payload and predicted address are not a deployment. Record the real Lab address/source verification and five confirmed owner-created scenarios afterward.
5. Finalize the application with real artifacts and recheck official rules/links. Owner submits. No npm publication or final submission is authorized.

## Portable context and operation

Use npm.cmd on Windows. CLI deployment from linked repository root includes shared workspace source; connector inline-file upload previously omitted it. Use only the existing approved arcmirror project/team. Never print .env/.vercel credentials. See docs/deployment.md.

Project memory and original brief are in architecture.md, task_on_progress.md and docs/product-brief.vi.md. The ignored bundle artifacts/ArcMirror-handoff.bundle contains main only; GitHub is canonical. The address-only local file must be transferred privately to another machine if needed. No Codex-specific skill or original chat is needed to resume.

Browser note: use an isolated Edge profile with a persistent parent process. After a download, select the actual app tab again; the Edge download-hub target cannot emulate viewport metrics. Functional tests on that popup target are not desktop viewport evidence. Screenshots recorded as desktop use the real app target.
