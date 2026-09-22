import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Layers,
  Thermometer,
  GraduationCap,
  Clock,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import type { FormationStageData } from '../data/formationStagesData';

interface StageDetailModalProps {
  stage: FormationStageData | null;
  stageIndex: number;
  allStages: FormationStageData[];
  isOpen: boolean;
  onClose: () => void;
  onSelectStage: (index: number) => void;
}

export default function StageDetailModal({
  stage,
  stageIndex,
  allStages,
  isOpen,
  onClose,
  onSelectStage,
}: StageDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'mechanisms' | 'exam'>('notes');

  // Prevent background scrolling and lock Lenis smooth scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (lenis) {
      lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (stageIndex - 1 + allStages.length) % allStages.length;
        onSelectStage(prevIdx);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (stageIndex + 1) % allStages.length;
        onSelectStage(nextIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      if (lenis) {
        lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, stageIndex, allStages.length, onClose, onSelectStage]);

  if (!isOpen || !stage) return null;

  const prevIndex = (stageIndex - 1 + allStages.length) % allStages.length;
  const nextIndex = (stageIndex + 1) % allStages.length;

  return (
    <AnimatePresence>
      <div
        className="stage-modal-overlay"
        onClick={onClose}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className="stage-modal-container"
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Bar / Header */}
          <div className="stage-modal-header">
            <div className="modal-header-meta">
              <div className="modal-course-badge">
                <GraduationCap size={13} />
                <span>BCV755B: CONSERVATION OF NATURAL RESOURCES • MODULE 1: LAND</span>
              </div>
              <div className="modal-title-row">
                <span className="modal-stage-num">{stage.num}</span>
                <h3 className="modal-stage-title">{stage.title}</h3>
                <span className="modal-stage-time-chip">
                  <Clock size={12} />
                  <span>{stage.time}</span>
                  <span className="chip-sep">•</span>
                  <span className="chip-eon">{stage.eon}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close syllabus reader"
              title="Close (Esc)"
            >
              <X size={18} />
              <span className="esc-hint">ESC</span>
            </button>
          </div>

          {/* Quick Context Hero Strip */}
          <div className="stage-modal-hero">
            <div
              className="modal-hero-thumb"
              style={{ backgroundImage: `url('${stage.thumb}')` }}
            >
              <div className="modal-thumb-overlay">
                <span className="thumb-stage-tag">STAGE {stage.num}</span>
              </div>
            </div>

            <div className="modal-hero-details">
              <div className="modal-summary-banner">
                <span className="summary-quote-icon">“</span>
                <p className="summary-text">{stage.curriculumSummary}</p>
              </div>

              {/* 4 Quick Stat Pills in clean 2-column or 4-column wrapping grid */}
              <div className="modal-stat-grid">
                <div className="modal-stat-pill">
                  <span className="stat-label">
                    <BookOpen size={11} />
                    <span>Syllabus Reference</span>
                  </span>
                  <strong className="stat-val">{stage.syllabusRef}</strong>
                </div>

                <div className="modal-stat-pill">
                  <span className="stat-label">
                    <Thermometer size={11} />
                    <span>Thermal State</span>
                  </span>
                  <strong className="stat-val">{stage.thermalState}</strong>
                </div>

                <div className="modal-stat-pill">
                  <span className="stat-label">
                    <Layers size={11} />
                    <span>Geosphere Domain</span>
                  </span>
                  <strong className="stat-val">{stage.keyLayerDomain}</strong>
                </div>

                <div className="modal-stat-pill highlight-gold">
                  <span className="stat-label">
                    <Sparkles size={11} />
                    <span>VTU Exam Relevance</span>
                  </span>
                  <strong className="stat-val">{stage.examRelevance}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="stage-modal-tabs">
            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'notes' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <BookOpen size={13} />
              <span>Curriculum Notes (Module 1)</span>
              <span className="tab-count">{stage.curriculumNotes.length}</span>
            </button>

            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'mechanisms' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('mechanisms')}
            >
              <Sparkles size={13} />
              <span>Geological Mechanisms</span>
              <span className="tab-count">{stage.scientificMechanisms.length}</span>
            </button>

            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'exam' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('exam')}
            >
              <GraduationCap size={13} />
              <span>Exam Q&amp;A &amp; Viva Prep</span>
              <span className="tab-count">{stage.vtuExamPoints.length}</span>
            </button>
          </div>

          {/* Modal Tab Content Area - The Primary Scrollable Body */}
          <div
            className="stage-modal-content-scroll"
            onWheel={(e) => e.stopPropagation()}
            tabIndex={0}
          >
            {/* TAB 1: CURRICULUM NOTES */}
            {activeTab === 'notes' && (
              <div className="modal-tab-pane tab-notes-pane">
                <div className="pane-intro-callout">
                  <BookOpen size={16} className="callout-icon" />
                  <div>
                    <strong>Directly Aligned with VTU BCV755B Syllabus:</strong>
                    <p>
                      Official academic lecture notes from HKBK College of Engineering – Civil
                      Engineering Department (Conservation of Natural Resources).
                    </p>
                  </div>
                </div>

                <div className="notes-sections-list">
                  {stage.curriculumNotes.map((sec, sIdx) => (
                    <div key={sIdx} className="notes-card-item">
                      <h4 className="notes-card-heading">
                        <span className="heading-pill">§ {sIdx + 1}</span>
                        {sec.heading}
                      </h4>
                      <ul className="notes-points-list">
                        {sec.points.map((pt, pIdx) => (
                          <li key={pIdx} className="notes-point-li">
                            <span className="point-bullet">
                              <CheckCircle2 size={13} />
                            </span>
                            <span className="point-text">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: GEOLOGICAL & PLANETARY MECHANISMS */}
            {activeTab === 'mechanisms' && (
              <div className="modal-tab-pane tab-mechanisms-pane">
                <div className="pane-intro-callout">
                  <Compass size={16} className="callout-icon" />
                  <div>
                    <strong>Physical &amp; Geochemical Laws:</strong>
                    <p>
                      Thermodynamics, planetary differentiation, and lithospheric forces
                      transforming early Earth into a habitable world.
                    </p>
                  </div>
                </div>

                <div className="mechanisms-grid">
                  {stage.scientificMechanisms.map((mech, mIdx) => (
                    <div key={mIdx} className="mechanism-card">
                      <div className="mechanism-card-header">
                        <span className="mech-index">0{mIdx + 1}</span>
                        <h4 className="mech-title">{mech.title}</h4>
                      </div>
                      <p className="mech-desc">{mech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: EXAM Q&A AND VIVA PREP */}
            {activeTab === 'exam' && (
              <div className="modal-tab-pane tab-exam-pane">
                <div className="pane-intro-callout gold-callout">
                  <GraduationCap size={16} className="callout-icon" />
                  <div>
                    <strong>VTU University Examination High-Yield Questions:</strong>
                    <p>
                      Standard questions frequently asked in internal tests, semester end exams, and
                      viva voce for BCV755B Module 1.
                    </p>
                  </div>
                </div>

                <div className="exam-qa-list">
                  {stage.vtuExamPoints.map((qa, qIdx) => (
                    <div key={qIdx} className="exam-qa-card">
                      <div className="exam-q-box">
                        <span className="qa-badge q-badge">QUESTION {qIdx + 1}</span>
                        <h4 className="exam-q-text">{qa.question}</h4>
                      </div>
                      <div className="exam-a-box">
                        <span className="qa-badge a-badge">MODEL ANSWER</span>
                        <p className="exam-a-text">{qa.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="stage-modal-footer">
            <button
              type="button"
              className="modal-footer-nav-btn prev-btn"
              onClick={() => onSelectStage(prevIndex)}
              title="Previous Stage"
            >
              <ChevronLeft size={16} />
              <div className="btn-text-col">
                <span className="btn-sub">Previous</span>
                <span className="btn-title">{allStages[prevIndex].title}</span>
              </div>
            </button>

            {/* Middle Stage Beads */}
            <div className="modal-stage-beads">
              {allStages.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`modal-bead ${stageIndex === idx ? 'is-active' : ''}`}
                  onClick={() => onSelectStage(idx)}
                  title={`Stage ${s.num}: ${s.title}`}
                >
                  <span className="bead-num">{s.num}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="modal-footer-nav-btn next-btn"
              onClick={() => onSelectStage(nextIndex)}
              title="Next Stage"
            >
              <div className="btn-text-col text-right">
                <span className="btn-sub">Next</span>
                <span className="btn-title">{allStages[nextIndex].title}</span>
              </div>
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
