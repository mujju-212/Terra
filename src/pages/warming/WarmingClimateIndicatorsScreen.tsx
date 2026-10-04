import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Mountain,
  Waves,
  HeartPulse,
  Wind,
  CloudRain,
  Zap,
  Trees,
  ArrowRight,
  X,
  BarChart3,
  Globe,
  Leaf,
  Sparkles,
  Info,
} from 'lucide-react';
import './WarmingClimateIndicatorsScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface ClimateIndicatorItem {
  id: string;
  num: number;
  theme: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  icon: typeof Thermometer;
  color: string;
  // Node coordinates inside the 320x320 globe area
  nodeX: number;
  nodeY: number;
  // Path for SVG connector relative to 440x360 SVG stage
  pathD: string;
  stat: string;
  fullDetail: string;
  syllabusRef: string;
  impactZone: string;
}

const climateIndicatorsList: ClimateIndicatorItem[] = [
  // ── LEFT COLUMN: INDICATORS 1 TO 4 ──
  {
    id: 'warming',
    num: 1,
    theme: 'theme-01',
    title: 'Global Warming',
    subtitle: 'Rising global average temperatures',
    thumbnail: '/images/climate-ind-01-temp.jpg',
    icon: Thermometer,
    color: '#ef4444',
    nodeX: 95,
    nodeY: 105,
    pathD: 'M 0,45 L 50,45 Q 65,45 72,65 L 95,105',
    stat: '+1.1°C to +1.2°C above pre-industrial',
    fullDetail:
      'Long-term observations show an uninterrupted upward trajectory in Earth’s mean tropospheric temperature. Accelerated since the 1960s, the 20th and 21st centuries feature the highest temperature anomalies recorded in over a millennium.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2: Global Surface Temperature Anomaly',
    impactZone: 'Global Planetary Atmosphere & Oceans',
  },
  {
    id: 'ice',
    num: 2,
    theme: 'theme-02',
    title: 'Polar & Glacial Ice Changes',
    subtitle: 'Melting glaciers and shrinking ice sheets',
    thumbnail: '/images/warming-ind-04-glacier.jpg',
    icon: Mountain,
    color: '#38bdf8',
    nodeX: 135,
    nodeY: 55,
    pathD: 'M 0,125 L 75,125 Q 95,125 108,100 L 135,55',
    stat: '−13% Arctic sea ice extent per decade',
    fullDetail:
      'Large volumes of continental glaciers and marine ice shelves are collapsing. This drives thermal sea level rise, obliterates hunting platforms for polar bears, and destabilizes the ancestral lifestyle of Arctic Inuit indigenous communities.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2: Polar Ice Retreat & Indigenous Livelihoods',
    impactZone: 'Cryosphere, Arctic Basin & Mountain Ranges',
  },
  {
    id: 'acidity',
    num: 3,
    theme: 'theme-03',
    title: 'Ocean Acidity',
    subtitle: 'Increasing ocean acidity (lower pH)',
    thumbnail: '/images/indicator-acidification.jpg',
    icon: Waves,
    color: '#14b8a6',
    nodeX: 85,
    nodeY: 185,
    pathD: 'M 0,205 L 45,205 Q 65,205 74,195 L 85,185',
    stat: '+26% increase in oceanic hydrogen ions (pH −0.1)',
    fullDetail:
      'Oceans have sequestered roughly 50% of all anthropogenic fossil fuel CO₂ over the past two centuries. Dissolved CO₂ forms carbonic acid (H₂CO₃), impeding calcification in coral reefs (which shelter 25% of all marine life) and marine plankton.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2: Seawater Carbonic Acid Chemistry',
    impactZone: 'Marine Pelagic & Coral Reef Ecosystems',
  },
  {
    id: 'health',
    num: 4,
    theme: 'theme-04',
    title: 'Climate & Human Health',
    subtitle: 'Growing health risks due to climate change',
    thumbnail: '/images/climate-ind-04-health.jpg',
    icon: HeartPulse,
    color: '#22c55e',
    nodeX: 110,
    nodeY: 245,
    pathD: 'M 0,285 L 60,285 Q 85,285 96,268 L 110,245',
    stat: '150,000 deaths annually (WHO climate estimate)',
    fullDetail:
      'Thermal extremes trigger deadly heatstrokes (35,000 fatalities in European heatwaves alone). Expanded mosquito vectors spread malaria and dengue into temperate latitudes, while airborne dust storms, moulds, and prolonged pollen seasons amplify asthma.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2 & 2.3: Human Health Impacts & Vector Spread',
    impactZone: 'Human Settlements, Cities & Public Healthcare',
  },

  // ── RIGHT COLUMN: INDICATORS 5 TO 8 ──
  {
    id: 'wind',
    num: 5,
    theme: 'theme-05',
    title: 'Changing Wind Patterns',
    subtitle: 'Shifts in global wind systems',
    thumbnail: '/images/climate-ind-05-wind.jpg',
    icon: Wind,
    color: '#d946ef',
    nodeX: 205,
    nodeY: 75,
    pathD: 'M 440,45 L 385,45 Q 365,45 352,65 L 205,75',
    stat: 'Unprecedented fluctuations in tropospheric jet streams',
    fullDetail:
      'Unequal latitudinal warming alters global atmospheric pressure gradients. Fluctuations in trade winds and meandering jet streams push warm air deep into the Arctic, accelerating sea ice melt and disrupting established monsoon schedules.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2: Global Wind Circulation Systems',
    impactZone: 'Upper Troposphere & Planetary Jet Streams',
  },
  {
    id: 'precip',
    num: 6,
    theme: 'theme-06',
    title: 'Changing Precipitation Patterns',
    subtitle: 'Altered rainfall distribution (more droughts & floods)',
    thumbnail: '/images/climate-ind-06-precip.jpg',
    icon: CloudRain,
    color: '#0ea5e9',
    nodeX: 235,
    nodeY: 135,
    pathD: 'M 440,125 L 360,125 Q 340,125 328,140 L 235,135',
    stat: '+7% atmospheric moisture holding capacity per °C',
    fullDetail:
      'Intensified surface evaporation triggers severe hydrological polarisation. Arid agricultural zones suffer extended droughts, while sub-polar regions (e.g. Ontario, Canada with +1.4°C warming) witness surges in heavy rainfall and extreme blizzards.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2: Clausius-Clapeyron Hydrological Dynamics',
    impactZone: 'Agricultural Basins & Freshwater Catchments',
  },
  {
    id: 'storms',
    num: 7,
    theme: 'theme-07',
    title: 'Storm Intensity and Frequency',
    subtitle: 'More frequent and stronger extreme events',
    thumbnail: '/images/climate-ind-07-cyclone.jpg',
    icon: Zap,
    color: '#f59e0b',
    nodeX: 215,
    nodeY: 205,
    pathD: 'M 440,205 L 375,205 Q 355,205 342,195 L 215,205',
    stat: '+0.33°C tropical sea warming since 1981',
    fullDetail:
      'Tropical cyclones draw kinetic force directly from warm surface waters. Elevated sea temperatures supercharge convective updrafts, transforming normal atmospheric depressions into destructive Category 4 and 5 hurricanes with catastrophic storm surges.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2: Tropical Cyclonic Thermal Engines',
    impactZone: 'Coastal Belts & Low-Lying Island Nations',
  },
  {
    id: 'biomes',
    num: 8,
    theme: 'theme-08',
    title: 'Changing Biomes',
    subtitle: 'Shifts in ecosystems and species distribution',
    thumbnail: '/images/climate-ind-08-biomes.jpg',
    icon: Trees,
    color: '#a855f7',
    nodeX: 210,
    nodeY: 255,
    pathD: 'M 440,285 L 365,285 Q 345,285 332,268 L 210,255',
    stat: '> 1,000,000 species at risk of extinction',
    fullDetail:
      'Vegetation zones and faunal ranges are migrating poleward and toward higher elevations to stay within their thermal comfort envelopes. Species with restricted mobility or fragmented migratory corridors face irreversible extinction.',
    syllabusRef: 'BCV755B Module 5 · Section 2.2: Altitudinal and Latitudinal Biome Shifts',
    impactZone: 'Terrestrial Forests, Savannas & Tundra Biomes',
  },
];

