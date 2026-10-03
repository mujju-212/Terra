import { useEffect, useRef, useState } from 'react';

export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
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

      // Wake up the lerp loop if it went to sleep
      if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const leave = () => {
      reveal(false);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const tick = () => {
      const dx = target.x - ring.x;
      const dy = target.y - ring.y;
      // Critically-damped-ish lerp for a smooth, weighty trailing ring.
      ring.x += dx * 0.16;
      ring.y += dy * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      // Only keep ticking if the ring hasn't settled yet
      if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0; // Sleep when settled to free 100% of CPU for 60/120fps scrolling
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      if (frame) cancelAnimationFrame(frame);
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
