import { useState, useEffect, useRef } from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ModuleContent } from '../content/types';
import '../bio-module.css';
import ModuleCardsStrip from '../components/ModuleCardsStrip';
import MobileChapterBar from '../components/MobileChapterBar';

import {
  bioChaptersNav,
  modulesNav,
  BioCoverScreen,
  BioIntroTransition,
  BioIntroScreen,
  BioLevelsScreen,
  BioValuesScreen,
  BioThreatsScreen,
  BioConservationScreen,
  BioEcosystemScreen,
  BioTypesScreen,
  BioSignificanceScreen,
  BioEconomicScreen,
  BioSummaryScreen,
} from './bio';

interface BioModuleProps {
  module: ModuleContent;
}

export default function BioModuleExperience({ module }: BioModuleProps) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const railListRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Scroll smoothly to any chapter section
  const scrollToChapter = (index: number) => {
    setActiveChapterIndex(index);
    const targetId = bioChaptersNav[index]?.id;
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

  // Scroll to pinned intro transition (keeps cover rail active), mirrors Land, Water & Air
  const goToIntro = () => {
    const el = document.getElementById('bio-intro');
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
      const idx = bioChaptersNav.findIndex((c) => `#${c.id}` === hash);
      if (idx !== -1) {
        const timer = setTimeout(() => {
          scrollToChapter(idx);
        }, 350);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Scroll tracking: center-band intersection observer + top listener
  useEffect(() => {
    const sectionIds = bioChaptersNav.map((c) => c.id);
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

    // Top-detection: keep cover rail active while in cover or transition above ch-intro-bio
    const handleScroll = () => {
      const chIntro = document.getElementById('ch-intro-bio');
      if (chIntro) {
        const r = chIntro.getBoundingClientRect();
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
    const railNav = railListRef.current || (document.querySelector('.bio-rail-list') as HTMLElement | null);
    const activeBtn = document.getElementById(`rail-bio-item-${activeChapterIndex}`);
    if (railNav && activeBtn) {
      const railRect = railNav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const isAbove = btnRect.top < railRect.top + 20;
      const isBelow = btnRect.bottom > railRect.bottom - 20;

      if (isAbove || isBelow) {
        const offset = activeBtn.offsetTop - railNav.clientHeight / 2 + activeBtn.clientHeight / 2;
        railNav.scrollTo({
          top: Math.max(0, offset),
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    }
  }, [activeChapterIndex, reducedMotion]);

  // ─── CINEMATIC MOTION SYSTEM (Mirrors Module 01 Land, Module 02 Water & Module 03 Air) ───

  // Step A: Tag all chapter <section> children with .bio-screen on mount (excluding cover and intro transition)
  useEffect(() => {
    const screens = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.bio-main-content > section:not(.bio-cover-section):not(.bio-intro-transition)'
      )
    );
    screens.forEach((s) => s.classList.add('bio-screen'));
  }, []);

  // Step B: Reveal-on-enter — add .is-inview once each screen scrolls into view
  useEffect(() => {
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.bio-screen'));
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
      { threshold: 0, rootMargin: '50px 0px -5% 0px' }
    );
    screens.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [reducedMotion]);

  // Step C: Production-Grade Parallax Engine — batched reads & writes, cached DOM references
  useEffect(() => {
    if (reducedMotion) return;
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.bio-screen'));
    if (!screens.length) return;

    let raf = 0;
    const count = screens.length;
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

        // --scrub: 0→1 across section travel
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        if (Math.abs(p - prevScrub[i]) > 0.002) {
          prevScrub[i] = p;
          s.style.setProperty('--scrub', p.toFixed(3));
        }

        // --enter: 0→1 as section enters viewport
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
    <div className="bio-module-viewport">
      {/* ─── STICKY LEFT RAIL (Matches Land, Water & Air Experience) ─── */}
      <aside
        className="bio-left-rail"
        aria-label="Module 04 Biodiversity Navigation Rail"
        data-lenis-prevent
      >
        <div className="bio-rail-track-line" />

        <AnimatePresence mode="wait" initial={false}>
          {activeChapterIndex === 0 ? (
            /* COVER SCREEN 5-MODULE RAIL (Matches Land, Water & Air Experience) */
            <motion.div
              key="bio-rail-cover"
              className="cover-rail-modules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="rail-endpoint-dot top-dot" />
              {modulesNav.map((m) => {
                const isCurrent = m.id === 'bio';
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
            /* CHAPTERS PROGRESS RAIL (When scrolling inside the chapters) */
            <motion.nav
              key="bio-rail-chapters"
              ref={railListRef}
              className="bio-rail-list chapters-rail-list"
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-label="Chapters List"
            >
              {bioChaptersNav.map((item, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={item.id}
                    id={`rail-bio-item-${idx}`}
                    type="button"
                    className={`bio-rail-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => scrollToChapter(idx)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Jump to step ${item.num}: ${item.title}`}
                  >
                    <div className="bio-rail-dot-holder">
                      {isActive && <span className="bio-rail-pulse-ring" />}
                      <span className="bio-rail-dot" />
                    </div>
                    <span className="bio-rail-num">{item.num}</span>
                    <span className="bio-rail-title">{item.title}</span>
                  </button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="bio-main-content" id="main-content">
        {/* SCREEN 01: MODULE COVER & HERO (EXACT MATCH FOR IMAGE 1) */}
        <BioCoverScreen
          onStart={goToIntro}
          onScrollToChapter={scrollToChapter}
        />

        {/* PINNED CINEMATIC TRANSITION: COVER → CHAPTER 01 (mirrors Land, Water & Air) */}
        <BioIntroTransition onEnter={() => scrollToChapter(1)} />

        {/* SCREEN 02: BIODIVERSITY INTRODUCTION */}
        <BioIntroScreen />

        {/* SCREEN 03: LEVELS OF BIODIVERSITY */}
        <BioLevelsScreen />

        {/* SCREEN 04: VALUES OF BIODIVERSITY */}
        <BioValuesScreen />

        {/* SCREEN 05: THREATS TO BIODIVERSITY */}
        <BioThreatsScreen />

        {/* SCREEN 06: CONSERVATION */}
        <BioConservationScreen />

        {/* SCREEN 07: ECOSYSTEM */}
        <BioEcosystemScreen />

        {/* SCREEN 08: TYPES OF ECOSYSTEMS */}
        <BioTypesScreen />

        {/* SCREEN 09: SIGNIFICANCE */}
        <BioSignificanceScreen />

        {/* SCREEN 10: ECONOMIC VALUES */}
        <BioEconomicScreen />

        {/* SCREEN 11: MODULE SUMMARY */}
        <BioSummaryScreen module={module} />

        {/* CROSS-MODULE NAVIGATION CARD STRIP */}
        <ModuleCardsStrip currentSlug="biodiversity" />
      </main>

      {/* ─── MOBILE FLOATING CHAPTER BAR (< 1025px) ─── */}
      <MobileChapterBar
        chapters={bioChaptersNav}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={scrollToChapter}
        accentColor="#4ade80"
        moduleName="Module 04: Biodiversity"
      />
    </div>
  );
}
