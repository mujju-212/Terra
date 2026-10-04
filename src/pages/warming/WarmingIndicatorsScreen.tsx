import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Cloud,
  Waves,
  Mountain,
  Snowflake,
  SunMedium,
  CloudLightning,
  TreePine,
  Layers,
  FlaskConical,
  ArrowRight,
  X,
  AlertCircle,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import './WarmingIndicatorsScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface IndicatorItem {
  id: string;
  num: string;
  theme: string;
  title: string;
  icon: typeof Thermometer;
  image: string;
  stat: string;
  statSub: string;
  description: string;
  fullDetail: string;
  syllabusRef: string;
}

const indicatorCards: IndicatorItem[] = [
  {
    id: 'temp',
    num: '01',
    theme: 'theme-01',
    title: 'Global Average Temperature',
    icon: Thermometer,
    image: '/images/warming-ind-01-temp.jpg',
    stat: '+1.1°C',
    statSub: 'since pre-industrial times (1850–1900)',
    description: 'Earth\'s average surface temperature has increased due to higher greenhouse gas concentrations.',
    fullDetail:
      'Global mean surface temperature has increased by approx 1.1°C compared to 1850–1900 averages, with land surfaces heating nearly twice as fast as oceans. Radiative forcing from anthropogenic emissions is the confirmed primary driver.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Surface Thermal Trend',
  },
  {
    id: 'co2',
    num: '02',
    theme: 'theme-02',
    title: 'Atmospheric CO₂ Concentration',
    icon: Cloud,
    image: '/images/warming-ind-02-co2.jpg',
    stat: '421 ppm',
    statSub: 'in 2023 (> 50% higher than pre-industrial)',
    description: 'CO₂ levels are higher than at any time in at least 800,000 years.',
    fullDetail:
      'Pre-industrial atmospheric carbon dioxide held steady around 280 ppm for millennia. Post-industrial fossil combustion has driven concentrations past 421 ppm, committing the Earth system to multi-century thermal retention.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Greenhouse Gas Concentrations',
  },
  {
    id: 'sealevel',
    num: '03',
    theme: 'theme-03',
    title: 'Sea Level Rise',
    icon: Waves,
    image: '/images/warming-ind-03-sealevel.jpg',
    stat: '3.7 mm/year',
    statSub: 'global average',
    description: 'Sea levels are rising due to melting ice and thermal expansion of oceans.',
    fullDetail:
      'Dual mechanisms drive sea level rise: steric expansion (heated ocean water expanding) and eustatic runoff (melting glaciers and polar ice sheets). Rates have accelerated from 1.4 mm/yr to 3.7+ mm/yr.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Coastal Inundation & Hydrology',
  },
  {
    id: 'glacier',
    num: '04',
    theme: 'theme-04',
    title: 'Glacier Mass Loss',
    icon: Mountain,
    image: '/images/warming-ind-04-glacier.jpg',
    stat: '−273 Gt/year',
    statSub: '(2000–2023 average)',
    description: 'Glaciers are losing mass at an accelerating rate worldwide.',
    fullDetail:
      'Mountain glaciers lose over 270 billion metric tons of ice mass annually. This threatens freshwater river basins (e.g. Ganges, Indus, Brahmaputra) that supply drinking water and agriculture for billions downstream.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Cryospheric Mass Balance',
  },
  {
    id: 'seaice',
    num: '05',
    theme: 'theme-05',
    title: 'Arctic Sea Ice Decline',
    icon: Snowflake,
    image: '/images/warming-ind-05-seaice.jpg',
    stat: '−12.6%',
    statSub: 'per decade',
    description: 'Arctic sea ice extent is decreasing rapidly, especially in summer.',
    fullDetail:
      'Summer Arctic sea ice extent is shrinking at -12.6% per decade. As reflective white ice gives way to dark ocean waters, solar absorption spikes from ~10% to over 90%, triggering the critical ice-albedo positive feedback loop.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Polar Albedo Feedback',
  },
  {
    id: 'oceanheat',
    num: '06',
    theme: 'theme-06',
    title: 'Ocean Heat Content',
    icon: SunMedium,
    image: '/images/warming-ind-06-oceanheat.jpg',
    stat: '+450 ZJ',
    statSub: 'since 1971',
    description: 'Oceans have absorbed over 90% of the excess heat from global warming.',
    fullDetail:
      'Oceans serve as the planet\'s premier thermal buffer, absorbing over 90% of excess solar heat trapped by greenhouse gases. This ocean heat surplus accelerates marine heatwaves, coral bleaching, and severe typhoon energies.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Oceanic Thermal Sinks',
  },
  {
    id: 'weather',
    num: '07',
    theme: 'theme-07',
    title: 'Extreme Weather Events',
    icon: CloudLightning,
    image: '/images/warming-ind-07-weather.jpg',
    stat: '2–3×',
    statSub: 'more frequent and intense',
    description: 'Heatwaves, heavy rainfall, droughts and storms are becoming more frequent and severe.',
    fullDetail:
      'Thermodynamic loading of the troposphere yields supercharged atmospheric rivers, intense flash droughts, and catastrophic cyclone landfall energies capable of paralyzing municipal infrastructure.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Hydrometeorological Extremes',
  },
  {
    id: 'snow',
    num: '08',
    theme: 'theme-08',
    title: 'Snow Cover Decline',
    icon: TreePine,
    image: '/images/warming-ind-08-snow.jpg',
    stat: '−13%',
    statSub: 'since 1967 (Northern Hemisphere)',
    description: 'Snow cover has decreased significantly, affecting water availability and ecosystems.',
    fullDetail:
      'Spring snow cover extent across the Northern Hemisphere has contracted by 13% since 1967. Earlier seasonal snowmelt leads to summer soil moisture exhaustion and elevated wildfire risks across temperate continents.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Terrestrial Snow Extent',
  },
  {
    id: 'permafrost',
    num: '09',
    theme: 'theme-09',
    title: 'Permafrost Thaw',
    icon: Layers,
    image: '/images/warming-ind-09-permafrost.jpg',
    stat: '24%',
    statSub: 'of permafrost area at risk',
    description: 'Rising temperatures are thawing permafrost, releasing stored greenhouse gases.',
    fullDetail:
      'Circumpolar permafrost soils hold an estimated 1,500 billion tons of ancient organic carbon. Thawing activates microbial decomposition, venting vast quantities of methane (CH₄) and CO₂ into the atmosphere.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Permafrost Carbon Feedback',
  },
  {
    id: 'acidification',
    num: '10',
    theme: 'theme-10',
    title: 'Ocean Acidification',
    icon: FlaskConical,
    image: '/images/warming-ind-10-acidification.jpg',
    stat: '+26%',
    statSub: 'since pre-industrial times',
    description: 'Oceans are becoming more acidic as they absorb excess CO2, affecting marine life.',
    fullDetail:
      'Oceans absorb roughly 25–30% of anthropogenic CO₂, forming carbonic acid that has driven a 0.1-unit decrease in average surface seawater pH (~26% acidity surge). This severely impedes shell formation in corals and marine mollusks.',
    syllabusRef: 'BCV755B Module 5 · Section 1.2: Seawater Carbonate Chemistry',
  },
];

