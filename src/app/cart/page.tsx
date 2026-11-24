"use client";

import Link from "next/link";
import { itemKey, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";

export default function CartPage() {
  const { t, L, locale } = useLocale();
  const { items, updateQty, remove, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface-2 text-ink-soft">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" strokeLinejoin="round" />
            <path d="M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold">{t("cartEmpty")}</h1>
        <p className="mt-2 text-sm text-ink-soft">{t("cartEmptySub")}</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-bg"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 font-display text-3xl font-bold">{t("cartTitle")}</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* items */}
        <div className="space-y-4">
          {items.map((i) => {
            const k = itemKey(i);
            return (
              <div key={k} className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
                <Link href={`/product/${i.slug}`} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={i.image}
                    alt={L(i.name)}
                    className="aspect-[4/5] w-24 rounded-xl object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/product/${i.slug}`} className="text-sm font-bold hover:text-accent">
                        {L(i.name)}
                      </Link>
                      <div className="mt-1 flex items-center gap-2 text-xs text-ink-soft">
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-line"
                          style={{ backgroundColor: i.colorHex }}
                        />
                        {i.color} · {i.size}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(k)}
                      className="text-xs text-ink-soft transition-colors hover:text-red-500"
                    >
                      {t("remove")}
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-line">
                      <button onClick={() => updateQty(k, i.qty - 1)} className="px-3 py-1.5">−</button>
                      <span className="min-w-7 text-center text-sm font-bold">{i.qty}</span>
                      <button onClick={() => updateQty(k, i.qty + 1)} className="px-3 py-1.5">+</button>
                    </div>
                    <span className="text-sm font-bold text-accent-strong">
                      {formatPrice(i.price * i.qty, locale)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* summary */}
        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-4 font-bold">{t("orderSummary")}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">{t("subtotal")}</span>
              <span className="font-semibold">{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">{t("shipping")}</span>
              <span className="text-xs text-ink-soft">{t("shippingCalc")}</span>
            </div>
            <div className="my-3 border-t border-line" />
            <div className="flex justify-between text-base font-bold">
              <span>{t("total")}</span>
              <span className="text-accent-strong">{formatPrice(subtotal, locale)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-5 block rounded-full bg-ink py-3 text-center text-sm font-semibold text-bg transition-transform hover:scale-[1.01]"
          >
            {t("checkout")}
          </Link>
          <Link
            href="/shop"
            className="mt-2 block rounded-full border border-line py-3 text-center text-sm font-semibold transition-colors hover:border-accent"
          >
            {t("continueShopping")}
          </Link>
        </aside>
      </div>
    </div>
  );
}
