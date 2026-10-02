import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Sun,
  Droplets,
  CloudRain,
  TreePine,
  Layers,
  Sparkles,
  RefreshCw,
  Zap,
  Globe,
  Users,
  Settings,
  ArrowRight,
  GraduationCap,
  X,
  Info,
  CheckCircle2,
  Mountain,
  Trees,
  Footprints,
  Flame,
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

/* --------------------------------------------------------------------------
   DATA TYPES & STRUCTURES
   -------------------------------------------------------------------------- */
interface EcologicalFunction {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  details: {
    scientificRole: string;
    keyProcesses: string[];
    importance: string;
  };
}

const ECOLOGICAL_FUNCTIONS: EcologicalFunction[] = [
  {
    id: 'primary-productivity',
    title: 'Primary Productivity',
    desc: 'Conversion of solar energy into biomass.',
    icon: <Leaf className="w-4 h-4 text-emerald-400" />,
    color: '#22c55e',
    details: {
      scientificRole: 'Photosynthetic Fixation of Radiant Energy',
      keyProcesses: [
        'Chlorophyll-mediated photon capture (400–700 nm PAR)',
        'Synthesis of glucose and cellulose: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
        'Generation of all foundational terrestrial and aquatic biomass',
      ],
      importance: 'Sets the biological energy budget and carrying capacity for every subsequent trophic level on Earth.',
    },
  },
  {
    id: 'nutrient-cycling',
    title: 'Nutrient Cycling',
    desc: 'Recycling of essential elements (carbon, nitrogen, phosphorus, etc.).',
    icon: <RefreshCw className="w-4 h-4 text-sky-400" />,
    color: '#38bdf8',
    details: {
      scientificRole: 'Biogeochemical Material Circulation',
      keyProcesses: [
        'Gaseous cycles: Carbon and Nitrogen circulation between atmosphere and organisms',
        'Sedimentary cycles: Phosphorus and Sulfur weathering and biological assimilation',
        'Bacterial mineralization by saprotrophs restoring inorganic ions to soil',
      ],
      importance: 'Prevents finite bio-essential nutrients from becoming permanently trapped in dead organic matter.',
    },
  },
  {
    id: 'climate-regulation',
    title: 'Climate Regulation',
    desc: 'Maintains temperature, rainfall patterns and carbon balance.',
    icon: <CloudRain className="w-4 h-4 text-cyan-400" />,
    color: '#06b6d4',
    details: {
      scientificRole: 'Biospheric Thermal & Carbon Buffering',
      keyProcesses: [
        'Terrestrial vegetation absorbing ~30% of anthropogenic fossil CO₂ emissions',
        'Evapotranspiration by canopies seeding cloud condensation nuclei and rainfall',
        'Albedo regulation across biomes moderating surface temperature fluctuations',
      ],
      importance: 'Stabilizes the global climate system and mitigates extreme meteorological oscillations.',
    },
  },
  {
    id: 'water-purification',
    title: 'Water Purification',
    desc: 'Filters pollutants and maintains water quality.',
    icon: <Droplets className="w-4 h-4 text-blue-400" />,
    color: '#3b82f6',
    details: {
      scientificRole: 'Hydrological Biofiltration & Aquifer Recharge',
      keyProcesses: [
        'Riparian wetlands trapping suspended sediments and agricultural runoff',
        'Microbial denitrification and heavy metal sequestration by aquatic plants',
        'Forest soil infiltration recharging unconfined groundwater tables with pure water',
      ],
      importance: 'Provides natural water treatment services valued in trillions of dollars globally without industrial energy costs.',
    },
  },
  {
    id: 'soil-formation',
    title: 'Soil Formation and Fertility',
    desc: 'Builds soil and maintains nutrient content.',
    icon: <Layers className="w-4 h-4 text-amber-400" />,
    color: '#f59e0b',
    details: {
      scientificRole: 'Pedogenesis & Humus Enrichment',
      keyProcesses: [
        'Biological weathering of bedrocks by lichen acids and expanding root systems',
        'Earthworm and micro-arthropod bioturbation creating soil porosity and aeration',
        'Humification: formation of colloidal humus retaining water and cation exchange',
      ],
      importance: 'Forms the topsoil reservoir indispensable for agriculture, forest growth, and continental life.',
    },
  },
  {
    id: 'habitat-provision',
    title: 'Habitat Provision',
    desc: 'Supports diverse species and ecological interactions.',
    icon: <Footprints className="w-4 h-4 text-purple-400" />,
    color: '#a855f7',
    details: {
      scientificRole: 'Ecological Niche Diversification',
      keyProcesses: [
        'Structural complexity in layered forest canopies and coral reef topographies',
        'Shelter, breeding roosts, nurseries, and migratory stopovers for wildlife',
        'Maintenance of evolutionary pressure through symbiosis, mutualism, and predation',
      ],
      importance: 'Preserves planetary genetic and species diversity, safeguarding ecosystem resilience against shocks.',
    },
  },
];

