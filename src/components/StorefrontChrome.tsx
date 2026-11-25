"use client";

import AnnouncementBar from "@/components/AnnouncementBar";
import DemoBanner from "@/components/DemoBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useIsAdmin } from "@/components/Providers";

export default function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = useIsAdmin();
  if (isAdmin)
    return (
      <>
        <DemoBanner />
        {children}
      </>
    );
  return (
    <>
      <DemoBanner />
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
