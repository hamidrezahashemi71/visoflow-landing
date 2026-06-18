"use client";

import Image from "next/image";
import { CSSProperties, KeyboardEvent, TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";

export interface ScrollReelTestimonial {
    quote: string;
    author: string;
    image: string;
    alt?: string;
}

export interface ScrollReelTestimonialsProps {
    testimonials: ScrollReelTestimonial[];
    wordStaggerMs?: number;
    className?: string;
}

const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);
const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";
const SWIPE_THRESHOLD = 40;
const QUOTE_CLASSES =
    "m-0 text-lg font-medium leading-[1.3] tracking-[-0.02em] text-foreground sm:text-[22px]";
const AUTHOR_CLASSES =
    "m-0 text-sm font-medium leading-[1.3] text-muted-foreground";
const FEATURED_SHADOW =
    "0 1.008px 0.705px -0.563px rgba(0,0,0,0.18), 0 2.389px 1.672px -1.125px rgba(0,0,0,0.17), 0 4.357px 3.05px -1.688px rgba(0,0,0,0.17), 0 7.244px 5.07px -2.25px rgba(0,0,0,0.16), 0 11.698px 8.188px -2.813px rgba(0,0,0,0.15), 0 19.148px 13.404px -3.375px rgba(0,0,0,0.13), 0 32.972px 23.08px -3.938px rgba(0,0,0,0.09), 0 60px 42px -4.5px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.6)";
function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function Cell() {
    return (
        <div
            aria-hidden="true"
            className="shrink-0 rounded-xl border border-border bg-linear-to-b from-secondary to-card blur-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_2px_0_rgba(255,255,255,1)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]"
            style={{ width: CELL, height: CELL }}
        />
    );
}

function Featured({ src, alt }: { src: string; alt?: string }) {
    return (
        <div
            className="relative shrink-0 overflow-hidden rounded-xl bg-muted dark:ring-1 dark:ring-white/10"
            style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
        >
            <Image
                src={src}
                alt={alt ?? ""}
                loading="lazy"
                fill
                className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-2 bg-white mix-blend-saturation"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-3 blur-[6px] mix-blend-overlay"
                style={{
                    background:
                        "linear-gradient(220.99deg, rgba(108,92,255,0) 32%, rgb(108,92,255) 41%, rgb(173,177,255) 47%, rgba(130,189,237,0.57) 54%, rgba(130,189,237,0) 65%)",
                }}
            />
        </div>
    );
}

function Words({
    text,
    startIndex,
    staggerMs,
}: {
    text: string;
    startIndex: number;
    staggerMs: number;
}) {
    const words = text.split(" ");
    return (
        <>
            {words.map((word, wi) => (
                <Fragment key={wi}>
                    <span
                        className="scroll-reel-word inline-block whitespace-nowrap"
                        style={{ animationDelay: `${(startIndex + wi) * staggerMs}ms` }}
                    >
                        {word}
                    </span>
                    {wi < words.length - 1 ? " " : null}
                </Fragment>
            ))}
        </>
    );
}

