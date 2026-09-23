import React from 'react';
import { Mountain, Trees, Play, ArrowRight } from 'lucide-react';
import { TiltCard, Magnetic, CountUp } from './motion';

interface LandCoverScreenProps {
  onStart: () => void;
  onScrollToChapter: (index: number) => void;
}

export default function LandCoverScreen({ onStart, onScrollToChapter }: LandCoverScreenProps) {
  const activate = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); }
  };
  return (
<section className="land-screen land-cover-screen" id="cover">
          <div
            className="screen-backdrop-hero"
            style={{ backgroundImage: `url('/images/land-cover-hero-alpine.jpg')` }}
          >
            <div className="screen-backdrop-vignette" />
          </div>

          <div className="land-screen-inner">
            {/* Top Row Title & Narrative */}
            <div className="cover-narrative-block">
              <span className="cover-mod-overline">MODULE 01</span>
              <h1 className="cover-grand-title">
                LAND
                <span className="cover-title-sub">
                  The ground beneath <em>everything.</em>
                </span>
              </h1>
              <p className="cover-lead-desc">
                Soils, forests, mountains and minerals form the foundation of life — shaping
                ecosystems, economies and our future.
              </p>

              {/* 3 Metric Stats */}
              <div className="cover-metrics-row">
                <div className="cover-metric-item">
                  <strong><CountUp to={20} suffix="%" /></strong>
                  <span>OF EARTH'S SURFACE</span>
                </div>
                <div className="cover-metric-divider" />
                <div className="cover-metric-item">
                  <strong><CountUp to={4.6} decimals={1} suffix=" BILLION" /></strong>
                  <span>YEARS AGO<br />EARTH FORMED</span>
                </div>
                <div className="cover-metric-divider" />
                <div className="cover-metric-item">
                  <strong><CountUp to={4} suffix=" LAYERS" /></strong>
                  <span>CRUST · MANTLE<br />OUTER CORE · INNER CORE</span>
                </div>
              </div>

              {/* Start Module CTA Button */}
              <Magnetic className="cover-cta-mag">
              <button
                type="button"
                className="cover-start-cta"
                onClick={onStart}
              >
                <span className="cta-play-bead">
                  <Play size={12} fill="#f1cb74" color="#f1cb74" style={{ marginLeft: '1px' }} />
                </span>
                <span className="cta-label">Start Module 01</span>
                <ArrowRight size={15} strokeWidth={2.4} />
              </button>
              </Magnetic>
            </div>

            {/* Handwritten Script Accent (Right side) */}
            <div className="cover-script-accent" aria-hidden="true">
              <span className="script-line-1">Land</span>
              <span className="script-line-2">Supports Life</span>
              <svg className="script-underline-svg" viewBox="0 0 160 14" fill="none">
                <path d="M4 9 C 40 3, 100 4, 156 10" stroke="rgba(245, 220, 140, 0.85)" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>

            {/* Bottom 4 Feature Cards Strip */}
            <div className="cover-bottom-strip">
              <TiltCard
                className="cover-preview-card"
                onClick={onStart}
                onKeyDown={activate(onStart)}
                role="button"
                tabIndex={0}
              >
                <div className="card-preview-copy">
                  <div className="preview-top-icon">
                    <Mountain size={14} strokeWidth={1.8} />
                  </div>
                  <h4>Explore Earth's Formation</h4>
                  <p>How our planet and its crust took shape</p>
                </div>
                <div className="card-thumb-wrap">
                  <img src="/images/hero-clean-earth.jpg" alt="Earth's Formation" className="card-thumb-img kenburns-img" />
                </div>
              </TiltCard>

              <TiltCard
                className="cover-preview-card"
                onClick={() => onScrollToChapter(6)}
                onKeyDown={activate(() => onScrollToChapter(6))}
                role="button"
                tabIndex={0}
              >
                <div className="card-preview-copy">
                  <div className="preview-top-icon">
                    <Trees size={14} strokeWidth={1.8} />
                  </div>
                  <h4>Discover Land Forms</h4>
                  <p>Forests, grasslands, deserts, wetlands and more</p>
                </div>
                <div className="card-thumb-wrap">
                  <img src="/images/card-land.jpg" alt="Land Forms" className="card-thumb-img kenburns-img" />
                </div>
              </TiltCard>

              <TiltCard
                className="cover-preview-card"
                onClick={() => onScrollToChapter(8)}
                onKeyDown={activate(() => onScrollToChapter(8))}
                role="button"
                tabIndex={0}
              >
                <div className="card-preview-copy">
                  <div className="preview-top-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                      <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
                    </svg>
                  </div>
                  <h4>Understand Challenges</h4>
                  <p>Deforestation, land-use change and degradation</p>
                </div>
                <div className="card-thumb-wrap">
                  <img src="/images/land-degraded-drought.jpg" alt="Challenges" className="card-thumb-img kenburns-img" />
                </div>
              </TiltCard>

              <TiltCard
                className="cover-preview-card"
                onClick={() => onScrollToChapter(12)}
                onKeyDown={activate(() => onScrollToChapter(12))}
                role="button"
                tabIndex={0}
              >
                <div className="card-preview-copy">
                  <div className="preview-top-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 20h10"/>
                      <path d="M10 20c5.5-2.5.8-6.4 3-10"/>
                      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
                      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
                    </svg>
                  </div>
                  <h4>Learn Solutions</h4>
                  <p>Conservation and sustainable land-use planning</p>
                </div>
                <div className="card-thumb-wrap">
                  <img src="/images/how-works-seedling.jpg" alt="Solutions" className="card-thumb-img kenburns-img" />
                </div>
              </TiltCard>
            </div>

            {/* Scroll Indicator */}
            <div className="cover-scroll-indicator" onClick={onStart} onKeyDown={activate(onStart)} role="button" tabIndex={0}>
              <span className="mouse-icon">
                <span className="mouse-wheel" />
              </span>
              <span className="scroll-cue-text">SCROLL TO EXPLORE</span>
              <span className="scroll-cue-arrow">↓</span>
            </div>
          </div>
        </section>
  );
}
