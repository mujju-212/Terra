import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Layers, Globe, Sprout, X, Mountain, Settings } from 'lucide-react';
import { TiltCard, Reveal } from './motion';
import { useModalScrollLock } from './helpers/useModalScrollLock';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function LandFormsScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [detailModal, setDetailModal] = useState<{
    name: string;
    subtitle: string;
    badge: string;
    color: string;
    img: string;
    coverage: string;
    area: string;
    quote: string;
    points: string[];
  } | null>(null);

  // Airtight background scroll lock + Escape-to-close while the detail modal is open
  useModalScrollLock(detailModal !== null, {
    scrollableSelector: '.soil-detail-modal-card',
    onClose: () => setDetailModal(null),
  });

  // 4 Core Factors / Geomorphology Pillars
  const heroFactors = [
    {
      id: 'processes',
      title: 'Natural Processes',
      desc: 'Weathering, erosion, volcanism, tectonics',
      icon: Mountain,
    },
    {
      id: 'ecosystems',
      title: 'Unique Ecosystems',
      desc: 'Supports diverse plants and animals',
      icon: Sprout,
    },
    {
      id: 'importance',
      title: 'Human Importance',
      desc: 'Agriculture, settlements, resources',
      icon: Settings,
    },
    {
      id: 'interconnected',
      title: 'Interconnected',
      desc: 'All land forms shape and influence each other',
      icon: Globe,
    },
  ];

  // 8 Major Earth Landforms with precise hotspot coordinates and BCV755B notes
  const landforms = [
    {
      id: 'mountains',
      name: 'Mountains',
      pinLabel: 'Mountain',
      desc: 'High elevation land forms with steep slopes and rocky terrain.',
      img: '/images/landform-banner-mountains.jpg',
      color: '#4a89dc',
      dotColor: '#ffffff',
      pinPos: { left: '64.0%', top: '19.0%' },
      badge: 'HIGH ELEVATION RELIEF',
      subtitle: 'The Planet\'s Hydrological Towers',
      coverage: '24% of Earth\'s land surface',
      area: '~36 Million km²',
      quote: 'Mountain ranges act as the planet\'s hydrological towers, trapping clouds and feeding headwaters for more than half of humanity.',
      points: [
        'Formed through plate tectonic collision, folding, volcanic extrusion, and fault displacement.',
        'Creates steep altitudinal zonation of vegetation and microclimates from base to summit.',
        'High vulnerability to slope destabilization, landslides, and climate-induced glacial retreat.',
      ],
    },
    {
      id: 'grasslands',
      name: 'Grasslands',
      pinLabel: 'Grassland',
      desc: 'Vast open areas dominated by grasses.',
      img: '/images/landform-banner-grasslands.jpg',
      color: '#d4b175',
      dotColor: '#f1cb74',
      pinPos: { left: '74.5%', top: '39.0%' },
      badge: 'OPEN GRAMINOID BIOME',
      subtitle: 'The Great Carbon & Grazing Plains',
      coverage: 'Up to 40% of terrestrial land',
      area: 'Found on every continent except Antarctica',
      quote: 'Native grasslands represent expansive carbon reservoirs and the foundation of global grain and livestock agriculture.',
      points: [
        'Dominated by grasses where rainfall is seasonal and insufficient for dense forest canopies.',
        'Subject to periodic drought, dormant cycles, and fire adaptations.',
        'Highly susceptible to overgrazing, desertification, and conversion to intensive monoculture.',
      ],
    },
    {
      id: 'wetlands',
      name: 'Wetlands',
      pinLabel: 'Wetland',
      desc: 'Areas covered with water, rich in biodiversity.',
      img: '/images/landform-banner-wetlands.jpg',
      color: '#20c997',
      dotColor: '#48d1cc',
      pinPos: { left: '61.5%', top: '56.0%' },
      badge: 'HYDRIC ECOTONE & BIODIVERSITY',
      subtitle: 'Nature\'s Biological Kidneys',
      coverage: '~6% of Earth\'s land surface',
      area: 'Dispersed across all climate zones',
      quote: 'Wetlands function as Earth\'s biological kidneys, detoxifying runoff and providing breeding grounds for countless species.',
      points: [
        'Distinct transitional zones permanently or seasonally inundated with water.',
        'Develop characteristic hydric soils dominated by anaerobic biochemical processes.',
        'Provide flood attenuation, shoreline stabilization, and crucial carbon burial.',
      ],
    },
    {
      id: 'forests',
      name: 'Forests',
      pinLabel: 'Forest',
      desc: 'Densely vegetated areas with diverse life.',
      img: '/images/landform-banner-forests.jpg',
      color: '#5cb85c',
      dotColor: '#79c975',
      pinPos: { left: '53.0%', top: '35.0%' },
      badge: 'CANOPY BIOMASS & CARBON SINK',
      subtitle: 'Earth\'s Living Lungs & Canopy Biodiversity',
      coverage: '~30% of total land area',
      area: '~4 Billion hectares globally',
      quote: 'Forests support over 80% of terrestrial biodiversity and govern planetary rainfall through biophysical evapotranspiration.',
      points: [
        'Multi-tiered canopy structures dominated by trees, shrubs, and complex fungal networks.',
        'Decompose organic litter into nutrient-rich humus that shields mineral soils from erosion.',
        'Severely threatened by deforestation, agricultural encroachment, and fragmentation.',
      ],
    },
    {
      id: 'agriculture',
      name: 'Agricultural Land',
      pinLabel: 'Agriculture',
      desc: 'Modified land used for crop and livestock production.',
      img: '/images/landform-banner-agriculture.jpg',
      color: '#a2d242',
      dotColor: '#c0ca33',
      pinPos: { left: '81.5%', top: '60.0%' },
      badge: 'AGRO-ECOSYSTEM & FOOD SECURITY',
      subtitle: 'Managed Landscapes Sustaining Humanity',
      coverage: '~38% of global land surface',
      area: '~5 Billion hectares total',
      quote: 'Managed agricultural land provides the food, feed, and fiber sustaining 8 billion people, requiring sustainable conservation tillage.',
      points: [
        'Subdivided into intensive arable cropland, permanent pastures, and managed rangelands.',
        'Heavy tillage and intensive irrigation can trigger soil compaction, salinization, and runoff.',
        'Soil conservation practices like contour bunding and agroforestry preserve topsoil productivity.',
      ],
    },
    {
      id: 'tundra',
      name: 'Tundra',
      pinLabel: 'Tundra',
      desc: 'Cold, treeless regions with permafrost.',
      img: '/images/landform-banner-tundra.jpg',
      color: '#81d4fa',
      dotColor: '#e0f7fa',
      pinPos: { left: '86.5%', top: '22.0%' },
      badge: 'CRYOSPHERE PERMAFROST BIOME',
      subtitle: 'The Frozen High-Latitude Frontier',
      coverage: '~10% of Earth\'s land surface',
      area: 'Circumpolar Arctic & High Alpine',
      quote: 'Tundra permafrost acts as a cryogenic vault locking away gigatons of ancient carbon and methane.',
      points: [
        'Treeless landscape constrained by subzero temperatures and short, intense growing windows.',
        'Vegetation dominated by dwarf willows, sedges, mosses, and crustose lichens.',
        'Warming temperatures induce permafrost thaw, causing thermokarst slumping and greenhouse gas release.',
      ],
    },
    {
      id: 'deserts',
      name: 'Deserts',
      pinLabel: 'Desert',
      desc: 'Arid regions with very low rainfall.',
      img: '/images/landform-banner-deserts.jpg',
      color: '#e67e22',
      dotColor: '#ffb74d',
      pinPos: { left: '93.5%', top: '35.0%' },
      badge: 'XERIC ARIDITY (<250MM RAINFALL)',
      subtitle: 'Extreme Thermal & Eolian Landscapes',
      coverage: '~33% of terrestrial land surface',
      area: 'Found on every inhabited continent',
      quote: 'Deserts showcase extreme biological adaptations and active eolian wind transport sculpting monumental dune fields.',
      points: [
        'Arid environments where potential evaporation far outstrips sparse precipitation (<250 mm/yr).',
        'Large day-night temperature swings cause mechanical thermal fatigue that shatters surface rock.',
        'Vulnerable to desertification when adjacent marginal drylands are overcultivated or overgrazed.',
      ],
    },
    {
      id: 'urban',
      name: 'Urban Areas',
      pinLabel: 'Urban',
      desc: 'Land modified for human settlements and infrastructure.',
      img: '/images/landform-banner-urban.jpg',
      color: '#9b59b6',
      dotColor: '#ce93d8',
      pinPos: { left: '93.0%', top: '54.0%' },
      badge: 'ANTHROPOGENIC BUILT ENVIRONMENT',
      subtitle: 'Concentrated Human Civilization',
      coverage: '~1-3% of land surface directly',
      area: 'Concentrates >56% of world population',
      quote: 'Urban areas concentrate global human consumption, replacing permeable soils with impervious surfaces that alter microclimates.',
      points: [
        'Impervious surfaces interrupt groundwater percolation and accelerate stormwater runoff.',
        'Urban Heat Island (UHI) phenomenon elevates metropolitan temperatures by 2°C to 5°C.',
        'Sustainable land-use planning incorporates green belts, permeable paving, and vertical density.',
      ],
    },
  ];

  return (
    <section className="land-screen land-forms-screen" id="ch-landforms">
      {/* ─── Clean Panoramic Landscape Backdrop (No Baked-In Text) ─── */}
      <div
        className="landforms-backdrop-photo"
        style={{ backgroundImage: `url('/images/landforms-hero-clean.jpg')` }}
      >
        <div className="landforms-backdrop-scrim" />
      </div>

      {/* ─── Interactive Landscape Hotspots Pins Layer (Directly Over Backdrop) ─── */}
      <div className="landforms-pins-layer" aria-label="Interactive Landform Hotspots">
        {landforms.map((item, idx) => (
          <div
            key={item.id}
            className={`landform-map-pin ${activeCard === idx ? 'is-pin-selected' : ''} ${hoveredCard === idx ? 'is-pin-hovered' : ''}`}
            style={{
              left: item.pinPos.left,
              top: item.pinPos.top,
              '--pin-theme': item.color,
            } as React.CSSProperties}
            onClick={() => {
              setActiveCard(idx);
              setDetailModal(item);
            }}
            onKeyDown={keyActivate(() => {
              setActiveCard(idx);
              setDetailModal(item);
            })}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            role="button"
            tabIndex={0}
            title={`Click to inspect ${item.name}`}
          >
            <div className="pin-anchor-dot" style={{ background: item.color }} />
            <div className="pin-leader-line" />
            <div className="pin-glass-badge">
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="land-screen-inner landforms-screen-content-inner">
        {/* ================================================================
            UPPER HERO STAGE: Title + 4 Cards
           ================================================================ */}
        <div className="landforms-upper-hero-stage">
          {/* Left Column: Heading + Lead + 4 Core Cards */}
          <div className="landforms-hero-left-col">
            <span className="screen-ch-tag">
              MODULE 01 <span>|</span> CHAPTER 07
            </span>

            <h2 className="screen-main-title landforms-screen-headline">
              Land <em className="landforms-title-accent">Forms</em>
            </h2>

            <h3 className="landforms-screen-subheadline">Diverse landscapes, one planet.</h3>

            <p className="landforms-screen-lead-copy">
              Land forms are the natural features of Earth's surface, shaped by the forces of nature
              over millions of years. Each land form has unique characteristics, supports different
              ecosystems, and plays an important role in our environment and lives.
            </p>

            {/* 4 Feature Cards */}
            <div className="landforms-top-factors-row">
              {heroFactors.map((f) => {
                const IconComponent = f.icon;
                return (
                  <TiltCard
                    key={f.id}
                    className="landforms-factor-glass-card"
                    onClick={() => {
                      const factorImgMap: Record<string, string> = {
                        processes: '/images/landform-banner-mountains.jpg',
                        ecosystems: '/images/landform-banner-forests.jpg',
                        importance: '/images/landform-banner-agriculture.jpg',
                        interconnected: '/images/landforms-hero-clean.jpg',
                      };
                      setDetailModal({
                        name: f.title,
                        subtitle: 'Primary Geomorphology Driver',
                        badge: 'PEDOLOGY & GEOLOGY',
                        color: '#c9a15a',
                        img: factorImgMap[f.id] || '/images/landform-banner-mountains.jpg',
                        coverage: 'Universal Terrestrial Influence',
                        area: 'Global Crust & Biosphere',
                        quote: f.desc,
                        points: [
                          'A fundamental physical or biological driver shaping Earth surface topography.',
                          'Interacts dynamically across mountain, forest, wetland, and coastal ecotones.',
                          'Evaluated in BCV755B Module 1 syllabus as essential for landscape conservation.',
                        ],
                      });
                    }}
                    role="button"
                    tabIndex={0}
                    title="Click for syllabus factor details"
                    spotlight
                    max={6}
                  >
                    <div className="landforms-factor-icon-wrap">
                      <IconComponent size={18} strokeWidth={1.8} />
                    </div>
                    <div className="landforms-factor-info">
                      <strong className="landforms-factor-title">{f.title}</strong>
                      <span className="landforms-factor-sub">{f.desc}</span>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================
            LOWER SECTION: 8 Landforms Grid
           ================================================================ */}
        <Reveal dir="up" className="landforms-lower-container-card">
          <div className="landforms-lower-header">
            <h4 className="landforms-lower-title">MAJOR EARTH LAND FORMS</h4>
            <p className="landforms-lower-subtitle">
              Click any landscape card to inspect high-definition visuals, geographic coverage, and syllabus ecological functions.
            </p>
          </div>

          <div className="landforms-eight-cards-track" role="region" aria-label="Landforms Catalog">
            {landforms.map((item, idx) => (
              <div
                key={item.id}
                className={`landform-mini-card ${activeCard === idx ? 'is-card-selected' : ''}`}
                onClick={() => {
                  setActiveCard(idx);
                  setDetailModal(item);
                }}
                onKeyDown={keyActivate(() => {
                  setActiveCard(idx);
                  setDetailModal(item);
                })}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ '--card-tint': item.color } as React.CSSProperties}
                role="button"
                tabIndex={0}
              >
                <div
                  className="landform-mini-thumb kenburns-bg"
                  style={{ backgroundImage: `url('${item.img}')` }}
                >
                  <div className="mini-thumb-overlay" />
                  <span style={{ position: 'absolute', top: 5, left: 6, fontSize: 8, fontWeight: 700, background: 'rgba(0,0,0,0.65)', padding: '1px 5px', borderRadius: 3, color: '#fff', letterSpacing: '0.04em' }}>
                    0{idx + 1}
                  </span>
                </div>
                <div className="landform-mini-info">
                  <strong className="landform-mini-name">{item.name}</strong>
                  <p className="landform-mini-desc">{item.desc}</p>
                </div>
                <button
                  type="button"
                  className="landform-card-action-btn"
                  aria-label={`Explore ${item.name}`}
                >
                  <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bottom Navigation */}
        <div className="soil-bottom-navigation-bar landforms-bottom-navigation-bar">
          <button type="button" className="soil-nav-btn prev-btn" onClick={onPrev}>
            <div className="nav-arrow-bead">
              <ArrowLeft size={14} />
            </div>
            <div className="nav-btn-copy">
              <span className="nav-action-label">Previous</span>
              <span className="nav-target-title">Soil Formation</span>
            </div>
          </button>

          <div className="soil-pagination-dots-strip">
            <ChapterDots activeIndex={6} onJump={onJumpChapter} className="soil-pagination-dots-strip" />
          </div>

          <button type="button" className="soil-nav-btn next-btn is-gold-cta" onClick={onNext}>
            <div className="nav-btn-copy">
              <span className="nav-action-label">Next</span>
              <span className="nav-target-title">Conservation of Land Forms</span>
            </div>
            <div className="nav-arrow-bead">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Detail Modal for Landforms */}
      {detailModal && (
        <div className="soil-detail-modal-overlay" data-lenis-prevent onClick={() => setDetailModal(null)}>
          <div
            className="soil-detail-modal-card landforms-modal-card"
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            style={{ '--modal-accent': detailModal.color } as React.CSSProperties}
          >
            <button
              type="button"
              className="modal-close-icon-btn"
              onClick={() => setDetailModal(null)}
              aria-label="Close details"
            >
              <X size={16} />
            </button>

            <div className="modal-header-hero">
              <div
                className="modal-banner-image"
                style={{ backgroundImage: `url('${detailModal.img}')` }}
              >
                <div className="modal-banner-gradient" />
              </div>
              <span className="modal-badge-pill" style={{ color: detailModal.color }}>
                {detailModal.badge}
              </span>
              <h3 className="modal-headline-title">{detailModal.name}</h3>
              <p className="modal-sub-label">{detailModal.subtitle}</p>
            </div>

            <div className="modal-meta-stats-row">
              <div className="modal-stat-pill">
                <Globe size={12} style={{ color: detailModal.color }} />
                <span>Coverage: <strong>{detailModal.coverage}</strong></span>
              </div>
              <div className="modal-stat-pill">
                <Layers size={12} style={{ color: detailModal.color }} />
                <span>Area: <strong>{detailModal.area}</strong></span>
              </div>
            </div>

            <div className="modal-quote-block">
              <p className="modal-quote-text">“{detailModal.quote}”</p>
            </div>

            <div className="modal-bullet-points-stack">
              <span className="modal-section-title">KEY SYLLABUS TAKEAWAYS (BCV755B):</span>
              {detailModal.points.map((pt, i) => (
                <div key={i} className="modal-point-item">
                  <span className="modal-point-bullet" style={{ background: detailModal.color }} />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="modal-actions-footer">
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setDetailModal(null)}
              >
                <span>Done exploring</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


// SCREEN 08: CONSERVATION OF LAND FORMS (Matching user reference mockup media_1790797747982.jpg)
