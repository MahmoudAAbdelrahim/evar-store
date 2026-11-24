"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import type { Order } from "@/lib/types";

export default function OrderPage() {
  const { ref } = useParams<{ ref: string }>();
  const { t, L, locale } = useLocale();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("evar-orders");
      if (saved) {
        const orders = JSON.parse(saved);
        if (orders[ref]) setOrder(orders[ref]);
      }
    } catch {
      // ignore
    }
  }, [ref]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="font-display text-3xl font-bold">{t("orderThanks")}</h1>

      <div className="mt-6 inline-block rounded-2xl border border-line bg-surface px-8 py-4">
        <div className="text-xs text-ink-soft">{t("orderRef")}</div>
        <div className="mt-1 font-mono text-xl font-bold tracking-wider text-accent-strong" dir="ltr">
          {ref}
        </div>
      </div>

      <p className="mt-6 text-sm leading-8 text-ink-soft">{t("orderNext")}</p>

      {order && (
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6 text-start">
          <div className="space-y-3">
            {order.items.map((i) => (
              <div key={`${i.productId}|${i.color}|${i.size}`} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image} alt="" className="h-12 w-10 rounded-lg object-cover" />
                <div className="flex-1 text-xs">
                  <div className="font-semibold">{L(i.name)}</div>
                  <div className="text-ink-soft">{i.color} · {i.size} · ×{i.qty}</div>
                </div>
                <span className="text-xs font-bold">{formatPrice(i.price * i.qty, locale)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 text-sm font-bold">
            <span>{t("total")}</span>
            <span className="text-accent-strong">{formatPrice(order.total, locale)}</span>
          </div>
          <div className="mt-2 text-xs text-ink-soft">{t("cod")}</div>
        </div>
      )}

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-bg"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
