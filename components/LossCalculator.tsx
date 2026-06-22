"use client";
import { useState } from "react";
import Image from "next/image";
import { faDigits, faMoney } from "@/lib/format";
import CtaButton from "./CtaButton";
import WheelPicker from "./ui/WheelPicker";
import { GlowCard } from "./ui/spotlight-card";

const NO_SHOW_RATE = 0.15;
const WEEKS_PER_MONTH = 4.33;

const WEEKLY_OPTIONS = [20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150];
const VALUE_OPTIONS = [
  500_000, 1_000_000, 1_500_000, 2_000_000, 2_500_000,
  3_000_000, 3_500_000, 4_000_000, 5_000_000,
];

export default function LossCalculator() {
  const [weekly, setWeekly] = useState(60);
  const [avgValue, setAvgValue] = useState(1_500_000);
  const monthlyLoss = weekly * WEEKS_PER_MONTH * NO_SHOW_RATE * avgValue;
  const yearly = monthlyLoss * 12;

  return (
    <section id="loss-calculator" className="py-20 max-md:py-14">
      <div className="mx-auto w-full px-6">
        <div className="grid items-center gap-x-10 gap-y-10 max-md:gap-8 grid-cols-1 md:grid-cols-[1fr_1fr]">
          <GlowCard className="rounded-[28px] border border-line bg-bg-deep p-8 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.28)] max-md:p-6">
            <div className="mb-6 text-center text-[clamp(18px,1.8vw,22px)] font-bold text-primary">
              حساب سرانگشتی — همین الان
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-3 text-center text-[14.5px] font-bold text-text">
                  تعداد نوبت‌ها در هفته
                </div>
                <WheelPicker
                  options={WEEKLY_OPTIONS}
                  value={weekly}
                  onChange={setWeekly}
                  format={faDigits}
                  label="تعداد نوبت‌ها در هفته"
                />
              </div>
              <div>
                <div className="mb-3 text-center text-[14.5px] font-bold text-text">
                  ارزش حدودی هر نوبت
                </div>
                <WheelPicker
                  options={VALUE_OPTIONS}
                  value={avgValue}
                  onChange={setAvgValue}
                  format={faMoney}
                  label="ارزش حدودی هر نوبت"
                />
              </div>
            </div>

            <div className="mt-7 flex items-start gap-2.5 border-t border-line pt-5">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary pt-px text-[9px] font-bold leading-none text-bg">
                i
              </span>
              <p className="text-[12px] leading-6 text-text-soft">
                فرض این محاسبه: حدود {faDigits(15)}٪ نوبت‌ها بدون اطلاع لغو می‌شوند یا
                مشتری نمی‌آید — رقم واقعیِ شما ممکن است کمتر یا بیشتر باشد. ارزیابی
                دقیقاً همین را مشخص می‌کند.
              </p>
            </div>
          </GlowCard>
          <div className="relative">
            <Image
              src="/assets/images/calc-loss.png"
              alt=""
              aria-hidden="true"
              width={250}
              height={550}
              className="absolute  md:-z-1 opacity-10 xl:opacity-100 pointer-events-none mx-auto mb-6 h-auto select-none object-contain xl:absolute xl:inset-y-0 xl:right-0 xl:m-0 hidden sm:block"
            />

            <div className="flex flex-col items-center text-center xl:items-end xl:pr-[clamp(210px,15vw,240px)]">
              <h2 className="mb-6 text-[clamp(26px,3vw,34px)] font-bold leading-normal text-text">
                برآورد ماهانه ضرر از نوبت‌های نیامده
              </h2>
              <div
                key={Math.round(monthlyLoss)}
                className="pop text-[clamp(48px,7vw,86px)] font-bold leading-[1.05] text-primary tabular-nums mx-auto"
                aria-live="polite"
              >
                {faMoney(monthlyLoss)}
              </div>
              <div className="mt-2 text-[clamp(18px,2vw,24px)] font-bold text-primary mx-auto">
                تومان در ماه
              </div>
              <p className="mt-6 text-[15px] text-text-soft mx-auto">
                یعنی معادل{" "}
                <b className="text-[clamp(18px,2vw,22px)] font-bold text-primary tabular-nums">
                  {faMoney(yearly)}
                </b>{" "}
                تومان در سال
              </p>
              <CtaButton size="xxl" className="group mt-9 w-full justify-center max-md:max-w-sm">
                عدد دقیق کسب‌وکار خود را بگیرید
              </CtaButton>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
