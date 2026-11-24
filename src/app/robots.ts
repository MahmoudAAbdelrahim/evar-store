import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout", "/order/"] },
    sitemap: "https://evar-store.vercel.app/sitemap.xml",
  };
}
