"use client";

import { useState } from "react";
import {
  adminNotify,
  loadOverrides,
  saveOverrides,
  useCatalog,
  type Overrides,
} from "@/lib/admin";
import { discountPercent, formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import { categories } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

const inputCls =
  "w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent";

export default function AdminProducts() {
  const { L, locale } = useLocale();
  const ar = locale === "ar";
  const products = useCatalog();
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ nameAr: "", nameEn: "", price: "", compareAt: "" });
  const [saved, setSaved] = useState(false);

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      nameAr: p.name.ar,
      nameEn: p.name.en,
      price: String(p.price),
      compareAt: p.compareAtPrice ? String(p.compareAtPrice) : "",
    });
    setSaved(false);
  };

  const save = () => {
    if (!editing) return;
    const overrides: Overrides = loadOverrides();
    const price = Number(form.price);
    overrides[editing.id] = {
      ...overrides[editing.id],
      nameAr: form.nameAr.trim() || undefined,
      nameEn: form.nameEn.trim() || undefined,
      price: Number.isFinite(price) && price > 0 ? price : undefined,
      compareAtPrice: form.compareAt.trim() ? Number(form.compareAt) : null,
    };
    saveOverrides(overrides);
    adminNotify();
    setSaved(true);
    setTimeout(() => setEditing(null), 700);
  };

  const resetAll = () => {
    window.localStorage.removeItem("evar-admin-product-overrides");
    adminNotify();
    // force local refresh
    window.dispatchEvent(new Event("storage"));
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">{ar ? "المنتجات والأسعار" : "Products & Pricing"}</h1>
        <button onClick={resetAll} className="text-xs text-ink-soft hover:text-red-500">
          {ar ? "إعادة تعيين التعديلات" : "Reset edits"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-180 text-sm">
          <thead>
            <tr className="border-b border-line text-start text-xs text-ink-soft">
              <th className="px-4 py-3 text-start font-semibold">{ar ? "المنتج" : "Product"}</th>
              <th className="px-4 py-3 text-start font-semibold">{ar ? "القسم" : "Category"}</th>
              <th className="px-4 py-3 text-start font-semibold">{ar ? "السعر" : "Price"}</th>
              <th className="px-4 py-3 text-start font-semibold">{ar ? "قبل الخصم" : "Compare-at"}</th>
              <th className="px-4 py-3 text-start font-semibold">{ar ? "الخصم" : "Discount"}</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => {
              const off = discountPercent(p.price, p.compareAtPrice);
              const cat = categories.find((c) => c.id === p.category);
              return (
                <tr key={p.id} className="align-middle">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt="" className="h-10 w-8 rounded-lg object-cover" />
                      <span className="font-semibold">{L(p.name)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{cat ? L(cat.name) : p.category}</td>
                  <td className="px-4 py-3 font-bold text-accent-strong">{formatPrice(p.price, locale)}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {p.compareAtPrice ? formatPrice(p.compareAtPrice, locale) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {off ? (
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent-strong">
                        {off}%
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button
                      onClick={() => openEdit(p)}
                      className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold hover:border-accent hover:text-accent"
                    >
                      {ar ? "تعديل" : "Edit"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-4 font-bold">{ar ? "تعديل المنتج" : "Edit product"}</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-ink-soft">{ar ? "الاسم بالعربي" : "Arabic name"}</label>
                <input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-ink-soft">{ar ? "الاسم بالإنجليزي" : "English name"}</label>
                <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} dir="ltr" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-ink-soft">{ar ? "السعر (ج.م)" : "Price (EGP)"}</label>
                  <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} inputMode="numeric" dir="ltr" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-ink-soft">{ar ? "قبل الخصم (اختياري)" : "Compare-at (opt.)"}</label>
                  <input value={form.compareAt} onChange={(e) => setForm({ ...form, compareAt: e.target.value })} inputMode="numeric" dir="ltr" className={inputCls} />
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={save}
                className="flex-1 rounded-full bg-accent py-2.5 text-sm font-bold text-accent-ink hover:opacity-90"
              >
                {saved ? (ar ? "✓ اتسيف" : "✓ Saved") : ar ? "حفظ" : "Save"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="rounded-full border border-line px-6 py-2.5 text-sm font-semibold"
              >
                {ar ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
