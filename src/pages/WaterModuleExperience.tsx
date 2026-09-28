import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { ModuleContent } from '../content/types';
import '../water-module.css';

import {
  waterChaptersNav,
  WaterCoverScreen,
  HydrologicalCycleScreen,
  WaterSourcesScreen,
  GlobalWaterScreen,
  RiversIndiaScreen,
  WaterUsesScreen,
  WaterConservationScreen,
  WaterCurriculumChapters,
  WaterSummaryScreen,
} from './water';

// Re-export waterChaptersNav so any existing imports remain fully backwards-compatible
export { waterChaptersNav } from './water';

interface WaterModuleProps {
  module: ModuleContent;
}

export default function WaterModuleExperience({ module }: WaterModuleProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  // Scroll smoothly to any section
  const scrollToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const targetId = waterChaptersNav[index]?.id;
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  // IntersectionObserver to update activeChapterIndex as user scrolls
  useEffect(() => {
    const sectionIds = waterChaptersNav.map((c) => c.id);
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const best = visible.reduce((prev, curr) =>
            Math.abs(curr.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top) ? curr : prev
          );
          const idx = sectionIds.indexOf(best.target.id);
          if (idx !== -1) {
            setActiveChapterIndex(idx);
          }
        }
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-scroll the sidebar rail so the active chapter is always in view
  useEffect(() => {
    const activeBtn = document.getElementById(`rail-water-item-${activeChapterIndex}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeChapterIndex]);

  return (
    <div className="water-module-viewport">
      {/* ─── STICKY LEFT RAIL (18 Chapters) ─── */}
      <aside className="water-left-rail" aria-label="Module 02 Water Chapters Navigation">
        <div className="water-rail-track-line" />
        <nav className="water-rail-list">
          {waterChaptersNav.map((item, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={item.id}
                id={`rail-water-item-${idx}`}
                type="button"
                className={`water-rail-item ${isActive ? 'is-active' : ''}`}
                onClick={() => scrollToChapter(idx)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Jump to step ${item.num}: ${item.title}`}
              >
                <span className="water-rail-dot" />
                <span className="water-rail-num">{item.num}</span>
                <span className="water-rail-title">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="water-main-content" id="main-content">
        {/* SCREEN 01: MODULE COVER & HERO */}
        <WaterCoverScreen
          onStart={() => scrollToChapter(1)}
          onScrollToChapter={scrollToChapter}
        />

        {/* SCREEN 02: HYDROLOGICAL CYCLE */}
        <HydrologicalCycleScreen />

        {/* SCREEN 03: SOURCES OF WATER */}
        <WaterSourcesScreen onNext={() => scrollToChapter(3)} />

        {/* SCREEN 04: GLOBAL WATER RESOURCES */}
        <GlobalWaterScreen />

        {/* SCREEN 05: RIVERS IN INDIA */}
        <RiversIndiaScreen />

        {/* SCREEN 06: USES OF WATER */}
        <WaterUsesScreen />

        {/* SCREEN 07: WATER CONSERVATION & MANAGEMENT */}
        <WaterConservationScreen />

        {/* CHAPTERS 07 THROUGH 16: CURRICULUM CHAPTERS CONTAINER */}
        <WaterCurriculumChapters module={module} />

        {/* CHAPTER 18 / SUMMARY & RECAP */}
        <WaterSummaryScreen module={module} />
      </main>
    </div>
  );
}
