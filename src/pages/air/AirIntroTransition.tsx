import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AirIntroTransitionProps {
  onEnter: () => void;
}

/**
 * Pinned cinematic bridge between the Air cover screen and Chapter 01
 * (Introduction to Air).
 * Seamless continuous cross-dissolve with zero dip-to-black:
 *   – Layer B (High-altitude alpine atmosphere canvas) forms the solid foundation underneath.
 *   – Layer A (Glowing Earth orbital atmosphere) zooms smoothly and dissolves away to unveil Layer B.
 *   – Combined visual presence is always 100% across the entire scroll.
 *   – Chapter 01 title card glides into place with a subtle settle.
 */
export default function AirIntroTransition({ onEnter }: AirIntroTransitionProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = false;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Layer A (Cover): zooms and dissolves away to reveal Layer B underneath
  const coverBgScale       = useTransform(scrollYProgress, [0, 0.75], [1, 1.85]);
  const coverLayerOpacity  = useTransform(scrollYProgress, [0.15, 0.65], [1, 0]);
  const coverCopyOpacity   = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const coverCopyY         = useTransform(scrollYProgress, [0, 0.28], [0, -32]);

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
        className="air-intro-transition is-reduced"
        id="air-intro"
        aria-label="Chapter 01 introduction"
      >
        <div className="aintro-static">
          <span className="aintro-chapter-num">CHAPTER 01</span>
          <h2 className="aintro-chapter-title">
            Introduction to <em>Air</em>
          </h2>
          <p className="aintro-chapter-lead">
            The invisible shield that sustains life — explore the composition,
            layers, and life-giving properties of Earth's atmosphere.
          </p>
          <button type="button" className="aintro-enter-btn" onClick={onEnter}>
            Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="air-intro-transition"
      id="air-intro"
      ref={wrapRef}
      aria-label="Chapter 01 introduction"
    >
      <div className="aintro-sticky">

        {/* ── Layer B: Foundation underneath (Chapter 01 Alpine Clouds & Atmosphere) ── */}
        <div className="aintro-chapter-layer">
          <motion.div
            className="aintro-chapter-bg"
            style={{
              scale: chapterBgScale,
              backgroundImage: `url('/images/air-intro-alps-bg.jpg')`,
            }}
          />
          <div className="aintro-chapter-vignette" />
          <motion.div
            className="aintro-chapter-copy"
            style={{
              opacity: chapterCopyOpacity,
              y: chapterCopyY,
            }}
          >
            <span className="aintro-chapter-num">CHAPTER 01</span>
            <h2 className="aintro-chapter-title">
              Introduction to <em>Air</em>
            </h2>
            <p className="aintro-chapter-lead">
              The invisible shield that sustains life — explore the composition,
              layers, and life-giving properties of Earth's atmosphere.
            </p>
            <button type="button" className="aintro-enter-btn" onClick={onEnter}>
              Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </motion.div>
        </div>

        {/* ── Layer A: Cover earth-bg dissolving away on top ── */}
        <motion.div
          className="aintro-cover-layer"
          style={{ opacity: coverLayerOpacity }}
        >
          <motion.div
            className="aintro-cover-bg"
            style={{
              scale: coverBgScale,
              backgroundImage: `url('/images/air-hero-earth-bg.jpg')`,
            }}
          />
          <div className="aintro-cover-vignette" />
          <motion.div
            className="aintro-cover-copy"
            style={{
              opacity: coverCopyOpacity,
              y: coverCopyY,
            }}
          >
            <span className="aintro-mod-tag">MODULE 03</span>
            <h2 className="aintro-grand">AIR</h2>
            <p className="aintro-sub">The thin shell we breathe.</p>
          </motion.div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div className="aintro-scroll-hint" style={{ opacity: hintOpacity }}>
          SCROLL <span className="aintro-hint-arrow">↓</span>
        </motion.div>

      </div>
    </section>
  );
}
