"use client";

import { useEffect, useRef } from "react";

const ROW_H = 44;
const VISIBLE = 5;
const CENTER = (VISIBLE - 1) / 2;

// translateY (px) <-> centered index. ty(0) = top item centered, ty grows upward.
const tyForIndex = (i: number) => (CENTER - i) * ROW_H;
const indexForTy = (ty: number) => CENTER - ty / ROW_H;

type Props = {
  options: number[];
  value: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
  label: string;
};

export default function WheelPicker({
  options,
  value,
  onChange,
  format,
  label,
}: Props) {
  const selected = Math.max(0, options.indexOf(value));

  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Latest props for the long-lived engine (updated in an effect, never in render).
  const optionsRef = useRef(options);
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value);

  // Imperative handle so the value-sync effect can drive the engine.
  const engineRef = useRef<{
    syncTo: (i: number, animate: boolean) => void;
  } | null>(null);
  const firstSyncRef = useRef(true);

  useEffect(() => {
    optionsRef.current = options;
    onChangeRef.current = onChange;
  });

  // The whole interaction engine. Built once; reads live props through refs.
  useEffect(() => {
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    let ty = tyForIndex(Math.max(0, optionsRef.current.indexOf(valueRef.current)));
    let raf: number | null = null;
    let dragging = false;
    let moved = false;
    let startY = 0;
    let startTy = 0;
    let samples: { t: number; y: number }[] = [];
    let wheelTimer: ReturnType<typeof setTimeout> | undefined;

    const len = () => optionsRef.current.length;
    const maxTy = () => tyForIndex(0);
    const minTy = () => tyForIndex(len() - 1);
    const clampIdx = (i: number) => Math.max(0, Math.min(len() - 1, i));
    const stop = () => {
      if (raf != null) cancelAnimationFrame(raf);
      raf = null;
    };

    // Paint: list transform + per-row depth (opacity/scale). Cheap, no React.
    const paint = (next: number) => {
      ty = next;
      list.style.transform = `translate3d(0, ${next}px, 0)`;
      const idx = indexForTy(next);
      const rows = list.children;
      for (let i = 0; i < rows.length; i++) {
        const el = rows[i] as HTMLElement;
        const d = Math.abs(i - idx);
        el.style.opacity = String(Math.max(0.18, 1 - d * 0.32));
        el.style.transform = `scale(${Math.max(0.82, 1 - d * 0.08)})`;
      }
    };

    const commit = (i: number) => {
      const idx = clampIdx(i);
      const rows = list.children;
      for (let k = 0; k < rows.length; k++)
        (rows[k] as HTMLElement).setAttribute(
          "aria-selected",
          String(k === idx)
        );
      const v = optionsRef.current[idx];
      if (v !== undefined && v !== valueRef.current) {
        valueRef.current = v;
        onChangeRef.current(v);
      }
    };

    const rubber = (next: number) => {
      const hi = maxTy();
      const lo = minTy();
      if (next > hi) return hi + (next - hi) * 0.3;
      if (next < lo) return lo + (next - lo) * 0.3;
      return next;
    };

    // Ease-out tween to an exact row (clicks, keyboard, external value).
    const animateTo = (target: number, after?: () => void) => {
      stop();
      const from = ty;
      const dist = target - from;
      if (Math.abs(dist) < 0.5) {
        paint(target);
        after?.();
        return;
      }
      const dur = Math.min(460, Math.max(170, Math.abs(dist) * 2.2));
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        paint(from + dist * (1 - Math.pow(1 - t, 3)));
        if (t < 1) raf = requestAnimationFrame(step);
        else {
          raf = null;
          after?.();
        }
      };
      raf = requestAnimationFrame(step);
    };

    // Inertial fling: velocity decay + edge spring-back, settling onto a row.
    const fling = (v0: number) => {
      stop();
      let v = v0; // px/ms
      let prev = performance.now();
      const frame = (now: number) => {
        const dt = Math.min(32, now - prev) || 16;
        prev = now;
        let next = ty + v * dt;
        v *= Math.pow(0.94, dt / 16);

        const hi = maxTy();
        const lo = minTy();
        if (next > hi || next < lo) {
          const bound = next > hi ? hi : lo;
          next += (bound - next) * (1 - Math.pow(0.6, dt / 16));
          v = 0;
          if (Math.abs(bound - next) < 0.4) {
            paint(bound);
            commit(Math.round(indexForTy(bound)));
            raf = null;
            return;
          }
        } else if (Math.abs(v) < 0.02) {
          const target = tyForIndex(clampIdx(Math.round(indexForTy(next))));
          next += (target - next) * (1 - Math.pow(0.7, dt / 16));
          if (Math.abs(target - next) < 0.4) {
            paint(target);
            commit(Math.round(indexForTy(target)));
            raf = null;
            return;
          }
        }
        paint(next);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const onPointerDown = (e: PointerEvent) => {
      stop();
      dragging = true;
      moved = false;
      startY = e.clientY;
      startTy = ty;
      samples = [{ t: performance.now(), y: e.clientY }];
      wrap.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = e.clientY - startY;
      if (Math.abs(dy) > 3) moved = true;
      paint(rubber(startTy + dy));
      samples.push({ t: performance.now(), y: e.clientY });
      if (samples.length > 6) samples.shift();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {}
      // Velocity from the most recent ~100ms of movement.
      const last = samples[samples.length - 1];
      let ref = samples[0];
      for (let i = samples.length - 1; i >= 0; i--) {
        ref = samples[i];
        if (last.t - samples[i].t >= 100) break;
      }
      const span = last.t - ref.t;
      fling(span > 0 ? (last.y - ref.y) / span : 0);
    };

    // Tap a row to select it.
    const onClick = (e: MouseEvent) => {
      if (moved) return;
      const li = (e.target as HTMLElement).closest("li[data-index]");
      if (!li) return;
      const i = clampIdx(Number((li as HTMLElement).dataset.index));
      animateTo(tyForIndex(i), () => commit(i));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const cur = clampIdx(Math.round(indexForTy(ty)));
      const go = (i: number) => {
        e.preventDefault();
        const ci = clampIdx(i);
        animateTo(tyForIndex(ci), () => commit(ci));
      };
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(cur + 1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(cur - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(len() - 1);
    };

    // Wheel / trackpad with a debounced snap once it settles.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stop();
      paint(rubber(ty - e.deltaY));
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        const ci = clampIdx(Math.round(indexForTy(ty)));
        animateTo(tyForIndex(ci), () => commit(ci));
      }, 90);
    };

    wrap.addEventListener("pointerdown", onPointerDown);
    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerup", onPointerUp);
    wrap.addEventListener("pointercancel", onPointerUp);
    wrap.addEventListener("click", onClick);
    wrap.addEventListener("keydown", onKeyDown);
    wrap.addEventListener("wheel", onWheel, { passive: false });

    engineRef.current = {
      syncTo: (i, animate) => {
        if (dragging) return;
        const target = tyForIndex(i);
        if (animate) animateTo(target, () => commit(i));
        else paint(target);
      },
    };

    paint(ty); // initial render of depth styles

    return () => {
      stop();
      clearTimeout(wheelTimer);
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerup", onPointerUp);
      wrap.removeEventListener("pointercancel", onPointerUp);
      wrap.removeEventListener("click", onClick);
      wrap.removeEventListener("keydown", onKeyDown);
      wrap.removeEventListener("wheel", onWheel);
      engineRef.current = null;
    };
  }, []);

  // Sync when `value` changes from outside (and on mount, without animating).
  useEffect(() => {
    valueRef.current = value;
    engineRef.current?.syncTo(selected, !firstSyncRef.current);
    firstSyncRef.current = false;
  }, [selected, value]);

  return (
    <div
      ref={wrapRef}
      role="listbox"
      aria-label={label}
      aria-orientation="vertical"
      tabIndex={0}
      className="relative cursor-grab touch-none select-none overflow-hidden outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary/40"
      style={{
        height: VISIBLE * ROW_H,
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 26%, #000 74%, transparent 100%)",
      }}
    >
      {/* Static selection band the rows scroll behind. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-0 rounded-xl bg-surface"
        style={{ top: CENTER * ROW_H, height: ROW_H }}
      />

      <ul
        ref={listRef}
        className="relative z-10 will-change-transform"
        style={{ transform: `translate3d(0, ${tyForIndex(selected)}px, 0)` }}
      >
        {options.map((opt, i) => {
          const d = Math.abs(i - selected);
          return (
            <li
              key={opt}
              role="option"
              aria-selected={i === selected}
              data-index={i}
              style={{
                height: ROW_H,
                opacity: Math.max(0.18, 1 - d * 0.32),
                transform: `scale(${Math.max(0.82, 1 - d * 0.08)})`,
              }}
              className="flex w-full cursor-pointer items-center justify-center whitespace-nowrap text-[15px] font-semibold tabular-nums text-text"
            >
              {format(opt)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
