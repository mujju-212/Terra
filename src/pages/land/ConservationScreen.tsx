import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Mountain, Droplet, Trees, Globe, Building2, Users2, Activity, Sprout, X, CloudRain, Leaf } from 'lucide-react';
import { TiltCard, Reveal } from './motion';
import { useModalScrollLock } from './helpers/useModalScrollLock';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function ConservationScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const [activeMethod, setActiveMethod] = useState<number>(0);
  const [detailModal, setDetailModal] = useState<{
    title: string;
    subtitle?: string;
    badge: string;
    color: string;
    img: string;
    quote: string;
    points: string[];
  } | null>(null);

  // Airtight background scroll lock + Escape-to-close while the detail modal is open
  useModalScrollLock(detailModal !== null, {
    scrollableSelector: '.soil-detail-modal-card',
    onClose: () => setDetailModal(null),
  });

  // 4 Core Factors: Why Conservation Matters
  const whyFactors = [
    {
      id: 'biodiversity',
      title: 'Biodiversity Protection',
      sub: 'Habitats for plants and animals',
      icon: Leaf,
      color: '#5cb85c',
      img: '/images/cons-method-habitats.jpg',
      badge: 'SPECIES PRESERVATION',
      subtitle: 'Shielding Ecological Niches & Food Webs',
      quote: 'Protecting continuous land forms preserves core habitats, migration corridors, and genetic diversity against extinction.',
      points: [
        'Shields critical native breeding grounds from habitat fragmentation and land clearance.',
        'Preserves delicate microclimatic niches supporting specialized endemic flora and fauna.',
        'Prevents irreversible loss of ecosystem resilience and natural biological pest regulation.',
      ],
    },
    {
      id: 'climate',
      title: 'Climate Regulation',
      sub: 'Maintains carbon balance',
      icon: CloudRain,
      color: '#4fa3c7',
      img: '/images/landform-banner-forests.jpg',
      badge: 'CARBON & HYDROLOGY',
      subtitle: 'Global Thermoregulation & Albedo',
      quote: 'Intact land forms sequester gigatons of carbon in plant biomass and deep soil profiles while moderating regional precipitation.',
      points: [
        'Forests, wetlands, and grasslands store vast reservoirs of carbon, preventing atmospheric greenhouse gas surges.',
        'Maintains terrestrial surface albedo and biophysical evapotranspiration that drive regional rainfall.',
        'Buffers coastal and riverine settlements against extreme weather volatility and flood waves.',
      ],
    },
    {
      id: 'water',
      title: 'Water Security',
      sub: 'Supports rivers, groundwater and wetlands',
      icon: Droplet,
      color: '#20c997',
      img: '/images/landform-banner-wetlands.jpg',
      badge: 'AQUIFERS & WATERSHEDS',
      subtitle: 'Natural Hydrological Filtration',
      quote: 'Natural land forms govern freshwater filtration, slow runoff velocity, and replenish underground aquifers that sustain billions.',
      points: [
        'Vegetated upper slopes promote downward rainwater infiltration into deep water tables.',
        'Wetlands detoxify agricultural runoff and filter sediment before waters reach rivers and lakes.',
        'Prevents watershed degradation that leads to downstream drought, siltation, and drinking water shortages.',
      ],
    },
    {
      id: 'human',
      title: 'Human Well-being',
      sub: 'Food, livelihoods and healthier environments',
      icon: Users2,
      color: '#f1cb74',
      img: '/images/cons-method-seedling.jpg',
      badge: 'COMMUNITY SUSTAINABILITY',
      subtitle: 'Livelihoods, Food Security & Heritage',
      quote: 'Conserving the natural land base guarantees fertile agricultural soils, clean water access, and cultural identity for future generations.',
      points: [
        'Supplies essential food, feed, and natural materials supporting over 8 billion people.',
        'Preserves indigenous cultural heritage and recreational open spaces essential for public health.',
        'Mitigates economic losses caused by soil erosion, catastrophic landslides, and ecological collapse.',
      ],
    },
  ];

  // 5 Interactive Landscape Callout Pins (matching reference image positions & icons)
  const conservationPins = [
    {
      id: 'mountains',
      title: 'Protect Mountains',
      sub: 'Prevent erosion',
      icon: Mountain,
      color: '#f1cb74',
      pos: { left: '57.0%', top: '18.0%' },
      badge: 'HIGH ELEVATION RELIEF',
      subtitle: 'Alpine Watershed & Slope Protection',
      quote: 'Mountain conservation prioritizes vegetative cover and slope bio-engineering to halt devastating landslides and feed headwaters.',
      points: [
        'Contour reforestation and terrace walls arrest soil detachment on steep gradients.',
        'Protection of alpine headwaters preserves perennial flows for downstream valleys.',
        'Strict spatial zoning prohibits heavy infrastructure in active seismic and landslide belts.',
      ],
      img: '/images/landform-banner-mountains.jpg',
    },
    {
      id: 'forests',
      title: 'Conserve Forests',
      sub: 'Maintain biodiversity',
      icon: Trees,
      color: '#5cb85c',
      pos: { left: '80.0%', top: '22.0%' },
      badge: 'CANOPY BIOMASS & CARBON',
      subtitle: 'Living Lungs & Forest Ecosystems',
      quote: 'Conserving forests preserves multi-tiered canopies that cushion soils against intense rainfall impact and sequester carbon.',
      points: [
        'Maintains humus-rich topsoils shielded by continuous multi-layered leaf canopies.',
        'Preserves interconnected wildlife corridors linking fragmented forest reserves.',
        'Enforces sustainable community forest management and combats illegal logging.',
      ],
      img: '/images/landform-banner-forests.jpg',
    },
    {
      id: 'wetlands',
      title: 'Preserve Wetlands',
      sub: 'Maintain water balance',
      icon: Droplet,
      color: '#20c997',
      pos: { left: '63.0%', top: '48.0%' },
      badge: 'HYDRIC ECOTONES',
      subtitle: 'Natural Hydrological Kidneys',
      quote: 'Preserving wetlands maintains natural flood storage basins and preserves unique biodiversity dependent on hydric soils.',
      points: [
        'Emergent reeds and marshes attenuate flash flood peaks and trap silt.',
        'Anaerobic soil microbial pathways detoxify agricultural nitrogen and phosphorus.',
        'Strictly prohibits landfilling, draining, and channelization of natural watercourses.',
      ],
      img: '/images/landform-banner-wetlands.jpg',
    },
    {
      id: 'agriculture',
      title: 'Sustainable Agriculture',
      sub: 'Use land wisely',
      icon: Sprout,
      color: '#a2d242',
      pos: { left: '88.0%', top: '32.0%' },
      badge: 'AGRO-ECOSYSTEM RESILIENCE',
      subtitle: 'Wise Soil Management & Food Security',
      quote: 'Sustainable agricultural land use implements contour tillage, cover crops, and agroforestry to protect topsoil fertility.',
      points: [
        'Contour bunds break runoff velocity and enhance in-situ soil moisture retention.',
        'Crop rotation and compost application replenish depleted organic humus pools.',
        'Targeted drip irrigation prevents groundwater depletion and secondary salinization.',
      ],
      img: '/images/cons-method-terraces.jpg',
    },
    {
      id: 'urban',
      title: 'Plan Urban Areas',
      sub: 'Reduce land degradation',
      icon: Building2,
      color: '#e67e22',
      pos: { left: '86.0%', top: '44.0%' },
      badge: 'SUSTAINABLE BUILT ENVIRONMENT',
      subtitle: 'Green Infrastructure & Smart Sprawl Control',
      quote: 'Urban planning guides development to protect surrounding prime agricultural soils and incorporates permeable surfaces.',
      points: [
        'Bioswales and permeable paving mitigate impervious urban stormwater runoff.',
        'Green corridors and urban forests reduce urban heat island temperature spikes.',
        'Transit-oriented density and brownfield remediation prevent sprawl over natural land forms.',
      ],
      img: '/images/cons-method-urban.jpg',
    },
  ];

  // 5 Key Methods for Conservation (Lower Left Panel)
  const conservationMethods = [
    {
      id: 'habitats',
      title: 'Protect Natural Habitats',
      sub: 'Conserve forests, grasslands and wetlands.',
      icon: Trees,
      color: '#5cb85c',
      img: '/images/cons-method-habitats.jpg',
      badge: 'CORE HABITAT ZONING',
      subtitle: 'Wilderness Preservation & Intact Ecosystems',
      quote: 'Designating protected nature reserves and ecological corridors guarantees the survival of intact biophysical systems.',
      points: [
        'Establishes strictly protected core wilderness zones with sustainable multi-use buffer borders.',
        'Prevents fragmentation by interconnecting fragmented forests, river corridors, and wetlands.',
        'Mandated in BCV755B notes as the primary pillar for landscape and biodiversity preservation.',
      ],
    },
    {
      id: 'landuse',
      title: 'Sustainable Land Use',
      sub: 'Balance development with conservation.',
      icon: Sprout,
      color: '#a2d242',
      img: '/images/cons-method-seedling.jpg',
      badge: 'LAND CAPABILITY CLASSIFICATION',
      subtitle: 'Balancing Human Activity & Ecology',
      quote: 'Land-use decisions must reflect natural carrying capacity and soil suitability, preventing overexploitation.',
      points: [
        'Allocates land based on scientific Land Capability Classification (LCC) criteria.',
        'Integrates agroforestry, silvopasture, and multi-tier cropping on agricultural lands.',
        'Balances human economic demands with ecological regeneration cycles.',
      ],
    },
    {
      id: 'degradation',
      title: 'Prevent Land Degradation',
      sub: 'Control soil erosion and maintain soil health.',
      icon: Mountain,
      color: '#f1cb74',
      img: '/images/cons-method-terraces.jpg',
      badge: 'EROSION & SOIL CONSERVATION',
      subtitle: 'Proactive Topsoil Protection',
      quote: 'Proactive soil conservation measures halt erosion before irreversible loss of topsoil horizons occurs.',
      points: [
        'Constructs contour bunds, bench terraces, and vegetative grass barriers on sloping terrain.',
        'Enforces rotational grazing to prevent pasture bare spots and subsequent gully formation.',
        'Re-establishes native ground cover on degraded hillsides to stabilize fragile topsoil.',
      ],
    },
    {
      id: 'biodiversity',
      title: 'Support Biodiversity',
      sub: 'Conserve habitats and wildlife corridors.',
      icon: Activity,
      color: '#e67e22',
      img: '/images/card-bio.jpg',
      badge: 'WILDLIFE CORRIDORS',
      subtitle: 'Ecological Connectivity & Fauna Corridors',
      quote: 'Landscape connectivity ensures species can migrate, forage, and maintain robust genetic diversity.',
      points: [
        'Preserves contiguous riparian buffer strips along rivers, preventing habitat isolation.',
        'Protects endangered keystone species that regulate ecological food webs.',
        'Restores native flora along cleared rights-of-way and agricultural field margins.',
      ],
    },
    {
      id: 'urban',
      title: 'Responsible Urban Planning',
      sub: 'Minimize habitat loss and restore green spaces.',
      icon: Building2,
      color: '#4fa3c7',
      img: '/images/cons-method-urban.jpg',
      badge: 'URBAN ECOLOGY & DENSITY',
      subtitle: 'Compact Cities & Permeable Infrastructure',
      quote: 'Compact cities integrated with nature minimize human footprint on the planet’s finite land surface.',
      points: [
        'Replaces impermeable concrete with porous drainage infrastructure and wetland retention parks.',
        'Mandates urban green belts that shield agricultural peripheries from speculative sprawl.',
        'Promotes vertical density, mixed-use zoning, and brownfield site redevelopment.',
      ],
    },
  ];

  // The Bigger Impact stats (Lower Right Panel)
  const impactStats = [
    {
      icon: Leaf,
      color: '#5cb85c',
      title: 'Healthier Ecosystems',
      desc: 'Thriving biodiversity and natural processes.',
    },
    {
      icon: Globe,
      color: '#4fa3c7',
      title: 'Climate Resilience',
      desc: 'Better adaptation to climate change.',
    },
    {
      icon: Users2,
      color: '#f1cb74',
      title: 'Sustainable Communities',
      desc: 'Food security, clean water and improved quality of life.',
    },
  ];

  return (
    <section className="land-screen land-conservation-screen" id="ch-conservation">
      {/* ─── Clean Panoramic Landscape Backdrop (No Baked-In Text) ─── */}
      <div
        className="cons-backdrop-photo"
        style={{ backgroundImage: `url('/images/conservation-hero-clean.jpg')` }}
      >
        <div className="cons-backdrop-scrim" />
      </div>

      {/* ─── 5 Interactive Pins Over Landscape Backdrop (Spanning full screen) ─── */}
      <div className="cons-pins-layer" aria-label="Interactive Conservation Actions">
        {conservationPins.map((pin) => {
          const Icon = pin.icon;
          const isHovered = hoveredPin === pin.id;
          const isSelected = activePin === pin.id;
          return (
            <div
              key={pin.id}
              className={`cons-map-pin ${isSelected ? 'is-pin-selected' : ''} ${isHovered ? 'is-pin-hovered' : ''}`}
              style={{
                left: pin.pos.left,
                top: pin.pos.top,
                '--pin-theme': pin.color,
              } as React.CSSProperties}
              onClick={() => {
                setActivePin(pin.id);
                setDetailModal(pin);
              }}
              onKeyDown={keyActivate(() => {
                setActivePin(pin.id);
                setDetailModal(pin);
              })}
              onMouseEnter={() => setHoveredPin(pin.id)}
              onMouseLeave={() => setHoveredPin(null)}
              role="button"
              tabIndex={0}
              title={pin.title}
            >
              {/* Glowing Target Anchor Dot on Landscape */}
              <div
                className="cons-pin-anchor-dot"
                style={{ background: pin.color }}
              />
              {/* Connecting Leader Line */}
              <div className="cons-pin-leader-line" />
              {/* Floating Glass Pill Badge with Icon + Title + Subtitle */}
              <div className="cons-pin-card-badge">
                <div className="cons-pin-badge-icon" style={{ color: pin.color }}>
                  <Icon size={15} strokeWidth={1.8} />
                </div>
                <div className="cons-pin-badge-texts">
                  <strong className="cons-pin-badge-title">{pin.title}</strong>
                  <span className="cons-pin-badge-sub">{pin.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="land-screen-inner cons-screen-content-inner">
        {/* ================================================================
            UPPER HERO STAGE: Title + Why Conservation Matters
           ================================================================ */}
        <div className="cons-upper-hero-stage">
          {/* Left Column: Heading + Lead + Why Conservation Matters */}
          <div className="cons-hero-left-col">
            <span className="screen-ch-tag">
              MODULE 01 <span>|</span> CHAPTER 08
            </span>

            <h2 className="screen-main-title cons-screen-headline">
              Conservation of <em className="cons-title-accent">Land Forms</em>
            </h2>

            <h3 className="cons-screen-subheadline">
              Protecting landscapes for a sustainable future.
            </h3>

            <p className="cons-screen-lead-copy">
              Land forms are valuable natural resources that support biodiversity, climate balance,
              water cycles, food production and human well-being. Conserving them ensures healthy
              ecosystems, resilient communities and a balanced planet for future generations.
            </p>

            {/* Why Conservation Matters Container */}
            <Reveal dir="up" className="cons-why-matters-card">
              <span className="cons-why-matters-label">Why Conservation Matters</span>
              <div className="cons-why-factors-grid">
                {whyFactors.map((f) => {
                  const Icon = f.icon;
                  return (
                    <TiltCard
                      key={f.id}
                      className="cons-why-factor-cell"
                      onClick={() => setDetailModal(f)}
                      onKeyDown={keyActivate(() => setDetailModal(f))}
                      role="button"
                      tabIndex={0}
                      title={`Inspect ${f.title}`}
                      spotlight
                      max={7}
                    >
                      <div className="cons-why-icon-wrap" style={{ color: f.color }}>
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="cons-why-text">
                        <strong className="cons-why-title">{f.title}</strong>
                        <span className="cons-why-sub">{f.sub}</span>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ================================================================
            LOWER SECTION: Two Panels (Key Methods + The Bigger Impact)
           ================================================================ */}
        <div className="cons-lower-split-row">
          {/* Panel 1: Key Methods for Conservation (Left ~70%) */}
          <Reveal dir="up" className="cons-methods-container-card">
            <div className="cons-methods-header">
              <h4 className="cons-panel-title">Key Methods for Conservation</h4>
              <p className="cons-panel-subtitle">
                Multiple approaches are needed to protect and sustainably manage different land forms.
              </p>
            </div>

            <div className="cons-methods-cards-track">
              {conservationMethods.map((m, idx) => {
                const Icon = m.icon;
                const isSelected = activeMethod === idx;
                return (
                  <TiltCard
                    key={m.id}
                    className={`cons-method-mini-card ${isSelected ? 'is-card-selected' : ''}`}
                    onClick={() => {
                      setActiveMethod(idx);
                      setDetailModal(m);
                    }}
                    onKeyDown={keyActivate(() => {
                      setActiveMethod(idx);
                      setDetailModal(m);
                    })}
                    role="button"
                    tabIndex={0}
                    title={m.title}
                    spotlight
                    max={6}
                  >
                    <div
                      className="cons-method-thumb kenburns-bg"
                      style={{ backgroundImage: `url('${m.img}')` }}
                    >
                      <div className="cons-method-thumb-overlay" />
                    </div>

                    <div className="cons-method-info">
                      <div className="cons-method-title-row">
                        <Icon size={14} style={{ color: m.color }} strokeWidth={2} />
                        <strong className="cons-method-name">{m.title}</strong>
                      </div>
                      <p className="cons-method-desc">{m.sub}</p>
                    </div>

                    <button
                      type="button"
                      className="cons-card-action-btn"
                      aria-label={`Open details for ${m.title}`}
                    >
                      <ArrowRight size={12} />
                    </button>
                  </TiltCard>
                );
              })}
            </div>
          </Reveal>

          {/* Panel 2: The Bigger Impact (Right ~30%) */}
          <Reveal dir="up" delay={120} className="cons-impact-container-card">
            <div className="cons-impact-header">
              <h4 className="cons-panel-title">The Bigger Impact</h4>
              <p className="cons-panel-subtitle">
                Conserving land forms helps build a more resilient and sustainable planet for current and future generations.
              </p>
            </div>

            <div className="cons-impact-body-layout">
              {/* 3 Impact Stats List */}
              <div className="cons-impact-list">
                {impactStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="cons-impact-item">
                      <div className="cons-impact-icon-wrap" style={{ color: stat.color, borderColor: stat.color }}>
                        <Icon size={14} strokeWidth={2} />
                      </div>
                      <div className="cons-impact-text">
                        <strong className="cons-impact-title">{stat.title}</strong>
                        <p className="cons-impact-sub">{stat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Glowing 3D Earth Globe on Right */}
              <div className="cons-impact-globe-pane">
                <div className="cons-globe-glow-wrap">
                  <img
                    src="/images/earth-resource-globe.jpg"
                    alt="Sustainable Earth"
                    className="cons-globe-image"
                  />
                  <div className="cons-globe-atmosphere-halo" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ================================================================
            BOTTOM NAVIGATION BAR (Previous: Land Forms | Pagination | Next: Deforestation)
           ================================================================ */}
        <div className="soil-bottom-navigation-bar cons-bottom-navigation-bar">
          <button type="button" className="soil-nav-btn prev-btn" onClick={onPrev}>
            <div className="nav-arrow-bead">
              <ArrowLeft size={14} />
            </div>
            <div className="nav-btn-copy">
              <span className="nav-action-label">Previous</span>
              <span className="nav-target-title">Land Forms</span>
            </div>
          </button>

          <div className="soil-pagination-dots-strip">
            <ChapterDots activeIndex={7} onJump={onJumpChapter} className="soil-pagination-dots-strip" />
          </div>

          <button type="button" className="soil-nav-btn next-btn is-gold-cta" onClick={onNext}>
            <div className="nav-btn-copy">
              <span className="nav-action-label">Next</span>
              <span className="nav-target-title">Deforestation</span>
            </div>
            <div className="nav-arrow-bead">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Detail Modal for Conservation */}
      {detailModal && (
        <div className="soil-detail-modal-overlay" onClick={() => setDetailModal(null)}>
          <div
            className="soil-detail-modal-card cons-modal-card"
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
              <h3 className="modal-headline-title">{detailModal.title}</h3>
              {detailModal.subtitle && (
                <p className="modal-sub-label">{detailModal.subtitle}</p>
              )}
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


// SCREEN 09: DEFORESTATION — PIXEL-PERFECT REPLICA (Matches User Mockup)
