import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Droplets, Wind, Trees, Globe, ArrowRight } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const domains = [
  { name: 'LAND', icon: Layers, progressThreshold: 20 },
  { name: 'WATER', icon: Droplets, progressThreshold: 40 },
  { name: 'AIR', icon: Wind, progressThreshold: 60 },
  { name: 'BIODIVERSITY', icon: Trees, progressThreshold: 80 },
  { name: 'GLOBAL WARMING & EIA', icon: Globe, progressThreshold: 100 },
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [activeDomainIdx, setActiveDomainIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Realistic initialization increment curve
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), 350);
          return 100;
        }
        // Accelerate through first phases, smooth finish
        const step = prev < 60 ? Math.floor(Math.random() * 4) + 2 : Math.floor(Math.random() * 3) + 1;
        const next = Math.min(100, prev + step);

        // Update active domain
        if (next < 25) setActiveDomainIdx(0);
        else if (next < 48) setActiveDomainIdx(1);
        else if (next < 70) setActiveDomainIdx(2);
        else if (next < 88) setActiveDomainIdx(3);
        else setActiveDomainIdx(4);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Compute SVG orbital progress dash
  // Radius = 240, Circumference = 2 * PI * 240 ≈ 1507.96
  const circleRadius = 240;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  // Calculate position of the glowing bead on the orbital circle (starts at top, clockwise)
  const angleRad = (percent / 100) * 2 * Math.PI - Math.PI / 2;
  const beadX = 400 + Math.cos(angleRad) * circleRadius;
  const beadY = 400 + Math.sin(angleRad) * circleRadius;

  return (
    <AnimatePresence>
      <motion.div
        className="preloader-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background cosmic Earth imagery backdrop matching the reference */}
        <div className="preloader-backdrop">
          <div
            className="preloader-bg-img"
            style={{ backgroundImage: `url('/images/hero-earth-bg.jpg')` }}
          />
          <div className="preloader-dark-scrim" />
        </div>

        {/* ─── Top Bar ─── */}
        <header className="preloader-topbar">
          <div className="preloader-brand">
            <span className="brand-code">BCV755B</span>
            <span className="brand-divider" />
            <span className="brand-title">Conservation of Natural Resources</span>
          </div>
          <div className="preloader-mantra">
            <span>EXPLORE</span>
            <span className="mantra-slash">/</span>
            <span>UNDERSTAND</span>
            <span className="mantra-slash">/</span>
            <span>PROTECT</span>
            <span className="mantra-slash">/</span>
            <span>PRESERVE</span>
          </div>
        </header>

        {/* ─── Center Display with Earth & Orbital Progress Circle ─── */}
        <div className="preloader-center-stage">
          {/* Orbital Progress SVG Ring */}
          <div className="preloader-orbital-ring-wrap">
            <svg
              className="preloader-orbital-svg"
              viewBox="0 0 800 800"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Outer decorative orbit track */}
              <circle
                cx="400"
                cy="400"
                r={circleRadius + 40}
                className="orbit-track-outer"
              />
              <circle
                cx="400"
                cy="400"
                r={circleRadius}
                className="orbit-track-base"
              />
              {/* Progress arc */}
              <circle
                cx="400"
                cy="400"
                r={circleRadius}
                className="orbit-progress-arc"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
              {/* Glowing progress bead */}
              <circle
                cx={beadX}
                cy={beadY}
                r="4.5"
                className="orbit-progress-bead"
              />
              <circle
                cx={beadX}
                cy={beadY}
                r="12"
                className="orbit-progress-bead-halo"
              />

              {/* Trajectory arcs curving across space */}
              <path
                d="M 50 480 Q 240 220 750 400"
                className="preloader-trajectory-line"
              />
              <path
                d="M 100 280 Q 560 210 750 620"
                className="preloader-trajectory-line"
              />
            </svg>

            {/* Numerical Percentage Display (Anchored at upper right of orbit) */}
            <div className="preloader-percent-badge">
              <span className="percent-num">{percent}</span>
              <span className="percent-sym">%</span>
            </div>

            {/* Center Typography (Matching user's reference image exactly) */}
            <div className="preloader-center-content">
              <span className="preloader-kicker">LOADING OUR PLANET</span>
              <h1 className="preloader-grand-title">
                Conservation of
                <br />
                Natural Resources
              </h1>
              <p className="preloader-subtitle">AN INTERACTIVE LEARNING EXPERIENCE</p>

              <div className="preloader-course-badge">
                <span className="badge-rule" />
                <span className="badge-code">BCV755B</span>
                <span className="badge-rule" />
              </div>

              {isFinished && (
                <motion.button
                  type="button"
                  className="preloader-enter-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onComplete}
                  autoFocus
                >
                  <span>ENTER EXHIBIT</span>
                  <ArrowRight size={14} />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* ─── Left Sidebar: Vertical Domains List ─── */}
        <div className="preloader-left-col">
          <div className="preloader-domains-list">
            <div
              className="domain-indicator-bead"
              style={{
                transform: `translateY(${activeDomainIdx * 42}px)`,
              }}
            />
            {domains.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeDomainIdx;
              const isPast = percent >= item.progressThreshold;
              return (
                <div
                  key={item.name}
                  className={`preloader-domain-item ${isActive ? 'is-active' : ''} ${isPast ? 'is-ready' : ''}`}
                >
                  <Icon size={14} className="domain-icon" />
                  <span className="domain-name">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Bottom Footer ─── */}
        <footer className="preloader-footer">
          <span className="footer-caption">PREPARING A SUSTAINABLE TOMORROW</span>
          <div className="preloader-dots">
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={`preloader-dot ${Math.floor((percent / 25)) >= dot ? 'dot-active' : ''}`}
              />
            ))}
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
