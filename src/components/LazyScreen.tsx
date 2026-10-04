import React, { useState, useEffect, useRef } from 'react';

interface LazyScreenProps {
  id?: string;
  className?: string;
  minHeight?: string | number;
  rootMargin?: string;
  priority?: boolean;
  children: React.ReactNode;
}

/**
 * Viewport virtualization wrapper for heavy curriculum screens.
 * Off-screen chapters remain unmounted until the user scrolls within 800px.
 * Preserves scroll anchors and eliminates simultaneous network stampedes.
 */
export default function LazyScreen({
  id,
  className = '',
  minHeight = '100vh',
  rootMargin = '800px 0px',
  priority = false,
  children,
}: LazyScreenProps) {
  const [mounted, setMounted] = useState<boolean>(priority);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (priority || mounted) return;

    const el = placeholderRef.current;
    if (!el) return;

    // Fallback if IntersectionObserver is not available
    if (typeof IntersectionObserver === 'undefined') {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, mounted, rootMargin]);

  if (mounted) {
    return <>{children}</>;
  }

  const heightStyle = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

  return (
    <div
      ref={placeholderRef}
      id={id}
      className={`lazy-screen-placeholder ${className}`}
      style={{
        minHeight: heightStyle,
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    />
  );
}
