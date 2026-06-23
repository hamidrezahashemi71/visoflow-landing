import { InfoBadge } from "./ui/InfoBadge";
import { GlowCard } from "./ui/spotlight-card";

type Slot = { time: string; name: string; service: string };
const SLOTS: { a: Slot; b: Slot; c: Slot; d: Slot } = {
  a: { time: "۱۰:۳۰", name: "مریم رضایی", service: "لیزر موهای زائد" },
  b: { time: "۱۲:۰۰", name: "سارا احمدی", service: "فیشیال تخصصی" },
  c: { time: "۱۵:۳۰", name: "الهام محمدی", service: "تزریق ژل" },
  d: { time: "17:00", name: "مینا حیدری", service: "مشاوره تخصصی" },
};

function Time({ children }: { children: React.ReactNode }) {
  return <span className="min-w-12 rounded-[10px] bg-primary-soft px-0.5 py-1.5 text-center text-sm font-bold text-primary">{children}</span>;
}



const slotBase = "mb-3 flex flex-col gap-2.5 rounded-lg bg-bg p-2";
const badgeBase = "self-start rounded-lg px-3 py-1.25 text-[11.5px] font-bold whitespace-nowrap transition-all duration-300";

export default function AppointmentBook() {
  return (
    <GlowCard aria-label="نمایش نمادین دفتر نوبت یک سالن"
      className="relative rounded-3xl border border-line bg-bg-deep p-6 backdrop-blur-sm">
      <div className="mb-4.5 flex items-center justify-between">
        <span className="text-[15.5px] font-bold text-text-soft">نوبت‌های امروز</span>
        <span className="text-[12.5px] text-text-soft">سه‌شنبه | ۲۲ خرداد</span>
      </div>

      <div className={slotBase}>
        <div className="flex items-start gap-3.5">
          <Time>{SLOTS.a.time}</Time>
          <span className="min-w-0 flex-1">
            <b className="block text-sm font-semibold">{SLOTS.a.name}</b>
            <span className="block text-xs text-text-soft">{SLOTS.a.service}</span>
            <span className="invisible block text-xs">&nbsp;</span>
          </span>
        </div>
        <span className="badge-cycle-wrap self-start">
          <span className={`${badgeBase} badge-cycle-sent bg-primary-soft text-primary`}>پیامک یادآوری ارسال شد</span>
          <span className={`${badgeBase} badge-cycle-ok bg-success/10 text-success w-fit`}>نوبت تایید شد</span>
        </span>
      </div>

      <div className={slotBase}>
        <div className="flex items-start gap-3.5">
          <Time>{SLOTS.b.time}</Time>
          <span className="min-w-0 flex-1">
            <b className="block text-sm font-semibold">{SLOTS.b.name}</b>
            <span className="block text-xs text-text-soft">{SLOTS.b.service}</span>
            <span className="invisible block text-xs">&nbsp;</span>
          </span>
        </div>
        <span className={`${badgeBase} badge-cycle-wrap bg-success/10 text-success w-fit`}>نوبت تایید شد</span>
      </div>

      <div className={`${slotBase} `}>
        <div className="flex items-start gap-3.5">
          <Time>{SLOTS.c.time}</Time>
          <span className="min-w-0 flex-1">
            <b className="block text-sm font-semibold">{SLOTS.c.name}</b>
            <span className="block text-xs text-text-soft">{SLOTS.c.service}</span>
            <span className="loss-tag block text-xs font-bold text-danger mt-0.5">−۲٬۴۰۰٬۰۰۰ تومان از دست رفت</span>
          </span>
        </div>
        <span className={`${badgeBase} bg-text-soft/10 text-text-soft`}>بدون یادآوری · نیامد</span>
      </div>

      <div className={slotBase}>
        <div className="flex items-start gap-3.5">
          <Time>{SLOTS.b.time}</Time>
          <span className="min-w-0 flex-1">
            <b className="block text-sm font-semibold">{SLOTS.d.name}</b>
            <span className="block text-xs text-text-soft">{SLOTS.d.service}</span>
            <span className="invisible block text-xs">&nbsp;</span>
          </span>
        </div>
        <span className={`${badgeBase} badge-cycle-wrap bg-danger/10 text-danger w-fit`}>نوبت لغو شد</span>
      </div>

      <div className="mt-1.5 flex items-center gap-3 rounded-[14px] bg-surface px-4 py-3">
        <InfoBadge />
        <span className="text-xs max-w-1/2 text-text-soft">برآورد ضرر همین یک هفته از نوبت‌های نیامده</span>
      </div>
    </GlowCard>
  );
}
