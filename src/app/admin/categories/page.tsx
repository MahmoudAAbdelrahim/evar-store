"use client";

import { useEffect, useState } from "react";
import { adminNotify, loadTaxonomy, saveTaxonomy, type Taxon } from "@/lib/admin";
import { useLocale } from "@/lib/i18n";

const inputCls =
  "w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent";

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
      .replace(/^-+|-+$/g, "") || `item-${Date.now()}`
  );
}

function TaxonEditor({
  title,
  items,
  onChange,
  withTagline,
}: {
  title: string;
  items: Taxon[];
  onChange: (items: Taxon[]) => void;
  withTagline?: boolean;
}) {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [newAr, setNewAr] = useState("");
  const [newEn, setNewEn] = useState("");

  const update = (id: string, patch: Partial<Taxon>) =>
    onChange(items.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const add = () => {
    if (!newAr.trim() && !newEn.trim()) return;
    const id = slugify(newEn || newAr);
    if (items.some((t) => t.id === id)) return;
    onChange([
      ...items,
      {
        id,
        name: { ar: newAr.trim() || newEn.trim(), en: newEn.trim() || newAr.trim() },
        tagline: withTagline ? { ar: "", en: "" } : undefined,
        image: items[0]?.image ?? "",
        custom: true,
      },
    ]);
    setNewAr("");
    setNewEn("");
  };

  return (
    <section className="space-y-4 rounded-2xl border border-line bg-surface p-5">
      <h2 className="font-bold">{title}</h2>
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-line p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
            <input
              value={t.name.ar}
              onChange={(e) => update(t.id, { name: { ...t.name, ar: e.target.value } })}
              className={`${inputCls} w-40`}
            />
            <input
              value={t.name.en}
              onChange={(e) => update(t.id, { name: { ...t.name, en: e.target.value } })}
              dir="ltr"
              className={`${inputCls} w-40`}
            />
            {withTagline && (
              <>
                <input
                  value={t.tagline?.ar ?? ""}
                  placeholder={ar ? "وصف قصير (عربي)" : "Tagline (AR)"}
                  onChange={(e) => update(t.id, { tagline: { ar: e.target.value, en: t.tagline?.en ?? "" } })}
                  className={`${inputCls} w-36`}
                />
                <input
                  value={t.tagline?.en ?? ""}
                  placeholder="Tagline (EN)"
                  dir="ltr"
                  onChange={(e) => update(t.id, { tagline: { ar: t.tagline?.ar ?? "", en: e.target.value } })}
                  className={`${inputCls} w-36`}
                />
              </>
            )}
            <label className="flex items-center gap-1.5 text-xs text-ink-soft">
              <input
                type="checkbox"
                checked={!!t.hidden}
                onChange={(e) => update(t.id, { hidden: e.target.checked })}
              />
              {ar ? "إخفاء" : "Hidden"}
            </label>
            {t.custom && (
              <button
                onClick={() => onChange(items.filter((x) => x.id !== t.id))}
                className="rounded-full border border-line px-3 py-1 text-xs font-semibold hover:border-red-400 hover:text-red-500"
              >
                {ar ? "حذف" : "Delete"}
              </button>
            )}
            <span className="text-[10px] text-ink-soft" dir="ltr">{t.id}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <input value={newAr} onChange={(e) => setNewAr(e.target.value)} placeholder={ar ? "اسم جديد (عربي)" : "New name (AR)"} className={`${inputCls} w-44`} />
        <input value={newEn} onChange={(e) => setNewEn(e.target.value)} placeholder="New name (EN)" dir="ltr" className={`${inputCls} w-44`} />
        <button onClick={add} className="rounded-full bg-accent px-5 py-2 text-xs font-bold text-accent-ink hover:opacity-90">
          {ar ? "+ إضافة" : "+ Add"}
        </button>
      </div>
    </section>
  );
}

export default function AdminCategories() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [categories, setCategories] = useState<Taxon[]>([]);
  const [collections, setCollections] = useState<Taxon[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const t = loadTaxonomy();
    setCategories(t.categories);
    setCollections(t.collections);
  }, []);

  const save = () => {
    saveTaxonomy({ categories, collections });
    adminNotify();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "الأقسام والمجموعات" : "Categories & Collections"}</h1>
      <TaxonEditor title={ar ? "الأقسام" : "Categories"} items={categories} onChange={setCategories} />
      <TaxonEditor title={ar ? "المجموعات" : "Collections"} items={collections} onChange={setCollections} withTagline />
      <div className="flex items-center gap-3">
        <button onClick={save} className="rounded-full bg-accent px-10 py-3 text-sm font-bold text-accent-ink hover:opacity-90">
          {saved ? (ar ? "✓ اتسيف" : "✓ Saved") : ar ? "حفظ التعديلات" : "Save changes"}
        </button>
        <span className="text-xs text-ink-soft">
          {ar ? "التعديلات بتظهر فورًا على المتجر بعد الحفظ." : "Changes appear on the storefront right after saving."}
        </span>
      </div>
    </div>
  );
}
