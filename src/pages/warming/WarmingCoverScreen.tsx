import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface WarmingCoverScreenProps {
  onStart: () => void;
  onScrollToChapter: (index: number) => void;
}

export function WarmingCoverScreen({ onStart }: WarmingCoverScreenProps) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Atmospheric solar particles & thermal heat shimmer
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    // 45 radiant solar ember / heat haze particles drifting from sun across orbit
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * (width * 0.45),
      y: Math.random() * (height * 0.55),
      radius: Math.random() * 2.2 + 0.8,
      baseAlpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.025 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      vx: Math.random() * 0.45 + 0.15,
      vy: Math.random() * 0.35 + 0.1,
      color: Math.random() > 0.4 ? 'rgba(251, 191, 36,' : 'rgba(239, 68, 68,',
    }));

    let isVisible = false;
    let frame = 0;

    const render = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      frame++;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > width + 20) p.x = -10;
        if (p.y > height + 20) p.y = -10;

        const pulse = Math.sin(frame * p.pulseSpeed + p.pulseOffset);
        const alpha = Math.max(0.1, p.baseAlpha + pulse * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${alpha})`;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry && entry.isIntersecting);
        if (isVisible) {
          if (!animId) animId = requestAnimationFrame(render);
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = 0;
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <section
      className="warming-cover-section"
      id="warming-cover"
      aria-label="Module 05: Global Warming & EIA Cover"
    >
      {/* ── Background: High-Res Clean Earth & Blazing Sun Wallpaper ── */}
      <div
        className="warming-cover-bg"
        style={{ backgroundImage: `url('/images/warming-hero-bg.jpg')` }}
      />
      <div className="warming-cover-vignette" />

      {/* Atmospheric thermal particle canvas */}
      <canvas ref={canvasRef} className="warming-cover-canvas" aria-hidden="true" />

      {/* ── Main Cover Container (Matches User's Provided Image 1 Exactly) ── */}
      <div className="warming-cover-container">
        <motion.div
          className="warming-cover-hero-card"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow Pill with Extending Rule */}
          <div className="warming-hero-eyebrow-row">
            <span className="warming-hero-eyebrow-pill">MODULE 05</span>
            <span className="warming-hero-eyebrow-line" />
          </div>

          {/* Primary Display Title */}
          <h1 className="warming-hero-title">
            <span className="warming-hero-gradient-text">Global Warming</span>
            <br />
            <span className="warming-hero-eia-text">&amp; EIA</span>
          </h1>

          {/* Subtitle */}
          <p className="warming-hero-subtitle">A Balance Under Stress</p>

          {/* Curriculum Meta Line */}
          <div className="warming-hero-meta">
            <span className="meta-accent">BCV755B</span>
            <span className="meta-sep">|</span>
            <span className="meta-name">Conservation of Natural Resources</span>
          </div>

          {/* Explanatory Paragraph */}
          <p className="warming-hero-lead">
            Explore how a warming planet affects life, ecosystems and human well-being,
            and learn how Environmental Impact Assessment (EIA) helps us make responsible
            decisions for a sustainable future.
          </p>

          {/* Scroll Cue & Action Row (Matches Image 1) */}
          <div className="warming-hero-action-row">
            <button
              type="button"
              className="warming-hero-chevron-btn"
              onClick={onStart}
              aria-label="Scroll to begin Chapter 01"
            >
              <ChevronDown size={20} strokeWidth={2.4} />
            </button>
            <button
              type="button"
              className="warming-hero-cta-link"
              onClick={onStart}
            >
              Follow the heat <span className="arrow-down">&darr;</span>
            </button>
          </div>

          {/* Connecting Vertical Guide Line */}
          <div className="warming-hero-guide-line">
            <span className="guide-dot" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
