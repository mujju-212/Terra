import React, { useState } from 'react';
import {
  Quote,
  X,
  Info,
  ChevronRight,
  ArrowDown,
  ArrowRight,
  Heart,
  Leaf,
  Droplets,
  Coins,
  ShieldAlert,
  ShieldCheck,
  Sprout,
  Factory,
  Activity,
  Shield,
  Users,
  Biohazard,
  FlaskConical,
  Layers,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import {
  CONTAMINATION_SOURCES,
  STRATA_CALLOUTS,
  CONTAMINATION_TYPES,
  COMMON_CONTAMINANTS,
  CONTAMINATION_IMPACTS,
  PREVENTION_MEASURES,
  ContaminationSource,
  StrataCallout,
  ContaminantInfo,
  ContaminationImpact,
  PreventionMeasure,
} from './groundwaterContaminationData';
import { useModalScrollLock } from './useModalScrollLock';

export function GroundwaterContaminationScreen() {
  const [selectedSource, setSelectedSource] = useState<ContaminationSource | null>(null);
  const [activeStrata, setActiveStrata] = useState<StrataCallout | null>(null);
  const [selectedContaminant, setSelectedContaminant] = useState<ContaminantInfo | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<ContaminationImpact | null>(null);
  const [selectedPrevention, setSelectedPrevention] = useState<PreventionMeasure | null>(null);
  const [showPlumeModal, setShowPlumeModal] = useState<boolean>(false);
  const [activeTypeCategory, setActiveTypeCategory] = useState<'geogenic' | 'anthropogenic' | null>(null);

  // Lock body scroll when any modal is open
  const isAnyModalOpen = Boolean(
    selectedSource ||
    selectedContaminant ||
    selectedImpact ||
    selectedPrevention ||
    showPlumeModal ||
    activeTypeCategory
  );
  useModalScrollLock(isAnyModalOpen);

  return (
    <section
      id="ch-14"
      className="chapter-section water-gw-contam-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 15: Groundwater Contamination"
    >
      <div className="water-gw-contam-inner">
        {/* ─── 1. PANORAMIC 3D CUTAWAY HERO STAGE ─── */}
        <div className="gw-contam-panoramic-stage" role="region" aria-label="3D Groundwater Contamination Model">
          {/* Crisp 2048x1152 Master Background Artwork */}
          <img
            src="/images/water-ch15-gw-contamination-master.jpg"
            alt="3D geological cutaway showing agricultural, industrial, landfill and domestic contaminant seepage into groundwater aquifer"
            className="gw-contam-panoramic-img"
            loading="eager"
          />

          {/* Optical Scrim Gradients for Visual Clarity */}
          <div className="gw-contam-scrim-left" aria-hidden="true" />
          <div className="gw-contam-scrim-top" aria-hidden="true" />
          <div className="gw-contam-scrim-bottom" aria-hidden="true" />

          {/* Top-Left Header Block matching Mockup */}
          <header className="gw-contam-hero-header">
            <span className="gw-contam-chapter-tag">CHAPTER 15</span>
            <h1 className="gw-contam-main-title">
              Groundwater <span className="gw-contam-glow-text">Contamination</span>
            </h1>
            <p className="gw-contam-header-desc">
              Groundwater can be contaminated by naturally occurring substances (geogenic) or by
              human activities (anthropogenic). Contamination affects water quality, human health,
              ecosystems and makes the resource unsuitable for many uses.
            </p>
          </header>

          {/* Top-Right Liquid-Glass Quotation Card */}
          <aside className="gw-contam-hero-quote-card" aria-label="Expert insight on groundwater vulnerability">
            <div className="gw-contam-quote-icon-bubble" aria-hidden="true">
              <Quote size={18} className="gw-contam-quote-icon" />
            </div>
            <blockquote className="gw-contam-quote-text">
              “Even though groundwater is naturally filtered through soil and rocks, it is not
              immune to contamination. Both natural and human-induced sources can degrade its quality.”
            </blockquote>
          </aside>

          {/* Left Strata Geological Callouts matching mockup */}
          <div className="gw-contam-strata-callouts" aria-label="Geological Strata Layers">
            {/* 1. Soil Layer (unsaturated zone) */}
            <div
              className="gw-strata-item is-soil"
              style={{ top: '54%', left: '24px' }}
            >
              <button
                type="button"
                className={`gw-strata-badge ${activeStrata?.id === 'soil-layer' ? 'is-active' : ''}`}
                onClick={() =>
                  setActiveStrata(
                    activeStrata?.id === STRATA_CALLOUTS[0].id ? null : STRATA_CALLOUTS[0]
                  )
                }
                aria-label="Soil layer (unsaturated zone)"
              >
                <span className="gw-strata-main">Soil layer</span>
                <span className="gw-strata-sub">(unsaturated zone)</span>
              </button>
              <div className="gw-strata-leader-line line-soil" aria-hidden="true">
                <span className="gw-leader-dot" />
              </div>
            </div>

            {/* 2. Water Table */}
            <div
              className="gw-strata-item is-watertable"
              style={{ top: '61%', left: '24px' }}
            >
              <button
                type="button"
                className={`gw-strata-badge ${activeStrata?.id === 'water-table' ? 'is-active' : ''}`}
                onClick={() =>
                  setActiveStrata(
                    activeStrata?.id === STRATA_CALLOUTS[1].id ? null : STRATA_CALLOUTS[1]
                  )
                }
                aria-label="Water table layer"
              >
                <span className="gw-strata-main">Water table</span>
              </button>
              <div className="gw-strata-leader-line line-watertable" aria-hidden="true">
                <span className="gw-leader-dot" />
              </div>
            </div>

            {/* 3. Aquifer (saturated zone) */}
            <div
              className="gw-strata-item is-aquifer"
              style={{ top: '68%', left: '24px' }}
            >
              <button
                type="button"
                className={`gw-strata-badge ${activeStrata?.id === 'aquifer' ? 'is-active' : ''}`}
                onClick={() =>
                  setActiveStrata(
                    activeStrata?.id === STRATA_CALLOUTS[2].id ? null : STRATA_CALLOUTS[2]
                  )
                }
                aria-label="Aquifer (saturated zone)"
              >
                <span className="gw-strata-main">Aquifer</span>
                <span className="gw-strata-sub">(saturated zone)</span>
              </button>
              <div className="gw-strata-leader-line line-aquifer" aria-hidden="true">
                <span className="gw-leader-dot" />
              </div>
            </div>
          </div>

          {/* Strata Info Popover */}
          {activeStrata && (
            <div
              className="gw-strata-info-popover animate-scale-up"
              style={{ left: '260px', top: `${activeStrata.pinY}%` }}
            >
              <div className="gw-popover-header">
                <strong>{activeStrata.label} {activeStrata.sublabel}</strong>
                <button
                  type="button"
                  className="gw-close-mini-btn"
                  onClick={() => setActiveStrata(null)}
                  aria-label="Close strata info"
                >
                  <X size={12} />
                </button>
              </div>
              <p>{activeStrata.depthDescription}</p>
            </div>
          )}

          {/* 4 Interactive Surface Contamination Badges with Downward Seepage Arrows */}
          <div className="gw-contam-sources-overlay" aria-label="Contamination Sources on Landscape">
            {CONTAMINATION_SOURCES.map((src) => (
              <div
                key={src.id}
                className={`gw-contam-source-marker is-${src.id}`}
                style={{ left: `${src.pinX}%`, top: `${src.pinY}%` }}
              >
                <button
                  type="button"
                  className="gw-source-badge-btn"
                  style={{
                    borderColor: src.borderColor,
                    boxShadow: `0 0 16px ${src.glowColor}`,
                  }}
                  onClick={() => setSelectedSource(src)}
                  aria-label={`Inspect source: ${src.name}`}
                >
                  <span
                    className="gw-source-dot-pulse"
                    style={{ backgroundColor: src.color, boxShadow: `0 0 10px ${src.color}` }}
                  />
                  <div className="gw-source-badge-text">
                    <span className="gw-src-name" style={{ color: '#ffffff' }}>
                      {src.name}
                    </span>
                    <span className="gw-src-sub" style={{ color: src.borderColor }}>
                      {src.badgeSub}
                    </span>
                  </div>
                </button>

                {/* Animated Downward Seepage Plume Indicator */}
                <div className="gw-seepage-arrow-col" aria-hidden="true">
                  <span
                    className="gw-seepage-stream"
                    style={{
                      background: `linear-gradient(180deg, ${src.color} 0%, rgba(255,255,255,0.85) 50%, ${src.color} 100%)`,
                      boxShadow: `0 0 12px ${src.glowColor}`,
                    }}
                  />
                  <ArrowDown
                    size={20}
                    className="gw-seepage-arrow-icon"
                    style={{ color: src.borderColor, filter: `drop-shadow(0 0 6px ${src.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Lateral Contaminant Plume in Groundwater Badge + Flow Arrows */}
          <div className="gw-plume-banner-dock" style={{ left: '43.5%', top: '53%' }}>
            <button
              type="button"
              className="gw-plume-glass-badge"
              onClick={() => setShowPlumeModal(true)}
              aria-label="View Contaminant Plume in Groundwater dynamics"
            >
              <span className="gw-plume-glow-dot" />
              <span className="gw-plume-text">Contaminant plume in groundwater</span>
              <Info size={13} className="gw-plume-info-icon" />
            </button>

            {/* Glowing Lateral Migration Directional Arrows */}
            <div className="gw-lateral-flow-arrows" aria-hidden="true">
              <span className="gw-flow-arrow flow-1">➔</span>
              <span className="gw-flow-arrow flow-2">➔</span>
              <span className="gw-flow-arrow flow-3">➔</span>
            </div>
          </div>
        </div>

        {/* ─── 2. 4-COLUMN COMPACT BOTTOM GRID ─── */}
        <div className="gw-contam-dock-grid">
          {/* ── CARD 1: TYPES OF CONTAMINATION ── */}
          <article className="gw-contam-card is-types-card" aria-label="Types of Contamination">
            <h2 className="gw-contam-card-title">Types of Contamination</h2>

            <div className="gw-types-card-content">
              {/* Category 1: Geogenic Contamination */}
              <div
                className="gw-type-section is-geogenic"
                onClick={() => setActiveTypeCategory('geogenic')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTypeCategory('geogenic')}
                aria-label="View Geogenic Contamination details"
              >
                <div className="gw-type-header-row">
                  <div className="gw-type-icon-bubble is-geogenic">
                    <Layers size={18} className="gw-type-icon-amber" />
                  </div>
                  <div className="gw-type-heading-text">
                    <span className="gw-type-name is-amber">{CONTAMINATION_TYPES.geogenic.title}</span>
                    <span className="gw-type-sub">{CONTAMINATION_TYPES.geogenic.subtitle}</span>
                  </div>
                </div>

                <ul className="gw-type-bullets-list">
                  {CONTAMINATION_TYPES.geogenic.items.map((item) => (
                    <li key={item.name} className="gw-type-bullet-item">
                      <span className="gw-bullet-dot is-amber" />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Category 2: Anthropogenic Contamination */}
              <div
                className="gw-type-section is-anthropogenic"
                onClick={() => setActiveTypeCategory('anthropogenic')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTypeCategory('anthropogenic')}
                aria-label="View Anthropogenic Contamination details"
              >
                <div className="gw-type-header-row">
                  <div className="gw-type-icon-bubble is-anthropogenic">
                    <Factory size={18} className="gw-type-icon-red" />
                  </div>
                  <div className="gw-type-heading-text">
                    <span className="gw-type-name is-red">{CONTAMINATION_TYPES.anthropogenic.title}</span>
                    <span className="gw-type-sub">{CONTAMINATION_TYPES.anthropogenic.subtitle}</span>
                  </div>
                </div>

                <ul className="gw-type-bullets-list">
                  {CONTAMINATION_TYPES.anthropogenic.items.map((item) => (
                    <li key={item.name} className="gw-type-bullet-item">
                      <span className="gw-bullet-dot is-red" />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* ── CARD 2: COMMON CONTAMINANTS AND SOURCES (TABLE) ── */}
          <article className="gw-contam-card is-table-card" aria-label="Common Contaminants and Sources">
            <h2 className="gw-contam-card-title">Common Contaminants and Sources</h2>

            <div className="gw-table-wrapper" tabIndex={0} role="region" aria-label="Contaminants Data Table">
              <table className="gw-contam-data-table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '28%' }}>Contaminant</th>
                    <th scope="col" style={{ width: '38%' }}>Major Sources</th>
                    <th scope="col" style={{ width: '34%' }}>Effects</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMON_CONTAMINANTS.map((c) => (
                    <tr
                      key={c.name}
                      className={`gw-table-row ${selectedContaminant?.name === c.name ? 'is-selected' : ''}`}
                      onClick={() => setSelectedContaminant(c)}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedContaminant(c)}
                      aria-label={`${c.name}: sources ${c.majorSources}, effects ${c.effects}`}
                    >
                      <td className="gw-col-contaminant">
                        <div className="gw-badge-pill-cell">
                          {c.isCustomBadge ? (
                            <span
                              className="gw-table-circle-badge"
                              style={{ backgroundColor: c.badgeBg }}
                            >
                              {c.iconName === 'Biohazard' ? (
                                <Biohazard size={11} color={c.badgeText} />
                              ) : (
                                <FlaskConical size={11} color={c.badgeText} />
                              )}
                            </span>
                          ) : (
                            <span
                              className="gw-table-circle-badge"
                              style={{ backgroundColor: c.badgeBg, color: c.badgeText }}
                            >
                              {c.symbol}
                            </span>
                          )}
                          <span className="gw-contam-symbol-name">{c.name}</span>
                        </div>
                      </td>
                      <td className="gw-col-sources">{c.majorSources}</td>
                      <td className="gw-col-effects">{c.effects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* ── CARD 3: IMPACTS OF CONTAMINATION ── */}
          <article className="gw-contam-card is-impacts-card" aria-label="Impacts of Contamination">
            <h2 className="gw-contam-card-title">Impacts of Contamination</h2>

            <div className="gw-impacts-list">
              {CONTAMINATION_IMPACTS.map((impact) => {
                const isSelected = selectedImpact?.id === impact.id;
                return (
                  <div
                    key={impact.id}
                    className={`gw-impact-row-item ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setSelectedImpact(isSelected ? null : impact)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedImpact(isSelected ? null : impact)}
                    aria-label={`Impact: ${impact.title}`}
                  >
                    <div
                      className="gw-impact-icon-circle"
                      style={{
                        backgroundColor: impact.accentBg,
                        borderColor: impact.color,
                        boxShadow: `0 0 10px ${impact.accentBg}`,
                      }}
                    >
                      {impact.iconName === 'Heart' && <Heart size={15} style={{ color: impact.color }} />}
                      {impact.iconName === 'Leaf' && <Leaf size={15} style={{ color: impact.color }} />}
                      {impact.iconName === 'Droplets' && <Droplets size={15} style={{ color: impact.color }} />}
                      {impact.iconName === 'Coins' && <Coins size={15} style={{ color: impact.color }} />}
                      {impact.iconName === 'ShieldAlert' && <ShieldAlert size={15} style={{ color: impact.color }} />}
                    </div>

                    <div className="gw-impact-text-block">
                      <strong className="gw-impact-heading" style={{ color: '#ffffff' }}>
                        {impact.title}
                      </strong>
                      <p className="gw-impact-desc">{impact.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          {/* ── CARD 4: PREVENTION AND MANAGEMENT ── */}
          <article className="gw-contam-card is-prevention-card" aria-label="Prevention and Management">
            <h2 className="gw-contam-card-title">Prevention and Management</h2>

            <div className="gw-prevention-list">
              {PREVENTION_MEASURES.map((measure) => {
                const isSelected = selectedPrevention?.id === measure.id;
                return (
                  <div
                    key={measure.id}
                    className={`gw-prevention-row-item ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setSelectedPrevention(isSelected ? null : measure)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedPrevention(isSelected ? null : measure)}
                    aria-label={`Measure: ${measure.title}`}
                  >
                    <div
                      className="gw-prevention-icon-circle"
                      style={{
                        backgroundColor: measure.accentBg,
                        borderColor: measure.color,
                        boxShadow: `0 0 10px ${measure.accentBg}`,
                      }}
                    >
                      {measure.iconName === 'ShieldCheck' && <ShieldCheck size={14} style={{ color: measure.color }} />}
                      {measure.iconName === 'Sprout' && <Sprout size={14} style={{ color: measure.color }} />}
                      {measure.iconName === 'Factory' && <Factory size={14} style={{ color: measure.color }} />}
                      {measure.iconName === 'Activity' && <Activity size={14} style={{ color: measure.color }} />}
                      {measure.iconName === 'Shield' && <Shield size={14} style={{ color: measure.color }} />}
                      {measure.iconName === 'Users' && <Users size={14} style={{ color: measure.color }} />}
                    </div>

                    <p className="gw-prevention-title-text">{measure.title}</p>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </div>

      {/* ─── MODALS & DEEP-DIVE TECHNICAL OVERLAYS ─── */}

      {/* 1. Source Detail Modal */}
      {selectedSource && (
        <div className="gw-contam-modal-backdrop" onClick={() => setSelectedSource(null)}>
          <div
            className="gw-contam-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedSource.name}
            style={{ borderColor: selectedSource.borderColor }}
          >
            <div className="gw-modal-header" style={{ borderBottomColor: selectedSource.glowColor }}>
              <div className="gw-modal-title-wrap">
                <span className="gw-modal-kicker" style={{ color: selectedSource.borderColor }}>
                  {selectedSource.category}
                </span>
                <h3>{selectedSource.name}</h3>
              </div>
              <button
                type="button"
                className="gw-modal-close-btn"
                onClick={() => setSelectedSource(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="gw-modal-body">
              <p className="gw-modal-desc">{selectedSource.description}</p>

              <div className="gw-modal-section">
                <h4 className="gw-modal-section-title">Key Hazardous Pollutants</h4>
                <div className="gw-modal-tags-row">
                  {selectedSource.pollutants.map((p) => (
                    <span
                      key={p}
                      className="gw-modal-tag"
                      style={{
                        borderColor: selectedSource.borderColor,
                        backgroundColor: selectedSource.glowColor,
                        color: '#f8fafc',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="gw-modal-info-grid">
                <div className="gw-modal-info-block">
                  <span className="gw-modal-info-label">Health & Environmental Effects</span>
                  <p>{selectedSource.healthEffects}</p>
                </div>
                <div className="gw-modal-info-block">
                  <span className="gw-modal-info-label">Prevention & Engineering Solution</span>
                  <p>{selectedSource.managementAction}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Contaminant Detail Modal (Table Row Click) */}
      {selectedContaminant && (
        <div className="gw-contam-modal-backdrop" onClick={() => setSelectedContaminant(null)}>
          <div
            className="gw-contam-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedContaminant.name}
            style={{ borderColor: selectedContaminant.badgeBg }}
          >
            <div className="gw-modal-header">
              <div className="gw-modal-title-wrap">
                <span className="gw-modal-kicker" style={{ color: selectedContaminant.badgeBg }}>
                  CHEMICAL PARAMETER & HOTSPOT
                </span>
                <h3>{selectedContaminant.name} ({selectedContaminant.symbol})</h3>
              </div>
              <button
                type="button"
                className="gw-modal-close-btn"
                onClick={() => setSelectedContaminant(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="gw-modal-body">
              <div className="gw-modal-spec-cards">
                <div className="gw-spec-card">
                  <span className="gw-spec-label">Acceptable Limit (BIS 10500 / WHO)</span>
                  <strong className="gw-spec-val" style={{ color: selectedContaminant.badgeBg }}>
                    {selectedContaminant.acceptableLimit}
                  </strong>
                </div>
                <div className="gw-spec-card">
                  <span className="gw-spec-label">Indian Hotspot States</span>
                  <strong className="gw-spec-val" style={{ color: '#38bdf8' }}>
                    {selectedContaminant.indianHotspots}
                  </strong>
                </div>
              </div>

              <div className="gw-modal-info-grid" style={{ marginTop: '14px' }}>
                <div className="gw-modal-info-block">
                  <span className="gw-modal-info-label">Major Sources of Contamination</span>
                  <p>{selectedContaminant.majorSources}</p>
                </div>
                <div className="gw-modal-info-block">
                  <span className="gw-modal-info-label">Specific Health Consequences</span>
                  <p>{selectedContaminant.effects}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Contaminant Plume in Groundwater Modal */}
      {showPlumeModal && (
        <div className="gw-contam-modal-backdrop" onClick={() => setShowPlumeModal(false)}>
          <div
            className="gw-contam-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Contaminant Plume Hydrodynamics"
            style={{ borderColor: '#38bdf8' }}
          >
            <div className="gw-modal-header">
              <div className="gw-modal-title-wrap">
                <span className="gw-modal-kicker" style={{ color: '#38bdf8' }}>
                  AQUIFER HYDRODYNAMICS
                </span>
                <h3>Contaminant Plume in Groundwater</h3>
              </div>
              <button
                type="button"
                className="gw-modal-close-btn"
                onClick={() => setShowPlumeModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="gw-modal-body">
              <p className="gw-modal-desc">
                Once soluble contaminants penetrate the unsaturated soil zone and enter the water table,
                they disperse horizontally with regional groundwater flow gradients. This forms an elongated,
                migrating zone of degraded water termed a <strong>contaminant plume</strong>.
              </p>

              <div className="gw-plume-mechanisms-grid">
                <div className="gw-plume-mech-box">
                  <strong>1. Advection</strong>
                  <p>Pollutants are transported at the velocity of moving groundwater through pore channels.</p>
                </div>
                <div className="gw-plume-mech-box">
                  <strong>2. Dispersion & Diffusion</strong>
                  <p>Mechanical mixing and molecular diffusion cause the plume to spread laterally and vertically.</p>
                </div>
                <div className="gw-plume-mech-box">
                  <strong>3. Sorption & Attenuation</strong>
                  <p>Certain heavy metals bind to clay particles, temporarily retarding plume velocity.</p>
                </div>
              </div>

              <div className="gw-modal-alert is-info">
                <AlertTriangle size={18} className="gw-alert-icon" />
                <p>
                  <strong>Downstream Threat:</strong> Plumes continuously migrate towards municipal pumping borewells,
                  rivers, and wetlands, contaminating drinking supplies miles away from the initial surface spill.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Types Category Modal (Geogenic or Anthropogenic Details) */}
      {activeTypeCategory && (
        <div className="gw-contam-modal-backdrop" onClick={() => setActiveTypeCategory(null)}>
          <div
            className="gw-contam-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={CONTAMINATION_TYPES[activeTypeCategory].title}
            style={{ borderColor: CONTAMINATION_TYPES[activeTypeCategory].color }}
          >
            <div className="gw-modal-header">
              <div className="gw-modal-title-wrap">
                <span
                  className="gw-modal-kicker"
                  style={{ color: CONTAMINATION_TYPES[activeTypeCategory].color }}
                >
                  CATEGORY BREAKDOWN
                </span>
                <h3>
                  {CONTAMINATION_TYPES[activeTypeCategory].title}{' '}
                  {CONTAMINATION_TYPES[activeTypeCategory].subtitle}
                </h3>
              </div>
              <button
                type="button"
                className="gw-modal-close-btn"
                onClick={() => setActiveTypeCategory(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="gw-modal-body">
              <p className="gw-modal-desc">
                {CONTAMINATION_TYPES[activeTypeCategory].description}
              </p>

              <div className="gw-category-details-list">
                {CONTAMINATION_TYPES[activeTypeCategory].items.map((it) => (
                  <div key={it.name} className="gw-cat-item-card">
                    <strong style={{ color: CONTAMINATION_TYPES[activeTypeCategory].color }}>
                      {it.name}
                    </strong>
                    <p>{it.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Impacts Detail Modal */}
      {selectedImpact && (
        <div className="gw-contam-modal-backdrop" onClick={() => setSelectedImpact(null)}>
          <div
            className="gw-contam-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedImpact.title}
            style={{ borderColor: selectedImpact.color }}
          >
            <div className="gw-modal-header">
              <div className="gw-modal-title-wrap">
                <span className="gw-modal-kicker" style={{ color: selectedImpact.color }}>
                  ECOLOGICAL & SOCIO-ECONOMIC IMPACT
                </span>
                <h3>{selectedImpact.title}</h3>
              </div>
              <button
                type="button"
                className="gw-modal-close-btn"
                onClick={() => setSelectedImpact(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="gw-modal-body">
              <p className="gw-modal-desc">{selectedImpact.description}</p>
              <div className="gw-modal-alert is-info" style={{ marginTop: '12px' }}>
                <Info size={18} className="gw-alert-icon" />
                <p>{selectedImpact.extendedDetail}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Prevention Detail Modal */}
      {selectedPrevention && (
        <div className="gw-contam-modal-backdrop" onClick={() => setSelectedPrevention(null)}>
          <div
            className="gw-contam-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPrevention.title}
            style={{ borderColor: selectedPrevention.color }}
          >
            <div className="gw-modal-header">
              <div className="gw-modal-title-wrap">
                <span className="gw-modal-kicker" style={{ color: selectedPrevention.color }}>
                  REMEDIAL STRATEGY
                </span>
                <h3>{selectedPrevention.title}</h3>
              </div>
              <button
                type="button"
                className="gw-modal-close-btn"
                onClick={() => setSelectedPrevention(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="gw-modal-body">
              <div className="gw-modal-alert is-info">
                <CheckCircle2 size={18} className="gw-alert-icon" style={{ color: selectedPrevention.color }} />
                <p>{selectedPrevention.summary}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
