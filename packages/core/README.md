# @arcmirror/core

Pure TypeScript analysis of Arc mainnet USDC evidence. No network, clock, UI or wallet dependencies. All raw amounts are decimal strings in reports; arithmetic uses bigint. Inputs use Ethereum JSON-RPC hex quantities.

```sh
npm ci
npm run build --workspace @arcmirror/core
```

From the repository (ESM):

```js
import { readFileSync } from 'node:fs';
import { analyze, reportDigest } from '@arcmirror/core';
const vector = JSON.parse(readFileSync('vectors/0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87.json', 'utf8'));
const report = analyze(vector.input);
console.log(report.evidenceLevel, report.digest === reportDigest(report));
```

`analyze(Bundle)` accepts `chainId`, `txHash`, raw `transaction`, `receipt`, optional `block`, `callTrace`, `stateDiff` and `rpcError`. It returns a versioned `Report`; types are emitted to `dist`. See `src/types.ts` for the full schema. Invalid or missing financial evidence never produces a successful verification assertion.

Native log emitters are authoritative for movements. Interface logs corroborate them one-to-one using exact scaled values and nearest log index. Receipt fees are separate. A `verified` report means three supported representations agree, not that the RPC is independently trustworthy. Native USDC precompile changes are outside call-value coverage and require review.

Build output, declarations and this README can be packaged independently with `npm pack --workspace @arcmirror/core`. Publishing is deliberately disabled by `private: true` pending the owner's npm publication approval. Do not remove that guard automatically.

Licensed under [MIT](LICENSE).

Tests run from repository root with `npm test`; real fixtures live in `vectors/`. No memo parsing or all-history support is claimed.
