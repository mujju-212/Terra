import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Key,
  Check,
  Info,
  ChevronLeft,
  ChevronRight,
  Factory,
  Car,
  Zap,
  HardHat,
  Flame,
  Home,
  Mountain,
  Waves,
  Flower2,
  Wind,
  Leaf,
  X,
  ExternalLink,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { useModalScrollLock } from './useModalScrollLock';

/* ─── INTERFACES ─── */
interface RealViewItem {
  id: string;
  title: string;
  image: string;
  category: string;
  keyPollutants: string[];
  description: string;
  syllabusNotes: string[];
  impactLevel: 'High' | 'Severe' | 'Critical';
}

const REAL_VIEW_DATA: RealViewItem[] = [
  {
    id: 'industrial',
    title: 'Industrial Emissions',
    image: '/images/air-real-industrial.jpg?v=2',
    category: 'Stationary Point Sources',
    keyPollutants: ['SO₂ (Sulphur Dioxide)', 'NOₓ (Nitrogen Oxides)', 'Fly Ash & SPM', 'CO', 'Heavy Metals'],
    description:
      'Continuous plumes discharged from industrial smokestacks, chemical manufacturing plants, metal smelters, and petroleum refining complexes.',
    syllabusNotes: [
      'Major contributor to industrial smog and regional acid rain precipitation (pH < 5.6).',
      'Requires abatement equipment such as Electrostatic Precipitators (ESP), cyclone separators, and wet scrubbers.',
      'Syllabus standard: regulated under CPCB emission thresholds and National Ambient Air Quality Standards (NAAQS).',
    ],
    impactLevel: 'Severe',
  },
  {
    id: 'vehicles',
    title: 'Vehicle Emissions',
    image: '/images/air-real-vehicles.jpg?v=2',
    category: 'Mobile Line Sources',
    keyPollutants: ['CO (Carbon Monoxide)', 'NOₓ', 'Unburnt Hydrocarbons (HC)', 'PM2.5', 'Lead / VOCs'],
    description:
      'Exhaust gases emitted directly at street level by petrol and diesel motor vehicles, stop-and-go city traffic, and heavy freight haulage.',
    syllabusNotes: [
      'Primary catalyst for photochemical smog formation when NO₂ reacts with sunlight and hydrocarbons.',
      'Incomplete combustion generates lethal CO, which binds to blood haemoglobin forming carboxyhaemoglobin.',
      'Urban street canyon effect concentrates micro-particles directly in the human inhalation zone.',
    ],
    impactLevel: 'Critical',
  },
  {
    id: 'construction',
    title: 'Construction Dust',
    image: '/images/air-real-construction.jpg?v=2',
    category: 'Fugitive Area Sources',
    keyPollutants: ['Coarse SPM (PM10)', 'Fine PM2.5', 'Free Silica (SiO₂)', 'Cement Particles', 'Mineral Dust'],
    description:
      'Airborne mineral particulates released during heavy excavation, structural demolition, cement handling, and transit on unpaved haul roads.',
    syllabusNotes: [
      'Causes intense localized particulate spikes, severely exceeding 24-hr NAAQS limits (100 µg/m³ for PM10).',
      'Chronic exposure causes pulmonary fibrosis and occupational silicosis in construction workers.',
      'Settles on nearby vegetation, coating leaves and choking stomata to disrupt plant photosynthesis.',
    ],
    impactLevel: 'High',
  },
  {
    id: 'agriculture',
    title: 'Agricultural Burning',
    image: '/images/air-real-agriculture.jpg?v=2',
    category: 'Open Biomass Burning',
    keyPollutants: ['Black Carbon (Soot)', 'Carbon Monoxide (CO)', 'PM2.5', 'PAHs (Carcinogens)', 'Methane (CH₄)'],
    description:
      'Open-field post-harvest residue and crop stubble combustion practiced across intensive agricultural plains during seasonal changeovers.',
    syllabusNotes: [
      'Produces severe trans-boundary smoke plumes that travel hundreds of kilometres under winter temperature inversions.',
      'Low-temperature smoldering incomplete combustion maximizes toxic organic emissions and ultra-fine carbon.',
      'Major driver of hazardous AQI (> 400 "Severe") across Northern India during October–November.',
    ],
    impactLevel: 'Critical',
  },
  {
    id: 'smog',
    title: 'Urban Smog',
    image: '/images/air-real-urban-smog.jpg?v=2',
    category: 'Secondary Atmospheric Haze',
    keyPollutants: ['Ground-level Ozone (O₃)', 'Peroxyacetyl Nitrate (PAN)', 'Nitrogen Dioxide (NO₂)', 'Aerosol Sulfates'],
    description:
      'Dense secondary photochemical or reducing smog canopy blanketing major metropolitan centres, reducing visibility below 1000 metres.',
    syllabusNotes: [
      'Photochemical smog is formed through UV-driven chain reactions between NOₓ and reactive hydrocarbons.',
      'Causes acute bronchoconstriction, stinging eye irritation from PAN, and massive cardiovascular distress.',
      'Historic precedent: 1952 Great Smog of London demonstrated catastrophic mortality from coal smoke and sulfurous fog.',
    ],
    impactLevel: 'Critical',
  },
];

