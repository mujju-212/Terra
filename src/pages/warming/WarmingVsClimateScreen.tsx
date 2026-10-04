import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  CloudRain,
  Globe,
  Calendar,
  Layers,
  BarChart3,
  TrendingUp,
  Lightbulb,
  Share2,
  Clock,
  Leaf,
  ArrowRight,
  X,
  Info,
  Sparkles,
} from 'lucide-react';
import './WarmingVsClimateScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface DetailModalData {
  title: string;
  theme: 'orange' | 'blue' | 'purple' | 'green';
  eyebrow: string;
  image?: string;
  definition: string;
  mechanisms: string[];
  syllabusNotes: string;
  examTakeaway: string;
}

export function WarmingVsClimateScreen() {
  const [selectedDetail, setSelectedDetail] = useState<DetailModalData | null>(null);
  useModalScrollLock(Boolean(selectedDetail), () => setSelectedDetail(null));

  const openWarmingModal = () => {
    setSelectedDetail({
      title: 'Global Warming',
      theme: 'orange',
      eyebrow: 'THE THERMAL DRIVER · BCV755B SECTION 2.1',
      image: '/images/warming-city-heat.jpg',
      definition:
        "Global warming is the gradual, long-term increase in Earth's average surface temperature caused by human-induced accumulation of greenhouse gases (mainly CO₂, CH₄, and N₂O) in the atmosphere.",
      mechanisms: [
        'Radiative Forcing: Accumulation of heat-trapping gases absorbs terrestrial infrared emissions, creating a net positive planetary energy imbalance (+2.72 W/m²).',
        'Physical Scope: Strictly confined to thermodynamic metrics — global mean surface temperature (GMST), sea surface temperature (SST), and tropospheric air temperatures.',
        'Observed Metric: Global surface temperature has risen by approx 1.1°C to 1.2°C above pre-industrial levels (1850–1900 baseline).',
      ],
      syllabusNotes:
        'In environmental engineering, global warming serves as the primary physical forcing mechanism that powers and accelerates the broader climate system disruptions.',
      examTakeaway:
        'Key Distinction: Global Warming is the root thermal cause; Climate Change is the multifaceted planetary consequence.',
    });
  };

  const openClimateModal = () => {
    setSelectedDetail({
      title: 'Climate Change',
      theme: 'blue',
      eyebrow: 'THE SYSTEMIC PATTERN · BCV755B SECTION 2.1',
      image: '/images/climate-change-composite.jpg',
      definition:
        'Climate change refers to the broad array of multi-decadal shifts in Earth’s climate patterns, including temperature extremes, altered precipitation regimes, sea level rise, glacier retreat, and shifts in ecosystem boundaries.',
      mechanisms: [
        'Hydrological Redistribution: Clausius-Clapeyron scaling causes the atmosphere to hold 7% more moisture per 1°C of warming, leading to simultaneous severe droughts and supercharged precipitation.',
        'Cryospheric & Oceanic Cascades: Melting continental ice sheets, marine heatwaves, and changing thermohaline circulation (AMOC) shift weather belts across entire continents.',
        'Atmospheric Jet Streams: Weakening polar-equatorial temperature gradient causes persistent meandering jet streams, creating stalled heat domes and lingering flood storms.',
      ],
      syllabusNotes:
        'Climate change encompasses both anthropogenic warming consequences and natural cyclic perturbations (Milankovitch cycles, solar irradiance, and volcanic aerosols).',
      examTakeaway:
        'Climate change encompasses far more than warming: it alters precipitation frequency, ocean acidity, cyclone intensity, and sea levels.',
    });
  };

  return (
    <section
      className="vs-climate-screen-container"
      id="ch-05-climate-vs-gw"
      aria-label="Module 05 Chapter 05: Global Warming vs Climate Change"
    >
      <div className="vs-climate-inner-wrap">
        {/* ── TOP HEADER BLOCK (Matches Image 1) ── */}
        <div className="vs-climate-header-block">
          <div className="vs-climate-kicker">MODULE 05 &nbsp;|&nbsp; CHAPTER 05</div>
          <h1 className="vs-climate-main-title">Global Warming vs Climate Change</h1>
          <h2 className="vs-climate-subtitle">Understanding the Difference</h2>
          <p className="vs-climate-lead-text">
            Global warming is the long-term increase in Earth&apos;s average temperature, while climate
            change refers to the broader and long-term changes in climate patterns, including
            temperature, rainfall, extreme weather and more.
          </p>
        </div>

        {/* ── 3-COLUMN MAIN COMPARISON GRID ── */}
        <div className="vs-climate-main-grid">
          {/* ── CARD 1: GLOBAL WARMING (Orange Theme) ── */}
          <motion.div
            className="vs-card theme-warming"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={openWarmingModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openWarmingModal();
              }
            }}
            aria-label="View deep syllabus comparison for Global Warming"
          >
            {/* Header Strip */}
            <div className="vs-card-header">
              <div className="vs-card-header-left">
                <div className="vs-pill-icon pill-warming">
                  <Thermometer size={20} />
                </div>
                <div className="vs-title-wrap">
                  <h3>Global Warming</h3>
                  <p>A rise in Earth&apos;s average temperature</p>
                </div>
              </div>
              <button
                type="button"
                className="vs-card-arrow-btn"
                aria-label="Inspect Global Warming"
                onClick={(e) => {
                  e.stopPropagation();
                  openWarmingModal();
                }}
              >
                &rarr;
              </button>
            </div>

            {/* 16:9 Visual Thumbnail */}
            <div className="vs-card-thumb-wrap">
              <img
                src="/images/warming-city-heat.jpg"
                alt="Global warming heatwave over modern city skyline at blazing sunset"
                className="vs-card-thumb-img"
                loading="lazy"
              />
              <div className="vs-card-thumb-vignette" />
            </div>

            {/* Comparison Attributes Table */}
            <div className="vs-attr-list">
              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Globe size={13} className="vs-attr-icon" />
                  Definition
                </span>
                <p className="vs-attr-value">
                  Long-term increase in Earth&apos;s average surface temperature due to higher
                  greenhouse gas concentrations.
                </p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Thermometer size={13} className="vs-attr-icon" />
                  Scope
                </span>
                <p className="vs-attr-value">Focuses mainly on temperature rise.</p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Calendar size={13} className="vs-attr-icon" />
                  Time Scale
                </span>
                <p className="vs-attr-value">Long-term (decades to centuries).</p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Layers size={13} className="vs-attr-icon" />
                  Main Cause
                </span>
                <p className="vs-attr-value">
                  Increase in greenhouse gases (CO₂, CH₄, N₂O, etc.).
                </p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <BarChart3 size={13} className="vs-attr-icon" />
                  Example
                </span>
                <p className="vs-attr-value">
                  Increase in global average temperature by ~1.1°C since pre-industrial times.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── CENTER VS BADGE & DIVIDER ── */}
          <div className="vs-divider-wrap" aria-hidden="true">
            <span className="vs-vertical-line" />
            <div className="vs-center-badge">VS</div>
            <span className="vs-vertical-line" />
          </div>

          {/* ── CARD 2: CLIMATE CHANGE (Blue Theme) ── */}
          <motion.div
            className="vs-card theme-climate"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            onClick={openClimateModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openClimateModal();
              }
            }}
            aria-label="View deep syllabus comparison for Climate Change"
          >
            {/* Header Strip */}
            <div className="vs-card-header">
              <div className="vs-card-header-left">
                <div className="vs-pill-icon pill-climate">
                  <CloudRain size={20} />
                </div>
                <div className="vs-title-wrap">
                  <h3>Climate Change</h3>
                  <p>Broader and long-term changes in climate patterns</p>
                </div>
              </div>
              <button
                type="button"
                className="vs-card-arrow-btn"
                aria-label="Inspect Climate Change"
                onClick={(e) => {
                  e.stopPropagation();
                  openClimateModal();
                }}
              >
                &rarr;
              </button>
            </div>

            {/* 16:9 Visual Thumbnail */}
            <div className="vs-card-thumb-wrap">
              <img
                src="/images/climate-change-composite.jpg"
                alt="Climate change composite landscape showing drought, stormy skies, and arctic glaciers"
                className="vs-card-thumb-img"
                loading="lazy"
              />
              <div className="vs-card-thumb-vignette" />
            </div>

            {/* Comparison Attributes Table */}
            <div className="vs-attr-list">
              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Globe size={13} className="vs-attr-icon" />
                  Definition
                </span>
                <p className="vs-attr-value">
                  Long-term changes in climate patterns, including temperature, rainfall, extreme
                  weather events and other environmental conditions.
                </p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Layers size={13} className="vs-attr-icon" />
                  Scope
                </span>
                <p className="vs-attr-value">
                  Includes temperature rise as well as changes in rainfall, sea level, wind
                  patterns, extreme events, etc.
                </p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Calendar size={13} className="vs-attr-icon" />
                  Time Scale
                </span>
                <p className="vs-attr-value">Long-term (decades to centuries).</p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <Layers size={13} className="vs-attr-icon" />
                  Main Cause
                </span>
                <p className="vs-attr-value">
                  Same greenhouse gases, along with natural factors and feedback mechanisms.
                </p>
              </div>

              <div className="vs-attr-row">
                <span className="vs-attr-label">
                  <TrendingUp size={13} className="vs-attr-icon" />
                  Example
                </span>
                <p className="vs-attr-value">
                  Changes in rainfall patterns, increased frequency of heatwaves, floods, droughts,
                  melting glaciers, rising sea levels, etc.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: KEY TAKEAWAYS ── */}
          <div className="vs-takeaways-col">
            <div className="vs-takeaways-header">
              <Lightbulb size={20} className="takeaways-bulb-icon" />
              <h3 className="vs-takeaways-title">Key Takeaways</h3>
            </div>

            <div className="vs-takeaways-list">
              {/* Takeaway 1 */}
              <div
                className="takeaway-mini-card theme-orange"
                onClick={openWarmingModal}
              >
                <div className="takeaway-icon-box">
                  <Thermometer size={16} />
                </div>
                <p className="takeaway-text">Global warming is a part of climate change.</p>
              </div>

              {/* Takeaway 2 */}
              <div
                className="takeaway-mini-card theme-purple"
                onClick={openClimateModal}
              >
                <div className="takeaway-icon-box">
                  <Share2 size={16} />
                </div>
                <p className="takeaway-text">
                  Climate change includes many more aspects beyond temperature.
                </p>
              </div>

              {/* Takeaway 3 */}
              <div
                className="takeaway-mini-card theme-green"
                onClick={openWarmingModal}
              >
                <div className="takeaway-icon-box">
                  <Clock size={16} />
                </div>
                <p className="takeaway-text">
                  Both are long-term processes mainly driven by human activities.
                </p>
              </div>

              {/* Takeaway 4 */}
              <div
                className="takeaway-mini-card theme-cyan"
                onClick={openClimateModal}
              >
                <div className="takeaway-icon-box">
                  <Globe size={16} />
                </div>
                <p className="takeaway-text">
                  Understanding the difference helps in addressing the full range of climate impacts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BANNER (QUOTE & SCENIC RIVER STRIP) ── */}
        <div className="vs-bottom-banner">
          {/* Panoramic river backdrop */}
          <div className="vs-bottom-banner-bg">
            <img
              src="/images/nature-river-banner.jpg"
              alt="Misty mountain river in lush green temperate forest"
              loading="lazy"
            />
            <div className="vs-bottom-banner-scrim" />
          </div>

          {/* Left Quote */}
          <div className="vs-bottom-left">
            <div className="vs-bottom-leaf-icon">
              <Leaf size={15} />
            </div>
            <p className="vs-bottom-quote-text">
              &ldquo;Global warming is the symptom. Climate change is the bigger picture.&rdquo;
            </p>
          </div>

          {/* Right Action */}
          <div
            className="vs-bottom-right"
            onClick={openClimateModal}
            role="button"
            tabIndex={0}
          >
            <div className="vs-bottom-future-label">
              <span>Same planet.</span>
              <span>A changing future.</span>
            </div>
            <div className="vs-bottom-arrow-btn">
              &rarr;
            </div>
          </div>
        </div>
      </div>

      {/* ── DETAIL INSPECTION MODAL ── */}
      <AnimatePresence>
        {selectedDetail && (
          <div
            className="vs-modal-backdrop"
            onClick={() => setSelectedDetail(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="vs-modal-card"
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="vs-modal-header">
                <div className="vs-modal-title-wrap">
                  <h3>{selectedDetail.title}</h3>
                  <p>{selectedDetail.eyebrow}</p>
                </div>
                <button
                  type="button"
                  className="vs-modal-close-btn"
                  onClick={() => setSelectedDetail(null)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Hero Image */}
              {selectedDetail.image && (
                <div className="vs-modal-hero-visual">
                  <img src={selectedDetail.image} alt={selectedDetail.title} />
                </div>
              )}

              {/* Definition */}
              <div className="vs-modal-section">
                <h4>Core Scientific Definition</h4>
                <p>{selectedDetail.definition}</p>
              </div>

              {/* Physical Mechanisms */}
              <div className="vs-modal-section">
                <h4>Physical Drivers &amp; Planetary Mechanisms</h4>
                <ul className="space-y-2 mt-2 text-xs text-slate-200">
                  {selectedDetail.mechanisms.map((mech, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Syllabus Context */}
              <div className="vs-modal-section">
                <h4>VTU BCV755B Syllabus Context</h4>
                <p>{selectedDetail.syllabusNotes}</p>
              </div>

              {/* Exam Takeaway */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-4 text-xs text-amber-200">
                <strong>University Exam Takeaway:</strong> {selectedDetail.examTakeaway}
              </div>

              <button
                type="button"
                className="vs-modal-dismiss-btn"
                onClick={() => setSelectedDetail(null)}
              >
                Close Inspection
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default WarmingVsClimateScreen;
