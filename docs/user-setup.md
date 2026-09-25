# Remaining owner actions

The owner has confirmed ArcMirror has never received Circle/Arc funding and authorized software implementation before wallet preparation. Both decisions are recorded; they do not need to be asked again.

1. **GitHub access: resolved.** Owner selected aquattdabackup, login is available, repository-local username is configured, and implementation/handoff commits were pushed. No further login action is currently needed.
2. **Hosting approval: resolved.** Owner explicitly approved source upload and production deployment to **Luong Tuan's projects** (`luong-tuans-projects-a65355dc`), project arcmirror. The project is deployed at https://arcmirror-six.vercel.app and both connector/CLI access are available. No further account or destination approval is currently needed.
3. **License/profile: resolved.** Owner approved MIT and [aquattdabackup](https://github.com/aquattdabackup) as the public builder profile on 2026-09-25. MIT is applied in the source; npm publication remains disabled.
4. **Wallet addresses: supplied.** Burner, two distinct recipients and separate reward address passed checksum checks. [Preflight](wallet-preflight.md) found an empty burner on chain 5042. Owner uses MetaMask and has no USDC. Follow [funding steps](funding.md) to inspect an Arc funding offer; actual provider availability and fees still need owner review. Mapping and unsigned deployment data remain in ignored local artifacts; no signature was made.
5. **Sign locally:** before each deployment/demo transaction, review the chain, target, recipient, exact native/ERC-20 amount, gas estimate and maximum cost. Use a local encrypted keystore or your own wallet's signing UI. The website does not sign or hold funds.
6. **Final application:** review the [English draft](application-draft.md), fill its pending fields from actual mainnet evidence, and press Submit yourself. DoraHacks displayed a human-verification step to the automated browser; no form was filled or submitted.

Never send a private key, seed phrase, password, RPC key or hosting token in chat. No paid RPC key is currently required: public dRPC returned both tested tracers. If provider access changes, configure any required key locally or in server hosting settings.
