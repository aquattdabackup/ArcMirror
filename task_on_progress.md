# Current task

Updated 2026-09-30. Owner supplied the Microgrants rules and requested a thorough eligibility review. Completed docs/eligibility-review-2026-09-30.md with structured evidence in docs/evidence/eligibility-review/2026-09-30.json. Fresh production/API/RPC and public-source checks found no unresolved technical entry blocker; the actual DoraHacks form, owner declarations and submission remain open. Small documentation accuracy issues were corrected. No application/contract execution change or redeployment. Do not repeat funding or transactions.

## Verified state and entry points

- Public app: https://arcmirror-six.vercel.app; public repo: https://github.com/aquattdabackup/ArcMirror. Chain 5042, official primary + dRPC. App source is unchanged since recorded UI release 229ba77 / dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC. No UI redeployment was needed for this evidence/docs release.
- Lab address, Forwarder, deployment hash/block, source/compiler identity and executable/immutable verification: contracts/deployments/5042.json, 5042.rpc.json, scripts/verify-deployment.mjs.
- Current human-readable proof: docs/mainnet-evidence.md. Exact five hashes, dates, outcome, fee, report links and production/RPC comparison results: docs/evidence/mainnet/checks.json. Raw bundles + expected reports: vectors/owner. Standalone JSON: docs/evidence/mainnet/*.report.json.
- Native, ERC-20, forwarding and batch have successful receipts. Intentional failure has mined receipt status 0 and call-trace output 0xdaf7d1b0, matching IntentionalFailure(), not out-of-gas. No settled movements; gas is charged.
- ERC-20 retains Needs Review for unsupported precompile call-value coverage. Forwarding gross 0.003 represents three hops of 0.001; batch gross 0.006 includes 0.003 funding and 0.003 payouts. Total five-demo principal 0.006 USDC; five-demo gas 0.0044259685, deployment gas 0.017185294 separately.
- Three homepage snapshots remain labelled third-party examples; owner demos are linked from public README and application draft. No fake ownership claim or unrelated wallet transfer is used as a demo.

## Checks actually completed

Latest eligibility review (network observations began 2026-09-30T12:26:10Z): 14 structured checks passed; all five production live reports deep-match local owner-vector analysis and receipt statuses/logs/block hashes match on primary and dRPC. Both RPCs returned 5042. Lab/Forwarder code hashes agree on both endpoints, and the live source/compiler/bytecode/immutable verifier passed. All five ArcScan transaction links returned HTTP 200 with the requested hashes. Public GitHub tree matched all 164 tracked blobs at baseline 9797ac0; five critical raw documents matched too; public MIT/profile confirmed. Production HTTP smoke passed. Fresh tests: 60 application, 10 historical spike and 16 Foundry (256 fuzz runs); root/web typecheck passed; npm audit --omit=dev reported zero known vulnerabilities. All 121 relative targets in 26 existing Markdown files resolved; 28 links in the new/updated review documents checked separately. No build rerun for documentation-only work.

Review limits: Cua kernel failed sandbox setup twice, so no new visual/click/download session was possible. Elevated read-only shell checks succeeded after sandbox setup errors. Encrypted Vercel environment values were not reread; official source defaults and effective chain-5042 production results were verified. DoraHacks returned HTTP 405 / Human Verification; no form fields, personal eligibility, screening or submission certified. ArcScan source badge remains unclaimed. The historical pending comment at contracts/src/ArcMirrorLab.sol:10 is explicitly superseded by current contract README/manifest/evidence; preserve pinned deployed source.

The earlier deployment milestone also established:

- Both RPCs return chain 5042 and same Lab runtime hash. Compiled executable bytecode of Lab and Forwarder matches with every immutable checked; source hash equals compiled metadata. Captured and live verifier modes pass. Metadata is excluded; no explorer source verification badge claimed. Source is deliberately preserved unchanged, including its historical pre-deployment comment, which current documentation explicitly supersedes.
- Each complete production live report deep-matches local analysis; primary/dRPC receipt statuses, block hashes and logs match for all five.
- npm.cmd test: 60 passing (54 core/vector/RPC/tool including five owner cases, 6 report-guide). npm.cmd run typecheck: root/web pass. Public scripts/smoke.mjs passes health, snapshots, invalid/unknown hashes, headers and four tools.
- forge build accepted unchanged cache (compilation skipped; existing lint warnings). No app/contract execution changes, so prior build/Foundry/spike checks were not repeated. This round is HTTP/API/RPC verification, not a new visual browser session.
- Sandbox home/userInfo errors affected Forge/tsx; authorized outside-sandbox retries succeeded. No active blocker. Staged files and full history passed gitleaks; relative Markdown links checked before publication.

## Commits and Git state

Deployment proof 03b0ec4; individual demo evidence 12064e1, 500360d, 4762823, 11e7047, 2bf5378; comparisons b406642; regressions ffff4f9; reviewer guide ce3db69. Separate README/contract/eligibility/application/runbook/validation corrections are in subsequent focused commits. All milestone pushes succeeded; consult git log and origin/main for the final handoff commit.

Recording script c10a887 and handoff 9797ac0 are pushed. docs/video-demo-script.vi.md has 496 English words, Vietnamese directions, five demos, three tools, 4:50 content plus ten seconds buffer. Timeline, links, CSV 2/2 matches with one funding hop, Inspector digest and exact Dust arithmetic were checked locally. The first script push hit a review usage-limit failure; the owner's resumed request and retry succeeded. No video has been recorded by the agent.

Eligibility-review commits: b444f4b scopes the README tagline; e6dbf70 adds direct owner proof and current form/declaration checks to the draft; 6e00183 records fresh evidence; 34a32f6 publishes the review and eligibility link. All four are pushed. Staged scans and full-history Gitleaks passed through the 145-commit review milestone. Consult git log/origin for the subsequent memory commit. Architecture is unchanged.

Preserve the pre-existing LICENSE indentation edit; never include it in task commits. No task implementation is intentionally left uncommitted. Regenerate/verify ignored artifacts/ArcMirror-handoff.bundle from main after final push. GitHub is canonical; the bundle excludes ignored address-only files and credentials.

## Remaining work / exact next action

1. Read docs/eligibility-review-2026-09-30.md and the application draft. Technical mainnet proof is public and was rechecked. No missing technical prerequisite was identified. Do not ask for the five hashes again.
2. Exact next owner action: open the official DoraHacks form, complete Human Verification and review its real fields/terms. Enter the existing live/repo/profile links and separate reward address; confirm right to submit, one submission per project and other required declarations, then submit. Prior no-Circle/Arc-funding declaration is already recorded. No submission has been made by the agent. Current deadline October 14, 2026 23:59 ET = October 15, 2026 10:59 Vietnam; recheck when submitting.
3. If recording, use docs/video-demo-script.vi.md, prepare tabs/CSV/downloaded batch JSON, rehearse and stay within five minutes. The public rules do not require a video; actual form-specific requirements remain uninspected. No extra signature is needed. A new browser rehearsal also covers the interactive check unavailable during this review.
4. Optional explorer source publication is not complete: ArcScan displayed Verify and Publish at the recorded check. Use exact deployed source/settings if pursuing it; never call executable comparison an explorer badge. Do not silently change pinned source for a status-comment edit. Memo, duplicate-transfer/dust contract probes, npm publication and security audit are not claimed complete.

## Persistent owner decisions

Read AGENTS.md. No prior Circle/Arc funding; MIT/profile aquattdabackup and existing Vercel project/team approved. English product/docs, Vietnamese updates. Small coherent commits and pushes; never force-push. Wallet signing stays local to owner. Reward mapping stays ignored; no secrets in source/chat. Final grant submission and npm publication remain owner actions. Original brief: docs/product-brief.vi.md. Do not restart completed features or equate technical checks with user adoption/usability acceptance.
