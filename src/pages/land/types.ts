/**
 * Standard nav props passed by LandModuleExperience to every chapter screen.
 * The shell always supplies all three; `onJumpChapter` powers the shared
 * clickable chapter dots (helpers/ChapterDots.tsx).
 */
export interface ScreenNavProps {
  onPrev: () => void;
  onNext: () => void;
  onJumpChapter: (index: number) => void;
}
