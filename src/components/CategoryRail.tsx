"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import type { Category } from "@/lib/types";

export default function CategoryRail({ categories }: { categories: Category[] }) {
  const { t, L } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("shopByCategory")}</h2>
        <Link href="/shop" className="text-sm font-semibold text-accent-strong hover:underline">
          {t("viewAll")}
        </Link>
      </div>
      <div className="rail flex snap-x gap-4 overflow-x-auto pb-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.id}`}
            className="group relative w-40 shrink-0 snap-start overflow-hidden rounded-2xl border border-line sm:w-52"
          >
            <div className="aspect-[4/5] bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={L(c.name)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <span className="absolute bottom-3 start-3 text-sm font-bold text-white">
              {L(c.name)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
