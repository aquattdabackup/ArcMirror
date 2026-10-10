# Owner demo resilience release - October 10, 2026

The five owner-created mainnet demonstrations now open as explicitly labelled saved reports, with original capture dates and provenance. They remain readable/downloadable without RPC. Re-verify live and API live=1 still fetch current evidence; errors remain errors, and the existing displayed report survives a failed refresh. Arbitrary hashes continue to require RPC. The three third-party examples remain separate.

## Published release and checks

- Runtime change abaf6e7; deployment source 4ee1f21c25a25fdb208677580d9597671cab2e43.
- READY deployment dpl_EN2XfCpfkGGVWgFR8Xe8uGxdeCu3, [public website](https://arcmirror-six.vercel.app).
- [Structured evidence](../evidence/releases/2026-10-10-snapshots/checks.json): 81 local application tests, typecheck/build, 20 normal local browser checks and 6 controlled server-RPC-outage checks pass.
- Final production: **22 browser checks pass** on desktop/mobile emulation, including unmocked live refresh and actual JSON downloads. All five saved AND all five live API reports match their complete recorded reports; saved provenance/dates match. HTTP/API smoke passes.
- [CI 38025858747](https://github.com/aquattdabackup/ArcMirror/actions/runs/38025858747) at 784ef4c passes application and contract jobs, including the new outage step. Subsequent deployment-source changes are documentation only.
- A first outage-test attempt used the wrong selector for Needs Review; corrected before the six passing checks. An earlier production browser run was interrupted by the tool-session change; the completed rerun above supplies the final result.
- Vercel initially returned Not authorized. Account/project reads succeeded, and an unchanged retry deployed successfully. No permission, security, billing or RPC configuration change was made; the upstream internal cause is unknown.

Only default demo report delivery changed. The analyzer, contracts, owner transactions, general transaction headline, hash-first hero and right illustration are preserved. ERC-20 remains needs_review; the intentionally failed transaction remains confirmed_failed. No new blockchain transaction or payment was needed. Saved evidence is not a live response, independent consensus, or an uptime guarantee. Process-local caching/rate limits and physical-device/load-test limits remain disclosed.

## Remaining owner actions

The [complete corrected YouTube description](../youtube-description.txt) has three working links. The browser later connected, and anonymous playback started; the full public transcript was read and covers all five demos, three tools and evidence limitations. The session is signed out, so the description has **not** been changed on the channel. Full audiovisual accuracy is not certified. See the [updated video review](../video-review-2026-10-09.vi.md).

Owner confirmed no independent tester feedback yet. Do not invent testimonials or claim measured comprehension. Final form/terms/declarations and submission remain owner actions. These limits do not erase the demonstrated working-mainnet evidence, but technical readiness does not guarantee program acceptance or selection.
