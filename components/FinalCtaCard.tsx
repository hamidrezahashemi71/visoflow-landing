import Image from "next/image";
import { faDigits } from "@/lib/format";
import CtaButton from "./CtaButton";
import { GlowCard } from "./ui/spotlight-card";

export default function FinalCtaCard() {
  return (
    <GlowCard glowColor="blue" className="block rounded-[28px] p-0 backdrop-blur-none">
      <div className="@container bg-bg-deep relative overflow-hidden rounded-xl px-6 py-9 @3xl:px-12 @3xl:py-14 after:absolute after:top-1/2 after:-right-16 after:h-96 after:w-96 after:-translate-y-1/2 after:rounded-full after:bg-(--gradient-secondary-glow) after:content-['']">
        {/* Inset hairline frame — the thin inner border from the reference */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-4 z-0 rounded-2xl border border-line" />
        <div className="relative z-1 grid items-center gap-8 @3xl:grid-cols-[1fr_1.5fr] @3xl:gap-10">
          <div className="flex justify-center @3xl:justify-start">
            <Image
              src="/assets/images/final.png"
              alt=""
              aria-hidden="true"
              width={521}
              height={421}
              className="bob pointer-events-none h-auto w-48 select-none @3xl:w-full @3xl:max-w-105"
            />
          </div>

          <div className="flex flex-col items-center w-full @3xl:w-3/4 text-center @3xl:items-start @3xl:text-right">
            <p className="mb-4 text-[clamp(18px,2.4vw,24px)] font-bold text-text">
              آماده‌ای شروع کنیم؟ بزن بریم
            </p>

            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-1.5 text-[13px] font-bold text-primary">
              <span className="pulse-dot h-1.75 w-1.75 rounded-full bg-primary" />
              ظرفیت دسترسی زودهنگام محدود است
            </span>

            <h2 className="mb-3 text-[clamp(26px,3.2vw,40px)] leading-[1.45] font-bold text-text">
              صندلی خالی، <span className="text-primary">گران‌ترین</span> صندلی سالن شماست.
            </h2>

            <p className="mb-8 max-w-[100ch] text-base text-text-soft">
              سه دقیقه وقت بگذارید و ببینید نوبت‌های نیامده دقیقاً چقدر برای کسب‌وکار شما هزینه دارند — و با چه راهکارهایی می‌شود جلوی آن را گرفت.
            </p>

            <CtaButton className="w-full">شروع ارزیابی رایگان</CtaButton>

            <div className="mt-4.5 text-[13px] mx-auto font-medium text-primary">
              ۳ دقیقه · رایگان · بدون ثبت‌نام · {faDigits(140)}+ مدیر تا امروز
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
