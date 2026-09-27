import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplet,
  Waves,
  RefreshCw,
  CloudRain,
  X,
  ArrowRight,
  Check,
  MapPin,
  Sparkles,
  CircleDot,
  Building2,
  Globe,
  Layers,
  Factory,
  Target,
  Home,
  Database,
  Droplets,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { sourcesData, type Submethod } from './waterData';
import { useModalScrollLock } from './useModalScrollLock';

interface WaterSourcesScreenProps {
  onNext?: () => void;
}

export function WaterSourcesScreen({ onNext }: WaterSourcesScreenProps = {}) {
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  const [activeSubmethodModal, setActiveSubmethodModal] = useState<Submethod | null>(null);

  useModalScrollLock(Boolean(activeSubmethodModal), () => setActiveSubmethodModal(null));

  return (
    <>
        <section className="water-sources-chapter-section" id="ch-02" data-chapter="03">
          {/* Background landscape canvas */}
          <div className="water-sources-canvas-bg" />
          <div className="water-sources-scrim-left" />
          <div className="water-sources-scrim-top" />
          <div className="water-sources-scrim-bottom" />

          {/* Top Left Header */}
          <div className="water-sources-header">
            <p className="water-sources-eyebrow">CHAPTER 02</p>
            <h2 className="water-sources-title">
              Sources<br />
              <span className="title-accent">of Water</span>
            </h2>
            <p className="water-sources-desc">
              Water is available from four main sources, each with different methods of collection and use.
            </p>
          </div>

          {/* Top Right Quote */}
          <div className="water-sources-quote-card">
            <span className="water-cycle-quote-mark">“</span>
            <span>Multiple sources of water ensure a sustainable and resilient water supply.</span>
          </div>

          {/* 4 Interactive Hotspot Pins over the Landscape */}
          <div className="water-source-hotspots-layer" role="group" aria-label="Sources of water hotspots">
            {sourcesData.map((source, idx) => {
              const isSel = selectedSourceIndex === idx;
              return (
                <button
                  key={source.id}
                  type="button"
                  className={`water-source-hotspot-pin ${isSel ? 'is-active' : ''}`}
                  style={{ left: source.pinX, top: source.pinY }}
                  onClick={() => setSelectedSourceIndex(idx)}
                  aria-pressed={isSel}
                  aria-label={`Source ${source.num}: ${source.title}`}
                >
                  <span className="water-source-hotspot-num">{source.num}</span>
                  <span>{source.title}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom 4 Source Cards */}
          <div className="water-sources-grid">
            {sourcesData.map((source, idx) => {
              const isSel = selectedSourceIndex === idx;
              const Icon = source.icon;
              return (
                <div
                  key={source.id}
                  className={`water-source-card ${isSel ? 'is-active' : ''}`}
                  onClick={() => setSelectedSourceIndex(idx)}
                >
                  <div className="water-source-card-header">
                    <div className="water-source-badge-row">
                      <span className="water-source-num-badge">{source.num}</span>
                      <div className="water-source-icon-badge">
                        <Icon size={18} />
                      </div>
                    </div>
                    <h3 className="water-source-card-title">{source.title}</h3>
                    <p className="water-source-card-desc">{source.desc}</p>
                  </div>

                  <div className="water-submethods-list">
                    {source.submethods.map((subm) => {
                      const SubIcon = subm.icon;
                      return (
                        <button
                          key={subm.name}
                          type="button"
                          className="water-submethod-row"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSourceIndex(idx);
                            setActiveSubmethodModal(subm);
                          }}
                          title={`Explore ${subm.name}`}
                        >
                          <div className="water-submethod-left">
                            <SubIcon size={16} className="water-submethod-icon" />
                            <div className="water-submethod-texts">
                              <span className="water-submethod-title">{subm.name}</span>
                              <span className="water-submethod-sub">{subm.sub}</span>
                            </div>
                          </div>
                          <ChevronRight size={14} className="water-submethod-arrow" />
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className="water-source-thumb"
                    style={{ backgroundImage: `url(${source.thumb})` }}
                    role="img"
                    aria-label={`${source.title} landscape reference`}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom Sustainability Banner */}
          <div className="water-sources-banner">
            <Lightbulb size={16} className="water-banner-icon" />
            <span>Together, these four sources help meet the growing demand for water while ensuring long-term sustainability.</span>
            <button
              type="button"
              className="water-banner-btn"
              onClick={() => onNext?.()}
              aria-label="Proceed to Chapter 03 Global Water Resources"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </section>



      {/* ─── SUBMETHOD SYLLABUS DETAIL MODAL ─── */}
      <AnimatePresence>
        {/* ─── SUBMETHOD SYLLABUS DETAIL MODAL ─── */}
        {activeSubmethodModal && (
          <motion.div
            className="water-modal-backdrop"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSubmethodModal(null)}
          >
            <motion.div
              className="water-modal-card"
              data-lenis-prevent
              style={{ maxWidth: 560 }}
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-modal-header">
                <div>
                  <span className="water-modal-badge">COLLECTION &amp; MANAGEMENT METHOD</span>
                  <h3>{activeSubmethodModal.name}</h3>
                </div>
                <button
                  type="button"
                  className="water-modal-close"
                  onClick={() => setActiveSubmethodModal(null)}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-modal-body" data-lenis-prevent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="water-source-icon-badge" style={{ width: 44, height: 44 }}>
                    {(() => {
                      const SubIcon = activeSubmethodModal.icon;
                      return <SubIcon size={22} />;
                    })()}
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff', fontSize: '1.05rem', display: 'block' }}>
                      {activeSubmethodModal.name}
                    </strong>
                    <span style={{ color: 'rgba(215, 238, 248, 0.75)', fontSize: '0.85rem' }}>
                      {activeSubmethodModal.sub}
                    </span>
                  </div>
                </div>

                <div className="water-modal-beat-card" style={{ marginTop: 8 }}>
                  <span className="water-modal-beat-num">TECHNICAL SPECIFICATION &amp; PROCESS</span>
                  <p className="water-modal-beat-desc" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {activeSubmethodModal.detail}
                  </p>
                </div>
              </div>

              <div className="water-modal-footer">
                <span style={{ fontSize: '0.78rem', color: 'rgba(215, 238, 248, 0.65)' }}>
                  HKBK Civil Engineering · Course BCV755B
                </span>
                <button
                  type="button"
                  className="water-btn-start"
                  onClick={() => setActiveSubmethodModal(null)}
                >
                  <span>Understood</span>
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
