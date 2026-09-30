# Continue ArcMirror with another AI

## Paste into the next agent

> Continue ArcMirror in this repository. Read AGENTS.md, architecture.md, task_on_progress.md and this handoff first. Mainnet Lab deployment and all five owner demos are complete and publicly documented. Do not repeat wallet preparation or deployment. Read docs/mainnet-evidence.md and docs/evidence/mainnet/checks.json for exact evidence. Check Git status/origin, preserve LICENSE indentation, make small verified commits and push. Update memory before stopping. Report in Vietnamese. Never sign funds, invent verification badges or submit the grant on the owner's behalf.

## Current state: 2026-09-30

[Production](https://arcmirror-six.vercel.app), [public MIT source](https://github.com/aquattdabackup/ArcMirror), [mainnet proof](mainnet-evidence.md). The owner completed native, ERC-20, nativeForward, batch and a mined intentionalFailure. All five production live reports match captured RPC analysis; secondary receipts corroborate them. Deployment manifest and reproducible verifier live under contracts/deployments and scripts/verify-deployment.mjs. Tests: 60 pass; root/web typecheck passes; public API/page smoke passes.

The latest work publishes evidence, tests and documentation. It does not change app/contract execution code or require redeploy. Last recorded UI deployment is dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC from 229ba77. Existing report guides, reconciliation, Inspector, Dust Lab, readable text and sticky header are already delivered. Do not rebuild them.

The owner then requested a complete video script and chose five minutes. [Recording script](video-demo-script.vi.md), commit c10a887, is completed and pushed: introduction, mainnet proof, five owner demos, all three tools, closing, exact links and CSV. Vietnamese stage directions accompany 496 words of English narration. Timeline: 4:50 content + ten seconds of buffer. Local checks verify evidence values, CSV 2/2 matches with one unassigned funding hop, Inspector digest, Dust arithmetic and relative links. No new live/browser verification or video recording is claimed for this documentation task.

## Important distinctions

- ERC-20 Needs Review is correct; receipt success and evidence quality differ. A failed demo can have Verified evidence while its receipt is failed.
- Forwarding/batch totals include each hop and are not unique spend. See proof page for exact amounts/fees.
- Homepage snapshots remain third-party examples. Five owner vectors are separate in vectors/owner; reports/hashes are in docs/evidence/mainnet.
- ArcScan source verification is unclaimed. Both contract executable bytecodes and immutable values match the pinned source after excluding CBOR metadata. Deployed source is preserved; its old comment is explicitly historical. No audit or all-path coverage claimed.
- Standard local EVM mocks are not Arc simulators. Memo, extra contract scenarios and npm publication are not completed by this milestone.

## Exact next owner steps

Prepare the tabs and CSV from the [five-minute recording script](video-demo-script.vi.md), download the batch report, rehearse once with a timer, and record. No additional mainnet transaction is needed. Review [application draft](application-draft.md), enter the separate reward wallet in the form and submit after reviewing declarations/human verification. Official program deadline rechecked September 30: October 14, 2026 23:59 ET; recheck before submission. No final submission performed.

## Git and operation

All milestone changes are committed/pushed; consult git log for the final handoff hash. Only pre-existing LICENSE indentation should remain dirty. Ignored artifacts/ArcMirror-handoff.bundle is regenerated from main and verified after final push; GitHub is canonical. Reward/address mapping and old unsigned preparation stay in ignored artifacts, excluded from bundle. No secret material is needed by another AI to verify published results.

Use npm.cmd on Windows and Node22+. Local Foundry/Gitleaks tools are under .local-tools. Forge/tsx can fail home/userInfo lookup in the sandbox; authorized outside-sandbox retries worked. No app build or new visual browser run was claimed for these docs/tests changes. The latest live verifier, 60 tests, typecheck, smoke, staged/history secret scan and relative-link checks are recorded in task_on_progress.md and docs/validation.md.

Previous 55-commit retrospective workbench history reconstruction is documented in docs/commit-map.md; original ancestors are preserved. Do not rewrite published history. Existing aquattdabackup GitHub and Vercel arcmirror destination approvals persist; no need to ask again. No unrelated project/billing changes.
