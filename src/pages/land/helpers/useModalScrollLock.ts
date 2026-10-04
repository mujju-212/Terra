import { useEffect } from 'react';

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


interface ModalScrollLockOptions {
  /** CSS selector(s) matching the scrollable body inside the open modal. */
  scrollableSelector: string;
  /** Called when Escape is pressed while the modal is open. */
  onClose?: () => void;
}

/**
 * Dual-scrolling hook for module modals:
 * - Leaves page scroll & Lenis active so background page can be scrolled via wheel/scrollbar/touch
 * - Allows modal internal content to scroll independently with its own scrollbar
 * - Routes wheel over modal headers/padding into the modal body
 * - Forwards backdrop touch gestures to the window so mobile users can scroll the page
 * - Handles Escape key to close
 */
export function useModalScrollLock(isOpen: boolean, options: ModalScrollLockOptions) {
  const { scrollableSelector, onClose } = options;

  useEffect(() => {
    if (!isOpen) return;

    let touchStartY = 0;

    const handleNativeWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find the active modal dialog/window/card
      const modalWindow = target.closest(
        '[role="dialog"], [class*="-modal-window"], [class*="-modal-card"], [class*="-modal-dialog"], [class*="-modal-content"]'
      ) as HTMLElement | null;

      // If wheel occurred on the backdrop outside the modal, let it bubble to window/Lenis to scroll the page!
      if (!modalWindow) {
        return;
      }

      // If inside modal: find the active scrollable body container
      const scrollable = (
        target.closest(scrollableSelector) ||
        modalWindow.querySelector(scrollableSelector) ||
        (document.querySelector(scrollableSelector)) ||
        modalWindow
      ) as HTMLElement | null;

      if (!scrollable) return;

      // If user spins wheel over header, title, badges, hero, or padding, route delta into scrollable body
      const isInsideScrollable = target.closest(scrollableSelector);
      if (!isInsideScrollable && modalWindow !== scrollable) {
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
      const modalWindow = target.closest(
        '[role="dialog"], [class*="-modal-window"], [class*="-modal-card"], [class*="-modal-dialog"], [class*="-modal-content"]'
      );
      // If user swipes outside modal window on the backdrop, scroll the background page
      if (!modalWindow && e.touches.length === 1) {
        const deltaY = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        window.scrollBy({ top: deltaY, behavior: 'auto' });
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleNativeTouch, { capture: true, passive: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleNativeWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleNativeTouch, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, scrollableSelector, onClose]);
}
