# Workbench commit map

The owner requested a finer commit breakdown on 2026-09-26. This is a retrospective organization of existing work, not additional features or a claim of new development on earlier dates.

## Preserved history

- Original published commits: `a2787c8`, `aebf0c6`, `3ee528f`.
- Reconstruction base: `65a227b`.
- Detailed branch: `history/workbench-granular`.
- 55 nonempty commits, each organized around a source, test, UI, package, documentation or evidence concern.
- Merge into main: `a5bb53ad6955c541c2f1e187f04e46d339e0f30c`. Original published commits remain ancestors. No force-push, backdating or revert/reapply sequence was used.
- The reconstructed tracked tree exactly equals the original release tree: `2c5676694c04d95df1b0a22a5e134a805a8e815e`.
- No product change or redeployment was required. Production still corresponds to `aebf0c6`.

## Checks

Each core source/build step compiled the standalone package; each web source/configuration step passed TypeScript checking. Every test increment ran its affected test file. JSON/PNG evidence was checked structurally; source blobs retain original provenance. Every staged diff was checked before committing. The final tree was compared by Git tree identity. The reconstructed checkout also passed all 49 application tests and the full root/web typecheck with its original tracked Next.js references restored. Source/history secret scans passed before publication.

## Detailed commits

| # | Commit | Scope |
| --- | --- | --- |
| 1 | [f1b432c](https://github.com/aquattdabackup/ArcMirror/commit/f1b432cacf3d0de3569598e2a81d7d6c4b56b96f) | docs: record approved feature scope and grant-rule research |
| 2 | [348e665](https://github.com/aquattdabackup/ArcMirror/commit/348e6652b9bb2e42f0d636ea863b4d9fc9d9ea75) | build(core): rewrite TypeScript imports for standalone ESM |
| 3 | [14048ed](https://github.com/aquattdabackup/ArcMirror/commit/14048ed7de644b4ec542d710311bb6c6fe4813cc) | build(web): accept shared TypeScript source imports |
| 4 | [42f1753](https://github.com/aquattdabackup/ArcMirror/commit/42f1753ac99d20e6204c72e28c361206878651c0) | feat(core): parse exact USDC and decompose decimal remainders |
| 5 | [5047ae8](https://github.com/aquattdabackup/ArcMirror/commit/5047ae8ab39b652ece97c130ef72e2eb43cb56d0) | test(core): cover single-unit precision and bigint bounds |
| 6 | [f73d83f](https://github.com/aquattdabackup/ArcMirror/commit/f73d83f67f245e44d4575476698fd3914893451a) | feat(csv): parse bounded payout lists with strict validation |
| 7 | [79ccf97](https://github.com/aquattdabackup/ArcMirror/commit/79ccf97300336dcc0b703f15552605677fa1b8c1) | test(csv): reject malformed rows, duplicate ids and oversized lists |
| 8 | [3fe4480](https://github.com/aquattdabackup/ArcMirror/commit/3fe4480f131b840688cb75db81b5c0a66d1975bc) | feat(core): match expected payouts to unique canonical movements |
| 9 | [b27db1a](https://github.com/aquattdabackup/ArcMirror/commit/b27db1ad2d620de244615e7f2ff217e1a89fb4d6) | test(reconcile): preserve evidence grades and separate gas |
| 10 | [45ca472](https://github.com/aquattdabackup/ArcMirror/commit/45ca4727c1a692405f41f9fc22163e9ecc2c0399) | test(reconcile): prevent duplicate expectations from reusing movements |
| 11 | [87ea31d](https://github.com/aquattdabackup/ArcMirror/commit/87ea31d049856d108b7fc43b9317e2099ea794fc) | test(reconcile): prioritize exact matches and detect one-unit differences |
| 12 | [a00a83b](https://github.com/aquattdabackup/ArcMirror/commit/a00a83b9223b1443839fc566e5f322b830a8a2c5) | test(reconcile): require both payer and recipient to match |
| 13 | [7bc18c1](https://github.com/aquattdabackup/ArcMirror/commit/7bc18c195e1939e8fab93e4817cf2b25237091b7) | test(reconcile): reject wrong-chain, failed and incomplete reports |
| 14 | [1a58854](https://github.com/aquattdabackup/ArcMirror/commit/1a58854f3185683c1593f550cccc7d1ae038eebe) | feat(package): expose exact precision utilities |
| 15 | [be056bb](https://github.com/aquattdabackup/ArcMirror/commit/be056bb015295c9524b1d28211e95fc635fa11ac) | feat(package): expose payout CSV parsing and reconciliation |
| 16 | [d4532ee](https://github.com/aquattdabackup/ArcMirror/commit/d4532eea5ea884cd3fe0e4eaadd03f3cde4a5501) | feat(web): bound local file reads before parsing |
| 17 | [9dfa606](https://github.com/aquattdabackup/ArcMirror/commit/9dfa606bb82514ae2e77d3ca62a7697637680795) | feat(web): export local tool results as JSON files |
| 18 | [d062643](https://github.com/aquattdabackup/ArcMirror/commit/d06264379a96f509be6bac3edf6d3bab7e8cfb58) | style(tools): add responsive forms, evidence tables and result states |
| 19 | [0853ad8](https://github.com/aquattdabackup/ArcMirror/commit/0853ad8e11543a36b3607afd3aa674a30642bf75) | feat(web): add the interactive payout reconciliation form |
| 20 | [eaf5b8b](https://github.com/aquattdabackup/ArcMirror/commit/eaf5b8b8c32c9eaa66d575dd8403c4f1db953cef) | feat(routes): serve payout reconciliation with transaction prefill |
| 21 | [5e17092](https://github.com/aquattdabackup/ArcMirror/commit/5e1709219d04b3ef500d3b7631d334c7f68a0254) | feat(routes): introduce the tools landing page |
| 22 | [4f2f778](https://github.com/aquattdabackup/ArcMirror/commit/4f2f778e0fdf465e636225cd44c903ff35cd29a4) | feat(nav): expose the workbench in main navigation |
| 23 | [2e95475](https://github.com/aquattdabackup/ArcMirror/commit/2e95475aa8be9ab52641407101d456fadaf8d681) | feat(reports): link transaction evidence to CSV reconciliation |
| 24 | [0271ddf](https://github.com/aquattdabackup/ArcMirror/commit/0271ddf502d5b12a2e836652a834fc4d968bb94f) | feat(core): validate report structure and canonical digest integrity |
| 25 | [4b848c4](https://github.com/aquattdabackup/ArcMirror/commit/4b848c4aa33c5aeb40129822b9d49051b391d961) | test(inspect): accept original mainnet exports across key ordering |
| 26 | [f6e494c](https://github.com/aquattdabackup/ArcMirror/commit/f6e494cf24aaf7c6180484ac33ea85fc5a4061ff) | test(inspect): distinguish digest integrity from report authenticity |
| 27 | [74943a7](https://github.com/aquattdabackup/ArcMirror/commit/74943a74b3229c2e671a89380f4d81371096d348) | test(inspect): reject unsupported and oversized report inputs |
| 28 | [80616cf](https://github.com/aquattdabackup/ArcMirror/commit/80616cf7d6b6d7a0b1d0c46de622190b5501e663) | feat(core): compare report fields with bounded JSON-pointer output |
| 29 | [49f350e](https://github.com/aquattdabackup/ArcMirror/commit/49f350ec907baf8acb9b193a118a4d4f0902e516) | test(compare): locate evidence changes and unrelated transactions |
| 30 | [5da9029](https://github.com/aquattdabackup/ArcMirror/commit/5da902944711c971ae2ac0c1da2ae93482028b17) | test(compare): cap large field-difference output |
| 31 | [d07377e](https://github.com/aquattdabackup/ArcMirror/commit/d07377ed11cacd001d7eeacf8986932fb5d37f4f) | feat(package): export the report inspection and comparison API |
| 32 | [28f26b6](https://github.com/aquattdabackup/ArcMirror/commit/28f26b6eb2b32ac6915a5519b7ed143c772acf69) | docs(core): document payout and precision package entry points |
| 33 | [10a5ff9](https://github.com/aquattdabackup/ArcMirror/commit/10a5ff9110f459783e5f17addbb9d52d56ec9b22) | docs(core): document report inspection limits and comparison output |
| 34 | [f5f0908](https://github.com/aquattdabackup/ArcMirror/commit/f5f09085d3bdd2aebdc6a4213afe05d7d8d88421) | style(inspect): lay out digest summaries and comparison tables |
| 35 | [c9abc99](https://github.com/aquattdabackup/ArcMirror/commit/c9abc99c9284d517e39c9640a48efe9c1e63edb7) | feat(web): inspect local reports and compare fresh RPC evidence |
| 36 | [95e2170](https://github.com/aquattdabackup/ArcMirror/commit/95e2170e966ee3ee72041956a0dfcdffdb63ec26) | feat(routes): publish the report inspector page |
| 37 | [d98bd3c](https://github.com/aquattdabackup/ArcMirror/commit/d98bd3c35ef655953f3ebc37ef8aa16cac02f625) | style(dust): visualize precision digits and accumulated remainders |
| 38 | [00917c6](https://github.com/aquattdabackup/ArcMirror/commit/00917c6846bc87e8def7db407d26d6d58be1760e) | feat(web): add exact interactive Dust Lab calculations |
| 39 | [e17c89d](https://github.com/aquattdabackup/ArcMirror/commit/e17c89d763f1ab974c3910cfb1e84872a86856e7) | feat(routes): publish the Dust Lab page |
| 40 | [62df8ee](https://github.com/aquattdabackup/ArcMirror/commit/62df8ee0628ccd8e7c6573564583535785335c51) | feat(tools): present all three workbench workflows |
| 41 | [d64244b](https://github.com/aquattdabackup/ArcMirror/commit/d64244b2839d10e4b8d9e5f4333ffc21a9483874) | feat(home): introduce the evidence workbench |
| 42 | [b7df106](https://github.com/aquattdabackup/ArcMirror/commit/b7df106eff17fb010db441e0249b7d17113a3f6e) | feat(reports): link JSON exports to the report inspector |
| 43 | [7f2e097](https://github.com/aquattdabackup/ArcMirror/commit/7f2e097903fb52ecba16c8f6d05068c8fc417192) | test(smoke): check all public tool routes |
| 44 | [0ccc724](https://github.com/aquattdabackup/ArcMirror/commit/0ccc7247ceb10ee5e18c41e3dbc9db0241e1603e) | docs(readme): explain the new workflows and their boundaries |
| 45 | [7c045f6](https://github.com/aquattdabackup/ArcMirror/commit/7c045f6d72b202026a8fe2b405b69517d8dab0d9) | docs(architecture): map local tool processing and package exports |
| 46 | [c859177](https://github.com/aquattdabackup/ArcMirror/commit/c85917763d9bda24ac9ce69ddd5a250543fa3684) | docs(grant): update the application description and reviewer tour |
| 47 | [fbaa401](https://github.com/aquattdabackup/ArcMirror/commit/fbaa401bafc41f0f21f674070391ba99950ba336) | docs(deploy): record the production workbench release |
| 48 | [441ad2a](https://github.com/aquattdabackup/ArcMirror/commit/441ad2a24365a8a2212384e41451ae7d20bdf646) | docs(validation): record local and public workbench checks |
| 49 | [4d79feb](https://github.com/aquattdabackup/ArcMirror/commit/4d79feb4d0c0014a26e6b86da9d683f257b4ebf4) | evidence(deploy): preserve release identity and public API smoke |
| 50 | [e064bd4](https://github.com/aquattdabackup/ArcMirror/commit/e064bd41c41d246c7f4a1121870586cee0f67294) | evidence(csv): archive duplicate-match export and production view |
| 51 | [b6b29c7](https://github.com/aquattdabackup/ArcMirror/commit/b6b29c7e2688c22b7bbd7e8167b3f544ba54adf2) | evidence(inspect): archive fresh comparison and mobile inspection |
| 52 | [c05fb0f](https://github.com/aquattdabackup/ArcMirror/commit/c05fb0f843453ef5e86c5938a0f325d7522fac58) | evidence(dust): archive exact calculation export and production view |
| 53 | [11fc63a](https://github.com/aquattdabackup/ArcMirror/commit/11fc63a13b8cccd2769992c12b70bd122c954e5a) | evidence(tools): record integrated browser checks and workbench view |
| 54 | [655ec62](https://github.com/aquattdabackup/ArcMirror/commit/655ec62abb27ddd46ffbbd25d233404b358eb8c1) | docs(handoff): preserve release state and remaining owner actions |
| 55 | [a301753](https://github.com/aquattdabackup/ArcMirror/commit/a3017537488fa5d4a2a4eb01e8d3f54761a1bb9a) | docs(progress): record completed expansion and exact next work |
