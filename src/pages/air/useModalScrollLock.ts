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

    let touchStartY = 0;

    const handleNativeWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if wheel event occurred within any active modal dialog/card
      const modal = target.closest(MODAL_CARD_SELECTORS) as HTMLElement | null;

      // If wheel occurred on backdrop outside the modal, let it bubble to window/Lenis to scroll the page!
      if (!modal) {
        return;
      }

      // Find the scrollable container inside or the modal card itself
      const scrollable = (
        target.closest(SCROLLABLE_SELECTORS) ||
        modal.querySelector(SCROLLABLE_SELECTORS) ||
        modal
      ) as HTMLElement | null;

      if (!scrollable) return;

      // If cursor is on the header, banner, title, close button or card padding, route delta into scrollable
      const isInsideScrollable = target.closest(SCROLLABLE_SELECTORS);
      if (!isInsideScrollable && modal !== scrollable) {
        scrollable.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const modal = target.closest(MODAL_CARD_SELECTORS) as HTMLElement | null;
      // If user swipes outside modal window on the backdrop, scroll the background page
      if (!modal && e.touches.length === 1) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        window.scrollBy({ top: deltaY, behavior: 'auto' });
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
    window.addEventListener('touchmove', handleTouchMove, { passive: true, capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleNativeWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
