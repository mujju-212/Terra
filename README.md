# Conservation of Natural Resources

A client-side learning experience for course BCV755B. The site has a cinematic landing page, five chapter-based module experiences, and a locally scored quiz. The content is organized separately from presentation in `src/content/` and reflects the supplied course notes.

## Routes

- `/` — landing page and resource-world selector
- `/module/land`
- `/module/water`
- `/module/air`
- `/module/biodiversity`
- `/module/warming` — global warming and EIA
- `/quiz` — full-course or module-specific quiz

## Run locally

```bash
npm install
npm run dev
```

## Verify and build

```bash
npm run check:content
npm run build
npm run preview
```

The content check verifies the expected chapter counts and a short list of key course figures/case-study references. The build runs TypeScript checks and outputs a static SPA to `dist/`. Configure static hosting to fall back to `index.html` for client-side routes.

## Accessibility and performance

- Keyboard-accessible navigation and interactive controls, visible focus indicators, a skip-to-content link, and status announcements for quiz and selected visual states.
- `prefers-reduced-motion` support for scene animation and programmatic scrolling; a static CSS globe is used instead of loading the Three.js hero when reduced motion is requested.
- Module visuals are route-lazy-loaded; Three.js is split into vendor chunks.
- Responsive visual layouts and touch targets are defined in `src/responsive-visuals.css`.

## Assets

The five world-background images are local WebP assets under `public/images/`. Their previous local JPEG versions were converted to WebP for delivery size. The original source/creator/license details were not present in the workspace metadata; see `public/images/CREDITS.md` and confirm usage rights before public deployment.
