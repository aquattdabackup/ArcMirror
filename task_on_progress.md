# Current task

Updated 2026-09-30. Owner requested a detailed recording script covering an introduction, all five demos and all three tools, and explicitly chose a five-minute limit. Completed docs/video-demo-script.vi.md: Vietnamese recording instructions, 496 words of English narration, 4:50 content plus ten seconds of buffer, exact owner hashes, CSV, expected results and public proof links. Script milestone c10a887 is pushed. Final recording/application review/submission remains with the owner. Do not repeat deployment, funding or transactions merely to record a video.

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

Recording script c10a887 was validated against existing source and captured owner evidence: all five status/amount/gas rows and deployment links match; relative links resolve; twelve contiguous time slots total 300 seconds; eleven narration blocks contain 496 words. Ran the actual core functions against the script CSV and batch report: 2/2 matched, 0 mismatches, 0 missing, 1 unassigned funding hop, matched total 0.003 USDC. Inspector accepted the batch report/digest; Dust inputs 0.0000009 x 10 yield exact/omitted 0.000009 and truncated total zero. These are local checks, not a new production/browser session or recording. No app code changed, so no build/full test rerun. The tsx attempt failed sandbox userInfo lookup; Node24 native TypeScript loading completed the checks without escalation. git diff --check and staged/full-history Gitleaks passed (140 commits before this handoff). The first push was not executed because automatic approval review hit a usage limit; after the owner asked to finish, the authorized retry pushed c10a887 successfully.

Preserve the pre-existing LICENSE indentation edit; never include it in task commits. No task implementation is intentionally left uncommitted. Regenerate/verify ignored artifacts/ArcMirror-handoff.bundle from main after final push. GitHub is canonical; the bundle excludes ignored address-only files and credentials.

## Remaining work / exact next action

1. Open the public README evidence links and review docs/application-draft.md. Technical mainnet proof is now public; do not ask for five hashes again locally.
2. Exact next action: open docs/video-demo-script.vi.md, prepare its tabs/CSV/downloaded batch JSON, then rehearse once with a timer and record within five minutes. It includes all five owner demos and all three tools. docs/mainnet-demo.md remains the historical execution runbook. No extra wallet signature is needed for this replay. The video has not been recorded by the agent.
3. Owner enters their separate reward address, reviews form-specific requirements/human verification and submits. Official page was rechecked September 30; deadline currently October 14, 2026 23:59 ET. No submission has been made by the agent.
4. Optional explorer source publication is not complete: ArcScan displayed Verify and Publish at the recorded check. Use exact deployed source/settings if pursuing it; never call executable comparison an explorer badge. Do not silently change pinned source for a status-comment edit. Memo, duplicate-transfer/dust contract probes, npm publication and security audit are not claimed complete.

## Persistent owner decisions

Read AGENTS.md. No prior Circle/Arc funding; MIT/profile aquattdabackup and existing Vercel project/team approved. English product/docs, Vietnamese updates. Small coherent commits and pushes; never force-push. Wallet signing stays local to owner. Reward mapping stays ignored; no secrets in source/chat. Final grant submission and npm publication remain owner actions. Original brief: docs/product-brief.vi.md. Do not restart completed features or equate technical checks with user adoption/usability acceptance.
