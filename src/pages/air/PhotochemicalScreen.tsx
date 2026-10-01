import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sun,
  Lightbulb,
  Settings,
  Share2,
  Atom,
  FlaskConical,
  Heart,
  ShieldCheck,
  Check,
  AlertTriangle,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Flame,
  Droplets,
  Cloud,
  Layers,
  ArrowRight,
} from 'lucide-react';
import './PhotochemicalScreen.css';

/* ─── 3D MOLECULAR BALL-AND-STICK SVG COMPONENTS ─── */

export function MoleculeNOx() {
  return (
    <svg width="68" height="68" viewBox="0 0 70 70" fill="none">
      <defs>
        {/* Red Nitrogen Sphere Gradient */}
        <radialGradient id="noxRed" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="35%" stopColor="#ef4444" />
          <stop offset="70%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
        {/* Blue Oxygen Sphere Gradient */}
        <radialGradient id="noxBlue" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="35%" stopColor="#0284c7" />
          <stop offset="70%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#082f49" />
        </radialGradient>
        <filter id="molGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Chemical Bond Cylinders */}
      <line x1="35" y1="30" x2="18" y2="48" stroke="#64748b" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="35" y1="30" x2="52" y2="48" stroke="#64748b" strokeWidth="5.5" strokeLinecap="round" />
      {/* Left Blue Oxygen */}
      <circle cx="18" cy="48" r="11" fill="url(#noxBlue)" filter="url(#molGlow)" />
      <ellipse cx="15" cy="44" rx="3.5" ry="2" fill="#ffffff" opacity="0.65" />
      {/* Right Blue Oxygen */}
      <circle cx="52" cy="48" r="11" fill="url(#noxBlue)" filter="url(#molGlow)" />
      <ellipse cx="49" cy="44" rx="3.5" ry="2" fill="#ffffff" opacity="0.65" />
      {/* Central Red Nitrogen */}
      <circle cx="35" cy="28" r="14" fill="url(#noxRed)" filter="url(#molGlow)" />
      <ellipse cx="31" cy="23" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.75" />
    </svg>
  );
}

export function MoleculeVOC() {
  return (
    <svg width="68" height="68" viewBox="0 0 70 70" fill="none">
      <defs>
        {/* Black/Grey Carbon Sphere */}
        <radialGradient id="vocCarbon" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="35%" stopColor="#334155" />
          <stop offset="70%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </radialGradient>
        {/* White Hydrogen Spheres */}
        <radialGradient id="vocHydrogen" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#e2e8f0" />
          <stop offset="75%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
      </defs>
      {/* Tetrahedral Bonds */}
      <line x1="35" y1="35" x2="20" y2="20" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="35" y1="35" x2="50" y2="20" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="35" y1="35" x2="20" y2="50" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="35" y1="35" x2="50" y2="50" stroke="#64748b" strokeWidth="4.5" strokeLinecap="round" />
      {/* Central Carbon */}
      <circle cx="35" cy="35" r="14" fill="url(#vocCarbon)" />
      <ellipse cx="31" cy="30" rx="4" ry="2.5" fill="#ffffff" opacity="0.45" />
      {/* 4 Hydrogens */}
      <circle cx="20" cy="20" r="7.5" fill="url(#vocHydrogen)" />
      <circle cx="50" cy="20" r="7.5" fill="url(#vocHydrogen)" />
      <circle cx="20" cy="50" r="7.5" fill="url(#vocHydrogen)" />
      <circle cx="50" cy="50" r="7.5" fill="url(#vocHydrogen)" />
    </svg>
  );
}

export function MoleculeOzone() {
  return (
    <svg width="48" height="48" viewBox="0 0 54 54" fill="none">
      <defs>
        <radialGradient id="ozoneGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="35%" stopColor="#ef4444" />
          <stop offset="75%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
      </defs>
      {/* Bent bonds */}
      <line x1="14" y1="34" x2="27" y2="18" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="40" y1="34" x2="27" y2="18" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
      {/* 3 Oxygen atoms */}
      <circle cx="14" cy="34" r="8.5" fill="url(#ozoneGrad)" />
      <circle cx="40" cy="34" r="8.5" fill="url(#ozoneGrad)" />
      <circle cx="27" cy="18" r="9" fill="url(#ozoneGrad)" />
      <ellipse cx="25" cy="15" rx="2.5" ry="1.5" fill="#fff" opacity="0.75" />
    </svg>
  );
}

