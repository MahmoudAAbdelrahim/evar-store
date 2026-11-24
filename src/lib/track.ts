"use client";

/**
 * E-commerce event tracking (demo wiring).
 *
 * Every meaningful storefront action pushes a GA4-style ecommerce event onto
 * window.dataLayer. When the client supplies real IDs, set
 * NEXT_PUBLIC_GTM_ID / NEXT_PUBLIC_META_PIXEL_ID as env vars and the loaders
 * in src/components/Trackers.tsx activate GTM + Meta Pixel against the same
 * dataLayer events. Event deduplication: each purchase event carries
 * event_id = the order ref, so Pixel and GTM never double-count it.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
  // Meta Pixel mirror (no-op until the pixel script is enabled via env)
  if (typeof window.fbq === "function") {
    const map: Record<string, string> = {
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
    };
    if (map[event]) {
      window.fbq("track", map[event], payload, { eventID: payload.event_id as string | undefined });
    }
  }
}

export function itemPayload(item: {
  productId: string;
  name: { ar: string; en: string };
  price: number;
  qty?: number;
  color?: string;
  size?: string;
}) {
  return {
    item_id: item.productId,
    item_name: item.name.en,
    item_name_ar: item.name.ar,
    price: item.price,
    quantity: item.qty ?? 1,
    item_variant: [item.color, item.size].filter(Boolean).join(" / "),
  };
}