const KEY_TAKEAWAYS = [
  {
    id: 'services',
    text: 'Ecosystems provide essential life support services.',
    icon: <Globe className="w-4 h-4 text-sky-400" />,
    color: '#38bdf8',
  },
  {
    id: 'regulate',
    text: 'They regulate climate, cycle nutrients and purify air and water.',
    icon: <Leaf className="w-4 h-4 text-emerald-400" />,
    color: '#22c55e',
  },
  {
    id: 'stability',
    text: 'Biodiversity enhances ecosystem stability and resilience.',
    icon: <Users className="w-4 h-4 text-amber-400" />,
    color: '#f59e0b',
  },
  {
    id: 'wellbeing',
    text: 'Conserving ecosystems ensures long-term human well-being and a sustainable future.',
    icon: <Settings className="w-4 h-4 text-cyan-400" />,
    color: '#06b6d4',
  },
];

export function BioSignificanceScreen() {
  const [selectedFunction, setSelectedFunction] = useState<EcologicalFunction | null>(null);
  const [activeCycleHover, setActiveCycleHover] = useState<string | null>(null);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedFunction !== null, () => setSelectedFunction(null));

  const handleNextClick = () => {
    const el = document.getElementById('ch-economic') || document.getElementById('ch-summary');
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToPanel = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -80, duration: 0.9 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section className="bio-screen bio-significance-section" id="ch-significance">
      <div className="bio-significance-container">
        {/* ===================================================================
            TOP HERO ROW: Title Block (Left) | Visual Ecological Flow (Right)
            =================================================================== */}
        <div className="bio-sig-hero-card">
          {/* Panoramic Scenery Backdrop */}
          <div className="bio-sig-hero-bg-wrap">
            <img
              src="/images/bio-significance/hero-panorama.jpg"
              alt="Alpine Ecosystem with Deer, Heron, River and Mountains"
              className="bio-sig-hero-bg-img"
            />
            <div className="bio-sig-hero-gradient-overlay" />
          </div>

          {/* Left Title & Introduction */}
          <div className="bio-sig-hero-left">
            <div className="bio-sig-badge">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 09</span>
            </div>

            <h1 className="bio-sig-title">
              Functions and Significance of Ecosystems
            </h1>

            <h2 className="bio-sig-subtitle">
              Life Support Systems for a Sustainable Planet
            </h2>

            <p className="bio-sig-lead">
              Ecosystems provide essential goods and services that sustain life on Earth. They regulate climate, cycle nutrients,
              purify air and water, support biodiversity and contribute to human well-being and economic development.
            </p>
          </div>

          {/* Right: Integrated Superimposed Cycle Flow on Scenery */}
          <div className="bio-sig-hero-flow-stage">
            {/* SVG Connecting Flow Lines with Directional Arrows */}
            <svg className="bio-sig-flow-svg" viewBox="0 0 380 230" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="sigSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="sigEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <linearGradient id="sigDecompGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="sigNutrientGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <marker id="sigArrowGold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
                </marker>
                <marker id="sigArrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* 1. Sun -> Producers */}
              <path
                d="M 175 42 L 140 85"
                fill="none"
                stroke="url(#sigSunGrad)"
                strokeWidth="2.2"
                strokeDasharray="4 2"
                markerEnd="url(#sigArrowGold)"
                className="sig-path-flow"
              />

              {/* 2. Sun -> Consumers */}
              <path
                d="M 205 42 L 240 85"
                fill="none"
                stroke="url(#sigSunGrad)"
                strokeWidth="2.2"
                strokeDasharray="4 2"
                markerEnd="url(#sigArrowGold)"
                className="sig-path-flow"
              />

              {/* 3. Producers -> Consumers (Energy Flow) */}
              <path
                d="M 155 105 L 225 105"
                fill="none"
                stroke="url(#sigEnergyGrad)"
                strokeWidth="2.8"
                markerEnd="url(#sigArrowGold)"
              />

              {/* 4. Consumers -> Decomposers */}
              <path
                d="M 245 130 Q 240 160 210 170"
                fill="none"
                stroke="url(#sigDecompGrad)"
                strokeWidth="2.5"
                markerEnd="url(#sigArrowGold)"
              />

              {/* 5. Producers -> Decomposers */}
              <path
                d="M 135 130 Q 140 160 170 170"
                fill="none"
                stroke="url(#sigDecompGrad)"
                strokeWidth="2"
                strokeDasharray="3 2"
                markerEnd="url(#sigArrowGold)"
              />

              {/* 6. Decomposers -> Nutrient Cycling Loop back to Producers */}
              <path
                d="M 165 185 C 100 195 85 140 115 110"
                fill="none"
                stroke="url(#sigNutrientGrad)"
                strokeWidth="3.2"
                strokeDasharray="5 3"
                markerEnd="url(#sigArrowCyan)"
                className="sig-path-active"
              />
            </svg>

            {/* Node: Sun / Solar Energy */}
            <div
              className="bio-sig-node sig-node-sun"
              style={{ left: '50%', top: '15%' }}
              onMouseEnter={() => setActiveCycleHover('sun')}
              onMouseLeave={() => setActiveCycleHover(null)}
            >
              <div className="bio-sig-sun-disc">
                <Sun className="w-5 h-5 text-amber-300 animate-spin-slow" />
              </div>
              <div className="bio-sig-sun-pill">
                <strong>Solar Energy</strong>
                <small>(drives ecosystem)</small>
              </div>
            </div>

            {/* Node: Producers (Plants) */}
            <div
              className="bio-sig-node sig-node-producers"
              style={{ left: '26%', top: '48%' }}
              onMouseEnter={() => setActiveCycleHover('producers')}
              onMouseLeave={() => setActiveCycleHover(null)}
            >
              <div className="bio-sig-node-circle circle-producers">
                <TreePine className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="bio-sig-node-label">
                <strong>Producers</strong>
                <small>(Plants)</small>
              </div>
            </div>

            {/* Energy Flow Banner Between Producers & Consumers */}
            <div className="bio-sig-energy-flow-pill" style={{ left: '50%', top: '46%' }}>
              <span>Energy Flow</span>
            </div>

            {/* Node: Consumers (Animals) */}
            <div
              className="bio-sig-node sig-node-consumers"
              style={{ left: '74%', top: '48%' }}
              onMouseEnter={() => setActiveCycleHover('consumers')}
              onMouseLeave={() => setActiveCycleHover(null)}
            >
              <div className="bio-sig-node-circle circle-consumers">
                <Footprints className="w-5 h-5 text-amber-300" />
              </div>
              <div className="bio-sig-node-label">
                <strong>Consumers</strong>
                <small>(Animals)</small>
              </div>
            </div>

            {/* Node: Decomposers (Bacteria, Fungi) */}
            <div
              className="bio-sig-node sig-node-decomposers"
              style={{ left: '50%', top: '80%' }}
              onMouseEnter={() => setActiveCycleHover('decomposers')}
              onMouseLeave={() => setActiveCycleHover(null)}
            >
              <div className="bio-sig-node-circle circle-decomposers">
                <Sparkles className="w-4 h-4 text-orange-300" />
              </div>
              <div className="bio-sig-node-label">
                <strong>Decomposers</strong>
                <small>(Bacteria, Fungi)</small>
              </div>
            </div>

            {/* Nutrient Cycling Pill on the Loop */}
            <div className="bio-sig-nutrient-pill" style={{ left: '80%', top: '78%' }}>
              <span>Nutrient Cycling</span>
            </div>
          </div>

          {/* Top-Right Liquid Glass Quote Card */}
          <div className="bio-sig-hero-quote-card">
            <span className="bio-sig-quote-mark">❝</span>
            <p className="bio-sig-quote-body">
              Healthy ecosystems are the foundation of healthy societies, strong economies and a stable climate.
            </p>
          </div>
        </div>

        {/* ===================================================================
            MIDDLE SECTION: 3 PANELS ROW (Functions, Productivity, Succession)
            =================================================================== */}
        <div className="bio-sig-middle-row">
          {/* PANEL 1: 1 Ecological Functions (Left) */}
          <div className="bio-sig-panel bio-sig-panel-functions" id="panel-functions">
            <div className="bio-sig-panel-header">
              <div className="bio-sig-step-badge step-green">1</div>
              <div className="bio-sig-panel-titles">
                <h3>Ecological Functions</h3>
                <p>Key processes that maintain life support systems.</p>
              </div>
            </div>

            <div className="bio-sig-functions-grid">
              {ECOLOGICAL_FUNCTIONS.map((fn) => (
                <div
                  key={fn.id}
                  className="bio-sig-fn-card"
                  onClick={() => setSelectedFunction(fn)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedFunction(fn);
                    }
                  }}
                >
                  <div className="bio-sig-fn-card-top">
                    <div
                      className="bio-sig-fn-icon-bubble"
                      style={{ backgroundColor: `${fn.color}22`, borderColor: `${fn.color}50` }}
                    >
                      {fn.icon}
                    </div>
                    <h4 className="bio-sig-fn-title">{fn.title}</h4>
                  </div>
                  <p className="bio-sig-fn-desc">{fn.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 2: 2 Productivity in Ecosystems (Middle) */}
          <div className="bio-sig-panel bio-sig-panel-productivity" id="panel-productivity">
            <div className="bio-sig-panel-header">
              <div className="bio-sig-step-badge step-blue">2</div>
              <div className="bio-sig-panel-titles">
                <h3>Productivity in Ecosystems</h3>
                <p>Rate at which energy is captured and stored as biomass.</p>
              </div>
            </div>

            <div className="bio-sig-productivity-content">
              {/* Left Scenery Photo of Sunlight & Wetland */}
              <div className="bio-sig-prod-image-wrap">
                <img
                  src="/images/bio-significance/productivity-wetland.jpg"
                  alt="Sunlight God Rays penetrating Wetland Forest"
                  className="bio-sig-prod-image"
                />
                <div className="bio-sig-prod-image-overlay" />
                <span className="bio-sig-prod-image-tag">Solar Flux Capture</span>
              </div>

              {/* Right Stack of 3 Productivity Types */}
              <div className="bio-sig-prod-cards-col">
                {/* 1. GPP */}
                <div className="bio-sig-prod-item prod-item-gpp">
                  <div className="bio-sig-prod-item-header">
                    <div className="bio-sig-prod-bubble bubble-gpp">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="bio-sig-prod-header-text">
                      <strong>Gross Primary Productivity (GPP)</strong>
                    </div>
                  </div>
                  <p className="bio-sig-prod-desc">Total energy captured by producers.</p>
                </div>

                {/* 2. NPP */}
                <div className="bio-sig-prod-item prod-item-npp">
                  <div className="bio-sig-prod-item-header">
                    <div className="bio-sig-prod-bubble bubble-npp">
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="bio-sig-prod-header-text">
                      <strong>Net Primary Productivity (NPP)</strong>
                    </div>
                  </div>
                  <p className="bio-sig-prod-desc">
                    Energy available for consumer use.
                  </p>
                  <div className="bio-sig-npp-formula">
                    <code>NPP = GPP − Respiration</code>
                  </div>
                </div>

                {/* 3. Secondary Productivity */}
                <div className="bio-sig-prod-item prod-item-sec">
                  <div className="bio-sig-prod-item-header">
                    <div className="bio-sig-prod-bubble bubble-sec">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="bio-sig-prod-header-text">
                      <strong>Secondary Productivity</strong>
                    </div>
                  </div>
                  <p className="bio-sig-prod-desc">Rate of biomass production by consumers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3: 3 Ecological Succession (Right) */}
          <div className="bio-sig-panel bio-sig-panel-succession" id="panel-succession">
            <div className="bio-sig-panel-header">
              <div className="bio-sig-step-badge step-emerald">3</div>
              <div className="bio-sig-panel-titles">
                <h3>Ecological Succession</h3>
                <p>Natural process of gradual change in species composition.</p>
              </div>
            </div>

            <div className="bio-sig-succession-columns">
              {/* Primary Succession Column */}
              <div className="bio-sig-succ-col">
                <div className="bio-sig-succ-header">
                  <span className="bio-sig-succ-badge badge-primary">Primary Succession</span>
                </div>
                <ul className="bio-sig-succ-bullets">
                  <li>
                    <span className="succ-bullet-dot dot-green" />
                    <span>Begins on barren land without soil (e.g., rocks, volcanic areas).</span>
                  </li>
                  <li>
                    <span className="succ-bullet-dot dot-green" />
                    <span>Slow process (hundreds to thousands of years).</span>
                  </li>
                </ul>

                {/* Visual Succession Progression Strip */}
                <div className="bio-sig-succ-strip-wrap">
                  <img
                    src="/images/bio-significance/primary-succession.jpg"
                    alt="Primary Succession Stages: Bare Rock to Lichens, Mosses, Grasses to Forest"
                    className="bio-sig-succ-strip-img"
                  />
                  <div className="bio-sig-succ-strip-overlay" />
                </div>
                <div className="bio-sig-succ-stepper-pills">
                  <span>Bare Rock</span>
                  <em>→</em>
                  <span>Lichens</span>
                  <em>→</em>
                  <span>Mosses</span>
                  <em>→</em>
                  <span>Grasses</span>
                  <em>→</em>
                  <span>Forest</span>
                </div>
              </div>

              {/* Secondary Succession Column */}
              <div className="bio-sig-succ-col">
                <div className="bio-sig-succ-header">
                  <span className="bio-sig-succ-badge badge-secondary">Secondary Succession</span>
                </div>
                <ul className="bio-sig-succ-bullets">
                  <li>
                    <span className="succ-bullet-dot dot-blue" />
                    <span>Occurs in areas with existing soil after disturbance (e.g., fire, farming).</span>
                  </li>
                  <li>
                    <span className="succ-bullet-dot dot-blue" />
                    <span>Faster process (decades to centuries).</span>
                  </li>
                </ul>

                {/* Visual Succession Progression Strip */}
                <div className="bio-sig-succ-strip-wrap">
                  <img
                    src="/images/bio-significance/secondary-succession.jpg"
                    alt="Secondary Succession Stages: Grasses to Shrubs to Young Forest to Mature Climax Forest"
                    className="bio-sig-succ-strip-img"
                  />
                  <div className="bio-sig-succ-strip-overlay" />
                </div>
                <div className="bio-sig-succ-stepper-pills">
                  <span>Grasses</span>
                  <em>→</em>
                  <span>Shrubs</span>
                  <em>→</em>
                  <span>Young Forest</span>
                  <em>→</em>
                  <span>Mature Forest</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM SECTION: Key Takeaways (Left) & Next Chapter Nav (Right)
            =================================================================== */}
        <div className="bio-sig-bottom-row">
          {/* Left Panel: Key Takeaways */}
          <div className="bio-sig-takeaways-panel">
            <div className="bio-sig-takeaways-header">
              <div className="bio-sig-takeaways-cap-icon">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
              </div>
              <h3>Key Takeaways</h3>
            </div>

            <div className="bio-sig-takeaways-grid">
              {KEY_TAKEAWAYS.map((item) => (
                <div
                  key={item.id}
                  className="bio-sig-takeaway-card"
                  style={{ borderColor: `${item.color}30` }}
                >
                  <div
                    className="bio-sig-takeaway-circle"
                    style={{ backgroundColor: `${item.color}20`, borderColor: `${item.color}50` }}
                  >
                    {item.icon}
                  </div>
                  <p className="bio-sig-takeaway-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Lake Thumbnail & Continue Button */}
          <div className="bio-sig-nav-card">
            <div className="bio-sig-nav-thumb-wrap">
              <img
                src="/images/bio-significance/lake-thumbnail.jpg"
                alt="Ecosystem lake landscape"
                className="bio-sig-nav-thumb"
              />
            </div>

            <button
              type="button"
              className="bio-sig-continue-btn"
              onClick={handleNextClick}
              title="Proceed to Chapter 10: Economic Values"
            >
              <span>Continue to Economic Values</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL FOR FUNCTIONS
          =================================================================== */}
      <AnimatePresence>
        {selectedFunction && (
          <div 
            className="bio-sig-modal-backdrop" 
            data-lenis-prevent
            onClick={() => setSelectedFunction(null)}
          >
            <motion.div
              className="bio-sig-modal-card"
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bio-sig-modal-header" style={{ borderBottomColor: `${selectedFunction.color}40` }}>
                <div
                  className="bio-sig-modal-icon-bubble"
                  style={{ backgroundColor: `${selectedFunction.color}25`, borderColor: `${selectedFunction.color}60` }}
                >
                  {selectedFunction.icon}
                </div>
                <div className="bio-sig-modal-header-titles">
                  <h2>{selectedFunction.title}</h2>
                  <p>{selectedFunction.desc}</p>
                </div>
                <button
                  type="button"
                  className="bio-sig-modal-close-btn"
                  onClick={() => setSelectedFunction(null)}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bio-sig-modal-body" data-lenis-prevent>
                <div className="bio-sig-modal-section">
                  <h4>Scientific Role &amp; Mechanism</h4>
                  <div className="bio-sig-modal-role-pill">
                    <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{selectedFunction.details.scientificRole}</span>
                  </div>
                </div>

                <div className="bio-sig-modal-section">
                  <h4>Key Ecological Pathways (VTU BCV755B Syllabus)</h4>
                  <ul className="bio-sig-modal-list">
                    {selectedFunction.details.keyProcesses.map((p, idx) => (
                      <li key={idx}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bio-sig-modal-fact-box">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <p>
                    <strong>Planetary Importance:</strong> {selectedFunction.details.importance}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default BioSignificanceScreen;
