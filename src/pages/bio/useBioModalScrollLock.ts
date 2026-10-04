import { useEffect } from 'react';

/**
 * Dual-scrolling hook for all Biodiversity Module modals:
 * 
 * 1. Leaves page scroll & Lenis active so background page can be scrolled via wheel/scrollbar/touch.
 * 2. Allows modal internal content to scroll independently with its own scrollbar.
 * 3. Handles wheel events across the modal dialog by routing deltas into the scrollable body.
 * 4. Forwards backdrop touch gestures to the window so mobile users can scroll the page.
 * 5. Listens for the Escape key to close the modal cleanly.
 */
export function useBioModalScrollLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if wheel event occurred within any active biodiversity modal
      const modal = target.closest(
        '.bio-types-modal-card, .bio-eco-modal-card, .bio-sig-modal-card, .bio-econ-modal-card, .bio-sum-modal-card'
      ) as HTMLElement | null;

      // If wheel occurred on the backdrop outside the card, let it bubble to window/Lenis to scroll the page!
      if (!modal) {
        return;
      }

      // Find the scrollable body container
      const scrollable = (
        modal.querySelector(
          '.bio-types-modal-body, .bio-eco-modal-body, .bio-sig-modal-body, .bio-econ-modal-body, .bio-sum-modal-body'
        ) || modal
      ) as HTMLElement | null;

      if (scrollable) {
        // If cursor is on the hero header, close button or padding, route delta into the body
        const isInsideBody = target.closest(
          '.bio-types-modal-body, .bio-eco-modal-body, .bio-sig-modal-body, .bio-econ-modal-body, .bio-sum-modal-body'
        );
        if (!isInsideBody && modal !== scrollable) {
          scrollable.scrollTop += e.deltaY;
          e.preventDefault();
        }
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
      const modal = target.closest(
        '.bio-types-modal-card, .bio-eco-modal-card, .bio-sig-modal-card, .bio-econ-modal-card, .bio-sum-modal-card'
      );
      // If user swipes outside modal window on the backdrop, scroll the background page
      if (!modal && e.touches.length === 1) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        window.scrollBy({ top: deltaY, behavior: 'auto' });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { capture: true, passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}

export default useBioModalScrollLock;
