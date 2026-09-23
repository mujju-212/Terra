import React, { useState, useEffect } from 'react';
import { Mountain, Waves, Globe, Play, Pause, ArrowRight, ArrowLeft, Flame, Layers, Activity } from 'lucide-react';
import { Reveal } from './motion';

export default function CrustContinentsScreen({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const [driftStep, setDriftStep] = useState(0);
  const [isPlayingDrift, setIsPlayingDrift] = useState(false);
  const [plateFilter, setPlateFilter] = useState<'plates' | 'boundaries' | 'movement' | 'quakes' | 'volcanoes'>('plates');

  // Continental drift timer
  useEffect(() => {
    if (!isPlayingDrift) return;
    const interval = setInterval(() => {
      setDriftStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlayingDrift]);

  const driftStages = [
    {
      step: '1',
      title: 'Pangaea',
      time: '~300 million years ago',
      desc: 'All continents were joined as a single supercontinent.',
      thumb: '/images/drift-01-pangaea.jpg',
    },
    {
      step: '2',
      title: 'Breakup Begins',
      time: '~200 million years ago',
      desc: 'Pangaea started to split into two large landmasses: Laurasia and Gondwana.',
      thumb: '/images/drift-02-breakup.jpg',
    },
    {
      step: '3',
      title: 'Further Separation',
      time: '~100 million years ago',
      desc: 'Continents continued to move apart, opening new oceans.',
      thumb: '/images/earth-tectonic-plates.jpg',
    },
    {
      step: '4',
      title: 'Modern Continents',
      time: '~Present Day',
      desc: 'Continents reach their current positions, but movement continues.',
      thumb: '/images/hero-clean-earth.jpg',
    },
  ];

  return (
    <section className="land-screen land-continents-screen" id="ch-continents">
      <div className="continents-backdrop">
        <div className="continents-starfield" />
      </div>

      <div className="land-screen-inner">
        {/* Top Split Stage: Header on Left, Tectonic Earth on Right */}
        <div className="continents-top-stage">
          {/* Header Block */}
          <div className="continents-header-col">
            <span className="screen-ch-tag">MODULE 01 <span>|</span> CHAPTER 04</span>
            <h2 className="screen-main-title">
              Crust &amp; <em>Continents</em>
            </h2>
            <h3 className="screen-sub-headline">A moving planet, a changing surface.</h3>
            <p className="screen-lead-copy">
              The Earth's crust is formed from cooled magma and broken into large tectonic plates that slowly
              move over the mantle. Over millions of years, these movements have shaped continents,
              mountains, oceans and our planet's surface.
            </p>

            {/* 3 Metric Stat Badges */}
            <div className="continents-stats-badges">
              <div className="layer-badge-box">
                <Mountain size={15} />
                <div>
                  <strong>~50–100 km</strong>
                  <span>Average thickness of continental crust</span>
                </div>
              </div>
              <div className="layer-badge-box">
                <Waves size={15} />
                <div>
                  <strong>~5–10 km</strong>
                  <span>Average thickness of oceanic crust</span>
                </div>
              </div>
              <div className="layer-badge-box">
                <Layers size={15} />
                <div>
                  <strong>Tectonic Plates</strong>
                  <span>Earth's crust is divided into large moving plates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Earth with Glowing Tectonic Plate Boundaries */}
          <div className="continents-globe-col">
            <div className="tectonic-globe-frame">
              <img
                src="/images/earth-tectonic-glow.jpg"
                alt="Earth with glowing fiery orange tectonic plate boundaries"
                className="tectonic-globe-img"
              />

              {/* Glowing Plate Labels with Movement Arrows */}
              <div className="plate-label-pin pin-na">North American Plate</div>
              <div className="plate-label-pin pin-eu">Eurasian Plate</div>
              <div className="plate-label-pin pin-pa"><span className="plate-arrow">➔</span> Pacific Plate</div>
              <div className="plate-label-pin pin-sa"><span className="plate-arrow">↖</span> South American Plate</div>
              <div className="plate-label-pin pin-nz"><span className="plate-arrow">➔</span> Nazca Plate</div>
              <div className="plate-label-pin pin-af">African Plate</div>
              <div className="plate-label-pin pin-in"><span className="plate-arrow">↗</span> Indo-Australian Plate</div>
              <div className="plate-label-pin pin-an">Antarctic Plate</div>

              {/* Dynamic Interactive Beacon Indicators for Active Filters */}
              {plateFilter === 'quakes' && (
                <>
                  <div className="tectonic-indicator-pulse indicator-quake" style={{ top: '38%', left: '12%' }} title="Pacific Rim M8.1 Subduction Zone" />
                  <div className="tectonic-indicator-pulse indicator-quake" style={{ top: '62%', left: '26%' }} title="Nazca Trench M7.9 Megathrust" />
                  <div className="tectonic-indicator-pulse indicator-quake" style={{ top: '48%', right: '48%' }} title="Mid-Atlantic Ridge M6.4 Strike-slip" />
                  <div className="tectonic-indicator-pulse indicator-quake" style={{ top: '24%', right: '22%' }} title="Alpine-Himalayan Belt M7.6 Collision" />
                </>
              )}

              {plateFilter === 'volcanoes' && (
                <>
                  <div className="tectonic-indicator-pulse indicator-volcano" style={{ top: '35%', left: '16%' }} title="Cascadia Volcanic Arc" />
                  <div className="tectonic-indicator-pulse indicator-volcano" style={{ top: '54%', left: '28%' }} title="Andes Volcanic Belt" />
                  <div className="tectonic-indicator-pulse indicator-volcano" style={{ top: '40%', right: '46%' }} title="Mid-Ocean Ridge Hydrothermal Vent" />
                  <div className="tectonic-indicator-pulse indicator-volcano" style={{ top: '56%', right: '18%' }} title="Indonesian Sunda Arc" />
                </>
              )}

              {plateFilter === 'boundaries' && (
                <>
                  <div className="tectonic-indicator-pulse indicator-boundary" style={{ top: '25%', left: '38%' }} title="Divergent Spreading Ridge" />
                  <div className="tectonic-indicator-pulse indicator-boundary" style={{ top: '50%', left: '24%' }} title="Convergent Subduction Zone" />
                  <div className="tectonic-indicator-pulse indicator-boundary" style={{ top: '30%', left: '18%' }} title="San Andreas Transform Fault" />
                </>
              )}

              {/* Top Right Floating Filter Card */}
              <div className="tectonic-filter-box">
                <span className="filter-title">Tectonic Plates</span>
                <div className="filter-options-list">
                  {[
                    { id: 'plates', label: 'Plates' },
                    { id: 'boundaries', label: 'Boundaries' },
                    { id: 'movement', label: 'Movement' },
                    { id: 'quakes', label: 'Earthquakes' },
                    { id: 'volcanoes', label: 'Volcanoes' },
                  ].map((f) => (
                    <label
                      key={f.id}
                      className={`filter-radio-row ${plateFilter === f.id ? 'is-active-filter' : ''}`}
                    >
                      <input
                        type="radio"
                        name="tectonic-filter"
                        checked={plateFilter === f.id}
                        onChange={() => setPlateFilter(f.id as any)}
                      />
                      <span>{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Split: The Journey of Continents Timeline & Real World Impact */}
        <div className="continents-bottom-panels">
          {/* Left Panel: Continental Drift Scrubbable Timeline */}
          <Reveal dir="up" className="drift-journey-panel">
            <div className="drift-top-row">
              <div className="drift-title-group">
                <h4>The Journey of Continents</h4>
                <p>Continents haven't always been where they are today. They have moved, collided and split over millions of years.</p>
              </div>

              {/* Play / Scrub Control */}
              <div className="drift-controls-group">
                <button
                  type="button"
                  className="drift-play-btn"
                  onClick={() => setIsPlayingDrift(!isPlayingDrift)}
                  aria-label={isPlayingDrift ? 'Pause drift' : 'Play drift animation'}
                >
                  {isPlayingDrift ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={driftStep}
                  onChange={(e) => {
                    setIsPlayingDrift(false);
                    setDriftStep(Number(e.target.value));
                  }}
                  className="drift-range-slider"
                  aria-label="Continental drift stage"
                />
                <span className="drift-hint">Drag the timeline to explore</span>
              </div>
            </div>

            {/* 4 Connected Globes */}
            <div className="drift-stages-row">
              {driftStages.map((stg, i) => {
                const isSelected = driftStep === i;
                return (
                  <div
                    key={stg.step}
                    className={`drift-stage-card ${isSelected ? 'is-active-drift' : ''}`}
                    onClick={() => {
                      setIsPlayingDrift(false);
                      setDriftStep(i);
                    }}
                  >
                    <div
                      className="drift-stage-orb"
                      style={{ backgroundImage: `url('${stg.thumb}')` }}
                    />
                    <div className="drift-stage-copy">
                      <strong>{stg.step}. {stg.title}</strong>
                      <span className="drift-time">{stg.time}</span>
                      <p>{stg.desc}</p>
                    </div>
                    {i < 3 && (
                      <span className="drift-connector-arrow">
                        <ArrowRight size={10} />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Right Panel: Real World Impact */}
          <Reveal dir="up" delay={90} className="real-impact-panel">
            <div className="impact-headline">
              <Globe size={13} />
              <span>Real World Impact</span>
            </div>

            <div className="impact-body-split">
              <div className="impact-bullets-list">
                <div className="impact-item">
                  <Mountain size={13} />
                  <div>
                    <strong>Mountain Building</strong>
                    <p>Collision of plates forms mountain ranges like the Himalayas.</p>
                  </div>
                </div>
                <div className="impact-item">
                  <Flame size={13} />
                  <div>
                    <strong>Volcanoes</strong>
                    <p>Movement of plates causes volcanic activity.</p>
                  </div>
                </div>
                <div className="impact-item">
                  <Activity size={13} />
                  <div>
                    <strong>Earthquakes</strong>
                    <p>Stress along plate boundaries releases as earthquakes.</p>
                  </div>
                </div>
              </div>

              <div
                className="impact-photo-frame kenburns-bg"
                style={{ backgroundImage: `url('/images/hero-clean-landscape.jpg')` }}
              />
            </div>
          </Reveal>
        </div>

        {/* Bottom Nav Bar */}
        <div className="screen-bottom-bar">
          <button type="button" className="bar-prev-btn" onClick={onPrev}>
            <ArrowLeft size={13} />
            <span>Previous: Earth Layers</span>
          </button>
          <div className="bar-dots-pills">
            {[0, 1, 2, 3, 4].map((idx) => (
              <span key={idx} className={`bar-dot ${idx === 3 ? 'is-active' : ''}`} />
            ))}
          </div>
          <button type="button" className="bar-next-btn" onClick={onNext}>
            <span>Next: Land as a Resource</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}


// SCREEN 05: LAND AS A RESOURCE COMPONENT
