"use client";

import { useLocale } from "@/lib/i18n";

export default function TermsPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">{ar ? "الشروط والأحكام" : "Terms & Conditions"}</h1>
      <div className="mt-8 space-y-8 text-sm leading-8 text-ink-soft">
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "الطلبات" : "Orders"}</h2>
          <p>
            {ar
              ? "كل طلب بيتأكد تليفونياً قبل الشحن. لو مقدرناش نوصلك خلال ٤٨ ساعة من المحاولة، الطلب بيتلغي تلقائياً. الأسعار المعروضة شاملة الضريبة وممكن تتغير بدون إشعار مسبق، والسعر المعتمد هو اللي وقت تأكيد الطلب."
              : "Every order is confirmed by phone before shipping. If we cannot reach you within 48 hours of trying, the order is cancelled automatically. Displayed prices include tax and may change without notice; the confirmed price is the one at order confirmation."}
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "الدفع" : "Payment"}</h2>
          <p>
            {ar
              ? "الدفع عند الاستلام كاش أو بمحفظة إلكترونية. لازم يتسلم الطلب الشخص اللي اسمه مسجل في الطلب أو من ينوب عنه."
              : "Payment is cash or e-wallet on delivery. The order must be received by the person named on it or their representative."}
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "المنتجات" : "Products"}</h2>
          <p>
            {ar
              ? "بنعمل أقصى جهدنا إن الصور والألوان تكون مطابقة للواقع، مع احتمال اختلاف بسيط بسبب إضاءة التصوير أو شاشة العرض."
              : "We do our best to make photos and colors match reality, allowing for slight differences due to photography lighting or your display."}
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "الملكية الفكرية" : "Intellectual property"}</h2>
          <p>
            {ar
              ? "كل المحتوى والتصميمات والشعارات على الموقع ملك لبراند EVAR ولا يجوز استخدامها بدون إذن كتابي."
              : "All content, designs, and logos on this site belong to the EVAR brand and may not be used without written permission."}
          </p>
        </section>
      </div>
    </div>
  );
}
