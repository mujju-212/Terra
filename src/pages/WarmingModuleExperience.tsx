import { useState, useEffect, useRef } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ModuleContent } from '../content/types';
import '../warming-module.css';
import ModuleCardsStrip from '../components/ModuleCardsStrip';
import MobileChapterBar from '../components/MobileChapterBar';

import {
  warmingChaptersNav,
  modulesNav,
  WarmingCoverScreen,
  WarmingIntroTransition,
  WarmingGreenhouseScreen,
  WarmingIndicatorsScreen,
  WarmingCausesScreen,
  WarmingEffectsScreen,
  WarmingVsClimateScreen,
  WarmingClimateIndicatorsScreen,
  WarmingHumanHealthScreen,
  WarmingEiaIntroScreen,
  WarmingEiaValuesScreen,
  WarmingEiaHistoryScreen,
  WarmingEiaProcessScreen,
  WarmingEiaFlowchartScreen,
  WarmingEiaReportScreen,
  WarmingEiaBenefitsFlawsScreen,
  WarmingSummaryScreen,
} from './warming';

interface WarmingModuleProps {
  module: ModuleContent;
}

// Constant outside component — avoids recreation on every render
const WARMING_SCREEN_SELECTOR = [
  '.gh-screen-container',
  '.indicators-screen-container',
  '.causes-screen-container',
  '.effects-screen-container',
  '.vs-climate-screen-container',
  '.climate-ind-screen-container',
  '.human-health-screen-container',
  '.eia-intro-screen-container',
  '.eia-values-screen-container',
  '.eia-history-screen-container',
  '.eia-process-screen-container',
  '.eia-flowchart-screen-container',
  '.eia-report-screen-container',
  '.eia-bf-screen-container',
  '.warming-summary-screen-container',
].join(',');

