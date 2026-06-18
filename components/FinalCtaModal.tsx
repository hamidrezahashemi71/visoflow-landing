"use client";
import { useEffect, useRef, useState } from "react";
import FinalCtaCard from "./FinalCtaCard";

// Nudge visitors who land but don't engage: if no CTA is clicked within this
// window, surface the final CTA in a centered modal. Shown once per session.
const DELAY_MS = 15_000;
const SEEN_KEY = "viso_cta_modal_seen";

export default function FinalCtaModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Arm the timer on load; cancel it the moment the visitor clicks any CTA
  // (every CTA on the page points at #quiz).
  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;

    const onClick = (e: MouseEvent) => {
      const cta = (e.target as HTMLElement | null)?.closest?.('a[href="#quiz"]');
      if (cta) {
        clearTimeout(timer);
        sessionStorage.setItem(SEEN_KEY, "1");
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick, true);

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SEEN_KEY, "1");
    }, DELAY_MS);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  // While open: lock body scroll, close on Escape, focus the close button.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="cta-modal-overlay fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-bg-deep/70 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="cta-modal-panel relative my-auto w-full max-w-160"
        role="dialog"
        aria-modal="true"
        aria-label="ارزیابی رایگان نوبت‌های نیامده"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="بستن"
          className="absolute top-3 left-3 z-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg-deep/40 text-text-soft backdrop-blur-sm transition-colors hover:bg-bg-deep/70 hover:text-text"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        <FinalCtaCard />
      </div>
    </div>
  );
}
