import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ArrowLeft, Sparkles, Building2, Users2, Layers, Sprout, X, Clock, Leaf, BarChart3, MapPin, TreePine, ShieldCheck } from 'lucide-react';
import '../../landplanning.css';
import { TiltCard, Reveal } from './motion';
import { useModalScrollLock } from './helpers/useModalScrollLock';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function LandPlanningScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  // Modal states: 'evolution' | 'type' | 'nilgiris' | 'future' | null
  const [activeModal, setActiveModal] = useState<'evolution' | 'type' | 'nilgiris' | 'future' | null>(null);
  const [selectedEvolutionId, setSelectedEvolutionId] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  const openEvolutionModal = (id: string) => {
    setSelectedEvolutionId(id);
    setActiveModal('evolution');
  };

  const openTypeModal = (id: string) => {
    setSelectedTypeId(id);
    setActiveModal('type');
  };

  const openNilgirisModal = () => {
    setActiveModal('nilgiris');
  };

  const openFutureModal = () => {
    setActiveModal('future');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Airtight background scroll lock + Escape-to-close while the modal is open.
  // Wheel scrolls over the dialog's header/footer are routed into the scrollable body.
  useModalScrollLock(activeModal !== null, {
    scrollableSelector: '.planning-modal-scrollable',
    onClose: closeModal,
  });

  // 1. Four Stages of Land-Use Planning Evolution
  const evolutionStages = [
    {
      id: 'traditional',
      num: '1. Traditional Use',
      color: '#4ade80',
      img: '/images/evolution-traditional.jpg',
      desc: 'Native and local communities living in harmony with nature.',
      period: 'Pre-1700s Era',
      concept: 'Land = Wealth',
      details:
        'In indigenous and traditional agrarian societies, land was revered as the prime source of sovereignty, communal life, and familial wealth. Customary land tenure, sacred groves, and communal pasture grazing maintained self-regenerating nutrient balances without causing systemic degradation.',
      governance: 'Decentralized customary village councils, rotational fallowing, and low ecological footprint.',
      impact: 'Preserved native soil horizons, high biodiversity conservation, zero chemical accumulation.',
    },
    {
      id: 'agriculture',
      num: '2. Agricultural Expansion',
      color: '#f59e0b',
      img: '/images/evolution-agriculture.jpg',
      desc: 'Conversion of land for farming to meet food demand.',
      period: '18th to Early 20th Century',
      concept: 'Land = Commodity',
      details:
        'With industrialization and population growth, land transformed into a tradeable market commodity. Forests and natural prairies were extensively cleared for commercial monocultures (wheat, cotton, sugarcane), initiating accelerated sheet erosion and soil organic carbon losses.',
      governance: 'Private fee-simple ownership, state canal irrigation commands, colonial plantation concessions.',
      impact: 'Deforestation across river basins, reduction of soil organic matter, and early downstream siltation.',
    },
    {
      id: 'urban',
      num: '3. Urban & Industrial Growth',
      color: '#ef4444',
      img: '/images/degradation-cause-urbanization.jpg',
      desc: 'Rapid development of cities, industries and infrastructure.',
      period: 'Mid-to-Late 20th Century',
      concept: 'Land = Scarce Resource',
      details:
        'Post-war industrial growth sparked unprecedented urbanization. Prime alluvial agricultural land was irreversibly lost to asphalt and concrete sealing. Industrial toxic effluents and unplanned municipal dumping caused widespread contamination and acute spatial scarcity.',
      governance: 'Rigid single-use zoning, industrial development corporations, uncoordinated municipal sprawl.',
      impact: 'Permanent soil sealing, severe urban heat island spikes, loss of prime soils, and flash-flood runoff.',
    },
    {
      id: 'sustainable',
      num: '4. Sustainable Planning',
      color: '#06b6d4',
      img: '/images/planning-hero-landscape.jpg',
      desc: 'Integrated approach for people, environment and long-term resilience.',
      period: '1980s Onwards to 21st Century',
      concept: 'Land = Scarce Community Resource',
      details:
        'Modern spatial planning recognizes land as both economic wealth and a shared communal heritage. Multi-objective spatial planning, Land Degradation Neutrality (LDN), GIS watershed modeling, and biophilic eco-cities harmonize human prosperity with ecological carrying capacities.',
      governance: 'Master spatial planning, Sustainable Land Management (SLM), environmental impact assessment (EIA).',
      impact: 'Ecosystem restoration, watershed protection, climate resilience, and intergenerational equity.',
    },
  ];

  // 2. Four Types of Land-Use Planning
  const planningTypes = [
    {
      id: 'agricultural-planning',
      title: 'Agricultural Planning',
      color: '#4ade80',
      icon: Sprout,
      desc: 'Allocates land for crop production, pasture and food security.',
      img: '/images/landform-thumb-agriculture.jpg',
      scope:
        'Systematically maps soil capability (USDA Classes I–VIII). Reserves fertile alluvial Class I & II soils exclusively for food production while directing intensive infrastructure away from prime agricultural belts.',
      tools: 'Digital soil fertility mapping, slope-aspect GIS analysis, agro-ecological zoning, irrigation buffers.',
      curriculum:
        'VTU BCV755B Standard: Prevents urban conversion of fertile food-basket lands and enforces sustainable contour cultivation.',
    },
    {
      id: 'urban-planning',
      title: 'Urban Planning',
      color: '#c084fc',
      icon: Building2,
      desc: 'Designs sustainable cities, housing, transport and public infrastructure.',
      img: '/images/cons-method-urban.jpg',
      scope:
        'Coordinates compact urban growth through Transit-Oriented Development (TOD), brownfield recycling, and mandatory permeable surface ratios to minimize environmental footprints and soil sealing.',
      tools: 'Master Development Plans (MDP), Water-Sensitive Urban Design (WSUD), urban green belts, drainage corridors.',
      curriculum:
        'VTU BCV755B Standard: Balances infrastructure density with urban flood retention, minimizing concrete surface runoff.',
    },
    {
      id: 'conservation-planning',
      title: 'Conservation Planning',
      color: '#38bdf8',
      icon: TreePine,
      desc: 'Protects forests, wetlands, biodiversity and natural habitats.',
      img: '/images/landform-thumb-forests.jpg',
      scope:
        'Delineates inviolate core wildlife sanctuaries, migratory corridors, and sensitive mountain headwaters. Establishes graduated buffer zones where low-impact human activities are strictly regulated.',
      tools: 'Ecological Sensitivity Indices, Marxan spatial optimization algorithms, watershed headwater demarcation.',
      curriculum:
        'VTU BCV755B Standard: Safeguards critical ecosystem services—carbon storage, aquifer replenishment, and erosion control.',
    },
    {
      id: 'integrated-planning',
      title: 'Integrated Land-Use Planning',
      color: '#f59e0b',
      icon: Layers,
      desc: 'Balances agriculture, urbanization, conservation and economic development.',
      img: '/images/planning-hero-landscape.jpg',
      scope:
        'Holistic cross-sectoral spatial governance reconciling competing land uses. Facilitates participatory stakeholder negotiations to achieve Sustainable Land Management (SLM) goals across river basins.',
      tools: 'GIS Multi-Criteria Decision Analysis (MCDA), Land Use Conflict Identification Strategy (LUCIS), EIA frameworks.',
      curriculum:
        'VTU BCV755B Standard: Encompasses ecological, economic, and socio-cultural dimensions of sustainable development.',
    },
  ];

  const activeEvolution = evolutionStages.find((s) => s.id === selectedEvolutionId);
  const activeType = planningTypes.find((t) => t.id === selectedTypeId);

  return (
    <section className="land-screen land-planning-screen" id="ch-planning">
      {/* ─── Landscape Backdrop ─── */}
      <div className="planning-backdrop-wrap">
        <div
          className="planning-backdrop-img"
          style={{ backgroundImage: `url('/images/planning-hero-landscape.jpg')` }}
        />
        <div className="planning-backdrop-scrim" />
      </div>

      <div className="planning-container">
        {/* ─── 1. Header Block ─── */}
        <div className="planning-header-row">
          <div className="planning-header-left">
            <span className="planning-eyebrow">MODULE 01 | CHAPTER 14</span>
            <h2 className="planning-title">
              Sustainable<br />Land-Use <em>Planning</em>
            </h2>
            <h3 className="planning-subtitle">Planning today, thriving tomorrow.</h3>
            <p className="planning-lead-text">
              Sustainable land-use planning balances human needs with environmental protection,
              ensuring healthy ecosystems, economies and communities for future generations.
            </p>
          </div>

          {/* Top-Right Floating Badges */}
          <div className="planning-status-badges">
            <div className="planning-status-badge">
              <div className="planning-badge-icon badge-green">
                <Leaf size={18} />
              </div>
              <div className="planning-badge-info">
                <span className="planning-badge-title">Balanced Growth</span>
                <span className="planning-badge-desc">People, nature and economy together</span>
              </div>
            </div>

            <div className="planning-status-badge">
              <div className="planning-badge-icon badge-amber">
                <BarChart3 size={18} />
              </div>
              <div className="planning-badge-info">
                <span className="planning-badge-title">Resilient Communities</span>
                <span className="planning-badge-desc">Prepared for a sustainable future</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 2. Main 2x2 Quadrant Grid ─── */}
        <Reveal dir="up" className="planning-main-grid">
          {/* Card 1: Evolution of Land-Use Planning */}
          <div className="planning-panel evolution-panel">
            <div className="planning-panel-header">
              <span className="planning-panel-title">Evolution of Land-Use Planning</span>
              <p className="planning-panel-sub">
                Land-use planning has evolved over time to address changing needs and challenges.
              </p>
            </div>

            <div className="evolution-timeline-track">
              {evolutionStages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className="evolution-stage-card"
                  style={{
                    ['--stage-color' as string]: stage.color,
                    ['--stage-glow' as string]: `${stage.color}35`,
                  }}
                  onClick={() => openEvolutionModal(stage.id)}
                  onKeyDown={keyActivate(() => openEvolutionModal(stage.id))}
                  title={`Click for history & details on ${stage.num}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="evolution-stage-thumb-wrap">
                    <img src={stage.img} alt={stage.num} className="evolution-stage-img" />
                    {idx < 3 && <div className="evolution-arrow-indicator">&rarr;</div>}
                  </div>

                  <div className="evolution-stage-content">
                    <div className="evolution-stage-pill">
                      <span className="evolution-stage-dot" />
                      <span>{stage.num}</span>
                    </div>
                    <p className="evolution-stage-desc">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Types of Land-Use Planning */}
          <div className="planning-panel types-panel">
            <div className="planning-panel-header">
              <span className="planning-panel-title">Types of Land-Use Planning</span>
              <p className="planning-panel-sub">
                Different planning approaches are used based on region, purpose and resources.
              </p>
            </div>

            <div className="types-planning-grid">
              {planningTypes.map((type) => {
                const TIcon = type.icon;
                return (
                  <TiltCard
                    key={type.id}
                    className="type-planning-card"
                    style={
                      {
                        '--type-color': type.color,
                        '--type-glow': `${type.color}30`,
                      } as React.CSSProperties
                    }
                    onClick={() => openTypeModal(type.id)}
                    onKeyDown={keyActivate(() => openTypeModal(type.id))}
                    role="button"
                    tabIndex={0}
                    title={`Explore ${type.title}`}
                    spotlight
                    max={7}
                  >
                    <div className="type-card-left">
                      <div
                        className="type-icon-badge"
                        style={{
                          background: `${type.color}20`,
                          color: type.color,
                          border: `1px solid ${type.color}40`,
                        }}
                      >
                        <TIcon size={18} />
                      </div>
                      <div className="type-text-group">
                        <span className="type-title">{type.title}</span>
                        <p className="type-desc">{type.desc}</p>
                      </div>
                    </div>
                    <img src={type.img} alt={type.title} className="type-card-thumb" />
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Card 3: Regional Case Study (Nilgiris, India) */}
          <div
            className="planning-panel case-study-panel"
            onClick={openNilgirisModal}
            onKeyDown={keyActivate(openNilgirisModal)}
            role="button"
            tabIndex={0}
            title="Click to explore the Nilgiris Regional Land-Use Planning Case Study"
          >
            <div className="planning-panel-header">
              <span className="planning-panel-title">
                Case Study: Regional Land-Use Planning (Example: Nilgiris, India)
              </span>
              <p className="planning-panel-sub">
                Integrated planning helps balance conservation, agriculture, tourism and community needs.
              </p>
            </div>

            <div className="case-study-split-card">
              <div className="case-study-thumb-wrap">
                <img
                  src="/images/degradation-healthy.jpg"
                  alt="Nilgiris Regional Landscape"
                  className="case-study-img"
                />
              </div>

              <div className="case-study-pillars-list">
                <div className="case-study-pillar-item">
                  <div
                    className="pillar-icon-badge"
                    style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}
                  >
                    <TreePine size={13} />
                  </div>
                  <span className="pillar-text">Conservation of forests and biodiversity.</span>
                </div>

                <div className="case-study-pillar-item">
                  <div
                    className="pillar-icon-badge"
                    style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}
                  >
                    <Sprout size={13} />
                  </div>
                  <span className="pillar-text">Sustainable agriculture (tea, spices, horticulture).</span>
                </div>

                <div className="case-study-pillar-item">
                  <div
                    className="pillar-icon-badge"
                    style={{ background: 'rgba(192, 132, 252, 0.2)', color: '#c084fc' }}
                  >
                    <Users2 size={13} />
                  </div>
                  <span className="pillar-text">Eco-tourism for livelihood opportunities.</span>
                </div>

                <div className="case-study-pillar-item">
                  <div
                    className="pillar-icon-badge"
                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                  >
                    <ShieldCheck size={13} />
                  </div>
                  <span className="pillar-text">Regulated urban growth to protect fragile ecosystems.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: A Sustainable Future */}
          <div className="planning-panel future-panel">
            <div className="planning-panel-header">
              <span className="planning-panel-title">A Sustainable Future</span>
              <p className="planning-panel-sub">
                With thoughtful land-use planning, we can create resilient landscapes that support people,
                nature and prosperity.
              </p>
            </div>

            <div className="future-card-content">
              <div
                className="future-landscape-banner"
                style={{ backgroundImage: `url('/images/planning-hero-landscape.jpg')` }}
              >
                <div className="future-landscape-scrim" />
                <div className="future-pills-row">
                  <div
                    className="future-status-pill"
                    style={
                      {
                        '--pill-color': '#4ade80',
                        '--pill-glow': 'rgba(74, 222, 128, 0.35)',
                      } as React.CSSProperties
                    }
                    onClick={openFutureModal}
                    title="Explore Healthy Ecosystems Pillar"
                  >
                    <Leaf size={14} style={{ color: '#4ade80' }} />
                    <span>Healthy Ecosystems</span>
                  </div>

                  <div
                    className="future-status-pill"
                    style={
                      {
                        '--pill-color': '#38bdf8',
                        '--pill-glow': 'rgba(56, 189, 248, 0.35)',
                      } as React.CSSProperties
                    }
                    onClick={openFutureModal}
                    title="Explore Thriving Communities Pillar"
                  >
                    <Users2 size={14} style={{ color: '#38bdf8' }} />
                    <span>Thriving Communities</span>
                  </div>

                  <div
                    className="future-status-pill"
                    style={
                      {
                        '--pill-color': '#fbbf24',
                        '--pill-glow': 'rgba(251, 191, 36, 0.35)',
                      } as React.CSSProperties
                    }
                    onClick={openFutureModal}
                    title="Explore Sustainable Economies Pillar"
                  >
                    <BarChart3 size={14} style={{ color: '#fbbf24' }} />
                    <span>Sustainable Economies</span>
                  </div>
                </div>
              </div>

              <div className="future-bottom-action-row">
                <button
                  type="button"
                  className="future-learn-more-btn"
                  onClick={openFutureModal}
                >
                  <span>Learn More</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ─── 3. Bottom Nav Bar ─── */}
        <div className="planning-bottom-nav">
          <button type="button" className="planning-prev-btn" onClick={onPrev}>
            <div className="planning-prev-circle">
              <ArrowLeft size={16} />
            </div>
            <div className="planning-prev-labels">
              <span className="planning-prev-title">Previous</span>
              <span className="planning-prev-sub">Soil Conservation</span>
            </div>
          </button>

          <div className="planning-dots-tracker">
            <ChapterDots activeIndex={13} onJump={onJumpChapter} className="planning-dots-tracker" dotClassName="planning-nav-dot" activeClassName="is-active-dot" />
          </div>

          <button type="button" className="planning-next-pill-btn" onClick={onNext}>
            <div className="planning-next-labels">
              <span className="planning-next-title">Next</span>
              <span className="planning-next-sub">Module Summary</span>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ─── 4. Modals Portal ─── */}
      {activeModal &&
        createPortal(
          <div className="planning-modal-portal" data-lenis-prevent>
            <div className="planning-modal-scrim" onClick={closeModal} />
            <div
              className="planning-modal-dialog"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Modal 1: Evolution Deep Dive */}
              {activeModal === 'evolution' && activeEvolution && (
                <>
                  <div className="planning-modal-header">
                    <div className="planning-modal-header-left">
                      <div
                        className="planning-modal-icon-badge"
                        style={{
                          background: `${activeEvolution.color}20`,
                          color: activeEvolution.color,
                        }}
                      >
                        <Clock size={20} />
                      </div>
                      <div className="planning-modal-titles">
                        <span className="planning-modal-pretitle">
                          {activeEvolution.period} &bull; {activeEvolution.concept}
                        </span>
                        <h3 className="planning-modal-maintitle">{activeEvolution.num}</h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="planning-modal-close-btn"
                      onClick={closeModal}
                      aria-label="Close Modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="planning-modal-scrollable" data-lenis-prevent>
                    <div className="planning-modal-overview">{activeEvolution.desc}</div>

                    <div className="planning-modal-card">
                      <strong>Historical Context &amp; Driving Forces:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeEvolution.details}</p>
                    </div>

                    <div className="planning-modal-card" style={{ borderColor: activeEvolution.color }}>
                      <strong>Governance &amp; Land Tenure Framework:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6, color: '#f1cb74' }}>
                        {activeEvolution.governance}
                      </p>
                    </div>

                    <div className="planning-modal-card">
                      <strong>Pedological &amp; Environmental Impact:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeEvolution.impact}</p>
                    </div>
                  </div>

                  <div className="planning-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      VTU BCV755B Evolution of Land Concept
                    </span>
                    <button
                      type="button"
                      className="planning-footer-close-btn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* Modal 2: Planning Type Deep Dive */}
              {activeModal === 'type' && activeType && (
                <>
                  <div className="planning-modal-header">
                    <div className="planning-modal-header-left">
                      <div
                        className="planning-modal-icon-badge"
                        style={{
                          background: `${activeType.color}20`,
                          color: activeType.color,
                        }}
                      >
                        <activeType.icon size={20} />
                      </div>
                      <div className="planning-modal-titles">
                        <span className="planning-modal-pretitle">PLANNING DISCIPLINE &bull; SPATIAL DOMAIN</span>
                        <h3 className="planning-modal-maintitle">{activeType.title}</h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="planning-modal-close-btn"
                      onClick={closeModal}
                      aria-label="Close Modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="planning-modal-scrollable" data-lenis-prevent>
                    <div className="planning-modal-overview">{activeType.desc}</div>

                    <div className="planning-modal-card">
                      <strong>Scope &amp; Strategic Allocation:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeType.scope}</p>
                    </div>

                    <div className="planning-modal-card" style={{ borderColor: activeType.color }}>
                      <strong>Engineering Tools &amp; Spatial Modeling:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6, color: '#f1cb74' }}>
                        {activeType.tools}
                      </p>
                    </div>

                    <div className="planning-modal-card">
                      <strong>Curriculum Objective:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeType.curriculum}</p>
                    </div>
                  </div>

                  <div className="planning-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      BCV755B Land-Use Management Principles
                    </span>
                    <button
                      type="button"
                      className="planning-footer-close-btn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* Modal 3: Nilgiris Regional Case Study */}
              {activeModal === 'nilgiris' && (
                <>
                  <div className="planning-modal-header">
                    <div className="planning-modal-header-left">
                      <div
                        className="planning-modal-icon-badge"
                        style={{ background: 'rgba(241, 203, 116, 0.2)', color: '#f1cb74' }}
                      >
                        <MapPin size={20} />
                      </div>
                      <div className="planning-modal-titles">
                        <span className="planning-modal-pretitle">REGIONAL MASTER PLAN &bull; WESTERN GHATS</span>
                        <h3 className="planning-modal-maintitle">
                          Integrated Land Planning in the Nilgiris Biosphere
                        </h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="planning-modal-close-btn"
                      onClick={closeModal}
                      aria-label="Close Modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="planning-modal-scrollable" data-lenis-prevent>
                    <div className="planning-modal-overview">
                      The Nilgiris district represents one of India's most critically sensitive high-altitude
                      watersheds (1,000–2,600m MSL), demanding multi-objective spatial coordination between
                      tea plantations, tribal habitats, hydro-electric catchments, and biodiversity corridors.
                    </div>

                    <div className="planning-modal-card">
                      <strong>1. Hill Area Conservation Authority (HACA) Zoning:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        HACA regulations prohibit civil constructions on slope gradients steeper than 30°
                        to curb debris flows and catastrophic landslide triggers. Building footprints are restricted
                        with mandatory vegetative setback buffers along natural mountain drainage streams.
                      </p>
                    </div>

                    <div className="planning-modal-card">
                      <strong>2. Agro-Ecological Preservation:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        Monoculture vegetable farming (potato/cabbage) on steep hillsides has been transitioned
                        to organic contour tea estates with shade-tree agroforestry, reducing topsoil erosion
                        rates from over 40 t/ha/yr to less than 2.5 t/ha/yr.
                      </p>
                    </div>

                    <div className="planning-modal-card">
                      <strong>3. Wildlife Corridor Demarcation:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        Spatial plans safeguard critical elephant migration corridors linking the Mudumalai
                        Tiger Reserve with the Silent Valley National Park, precluding highway expansion
                        and tourist resort encroachment.
                      </p>
                    </div>

                    <div className="planning-modal-card">
                      <strong>Key Lesson for Civil &amp; Environmental Engineers:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6, color: '#f1cb74' }}>
                        Regional land-use planning must harmonize economic development (tea, horticulture, tourism)
                        with natural hazard mitigation and ecosystem protection via strict slope-based statutory zoning.
                      </p>
                    </div>
                  </div>

                  <div className="planning-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      VTU BCV755B Regional Case Study
                    </span>
                    <button
                      type="button"
                      className="planning-footer-close-btn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* Modal 4: A Sustainable Future (3 Pillars of SLM) */}
              {activeModal === 'future' && (
                <>
                  <div className="planning-modal-header">
                    <div className="planning-modal-header-left">
                      <div
                        className="planning-modal-icon-badge"
                        style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}
                      >
                        <Sparkles size={20} />
                      </div>
                      <div className="planning-modal-titles">
                        <span className="planning-modal-pretitle">SUSTAINABLE LAND MANAGEMENT (SLM)</span>
                        <h3 className="planning-modal-maintitle">The 3 Pillars of a Resilient Future</h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="planning-modal-close-btn"
                      onClick={closeModal}
                      aria-label="Close Modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="planning-modal-scrollable">
                    <div className="planning-modal-overview">
                      Sustainable Land Management (SLM) is defined as "the use of land resources for the
                      production of goods to meet changing human needs while simultaneously ensuring the
                      long-term productive potential of these resources and the maintenance of their
                      environmental functions."
                    </div>

                    <div className="planning-modal-card" style={{ borderColor: '#4ade80' }}>
                      <strong style={{ color: '#4ade80' }}>1. Ecological Dimension (Healthy Ecosystems):</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        Maintains soil health, preserves natural drainage basins, sequesters atmospheric carbon,
                        and safeguards native biodiversity gene pools. Prevents salinization, acidification,
                        and permanent soil sealing.
                      </p>
                    </div>

                    <div className="planning-modal-card" style={{ borderColor: '#38bdf8' }}>
                      <strong style={{ color: '#38bdf8' }}>2. Socio-Cultural Dimension (Thriving Communities):</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        Guarantees equitable land tenure security, protects customary community rights, ensures
                        localized food sovereignty, and creates accessible recreational green spaces for public well-being.
                      </p>
                    </div>

                    <div className="planning-modal-card" style={{ borderColor: '#fbbf24' }}>
                      <strong style={{ color: '#fbbf24' }}>3. Economic Dimension (Sustainable Economies):</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        Optimizes land productivity over generational horizons without requiring exponential
                        synthetic inputs. Lowers public expenditure on disaster recovery, water treatment,
                        and silt dredging from hydropower reservoirs.
                      </p>
                    </div>

                    <div className="planning-modal-card">
                      <strong>VTU Exam Summary Formula:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6, color: '#f1cb74' }}>
                        SLM = Ecological Integrity + Economic Viability + Social Equity
                      </p>
                    </div>
                  </div>

                  <div className="planning-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      VTU BCV755B SLM Framework
                    </span>
                    <button
                      type="button"
                      className="planning-footer-close-btn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}


// SCREEN 15: MODULE SUMMARY & QUIZ CALL TO ACTION COMPONENT
// Pixel-perfect match to media_1790858989974.jpg
