import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BioIntroTransitionProps {
  onEnter: () => void;
}

/**
 * Pinned cinematic bridge between the Biodiversity cover screen and Chapter 01
 * (Introduction to Biodiversity).
 * Seamless continuous cross-dissolve with zero dip-to-black:
 *   – Layer B (Lush rainforest understory & flora canopy) forms the solid foundation underneath.
 *   – Layer A (Epic Tree of Life living canopy panorama) zooms smoothly and dissolves away to unveil Layer B.
 *   – Combined visual presence is always 100% across the entire scroll.
 *   – Chapter 01 title card glides into place with a subtle settle.
 * Mirrors LandIntroTransition, WaterIntroTransition & AirIntroTransition exactly.
 */
export default function BioIntroTransition({ onEnter }: BioIntroTransitionProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = false;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Layer A (Cover): zooms and dissolves away to reveal Layer B underneath
  const coverBgScale       = useTransform(scrollYProgress, [0, 0.75], [1, 1.45]);
  const coverLayerOpacity  = useTransform(scrollYProgress, [0.15, 0.65], [1, 0]);
  const coverCopyOpacity   = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const coverCopyY         = useTransform(scrollYProgress, [0, 0.32], [0, -32]);

  // Layer B (Chapter 01): gentle zoom settle & copy entrance
  const chapterBgScale     = useTransform(scrollYProgress, [0.15, 0.75], [1.12, 1]);
  const chapterCopyOpacity = useTransform(scrollYProgress, [0.28, 0.60], [0, 1]);
  const chapterCopyY       = useTransform(scrollYProgress, [0.28, 0.60], [28, 0]);

  // Scroll cue fades out early
  const hintOpacity        = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Reduced motion: static Chapter 01 card, no pinning
  if (reduced) {
    return (
      <section
        className="bio-intro-transition is-reduced"
        id="bio-intro"
        aria-label="Chapter 01 introduction"
      >
        <div className="bintro-static">
          <span className="bintro-chapter-num">CHAPTER 01</span>
          <h2 className="bintro-chapter-title">
            Biodiversity: <em>Introduction</em>
          </h2>
          <p className="bintro-chapter-lead">
            The variety of life on Earth — explore the intricate web of genes,
            species, and ecosystems that sustain planetary life.
          </p>
          <button type="button" className="bintro-enter-btn" onClick={onEnter}>
            Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="bio-intro-transition"
      id="bio-intro"
      ref={wrapRef}
      aria-label="Chapter 01 introduction"
    >
      <div className="bintro-sticky">

        {/* ── Layer B: Foundation underneath (Chapter 01 Living Canopy Panorama) ── */}
        <div className="bintro-chapter-layer">
          <motion.div
            className="bintro-chapter-bg"
            style={{
              scale: chapterBgScale,
              backgroundImage: `url('/images/bio-hero-bg.jpg')`,
            }}
          />
          <div className="bintro-chapter-vignette" />
          <motion.div
            className="bintro-chapter-copy"
            style={{
              opacity: chapterCopyOpacity,
              y: chapterCopyY,
            }}
          >
            <span className="bintro-chapter-num">CHAPTER 01</span>
            <h2 className="bintro-chapter-title">
              Biodiversity: <em>Introduction</em>
            </h2>
            <p className="bintro-chapter-lead">
              The variety of life on Earth — explore the intricate web of genes,
              species, and ecosystems that sustain planetary life.
            </p>
            <button type="button" className="bintro-enter-btn" onClick={onEnter}>
              Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </motion.div>
        </div>

        {/* ── Layer A: Cover Tree of Life dissolving away on top ── */}
        <motion.div
          className="bintro-cover-layer"
          style={{ opacity: coverLayerOpacity }}
        >
          <motion.div
            className="bintro-cover-bg"
            style={{
              scale: coverBgScale,
              backgroundImage: `url('/images/bio-hero-bg.jpg')`,
            }}
          />
          <div className="bintro-cover-vignette" />
          <motion.div
            className="bintro-cover-copy"
            style={{
              opacity: coverCopyOpacity,
              y: coverCopyY,
            }}
          >
            <span className="bintro-mod-tag">MODULE 04</span>
            <h2 className="bintro-grand">BIODIVERSITY</h2>
            <p className="bintro-sub">The web of living things.</p>
          </motion.div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div className="bintro-scroll-hint" style={{ opacity: hintOpacity }}>
          SCROLL <span className="bintro-hint-arrow">↓</span>
        </motion.div>

      </div>
    </section>
  );
}
