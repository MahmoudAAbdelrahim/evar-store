"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLocale } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export default function ProductRail({
  titleKey,
  products,
  href,
}: {
  titleKey: DictKey;
  products: Product[];
  href: string;
}) {
  const { t } = useLocale();
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t(titleKey)}</h2>
        <Link href={href} className="text-sm font-semibold text-accent-strong hover:underline">
          {t("viewAll")}
        </Link>
      </div>
      <div className="rail flex snap-x gap-4 overflow-x-auto pb-2">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
