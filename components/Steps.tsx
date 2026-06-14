import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const STEPS = [
  { num: "۱", title: "پاسخ به چند سؤال کوتاه", body: "درباره‌ی روش فعلی نوبت‌دهی، تعداد مراجعه‌ها و میزان غیبت مشتری‌ها. بدون سؤال‌های خصوصی.", tag: "حدود ۳ دقیقه" },
  { num: "۲", title: "تحلیل خودکار پاسخ‌ها", body: "پاسخ‌های شما با الگوی کسب‌وکارهای نوبت‌محور مشابه سنجیده می‌شود.", tag: "فوری" },
  { num: "۳", title: "دریافت گزارش اختصاصی", body: "گزارش همان لحظه نمایش داده می‌شود؛ در صورت تمایل، نسخه‌ی آن برای‌تان ارسال می‌شود.", tag: "رایگان" },
] as const;

export default function Steps() {
  return (
    <section className="pb-20 max-md:pb-14">
      <div className="mx-auto max-w-280 px-6">
        <SectionHead kicker="مسیر ساده است" title="سه قدم تا گزارش شما" />
        <div className="grid max-md:grid-cols-1 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 120}>
              <div className="relative px-7 text-center max-md:px-0 max-md:pb-9">
                {i > 0 && <span className="absolute top-6.75 right-1/2 z-1 h-px w-full bg-(--gradient-line-fade) max-md:hidden" />}
                <div className="relative z-2 mx-auto mb-4.5 grid h-13.5 w-13.5 place-items-center rounded-full border border-secondary/40 bg-bg-deep text-2xl font-bold text-text-soft">{s.num}</div>
                <h3 className="mb-1.5 text-[16.5px] font-bold text-text">{s.title}</h3>
                <p className="text-sm text-text-soft">{s.body}</p>
                <span className="mt-2.5 inline-block rounded-full bg-primary-soft px-3 py-0.5 text-xs font-semibold text-primary">{s.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
