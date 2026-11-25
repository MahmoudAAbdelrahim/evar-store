import type { MetadataRoute } from "next";

// Demo preview: block all indexing while this is a trial deployment.
// Production SEO code (sitemap, metadata, JSON-LD) stays in the repo for the
// real launch; only this file and the noindex flag in layout.tsx change then.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
