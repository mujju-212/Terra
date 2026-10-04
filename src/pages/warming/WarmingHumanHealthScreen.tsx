import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Share2,
  HeartPulse,
  Thermometer,
  CloudLightning,
  CloudRain,
  Waves,
  Wind,
  Droplets,
  Leaf,
  Bug,
  Sun,
  Activity,
  Users,
  Lightbulb,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  X,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import './WarmingHumanHealthScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

// ─── TYPES & DATA MODELS ───
interface HealthCardItem {
  id: string;
  category: 'driver' | 'pathway' | 'impact';
  title: string;
  subtitle?: string;
  theme: string;
  icon: typeof Thermometer;
  image?: string;
  stat?: string;
  detail: string;
  syllabusRef: string;
}

// 4 Climate Change Drivers (Left Column 2x2)
const climateDrivers: HealthCardItem[] = [
  {
    id: 'driver-temp',
    category: 'driver',
    title: 'Rising Temperatures',
    theme: 'theme-orange',
    icon: Thermometer,
    image: '/images/warming-city-heat.jpg',
    stat: '+1.1°C to +1.5°C global surface anomaly',
    detail:
      'Longer and more intense heatwaves increase core body thermal stress, exacerbating cardiovascular strain, respiratory distress, and dehydration across urban centers.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Thermal Forcing & Human Physiology',
  },
  {
    id: 'driver-weather',
    category: 'driver',
    title: 'Extreme Weather Events',
    theme: 'theme-purple',
    icon: CloudLightning,
    image: '/images/warming-effect-04-weather.jpg',
    stat: 'Cat 4 & 5 hurricanes surged ~30% in frequency',
    detail:
      'Catastrophic storms, flash floods, and severe wildfires inflict immediate physical trauma, destroy healthcare facilities, and cause long-term community displacement.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Meteorological Extremes & Civil Injury',
  },
  {
    id: 'driver-precip',
    category: 'driver',
    title: 'Changing Precipitation Patterns',
    theme: 'theme-cyan',
    icon: CloudRain,
    image: '/images/nature-river-banner.jpg',
    stat: '+7% tropospheric water vapor capacity per 1°C heating',
    detail:
      'Erratic monsoons and rainfall fluctuations swing violently between flash floods and prolonged droughts, disrupting municipal clean water supply networks.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Hydrological Cycle Instability',
  },
  {
    id: 'driver-sea',
    category: 'driver',
    title: 'Rising Sea Levels',
    theme: 'theme-blue',
    icon: Waves,
    image: '/images/warming-effect-03-sealevel.jpg',
    stat: '3.7 mm/year sea level rise acceleration',
    detail:
      'Coastal flooding contaminates low-lying freshwater aquifers with saline seawater, displacing millions of residents in coastal river deltas and small island states.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Sea Level Inundation & Aquifer Salinization',
  },
];

