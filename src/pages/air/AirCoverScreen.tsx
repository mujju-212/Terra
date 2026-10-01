import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Wind,
  Factory,
  Sprout,
  Sparkles,
  Play,
  ArrowRight,
} from 'lucide-react';

interface AirCoverScreenProps {
  onStart: () => void;
  onScrollToChapter: (index: number) => void;
}

export function AirCoverScreen({ onStart, onScrollToChapter }: AirCoverScreenProps) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Atmospheric gentle particle drift simulation
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

    // Generate 45 subtle atmospheric particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() * 0.4 + 0.15) * (Math.random() > 0.3 ? 1 : -1),
      vy: -(Math.random() * 0.35 + 0.1),
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let isVisible = false;
    const render = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    // Pause RAF loop when scrolled down to later chapters, resume when cover is in view
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

  const atmosphericLayers = [
    { name: 'Thermosphere', altitude: '(~85–600 km)', isTroposphere: false, targetChapter: 1 },
    { name: 'Mesosphere', altitude: '(~50–85 km)', isTroposphere: false, targetChapter: 1 },
    { name: 'Stratosphere', altitude: '(~12–50 km)', isTroposphere: false, targetChapter: 10 },
    { name: 'Troposphere', altitude: '(0–12 km)', isTroposphere: true, targetChapter: 1 },
  ];

  const bottomCards = [
    {
      title: 'Understand',
      desc: 'the composition and structure of our atmosphere',
      image: '/images/air-card-understand.jpg',
      icon: <Wind size={16} />,
      chapterIndex: 1, // Introduction to Air (composition & troposphere)
    },
    {
      title: 'Explore',
      desc: 'the sources and types of air pollution',
      image: '/images/air-card-explore.jpg',
      icon: <Factory size={16} />,
      chapterIndex: 2, // Air Pollution
    },
    {
      title: 'Learn',
      desc: 'the impacts on health, economy and environment',
      image: '/images/air-card-learn.jpg',
      icon: <Sprout size={16} />,
      chapterIndex: 6, // Health Effects
    },
    {
      title: 'Discover',
      desc: 'solutions for cleaner air and a sustainable future',
      image: '/images/air-card-discover.jpg',
      icon: <Sparkles size={16} />,
      chapterIndex: 8, // Control Equipment
    },
  ];

  return (
    <section className="air-cover-section" id="cover">
      {/* Background image & atmospheric lighting scrims */}
      <div className="air-cover-bg">
        <img
          src="/images/air-hero-earth-bg.jpg"
          alt="Panoramic Earth atmosphere curve with luminous blue envelope"
          className="air-cover-bg-image"
        />
      </div>

      <div className="air-cover-scrim-top" />
      <div className="air-cover-scrim-bottom" />
      <div className="air-cover-scrim-left" />

      {/* Atmospheric micro-particle canvas */}
      <canvas ref={canvasRef} className="air-particle-canvas" />

      {/* Atmospheric Layer Altitude Pins (Upper/Right Earth Limb) */}
      <div className="air-atmosphere-pins-container" aria-label="Atmospheric Layers">
        {atmosphericLayers.map((layer, idx) => (
          <motion.button
            key={layer.name}
            type="button"
            className={`air-layer-pin ${layer.isTroposphere ? 'is-troposphere' : ''}`}
            onClick={() => onScrollToChapter(layer.targetChapter)}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + idx * 0.1 }}
            title={`Explore ${layer.name} ${layer.altitude}`}
          >
            <div className="air-layer-pin-dot-anchor">
              <span className="air-pin-pulse-ring" />
              <span className="air-pin-core-dot" />
            </div>
            <div className="air-layer-pin-pill">
              <span>{layer.name} {layer.altitude}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Top Right Quote Glass Card */}
      <motion.div
        className="air-top-quote-card"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="air-quote-mark" aria-hidden="true">“</span>
        <blockquote className="air-quote-text">
          Clean air is not a luxury, but a fundamental need for a healthy life, a stable environment and a sustainable future.
        </blockquote>
      </motion.div>

      {/* Hero Main Content (Left) */}
      <motion.div
        className="air-hero-main"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="air-hero-eyebrow">MODULE 03</p>

        <div className="air-hero-title-group">
          <div className="air-title-halo" aria-hidden="true" />
          <h1 className="air-hero-title-air">AIR</h1>
          <h2 className="air-hero-subtitle-display">The Thin Shell We Breathe</h2>
        </div>

        <div className="air-hero-curriculum">
          <span className="air-curriculum-label">CONSERVATION OF NATURAL RESOURCES</span>
          <span className="air-curriculum-code">B C V 7 5 5 B</span>
        </div>

        <p className="air-hero-desc">
          Explore the air around us — its composition, pollution, impacts and solutions — and learn how clean air supports a healthier planet and a brighter future.
        </p>

        <div className="air-hero-actions">
          <button
            type="button"
            className="air-btn-primary"
            onClick={onStart}
          >
            <span className="air-btn-icon-circle">
              <Play size={10} fill="currentColor" />
            </span>
            <span>Begin the Journey</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>

      {/* Bottom Dock: 4 Feature Cards + Scroll Exploration Cue */}
      <div className="air-bottom-dock">
        <div className="air-cards-grid">
          {bottomCards.map((card, idx) => (
            <motion.div
              key={card.title}
              className="air-feature-card"
              onClick={() => onScrollToChapter(card.chapterIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onScrollToChapter(card.chapterIndex);
                }
              }}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 + idx * 0.1 }}
            >
              <div className="air-card-image-holder">
                <img
                  src={card.image}
                  alt={`${card.title} - ${card.desc}`}
                  className="air-card-img"
                  loading="eager"
                />
                <div className="air-card-img-scrim" />
              </div>

              <div className="air-card-content">
                <div className="air-card-icon-pill">{card.icon}</div>
                <strong className="air-card-title">{card.title}</strong>
                <p className="air-card-desc">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll To Explore Indicator */}
        <button
          type="button"
          className="air-scroll-cue"
          onClick={onStart}
          aria-label="Scroll to explore Module 03 chapters"
        >
          <div className="air-mouse-pill" aria-hidden="true">
            <span className="air-mouse-wheel-dot" />
          </div>
          <span>SCROLL TO EXPLORE THE MODULE</span>
        </button>
      </div>
    </section>
  );
}
