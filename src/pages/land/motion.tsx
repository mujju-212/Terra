import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Shared interactive / motion primitives for the Land module screens.
 * Everything here is reduced-motion aware and fail-safe (if an effect can't run,
 * the content simply stays in its natural, visible state).
 */

export { default as CountUp } from '../../components/CountUp';

/* ------------------------------------------------------------------ */
/* Reveal — directional scroll reveal driven by IntersectionObserver +  */
/* WAAPI (robust inside overflow:hidden sections, unlike whileInView).  */
/* ------------------------------------------------------------------ */
type Dir = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

export function Reveal({
  children,
  dir = 'up',
  amount = 34,
  delay = 0,
  className,
  style,
  as: Tag = 'div',
  ...rest
}: {
  children: React.ReactNode;
  dir?: Dir;
  amount?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const from: Record<string, string | number> = { opacity: 0 };
    if (dir === 'up') from.transform = `translateY(${amount}px)`;
    else if (dir === 'down') from.transform = `translateY(${-amount}px)`;
    else if (dir === 'left') from.transform = `translateX(${amount}px)`;
    else if (dir === 'right') from.transform = `translateX(${-amount}px)`;
    else if (dir === 'scale') from.transform = `scale(${1 - amount / 400})`;
    else if (dir === 'blur') from.filter = 'blur(8px)';
    const to: Record<string, string | number> = { opacity: 1, transform: 'none', filter: 'blur(0px)' };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          try {
            (e.target as HTMLElement).animate([from, to], {
              duration: 720,
              delay,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'backwards',
            });
          } catch {
            /* stays visible */
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [dir, amount, delay, reduced]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref as any} className={className} style={style} {...(rest as any)}>
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard — 3D tilt toward the cursor + a soft spotlight that follows */
/* the pointer. Great for cards, tiles and panels.                      */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  style,
  max = 7,
  scale = 1.02,
  spotlight = true,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { max?: number; scale?: number; spotlight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    mx.set(px * 100);
    my.set(py * 100);
    rest.onMouseMove?.(e);
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rx.set(0);
    ry.set(0);
    rest.onMouseLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className ?? ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduced
          ? style
          : ({
              ...style,
              rotateX: rx,
              rotateY: ry,
              transformPerspective: 900,
              '--mx': mx,
              '--my': my,
            } as unknown as React.CSSProperties)
      }
      whileHover={reduced ? undefined : { scale }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      {...(rest as any)}
    >
      {spotlight && !reduced && <span className="tilt-spotlight" aria-hidden="true" />}
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — element gently pulls toward the cursor on hover.          */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  style,
  strength = 0.35,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
    rest.onMouseMove?.(e);
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    x.set(0);
    y.set(0);
    rest.onMouseLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduced ? style : ({ ...style, x, y } as unknown as React.CSSProperties)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* KenBurns — slow infinite "breathing" zoom/pan for an image.          */
/* ------------------------------------------------------------------ */
export function KenBurns({
  src,
  alt,
  className,
  imgClassName,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; className?: string; imgClassName?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={`kenburns ${className ?? ''}`} {...(rest as any)}>
      <img src={src} alt={alt} className={`kenburns-img ${imgClassName ?? ''} ${reduced ? 'no-anim' : ''}`} />
    </span>
  );
}
