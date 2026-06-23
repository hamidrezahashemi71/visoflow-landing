"use client";
import { useState } from "react";
import SectionHead from "./SectionHead";
import { GlowCard } from "./ui/spotlight-card";
import Image from "next/image";
import { InfoBadge } from "./ui/InfoBadge";

const QA = [
  { q: "واقعاً فقط ۳ دقیقه طول می‌کشد؟", a: "بله. سؤال‌ها کوتاه و گزینه‌ای هستند و برای مدیر یک سالن طراحی شده‌اند، نه برای پر کردن فرم‌های طولانی." },
  { q: "آیا باید شماره یا اطلاعات سالنم را بدهم؟", a: "خیر. ارزیابی بدون ثبت‌نام انجام می‌شود. فقط اگر بخواهید نسخه‌ی گزارش برای‌تان ارسال شود، دادن راه ارتباطی اختیاری است." },
  { q: "گزارش چه چیزی به من می‌دهد؟", a: "برآورد ریالی ضرر نوبت‌های نیامده، مقایسه‌ی وضعیت شما با سالن‌های مشابه، و سه اقدام عملی که از همین هفته قابل اجراست." },
  { q: "این یک تبلیغ برای خرید نرم‌افزار است؟", a: "نه در این مرحله. هدف ما شناخت دقیق مسئله است. راهکارها بدون نیاز به هیچ نرم‌افزاری قابل اجرا هستند؛ علاقه‌مندان فقط در دسترسی زودهنگام اولویت می‌گیرند." },
] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="flex items-center gap-6 max-md:flex-col py-20 max-md:py-14 px-6">
      <div className="w-full md:flex-1 md:min-w-0">
        <SectionHead kicker="" title="سوالات متداول" />
        <div className="grid gap-3">
          {QA.map((item, i) => {
            const active = open === i;
            return (
              <GlowCard key={item.q} glowColor="blue">
                <div className={`overflow-hidden rounded-xl bg-bg-deep transition-shadow duration-300 ${active ? "shadow-[0_4px_0_0_var(--color-primary)]" : "shadow-none"}`}>
                  <button onClick={() => setOpen(active ? null : i)} aria-expanded={active}
                    className={`flex w-full items-center justify-start gap-4 px-5 py-4 text-right text-[15px] font-bold ${active ? "text-primary" : "text-text"}`}>
                    <InfoBadge size="md" active={active} />
                    {item.q}
                  </button>
                  <div className={`grid transition-all duration-300 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[14px] leading-8 text-text">{item.a}</p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
      <div className="relative w-full md:w-2/5 lg:w-1/3 shrink-0 aspect-3/4 overflow-hidden rounded-2xl">
        <Image
          src={"/assets/images/faq.png"}
          alt="faq-alt"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
