import React, { useState } from 'react';
import { Mountain, ArrowRight, ArrowLeft, Users2, Activity, X, CloudRain, Clock, Leaf } from 'lucide-react';
import { TiltCard, Reveal } from './motion';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function SoilFormationScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  const [activeHorizon, setActiveHorizon] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeFactor, setActiveFactor] = useState<string | null>(null);
  const [activeEnv, setActiveEnv] = useState<string | null>(null);
  const [detailModal, setDetailModal] = useState<{
    title: string;
    subtitle: string;
    badge: string;
    color: string;
    points: string[];
    quote?: string;
  } | null>(null);

  const horizons = [
    {
      id: 'O',
      name: 'O Horizon',
      sub: 'Organic layer (decomposed material)',
      color: '#8c5938',
      dotColor: '#e5a158',
      quote: 'Organic layer formed by decomposing leaves, plants, and microorganisms.',
      fullDesc: 'Decomposed organic matter — litter, roots, humus. Rich in carbon, formed by decaying plant and animal materials that nourish the soil food web.',
      points: [
        'Uppermost surface layer dominated by organic matter in various stages of decomposition.',
        'Contains dark colloidal humus that maximizes water retention and soil aggregation.',
        'Crucial biological habitat for detritus organisms and mycorrhizal fungi.',
      ],
    },
    {
      id: 'A',
      name: 'A Horizon',
      sub: 'Topsoil (rich in humus, nutrients)',
      color: '#704728',
      dotColor: '#c98242',
      quote: 'Primary plant-growth horizon containing maximum biological activity.',
      fullDesc: 'Rich in humus and mineral nutrients. Supports most plant root activity. Darkest mineral layer due to accumulated organic matter from pedogenesis.',
      points: [
        'The true topsoil layer where terrestrial plants extract vital mineral nutrients (N, P, K).',
        'Subject to leaching and eluvial transfer of soluble minerals to lower layers.',
        'High microbiological activity: Rhizobium nitrogen fixation and organic decomposition.',
      ],
    },
    {
      id: 'B',
      name: 'B Horizon',
      sub: 'Subsoil (accumulation of clay, minerals)',
      color: '#9e5a2b',
      dotColor: '#c9773b',
      quote: 'Zone of accumulation (illuviation) where leached minerals collect.',
      fullDesc: 'Accumulation zone for clay, iron oxides and minerals leached from above. Less organic matter than topsoil, higher mineral density.',
      points: [
        'Enriched in silicate clays, iron, aluminium compounds, and carbonates washed down from A horizon.',
        'Provides physical anchoring for deep tree taproots and acts as a moisture reservoir.',
        'Characterized by blocky or prismatic structural aggregates with reddish-brown hues.',
      ],
    },
    {
      id: 'C',
      name: 'C Horizon',
      sub: 'Weathered parent material (small rock fragments)',
      color: '#a8865e',
      dotColor: '#d6b280',
      quote: 'Transition zone of mechanically fractured and chemically weathered rock.',
      fullDesc: 'Partially weathered parent rock fragments with minimal biological activity. The transitional boundary between bedrock and developing regolith.',
      points: [
        'Consists of unweathered or partially weathered geological parent material.',
        'Virtually devoid of organic carbon and biological activity.',
        'Represents the starting material transformed by physical and chemical weathering.',
      ],
    },
    {
      id: 'R',
      name: 'R Horizon',
      sub: 'Bedrock (unweathered rock)',
      color: '#6e7582',
      dotColor: '#9aa2b0',
      quote: 'Unweathered, massive solid rock underlying the soil column.',
      fullDesc: 'Unweathered solid bedrock — granite, basalt, sandstone, or limestone — the ultimate parent geological foundation of all terrestrial soil.',
      points: [
        'Continuous consolidated rock mass providing the chemical source minerals of soil.',
        'Completely impermeable to root penetration except along tectonic fissures.',
        'Takes centuries to millennia of continuous physical/chemical weathering to disintegrate.',
      ],
    },
  ];

  const topFactors = [
    {
      id: 'parent',
      title: 'Parent Material',
      sub: 'Weathered rock fragments',
      icon: Mountain,
      detail: 'The geological rock base whose mineral composition dictates soil texture, natural chemistry, and initial nutrient pool.',
    },
    {
      id: 'climate',
      title: 'Climate',
      sub: 'Temperature and rainfall',
      icon: CloudRain,
      detail: 'Precipitation and seasonal temperatures control the kinetic rate of chemical weathering, leaching, and biological decomposition.',
    },
    {
      id: 'organisms',
      title: 'Organisms',
      sub: 'Plants, animals and microbes',
      icon: Leaf,
      detail: 'Flora, soil fauna (earthworms), and microbial communities contribute raw organic matter, synthesize humus, and aerate soil.',
    },
    {
      id: 'time',
      title: 'Time',
      sub: 'Years to thousands of years',
      icon: Clock,
      detail: 'Soil formation (pedogenesis) is an extraordinarily slow process requiring decades or centuries to generate even a single centimetre.',
    },
  ];

  const formationProcessSteps = [
    {
      num: '1',
      title: '1. Rock Weathering',
      desc: 'Rocks break down due to temperature changes, water, wind and ice.',
      img: '/images/soil-step-weathering.jpg',
      fullText: 'Mechanical fracturing and chemical weathering (exfoliation, freeze-thaw, hydration) disintegrate solid bedrock into fine mineral regolith.',
    },
    {
      num: '2',
      title: '2. Organic Matter Addition',
      desc: 'Dead plants and animals decay and mix with weathered material.',
      img: '/images/soil-step-organic.jpg',
      fullText: 'Pioneer lichens, mosses, and falling leaf litter deposit biological carbon into the upper regolith, creating raw detritus for microorganisms.',
    },
    {
      num: '3',
      title: '3. Mixing & Transformation',
      desc: 'Microorganisms and soil organisms break down material and form humus.',
      img: '/images/soil-step-mixing.jpg',
      fullText: 'Soil fauna like earthworms and decomposing microbes digest raw organic debris, converting it into dark, stable, nutrient-dense humus.',
    },
    {
      num: '4',
      title: '4. Mature Soil',
      desc: 'Distinct layers (horizons) form over time.',
      img: '/images/soil-step-mature.jpg',
      fullText: 'Over decades and centuries, continuous downward water percolation and pedogenesis differentiate the soil into stable, fertile O, A, B, C, and R horizons.',
    },
  ];

  const handleStepClick = (idx: number) => {
    const step = formationProcessSteps[idx];
    if (!step) return;
    setActiveStep(idx);
    setDetailModal({
      title: step.title,
      subtitle: 'Pedological Stage Breakdown',
      badge: `STAGE 0${step.num}`,
      color: '#f1cb74',
      quote: step.fullText,
      points: [
        step.desc,
        'Forms an integral mechanism of pedogenesis described in BCV755B notes.',
        'Requires decades to centuries to stabilize and sustain terrestrial ecology.',
      ],
    });
  };

  const factorsGrid = [
    {
      id: 'parent',
      title: 'Parent Material',
      desc: 'Type and composition of the original rock',
      icon: Mountain,
    },
    {
      id: 'climate',
      title: 'Climate',
      desc: 'Temperature and rainfall patterns',
      icon: CloudRain,
    },
    {
      id: 'organisms',
      title: 'Organisms',
      desc: 'Plants, animals and microbes',
      icon: Leaf,
    },
    {
      id: 'time',
      title: 'Time',
      desc: 'Long periods (centuries to millennia)',
      icon: Clock,
    },
    {
      id: 'topography',
      title: 'Topography',
      desc: 'Slope and drainage affect soil thickness',
      icon: Activity,
    },
    {
      id: 'human',
      title: 'Human Activity',
      desc: 'Agriculture, deforestation and construction',
      icon: Users2,
    },
  ];

  const environmentProfiles = [
    {
      id: 'forest',
      name: 'Forest Soil',
      desc: 'Thick, dark, rich in organic matter',
      img: '/images/soil-env-forest.jpg',
    },
    {
      id: 'grassland',
      name: 'Grassland Soil',
      desc: 'Moderate organic matter, deeper roots',
      img: '/images/soil-env-grassland.jpg',
    },
    {
      id: 'desert',
      name: 'Desert Soil',
      desc: 'Thin, low organic matter, more sand',
      img: '/images/soil-env-desert.jpg',
    },
    {
      id: 'wetland',
      name: 'Wetland Soil',
      desc: 'High organic matter, often waterlogged',
      img: '/images/soil-env-wetland.jpg',
    },
  ];

  return (
    <section className="land-screen land-soil-screen" id="ch-soil">
      {/* ─── Seamless Clean Photo Backdrop (No Baked-In Text) ─── */}
      <div
        className="soil-backdrop-photo"
        style={{ backgroundImage: `url('/images/soil-formation-hero-clean.jpg')` }}
      >
        <div className="soil-backdrop-scrim" />
      </div>

      <div className="land-screen-inner soil-screen-content-inner">
        {/* ================================================================
            UPPER HERO STAGE: Title + 4 Cards + 3D Soil Cube with Callouts
           ================================================================ */}
        <div className="soil-upper-hero-stage">
          {/* Left Column: Heading + Lead + 4 Soil Factors */}
          <div className="soil-hero-left-col">
            <span className="screen-ch-tag">
              MODULE 01 <span>|</span> CHAPTER 06
            </span>

            <h2 className="screen-main-title soil-screen-headline">
              Soil <em className="soil-title-accent">Formation</em>
            </h2>

            <h3 className="soil-screen-subheadline">From rocks to life.</h3>

            <p className="soil-screen-lead-copy">
              Soil is formed by the weathering of rocks and the action of living organisms over long
              periods of time. It is a dynamic resource that supports plant life, holds water and nutrients,
              and sustains ecosystems.
            </p>

            {/* 4 Soil Factor Cards */}
            <div className="soil-top-factors-row">
              {topFactors.map((f) => {
                const IconComponent = f.icon;
                const isSelected = activeFactor === f.id;
                return (
                  <TiltCard
                    key={f.id}
                    className={`soil-factor-glass-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      setActiveFactor(f.id);
                      setDetailModal({
                        title: f.title,
                        subtitle: 'Primary Soil Forming Factor',
                        badge: 'PEDOLOGY FACTOR',
                        color: '#c9a15a',
                        quote: f.detail,
                        points: [
                          'Identified in lecture notes as a fundamental determinant of soil properties.',
                          'Interacts dynamically with climate, organisms, and topography over time.',
                          'Takes decades to centuries to establish stable soil equilibrium.',
                        ],
                      });
                    }}
                    onKeyDown={keyActivate(() => {
                      setActiveFactor(f.id);
                      setDetailModal({
                        title: f.title,
                        subtitle: 'Primary Soil Forming Factor',
                        badge: 'PEDOLOGY FACTOR',
                        color: '#c9a15a',
                        quote: f.detail,
                        points: [
                          'Identified in lecture notes as a fundamental determinant of soil properties.',
                          'Interacts dynamically with climate, organisms, and topography over time.',
                          'Takes decades to centuries to establish stable soil equilibrium.',
                        ],
                      });
                    })}
                    role="button"
                    tabIndex={0}
                    title="Click for factor syllabus details"
                    spotlight
                    max={6}
                  >
                    <div className="soil-factor-icon-wrap">
                      <IconComponent size={18} strokeWidth={1.8} />
                    </div>
                    <div className="soil-factor-info">
                      <strong className="soil-factor-title">{f.title}</strong>
                      <span className="soil-factor-sub">{f.sub}</span>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Soil Profile Interactive Callouts Overlay */}
          <div className="soil-cube-interactive-zone">
            {/* Top Plant Callout Chip */}
            <div
              className="soil-plant-top-callout"
              onClick={() => {
                setDetailModal({
                  title: 'Plants & Organic Matter',
                  subtitle: 'Vegetation Canopy & Humus Layer',
                  badge: 'O HORIZON / BIOMASS',
                  color: '#6fa96b',
                  quote:
                    'Living plants and decomposing leaf litter form the protective organic skin that shields soil from erosion and sustains soil biodiversity.',
                  points: [
                    'Decaying leaves, grass roots, and micro-fauna synthesize rich organic humus.',
                    'Protects mineral topsoil from destructive raindrop impact and wind erosion.',
                    'Deep root channels promote water infiltration and microbial nutrient cycling.',
                  ],
                });
              }}
              role="button"
              tabIndex={0}
              title="Click to view Organic Layer notes"
            >
              <div className="plant-callout-card">
                <span className="plant-callout-icon">
                  <Leaf size={14} className="icon-leaf-green" />
                </span>
                <div className="plant-callout-text">
                  <strong>Plants &amp; Organic Matter</strong>
                  <span>(Litter, roots, humus)</span>
                </div>
              </div>
              <div className="plant-callout-stem">
                <span className="stem-line" />
                <span className="stem-dot" />
              </div>
            </div>

            {/* 5 Stacked Horizon Cards with Dotted Leader Lines */}
            <div className="soil-horizons-cards-stack">
              {horizons.map((h, i) => {
                const isSelected = activeHorizon === i;
                return (
                  <div
                    key={h.id}
                    className={`soil-horizon-card-item ${isSelected ? 'is-active-horizon' : ''}`}
                    onClick={() => {
                      setActiveHorizon(i);
                      setDetailModal({
                        title: h.name,
                        subtitle: h.sub,
                        badge: `HORIZON [${h.id}]`,
                        color: h.dotColor,
                        quote: h.quote,
                        points: h.points,
                      });
                    }}
                    onKeyDown={keyActivate(() => {
                      setActiveHorizon(i);
                      setDetailModal({
                        title: h.name,
                        subtitle: h.sub,
                        badge: `HORIZON [${h.id}]`,
                        color: h.dotColor,
                        quote: h.quote,
                        points: h.points,
                      });
                    })}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Horizontal Connector Line pointing to soil cube */}
                    <div className="horizon-connector-track">
                      <span className="connector-dot" style={{ background: h.dotColor }} />
                      <span className="connector-dash" />
                    </div>

                    <div className="horizon-card-pill">
                      <div className="horizon-color-pip" style={{ background: h.color }} />
                      <div className="horizon-pill-copy">
                        <strong className="horizon-pill-name">{h.name}</strong>
                        <span className="horizon-pill-sub">{h.sub}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================
            LOWER PANELS: 3 Liquid Glass Cards
            1. The Soil Formation Process (4 Steps)
            2. Factors Affecting Soil Formation (6 Grid)
            3. Soil Profile in Different Environments (4 Grid)
           ================================================================ */}
        <div className="soil-lower-cards-grid">
          {/* Card 01: The Soil Formation Process */}
          <Reveal dir="up" className="soil-panel-card soil-process-card-panel">
            <div className="soil-panel-header">
              <h4 className="soil-panel-title">The Soil Formation Process</h4>
              <p className="soil-panel-subtitle">
                Soil forms through the combined action of physical, chemical and biological processes.
              </p>
            </div>

            <div className="soil-process-steps-track">
              {formationProcessSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div key={step.num} className="soil-process-step-node">
                    <div
                      className={`process-step-thumb-circle ${isActive ? 'is-focused-step' : ''}`}
                      onClick={() => handleStepClick(idx)}
                      onKeyDown={keyActivate(() => handleStepClick(idx))}
                      role="button"
                      tabIndex={0}
                      title="Click for stage breakdown"
                    >
                      <div
                        className="thumb-circle-inner"
                        style={{ backgroundImage: `url('${step.img}')` }}
                      />
                      <span className="thumb-circle-glow" />
                    </div>

                    <div className="process-step-texts">
                      <strong className="process-step-title">{step.title}</strong>
                      <p className="process-step-desc">{step.desc}</p>
                    </div>

                    {idx < formationProcessSteps.length - 1 && (
                      <span className="process-step-arrow-divider" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Card 02: Factors Affecting Soil Formation */}
          <Reveal dir="up" delay={80} className="soil-panel-card soil-factors-card-panel">
            <div className="soil-panel-header">
              <h4 className="soil-panel-title">Factors Affecting Soil Formation</h4>
            </div>

            <div className="soil-factors-two-col-grid">
              {factorsGrid.map((f) => {
                const FactorIcon = f.icon;
                return (
                  <div
                    key={f.id}
                    className="soil-factor-mini-cell"
                    onClick={() => {
                      setDetailModal({
                        title: f.title,
                        subtitle: 'Environmental & Anthropogenic Driver',
                        badge: 'SOIL FACTOR',
                        color: '#c9a15a',
                        quote: f.desc,
                        points: [
                          'Key physical/biological factor evaluated in Soil Science Society of America guidelines.',
                          'Determines soil horizon depth, fertility, compaction, and nutrient availability.',
                          'Human land-use changes can accelerate degradation if factors are disrupted.',
                        ],
                      });
                    }}
                    onKeyDown={keyActivate(() => {
                      setDetailModal({
                        title: f.title,
                        subtitle: 'Environmental & Anthropogenic Driver',
                        badge: 'SOIL FACTOR',
                        color: '#c9a15a',
                        quote: f.desc,
                        points: [
                          'Key physical/biological factor evaluated in Soil Science Society of America guidelines.',
                          'Determines soil horizon depth, fertility, compaction, and nutrient availability.',
                          'Human land-use changes can accelerate degradation if factors are disrupted.',
                        ],
                      });
                    })}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="mini-factor-icon">
                      <FactorIcon size={16} strokeWidth={1.8} />
                    </div>
                    <div className="mini-factor-info">
                      <strong>{f.title}</strong>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Card 03: Soil Profile in Different Environments */}
          <Reveal dir="up" delay={160} className="soil-panel-card soil-env-card-panel">
            <div className="soil-panel-header">
              <h4 className="soil-panel-title">Soil Profile in Different Environments</h4>
            </div>

            <div className="soil-env-two-col-grid">
              {environmentProfiles.map((env) => {
                return (
                  <div
                    key={env.id}
                    className="soil-env-preview-cell"
                    onClick={() => {
                      setActiveEnv(env.id);
                      setDetailModal({
                        title: env.name,
                        subtitle: 'Ecosystem Soil Horizon Adaptations',
                        badge: 'BIOME PEDOLOGY',
                        color: '#4fa3c7',
                        quote: env.desc,
                        points: [
                          'Directly reflects regional precipitation, canopy cover, and biomass turnover.',
                          'Vulnerable to deforestation, excessive tillage, and land degradation.',
                          'Soil conservation methods must be tailored to these environmental conditions.',
                        ],
                      });
                    }}
                    onKeyDown={keyActivate(() => {
                      setActiveEnv(env.id);
                      setDetailModal({
                        title: env.name,
                        subtitle: 'Ecosystem Soil Horizon Adaptations',
                        badge: 'BIOME PEDOLOGY',
                        color: '#4fa3c7',
                        quote: env.desc,
                        points: [
                          'Directly reflects regional precipitation, canopy cover, and biomass turnover.',
                          'Vulnerable to deforestation, excessive tillage, and land degradation.',
                          'Soil conservation methods must be tailored to these environmental conditions.',
                        ],
                      });
                    })}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className="env-cell-photo"
                      style={{ backgroundImage: `url('${env.img}')` }}
                    />
                    <div className="env-cell-info">
                      <strong>{env.name}</strong>
                      <p>{env.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Bottom Navigation */}
        <div className="soil-bottom-navigation-bar">
          <button type="button" className="soil-nav-btn prev-btn" onClick={onPrev}>
            <div className="nav-arrow-bead">
              <ArrowLeft size={14} />
            </div>
            <div className="nav-btn-copy">
              <span className="nav-action-label">Previous</span>
              <span className="nav-target-title">Land as a Resource</span>
            </div>
          </button>

          <div className="soil-pagination-dots-strip">
            <ChapterDots activeIndex={5} onJump={onJumpChapter} className="soil-pagination-dots-strip" />
          </div>

          <button type="button" className="soil-nav-btn next-btn is-gold-cta" onClick={onNext}>
            <div className="nav-btn-copy">
              <span className="nav-action-label">Next</span>
              <span className="nav-target-title">Land Forms</span>
            </div>
            <div className="nav-arrow-bead">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Detail Modal for Soil Formation */}
      {detailModal && (
        <div className="soil-detail-modal-overlay" onClick={() => setDetailModal(null)}>
          <div
            className="soil-detail-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{ '--modal-accent': detailModal.color } as React.CSSProperties}
          >
            <button
              type="button"
              className="modal-close-icon-btn"
              onClick={() => setDetailModal(null)}
              aria-label="Close details"
            >
              <X size={16} />
            </button>

            <div className="modal-header-hero">
              <span className="modal-badge-pill" style={{ color: detailModal.color }}>
                {detailModal.badge}
              </span>
              <h3 className="modal-headline-title">{detailModal.title}</h3>
              <p className="modal-sub-label">{detailModal.subtitle}</p>
            </div>

            <div className="modal-quote-block">
              <p className="modal-quote-text">“{detailModal.quote}”</p>
            </div>

            <div className="modal-bullet-points-stack">
              <span className="modal-section-title">KEY SYLLABUS TAKEAWAYS (BCV755B):</span>
              {detailModal.points.map((pt, i) => (
                <div key={i} className="modal-point-item">
                  <span className="modal-point-bullet" style={{ background: detailModal.color }} />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="modal-actions-footer">
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setDetailModal(null)}
              >
                <span>Done exploring</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


// SCREEN 07: LAND FORMS (Matching user reference mockup)
