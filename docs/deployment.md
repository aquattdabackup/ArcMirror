# Deployment runbook

## Current state

[Production](https://arcmirror-six.vercel.app) runs source 4ee1f21c25a25fdb208677580d9597671cab2e43, READY deployment dpl_EN2XfCpfkGGVWgFR8Xe8uGxdeCu3. [October 10 release and checks](releases/2026-10-10-snapshots.md): five owner snapshots with capture dates, explicit live verification, five saved/five live full-report matches and 22 production browser passes. Lab and the five owner transactions remain deployed/completed; no new signing or onchain activity occurred.

Immutable URL: https://arcmirror-5ngx182th-luong-tuans-projects-a65355dc.vercel.app may require Vercel authentication; the public alias was tested without login. Project prj_Fl4rD67BDh21Zi4pj7UeMdaT9alh remains arcmirror in the approved team. [Previous hero release](releases/2026-10-09-hero.md) and [earlier RPC maintenance](releases/2026-10-07.md) are historical. This release did not change RPC endpoints, contracts, headline or illustration. Default owner reports are saved evidence; live=1 still uses real RPC and can fail honestly.

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
