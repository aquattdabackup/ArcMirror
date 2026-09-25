# ArcMirrorLab

A small experiment contract with two immutable recipients, a 0.01 USDC per-call cap, a reentrancy guard, exact ERC-20 allowances, native forwarding, duplicate transfers, dust, batch and an explicit revert path. It has no owner/admin withdrawal role. Forced native balances may only be swept to the fixed first recipient.

**Not deployed.** Public recipient addresses and user-controlled signing are pending. No deployment address or transaction hash exists yet. Source is licensed under [MIT](../LICENSE), approved by the owner on 2026-09-25.

Run from this directory with Foundry:

```
forge test -vv
```

The unit-test token is a conventional isolated mock. It does not reproduce Arc's shared native/ERC-20 balance, system logs, EVM differences or mainnet behavior. The same scenarios must still be exercised on real Arc using a funded burner, with amounts, recipients and gas shown before every signature. Prefer encrypted Foundry keystores or the user's wallet. No private key is accepted in source or chat.

The explicit failure function always reverts by contract design. This avoids relying on an untested assumption about native sends to zero. It is not evidence of a failed mainnet transaction until the owner signs a bounded probe.

A deployment runbook will pin the compiler settings, constructor addresses, chain 5042, estimated gas and bytecode before asking the user to sign. Only after confirmation should a deployment artifact be added under `deployments/`.
