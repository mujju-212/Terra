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

/**
 * Dual-scrolling hook for water modals:
 * - Leaves page scroll & Lenis active so background page can be scrolled via wheel/scrollbar/touch
 * - Allows modal internal content to scroll independently with its own scrollbar
 * - Routes wheel over modal headers/padding into the modal body
 * - Forwards backdrop touch gestures to the window so mobile users can scroll the page
 * - Handles Escape key to close
 */
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

      // Find the scrollable container inside or modal itself
      const scrollable = (
        target.closest(SCROLLABLE_SELECTORS) ||
        modal.querySelector(SCROLLABLE_SELECTORS) ||
        modal
      ) as HTMLElement | null;

      if (!scrollable) return;

      // If cursor is on the header, hero, close button or card padding, route delta into scrollable
      const isInsideScrollable = target.closest(SCROLLABLE_SELECTORS);
      if (!isInsideScrollable && modal !== scrollable) {
        scrollable.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleNativeWheel, { capture: true, passive: false });

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleNativeTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const modal = target.closest(MODAL_CARD_SELECTORS);
      // If user swipes outside modal window on the backdrop, scroll the background page
      if (!modal && e.touches.length === 1) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        window.scrollBy({ top: deltaY, behavior: 'auto' });
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleNativeTouch, { capture: true, passive: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleNativeWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleNativeTouch, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}
