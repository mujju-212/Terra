import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Factory,
  Flame,
  Droplet,
  CloudRain,
  Trees,
  Building,
  Target,
  Building2,
  Atom,
  MapPin,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import './PollutantClassificationScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  notes: string[];
}

const NATURAL_EXAMPLES: GalleryItem[] = [
  {
    id: 'volcanic-ash',
    title: 'Volcanic Ash',
    category: 'Natural Source · Solid Aerosol',
    image: '/images/air-natural-volcanic-ash.jpg',
    desc: 'Explosive geological eruptions propel pulverised rock, mineral crystals, and volcanic glass shards high into the stratosphere and troposphere.',
    notes: [
      'Natural primary particulate pollutant capable of altering global weather patterns.',
      'Contains fine silica particles abrasive to aircraft engines and damaging to human lungs.',
      'Syllabus reference: natural events emitting directly from identifiable geological origins.',
    ],
  },
  {
    id: 'sea-salt',
    title: 'Sea Salt Particles',
    category: 'Natural Source · Marine Aerosol',
    image: '/images/air-natural-sea-salt.jpg',
    desc: 'Breaking ocean surf and bursting bubbles eject sub-micron to coarse marine salt aerosol droplets into the coastal boundary layer.',
    notes: [
      'Dominant natural aerosol by mass across oceanic and coastal atmospheres globally.',
      'Acts as key cloud condensation nuclei (CCN), essential for natural cloud and rain formation.',
      'Corrosive action accelerates atmospheric degradation of coastal materials and structures.',
    ],
  },
  {
    id: 'pollen-spores',
    title: 'Pollen and Spores',
    category: 'Natural Source · Biological Aerosol',
    image: '/images/air-natural-pollen-spores.jpg',
    desc: 'Microscopic reproductive particles released by flowering plants, trees, grasses, and fungi suspended in ambient air.',
    notes: [
      'Major biological pollutants acting as potent seasonal allergens causing hay fever and asthma.',
      'Ranges in size from 5 µm to 100 µm, settling naturally or transported hundreds of kilometres.',
      'Part of primary biological aerosols recognized in the BCV755B environmental syllabus.',
    ],
  },
  {
    id: 'forest-fire',
    title: 'Forest Fire Smoke',
    category: 'Natural Source · Combustion Aerosol',
    image: '/images/air-natural-forest-fire.jpg',
    desc: 'Spontaneous or lightning-ignited wildfires consume forest biomass, producing massive billowing plumes of soot, fine ash, and organic mists.',
    notes: [
      'Releases dense concentrations of carbon monoxide (CO), PM2.5, volatile organic compounds, and greenhouse gases.',
      'Can generate pyrocumulonimbus clouds that inject smoke into the lower stratosphere.',
      'Natural air pollutant that significantly degrades regional ambient air quality and visibility.',
    ],
  },
];

const ANTHROPOGENIC_EXAMPLES: GalleryItem[] = [
  {
    id: 'industrial-emissions',
    title: 'Industrial Emissions',
    category: 'Anthropogenic Source · Point Source',
    image: '/images/air-anthro-industrial-emissions.jpg',
    desc: 'Continuous stack emissions from chemical manufacturing, petrochemical refineries, smelters, and heavy production plants.',
    notes: [
      'Primary stationary sources discharging sulphur oxides (SO₂), nitrogen oxides (NOₓ), and toxic metallic aerosols.',
      'Requires heavy industrial abatement equipment: Electrostatic Precipitators (ESP) and wet scrubbers.',
      'Direct cause of acid rain formation (H₂SO₄ mist) and severe industrial smog in manufacturing corridors.',
    ],
  },
  {
    id: 'vehicle-exhaust',
    title: 'Vehicle Exhaust',
    category: 'Anthropogenic Source · Mobile Line Source',
    image: '/images/air-anthro-vehicle-exhaust.jpg',
    desc: 'Combustion exhaust discharged at ground level by petrol and diesel cars, buses, and commercial transport trucks in urban traffic.',
    notes: [
      'Primary emitter of carbon monoxide (CO), which binds to haemoglobin forming carboxyhaemoglobin.',
      'Supplies NO₂ and volatile unburnt hydrocarbons (VOCs) that trigger photochemical smog under sunlight.',
      'Directly impacts pedestrians and commuters inside the urban respiration breathing zone.',
    ],
  },
  {
    id: 'thermal-power',
    title: 'Thermal Power Plants',
    category: 'Anthropogenic Source · Point Source',
    image: '/images/air-anthro-thermal-power.jpg',
    desc: 'Coal-fired power generation stations burning pulverized fossil fuel to generate electricity, discharging flue gases from super-tall stacks.',
    notes: [
      'Major producer of Fly Ash, suspended particulate matter (SPM), SO₂, and greenhouse gases.',
      'Stationary point sources emitting thousands of tons per year; regulated stringently under NAAQS.',
      'Cooling towers release large water vapour plumes that influence local micro-climate and humidity.',
    ],
  },
  {
    id: 'construction-dust',
    title: 'Construction Dust',
    category: 'Anthropogenic Source · Area Source',
    image: '/images/air-anthro-construction-dust.jpg',
    desc: 'Fugitive mineral dust generated by site excavation, concrete crushing, structural demolition, and heavy equipment earthmoving.',
    notes: [
      'Causes severe local spikes in PM10 and PM2.5, frequently exceeding the 24-hr NAAQS limit (100 µg/m³).',
      'Inhalation of crystalline silica dust causes silicosis and chronic respiratory damage.',
      'Settles on nearby buildings, soil, and vegetation, coating leaves and inhibiting photosynthesis.',
    ],
  },
];

