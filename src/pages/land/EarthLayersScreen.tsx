import React, { useState } from 'react';
import { Mountain, Play, ArrowRight, ArrowLeft, Sparkles, Layers, Thermometer, Compass, Activity, BookOpen } from 'lucide-react';
import InteractiveCutawayEarth from '../../three/InteractiveCutawayEarth';
import LayerDetailModal from '../../components/LayerDetailModal';
import { EARTH_LAYERS_DATA } from '../../data/earthLayersData';
import { TiltCard, Reveal } from './motion';

export default function EarthLayersScreen({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const [selectedLayerKey, setSelectedLayerKey] = useState<'crust' | 'mantle' | 'outer' | 'inner'>('crust');
  const [detailModalLayer, setDetailModalLayer] = useState<'crust' | 'mantle' | 'outer' | 'inner' | null>(null);

  const active = EARTH_LAYERS_DATA[selectedLayerKey];

  return (
    <section className="land-screen land-layers-screen" id="ch-layers">
      <div className="layers-backdrop">
        <div className="layers-starfield" />
      </div>

      <div className="land-screen-inner layers-screen-inner">
        {/* Upper Dashboard Grid: Left info & Badges + Right 3D Cutaway with Callout Cards */}
        <div className="layers-top-grid">
          {/* Left Column: Chapter Title & Description */}
          <div className="layers-header-block">
            <span className="screen-ch-tag">MODULE 01 <span>|</span> CHAPTER 03</span>
            <h2 className="screen-main-title">
              Earth <em>Layers</em>
            </h2>
            <h3 className="screen-sub-headline">A dynamic planet from core to surface.</h3>
            <p className="screen-lead-copy">
              The Earth is structured into 4 major concentric layers: Crust, Mantle, Outer Core, and Inner Core.
              Each layer features distinct physical properties, temperatures, and convective mechanisms shaping our land and supporting life.
            </p>

            {/* 3 Stat Badges */}
            <div className="layers-stats-badges">
              <div className="layer-badge-box">
                <Layers size={18} className="badge-icon" />
                <div className="badge-text">
                  <strong>4 Major Layers</strong>
                  <span>Crust, Mantle,<br />Outer Core, Inner Core</span>
                </div>
              </div>
              <div className="layer-badge-box">
                <Thermometer size={18} className="badge-icon" />
                <div className="badge-text">
                  <strong>~5,000°C</strong>
                  <span>Inner Core temp<br />(Notes Line 48)</span>
                </div>
              </div>
              <div className="layer-badge-box">
                <Compass size={18} className="badge-icon" />
                <div className="badge-text">
                  <strong>Iron &amp; Nickel</strong>
                  <span>Core composition<br />(Notes Line 41)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Cutaway Model & 4 Right-Side Floating Cards */}
          <div className="layers-cutaway-stage">
            <InteractiveCutawayEarth
              selectedLayer={selectedLayerKey}
              onSelectLayer={setSelectedLayerKey}
              onOpenLayerModal={(layer) => setDetailModalLayer(layer)}
            />
          </div>
        </div>

        {/* Lower Row: Explore the Layers & Layers in Action */}
        <div className="layers-bottom-panels">
          {/* Left Panel: Explore the Layers */}
          <Reveal dir="left" className="layers-interactive-panel">
            <div className="panel-headline">
              <div className="panel-icon-wrap">
                <Layers size={15} />
              </div>
              <div className="panel-titles">
                <span className="panel-primary-title">Explore the Layers</span>
                <span className="panel-subtitle">Select a layer to examine its lecture notes and physical properties.</span>
              </div>
            </div>

            <div className="explore-panel-grid">
              {/* Mini Preview Orb Frame */}
              <div className="mini-orb-col">
                <div className="mini-orb-frame">
                  <img src={active.icon} alt={active.name} className="mini-orb-img" />
                </div>
              </div>

              {/* Vertical Layer Tab Pills */}
              <div className="layer-tab-buttons">
                {(['crust', 'mantle', 'outer', 'inner'] as const).map((key) => {
                  const isCurrent = selectedLayerKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`layer-btn-pill ${isCurrent ? 'is-selected' : ''}`}
                      onClick={() => setSelectedLayerKey(key)}
                    >
                      <span>{EARTH_LAYERS_DATA[key].name}</span>
                      {isCurrent && <ArrowRight size={13} className="pill-arrow" />}
                    </button>
                  );
                })}
              </div>

              {/* Active Layer Details */}
              <div className="layer-spec-card">
                <div className="layer-spec-header-row">
                  <h4 className="active-layer-title">{active.name}</h4>
                  <span className="layer-spec-sub">{active.subtitle}</span>
                </div>

                {/* Syllabus Excerpt Banner */}
                <div className="layer-spec-syllabus-quote">
                  <span className="quote-tag">VTU MODULE 1 LECTURE NOTES:</span>
                  <p>{active.summary}</p>
                </div>

                <div className="spec-meta-grid">
                  <div className="spec-meta-cell">
                    <Mountain size={14} className="spec-icon" />
                    <div>
                      <span className="spec-label">Thickness / Depth</span>
                      <strong>{active.thickness}</strong>
                    </div>
                  </div>
                  <div className="spec-meta-cell">
                    <Layers size={14} className="spec-icon" />
                    <div>
                      <span className="spec-label">Planetary Volume</span>
                      <strong>{active.volumePct}</strong>
                    </div>
                  </div>
                  <div className="spec-meta-cell">
                    <Thermometer size={14} className="spec-icon" />
                    <div>
                      <span className="spec-label">Temperature</span>
                      <strong>{active.temp}</strong>
                    </div>
                  </div>
                  <div className="spec-meta-cell">
                    <Sparkles size={14} className="spec-icon" />
                    <div>
                      <span className="spec-label">Composition &amp; State</span>
                      <strong>{active.composition}</strong>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="layer-open-notes-action-btn"
                  onClick={() => setDetailModalLayer(selectedLayerKey)}
                  title={`Open full syllabus notes & exam prep for ${active.name}`}
                >
                  <BookOpen size={12} />
                  <span>Inspect {active.name} Full Notes &amp; Exam Questions</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right Panel: Layers in Action */}
          <Reveal dir="right" className="layers-action-panel">
            <div className="panel-headline">
              <div className="panel-icon-wrap">
                <Play size={14} />
              </div>
              <div className="panel-titles">
                <span className="panel-primary-title">Layers in Action</span>
                <span className="panel-subtitle">The movement of Earth's layers drives powerful natural processes.</span>
              </div>
            </div>

            <div className="action-tiles-row">
              <TiltCard className="action-tile-item" spotlight max={9}>
                <div
                  className="action-thumb kenburns-bg"
                  style={{ backgroundImage: `url('/images/action-volcano.jpg')` }}
                />
                <h5>Volcanic Activity</h5>
                <p>Heat from the mantle melting rock</p>
              </TiltCard>

              <TiltCard className="action-tile-item" spotlight max={9}>
                <div
                  className="action-thumb kenburns-bg"
                  style={{ backgroundImage: `url('/images/action-mountains.jpg')` }}
                />
                <h5>Crustal Formation &amp; Drift</h5>
                <p>Plates moving on fluidized mantle</p>
              </TiltCard>

              <TiltCard className="action-tile-item" spotlight max={9}>
                <div
                  className="action-thumb kenburns-bg"
                  style={{ backgroundImage: `url('/images/action-magnetic.jpg')` }}
                />
                <h5>Magnetic Field</h5>
                <p>Liquid outer core geodynamo shield</p>
              </TiltCard>
            </div>
          </Reveal>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="formation-bottom-bar">
          <button type="button" className="formation-bar-pill prev-pill" onClick={onPrev}>
            <div className="bar-arrow-circ">
              <ArrowLeft size={14} />
            </div>
            <div className="bar-pill-text">
              <span className="bar-action-sub">Previous</span>
              <span className="bar-title-sub">Earth Formation</span>
            </div>
          </button>

          <div className="formation-bar-dots">
            <button type="button" className="bar-dot" onClick={onPrev} title="Chapter 01" />
            <button type="button" className="bar-dot" onClick={onPrev} title="Chapter 02" />
            <button type="button" className="bar-dot is-active" title="Chapter 03: Earth Layers" />
            <button type="button" className="bar-dot" onClick={onNext} title="Chapter 04" />
            <button type="button" className="bar-dot" onClick={onNext} title="Chapter 05" />
            <button type="button" className="bar-dot" onClick={onNext} title="Chapter 06" />
            <button type="button" className="bar-dot" onClick={onNext} title="Chapter 07" />
          </div>

          <button type="button" className="formation-bar-pill next-pill" onClick={onNext}>
            <div className="bar-pill-text">
              <span className="bar-action-sub">Next</span>
              <span className="bar-title-sub">Crust &amp; Continents</span>
            </div>
            <div className="bar-arrow-circ">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Full Layer Notes & Exam Prep Modal */}
      {detailModalLayer !== null && (
        <LayerDetailModal
          layerKey={detailModalLayer}
          isOpen={detailModalLayer !== null}
          onClose={() => setDetailModalLayer(null)}
          onSelectLayer={(l) => {
            setSelectedLayerKey(l);
            setDetailModalLayer(l);
          }}
        />
      )}
    </section>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SCREEN 04: CRUST & CONTINENTS (TECTONIC PLATES) COMPONENT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
