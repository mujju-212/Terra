import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Waves,
  Layers,
  Heart,
  Users2,
  Check,
  X,
  Activity,
  AlertTriangle,
  Lightbulb,
  Building2,
  TrendingUp,
  Settings,
} from 'lucide-react';
import {
  waterConservationStrategies,
  managementApproachesData,
  impactItemsData,
  roleActionItemsData,
  waterStressBenchmarksData,
  type ConservationStrategy,
  type ManagementApproach,
  type RoleActionItem,
} from './waterData';
import { useModalScrollLock } from './useModalScrollLock';

export function WaterConservationScreen() {
  const [activeConservationModal, setActiveConservationModal] = useState<ConservationStrategy | null>(null);
  const [activeApproachModal, setActiveApproachModal] = useState<ManagementApproach | null>(null);
  const [activeRoleModal, setActiveRoleModal] = useState<RoleActionItem | null>(null);
  const [selectedStressBenchmark, setSelectedStressBenchmark] = useState<string>('per-capita');
  const currentBenchmark = waterStressBenchmarksData[selectedStressBenchmark] || waterStressBenchmarksData['per-capita'];
  const [completedRoleActions, setCompletedRoleActions] = useState<Record<string, boolean>>({
    h1: true,
    p1: true,
  });

  const toggleRoleCheck = (actionId: string) => {
    setCompletedRoleActions((prev) => ({
      ...prev,
      [actionId]: !prev[actionId],
    }));
  };

  const isModalOpen = Boolean(activeConservationModal || activeApproachModal || activeRoleModal);
  useModalScrollLock(isModalOpen, () => {
    setActiveConservationModal(null);
    setActiveApproachModal(null);
    setActiveRoleModal(null);
  });

  return (
    <>
        <section className="water-conservation-chapter-section" id="ch-06" data-chapter="07">
          {/* Panoramic Scenery & Scrims */}
          <div className="water-cons-canvas-bg" />
          <div className="water-cons-scrim-left" />
          <div className="water-cons-scrim-top" />
          <div className="water-cons-scrim-bottom" />

          {/* Top Row: Chapter Header, Panoramic Hero & Live Widget */}
          <div className="water-cons-top-row">
            <div className="water-cons-header-block">
              <p className="water-cons-eyebrow">CHAPTER 06</p>
              <h2 className="water-cons-title">
                Water <span className="title-accent">Conservation</span> &amp; Management
              </h2>
              <p className="water-cons-deck">
                Conserving and managing water resources ensures a sustainable supply for present and future generations, balancing human needs with ecosystem health.
              </p>
            </div>

            {/* Top-Right: Quote Card & Floating Water-Saved Widget */}
            <div className="water-cons-top-right-group">
              {/* Quote Card */}
              <div className="water-cons-quote-card">
                <span className="water-cons-quote-mark">“</span>
                <p className="water-cons-quote-text">
                  Conserve water today, for a secure and resilient tomorrow.
                </p>
              </div>

              {/* Strategic Benchmark Card: National Water Stress & Mission Target */}
              <div className="water-cons-saved-widget">
                <div className="water-cons-saved-header">
                  <div className="water-cons-drop-badge">
                    <Droplet size={20} className="water-cons-drop-icon" />
                  </div>
                  <div className="water-cons-saved-titles">
                    <div className="water-cons-saved-label-row">
                      <span className="water-cons-saved-label">{currentBenchmark.title}</span>
                      <span
                        className="water-cons-status-tag"
                        style={{
                          color: currentBenchmark.statusTagColor,
                          borderColor: `${currentBenchmark.statusTagColor}60`,
                          background: `${currentBenchmark.statusTagColor}18`,
                        }}
                      >
                        {currentBenchmark.statusTag}
                      </span>
                    </div>
                    <div className="water-cons-saved-val-row">
                      <strong className="water-cons-saved-value">{currentBenchmark.metric}</strong>
                      <span className="water-cons-saved-unit">{currentBenchmark.unit}</span>
                    </div>
                  </div>
                </div>

                <p className="water-cons-saved-micro">{currentBenchmark.keyFact}</p>

                <div className="water-cons-progress-row">
                  <div className="water-cons-progress-track">
                    <div
                      className="water-cons-progress-fill"
                      style={{
                        width: `${currentBenchmark.progressPct}%`,
                        background:
                          currentBenchmark.id === 'per-capita'
                            ? 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)'
                            : 'linear-gradient(90deg, #10b981 0%, #06b6d4 60%, #38bdf8 100%)',
                      }}
                    />
                  </div>
                  <span
                    className="water-cons-progress-pct"
                    style={{
                      color: currentBenchmark.id === 'per-capita' ? '#f59e0b' : '#38bdf8',
                    }}
                  >
                    {currentBenchmark.progressPct}%
                  </span>
                </div>

                <div className="water-cons-quick-actions">
                  <div className="water-cons-quick-header">
                    <span className="water-cons-quick-label">National Indicators &amp; Goals:</span>
                    <span className="water-cons-fact-pill">{currentBenchmark.progressLabel}</span>
                  </div>
                  <div className="water-cons-pills-row">
                    {Object.values(waterStressBenchmarksData).map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className={`water-cons-pledge-btn ${selectedStressBenchmark === b.id ? 'is-active' : ''}`}
                        onClick={() => setSelectedStressBenchmark(b.id)}
                        title={b.title}
                      >
                        {b.shortLabel}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Key Strategies for Water Conservation (4 Grand Cards) */}
          <div className="water-cons-strategies-container">
            <h3 className="water-cons-strategies-title">Key Strategies for Water Conservation</h3>
            <div className="water-cons-strategies-grid" role="group" aria-label="Key strategies for water conservation">
              {waterConservationStrategies.map((strat) => {
                const Icon = strat.icon;
                return (
                  <div
                    key={strat.id}
                    className="water-strat-card"
                    style={{ '--strat-color': strat.color } as React.CSSProperties}
                    onClick={() => setActiveConservationModal(strat)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveConservationModal(strat);
                      }
                    }}
                  >
                    {/* Card Top Text Header */}
                    <div className="water-strat-card-header">
                      <div className="water-strat-icon-badge" style={{ backgroundColor: strat.badgeBg }}>
                        <Icon size={17} color={strat.badgeColor} />
                      </div>
                      <h4 className="water-strat-card-title">{strat.title}</h4>
                      <p className="water-strat-card-sub">{strat.subtitle}</p>
                    </div>

                    {/* Card Bottom Photo with Floating Arrow Action Button */}
                    <div className="water-strat-media-wrap">
                      <img
                        src={strat.image}
                        alt={strat.title}
                        className="water-strat-img"
                        loading="lazy"
                      />
                      <div className="water-strat-media-overlay" />
                      <button
                        type="button"
                        className="water-strat-arrow-btn"
                        style={{ backgroundColor: strat.btnBg }}
                        aria-label={`Explore ${strat.title} deep dive`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveConservationModal(strat);
                        }}
                      >
                        <ArrowRight size={18} color="#04090c" strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: 3 Distinct Glassmorphic Panels */}
          <div className="water-cons-bottom-grid">
            {/* Panel 1 (Left): Water Management Approaches */}
            <div className="water-cons-panel water-cons-panel-approaches">
              <h3 className="water-cons-panel-title">Water Management Approaches</h3>
              <div className="water-approaches-columns">
                {managementApproachesData.map((appr) => {
                  const Icon = appr.icon;
                  return (
                    <div
                      key={appr.id}
                      className="water-approach-col"
                      onClick={() => setActiveApproachModal(appr)}
                      role="button"
                      tabIndex={0}
                      title="Click to view detailed syllabus framework"
                    >
                      <div className="water-approach-icon-disc" style={{ backgroundColor: appr.badgeBg }}>
                        <Icon size={16} color={appr.color} />
                      </div>
                      <h4 className="water-approach-title">{appr.title}</h4>
                      <p className="water-approach-desc">{appr.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel 2 (Center): Impact of Conservation */}
            <div className="water-cons-panel water-cons-panel-impact">
              <h3 className="water-cons-panel-title">Impact of Conservation</h3>
              <div className="water-impact-grid">
                {impactItemsData.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="water-impact-card"
                      title={item.detail}
                    >
                      <div className="water-impact-icon-wrap" style={{ backgroundColor: item.badgeBg }}>
                        <Icon size={15} color={item.color} />
                      </div>
                      <span className="water-impact-text">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel 3 (Right): Your Role */}
            <div className="water-cons-panel water-cons-panel-role">
              <h3 className="water-cons-panel-title">Your Role</h3>
              <div className="water-role-list">
                {roleActionItemsData.map((role) => {
                  const Icon = role.icon;
                  return (
                    <div
                      key={role.id}
                      className="water-role-item"
                      onClick={() => setActiveRoleModal(role)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="water-role-left">
                        <Icon size={14} color={role.color} />
                        <span className="water-role-label">{role.title}</span>
                      </div>
                      <ChevronRight size={14} className="water-role-chevron" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>


      {/* Chapter 06: Conservation Strategy Deep-Dive Modal */}
      <AnimatePresence>
        {/* Chapter 06: Conservation Strategy Deep-Dive Modal */}
        {activeConservationModal && (
          <motion.div
            className="water-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveConservationModal(null)}
          >
            <motion.div
              className="water-modal-card water-cons-modal-card"
              initial={{ scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 18 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="water-modal-header" style={{ borderBottomColor: `${activeConservationModal.color}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    className="water-modal-badge"
                    style={{ backgroundColor: activeConservationModal.badgeBg, color: activeConservationModal.badgeColor }}
                  >
                    {activeConservationModal.num}
                  </div>
                  <div>
                    <h3 className="water-modal-title">{activeConservationModal.title}</h3>
                    <p className="water-modal-subtitle">{activeConservationModal.subtitle}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setActiveConservationModal(null)}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="water-modal-body water-cons-modal-content" data-lenis-prevent>
                {/* Hero Media Banner */}
                <div className="water-modal-banner" style={{ height: 180, position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                  <img
                    src={activeConservationModal.image}
                    alt={activeConservationModal.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(4, 9, 12, 0.95) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      left: 14,
                      right: 14,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(6, 16, 26, 0.85)',
                        border: `1px solid ${activeConservationModal.color}`,
                        borderRadius: 6,
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: activeConservationModal.color,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {activeConservationModal.metric}
                    </span>
                  </div>
                </div>

                {/* Strategy Summary Description */}
                <p style={{ color: 'rgba(215, 238, 248, 0.92)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                  {activeConservationModal.desc}
                </p>

                {/* Practical Engineering Techniques */}
                <div className="water-modal-beat-card">
                  <span className="water-modal-beat-num" style={{ color: activeConservationModal.color }}>
                    KEY TECHNICAL INTERVENTIONS
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginTop: 8 }}>
                    {activeConservationModal.practices.map((pr, pIdx) => (
                      <div
                        key={pIdx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 8,
                          padding: '10px 12px',
                        }}
                      >
                        <strong style={{ display: 'block', fontSize: '0.82rem', color: '#ffffff', marginBottom: 3 }}>
                          {pr.name}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.76rem', color: 'rgba(200, 230, 245, 0.75)', lineHeight: 1.4 }}>
                          {pr.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VTU BCV755B Syllabus Notes */}
                <div className="water-modal-beat-card">
                  <span className="water-modal-beat-num">VTU BCV755B MODULE 02 SYLLABUS DIRECTIVES</span>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {activeConservationModal.vtuPoints.map((pt, ptIdx) => (
                      <li key={ptIdx} style={{ fontSize: '0.84rem', color: 'rgba(215, 238, 248, 0.88)', lineHeight: 1.5 }}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Indian Field Benchmark Case Study */}
                <div
                  style={{
                    background: 'rgba(14, 165, 233, 0.07)',
                    border: '1px solid rgba(56, 189, 248, 0.28)',
                    borderRadius: 10,
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>
                      {activeConservationModal.caseStudy.title}
                    </strong>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#38bdf8',
                        background: 'rgba(56, 189, 248, 0.15)',
                        padding: '2px 8px',
                        borderRadius: 4,
                      }}
                    >
                      {activeConservationModal.caseStudy.metric}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(200, 230, 245, 0.82)', lineHeight: 1.45 }}>
                    {activeConservationModal.caseStudy.detail}
                  </p>
                </div>
              </div>

              {/* Modal Footer with Stepper */}
              <div className="water-modal-footer">
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="water-stepper-arrow-btn"
                    onClick={() => {
                      const currIdx = waterConservationStrategies.findIndex((s) => s.id === activeConservationModal.id);
                      const prevIdx = (currIdx - 1 + waterConservationStrategies.length) % waterConservationStrategies.length;
                      setActiveConservationModal(waterConservationStrategies[prevIdx]);
                    }}
                    title="Previous strategy"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="water-stepper-arrow-btn"
                    onClick={() => {
                      const currIdx = waterConservationStrategies.findIndex((s) => s.id === activeConservationModal.id);
                      const nextIdx = (currIdx + 1) % waterConservationStrategies.length;
                      setActiveConservationModal(waterConservationStrategies[nextIdx]);
                    }}
                    title="Next strategy"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  className="water-btn-start"
                  style={{ backgroundColor: activeConservationModal.color }}
                  onClick={() => setActiveConservationModal(null)}
                >
                  <span>Understood</span>
                  <Check size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}


      </AnimatePresence>

      {/* Chapter 06: Water Management Approach Modal */}
      <AnimatePresence>
        {/* Chapter 06: Water Management Approach Modal */}
        {activeApproachModal && (
          <motion.div
            className="water-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveApproachModal(null)}
          >
            <motion.div
              className="water-modal-card water-cons-modal-card"
              initial={{ scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 18 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-modal-header" style={{ borderBottomColor: `${activeApproachModal.color}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    className="water-modal-badge"
                    style={{ backgroundColor: activeApproachModal.badgeBg, color: activeApproachModal.color }}
                  >
                    <activeApproachModal.icon size={18} />
                  </div>
                  <div>
                    <h3 className="water-modal-title">{activeApproachModal.title}</h3>
                    <p className="water-modal-subtitle">{activeApproachModal.subtitle}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setActiveApproachModal(null)}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-modal-body water-cons-modal-content" data-lenis-prevent>
                <div className="water-modal-beat-card">
                  <span className="water-modal-beat-num" style={{ color: activeApproachModal.color }}>
                    CORE PRINCIPLES &amp; INSTITUTIONAL FRAMEWORK
                  </span>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeApproachModal.detailedPoints.map((pt, pIdx) => (
                      <li key={pIdx} style={{ fontSize: '0.85rem', color: 'rgba(215, 238, 248, 0.9)', lineHeight: 1.5 }}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="water-modal-footer">
                <button
                  type="button"
                  className="water-btn-start"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setActiveApproachModal(null)}
                >
                  <span>Close</span>
                  <Check size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}


      </AnimatePresence>

      {/* Chapter 06: Your Role Action Checklist Modal */}
      <AnimatePresence>
        {/* Chapter 06: Your Role Action Checklist Modal */}
        {activeRoleModal && (
          <motion.div
            className="water-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveRoleModal(null)}
          >
            <motion.div
              className="water-modal-card water-cons-modal-card"
              initial={{ scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 18 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-modal-header" style={{ borderBottomColor: `${activeRoleModal.color}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    className="water-modal-badge"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: activeRoleModal.color }}
                  >
                    <activeRoleModal.icon size={18} />
                  </div>
                  <div>
                    <h3 className="water-modal-title">{activeRoleModal.title}</h3>
                    <p className="water-modal-subtitle">Interactive Citizen Action Checklist</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="water-modal-close-btn"
                  onClick={() => setActiveRoleModal(null)}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-modal-body water-cons-modal-content" data-lenis-prevent>
                <p style={{ color: 'rgba(200, 230, 245, 0.85)', fontSize: '0.86rem', margin: '0 0 12px 0' }}>
                  Check off the sustainable water conservation habits you practice or pledge to adopt. Each action dynamically logs your positive impact!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {activeRoleModal.checklist.map((item) => {
                    const isChecked = Boolean(completedRoleActions[item.id]);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleRoleCheck(item.id)}
                        style={{
                          background: isChecked ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                          border: isChecked ? '1px solid rgba(34, 197, 94, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 8,
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 4,
                              border: isChecked ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.3)',
                              backgroundColor: isChecked ? '#22c55e' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {isChecked && <Check size={13} color="#04090c" strokeWidth={3} />}
                          </div>
                          <span style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: isChecked ? 600 : 400 }}>
                            {item.text}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: isChecked ? '#86efac' : '#94a3b8',
                            fontWeight: 600,
                            flexShrink: 0,
                            marginLeft: 12,
                          }}
                        >
                          {item.savings}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="water-modal-footer">
                <button
                  type="button"
                  className="water-btn-start"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setActiveRoleModal(null)}
                >
                  <span>Done</span>
                  <Check size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
