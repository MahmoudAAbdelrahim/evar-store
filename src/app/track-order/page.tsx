"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import type { Order } from "@/lib/types";

const STEPS = ["statusPending", "statusConfirmed", "statusShipped", "statusDelivered"] as const;

export default function TrackOrderPage() {
  const { t, L, locale } = useLocale();
  const [ref, setRef] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setOrder(null);
    try {
      const saved = window.localStorage.getItem("evar-orders");
      const orders = saved ? JSON.parse(saved) : {};
      const found = orders[ref.trim().toUpperCase()];
      if (found) setOrder(found);
    } catch {
      // ignore
    }
  };

  // demo: every stored order is at step 0 (pending phone confirmation)
  const step = 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">{t("trackOrderTitle")}</h1>
      <p className="mt-2 text-sm text-ink-soft">{t("trackOrderSub")}</p>

      <div className="mt-4 rounded-2xl border border-amber-400 bg-amber-50 p-4 text-xs leading-6 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        نسخة تجريبية: التتبع بيعرض بس الطلبات اللي اتعملت من نفس المتصفح، وكلها بيانات عرض وهمية. · Demo: tracking only shows orders placed in this browser; all data is fictitious.
      </div>

      <form onSubmit={lookup} className="mt-6 flex gap-2">
        <input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder={t("enterRef")}
          dir="ltr"
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-mono outline-none placeholder:font-body focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02]"
        >
          {t("trackBtn")}
        </button>
      </form>

      {searched && !order && (
        <p className="mt-6 rounded-2xl border border-line bg-surface p-5 text-center text-sm text-ink-soft">
          {t("orderNotFound")}
        </p>
      )}

      {order && (
        <div className="mt-8 space-y-6">
          {/* status timeline */}
          <ol className="relative space-y-0">
            {STEPS.map((k, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={k} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span className={`absolute start-[13px] top-7 h-full w-0.5 ${done ? "bg-accent" : "bg-line"}`} />
                  )}
                  <span
                    className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      done
                        ? "border-accent bg-accent text-accent-ink"
                        : current
                          ? "border-accent bg-accent/15 text-accent-strong"
                          : "border-line bg-surface text-ink-soft"
                    }`}
                  >
                    {done ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className={`h-2 w-2 rounded-full ${current ? "bg-accent" : "bg-line"}`} />
                    )}
                  </span>
                  <div>
                    <div className={`text-sm font-bold ${current ? "text-accent-strong" : ""}`}>{t(k)}</div>
                    {current && <div className="mt-1 text-xs text-ink-soft">{t("finalNote")}</div>}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* order card */}
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-accent-strong" dir="ltr">{order.ref}</span>
              <span className="text-xs text-ink-soft">
                {new Date(order.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-GB")}
              </span>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
