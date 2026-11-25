"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadContent, type ContentOverrides } from "@/lib/admin";
import { useLocale } from "@/lib/i18n";

export default function Hero() {
  const { t, locale } = useLocale();
  const [content, setContent] = useState<ContentOverrides>({});

  useEffect(() => {
    const apply = () => setContent(loadContent());
    apply();
    window.addEventListener("storage", apply);
    window.addEventListener("evar-admin", apply);
    return () => {
      window.removeEventListener("storage", apply);
      window.removeEventListener("evar-admin", apply);
    };
  }, []);

  const ov = (v?: { ar: string; en: string }) => (v && v[locale] ? v[locale] : undefined);
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-2 via-bg to-surface-2" />
      <div className="absolute -end-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -start-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2">
        <div>
          <span className="rise inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent-strong">
            {ov(content.heroKicker) ?? t("heroKicker")}
          </span>
          <h1 className="rise rise-1 mt-5 font-display text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            {ov(content.heroTitle1) ?? t("heroTitle1")}
            <br />
            <span className="text-accent-strong">{ov(content.heroTitle2) ?? t("heroTitle2")}</span>
          </h1>
          <p className="rise rise-2 mt-5 max-w-md text-base leading-8 text-ink-soft">
            {ov(content.heroSub) ?? t("heroSub")}
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
            >
              {t("heroCta")}
            </Link>
            <Link
              href="/#collections"
              className="rounded-full border border-ink/20 px-7 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {t("heroCta2")}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft">
            {[t("heroBadge1"), t("heroBadge2"), t("heroBadge3")].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-accent">
                  <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* hero visual: stacked imagery */}
        <div className="rise rise-2 relative mx-auto hidden w-full max-w-md lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-2xl shadow-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/evar-hero/900/1125"
              alt="EVAR"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -start-8 w-40 rotate-[-4deg] overflow-hidden rounded-2xl border border-line shadow-xl shadow-black/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/evar-hero2/400/500"
              alt=""
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