/* ─── 3D SPHERICAL GRAPHICS FOR FORMS OF POLLUTANTS ─── */
function GasSphereGraphic() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="air-sphere-svg">
      <defs>
        <radialGradient id="gasSphereGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="35%" stopColor="#ef4444" />
          <stop offset="70%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
        <radialGradient id="gasGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <filter id="gasBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* Outer ambient glow */}
      <circle cx="50" cy="50" r="44" fill="url(#gasGlow)" />
      {/* Main Sphere Body */}
      <circle cx="50" cy="50" r="32" fill="url(#gasSphereGrad)" />
      {/* Micro-gas cloud speckles */}
      <circle cx="42" cy="38" r="4" fill="#fee2e2" opacity="0.65" />
      <circle cx="36" cy="48" r="3" fill="#fecaca" opacity="0.5" />
      <circle cx="58" cy="44" r="3.5" fill="#fca5a5" opacity="0.55" />
      <circle cx="52" cy="58" r="4.5" fill="#991b1b" opacity="0.7" />
      <circle cx="45" cy="62" r="3" fill="#7f1d1d" opacity="0.6" />
      {/* Orbiting molecular gas nodes */}
      <circle cx="20" cy="32" r="2.5" fill="#ef4444" opacity="0.75" />
      <circle cx="78" cy="30" r="2" fill="#f87171" opacity="0.7" />
      <circle cx="82" cy="64" r="3" fill="#ef4444" opacity="0.6" />
      <circle cx="22" cy="68" r="2.5" fill="#fca5a5" opacity="0.6" />
      {/* Specular gloss highlight */}
      <ellipse cx="40" cy="36" rx="10" ry="6" transform="rotate(-30 40 36)" fill="#ffffff" opacity="0.35" filter="url(#gasBlur)" />
    </svg>
  );
}

