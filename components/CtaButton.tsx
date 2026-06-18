import { QUIZ_URL } from "@/lib/config";
import ArrowIcon from "./ArrowIcon";
import { LiquidButton } from "./ui/liquid-glass-button";

type Props = {
  children: React.ReactNode;
  /** xxl for the big in-page CTAs, xl for the compact sticky bar. */
  size?: "xl" | "xxl";
  /** Extra classes merged onto the outer wrapper (e.g. layering / full-width). */
  className?: string;
};

/**
 * Primary call-to-action. A liquid-glass button wrapped in an animated
 * "smoke" aura that drifts around it to pull the eye. Rendered as an
 * <a href="#quiz"> so the timed FinalCtaModal can still cancel itself on
 * click (it matches `a[href="#quiz"]`).
 */
export default function CtaButton({ children, size = "xxl", className = "" }: Props) {
  return (
    <span className={`cta-aura-wrap relative isolate inline-flex ${className}`}>
      <span aria-hidden className="cta-aura" />
      <LiquidButton
        asChild
        size={size}
        className="group relative z-1 w-full text-[16.5px] font-bold text-primary-deep"
      >
        <a href={QUIZ_URL}>
          <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
            {children}
            <ArrowIcon />
          </span>
        </a>
      </LiquidButton>
    </span>
  );
}
