"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createOrder } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useLocale } from "@/lib/i18n";
import { governorates, shippingRates } from "@/lib/mock-data";
import { itemPayload, track } from "@/lib/track";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent";
const errCls = "mt-1 text-xs font-semibold text-red-500";

export default function CheckoutPage() {
  const { t, L, locale } = useLocale();
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    phone2: "",
    email: "",
    governorate: "",
    city: "",
    address: "",
    notes: "",
  });
  const [method, setMethod] = useState<"door" | "pickup">("door");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);

  const shippingCost = shippingRates[method].cost;
  const total = subtotal + shippingCost;

  const tracked = useRef(false);
  useEffect(() => {
    if (!tracked.current && items.length > 0) {
      tracked.current = true;
      track("begin_checkout", {
        currency: "EGP",
        value: subtotal,
        items: items.map((i) => itemPayload(i)),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = t("requiredField");
    if (!/^01[0-9]{9}$/.test(form.phone.trim())) e.phone = t("invalidPhone");
    if (form.phone2.trim() && !/^01[0-9]{9}$/.test(form.phone2.trim())) e.phone2 = t("invalidPhone");
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t("invalidEmail");
    if (!form.governorate) e.governorate = t("requiredField");
    if (!form.city.trim()) e.city = t("requiredField");
    if (form.address.trim().length < 8) e.address = t("requiredField");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (items.length === 0 || placing) return;
    if (!validate()) return;
    setPlacing(true);
    const order = await createOrder({
      items,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        phone2: form.phone2.trim() || undefined,
        email: form.email.trim() || undefined,
        governorate: form.governorate,
        city: form.city.trim(),
        address: form.address.trim(),
        notes: form.notes.trim() || undefined,
      },
      shippingMethod: method,
      shippingCost,
      subtotal,
      total,
      payment: "cod",
    });
    try {
      const saved = window.localStorage.getItem("evar-orders");
      const orders = saved ? JSON.parse(saved) : {};
      orders[order.ref] = order;
      window.localStorage.setItem("evar-orders", JSON.stringify(orders));
    } catch {
      // storage unavailable: the confirmation page still gets the ref
    }
    clear();
    router.push(`/order/${order.ref}`);
  };

  if (items.length === 0 && !placing) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-ink-soft">
        {t("cartEmpty")}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">{t("checkoutTitle")}</h1>
      <p className="mt-1 text-sm text-ink-soft">{t("guestNote")}</p>

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          {/* contact */}
          <section className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-4 font-bold">{t("contactInfo")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input value={form.name} onChange={set("name")} placeholder={t("fullName")} className={inputCls} />
                {errors.name && <p className={errCls}>{errors.name}</p>}
              </div>
              <div>
                <input value={form.phone} onChange={set("phone")} placeholder={t("phone")} inputMode="tel" dir="ltr" className={inputCls} />
                {errors.phone && <p className={errCls}>{errors.phone}</p>}
              </div>
              <div>
                <input value={form.phone2} onChange={set("phone2")} placeholder={t("phone2")} inputMode="tel" dir="ltr" className={inputCls} />
                {errors.phone2 && <p className={errCls}>{errors.phone2}</p>}
              </div>
              <div>
                <input value={form.email} onChange={set("email")} placeholder={t("email")} inputMode="email" dir="ltr" className={inputCls} />
                {errors.email && <p className={errCls}>{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* address */}
          <section className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-4 font-bold">{t("shippingAddress")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <select value={form.governorate} onChange={set("governorate")} className={inputCls}>
                  <option value="">{t("governorate")}</option>
                  {governorates.map((g) => (
                    <option key={g.en} value={g.en}>{L(g)}</option>
                  ))}
                </select>
                {errors.governorate && <p className={errCls}>{errors.governorate}</p>}
              </div>
              <div>
                <input value={form.city} onChange={set("city")} placeholder={t("city")} className={inputCls} />
                {errors.city && <p className={errCls}>{errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <input value={form.address} onChange={set("address")} placeholder={t("address")} className={inputCls} />
                {errors.address && <p className={errCls}>{errors.address}</p>}
              </div>
              <div className="sm:col-span-2">
                <textarea value={form.notes} onChange={set("notes")} placeholder={t("notes")} rows={2} className={inputCls} />
              </div>
            </div>
          </section>

          {/* shipping method */}
          <section className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-4 font-bold">{t("shippingMethod")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "door", label: t("doorDelivery"), time: t("doorTime"), cost: shippingRates.door.cost },
                  { id: "pickup", label: t("pickupPoint"), time: t("pickupTime"), cost: shippingRates.pickup.cost },
                ] as const
              ).map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`rounded-2xl border-2 p-4 text-start transition-colors ${
                    method === m.id ? "border-accent bg-accent/5" : "border-line hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{m.label}</span>
                    <span className="text-sm font-bold text-accent-strong">{formatPrice(m.cost, locale)}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">{m.time}</p>
                </button>
              ))}
            </div>
          </section>

          {/* payment */}
          <section className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="mb-4 font-bold">{t("paymentMethod")}</h2>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-accent bg-accent/5 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2.5" y="6" width="19" height="13" rx="2.5" />
                  <path d="M2.5 10h19" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-bold">{t("cod")}</div>
                <div className="text-xs text-ink-soft">{t("codNote")}</div>
              </div>
            </div>
          </section>
        </div>

        {/* summary */}
        <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="mb-4 font-bold">{t("orderSummary")}</h2>
          <div className="mb-4 max-h-56 space-y-3 overflow-auto">
            {items.map((i) => (
              <div key={`${i.productId}|${i.color}|${i.size}`} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image} alt="" className="h-12 w-10 rounded-lg object-cover" />
                <div className="flex-1 text-xs">
                  <div className="font-semibold">{L(i.name)}</div>
                  <div className="text-ink-soft">{i.color} · {i.size} · ×{i.qty}</div>
                </div>
                <span className="text-xs font-bold">{formatPrice(i.price * i.qty, locale)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-soft">{t("subtotal")}</span>
              <span className="font-semibold">{formatPrice(subtotal, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">{t("shipping")}</span>
              <span className="font-semibold">{formatPrice(shippingCost, locale)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base font-bold">
              <span>{t("total")}</span>
              <span className="text-accent-strong">{formatPrice(total, locale)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={placing}
            className="mt-5 w-full rounded-full bg-accent py-3.5 text-sm font-bold text-accent-ink transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {placing ? t("placing") : `${t("placeOrder")} · ${formatPrice(total, locale)}`}
          </button>
          <p className="mt-3 text-center text-[11px] leading-5 text-ink-soft">{t("finalNote")}</p>
        </aside>
      </form>
    </div>
  );
}