function SolidSphereGraphic() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="air-sphere-svg">
      <defs>
        <radialGradient id="solidSphereGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="35%" stopColor="#94a3b8" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="solidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
        <filter id="solidBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      {/* Outer ambient glow */}
      <circle cx="50" cy="50" r="44" fill="url(#solidGlow)" />
      {/* Main Particulate Sphere */}
      <circle cx="50" cy="50" r="32" fill="url(#solidSphereGrad)" />
      {/* Faceted crystalline dust speckles */}
      <polygon points="44,32 47,35 44,38 41,35" fill="#f8fafc" opacity="0.8" />
      <polygon points="54,42 57,45 54,48 51,45" fill="#cbd5e1" opacity="0.75" />
      <polygon points="36,46 39,48 37,51 34,49" fill="#e2e8f0" opacity="0.7" />
      <polygon points="46,56 50,58 47,62 43,60" fill="#334155" opacity="0.85" />
      <polygon points="58,54 62,56 59,60 55,58" fill="#1e293b" opacity="0.9" />
      {/* Suspended fine aerosol dust specks */}
      <circle cx="22" cy="28" r="2" fill="#2dd4bf" opacity="0.8" />
      <circle cx="76" cy="26" r="2.5" fill="#e2e8f0" opacity="0.75" />
      <circle cx="80" cy="62" r="2" fill="#2dd4bf" opacity="0.7" />
      <circle cx="26" cy="66" r="3" fill="#cbd5e1" opacity="0.6" />
      {/* Crystalline specular facet gleam */}
      <ellipse cx="42" cy="36" rx="9" ry="5" transform="rotate(-25 42 36)" fill="#ffffff" opacity="0.45" filter="url(#solidBlur)" />
    </svg>
  );
}

function LiquidSphereGraphic() {
  return (
    <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="air-sphere-svg">
      <defs>
        <radialGradient id="liquidSphereGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="35%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#082f49" />
        </radialGradient>
        <radialGradient id="liquidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <filter id="liquidBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      {/* Outer ambient glow */}
      <circle cx="50" cy="50" r="44" fill="url(#liquidGlow)" />
      {/* Main Fluid Droplet Sphere */}
      <circle cx="50" cy="50" r="32" fill="url(#liquidSphereGrad)" />
      {/* Internal caustic light refraction */}
      <path
        d="M 38 64 C 44 68 56 68 62 64 C 58 66 42 66 38 64 Z"
        fill="#e0f2fe"
        opacity="0.6"
        filter="url(#liquidBlur)"
      />
      {/* Micro-droplets condensation orbiting */}
      <circle cx="48" cy="46" r="3" fill="#ffffff" opacity="0.5" />
      <circle cx="56" cy="52" r="2.5" fill="#e0f2fe" opacity="0.6" />
      <circle cx="40" cy="54" r="2" fill="#7dd3fc" opacity="0.7" />
      <circle cx="22" cy="34" r="3" fill="#38bdf8" opacity="0.8" />
      <circle cx="76" cy="32" r="2.5" fill="#7dd3fc" opacity="0.75" />
      <circle cx="78" cy="62" r="3.5" fill="#0284c7" opacity="0.7" />
      <circle cx="24" cy="64" r="2" fill="#38bdf8" opacity="0.7" />
      {/* Specular gloss meniscus */}
      <ellipse cx="38" cy="34" rx="8" ry="4.5" transform="rotate(-30 38 34)" fill="#ffffff" opacity="0.7" filter="url(#liquidBlur)" />
    </svg>
  );
}

