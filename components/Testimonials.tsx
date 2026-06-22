import ScrollReelTestimonials from "./ScrollReelTestimonials";
import SectionHead from "./SectionHead";

const ITEMS = [
  {
    quote: "همیشه فکر می‌کردم غیبت مشتری‌ها عادی است؛ گزارش نشان داد ماهانه چه عددی از دستم می‌رود. تکان‌دهنده بود.",
    author: "مدیر کلینیک زیبایی - تهران",
    image:
      "/assets/images/testimonial-1.png",
    alt: "Portrait of 1",
  },
  {
    quote:
      "سؤال‌ها واقعاً کوتاه بودند و سه راهکاری که گرفتم را همان هفته اجرا کردیم. غیبت‌ها محسوس کم شد.",
    author: "مدیر سالن - اصفهان",
    image:
      "/assets/images/testimonial-2.png",
    alt: "Portrait of 2",
  },
  {
    quote: "خوب بود که بدون ثبت‌نام و بدون فروشِ چیزی، فقط یک تصویر روشن از وضعیت گرفتم.",
    author: "اپراتور لیزر - شیراز",
    image:
      "/assets/images/testimonial-3.png",
    alt: "Portrait of 3",
  },
];
export default function Testimonials() {
  return (
    <section id="testimonials" className="flex flex-col items-center justify-center bg-background p-8">
      <SectionHead kicker="از زبان مدیران سالن‌ها" title="چرا دیگران ارزیابی را کامل کردند" />
      <ScrollReelTestimonials testimonials={ITEMS} />
    </section>
  );
}
