import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowRight,
  ArrowLeft,
  Waves,
  Droplets,
  Droplet,
  Quote,
  X,
  Info,
  Factory,
  Compass,
  CloudRain,
  Layers,
  Sprout,
  Pipette,
  Building2,
  Trees,
  Shield,
  Activity,
  FileText,
  Gauge,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import {
  KEY_PROCESSES,
  CUTAWAY_INGRESS_POINTS,
  FACTORS_INFLUENCING_ITEMS,
  IMPACTS_ITEMS,
  COASTAL_RISK_STATES,
  MANAGEMENT_PREVENTION_ITEMS,
  KeyProcess,
  CutawayIngressPoint,
  IngressFactor,
  IngressImpact,
  CoastalStateRisk,
  IngressManagement,
} from './seawaterIngressData';
import { INDIA_STATE_POLYGONS, INDIA_FRONTIER_PATHS } from '../../data/indiaVectorMapData';

export function SeawaterIngressScreen() {
  const [selectedProcess, setSelectedProcess] = useState<KeyProcess | null>(null);
  const [activeCallout, setActiveCallout] = useState<CutawayIngressPoint | null>(null);
  const [selectedFactor, setSelectedFactor] = useState<IngressFactor | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<IngressImpact | null>(null);
  const [selectedState, setSelectedState] = useState<CoastalStateRisk | null>(null);
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);
  const [selectedManagement, setSelectedManagement] = useState<IngressManagement | null>(null);

  // Helper to determine coastal state map styling
  const getCoastalStateStyle = (pathId: string) => {
    const isGujarat = pathId.includes('Gujarat') || pathId.includes('3544_1_');
    const isMaharashtra = pathId.includes('Maharashtra');
    const isGoa = pathId.includes('Goa');
    const isKarnataka = pathId.includes('Karnataka');
    const isKerala = pathId.includes('Kerala');
    const isTamilNadu = pathId.includes('Tamil_Nadu') || pathId.includes('path80_1_');
    const isAndhra = pathId.includes('Andhra_Pradesh');
    const isOdisha = pathId.includes('Odisha') || pathId.includes('Orissa');
    const isBengal = pathId.includes('West_Bengal');

    let stateName: string | null = null;
    let riskLevel: 'high' | 'moderate' | 'low' | null = null;

    if (isGujarat) {
      stateName = 'Gujarat';
      riskLevel = 'high';
    } else if (isMaharashtra) {
      stateName = 'Maharashtra';
      riskLevel = 'high';
    } else if (isGoa) {
      stateName = 'Goa';
      riskLevel = 'moderate';
    } else if (isKarnataka) {
      stateName = 'Karnataka';
      riskLevel = 'moderate';
    } else if (isKerala) {
      stateName = 'Kerala';
      riskLevel = 'moderate';
    } else if (isTamilNadu) {
      stateName = 'Tamil Nadu';
      riskLevel = 'high';
    } else if (isAndhra) {
      stateName = 'Andhra Pradesh';
      riskLevel = 'moderate';
    } else if (isOdisha) {
      stateName = 'Odisha';
      riskLevel = 'moderate';
    } else if (isBengal) {
      stateName = 'West Bengal';
      riskLevel = 'low';
    }

    const isHovered = hoveredStateName === stateName;
    const isSelected = selectedState?.name === stateName;
    const isFocused = isHovered || isSelected;

    if (riskLevel === 'high') {
      return {
        fill: isFocused ? '#ff4d4d' : '#ef4444',
        opacity: isFocused ? 1 : 0.95,
        stroke: isFocused ? '#ffffff' : '#fecaca',
        strokeWidth: isFocused ? 3 : 1.8,
        filter: isFocused ? 'url(#coastal-red-glow)' : undefined,
        stateName,
      };
    }
    if (riskLevel === 'moderate') {
      return {
        fill: isFocused ? '#fb923c' : '#f97316',
        opacity: isFocused ? 1 : 0.95,
        stroke: isFocused ? '#ffffff' : '#fed7aa',
        strokeWidth: isFocused ? 3 : 1.8,
        filter: isFocused ? 'url(#coastal-orange-glow)' : undefined,
        stateName,
      };
    }
    if (riskLevel === 'low') {
      return {
        fill: isFocused ? '#38bdf8' : '#06b6d4',
        opacity: isFocused ? 1 : 0.92,
        stroke: isFocused ? '#ffffff' : '#cffafe',
        strokeWidth: isFocused ? 3 : 1.8,
        filter: isFocused ? 'url(#coastal-cyan-glow)' : undefined,
        stateName,
      };
    }

    // Default inland state fill: clear, warm, luminous sand/cream with clean boundaries
    return {
      fill: 'rgba(254, 240, 138, 0.72)',
      opacity: 0.88,
      stroke: 'rgba(255, 255, 255, 0.45)',
      strokeWidth: 1.1,
      filter: undefined,
      stateName: null,
    };
  };

  return (
    <section
      id="ch-16"
      className="water-seawater-ingress-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 17: Seawater Ingress"
    >
      <div className="water-seawater-ingress-inner">
        {/* ─── 1. PANORAMIC 3D CUTAWAY HERO STAGE ─── */}
        <div className="seawater-panoramic-stage" role="region" aria-label="3D Seawater Ingress Coastal Cutaway Model">
          {/* Crisp Master Cutaway Background Artwork */}
          <img
            src="/images/seawater-ingress-cutaway-bg.jpg"
            alt="3D geological cutaway illustrating coastal seawater ingress, red saltwater wedge intrusion, and extraction well cones of depression"
            className="seawater-panoramic-img"
            loading="eager"
          />

          {/* Cinematic Scrim Gradients for text contrast */}
          <div className="seawater-scrim-left" aria-hidden="true" />
          <div className="seawater-scrim-top" aria-hidden="true" />
          <div className="seawater-scrim-bottom" aria-hidden="true" />

          {/* Top-Left Header Block */}
          <header className="seawater-hero-header">
            <span className="seawater-chapter-tag">CHAPTER 17</span>
            <h1 className="seawater-main-title">
              Seawater <span className="seawater-glow-text">Ingress</span>
            </h1>
            <p className="seawater-header-desc">
              Seawater ingress is the movement of seawater into coastal aquifers, usually due to excessive
              groundwater extraction, leading to increased salinity and reduced freshwater availability in coastal
              regions.
            </p>
          </header>

          {/* Key Processes Card (Bottom-Left inside Hero Stage) */}
          <div className="seawater-hero-processes-card">
            <h3 className="seawater-processes-title">Key Processes</h3>
            <div className="seawater-processes-row">
              {KEY_PROCESSES.map((proc) => {
                const isSelected = selectedProcess?.id === proc.id;
                return (
                  <button
                    key={proc.id}
                    type="button"
                    className={`seawater-process-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedProcess(isSelected ? null : proc)}
                    aria-expanded={isSelected}
                    aria-label={`Process: ${proc.title}`}
                  >
                    <div
                      className="seawater-proc-icon-bubble"
                      style={{
                        backgroundColor: proc.bg,
                        borderColor: proc.color,
                        color: proc.color,
                      }}
                    >
                      {proc.iconName === 'ArrowDown' && <ArrowDown size={19} />}
                      {proc.iconName === 'Waves' && <Waves size={19} />}
                      {proc.iconName === 'Droplets' && <Droplets size={19} />}
                    </div>
                    <span className="seawater-proc-text">{proc.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Expanded Process Details Banner */}
            {selectedProcess && (
              <div className="seawater-proc-detail-banner animate-fade-in">
                <Info size={14} style={{ color: selectedProcess.color, flexShrink: 0, marginTop: 2 }} />
                <p>
                  <strong style={{ color: selectedProcess.color }}>{selectedProcess.title}:</strong>{' '}
                  {selectedProcess.detailedText}
                </p>
                <button
                  type="button"
                  className="seawater-close-mini-btn"
                  onClick={() => setSelectedProcess(null)}
                  aria-label="Close process detail"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Top-Right Quotation Card */}
          <aside className="seawater-hero-quote-card" aria-label="Expert insight on seawater ingress">
            <div className="seawater-quote-icon-bubble" aria-hidden="true">
              <Quote size={20} className="seawater-quote-icon" />
            </div>
            <blockquote className="seawater-quote-text">
              “Excessive groundwater extraction in coastal areas can lower the freshwater pressure, allowing seawater
              to move inland and contaminate coastal aquifers.”
            </blockquote>
          </aside>

          {/* ── Interactive Geological Cutaway Overlay Badges ── */}
          {/* 1. Sea Level (Ocean left) */}
          <div className="seawater-callout is-sealevel" style={{ left: '46.8%', top: '27.2%' }}>
            <button
              type="button"
              className="seawater-badge is-blue-pill"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_INGRESS_POINTS[0].id ? null : CUTAWAY_INGRESS_POINTS[0]
                )
              }
              aria-label="Callout: Sea Level Datum"
            >
              <span className="seawater-pulse-dot is-cyan-dot" />
              <span>Sea Level</span>
            </button>
            <div className="seawater-sea-pin-line" aria-hidden="true" />
          </div>

          {/* 2. Excessive Groundwater Extraction (Above coastal wells) */}
          <div className="seawater-callout is-extraction" style={{ left: '66.0%', top: '21.8%' }}>
            <button
              type="button"
              className="seawater-badge is-crimson-box"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_INGRESS_POINTS[1].id ? null : CUTAWAY_INGRESS_POINTS[1]
                )
              }
              aria-label="Callout: Excessive Groundwater Extraction"
            >
              <span className="seawater-pulse-glow is-crimson-glow" />
              <div className="seawater-extraction-title-wrap">
                <span className="seawater-badge-primary">Excessive</span>
                <span className="seawater-badge-secondary">Groundwater Extraction</span>
              </div>
            </button>
            {/* 3 Upward Extraction Pumping Arrows */}
            <div className="seawater-extraction-arrows-row" aria-hidden="true">
              <ArrowUp size={15} className="seawater-arrow-pump pump-1" />
              <ArrowUp size={15} className="seawater-arrow-pump pump-2" />
              <ArrowUp size={15} className="seawater-arrow-pump pump-3" />
            </div>
          </div>

          {/* 3. Seawater (higher salinity) */}
          <div className="seawater-callout is-salinewater" style={{ left: '48.0%', top: '51.5%' }}>
            <div className="seawater-wedge-flow-wrap">
              <button
                type="button"
                className="seawater-badge is-red-wedge"
                onClick={() =>
                  setActiveCallout(
                    activeCallout?.id === CUTAWAY_INGRESS_POINTS[2].id ? null : CUTAWAY_INGRESS_POINTS[2]
                  )
                }
                aria-label="Callout: Seawater High Salinity"
              >
                <span className="seawater-badge-primary">Seawater</span>
                <span className="seawater-badge-secondary">(higher salinity)</span>
              </button>
              <ArrowRight size={16} className="seawater-intrusion-arrow arrow-1" aria-hidden="true" />
            </div>
          </div>

          {/* 4. Saltwater Intrusion (saltwater wedge) */}
          <div className="seawater-callout is-intrusion-wedge" style={{ left: '64.0%', top: '52.0%' }}>
            <div className="seawater-wedge-flow-wrap">
              <button
                type="button"
                className="seawater-badge is-crimson-wedge"
                onClick={() =>
                  setActiveCallout(
                    activeCallout?.id === CUTAWAY_INGRESS_POINTS[3].id ? null : CUTAWAY_INGRESS_POINTS[3]
                  )
                }
                aria-label="Callout: Saltwater Intrusion Wedge"
              >
                <span className="seawater-badge-primary">Saltwater Intrusion</span>
                <span className="seawater-badge-secondary">(saltwater wedge)</span>
              </button>
              <ArrowRight size={16} className="seawater-intrusion-arrow arrow-2" aria-hidden="true" />
            </div>
          </div>

          {/* 5. Freshwater Zone (lower salinity) */}
          <div className="seawater-callout is-freshzone" style={{ left: '91.0%', top: '38.0%' }}>
            <button
              type="button"
              className="seawater-badge is-fresh-zone-box"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_INGRESS_POINTS[4].id ? null : CUTAWAY_INGRESS_POINTS[4]
                )
              }
              aria-label="Callout: Freshwater Zone"
            >
              <span className="seawater-badge-primary">Freshwater Zone</span>
              <span className="seawater-badge-secondary">(lower salinity)</span>
            </button>
          </div>

          {/* 6. Freshwater Aquifer (lower salinity) */}
          <div className="seawater-callout is-freshaquifer" style={{ left: '92.5%', top: '54.0%' }}>
            <div className="seawater-aquifer-flow-wrap">
              <ArrowLeft size={16} className="seawater-opposing-arrow" aria-hidden="true" />
              <button
                type="button"
                className="seawater-badge is-fresh-aquifer-box"
                onClick={() =>
                  setActiveCallout(
                    activeCallout?.id === CUTAWAY_INGRESS_POINTS[5].id ? null : CUTAWAY_INGRESS_POINTS[5]
                  )
                }
                aria-label="Callout: Freshwater Aquifer"
              >
                <span className="seawater-badge-primary">Freshwater Aquifer</span>
                <span className="seawater-badge-secondary">(lower salinity)</span>
              </button>
            </div>
          </div>

          {/* Floating Callout Popover */}
          {activeCallout && (
            <div
              className="seawater-callout-popup animate-scale-up"
              style={{
                left: `${Math.min(Math.max(activeCallout.pinX - 10, 18), 65)}%`,
                top: `${activeCallout.pinY > 38 ? activeCallout.pinY - 24 : activeCallout.pinY + 6}%`,
              }}
            >
              <div className="seawater-popup-header">
                <strong style={{ color: activeCallout.color }}>{activeCallout.title}</strong>
                <button
                  type="button"
                  className="seawater-close-mini-btn"
                  onClick={() => setActiveCallout(null)}
                  aria-label="Close callout info"
                >
                  <X size={13} />
                </button>
              </div>
              <p className="seawater-popup-desc">{activeCallout.description}</p>
              <div className="seawater-popup-spec-row">
                <span className="seawater-spec-label">Salinity Metric:</span>
                <span className="seawater-spec-val" style={{ color: '#ef4444' }}>
                  {activeCallout.salinityMetric}
                </span>
              </div>
              <div className="seawater-popup-spec-row">
                <span className="seawater-spec-label">Hydrogeology Spec:</span>
                <span className="seawater-spec-val">{activeCallout.hydrogeologySpec}</span>
              </div>
            </div>
          )}
        </div>

        {/* ─── 2. 4-CARD BOTTOM DOCK ─── */}
        <div className="seawater-dock-grid">
          {/* ── CARD 1: FACTORS INFLUENCING SEAWATER INGRESS ── */}
          <article className="seawater-dock-card is-factors-card" aria-label="Factors Influencing Seawater Ingress">
            <h2 className="seawater-dock-card-title">Factors Influencing Seawater Ingress</h2>

            <ul className="seawater-dock-card-list">
              {FACTORS_INFLUENCING_ITEMS.map((item) => {
                const isSelected = selectedFactor?.id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`seawater-dock-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedFactor(isSelected ? null : item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedFactor(isSelected ? null : item)}
                    aria-label={item.title}
                  >
                    <div
                      className="seawater-dock-icon-bubble"
                      style={{ backgroundColor: item.bg, color: item.color, borderColor: item.color }}
                    >
                      {item.iconName === 'Factory' && <Factory size={16} />}
                      {item.iconName === 'Compass' && <Compass size={16} />}
                      {item.iconName === 'CloudRain' && <CloudRain size={16} />}
                      {item.iconName === 'Waves' && <Waves size={16} />}
                      {item.iconName === 'Layers' && <Layers size={16} />}
                    </div>
                    <span className="seawater-dock-text">{item.title}</span>
                  </li>
                );
              })}
            </ul>

            {/* Selected Factor Drawer */}
            {selectedFactor && (
              <div className="seawater-dock-detail-panel animate-fade-in">
                <div className="seawater-dock-detail-header">
                  <strong style={{ color: selectedFactor.color }}>{selectedFactor.title}</strong>
                  <button
                    type="button"
                    className="seawater-close-mini-btn"
                    onClick={() => setSelectedFactor(null)}
                    aria-label="Close factor details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedFactor.detail}</p>
              </div>
            )}
          </article>

          {/* ── CARD 2: IMPACTS OF SEAWATER INGRESS ── */}
          <article className="seawater-dock-card is-impacts-card" aria-label="Impacts of Seawater Ingress">
            <h2 className="seawater-dock-card-title">Impacts of Seawater Ingress</h2>

            <ul className="seawater-dock-card-list">
              {IMPACTS_ITEMS.map((item) => {
                const isSelected = selectedImpact?.id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`seawater-dock-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedImpact(isSelected ? null : item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedImpact(isSelected ? null : item)}
                    aria-label={item.title}
                  >
                    <div
                      className="seawater-dock-icon-bubble"
                      style={{ backgroundColor: item.bg, color: item.color, borderColor: item.color }}
                    >
                      {item.iconName === 'Droplet' && <Droplet size={16} />}
                      {item.iconName === 'Sprout' && <Sprout size={16} />}
                      {item.iconName === 'Pipette' && <Pipette size={16} />}
                      {item.iconName === 'Building2' && <Building2 size={16} />}
                      {item.iconName === 'Trees' && <Trees size={16} />}
                    </div>
                    <span className="seawater-dock-text">{item.title}</span>
                  </li>
                );
              })}
            </ul>

            {/* Selected Impact Drawer */}
            {selectedImpact && (
              <div className="seawater-dock-detail-panel animate-fade-in">
                <div className="seawater-dock-detail-header">
                  <strong style={{ color: selectedImpact.color }}>{selectedImpact.title}</strong>
                  <button
                    type="button"
                    className="seawater-close-mini-btn"
                    onClick={() => setSelectedImpact(null)}
                    aria-label="Close impact details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedImpact.detail}</p>
              </div>
            )}
          </article>

          {/* ── CARD 3: REGIONS AT RISK IN INDIA ── */}
          <article className="seawater-dock-card is-regions-card" aria-label="Regions at Risk in India">
            <div className="seawater-regions-header-wrap">
              <h2 className="seawater-dock-card-title">Regions at Risk in India</h2>
              {/* Risk Legend */}
              <div className="seawater-map-legend" aria-label="Risk Severity Legend">
                <span className="seawater-legend-item">
                  <span className="seawater-legend-dot is-red" /> High Risk
                </span>
                <span className="seawater-legend-item">
                  <span className="seawater-legend-dot is-orange" /> Moderate Risk
                </span>
                <span className="seawater-legend-item">
                  <span className="seawater-legend-dot is-cyan" /> Low Risk
                </span>
              </div>
            </div>

            <div className="seawater-regions-body">
              {/* Left: Vector India Map with highlighted coastal states */}
              <div className="seawater-map-container">
                <svg
                  viewBox="20 0 1430 1560"
                  className="seawater-india-svg"
                  aria-label="India Map with Coastal Seawater Ingress Risk Zones"
                >
                  <defs>
                    <filter id="coastal-red-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#ef4444" floodOpacity="0.95" />
                    </filter>
                    <filter id="coastal-orange-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#f97316" floodOpacity="0.95" />
                    </filter>
                    <filter id="coastal-cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#06b6d4" floodOpacity="0.95" />
                    </filter>
                  </defs>

                  {/* Base State Boundaries */}
                  <g className="seawater-map-states-layer">
                    {/* Northern Frontier & Union Territories (Jammu & Kashmir, Ladakh, Arunachal) */}
                    {INDIA_FRONTIER_PATHS.map((p, idx) => (
                      <path
                        key={`seawater-map-frontier-${idx}`}
                        d={p.d}
                        fill="rgba(254, 240, 138, 0.72)"
                        fillOpacity={0.88}
                        stroke="rgba(255, 255, 255, 0.45)"
                        strokeWidth={1.1}
                        className="seawater-path-inland"
                      />
                    ))}

                    {INDIA_STATE_POLYGONS.map((p, idx) => {
                      const style = getCoastalStateStyle(p.id);
                      const isInteractive = Boolean(style.stateName);

                      return (
                        <path
                          key={`seawater-map-state-${idx}`}
                          d={p.d}
                          fill={style.fill}
                          fillOpacity={style.opacity}
                          stroke={style.stroke}
                          strokeWidth={style.strokeWidth}
                          filter={style.filter}
                          className={isInteractive ? 'seawater-path-interactive' : 'seawater-path-inland'}
                          onMouseEnter={() => style.stateName && setHoveredStateName(style.stateName)}
                          onMouseLeave={() => setHoveredStateName(null)}
                          onClick={() => {
                            if (style.stateName) {
                              const match = COASTAL_RISK_STATES.find((s) => s.name === style.stateName);
                              if (match) setSelectedState(selectedState?.name === style.stateName ? null : match);
                            }
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* Interactive Glowing Ranked Pins on the Map */}
                  <g className="seawater-map-pins-layer">
                    {COASTAL_RISK_STATES.map((state) => {
                      const isSelected = selectedState?.name === state.name;
                      const isHovered = hoveredStateName === state.name;
                      const isActive = isSelected || isHovered;

                      return (
                        <g
                          key={`seawater-pin-${state.name}`}
                          transform={`translate(${state.pinX}, ${state.pinY})`}
                          className={`seawater-svg-pin-group ${isActive ? 'is-active' : ''}`}
                          onMouseEnter={() => setHoveredStateName(state.name)}
                          onMouseLeave={() => setHoveredStateName(null)}
                          onClick={() => setSelectedState(isSelected ? null : state)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Animated Pulse Ring */}
                          <circle
                            r={isActive ? 32 : 22}
                            fill="none"
                            stroke={state.color}
                            strokeWidth={isActive ? '3' : '2'}
                            strokeOpacity={isActive ? '0.9' : '0.5'}
                            className="seawater-svg-pin-pulse"
                          />
                          {/* Pin Solid Center */}
                          <circle r={isActive ? 20 : 15} fill={state.color} stroke="#ffffff" strokeWidth="2.5" />
                          {/* Rank Digit */}
                          <text
                            y="5"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize={isActive ? '17' : '14'}
                            fontWeight="800"
                            fontFamily="system-ui, -apple-system, sans-serif"
                          >
                            {state.rank}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* Floating Rich Tooltip on Hover */}
                {hoveredStateName && (
                  <div className="seawater-map-hover-pill animate-fade-in">
                    <span className="seawater-hover-dot" />
                    <strong>{hoveredStateName}</strong>
                    <span className="seawater-hover-meta">
                      {COASTAL_RISK_STATES.find((s) => s.name === hoveredStateName)?.risk ?? ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Right: Numbered Ranked Coastal States List */}
              <div className="seawater-ranked-states-block">
                <h4 className="seawater-ranked-heading">Major Affected Coastal States</h4>
                <div className="seawater-ranked-states-list">
                  {COASTAL_RISK_STATES.map((state) => {
                    const isSelected = selectedState?.name === state.name;
                    const isHovered = hoveredStateName === state.name;
                    return (
                      <button
                        key={state.name}
                        type="button"
                        className={`seawater-ranked-state-row ${isSelected || isHovered ? 'is-active' : ''}`}
                        onClick={() => setSelectedState(isSelected ? null : state)}
                        onMouseEnter={() => setHoveredStateName(state.name)}
                        onMouseLeave={() => setHoveredStateName(null)}
                        aria-label={`State #${state.rank}: ${state.name} (${state.risk})`}
                      >
                        <span className="seawater-rank-badge" style={{ backgroundColor: state.color }}>
                          {state.rank}
                        </span>
                        <span className="seawater-state-name">{state.name}</span>
                        <span
                          className="seawater-state-risk-tag"
                          style={{
                            color: state.color,
                            marginLeft: 'auto',
                            fontSize: '0.64rem',
                            fontWeight: 700,
                          }}
                        >
                          {state.coastlineKm}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected State Insight Panel */}
            {selectedState && (
              <div className="seawater-state-detail-panel animate-fade-in">
                <div className="seawater-state-detail-header">
                  <strong>
                    #{selectedState.rank} {selectedState.name} ({selectedState.risk})
                  </strong>
                  <button
                    type="button"
                    className="seawater-close-mini-btn"
                    onClick={() => setSelectedState(null)}
                    aria-label="Close state details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="seawater-state-specs-grid">
                  <div>
                    <span className="seawater-spec-label">Coastline:</span> {selectedState.coastlineKm}
                  </div>
                  <div>
                    <span className="seawater-spec-label">Salinity:</span>{' '}
                    <span style={{ color: '#ef4444' }}>{selectedState.salinityPPM}</span>
                  </div>
                </div>
                <p className="seawater-state-hotspots">
                  <strong>Hotspots:</strong> {selectedState.hotspots}
                </p>
                <p className="seawater-state-desc">{selectedState.description}</p>
              </div>
            )}
          </article>

          {/* ── CARD 4: MANAGEMENT AND PREVENTION ── */}
          <article className="seawater-dock-card is-management-card" aria-label="Management and Prevention">
            <h2 className="seawater-dock-card-title">Management and Prevention</h2>

            <ul className="seawater-dock-card-list">
              {MANAGEMENT_PREVENTION_ITEMS.map((item) => {
                const isSelected = selectedManagement?.id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`seawater-dock-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedManagement(isSelected ? null : item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedManagement(isSelected ? null : item)}
                    aria-label={item.title}
                  >
                    <div
                      className="seawater-dock-icon-bubble"
                      style={{ backgroundColor: item.bg, color: item.color, borderColor: item.color }}
                    >
                      {item.iconName === 'Gauge' && <Gauge size={16} />}
                      {item.iconName === 'Layers' && <Layers size={16} />}
                      {item.iconName === 'Shield' && <Shield size={16} />}
                      {item.iconName === 'Activity' && <Activity size={16} />}
                      {item.iconName === 'Sprout' && <Sprout size={16} />}
                      {item.iconName === 'FileText' && <FileText size={16} />}
                    </div>
                    <span className="seawater-dock-text">{item.title}</span>
                  </li>
                );
              })}
            </ul>

            {/* Selected Management Drawer */}
            {selectedManagement && (
              <div className="seawater-dock-detail-panel animate-fade-in">
                <div className="seawater-dock-detail-header">
                  <strong style={{ color: selectedManagement.color }}>{selectedManagement.title}</strong>
                  <button
                    type="button"
                    className="seawater-close-mini-btn"
                    onClick={() => setSelectedManagement(null)}
                    aria-label="Close management details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedManagement.detail}</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
