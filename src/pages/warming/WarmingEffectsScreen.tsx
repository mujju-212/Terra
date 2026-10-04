import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Snowflake,
  Waves,
  CloudLightning,
  CloudRain,
  Leaf,
  Wheat,
  Droplets,
  TrendingDown,
  Users,
  ArrowRight,
  X,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import './WarmingEffectsScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface EffectCardItem {
  id: string;
  num: string;
  theme: string;
  title: string;
  icon: typeof Thermometer;
  image: string;
  description: string;
  stat?: string;
  fullDetail: string;
  impactZone: string;
}

const effectCards: EffectCardItem[] = [
  {
    id: 'temp',
    num: '01',
    theme: 'theme-01',
    title: 'Rising Temperatures',
    icon: Thermometer,
    image: '/images/warming-effect-01-temp.jpg',
    description: 'Increase in average surface temperatures, more frequent and intense heat waves.',
    stat: '+1.1°C to +1.5°C global surface anomaly',
    fullDetail:
      'Continuous global surface heating breaks thermal records worldwide. Sustained heat waves exacerbate urban heat islands, degrade soil moisture, and spike mortality among vulnerable demographic groups.',
    impactZone: 'Global Atmosphere & Terrestrial Surfaces',
  },
  {
    id: 'ice',
    num: '02',
    theme: 'theme-02',
    title: 'Melting Ice & Glaciers',
    icon: Snowflake,
    image: '/images/warming-effect-02-ice.jpg',
    description: 'Rapid melting of glaciers, ice sheets and polar ice, reducing earth\'s cryosphere.',
    stat: '~267 billion tons of glacier mass lost annually',
    fullDetail:
      'Mountain glaciers in the Himalayas, Andes, and Alps are retreating at historic rates. This diminishes downstream dry-season river flow relied upon by billions of people for agriculture and municipal drinking supplies.',
    impactZone: 'Cryosphere (Polar & Mountain Ice)',
  },
  {
    id: 'sea',
    num: '03',
    theme: 'theme-03',
    title: 'Sea Level Rise',
    icon: Waves,
    image: '/images/warming-effect-03-sealevel.jpg',
    description: 'Thermal expansion of oceans and melting ice lead to higher sea levels and coastal flooding.',
    stat: '3.7 mm/year acceleration (IPCC AR6)',
    fullDetail:
      'Thermal expansion of heated ocean water combined with meltwater from Greenland and Antarctica elevates global sea levels, eroding shorelines, spoiling coastal aquifers with saltwater intrusion, and displacing island populations.',
    impactZone: 'Coastal Zones & Island Nations',
  },
  {
    id: 'weather',
    num: '04',
    theme: 'theme-04',
    title: 'Extreme Weather Events',
    icon: CloudLightning,
    image: '/images/warming-effect-04-weather.jpg',
    description: 'More frequent and intense heat waves, heavy rainfall, droughts, storms and cyclones.',
    stat: 'Cat 4 & 5 cyclones up ~30% in frequency',
    fullDetail:
      'Thermodynamic loading of the troposphere yields supercharged atmospheric rivers, intense flash droughts, and catastrophic cyclone landfall energies capable of paralyzing municipal infrastructure.',
    impactZone: 'Atmosphere & Civil Infrastructure',
  },
  {
    id: 'precip',
    num: '05',
    theme: 'theme-05',
    title: 'Changes in Precipitation Patterns',
    icon: CloudRain,
    image: '/images/warming-effect-05-precip.jpg',
    description: 'Altered rainfall distribution causing droughts in some regions and floods in others.',
    stat: '+7% water vapor capacity per 1°C heating',
    fullDetail:
      'Clausius-Clapeyron dynamics intensify the hydrological cycle. Semiarid regions suffer protracted droughts, while equatorial and temperate zones experience short-duration torrential downpours causing urban washouts.',
    impactZone: 'Hydrological Basin Systems',
  },
  {
    id: 'ecosystem',
    num: '06',
    theme: 'theme-06',
    title: 'Ecosystem Disruption',
    icon: Leaf,
    image: '/images/warming-effect-06-ecosystem.jpg',
    description: 'Loss of habitats, coral bleaching, shifts in species distribution and biodiversity loss.',
    stat: '70%–90% of coral reefs face destruction at 1.5°C',
    fullDetail:
      'Marine heatwaves trigger catastrophic coral bleaching events, dismantling nursery habitats for 25% of all marine life. Terrestrial species face phenological mismatches where breeding cycles drift out of phase with food supplies.',
    impactZone: 'Marine & Forest Ecosystems',
  },
  {
    id: 'agriculture',
    num: '07',
    theme: 'theme-07',
    title: 'Impact on Agriculture',
    icon: Wheat,
    image: '/images/warming-effect-07-agriculture.jpg',
    description: 'Reduced crop yields, altered growing seasons and increased risk of food insecurity.',
    stat: 'Estimated -5% yield decline per degree of warming',
    fullDetail:
      'Staple crops (wheat, rice, maize) exhibit heat and moisture stress during critical pollination stages. Increased weed and pest vectors further degrade food yields across tropical developing economies.',
    impactZone: 'Agronomic Systems & Food Supply',
  },
  {
    id: 'water',
    num: '08',
    theme: 'theme-08',
    title: 'Water Scarcity',
    icon: Droplets,
    image: '/images/warming-effect-08-water.jpg',
    description: 'Changes in rainfall and higher evaporation lead to freshwater shortages.',
    stat: 'Over 2 billion people in water-stressed nations',
    fullDetail:
      'Heightened potential evapotranspiration (PET) drains reservoirs and dries out topsoils. Groundwater over-pumping exacerbates regional aquifer exhaustion in key agricultural breadbaskets.',
    impactZone: 'Freshwater Aquifers & Surface Basins',
  },
  {
    id: 'economy',
    num: '09',
    theme: 'theme-09',
    title: 'Economic Impacts',
    icon: TrendingDown,
    image: '/images/warming-effect-09-economy.jpg',
    description: 'Damage to infrastructure, higher adaptation costs and losses in key sectors.',
    stat: '$1.7T to $3.1T annual global GDP losses by 2050',
    fullDetail:
      'Climate disasters erode capital stock, interrupt supply chain logistics, and inflate insurance premiums. Developing economies spend mounting portions of national GDP on emergency disaster recovery rather than development.',
    impactZone: 'Global Markets & Public Infrastructure',
  },
  {
    id: 'social',
    num: '10',
    theme: 'theme-10',
    title: 'Social Impacts',
    icon: Users,
    image: '/images/warming-effect-10-social.jpg',
    description: 'Health risks, displacement of communities and increased climate-related conflicts.',
    stat: '216 million potential internal climate migrants (World Bank)',
    fullDetail:
      'Prolonged environmental degradation triggers rural-to-urban distress migration, competition over dwindling river water resources, and escalating transmission rates of water- and vector-borne diseases.',
    impactZone: 'Human Societies & Vulnerable Communities',
  },
];

