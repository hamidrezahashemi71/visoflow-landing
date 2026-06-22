import Logo from "./Logo";

const SERVICES = [
  "لیزر موهای زائد", "فیشیال تخصصی", "تزریق ژل و بوتاکس", "میکرونیدلینگ",
  "کاشت ناخن", "رنگ و مش", "هایفوتراپی", "پاکسازی پوست", "اکستنشن مژه", "میکروبلیدینگ",
];

export default function ServicesMarquee() {
  return (
    <div className="marquee overflow-hidden bg-bg-deep py-4" dir="ltr">
      <div className="marquee-track items-center">
        {[...SERVICES, ...SERVICES].map((s, i) => (
          <div className="flex items-center" key={i}>
            <Logo variant="logomark" small />
            <span className=" whitespace-nowrap px-16 text-xs font-bold text-text">
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
