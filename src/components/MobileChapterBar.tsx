import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ListFilter, X, BookOpen } from 'lucide-react';
import './MobileNav.css';

export interface MobileChapterItem {
  id: string;
  num?: string;
  title: string;
}

interface MobileChapterBarProps {
  chapters: readonly MobileChapterItem[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  accentColor?: string;
  moduleName?: string;
}

export default function MobileChapterBar({
  chapters,
  activeChapterIndex,
  onSelectChapter,
  accentColor = '#4fa3c7',
  moduleName = 'Module',
}: MobileChapterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  // Prevent background scroll when the chapter sheet is open
  useEffect(() => {
    if (!sheetOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [sheetOpen]);

  const total = chapters.length;
  if (total === 0) return null;

  const current = chapters[activeChapterIndex] || chapters[0];
  const isFirst = activeChapterIndex <= 0;
  const isLast = activeChapterIndex >= total - 1;
  const progressPercent = total > 1 ? (activeChapterIndex / (total - 1)) * 100 : 100;

  const handlePrev = () => {
    if (!isFirst) {
      onSelectChapter(activeChapterIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      onSelectChapter(activeChapterIndex + 1);
    }
  };

  const handleSelect = (idx: number) => {
    onSelectChapter(idx);
    setSheetOpen(false);
  };

  return (
    <>
      {/* ── Floating Capsule at Bottom of Mobile Viewport ── */}
      <div
        className="mobile-chapter-bar-wrap"
        style={{ '--bar-accent': accentColor } as React.CSSProperties}
        role="navigation"
        aria-label="Mobile Chapter Navigator"
      >
        <div className="mobile-chapter-pill">
          {/* Previous Chapter Arrow */}
          <button
            type="button"
            className="mcb-arrow-btn"
            onClick={handlePrev}
            disabled={isFirst}
            aria-label="Previous Chapter"
            title="Previous Chapter"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Active Chapter Label / Tap to Open List */}
          <button
            type="button"
            className="mcb-center-btn"
            onClick={() => setSheetOpen(true)}
            aria-label="Open Chapter List"
            title="Open Chapter List"
          >
            <span className="mcb-chapter-num">
              {activeChapterIndex === 0
                ? `${moduleName} · COVER`
                : `CH ${current.num || String(activeChapterIndex).padStart(2, '0')} / ${String(total - 1).padStart(2, '0')}`}
            </span>
            <span className="mcb-chapter-title">
              {activeChapterIndex === 0 ? 'Explore Field Notes ↓' : current.title}
            </span>
          </button>

          {/* Next Chapter Arrow */}
          <button
            type="button"
            className="mcb-arrow-btn"
            onClick={handleNext}
            disabled={isLast}
            aria-label="Next Chapter"
            title="Next Chapter"
          >
            <ChevronRight size={18} />
          </button>

          {/* Quick List Button */}
          <button
            type="button"
            className="mcb-list-btn"
            onClick={() => setSheetOpen(true)}
            aria-label="View All Chapters"
            title="View All Chapters"
          >
            <ListFilter size={16} />
          </button>

          {/* Bottom Progress Line */}
          <div
            className="mcb-progress-bar"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Mobile Chapter Bottom Sheet Modal ── */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              className="mobile-chapter-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSheetOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="mobile-chapter-sheet"
              style={{ '--bar-accent': accentColor } as React.CSSProperties}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${moduleName} Chapters Selection`}
            >
              <div className="mcs-handle-bar" />

              <div className="mcs-header">
                <div className="mcs-title-group">
                  <span className="mcs-eyebrow">{moduleName}</span>
                  <h3 className="mcs-title">Module Chapters ({total})</h3>
                </div>
                <button
                  type="button"
                  className="mcs-close-btn"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close chapter sheet"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mcs-list">
                {chapters.map((ch, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      className={`mcs-item ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleSelect(idx)}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span className="mcs-item-num">
                        {ch.num || (idx === 0 ? '00' : String(idx).padStart(2, '0'))}
                      </span>
                      <span className="mcs-item-title">{ch.title}</span>
                      {isActive && <span className="mcs-item-active-dot" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
