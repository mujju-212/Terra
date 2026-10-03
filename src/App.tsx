import { lazy, Suspense, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import Lenis from 'lenis';
import { moduleBySlug } from './content';
import SiteNav from './components/SiteNav';
import { CustomCursor, GrainOverlay, ScrollProgress } from './components/GlobalUI';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const Landing = lazy(() => import('./pages/Landing'));
const ModulePage = lazy(() => import('./pages/ModulePage'));
const ModulesIndex = lazy(() => import('./pages/ModulesIndex'));
const Quiz = lazy(() => import('./pages/Quiz'));
const About = lazy(() => import('./pages/About'));
const Resources = lazy(() => import('./pages/Resources'));

function RouteModule() {
  const { slug = '' } = useParams();
  const module = moduleBySlug[slug];
  if (!module) return <NotFound />;
  return <ModulePage module={module} />;
}

function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">404 · FIELD NOTE MISSING</p>
      <h1>This page is off the map.</h1>
      <a className="button button-primary" href="/">
        Return to the field guide
      </a>
    </main>
  );
}

/**
 * Global Lenis Smooth Scroll Engine
 * Delivers buttery, 60fps inertia scrolling across the entire landing page and app.
 */
function SmoothScrollManager() {
  const reducedMotion = useReducedMotion();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (reducedMotion) {
      if (window.__lenis) {
        window.__lenis.destroy();
        window.__lenis = undefined;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.25,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global anchor link smooth scroll listener
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.getElementById(href.slice(1));
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -24, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reducedMotion]);

  // Route & Hash changes sync
  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      let attempts = 0;
      let timer = 0;
      const scrollWhenReady = () => {
        const target = document.getElementById(targetId);
        if (target) {
          if (window.__lenis) {
            window.__lenis.scrollTo(target, { offset: -24, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
          }
          return;
        }
        if (attempts < 20) {
          attempts += 1;
          timer = window.setTimeout(scrollWhenReady, 50);
        }
      };
      timer = window.setTimeout(scrollWhenReady, 0);
      return () => window.clearTimeout(timer);
    }

    // New route navigation without hash -> scroll to top
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash, reducedMotion]);

  return null;
}

function Loading() {
  return (
    <div className="route-loading" aria-live="polite">
      <span className="loading-orbit" />
      <span>Preparing the field guide…</span>
    </div>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const location = useLocation();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollProgress />
      <SmoothScrollManager />
      <SiteNav />
      <Suspense fallback={<Loading />}>
        {/* Subtle cross-route fade keyed on pathname (hash changes don't retrigger). */}
        <motion.div
          key={location.pathname}
          className="route-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/modules" element={<ModulesIndex />} />
            <Route path="/module" element={<ModulesIndex />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/module/:slug" element={<RouteModule />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </Suspense>
      <GrainOverlay />
      <CustomCursor />
    </>
  );
}

