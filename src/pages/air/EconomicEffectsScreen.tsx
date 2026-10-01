import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Sprout,
  Building2,
  Settings,
  PlusCircle,
  BarChart3,
  Landmark,
  Lightbulb,
  CheckCircle2,
  ArrowDownCircle,
  Coins,
  TrendingDown,
  Briefcase,
  Users,
  Check,
  Laptop,
  UserX,
} from 'lucide-react';

export function EconomicEffectsScreen() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="air-economic-section" id="ch-economic">
      {/* ─── BACKGROUND IMAGE: SUNSET CITY SKYLINE & SMOKING STACKS ─── */}
      <div className="air-economic-bg" aria-hidden="true">
        <img
          src="/images/air-economic-bg.jpg"
          alt="Sunset city skyline overlooking river basin with industrial power plant smoking stacks on horizon"
          className="air-economic-bg-image"
        />
      </div>

      {/* Subtle atmospheric top scrim for navbar contrast */}
      <div className="air-economic-scrim-top" />

      {/* ─── TOP: HEADER ROW & FLOATING QUOTE ─── */}
      <div className="air-economic-header-row">
        <motion.div
          className="air-economic-header-left"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <span className="air-economic-eyebrow">CHAPTER 07</span>
          <h2 className="air-economic-title">
            Economic Effects <br />
            <span className="air-economic-title-accent">of Air Pollution</span>
          </h2>
          <p className="air-economic-desc">
            Air pollution not only affects human health but also causes significant economic losses.
            It impacts agriculture, forestry, materials, infrastructure, labor productivity, and the
            overall economy. The costs are both direct (damage and healthcare) and indirect (reduced
            productivity and quality of life).
          </p>
        </motion.div>

        {/* Top-Right Floating Quote Card (Exact Match to Mockup) */}
        <motion.div
          className="air-economic-quote-card"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <span className="air-economic-quote-mark">“</span>
          <p className="air-economic-quote-text">
            Air pollution has a high economic cost, reducing productivity, damaging infrastructure,
            harming agriculture and increasing healthcare expenses.
          </p>
        </motion.div>
      </div>

      {/* ─── MAIN 3-COLUMN CARDS GRID ─── */}
      <div className="air-economic-grid">
        {/* ═════════════════════════════════════════════════════════════ */}
        {/* COLUMN 1: AGRICULTURAL LOSSES & HEALTHCARE COSTS              */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="air-economic-col">
          {/* CARD 1: AGRICULTURAL LOSSES */}
          <motion.div
            className="air-glass-card air-card-agricultural"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="air-card-head">
              <div className="air-card-icon-wrap air-icon-wrap-green">
                <Sprout size={15} />
              </div>
              <h3 className="air-card-title">Agricultural Losses</h3>
            </div>

            {/* Split Comparison Photo */}
            <div className="air-agri-photo-box">
              <img
                src="/images/air-economic-agri.jpg"
                alt="Agricultural crop comparison between healthy crop and ozone/acid rain pollution damage"
                className="air-agri-photo-img"
              />
            </div>

            {/* Bullet points */}
            <ul className="air-economic-list air-list-agri">
              <li>
                <span className="air-bullet-leaf">🌱</span>
                <span>Reduced crop yield and quality</span>
              </li>
              <li>
                <span className="air-bullet-leaf">🌱</span>
                <span>Damage to leaves, photosynthesis and growth</span>
              </li>
              <li>
                <span className="air-bullet-leaf">🌱</span>
                <span>Loss of nutrient content</span>
              </li>
              <li>
                <span className="air-bullet-leaf">🌱</span>
                <span>Economic losses for farmers</span>
              </li>
            </ul>
          </motion.div>

          {/* CARD 4: HEALTHCARE COSTS */}
          <motion.div
            className="air-glass-card air-card-healthcare"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="air-card-head">
              <div className="air-card-icon-wrap air-icon-wrap-blue">
                <PlusCircle size={15} />
              </div>
              <h3 className="air-card-title">Healthcare Costs</h3>
            </div>

            <div className="air-healthcare-layout">
              <div className="air-hosp-thumb-wrap">
                <img
                  src="/images/air-economic-hospital.jpg"
                  alt="Modern hospital exterior and emergency ambulance"
                  className="air-hosp-thumb-img"
                />
              </div>

              <ul className="air-economic-list air-list-healthcare">
                <li>
                  <span className="air-bullet-medical">✦</span>
                  <span>Increased cases of respiratory and cardiovascular diseases</span>
                </li>
                <li>
                  <span className="air-bullet-medical">✦</span>
                  <span>Higher medical treatment costs</span>
                </li>
                <li>
                  <span className="air-bullet-medical">✦</span>
                  <span>Greater burden on healthcare systems</span>
                </li>
                <li>
                  <span className="air-bullet-medical">✦</span>
                  <span>Loss of income due to illness and absenteeism</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* COLUMN 2: DAMAGE TO MATERIALS & OVERALL ECONOMIC IMPACT       */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="air-economic-col">
          {/* CARD 2: DAMAGE TO MATERIALS & INFRASTRUCTURE */}
          <motion.div
            className="air-glass-card air-card-materials"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="air-card-head">
              <div className="air-card-icon-wrap air-icon-wrap-blue">
                <Building2 size={15} />
              </div>
              <h3 className="air-card-title">Damage to Materials & Infrastructure</h3>
            </div>

            {/* Before / After Photo Display */}
            <div className="air-monument-photo-box">
              <img
                src="/images/air-economic-monument.jpg"
                alt="Classical architectural monument before and after industrial soot and acid rain damage"
                className="air-monument-photo-img"
              />
            </div>

            <ul className="air-economic-list air-list-materials">
              <li>
                <span className="air-bullet-infra">🔩</span>
                <span>Corrosion of metals (buildings, bridges, vehicles)</span>
              </li>
              <li>
                <span className="air-bullet-infra">🏛️</span>
                <span>Deterioration of stone, concrete and historical monuments</span>
              </li>
              <li>
                <span className="air-bullet-infra">🎨</span>
                <span>Fading and degradation of paints, plastics and rubber</span>
              </li>
              <li>
                <span className="air-bullet-infra">🔧</span>
                <span>Increased maintenance and replacement costs</span>
              </li>
            </ul>
          </motion.div>

          {/* CARD 5: OVERALL ECONOMIC IMPACT */}
          <motion.div
            className="air-glass-card air-card-overall"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="air-card-head">
              <div className="air-card-icon-wrap air-icon-wrap-blue">
                <BarChart3 size={15} />
              </div>
              <h3 className="air-card-title">Overall Economic Impact</h3>
            </div>

            {/* 2x2 Metric Grid Matching Mockup */}
            <div className="air-macro-grid">
              {/* Metric 1: Billion $ */}
              <div className="air-macro-box air-macro-red">
                <div className="air-macro-icon-wrap">
                  <Coins size={18} />
                </div>
                <div className="air-macro-info">
                  <strong className="air-macro-val">Billion $</strong>
                  <span className="air-macro-sub">Annual economic losses worldwide</span>
                </div>
              </div>

              {/* Metric 2: 1–3% */}
              <div className="air-macro-box air-macro-amber">
                <div className="air-macro-icon-wrap">
                  <TrendingDown size={18} />
                </div>
                <div className="air-macro-info">
                  <strong className="air-macro-val">1–3%</strong>
                  <span className="air-macro-sub">of GDP loss in highly polluted regions</span>
                </div>
              </div>

              {/* Metric 3: Millions */}
              <div className="air-macro-box air-macro-emerald">
                <div className="air-macro-icon-wrap">
                  <Briefcase size={18} />
                </div>
                <div className="air-macro-info">
                  <strong className="air-macro-val">Millions</strong>
                  <span className="air-macro-sub">of work days lost every year</span>
                </div>
              </div>

              {/* Metric 4: Higher poverty risk */}
              <div className="air-macro-box air-macro-purple">
                <div className="air-macro-icon-wrap">
                  <Users size={18} />
                </div>
                <div className="air-macro-info">
                  <strong className="air-macro-val">Higher poverty risk</strong>
                  <span className="air-macro-sub">due to reduced livelihoods and agricultural income</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* COLUMN 3: LABOR PRODUCTIVITY, TOURISM & KEY TAKEAWAYS         */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="air-economic-col">
          {/* CARD 3: IMPACT ON LABOR PRODUCTIVITY */}
          <motion.div
            className="air-glass-card air-card-productivity"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <div className="air-card-head">
              <div className="air-card-icon-wrap air-icon-wrap-blue">
                <Settings size={15} />
              </div>
              <h3 className="air-card-title">Impact on Labor Productivity</h3>
            </div>

            {/* Comparison Side-by-Side Boxes */}
            <div className="air-labor-dual-wrap">
              {/* Healthy Box */}
              <div className="air-labor-box air-labor-healthy">
                <div className="air-labor-head">
                  <div className="air-labor-avatar air-avatar-cyan">
                    <Laptop size={14} />
                  </div>
                  <span className="air-labor-title">Healthy Environment</span>
                </div>
                <div className="air-labor-status">
                  <CheckCircle2 size={14} className="air-status-check" />
                </div>
                <p className="air-labor-desc">
                  Higher productivity, better concentration and less sick leave
                </p>
              </div>

              {/* Polluted Box */}
              <div className="air-labor-box air-labor-polluted">
                <div className="air-labor-head">
                  <div className="air-labor-avatar air-avatar-rose">
                    <UserX size={14} />
                  </div>
                  <span className="air-labor-title">Polluted Environment</span>
                </div>
                <div className="air-labor-status">
                  <ArrowDownCircle size={14} className="air-status-down" />
                </div>
                <p className="air-labor-desc">
                  More respiratory problems, fatigue and reduced work efficiency
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 6: TOURISM AND HERITAGE */}
          <motion.div
            className="air-glass-card air-card-tourism"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <div className="air-card-head">
              <div className="air-card-icon-wrap air-icon-wrap-blue">
                <Landmark size={15} />
              </div>
              <h3 className="air-card-title">Tourism and Heritage</h3>
            </div>

            <div className="air-tourism-layout">
              <div className="air-taj-thumb-wrap">
                <img
                  src="/images/air-economic-taj.jpg"
                  alt="Taj Mahal in Agra shrouded in atmospheric particulate smog"
                  className="air-taj-thumb-img"
                />
              </div>

              <ul className="air-economic-list air-list-tourism">
                <li>
                  <span className="air-bullet-star">✦</span>
                  <span>Damage to historical monuments (e.g. Taj Mahal due to SO₂ and PM)</span>
                </li>
                <li>
                  <span className="air-bullet-star">✦</span>
                  <span>Loss of tourism revenue</span>
                </li>
                <li>
                  <span className="air-bullet-star">✦</span>
                  <span>Increased conservation costs</span>
                </li>
                <li>
                  <span className="air-bullet-star">✦</span>
                  <span>Deterioration of cultural heritage</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* CARD 7: KEY TAKEAWAYS */}
          <motion.div
            className="air-glass-card air-card-takeaways"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <div className="air-card-head">
              <div className="air-card-icon-wrap air-icon-wrap-blue">
                <Lightbulb size={15} />
              </div>
              <h3 className="air-card-title">Key Takeaways</h3>
            </div>

            <ul className="air-economic-list air-list-takeaways">
              <li>
                <span className="air-takeaway-check">
                  <Check size={9} strokeWidth={3} />
                </span>
                <span>Air pollution causes significant economic losses.</span>
              </li>
              <li>
                <span className="air-takeaway-check">
                  <Check size={9} strokeWidth={3} />
                </span>
                <span>It affects agriculture, infrastructure, healthcare and productivity.</span>
              </li>
              <li>
                <span className="air-takeaway-check">
                  <Check size={9} strokeWidth={3} />
                </span>
                <span>The costs are both direct and indirect.</span>
              </li>
              <li>
                <span className="air-takeaway-check">
                  <Check size={9} strokeWidth={3} />
                </span>
                <span>
                  Reducing air pollution can lead to healthier people, stronger economies and a
                  more sustainable future.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
