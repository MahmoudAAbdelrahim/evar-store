"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export default function Header() {
  const { t, locale, setLocale } = useLocale();
  const { theme, toggle } = useTheme();
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");

  const links = [
    { href: "/", label: t("navHome") },
    { href: "/shop", label: t("navShop") },
    { href: "/size-guide", label: t("navSizeGuide") },
    { href: "/#branches", label: t("navBranches") },
  ];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        {/* mobile menu button */}
        <button
          className="rounded-lg p-2 hover:bg-surface-2 md:hidden"
          aria-label={t("openMenu")}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>

        {/* logo */}
        <Link href="/" className="font-display text-2xl font-bold tracking-[0.18em] text-ink">
          EVAR
        </Link>

        {/* desktop nav */}
        <nav className="mx-6 hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-accent ${
                pathname === l.href ? "font-semibold text-accent" : "text-ink-soft"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* search */}
        <form onSubmit={submitSearch} className="ms-auto hidden max-w-xs flex-1 lg:block">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search")}
              className="w-full rounded-full border border-line bg-surface px-4 py-2 ps-10 text-sm outline-none placeholder:text-ink-soft/70 focus:border-accent"
            />
            <svg
              className="absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </div>
        </form>

        <div className="ms-auto flex items-center gap-1 lg:ms-2">
          {/* language */}
          <button
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
          >
            {t("switchLang")}
          </button>

          {/* theme */}
          <button
            onClick={toggle}
            aria-label={t("switchTheme")}
            className="rounded-full p-2 text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
          >
            {theme === "dark" ? (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* cart */}
          <Link
            href="/cart"
            aria-label={t("cart")}
            className="relative rounded-full p-2 text-ink transition-colors hover:bg-surface-2"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" strokeLinejoin="round" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" />
            </svg>
            {count > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-ink">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="border-t border-line bg-bg px-4 pb-4 md:hidden">
          <form onSubmit={submitSearch} className="py-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search")}
              className="w-full rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-accent"
            />
          </form>
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line/60 py-3 text-sm text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