// 5 Pathways to Health Impacts (Middle Column Stack)
const healthPathways: HealthCardItem[] = [
  {
    id: 'path-air',
    category: 'pathway',
    title: 'Poor Air Quality',
    subtitle: '(higher pollution, wildfire smoke)',
    theme: 'path-red',
    icon: Wind,
    stat: '4.2 million premature deaths annually from outdoor air pollution (WHO)',
    detail:
      'Ground-level ozone (smog) accelerates with rising temperatures. Fine particulate matter (PM2.5) from wildfire smoke penetrates deep into human lung alveoli, triggering acute asthma attacks, COPD flare-ups, and cardiac arrests.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Atmospheric Chemistry & Pulmonary Health',
  },
  {
    id: 'path-water',
    category: 'pathway',
    title: 'Contaminated Water',
    subtitle: '(floods, heavy rainfall)',
    theme: 'path-blue',
    icon: Droplets,
    stat: 'Over 500,000 diarrheal fatalities annually worldwide',
    detail:
      'Extreme rainfall overburdens municipal sewage infrastructure, washing industrial pollutants and fecal pathogens into open drinking sources, triggering waterborne epidemics like cholera and cryptosporidiosis.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Hydrological Disruption & Waterborne Vectors',
  },
  {
    id: 'path-food',
    category: 'pathway',
    title: 'Food Insecurity',
    subtitle: '(reduced crop yields)',
    theme: 'path-green',
    icon: Leaf,
    stat: 'Estimated -5% yield decline per degree Celsius of planetary warming',
    detail:
      'Heatwaves and soil drought wither essential crops (wheat, rice, maize). Furthermore, elevated atmospheric CO2 levels reduce nutritional density, diminishing zinc, iron, and protein contents in harvestable produce.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Agronomic Stress & Nutritional Quality',
  },
  {
    id: 'path-vectors',
    category: 'pathway',
    title: 'Spread of Disease Vectors',
    subtitle: '(warmer and wetter conditions)',
    theme: 'path-amber',
    icon: Bug,
    stat: 'Over 700,000 vector-borne deaths recorded globally each year',
    detail:
      'Warmer temperatures and expanded wetlands widen the breeding habitats and biting seasons for Aedes and Anopheles mosquitoes, spreading dengue, malaria, Zika, and chikungunya to previously temperate regions.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Vector Ecology & Latitude Shifts',
  },
  {
    id: 'path-heat',
    category: 'pathway',
    title: 'Extreme Heat Exposure',
    subtitle: '(heatwaves)',
    theme: 'path-crimson',
    icon: Sun,
    stat: 'European 2003 heatwave claimed ~35,000 direct lives',
    detail:
      'Prolonged high wet-bulb temperatures prevent human skin from cooling via sweat evaporation. Body core temperatures soar above 40°C, causing heat stroke, permanent kidney damage, and vascular failure.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Wet-Bulb Limits & Acute Thermal Shock',
  },
];

// 6 Key Health Impacts (Right Column 2x3 Grid)
const healthImpacts: HealthCardItem[] = [
  {
    id: 'impact-heat',
    category: 'impact',
    title: 'Heat-related Illnesses',
    theme: 'theme-orange',
    icon: Sun,
    image: '/images/health-heat-illness.jpg',
    stat: '35,000+ heat deaths in single continental heatwaves',
    detail:
      'Extreme heat triggers severe dehydration, heat cramps, syncope, and fatal heatstroke. Outdoor workers, the elderly, and infants without access to air conditioning bear the greatest mortality risk.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Thermoregulation Breakdown',
  },
  {
    id: 'impact-resp',
    category: 'impact',
    title: 'Respiratory Diseases',
    theme: 'theme-blue',
    icon: Activity,
    image: '/images/health-respiratory-smog.jpg',
    stat: 'Ground-level ozone surges 5–10% per 1°C temperature rise',
    detail:
      'High temperatures accelerate photochemical smog formation, while extended spring seasons increase airborne pollen allergens. Wildfire particulate plumes trigger chronic bronchitis and severe asthma exacerbations.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Tropospheric Ozone & Particulates',
  },
  {
    id: 'impact-vector',
    category: 'impact',
    title: 'Vector-borne Diseases',
    theme: 'theme-green',
    icon: Bug,
    image: '/images/climate-ind-04-health.jpg',
    stat: 'Vector-borne illnesses represent >17% of all global infectious diseases',
    detail:
      'Rising minimum temperatures reduce viral incubation periods inside insect hosts. Mosquitoes migrate up mountain slopes and into higher latitudes, exposing millions of immunological naive humans to dengue and malaria.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Vector Range Expansion & Altitudinal Creep',
  },
  {
    id: 'impact-water',
    category: 'impact',
    title: 'Water-borne Diseases',
    theme: 'theme-cyan',
    icon: Droplets,
    image: '/images/water-ch15-gw-contamination-master.jpg',
    stat: 'Diarrheal infection is the 2nd leading cause of death in children under 5',
    detail:
      'Floods disrupt sanitization infrastructure, while warmer surface waters accelerate bacterial proliferation (Vibrio cholerae, Salmonella, and Giardia), triggering deadly enteric disease epidemics.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Enteric Pathogens & Water Security',
  },
  {
    id: 'impact-mental',
    category: 'impact',
    title: 'Mental Health Impacts',
    theme: 'theme-purple',
    icon: Users,
    image: '/images/warming-effect-10-social.jpg',
    stat: 'Post-disaster PTSD and depression rates reach 30%–40% in displaced victims',
    detail:
      'Climate trauma manifests as solastalgia (distress caused by environmental destruction), eco-anxiety, post-traumatic stress disorder (PTSD), and depression following catastrophic losses of homes and livelihoods.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Psychosocial Trauma & Displacement',
  },
  {
    id: 'impact-malnutrition',
    category: 'impact',
    title: 'Malnutrition & Food Insecurity',
    theme: 'theme-amber',
    icon: Leaf,
    image: '/images/warming-effect-07-agriculture.jpg',
    stat: 'Over 800 million individuals globally face chronic food deprivation',
    detail:
      'Droughts, soil desertification, and pest infestations decimate harvest yields. Soaring food prices disproportionately deprive vulnerable children of essential micro-nutrients, causing childhood stunting.',
    syllabusRef: 'BCV755B Module 5 · Section 2.3: Agricultural Depletion & Childhood Stunting',
  },
];

