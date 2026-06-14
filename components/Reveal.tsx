"use client";
import { useReveal } from "@/lib/useReveal";

/** Wrap any block to fade + rise it in on scroll. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
