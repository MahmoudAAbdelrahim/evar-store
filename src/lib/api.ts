import { branches, categories, collections, products, testimonials } from "./mock-data";
import type { Order, Product } from "./types";

/**
 * Data-access layer.
 *
 * Today every function reads the local mock catalog. When the real backend
 * (Node.js + MySQL + Prisma) lands, only this file changes: each function
 * becomes a fetch() against the custom API, and the rest of the app keeps
 * working untouched. Keep every function async so the swap is transparent.
 */

const delay = (ms = 60) => new Promise((r) => setTimeout(r, ms));

export async function getProducts(): Promise<Product[]> {
  await delay();
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await delay();
  return products.find((p) => p.slug === slug);
}

export async function getNewArrivals(): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.isNew);
}

export async function getDeals(): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
}

export async function getByCategory(categoryId: string): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.category === categoryId);
}

export async function getByCollection(collectionId: string): Promise<Product[]> {
  await delay();
  return products.filter((p) => p.collections.includes(collectionId));
}

export async function getCategories() {
  await delay();
  return categories;
}

export async function getCollections() {
  await delay();
  return collections;
}

export async function getTestimonials() {
  await delay();
  return testimonials;
}

export async function getBranches() {
  await delay();
  return branches;
}

/** Mock order creation. The backend version POSTs /api/orders and returns its ref. */
export async function createOrder(
  draft: Omit<Order, "ref" | "createdAt" | "status">
): Promise<Order> {
  await delay(300);
  const ref = `EVAR-${Date.now().toString(36).toUpperCase()}${Math.floor(
    Math.random() * 90 + 10
  )}`;
  return {
    ...draft,
    ref,
    createdAt: new Date().toISOString(),
    status: "pending_confirmation",
  };
}
