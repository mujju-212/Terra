import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory,
  Flame,
  Leaf,
  Users,
  Trees,
  Building2,
  Info,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import './WarmingCausesScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface CauseCardData {
  id: string;
  theme: 'co2' | 'ch4' | 'n2o' | 'deforest' | 'other';
  primaryTitle: string;
  secondaryTitle?: string;
  stat?: string;
  statYear?: string;
  image: string;
  description: string;
  highlightText?: string;
  contributionPct: number;
}

const causeCards: CauseCardData[] = [
  {
    id: 'co2',
    theme: 'co2',
    primaryTitle: 'CO₂',
    secondaryTitle: 'Carbon Dioxide',
    stat: '420 ppm',
    statYear: '(in 2023)',
    image: '/images/warming-cause-co2.jpg',
    highlightText: 'Released by',
    description: 'burning fossil fuels (coal, oil, gas), industry, cement production and land use changes.',
    contributionPct: 76,
  },
  {
    id: 'ch4',
    theme: 'ch4',
    primaryTitle: 'CH₄',
    secondaryTitle: 'Methane',
    stat: '1.9 ppm',
    statYear: '(in 2023)',
    image: '/images/warming-cause-ch4.jpg',
    description: 'Released from livestock, landfills, rice fields, natural gas systems and wetlands.',
    contributionPct: 16,
  },
  {
    id: 'n2o',
    theme: 'n2o',
    primaryTitle: 'N₂O',
    secondaryTitle: 'Nitrous Oxide',
    stat: '0.34 ppm',
    statYear: '(in 2023)',
    image: '/images/warming-cause-n2o.jpg',
    description: 'Released from agricultural fertilizers, industrial processes and biomass burning.',
    contributionPct: 6,
  },
  {
    id: 'deforest',
    theme: 'deforest',
    primaryTitle: 'Deforestation',
    image: '/images/warming-cause-deforest.jpg',
    description: 'Reduces the number of trees that absorb CO₂ and also releases stored carbon when forests are cut or burned.',
    contributionPct: 10,
  },
  {
    id: 'other',
    theme: 'other',
    primaryTitle: 'Other Human Activities',
    image: '/images/warming-cause-other.jpg',
    description: 'Includes industrial processes, transportation, urbanization, waste management and changes in land use.',
    contributionPct: 2,
  },
];

