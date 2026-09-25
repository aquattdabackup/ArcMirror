# Validation record

Checked locally on **2026-09-25**. These are actual local build/RPC/browser checks, **not a production deployment smoke test**. No funds moved or wallet signatures were requested.

| Check | Actual result | Evidence |
| --- | --- | --- |
| Analyzer / golden vectors / RPC adapter | 37 passed, 0 failed | [output](evidence/validation/core-tests.txt) |
| Read-only spike evidence | 10 passed, 0 failed | [output](evidence/validation/spike-tests.txt) |
| ArcMirrorLab Foundry tests | 16 passed, 0 failed; included 256 fuzz runs | [output](evidence/validation/contract-tests.txt) |
| Standalone core + Next.js production build | Passed | [output](evidence/validation/build.txt) |
| TypeScript | Passed | [output](evidence/validation/typecheck.txt) |
| Independent core package | Compiled ESM imported through `@arcmirror/core`, digest matched fixture. `npm pack --dry-run` contained 6 intended files; no publication. | `packages/core/package.json` |
| Local production API smoke | Health, 3 snapshots, malformed hash400, unknown hash404, CSP/nosniff passed | [output](evidence/validation/api-smoke.txt) |
| Live CLI comparison with actual browser-generated JSON | ERC-20 example digest and complete report matched freshly fetched public mainnet evidence | [output](evidence/validation/live-verify.txt) |
| Production dependency audit | 0 reported vulnerabilities | [npm result](evidence/validation/dependency-audit.json) |
| Source publication scan | Gitleaks: no leaks in Git-visible source files | [result](evidence/validation/gitleaks-publication.json) |
| Exact staged-source scan | Gitleaks: no leaks before commit | [result](evidence/validation/gitleaks-staged.json) |
| Full pre-push Git history scan | Gitleaks: no leaks in both the initial and implementation commits | [result](evidence/validation/gitleaks-history.json) |

## Browser checks

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

Chromium's download helper and a normal download click both reported **Failed - Download error** on this Windows test surface. An unrelated local JSON test download failed as well; disabling Blob revocation did not resolve it. Browser lifecycle/path handling was also isolated during investigation. The underlying browser file-write cause remains unconfirmed. No product workaround or fake download pass has been claimed. Re-test an ordinary file save on the public deployment before marking the release checklist complete.

## Security scan scope

The first broad directory scan included ignored generated Next.js preview/action keys and downloaded tool documentation examples (8 findings). These were inspected as generated/tool files, not application credentials. The publication scan used the exact Git-visible source list, excluding ignored `.next`, `.local-tools`, real env files and artifacts; it returned no findings. Do not publish build caches or tool directories. The exact staged source and complete history including implementation commit `dc8035c` were subsequently scanned without findings. Repeat these checks for later milestone changes before pushing.

The dependency scan and tests are not a security audit. Rate limits/cache are per process, CSP permits inline bootstrap/styles, public providers can throttle, and no independent provider consensus or full historical coverage is claimed.

## Still pending

Public production/anonymous smoke verification; successful normal browser file save; owner-approved hosting, license/profile, funded burner and immutable recipients; Lab deployment/source verification and five owner-created mainnet scenarios; grant application pack and owner submission. Standard EVM contract tests do not validate Arc-specific shared-balance behavior.
