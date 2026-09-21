import { useEffect, useRef, useState } from 'react';

export function GrainOverlay() {
  return (
    <svg className="grain-overlay" aria-hidden="true" focusable="false">
      <filter id="grainFilter">
        <feTurbulence type="fractalNoise" baseFrequency=".84" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grainFilter)" />
    </svg>
  );
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!coarse && !reduce);
    if (coarse || reduce) return;

    // Drive the cursor entirely through refs + rAF. No React re-render per
    // mousemove (the previous setState-per-move caused noticeable jank).
    let frame = 0;
    let revealed = false;
    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };

    const reveal = (on: boolean) => {
      revealed = on;
      const opacity = on ? '1' : '0';
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (ringRef.current) ringRef.current.style.opacity = opacity;
    };

    const move = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!revealed) {
        // Snap the trailing ring to the cursor on first appearance.
        ring.x = target.x;
        ring.y = target.y;
        reveal(true);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      const interactive = (event.target as HTMLElement | null)?.closest(
        '[data-interactive], a, button, [role="button"], input, label'
      );
      ringRef.current?.classList.toggle('is-active', Boolean(interactive));
    };

    const leave = () => reveal(false);

    const tick = () => {
      // Critically-damped-ish lerp for a smooth, weighty trailing ring.
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <span ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    // rAF-throttle scroll updates and write straight to the DOM — no setState
    // per scroll event (which re-rendered on every frame before).
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div
      ref={barRef}
      className="reading-progress"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
