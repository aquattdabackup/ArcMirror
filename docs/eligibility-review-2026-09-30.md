# Arc Microgrants technical eligibility review — 2026-09-30

**Conclusion: the observed project satisfies the published technical entry requirement of a working Arc Mainnet project. No unresolved technical eligibility blocker was found in this review.** This is a technical assessment, not organizer acceptance, a security audit or certification of the owner's personal eligibility. Actual form review and submission remain unfinished.

Scope: the owner's pasted rules, the [current official program page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq), public repository and documentation, production HTTP/API behavior, mainnet RPC receipts, contract deployment identity, owner demonstrations and existing regression suites. [Machine-readable results](evidence/eligibility-review/2026-09-30.json) record the checks and limits. Network observations began at 2026-09-30T12:26:10Z. The source audit baseline is `9797ac0bf591caf26033cef4769b9c3c410cb360`; subsequent review changes are documentation only.

## Requirement-to-evidence result

| Published condition | Result | Evidence and limit |
| --- | --- | --- |
| Live application available to reviewers | Pass at check time | Homepage, methodology, five owner report pages and four workbench pages returned HTTP 200 without app authentication. Public API smoke passed. |
| Already working on Arc Mainnet | Pass | All five owner hashes returned `source: live`, chain 5042, valid digests and complete reports equal to local analysis. Primary and dRPC receipts corroborated transaction hash, block hash, status and logs. Health alone was not treated as proof. |
| Real Arc integration | Pass | The core interprets Arc's 18-decimal native and 6-decimal USDC interface representations, suppresses duplicate representations, separates gas, and checks supported traces/state changes. RPC code rejects networks other than 5042. Arc data is the analyzer's core input. |
| Public repository | Pass | Anonymous GitHub API confirmed a public MIT repository. All 164 tracked blobs at the baseline commit matched the public recursive tree. README, eligibility, application, mainnet proof and manifest raw contents were also compared. |
| Short product/Arc description | Prepared | [Application draft](application-draft.md) explains the main analyzer and optional tools. It has not been submitted. |
| Public builder profile | Pass | [aquattdabackup](https://github.com/aquattdabackup) was publicly accessible and already approved by the owner. |
| No prior Circle/Arc funding | Owner declaration | Owner previously confirmed none. This is not independently verifiable from source code. |
| Right to submit; one submission per project | Owner action | Review and attest in the actual form. MIT source alone does not establish every submission declaration. |
| USDC-receiving wallet and payout screening | Owner/organizer action | Separate address already supplied locally; owner enters it. No funded reward-wallet balance is required by the supplied rules. Screening and conditional payout verification have not been completed. |

The published rules do not mandate exactly five transactions, a video, npm publication, an explorer source-verification badge, an audit, a company or traction. Five demos are an additional owner requirement, now completed. Local CSV/JSON processing and the explicitly labelled Dust simulation do not make the core analyzer testnet-only or mock-only.

## Mainnet and project-specific proof

- [Lab](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1) and [Forwarder](https://arc.etherscan.io/address/0x28fcbbf10fac1bad051d1870c8cb30fd9d3ded17) have real deployed code. Their runtime hashes matched the manifest through both RPC endpoints.
- The [deployment receipt](https://arc.etherscan.io/tx/0x97bcd82e2d98eee0962c54e6bd2fbdbfa78ff908c0627d7f53fc52fe28032292) succeeded. `node scripts/verify-deployment.mjs --live` passed source/compiler, receipt, executable-bytecode and immutable/getter checks. The documented exclusion of Solidity metadata remains; this is not an explorer badge.
- All [five owner transactions](mainnet-evidence.md) were sent from the previously supplied burner and are distinct from the homepage's third-party examples. Their ArcScan pages returned HTTP 200 and contained the requested hashes.
- Native, ERC-20, forwarding and batch receipts succeeded. The intentional failure has receipt status 0, no settled movement and a gas fee. Its `verified` evidence grade does not label the payment successful.
- ERC-20 correctly remains `needs_review`: native call-value traces do not cover USDC precompile mutations. Hiding this limitation would make the explanation less accurate; it is not evidence of a missing mainnet deployment.

[Official network parameters](https://docs.arc.io/arc/references/connect-to-arc) agree with chain 5042 and the source defaults `https://rpc.mainnet.arc.io` / `https://rpc.drpc.mainnet.arc.io`. Production reports were checked against that chain. Encrypted Vercel environment values were not independently reread, so this review does not claim to identify which configured endpoint answered each production call.

## Findings and required action

### IMPORTANT — Actual submission form is still unreviewed and unsubmitted

- **Location:** [application draft, before submission](application-draft.md#before-the-owner-submits); [DoraHacks registration](https://dorahacks.io/hackathon/arc-microgrants).
- **Observed:** the registration request returned HTTP 405 with title `Human Verification`. No login, challenge solving, declarations or submission were performed. The public program page can be checked; form-specific mandatory fields/additional terms cannot yet be certified.
- **Why it matters:** having a technically eligible project does not complete an application. Duplicate-submission, ownership and screening declarations cannot be inferred from tests.
- **Minimum action:** owner opens the official form, completes human verification, reviews its actual fields/terms, supplies the existing live/repo/profile links and reward address, and submits once.
- **Verify:** retain the actual submitted-project page or confirmation. No additional transaction is needed for this step. Private payout verification applies after conditional selection.

### MINOR — README opening implied complete trace coverage; corrected

- **Location:** [README opening](../README.md); baseline wording was “Every trace accounted for.”
- **Risk:** that phrase could imply unsupported precompile trace coverage despite the accurate limitations further down the page.
- **Change completed:** commit `b444f4b` replaces it with a scoped statement about movements, source evidence and verification limits. No analyzer behavior changed.
- **Verify:** read the published opening and confirm the ERC-20 owner report still shows `needs_review`.

### MINOR — Primary application links could foreground project-created proof more clearly; corrected

- **Location:** [application draft, links and evidence](application-draft.md#links-and-evidence). Its walkthroughs use explicitly labelled third-party examples, while owner proof was linked separately.
- **Risk:** a reviewer following only the first example might miss the already completed project-specific activity. This was a presentation issue, not missing evidence or false provenance.
- **Change completed:** commit `e6dbf70` adds a direct owner forwarding report near the top of the links table, refreshes the rules-check date and records the actual registration limitation/declarations.
- **Verify:** open that owner report, then the five-demo proof index; their hashes match the structured review record.

### MINOR — Historical source comment still says deployment is pending

- **Location:** `contracts/src/ArcMirrorLab.sol:10`.
- **Observed:** this comment belongs to the preserved deployed source. [Contract README](../contracts/README.md), [manifest](../contracts/deployments/5042.json) and [mainnet proof](mainnet-evidence.md) explicitly supersede it with dated deployment evidence.
- **Assessment:** potentially confusing in isolation, but not an unresolved deployment task or a material contradiction when the current evidence is read. No redeployment is warranted.
- **Action:** retain the exact source used by the reproducible verifier and direct reviewers to its deployment manifest. If a future source copy is annotated, preserve the original pinned source and its identity checks; do not silently invalidate the verifier to change a comment.
- **Verify:** live deployment verifier passes and the explanatory status notes remain next to the public deployment evidence.

## Incomplete items that do not block the published technical requirement

- ArcScan still presents `Verify and Publish`; source publication there is optional under the reviewed rules. Public source and reproducible executable checks are available. Do not claim a badge or audit.
- Memo decoding, optional duplicate-transfer/dust contract probes and npm publication are not claimed complete. None is required by the published Microgrants entry rules. Dust Lab's arithmetic is not presented as a new owner transaction.
- Public RPC availability and per-process rate limits remain operational limits. This review establishes successful requests at the stated time, not sustained uptime or high-load capacity.
- Scans of tracked Markdown/Solidity found historical funding/validation notes, normal pending-transaction states and explicitly deferred features. Current README, eligibility, application and deployment documentation do not describe the Lab or the five owner demos as still undeployed/unexecuted.

## Checks completed and limits

| Check | Result |
| --- | --- |
| Production/API/RPC/GitHub checks in structured record | 14 passed, zero failures |
| Anonymous production smoke | Health, 3 saved examples, invalid/unknown hashes, security headers and 4 tool pages passed |
| Application tests | 60 passed |
| Frozen spike evidence tests | 10 passed; historical vectors, separate from owner demos |
| Foundry tests | 16 passed, including 256 fuzz runs; local EVM scope |
| Root/web typecheck | Passed |
| Existing public documentation links | 121 relative targets across 26 Markdown files resolved |
| Known production dependency advisories | `npm audit --omit=dev`: zero reported |

No application build or redeployment was needed for documentation-only changes. A new interactive browser test could not run: the Cua kernel failed during Windows sandbox setup twice. Accordingly, this review claims fresh HTTP/API/RPC checks, not fresh visual, download or click-flow verification. Earlier production browser checks are separately dated in [validation](validation.md). A timed owner rehearsal using the [video script](video-demo-script.vi.md) is still useful before recording.

## Minimum remaining work

No additional contract deployment, payment, feature or mandatory technical fix was identified for the published mainnet requirement. Complete the actual submission form and owner declarations, while keeping the live service available. A video can support the application if the form requests or accepts it; the reviewed public rules do not make it mandatory.

Published deadline: October 14, 2026 at 23:59 Eastern Time, equivalent to **October 15, 2026 at 10:59 in Vietnam**. The program can adjust dates, so use the official page/form at submission time.
