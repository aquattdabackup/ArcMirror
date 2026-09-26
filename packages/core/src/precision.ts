import { exactAmount } from "./index.ts";

export const MAX_UINT256 = (1n << 256n) - 1n;
export const MICRO_SCALE = 10n ** 12n;
/** Plain, nonnegative decimal USDC. Never round or parse through Number. */
export function parseUsdc(value: string): bigint {
  if (value.length > 100 || !/^(0|[1-9][0-9]*)(\.[0-9]{1,18})?$/.test(value))
    throw Error(
      "Use a nonnegative decimal amount with at most 18 decimal places; no commas or exponents.",
    );
  const [whole, fraction = ""] = value.split(".");
  const raw = BigInt(whole) * 10n ** 18n + BigInt(fraction.padEnd(18, "0"));
  if (raw > MAX_UINT256) throw Error("Amount exceeds the uint256 limit.");
  return raw;
}
export function precisionBreakdown(value: string, count = 1) {
  if (!Number.isInteger(count) || count < 1 || count > 1000000)
    throw Error("Repeat count must be a whole number from 1 to 1,000,000.");
  const raw = parseUsdc(value);
  const micro = raw / MICRO_SCALE;
  const remainder = raw % MICRO_SCALE;
  const n = BigInt(count);
  return {
    rawNative18: raw.toString(),
    exact: exactAmount(raw),
    interfaceUnits6: micro.toString(),
    truncated6:
      (micro / 1000000n).toString() +
      "." +
      (micro % 1000000n).toString().padStart(6, "0"),
    dustRaw18: remainder.toString(),
    dustExact: exactAmount(remainder),
    count,
    totalExact: exactAmount(raw * n),
    totalAfterPerAmountTruncation: exactAmount((raw - remainder) * n),
    accumulatedDustExact: exactAmount(remainder * n),
  };
}