export function WarmingIndicatorsScreen() {
  const [activeModalCard, setActiveModalCard] = useState<IndicatorItem | null>(null);
  useModalScrollLock(Boolean(activeModalCard), () => setActiveModalCard(null));

  return (
    <section
      className="indicators-screen-container"
      id="ch-02-indicators"
      aria-label="Chapter 02: 10 Key Indicators — Evidence of a Warming Planet"
    >
      {/* ── Background Layer with Image 2 (Orbital Planetary Sunrise & Earth) ── */}
      <div className="indicators-screen-bg">
        <img
          src="/images/warming-indicators-bg.jpg"
          alt="10 Key Indicators: Planetary Sunrise over Earth and Stratospheric Clouds"
          loading="eager"
        />
        <div className="indicators-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Ambient Quote Box (Right) ── */}
      <div className="indicators-top-bar">
        {/* Left Header */}
        <div className="indicators-header-block">
          <div className="indicators-eyebrow">
            <span>MODULE 05</span>
            <span className="indicators-eyebrow-pipe">|</span>
            <span>CHAPTER 02</span>
          </div>
          <h1 className="indicators-main-title">10 Key Indicators</h1>
          <h2 className="indicators-subtitle">Evidence of a Warming Planet</h2>
          <p className="indicators-lead-text">
            These indicators provide clear and measurable evidence that Earth's climate is warming,
            based on long-term observations around the world.
          </p>
        </div>

        {/* Right Quote Box matching Image 1 */}
        <div className="indicators-quote-card">
          <span className="indicators-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="indicators-quote-text">
            The evidence for a warming planet is not just in temperatures, but all around us.
          </p>
        </div>
      </div>

      {/* ── 10 Indicator Cards Grid (2 Rows of 5 Cards) ── */}
      <div className="indicators-cards-grid">
        {indicatorCards.map((card) => {
          const IconComp = card.icon;
          return (
            <motion.div
              key={card.id}
              className={`indicator-glass-card ${card.theme}`}
              onClick={() => setActiveModalCard(card)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Card Header Strip */}
              <div className="indicator-card-head">
                <div className="indicator-head-left">
                  <span className="indicator-num-badge">{card.num}</span>
                  <span className="indicator-card-title">{card.title}</span>
                </div>
                <button
                  type="button"
                  className="indicator-card-arrow-btn"
                  aria-label={`Inspect ${card.title} details`}
                >
                  <ArrowRight size={11} />
                </button>
              </div>

              {/* Graphic Media Wrap (Icon on left + 16:9 Image) */}
              <div className="indicator-card-media-wrap">
                <div className="indicator-card-icon-col">
                  <IconComp size={18} />
                </div>
                <div className="indicator-card-img-wrap">
                  <img
                    src={card.image}
                    alt={`${card.title} observation metric visual`}
                    loading="lazy"
                  />
                  <div className="indicator-card-img-vignette" />
                </div>
              </div>

              {/* Card Body: Stat & Description */}
              <div className="indicator-card-body">
                <div className="indicator-stat-row">
                  <span className="indicator-stat-val">{card.stat}</span>
                  <span className="indicator-stat-sub">{card.statSub}</span>
                </div>
                <p className="indicator-card-desc">{card.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Interactive Detail Modal Drawer ── */}
      <AnimatePresence>
        {activeModalCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalCard(null)}
          >
            <motion.div
              className="max-w-lg w-full max-h-[85vh] overflow-y-auto bg-[#0d141e] border border-orange-500/40 rounded-xl shadow-2xl text-left"
              data-lenis-prevent
              initial={{ scale: 0.92, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
              {/* Modal Image Header */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={activeModalCard.image}
                  alt={activeModalCard.title}
                  className="w-full h-full object-fit-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d141e] via-[#0d141e]/50 to-transparent" />
                <button
                  type="button"
                  onClick={() => setActiveModalCard(null)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white/80 hover:text-white rounded-full p-1.5 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="bg-orange-500 text-black font-extrabold text-xs px-2 py-0.5 rounded">
                    {activeModalCard.num}
                  </span>
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                    {activeModalCard.syllabusRef}
                  </span>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{activeModalCard.title}</span>
                </h3>

                <div className="mb-3 p-2.5 rounded-lg bg-orange-950/40 border border-orange-500/30 text-xs text-orange-200">
                  <strong className="text-orange-400 font-bold block mb-0.5">Observed Metric:</strong>
                  <span className="text-base font-extrabold text-white mr-2">{activeModalCard.stat}</span>
                  <span className="text-white/70">{activeModalCard.statSub}</span>
                </div>

                <p className="text-xs text-white/85 leading-relaxed mb-4">
                  {activeModalCard.fullDetail}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/60">
                  <BookOpen size={13} className="text-orange-400" />
                  <span>BCV755B Conservation of Natural Resources Examination Standard</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WarmingIndicatorsScreen;
