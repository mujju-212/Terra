import { useState } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  Waves,
  ArrowDown,
  Droplet,
  Layers,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cycleStagesData } from './waterData';

export function HydrologicalCycleScreen() {
  const [selectedCycleStage, setSelectedCycleStage] = useState(0);

  // Stepper progress line width percentage (from step 0 to step 5)
  const progressPercent = (selectedCycleStage / 5) * 88;

  return (
    <section className="water-cycle-chapter-section" id="ch-01" data-chapter="02">
      {/* Pristine Master Landscape Background Canvas */}
      <div className="water-cycle-canvas-bg" />
      <div className="water-cycle-scrim-left" />
      <div className="water-cycle-scrim-top" />
      <div className="water-cycle-scrim-bottom" />

      {/* Animated SVG Flow Arrows and Visual Indicators */}
      <svg className="water-flow-svg-overlay" viewBox="0 0 1024 576" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          {/* Cyan Arrowhead Marker */}
          <marker
            id="cyan-cycle-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#38bdf8" />
          </marker>

          {/* Downward Seepage Arrowhead Marker */}
          <marker
            id="cyan-down-arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="6"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 1.5 0 L 5 9 L 8.5 0 z" fill="#38bdf8" />
          </marker>

          {/* Cyan Glow Filter */}
          <filter id="water-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Rising Evaporation Vapor Wisps over the Sunlit Sea */}
        <g className="water-evaporation-wisps" filter="url(#water-cyan-glow)">
          <path className="water-vapor-wisp" d="M 215 430 C 210 390, 225 360, 215 320 C 205 280, 220 250, 215 210" />
          <path
            className="water-vapor-wisp"
            d="M 245 440 C 255 400, 235 370, 245 330 C 255 290, 240 260, 245 220"
            style={{ animationDelay: '0.8s' }}
          />
          <path
            className="water-vapor-wisp"
            d="M 275 435 C 270 395, 288 365, 275 325 C 265 285, 280 255, 275 215"
            style={{ animationDelay: '1.6s' }}
          />
        </g>

        {/* 2. Curved Flow Arrow: Evaporation (Ocean) -> Condensation (Clouds) */}
        <path
          className="water-flow-arrow-path water-flow-dashed"
          d="M 320 240 C 350 180, 390 150, 430 145"
          markerEnd="url(#cyan-cycle-arrow)"
          filter="url(#water-cyan-glow)"
        />

        {/* 3. Horizontal Flow Arrow: Condensation (Clouds) -> Precipitation (Mountain Peaks) */}
        <path
          className="water-flow-arrow-path water-flow-dashed"
          d="M 520 135 C 560 130, 600 130, 640 135"
          markerEnd="url(#cyan-cycle-arrow)"
          filter="url(#water-cyan-glow)"
        />

        {/* 4. Downward Precipitation Stream -> Mountain Waterfall & River Runoff */}
        <path
          className="water-flow-arrow-path water-flow-dashed"
          d="M 700 165 C 670 215, 620 250, 560 270"
          markerEnd="url(#cyan-cycle-arrow)"
          filter="url(#water-cyan-glow)"
        />

        {/* 5. River Runoff Curve flowing towards cutaway bank */}
        <path
          className="water-flow-arrow-path water-flow-dashed"
          d="M 540 295 C 600 310, 660 315, 710 315"
          markerEnd="url(#cyan-cycle-arrow)"
          filter="url(#water-cyan-glow)"
        />

        {/* 6. Vertical Infiltration Seepage Arrows (Percolating into Soil) */}
        <g className="water-infiltration-streams" filter="url(#water-cyan-glow)">
          <line
            className="water-flow-vertical-arrow"
            x1="740"
            y1="318"
            x2="740"
            y2="388"
            markerEnd="url(#cyan-down-arrow)"
          />
          <line
            className="water-flow-vertical-arrow"
            x1="765"
            y1="318"
            x2="765"
            y2="388"
            markerEnd="url(#cyan-down-arrow)"
            style={{ animationDelay: '0.6s' }}
          />
        </g>

        {/* 7. Subterranean Aquifer Flow Arrows (Moving through rock strata back to sea) */}
        <path
          className="water-flow-arrow-path water-flow-dashed"
          d="M 810 400 L 560 400"
          markerEnd="url(#cyan-cycle-arrow)"
          filter="url(#water-cyan-glow)"
        />
        {/* Groundwater discharging into coastal ocean */}
        <path
          className="water-flow-arrow-path water-flow-dashed"
          d="M 550 402 C 460 410, 380 415, 260 410"
          markerEnd="url(#cyan-cycle-arrow)"
          filter="url(#water-cyan-glow)"
        />
      </svg>

      {/* Top Left Header Card with Frosted Glass Protection */}
      <div className="water-cycle-header-card">
        <div className="water-cycle-eyebrow-pill">
          <span className="water-cycle-pill-dot" />
          <span>CHAPTER 01</span>
        </div>
        <h2 className="water-cycle-title">
          The <span className="water-cycle-title-accent">Hydrological</span>
          <br />
          Cycle
        </h2>
        <p className="water-cycle-desc">
          Continuous global circulation between atmosphere, surface and aquifers, powered by solar energy.
        </p>
        <div className="water-cycle-quick-stats">
          <span className="water-cycle-stat-badge">6 Dynamic Stages</span>
          <span className="water-cycle-stat-dot">•</span>
          <span className="water-cycle-stat-badge">Closed Earth System</span>
        </div>
      </div>

      {/* Top Right Ecological Insight Card */}
      <div className="water-cycle-top-right">
        <div className="water-cycle-insight-card">
          <div className="water-cycle-insight-head">
            <div className="water-cycle-insight-icon">
              <RefreshCw size={14} />
            </div>
            <div>
              <span className="water-cycle-insight-label">The Cycle Never Stops</span>
              <span className="water-cycle-insight-sub">Earth’s Freshwater Engine</span>
            </div>
          </div>
          <p className="water-cycle-insight-text">
            Replenishes freshwater, powers global ecosystems, and regulates climate across clouds and aquifers.
          </p>
        </div>
      </div>

      {/* 6 Interactive Hotspot Nodes Over the Landscape */}
      <div className="water-hotspots-layer" role="group" aria-label="Hydrological cycle stages">
        {cycleStagesData.map((stage, idx) => {
          const isSel = selectedCycleStage === idx;
          const Icon = stage.icon;
          return (
            <div
              key={stage.num}
              className={`water-hotspot-node ${isSel ? 'is-active' : ''}`}
              style={{ left: stage.x, top: stage.y }}
              onClick={() => setSelectedCycleStage(idx)}
              role="button"
              tabIndex={0}
              aria-pressed={isSel}
              aria-label={`Stage ${stage.num}: ${stage.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedCycleStage(idx);
              }}
            >
              {/* Pulsing Aura */}
              <div className="water-node-pulse-ring" />

              {/* The Compact Hotspot Tag */}
              <div className="water-node-pill">
                <span className="water-node-num">{stage.num}</span>
                <span className="water-node-icon">
                  {stage.num === 5 ? (
                    <span style={{ display: 'inline-flex', gap: '1px' }}>
                      <ArrowDown size={11} color="#38bdf8" />
                      <ArrowDown size={11} color="#38bdf8" />
                    </span>
                  ) : (
                    <Icon size={12} color={stage.num === 1 ? '#fbbf24' : '#38bdf8'} />
                  )}
                </span>
                <span className="water-node-title">{stage.title}</span>
              </div>

              {/* Active Stage Floating Popover Callout */}
              {isSel && (
                <div
                  className={`water-node-popover water-popover-${stage.num}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="water-popover-tag-row">
                    <span className="water-popover-stage-pill">STAGE 0{stage.num} / 06</span>
                    <span className="water-popover-pulse-dot" />
                  </div>
                  <h4 className="water-popover-title">{stage.title}</h4>
                  <p className="water-popover-desc">{stage.desc}</p>
                  <p className="water-popover-detail">{stage.detail}</p>
                  <button
                    type="button"
                    className="water-popover-next-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCycleStage((idx + 1) % 6);
                    }}
                  >
                    <span>Next: {cycleStagesData[(idx + 1) % 6].title}</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Deck (3 Panels: Two Main Sources, Aquifer, Explore Stepper) */}
      <div className="water-cycle-deck">
        {/* Panel 1: Two Main Sources */}
        <div className="water-deck-panel">
          <div className="water-deck-panel-head">
            <div className="water-deck-icon-pill">
              <Droplet size={18} />
            </div>
            <strong className="water-deck-panel-title">Two Main Sources of Water</strong>
          </div>
          <div className="water-deck-list">
            <div className="water-deck-list-item">
              <span className="water-deck-num-bullet">1</span>
              <span>
                Surface Water <span className="water-deck-subtext">(lakes, rivers, reservoirs)</span>
              </span>
            </div>
            <div className="water-deck-list-item">
              <span className="water-deck-num-bullet">2</span>
              <span>Groundwater</span>
            </div>
          </div>
        </div>

        {/* Panel 2: What is an Aquifer? */}
        <div className="water-deck-panel">
          <div className="water-deck-panel-head">
            <div className="water-deck-icon-pill">
              <Layers size={18} />
            </div>
            <strong className="water-deck-panel-title">What is an Aquifer?</strong>
          </div>
          <p className="water-deck-text">
            A rock that stores and transmits groundwater (e.g., gravel, sand, sandstone, limestone).
          </p>
        </div>

        {/* Panel 3: Explore the Cycle Stepper */}
        <div className="water-deck-panel water-deck-stepper-panel">
          <div className="water-stepper-header">
            <span className="water-stepper-title">
              Explore <em>the Cycle</em>
            </span>
            <div className="water-stepper-arrows">
              <button
                type="button"
                className="water-stepper-arrow-btn"
                onClick={() => setSelectedCycleStage((prev) => (prev - 1 + 6) % 6)}
                aria-label="Previous cycle stage"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="water-stepper-arrow-btn"
                onClick={() => setSelectedCycleStage((prev) => (prev + 1) % 6)}
                aria-label="Next cycle stage"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="water-stepper-track">
            <div className="water-stepper-line" />
            <div className="water-stepper-progress" style={{ width: `${progressPercent}%` }} />
            {cycleStagesData.map((stage, idx) => {
              const isSel = selectedCycleStage === idx;
              const isPassed = selectedCycleStage >= idx;
              return (
                <button
                  key={stage.num}
                  type="button"
                  className={`water-stepper-item ${isSel ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                  onClick={() => setSelectedCycleStage(idx)}
                >
                  <span className="water-stepper-dot">{stage.num}</span>
                  <span className="water-stepper-label">{stage.num === 4 ? 'Runoff' : stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
