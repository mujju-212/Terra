import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  MapPin,
  ChevronDown,
  User,
  Heart,
  Share2,
  AlertTriangle,
  Sun,
  ShieldCheck,
  Activity,
  X,
  Info,
  Check,
  Sparkles,
} from 'lucide-react';
import './AqiScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

/* ─── DATA DEFINITIONS ─── */
interface AqiCategoryDef {
  min: number;
  max: number;
  name: string;
  color: string;
  bgColor: string;
  implications: string;
  advisory: string;
}

const AQI_CATEGORIES: AqiCategoryDef[] = [
  {
    min: 0,
    max: 50,
    name: 'Good',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.15)',
    implications: 'Minimal health risk',
    advisory: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
  },
  {
    min: 51,
    max: 100,
    name: 'Moderate',
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.15)',
    implications: 'Acceptable, minor concern for sensitive people',
    advisory: 'Air quality is acceptable; however, a small number of unusually sensitive individuals may experience minor breathing discomfort.',
  },
  {
    min: 101,
    max: 200,
    name: 'Unhealthy for Sensitive Groups',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    implications: 'May cause health effects for sensitive individuals',
    advisory: 'Air quality is acceptable. However, there may be a moderate health concern for a small number of people who are unusually sensitive to air pollution.',
  },
  {
    min: 201,
    max: 300,
    name: 'Unhealthy',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    implications: 'Health effects for everyone may begin',
    advisory: 'Members of sensitive groups may experience more serious health effects. Everyone may begin to experience breathing discomfort on prolonged exposure.',
  },
  {
    min: 301,
    max: 400,
    name: 'Very Unhealthy',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.15)',
    implications: 'Serious health effects for everyone',
    advisory: 'Health alert: The risk of health effects is increased for everyone. Prolonged outdoor exertion should be avoided.',
  },
  {
    min: 401,
    max: 500,
    name: 'Hazardous',
    color: '#881337',
    bgColor: 'rgba(136, 19, 55, 0.25)',
    implications: 'Emergency conditions, serious health effects',
    advisory: 'Health warning of emergency conditions: Everyone is more likely to be affected. Serious health impacts even during light physical exertion.',
  },
];

interface CityPreset {
  name: string;
  aqi: number;
}

const CITY_PRESETS: CityPreset[] = [
  { name: 'Bangalore, India', aqi: 156 },
  { name: 'New Delhi, India', aqi: 368 },
  { name: 'Mumbai, India', aqi: 178 },
  { name: 'Kolkata, India', aqi: 245 },
  { name: 'Mysore, India', aqi: 42 },
  { name: 'London, UK', aqi: 38 },
];

interface PollutantDetail {
  id: string;
  symbol: string;
  name: string;
  sub: string;
  badgeClass: string;
  standard: string;
  formula: string;
  health: string;
}

const POLLUTANTS: PollutantDetail[] = [
  {
    id: 'pm25',
    symbol: 'PM2.5',
    name: 'Particulate Matter',
    sub: '(≤ 2.5 µm)',
    badgeClass: 'token-pm25',
    standard: '60 µg/m³ (24-hr) · 40 µg/m³ (Annual)',
    formula: 'Sub-micron combustion soot, secondary sulphates, organic carbons',
    health: 'Penetrates deep into alveolar gas-exchange tissues, entering the bloodstream to cause cardiac attacks and systemic inflammation.',
  },
  {
    id: 'pm10',
    symbol: 'PM10',
    name: 'Particulate Matter',
    sub: '(≤ 10 µm)',
    badgeClass: 'token-pm10',
    standard: '100 µg/m³ (24-hr) · 60 µg/m³ (Annual)',
    formula: 'Coarse dust, fly ash, silica particles, abrasion aerosols',
    health: 'Trapped in upper respiratory tract and bronchial airways, aggravating chronic bronchitis and severe asthma attacks.',
  },
  {
    id: 'o3',
    symbol: 'O3',
    name: 'Ozone',
    sub: '(O₃)',
    badgeClass: 'token-o3',
    standard: '100 µg/m³ (8-hr) · 180 µg/m³ (1-hr)',
    formula: 'Photochemical secondary pollutant formed via NO₂ + VOCs + sunlight',
    health: 'Potent pulmonary irritant causing eye burning, reduced lung elasticity, and lowered resistance to colds and pneumonia.',
  },
  {
    id: 'no2',
    symbol: 'NO2',
    name: 'Nitrogen Dioxide',
    sub: '(NO₂)',
    badgeClass: 'token-no2',
    standard: '80 µg/m³ (24-hr) · 40 µg/m³ (Annual)',
    formula: 'Discharged from high-temperature motor and industrial combustion',
    health: 'Inflames lining of the lungs, making small children and asthma sufferers particularly vulnerable to winter respiratory infections.',
  },
  {
    id: 'so2',
    symbol: 'SO2',
    name: 'Sulphur Dioxide',
    sub: '(SO₂)',
    badgeClass: 'token-so2',
    standard: '80 µg/m³ (24-hr) · 50 µg/m³ (Annual)',
    formula: 'Fossil fuel combustion in coal power plants and metal smelting',
    health: 'Forms corrosive sulphuric acid mist (H₂SO₄); triggers acute wheezing, shortness of breath, and bronchial constriction.',
  },
  {
    id: 'co',
    symbol: 'CO',
    name: 'Carbon Monoxide',
    sub: '(CO)',
    badgeClass: 'token-co',
    standard: '04 mg/m³ (1-hr) · 02 mg/m³ (8-hr)',
    formula: 'Toxic colourless gas from incomplete fuel combustion',
    health: 'Binds with blood haemoglobin to form carboxyhaemoglobin, depriving brain and vital organs of oxygen, causing drowsiness and confusion.',
  },
];

