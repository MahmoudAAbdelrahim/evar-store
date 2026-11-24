"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-bold tracking-[0.18em]">EVAR</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-ink-soft">{t("footerAbout")}</p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-line p-2.5 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.8-.4 1.1.6 1 1.3 1.8 2.3 2.4.3.2.5.2.7 0l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .6-.2 1.4Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-line p-2.5 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-line p-2.5 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.5h-2.9C11 2.5 10 4.2 10 6.4v2.1H8V12h2v9.5h4V12h2.7l.4-3.5H14Z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="rounded-full border border-line p-2.5 text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 3c.4 2 1.8 3.5 3.9 3.7v3c-1.5 0-2.9-.5-3.9-1.2v6.3c0 3.6-2.6 6.2-6 6.2-3.2 0-5.8-2.5-5.8-5.7 0-3.4 3-5.9 6.6-5.5v3.1c-1.9-.4-3.5.7-3.5 2.4 0 1.5 1.2 2.6 2.7 2.6 1.7 0 2.9-1.3 2.9-3.2V3h3.1Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">{t("quickLinks")}</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link className="hover:text-accent" href="/">{t("navHome")}</Link></li>
            <li><Link className="hover:text-accent" href="/shop">{t("navShop")}</Link></li>
            <li><Link className="hover:text-accent" href="/size-guide">{t("navSizeGuide")}</Link></li>
            <li><Link className="hover:text-accent" href="/#branches">{t("navBranches")}</Link></li>
            <li><Link className="hover:text-accent" href="/cart">{t("cart")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">{t("policies")}</h4>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li><Link className="hover:text-accent" href="/shipping-returns">{t("shippingTitle")}</Link></li>
            <li><Link className="hover:text-accent" href="/privacy">{t("privacyTitle")}</Link></li>
            <li><Link className="hover:text-accent" href="/terms">{t("termsTitle")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-4 text-center text-xs text-ink-soft">
        EVAR © {new Date().getFullYear()} · {t("rights")} · {t("madeBy")}
      </div>
    </footer>
  );
}