export function MoleculePAN() {
  return (
    <svg width="48" height="48" viewBox="0 0 54 54" fill="none">
      <defs>
        <radialGradient id="panRed" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <radialGradient id="panBlue" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </radialGradient>
        <radialGradient id="panGrey" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="40%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>
      </defs>
      <line x1="16" y1="27" x2="27" y2="22" stroke="#64748b" strokeWidth="3" />
      <line x1="27" y1="22" x2="38" y2="28" stroke="#64748b" strokeWidth="3" />
      <line x1="27" y1="22" x2="27" y2="38" stroke="#64748b" strokeWidth="3" />
      <circle cx="16" cy="27" r="7.5" fill="url(#panGrey)" />
      <circle cx="27" cy="38" r="7.5" fill="url(#panRed)" />
      <circle cx="38" cy="28" r="8" fill="url(#panBlue)" />
      <circle cx="27" cy="20" r="7" fill="url(#panRed)" />
    </svg>
  );
}

export function MoleculeAldehyde() {
  return (
    <svg width="48" height="48" viewBox="0 0 54 54" fill="none">
      <defs>
        <radialGradient id="aldRed" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <radialGradient id="aldGrey" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="aldWhite" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
      </defs>
      {/* Carbonyl C=O Double Bond */}
      <line x1="25" y1="27" x2="25" y2="15" stroke="#ef4444" strokeWidth="2.5" />
      <line x1="29" y1="27" x2="29" y2="15" stroke="#ef4444" strokeWidth="2.5" />
      {/* C-H bonds */}
      <line x1="27" y1="27" x2="16" y2="38" stroke="#94a3b8" strokeWidth="2.5" />
      <line x1="27" y1="27" x2="38" y2="38" stroke="#94a3b8" strokeWidth="2.5" />
      <circle cx="27" cy="14" r="7.5" fill="url(#aldRed)" />
      <circle cx="27" cy="27" r="8" fill="url(#aldGrey)" />
      <circle cx="16" cy="38" r="5.5" fill="url(#aldWhite)" />
      <circle cx="38" cy="38" r="5.5" fill="url(#aldWhite)" />
    </svg>
  );
}

export function MoleculePeroxy() {
  return (
    <svg width="48" height="48" viewBox="0 0 54 54" fill="none">
      <defs>
        <radialGradient id="prxRed" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <radialGradient id="prxGrey" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      <line x1="16" y1="28" x2="28" y2="28" stroke="#64748b" strokeWidth="3" />
      <line x1="28" y1="28" x2="40" y2="28" stroke="#ef4444" strokeWidth="3" />
      <circle cx="16" cy="28" r="7.5" fill="url(#prxGrey)" />
      <circle cx="28" cy="28" r="7.5" fill="url(#prxRed)" />
      <circle cx="40" cy="28" r="7.5" fill="url(#prxRed)" />
      {/* Radical electron dot */}
      <circle cx="47" cy="23" r="2.2" fill="#fbbf24" />
    </svg>
  );
}

export function MoleculeOther() {
  return (
    <svg width="48" height="48" viewBox="0 0 54 54" fill="none">
      <defs>
        <radialGradient id="othBlue" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#075985" />
        </radialGradient>
        <radialGradient id="othAmber" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <radialGradient id="othWhite" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="24" r="7" fill="url(#othBlue)" />
      <circle cx="34" cy="20" r="8" fill="url(#othAmber)" />
      <circle cx="28" cy="34" r="7.5" fill="url(#othWhite)" />
    </svg>
  );
}

