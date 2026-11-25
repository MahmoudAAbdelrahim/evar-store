"use client";

import { useIsAdmin } from "@/components/Providers";

export default function DemoBanner() {
  const isAdmin = useIsAdmin();
  return (
    <div
      role="note"
      className="bg-amber-400 px-3 py-1.5 text-center text-[11px] font-bold leading-5 text-amber-950 sm:text-xs"
    >
      {isAdmin ? (
        <>لوحة تحكم تجريبية للعرض فقط — كل الأرقام والبيانات وهمية · Demo admin dashboard — all data is fictitious</>
      ) : (
        <>نسخة تجريبية للعرض فقط — كل المنتجات والبيانات وهمية ولا يتم تنفيذ أي طلبات حقيقية · Demo preview — fictitious products & data, no real orders</>
      )}
    </div>
  );
}
