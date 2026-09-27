import React, { useState, useId } from 'react';
import {
  Activity,
  Waves,
  GitBranch,
  MapPin,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Grid,
} from 'lucide-react';
import {
  INDIA_STATE_POLYGONS,
  INDIA_FRONTIER_PATHS,
  INDIA_STATE_BORDERS,
  NEIGHBOR_COUNTRY_PATHS,
  COASTLINE_PATHS,
} from '../data/indiaVectorMapData';
import type { RiverBasinItem, RiverMilestone } from '../pages/water/waterData';

interface IndiaRiversInteractiveMapProps {
  basins: RiverBasinItem[];
  selectedBasinId: string;
  onSelectBasin: (basinId: string) => void;
  hoveredRiverId: string | null;
  onHoverRiver: (basinId: string | null) => void;
}

export function IndiaRiversInteractiveMap({
  basins,
  selectedBasinId,
  onSelectBasin,
  hoveredRiverId,
  onHoverRiver,
}: IndiaRiversInteractiveMapProps) {
  const componentId = useId().replace(/:/g, '');
  const [mapNetworkMode, setMapNetworkMode] = useState<'focused' | 'all'>('focused');
  const [showTributaries, setShowTributaries] = useState<boolean>(true);
  const [showMilestones, setShowMilestones] = useState<boolean>(true);
  const [showStateBorders, setShowStateBorders] = useState<boolean>(true);
  const [showGraticules, setShowGraticules] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredMilestone, setHoveredMilestone] = useState<RiverMilestone | null>(null);

  const selectedBasin = basins.find((b) => b.id === selectedBasinId) || basins[0];

  // Graticule grid lines across India (8°N - 36°N, 68°E - 96°E) in 680x740 coordinates
  type GraticuleLine =
    | { type: 'lat'; label: string; y: number }
    | { type: 'lon'; label: string; x: number };

  const graticuleLines: GraticuleLine[] = [
    { type: 'lat', label: '36° N · Karakoram', y: 70 },
    { type: 'lat', label: '28° N · Himalayan Arc', y: 220 },
    { type: 'lat', label: '23.5° N · Tropic of Cancer', y: 350 },
    { type: 'lat', label: '16° N · Deccan Plateau', y: 490 },
    { type: 'lat', label: '8° N · Kanyakumari', y: 680 },
    { type: 'lon', label: '70° E', x: 80 },
    { type: 'lon', label: '78° E', x: 260 },
    { type: 'lon', label: '82.5° E · IST Meridian', x: 370 },
    { type: 'lon', label: '90° E', x: 520 },
  ];

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.8, +(z + 0.2).toFixed(1)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.9, +(z - 0.2).toFixed(1)));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="india-vector-map-component-root">
      {/* ─── FLOATING TOP HUD CONTROL BAR ─── */}
      <div className="water-map-hud-bar">
        {/* River View Mode */}
        <div className="water-hud-pill-group">
          <button
            type="button"
            className={`water-hud-btn ${mapNetworkMode === 'focused' ? 'is-active' : ''}`}
            onClick={() => setMapNetworkMode('focused')}
            title="Focus exclusively on the active river system"
          >
            <Activity size={13} />
            <span>Active: {selectedBasin.riverName}</span>
          </button>

          <button
            type="button"
            className={`water-hud-btn ${mapNetworkMode === 'all' ? 'is-active' : ''}`}
            onClick={() => setMapNetworkMode('all')}
            title="Display all 6 major river systems across India"
          >
            <Waves size={13} />
            <span>All 6 Basins</span>
          </button>
        </div>

        {/* Feature Toggles */}
        <div className="water-hud-toggle-group">
          <button
            type="button"
            className={`water-hud-toggle ${showTributaries ? 'is-active' : ''}`}
            onClick={() => setShowTributaries(!showTributaries)}
            title="Toggle tributary branch networks"
          >
            <GitBranch size={13} />
            <span>Tributaries</span>
          </button>

          <button
            type="button"
            className={`water-hud-toggle ${showMilestones ? 'is-active' : ''}`}
            onClick={() => setShowMilestones(!showMilestones)}
            title="Toggle confluences, major dams, and glacial origins"
          >
            <MapPin size={13} />
            <span>Dams & Origins</span>
          </button>

          <button
            type="button"
            className={`water-hud-toggle ${showStateBorders ? 'is-active' : ''}`}
            onClick={() => setShowStateBorders(!showStateBorders)}
            title="Toggle internal Indian state boundaries"
          >
            <Layers size={13} />
            <span>States</span>
          </button>

          <button
            type="button"
            className={`water-hud-toggle ${showGraticules ? 'is-active' : ''}`}
            onClick={() => setShowGraticules(!showGraticules)}
            title="Toggle latitude/longitude coordinate graticule grid"
          >
            <Grid size={13} />
            <span>Grid</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="water-hud-zoom-group">
          <button
            type="button"
            className="water-hud-zoom-btn"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 1.8}
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn size={13} />
          </button>
          <span className="water-hud-zoom-text">{Math.round(zoomLevel * 100)}%</span>
          <button
            type="button"
            className="water-hud-zoom-btn"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.9}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>
          <button
            type="button"
            className="water-hud-zoom-btn"
            onClick={handleResetZoom}
            title="Reset View Scale"
            aria-label="Reset View"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* ─── PURE VECTOR MAP STAGE (NO RASTER BITMAPS) ─── */}
      <div className="water-map-stage-wrapper">
        <svg
          className="water-rivers-svg-canvas vector-map-svg"
          viewBox="0 0 680 740"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Interactive Vector Map of India River Basins and Drainage Systems"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <defs>
            {/* Ambient River Glow Filter */}
            <filter id={`river-glow-${componentId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Origin & Beacon Glow Filter */}
            <filter id={`beacon-glow-${componentId}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Basin Border Halo Filter */}
            <filter id={`basin-halo-${componentId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
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
            <linearGradient id={`india-land-grad-${componentId}`} x1="30%" y1="0%" x2="60%" y2="100%">
              {/* Northern Snow Himalayas */}
              <stop offset="0%" stopColor="#1e4459" stopOpacity="0.95" />
              <stop offset="12%" stopColor="#153648" stopOpacity="0.92" />
              {/* Indo-Gangetic Fertile Lowlands */}
              <stop offset="28%" stopColor="#0c2736" stopOpacity="0.9" />
              {/* Deccan Basalt Plateau */}
              <stop offset="55%" stopColor="#081e2b" stopOpacity="0.92" />
              {/* Southern Peninsular Tip */}
              <stop offset="100%" stopColor="#05151e" stopOpacity="0.96" />
            </linearGradient>

            {/* Dynamic River Linear Gradients */}
            {basins.map((b) => (
              <linearGradient
                key={`grad-${b.id}`}
                id={`river-grad-${b.id}-${componentId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="35%" stopColor={b.color} stopOpacity="1" />
                <stop offset="100%" stopColor="#7fd0e0" stopOpacity="0.9" />
              </linearGradient>
            ))}
          </defs>

          {/* ─── LAYER 0: OCEANIC DEPTH BACKDROP ─── */}
          <rect width="680" height="740" rx="18" fill={`url(#ocean-bg-${componentId})`} />

          {/* Ocean Bathymetric Depth Shelf Contours */}
          <path
            d="M 10 320 Q 80 420 120 540 T 260 700 Q 320 730 420 660 T 560 520 Q 640 440 670 380"
            fill="none"
            stroke="rgba(56, 189, 248, 0.08)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 25 350 Q 95 440 135 550 T 270 690 Q 320 710 410 645 T 545 505 Q 615 435 650 370"
            fill="none"
            stroke="rgba(127, 208, 224, 0.14)"
            strokeWidth="2.5"
            strokeDasharray="6 8"
          />

          {/* Oceanic Regional Labels */}
          <text x="65" y="580" fill="rgba(127, 208, 224, 0.28)" fontSize="11" fontWeight="600" letterSpacing="0.22em">
            ARABIAN SEA
          </text>
          <text x="495" y="580" fill="rgba(127, 208, 224, 0.28)" fontSize="11" fontWeight="600" letterSpacing="0.22em">
            BAY OF BENGAL
          </text>
          <text x="250" y="725" fill="rgba(127, 208, 224, 0.24)" fontSize="9.5" fontWeight="600" letterSpacing="0.2em">
            INDIAN OCEAN
          </text>

          {/* ─── LAYER 1: GRATICULE COORDINATE GRID ─── */}
          {showGraticules && (
            <g className="map-graticules-group">
              {graticuleLines.map((line, idx) =>
                line.type === 'lat' ? (
                  <g key={`lat-${idx}`}>
                    <line
                      x1="0"
                      y1={line.y}
                      x2="680"
                      y2={line.y}
                      stroke="rgba(127, 208, 224, 0.07)"
                      strokeWidth="1"
                      strokeDasharray="3 7"
                    />
                    <text
                      x="12"
                      y={(line.y ?? 0) - 4}
                      fill="rgba(127, 208, 224, 0.35)"
                      fontSize="7.5"
                      fontFamily="monospace"
                      letterSpacing="0.08em"
                    >
                      {line.label}
                    </text>
                  </g>
                ) : (
                  <g key={`lon-${idx}`}>
                    <line
                      x1={line.x}
                      y1="0"
                      x2={line.x}
                      y2="740"
                      stroke="rgba(127, 208, 224, 0.07)"
                      strokeWidth="1"
                      strokeDasharray="3 7"
                    />
                    <text
                      x={(line.x ?? 0) + 4}
                      y="18"
                      fill="rgba(127, 208, 224, 0.35)"
                      fontSize="7.5"
                      fontFamily="monospace"
                      letterSpacing="0.08em"
                    >
                      {line.label}
                    </text>
                  </g>
                )
              )}
            </g>
          )}

          {/* ─── LAYER 2: SUBCONTINENT GEOGRAPHIC VECTORS ─── */}
          {/* Synchronized Transform: Scale official dataset (1500x1615) cleanly into 680x740 */}
          <g transform="translate(22, 31) scale(0.44)" className="subcontinent-base-geometry">
            {/* A. Neighboring Countries (Pakistan, Nepal, Bhutan, Bangladesh, Myanmar, Sri Lanka) */}
            <g className="neighboring-countries-group">
              {NEIGHBOR_COUNTRY_PATHS.map((p, idx) => (
                <path
                  key={`neighbor-${idx}`}
                  d={p.d}
                  fill="rgba(255, 255, 255, 0.022)"
                  stroke="rgba(127, 208, 224, 0.12)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
              ))}
            </g>

            {/* B. Official Indian States & Union Territories (Base Landmass) */}
            <g className="india-states-landmass-group">
              {INDIA_STATE_POLYGONS.map((p, idx) => (
                <path
                  key={`state-${idx}`}
                  d={p.d}
                  fill={`url(#india-land-grad-${componentId})`}
                  stroke="rgba(127, 208, 224, 0.28)"
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
                  stroke="rgba(127, 208, 224, 0.36)"
                  strokeWidth="1.6"
                />
              ))}
            </g>

            {/* C. Internal Indian State Boundaries (Optional Toggle) */}
            {showStateBorders && (
              <g className="india-state-borders-group">
                {INDIA_STATE_BORDERS.map((p, idx) => (
                  <path
                    key={`border-${idx}`}
                    d={p.d}
                    fill="none"
                    stroke="rgba(127, 208, 224, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                ))}
              </g>
            )}

            {/* D. Coastline Glow Accent */}
            <g className="india-coastline-group">
              {COASTLINE_PATHS.map((p, idx) => (
                <path
                  key={`coast-${idx}`}
                  d={p.d}
                  fill="none"
                  stroke="#7fd0e0"
                  strokeWidth="1.8"
                  strokeOpacity="0.45"
                />
              ))}
            </g>
          </g>

          {/* ─── LAYER 3: TOPOGRAPHIC ELEVATION RELIEF ARCS ─── */}
          <g className="topographic-relief-mesh" opacity="0.6">
            {/* Himalayan Mountain Ridge Arc (Snow-capped high elevation ranges) */}
            <path
              d="M 160 110 Q 220 80 280 82 T 380 120 T 480 180 T 580 195 T 630 215"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="5"
              strokeOpacity="0.38"
              strokeLinecap="round"
            />
            <path
              d="M 175 125 Q 235 98 295 100 T 395 138 T 495 198 T 595 212"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="2.5"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />

            {/* Indo-Gangetic Fertile Lowlands Relief Shading */}
            <path
              d="M 190 220 Q 280 260 380 300 T 480 340 T 510 400"
              fill="none"
              stroke="#22c55e"
              strokeWidth="8"
              strokeOpacity="0.12"
              strokeLinecap="round"
            />

            {/* Western Ghats Orographic Mountain Ridge (North-to-South) */}
            <path
              d="M 125 380 Q 138 480 155 580 T 175 640"
              fill="none"
              stroke="#0284c7"
              strokeWidth="3.5"
              strokeOpacity="0.3"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />

            {/* Eastern Ghats Mountain Arc */}
            <path
              d="M 410 440 Q 360 520 320 600 T 280 650"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeOpacity="0.22"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
          </g>

          {/* ─── LAYER 4: 6 CATCHMENT BASIN POLYGONS (INTERACTIVE WATERSHEDS) ─── */}
          <g className="catchment-basins-group">
            {basins.map((b) => {
              const isSelected = selectedBasinId === b.id;
              const isHovered = hoveredRiverId === b.id;

              return (
                <polygon
                  key={`catchment-${b.id}`}
                  points={b.catchmentPolygon}
                  fill={b.color}
                  className={`river-catchment-polygon ${isSelected ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBasin(b.id);
                  }}
                  onMouseEnter={() => onHoverRiver(b.id)}
                  onMouseLeave={() => onHoverRiver(null)}
                  style={{
                    fillOpacity: isSelected ? 0.28 : isHovered ? 0.18 : 0.05,
                    stroke: b.color,
                    strokeWidth: isSelected ? 2.8 : isHovered ? 2 : 0.9,
                    strokeDasharray: isSelected ? 'none' : '5 5',
                    filter: isSelected ? `url(#basin-halo-${componentId})` : undefined,
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    transition: 'fill-opacity 0.25s ease, stroke-width 0.25s ease',
                  }}
                />
              );
            })}
          </g>

          {/* ─── LAYER 5: INACTIVE RIVER PATHS (GUIDE NETWORKS IN FOCUSED MODE) ─── */}
          {mapNetworkMode === 'focused' && (
            <g className="inactive-rivers-group">
              {basins.map((b) => {
                if (b.id === selectedBasinId) return null;
                return (
                  <g
                    key={`inactive-${b.id}`}
                    className="river-inactive-group"
                    onClick={() => onSelectBasin(b.id)}
                    onMouseEnter={() => onHoverRiver(b.id)}
                    onMouseLeave={() => onHoverRiver(null)}
                    style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                  >
                    <path
                      d={b.mainStemPath}
                      stroke={b.color}
                      strokeWidth="2.8"
                      fill="none"
                      strokeOpacity="0.32"
                      strokeLinecap="round"
                    />
                    {showTributaries &&
                      b.tributaryPaths.map((t, idx) => (
                        <path
                          key={`inactive-trib-${b.id}-${idx}`}
                          d={t.path}
                          stroke={b.color}
                          strokeWidth="1.2"
                          fill="none"
                          strokeOpacity="0.2"
                          strokeLinecap="round"
                        />
                      ))}
                  </g>
                );
              })}
            </g>
          )}

          {/* ─── LAYER 6: LIVING ANIMATED RIVER CURRENT FLOWS ─── */}
          <g className="active-flowing-rivers-group">
            {basins.map((b) => {
              const isSelected = selectedBasinId === b.id;
              const isActiveMode = mapNetworkMode === 'all' || isSelected;
              if (!isActiveMode) return null;

              return (
                <g
                  key={`active-river-${b.id}`}
                  className="river-active-group"
                  onClick={() => onSelectBasin(b.id)}
                  onMouseEnter={() => onHoverRiver(b.id)}
                  onMouseLeave={() => onHoverRiver(null)}
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                >
                  {/* Broad Ambient Outer Glow */}
                  <path
                    d={b.mainStemPath}
                    stroke={b.color}
                    strokeWidth="8"
                    fill="none"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                    filter={`url(#river-glow-${componentId})`}
                  />

                  {/* Core Main River Stream */}
                  <path
                    d={b.mainStemPath}
                    stroke={`url(#river-grad-${b.id}-${componentId})`}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* White Dashed Water Current Flow Pulse */}
                  <path
                    d={b.mainStemPath}
                    stroke="#ffffff"
                    strokeWidth="2.4"
                    fill="none"
                    strokeDasharray="12 10"
                    className="river-active-flow-animated"
                    strokeLinecap="round"
                  />

                  {/* Tributary Networks */}
                  {showTributaries &&
                    b.tributaryPaths.map((t, tIdx) => (
                      <g key={`trib-${b.id}-${tIdx}`}>
                        <path
                          d={t.path}
                          stroke={b.color}
                          strokeWidth="4.5"
                          fill="none"
                          strokeOpacity="0.55"
                          strokeLinecap="round"
                          filter={`url(#river-glow-${componentId})`}
                        />
                        <path
                          d={t.path}
                          stroke={b.color}
                          strokeWidth="2.2"
                          fill="none"
                          strokeDasharray="8 6"
                          className="river-trib-flow-animated"
                          strokeLinecap="round"
                        />
                        {t.labelPos && (
                          <text
                            x={t.labelPos.x}
                            y={t.labelPos.y}
                            className="river-trib-label"
                            fill={b.color}
                            fontSize="10"
                            fontWeight="600"
                            letterSpacing="0.04em"
                          >
                            {t.name}
                          </text>
                        )}
                      </g>
                    ))}

                  {/* Glacial Origin Radar Pulse Beacon */}
                  <g
                    className="river-origin-marker"
                    onMouseEnter={() =>
                      setHoveredMilestone({
                        id: `origin-${b.id}`,
                        name: b.originCoord.label,
                        type: 'origin',
                        x: b.originCoord.x,
                        y: b.originCoord.y,
                        state: b.originCoord.state,
                        detail: `Glacial source of the ${b.riverName}`,
                        highlightFact: `Altitude: ${b.originCoord.elevation} in the mountain range`,
                      })
                    }
                    onMouseLeave={() => setHoveredMilestone(null)}
                  >
                    <circle
                      cx={b.originCoord.x}
                      cy={b.originCoord.y}
                      r="16"
                      fill="none"
                      stroke={b.color}
                      strokeWidth="1.2"
                      className="origin-radar-ring ring-1"
                    />
                    <circle
                      cx={b.originCoord.x}
                      cy={b.originCoord.y}
                      r="9"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="origin-radar-ring ring-2"
                    />
                    <circle
                      cx={b.originCoord.x}
                      cy={b.originCoord.y}
                      r="4.5"
                      fill={b.color}
                      filter={`url(#beacon-glow-${componentId})`}
                    />
                    <circle cx={b.originCoord.x} cy={b.originCoord.y} r="2" fill="#ffffff" />
                    <text
                      x={b.originCoord.x + 8}
                      y={b.originCoord.y - 6}
                      fill="#ffffff"
                      fontSize="9.5"
                      fontWeight="700"
                      className="river-node-tag"
                    >
                      Origin: {b.originCoord.label}
                    </text>
                  </g>

                  {/* Ocean Delta Wave Ripple Terminus */}
                  <g
                    className="river-mouth-marker"
                    onMouseEnter={() =>
                      setHoveredMilestone({
                        id: `mouth-${b.id}`,
                        name: b.mouthCoord.label,
                        type: 'delta',
                        x: b.mouthCoord.x,
                        y: b.mouthCoord.y,
                        state: b.mouthCoord.sea,
                        detail: 'Discharge terminus into the ocean',
                        highlightFact: `Empties full drainage volume into the ${b.mouthCoord.sea}`,
                      })
                    }
                    onMouseLeave={() => setHoveredMilestone(null)}
                  >
                    <circle
                      cx={b.mouthCoord.x}
                      cy={b.mouthCoord.y}
                      r="18"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.2"
                      className="mouth-ripple-ring ring-1"
                    />
                    <circle
                      cx={b.mouthCoord.x}
                      cy={b.mouthCoord.y}
                      r="10"
                      fill="none"
                      stroke={b.color}
                      strokeWidth="1.5"
                      className="mouth-ripple-ring ring-2"
                    />
                    <circle
                      cx={b.mouthCoord.x}
                      cy={b.mouthCoord.y}
                      r="5"
                      fill="#38bdf8"
                      filter={`url(#beacon-glow-${componentId})`}
                    />
                    <text
                      x={b.mouthCoord.x + 8}
                      y={b.mouthCoord.y + 12}
                      fill="#8fe1f8"
                      fontSize="9.5"
                      fontWeight="700"
                      className="river-node-tag"
                    >
                      Discharge: {b.mouthCoord.sea}
                    </text>
                  </g>

                  {/* Hydrological Milestone Nodes (Dams, Confluences) */}
                  {showMilestones &&
                    b.milestones.map((m) => (
                      <g
                        key={m.id}
                        className="river-milestone-node"
                        onMouseEnter={() => setHoveredMilestone(m)}
                        onMouseLeave={() => setHoveredMilestone(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x={m.x - 5}
                          y={m.y - 5}
                          width="10"
                          height="10"
                          transform={`rotate(45 ${m.x} ${m.y})`}
                          fill="rgba(6, 22, 32, 0.92)"
                          stroke={b.color}
                          strokeWidth="2"
                          className="milestone-diamond"
                        />
                        <circle cx={m.x} cy={m.y} r="2" fill="#ffffff" />
                        <text
                          x={m.x + 8}
                          y={m.y + 3}
                          fill="rgba(240, 249, 255, 0.95)"
                          fontSize="9"
                          fontWeight="600"
                          className="river-node-tag"
                        >
                          {m.name}
                        </text>
                      </g>
                    ))}
                </g>
              );
            })}
          </g>

          {/* ─── LAYER 7: 6 INTERACTIVE FLOATING BASIN BADGES ON MAP ─── */}
          <g className="map-basin-badges-group">
            {basins.map((b) => {
              const isSelected = selectedBasinId === b.id;
              const isHovered = hoveredRiverId === b.id;
              const badgeWidth = Math.max(b.name.length * 8.6 + 42, 130);
              const halfWidth = badgeWidth / 2;

              return (
                <g
                  key={`svg-basin-badge-${b.id}`}
                  className={`water-svg-basin-badge ${isSelected ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  transform={`translate(${b.badgeCoord.x}, ${b.badgeCoord.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBasin(b.id);
                  }}
                  onMouseEnter={() => onHoverRiver(b.id)}
                  onMouseLeave={() => onHoverRiver(null)}
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                >
                  {/* Outer Glow Halo for Selected or Hovered */}
                  {(isSelected || isHovered) && (
                    <rect
                      x={-halfWidth - 4}
                      y="-18"
                      width={badgeWidth + 8}
                      height="36"
                      rx="18"
                      fill="none"
                      stroke={b.color}
                      strokeWidth={isSelected ? '2.4' : '1.4'}
                      filter={`url(#beacon-glow-${componentId})`}
                      strokeOpacity={isSelected ? 0.95 : 0.65}
                    />
                  )}

                  {/* Pill Capsule Background */}
                  <rect
                    x={-halfWidth}
                    y="-14"
                    width={badgeWidth}
                    height="28"
                    rx="14"
                    fill={isSelected ? 'rgba(4, 15, 23, 0.96)' : isHovered ? 'rgba(6, 22, 32, 0.88)' : 'rgba(6, 22, 32, 0.74)'}
                    stroke={isSelected ? '#ffffff' : isHovered ? b.color : 'rgba(127, 208, 224, 0.35)'}
                    strokeWidth={isSelected ? '1.8' : '1'}
                    className="svg-badge-rect"
                  />

                  {/* Status Indicator Dot */}
                  <circle cx={-halfWidth + 14} cy="0" r={isSelected ? 4 : 3} fill={b.color} />
                  {isSelected && <circle cx={-halfWidth + 14} cy="0" r="1.6" fill="#ffffff" />}

                  {/* Vector Typography */}
                  <text
                    x={-halfWidth + 24}
                    y="4"
                    fill={isSelected ? '#ffffff' : isHovered ? '#8fe1f8' : 'rgba(230, 245, 255, 0.95)'}
                    fontSize="11.5"
                    fontWeight={isSelected ? '700' : '600'}
                    letterSpacing="0.02em"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {b.name}
                  </text>
                </g>
              );
            })}
          </g>

          {/* ─── LAYER 8: CARTO-AESTHETIC ACCENTS ─── */}
          {/* Animated Nautical Compass Rose */}
          <g transform="translate(620, 680)" className="map-compass-rose" opacity="0.85">
            <circle cx="0" cy="0" r="24" fill="rgba(6, 22, 32, 0.85)" stroke="rgba(127, 208, 224, 0.35)" strokeWidth="1" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(127, 208, 224, 0.18)" strokeWidth="0.8" strokeDasharray="2 3" />
            {/* North Arrow Pointer */}
            <polygon points="0,-16 4,0 -4,0" fill="#38bdf8" />
            <polygon points="0,16 4,0 -4,0" fill="rgba(127, 208, 224, 0.4)" />
            <polygon points="16,0 0,4 0,-4" fill="rgba(127, 208, 224, 0.4)" />
            <polygon points="-16,0 0,4 0,-4" fill="rgba(127, 208, 224, 0.4)" />
            <text x="0" y="-19" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="800">
              N
            </text>
            <text x="0" y="25" textAnchor="middle" fill="rgba(127, 208, 224, 0.6)" fontSize="7" fontWeight="600">
              S
            </text>
            <text x="23" y="2.5" textAnchor="middle" fill="rgba(127, 208, 224, 0.6)" fontSize="7" fontWeight="600">
              E
            </text>
            <text x="-23" y="2.5" textAnchor="middle" fill="rgba(127, 208, 224, 0.6)" fontSize="7" fontWeight="600">
              W
            </text>
          </g>
        </svg>

        {/* ─── FLOATING MILESTONE / CONFLUENCE POPUP TOOLTIP CARD ─── */}
        {hoveredMilestone && (
          <div
            className="water-milestone-popup-card"
            style={{
              left: `${(hoveredMilestone.x / 680) * 100}%`,
              top: `${(hoveredMilestone.y / 740) * 100}%`,
            }}
          >
            <div className="water-popup-header">
              <span className="water-popup-type-tag">{hoveredMilestone.type.toUpperCase()}</span>
              <span className="water-popup-state">{hoveredMilestone.state}</span>
            </div>
            <h4 className="water-popup-title">{hoveredMilestone.name}</h4>
            <p className="water-popup-detail">{hoveredMilestone.detail}</p>
            <div className="water-popup-fact">
              <Sparkles size={12} className="water-popup-fact-icon" />
              <span>{hoveredMilestone.highlightFact}</span>
            </div>
          </div>
        )}

        {/* ─── BOTTOM CARTOGRAPHIC COORDINATES STATUS BAR ─── */}
        <div className="water-map-status-bar">
          <div className="map-status-coords">
            <Compass size={11} className="coords-icon" />
            <span>22.5° N, 78.9° E · Indian Subcontinent Hydrographic Network</span>
          </div>
          <div className="map-status-mode">
            <span>Projection: Equirectangular 106%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
