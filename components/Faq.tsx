"use client";
import { useState } from "react";
import SectionHead from "./SectionHead";
import { GlowCard } from "./ui/spotlight-card";

const QA = [
  { q: "واقعاً فقط ۳ دقیقه طول می‌کشد؟", a: "بله. سؤال‌ها کوتاه و گزینه‌ای هستند و برای مدیر یک سالن طراحی شده‌اند، نه برای پر کردن فرم‌های طولانی." },
  { q: "آیا باید شماره یا اطلاعات سالنم را بدهم؟", a: "خیر. ارزیابی بدون ثبت‌نام انجام می‌شود. فقط اگر بخواهید نسخه‌ی گزارش برای‌تان ارسال شود، دادن راه ارتباطی اختیاری است." },
  { q: "گزارش چه چیزی به من می‌دهد؟", a: "برآورد ریالی ضرر نوبت‌های نیامده، مقایسه‌ی وضعیت شما با سالن‌های مشابه، و سه اقدام عملی که از همین هفته قابل اجراست." },
  { q: "این یک تبلیغ برای خرید نرم‌افزار است؟", a: "نه در این مرحله. هدف ما شناخت دقیق مسئله است. راهکارها بدون نیاز به هیچ نرم‌افزاری قابل اجرا هستند؛ علاقه‌مندان فقط در دسترسی زودهنگام اولویت می‌گیرند." },
] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="pb-20 max-md:pb-14">
      <div className="mx-auto max-w-190 px-6">
        <SectionHead kicker="قبل از شروع" title="سؤال‌هایی که شاید برایتان پیش بیاید" />
        <div className="grid gap-3">
          {QA.map((item, i) => {
            const active = open === i;
            return (
              <GlowCard key={item.q} customSize glowColor="blue" className="block p-0 backdrop-blur-none bg-transparent!">
              <div className="overflow-hidden rounded-2xl bg-surface/60">
                <button onClick={() => setOpen(active ? null : i)} aria-expanded={active}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right text-[15px] font-bold text-text">
                  {item.q}
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary transition-transform duration-300 ${active ? "rotate-45" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14px] leading-8 text-text-soft">{item.a}</p>
                  </div>
                </div>
              </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
