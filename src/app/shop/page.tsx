"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/lib/admin";
import { useLocale } from "@/lib/i18n";
import { categories, collections } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

type SortKey = "featured" | "new" | "price-low" | "price-high";

function ShopInner() {
  const { t, L } = useLocale();
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") ?? "all");
  const [collection, setCollection] = useState(params.get("collection") ?? "all");
  const [sort, setSort] = useState<SortKey>((params.get("sort") as SortKey) || "featured");
  const [q, setQ] = useState(params.get("q") ?? "");
  const products = useCatalog();

  const filtered = useMemo(() => {
    let list: Product[] = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (collection !== "all") list = list.filter((p) => p.collections.includes(collection));
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.ar.includes(needle) ||
          p.name.en.toLowerCase().includes(needle) ||
          p.description.ar.includes(needle) ||
          p.description.en.toLowerCase().includes(needle)
      );
    }
    switch (sort) {
      case "new":
        list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [category, collection, sort, q]);

  const selectCls =
    "rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-accent";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 font-display text-3xl font-bold">{t("shopTitle")}</h1>

      {/* filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("search")}
          className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-accent sm:w-56"
        />
        <label className="sr-only">{t("filterCategory")}</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
          <option value="all">{t("filterCategory")}: {t("all")}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{L(c.name)}</option>
          ))}
        </select>
        <label className="sr-only">{t("filterCollection")}</label>
        <select value={collection} onChange={(e) => setCollection(e.target.value)} className={selectCls}>
          <option value="all">{t("filterCollection")}: {t("all")}</option>
          {collections.map((c) => (
            <option key={c.id} value={c.id}>{L(c.name)}</option>
          ))}
        </select>
        <label className="sr-only">{t("sortBy")}</label>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectCls}>
          <option value="featured">{t("sortFeatured")}</option>
          <option value="new">{t("sortNew")}</option>
          <option value="price-low">{t("sortPriceLow")}</option>
          <option value="price-high">{t("sortPriceHigh")}</option>
        </select>
        <span className="text-xs text-ink-soft">
          {filtered.length} {t("resultsCount")}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-ink-soft">{t("noResults")}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopInner />
    </Suspense>
  );
}
