import { useEffect } from 'react';

// All modal scrollable body selectors across Air, Water, Land, and general components
const SCROLLABLE_SELECTORS = [
  '.air-modal-body',
  '.air-health-modal-box',
  '.air-aqi-modal-content',
  '.equipment-modal-content',
  '.air-photo-modal-dialog',
  '.water-modal-body',
  '.land-modal-body',
  '.modal-body',
  '.modal-content',
  '[data-modal-scrollable]',
  '[class*="modal-body"]',
  '[class*="modal-content"]',
  '[class*="modal-scrollable"]',
].join(', ');

const MODAL_CARD_SELECTORS = [
  '.air-modal-content',
  '.air-photo-modal-dialog',
  '.air-health-modal-box',
  '.air-aqi-modal-content',
  '.equipment-modal-content',
  '.water-modal-card',
  '.land-modal-card',
  '.modal-card',
  '[role="dialog"]',
  '[data-modal-card]',
  '[class*="modal-card"]',
  '[class*="modal-dialog"]',
  '[class*="modal-window"]',
  '[class*="modal-content"]',
  '[class*="modal-box"]',
].join(', ');

function getScrollbarWidth(): number {
  const outer = document.createElement('div');
  outer.style.cssText = 'visibility:hidden;overflow:scroll;width:50px;position:absolute;top:-9999px';
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  outer.appendChild(inner);
  const width = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);
  return width;
}

export function useModalScrollLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // Measure scrollbar to prevent layout shift
    const sbWidth = getScrollbarWidth();
    document.documentElement.style.setProperty('--scrollbar-width', `${sbWidth}px`);

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPadding = document.body.style.paddingRight;

    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${sbWidth}px`;
    document.documentElement.style.overflow = 'hidden';

    // Pause Lenis smooth scroller if active on window
    if ((window as any).__lenis) {
      try {
        (window as any).__lenis.stop();
      } catch (err) {
        /* ignore */
      }
    }

    const handleNativeWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if wheel event occurred within any active modal dialog/card
      const modal = target.closest(MODAL_CARD_SELECTORS) as HTMLElement | null;

      // If wheel occurred on backdrop outside the modal, block page scroll completely
      if (!modal) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Find the scrollable container inside or the modal card itself
      const scrollable = (
        target.closest(SCROLLABLE_SELECTORS) ||
        modal.querySelector(SCROLLABLE_SELECTORS) ||
        modal
      ) as HTMLElement | null;

      if (!scrollable) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // If cursor is on the header, banner, title, close button or card padding, route delta into scrollable
      const isInsideScrollable = target.closest(SCROLLABLE_SELECTORS);
      if (!isInsideScrollable && modal !== scrollable) {
        scrollable.scrollTop += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Otherwise inside scrollable container: prevent background bleed at scroll boundaries
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const modal = target.closest(MODAL_CARD_SELECTORS) as HTMLElement | null;
      if (!modal) {
        e.preventDefault();
        return;
      }

      const scrollable = (
        target.closest(SCROLLABLE_SELECTORS) ||
        modal.querySelector(SCROLLABLE_SELECTORS) ||
        modal
      ) as HTMLElement | null;

      if (!scrollable) {
        e.preventDefault();
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const { scrollTop, scrollHeight, clientHeight } = scrollable;

      if (deltaY < 0 && scrollTop <= 0) {
        e.preventDefault();
      } else if (deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('wheel', handleNativeWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalPadding;
      document.documentElement.style.overflow = originalHtmlOverflow;

      window.removeEventListener('wheel', handleNativeWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);

      if ((window as any).__lenis) {
        try {
          (window as any).__lenis.start();
        } catch (err) {
          /* ignore */
        }
      }
    };
  }, [isOpen, onClose]);
}