interface AdvisoryCardDef {
  id: string;
  pillClass: string;
  title: string;
  image: string;
  caption: string;
  rangeMin: number;
  rangeMax: number;
}

const ADVISORY_CARDS: AdvisoryCardDef[] = [
  {
    id: 'good',
    pillClass: 'pill-good',
    title: 'Good (0 – 50)',
    image: '/images/aqi-advisory-good.jpg',
    caption: 'Enjoy outdoor activities.',
    rangeMin: 0,
    rangeMax: 50,
  },
  {
    id: 'moderate',
    pillClass: 'pill-moderate',
    title: 'Moderate (51 – 100)',
    image: '/images/aqi-advisory-moderate.jpg',
    caption: 'Sensitive people should limit prolonged outdoor activities.',
    rangeMin: 51,
    rangeMax: 100,
  },
  {
    id: 'sensitive',
    pillClass: 'pill-sensitive',
    title: 'Unhealthy for Sensitive Groups (101 – 200)',
    image: '/images/aqi-advisory-sensitive.jpg',
    caption: 'Sensitive groups (children, elderly, respiratory disease) should reduce outdoor activities.',
    rangeMin: 101,
    rangeMax: 200,
  },
  {
    id: 'unhealthy',
    pillClass: 'pill-unhealthy',
    title: 'Unhealthy (201 – 300)',
    image: '/images/aqi-advisory-unhealthy.jpg',
    caption: 'Everyone should reduce prolonged outdoor activities.',
    rangeMin: 201,
    rangeMax: 300,
  },
  {
    id: 'very-unhealthy',
    pillClass: 'pill-very-unhealthy',
    title: 'Very Unhealthy (301 – 400)',
    image: '/images/aqi-advisory-very-unhealthy.jpg',
    caption: 'Avoid outdoor activities. Keep windows closed.',
    rangeMin: 301,
    rangeMax: 400,
  },
  {
    id: 'hazardous',
    pillClass: 'pill-hazardous',
    title: 'Hazardous (401 – 500)',
    image: '/images/aqi-advisory-hazardous.jpg',
    caption: 'Stay indoors. Follow official advisories.',
    rangeMin: 401,
    rangeMax: 500,
  },
];

