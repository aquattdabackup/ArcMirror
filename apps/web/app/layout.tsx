import type { Metadata } from "next";
import Link from "next/link";
import { Mark, Arrow } from "../components/icons";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "ArcMirror | Every trace accounted for",
    template: "%s | ArcMirror",
  },
  description:
    "Follow USDC on Arc mainnet. Reconcile native and ERC-20 logs, inspect exact gas fees, and re-run the evidence yourself.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header shell">
          <Link href="/" className="brand">
            <Mark />
            ArcMirror<span className="beta">BETA</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/#examples">Examples</Link>
            <Link href="/how-it-works">How it works</Link>
            <a
              className="repo-link"
              href="https://github.com/aquattdabackup/ArcMirror"
              target="_blank"
              rel="noreferrer"
            >
              View source <Arrow />
            </a>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="shell site-footer">
          <div>
            <Link className="brand" href="/">
              <Mark />
              ArcMirror
            </Link>
            <p>One USDC movement. Every trace accounted for.</p>
          </div>
          <div className="footer-note">
            <span>Built for Arc · Chain 5042</span>
            <p>
              Onchain evidence analysis. Not an audit service.
              <br />
              No custody, transaction signing or refund guarantees.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
