import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Mountain,
  RefreshCw,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  Layers,
  Zap,
  Globe,
  ArrowRight,
  Lightbulb,
  X,
  Share2,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

/* --------------------------------------------------------------------------
   DATA TYPES & DICTIONARIES
   -------------------------------------------------------------------------- */
interface EcosystemCardData {
  id: string;
  name: string;
  subtitle: string;
  category: 'biotic' | 'abiotic';
  image: string;
  description: string;
  details: {
    role: string;
    examples: string[];
    trophicOrType: string;
    keyFact: string;
  };
}

const BIOTIC_CARDS: EcosystemCardData[] = [
  {
    id: 'producers',
    name: 'Producers',
    subtitle: '(e.g., green plants)',
    category: 'biotic',
    image: '/images/bio-ecosystem/biotic-producers.jpg',
    description: 'Autotrophic photosynthetic organisms that synthesize organic food directly from inorganic raw materials using solar radiation.',
    details: {
      role: 'Primary Production & Carbon Fixation',
      examples: ['Trees (Teak, Sal, Pine)', 'Green Grasses & Herbs', 'Phytoplankton & Aquatic Algae', 'Photosynthetic Cyanobacteria'],
      trophicOrType: 'Trophic Level 1 (T₁)',
      keyFact: 'Converts solar radiant energy into chemical bond energy via chlorophyll with an overall efficiency of 1–2%.',
    },
  },
  {
    id: 'consumers',
    name: 'Consumers',
    subtitle: '(e.g., herbivores, carnivores)',
    category: 'biotic',
    image: '/images/bio-ecosystem/biotic-consumers.jpg',
    description: 'Heterotrophic organisms incapable of producing their own food, relying on consuming autotrophs or other organisms.',
    details: {
      role: 'Energy Transfer & Population Regulation',
      examples: [
        'Primary Consumers (Herbivores): Deer, Rabbits, Cattle, Zooplankton',
        'Secondary Consumers (Carnivores): Frogs, Foxes, Small Fishes',
        'Tertiary / Top Carnivores: Tigers, Lions, Hawks, Sharks',
      ],
      trophicOrType: 'Trophic Levels 2, 3 & 4 (T₂, T₃, T₄)',
      keyFact: 'Operates under Lindeman’s 10% Law: only ~10% of ingested energy is stored as biomass for the subsequent trophic tier.',
    },
  },
  {
    id: 'decomposers',
    name: 'Decomposers',
    subtitle: '(e.g., bacteria, fungi)',
    category: 'biotic',
    image: '/images/bio-ecosystem/biotic-decomposers.jpg',
    description: 'Saprotrophs and detritivores that digest dead biomass extracellularly, releasing fundamental inorganic elements back into soil and water.',
    details: {
      role: 'Nutrient Mineralization & Soil Regeneration',
      examples: ['Amanita & Agaricus mushrooms', 'Wood-decay bracket fungi', 'Soil Actinomycetes', 'Putrefying bacteria'],
      trophicOrType: 'Decomposer / Reducer Network',
      keyFact: 'Without decomposers, bio-essential elements (C, N, P, S) would remain permanently locked inside dead tissues, causing ecological collapse.',
    },
  },
  {
    id: 'microorganisms',
    name: 'Microorganisms',
    subtitle: '(e.g., algae, bacteria, fungi)',
    category: 'biotic',
    image: '/images/bio-ecosystem/biotic-microorganisms.jpg',
    description: 'Microscopic life forms powering crucial biogeochemical transformations, nitrogen fixation, and symbiotic digestion.',
    details: {
      role: 'Biogeochemical Catalysis & Atmospheric Regulation',
      examples: [
        'Nitrogen-fixing Bacteria: Rhizobium in root nodules, Azotobacter, Clostridium',
        'Nitrifying Bacteria: Nitrosomonas, Nitrobacter',
        'Cyanobacteria: Anabaena, Nostoc',
      ],
      trophicOrType: 'Ubiquitous Micro-Catalysts',
      keyFact: 'Soil bacteria drive the entire global nitrogen cycle, converting atmospheric N₂ into bioavailable nitrates for all plant life.',
    },
  },
];

