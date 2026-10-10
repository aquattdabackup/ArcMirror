import { ALGORITHM_VERSION } from "../../../../../packages/core/src/index";
import { examples } from "../../../lib/examples";
import { ownerSnapshots } from "../../../lib/owner-snapshots";
export function GET() {
  return Response.json({
    status: "ok",
    chainId: 5042,
    algorithmVersion: ALGORITHM_VERSION,
    snapshots: examples.length,
    ownerSnapshots: ownerSnapshots.length,
    rpc: "checked_on_demand",
    walletRequired: false,
  });
}
