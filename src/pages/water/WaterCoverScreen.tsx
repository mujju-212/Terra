import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Play,
  ArrowRight,
  Sparkles,
  Droplets,
  Droplet,
  Globe,
  Waves,
  X,
  ShieldAlert,
  Users2,
  Sprout,
} from 'lucide-react';
import { useModalScrollLock } from './useModalScrollLock';

interface WaterCoverScreenProps {
  onStart: () => void;
  onScrollToChapter: (index: number) => void;
}

export function WaterCoverScreen({ onStart, onScrollToChapter: _onScrollToChapter }: WaterCoverScreenProps) {
  const reducedMotion = useReducedMotion();
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  useModalScrollLock(showOverviewModal, () => setShowOverviewModal(false));

  return (
    <>
        <section className="water-cover-section" id="cover">
          {/* Background image & lighting scrims */}
          <div className="water-cover-bg" />
          <div className="water-cover-scrim-top" />
          <div className="water-cover-scrim-bottom" />
          <div className="water-cover-scrim-left" />

          {/* Animated concentric ripples around the center-right lake area */}
          <div className="water-ripple-aura" aria-hidden="true">
            <div className="water-ripple-ring" />
            <div className="water-ripple-ring" />
            <div className="water-ripple-ring" />
          </div>

          {/* Top Right Callout */}
          <div className="water-top-callout">
            <span className="water-callout-line" />
            <span>Water connects every part of life on Earth.</span>
          </div>

          {/* Right Side Glass Card: "A Precious Resource" */}
          <motion.div
            className="water-precious-card"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="water-precious-title">A Precious Resource</span>

            <div className="water-precious-row">
              <div className="water-precious-icon-pill" aria-hidden="true">
                <Globe size={20} />
              </div>
              <div className="water-precious-data">
                <span className="water-precious-val">97.5%</span>
                <span className="water-precious-label">Saltwater (Oceans)</span>
              </div>
            </div>

            <div className="water-precious-row">
              <div className="water-precious-icon-pill" aria-hidden="true">
                <Droplet size={20} />
              </div>
              <div className="water-precious-data">
                <span className="water-precious-val">2.5%</span>
                <span className="water-precious-label">Freshwater</span>
              </div>
            </div>

            <div className="water-precious-row">
              <div className="water-precious-icon-pill" aria-hidden="true">
                <Sprout size={20} />
              </div>
              <div className="water-precious-data">
                <span className="water-precious-val">~1%</span>
                <span className="water-precious-label">Easily Accessible Surface Freshwater</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Content (Left) */}
          <motion.div
            className="water-hero-main"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="water-hero-eyebrow">MODULE 02</p>
            <h1 className="water-hero-title">WATER</h1>
            <p className="water-hero-subtitle">The cradle of life.</p>
            <div className="water-hero-meta">
              <span>BCV755B</span>
              <span>|</span>
              <span>Conservation of Natural Resources</span>
            </div>
            <p className="water-hero-quote">
              “Follow a single drop — from cloud to river to aquifer and back. See why only a sliver of Earth's water is
              ours to drink, and what it takes to keep it.”
            </p>

            <div className="water-hero-actions">
              <button
                type="button"
                className="water-btn-start"
                onClick={onStart}
              >
                <span>Start the Journey</span>
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="water-btn-watch"
                onClick={() => setShowOverviewModal(true)}
              >
                <span className="water-play-disc">
                  <Play size={13} fill="currentColor" />
                </span>
                <div className="water-watch-text">
                  <span>Watch</span>
                  <span className="water-watch-sub">2-min Overview</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Bottom Dock with 4 Feature Cards + Scroll Indicator */}
          <div className="water-bottom-dock">
            <div className="water-cards-grid">
              <div className="water-card">
                <div className="water-card-icon-pill">
                  <Droplet size={18} />
                </div>
                <strong className="water-card-title">Sustains Life</strong>
                <p className="water-card-desc">Water is essential for all living beings on Earth.</p>
              </div>

              <div className="water-card">
                <div className="water-card-icon-pill">
                  <Users2 size={18} />
                </div>
                <strong className="water-card-title">Supports Economies</strong>
                <p className="water-card-desc">Drives agriculture, industry and livelihoods.</p>
              </div>

              <div className="water-card">
                <div className="water-card-icon-pill">
                  <Sprout size={18} />
                </div>
                <strong className="water-card-title">Shapes Ecosystems</strong>
                <p className="water-card-desc">Maintains rivers, lakes, wetlands and biodiversity.</p>
              </div>

              <div className="water-card">
                <div className="water-card-icon-pill">
                  <ShieldAlert size={18} />
                </div>
                <strong className="water-card-title">Needs Conservation</strong>
                <p className="water-card-desc">A finite resource that must be protected for future generations.</p>
              </div>
            </div>

            <button
              type="button"
              className="water-scroll-cue"
              onClick={onStart}
            >
              <div className="water-mouse-icon">
                <div className="water-mouse-dot" />
              </div>
              <span>Scroll to Dive In ↓</span>
            </button>
          </div>
        </section>



      {/* ─── 2-MINUTE OVERVIEW MODAL ─── */}
      <AnimatePresence>
        {showOverviewModal && (
          <motion.div
            className="water-modal-backdrop"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOverviewModal(false)}
          >
            <motion.div
              className="water-modal-card"
              data-lenis-prevent
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="water-modal-header">
                <div>
                  <span className="water-modal-badge">Module 02 · Fast Track</span>
                  <h3>Water: The Cradle of Life in 2 Minutes</h3>
                </div>
                <button
                  type="button"
                  className="water-modal-close"
                  onClick={() => setShowOverviewModal(false)}
                  aria-label="Close overview modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="water-modal-body" data-lenis-prevent>
                <p style={{ color: 'rgba(215, 238, 248, 0.85)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                  Water is our planet's most vital resource, circulating through continuous hydrological loops. While
                  covering over 70% of Earth, only a tiny sliver is accessible to sustain billions of people and fragile
                  ecosystems.
                </p>

                <div className="water-modal-grid">
                  <div className="water-modal-beat-card">
                    <span className="water-modal-beat-num">01 · GLOBAL SPLIT</span>
                    <strong className="water-modal-beat-title">97.5% Salt vs 2.5% Fresh</strong>
                    <p className="water-modal-beat-desc">
                      79% of freshwater is locked in ice caps and glaciers, 20% lies underground, and barely 1% is
                      available in surface lakes, rivers, and soil moisture.
                    </p>
                  </div>

                  <div className="water-modal-beat-card">
                    <span className="water-modal-beat-num">02 · INDIA'S WATER STRESS</span>
                    <strong className="water-modal-beat-title">1/6th Population · 1/25th Water</strong>
                    <p className="water-modal-beat-desc">
                      With per capita availability at ~1,600 m³/year, India operates under national water stress, heavily
                      reliant on monsoon seasons across 6 major river basin networks.
                    </p>
                  </div>

                  <div className="water-modal-beat-card">
                    <span className="water-modal-beat-num">03 · INTER-BASIN TRANSFER</span>
                    <strong className="water-modal-beat-title">NWDA Interlinking Proposals</strong>
                    <p className="water-modal-beat-desc">
                      14 Himalayan links and 16 Peninsular links propose transferring surplus flows to deficit regions,
                      balancing flood moderation with ecological and social trade-offs.
                    </p>
                  </div>

                  <div className="water-modal-beat-card">
                    <span className="water-modal-beat-num">04 · AQUIFERS & SOLUTIONS</span>
                    <strong className="water-modal-beat-title">Conjunctive Use & Recharge</strong>
                    <p className="water-modal-beat-desc">
                      Reversing alarming water-table depletion requires artificial percolation tanks, check dams,
                      conjunctive surface-groundwater planning, and coastal salt-wedge barriers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="water-modal-footer">
                <span style={{ fontSize: '0.8rem', color: 'rgba(215, 238, 248, 0.65)' }}>
                  Based on course syllabus BCV755B · HKBK Civil Engineering
                </span>
                <button
                  type="button"
                  className="water-btn-start"
                  onClick={() => {
                    setShowOverviewModal(false);
                    onStart();
                  }}
                >
                  <span>Start Complete Study</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
}
