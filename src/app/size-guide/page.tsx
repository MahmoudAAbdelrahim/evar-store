"use client";

import { useLocale } from "@/lib/i18n";

const rows = [
  { size: "S", chest: "88-94", waist: "74-80", hips: "90-96", length: "66" },
  { size: "M", chest: "94-100", waist: "80-86", hips: "96-102", length: "69" },
  { size: "L", chest: "100-106", waist: "86-92", hips: "102-108", length: "72" },
  { size: "XL", chest: "106-114", waist: "92-100", hips: "108-116", length: "75" },
  { size: "XXL", chest: "114-122", waist: "100-108", hips: "116-124", length: "78" },
];

export default function SizeGuidePage() {
  const { t } = useLocale();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">{t("sizeGuideTitle")}</h1>
      <p className="mt-2 text-sm text-ink-soft">{t("sizeGuideSub")}</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-105 text-center text-sm">
          <thead>
            <tr className="bg-surface-2 text-xs font-bold">
              <th className="px-4 py-3">{t("size")}</th>
              <th className="px-4 py-3">{t("chest")}</th>
              <th className="px-4 py-3">{t("waist")}</th>
              <th className="px-4 py-3">{t("hips")}</th>
              <th className="px-4 py-3">{t("length")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.size} className="border-t border-line">
                <td className="px-4 py-3 font-bold text-accent-strong">{r.size}</td>
                <td className="px-4 py-3" dir="ltr">{r.chest}</td>
                <td className="px-4 py-3" dir="ltr">{r.waist}</td>
                <td className="px-4 py-3" dir="ltr">{r.hips}</td>
                <td className="px-4 py-3" dir="ltr">{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 rounded-2xl bg-accent/10 px-5 py-4 text-sm text-accent-strong">
        {t("sizeTip")}
      </p>
    </div>
  );
}
