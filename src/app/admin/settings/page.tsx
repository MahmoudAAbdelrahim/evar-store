"use client";

import { useEffect, useState } from "react";
import { loadSettings, saveSettings } from "@/lib/admin";
import { useLocale } from "@/lib/i18n";

const inputCls =
  "w-full rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent";

export default function AdminSettings() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [s, setS] = useState({ storeName: "", whatsapp: "", doorCost: "", pickupCost: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cur = loadSettings();
    setS({
      storeName: cur.storeName ?? "EVAR",
      whatsapp: cur.whatsapp ?? "",
      doorCost: String(cur.doorCost ?? 80),
      pickupCost: String(cur.pickupCost ?? 40),
    });
  }, []);

  const save = () => {
    saveSettings({
      storeName: s.storeName.trim() || undefined,
      whatsapp: s.whatsapp.trim() || undefined,
      doorCost: Math.max(0, parseInt(s.doorCost, 10) || 0),
      pickupCost: Math.max(0, parseInt(s.pickupCost, 10) || 0),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "إعدادات الموقع" : "Site Settings"}</h1>

      <section className="space-y-4 rounded-2xl border border-line bg-surface p-5">
        <div>
          <label className="mb-1 block text-xs text-ink-soft">{ar ? "اسم المتجر" : "Store name"}</label>
          <input value={s.storeName} onChange={(e) => setS({ ...s, storeName: e.target.value })} dir="ltr" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-ink-soft">{ar ? "رقم واتساب" : "WhatsApp number"}</label>
          <input value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value })} dir="ltr" inputMode="tel" placeholder="2010XXXXXXXX" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-ink-soft">{ar ? "شحن للباب (ج.م)" : "Door delivery (EGP)"}</label>
            <input value={s.doorCost} onChange={(e) => setS({ ...s, doorCost: e.target.value })} inputMode="numeric" dir="ltr" className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-ink-soft">{ar ? "استلام من البريد (ج.م)" : "Pickup (EGP)"}</label>
            <input value={s.pickupCost} onChange={(e) => setS({ ...s, pickupCost: e.target.value })} inputMode="numeric" dir="ltr" className={inputCls} />
          </div>
        </div>
      </section>

      <button
        onClick={save}
        className="rounded-full bg-accent px-10 py-3 text-sm font-bold text-accent-ink hover:opacity-90"
      >
        {saved ? (ar ? "✓ اتسيف" : "✓ Saved") : ar ? "حفظ الإعدادات" : "Save settings"}
      </button>
    </div>
  );
}
