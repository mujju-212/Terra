import { useState, useEffect, useRef } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ModuleContent } from '../content/types';
import '../water-module.css';
import ModuleCardsStrip from '../components/ModuleCardsStrip';
import MobileChapterBar from '../components/MobileChapterBar';

import {
  waterChaptersNav,
  WaterCoverScreen,
  WaterIntroTransition,
  HydrologicalCycleScreen,
  WaterSourcesScreen,
  GlobalWaterScreen,
  RiversIndiaScreen,
  WaterUsesScreen,
  WaterConservationScreen,
  InterBasinTransferScreen,
  RiverInterlinkingScreen,
  GroundwaterScreen,
  GroundwaterPotentialScreen,
  ConjunctiveUseScreen,
  GroundwaterManagementScreen,
  GroundwaterDepletionScreen,
  GroundwaterContaminationScreen,
  GroundwaterRechargeScreen,
  SeawaterIngressScreen,
  WaterSummaryScreen,
} from './water';

// Re-export waterChaptersNav so any existing imports remain fully backwards-compatible
export { waterChaptersNav } from './water';

// 5 Modules List for Cover Rail (Matches Module 01 Cover Experience)
const modulesNav = [
  { id: 'land', num: '01', title: 'Land', path: '/module/land' },
  { id: 'water', num: '02', title: 'Water', path: '/module/water' },
  { id: 'air', num: '03', title: 'Air', path: '/module/air' },
  { id: 'bio', num: '04', title: 'Biodiversity', path: '/module/biodiversity' },
  { id: 'warming', num: '05', title: 'Global Warming', path: '/module/warming' },
];

interface WaterModuleProps {
  module: ModuleContent;
}

