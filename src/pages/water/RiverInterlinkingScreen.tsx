import React, { useState, useId } from 'react';
import {
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Waves,
  Mountain,
  Droplets,
  Sprout,
  Wheat,
  Sliders,
  Users,
  ChevronRight,
  ExternalLink,
  X,
  Info,
  Layers,
  ArrowUpRight,
  Quote,
} from 'lucide-react';
import {
  INDIA_STATE_POLYGONS,
  INDIA_FRONTIER_PATHS,
  INDIA_STATE_BORDERS,
  NEIGHBOR_COUNTRY_PATHS,
  COASTLINE_PATHS,
} from '../../data/indiaVectorMapData';
import {
  ILRLink,
  ILRRiverNode,
  HIMALAYAN_LINKS,
  PENINSULAR_LINKS,
  ALL_ILR_LINKS,
  ILR_RIVER_NODES,
  ILR_ALL_MERITS,
  ILR_ALL_DEMERITS,
} from './riverInterlinkingData';
import { useModalScrollLock } from './useModalScrollLock';

export function RiverInterlinkingScreen() {
  const componentId = useId().replace(/:/g, '');
  const [filterMode, setFilterMode] = useState<'all' | 'himalayan' | 'peninsular'>('all');
  const [selectedLink, setSelectedLink] = useState<ILRLink | null>(null);
  const [hoveredLink, setHoveredLink] = useState<ILRLink | null>(null);
  const [selectedRiver, setSelectedRiver] = useState<ILRRiverNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeModal, setActiveModal] = useState<'merits' | 'demerits' | 'ken-betwa' | 'godavari-krishna' | 'links-list' | null>(null);

  // Modal scroll lock
  useModalScrollLock(Boolean(activeModal), () => setActiveModal(null));

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.6, +(z + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.85, +(z - 0.15).toFixed(2)));
  const handleResetZoom = () => setZoomLevel(1);

  // Filter links
  const visibleLinks = ALL_ILR_LINKS.filter((link) => {
    if (filterMode === 'all') return true;
    return link.component === filterMode;
  });

  const activeLink = hoveredLink || selectedLink;

  return (
    <section
      id="ch-08"
      className="chapter-section river-interlinking-screen"
      aria-label="Chapter 09: Interlinking of Rivers"
    >
      {/* ─── PANORAMIC ATMOSPHERIC BACKDROP ─── */}
      <div className="ilr-backdrop-layer" aria-hidden="true">
        <img
          src="/images/water-interlinking-bg.jpg"
          alt=""
          className="ilr-bg-image"
          loading="lazy"
        />
        <div className="ilr-vignette-overlay" />
        <div className="ilr-grid-subtle-glow" />
        <div className="ilr-scrim-left" />
        <div className="ilr-scrim-top" />
      </div>

      <div className="ilr-container">
        {/* ─── TOP HEADER BAR ─── */}
        <header className="ilr-header-row">
          <div className="ilr-title-block">
            <span className="ilr-chapter-tag">CHAPTER 09</span>
            <h1 className="ilr-main-heading">
              Interlinking <br />
              <span className="ilr-heading-highlight">of Rivers</span>
            </h1>
            <p className="ilr-header-description">
              The Interlinking of Rivers (ILR) is a mega project to connect surplus and deficit river basins
              through a network of reservoirs, canals and link channels to achieve better water distribution across India.
            </p>
          </div>

          <aside className="ilr-quote-card liquid-glass" aria-label="Expert insight">
            <div className="ilr-quote-mark" aria-hidden="true">
              <Quote size={28} />
            </div>
            <blockquote className="ilr-quote-text">
              “Interlinking of rivers can help balance water availability across regions, but it also requires careful assessment of ecological, social and economic impacts.”
            </blockquote>
          </aside>
        </header>

        {/* ─── MAIN STAGE GRID (Left Column, Center Map, Right Column) ─── */}
        <div className="ilr-stage-layout">
          {/* ─── LEFT COLUMN: COMPONENTS OF THE PROJECT ─── */}
          <aside className="ilr-left-col">
            <div className="ilr-glass-card ilr-components-card">
              <div className="ilr-card-header">
                <Layers size={18} className="ilr-card-icon" />
                <h2>Components of the Project</h2>
              </div>

              {/* Subcard 1: Himalayan Component */}
              <div
                className={`ilr-component-subcard ilr-subcard-himalayan ${
                  filterMode === 'himalayan' ? 'is-active-filter' : ''
                }`}
                onClick={() => setFilterMode(filterMode === 'himalayan' ? 'all' : 'himalayan')}
                role="button"
                tabIndex={0}
                aria-pressed={filterMode === 'himalayan'}
                onKeyDown={(e) => e.key === 'Enter' && setFilterMode(filterMode === 'himalayan' ? 'all' : 'himalayan')}
              >
                <div className="ilr-subcard-top">
                  <div className="ilr-icon-badge himalayan-icon-badge">
                    <Mountain size={20} />
                  </div>
                  <div className="ilr-subcard-title-wrap">
                    <h3>Himalayan Component</h3>
                    <span className="ilr-link-count-pill himalayan-pill">14 Links</span>
                  </div>
                </div>
                <ul className="ilr-bullet-list">
                  <li>Links major rivers of the Himalayan region</li>
                  <li>Focuses on surplus rivers (Ganga, Brahmaputra and their tributaries)</li>
                  <li>Involves storage and transfer to water-deficit basins</li>
                </ul>
                <div className="ilr-subcard-action-bar">
                  <span className="ilr-filter-hint">
                    {filterMode === 'himalayan' ? 'Showing Himalayan on map' : 'Click to filter map'}
                  </span>
                  <button
                    type="button"
                    className="ilr-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModal('links-list');
                    }}
                  >
                    View All 14 Links <ChevronRight size={13} />
                  </button>
                </div>
              </div>

              {/* Subcard 2: Peninsular Component */}
              <div
                className={`ilr-component-subcard ilr-subcard-peninsular ${
                  filterMode === 'peninsular' ? 'is-active-filter' : ''
                }`}
                onClick={() => setFilterMode(filterMode === 'peninsular' ? 'all' : 'peninsular')}
                role="button"
                tabIndex={0}
                aria-pressed={filterMode === 'peninsular'}
                onKeyDown={(e) => e.key === 'Enter' && setFilterMode(filterMode === 'peninsular' ? 'all' : 'peninsular')}
              >
                <div className="ilr-subcard-top">
                  <div className="ilr-icon-badge peninsular-icon-badge">
                    <Waves size={20} />
                  </div>
                  <div className="ilr-subcard-title-wrap">
                    <h3>Peninsular Component</h3>
                    <span className="ilr-link-count-pill peninsular-pill">16 Links</span>
                  </div>
                </div>
                <ul className="ilr-bullet-list">
                  <li>Links rivers of the peninsular region</li>
                  <li>Connects west-flowing and east-flowing rivers</li>
                  <li>Focuses on water transfer within peninsular India to address regional deficits</li>
                </ul>
                <div className="ilr-subcard-action-bar">
                  <span className="ilr-filter-hint">
                    {filterMode === 'peninsular' ? 'Showing Peninsular on map' : 'Click to filter map'}
                  </span>
                  <button
                    type="button"
                    className="ilr-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModal('links-list');
                    }}
                  >
                    View All 16 Links <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* ─── CENTER STAGE: INTERACTIVE RIVER INTERLINKING MAP ─── */}
          <main className="ilr-center-col" aria-label="Interactive Interlinking of Rivers Vector Map">
            <div className="ilr-map-viewport liquid-glass">
              {/* Floating Top Legend Pill */}
              <div className="ilr-map-legend-pill">
                <div className="ilr-legend-item">
                  <span className="ilr-legend-bar himalayan-bar" />
                  <span>Himalayan Component (14 Links)</span>
                </div>
                <div className="ilr-legend-item">
                  <span className="ilr-legend-bar peninsular-bar" />
                  <span>Peninsular Component (16 Links)</span>
                </div>
              </div>

              {/* Floating Compass Rose */}
              <div className="ilr-compass-badge" title="Map orientation: North Up">
                <Compass size={22} className="ilr-compass-icon" />
                <div className="ilr-compass-labels">
                  <span className="compass-n">N</span>
                  <span className="compass-e">E</span>
                  <span className="compass-s">S</span>
                  <span className="compass-w">W</span>
                </div>
              </div>

              {/* Floating Zoom Controls */}
              <div className="ilr-map-zoom-tools">
                <button
                  type="button"
                  className="ilr-zoom-btn"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={15} />
                </button>
                <button
                  type="button"
                  className="ilr-zoom-btn"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={15} />
                </button>
                <button
                  type="button"
                  className="ilr-zoom-btn"
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  aria-label="Reset zoom"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Floating Filter Radio Widget */}
              <div className="ilr-map-filter-widget" role="radiogroup" aria-label="Filter River Links">
                <button
                  type="button"
                  className={`ilr-filter-option ${filterMode === 'all' ? 'is-selected' : ''}`}
                  onClick={() => setFilterMode('all')}
                  role="radio"
                  aria-checked={filterMode === 'all'}
                >
                  <span className="ilr-radio-circle" />
                  <span>Show All Links</span>
                </button>

                <button
                  type="button"
                  className={`ilr-filter-option ${filterMode === 'himalayan' ? 'is-selected' : ''}`}
                  onClick={() => setFilterMode('himalayan')}
                  role="radio"
                  aria-checked={filterMode === 'himalayan'}
                >
                  <span className="ilr-radio-circle himalayan-radio" />
                  <span>Himalayan Component</span>
                </button>

                <button
                  type="button"
                  className={`ilr-filter-option ${filterMode === 'peninsular' ? 'is-selected' : ''}`}
                  onClick={() => setFilterMode('peninsular')}
                  role="radio"
                  aria-checked={filterMode === 'peninsular'}
                >
                  <span className="ilr-radio-circle peninsular-radio" />
                  <span>Peninsular Component</span>
                </button>
              </div>

              {/* SVG 3D-Style Map Surface */}
              <div
                className="ilr-svg-stage-container"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                <svg
                  viewBox="0 0 680 740"
                  className="ilr-svg-stage"
                  aria-label="India National River Linking Network"
                >
                  <defs>
                    {/* Glowing Filters */}
                    <filter id={`himalayan-glow-${componentId}`} x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id={`peninsular-glow-${componentId}`} x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Ocean Bathymetry Radial Gradient */}
                    <radialGradient id={`ocean-bg-${componentId}`} cx="50%" cy="54%" r="58%">
                      <stop offset="0%" stopColor="#082333" stopOpacity="0.8" />
                      <stop offset="65%" stopColor="#04111a" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#020609" stopOpacity="1" />
                    </radialGradient>

                    {/* India Subcontinent Topographic Relief Shader */}
                    <linearGradient id={`india-land-grad-${componentId}`} x1="20%" y1="0%" x2="70%" y2="100%">
                      <stop offset="0%" stopColor="#1a3f5c" stopOpacity="0.96" />
                      <stop offset="25%" stopColor="#123247" stopOpacity="0.94" />
                      <stop offset="60%" stopColor="#0b2434" stopOpacity="0.92" />
                      <stop offset="100%" stopColor="#071b26" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  {/* ─── LAYER 0: OCEANIC DEPTH BACKDROP ─── */}
                  <rect width="680" height="740" rx="18" fill={`url(#ocean-bg-${componentId})`} />

                  {/* Ocean Bathymetric Depth Shelf Contours */}
                  <path
                    d="M 10 320 Q 80 420 120 540 T 260 700 Q 320 730 420 660 T 560 520 Q 640 440 670 380"
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.1)"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 25 350 Q 95 440 135 550 T 270 690 Q 320 710 410 645 T 545 505 Q 615 435 650 370"
                    fill="none"
                    stroke="rgba(127, 208, 224, 0.18)"
                    strokeWidth="2.5"
                    strokeDasharray="6 8"
                  />

                  {/* Oceanic Regional Labels */}
                  <text x="65" y="580" fill="rgba(127, 208, 224, 0.42)" fontSize="11" fontWeight="600" letterSpacing="0.22em">
                    ARABIAN SEA
                  </text>
                  <text x="495" y="580" fill="rgba(127, 208, 224, 0.42)" fontSize="11" fontWeight="600" letterSpacing="0.22em">
                    BAY OF BENGAL
                  </text>
                  <text x="250" y="725" fill="rgba(127, 208, 224, 0.35)" fontSize="9.5" fontWeight="600" letterSpacing="0.2em">
                    INDIAN OCEAN
                  </text>

                  {/* ─── LAYER 1: SUBCONTINENT GEOGRAPHIC VECTORS ─── */}
                  <g transform="translate(22, 31) scale(0.44)" className="subcontinent-base-geometry">
                    {/* Neighboring Countries */}
                    <g className="neighboring-countries-group">
                      {NEIGHBOR_COUNTRY_PATHS.map((p, idx) => (
                        <path
                          key={`neighbor-${idx}`}
                          d={p.d}
                          fill="rgba(255, 255, 255, 0.022)"
                          stroke="rgba(127, 208, 224, 0.14)"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />
                      ))}
                    </g>

                    {/* Official Indian States & Union Territories (Base Landmass) */}
                    <g className="india-states-landmass-group">
                      {INDIA_STATE_POLYGONS.map((p, idx) => (
                        <path
                          key={`state-${idx}`}
                          d={p.d}
                          fill={`url(#india-land-grad-${componentId})`}
                          stroke="rgba(127, 208, 224, 0.32)"
                          strokeWidth="1.4"
                          className="india-state-vector-path"
                        />
                      ))}

                      {/* Disputed & Northern Frontier Boundaries (Ladakh, Kashmir, Arunachal) */}
                      {INDIA_FRONTIER_PATHS.map((p, idx) => (
                        <path
                          key={`frontier-${idx}`}
                          d={p.d}
                          fill={`url(#india-land-grad-${componentId})`}
                          stroke="rgba(56, 189, 248, 0.55)"
                          strokeWidth="1.6"
                        />
                      ))}
                    </g>

                    {/* Internal Indian State Boundaries */}
                    <g className="india-state-borders-group">
                      {INDIA_STATE_BORDERS.map((p, idx) => (
                        <path
                          key={`border-${idx}`}
                          d={p.d}
                          fill="none"
                          stroke="rgba(127, 208, 224, 0.22)"
                          strokeWidth="1"
                          strokeDasharray="2 4"
                        />
                      ))}
                    </g>

                    {/* Coastline Glow Accent */}
                    <g className="india-coastline-group">
                      {COASTLINE_PATHS.map((p, idx) => (
                        <path
                          key={`coast-${idx}`}
                          d={p.d}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.2"
                          strokeOpacity="0.8"
                          filter={`url(#peninsular-glow-${componentId})`}
                        />
                      ))}
                    </g>
                  </g>

                  {/* ─── GLOWING INTERLINKING CANAL PATHS ─── */}
                  <g className="ilr-map-links-layer">
                    {visibleLinks.map((link) => {
                      const isHim = link.component === 'himalayan';
                      const isHovered = activeLink?.id === link.id;
                      const strokeColor = isHim ? '#f43f5e' : '#38bdf8';
                      const strokeWidth = isHovered ? 4.5 : 2.5;

                      return (
                        <g
                          key={link.id}
                          className={`ilr-link-svg-group ${isHovered ? 'is-active-link' : ''}`}
                          onMouseEnter={() => setHoveredLink(link)}
                          onMouseLeave={() => setHoveredLink(null)}
                          onClick={() => setSelectedLink(link)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Background Glow halo */}
                          <path
                            d={link.path}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth + 5}
                            strokeOpacity={isHovered ? 0.6 : 0.25}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter={isHim ? `url(#himalayan-glow-${componentId})` : `url(#peninsular-glow-${componentId})`}
                          />

                          {/* Animated Core Path */}
                          <path
                            d={link.path}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={isHovered ? '6 4' : 'none'}
                            strokeLinecap="round"
                            className={isHovered ? 'ilr-link-flowing' : ''}
                          />

                          {/* Start & End Link Connection Nodes */}
                          <circle
                            cx={link.nodeFrom.x}
                            cy={link.nodeFrom.y}
                            r={isHovered ? 5 : 3.5}
                            fill="#ffffff"
                            stroke={strokeColor}
                            strokeWidth="2"
                          />
                          <circle
                            cx={link.nodeTo.x}
                            cy={link.nodeTo.y}
                            r={isHovered ? 5 : 3.5}
                            fill="#ffffff"
                            stroke={strokeColor}
                            strokeWidth="2"
                          />
                        </g>
                      );
                    })}
                  </g>

                  {/* ─── MAJOR RIVER NODES & LABELS ─── */}
                  <g className="ilr-map-river-labels">
                    {ILR_RIVER_NODES.map((r) => {
                      const isSelected = selectedRiver?.id === r.id;
                      return (
                        <g
                          key={r.id}
                          transform={`translate(${r.x}, ${r.y})`}
                          className={`ilr-river-node-marker ${isSelected ? 'is-active' : ''}`}
                          onClick={() => setSelectedRiver(isSelected ? null : r)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle
                            r="5"
                            fill="#0284c7"
                            stroke="#e0f2fe"
                            strokeWidth="2"
                            className="ilr-node-pulse"
                          />
                          {/* Dynamic Label Pill */}
                          <rect
                            x={-(Math.max(54, r.name.length * 7.2 + 14) / 2)}
                            y="-24"
                            width={Math.max(54, r.name.length * 7.2 + 14)}
                            height="18"
                            rx="9"
                            fill="rgba(6, 17, 32, 0.92)"
                            stroke={isSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.5)'}
                            strokeWidth={isSelected ? '1.5' : '1'}
                          />
                          <text
                            x="0"
                            y="-12"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                            fontSize="10"
                            fontWeight="600"
                            fontFamily="Inter, system-ui, sans-serif"
                          >
                            {r.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Floating Link Detail HUD on hover/click */}
              {activeLink && (
                <div className="ilr-active-link-hud liquid-glass">
                  <div className="ilr-hud-top">
                    <span
                      className={`ilr-hud-badge ${
                        activeLink.component === 'himalayan' ? 'himalayan-pill' : 'peninsular-pill'
                      }`}
                    >
                      {activeLink.component === 'himalayan' ? 'Himalayan Grid' : 'Peninsular Grid'}
                    </span>
                    <span className="ilr-hud-status">{activeLink.status}</span>
                  </div>
                  <h4 className="ilr-hud-title">{activeLink.name}</h4>
                  <p className="ilr-hud-desc">{activeLink.description}</p>
                  <div className="ilr-hud-stats">
                    <div className="ilr-stat-item">
                      <span className="ilr-stat-label">Length</span>
                      <strong className="ilr-stat-value">{activeLink.lengthKm} km</strong>
                    </div>
                    <div className="ilr-stat-item">
                      <span className="ilr-stat-label">Transfer Yield</span>
                      <strong className="ilr-stat-value">{activeLink.waterTransferBCM} BCM/yr</strong>
                    </div>
                    <div className="ilr-stat-item">
                      <span className="ilr-stat-label">States</span>
                      <strong className="ilr-stat-value">{activeLink.states.join(', ')}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* ─── RIGHT COLUMN: MAJOR OBJECTIVES ─── */}
          <aside className="ilr-right-col">
            <div className="ilr-glass-card ilr-objectives-card">
              <div className="ilr-card-header">
                <Droplets size={18} className="ilr-card-icon" />
                <h2>Major Objectives</h2>
              </div>

              <div className="ilr-objectives-list">
                <div className="ilr-objective-item">
                  <div className="ilr-obj-icon obj-icon-cyan">
                    <Droplets size={19} />
                  </div>
                  <div className="ilr-obj-text">
                    <strong>Transfer surplus water to deficit basins</strong>
                    <span>Mitigates severe regional water shortages across drought zones.</span>
                  </div>
                </div>

                <div className="ilr-objective-item">
                  <div className="ilr-obj-icon obj-icon-green">
                    <Sprout size={19} />
                  </div>
                  <div className="ilr-obj-text">
                    <strong>Reduce floods and droughts</strong>
                    <span>Protects ~40 M Ha from floods and ~86 million people from drought.</span>
                  </div>
                </div>

                <div className="ilr-objective-item">
                  <div className="ilr-obj-icon obj-icon-amber">
                    <Wheat size={19} />
                  </div>
                  <div className="ilr-obj-text">
                    <strong>Increase irrigation & agricultural productivity</strong>
                    <span>Expands irrigated area by 35 M Ha, boosting food grains by up to 450 MT.</span>
                  </div>
                </div>

                <div className="ilr-objective-item">
                  <div className="ilr-obj-icon obj-icon-blue">
                    <Sliders size={19} />
                  </div>
                  <div className="ilr-obj-text">
                    <strong>Enhance water security & regional development</strong>
                    <span>Generates 34,000–40,000 MW hydro power and 10,880 km navigation.</span>
                  </div>
                </div>

                <div className="ilr-objective-item">
                  <div className="ilr-obj-icon obj-icon-purple">
                    <Users size={19} />
                  </div>
                  <div className="ilr-obj-text">
                    <strong>Support drinking water, industrial & ecological needs</strong>
                    <span>Supplies drinking water to 116 districts and combats saltwater intrusion.</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ─── BOTTOM ROW: 3 CARDS (Key Examples, Merits, Demerits) ─── */}
        <div className="ilr-bottom-row">
          {/* Card 1: Key Examples of Links */}
          <div className="ilr-glass-card ilr-examples-card">
            <div className="ilr-card-header">
              <h2>Key Examples of Links</h2>
            </div>

            <div className="ilr-examples-grid">
              {/* Ken–Betwa Link */}
              <div
                className="ilr-example-subcard"
                onClick={() => setActiveModal('ken-betwa')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveModal('ken-betwa')}
              >
                <div className="ilr-example-img-wrap">
                  <img
                    src="/images/ibwt-ken-betwa.jpg"
                    alt="Ken–Betwa Link project barrage discharging water"
                    className="ilr-example-photo"
                    loading="lazy"
                  />
                  <div className="ilr-example-badges">
                    <span className="ilr-link-count-pill himalayan-pill">Himalayan / Peninsular</span>
                    <span className="ilr-status-badge in-progress-badge">In Progress</span>
                  </div>
                </div>
                <div className="ilr-example-info">
                  <h3>Ken–Betwa Link</h3>
                  <p>Connects Ken (Yamuna basin) to Betwa (Yamuna basin)</p>
                  <span className="ilr-card-view-link">
                    Explore Engineering Blueprint <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>

              {/* Godavari–Krishna Link */}
              <div
                className="ilr-example-subcard"
                onClick={() => setActiveModal('godavari-krishna')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveModal('godavari-krishna')}
              >
                <div className="ilr-example-img-wrap">
                  <img
                    src="/images/ibwt-godavari-krishna.jpg"
                    alt="Godavari–Krishna Link canal through irrigated agricultural fields"
                    className="ilr-example-photo"
                    loading="lazy"
                  />
                  <div className="ilr-example-badges">
                    <span className="ilr-link-count-pill peninsular-pill">Peninsular Component</span>
                    <span className="ilr-status-badge operational-badge">Operational (Pattiseema)</span>
                  </div>
                </div>
                <div className="ilr-example-info">
                  <h3>Godavari–Krishna Link</h3>
                  <p>Transfers surplus water from Godavari basin to Krishna basin</p>
                  <span className="ilr-card-view-link">
                    Explore Pattiseema Case Study <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Merits (Advantages) */}
          <div className="ilr-glass-card ilr-merits-card">
            <div className="ilr-card-header ilr-header-merits">
              <h2>Merits (Advantages)</h2>
              <span className="ilr-pill-badge green-badge">18 Points in Notes</span>
            </div>

            <ul className="ilr-points-list merits-list">
              <li>
                <CheckCircle2 size={16} className="ilr-merit-check" />
                <span>Better water availability across regions</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="ilr-merit-check" />
                <span>Reduces floods and droughts</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="ilr-merit-check" />
                <span>Increases agricultural production (250 to 450 MT)</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="ilr-merit-check" />
                <span>Supports drinking water and industry</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="ilr-merit-check" />
                <span>Promotes regional development</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="ilr-merit-check" />
                <span>Improves inland navigation potential</span>
              </li>
            </ul>

            <button
              type="button"
              className="ilr-modal-trigger-btn merits-trigger-btn"
              onClick={() => setActiveModal('merits')}
            >
              Explore All 18 Merits from Course Syllabus <ChevronRight size={14} />
            </button>
          </div>

          {/* Card 3: Demerits (Concerns) */}
          <div className="ilr-glass-card ilr-demerits-card">
            <div className="ilr-card-header ilr-header-demerits">
              <h2>Demerits (Concerns)</h2>
              <span className="ilr-pill-badge red-badge">14 Points in Notes</span>
            </div>

            <ul className="ilr-points-list demerits-list">
              <li>
                <AlertTriangle size={16} className="ilr-demerit-warn" />
                <span>High cost and long implementation time</span>
              </li>
              <li>
                <AlertTriangle size={16} className="ilr-demerit-warn" />
                <span>Environmental and ecological impacts</span>
              </li>
              <li>
                <AlertTriangle size={16} className="ilr-demerit-warn" />
                <span>Displacement of local communities</span>
              </li>
              <li>
                <AlertTriangle size={16} className="ilr-demerit-warn" />
                <span>Inter-state water sharing disputes</span>
              </li>
              <li>
                <AlertTriangle size={16} className="ilr-demerit-warn" />
                <span>Challenges in execution and maintenance</span>
              </li>
              <li>
                <AlertTriangle size={16} className="ilr-demerit-warn" />
                <span>Alteration of natural river systems</span>
              </li>
            </ul>

            <button
              type="button"
              className="ilr-modal-trigger-btn demerits-trigger-btn"
              onClick={() => setActiveModal('demerits')}
            >
              Explore All 14 Demerits from Course Syllabus <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── MODAL DIALOGS (Ken-Betwa, Godavari-Krishna, Merits, Demerits, Full Link Directory) ─── */}
      {activeModal && (
        <div className="ilr-modal-backdrop" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
          <div className="ilr-modal-content liquid-glass" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ilr-modal-close-btn"
              onClick={() => setActiveModal(null)}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {/* Modal Content: Ken-Betwa Link */}
            {activeModal === 'ken-betwa' && (
              <div className="ilr-modal-body">
                <span className="ilr-modal-tag himalayan-pill">Flagship National Project</span>
                <h3 className="ilr-modal-title">Ken–Betwa Interlinking Project (KBIP)</h3>
                <img
                  src="/images/ibwt-ken-betwa.jpg"
                  alt="Ken-Betwa Daudhan Dam"
                  className="ilr-modal-banner"
                />
                <div className="ilr-modal-text">
                  <p>
                    The <strong>Ken–Betwa Link Project</strong> is India’s first river interlinking project implemented under the
                    National Perspective Plan. It transfers surplus water from the <strong>Ken River</strong> in Madhya Pradesh
                    to the water-deficit <strong>Betwa River</strong> in Uttar Pradesh.
                  </p>
                  <div className="ilr-facts-grid">
                    <div className="ilr-fact-box">
                      <span>Daudhan Dam</span>
                      <strong>77 m High</strong>
                      <small>Built across Ken River inside Chhatarpur</small>
                    </div>
                    <div className="ilr-fact-box">
                      <span>Canal Length</span>
                      <strong>221 km Concrete Conduit</strong>
                      <small>Includes a 2-km pressure tunnel</small>
                    </div>
                    <div className="ilr-fact-box">
                      <span>Irrigation Benefit</span>
                      <strong>10.62 Lakh Hectares</strong>
                      <small>Transforms drought-hit Bundelkhand</small>
                    </div>
                    <div className="ilr-fact-box">
                      <span>Drinking Water</span>
                      <strong>62 Lakh People</strong>
                      <small>Serves 13 districts across MP and UP</small>
                    </div>
                  </div>
                  <div className="ilr-modal-alert">
                    <AlertTriangle size={18} className="ilr-demerit-warn" />
                    <p>
                      <strong>Ecological Safeguard Consideration:</strong> The Daudhan reservoir partially submerges
                      core areas of the <strong>Panna Tiger Reserve</strong>. A comprehensive landscape management plan
                      and compensatory afforestation of over 10,000 hectares have been mandated by the National Board for Wildlife.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content: Godavari-Krishna Link */}
            {activeModal === 'godavari-krishna' && (
              <div className="ilr-modal-body">
                <span className="ilr-modal-tag peninsular-pill">Operational Peninsular Milestone</span>
                <h3 className="ilr-modal-title">Godavari–Krishna Interlinking (Pattiseema Scheme)</h3>
                <img
                  src="/images/ibwt-godavari-krishna.jpg"
                  alt="Godavari-Krishna canal"
                  className="ilr-modal-banner"
                />
                <div className="ilr-modal-text">
                  <p>
                    The <strong>Godavari–Krishna Link</strong> is the first major inter-basin river transfer successfully
                    operationalized in peninsular India. Under the <strong>Pattiseema Lift Irrigation Project</strong>, surplus
                    floodwaters of the Godavari are lifted and discharged into the Polavaram Right Main Canal to feed the
                    Krishna River upstream of Prakasam Barrage.
                  </p>
                  <div className="ilr-facts-grid">
                    <div className="ilr-fact-box">
                      <span>Discharge Capacity</span>
                      <strong>8,500 Cusecs</strong>
                      <small>24 massive vertical turbine pump sets</small>
                    </div>
                    <div className="ilr-fact-box">
                      <span>Annual Water Diverted</span>
                      <strong>80 TMC (~2.26 BCM)</strong>
                      <small>Prevents wastage into Bay of Bengal</small>
                    </div>
                    <div className="ilr-fact-box">
                      <span>Krishna Delta Benefit</span>
                      <strong>13.08 Lakh Acres</strong>
                      <small>Guarantees timely kharif paddy sowing</small>
                    </div>
                    <div className="ilr-fact-box">
                      <span>Upstream Relief</span>
                      <strong>Srisailam Water Spared</strong>
                      <small>Diverts upstream Krishna water to Rayalaseema</small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content: All 18 Merits */}
            {activeModal === 'merits' && (
              <div className="ilr-modal-body">
                <span className="ilr-modal-tag green-badge">BCV755B Syllabus Reference</span>
                <h3 className="ilr-modal-title">Comprehensive Merits of Inter-Basin Transfer (18 Points)</h3>
                <div className="ilr-modal-list">
                  {ILR_ALL_MERITS.map((m) => (
                    <div key={m.id} className="ilr-modal-list-item">
                      <div className="ilr-modal-item-num">0{m.id > 9 ? m.id : `0${m.id}`}</div>
                      <div className="ilr-modal-item-content">
                        <strong>{m.title}</strong>
                        <p>{m.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Content: All 14 Demerits */}
            {activeModal === 'demerits' && (
              <div className="ilr-modal-body">
                <span className="ilr-modal-tag red-badge">BCV755B Syllabus Reference</span>
                <h3 className="ilr-modal-title">Critical Demerits & Concerns of Inter-Basin Transfer (14 Points)</h3>
                <div className="ilr-modal-list">
                  {ILR_ALL_DEMERITS.map((d) => (
                    <div key={d.id} className="ilr-modal-list-item demerit-item">
                      <div className="ilr-modal-item-num demerit-num">0{d.id > 9 ? d.id : `0${d.id}`}</div>
                      <div className="ilr-modal-item-content">
                        <strong>{d.title}</strong>
                        <p>{d.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Content: Full Link Directory */}
            {activeModal === 'links-list' && (
              <div className="ilr-modal-body">
                <span className="ilr-modal-tag himalayan-pill">NWDA National Perspective Plan</span>
                <h3 className="ilr-modal-title">Complete Directory of All 30 Proposed River Links</h3>
                <div className="ilr-directory-tabs">
                  <h4>Himalayan Component (14 Links):</h4>
                  <div className="ilr-dir-grid">
                    {HIMALAYAN_LINKS.map((link, idx) => (
                      <div key={link.id} className="ilr-dir-card himalayan-dir-card">
                        <div className="ilr-dir-header">
                          <span className="ilr-dir-index">#{idx + 1}</span>
                          <span className="ilr-status-badge in-progress-badge">{link.status}</span>
                        </div>
                        <strong>{link.name}</strong>
                        <p>{link.description}</p>
                        <div className="ilr-dir-metrics">
                          <span>{link.lengthKm} km</span>
                          <span>{link.waterTransferBCM} BCM/yr</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 style={{ marginTop: '24px' }}>Peninsular Component (16 Links):</h4>
                  <div className="ilr-dir-grid">
                    {PENINSULAR_LINKS.map((link, idx) => (
                      <div key={link.id} className="ilr-dir-card peninsular-dir-card">
                        <div className="ilr-dir-header">
                          <span className="ilr-dir-index">#{idx + 15}</span>
                          <span className="ilr-status-badge operational-badge">{link.status}</span>
                        </div>
                        <strong>{link.name}</strong>
                        <p>{link.description}</p>
                        <div className="ilr-dir-metrics">
                          <span>{link.lengthKm} km</span>
                          <span>{link.waterTransferBCM} BCM/yr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
