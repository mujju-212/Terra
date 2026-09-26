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
import ModuleCardsStrip from '../components/ModuleCardsStrip';

interface LandModuleProps {
  module: ModuleContent;
}

// 15 chapters list matching the PRD and user specs
const landChaptersNav = [
  { id: 'cover', num: '01', title: 'Land Module Intro', fullTitle: 'Module Intro / Cover' },
  { id: 'ch-formation', num: '02', title: 'Earth Formation', fullTitle: 'Earth Formation (4.6 Bya)' },
  { id: 'ch-layers', num: '03', title: 'Earth Layers', fullTitle: 'Earth Layers Cutaway' },
  { id: 'ch-continents', num: '04', title: 'Crust & Continents', fullTitle: 'Crust & Continental Drift' },
  { id: 'ch-resource', num: '05', title: 'Land as a Resource', fullTitle: 'Land as a Resource (20%)' },
  { id: 'ch-soil', num: '06', title: 'Soil Formation', fullTitle: 'Soil Horizons & Weathering' },
  { id: 'ch-landforms', num: '07', title: 'Land Forms', fullTitle: 'Land Forms Explorer' },
  { id: 'ch-conservation', num: '08', title: 'Conservation of Land Forms', fullTitle: 'Conservation of Land Forms' },
  { id: 'ch-deforestation', num: '09', title: 'Deforestation', fullTitle: 'Deforestation & Forest Loss' },
  { id: 'ch-landuse', num: '10', title: 'Land-Use Change', fullTitle: 'Land-Use & Shire River Case Study' },
  { id: 'ch-soilhealth', num: '11', title: 'Soil Health & Composition', fullTitle: 'Soil Health & Composition' },
  { id: 'ch-degradation', num: '12', title: 'Land Degradation', fullTitle: '6 Pathways to Degradation' },
  { id: 'ch-soilconservation', num: '13', title: 'Soil Conservation', fullTitle: '8 Conservation Strategies' },
  { id: 'ch-planning', num: '14', title: 'Sustainable Land-Use Planning', fullTitle: 'Sustainable Planning & Future' },
  { id: 'ch-summary', num: '15', title: 'Module Summary', fullTitle: 'Summary & Knowledge Quiz' },
];

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
    const targetId = landChaptersNav[index]?.id;
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
    const sectionIds = landChaptersNav.map((c) => c.id);
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

  // Scroll-scrubbed parallax: expose a 0..1 --scrub variable per screen so the
  // CSS can drift each backdrop against the scroll (landing-hero style motion).
  useEffect(() => {
    if (reducedMotion) return;
    const screens = Array.from(document.querySelectorAll<HTMLElement>('.land-screen'));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      screens.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        // --scrub: 0→1 across the whole section travel (drives backdrop parallax)
        const p = (vh - r.top) / (vh + r.height);
        s.style.setProperty('--scrub', Math.min(1, Math.max(0, p)).toFixed(4));
        // --enter: 0→1 while the section top travels from viewport bottom up to
        // 40% of the viewport (drives the scroll-scrubbed content reveal)
        const e = (vh - r.top) / (vh * 0.6);
        s.style.setProperty('--enter', Math.min(1, Math.max(0, e)).toFixed(4));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  // Per-element scroll text reveal for headings / paragraphs / list items.
  // Uses the Web Animations API so it is fail-safe: an element is only hidden if
  // it starts below the fold, and its inline style is cleared the moment the
  // reveal finishes, so text can never get stuck invisible.
  useEffect(() => {
    if (reducedMotion) return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.land-screen h1, .land-screen h2, .land-screen h3, .land-screen h4, .land-screen p, .land-screen li, .land-screen blockquote'
      )
    );
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          try {
            const anim = el.animate(
              [
                { opacity: 0, transform: 'translateY(0.5em)', clipPath: 'inset(0 0 100% 0)' },
                { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 -20% 0)' },
              ],
              { duration: 720, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
            );
            anim.onfinish = () => { el.style.opacity = ''; };
          } catch {
            el.style.opacity = '';
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );

    nodes.forEach((n) => {
      // Pre-hide only what begins below the fold (keeps above-the-fold content
      // visible and avoids a flash on load).
      if (n.getBoundingClientRect().top > window.innerHeight * 0.92) {
        n.style.opacity = '0';
      }
      io.observe(n);
    });

    return () => io.disconnect();
  }, [reducedMotion]);

  // Scroll reveal for the VISUAL BLOCKS (cards, panels, tiles, stat boxes,
  // chips, figures, list items…) so every section animates in as you scroll —
  // not just its text. Innermost matches only (a container and its children
  // never both animate), siblings stagger, and fill:'backwards' keeps it
  // flash-free. Fail-safe: if animate() throws, the element simply stays put.
  useEffect(() => {
    if (reducedMotion) return;
    const tokens = ['card', 'panel', 'tile', 'stat', 'metric', 'chip', 'badge', 'node', 'step', 'figure', 'cell', 'pill', 'preview', 'item'];
    const SEL = tokens.map((t) => `.land-screen [class*="${t}"]`).join(', ');
    const all = Array.from(document.querySelectorAll<HTMLElement>(SEL));
    if (!all.length) return;
    const matched = new Set<HTMLElement>(all);
    const targets = all.filter(
      (el) => !Array.from(el.querySelectorAll('*')).some((d) => matched.has(d as HTMLElement))
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
          const idx = Math.max(siblings.indexOf(el), 0);
          const delay = Math.min(idx, 6) * 70;
          try {
            el.animate(
              [
                { opacity: 0, transform: 'translateY(32px) scale(0.955)' },
                { opacity: 1, transform: 'translateY(0) scale(1)' },
              ],
              { duration: 720, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
            );
          } catch {
            /* element simply stays visible */
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      const alreadyInView = r.top < window.innerHeight && r.bottom > 0;
      if (!alreadyInView) io.observe(el); // leave load-visible blocks untouched (no blink)
    });

    return () => io.disconnect();
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
            {landChaptersNav.map((ch, idx) => {
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

      {/* ─── MOBILE CHAPTER NAV (the left rail is hidden on small screens) ─── */}
      <nav className="land-mobile-chapternav" aria-label="Chapter navigation">
        <div className="lmn-track">
          {landChaptersNav.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              className={`lmn-item ${activeChapterIndex === idx ? 'is-active' : ''}`}
              onClick={() => scrollToChapter(idx)}
              aria-label={`Jump to ${ch.num} ${ch.title}`}
            >
              <span className="lmn-num">{ch.num}</span>
              <span className="lmn-title">{ch.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ─── MAIN SCROLL CONTAINER ─── */}
      <main className="land-screens-container">
        {/* SCREEN 01: MODULE COVER / HERO */}
        <LandCoverScreen
          onStart={goToIntro}
          onScrollToChapter={scrollToChapter}
        />

        {/* PINNED CINEMATIC TRANSITION: COVER → CHAPTER 01 (landing hero→motivation style) */}
        <LandIntroTransition onEnter={() => scrollToChapter(1)} />

        {/* SCREEN 02: EARTH FORMATION */}
        <EarthFormationScreen
          onPrev={() => scrollToChapter(0)}
          onNext={() => scrollToChapter(2)}
        />

        {/* SCREEN 03: EARTH LAYERS */}
        <EarthLayersScreen
          onPrev={() => scrollToChapter(1)}
          onNext={() => scrollToChapter(3)}
        />

        {/* SCREEN 04: CRUST & CONTINENTS */}
        <CrustContinentsScreen
          onPrev={() => scrollToChapter(2)}
          onNext={() => scrollToChapter(4)}
        />

        {/* SCREEN 05: LAND AS A RESOURCE */}
        <LandResourceScreen
          onPrev={() => scrollToChapter(3)}
          onNext={() => scrollToChapter(5)}
        />

        {/* SCREEN 06: SOIL FORMATION */}
        <SoilFormationScreen
          onPrev={() => scrollToChapter(4)}
          onNext={() => scrollToChapter(6)}
        />

        {/* SCREEN 07: LAND FORMS */}
        <LandFormsScreen
          onPrev={() => scrollToChapter(5)}
          onNext={() => scrollToChapter(7)}
        />

        {/* SCREEN 08: CONSERVATION OF LAND FORMS */}
        <ConservationScreen
          onPrev={() => scrollToChapter(6)}
          onNext={() => scrollToChapter(8)}
        />

        {/* SCREEN 09: DEFORESTATION */}
        <DeforestationScreen
          onPrev={() => scrollToChapter(7)}
          onNext={() => scrollToChapter(9)}
        />

        {/* SCREEN 10: LAND-USE CHANGE */}
        <LandUseChangeScreen
          onPrev={() => scrollToChapter(8)}
          onNext={() => scrollToChapter(10)}
        />

        {/* SCREEN 11: SOIL HEALTH & COMPOSITION */}
        <SoilHealthScreen
          onPrev={() => scrollToChapter(9)}
          onNext={() => scrollToChapter(11)}
        />

        {/* SCREEN 12: LAND DEGRADATION */}
        <LandDegradationScreen
          onPrev={() => scrollToChapter(10)}
          onNext={() => scrollToChapter(12)}
        />

        {/* SCREEN 13: SOIL CONSERVATION */}
        <SoilConservationScreen
          onPrev={() => scrollToChapter(11)}
          onNext={() => scrollToChapter(13)}
        />

        {/* SCREEN 14: SUSTAINABLE LAND-USE PLANNING */}
        <LandPlanningScreen
          onPrev={() => scrollToChapter(12)}
          onNext={() => scrollToChapter(14)}
        />

        {/* SCREEN 15: MODULE SUMMARY & QUIZ CALL TO ACTION */}
        <ModuleSummaryScreen
          onPrev={() => scrollToChapter(13)}
          onSelectChapter={(idx) => scrollToChapter(idx)}
        />

        {/* Cross-module navigation cards (jump to Water / Air / Bio / Warming) */}
        <ModuleCardsStrip currentSlug="land" />
      </main>
    </div>
  );
}
