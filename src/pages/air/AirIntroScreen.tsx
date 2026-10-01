import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Wind,
  Cloud,
  Lightbulb,
  Droplet,
  PieChart,
  Mountain,
  Check,
  Play,
} from 'lucide-react';
import { AirDonutChart } from './AirDonutChart';
import { AtmosphereColumnGraphic, type AtmosphereLayerKey } from './AtmosphereColumnGraphic';

export function AirIntroScreen() {
  const reducedMotion = useReducedMotion();
  const [selectedGas, setSelectedGas] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<AtmosphereLayerKey>('tropo');

  const layerData: Record<AtmosphereLayerKey, { name: string; altitude: string; desc: string }> = {
    thermo: {
      name: 'Thermosphere',
      altitude: '(~85–600 km)',
      desc: 'High-energy solar X-ray absorption; temperatures rise sharply. Home to the International Space Station and auroras.',
    },
    meso: {
      name: 'Mesosphere',
      altitude: '(~50–85 km)',
      desc: 'Coldest atmospheric layer (-90°C). Most meteors burn up here due to friction with atmospheric gases.',
    },
    strato: {
      name: 'Stratosphere',
      altitude: '(~12–50 km)',
      desc: 'Contains the ozone layer at ~24 km which absorbs UV radiation. Air is dry and stable; commercial jets often cruise in lower stratosphere.',
    },
    tropo: {
      name: 'Troposphere',
      altitude: '(0–12 km)',
      desc: 'Lowest layer (~39,000 ft). Holds ~80% of atmospheric mass and nearly all water vapour. All weather, life, and air breathing occurs here.',
    },
  };

  return (
    <section className="air-intro-section" id="ch-intro-air">
      {/* Background Image: High-altitude alpine clouds & glowing atmosphere */}
      <div className="air-intro-bg">
        <img
          src="/images/air-intro-alps-bg.jpg"
          alt="High altitude panorama of snow-capped mountains, turquoise lakes, and billowing cumulus clouds under morning sun"
          className="air-intro-bg-image"
        />
      </div>

      <div className="air-intro-scrim-top" />
      <div className="air-intro-scrim-bottom" />
      <div className="air-intro-scrim-left" />

      {/* ─── TOP: HEADER & QUOTE ROW ─── */}
      <div className="air-intro-header-row">
        <motion.div
          className="air-intro-header-left"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <span className="air-intro-eyebrow">CHAPTER 01</span>
          <h2 className="air-intro-title">
            Introduction <span className="air-intro-title-accent">to Air</span>
          </h2>
          <p className="air-intro-desc">
            Air is a non-homogeneous mixture of gases that surrounds the Earth. The composition of air
            refers to the chemical composition of the troposphere, the lowest layer of the atmosphere,
            which holds nearly all the water vapour and supports life on Earth.
          </p>
        </motion.div>

        <motion.div
          className="air-intro-quote-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="air-quote-mark" aria-hidden="true">“</span>
          <blockquote className="air-quote-text">
            The troposphere, though only ~12 km thick, holds ~80% of the atmosphere's mass and nearly all the water vapour.
          </blockquote>
        </motion.div>
      </div>

      {/* ─── MAIN 2-COLUMN GRID (COMPOSITION + LAYERS) ─── */}
      <div className="air-intro-main-grid">
        {/* CARD A: Composition of Dry Air */}
        <motion.div
          className="air-intro-glass-panel"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="air-panel-header">
            <h3 className="air-panel-title">Composition of Dry Air</h3>
            <span className="air-panel-subtitle">(by volume)</span>
          </div>

          {/* 3D Donut Chart Component */}
          <div style={{ margin: '6px 0 16px 0', minHeight: '185px' }}>
            <AirDonutChart activeGas={selectedGas} onSelectGas={setSelectedGas} />
          </div>

          {/* Gas Chips Grid below Donut */}
          <div className="air-gas-chips-wrap">
            {/* Major 4 Gases */}
            <div className="air-gas-chips-row-1">
              <div
                className="air-gas-chip-major"
                style={{
                  borderColor: selectedGas === 'Nitrogen' ? '#a855f7' : undefined,
                  boxShadow: selectedGas === 'Nitrogen' ? '0 0 16px rgba(168, 85, 247, 0.4)' : undefined,
                  background: selectedGas === 'Nitrogen' ? 'rgba(168, 85, 247, 0.2)' : undefined,
                }}
                onMouseEnter={() => setSelectedGas('Nitrogen')}
                onMouseLeave={() => setSelectedGas(null)}
              >
                <span className="air-chip-dot" style={{ background: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
                <div className="air-chip-major-text">
                  <span className="air-chip-major-symbol">N₂</span>
                  <span className="air-chip-major-val">78.084%</span>
                </div>
              </div>

              <div
                className="air-gas-chip-major"
                style={{
                  borderColor: selectedGas === 'Oxygen' ? '#06b6d4' : undefined,
                  boxShadow: selectedGas === 'Oxygen' ? '0 0 16px rgba(6, 182, 212, 0.4)' : undefined,
                  background: selectedGas === 'Oxygen' ? 'rgba(6, 182, 212, 0.2)' : undefined,
                }}
                onMouseEnter={() => setSelectedGas('Oxygen')}
                onMouseLeave={() => setSelectedGas(null)}
              >
                <span className="air-chip-dot" style={{ background: '#06b6d4', boxShadow: '0 0 8px #06b6d4' }} />
                <div className="air-chip-major-text">
                  <span className="air-chip-major-symbol">O₂</span>
                  <span className="air-chip-major-val">20.946%</span>
                </div>
              </div>

              <div
                className="air-gas-chip-major"
                style={{
                  borderColor: selectedGas === 'Argon' ? '#22c55e' : undefined,
                  boxShadow: selectedGas === 'Argon' ? '0 0 16px rgba(34, 197, 94, 0.4)' : undefined,
                  background: selectedGas === 'Argon' ? 'rgba(34, 197, 94, 0.2)' : undefined,
                }}
                onMouseEnter={() => setSelectedGas('Argon')}
                onMouseLeave={() => setSelectedGas(null)}
              >
                <span className="air-chip-dot" style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                <div className="air-chip-major-text">
                  <span className="air-chip-major-symbol">Ar</span>
                  <span className="air-chip-major-val">0.934%</span>
                </div>
              </div>

              <div
                className="air-gas-chip-major"
                style={{
                  borderColor: selectedGas === 'Trace' ? '#f59e0b' : undefined,
                  boxShadow: selectedGas === 'Trace' ? '0 0 16px rgba(245, 158, 11, 0.4)' : undefined,
                  background: selectedGas === 'Trace' ? 'rgba(245, 158, 11, 0.2)' : undefined,
                }}
                onMouseEnter={() => setSelectedGas('Trace')}
                onMouseLeave={() => setSelectedGas(null)}
              >
                <span className="air-chip-dot" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                <div className="air-chip-major-text">
                  <span className="air-chip-major-symbol">CO₂</span>
                  <span className="air-chip-major-val">~0.04%</span>
                </div>
              </div>
            </div>

            {/* Minor 4 Trace Gases */}
            <div className="air-gas-chips-row-2">
              <div className="air-gas-chip-minor">
                <span className="air-chip-minor-formula">Ne</span>
                <span>0.001818%</span>
              </div>
              <div className="air-gas-chip-minor">
                <span className="air-chip-minor-formula">He</span>
                <span>0.000524%</span>
              </div>
              <div className="air-gas-chip-minor">
                <span className="air-chip-minor-formula">CH₄</span>
                <span>0.000187%</span>
              </div>
              <div className="air-gas-chip-minor">
                <Droplet size={11} color="#38bdf8" />
                <span className="air-chip-minor-formula">H₂O</span>
                <span>0–5% (~0.4%)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD B: Layers of Atmosphere */}
        <motion.div
          className="air-intro-glass-panel"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="air-panel-header">
            <h3 className="air-panel-title">Layers of Atmosphere</h3>
            <span className="air-panel-subtitle">Thermal & mass structure from surface to space</span>
          </div>

          {/* Atmospheric Graphic & Timeline */}
          <div style={{ margin: '4px 0 14px 0' }}>
            <AtmosphereColumnGraphic
              activeLayer={activeLayer}
              onSelectLayer={setActiveLayer}
            />
          </div>

          {/* Active Layer Details */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'rgba(3, 7, 18, 0.55)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              marginTop: 'auto',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#e0f2fe', lineHeight: 1.55 }}>
              <strong style={{ color: '#38bdf8' }}>{layerData[activeLayer].name}:</strong>{' '}
              {layerData[activeLayer].desc}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ─── BOTTOM 4 FEATURE CARDS ─── */}
      <div className="air-intro-bottom-grid">
        {/* Card 1: Key Facts */}
        <motion.div
          className="air-intro-fact-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="air-intro-card-top">
            <div className="air-intro-card-icon-pill">
              <Wind size={16} />
            </div>
            <strong className="air-intro-card-title">Key Facts</strong>
          </div>
          <ul className="air-intro-fact-list">
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Wind size={13} color="#7dd3fc" /></span>
              <span>Air is a non-homogeneous mixture of gases.</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><PieChart size={13} color="#7dd3fc" /></span>
              <span>Three gases (N₂, O₂, Ar) make up ~99% of dry air.</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Mountain size={13} color="#7dd3fc" /></span>
              <span>Troposphere is the lowest layer (~12 km / 39,000 ft).</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Droplet size={13} color="#7dd3fc" /></span>
              <span>Holds ~80% of the atmosphere's mass and nearly all water vapour.</span>
            </li>
          </ul>
        </motion.div>

        {/* Card 2: Role of the Troposphere */}
        <motion.div
          className="air-intro-fact-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="air-intro-card-top">
            <div className="air-intro-card-icon-pill">
              <Cloud size={16} />
            </div>
            <strong className="air-intro-card-title">Role of the Troposphere</strong>
          </div>
          <ul className="air-intro-fact-list">
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Supports life on Earth</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Contains most of the water vapour</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Weather and climate occur in this layer</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Directly interacts with land and oceans</span>
            </li>
          </ul>
        </motion.div>

        {/* Card 3: Trace Gases (Important) */}
        <motion.div
          className="air-intro-fact-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="air-intro-card-top">
            <div className="air-intro-card-icon-pill">
              <Mountain size={16} />
            </div>
            <strong className="air-intro-card-title">Trace Gases (Important)</strong>
          </div>
          <ul className="air-intro-fact-list">
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Play size={10} color="#38bdf8" fill="currentColor" /></span>
              <span>CO₂ ~0.04% (important for greenhouse effect)</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Play size={10} color="#38bdf8" fill="currentColor" /></span>
              <span>Ne – 0.001818%</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Play size={10} color="#38bdf8" fill="currentColor" /></span>
              <span>He – 0.000524%</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Play size={10} color="#38bdf8" fill="currentColor" /></span>
              <span>CH₄ – 0.000187%</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Play size={10} color="#38bdf8" fill="currentColor" /></span>
              <span>H₂O – 0 to 5% (average ~0.4%)</span>
            </li>
          </ul>
        </motion.div>

        {/* Card 4: Why It Matters? */}
        <motion.div
          className="air-intro-fact-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="air-intro-card-top">
            <div className="air-intro-card-icon-pill">
              <Lightbulb size={16} />
            </div>
            <strong className="air-intro-card-title">Why It Matters?</strong>
          </div>
          <ul className="air-intro-fact-list">
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Provides oxygen for respiration</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Maintains suitable temperature</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Enables weather and climate processes</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Supports all living organisms</span>
            </li>
            <li className="air-intro-fact-item">
              <span className="air-intro-fact-icon"><Check size={13} color="#38bdf8" /></span>
              <span>Essential for a healthy and stable environment</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
