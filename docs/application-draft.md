# Arc Microgrants application draft

**Draft, not submitted.** Updated 2026-09-30: the live analyzer, deployed Lab and all five owner-created mainnet demos are backed by [public receipts, reports and reproducible verification](mainnet-evidence.md). The separate reward address remains local for owner entry at submission. Explorer source verification is not claimed.

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
| ERC-20 mainnet example | [Report](https://arcmirror-six.vercel.app/tx/0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f), [Blockscout](https://explorer.arc.io/tx/0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f); existing third-party activity |
| Native mainnet example | [Report](https://arcmirror-six.vercel.app/tx/0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87); existing third-party activity |
| Dust mainnet example | [Report](https://arcmirror-six.vercel.app/tx/0x37567ff71a01f4966f0c4d5c4155dde45a293fd4450a57ce3c69d96c9777b3de); existing third-party activity |
| Lab contract / source verification | [Deployed Lab](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1), [receipt and compiler manifest](../contracts/deployments/5042.json), reproducible executable/immutable verification. No explorer verification badge claimed. |
| Five owner-created demos | **Completed and checked on mainnet.** [Native, ERC-20, forwarding, batch and intentional failure](mainnet-evidence.md), with independent receipt comparisons and matching production live reports. |
| Reward address | **Supplied locally.** Distinct from demo burner; owner enters it in the application. Not published in this repo. |
| Reproduction evidence | [Downloaded report](evidence/production/downloaded-report.json), [fresh CLI match](evidence/production/live-verify.txt), [public production checks](evidence/production/browser-checks.json) |

## Primary tour: one transaction in about one minute

Updated 2026-09-27 after owner feedback on unclear tool usefulness. See [product review](product-review.md). The five owner-signed demonstrations were subsequently completed; see the current evidence linked above.

1. On the [home page](https://arcmirror-six.vercel.app), choose **Follow a real 0.01 USDC transfer in one minute**.
2. Read **What can I conclude?**: the recipient receives 0.01 USDC and the transaction sender pays 0.00042 USDC in gas separately.
3. Select **Follow the money**, expand the movement and inspect the system log. Expand the fee to see its receipt inputs.
4. Read the evidence checks, then use **Copy link**. No CSV, JSON or wallet is needed for this path.
5. For the Arc-specific double-count problem, use the ERC-20 investigation below.

This is a proposed walkthrough, not a measured claim that all visitors understand the product within one minute. Owner feedback remains necessary.

## Optional workbench checks

1. Open [Payout reconciliation](https://arcmirror-six.vercel.app/tools/reconcile), choose **Try mainnet example**: two expected movements match 4.499999 USDC, with gas separate and Needs Review preserved. The ids are illustrative, not real invoice claims.
2. Duplicate the first row using a new id and reconcile again: it cannot reuse the same movement. Change an amount by one native base unit to expose a mismatch.
3. Open [Report inspector](https://arcmirror-six.vercel.app/tools/inspect), load the example into A and compare with fresh RPC. Import an edited report in B to see its changed fields and digest warning.
4. Open [Dust Lab](https://arcmirror-six.vercel.app/tools/dust), select **One native unit** and inspect the exact remainder and repeated-amount sum. Follow the real mainnet evidence link.

## Transaction evidence tour

1. Open the [home page](https://arcmirror-six.vercel.app) and choose **Two logs. One movement.**
2. Expand the 0.090000 USDC movement to see native log 5 and interface log 6, with exact raw amounts.
3. Choose **Source logs** or **Balance proof**. Read why the overall result still says **Needs Review**.
4. Select **Show double-count comparison**: 8.999998 USDC would be counted naively; 4.499999 is the reconciled movement total.
5. Select **Download JSON**, then **Re-verify live**. The tested result has the same digest.

Optional CLI reproduction after installing the repository dependencies; replace `report.json` with the downloaded file path:

```sh
npm run verify -- 0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f --report report.json
```

## Requirement-to-evidence matrix

Program requirements were rechecked on the [official page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq) on 2026-09-25. The owner's full brief also requires the additional Lab/demo stage below; this draft does not certify acceptance.

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
- Re-open the product, repository/profile and all final explorer links. ArcScan address/transaction links were read during the September 30 checks; explorer APIs can still challenge automation. Use the published RPC reproduction path if an explorer is unavailable.
- Confirm every claimed onchain artifact is chain 5042 and no testnet/local mock is labelled mainnet. Recheck the current program deadline on the official page.
- The official page links to [DoraHacks registration](https://dorahacks.io/hackathon/arc-microgrants). Its automated-browser visit reached Human Verification on 2026-09-25, so form fields were not inspected or filled. The owner completes that check and presses the final submission button. No application has been sent by this agent.
