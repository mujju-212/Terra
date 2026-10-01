import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Atom,
  FlaskConical,
  ShieldCheck,
  HeartPulse,
  Leaf,
  Building2,
  Check,
  Quote,
  ArrowRight,
  Sun,
  Flame,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import './OzoneDepletionScreen.css';

interface ODSItem {
  id: string;
  name: string;
  formula: string;
  badgeClass: string;
  uses: string;
}

const odsSubstances: ODSItem[] = [
  {
    id: 'cfc',
    name: 'CFCs',
    formula: 'Chlorofluorocarbons',
    badgeClass: 'badge-red',
    uses: 'Refrigerants, aerosol sprays, foam blowing agents',
  },
  {
    id: 'halons',
    name: 'Halons',
    formula: 'Bromofluorocarbons',
    badgeClass: 'badge-yellow',
    uses: 'Fire extinguishers',
  },
  {
    id: 'ccl4',
    name: 'Carbon Tetrachloride',
    formula: 'CCl₄',
    badgeClass: 'badge-green',
    uses: 'Solvents, industrial use',
  },
  {
    id: 'ch3ccl3',
    name: 'Methyl Chloroform',
    formula: 'CH₃CCl₃',
    badgeClass: 'badge-blue',
    uses: 'Solvents, metal cleaning',
  },
  {
    id: 'hcfcs',
    name: 'Hydrochlorofluorocarbons',
    formula: 'HCFCs',
    badgeClass: 'badge-purple',
    uses: 'Transitional substitutes (less harmful)',
  },
  {
    id: 'ch3br',
    name: 'Methyl Bromide',
    formula: 'CH₃Br',
    badgeClass: 'badge-pink',
    uses: 'Fumigant in agriculture',
  },
];

const controlMeasures = [
  'Montreal Protocol (1987) to phase out ODS.',
  'Gradual reduction and ban on CFCs, halons and other ODS.',
  'Use of ozone-friendly alternatives (HFCs, natural refrigerants).',
  'Proper disposal and recovery of old equipment.',
  'International cooperation and monitoring of stratospheric ozone levels.',
];

const keyTakeaways = [
  {
    icon: Globe,
    text: 'Ozone layer is in the stratosphere and protects Earth from harmful UV radiation.',
    color: '#38bdf8',
  },
  {
    icon: Atom,
    text: 'CFCs, halons and other ODS cause ozone depletion by releasing Cl and Br atoms.',
    color: '#f87171',
  },
  {
    icon: AlertTriangle,
    text: 'Increases UV radiation, leading to health, environmental and material damage.',
    color: '#c084fc',
  },
  {
    icon: Leaf,
    text: 'Montreal Protocol and global efforts have helped in reducing ozone depletion.',
    color: '#34d399',
  },
];

