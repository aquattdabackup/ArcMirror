# Readiness and requirement review - October 10, 2026

ArcMirror's delivered core addresses the owner's primary requirement: paste an Arc mainnet transaction hash, understand USDC movements and gas, inspect duplicate log representations and share reproducible evidence. The current checks found no unresolved technical mainnet-entry blocker. They do **not** establish that every original idea is implemented, all defects are eliminated, new visitors understand the product, or the program will accept/select it.

This was a targeted requirements/source review and fresh read-only production check, not an exhaustive security audit. No application code, wallet state, production settings or deployed contracts changed. [Machine-readable evidence](evidence/grant-review/2026-10-10.json).

## Fresh checks

At approximately 04:38-04:39 UTC / 11:38-11:39 Vietnam time:

- Public homepage, methodology, tools, repository and builder profile were accessible. GitHub reports the repository public and MIT licensed. The homepage contains the restored transaction headline and hash field.
- All five owner hashes requested with `?live=1` returned HTTP 200, `source: live`, and reports fully equal to their recorded expected reports. ERC-20 remains `needs_review`; the intentional failure remains `confirmed_failed` with a reproducible analysis.
- Both documented public RPC endpoints returned chain 5042, matching [official network parameters](https://docs.arc.io/arc/references/connect-to-arc).
- `node scripts/verify-deployment.mjs --live` passed through default fallback provider index 1, including receipt/source/compiler checks, both executable bytecodes, immutable addresses and live getters. This excludes Solidity metadata and is not an explorer badge.
- Production HTTP/API smoke passed the three saved examples, malformed/unknown hashes, security headers and four tool pages. The health route is shallow; the separate live reports/RPC reads establish actual connectivity.
- `npm.cmd audit --omit=dev --json` returned zero reported vulnerabilities. This is a current dependency scan, not proof of security.

Current application release remains [059469b / dpl_3bCgwihgTu112pUkSnUZ7BXzNdGa](releases/2026-10-09-hero.md). Its seven viewport and six targeted actual-browser checks passed October 9. The previous release's full 20-browser suite is [separate dated evidence](releases/2026-10-09.md). Neither browser run, the full unit/contract suite nor a load test was repeated in this read-only review.

## Requirement coverage

| Requirement | Assessment |
| --- | --- |
| Published program: deployed and working on Arc mainnet | Supported by fresh production reports, chain checks and contract verification, plus public source/profile. Owner previously confirmed no Circle/Arc funding. |
| Owner P0: analyzer, transaction pages, money flow, eligible double-count comparison, gas, JSON, examples, production and README | Delivered with published evidence. No newly reproduced failure in these targeted checks. |
| Owner P1: reproducible evidence, core/vectors/CLI and own Lab/mainnet activity | Delivered with coverage limits. Three views are not three independent providers or consensus; unsupported precompile coverage must remain Needs Review. |
| Latest homepage direction | Restored "Understand your USDC transaction" and prioritized hash entry; right illustration preserved. Keep this owner decision. |
| Optional supporting workflows | Reconciliation checks expected movements in one transaction; Inspector checks saved reports; Dust Lab explains precision by simulation. They support the analyzer and are not prerequisites for ordinary users. |
| Remaining original P2 ideas | Memo decoding, Dune query, MCP and OG cards are not implemented; npm publication is deferred. None is a published Microgrants entry requirement. |

## Open issues and limits

Priority here describes practical engineering/submission work, not organizer scoring.

| Priority | Exact issue and evidence | Next action and acceptance |
| --- | --- | --- |
| IMPORTANT: presentation defect | The public YouTube description still contains three URLs with a space after `https://`, confirmed from public player metadata today. | Owner removes the spaces using the [prepared replacement links](video-review-2026-10-09.vi.md), saves and clicks each public link. No channel edit was performed by the agent. |
| IMPORTANT: demo resilience gap | `apps/web/lib/service.ts` returns bundled reports only from `lib/examples.ts`, which contains three third-party samples. The five owner report pages need RPC or a recent process cache. `vectors/owner` provides offline CLI evidence but is not a website fallback. | A simultaneous upstream outage/cache miss can prevent the primary owner walkthrough from loading. A narrowly scoped improvement would serve explicitly labelled, dated owner snapshots on the normal demo path, preserve `?live=1` as a real network check and test both paths. This is an unimplemented reliability improvement, not evidence of an outage in today's passing checks. |
| IMPORTANT: comprehension unverified | The original brief asks a new visitor to understand the value within 30-60 seconds. Browser assertions and the owner's revised homepage preference do not measure that. [Feedback log](user-feedback.md) has no independent sessions. | Owner recruits the already agreed 2-3 testers with the [participant sheet](user-test-task.vi.md). Record actual answers and fix demonstrated confusion; do not invent adoption or speed claims. User research is not a program entry requirement. |
| LIMIT: resilience under load | Cache/limits in `apps/web/lib/service.ts` are per process: 256 entries, one-hour TTL, eight active analyses. They are not persistent caching or distributed abuse control. No production load/physical-device certification exists. | Keep limits disclosed; do not claim heavy-traffic readiness or guaranteed RPC uptime. Revisit persistent caching/limits if observed demand justifies it. No added paid infrastructure is necessary to support today's technical-entry finding. |
| OPEN: final presentation/submission | Public video metadata is playable/254 seconds, but complete audiovisual playback is unchecked. Last owner status is not submitted; current final form/terms and submitted links are unverified. | Owner watches the public recording, reviews exact form contents and submits once. Video is optional under the published program rules. |

Native call-value traces cannot prove USDC precompile mutations. Preserving `needs_review` on the ERC-20 demo is correct behavior, not an unfinished deployment. Historical "pending" records are dated/superseded; the pinned deployed Solidity source must not be changed merely to remove an old comment. [Deployment manifest and owner evidence](mainnet-evidence.md) establish current status. The README openly lists deferred features; they must not be described as delivered.

## Scope before submission

The [official program page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq), rechecked today, still asks for a working mainnet build, public repo/profile and a short explanation of the product and Arc usage. It evaluates Arc relevance, technical credibility, build quality and further potential; it does not prescribe tool count, five demos, traction or a video. Deadline remains October 14, 2026, 23:59 ET / October 15, 10:59 Vietnam.

Keep the analyzer and evidence path central. Fix the description links, validate first-time comprehension, and consider the bounded demo-fallback improvement; do not add unrelated features or pay for more demo transactions to address these findings. Final eligibility declarations and submission remain owner actions. This review supports technical readiness within its tested scope, not a guarantee of acceptance or an award.
