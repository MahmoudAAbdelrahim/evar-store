import Branches from "@/components/Branches";
import CategoryRail from "@/components/CategoryRail";
import CollectionsSection from "@/components/CollectionsSection";
import Hero from "@/components/Hero";
import ProductRail from "@/components/ProductRail";
import Testimonials from "@/components/Testimonials";
import WhyEvar from "@/components/WhyEvar";
import {
  getBranches,
  getDeals,
  getNewArrivals,
  getTestimonials,
} from "@/lib/api";

export default async function HomePage() {
  const [news, deals, tst, brs] = await Promise.all([
    getNewArrivals(),
    getDeals(),
    getTestimonials(),
    getBranches(),
  ]);

  return (
    <>
      <Hero />
      <CategoryRail />
      <ProductRail titleKey="newArrivals" products={news} href="/shop?sort=new" />
      <CollectionsSection />
      <ProductRail titleKey="dealsTitle" products={deals} href="/shop?sort=price-low" />
      <WhyEvar />
      <Testimonials items={tst} />
      <Branches branches={brs} />
    </>
  );
}
