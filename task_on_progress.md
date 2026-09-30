# Current task

Updated 2026-09-30. Owner reported completing all five demos and asked what comes next. All five were independently found on Arc Mainnet and verified. Deployment/owner evidence, regression tests and public documentation are published; final owner application review/submission remains open. Do not repeat deployment, funding or transactions merely to record a video.

## Verified state and entry points

- Public app: https://arcmirror-six.vercel.app; public repo: https://github.com/aquattdabackup/ArcMirror. Chain 5042, official primary + dRPC. App source is unchanged since recorded UI release 229ba77 / dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC. No UI redeployment was needed for this evidence/docs release.
- Lab address, Forwarder, deployment hash/block, source/compiler identity and executable/immutable verification: contracts/deployments/5042.json, 5042.rpc.json, scripts/verify-deployment.mjs.
- Current human-readable proof: docs/mainnet-evidence.md. Exact five hashes, dates, outcome, fee, report links and production/RPC comparison results: docs/evidence/mainnet/checks.json. Raw bundles + expected reports: vectors/owner. Standalone JSON: docs/evidence/mainnet/*.report.json.
- Native, ERC-20, forwarding and batch have successful receipts. Intentional failure has mined receipt status 0 and call-trace output 0xdaf7d1b0, matching IntentionalFailure(), not out-of-gas. No settled movements; gas is charged.
- ERC-20 retains Needs Review for unsupported precompile call-value coverage. Forwarding gross 0.003 represents three hops of 0.001; batch gross 0.006 includes 0.003 funding and 0.003 payouts. Total five-demo principal 0.006 USDC; five-demo gas 0.0044259685, deployment gas 0.017185294 separately.
- Three homepage snapshots remain labelled third-party examples; owner demos are linked from public README and application draft. No fake ownership claim or unrelated wallet transfer is used as a demo.

## Checks actually completed

- Both RPCs return chain 5042 and same Lab runtime hash. Compiled executable bytecode of Lab and Forwarder matches with every immutable checked; source hash equals compiled metadata. Captured and live verifier modes pass. Metadata is excluded; no explorer source verification badge claimed. Source is deliberately preserved unchanged, including its historical pre-deployment comment, which current documentation explicitly supersedes.
- Each complete production live report deep-matches local analysis; primary/dRPC receipt statuses, block hashes and logs match for all five.
- npm.cmd test: 60 passing (54 core/vector/RPC/tool including five owner cases, 6 report-guide). npm.cmd run typecheck: root/web pass. Public scripts/smoke.mjs passes health, snapshots, invalid/unknown hashes, headers and four tools.
- forge build accepted unchanged cache (compilation skipped; existing lint warnings). No app/contract execution changes, so prior build/Foundry/spike checks were not repeated. This round is HTTP/API/RPC verification, not a new visual browser session.
- Sandbox home/userInfo errors affected Forge/tsx; authorized outside-sandbox retries succeeded. No active blocker. Staged files and full history passed gitleaks; relative Markdown links checked before publication.

## Commits and Git state

Deployment proof 03b0ec4; individual demo evidence 12064e1, 500360d, 4762823, 11e7047, 2bf5378; comparisons b406642; regressions ffff4f9; reviewer guide ce3db69. Separate README/contract/eligibility/application/runbook/validation corrections are in subsequent focused commits. All milestone pushes succeeded; consult git log and origin/main for the final handoff commit.

Preserve the pre-existing LICENSE indentation edit; never include it in task commits. No task implementation is intentionally left uncommitted. Regenerate/verify ignored artifacts/ArcMirror-handoff.bundle from main after final push. GitHub is canonical; the bundle excludes ignored address-only files and credentials.

## Remaining work / exact next action

1. Open the public README evidence links and review docs/application-draft.md. Technical mainnet proof is now public; do not ask for five hashes again locally.
2. Owner can replay recorded hashes using docs/mainnet-demo.md to record a video, if desired or required by the form. The official program page does not universally require a video. No extra wallet signature is needed for this replay.
3. Owner enters their separate reward address, reviews form-specific requirements/human verification and submits. Official page was rechecked September 30; deadline currently October 14, 2026 23:59 ET. No submission has been made by the agent.
4. Optional explorer source publication is not complete: ArcScan displayed Verify and Publish at the recorded check. Use exact deployed source/settings if pursuing it; never call executable comparison an explorer badge. Do not silently change pinned source for a status-comment edit. Memo, duplicate-transfer/dust contract probes, npm publication and security audit are not claimed complete.

## Persistent owner decisions

Read AGENTS.md. No prior Circle/Arc funding; MIT/profile aquattdabackup and existing Vercel project/team approved. English product/docs, Vietnamese updates. Small coherent commits and pushes; never force-push. Wallet signing stays local to owner. Reward mapping stays ignored; no secrets in source/chat. Final grant submission and npm publication remain owner actions. Original brief: docs/product-brief.vi.md. Do not restart completed features or equate technical checks with user adoption/usability acceptance.
