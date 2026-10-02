import { useEffect } from 'react';

/**
 * Robust scroll lock and wheel management hook for all Biodiversity Module modals.
 * 
 * 1. Pauses global Lenis smooth scrolling so wheel events are not hijacked.
 * 2. Locks document.body overflow so the background page stays completely still.
 * 3. Handles wheel events across the entire modal dialog (including hero headers,
 *    pills, and title boxes) by routing scroll deltas directly into the scrollable body.
 * 4. Listens for the Escape key to close the modal cleanly.
 * 5. Safely restores Lenis and document.body overflow when the modal closes.
 */
export function useBioModalScrollLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // Pause global Lenis smooth scroller while modal is open
    if (window.__lenis) {
      window.__lenis.stop();
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find if wheel event occurred within any active biodiversity modal
      const modal = target.closest(
        '.bio-types-modal-card, .bio-eco-modal-card, .bio-sig-modal-card, .bio-econ-modal-card, .bio-sum-modal-card'
      ) as HTMLElement | null;

      // If wheel occurred on the backdrop outside the card, stop background scrolling
      if (!modal) {
        e.preventDefault();
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
          return;
        }

        // Clamp boundary overscroll so wheel never propagates to the page behind
        const atTop = scrollable.scrollTop <= 0;
        const atBottom = Math.ceil(scrollable.scrollTop + scrollable.clientHeight) >= scrollable.scrollHeight - 1;
        if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
          e.preventDefault();
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const modal = target.closest(
        '.bio-types-modal-card, .bio-eco-modal-card, .bio-sig-modal-card, .bio-econ-modal-card, .bio-sum-modal-card'
      );
      if (!modal) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    // Attach capture-phase wheel listener for reliable interception
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
}

export default useBioModalScrollLock;
