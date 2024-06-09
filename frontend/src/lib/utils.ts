import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: number): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp * 1000) / 1000);

  const times = [
    { unit: "year", value: 60 * 60 * 24 * 365 },
    { unit: "month", value: 60 * 60 * 24 * 30 },
    { unit: "week", value: 60 * 60 * 24 * 7 },
    { unit: "day", value: 60 * 60 * 24 },
    { unit: "hour", value: 60 * 60 },
    { unit: "minute", value: 60 },
    { unit: "second", value: 1 },
  ];

  for (const { unit, value } of times) {
    const diff = Math.floor(diffInSeconds / value);
    if (diff >= 1) {
      return rtf.format(-diff, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return "just now";
}

/**
 * Truncate a hash to a shorter format.
 * @param hash - The hash string to truncate.
 * @param startLength - The number of characters to keep at the start.
 * @param endLength - The number of characters to keep at the end.
 * @returns The truncated hash string.
 */
export function truncateHash(
  hash: string,
  startLength: number = 4,
  endLength: number = 4,
): string {
  if (hash.length <= startLength + endLength) {
    return hash;
  }
  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
}
