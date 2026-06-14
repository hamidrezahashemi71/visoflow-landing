"use client";
import { useEffect, useRef, useState } from "react";
import { faMoney, faDigits } from "@/lib/format";

/** Counts up to `value` when scrolled into view. Persian digits. */
export default function CountUp({
  value,
  money = false,
  duration = 1200,
}: {
  value: number;
  money?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref} className="tabular-nums">{money ? faMoney(n) : faDigits(Math.round(n))}</span>;
}
