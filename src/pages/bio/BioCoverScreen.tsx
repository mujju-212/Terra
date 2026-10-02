import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Play,
  BookOpen,
  ArrowDown,
  ArrowRight,
  Droplets,
  Leaf,
  Bug,
  Sparkles,
} from 'lucide-react';
import { bioStatsData, bioBottomCards } from './bioData';

interface BioCoverScreenProps {
  onStart: () => void;
  onScrollToChapter: (index: number) => void;
}

// Custom SVG Icons for the stats strip to match Image 1
function SproutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4-.1 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.3.8-4.9 2z" />
    </svg>
  );
}

function BacteriaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 4v2" /><path d="M12 18v2" />
      <path d="M4 12h2" /><path d="M18 12h2" />
      <path d="m6.34 6.34 1.42 1.42" /><path d="m16.24 16.24 1.42 1.42" />
      <path d="m6.34 17.66 1.42-1.42" /><path d="m16.24 7.76 1.42-1.42" />
    </svg>
  );
}

function MushroomIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14v7" />
      <path d="M9 21h6" />
      <path d="M4 14c0-5 3.5-9 8-9s8 4 8 9c0 1-1 2-2 2H6c-1 0-2-1-2-2z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function BioCoverScreen({ onStart, onScrollToChapter }: BioCoverScreenProps) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Bioluminescent fireflies & forest spore drift simulation
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

    // 55 luminous spores/fireflies
    const spores = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      baseAlpha: Math.random() * 0.6 + 0.25,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      pulseOffset: Math.random() * Math.PI * 2,
      vx: (Math.random() * 0.35 + 0.08) * (Math.random() > 0.4 ? 1 : -1),
      vy: -(Math.random() * 0.4 + 0.12),
      isGolden: Math.random() > 0.45,
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

      spores.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -20) s.x = width + 20;
        if (s.x > width + 20) s.x = -20;
        if (s.y < -20) s.y = height + 20;

        const pulse = Math.sin(frame * s.pulseSpeed + s.pulseOffset);
        const currentAlpha = Math.max(0.1, s.baseAlpha + pulse * 0.25);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        if (s.isGolden) {
          ctx.fillStyle = `rgba(253, 224, 71, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(250, 204, 21, 0.8)';
        } else {
          ctx.fillStyle = `rgba(134, 239, 172, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(74, 222, 128, 0.8)';
        }
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    // Pause RAF loop when user scrolls down to chapters, resume when cover returns to view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry && entry.isIntersecting);
        if (isVisible) {
          if (!animId) {
            animId = requestAnimationFrame(render);
          }
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
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [reducedMotion]);

  const renderStatIcon = (type: string) => {
    switch (type) {
      case 'leaf':
        return <Leaf size={18} className="bio-stat-icon" />;
      case 'droplet':
        return <Droplets size={18} className="bio-stat-icon" />;
      case 'plant':
        return <SproutIcon />;
      case 'insect':
        return <Bug size={18} className="bio-stat-icon" />;
      case 'microbe':
        return <BacteriaIcon />;
      case 'fungus':
        return <MushroomIcon />;
      default:
        return <Sparkles size={18} className="bio-stat-icon" />;
    }
  };

  return (
    <section className="bio-cover-section" id="cover">
      {/* ── Full Bleed Background Image (Pristine Image 2) ── */}
      <div className="bio-cover-bg-wrap">
        <img
          src="/images/bio-hero-bg.jpg"
          alt="Tree of life living canopy landscape with wildlife and golden sunrise"
          className="bio-cover-bg-image"
        />
      </div>

      {/* ── Cinematic Atmosphere & Scrim Overlays ── */}
      <div className="bio-cover-scrim-left" />
      <div className="bio-cover-scrim-bottom" />
      <div className="bio-cover-scrim-top" />
      <div className="bio-cover-vignette" />

      {/* ── Bioluminescent Fireflies Canvas ── */}
      <canvas ref={canvasRef} className="bio-particles-canvas" />

      {/* ── Top-Right Quote Callout Card ── */}
      <motion.aside
        className="bio-quote-callout liquid-glass"
        aria-label="Module 04 North Star Quote"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 25, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="bio-quote-mark" aria-hidden="true">
          “
        </span>
        <blockquote className="bio-quote-body">
          Zoom from a single gene out to a whole biome. Meet the{' '}
          <strong className="bio-highlight-text">8.7 million species</strong> we
          share Earth with — then see what threatens them and how we hold the{' '}
          <strong className="bio-highlight-text">web together</strong>.
        </blockquote>
      </motion.aside>

      {/* ── Main Hero Info (Left Aligned) ── */}
      <div className="bio-cover-hero-content">
        <motion.div
          className="bio-cover-eyebrow-row"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="bio-course-code">BCV755B</span>
          <div className="bio-module-badge">
            <span className="bio-badge-leaf" aria-hidden="true">🍃</span>
            <span className="bio-badge-text">MODULE 04</span>
          </div>
        </motion.div>

        <motion.h1
          className="bio-cover-title"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="bio-title-line-white">Biodiversity &amp;</span>
          <span className="bio-title-line-green">Ecosystem</span>
        </motion.h1>

        <motion.p
          className="bio-cover-subtitle"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          The Web of <span className="bio-highlight-living">Living Things</span>
        </motion.p>

        <motion.p
          className="bio-cover-desc"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
        >
          Explore the incredible variety of life on Earth, the ecosystems that
          support it, the threats it faces, and how we can conserve this
          irreplaceable natural heritage.
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          className="bio-cover-actions"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.46 }}
        >
          <button
            type="button"
            className="bio-btn-primary"
            onClick={onStart}
            aria-label="Start the Journey into Module 04"
          >
            <span className="bio-btn-play-circle" aria-hidden="true">
              <Play size={13} fill="currentColor" />
            </span>
            <span>Start the Journey</span>
            <ArrowRight size={15} className="bio-btn-arrow" />
          </button>

          <button
            type="button"
            className="bio-btn-secondary"
            onClick={() => onScrollToChapter(1)}
            aria-label="View Chapter List"
          >
            <BookOpen size={16} className="bio-btn-icon" />
            <span>View Chapter List</span>
          </button>
        </motion.div>
      </div>

      {/* ── Mid-Lower Statistics Bar (6 Metric Pills) ── */}
      <motion.div
        className="bio-stats-strip-container"
        aria-label="Global Biodiversity Key Statistics"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bio-stats-strip-inner liquid-glass">
          {bioStatsData.map((stat) => (
            <div key={stat.id} className="bio-stat-pill">
              <div className="bio-stat-icon-wrap" aria-hidden="true">
                {renderStatIcon(stat.iconType)}
              </div>
              <div className="bio-stat-info">
                <span className="bio-stat-value">{stat.value}</span>
                <span className="bio-stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom 9 Interactive Chapter Cards ── */}
      <motion.div
        className="bio-bottom-cards-wrapper"
        aria-label="Module 04 Chapters Strip"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bio-bottom-cards-grid">
          {bioBottomCards.map((card, idx) => {
            const isFirst = idx === 0; // Card 01 active on cover
            return (
              <button
                key={card.num}
                type="button"
                className={`bio-bottom-card ${isFirst ? 'is-active' : ''}`}
                onClick={() => onScrollToChapter(card.chapterIndex)}
                aria-label={`Chapter ${card.num}: ${card.title} - ${card.desc}`}
              >
                <div className="bio-card-header">
                  <span className="bio-card-num">{card.num}</span>
                  <span className="bio-card-title">{card.title}</span>
                </div>

                <div className="bio-card-thumb-holder">
                  <img
                    src={card.image}
                    alt={`${card.title} thumbnail`}
                    className="bio-card-img"
                    loading="lazy"
                  />
                  <div className="bio-card-img-scrim" />
                </div>

                <div className="bio-card-footer">
                  <p className="bio-card-desc">{card.desc}</p>
                </div>

                {isFirst && <span className="bio-card-active-glow" />}
              </button>
            );
          })}
        </div>

        {/* Horizontal Progress Timeline connecting cards */}
        <div className="bio-cards-track-line" aria-hidden="true">
          <div className="bio-cards-track-nodes">
            {bioBottomCards.map((_, i) => (
              <span key={i} className={`bio-track-node ${i === 0 ? 'is-active' : ''}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll to Explore Prompt (Bottom Right) ── */}
      <button
        type="button"
        className="bio-scroll-cue-btn"
        onClick={onStart}
        aria-label="Scroll to explore Module 04"
      >
        <div className="bio-scroll-circle">
          <ArrowDown size={15} className="bio-scroll-arrow" />
        </div>
        <span className="bio-scroll-label">Scroll to explore</span>
      </button>
    </section>
  );
}