export function WarmingCausesScreen() {
  const [activeTab, setActiveTab] = useState<'main' | 'comparison' | 'contribution'>('main');
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);
  const [showContribInfo, setShowContribInfo] = useState(false);
  const [showCausesInfo, setShowCausesInfo] = useState(false);

  useModalScrollLock(Boolean(showContribInfo || showCausesInfo), () => {
    setShowContribInfo(false);
    setShowCausesInfo(false);
  });

  return (
    <section
      className="causes-screen-container"
      id="ch-03-causes"
      aria-label="Chapter 03: Causes of Global Warming — Human Activities and Natural Factors"
    >
      {/* ── Background Layer with Image 2 ── */}
      <div className="causes-screen-bg">
        <img
          src="/images/warming-causes-bg.jpg"
          alt="Causes of Global Warming: Earth, Industrial Emissions, Sunset and Deforestation"
          loading="eager"
        />
        <div className="causes-screen-vignette" />
      </div>

      {/* ── Upper Atmosphere Floating Chemical Symbols (Matches Image 1) ── */}
      <div className="causes-sky-labels" aria-hidden="true">
        <span className="sky-gas-tag gas-co2">CO₂</span>
        <span className="sky-gas-tag gas-ch4">CH₄</span>
        <span className="sky-gas-tag gas-n2o">N₂O</span>
      </div>

      {/* ── Top Header Block & Interactive Filter Pills ── */}
      <div className="causes-header-block">
        <div className="causes-eyebrow">
          <span>MODULE 05</span>
          <span className="causes-eyebrow-pipe">|</span>
          <span>CHAPTER 03</span>
        </div>
        <h1 className="causes-main-title">Causes of Global Warming</h1>
        <h2 className="causes-subtitle">Human Activities and Natural Factors</h2>
        <p className="causes-lead-text">
          Global warming is mainly caused by the increase in greenhouse gases (GHGs) in the atmosphere
          due to human activities, along with some natural factors.
        </p>

        {/* 3 Tab Mode Selectors */}
        <div className="causes-tabs-row" role="tablist" aria-label="Causes of Global Warming View Modes">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'main'}
            className={`causes-tab-pill ${activeTab === 'main' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('main');
              setFocusedCardId(null);
            }}
          >
            Main Causes
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'comparison'}
            className={`causes-tab-pill ${activeTab === 'comparison' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            Human vs Natural
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'contribution'}
            className={`causes-tab-pill ${activeTab === 'contribution' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('contribution')}
          >
            Contribution
          </button>
        </div>
      </div>

      {/* ── 5 Primary Causes Cards Grid ── */}
      <div className="causes-cards-grid">
        {causeCards.map((card) => {
          const isFocused = focusedCardId === card.id;
          const isDimmed =
            (activeTab === 'contribution' && card.id === 'deforest') ||
            (focusedCardId !== null && focusedCardId !== card.id);

          return (
            <motion.div
              key={card.id}
              className={`cause-glass-card theme-${card.theme} ${isFocused ? 'is-focused' : ''}`}
              style={{
                opacity: isDimmed ? 0.55 : 1,
                transform: isFocused ? 'translateY(-6px)' : undefined,
              }}
              onMouseEnter={() => setFocusedCardId(card.id)}
              onMouseLeave={() => setFocusedCardId(null)}
              onClick={() => setFocusedCardId(isFocused ? null : card.id)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Card Header Strip */}
              <div className="cause-card-head">
                <div className="cause-card-icon-badge">
                  {card.theme === 'co2' && <Factory size={16} />}
                  {card.theme === 'ch4' && <Flame size={16} />}
                  {card.theme === 'n2o' && <Leaf size={16} />}
                  {card.theme === 'deforest' && <Trees size={16} />}
                  {card.theme === 'other' && <Building2 size={16} />}
                </div>
                <div className="cause-card-titles">
                  <span className="cause-card-primary-title">{card.primaryTitle}</span>
                  {card.secondaryTitle && (
                    <span className="cause-card-secondary-title">{card.secondaryTitle}</span>
                  )}
                </div>
              </div>

              {/* 16:9 Crisp Visual Thumbnail */}
              <div className="cause-card-thumbnail-wrap">
                <img
                  src={card.image}
                  alt={`${card.primaryTitle} emission driver source`}
                  loading="lazy"
                />
                <div className="cause-card-thumb-vignette" />
              </div>

              {/* Card Body */}
              <div className="cause-card-body">
                {card.stat && (
                  <div className="cause-stat-row">
                    <span className="cause-stat-val">{card.stat}</span>
                    {card.statYear && <span className="cause-stat-year">{card.statYear}</span>}
                  </div>
                )}
                <p className="cause-desc-text">
                  {card.highlightText && (
                    <span className="cause-desc-highlight">{card.highlightText} </span>
                  )}
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom Row: Two Wide Analytic Comparison Panels ── */}
      <div className="causes-bottom-row">
        {/* Panel 1: Contribution to Global Warming */}
        <div
          className={`causes-analytic-panel contrib-glass-panel ${
            activeTab === 'contribution' ? 'ring-2 ring-orange-500/50' : ''
          }`}
        >
          <div className="causes-panel-header">
            <h3 className="causes-panel-title">Contribution to Global Warming</h3>
            <button
              type="button"
              className="causes-panel-info-btn"
              onClick={() => setShowContribInfo(!showContribInfo)}
              aria-label="Radiative forcing contribution details"
              title="Click for radiative forcing breakdown"
            >
              <Info size={12} />
            </button>
          </div>

          <div className="causes-stacked-bar-container">
            {/* Segmented Horizontal Bar */}
            <div className="causes-stacked-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={100}>
              <div
                className="bar-chunk chunk-co2"
                style={{
                  width: '76%',
                  opacity: focusedCardId && focusedCardId !== 'co2' ? 0.45 : 1,
                }}
                onMouseEnter={() => setFocusedCardId('co2')}
                onMouseLeave={() => setFocusedCardId(null)}
                title="CO₂: 76% Radiative Forcing"
              />
              <div
                className="bar-chunk chunk-ch4"
                style={{
                  width: '16%',
                  opacity: focusedCardId && focusedCardId !== 'ch4' ? 0.45 : 1,
                }}
                onMouseEnter={() => setFocusedCardId('ch4')}
                onMouseLeave={() => setFocusedCardId(null)}
                title="CH₄: 16% Radiative Forcing"
              />
              <div
                className="bar-chunk chunk-n2o"
                style={{
                  width: '6%',
                  opacity: focusedCardId && focusedCardId !== 'n2o' ? 0.45 : 1,
                }}
                onMouseEnter={() => setFocusedCardId('n2o')}
                onMouseLeave={() => setFocusedCardId(null)}
                title="N₂O: 6% Radiative Forcing"
              />
              <div
                className="bar-chunk chunk-others"
                style={{
                  width: '2%',
                  opacity: focusedCardId && focusedCardId !== 'other' ? 0.45 : 1,
                }}
                onMouseEnter={() => setFocusedCardId('other')}
                onMouseLeave={() => setFocusedCardId(null)}
                title="Fluorinated & Other Gases: 2%"
              />
            </div>

            {/* Numeric Labels Row matching Image 1 */}
            <div className="causes-bar-legend-row">
              <div
                className="bar-legend-item legend-co2"
                onClick={() => setFocusedCardId(focusedCardId === 'co2' ? null : 'co2')}
              >
                <span className="bar-legend-val">76%</span>
                <span className="bar-legend-name">CO₂</span>
              </div>
              <div
                className="bar-legend-item legend-ch4"
                onClick={() => setFocusedCardId(focusedCardId === 'ch4' ? null : 'ch4')}
              >
                <span className="bar-legend-val">16%</span>
                <span className="bar-legend-name">CH₄</span>
              </div>
              <div
                className="bar-legend-item legend-n2o"
                onClick={() => setFocusedCardId(focusedCardId === 'n2o' ? null : 'n2o')}
              >
                <span className="bar-legend-val">6%</span>
                <span className="bar-legend-name">N₂O</span>
              </div>
              <div
                className="bar-legend-item legend-others"
                onClick={() => setFocusedCardId(focusedCardId === 'other' ? null : 'other')}
              >
                <span className="bar-legend-val">2%</span>
                <span className="bar-legend-name">Others</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Natural vs Human Causes */}
        <div
          className={`causes-analytic-panel comparison-glass-panel ${
            activeTab === 'comparison' ? 'ring-2 ring-orange-500/50' : ''
          }`}
        >
          <div className="causes-panel-header">
            <h3 className="causes-panel-title">Natural vs Human Causes</h3>
            <button
              type="button"
              className="causes-panel-info-btn"
              onClick={() => setShowCausesInfo(!showCausesInfo)}
              aria-label="Natural vs Anthropogenic breakdown info"
              title="Click for Natural vs Human breakdown info"
            >
              <Info size={12} />
            </button>
          </div>

          <div className="natural-vs-human-grid">
            {/* Column A: Natural Factors (~5–10%) */}
            <div className="cause-category-col">
              <div className="cause-cat-head head-natural">
                <Leaf size={14} />
                <span>Natural Factors (~5–10%)</span>
              </div>
              <ul className="cause-cat-bullets">
                <li>Volcanic eruptions</li>
                <li>Variations in solar radiation</li>
                <li>Natural climate cycles (e.g., El Niño, Milankovitch cycles)</li>
              </ul>
            </div>

            {/* Column B: Human Activities (~90–95%) */}
            <div className="cause-category-col">
              <div className="cause-cat-head head-human">
                <Users size={14} />
                <span>Human Activities (~90–95%)</span>
              </div>
              <ul className="cause-cat-bullets">
                <li>Burning of fossil fuels</li>
                <li>Deforestation</li>
                <li>Agriculture and livestock</li>
                <li>Industrial processes</li>
                <li>Urbanization and waste</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Info Drawers ── */}
      <AnimatePresence>
        {showContribInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContribInfo(false)}
          >
            <motion.div
              className="max-w-md w-full max-h-[85vh] overflow-y-auto bg-[#0d141e] border border-orange-500/40 rounded-xl p-5 shadow-2xl text-left"
              data-lenis-prevent
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles size={15} className="text-orange-400" />
                  Syllabus Radiative Forcing Ratio (BCV755B)
                </h4>
                <button
                  type="button"
                  onClick={() => setShowContribInfo(false)}
                  className="text-white/60 hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                In official civil & environmental engineering curriculum notes, radiative forcing is dominated
                by <strong>CO₂ (~76–80%)</strong> due to the sheer volume of fossil combustion. Trace gases like 
                <strong> CH₄ (16%)</strong> and <strong>N₂O (6%)</strong> contribute the remainder, but boast much higher
                Global Warming Potentials (CH₄ is 28× and N₂O is 298× more potent per kilogram than CO₂).
              </p>
              <div className="grid grid-cols-3 gap-2 text-[11px] bg-black/40 p-2.5 rounded-lg border border-white/5">
                <div>
                  <span className="text-orange-400 font-bold block">CO₂</span>
                  <span className="text-white/60">GWP: 1</span>
                  <span className="text-white/40 block">~100+ yrs</span>
                </div>
                <div>
                  <span className="text-sky-400 font-bold block">CH₄</span>
                  <span className="text-white/60">GWP: 28×</span>
                  <span className="text-white/40 block">~12 yrs</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block">N₂O</span>
                  <span className="text-white/60">GWP: 298×</span>
                  <span className="text-white/40 block">~114 yrs</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCausesInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCausesInfo(false)}
          >
            <motion.div
              className="max-w-md w-full max-h-[85vh] overflow-y-auto bg-[#0d141e] border border-amber-500/40 rounded-xl p-5 shadow-2xl text-left"
              data-lenis-prevent
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
            >
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp size={15} className="text-amber-400" />
                  Anthropogenic vs Natural Drivers
                </h4>
                <button
                  type="button"
                  onClick={() => setShowCausesInfo(false)}
                  className="text-white/60 hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                IPCC AR6 and VTU notes confirm that the observed warming rate over the last 150 years
                cannot be explained by natural forcings (solar and volcanic) alone. Natural variations account for
                only <strong>~5–10%</strong> of observed fluctuations, whereas anthropogenic emissions drive 
                <strong> ~90–95%</strong> of net planetary heating.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default WarmingCausesScreen;
