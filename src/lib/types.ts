export type Locale = "ar" | "en";

export interface Localized {
  ar: string;
  en: string;
}

export interface ColorOption {
  name: Localized;
  hex: string;
}

export interface Variant {
  color: string;
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: Localized;
  description: Localized;
  category: string;
  collections: string[];
  price: number;
  compareAtPrice?: number;
  colors: ColorOption[];
  sizes: string[];
  variants: Variant[];
  images: string[];
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: Localized;
  image: string;
}

export interface Collection {
  id: string;
  name: Localized;
  tagline: Localized;
  image: string;
}

export interface Testimonial {
  name: string;
  text: Localized;
  rating: number;
}

export interface Branch {
  city: Localized;
  address: Localized;
  phone: string;
  hours: Localized;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: Localized;
  image: string;
  price: number;
  color: string;
  colorHex: string;
  size: string;
  qty: number;
}

export interface Order {
  ref: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    phone2?: string;
    email?: string;
    governorate: string;
    city: string;
    address: string;
    notes?: string;
  };
  shippingMethod: "door" | "pickup";
  shippingCost: number;
  subtotal: number;
  total: number;
  payment: "cod";
  createdAt: string;
  status: "pending_confirmation";
}
