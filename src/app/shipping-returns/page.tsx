"use client";

import { useLocale } from "@/lib/i18n";

export default function ShippingReturnsPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">
        {ar ? "الشحن والاستبدال والاسترجاع" : "Shipping, Exchange & Returns"}
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-8 text-ink-soft">
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "الشحن" : "Shipping"}</h2>
          <p>
            {ar
              ? "بنوصل لكل محافظات مصر. توصيل للباب خلال ٢ لـ٥ أيام عمل بتكلفة ٨٠ ج.م، أو استلام من مكتب البريد خلال ٣ لـ٦ أيام عمل بتكلفة ٤٠ ج.م. بنجهز طلبك بعد تأكيده تليفونياً."
              : "We ship to all Egyptian governorates. Door delivery in 2-5 business days for EGP 80, or post-office pickup in 3-6 business days for EGP 40. Orders are prepared after phone confirmation."}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "الاستبدال والاسترجاع" : "Exchange & Returns"}</h2>
          <p>
            {ar
              ? "تقدر تستبدل أو ترجع المنتج خلال ١٤ يوم من الاستلام بدون أي تكلفة، بشرط يكون بحالته الأصلية وغير مستعمل وبتغليفه. المنتجات المعيبة ليها ٣٠ يوم. المندوب بيوثق حالة المنتج عند الاستلام."
              : "You can exchange or return any item within 14 days of delivery at no cost, as long as it is unused and in its original packaging. Defective items are covered for 30 days. Our courier documents the item's condition at pickup."}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "استرداد المبلغ" : "Refunds"}</h2>
          <p>
            {ar
              ? "بعد استلام المرتجع وفحصه، بنرجع المبلغ خلال ٣ لـ٧ أيام عمل عن طريق فودافون كاش أو إنستاباي حسب ما يناسبك."
              : "After we receive and inspect the return, refunds are issued within 3-7 business days via Vodafone Cash or InstaPay, whichever suits you."}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "التواصل" : "Contact"}</h2>
          <p>
            {ar
              ? "لأي استفسار عن الشحن أو الاستبدال، كلمنا على واتساب أو من صفحاتنا على السوشيال ميديا وبنرد في أقل من ٢٤ ساعة."
              : "For any shipping or exchange question, reach us on WhatsApp or our social pages and we reply in under 24 hours."}
          </p>
        </section>
      </div>
    </div>
  );
}
