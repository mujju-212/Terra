import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Target,
  Search,
  BarChart3,
  Settings,
  FileCheck,
  Layers,
  FileText,
  Users,
  HardHat,
  Sprout,
  Landmark,
  Building2,
  TreePine,
  Zap,
  Lightbulb,
  ArrowRight,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import './WarmingEiaIntroScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface EiaModalContent {
  id: string;
  theme: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  takeaway: string;
}

const modalContentData: Record<string, EiaModalContent> = {
  what: {
    id: 'what',
    theme: 'theme-green',
    eyebrow: 'STATUTORY DEFINITION · BCV755B SECTION 3.1',
    title: 'What is Environmental Impact Assessment?',
    description:
      'Environmental Impact Assessment (EIA) is the formal study conducted to predict the effect of a proposed activity or project on the environment. It evaluates biological, chemical, geological, social, and economic consequences before investment decisions are locked in.',
    points: [
      'Early Stage Integration: Evaluates environmental concerns right at the time of drafting the initial project feasibility report.',
      'Comparison of Alternatives: Examines alternative site locations, project designs, and processes to find the best economic-ecological balance.',
      'Preventative Safeguard: Avoids costly post-construction retrofits, environmental penalties, and legal shutdowns by mitigating problems at design inception.',
    ],
    takeaway: 'Before concrete is poured, EIA ensures decisions are made with full scientific foresight rather than ecological ignorance.',
  },
  purpose: {
    id: 'purpose',
    theme: 'theme-purple',
    eyebrow: 'CORE MANDATE · BCV755B SECTION 3.1',
    title: 'The Fourfold Purpose of EIA',
    description:
      'The primary mandate of EIA is to foster environmentally sound, socially equitable development without sacrificing economic vitality.',
    points: [
      '1. Identify Potential Impacts: Thorough baseline surveys catalog air, water, soil, noise, and ecosystem sensitivities.',
      '2. Predict & Evaluate Significance: Quantifies magnitude, duration, and reversibility of projected emissions and disturbances.',
      '3. Suggest Mitigation Measures: Recommends state-of-the-art pollution control, effluent recycling, and topsoil preservation.',
      '4. Support Informed Decision-Making: Provides regulatory authorities and public stakeholders with an impartial scientific assessment.',
    ],
    takeaway: 'EIA turns environmental protection from an afterthought into a foundational engineering criterion.',
  },
  lifecycle: {
    id: 'lifecycle',
    theme: 'theme-blue',
    eyebrow: 'PROJECT LIFECYCLE · BCV755B SECTION 3.1',
    title: 'EIA in the Project Development Cycle',
    description:
      'Environmental assessment is not a one-off administrative checkpoint; it spans the complete lifecycle of capital infrastructure.',
    points: [
      'Phase 1 — Idea & Proposal: Project concept, site alternatives, and initial industrial capacity identified.',
      'Phase 2 — EIA Study: Baseline data collection, environmental modeling, public hearing, and mitigation planning.',
      'Phase 3 — Decision: Ministry of Environment (MoEFCC) or State Authority grants clearance, orders modifications, or rejects.',
      'Phase 4 — Implementation: Construction commences under strict Environmental Management Plan (EMP) mitigation conditions.',
      'Phase 5 — Sustainable Operation: Regular compliance monitoring, environmental audits, and local ecological restoration.',
    ],
    takeaway: 'When embedded seamlessly across planning, EIA safeguards both capital investment and natural ecosystems.',
  },
  stakeholders: {
    id: 'stakeholders',
    theme: 'theme-red',
    eyebrow: 'DEMOCRATIC PARTICIPATION · BCV755B SECTION 3.1',
    title: 'Who Uses EIA and Why?',
    description:
      'EIA unites four distinct stakeholder groups into a structured, transparent decision-making forum.',
    points: [
      'Government Regulators: Standardizes environmental clearance criteria, establishes statutory discharge limits, and ensures compliance.',
      'Project Proponents: Optimizes raw material usage, avoids community conflict, and protects projects against future legal liabilities.',
      'Local Communities: Participates in mandatory public hearings to voice concerns regarding drinking water, air quality, and livelihood safety.',
      'Environmental Scientists: Evaluates ecological integrity, endangered species protection, and cumulative watershed impacts.',
    ],
    takeaway: 'Broad stakeholder consultation transforms developmental projects into community-supported endeavors.',
  },
  types: {
    id: 'types',
    theme: 'theme-indigo',
    eyebrow: 'METHODOLOGY COMPARISON · BCV755B SECTION 3.7',
    title: 'Comprehensive EIA vs Rapid EIA',
    description:
      'Environmental assessments in India and worldwide are classified into Comprehensive and Rapid formats based on duration and data depth.',
    points: [
      'Comprehensive EIA: Demands one full year (four seasons) of continuous baseline environmental data collection (air, water, biodiversity, meteorology). Required for large-scale, Category A projects like nuclear, large dams, and mega petrochemicals.',
      'Rapid EIA: Collects one single season of primary environmental baseline data (typically 3 months, strictly excluding the monsoon season). Used for smaller, Category B projects with lower footprint.',
      'Review & Transition: Rapid EIA reports must identify whether secondary impacts necessitate a full Comprehensive EIA.',
    ],
    takeaway: 'Comprehensive EIA provides seasonal nuance; Rapid EIA delivers timely feasibility assessments for lower-risk projects.',
  },
  takeaway: {
    id: 'takeaway',
    theme: 'theme-amber',
    eyebrow: 'COURSE PHILOSOPHY · BCV755B ACT 2',
    title: 'Balancing Development with Environmental Integrity',
    description:
      'Conservation of natural resources does not mandate halting human industrial development; rather, it demands that development respects planetary boundaries.',
    points: [
      'Development & Conservation: Industrial infrastructure and pristine nature can coexist when impacts are evaluated before breaking ground.',
      'Resource Optimization: EIA drives circular economies — reusing treated wastewater, capturing fly ash for bricks, and reclaiming topsoil.',
      'Intergenerational Justice: Ensuring current industrial progress does not deplete the air, water, and soil needed by future generations.',
    ],
    takeaway: 'EIA represents humanity’s most effective balance between economic progress and environmental stewardship.',
  },
};

