"use client";
import { useEffect, useRef, useState } from "react";
import LumiCharacter, { type LumiState } from "./LumiCharacter";

/**
 * Mounts a decorative <LumiCharacter> only once it scrolls near the viewport,
 * so below-the-fold instances don't all import GSAP and animate on first paint.
 * The wrapper reserves Lumi's footprint to avoid layout shift and is marked
 * aria-hidden since these are purely decorative accents.
 */
export default function LazyLumi({
  state = "idle",
  width = 160,
  className,
}: {
  state?: LumiState;
  width?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: "inline-block", width, aspectRatio: "440 / 480" }}
    >
      {show && <LumiCharacter state={state} width={width} />}
    </span>
  );
}
