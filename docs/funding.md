# Funding the demo burner

Owner context (2026-09-25): MetaMask is available; the owner does not yet have USDC. Four public addresses are already supplied locally. Only the burner needs funding to proceed with deployment; the recipients and reward address do not need a deposit for this preparation stage.

## Add Arc mainnet to MetaMask

Use the [official Arc network guide](https://docs.arc.io/arc/references/connect-to-arc). Its manual configuration is:

| Field | Value |
| --- | --- |
| Network name | Arc |
| RPC | https://rpc.mainnet.arc.io |
| Chain ID | 5042 |
| Currency symbol | USDC |
| Explorer | https://explorer.arc.io |

Choose the burner account supplied by the owner. Adding a network does not fund it. Arc mainnet uses real native USDC for gas; testnet faucet tokens do not fund this deployment.

## Starting without USDC

[Arc Portal](https://portal.arc.io/) is linked from [Arc's official Portal announcement](https://www.arc.io/blog/arc-portal-the-easiest-place-to-get-started-on-arc). It supports connecting an existing wallet and funding through third-party onramp providers. The owner can connect MetaMask using only the burner and inspect the funding offer for USDC on Arc mainnet. Provider, region, payment-method availability, verification, minimum purchase and fees must be checked in the actual quote; none has been confirmed for this owner.

Before paying, inspect the complete recipient address, destination network, total cash charge, provider fees and USDC actually received. No payment, purchase, identity verification, wallet connection or signing has been performed by the agent. Do not grant an agent spending delegation just to fund this demo.

The preliminary deployment-only gas calculation is documented in [wallet preflight](wallet-preflight.md): about 0.0162172227 USDC at the observed gas price, excluding demos and purchase/transfer fees. It is not a total funding recommendation or price guarantee. If a provider's minimum or fees are unsuitable, stop and share the non-sensitive quote details before choosing another route.

If the owner later obtains USDC on another supported chain, [Circle's USDC Bridge](https://bridge.usdc.com/) lists Arc support. That route requires checking the actual source asset, chain, source gas and bridge quote; it is not currently actionable for an owner with no USDC.

After a deposit is confirmed on Arc mainnet, tell the agent or provide its public transaction hash. The next step is to refresh the burner balance, nonce and actual gas estimate, then prepare exact deployment details for owner-local signature. No private key or seed phrase is needed in chat.

## Cost and withdrawal clarification

The owner asked whether personal spending is necessary and whether a $5 deposit can be recovered. **No $5 deposit is required or approved.** The 0.0162172227 USDC figure is a deployment-only simulation at an observed gas price. Total costs still require estimates for five scenarios, the ERC-20 approval, and any funding/withdrawal route. Consumed transaction gas is a cost, including gas used by an intentionally reverted demo; USDC sent to owner-controlled recipient wallets remains owner-controlled principal.

A USDC wallet deposit is not a project fee. The remaining balance can be transferred subject to network fees, but converting it back to cash requires an available off-ramp/exchange and may involve minimum amounts, bridge fees and purchase/sale fees. The [official Portal announcement](https://www.arc.io/blog/arc-portal-the-easiest-place-to-get-started-on-arc), rechecked 2026-09-25, explicitly says off-ramp is not yet available. No end-to-end cash withdrawal route or fee quote has been verified for this owner. Do not promise full recovery of a $5 purchase.

The existing public analyzer can continue reading third-party Arc mainnet transactions without the owner funding a wallet. Local tests and testnet experiments are alternatives to owner-paid mainnet demos, but testnet-only submissions are excluded by the [Microgrants page](https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq). The public requirement list does not specify five owner-created transactions or a dedicated Lab contract; those came from the owner's original brief. A reduced read-only-product submission is an option to discuss, not an eligibility guarantee or an authorized scope change. Do not silently drop the original Lab/demo requirements.
