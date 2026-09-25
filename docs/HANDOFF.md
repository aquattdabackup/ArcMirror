# Continue ArcMirror with another AI

## Paste this into the next coding agent

> Continue this ArcMirror workspace. First read AGENTS.md, architecture.md, task_on_progress.md and docs/HANDOFF.md; consult docs/product-brief.vi.md only for requirement details. Preserve the owner's software-first authorization. Check git status/log and the exact current blockers before editing. Continue useful authorized work, make small verified milestone commits and push when credentials permit. Update the project memory and this handoff before stopping. Report progress in Vietnamese. Never claim deployment, mainnet signing or submission without real evidence.

## Current deliverable

The working analyzer, Next.js application, RPC adapter, CLI, mainnet fixtures and locally tested Lab contract are implemented. Implementation commit: **`dc8035c`**. Local build, TypeScript, 37 application tests, 10 spike tests and 16 Foundry tests passed (256 fuzz runs). Read `docs/validation.md` for outputs and actual local browser checks.

The actual browser-generated ERC-20 JSON matched its entire fixture and a fresh mainnet CLI analysis. Browser disk download and clipboard read could not be fully certified on the automated Windows surface. Do not repeat all tests just to understand the project; investigate the remaining release checks at deployment time.

## Continue in this order

1. Inspect `git status --short`, `git log -3 --oneline`, and `git log --oneline origin/main..HEAD`. Preserve local milestone commits. Push only through normal authorized GitHub access; do not bypass approval or use unrelated credentials.
2. Resolve the recorded GitHub authentication outcome in `task_on_progress.md`. The first ordinary push used account `aquattda`, which GitHub denied write access to repository owner `aquattdabackup` (HTTP 403). A noninteractive repository-owner credential retry found no saved login. The owner must log in locally or grant the current account write access. No push has succeeded.
3. Get explicit Vercel destination approval for a new `arcmirror` project in **Luong Tuan's projects** (`luong-tuans-projects-a65355dc`). Do not interpret generic continuation as resolving the previous explicit rejection. See `docs/deployment.md` for ready-to-use root/build settings. CLI login is currently absent.
4. After deployment, perform public anonymous UI/API/mobile/export/explorer smoke checks and record only the real URL and result.
5. When the owner prepares wallets: confirm two immutable public recipients, use local encrypted signing, show exact values/gas before signing, deploy Lab and record five real owner-created scenarios. No wallet or key exists in this repo.
6. Confirm MIT and public builder profile, prepare the grant pack after production/mainnet evidence exists; the owner submits.

## Facts that must survive handoff

- Owner already confirmed no Circle/Arc funding and software-first implementation. Do not re-ask.
- Every meaningful increment now requires a prompt small commit, plus a push when access permits. If push is blocked, report local vs remote clearly.
- Public native example has matching logs, call values and balance changes. ERC-20 example has matching logs/state but zero native call values through a precompile: **needs_review**, never verified.
- No public website, deployed Lab, owner-created demos, npm publication or grant submission exists yet.
- No MIT license has been granted; packages remain private and Solidity UNLICENSED.
- P2 features are deferred. Avoid extra features while release/account steps remain unresolved.

## Where to look

`architecture.md` maps the code. `docs/spike-findings.md` explains the measured Arc behavior. `docs/validation.md` contains checked results. `docs/deployment.md` and `docs/user-setup.md` explain owner-only steps. All important context is now in the repository; the next agent does not need access to the original chat attachment or Codex-specific skill installation.
