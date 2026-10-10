# Arc Microgrants application draft

[October 10 readiness recheck](readiness-review-2026-10-10.md): fresh production/mainnet checks pass; video description links, independent comprehension feedback and final submission remain open. [Current UI release](releases/2026-10-09-hero.md) preserves the general transaction headline and prioritizes hash entry. Optional demo-outage resilience is not yet implemented.

**Draft, not submitted — confirmed by the owner October 8, 2026.** The live analyzer, deployed Lab and all five owner-created mainnet demos are backed by [public receipts, reports and reproducible verification](mainnet-evidence.md). See the [fresh technical and program-fit review](grant-review-2026-10-08.md) and [short reviewer walkthrough](reviewer-walkthrough.md). The separate reward address remains local for owner entry at submission. Explorer source verification is not claimed.

## Two-sentence form answer

ArcMirror helps Arc payment support teams and developers explain a USDC transaction by showing who received what, what gas cost, and why native and ERC-20 logs can represent the same payment. Its live mainnet analyzer links exact amounts to source evidence, keeps verification limits visible, and exports reproducible reports for independent review.

## What it uses Arc for

ArcMirror reads transaction receipts and available execution/state traces from Arc mainnet, chain 5042. Its core reconciles Arc's native 18-decimal USDC events with the 6-decimal ERC-20 interface, preserves sub-micro-USDC amounts and calculates native USDC gas separately; deployed Lab/Forwarder contracts and five owner-created transactions provide public demonstrations of these behaviors.

## Suggested review link

