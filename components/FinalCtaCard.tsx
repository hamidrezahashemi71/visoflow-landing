import { faDigits } from "@/lib/format";
import LumiIntro from "./LumiIntro";
import CtaButton from "./CtaButton";
import { GlowCard } from "./ui/spotlight-card";

/**
 * The CTA band itself — shared by the on-page <FinalCta> section and the
 * timed <FinalCtaModal> so both render byte-for-byte the same card.
 */
export default function FinalCtaCard() {
  return (
    <GlowCard customSize glowColor="blue" className="block rounded-[28px] p-0 backdrop-blur-none bg-transparent!">
    <div className="relative overflow-hidden rounded-[28px] bg-(--gradient-cta-band) px-8 text-center after:absolute after:-bottom-30 after:-left-20 after:h-85 after:w-85 after:rounded-full after:bg-(--gradient-secondary-glow) after:content-['']">
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
      <CtaButton className="relative z-1">شروع ارزیابی رایگان</CtaButton>
      <div className="relative z-1 mt-4.5 text-[13px] font-medium text-text/75">
        ۳ دقیقه · رایگان · بدون ثبت‌نام · {faDigits(140)}+ مدیر تا امروز
      </div>
    </div>
    </GlowCard>
  );
}
