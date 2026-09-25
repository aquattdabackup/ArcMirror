# ArcMirror architecture

## Entry points and data flow

- npm workspace: `apps/web` (Next.js App Router), `packages/core` (pure TypeScript ESM). `packages/rpc` is shared server/CLI source.
- `packages/core/src/index.ts`: `analyze(Bundle)`, canonical JSON/digest, exact bigint formatting and emitter constants. Types in `src/types.ts`; independent build emits `dist` declarations/ESM.
- `packages/rpc/src/index.ts`: bounded JSON-RPC adapter, chain checks, fallback endpoints, optional callTracer/prestateTracer. Only configured server URLs; no client-supplied URL.
- `apps/web/lib/service.ts`: snapshots first unless live requested, bounded in-process cache/deduplication/concurrency/rate limits; `server-only` import.
- `apps/web/components/report.tsx`: evidence/flow/log/state views, live refresh preserving old evidence on transport failure, download/copy controls.
- `packages/core/src/reconciliation.ts`: bounded CSV parsing and exact one-to-one payout matching. `precision.ts`: decimal parsing and 18/6-decimal arithmetic. Both are package subpath exports; the standalone build rewrites TypeScript import extensions to ESM JavaScript.
- `apps/web/components/tools/reconcile.tsx`: local CSV input, hash-only report fetch and reconciliation JSON export; `/tools` links the workbench.
- Routes `/tools`, `/tools/reconcile`, `/`, `/tx/[hash]`, `/how-it-works`; `/api/health`, `/api/examples`, `/api/analyze/[hash]`.
- `scripts/verify.ts`: live or fixture verification; checks report digest and lists changed fields.
- `scripts/generate-vectors.ts`: regenerates expected reports/snapshots from frozen public evidence. Tests deep-compare vectors offline.
- `contracts/src/ArcMirrorLab.sol`: fixed immutable recipients, bounded scenarios, exact ERC-20 allowances, no admin, fixed-recipient sweep. No deployment exists.

## Invariants

- Chain 5042 only; no success without a matching receipt status 1. Monetary arithmetic uses bigint; serialized amounts are strings.
- Native emitter `0xfffffffffffffffffffffffffffffffffffffffe` supplies 18-decimal canonical movements. USDC interface `0x3600000000000000000000000000000000000000` supplies 6-decimal corroboration. Exact one-to-one nearest-index pairing; duplicates retain identity.
- Gas is separate, `gasUsed * effectiveGasPrice`. Observed mainnet state diff credits the block producer. Each hop is counted once; totals are not net income.
- Native call values do not cover USDC precompile mutations. Unsupported coverage must not become `verified` even if state/logs agree.
- Three data representations are not necessarily independent providers. The digest commits to report equality, not consensus.
- Memo decoding and all-history/fork coverage are not certified. Dune already deduplicates these log representations.
- Never store credentials, real env files, keys or keystores in source. Never create mainnet artifact claims before real receipts exist.

## Configuration and operation

- Node >=22, tested Node 24; Windows uses `npm.cmd` because npm.ps1 is blocked.
- Server `ARC_RPC_URLS`, `ARC_TRACE_RPC_URLS`: comma-separated, up to four configured endpoints each. Defaults primary+dRPC and dRPC trace. Public capabilities can change.
- Timeout 6.5 seconds per request; responses max 4 MB. Per-process cache 256/TTL1hour, max 8 in-flight analyses, per-minute 30/client, 120/global. Not a distributed limiter.
- Basic CSP permits Next.js inline bootstrap/styles. No analytics, wallet connection or arbitrary endpoint request API.
- `npm ci`, `npm test`, `npm run test:spike`, `npm run typecheck`, `npm run build`, `npm start`.
- `forge test -vv` in contracts. Local mock is not an Arc simulator.
- Public repo: https://github.com/aquattdabackup/ArcMirror. Public website: https://arcmirror-six.vercel.app, Vercel project arcmirror in the approved Luong Tuan's projects team. Linked monorepo root apps/web includes outside source; CLI full-repository upload preserves the workspace. Settings: docs/deployment-settings.json.

## Evidence and handoff

- Frozen investigation: `docs/evidence/spike`, documented by `docs/spike-findings.md`. Read-only collection scripts never sign transactions.
- `vectors`: three third-party mainnet samples, explicitly not owner-created demos.
- `docs/validation.md`: actual checks. `docs/deployment.md`: deployment settings/remaining owner steps. `task_on_progress.md`: temporary task status.
- Owner confirmed no Circle/Arc funding and authorized software-first; public wallet addresses are supplied; funding and signing remain pending. Address mapping and unsigned deployment payload stay in ignored artifacts, outside the public repo. Owner approved MIT and builder profile aquattdabackup on 2026-09-25. Root/core license files and Solidity SPDX markers use MIT; npm packages remain private.

## Agent continuity

Root `AGENTS.md` records owner instructions to commit every completed milestone, push when authorized access works, and maintain portable handoff context. New agents start with it, `docs/HANDOFF.md` and `task_on_progress.md`; the original prompt is retained in `docs/product-brief.vi.md`. Git authentication and deployment approvals are tracked separately from software completion.
