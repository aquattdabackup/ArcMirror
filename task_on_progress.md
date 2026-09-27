# Current task

Current priority (2026-09-27): the owner resumed mainnet preparation and requested a USDC balance check plus the demo procedure. The burner is funded; the five-scenario runbook and local Remix files are prepared. No signature, broadcast, Lab deployment or owner demo has occurred. Next: refresh/review the exact deployment request with the owner, who signs locally in MetaMask. Product-focus correction is delivered; owner usability acceptance remains open. Do not add unrelated features.

## Owner decisions

- No prior Circle/Arc funding. Software-first authorized. MIT and builder profile aquattdabackup approved. English product/docs, Vietnamese updates.
- Commit each coherent verified milestone and promptly push. GitHub aquattdabackup access works; no authentication blocker. Never force-push.
- Existing Vercel project arcmirror in Luong Tuan's projects is approved; no billing changes.
- Owner previously chose to obtain USDC, then prioritized extra features. Latest feature order was CSV reconciliation, JSON inspector/comparison, Dust Lab; completed.
- Keys/signatures/purchases stay with the owner. No transaction is approved until chain, recipients, exact amounts and gas are reviewed locally.

## Funded wallet and demo preparation (2026-09-27)

- At 08:13:10 UTC (15:13 Vietnam), chain 5042, block 22998025: burner 5.409448 USDC. Native 18-decimal and ERC-20 6-decimal views agree; dRPC confirms the same native balance and block hash. Confirmed/pending nonce 0; burner code empty. Evidence: ignored artifacts/wallet-preflight-current.json. Do not repeat old funding instructions.
- Ordinary funded estimates succeeded: deployment 806827 gas, native 0.001 transfer 21000, ERC-20 1000 raw transfer 74814. Price 20000000001; deployment about 0.01614 USDC, buffered gas 968193 about 0.01936 at that price. Later signatures require fresh quotes; remaining Lab calls need the deployed address. No full-demo fee or signed cap is approved.
- Preflight d457345 and demo runbook/funding correction fd6d9fa are pushed. docs/mainnet-demo.md proposes native + ERC-20 + nativeForward + batch + intentional failure, total transferred value 0.006 USDC plus gas. It explains hop totals, Lab as CSV payer, and why a pure eth_call failure is not a mined demo.
- Ignored artifacts/demo-remix contains unchanged source, three ABIs and review.json with public recipients. The failure transaction ABI retains the selector but uses nonpayable metadata; proposed 100000 gas still needs a fresh fee cap and owner review. MetaMask's September 2026 Added Protection supports Arc and may simulate/warn for the intentional revert. Never disable protection for the demo; proceed only if the wallet clearly offers the intended transaction for review.
- Checks: source keccak matches compiled metadata; creation data matches saved hash/constructor; 18/6-decimal amounts and 0.006 total checked; failure ABI selector matches the pure source function. Staged docs and full Git history secret-scanned with no findings. App/contract source unchanged; application/Foundry tests were not rerun.

## Product-focus correction delivered (2026-09-27)

- Focus audit `d7a34b9`; report explanation `2a4d1c9`; six regression checks `c323dc1`; homepage `2f0897e`; task-based tools catalog `59a4290`; independent tool routes `f9bbe4c`, `5765fec`, `f430b87`; standard test integration `229ba77`. All pushed.
- Deployment `dpl_AZbqQjnSuDLdtwLrjnojFko2jiEC` is READY from `229ba77`, aliased to https://arcmirror-six.vercel.app. Local/remote production build and typecheck passed; npm test passed 49 existing plus 6 report-guide checks. Core schema, algorithm and contract unchanged.
- Production verified native amount/source/gas, ERC-20 double-count comparison with Needs Review, current-hash continuity into CSV, custom dust arithmetic and mobile layout. Unknown hash has no confirmed-payment guide or reconciliation action. No captured browser errors/console entries; deployment error-log query empty. Evidence and screenshots: docs/evidence/product-focus, committed/pushed in `a96c1bc`.
- Smoke initially expected old page headings; `5ef87ab` corrected them and production smoke passed. README `26fb451`, application draft `cfe3604` and owner walkthrough/feature review `761ccfa` restore the primary product focus. No funds moved or grant submitted.
- Automatic approval review briefly hit its usage limit; after owner continuation, the same approved checks succeeded. No remaining approval blocker. Browser and dev server closed. Next.js-generated local AGENTS/CLAUDE files were removed; production build restored next-env.d.ts. Preserve the pre-existing, unrelated LICENSE indentation change.

## Earlier release details

