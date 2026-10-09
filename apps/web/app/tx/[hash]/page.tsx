import { TransactionReport } from "../../../components/report";
import { getReport, admit } from "../../../lib/service";
import { headers } from "next/headers";
import { analyze } from "../../../../../packages/core/src/index";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function generateMetadata() {
  return { title: "Transaction evidence" };
}
export default async function TransactionPage({
  params,
  searchParams,
}: {
  params: Promise<{ hash: string }>;
  searchParams: Promise<{ compare?: string | string[] }>;
}) {
  const { hash } = await params;
  const compareOnLoad = (await searchParams).compare === "1";
  const client = (await headers()).get("x-real-ip") ?? "anonymous";
  let result;
  try {
    if (!admit(client)) throw Error("rate limit");
    result = await getReport(hash);
  } catch {
    result = {
      source: "live" as const,
      report: analyze({
        chainId: 5042,
        txHash: hash,
        transaction: null,
        receipt: null,
        rpcError: true,
      }),
    };
  }
  return <TransactionReport key={`${hash}:${compareOnLoad}`} initial={result} compareOnLoad={compareOnLoad} />;
}
