import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  AlertTriangle,
  ArrowRight,
  X,
  Clock,
  Coins,
  FileQuestion,
  Scale,
  Construction,
  Users,
  Presentation,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  Target,
  Sparkles,
  Cog,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import './WarmingEiaBenefitsFlawsScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface BenefitItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  circleColor: string;
  icon: typeof Leaf;
  thumbnailType: 'lake' | 'decision' | 'public' | 'sustainable' | 'legal';
  fullDetail: string;
  statutoryBasis: string;
}

interface FlawItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  icon: typeof Clock;
  thumbnailType: 'delay' | 'cost' | 'quality' | 'bias' | 'enforcement';
  fullDetail: string;
  remedyAction: string;
}

const benefitsList: BenefitItem[] = [
  {
    id: 'b-env-protection',
    num: '01',
    title: 'Environmental Protection',
    desc: 'Helps prevent or minimize environmental degradation and promotes sustainable use of natural resources.',
    circleColor: 'circle-green',
    icon: Leaf,
    thumbnailType: 'lake',
    fullDetail:
      'Identifies ecological sensitivities before capital investment occurs. Mandates strict pollution control technologies (e.g. ESPs, Zero Liquid Discharge, bio-filters) to protect water tables, prevent deforestation, and preserve endangered habitats.',
    statutoryBasis: 'Section 3, Environment (Protection) Act, 1986 & EIA Notification 2006 (Schedule I).',
  },
  {
    id: 'b-decision-making',
    num: '02',
    title: 'Better Decision-Making',
    desc: 'Provides scientific and systematic information for informed and transparent decisions.',
    circleColor: 'circle-blue',
    icon: Presentation,
    thumbnailType: 'decision',
    fullDetail:
      'Replaces subjective political discretion with objective quantitative data. Evaluates project feasibility through Leopold interaction matrices, AERMOD atmospheric modeling, and comparative project alternative studies.',
    statutoryBasis: 'Expert Appraisal Committee (EAC) collegiate peer review protocols.',
  },
  {
    id: 'b-public-participation',
    num: '03',
    title: 'Public Participation',
    desc: 'Involves local communities and stakeholders in the decision-making process.',
    circleColor: 'circle-yellow',
    icon: Users,
    thumbnailType: 'public',
    fullDetail:
      'Empowers affected farmers, villagers, indigenous tribal groups, and civic societies through mandatory 45-day notice public hearings. All spoken objections and video recordings must be answered point-by-point in the final appraisal.',
    statutoryBasis: 'Statutory Public Hearing conducted by State Pollution Control Board & District Collector.',
  },
  {
    id: 'b-sustainable-dev',
    num: '04',
    title: 'Sustainable Development',
    desc: 'Supports a balance between development needs and environmental conservation.',
    circleColor: 'circle-purple',
    icon: TrendingUp,
    thumbnailType: 'sustainable',
    fullDetail:
      'Embodies the Brundtland principle of inter-generational equity. Integrates renewable energy (solar/wind integration), 33% mandatory greenbelt buffer afforestation, and rainwater harvesting into industrial blueprints.',
    statutoryBasis: 'National Green Tribunal (NGT) sustainable development jurisprudence.',
  },
  {
    id: 'b-legal-compliance',
    num: '05',
    title: 'Legal and Policy Compliance',
    desc: 'Ensures compliance with environmental laws, regulations and international commitments.',
    circleColor: 'circle-teal',
    icon: ShieldCheck,
    thumbnailType: 'legal',
    fullDetail:
      'Creates a binding statutory contract between the project proponent and regulatory authorities. Violations of specific Environmental Clearance (EC) conditions incur immediate project shutdown and penal liabilities under EPA 1986.',
    statutoryBasis: 'Air (1981), Water (1974), Forest Conservation (1980), and Biodiversity (2002) Acts.',
  },
];

