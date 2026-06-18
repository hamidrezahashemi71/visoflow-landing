import { QUIZ_URL } from "@/lib/config";
import { faDigits } from "@/lib/format";
import LumiIntro from "./LumiIntro";

export default function FinalCta() {
  return (
    <section id="quiz" className="py-20 max-md:py-14">
      <div className="mx-auto max-w-280 px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-(--gradient-cta-band) px-8  text-center after:absolute after:-bottom-30 after:-left-20 after:h-85 after:w-85 after:rounded-full after:bg-(--gradient-secondary-glow) after:content-['']">
          {/* Lumi greets the visitor and walks them into the survey */}
          <LumiIntro />
          <span className="relative z-1 mb-5 inline-flex items-center gap-2 rounded-full bg-bg-deep/40 px-4 py-1.5 text-[13px] font-bold text-text-soft backdrop-blur-sm">
            <span className="pulse-dot h-1.75 w-1.75 rounded-full bg-secondary" />
            ظرفیت دسترسی زودهنگام محدود است
          </span>
          <h2 className="relative z-1 mb-3 text-[clamp(30px,4vw,44px)] leading-[1.45] font-bold text-text">
            صندلی خالی، گران‌ترین صندلی سالن شماست.
          </h2>
          <p className="relative z-1 mx-auto mb-8 max-w-[52ch] text-base text-text/85">
            سه دقیقه وقت بگذارید و ببینید نوبت‌های نیامده دقیقاً چقدر برای کسب‌وکار شما هزینه دارند — و با چه راهکارهایی می‌شود جلوی آن را گرفت.
          </p>
          <a href={QUIZ_URL}
            className="group relative z-1 inline-flex items-center gap-2.5 rounded-full bg-bg-deep px-8.5 py-3.75 text-[16.5px] font-bold text-text-soft shadow-(--shadow-drop) transition-all duration-200 hover:-translate-y-0.5 hover:bg-bg">
            شروع ارزیابی رایگان
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-x-1"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          </a>
          <div className="relative z-1 mt-4.5 text-[13px] font-medium text-text/75">
            ۳ دقیقه · رایگان · بدون ثبت‌نام · {faDigits(140)}+ مدیر تا امروز
          </div>
        </div>
      </div>
    </section>
  );
}
