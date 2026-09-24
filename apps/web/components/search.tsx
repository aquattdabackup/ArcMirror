"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Arrow } from "./icons";
export function Search({ compact = false }: { compact?: boolean }) {
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  function submit(e: FormEvent) {
    e.preventDefault();
    const value = hash.trim();
    if (!/^0x[0-9a-fA-F]{64}$/.test(value)) {
      setError(
        "Enter a full transaction hash: 0x followed by 64 hexadecimal characters.",
      );
      return;
    }
    setError("");
    router.push("/tx/" + value.toLowerCase());
  }
  return (
    <form className={"search " + (compact ? "compact" : "")} onSubmit={submit}>
      <label htmlFor="tx-hash">
        {compact
          ? "Analyze another transaction"
          : "Paste an Arc mainnet transaction hash"}
      </label>
      <div className="search-box">
        <span className="hash-sign" aria-hidden="true">
          #
        </span>
        <input
          id="tx-hash"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="0x... transaction hash"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "hash-error" : undefined}
        />
        <button className="button primary" type="submit">
          Analyze <Arrow />
        </button>
      </div>
      {error ? (
        <p className="form-error" id="hash-error" role="alert">
          {error}
        </p>
      ) : (
        <p className="form-hint">
          Read-only. No wallet connection. No payment required.
        </p>
      )}
    </form>
  );
}
