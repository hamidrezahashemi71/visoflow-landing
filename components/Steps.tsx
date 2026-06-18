import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { GlowCard } from "./ui/spotlight-card";

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
        <div className="grid gap-5 max-md:grid-cols-1 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 120}>
              <GlowCard customSize glowColor="blue" className="block h-full bg-surface/60! px-7 py-8 text-center backdrop-blur-none">
                <div className="relative z-2 mx-auto mb-4.5 grid h-13.5 w-13.5 place-items-center rounded-full border border-secondary/40 bg-bg-deep text-2xl font-bold text-text-soft">{s.num}</div>
                <h3 className="mb-1.5 text-[16.5px] font-bold text-text">{s.title}</h3>
                <p className="text-sm text-text-soft">{s.body}</p>
                <span className="mt-2.5 inline-block rounded-full bg-primary-soft px-3 py-0.5 text-xs font-semibold text-primary">{s.tag}</span>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
