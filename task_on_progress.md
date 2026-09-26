# Current task

The owner-requested feature expansion is delivered and deployed. Continue the original ArcMirror mainnet Lab/five-demo and grant-preparation work when the owner is ready for funding/signing. Do not rebuild completed features.

## Owner decisions

- No prior Circle/Arc funding. Software-first authorized. MIT and builder profile aquattdabackup approved. English product/docs, Vietnamese updates.
- Commit each coherent verified milestone and promptly push. GitHub aquattdabackup access works; no authentication blocker. Never force-push.
- Existing Vercel project arcmirror in Luong Tuan's projects is approved; no billing changes.
- Owner previously chose to obtain USDC, then prioritized extra features. Latest feature order was CSV reconciliation, JSON inspector/comparison, Dust Lab; completed.
- Keys/signatures/purchases stay with the owner. No transaction is approved until chain, recipients, exact amounts and gas are reviewed locally.

## Completed release

- `a2787c8`: exact one-to-one CSV payout reconciliation, local file parsing, mismatch/missing/unassigned evidence and JSON export; pushed.
- `aebf0c6`: bounded local JSON schema/digest inspection, field comparison/fresh RPC, exact Dust Lab simulation, navigation and docs; pushed.
- The workbench release was first deployed as `dpl_5grr6VLEgkj31Kovwz7fw3aWUXaV` from `aebf0c6`. The current production deployment is `dpl_3DA59KxitWPbdYPhxizCsEkTAyu3`, READY from typography source commit `93ba99b`, at https://arcmirror-six.vercel.app. Full monorepo CLI upload preserves shared source.
- Readable typography shipped in five focused commits: shared controls `ff95384`, landing page `ea3d628`, transaction evidence `05f65cd`, analysis tools `8cde6a3`, and responsive mobile layout `93ba99b`. Body copy is 17px desktop/16px mobile; high-value report and form text now stays in a 12–16px range. The mobile movement summary uses two rows instead of compressing four columns.
- 49 application tests passed; typecheck, standalone core subpath imports and local/remote builds passed. Existing 10 spike and 16 Foundry/256-fuzz checks previously passed; those components did not change.
- Local browser checked CSV duplicate/one-wei mismatches, tampered/invalid/equal JSON and fresh RPC, dust presets/invalid count, and three real JSON downloads read back from disk.
- Public smoke checked all tool routes and APIs. Public browser: CSV 2/2 with 4.499999 USDC and Needs Review; JSON tamper identifies /evidenceLevel, fresh RPC identical; dust one native unit x1000 = 0.000000000000001 USDC. Typography was rechecked on production home/report/reconciliation at 390px after deployment, with no app console errors, framework overlays or horizontal overflow. See docs/evidence/tools/checks.json, docs/evidence/production/typography-checks.json and docs/validation.md.
- React review: clear client/server boundaries, labelled inputs, alerts, bounded local imports, no uploaded file content, stale results cleared, disabled controls during async work. Existing analyzer algorithm/schema unchanged. No new dependency required.

## Commit granularity follow-up

Owner requested a much finer breakdown. The three published workbench commits were reconstructed as 55 focused, nonempty commits on `history/workbench-granular` and merged into main while preserving all original ancestors. Merge a5bb53a and the detailed branch are pushed without force-push. The history-only merge did not change the deployed tree; the later typography release did. A temporary automatic-review usage-limit failure was resolved by the successful retry; no blocker remains. All 49 tests and root/web typecheck passed on the reconstructed checkout. The reconstructed tree exactly matched `3ee528f`; follow-up commits add commit-map/continuity instructions and the typography release. See docs/commit-map.md for the reconstructed hashes and validation scope. Future work follows the finer granularity in AGENTS.md.

## Grant fit

Official Microgrants rules allow prototypes/experiments and evaluate Arc relevance, technical credibility, quality and potential. No published feature cap or freeze before submission was found; fit is our inference, not organizer approval or an award guarantee. Post-submission review of updates is unspecified. DoraHacks form fields/additional terms are still behind human verification. docs/feature-expansion.md records source/limits. docs/application-draft.md has a revised 100-word description and working tool tour. No grant submitted.

## Remaining original work / exact next action

1. Review the delivered tools and application draft with the owner. Do not add unrelated features without a new request.
2. For mainnet Lab work, read docs/funding.md and docs/wallet-preflight.md; the owner uses MetaMask and has no USDC. Four distinct/checksummed public addresses are in ignored artifacts/owner-wallets.json. Do not ask for them again locally; never publish the mapping or request secrets.
3. User performs any purchase/funding. No exact quote/provider/amount or signed deployment is approved. Once funded, recheck chain 5042, balance, nonce and ordinary gas estimate. Existing artifacts/lab-deployment-unsigned.json is only an unsigned preparation, not a real deployment. Review exact constructor/recipients/amounts/gas before owner-local signing.
4. Deploy/source-verify the Lab and record five confirmed owner-created scenarios. Third-party examples are not substitutes. Then finalize application fields/links; owner submits. npm publication is not authorized.

## Continuity and operation

Read AGENTS.md, architecture.md and docs/HANDOFF.md; original brief is docs/product-brief.vi.md. Keep this task file because the original mainnet/grant task remains open. Use npm.cmd on Windows. Gitleaks/Foundry are in ignored .local-tools. Never print .env/.vercel credentials.

Before stopping: commit/push the final documentation/evidence, verify clean Git state, regenerate and verify artifacts/ArcMirror-handoff.bundle from main only. GitHub is canonical. No need to redeploy docs-only changes. The isolated browser and local production server were closed after checks. Edge download popup targets can disrupt viewport controls, so reselect the real app tab for future checks.

Last updated 2026-09-26.
