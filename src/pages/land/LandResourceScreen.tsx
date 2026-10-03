import React, { useState } from 'react';
import { Mountain, Droplet, Trees, Globe, ArrowRight, ArrowLeft, Wheat, Building2, Factory, Users2, X } from 'lucide-react';
import { Reveal, CountUp } from './motion';
import { useModalScrollLock } from './helpers/useModalScrollLock';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function LandResourceScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  const [selectedContinent, setSelectedContinent] = useState(0);
  const [activeContinentModal, setActiveContinentModal] = useState<number | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Airtight background scroll lock + Escape-to-close while the modal is open
  useModalScrollLock(activeContinentModal !== null, {
    scrollableSelector: '.continent-modal-dialog',
    onClose: () => setActiveContinentModal(null),
  });

  useModalScrollLock(isMapModalOpen, {
    scrollableSelector: '.map-modal-dialog',
    onClose: () => setIsMapModalOpen(false),
  });

  const continents = [
    {
      name: 'Asia',
      area: '~44.6 million km²',
      share: '29.8% of global land',
      population: '4.75 Billion (~59% of humanity)',
      desc: 'Largest continent (~44.6 million km²)',
      thumb: '/images/continent-asia.jpg',
      biomes: ['Himalayan Alpine', 'Tibetan Plateau', 'Siberian Taiga', 'Tropical Monsoon', 'Steppe & Gobi'],
      resources: 'Major alluvial breadbaskets (Ganges, Yangtze, Indus), vast timber boreal reserves, rich mineral deposits, high biodiversity in tropical Southeast Asia.',
      pressures: 'High population density pressure, intensive agriculture leading to soil degradation, desertification across northern arid zones, rapid wetland conversion.',
      keyFact: 'Hosts Earth’s highest landform (Mount Everest at 8,848 m) and the deepest continental depression (Dead Sea shore at −430 m).',
    },
    {
      name: 'Africa',
      area: '~30.4 million km²',
      share: '20.4% of global land',
      population: '1.45 Billion (~18% of humanity)',
      desc: '~30.4 million km²',
      thumb: '/images/continent-africa.jpg',
      biomes: ['Sahara Arid Desert', 'Sahelian Transition', 'Congo Rainforest', 'Serengeti Savanna', 'Rift Valley Highlands'],
      resources: '60% of the world’s uncultivated arable land, critical mineral wealth (cobalt, lithium, gold), massive river networks (Nile, Congo, Zambezi, Niger).',
      pressures: 'Vulnerability to droughts and desertification in the Sahel, deforestation for fuel and agriculture, soil nutrient depletion in rainfed farming systems.',
      keyFact: 'The East African Rift Valley is actively pulling the continent apart, demonstrating ongoing continental drift and crustal splitting.',
    },
    {
      name: 'North America',
      area: '~24.7 million km²',
      share: '16.5% of global land',
      population: '600 Million (~7.5% of humanity)',
      desc: '~24.7 million km²',
      thumb: '/images/continent-north-america.jpg',
      biomes: ['Rocky Mountain Alpine', 'Great Plains Grasslands', 'Canadian Boreal Shield', 'Sonoran Desert', 'Deciduous Eastern Forests'],
      resources: 'Deep fertile mollisol prairie soils (global agricultural exporter), extensive boreal freshwater lakes (Great Lakes hold 21% of surface freshwater), vast timber.',
      pressures: 'Groundwater depletion (e.g. Ogallala Aquifer), agricultural soil runoff, suburban sprawl sealing fertile farmland, climate-driven forest wildfires.',
      keyFact: 'The North American craton contains some of Earth’s oldest preserved continental crust, dating back over 4 billion years.',
    },
    {
      name: 'South America',
      area: '~17.8 million km²',
      share: '12.0% of global land',
      population: '435 Million (~5.4% of humanity)',
      desc: '~17.8 million km²',
      thumb: '/images/continent-south-america.jpg',
      biomes: ['Amazonian Rainforest', 'Andean Mountain Cordillera', 'Pampas Fertile Grasslands', 'Pantanal Wetland', 'Atacama Desert'],
      resources: 'Amazon Basin produces ~20% of Earth’s river discharge and houses 10% of known species; huge agricultural outputs in beef and soy; major copper/lithium reserves.',
      pressures: 'Rapid deforestation in the Amazon arc of deforestation, soil erosion on steep Andean slopes, wetland alteration and cattle grazing expansion.',
      keyFact: 'The Amazon River discharges approximately 209,000 m³/s into the Atlantic Ocean — more than the next 7 largest rivers combined.',
    },
    {
      name: 'Antarctica',
      area: '~13.7 million km²',
      share: '9.2% of global land',
      population: '0 permanent (1,000–4,000 seasonal researchers)',
      desc: '~13.7 million km²',
      thumb: '/images/continent-antarctica.jpg',
      biomes: ['Polar Ice Sheet', 'Transantarctic Nunataks', 'Sub-Antarctic Tundra Peninsula'],
      resources: 'Holds ~70% of Earth’s freshwater and ~90% of all ice on the planet; vital climate regulator reflecting solar radiation; undisturbed scientific climate records.',
      pressures: 'Accelerating ice-shelf calving (e.g. Thwaites and Pine Island glaciers), ocean warming eroding grounding lines, microplastic accumulation in snow.',
      keyFact: 'Although covered in kilometers of ice, Antarctica is classified geographically as a cold desert because interior precipitation is under 50 mm/year.',
    },
    {
      name: 'Europe',
      area: '~10.2 million km²',
      share: '6.8% of global land',
      population: '745 Million (~9% of humanity)',
      desc: '~10.2 million km²',
      thumb: '/images/continent-europe.jpg',
      biomes: ['European Plain', 'Alps & Carpathian Mountain Range', 'Mediterranean Scrubland (Maquis)', 'Scandinavian Boreal'],
      resources: 'High proportion of cultivable land (loamy agricultural soils), well-developed water transit corridors (Danube, Rhine), sustainable forestry systems.',
      pressures: 'High soil sealing rates under urban and transport infrastructure, historical deforestation, chemical fertilizer runoff into river basins.',
      keyFact: 'Europe has the highest proportion of arable land relative to its total size of any continent, with over 80% of its land actively managed.',
    },
    {
      name: 'Australia',
      area: '~8.5 million km²',
      share: '5.7% of global land',
      population: '26 Million (~0.3% of humanity)',
      desc: '~8.5 million km²',
      thumb: '/images/continent-australia.jpg',
      biomes: ['Red Sandstone Outback', 'Spinifex Drylands', 'Great Dividing Range', 'Eucalyptus Woodlands', 'Murray-Darling River Basin'],
      resources: 'Massive mineral reserves (iron ore, bauxite, rare earths), extensive rangelands supporting pastoral grazing, globally unique endemic flora/fauna.',
      pressures: 'Severe water scarcity, high susceptibility to bushfires and drought, dryland soil salinization due to past land clearing, invasive species pressure.',
      keyFact: 'Australia is the flattest and, after Antarctica, the driest continent on Earth, with over 70% of its landmass classified as arid or semi-arid.',
    },
  ];

  return (
    <section className="land-screen land-resource-screen" id="ch-resource">
      <div className="resource-backdrop">
        <div className="resource-starfield" />
      </div>

      <div className="land-screen-inner">
        {/* Top 3-Col Stage: Header + Globe + Land Supports */}
        <div className="resource-top-stage">
          {/* Left: Header Block + Donut Gauge */}
          <div className="resource-header-col">
            <span className="screen-ch-tag">MODULE 01 <span>|</span> CHAPTER 05</span>
            <h2 className="screen-main-title">
              Land as a <em>Resource</em>
            </h2>
            <h3 className="screen-sub-headline">A finite foundation for life.</h3>
            <p className="screen-lead-copy">
              Land covers only about 20% of Earth's surface, but it supports our food, water, habitats,
              settlements, economies and cultures. It is a limited and irreplaceable resource that must be
              used wisely.
            </p>

            {/* Donut Infographic Block */}
            <div className="resource-donut-gauge">
              <div className="donut-circle-wrap">
                <svg viewBox="0 0 100 100" className="donut-svg">
                  {/* 71% Water Circle */}
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="rgba(79, 163, 199, 0.35)" strokeWidth="11" />
                  {/* 20% Land Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#c9a15a"
                    strokeWidth="11"
                    strokeDasharray="238.76"
                    strokeDashoffset="191"
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  className="donut-globe-center"
                  style={{ backgroundImage: `url('/images/hero-clean-earth.jpg')` }}
                />
              </div>

              <div className="donut-text-stats">
                <div className="stat-chunk land-chunk">
                  <strong><CountUp to={20} suffix="%" /></strong>
                  <span>OF EARTH'S<br />SURFACE IS LAND</span>
                  <small>~149 million km²</small>
                </div>
                <div className="stat-chunk-divider" />
                <div className="stat-chunk water-chunk">
                  <strong><CountUp to={71} suffix="%" /></strong>
                  <span>IS COVERED<br />BY WATER</span>
                  <small>~361 million km²</small>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Interactive Globe Space with Land 29% & Water 71% Pointer Callouts */}
          <div className="resource-globe-col" aria-label="Global Land vs Water Distribution">
            {/* Land 29% Callout with pointer */}
            <div className="callout-pill pill-land-29" title="29% Land surface area">
              <div className="callout-pill-body">
                <strong>Land</strong>
                <span>29%</span>
              </div>
              <div className="callout-pointer-line line-land">
                <span className="pointer-dot" />
              </div>
            </div>

            {/* Water 71% Callout with pointer */}
            <div className="callout-pill pill-water-71" title="71% Water surface area">
              <div className="callout-pointer-line line-water">
                <span className="pointer-dot" />
              </div>
              <div className="callout-pill-body">
                <strong>Water</strong>
                <span>71%</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Land Supports (6 Ecosystem Services) */}
          <div className="resource-supports-col">
            <Reveal dir="right" className="land-supports-panel">
              <span className="supports-title">Land Supports</span>
              <div className="supports-cards-grid">
                <div className="support-service-item">
                  <span className="support-icon-wrap icon-food">
                    <Wheat size={14} />
                  </span>
                  <div className="support-text-wrap">
                    <strong>Food Production</strong>
                    <span>(Agriculture)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap icon-water">
                    <Droplet size={14} />
                  </span>
                  <div className="support-text-wrap">
                    <strong>Freshwater Systems</strong>
                    <span>(Rivers, Lakes, Aquifers)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap icon-habitat">
                    <Trees size={14} />
                  </span>
                  <div className="support-text-wrap">
                    <strong>Habitats &amp; Biodiversity</strong>
                    <span>(Forests, Grasslands)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap icon-settlement">
                    <Building2 size={14} />
                  </span>
                  <div className="support-text-wrap">
                    <strong>Human Settlements</strong>
                    <span>(Cities, Infrastructure)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap icon-economy">
                    <Factory size={14} />
                  </span>
                  <div className="support-text-wrap">
                    <strong>Economic Activities</strong>
                    <span>(Industries, Transport)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap icon-cultural">
                    <Users2 size={14} />
                  </span>
                  <div className="support-text-wrap">
                    <strong>Cultural &amp; Indigenous</strong>
                    <span>Land Use</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Panel: Where Land is Found (7 Continents Strip) */}
        <Reveal dir="up" className="where-land-panel">
          <div className="where-top-row">
            <div>
              <h4>Where Land is Found</h4>
              <p>Land is unevenly distributed across the globe, forming continents, islands and vast terrestrial ecosystems.</p>
            </div>
            <button
              type="button"
              className="view-map-link"
              onClick={() => setIsMapModalOpen(true)}
              title="Click to view full global land distribution map"
            >
              <Globe size={13} />
              <span>View Global Land Map</span>
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="continents-scroll-strip">
            {continents.map((con, i) => {
              const isSelected = selectedContinent === i;
              return (
                <div
                  key={con.name}
                  className={`continent-chip-card ${isSelected ? 'is-active-continent' : ''}`}
                  onClick={() => {
                    setSelectedContinent(i);
                    setActiveContinentModal(i);
                  }}
                  onKeyDown={keyActivate(() => {
                    setSelectedContinent(i);
                    setActiveContinentModal(i);
                  })}
                  title={`Click to view details for ${con.name}`}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className="continent-thumb"
                    style={{ backgroundImage: `url('${con.thumb}')` }}
                  />
                  <div className="continent-meta">
                    <strong>{con.name}</strong>
                    <span>{con.desc}</span>
                  </div>
                  <span className="continent-arrow-badge">
                    <ArrowRight size={10} />
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Interactive Continent Details Modal */}
        {activeContinentModal !== null && (
          <div
            className="continent-modal-overlay"
            data-lenis-prevent
            onClick={() => setActiveContinentModal(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Continent ecosystem profile"
          >
            <div
              className="continent-modal-dialog"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="modal-header-row">
                <div>
                  <span className="modal-eyebrow">MODULE 01 · CHAPTER 05: LAND AS A RESOURCE</span>
                  <h3 className="modal-title">
                    {continents[activeContinentModal].name} <em>Ecosystem Profile</em>
                  </h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setActiveContinentModal(null)}
                  aria-label="Close details"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="modal-content-grid">
                {/* Left Photo & Badges */}
                <div className="modal-photo-col">
                  <div
                    className="modal-hero-photo"
                    style={{ backgroundImage: `url('${continents[activeContinentModal].thumb}')` }}
                  />
                  <div className="modal-stats-chips">
                    <div className="modal-chip">
                      <span>Land Area</span>
                      <strong>{continents[activeContinentModal].area}</strong>
                    </div>
                    <div className="modal-chip">
                      <span>Global Share</span>
                      <strong className="accent-gold">{continents[activeContinentModal].share}</strong>
                    </div>
                    <div className="modal-chip">
                      <span>Population Supported</span>
                      <strong>{continents[activeContinentModal].population}</strong>
                    </div>
                  </div>
                </div>

                {/* Right Details Description */}
                <div className="modal-details-col">
                  {/* Biomes */}
                  <div className="modal-section-block">
                    <span className="modal-label">Major Terrestrial Biomes</span>
                    <div className="modal-biomes-tags">
                      {continents[activeContinentModal].biomes.map((b) => (
                        <span key={b} className="modal-biome-tag">{b}</span>
                      ))}
                    </div>
                  </div>

                  {/* Natural Resources */}
                  <div className="modal-section-block">
                    <span className="modal-label">Critical Natural Resources</span>
                    <p className="modal-desc-p">{continents[activeContinentModal].resources}</p>
                  </div>

                  {/* Conservation Pressures */}
                  <div className="modal-section-block">
                    <span className="modal-label">Conservation Challenges & Pressures</span>
                    <p className="modal-desc-p">{continents[activeContinentModal].pressures}</p>
                  </div>

                  {/* Key Fact */}
                  <div className="modal-fact-callout">
                    <span className="fact-badge">GEOLOGICAL FACT</span>
                    <p>{continents[activeContinentModal].keyFact}</p>
                  </div>
                </div>
              </div>

              {/* Footer Switcher */}
              <div className="modal-footer-nav">
                <button
                  type="button"
                  className="modal-nav-btn"
                  onClick={() => setActiveContinentModal((prev) => (prev! > 0 ? prev! - 1 : continents.length - 1))}
                >
                  <ArrowLeft size={12} />
                  <span>Previous Continent</span>
                </button>

                <div className="modal-nav-dots">
                  {continents.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`modal-nav-dot ${activeContinentModal === idx ? 'is-active' : ''}`}
                      onClick={() => setActiveContinentModal(idx)}
                      title={c.name}
                      aria-label={`View ${c.name}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="modal-nav-btn"
                  onClick={() => setActiveContinentModal((prev) => (prev! < continents.length - 1 ? prev! + 1 : 0))}
                >
                  <span>Next Continent</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Global Land Map Modal */}
        {isMapModalOpen && (
          <div
            className="continent-modal-overlay"
            data-lenis-prevent
            onClick={() => setIsMapModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Global Land Distribution Map"
          >
            <div
              className="continent-modal-dialog map-modal-dialog"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-row">
                <div>
                  <span className="modal-eyebrow">MODULE 01 · CHAPTER 05: GLOBAL TERRESTRIAL DISTRIBUTION</span>
                  <h3 className="modal-title">
                    Global Land Distribution <em>&amp; Continents</em>
                  </h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsMapModalOpen(false)}
                  aria-label="Close map"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="map-modal-body">
                <div
                  className="map-hero-frame"
                  style={{ backgroundImage: `url('/images/earth-resource-panorama.jpg')` }}
                >
                  <div className="map-floating-overlay">
                    <span className="map-badge">Total Terrestrial Area: ~148.94 Million km² (29.2% of Earth)</span>
                  </div>
                </div>

                <div className="map-continents-breakdown">
                  {continents.map((c) => (
                    <div key={c.name} className="map-con-row">
                      <span className="map-con-name">{c.name}</span>
                      <div className="map-con-bar-track">
                        <div
                          className="map-con-bar-fill"
                          style={{ width: `${parseFloat(c.share)}%` }}
                        />
                      </div>
                      <span className="map-con-share">{c.share}</span>
                      <span className="map-con-area">{c.area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav Bar */}
        <div className="screen-bottom-bar">
          <button type="button" className="bar-prev-btn" onClick={onPrev}>
            <ArrowLeft size={14} />
            <div className="bar-btn-text">
              <span className="bar-btn-lead">Previous</span>
              <span className="bar-btn-sub">Crust &amp; Continents</span>
            </div>
          </button>
          <div className="bar-dots-pills">
            <ChapterDots activeIndex={4} onJump={onJumpChapter} className="bar-dots-pills" dotClassName="bar-dot" activeClassName="is-active" />
          </div>
          <button type="button" className="bar-next-btn" onClick={onNext}>
            <div className="bar-btn-text">
              <span className="bar-btn-lead">Next</span>
              <span className="bar-btn-sub">Soil Formation</span>
            </div>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SCREEN 06: SOIL FORMATION
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
