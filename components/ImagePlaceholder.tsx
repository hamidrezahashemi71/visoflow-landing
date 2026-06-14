/** Themed image slot with shimmer + a small "image" glyph.
 *  Drop a real <img> in later; the frame stays identical. */
export default function ImagePlaceholder({
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`shimmer relative ${ratio} overflow-hidden rounded-2xl border border-line bg-(--gradient-surface) ${className}`}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-2 text-text-soft/70">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-[11px] font-medium">{label}</span>
        </div>
      </div>
      {/* corner ticks for a "frame" feel */}
      <span className="absolute right-3 top-3 h-4 w-4 rounded-tr border-r-2 border-t-2 border-secondary/30" />
      <span className="absolute left-3 bottom-3 h-4 w-4 rounded-bl border-b-2 border-l-2 border-secondary/30" />
    </div>
  );
}
