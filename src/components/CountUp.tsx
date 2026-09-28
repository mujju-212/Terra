import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  /** Target numeric value. */
  to: number;
  /** Fraction digits to keep while counting (e.g. 1 -> "4.6"). */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Seconds for the count-up sweep. */
  duration?: number;
  className?: string;
  /**
   * Optional external trigger. When provided, the count starts on this flag
   * instead of on intersection — used for numbers inside the sticky hero stage
   * that are technically "in view" from page load but should only count once the
   * scroll-scrub reaches them.
   */
  start?: boolean;
}

/**
 * Count-up number that animates 0 -> `to` when it becomes relevant.
 * Honors prefers-reduced-motion by snapping straight to the final value.
 */
export default function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className,
  start,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-40px' });

  // External `start` flag wins over intersection when supplied.
  const active = start !== undefined ? start : inView;

  const [display, setDisplay] = useState(() => (reduced || active ? to : 0));

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setDisplay(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [active, to, duration, reduced]);

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
