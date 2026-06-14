type Slot = { time: string; name: string; service: string };
const SLOTS: { a: Slot; b: Slot; c: Slot } = {
  a: { time: "۱۰:۳۰", name: "مریم رضایی", service: "لیزر موهای زائد" },
  b: { time: "۱۲:۰۰", name: "سارا احمدی", service: "فیشیال تخصصی" },
  c: { time: "۱۵:۳۰", name: "الهام محمدی", service: "تزریق ژل" },
};

function Time({ children }: { children: React.ReactNode }) {
  return <span className="min-w-12 rounded-[10px] bg-primary-soft px-0.5 py-1.5 text-center text-sm font-bold text-primary">{children}</span>;
}

const slotBase = "mb-3 flex flex-col gap-2.5 rounded-[14px] border border-line bg-surface p-3.5";
const badgeBase = "self-start rounded-full px-3 py-1.25 text-[11.5px] font-bold whitespace-nowrap transition-all duration-300";

export default function AppointmentBook() {
  return (
    <div aria-label="نمایش نمادین دفتر نوبت یک سالن"
      className="relative rounded-3xl border border-line bg-bg-deep/80 p-6 shadow-(--shadow-float) backdrop-blur-sm before:absolute before:top-0 before:right-7 before:left-7 before:h-1 before:rounded-b before:[background:repeating-linear-gradient(90deg,var(--color-line)_0_14px,transparent_14px_28px)]">
      <div className="mb-4.5 flex items-center justify-between">
        <span className="text-[15.5px] font-bold text-text-soft">نوبت‌های امروز</span>
        <span className="rounded-full bg-surface px-3 py-1 text-[12.5px] text-text-soft">سه‌شنبه · ۲۲ خرداد</span>
      </div>

      <div className={slotBase}>
        <div className="flex items-center gap-3.5">
          <Time>{SLOTS.a.time}</Time>
          <span className="min-w-0 flex-1">
            <b className="block text-sm font-semibold">{SLOTS.a.name}</b>
            <span className="block text-xs text-text-soft">{SLOTS.a.service}</span>
            <span className="invisible block text-xs">&nbsp;</span>
          </span>
        </div>
        <span className="badge-cycle-wrap self-start">
          <span className={`${badgeBase} badge-cycle-sent bg-primary-soft text-primary`}>پیامک یادآوری ارسال شد</span>
          <span className={`${badgeBase} badge-cycle-ok bg-secondary-soft text-text-soft w-fit`}>✓ تأیید کرد</span>
        </span>
      </div>

      <div className={slotBase}>
        <div className="flex items-center gap-3.5">
          <Time>{SLOTS.b.time}</Time>
          <span className="min-w-0 flex-1">
            <b className="block text-sm font-semibold">{SLOTS.b.name}</b>
            <span className="block text-xs text-text-soft">{SLOTS.b.service}</span>
            <span className="invisible block text-xs">&nbsp;</span>
          </span>
        </div>
        <span className={`${badgeBase} badge-cycle-wrap bg-secondary-soft text-text-soft`}>✓ تأیید کرد</span>
      </div>

      <div className={`${slotBase} slot-lost`}>
        <div className="flex items-center gap-3.5">
          <Time>{SLOTS.c.time}</Time>
          <span className="min-w-0 flex-1">
            <b className="block text-sm font-semibold">{SLOTS.c.name}</b>
            <span className="block text-xs text-text-soft">{SLOTS.c.service}</span>
            <span className="loss-tag block text-xs font-bold text-primary">−۲٬۴۰۰٬۰۰۰ تومان از دست رفت</span>
          </span>
        </div>
        <span className={`${badgeBase} badge-cycle-lost`}>بدون یادآوری · نیامد</span>
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded-[14px] bg-surface px-4 py-3">
        <span className="text-[12.5px] text-text-soft">برآورد ضرر همین یک هفته از نوبت‌های نیامده</span>
        <span className=" text-[26px] leading-none font-bold text-primary">؟</span>
      </div>
    </div>
  );
}
