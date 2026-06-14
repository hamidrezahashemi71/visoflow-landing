/** Decorative vector divider between sections (themed wave + diamond). */
export default function Divider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative h-16 w-full ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M0 30 C 200 60, 400 0, 600 30 S 1000 60, 1200 30"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-2.5 w-2.5 rotate-45 border border-secondary/40 bg-(--gradient-primary)" />
      </div>
    </div>
  );
}
