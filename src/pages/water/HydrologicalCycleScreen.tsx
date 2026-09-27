import { useState } from 'react';
import {
  Volume2,
  Sparkles,
  CloudRain,
  Sun,
  Cloud,
  Waves,
  Droplets,
  Droplet,
  Layers,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cycleStagesData } from './waterData';

export function HydrologicalCycleScreen() {
  const [selectedCycleStage, setSelectedCycleStage] = useState(0);

  return (
        <section className="water-cycle-chapter-section" id="ch-01" data-chapter="02">
          {/* Background landscape canvas */}
          <div className="water-cycle-canvas-bg" />
          <div className="water-cycle-scrim-left" />
          <div className="water-cycle-scrim-top" />
          <div className="water-cycle-scrim-bottom" />

          {/* Animated SVG Flow Arrows connecting the cycle loop */}
          <svg className="water-flow-svg-overlay" viewBox="0 0 1024 576" preserveAspectRatio="none" aria-hidden="true">
            {/* Arrow 1 to 2: Evaporation rising to condensation clouds */}
            <path className="water-flow-curve" d="M 360 260 C 400 200, 440 175, 480 175" />
            {/* Arrow 2 to 3: Clouds moving to mountain rain */}
            <path className="water-flow-curve" d="M 530 160 C 580 150, 630 148, 670 155" />
            {/* Arrow 3 to 4: Mountain precipitation flowing to surface runoff */}
            <path className="water-flow-curve" d="M 685 185 C 660 240, 580 270, 530 285" />
            {/* Arrow 4 to 5: River runoff flowing toward infiltration zone */}
            <path className="water-flow-curve" d="M 540 305 C 620 315, 700 320, 770 325" />
            {/* Arrow 5 to 6: Infiltration seeping into underground aquifer */}
            <path className="water-flow-curve" d="M 810 355 C 825 375, 850 390, 875 395" />
            {/* Arrow 6 to 1: Subterranean aquifer flow returning to ocean */}
            <path className="water-flow-curve" d="M 870 420 C 660 440, 450 430, 330 325" />
          </svg>

          {/* Top Left Header */}
          <div className="water-cycle-header">
            <p className="water-cycle-eyebrow">CHAPTER 01</p>
            <h2 className="water-cycle-title">
              The <em>Hydrological</em><br />Cycle
            </h2>
            <p className="water-cycle-desc">
              Water moves continuously between the atmosphere, surface and underground in a never-ending cycle, driven
              by the energy from the sun.
            </p>
          </div>

          {/* Top Right Callouts */}
          <div className="water-cycle-top-right">
            <div className="water-cycle-quote-card">
              <span className="water-cycle-quote-mark">“</span>
              <span>
                The hydrological cycle replenishes freshwater, maintains ecosystems, supports agriculture and regulates
                Earth's climate.
              </span>
            </div>

            <div className="water-cycle-badge">
              <div className="water-cycle-badge-icon">
                <RefreshCw size={16} />
              </div>
              <div>
                <strong className="water-cycle-badge-title">The Cycle Never Stops</strong>
                <p className="water-cycle-badge-desc">
                  This continuous movement keeps Earth's water in balance and supports all life on our planet.
                </p>
              </div>
            </div>
          </div>

          {/* 6 Interactive Hotspot Cards Over the Landscape */}
          <div className="water-hotspots-layer" role="group" aria-label="Hydrological cycle stages">
            {cycleStagesData.map((stage, idx) => {
              const isSel = selectedCycleStage === idx;
              const Icon = stage.icon;
              return (
                <div
                  key={stage.num}
                  className={`water-hotspot-card ${isSel ? 'is-active' : ''}`}
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
                  <div className="water-hotspot-num">{stage.num}</div>
                  <div className="water-hotspot-info">
                    <span className="water-hotspot-title">
                      <Icon size={14} color="#7fd0e0" />
                      {stage.title}
                    </span>
                    <p className="water-hotspot-desc">{stage.desc}</p>
                  </div>
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
                  <span>Surface Water (lakes, rivers, reservoirs)</span>
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
            <div className="water-deck-panel">
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
                {cycleStagesData.map((stage, idx) => {
                  const isSel = selectedCycleStage === idx;
                  return (
                    <button
                      key={stage.num}
                      type="button"
                      className={`water-stepper-item ${isSel ? 'is-active' : ''}`}
                      onClick={() => setSelectedCycleStage(idx)}
                    >
                      <span className="water-stepper-dot">{stage.num}</span>
                      <span className="water-stepper-label">{stage.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>


  );
}
