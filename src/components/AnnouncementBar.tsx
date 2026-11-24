"use client";

import { useLocale } from "@/lib/i18n";

export default function AnnouncementBar() {
  const { t } = useLocale();
  const items = [t("announce1"), t("announce2"), t("announce3")];
  return (
    <div className="bg-ink text-bg text-[11px] sm:text-xs tracking-wide">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2">
        {items.map((msg, i) => (
          <span key={msg} className={i > 0 ? "hidden sm:inline" : ""}>
            <span className="me-1.5 inline-block h-1 w-1 rounded-full bg-accent align-middle" />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
