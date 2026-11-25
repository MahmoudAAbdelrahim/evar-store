"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/lib/cart";
import { LocaleProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

/** The storefront chrome (announcement bar, header, footer, WhatsApp float) is
 *  injected by Shell below so /admin can render with its own chrome instead. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <CartProvider>{children}</CartProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export function useIsAdmin() {
  const pathname = usePathname();
  return pathname.startsWith("/admin");
}
