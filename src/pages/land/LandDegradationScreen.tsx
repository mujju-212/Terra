import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Droplet, ArrowRight, ArrowLeft, Wheat, Building2, Users2, ChevronRight, ChevronLeft, Sprout, X, Leaf, PawPrint, Pickaxe, BarChart3, Bug, Cloud, Sun, TreePine } from 'lucide-react';
import '../../degradation.css';
import { TiltCard, Reveal } from './motion';
import { useModalScrollLock } from './helpers/useModalScrollLock';
import { useCompareSlider } from './helpers/useCompareSlider';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function LandDegradationScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  const slider = useCompareSlider({ initial: 67, min: 4, max: 96 });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedModalItem, setSelectedModalItem] = useState<string>('deforestation');

  const openModal = (type: string, itemKey?: string) => {
    setActiveModal(type);
    if (itemKey) setSelectedModalItem(itemKey);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Airtight background scroll lock + Escape-to-close while the modal is open
  useModalScrollLock(activeModal !== null, {
    scrollableSelector: '.degradation-modal-body',
    onClose: closeModal,
  });

  // Causes pedagogical database
  const causesList = [
    {
      id: 'deforestation',
      num: '1',
      title: 'Deforestation',
      color: '#f97316',
      icon: TreePine,
      img: '/images/degradation-cause-deforestation.jpg',
      short: 'Removal of vegetation exposes soil to erosion and reduces soil fertility.',
      mechanisms: 'Clearance of root-anchoring tree canopy exposes fragile topsoil to severe kinetic rainfall detachment (splash erosion) and rapid sheet wash. Rapid decomposition and oxidation of exposed soil organic matter drastically lowers aggregate stability and water infiltration.',
      syllabusStats: 'Over 10 million hectares of forest lost annually worldwide; in tropical regions, deforestation increases soil loss rates by up to 100-fold compared to intact forest ecosystems.',
      solutions: 'Agroforestry buffer strips, selective logging policies, reforestation with indigenous species, payment for ecosystem services (PES).',
    },
    {
      id: 'overgrazing',
      num: '2',
      title: 'Overgrazing',
      color: '#38bdf8',
      icon: PawPrint,
      img: '/images/degradation-cause-overgrazing.jpg',
      short: 'Excessive grazing removes vegetation cover and compacts soil.',
      mechanisms: 'High stocking rates consume pasture grasses faster than vegetative regrowth rates, stripping the protective vegetative blanket. Mechanical hooves exert extreme point pressure (often exceeding 200 kPa), crushing surface soil aggregates and causing severe soil compaction, reducing macroporosity and blocking water infiltration.',
      syllabusStats: 'Affects over 20% of global rangelands and grasslands; particularly devastating across the Sahel and arid zones of western India (Rajasthan and Gujarat).',
      solutions: 'Rotational grazing systems (holistic planned grazing), establishing exclusion zones to allow pasture recovery, setting scientific carrying capacities.',
    },
    {
      id: 'agriculture',
      num: '3',
      title: 'Unsustainable Agriculture',
      color: '#eab308',
      icon: Wheat,
      img: '/images/degradation-cause-agriculture.jpg',
      short: 'Monocropping, excessive tillage and chemical use deplete soil nutrients.',
      mechanisms: 'Intensive inversion tillage (moldboard plowing) pulverizes natural soil crumb structure, accelerating organic carbon oxidation and leaving bare soil vulnerable to wind/water erosion. Continuous monocropping drains specific micronutrient pools without replenishing organic humus, leading to soil exhaustion and chronic acidification from synthetic nitrogen fertilizers.',
      syllabusStats: 'Modern industrial agriculture is responsible for losing topsoil at rates 10 to 40 times faster than natural soil formation rates (natural rate: ~1 cm per 100–400 years).',
      solutions: 'Conservation tillage (zero-till or strip-till), diverse crop rotation with nitrogen-fixing legumes, cover cropping, integrated pest and nutrient management (IPNM).',
    },
    {
      id: 'mining',
      num: '4',
      title: 'Mining & Industrial Activities',
      color: '#ef4444',
      icon: Pickaxe,
      img: '/images/degradation-cause-mining.jpg',
      short: 'Land disturbance, removal of topsoil and contamination with pollutants.',
      mechanisms: 'Open-cast mining strips away all biological horizons (O, A, B) down to sterile parent rock and overburden. Tailings ponds and industrial effluents leach toxic heavy metals (lead, arsenic, cadmium, mercury) and generate acid mine drainage (sulfuric acid from oxidized iron pyrite), sterilizing regional groundwater and rendering vast tracts of land permanently barren.',
      syllabusStats: 'Over 1.5 million hectares of arable land contaminated by industrial pollutants in developing nations; open-pit extraction destroys 100% of native vegetation within project boundaries.',
      solutions: 'Mandatory topsoil preservation and stockpiling during excavation, phytoremediation with hyperaccumulating plants, engineered tailing lining, post-mining ecological regrading and reclamation.',
    },
    {
      id: 'climate',
      num: '5',
      title: 'Climate Change',
      color: '#a855f7',
      icon: Sun,
      img: '/images/degradation-cause-climate.jpg',
      short: 'Increased temperature, erratic rainfall and droughts accelerate land degradation.',
      mechanisms: 'Elevated ambient temperatures increase surface evapotranspiration and dehydrate topsoil, breaking down microbial glues (glomalin) that bind soil aggregates. Shifting precipitation regimes trigger extended droughts followed by high-intensity torrential deluges, stripping desiccated soil in massive gully erosion events.',
      syllabusStats: 'Global drylands expanding by up to 10% under high-emission scenarios; over 3.2 billion people currently impacted by desertification and land degradation exacerbated by climate volatility.',
      solutions: 'Climate-resilient agro-ecosystems, rainwater harvesting bunds, drought-tolerant crop cultivars, landscape-scale vegetative windbreaks.',
    },
    {
      id: 'urbanization',
      num: '6',
      title: 'Urbanization',
      color: '#06b6d4',
      icon: Building2,
      img: '/images/degradation-cause-urbanization.jpg',
      short: 'Conversion of natural land to built-up areas reduces vegetation and fertile soil.',
      mechanisms: 'Soil Sealing permanently caps prime agricultural land under impermeable asphalt, bitumen, and concrete. This completely arrests rainwater infiltration, destroys the soil biological gene pool, alters urban microclimates (Urban Heat Island effect), and generates enormous flash-runoff volumes that erode surrounding unprotected soils.',
      syllabusStats: 'Most urban expansion historically consumes Class I and II prime agricultural valley land; soil sealing is virtually irreversible, permanently destroying millennia of soil pedogenesis.',
      solutions: 'Compact city master planning, brownfield redevelopment rather than greenfield sprawl, permeable asphalt, and mandatory Sustainable Drainage Systems (SuDS).',
    },
  ];

  // Impacts pedagogical database
  const impactsList = [
    {
      id: 'fertility',
      title: 'Loss of Soil Fertility',
      color: '#4ade80',
      icon: Sprout,
      img: '/images/degradation-impact-fertility.jpg',
      short: 'Reduced crop yields and productivity.',
      detail: 'Organic matter depletion, loss of cation exchange capacity (CEC), micronutrient exhaustion, and destruction of beneficial mycorrhizal fungal networks.',
      globalImpact: 'Yield penalties up to 50% in degraded drylands; forces increased application of costly synthetic fertilizers which further degrades soil microbiology.',
    },
    {
      id: 'biodiversity',
      title: 'Loss of Biodiversity',
      color: '#f43f5e',
      icon: Bug,
      img: '/images/degradation-impact-biodiversity.jpg',
      short: 'Habitat destruction and species decline.',
      detail: 'Fragmentation of native wildlife corridors, loss of plant species diversity, elimination of soil micro-arthropods, earthworms, and nitrogen-fixing soil bacteria.',
      globalImpact: 'Land degradation is the leading driver of terrestrial species extinction; over 1 million plant and animal species currently face extinction due to habitat loss.',
    },
    {
      id: 'water',
      title: 'Altered Water Cycle',
      color: '#38bdf8',
      icon: Droplet,
      img: '/images/degradation-impact-water.jpg',
      short: 'Reduced infiltration and increased surface runoff leading to floods or droughts.',
      detail: 'Compacted, crusted soil cannot absorb precipitation; water rapidly runs off the surface carrying sediments into rivers (siltation of reservoirs and hydro dams), starving deep aquifers of groundwater recharge.',
      globalImpact: 'Degraded watersheds experience catastrophic flood peaks during monsoons followed by severe river desiccation during dry seasons.',
    },
    {
      id: 'carbon',
      title: 'Increased Carbon Emissions',
      color: '#fb923c',
      icon: Cloud,
      img: '/images/degradation-impact-carbon.jpg',
      short: 'Release of stored carbon from degraded soils.',
      detail: 'When soils erode or dry out, soil organic carbon (humus) oxidizes into carbon dioxide (CO2) and nitrous oxide (N2O) through accelerated microbial respiration and lack of vegetative shade.',
      globalImpact: 'Global soils store ~2,500 Gt of carbon; degraded soils release billions of tons of CO2 equivalent annually, converting terrestrial carbon sinks into carbon sources.',
    },
    {
      id: 'communities',
      title: 'Impact on Communities',
      color: '#a855f7',
      icon: Users2,
      img: '/images/degradation-impact-communities.jpg',
      short: 'Loss of livelihoods, increased poverty and displacement.',
      detail: 'Agricultural abandonment, economic impoverishment of rural farming families, forced rural-to-urban environmental migration, and resource conflicts over remaining arable land and water.',
      globalImpact: 'UN estimates over 135 million people risk being displaced by desertification and land degradation by 2045.',
    },
  ];

  const causeOrder = ['deforestation', 'overgrazing', 'agriculture', 'mining', 'climate', 'urbanization'];
  const impactOrder = ['fertility', 'biodiversity', 'water', 'carbon', 'communities'];

  return (
    <section className="land-screen land-degradation-screen" id="ch-degradation">
      <div className="degradation-screen-container">
        {/* ──────────────────────────────────────────────────────────────────
            1. TOP HERO SECTION (Interactive Before/After Split Comparison)
            ────────────────────────────────────────────────────────────────── */}
        <div
          ref={slider.containerRef}
          className="degradation-hero-wrap"
          onMouseDown={slider.onMouseDown}
          onTouchMove={slider.onTouchMove}
          role="region"
          aria-label="Interactive Land Degradation Before and After Comparison Slider"
          title="Drag or click to compare Healthy Land vs Degraded Land"
        >
          {/* Background: Degraded Land */}
          <div
            className="degradation-hero-layer degradation-layer-degraded"
            style={{ backgroundImage: `url('/images/degradation-degraded.jpg')` }}
          />

          {/* Foreground: Healthy Land (Clipped dynamically by slider position) */}
          <div
            className="degradation-hero-layer degradation-layer-healthy"
            style={{
              backgroundImage: `url('/images/degradation-healthy.jpg')`,
              clipPath: `inset(0 calc(100% - ${slider.pos}%) 0 0)`,
            }}
          />

          {/* Left Dark Gradient Scrim for crystal clear typography */}
          <div className="degradation-hero-scrim" />

          {/* Left Hero Typography */}
          <div className="degradation-hero-copy">
            <span className="degradation-eyebrow">MODULE 01 | CHAPTER 12</span>
            <h2 className="degradation-grand-title">
              Land <em>Degradation</em>
            </h2>
            <h3 className="degradation-subtitle">When land loses its ability to sustain life.</h3>
            <p className="degradation-lead-desc">
              Land degradation is the long-term decline in the quality and productivity of land due to natural and human-induced factors. It reduces soil fertility, vegetation cover and ecosystem services, threatening food security, biodiversity and the livelihoods of people.
            </p>
          </div>

          {/* Floating "Healthy Land" Badge */}
          <div
            className="healthy-land-badge"
            style={{
              opacity: slider.pos > 24 ? 1 : Math.max(0, (slider.pos - 8) / 16),
            }}
          >
            <div className="badge-icon-healthy">
              <Leaf size={18} />
            </div>
            <div className="badge-text-col">
              <strong>Healthy Land</strong>
              <span>Vegetation cover / High productivity</span>
            </div>
          </div>

          {/* Floating "Degraded Land" Badge */}
          <div
            className="degraded-land-badge"
            style={{
              opacity: slider.pos < 76 ? 1 : Math.max(0, (92 - slider.pos) / 16),
            }}
          >
            <div className="badge-icon-degraded">
              <TreePine size={18} />
            </div>
            <div className="badge-text-col">
              <strong>Degraded Land</strong>
              <span>Loss of vegetation / Low productivity</span>
            </div>
          </div>

          {/* Draggable Divider Line & Handle */}
          <div className="degradation-slider-line" style={{ left: `${slider.pos}%` }} />
          <div className="degradation-slider-handle" style={{ left: `${slider.pos}%` }}>
            <ChevronLeft size={14} style={{ marginRight: -3 }} />
            <ChevronRight size={14} style={{ marginLeft: -3 }} />
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            2. MIDDLE SECTION: MAJOR CAUSES OF LAND DEGRADATION (6 CARDS)
            ────────────────────────────────────────────────────────────────── */}
        <Reveal dir="up" className="degradation-section-panel">
          <div className="degradation-panel-title-group">
            <span className="degradation-panel-title">Major Causes of Land Degradation</span>
            <span className="degradation-panel-sub">Land degradation is driven by multiple natural and human activities.</span>
          </div>

          <div className="causes-cards-row">
            {causesList.map((cause) => {
              const IconComponent = cause.icon;
              return (
                <TiltCard
                  key={cause.id}
                  className="cause-tile-card"
                  onClick={() => openModal('cause', cause.id)}
                  onKeyDown={keyActivate(() => openModal('cause', cause.id))}
                  title={`Click to explore ${cause.title}`}
                  style={{ '--cause-accent': cause.color } as React.CSSProperties}
                  spotlight
                  max={6}
                >
                  <div className="cause-card-thumb-wrap">
                    <img src={cause.img} alt={cause.title} className="cause-card-img" />
                    <span className="cause-number-pill" style={{ background: cause.color }}>
                      {cause.num}
                    </span>
                  </div>
                  <div className="cause-meta-row">
                    <div className="cause-meta-icon" style={{ color: cause.color }}>
                      <IconComponent size={18} />
                    </div>
                    <div className="cause-meta-text">
                      <span className="cause-meta-title">{cause.title}</span>
                      <span className="cause-meta-desc">{cause.short}</span>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────────
            3. BOTTOM SECTION: IMPACTS + THREAT TO FOOD SECURITY
            ────────────────────────────────────────────────────────────────── */}
        <div className="degradation-bottom-grid">
          {/* Left Panel: Impacts of Land Degradation */}
          <div className="degradation-section-panel">
            <div className="degradation-panel-title-group">
              <span className="degradation-panel-title">Impacts of Land Degradation</span>
              <span className="degradation-panel-sub">Land degradation has wide-ranging impacts on the environment, climate and human societies.</span>
            </div>

            <div className="impacts-cards-row">
              {impactsList.map((imp) => {
                const ImpactIcon = imp.icon;
                return (
                  <TiltCard
                    key={imp.id}
                    className="impact-tile-card"
                    onClick={() => openModal('impact', imp.id)}
                    onKeyDown={keyActivate(() => openModal('impact', imp.id))}
                    title={`Click to explore ${imp.title}`}
                    spotlight
                    max={6}
                  >
                    <div className="impact-card-thumb-wrap">
                      <img src={imp.img} alt={imp.title} className="impact-card-img" />
                    </div>
                    <div className="impact-meta-row">
                      <div className="impact-icon-circle" style={{ background: `${imp.color}25`, color: imp.color }}>
                        <ImpactIcon size={12} />
                      </div>
                      <div className="impact-meta-text">
                        <span className="impact-meta-title">{imp.title}</span>
                        <span className="impact-meta-desc">{imp.short}</span>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Threat to Food Security */}
          <div
            className="food-security-card-box"
            onClick={() => openModal('food')}
            onKeyDown={keyActivate(() => openModal('food'))}
            role="button"
            tabIndex={0}
            title="Click to view Global Food Security & Land Degradation Deep Dive"
          >
            <div className="food-security-header-row">
              <div className="food-security-icon-badge">
                <BarChart3 size={15} />
              </div>
              <span className="food-security-title">Threat to Food Security</span>
            </div>

            <p className="food-security-desc">
              Land degradation reduces the ability to produce food, increasing the risk of hunger and malnutrition globally.
            </p>

            <div className="food-security-thumb-wrap">
              <img
                src="/images/degradation-food-security.jpg"
                alt="Threat to Food Security"
                className="food-security-thumb-img"
              />
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            4. BOTTOM NAVIGATION BAR
            ────────────────────────────────────────────────────────────────── */}
        <div className="degradation-bottom-bar">
          <button type="button" className="nav-prev-link-btn" onClick={onPrev}>
            <span className="nav-circle-arrow"><ArrowLeft size={16} /></span>
            <div className="nav-prev-text-col">
              <span className="nav-prev-heading">Previous</span>
              <span className="nav-prev-sub">Soil Health &amp; Composition</span>
            </div>
          </button>

          <div className="nav-center-dots-group">
            <ChapterDots activeIndex={11} onJump={onJumpChapter} className="nav-center-dots-group" dotClassName="nav-chap-dot" activeClassName="is-active-dot" />
          </div>

          <button type="button" className="nav-next-gold-pill" onClick={onNext}>
            <div className="nav-next-text-col">
              <span className="nav-next-heading">Next</span>
              <span className="nav-next-sub">Soil Conservation</span>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          5. MODAL SYSTEM WITH AIRTIGHT SCROLL-LOCK (PORTAL TO DOCUMENT.BODY)
          ────────────────────────────────────────────────────────────────── */}
      {activeModal &&
        createPortal(
          <div
            className="degradation-modal-overlay"
            data-lenis-prevent
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="degradation-modal-window" role="dialog" aria-modal="true" data-lenis-prevent>
              {/* MODAL: CAUSE DEEP DIVE */}
              {activeModal === 'cause' && (() => {
                const c = causesList.find((x) => x.id === selectedModalItem) || causesList[0];
                const curIdx = causeOrder.indexOf(selectedModalItem);
                const CauseIcon = c.icon;
                return (
                  <>
                    <div className="degradation-modal-header">
                      <div className="degradation-modal-title-wrap">
                        <div className="degradation-modal-icon-badge" style={{ background: `${c.color}25`, color: c.color, border: `1px solid ${c.color}60` }}>
                          <CauseIcon size={20} />
                        </div>
                        <div className="degradation-modal-title-col">
                          <span className="degradation-modal-tag">CAUSE #{c.num} DEEP DIVE</span>
                          <h3 className="degradation-modal-title">{c.title}</h3>
                        </div>
                      </div>
                      <button type="button" className="degradation-modal-close-btn" onClick={closeModal}>
                        <X size={18} />
                      </button>
                    </div>

                    <div className="degradation-modal-body" data-lenis-prevent>
                      <div className="degradation-modal-overview-box">
                        <strong>Overview: </strong> {c.short}
                      </div>

                      <div className="degradation-modal-stats-grid">
                        <div className="degradation-stat-pill">
                          <span>PRIMARY DRIVER</span>
                          <strong style={{ color: c.color }}>{c.title.split(' ')[0]}</strong>
                        </div>
                        <div className="degradation-stat-pill">
                          <span>SEVERITY INDEX</span>
                          <strong>High Environmental Threat</strong>
                        </div>
                        <div className="degradation-stat-pill">
                          <span>REVERSIBILITY</span>
                          <strong>Requires Active Remediation</strong>
                        </div>
                      </div>

                      <div className="degradation-modal-curriculum">
                        <strong>Scientific Mechanisms &amp; Soil Degradation Pathways:</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                          {c.mechanisms}
                        </p>
                        <p style={{ margin: '8px 0 0 0' }}>
                          <strong>VTU BCV755B Syllabus Data:</strong> {c.syllabusStats}
                        </p>
                        <p style={{ margin: '8px 0 0 0' }}>
                          <strong>Sustainable Mitigation Strategy:</strong> {c.solutions}
                        </p>
                      </div>
                    </div>

                    <div className="degradation-modal-footer">
                      <button
                        type="button"
                        className="degradation-modal-cycle-btn"
                        onClick={() => {
                          const prev = (curIdx - 1 + causeOrder.length) % causeOrder.length;
                          setSelectedModalItem(causeOrder[prev]);
                        }}
                      >
                        <ChevronLeft size={14} /> Previous Cause
                      </button>
                      <button
                        type="button"
                        className="degradation-modal-cycle-btn"
                        onClick={() => {
                          const next = (curIdx + 1) % causeOrder.length;
                          setSelectedModalItem(causeOrder[next]);
                        }}
                      >
                        Next Cause <ChevronRight size={14} />
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
