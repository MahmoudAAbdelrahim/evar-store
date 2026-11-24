"use client";

/**
 * GTM + Meta Pixel loaders. Inactive until the client supplies real IDs:
 *   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 *   NEXT_PUBLIC_META_PIXEL_ID=1234567890
 * Both read the shared window.dataLayer events pushed by src/lib/track.ts.
 */

import { useEffect } from "react";

export default function Trackers() {
  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

    if (gtmId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
      document.head.appendChild(s);
    }

    if (pixelId) {
      const w = window as unknown as { fbq?: unknown; _fbq?: unknown };
      if (!w.fbq) {
        const fbq = (...args: unknown[]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((fbq as any).queue = (fbq as any).queue || []).push(args);
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (fbq as any).loaded = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (fbq as any).version = "2.0";
        w.fbq = fbq;
        w._fbq = fbq;
        const s = document.createElement("script");
        s.async = true;
        s.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(s);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (w.fbq as any)("init", pixelId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (w.fbq as any)("track", "PageView");
    }
  }, []);

  return null;
}
