"use client";

import { useLocale } from "@/lib/i18n";

const icons = [
  // fabric / shield
  <svg key="0" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 2 4 5.5V11c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5.5L12 2Z" strokeLinejoin="round" />
    <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // design / pen
  <svg key="1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 19h8M6 17.5 16.9 6.6a2.1 2.1 0 0 0-3-3L3 14.5 2.5 21l6.5-.5Z" strokeLinejoin="round" />
  </svg>,
  // price tag
  <svg key="2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M20.6 13.4 11 3.8A2 2 0 0 0 9.6 3.2H4a1 1 0 0 0-1 1v5.6c0 .5.2 1 .6 1.4l9.6 9.6a2 2 0 0 0 2.8 0l4.6-4.6a2 2 0 0 0 0-2.8Z" strokeLinejoin="round" />
    <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
  </svg>,
  // headset
  <svg key="3" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 13a8 8 0 0 1 16 0" strokeLinecap="round" />
    <rect x="2.5" y="13" width="4" height="6" rx="2" />
    <rect x="17.5" y="13" width="4" height="6" rx="2" />
    <path d="M20 19a4 4 0 0 1-4 3h-2" strokeLinecap="round" />
  </svg>,
];

export default function WhyEvar() {
  const { t } = useLocale();
  const items = [
    { t: t("why1t"), d: t("why1d") },
    { t: t("why2t"), d: t("why2d") },
    { t: t("why3t"), d: t("why3d") },
    { t: t("why4t"), d: t("why4d") },
  ];
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-10 text-center font-display text-2xl font-bold sm:text-3xl">
          {t("whyTitle")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.t}
              className="rounded-2xl border border-line bg-bg p-6 text-center transition-shadow hover:shadow-lg hover:shadow-black/5"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent-strong">
                {icons[i]}
              </div>
              <h3 className="mb-2 font-bold">{item.t}</h3>
              <p className="text-sm leading-7 text-ink-soft">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
