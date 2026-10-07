# Continue ArcMirror with another AI

## Paste into the next agent

> Read AGENTS.md, architecture.md and task_on_progress.md. October 7 maintenance AND the owner's follow-up production release are complete. Source afa0396 is deployed; all five owner live reports, 18 production browser cases and both CI jobs passed. Read docs/releases/2026-10-07.md for evidence, not the superseded maintenance-only status. Preserve the user's LICENSE edit, pinned Solidity and existing onchain evidence. Do not repeat paid demos or redeploy just to resume. Use focused verified commits/pushes and maintain handoff. Report in Vietnamese.

## Current state

Production: https://arcmirror-six.vercel.app. Deployment dpl_9R9quumt8kbXozD8ZNWXQcV6EciT, application source afa03968cab414c6b54b8af8b94cfa5cfa48c28f. Documentation commits followed; they do not change the deployed application. [Release record](releases/2026-10-07.md), [structured evidence](evidence/releases/2026-10-07/checks.json), [CI run](https://github.com/aquattdabackup/ArcMirror/actions/runs/37615707125).

The owner explicitly authorized proceeding after the initial review-only restriction. No blockchain write occurred. Vercel has no production environment overrides. Safe lookup logs showed primary RPC incomplete transaction/receipt pairs, followed by complete dRPC pairs; corrected fallback restores all five owner reports. The upstream provider's internal cause remains unknown. Old failure records are historical and explicitly superseded.

72 application + 10 spike + 16 Foundry tests (256 fuzz runs), types, builds and zero-finding production dependency audit pass. Hosted CI runs both application/browser and contract jobs. Final production: five real live reports match every expected field; 18 actual Chromium browser checks pass, including keyboard, sticky header, desktop/mobile-emulation widths, all three tools, uploads, disk downloads and unmocked owner re-verification. Mobile emulation is not physical-device/screen-reader certification.

Implementation/release commits d7293c4, 25cc137, ea6b9ea, 9ab920c and afa0396 are pushed. Testing/evidence/status docs: d8427f4, 230afb9 and 8035ed8. The later small memory commit includes this file; use git log for its hash. Only the user's pre-existing LICENSE indentation should remain dirty.

## Next action

No required work remains for this task. Inspect Git state and continue with the owner's next request. [Testing instructions](testing.md) describe local, CI and production checks; [deployment runbook](deployment.md) records the approved project and process. CI does not deploy automatically. Recheck only when new code, failure or a current-status request warrants it.

Owner grant submission status is unknown; screenshots do not prove submission. Owner reviews final terms/declarations and submits personally. npm publication and explorer source verification remain separate, unclaimed statuses. Existing mainnet demonstrations require no further gas to replay.

## Preserve these facts

- [Mainnet evidence](mainnet-evidence.md), contracts/deployments/5042.json and vectors/owner hold the deployed Lab/Forwarder and five owner demos. Never invent or repeat them just for setup.
- ERC-20 needs_review is correct. Receipt outcome differs from evidence completeness. A failed receipt can have verified analysis. Gross sums count hops; gas is separate.
- Three homepage snapshots are third-party evidence. Digest equality is not provider consensus or authenticity. Unsupported trace/history coverage and per-process limits remain explicit.
- Do not change deployed Solidity's historical comment: source identity is pinned. Bytecode matching excludes metadata and is not an explorer badge/security audit.
- Use the site's two-ellipse [brand exports](../assets/brand/README.md); [video script](video-demo-script.vi.md) is five minutes, five demos plus three tools.
- MIT, aquattdabackup builder profile and no prior Circle/Arc funding already confirmed. Signing stays local to the owner.

## Operation

Node22+ (Node24 for CI parity), npm.cmd on Windows. Foundry/Gitleaks binaries in .local-tools. Cua initialization failed; Playwright Chromium successfully supplied actual browser testing. Shell sandbox startup fails; authorized elevated calls worked. No service intentionally remains running.

GitHub is canonical. Ignored artifacts/ArcMirror-handoff.bundle is refreshed and verified after final push; it excludes ignored temporary files, credentials and address mapping. Never force-push or discard the user's LICENSE edit. Current checks and exact next actions are in task_on_progress.md.
