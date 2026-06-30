"use client";
import { useEffect, useState } from "react";
import CtaButton from "./CtaButton";

/** Bottom-fixed CTA bar that slides in once the hero scrolls out of view. */
export default function StickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const shown = heroGone && !footerVisible;

  useEffect(() => {
    const hero = document.querySelector("header");
    const footer = document.querySelector("footer");

    const heroIo = hero
      ? new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting), { threshold: 0 })
      : null;
    const footerIo = footer
      ? new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), { threshold: 0 })
      : null;

    heroIo?.observe(hero!);
    footerIo?.observe(footer!);
    return () => {
      heroIo?.disconnect();
      footerIo?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 overflow-hidden border-t border-line bg-bg/95 md:bg-bg/90 md:backdrop-blur-md transition-transform duration-300 ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-280 items-center justify-between gap-4 px-6 py-3.5">
        <div className="flex flex-col gap-0.5 max-sm:hidden">
          <strong className="text-[15px] font-bold text-text">
            ارزیابی رایگان نوبت‌های نیامده
          </strong>
          <span className="text-[13px] text-text-soft">
            در ۳ دقیقه گزارش اختصاصی بگیرید
          </span>
        </div>
        <CtaButton size="xl" className="max-sm:w-full">
          شروع ارزیابی ۳ دقیقه‌ای
        </CtaButton>
      </div>
    </div>
  );
}
