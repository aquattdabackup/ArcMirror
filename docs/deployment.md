# Deployment runbook

## Current state

[Production](https://arcmirror-six.vercel.app) is accessible and analyzes the five [owner-created Arc mainnet demos](mainnet-evidence.md). Lab is deployed on chain 5042; its address, receipt and bytecode checks are in [the manifest](../contracts/deployments/5042.json). This September 30 evidence/docs release changes no application or contract execution code and requires no Vercel redeployment.

Last recorded UI deployment: dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC from application source 229ba77, September 27. See [product-focus checks](evidence/product-focus/checks.json). The earlier aebf0c6 workbench deployment is historical. Project prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh, arcmirror, in the approved Luong Tuan's projects team.

## Approved website configuration

- Next.js, root apps/web, include source outside root for packages/core and packages/rpc.
- Node 22+; recorded production configuration uses Node 24.
- Install from workspace root with npm ci; settings support an apps/web working directory too.
- Build npm run build. Public server RPC defaults are Arc primary + dRPC; optional ARC_RPC_URLS and ARC_TRACE_RPC_URLS stay server-only. The adapter rejects chain IDs other than 5042.
- [Exact deployment settings](deployment-settings.json). Never publish real environment files, hosting credentials or wallet secrets.

Use only the existing approved project/team. The CLI full-repository upload preserves workspace source; a past connector inline-file upload omitted it. When application code changes, deploy from the linked repository root with vercel deploy --prod --yes --scope luong-tuans-projects-a65355dc, then verify public pages, APIs, live reports and relevant browser flows. Do not redeploy solely for these documentation/evidence updates.

## Deployed contract

[Contract README](../contracts/README.md) and [mainnet evidence](mainnet-evidence.md) provide the public Lab/Forwarder addresses, compiler settings, receipt and verification commands. Existing deployment is complete; do not repeat it. Preserved source includes a historical pre-deployment comment; the receipt supersedes it. The reproducible verifier checks executable code and immutable values, excluding CBOR metadata. ArcScan source verification remains unclaimed.

New transactions, if explicitly requested later, require current chain/value/recipient/gas review and owner-local signing. Existing reports and the five-demo recording can be replayed without spending more gas.

## Remaining submission work

Owner reviews [the application draft](application-draft.md), optionally records the [existing-hash walkthrough](mainnet-demo.md), enters the separate reward address in the registration form, completes human verification/required declarations and presses Submit. No final grant submission or npm publication has been performed by the agent. Keep optional memo/extra scenarios and explorer verification status distinct from the completed mainnet deployment/demos.
