# Deployment runbook

## Current state

[Production](https://arcmirror-six.vercel.app) has published analyses of the five [owner-created Arc mainnet demos](mainnet-evidence.md). Lab is deployed on chain 5042; its address, receipt and bytecode checks are in [the manifest](../contracts/deployments/5042.json).

**Current release: October 8, source `bb50586`, Next.js 16.3.8.** A fresh dependency audit found advisories affecting the previous pinned Next version. The targeted security patch is deployed to the same approved project; the deployment verifier's separate primary-RPC fallback fix is also published. See [current review/release evidence](grant-review-2026-10-08.md). The [October 7 release](releases/2026-10-07.md) records prior RPC/CLI, accessibility and dependency fixes. No wallet signing, contract redeployment or new blockchain transaction occurred.

The earlier 05:19 UTC production failures are retained in [historical observations](evidence/maintenance/2026-10-07.json). New Vercel logs establish that the primary provider returned incomplete transaction/receipt pairs, whereas fallback dRPC returned complete pairs. The project has no production RPC environment overrides. The new adapter continues to fallback instead of stopping at the incomplete pair; all five production live reports now match every expected field. This identifies the application-level cause and recovery; it does not establish the upstream provider's internal reason for missing data.

Current deployment: `dpl_4cEZsMCAP8KcA9YbMDG9fB9K3pqk`, source `bb50586856ac26d6de0998a45c194d3e8e6c92a8`, production alias https://arcmirror-six.vercel.app. Immutable URL: https://arcmirror-fnodkg607-luong-tuans-projects-a65355dc.vercel.app (Vercel authentication may protect that URL; the production alias is publicly checked). Previous `dpl_9R9quumt8kbXozD8ZNWXQcV6EciT` / `afa0396` and `dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC` / `229ba77` are historical. Project `prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh`, arcmirror, remains in the approved Luong Tuan's projects team.

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
