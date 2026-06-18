"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { type LumiState } from "./LumiCharacter";
import LazyLumi from "./LazyLumi";

const STEPS: { state: LumiState; text: string; ms: number }[] = [
  { state: "excited", text: "سلام 👋 من لومی‌ام، دستیار تو!", ms: 2800 },
  { state: "concerned", text: "می‌دونم… هر صندلی خالی یعنی ضرر، و این اصلاً حس خوبی نیست. 💭", ms: 3600 },
  { state: "thinking", text: "بذار با هم حساب کنیم دقیقاً چقدر؟ فقط سه دقیقه طول می‌کشه 🤔", ms: 3600 },
  { state: "excited", text: "آماده‌ای شروع کنیم؟ بزن بریم! 💙", ms: 3000 },
  { state: "idle", text: "هر وقت آماده بودی، من همین‌جام 😊", ms: 3400 },
];

export default function LumiIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(
      () => setStep((s) => (s + 1) % STEPS.length),
      STEPS[step].ms
    );
    return () => clearTimeout(t);
  }, [started, step]);

  useLayoutEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.offsetHeight);
  }, [step]);

  return (
    <div ref={ref} className="relative z-1 mb-4 flex flex-col items-center gap-2.5">
      <div
        className="lumi-bubble relative w-72 max-w-full overflow-hidden rounded-2xl bg-surface shadow-[0_14px_34px_-10px_rgba(0,0,0,0.4)]"
        data-in={started}
        style={{ height }}
        role="status"
        aria-live="polite"
      >
        <div
          ref={contentRef}
          className="px-5 py-3 text-center text-[14.5px] font-semibold leading-[1.9] text-text"
        >
          <span key={step} className="lumi-msg block">
            {STEPS[step].text}
          </span>
        </div>
      </div>
      <span className="lumi-tail -mt-4 h-3.5 w-3.5 rounded-sm bg-surface" data-in={started} />
      <LazyLumi state={STEPS[step].state} width={180} />
    </div>
  );
}
