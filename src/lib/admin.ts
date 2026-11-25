"use client";

import { useEffect, useState } from "react";
import { categories as baseCategories, collections as baseCollections, products as baseProducts } from "./mock-data";
import type { Localized, Order, Product } from "./types";

/**
 * Demo admin persistence.
 * Product edits, settings and content overrides live in localStorage until the
 * real backend (Node + MySQL + Prisma) replaces this module with API calls.
 */

// ---------- product overrides ----------

export interface ProductOverride {
  price?: number;
  compareAtPrice?: number | null;
  nameAr?: string;
  nameEn?: string;
  variantStock?: Record<string, number>; // "color|size" -> stock
}
export type Overrides = Record<string, ProductOverride>;

const OVERRIDES_KEY = "evar-admin-product-overrides";

export function loadOverrides(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(OVERRIDES_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveOverrides(o: Overrides) {
  window.localStorage.setItem(OVERRIDES_KEY, JSON.stringify(o));
  adminNotify();
}

export function applyOverrides(list: Product[], overrides: Overrides): Product[] {
  return list.map((p) => {
    const ov = overrides[p.id];
    if (!ov) return p;
    return {
      ...p,
      price: ov.price ?? p.price,
      compareAtPrice:
        ov.compareAtPrice === null ? undefined : ov.compareAtPrice ?? p.compareAtPrice,
      name: { ar: ov.nameAr ?? p.name.ar, en: ov.nameEn ?? p.name.en },
      variants: p.variants.map((v) => ({
        ...v,
        stock: ov.variantStock?.[`${v.color}|${v.size}`] ?? v.stock,
      })),
    };
  });
}

export function adminNotify() {
  window.dispatchEvent(new Event("evar-admin"));
}

/** Storefront catalog with admin overrides applied (client components only). */
export function useCatalog(): Product[] {
  const [list, setList] = useState<Product[]>(baseProducts);
  useEffect(() => {
    const apply = () => setList(applyOverrides(baseProducts, loadOverrides()));
    apply();
    window.addEventListener("storage", apply);
    window.addEventListener("evar-admin", apply);
    return () => {
      window.removeEventListener("storage", apply);
      window.removeEventListener("evar-admin", apply);
    };
  }, []);
  return list;
}

// ---------- store settings ----------

export interface StoreSettings {
  storeName?: string;
  whatsapp?: string;
  doorCost?: number;
  pickupCost?: number;
  lowStockThreshold?: number;
}

const SETTINGS_KEY = "evar-admin-settings";

export function loadSettings(): StoreSettings {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveSettings(s: StoreSettings) {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  adminNotify();
}

// ---------- homepage / announcement content ----------

export interface ContentOverrides {
  announce?: { ar: string; en: string }[];
  barColor?: string;
  heroKicker?: { ar: string; en: string };
  heroTitle1?: { ar: string; en: string };
  heroTitle2?: { ar: string; en: string };
  heroSub?: { ar: string; en: string };
}

const CONTENT_KEY = "evar-admin-content";

export function loadContent(): ContentOverrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(CONTENT_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveContent(c: ContentOverrides) {
  window.localStorage.setItem(CONTENT_KEY, JSON.stringify(c));
  adminNotify();
}

// ---------- orders (demo admin reads the same localStorage the checkout writes) ----------

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem("evar-orders") || "{}");
    return Object.values(raw) as Order[];
  } catch {
    return [];
  }
}

export function saveOrderStatus(ref: string, status: string) {
  try {
    const raw = JSON.parse(window.localStorage.getItem("evar-orders") || "{}");
    if (raw[ref]) {
      raw[ref].status = status;
      window.localStorage.setItem("evar-orders", JSON.stringify(raw));
      adminNotify();
    }
  } catch {
    // ignore
  }
}

// ---------- taxonomy (categories & collections) ----------

export interface Taxon {
  id: string;
  name: Localized;
  tagline?: Localized;
  image: string;
  hidden?: boolean;
  custom?: boolean;
}

export interface Taxonomy {
  categories: Taxon[];
  collections: Taxon[];
}

const TAXONOMY_KEY = "evar-taxonomy";

export function loadTaxonomy(): Taxonomy {
  try {
    const saved = window.localStorage.getItem(TAXONOMY_KEY);
    if (saved) return JSON.parse(saved) as Taxonomy;
  } catch {
    // ignore
  }
  return { categories: [...baseCategories], collections: [...baseCollections] };
}

export function saveTaxonomy(t: Taxonomy) {
  window.localStorage.setItem(TAXONOMY_KEY, JSON.stringify(t));
}

/** Categories & collections with admin edits applied (client components only). */
export function useTaxonomy(): Taxonomy {
  const [tax, setTax] = useState<Taxonomy>({ categories: baseCategories, collections: baseCollections });
  useEffect(() => {
    const apply = () => setTax(loadTaxonomy());
    apply();
    window.addEventListener("storage", apply);
    window.addEventListener("evar-admin", apply);
    return () => {
      window.removeEventListener("storage", apply);
      window.removeEventListener("evar-admin", apply);
    };
  }, []);
  return tax;
}