export function WarmingHumanHealthScreen() {
  const [activeModalItem, setActiveModalItem] = useState<HealthCardItem | null>(null);
  useModalScrollLock(Boolean(activeModalItem), () => setActiveModalItem(null));

  return (
    <section
      className="human-health-screen-container"
      id="ch-07-human-health"
      aria-label="Chapter 07: Climate Change and Human Health — A Growing Global Health Challenge"
    >
      {/* ── Background Layer with Image 2 (Glowing Anatomical Figure between Fire and Flood) ── */}
      <div className="human-health-screen-bg">
        <img
          src="/images/warming-human-health-bg.jpg"
          alt="Climate Change and Human Health: Glowing human anatomical body standing between scorched earth and flood storm"
          loading="eager"
        />
        <div className="human-health-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Copy (Left) + Crimson Quote Box (Right) ── */}
      <div className="health-top-bar">
        {/* Left Header */}
        <div className="health-header-block">
          <div className="health-eyebrow">
            <span>MODULE 05</span>
            <span className="health-eyebrow-pipe">|</span>
            <span>CHAPTER 07</span>
          </div>
          <h1 className="health-main-title">Climate Change &amp; Human Health</h1>
          <h2 className="health-subtitle">A Growing Global Health Challenge</h2>
          <p className="health-lead-text">
            Climate change affects human health directly and indirectly by altering environmental
            conditions, increasing extreme weather events, and impacting air, water, food and
            ecosystems.
          </p>
        </div>

        {/* Right Crimson Quote Box matching Image 1 */}
        <div className="health-quote-card">
          <span className="health-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="health-quote-text">
            &ldquo;A changing climate is not just an environmental issue — it is a growing public
            health crisis.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Main Stage: 3 Columns (Drivers | Pathways | Health Impacts) ── */}
      <div className="health-main-stage">
        {/* ── COLUMN 1: CLIMATE CHANGE DRIVERS (2x2 Grid) ── */}
        <div className="health-panel-wrap drivers-panel">
          <div className="health-panel-head">
            <div className="health-head-left">
              <div className="health-head-badge badge-blue">
                <Globe size={15} />
              </div>
              <h3 className="health-head-title">Climate Change Drivers</h3>
            </div>
            <button
              type="button"
              className="health-head-arrow-btn"
              onClick={() => setActiveModalItem(climateDrivers[0])}
              aria-label="Inspect climate drivers"
            >
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="drivers-grid">
            {climateDrivers.map((driver) => {
              const IconComp = driver.icon;
              return (
                <div
                  key={driver.id}
                  className="driver-card"
                  onClick={() => setActiveModalItem(driver)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveModalItem(driver)}
                  aria-label={`View ${driver.title}`}
                >
                  <div className="driver-card-head">
                    <IconComp
                      size={15}
                      className={`driver-card-icon ${
                        driver.theme === 'theme-orange'
                          ? 'text-orange-400'
                          : driver.theme === 'theme-purple'
                          ? 'text-purple-400'
                          : driver.theme === 'theme-cyan'
                          ? 'text-cyan-400'
                          : 'text-blue-400'
                      }`}
                    />
                    <span className="driver-card-title">{driver.title}</span>
                  </div>
                  <div className="driver-card-thumb">
                    <img src={driver.image} alt={driver.title} loading="lazy" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── COLUMN 2: PATHWAYS TO HEALTH IMPACTS (Vertical Stack with Connected SVG) ── */}
        <div className="health-panel-wrap pathways-panel">
          <div className="health-panel-head">
            <div className="health-head-left">
              <div className="health-head-badge badge-green">
                <Share2 size={15} />
              </div>
              <h3 className="health-head-title">Pathways to Health Impacts</h3>
            </div>
            <button
              type="button"
              className="health-head-arrow-btn"
              onClick={() => setActiveModalItem(healthPathways[0])}
              aria-label="Inspect pathways to health impacts"
            >
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="pathways-layout">
            {/* Glowing SVG Branching Connector */}
            <svg
              className="pathways-tree-svg"
              viewBox="0 0 24 230"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pathTreeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              {/* Main Vertical Spine */}
              <line
                x1="4"
                y1="20"
                x2="4"
                y2="210"
                stroke="url(#pathTreeGrad)"
                strokeWidth="1.8"
                opacity="0.7"
              />
              {/* Branch 1 */}
              <path d="M 4,22 H 24" stroke="#f87171" strokeWidth="1.8" opacity="0.85" />
              <circle cx="4" cy="22" r="3" fill="#f87171" />
              {/* Branch 2 */}
              <path d="M 4,69 H 24" stroke="#38bdf8" strokeWidth="1.8" opacity="0.85" />
              <circle cx="4" cy="69" r="3" fill="#38bdf8" />
              {/* Branch 3 */}
              <path d="M 4,116 H 24" stroke="#4ade80" strokeWidth="1.8" opacity="0.85" />
              <circle cx="4" cy="116" r="3" fill="#4ade80" />
              {/* Branch 4 */}
              <path d="M 4,163 H 24" stroke="#f59e0b" strokeWidth="1.8" opacity="0.85" />
              <circle cx="4" cy="163" r="3" fill="#f59e0b" />
              {/* Branch 5 */}
              <path d="M 4,210 H 24" stroke="#f43f5e" strokeWidth="1.8" opacity="0.85" />
              <circle cx="4" cy="210" r="3" fill="#f43f5e" />
            </svg>

            {/* 5 Pathway Bars */}
            <div className="pathways-list">
              {healthPathways.map((pathway) => {
                const IconComp = pathway.icon;
                return (
                  <div
                    key={pathway.id}
                    className={`pathway-pill-bar ${pathway.theme}`}
                    onClick={() => setActiveModalItem(pathway)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveModalItem(pathway)}
                    aria-label={`View ${pathway.title}`}
                  >
                    <div className="pathway-icon-circle">
                      <IconComp size={15} />
                    </div>
                    <div className="pathway-text-col">
                      <span className="pathway-title">{pathway.title}</span>
                      <span className="pathway-sub">{pathway.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── COLUMN 3: KEY HEALTH IMPACTS (2x3 Grid of 6 Cards) ── */}
        <div className="health-panel-wrap impacts-panel">
          <div className="health-panel-head">
            <div className="health-head-left">
              <div className="health-head-badge badge-red">
                <HeartPulse size={15} />
              </div>
              <h3 className="health-head-title">Key Health Impacts</h3>
            </div>
            <button
              type="button"
              className="health-head-arrow-btn"
              onClick={() => setActiveModalItem(healthImpacts[0])}
              aria-label="Inspect key health impacts"
            >
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="impacts-grid">
            {healthImpacts.map((impact) => {
              const IconComp = impact.icon;
              return (
                <div
                  key={impact.id}
                  className={`impact-card ${impact.theme}`}
                  onClick={() => setActiveModalItem(impact)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveModalItem(impact)}
                  aria-label={`View ${impact.title}`}
                >
                  <div className="impact-card-head">
                    <IconComp size={14} className="impact-card-icon" />
                    <span className="impact-card-title">{impact.title}</span>
                  </div>
                  <div className="impact-card-thumb">
                    <img src={impact.image} alt={impact.title} loading="lazy" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Key Takeaways (Left) + Did You Know (Right) ── */}
      <div className="health-bottom-row">
        {/* Left: Key Takeaways */}
        <div className="takeaways-panel">
          <div className="takeaways-header">
            <Lightbulb size={18} />
            <span>Key Takeaways</span>
          </div>

          <div className="takeaways-columns">
            <div className="takeaway-item">
              <div className="takeaway-icon-circle circle-gold">
                <Users size={16} />
              </div>
              <p className="takeaway-text">
                Climate change threatens physical and mental health across all age groups.
              </p>
            </div>

            <div className="takeaway-item">
              <div className="takeaway-icon-circle circle-green">
                <ShieldCheck size={16} />
              </div>
              <p className="takeaway-text">
                Vulnerable populations (children, elderly, low-income communities) are most at risk.
              </p>
            </div>

            <div className="takeaway-item">
              <div className="takeaway-icon-circle circle-green">
                <Leaf size={16} />
              </div>
              <p className="takeaway-text">
                Mitigation and adaptation actions can reduce health risks and build resilience.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Did You Know? */}
        <div className="did-you-know-panel">
          <div className="did-you-know-head">
            <div className="did-you-know-left">
              <div className="did-you-know-badge">
                <BarChart3 size={15} />
              </div>
              <span className="did-you-know-title">Did You Know?</span>
            </div>
            <button
              type="button"
              className="health-head-arrow-btn"
              onClick={() => setActiveModalItem(healthImpacts[0])}
              aria-label="Learn more about health statistics"
            >
              <ArrowRight size={11} />
            </button>
          </div>
          <p className="did-you-know-text">
            Climate change is expected to cause an additional <strong>250,000 deaths per year</strong>{' '}
            between 2030 and 2050 (WHO).
          </p>
        </div>
      </div>

      {/* ── Interactive Detail Modal ── */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModalItem(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="max-w-lg w-full max-h-[85vh] overflow-y-auto bg-[#0d141e] border border-rose-500/40 rounded-xl shadow-2xl text-left"
              data-lenis-prevent
              initial={{ scale: 0.92, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 14 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
              {/* Modal Banner */}
              {activeModalItem.image && (
                <div className="relative h-44 w-full overflow-hidden bg-black">
                  <img
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d141e] via-[#0d141e]/50 to-transparent" />
                  <button
                    type="button"
                    onClick={() => setActiveModalItem(null)}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white/80 hover:text-white rounded-full p-1.5 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="bg-rose-500 text-white font-extrabold text-xs px-2 py-0.5 rounded">
                      {activeModalItem.category.toUpperCase()}
                    </span>
                    <span className="text-white/70 text-xs font-medium tracking-wide">
                      {activeModalItem.syllabusRef}
                    </span>
                  </div>
                </div>
              )}

              {/* Modal Body */}
              <div className="p-5">
                {!activeModalItem.image && (
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                    <span className="bg-rose-500 text-white font-extrabold text-xs px-2 py-0.5 rounded">
                      {activeModalItem.category.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(null)}
                      className="text-white/60 hover:text-white p-1"
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{activeModalItem.title}</span>
                  {activeModalItem.subtitle && (
                    <span className="text-sm font-normal text-white/60">
                      {activeModalItem.subtitle}
                    </span>
                  )}
                </h3>

                <p className="text-xs text-white/85 leading-relaxed mb-4">
                  {activeModalItem.detail}
                </p>

                {activeModalItem.stat && (
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200">
                    <AlertTriangle size={16} className="text-rose-400 shrink-0" />
                    <span>
                      <strong>Key Syllabus Metric:</strong> {activeModalItem.stat}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WarmingHumanHealthScreen;
