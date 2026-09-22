import { lazy, Suspense } from 'react';
import type { Chapter, ModuleContent } from '../content/types';

const LandVisual = lazy(() => import('./LandVisuals').then((module) => ({ default: module.LandVisual })));
const WaterVisual = lazy(() => import('./WaterVisuals').then((module) => ({ default: module.WaterVisual })));
const AirVisual = lazy(() => import('./AirVisuals').then((module) => ({ default: module.AirVisual })));
const BioVisual = lazy(() => import('./BioVisuals').then((module) => ({ default: module.BioVisual })));
const WarmingVisual = lazy(() => import('./WarmingVisuals').then((module) => ({ default: module.WarmingVisual })));

export default function ChapterVisual({ module, chapter }: { module: ModuleContent; chapter: Chapter }) {
  const props = { kind: chapter.kind, chapter };
  const Component = module.id === 1 ? LandVisual : module.id === 2 ? WaterVisual : module.id === 3 ? AirVisual : module.id === 4 ? BioVisual : WarmingVisual;
  return <div className="chapter-visual-shell">
    <div className="visual-shell-top"><span>FIELD STUDY</span><span>{module.shortName} / {chapter.id.replace('ch-', '')}</span></div>
    <Suspense fallback={<div className="visual-loading"><span className="loading-orbit" />Building interactive visual…</div>}>
      <Component {...props} />
    </Suspense>
    <div className="visual-shell-bottom"><span>COURSE BCV755B</span><span>INTERACTIVE FIGURE · {String(module.id).padStart(2, '0')}.{chapter.id.slice(-2)}</span></div>
  </div>;
}
