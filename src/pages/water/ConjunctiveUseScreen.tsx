import React, { useState, useId } from 'react';
import {
  Waves,
  Droplet,
  Droplets,
  Scale,
  Sun,
  CloudRain,
  Check,
  CheckCircle2,
  X,
  Sprout,
  Building2,
  Factory,
  Home,
  ClipboardList,
  Activity,
  Users,
  Trees,
  DollarSign,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  Maximize2,
  Sliders,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  CALLOUT_POINTS,
  MONTHLY_HYDROLOGY,
  WHY_CONJUNCTIVE_POINTS,
  BENEFITS_LIST,
  KEY_CONSIDERATIONS,
  type CalloutPoint,
} from './conjunctiveUseData';
import { useModalScrollLock } from './useModalScrollLock';

export function ConjunctiveUseScreen() {
  const reactId = useId();
  // State for interactive Balance Planner sliders (defaults to 60% surface, 40% GW as shown in reference)
  const [surfaceUse, setSurfaceUse] = useState<number>(60);
  const gwUse = 100 - surfaceUse;

  // Selected callout for the detailed modal
  const [selectedCallout, setSelectedCallout] = useState<CalloutPoint | null>(null);

  // Lock scroll, pause Lenis and ensure smooth wheel scrolling inside modal
  useModalScrollLock(Boolean(selectedCallout), () => setSelectedCallout(null));

  // Active month hovered or clicked on the hydrograph
  const [activeMonthIdx, setActiveMonthIdx] = useState<number | null>(null);

  // Helper to get status badge text based on ratio
  const getBalanceStatus = (surface: number) => {
    if (surface >= 75) {
      return {
        label: 'Monsoon Recharge Surplus',
        desc: 'Canals run full. Groundwater pumps idle, allowing dynamic aquifer replenishment and water table recovery.',
        color: '#38bdf8',
        badgeClass: 'status-surplus',
      };
    } else if (surface <= 25) {
      return {
        label: 'Dry Season Aquifer Reliance',
        desc: 'Surface rivers drop to baseflow. Deep borewells sustain agricultural crops and municipal grids.',
        color: '#eab308',
        badgeClass: 'status-depletion-risk',
      };
    } else if (surface >= 50 && surface <= 65) {
      return {
        label: 'Optimal Conjunctive Equilibrium',
        desc: 'Ideal sustainable balance: surface water meets peak demand while sub-surface storage prevents waterlogging and salinity.',
        color: '#22c55e',
        badgeClass: 'status-optimal',
      };
    } else {
      return {
        label: 'Moderate Seasonal Transition',
        desc: 'Mixed conjunctive allocation balancing canal turns with localized farm tube-well pumping.',
        color: '#818cf8',
        badgeClass: 'status-moderate',
      };
    }
  };

  const status = getBalanceStatus(surfaceUse);

  const handleSurfaceSlider = (val: number) => {
    setSurfaceUse(val);
  };

  const handleGwSlider = (val: number) => {
    setSurfaceUse(100 - val);
  };

  // Icon mapping helper
  const renderIcon = (name: string, className = 'w-5 h-5') => {
    switch (name) {
      case 'Waves':
        return <Waves className={className} />;
      case 'Droplet':
        return <Droplet className={className} />;
      case 'Droplets':
        return <Droplets className={className} />;
      case 'Sprout':
        return <Sprout className={className} />;
      case 'Home':
        return <Home className={className} />;
      case 'Factory':
        return <Factory className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'ClipboardList':
        return <ClipboardList className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'TreePine':
      case 'Trees':
        return <Trees className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'DollarSign':
        return <DollarSign className={className} />;
      default:
        return <Droplets className={className} />;
    }
  };

  // Hydrograph SVG coordinates calculation
  const chartWidth = 480;
  const chartHeight = 110;
  const paddingX = 24;
  const paddingY = 16;
  const graphWidth = chartWidth - paddingX * 2;
  const graphHeight = chartHeight - paddingY * 2;

  const pointsCount = MONTHLY_HYDROLOGY.length;
  const getX = (idx: number) => paddingX + (idx / (pointsCount - 1)) * graphWidth;
  const getY = (pct: number) => chartHeight - paddingY - (pct / 100) * graphHeight;

  // Surface path
  const surfacePoints = MONTHLY_HYDROLOGY.map((d, i) => `${getX(i)},${getY(d.surfacePct)}`);
  const surfacePath = `M ${surfacePoints.join(' L ')}`;
  const surfaceAreaPath = `${surfacePath} L ${getX(pointsCount - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`;

  // GW path
  const gwPoints = MONTHLY_HYDROLOGY.map((d, i) => `${getX(i)},${getY(d.gwPct)}`);
  const gwPath = `M ${gwPoints.join(' L ')}`;
  const gwAreaPath = `${gwPath} L ${getX(pointsCount - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`;

  return (
    <section
      id="ch-11"
      className="water-conjunctive-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 12: Conjunctive Use of Water"
    >
      <div className="water-conjunctive-inner">
        {/* ─── TOP HEADER ROW ─── */}
        <header className="conjunctive-header-row">
          <div className="conjunctive-title-col">
            <div className="conjunctive-chapter-kicker">
              <span className="kicker-tag">CHAPTER 12</span>
              <span className="kicker-dot">•</span>
              <span className="kicker-sub">WATER RESOURCE HARMONIZATION</span>
            </div>
            <h1 className="conjunctive-main-title">
              Conjunctive <span className="title-gradient">Use of Water</span>
            </h1>
            <p className="conjunctive-deck">
              Conjunctive use is the integrated and coordinated use of surface water and groundwater
              to maximize water availability, improve reliability, and ensure sustainable water
              resource management.
            </p>
          </div>

          <aside className="conjunctive-quote-col" aria-label="Key hydrological principle">
            <div className="conjunctive-quote-card liquid-glass">
              <span className="quote-mark" aria-hidden="true">“</span>
              <p className="quote-text">
                Using surface water and groundwater together helps to overcome the limitations
                of each source and ensures a more reliable and sustainable water supply.
              </p>
            </div>
          </aside>
        </header>

        {/* ─── MAIN STAGE: 3D HYDROGEOLOGICAL CUTAWAY & INTERACTIVE PLANNER ─── */}
        <div className="conjunctive-stage-wrapper">
          {/* Visual Canvas with crisp generated 3D cutaway */}
          <div className="conjunctive-stage-canvas">
            <img
              src="/images/water-ch12-conjunctive-master.jpg"
              alt="Conjunctive use of water 3D geological cutaway showing canal, irrigation, village domestic supply, industrial connection, and groundwater aquifers"
              className="conjunctive-stage-img"
              loading="eager"
            />

            {/* Geological Subsurface Flow Vectors (SVG overlay) */}
            <svg
              className="conjunctive-vector-overlay"
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="rechargeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="baseflowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                </linearGradient>
                <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Animated Recharge Downward Arrows (from canal to unconfined aquifer) */}
              <g
                className="recharge-arrow-group"
                style={{ opacity: 0.35 + (surfaceUse / 100) * 0.65 }}
              >
                <path
                  d="M 540 280 L 540 355 M 534 348 L 540 357 L 546 348"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#vectorGlow)"
                  className="anim-pulse-vector"
                />
                <path
                  d="M 575 285 L 575 360 M 569 353 L 575 362 L 581 353"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#vectorGlow)"
                  className="anim-pulse-vector delay-1"
                />
                <path
                  d="M 610 290 L 610 365 M 604 358 L 610 367 L 616 358"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#vectorGlow)"
                  className="anim-pulse-vector delay-2"
                />
              </g>

              {/* Horizontal Aquifer Base-flow Support Arrows */}
              <g
                className="baseflow-arrow-group"
                style={{ opacity: 0.4 + (gwUse / 100) * 0.6 }}
              >
                <path
                  d="M 600 415 L 710 415 M 702 409 L 712 415 L 702 421"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#vectorGlow)"
                  className="anim-flow-h"
                />
                <path
                  d="M 730 415 L 800 415 M 792 409 L 802 415 L 792 421"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#vectorGlow)"
                  className="anim-flow-h delay-1"
                />
              </g>
            </svg>

            {/* Geological Annotation Labels (matching user reference mockup) */}
            <div className="flow-label recharge-label" style={{ left: '57%', top: '60%' }}>
              <span className="flow-label-text">Recharge from surface water</span>
            </div>

            <div className="flow-label baseflow-label" style={{ left: '69%', top: '69%' }}>
              <span className="flow-label-text">Groundwater supports surface water during dry periods</span>
            </div>

            {/* 5 Interactive Callout Badges on the Cutaway */}
            {CALLOUT_POINTS.map((pt) => {
              const isSelected = selectedCallout?.id === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  className={`conjunctive-callout-pill ${isSelected ? 'is-active' : ''} pill-${pt.id}`}
                  style={{ left: `${pt.pinX}%`, top: `${pt.pinY}%` }}
                  onClick={() => setSelectedCallout(pt)}
                  title={`Click to explore ${pt.title}`}
                  aria-label={`${pt.badgeText}: click for details`}
                >
                  <span className="pill-dot" style={{ backgroundColor: pt.badgeColor }} />
                  <span className="pill-icon">{renderIcon(pt.iconName, 'w-3.5 h-3.5')}</span>
                  <span className="pill-text">{pt.badgeText}</span>
                  <span className="pill-pulse" />
                </button>
              );
            })}

            {/* OVERLAID BALANCE PLANNER CARD (Left Column) */}
            <div className="balance-planner-card liquid-glass">
              <div className="planner-header">
                <span className="planner-icon-wrap">
                  <Scale className="w-5 h-5 text-sky-400" />
                </span>
                <div className="planner-title-block">
                  <h3 className="planner-title">Balance Planner (Interactive)</h3>
                </div>
              </div>

              {/* Slider 1: Surface Water Use */}
              <div className="slider-row">
                <div className="slider-label-row">
                  <span className="slider-icon-name text-sky-300">
                    <span className="slider-icon-circle bg-sky-500/20 text-sky-400">
                      <Waves className="w-3.5 h-3.5" />
                    </span>
                    <span>Surface Water Use</span>
                  </span>
                  <strong className="slider-val text-white">{surfaceUse}%</strong>
                </div>
                <div className="slider-track-wrap">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={surfaceUse}
                    onChange={(e) => handleSurfaceSlider(Number(e.target.value))}
                    className="water-range-slider slider-cyan"
                    aria-label="Surface Water Use Percentage"
                  />
                </div>
              </div>

              {/* Slider 2: Groundwater Use */}
              <div className="slider-row">
                <div className="slider-label-row">
                  <span className="slider-icon-name text-emerald-400">
                    <span className="slider-icon-circle bg-emerald-500/20 text-emerald-400">
                      <Droplet className="w-3.5 h-3.5" />
                    </span>
                    <span>Groundwater Use</span>
                  </span>
                  <strong className="slider-val text-white">{gwUse}%</strong>
                </div>
                <div className="slider-track-wrap">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={gwUse}
                    onChange={(e) => handleGwSlider(Number(e.target.value))}
                    className="water-range-slider slider-green"
                    aria-label="Groundwater Use Percentage"
                  />
                </div>
              </div>

              {/* Balance Feedback Box (1:1 with user mockup) */}
              <div className="planner-feedback-box">
                <div className="feedback-content">
                  <div className="feedback-icon-circle">
                    <Scale className="w-4 h-4 text-sky-300" />
                  </div>
                  <p className="feedback-desc">
                    Adjust the sliders to see how conjunctive use helps maintain a sustainable
                    balance between surface water and groundwater.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM ROW: 4 GLASSMORPHIC CARDS ─── */}
        <div className="conjunctive-bottom-grid">
          {/* CARD 1: Why Conjunctive Use? */}
          <article className="glass-feature-card card-why">
            <div className="feature-card-header">
              <h3 className="feature-card-title">Why Conjunctive Use?</h3>
            </div>
            <ul className="why-list">
              {WHY_CONJUNCTIVE_POINTS.map((item) => (
                <li key={item.id} className="why-list-item" title={item.detail}>
                  <span
                    className="why-item-icon-circle"
                    style={{ color: item.accentColor, borderColor: `${item.accentColor}33` }}
                  >
                    {renderIcon(item.iconName, 'w-4 h-4')}
                  </span>
                  <span className="why-item-text">{item.title}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* CARD 2: Seasonal Operation */}
          <article className="glass-feature-card card-seasonal">
            <div className="feature-card-header">
              <h3 className="feature-card-title">Seasonal Operation</h3>
            </div>

            <div className="seasonal-subheaders">
              <div className="season-badge monsoon-badge">
                <CloudRain className="w-4 h-4 text-sky-400" />
                <div className="badge-text-block">
                  <span className="badge-title">Monsoon Season</span>
                  <span className="badge-note">(High Surface Water)</span>
                </div>
              </div>
              <div className="season-badge dry-badge">
                <Sun className="w-4 h-4 text-amber-400" />
                <div className="badge-text-block">
                  <span className="badge-title">Dry Season</span>
                  <span className="badge-note">(Low Surface Water)</span>
                </div>
              </div>
            </div>

            {/* Interactive Hydrograph Dual Area Curve */}
            <div className="hydrograph-wrapper">
              <svg
                className="hydrograph-svg"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id={`surfaceAreaGrad-${reactId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.03" />
                  </linearGradient>
                  <linearGradient id={`gwAreaGrad-${reactId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.03" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line
                  x1={paddingX}
                  y1={chartHeight - paddingY}
                  x2={chartWidth - paddingX}
                  y2={chartHeight - paddingY}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />

                {/* Surface area & line */}
                <path d={surfaceAreaPath} fill={`url(#surfaceAreaGrad-${reactId})`} />
                <path d={surfacePath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                {/* Groundwater area & line */}
                <path d={gwAreaPath} fill={`url(#gwAreaGrad-${reactId})`} />
                <path d={gwPath} fill="none" stroke="#22c55e" strokeWidth="2.5" />

                {/* Interactive Points on hover */}
                {MONTHLY_HYDROLOGY.map((m, idx) => {
                  const cx = getX(idx);
                  const cySurface = getY(m.surfacePct);
                  const cyGw = getY(m.gwPct);
                  const isActive = activeMonthIdx === idx;
                  return (
                    <g
                      key={m.month}
                      className="hydrograph-month-group"
                      onMouseEnter={() => {
                        setActiveMonthIdx(idx);
                        setSurfaceUse(m.surfacePct);
                      }}
                      onMouseLeave={() => setActiveMonthIdx(null)}
                    >
                      <circle
                        cx={cx}
                        cy={cySurface}
                        r={isActive ? 5 : 2.5}
                        fill="#38bdf8"
                        stroke="#fff"
                        strokeWidth={isActive ? 2 : 0}
                      />
                      <circle
                        cx={cx}
                        cy={cyGw}
                        r={isActive ? 5 : 2.5}
                        fill="#22c55e"
                        stroke="#fff"
                        strokeWidth={isActive ? 2 : 0}
                      />
                      {isActive && (
                        <line
                          x1={cx}
                          y1={paddingY}
                          x2={cx}
                          y2={chartHeight - paddingY}
                          stroke="rgba(255,255,255,0.3)"
                          strokeDasharray="2,2"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Month X-Axis Labels */}
              <div className="month-axis-labels">
                {MONTHLY_HYDROLOGY.map((m, idx) => (
                  <button
                    key={m.month}
                    type="button"
                    className={`month-label-btn ${activeMonthIdx === idx ? 'active' : ''}`}
                    onClick={() => {
                      setActiveMonthIdx(idx);
                      setSurfaceUse(m.surfacePct);
                    }}
                    title={`${m.month}: Surface ${m.surfacePct}% / GW ${m.gwPct}%`}
                  >
                    {m.month}
                  </button>
                ))}
              </div>

              {/* Hydrograph Legend */}
              <div className="hydrograph-legend">
                <span className="legend-item">
                  <span className="legend-dot bg-sky-400" />
                  <span className="legend-label">Surface Water Use</span>
                </span>
                <span className="legend-item">
                  <span className="legend-dot bg-emerald-400" />
                  <span className="legend-label">Groundwater Use</span>
                </span>
              </div>
            </div>
          </article>

          {/* CARD 3: Benefits */}
          <article className="glass-feature-card card-benefits">
            <div className="feature-card-header">
              <h3 className="feature-card-title">Benefits</h3>
            </div>
            <ul className="benefits-list">
              {BENEFITS_LIST.map((benefit, idx) => (
                <li key={idx} className="benefit-item">
                  <span className="benefit-check-circle" aria-hidden="true">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </span>
                  <span className="benefit-text">{benefit}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* CARD 4: Key Considerations */}
          <article className="glass-feature-card card-considerations">
            <div className="feature-card-header">
              <h3 className="feature-card-title">Key Considerations</h3>
            </div>
            <ul className="considerations-list">
              {KEY_CONSIDERATIONS.map((kc) => (
                <li key={kc.id} className="consideration-item" title={kc.detail}>
                  <span className="consideration-icon-circle">
                    {renderIcon(kc.iconName, 'w-4 h-4 text-sky-300')}
                  </span>
                  <span className="consideration-text">{kc.title}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* ─── MODAL DIALOG FOR INTERACTIVE CALLOUTS ─── */}
        {selectedCallout && (
          <div
            className="conjunctive-modal-backdrop"
            data-lenis-prevent
            onClick={() => setSelectedCallout(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-callout-title"
          >
            <div
              className="conjunctive-modal-dialog liquid-glass"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedCallout(null)}
                aria-label="Close details"
              >
                <X className="w-5 h-5 text-slate-300 hover:text-white" />
              </button>

              <div className="modal-header-section">
                <div className="modal-badge-row">
                  <span
                    className="modal-category-tag"
                    style={{
                      backgroundColor: `${selectedCallout.badgeColor}22`,
                      borderColor: selectedCallout.badgeColor,
                      color: selectedCallout.badgeColor,
                    }}
                  >
                    {selectedCallout.category}
                  </span>
                </div>
                <h2 id="modal-callout-title" className="modal-title">
                  {selectedCallout.title}
                </h2>
                <p className="modal-subtitle">{selectedCallout.subtitle}</p>
              </div>

              <div className="modal-body-content">
                <p className="modal-summary-text">{selectedCallout.summary}</p>

                <div className="modal-tech-grid">
                  {selectedCallout.technicalDetails.map((tech, idx) => (
                    <div key={idx} className="tech-card">
                      <h4 className="tech-heading">{tech.heading}</h4>
                      <p className="tech-desc">{tech.description}</p>
                    </div>
                  ))}
                </div>

                <div className="modal-advantages-section">
                  <h4 className="section-title">Strategic Hydrological Advantages</h4>
                  <ul className="modal-adv-list">
                    {selectedCallout.advantages.map((adv, idx) => (
                      <li key={idx} className="adv-item">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-case-study">
                  <div className="case-study-header">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="case-study-tag">Indian Case Study Benchmark</span>
                  </div>
                  <h4 className="case-study-region">{selectedCallout.caseStudy.region}</h4>
                  <p className="case-study-impl">
                    <strong>Implementation: </strong>
                    {selectedCallout.caseStudy.implementation}
                  </p>
                  <p className="case-study-impact">
                    <strong>Impact & Outcome: </strong>
                    {selectedCallout.caseStudy.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default ConjunctiveUseScreen;
