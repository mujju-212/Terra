import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Cog,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Globe,
  BarChart3,
  Fish,
  Building2,
  X,
  Sparkles,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import './WarmingEiaValuesScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface EiaValueItem {
  id: string;
  num: number;
  theme: 'val-green' | 'val-blue' | 'val-purple';
  title: string;
  subtitle: string;
  icon: typeof ShieldCheck;
  bullets: string[];
  graphicImage: string;
  syllabusRef: string;
  fullDetail: string;
  legalContext: string;
}

const eiaValuesList: EiaValueItem[] = [
  {
    id: 'val-integrity',
    num: 1,
    theme: 'val-green',
    title: 'Integrity',
    subtitle: 'Transparency & Credibility',
    icon: ShieldCheck,
    bullets: [
      'Objective and unbiased assessment',
      'Reliable data and scientific methods',
      'Open and transparent decision-making',
      'Builds public trust',
    ],
    graphicImage: '/images/how-works-seedling.jpg',
    syllabusRef: 'BCV755B Module 5 · Section 3.2: Ethical Triad — Scientific Integrity',
    fullDetail:
      'Integrity demands that baseline environmental surveys, air/water dispersion models, and ecological inventories be conducted strictly according to rigorous, standardized scientific protocols, free from project proponent bias or commercial pressure.',
    legalContext:
      'Under the EIA Notification 2006 (MoEFCC), consultants submitting fraudulent baseline reports face de-accreditation by QCI/NABET and project rejection.',
  },
  {
    id: 'val-utility',
    num: 2,
    theme: 'val-blue',
    title: 'Utility',
    subtitle: 'Practical & Decision-Support',
    icon: Cog,
    bullets: [
      'Provides useful and relevant information',
      'Helps in comparing alternatives',
      'Supports informed and effective decision-making',
      'Considers environmental, social and economic aspects together',
    ],
    graphicImage: '/images/water-ch07-ibwt-bg.jpg',
    syllabusRef: 'BCV755B Module 5 · Section 3.2: Ethical Triad — Decision Utility',
    fullDetail:
      'EIA is not an academic dissertation; its primary function is decision-support utility. It presents actionable data on alternative project sites, cleaner technologies, and mitigation cost-benefit analyses so civil authorities can make prudent, informed choices.',
    legalContext:
      'State Expert Appraisal Committees (SEAC) and the Central EAC evaluate the Environmental Management Plan (EMP) to ensure feasibility and enforce clear environmental clearance conditions.',
  },
  {
    id: 'val-sustainability',
    num: 3,
    theme: 'val-purple',
    title: 'Sustainability',
    subtitle: 'Long-Term Balance',
    icon: Leaf,
    bullets: [
      'Conserves natural resources',
      'Minimizes negative environmental impacts',
      'Ensures social well-being and equity',
      'Supports sustainable economic development',
      'Meets the needs of the present without compromising future generations',
    ],
    graphicImage: '/images/planning-hero-landscape.jpg',
    syllabusRef: 'BCV755B Module 5 · Section 3.2: Ethical Triad — Intergenerational Sustainability',
    fullDetail:
      'Grounded in the Brundtland Commission (1987) doctrine, sustainability ensures that today’s infrastructure, mines, and industrial plants do not exhaust renewable resource baselines or impose permanent ecological debts upon future generations.',
    legalContext:
      'Enshrines the Precautionary Principle and the Polluter Pays Principle as recognized by the Supreme Court of India under Article 21 (Right to a Healthy Environment).',
  },
];