export function WarmingClimateIndicatorsScreen() {
  const [activeCardId, setActiveCardId] = useState<string>('ice');
  const [modalItem, setModalItem] = useState<ClimateIndicatorItem | null>(null);
  useModalScrollLock(Boolean(modalItem), () => setModalItem(null));

  const leftCards = climateIndicatorsList.slice(0, 4);
  const rightCards = climateIndicatorsList.slice(4, 8);
  const activeItem = climateIndicatorsList.find((item) => item.id === activeCardId) || climateIndicatorsList[0];

  return (
    <section
      className="climate-ind-screen-container"
      id="ch-06-climate-ind"
      aria-label="Chapter 06: 8 Indicators of Climate Change — Key Signs of a Changing Planet"
    >
      {/* ── Background Layer with Image 2 (Alpine Mountain Lake & Twilight Reflections) ── */}
      <div className="climate-ind-screen-bg">
        <img
          src="/images/warming-climate-indicators-bg.jpg"
          alt="8 Indicators of Climate Change: Alpine Lake and Snow Peaks at Twilight"
          loading="eager"
        />
        <div className="climate-ind-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Cyan Ambient Quote Card (Right) ── */}
      <div className="climate-ind-top-bar">
        {/* Left Header */}
        <div className="climate-ind-header-block">
          <div className="climate-ind-eyebrow">
            <span>MODULE 05</span>
            <span className="climate-ind-eyebrow-pipe">|</span>
            <span>CHAPTER 06</span>
          </div>
          <h1 className="climate-ind-main-title">8 Indicators of Climate Change</h1>
          <h2 className="climate-ind-subtitle">Key Signs of a Changing Planet</h2>
          <p className="climate-ind-lead-text">
            These eight indicators, based on long-term global observations, provide strong evidence
            that Earth&apos;s climate is changing. Click on each indicator to explore the data,
            visualizations and key insights.
          </p>
        </div>

        {/* Right Quote Box matching Image 1 */}
        <div className="climate-ind-quote-card">
          <span className="climate-ind-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="climate-ind-quote-text">
            &ldquo;The Earth is changing. The evidence is all around us — in the air, oceans, ice, land
            and living systems.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Main Stage: Left Cards (1-4) + Glowing Central Earth Globe + Right Cards (5-8) ── */}
      <div className="climate-ind-stage-container">
        {/* Left Column: Indicators 1 to 4 */}
        <div className="climate-cards-col">
          {leftCards.map((card) => {
            const Icon = card.icon;
            const isActive = activeCardId === card.id;

            return (
              <div
                key={card.id}
                className={`climate-glass-card ${card.theme} ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveCardId(card.id)}
                onClick={() => setModalItem(card)}
                role="button"
                tabIndex={0}
                aria-label={`Explore indicator ${card.num}: ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModalItem(card);
                  }
                }}
              >
                {/* Identity: Number circle + Icon */}
                <div className="climate-card-identity">
                  <span className="climate-num-circle">{card.num}</span>
                  <div className="climate-icon-box">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="climate-card-info">
                  <span className="climate-card-title">{card.title}</span>
                  <span className="climate-card-subtitle">{card.subtitle}</span>
                </div>

                {/* 16:9 Thumbnail Image */}
                <div className="climate-card-thumb-wrap">
                  <img src={card.thumbnail} alt={card.title} loading="lazy" />
                  <div className="climate-card-thumb-overlay" />
                </div>

                {/* Arrow Button */}
                <div className="climate-card-arrow-btn" aria-hidden="true">
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Column: Glowing 3D Earth Globe with Connected SVG Traces */}
        <div className="climate-globe-center-col">
          <div className="climate-globe-wrapper">
            {/* Illuminated Glowing Earth */}
            <img
              src="/images/warming-climate-globe.jpg"
              alt="Central glowing Earth globe with illuminated blue oceans and atmosphere"
              className="climate-globe-img"
              loading="eager"
            />
            <div className="climate-globe-halo" />

            {/* Connected Neon Circuit SVG Overlay */}
            <svg
              className="climate-connectors-svg"
              viewBox="0 0 440 340"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connecting circuit lines */}
              {climateIndicatorsList.map((item) => {
                const isActive = activeCardId === item.id;
                // Shift coordinates slightly for 440x340 SVG viewport:
                // Globe center is at (220, 170), radius ~160px.
                // Left cards connect from x=0, right cards from x=440.
                const globeOffsetX = 60; // 440 - 320 = 120 / 2 = 60
                const globeOffsetY = 10; // 340 - 320 = 20 / 2 = 10
                const gx = item.nodeX + globeOffsetX;
                const gy = item.nodeY + globeOffsetY;

                const isLeft = item.num <= 4;
                const cardY = (item.num <= 4 ? item.num - 1 : item.num - 5) * 78 + 42;
                const pathString = isLeft
                  ? `M 0,${cardY} L 60,${cardY} Q 90,${cardY} 110,${(cardY + gy) / 2} L ${gx},${gy}`
                  : `M 440,${cardY} L 380,${cardY} Q 350,${cardY} 330,${(cardY + gy) / 2} L ${gx},${gy}`;

                return (
                  <path
                    key={`line-${item.id}`}
                    d={pathString}
                    className={`climate-trace-path ${isActive ? 'is-active' : ''}`}
                    stroke={item.color}
                    style={{
                      strokeOpacity: isActive ? 1 : 0.45,
                      filter: isActive ? 'url(#neonGlow)' : undefined,
                    }}
                  />
                );
              })}

              {/* Interactive glowing pins on the globe */}
              {climateIndicatorsList.map((item) => {
                const isActive = activeCardId === item.id;
                const globeOffsetX = 60;
                const globeOffsetY = 10;
                const gx = item.nodeX + globeOffsetX;
                const gy = item.nodeY + globeOffsetY;

                return (
                  <g
                    key={`node-${item.id}`}
                    className="climate-globe-node"
                    onClick={() => {
                      setActiveCardId(item.id);
                      setModalItem(item);
                    }}
                  >
                    {isActive && (
                      <circle
                        cx={gx}
                        cy={gy}
                        r={12}
                        fill="none"
                        stroke={item.color}
                        strokeWidth="1.5"
                        opacity="0.8"
                      >
                        <animate
                          attributeName="r"
                          values="8;18;8"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.9;0.2;0.9"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <circle
                      cx={gx}
                      cy={gy}
                      r={isActive ? 6 : 4}
                      fill={item.color}
                      stroke="#ffffff"
                      strokeWidth={isActive ? 2 : 1}
                      filter="drop-shadow(0 0 4px currentColor)"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Column: Indicators 5 to 8 */}
        <div className="climate-cards-col">
          {rightCards.map((card) => {
            const Icon = card.icon;
            const isActive = activeCardId === card.id;

            return (
              <div
                key={card.id}
                className={`climate-glass-card ${card.theme} ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveCardId(card.id)}
                onClick={() => setModalItem(card)}
                role="button"
                tabIndex={0}
                aria-label={`Explore indicator ${card.num}: ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModalItem(card);
                  }
                }}
              >
                {/* Identity: Number circle + Icon */}
                <div className="climate-card-identity">
                  <span className="climate-num-circle">{card.num}</span>
                  <div className="climate-icon-box">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="climate-card-info">
                  <span className="climate-card-title">{card.title}</span>
                  <span className="climate-card-subtitle">{card.subtitle}</span>
                </div>

                {/* 16:9 Thumbnail Image */}
                <div className="climate-card-thumb-wrap">
                  <img src={card.thumbnail} alt={card.title} loading="lazy" />
                  <div className="climate-card-thumb-overlay" />
                </div>

                {/* Arrow Button */}
                <div className="climate-card-arrow-btn" aria-hidden="true">
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Strip: 3 Key Insight Glass Panels (Matches Image 1) ── */}
      <div className="climate-ind-bottom-strip">
        {/* Panel 1 */}
        <div className="climate-insight-col theme-cyan">
          <div className="climate-insight-icon-wrap">
            <BarChart3 size={18} />
          </div>
          <div className="climate-insight-body">
            <h3 className="climate-insight-title">Key Insight</h3>
            <p className="climate-insight-desc">
              All eight indicators are interlinked and together provide strong evidence of a
              changing climate.
            </p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="climate-insight-col theme-blue">
          <div className="climate-insight-icon-wrap">
            <Globe size={18} />
          </div>
          <div className="climate-insight-body">
            <h3 className="climate-insight-title">Global Impact</h3>
            <p className="climate-insight-desc">
              These changes affect ecosystems, economies and human well-being worldwide.
            </p>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="climate-insight-col theme-green">
          <div className="climate-insight-icon-wrap">
            <Leaf size={18} />
          </div>
          <div className="climate-insight-body">
            <h3 className="climate-insight-title">Take Action</h3>
            <p className="climate-insight-desc">
              Understanding these indicators helps us build a more resilient and sustainable future.
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive Detail Modal ── */}
      <AnimatePresence>
        {modalItem && (
          <div
            className="climate-modal-backdrop"
            onClick={() => setModalItem(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="climate-modal-window"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="climate-modal-hero-wrap">
                <img src={modalItem.thumbnail} alt={modalItem.title} />
                <div className="climate-modal-hero-vignette" />
                <button
                  type="button"
                  className="climate-modal-close-btn"
                  onClick={() => setModalItem(null)}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="climate-modal-body">
                <span className="climate-modal-eyebrow">
                  {modalItem.syllabusRef} · Indicator #{modalItem.num}
                </span>
                <h2 className="climate-modal-title">{modalItem.title}</h2>

                <div className="climate-modal-stat-pill">
                  <Sparkles size={14} />
                  <span>{modalItem.stat}</span>
                </div>

                <p className="climate-modal-desc">{modalItem.fullDetail}</p>

                <div className="climate-modal-box">
                  <strong>Primary Impact Realm: </strong>
                  <span>{modalItem.impactZone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
