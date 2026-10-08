# ArcMirror

**Understand USDC movements, their evidence, and verification limits on Arc mainnet.**

ArcMirror is an open-source, read-only transaction analyzer. Arc exposes USDC through native 18-decimal amounts and a 6-decimal ERC-20 interface. Adding both log streams can count the same movement twice. ArcMirror pairs the evidence, preserves exact amounts, separates gas, and explains what the available data can establish.

[Live application](https://arcmirror-six.vercel.app) · [Owner mainnet demos](docs/mainnet-evidence.md) · [Test walkthrough](docs/owner-test-flow.vi.md) · [Maintenance review](docs/maintenance-review-2026-10-07.md)

No wallet connection, signature, approval, or payment is required to analyze a transaction.

## Status and mainnet evidence

The analyzer is hosted on Vercel. ArcMirrorLab is deployed on **Arc mainnet, chain ID 5042** at [0xa64439ea7c88d56e2888c377d55ae3e174b415c1](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1). Five owner-created scenarios have recorded receipts: native transfer, ERC-20 transfer, forwarding, batch payout, and an intentional failed transaction.

Open the [owner's forwarding report](https://arcmirror-six.vercel.app/tx/0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41). The [mainnet evidence index](docs/mainnet-evidence.md) links all five hashes, raw RPC captures, expected reports, and deployment verification. The three homepage snapshots are explicitly **third-party examples**, separate from owner demos.

**Current release (October 7):** application source `afa0396` is deployed to the public site. All five owner reports fetched live from production match the recorded evidence. RPC fallback, dependency patches, accessible tabs and scoped UI wording are included. See the [release record](docs/releases/2026-10-07.md), [deployment runbook](docs/deployment.md) and dated [validation](docs/validation.md).

## Features

| Feature | Purpose and scope |
| --- | --- |
| Transaction report | Analyze a mainnet hash; show canonical movements, exact gas, logs, and available trace/state evidence. |
| Live re-verification | Fetch evidence again and compare the digest. Saved examples remain usable during RPC outages. |
| JSON export and CLI | Save and reproduce a report from RPC or a captured fixture. |
| Payout reconciliation | Compare up to 500 CSV expectations against one successful transaction. Each exact match consumes one movement; unmatched rows and extra movements remain visible. |
| Report inspector | Validate and compare saved JSON locally, with an optional fresh lookup by hash. Digest integrity is not authenticity. |
| Dust Lab | Demonstrate exact 18/6-decimal decomposition and truncation remainders. This is arithmetic simulation, not a transaction. |

The follow-up tools are at [/tools](https://arcmirror-six.vercel.app/tools). CSV/JSON files stay in browser memory; only a transaction hash is sent for a requested live analysis. Reconciliation does not establish invoice identity, address ownership, or offchain settlement.

## Quick start

Prerequisites: **Node.js 22+**, npm, and Git. Development is checked on Node 24. Foundry is needed only for contract tests and bytecode verification. On Windows PowerShell, use `npm.cmd` if `npm.ps1` is blocked.

```sh
git clone https://github.com/aquattdabackup/ArcMirror.git
cd ArcMirror
npm ci
npm run dev
```

Open http://localhost:3000. Choose a saved example or paste a transaction hash. Read **What can I conclude?**, expand a movement or fee, and inspect **Source logs** or **Balance proof**. Use **Re-verify live** for fresh RPC evidence.

To build and serve locally:

```sh
npm run build
npm start
```

### Configuration

Public defaults work without an environment file. For Next.js, place overrides in `apps/web/.env.local`; for CLI scripts, set terminal environment variables. See [.env.example](.env.example).

| Variable | Default | Used by |
| --- | --- | --- |
| `ARC_RPC_URLS` | `https://rpc.mainnet.arc.io,https://rpc.drpc.mainnet.arc.io` | Server/CLI transaction, receipt and block reads. |
| `ARC_TRACE_RPC_URLS` | `https://rpc.drpc.mainnet.arc.io` | Optional call/state traces. |
| `ARC_DEPLOYMENT_RPC_URL` | Unset: Arc primary, then dRPC fallback | Deployment verifier's live mode only; an explicit value selects that endpoint exclusively. |

The first two variables accept one to four comma-separated HTTP(S) endpoints. Each contacted provider must report chain ID `0x13b2` (5042). RPC credentials stay server-side: never use `NEXT_PUBLIC_` or commit real environment files. No private key is needed.

RPC reads have a 6.5-second per-request timeout, a shared 45-second analysis budget, and a 4 MB response limit. Unavailable optional block metadata or traces preserve the receipt while reducing available proof.

## Development and verification

Run from the repository root unless noted:

| Command | Purpose |
| --- | --- |
| `npm test` | Analyzer, mainnet vectors, browser-tool logic, RPC adapter, CLI and rendered-component tests. |
| `npm run test:web` | Rendered component tests; not a browser end-to-end suite. |
| `npm run test:e2e` | Chromium desktop/mobile flows against the local build; install Chromium first. See [browser and CI instructions](docs/testing.md). |
| `npm run test:spike` | Assertions over frozen investigation evidence. |
| `npm run typecheck` | Shared source and web TypeScript checks. |
| `npm run build` | Core ESM/declarations and Next.js production build. |
| `node scripts/smoke.mjs http://127.0.0.1:3000` | HTTP/API/page checks against a running server, including a read-only RPC lookup. |
| `npm audit --omit=dev` | Current production dependency advisories. |
| `forge test -vv` in `contracts/` | Local Solidity tests; mocks do not emulate Arc system behavior. |
| `node scripts/verify-deployment.mjs` | Check compiled artifacts against captured deployment evidence; first run `forge build` in `contracts/`. |
| `node scripts/verify-deployment.mjs --live` | Read-only check of deployed bytecode and getters. |
| `npm run vectors` | Regenerate three root examples/snapshots from frozen evidence; review the diff. |

[GitHub Actions CI](.github/workflows/ci.yml) runs application, browser and contract checks for code changes. Documentation-only changes are excluded. There is no lint script. Dated outcomes and verification scope are recorded in [validation](docs/validation.md).

### Reproduce a report

Compare a downloaded report with fresh RPC evidence:

```sh
npm run verify -- 0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981 --report report.json
```

For a deterministic offline check:

```sh
npm run verify -- 0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981 --fixture vectors/owner/0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981.json --report vectors/owner/0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981.json
```

`--out fresh.json` saves the result. `--logs-only` disables traces for live RPC; fixtures retain captured evidence. Invalid arguments or failed operations exit `2`; mismatches and unconfirmed/unsupported statuses exit `1`. A confirmed failed transaction can still have a reproducible analysis. Evidence availability and algorithm changes can change the digest.

## Analysis model

Only Transfer logs from native emitter `0xfffffffffffffffffffffffffffffffffffffffe` create canonical USDC movements. Each 6-decimal interface log from `0x3600000000000000000000000000000000000000` corroborates one unmatched movement with identical parties and `value18 = value6 × 10^12`. Pairing prefers the nearest log index, then the lower index. Repeated identical transfers retain separate identities.

Amounts use `bigint` internally and strings in reports. Gas is `gasUsed × effectiveGasPrice` and is separate from transfers. Gross totals include intermediate hops; they are not net recipient income. Supported native call values and transaction-local balance changes provide additional checks.

| Evidence level | Meaning |
| --- | --- |
| `verified` | Logs, supported native call values, and transaction-local balance changes reconcile. |
| `consistent` | Logs are internally consistent; additional evidence is unavailable. |
| `needs_review` | Coverage is incomplete, unsupported, or contradictory. |

Receipt outcome is independent of evidence quality. USDC precompile mutations can occur with zero native call value; such coverage retains `needs_review`. The digest hashes canonical sorted-key JSON excluding its own digest. It proves equality, not RPC honesty or independent consensus. See [core usage](packages/core/README.md), [vector provenance](vectors/README.md), and [investigation findings](docs/spike-findings.md).

## Repository structure

The stack is TypeScript, Next.js 16, React 19, viem, Zod, and Solidity 0.8.28/Foundry. npm workspaces contain the web app and core; RPC code is shared server/CLI source.

```text
apps/web/           Next.js pages, APIs, report UI and browser tools
packages/core/      Analysis, amounts, inspection and reconciliation
packages/rpc/       Chain-checked RPC fallback, deadlines and limits
contracts/          Pinned Lab source, tests and deployment manifest
vectors/            Third-party examples and separate owner fixtures
scripts/            Verification CLI, smoke, collection and generators
docs/               Runbooks, dated reviews and captured evidence
assets/brand/       Exports of the existing website logo
```

APIs: `/api/health`, `/api/examples`, `/api/analyze/<hash>`. Add `?live=1` to bypass saved snapshots/cache. There is no database or signing backend. See [architecture](architecture.md) for entry points and invariants.

## Deployment and limits

Vercel uses `apps/web` as the project root, includes source outside it, and installs from the workspace root. See [exact settings and release procedure](docs/deployment.md). The owner authorized the October 7 release after the initial maintenance-only review; deployment and read-only mainnet/browser checks are recorded separately. No new onchain transaction was needed.

- Cache and limits are per process: 256 reports/one-hour TTL, 8 active analyses, 30 client and 120 global admissions per minute. These are not distributed abuse controls. Self-hosting requires a trusted proxy for client-IP headers.
- RPC throttling, missing history and unsupported traces can reduce evidence. All-history/fork coverage is not certified.
- Memo decoding, Dune queries, MCP endpoints and OG sharing cards are not implemented. npm packages remain private.
- Inspector accepts up to 2 MB and 5,000 movements/logs; very large analyzer reports may exceed these limits. CSV reconciliation accepts 256 KB/500 rows.
- Basic CSP/security headers permit inline bootstrap scripts/styles. No nonce-based CSP or independent security audit is claimed.
- Deployed source is preserved exactly; its historical pending comment is superseded by the manifest. Executable/immutable matching excludes Solidity metadata and is not an ArcScan verification badge.
- Local mocks do not emulate Arc shared balances or system logs. Five recorded demos do not certify every contract path.

This is an evidence analysis tool, not a custody service, audit service, or refund guarantee.

## Documentation and license

[Documentation index](docs/README.md) · [Mainnet proof](docs/mainnet-evidence.md) · [Video script](docs/video-demo-script.vi.md) · [Brand files](assets/brand/README.md) · [Agent handoff](docs/HANDOFF.md)

Source is [MIT licensed](LICENSE). Public builder: [aquattdabackup](https://github.com/aquattdabackup). Verification scripts neither publish npm packages nor submit a grant application.
