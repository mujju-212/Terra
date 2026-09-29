import { useEffect } from 'react';

// All modal scrollable body selectors — water, air, land, and generic
const SCROLLABLE_SELECTORS = [
  '.water-modal-body',
  '.water-sector-modal-content',
  '.water-cons-modal-content',
  '.water-ibwt-modal-content',
  '.ilr-modal-content',
  '.ilr-modal-body',
  '.conjunctive-modal-dialog',
  '.modal-body-content',
  '.gw-modal-dialog',
  '.gw-modal-body',
  '.gw-contam-modal-card',
  '.gw-contam-modal-body',
  '.air-modal-body',
  '.land-modal-body',
  '.modal-body',
  '.modal-content',
  '[data-modal-scrollable]',
  '[class*="modal-body"]',
  '[class*="modal-content"]',
  '[class*="modal-scrollable"]',
].join(', ');

const MODAL_CARD_SELECTORS = [
  '.water-modal-card',
  '.water-modal-container',
  '.water-summary-modal-box',
  '.water-sector-modal-card',
  '.water-cons-modal-card',
  '.water-ibwt-modal-card',
  '.ilr-modal-content',
  '.conjunctive-modal-dialog',
  '.gw-modal-dialog',
  '.gw-contam-modal-card',
  '.air-modal-card',
  '.land-modal-card',
  '.modal-card',
  '[role="dialog"]',
  '[data-modal-card]',
  '[class*="modal-card"]',
  '[class*="modal-dialog"]',
  '[class*="modal-window"]',
  '[class*="modal-content"]',
  '[class*="modal-container"]',
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
    const originalPadding      = document.body.style.paddingRight;

    document.body.classList.add('modal-open');
    document.body.style.overflow     = 'hidden';
    document.body.style.paddingRight = `${sbWidth}px`; // compensate for lost scrollbar
    document.documentElement.style.overflow = 'hidden';

    if (window.__lenis) window.__lenis.stop();

    const handleNativeWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if wheel event occurred within any active modal dialog/card
      const modal = target.closest(MODAL_CARD_SELECTORS) as HTMLElement | null;

      // If wheel occurred on backdrop outside the modal, block page scroll
      if (!modal) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Find the scrollable container inside or modal itself
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

      // If cursor is on the header, hero, close button or card padding, route delta into scrollable
      const isInsideScrollable = target.closest(SCROLLABLE_SELECTORS);
      if (!isInsideScrollable && modal !== scrollable) {
        scrollable.scrollTop += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Clamp boundary overscroll so wheel never propagates to the page behind
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const atTop    = scrollTop <= 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;

      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('wheel', handleNativeWheel, { capture: true, passive: false });

    const handleNativeTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const modal = target.closest(MODAL_CARD_SELECTORS);
      if (!modal) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('touchmove', handleNativeTouch, { capture: true, passive: false });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow     = originalBodyOverflow;
      document.body.style.paddingRight = originalPadding;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.removeProperty('--scrollbar-width');
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener('wheel',     handleNativeWheel, { capture: true });
      window.removeEventListener('touchmove', handleNativeTouch, { capture: true });
      window.removeEventListener('keydown',   handleKeyDown);
    };
  }, [isOpen, onClose]);
}
