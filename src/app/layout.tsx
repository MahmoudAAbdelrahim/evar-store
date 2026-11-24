import type { Metadata, Viewport } from "next";
import { Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Trackers from "@/components/Trackers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "EVAR | إيفار - أزياء عصرية",
    template: "%s | EVAR",
  },
  description:
    "EVAR - براند مصري للأزياء العصرية. تيشيرتات، هوديز، جاكيتات وأكثر بخامات ممتازة وأسعار عادلة. An Egyptian fashion brand: tees, hoodies, jackets and more with premium fabrics at fair prices.",
  keywords: [
    "EVAR", "إيفار", "أزياء", "ملابس", "fashion", "Egypt",
    "تيشيرتات", "هوديز", "جاكيتات", "hoodies", "t-shirts",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b09" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Trackers />
        </Providers>
      </body>
    </html>
  );
}
