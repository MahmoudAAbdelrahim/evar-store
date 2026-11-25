"use client";

import Link from "next/link";
import { useTaxonomy } from "@/lib/admin";
import { useLocale } from "@/lib/i18n";

export default function CollectionsSection() {
  const { L } = useLocale();
  const { collections } = useTaxonomy();
  const visible = collections.filter((c) => !c.hidden);
  return (
    <section id="collections" className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">
        {useLocaleTitle()}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <Link
            key={c.id}
            href={`/shop?collection=${c.id}`}
            className={`group relative overflow-hidden rounded-2xl border border-line ${
              i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="aspect-[16/10] bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={L(c.name)}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10" />
            <div className="absolute bottom-4 start-4">
              <h3 className="font-display text-xl font-bold text-white">{L(c.name)}</h3>
              <p className="mt-1 text-xs text-white/80">{c.tagline ? L(c.tagline) : ""}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function useLocaleTitle() {
  const { t } = useLocale();
  return t("collectionsTitle");
}
