"use client";

import { useState } from "react";
import { adminNotify, loadOverrides, saveOverrides, useCatalog } from "@/lib/admin";
import { discountPercent, formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export default function AdminDiscounts() {
  const { L, locale } = useLocale();
  const ar = locale === "ar";
  const products = useCatalog();
  const [picked, setPicked] = useState<string>("");
  const [pct, setPct] = useState("15");
  const [done, setDone] = useState("");

  const apply = () => {
    const p = products.find((x) => x.id === picked);
    const n = Math.min(90, Math.max(1, parseInt(pct, 10) || 0));
    if (!p || !n) return;
    // base the discount on the current price: compare-at = price / (1 - pct/100)
    const compareAt = Math.round(p.price / (1 - n / 100));
    const overrides = loadOverrides();
    overrides[p.id] = { ...overrides[p.id], compareAtPrice: compareAt };
    saveOverrides(overrides);
    adminNotify();
    setDone(p.id);
    setTimeout(() => setDone(""), 1500);
  };

  const removeDiscount = (p: Product) => {
    const overrides = loadOverrides();
    overrides[p.id] = { ...overrides[p.id], compareAtPrice: null };
    saveOverrides(overrides);
    adminNotify();
  };

  const discounted = products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "الخصومات" : "Discounts"}</h1>

      {/* apply new */}
      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-line bg-surface p-5">
        <div>
          <label className="mb-1 block text-xs text-ink-soft">{ar ? "المنتج" : "Product"}</label>
          <select
            value={picked}
            onChange={(e) => setPicked(e.target.value)}
            className="w-56 rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="">{ar ? "اختار منتج..." : "Pick a product..."}</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{L(p.name)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-ink-soft">{ar ? "نسبة الخصم ٪" : "Discount %"}</label>
          <input
            value={pct}
            onChange={(e) => setPct(e.target.value)}
            inputMode="numeric"
            dir="ltr"
            className="w-20 rounded-xl border border-line bg-bg px-3 py-2 text-center text-sm font-bold outline-none focus:border-accent"
          />
        </div>
        <button
          onClick={apply}
          className="rounded-full bg-accent px-6 py-2 text-sm font-bold text-accent-ink hover:opacity-90"
        >
          {done ? (ar ? "✓ اتطبق" : "✓ Applied") : ar ? "تطبيق الخصم" : "Apply discount"}
        </button>
      </div>

      {/* active discounts */}
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-130 text-sm">
          <thead>
            <tr className="border-b border-line text-xs text-ink-soft">
              <th className="px-4 py-3 text-start font-semibold">{ar ? "المنتج" : "Product"}</th>
              <th className="px-4 py-3 text-start font-semibold">{ar ? "السعر" : "Price"}</th>
              <th className="px-4 py-3 text-start font-semibold">{ar ? "قبل الخصم" : "Compare-at"}</th>
              <th className="px-4 py-3 text-start font-semibold">{ar ? "الخصم" : "Off"}</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {discounted.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-soft">
                  {ar ? "مفيش خصومات شغالة دلوقتي" : "No active discounts"}
                </td>
              </tr>
            )}
            {discounted.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-semibold">{L(p.name)}</td>
                <td className="px-4 py-3 font-bold text-accent-strong">{formatPrice(p.price, locale)}</td>
                <td className="px-4 py-3 text-ink-soft line-through">{formatPrice(p.compareAtPrice!, locale)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent-strong">
                    {discountPercent(p.price, p.compareAtPrice)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-end">
                  <button
                    onClick={() => removeDiscount(p)}
                    className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold hover:border-red-400 hover:text-red-500"
                  >
                    {ar ? "إلغاء الخصم" : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
