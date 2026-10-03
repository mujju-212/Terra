import type * as React from 'react';

/**
 * Build a style object of CSS custom properties (e.g. cssVar({ '--pin-theme': color }))
 * with the cast handled in one place.
 */
export function cssVar(
  vars: Record<string, string | number>
): React.CSSProperties {
  return vars as React.CSSProperties;
}
