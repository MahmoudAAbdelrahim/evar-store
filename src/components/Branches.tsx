"use client";

import { useLocale } from "@/lib/i18n";
import type { Branch } from "@/lib/types";

export default function Branches({ branches }: { branches: Branch[] }) {
  const { t, L } = useLocale();
  return (
    <section id="branches" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("branchesTitle")}</h2>
          <p className="mt-2 text-sm text-ink-soft">{t("branchesSub")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <div key={b.phone} className="rounded-2xl border border-line bg-bg p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent-strong">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <h3 className="font-display text-lg font-bold">{L(b.city)}</h3>
              </div>
              <p className="text-sm leading-7 text-ink-soft">{L(b.address)}</p>
              <p className="mt-1 text-sm text-ink-soft" dir="ltr">{b.phone}</p>
              <p className="mt-2 inline-block rounded-full bg-surface-2 px-3 py-1 text-xs text-ink-soft">
                {L(b.hours)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