export function ScrollReelTestimonials({
    testimonials,
    wordStaggerMs = 40,
    className,
}: ScrollReelTestimonialsProps) {
    const [index, setIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const [exiting, setExiting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const animating = useRef(false);
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
    const count = testimonials.length;
    useEffect(() => {
        const raf = requestAnimationFrame(() =>
            requestAnimationFrame(() => setMounted(true))
        );
        return () => {
            cancelAnimationFrame(raf);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timeouts.current.forEach(clearTimeout);
        };
    }, []);

    const paginate = useCallback(
        (dir: 1 | -1) => {
            if (animating.current) return;
            const next = index + dir;
            if (next < 0 || next >= count) return;
            animating.current = true;
            setIndex(next);
            setExiting(true);
            timeouts.current.push(
                setTimeout(() => {
                    setDisplayIndex(next);
                    setExiting(false);
                }, EXIT_MS)
            );
            timeouts.current.push(
                setTimeout(() => {
                    animating.current = false;
                }, SLIDE_MS)
            );
        },
        [index, count]
    );

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            paginate(1);
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            paginate(-1);
        }
    };

    /* Horizontal swipe paginates on touch devices. We record the start
     * point and only act on release when horizontal travel clears the
     * threshold and dominates vertical travel, so a vertical page scroll
     * over the carousel doesn't change slides. */
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
        paginate(dx < 0 ? 1 : -1);
    };

    const middleItems = useMemo(() => {
        const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
        for (let i = 0; i < 3; i++) items.push({ type: "cell" });
        testimonials.forEach((_, i) => {
            items.push({ type: "featured", i });
            if (i < count - 1) {
                items.push({ type: "cell" }, { type: "cell" });
            }
        });
        for (let i = 0; i < 3; i++) items.push({ type: "cell" });
        return items;
    }, [testimonials, count]);

    const sideCellCount = 4 + 2 * count;
    const centerIdx = (count - 1) / 2;
    const middleY = (centerIdx - index) * STEP;
    const sideY = -middleY;
    const colStyle = (y: number): CSSProperties => ({
        transform: `translateY(${y}px)`,
        transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
    });
    const current = testimonials[displayIndex];
    const newLocal = "flex flex-col gap-2.25";

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={cn(
                "relative flex w-full max-w-265 flex-col items-stretch gap-2.5 overflow-hidden rounded-xl bg-muted shadow-[inset_0_2px_0_rgba(255,255,255,1)] outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-80 md:flex-row",
                "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                className
            )}
        >
            {/* Reel section */}
            <div
                aria-hidden="true"
                className="relative h-56 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-95"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskComposite: "source-in",
                    maskComposite: "intersect",
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                    {/* Left column */}
                    <div
                        className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
                        style={colStyle(sideY)}
                    >
                        {Array.from({ length: sideCellCount }).map((_, i) => (
                            <Cell key={i} />
                        ))}
                    </div>
                    {/* Middle column */}
                    <div
                        className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
                        style={colStyle(middleY)}
                    >
                        {middleItems.map((item, i) =>
                            item.type === "featured" ? (
                                <Featured
                                    key={i}
                                    src={testimonials[item.i].image}
                                    alt={testimonials[item.i].alt}
                                />
                            ) : (
                                <Cell key={i} />
                            )
                        )}
                    </div>
                    {/* Right column */}
                    <div
                        className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
                        style={colStyle(sideY)}
                    >
                        {Array.from({ length: sideCellCount }).map((_, i) => (
                            <Cell key={i} />
                        ))}
                    </div>
                </div>
            </div>
            {/* Content section */}
            <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-5 md:py-10">
                <div className={newLocal}>
                    <svg
                        className="block h-12 w-12 text-muted-foreground/40"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
                    </svg>
                    {/* Text stage */}
                    <div
                        className="relative w-full max-w-97.5 overflow-hidden"
                        aria-live="polite"
                    >
                        <div
                            aria-hidden="true"
                            className="invisible flex min-h-35 flex-col gap-4.75"
                        >
                            <p className={QUOTE_CLASSES}>{current.quote}</p>
                            <p className={AUTHOR_CLASSES}>{current.author}</p>
                        </div>
                        <div
                            key={displayIndex}
                            className={cn(
                                "absolute inset-x-0 top-0 flex flex-col gap-4.75 will-change-[transform,opacity]",
                                exiting && "scroll-reel-exit"
                            )}
                        >
                            <p className={QUOTE_CLASSES}>
                                <Words
                                    text={current.quote}
                                    startIndex={0}
                                    staggerMs={wordStaggerMs}
                                />
                            </p>
                            <p className={AUTHOR_CLASSES}>
                                <Words
                                    text={current.author}
                                    startIndex={current.quote.split(" ").length + 1}
                                    staggerMs={wordStaggerMs}
                                />
                            </p>
                        </div>
                    </div>
                </div>
                {/* Controls */}
                <div className="mt-6 flex items-center gap-1.5 md:mt-0">
                    <button
                        type="button"
                        onClick={() => paginate(1)}
                        disabled={index === count - 1}
                        aria-label="Next testimonial"
                        className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border border-foreground/15 bg-transparent p-0 text-foreground transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:enabled:scale-[1.08] active:enabled:scale-[0.94] disabled:cursor-default disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <svg
                            className="h-3 w-3 opacity-70"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m4.5 2.5 4 3.5-4 3.5" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => paginate(-1)}
                        disabled={index === 0}
                        aria-label="Previous testimonial"
                        className="grid h-6 w-6 cursor-pointer place-items-center rounded-full border border-foreground/15 bg-transparent p-0 text-foreground transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:enabled:scale-[1.08] active:enabled:scale-[0.94] disabled:cursor-default disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <svg
                            className="h-3 w-3 opacity-70"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M7.5 2.5 3.5 6l4 3.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ScrollReelTestimonials;
