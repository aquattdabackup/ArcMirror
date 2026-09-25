# Focused product expansion

Owner approved on 2026-09-25: payout CSV reconciliation, then local report inspection/comparison and Dust Lab. Funding/signing can wait while software work proceeds.

## Program fit

Rechecked the [official Arc Microgrants page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq) on 2026-09-25. It accepts prototypes, tiny apps and experimental infrastructure, including hackathon continuations. It evaluates Arc relevance, technical credibility, quality and further potential. It requires a working mainnet project at submission; it states no minimum/maximum feature count or prohibition on improvements before submitting. We infer these focused additions fit the published scope; the organizer has not explicitly approved ArcMirror or guaranteed an award. Updates after submission are not explicitly addressed, and rolling review means we should deploy and verify the advertised features before submitting. The registration form remains behind human verification; its additional terms are not certified here.

## Acceptance criteria

1. Reconcile an expected CSV against one Arc transaction. Match payer, recipient and exact amount one-to-one; preserve duplicate payments; flag mismatches, missing and unassigned movements. Keep gas separate and Needs Review visible. CSV stays in the browser. No payout execution or invoice-identity proof.
2. Inspect downloaded JSON locally: bounded schema validation, canonical digest check and field comparison. A recomputed digest is not authenticity; users may explicitly request fresh mainnet evidence. No automatic file upload.
3. Dust Lab: exact 18/6 decimal decomposition, truncation remainder and repeated-amount illustration. Clearly label calculations as simulation and link to measured mainnet evidence.

No claim of exclusive deduplication novelty: [Dune already deduplicates the two representations](https://docs.dune.com/data-catalog/curated/token-transfers/arc/arc-token-transfers). The product distinction is an accessible workflow from a payment expectation to inspectable transaction evidence and reproducible results.
