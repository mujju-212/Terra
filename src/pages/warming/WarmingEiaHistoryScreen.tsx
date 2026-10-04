import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Globe,
  TrendingUp,
  Brain,
  Users,
  ShieldCheck,
  FileText,
  Scale,
  Coins,
  Compass,
  ArrowRight,
  BookOpen,
  MapPin,
  Lightbulb,
  X,
  ExternalLink,
  Award,
  Sparkles,
} from 'lucide-react';
import './WarmingEiaHistoryScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

// ── Types ──
interface BenefitItem {
  id: string;
  theme: string;
  title: string;
  icon: typeof Leaf;
  iconColor: string;
  detail: string;
  caseStudy: string;
}

interface GlobalMilestone {
  year: string;
  country: string;
  flagType: 'usa' | 'canada' | 'eu' | 'global' | 'india';
  tint: string;
  desc: string;
  expandedContext: string;
}

interface IndiaMilestone {
  year: string;
  color: string;
  desc: string;
  expandedContext: string;
}

// ── Data: 9 Key Benefits of EIA (Matches Mockup 3x3) ──
const benefitsData: BenefitItem[] = [
  {
    id: 'b1',
    theme: 'theme-emerald',
    title: 'Prevents or minimizes environmental damage',
    icon: Leaf,
    iconColor: '#34d399',
    detail: 'EIA forecasts potential degradation prior to groundbreaking, mandating zero-discharge systems, buffer zones, and greenbelts.',
    caseStudy: 'Helped preserve sensitive riverine floodplains from toxic industrial runoff in major dam installations.',
  },
  {
    id: 'b2',
    theme: 'theme-blue',
    title: 'Promotes sustainable development',
    icon: TrendingUp,
    iconColor: '#60a5fa',
    detail: 'Balances industrial and infrastructure progress with the carrying capacity of supporting ecosystems, ensuring intergenerational equity.',
    caseStudy: 'Guarantees that resource extraction rates remain within the natural regenerative thresholds of local aquifers and forests.',
  },
  {
    id: 'b3',
    theme: 'theme-purple',
    title: 'Supports informed decision-making',
    icon: Brain,
    iconColor: '#c084fc',
    detail: 'Equips clearance committees, ministries, and regulatory bodies with hard scientific data rather than anecdotal assumptions.',
    caseStudy: 'Replaces discretionary permits with mathematical air dispersion and hydrological plume modeling.',
  },
  {
    id: 'b4',
    theme: 'theme-orange',
    title: 'Considers social and economic impacts',
    icon: Users,
    iconColor: '#fb923c',
    detail: 'Evaluates community displacement, livelihood disruptions, and indigenous rights through structured Social Impact Assessments (SIA).',
    caseStudy: 'Mandates compensation packages and rehabilitation programs for project-affected families (PAFs).',
  },
  {
    id: 'b5',
    theme: 'theme-rose',
    title: 'Identifies and suggests mitigation measures',
    icon: ShieldCheck,
    iconColor: '#fb7185',
    detail: 'Formulates an actionable Environmental Management Plan (EMP) specifying equipment like ESPs, FGDs, and noise baffles.',
    caseStudy: 'Prescribes mandatory fly ash utilization and particulate arrestors in thermal power plants.',
  },
  {
    id: 'b6',
    theme: 'theme-amber',
    title: 'Enhances transparency and public participation',
    icon: FileText,
    iconColor: '#facc15',
    detail: 'Mandatory public hearings ensure local voices, NGOs, and downstream communities scrutinize project blueprints before sign-off.',
    caseStudy: 'Public feedback directly led to redesigning highway alignments away from sacred groves and schools.',
  },
  {
    id: 'b7',
    theme: 'theme-cyan',
    title: 'Helps in compliance with environmental laws and policies',
    icon: Scale,
    iconColor: '#22d3ee',
    detail: 'Aligns proposed mega-projects with the Air Act (1981), Water Act (1974), and Environment (Protection) Act (1986).',
    caseStudy: 'Forms the statutory foundation for Central and State Pollution Control Board clearance conditions.',
  },
  {
    id: 'b8',
    theme: 'theme-pink',
    title: 'Avoids costly environmental and social conflicts later',
    icon: Coins,
    iconColor: '#f472b6',
    detail: 'Pre-construction design tweaks cost a fraction of post-construction litigation, project shutdowns, or retroactive cleanup penalties.',
    caseStudy: 'Prevents multi-million-dollar court injunctions and retrospective plant demolitions.',
  },
  {
    id: 'b9',
    theme: 'theme-indigo',
    title: 'Builds a more resilient and sustainable future',
    icon: Compass,
    iconColor: '#a78bfa',
    detail: 'Incorporates climate change adaptation, disaster preparedness, and ecological longevity into long-term infrastructure designs.',
    caseStudy: 'Reinforces coastal ports and coastal urban corridors against projected 100-year sea-level surges.',
  },
];

