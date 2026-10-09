// Public, owner-signed mainnet captures. These labels are not a live RPC response.
export const ownerEvidenceUrl = "https://github.com/aquattdabackup/ArcMirror/blob/main/docs/mainnet-evidence.md";
export const labAddress = "0xa64439ea7c88d56e2888c377d55ae3e174b415c1";
export const ownerDemos = [
  {
    id: "erc20", title: "Two logs, one payment",
    question: "Why would adding both records overstate the transfer?",
    hash: "0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d",
    status: "confirmed_success", evidenceLevel: "needs_review",
  },
  {
    id: "native", title: "A payment and its gas",
    question: "How much reached the recipient, and what did the sender pay in fees?",
    hash: "0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981",
    status: "confirmed_success", evidenceLevel: "verified",
  },
  {
    id: "forwarding", title: "One amount through three hops",
    question: "Follow the contracts without confusing hop totals with money received.",
    hash: "0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41",
    status: "confirmed_success", evidenceLevel: "verified",
  },
  {
    id: "batch", title: "Two recipients in one transaction",
    question: "Separate funding the contract from the payouts it sends.",
    hash: "0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8",
    status: "confirmed_success", evidenceLevel: "verified",
  },
  {
    id: "failed", title: "A failed payment still costs gas",
    question: "See why a verified analysis can describe a failed transaction.",
    hash: "0x87b456003ef9194f99c71ea5af94273ba242beaffaaeacc4fb466885a2b47fe1",
    status: "confirmed_failed", evidenceLevel: "verified",
  },
] as const;

export const featuredOwnerDemo = {
  ...ownerDemos[0], amountExact: "0.001", naiveExact: "0.002", gasExact: "0.001052167",
};
export const ownerDemoHref = (demo: (typeof ownerDemos)[number]) =>
  `/tx/${demo.hash}${demo.id === "erc20" ? "?compare=1#double-count" : ""}`;
