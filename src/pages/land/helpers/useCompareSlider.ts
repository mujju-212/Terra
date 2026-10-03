import { useCallback, useEffect, useRef, useState } from 'react';

interface CompareSliderOptions {
  /** Initial position in percent (0–100). */
  initial?: number;
  /** Min position clamp in percent. */
  min?: number;
  /** Max position clamp in percent. */
  max?: number;
}

/**
 * Drag logic for before/after comparison sliders (mouse + touch).
 * Attach `containerRef` to the clipping container and call
 * `onMouseDown`/`onTouchMove` from the container's handlers; window-level
 * listeners keep the drag tracking after the cursor leaves the element.
 */
export function useCompareSlider({ initial = 50, min = 8, max = 92 }: CompareSliderOptions = {}) {
  const [pos, setPos] = useState<number>(initial);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveTo = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(min, Math.min(max, pct)));
    },
    [min, max]
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      moveTo(e.clientX);
    },
    [moveTo]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) moveTo(e.touches[0].clientX);
    },
    [moveTo]
  );

  useEffect(() => {
    if (!isDragging) return;
    const onWinMouseMove = (e: MouseEvent) => moveTo(e.clientX);
    const onWinMouseUp = () => setIsDragging(false);
    const onWinTouchEnd = () => setIsDragging(false);
    window.addEventListener('mousemove', onWinMouseMove);
    window.addEventListener('mouseup', onWinMouseUp);
    window.addEventListener('touchend', onWinTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onWinMouseMove);
      window.removeEventListener('mouseup', onWinMouseUp);
      window.removeEventListener('touchend', onWinTouchEnd);
    };
  }, [isDragging, moveTo]);

  return { pos, setPos, isDragging, containerRef, onMouseDown, onTouchMove };
}
