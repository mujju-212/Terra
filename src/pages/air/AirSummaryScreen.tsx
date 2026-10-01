import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Wind,
  Factory,
  Atom,
  FileText,
  Gauge,
  Heart,
  Coins,
  Settings,
  CloudRain,
  Globe,
  Sun,
  Lightbulb,
  Check,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Leaf,
  Layers,
} from 'lucide-react';
import type { ModuleContent } from '../../content/types';
import './AirSummaryScreen.css';

/* ─── 3D EARTH OZONE SHIELD SVG GRAPHIC ─── */
function EarthOzoneGraphic() {
  return (
    <svg width="138" height="108" viewBox="0 0 140 110" fill="none">
      <defs>
        {/* Deep Ocean Globe Gradient */}
        <radialGradient id="earthOcean" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="35%" stopColor="#0284c7" />
          <stop offset="75%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#082f49" />
        </radialGradient>
        {/* Sun Gradient */}
        <radialGradient id="quizSun" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        {/* Ozone Shield Arc Glow */}
        <linearGradient id="ozoneArc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#818cf8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.7" />
        </linearGradient>
        <filter id="ozoneGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Sun in top-right */}
      <circle cx="124" cy="18" r="10" fill="url(#quizSun)" />
      {/* Sun Rays */}
      <line x1="124" y1="4" x2="124" y2="0" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="124" y1="32" x2="124" y2="36" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="110" y1="18" x2="106" y2="18" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="138" y1="18" x2="142" y2="18" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="114" y1="8" x2="111" y2="5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <line x1="134" y1="28" x2="137" y2="31" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

      {/* Incoming UV Solar Radiation Lines towards Earth */}
      <line x1="114" y1="24" x2="94" y2="38" stroke="#f97316" strokeWidth="2.2" strokeDasharray="3 2" />
      <line x1="116" y1="30" x2="98" y2="46" stroke="#f97316" strokeWidth="2.2" strokeDasharray="3 2" />
      <line x1="122" y1="32" x2="104" y2="54" stroke="#f97316" strokeWidth="2.2" strokeDasharray="3 2" />

      {/* Earth Body */}
      <circle cx="56" cy="74" r="38" fill="url(#earthOcean)" />

      {/* Continents (Stylized vector green patches) */}
      <path
        d="M 38 52 C 45 48, 55 52, 60 56 C 58 64, 48 68, 42 66 Z"
        fill="#22c55e"
        opacity="0.8"
      />
      <path
        d="M 58 68 C 66 65, 75 70, 72 80 C 64 85, 56 82, 54 75 Z"
        fill="#22c55e"
        opacity="0.85"
      />
      <path
        d="M 32 75 C 38 72, 42 80, 40 88 C 34 86, 30 80, 32 75 Z"
        fill="#16a34a"
        opacity="0.75"
      />

      {/* Atmosphere Glow */}
      <circle cx="56" cy="74" r="39.5" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.6" />

      {/* Protective Ozone Layer (O3 Shield Arc) */}
      <path
        d="M 22 56 A 46 46 0 0 1 96 46"
        stroke="url(#ozoneArc)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        filter="url(#ozoneGlow)"
      />

      {/* Ozone O3 Label Badge */}
      <rect x="100" y="58" width="28" height="16" rx="8" fill="rgba(8, 20, 36, 0.85)" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" />
      <text x="114" y="70" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        O₃
      </text>
    </svg>
  );
}

interface AirSummaryScreenProps {
  module?: ModuleContent;
}

export function AirSummaryScreen({ module }: AirSummaryScreenProps) {
  const reducedMotion = useReducedMotion();

  // Quick Quiz State (Default C selected as correct in mockup)
  const [selectedOption, setSelectedOption] = useState<string>('C');

  // Smooth scroll handler for the 11 key topics
  const handleScrollToTopic = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const keyTopics = [
    { id: 'ch-intro-air', title: 'Introduction to Air', icon: Wind, classKey: 'topic-intro' },
    { id: 'ch-pollution', title: 'Air Pollution', icon: Factory, classKey: 'topic-pollution' },
    { id: 'ch-sources', title: 'Sources & Classification', icon: Atom, classKey: 'topic-sources' },
    { id: 'ch-naaqs', title: 'NAAQS', icon: FileText, classKey: 'topic-naaqs' },
    { id: 'ch-aqi', title: 'AQI', icon: Gauge, classKey: 'topic-aqi' },
    { id: 'ch-health', title: 'Health Effects', icon: Heart, classKey: 'topic-health' },
    { id: 'ch-economic', title: 'Economic Effects', icon: Coins, classKey: 'topic-economic' },
    { id: 'ch-equipment', title: 'Control Equipment', icon: Settings, classKey: 'topic-equipment' },
    { id: 'ch-smoke', title: 'Smoke & Its Control', icon: CloudRain, classKey: 'topic-smoke' },
    { id: 'ch-ozone', title: 'Ozone Depletion', icon: Globe, classKey: 'topic-ozone' },
    { id: 'ch-photochemical', title: 'Photochemical Changes', icon: Sun, classKey: 'topic-photochem' },
  ];

  return (
    <section className="air-summary-section" id="ch-summary">
      {/* ─── HERO BACKDROP: CLEAN MODERN CITY SKYLINE & LAKE ─── */}
      <div className="air-summary-hero-backdrop" aria-hidden="true">
        <img
          src="/images/air-clean-cityscape.jpg"
          alt="Modern metropolitan city skyline reflecting across serene lake surrounded by lush green parks"
          className="air-summary-hero-bg-img"
        />
        <div className="air-summary-scrim-left" />
        <div className="air-summary-scrim-top" />
        <div className="air-summary-scrim-bottom" />
      </div>

      <div className="air-summary-container">
        {/* ─── 1. TOP HEADER ROW + FLOATING QUOTE ─── */}
        <div className="air-summary-header-row">
          <motion.div
            className="air-summary-header-left"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <span className="air-summary-chapter-tag">CHAPTER 13</span>
            <h2 className="air-summary-title">
              Module Summary <br />
              <span className="air-summary-title-accent">Air Pollution</span>
            </h2>
            <p className="air-summary-desc">
              This module covered the key concepts of air pollution, including its sources,
              classification, standards, impacts and control measures. Air pollution affects human
              health, the environment, the economy and global systems, but it can be managed through
              proper regulations, cleaner technologies and sustainable practices.
            </p>
          </motion.div>

          {/* Floating Quote Card */}
          <motion.div
            className="air-summary-quote-card"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <span className="air-summary-quote-mark">“</span>
            <p className="air-summary-quote-text">
              Cleaner air is not a luxury but a necessity for a healthier population, stronger
              economies and a more sustainable planet.
            </p>
          </motion.div>
        </div>

        {/* ─── 2. KEY TOPICS COVERED MATRIX ─── */}
        <motion.div
          className="air-topics-panel"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="air-topics-head">
            <BookOpen size={18} className="air-topics-head-icon" />
            <h3 className="air-topics-head-title">Key Topics Covered</h3>
          </div>

          {/* First Row of 7 Topics */}
          <div className="air-topics-grid">
            {keyTopics.slice(0, 7).map((topic) => {
              const IconComp = topic.icon;
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`air-topic-btn ${topic.classKey}`}
                  onClick={() => handleScrollToTopic(topic.id)}
                  title={`Jump to ${topic.title}`}
                >
                  <div className="air-topic-icon-wrap">
                    <IconComp size={16} />
                  </div>
                  <span className="air-topic-label">{topic.title}</span>
                </button>
              );
            })}
          </div>

          {/* Second Row of 4 Topics */}
          <div className="air-topics-grid air-topics-grid-row-2">
            {keyTopics.slice(7).map((topic) => {
              const IconComp = topic.icon;
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`air-topic-btn ${topic.classKey}`}
                  onClick={() => handleScrollToTopic(topic.id)}
                  title={`Jump to ${topic.title}`}
                >
                  <div className="air-topic-icon-wrap">
                    <IconComp size={16} />
                  </div>
                  <span className="air-topic-label">{topic.title}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ─── 3. MIDDLE ROW: 3 GLASS PANELS ─── */}
        <div className="air-summary-mid-grid">
          {/* ═══════════════════════════════════════════════════════ */}
          {/* PANEL 1: MAJOR TAKEAWAYS                                */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-summary-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="air-summary-panel-head">
              <div className="air-summary-panel-icon">
                <Lightbulb size={16} />
              </div>
              <h3 className="air-summary-panel-title">Major Takeaways</h3>
            </div>

            <ul className="air-takeaways-list">
              <li className="air-takeaway-item">
                <div className="air-takeaway-check">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Air is essential for life, but pollution threatens its quality.</span>
              </li>
              <li className="air-takeaway-item">
                <div className="air-takeaway-check">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Air pollutants include gaseous and particulate matter from natural and anthropogenic sources.</span>
              </li>
              <li className="air-takeaway-item">
                <div className="air-takeaway-check">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>NAAQS and AQI help in monitoring and managing air quality.</span>
              </li>
              <li className="air-takeaway-item">
                <div className="air-takeaway-check">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Air pollution affects human health, the environment and the economy.</span>
              </li>
              <li className="air-takeaway-item">
                <div className="air-takeaway-check">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Control measures and cleaner technologies can significantly reduce emissions.</span>
              </li>
              <li className="air-takeaway-item">
                <div className="air-takeaway-check">
                  <Check size={10} strokeWidth={3} />
                </div>
                <span>Global issues like ozone depletion and photochemical smog highlight the need for collective action.</span>
              </li>
            </ul>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* PANEL 2: REAL-WORLD RELEVANCE                           */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-summary-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="air-summary-panel-head">
              <div className="air-summary-panel-icon">
                <Globe size={16} />
              </div>
              <h3 className="air-summary-panel-title">Real-World Relevance</h3>
            </div>

            <div className="air-relevance-cards-col">
              {/* Card 1: Cleaner Cities */}
              <div className="air-relevance-card">
                <div className="air-relevance-thumb-wrap">
                  <img
                    src="/images/air-real-vehicles.jpg"
                    alt="Modern highway with electric vehicles under clean atmosphere"
                    className="air-relevance-thumb"
                  />
                </div>
                <div className="air-relevance-content">
                  <h4 className="air-relevance-card-title title-clean-cities">Cleaner Cities</h4>
                  <p className="air-relevance-card-desc">
                    Stricter emission norms and cleaner technologies improve air quality in urban areas.
                  </p>
                </div>
              </div>

              {/* Card 2: Healthier Ecosystems */}
              <div className="air-relevance-card">
                <div className="air-relevance-thumb-wrap">
                  <img
                    src="/images/landuse-hero-natural.jpg"
                    alt="Lush green standing forest and pristine river basin"
                    className="air-relevance-thumb"
                  />
                </div>
                <div className="air-relevance-content">
                  <h4 className="air-relevance-card-title title-ecosystems">Healthier Ecosystems</h4>
                  <p className="air-relevance-card-desc">
                    Reducing pollutants protects forests, crops and biodiversity.
                  </p>
                </div>
              </div>

              {/* Card 3: Sustainable Future */}
              <div className="air-relevance-card">
                <div className="air-relevance-thumb-wrap">
                  <img
                    src="/images/air-plant-clean-stack.jpg"
                    alt="Clean energy infrastructure and advanced emission controls"
                    className="air-relevance-thumb"
                  />
                </div>
                <div className="air-relevance-content">
                  <h4 className="air-relevance-card-title title-sustainable">Sustainable Future</h4>
                  <p className="air-relevance-card-desc">
                    Cleaner energy and regulations help ensure a healthier and more sustainable planet.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* PANEL 3: QUICK QUIZ                                     */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            className="air-summary-glass-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="air-summary-panel-head">
              <div className="air-summary-panel-icon">
                <HelpCircle size={16} />
              </div>
              <h3 className="air-summary-panel-title">Quick Quiz</h3>
            </div>

            <div className="air-quiz-content-wrap">
              <p className="air-quiz-question">
                Q1. Which gas is primarily responsible for the depletion of the ozone layer?
              </p>

              <div className="air-quiz-main-row">
                {/* 4 Interactive Options */}
                <div className="air-quiz-options-col">
                  {[
                    { id: 'A', text: 'CO₂' },
                    { id: 'B', text: 'CH₄' },
                    { id: 'C', text: 'CFCs' },
                    { id: 'D', text: 'SO₂' },
                  ].map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const isCorrect = opt.id === 'C';
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`air-quiz-option-btn ${
                          isSelected && isCorrect ? 'is-correct' : isSelected && !isCorrect ? 'is-incorrect' : ''
                        }`}
                        onClick={() => setSelectedOption(opt.id)}
                      >
                        <span>
                          <strong>({opt.id})</strong> &nbsp;{opt.text}
                        </span>
                        {isSelected && isCorrect && <Check size={14} className="text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* 3D Earth Ozone Graphic */}
                <div className="air-quiz-earth-graphic">
                  <EarthOzoneGraphic />
                </div>
              </div>

              {/* Try More Questions CTA */}
              <Link to="/quiz?module=air" className="air-quiz-more-btn">
                <span>Try More Questions</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ─── 4. BOTTOM BANNER: NEXT MODULE BIODIVERSITY ─── */}
        <motion.div
          className="air-next-module-banner"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Scenic Wildlife & Forest Landscape Banner Image */}
          <img
            src="/images/card-bio.jpg"
            alt="Lush tropical wilderness, elephants, and rich wildlife biodiversity"
            className="air-next-banner-bg"
          />
          <div className="air-next-banner-scrim" />

          {/* Left Text & Leaf Badge */}
          <div className="air-next-banner-content">
            <div className="air-next-leaf-badge">
              <Leaf size={22} />
            </div>
            <div className="air-next-text-group">
              <span className="air-next-eyebrow">Next Module</span>
              <h3 className="air-next-title">Biodiversity and Its Conservation</h3>
            </div>
          </div>

          {/* Right Action Button */}
          <Link to="/module/biodiversity" className="air-next-cta-btn">
            <span>Continue to Module 4</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AirSummaryScreen;
