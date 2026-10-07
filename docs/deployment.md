# Deployment runbook

## Current state

[Production](https://arcmirror-six.vercel.app) has published analyses of the five [owner-created Arc mainnet demos](mainnet-evidence.md). Lab is deployed on chain 5042; its address, receipt and bytecode checks are in [the manifest](../contracts/deployments/5042.json).

**Current release: October 7, source `afa0396`.** The owner explicitly requested proceeding with deployment, production checks and CI after the initial maintenance-only review. RPC/CLI fixes, accessible tabs, shared file helpers, scoped wording, dependency patches and safe lookup diagnostics are now deployed. No wallet signing, contract redeployment or new blockchain transaction occurred. See [release verification](releases/2026-10-07.md).

The earlier 05:19 UTC production failures are retained in [historical observations](evidence/maintenance/2026-10-07.json). New Vercel logs establish that the primary provider returned incomplete transaction/receipt pairs, whereas fallback dRPC returned complete pairs. The project has no production RPC environment overrides. The new adapter continues to fallback instead of stopping at the incomplete pair; all five production live reports now match every expected field. This identifies the application-level cause and recovery; it does not establish the upstream provider's internal reason for missing data.

Current deployment: `dpl_9R9quumt8kbXozD8ZNWXQcV6EciT`, source `afa03968cab414c6b54b8af8b94cfa5cfa48c28f`, production alias https://arcmirror-six.vercel.app. Immutable URL: https://arcmirror-36n0lrbl7-luong-tuans-projects-a65355dc.vercel.app (Vercel authentication may protect that URL; the production alias is publicly checked). Previous `dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC` / `229ba77` is historical. Project `prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh`, arcmirror, remains in the approved Luong Tuan's projects team.

## Approved website configuration

- Next.js, root apps/web, include source outside root for packages/core and packages/rpc.
- Node 22+; recorded production configuration uses Node 24.
- Install from workspace root with npm ci; settings support an apps/web working directory too.
- Build npm run build. Public server RPC defaults are Arc primary + dRPC; optional ARC_RPC_URLS and ARC_TRACE_RPC_URLS stay server-only. The adapter rejects chain IDs other than 5042.
- [Exact deployment settings](deployment-settings.json). Never publish real environment files, hosting credentials or wallet secrets.

For an authorized release, use only the existing project/team. The CLI full-repository upload preserves workspace source; a past connector inline-file upload omitted it. Deploy from the linked repository root with `vercel deploy --prod --yes --scope luong-tuans-projects-a65355dc`, then verify public pages, APIs, all five owner reports and [browser flows](testing.md). `.vercelignore` excludes credentials, temporary artifacts, tests, browser traces and screenshots. CI validates code; it does not deploy automatically.

## Deployed contract

[Contract README](../contracts/README.md) and [mainnet evidence](mainnet-evidence.md) provide the public Lab/Forwarder addresses, compiler settings, receipt and verification commands. Existing deployment is complete; do not repeat it. Preserved source includes a historical pre-deployment comment; the receipt supersedes it. The reproducible verifier checks executable code and immutable values, excluding CBOR metadata. ArcScan source verification remains unclaimed.

New transactions, if explicitly requested later, require current chain/value/recipient/gas review and owner-local signing. Existing reports and the five-demo recording can be replayed without spending more gas.

## Remaining submission work

Owner reviews [the application draft](application-draft.md), optionally records the [existing-hash walkthrough](mainnet-demo.md), enters the separate reward address in the registration form, completes human verification/required declarations and presses Submit. No final grant submission or npm publication has been performed by the agent. Keep optional memo/extra scenarios and explorer verification status distinct from the completed mainnet deployment/demos.