export function OzoneDepletionScreen() {
  const reducedMotion = useReducedMotion();
  const [selectedODS, setSelectedODS] = useState<string | null>(null);
  const [activeDobsonYear, setActiveDobsonYear] = useState<'1980' | '2000'>('2000');

  return (
    <section className="air-ozone-section" id="ch-ozone">
      {/* ─── ATMOSPHERIC BACKGROUND (Earth Curvature + Glowing Ozone Layer + Sun) ─── */}
      <div className="air-ozone-bg" aria-hidden="true">
        <img
          src="/images/air-ozone-bg.jpg"
          alt="Orbital view of Earth atmosphere curvature with radiant blue stratospheric ozone layer and sun flare"
          className="air-ozone-bg-image"
        />

        {/* Ambient atmospheric overlay annotations matching Image 1 */}
        <div className="air-ozone-strato-annotation">
          <div className="strato-badge">
            <span className="strato-dot" />
            <span className="strato-text">Ozone Layer (15 – 35 km)</span>
          </div>
          <div className="strato-pointer-line" />
        </div>

        {/* UV Solar Radiation Ray Arrows */}
        <div className="air-ozone-uv-rays">
          <div className="uv-badge">
            <Sun size={12} className="uv-sun-icon" />
            <span>UV Radiation</span>
          </div>
          <div className="uv-ray-arrows">
            <span className="uv-arrow ray-1" />
            <span className="uv-arrow ray-2" />
            <span className="uv-arrow ray-3" />
            <span className="uv-arrow ray-4" />
          </div>
        </div>
      </div>

      {/* Atmospheric Scrims for text contrast */}
      <div className="air-ozone-scrim-left" />
      <div className="air-ozone-scrim-top" />
      <div className="air-ozone-scrim-bottom" />

      {/* ─── HEADER ROW & FLOATING QUOTE (Exact Match to Image 1) ─── */}
      <div className="air-ozone-header-row">
        <motion.div
          className="air-ozone-header-left"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <span className="air-ozone-eyebrow">CHAPTER 11</span>
          <h2 className="air-ozone-title">
            Ozone <span className="air-ozone-title-accent">Depletion</span>
          </h2>
          <p className="air-ozone-desc">
            Ozone depletion refers to the reduction of ozone concentration in the stratosphere due to
            release of certain human-made chemicals. It allows more harmful ultraviolet (UV) radiation
            from the sun to reach the Earth's surface, causing adverse effects on human health,
            ecosystems and materials.
          </p>
        </motion.div>

        {/* Top-Right Floating Quote Card */}
        <motion.div
          className="air-ozone-quote-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <span className="air-ozone-quote-mark" aria-hidden="true">
            “
          </span>
          <p className="air-ozone-quote-text">
            The ozone layer acts as Earth's natural sunscreen, absorbing most of the sun's harmful
            ultraviolet radiation. Depletion of this layer increases the amount of UV radiation
            reaching the Earth's surface.
          </p>
        </motion.div>
      </div>

      {/* ─── ROW 1: 3 PRIMARY CARDS (What is Ozone · How Depleted · Major ODS) ─── */}
      <div className="air-ozone-top-grid">
        {/* CARD 1: WHAT IS THE OZONE LAYER? */}
        <motion.div
          className="air-ozone-glass-card card-what"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="air-ozone-card-head">
            <div className="air-ozone-icon-circle">
              <Globe size={15} />
            </div>
            <h3 className="air-ozone-card-title">What is the Ozone Layer?</h3>
          </div>

          <div className="ozone-what-layout">
            <div className="ozone-what-thumb">
              <img
                src="/images/air-ozone-layer-view.jpg"
                alt="Earth limb view showing the illuminated blue stratospheric ozone layer"
                loading="lazy"
              />
              <div className="ozone-what-thumb-caption">Stratosphere · 24 km</div>
            </div>
            <ul className="ozone-what-list">
              <li>
                <span className="ozone-bullet-dot" />
                <span>
                  A layer of ozone (<strong>O₃</strong>) in the stratosphere (<strong>15 – 35 km</strong>).
                </span>
              </li>
              <li>
                <span className="ozone-bullet-dot" />
                <span>
                  Absorbs <strong>97–99%</strong> of harmful ultraviolet (UV-B and UV-C) radiation from
                  the sun.
                </span>
              </li>
              <li>
                <span className="ozone-bullet-dot" />
                <span>
                  Protects life on Earth, enabling evolution out of prehistoric oceans.
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CARD 2: HOW OZONE IS DEPLETED? */}
        <motion.div
          className="air-ozone-glass-card card-mechanism"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="air-ozone-card-head">
            <div className="air-ozone-icon-circle">
              <Atom size={15} />
            </div>
            <h3 className="air-ozone-card-title">How Ozone is Depleted?</h3>
          </div>

          {/* 3-Step Process Steps */}
          <div className="ozone-steps-row">
            <div className="ozone-step-box step-1">
              <span className="ozone-step-badge badge-1">1</span>
              <p>
                CFCs, halons and other ozone-depleting substances (ODS) are released into the
                atmosphere.
              </p>
            </div>
            <div className="ozone-step-box step-2">
              <div className="step-badge-wrap">
                <span className="ozone-step-badge badge-2">2</span>
                <span className="step-uv-tag">UV</span>
              </div>
              <p>
                In the stratosphere, UV radiation breaks them down, releasing chlorine (Cl) and
                bromine (Br) atoms.
              </p>
            </div>
            <div className="ozone-step-box step-3">
              <span className="ozone-step-badge badge-3">3</span>
              <p>
                Cl and Br react with ozone (O₃), converting it into standard oxygen (O₂).
              </p>
            </div>
          </div>

          {/* Catalytic Chemical Reaction Visual Diagram */}
          <div className="ozone-reaction-diagram">
            {/* CFCs source */}
            <div className="reaction-cfc-col">
              <div className="cfc-canisters-icon">
                <span className="canister can-1" />
                <span className="canister can-2" />
                <span className="canister can-3" />
              </div>
              <span className="reaction-label">CFCs<br />(in atmosphere)</span>
            </div>

            <span className="reaction-arrow">→</span>

            {/* Chlorine radical */}
            <div className="reaction-atom-col">
              <div className="atom-cl-badge">Cl</div>
            </div>

            <span className="reaction-plus">+</span>

            {/* Ozone (O3) triatomic molecule */}
            <div className="reaction-molecule-col">
              <div className="molecule-o3">
                <span className="o-sphere sphere-blue s1" />
                <span className="o-sphere sphere-blue s2" />
                <span className="o-sphere sphere-blue s3" />
                <span className="o-bond bond-1" />
                <span className="o-bond bond-2" />
              </div>
              <span className="reaction-label">Ozone (O₃)</span>
            </div>

            <span className="reaction-arrow">→</span>

            {/* Diatomic Oxygen (O2) */}
            <div className="reaction-molecule-col">
              <div className="molecule-o2">
                <span className="o-sphere sphere-red s4" />
                <span className="o-sphere sphere-red s5" />
                <span className="o-bond bond-red" />
              </div>
              <span className="reaction-label">Oxygen (O₂)</span>
            </div>
          </div>

          <div className="catalytic-stat-callout">
            <span className="stat-highlight">1 Cl Atom</span> destroys over{' '}
            <strong className="stat-num">100,000 O₃</strong> molecules through continuous catalytic
            cycles!
          </div>
        </motion.div>

        {/* CARD 3: MAJOR OZONE DEPLETING SUBSTANCES (ODS) */}
        <motion.div
          className="air-ozone-glass-card card-ods"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="air-ozone-card-head">
            <div className="air-ozone-icon-circle">
              <FlaskConical size={15} />
            </div>
            <h3 className="air-ozone-card-title">Major Ozone Depleting Substances (ODS)</h3>
          </div>

          <div className="ods-list">
            {odsSubstances.map((item) => (
              <div
                key={item.id}
                className={`ods-row ${selectedODS === item.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedODS(selectedODS === item.id ? null : item.id)}
              >
                <div className="ods-name-col">
                  <span className={`ods-icon-pill ${item.badgeClass}`}>
                    <Atom size={12} />
                  </span>
                  <div className="ods-text-wrap">
                    <strong className="ods-name">{item.name}</strong>
                    <span className="ods-formula">({item.formula})</span>
                  </div>
                </div>
                <div className="ods-uses-col">
                  <span className="ods-uses-text">{item.uses}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── ROW 2: 3 BOTTOM CARDS (Effects · Evidence: Ozone Hole · Control Measures) ─── */}
      <div className="air-ozone-bottom-grid">
        {/* CARD 1: EFFECTS OF OZONE DEPLETION */}
        <motion.div
          className="air-ozone-glass-card card-effects"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="air-ozone-card-head">
            <div className="air-ozone-icon-circle">
              <HeartPulse size={15} />
            </div>
            <h3 className="air-ozone-card-title">Effects of Ozone Depletion</h3>
          </div>

          <div className="effects-panels-stack">
            {/* Panel 1: Human Health */}
            <div className="effect-panel panel-health">
              <div className="effect-panel-header">
                <span className="effect-panel-icon icon-health">
                  <HeartPulse size={14} />
                </span>
                <strong className="effect-panel-title">Human Health</strong>
              </div>
              <ul className="effect-sublist">
                <li>Skin cancer (Melanoma &amp; Carcinomas)</li>
                <li>Cataracts &amp; Snow Blindness</li>
                <li>Weakened immune system</li>
                <li>Premature skin ageing</li>
              </ul>
            </div>

            {/* Panel 2: Ecosystems */}
            <div className="effect-panel panel-eco">
              <div className="effect-panel-header">
                <span className="effect-panel-icon icon-eco">
                  <Leaf size={14} />
                </span>
                <strong className="effect-panel-title">Ecosystems</strong>
              </div>
              <ul className="effect-sublist">
                <li>Reduced crop yields &amp; plant growth</li>
                <li>Damage to terrestrial forests</li>
                <li>Harm to marine phytoplankton</li>
                <li>Disruption of aquatic food chains</li>
              </ul>
            </div>

            {/* Panel 3: Materials */}
            <div className="effect-panel panel-mat">
              <div className="effect-panel-header">
                <span className="effect-panel-icon icon-mat">
                  <Building2 size={14} />
                </span>
                <strong className="effect-panel-title">Materials</strong>
              </div>
              <ul className="effect-sublist">
                <li>Degradation of plastics, rubber &amp; paints</li>
                <li>Cracking of vehicle tyre sidewalls</li>
                <li>Accelerated weathering of outdoor structures</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: EVIDENCE: OZONE HOLE */}
        <motion.div
          className="air-ozone-glass-card card-evidence"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="air-ozone-card-head">
            <div className="air-ozone-icon-circle">
              <Globe size={15} />
            </div>
            <h3 className="air-ozone-card-title">Evidence: Ozone Hole</h3>
          </div>

          <div className="evidence-graphic-wrap">
            <img
              src="/images/air-ozone-hole-comparison.jpg"
              alt="Satellite Dobson Spectrometer comparison showing Antarctica ozone layer in 1980 vs massive ozone hole in 2000"
              className="evidence-img"
              loading="lazy"
            />
          </div>

          <div className="dobson-legend-explainer">
            <div className="legend-chip">
              <span className="chip-color normal-du" />
              <span>Normal Stratosphere: ~300 DU</span>
            </div>
            <div className="legend-chip">
              <span className="chip-color hole-du" />
              <span>Ozone Hole Threshold: &lt; 200 DU</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: CONTROL MEASURES */}
        <motion.div
          className="air-ozone-glass-card card-control"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="air-ozone-card-head">
            <div className="air-ozone-icon-circle">
              <ShieldCheck size={15} />
            </div>
            <h3 className="air-ozone-card-title">Control Measures</h3>
          </div>

          <ul className="control-measures-list">
            {controlMeasures.map((measure, mIdx) => (
              <li key={mIdx} className="control-measure-item">
                <span className="control-check-icon">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="control-measure-text">{measure}</span>
              </li>
            ))}
          </ul>

          <div className="montreal-callout-box">
            <span className="montreal-year">1987</span>
            <div>
              <strong>Montreal Protocol Success</strong>
              <p>Signed by over 160 countries; full recovery expected by ~2050.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── ROW 3: KEY TAKEAWAYS (Bottom 4 Pills) ─── */}
      <motion.div
        className="air-ozone-takeaways-bar"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="takeaways-header-label">
          <Sparkles size={16} className="takeaways-icon" />
          <span>Key Takeaways</span>
        </div>

        <div className="takeaways-pills-grid">
          {keyTakeaways.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="takeaway-pill">
                <div
                  className="takeaway-pill-icon"
                  style={{ color: item.color, borderColor: `${item.color}40`, backgroundColor: `${item.color}15` }}
                >
                  <IconComp size={15} />
                </div>
                <span className="takeaway-pill-text">{item.text}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default OzoneDepletionScreen;
