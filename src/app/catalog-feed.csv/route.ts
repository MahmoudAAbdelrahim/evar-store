import { NextResponse } from "next/server";
import { products } from "@/lib/mock-data";

const BASE = "https://evar-store.vercel.app";

function csvCell(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/**
 * Meta product catalog feed (CSV) for dynamic product ads.
 * Point Meta Commerce Manager at: https://evar-store.vercel.app/catalog-feed.csv
 */
export function GET() {
  const header = [
    "id", "title", "description", "availability", "condition",
    "price", "link", "image_link", "brand", "item_group_id",
  ];
  const rows = products.map((p) => {
    const inStock = p.variants.some((v) => v.stock > 0);
    return [
      p.id,
      `${p.name.en} | ${p.name.ar}`,
      p.description.en,
      inStock ? "in stock" : "out of stock",
      "new",
      `${p.price} EGP`,
      `${BASE}/product/${p.slug}`,
      p.images[0],
      "EVAR",
      p.category,
    ];
  });
  const csv = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8" },
  });
}
