import { examples } from "../../../lib/examples";
export function GET() {
  return Response.json(
    examples.map(({ report, ...e }) => ({
      ...e,
      amountExact: report.totals.grossMovementExact,
      evidenceLevel: report.evidenceLevel,
      href: "/tx/" + e.hash,
      explorer: "https://explorer.arc.io/tx/" + e.hash,
    })),
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
