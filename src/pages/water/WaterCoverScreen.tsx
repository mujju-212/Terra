import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Droplet,
  Globe,
  ShieldAlert,
  Users2,
  Sprout,
} from 'lucide-react';

interface WaterCoverScreenProps {
  onStart: () => void;
  onScrollToChapter: (index: number) => void;
}

export function WaterCoverScreen({ onStart, onScrollToChapter: _onScrollToChapter }: WaterCoverScreenProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
        <section className="water-cover-section" id="cover">
          {/* Background image & lighting scrims */}
          <div className="water-cover-bg">
            <img
              src="/images/water-cover-pristine-hd.jpg?v=20261002c"
              alt="Water Module Hero - Alpine Lake and Water Droplet"
              className="water-cover-bg-image"
            />
          </div>
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
    </>
  );
}