export default function WaterModuleExperience({ module }: WaterModuleProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const railListRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Scroll smoothly to any section
  const scrollToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const targetId = waterChaptersNav[index]?.id;
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.resize();
        window.__lenis.scrollTo(el.offsetTop, { duration: 1.2 });
      } else {
        window.scrollTo({ top: el.offsetTop, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  // Scroll to the pinned intro transition (keeps cover rail active), mirrors Land's goToIntro
  const goToIntro = () => {
    const el = document.getElementById('water-intro');
    if (!el) { scrollToChapter(1); return; }
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Scroll directly to Chapter 01 (Hydrological Cycle) from the intro transition CTA
  const handleStart = () => {
    goToIntro();
  };

  // Scroll tracking: center-band intersection observer + scroll listener
  useEffect(() => {
    const sectionIds = waterChaptersNav.map((c) => c.id);
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

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

    // Instant top-detection when user scrolls back to the very top (cover screen)
    const handleScroll = () => {
      if (window.scrollY < 180 && activeChapterIndex !== 0) {
        setActiveChapterIndex(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeChapterIndex]);

  // Auto-scroll the sidebar rail so the active chapter is always centered in view
  useEffect(() => {
    if (activeChapterIndex === 0) return;
    const railNav = railListRef.current || (document.querySelector('.water-rail-list') as HTMLElement | null);
    const activeBtn = document.getElementById(`rail-water-item-${activeChapterIndex}`) as HTMLElement | null;
    if (railNav && activeBtn) {
      const railRect = railNav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const isAbove = btnRect.top < railRect.top + 20;
      const isBelow = btnRect.bottom > railRect.bottom - 20;

      if (isAbove || isBelow) {
        const offset = activeBtn.offsetTop - (railNav.clientHeight / 2) + (activeBtn.clientHeight / 2);
        railNav.scrollTo({
          top: Math.max(0, offset),
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  }, [activeChapterIndex, reducedMotion]);

  // ─── WORLD-CLASS CINEMATIC MOTION SYSTEM (Mirrors Module 01 Land exactly) ───
  // Step A: Tag all chapter <section> children with .water-screen on mount (excluding cover and intro transition)
  useEffect(() => {
    const screens = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.water-main-content > section:not(.water-cover-section):not(.water-intro-transition)'
      )
    );
    screens.forEach((s) => s.classList.add('water-screen'));
  }, []);

  // Step B: Reveal-on-enter — add .is-inview once each screen scrolls into view (CSS-driven)
  useEffect(() => {
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.water-screen'));
    if (reducedMotion) {
      screens.forEach((s) => s.classList.add('is-inview'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-inview');
            io.unobserve(e.target); // fire-once, never re-hide
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    screens.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [reducedMotion]);

  // 1. Production-Grade Parallax Engine: batched reads & writes, cached DOM references, zero layout thrashing
  useEffect(() => {
    if (reducedMotion) return;
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.water-screen'));
    if (!screens.length) return;

    let raf = 0;
    const count = screens.length;
    // Cache previous values to prevent redundant CSSOM writes
    const prevScrub = new Float32Array(count).fill(-1);
    const prevEnter = new Float32Array(count).fill(-1);
    const rects: (DOMRect | null)[] = new Array(count);

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      // Phase 1: Pure DOM Reads (NO style writes — zero layout thrashing)
      for (let i = 0; i < count; i++) {
        const r = screens[i].getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) {
          rects[i] = null;
        } else {
          rects[i] = r;
        }
      }

      // Phase 2: Pure DOM Writes (only update when delta exceeds threshold)
      for (let i = 0; i < count; i++) {
        const r = rects[i];
        if (!r) continue;
        const s = screens[i];

        // --scrub: 0→1 across section travel (drives backdrop parallax drift)
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        if (Math.abs(p - prevScrub[i]) > 0.002) {
          prevScrub[i] = p;
          s.style.setProperty('--scrub', p.toFixed(3));
        }

        // --enter: 0→1 as section enters viewport (drives smooth entrance slide & scale)
        let e = 1;
        if (i !== 0 && r.top > 80) {
          e = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.6)));
        }
        if (Math.abs(e - prevEnter[i]) > 0.002) {
          prevEnter[i] = e;
          s.style.setProperty('--enter', e.toFixed(3));
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

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
    <div className="water-module-viewport">
      {/* ─── STICKY LEFT RAIL ─── */}
      <aside
        className="water-left-rail"
        aria-label="Module 02 Water Navigation"
        data-lenis-prevent
      >
        <div className="water-rail-track-line" />

        <AnimatePresence mode="wait" initial={false}>
          {activeChapterIndex === 0 ? (
            /* COVER SCREEN 5-MODULE RAIL (Matches Module 01 Cover Experience) */
            <motion.div
              key="water-rail-cover"
              className="cover-rail-modules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="rail-endpoint-dot top-dot" />
              {modulesNav.map((m) => {
                const isCurrent = m.id === 'water';
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
            /* CHAPTERS PROGRESS RAIL (When scrolling inside the 18 chapters) */
            <motion.nav
              key="water-rail-chapters"
              ref={railListRef}
              className="water-rail-list chapters-rail-list"
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.nav>
          )}
        </AnimatePresence>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="water-main-content" id="main-content">
        {/* SCREEN 01: MODULE COVER & HERO */}
        <WaterCoverScreen
          onStart={handleStart}
          onScrollToChapter={scrollToChapter}
        />

        {/* PINNED CINEMATIC TRANSITION: COVER → CHAPTER 01 (mirrors LandIntroTransition) */}
        <WaterIntroTransition onEnter={() => scrollToChapter(1)} />

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

        {/* SCREEN 08: INTER-BASIN WATER TRANSFER */}
        <InterBasinTransferScreen />

        {/* SCREEN 09: INTERLINKING OF RIVERS */}
        <RiverInterlinkingScreen />

        {/* SCREEN 10: GROUNDWATER */}
        <GroundwaterScreen />

        {/* SCREEN 11: GROUNDWATER POTENTIAL IN INDIA */}
        <GroundwaterPotentialScreen />

        {/* SCREEN 12: CONJUNCTIVE USE OF WATER */}
        <ConjunctiveUseScreen />

        {/* SCREEN 13: GROUNDWATER MANAGEMENT */}
        <GroundwaterManagementScreen />

        {/* SCREEN 14: GROUNDWATER DEPLETION */}
        <GroundwaterDepletionScreen />

        {/* SCREEN 15: GROUNDWATER CONTAMINATION (ch-14) */}
        <GroundwaterContaminationScreen />

        {/* SCREEN 16: GROUNDWATER RECHARGE (ch-15) */}
        <GroundwaterRechargeScreen />

        {/* SCREEN 17: SEAWATER INGRESS (ch-16) */}
        <SeawaterIngressScreen />

        {/* CHAPTER 18 / SUMMARY & RECAP */}
        <WaterSummaryScreen module={module} />

        {/* CROSS-MODULE NAVIGATION CARD STRIP */}
        <ModuleCardsStrip currentSlug="water" />
      </main>

      {/* ─── MOBILE FLOATING CHAPTER BAR (< 1025px) ─── */}
      <MobileChapterBar
        chapters={waterChaptersNav}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={scrollToChapter}
        accentColor="#4fa3c7"
        moduleName="Module 02: Water"
      />
    </div>
  );
}
