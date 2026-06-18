"use client";
import { useEffect, useState } from "react";
import { QUIZ_URL } from "@/lib/config";
import ArrowIcon from "./ArrowIcon";

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
      className={`fixed inset-x-0 bottom-0 z-50 overflow-hidden border-t border-line bg-bg/90 backdrop-blur-md transition-transform duration-300 ${
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
        <a
          href={QUIZ_URL}
          className="group inline-flex items-center gap-2.5 rounded-full bg-(--gradient-primary) px-7 py-3 text-[15.5px] font-bold text-text shadow-(--shadow-cta) transition-all duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-cta-hover) max-sm:w-full max-sm:justify-center"
        >
          شروع ارزیابی ۳ دقیقه‌ای
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
