import type { Branch, Category, Collection, Product, Testimonial } from "./types";

const img = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/evar-${seed}/${w}/${h}`;

export const categories: Category[] = [
  { id: "tshirts", name: { ar: "تيشيرتات", en: "T-Shirts" }, image: img("cat-tshirts", 600, 750) },
  { id: "hoodies", name: { ar: "هوديز", en: "Hoodies" }, image: img("cat-hoodies", 600, 750) },
  { id: "pants", name: { ar: "بناطيل", en: "Pants" }, image: img("cat-pants", 600, 750) },
  { id: "jackets", name: { ar: "جاكيتات", en: "Jackets" }, image: img("cat-jackets", 600, 750) },
  { id: "accessories", name: { ar: "إكسسوارات", en: "Accessories" }, image: img("cat-acc", 600, 750) },
];

export const collections: Collection[] = [
  {
    id: "winter-26",
    name: { ar: "شتاء ٢٠٢٦", en: "Winter '26" },
    tagline: { ar: "قطع دافئة بروح عصرية", en: "Warm pieces with a modern soul" },
    image: img("col-winter", 1200, 800),
  },
  {
    id: "essentials",
    name: { ar: "الأساسيات", en: "Essentials" },
    tagline: { ar: "أساس خزانتك اليومية", en: "The base of your daily wardrobe" },
    image: img("col-essentials", 1200, 800),
  },
  {
    id: "limited",
    name: { ar: "إصدار محدود", en: "Limited Edition" },
    tagline: { ar: "كميات محدودة، توقيع EVAR", en: "Small runs, the EVAR signature" },
    image: img("col-limited", 1200, 800),
  },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

function makeVariants(colors: string[], stockBase: number) {
  const v: { color: string; size: string; stock: number }[] = [];
  colors.forEach((c, ci) => {
    sizes.forEach((s, si) => {
      v.push({ color: c, size: s, stock: Math.max(0, stockBase - ci * 2 - si) });
    });
  });
  return v;
}

export const products: Product[] = [
  {
    id: "p01",
    slug: "oversized-tee",
    name: { ar: "تيشيرت أوفر سايز", en: "Oversized Tee" },
    description: {
      ar: "تيشيرت قطن ١٠٠٪ بقصّة أوفر سايز مريحة، خامة ثقيلة تثبت مع الغسيل. قطعة أساسية تليق بكل يوم.",
      en: "A 100% cotton oversized tee with a relaxed cut and a heavy fabric that holds up wash after wash. An everyday essential.",
    },
    category: "tshirts",
    collections: ["essentials"],
    price: 350,
    compareAtPrice: 450,
    colors: [
      { name: { ar: "أسود", en: "Black" }, hex: "#1c1917" },
      { name: { ar: "أبيض", en: "White" }, hex: "#f5f5f4" },
      { name: { ar: "بيج", en: "Beige" }, hex: "#d6c7ae" },
    ],
    sizes,
    variants: makeVariants(["Black", "White", "Beige"], 14),
    images: [img("p01a"), img("p01b"), img("p01c")],
    isNew: true,
    rating: 4.8,
    reviewsCount: 126,
  },
  {
    id: "p02",
    slug: "essential-hoodie",
    name: { ar: "هودي إسينشال", en: "Essential Hoodie" },
    description: {
      ar: "هودي بقطن مبطّن من الداخل، قبعة مبطنة ورباط مطاطي. دفء وشكل نظيف في قطعة واحدة.",
      en: "A fleece-lined hoodie with a padded hood and drawstring. Warmth and a clean look in one piece.",
    },
    category: "hoodies",
    collections: ["essentials", "winter-26"],
    price: 950,
    colors: [
      { name: { ar: "رمادي", en: "Grey" }, hex: "#78716c" },
      { name: { ar: "كحلي", en: "Navy" }, hex: "#1e3a5f" },
      { name: { ar: "أسود", en: "Black" }, hex: "#1c1917" },
    ],
    sizes,
    variants: makeVariants(["Grey", "Navy", "Black"], 10),
    images: [img("p02a"), img("p02b"), img("p02c")],
    rating: 4.9,
    reviewsCount: 203,
  },
  {
    id: "p03",
    slug: "cargo-pants",
    name: { ar: "بنطلون كارجو", en: "Cargo Pants" },
    description: {
      ar: "بنطلون كارجو بجيوب عملية وقصّة مستقيمة، قماش متين يتحمل الاستخدام اليومي.",
      en: "Cargo pants with utility pockets and a straight cut, in a durable fabric made for daily wear.",
    },
    category: "pants",
    collections: ["essentials"],
    price: 990,
    compareAtPrice: 1200,
    colors: [
      { name: { ar: "زيتي", en: "Olive" }, hex: "#556b2f" },
      { name: { ar: "بيج", en: "Beige" }, hex: "#d6c7ae" },
    ],
    sizes,
    variants: makeVariants(["Olive", "Beige"], 8),
    images: [img("p03a"), img("p03b"), img("p03c")],
    rating: 4.6,
    reviewsCount: 88,
  },
  {
    id: "p04",
    slug: "denim-jacket",
    name: { ar: "جاكيت جينز", en: "Denim Jacket" },
    description: {
      ar: "جاكيت جينز كلاسيك بغسلة عصرية وأزرار معدنية. قطعة تكمل أي لوك.",
      en: "A classic denim jacket with a modern wash and metal buttons. The piece that finishes any look.",
    },
    category: "jackets",
    collections: ["winter-26"],
    price: 1650,
    colors: [
      { name: { ar: "أزرق جينز", en: "Denim Blue" }, hex: "#3b5b7e" },
      { name: { ar: "أسود", en: "Black" }, hex: "#1c1917" },
    ],
    sizes,
    variants: makeVariants(["Denim Blue", "Black"], 6),
    images: [img("p04a"), img("p04b"), img("p04c")],
    isNew: true,
    rating: 4.7,
    reviewsCount: 54,
  },
  {
    id: "p05",
    slug: "polo-shirt",
    name: { ar: "تيشيرت بولو", en: "Polo Shirt" },
    description: {
      ar: "بولو بيكيه بياقة كلاسيكية، شيك وكاجوال في نفس الوقت.",
      en: "A piqué polo with a classic collar. Smart and casual at once.",
    },
    category: "tshirts",
    collections: ["essentials"],
    price: 650,
    colors: [
      { name: { ar: "أبيض", en: "White" }, hex: "#f5f5f4" },
      { name: { ar: "كحلي", en: "Navy" }, hex: "#1e3a5f" },
      { name: { ar: "عنابي", en: "Burgundy" }, hex: "#6b2233" },
    ],
    sizes,
    variants: makeVariants(["White", "Navy", "Burgundy"], 12),
    images: [img("p05a"), img("p05b"), img("p05c")],
    rating: 4.5,
    reviewsCount: 67,
  },
  {
    id: "p06",
    slug: "sweatpants",
    name: { ar: "بنطلون رياضي", en: "Sweatpants" },
    description: {
      ar: "بنطلون رياضي بخامة مبطنة وخصر مطاطي، راحة طول اليوم.",
      en: "Fleece sweatpants with an elastic waist. All-day comfort.",
    },
    category: "pants",
    collections: ["winter-26"],
    price: 800,
    colors: [
      { name: { ar: "رمادي", en: "Grey" }, hex: "#78716c" },
      { name: { ar: "أسود", en: "Black" }, hex: "#1c1917" },
    ],
    sizes,
    variants: makeVariants(["Grey", "Black"], 9),
    images: [img("p06a"), img("p06b"), img("p06c")],
    rating: 4.4,
    reviewsCount: 41,
  },
  {
    id: "p07",
    slug: "puffer-jacket",
    name: { ar: "جاكيت منفوخ", en: "Puffer Jacket" },
    description: {
      ar: "جاكيت منفوخ خفيف ودافئ، مقاوم للماء الخفيف. بطل الشتاء.",
      en: "A light, warm puffer jacket resistant to light rain. The hero of winter.",
    },
    category: "jackets",
    collections: ["winter-26", "limited"],
    price: 1850,
    compareAtPrice: 2200,
    colors: [
      { name: { ar: "أسود", en: "Black" }, hex: "#1c1917" },
      { name: { ar: "بني", en: "Brown" }, hex: "#5b4033" },
    ],
    sizes,
    variants: makeVariants(["Black", "Brown"], 5),
    images: [img("p07a"), img("p07b"), img("p07c")],
    isNew: true,
    rating: 4.9,
    reviewsCount: 97,
  },
  {
    id: "p08",
    slug: "graphic-tee",
    name: { ar: "تيشيرت بطبعة", en: "Graphic Tee" },
    description: {
      ar: "تيشيرت بطبعة EVAR المميزة على الخلف، قطن ناعم بقصّة عادية.",
      en: "A tee with the signature EVAR back print, in soft cotton with a regular fit.",
    },
    category: "tshirts",
    collections: ["limited"],
    price: 500,
    colors: [
      { name: { ar: "أبيض", en: "White" }, hex: "#f5f5f4" },
      { name: { ar: "أسود", en: "Black" }, hex: "#1c1917" },
    ],
    sizes,
    variants: makeVariants(["White", "Black"], 11),
    images: [img("p08a"), img("p08b"), img("p08c")],
    rating: 4.6,
    reviewsCount: 73,
  },
  {
    id: "p09",
    slug: "evar-cap",
    name: { ar: "كاب EVAR", en: "EVAR Cap" },
    description: {
      ar: "كاب قطن بشعار EVAR مطرز، مقاس قابل للتعديل.",
      en: "A cotton cap with the embroidered EVAR logo and an adjustable strap.",
    },
    category: "accessories",
    collections: ["essentials"],
    price: 300,
    colors: [
      { name: { ar: "أسود", en: "Black" }, hex: "#1c1917" },
      { name: { ar: "بيج", en: "Beige" }, hex: "#d6c7ae" },
    ],
    sizes: ["One Size"],
    variants: [
      { color: "Black", size: "One Size", stock: 20 },
      { color: "Beige", size: "One Size", stock: 15 },
    ],
    images: [img("p09a"), img("p09b"), img("p09c")],
    rating: 4.7,
    reviewsCount: 58,
  },
  {
    id: "p10",
    slug: "knit-sweater",
    name: { ar: "بلوفر تريكو", en: "Knit Sweater" },
    description: {
      ar: "بلوفر تريكو ناعم بخيوط دافئة، مثالي للطبقات الشتوية.",
      en: "A soft knit sweater in warm yarns, perfect for winter layering.",
    },
    category: "hoodies",
    collections: ["winter-26", "limited"],
    price: 1100,
    colors: [
      { name: { ar: "بيج", en: "Beige" }, hex: "#d6c7ae" },
      { name: { ar: "رمادي", en: "Grey" }, hex: "#78716c" },
    ],
    sizes,
    variants: makeVariants(["Beige", "Grey"], 7),
    images: [img("p10a"), img("p10b"), img("p10c")],
    isNew: true,
    rating: 4.8,
    reviewsCount: 49,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "أحمد م.",
    text: {
      ar: "الخامة فوق الممتازة والمقاس مظبوط. وصلني الطلب في يومين. أكيد هطلب تاني.",
      en: "The fabric is beyond excellent and the fit is true to size. My order arrived in two days. Ordering again for sure.",
    },
    rating: 5,
  },
  {
    name: "سارة خ.",
    text: {
      ar: "أول مرة أشتري من EVAR والتجربة كلها راقية، من الموقع للتغليف للقطعة نفسها.",
      en: "My first EVAR order and the whole experience felt premium, from the site to the packaging to the piece itself.",
    },
    rating: 5,
  },
  {
    name: "Omar T.",
    text: {
      ar: "الهودي أحسن من الصور بكتير. خدمة العملاء ردت عليا بسرعة لما سألت عن المقاس.",
      en: "The hoodie is even better than the photos. Support answered fast when I asked about sizing.",
    },
    rating: 4,
  },
  {
    name: "مريم س.",
    text: {
      ar: "جاكيت الشتاء دفء وشكله فخم. سعره يستاهل كل جنيه.",
      en: "The winter jacket is warm and looks luxurious. Worth every pound.",
    },
    rating: 5,
  },
];

export const branches: Branch[] = [
  {
    city: { ar: "القاهرة", en: "Cairo" },
    address: { ar: "١٢ شارع التحرير، الدقي، الجيزة", en: "12 Tahrir St, Dokki, Giza" },
    phone: "+20 100 000 0001",
    hours: { ar: "يومياً ١١ ص - ١١ م", en: "Daily 11 AM - 11 PM" },
  },
  {
    city: { ar: "الإسكندرية", en: "Alexandria" },
    address: { ar: "٤٥ شارع فؤاد، محطة الرمل", en: "45 Fouad St, Raml Station" },
    phone: "+20 100 000 0002",
    hours: { ar: "يومياً ١١ ص - ١٠ م", en: "Daily 11 AM - 10 PM" },
  },
  {
    city: { ar: "المنصورة", en: "Mansoura" },
    address: { ar: "٨ شارع الجمهورية", en: "8 Gomhoreya St" },
    phone: "+20 100 000 0003",
    hours: { ar: "يومياً ١٢ م - ١٠ م", en: "Daily 12 PM - 10 PM" },
  },
];

export const shippingRates = {
  door: { cost: 80 },
  pickup: { cost: 40 },
};

export const governorates: { ar: string; en: string }[] = [
  { ar: "القاهرة", en: "Cairo" },
  { ar: "الجيزة", en: "Giza" },
  { ar: "الإسكندرية", en: "Alexandria" },
  { ar: "القليوبية", en: "Qalyubia" },
  { ar: "الدقهلية", en: "Dakahlia" },
  { ar: "الشرقية", en: "Sharqia" },
  { ar: "الغربية", en: "Gharbia" },
  { ar: "المنوفية", en: "Monufia" },
  { ar: "البحيرة", en: "Beheira" },
  { ar: "كفر الشيخ", en: "Kafr El Sheikh" },
  { ar: "دمياط", en: "Damietta" },
  { ar: "بورسعيد", en: "Port Said" },
  { ar: "الإسماعيلية", en: "Ismailia" },
  { ar: "السويس", en: "Suez" },
  { ar: "الفيوم", en: "Fayoum" },
  { ar: "بني سويف", en: "Beni Suef" },
  { ar: "المنيا", en: "Minya" },
  { ar: "أسيوط", en: "Assiut" },
  { ar: "سوهاج", en: "Sohag" },
  { ar: "قنا", en: "Qena" },
  { ar: "الأقصر", en: "Luxor" },
  { ar: "أسوان", en: "Aswan" },
  { ar: "البحر الأحمر", en: "Red Sea" },
  { ar: "مطروح", en: "Matrouh" },
  { ar: "شمال سيناء", en: "North Sinai" },
  { ar: "جنوب سيناء", en: "South Sinai" },
  { ar: "الوادي الجديد", en: "New Valley" },
];
