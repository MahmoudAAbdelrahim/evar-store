"use client";

import { useEffect, useState } from "react";
import { loadOrders, saveOrderStatus } from "@/lib/admin";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import type { Order } from "@/lib/types";

const STATUSES = ["pending_confirmation", "confirmed", "shipped", "delivered", "cancelled"] as const;

export default function AdminOrders() {
  const { L, locale } = useLocale();
  const ar = locale === "ar";
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    setOrders(loadOrders().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }, []);

  const statusLabel = (s: string) =>
    ({
      pending_confirmation: ar ? "في انتظار التأكيد" : "Pending",
      confirmed: ar ? "تم التأكيد" : "Confirmed",
      shipped: ar ? "تم الشحن" : "Shipped",
      delivered: ar ? "تم التسليم" : "Delivered",
      cancelled: ar ? "ملغي" : "Cancelled",
    })[s] || s;

  const statusColor = (s: string) =>
    s === "delivered"
      ? "bg-emerald-500/10 text-emerald-600"
      : s === "cancelled"
        ? "bg-red-500/10 text-red-500"
        : s === "shipped"
          ? "bg-sky-500/10 text-sky-600"
          : s === "confirmed"
            ? "bg-accent/15 text-accent-strong"
            : "bg-amber-500/10 text-amber-600";

  const setStatus = (ref: string, status: string) => {
    saveOrderStatus(ref, status);
    setOrders((os) => os.map((o) => (o.ref === ref ? { ...o, status: status as Order["status"] } : o)));
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "الطلبات" : "Orders"}</h1>

      {orders.length === 0 ? (
        <p className="rounded-2xl border border-line bg-surface py-16 text-center text-sm text-ink-soft">
          {ar ? "لسه مفيش طلبات. أي طلب من المتجر هيظهر هنا على طول." : "No orders yet. Store orders show up here instantly."}
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.ref} className="rounded-2xl border border-line bg-surface">
              <button
                onClick={() => setOpen(open === o.ref ? null : o.ref)}
                className="flex w-full flex-wrap items-center gap-3 px-5 py-4 text-start"
              >
                <span className="font-mono text-xs font-bold" dir="ltr">{o.ref}</span>
                <span className="text-sm font-semibold">{o.customer.name}</span>
                <span className="text-xs text-ink-soft" dir="ltr">{o.customer.phone}</span>
                <span className={`ms-auto rounded-full px-3 py-1 text-xs font-bold ${statusColor(o.status)}`}>
                  {statusLabel(o.status)}
                </span>
                <span className="text-sm font-bold text-accent-strong">{formatPrice(o.total, locale)}</span>
              </button>

              {open === o.ref && (
                <div className="border-t border-line px-5 py-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="text-sm">
                      <h3 className="mb-2 text-xs font-bold text-ink-soft">{ar ? "بيانات العميل" : "Customer"}</h3>
                      <p>{o.customer.name}</p>
                      <p dir="ltr" className="text-ink-soft">{o.customer.phone}{o.customer.phone2 ? ` · ${o.customer.phone2}` : ""}</p>
                      {o.customer.email && <p dir="ltr" className="text-ink-soft">{o.customer.email}</p>}
                      <p className="mt-1 text-ink-soft">
                        {o.customer.governorate} · {o.customer.city} · {o.customer.address}
                      </p>
                      {o.customer.notes && <p className="mt-1 text-xs italic text-ink-soft">{o.customer.notes}</p>}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xs font-bold text-ink-soft">{ar ? "المنتجات" : "Items"}</h3>
                      {o.items.map((i) => (
                        <div key={`${i.productId}|${i.color}|${i.size}`} className="flex justify-between py-1 text-sm">
                          <span>{L(i.name)} · {i.color} · {i.size} ×{i.qty}</span>
                          <span className="font-semibold">{formatPrice(i.price * i.qty, locale)}</span>
                        </div>
                      ))}
                      <div className="mt-2 flex justify-between border-t border-line pt-2 text-sm">
                        <span className="text-ink-soft">{ar ? "الشحن" : "Shipping"}</span>
                        <span>{formatPrice(o.shippingCost, locale)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-ink-soft">{ar ? "تغيير الحالة:" : "Set status:"}</span>
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(o.ref, s)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                          o.status === s
                            ? "bg-accent text-accent-ink"
                            : "border border-line hover:border-accent"
                        }`}
                      >
                        {statusLabel(s)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
