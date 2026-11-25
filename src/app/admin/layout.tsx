"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const items = [
  { href: "/admin", icon: "◧", ar: "نظرة عامة", en: "Overview" },
  { href: "/admin/products", icon: "▤", ar: "المنتجات والأسعار", en: "Products & Pricing" },
  { href: "/admin/inventory", icon: "▦", ar: "المخزون", en: "Inventory" },
  { href: "/admin/orders", icon: "◫", ar: "الطلبات", en: "Orders" },
  { href: "/admin/customers", icon: "◍", ar: "العملاء", en: "Customers" },
  { href: "/admin/discounts", icon: "٪", ar: "الخصومات", en: "Discounts" },
  { href: "/admin/content", icon: "✎", ar: "محتوى الصفحة", en: "Homepage Content" },
  { href: "/admin/settings", icon: "⚙", ar: "الإعدادات", en: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();
  const ar = locale === "ar";
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1 p-4">
      {items.map((i) => {
        const active = pathname === i.href;
        return (
          <Link
            key={i.href}
            href={i.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
              active
                ? "bg-accent/15 font-bold text-accent-strong"
                : "text-ink-soft hover:bg-surface-2 hover:text-ink"
            }`}
          >
            <span className="w-5 text-center text-base">{i.icon}</span>
            {ar ? i.ar : i.en}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-1">
      {/* sidebar - desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-e border-line bg-surface lg:flex">
        <Link href="/admin" className="border-b border-line px-6 py-5">
          <span className="font-display text-xl font-bold tracking-[0.18em]">EVAR</span>
          <span className="ms-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent-strong">
            {ar ? "لوحة التحكم" : "Admin"}
          </span>
        </Link>
        <div className="flex-1 overflow-y-auto">{nav}</div>
        <div className="border-t border-line p-4">
          <Link href="/" className="text-xs text-ink-soft hover:text-accent">
            ← {ar ? "عرض المتجر" : "View store"}
          </Link>
        </div>
      </aside>

      {/* mobile topbar + drawer */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur lg:hidden">
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-surface-2" aria-label="menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-display text-lg font-bold tracking-[0.15em]">EVAR</span>
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent-strong">
            {ar ? "لوحة التحكم" : "Admin"}
          </span>
          <div className="ms-auto flex items-center gap-1">
            <button
              onClick={() => setLocale(ar ? "en" : "ar")}
              className="rounded-full px-2.5 py-1 text-xs font-semibold text-ink-soft hover:bg-surface-2"
            >
              {ar ? "EN" : "ع"}
            </button>
            <button onClick={toggle} className="rounded-full p-2 text-ink-soft hover:bg-surface-2" aria-label="theme">
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </div>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <aside className="absolute start-0 top-0 h-full w-64 border-e border-line bg-surface">
              <div className="border-b border-line px-6 py-5 font-display text-xl font-bold tracking-[0.18em]">
                EVAR
              </div>
              {nav}
            </aside>
          </div>
        )}

        {/* desktop topbar */}
        <div className="sticky top-0 z-30 hidden items-center justify-end gap-1 border-b border-line bg-bg/90 px-6 py-3 backdrop-blur lg:flex">
          <button
            onClick={() => setLocale(ar ? "en" : "ar")}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-surface-2"
          >
            {ar ? "English" : "العربية"}
          </button>
          <button onClick={toggle} className="rounded-full p-2 text-ink-soft hover:bg-surface-2" aria-label="theme">
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