export default function WarmingModuleExperience({ module: _module }: WarmingModuleProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const railListRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Scroll smoothly to any chapter section
  const scrollToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const targetId = warmingChaptersNav[index]?.id;
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.resize();
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }
  };

  // Scroll to the pinned cover → chapter-01 transition (keeps the cover rail active)
  const goToIntro = () => {
    const el = document.getElementById('warming-intro');
    if (!el) { scrollToChapter(1); return; }
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  // On mount, scroll to hash if present in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const idx = warmingChaptersNav.findIndex((c) => `#${c.id}` === hash);
      if (idx !== -1) {
        const timer = setTimeout(() => {
          scrollToChapter(idx);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Scroll tracking: center-band intersection observer + top listener
  useEffect(() => {
    const sectionIds = warmingChaptersNav.map((c) => c.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const centre = (r: DOMRect) => Math.abs(r.top + r.height * 0.35 - window.innerHeight / 2);
          const best = visible.reduce((prev, curr) =>
            centre(curr.boundingClientRect) < centre(prev.boundingClientRect) ? curr : prev
          );
          const idx = sectionIds.indexOf(best.target.id);
          if (idx !== -1) {
            setActiveChapterIndex((prev) => (prev === idx ? prev : idx));
          }
        }
      },
      { rootMargin: '-15% 0px -35% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    // Top-detection: keep cover rail active while in cover or cinematic intro transition
    const handleScroll = () => {
      const chGreenhouse = document.getElementById('ch-01-greenhouse');
      if (chGreenhouse) {
        const r = chGreenhouse.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.45 && activeChapterIndex !== 0) {
          setActiveChapterIndex(0);
        }
      } else if (window.scrollY < 180 && activeChapterIndex !== 0) {
        setActiveChapterIndex(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeChapterIndex]);

  // Auto-scroll the sidebar rail so the active chapter stays in comfortable view
  useEffect(() => {
    if (activeChapterIndex === 0) return;
    const railNav = railListRef.current;
    const activeBtn = document.getElementById(`rail-warming-item-${activeChapterIndex}`);
    if (railNav && activeBtn) {
      const railRect = railNav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const isAbove = btnRect.top < railRect.top + 20;
      const isBelow = btnRect.bottom > railRect.bottom - 20;
      if (isAbove || isBelow) {
        const offset = activeBtn.offsetTop - railNav.clientHeight / 2 + activeBtn.clientHeight / 2;
        railNav.scrollTo({ top: Math.max(0, offset), behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }
  }, [activeChapterIndex, reducedMotion]);

  // Tag all chapter <section> children with .warming-screen on mount (mirrors Bio and Land modules)
  useEffect(() => {
    const screens = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.warming-main-content > section:not(.warming-cover-section):not(.warming-intro-transition)'
      )
    );
    screens.forEach((s) => s.classList.add('warming-screen'));
  }, []);

  // ── Scroll-reveal: add .is-inview to each chapter section, pre-loading BEFORE it enters view ──
  useEffect(() => {
    const screens = Array.from(document.querySelectorAll<HTMLElement>(WARMING_SCREEN_SELECTOR));
    if (reducedMotion) {
      screens.forEach((s) => s.classList.add('is-inview'));
      return;
    }

    // Pre-reveal: positive bottom margin fires the observer 300px BEFORE the section is visible,
    // eliminating any black flash as the user scrolls into a new section.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-inview');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '300px 0px 300px 0px' }
    );
    screens.forEach((s) => io.observe(s));

    // Also immediately reveal any sections already in or near the viewport on mount
    const revealVisible = () => {
      const vh = window.innerHeight;
      screens.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top < vh + 300) s.classList.add('is-inview');
      });
    };
    revealVisible();
    // Run again after a frame to catch sections that shift position during paint
    const tid = requestAnimationFrame(revealVisible);

    return () => {
      io.disconnect();
      cancelAnimationFrame(tid);
    };
  }, [reducedMotion]);

  // ── Production-Grade Cinematic Motion & Parallax Engine: --scrub and --enter ──
  useEffect(() => {
    if (reducedMotion) return;
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.warming-screen'));
    if (!screens.length) return;

    let raf = 0;
    const count = screens.length;
    const prevScrub = new Float32Array(count).fill(-1);
    const prevEnter = new Float32Array(count).fill(-1);
    const rects: (DOMRect | null)[] = new Array(count);

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      // Phase 1: Pure DOM Reads (NO writes — zero layout thrashing)
      for (let i = 0; i < count; i++) {
        const r = screens[i].getBoundingClientRect();
        rects[i] = r.bottom < -120 || r.top > vh + 120 ? null : r;
      }

      // Phase 2: Pure DOM Writes (only update when delta exceeds threshold)
      for (let i = 0; i < count; i++) {
        const r = rects[i];
        if (!r) continue;
        const s = screens[i];

        // --scrub: 0→1 across section travel for background parallax depth
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        if (Math.abs(p - prevScrub[i]) > 0.002) {
          prevScrub[i] = p;
          s.style.setProperty('--scrub', p.toFixed(3));
        }

        // --enter: 0→1 as section glides into viewport for zone-based reveals
        let e = 1;
        if (i !== 0 && r.top > 80) {
          e = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.65)));
        }
        if (Math.abs(e - prevEnter[i]) > 0.002) {
          prevEnter[i] = e;
          s.style.setProperty('--enter', e.toFixed(3));
        }
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div className="warming-module-viewport">
      {/* ─── STICKY LEFT RAIL ─── */}
      <aside
        className="warming-left-rail"
        aria-label="Module 05 Global Warming & EIA Navigation Rail"
        data-lenis-prevent
      >
        <div className="warming-rail-track-line" />

        <AnimatePresence mode="wait" initial={false}>
          {activeChapterIndex === 0 ? (
            /* COVER SCREEN 5-MODULE RAIL */
            <motion.div
              key="warming-rail-cover"
              className="cover-rail-modules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="rail-endpoint-dot top-dot" />
              {modulesNav.map((m) => {
                const isCurrent = m.id === 'warming';
                return (
                  <Link
                    key={m.id}
                    to={m.path}
                    className={`cover-rail-module-item ${isCurrent ? 'is-active' : ''}`}
                    aria-label={`Module ${m.num} ${m.title}`}
                  >
                    <span className="cover-rail-bullet">
                      {isCurrent && <span className="cover-rail-bullet-inner" />}
                    </span>
                    <div className="cover-rail-text">
                      <span className="cover-rail-num">{m.num}</span>
                      <span className="cover-rail-title">{m.title}</span>
                    </div>
                  </Link>
                );
              })}
              <span className="rail-endpoint-dot bottom-dot" />
            </motion.div>
          ) : (
            /* CHAPTERS PROGRESS RAIL */
            <motion.nav
              key="warming-rail-chapters"
              ref={railListRef}
              className="warming-rail-list chapters-rail-list"
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-label="Module 05 Chapters List"
            >
              {warmingChaptersNav.map((item, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={item.id}
                    id={`rail-warming-item-${idx}`}
                    type="button"
                    className={`warming-rail-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => scrollToChapter(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Jump to ${item.num}: ${item.title}`}
                  >
                    <div className="warming-rail-dot-holder">
                      {isActive && <span className="warming-rail-pulse-ring" />}
                      <span className="warming-rail-dot" />
                    </div>
                    <span className="warming-rail-num">{item.num}</span>
                    <span className="warming-rail-title">{item.title}</span>
                  </button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </aside>

      {/* ─── MAIN SCROLL CONTAINER ─── */}
      <main className="warming-main-content" id="main-content">
        {/* SCREEN 01: MODULE COVER / HERO */}
        <WarmingCoverScreen
          onStart={goToIntro}
          onScrollToChapter={scrollToChapter}
        />

        {/* PINNED CINEMATIC TRANSITION: COVER → CHAPTER 01 (matching Land module pattern) */}
        <WarmingIntroTransition onEnter={() => scrollToChapter(1)} />

        {/* SCREEN 02: GLOBAL WARMING & THE GREENHOUSE EFFECT */}
        <WarmingGreenhouseScreen onScrollToNext={() => scrollToChapter(2)} />

        {/* SCREEN 03: 10 WARMING INDICATORS DASHBOARD */}
        <WarmingIndicatorsScreen />

        {/* SCREEN 04: CAUSES & DRIVERS */}
        <WarmingCausesScreen />

        {/* SCREEN 05: EFFECTS & CONSEQUENCES SCENE */}
        <WarmingEffectsScreen />

        {/* SCREEN 06: GLOBAL WARMING VS CLIMATE CHANGE */}
        <WarmingVsClimateScreen />

        {/* SCREEN 07: 8 CLIMATE CHANGE INDICATORS GLOBE */}
        <WarmingClimateIndicatorsScreen />

        {/* SCREEN 08: CLIMATE CHANGE & HUMAN HEALTH */}
        <WarmingHumanHealthScreen />

        {/* SCREEN 09: INTRODUCTION TO EIA (ACT 2 OPENER) */}
        <WarmingEiaIntroScreen />

        {/* SCREEN 10: THREE CORE VALUES OF EIA */}
        <WarmingEiaValuesScreen />

        {/* SCREEN 11: EIA BENEFITS & HISTORY */}
        <WarmingEiaHistoryScreen />

        {/* SCREEN 12: 9-PHASE INDIAN EIA PROCEDURE */}
        <WarmingEiaProcessScreen />

        {/* SCREEN 13: EIA FLOWCHART & DECISION PATH */}
        <WarmingEiaFlowchartScreen />

        {/* SCREEN 14: EIA REPORT COMPONENTS */}
        <WarmingEiaReportScreen />

        {/* SCREEN 15: EIA BENEFITS VS FLAWS */}
        <WarmingEiaBenefitsFlawsScreen />

        {/* SCREEN 16: MODULE SUMMARY & KEY LEARNINGS */}
        <WarmingSummaryScreen />

        {/* CROSS-MODULE NAVIGATION CARD STRIP */}
        <ModuleCardsStrip currentSlug="warming" />
      </main>

      {/* ─── MOBILE FLOATING CHAPTER BAR (< 1025px) ─── */}
      <MobileChapterBar
        chapters={warmingChaptersNav}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={scrollToChapter}
        accentColor="#ea580c"
        moduleName="Module 05: Global Warming & EIA"
      />
    </div>
  );
}
