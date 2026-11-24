"use client";

import { useLocale } from "@/lib/i18n";

export default function PrivacyPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold">{ar ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
      <div className="mt-8 space-y-8 text-sm leading-8 text-ink-soft">
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "البيانات اللي بنجمعها" : "Data we collect"}</h2>
          <p>
            {ar
              ? "بنجمع بس البيانات اللي بتديها لينا عند الطلب: الاسم، رقم الموبايل، والعنوان. منطلبش إنشاء حساب ومنجمعش بيانات دفع، لأن الدفع عند الاستلام."
              : "We only collect what you give us when ordering: name, mobile number, and address. No account is required and we never collect payment data, since payment is cash on delivery."}
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "بنستخدمها في إيه" : "How we use it"}</h2>
          <p>
            {ar
              ? "بياناتك بتتستخدم بس عشان توصيل طلبك والتواصل معاك بخصوصه. ممنبيعش ومنشاركش بياناتك مع أي طرف تالت غير شركة الشحن."
              : "Your data is used only to deliver your order and contact you about it. We never sell or share your data with third parties other than the shipping company."}
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-ink">{ar ? "حماية البيانات" : "Data protection"}</h2>
          <p>
            {ar
              ? "بنحافظ على بياناتك بإجراءات حماية مناسبة، وتقدر تطلب حذف بياناتك في أي وقت عن طريق التواصل معانا."
              : "We protect your data with appropriate safeguards, and you can ask us to delete your data at any time by contacting us."}
          </p>
        </section>
      </div>
    </div>
  );
}