/* ─── MAIN COMPONENT ─── */
export function AirPollutionScreen() {
  const reducedMotion = useReducedMotion();

  // Split comparison slider state (0 to 100 percentage)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Active photo modal state
  const [activePhotoModal, setActivePhotoModal] = useState<RealViewItem | null>(null);

  // Lock scroll, pause Lenis, route wheel delta and handle Escape
  useModalScrollLock(Boolean(activePhotoModal), () => setActivePhotoModal(null));

  // Drag handling logic for slider
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

  // Modal ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="air-pollution-section" id="ch-pollution">
      {/* ─── 1. TOP INTERACTIVE SPLIT COMPARISON BANNER ─── */}
      <motion.div
        className="air-pollution-hero-banner"
        ref={sliderRef}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* BASE LAYER (Right Side): Polluted Air */}
        <div className="air-slider-layer air-slider-polluted">
          <img
            src="/images/air-polluted-cityscape.jpg?v=2"
            alt="Dense industrial smog and emissions billowing over city skyline"
            className="air-slider-image"
          />
        </div>

        {/* CLIPPED OVERLAY LAYER (Left Side): Clean Air */}
        <div
          className="air-slider-layer air-slider-clean"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src="/images/air-clean-cityscape.jpg?v=2"
            alt="Pristine blue atmosphere and clear clean river basin flowing through green landscape"
            className="air-slider-image"
          />
        </div>

        {/* Soft Vignette Scrim behind left text for 100% legibility */}
        <div className="air-slider-text-scrim" />

        {/* SLIDER DIVIDER LINE & DRAG HANDLE */}
        <div
          className={`air-slider-divider ${isDragging ? 'is-dragging' : ''}`}
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
          role="slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={5}
          aria-valuemax={95}
          aria-label="Clean Air vs Polluted Air comparison slider"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(5, p - 5));
            if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(95, p + 5));
          }}
        >
          <div className="air-slider-divider-line" />
          <div className="air-slider-handle">
            <ChevronLeft size={14} className="air-handle-chevron" />
            <ChevronRight size={14} className="air-handle-chevron" />
          </div>
        </div>

        {/* TOP INTERACTIVE BADGES / PILLS (as seen in Mockup) */}
        <div className="air-slider-top-badges">
          <button
            type="button"
            className={`air-badge-pill air-badge-clean ${sliderPos >= 65 ? 'is-active' : ''}`}
            onClick={() => setSliderPos(80)}
            title="Slide to inspect pristine clean air atmosphere"
          >
            Clean Air
          </button>
          <button
            type="button"
            className={`air-badge-pill air-badge-polluted ${sliderPos <= 35 ? 'is-active' : ''}`}
            onClick={() => setSliderPos(20)}
            title="Slide to inspect dense anthropogenic pollution"
          >
            Polluted Air
          </button>
        </div>

        {/* OVERLAID LEFT TEXT: CHAPTER 02, TITLE, AND DEFINITION */}
        <div className="air-pollution-banner-content">
          <span className="air-pollution-eyebrow">CHAPTER 02</span>
          <h2 className="air-pollution-title">
            Air <span className="air-pollution-title-accent">Pollution</span>
          </h2>
          <p className="air-pollution-banner-desc">
            Air pollution refers to the presence of one or more contaminants in the air in such
            quantities and for such duration as may be injurious to human health, plants, animals,
            property or the general welfare of the community.
          </p>
        </div>

        {/* OVERLAID TOP-RIGHT QUOTE CARD */}
        <div className="air-pollution-quote-card">
          <span className="air-quote-mark">“</span>
          <p className="air-quote-text">
            Clean air supports life.
            <br />
            Polluted air harms health,
            <br />
            environment and property.
          </p>
        </div>
      </motion.div>

      {/* ─── 2. MIDDLE ROW: 3 GLASS CARDS ─── */}
      <div className="air-pollution-mid-grid">
        {/* CARD 1: EXTENDED DEFINITION */}
        <motion.div
          className="air-glass-card air-def-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="air-card-header">
            <div className="air-card-icon-box air-icon-cyan">
              <FileText size={18} />
            </div>
            <h3 className="air-card-title">Extended Definition</h3>
          </div>
          <p className="air-def-card-body">
            Air pollution includes any <strong className="air-highlight-white">physical, chemical or biological agent</strong> in the air that may cause discomfort, harm or nuisance to human beings, other living organisms, damages to property or adversely affect the environment.
          </p>
        </motion.div>

        {/* CARD 2: FORMS OF POLLUTANTS (3 SPHERES) */}
        <motion.div
          className="air-glass-card air-forms-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="air-card-header">
            <h3 className="air-card-title">Forms of Pollutants</h3>
          </div>

          <div className="air-spheres-row">
            {/* Form 1: Gases */}
            <div className="air-sphere-item">
              <GasSphereGraphic />
              <strong className="air-sphere-name air-color-gases">Gases</strong>
              <span className="air-sphere-sub">e.g. SO₂, NOₓ, CO, O₃, VOCs</span>
            </div>

            {/* Form 2: Solid Aerosols */}
            <div className="air-sphere-item">
              <SolidSphereGraphic />
              <strong className="air-sphere-name air-color-solids">Solid Aerosols</strong>
              <span className="air-sphere-sub">e.g. dust, smoke, pollen, ash, SPM</span>
            </div>

            {/* Form 3: Liquid Aerosols */}
            <div className="air-sphere-item">
              <LiquidSphereGraphic />
              <strong className="air-sphere-name air-color-liquids">Liquid Aerosols</strong>
              <span className="air-sphere-sub">e.g. mist, fog, spray droplets</span>
            </div>
          </div>

          {/* Bottom Info Pill */}
          <div className="air-forms-info-pill">
            <Info size={14} className="air-info-icon" />
            <span>Aerosol: any solid or liquid particle suspended in air.</span>
          </div>
        </motion.div>

        {/* CARD 3: KEY FACTS */}
        <motion.div
          className="air-glass-card air-facts-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="air-card-header">
            <div className="air-card-icon-box air-icon-cyan-circle">
              <Key size={16} />
            </div>
            <h3 className="air-card-title">Key Facts</h3>
          </div>

          <ul className="air-facts-list">
            <li className="air-fact-item">
              <span className="air-fact-check-badge">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>
                A pollutant can be in <strong className="air-highlight-gold">solid, liquid or gaseous form</strong>.
              </span>
            </li>
            <li className="air-fact-item">
              <span className="air-fact-check-badge">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>
                Pollutants can be <strong className="air-highlight-gold">natural or anthropogenic</strong> (human-made).
              </span>
            </li>
            <li className="air-fact-item">
              <span className="air-fact-check-badge">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>
                Anthropogenic activities have changed the global air composition by <strong className="air-highlight-gold">&lt; 0.01%</strong>.
              </span>
            </li>
            <li className="air-fact-item">
              <span className="air-fact-check-badge">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>
                Both natural and human activities contribute to air pollution.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* ─── 3. BOTTOM ROW: SOURCES & REAL VIEW CARDS ─── */}
      <div className="air-pollution-bottom-grid">
        {/* BOTTOM LEFT: SOURCES OF AIR POLLUTANTS */}
        <motion.div
          className="air-glass-card air-sources-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="air-card-header" style={{ marginBottom: '14px' }}>
            <h3 className="air-card-title">Sources of Air Pollutants</h3>
          </div>

          <div className="air-sources-split-grid">
            {/* NATURAL SOURCES (Green theme) */}
            <div className="air-source-col air-col-natural">
              <div className="air-source-col-head">
                <div className="air-source-icon-badge air-badge-green">
                  <Leaf size={16} />
                </div>
                <span className="air-source-col-title air-text-green">Natural Sources</span>
              </div>
              <ul className="air-source-items-list">
                <li className="air-source-subitem">
                  <Mountain size={14} className="air-subitem-icon air-text-green" />
                  <span>Volcanic ash</span>
                </li>
                <li className="air-source-subitem">
                  <Waves size={14} className="air-subitem-icon air-text-green" />
                  <span>Sea salt particles</span>
                </li>
                <li className="air-source-subitem">
                  <Flower2 size={14} className="air-subitem-icon air-text-green" />
                  <span>Pollen and spores</span>
                </li>
                <li className="air-source-subitem">
                  <Flame size={14} className="air-subitem-icon air-text-green" />
                  <span>Smoke from forest fires</span>
                </li>
                <li className="air-source-subitem">
                  <Wind size={14} className="air-subitem-icon air-text-green" />
                  <span>Windblown dust</span>
                </li>
              </ul>
            </div>

            {/* ANTHROPOGENIC SOURCES (Amber theme) */}
            <div className="air-source-col air-col-anthro">
              <div className="air-source-col-head">
                <div className="air-source-icon-badge air-badge-amber">
                  <Factory size={16} />
                </div>
                <span className="air-source-col-title air-text-amber">Anthropogenic Sources</span>
              </div>
              <ul className="air-source-items-list">
                <li className="air-source-subitem">
                  <Factory size={14} className="air-subitem-icon air-text-amber" />
                  <span>Industrial emissions</span>
                </li>
                <li className="air-source-subitem">
                  <Car size={14} className="air-subitem-icon air-text-amber" />
                  <span>Vehicle exhaust</span>
                </li>
                <li className="air-source-subitem">
                  <Zap size={14} className="air-subitem-icon air-text-amber" />
                  <span>Thermal power plants</span>
                </li>
                <li className="air-source-subitem">
                  <HardHat size={14} className="air-subitem-icon air-text-amber" />
                  <span>Construction activities</span>
                </li>
                <li className="air-source-subitem">
                  <Flame size={14} className="air-subitem-icon air-text-amber" />
                  <span>Agricultural burning</span>
                </li>
                <li className="air-source-subitem">
                  <Home size={14} className="air-subitem-icon air-text-amber" />
                  <span>Domestic fuel combustion</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM RIGHT: ATMOSPHERIC POLLUTANTS IN REAL VIEW */}
        <motion.div
          className="air-glass-card air-real-view-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="air-card-header" style={{ marginBottom: '14px' }}>
            <h3 className="air-card-title">Atmospheric Pollutants in Real View</h3>
          </div>

          <div className="air-real-view-row">
            {REAL_VIEW_DATA.map((item) => (
              <button
                key={item.id}
                type="button"
                className="air-real-photo-btn"
                onClick={() => setActivePhotoModal(item)}
                title={`Click to inspect ${item.title}`}
              >
                <div className="air-real-photo-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="air-real-photo-img"
                    loading="lazy"
                  />
                  <div className="air-real-photo-scrim">
                    <Eye size={16} className="air-real-photo-eye" />
                  </div>
                </div>
                <span className="air-real-photo-caption">{item.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── 4. LIGHTBOX / DETAIL MODAL FOR REAL VIEW POLLUTANTS ─── */}
      <AnimatePresence>
        {activePhotoModal && (
          <div
            className="air-photo-modal-backdrop"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            onClick={() => setActivePhotoModal(null)}
          >
            <motion.div
              className="air-photo-modal-dialog"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="air-modal-header-banner">
                <img
                  src={activePhotoModal.image}
                  alt={activePhotoModal.title}
                  className="air-modal-banner-img"
                />
                <div className="air-modal-banner-scrim" />
                <button
                  type="button"
                  className="air-modal-close-btn"
                  onClick={() => setActivePhotoModal(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
                <div className="air-modal-banner-text">
                  <span className="air-modal-badge">{activePhotoModal.category}</span>
                  <h3 className="air-modal-title">{activePhotoModal.title}</h3>
                </div>
              </div>

              <div className="air-modal-body">
                <p className="air-modal-desc">{activePhotoModal.description}</p>

                <div className="air-modal-key-pollutants">
                  <span className="air-modal-label">Key Chemical Constituents:</span>
                  <div className="air-modal-chips-wrap">
                    {activePhotoModal.keyPollutants.map((chem) => (
                      <span key={chem} className="air-modal-chem-chip">
                        {chem}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="air-modal-syllabus-section">
                  <span className="air-modal-label">BCV755B Syllabus Notes:</span>
                  <ul className="air-modal-notes-list">
                    {activePhotoModal.syllabusNotes.map((note, idx) => (
                      <li key={idx} className="air-modal-note-item">
                        <Check size={14} className="air-text-cyan air-note-check" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="air-modal-footer">
                <span className="air-modal-impact">
                  Impact Severity:{' '}
                  <strong className={activePhotoModal.impactLevel === 'Critical' ? 'air-color-gases' : 'air-text-amber'}>
                    {activePhotoModal.impactLevel}
                  </strong>
                </span>
                <button
                  type="button"
                  className="air-modal-done-btn"
                  onClick={() => setActivePhotoModal(null)}
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
