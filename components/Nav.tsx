"use client";
import { useEffect, useState } from "react";
import CtaButton from "./CtaButton";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "درباره ما", href: "#hero" },
  { label: "برآورد ضرر", href: "#loss-calculator" },
  { label: "نظرات", href: "#testimonials" },
  { label: "سوالات متداول", href: "#faq" },
  { label: "تماس با ما", href: "#footer" },
] as const;

export default function Nav() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "0px 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg-deep/95 md:bg-bg-deep/80 md:backdrop-blur-md p-2">
      <div className="mx-auto flex h-17 w-full items-center justify-between px-6">
        <Logo />
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`text-[14px] font-bold transition-colors ${active === id ? "text-primary" : "text-text-soft hover:text-text"
                    }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <CtaButton size="xl">
          <span className="max-sm:hidden">شروع ارزیابی رایگان</span>
          <span className="sm:hidden">ارزیابی رایگان</span>
        </CtaButton>
      </div>
    </nav>
  );
}
