ï»¿# Existing tools and honest overlap

Checked: 2026-09-24. This is a documentation survey, not a benchmark or an exhaustive feature audit. No novelty or exclusivity claim is justified.

| Tool | Documented overlap | ArcMirror's implemented workflow |
| --- | --- | --- |
| [Blockscout Arc Explorer](https://explorer.arc.io) | Transaction, address and block inspection; the public homepage identifies itself as Arc Mainnet. | A focused explanation of each amount and conservative pairing report. Production amount/source views have been checked; Blockscout shows the same transaction and fee. |
| [ArcScan by Etherscan](https://info.etherscan.com/what-is-arcscan/) | Searchable transactions, token transfers, status, addresses and verified code; Etherscan documents chain 5042. Its linked official domain is [arc.etherscan.io](https://arc.etherscan.io). | Re-runnable per-transaction report with explicit evidence coverage and digest. Do not claim explorers lack transfer analysis. |
| [Dune Arc transfers](https://docs.dune.com/data-catalog/curated/token-transfers/arc/arc-token-transfers) | `tokens_arc.transfers` already sources native USDC from EIP-7708 and excludes the 6-decimal interface to prevent double counting. | Explain and corroborate individual log pairs interactively; provide reusable test inputs and transaction-local reconciliation. Deduplication itself is not new. |
| [Bitquery Arc API](https://www.bitquery.io/blockchains/arc-blockchain-api) | Documented transfers, native/token balances, calls, events and fund-flow APIs. Documentation states Arc availability. | A narrow open report format and local verification path. Provider coverage was not tested with an API account. |
| [Alchemy Arc API](https://www.alchemy.com/docs/arc/arc-api-overview) | Lists Transfers, Debug and Trace APIs on Arc, alongside JSON-RPC. [Network URLs](https://www.alchemy.com/docs/reference/node-supported-chains) include Arc mainnet. | RPC-agnostic explanation and digest comparison. Exact plan limits and data normalization were not tested; do not infer them from the API list. |

The differentiation to demonstrate is the combination of understandable source attribution, exact integer accounting, explicit unsupported cases, deterministic re-verification, and published test vectors. These capabilities are implemented and tested locally and on the public production website. Owner-created mainnet Lab scenarios remain pending.
