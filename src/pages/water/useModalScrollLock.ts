import { useEffect } from 'react';

export function useModalScrollLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    if (window.__lenis) {
      window.__lenis.stop();
    }

    const handleNativeWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      const scrollable = target?.closest(
        '.water-modal-body, .water-sector-modal-content, .water-cons-modal-content'
      ) as HTMLElement | null;

      if (!scrollable) {
        const insideCard = target?.closest(
          '.water-modal-card, .water-sector-modal-card, .water-cons-modal-card'
        );
        const activeContent = document.querySelector(
          '.water-modal-body, .water-sector-modal-content, .water-cons-modal-content'
        ) as HTMLElement | null;
        if (insideCard && activeContent) {
          activeContent.scrollTop += e.deltaY;
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const atTop = scrollTop <= 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener('wheel', handleNativeWheel, { capture: true, passive: false });

    const handleNativeTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest('.water-modal-body, .water-sector-modal-content, .water-cons-modal-content')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener('touchmove', handleNativeTouch, { capture: true, passive: false });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener('wheel', handleNativeWheel, { capture: true });
      window.removeEventListener('touchmove', handleNativeTouch, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
