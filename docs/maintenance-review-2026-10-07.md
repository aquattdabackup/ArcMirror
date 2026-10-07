# Maintenance review — October 7, 2026

**Historical checkpoint:** this document records the initial maintenance-only review. The owner subsequently authorized deployment, CI and browser checks; the [October 7 release record](releases/2026-10-07.md) supersedes the “not deployed”, production-lookup and browser-blocker statuses below. The original observations are preserved rather than overwritten.

This review concerns correctness, maintainability and operation. It is not a grant award assessment or a security audit. Baseline source: `c8d63b8`. The owner's pre-existing LICENSE indentation edit was preserved. The owner expressly prohibited production deployment and real blockchain transactions during this task; only read-only network checks were performed.

## Scope and confirmed findings

Reviewed AGENTS.md, architecture, handoff, the original brief, workspace/build/deploy configuration, core analysis and browser-tool logic, RPC adapter, API service/routes, report/tool components, CLI, deployed Solidity, tests and relevant documentation. Searches checked historical pending/TODO claims and references before considering cleanup. Targeted inspection is not a claim of a line-by-line audit of every dependency or evidence file.

P1 means high-priority security/availability or materially misleading verification. P2 means an important bounded defect. P3 means lower-impact clarity/maintenance work.

| Priority / status | Location and evidence | Impact | Change and verification |
| --- | --- | --- | --- |
| **P1 — fixed in repository; not deployed** | `package-lock.json`: installed sharp 0.35.4 and source-map-js 1.2.1. Fresh production dependency audit returned two High advisories. | Known vulnerable transitive versions. This establishes dependency exposure, not successful exploitation of ArcMirror. | Targeted updates to sharp 0.35.5 and source-map-js 1.2.2, plus matching sharp platform binaries. No framework upgrade/override. Audit now reports zero findings; PNG native-library smoke, tests and production build pass. Commit `f73747c`. |
| **P1 — adapter fixed; production issue remains open** | `packages/rpc/src/index.ts`, `fetchBundle`: first chain-valid response stopped lookup even when transaction/receipt was null. Regression returned `not_found` instead of a confirmed fallback. Production also returned 404 for mined owner hashes. | A lagging/partial provider can hide an existing transaction. The exact upstream cause of the production responses remains unproven. | Try configured fallback providers for incomplete lookups, retaining the most complete whole bundle without mixing transaction/receipt across providers. Preserve partial evidence if remaining providers fail. Regression covers empty/pending responses and fallback failure. Commit `dbbdc64`; all five updated local live reports match fixtures. |
| **P2 — fixed** | `packages/rpc/src/index.ts`, optional `eth_getBlockByNumber` inside the mandatory lookup try block. A throwing block lookup reproduced `RpcUnavailable` despite a valid receipt. | Missing timestamp/beneficiary metadata erased confirmed movements and gas. | Preserve the transaction/receipt and let the analyzer disclose missing proof. Regression verifies exact movement amounts/fee, missing-block warning and reduced evidence grade. Commit `587bd48`. |
| **P2 — fixed** | RPC adapter had only a 6.5-second request timeout. Four base and four trace providers could accumulate roughly 130 seconds, versus browser 55s/server 60s limits. | Fallback could outlive the response window and occupy an analysis slot. This is a source-derived bound, not a measured production latency. | Share one 45-second abort budget across RPC stages/providers; keep the per-request limit. Tests confirm pending requests abort, fallback stops and already-confirmed evidence survives optional trace timeout. Commit `774b149`. |
| **P2 — fixed** | `scripts/verify.ts` used positional flag lookup. Running an owner fixture with trailing `--report` exited 0 without comparison. | Mistyped verification commands could appear successful. Missing `--fixture` could also fall into live mode. | Parse/validate the complete command before file/network access. Reject missing/empty values, unknown options and extra positional arguments. Four parser/process tests include exit 2 for the reproducer and a valid offline MATCH. Commit `5417f73`. |
| **P2 — implemented; interactive check outstanding** | `apps/web/components/report.tsx`: tabs had no arrow/Home/End handling, roving tab stop or labelled tabpanel. | Keyboard/screen-reader navigation did not follow the declared tab semantics. | Extracted controlled `evidence-tabs.tsx`, added keyboard navigation, IDs, selected tab stop and associated focusable panel. Rendered markup regression, typecheck and HTTP markup checks pass. Actual browser focus/screen-reader behavior is not certified because Cua failed to initialize. Commit `e104505`. |
| **P3 — fixed** | `apps/web/app/layout.tsx` title/footer still claimed “Every trace accounted for” although precompile coverage is limited. | Public wording overstated analysis coverage. | Scoped wording to understanding USDC movements and evidence. Checked local homepage title/footer; production still has the old title. Commit `d15af22`. |
| **P3 — maintenance improvement** | JSON Blob/download/revoke code was duplicated between `report.tsx` and `components/tools/files.ts`. | Two copies could drift. This was not a confirmed user-visible bug. | Moved helpers to `lib/browser-files.ts`; report and all three tools reuse them. Typecheck/build resolve every import. Commit `85e5974`. |

