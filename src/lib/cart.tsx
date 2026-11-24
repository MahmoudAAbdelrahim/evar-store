"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "./types";

interface CartCtx {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: CartItem) => void;
  updateQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function itemKey(i: Pick<CartItem, "productId" | "color" | "size">): string {
  return `${i.productId}|${i.color}|${i.size}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("evar-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // corrupted storage: start with an empty cart
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("evar-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items,
      count,
      subtotal,
      add: (item) =>
        setItems((prev) => {
          const k = itemKey(item);
          const found = prev.find((i) => itemKey(i) === k);
          if (found) {
            return prev.map((i) =>
              itemKey(i) === k ? { ...i, qty: i.qty + item.qty } : i
            );
          }
          return [...prev, item];
        }),
      updateQty: (key, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => itemKey(i) !== key)
            : prev.map((i) => (itemKey(i) === key ? { ...i, qty } : i))
        ),
      remove: (key) => setItems((prev) => prev.filter((i) => itemKey(i) !== key)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
