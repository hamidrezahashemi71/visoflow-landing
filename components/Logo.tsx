import Image, { type StaticImageData } from "next/image";
import { SITE } from "@/lib/config";
import lockup from "@/public/lockup-fa-light.webp";
import logomark from "@/public/logomark-light.webp";
import wordmark from "@/public/wordmark-fa-light.webp";

type LogoVariant = "lockup" | "logomark" | "wordmark";

const SOURCES: Record<LogoVariant, StaticImageData> = {
  lockup,
  logomark,
  wordmark,
};

/** Rendered height in px per variant; width scales to keep the source aspect ratio. */
const HEIGHTS: Record<LogoVariant, { default: number; small: number }> = {
  lockup: { default: 120, small: 60 },
  logomark: { default: 32, small: 16 },
  wordmark: { default: 90, small: 20 },
};

type LogoProps = {
  /** Which artwork to render. Defaults to the full lockup (mark + wordmark). */
  variant?: LogoVariant;
  /** Compact sizing for dense spots like the footer. */
  small?: boolean;
  /** Eager-load + preload (use for the above-the-fold nav logo). */
  priority?: boolean;
  className?: string;
};

export default function Logo({
  variant = "lockup",
  small = false,
  priority = false,
  className = "",
}: LogoProps) {
  const src = SOURCES[variant];
  const height = small ? HEIGHTS[variant].small : HEIGHTS[variant].default;

  return (
    <Image
      src={src}
      alt={SITE.name}
      priority={priority}
      sizes={`${height}px`}
      className={`w-auto select-none ${className}`}
      style={{ height }}
    />
  );
}
