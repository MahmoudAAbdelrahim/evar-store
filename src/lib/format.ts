import type { Locale } from "./types";

export function formatPrice(amount: number, locale: Locale): string {
  const n = amount.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return locale === "ar" ? `${n} ج.م` : `EGP ${n}`;
}

export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
