# Continue ArcMirror with another AI

## Paste into the next agent

> Read AGENTS.md, architecture.md, task_on_progress.md and docs/maintenance-review-2026-10-07.md. October 7 maintenance is complete and committed, but changes are NOT deployed. Production live lookups returned not_found for mined owner transactions; updated local analysis passes all five. Do not repeat demos, erase evidence, change pinned Solidity or claim production passes. Preserve the user's LICENSE edit. Owner forbade deployment/blockchain writes for the review; wait for a later release instruction. Use focused verified commits/pushes and update memory. Report in Vietnamese.

## Current state — October 7

The [maintenance review](maintenance-review-2026-10-07.md) lists exact findings/fixes and [structured results](evidence/maintenance/2026-10-07.json) distinguish local success from production failure. README and [documentation index](README.md) were rewritten. Fixes cover partial-provider fallback, optional-block receipt loss, aggregate RPC deadline, CLI argument validation, evidence tab accessibility, duplicated file helpers, overly broad UI wording and two High dependency advisories.

Implementation/review commits 587bd48 through bb3f99c are pushed; see task_on_progress.md for each milestone. Consult git log/origin for the subsequent memory commit. Only the pre-existing LICENSE indentation edit should remain dirty.

**Unresolved production issue:** native and batch ?live=1 calls returned HTTP 404/not_found at 2026-10-07T05:19:30Z, although both public RPC endpoints reported 5042 and the updated local API reproduced all five expected reports. The exact Vercel-side configuration/upstream cause is unproven. Last recorded production source is 229ba77 / dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC; its old title remains visible. Do not reuse September 30's passing review as a current availability claim.

Local final checks: 70 application + 10 frozen spike + 16 Foundry tests (256 fuzz runs), typecheck, core ESM/subpaths, production build, HTTP smoke and all five live report comparisons pass. Live contract verifier confirms unchanged source/compiler/executable/immutables/getters. Audit is clear after sharp 0.35.5/source-map-js 1.2.2 updates. Browser Cua initialization failed, so focus/mobile/download interaction still needs rehearsal.

## Next action

For a separately authorized release, inspect effective server RPC settings/responses without leaking credentials, deploy the reviewed source to the already approved Vercel project/team and verify all five public live reports plus browser flows. **Do not deploy as part of the October 7 maintenance task.** No new mainnet transaction is needed. Deployment alone is not proof the provider issue is resolved.

Owner application submission status is unknown. The form screenshots in chat do not establish a completed submission. Owner reviews final terms/declarations and submits personally; resolve current production behavior before claiming newly verified eligibility.

## Preserve these facts

- [Mainnet evidence](mainnet-evidence.md), contracts/deployments/5042.json and vectors/owner hold the deployed Lab and five actual owner demos. Do not repeat wallet setup/deployment or ask for the five hashes.
- ERC-20 needs_review is correct. Receipt success differs from evidence completeness. Failed receipt may have verified analysis. Gross sums count hops; gas is separate.
- Deployed source retains an old pending comment intentionally; current manifest/docs supersede it. Do not break the source hash to edit wording. Bytecode comparison excludes CBOR metadata and is not an explorer verification badge/security audit.
- Three homepage snapshots are third-party evidence. Extra contract scenarios, memo decoding and npm publication are not certified complete.
- Logo must match the site's two-ellipse identity: [brand exports](../assets/brand/README.md). Use square avatar PNG for forms; rejected M-logo remains ignored.
- [Video script](video-demo-script.vi.md): five minutes, five demos plus three tools; English narration and Vietnamese directions.
- MIT, public profile aquattdabackup and no prior Circle/Arc funding already confirmed. Signing remains local to the owner.

## Operation

Use Node22+ and npm.cmd on Windows. Local Foundry/Gitleaks tools are in .local-tools. Shell sandbox startup fails; authorized elevated executions succeeded. Cua browser sandbox remains unavailable. No services are intentionally left running after review.

Public GitHub is canonical. Ignored artifacts/ArcMirror-handoff.bundle is refreshed from main and verified after final push; it excludes temporary artifacts, address mapping and secrets. Never force-push published history. Exact checks, caveats, commits and next steps are in task_on_progress.md.
