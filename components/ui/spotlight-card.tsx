'use client';

import {
  useEffect,
  ReactNode,
  ElementType,
  ComponentPropsWithoutRef,
  CSSProperties,
} from 'react';
import { cn } from '@/lib/utils';

type GlowColor = 'blue' | 'purple' | 'green' | 'red' | 'orange';

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const STYLE_ID = 'glow-card-styles';

const glowStyles = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }

  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
    );
    filter: brightness(2);
  }

  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
    );
  }

  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }

  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

/**
 * The spotlight position is shared by every GlowCard: coordinates are in
 * viewport space and the gradients use `background-attachment: fixed`, so a
 * single set of CSS variables on the document root drives all instances.
 * This keeps GlowCard cheap to use anywhere — one listener, one <style> tag,
 * no matter how many cards are mounted.
 */
let activeCards = 0;

const syncPointer = (e: PointerEvent) => {
  const root = document.documentElement;
  root.style.setProperty('--x', e.clientX.toFixed(2));
  root.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
  root.style.setProperty('--y', e.clientY.toFixed(2));
  root.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
};

function useGlowEnvironment() {
  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = STYLE_ID;
      tag.textContent = glowStyles;
      document.head.appendChild(tag);
    }

    if (activeCards === 0) {
      document.addEventListener('pointermove', syncPointer);
    }
    activeCards += 1;

    return () => {
      activeCards -= 1;
      if (activeCards === 0) {
        document.removeEventListener('pointermove', syncPointer);
      }
    };
  }, []);
}

type GlowCardProps<T extends ElementType = 'div'> = {
  /** Render as a different element/component. Defaults to `div`. */
  as?: T;
  glowColor?: GlowColor;
  /** Corner radius (px) used by the glow border. Defaults to 14. */
  radius?: number;
  /** Border thickness (px). Defaults to 3. */
  borderWidth?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'color' | 'className' | 'style' | 'children' | 'width' | 'height'
>;

function GlowCard<T extends ElementType = 'div'>({
  as,
  glowColor = 'blue',
  radius = 14,
  borderWidth = 3,
  width,
  height,
  className,
  style,
  children,
  ...rest
}: GlowCardProps<T>) {
  useGlowEnvironment();

  const Tag = (as ?? 'div') as ElementType;
  const { base, spread } = glowColorMap[glowColor];

  const glowStyle: CSSProperties & Record<string, string | number> = {
    '--base': base,
    '--spread': spread,
    '--radius': radius,
    '--border': borderWidth,
    // fill is transparent by default so it behaves like a plain container;
    // the always-on border stays faintly visible.
    '--backdrop': 'transparent',
    '--backup-border': 'hsl(0 0% 60% / 0.12)',
    '--size': '200',
    '--outer': '1',
    // '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundSize:
      'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative',
    ...(width !== undefined
      ? { width: typeof width === 'number' ? `${width}px` : width }
      : {}),
    ...(height !== undefined
      ? { height: typeof height === 'number' ? `${height}px` : height }
      : {}),
    ...style,
  };

  return (
    <Tag
      data-glow
      style={glowStyle}
      className={cn('rounded-2xl', className)}
      {...rest}
    >
      <div data-glow />
      {children}
    </Tag>
  );
}

export { GlowCard };
export type { GlowCardProps, GlowColor };