const flawsList: FlawItem[] = [
  {
    id: 'f-time-consuming',
    num: '01',
    title: 'Time-Consuming Process',
    desc: 'Detailed assessments can be lengthy, causing project delays.',
    icon: Clock,
    thumbnailType: 'delay',
    fullDetail:
      'Comprehensive multi-season field data collection (12 months) combined with bureaucratic appraisal committee queues often extends clearance timelines from the statutory 105 days to 300+ days, inflating capital financing costs.',
    remedyAction: 'Digital single-window PARIVESH clearance portal and standardized sector-specific ToRs.',
  },
  {
    id: 'f-high-cost',
    num: '02',
    title: 'High Cost',
    desc: 'Requires significant financial and human resources.',
    icon: Coins,
    thumbnailType: 'cost',
    fullDetail:
      'Engaging accredited EIA consulting organizations (NABET/QCI), setting up 8-station continuous air/water monitoring networks, and legal expenses can cost tens of millions of rupees, creating high financial barriers for MSMEs.',
    remedyAction: 'Shared regional environmental data banks and categorized B2 exemptions for green industries.',
  },
  {
    id: 'f-variable-quality',
    num: '03',
    title: 'Variable Quality',
    desc: 'Quality of EIA reports can vary widely depending on expertise and data availability.',
    icon: FileQuestion,
    thumbnailType: 'quality',
    fullDetail:
      'Reports frequently suffer from copy-pasted baseline data, boilerplate environmental management plans, and inadequate predictive modeling, particularly when prepared by non-accredited or low-bid consultant organizations.',
    remedyAction: 'Mandatory NABET accreditation, GIS metadata verification, and punitive blacklisting of plagiarizing consultants.',
  },
  {
    id: 'f-potential-bias',
    num: '04',
    title: 'Potential Bias',
    desc: 'Reports may be influenced by project proponents, leading to biased conclusions.',
    icon: Scale,
    thumbnailType: 'bias',
    fullDetail:
      'Since the project proponent directly hires and pays the EIA consultant, a structural conflict of interest exists: consultants face commercial pressure to downplay severe ecological risks and guarantee clearance approval.',
    remedyAction: 'Independent escrow appraisal fund where consultants are assigned independently by regulatory boards.',
  },
  {
    id: 'f-weak-implementation',
    num: '05',
    title: 'Weak Implementation',
    desc: 'Even with good recommendations, mitigation measures are not always effectively implemented.',
    icon: Construction,
    thumbnailType: 'enforcement',
    fullDetail:
      'Once statutory clearance is secured, post-clearance compliance monitoring is notoriously deficient due to understaffed regional MoEFCC/SPCB inspection offices. Promised effluent plants and greenbelts are often neglected or delayed.',
    remedyAction: 'Continuous Emission Monitoring Systems (CEMS) telemetry, third-party satellite surveillance, and mandatory bank performance guarantees.',
  },
];

