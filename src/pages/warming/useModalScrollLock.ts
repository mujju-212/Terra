import { useEffect } from 'react';

// All modal scrollable body selectors in Warming module and general components
const SCROLLABLE_SELECTORS = [
  '.vs-modal-card',
  '.summary-detail-modal',
  '.history-detail-modal',
  '.flowchart-detail-modal',
  '.eia-proc-modal-window',
  '.eia-rep-modal-window',
  '.eia-bf-modal-window',
  '.eia-modal-window',
  '.climate-modal-window',
  '[data-lenis-prevent]',
  '[data-modal-scrollable]',
  '[class*="modal-card"]',
  '[class*="modal-window"]',
  '[class*="modal-body"]',
].join(', ');

const MODAL_CARD_SELECTORS = [
  '.vs-modal-card',
  '.summary-detail-modal',
  '.history-detail-modal',
  '.flowchart-detail-modal',
  '.eia-proc-modal-window',
  '.eia-rep-modal-window',
  '.eia-bf-modal-window',
  '.eia-modal-window',
  '.climate-modal-window',
  '[data-lenis-prevent]',
  '[role="dialog"] > *',
  '[class*="modal-card"]',
  '[class*="modal-window"]',
  '[class*="modal-dialog"]',
].join(', ');

/**
 * Dual-scrolling hook for Warming modals:
 * - Leaves page scroll & Lenis active so background page can be scrolled via wheel/scrollbar/touch when cursor is outside the popup
 * - Allows modal internal content to scroll independently with its own scrollbar when cursor is inside the popup
 * - Forwards backdrop touch/wheel gestures to the window so users can scroll the outside page
 * - Handles Escape key to close
 */
export function useModalScrollLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    let touchStartY = 0;

    const handleNativeWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if wheel event occurred within the active modal card
      const modal = target.closest(MODAL_CARD_SELECTORS) as HTMLElement | null;

      // If wheel occurred on backdrop outside the modal card, let it bubble to window/Lenis to scroll the outside page!
      if (!modal) {
        return;
      }

      // If inside modal, find scrollable container
      const scrollable = (
        target.closest(SCROLLABLE_SELECTORS) ||
        modal.querySelector(SCROLLABLE_SELECTORS) ||
        modal
      ) as HTMLElement | null;

      if (!scrollable) return;

      // If cursor is on child elements inside the card, ensure wheel scrolls the card
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
