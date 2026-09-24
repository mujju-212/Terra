import React, { useState } from 'react';
import { Mountain, Droplet, Trees, Globe, ArrowRight, ArrowLeft, Wheat, Building2, Factory, Users2, X } from 'lucide-react';
import { Reveal, CountUp } from './motion';

export default function LandResourceScreen({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const [selectedContinent, setSelectedContinent] = useState(0);
  const [activeContinentModal, setActiveContinentModal] = useState<number | null>(null);

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
                  <span>OF EARTH'S SURFACE IS LAND</span>
                  <small>~149 million km²</small>
                </div>
                <div className="stat-chunk-divider" />
                <div className="stat-chunk water-chunk">
                  <strong><CountUp to={71} suffix="%" /></strong>
                  <span>IS COVERED BY WATER</span>
                  <small>~361 million km²</small>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Earth with Land 29% and Water 71% Badges */}
          <div className="resource-globe-col">
            <div className="resource-globe-frame">
              <img
                src="/images/earth-resource-globe.jpg"
                alt="Planet Earth resting over fertile green land"
                className="resource-globe-img"
              />

              {/* Badges on Globe */}
              <div className="callout-pill pill-land-29">
                <strong>Land</strong>
                <span>29%</span>
              </div>

              <div className="callout-pill pill-water-71">
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
                  <span className="support-icon-wrap">
                    <Wheat size={13} />
                  </span>
                  <div>
                    <strong>Food Production</strong>
                    <span>(Agriculture)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap">
                    <Droplet size={13} />
                  </span>
                  <div>
                    <strong>Freshwater Systems</strong>
                    <span>(Rivers, Lakes, Aquifers)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap">
                    <Trees size={13} />
                  </span>
                  <div>
                    <strong>Habitats &amp; Biodiversity</strong>
                    <span>(Forests, Grasslands)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap">
                    <Building2 size={13} />
                  </span>
                  <div>
                    <strong>Human Settlements</strong>
                    <span>(Cities, Infrastructure)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap">
                    <Factory size={13} />
                  </span>
                  <div>
                    <strong>Economic Activities</strong>
                    <span>(Industries, Transport)</span>
                  </div>
                </div>

                <div className="support-service-item">
                  <span className="support-icon-wrap">
                    <Users2 size={13} />
                  </span>
                  <div>
                    <strong>Cultural &amp; Indigenous</strong>
                    <span>Land Use</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Panel: Where Land is Found (7 Continents Carousel) */}
        <Reveal dir="up" className="where-land-panel">
          <div className="where-top-row">
            <div>
              <h4>Where Land is Found</h4>
              <p>Land is unevenly distributed across the globe, forming continents, islands and vast terrestrial ecosystems.</p>
            </div>
            <button type="button" className="view-map-link">
              <Globe size={12} />
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
            onClick={() => setActiveContinentModal(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="continent-modal-dialog"
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
                    <span
                      key={c.name}
                      className={`modal-nav-dot ${activeContinentModal === idx ? 'is-active' : ''}`}
                      onClick={() => setActiveContinentModal(idx)}
                      title={c.name}
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

        {/* Bottom Nav Bar */}
        <div className="screen-bottom-bar">
          <button type="button" className="bar-prev-btn" onClick={onPrev}>
            <ArrowLeft size={13} />
            <span>Previous: Crust &amp; Continents</span>
          </button>
          <div className="bar-dots-pills">
            {[0, 1, 2, 3, 4].map((idx) => (
              <span key={idx} className={`bar-dot ${idx === 4 ? 'is-active' : ''}`} />
            ))}
          </div>
          <button type="button" className="bar-next-btn" onClick={onNext}>
            <span>Next: Soil Formation</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SCREEN 06: SOIL FORMATION
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
