import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Trees, ArrowRight, Building2, Users2, ChevronRight, ChevronLeft, Thermometer, Sprout, X, Leaf, BarChart3, MapPin } from 'lucide-react';
import '../../landuse.css';
import { Reveal } from './motion';
import { useModalScrollLock } from './helpers/useModalScrollLock';
import { useCompareSlider } from './helpers/useCompareSlider';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function LandUseChangeScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  // Hero Before/After Draggable Slider State (72% default matches mockup)
  const hero = useCompareSlider({ initial: 72 });
  // Mini Case Study Before/After Draggable Slider State
  const mini = useCompareSlider({ initial: 50, min: 10, max: 90 });

  // Modal States
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState<boolean>(false);
  const [selectedImpactIndex, setSelectedImpactIndex] = useState<number | null>(null);

  const isAnyModalOpen = selectedStageIndex !== null || isCaseStudyModalOpen || selectedImpactIndex !== null;
  const closeAnyModal = () => {
    setSelectedStageIndex(null);
    setIsCaseStudyModalOpen(false);
    setSelectedImpactIndex(null);
  };
  // Airtight background scroll lock + Escape-to-close while a modal is open
  useModalScrollLock(isAnyModalOpen, {
    scrollableSelector: '.landuse-modal-body',
    onClose: closeAnyModal,
  });

  // 3 Stages of Land-Use Change Data
  const stagesData = [
    {
      id: 'natural',
      num: '1',
      title: '1. Natural Land',
      shortTitle: 'Natural Land',
      desc: 'Forests, grasslands, wetlands and other natural ecosystems.',
      icon: Trees,
      iconColor: '#4ade80',
      image: '/images/landuse-hero-natural.jpg',
      fallback: '/images/landform-banner-forests.jpg',
      badge: 'PRISTINE BASELINE & CARBON STORAGE',
      statBig: '100% Infiltration',
      statDesc: 'Natural vegetative cover promotes deep rainwater infiltration, minimizes kinetic rain erosion, and recharges underground aquifers.',
      mechanism:
        'Natural ecosystems maintain complex multi-layered vegetation canopies and intact root networks. Soil humus absorbs up to 90% of incoming precipitation, buffering watersheds and regulating local temperature through continuous evapotranspiration.',
      curriculumPoints: [
        'Connected habitats allow unimpeded wildlife migration and natural genetic biodiversity dispersal.',
        'Continuous vegetation cover shields soil aggregates from kinetic raindrop detachment, maintaining high infiltration rates.',
        'Natural wetlands and floodplains act as hydrological sponges that absorb peak rainfall and release baseflows slowly during dry seasons.',
        'Uncultivated native soils retain deep pools of organic carbon, preventing atmospheric carbon dioxide saturation.',
      ],
      solutions: [
        'Designation of strictly protected national parks and biodiversity reserves.',
        'Establishment of contiguous riparian conservation corridors along major river basins.',
        'Enacting conservation easements prohibiting development on virgin watershed catchments.',
      ],
    },
    {
      id: 'agri',
      num: '2',
      title: '2. Agricultural Land',
      shortTitle: 'Agricultural Land',
      desc: 'Conversion to cropland and pasture to meet food demand.',
      icon: Sprout,
      iconColor: '#4ade80',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      fallback: '/images/landform-banner-agriculture.jpg',
      badge: 'NON-POINT SOURCE WATER IMPACT',
      statBig: '29 t/ha/yr',
      statDesc: 'Accelerated topsoil erosion rate documented under continuous crop cultivation without conservation barriers.',
      mechanism:
        'Clearing natural forests and grasslands for intensive monocultures and cattle pasture exposes fertile topsoil to wind and sheet erosion. Synthetic fertilizers, pesticides, and livestock waste enter waterways as non-point source pollutants.',
      curriculumPoints: [
        'Part 6 of notes notes agricultural conversion as the largest global driver of land-cover transformation.',
        'Intensive tillage disrupts soil crumb structure and oxidizes organic humus, drastically reducing water-holding capacity.',
        'Livestock grazing in riparian zones strips riverbank vegetative anchors, causing catastrophic bank collapse and river siltation.',
        'Over-application of nitrogen and phosphorus fertilizers triggers widespread aquatic eutrophication and toxic algal blooms downstream.',
      ],
      solutions: [
        'Implementation of contour plowing, terrace farming, and permanent vegetative shelterbelts.',
        'Adoption of zero-tillage and cover cropping to shield soil during fallow seasons.',
        'Fencing off riparian buffer zones from grazing livestock to protect natural riverbank stabilizes.',
      ],
    },
    {
      id: 'developed',
      num: '3',
      title: '3. Developed Land',
      shortTitle: 'Developed Land',
      desc: 'Urban areas, infrastructure, industries and settlements.',
      icon: Building2,
      iconColor: '#facc15',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      fallback: '/images/landform-banner-urban.jpg',
      badge: 'PERMANENT SOIL SEALING',
      statBig: '~85% Runoff',
      statDesc: 'Rainfall immediately converts into high-velocity surface storm runoff over impermeable asphalt and concrete.',
      mechanism:
        'Urban expansion replaces permeable soils and living biomass with asphalt highways, concrete foundations, and rooftops (impervious surfaces). Soil pores are permanently sealed, eliminating natural groundwater recharge and creating intense Urban Heat Islands.',
      curriculumPoints: [
        'Soil sealing is defined in the notes as the permanent closure of soil surface pores by impervious construction materials.',
        'Impervious surfaces contribute massive non-point source runoff carrying oils, heavy metals, and particulate pollution into rivers.',
        'Peak flood runoff volume increases by 300–500% while catchment lag time collapses, creating dangerous urban flash flood hazards.',
        'Loss of vegetative shade combined with thermal absorption by pavement produces Urban Heat Islands, raising city temperatures by 2–5°C.',
      ],
      solutions: [
        'Mandatory Water-Sensitive Urban Design (WSUD) and permeable pavements.',
        'Integration of Sustainable Drainage Systems (SuDS), rain gardens, and vegetated bioswales.',
        'Enforcing Urban Growth Boundaries (UGB) to curtail outward sprawl and promote high-density brownfield infill.',
      ],
    },
  ];

  // 6 Impacts Data matching mockup
  const impactsData = [
    {
      id: 'bio',
      title: 'Loss of Biodiversity',
      desc: 'Habitat destruction and fragmentation.',
      icon: Leaf,
      color: '#4ade80',
      themeClass: 'theme-biodiversity',
      detail:
        'Conversion of continuous forests into fragmented agricultural and urban parcels severs wildlife migratory corridors. Edge effects expose inner forest species to elevated temperatures, windthrow, and invasive predators, leading to localized species extinctions.',
      curriculumHighlight: 'VTU BCV755B syllabus identifies habitat fragmentation as a primary driver of terrestrial species loss.',
    },
    {
      id: 'climate',
      title: 'Climate Change',
      desc: 'Increased greenhouse gas emissions and altered local climate.',
      icon: Thermometer,
      color: '#f87171',
      themeClass: 'theme-climate',
      detail:
        'Clearing vegetative cover volatilizes stored carbon stocks into the atmosphere. Urban impervious surfaces generate massive Urban Heat Islands, altering localized precipitation patterns and elevating microclimatic temperatures by 2–5°C.',
      curriculumHighlight: 'Deforestation and land-use conversion contribute ~10–15% of all global anthropogenic greenhouse emissions.',
    },
    {
      id: 'soil',
      title: 'Soil Degradation',
      desc: 'Loss of fertile soil and increased erosion.',
      icon: Sprout,
      color: '#fbbf24',
      themeClass: 'theme-soil',
      detail:
        'Removal of protective forest canopies leaves topsoil directly vulnerable to kinetic rainfall detachment. Intensive tillage and soil compaction degrade soil crumb structure, accelerating water runoff and wind sheet erosion.',
      curriculumHighlight: 'Soil loss rates accelerate from < 1 t/ha/yr in natural forests to over 29 t/ha/yr in poorly managed crop lands.',
    },
    {
      id: 'water',
      title: 'Altered Water Cycle',
      desc: 'Changes in infiltration, runoff and increased flood risk.',
      icon: Droplet,
      color: '#38bdf8',
      themeClass: 'theme-water',
      detail:
        'Impervious surfaces prevent precipitation from recharging underlying groundwater aquifers. Rainfall rapidly concentrates into storm channels, generating violent flash flood surges and leaving river baseflows severely depleted during dry periods.',
      curriculumHighlight: 'Runoff coefficients shift from 0.15 in natural catchments up to 0.85 in heavily paved urban watersheds.',
    },
    {
      id: 'community',
      title: 'Impact on Communities',
      desc: 'Displacement of people and changes to livelihoods.',
      icon: Users2,
      color: '#c084fc',
      themeClass: 'theme-community',
      detail:
        'Land-use transformation frequently displaces indigenous populations and agrarian smallholders. Communities downstream suffer from contaminated municipal drinking water, heightened flood damages, and depleted fish stocks.',
      curriculumHighlight: 'Loss of fertile soil and clean river water directly threatens rural food security and agrarian livelihoods.',
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem Services',
      desc: 'Reduced carbon storage, water regulation and natural resources.',
      icon: BarChart3,
      color: '#facc15',
      themeClass: 'theme-ecosystem',
      detail:
        'Natural ecosystems deliver invaluable provisioning, regulating, supporting, and cultural services. Land conversion permanently impairs natural water filtration, pollinator habitats, climate regulation, and recreation value.',
      curriculumHighlight: 'Unpriced ecosystem services result in significant long-term economic degradation exceeding initial development gains.',
    },
  ];

  const currentStage = selectedStageIndex !== null ? stagesData[selectedStageIndex] : null;
  const currentImpact = selectedImpactIndex !== null ? impactsData[selectedImpactIndex] : null;

  return (
    <section className="land-screen land-landuse-screen" id="ch-landuse">
      <div className="landuse-screen-container">
        {/* ================================================================
            1. HERO BEFORE / AFTER SECTION (Interactive Draggable Split)
           ================================================================ */}
        <div
          ref={hero.containerRef}
          className="landuse-hero-interactive"
          onMouseDown={hero.onMouseDown}
          onTouchMove={hero.onTouchMove}
          style={{ '--split-pct': `${hero.pos}%` } as React.CSSProperties}
          role="region"
          aria-label="Interactive before and after land-use comparison slider"
        >
          {/* LAYER 1: NATURAL LAND (Left side, clipped to 0% -> split-pct) */}
          <div className="landuse-layer landuse-layer-natural">
            <div
              className="landuse-hero-bg landuse-bg-natural"
              style={{
                backgroundImage: `url('/images/landuse-hero-natural.jpg'), url('/images/landform-banner-forests.jpg')`,
              }}
            />
            <div className="landuse-hero-scrim" />

            {/* Typography Copy (Inside Natural layer with graceful fade) */}
            <div
              className="landuse-hero-copy"
              style={{
                opacity: hero.pos < 18 ? 0 : Math.min(1, (hero.pos - 15) / 20),
                pointerEvents: hero.pos < 18 ? 'none' : 'auto',
              }}
            >
              <span className="landuse-eyebrow">MODULE 01 &nbsp;|&nbsp; CHAPTER 10</span>
              <h2 className="landuse-grand-title">
                Land-Use <em>Change</em>
              </h2>
              <p className="landuse-subtitle">From natural landscapes to human settlements.</p>
              <p className="landuse-lead-desc">
                Land-use change refers to the transformation of land from its natural state to other uses such as
                agriculture, urban areas, industry and infrastructure. It is driven by human needs and has significant
                impacts on ecosystems, biodiversity, climate and society.
              </p>
            </div>

            {/* Natural Land Pill Badge (Inside Natural layer, fades when slider moves left) */}
            <div
              className="landuse-pill-badge badge-natural"
              style={{
                opacity: hero.pos < 46 ? 0 : Math.min(1, (hero.pos - 44) / 10),
                pointerEvents: hero.pos < 46 ? 'none' : 'auto',
              }}
            >
              <div className="pill-icon-circle pill-icon-natural">
                <Leaf size={16} />
              </div>
              <div className="pill-text-col">
                <strong>Natural Land</strong>
                <span>Forests, rivers, wetlands</span>
                <span>Rich biodiversity</span>
              </div>
            </div>
          </div>

          {/* LAYER 2: DEVELOPED LAND (Right side, clipped to split-pct -> 100%) */}
          <div className="landuse-layer landuse-layer-developed">
            <div
              className="landuse-hero-bg landuse-bg-developed"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1920&q=80'), url('/images/landform-banner-urban.jpg')`,
              }}
            />

            {/* Developed Land Pill Badge (Inside Developed layer, fades when slider moves right) */}
            <div
              className="landuse-pill-badge badge-developed"
              style={{
                opacity: hero.pos > 86 ? 0 : Math.min(1, (88 - hero.pos) / 10),
                pointerEvents: hero.pos > 86 ? 'none' : 'auto',
              }}
            >
              <div className="pill-icon-circle pill-icon-developed">
                <Building2 size={16} />
              </div>
              <div className="pill-text-col">
                <strong>Developed Land</strong>
                <span>Urban areas, industries</span>
                <span>Transformed landscape</span>
              </div>
            </div>
          </div>

          {/* Draggable Divider Line & Handle */}
          <div className="landuse-divider-line">
            <div className="landuse-divider-handle" title="Drag to compare natural and developed land">
              <ChevronLeft size={13} strokeWidth={2.6} />
              <ChevronRight size={13} strokeWidth={2.6} />
            </div>
          </div>
        </div>

        {/* ================================================================
            2. MIDDLE GRID: STAGES OF LAND-USE CHANGE + SHIRE RIVER CASE STUDY
           ================================================================ */}
        <Reveal dir="up" className="landuse-middle-grid">
          {/* LEFT: Stages of Land-Use Change */}
          <div className="landuse-glass-card">
            <div className="landuse-card-title-group">
              <h3 className="landuse-card-heading">Stages of Land-Use Change</h3>
              <p className="landuse-card-subheading">
                A typical progression from natural land to developed and agricultural land. Click any card to inspect.
              </p>
            </div>

            <div className="stages-progression-row">
              {stagesData.map((stage, idx) => {
                const IconComp = stage.icon;
                return (
                  <div key={stage.id} style={{ display: 'contents' }}>
                    <div
                      className="stage-step-card"
                      onClick={() => setSelectedStageIndex(idx)}
                      onKeyDown={keyActivate(() => setSelectedStageIndex(idx))}
                      role="button"
                      tabIndex={0}
                      title={`Click to open deep dive on ${stage.title}`}
                      aria-label={`Open syllabus deep dive for ${stage.title}`}
                    >
                      <div className="stage-step-thumb-wrap">
                        <img
                          src={stage.image}
                          alt={stage.title}
                          className="stage-step-thumb"
                          onError={(e) => {
                            e.currentTarget.src = stage.fallback;
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="stage-step-content">
                        <IconComp size={18} className="stage-step-icon" style={{ color: stage.iconColor }} />
                        <div className="stage-step-texts">
                          <strong className="stage-step-title">{stage.title}</strong>
                          <span className="stage-step-desc">{stage.desc}</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow node between stages */}
                    {idx < stagesData.length - 1 && (
                      <button
                        type="button"
                        className="stage-arrow-node"
                        title="Progression transition"
                        aria-label={`Skip to stage ${idx + 2}`}
                        onClick={() => setSelectedStageIndex(idx + 1)}
                      >
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Case Study: Shire River, Malawi */}
          <div className="landuse-glass-card case-study-card">
            <div className="case-study-header">
              <div className="landuse-card-title-group">
                <h3 className="landuse-card-heading">Case Study: Shire River, Malawi</h3>
              </div>
              <button
                type="button"
                className="case-location-badge"
                onClick={() => setIsCaseStudyModalOpen(true)}
                title="Click to view detailed case study"
              >
                <MapPin size={11} />
                <span>Shire River, Malawi</span>
              </button>
            </div>

            {/* Embedded Mini Draggable Before / After Comparison Slider */}
            <div
              ref={mini.containerRef}
              className="case-mini-slider-wrap"
              onMouseDown={mini.onMouseDown}
              onTouchMove={mini.onTouchMove}
              style={{ '--mini-split': `${mini.pos}%` } as React.CSSProperties}
              title="Drag to compare Shire River Before vs After urbanization"
            >
              {/* Layer 1: Before (Left side, clipped to 0% -> mini-split) */}
              <div className="case-mini-layer case-mini-layer-before">
                <div
                  className="case-mini-bg"
                  style={{ backgroundImage: `url('/images/shire-river-before.jpg')` }}
                />
                <div
                  className="mini-slider-pill mini-pill-before"
                  style={{
                    opacity: mini.pos < 18 ? 0 : Math.min(1, (mini.pos - 14) / 10),
                    pointerEvents: mini.pos < 18 ? 'none' : 'auto',
                  }}
                >
                  <strong>Before</strong>
                  <span>Natural river and floodplains</span>
                </div>
              </div>

              {/* Layer 2: After (Right side, clipped to mini-split -> 100%) */}
              <div className="case-mini-layer case-mini-layer-after">
                <div
                  className="case-mini-bg"
                  style={{ backgroundImage: `url('/images/shire-river-after.jpg')` }}
                />
                <div
                  className="mini-slider-pill mini-pill-after"
                  style={{
                    opacity: mini.pos > 82 ? 0 : Math.min(1, (84 - mini.pos) / 10),
                    pointerEvents: mini.pos > 82 ? 'none' : 'auto',
                  }}
                >
                  <strong>After</strong>
                  <span>Urban development and changed land use</span>
                </div>
              </div>

              {/* Draggable Divider Line & Mini Handle */}
              <div className="case-mini-divider">
                <div className="case-mini-handle">
                  <ChevronLeft size={10} strokeWidth={2.6} />
                  <ChevronRight size={10} strokeWidth={2.6} />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="case-study-summary-desc"
              onClick={() => setIsCaseStudyModalOpen(true)}
              title="Click to read full syllabus findings"
            >
              The Shire River has undergone significant land-use change due to urbanization, leading to altered river
              flows, reduced wetlands and increased flood risk.
            </button>
          </div>
        </Reveal>

        {/* ================================================================
            3. IMPACTS OF LAND-USE CHANGE (6 Themed Cards Row)
           ================================================================ */}
        <Reveal dir="up" className="landuse-impacts-section">
          <div className="landuse-impacts-header">
            <h3 className="landuse-impacts-title">Impacts of Land-Use Change</h3>
            <p className="landuse-impacts-subtitle">
              Changing the use of land affects the environment, climate and human societies in many ways. Click any card to inspect.
            </p>
          </div>

          <div className="landuse-impacts-row">
            {impactsData.map((impact, idx) => {
              const IconComp = impact.icon;
              return (
                <div
                  key={impact.id}
                  className={`landuse-impact-card ${impact.themeClass}`}
                  onClick={() => setSelectedImpactIndex(idx)}
                  onKeyDown={keyActivate(() => setSelectedImpactIndex(idx))}
                  role="button"
                  tabIndex={0}
                  title={`Click to read details on ${impact.title}`}
                  aria-label={`Inspect ${impact.title}`}
                >
                  <div className="impact-icon-col">
                    <IconComp size={16} />
                  </div>
                  <div className="impact-text-col">
                    <strong className="impact-card-title">{impact.title}</strong>
                    <span className="impact-card-desc">{impact.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ================================================================
            4. BOTTOM NAVIGATION BAR (Exact Match to Mockup)
           ================================================================ */}
        <div className="landuse-bottom-bar">
          <button type="button" className="nav-prev-link-btn" onClick={onPrev} aria-label="Go to Deforestation chapter">
            <div className="nav-circle-arrow">
              <ChevronLeft size={16} />
            </div>
            <div className="nav-prev-text-col">
              <span className="nav-prev-heading">Previous</span>
              <span className="nav-prev-sub">Deforestation</span>
            </div>
          </button>

          {/* 15 Chapter indicator dots (10th dot active in gold) — clickable */}
          <div className="nav-center-dots-group">
            <ChapterDots activeIndex={9} onJump={onJumpChapter} className="nav-center-dots-group" dotClassName="nav-chap-dot" activeClassName="is-active-dot" />
          </div>

          <button
            type="button"
            className="nav-next-gold-pill"
            onClick={onNext}
            aria-label="Continue to Soil Health chapter"
          >
            <div className="nav-next-text-col">
              <span className="nav-next-heading">Next</span>
              <span className="nav-next-sub">Soil Health & Composition</span>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ================================================================
          5. STAGE DETAIL MODAL (Portal to document.body)
         ================================================================ */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {currentStage && (
              <motion.div
                className="landuse-modal-overlay"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedStageIndex(null)}
              >
                <motion.div
                  className="landuse-modal-window"
                  role="dialog"
                  aria-modal="true"
                  data-lenis-prevent
                  initial={{ scale: 0.94, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 20 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="landuse-modal-hero-banner">
                    <img
                      src={currentStage.image}
                      alt={currentStage.title}
                      className="landuse-modal-hero-img"
                      onError={(e) => {
                        e.currentTarget.src = currentStage.fallback;
                      }}
                    />
                    <div className="landuse-modal-hero-scrim" />

                    <button
                      type="button"
                      className="landuse-modal-close-btn"
                      onClick={() => setSelectedStageIndex(null)}
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>

                    <div className="landuse-modal-hero-badges">
                      <div className="landuse-modal-title-group">
                        <div className="landuse-modal-icon-circle">
                          {(() => {
                            const Icon = currentStage.icon;
                            return <Icon size={20} style={{ color: currentStage.iconColor }} />;
                          })()}
                        </div>
                        <div className="landuse-modal-hero-titles">
                          <h2>{currentStage.title}</h2>
                          <p>{currentStage.desc}</p>
                        </div>
                      </div>
                      <span className="landuse-modal-tag-badge">{currentStage.badge}</span>
                    </div>
                  </div>

                  <div className="landuse-modal-body" data-lenis-prevent>
                    <div className="landuse-stat-card">
                      <span className="landuse-stat-big">{currentStage.statBig}</span>
                      <span className="landuse-stat-desc">{currentStage.statDesc}</span>
                    </div>

                    <div>
                      <span className="landuse-section-title">Physical &amp; Ecological Mechanism</span>
                      <p className="landuse-mechanism-p">{currentStage.mechanism}</p>
                    </div>

                    <div>
                      <span className="landuse-section-title">VTU BCV755B Syllabus Notes</span>
                      <ul className="landuse-bullet-list">
                        {currentStage.curriculumPoints.map((point, idx) => (
                          <li key={idx} className="landuse-bullet-item">
                            <span className="landuse-bullet-dot" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="landuse-section-title" style={{ color: '#4ade80' }}>
                        Sustainable Land-Use Solutions
                      </span>
                      <ul className="landuse-bullet-list">
                        {currentStage.solutions.map((sol, idx) => (
                          <li key={idx} className="landuse-bullet-item">
                            <span className="landuse-bullet-dot" style={{ background: '#4ade80' }} />
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="landuse-modal-footer">
                    <button
                      type="button"
                      className="landuse-cycle-btn"
                      onClick={() => {
                        setSelectedStageIndex((prev) => (prev! > 0 ? prev! - 1 : stagesData.length - 1));
                      }}
                    >
                      <ChevronLeft size={14} />
                      <span>Previous Stage</span>
                    </button>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      Stage {selectedStageIndex! + 1} of {stagesData.length}
                    </span>
                    <button
                      type="button"
                      className="landuse-cycle-btn"
                      onClick={() => {
                        setSelectedStageIndex((prev) => (prev! < stagesData.length - 1 ? prev! + 1 : 0));
                      }}
                    >
                      <span>Next Stage</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ================================================================
          6. SHIRE RIVER CASE STUDY MODAL (Portal to document.body)
         ================================================================ */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isCaseStudyModalOpen && (
              <motion.div
                className="landuse-modal-overlay"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCaseStudyModalOpen(false)}
              >
                <motion.div
                  className="landuse-modal-window"
                  role="dialog"
                  aria-modal="true"
                  data-lenis-prevent
                  initial={{ scale: 0.94, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 20 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="landuse-modal-hero-banner">
                    <img
                      src="/images/shire-river-after.jpg"
                      alt="Shire River Land-Use Transformation"
                      className="landuse-modal-hero-img"
                    />
                    <div className="landuse-modal-hero-scrim" />

                    <button
                      type="button"
                      className="landuse-modal-close-btn"
                      onClick={() => setIsCaseStudyModalOpen(false)}
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>

                    <div className="landuse-modal-hero-badges">
                      <div className="landuse-modal-title-group">
                        <div className="landuse-modal-icon-circle">
                          <MapPin size={20} style={{ color: '#eab308' }} />
                        </div>
                        <div className="landuse-modal-hero-titles">
                          <h2>Case Study: Shire River Basin</h2>
                          <p>Land Use Land Cover Change (LUCC) &amp; Hydrological Modeling</p>
                        </div>
                      </div>
                      <span className="landuse-modal-tag-badge">VTU BCV755B CORE CURRICULUM</span>
                    </div>
                  </div>

                  <div className="landuse-modal-body" data-lenis-prevent>
                    <div className="landuse-stat-card">
                      <span className="landuse-stat-big">29 t/ha/yr</span>
                      <span className="landuse-stat-desc">
                        Current accelerated soil loss rate under continuous crop cultivation and catchment deforestation, up from an earlier baseline of 20 t/ha/yr.
                      </span>
                    </div>

                    <div>
                      <span className="landuse-section-title">Case Study Overview</span>
                      <p className="landuse-mechanism-p">
                        The Shire River catchment provides a prime benchmark for examining how rapid land-use land-cover
                        change (LUCC) impairs river basin hydrology. Conversion of upstream forest canopies and native
                        wetlands into agricultural and urban land uses has dramatically amplified surface runoff, stripped
                        topsoil, and created heavy downstream reservoir siltation.
                      </p>
                    </div>

                    <div>
                      <span className="landuse-section-title">Key Syllabus Findings &amp; Exam Points</span>
                      <ul className="landuse-bullet-list">
                        <li className="landuse-bullet-item">
                          <span className="landuse-bullet-dot" />
                          <span><strong>Direct vs Indirect Land Use:</strong> Direct land use refers to physical occupation (farming/housing); indirect land use traces supply chain conversion (wild lands cleared for crop feedstocks).</span>
                        </li>
                        <li className="landuse-bullet-item">
                          <span className="landuse-bullet-dot" />
                          <span><strong>Threat to Hydroelectric Power:</strong> Massive siltation directly endangers the Nkula B Hydroelectric Power Station across the river, clogging turbine intakes and reducing generation capacity.</span>
                        </li>
                        <li className="landuse-bullet-item">
                          <span className="landuse-bullet-dot" />
                          <span><strong>Soil Erosion Under Continuous Cultivation:</strong> Identified in lecture notes as the most severe form of natural resource degradation across the river basin.</span>
                        </li>
                        <li className="landuse-bullet-item">
                          <span className="landuse-bullet-dot" />
                          <span><strong>Hydrological Hydrograph Compression:</strong> Channelization and loss of floodplain retention reduce basin lag time, transforming gentle seasonal flows into destructive flash floods.</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <span className="landuse-section-title" style={{ color: '#4ade80' }}>
                        River Basin Mitigation &amp; Restoration
                      </span>
                      <ul className="landuse-bullet-list">
                        <li className="landuse-bullet-item">
                          <span className="landuse-bullet-dot" style={{ background: '#4ade80' }} />
                          <span>Re-establishing native riparian buffer strips and wetland retention sponges along the riverbanks.</span>
                        </li>
                        <li className="landuse-bullet-item">
                          <span className="landuse-bullet-dot" style={{ background: '#4ade80' }} />
                          <span>Enacting Sustainable Drainage Systems (SuDS) and permeable surfaces to restore natural groundwater infiltration.</span>
                        </li>
                        <li className="landuse-bullet-item">
                          <span className="landuse-bullet-dot" style={{ background: '#4ade80' }} />
                          <span>Mandatory contour bunding, agroforestry, and silt trapping dams in upper agricultural tributaries.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="landuse-modal-footer">
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                      VTU 7th Sem Conservation of Natural Resources (BCV755B) · Module 1
                    </span>
                    <button
                      type="button"
                      className="landuse-cycle-btn"
                      onClick={() => setIsCaseStudyModalOpen(false)}
                    >
                      <span>Close Case Study</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ================================================================
          7. IMPACT DETAIL MODAL (Portal to document.body)
         ================================================================ */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {currentImpact && (
              <motion.div
                className="landuse-modal-overlay"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImpactIndex(null)}
              >
                <motion.div
                  className="landuse-modal-window"
                  role="dialog"
                  aria-modal="true"
                  data-lenis-prevent
                  initial={{ scale: 0.94, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 20 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="landuse-modal-hero-banner" style={{ height: '170px' }}>
                    <img
                      src="/images/landuse-hero-natural.jpg"
                      alt={currentImpact.title}
                      className="landuse-modal-hero-img"
                    />
                    <div className="landuse-modal-hero-scrim" />

                    <button
                      type="button"
                      className="landuse-modal-close-btn"
                      onClick={() => setSelectedImpactIndex(null)}
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>

                    <div className="landuse-modal-hero-badges">
                      <div className="landuse-modal-title-group">
                        <div className="landuse-modal-icon-circle">
                          {(() => {
                            const Icon = currentImpact.icon;
                            return <Icon size={20} style={{ color: currentImpact.color }} />;
                          })()}
                        </div>
                        <div className="landuse-modal-hero-titles">
                          <h2>{currentImpact.title}</h2>
                          <p>{currentImpact.desc}</p>
                        </div>
                      </div>
                      <span className="landuse-modal-tag-badge">IMPACT DIMENSION</span>
                    </div>
                  </div>

                  <div className="landuse-modal-body" data-lenis-prevent>
                    <div className="landuse-stat-card">
                      <span className="landuse-stat-big" style={{ color: currentImpact.color }}>
                        Core Effect
                      </span>
                      <span className="landuse-stat-desc">{currentImpact.detail}</span>
                    </div>

                    <div>
                      <span className="landuse-section-title">Curriculum Highlight</span>
                      <p className="landuse-mechanism-p">{currentImpact.curriculumHighlight}</p>
                    </div>
                  </div>

                  <div className="landuse-modal-footer">
                    <button
                      type="button"
                      className="landuse-cycle-btn"
                      onClick={() => {
                        setSelectedImpactIndex((prev) => (prev! > 0 ? prev! - 1 : impactsData.length - 1));
                      }}
                    >
                      <ChevronLeft size={14} />
                      <span>Previous Impact</span>
                    </button>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      Impact {selectedImpactIndex! + 1} of {impactsData.length}
                    </span>
                    <button
                      type="button"
                      className="landuse-cycle-btn"
                      onClick={() => {
                        setSelectedImpactIndex((prev) => (prev! < impactsData.length - 1 ? prev! + 1 : 0));
                      }}
                    >
                      <span>Next Impact</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}


// SCREEN 11: SOIL HEALTH & COMPOSITION
