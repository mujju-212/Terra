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
 * Airtight background scroll lock for module modals:
 * - locks html/body overflow and pauses the global Lenis smooth scroller
 * - capture-phase wheel/touch interception so only the modal body scrolls,
 *   with boundary overscroll clamped so it never leaks to the page
 * - Escape-to-close (single shared keydown listener)
 *
 * Consolidates the near-identical ~80-line effects previously duplicated in
 * Deforestation, LandUseChange, LandDegradation, LandPlanning, SoilHealth
 * and SoilConservation screens.
 */
export function useModalScrollLock(isOpen: boolean, options: ModalScrollLockOptions) {
  const { scrollableSelector, onClose } = options;

  useEffect(() => {
    if (!isOpen) return;

    // Measure scrollbar to prevent layout shift when modal opens
    const sbWidth = getScrollbarWidth();
    document.documentElement.style.setProperty('--scrollbar-width', `${sbWidth}px`);

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPadding      = document.body.style.paddingRight;

    document.body.classList.add('modal-open');
    document.body.style.overflow     = 'hidden';
    document.body.style.paddingRight = `${sbWidth}px`;
    document.documentElement.style.overflow = 'hidden';

    if (window.__lenis) window.__lenis.stop();

    const handleNativeWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find the active modal dialog/window/card
      const modalWindow = target.closest(
        '[role="dialog"], [class*="-modal-window"], [class*="-modal-card"], [class*="-modal-dialog"], [class*="-modal-content"]'
      ) as HTMLElement | null;

      // If wheel occurred on the backdrop outside the modal, block page scroll
      if (!modalWindow) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Find the active scrollable body container
      const scrollable = (
        target.closest(scrollableSelector) ||
        modalWindow.querySelector(scrollableSelector) ||
        (document.querySelector(scrollableSelector)) ||
        modalWindow
      ) as HTMLElement | null;

      if (!scrollable) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // If user spins wheel over header, title, badges, hero, or padding, route delta into scrollable body
      const isInsideScrollable = target.closest(scrollableSelector);
      if (!isInsideScrollable && modalWindow !== scrollable) {
        scrollable.scrollTop += e.deltaY;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Clamp boundary overscroll so wheel never leaks to the page behind
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const atTop = scrollTop <= 0;
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
      const modalWindow = target.closest(
        '[role="dialog"], [class*="-modal-window"], [class*="-modal-card"], [class*="-modal-dialog"], [class*="-modal-content"]'
      );
      if (!modalWindow) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('touchmove', handleNativeTouch, { capture: true, passive: false });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
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
  }, [isOpen, scrollableSelector, onClose]);
}
