import React, { useState } from 'react';
import {
  Droplets,
  CloudRain,
  Mountain,
  Leaf,
  Factory,
  Trees,
  TrendingDown,
  ChevronsDown,
  Layers,
  Waves,
  Quote,
  X,
  ArrowUpRight,
  Info,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import {
  GROUNDWATER_STRATA_PINS,
  GROUNDWATER_FORMATION_STEPS,
  GROUNDWATER_FACTORS,
  GROUNDWATER_USES,
  GroundwaterStrataPin,
} from './groundwaterData';
import { useModalScrollLock } from './useModalScrollLock';

export function GroundwaterScreen() {
  const [activePin, setActivePin] = useState<GroundwaterStrataPin | null>(null);
  const [hoveredPin, setHoveredPin] = useState<GroundwaterStrataPin | null>(null);
  const [selectedAquiferType, setSelectedAquiferType] = useState<'unconfined' | 'confined' | null>(null);
  const [selectedUse, setSelectedUse] = useState<typeof GROUNDWATER_USES[0] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Modal scroll lock
  useModalScrollLock(Boolean(selectedAquiferType || selectedUse), () => {
    setSelectedAquiferType(null);
    setSelectedUse(null);
  });

  const displayPin = hoveredPin || activePin;

  return (
    <section
      id="ch-09"
      className="chapter-section groundwater-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 10: Groundwater"
    >
      <div className="groundwater-container">
        {/* ─── TOP HEADER BAR ─── */}
        <header className="groundwater-header-row">
          <div className="groundwater-title-block">
            <span className="groundwater-chapter-tag">CHAPTER 10</span>
            <h1 className="groundwater-main-heading">
              Ground<span className="groundwater-heading-highlight">water</span>
            </h1>
            <p className="groundwater-header-description">
              Groundwater is water stored below the Earth's surface in the pores and cracks of soil, sand and rock.
              It is a vital and reliable source of fresh water for drinking, agriculture, industry and ecosystems.
            </p>
          </div>

          <aside className="groundwater-quote-card liquid-glass" aria-label="Expert insight">
            <div className="groundwater-quote-mark" aria-hidden="true">
              <Quote size={28} />
            </div>
            <blockquote className="groundwater-quote-text">
              “Groundwater is a hidden treasure — essential for life, agriculture and a resilient future.”
            </blockquote>
          </aside>
        </header>

        {/* ─── CENTER STAGE: 3D GEOLOGICAL CUTAWAY & INTERACTIVE PINS ─── */}
        <div className="groundwater-stage-wrapper liquid-glass">
          {/* 3D Cutaway Canvas Image */}
          <div className="groundwater-cutaway-viewport">
            <img
              src="/images/groundwater-hero-cutaway.jpg"
              alt="3D geological cutaway cross-section of groundwater strata, wells, and aquifers"
              className="groundwater-cutaway-image"
              loading="lazy"
            />

            {/* Left Strata Callout Badges with Lines */}
            <div className="groundwater-strata-overlay">
              <button
                type="button"
                className={`groundwater-strata-btn strata-soil ${
                  displayPin?.id === 'soil-layer' ? 'is-active-strata' : ''
                }`}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'soil-layer') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'soil-layer') || null)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <span className="strata-btn-title">Soil layer</span>
                <span className="strata-btn-sub">(unconfined)</span>
                <span className="strata-connector-line" />
              </button>

              <button
                type="button"
                className={`groundwater-strata-btn strata-table ${
                  displayPin?.id === 'water-table' ? 'is-active-strata' : ''
                }`}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'water-table') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'water-table') || null)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <span className="strata-btn-title">Water table</span>
                <span className="strata-btn-sub">(upper surface)</span>
                <span className="strata-connector-line" />
              </button>

              <button
                type="button"
                className={`groundwater-strata-btn strata-unconfined ${
                  displayPin?.id === 'unconfined-aquifer' ? 'is-active-strata' : ''
                }`}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'unconfined-aquifer') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'unconfined-aquifer') || null)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <span className="strata-btn-title">Unconfined aquifer</span>
                <span className="strata-btn-sub">(water table aquifer)</span>
                <span className="strata-connector-line" />
              </button>

              <button
                type="button"
                className={`groundwater-strata-btn strata-confining ${
                  displayPin?.id === 'confining-layer' ? 'is-active-strata' : ''
                }`}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'confining-layer') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'confining-layer') || null)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <span className="strata-btn-title">Confining layer</span>
                <span className="strata-btn-sub">(low permeability)</span>
                <span className="strata-connector-line" />
              </button>

              <button
                type="button"
                className={`groundwater-strata-btn strata-confined ${
                  displayPin?.id === 'confined-aquifer' ? 'is-active-strata' : ''
                }`}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'confined-aquifer') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'confined-aquifer') || null)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                <span className="strata-btn-title">Confined aquifer</span>
                <span className="strata-btn-sub">(under pressure)</span>
                <span className="strata-connector-line" />
              </button>
            </div>

            {/* Flow Dynamics SVG Vectors Overlay (1:1 with Reference Mockup) */}
            <svg
              className="groundwater-flow-vectors"
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="gwArrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker
                  id="gwArrowDbl"
                  viewBox="0 0 10 10"
                  refX="4"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 8 1 L 0 5 L 8 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Rain Infiltration downward arrows */}
              <line x1="335" y1="125" x2="335" y2="175" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#gwArrow)" className="flow-dash-anim" />
              <line x1="355" y1="130" x2="355" y2="185" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#gwArrow)" />
              <line x1="375" y1="125" x2="375" y2="175" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#gwArrow)" className="flow-dash-anim" />

              {/* Recharge downward percolation vector */}
              <line x1="520" y1="155" x2="520" y2="195" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#gwArrow)" />

              {/* Unconfined lateral aquifer gradient vector */}
              <path d="M 480 295 L 535 295" stroke="#38bdf8" strokeWidth="3.5" markerEnd="url(#gwArrow)" filter="drop-shadow(0 0 4px #38bdf8)" />

              {/* Well-Borewell hydraulic connection vector */}
              <line x1="615" y1="295" x2="685" y2="295" stroke="#38bdf8" strokeWidth="3" markerStart="url(#gwArrowDbl)" markerEnd="url(#gwArrow)" filter="drop-shadow(0 0 4px #38bdf8)" />

              {/* River seepage downward curve */}
              <path d="M 180 215 Q 170 240 175 260" fill="none" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#gwArrow)" />
            </svg>

            {/* Surface & Well Interactive Pins Overlay */}
            <div className="groundwater-surface-pins">
              {/* Infiltration Pin */}
              <div
                className="groundwater-pin pin-infiltration"
                style={{ left: '35%', top: '15%' }}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'rain-infiltrate') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'rain-infiltrate') || null)}
                onMouseLeave={() => setHoveredPin(null)}
                role="button"
                tabIndex={0}
              >
                <div className="groundwater-pin-badge">
                  <span>Infiltration from rainfall</span>
                </div>
                <div className="groundwater-pin-arrows">
                  <span className="arrow-drop">💧</span>
                  <span className="arrow-drop">💧</span>
                </div>
              </div>

              {/* Recharge Area Pin */}
              <div
                className="groundwater-pin pin-recharge"
                style={{ left: '52%', top: '24%' }}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'recharge-area') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'recharge-area') || null)}
                onMouseLeave={() => setHoveredPin(null)}
                role="button"
                tabIndex={0}
              >
                <div className="groundwater-pin-badge recharge-badge">
                  <span>Recharge</span>
                </div>
              </div>

              {/* Dug Well Pin */}
              <div
                className="groundwater-pin pin-well"
                style={{ left: '57%', top: '30%' }}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'dug-well') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'dug-well') || null)}
                onMouseLeave={() => setHoveredPin(null)}
                role="button"
                tabIndex={0}
              >
                <div className="groundwater-pin-badge well-badge">
                  <span>Well</span>
                </div>
              </div>

              {/* Deep Borewell Pin */}
              <div
                className="groundwater-pin pin-borewell"
                style={{ left: '77%', top: '29%' }}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'deep-borewell') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'deep-borewell') || null)}
                onMouseLeave={() => setHoveredPin(null)}
                role="button"
                tabIndex={0}
              >
                <div className="groundwater-pin-badge borewell-badge">
                  <span>Borewell</span>
                </div>
              </div>

              {/* River Seepage Pin */}
              <div
                className="groundwater-pin pin-river"
                style={{ left: '16%', top: '35%' }}
                onClick={() => setActivePin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'river-seepage') || null)}
                onMouseEnter={() => setHoveredPin(GROUNDWATER_STRATA_PINS.find((p) => p.id === 'river-seepage') || null)}
                onMouseLeave={() => setHoveredPin(null)}
                role="button"
                tabIndex={0}
              >
                <div className="groundwater-pin-badge river-badge">
                  <span>River (seepage)</span>
                </div>
              </div>
            </div>

            {/* Floating Active Strata / Pin Tooltip HUD */}
            {displayPin && (
              <div className="groundwater-pin-hud liquid-glass">
                <div className="pin-hud-header">
                  <span className="pin-hud-category">{displayPin.category.toUpperCase()}</span>
                  <button
                    type="button"
                    className="pin-hud-close"
                    onClick={() => {
                      setActivePin(null);
                      setHoveredPin(null);
                    }}
                    aria-label="Dismiss detail"
                  >
                    <X size={14} />
                  </button>
                </div>
                <h4 className="pin-hud-title">{displayPin.name}</h4>
                <p className="pin-hud-desc">{displayPin.detailedDesc}</p>
                <div className="pin-hud-specs">
                  <div>
                    <small>Permeability</small>
                    <strong>{displayPin.permeability}</strong>
                  </div>
                  <div>
                    <small>Porosity / Yield</small>
                    <strong>{displayPin.porosity}</strong>
                  </div>
                </div>
                <div className="pin-hud-fact">
                  <Info size={13} />
                  <span>{displayPin.keyFact}</span>
                </div>
              </div>
            )}

            {/* Floating Key Facts Card (Right Side of Stage) */}
            <aside className="groundwater-key-facts-card liquid-glass" aria-label="Key Groundwater Statistics">
              <h3 className="key-facts-title">Key Facts</h3>
              <div className="key-fact-row">
                <div className="key-fact-icon icon-cyan">
                  <Droplets size={20} />
                </div>
                <div className="key-fact-text">
                  <strong>~30%</strong>
                  <span>of global freshwater is groundwater</span>
                </div>
              </div>

              <div className="key-fact-row">
                <div className="key-fact-icon icon-blue">
                  <Layers size={20} />
                </div>
                <div className="key-fact-text">
                  <strong>2+ billion</strong>
                  <span>people depend on groundwater</span>
                </div>
              </div>

              <div className="key-fact-row">
                <div className="key-fact-icon icon-green">
                  <Leaf size={20} />
                </div>
                <div className="key-fact-text">
                  <strong>60–70%</strong>
                  <span>of irrigation in India uses groundwater</span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ─── BOTTOM ROW: 4 CARDS (Aquifers, Formation, Factors, Uses) ─── */}
        <div className="groundwater-bottom-grid">
          {/* Card 1: Types of Aquifers */}
          <div className="groundwater-glass-card card-aquifers">
            <div className="gw-card-header">
              <h2>Types of Aquifers</h2>
            </div>

            <div className="aquifer-subcards-wrap">
              {/* Unconfined Subcard */}
              <div
                className="aquifer-subcard"
                onClick={() => setSelectedAquiferType('unconfined')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedAquiferType('unconfined')}
              >
                <div className="aquifer-thumb-box">
                  <img
                    src="/images/aquifer-unconfined-cube.jpg"
                    alt="3D isometric unconfined aquifer cutaway block"
                    className="aquifer-cube-img"
                    loading="lazy"
                  />
                </div>
                <div className="aquifer-subcard-copy">
                  <h3>Unconfined Aquifer</h3>
                  <ul className="aquifer-bullets">
                    <li>Upper surface is a water table</li>
                    <li>Directly recharged by rainfall</li>
                    <li>More vulnerable to pollution</li>
                  </ul>
                  <span className="aquifer-view-link">
                    Explore Details <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              {/* Confined Subcard */}
              <div
                className="aquifer-subcard"
                onClick={() => setSelectedAquiferType('confined')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedAquiferType('confined')}
              >
                <div className="aquifer-thumb-box">
                  <img
                    src="/images/aquifer-confined-cube.jpg"
                    alt="3D isometric confined aquifer cutaway block"
                    className="aquifer-cube-img"
                    loading="lazy"
                  />
                </div>
                <div className="aquifer-subcard-copy">
                  <h3>Confined Aquifer</h3>
                  <ul className="aquifer-bullets">
                    <li>Sandwiched between impermeable layers</li>
                    <li>Water under pressure</li>
                    <li>Usually cleaner and protected</li>
                  </ul>
                  <span className="aquifer-view-link">
                    Explore Details <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: How Groundwater is Formed */}
          <div className="groundwater-glass-card card-formation">
            <div className="gw-card-header">
              <h2>How Groundwater is Formed</h2>
            </div>

            <div className="formation-steps-list">
              {GROUNDWATER_FORMATION_STEPS.map((s) => (
                <div
                  key={s.step}
                  className={`formation-step-row ${activeStep === s.step ? 'is-active-step' : ''}`}
                  onClick={() => setActiveStep(activeStep === s.step ? null : s.step)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveStep(activeStep === s.step ? null : s.step)}
                >
                  <div className="step-circle-num">{s.step}</div>
                  <div className="step-copy">
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Factors Affecting Groundwater */}
          <div className="groundwater-glass-card card-factors">
            <div className="gw-card-header">
              <h2>Factors Affecting Groundwater</h2>
            </div>

            <div className="factors-list">
              {GROUNDWATER_FACTORS.map((f) => (
                <div key={f.id} className="factor-row">
                  <div className="factor-icon-wrap">
                    {f.id === 'rainfall' && <CloudRain size={16} />}
                    {f.id === 'geology' && <Mountain size={16} />}
                    {f.id === 'land-use' && <Leaf size={16} />}
                    {f.id === 'topography' && <Trees size={16} />}
                    {f.id === 'human' && <Factory size={16} />}
                  </div>
                  <div className="factor-text">
                    <strong>{f.title}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Uses of Groundwater */}
          <div className="groundwater-glass-card card-uses">
            <div className="gw-card-header">
              <h2>Uses of Groundwater</h2>
            </div>

            <div className="uses-2x2-grid">
              {GROUNDWATER_USES.map((u) => (
                <div
                  key={u.id}
                  className="use-mini-card"
                  onClick={() => setSelectedUse(u)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedUse(u)}
                >
                  <div className="use-mini-img-wrap">
                    <img src={u.image} alt={u.title} className="use-mini-img" loading="lazy" />
                    <div className="use-mini-icon-badge">
                      {u.id === 'agri' && <Leaf size={14} />}
                      {u.id === 'domestic' && <Droplets size={14} />}
                      {u.id === 'industry' && <Factory size={14} />}
                      {u.id === 'ecosystem' && <Trees size={14} />}
                    </div>
                  </div>
                  <div className="use-mini-content">
                    <strong>{u.title}</strong>
                    <span>{u.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL: AQUIFER TYPE DEEP DIVE ─── */}
      {selectedAquiferType && (
        <div className="ilr-modal-backdrop" data-lenis-prevent onClick={() => setSelectedAquiferType(null)} role="dialog" aria-modal="true">
          <div className="ilr-modal-content liquid-glass" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ilr-modal-close-btn"
              onClick={() => setSelectedAquiferType(null)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="ilr-modal-body" data-lenis-prevent>
              <span className="ilr-modal-tag himalayan-pill">
                {selectedAquiferType === 'unconfined' ? 'Phreatic Aquifer' : 'Artesian Aquifer'}
              </span>
              <h3 className="ilr-modal-title">
                {selectedAquiferType === 'unconfined'
                  ? 'Unconfined Aquifer (Water Table Aquifer)'
                  : 'Confined Aquifer (Pressurized Artesian System)'}
              </h3>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                <img
                  src={
                    selectedAquiferType === 'unconfined'
                      ? '/images/aquifer-unconfined-cube.jpg'
                      : '/images/aquifer-confined-cube.jpg'
                  }
                  alt="Aquifer 3D block"
                  style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '14px' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                    {selectedAquiferType === 'unconfined'
                      ? 'An unconfined aquifer is directly open to the atmosphere through permeable soil. Its upper boundary is defined by the phreatic surface (water table), which fluctuates directly in response to seasonal rainfall infiltration and shallow pumping drafts.'
                      : 'A confined aquifer is trapped between two impermeable aquiclude or aquitard strata (dense clay, shale, or solid bedrock). Water within the aquifer is confined under hydrostatic pressure. When pierced by a well, water rises naturally toward the potentiometric piezometric head.'}
                  </p>
                </div>
              </div>

              <div className="ilr-facts-grid">
                <div className="ilr-fact-box">
                  <span>Recharge Mechanism</span>
                  <strong>{selectedAquiferType === 'unconfined' ? 'Direct Surface Infiltration' : 'Distant Recharge Outcrops'}</strong>
                  <small>{selectedAquiferType === 'unconfined' ? 'Rapid replenishment during monsoon' : 'May take decades to centuries to recharge'}</small>
                </div>

                <div className="ilr-fact-box">
                  <span>Piezometric Head</span>
                  <strong>{selectedAquiferType === 'unconfined' ? 'At Atmospheric Pressure' : 'Artesian Hydrostatic Pressure'}</strong>
                  <small>{selectedAquiferType === 'unconfined' ? 'Requires manual or shallow lift' : 'Can flow freely at surface in artesian wells'}</small>
                </div>

                <div className="ilr-fact-box">
                  <span>Contamination Vulnerability</span>
                  <strong>{selectedAquiferType === 'unconfined' ? 'High Vulnerability' : 'Protected Natural Barrier'}</strong>
                  <small>{selectedAquiferType === 'unconfined' ? 'Pesticides, septic leachates, and runoff' : 'Confining clay blocks surface pollutants'}</small>
                </div>

                <div className="ilr-fact-box">
                  <span>Indian Context</span>
                  <strong>{selectedAquiferType === 'unconfined' ? 'Alluvial Plains & Dug Wells' : 'Deep Fractured Peninsular Hard Rock'}</strong>
                  <small>{selectedAquiferType === 'unconfined' ? 'Tapped by millions of open rural wells' : 'Drilled deep via cased borewells (100–350 m)'}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: USE CASE STUDY DEEP DIVE ─── */}
      {selectedUse && (
        <div className="ilr-modal-backdrop" data-lenis-prevent onClick={() => setSelectedUse(null)} role="dialog" aria-modal="true">
          <div className="ilr-modal-content liquid-glass" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ilr-modal-close-btn"
              onClick={() => setSelectedUse(null)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="ilr-modal-body" data-lenis-prevent>
              <span className="ilr-modal-tag green-badge">{selectedUse.statLabel}</span>
              <h3 className="ilr-modal-title">
                {selectedUse.title} — {selectedUse.subtitle}
              </h3>
              <img src={selectedUse.image} alt={selectedUse.title} className="ilr-modal-banner" />
              <div className="ilr-modal-text">
                <p>{selectedUse.desc}</p>
                <div className="ilr-facts-grid">
                  <div className="ilr-fact-box">
                    <span>Key Share</span>
                    <strong>{selectedUse.stat}</strong>
                    <small>{selectedUse.statLabel}</small>
                  </div>
                  <div className="ilr-fact-box">
                    <span>Syllabus Chapter</span>
                    <strong>Part 9 & Part 10</strong>
                    <small>Conservation of Natural Resources BCV755B</small>
                  </div>
                </div>

                <h4 style={{ color: '#ffffff', margin: '18px 0 10px 0', fontSize: '1rem' }}>
                  Critical Management Considerations:
                </h4>
                <ul className="ilr-bullet-list">
                  {selectedUse.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
