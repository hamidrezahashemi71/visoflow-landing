import AppointmentBook from "./AppointmentBook";
import CtaButton from "./CtaButton";
import { faDigits } from "@/lib/format";

export default function Hero() {
  return (
    <header className="relative overflow-hidden py-18 pb-20">
      <div className="glow-drift pointer-events-none absolute -top-32 -left-32 h-120 w-120 rounded-full bg-(--gradient-hero-glow)" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-105 w-105 rounded-full bg-(--gradient-secondary-glow)" />

      <div className="relative mx-auto grid max-w-280 items-center gap-14 px-6 max-md:grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <span className="mb-5.5 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary-soft px-4 py-1.5 text-[13.5px] font-semibold text-text-soft">
            <span className="pulse-dot h-1.75 w-1.75 rounded-full bg-primary" />
            ویژه مدیران کلینیک‌ها و سالن‌های زیبایی
          </span>

          <h1 className="mb-4.5 text-[clamp(38px,5vw,58px)] leading-[1.35] font-bold text-text">
            چقدر از درآمد سالن شما قربانی{" "}
            <em className="relative whitespace-nowrap text-primary not-italic after:absolute after:right-0 after:bottom-1.5 after:left-0 after:-z-10 after:h-2.5 after:rounded after:bg-danger-soft after:content-['']">
              نوبت‌های نیامده
            </em>{" "}
            می‌شود؟
          </h1>

          <p className="mb-7 max-w-[46ch] text-[17px] text-text-soft">
            در ۳ دقیقه به چند سؤال کوتاه پاسخ دهید و یک گزارش اختصاصی بگیرید:
            برآورد درآمد ازدست‌رفته، مقایسه با کسب‌وکارهای مشابه، و سه راهکار عملی
            برای کاهش غیبت مشتری‌ها.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <CtaButton>شروع ارزیابی ۳ دقیقه‌ای</CtaButton>
            <div className="flex flex-col gap-0.5 text-[13.5px] text-text-soft">
              <strong className="font-semibold text-text-soft">رایگان · بدون نیاز به ثبت‌نام</strong>
              <span>گزارش بلافاصله بعد از پایان سؤال‌ها</span>
            </div>
          </div>

          {/* Social proof row — avatars + live count */}
          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            <div className="flex -space-x-4 space-x-reverse">
              {[0,1,2,3].map((i) => (
                <span key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-bg bg-surface-soft text-xs font-bold text-text-soft">
                  {["م","س","ز","ر"][i]}
                </span>
              ))}
            </div>
            <p className="text-[13px] text-text-soft">
              <b className="text-text">{faDigits(140)}+</b> مدیر سالن این هفته ارزیابی را کامل کرده‌اند
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <AppointmentBook />
        </div>
      </div>
    </header>
  );
}
