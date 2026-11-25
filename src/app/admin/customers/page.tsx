"use client";

import { useEffect, useState } from "react";
import { loadOrders } from "@/lib/admin";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";

interface Row {
  name: string;
  phone: string;
  governorate: string;
  orders: number;
  total: number;
}

export default function AdminCustomers() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const map = new Map<string, Row>();
    for (const o of loadOrders()) {
      const k = o.customer.phone;
      const cur = map.get(k) || {
        name: o.customer.name,
        phone: o.customer.phone,
        governorate: o.customer.governorate,
        orders: 0,
        total: 0,
      };
      cur.orders += 1;
      cur.total += o.total;
      map.set(k, cur);
    }
    setRows([...map.values()].sort((a, b) => b.total - a.total));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "العملاء" : "Customers"}</h1>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-line bg-surface py-16 text-center text-sm text-ink-soft">
          {ar ? "بيانات العملاء بتتجمع من الطلبات." : "Customer data is collected from orders."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-130 text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-ink-soft">
                <th className="px-4 py-3 text-start font-semibold">{ar ? "الاسم" : "Name"}</th>
                <th className="px-4 py-3 text-start font-semibold">{ar ? "الموبايل" : "Phone"}</th>
                <th className="px-4 py-3 text-start font-semibold">{ar ? "المحافظة" : "Governorate"}</th>
                <th className="px-4 py-3 text-center font-semibold">{ar ? "الطلبات" : "Orders"}</th>
                <th className="px-4 py-3 text-end font-semibold">{ar ? "إجمالي المشتريات" : "Total spent"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.phone}>
                  <td className="px-4 py-3 font-semibold">{r.name}</td>
                  <td className="px-4 py-3 text-ink-soft" dir="ltr">{r.phone}</td>
                  <td className="px-4 py-3 text-ink-soft">{r.governorate}</td>
                  <td className="px-4 py-3 text-center">{r.orders}</td>
                  <td className="px-4 py-3 text-end font-bold text-accent-strong">{formatPrice(r.total, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
