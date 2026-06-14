import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import ImagePlaceholder from "./ImagePlaceholder";

const ITEMS = [
  { quote: "همیشه فکر می‌کردم غیبت مشتری‌ها عادی است؛ گزارش نشان داد ماهانه چه عددی از دستم می‌رود. تکان‌دهنده بود.", name: "مدیر کلینیک زیبایی", city: "تهران" },
  { quote: "سؤال‌ها واقعاً کوتاه بودند و سه راهکاری که گرفتم را همان هفته اجرا کردیم. غیبت‌ها محسوس کم شد.", name: "مدیر سالن", city: "اصفهان" },
  { quote: "خوب بود که بدون ثبت‌نام و بدون فروشِ چیزی، فقط یک تصویر روشن از وضعیت گرفتم.", name: "اپراتور لیزر", city: "شیراز" },
] as const;

export default function Testimonials() {
  return (
    <section className="border-y border-line bg-bg-deep py-20 max-md:py-14">
      <div className="mx-auto max-w-280 px-6">
        <SectionHead kicker="از زبان مدیران سالن‌ها" title="چرا دیگران ارزیابی را کامل کردند" />
        <div className="grid gap-5 max-md:grid-cols-1 md:grid-cols-3">
          {ITEMS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="flex h-full flex-col rounded-card border border-line bg-surface/60 p-6">
                <div className="mb-3 flex gap-1 text-primary" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <svg key={k} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 17.8 5.4 21.2 6.7 14.2 1.7 9.4l7-.9z"/></svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-[14.5px] leading-8 text-text">«{t.quote}»</blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                  <div className="text-[13px]">
                    <div className="font-bold text-text-soft">{t.name}</div>
                    <div className="text-text-soft">{t.city}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
