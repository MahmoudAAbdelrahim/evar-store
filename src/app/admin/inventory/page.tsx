"use client";

import { useEffect, useState } from "react";
import {
  adminNotify,
  loadOverrides,
  loadSettings,
  saveOverrides,
  saveSettings,
  useCatalog,
} from "@/lib/admin";
import { useLocale } from "@/lib/i18n";

export default function AdminInventory() {
  const { L, locale } = useLocale();
  const ar = locale === "ar";
  const products = useCatalog();
  const [threshold, setThreshold] = useState(3);
  const [alertEmail, setAlertEmail] = useState(true);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [savedKey, setSavedKey] = useState("");

  useEffect(() => {
    setThreshold(loadSettings().lowStockThreshold ?? 3);
  }, []);

  const key = (pid: string, color: string, size: string) => `${pid}|${color}|${size}`;

  const saveStock = (pid: string, color: string, size: string) => {
    const k = key(pid, color, size);
    const val = edits[k];
    if (val === undefined) return;
    const n = Math.max(0, parseInt(val, 10) || 0);
    const overrides = loadOverrides();
    const cur = overrides[pid] || {};
    overrides[pid] = {
      ...cur,
      variantStock: { ...(cur.variantStock || {}), [`${color}|${size}`]: n },
    };
    saveOverrides(overrides);
    setEdits((e) => {
      const next = { ...e };
      delete next[k];
      return next;
    });
    setSavedKey(k);
    setTimeout(() => setSavedKey(""), 1200);
  };

  const changeThreshold = (v: string) => {
    const n = Math.max(0, parseInt(v, 10) || 0);
    setThreshold(n);
    saveSettings({ ...loadSettings(), lowStockThreshold: n });
    adminNotify();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "إدارة المخزون" : "Inventory"}</h1>

      {/* low stock settings */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-ink-soft">{ar ? "حد التنبيه للمخزون المنخفض:" : "Low stock alert threshold:"}</span>
          <input
            value={threshold}
            onChange={(e) => changeThreshold(e.target.value)}
            inputMode="numeric"
            dir="ltr"
            className="w-16 rounded-lg border border-line bg-bg px-2 py-1.5 text-center text-sm font-bold outline-none focus:border-accent"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={alertEmail}
            onChange={(e) => setAlertEmail(e.target.checked)}
            className="h-4 w-4 accent-[#a97c50]"
          />
          {ar ? "تنبيه بالبريد الإلكتروني عند انخفاض المخزون" : "Email alert on low stock"}
        </label>
        <span className="text-[11px] text-ink-soft">
          {ar ? "(التنبيه الفعلي هيشتغل مع الباك إند)" : "(live alerts come with the backend)"}
        </span>
      </div>

      {/* inventory table */}
      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images[0]} alt="" className="h-9 w-7 rounded-lg object-cover" />
              <span className="text-sm font-bold">{L(p.name)}</span>
            </div>
            <table className="w-full min-w-130 text-sm">
              <thead>
                <tr className="text-xs text-ink-soft">
                  <th className="px-4 py-2 text-start font-semibold">{ar ? "اللون" : "Color"}</th>
                  {p.sizes.map((s) => (
                    <th key={s} className="px-2 py-2 text-center font-semibold">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {p.colors.map((c) => (
                  <tr key={c.hex}>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 rounded-full border border-line" style={{ backgroundColor: c.hex }} />
                        <span className="text-xs">{L(c.name)}</span>
                      </div>
                    </td>
                    {p.sizes.map((s) => {
                      const v = p.variants.find((x) => x.color === c.name.en && x.size === s);
                      const stock = v?.stock ?? 0;
                      const k = key(p.id, c.name.en, s);
                      const low = stock <= threshold;
                      return (
                        <td key={s} className="px-1 py-2 text-center">
                          <input
                            value={edits[k] ?? String(stock)}
                            onChange={(e) => setEdits({ ...edits, [k]: e.target.value })}
                            onBlur={() => saveStock(p.id, c.name.en, s)}
                            inputMode="numeric"
                            dir="ltr"
                            className={`w-12 rounded-lg border px-1 py-1 text-center text-xs font-bold outline-none focus:border-accent ${
                              savedKey === k
                                ? "border-emerald-500 bg-emerald-500/10"
                                : stock === 0
                                  ? "border-red-500/50 bg-red-500/10 text-red-500"
                                  : low
                                    ? "border-amber-500/50 bg-amber-500/10 text-amber-600"
                                    : "border-line bg-bg"
                            }`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
