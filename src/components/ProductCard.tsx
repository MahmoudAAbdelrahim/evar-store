"use client";

import Link from "next/link";
import { formatPrice, discountPercent } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { t, L, locale } = useLocale();
  const off = discountPercent(product.price, product.compareAtPrice);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-xl hover:shadow-black/10 sm:w-auto"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={L(product.name)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute start-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold tracking-wide text-bg">
              {t("new")}
            </span>
          )}
          {off && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold tracking-wide text-accent-ink">
              {off}% {t("off")}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-semibold leading-6">{L(product.name)}</h3>

        {/* color swatches */}
        <div className="flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.hex}
              title={L(c.name)}
              className="h-3.5 w-3.5 rounded-full border border-line"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-sm font-bold text-accent-strong">
            {formatPrice(product.price, locale)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-ink-soft line-through">
              {formatPrice(product.compareAtPrice, locale)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-ink-soft">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
            <path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.7 5.8 21.2l1.4-7L2 9.4l7-.8L12 2Z" />
          </svg>
          {product.rating} · {product.reviewsCount} {t("reviews")}
        </div>
      </div>
    </Link>
  );
}
