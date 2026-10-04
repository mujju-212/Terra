import React, { useEffect, useState, useRef } from 'react';
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
  Mountain,
} from 'lucide-react';
import { EARTH_LAYERS_DATA, type LayerSyllabusData } from '../data/earthLayersData';

interface LayerDetailModalProps {
  layerKey: 'crust' | 'mantle' | 'outer' | 'inner' | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectLayer: (layer: 'crust' | 'mantle' | 'outer' | 'inner') => void;
}

const layerKeys: Array<'crust' | 'mantle' | 'outer' | 'inner'> = ['crust', 'mantle', 'outer', 'inner'];

export default function LayerDetailModal({
  layerKey,
  isOpen,
  onClose,
  onSelectLayer,
}: LayerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'mechanisms' | 'exam'>('notes');
  const touchStartY = useRef(0);

  const activeLayer = layerKey ? EARTH_LAYERS_DATA[layerKey] : null;

  // Handle keyboard navigation while modal is active; leave page scroll & Lenis active for dual-scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (!layerKey) return;
        const curIdx = layerKeys.indexOf(layerKey);
        const prevIdx = (curIdx - 1 + layerKeys.length) % layerKeys.length;
        onSelectLayer(layerKeys[prevIdx]);
      } else if (e.key === 'ArrowRight') {
        if (!layerKey) return;
        const curIdx = layerKeys.indexOf(layerKey);
        const nextIdx = (curIdx + 1) % layerKeys.length;
        onSelectLayer(layerKeys[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, layerKey, onClose, onSelectLayer]);

  if (!isOpen || !activeLayer) return null;

  const currentIdx = layerKeys.indexOf(activeLayer.key);
  const prevIdx = (currentIdx - 1 + layerKeys.length) % layerKeys.length;
  const nextIdx = (currentIdx + 1) % layerKeys.length;

  const handleBackdropTouchStart = (e: React.TouchEvent) => {
    if (e.target === e.currentTarget && e.touches.length === 1) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleBackdropTouchMove = (e: React.TouchEvent) => {
    if (e.target === e.currentTarget && e.touches.length === 1) {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      window.scrollBy({ top: deltaY, behavior: 'auto' });
    }
  };

  return (
    <AnimatePresence>
      <div
        className="stage-modal-overlay"
        onClick={onClose}
        onTouchStart={handleBackdropTouchStart}
        onTouchMove={handleBackdropTouchMove}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          className="stage-modal-container"
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent
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
                <span className="modal-stage-num">0{currentIdx + 1}</span>
                <h3 className="modal-stage-title">{activeLayer.name}</h3>
                <span className="modal-stage-time-chip">
                  <Layers size={12} />
                  <span>{activeLayer.thickness}</span>
                  <span className="chip-sep">•</span>
                  <span className="chip-eon">{activeLayer.volumePct}</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close layer notes reader"
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
              style={{ backgroundImage: `url('${activeLayer.icon}')` }}
            >
              <div className="modal-thumb-overlay">
                <span className="thumb-stage-tag">{activeLayer.name.toUpperCase()}</span>
              </div>
            </div>

            <div className="modal-hero-details">
              <div className="modal-summary-banner">
                <span className="summary-quote-icon">“</span>
                <p className="summary-text">{activeLayer.summary}</p>
              </div>

              {/* 4 Quick Stat Pills in clean 2-column grid */}
              <div className="modal-stat-grid">
                <div className="modal-stat-pill">
                  <span className="stat-label">
                    <BookOpen size={11} />
                    <span>Syllabus Reference</span>
                  </span>
                  <strong className="stat-val">{activeLayer.syllabusSection}</strong>
                </div>

                <div className="modal-stat-pill">
                  <span className="stat-label">
                    <Thermometer size={11} />
                    <span>Temperature</span>
                  </span>
                  <strong className="stat-val">{activeLayer.temp}</strong>
                </div>

                <div className="modal-stat-pill">
                  <span className="stat-label">
                    <Layers size={11} />
                    <span>State &amp; Density</span>
                  </span>
                  <strong className="stat-val">{activeLayer.state} ({activeLayer.density})</strong>
                </div>

                <div className="modal-stat-pill highlight-gold">
                  <span className="stat-label">
                    <Sparkles size={11} />
                    <span>Composition</span>
                  </span>
                  <strong className="stat-val">{activeLayer.composition}</strong>
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
              <span className="tab-count">{activeLayer.syllabusPoints.length}</span>
            </button>

            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'mechanisms' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('mechanisms')}
            >
              <Sparkles size={13} />
              <span>Geodynamics &amp; Physics</span>
              <span className="tab-count">{activeLayer.geodynamicMechanisms.length}</span>
            </button>

            <button
              type="button"
              className={`modal-tab-btn ${activeTab === 'exam' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('exam')}
            >
              <GraduationCap size={13} />
              <span>Exam Q&amp;A &amp; Viva Prep</span>
              <span className="tab-count">{activeLayer.vtuExamPoints.length}</span>
            </button>
          </div>

          {/* Modal Tab Content Area */}
          <div
            className="stage-modal-content-scroll"
            data-lenis-prevent
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
                      Engineering Department (Part 1: Earth and Formation of Earth's Crust).
                    </p>
                  </div>
                </div>

                <div className="notes-sections-list">
                  {activeLayer.syllabusPoints.map((sec, sIdx) => (
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

            {/* TAB 2: GEODYNAMICS & MECHANISMS */}
            {activeTab === 'mechanisms' && (
              <div className="modal-tab-pane tab-mechanisms-pane">
                <div className="pane-intro-callout">
                  <Compass size={16} className="callout-icon" />
                  <div>
                    <strong>Geological Mechanisms &amp; Thermodynamics:</strong>
                    <p>
                      How {activeLayer.name} interacts with convection, thermal venting, and
                      continental plate tectonics.
                    </p>
                  </div>
                </div>

                <div className="mechanisms-grid">
                  {activeLayer.geodynamicMechanisms.map((mech, mIdx) => (
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
                    <strong>VTU University Examination Questions ({activeLayer.name}):</strong>
                    <p>
                      Standard questions frequently asked in internal tests, semester end exams, and
                      viva voce for BCV755B Module 1.
                    </p>
                  </div>
                </div>

                <div className="exam-qa-list">
                  {activeLayer.vtuExamPoints.map((qa, qIdx) => (
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
              onClick={() => onSelectLayer(layerKeys[prevIdx])}
              title="Previous Layer"
            >
              <ChevronLeft size={16} />
              <div className="btn-text-col">
                <span className="btn-sub">Previous</span>
                <span className="btn-title">{EARTH_LAYERS_DATA[layerKeys[prevIdx]].name}</span>
              </div>
            </button>

            {/* Middle Layer Beads */}
            <div className="modal-stage-beads">
              {layerKeys.map((key, idx) => (
                <button
                  key={key}
                  type="button"
                  className={`modal-bead ${activeLayer.key === key ? 'is-active' : ''}`}
                  onClick={() => onSelectLayer(key)}
                  title={`Layer 0${idx + 1}: ${EARTH_LAYERS_DATA[key].name}`}
                >
                  <span className="bead-num">0{idx + 1}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="modal-footer-nav-btn next-btn"
              onClick={() => onSelectLayer(layerKeys[nextIdx])}
              title="Next Layer"
            >
              <div className="btn-text-col text-right">
                <span className="btn-sub">Next</span>
                <span className="btn-title">{EARTH_LAYERS_DATA[layerKeys[nextIdx]].name}</span>
              </div>
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
