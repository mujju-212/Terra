import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Snowflake,
  Thermometer,
  Leaf,
  Cloud,
  Atom,
  Info,
  Globe,
  Flame,
  ArrowRight,
} from 'lucide-react';
import './WarmingGreenhouseScreen.css';

interface WarmingGreenhouseScreenProps {
  onScrollToNext?: () => void;
}

export function WarmingGreenhouseScreen({ onScrollToNext }: WarmingGreenhouseScreenProps) {
  // Master Level: 0 = Low (Pre-industrial/None), 50 = Current (420 ppm), 100 = High (Runaway)
  const [masterLevel, setMasterLevel] = useState<number>(50);
  const [activeStage, setActiveStage] = useState<number>(2); // Default to stage 2 (30% reflected)
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Derive individual gas values dynamically from master slider
  // Baseline Pre-industrial / Low: CO2 280 ppm, CH4 0.75 ppm, N2O 0.27 ppm
  // Current (at 50): CO2 420 ppm, CH4 1.90 ppm, N2O 0.34 ppm
  // High (at 100): CO2 620 ppm, CH4 3.60 ppm, N2O 0.48 ppm
  const co2Ppm = Math.round(280 + (masterLevel / 50) * 140);
  const ch4Ppm = (0.75 + (masterLevel / 100) * 2.3).toFixed(1);
  const n2oPpm = (0.27 + (masterLevel / 100) * 0.21).toFixed(2);

  // Calculate dynamic Earth Temperature
  // Natural greenhouse effect adds ~33°C to the -18°C frozen planet, reaching +15°C
  // Enhanced warming adds +1.1°C to +4.5°C when masterLevel > 50
  let calculatedTemp: string;
  let tempLabel: string;
  let tempSublabel: string;

  if (masterLevel <= 5) {
    calculatedTemp = '-18.0°C';
    tempLabel = 'No greenhouse gases';
    tempSublabel = '(completely frozen planet)';
  } else if (masterLevel < 50) {
    const t = -18 + (masterLevel / 50) * 33;
    calculatedTemp = `${t > 0 ? '+' : ''}${t.toFixed(1)}°C`;
    tempLabel = 'Weak greenhouse effect';
    tempSublabel = '(severe glacial conditions)';
  } else if (masterLevel === 50) {
    calculatedTemp = '+15.0°C';
    tempLabel = 'With natural greenhouse effect';
    tempSublabel = '(liveable temperature)';
  } else {
    // 51 to 100: human enhanced warming
    const extraWarming = ((masterLevel - 50) / 50) * 4.8;
    const t = 15.0 + extraWarming;
    calculatedTemp = `+${t.toFixed(1)}°C`;
    tempLabel = 'Human-enhanced global warming';
    tempSublabel = `(+${extraWarming.toFixed(1)}°C dangerous climate anomaly)`;
  }

  // Handle master level drag
  const handleMasterSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMasterLevel(Number(e.target.value));
  };

  // Compute thermal alpha for CSS
  const thermalAlpha = (0.15 + (masterLevel / 100) * 0.45).toFixed(2);

  return (
    <section
      id="ch-01-greenhouse"
      className="gh-screen-container"
      style={{ '--thermal-alpha': thermalAlpha } as React.CSSProperties}
      aria-label="Chapter 01: Global Warming - The Greenhouse Effect"
    >
      {/* ── Background Layer using Image 2 ── */}
      <div className="gh-screen-bg" aria-hidden="true">
        <img
          src="/images/warming-greenhouse-bg.jpg"
          alt="Earth in space with radiant sun and glowing atmospheric envelope"
          loading="eager"
        />
        <div className="gh-thermal-glow-overlay" />
        <div className="gh-screen-vignette" />
      </div>

      {/* ── Central Canvas SVG Annotations Layer ── */}
      <div className="gh-canvas-overlay" aria-hidden="true">
        {/* 1. 30% Reflected Rays */}
        <div
          className={`gh-callout-reflected ${activeStage === 2 ? 'is-focused' : ''}`}
          style={{ opacity: activeStage === 0 || activeStage === 2 ? 1 : 0.6 }}
        >
          <div className="gh-ray-arrows">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M6 38 L28 14 M28 14 L16 14 M28 14 L28 26"
                stroke="#facc15"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 44 L38 18 M38 18 L26 18 M38 18 L38 30"
                stroke="#facc15"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </svg>
          </div>
          <div className="gh-callout-text">
            <span className="gh-callout-stat">30%</span>
            <span className="gh-callout-label">reflected to space</span>
          </div>
        </div>

        {/* 2. 70% Absorbed Rays */}
        <div
          className={`gh-callout-absorbed ${activeStage === 3 ? 'is-focused' : ''}`}
          style={{ opacity: activeStage === 0 || activeStage === 3 ? 1 : 0.6 }}
        >
          <div className="gh-ray-arrows">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M10 6 L30 30 M30 30 L30 18 M30 30 L18 30"
                stroke="#facc15"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 4 L38 28 M38 28 L38 16 M38 28 L26 28"
                stroke="#facc15"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </svg>
          </div>
          <div className="gh-callout-text">
            <span className="gh-callout-stat">70%</span>
            <span className="gh-callout-label">
              absorbed by<br />Earth system
            </span>
          </div>
        </div>

        {/* 3. Curved "Greenhouse gases trap heat" Arch Banner */}
        <div
          className="gh-callout-trapped-banner"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + (masterLevel - 50) * 0.003})`,
            borderColor: masterLevel > 60 ? '#f97316' : 'rgba(251, 146, 60, 0.38)',
          }}
        >
          <Flame size={15} color="#ea580c" />
          <span>Greenhouse gases trap heat</span>
        </div>

        {/* 4. Wavy Rising Thermal Trapped Arrows */}
        <div className="gh-wavy-heat-cluster">
          {[1, 2, 3, 4, 5].map((idx) => (
            <svg
              key={idx}
              className="gh-wavy-heat-arrow"
              width="26"
              height="48"
              viewBox="0 0 26 48"
              fill="none"
              style={{
                opacity: 0.35 + (masterLevel / 100) * 0.65,
                transform: `scale(${0.85 + (masterLevel / 100) * 0.35})`,
              }}
            >
              <path
                d="M13 46 C7 38 19 32 13 24 C7 16 19 10 13 4 M7 10 L13 3 L19 10"
                stroke="#f97316"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>

        {/* 5. Leader Line Annotations (Atmosphere, GHGs, Surface) */}
        <div className="gh-annotation-layer">
          <div className="gh-leader-item">
            <span className="gh-leader-dot" />
            <span className="gh-leader-line" />
            <span className="gh-leader-text">Greenhouse gases (CO₂, CH₄, N₂O, etc.)</span>
          </div>

          <div className="gh-leader-item">
            <span className="gh-leader-dot dot-atmosphere" />
            <span className="gh-leader-line" />
            <span className="gh-leader-text">Atmosphere</span>
          </div>

          <div className="gh-leader-item">
            <span className="gh-leader-dot dot-surface" />
            <span className="gh-leader-line" />
            <span className="gh-leader-text">Earth's surface</span>
          </div>
        </div>
      </div>

      {/* ── Main Top Stage: Header Copy (Left) + Control Cards (Right) ── */}
      <div className="gh-main-stage">
        {/* Top Left Header Copy */}
        <div className="gh-header-block">
          <div className="gh-header-eyebrow">
            <span>MODULE 05</span>
            <span className="gh-eyebrow-pipe">|</span>
            <span>CHAPTER 01</span>
          </div>
          <h1 className="gh-header-title">Global Warming</h1>
          <h2 className="gh-header-subtitle">The Greenhouse Effect</h2>
          <p className="gh-header-description">
            Earth receives energy from the Sun. Some of it is reflected back to space, while the
            rest is absorbed by the surface and atmosphere. Greenhouse gases trap a part of this
            heat, keeping Earth warm.
          </p>
        </div>

        {/* Top Right Controls Column */}
        <div className="gh-controls-column">
          {/* Card A: Adjust Greenhouse Gas Levels */}
          <div className="gh-glass-panel">
            <div className="gh-panel-head">
              <h3 className="gh-panel-title">Adjust Greenhouse Gas Levels</h3>
              <button
                type="button"
                className="gh-info-trigger"
                onClick={() => setShowInfo(!showInfo)}
                aria-label="Greenhouse gas radiative forcing info"
                title="Click for radiative forcing details"
              >
                <Info size={13} />
              </button>
            </div>

            {/* Info Drawer */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    fontSize: '11.5px',
                    lineHeight: '1.5',
                    color: 'rgba(255,255,255,0.78)',
                    marginBottom: '14px',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  Greenhouse gases absorb outgoing thermal infrared radiation and re-radiate heat back to
                  Earth. Pre-industrial CO₂ was ~280 ppm; human emissions have raised it over 420 ppm,
                  amplifying heat retention.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Master Slider Track */}
            <div className="gh-master-slider-wrap">
              <div
                className="gh-master-track"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  setMasterLevel(Math.round(clickPos));
                }}
              >
                <div
                  className="gh-master-thumb"
                  style={{ left: `${masterLevel}%` }}
                />
              </div>
              <div className="gh-master-labels">
                <span>Low</span>
                <span>Current</span>
                <span>High</span>
              </div>
              {/* Invisible native range input for keyboard / screen-reader accessibility */}
              <input
                type="range"
                min="0"
                max="100"
                value={masterLevel}
                onChange={handleMasterSliderChange}
                aria-label="Adjust master greenhouse gas levels"
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Individual Gas Rows */}
            <div className="gh-gases-list">
              {/* CO2 Row */}
              <div className="gh-gas-row">
                <span className="gh-gas-icon icon-co2">
                  <Leaf size={14} />
                </span>
                <div className="gh-gas-label-group">
                  <span className="gh-gas-formula">CO₂</span>
                  <span className="gh-gas-value">{co2Ppm} ppm</span>
                </div>
                <div
                  className="gh-mini-track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                    setMasterLevel(Math.round(p));
                  }}
                >
                  <div className="gh-mini-fill" style={{ width: `${masterLevel}%` }} />
                  <div className="gh-mini-thumb" style={{ left: `${masterLevel}%` }} />
                </div>
              </div>

              {/* CH4 Row */}
              <div className="gh-gas-row">
                <span className="gh-gas-icon icon-ch4">
                  <Cloud size={14} />
                </span>
                <div className="gh-gas-label-group">
                  <span className="gh-gas-formula">CH₄</span>
                  <span className="gh-gas-value">{ch4Ppm} ppm</span>
                </div>
                <div
                  className="gh-mini-track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                    setMasterLevel(Math.round(p));
                  }}
                >
                  <div className="gh-mini-fill" style={{ width: `${masterLevel}%` }} />
                  <div className="gh-mini-thumb" style={{ left: `${masterLevel}%` }} />
                </div>
              </div>

              {/* N2O Row */}
              <div className="gh-gas-row">
                <span className="gh-gas-icon icon-n2o">
                  <Atom size={14} />
                </span>
                <div className="gh-gas-label-group">
                  <span className="gh-gas-formula">N₂O</span>
                  <span className="gh-gas-value">{n2oPpm} ppm</span>
                </div>
                <div
                  className="gh-mini-track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                    setMasterLevel(Math.round(p));
                  }}
                >
                  <div className="gh-mini-fill" style={{ width: `${masterLevel}%` }} />
                  <div className="gh-mini-thumb" style={{ left: `${masterLevel}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Earth's Average Temperature */}
          <div className="gh-glass-panel gh-temp-card">
            <div className="gh-panel-head">
              <h3 className="gh-panel-title">Earth's Average Temperature</h3>
            </div>
            <div className="gh-temp-grid">
              {/* Left Box: -18°C Frozen */}
              <div className="gh-temp-box box-frozen">
                <div className="gh-temp-row">
                  <Snowflake className="gh-temp-icon" color="#7dd3fc" size={24} />
                  <span className="gh-temp-num">-18°C</span>
                </div>
                <span className="gh-temp-main-label">Without greenhouse effect</span>
                <span className="gh-temp-sublabel">(Earth would be frozen)</span>
              </div>

              {/* Divider Arrow */}
              <div className="gh-temp-arrow-divider" aria-hidden="true">
                ➔
              </div>

              {/* Right Box: Dynamic Current / Warming Temp */}
              <div className="gh-temp-box box-warm">
                <div className="gh-temp-row">
                  <Thermometer className="gh-temp-icon" color="#fb923c" size={24} />
                  <span className="gh-temp-num">{calculatedTemp}</span>
                </div>
                <span className="gh-temp-main-label">{tempLabel}</span>
                <span className="gh-temp-sublabel">{tempSublabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: 5 Glass Stage Cards ── */}
      <div className="gh-cards-grid" role="group" aria-label="Greenhouse effect process stages">
        {/* Card 1 */}
        <div
          className={`gh-stage-card ${activeStage === 1 ? 'is-active' : ''}`}
          onClick={() => setActiveStage(1)}
          tabIndex={0}
          role="button"
          aria-pressed={activeStage === 1}
        >
          <div className="gh-card-top">
            <span className="gh-card-badge">1</span>
            <span className="gh-card-icon">
              <Sun size={20} />
            </span>
          </div>
          <h4 className="gh-card-title">Solar Radiation</h4>
          <p className="gh-card-desc">Earth receives short-wave radiation from the Sun.</p>
        </div>

        {/* Card 2 */}
        <div
          className={`gh-stage-card ${activeStage === 2 ? 'is-active' : ''}`}
          onClick={() => setActiveStage(2)}
          tabIndex={0}
          role="button"
          aria-pressed={activeStage === 2}
        >
          <div className="gh-card-top">
            <span className="gh-card-badge">2</span>
            <span className="gh-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 18 L12 8 L20 18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8 L18 8 M12 8 L12 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <h4 className="gh-card-title">30% Reflected</h4>
          <p className="gh-card-desc">
            About 30% of incoming solar radiation is reflected back to space by clouds, atmosphere and surface.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className={`gh-stage-card ${activeStage === 3 ? 'is-active' : ''}`}
          onClick={() => setActiveStage(3)}
          tabIndex={0}
          role="button"
          aria-pressed={activeStage === 3}
        >
          <div className="gh-card-top">
            <span className="gh-card-badge">3</span>
            <span className="gh-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 4 L6 18 M6 18 L3 15 M6 18 L9 15"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4 L12 20 M12 20 L9 17 M12 20 L15 17"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 4 L18 18 M18 18 L15 15 M18 18 L21 15"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <h4 className="gh-card-title">70% Absorbed</h4>
          <p className="gh-card-desc">
            About 70% is absorbed by land, oceans and atmosphere, warming Earth's surface.
          </p>
        </div>

        {/* Card 4 */}
        <div
          className={`gh-stage-card ${activeStage === 4 ? 'is-active' : ''}`}
          onClick={() => setActiveStage(4)}
          tabIndex={0}
          role="button"
          aria-pressed={activeStage === 4}
        >
          <div className="gh-card-top">
            <span className="gh-card-badge">4</span>
            <span className="gh-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 20 C4 15 10 11 7 6 M4 9 L7 5 L10 9"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21 C9 15 15 11 12 5 M9 8 L12 4 L15 8"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 20 C14 15 20 11 17 6 M14 9 L17 5 L20 9"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <h4 className="gh-card-title">Trapped Heat</h4>
          <p className="gh-card-desc">
            Greenhouse gases trap a part of outgoing long-wave radiation, preventing it from escaping to space.
          </p>
        </div>

        {/* Card 5 */}
        <div
          className={`gh-stage-card ${activeStage === 5 ? 'is-active' : ''}`}
          onClick={() => setActiveStage(5)}
          tabIndex={0}
          role="button"
          aria-pressed={activeStage === 5}
        >
          <div className="gh-card-top">
            <span className="gh-card-badge">5</span>
            <span className="gh-card-icon">
              <Globe size={19} />
            </span>
          </div>
          <h4 className="gh-card-title">Warming Effect</h4>
          <p className="gh-card-desc">
            This natural greenhouse effect keeps Earth warm. Increasing greenhouse gases enhance this
            effect, leading to global warming.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WarmingGreenhouseScreen;
