# Remaining owner actions

The owner has confirmed ArcMirror has never received Circle/Arc funding and authorized software implementation before wallet preparation. Both decisions are recorded; they do not need to be asked again.

1. **Hosting:** approve uploading this project to the existing Vercel team **Luong Tuan's projects** (`luong-tuans-projects-a65355dc`) as a new `arcmirror` project. CLI login may need to be completed interactively. See [deployment](deployment.md) for the automatic approval review blocker and concrete settings.
2. **License/profile:** confirm whether to use MIT and [aquattdabackup](https://github.com/aquattdabackup) as the public builder profile. Neither is inferred from silence.
3. **Before mainnet demo signing:** prepare an Arc-compatible burner wallet funded by you; provide its public address and two distinct recipient addresses you control. Configure the network through the [official guide](https://docs.arc.io/arc/references/connect-to-arc) and verify chain 5042. Keep a separate public reward wallet address for the grant.
4. **Sign locally:** before each deployment/demo transaction, review the chain, target, recipient, exact native/ERC-20 amount, gas estimate and maximum cost. Use a local encrypted keystore or your own wallet's signing UI. The website does not sign or hold funds.
5. **Final application:** review the actual production/mainnet links and press Submit yourself.

Never send a private key, seed phrase, password, RPC key or hosting token in chat. No paid RPC key is currently required: public dRPC returned both tested tracers. If provider access changes, configure any required key locally or in server hosting settings.
