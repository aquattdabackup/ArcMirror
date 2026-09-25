# ArcMirror agent instructions

## Start here

Read `architecture.md`, `task_on_progress.md`, and `docs/HANDOFF.md` before exploring code. Consult `docs/product-brief.vi.md` for the original owner specification; later owner decisions below override its original ordering. Use targeted searches and inspect only relevant modules. Do not restart completed work or invent deployment evidence.

## Owner decisions and workflow

- Owner confirmed ArcMirror has never received Circle/Arc funding.
- Owner explicitly authorized building/testing software first and preparing wallets later. Do not ask these questions again or block independent software work on wallets.
- UI, README and submission content are English. Progress updates to the owner are Vietnamese.
- **Commit each completed, coherent milestone promptly.** Do not accumulate a whole session's implementation into one late commit. Run relevant checks before the milestone commit. Avoid committing knowingly broken code; if interrupted, label an intentional WIP checkpoint and describe its limits.
- **Push milestone commits to the existing authorized origin when access permits.** Never force-push or rewrite published history without a specific instruction. If authentication/approval blocks a push, keep the local commit and report its exact hash and blocker; do not say it is on GitHub.
- After material work, update `task_on_progress.md`; update `architecture.md` only for durable structural changes. Keep `docs/HANDOFF.md` concise and usable by another AI without this chat.
- Before ending, switching agents or approaching a usage limit: record actual checks, current Git state, unresolved decisions and the exact next action. Include the handoff update in a small commit. Do not store secrets in memory files.
- If available, apply the `project-memory-targeted-context` skill. The portable instructions in this file must still work for an AI without that skill installed.

## Boundaries

- Do not request keys, seeds, passwords or tokens in chat. Wallet signing stays local to the owner.
- No funds move until exact chain, recipients, amounts and gas have been reviewed and signed by the owner.
- No MIT license, npm publication or final grant submission without the required owner action. License remains undecided.
- Vercel source upload was explicitly rejected by automatic approval review for missing destination/account approval. Do not bypass via another deploy tool or Git-triggered deployment. Obtain explicit permission for the existing team/project destination in `docs/deployment.md`.
- Public third-party transactions are valid example evidence, but not the owner's five requested mainnet demos.
- Native call-value traces cannot verify USDC precompile mutations. Preserve `needs_review` where coverage is incomplete.
- Secret-scan staged source and full Git history before publication. Ignore build outputs, downloaded tools, credentials and environment files.

## Commands

Use Node22+ and npm workspaces. On this Windows machine use `npm.cmd`, not blocked `npm.ps1`.

- `npm test`: analyzer, vectors, RPC adapter.
- `npm run test:spike`: frozen read-only evidence.
- `npm run typecheck` and `npm run build`.
- `forge test -vv` from `contracts` (local binary may be in `.local-tools/foundry`).
- `npm start`, then `node scripts/smoke.mjs http://127.0.0.1:3000`.
- Repeat or broaden tests only for new changes, failures or unresolved concerns.

See `docs/validation.md` for real evidence and limitations. Do not label local checks as public production checks.