/* ─── MAIN PHOTOCHEMICAL SCREEN COMPONENT ─── */
export function PhotochemicalScreen() {
  const reducedMotion = useReducedMotion();

  // Split-screen image slider state for Card 1
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clampedPct);
  }, []);

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="air-photochem-section" id="ch-photochemical">
      {/* ─── HERO CINEMATIC BACKDROP ─── */}
      <div className="air-photochem-hero-backdrop" aria-hidden="true">
        <img
          src="/images/air-sources-hero-bg.jpg"
          alt="Atmospheric sunset over city skyline with clouds and sunlight"
          className="air-photochem-hero-bg-img"
        />
        <img
          src="/images/sun-flare-optical.png"
          alt="Radiant optical solar flare"
          className="air-photochem-sun-flare"
        />
        <div className="air-photochem-scrim-left" />
        <div className="air-photochem-scrim-top" />
        <div className="air-photochem-scrim-bottom" />
      </div>

      <div className="air-photochem-container">
        {/* ─── 1. TOP HEADER ROW + REACTION FLOW DIAGRAM + QUOTE ─── */}
        <div className="air-photochem-header-row">
          {/* Header Left */}
          <motion.div
            className="air-photochem-header-left"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <span className="air-photochem-chapter-tag">CHAPTER 12</span>
            <h2 className="air-photochem-title">
              Photochemical <br />
              <span className="air-photochem-title-accent">Changes in the Atmosphere</span>
            </h2>
            <p className="air-photochem-desc">
              Photochemical changes refer to a series of chemical reactions in the atmosphere
              triggered by sunlight (UV radiation), involving pollutants such as nitrogen oxides
              (NOx) and volatile organic compounds (VOCs). These reactions lead to the formation
              of secondary pollutants like ground-level ozone, PAN, aldehydes and other oxidants,
              causing photochemical smog and various environmental and health problems.
            </p>
          </motion.div>

          {/* Center-Right: Hero Reaction Atmospheric Flow Diagram */}
          <motion.div
            className="air-photochem-hero-diagram-wrap"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="air-photochem-diagram-canvas">
              {/* Sun Badge with UV Radiance */}
              <div className="air-diag-sun-badge">
                <Sun size={15} className="text-amber-200" />
                <span>Sunlight (UV radiation)</span>
              </div>

              {/* Input 1: NOx */}
              <div className="air-diag-input-box air-diag-input-top">
                <span className="air-diag-input-name">NOx</span>
                <span className="air-diag-input-detail">
                  (Nitrogen Oxides)<br />from vehicles &amp; industries
                </span>
              </div>

              {/* Input 2: VOCs */}
              <div className="air-diag-input-box air-diag-input-bottom">
                <span className="air-diag-input-name">VOCs</span>
                <span className="air-diag-input-detail">
                  (Volatile Organic Compounds)<br />from vehicles, solvents, industries
                </span>
              </div>

              {/* Central Glowing Purple Cloud */}
              <div className="air-diag-cloud-center">
                <span className="air-diag-cloud-title">Photochemical<br />Reactions</span>
              </div>

              {/* Output 1: Ozone (O3) */}
              <div className="air-diag-output-pill air-diag-output-top">
                <span>Ozone (O₃)</span>
              </div>

              {/* Output 2: PAN & Aldehydes */}
              <div className="air-diag-output-pill air-diag-output-bottom">
                <span>PAN, Aldehydes &amp; other Oxidants</span>
              </div>

              {/* SVG Vector Flow Rays & Connectors */}
              <svg className="air-diag-svg-overlay" viewBox="0 0 520 230" fill="none">
                <defs>
                  {/* Sun ray gradients */}
                  <linearGradient id="sunRayGrad" x1="68%" y1="12%" x2="50%" y2="48%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.25" />
                  </linearGradient>
                  {/* NOx orange arrow */}
                  <linearGradient id="arrowNoxGrad" x1="25%" y1="20%" x2="42%" y2="45%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                  {/* VOC orange arrow */}
                  <linearGradient id="arrowVocGrad" x1="25%" y1="80%" x2="42%" y2="55%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                  {/* Ozone blue arrow */}
                  <linearGradient id="arrowO3Grad" x1="58%" y1="48%" x2="78%" y2="35%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  {/* PAN red arrow */}
                  <linearGradient id="arrowPanGrad" x1="58%" y1="52%" x2="76%" y2="78%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>

                {/* Volumetric Sun Rays */}
                <path d="M 330 25 L 260 90 L 300 90 Z" fill="url(#sunRayGrad)" opacity="0.45" />
                <path d="M 345 25 L 285 92 L 325 92 Z" fill="url(#sunRayGrad)" opacity="0.6" />
                <path d="M 360 25 L 310 90 L 340 90 Z" fill="url(#sunRayGrad)" opacity="0.45" />

                {/* Arrow 1: NOx into Cloud */}
                <path
                  d="M 135 34 C 180 34, 185 85, 205 98"
                  stroke="url(#arrowNoxGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="208,98 198,92 201,102" fill="#ea580c" />

                {/* Arrow 2: VOCs into Cloud */}
                <path
                  d="M 135 180 C 180 180, 185 130, 205 116"
                  stroke="url(#arrowVocGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="208,116 201,112 198,122" fill="#ea580c" />

                {/* Arrow 3: Cloud into Ozone */}
                <path
                  d="M 315 102 C 345 95, 365 75, 400 64"
                  stroke="url(#arrowO3Grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="405,62 394,61 398,71" fill="#0284c7" />

                {/* Arrow 4: Cloud into PAN */}
                <path
                  d="M 315 118 C 345 125, 360 155, 395 174"
                  stroke="url(#arrowPanGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="400,176 390,172 395,182" fill="#e11d48" />
              </svg>
            </div>
          </motion.div>

          {/* Floating Quote Card */}
          <motion.div
            className="air-photochem-quote-card"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="air-photochem-quote-mark">“</span>
            <p className="air-photochem-quote-text">
              Sunlight drives chemical reactions between NOx and VOCs, leading to the formation
              of ozone and other secondary pollutants, which contribute to smog and affect human
              health and the environment.
            </p>
          </motion.div>
        </div>

        {/* ─── 2. MAIN MIDDLE GRID: 3 CARDS ─── */}
        <div className="air-photochem-main-grid">
          {/* ═══════════════════════════════════════════════════════ */}
          {/* CARD 1: WHAT ARE PHOTOCHEMICAL CHANGES?                 */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="air-panel-header">
              <div className="air-panel-icon-badge">
                <Lightbulb size={16} />
              </div>
              <h3 className="air-panel-title">What are Photochemical Changes?</h3>
            </div>

            {/* Split Comparison Image: Clean Skyline vs Smoggy Skyline */}
            <div
              className="air-split-visual-container"
              ref={sliderRef}
              title="Drag slider or click to compare clean air with photochemical smog haze"
            >
              {/* Polluted Hazy Smog Layer (Base) */}
              <div className="air-split-layer">
                <img
                  src="/images/air-polluted-cityscape.jpg"
                  alt="City skyline enveloped in dense brown photochemical smog haze"
                  className="air-split-img"
                />
              </div>

              {/* Clean Sky Layer (Clipped Overlay) */}
              <div
                className="air-split-layer"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src="/images/air-clean-cityscape.jpg"
                  alt="Pristine clear blue sky above modern city skyscrapers"
                  className="air-split-img"
                />
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="air-split-handle-line"
                style={{ left: `${sliderPos}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={() => setIsDragging(true)}
              >
                <div className="air-split-handle-circle">
                  <ChevronLeft size={10} />
                  <ChevronRight size={10} />
                </div>
              </div>
            </div>

            {/* Cyan Bullet Points */}
            <ul className="air-bullet-list-cyan">
              <li>
                <span className="air-cyan-dot" />
                <span>Chemical reactions triggered by sunlight (UV radiation) in the presence of pollutants.</span>
              </li>
              <li>
                <span className="air-cyan-dot" />
                <span>Involve NOx, VOCs and other atmospheric chemicals.</span>
              </li>
              <li>
                <span className="air-cyan-dot" />
                <span>Lead to formation of secondary pollutants like ozone, PAN, aldehydes, etc.</span>
              </li>
              <li>
                <span className="air-cyan-dot" />
                <span>Responsible for photochemical smog.</span>
              </li>
            </ul>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* CARD 2: MECHANISM OF PHOTOCHEMICAL REACTIONS             */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="air-panel-header">
              <div className="air-panel-icon-badge">
                <Settings size={16} />
              </div>
              <h3 className="air-panel-title">Mechanism of Photochemical Reactions</h3>
            </div>

            <div className="air-mech-steps-wrap">
              {/* Top Row: Step 1 and Step 2 */}
              <div className="air-mech-top-row">
                {/* Step 1: UV Radiation */}
                <div className="air-mech-step-box">
                  <div className="air-mech-step-head">
                    <span className="air-mech-step-badge badge-amber">1</span>
                    <span className="air-mech-step-title">UV Radiation</span>
                  </div>
                  <span className="air-mech-step-sub">photolysis of NO₂</span>
                  <div className="air-mech-equation">
                    NO₂ ──(hν)──&gt; NO + O
                  </div>
                </div>

                {/* Step 2: Ozone Formation */}
                <div className="air-mech-step-box">
                  <div className="air-mech-step-head">
                    <span className="air-mech-step-badge badge-blue">2</span>
                    <span className="air-mech-step-title">Ozone Formation</span>
                  </div>
                  <span className="air-mech-step-sub">Ozone (O₃)</span>
                  <div className="air-mech-equation">
                    O + O₂ + M ──&gt; O₃ + M
                  </div>
                </div>
              </div>

              {/* Bottom Box: Step 3 Secondary Reactions */}
              <div className="air-mech-step-bot">
                <div className="air-mech-step-head">
                  <span className="air-mech-step-badge badge-purple">3</span>
                  <span className="air-mech-step-title">Secondary Reactions</span>
                  <span className="air-mech-loop-badge ml-auto">
                    ⟲ Catalytic Loop
                  </span>
                </div>

                <ul className="air-mech-bot-list">
                  <li>• NO reacts with O₃ → NO₂ (completes cycle)</li>
                  <li>• VOCs react with NOₓ and O₃ to form PAN, aldehydes, peroxy radicals, etc.</li>
                  <li>• These secondary pollutants accumulate in the lower atmosphere.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* CARD 3: MAJOR POLLUTANTS INVOLVED                        */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="air-panel-header">
              <div className="air-panel-icon-badge">
                <Atom size={16} />
              </div>
              <h3 className="air-panel-title">Major Pollutants Involved</h3>
            </div>

            <div className="air-pollutants-cards-col">
              {/* Pollutant 1: Nitrogen Oxides */}
              <div className="air-pollutant-subcard subcard-nox">
                <div className="air-molecule-render-box">
                  <MoleculeNOx />
                </div>
                <div className="air-pollutant-info">
                  <h4 className="air-pollutant-card-title">Nitrogen Oxides (NOx)</h4>
                  <ul className="air-pollutant-card-list">
                    <li>• NO, NO₂</li>
                    <li>• From vehicle exhaust, thermal power plants, and industrial processes</li>
                    <li>• Act as catalysts in photochemical reactions</li>
                  </ul>
                </div>
              </div>

              {/* Pollutant 2: Volatile Organic Compounds */}
              <div className="air-pollutant-subcard subcard-voc">
                <div className="air-molecule-render-box">
                  <MoleculeVOC />
                </div>
                <div className="air-pollutant-info">
                  <h4 className="air-pollutant-card-title">Volatile Organic Compounds (VOCs)</h4>
                  <ul className="air-pollutant-card-list">
                    <li>• Hydrocarbons, solvents, fuel vapors</li>
                    <li>• From vehicles, refineries, industries, paints and household products</li>
                    <li>• React with NOx in sunlight to form oxidants and ozone</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── 3. LOWER GRID: 3 CARDS ─── */}
        <div className="air-photochem-lower-grid">
          {/* ═══════════════════════════════════════════════════════ */}
          {/* CARD 4: PRODUCTS OF PHOTOCHEMICAL REACTIONS             */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="air-panel-header">
              <div className="air-panel-icon-badge">
                <FlaskConical size={16} />
              </div>
              <h3 className="air-panel-title">Products of Photochemical Reactions</h3>
            </div>

            <div className="air-products-grid">
              {/* Product 1: Ground-level Ozone */}
              <div className="air-product-mini-card">
                <div className="air-product-molecule-box">
                  <MoleculeOzone />
                </div>
                <span className="air-product-name">Ground-level Ozone (O₃)</span>
                <span className="air-product-sub">Major component of photochemical smog</span>
              </div>

              {/* Product 2: PAN */}
              <div className="air-product-mini-card">
                <div className="air-product-molecule-box">
                  <MoleculePAN />
                </div>
                <span className="air-product-name">PAN (Peroxyacetyl Nitrate)</span>
                <span className="air-product-sub">Strong oxidant, irritates eyes and lungs</span>
              </div>

              {/* Product 3: Aldehydes */}
              <div className="air-product-mini-card">
                <div className="air-product-molecule-box">
                  <MoleculeAldehyde />
                </div>
                <span className="air-product-name">Aldehydes (e.g., Formaldehyde)</span>
                <span className="air-product-sub">Toxic and carcinogenic</span>
              </div>

              {/* Product 4: Peroxy Radicals */}
              <div className="air-product-mini-card">
                <div className="air-product-molecule-box">
                  <MoleculePeroxy />
                </div>
                <span className="air-product-name">Peroxy Radicals (e.g., RO₂•)</span>
                <span className="air-product-sub">Highly reactive, contribute to oxidant formation</span>
              </div>

              {/* Product 5: Other Oxidants */}
              <div className="air-product-mini-card">
                <div className="air-product-molecule-box">
                  <MoleculeOther />
                </div>
                <span className="air-product-name">Other Oxidants</span>
                <span className="air-product-sub">Organic nitrates, ketones and secondary aerosols</span>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* CARD 5: EFFECTS OF PHOTOCHEMICAL SMOG                   */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="air-panel-header">
              <div className="air-panel-icon-badge">
                <Heart size={16} />
              </div>
              <h3 className="air-panel-title">Effects of Photochemical Smog</h3>
            </div>

            <div className="air-effects-rows-col">
              {/* Row 1: Human Health */}
              <div className="air-effect-row-item">
                <div className="air-effect-category-badge badge-health">
                  <span>Human Health</span>
                </div>
                <ul className="air-effect-bullets">
                  <li>• Eye, nose and throat irritation</li>
                  <li>• Respiratory problems (asthma, reduced lung function)</li>
                  <li>• Reduced resistance to infections</li>
                </ul>
              </div>

              {/* Row 2: Environment */}
              <div className="air-effect-row-item">
                <div className="air-effect-category-badge badge-env">
                  <span>Environment</span>
                </div>
                <ul className="air-effect-bullets">
                  <li>• Damage to crops and forests</li>
                  <li>• Reduced photosynthesis</li>
                  <li>• Harm to wildlife</li>
                </ul>
              </div>

              {/* Row 3: Materials */}
              <div className="air-effect-row-item">
                <div className="air-effect-category-badge badge-mat">
                  <span>Materials</span>
                </div>
                <ul className="air-effect-bullets">
                  <li>• Degradation of rubber, plastics, paints and fabrics</li>
                  <li>• Damage to buildings and monuments</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* CARD 6: CONTROL MEASURES                                */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="air-panel-header">
              <div className="air-panel-icon-badge">
                <ShieldCheck size={16} />
              </div>
              <h3 className="air-panel-title">Control Measures</h3>
            </div>

            <ul className="air-control-checklist">
              <li className="air-control-item">
                <div className="air-control-check-icon">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Reduce vehicular emissions (use of cleaner fuels, catalytic converters)</span>
              </li>
              <li className="air-control-item">
                <div className="air-control-check-icon">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Control industrial emissions (NOx and VOCs)</span>
              </li>
              <li className="air-control-item">
                <div className="air-control-check-icon">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Use of low-VOC paints and solvents</span>
              </li>
              <li className="air-control-item">
                <div className="air-control-check-icon">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Implement fuel vapor recovery systems</span>
              </li>
              <li className="air-control-item">
                <div className="air-control-check-icon">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Promote clean energy and public transport</span>
              </li>
              <li className="air-control-item">
                <div className="air-control-check-icon">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Monitor and maintain air quality standards (NAAQS)</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ─── 4. BOTTOM RIBBON: KEY TAKEAWAYS ─── */}
        <motion.div
          className="air-photochem-takeaways-bar"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="air-takeaways-lead">
            <Lightbulb size={16} className="text-amber-300" />
            <span className="air-takeaways-lead-title">Key Takeaways</span>
          </div>

          <div className="air-takeaways-pills-row">
            {/* Pill 1: Sunlight drives reactions */}
            <div className="air-takeaway-pill">
              <div className="air-takeaway-pill-icon icon-sun">
                <Sun size={12} />
              </div>
              <span>Sunlight drives chemical reactions between NOx and VOCs in the atmosphere.</span>
            </div>

            {/* Pill 2: Leads to ozone, PAN, aldehydes */}
            <div className="air-takeaway-pill">
              <div className="air-takeaway-pill-icon icon-cloud">
                <Cloud size={12} />
              </div>
              <span>Leads to formation of ozone, PAN, aldehydes and other secondary pollutants.</span>
            </div>

            {/* Pill 3: Causes smog */}
            <div className="air-takeaway-pill">
              <div className="air-takeaway-pill-icon icon-warning">
                <AlertTriangle size={12} />
              </div>
              <span>Causes photochemical smog, affecting human health, environment and materials.</span>
            </div>

            {/* Pill 4: Can be reduced */}
            <div className="air-takeaway-pill">
              <div className="air-takeaway-pill-icon icon-leaf">
                <Leaf size={12} />
              </div>
              <span>Can be reduced by controlling emissions and using cleaner technologies.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PhotochemicalScreen;
