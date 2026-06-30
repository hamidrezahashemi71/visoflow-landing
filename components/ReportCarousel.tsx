"use client";
import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import ImagePlaceholder from "./ImagePlaceholder";
import { GlowCard } from "./ui/spotlight-card";

function GaugeSlide() {
  const r = 80, c = Math.PI * r, filled = c * 0.72;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-56 max-w-full" aria-hidden="true">
        <path d="M20 110 A 80 80 0 0 1 180 110" fill="none" stroke="var(--color-line)" strokeWidth="14" strokeLinecap="round" />
        <path d="M20 110 A 80 80 0 0 1 180 110" fill="none" stroke="url(#vg)" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${filled} ${c}`} />
        <defs>
          <linearGradient id="vg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-primary-deep)" />
            <stop offset="1" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
        <text x="100" y="92" textAnchor="middle" fill="var(--color-secondary)" fontSize="28" fontWeight="700">۸٬۴۰۰٬۰۰۰</text>
        <text x="100" y="112" textAnchor="middle" fill="var(--color-text-soft)" fontSize="11">تومان ضرر برآوردی در ماه</text>
      </svg>
      <div className="mt-4 rounded-full bg-danger-soft px-4 py-1 text-xs font-bold text-text-soft">صفحه‌ی اول گزارش شما</div>
    </div>
  );
}

function CompareSlide() {
  const bars = [
    { label: "سالن شما", w: "78%", cls: "bg-(--gradient-primary)" },
    { label: "میانگین سالن‌های مشابه", w: "52%", cls: "bg-secondary/40" },
    { label: "سالن‌های با یادآوری خودکار", w: "22%", cls: "bg-secondary" },
  ];
  return (
    <div className="w-full max-w-sm">
      <div className="mb-4 text-center text-sm font-semibold text-text-soft">نرخ نوبت‌های نیامده — مقایسه</div>
      {bars.map((b) => (
        <div key={b.label} className="mb-3.5">
          <div className="mb-1 text-xs text-text-soft">{b.label}</div>
          <div className="h-4 overflow-hidden rounded-full bg-bg-deep">
            <div className={`h-full rounded-full ${b.cls}`} style={{ width: b.w }} />
          </div>
        </div>
      ))}
      <div className="mx-auto mt-5 w-fit rounded-full bg-secondary-soft px-4 py-1 text-xs font-bold text-text-soft">جایگاه شما میان هم‌صنف‌ها</div>
    </div>
  );
}

function ActionsSlide() {
  const items = ["بهترین زمان ارسال یادآوری برای مشتری‌های شما","متن پیشنهادی پیامک تأیید نوبت","ایجاد تصویر حرفه‌ای از سالن شما برای مشتری"];
  return (
    <div className="w-full max-w-sm">
      <div className="mb-4 text-center text-sm font-semibold text-text-soft">سه اقدام عملی — از همین هفته</div>
      {items.map((t, i) => (
        <GlowCard key={t} glowColor="blue" className="mb-3 flex items-center gap-3 bg-bg-deep/70! px-4 py-3.5 text-sm backdrop-blur-none">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-(--gradient-primary) text-base font-bold text-text">{["۱","۲","۳"][i]}</span>
          {t}
        </GlowCard>
      ))}
      <div className="mx-auto mt-5 w-fit rounded-full bg-secondary-soft px-4 py-1 text-xs font-bold text-text-soft">رابط نرم‌افزاری ساده</div>
    </div>
  );
}

const SLIDES = [
  { key: "cover", title: "گزارش اختصاصی، با برند خودتان", body: "یک سند تمیز و قابل‌ارائه — مناسب بایگانی یا اشتراک با تیم.", node: <ImagePlaceholder label="تصویر جلد گزارش" ratio="aspect-[3/2]" className="w-72 max-w-full" /> },
  { key: "gauge", title: "برآورد ریالی درآمد ازدست‌رفته", body: "بر اساس تعداد نوبت‌ها و میانگین ارزش خدمات شما.", node: <GaugeSlide /> },
  { key: "compare", title: "مقایسه با کسب‌وکارهای مشابه", body: "وضعیت شما نسبت به کلینیک‌ها و سالن‌های هم‌اندازه.", node: <CompareSlide /> },
  { key: "actions", title: "سه اقدام عملی و فوری", body: "راهکارهایی که از همین هفته قابل اجرا هستند.", node: <ActionsSlide /> },
] as const;

const AUTO_MS = 5000;

export default function ReportCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_MS);
    return () => clearInterval(t);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 40) setIndex((i) => (i + 1) % SLIDES.length);
    if (dx < -40) setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    touchX.current = null;
  };

  return (
    <section className="pb-20 max-md:pb-14">
      <div className="mx-auto max-w-280 px-6">
        <SectionHead kicker="در پایان ارزیابی چه می‌گیرید؟" title="نگاهی به داخل گزارش بیندازید"
          lead="گزارش شما همین شکل را دارد — اما با عددهای واقعیِ کسب‌وکار خودتان." />

        <GlowCard  glowColor="blue" className="mx-auto block max-w-3xl rounded-[28px] p-0 backdrop-blur-none bg-transparent!">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface/60"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(${index * 100}%)` }}>
            {SLIDES.map((s) => (
              <div key={s.key} className="flex min-h-100 w-full shrink-0 flex-col items-center justify-center gap-6 px-8 py-12">
                {s.node}
                <div className="text-center">
                  <h3 className="mb-1 text-[17.5px] font-bold text-text">{s.title}</h3>
                  <p className="text-sm text-text-soft">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* arrows */}
          <button onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)} aria-label="قبلی"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 text-text-soft transition hover:bg-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
          <button onClick={() => setIndex((i) => (i + 1) % SLIDES.length)} aria-label="بعدی"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 text-text-soft transition hover:bg-bg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {SLIDES.map((s, i) => (
              <button key={s.key} onClick={() => setIndex(i)} aria-label={`اسلاید ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-7 bg-primary" : "w-2 bg-secondary/40 hover:bg-secondary/70"}`} />
            ))}
          </div>
        </div>
        </GlowCard>
      </div>
    </section>
  );
}
