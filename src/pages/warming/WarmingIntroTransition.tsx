import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';

interface WarmingIntroTransitionProps {
  onEnter: () => void;
}

/**
 * Pinned cinematic bridge between the Global Warming cover and Chapter 01
 * (Greenhouse Effect). Mirrors Land, Water & Bio module transition patterns:
 * A 220vh wrapper with sticky 100vh stage; scroll progress smoothly zooms
 * the cover hero away while the Greenhouse Effect chapter reveals underneath.
 */
export function WarmingIntroTransition({ onEnter }: WarmingIntroTransitionProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = false;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Layer A (Cover): zooms and dissolves away smoothly to reveal Layer B underneath
  const coverBgScale = useTransform(scrollYProgress, [0, 0.75], [1, 1.6]);
  const coverLayerOpacity = useTransform(scrollYProgress, [0.15, 0.65], [1, 0]);
  const coverCopyOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const coverCopyY = useTransform(scrollYProgress, [0, 0.28], [0, -32]);

  // Layer B (Chapter 01): gentle zoom settle & copy entrance
  const chapterBgScale = useTransform(scrollYProgress, [0.15, 0.75], [1.14, 1]);
  const chapterCopyOpacity = useTransform(scrollYProgress, [0.32, 0.68], [0, 1]);
  const chapterCopyY = useTransform(scrollYProgress, [0.32, 0.68], [32, 0]);

  // Scroll cue fades out early in scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  if (reduced) {
    return (
      <section
        className="warming-intro-transition is-reduced"
        id="warming-intro"
        aria-label="Chapter 01 introduction"
      >
        <div className="gwintro-static">
          <span className="gwintro-chapter-num">CHAPTER 01</span>
          <h2 className="gwintro-chapter-title">
            The Greenhouse Effect: <em>Energy in Motion</em>
          </h2>
          <p className="gwintro-chapter-lead">
            Trace the journey of solar radiation — 30% reflected, 70% absorbed — and see how excess greenhouse gases trap heat to drive planetary warming.
          </p>
          <button type="button" className="gwintro-enter-btn" onClick={onEnter}>
            Enter Simulator <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="warming-intro-transition"
      id="warming-intro"
      ref={wrapRef}
      aria-label="Chapter 01 introduction"
    >
      <div className="gwintro-sticky">
        {/* Layer B: Foundation underneath (Greenhouse Atmosphere Panorama) */}
        <div className="gwintro-chapter-layer">
          <motion.div
            className="gwintro-chapter-bg"
            style={{
              scale: chapterBgScale,
              backgroundImage: `url('/images/warming-greenhouse-bg.jpg')`,
            }}
          />
          <div className="gwintro-chapter-vignette" />
          <motion.div
            className="gwintro-chapter-copy"
            style={{
              opacity: chapterCopyOpacity,
              y: chapterCopyY,
            }}
          >
            <div className="gwintro-badge">
              <Flame size={14} className="text-amber-400" />
              <span>ACT 01 · THE WARMING PLANET</span>
            </div>
            <span className="gwintro-chapter-num">CHAPTER 01</span>
            <h2 className="gwintro-chapter-title">
              The Greenhouse Effect: <em>Energy in Motion</em>
            </h2>
            <p className="gwintro-chapter-lead">
              Trace solar energy from deep space into our biosphere: 30% reflected by clouds and ice, 70% absorbed to warm Earth. Discover the vital balance of −18°C vs +15°C, and explore what happens when excess greenhouse gases trap escaping thermal infrared radiation.
            </p>
            <button type="button" className="gwintro-enter-btn" onClick={onEnter}>
              Launch Greenhouse Simulator <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </motion.div>
        </div>

        {/* Layer A: Cover overlay dissolving away */}
        <motion.div
          className="gwintro-cover-layer"
          style={{
            opacity: coverLayerOpacity,
          }}
        >
          <motion.div
            className="gwintro-cover-bg"
            style={{
              scale: coverBgScale,
              backgroundImage: `url('/images/warming-hero-bg.jpg')`,
            }}
          />
          <div className="gwintro-cover-vignette" />
          <motion.div
            className="gwintro-cover-copy"
            style={{
              opacity: coverCopyOpacity,
              y: coverCopyY,
            }}
          >
            <span className="gwintro-eyebrow">MODULE 05 · FIELD EXPERIENCE</span>
            <h2 className="gwintro-cover-title">Global Warming &amp; EIA</h2>
            <p className="gwintro-cover-sub">A Balance Under Stress · Thermal Dynamics &amp; Environmental Impact</p>
          </motion.div>
        </motion.div>

        {/* Scroll cue hint */}
        <motion.div className="gwintro-scroll-hint" style={{ opacity: hintOpacity }}>
          SCROLL <span className="gwintro-hint-arrow">↓</span>
        </motion.div>
      </div>
    </section>
  );
}
