import { useState, useEffect } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ModuleContent } from '../content/types';
import '../deforestation.css';
import '../landuse.css';
import '../soilhealth.css';
import '../degradation.css';
import '../soilconservation.css';
import '../landplanning.css';
import '../modulesummary.css';

import {
  LandCoverScreen,
  EarthFormationScreen,
  EarthLayersScreen,
  CrustContinentsScreen,
  LandResourceScreen,
  SoilFormationScreen,
  LandFormsScreen,
  ConservationScreen,
  DeforestationScreen,
  LandUseChangeScreen,
  SoilHealthScreen,
  LandDegradationScreen,
  SoilConservationScreen,
  LandPlanningScreen,
  ModuleSummaryScreen,
} from './land';
import LandIntroTransition from './land/LandIntroTransition';
import { LAND_CHAPTERS } from './land/helpers/chapters';
import ModuleCardsStrip from '../components/ModuleCardsStrip';
import MobileChapterBar from '../components/MobileChapterBar';
import LazyScreen from '../components/LazyScreen';
import { prefetchModule } from '../utils/assetPrefetcher';

interface LandModuleProps {
  module: ModuleContent;
}

// 5 Modules List for Cover Rail (media_1790680046348.jpg)
const modulesNav = [
  { id: 'land', num: '01', title: 'Land', path: '/module/land', active: true },
  { id: 'water', num: '02', title: 'Water', path: '/module/water', active: false },
  { id: 'air', num: '03', title: 'Air', path: '/module/air', active: false },
  { id: 'bio', num: '04', title: 'Biodiversity', path: '/module/biodiversity', active: false },
  { id: 'warming', num: '05', title: 'Global Warming', path: '/module/warming', active: false },
];

