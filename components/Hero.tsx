import Image from "next/image";
import AppointmentBook from "./AppointmentBook";
import CtaButton from "./CtaButton";
import { faDigits } from "@/lib/format";

export default function Hero() {
  return (
    <header className="relative overflow-hidden pt-2 py-16">
      <Image
        src="/assets/images/hero-lady-image.png"
        alt=""
        aria-hidden="true"
        width={442}
        height={656}
        className="pointer-events-none select-none absolute bottom-0 left-2 z-20 h-70 w-auto object-contain object-bottom md:left-4 md:h-80 xl:left-6 xl:z-100 xl:h-160"
      />

      <div className="relative mx-auto grid max-w-300 items-center gap-14 px-6 max-md:grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <span className="mb-5.5 inline-flex items-center gap-2 rounded-lg border border-secondary/25 bg-primary/15 px-4 py-1.5 text-[13.5px] font-semibold text-primary">
            <span className="pulse-dot h-1.75 w-1.75 rounded-full bg-primary" />
            ویژه مدیران کلینیک‌ها و سالن‌های زیبایی
          </span>

          <h1 className="mb-4.5 text-[clamp(38px,5vw,58px)] leading-[1.35] font-bold text-text w-full">
            چقدر از درآمد سالن شما قربانی{" "}
            <em className="relative whitespace-nowrap text-primary not-italic ">
              نوبت‌های نیامده
            </em>{" "}
            می‌شود؟
          </h1>

          <p className="mb-7 w-full text-[17px] text-text-soft">
            در ۳ دقیقه به چند سؤال کوتاه پاسخ دهید و یک گزارش اختصاصی بگیرید:
            برآورد درآمد ازدست‌رفته، مقایسه با کسب‌وکارهای مشابه، و سه راهکار عملی
            برای کاهش غیبت مشتری‌ها.
          </p>

          <div className="flex flex-col w-full flex-wrap  gap-5">
            <CtaButton>شروع ارزیابی ۳ دقیقه‌ای</CtaButton>
            <div className="flex flex-col gap-0.5 text-[13.5px] text-text-soft">
              <strong className="font-semibold text-primary text-center">رایگان · بدون نیاز به ثبت‌نام</strong>
            </div>
          </div>

          {/* Social proof row — avatars + live count */}
          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            <div className="flex -space-x-3 ">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`grid h-9 w-9 place-items-center rounded-full border-2 text-bg border-bg text-xs font-bold ${i === 3 ? "bg-primary" : "bg-secondary"}`}>
                  {["م", "س", "ز", "ر"][i]}
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
