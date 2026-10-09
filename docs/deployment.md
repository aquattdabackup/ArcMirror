# Deployment runbook

## Current state

[Production](https://arcmirror-six.vercel.app) has published analyses of the five [owner-created Arc mainnet demos](mainnet-evidence.md). Lab is deployed on chain 5042; its address, receipt and bytecode checks are in [the manifest](../contracts/deployments/5042.json).

**Current release: October 9, source `4fbe482`, Next.js 16.3.8.** The owner ERC-20 comparison and all five owner demos now lead the homepage. Direct links position the comparison below the sticky header. All five live reports and 20 production browser checks pass; see [release evidence](releases/2026-10-09.md). The [October 8 review](grant-review-2026-10-08.md) records the retained security patch and verifier fallback; the [October 7 release](releases/2026-10-07.md) records preceding RPC/accessibility fixes. No wallet signing, contract redeployment or new blockchain transaction occurred.

The earlier 05:19 UTC production failures are retained in [historical observations](evidence/maintenance/2026-10-07.json). New Vercel logs establish that the primary provider returned incomplete transaction/receipt pairs, whereas fallback dRPC returned complete pairs. The project has no production RPC environment overrides. The new adapter continues to fallback instead of stopping at the incomplete pair; all five production live reports now match every expected field. This identifies the application-level cause and recovery; it does not establish the upstream provider's internal reason for missing data.

Current deployment: `dpl_3uRkVXLX6ZiMDYLD8dr5ycUTbR1f`, source `4fbe4829f8cc024b72f00892a58eb15394621a6e`, production alias https://arcmirror-six.vercel.app. Immutable URL: https://arcmirror-7rocln065-luong-tuans-projects-a65355dc.vercel.app (Vercel authentication may protect that URL; the production alias is publicly checked). Earlier `dpl_Bob6x7JVDBmSouJasiAisetert5n` / `4e13f52`, `dpl_4cEZsMCAP8KcA9YbMDG9fB9K3pqk` / `bb50586`, and October 7 deployments are historical. Project `prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh`, arcmirror, remains in the approved Luong Tuan's projects team.

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
