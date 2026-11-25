"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadOrders, loadSettings, useCatalog } from "@/lib/admin";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import type { Order } from "@/lib/types";

export default function AdminOverview() {
  const { L, locale } = useLocale();
  const ar = locale === "ar";
  const products = useCatalog();
  const [orders, setOrders] = useState<Order[]>([]);
  const [threshold, setThreshold] = useState(3);

  useEffect(() => {
    setOrders(loadOrders().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    setThreshold(loadSettings().lowStockThreshold ?? 3);
  }, []);

  const revenue = orders.reduce((n, o) => n + o.total, 0);
  const lowStock = products.flatMap((p) =>
    p.variants
      .filter((v) => v.stock <= threshold)
      .map((v) => ({ product: p, variant: v }))
  );

  const stats = [
    { label: ar ? "المنتجات" : "Products", value: String(products.length), href: "/admin/products" },
    { label: ar ? "الطلبات" : "Orders", value: String(orders.length), href: "/admin/orders" },
    { label: ar ? "إجمالي المبيعات" : "Revenue", value: formatPrice(revenue, locale), href: "/admin/orders" },
    { label: ar ? "مخزون منخفض" : "Low stock", value: String(lowStock.length), href: "/admin/inventory" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">{ar ? "نظرة عامة" : "Overview"}</h1>

      {/* stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-black/5"
          >
            <div className="text-xs text-ink-soft">{s.label}</div>
            <div className="mt-2 font-display text-2xl font-bold text-accent-strong">{s.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* recent orders */}
        <section className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">{ar ? "أحدث الطلبات" : "Recent orders"}</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-accent-strong hover:underline">
              {ar ? "كل الطلبات" : "All orders"}
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-soft">
              {ar ? "لسه مفيش طلبات. جرب اعمل طلب من المتجر وهيظهر هنا." : "No orders yet. Place one from the store and it appears here."}
            </p>
          ) : (
            <div className="divide-y divide-line">
              {orders.slice(0, 5).map((o) => (
                <div key={o.ref} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-mono text-xs font-bold" dir="ltr">{o.ref}</span>
                  <span className="text-ink-soft">{o.customer.name}</span>
                  <span className="font-bold text-accent-strong">{formatPrice(o.total, locale)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* low stock */}
        <section className="rounded-2xl border border-line bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">{ar ? "تنبيهات المخزون المنخفض" : "Low stock alerts"}</h2>
            <Link href="/admin/inventory" className="text-xs font-semibold text-accent-strong hover:underline">
              {ar ? "المخزون" : "Inventory"}
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-soft">
              {ar ? "كل المخزون كويس" : "All stock levels are healthy"}
            </p>
          ) : (
            <div className="divide-y divide-line">
              {lowStock.slice(0, 6).map(({ product, variant }) => (
                <div key={`${product.id}|${variant.color}|${variant.size}`} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{L(product.name)}</span>
                  <span className="text-xs text-ink-soft">{variant.color} · {variant.size}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${variant.stock === 0 ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-600"}`}>
                    {variant.stock === 0 ? (ar ? "خلص" : "Out") : variant.stock}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