export function WarmingEiaBenefitsFlawsScreen() {
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitItem | null>(null);
  const [selectedFlaw, setSelectedFlaw] = useState<FlawItem | null>(null);
  const [showForwardModal, setShowForwardModal] = useState(false);

  useModalScrollLock(Boolean(selectedBenefit || selectedFlaw || showForwardModal), () => {
    setSelectedBenefit(null);
    setSelectedFlaw(null);
    setShowForwardModal(false);
  });

  // Ultra-crisp vector SVG thumbnails matching Image Mockup
  const renderRowThumb = (type: string) => {
    switch (type) {
      // ── BENEFITS THUMBNAILS ──
      case 'lake':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            {/* Sky and Snow Peaks */}
            <linearGradient id="lakeSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <rect width="60" height="20" fill="url(#lakeSky)" />
            <polygon points="0,18 14,8 26,16 40,6 52,14 60,10 60,24 0,24" fill="#475569" />
            <polygon points="36,14 40,7 48,14" fill="#ffffff" />
            <polygon points="10,16 14,9 20,16" fill="#ffffff" />
            {/* Green Pine Forest */}
            <polygon points="0,22 8,18 16,22 24,17 32,22 40,18 48,22 60,18 60,26 0,26" fill="#14532d" />
            {/* Pristine Alpine Lake */}
            <rect x="0" y="22" width="60" height="16" fill="#0284c7" />
            <path d="M0,26 Q15,24 30,26 T60,26 L60,38 L0,38 Z" fill="#0369a1" />
          </svg>
        );

      case 'decision':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#08182b" />
            {/* Conference Screen with Globe */}
            <rect x="14" y="4" width="32" height="18" rx="1.5" fill="#0f2942" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="30" cy="13" r="6" stroke="#38bdf8" strokeWidth="0.8" fill="#0369a1" />
            <path d="M26,13 Q30,11 34,13" stroke="#7dd3fc" strokeWidth="0.6" fill="none" />
            <path d="M30,7 V19" stroke="#7dd3fc" strokeWidth="0.6" />
            {/* Boardroom table & attendees */}
            <ellipse cx="30" cy="30" rx="24" ry="7" fill="#032135" stroke="#0ea5e9" strokeWidth="0.6" />
            <circle cx="18" cy="24" r="2.5" fill="#334155" />
            <circle cx="30" cy="23" r="2.8" fill="#475569" />
            <circle cx="42" cy="24" r="2.5" fill="#334155" />
          </svg>
        );

      case 'public':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#1e1808" />
            {/* Outdoor Consultation Tree */}
            <ellipse cx="30" cy="14" rx="22" ry="10" fill="#15803d" />
            <rect x="28" y="14" width="4" height="10" fill="#78350f" />
            {/* Crowd circles */}
            <circle cx="14" cy="28" r="2.8" fill="#d97706" />
            <circle cx="22" cy="27" r="3" fill="#f59e0b" />
            <circle cx="30" cy="26" r="3.2" fill="#fbbf24" />
            <circle cx="38" cy="27" r="3" fill="#f59e0b" />
            <circle cx="46" cy="28" r="2.8" fill="#d97706" />
            <line x1="8" y1="33" x2="52" y2="33" stroke="#92400e" strokeWidth="0.8" />
          </svg>
        );

      case 'sustainable':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#0284c7" />
            {/* Green Meadow */}
            <path d="M0,20 Q30,14 60,20 L60,38 L0,38 Z" fill="#15803d" />
            <path d="M0,26 Q30,22 60,28 L60,38 L0,38 Z" fill="#22c55e" />
            {/* Clean Wind Turbine 1 */}
            <line x1="20" y1="12" x2="20" y2="28" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="20" cy="12" r="1.5" fill="#f8fafc" />
            <line x1="20" y1="12" x2="14" y2="8" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="20" y1="12" x2="26" y2="9" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="20" y1="12" x2="20" y2="19" stroke="#ffffff" strokeWidth="0.8" />
            {/* Clean Wind Turbine 2 */}
            <line x1="42" y1="15" x2="42" y2="30" stroke="#ffffff" strokeWidth="1" />
            <circle cx="42" cy="15" r="1.2" fill="#f8fafc" />
            <line x1="42" y1="15" x2="37" y2="12" stroke="#ffffff" strokeWidth="0.6" />
            <line x1="42" y1="15" x2="47" y2="13" stroke="#ffffff" strokeWidth="0.6" />
          </svg>
        );

      case 'legal':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#0d1f1c" />
            {/* Law books stack */}
            <rect x="8" y="20" width="22" height="12" rx="1" fill="#78350f" />
            <rect x="10" y="16" width="20" height="4" rx="0.5" fill="#92400e" />
            {/* Judicial Gavel on block */}
            <ellipse cx="44" cy="30" rx="10" ry="3" fill="#451a03" />
            {/* Gavel head */}
            <rect x="38" y="14" width="12" height="7" rx="1" fill="#b45309" stroke="#f59e0b" strokeWidth="0.8" />
            {/* Gavel handle */}
            <line x1="44" y1="18" x2="52" y2="28" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      // ── FLAWS THUMBNAILS ──
      case 'delay':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#1c0f0f" />
            {/* Clock Face */}
            <circle cx="20" cy="19" r="12" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="20" y1="19" x2="20" y2="11" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="20" y1="19" x2="25" y2="21" stroke="#ef4444" strokeWidth="1.2" />
            {/* Huge stack of files */}
            <rect x="36" y="24" width="18" height="3" fill="#cbd5e1" />
            <rect x="37" y="20" width="17" height="3" fill="#e2e8f0" />
            <rect x="36" y="16" width="18" height="3" fill="#cbd5e1" />
            <rect x="38" y="12" width="16" height="3" fill="#ffffff" />
            <rect x="37" y="8" width="17" height="3" fill="#e2e8f0" />
          </svg>
        );

      case 'cost':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#1f1308" />
            {/* Blueprints sheet */}
            <rect x="6" y="8" width="48" height="24" rx="1" fill="#0284c7" />
            <line x1="10" y1="14" x2="30" y2="14" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="10" y1="18" x2="26" y2="18" stroke="#ffffff" strokeWidth="0.8" />
            {/* Piles of Gold Coins */}
            <ellipse cx="40" cy="22" rx="7" ry="2.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
            <ellipse cx="40" cy="19" rx="7" ry="2.5" fill="#fbbf24" stroke="#78350f" strokeWidth="0.5" />
            <ellipse cx="40" cy="16" rx="7" ry="2.5" fill="#fde68a" stroke="#78350f" strokeWidth="0.5" />
            <ellipse cx="30" cy="24" rx="6" ry="2.2" fill="#d97706" />
            <ellipse cx="30" cy="21" rx="6" ry="2.2" fill="#f59e0b" />
          </svg>
        );

      case 'quality':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#1e1010" />
            {/* Report Paper */}
            <rect x="14" y="4" width="32" height="30" rx="1.5" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
            <text x="30" y="11" fill="#0f172a" fontSize="3.8" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif">
              EIA REPORT
            </text>
            <line x1="18" y1="14" x2="42" y2="14" stroke="#cbd5e1" strokeWidth="0.6" />
            <line x1="18" y1="17" x2="38" y2="17" stroke="#cbd5e1" strokeWidth="0.6" />
            {/* Red Alert Question Stamp */}
            <circle cx="30" cy="24" r="6.5" stroke="#ef4444" strokeWidth="1.2" fill="#fee2e2" />
            <text x="30" y="27" fill="#dc2626" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">
              ?
            </text>
          </svg>
        );

      case 'bias':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#1c0f16" />
            {/* Contract signing paperwork */}
            <polygon points="12,6 48,6 42,32 6,32" fill="#ffffff" />
            <line x1="16" y1="12" x2="38" y2="12" stroke="#64748b" strokeWidth="0.8" />
            <line x1="14" y1="16" x2="36" y2="16" stroke="#64748b" strokeWidth="0.8" />
            <line x1="12" y1="20" x2="30" y2="20" stroke="#64748b" strokeWidth="0.8" />
            {/* Tilted pen & money envelope */}
            <rect x="32" y="18" width="18" height="12" rx="1" fill="#16a34a" />
            <text x="41" y="26" fill="#ffffff" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">
              $$$
            </text>
            <line x1="28" y1="14" x2="36" y2="26" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'enforcement':
        return (
          <svg viewBox="0 0 60 38" className="eia-bf-row-thumb-svg" fill="none">
            <rect width="60" height="38" fill="#1a110a" />
            {/* Barren Mud Ground */}
            <path d="M0,24 Q30,22 60,26 L60,38 L0,38 Z" fill="#78350f" />
            {/* Yellow Construction Excavator */}
            <rect x="18" y="18" width="16" height="10" rx="1" fill="#eab308" />
            <rect x="14" y="28" width="24" height="4" rx="2" fill="#1e293b" />
            {/* Excavator Boom Arm & Bucket */}
            <line x1="32" y1="20" x2="44" y2="12" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
            <line x1="44" y1="12" x2="52" y2="22" stroke="#ca8a04" strokeWidth="1.8" strokeLinecap="round" />
            <polygon points="52,22 56,26 48,27" fill="#713f12" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section
      className="eia-bf-screen-container"
      id="ch-14-benefits-flaws"
      aria-label="Chapter 15: EIA Benefits vs Flaws — A Balanced Perspective"
    >
      {/* ── Background Layer with Split Landscape (Nature on Left, Industry on Right) ── */}
      <div className="eia-bf-screen-bg">
        <img
          src="/images/warming-eia-intro-bg.jpg"
          alt="EIA Benefits vs Flaws: Natural Ecosystems balanced against Industrial Development"
          loading="eager"
        />
        <div className="eia-bf-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Red Glowing Quote Card (Right) ── */}
      <div className="eia-bf-top-bar">
        {/* Left Header */}
        <div className="eia-bf-header-block">
          <div className="eia-bf-eyebrow">
            <span>MODULE 05</span>
            <span className="eia-bf-eyebrow-pipe">|</span>
            <span>CHAPTER 15</span>
          </div>
          <h1 className="eia-bf-main-title">
            <span className="eia-bf-title-word">EIA Benefits </span>
            <span className="eia-bf-title-vs">vs</span>
            <span className="eia-bf-title-flaws"> Flaws</span>
          </h1>
          <h2 className="eia-bf-subtitle">A Balanced Perspective</h2>
          <p className="eia-bf-lead-text">
            Environmental Impact Assessment (EIA) is a powerful tool for sustainable development,
            but it also has limitations. Understanding both its strengths and weaknesses helps us
            use EIA more effectively and improve the process for better outcomes.
          </p>
        </div>

        {/* Right Quote Card matching Image Mockup */}
        <div className="eia-bf-quote-card">
          <span className="eia-bf-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="eia-bf-quote-text">
            &ldquo;EIA is a step in the right direction, but its effectiveness depends on how it is
            implemented.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Main Stage: 3 Columns (Benefits [Left] - Golden Scales [Center] - Flaws [Right]) ── */}
      <div className="eia-bf-main-stage">
        {/* Left Column: Benefits of EIA (Green Theme) */}
        <div className="eia-bf-side-card theme-green">
          <div className="eia-bf-side-header">
            <div className="eia-bf-side-header-left">
              <div className="eia-bf-header-badge">
                <Leaf size={14} />
              </div>
              <h3 className="eia-bf-side-title">Benefits of EIA</h3>
            </div>
            <div className="eia-bf-header-arrow" aria-hidden="true">
              <ArrowRight size={12} />
            </div>
          </div>

          <div className="eia-bf-rows-stack">
            {benefitsList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="eia-bf-row-item"
                  onClick={() => setSelectedBenefit(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect Benefit: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedBenefit(item);
                    }
                  }}
                >
                  <div className="eia-bf-row-left">
                    <div className={`eia-bf-circle-icon ${item.circleColor}`}>
                      <Icon size={12} />
                    </div>
                    <div className="eia-bf-row-text">
                      <span className="eia-bf-row-title">{item.title}</span>
                      <p className="eia-bf-row-desc">{item.desc}</p>
                    </div>
                  </div>

                  <div className="eia-bf-row-thumb">
                    {renderRowThumb(item.thumbnailType)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centerpiece: The Golden Scales of Justice (`⚖`) */}
        <div className="eia-bf-scales-center" aria-label="Golden Scales of Justice balancing Ecology and Industry">
          <div className="eia-bf-scales-svg-wrap">
            <svg viewBox="0 0 180 280" style={{ width: '100%', height: '100%' }} fill="none">
              {/* Radial center glow behind scale */}
              <radialGradient id="scaleCenterGlow" cx="50%" cy="45%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#07090d" stopOpacity="0" />
              </radialGradient>
              <rect width="180" height="280" fill="url(#scaleCenterGlow)" />

              {/* ── Base Pedestal (Solid Polished Brass) ── */}
              <ellipse cx="90" cy="265" rx="36" ry="10" fill="#78350f" />
              <ellipse cx="90" cy="262" rx="32" ry="8" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
              <ellipse cx="90" cy="258" rx="24" ry="6" fill="#f59e0b" />
              <rect x="85" y="246" width="10" height="14" rx="2" fill="#d97706" />

              {/* ── Central Pillar Column ── */}
              <line x1="90" y1="46" x2="90" y2="248" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
              <line x1="88" y1="46" x2="88" y2="248" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />

              {/* ── Ornate Finial & Beam Pivot ── */}
              <circle cx="90" cy="46" r="8" fill="#f59e0b" stroke="#fde68a" strokeWidth="1.5" />
              <polygon points="90,30 94,42 86,42" fill="#fde68a" />
              <circle cx="90" cy="28" r="3" fill="#fbbf24" />

              {/* ── Balance Beam (Tilted with slight ecological weight) ── */}
              <path d="M26,58 Q90,46 154,64" stroke="#d97706" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M26,57 Q90,45 154,63" stroke="#fde68a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* ── Left Suspension Chains & Pan (Green Biosphere) ── */}
              <line x1="26" y1="58" x2="16" y2="120" stroke="#f59e0b" strokeWidth="0.9" strokeDasharray="2 1.5" />
              <line x1="26" y1="58" x2="36" y2="120" stroke="#f59e0b" strokeWidth="0.9" strokeDasharray="2 1.5" />
              {/* Left Pan */}
              <ellipse cx="26" cy="122" rx="24" ry="7" fill="#b45309" stroke="#f59e0b" strokeWidth="1.2" />
              {/* Luminous Green Miniature Ecosystem on Left Pan */}
              <circle cx="26" cy="112" r="14" fill="#15803d" opacity="0.9" />
              <ellipse cx="26" cy="116" rx="12" ry="4" fill="#22c55e" />
              {/* Mini pine trees */}
              <polygon points="20,112 24,104 28,112" fill="#166534" />
              <polygon points="26,110 30,102 34,110" fill="#14532d" />
              {/* Wind turbine */}
              <line x1="18" y1="108" x2="18" y2="98" stroke="#ffffff" strokeWidth="0.8" />
              <circle cx="18" cy="98" r="0.8" fill="#ffffff" />
              <line x1="18" y1="98" x2="14" y2="95" stroke="#ffffff" strokeWidth="0.6" />
              <line x1="18" y1="98" x2="22" y2="96" stroke="#ffffff" strokeWidth="0.6" />

              {/* ── Right Suspension Chains & Pan (Smoking Industry) ── */}
              <line x1="154" y1="64" x2="144" y2="128" stroke="#f59e0b" strokeWidth="0.9" strokeDasharray="2 1.5" />
              <line x1="154" y1="64" x2="164" y2="128" stroke="#f59e0b" strokeWidth="0.9" strokeDasharray="2 1.5" />
              {/* Right Pan */}
              <ellipse cx="154" cy="130" rx="24" ry="7" fill="#78350f" stroke="#ea580c" strokeWidth="1.2" />
              {/* Smoking Factory Chimneys on Right Pan */}
              <rect x="142" y="112" width="7" height="16" fill="#334155" />
              <rect x="151" y="108" width="6" height="20" fill="#1e293b" />
              <rect x="159" y="114" width="8" height="14" fill="#475569" />
              {/* Factory smoke puffs */}
              <circle cx="145" cy="106" r="4" fill="#94a3b8" opacity="0.6" />
              <circle cx="148" cy="100" r="5" fill="#64748b" opacity="0.5" />
              <circle cx="154" cy="98" r="6" fill="#475569" opacity="0.6" />
              <circle cx="160" cy="92" r="7" fill="#334155" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Right Column: Flaws / Limitations of EIA (Red Theme) */}
        <div className="eia-bf-side-card theme-red">
          <div className="eia-bf-side-header">
            <div className="eia-bf-side-header-left">
              <div className="eia-bf-header-badge">
                <AlertTriangle size={14} />
              </div>
              <h3 className="eia-bf-side-title">Flaws / Limitations of EIA</h3>
            </div>
            <div className="eia-bf-header-arrow" aria-hidden="true">
              <ArrowRight size={12} />
            </div>
          </div>

          <div className="eia-bf-rows-stack">
            {flawsList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="eia-bf-row-item"
                  onClick={() => setSelectedFlaw(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect Limitation: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedFlaw(item);
                    }
                  }}
                >
                  <div className="eia-bf-row-left">
                    <div className="eia-bf-circle-icon circle-red">
                      <Icon size={12} />
                    </div>
                    <div className="eia-bf-row-text">
                      <span className="eia-bf-row-title">{item.title}</span>
                      <p className="eia-bf-row-desc">{item.desc}</p>
                    </div>
                  </div>

                  <div className="eia-bf-row-thumb">
                    {renderRowThumb(item.thumbnailType)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom Section: 2 Wide Panels (Key Takeaways & Moving Forward) ── */}
      <div className="eia-bf-bottom-strip">
        {/* Panel 1: Key Takeaways (Amber Theme) */}
        <div className="eia-bf-takeaways-panel">
          <div className="eia-bf-takeaways-header">
            <div className="eia-bf-takeaways-icon-wrap">
              <Lightbulb size={18} />
            </div>
            <h4 className="eia-bf-takeaways-title">Key Takeaways</h4>
          </div>

          <div className="eia-bf-takeaways-grid">
            <div className="eia-bf-takeaway-col">
              <Leaf size={16} className="eia-bf-takeaway-col-icon text-emerald-400" />
              <p className="eia-bf-takeaway-col-text">
                EIA has significant benefits for environmental protection and sustainable
                development.
              </p>
            </div>

            <div className="eia-bf-takeaway-col">
              <Cog size={16} className="eia-bf-takeaway-col-icon text-amber-400" />
              <p className="eia-bf-takeaway-col-text">
                It also has limitations such as time, cost, variable quality, bias and weak
                implementation.
              </p>
            </div>

            <div className="eia-bf-takeaway-col">
              <TrendingUp size={16} className="eia-bf-takeaway-col-icon text-sky-400" />
              <p className="eia-bf-takeaway-col-text">
                Continuous improvement in EIA processes can enhance its effectiveness and
                credibility.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 2: Moving Forward (Purple Theme) */}
        <div
          className="eia-bf-forward-panel"
          onClick={() => setShowForwardModal(true)}
          role="button"
          tabIndex={0}
          aria-label="Inspect Moving Forward EIA Reform Roadmap"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowForwardModal(true);
            }
          }}
        >
          <div className="eia-bf-forward-header">
            <div className="eia-bf-forward-header-left">
              <div className="eia-bf-forward-icon-wrap">
                <Target size={18} />
              </div>
              <h4 className="eia-bf-forward-title">Moving Forward</h4>
            </div>
            <div className="eia-bf-forward-arrow" aria-hidden="true">
              <ArrowRight size={12} />
            </div>
          </div>

          <div className="eia-bf-forward-body">
            <p className="eia-bf-forward-text">
              By recognizing both the strengths and weaknesses of EIA, we can make the process
              more transparent, efficient and impactful, leading to truly sustainable development.
            </p>

            <div className="eia-bf-forward-thumb">
              <svg viewBox="0 0 80 44" style={{ width: '100%', height: '100%' }} fill="none">
                <rect width="80" height="44" fill="#0f172a" />
                <linearGradient id="mfSunrise" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <rect width="80" height="24" fill="url(#mfSunrise)" />
                {/* Mountain Ridge */}
                <polygon points="0,22 18,12 36,20 54,10 72,18 80,14 80,30 0,30" fill="#1e293b" />
                {/* Winding Sunrise River */}
                <path d="M0,44 Q30,34 50,38 T80,30 L80,44 Z" fill="#0284c7" />
                <path d="M0,44 Q30,34 50,38 T80,30" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
                <circle cx="54" cy="10" r="4" fill="#fde68a" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Modals (Benefits, Flaws, Moving Forward) ── */}
      <AnimatePresence>
        {selectedBenefit && (
          <div
            className="eia-bf-modal-backdrop"
            onClick={() => setSelectedBenefit(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="eia-bf-modal-window"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="eia-bf-modal-close-btn"
                onClick={() => setSelectedBenefit(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eia-bf-modal-body">
                <span className="eia-bf-modal-eyebrow" style={{ color: '#4ade80' }}>
                  Institutional Benefit #{selectedBenefit.num} · Democratic Governance
                </span>
                <h2 className="eia-bf-modal-title">{selectedBenefit.title}</h2>
                <p className="eia-bf-modal-desc">{selectedBenefit.fullDetail}</p>

                <div className="eia-bf-modal-box" style={{ borderLeftColor: '#4ade80' }}>
                  <strong style={{ color: '#4ade80' }}>Statutory Mandate:</strong>{' '}
                  <span>{selectedBenefit.statutoryBasis}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedFlaw && (
          <div
            className="eia-bf-modal-backdrop"
            onClick={() => setSelectedFlaw(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="eia-bf-modal-window"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="eia-bf-modal-close-btn"
                onClick={() => setSelectedFlaw(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eia-bf-modal-body">
                <span className="eia-bf-modal-eyebrow" style={{ color: '#f87171' }}>
                  Institutional Limitation #{selectedFlaw.num} · Implementation Challenge
                </span>
                <h2 className="eia-bf-modal-title">{selectedFlaw.title}</h2>
                <p className="eia-bf-modal-desc">{selectedFlaw.fullDetail}</p>

                <div className="eia-bf-modal-box" style={{ borderLeftColor: '#f87171' }}>
                  <strong style={{ color: '#f87171' }}>Prescribed Policy Remedy:</strong>{' '}
                  <span>{selectedFlaw.remedyAction}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showForwardModal && (
          <div
            className="eia-bf-modal-backdrop"
            onClick={() => setShowForwardModal(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="eia-bf-modal-window"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="eia-bf-modal-close-btn"
                onClick={() => setShowForwardModal(false)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eia-bf-modal-body">
                <span className="eia-bf-modal-eyebrow" style={{ color: '#c084fc' }}>
                  Strategic Roadmap · Modernizing Indian Environmental Governance
                </span>
                <h2 className="eia-bf-modal-title">Moving Forward: Towards Next-Generation EIA</h2>
                <p className="eia-bf-modal-desc">
                  To reconcile the urgent requirements of industrial infrastructure with rigorous
                  biosphere preservation, Indian environmental clearance jurisprudence is evolving
                  towards automated digital tracking:
                </p>

                <div className="eia-bf-modal-box" style={{ borderLeftColor: '#c084fc' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} style={{ color: '#c084fc', flexShrink: 0 }} />
                      <span><strong>PARIVESH 2.0:</strong> Single-window automated tracking reducing appraisal duration by 60%.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} style={{ color: '#c084fc', flexShrink: 0 }} />
                      <span><strong>Drone &amp; Satellite Surveillance:</strong> Verifying greenbelt plantation and topsoil storage in real time.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} style={{ color: '#c084fc', flexShrink: 0 }} />
                      <span><strong>Escrow Funding Model:</strong> Independent accredited consultant assignment preventing proponent bias.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
