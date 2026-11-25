"use client";

import { useEffect, useState } from "react";
import { loadContent, type ContentOverrides } from "@/lib/admin";
import { useLocale } from "@/lib/i18n";

export default function AnnouncementBar() {
  const { t } = useLocale();
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

  const defaults = [t("announce1"), t("announce2"), t("announce3")];
  const items = content.announce?.length
    ? content.announce.map((a) => (document.documentElement.lang === "ar" ? a.ar : a.en) || "")
    : defaults;
  const shown = items.filter(Boolean);
  const finalItems = shown.length ? shown : defaults;

  return (
    <div
      className="text-[11px] sm:text-xs tracking-wide"
      style={
        content.barColor
          ? { background: content.barColor, color: "#ffffff" }
          : { background: "var(--ink)", color: "var(--bg)" }
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2">
        {finalItems.map((msg, i) => (
          <span key={`${msg}-${i}`} className={i > 0 ? "hidden sm:inline" : ""}>
            <span className="me-1.5 inline-block h-1 w-1 rounded-full bg-accent align-middle" />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