Dependency sources: the [sharp maintainer advisory](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w) identifies the librsvg issue and patched release; the [source-map-js advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) identifies an indexed-source-map denial of service. No hostile payload was executed to test exploitability. The repository has no image-upload endpoint or source-map ingestion feature; that limits directly observed exposure, but does not justify retaining vulnerable dependencies.

The README was rewritten around actual features, setup, safe environment variables, available commands, repository structure, deployment state and limitations. A documentation index separates current instructions from historical preparation/evidence. Historical passing audits were not silently rewritten as current results.

## Tests and observations actually completed

- Baseline: 60 application tests passed. Final: **70 application tests** (63 core/RPC/CLI and 7 rendered-component tests), **10 frozen spike tests**, **16 Foundry tests**, including **256 fuzz runs**.
- Root/web typecheck, standalone core build and all three ESM subpath imports, Next.js production build and native sharp PNG processing passed. There is no lint command to run.
- Local production HTTP smoke on `127.0.0.1:3100` passed health, three saved examples, invalid/unknown hashes, security headers and four tool pages.
- Five owner transactions fetched through the updated local API with `?live=1` each returned their full expected report. The ERC-20 scenario remained `needs_review`; the intentional failure remained `confirmed_failed` with verified evidence. No amount, digest algorithm, schema, fixture or deployed contract was altered.
- Primary and dRPC returned chain 5042. The live deployment verifier passed source hash/compiler, receipt, executable bytecode, exact immutable values and getters for Lab/Forwarder. Solidity metadata is excluded; this is not explorer source verification.
- Production native and batch live requests returned **404 / not_found** during the recorded final observations. The website still served its older title. These checks do not pass and are not hidden behind the successful local results.
- Cua exited during Windows sandbox initialization. No new visual/mobile/click/download or assistive-technology session is claimed. A local check helper initially expected the homepage title on a transaction route; the route correctly has its own title. Correcting the helper's scope verified the homepage without a product change.
- Production dependency audit after the targeted lockfile update reported zero known findings. Gitleaks staged/history scans passed before each milestone publication; this is not proof that no vulnerability exists.

[Structured observations](evidence/maintenance/2026-10-07.json) preserve local versus production results. Temporary console logs and check helpers remain under ignored `artifacts/maintenance`. No performance benchmark or universal production-readiness claim was made.

## Cleanup inventory

| File/group | Action and reason |
| --- | --- |
| `apps/web/components/tools/files.ts` | Moved to `apps/web/lib/browser-files.ts` because helpers are also used by the main report. All four consumer imports updated. |
| Duplicate download implementation in `report.tsx` | Replaced by the shared helper; filenames, JSON formatting and object-URL cleanup preserved. |
| `README.md` | Rewritten in place; `docs/README.md` added as an index. No historical Markdown file deleted or merged away. |
| Vectors, snapshots, investigation scripts, screenshots and evidence | Retained: examples/tests import captured data, generators depend on the raw evidence, and dated validation/provenance links rely on these artifacts. |
| Solidity, licenses, compiler/deployment records | Retained. Changing the deployed source's old pending comment would break its recorded identity; the current manifest/docs already explain the historical wording. |

No unrelated file or user modification was removed. Build outputs, credentials, environment files and temporary tools remain ignored.

## Remaining risks and exact follow-up

1. **P1: production has not received these fixes and live owner lookups failed.** A separately authorized release must include the current lockfile/RPC fixes, inspect effective Vercel-side RPC configuration and responses, and check all five public live reports. Do not assume deployment alone fixes an unidentified upstream/configuration issue. This task intentionally performs no deployment or environment mutation.
2. Browser keyboard/focus, screen-reader behavior, mobile layout and file-download interaction need a real browser rehearsal once computer-use works. Static component/HTTP checks are narrower evidence.
3. Existing cache/rate limits are per process and trust the hosting proxy's client-IP header. Multi-instance abuse resistance and arbitrary self-hosted proxy configurations were not load-tested. CSP still permits inline bootstrap code. No distributed controls or nonce architecture were added without an operational requirement.
4. Production secret values, provider honesty/consensus, full historical-chain coverage, all contract paths, explorer verification badges, offchain ownership and grant submission status were not certified. Mainnet reads here are evidence checks, not new demonstrations created by the agent.

Optional follow-up, separate from defect fixes: a small CI workflow for the existing commands and browser interaction regressions would make subsequent releases easier to review. No database, service split, framework migration or broad dependency upgrade is proposed.
