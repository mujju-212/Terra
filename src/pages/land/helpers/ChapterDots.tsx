import { CHAPTER_COUNT } from './chapters';

interface ChapterDotsProps {
  /** Zero-based index of the chapter this screen represents. */
  activeIndex: number;
  /** Jump to another chapter (wire to the shell's scrollToChapter). */
  onJump?: (chapterIndex: number) => void;
  /** Class on the container — pass each screen's original dots-strip class. */
  className?: string;
  /** Class for each dot, so screens keep their own visual style. */
  dotClassName?: string;
  /** Active modifier class matching the dot style's CSS. */
  activeClassName?: string;
}

const DEFAULT_STRIP = 'soil-pagination-dots-strip';

/**
 * Module-wide chapter progress dots: renders the real 15-chapter module and
 * every dot is a real button that jumps to its chapter. Previously each
 * screen invented its own dot count (5, 7 or 8) with mislabeled tooltips and
 * dead spans; this keeps each screen's visual style via dotClassName.
 */
export default function ChapterDots({
  activeIndex,
  onJump,
  className = DEFAULT_STRIP,
  dotClassName = 'pagination-bead',
  activeClassName = 'is-active-bead',
}: ChapterDotsProps) {
  return (
    <div className={className} role="navigation" aria-label="Module Chapter Progress">
      {Array.from({ length: CHAPTER_COUNT }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`${dotClassName} ${i === activeIndex ? activeClassName : ''}`}
          onClick={() => onJump?.(i)}
          title={`Chapter ${String(i + 1).padStart(2, '0')}`}
          aria-label={`Jump to chapter ${i + 1}`}
          aria-current={i === activeIndex ? 'step' : undefined}
        />
      ))}
    </div>
  );
}