export function WarmingEffectsScreen() {
  const [activeModalCard, setActiveModalCard] = useState<EffectCardItem | null>(null);
  useModalScrollLock(Boolean(activeModalCard), () => setActiveModalCard(null));

  return (
    <section
      className="effects-screen-container"
      id="ch-04-effects"
      aria-label="Chapter 04: Effects of Global Warming — Impact on Earth's Systems"
    >
      {/* ── Background Layer with Image 2 (Split World: Lush Paradise vs Fiery Scorched Earth) ── */}
      <div className="effects-screen-bg">
        <img
          src="/images/warming-effects-bg.jpg"
          alt="Effects of Global Warming: Pristine Nature vs Molten Earth and Industrial Wasteland"
          loading="eager"
        />
        <div className="effects-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Ambient Quote Box (Right) ── */}
      <div className="effects-top-bar">
        {/* Left Header */}
        <div className="effects-header-block">
          <div className="effects-eyebrow">
            <span>MODULE 05</span>
            <span className="effects-eyebrow-pipe">|</span>
            <span>CHAPTER 04</span>
          </div>
          <h1 className="effects-main-title">Effects of Global Warming</h1>
          <h2 className="effects-subtitle">Impact on Earth's Systems</h2>
          <p className="effects-lead-text">
            Global warming affects all major components of the Earth system — atmosphere, oceans,
            cryosphere, land and living organisms — leading to far-reaching environmental, social and
            economic impacts.
          </p>
        </div>

        {/* Right Quote Box matching Image 1 */}
        <div className="effects-quote-card">
          <span className="effects-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="effects-quote-text">
            A warmer planet doesn't just change temperatures — it reshapes life as we know it.
          </p>
        </div>
      </div>

      {/* ── 10 Effects Cards Grid (2 Rows of 5 Cards) ── */}
      <div className="effects-cards-grid">
        {effectCards.map((card) => {
          const IconComp = card.icon;
          return (
            <motion.div
              key={card.id}
              className={`effect-glass-card ${card.theme}`}
              onClick={() => setActiveModalCard(card)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Card Header Strip */}
              <div className="effect-card-head">
                <div className="effect-head-left">
                  <span className="effect-num-badge">{card.num}</span>
                  <span className="effect-card-title">{card.title}</span>
                </div>
                <button
                  type="button"
                  className="effect-card-arrow-btn"
                  aria-label={`Inspect ${card.title} details`}
                >
                  <ArrowRight size={11} />
                </button>
              </div>

              {/* Graphic Media Wrap (Icon on left + 16:9 Image) */}
              <div className="effect-card-media-wrap">
                <div className="effect-card-icon-col">
                  <IconComp size={18} />
                </div>
                <div className="effect-card-img-wrap">
                  <img
                    src={card.image}
                    alt={`${card.title} climate impact visual`}
                    loading="lazy"
                  />
                  <div className="effect-card-img-vignette" />
                </div>
              </div>

              {/* Card Description */}
              <p className="effect-card-desc">{card.description}</p>
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
              {/* Modal Header Image Banner */}
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
                    {activeModalCard.impactZone}
                  </span>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{activeModalCard.title}</span>
                </h3>

                <p className="text-xs text-white/85 leading-relaxed mb-4">
                  {activeModalCard.fullDetail}
                </p>

                {activeModalCard.stat && (
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-orange-950/40 border border-orange-500/30 text-xs text-orange-200">
                    <AlertTriangle size={15} className="text-orange-400 shrink-0" />
                    <span>
                      <strong>Key Metric:</strong> {activeModalCard.stat}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WarmingEffectsScreen;
