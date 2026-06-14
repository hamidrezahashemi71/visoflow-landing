"use client";
import { useState } from "react";
import { faDigits, faMoney } from "@/lib/format";
import { QUIZ_URL } from "@/lib/config";

const NO_SHOW_RATE = 0.15;
const WEEKS_PER_MONTH = 4.33;

export default function LossCalculator() {
  const [weekly, setWeekly] = useState(60);
  const [avgValue, setAvgValue] = useState(1_500_000);
  const monthlyLoss = weekly * WEEKS_PER_MONTH * NO_SHOW_RATE * avgValue;
  const yearly = monthlyLoss * 12;

  return (
    <section className="py-20 max-md:py-14">
      <div className="mx-auto max-w-280 px-6">
        <div className="overflow-hidden rounded-[28px] border border-line bg-(--gradient-surface)">
          <div className="grid items-stretch max-md:grid-cols-1 md:grid-cols-[1fr_1.1fr]">
            <div className="p-9 max-md:p-7">
              <div className="mb-2 text-[13.5px] font-bold tracking-wide text-primary">حساب سرانگشتی — همین حالا</div>
              <h2 className="mb-7 text-[clamp(28px,3.5vw,38px)] leading-[1.4] font-bold text-text">
                ابعاد ضرر را ببینید
              </h2>

              <label className="mb-7 block">
                <span className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-text">نوبت‌ها در هفته</span>
                  <span className="text-2xl font-bold text-text-soft">{faDigits(weekly)}</span>
                </span>
                <input type="range" min={20} max={400} step={5} value={weekly}
                  onChange={(e) => setWeekly(Number(e.target.value))} className="w-full" aria-label="تعداد نوبت‌ها در هفته" />
              </label>

              <label className="mb-7 block">
                <span className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-text">میانگین ارزش هر نوبت</span>
                  <span className="text-2xl font-bold text-text-soft">{faMoney(avgValue)} <span className="font-body text-sm text-text-soft">تومان</span></span>
                </span>
                <input type="range" min={300_000} max={10_000_000} step={100_000} value={avgValue}
                  onChange={(e) => setAvgValue(Number(e.target.value))} className="w-full" aria-label="میانگین ارزش هر نوبت" />
              </label>

              <p className="text-[12.5px] leading-7 text-text-soft">
                فرض این محاسبه: حدود {faDigits(15)}٪ نوبت‌ها بدون اطلاع لغو می‌شوند یا مشتری نمی‌آید —
                رقم واقعیِ شما ممکن است کمتر یا بیشتر باشد. ارزیابی دقیقاً همین را مشخص می‌کند.
              </p>
            </div>

            <div className="relative flex flex-col items-center justify-center border-line bg-bg-deep/60 p-9 text-center max-md:border-t md:border-r">
              <div className="pointer-events-none absolute inset-0 bg-(--gradient-radial-warm)" />
              <div className="relative">
                <div className="mb-2 text-sm font-semibold text-text-soft">برآورد ضرر ماهانه از نوبت‌های نیامده</div>
                <div key={Math.round(monthlyLoss)} className="pop text-[clamp(44px,6vw,72px)] leading-none font-bold text-primary tabular-nums" aria-live="polite">
                  {faMoney(monthlyLoss)}
                </div>
                <div className="mt-1 text-sm text-text-soft">تومان در ماه</div>

                <div className="mt-5 inline-block rounded-full bg-danger-soft px-4 py-1.5 text-[13px] font-bold text-text-soft">
                  یعنی حدود {faMoney(yearly)} تومان در سال
                </div>

                <a href={QUIZ_URL}
                  className="group mt-7 flex items-center justify-center gap-2 rounded-full border border-secondary/40 px-6 py-2.5 text-sm font-bold text-text-soft transition-all hover:border-secondary hover:bg-secondary-soft">
                  عدد دقیقِ کسب‌وکار خودتان را بگیرید
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
