import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Check,
  Activity,
  FileCheck,
  Settings,
  ArrowRight,
  Info,
  X,
  ExternalLink,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { useModalScrollLock } from './useModalScrollLock';

/* ─── NAAQS DATA INTERFACE ─── */
interface NaaqsPollutantItem {
  id: string;
  name: string;
  symbol: string;
  symbolColor: string;
  symbolBg: string;
  symbolBorder: string;
  annualAvg: string;
  dailyAvg: string;
  keyEffects: string;
  samplingMethod: string;
  syllabusNotes: string[];
}

const NAAQS_POLLUTANTS: NaaqsPollutantItem[] = [
  {
    id: 'pm10',
    name: 'Particulate Matter (size ≤ 10 µm)',
    symbol: 'PM₁₀',
    symbolColor: '#38bdf8',
    symbolBg: 'rgba(2, 132, 199, 0.25)',
    symbolBorder: 'rgba(56, 189, 248, 0.5)',
    annualAvg: '60',
    dailyAvg: '100',
    keyEffects: 'Respiratory and cardiovascular effects',
    samplingMethod: 'High Volume Sampler (cyclone / impactor) / TEOM',
    syllabusNotes: [
      'Inhalable coarse particles depositing primarily in the upper respiratory tract and trachea.',
      'Syllabus standard: Annual arithmetic mean of 104 measurements per year at 60 µg/m³.',
      'Sources include construction dust, resuspension of road dust, and mechanical grinding.',
    ],
  },
  {
    id: 'pm25',
    name: 'Particulate Matter (size ≤ 2.5 µm)',
    symbol: 'PM₂.₅',
    symbolColor: '#a5b4fc',
    symbolBg: 'rgba(99, 102, 241, 0.25)',
    symbolBorder: 'rgba(129, 140, 248, 0.5)',
    annualAvg: '40',
    dailyAvg: '60',
    keyEffects: 'Penetrates deep into lungs, serious health effects',
    samplingMethod: 'Gravimetric beta attenuation monitor / Cyclonic WINS impactor',
    syllabusNotes: [
      'Fine particulate capable of penetrating deep into alveolar sacs and entering the bloodstream.',
      'Strongly linked to ischemic heart disease, stroke, lung cancer, and chronic obstructive pulmonary disease (COPD).',
      'Formed predominantly from secondary atmospheric sulfate/nitrate reactions and combustion soot.',
    ],
  },
  {
    id: 'so2',
    name: 'Sulphur Dioxide',
    symbol: 'SO₂',
    symbolColor: '#fbbf24',
    symbolBg: 'rgba(217, 119, 6, 0.25)',
    symbolBorder: 'rgba(245, 158, 11, 0.5)',
    annualAvg: '50',
    dailyAvg: '80',
    keyEffects: 'Respiratory irritation, acid rain',
    samplingMethod: 'Improved West and Gaeke method / UV fluorescence',
    syllabusNotes: [
      'Key acidic precursor for secondary sulfate aerosol formation and acid precipitation (pH < 5.6).',
      'Causes bronchoconstriction in asthmatics and severe leaf chlorosis/necrosis in crops.',
      'Major emitters: thermal coal power generation and non-ferrous metal smelting.',
    ],
  },
  {
    id: 'no2',
    name: 'Nitrogen Dioxide',
    symbol: 'NO₂',
    symbolColor: '#f87171',
    symbolBg: 'rgba(220, 38, 38, 0.25)',
    symbolBorder: 'rgba(239, 68, 68, 0.5)',
    annualAvg: '40',
    dailyAvg: '80',
    keyEffects: 'Respiratory problems, forms ozone',
    samplingMethod: 'Jacob and Hochheiser (modified) / Chemiluminescence',
    syllabusNotes: [
      'Pungent reddish-brown toxic gas causing airway inflammation and hyper-responsiveness.',
      'Essential photochemical precursor driving ground-level ozone (O₃) and peroxyacetyl nitrate (PAN) synthesis.',
      'Dominant source: high-temperature internal combustion in automobiles and industrial boilers.',
    ],
  },
  {
    id: 'o3',
    name: 'Ozone',
    symbol: 'O₃',
    symbolColor: '#4ade80',
    symbolBg: 'rgba(22, 163, 74, 0.25)',
    symbolBorder: 'rgba(74, 222, 128, 0.5)',
    annualAvg: '50',
    dailyAvg: '100',
    keyEffects: 'Breathing difficulties, plant damage',
    samplingMethod: 'UV Photometric / Chemical luminescence',
    syllabusNotes: [
      'Secondary photochemical oxidant not emitted directly; formed via solar UV reaction of NOₓ + VOCs.',
      'Strongly oxidises rubber, degrades polymers, and reduces crop agricultural yields through stomatal damage.',
      'Standard averaging: 8-hour benchmark (100 µg/m³) and 1-hour peak limit (180 µg/m³).',
    ],
  },
  {
    id: 'co',
    name: 'Carbon Monoxide',
    symbol: 'CO',
    symbolColor: '#2dd4bf',
    symbolBg: 'rgba(13, 148, 136, 0.25)',
    symbolBorder: 'rgba(45, 212, 191, 0.5)',
    annualAvg: '2000 (µg/m³)',
    dailyAvg: '4000 (µg/m³)',
    keyEffects: 'Reduces oxygen delivery in blood',
    samplingMethod: 'Non-Dispersive Infra-Red (NDIR) spectroscopy',
    syllabusNotes: [
      'Colorless, odorless gas binding to haemoglobin with 210× the affinity of oxygen, creating carboxyhaemoglobin.',
      'Standard units in CPCB: 02 mg/m³ (8-hour) and 04 mg/m³ (1-hour), equivalently 2000 µg/m³ and 4000 µg/m³.',
      'Formed from incomplete combustion of carbonaceous fuels in vehicles and biomass stoves.',
    ],
  },
  {
    id: 'pb',
    name: 'Lead',
    symbol: 'Pb',
    symbolColor: '#c084fc',
    symbolBg: 'rgba(139, 92, 246, 0.25)',
    symbolBorder: 'rgba(192, 132, 252, 0.5)',
    annualAvg: '0.5',
    dailyAvg: '1.0',
    keyEffects: 'Neurotoxic effects, especially in children',
    samplingMethod: 'AAS / ICP-MS after EPM 2000 glass microfibre filtration',
    syllabusNotes: [
      'Cumulative toxic heavy metal impairing central nervous system development, IQ, and renal filtration.',
      'Phased out from vehicular petrol in India by 2000; lingering sources include battery recyclers and smelters.',
      'Safe biological threshold does not exist; strictly monitored at 0.50 µg/m³ annual mean.',
    ],
  },
  {
    id: 'nh3',
    name: 'Ammonia',
    symbol: 'NH₃',
    symbolColor: '#f472b6',
    symbolBg: 'rgba(192, 38, 211, 0.25)',
    symbolBorder: 'rgba(244, 114, 182, 0.5)',
    annualAvg: '100',
    dailyAvg: '400',
    keyEffects: 'Respiratory irritation, ecological impact',
    samplingMethod: 'Indophenol blue method / Chemiluminescence',
    syllabusNotes: [
      'Alkaline atmospheric gas reacting with nitric and sulphuric acids to form ammonium salt aerosols.',
      'Contributes heavily to environmental eutrophication and soil acidification upon wet deposition.',
      'Major emitters include livestock waste, synthetic fertilizer application, and chemical processing.',
    ],
  },
  {
    id: 'c6h6',
    name: 'Benzene',
    symbol: 'C₆H₆',
    symbolColor: '#86efac',
    symbolBg: 'rgba(34, 197, 94, 0.25)',
    symbolBorder: 'rgba(134, 239, 172, 0.5)',
    annualAvg: '5',
    dailyAvg: '--',
    keyEffects: 'Carcinogenic',
    samplingMethod: 'Adsorption on activated charcoal followed by GC-FID / GC-MS',
    syllabusNotes: [
      'Volatile aromatic hydrocarbon designated as a Group 1 human haematotoxic carcinogen (leukaemia).',
      'Sources: petroleum refining, automobile evaporative losses, and tobacco smoke.',
      'Regulated solely on annual exposure standard (5 µg/m³) due to chronic bioaccumulation risk.',
    ],
  },
  {
    id: 'bap',
    name: 'Benzo(a)pyrene',
    symbol: 'BaP',
    symbolColor: '#fde047',
    symbolBg: 'rgba(245, 158, 11, 0.25)',
    symbolBorder: 'rgba(253, 224, 71, 0.5)',
    annualAvg: '1 (ng/m³)',
    dailyAvg: '--',
    keyEffects: 'Carcinogenic',
    samplingMethod: 'Particulate phase solvent extraction followed by HPLC / GC-MS',
    syllabusNotes: [
      'Polycyclic aromatic hydrocarbon (PAH) adhering to airborne soot particles from incomplete burning.',
      'Extreme mutagen and carcinogen evaluated on nanogram scale (1 ng/m³ annual limit).',
      'Generated during coal combustion, biomass cooking, and open stubble field burning.',
    ],
  },
  {
    id: 'as',
    name: 'Arsenic',
    symbol: 'As',
    symbolColor: '#60a5fa',
    symbolBg: 'rgba(59, 130, 246, 0.25)',
    symbolBorder: 'rgba(96, 165, 250, 0.5)',
    annualAvg: '6 (ng/m³)',
    dailyAvg: '--',
    keyEffects: 'Toxic, carcinogenic',
    samplingMethod: 'AAS / ICP-MS analysis of digested particulate filter cakes',
    syllabusNotes: [
      'Toxic heavy metalloid present in coal fly ash, mining dusts, and agricultural pesticides.',
      'Chronic inhalation produces lung carcinoma and severe peripheral vascular lesions.',
      'CPCB strict annual standard set at 6 ng/m³ in ambient air.',
    ],
  },
  {
    id: 'ni',
    name: 'Nickel',
    symbol: 'Ni',
    symbolColor: '#d8b4fe',
    symbolBg: 'rgba(168, 85, 247, 0.25)',
    symbolBorder: 'rgba(216, 180, 254, 0.5)',
    annualAvg: '20 (ng/m³)',
    dailyAvg: '--',
    keyEffects: 'Carcinogenic',
    samplingMethod: 'AAS / ICP-MS after acid digestion',
    syllabusNotes: [
      'Metallic carcinogen emitted from residual fuel oil combustion and alloy production.',
      'Triggers severe allergic contact dermatitis and increases incidence of nasal cavity tumors.',
      'CPCB benchmark limit capped at 20 ng/m³ annual mean.',
    ],
  },
];

