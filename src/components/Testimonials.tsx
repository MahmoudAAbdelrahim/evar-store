"use client";

import { useLocale } from "@/lib/i18n";
import type { Testimonial } from "@/lib/types";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.7 5.8 21.2l1.4-7L2 9.4l7-.8L12 2Z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const { t, L } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-10 text-center font-display text-2xl font-bold sm:text-3xl">
        {t("testimonialsTitle")}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <figure key={item.name} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
            <Stars n={item.rating} />
            <blockquote className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
              “{L(item.text)}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-bold">{item.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
