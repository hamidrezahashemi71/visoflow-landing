const SERVICES = [
  "لیزر موهای زائد","فیشیال تخصصی","تزریق ژل و بوتاکس","میکرونیدلینگ",
  "کاشت ناخن","رنگ و مش","هایفوتراپی","پاکسازی پوست","اکستنشن مژه","میکروبلیدینگ",
];

export default function ServicesMarquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-bg-deep py-4" dir="ltr">
      <div className="marquee-track items-center">
        {[...SERVICES, ...SERVICES].map((s, i) => (
          <span key={i} dir="rtl" className="flex items-center whitespace-nowrap px-6 text-sm font-medium text-text-soft">
            <span className="ml-6 inline-block h-1.5 w-1.5 rounded-full bg-primary/70" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