export default function LandModuleExperience({ module: _module }: LandModuleProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  // Scroll smoothly to any section
  const scrollToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const targetId = LAND_CHAPTERS[index]?.id;
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

  // Scroll to the pinned cover→chapter-01 transition (keeps the cover rail active)
  const goToIntro = () => {
    const el = document.getElementById('land-intro');
    if (!el) { scrollToChapter(1); return; }
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Track the active chapter using a center-band (robust even for very tall
  // sections, which a fixed 0.25 threshold could never satisfy).
  useEffect(() => {
    const sectionIds = LAND_CHAPTERS.map((c) => c.id);
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // pick the section whose centre is closest to the viewport centre
          const centre = (r: DOMRect) => Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
          const best = visible.reduce((prev, curr) =>
            centre(curr.boundingClientRect) < centre(prev.boundingClientRect) ? curr : prev
          );
          const idx = sectionIds.indexOf(best.target.id);
          if (idx !== -1) setActiveChapterIndex(idx);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Reveal-on-enter: add .is-inview to each screen once it scrolls into view so
  // its content fades/rises in (CSS-driven). Under reduced motion, reveal all.
  useEffect(() => {
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.land-screen'));
    if (reducedMotion) {
      screens.forEach((s) => s.classList.add('is-inview'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-inview');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    screens.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [reducedMotion]);

  // Production-Grade Parallax Engine: batched reads & writes, cached DOM references, zero layout thrashing
  useEffect(() => {
    if (reducedMotion) return;
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.land-screen'));
    if (!screens.length) return;

    let raf = 0;
    const count = screens.length;
    const prevScrub = new Float32Array(count).fill(-1);
    const rects: (DOMRect | null)[] = new Array(count);

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      // Phase 1: Pure DOM Reads (NO writes — zero layout thrashing)
      for (let i = 0; i < count; i++) {
        const r = screens[i].getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= vh) {
          rects[i] = null;
        } else {
          rects[i] = r;
        }
      }

      // Phase 2: Pure DOM Writes (only update when delta exceeds threshold)
      for (let i = 0; i < count; i++) {
        const r = rects[i];
        if (!r) continue;
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        if (Math.abs(p - prevScrub[i]) > 0.002) {
          prevScrub[i] = p;
          screens[i].style.setProperty('--scrub', p.toFixed(3));
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

  // Auto-scroll the sidebar rail so the active chapter is always in view
  useEffect(() => {
    const activeBtn = document.getElementById(`rail-chapter-item-${activeChapterIndex}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, [activeChapterIndex, reducedMotion]);

  return (
    <div className="land-module-viewport">
      {/* ─── STICKY LEFT RAIL ─── */}
      <aside className="land-left-rail" aria-label="Module Navigation">
        <div className="rail-vertical-line" />

        <AnimatePresence mode="wait" initial={false}>
        {activeChapterIndex === 0 ? (
          /* COVER SCREEN 5-MODULE RAIL (Exact Match to media_1790680046348.jpg) */
          <motion.div
            key="rail-cover"
            className="cover-rail-modules"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="rail-endpoint-dot top-dot" />
            {modulesNav.map((m) => {
              const isCurrent = m.id === 'land';
              return (
                <Link
                  key={m.id}
                  to={m.path}
                  className={`cover-rail-module-item ${isCurrent ? 'is-active' : ''}`}
                  aria-label={`Module ${m.num} ${m.title}`}
                  onMouseEnter={() => prefetchModule(m.id)}
                  onFocus={() => prefetchModule(m.id)}
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
          /* CHAPTERS PROGRESS RAIL (When scrolling inside the 15 chapters) */
          <motion.div
            key="rail-chapters"
            className="rail-items-list chapters-rail-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {LAND_CHAPTERS.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.id}
                  id={`rail-chapter-item-${idx}`}
                  type="button"
                  className={`rail-step-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => scrollToChapter(idx)}
                  aria-label={`Jump to ${ch.num} ${ch.title}`}
                >
                  <span className="rail-bullet">
                    <span className="rail-bullet-inner" />
                  </span>
                  <div className="rail-text-col">
                    <span className="rail-num">{ch.num}</span>
                    <span className="rail-title">{ch.title}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
        </AnimatePresence>
      </aside>

      {/* ─── MAIN SCROLL CONTAINER ─── */}
      <main className="land-screens-container">
        {/* SCREEN 01: MODULE COVER / HERO */}
        <LandCoverScreen
          onStart={goToIntro}
          onScrollToChapter={scrollToChapter}
        />

        {/* PINNED CINEMATIC TRANSITION: COVER → CHAPTER 01 (landing hero→motivation style) */}
        <LandIntroTransition onEnter={() => scrollToChapter(1)} />

        {/* SCREEN 02: EARTH FORMATION (Always eager for instant entry) */}
        <EarthFormationScreen
          onPrev={() => scrollToChapter(0)}
          onNext={() => scrollToChapter(2)}
          onJumpChapter={scrollToChapter}
        />

        {/* SCREEN 03: EARTH LAYERS */}
        <LazyScreen id="ch-layers">
          <EarthLayersScreen
            onPrev={() => scrollToChapter(1)}
            onNext={() => scrollToChapter(3)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 04: CRUST & CONTINENTS */}
        <LazyScreen id="ch-continents">
          <CrustContinentsScreen
            onPrev={() => scrollToChapter(2)}
            onNext={() => scrollToChapter(4)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 05: LAND AS A RESOURCE */}
        <LazyScreen id="ch-resource">
          <LandResourceScreen
            onPrev={() => scrollToChapter(3)}
            onNext={() => scrollToChapter(5)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 06: SOIL FORMATION */}
        <LazyScreen id="ch-soil">
          <SoilFormationScreen
            onPrev={() => scrollToChapter(4)}
            onNext={() => scrollToChapter(6)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 07: LAND FORMS */}
        <LazyScreen id="ch-landforms">
          <LandFormsScreen
            onPrev={() => scrollToChapter(5)}
            onNext={() => scrollToChapter(7)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 08: CONSERVATION OF LAND FORMS */}
        <LazyScreen id="ch-conservation">
          <ConservationScreen
            onPrev={() => scrollToChapter(6)}
            onNext={() => scrollToChapter(8)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 09: DEFORESTATION */}
        <LazyScreen id="ch-deforestation">
          <DeforestationScreen
            onPrev={() => scrollToChapter(7)}
            onNext={() => scrollToChapter(9)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 10: LAND-USE CHANGE */}
        <LazyScreen id="ch-landuse">
          <LandUseChangeScreen
            onPrev={() => scrollToChapter(8)}
            onNext={() => scrollToChapter(10)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 11: SOIL HEALTH & COMPOSITION */}
        <LazyScreen id="ch-soilhealth">
          <SoilHealthScreen
            onPrev={() => scrollToChapter(9)}
            onNext={() => scrollToChapter(11)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 12: LAND DEGRADATION */}
        <LazyScreen id="ch-degradation">
          <LandDegradationScreen
            onPrev={() => scrollToChapter(10)}
            onNext={() => scrollToChapter(12)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 13: SOIL CONSERVATION */}
        <LazyScreen id="ch-soilconservation">
          <SoilConservationScreen
            onPrev={() => scrollToChapter(11)}
            onNext={() => scrollToChapter(13)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 14: SUSTAINABLE LAND-USE PLANNING */}
        <LazyScreen id="ch-planning">
          <LandPlanningScreen
            onPrev={() => scrollToChapter(12)}
            onNext={() => scrollToChapter(14)}
            onJumpChapter={scrollToChapter}
          />
        </LazyScreen>

        {/* SCREEN 15: MODULE SUMMARY & QUIZ CALL TO ACTION */}
        <LazyScreen id="ch-summary">
          <ModuleSummaryScreen
            onPrev={() => scrollToChapter(13)}
            onSelectChapter={(idx) => scrollToChapter(idx)}
          />
        </LazyScreen>

        {/* Cross-module navigation cards (jump to Water / Air / Bio / Warming) */}
        <ModuleCardsStrip currentSlug="land" />
      </main>

      {/* ─── MOBILE FLOATING CHAPTER BAR (< 1025px) ─── */}
      <MobileChapterBar
        chapters={LAND_CHAPTERS}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={scrollToChapter}
        accentColor="#deb87a"
        moduleName="Module 01: Land"
      />
    </div>
  );
}
