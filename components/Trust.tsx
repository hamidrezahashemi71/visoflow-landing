import Reveal from "./Reveal";
import { GlowCard } from "./ui/spotlight-card";

const POINTS = [
  { title: "پاسخ‌های شما محرمانه می‌ماند", body: "نتایج فقط به‌صورت جمعی و بدون نام تحلیل می‌شود.",
    icon: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></> },
  { title: "بدون نیاز به ثبت‌نام یا شماره تماس", body: "دادن اطلاعات تماس کاملاً اختیاری است — فقط اگر گزارش را خواستید برای‌تان بفرستیم.",
    icon: <><path d="M18.4 5.6a9 9 0 1 0 0 12.8" /><path d="M21 4v6h-6" /></> },
  { title: "هیچ تعهد یا فروشی در کار نیست", body: "این مرحله فقط شناخت بازار است؛ اگر علاقه‌مند بودید، در دسترسی زودهنگام به ویزو اولویت می‌گیرید.",
    icon: <path d="M20 6L9 17l-5-5" /> },
] as const;

export default function Trust() {
  return (
    <section className="py-20 max-md:py-14">
      <div className="mx-auto grid max-w-280 items-center gap-12 px-6 max-md:grid-cols-1 md:grid-cols-2">
        <Reveal>
          <h2 className="mb-3.5 text-[clamp(28px,3.5vw,38px)] leading-[1.45] font-bold text-text">چرا این ارزیابی را طراحی کرده‌ایم؟</h2>
          <p className="mb-3.5 text-[15.5px] text-text-soft">ما «ویزو» را می‌سازیم؛ ابزاری برای کلینیک‌ها و سالن‌های زیبایی که با یادآوری خودکار پیامکی، نوبت‌های نیامده را کم می‌کند — بدون تغییر در روش فعلی نوبت‌دهی شما.</p>
          <p className="text-[15.5px] text-text-soft">پیش از هر چیز می‌خواهیم مسئله را دقیق بشناسیم. این ارزیابی به ما کمک می‌کند ابزار را بر اساس واقعیت کار شما بسازیم، و به شما همین حالا تصویری روشن از وضعیت‌تان می‌دهد.</p>
        </Reveal>
        <div className="grid gap-3.5">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <GlowCard
                customSize
                glowColor="blue"
                className="block h-full bg-surface/60! px-4.5 py-4 text-[14.5px] backdrop-blur-none"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-text-soft">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                  </span>
                  <div><b className="font-bold text-text">{p.title}</b><span className="block text-[13.5px] text-text-soft">{p.body}</span></div>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
