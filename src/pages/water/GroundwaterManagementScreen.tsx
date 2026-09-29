import React, { useState } from 'react';
import {
  Droplet,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Users,
  Sprout,
  Landmark,
  Sliders,
  Trees,
  Factory,
  LineChart,
  HeartHandshake,
  Check,
  X,
  FileText,
  Compass,
  Cog,
  MapPin,
  CloudRain,
  Activity,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import {
  GW_CALLOUT_POINTS,
  KEY_OBJECTIVES,
  MANAGEMENT_PRINCIPLES,
  STRATEGIES_MEASURES,
  MANAGEMENT_LEVELS,
  EXPECTED_OUTCOMES,
  type CalloutFeature,
} from './groundwaterManagementData';
import { useModalScrollLock } from './useModalScrollLock';

export function GroundwaterManagementScreen() {
  // Selected callout for the detailed technical modal
  const [selectedCallout, setSelectedCallout] = useState<CalloutFeature | null>(null);

  // Modal scroll lock
  useModalScrollLock(Boolean(selectedCallout), () => setSelectedCallout(null));

  // Active objective filter/highlight
  const [activeObjectiveId, setActiveObjectiveId] = useState<string | null>(null);

  // Icon renderer helper
  const renderIcon = (name: string, className = 'w-4 h-4') => {
    switch (name) {
      case 'Droplet':
        return <Droplet className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Sprout':
        return <Sprout className={className} />;
      case 'Landmark':
        return <Landmark className={className} />;
      case 'Sliders':
        return <Sliders className={className} />;
      case 'Trees':
        return <Trees className={className} />;
      case 'Factory':
        return <Factory className={className} />;
      case 'LineChart':
        return <LineChart className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Cog':
        return <Cog className={className} />;
      case 'MapPin':
        return <MapPin className={className} />;
      case 'CloudRain':
        return <CloudRain className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      default:
        return <Droplet className={className} />;
    }
  };

  return (
    <section
      id="ch-12"
      className="water-gw-mgmt-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 13: Management of Groundwater"
    >
      <div className="water-gw-mgmt-inner">
        {/* ─── TOP HEADER ROW (Matching Chapter 10 Architecture) ─── */}
        <header className="gw-mgmt-header-row">
          <div className="gw-mgmt-title-block">
            <span className="gw-mgmt-chapter-kicker">CHAPTER 13</span>
            <h1 className="gw-mgmt-main-title">
              Management of <span className="title-gradient">Groundwater</span>
            </h1>
            <p className="gw-mgmt-deck">
              Effective groundwater management ensures the sustainable use of this vital resource by
              regulating extraction, maintaining recharge, preventing pollution and ensuring
              equitable access for present and future generations.
            </p>
          </div>

          {/* TOP-RIGHT: QUOTE CARD */}
          <aside className="gw-mgmt-quote-card liquid-glass" aria-label="Core groundwater management principle">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p className="quote-text">
              Sustainable groundwater management balances extraction, recharge and quality
              protection to ensure long-term availability.
            </p>
          </aside>
        </header>

        {/* ─── CENTER STAGE: 3D HYDROGEOLOGICAL CUTAWAY CANVAS ─── */}
        <div className="gw-mgmt-stage-canvas">
          {/* Pristine Master Artwork Background */}
          <img
            src="/images/water-ch13-gw-management-master.jpg"
            alt="3D geological cutaway illustrating groundwater management: percolation tank recharge, regulated extraction tube-well, telemetry observation piezometer, and contamination plume containment"
            className="gw-mgmt-stage-img"
            loading="eager"
          />

          {/* LOWER-LEFT OVERLAID CARD: KEY OBJECTIVES */}
          <div className="gw-key-objectives-card liquid-glass">
            <h3 className="objectives-title">Key Objectives</h3>
            <div className="objectives-grid">
              {KEY_OBJECTIVES.map((obj) => {
                const isSelected = activeObjectiveId === obj.id;
                return (
                  <button
                    key={obj.id}
                    type="button"
                    className={`objective-pill ${isSelected ? 'is-selected' : ''}`}
                    onClick={() =>
                      setActiveObjectiveId(activeObjectiveId === obj.id ? null : obj.id)
                    }
                    title={`${obj.title}: ${obj.description}`}
                    aria-label={`${obj.title}: click to toggle focus`}
                  >
                    <div
                      className="objective-icon-circle"
                      style={{
                        backgroundColor: `${obj.color}1e`,
                        borderColor: `${obj.color}66`,
                        color: obj.color,
                      }}
                    >
                      {renderIcon(obj.iconName, 'w-4 h-4')}
                    </div>
                    <span className="objective-label">{obj.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 INTERACTIVE CALLOUT BADGES PINNED ON THE CUTAWAY */}
          {/* Badge 1: Enhance Recharge (Green with rain clouds & drops directly over percolation pond) */}
          <div className="gw-callout-anchor" style={{ left: '36.5%', top: '22%' }}>
            {/* Animated Rain Cloud and Drops above badge */}
            <div className="callout-rain-cloud-wrap" aria-hidden="true">
              <svg className="rain-cloud-svg" viewBox="0 0 48 30">
                <path
                  d="M 12 24 C 6 24 2 20 2 15 C 2 10 7 7 12 7 C 14 3 19 1 24 1 C 30 1 35 4 37 8 C 42 8 46 12 46 17 C 46 22 41 24 36 24 Z"
                  fill="rgba(255, 255, 255, 0.9)"
                  filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))"
                />
              </svg>
              <div className="rain-drops-container">
                <span className="raindrop rd-1" />
                <span className="raindrop rd-2" />
                <span className="raindrop rd-3" />
                <span className="raindrop rd-4" />
              </div>
            </div>

            <button
              type="button"
              className={`gw-callout-pill callout-enhance-recharge ${selectedCallout?.id === 'enhance-recharge' ? 'is-active' : ''}`}
              onClick={() => setSelectedCallout(GW_CALLOUT_POINTS[0])}
              title="Click to explore Artificial & Natural Aquifer Recharge"
            >
              <span className="pill-stacked-text">
                <span className="line-1">Enhance</span>
                <span className="line-2">Recharge</span>
              </span>
              <span className="callout-pill-pulse pulse-green" />
            </button>
          </div>

          {/* Badge 2: Regulate Extraction (Purple directly above extraction tube-well) */}
          <div className="gw-callout-anchor" style={{ left: '52.5%', top: '26%' }}>
            <button
              type="button"
              className={`gw-callout-pill callout-regulate-extraction ${selectedCallout?.id === 'regulate-extraction' ? 'is-active' : ''}`}
              onClick={() => setSelectedCallout(GW_CALLOUT_POINTS[1])}
              title="Click to explore Well Spacing & Extraction Limits"
            >
              <span className="pill-stacked-text">
                <span className="line-1">Regulate</span>
                <span className="line-2">Extraction</span>
              </span>
              <span className="callout-pill-pulse pulse-purple" />
            </button>
          </div>

          {/* Badge 3: Monitor Groundwater Levels (Amber with wifi/waves directly above piezometer) */}
          <div className="gw-callout-anchor" style={{ left: '68.0%', top: '29.5%' }}>
            {/* Telemetry Wave Signal above piezometer */}
            <div className="callout-telemetry-waves" aria-hidden="true">
              <span className="telemetry-wave tw-1" />
              <span className="telemetry-wave tw-2" />
              <span className="telemetry-wave tw-3" />
            </div>

            <button
              type="button"
              className={`gw-callout-pill callout-monitor-levels ${selectedCallout?.id === 'monitor-levels' ? 'is-active' : ''}`}
              onClick={() => setSelectedCallout(GW_CALLOUT_POINTS[2])}
              title="Click to explore Telemetry & Digital Water Level Recorders"
            >
              <span className="pill-stacked-text">
                <span className="line-1">Monitor</span>
                <span className="line-2">Groundwater Levels</span>
              </span>
              <span className="callout-pill-pulse pulse-amber" />
            </button>
          </div>

          {/* Badge 4: Prevent Contamination (Blue directly above industrial facility) */}
          <div className="gw-callout-anchor" style={{ left: '86.0%', top: '30.5%' }}>
            <button
              type="button"
              className={`gw-callout-pill callout-prevent-contamination ${selectedCallout?.id === 'prevent-contamination' ? 'is-active' : ''}`}
              onClick={() => setSelectedCallout(GW_CALLOUT_POINTS[3])}
              title="Click to explore Pollution Prevention & Plume Remediation"
            >
              <span className="pill-stacked-text">
                <span className="line-1">Prevent</span>
                <span className="line-2">Contamination</span>
              </span>
              <span className="callout-pill-pulse pulse-blue" />
            </button>
          </div>

          {/* Subsurface Flow Vectors (SVG overlay) */}
          <svg
            className="gw-panoramic-vector-overlay"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="vectorGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Downward Percolation Vectors under Recharge Tank */}
            <g className="recharge-vector-group">
              <path
                d="M 330 268 L 330 326 M 324 318 L 330 328 L 336 318"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#vectorGlowCyan)"
                className="anim-pulse-down"
              />
              <path
                d="M 355 270 L 355 330 M 349 322 L 355 332 L 361 322"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#vectorGlowCyan)"
                className="anim-pulse-down delay-1"
              />
              <path
                d="M 380 272 L 380 334 M 374 326 L 380 336 L 386 326"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#vectorGlowCyan)"
                className="anim-pulse-down delay-2"
              />
            </g>

            {/* Horizontal Aquifer Base-flow Vectors */}
            <g className="aquifer-flow-group">
              <path
                d="M 430 375 L 490 375 M 482 370 L 491 375 L 482 380"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#vectorGlowCyan)"
                className="anim-flow-aquifer"
              />
              <path
                d="M 555 375 L 635 375 M 627 370 L 636 375 L 627 380"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#vectorGlowCyan)"
                className="anim-flow-aquifer delay-1"
              />
              <path
                d="M 715 375 L 795 375 M 787 370 L 796 375 L 787 380"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#vectorGlowCyan)"
                className="anim-flow-aquifer delay-2"
              />
            </g>

            {/* Upward Pumping Vector inside Borewell */}
            <g className="pumping-vector-group">
              <path
                d="M 525 425 L 525 330 M 519 338 L 525 328 L 531 338"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#vectorGlowCyan)"
                className="anim-pulse-down"
                style={{ animationDirection: 'reverse' }}
              />
            </g>

            {/* Red Contaminant Infiltration Arrow */}
            <g className="contaminant-vector-group">
              <path
                d="M 860 268 L 860 348 M 854 340 L 860 350 L 866 340"
                stroke="#ef4444"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="anim-pulse-down"
              />
            </g>
          </svg>

          {/* Geological Subsurface Text Labels (Clean, drop-shadowed matching mockup) */}
          <div className="gw-canvas-label label-recharge" style={{ left: '35.5%', top: '68%' }}>
            <span className="canvas-label-text">Recharge zone</span>
          </div>

          <div className="gw-canvas-label label-aquifer" style={{ left: '46.5%', top: '75.5%' }}>
            <span className="canvas-label-text">Aquifer<br />(Groundwater)</span>
          </div>

          <div className="gw-canvas-label label-plume" style={{ left: '86.0%', top: '79%' }}>
            <span className="canvas-label-text">Contaminant<br />plume (to be prevented)</span>
          </div>
        </div>

        {/* ─── BOTTOM ROW: 4 GLASSMORPHIC CARDS (1:1 with Reference Mockup) ─── */}
        <div className="gw-mgmt-bottom-grid">
          {/* CARD 1: Management Principles */}
          <article className="glass-mgmt-card card-principles">
            <div className="mgmt-card-header">
              <h3 className="mgmt-card-title">Management Principles</h3>
            </div>
            <ul className="principles-list">
              {MANAGEMENT_PRINCIPLES.map((item) => (
                <li key={item.id} className="principle-item" title={item.detail}>
                  <span
                    className="principle-icon-circle"
                    style={{
                      color: item.color,
                      borderColor: `${item.color}40`,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    {renderIcon(item.iconName, 'w-4 h-4')}
                  </span>
                  <span className="principle-text">{item.title}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* CARD 2: Strategies and Measures */}
          <article className="glass-mgmt-card card-strategies">
            <div className="mgmt-card-header">
              <h3 className="mgmt-card-title">Strategies and Measures</h3>
            </div>
            <ul className="strategies-list">
              {STRATEGIES_MEASURES.map((item) => (
                <li key={item.id} className="strategy-item" title={item.detail}>
                  <span className="strategy-icon-circle">
                    {renderIcon(item.iconName, 'w-4 h-4 text-sky-400')}
                  </span>
                  <span className="strategy-text">{item.title}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* CARD 3: Management at Different Levels */}
          <article className="glass-mgmt-card card-levels">
            <div className="mgmt-card-header">
              <h3 className="mgmt-card-title">Management at Different Levels</h3>
            </div>
            <div className="levels-stack">
              {MANAGEMENT_LEVELS.map((lvl) => (
                <div key={lvl.id} className="level-bar-card">
                  <div
                    className="level-badge"
                    style={{
                      color: lvl.color,
                      borderColor: `${lvl.color}44`,
                      backgroundColor: `${lvl.color}14`,
                    }}
                  >
                    <span className="level-badge-icon">
                      {renderIcon(lvl.iconName, 'w-3.5 h-3.5')}
                    </span>
                    <span className="level-badge-text">{lvl.level}</span>
                  </div>
                  <p className="level-desc">{lvl.desc}</p>
                </div>
              ))}
            </div>
          </article>

          {/* CARD 4: Expected Outcomes */}
          <article className="glass-mgmt-card card-outcomes">
            <div className="mgmt-card-header">
              <h3 className="mgmt-card-title">Expected Outcomes</h3>
            </div>
            <ul className="outcomes-list">
              {EXPECTED_OUTCOMES.map((outcome, idx) => (
                <li key={idx} className="outcome-item">
                  <span className="outcome-check-circle" aria-hidden="true">
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  </span>
                  <span className="outcome-text">{outcome}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* ─── MODAL DIALOG FOR INTERACTIVE CALLOUTS ─── */}
        {selectedCallout && (
          <div
            className="gw-modal-backdrop"
            data-lenis-prevent
            onClick={() => setSelectedCallout(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-gw-title"
          >
            <div
              className="gw-modal-dialog liquid-glass"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="gw-modal-close-btn"
                onClick={() => setSelectedCallout(null)}
                aria-label="Close details"
              >
                <X className="w-5 h-5 text-slate-300 hover:text-white" />
              </button>

              <div className="gw-modal-header">
                <div className="gw-modal-badge-row">
                  <span
                    className="gw-modal-category-tag"
                    style={{
                      backgroundColor: `${selectedCallout.badgeColor}22`,
                      borderColor: selectedCallout.badgeColor,
                      color: selectedCallout.badgeColor,
                    }}
                  >
                    {selectedCallout.category}
                  </span>
                </div>
                <h2 id="modal-gw-title" className="gw-modal-title">
                  {selectedCallout.title}
                </h2>
                <p className="gw-modal-subtitle">{selectedCallout.subtitle}</p>
              </div>

              <div className="gw-modal-body">
                <p className="gw-modal-summary-text">{selectedCallout.summary}</p>

                <div className="gw-modal-tech-grid">
                  {selectedCallout.technicalDetails.map((tech, idx) => (
                    <div key={idx} className="gw-tech-card">
                      <h4 className="gw-tech-heading">{tech.heading}</h4>
                      <p className="gw-tech-desc">{tech.description}</p>
                    </div>
                  ))}
                </div>

                <div className="gw-modal-advantages-section">
                  <h4 className="gw-section-title">Strategic Hydrological Advantages</h4>
                  <ul className="gw-modal-adv-list">
                    {selectedCallout.advantages.map((adv, idx) => (
                      <li key={idx} className="gw-adv-item">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="gw-modal-case-study">
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

export default GroundwaterManagementScreen;