export function WarmingEiaValuesScreen() {
  const [activeModalItem, setActiveModalItem] = useState<EiaValueItem | null>(null);
  useModalScrollLock(Boolean(activeModalItem), () => setActiveModalItem(null));

  return (
    <section
      className="eia-values-screen-container"
      id="ch-09-eia-values"
      aria-label="Chapter 09: EIA Values — Principles for a Sustainable Future"
    >
      {/* ── Background Layer with Image 2 (River Valley, Terraced Hills & Eco-City Horizon) ── */}
      <div className="eia-values-screen-bg">
        <img
          src="/images/warming-eia-values-bg.jpg"
          alt="EIA Values: Pristine river valley, solar eco-city, and terraced green mountains under golden sunset"
          loading="eager"
        />
        <div className="eia-values-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Green Ambient Quote Box (Right) ── */}
      <div className="values-top-bar">
        {/* Left Header */}
        <div className="values-header-block">
          <div className="values-eyebrow">
            <span>MODULE 05</span>
            <span className="values-eyebrow-pipe">|</span>
            <span>CHAPTER 09</span>
          </div>
          <h1 className="values-main-title">EIA Values</h1>
          <h2 className="values-subtitle">Principles for a Sustainable Future</h2>
          <p className="values-lead-text">
            EIA is guided by core values that ensure development projects are environmentally sound,
            socially acceptable and economically viable. These values help achieve a balance between
            present needs and the well-being of future generations.
          </p>
        </div>

        {/* Right Quote Box matching Image 1 */}
        <div className="values-quote-card">
          <span className="values-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="values-quote-text">
            &ldquo;EIA values ensure that development today does not compromise the opportunities
            of tomorrow.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Main Stage: 3 Values Columns (Integrity | Utility | Sustainability) ── */}
      <div className="values-main-stage">
        {eiaValuesList.map((val) => {
          const IconComp = val.icon;
          return (
            <motion.div
              key={val.id}
              className={`value-column-card ${val.theme}`}
              onClick={() => setActiveModalItem(val)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveModalItem(val)}
              aria-label={`Inspect ${val.title} details`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                {/* Card Header Strip */}
                <div className="val-card-head">
                  <div className="val-head-left">
                    <span className="val-num-badge">{val.num}</span>
                    <div className="val-icon-box">
                      <IconComp size={20} />
                    </div>
                    <div className="val-head-text">
                      <span className="val-card-title">{val.title}</span>
                      <span className="val-card-sub">{val.subtitle}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="val-head-arrow-btn"
                    aria-label={`Open ${val.title} modal`}
                  >
                    <ArrowRight size={11} />
                  </button>
                </div>

                {/* 4 to 5 Checkpoint Bullets */}
                <div className="val-bullet-list">
                  {val.bullets.map((bullet, idx) => (
                    <div key={idx} className="val-bullet-item">
                      <CheckCircle2 size={15} className="val-bullet-icon" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Visual Graphic Wrap */}
              <div className="val-graphic-wrap">
                <img src={val.graphicImage} alt={`${val.title} visual illustration`} loading="lazy" />
                <div className="val-graphic-overlay" />

                {/* Card 2 Specific: Floating Triad Pills (Environment, Society, Economy) */}
                {val.id === 'val-utility' && (
                  <div className="val-triad-pills-row">
                    <span className="triad-pill pill-env">
                      <Leaf size={11} /> Environment
                    </span>
                    <span className="triad-pill pill-soc">
                      <Globe size={11} /> Society
                    </span>
                    <span className="triad-pill pill-eco">
                      <Building2 size={11} /> Economy
                    </span>
                  </div>
                )}

                {/* Card 3 Specific: Glowing Infinity Loop Linking Environment, Society & Economy */}
                {val.id === 'val-sustainability' && (
                  <div className="val-infinity-overlay">
                    <svg className="val-infinity-svg" viewBox="0 0 160 50" aria-hidden="true">
                      <defs>
                        <linearGradient id="infGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="50%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#eab308" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 40,25 C 20,4 0,14 0,25 C 0,36 20,46 40,25 C 60,4 100,4 120,25 C 140,46 160,36 160,25 C 160,14 140,4 120,25 C 100,46 60,46 40,25 Z"
                        fill="none"
                        stroke="url(#infGrad)"
                        strokeWidth="3.2"
                      />
                    </svg>
                    <div className="val-infinity-labels">
                      <span className="lbl-env">Environment</span>
                      <span className="lbl-soc">Society</span>
                      <span className="lbl-eco">Economy</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom Row: Real-World Example | Global Goals | Key Takeaway ── */}
      <div className="values-bottom-row">
        {/* 1. Real-World Example (Hydropower EIA) */}
        <div className="real-example-panel">
          <div className="real-example-head">
            <div className="real-example-title-wrap">
              <Lightbulb size={17} />
              <span>Real-World Example</span>
            </div>
            <button
              type="button"
              className="val-head-arrow-btn"
              onClick={() => setActiveModalItem(eiaValuesList[1])}
              aria-label="Inspect hydropower real-world example"
            >
              <ArrowRight size={11} />
            </button>
          </div>
          <div className="real-example-content">
            <p className="real-example-desc">
              An EIA for a hydropower project applies all three values by using transparent data
              (<strong>Integrity</strong>), helping authorities choose the best design (
              <strong>Utility</strong>), and ensuring long-term care for rivers, communities and
              ecosystems (<strong>Sustainability</strong>).
            </p>
            <div className="real-example-thumb">
              <img
                src="/images/water-ch07-ibwt-bg.jpg"
                alt="Hydropower project dam in mountain river valley"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* 2. Related to Global Goals (UN SDGs) */}
        <div className="global-goals-panel">
          <div className="global-goals-head">
            <Globe size={16} />
            <span>Related to Global Goals</span>
          </div>
          <div className="global-goals-grid">
            {/* SDG 13 */}
            <div className="sdg-badge sdg-13" title="SDG 13: Climate Action">
              <span className="sdg-num">13</span>
              <span className="sdg-title">Climate Action</span>
              <Globe size={14} className="sdg-icon-svg" />
            </div>

            {/* SDG 14 */}
            <div className="sdg-badge sdg-14" title="SDG 14: Life Below Water">
              <span className="sdg-num">14</span>
              <span className="sdg-title">Life Below Water</span>
              <Fish size={14} className="sdg-icon-svg" />
            </div>

            {/* SDG 15 */}
            <div className="sdg-badge sdg-15" title="SDG 15: Life on Land">
              <span className="sdg-num">15</span>
              <span className="sdg-title">Life on Land</span>
              <Leaf size={14} className="sdg-icon-svg" />
            </div>

            {/* SDG 11 */}
            <div className="sdg-badge sdg-11" title="SDG 11: Sustainable Cities">
              <span className="sdg-num">11</span>
              <span className="sdg-title">Sustainable Cities</span>
              <Building2 size={14} className="sdg-icon-svg" />
            </div>
          </div>
        </div>

        {/* 3. Key Takeaway */}
        <div className="takeaway-box-panel">
          <div className="takeaway-box-head">
            <div className="takeaway-title-wrap">
              <BarChart3 size={17} />
              <span>Key Takeaway</span>
            </div>
            <button
              type="button"
              className="val-head-arrow-btn"
              onClick={() => setActiveModalItem(eiaValuesList[2])}
              aria-label="Inspect key takeaway details"
            >
              <ArrowRight size={11} />
            </button>
          </div>
          <p className="takeaway-box-desc">
            The values of <strong>Integrity</strong>, <strong>Utility</strong> and{' '}
            <strong>Sustainability</strong> make EIA an essential tool for balanced and responsible
            development.
          </p>
        </div>
      </div>

      {/* ── Interactive Detail Modal ── */}
      <AnimatePresence>
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModalItem(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="max-w-lg w-full max-h-[85vh] overflow-y-auto bg-[#0d141e] border border-emerald-500/40 rounded-xl shadow-2xl text-left"
              data-lenis-prevent
              initial={{ scale: 0.92, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 14 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
              {/* Modal Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-black">
                <img
                  src={activeModalItem.graphicImage}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d141e] via-[#0d141e]/50 to-transparent" />
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white/80 hover:text-white rounded-full p-1.5 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="bg-emerald-500 text-black font-extrabold text-xs px-2 py-0.5 rounded">
                    VALUE #{activeModalItem.num}
                  </span>
                  <span className="text-white/70 text-xs font-medium tracking-wide">
                    {activeModalItem.syllabusRef}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <span>{activeModalItem.title}</span>
                  <span className="text-sm font-normal text-white/60">
                    — {activeModalItem.subtitle}
                  </span>
                </h3>

                <p className="text-xs text-white/85 leading-relaxed mb-4">
                  {activeModalItem.fullDetail}
                </p>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 mb-3">
                  <FileCheck2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Statutory / Regulatory Provision: </strong>
                    <span>{activeModalItem.legalContext}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
                    Core Operational Checkpoints:
                  </span>
                  {activeModalItem.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/90">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WarmingEiaValuesScreen;