- `a2787c8`: exact one-to-one CSV payout reconciliation, local file parsing, mismatch/missing/unassigned evidence and JSON export; pushed.
- `aebf0c6`: bounded local JSON schema/digest inspection, field comparison/fresh RPC, exact Dust Lab simulation, navigation and docs; pushed.
- The workbench release was first deployed as `dpl_5grr6VLEgkj31Kovwz7fw3aWUXaV` from `aebf0c6`, followed by the sticky-header release `dpl_55YdtVKkThygJ2gxd5oegeGi3LpQ` from `701edfa`. The current production deployment is recorded in the correction section above. Full monorepo CLI upload preserves shared source.
- Readable typography shipped in five focused commits: shared controls `ff95384`, landing page `ea3d628`, transaction evidence `05f65cd`, analysis tools `8cde6a3`, and responsive mobile layout `93ba99b`. Body copy is 17px desktop/16px mobile; high-value report and form text now stays in a 12–16px range. The mobile movement summary uses two rows instead of compressing four columns.
- Obsolete static BETA branding was removed in `a429cff`. Production confirms the header text is exactly ArcMirror with no `.beta` element or BETA text. The complete Vietnamese owner walkthrough is `docs/owner-test-flow.vi.md` from `7a72162`; it covers product flow, expected values, negative cases, tools, API/CLI/contract checks, bug isolation and a report template.
- Sticky navigation shipped in `6e9682c`; desktop and 390px mobile checks confirmed top=0 after deep scrolling, correct anchor offset and no overflow. Home copy `51516f0` and tools copy `701edfa` now state that saved examples are optional starters: the analyzer accepts other Arc mainnet hashes, reconciliation accepts owner CSV/hash input, Inspector accepts owner JSON and Dust Lab accepts custom exact amounts.
- 49 application tests passed; typecheck, standalone core subpath imports and local/remote builds passed. Existing 10 spike and 16 Foundry/256-fuzz checks previously passed; those components did not change.
- Local browser checked CSV duplicate/one-wei mismatches, tampered/invalid/equal JSON and fresh RPC, dust presets/invalid count, and three real JSON downloads read back from disk.
- Public smoke checked all tool routes and APIs. Public browser: CSV 2/2 with 4.499999 USDC and Needs Review; JSON tamper identifies /evidenceLevel, fresh RPC identical; dust one native unit x1000 = 0.000000000000001 USDC. Typography was rechecked on production home/report/reconciliation at 390px after deployment, with no app console errors, framework overlays or horizontal overflow. See docs/evidence/tools/checks.json, docs/evidence/production/typography-checks.json and docs/validation.md.
- React review: clear client/server boundaries, labelled inputs, alerts, bounded local imports, no uploaded file content, stale results cleared, disabled controls during async work. Existing analyzer algorithm/schema unchanged. No new dependency required.

## Commit granularity follow-up

Owner requested a much finer breakdown. The three published workbench commits were reconstructed as 55 focused, nonempty commits on `history/workbench-granular` and merged into main while preserving all original ancestors. Merge a5bb53a and the detailed branch are pushed without force-push. The history-only merge did not change the deployed tree; the later typography release did. A temporary automatic-review usage-limit failure was resolved by the successful retry; no blocker remains. All 49 tests and root/web typecheck passed on the reconstructed checkout. The reconstructed tree exactly matched `3ee528f`; follow-up commits add commit-map/continuity instructions and the typography release. See docs/commit-map.md for the reconstructed hashes and validation scope. Future work follows the finer granularity in AGENTS.md.

## Grant fit

Official Microgrants rules allow prototypes/experiments and evaluate Arc relevance, technical credibility, quality and potential. No published feature cap or freeze before submission was found; fit is our inference, not organizer approval or an award guarantee. Post-submission review of updates is unspecified. DoraHacks form fields/additional terms are still behind human verification. docs/feature-expansion.md records source/limits. docs/application-draft.md has a revised 100-word description and working tool tour. No grant submitted.

## Remaining original work / exact next action

1. Follow docs/mainnet-demo.md. Owner opens Remix in the MetaMask browser, selects burner/Arc 5042, and compiles ArcMirrorLab using the recorded source path/settings. Agent refreshes balance/nonce/gas, compares creation data and presents exact recipient/value/fee details before owner-local signing. No extra deposit is indicated for deployment at the checked balance/fee.
2. Addresses remain in ignored artifacts/owner-wallets.json. Do not ask again locally, publish the mapping or request secrets. artifacts/lab-deployment-unsigned.json is historical preparation with an expired quote and only a predicted address; recompute if nonce changes. Only a confirmed receipt supplies a real deployment address.
3. Confirm deployment receipt/code/immutable recipients/source, then execute five scenarios one at a time under owner review/signing. Collect actual receipts/reports/vectors; preserve Needs Review for incomplete coverage. Third-party examples do not count as owner demos. Memo remains separate P2 work.
4. Collect concrete usability feedback during the owner's real report walkthrough; technical checks do not establish comprehension. Finalize application links with real evidence; owner submits. npm publication remains unauthorized.

## Continuity and operation

Read AGENTS.md, architecture.md and docs/HANDOFF.md; original brief is docs/product-brief.vi.md. Keep this task file because the original mainnet/grant task remains open. Use npm.cmd on Windows. Gitleaks/Foundry are in ignored .local-tools. Never print .env/.vercel credentials.

Before stopping: commit/push final documentation/evidence and verify no task changes remain uncommitted; preserve the unrelated LICENSE change. Regenerate and verify artifacts/ArcMirror-handoff.bundle from main only. GitHub is canonical. Consult git log for the final handoff hash. No need to redeploy docs/test-only follow-ups. The isolated browser and local server were closed after checks. Edge download popup targets can disrupt viewport controls, so reselect the real app tab for future checks.

Last updated 2026-09-27.