export function NaaqsScreen() {
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<'all' | 'annual' | '24hr'>('24hr');
  const [showAllPollutants, setShowAllPollutants] = useState(false);
  const [selectedPollutant, setSelectedPollutant] = useState<NaaqsPollutantItem | null>(null);

  // Lock scroll, pause Lenis, route wheel delta and handle Escape
  useModalScrollLock(Boolean(selectedPollutant), () => setSelectedPollutant(null));

  // Default to 8 core criteria pollutants shown in reference mockup
  const displayedPollutants = showAllPollutants
    ? NAAQS_POLLUTANTS
    : NAAQS_POLLUTANTS.slice(0, 8);

  return (
    <section className="air-naaqs-section" id="ch-naaqs">
      {/* ─── BACKGROUND IMAGE: AMBIENT AIR MONITORING STATION OVERLOOKING CITY ─── */}
      <div className="air-naaqs-bg">
        <img
          src="/images/air-naaqs-bg.jpg"
          alt="Solar powered continuous ambient air quality monitoring station overlooking modern city and river basin at sunrise"
          className="air-naaqs-bg-image"
        />
      </div>

      {/* Subtle top atmospheric scrim for navbar readability */}
      <div className="air-naaqs-scrim-top" />

      {/* ─── TOP: HEADER ROW & FLOATING QUOTE ─── */}
      <div className="air-naaqs-header-row">
        <motion.div
          className="air-naaqs-header-left"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <span className="air-naaqs-eyebrow">CHAPTER 05</span>
          <h2 className="air-naaqs-title">
            National Ambient <br />
            <span className="air-naaqs-title-accent">Air Quality Standards</span>
          </h2>
          <p className="air-naaqs-desc">
            National Ambient Air Quality Standards (NAAQS) are the concentration limits of key air
            pollutants in ambient air, set to protect human health, plants, animals, property and the
            environment. These standards help in monitoring air quality and form the basis for
            regulating emissions and control strategies.
          </p>
        </motion.div>

        {/* Top-Right Floating Quote Card (Exact match to Mockup Image) */}
        <motion.div
          className="air-naaqs-quote-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <span className="air-naaqs-quote-mark">“</span>
          <p className="air-naaqs-quote-text">
            NAAQS define the safe limits of pollutants in ambient air to protect the health and
            well-being of people and the environment.
          </p>
        </motion.div>
      </div>

      {/* ─── MAIN CONTENT: 2-COLUMN GRID ─── */}
      <div className="air-naaqs-main-grid">
        {/* LEFT COLUMN: NAAQS TABLE CARD */}
        <motion.div
          className="air-naaqs-table-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {/* Table Card Header with View Toggles */}
          <div className="air-naaqs-card-head">
            <h3 className="air-naaqs-table-title">NAAQS in India (CPCB Standards)</h3>
            <div className="air-naaqs-toggles">
              <button
                type="button"
                className={`air-naaqs-toggle-btn ${activeFilter === 'annual' ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(activeFilter === 'annual' ? 'all' : 'annual')}
                title="Filter / highlight Annual Average limits"
              >
                Annual Average
              </button>
              <button
                type="button"
                className={`air-naaqs-toggle-btn ${activeFilter === '24hr' ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(activeFilter === '24hr' ? 'all' : '24hr')}
                title="Filter / highlight 24-Hour Average limits"
              >
                24-Hour Average
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="air-naaqs-table-wrap">
            <table className="air-naaqs-table">
              <thead>
                <tr>
                  <th className="air-th-pollutant">Pollutant</th>
                  <th className="air-th-symbol">Symbol</th>
                  <th className={`air-th-avg ${activeFilter === 'annual' ? 'is-highlighted-col' : ''}`}>
                    Annual Average
                    <span className="air-th-sub">(µg/m³)</span>
                  </th>
                  <th className={`air-th-avg ${activeFilter === '24hr' ? 'is-highlighted-col' : ''}`}>
                    24-Hour Average
                    <span className="air-th-sub">(µg/m³)</span>
                  </th>
                  <th className="air-th-effects">Key Effects</th>
                </tr>
              </thead>
              <tbody>
                {displayedPollutants.map((item) => (
                  <tr
                    key={item.id}
                    className="air-naaqs-row"
                    onClick={() => setSelectedPollutant(item)}
                    title={`Click to inspect ${item.name} syllabus notes`}
                  >
                    <td className="air-td-name">{item.name}</td>
                    <td className="air-td-symbol">
                      <span
                        className="air-symbol-pill"
                        style={{
                          color: item.symbolColor,
                          background: item.symbolBg,
                          borderColor: item.symbolBorder,
                        }}
                      >
                        {item.symbol}
                      </span>
                    </td>
                    <td className={`air-td-val ${activeFilter === 'annual' ? 'is-highlighted-col' : ''}`}>
                      {item.annualAvg}
                    </td>
                    <td className={`air-td-val ${activeFilter === '24hr' ? 'is-highlighted-col' : ''}`}>
                      {item.dailyAvg}
                    </td>
                    <td className="air-td-effects">{item.keyEffects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sleek expander button to toggle between 8 core & 12 full CPCB pollutants */}
          <div className="air-naaqs-table-footer">
            <button
              type="button"
              className="air-naaqs-expand-btn"
              onClick={() => setShowAllPollutants(!showAllPollutants)}
            >
              {showAllPollutants
                ? '▲ Show 8 Primary Criteria Pollutants'
                : '+ View 4 Additional Trace Pollutants (Benzene, BaP, Arsenic, Nickel)'}
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: OBJECTIVES & WORKFLOW STACK */}
        <div className="air-naaqs-right-col">
          {/* TOP RIGHT: OBJECTIVES OF NAAQS */}
          <motion.div
            className="air-glass-card air-naaqs-objectives-card"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="air-card-header">
              <div className="air-card-icon-box air-icon-cyan">
                <Target size={15} />
              </div>
              <h3 className="air-card-title">Objectives of NAAQS</h3>
            </div>

            <ul className="air-objectives-list">
              <li className="air-objective-item">
                <span className="air-objective-check">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Protect human health and well-being</span>
              </li>
              <li className="air-objective-item">
                <span className="air-objective-check">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Protect plants, animals and ecosystems</span>
              </li>
              <li className="air-objective-item">
                <span className="air-objective-check">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Prevent damage to property and materials</span>
              </li>
              <li className="air-objective-item">
                <span className="air-objective-check">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Provide a basis for air quality monitoring</span>
              </li>
              <li className="air-objective-item">
                <span className="air-objective-check">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Guide regulatory and control measures</span>
              </li>
              <li className="air-objective-item">
                <span className="air-objective-check">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Ensure a sustainable and healthy environment</span>
              </li>
            </ul>
          </motion.div>

          {/* BOTTOM RIGHT: MONITORING AND COMPLIANCE */}
          <motion.div
            className="air-glass-card air-naaqs-compliance-card"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <div className="air-card-header">
              <div className="air-card-icon-box air-icon-cyan">
                <Activity size={15} />
              </div>
              <h3 className="air-card-title">Monitoring and Compliance</h3>
            </div>

            <div className="air-compliance-flow">
              {/* STEP 1: MONITORING */}
              <div className="air-flow-step air-step-monitoring">
                <div className="air-step-icon-wrap air-icon-wrap-blue">
                  <Radio size={14} />
                </div>
                <strong className="air-step-title">Monitoring</strong>
                <p className="air-step-desc">
                  Continuous monitoring at designated stations across cities and regions.
                </p>
              </div>

              {/* FLOW ARROW 1 */}
              <div className="air-flow-arrow">
                <ArrowRight size={13} strokeWidth={2.5} />
              </div>

              {/* STEP 2: COMPARISON */}
              <div className="air-flow-step air-step-comparison">
                <div className="air-step-icon-wrap air-icon-wrap-green">
                  <FileCheck size={14} />
                </div>
                <strong className="air-step-title">Comparison</strong>
                <p className="air-step-desc">
                  Measured values are compared with NAAQS limits.
                </p>
              </div>

              {/* FLOW ARROW 2 */}
              <div className="air-flow-arrow">
                <ArrowRight size={13} strokeWidth={2.5} />
              </div>

              {/* STEP 3: ACTION */}
              <div className="air-flow-step air-step-action">
                <div className="air-step-icon-wrap air-icon-wrap-amber">
                  <Settings size={14} />
                </div>
                <strong className="air-step-title">Action</strong>
                <p className="air-step-desc">
                  If limits are exceeded, control measures and policies are implemented.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── MODAL DETAIL INSPECTOR FOR CLICKED POLLUTANT ─── */}
      <AnimatePresence>
        {selectedPollutant && (
          <div
            className="air-photo-modal-backdrop"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedPollutant(null)}
          >
            <motion.div
              className="air-photo-modal-dialog"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="air-naaqs-modal-header">
                <div>
                  <span
                    className="air-symbol-pill"
                    style={{
                      color: selectedPollutant.symbolColor,
                      background: selectedPollutant.symbolBg,
                      borderColor: selectedPollutant.symbolBorder,
                      fontSize: '0.85rem',
                      padding: '4px 12px',
                    }}
                  >
                    {selectedPollutant.symbol}
                  </span>
                  <h3 className="air-modal-title" style={{ marginTop: '8px' }}>
                    {selectedPollutant.name}
                  </h3>
                </div>
                <button
                  type="button"
                  className="air-modal-close-btn"
                  onClick={() => setSelectedPollutant(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="air-modal-body">
                <div className="air-naaqs-modal-stats">
                  <div className="air-modal-stat-box">
                    <span className="air-modal-stat-label">Annual Limit</span>
                    <strong className="air-modal-stat-val" style={{ color: selectedPollutant.symbolColor }}>
                      {selectedPollutant.annualAvg} µg/m³
                    </strong>
                  </div>
                  <div className="air-modal-stat-box">
                    <span className="air-modal-stat-label">24-Hour Limit</span>
                    <strong className="air-modal-stat-val">
                      {selectedPollutant.dailyAvg !== '--' ? `${selectedPollutant.dailyAvg} µg/m³` : 'N/A'}
                    </strong>
                  </div>
                  <div className="air-modal-stat-box">
                    <span className="air-modal-stat-label">Sampling Technique</span>
                    <span className="air-modal-stat-sub">{selectedPollutant.samplingMethod}</span>
                  </div>
                </div>

                <div className="air-modal-syllabus-section">
                  <span className="air-modal-label">BCV755B Syllabus Notes:</span>
                  <ul className="air-modal-notes-list">
                    {selectedPollutant.syllabusNotes.map((note, idx) => (
                      <li key={idx} className="air-modal-note-item">
                        <Check size={14} className="air-text-cyan air-note-check" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="air-modal-footer">
                <span className="air-modal-impact">
                  Standard Compliance:{' '}
                  <strong style={{ color: '#4ade80' }}>98% of the year (104 samples)</strong>
                </span>
                <button
                  type="button"
                  className="air-modal-done-btn"
                  onClick={() => setSelectedPollutant(null)}
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
