import type * as React from 'react';

/**
 * Returns an onKeyDown handler that fires `fn` on Enter or Space, so
 * `role="button" tabIndex={0}` divs behave like real buttons for keyboard
 * users (previously many of these were focusable but not activatable).
 */
export function keyActivate(
  fn: () => void
): (e: React.KeyboardEvent) => void {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      fn();
    }
  };
}