const ABIOTIC_CARDS: EcosystemCardData[] = [
  {
    id: 'sunlight',
    name: 'Sunlight',
    subtitle: '(Light energy)',
    category: 'abiotic',
    image: '/images/bio-ecosystem/abiotic-sunlight.jpg',
    description: 'The ultimate prime-mover and primary energy source that fuels virtually all biological processes across planet Earth.',
    details: {
      role: 'Solar Photons & Photoperiodic Rhythms',
      examples: ['Photosynthetically Active Radiation (PAR, 400–700 nm)', 'Infrared thermal radiation', 'UV regulation of pigmentation'],
      trophicOrType: 'Primary Solar Energy Flux',
      keyFact: 'Drives global atmospheric circulation, hydrological evaporation, diurnal circadian clocks, and chlorophyll excitation.',
    },
  },
  {
    id: 'water',
    name: 'Water',
    subtitle: '(Availability)',
    category: 'abiotic',
    image: '/images/bio-ecosystem/abiotic-water.jpg',
    description: 'The universal solvent and primary constituent of cellular protoplasm, essential for physiological transport and thermoregulation.',
    details: {
      role: 'Hydration, Metabolic Medium & Aquatic Habitat',
      examples: ['Rainfall & Precipitation', 'Lotic streams & Lentic wetlands', 'Soil capillary moisture', 'Aquifer groundwater reservoirs'],
      trophicOrType: 'Hydrological Lifeline',
      keyFact: 'Accounts for 70–90% of living cell weight; moisture availability is the primary factor delineating arid deserts from rainforests.',
    },
  },
  {
    id: 'soil',
    name: 'Soil',
    subtitle: '(Minerals, nutrients)',
    category: 'abiotic',
    image: '/images/bio-ecosystem/abiotic-soil.jpg',
    description: 'The complex living pedosphere matrix of weathered rock minerals, organic humus, air, water, and resident edaphic organisms.',
    details: {
      role: 'Mechanical Anchorage & Mineral Reservoir',
      examples: ['Macronutrients: N, P, K, Ca, Mg, S', 'Micronutrients: Fe, Mn, Zn, Cu, B, Mo', 'Organic Humus & Humic acids'],
      trophicOrType: 'Edaphic Mineral Substrate',
      keyFact: 'Healthy topsoil takes 200–500 years to form 1 inch naturally, functioning as the bedrock reservoir for terrestrial food systems.',
    },
  },
  {
    id: 'air',
    name: 'Air',
    subtitle: '(Gases: O₂, CO₂)',
    category: 'abiotic',
    image: '/images/bio-ecosystem/abiotic-air.jpg',
    description: 'The gaseous envelope supplying critical reactants for cellular aerobic respiration and photosynthetic carbon fixation.',
    details: {
      role: 'Gas Exchange & Atmospheric Shield',
      examples: ['Oxygen (20.95%) for aerobic cellular respiration', 'Carbon Dioxide (0.042%) for carbon fixation', 'Nitrogen (78.08%) chemical inertness'],
      trophicOrType: 'Atmospheric Reservoir',
      keyFact: 'Plants absorb CO₂ from air through microscopic leaf stomata while expelling life-sustaining O₂ as a byproduct.',
    },
  },
  {
    id: 'temperature',
    name: 'Temperature',
    subtitle: '(Heat energy)',
    category: 'abiotic',
    image: '/images/bio-ecosystem/abiotic-temperature.jpg',
    description: 'Thermal kinetic energy governing the rate of enzymatic biochemical reactions, physiological metabolism, and species distributions.',
    details: {
      role: 'Thermal Regulation & Enzyme Kinetics',
      examples: ['Optimal biological enzyme window (10°C to 45°C)', 'Endothermic & Ectothermic adaptations', 'Seasonal phenology & hibernation'],
      trophicOrType: 'Kinetic Thermal Driver',
      keyFact: 'Every 10°C rise in temperature (Q₁₀ rule) roughly doubles metabolic reaction rates until thermal protein denaturation occurs.',
    },
  },
  {
    id: 'climate',
    name: 'Climate',
    subtitle: '(Weather patterns)',
    category: 'abiotic',
    image: '/images/bio-ecosystem/abiotic-climate.jpg',
    description: 'The long-term statistical pattern of atmospheric conditions — temperature, precipitation, humidity, solar exposure, and wind currents.',
    details: {
      role: 'Global Biome Architecture & Macro-Regimes',
      examples: ['Tropical Monsoon belts', 'Temperate seasonal gradients', 'Arid desert regimes', 'Alpine and Arctic tundras'],
      trophicOrType: 'Macro-Climatic Regimes',
      keyFact: 'Interactions between precipitation and temperature define the distinct ecological boundaries of all global biomes.',
    },
  },
];

