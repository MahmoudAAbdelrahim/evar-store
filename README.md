# EVAR Store — Demo Storefront

Trial/demo build of the EVAR fashion store. **Frontend only for now** — no real backend yet.
The code is structured so the real backend (Node.js + MySQL + Prisma, per the client spec)
plugs in later by changing only one file.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Arabic / English with full RTL support
- Dark / light mode
- Mock data layer in `src/lib/api.ts` (swap these functions for real API calls later)

## What's in the demo

- Announcement bar, hero, dynamic categories, collections, new arrivals, deals
- Product cards with color swatches, ratings, discount badges
- Shop page with search, category/collection filters, and sorting
- Product page: gallery, color/size variants with per-variant stock, quantity,
  Add to Cart, and a Buy Now direct-order form
- Cart: quantities, remove, totals (localStorage)
- Guest checkout: contact + shipping address, governorate list, door delivery /
  post-office pickup with shipping costs, final total before confirming, COD only,
  order reference number, confirmation page
- Why EVAR, testimonials, branches, size guide
- Shipping & returns, privacy, and terms pages (AR + EN)
- WhatsApp + social links

## Phase plan

1. **This demo** — storefront, mock data.
2. Admin dashboard (visual demo with mock data).
3. Real backend: Node.js + MySQL + Prisma APIs, inventory, low-stock alerts,
   Pixel/GTM/GA tracking, Meta catalog CSV feed.

## Run locally

```bash
npm install
npm run dev
```
