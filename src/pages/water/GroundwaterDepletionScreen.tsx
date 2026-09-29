import React, { useState } from 'react';
import {
  Sprout,
  Building2,
  Sun,
  Droplets,
  Layers,
  Trees,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  Quote,
  X,
  Info,
  ChevronRight,
} from 'lucide-react';
import {
  DEPLETION_CAUSES,
  AFFECTED_STATES_DATA,
  DEPLETION_IMPACTS,
  DEPLETION_SOLUTIONS,
  CUTAWAY_CALLOUTS,
  DepletionCause,
  AffectedState,
  DepletionImpact,
  DepletionSolution,
  CutawayCallout,
} from './groundwaterDepletionData';
import { INDIA_STATE_POLYGONS, INDIA_FRONTIER_PATHS } from '../../data/indiaVectorMapData';

export function GroundwaterDepletionScreen() {
  const [selectedCause, setSelectedCause] = useState<DepletionCause | null>(null);
  const [selectedState, setSelectedState] = useState<AffectedState | null>(null);
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<DepletionImpact | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<DepletionSolution | null>(null);
  const [activeCallout, setActiveCallout] = useState<CutawayCallout | null>(null);
  const [hoveredTrendPoint, setHoveredTrendPoint] = useState<{ year: number; depth: number } | null>(null);

  // Helper to color map paths according to depletion severity
  const getStateFillAndOpacity = (pathId: string) => {
    // 1. High Depletion: Punjab, Haryana, Rajasthan, Delhi
    if (
      pathId.includes('Punjab') ||
      pathId.includes('Haryana') ||
      pathId.includes('Rajasthan') ||
      pathId.includes('Delhi')
    ) {
      const isSelected = selectedState && pathId.includes(selectedState.name.replace(' ', '_'));
      const isHovered = hoveredStateId && pathId.includes(hoveredStateId.replace(' ', '_'));
      const isActive = isSelected || isHovered;
      return {
        fill: isActive ? '#dc2626' : '#ef4444',
        opacity: isActive ? 1 : 0.95,
        stroke: isActive ? '#ffffff' : '#fecaca',
        strokeWidth: isActive ? 3.2 : 1.8,
        filter: isActive ? 'url(#gw-red-glow)' : undefined,
      };
    }

    // 2. Moderate: Uttar Pradesh, Gujarat (3544_1_)
    if (pathId.includes('Uttar_Pradesh') || pathId.includes('3544_1_')) {
      const isGujarat = pathId.includes('3544_1_');
      const isUP = pathId.includes('Uttar_Pradesh');
      const isSelected =
        selectedState &&
        ((isGujarat && selectedState.name === 'Gujarat') ||
          (isUP && selectedState.name === 'Uttar Pradesh'));
      const isHovered =
        hoveredStateId &&
        ((isGujarat && hoveredStateId === 'Gujarat') ||
          (isUP && hoveredStateId === 'Uttar Pradesh'));
      const isActive = isSelected || isHovered;
      return {
        fill: isActive ? '#ea580c' : '#f97316',
        opacity: isActive ? 1 : 0.92,
        stroke: isActive ? '#ffffff' : '#fed7aa',
        strokeWidth: isActive ? 3.2 : 1.8,
        filter: isActive ? 'url(#gw-orange-glow)' : undefined,
      };
    }

    // 3. Low Depletion (Rest of India): warm luminous sand/cream with clean boundaries
    return {
      fill: 'rgba(254, 240, 138, 0.72)',
      opacity: 0.88,
      stroke: 'rgba(255, 255, 255, 0.45)',
      strokeWidth: 1.1,
      filter: undefined,
    };
  };

  const getStateNameFromPath = (pathId: string): string | null => {
    if (pathId.includes('Punjab')) return 'Punjab';
    if (pathId.includes('Haryana')) return 'Haryana';
    if (pathId.includes('Rajasthan')) return 'Rajasthan';
    if (pathId.includes('Delhi')) return 'Delhi';
    if (pathId.includes('Uttar_Pradesh')) return 'Uttar Pradesh';
    if (pathId.includes('3544_1_')) return 'Gujarat';
    return null;
  };

  return (
    <section
      id="ch-13"
      className="water-gw-depletion-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 14: Groundwater Depletion"
    >
      <div className="water-gw-depletion-inner">
        {/* ─── 1. PANORAMIC 3D CUTAWAY HERO STAGE ─── */}
        <div className="gw-depletion-panoramic-stage">
          {/* Pristine Master Artwork Background */}
          <img
            src="/images/gw-depletion-cutaway-bg.jpg"
            alt="3D geological cutaway illustrating groundwater over-extraction, active borewells, and falling water table"
            className="gw-depletion-panoramic-img"
            loading="eager"
          />

          {/* Cinematic Scrim Gradients for text contrast */}
          <div className="gw-depletion-scrim-left" aria-hidden="true" />
          <div className="gw-depletion-scrim-top" aria-hidden="true" />
          <div className="gw-depletion-scrim-bottom" aria-hidden="true" />

          {/* Top-Left Header Block */}
          <header className="gw-depletion-hero-header">
            <span className="gw-depletion-chapter-tag">CHAPTER 14</span>
            <h1 className="gw-depletion-main-title">
              Groundwater <span className="gw-depletion-glow-text">Depletion</span>
            </h1>
            <p className="gw-depletion-header-desc">
              Groundwater depletion occurs when water is extracted from aquifers at a rate faster than it is
              naturally replenished, leading to a continuous decline in the water table and reduced availability
              of this vital resource.
            </p>
          </header>

          {/* Causes Card (Bottom-Left inside Panoramic Stage) */}
          <div className="gw-depletion-hero-causes-card">
            <h3 className="gw-depletion-causes-title">Key Causes of Groundwater Depletion</h3>
            <div className="gw-depletion-causes-row">
              {DEPLETION_CAUSES.map((cause) => {
                const isSelected = selectedCause?.id === cause.id;
                return (
                  <button
                    key={cause.id}
                    type="button"
                    className={`gw-cause-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedCause(isSelected ? null : cause)}
                    aria-expanded={isSelected}
                    aria-label={`Cause: ${cause.title}`}
                  >
                    <div
                      className="gw-cause-icon-bubble"
                      style={{
                        background: cause.bg,
                        borderColor: cause.color,
                        color: cause.color,
                      }}
                    >
                      {cause.iconName === 'Sprout' && <Sprout size={19} />}
                      {cause.iconName === 'Building2' && <Building2 size={19} />}
                      {cause.iconName === 'Sun' && <Sun size={19} />}
                      {cause.iconName === 'Droplets' && <Droplets size={19} />}
                    </div>
                    <span className="gw-cause-label">{cause.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Expanded Cause Details Banner */}
            {selectedCause && (
              <div className="gw-cause-detail-banner animate-fade-in">
                <Info size={14} style={{ color: selectedCause.color, flexShrink: 0, marginTop: 2 }} />
                <p>
                  <strong style={{ color: selectedCause.color }}>{selectedCause.title}:</strong> {selectedCause.detail}
                </p>
                <button
                  type="button"
                  className="gw-close-mini-btn"
                  onClick={() => setSelectedCause(null)}
                  aria-label="Close cause details"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Top-Right Quotation Card */}
          <aside className="gw-depletion-hero-quote-card" aria-label="Expert insight on groundwater balance">
            <div className="gw-quote-icon-bubble" aria-hidden="true">
              <Quote size={22} className="gw-quote-icon" />
            </div>
            <blockquote className="gw-quote-text">
              “When we take out more groundwater than nature can replenish, the water table falls, leading to long-term
              water stress and environmental problems.”
            </blockquote>
          </aside>

          {/* Center Callout: Excessive Extraction (Over Active Wells) */}
          <div className="gw-hero-callout is-extraction" style={{ left: '59.5%', top: '23%' }}>
            <button
              type="button"
              className="gw-hero-badge is-danger"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_CALLOUTS[0].id ? null : CUTAWAY_CALLOUTS[0]
                )
              }
              aria-label="Callout: Excessive Extraction"
            >
              <span className="gw-badge-pulse-glow" />
              <span className="gw-badge-label">{CUTAWAY_CALLOUTS[0].badgeText}</span>
              <span className="gw-pump-arrows">
                <ArrowUp size={13} className="gw-arrow-pump pump-1" />
                <ArrowUp size={13} className="gw-arrow-pump pump-2" />
              </span>
            </button>
          </div>

          {/* Center Callout: Falling Water Table */}
          <div className="gw-hero-callout is-watertable" style={{ left: '51%', top: '39%' }}>
            <button
              type="button"
              className="gw-hero-badge is-info"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_CALLOUTS[1].id ? null : CUTAWAY_CALLOUTS[1]
                )
              }
              aria-label="Callout: Falling Water Table"
            >
              <span className="gw-badge-pulse-glow is-cyan" />
              <span className="gw-badge-label">{CUTAWAY_CALLOUTS[1].badgeText}</span>
            </button>
            <div className="gw-pointer-line" aria-hidden="true" />
          </div>

          {/* Floating Callout Popup */}
          {activeCallout && (
            <div
              className={`gw-hero-popup animate-scale-up ${
                activeCallout.type === 'danger' ? 'is-danger' : 'is-info'
              }`}
              style={{
                left: `${Math.min(Math.max(activeCallout.pinX - 8, 15), 65)}%`,
                top: `${activeCallout.pinY + 8}%`,
              }}
            >
              <div className="gw-popup-header">
                <strong>{activeCallout.title}</strong>
                <button
                  type="button"
                  className="gw-close-mini-btn"
                  onClick={() => setActiveCallout(null)}
                  aria-label="Close callout info"
                >
                  <X size={13} />
                </button>
              </div>
              <p>{activeCallout.description}</p>
            </div>
          )}
        </div>

        {/* ─── 2. 4-CARD BOTTOM DOCK ─── */}
        <div className="gw-depletion-dock-grid">
          {/* ── CARD 1: STATES MOST AFFECTED IN INDIA ── */}
          <article className="gw-dock-card is-states-card" aria-label="States Most Affected in India">
            <h2 className="gw-dock-card-title">States Most Affected in India</h2>

            <div className="gw-states-card-body">
              {/* Left: Vector India Map with highlighted states and pins */}
              <div className="gw-mini-map-container">
                <svg
                  viewBox="20 0 1430 1560"
                  className="gw-mini-india-svg"
                  aria-label="India map showing groundwater depletion severity"
                >
                  <defs>
                    <filter id="gw-red-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#ef4444" floodOpacity="0.95" />
                    </filter>
                    <filter id="gw-orange-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#f97316" floodOpacity="0.95" />
                    </filter>
                    <filter id="gw-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.7" />
                    </filter>
                  </defs>

                  {/* Base State Boundaries */}
                  <g className="gw-map-states-layer">
                    {/* Disputed & Frontier Northern Territories (Jammu & Kashmir, Ladakh, Arunachal) */}
                    {INDIA_FRONTIER_PATHS.map((p, idx) => (
                      <path
                        key={`gw-map-frontier-${idx}`}
                        d={p.d}
                        fill="rgba(254, 240, 138, 0.72)"
                        fillOpacity={0.88}
                        stroke="rgba(255, 255, 255, 0.45)"
                        strokeWidth={1.1}
                        className="gw-map-path-base"
                      />
                    ))}

                    {INDIA_STATE_POLYGONS.map((p, idx) => {
                      const styleProps = getStateFillAndOpacity(p.id);
                      const stateName = getStateNameFromPath(p.id);
                      const isInteractive = Boolean(stateName);

                      return (
                        <path
                          key={`gw-map-state-${idx}`}
                          d={p.d}
                          fill={styleProps.fill}
                          fillOpacity={styleProps.opacity}
                          stroke={styleProps.stroke}
                          strokeWidth={styleProps.strokeWidth}
                          filter={styleProps.filter}
                          className={isInteractive ? 'gw-map-path-interactive' : 'gw-map-path-base'}
                          onMouseEnter={() => stateName && setHoveredStateId(stateName)}
                          onMouseLeave={() => setHoveredStateId(null)}
                          onClick={() => {
                            if (stateName) {
                              const stateObj = AFFECTED_STATES_DATA.find((s) => s.name === stateName);
                              if (stateObj) setSelectedState(selectedState?.name === stateName ? null : stateObj);
                            }
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* Interactive Glowing Ranked Pins on the Map */}
                  <g className="gw-map-pins-layer">
                    {AFFECTED_STATES_DATA.map((state) => {
                      const isSelected = selectedState?.name === state.name;
                      const isHovered = hoveredStateId === state.name;
                      const isActive = isSelected || isHovered;
                      const isHigh = state.severity === 'high';

                      return (
                        <g
                          key={`map-pin-${state.name}`}
                          transform={`translate(${state.pinX}, ${state.pinY})`}
                          className={`gw-svg-pin-group ${isActive ? 'is-active' : ''}`}
                          onMouseEnter={() => setHoveredStateId(state.name)}
                          onMouseLeave={() => setHoveredStateId(null)}
                          onClick={() => setSelectedState(isSelected ? null : state)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Animated Pulse Ring */}
                          <circle
                            r={isActive ? 30 : 20}
                            fill="none"
                            stroke={isHigh ? '#ef4444' : '#f97316'}
                            strokeWidth={isActive ? '3' : '2'}
                            strokeOpacity={isActive ? '0.9' : '0.5'}
                            className="gw-svg-pin-pulse"
                          />

                          {/* Pin Solid Center */}
                          <circle
                            r={isActive ? 20 : 15}
                            fill={isHigh ? '#ef4444' : '#f97316'}
                            stroke="#ffffff"
                            strokeWidth="2.5"
                            filter="url(#gw-pin-shadow)"
                          />

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
                {hoveredStateId && (
                  <div className="gw-map-hover-pill animate-fade-in">
                    <span className="gw-hover-dot" />
                    <strong>{hoveredStateId}</strong>
                    <span className="gw-hover-meta">
                      {AFFECTED_STATES_DATA.find((s) => s.name === hoveredStateId)?.extractionRate ?? ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Right: Legend & Ranked List */}
              <div className="gw-states-sidebar">
                {/* Legend */}
                <div className="gw-states-legend" aria-label="Map Legend">
                  <div className="gw-legend-item">
                    <span className="gw-legend-dot is-red" />
                    <span>High Depletion</span>
                  </div>
                  <div className="gw-legend-item">
                    <span className="gw-legend-dot is-orange" />
                    <span>Moderate</span>
                  </div>
                  <div className="gw-legend-item">
                    <span className="gw-legend-dot is-yellow" />
                    <span>Low</span>
                  </div>
                </div>

                {/* Numbered Ranked States */}
                <div className="gw-ranked-states-block">
                  <h4 className="gw-ranked-heading">Highly Affected States</h4>
                  <div className="gw-ranked-states-list">
                    {AFFECTED_STATES_DATA.map((state) => {
                      const isSelected = selectedState?.name === state.name;
                      const isHovered = hoveredStateId === state.name;
                      return (
                        <button
                          key={state.name}
                          type="button"
                          className={`gw-ranked-state-row ${isSelected || isHovered ? 'is-active' : ''}`}
                          onClick={() => setSelectedState(isSelected ? null : state)}
                          onMouseEnter={() => setHoveredStateId(state.name)}
                          onMouseLeave={() => setHoveredStateId(null)}
                          aria-label={`State #${state.rank}: ${state.name} (${state.severity})`}
                        >
                          <span
                            className="gw-rank-badge"
                            style={{
                              backgroundColor: state.severity === 'high' ? '#ef4444' : '#f97316',
                            }}
                          >
                            {state.rank}
                          </span>
                          <span className="gw-state-name">{state.name}</span>
                          <span className="gw-state-rate">{state.extractionRate}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected State Insight Panel */}
            {selectedState && (
              <div className="gw-state-detail-panel animate-fade-in">
                <div className="gw-state-detail-header">
                  <strong>
                    #{selectedState.rank} {selectedState.name} — Extraction Rate: {selectedState.extractionRate}
                  </strong>
                  <button
                    type="button"
                    className="gw-close-mini-btn"
                    onClick={() => setSelectedState(null)}
                    aria-label="Close state detail"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedState.details}</p>
              </div>
            )}
          </article>

          {/* ── CARD 2: TREND IN GROUNDWATER LEVELS ── */}
          <article className="gw-dock-card is-trend-card" aria-label="Trend in Groundwater Levels">
            <h2 className="gw-dock-card-title">Trend in Groundwater Levels</h2>

            <div className="gw-trend-chart-area">
              {/* SVG Decline Line Chart */}
              <div className="gw-trend-svg-wrap">
                <svg
                  viewBox="0 0 420 180"
                  className="gw-trend-svg"
                  aria-label="Decline in water table depth line chart"
                >
                  <defs>
                    <linearGradient id="gw-decline-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>
                    <filter id="gw-node-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f87171" floodOpacity="0.9" />
                    </filter>
                  </defs>

                  {/* Y-Axis Label (Rotated) */}
                  <text
                    x="-90"
                    y="14"
                    transform="rotate(-90)"
                    className="gw-svg-axis-label"
                    textAnchor="middle"
                  >
                    Water Table Depth (m below ground level)
                  </text>

                  {/* Horizontal Gridlines & Y-Axis Ticks (0, 10, 20, 30, 40) */}
                  {[
                    { val: 0, y: 22 },
                    { val: 10, y: 56 },
                    { val: 20, y: 90 },
                    { val: 30, y: 124 },
                    { val: 40, y: 158 },
                  ].map((tick) => (
                    <g key={`ytick-${tick.val}`}>
                      <text x="32" y={tick.y + 4} className="gw-svg-tick-label" textAnchor="end">
                        {tick.val}
                      </text>
                      <line
                        x1="40"
                        y1={tick.y}
                        x2="400"
                        y2={tick.y}
                        stroke="rgba(127, 208, 224, 0.14)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                    </g>
                  ))}

                  {/* Chart Area Gradient Fill */}
                  <path
                    d="M 52,38 L 105,55 L 160,74 L 215,94 L 270,113 L 325,132 L 380,152 L 380,158 L 52,158 Z"
                    fill="url(#gw-decline-area-grad)"
                  />

                  {/* Downward Sloping Red Trend Line */}
                  <path
                    d="M 52,38 L 105,55 L 160,74 L 215,94 L 270,113 L 325,132 L 380,152"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points (Glowing Nodes) */}
                  {[
                    { x: 52, y: 38, year: 2010, depth: 4.5 },
                    { x: 105, y: 55, year: 2012, depth: 9.8 },
                    { x: 160, y: 74, year: 2014, depth: 15.4 },
                    { x: 215, y: 94, year: 2016, depth: 21.2 },
                    { x: 270, y: 113, year: 2018, depth: 27.0 },
                    { x: 325, y: 132, year: 2020, depth: 32.6 },
                    { x: 380, y: 152, year: 2022, depth: 38.5 },
                  ].map((pt) => {
                    const isHovered = hoveredTrendPoint?.year === pt.year;
                    return (
                      <g key={`pt-${pt.year}`}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 6 : 4}
                          fill="#ffffff"
                          stroke="#ef4444"
                          strokeWidth="2"
                          filter="url(#gw-node-glow)"
                          className="gw-trend-node"
                          onMouseEnter={() => setHoveredTrendPoint({ year: pt.year, depth: pt.depth })}
                          onMouseLeave={() => setHoveredTrendPoint(null)}
                        />
                        <text x={pt.x} y="174" className="gw-svg-year-label" textAnchor="middle">
                          {pt.year}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Pill on the Trend Graph */}
                <div className="gw-trend-floating-callout" aria-hidden="true">
                  <span>Continuous decline in water table levels</span>
                </div>

                {/* Tooltip on hovering data point */}
                {hoveredTrendPoint && (
                  <div className="gw-trend-tooltip-badge">
                    <strong>{hoveredTrendPoint.year}:</strong> {hoveredTrendPoint.depth}m below surface
                  </div>
                )}
              </div>

              {/* Bottom Alert Callout inside Card 2 */}
              <div className="gw-trend-alert-banner" role="alert">
                <div className="gw-trend-alert-icon-wrap" aria-hidden="true">
                  <AlertCircle size={17} className="gw-alert-icon" />
                </div>
                <p className="gw-trend-alert-text">
                  In many regions, groundwater levels have been declining by <strong>0.3 – 1.0 meters per year</strong>.
                </p>
              </div>
            </div>
          </article>

          {/* ── CARD 3: IMPACTS OF DEPLETION ── */}
          <article className="gw-dock-card is-impacts-card" aria-label="Impacts of Depletion">
            <h2 className="gw-dock-card-title">Impacts of Depletion</h2>

            <div className="gw-impacts-grid">
              {DEPLETION_IMPACTS.map((impact) => {
                const isSelected = selectedImpact?.id === impact.id;
                return (
                  <div
                    key={impact.id}
                    className={`gw-impact-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedImpact(isSelected ? null : impact)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedImpact(isSelected ? null : impact)}
                    aria-label={impact.title}
                  >
                    <div
                      className="gw-impact-icon-bubble"
                      style={{
                        backgroundColor: impact.bg,
                        borderColor: impact.color,
                        color: impact.color,
                      }}
                    >
                      {impact.iconName === 'Droplets' && <Droplets size={16} />}
                      {impact.iconName === 'Sprout' && <Sprout size={16} />}
                      {impact.iconName === 'Layers' && <Layers size={16} />}
                      {impact.iconName === 'Trees' && <Trees size={16} />}
                      {impact.iconName === 'TrendingUp' && <TrendingUp size={16} />}
                      {impact.iconName === 'Users' && <Users size={16} />}
                    </div>
                    <span className="gw-impact-label">{impact.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Interactive Impact Detail Drawer */}
            {selectedImpact && (
              <div className="gw-impact-detail-panel animate-fade-in">
                <div className="gw-impact-detail-header">
                  <strong style={{ color: selectedImpact.color }}>{selectedImpact.title}</strong>
                  <button
                    type="button"
                    className="gw-close-mini-btn"
                    onClick={() => setSelectedImpact(null)}
                    aria-label="Close impact detail"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedImpact.detail}</p>
              </div>
            )}
          </article>

          {/* ── CARD 4: SOLUTIONS AND WAY FORWARD ── */}
          <article className="gw-dock-card is-solutions-card" aria-label="Solutions and Way Forward">
            <h2 className="gw-dock-card-title">Solutions and Way Forward</h2>

            <ul className="gw-solutions-checklist">
              {DEPLETION_SOLUTIONS.map((sol) => {
                const isSelected = selectedSolution?.id === sol.id;
                return (
                  <li
                    key={sol.id}
                    className={`gw-solution-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedSolution(isSelected ? null : sol)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedSolution(isSelected ? null : sol)}
                    aria-label={sol.text}
                  >
                    <div className="gw-solution-check-wrap" aria-hidden="true">
                      <CheckCircle2 size={17} className="gw-solution-check-icon" />
                    </div>
                    <span className="gw-solution-text">{sol.text}</span>
                    <ChevronRight size={13} className="gw-solution-chevron" />
                  </li>
                );
              })}
            </ul>

            {/* Interactive Solution Detail Drawer */}
            {selectedSolution && (
              <div className="gw-solution-detail-panel animate-fade-in">
                <div className="gw-solution-detail-header">
                  <strong>Solution Action Plan</strong>
                  <button
                    type="button"
                    className="gw-close-mini-btn"
                    onClick={() => setSelectedSolution(null)}
                    aria-label="Close solution detail"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedSolution.detail}</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
