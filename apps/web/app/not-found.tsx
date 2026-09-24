import Link from "next/link";
export default function NotFound() {
  return (
    <div className="shell empty-state">
      <div className="eyebrow">404 / PAGE NOT FOUND</div>
      <h1>No trail here.</h1>
      <p>Start with a mainnet transaction hash or a saved example.</p>
      <Link className="button primary" href="/">
        Back to ArcMirror
      </Link>
    </div>
  );
}
