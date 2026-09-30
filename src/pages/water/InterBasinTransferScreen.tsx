import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudRain,
  Building2,
  Layers,
  Droplets,
  Sprout,
  TrendingUp,
  Droplet,
  Users2,
  IndianRupee,
  Scale,
  Trees,
  MapPin,
  Sparkles,
  ChevronRight,
  X,
  Check,
  Info,
  ArrowRight,
  Compass,
} from 'lucide-react';
import {
  ibwtHotspotsData,
  ibwtStepsData,
  ibwtExamplesData,
  ibwtBenefitsData,
  ibwtChallengesData,
  all18MeritsData,
  all14DemeritsData,
  allIBWTProjectsNotes,
  type IBWTHotspot,
  type IBWTStep,
  type IBWTExample,
} from './waterData';
import { useModalScrollLock } from './useModalScrollLock';

export function InterBasinTransferScreen() {
  const [activeHotspot, setActiveHotspot] = useState<IBWTHotspot | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeExampleModal, setActiveExampleModal] = useState<IBWTExample | null>(null);
  const [showAllProjectsModal, setShowAllProjectsModal] = useState(false);
  const [showMeritsModal, setShowMeritsModal] = useState(false);
  const [showDemeritsModal, setShowDemeritsModal] = useState(false);

  const isModalOpen = Boolean(
    activeHotspot ||
      activeExampleModal ||
      showAllProjectsModal ||
      showMeritsModal ||
      showDemeritsModal
  );

  useModalScrollLock(isModalOpen, () => {
    setActiveHotspot(null);
    setActiveExampleModal(null);
    setShowAllProjectsModal(false);
    setShowMeritsModal(false);
    setShowDemeritsModal(false);
  });

  return (
    <>
      <section className="water-ibwt-chapter-section" id="ch-07" data-chapter="08">
        {/* Panoramic Landscape Background & Vignettes */}
        <div className="water-ibwt-canvas-bg" />
        <div className="water-ibwt-scrim-left" />
        <div className="water-ibwt-scrim-top" />
        <div className="water-ibwt-scrim-bottom" />

        {/* ─── INTERACTIVE LANDSCAPE HOTSPOTS ─── */}
        <div className="water-ibwt-hotspots-layer" aria-label="Interactive river basin hotspots">
          {ibwtHotspotsData.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;
            return (
              <div
                key={spot.id}
                className={`water-ibwt-hotspot-pin ${isSelected ? 'is-active' : ''}`}
                style={{
                  left: spot.x,
                  top: spot.y,
                  '--spot-color': spot.color,
                  '--spot-glow': spot.glow,
                  '--spot-border': spot.border,
                  '--spot-bg': spot.badgeBg,
                } as React.CSSProperties}
              >
                {/* Connecting Anchor Dot & Pulse */}
                <button
                  type="button"
                  className="water-ibwt-pin-beacon"
                  onClick={() => setActiveHotspot(spot)}
                  aria-label={`Inspect ${spot.title}`}
                >
                  <span className="water-ibwt-beacon-core" />
                  <span className="water-ibwt-beacon-wave" />
                </button>

                {/* Floating Glass Pill Badge matching mockup */}
                <button
                  type="button"
                  className={`water-ibwt-badge-pill ${isSelected ? 'pill-selected' : ''}`}
                  onClick={() => setActiveHotspot(spot)}
                >
                  <span className="water-ibwt-badge-title">{spot.title}</span>
                  {spot.sub && <span className="water-ibwt-badge-sub">{spot.sub}</span>}
                </button>

                {/* Animated Directional Flow Chevrons for Transfer Link */}
                {spot.id === 'link' && (
                  <div className="water-ibwt-flow-indicator" aria-hidden="true">
                    <span className="water-flow-arrow">›</span>
                    <span className="water-flow-arrow">›</span>
                    <span className="water-flow-arrow">›</span>
                    <span className="water-flow-arrow">›</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ─── TOP ROW: HEADER & QUOTE ─── */}
        <div className="water-ibwt-top-row">
          <div className="water-ibwt-header-block">
            <p className="water-ibwt-eyebrow">CHAPTER 08</p>
            <h2 className="water-ibwt-title">
              Inter-Basin <span className="title-accent">Water Transfer</span>
            </h2>
            <p className="water-ibwt-deck">
              Inter-basin water transfer (IBWT) involves transferring water from a water-surplus basin to a water-deficit basin to balance regional water availability and ensure sustainable use.
            </p>
          </div>

          {/* Top-Right: Quote Card */}
          <div className="water-ibwt-quote-card">
            <span className="water-ibwt-quote-mark">“</span>
            <p className="water-ibwt-quote-text">
              Inter-basin water transfer helps balance water availability across regions, but it also requires careful planning and environmental considerations.
            </p>
          </div>
        </div>

        {/* ─── MIDDLE ROW: "HOW IT WORKS?" 4-STEP PROCESS CARD ─── */}
        <div className="water-ibwt-how-works-card">
          <div className="water-ibwt-how-header">
            <h3 className="water-ibwt-how-title">How It Works?</h3>
            <span className="water-ibwt-how-subtitle">4-stage inter-basin diversion sequence</span>
          </div>

          <div className="water-ibwt-steps-flow">
            {ibwtStepsData.map((step, idx) => {
              const Icon = step.icon;
              const isStepActive = activeStep === step.num;
              return (
                <div key={step.num} className="water-ibwt-step-wrapper">
                  <button
                    type="button"
                    className={`water-ibwt-step-item ${isStepActive ? 'step-expanded' : ''}`}
                    onClick={() => setActiveStep(isStepActive ? null : step.num)}
                    aria-expanded={isStepActive}
                  >
                    <div className="water-ibwt-step-icon-wrap">
                      <div className="water-ibwt-step-icon-badge">
                        <Icon size={20} className="water-ibwt-step-icon" />
                      </div>
                      <span className="water-ibwt-step-num-pill">{step.num}</span>
                    </div>

                    <div className="water-ibwt-step-text">
                      <strong className="water-ibwt-step-title">{step.title}</strong>
                      <span className="water-ibwt-step-sub">{step.sub}</span>
                    </div>

                    {isStepActive && (
                      <p className="water-ibwt-step-detail-pop">{step.detail}</p>
                    )}
                  </button>

                  {idx < ibwtStepsData.length - 1 && (
                    <div className="water-ibwt-step-arrow" aria-hidden="true">
                      <span>→</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── BOTTOM ROW: 3 GRAND PANELS (EXAMPLES, BENEFITS, CHALLENGES) ─── */}
        <div className="water-ibwt-bottom-grid">
          {/* 1. EXAMPLES IN INDIA */}
          <div className="water-ibwt-panel water-ibwt-examples-panel">
            <div className="water-ibwt-panel-header">
              <h3 className="water-ibwt-panel-title">Examples in India</h3>
              <button
                type="button"
                className="water-ibwt-view-all-btn"
                onClick={() => setShowAllProjectsModal(true)}
              >
                <span>All 9 Projects in Notes</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="water-ibwt-examples-cards">
              {ibwtExamplesData.map((ex) => (
                <div
                  key={ex.id}
                  className="water-ibwt-example-card"
                  onClick={() => setActiveExampleModal(ex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveExampleModal(ex);
                    }
                  }}
                >
                  <div className="water-ibwt-example-thumb-wrap">
                    <img
                      src={ex.image}
                      alt={ex.title}
                      className="water-ibwt-example-thumb"
                      loading="lazy"
                    />
                    <div className="water-ibwt-example-thumb-gradient" />
                  </div>

                  <div className="water-ibwt-example-body">
                    <div className="water-ibwt-example-head">
                      <div className="water-ibwt-pin-title-row">
                        <MapPin size={16} className="water-ibwt-example-pin-icon" />
                        <h4 className="water-ibwt-example-title">{ex.title}</h4>
                      </div>
                      <p className="water-ibwt-example-sub">{ex.subtitle}</p>
                    </div>

                    <ul className="water-ibwt-example-bullets">
                      {ex.bullets.map((b, i) => (
                        <li key={i}>
                          <span className="water-bullet-dot">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. KEY BENEFITS */}
          <div className="water-ibwt-panel water-ibwt-benefits-panel">
            <div className="water-ibwt-panel-header">
              <h3 className="water-ibwt-panel-title">Key Benefits</h3>
              <button
                type="button"
                className="water-ibwt-view-all-btn"
                onClick={() => setShowMeritsModal(true)}
              >
                <span>18 Merits in Notes</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="water-ibwt-benefits-list">
              {ibwtBenefitsData.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="water-ibwt-benefit-item">
                    <div
                      className="water-ibwt-benefit-icon-badge"
                      style={{
                        backgroundColor: item.badgeBg,
                        color: item.color,
                        borderColor: `${item.color}50`,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="water-ibwt-benefit-text">
                      <strong className="water-ibwt-benefit-title">{item.title}</strong>
                      <span className="water-ibwt-benefit-sub">{item.detail}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. KEY CHALLENGES */}
          <div className="water-ibwt-panel water-ibwt-challenges-panel">
            <div className="water-ibwt-panel-header">
              <h3 className="water-ibwt-panel-title">Key Challenges</h3>
              <button
                type="button"
                className="water-ibwt-view-all-btn"
                onClick={() => setShowDemeritsModal(true)}
              >
                <span>14 Demerits in Notes</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="water-ibwt-challenges-list">
              {ibwtChallengesData.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="water-ibwt-challenge-item">
                    <div
                      className="water-ibwt-challenge-icon-badge"
                      style={{
                        backgroundColor: item.badgeBg,
                        color: item.color,
                        borderColor: `${item.color}50`,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="water-ibwt-challenge-text">
                      <strong className="water-ibwt-challenge-title">{item.title}</strong>
                      <span className="water-ibwt-challenge-sub">{item.detail}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODAL 1: HOTSPOT INSPECTOR MODAL ─── */}
      <AnimatePresence>
        {activeHotspot && (
          <div
            className="water-modal-backdrop"
            onClick={() => setActiveHotspot(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hotspot-modal-title"
          >
            <motion.div
              className="water-ibwt-modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-ibwt-modal-header">
                <div className="water-ibwt-modal-title-group">
                  <span
                    className="water-ibwt-modal-tag"
                    style={{
                      color: activeHotspot.color,
                      borderColor: activeHotspot.border,
                      background: activeHotspot.badgeBg,
                    }}
                  >
                    IBWT LANDSCAPE FEATURE
                  </span>
                  <h3 id="hotspot-modal-title" className="water-ibwt-modal-name">
                    {activeHotspot.title}
                  </h3>
                  {activeHotspot.sub && (
                    <p className="water-ibwt-modal-sub">{activeHotspot.sub}</p>
                  )}
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setActiveHotspot(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-ibwt-modal-content">
                <p className="water-ibwt-modal-desc">{activeHotspot.fullDescription}</p>

                <div className="water-ibwt-modal-stats-row">
                  {activeHotspot.keyStats.map((st, i) => (
                    <div key={i} className="water-ibwt-modal-stat-box">
                      <span className="water-ibwt-modal-stat-label">{st.label}</span>
                      <strong
                        className="water-ibwt-modal-stat-val"
                        style={{ color: activeHotspot.color }}
                      >
                        {st.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 2: EXAMPLE DEEP-DIVE MODAL ─── */}
      <AnimatePresence>
        {activeExampleModal && (
          <div
            className="water-modal-backdrop"
            onClick={() => setActiveExampleModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="example-modal-title"
          >
            <motion.div
              className="water-ibwt-modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-ibwt-modal-header">
                <div className="water-ibwt-modal-title-group">
                  <span className="water-ibwt-modal-tag" style={{ color: '#38bdf8', borderColor: '#38bdf850', background: '#38bdf815' }}>
                    INTER-BASIN TRANSFER PROJECT
                  </span>
                  <h3 id="example-modal-title" className="water-ibwt-modal-name">
                    {activeExampleModal.title}
                  </h3>
                  <p className="water-ibwt-modal-sub">{activeExampleModal.subtitle}</p>
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setActiveExampleModal(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-ibwt-modal-content">
                <img
                  src={activeExampleModal.image}
                  alt={activeExampleModal.title}
                  className="water-ibwt-modal-hero-img"
                />

                <div className="water-ibwt-modal-state-badge">
                  <MapPin size={14} />
                  <span>Beneficiary States: <strong>{activeExampleModal.states}</strong></span>
                </div>

                <p className="water-ibwt-modal-desc">{activeExampleModal.description}</p>

                <div className="water-ibwt-modal-key-points">
                  <h4>Syllabus Salient Points:</h4>
                  <ul>
                    {activeExampleModal.bullets.map((b, i) => (
                      <li key={i}>
                        <Check size={14} className="water-ibwt-check-icon" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 3: ALL 9 IBWT PROJECTS FROM NOTES ─── */}
      <AnimatePresence>
        {showAllProjectsModal && (
          <div
            className="water-modal-backdrop"
            onClick={() => setShowAllProjectsModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-projects-title"
          >
            <motion.div
              className="water-ibwt-modal-card water-ibwt-modal-wide"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-ibwt-modal-header">
                <div className="water-ibwt-modal-title-group">
                  <span className="water-ibwt-modal-tag" style={{ color: '#38bdf8', borderColor: '#38bdf850', background: '#38bdf815' }}>
                    VTU BCV755B · PART 7 SYLLABUS
                  </span>
                  <h3 id="all-projects-title" className="water-ibwt-modal-name">
                    Historical &amp; Landmark IBWT Projects in India
                  </h3>
                  <p className="water-ibwt-modal-sub">
                    All major inter-basin water transfer projects detailed in course study notes
                  </p>
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setShowAllProjectsModal(false)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-ibwt-modal-content">
                <div className="water-ibwt-projects-grid">
                  {allIBWTProjectsNotes.map((proj, idx) => (
                    <div key={idx} className="water-ibwt-project-card">
                      <div className="water-ibwt-project-num">0{idx + 1}</div>
                      <div className="water-ibwt-project-details">
                        <strong className="water-ibwt-project-name">{proj.name}</strong>
                        <span className="water-ibwt-project-state">{proj.stateYear}</span>
                        <p className="water-ibwt-project-info">{proj.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 4: ALL 18 MERITS MODAL ─── */}
      <AnimatePresence>
        {showMeritsModal && (
          <div
            className="water-modal-backdrop"
            onClick={() => setShowMeritsModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="merits-modal-title"
          >
            <motion.div
              className="water-ibwt-modal-card water-ibwt-modal-wide"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-ibwt-modal-header">
                <div className="water-ibwt-modal-title-group">
                  <span className="water-ibwt-modal-tag" style={{ color: '#22c55e', borderColor: '#22c55e50', background: '#22c55e15' }}>
                    FULL CURRICULUM EVALUATION
                  </span>
                  <h3 id="merits-modal-title" className="water-ibwt-modal-name">
                    18 Merits of Inter-Basin Water Transfer
                  </h3>
                  <p className="water-ibwt-modal-sub">
                    Directly from BCV755B Part 8 Interlinking of Rivers course notes
                  </p>
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setShowMeritsModal(false)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-ibwt-modal-content">
                <div className="water-ibwt-points-grid">
                  {all18MeritsData.map((merit, idx) => (
                    <div key={idx} className="water-ibwt-point-card merit-border">
                      <span className="water-ibwt-point-idx">{String(idx + 1).padStart(2, '0')}</span>
                      <p className="water-ibwt-point-text">{merit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 5: ALL 14 DEMERITS MODAL ─── */}
      <AnimatePresence>
        {showDemeritsModal && (
          <div
            className="water-modal-backdrop"
            onClick={() => setShowDemeritsModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demerits-modal-title"
          >
            <motion.div
              className="water-ibwt-modal-card water-ibwt-modal-wide"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-ibwt-modal-header">
                <div className="water-ibwt-modal-title-group">
                  <span className="water-ibwt-modal-tag" style={{ color: '#ef4444', borderColor: '#ef444450', background: '#ef444415' }}>
                    CRITICAL TRADEOFF ANALYSIS
                  </span>
                  <h3 id="demerits-modal-title" className="water-ibwt-modal-name">
                    14 Demerits &amp; Challenges of IBWT
                  </h3>
                  <p className="water-ibwt-modal-sub">
                    Directly from BCV755B Part 8 Interlinking of Rivers course notes
                  </p>
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setShowDemeritsModal(false)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-ibwt-modal-content">
                <div className="water-ibwt-points-grid">
                  {all14DemeritsData.map((demerit, idx) => (
                    <div key={idx} className="water-ibwt-point-card demerit-border">
                      <span className="water-ibwt-point-idx">{String(idx + 1).padStart(2, '0')}</span>
                      <p className="water-ibwt-point-text">{demerit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
