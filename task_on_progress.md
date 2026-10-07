# Current task

Updated 2026-10-07. Completed the owner's targeted maintenance review and English README rewrite. The owner explicitly forbids production deployment and real blockchain transactions during this review. No deployment, environment mutation, wallet signature or blockchain write was performed.

## Start with these findings

- Read [maintenance review](docs/maintenance-review-2026-10-07.md) and [structured evidence](docs/evidence/maintenance/2026-10-07.json). They distinguish confirmed defects, fixes, unverified risks and optional work.
- **Production is currently unresolved:** at 2026-10-07T05:19:30Z, live native and batch API requests returned HTTP 404/not_found for confirmed owner transactions. Earlier local lookup also briefly lacked expected evidence. Both direct RPC endpoints returned chain 5042 and confirmed transaction/receipt data. The updated local server reproduced every field of all five owner reports. Exact Vercel-side upstream/configuration cause was not established.
- Latest repository code has not been deployed. Last recorded production source remains 229ba77 / dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC; production still displays the old “Every trace accounted for” title. Do not call the September 30 all-pass eligibility review a current production certification.
- Local dependency audit found two High advisories; targeted lockfile patches sharp 0.35.4 → 0.35.5 and source-map-js 1.2.1 → 1.2.2 now pass audit. Production patches are not claimed installed.

## Completed milestones, committed and pushed

- 587bd48: retain transaction/receipt when optional block metadata fails; regression reproduces original failure.
- 774b149: share a 45-second abort budget across RPC fallbacks/traces, retaining 6.5-second per-request timeout and acquired evidence.
- 5417f73: strict CLI arguments before IO; missing --report no longer silently exits successfully. Parser/process regressions included in npm test.
- e104505: keyboard/ARIA evidence tabs and labelled panel; rendered markup regression.
- 85e5974: move components/tools/files.ts to lib/browser-files.ts and reuse JSON export in the report.
- f73747c: patch vulnerable transitive dependencies, including matching sharp native bundles.
- d15af22: scope UI metadata/footer to supported evidence.
- dbbdc64: incomplete/null provider results try fallback; retain the most complete whole bundle, never mix provider transaction/receipt pairs.
- 7c22c2f: publish detailed maintenance review and current local/production observations.
- c72c477: rewrite README and add documentation index.
- bb3f99c: update validation/deployment records with current production failures and undeployed fixes.
- Final memory commit updates this file, architecture and HANDOFF; consult git log and origin/main for its actual hash. No history rewriting.

## Actual checks this review

- Baseline 60 application tests; final 70 pass (63 core/RPC/CLI + 7 rendered web components).
- 10 frozen spike tests; 16 Foundry tests with 256 fuzz runs pass. Deployed Solidity unchanged.
- Root/web typecheck, Next production build, standalone core and all three ESM subpath imports, native sharp PNG smoke pass.
- Local production server on 127.0.0.1:3100: HTTP smoke passed; five live owner reports deep-match fixtures. ERC-20 stays needs_review; intentional failure stays confirmed_failed with verified evidence. Local server was stopped after checks.
- Both public RPCs returned 5042. Live contract verifier passed source/compiler, deployment receipt, executable bytecode, immutables and getters. CBOR metadata excluded; no explorer verification badge.
- Production native/batch live lookups failed as described above. No all-five production success is claimed for October 7.
- Cua failed Windows sandbox initialization; no fresh visual/mobile/focus/download/screen-reader test. Static tabs and HTTP panel markup pass. A helper incorrectly expected the default homepage title on a transaction route; corrected the check scope without changing runtime.
- Post-update npm audit --omit=dev: zero known findings. Staged/full-history Gitleaks scans passed before milestone publication. Relative Markdown targets checked; final link/Git/bundle verification accompanies the memory commit.
- Temporary command logs/helpers: ignored artifacts/maintenance. Public compact results: docs/evidence/maintenance/2026-10-07.json.
- Sandbox shell startup fails with helper_unknown_error; authorized elevated shell retries work. Computer-use remains unavailable. No lint command/CI exists.

## Cleanup and preserved user state

Only moved the browser file helper and removed its duplicate implementation from report.tsx. README rewritten in place; no historical Markdown, fixture, screenshot, evidence, contract or legal file deleted. Preserve the pre-existing LICENSE indentation edit; never stage/revert it. Do not modify deployed Solidity just to remove its old pending comment: the source hash is pinned and current manifest/docs supersede the comment.

## Exact next action and remaining scope

The review is complete. A later, separately authorized production release should include the current lockfile/RPC fixes, inspect effective Vercel RPC configuration/responses without printing secrets, then recheck all five live owner reports and browser workflows. Do not assume deployment alone resolves an unidentified provider/configuration issue. Do not deploy under the October 7 review instruction. Optional future work: CI for existing commands and browser interaction tests; no architecture rewrite needed.

For grant preparation, owner reviews actual form/terms and submits personally; submission status is unknown. No additional demo transaction is necessary to replay existing evidence. Current production failures must be resolved/verified before making fresh eligibility claims.

## Durable project context

- Public source: https://github.com/aquattdabackup/ArcMirror; app: https://arcmirror-six.vercel.app. Chain 5042, public primary+dRPC defaults; analyzer is read-only.
- Lab and Forwarder deployed; manifest/raw evidence in contracts/deployments, verifier scripts/verify-deployment.mjs. All five owner hashes/proof: docs/mainnet-evidence.md, docs/evidence/mainnet/checks.json, vectors/owner.
- Original three homepage snapshots are third-party examples. Never pass them off as owner demos.
- Native/18-decimal and interface/6-decimal logs describe one balance. Preserve one-to-one pairing, exact amounts, gas separation and precompile needs_review. Gross forwarding/batch amounts include hops.
- Owner chose existing two-ellipse website logo, not a replacement M mark. Use assets/brand/arcmirror-avatar.png for forms; transparent variants available.
- Five-minute recording script: docs/video-demo-script.vi.md, English narration/Vietnamese directions; no agent recording/submission.
- Read AGENTS.md for standing approvals: no prior Circle/Arc funding; MIT and aquattdabackup profile approved. English product/docs, Vietnamese updates, focused commits/pushes and portable handoff. Final submission/npm publication remain owner actions.
- Regenerate/verify ignored artifacts/ArcMirror-handoff.bundle from main after final push. GitHub is canonical; credentials, ignored address mapping and temporary files are excluded.