// ── Data: 5 Global Milestones (Matches Mockup Timeline) ──
const globalMilestones: GlobalMilestone[] = [
  {
    year: '1970',
    country: 'USA',
    flagType: 'usa',
    tint: 'tint-blue',
    desc: 'National Environmental Policy Act (NEPA) introduces EIA. First formal EIA requirement in the world.',
    expandedContext: 'Signed into law by President Nixon on January 1, 1970. Section 102(2)(C) pioneered Environmental Impact Statements (EIS) for federal actions significantly affecting the human environment.',
  },
  {
    year: '1973',
    country: 'Canada',
    flagType: 'canada',
    tint: 'tint-green',
    desc: 'Adopts EIA processes at the federal level.',
    expandedContext: 'Established via Cabinet directive through the Environmental Assessment and Review Process (EARP), later codified as the Canadian Environmental Assessment Act (CEAA).',
  },
  {
    year: '1985',
    country: 'EU',
    flagType: 'eu',
    tint: 'tint-amber',
    desc: 'EIA Directive (85/337/EEC) for member states.',
    expandedContext: 'Harmonized assessment principles across the European Economic Community, establishing Annex I (mandatory EIA) and Annex II (screening discretion) project categories.',
  },
  {
    year: '1990s',
    country: 'Global',
    flagType: 'global',
    tint: 'tint-purple',
    desc: 'EIA becomes a widely accepted international practice.',
    expandedContext: 'Endorsed by the 1992 Rio Earth Summit (Principle 17 of Rio Declaration) and made a strict lending precondition by the World Bank, ADB, and international finance institutions.',
  },
  {
    year: '2006',
    country: 'India',
    flagType: 'india',
    tint: 'tint-orange',
    desc: 'EIA Notification 2006 provides a legal framework for EIA in India.',
    expandedContext: 'Superseded the 1994 notification. Decentralized clearances between Category A (MoEFCC at central level) and Category B (SEIAA at state level), introducing structured 4-stage processing.',
  },
];

// ── Data: 6 India Milestones (Matches Mockup India Journey) ──
const indiaMilestones: IndiaMilestone[] = [
  {
    year: '1986',
    color: '#38bdf8',
    desc: 'Environment (Protection) Act',
    expandedContext: 'Enacted in the wake of the 1984 Bhopal Gas Tragedy under Article 253 of the Constitution. Serves as the overarching umbrella legislation empowering statutory EIA rules.',
  },
  {
    year: '1994',
    color: '#34d399',
    desc: 'First EIA Notification',
    expandedContext: 'Issued under Rule 5 of Environment (Protection) Rules 1986. Made environmental clearance mandatory for 29 designated industrial activities and expansion projects.',
  },
  {
    year: '2006',
    color: '#fbbf24',
    desc: 'EIA Notification (major revision)',
    expandedContext: 'Substantially restructured environmental governance. Introduced Category A & B classification, EAC/SEAC appraisal, and formalized the 4 stages: Screening, Scoping, Public Consultation, Appraisal.',
  },
  {
    year: '2016',
    color: '#f43f5e',
    desc: 'Further amendments',
    expandedContext: 'Delegated minor mineral mining permits (sand, gravel) up to 5 hectares to District Level Environmental Impact Assessment Authorities (DEIAA).',
  },
  {
    year: '2020',
    color: '#a855f7',
    desc: 'Simplification & category restructuring',
    expandedContext: 'Draft notification published aiming to standardize ToR, expand post-facto compliance reporting, and digitize national clearance portals through PARIVESH.',
  },
  {
    year: '2023',
    color: '#06b6d4',
    desc: 'Ongoing refinements',
    expandedContext: 'Enhanced PARIVESH 2.0 portal with automated GIS screening, real-time drone tracking, Star Rating of SEIAA states, and standardized compliance monitoring.',
  },
];

