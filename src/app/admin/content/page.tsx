"use client";

import { useEffect, useState } from "react";
import { adminNotify, loadContent, saveContent, type ContentOverrides } from "@/lib/admin";
import { useLocale } from "@/lib/i18n";

const inputCls =
  "w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent";

export default function AdminContent() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [c, setC] = useState<ContentOverrides>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setC(loadContent());
  }, []);

  const announce = c.announce || [
    { ar: "شحن لكل المحافظات", en: "Shipping to all governorates" },
    { ar: "الدفع عند الاستلام", en: "Cash on delivery" },
    { ar: "استبدال واسترجاع خلال ١٤ يوم", en: "14-day exchange & returns" },
  ];

  const setAnnounce = (i: number, lang: "ar" | "en", v: string) => {
    const next = announce.map((a, j) => (j === i ? { ...a, [lang]: v } : a));
    setC({ ...c, announce: next });
  };

  const save = () => {
    saveContent(c);
    adminNotify();
    window.dispatchEvent(new Event("storage"));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const field = (
    label: string,
    key: "heroKicker" | "heroTitle1" | "heroTitle2" | "heroSub",
    lang: "ar" | "en"
  ) => (
    <div>
      <label className="mb-1 block text-xs text-ink-soft">{label}</label>
      <input
        value={c[key]?.[lang] ?? ""}
        onChange={(e) => setC({ ...c, [key]: { ar: c[key]?.ar ?? "", en: c[key]?.en ?? "", [lang]: e.target.value } })}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={inputCls}
      />
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "محتوى الصفحة الرئيسية" : "Homepage Content"}</h1>

      {/* announcement bar */}
      <section className="space-y-4 rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-bold">{ar ? "الشريط العلوي" : "Announcement bar"}</h2>
        {announce.map((a, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-2">
            <input value={a.ar} onChange={(e) => setAnnounce(i, "ar", e.target.value)} className={inputCls} />
            <input value={a.en} onChange={(e) => setAnnounce(i, "en", e.target.value)} dir="ltr" className={inputCls} />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <label className="text-xs text-ink-soft">{ar ? "لون الشريط:" : "Bar color:"}</label>
          <input
            type="color"
            value={c.barColor || "#1c1917"}
            onChange={(e) => setC({ ...c, barColor: e.target.value })}
            className="h-8 w-12 cursor-pointer rounded-lg border border-line bg-bg"
          />
          {c.barColor && (
            <button onClick={() => setC({ ...c, barColor: undefined })} className="text-xs text-ink-soft hover:text-red-500">
              {ar ? "الافتراضي" : "Reset"}
            </button>
          )}
        </div>
      </section>

      {/* hero */}
      <section className="space-y-4 rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-bold">{ar ? "قسم الهيرو" : "Hero section"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {field(ar ? "الشارة (عربي)" : "Kicker (AR)", "heroKicker", "ar")}
          {field(ar ? "الشارة (إنجليزي)" : "Kicker (EN)", "heroKicker", "en")}
          {field(ar ? "العنوان الأول (عربي)" : "Title 1 (AR)", "heroTitle1", "ar")}
          {field(ar ? "العنوان الأول (إنجليزي)" : "Title 1 (EN)", "heroTitle1", "en")}
          {field(ar ? "العنوان التاني (عربي)" : "Title 2 (AR)", "heroTitle2", "ar")}
          {field(ar ? "العنوان التاني (إنجليزي)" : "Title 2 (EN)", "heroTitle2", "en")}
        </div>
        {field(ar ? "الوصف (عربي)" : "Subtitle (AR)", "heroSub", "ar")}
        {field(ar ? "الوصف (إنجليزي)" : "Subtitle (EN)", "heroSub", "en")}
        <p className="text-[11px] text-ink-soft">
          {ar ? "اترك الحقل فاضي عشان يرجع للنص الأصلي." : "Leave a field empty to use the original text."}
        </p>
      </section>

      <button
        onClick={save}
        className="rounded-full bg-accent px-10 py-3 text-sm font-bold text-accent-ink hover:opacity-90"
      >
        {saved ? (ar ? "✓ اتسيف — شوف الصفحة الرئيسية" : "✓ Saved — check the homepage") : ar ? "حفظ المحتوى" : "Save content"}
      </button>
    </div>
  );
}
