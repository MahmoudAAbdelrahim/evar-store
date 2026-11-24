import type { MetadataRoute } from "next";
import { products } from "@/lib/mock-data";

const BASE = "https://evar-store.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/shop", "/size-guide", "/shipping-returns", "/privacy", "/terms", "/track-order"].map(
    (p) => ({
      url: `${BASE}${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.6,
    })
  );
  const productPages = products.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...staticPages, ...productPages];
}
