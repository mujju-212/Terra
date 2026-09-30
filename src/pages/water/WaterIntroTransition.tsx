import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface WaterIntroTransitionProps {
  onEnter: () => void;
}

/**
 * Pinned cinematic bridge between the Water cover screen and Chapter 01
 * (Hydrological Cycle).
 * Seamless continuous cross-dissolve with zero dip-to-black:
 *   – Layer B (Hydrological Cycle master canvas) forms the solid foundation underneath.
 *   – Layer A (Water Cover alpine lake) zooms smoothly and dissolves away to unveil Layer B.
 *   – Combined visual presence is always 100% across the entire scroll.
 *   – Chapter 01 title card glides into place with a subtle settle.
 */
export default function WaterIntroTransition({ onEnter }: WaterIntroTransitionProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Layer A (Cover): zooms and dissolves away to reveal Layer B underneath
  const coverBgScale      = useTransform(scrollYProgress, [0, 0.75], [1, 1.85]);
  const coverLayerOpacity = useTransform(scrollYProgress, [0.15, 0.65], [1, 0]);
  const coverCopyOpacity  = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const coverCopyY        = useTransform(scrollYProgress, [0, 0.28], [0, -32]);

  // Layer B (Chapter 01): gentle zoom settle & copy entrance
  const chapterBgScale     = useTransform(scrollYProgress, [0.15, 0.8], [1.14, 1]);
  const chapterCopyOpacity = useTransform(scrollYProgress, [0.35, 0.72], [0, 1]);
  const chapterCopyY       = useTransform(scrollYProgress, [0.35, 0.72], [32, 0]);

  // Scroll cue fades out early
  const hintOpacity        = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Reduced motion: static Chapter 01 card, no pinning
  if (reduced) {
    return (
      <section
        className="water-intro-transition is-reduced"
        id="water-intro"
        aria-label="Chapter 01 introduction"
      >
        <div className="wintro-static">
          <span className="wintro-chapter-num">CHAPTER 01</span>
          <h2 className="wintro-chapter-title">
            The Hydrological <em>Cycle</em>
          </h2>
          <p className="wintro-chapter-lead">
            Water's eternal journey — from ocean to cloud, from rain to river,
            and back again. Trace the cycle that makes life possible.
          </p>
          <button type="button" className="wintro-enter-btn" onClick={onEnter}>
            Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="water-intro-transition"
      id="water-intro"
      ref={wrapRef}
      aria-label="Chapter 01 introduction"
    >
      <div className="wintro-sticky">

        {/* ── Layer B: Foundation underneath (Chapter 01 Hydrological Cycle landscape) ── */}
        <div className="wintro-chapter-layer">
          <motion.div
            className="wintro-chapter-bg"
            style={{
              scale: chapterBgScale,
              backgroundImage: `url('/images/water-ch01-cycle-master.jpg')`,
            }}
          />
          <div className="wintro-chapter-vignette" />
          <motion.div
            className="wintro-chapter-copy"
            style={{
              opacity: chapterCopyOpacity,
              y: chapterCopyY,
            }}
          >
            <span className="wintro-chapter-num">CHAPTER 01</span>
            <h2 className="wintro-chapter-title">
              The Hydrological <em>Cycle</em>
            </h2>
            <p className="wintro-chapter-lead">
              Water's eternal journey — from ocean to cloud, from rain to river,
              and back again. Trace the cycle that makes life possible.
            </p>
            <button type="button" className="wintro-enter-btn" onClick={onEnter}>
              Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </motion.div>
        </div>

        {/* ── Layer A: Cover landscape dissolving away on top ── */}
        <motion.div
          className="wintro-cover-layer"
          style={{ opacity: coverLayerOpacity }}
        >
          <motion.div
            className="wintro-cover-bg"
            style={{
              scale: coverBgScale,
              backgroundImage: `url('/images/water-cover-pristine-hd.jpg')`,
            }}
          />
          <div className="wintro-cover-vignette" />
          <motion.div
            className="wintro-cover-copy"
            style={{
              opacity: coverCopyOpacity,
              y: coverCopyY,
            }}
          >
            <span className="wintro-mod-tag">MODULE 02</span>
            <h2 className="wintro-grand">WATER</h2>
            <p className="wintro-sub">The cradle of life.</p>
          </motion.div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div className="wintro-scroll-hint" style={{ opacity: hintOpacity }}>
          SCROLL <span className="wintro-hint-arrow">↓</span>
        </motion.div>

      </div>
    </section>
  );
}
