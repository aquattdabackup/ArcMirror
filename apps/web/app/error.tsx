"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="shell empty-state">
      <h1>That analysis could not finish.</h1>
      <p>Try again, or open a saved example from the home page.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
      <a className="button" href="/">
        Saved examples
      </a>
    </div>
  );
}
