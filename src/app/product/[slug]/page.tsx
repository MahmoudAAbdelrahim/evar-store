"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { formatPrice, discountPercent } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import { governorates, products } from "@/lib/mock-data";
import { itemPayload, track } from "@/lib/track";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, L, locale } = useLocale();
  const { add } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.slug === slug);
  const [imgIdx, setImgIdx] = useState(0);
  const [color, setColor] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState("");
  const [buyOpen, setBuyOpen] = useState(false);
  const [buyForm, setBuyForm] = useState({ name: "", phone: "", gov: "", address: "" });
  const [buyErr, setBuyErr] = useState("");

  const related = useMemo(
    () => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4),
    [product]
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-ink-soft">
        {t("noResults")}
      </div>
    );
  }

  const off = discountPercent(product.price, product.compareAtPrice);

  useEffect(() => {
    track("view_item", {
      currency: "EGP",
      value: product.price,
      items: [itemPayload({ productId: product.id, name: product.name, price: product.price })],
    });
  }, [product]);

  const stock =
    color && size
      ? (product.variants.find((v) => v.color === color && v.size === size)?.stock ?? 0)
      : null;
  const ready = Boolean(color && size && (stock ?? 0) > 0);

  const toCartItem = () => {
    const c = product.colors.find((x) => x.name.en === color)!;
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      color: L(c.name),
      colorHex: c.hex,
      size: size!,
      qty,
    };
  };

  const onAdd = () => {
    if (!color || !size) {
      setFlash(t("chooseOptions"));
      return;
    }
    if (!stock) return;
    add(toCartItem());
    track("add_to_cart", {
      currency: "EGP",
      value: product.price * qty,
      items: [itemPayload({ ...toCartItem() })],
    });
    setFlash(t("addedToCart"));
    setTimeout(() => setFlash(""), 1800);
  };

  const onBuyNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!color || !size) {
      setBuyErr(t("chooseOptions"));
      return;
    }
    if (!buyForm.name.trim() || !buyForm.phone.trim() || !buyForm.gov || !buyForm.address.trim()) {
      setBuyErr(t("requiredField"));
      return;
    }
    // mock direct order: route through checkout carrying the single item
    add(toCartItem());
    router.push("/checkout");
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[imgIdx]}
              alt={L(product.name)}
              className="h-full w-full object-cover"
            />
            {off && (
              <span className="absolute start-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink">
                {off}% {t("off")}
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setImgIdx(i)}
                className={`aspect-[4/5] w-20 overflow-hidden rounded-xl border-2 transition-colors ${
                  i === imgIdx ? "border-accent" : "border-line"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* details */}
        <div>
          <h1 className="font-display text-3xl font-bold">{L(product.name)}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
              <path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.7 5.8 21.2l1.4-7L2 9.4l7-.8L12 2Z" />
            </svg>
            {product.rating} · {product.reviewsCount} {t("reviews")}
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-accent-strong">
              {formatPrice(product.price, locale)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-ink-soft line-through">
                {formatPrice(product.compareAtPrice, locale)}
              </span>
            )}
          </div>

          <p className="mt-5 leading-8 text-ink-soft">{L(product.description)}</p>

          {/* colors */}
          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold">{t("selectColor")}</div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColor(c.name.en)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    color === c.name.en
                      ? "border-accent bg-accent/10 text-ink"
                      : "border-line text-ink-soft hover:border-accent/50"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-line"
                    style={{ backgroundColor: c.hex }}
                  />
                  {L(c.name)}
                </button>
              ))}
            </div>
          </div>

          {/* sizes */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold">{t("selectSize")}</span>
              <Link href="/size-guide" className="text-xs text-accent-strong hover:underline">
                {t("sizeGuideLink")}
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const v = color
                  ? product.variants.find((x) => x.color === color && x.size === s)
                  : undefined;
                const soldOut = v ? v.stock === 0 : false;
                return (
                  <button
                    key={s}
                    disabled={soldOut}
                    onClick={() => setSize(s)}
                    className={`min-w-11 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                      size === s
                        ? "border-accent bg-accent text-accent-ink"
                        : soldOut
                          ? "cursor-not-allowed border-line text-ink-soft/40 line-through"
                          : "border-line hover:border-accent/60"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {stock !== null && (
              <p className={`mt-2 text-xs font-semibold ${stock === 0 ? "text-red-500" : stock <= 3 ? "text-amber-600" : "text-emerald-600"}`}>
                {stock === 0 ? t("outOfStock") : stock <= 3 ? t("lowStock") : t("inStock")}
              </p>
            )}
          </div>

          {/* qty + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-line">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 text-lg">−</button>
              <span className="min-w-8 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="px-4 py-2.5 text-lg">+</button>
            </div>
            <button
              onClick={onAdd}
              disabled={color !== null && size !== null && stock === 0}
              className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.02] disabled:opacity-40 sm:flex-none sm:px-10"
            >
              {t("addToCart")}
            </button>
            <button
              onClick={() => setBuyOpen((v) => !v)}
              className="flex-1 rounded-full border-2 border-accent px-6 py-2.5 text-sm font-semibold text-accent-strong transition-colors hover:bg-accent/10 sm:flex-none sm:px-10"
            >
              {t("buyNow")}
            </button>
          </div>
          {flash && <p className="mt-3 text-sm font-semibold text-accent-strong">{flash}</p>}

          {/* buy now inline form */}
          {buyOpen && (
            <form onSubmit={onBuyNow} className="mt-6 rounded-2xl border border-accent/40 bg-accent/5 p-5">
              <h3 className="font-bold">{t("buyNowTitle")}</h3>
              <p className="mt-1 text-xs text-ink-soft">{t("buyNowSub")}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  value={buyForm.name}
                  onChange={(e) => setBuyForm({ ...buyForm, name: e.target.value })}
                  placeholder={t("fullName")}
                  className={inputCls}
                />
                <input
                  value={buyForm.phone}
                  onChange={(e) => setBuyForm({ ...buyForm, phone: e.target.value })}
                  placeholder={t("phone")}
                  inputMode="tel"
                  dir="ltr"
                  className={inputCls}
                />
                <select
                  value={buyForm.gov}
                  onChange={(e) => setBuyForm({ ...buyForm, gov: e.target.value })}
                  className={inputCls}
                >
                  <option value="">{t("governorate")}</option>
                  {governorates.map((g) => (
                    <option key={g.en} value={g.en}>{L(g)}</option>
                  ))}
                </select>
                <input
                  value={buyForm.address}
                  onChange={(e) => setBuyForm({ ...buyForm, address: e.target.value })}
                  placeholder={t("address")}
                  className={inputCls}
                />
              </div>
              {buyErr && <p className="mt-2 text-xs font-semibold text-red-500">{buyErr}</p>}
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-ink transition-transform hover:scale-[1.01]"
              >
                {t("buyNow")} · {formatPrice(product.price * qty, locale)}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold">{t("relatedProducts")}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