export function PollutantClassificationScreen() {
  const [activeColumn, setActiveColumn] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Lock scroll, pause Lenis, route wheel delta and handle Escape
  useModalScrollLock(Boolean(selectedItem), () => setSelectedItem(null));

  return (
    <section className="air-sources-section" id="ch-sources">
      {/* ─── CINEMATIC HERO BACKGROUND (IMAGE 2) ─── */}
      <div className="air-sources-hero-backdrop" aria-hidden="true">
        <img
          src="/images/air-sources-hero-bg.jpg"
          alt="Atmospheric sunset over mountains, river valley, highway traffic and industrial power plants"
          className="air-sources-hero-bg-img"
        />
        <div className="air-sources-scrim-left" />
        <div className="air-sources-scrim-bottom" />
        <div className="air-sources-scrim-top" />
      </div>

      <div className="air-sources-container">
        {/* ─── HEADER ROW (Exact Match to Image 1) ─── */}
        <div className="air-sources-header-row">
          <div className="air-sources-header-left">
            <span className="air-sources-chapter-tag">CHAPTER 04</span>
            <h2 className="air-sources-title">
              Sources & Classification of Pollutants
            </h2>
            <p className="air-sources-desc">
              Air pollutants come from both natural and human activities. They can be classified based on their origin, physical state, source and location. Understanding these classifications helps in identifying control strategies and managing air quality effectively.
            </p>
          </div>

          {/* Top Right Floating Quote Card */}
          <div className="air-sources-quote-card">
            <span className="air-sources-quote-mark" aria-hidden="true">“</span>
            <blockquote className="air-sources-quote-text">
              Pollutants come from many sources, but understanding their classification is the first step toward cleaner air and a healthier environment.
            </blockquote>
          </div>
        </div>

        {/* ─── MAIN 4-COLUMN CLASSIFICATION CONTAINER ─── */}
        <div className="air-classification-box">
          <h3 className="air-classification-box-title">
            Classification of Air Pollutants
          </h3>

          <div className="air-classification-grid">
            {/* ─── COLUMN 1: BY ORIGIN ─── */}
            <div className="air-class-column">
              <button
                type="button"
                className={`air-col-header-pill ${activeColumn === 0 ? 'is-active' : ''}`}
                onClick={() => setActiveColumn(0)}
              >
                <Leaf size={16} />
                <span>By Origin</span>
              </button>

              {/* Card 1: Natural */}
              <div
                className="air-category-card air-card-green"
                onClick={() => setSelectedItem(NATURAL_EXAMPLES[0])}
              >
                <div className="air-card-icon-badge badge-green">
                  <Leaf size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-green">Natural</h4>
                  <p className="air-card-desc">
                    Occur naturally in the environment without human intervention.
                  </p>
                </div>
              </div>

              {/* Card 2: Anthropogenic */}
              <div
                className="air-category-card air-card-amber"
                onClick={() => setSelectedItem(ANTHROPOGENIC_EXAMPLES[0])}
              >
                <div className="air-card-icon-badge badge-amber">
                  <Factory size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-amber">Anthropogenic (Human-made)</h4>
                  <p className="air-card-desc">
                    Result from human activities and have significantly changed global air composition by &lt; 0.01%.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── COLUMN 2: BY PHYSICAL STATE ─── */}
            <div className="air-class-column">
              <button
                type="button"
                className={`air-col-header-pill ${activeColumn === 1 ? 'is-active' : ''}`}
                onClick={() => setActiveColumn(1)}
              >
                <Atom size={16} />
                <span>By Physical State</span>
              </button>

              {/* Card 1: Gaseous Pollutants */}
              <div
                className="air-category-card air-card-crimson"
                onClick={() =>
                  setSelectedItem({
                    id: 'gaseous-info',
                    title: 'Gaseous Air Pollutants',
                    category: 'Classification by State of Matter',
                    image: '/images/air-anthro-industrial-emissions.jpg',
                    desc: 'Pollutants that exist in a gaseous state at normal room temperature and atmospheric pressure.',
                    notes: [
                      'Major gases: Carbon Dioxide (CO₂), Carbon Monoxide (CO), Sulphur Dioxide (SO₂), and Nitrogen Oxides (NOₓ).',
                      'Travel vast distances and mix rapidly with atmospheric gases.',
                      'Requires gas-control systems like chemical scrubbers, afterburners, or carbon capture (CCS).',
                    ],
                  })
                }
              >
                <div className="air-card-icon-badge badge-crimson">
                  <Flame size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-crimson">Gaseous Pollutants</h4>
                  <p className="air-card-desc">
                    e.g. SO₂, NOₓ, CO, O₃, VOCs, CO₂
                  </p>
                </div>
              </div>

              {/* Card 2: Solid Aerosols */}
              <div
                className="air-category-card air-card-cyan"
                onClick={() =>
                  setSelectedItem({
                    id: 'solid-aerosols',
                    title: 'Solid Aerosols (Particulates)',
                    category: 'Classification by State of Matter',
                    image: '/images/air-anthro-construction-dust.jpg',
                    desc: 'Finely divided solid matter suspended in the atmosphere from mechanical grinding, abrasion, or combustion.',
                    notes: [
                      'Includes dust, soot, smoke, metallic fumes, ash, SPM, PM10, and PM2.5.',
                      'Lodge deep within pulmonary alveolar tissues when inhaled.',
                      'Captured efficiently using physical separation devices: ESP, cyclones, and fabric filters.',
                    ],
                  })
                }
              >
                <div className="air-card-icon-badge badge-cyan">
                  <Droplet size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-cyan">Solid Aerosols</h4>
                  <p className="air-card-desc">
                    e.g. dust, smoke, pollen, ash, SPM, PM₁₀, PM₂.₅
                  </p>
                </div>
              </div>

              {/* Card 3: Liquid Aerosols */}
              <div
                className="air-category-card air-card-purple"
                onClick={() =>
                  setSelectedItem({
                    id: 'liquid-aerosols',
                    title: 'Liquid Aerosols (Mists & Sprays)',
                    category: 'Classification by State of Matter',
                    image: '/images/air-natural-sea-salt.jpg',
                    desc: 'Microscopic liquid droplets suspended in air produced by condensation of vapours or liquid atomization.',
                    notes: [
                      'Includes acid mists (H₂SO₄ mist), maritime sea salt aerosols, organic pesticide sprays, and photochemical condensation.',
                      'Forms corrosive atmospheric droplets that damage vegetation, vehicle paint, and historical stone monuments.',
                    ],
                  })
                }
              >
                <div className="air-card-icon-badge badge-purple">
                  <CloudRain size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-purple">Liquid Aerosols</h4>
                  <p className="air-card-desc">
                    e.g. mist, fog, spray droplets, mists of acids or organic compounds
                  </p>
                </div>
              </div>
            </div>

            {/* ─── COLUMN 3: BY SOURCE ─── */}
            <div className="air-class-column">
              <button
                type="button"
                className={`air-col-header-pill ${activeColumn === 2 ? 'is-active' : ''}`}
                onClick={() => setActiveColumn(2)}
              >
                <Factory size={16} />
                <span>By Source</span>
              </button>

              {/* Card 1: Natural Sources */}
              <div className="air-category-card air-card-green">
                <div className="air-card-icon-badge badge-green">
                  <Trees size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-green">Natural Sources</h4>
                  <ul className="air-card-bullet-list">
                    <li>Volcanic ash</li>
                    <li>Sea salt particles</li>
                    <li>Pollen and spores</li>
                    <li>Smoke from forest fires</li>
                    <li>Windblown dust</li>
                  </ul>
                </div>
              </div>

              {/* Card 2: Anthropogenic Sources */}
              <div className="air-category-card air-card-amber">
                <div className="air-card-icon-badge badge-amber">
                  <Building size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-amber">Anthropogenic Sources</h4>
                  <ul className="air-card-bullet-list">
                    <li>Industrial emissions</li>
                    <li>Vehicle exhaust</li>
                    <li>Thermal power plants</li>
                    <li>Construction activities</li>
                    <li>Agricultural burning</li>
                    <li>Domestic fuel combustion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ─── COLUMN 4: BY LOCATION ─── */}
            <div className="air-class-column">
              <button
                type="button"
                className={`air-col-header-pill ${activeColumn === 3 ? 'is-active' : ''}`}
                onClick={() => setActiveColumn(3)}
              >
                <MapPin size={16} />
                <span>By Location</span>
              </button>

              {/* Card 1: Point Sources */}
              <div
                className="air-category-card air-card-coral"
                onClick={() =>
                  setSelectedItem({
                    id: 'point-sources',
                    title: 'Stationary Point Sources',
                    category: 'Classification by Emission Location',
                    image: '/images/air-anthro-thermal-power.jpg',
                    desc: 'A single, stationary, identifiable industrial emitter releasing consistent volumes of flue gases into the atmosphere.',
                    notes: [
                      'Syllabus standard: A facility is considered significant if it emits one ton or more in a calendar year.',
                      'Examples include power generation stacks, chemical smelting furnaces, and incinerator vents.',
                    ],
                  })
                }
              >
                <div className="air-card-icon-badge badge-coral">
                  <Target size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-coral">Point Sources</h4>
                  <p className="air-card-desc">
                    Single, identifiable sources (e.g. factory chimneys, power plants).
                  </p>
                </div>
              </div>

              {/* Card 2: Area Sources */}
              <div
                className="air-category-card air-card-coral"
                onClick={() =>
                  setSelectedItem({
                    id: 'area-sources',
                    title: 'Stationary Area Sources',
                    category: 'Classification by Emission Location',
                    image: '/images/air-anthro-vehicle-exhaust.jpg',
                    desc: 'A cluster of numerous smaller stationary or mobile emitters situated across a geographical zone.',
                    notes: [
                      'Individual emissions may be low, but cumulative total emissions are extremely significant.',
                      'Typically emits < 25 tons/year combined HAP, or < 10 tons/year single HAP.',
                      'Examples: railyards, urban heating, open burning, quarrying, and solvent tank farms.',
                    ],
                  })
                }
              >
                <div className="air-card-icon-badge badge-coral">
                  <Building2 size={18} />
                </div>
                <div className="air-card-content">
                  <h4 className="air-card-title title-coral">Area Sources</h4>
                  <p className="air-card-desc">
                    Multiple small sources over a wide area (e.g. urban areas, residential heating, vehicle emissions).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── DUAL GALLERIES SECTION (Exact Match to Image 1) ─── */}
        <div className="air-galleries-row">
          {/* Panel 1: Examples of Natural Sources */}
          <div className="air-gallery-panel">
            <h4 className="air-gallery-panel-title">
              Examples of Natural Sources
            </h4>
            <div className="air-gallery-cards-grid">
              {NATURAL_EXAMPLES.map((item) => (
                <div
                  key={item.id}
                  className="air-image-card"
                  onClick={() => setSelectedItem(item)}
                  title={`View details of ${item.title}`}
                >
                  <div className="air-image-thumb-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="air-image-thumb"
                      loading="lazy"
                    />
                  </div>
                  <div className="air-image-card-caption">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Examples of Anthropogenic Sources */}
          <div className="air-gallery-panel">
            <h4 className="air-gallery-panel-title">
              Examples of Anthropogenic Sources
            </h4>
            <div className="air-gallery-cards-grid">
              {ANTHROPOGENIC_EXAMPLES.map((item) => (
                <div
                  key={item.id}
                  className="air-image-card"
                  onClick={() => setSelectedItem(item)}
                  title={`View details of ${item.title}`}
                >
                  <div className="air-image-thumb-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="air-image-thumb"
                      loading="lazy"
                    />
                  </div>
                  <div className="air-image-card-caption">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── INTERACTIVE DETAIL LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="air-modal-backdrop"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="air-modal-content"
              data-lenis-prevent
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="air-modal-img-wrap">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="air-modal-img"
                />
                <button
                  type="button"
                  className="air-modal-close-btn"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="air-modal-body">
                <div className="air-modal-category">{selectedItem.category}</div>
                <h3 className="air-modal-title">{selectedItem.title}</h3>
                <p className="air-modal-desc">{selectedItem.desc}</p>

                <div className="air-modal-syllabus-notes">
                  <h5>Syllabus Concepts & Key Observations</h5>
                  <ul>
                    {selectedItem.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default PollutantClassificationScreen;
