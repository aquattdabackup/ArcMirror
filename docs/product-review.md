# Product focus review

Reviewed 2026-09-27 against the owner's original brief, sections 2, 3 and 10, and the [official Microgrants page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq). The owner reports that the three extra tools are difficult to understand and their usefulness is unclear. Passing technical checks did not establish usability or demand.

## Primary job

Help someone investigating an Arc USDC transaction answer: did it succeed, who sent what to whom, what did gas cost, are two logs being mistaken for two payments, and what evidence supports the answer? A first-time visitor should follow one real transaction in 30–60 seconds without a wallet, CSV, JSON file or command line.

The initial audience is people checking an Arc transfer and developers/support teams investigating disputed amounts. This is a product hypothesis, not measured adoption. ArcMirror explains one transaction; it cannot establish invoice settlement, recipient identity or activity across a wallet's history.

## Requirements and gaps

| Brief requirement | Current evidence | Correction / remaining work |
| --- | --- | --- |
| P0: understand the money trail | Canonical movements, separate gas and expandable original logs exist. | Lead with plain-language transaction/evidence outcomes and a short reading path. Keep per-hop totals distinct from final recipient income. |
| P0: explain phantom double counting | Comparison uses matched real log streams and is conditional. | Explain the practical consequence before asking visitors to interpret log terminology. |
| P0: share and rerun evidence | Share URL, JSON, digest, live refresh and CLI exist. | Make link sharing the normal path; place saved-file inspection with the export workflow. |
| P0: first visit understandable in 30–60 seconds | Technical browser checks passed; owner comprehension did not. | Prioritize one transaction walkthrough on the landing page and in the application draft. A fresh owner walkthrough remains necessary. |
| P1: three-view verification | Supported native sample reconciles; ERC-20 call-value coverage is incomplete. | Keep Needs Review visible. Receipt success does not mean the analysis is fully verified; provider views are not independent consensus. |
| P1: own Lab and vectors | Local contract/tests and third-party mainnet vectors exist. | Lab deployment and five owner-signed examples remain incomplete. Funding/signing work is deferred while product clarity is corrected. |
| P2: memo | Report memo is null; no decoder certified. | Explicitly pending, not delivered. |

## Role of the optional tools

| Tool | Concrete job | Input → useful output | Limit / priority |
| --- | --- | --- | --- |
| Payment-list reconciliation | Check whether expected transfers appear in one successful transaction. | An independently prepared CSV plus a hash → exact matches, amount differences, missing matches and source references. | Does not send payments, prove an invoice was paid or search other transactions. A missing match is not proof of unpaid debt. Useful only with an actual payment list; secondary workflow. The sample uses invented expectations for a public composed transaction, not a customer payout. |
| Report inspector | Recheck a report received from another person or compare an earlier export. | ArcMirror JSON and optional second file/fresh RPC → structural/digest checks and changed fields. | A valid digest is not authenticity. Ordinary readers can share a URL and use Re-verify live without this tool. Advanced evidence workflow. |
| Dust Lab | Help an integrator diagnose a display or aggregation rounding error. | An exact amount and repetition count → six-decimal truncation and exact omitted remainder. | Simulation, not a wallet balance, recoverable money or savings calculator. Developer-only helper; lowest priority. |

Do not add more features to compensate for unclear value. Keep existing useful implementations accessible, explain when they apply, and make the primary analyzer usable without them.

## Acceptance for this correction

- Landing page names the user's question and gives a direct real-transaction starting point.
- Report separates receipt outcome from evidence completeness, keeps gas separate and offers an ordered flow → source/double-count → share path.
- Failed/unconfirmed reports never inherit a successful-payment explanation or a payment-reconciliation call to action.
- Every optional tool explains who needs it, what to bring, what decision its result supports, and its boundary before its form.
- Check the native, ERC-20 and dust examples plus unavailable/failed/pending states; verify desktop and mobile layout and the live production flow.
- Keep no-funds review separate from mainnet execution. User feedback is still required to establish that the new flow is understandable.

## Program fit

The correction is now delivered and checked on production; see [verification evidence](evidence/product-focus/checks.json). The tables above record the gaps identified before that correction. Owner feedback on the revised one-minute flow remains the next acceptance step.

The official page still requires an already working Arc mainnet project and evaluates Arc relevance, technical credibility, build quality and further potential. It does not ask for these three tools or reward a stated feature count. No organizer acceptance of ArcMirror is claimed. A Vercel deployment plus read-only mainnet access is real software evidence, but does not establish organizer acceptance or satisfy the owner's separate Lab/five-demo requirement. The final application remains unsubmitted.
