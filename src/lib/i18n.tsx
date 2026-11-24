"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale, Localized } from "./types";

const dict = {
  brand: { ar: "إيفار", en: "EVAR" },
  tagline: { ar: "أزياء تليق بيك", en: "Wear what fits you" },

  // announcement bar
  announce1: { ar: "شحن لكل المحافظات", en: "Shipping to all governorates" },
  announce2: { ar: "الدفع عند الاستلام", en: "Cash on delivery" },
  announce3: { ar: "استبدال واسترجاع خلال ١٤ يوم", en: "14-day exchange & returns" },

  // nav
  navHome: { ar: "الرئيسية", en: "Home" },
  navShop: { ar: "المتجر", en: "Shop" },
  navSizeGuide: { ar: "دليل المقاسات", en: "Size Guide" },
  navBranches: { ar: "فروعنا", en: "Branches" },
  search: { ar: "ابحث عن منتج...", en: "Search products..." },
  cart: { ar: "السلة", en: "Cart" },
  openMenu: { ar: "القائمة", en: "Menu" },
  close: { ar: "إغلاق", en: "Close" },
  switchTheme: { ar: "تبديل المظهر", en: "Toggle theme" },
  switchLang: { ar: "English", en: "العربية" },

  // hero
  heroKicker: { ar: "مجموعة شتاء ٢٠٢٦", en: "Winter '26 Collection" },
  heroTitle1: { ar: "أناقة تبدأ", en: "Elegance starts" },
  heroTitle2: { ar: "من التفاصيل", en: "in the details" },
  heroSub: {
    ar: "قطع مصممة بعناية، خامات ممتازة، وأسعار في متناولك. اكتشف مجموعة EVAR الجديدة دلوقتي.",
    en: "Carefully designed pieces, premium fabrics, prices within reach. Discover the new EVAR collection now.",
  },
  heroCta: { ar: "تسوق الآن", en: "Shop now" },
  heroCta2: { ar: "اكتشف المجموعات", en: "Explore collections" },
  heroBadge1: { ar: "خامات ممتازة", en: "Premium fabrics" },
  heroBadge2: { ar: "توصيل سريع", en: "Fast delivery" },
  heroBadge3: { ar: "دفع عند الاستلام", en: "Cash on delivery" },

  // sections
  shopByCategory: { ar: "تسوق حسب القسم", en: "Shop by category" },
  collectionsTitle: { ar: "المجموعات", en: "Collections" },
  newArrivals: { ar: "وصل حديثاً", en: "New arrivals" },
  dealsTitle: { ar: "عروض وخصومات", en: "Deals & discounts" },
  viewAll: { ar: "عرض الكل", en: "View all" },
  whyTitle: { ar: "ليه EVAR؟", en: "Why EVAR?" },
  why1t: { ar: "خامات مضمونة", en: "Guaranteed fabrics" },
  why1d: { ar: "بنختار كل قماشة بإيدنا ونختبرها قبل ما توصلك.", en: "We hand-pick and test every fabric before it reaches you." },
  why2t: { ar: "تصميم بذوق", en: "Designed with taste" },
  why2d: { ar: "قصّات عصرية مدروسة تناسب كل الأذواق والمقاسات.", en: "Modern, considered cuts for every taste and size." },
  why3t: { ar: "سعر عادل", en: "Fair pricing" },
  why3d: { ar: "جودة عالية من غير مبالغة في السعر.", en: "High quality without an inflated price tag." },
  why4t: { ar: "خدمة تستاهل", en: "Service that delivers" },
  why4d: { ar: "دعم سريع على واتساب واستبدال سهل خلال ١٤ يوم.", en: "Fast WhatsApp support and easy 14-day exchanges." },
  testimonialsTitle: { ar: "عملاؤنا بيقولوا", en: "What our customers say" },
  branchesTitle: { ar: "فروعنا", en: "Our branches" },
  branchesSub: { ar: "زورونا في أقرب فرع", en: "Visit your nearest store" },

  // product card
  new: { ar: "جديد", en: "New" },
  off: { ar: "خصم", en: "off" },
  addToCart: { ar: "أضف للسلة", en: "Add to cart" },
  reviews: { ar: "تقييم", en: "reviews" },

  // shop
  shopTitle: { ar: "كل المنتجات", en: "All products" },
  filterCategory: { ar: "القسم", en: "Category" },
  filterCollection: { ar: "المجموعة", en: "Collection" },
  all: { ar: "الكل", en: "All" },
  sortBy: { ar: "ترتيب حسب", en: "Sort by" },
  sortFeatured: { ar: "المميز أولاً", en: "Featured" },
  sortNew: { ar: "الأحدث", en: "Newest" },
  sortPriceLow: { ar: "السعر: من الأقل", en: "Price: low to high" },
  sortPriceHigh: { ar: "السعر: من الأعلى", en: "Price: high to low" },
  resultsCount: { ar: "منتج", en: "products" },
  noResults: { ar: "مفيش منتجات مطابقة للبحث", en: "No products match your search" },

  // product page
  selectColor: { ar: "اللون", en: "Color" },
  selectSize: { ar: "المقاس", en: "Size" },
  sizeGuideLink: { ar: "دليل المقاسات", en: "Size guide" },
  quantity: { ar: "الكمية", en: "Quantity" },
  buyNow: { ar: "اشترِ الآن", en: "Buy now" },
  inStock: { ar: "متوفر", en: "In stock" },
  lowStock: { ar: "باقي قطع قليلة", en: "Only a few left" },
  outOfStock: { ar: "خلص", en: "Out of stock" },
  description: { ar: "الوصف", en: "Description" },
  relatedProducts: { ar: "منتجات مشابهة", en: "You may also like" },
  chooseOptions: { ar: "اختار اللون والمقاس الأول", en: "Pick a color and size first" },
  addedToCart: { ar: "اتضاف للسلة", en: "Added to cart" },
  buyNowTitle: { ar: "شراء مباشر", en: "Buy now" },
  buyNowSub: { ar: "اطلب القطعة دي على طول من غير سلة", en: "Order this piece directly, no cart needed" },

  // cart
  cartTitle: { ar: "سلة التسوق", en: "Shopping cart" },
  cartEmpty: { ar: "سلتك فاضية", en: "Your cart is empty" },
  cartEmptySub: { ar: "شوف منتجاتنا واختار اللي يعجبك", en: "Browse the store and pick what you love" },
  continueShopping: { ar: "كمل التسوق", en: "Continue shopping" },
  remove: { ar: "حذف", en: "Remove" },
  subtotal: { ar: "إجمالي المنتجات", en: "Subtotal" },
  shipping: { ar: "الشحن", en: "Shipping" },
  shippingCalc: { ar: "بيتحسب عند إتمام الطلب", en: "Calculated at checkout" },
  total: { ar: "الإجمالي", en: "Total" },
  checkout: { ar: "إتمام الطلب", en: "Checkout" },

  // checkout
  checkoutTitle: { ar: "إتمام الطلب", en: "Checkout" },
  guestNote: { ar: "من غير تسجيل ومن غير حساب، بياناتك للتوصيل بس", en: "No sign-up, no account. Your details are for delivery only." },
  contactInfo: { ar: "بيانات التواصل", en: "Contact details" },
  fullName: { ar: "الاسم بالكامل", en: "Full name" },
  phone: { ar: "رقم الموبايل", en: "Mobile number" },
  phone2: { ar: "رقم موبايل تاني (اختياري)", en: "Second mobile (optional)" },
  email: { ar: "البريد الإلكتروني (اختياري)", en: "Email (optional)" },
  shippingAddress: { ar: "عنوان الشحن", en: "Shipping address" },
  governorate: { ar: "المحافظة", en: "Governorate" },
  city: { ar: "المدينة / المركز", en: "City / District" },
  address: { ar: "العنوان بالتفصيل", en: "Detailed address" },
  notes: { ar: "ملاحظات (اختياري)", en: "Notes (optional)" },
  shippingMethod: { ar: "طريقة الاستلام", en: "Delivery method" },
  doorDelivery: { ar: "توصيل للباب", en: "Door delivery" },
  doorTime: { ar: "من ٢ لـ٥ أيام عمل", en: "2-5 business days" },
  pickupPoint: { ar: "استلام من مكتب بريد", en: "Post office pickup" },
  pickupTime: { ar: "من ٣ لـ٦ أيام عمل", en: "3-6 business days" },
  paymentMethod: { ar: "طريقة الدفع", en: "Payment method" },
  cod: { ar: "الدفع عند الاستلام", en: "Cash on delivery" },
  codNote: { ar: "ادفع كاش أو بالمحفظة وقت الاستلام", en: "Pay cash or by wallet on delivery" },
  orderSummary: { ar: "ملخص الطلب", en: "Order summary" },
  placeOrder: { ar: "تأكيد الطلب", en: "Place order" },
  placing: { ar: "جاري تأكيد الطلب...", en: "Placing your order..." },
  requiredField: { ar: "الحقل ده مطلوب", en: "This field is required" },
  invalidPhone: { ar: "رقم الموبايل غير صحيح", en: "Invalid mobile number" },
  invalidEmail: { ar: "البريد الإلكتروني غير صحيح", en: "Invalid email" },
  finalNote: { ar: "هنتواصل معاك تليفونياً لتأكيد الطلب قبل الشحن", en: "We will call you to confirm your order before shipping" },

  // order confirmation
  orderThanks: { ar: "شكراً! طلبك وصلنا", en: "Thank you! We got your order" },
  orderRef: { ar: "رقم الطلب المرجعي", en: "Order reference" },
  orderNext: {
    ar: "فريقنا هيكلمك على رقمك خلال ٢٤ ساعة لتأكيد الطلب، وبعدها يتشحن في ٢ لـ٥ أيام عمل.",
    en: "Our team will call you within 24 hours to confirm, then your order ships in 2-5 business days.",
  },
  backHome: { ar: "الرجوع للرئيسية", en: "Back to home" },

  // size guide
  sizeGuideTitle: { ar: "دليل المقاسات", en: "Size Guide" },
  sizeGuideSub: { ar: "قِس جسمك وقارن بالجدول عشان تختار مقاسك المظبوط", en: "Measure yourself and compare with the chart to find your fit" },
  size: { ar: "المقاس", en: "Size" },
  chest: { ar: "الصدر (سم)", en: "Chest (cm)" },
  waist: { ar: "الوسط (سم)", en: "Waist (cm)" },
  hips: { ar: "الأرداف (سم)", en: "Hips (cm)" },
  length: { ar: "الطول (سم)", en: "Length (cm)" },
  sizeTip: { ar: "لو بين مقاسين، ننصحك تختار الأكبر للراحة.", en: "Between two sizes? We recommend sizing up for comfort." },

  // policies
  shippingTitle: { ar: "الشحن والاستبدال والاسترجاع", en: "Shipping, Exchange & Returns" },
  privacyTitle: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  termsTitle: { ar: "الشروط والأحكام", en: "Terms & Conditions" },

  // footer
  footerAbout: {
    ar: "EVAR براند مصري بيقدم أزياء عصرية بخامات ممتازة وأسعار عادلة. هدفنا إنك تلبس حاجة تحس فيها بنفسك.",
    en: "EVAR is an Egyptian brand making modern fashion with premium fabrics at fair prices. Wear something you feel yourself in.",
  },
  quickLinks: { ar: "روابط سريعة", en: "Quick links" },
  policies: { ar: "السياسات", en: "Policies" },
  followUs: { ar: "تابعنا", en: "Follow us" },
  rights: { ar: "كل الحقوق محفوظة", en: "All rights reserved" },
  madeBy: { ar: "نسخة تجريبية", en: "Demo build" },
} satisfies Record<string, Localized>;

export type DictKey = keyof typeof dict;

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: DictKey) => string;
  L: (v: Localized) => string;
  dir: "rtl" | "ltr";
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("evar-locale");
    if (saved === "ar" || saved === "en") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo<LocaleCtx>(
    () => ({
      locale,
      setLocale: (l: Locale) => {
        setLocaleState(l);
        window.localStorage.setItem("evar-locale", l);
      },
      t: (k) => dict[k][locale],
      L: (v) => v[locale],
      dir: locale === "ar" ? "rtl" : "ltr",
    }),
    [locale]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