export function AqiScreen() {
  const [aqiValue, setAqiValue] = useState<number>(156);
  const [selectedCity, setSelectedCity] = useState<string>('Bangalore, India');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [splitPos, setSplitPos] = useState<number>(54);
  const [selectedPollutant, setSelectedPollutant] = useState<PollutantDetail | null>(null);

  // Lock scroll, pause Lenis, route wheel delta and handle Escape
  useModalScrollLock(Boolean(selectedPollutant), () => setSelectedPollutant(null));

  const heroStageRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Derive current category
  const currentCategory = AQI_CATEGORIES.find(
    (c) => aqiValue >= c.min && aqiValue <= c.max
  ) || AQI_CATEGORIES[0];

  // Helper to update split position from clientX, clamped so slider is always clearly in view
  const updateSplitFromPointer = useCallback((clientX: number) => {
    if (!heroStageRef.current) return;
    const rect = heroStageRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 24), 76);
    setSplitPos(Math.round(percent));
  }, []);

  // Pointer event handling for smooth Before/After Slider dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updateSplitFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    updateSplitFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch (_) {}
  };

  // Clicking anywhere on the comparison stage smoothly relocates the slider
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore clicks on header text or quote card
    if ((e.target as HTMLElement).closest('.air-aqi-hero-text') || (e.target as HTMLElement).closest('.air-aqi-quote-card')) {
      return;
    }
    updateSplitFromPointer(e.clientX);
  };

  // Needle angle (-90deg at 0 to +90deg at 500)
  const needleAngle = -90 + (aqiValue / 500) * 180;

  // Handle city selection
  const handleCitySelect = (city: CityPreset) => {
    setSelectedCity(city.name);
    setAqiValue(city.aqi);
    setIsCityDropdownOpen(false);
  };

  return (
    <section className="air-aqi-section" id="ch-aqi">
      <div className="air-aqi-container">
        {/* ─── DEDICATED HERO STAGE WITH UNHIDDEN BEFORE/AFTER SLIDER ─── */}
        <div
          ref={heroStageRef}
          className="air-aqi-hero-stage"
          style={{ '--split-pos': `${splitPos}%` } as React.CSSProperties}
          onClick={handleStageClick}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Split Stage: Clean Air (Good) on Left */}
          <div className="air-aqi-split-stage">
            <div className="air-aqi-split-clean">
              <img
                src="/images/air-clean-cityscape.jpg"
                alt="Clean blue sky urban cityscape"
              />
            </div>

            {/* Split Stage: Polluted Air (Poor) on Right */}
            <div
              className="air-aqi-split-polluted"
              style={{ width: `${100 - splitPos}%` }}
            >
              <img
                src="/images/air-polluted-cityscape.jpg"
                alt="Polluted amber hazy cityscape with industrial emissions"
              />
            </div>

            {/* Draggable Vertical Slider Handle */}
            <div
              className="air-aqi-slider-divider"
              onPointerDown={handlePointerDown}
              role="slider"
              aria-valuenow={splitPos}
              aria-valuemin={24}
              aria-valuemax={76}
              aria-label="Drag to compare Good Air vs Poor Air"
            >
              <div className="air-aqi-drag-knob">
                <span>❮ ❯</span>
              </div>
            </div>

            {/* Floating Pills alongside the slider handle */}
            <div className="air-aqi-pill-tag tag-good-air">Good Air</div>
            <div className="air-aqi-pill-tag tag-poor-air">Poor Air</div>
          </div>

          {/* Text and Quote Overlaid on Hero Stage */}
          <div className="air-aqi-hero-content-overlay">
            <div className="air-aqi-hero-text">
              <span className="air-aqi-chapter-tag">CHAPTER 05</span>
              <h2 className="air-aqi-title">
                Air Quality Index <span className="air-aqi-highlight">(AQI)</span>
              </h2>
              <p className="air-aqi-desc">
                The Air Quality Index (AQI) is a number used to communicate the current level of air pollution and its associated health risks. It is calculated based on the concentrations of key air pollutants and is divided into categories, each with a specific color, range and health advisory.
              </p>
            </div>

            <div className="air-aqi-quote-card">
              <span className="air-aqi-quote-mark" aria-hidden="true">“</span>
              <p className="air-aqi-quote-text">
                AQI helps us understand air quality at a glance and take necessary precautions to protect our health.
              </p>
            </div>
          </div>
        </div>

        {/* ─── MIDDLE 3-PANEL BENTO GRID ─── */}
        <div className="air-aqi-main-grid">
          {/* ─── CARD 1: CURRENT AIR QUALITY (GAUGE) ─── */}
          <div className="air-aqi-card">
            <div>
              <div className="air-aqi-card-header">
                <div className="air-aqi-card-title-group">
                  <div className="air-aqi-card-icon-badge">
                    <Wind size={18} />
                  </div>
                  <h3 className="air-aqi-card-title">Current Air Quality</h3>
                </div>

                {/* City Picker */}
                <div className="air-aqi-city-picker">
                  <button
                    type="button"
                    className="air-aqi-city-btn"
                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                    aria-expanded={isCityDropdownOpen}
                  >
                    <MapPin size={13} />
                    <span>{selectedCity}</span>
                    <ChevronDown size={13} />
                  </button>

                  {isCityDropdownOpen && (
                    <div className="air-aqi-city-dropdown">
                      {CITY_PRESETS.map((city) => (
                        <button
                          key={city.name}
                          type="button"
                          className={`air-aqi-city-item ${selectedCity === city.name ? 'is-selected' : ''}`}
                          onClick={() => handleCitySelect(city)}
                        >
                          <span>{city.name}</span>
                          <span style={{ opacity: 0.6, fontSize: '0.72rem' }}>AQI {city.aqi}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Semicircular SVG Gauge */}
              <div className="air-gauge-container">
                <svg
                  viewBox="0 0 300 160"
                  className="air-gauge-svg"
                  aria-label={`Air Quality Index gauge showing ${aqiValue}, category ${currentCategory.name}`}
                >
                  <defs>
                    <linearGradient id="aqiArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="18%" stopColor="#eab308" />
                      <stop offset="38%" stopColor="#f97316" />
                      <stop offset="58%" stopColor="#ef4444" />
                      <stop offset="78%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>
                  </defs>

                  {/* Arc Track Background */}
                  <path
                    d="M 40 140 A 110 110 0 0 1 260 140"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />

                  {/* Colored Arc */}
                  <path
                    d="M 40 140 A 110 110 0 0 1 260 140"
                    fill="none"
                    stroke="url(#aqiArcGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />

                  {/* Scale Labels */}
                  <text x="35" y="152" fill="rgba(224, 242, 254, 0.7)" fontSize="10" fontWeight="600" textAnchor="middle">0</text>
                  <text x="44" y="94" fill="rgba(224, 242, 254, 0.7)" fontSize="10" fontWeight="600" textAnchor="middle">50</text>
                  <text x="78" y="50" fill="rgba(224, 242, 254, 0.7)" fontSize="10" fontWeight="600" textAnchor="middle">100</text>
                  <text x="150" y="22" fill="rgba(224, 242, 254, 0.7)" fontSize="10" fontWeight="600" textAnchor="middle">200</text>
                  <text x="222" y="50" fill="rgba(224, 242, 254, 0.7)" fontSize="10" fontWeight="600" textAnchor="middle">300</text>
                  <text x="256" y="94" fill="rgba(224, 242, 254, 0.7)" fontSize="10" fontWeight="600" textAnchor="middle">400</text>
                  <text x="265" y="152" fill="rgba(224, 242, 254, 0.7)" fontSize="10" fontWeight="600" textAnchor="middle">500</text>

                  {/* Needle Pivot & Arm */}
                  <g transform="translate(150, 140)">
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="-76"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      transform={`rotate(${needleAngle})`}
                      style={{ transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
                    />
                    <circle cx="0" cy="0" r="7" fill={currentCategory.color} stroke="#ffffff" strokeWidth="2.2" />
                  </g>
                </svg>

                {/* Center Readout */}
                <div className="air-gauge-center-readout">
                  <span className="air-gauge-number">{aqiValue}</span>
                  <span
                    className="air-gauge-category-pill"
                    style={{ color: currentCategory.color }}
                  >
                    {currentCategory.name}
                  </span>
                </div>
              </div>

              {/* Range Slider */}
              <div className="air-gauge-slider-wrap">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={aqiValue}
                  onChange={(e) => {
                    setAqiValue(Number(e.target.value));
                    setSelectedCity('Custom');
                  }}
                  className="air-gauge-slider"
                  aria-label="Adjust Air Quality Index value"
                />
              </div>
            </div>

            {/* Dynamic Advisory Box */}
            <div className="air-gauge-advisory-box">
              <div className="air-advisory-avatar">
                <User size={16} />
              </div>
              <p className="air-advisory-text">
                {currentCategory.advisory}
              </p>
            </div>
          </div>

          {/* ─── CARD 2: AQI CATEGORIES (TABLE) ─── */}
          <div className="air-aqi-card">
            <div>
              <div className="air-aqi-card-header">
                <h3 className="air-aqi-card-title">AQI Categories</h3>
              </div>

              <table className="air-categories-table">
                <thead>
                  <tr>
                    <th>AQI Range</th>
                    <th>Category</th>
                    <th>Color</th>
                    <th>Health Implications</th>
                  </tr>
                </thead>
                <tbody>
                  {AQI_CATEGORIES.map((cat) => {
                    const isActive = aqiValue >= cat.min && aqiValue <= cat.max;
                    return (
                      <tr
                        key={cat.name}
                        className={`air-category-row ${isActive ? 'is-active' : ''}`}
                        onClick={() => {
                          setAqiValue(Math.round((cat.min + cat.max) / 2));
                          setSelectedCity('Custom');
                        }}
                        title={`Click to set AQI to ${cat.name}`}
                      >
                        <td className="air-col-range">{cat.min} – {cat.max}</td>
                        <td
                          className="air-col-name"
                          style={{ color: cat.color }}
                        >
                          {cat.name}
                        </td>
                        <td>
                          <div
                            className="air-col-color-pill"
                            style={{
                              background: cat.color,
                              color: cat.color,
                            }}
                          />
                        </td>
                        <td className="air-col-implications">{cat.implications}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── CARD 3: KEY POLLUTANTS USED IN AQI ─── */}
          <div className="air-aqi-card">
            <div>
              <div className="air-aqi-card-header">
                <div className="air-aqi-card-title-group">
                  <div className="air-aqi-card-icon-badge">
                    <Share2 size={18} />
                  </div>
                  <h3 className="air-aqi-card-title">Key Pollutants Used in AQI</h3>
                </div>
              </div>

              <div className="air-pollutants-grid">
                {POLLUTANTS.map((pollutant) => (
                  <div
                    key={pollutant.id}
                    className={`air-pollutant-token ${pollutant.badgeClass}`}
                    onClick={() => setSelectedPollutant(pollutant)}
                    title={`View details of ${pollutant.name}`}
                  >
                    <span className="air-pollutant-symbol">{pollutant.symbol}</span>
                    <span className="air-pollutant-name">{pollutant.name}</span>
                    <span className="air-pollutant-sub">{pollutant.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM ROW: HEALTH ADVISORY GUIDE ─── */}
        <div className="air-advisory-guide-container">
          <div className="air-aqi-card-title-group">
            <div className="air-aqi-card-icon-badge">
              <Heart size={18} />
            </div>
            <h3 className="air-aqi-card-title">Health Advisory Guide</h3>
          </div>

          <div className="air-advisory-grid">
            {ADVISORY_CARDS.map((card) => {
              const isCurrent = aqiValue >= card.rangeMin && aqiValue <= card.rangeMax;
              return (
                <div
                  key={card.id}
                  className={`air-advisory-card ${isCurrent ? 'is-current' : ''}`}
                  onClick={() => {
                    setAqiValue(Math.round((card.rangeMin + card.rangeMax) / 2));
                    setSelectedCity('Custom');
                  }}
                  title={`Click to set AQI to ${card.title}`}
                >
                  <div className={`air-advisory-card-pill ${card.pillClass}`}>
                    {card.id === 'good' && <Sun size={13} />}
                    {card.id === 'moderate' && <Sun size={13} />}
                    {card.id === 'sensitive' && <User size={13} />}
                    {card.id === 'unhealthy' && <User size={13} />}
                    {card.id === 'very-unhealthy' && <AlertTriangle size={13} />}
                    {card.id === 'hazardous' && <AlertTriangle size={13} />}
                    <span>{card.title}</span>
                  </div>

                  <div className="air-advisory-thumb-wrap">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="air-advisory-thumb"
                      loading="lazy"
                    />
                  </div>

                  <div className="air-advisory-caption">
                    {card.caption}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── MODAL DETAIL FOR KEY POLLUTANTS ─── */}
      <AnimatePresence>
        {selectedPollutant && (
          <motion.div
            className="air-aqi-modal-backdrop"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPollutant(null)}
          >
            <motion.div
              className="air-aqi-modal-content"
              data-lenis-prevent
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="air-aqi-modal-close"
                onClick={() => setSelectedPollutant(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: "var(--serif, 'Instrument Serif', Georgia, serif)",
                    fontSize: '2rem',
                    color: '#38bdf8',
                  }}
                >
                  {selectedPollutant.symbol}
                </span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>
                    {selectedPollutant.name}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(186, 230, 253, 0.6)' }}>
                    {selectedPollutant.sub}
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  marginBottom: '14px',
                }}
              >
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#38bdf8', marginBottom: '4px' }}>
                  NAAQS Breakpoint Limit
                </div>
                <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#f0f9ff' }}>
                  {selectedPollutant.standard}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(224, 242, 254, 0.6)', marginBottom: '4px' }}>
                  Chemical Composition & Formation
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'rgba(224, 242, 254, 0.88)', lineHeight: 1.5 }}>
                  {selectedPollutant.formula}
                </p>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#f87171', marginBottom: '4px' }}>
                  Physiological & Health Impact
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'rgba(224, 242, 254, 0.88)', lineHeight: 1.55 }}>
                  {selectedPollutant.health}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AqiScreen;
