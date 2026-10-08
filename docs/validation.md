# Validation record

## Program review and security patch — October 8, 2026

See the [current review](grant-review-2026-10-08.md) and [structured evidence](evidence/grant-review/2026-10-08.json). Fresh production checks reproduced all five owner reports and one additional transaction outside saved examples; native movement and fee were checked against its receipt. All 18 actual Chromium desktop/mobile-emulation tests passed before and after the patch release. Public repository/profile checks passed; the owner confirmed no submission yet.

The documented deployment verifier initially crashed on a null primary receipt while dRPC verified the deployed contracts. Commit `c736b5d` adds complete-pair provider fallback and six regressions. Captured and default live verification now pass, including both executable bytecodes, immutables and getters; no explorer badge is claimed.

CI at `c736b5d` exposed a production audit failure for Next 16.3.6 (six advisories, aggregate High). Commit `bb50586` pins 16.3.8 and matching Next components. Local types/build/component tests and zero-finding audit pass. [CI run 37729334260](https://github.com/aquattdabackup/ArcMirror/actions/runs/37729334260) passes application and contract jobs: 78 application tests, 10 spike, 16 Foundry (256 fuzz runs) and 16 deterministic browser tests. No exploit was demonstrated; the image-optimization High advisory's remote-image configuration is absent in this app.

Source `bb50586856ac26d6de0998a45c194d3e8e6c92a8` is now production deployment `dpl_4cEZsMCAP8KcA9YbMDG9fB9K3pqk`, READY. Post-release public smoke, all five full live-report comparisons and 18 production browser cases pass. The initial CLI create request returned Not authorized; read-only identity/team/project checks worked and an unchanged authorized retry succeeded. No credentials/permissions changed. No blockchain write occurred.

## Verified production release — October 7, 2026

The owner authorized completing the release after the initial maintenance-only review. Application source `afa0396` is deployed as `dpl_9R9quumt8kbXozD8ZNWXQcV6EciT` at https://arcmirror-six.vercel.app. See [release details](releases/2026-10-07.md) and [structured evidence](evidence/releases/2026-10-07/checks.json).

All five owner reports fetched through the final production API returned HTTP 200, `source: live`, and complete equality with the recorded owner reports at 11:42 UTC. Safe Vercel logs identify incomplete primary-provider transaction/receipt pairs and successful dRPC fallback. There are no production RPC environment overrides. The upstream provider's internal cause is unknown; the application-level handling and recovery are verified.

Actual Chromium desktop/mobile-emulation checks on the final public deployment: **18 passed**, with zero failures, retries or skipped cases. They cover keyboard focus/navigation, sticky header and width, CSV/JSON uploads, disk downloads, all three tools, simulated-outage handling, and real owner native re-verification without interception. Mobile emulation is not physical-device or screen-reader certification. The public HTTP smoke passed after this final deployment.

Both jobs in [CI run 37615707125](https://github.com/aquattdabackup/ArcMirror/actions/runs/37615707125) passed at the deployed source: 72 application tests, 10 spike tests, 16 Foundry tests (256 fuzz runs), types, build, zero production dependency audit findings and 16 deterministic browser cases. [Testing instructions](testing.md) explain the separate live checks. No new blockchain transaction was sent. These results supersede the production failures and unavailable-browser/CI statuses at the earlier checkpoint below.

## Historical maintenance-only checkpoint — October 7, 2026

The paragraphs in this subsection retain the earlier, pre-release results. Their undeployed/blocked statuses were resolved by the verified release above.

Repository maintenance only; no production deployment or blockchain writes. [Review](maintenance-review-2026-10-07.md) and [structured results](evidence/maintenance/2026-10-07.json) distinguish fixed defects, live observations and remaining limits.

Baseline 60 application tests passed. Final checks: 70 application tests (63 core/RPC/CLI + 7 rendered components), 10 frozen spike checks and 16 Foundry tests with 256 fuzz runs passed. Root/web typecheck, core ESM/subpath imports, Next.js production build, native sharp PNG smoke and local production HTTP/API smoke passed. Regressions reproduced optional-block receipt loss, incomplete-provider lookup and CLI missing-argument behavior before fixes; shared-deadline checks cover cancellation and evidence preservation.

Five owner reports fetched live through the updated local API deep-match their expected reports. Both public RPC endpoints returned chain 5042; the read-only contract verifier matched source/compiler, deployment receipt, executable bytecode and immutable values/getters. Core report schema, digest algorithm, fixtures and deployed source were unchanged.

**Production did not pass the new live lookup checks:** native and batch hashes returned HTTP 404 / `not_found` despite confirmed direct RPC evidence and successful updated local results. The older production title remains visible. Current patches, including sharp 0.35.5/source-map-js 1.2.2, have not been deployed; a later authorized release must inspect effective server RPC configuration and recheck all five reports. The new local audit reports zero production dependency findings after removing two High advisories; old passing audits below are historical.

Cua failed during Windows sandbox initialization, so no new browser/mobile/focus/download validation is claimed. Rendered tabs and HTTP panel markup were checked; a helper's incorrect title expectation was corrected to target the homepage. Relative Markdown links and staged/full-history Gitleaks scans passed before publication. Temporary command logs are ignored under `artifacts/maintenance`. No lint script or CI workflow exists; no performance benchmark or independent audit was performed.

## Earlier mainnet checkpoint — September 30, 2026

Lab is deployed and all five owner-created demo categories have actual receipts. [Evidence and reproduction](mainnet-evidence.md). The dated results below are historical; consult the latest verified release at the top of this file for current production checks.

Checked on **2026-09-25**. The first table records local implementation checks. Public production verification is recorded separately below. No funds moved or wallet signatures were requested.

| Check | Actual result | Evidence |
| --- | --- | --- |
| Analyzer / golden vectors / RPC adapter | 37 passed, 0 failed | [output](evidence/validation/core-tests.txt) |
| Read-only spike evidence | 10 passed, 0 failed | [output](evidence/validation/spike-tests.txt) |
| ArcMirrorLab Foundry tests | 16 passed, 0 failed; included 256 fuzz runs | [output](evidence/validation/contract-tests.txt) |
| Standalone core + Next.js production build | Passed | [output](evidence/validation/build.txt) |
| TypeScript | Passed | [output](evidence/validation/typecheck.txt) |
| Independent core package | Compiled ESM imported through `@arcmirror/core`, digest matched fixture. `npm pack --dry-run` originally contained 6 files; the approved MIT license milestone now contains 7, including LICENSE. Metadata and private-package guards passed; no publication. | `packages/core/package.json` |
| Local production API smoke | Health, 3 snapshots, malformed hash400, unknown hash404, CSP/nosniff passed | [output](evidence/validation/api-smoke.txt) |
| Live CLI comparison with actual browser-generated JSON | ERC-20 example digest and complete report matched freshly fetched public mainnet evidence | [output](evidence/validation/live-verify.txt) |
| Production dependency audit | 0 reported vulnerabilities | [npm result](evidence/validation/dependency-audit.json) |
| Source publication scan | Gitleaks: no leaks in Git-visible source files | [result](evidence/validation/gitleaks-publication.json) |
| Exact staged-source scan | Gitleaks: no leaks before commit | [result](evidence/validation/gitleaks-staged.json) |
| Full pre-push Git history scan | Gitleaks: no leaks in both the initial and implementation commits | [result](evidence/validation/gitleaks-history.json) |

## Local browser checks

Used agent-browser 0.38.1 with Chromium 154 against `next start` at `http://127.0.0.1:3000`, without an account or wallet. Desktop tested at 1440px (transaction screenshot also at 1262px), mobile at 390px. These are viewport emulations, not physical iOS/Android devices.

- Home, report and methodology pages rendered; inspected [desktop home](images/home-desktop.png), [mobile home](images/home-mobile.png), [desktop report](images/tx-desktop.png), [mobile report](images/tx-mobile.png), [mobile methodology](images/how-mobile.png).
- Invalid input displayed the full-hash guidance. A valid native hash navigated to a **Verified** report.
- Movement expansion exposed exact amounts and original logs. Source-log expansion showed 8 raw logs for the ERC-20 example.
- Balance proof displayed exact raw expected/observed values and zero residuals for the captured ERC-20 case, while its overall grade correctly remained **needs_review**.
- Double-count toggle displayed 8.999998 versus 4.499999 USDC.
- Re-verify live returned the same digest from public RPC. No horizontal document overflow at 1440px or390px; browser console/page error lists were empty for the normal application flow.
- Copy-link action was exercised; automated clipboard reading was denied by the browser. Clipboard contents are therefore not independently certified by this run.

### Export validation limitation

The download button generated an 8190-byte `application/json` Blob. The actual Blob payload was observed in the browser, saved by the test harness, and deep-compared with the entire expected vector; the live CLI independently reproduced its digest. This validates report generation, not a successful browser file save.

Chromium's download helper and a normal download click both reported **Failed - Download error** on this Windows test surface. An unrelated local JSON test download failed as well; disabling Blob revocation did not resolve it. Browser lifecycle/path handling was also isolated during investigation. The cached Chromium file-write cause remains unconfirmed; an ordinary production download later succeeded in installed Edge, as recorded below. No product workaround or fake download pass has been claimed. The public-production file-save check is now complete. No product code workaround was needed.

## Security scan scope

The first broad directory scan included ignored generated Next.js preview/action keys and downloaded tool documentation examples (8 findings). These were inspected as generated/tool files, not application credentials. The publication scan used the exact Git-visible source list, excluding ignored `.next`, `.local-tools`, real env files and artifacts; it returned no findings. Do not publish build caches or tool directories. The exact staged source and complete history including implementation commit `dc8035c` were subsequently scanned without findings. Repeat these checks for later milestone changes before pushing.

The dependency scan and tests are not a security audit. Rate limits/cache are per process, CSP permits inline bootstrap/styles, public providers can throttle, and no independent provider consensus or full historical coverage is claimed.

## Public production verification

Production URL: https://arcmirror-six.vercel.app. [Deployment record](evidence/production/deployment.json), [API smoke](evidence/production/api-smoke.txt), [browser record](evidence/production/browser-checks.json). Tested without Vercel/app authentication; no wallet was connected.

- Edge 154 desktop 1440x1000 and mobile viewport 390x844: home, all three examples, methodology, invalid hash guidance, valid native search and unknown-hash page passed. Clean InPrivate session with extensions disabled had no application page errors/console output on normal routes.
- ERC-20 flow expansion exposed paired original logs, all 8 source logs rendered, balance residuals were zero, comparison showed 8.999998 versus 4.499999 USDC. Evidence remained Needs Review. Re-verify live returned the same digest.
- Native report was Verified; [fresh production live API](evidence/production/live-native.json) matched the entire vector. Dust exposed raw 1 at 18 decimals without an invented interface log.
- Ordinary Download JSON click saved an 8190-byte file to Windows Downloads. The [unchanged downloaded report](evidence/production/downloaded-report.json) matched the complete vector and a new mainnet fetch through the CLI: [live verifier output](evidence/production/live-verify.txt).
- Visually inspected [desktop home](evidence/production/home-desktop.png), [mobile home](evidence/production/home-mobile.png), [desktop report](evidence/production/report-desktop.png), [mobile report](evidence/production/report-mobile.png), [mobile methodology](evidence/production/how-mobile.png). No horizontal document overflow in tested views. Viewports are emulated, not physical devices.
- Blockscout loaded the correct mainnet transaction, Success, block 22533201 and matching fee. ArcScan's canonical link reached a Cloudflare challenge; its transaction contents were not certified. Copy link reported success; clipboard read permission remained denied.
- GitHub REST returned public repository, main branch and MIT license; the approved builder profile returned 200. MIT package dry-run/metadata checks passed. Staged and full-history secret scans passed before license commit 272baa9 was pushed.

## Historical pending items (2026-09-25; superseded below)

At this historical checkpoint funding, signing, Lab deployment and five scenarios were unfinished. Deployment and all five demos are now complete; see [September 30 evidence](mainnet-evidence.md). Explorer verification and final owner submission remain separate statuses. ArcScan content and clipboard read remain subject to the above external limits. Standard EVM contract tests do not validate Arc-specific shared-balance behavior.

## Readiness recheck before owner funding

At 2026-09-25T14:16:25Z, [fresh production checks](evidence/production/readiness-recheck.json) passed: home, methodology and native report returned HTTP 200; the API smoke passed health, three snapshots, malformed/unknown hashes and security headers. Both native and ERC-20 live reports matched their entire golden vectors, not only their digests. The native grade remained Verified; the ERC-20 grade remained Needs Review for unsupported call-value coverage.

No blocking failure was observed in these checks. This supports proceeding with a bounded demo stage; it does not establish sustained uptime, high-load capacity, all-transaction coverage or independent contract security. At that checkpoint Lab deployment and owner-created transaction results had not yet been tested; the September 30 evidence below supersedes this status. Existing limits include per-instance rate controls, public RPC availability, the ArcScan challenge and unverified clipboard contents. No runtime code changed, so previously passing unrelated tests/build were not repeated.

## Payment reconciliation milestone (2026-09-25)

44 application tests passed, including canonical duplicate suppression, repeated expectations, exact-match priority, payer/recipient mismatch, one-wei difference, invalid/oversized CSV and failed/incomplete/wrong-chain rejection. Production build and independent ESM subpath import passed. Local Edge desktop/mobile sample and file-upload mismatch flows passed with no application console errors, framework overlay or page overflow. This does not describe a new production deployment.

## Report inspector and Dust Lab (2026-09-26)

49 application tests passed. Strict report import rejects malformed/oversized data, unsafe numeric fields, unknown fields, wrong chain and unsupported schema. Tampering fails the old digest; a deliberately rehashed fabricated report passes integrity, documenting why integrity is not authenticity. Field comparison identifies nested changes and caps output at 200 fields. Existing golden vectors remain unchanged. Typecheck, production build, standalone ESM inspector import and extended local API/page smoke passed.

Local Edge browser checks: file A vs modified B identified `/evidenceLevel` and invalid digest; identical files and A vs fresh mainnet RPC showed full equality. Invalid JSON removed the stale comparison. Dust presets preserved 1 raw native unit, exact accumulation for 1,000 repetitions, and zero remainder for 1,000,000 micro-USDC movements; a fractional repeat count was rejected. CSV duplicate input matched one of two expectations, with source log 5 consumed once. All three actual JSON downloads were read from disk and validated. Browser application errors/console were empty. Desktop and mobile screenshots are in ignored `artifacts/tools-check`; these checks are local, not a claim that new routes are deployed.

React review: interactive file/arithmetic components are client boundaries; routes/metadata remain server components. Local files never enter a server action or API body. Inputs have labels and alerts, request/file controls disable while busy, source changes clear stale results, report grades are preserved. Existing analyzer schema and algorithm version are unchanged. Two small copy/input-bound adjustments followed browser inspection; final deployment will build and recheck them.

## Workbench production release (2026-09-26)

The current production release is the 2026-09-27 product-focus correction below. This workbench section records the earlier release.

Commit `aebf0c6` was deployed as `dpl_5grr6VLEgkj31Kovwz7fw3aWUXaV` and aliased to https://arcmirror-six.vercel.app. Remote build/TypeScript passed; install audit reported zero vulnerabilities. Extended anonymous smoke passed all four tool pages, API snapshots and negative cases/security headers. Public browser CSV reconciliation, tampered-report detection, fresh-RPC equality and one-unit dust arithmetic passed. Inspector and Dust Lab had no horizontal overflow at 390px and no framework overlays; application errors/console were empty. See [structured checks](evidence/tools/checks.json), [deployment](evidence/tools/deployment.json) and screenshots in the same directory. Actual export files prefixed `local-` were validated on the local production build, not claimed as new public downloads.

## Product-focus correction (2026-09-27)

Source `229ba77` is live as `dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC`, READY; Vercel inspect reports a 27-second build. The primary route now explains receipt outcome, exact amounts and separate gas before technical details, and links the money trail, double-count comparison and sharing workflow. Optional tools explain who needs them and what their results do and do not establish. The [requirements review](product-review.md) records why passing technical tests had not established usefulness.

All 49 existing application tests plus 6 report-guide checks passed. The new checks cover exact dust, evidence incompleteness, failed/unconfirmed states and successful calls without movement evidence. Typecheck and local/remote builds passed. The production smoke originally expected old headings; after correcting those expectations, all API/page checks passed. No core algorithm/schema or contract logic changed.

Production browser verification followed the native example from home to the exact amount's log, opened the ERC-20 comparison (8.999998 versus 4.499999, still Needs Review), and carried that hash into reconciliation. Custom Dust Lab inputs 0.0000009 x10 returned exact0.000009 against truncated0. Mobile pages had no horizontal overflow; the guide remained below the sticky header. Page/console errors and the post-check Vercel error-level query were empty. See [full checks](evidence/product-focus/checks.json), [production home](evidence/product-focus/home-desktop.png) and [mobile explanation](evidence/product-focus/guide-mobile.png).

This validates the revised implementation, not audience demand or owner comprehension. The owner still needs to try the new short walkthrough. At the time of this product-focus release funding/signing and the owner demos were deferred. Deployment and the five demos were subsequently completed; memo remains outside the delivered scope.

## Owner mainnet completion (2026-09-30)

[Structured checks](evidence/mainnet/checks.json) record five full production live reports matching local analysis of fresh RPC bundles. Primary/dRPC receipt block hashes, statuses and logs matched for each. Four demos succeeded; the fifth mined with status 0 and call-trace output 0xdaf7d1b0 (IntentionalFailure), with nonzero gas and no settled movement. ERC-20 retains Needs Review.

Both Lab and Forwarder runtime executable code and every immutable value match the pinned source/compiler; the [verifier](../scripts/verify-deployment.mjs) passed captured-evidence and live modes. Solidity CBOR metadata is excluded. ArcScan still displayed Verify and Publish; no explorer verification badge or security audit is claimed. Contract balances were zero at the captured check.

60 application tests passed (54 core/vector/RPC/tool tests including five new owner vectors, plus six report-guide checks); root/web typecheck passed. Public smoke passed chain-5042 health, all three unchanged third-party snapshots, invalid/unknown hashes, security headers and four tool pages. This round checked HTTP/API/RPC, not a new browser visual session. No application/contract execution code changed, so application build and unchanged Foundry tests were not rerun. forge build accepted the unchanged cache (compilation skipped, existing lint warnings); the sandbox initially failed home-directory lookup, and the authorized retry succeeded. tsx tests likewise required the authorized outside-sandbox retry after a userInfo error. Neither failure was an application failure.

Staged files and full Git history are secret-scanned before publication. Reward-wallet mapping and unrelated wallet transactions are excluded. No transaction was signed or broadcast by the agent; final grant submission remains with the owner.
