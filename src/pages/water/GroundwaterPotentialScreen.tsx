import React, { useState } from 'react';
import {
  Mountain,
  Sprout,
  Layers,
  Waves,
  Quote,
  X,
  ArrowUpRight,
  ChevronRight,
  Gem,
  CloudRain,
  Info,
} from 'lucide-react';
import {
  GW_REGIONS_DATA,
  GW_FACTORS_DATA,
  GroundwaterRegion,
} from './groundwaterPotentialData';
import { useModalScrollLock } from './useModalScrollLock';

export function GroundwaterPotentialScreen() {
  const [selectedRegion, setSelectedRegion] = useState<GroundwaterRegion | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [activeFactorId, setActiveFactorId] = useState<string | null>(null);

  // Modal scroll lock
  useModalScrollLock(Boolean(selectedRegion), () => setSelectedRegion(null));

  const activeFactor = GW_FACTORS_DATA.find((f) => f.id === activeFactorId);

  return (
    <section
      id="ch-10"
      className="chapter-section gw-potential-screen"
      style={{ scrollMarginTop: '80px' }}
      aria-label="Chapter 11: Groundwater Potential in India"
    >
      {/* ─── AMBIENT ATMOSPHERIC BACKDROP ─── */}
      <div className="gw-ambient-backdrop" aria-hidden="true" />

      {/* ─── UPPER STAGE: LEFT COL | CENTER 3D RELIEF MAP | RIGHT COL ─── */}
      <div className="gw-stage-top-row">
        {/* 1. LEFT COLUMN: TITLE BLOCK + KEY FACTORS CARD */}
        <div className="gw-stage-left-col">
          <header className="gw-potential-title-block">
            <span className="gw-potential-chapter-tag">CHAPTER 11</span>
            <h1 className="gw-potential-main-heading">
              Ground<span className="gw-potential-heading-glow">water</span>
              <br />
              <span className="gw-potential-sub-heading">Potential in India</span>
            </h1>
            <p className="gw-potential-header-description">
              India's groundwater potential varies across regions due to differences in geology, climate, rainfall,
              topography and land use. Understanding these regions helps in sustainable planning and management of
              groundwater resources.
            </p>
          </header>

          {/* KEY FACTORS AFFECTING POTENTIAL CARD */}
          <aside className="gw-stage-factors-card" aria-label="Key Factors Affecting Potential">
            <h3 className="stage-card-title">Key Factors Affecting Potential</h3>
            <div className="stage-factors-grid">
              {GW_FACTORS_DATA.map((factor) => {
                const isActive = activeFactorId === factor.id;
                return (
                  <div
                    key={factor.id}
                    className={`stage-factor-item ${isActive ? 'is-factor-active' : ''}`}
                    onClick={() => setActiveFactorId(isActive ? null : factor.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveFactorId(isActive ? null : factor.id)}
                    aria-label={`${factor.title}: ${factor.subtitle}`}
                  >
                    <div
                      className="stage-factor-icon-wrap"
                      style={{
                        background: `rgba(${factor.id === 'geology' ? '168, 85, 247' : factor.id === 'rainfall' ? '56, 189, 248' : factor.id === 'topography' ? '34, 197, 94' : '245, 158, 11'}, 0.22)`,
                        borderColor: factor.color,
                        color: factor.color,
                      }}
                    >
                      {factor.id === 'geology' && <Gem size={17} />}
                      {factor.id === 'rainfall' && <CloudRain size={17} />}
                      {factor.id === 'topography' && <Mountain size={17} />}
                      {factor.id === 'landuse' && <Sprout size={17} />}
                    </div>
                    <div className="stage-factor-copy">
                      <strong>{factor.title}</strong>
                      <span>{factor.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {activeFactor && (
              <div className="factor-expanded-desc">
                <Info size={13} style={{ color: activeFactor.color, flexShrink: 0, marginTop: 2 }} />
                <p>{activeFactor.desc}</p>
              </div>
            )}
          </aside>
        </div>

        {/* 2. CENTER MAP STAGE: FULLY VISIBLE 3D RELIEF MAP OF INDIA */}
        <div className="gw-stage-center-map" aria-label="3D Groundwater Potential Map of India">
          <div className="gw-map-canvas">
            <img
              src="/images/gw-potential-india-map.jpg"
              alt="3D geological relief map of India divided into 4 hydrogeological groundwater provinces"
              className="gw-map-render"
              loading="eager"
            />

            {/* Nautical Compass Rose */}
            <div className="gw-potential-compass" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M50 4 L56 44 L50 38 L44 44 Z" fill="#ffffff" />
                <path d="M50 96 L56 56 L50 62 L44 56 Z" fill="rgba(255,255,255,0.45)" />
                <path d="M96 50 L56 56 L62 50 L56 44 Z" fill="rgba(255,255,255,0.45)" />
                <path d="M4 50 L44 56 L38 50 L44 44 Z" fill="rgba(255,255,255,0.45)" />
                <circle cx="50" cy="50" r="3.5" fill="#38bdf8" />
                <text x="50" y="2" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="sans-serif">
                  N
                </text>
              </svg>
            </div>

            {/* Ocean Geographic Labels */}
            <div className="ocean-label ocean-arabian">
              <span>Arabian<br />Sea</span>
            </div>
            <div className="ocean-label ocean-bengal">
              <span>Bay of<br />Bengal</span>
            </div>
            <div className="ocean-label ocean-indian">
              <span>Indian Ocean</span>
            </div>

            {/* 4 Interactive Region Pins on 3D Map */}
            <div className="gw-potential-map-pins">
              {GW_REGIONS_DATA.map((region) => {
                const isHovered = hoveredRegionId === region.id;
                return (
                  <div
                    key={region.id}
                    className={`gw-map-region-pin pin-${region.id} ${isHovered ? 'is-pin-hovered' : ''}`}
                    style={{ left: region.badgeX, top: region.badgeY }}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegionId(region.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${region.title}`}
                  >
                    <div
                      className="gw-map-pin-pill"
                      style={{
                        background: isHovered
                          ? `rgba(${region.accentRgb}, 0.95)`
                          : `rgba(${region.accentRgb}, 0.72)`,
                        borderColor: '#ffffff',
                        boxShadow: isHovered
                          ? `0 0 20px rgba(${region.accentRgb}, 0.85), 0 4px 12px rgba(0,0,0,0.6)`
                          : `0 0 12px rgba(${region.accentRgb}, 0.4), 0 2px 8px rgba(0,0,0,0.5)`,
                      }}
                    >
                      <span className="gw-map-pin-title">{region.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. RIGHT COLUMN: QUOTE CARD + INDIA'S GROUNDWATER REGIONS CARD */}
        <div className="gw-stage-right-col">
          <aside className="gw-potential-quote-card" aria-label="Regional hydrogeology quote">
            <div className="gw-potential-quote-mark" aria-hidden="true">
              <Quote size={24} />
            </div>
            <blockquote className="gw-potential-quote-text">
              “Groundwater potential in India is highest in alluvial regions and varies significantly across geological
              and climatic zones.”
            </blockquote>
          </aside>

          <aside className="gw-stage-regions-card" aria-label="India's Groundwater Regions Selection">
            <h3 className="stage-card-title">India's Groundwater Regions</h3>
            <div className="stage-regions-list">
              {GW_REGIONS_DATA.map((region) => {
                const isHovered = hoveredRegionId === region.id;
                return (
                  <div
                    key={region.id}
                    className={`stage-region-row ${isHovered ? 'is-row-active' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegionId(region.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedRegion(region)}
                  >
                    <div
                      className="stage-region-icon-box"
                      style={{
                        background: `rgba(${region.accentRgb}, 0.22)`,
                        borderColor: region.color,
                        color: region.color,
                      }}
                    >
                      {region.id === 'himalayan' && <Mountain size={16} />}
                      {region.id === 'alluvial' && <Sprout size={16} />}
                      {region.id === 'peninsular' && <Layers size={16} />}
                      {region.id === 'coastal' && <Waves size={16} />}
                    </div>
                    <div className="stage-region-text">
                      <strong>{region.title}</strong>
                      <p>{region.shortSummary}</p>
                    </div>
                    <ChevronRight size={15} className="stage-region-arrow" />
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>

      {/* ─── 4. BOTTOM ROW: 4 REGIONAL CARDS ─── */}
      <div className="gw-potential-bottom-grid">
        {GW_REGIONS_DATA.map((region) => {
          const isHovered = hoveredRegionId === region.id;
          return (
            <div
              key={region.id}
              className={`gw-region-card card-${region.id} ${isHovered ? 'is-card-highlighted' : ''}`}
              style={{
                borderColor: isHovered ? region.color : `rgba(${region.accentRgb}, 0.35)`,
                boxShadow: isHovered
                  ? `0 14px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(${region.accentRgb}, 0.45)`
                  : '0 8px 20px rgba(0, 0, 0, 0.55)',
              }}
              onClick={() => setSelectedRegion(region)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedRegion(region)}
            >
              {/* Regional Card Header */}
              <div className="region-card-top">
                <div
                  className="region-card-icon-pill"
                  style={{
                    background: `rgba(${region.accentRgb}, 0.22)`,
                    borderColor: region.color,
                    color: region.color,
                  }}
                >
                  {region.id === 'himalayan' && <Mountain size={14} />}
                  {region.id === 'alluvial' && <Sprout size={14} />}
                  {region.id === 'peninsular' && <Layers size={14} />}
                  {region.id === 'coastal' && <Waves size={14} />}
                </div>
                <h2 className="region-card-heading">{region.title}</h2>
              </div>

              {/* Regional High-Res Thumbnail Image */}
              <div className="region-card-img-wrap">
                <img src={region.image} alt={region.title} className="region-card-img" loading="lazy" />
                <span className="region-tag-overlay">{region.tag}</span>
              </div>

              {/* Bullets */}
              <ul className="region-card-bullets">
                {region.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className="region-bullet-dot" style={{ background: region.color }} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Potential Meter Gauge */}
              <div className="region-potential-meter">
                <span className="meter-caption">Groundwater Potential</span>
                <div className="meter-track">
                  <div
                    className="meter-fill"
                    style={{
                      width: `${region.potentialPct}%`,
                      background: `linear-gradient(90deg, rgba(${region.accentRgb}, 0.4) 0%, ${region.color} 100%)`,
                      boxShadow: `0 0 8px ${region.color}`,
                    }}
                  />
                </div>
                <strong className="meter-level" style={{ color: '#ffffff' }}>
                  {region.potentialLevel}
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── MODAL: DETAILED GEOLOGICAL REGION DEEP-DIVE ─── */}
      {selectedRegion && (
        <div className="ilr-modal-backdrop" onClick={() => setSelectedRegion(null)} role="dialog" aria-modal="true">
          <div className="ilr-modal-content liquid-glass" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ilr-modal-close-btn"
              onClick={() => setSelectedRegion(null)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="ilr-modal-body" data-lenis-prevent>
              <span
                className="ilr-modal-tag"
                style={{
                  background: `rgba(${selectedRegion.accentRgb}, 0.15)`,
                  borderColor: selectedRegion.color,
                  color: selectedRegion.color,
                }}
              >
                {selectedRegion.tag.toUpperCase()}
              </span>

              <h3 className="ilr-modal-title" style={{ marginTop: '8px', color: '#ffffff' }}>
                {selectedRegion.title}
              </h3>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '22px' }}>
                <img
                  src={selectedRegion.image}
                  alt={selectedRegion.title}
                  style={{
                    width: '260px',
                    height: '160px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: `1px solid rgba(${selectedRegion.accentRgb}, 0.3)`,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: '1.6', margin: '0 0 10px 0' }}>
                    {selectedRegion.geologySummary}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
                    <strong>Precipitation & Infiltration:</strong> {selectedRegion.rainfallSnow}
                  </p>
                </div>
              </div>

              {/* 4 Stat Boxes */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <div className="ilr-stat-box">
                  <small>Territorial Share</small>
                  <strong style={{ color: selectedRegion.color }}>{selectedRegion.keyFacts.areaShare}</strong>
                </div>
                <div className="ilr-stat-box">
                  <small>Aquifer Matrix</small>
                  <strong style={{ fontSize: '0.78rem' }}>{selectedRegion.keyFacts.aquiferType}</strong>
                </div>
                <div className="ilr-stat-box">
                  <small>Recharge Dynamic</small>
                  <strong style={{ fontSize: '0.78rem' }}>{selectedRegion.keyFacts.rechargeRate}</strong>
                </div>
                <div className="ilr-stat-box">
                  <small>Primary Vulnerability</small>
                  <strong style={{ fontSize: '0.78rem', color: '#f87171' }}>{selectedRegion.keyFacts.vulnerability}</strong>
                </div>
              </div>

              {/* Syllabus Context Notes */}
              <div className="ilr-modal-context" style={{ borderLeftColor: selectedRegion.color }}>
                <h4 style={{ color: selectedRegion.color, margin: '0 0 8px 0', fontSize: '0.92rem' }}>
                  Course Syllabus Insights (BCV755B Module 2)
                </h4>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {selectedRegion.detailedNotes.map((note) => (
                    <li key={note} style={{ marginBottom: '6px' }}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ilr-modal-footer">
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Course: Conservation of Natural Resources BCV755B · Part 10
              </span>
              <button
                type="button"
                className="ilr-modal-action-btn"
                onClick={() => setSelectedRegion(null)}
                style={{ background: selectedRegion.color, color: '#061922' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
