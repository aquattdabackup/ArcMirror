# Current task

Updated October 7, 2026. **Complete:** finish the deferred production RPC investigation, deploy the reviewed maintenance fixes, exercise real browser workflows, and add CI. The owner explicitly requested proceeding after the earlier maintenance-only instruction; that later request authorized the release. No wallet connection, signature, funds movement or new blockchain transaction occurred.

## Verified current state

- Production: https://arcmirror-six.vercel.app. Application source afa03968cab414c6b54b8af8b94cfa5cfa48c28f, deployment dpl_9R9quumt8kbXozD8ZNWXQcV6EciT, READY, existing approved arcmirror project/team. Later documentation commits do not change deployed application code.
- Read [release record](docs/releases/2026-10-07.md) and [compact evidence](docs/evidence/releases/2026-10-07/checks.json) first. They supersede the earlier production failure/browser blocker in the dated maintenance review; historical evidence is preserved.
- At 11:42 UTC / 18:42 Vietnam, all five owner production API requests returned HTTP 200, source live, and complete expected-report equality. Native, forwarding and batch verified; ERC-20 correctly needs_review; intentional failure confirmed_failed with verified analysis.
- No production environment overrides. Public primary+dRPC defaults are used and contacted providers must pass chain 5042 validation.
- Safe Vercel logs show primary RPC returning incomplete transaction/receipt pairs and dRPC returning complete pairs. Old adapter could stop early; deployed adapter continues fallback and keeps whole provider bundles. This verifies the application-level cause/recovery. Upstream internal infrastructure cause remains unknown, not claimed fixed by us.

## Changes and focused commits (pushed)

- Earlier maintenance changes 587bd48 through bb3f99c: preserve receipt on optional block failure, shared 45s RPC budget, incomplete-provider fallback, strict CLI parsing, keyboard tabs, shared browser-file helper, scoped UI claims and two dependency security patches. Baseline handoff 2ca3d22.
- d7293c4: sanitized provider-outcome diagnostics and regression tests; diagnostic callback failure cannot affect analysis.
- 25cc137: Playwright desktop/mobile flows, actual downloads/uploads and optional real owner live case.
- ea6b9ea: exclude tests/generated artifacts/CI from Vercel upload.
- 9ab920c: pinned, read-only GitHub Actions application/browser and Foundry jobs; no automatic deployment or wallet secrets.
- afa0396: replace stale homepage planned-demo wording with the completed owner-evidence link; final application release.
- d8427f4: testing/CI instructions. 230afb9: production/RPC/browser/CI evidence. 8035ed8: README/deployment/validation statuses reconciled.
- The subsequent small handoff commit updates architecture, this file and docs/HANDOFF.md. Resolve its exact hash with git log; never rewrite published history.

## Actual verification

- 72 application tests (65 core/RPC/CLI + 7 rendered components); 10 frozen spike checks; 16 Foundry tests including 256 fuzz runs passed. Types and production build passed locally/CI/Vercel.
- Final public production browser suite: 18 passed, zero failures/flakes/skips/retries. Actual Chromium 153.0.8010.12, Playwright 1.63.0, desktop and Pixel 7 viewport/touch emulation. Not physical-device or screen-reader certification.
- Covered tab arrows/wrap/Home/End/focus, sticky header, viewport width, real JSON disk downloads and uploads, CSV reconciliation/export, inspector tamper/digest comparison, dust arithmetic/validation, invalid/valid hash navigation and explicit simulated outage preserving the report. Live owner native re-verification/download in both projects used no interception.
- Final public HTTP smoke passed health, 3 snapshots, 4 tool pages, negative hashes and security headers. All five live owner reports passed separately. Final screenshots were visually inspected for desktop/mobile; final homepage stale copy absent.
- CI run 37615707125 at afa0396 passed application and contract jobs: https://github.com/aquattdabackup/ArcMirror/actions/runs/37615707125. CI runs 16 deterministic browser cases; the extra two live cases run during release checks.
- Production dependency audit: zero known findings after sharp 0.35.5/source-map-js 1.2.2 patches. Secret scans of staged changes/full Git history passed before milestone publication. Relative Markdown links checked. No independent security or performance audit.
- An initial local browser test matched both the app alert and Next route announcer; narrowed the test selector. Subsequent local affected tests, full CI and both complete production runs passed; no Dust product defect was found.
- Initial Cua initialization failed, but actual Chromium through Playwright completed all requested browser checks. No service intentionally remains running. Default shell sandbox fails helper_unknown_error; authorized elevated shell calls work. First approval-review quota failure cleared after owner resumed.

## Acceptance and remaining scope

No task blocker or required deployment/browser/CI work remains. Public providers can still throttle or omit data; dated checks are not an uptime guarantee. Unsupported precompile trace coverage remains needs_review. CI tests source but does not auto-deploy. No lint script exists; it was not required for this task.

Final grant submission status is unknown. Owner reviews form/terms and submits personally. npm publication and explorer source verification remain unclaimed and outside this release. No additional demo transaction is needed to replay existing evidence.

## Git state and exact next action

The only preserved pre-existing worktree change is LICENSE indentation; do not stage/revert it. Implementation and documentation milestones above are on origin/main. Final handoff publication must scan the staged files/history, commit/push, verify HEAD equals origin/main and refresh/verify ignored artifacts/ArcMirror-handoff.bundle. If reading this from the published handoff commit, those publication checks were completed; independently run git status and git log before new work.

There is no unfinished implementation to restart. Next agent: read AGENTS.md, architecture.md, docs/HANDOFF.md and this release record, inspect current Git state, then act on the owner's next request. Repeat live checks only for a new release, failure or current-status request. Do not redeploy unchanged source or rerun the five paid demos merely to resume.

## Durable references

- Public repository: https://github.com/aquattdabackup/ArcMirror. Lab/Forwarder manifest: contracts/deployments/5042.json; verification: scripts/verify-deployment.mjs. Five owner hashes/evidence: docs/mainnet-evidence.md and vectors/owner.
- Three homepage snapshots are third-party examples. Native 18-decimal and interface 6-decimal logs describe one balance; preserve exact one-to-one pairing, gas separation and gross-hop semantics.
- Never edit pinned deployed Solidity just to remove its historical pending comment. Executable matching excludes CBOR metadata and is not an explorer badge.
- Owner approved MIT, aquattdabackup profile and no prior Circle/Arc funding. English product/docs, Vietnamese updates; focused commits/pushes and handoff required. Signing stays owner-local.
- Website two-ellipse logo retained; form avatar assets/brand/arcmirror-avatar.png. Five-minute English narration/Vietnamese directions: docs/video-demo-script.vi.md.
- GitHub is canonical. The ignored Git bundle excludes credentials, ignored address mapping, temporary evidence and downloaded tools.