const KEY_POINTS = [
  {
    id: 'definition',
    title: 'Ecosystem Concept',
    text: 'Ecosystem = biotic + abiotic components interacting together.',
    icon: <Leaf className="w-4 h-4 text-emerald-400" />,
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.3)',
  },
  {
    id: 'energy',
    title: 'Energy Transfer',
    text: 'Energy flows through different trophic levels.',
    icon: <Zap className="w-4 h-4 text-amber-400" />,
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.3)',
  },
  {
    id: 'nutrients',
    title: 'Nutrient Cycling',
    text: 'Nutrients are cycled between biotic and abiotic components.',
    icon: <RefreshCw className="w-4 h-4 text-emerald-400" />,
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.3)',
  },
  {
    id: 'balance',
    title: 'Equilibrium',
    text: 'Maintain balance and support sustained life on Earth.',
    icon: <Globe className="w-4 h-4 text-sky-400" />,
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.3)',
  },
];

/* --------------------------------------------------------------------------
   INTERACTION CYCLE NODES
   -------------------------------------------------------------------------- */
type CycleNodeId = 'sun' | 'producers' | 'consumers' | 'decomposers' | 'abiotic' | 'recycling' | null;

export function BioEcosystemScreen() {
  const [selectedCard, setSelectedCard] = useState<EcosystemCardData | null>(null);
  const [activeCycleNode, setActiveCycleNode] = useState<CycleNodeId>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedCard !== null, () => setSelectedCard(null));

  const handleNextClick = () => {
    const el = document.getElementById('ch-types');
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToSection = (panelId: string) => {
    const el = document.getElementById(panelId);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -80, duration: 0.9 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    const sequence: CycleNodeId[] = ['sun', 'producers', 'consumers', 'decomposers', 'recycling', 'abiotic'];
    sequence.forEach((node, i) => {
      setTimeout(() => {
        setActiveCycleNode(node);
        if (i === sequence.length - 1) {
          setTimeout(() => {
            setActiveCycleNode(null);
            setIsSimulating(false);
          }, 1400);
        }
      }, i * 1100);
    });
  };

  return (
    <section className="bio-screen bio-ecosystem-section" id="ch-ecosystem">
      <div className="bio-ecosystem-container">
        {/* ===================================================================
            HERO PANORAMA SECTION (Top Banner matching mockup)
            =================================================================== */}
        <div className="bio-eco-hero-card">
          {/* Panoramic Scenery Background */}
          <div className="bio-eco-hero-bg-wrap">
            <img
              src="/images/bio-ecosystem/ecosystem-hero.jpg"
              alt="Ecosystem Panoramic Scenery"
              className="bio-eco-hero-bg-img"
            />
            <div className="bio-eco-hero-gradient-overlay" />
          </div>

          {/* Left Header Content */}
          <div className="bio-eco-hero-content">
            <div className="bio-eco-badge">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 07</span>
            </div>

            <h1 className="bio-eco-title">Ecosystem</h1>
            <h2 className="bio-eco-subtitle">Interconnection of Life and Environment</h2>

            <p className="bio-eco-lead">
              An ecosystem is a <span className="bio-eco-lead-highlight">functional unit</span> where living organisms (
              <button
                type="button"
                className="bio-eco-pill-link bio-eco-link-biotic"
                onClick={() => handleScrollToSection('panel-biotic')}
              >
                biotic components
              </button>
              ) interact with non-living surroundings (
              <button
                type="button"
                className="bio-eco-pill-link bio-eco-link-abiotic"
                onClick={() => handleScrollToSection('panel-abiotic')}
              >
                abiotic components
              </button>
              ) through the flow of energy and cycling of nutrients.
            </p>
          </div>

          {/* Floating Callout Badges on Scenery */}
          <button
            type="button"
            className="bio-eco-float-callout bio-eco-callout-biotic"
            style={{ left: '46%', top: '22%' }}
            onClick={() => handleScrollToSection('panel-biotic')}
            title="Jump to Biotic Components"
          >
            <div className="bio-eco-callout-icon bio-eco-icon-green">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div className="bio-eco-callout-text">
              <strong>Biotic Components</strong>
              <small>(Living organisms)</small>
            </div>
            <span className="bio-eco-callout-ping green-ping" />
          </button>

          <button
            type="button"
            className="bio-eco-float-callout bio-eco-callout-abiotic"
            style={{ left: '71%', top: '22%' }}
            onClick={() => handleScrollToSection('panel-abiotic')}
            title="Jump to Abiotic Components"
          >
            <div className="bio-eco-callout-icon bio-eco-icon-blue">
              <Mountain className="w-3.5 h-3.5 text-sky-300" />
            </div>
            <div className="bio-eco-callout-text">
              <strong>Abiotic Components</strong>
              <small>(Non-living factors)</small>
            </div>
            <span className="bio-eco-callout-ping blue-ping" />
          </button>

          <button
            type="button"
            className="bio-eco-float-callout bio-eco-callout-flow"
            style={{ left: '69%', top: '56%' }}
            onClick={() => handleScrollToSection('panel-interactions')}
            title="Jump to Energy Flow and Interactions"
          >
            <div className="bio-eco-callout-icon bio-eco-icon-teal">
              <RefreshCw className="w-3.5 h-3.5 text-teal-300" />
            </div>
            <div className="bio-eco-callout-text">
              <strong>Energy Flow</strong>
              <small>and Nutrient Cycling</small>
            </div>
            <span className="bio-eco-callout-ping teal-ping" />
          </button>

          {/* Top-Right Liquid Glass Quote Card */}
          <div className="bio-eco-hero-quote-card">
            <span className="bio-eco-quote-mark">❝</span>
            <p className="bio-eco-quote-body">
              In an ecosystem, life and environment are interdependent — energy flows, nutrients cycle and together
              they sustain life.
            </p>
          </div>
        </div>

        {/* ===================================================================
            MIDDLE SECTION: 3 PANELS ROW (Biotic, Abiotic, Interactions)
            =================================================================== */}
        <div className="bio-eco-middle-row">
          {/* PANEL 1: Biotic Components (Left) */}
          <div className="bio-eco-panel bio-eco-panel-biotic" id="panel-biotic">
            <div className="bio-eco-panel-header">
              <div className="bio-eco-panel-header-icon bio-panel-icon-green">
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="bio-eco-panel-header-titles">
                <h3>Biotic Components</h3>
                <p>All living organisms in an ecosystem.</p>
              </div>
            </div>

            <div className="bio-eco-biotic-grid">
              {BIOTIC_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="bio-eco-card bio-eco-card-biotic"
                  onClick={() => setSelectedCard(card)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCard(card);
                    }
                  }}
                >
                  <div className="bio-eco-card-thumb-wrap">
                    <img src={card.image} alt={card.name} className="bio-eco-card-thumb" />
                    <div className="bio-eco-card-hover-overlay">
                      <span>View details</span>
                    </div>
                  </div>
                  <div className="bio-eco-card-info">
                    <h4 className="bio-eco-card-title">{card.name}</h4>
                    <span className="bio-eco-card-subtitle">{card.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 2: Abiotic Components (Middle) */}
          <div className="bio-eco-panel bio-eco-panel-abiotic" id="panel-abiotic">
            <div className="bio-eco-panel-header">
              <div className="bio-eco-panel-header-icon bio-panel-icon-blue">
                <Mountain className="w-4 h-4 text-sky-400" />
              </div>
              <div className="bio-eco-panel-header-titles">
                <h3>Abiotic Components</h3>
                <p>Non-living physical and chemical factors.</p>
              </div>
            </div>

            <div className="bio-eco-abiotic-grid">
              {ABIOTIC_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="bio-eco-card bio-eco-card-abiotic"
                  onClick={() => setSelectedCard(card)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCard(card);
                    }
                  }}
                >
                  <div className="bio-eco-card-thumb-wrap">
                    <img src={card.image} alt={card.name} className="bio-eco-card-thumb" />
                    <div className="bio-eco-card-hover-overlay">
                      <span>Explore</span>
                    </div>
                  </div>
                  <div className="bio-eco-card-info">
                    <h4 className="bio-eco-card-title">{card.name}</h4>
                    <span className="bio-eco-card-subtitle">{card.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 3: Interactions in an Ecosystem (Right) */}
          <div className="bio-eco-panel bio-eco-panel-interactions" id="panel-interactions">
            <div className="bio-eco-panel-header">
              <div className="bio-eco-panel-header-icon bio-panel-icon-gold">
                <Share2 className="w-4 h-4 text-amber-400" />
              </div>
              <div className="bio-eco-panel-header-titles">
                <h3>Interactions in an Ecosystem</h3>
                <p>Exchange of energy and nutrients between biotic and abiotic components.</p>
              </div>
            </div>

            {/* Interactive Ecosystem Flow Diagram Container */}
            <div className="bio-eco-diagram-container">
              {/* Controls bar */}
              <div className="bio-eco-diagram-controls">
                <button
                  type="button"
                  className={`bio-eco-sim-btn ${isSimulating ? 'active' : ''}`}
                  onClick={runSimulation}
                  disabled={isSimulating}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSimulating ? 'Simulating Energy & Nutrient Flow...' : 'Simulate Flow'}</span>
                </button>
                <span className="bio-eco-diagram-hint">Hover / Click nodes to inspect</span>
              </div>

              {/* Graphical Cycle Stage */}
              <div className="bio-eco-diagram-stage">
                {/* Background Nature Silhouette / Landscape */}
                <div className="bio-eco-diagram-bg" />

                {/* SVG Connections & Dynamic Animated Arrows */}
                <svg className="bio-eco-cycle-svg" viewBox="0 0 460 300" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="sunEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#84cc16" />
                    </linearGradient>
                    <linearGradient id="trophicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="decomposerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="recyclingGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <linearGradient id="abioticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>

                    {/* Arrow Marker Definitions */}
                    <marker id="arrowGold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#22c55e" />
                    </marker>
                    <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
                    </marker>
                  </defs>

                  {/* 1. Solar Energy -> Producers Arrow */}
                  <path
                    d="M 80 50 Q 80 85 85 105"
                    fill="none"
                    stroke={activeCycleNode === 'sun' ? '#fbbf24' : '#f59e0b'}
                    strokeWidth={activeCycleNode === 'sun' ? '3' : '2'}
                    strokeDasharray="4 2"
                    markerEnd="url(#arrowGold)"
                    className={activeCycleNode === 'sun' ? 'flow-active' : ''}
                  />

                  {/* 2. Producers -> Consumers Arrow */}
                  <path
                    d="M 145 130 L 210 130"
                    fill="none"
                    stroke={activeCycleNode === 'producers' ? '#4ade80' : 'url(#trophicGrad)'}
                    strokeWidth={activeCycleNode === 'producers' ? '3.5' : '2.2'}
                    markerEnd="url(#arrowGold)"
                    className={activeCycleNode === 'producers' ? 'flow-active' : ''}
                  />

                  {/* 3. Consumers -> Decomposers Arrow */}
                  <path
                    d="M 330 145 Q 365 175 365 205"
                    fill="none"
                    stroke={activeCycleNode === 'consumers' ? '#f59e0b' : '#d97706'}
                    strokeWidth={activeCycleNode === 'consumers' ? '3.5' : '2.2'}
                    markerEnd="url(#arrowGold)"
                    className={activeCycleNode === 'consumers' ? 'flow-active' : ''}
                  />

                  {/* 4. Decomposers -> Nutrient Recycling Loop -> Producers */}
                  <path
                    d="M 310 235 C 230 275, 110 265, 80 160"
                    fill="none"
                    stroke={activeCycleNode === 'recycling' ? '#34d399' : 'url(#recyclingGrad)'}
                    strokeWidth={activeCycleNode === 'recycling' ? '4' : '2.8'}
                    strokeDasharray="5 3"
                    markerEnd="url(#arrowGreen)"
                    className={activeCycleNode === 'recycling' ? 'flow-active' : ''}
                  />

                  {/* 5. Abiotic Environment Interactions */}
                  {/* Abiotic -> Producers (CO₂, H₂O, Minerals) */}
                  <path
                    d="M 360 85 C 280 40, 180 50, 110 105"
                    fill="none"
                    stroke={activeCycleNode === 'abiotic' ? '#38bdf8' : 'rgba(56, 189, 248, 0.65)'}
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    markerEnd="url(#arrowCyan)"
                  />
                  {/* Decomposers -> Abiotic (Mineralized Ions into soil/water) */}
                  <path
                    d="M 385 205 Q 415 155 400 95"
                    fill="none"
                    stroke={activeCycleNode === 'decomposers' ? '#38bdf8' : 'rgba(56, 189, 248, 0.65)'}
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    markerEnd="url(#arrowCyan)"
                  />
                </svg>

                {/* HTML Interactive Nodes on Stage */}

                {/* Node 1: Sun / Solar Energy */}
                <div
                  className={`bio-eco-dnode node-sun ${activeCycleNode === 'sun' ? 'active' : ''}`}
                  style={{ left: '8%', top: '6%' }}
                  onMouseEnter={() => setActiveCycleNode('sun')}
                  onMouseLeave={() => !isSimulating && setActiveCycleNode(null)}
                >
                  <div className="bio-dnode-sun-glow">
                    <Sun className="w-6 h-6 text-amber-300" />
                  </div>
                  <div className="bio-dnode-tag sun-tag">
                    <span>Solar Energy</span>
                  </div>
                </div>

                {/* Node 2: Producers (Plants) */}
                <div
                  className={`bio-eco-dnode node-producers ${activeCycleNode === 'producers' ? 'active' : ''}`}
                  style={{ left: '6%', top: '38%' }}
                  onMouseEnter={() => setActiveCycleNode('producers')}
                  onMouseLeave={() => !isSimulating && setActiveCycleNode(null)}
                >
                  <div className="bio-dnode-badge green-badge">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <strong>Producers</strong>
                    <small>(Plants)</small>
                  </div>
                </div>

                {/* Node 3: Consumers (Animals) */}
                <div
                  className={`bio-eco-dnode node-consumers ${activeCycleNode === 'consumers' ? 'active' : ''}`}
                  style={{ left: '46%', top: '35%' }}
                  onMouseEnter={() => setActiveCycleNode('consumers')}
                  onMouseLeave={() => !isSimulating && setActiveCycleNode(null)}
                >
                  <div className="bio-dnode-consumer-wrap">
                    <img
                      src="/images/bio-ecosystem/biotic-consumers.jpg"
                      alt="Consumers"
                      className="bio-dnode-thumb"
                    />
                    <div className="bio-dnode-badge amber-badge">
                      <strong>Consumers</strong>
                      <small>(Animals)</small>
                    </div>
                  </div>
                </div>

                {/* Node 4: Abiotic Environment (Air, Water, Soil) */}
                <div
                  className={`bio-eco-dnode node-abiotic ${activeCycleNode === 'abiotic' ? 'active' : ''}`}
                  style={{ left: '68%', top: '8%' }}
                  onMouseEnter={() => setActiveCycleNode('abiotic')}
                  onMouseLeave={() => !isSimulating && setActiveCycleNode(null)}
                >
                  <div className="bio-dnode-badge cyan-badge">
                    <Mountain className="w-4 h-4 text-sky-300" />
                    <strong>Abiotic Environment</strong>
                    <small>(Air, Water, Soil)</small>
                  </div>
                </div>

                {/* Node 5: Decomposers (Bacteria, Fungi) */}
                <div
                  className={`bio-eco-dnode node-decomposers ${activeCycleNode === 'decomposers' ? 'active' : ''}`}
                  style={{ left: '66%', top: '65%' }}
                  onMouseEnter={() => setActiveCycleNode('decomposers')}
                  onMouseLeave={() => !isSimulating && setActiveCycleNode(null)}
                >
                  <div className="bio-dnode-decomposer-wrap">
                    <img
                      src="/images/bio-ecosystem/biotic-decomposers.jpg"
                      alt="Decomposers"
                      className="bio-dnode-thumb"
                    />
                    <div className="bio-dnode-badge bronze-badge">
                      <strong>Decomposers</strong>
                      <small>(Bacteria, Fungi)</small>
                    </div>
                  </div>
                </div>

                {/* Node 6: Nutrient Recycling Banner on Bottom Flow */}
                <div
                  className={`bio-eco-dnode node-recycling ${activeCycleNode === 'recycling' ? 'active' : ''}`}
                  style={{ left: '30%', top: '82%' }}
                  onMouseEnter={() => setActiveCycleNode('recycling')}
                  onMouseLeave={() => !isSimulating && setActiveCycleNode(null)}
                >
                  <div className="bio-dnode-recycle-pill">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Nutrient Recycling</span>
                  </div>
                </div>
              </div>

              {/* Informative Ticker for hovered node */}
              <div className="bio-eco-diagram-footer-ticker">
                {activeCycleNode === 'sun' && (
                  <p>
                    <strong className="text-amber-400">Solar Energy:</strong> Directs ~1.7 × 10¹⁷ W of solar photon
                    radiation to Earth, powering plant photosynthesis.
                  </p>
                )}
                {activeCycleNode === 'producers' && (
                  <p>
                    <strong className="text-emerald-400">Producers (Autotrophs):</strong> Fix inorganic CO₂ and water into
                    organic glucose via chlorophyll, creating the base of all trophic webs.
                  </p>
                )}
                {activeCycleNode === 'consumers' && (
                  <p>
                    <strong className="text-amber-400">Consumers (Heterotrophs):</strong> Herbivores and carnivores
                    transfer stored biomass energy with ~10% efficiency per trophic step.
                  </p>
                )}
                {activeCycleNode === 'decomposers' && (
                  <p>
                    <strong className="text-orange-400">Decomposers (Saprotrophs):</strong> Fungi and bacteria break
                    down complex organic residues into bioavailable mineral salts.
                  </p>
                )}
                {activeCycleNode === 'abiotic' && (
                  <p>
                    <strong className="text-sky-400">Abiotic Environment:</strong> Supplies atmospheric CO₂, dissolved
                    oxygen, liquid water, and soil minerals to sustain living systems.
                  </p>
                )}
                {activeCycleNode === 'recycling' && (
                  <p>
                    <strong className="text-teal-400">Nutrient Recycling:</strong> Mineralized ions (N, P, K, Ca) return
                    to the soil matrix to be re-absorbed by plant roots.
                  </p>
                )}
                {!activeCycleNode && (
                  <p className="text-slate-400">
                    Interact with any node above or click "Simulate Flow" to visualize energy dissipation and nutrient cycling.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM SECTION: Key Points (Left ~70%) & Landscape Quote / Nav (Right ~30%)
            =================================================================== */}
        <div className="bio-eco-bottom-row">
          {/* Left Panel: Key Points */}
          <div className="bio-eco-key-points-panel">
            <div className="bio-eco-kp-header">
              <div className="bio-eco-kp-icon">
                <Lightbulb className="w-4 h-4 text-amber-400" />
              </div>
              <h3>Key Points</h3>
            </div>

            <div className="bio-eco-kp-cards-grid">
              {KEY_POINTS.map((kp) => (
                <div
                  key={kp.id}
                  className="bio-eco-kp-card"
                  style={{ borderColor: `${kp.color}30` }}
                >
                  <div
                    className="bio-eco-kp-circle"
                    style={{ backgroundColor: `${kp.color}20`, borderColor: `${kp.color}50` }}
                  >
                    {kp.icon}
                  </div>
                  <p className="bio-eco-kp-text">{kp.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Alpine Lake Landscape & Next Navigation */}
          <div className="bio-eco-lake-card">
            <div className="bio-eco-lake-thumb-wrap">
              <img
                src="/images/bio-ecosystem/ecosystem-lake.jpg"
                alt="Ecosystem lake landscape"
                className="bio-eco-lake-thumb"
              />
            </div>

            <div className="bio-eco-lake-body">
              <p className="bio-eco-lake-text">
                Ecosystems are the foundation of biodiversity and provide essential services that sustain all life on Earth.
              </p>

              <button
                type="button"
                className="bio-eco-next-circle-btn"
                onClick={handleNextClick}
                title="Continue to Chapter 08: Types of Ecosystems"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL FOR CARDS
          =================================================================== */}
      <AnimatePresence>
        {selectedCard && (
          <div 
            className="bio-eco-modal-backdrop" 
            data-lenis-prevent
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="bio-eco-modal-card"
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              <div className="bio-eco-modal-hero">
                <img src={selectedCard.image} alt={selectedCard.name} className="bio-eco-modal-hero-img" />
                <div className="bio-eco-modal-hero-overlay" />

                <button
                  type="button"
                  className="bio-eco-modal-close-btn"
                  onClick={() => setSelectedCard(null)}
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="bio-eco-modal-badge-group">
                  <span className={`bio-eco-category-badge badge-${selectedCard.category}`}>
                    {selectedCard.category.toUpperCase()}
                  </span>
                  <span className="bio-eco-trophic-badge">{selectedCard.details.trophicOrType}</span>
                </div>

                <div className="bio-eco-modal-title-wrap">
                  <h2>{selectedCard.name}</h2>
                  <p>{selectedCard.subtitle}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="bio-eco-modal-body" data-lenis-prevent>
                <div className="bio-eco-modal-section">
                  <h4>Overview</h4>
                  <p className="bio-eco-modal-desc">{selectedCard.description}</p>
                </div>

                <div className="bio-eco-modal-section">
                  <h4>Ecological Role</h4>
                  <div className="bio-eco-modal-role-pill">
                    <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{selectedCard.details.role}</span>
                  </div>
                </div>

                <div className="bio-eco-modal-section">
                  <h4>Key Examples (VTU BCV755B Syllabus)</h4>
                  <ul className="bio-eco-modal-examples-list">
                    {selectedCard.details.examples.map((ex, idx) => (
                      <li key={idx}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bio-eco-modal-fact-box">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <p>
                    <strong>Key Scientific Takeaway:</strong> {selectedCard.details.keyFact}
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

export default BioEcosystemScreen;