Start with the [owner ERC-20 comparison](https://arcmirror-six.vercel.app/tx/0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d?compare=1#double-count): adding its two log representations would incorrectly show 0.002 USDC; the actual movement is 0.001 USDC. [Walkthrough and batch follow-up](reviewer-walkthrough.md). The homepage prioritizes transaction hash entry. Its secondary demo link opens this comparison; the five owner demos have their own section. The owner supplied a [4:14 demo video](https://www.youtube.com/watch?v=urPALNc8Y2Q). Public metadata and sampled storyboard images were inspected; full audiovisual playback remains unchecked. Three description URLs need spaces removed after https://; [specific findings and replacement links](video-review-2026-10-09.vi.md). The [updated script](video-demo-script.vi.md) and [edit notes](video-edit-notes.vi.md) place the core result and its evidence limits in the first 50 seconds if the owner updates the recording.

The owner will recruit 2–3 independent testers using the [participant tasks](user-test-task.vi.md). [No sessions or responses have been recorded yet](user-feedback.md). Do not include a user count, testimonial or time-saving claim until actual results support it.

## Short description

ArcMirror helps people understand an Arc mainnet USDC transaction: who sent what to whom, what gas cost, and why two logs may describe one transfer. Paste a hash or open a real example without connecting a wallet. Each amount links to its source evidence. The report separates receipt success from verification, preserves tiny amounts, and keeps unsupported coverage visible as Needs Review. Share a transaction link, download the report, or rerun the analysis. Developers can reuse the MIT core and public test vectors. Optional payment-list and saved-report checks support follow-up investigations; they do not establish invoice settlement or independent consensus.

## Project description

ArcMirror helps a builder explain a USDC transaction one amount at a time. Arc exposes native transfers at 18 decimals and an ERC-20 interface at 6 decimals. Both can describe the same movement. ArcMirror pairs those logs without adding the interface amount again, preserves repeated transfers as distinct movements, and calculates gas separately from the receipt. This behavior follows [Arc's documented system events](https://docs.arc.io/arc/references/usdc-system-events) and is checked against captured mainnet receipts.

The product combines three practical capabilities:

1. **Trace an amount to its source.** Expand a movement to see raw units, emitter addresses and original paired logs. The comparison control makes accidental double counting visible. This is not a claim that deduplication is new: [Dune already excludes the duplicate USDC interface stream](https://docs.dune.com/data-catalog/curated/token-transfers/arc/arc-token-transfers). Our focus is an interactive explanation of an individual transaction.
2. **Inspect what the evidence can support.** Logs, supported native call values and transaction-local balance changes are shown together. Missing traces and unexplained residuals remain visible. Our real ERC-20 example stays Needs Review because native call values do not cover its precompile movements, even though logs and state agree.
3. **Reproduce the result.** Export versioned JSON containing exact amounts and a canonical digest; rerun the same core through the CLI with live RPC or public golden vectors. A matching digest means matching reports, not independent consensus or a security audit.

The [workbench](https://arcmirror-six.vercel.app/tools) extends this evidence into practical workflows. Payout reconciliation matches a local CSV to canonical movements by payer, recipient and exact amount; it preserves duplicate identities and distinguishes missing matches, amount differences and unassigned movements. One transaction is the scope; invoice identity and split-payment settlement are not inferred. The report inspector checks local JSON structure/digest and compares individual fields with another file or fresh RPC evidence. Dust Lab makes 18/6-decimal truncation and accumulated remainders visible through exact arithmetic, explicitly labelled simulation. Local files are not uploaded. These additions are built and checked, not roadmap promises.

The website is live on Vercel and reads Arc mainnet, chain 5042. The MIT core is built as an independent package but has not been published to npm. Five owner-created mainnet scenarios are now recorded, including a mined intentional failure; broader supported-case vectors and integrator feedback remain future work. Those measured results could support a later Circle Grant Program proposal; no future award or production certification is claimed. [Validation](validation.md) and the [landscape survey](landscape.md) document the current scope.

## Links and evidence

| Item | Real link or current state |
| --- | --- |
| Live product | [arcmirror-six.vercel.app](https://arcmirror-six.vercel.app) |
| Public source | [aquattdabackup/ArcMirror](https://github.com/aquattdabackup/ArcMirror), MIT |
| Builder | [aquattdabackup](https://github.com/aquattdabackup), owner-approved |
| Demo video | [YouTube, 4:14](https://www.youtube.com/watch?v=urPALNc8Y2Q), owner-supplied; metadata/thumbnail review only, full playback unchecked. |
| Direct project-created mainnet demonstration | [Owner ERC-20 comparison](https://arcmirror-six.vercel.app/tx/0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d?compare=1#double-count); [owner forwarding report](https://arcmirror-six.vercel.app/tx/0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41), using the deployed Lab and Forwarder; [all five owner demos](mainnet-evidence.md). |
| ERC-20 mainnet example | [Report](https://arcmirror-six.vercel.app/tx/0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f), [Blockscout](https://explorer.arc.io/tx/0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f); existing third-party activity |
| Native mainnet example | [Report](https://arcmirror-six.vercel.app/tx/0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87); existing third-party activity |
| Dust mainnet example | [Report](https://arcmirror-six.vercel.app/tx/0x37567ff71a01f4966f0c4d5c4155dde45a293fd4450a57ce3c69d96c9777b3de); existing third-party activity |
| Lab contract / source verification | [Deployed Lab](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1), [receipt and compiler manifest](../contracts/deployments/5042.json), reproducible executable/immutable verification. No explorer verification badge claimed. |
| Five owner-created demos | **Completed and checked on mainnet.** [Native, ERC-20, forwarding, batch and intentional failure](mainnet-evidence.md), with independent receipt comparisons and matching production live reports. |
| Reward address | **Supplied locally.** Distinct from demo burner; owner enters it in the application. Not published in this repo. |
| Reproduction evidence | [October 9 live/browser/CI checks](evidence/releases/2026-10-09/checks.json), [current release](releases/2026-10-09.md), [CLI and browser instructions](testing.md). [October 8 verifier checks](evidence/grant-review/2026-10-08.json), the historical [downloaded report](evidence/production/downloaded-report.json) and [CLI match](evidence/production/live-verify.txt) remain reproducible. |

## Primary tour: one transaction in about one minute

Updated 2026-10-09 to lead with the owner's Arc-specific accounting demonstration. See [product review](product-review.md) for the original usefulness concern.

1. On the [home page](https://arcmirror-six.vercel.app), choose **Explore our 0.001 USDC demo**.
2. The comparison opens: adding both representations would count 0.002 USDC, while the actual movement is 0.001 USDC.
3. Read the visible receipt/evidence distinction, then **Read the coverage limits**. Native call-value traces do not fully cover the ERC-20 precompile mutation; the evidence stays **needs review** despite a successful receipt.
4. Inspect the movement's paired source logs and the separate 0.001052167 USDC gas fee. **Re-verify live** fetches current evidence; report the actual outcome.
5. Use **Copy link** or **Download JSON** to share. Return to **Five transactions** for native, forwarding, batch and intentional failure. No wallet or new transaction is required.

This is a walkthrough target, not a measured claim that visitors understand the product within one minute. Independent feedback remains uncollected.

## Optional workbench checks

1. Open [Payout reconciliation](https://arcmirror-six.vercel.app/tools/reconcile), choose **Try mainnet example**: two expected movements match 4.499999 USDC, with gas separate and Needs Review preserved. The ids are illustrative, not real invoice claims.
2. Duplicate the first row using a new id and reconcile again: it cannot reuse the same movement. Change an amount by one native base unit to expose a mismatch.
3. Open [Report inspector](https://arcmirror-six.vercel.app/tools/inspect), load the example into A and compare with fresh RPC. Import an edited report in B to see its changed fields and digest warning.
4. Open [Dust Lab](https://arcmirror-six.vercel.app/tools/dust), select **One native unit** and inspect the exact remainder and repeated-amount sum. Follow the real mainnet evidence link.

## Additional third-party transaction evidence tour

1. Open the [home page](https://arcmirror-six.vercel.app), scroll to **Additional public examples**, and choose **Two logs. One movement.** This is a third-party snapshot, separate from the owner's five demonstrations.
2. Expand the 0.090000 USDC movement to see native log 5 and interface log 6, with exact raw amounts.
3. Choose **Source logs** or **Balance proof**. Read why the overall result still says **Needs Review**.
4. Select **Show double-count comparison**: 8.999998 USDC would be counted naively; 4.499999 is the reconciled movement total.
5. Select **Download JSON**, then **Re-verify live**. The tested result has the same digest.

Optional CLI reproduction after installing the repository dependencies; replace `report.json` with the downloaded file path:

```sh
npm run verify -- 0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f --report report.json
```

## Requirement-to-evidence matrix

Program requirements were rechecked on the [official page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq) on 2026-10-08. The owner's full brief also requires the additional Lab/demo stage below; this draft does not certify acceptance.

| Requirement | Evidence / remaining action |
| --- | --- |
| Working Arc mainnet project | Production uses chain 5042; live API/RPC evidence matches. Lab is deployed, with a public address and five owner-created demo receipts. |
| Public repository | GitHub API confirmed public main branch and MIT. |
| Description of product and Arc usage | Descriptions above. |
| Public builder profile | Confirmed profile linked above. |
| No previous Circle/Arc funding | Owner explicitly confirmed. |
| Payout / submission | Reward address supplied locally; owner enters it, reviews and submits. |
| Additional owner requirements | Lab executable identity and five demo categories are verified; memo and optional extra paths remain unclaimed. Explorer source verification is a separate status. |

## Feature expansion and rules

The [official program page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq) lists Arc relevance, technical credibility, quality and further potential; it has no published feature-count cap or freeze before submission. We infer these relevant improvements fit its scope. That is not organizer approval or a guarantee of selection. The post-submission update-review policy is unspecified; submit the tested, deployed feature set. See [feature expansion research](feature-expansion.md).

## Before the owner submits

- Review the published Lab/demo links and evidence; enter the separate reward wallet in the form and confirm ownership/program declarations.
- Submit only once for this project and confirm the right to submit the work. The owner has already confirmed no prior Circle/Arc funding. Restricted-jurisdiction screening and private payout verification remain organizer processes; the technical review does not certify them.
- Re-open the product, repository/profile and all final explorer links. ArcScan address/transaction links were read during the September 30 checks; explorer APIs can still challenge automation. Use the published RPC reproduction path if an explorer is unavailable.
- Confirm every claimed onchain artifact is chain 5042 and no testnet/local mock is labelled mainnet. Recheck the current program deadline on the official page.
- The official page links to [DoraHacks registration](https://dorahacks.io/hackathon/arc-microgrants). The October 8 automated read returned HTTP 405; current additional terms and the final form payload were not verified or submitted. The owner reviews the actual form and presses the final submission button. No application has been sent by this agent, and the owner confirmed it is not yet submitted.
