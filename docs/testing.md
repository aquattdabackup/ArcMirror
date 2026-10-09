# Automated checks and release verification

Use Node 24 for parity with CI and hosting. On Windows, use `npm.cmd`/`npx.cmd` if PowerShell blocks their `.ps1` wrappers.

## Local checks

```sh
npm ci
npm test
npm run test:spike
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Run `forge test -vv` from `contracts/` for the separate Solidity suite. CI pins Foundry 1.8.3; compiler 0.8.28 and optimizer settings are in `contracts/foundry.toml`.

Playwright starts the built Next.js server on `127.0.0.1:3100`, checks it is ready, and stops its process when finished. It refuses to reuse an unrelated server on that port. The two projects run actual Chromium with desktop and Pixel 7 viewport/touch settings. Mobile emulation is not a physical-device test or a screen-reader certification.

Nine scenarios run in both projects:

1. Evidence tabs: arrows, wraparound, Home/End, focus and labelled panel.
2. Actual report download, full JSON equality and re-import from disk.
3. Page width, sticky header during scrolling and screenshots.
4. CSV upload, exact reconciliation, amount mismatch and JSON export.
5. Inspector file equality, modified contents/digest detection and comparison export.
6. Exact dust accumulation, calculation export and invalid-input state.
7. A deliberately simulated RPC outage preserving the visible/downloadable report.
8. Invalid hash feedback and valid report navigation.
9. Direct comparison links open paired-log evidence, preserve the toggle, and do not invent a comparison for a native-only transaction.

These default checks use labelled, captured mainnet examples and local browser inputs. They do not need live RPC access. Only the outage scenario intercepts a browser API request, to return an explicit synthetic error. Never present that result as successful mainnet verification.

## Real production checks

`E2E_BASE_URL` selects an existing deployment instead of starting a local server. `E2E_LIVE=1` also follows the homepage's owner-created ERC-20 demo: the comparison opens immediately, the evidence limit stays visible, and real live re-verification and the downloaded JSON must fully match the recorded report. It uses no request interception.

POSIX shell:

```sh
E2E_BASE_URL=https://arcmirror-six.vercel.app E2E_LIVE=1 npm run test:e2e
node scripts/smoke.mjs https://arcmirror-six.vercel.app
```

PowerShell:

```powershell
$env:E2E_BASE_URL = 'https://arcmirror-six.vercel.app'
$env:E2E_LIVE = '1'
npm.cmd run test:e2e
Remove-Item Env:E2E_BASE_URL, Env:E2E_LIVE
```

For all five owner cases, compare `/api/analyze/<hash>?live=1` against each `vectors/owner/<hash>.json` expected report. Confirm `source: live`, receipt outcome, evidence grade and every report field. The ERC-20 scenario must retain `needs_review`; the intentional failed transaction remains `confirmed_failed`. Existing scripts and these checks are read-only; no wallet or new transaction is needed.

## CI and artifacts

[CI workflow](../.github/workflows/ci.yml) runs for main-branch pushes, pull requests and manual dispatch. Documentation/asset-only changes are excluded. It has read-only repository permissions and no deployment or wallet secrets. Actions are pinned to reviewed commit hashes.

The application job installs from the lockfile, audits production dependencies, runs unit/CLI/component and frozen-evidence tests, checks types, builds, and runs desktop/mobile browser tests. The contract job runs Foundry separately. Hosted Ubuntu 24.04/Node 24 exercise a different OS from the Windows workstation.

Browser HTML reports, screenshots and failure traces are retained as the `browser-results` artifact for seven days. Local output is ignored in `playwright-report/` and `test-results/`; these directories, E2E source and CI configuration are excluded from Vercel uploads.

The API records bounded `arc_rpc_lookup` events: configured provider index, outcome and transaction/receipt presence. Events contain no endpoint URL, raw upstream response or provider error text. Indices refer to the ordering in server RPC configuration; the logger cannot affect analysis. Use Vercel request context to investigate false absence without making report evidence stronger than the data supports.

Current release outcomes belong in the dated [validation record](validation.md), not in assumptions about a previous successful run.