export function WarmingEiaHistoryScreen() {
  const [activeModal, setActiveModal] = useState<{
    title: string;
    badge: string;
    badgeColor: string;
    body: string;
    subtext?: string;
  } | null>(null);

  useModalScrollLock(Boolean(activeModal), () => setActiveModal(null));

  return (
    <section
      className="warming-chapter-screen eia-history-screen-container"
      id="ch-10-eia-history"
      aria-label="Chapter 11: EIA Benefits & History"
    >
      {/* ── Background Layer with Subtle Image & Deep Night Vignette ── */}
      <div className="eia-history-screen-bg">
        <img
          src="/images/warming-eia-intro-bg.jpg"
          alt="EIA Global History & Benefits Architecture Backdrop"
          loading="lazy"
        />
        <div className="eia-history-screen-vignette" />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          TOP BAR: MODULE EYEBROW, TITLE, NEPA PARCHMENT MOTIF, QUOTE CARD
          ────────────────────────────────────────────────────────────────────── */}
      <header className="eia-history-top-bar">
        {/* Left: Eyebrow + Titles */}
        <div className="eia-history-header-block">
          <div className="eia-history-eyebrow">
            <Sparkles size={13} className="text-amber-400" />
            <span>MODULE 05 | CHAPTER 11</span>
          </div>
          <h2 className="eia-history-main-title">EIA Benefits &amp; History</h2>
          <h3 className="eia-history-subtitle">From Origin to a Global Practice</h3>
          <p className="eia-history-lead-text">
            Environmental Impact Assessment (EIA) has grown from a national requirement in the USA to a globally adopted tool. It provides multiple benefits by integrating environmental, social and economic considerations into decision-making, and today it is widely practiced, including in India.
          </p>
        </div>

        {/* Center: Antique NEPA 1970 Parchment + Globe Horizon */}
        <div className="eia-history-hero-artwork">
          <div
            className="nepa-parchment-card"
            title="NEPA 1970 — The origin of formal EIA legislation"
            onClick={() =>
              setActiveModal({
                title: 'National Environmental Policy Act (NEPA) of 1969',
                badge: 'US STATUTORY ORIGIN · 1970',
                badgeColor: '#fbbf24',
                body: 'Enacted by the US Congress and signed into law on January 1, 1970, NEPA is widely regarded as the Magna Carta of modern environmental legislation. Section 102(2)(C) mandated that every major federal action significantly affecting the quality of the human environment must prepare a detailed Environmental Impact Statement (EIS). This historic requirement gave birth to the global discipline of Environmental Impact Assessment.',
                subtext: 'Paved the way for over 120 national statutes and multilateral covenants worldwide.',
              })
            }
          >
            <div className="nepa-parchment-seal">
              <Award size={14} />
            </div>
            <div>
              <div className="nepa-parchment-header">United States Congress</div>
              <h4 className="nepa-parchment-title">National Environmental Policy Act</h4>
              <div className="nepa-parchment-acronym">(NEPA)</div>
            </div>
            <div className="nepa-parchment-year">1970</div>
          </div>

          <div className="hero-globe-glow" />

          {/* Clean Cityscape / Earth Panorama Composite */}
          <div className="hero-cityscape-composite">
            <img
              src="/images/air-clean-cityscape.jpg"
              alt="Global Sustainable Architecture and Clean Ecosystem"
              loading="lazy"
            />
            <div className="hero-cityscape-overlay" />
          </div>
        </div>

        {/* Right: Quote Box */}
        <aside className="eia-history-quote-box" aria-label="EIA Core Purpose Quote">
          <span className="quote-mark-icon" aria-hidden="true">
            “
          </span>
          <blockquote className="eia-history-quote-text">
            “EIA helps us learn from the past, plan for the present, and protect the future.”
          </blockquote>
        </aside>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          MIDDLE STAGE: KEY BENEFITS (LEFT) & GLOBAL HISTORY (RIGHT)
          ────────────────────────────────────────────────────────────────────── */}
      <div className="eia-history-middle-grid">
        {/* ── Left Container: Key Benefits of EIA (3×3 Grid) ── */}
        <section className="eia-panel" aria-label="Key Benefits of EIA">
          <div className="eia-panel-header">
            <div className="eia-panel-title-group">
              <div className="eia-panel-badge-icon badge-green">
                <Leaf size={16} />
              </div>
              <h3 className="eia-panel-title">Key Benefits of EIA</h3>
            </div>
            <button
              type="button"
              className="eia-panel-action-btn"
              title="Explore all benefits"
              onClick={() =>
                setActiveModal({
                  title: 'Core Benefits of the EIA Framework',
                  badge: 'ENVIRONMENTAL GOVERNANCE',
                  badgeColor: '#34d399',
                  body: 'Environmental Impact Assessment transforms decision-making from reactive remediation to proactive ecological foresight. By identifying ecological, social, and economic hazards during the feasibility phase, projects can be re-engineered, relocated, or augmented with tailored mitigation measures, ensuring that development enhances societal welfare without destroying critical natural capital.',
                })
              }
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="benefits-3x3-grid">
            {benefitsData.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className={`benefit-card-tile ${item.theme}`}
                  onClick={() =>
                    setActiveModal({
                      title: item.title,
                      badge: 'EIA BENEFIT PILLAR',
                      badgeColor: item.iconColor,
                      body: item.detail,
                      subtext: `Real-World Application: ${item.caseStudy}`,
                    })
                  }
                >
                  <div className="benefit-tile-icon-box" style={{ color: item.iconColor }}>
                    <IconComp size={16} />
                  </div>
                  <p className="benefit-tile-text">{item.title}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Right Container: Global History of EIA ── */}
        <section className="eia-panel" aria-label="Global History of EIA">
          <div className="eia-panel-header">
            <div className="eia-panel-title-group">
              <div className="eia-panel-badge-icon badge-blue">
                <Globe size={16} />
              </div>
              <h3 className="eia-panel-title">Global History of EIA</h3>
            </div>
            <button
              type="button"
              className="eia-panel-action-btn"
              title="View global history overview"
              onClick={() =>
                setActiveModal({
                  title: 'Global Evolution of Environmental Assessment',
                  badge: 'INTERNATIONAL LAW',
                  badgeColor: '#60a5fa',
                  body: 'Beginning with US NEPA in 1970, statutory EIA spread swiftly to Canada (1973), Australia (1974), the European Union (1985), and developing economies throughout the 1990s. Today, over 100 countries enforce mandatory EIA legislation, backed by international conventions including the Espoo Convention on Transboundary EIA and Principle 17 of the Rio Declaration.',
                })
              }
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="global-history-body">
            {/* Skyline Panorama Banner with Connected Globe Lines */}
            <div className="history-skyline-banner">
              <img
                src="/images/water-uses-panorama-crisp.jpg"
                alt="Skyline of International Institutions & Capitals"
                className="history-skyline-img"
                loading="lazy"
              />
              <div className="history-skyline-overlay" />

              {/* Glowing Orbital Network Vector */}
              <svg className="history-orbital-network" viewBox="0 0 600 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="orbitalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path
                  d="M 40 90 Q 150 15, 270 65 T 560 30"
                  fill="none"
                  stroke="url(#orbitalGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle cx="60" cy="80" r="3.5" fill="#38bdf8" />
                <circle cx="170" cy="38" r="3.5" fill="#34d399" />
                <circle cx="280" cy="65" r="3.5" fill="#fbbf24" />
                <circle cx="410" cy="50" r="3.5" fill="#a855f7" />
                <circle cx="530" cy="35" r="3.5" fill="#f97316" />
              </svg>
            </div>

            {/* 5 Milestones Horizontal Track */}
            <div className="global-timeline-track-wrap">
              <div className="global-timeline-rail" />

              <div className="global-timeline-nodes-row">
                {globalMilestones.map((m) => (
                  <div
                    key={m.year + m.country}
                    className="timeline-milestone-col"
                    onClick={() =>
                      setActiveModal({
                        title: `${m.year} — ${m.country}`,
                        badge: 'GLOBAL EIA MILESTONE',
                        badgeColor: '#38bdf8',
                        body: m.expandedContext,
                        subtext: m.desc,
                      })
                    }
                  >
                    <div className="timeline-flag-circle">
                      {m.flagType === 'usa' && (
                        <svg className="flag-svg-icon" viewBox="0 0 32 32">
                          <rect width="32" height="32" fill="#b91c1c" />
                          <rect y="4" width="32" height="4" fill="#ffffff" />
                          <rect y="12" width="32" height="4" fill="#ffffff" />
                          <rect y="20" width="32" height="4" fill="#ffffff" />
                          <rect y="28" width="32" height="4" fill="#ffffff" />
                          <rect width="16" height="18" fill="#1e3a8a" />
                          <circle cx="8" cy="9" r="3" fill="#ffffff" />
                        </svg>
                      )}
                      {m.flagType === 'canada' && (
                        <svg className="flag-svg-icon" viewBox="0 0 32 32">
                          <rect width="8" height="32" fill="#dc2626" />
                          <rect x="8" width="16" height="32" fill="#ffffff" />
                          <rect x="24" width="8" height="32" fill="#dc2626" />
                          <path
                            d="M 16 9 L 18 13 L 22 13 L 19 16 L 20 20 L 16 17 L 12 20 L 13 16 L 10 13 L 14 13 Z"
                            fill="#dc2626"
                          />
                        </svg>
                      )}
                      {m.flagType === 'eu' && (
                        <svg className="flag-svg-icon" viewBox="0 0 32 32">
                          <rect width="32" height="32" fill="#1d4ed8" />
                          <circle cx="16" cy="16" r="10" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 3" />
                          <circle cx="16" cy="7" r="1.2" fill="#fbbf24" />
                          <circle cx="16" cy="25" r="1.2" fill="#fbbf24" />
                          <circle cx="7" cy="16" r="1.2" fill="#fbbf24" />
                          <circle cx="25" cy="16" r="1.2" fill="#fbbf24" />
                        </svg>
                      )}
                      {m.flagType === 'global' && (
                        <svg className="flag-svg-icon" viewBox="0 0 32 32">
                          <rect width="32" height="32" fill="#4c1d95" />
                          <circle cx="16" cy="16" r="11" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                          <ellipse cx="16" cy="16" rx="6" ry="11" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
                          <line x1="5" y1="16" x2="27" y2="16" stroke="#a78bfa" strokeWidth="1.2" />
                        </svg>
                      )}
                      {m.flagType === 'india' && (
                        <svg className="flag-svg-icon" viewBox="0 0 32 32">
                          <rect width="32" height="10.6" fill="#f97316" />
                          <rect y="10.6" width="32" height="10.8" fill="#ffffff" />
                          <rect y="21.4" width="32" height="10.6" fill="#15803d" />
                          <circle cx="16" cy="16" r="4" fill="none" stroke="#1e3a8a" strokeWidth="1" />
                          <circle cx="16" cy="16" r="1" fill="#1e3a8a" />
                        </svg>
                      )}
                    </div>

                    <div className="timeline-meta-label">
                      <span className="milestone-year-text">{m.year}</span>
                      <span className="milestone-loc-text">{m.country}</span>
                    </div>

                    <div className={`milestone-card-bubble ${m.tint}`}>
                      <p>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          BOTTOM ROW: INDIA EIA JOURNEY (LEFT) & KEY TAKEAWAYS (RIGHT)
          ────────────────────────────────────────────────────────────────────── */}
      <div className="eia-history-bottom-grid">
        {/* ── Left Container: India – EIA Journey with India Gate Sunset Backdrop ── */}
        <section className="eia-panel india-journey-panel" aria-label="India EIA Journey">
          {/* India Gate Sunset Silhouette Scene (Right side backdrop) */}
          <div className="india-gate-dusk-scene">
            <div className="india-gate-silhouette-wrap">
              <svg className="india-gate-svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="sunsetSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0f172a" stopOpacity="0.2" />
                    <stop offset="45%" stopColor="#9a3412" stopOpacity="0.4" />
                    <stop offset="85%" stopColor="#f59e0b" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
                  </linearGradient>
                  <radialGradient id="portalBeam" cx="50%" cy="75%" r="60%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Sunset sky gradient back */}
                <rect width="400" height="240" fill="url(#sunsetSkyGrad)" />

                {/* Central golden portal beam */}
                <circle cx="270" cy="180" r="120" fill="url(#portalBeam)" />

                {/* Architectural Monument (India Gate silhouette) */}
                <g fill="#180e05" opacity="0.92">
                  {/* Base Tier */}
                  <rect x="200" y="210" width="140" height="15" rx="2" />
                  <rect x="208" y="198" width="124" height="12" rx="1" />
                  <rect x="215" y="188" width="110" height="10" />

                  {/* Left & Right Massive Pillars */}
                  <rect x="220" y="90" width="32" height="98" />
                  <rect x="288" y="90" width="32" height="98" />

                  {/* Central Arch Cutout with glowing light behind */}
                  <path d="M 252 188 L 252 135 Q 270 115 288 135 L 288 188 Z" fill="#fef3c7" opacity="0.85" />

                  {/* Entablature & Cornice */}
                  <rect x="210" y="75" width="120" height="15" />
                  <rect x="216" y="62" width="108" height="13" />
                  <rect x="225" y="52" width="90" height="10" />
                  <rect x="240" y="44" width="60" height="8" rx="2" />

                  {/* Classical Inscription Band */}
                  <line x1="222" y1="82" x2="318" y2="82" stroke="#ea580c" strokeWidth="1" opacity="0.6" />
                </g>

                {/* Reflective Road with perspective streak lines */}
                <path d="M 270 190 L 190 240 L 350 240 Z" fill="rgba(245, 158, 11, 0.25)" />
                <line x1="270" y1="190" x2="270" y2="240" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8" />
              </svg>
            </div>
          </div>

          <div className="india-journey-content">
            <div className="india-journey-header">
              <div className="india-tricolor-badge">
                <svg viewBox="0 0 32 32" className="flag-svg-icon">
                  <rect width="32" height="10.6" fill="#f97316" />
                  <rect y="10.6" width="32" height="10.8" fill="#ffffff" />
                  <rect y="21.4" width="32" height="10.6" fill="#15803d" />
                  <circle cx="16" cy="16" r="4" fill="none" stroke="#1e3a8a" strokeWidth="1" />
                  <circle cx="16" cy="16" r="1" fill="#1e3a8a" />
                </svg>
              </div>
              <h3 className="india-journey-title">India – EIA Journey</h3>
            </div>

            {/* 6-Milestone Horizontal Rail */}
            <div className="india-timeline-rail-wrap">
              <div className="india-timeline-track-line" />

              <div className="india-milestones-row">
                {indiaMilestones.map((step) => (
                  <div
                    key={step.year}
                    className="india-milestone-step"
                    onClick={() =>
                      setActiveModal({
                        title: `India EIA Milestone — ${step.year}`,
                        badge: 'INDIAN STATUTORY EVOLUTION',
                        badgeColor: step.color,
                        body: step.expandedContext,
                        subtext: step.desc,
                      })
                    }
                  >
                    <span
                      className="india-node-dot"
                      style={{ backgroundColor: step.color, color: step.color }}
                    />
                    <span className="india-step-year">{step.year}</span>
                    <p className="india-step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Right Container: Key Takeaways Panel ── */}
        <section className="eia-panel takeaways-panel" aria-label="Key Takeaways">
          <div className="eia-panel-header">
            <div className="eia-panel-title-group">
              <div className="eia-panel-badge-icon badge-amber">
                <Lightbulb size={16} />
              </div>
              <h3 className="eia-panel-title">Key Takeaways</h3>
            </div>
            <button
              type="button"
              className="eia-panel-action-btn"
              title="Overview takeaways"
              onClick={() =>
                setActiveModal({
                  title: 'Essential Takeaways: EIA Evolution',
                  badge: 'EXAM & INDUSTRY SUMMARY',
                  badgeColor: '#fbbf24',
                  body: '1. EIA emerged as a formal legal instrument in the USA via NEPA (1970).\n2. Adopted globally through Rio 1992 and multilateral development banking standards.\n3. In India, EIA operates as a statutory mandate under the Environment (Protection) Act 1986, currently governed by the EIA Notification 2006 with digital tracking via the PARIVESH system.',
                })
              }
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="takeaways-body">
            {/* Tile 1: Origin */}
            <div
              className="takeaway-card-tile"
              onClick={() =>
                setActiveModal({
                  title: 'Originated in the USA (1970)',
                  badge: 'HISTORICAL ROOTS',
                  badgeColor: '#fbbf24',
                  body: 'The National Environmental Policy Act (NEPA) introduced mandatory environmental impact statements on federal actions, becoming the pioneering template for all international environmental clearance models.',
                })
              }
            >
              <div
                className="takeaway-icon-circle"
                style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}
              >
                <BookOpen size={18} />
              </div>
              <p>EIA originated in the USA (1970).</p>
            </div>

            {/* Tile 2: Global Practice */}
            <div
              className="takeaway-card-tile"
              onClick={() =>
                setActiveModal({
                  title: 'Now a Global Standard',
                  badge: 'INTERNATIONAL PRACTICE',
                  badgeColor: '#38bdf8',
                  body: 'Over 120 nations and international financial institutions enforce EIA to screen investments, prevent catastrophic ecocide, and align projects with the UN Sustainable Development Goals (SDGs).',
                })
              }
            >
              <div
                className="takeaway-icon-circle"
                style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
              >
                <Globe size={18} />
              </div>
              <p>Now a global practice.</p>
            </div>

            {/* Tile 3: India Implementation */}
            <div
              className="takeaway-card-tile"
              onClick={() =>
                setActiveModal({
                  title: 'Indian Regulatory Framework',
                  badge: 'INDIA COMPLIANCE',
                  badgeColor: '#34d399',
                  body: 'In India, EIA is legally executed under the Environment (Protection) Act 1986 via the EIA Notification 2006. It categorizes projects into Category A (central clearance) and Category B (state clearance) across 32 scheduled industrial sectors.',
                })
              }
            >
              <div
                className="takeaway-icon-circle"
                style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}
              >
                <MapPin size={18} />
              </div>
              <p>In India, it is implemented through the EIA Notification 2006 and subsequent updates.</p>
            </div>
          </div>
        </section>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          INTERACTIVE SPOTLIGHT MODAL / POPUP
          ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <div
            className="history-detail-overlay"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="history-detail-modal"
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="history-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div
                className="history-modal-badge"
                style={{
                  background: `${activeModal.badgeColor}22`,
                  border: `1px solid ${activeModal.badgeColor}66`,
                  color: activeModal.badgeColor,
                }}
              >
                <Sparkles size={12} />
                <span>{activeModal.badge}</span>
              </div>

              <h4 className="history-modal-title">{activeModal.title}</h4>

              <div className="history-modal-body">
                <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{activeModal.body}</p>
                {activeModal.subtext && (
                  <div
                    style={{
                      marginTop: '14px',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '8px',
                      borderLeft: `3px solid ${activeModal.badgeColor}`,
                      fontSize: '13px',
                      color: '#e2e8f0',
                    }}
                  >
                    {activeModal.subtext}
                  </div>
                )}
              </div>

              <div className="history-modal-footer">
                <button
                  type="button"
                  className="history-modal-primary-btn"
                  onClick={() => setActiveModal(null)}
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WarmingEiaHistoryScreen;
