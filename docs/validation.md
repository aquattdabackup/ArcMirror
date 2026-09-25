# Validation record

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

## Still pending

Burner funding and owner-local signing (all four public addresses have been supplied); Lab deployment/source verification and five owner-created mainnet scenarios; final grant application review and owner submission. ArcScan content and clipboard read remain subject to the above external limits. Standard EVM contract tests do not validate Arc-specific shared-balance behavior.

## Readiness recheck before owner funding

At 2026-09-25T14:16:25Z, [fresh production checks](evidence/production/readiness-recheck.json) passed: home, methodology and native report returned HTTP 200; the API smoke passed health, three snapshots, malformed/unknown hashes and security headers. Both native and ERC-20 live reports matched their entire golden vectors, not only their digests. The native grade remained Verified; the ERC-20 grade remained Needs Review for unsupported call-value coverage.

No blocking failure was observed in these checks. This supports proceeding with a bounded demo stage; it does not establish sustained uptime, high-load capacity, all-transaction coverage or independent contract security. Mainnet Lab deployment, source verification and owner-created transaction results remain untested. Existing limits include per-instance rate controls, public RPC availability, the ArcScan challenge and unverified clipboard contents. No runtime code changed, so previously passing unrelated tests/build were not repeated.
