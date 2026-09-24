import { ALGORITHM_VERSION } from "../../../../../packages/core/src/index";
import { examples } from "../../../lib/examples";
export function GET() {
  return Response.json({
    status: "ok",
    chainId: 5042,
    algorithmVersion: ALGORITHM_VERSION,
    snapshots: examples.length,
    rpc: "checked_on_demand",
    walletRequired: false,
  });
}
