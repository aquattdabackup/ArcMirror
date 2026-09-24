import { admit, getReport } from "../../../../lib/service";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function GET(
  request: Request,
  { params }: { params: Promise<{ hash: string }> },
) {
  const { hash } = await params;
  if (!admit(request.headers.get("x-real-ip") ?? "anonymous"))
    return Response.json(
      {
        ok: false,
        error: {
          code: "rate_limited",
          message: "Too many requests. Wait a minute and try again.",
        },
      },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  try {
    const result = await getReport(
      hash,
      new URL(request.url).searchParams.get("live") === "1",
    );
    const state = result.report.status;
    return Response.json(
      { ok: true, ...result },
      {
        status:
          state === "unsupported_format"
            ? 400
            : state === "rpc_error"
              ? 503
              : state === "not_found"
                ? 404
                : 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return Response.json(
      {
        ok: false,
        error: {
          code: "busy",
          message: "All analysis slots are busy. Try again shortly.",
        },
      },
      { status: 503 },
    );
  }
}
