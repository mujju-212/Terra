import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Renders children only while the wrapped element is near the viewport
 * (±40% margin). Used around heavy WebGL <Canvas> mounts so their render
 * loops and GPU contexts don't stay alive for sections the user scrolled
 * past. Falls back to always-rendered where IntersectionObserver is missing.
 */
export default function NearViewportMount({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setNear(true);
        else setNear(false);
      },
      { rootMargin: '40% 0px 40% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        visibility: near ? undefined : 'hidden',
      }}
    >
      {near ? children : null}
    </div>
  );
}
