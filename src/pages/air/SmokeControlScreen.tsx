import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CloudRain,
  Layers,
  BarChart3,
  Heart,
  Settings,
  Flame,
  Building,
  Wrench,
  Lightbulb,
  Check,
  Leaf,
  Landmark,
} from 'lucide-react';
import './SmokeControlScreen.css';

export function SmokeControlScreen() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="air-smoke-section" id="ch-smoke">
      {/* ─── BACKGROUND: FACTORY SMOKESTACKS WITH SUNSET DUSK SKY ─── */}
      <div className="air-smoke-bg" aria-hidden="true">
        <img
          src="/images/air-control-equipment-bg.jpg"
          alt="Industrial power plant factory with multiple smokestacks emitting plumes of smoke at golden sunset"
          className="air-smoke-bg-image"
        />
      </div>

      {/* Atmospheric Scrims for Readability */}
      <div className="air-smoke-scrim-left" />
      <div className="air-smoke-scrim-top" />
      <div className="air-smoke-scrim-bottom" />

      {/* ─── HEADER ROW & FLOATING QUOTE ─── */}
      <div className="air-smoke-header-row">
        <motion.div
          className="air-smoke-header-left"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <span className="air-smoke-eyebrow">CHAPTER 10</span>
          <h2 className="air-smoke-title">
            Smoke & <br />
            <span className="air-smoke-title-accent">Its Control</span>
          </h2>
          <p className="air-smoke-desc">
            Smoke is a visible form of air pollution consisting of fine solid and liquid particles
            produced by incomplete combustion of fuels. It can cause serious health problems, reduce
            visibility, soil buildings and crops, and contribute to climate change.
          </p>
        </motion.div>

        {/* Top-Right Floating Quote Card (Exact Match to Mockup) */}
        <motion.div
          className="air-smoke-quote-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <span className="air-smoke-quote-mark" aria-hidden="true">“</span>
          <p className="air-smoke-quote-text">
            Controlling smoke reduces visible emissions, improves air quality, protects human health
            and helps create a cleaner, healthier and more sustainable environment.
          </p>
        </motion.div>
      </div>

      {/* ─── TOP ROW: 3 GLASS CARDS ─── */}
      <div className="air-smoke-top-grid">
        {/* CARD 1: WHAT IS SMOKE? */}
        <motion.div
          className="air-smoke-glass-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="air-smoke-card-head">
            <div className="air-smoke-icon-circle">
              <CloudRain size={15} />
            </div>
            <h3 className="air-smoke-card-title">What is Smoke?</h3>
          </div>

          <div className="air-smoke-what-layout">
            <div className="air-smoke-what-thumb">
              <img
                src="/images/air-anthro-industrial-emissions.jpg"
                alt="Dense plume of smoke rising from industrial stacks"
              />
            </div>
            <ul className="air-smoke-what-list">
              <li>
                <span className="air-smoke-diamond">◆</span>
                <span>Visible mixture of fine solid and liquid particles</span>
              </li>
              <li>
                <span className="air-smoke-diamond">◆</span>
                <span>Produced by incomplete combustion of fossil fuels (coal, oil, biomass, etc.)</span>
              </li>
              <li>
                <span className="air-smoke-diamond">◆</span>
                <span>Contains carbon (soot), ash, unburnt hydrocarbons and other pollutants</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CARD 2: TYPES OF SMOKE */}
        <motion.div
          className="air-smoke-glass-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="air-smoke-card-head">
            <div className="air-smoke-icon-circle">
              <Layers size={15} />
            </div>
            <h3 className="air-smoke-card-title">Types of Smoke</h3>
          </div>

          <div className="air-smoke-types-grid">
            {/* Black Smoke */}
            <div className="air-smoke-type-item">
              <div className="air-smoke-type-thumb">
                <img
                  src="/images/smoke-type-black-plume.jpg"
                  alt="Thick dark black carbon smoke plume against sky"
                />
              </div>
              <h4 className="air-smoke-type-name gold">Black Smoke</h4>
              <p className="air-smoke-type-desc">
                High carbon particles due to incomplete combustion
              </p>
            </div>

            {/* White Smoke */}
            <div className="air-smoke-type-item">
              <div className="air-smoke-type-thumb">
                <img
                  src="/images/air-plant-twilight.jpg"
                  alt="White condensed steam and fine smoke particles"
                />
              </div>
              <h4 className="air-smoke-type-name white">White Smoke</h4>
              <p className="air-smoke-type-desc">
                Condensed water vapour with fine particles
              </p>
            </div>

            {/* Brown/Yellow Smoke */}
            <div className="air-smoke-type-item">
              <div className="air-smoke-type-thumb">
                <img
                  src="/images/air-polluted-cityscape.jpg"
                  alt="Brownish-yellow smog plume with NO2 and SO2"
                />
              </div>
              <h4 className="air-smoke-type-name amber">Brown/Yellow Smoke</h4>
              <p className="air-smoke-type-desc">
                Mixture of particles and gases (e.g. NO₂, SO₂, hydrocarbons)
              </p>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: SOURCES OF SMOKE */}
        <motion.div
          className="air-smoke-glass-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="air-smoke-card-head">
            <div className="air-smoke-icon-circle">
              <BarChart3 size={15} />
            </div>
            <h3 className="air-smoke-card-title">Sources of Smoke</h3>
          </div>

          <div className="air-smoke-sources-grid">
            {/* Thermal Power Plants */}
            <div className="air-smoke-source-item">
              <div className="air-smoke-source-thumb">
                <img
                  src="/images/air-anthro-thermal-power.jpg"
                  alt="Thermal power plant cooling towers and stacks"
                />
              </div>
              <h4 className="air-smoke-source-name">Thermal Power Plants</h4>
            </div>

            {/* Industrial Boilers & Furnaces */}
            <div className="air-smoke-source-item">
              <div className="air-smoke-source-thumb">
                <img
                  src="/images/air-real-industrial.jpg"
                  alt="Industrial boilers, furnaces, and chemical stacks"
                />
              </div>
              <h4 className="air-smoke-source-name">Industrial Boilers & Furnaces</h4>
            </div>

            {/* Diesel Engines */}
            <div className="air-smoke-source-item">
              <div className="air-smoke-source-thumb">
                <img
                  src="/images/smoke-source-diesel.jpg"
                  alt="Diesel truck exhaust emitting black smoke plumes"
                />
              </div>
              <h4 className="air-smoke-source-name">Diesel Engines</h4>
            </div>

            {/* Open Burning */}
            <div className="air-smoke-source-item">
              <div className="air-smoke-source-thumb">
                <img
                  src="/images/air-real-agriculture.jpg"
                  alt="Agricultural waste stubble burning in farm field"
                />
              </div>
              <h4 className="air-smoke-source-name">Open Burning (Agricultural Waste)</h4>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── MIDDLE ROW: EFFECTS (LEFT) & METHODS (RIGHT) ─── */}
      <div className="air-smoke-middle-grid">
        {/* CARD 4: EFFECTS OF SMOKE */}
        <motion.div
          className="air-smoke-glass-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="air-smoke-card-head">
            <div className="air-smoke-icon-circle">
              <Heart size={15} />
            </div>
            <h3 className="air-smoke-card-title">Effects of Smoke</h3>
          </div>

          <div className="air-smoke-effects-rows">
            {/* Human Health */}
            <div className="air-smoke-effect-row health">
              <div className="air-smoke-effect-badge health">
                <div className="air-smoke-effect-badge-icon">
                  <Heart size={10} fill="#fca5a5" />
                </div>
                <span>Human Health</span>
              </div>
              <ul className="air-smoke-effect-list">
                <li>Respiratory problems</li>
                <li>Lung irritation</li>
                <li>Increased risk of chronic diseases</li>
              </ul>
            </div>

            {/* Environment */}
            <div className="air-smoke-effect-row environment">
              <div className="air-smoke-effect-badge environment">
                <div className="air-smoke-effect-badge-icon">
                  <Leaf size={10} fill="#86efac" />
                </div>
                <span>Environment</span>
              </div>
              <ul className="air-smoke-effect-list">
                <li>Reduces visibility (smog)</li>
                <li>Harms plants and crops</li>
                <li>Contributes to climate change</li>
              </ul>
            </div>

            {/* Materials & Property */}
            <div className="air-smoke-effect-row materials">
              <div className="air-smoke-effect-badge materials">
                <div className="air-smoke-effect-badge-icon">
                  <Building size={10} />
                </div>
                <span>Materials & Property</span>
              </div>
              <ul className="air-smoke-effect-list">
                <li>Soils buildings and monuments</li>
                <li>Corrodes metals</li>
                <li>Reduces aesthetic value</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CARD 5: METHODS FOR SMOKE CONTROL */}
        <motion.div
          className="air-smoke-glass-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <div className="air-smoke-card-head">
            <div className="air-smoke-icon-circle">
              <Settings size={15} />
            </div>
            <h3 className="air-smoke-card-title">Methods for Smoke Control</h3>
          </div>

          <div className="air-smoke-methods-grid">
            {/* Column 1: Improved Combustion */}
            <div className="air-smoke-method-col">
              <div className="air-smoke-method-header">
                <div className="air-smoke-method-badge-icon flame">
                  <Flame size={12} />
                </div>
                <h4 className="air-smoke-method-name">Improved Combustion</h4>
              </div>

              <div className="air-smoke-method-thumb">
                <img
                  src="/images/smoke-combustion-fire.jpg"
                  alt="Intense high-temperature combustion burner flame"
                />
              </div>

              <ul className="air-smoke-method-checklist">
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Proper air-fuel ratio</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Complete combustion</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Use of low-sulphur fuels</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Regular maintenance</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Particle Removal Equipment */}
            <div className="air-smoke-method-col">
              <div className="air-smoke-method-header">
                <div className="air-smoke-method-badge-icon filter">
                  <Landmark size={12} />
                </div>
                <h4 className="air-smoke-method-name">Particle Removal Equipment</h4>
              </div>

              <div className="air-smoke-method-thumb">
                <img
                  src="/images/air-esp-model.jpg"
                  alt="Industrial electrostatic precipitator and baghouse equipment"
                />
              </div>

              <ul className="air-smoke-method-checklist">
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Electrostatic Precipitator (ESP)</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Fabric Filter (Baghouse)</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Cyclone Separator</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Wet Scrubber</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Other Measures */}
            <div className="air-smoke-method-col">
              <div className="air-smoke-method-header">
                <div className="air-smoke-method-badge-icon wrench">
                  <Wrench size={12} />
                </div>
                <h4 className="air-smoke-method-name">Other Measures</h4>
              </div>

              <div className="air-smoke-method-thumb">
                <img
                  src="/images/smoke-method-clean-stack.jpg"
                  alt="Tall clean stack emitting treated exhaust under clear blue skies"
                />
              </div>

              <ul className="air-smoke-method-checklist">
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Use of clean fuels (LPG, CNG)</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Flue gas desulphurization</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Proper stack height</span>
                </li>
                <li>
                  <span className="air-smoke-check-icon">
                    <Check size={8} strokeWidth={3} />
                  </span>
                  <span>Regular monitoring and emission standards compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── BOTTOM ROW: KEY TAKEAWAYS STRIP ─── */}
      <motion.div
        className="air-smoke-takeaways-bar"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: 0.28 }}
      >
        <div className="air-smoke-takeaways-label">
          <div className="air-smoke-icon-circle">
            <Lightbulb size={14} />
          </div>
          <span>Key Takeaways</span>
        </div>

        <div className="air-smoke-takeaways-items">
          {/* Item 1 */}
          <div className="air-smoke-takeaway-item">
            <div className="air-smoke-takeaway-icon blue">
              <CloudRain size={12} />
            </div>
            <p className="air-smoke-takeaway-text">
              Smoke is a visible form of air pollution from incomplete combustion.
            </p>
          </div>

          {/* Item 2 */}
          <div className="air-smoke-takeaway-item">
            <div className="air-smoke-takeaway-icon red">
              <Heart size={12} fill="#fca5a5" />
            </div>
            <p className="air-smoke-takeaway-text">
              It affects human health, environment and infrastructure.
            </p>
          </div>

          {/* Item 3 */}
          <div className="air-smoke-takeaway-item">
            <div className="air-smoke-takeaway-icon purple">
              <Settings size={12} />
            </div>
            <p className="air-smoke-takeaway-text">
              It can be controlled using improved combustion and particle removal equipment.
            </p>
          </div>

          {/* Item 4 */}
          <div className="air-smoke-takeaway-item">
            <div className="air-smoke-takeaway-icon green">
              <Leaf size={12} fill="#86efac" />
            </div>
            <p className="air-smoke-takeaway-text">
              Using clean fuels and proper regulations helps reduce smoke emissions.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