export function WarmingEiaIntroScreen() {
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);
  useModalScrollLock(Boolean(activeModalKey), () => setActiveModalKey(null));

  const activeModalData = activeModalKey ? modalContentData[activeModalKey] : null;

  return (
    <section
      className="eia-intro-screen-container"
      id="ch-08-eia-intro"
      aria-label="Chapter 08: Introduction to Environmental Impact Assessment (EIA) — Before We Build, We Assess"
    >
      {/* ── Background Layer with Image 2 (Alpine River Valley, Mountain Sunrise & Construction) ── */}
      <div className="eia-intro-screen-bg">
        <img
          src="/images/warming-eia-intro-bg.jpg"
          alt="EIA Landscape: Alpine River Valley at Sunrise with Balanced Nature and Construction"
          loading="eager"
        />
        <div className="eia-intro-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Emerald Green Quote Card (Right) ── */}
      <div className="eia-intro-top-bar">
        {/* Left Header */}
        <div className="eia-intro-header-block">
          <div className="eia-intro-eyebrow">
            <span>MODULE 05</span>
            <span className="eia-intro-eyebrow-pipe">|</span>
            <span>CHAPTER 08</span>
          </div>
          <h1 className="eia-intro-main-title">
            Introduction to Environmental Impact Assessment (EIA)
          </h1>
          <h2 className="eia-intro-subtitle">Before We Build, We Assess</h2>
          <p className="eia-intro-lead-text">
            Environmental Impact Assessment (EIA) is a systematic process used to identify, predict
            and evaluate the potential environmental, social and economic impacts of a proposed
            project before it is implemented, so that informed decisions can be made and negative
            impacts can be minimized.
          </p>
        </div>

        {/* Right Quote Box matching Image 1 */}
        <div className="eia-intro-quote-card">
          <span className="eia-intro-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="eia-intro-quote-text">
            &ldquo;Development and environment can go hand in hand, if we assess the impacts before
            we act.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Main Stage: 2 Rows of Interactive Cards ── */}
      <div className="eia-intro-grid">
        {/* ROW 1: WHAT IS EIA? + PURPOSE OF EIA + EIA IN DEVELOPMENT PROCESS */}
        <div className="eia-grid-row row-top">
          {/* Card 1: What is EIA? */}
          <div
            className="eia-card-panel theme-green"
            onClick={() => setActiveModalKey('what')}
            role="button"
            tabIndex={0}
            aria-label="Learn What is EIA?"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalKey('what');
              }
            }}
          >
            <div className="eia-panel-head">
              <div className="eia-panel-title-wrap">
                <div className="eia-panel-icon">
                  <Leaf size={14} />
                </div>
                <h3 className="eia-panel-title">What is EIA?</h3>
              </div>
              <div className="eia-panel-arrow-btn" aria-hidden="true">
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="eia-what-body">
              <p className="eia-what-text">
                EIA is a decision-support tool that assesses the likely environmental and social
                impacts of a proposed project, alternative options and mitigation measures, before it
                is approved and implemented.
              </p>
              <div className="eia-what-visual">
                <img
                  src="/images/bio-earth-globe.png"
                  alt="Earth globe cradled in green leaves"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Purpose of EIA */}
          <div
            className="eia-card-panel theme-purple"
            onClick={() => setActiveModalKey('purpose')}
            role="button"
            tabIndex={0}
            aria-label="Explore Purpose of EIA"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalKey('purpose');
              }
            }}
          >
            <div className="eia-panel-head">
              <div className="eia-panel-title-wrap">
                <div className="eia-panel-icon">
                  <Target size={14} />
                </div>
                <h3 className="eia-panel-title">Purpose of EIA</h3>
              </div>
              <div className="eia-panel-arrow-btn" aria-hidden="true">
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="eia-purpose-tiles-grid">
              <div className="eia-purpose-tile">
                <Search size={14} className="eia-purpose-tile-icon" />
                <span className="eia-purpose-tile-text">Identify potential impacts</span>
              </div>
              <div className="eia-purpose-tile">
                <BarChart3 size={14} className="eia-purpose-tile-icon" />
                <span className="eia-purpose-tile-text">Predict and evaluate significance</span>
              </div>
              <div className="eia-purpose-tile">
                <Settings size={14} className="eia-purpose-tile-icon" />
                <span className="eia-purpose-tile-text">Suggest mitigation measures</span>
              </div>
              <div className="eia-purpose-tile">
                <FileCheck size={14} className="eia-purpose-tile-icon" />
                <span className="eia-purpose-tile-text">Support informed decision-making</span>
              </div>
            </div>
          </div>

          {/* Card 3: EIA in the Development Process */}
          <div
            className="eia-card-panel theme-blue"
            onClick={() => setActiveModalKey('lifecycle')}
            role="button"
            tabIndex={0}
            aria-label="Trace EIA in the Development Process"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalKey('lifecycle');
              }
            }}
          >
            <div className="eia-panel-head">
              <div className="eia-panel-title-wrap">
                <div className="eia-panel-icon">
                  <Layers size={14} />
                </div>
                <h3 className="eia-panel-title">EIA in the Development Process</h3>
              </div>
              <div className="eia-panel-arrow-btn" aria-hidden="true">
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="eia-lifecycle-container">
              {/* 5-Step Process Flow */}
              <div className="eia-lifecycle-steps">
                <div className="eia-step-item">
                  <div className="eia-step-icon-circle">
                    <FileText size={13} />
                  </div>
                  <span className="eia-step-label">Idea / Proposal</span>
                </div>
                <span className="eia-step-arrow">&rarr;</span>

                <div className="eia-step-item is-highlight">
                  <div className="eia-step-icon-circle">
                    <Leaf size={13} />
                  </div>
                  <span className="eia-step-label">EIA</span>
                </div>
                <span className="eia-step-arrow">&rarr;</span>

                <div className="eia-step-item">
                  <div className="eia-step-icon-circle">
                    <Users size={13} />
                  </div>
                  <span className="eia-step-label">Decision (Approval / Mod / Reject)</span>
                </div>
                <span className="eia-step-arrow">&rarr;</span>

                <div className="eia-step-item">
                  <div className="eia-step-icon-circle">
                    <HardHat size={13} />
                  </div>
                  <span className="eia-step-label">Implementation (with Mitigation)</span>
                </div>
                <span className="eia-step-arrow">&rarr;</span>

                <div className="eia-step-item">
                  <div className="eia-step-icon-circle">
                    <Sprout size={13} />
                  </div>
                  <span className="eia-step-label">Sustainable Dev</span>
                </div>
              </div>

              {/* Bottom Panoramic Illustration Banner */}
              <div className="eia-lifecycle-banner">
                <img
                  src="/images/warming-eia-intro-bg.jpg"
                  alt="Sustainable construction and green river valley"
                  loading="lazy"
                />
                <div className="eia-lifecycle-banner-vignette" />
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: WHO USES EIA? + TYPES OF EIA + KEY TAKEAWAY */}
        <div className="eia-grid-row row-bottom">
          {/* Card 4: Who Uses EIA? */}
          <div
            className="eia-card-panel theme-red"
            onClick={() => setActiveModalKey('stakeholders')}
            role="button"
            tabIndex={0}
            aria-label="Inspect Who Uses EIA?"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalKey('stakeholders');
              }
            }}
          >
            <div className="eia-panel-head">
              <div className="eia-panel-title-wrap">
                <div className="eia-panel-icon">
                  <Users size={14} />
                </div>
                <h3 className="eia-panel-title">Who Uses EIA?</h3>
              </div>
              <div className="eia-panel-arrow-btn" aria-hidden="true">
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="eia-stakeholders-grid">
              <div className="eia-stakeholder-col theme-red">
                <div className="eia-stakeholder-icon">
                  <Landmark size={18} />
                </div>
                <span className="eia-stakeholder-name">Government</span>
                <p className="eia-stakeholder-desc">For policy making and approval decisions</p>
              </div>

              <div className="eia-stakeholder-col theme-cyan">
                <div className="eia-stakeholder-icon">
                  <Building2 size={18} />
                </div>
                <span className="eia-stakeholder-name">Project Proponents</span>
                <p className="eia-stakeholder-desc">To plan and design sustainable projects</p>
              </div>

              <div className="eia-stakeholder-col theme-green">
                <div className="eia-stakeholder-icon">
                  <Users size={18} />
                </div>
                <span className="eia-stakeholder-name">Communities</span>
                <p className="eia-stakeholder-desc">To understand and participate in decision-making</p>
              </div>

              <div className="eia-stakeholder-col theme-purple">
                <div className="eia-stakeholder-icon">
                  <TreePine size={18} />
                </div>
                <span className="eia-stakeholder-name">Environmentalists</span>
                <p className="eia-stakeholder-desc">To protect environmental and social interests.</p>
              </div>
            </div>
          </div>

          {/* Card 5: Types of EIA */}
          <div
            className="eia-card-panel theme-indigo"
            onClick={() => setActiveModalKey('types')}
            role="button"
            tabIndex={0}
            aria-label="Compare Types of EIA"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalKey('types');
              }
            }}
          >
            <div className="eia-panel-head">
              <div className="eia-panel-title-wrap">
                <div className="eia-panel-icon">
                  <FileText size={14} />
                </div>
                <h3 className="eia-panel-title">Types of EIA</h3>
              </div>
              <div className="eia-panel-arrow-btn" aria-hidden="true">
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="eia-types-grid">
              <div className="eia-type-box box-comprehensive">
                <div className="eia-type-head">
                  <FileText size={13} />
                  <span>Comprehensive EIA</span>
                </div>
                <p className="eia-type-desc">
                  Detailed assessment for major projects with significant environmental impacts.
                </p>
              </div>

              <div className="eia-type-box box-rapid">
                <div className="eia-type-head">
                  <Zap size={13} />
                  <span>Rapid EIA</span>
                </div>
                <p className="eia-type-desc">
                  Simplified and faster assessment for smaller projects with limited impacts.
                </p>
              </div>
            </div>
          </div>

          {/* Card 6: Key Takeaway */}
          <div
            className="eia-card-panel theme-amber"
            onClick={() => setActiveModalKey('takeaway')}
            role="button"
            tabIndex={0}
            aria-label="Read Key Takeaway"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveModalKey('takeaway');
              }
            }}
          >
            <div className="eia-panel-head">
              <div className="eia-panel-title-wrap">
                <div className="eia-panel-icon">
                  <Lightbulb size={14} />
                </div>
                <h3 className="eia-panel-title">Key Takeaway</h3>
              </div>
              <div className="eia-panel-arrow-btn" aria-hidden="true">
                <ArrowRight size={12} />
              </div>
            </div>

            <div className="eia-takeaway-body">
              <div className="eia-takeaway-visual">
                <img
                  src="/images/cons-method-seedling.jpg"
                  alt="Young seedling growing in fertile soil between nature and city"
                  loading="lazy"
                />
              </div>
              <p className="eia-takeaway-text">
                <span className="eia-takeaway-highlight">EIA helps achieve a balance</span> between
                development and environmental protection for a sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Detail Modal ── */}
      <AnimatePresence>
        {activeModalData && (
          <div
            className="eia-modal-backdrop"
            onClick={() => setActiveModalKey(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="eia-modal-window"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="eia-modal-close-btn"
                onClick={() => setActiveModalKey(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eia-modal-body">
                <span className="eia-modal-eyebrow">{activeModalData.eyebrow}</span>
                <h2 className="eia-modal-title">{activeModalData.title}</h2>
                <p className="eia-modal-desc">{activeModalData.description}</p>

                <div className="eia-modal-box">
                  <strong style={{ display: 'block', marginBottom: '6px', color: '#ffffff' }}>
                    Key Curriculum Dimensions:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {activeModalData.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(52, 211, 153, 0.1)',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                    fontSize: '12px',
                    color: '#6ee7b7',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Sparkles size={16} className="shrink-0" />
                  <span>
                    <strong>Takeaway: </strong>
                    {activeModalData.takeaway}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
