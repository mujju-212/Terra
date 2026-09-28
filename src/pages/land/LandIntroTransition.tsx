import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LandIntroTransitionProps {
  onEnter: () => void;
}

/**
 * Pinned cinematic bridge between the Land cover and Chapter 01 (Earth
 * Formation). Mirrors the landing hero→motivation transition: a 220vh wrapper
 * with a sticky 100vh stage; scroll progress zooms the cover landscape away
 * while the "Earth Formation" title card cross-fades in. Normal scrolling
 * resumes for chapters 2–15.
 */
export default function LandIntroTransition({ onEnter }: LandIntroTransitionProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const coverBgScale = useTransform(scrollYProgress, [0, 1], [1, 5.5]);
  const coverLayerOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const coverCopyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const formationOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const formationBgScale = useTransform(scrollYProgress, [0.4, 1], [1.2, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12, 0.3], [1, 1, 0]);

  // Reduced motion: no pinning / scrub — show the Chapter-01 title card statically.
  if (reduced) {
    return (
      <section className="land-intro-transition is-reduced" id="land-intro" aria-label="Chapter 01 introduction">
        <div className="intro-static">
          <span className="intro-chapter-num">CHAPTER 01</span>
          <h2 className="intro-formation-title">
            Earth <em>Formation</em>
          </h2>
          <p className="intro-formation-lead">
            From a cloud of dust to a molten world — 4.6 billion years of planetary becoming.
            Begin at the very beginning.
          </p>
          <button type="button" className="intro-enter-btn" onClick={onEnter}>
            Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="land-intro-transition" id="land-intro" ref={wrapRef} aria-label="Chapter 01 introduction">
      <div className="intro-sticky">
        {/* ── Layer A: the cover landscape zooming away ── */}
        <motion.div className="intro-cover-layer" style={{ opacity: coverLayerOpacity }}>
          <motion.div
            className="intro-cover-bg"
            style={{ scale: coverBgScale, backgroundImage: `url('/images/land-cover-hero-alpine.jpg')` }}
          />
          <div className="intro-cover-vignette" />
          <motion.div className="intro-cover-copy" style={{ opacity: coverCopyOpacity }}>
            <span className="intro-mod-tag">MODULE 01</span>
            <h2 className="intro-grand">LAND</h2>
            <p className="intro-sub">The ground beneath everything.</p>
          </motion.div>
        </motion.div>

        {/* ── Layer B: Chapter 01 title card cross-fading in ── */}
        <motion.div className="intro-formation-layer" style={{ opacity: formationOpacity }}>
          <motion.div
            className="intro-formation-bg"
            style={{ scale: formationBgScale, backgroundImage: `url('/images/stage-03-early-earth.jpg')` }}
          />
          <div className="intro-formation-vignette" />
          <div className="intro-formation-copy">
            <span className="intro-chapter-num">CHAPTER 01</span>
            <h2 className="intro-formation-title">
              Earth <em>Formation</em>
            </h2>
            <p className="intro-formation-lead">
              From a cloud of dust to a molten world — 4.6 billion years of planetary becoming.
              Begin at the very beginning.
            </p>
            <button type="button" className="intro-enter-btn" onClick={onEnter}>
              Begin Chapter 01 <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div className="intro-scroll-hint" style={{ opacity: hintOpacity }}>
          SCROLL <span className="intro-hint-arrow">↓</span>
        </motion.div>
      </div>
    </section>
  );
}
