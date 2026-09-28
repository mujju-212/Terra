import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  PieChart,
  Sprout,
  Factory,
  Home,
  ArrowRight,
  TrendingUp,
  X,
  Check,
  Droplet,
  Info,
  Layers,
  Heart,
  Settings,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { waterSectorsData, type WaterSector } from './waterData';
import { useModalScrollLock } from './useModalScrollLock';

export function WaterUsesScreen() {
  const [activeSectorModal, setActiveSectorModal] = useState<WaterSector | null>(null);
  const [hoveredDonutSector, setHoveredDonutSector] = useState<string | null>(null);
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  useModalScrollLock(Boolean(activeSectorModal), () => setActiveSectorModal(null));

  return (
    <>
        <section className="water-uses-chapter-section" id="ch-05" data-chapter="06">
          {/* Background Map & Scrims */}
          <div className="water-uses-canvas-bg" />
          <div className="water-uses-scrim-left" />
          <div className="water-uses-scrim-top" />
          <div className="water-uses-scrim-bottom" />

          {/* Top Row: Header (Left) and Quote (Right) */}
          <div className="water-uses-top-row">
            <div className="water-uses-header">
              <p className="water-uses-eyebrow">CHAPTER 05</p>
              <h2 className="water-uses-title">
                Uses of <span className="title-accent">Water</span>
              </h2>
              <p className="water-uses-desc">
                Water is essential for human survival and plays a vital role in agriculture, industry, domestic life and recreation. These uses are interconnected and shape our economies, societies and ecosystems.
              </p>
            </div>

            <div className="water-uses-quote-card">
              <span className="water-uses-quote-mark">“</span>
              <p className="water-uses-quote-text">
                Water sustains our food, economy, health and happiness — making it indispensable for life.
              </p>
            </div>
          </div>

          {/* 4 Grand Interactive Sector Cards Grid */}
          <div className="water-sectors-grid" role="group" aria-label="Four primary sectors of water use">
            {waterSectorsData.map((sector) => {
              const Icon = sector.icon;
              const isSelected = selectedSectorId === sector.id;
              const isDonutHovered = hoveredDonutSector === sector.id;

              return (
                <div
                  key={sector.id}
                  className={`water-sector-card ${isSelected || isDonutHovered ? 'is-active-sector' : ''}`}
                  style={
                    {
                      '--sector-color': sector.color,
                      '--sector-border': sector.borderColor,
                      '--sector-glow': sector.glowColor,
                    } as React.CSSProperties
                  }
                  onClick={() => {
                    setSelectedSectorId(sector.id);
                    setActiveSectorModal(sector);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedSectorId(sector.id);
                      setActiveSectorModal(sector);
                    }
                  }}
                  onMouseEnter={() => setHoveredDonutSector(sector.id)}
                  onMouseLeave={() => setHoveredDonutSector(null)}
                >
                  <div className="water-sector-head-row">
                    <div className="water-sector-title-group">
                      <span className="water-sector-num-badge">{sector.num}</span>
                      <div className="water-sector-icon-wrap" aria-hidden="true">
                        <Icon size={18} />
                      </div>
                      <h3 className="water-sector-name">{sector.title}</h3>
                    </div>

                    <div className="water-sector-pct-box">
                      <div className="water-sector-pct-circle">{sector.pctLabel}</div>
                      <span className="water-sector-pct-label">
                        <span>of total</span>
                        <span>freshwater use</span>
                      </span>
                    </div>
                  </div>

                  <p className="water-sector-card-desc">{sector.desc}</p>

                  <div className="water-sector-photo-frame">
                    <img
                      src={sector.image}
                      alt={`${sector.title} illustrative photography`}
                      className="water-sector-photo-img"
                    />
                    <div className="water-sector-photo-overlay" />
                    <span className="water-sector-click-hint">
                      <span>Explore {sector.title}</span>
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Deck: 3 Cards (Donut Distribution, Why It Matters, Key Challenges) */}
          <div className="water-uses-bottom-deck">
            {/* Card 1: Global Freshwater Use Distribution */}
            <div className="water-uses-bottom-card">
              <h3 className="water-uses-card-title">Global Freshwater Use Distribution</h3>
              <div className="water-donut-layout">
                {/* SVG Donut */}
                <div className="water-donut-frame">
                  <svg className="water-donut-svg" viewBox="0 0 100 100" aria-label="Global Freshwater Use Donut Chart">
                    {/* Background track circle */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="16" />

                    {/* Agriculture (70%): length 156.8, offset 0 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#22c55e"
                      strokeDasharray="156.8 226.195"
                      strokeDashoffset="0"
                      className={`donut-segment ${hoveredDonutSector === 'agriculture' ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoveredDonutSector('agriculture')}
                      onMouseLeave={() => setHoveredDonutSector(null)}
                      onClick={() => setActiveSectorModal(waterSectorsData[0])}
                    />

                    {/* Industry (20%): length 43.7, offset -158.336 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#f59e0b"
                      strokeDasharray="43.7 226.195"
                      strokeDashoffset="-158.336"
                      className={`donut-segment ${hoveredDonutSector === 'industry' ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoveredDonutSector('industry')}
                      onMouseLeave={() => setHoveredDonutSector(null)}
                      onClick={() => setActiveSectorModal(waterSectorsData[1])}
                    />

                    {/* Domestic (8%): length 16.6, offset -203.575 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#0ea5e9"
                      strokeDasharray="16.6 226.195"
                      strokeDashoffset="-203.575"
                      className={`donut-segment ${hoveredDonutSector === 'domestic' ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoveredDonutSector('domestic')}
                      onMouseLeave={() => setHoveredDonutSector(null)}
                      onClick={() => setActiveSectorModal(waterSectorsData[2])}
                    />

                    {/* Recreation (2%): length 3.5, offset -221.671 */}
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#a855f7"
                      strokeDasharray="3.5 226.195"
                      strokeDashoffset="-221.671"
                      className={`donut-segment ${hoveredDonutSector === 'recreation' ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoveredDonutSector('recreation')}
                      onMouseLeave={() => setHoveredDonutSector(null)}
                      onClick={() => setActiveSectorModal(waterSectorsData[3])}
                    />
                  </svg>

                  <div className="water-donut-center">
                    <span
                      className="water-donut-center-val"
                      style={{
                        color: hoveredDonutSector
                          ? waterSectorsData.find((s) => s.id === hoveredDonutSector)?.color
                          : '#ffffff',
                      }}
                    >
                      {hoveredDonutSector
                        ? waterSectorsData.find((s) => s.id === hoveredDonutSector)?.pctLabel
                        : '100%'}
                    </span>
                  </div>
                </div>

                {/* Legend Rows */}
                <div className="water-donut-legend">
                  {waterSectorsData.map((s) => {
                    const isHovered = hoveredDonutSector === s.id;
                    return (
                      <div
                        key={s.id}
                        className={`water-donut-legend-item ${isHovered ? 'is-active' : ''}`}
                        onMouseEnter={() => setHoveredDonutSector(s.id)}
                        onMouseLeave={() => setHoveredDonutSector(null)}
                        onClick={() => {
                          setSelectedSectorId(s.id);
                          setActiveSectorModal(s);
                        }}
                      >
                        <div className="water-legend-left">
                          <span
                            className="water-legend-dot"
                            style={{
                              background: s.color,
                              boxShadow: isHovered ? `0 0 8px ${s.color}` : 'none',
                            }}
                          />
                          <span className="water-legend-name">{s.title}</span>
                        </div>
                        <span className="water-legend-pct" style={{ color: isHovered ? s.color : '#ffffff' }}>
                          {s.pctLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Card 2: Why It Matters */}
            <div className="water-uses-bottom-card">
              <h3 className="water-uses-card-title">Why It Matters</h3>
              <div className="water-matters-row">
                <div className="water-matter-col">
                  <div className="water-matter-icon-disc">
                    <Sprout size={16} />
                  </div>
                  <h4 className="water-matter-title">Food Security</h4>
                  <p className="water-matter-desc">Supports crop production and livelihoods.</p>
                </div>

                <div className="water-matter-col">
                  <div className="water-matter-icon-disc">
                    <TrendingUp size={16} />
                  </div>
                  <h4 className="water-matter-title">Economic Growth</h4>
                  <p className="water-matter-desc">Enables industrial development and energy production.</p>
                </div>

                <div className="water-matter-col">
                  <div className="water-matter-icon-disc">
                    <Heart size={16} />
                  </div>
                  <h4 className="water-matter-title">Healthy Communities</h4>
                  <p className="water-matter-desc">Provides clean water for drinking, sanitation and public health.</p>
                </div>
              </div>
            </div>

            {/* Card 3: Key Challenges */}
            <div className="water-uses-bottom-card">
              <h3 className="water-uses-card-title">Key Challenges</h3>
              <div className="water-challenges-list">
                <div className="water-challenge-item">
                  <Droplet size={15} color="#38bdf8" className="water-challenge-icon" />
                  <span>Increasing demand across all sectors</span>
                </div>

                <div className="water-challenge-item">
                  <Settings size={15} color="#67e8f9" className="water-challenge-icon" />
                  <span>Competition between different uses</span>
                </div>

                <div className="water-challenge-item">
                  <AlertTriangle size={15} color="#f87171" className="water-challenge-icon" />
                  <span>Overuse leading to water stress</span>
                </div>

                <div className="water-challenge-item">
                  <Sprout size={15} color="#4ade80" className="water-challenge-icon" />
                  <span>Need for sustainable and efficient use</span>
                </div>
              </div>
            </div>
          </div>
        </section>



      {/* ─── CHAPTER 05 SECTOR DETAILED MODAL ─── */}
      <AnimatePresence>
        {/* ─── CHAPTER 05 SECTOR DETAILED MODAL ─── */}
        {activeSectorModal && (
          <motion.div
            className="water-modal-backdrop"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSectorModal(null)}
          >
            <motion.div
              className="water-sector-modal-card"
              data-lenis-prevent
              style={
                {
                  '--modal-border': activeSectorModal.borderColor,
                  '--modal-glow': activeSectorModal.glowColor,
                } as React.CSSProperties
              }
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Banner with Gradient Overlay */}
              <div
                className="water-sector-modal-banner"
                style={{ backgroundImage: `url(${activeSectorModal.image})` }}
              >
                <div className="water-sector-modal-banner-scrim" />
                <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
                  <button
                    type="button"
                    className="water-modal-close"
                    onClick={() => setActiveSectorModal(null)}
                    aria-label="Close dialog"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 24, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="water-sector-num-badge" style={{ width: 28, height: 28, borderColor: activeSectorModal.color, fontSize: '0.82rem' }}>
                    {activeSectorModal.num}
                  </span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#ffffff', fontWeight: 700 }}>
                      {activeSectorModal.title}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: activeSectorModal.color, fontWeight: 600 }}>
                      {activeSectorModal.category} · {activeSectorModal.pctLabel} of Freshwater
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="water-sector-modal-content" data-lenis-prevent>
                <p style={{ color: 'rgba(215, 238, 248, 0.9)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                  {activeSectorModal.desc}
                </p>

                {/* 3 Metric Stat Boxes */}
                <div className="water-modal-stats-strip">
                  {activeSectorModal.keyStats.map((st) => (
                    <div key={st.label} className="water-modal-stat-box">
                      <span className="water-modal-stat-label">{st.label}</span>
                      <strong className="water-modal-stat-val" style={{ color: activeSectorModal.color }}>
                        {st.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Syllabus Points from Notes Part 5 */}
                <div className="water-modal-beat-card" style={{ marginTop: 2 }}>
                  <span className="water-modal-beat-num">SYLLABUS COVERAGE · BCV755B</span>
                  <ul style={{ margin: '8px 0 0 0', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {activeSectorModal.syllabusPoints.map((pt, pIdx) => (
                      <li key={pIdx} style={{ fontSize: '0.85rem', color: 'rgba(215, 238, 248, 0.88)', lineHeight: 1.5 }}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Water Rights Framework Callout */}
                <div style={{ background: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(14, 165, 233, 0.25)', borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Info size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'rgba(220, 242, 252, 0.88)', lineHeight: 1.4 }}>
                    <strong>Framework for Water Allocation:</strong> The legal framework for allocating water resources to these four user sectors is officially governed through <em>Water Rights</em>.
                  </span>
                </div>
              </div>

              {/* Modal Footer with Carousel Navigation */}
              <div className="water-modal-footer">
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="water-stepper-arrow-btn"
                    onClick={() => {
                      const currIdx = waterSectorsData.findIndex((s) => s.id === activeSectorModal.id);
                      const prevIdx = (currIdx - 1 + waterSectorsData.length) % waterSectorsData.length;
                      setActiveSectorModal(waterSectorsData[prevIdx]);
                    }}
                    title="Previous sector"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="water-stepper-arrow-btn"
                    onClick={() => {
                      const currIdx = waterSectorsData.findIndex((s) => s.id === activeSectorModal.id);
                      const nextIdx = (currIdx + 1) % waterSectorsData.length;
                      setActiveSectorModal(waterSectorsData[nextIdx]);
                    }}
                    title="Next sector"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  className="water-btn-start"
                  onClick={() => setActiveSectorModal(null)}
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
