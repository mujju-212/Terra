import React, { useState } from 'react';
import {
  CloudRain,
  Landmark,
  Waves,
  Trees,
  Snowflake,
  Building2,
  Pipette,
  Mountain,
  Droplets,
  Compass,
  CheckCircle2,
  FileText,
  Wrench,
  ShieldAlert,
  Users,
  Network,
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Quote,
  X,
  Info,
  ChevronRight,
  Sprout,
  Cog,
  BarChart3,
} from 'lucide-react';
import {
  RECHARGE_TYPES,
  CUTAWAY_RECHARGE_POINTS,
  NATURAL_RECHARGE_ITEMS,
  ARTIFICIAL_RECHARGE_METHODS,
  RECHARGE_BENEFITS,
  RECHARGE_CONSIDERATIONS,
  RechargeType,
  CutawayRechargePoint,
  NaturalRechargeItem,
  ArtificialRechargeMethod,
  RechargeBenefit,
  RechargeConsideration,
} from './groundwaterRechargeData';

export function GroundwaterRechargeScreen() {
  const [selectedType, setSelectedType] = useState<RechargeType | null>(null);
  const [activeCallout, setActiveCallout] = useState<CutawayRechargePoint | null>(null);
  const [selectedNatural, setSelectedNatural] = useState<NaturalRechargeItem | null>(null);
  const [selectedArtificial, setSelectedArtificial] = useState<ArtificialRechargeMethod | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<RechargeBenefit | null>(null);
  const [selectedConsideration, setSelectedConsideration] = useState<RechargeConsideration | null>(null);

  return (
    <section
      id="ch-15"
      className="water-gw-recharge-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 16: Groundwater Recharge"
    >
      <div className="water-gw-recharge-inner">
        {/* ─── 1. PANORAMIC 3D CUTAWAY HERO STAGE ─── */}
        <div className="gw-recharge-panoramic-stage">
          {/* Pristine Master Artwork Background */}
          <img
            src="/images/gw-recharge-cutaway-bg.jpg"
            alt="3D geological cutaway illustrating natural rainwater infiltration, check dams, percolation tanks, and recharge wells"
            className="gw-recharge-panoramic-img"
            loading="eager"
          />

          {/* Cinematic Scrim Gradients for text contrast */}
          <div className="gw-recharge-scrim-left" aria-hidden="true" />
          <div className="gw-recharge-scrim-top" aria-hidden="true" />
          <div className="gw-recharge-scrim-bottom" aria-hidden="true" />

          {/* Top-Left Header Block */}
          <header className="gw-recharge-hero-header">
            <span className="gw-recharge-chapter-tag">CHAPTER 16</span>
            <h1 className="gw-recharge-main-title">
              Groundwater <span className="gw-recharge-glow-text">Recharge</span>
            </h1>
            <p className="gw-recharge-header-desc">
              Groundwater recharge is the process of increasing the water stored in aquifers through
              natural or artificial means. It helps maintain groundwater levels, improves water security
              and ensures the sustainable use of this vital resource.
            </p>
          </header>

          {/* Types of Recharge Card (Bottom-Left inside Hero Stage) */}
          <div className="gw-recharge-hero-types-card">
            <h3 className="gw-recharge-types-title">Types of Recharge</h3>
            <div className="gw-recharge-types-row">
              {RECHARGE_TYPES.map((type) => {
                const isSelected = selectedType?.id === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    className={`gw-recharge-type-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedType(isSelected ? null : type)}
                    aria-expanded={isSelected}
                    aria-label={`Type: ${type.title}`}
                  >
                    <div
                      className="gw-type-icon-bubble"
                      style={{
                        backgroundColor: type.bg,
                        borderColor: type.color,
                        color: type.color,
                      }}
                    >
                      {type.iconName === 'CloudRain' && <CloudRain size={20} />}
                      {type.iconName === 'Landmark' && <Landmark size={20} />}
                    </div>
                    <div className="gw-type-text-block">
                      <strong className="gw-type-title" style={{ color: type.color }}>
                        {type.title}
                      </strong>
                      <p className="gw-type-desc">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Expanded Recharge Type Details Banner */}
            {selectedType && (
              <div className="gw-type-detail-banner animate-fade-in">
                <Info size={14} style={{ color: selectedType.color, flexShrink: 0, marginTop: 2 }} />
                <p>
                  <strong style={{ color: selectedType.color }}>{selectedType.title}:</strong>{' '}
                  {selectedType.detailedText}
                </p>
                <button
                  type="button"
                  className="gw-close-mini-btn"
                  onClick={() => setSelectedType(null)}
                  aria-label="Close type details"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Top-Right Quotation Card */}
          <aside className="gw-recharge-hero-quote-card" aria-label="Expert insight on groundwater recharge">
            <div className="gw-quote-icon-bubble" aria-hidden="true">
              <Quote size={22} className="gw-quote-icon" />
            </div>
            <blockquote className="gw-quote-text">
              “Groundwater recharge, both natural and artificial, plays a crucial role in maintaining aquifer levels
              and ensuring long-term water availability.”
            </blockquote>
          </aside>

          {/* ── Interactive Geological Cutaway Overlay Badges ── */}
          {/* 1. Rainwater (infiltration) */}
          <div className="gw-recharge-callout is-rainwater" style={{ left: '48.5%', top: '21%' }}>
            <button
              type="button"
              className="gw-recharge-badge is-rain"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_RECHARGE_POINTS[0].id ? null : CUTAWAY_RECHARGE_POINTS[0]
                )
              }
              aria-label="Callout: Rainwater Infiltration"
            >
              <span className="gw-badge-pulse-glow is-blue" />
              <div className="gw-badge-stacked">
                <span className="gw-badge-primary">Rainwater</span>
                <span className="gw-badge-secondary">(infiltration)</span>
              </div>
            </button>
            <div className="gw-down-arrows-col" aria-hidden="true">
              <ArrowDown size={14} className="gw-arrow-stream stream-1" />
              <ArrowDown size={14} className="gw-arrow-stream stream-2" />
              <ArrowDown size={14} className="gw-arrow-stream stream-3" />
            </div>
          </div>

          {/* 2. Infiltration (Soil level) */}
          <div className="gw-recharge-callout is-soil-infil" style={{ left: '49%', top: '43%' }}>
            <button
              type="button"
              className="gw-recharge-badge is-darkblue"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_RECHARGE_POINTS[1].id ? null : CUTAWAY_RECHARGE_POINTS[1]
                )
              }
              aria-label="Callout: Subsurface Infiltration"
            >
              <span className="gw-badge-primary">Infiltration</span>
            </button>
          </div>

          {/* 3. Check Dam (increases infiltration) */}
          <div className="gw-recharge-callout is-checkdam" style={{ left: '61.5%', top: '27%' }}>
            <button
              type="button"
              className="gw-recharge-badge is-green"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_RECHARGE_POINTS[2].id ? null : CUTAWAY_RECHARGE_POINTS[2]
                )
              }
              aria-label="Callout: Check Dam"
            >
              <span className="gw-badge-pulse-glow is-green" />
              <div className="gw-badge-stacked">
                <span className="gw-badge-primary">Check Dam</span>
                <span className="gw-badge-secondary">(increases infiltration)</span>
              </div>
            </button>
            <div className="gw-down-arrows-col is-green-arrows" aria-hidden="true">
              <ArrowDown size={14} className="gw-arrow-stream stream-1" />
              <ArrowDown size={14} className="gw-arrow-stream stream-2" />
              <ArrowDown size={14} className="gw-arrow-stream stream-3" />
            </div>
          </div>

          {/* 4. Percolation Tank (recharge structure) */}
          <div className="gw-recharge-callout is-perctank" style={{ left: '74.5%', top: '29%' }}>
            <button
              type="button"
              className="gw-recharge-badge is-orange"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_RECHARGE_POINTS[3].id ? null : CUTAWAY_RECHARGE_POINTS[3]
                )
              }
              aria-label="Callout: Percolation Tank"
            >
              <span className="gw-badge-pulse-glow is-orange" />
              <div className="gw-badge-stacked">
                <span className="gw-badge-primary">Percolation Tank</span>
                <span className="gw-badge-secondary">(recharge structure)</span>
              </div>
            </button>
            <div className="gw-down-arrows-col is-orange-arrows" aria-hidden="true">
              <ArrowDown size={14} className="gw-arrow-stream stream-1" />
              <ArrowDown size={14} className="gw-arrow-stream stream-2" />
              <ArrowDown size={14} className="gw-arrow-stream stream-3" />
            </div>
          </div>

          {/* 5. Recharge Well (direct recharge) */}
          <div className="gw-recharge-callout is-rechargewell" style={{ left: '89%', top: '30%' }}>
            <button
              type="button"
              className="gw-recharge-badge is-purple"
              onClick={() =>
                setActiveCallout(
                  activeCallout?.id === CUTAWAY_RECHARGE_POINTS[4].id ? null : CUTAWAY_RECHARGE_POINTS[4]
                )
              }
              aria-label="Callout: Recharge Well"
            >
              <span className="gw-badge-pulse-glow is-purple" />
              <div className="gw-badge-stacked">
                <span className="gw-badge-primary">Recharge Well</span>
                <span className="gw-badge-secondary">(direct recharge)</span>
              </div>
            </button>
          </div>

          {/* 6. Recharged Aquifer (groundwater storage) */}
          <div className="gw-recharge-callout is-aquifer" style={{ left: '67%', top: '57%' }}>
            <div className="gw-aquifer-flow-wrap">
              <ArrowLeft size={16} className="gw-aquifer-arrow left" />
              <button
                type="button"
                className="gw-recharge-badge is-aquifer"
                onClick={() =>
                  setActiveCallout(
                    activeCallout?.id === CUTAWAY_RECHARGE_POINTS[5].id ? null : CUTAWAY_RECHARGE_POINTS[5]
                  )
                }
                aria-label="Callout: Recharged Aquifer Storage"
              >
                <span className="gw-badge-pulse-glow is-cyan" />
                <div className="gw-badge-stacked">
                  <span className="gw-badge-primary">Recharged Aquifer</span>
                  <span className="gw-badge-secondary">(groundwater storage)</span>
                </div>
              </button>
              <ArrowRight size={16} className="gw-aquifer-arrow right" />
            </div>
          </div>

          {/* Floating Callout Popover */}
          {activeCallout && (
            <div
              className="gw-recharge-callout-popup animate-scale-up"
              style={{
                left: `${Math.min(Math.max(activeCallout.pinX - 10, 18), 62)}%`,
                top: `${activeCallout.pinY > 38 ? activeCallout.pinY - 24 : activeCallout.pinY + 6}%`,
              }}
            >
              <div className="gw-popup-header">
                <strong style={{ color: activeCallout.color }}>{activeCallout.title}</strong>
                <button
                  type="button"
                  className="gw-close-mini-btn"
                  onClick={() => setActiveCallout(null)}
                  aria-label="Close info"
                >
                  <X size={13} />
                </button>
              </div>
              <p className="gw-popup-desc">{activeCallout.description}</p>
              <div className="gw-popup-spec-row">
                <span className="gw-spec-label">Engineering Spec:</span>
                <span className="gw-spec-val">{activeCallout.engineeringSpec}</span>
              </div>
              <div className="gw-popup-spec-row">
                <span className="gw-spec-label">Efficiency:</span>
                <span className="gw-spec-val" style={{ color: '#4ade80' }}>
                  {activeCallout.efficiency}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ─── 2. 4-CARD BOTTOM DOCK ─── */}
        <div className="gw-recharge-dock-grid">
          {/* ── CARD 1: NATURAL RECHARGE ── */}
          <article className="gw-dock-card is-natural-card" aria-label="Natural Recharge Methods">
            <div className="gw-dock-card-header">
              <Sprout size={19} className="gw-header-icon" style={{ color: '#4ade80' }} />
              <h2 className="gw-dock-card-title">Natural Recharge</h2>
            </div>

            <ul className="gw-dock-card-list">
              {NATURAL_RECHARGE_ITEMS.map((item) => {
                const isSelected = selectedNatural?.id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`gw-dock-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedNatural(isSelected ? null : item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedNatural(isSelected ? null : item)}
                    aria-label={item.title}
                  >
                    <div
                      className="gw-dock-icon-bubble"
                      style={{ backgroundColor: item.bg, color: item.color, borderColor: item.color }}
                    >
                      {item.iconName === 'CloudRain' && <CloudRain size={16} />}
                      {item.iconName === 'Waves' && <Waves size={16} />}
                      {item.iconName === 'Trees' && <Trees size={16} />}
                      {item.iconName === 'Snowflake' && <Snowflake size={16} />}
                    </div>
                    <span className="gw-dock-text">{item.title}</span>
                  </li>
                );
              })}
            </ul>

            {/* Selected Item Drawer */}
            {selectedNatural && (
              <div className="gw-dock-detail-panel animate-fade-in">
                <div className="gw-dock-detail-header">
                  <strong style={{ color: selectedNatural.color }}>{selectedNatural.title}</strong>
                  <button
                    type="button"
                    className="gw-close-mini-btn"
                    onClick={() => setSelectedNatural(null)}
                    aria-label="Close details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedNatural.detail}</p>
              </div>
            )}
          </article>

          {/* ── CARD 2: ARTIFICIAL RECHARGE METHODS ── */}
          <article className="gw-dock-card is-artificial-card" aria-label="Artificial Recharge Methods">
            <div className="gw-dock-card-header">
              <Landmark size={19} className="gw-header-icon" style={{ color: '#c084fc' }} />
              <h2 className="gw-dock-card-title">Artificial Recharge Methods</h2>
            </div>

            <ul className="gw-dock-card-list">
              {ARTIFICIAL_RECHARGE_METHODS.map((item) => {
                const isSelected = selectedArtificial?.id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`gw-dock-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedArtificial(isSelected ? null : item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedArtificial(isSelected ? null : item)}
                    aria-label={item.title}
                  >
                    <div
                      className="gw-dock-icon-bubble"
                      style={{ backgroundColor: item.bg, color: item.color, borderColor: item.color }}
                    >
                      {item.iconName === 'Building2' && <Building2 size={16} />}
                      {item.iconName === 'Pipette' && <Pipette size={16} />}
                      {item.iconName === 'Mountain' && <Mountain size={16} />}
                      {item.iconName === 'Droplets' && <Droplets size={16} />}
                      {item.iconName === 'Compass' && <Compass size={16} />}
                    </div>
                    <span className="gw-dock-text">{item.title}</span>
                  </li>
                );
              })}
            </ul>

            {/* Selected Item Drawer */}
            {selectedArtificial && (
              <div className="gw-dock-detail-panel animate-fade-in">
                <div className="gw-dock-detail-header">
                  <strong style={{ color: selectedArtificial.color }}>{selectedArtificial.title}</strong>
                  <button
                    type="button"
                    className="gw-close-mini-btn"
                    onClick={() => setSelectedArtificial(null)}
                    aria-label="Close details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedArtificial.detail}</p>
              </div>
            )}
          </article>

          {/* ── CARD 3: BENEFITS OF RECHARGE ── */}
          <article className="gw-dock-card is-benefits-card" aria-label="Benefits of Recharge">
            <div className="gw-dock-card-header">
              <Cog size={19} className="gw-header-icon" style={{ color: '#38bdf8' }} />
              <h2 className="gw-dock-card-title">Benefits of Recharge</h2>
            </div>

            <ul className="gw-dock-checklist">
              {RECHARGE_BENEFITS.map((item) => {
                const isSelected = selectedBenefit?.id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`gw-benefit-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedBenefit(isSelected ? null : item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedBenefit(isSelected ? null : item)}
                    aria-label={item.text}
                  >
                    <div className="gw-benefit-check-wrap" aria-hidden="true">
                      <CheckCircle2 size={16} className="gw-benefit-check-icon" />
                    </div>
                    <span className="gw-benefit-text">{item.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* Selected Item Drawer */}
            {selectedBenefit && (
              <div className="gw-dock-detail-panel animate-fade-in">
                <div className="gw-dock-detail-header">
                  <strong style={{ color: '#4ade80' }}>Benefit Rationale</strong>
                  <button
                    type="button"
                    className="gw-close-mini-btn"
                    onClick={() => setSelectedBenefit(null)}
                    aria-label="Close details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedBenefit.detail}</p>
              </div>
            )}
          </article>

          {/* ── CARD 4: KEY CONSIDERATIONS ── */}
          <article className="gw-dock-card is-considerations-card" aria-label="Key Considerations">
            <div className="gw-dock-card-header">
              <BarChart3 size={19} className="gw-header-icon" style={{ color: '#0ea5e9' }} />
              <h2 className="gw-dock-card-title">Key Considerations</h2>
            </div>

            <ul className="gw-dock-card-list">
              {RECHARGE_CONSIDERATIONS.map((item) => {
                const isSelected = selectedConsideration?.id === item.id;
                return (
                  <li
                    key={item.id}
                    className={`gw-dock-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedConsideration(isSelected ? null : item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedConsideration(isSelected ? null : item)}
                    aria-label={item.title}
                  >
                    <div
                      className="gw-dock-icon-bubble"
                      style={{
                        backgroundColor: 'rgba(14, 165, 233, 0.16)',
                        color: item.color,
                        borderColor: item.color,
                      }}
                    >
                      {item.iconName === 'FileText' && <FileText size={16} />}
                      {item.iconName === 'Wrench' && <Wrench size={16} />}
                      {item.iconName === 'ShieldAlert' && <ShieldAlert size={16} />}
                      {item.iconName === 'Users' && <Users size={16} />}
                      {item.iconName === 'Network' && <Network size={16} />}
                      {item.iconName === 'Activity' && <Activity size={16} />}
                    </div>
                    <span className="gw-dock-text">{item.title}</span>
                  </li>
                );
              })}
            </ul>

            {/* Selected Item Drawer */}
            {selectedConsideration && (
              <div className="gw-dock-detail-panel animate-fade-in">
                <div className="gw-dock-detail-header">
                  <strong style={{ color: selectedConsideration.color }}>{selectedConsideration.title}</strong>
                  <button
                    type="button"
                    className="gw-close-mini-btn"
                    onClick={() => setSelectedConsideration(null)}
                    aria-label="Close details"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p>{selectedConsideration.detail}</p>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
