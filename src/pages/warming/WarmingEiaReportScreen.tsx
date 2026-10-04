import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Clock,
  ArrowRight,
  X,
  Sparkles,
  Check,
  Link2,
  Lightbulb,
  Building,
  TreePine,
  TrendingUp,
  Flame,
  ShieldAlert,
  FileStack,
  Layers,
  BarChart3,
  Sprout,
  Cog,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './WarmingEiaReportScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface DomainComponent {
  letter: string;
  theme: string;
  title: string;
  desc: string;
  icon: typeof Building;
  thumbnailType: 'project' | 'baseline' | 'impact' | 'mitigation' | 'emp' | 'monitoring' | 'risk' | 'additional';
  fullDetail: string;
  mandatoryParameters: string[];
  mitigationCommitments: string[];
  linkedModule?: { name: string; path: string; label: string };
}

const domainComponents: DomainComponent[] = [
  {
    letter: 'A',
    theme: 'theme-A',
    title: 'Project Description',
    desc: 'Details of the proposed project, location, size, technology and need.',
    icon: Building,
    thumbnailType: 'project',
    fullDetail:
      'Provides complete engineering specifications, project footprint boundary, production capacity, layout diagrams, resource requirements (water, power, raw material balance), and justification for site selection over alternative locations.',
    mandatoryParameters: [
      'Site geographic coordinates, boundary demarcation, and land ownership status',
      'Process flow diagrams and technology energy-efficiency benchmarks',
      'Water balance chart: intake requirements, recycling loops, and ZLD discharge',
      'Material balance: raw input consumption and hazardous solid waste generation',
    ],
    mitigationCommitments: [
      'Site selection avoiding ecologically sensitive areas (ESAs) and river corridors',
      'Incorporation of clean best available technology (BAT) into machinery designs',
      'Dedicated greenbelt buffer reserving 33% of the total industrial plot area',
    ],
    linkedModule: { name: 'Module 03: Sustainable Development', path: '/module/land', label: 'Land Planning' },
  },
  {
    letter: 'B',
    theme: 'theme-B',
    title: 'Baseline Environment',
    desc: 'Existing status of air, water, land, biological and socio-economic environment.',
    icon: TreePine,
    thumbnailType: 'baseline',
    fullDetail:
      'Rigorous multi-season or 1-season field sampling capturing pre-project ambient quality: ambient air (PM10, PM2.5, SO₂, NOx), surface & groundwater quality, terrestrial flora/fauna diversity, ambient noise levels, and local socio-economic demographics.',
    mandatoryParameters: [
      'Ambient air monitoring grid across 8 radial windward/leeward stations',
      'Surface & groundwater chemical profiles (heavy metals, BOD, COD, coliform)',
      'Floral & faunal biodiversity census, endangered Schedule-I species listing',
      'Socio-economic baseline: literacy, demographics, indigenous tribal settlements',
    ],
    mitigationCommitments: [
      'Preservation of topsoil stripped during construction for landscape restoration',
      'Protection of natural drainage channels and micro-watershed flow patterns',
      'Compensatory afforestation at a minimum 2:1 ratio for any felled timber',
    ],
    linkedModule: { name: 'Module 01: Ecosystems & Biodiversity', path: '/module/biodiversity', label: 'Biodiversity Baseline' },
  },
  {
    letter: 'C',
    theme: 'theme-C',
    title: 'Impact Identification & Prediction',
    desc: 'Assessment of likely environmental, social and economic impacts.',
    icon: BarChart3,
    thumbnailType: 'impact',
    fullDetail:
      'Applies mathematical modeling and GIS overlays to forecast environmental alterations across construction and operational phases. Quantifies magnitude, spatial extent, duration, and irreversibility using Leopold matrices and Gaussian plume models.',
    mandatoryParameters: [
      'AERMOD air dispersion simulations forecasting incremental ground-level concentrations',
      'Hydrodynamic runoff modeling for river discharge, thermal plume dissipation',
      'Acoustic decibel attenuation mapping from point machinery to residential receptors',
      'Traffic volume saturation studies and regional transport corridor impact',
    ],
    mitigationCommitments: [
      'Optimizing chimney stack heights to ensure CPCB NAAQS standards compliance',
      'Installation of acoustic enclosures, baffles, and machinery vibration dampeners',
      'Dedicated bypass lanes and timing restrictions for heavy transportation convoys',
    ],
    linkedModule: { name: 'Module 04: Environmental Pollution', path: '/module/air', label: 'Air & Noise Dispersion' },
  },
  {
    letter: 'D',
    theme: 'theme-D',
    title: 'Mitigation Measures',
    desc: 'Measures to avoid, minimize or compensate negative impacts.',
    icon: Sprout,
    thumbnailType: 'mitigation',
    fullDetail:
      'Hierarchy of mitigation controls prioritising avoidance at source, followed by reduction, on-site recycling, bio-engineering slope stabilization, and compensatory ecological restoration.',
    mandatoryParameters: [
      'Detailed engineering blueprints of high-efficiency pollution control devices',
      'Zero Liquid Discharge (ZLD) effluent treatment systems with multi-effect evaporators',
      'Bio-engineering slope stabilization: terracing, retaining walls, vegetative geotextiles',
      'Local community benefit schemes: clean drinking water RO plants, primary clinics',
    ],
    mitigationCommitments: [
      'Electrostatic Precipitators (ESPs) and baghouse filters with 99.8% capture efficiency',
      '100% recycling of treated industrial effluent for boiler makeup and greening',
      'Comprehensive occupational health and safety (OHS) safety protocols',
    ],
    linkedModule: { name: 'Module 04: Pollution Control Equipment', path: '/module/air', label: 'Control Technologies' },
  },
  {
    letter: 'E',
    theme: 'theme-E',
    title: 'Environmental Management Plan (EMP)',
    desc: 'Action plan for implementation of mitigation measures.',
    icon: Cog,
    thumbnailType: 'emp',
    fullDetail:
      'Statutory administrative blueprint detailing organizational roles, capital (CAPEX) and recurring (OPEX) budget allocations, implementation time schedules, and compliance audits for all promised mitigation measures.',
    mandatoryParameters: [
      'Organogram of on-site Environmental Management Cell (EMC) with dedicated engineers',
      'Line-item capital expenditure (CAPEX) budget (typically 2% to 5% of total project cost)',
      'Recurring annual operating budget (OPEX) for continuous maintenance and audits',
      'Standard Operating Procedures (SOPs) for hazardous waste disposal and spill containment',
    ],
    mitigationCommitments: [
      'Third-party quarterly environmental audits by accredited environmental laboratories',
      'Transparent display of real-time emission and effluent data at project main entrance',
      'Mandatory annual environmental statement (Form-V) statutory filings to SPCB',
    ],
    linkedModule: { name: 'Module 03: Sustainable Governance', path: '/module/land', label: 'EMP Governance' },
  },
  {
    letter: 'F',
    theme: 'theme-F',
    title: 'Monitoring Plan',
    desc: 'Plan to monitor environmental parameters during construction and operation.',
    icon: Radio,
    thumbnailType: 'monitoring',
    fullDetail:
      'Defines the surveillance network: parameter frequencies, testing protocols, monitoring station locations, and online Continuous Emission Monitoring Systems (CEMS) directly connected to CPCB/SPCB central telemetry servers.',
    mandatoryParameters: [
      'Continuous Emission Monitoring System (CEMS) for stacks (PM, SO₂, NOₓ, CO)',
      'Online effluent continuous monitoring analyzer (pH, COD, BOD, TSS, Flow)',
      'Quarterly groundwater heavy metal testing in boundary monitoring piezometer wells',
      'Semi-annual ambient noise surveillance across industrial and buffer perimeter rings',
    ],
    mitigationCommitments: [
      'Automated telemetry relaying live data 24/7 to CPCB cloud monitoring portals',
      'Immediate automatic process shutdown trip protocols upon exceeding emission thresholds',
      'Calibrated sensor verification every 30 days by certified calibration labs',
    ],
    linkedModule: { name: 'Module 02: Water Quality Monitoring', path: '/module/water', label: 'Hydrological Sensors' },
  },
  {
    letter: 'G',
    theme: 'theme-G',
    title: 'Risk Assessment',
    desc: 'Analysis of potential risks and emergency preparedness plans.',
    icon: ShieldAlert,
    thumbnailType: 'risk',
    fullDetail:
      'Identification of hazardous events: fire explosions, chemical leaks, structural dam breaches, or toxic gas dispersions. Formulates On-Site and Off-Site Disaster Management Plans (DMP) and community evacuation protocols.',
    mandatoryParameters: [
      'Hazard and Operability (HAZOP) analysis and Maximum Credible Accident (MCA) scenarios',
      'Consequence modeling for toxic plume dispersion and thermal radiation blast zones',
      'On-site Disaster Management Plan (DMP) specifying alarms, muster points, emergency roles',
      'Off-site emergency coordination manual with District Collector and emergency services',
    ],
    mitigationCommitments: [
      'Bi-annual unannounced mock drills for plant personnel and surrounding community leaders',
      'Redundant automated fail-safe deluge valves and emergency gas scrubbing towers',
      'Pre-allocated emergency response vehicles, antidotes, and dedicated medical response',
    ],
    linkedModule: { name: 'Module 04: Industrial Hazards & Pollution', path: '/module/air', label: 'Risk Protocols' },
  },
  {
    letter: 'H',
    theme: 'theme-H',
    title: 'Additional Studies',
    desc: 'As required (surveys, modelling, special studies, etc.).',
    icon: FileStack,
    thumbnailType: 'additional',
    fullDetail:
      'Specialized statutory investigations prescribed in the ToR, including Public Consultation video hearing documentation, Resettlement & Rehabilitation (R&R) packages, mine closure plans, and traffic density studies.',
    mandatoryParameters: [
      'Public Hearing proceedings: point-by-point proponent commitments to public objections',
      'Resettlement & Rehabilitation (R&R) plan complying with RFCTLARR Act guidelines',
      'Hydrogeological tracer investigations evaluating deep underground aquifer continuity',
      'Cumulative impact assessment accounting for surrounding future industrial expansions',
    ],
    mitigationCommitments: [
      'Legally binding financial escrow guarantees for final mine closure and land reclamation',
      'Direct community livelihood training programs and indigenous employment guarantees',
      'Quarterly progress reports on public hearing commitment fulfillment to regional MoEFCC',
    ],
    linkedModule: { name: 'Module 01: Community & Conservation', path: '/module/biodiversity', label: 'Social Safeguards' },
  },
];

export function WarmingEiaReportScreen() {
  const [selectedComp, setSelectedComp] = useState<DomainComponent | null>(null);
  const [modalType, setModalType] = useState<'comprehensive' | 'rapid' | 'example' | null>(null);
  useModalScrollLock(Boolean(selectedComp || modalType), () => {
    setSelectedComp(null);
    setModalType(null);
  });

  // SVG Thumbnail Renderers (Ultra-Crisp, Zero Blurry Crops)
  const renderSubcardThumb = (type: DomainComponent['thumbnailType']) => {
    switch (type) {
      case 'project':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#071927" />
            {/* Blueprint Grid */}
            <path d="M0 12 H80 M0 24 H80 M0 36 H80 M20 0 V48 M40 0 V48 M60 0 V48" stroke="#0e3a5a" strokeWidth="0.5" />
            {/* Modern Industrial Plant */}
            <rect x="14" y="20" width="22" height="24" fill="#0284c7" />
            <polygon points="14,20 25,12 36,20" fill="#38bdf8" />
            <rect x="40" y="14" width="26" height="30" fill="#0369a1" />
            <rect x="48" y="6" width="6" height="12" fill="#38bdf8" />
            {/* Chimney subtle puff */}
            <circle cx="51" cy="4" r="1.5" fill="#93c5fd" opacity="0.6" />
          </svg>
        );

      case 'baseline':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#052e16" />
            {/* Forest Mountain and River */}
            <polygon points="0,26 22,12 44,22 66,8 80,18 80,34 0,34" fill="#15803d" />
            <polygon points="18,24 32,16 48,24" fill="#22c55e" />
            {/* Winding Blue River */}
            <path d="M0,48 Q25,36 42,40 T80,32 L80,48 Z" fill="#0284c7" />
            <path d="M0,48 Q25,36 42,40 T80,32" stroke="#38bdf8" strokeWidth="1" fill="none" />
            {/* Trees */}
            <polygon points="10,32 14,24 18,32" fill="#14532d" />
            <polygon points="28,30 32,22 36,30" fill="#14532d" />
          </svg>
        );

      case 'impact':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#1c1206" />
            {/* Assessment Bar Chart */}
            <rect x="14" y="32" width="6" height="12" rx="1" fill="#ea580c" />
            <rect x="24" y="24" width="6" height="20" rx="1" fill="#f97316" />
            <rect x="34" y="16" width="6" height="28" rx="1" fill="#fb923c" />
            <rect x="44" y="28" width="6" height="16" rx="1" fill="#f59e0b" />
            {/* Magnifying Glass */}
            <circle cx="56" cy="20" r="10" stroke="#f97316" strokeWidth="1.8" fill="rgba(249,115,22,0.2)" />
            <line x1="63" y1="27" x2="74" y2="38" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="52" y1="18" x2="60" y2="18" stroke="#ffffff" strokeWidth="1" />
            <line x1="52" y1="22" x2="58" y2="22" stroke="#ffffff" strokeWidth="1" />
          </svg>
        );

      case 'mitigation':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#1c0a0a" />
            {/* Cupped Hands & Sprout */}
            <circle cx="40" cy="24" r="18" fill="rgba(220,38,38,0.18)" />
            {/* Soil Mound */}
            <ellipse cx="40" cy="36" rx="16" ry="5" fill="#78350f" />
            {/* Green Sprout Leaf */}
            <path d="M40,36 C40,28 34,26 34,22 C38,22 40,25 40,30 C40,24 46,20 48,22 C48,26 44,28 40,36 Z" fill="#22c55e" />
            <line x1="40" y1="36" x2="40" y2="28" stroke="#15803d" strokeWidth="1.2" />
          </svg>
        );

      case 'emp':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#190a2a" />
            {/* Interlocking Gears */}
            <circle cx="34" cy="24" r="11" stroke="#9333ea" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            <circle cx="34" cy="24" r="5" fill="#a855f7" />
            <circle cx="48" cy="24" r="8" stroke="#c084fc" strokeWidth="1.8" strokeDasharray="2.5 1.5" fill="none" />
            <circle cx="48" cy="24" r="3.5" fill="#d8b4fe" />
            {/* Central Green Leaf in gear */}
            <path d="M34,24 C34,19 39,18 39,18 C39,18 40,22 36,25 Z" fill="#4ade80" />
          </svg>
        );

      case 'monitoring':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#08202a" />
            {/* Ambient Monitoring Station */}
            <line x1="40" y1="20" x2="28" y2="42" stroke="#0891b2" strokeWidth="1.2" />
            <line x1="40" y1="20" x2="52" y2="42" stroke="#0891b2" strokeWidth="1.2" />
            <line x1="40" y1="20" x2="40" y2="42" stroke="#0891b2" strokeWidth="1.2" />
            <rect x="36" y="16" width="8" height="6" fill="#06b6d4" rx="1" />
            {/* Anemometer & Solar panel */}
            <line x1="40" y1="16" x2="40" y2="10" stroke="#0891b2" strokeWidth="1.2" />
            <circle cx="37" cy="10" r="1.5" fill="#22d3ee" />
            <circle cx="43" cy="10" r="1.5" fill="#22d3ee" />
            <polygon points="46,18 54,16 54,20 46,22" fill="#0284c7" />
          </svg>
        );

      case 'risk':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#1c1206" />
            {/* Warning Shield & Exclamation */}
            <polygon points="40,8 58,16 54,34 40,42 26,34 22,16" stroke="#d97706" strokeWidth="1.6" fill="rgba(217,119,6,0.18)" />
            <polygon points="40,14 52,32 28,32" stroke="#fbbf24" strokeWidth="1.2" fill="#f59e0b" fillOpacity="0.25" />
            <line x1="40" y1="20" x2="40" y2="26" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="40" cy="29" r="1" fill="#ffffff" />
          </svg>
        );

      case 'additional':
        return (
          <svg viewBox="0 0 80 48" className="eia-domain-thumb-svg" fill="none">
            <rect width="80" height="48" fill="#1d0a21" />
            {/* Stack of Additional Study Reports */}
            <polygon points="26,16 66,16 58,40 18,40" fill="#a855f7" opacity="0.5" />
            <polygon points="22,12 62,12 54,36 14,36" fill="#c026d3" opacity="0.8" />
            <polygon points="18,8 58,8 50,32 10,32" fill="#f0abfc" />
            <rect x="18" y="8" width="5" height="24" fill="#a21caf" />
            {/* Gold Ribbon Bookmark */}
            <polygon points="36,8 42,8 40,24 39,22 38,24" fill="#f59e0b" />
          </svg>
        );
    }
  };

  return (
    <section
      className="eia-report-screen-container"
      id="ch-13-eia-report"
      aria-label="Chapter 13: EIA Report Components — A Complete View of the EIA Report"
    >
      {/* Anchor alias hook to ensure rail links always land accurately */}
      <span id="ch-12-eia-report" style={{ position: 'absolute', top: 0, left: 0 }} />

      {/* ── Background Layer with Landscape, Dam & Office Elements ── */}
      <div className="eia-report-screen-bg">
        <img
          src="/images/warming-eia-intro-bg.jpg"
          alt="EIA Report Components: Sustainable Planning, Infrastructure and Hydroelectric Valley"
          loading="eager"
        />
        <div className="eia-report-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Green Glowing Quote Card (Right) ── */}
      <div className="eia-rep-top-bar">
        {/* Left Header */}
        <div className="eia-rep-header-block">
          <div className="eia-rep-eyebrow">
            <span>MODULE 05</span>
            <span className="eia-rep-eyebrow-pipe">|</span>
            <span>CHAPTER 13</span>
          </div>
          <h1 className="eia-rep-main-title">EIA Report Components</h1>
          <h2 className="eia-rep-subtitle">A Complete View of the EIA Report</h2>
          <p className="eia-rep-lead-text">
            The EIA report presents a detailed assessment of the likely environmental, social
            and economic impacts of a proposed project, along with mitigation measures and
            a management plan. In India, the report is prepared as per the EIA Notification, 2006
            (and subsequent amendments).
          </p>
        </div>

        {/* Right Green Quote Card matching Image Mockup */}
        <div className="eia-rep-quote-card">
          <span className="eia-rep-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="eia-rep-quote-text">
            &ldquo;A well-prepared EIA report turns environmental concerns into actionable plans
            for a sustainable future.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Middle Section: Two Wide Side-by-Side Cards (Comprehensive vs Rapid) ── */}
      <div className="eia-rep-duo-grid">
        {/* Card 1: Comprehensive EIA Report (Blue Theme) */}
        <div
          className="eia-duo-card theme-blue"
          onClick={() => setModalType('comprehensive')}
          role="button"
          tabIndex={0}
          aria-label="Inspect Comprehensive EIA Report Details"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setModalType('comprehensive');
            }
          }}
        >
          <div className="eia-duo-card-header">
            <div className="eia-duo-header-left">
              <div className="eia-duo-icon-box">
                <FileText size={20} />
              </div>
              <div className="eia-duo-titles">
                <h3 className="eia-duo-title">Comprehensive EIA Report</h3>
                <p className="eia-duo-subtitle">
                  Detailed and in-depth study for projects with significant environmental impacts.
                </p>
              </div>
            </div>
            <div className="eia-duo-arrow-btn" aria-hidden="true">
              <ArrowRight size={13} />
            </div>
          </div>

          <div className="eia-duo-card-body">
            <ul className="eia-duo-checklist">
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Extensive baseline data collection (all 4 seasons / full year)</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Detailed impact prediction and mathematical modeling</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Comprehensive mitigation measures &amp; alternatives analysis</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Environmental Management Plan (EMP) with dedicated budget</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Public consultation results and video hearing documentation</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Submitted for appraisal and clearance by EAC / MoEFCC</span>
              </li>
            </ul>

            {/* 3D Perspective Dossier Thumbnail */}
            <div className="eia-duo-visual-cover">
              <svg viewBox="0 0 140 110" style={{ width: '100%', height: '100%' }} fill="none">
                <rect width="140" height="110" fill="#08182b" />
                {/* 3D Binder Dossier */}
                <polygon points="30,12 118,12 106,96 18,96" fill="#ffffff" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.6))" />
                <polygon points="18,96 106,96 102,100 14,100" fill="#94a3b8" />
                {/* Blue spine */}
                <polygon points="30,12 37,12 25,96 18,96" fill="#0284c7" />
                {/* Report text on cover */}
                <text x="68" y="28" fill="#0f172a" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
                  ENVIRONMENTAL
                </text>
                <text x="68" y="36" fill="#0f172a" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
                  IMPACT
                </text>
                <text x="68" y="44" fill="#0f172a" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
                  ASSESSMENT
                </text>
                <text x="68" y="52" fill="#0284c7" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
                  REPORT
                </text>
                {/* Green landscape window on cover */}
                <rect x="36" y="58" width="56" height="26" rx="2" fill="#0284c7" />
                <polygon points="36,78 50,68 62,74 74,64 92,76 92,84 36,84" fill="#22c55e" />
                <polygon points="56,76 68,68 84,76" fill="#15803d" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Rapid EIA Report (Green Theme) */}
        <div
          className="eia-duo-card theme-green"
          onClick={() => setModalType('rapid')}
          role="button"
          tabIndex={0}
          aria-label="Inspect Rapid EIA Report Details"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setModalType('rapid');
            }
          }}
        >
          <div className="eia-duo-card-header">
            <div className="eia-duo-header-left">
              <div className="eia-duo-icon-box">
                <Clock size={20} />
              </div>
              <div className="eia-duo-titles">
                <h3 className="eia-duo-title">Rapid EIA Report</h3>
                <p className="eia-duo-subtitle">
                  A simplified and quicker assessment for smaller projects with minimal impacts.
                </p>
              </div>
            </div>
            <div className="eia-duo-arrow-btn" aria-hidden="true">
              <ArrowRight size={13} />
            </div>
          </div>

          <div className="eia-duo-card-body">
            <ul className="eia-duo-checklist">
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Limited baseline data (collected over 1 season, non-monsoon)</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Focused impact analysis on critical environmental receptors</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Basic mitigation measures with standard engineering controls</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Simplified Environmental Management Plan</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Shorter preparation time enabling expedited decision-making</span>
              </li>
              <li className="eia-duo-check-item">
                <span className="eia-duo-check-icon">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>Used for Category B / smaller projects with localized footprint</span>
              </li>
            </ul>

            {/* 3D Perspective Dossier Thumbnail */}
            <div className="eia-duo-visual-cover">
              <svg viewBox="0 0 140 110" style={{ width: '100%', height: '100%' }} fill="none">
                <rect width="140" height="110" fill="#042012" />
                {/* Stack of Rapid Reports */}
                <polygon points="34,20 114,20 102,96 22,96" fill="#94a3b8" />
                <polygon points="28,14 108,14 96,90 16,90" fill="#cbd5e1" />
                <polygon points="22,8 102,8 90,84 10,84" fill="#ffffff" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.6))" />
                {/* Green spine */}
                <polygon points="22,8 28,8 16,84 10,84" fill="#16a34a" />
                {/* Title */}
                <text x="56" y="24" fill="#064e3b" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
                  RAPID
                </text>
                <text x="56" y="33" fill="#047857" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
                  EIA REPORT
                </text>
                {/* Green Twin-leaf symbol */}
                <circle cx="56" cy="46" r="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8" />
                <path d="M52,48 C52,42 58,40 58,40 C58,40 60,46 55,48 Z" fill="#16a34a" />
                <path d="M60,48 C60,43 55,42 55,42 C55,42 54,47 58,49 Z" fill="#22c55e" />
                {/* Landscape window at bottom */}
                <rect x="28" y="58" width="56" height="18" rx="2" fill="#14532d" />
                <polygon points="28,72 40,64 52,69 64,62 84,72 84,76 28,76" fill="#4ade80" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Key Components of an EIA Report (A through H Cards Grid) ── */}
      <div className="eia-rep-components-panel">
        <div className="eia-comp-panel-header">
          <div className="eia-comp-panel-header-left">
            <div className="eia-comp-header-icon">
              <FileText size={16} />
            </div>
            <h3 className="eia-comp-panel-title">Key Components of an EIA Report</h3>
          </div>
          <div className="eia-comp-panel-arrow" aria-hidden="true">
            <ArrowRight size={13} />
          </div>
        </div>

        <div className="eia-comp-cards-grid">
          {domainComponents.map((comp) => (
            <div
              key={comp.letter}
              className={`eia-domain-subcard ${comp.theme}`}
              onClick={() => setSelectedComp(comp)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect Component ${comp.letter}: ${comp.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedComp(comp);
                }
              }}
            >
              <div className="eia-domain-top-row">
                <span className="eia-domain-letter-badge">{comp.letter}</span>
                <span className="eia-domain-title">{comp.title}</span>
              </div>

              <div className="eia-domain-thumb-box">
                {renderSubcardThumb(comp.thumbnailType)}
              </div>

              <p className="eia-domain-desc">{comp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 4: Bottom 3 Panels (Links, Key Takeaway, Explore Example) ── */}
      <div className="eia-rep-bottom-strip">
        {/* Panel 1: Links with Other Modules */}
        <div className="eia-bottom-links-panel">
          <div className="eia-links-header">
            <div className="eia-links-icon-wrap">
              <Link2 size={18} />
            </div>
            <div className="eia-links-titles">
              <h4 className="eia-links-title">Links with Other Modules</h4>
              <p className="eia-links-desc">
                The EIA report integrates knowledge from all previous modules:
              </p>
            </div>
          </div>

          <div className="eia-module-pills-grid">
            <Link to="/module/biodiversity" className="eia-module-pill-btn pill-green" title="Open Module 01">
              <TreePine size={14} />
              <span>Module 01</span>
              <span>Ecosystems &amp; Biodiversity</span>
            </Link>

            <Link to="/module/water" className="eia-module-pill-btn pill-blue" title="Open Module 02">
              <Sparkles size={14} />
              <span>Module 02</span>
              <span>Natural Resources</span>
            </Link>

            <Link to="/module/land" className="eia-module-pill-btn pill-purple" title="Open Module 03">
              <TrendingUp size={14} />
              <span>Module 03</span>
              <span>Sustainable Development</span>
            </Link>

            <Link to="/module/air" className="eia-module-pill-btn pill-amber" title="Open Module 04">
              <Flame size={14} />
              <span>Module 04</span>
              <span>Environmental Pollution</span>
            </Link>
          </div>
        </div>

        {/* Panel 2: Key Takeaway */}
        <div className="eia-bottom-takeaway-panel">
          <div className="eia-takeaway-header">
            <div className="eia-takeaway-icon-wrap">
              <Lightbulb size={18} />
            </div>
            <h4 className="eia-takeaway-title">Key Takeaway</h4>
          </div>

          <div className="eia-takeaway-body">
            <div className="eia-takeaway-doc-icon">
              <FileText size={16} />
            </div>
            <p className="eia-takeaway-text">
              The EIA report is a structured document that brings together scientific analysis,
              impact assessment, mitigation measures and management plans to support
              informed decision-making.
            </p>
          </div>
        </div>

        {/* Panel 3: Explore Example Report */}
        <div
          className="eia-bottom-example-panel"
          onClick={() => setModalType('example')}
          role="button"
          tabIndex={0}
          aria-label="View sample EIA report structure"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setModalType('example');
            }
          }}
        >
          <div className="eia-example-header">
            <div className="eia-example-header-left">
              <div className="eia-example-icon-wrap">
                <FileText size={18} />
              </div>
              <h4 className="eia-example-title">Explore Example Report</h4>
            </div>
            <div className="eia-example-arrow" aria-hidden="true">
              <ArrowRight size={12} />
            </div>
          </div>

          <div className="eia-example-body">
            <div className="eia-example-thumb-book">
              <svg viewBox="0 0 48 34" style={{ width: '100%', height: '100%' }} fill="none">
                <polygon points="12,4 46,4 40,30 6,30" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
                <polygon points="6,30 40,30 38,32 4,32" fill="#cbd5e1" />
                <line x1="16" y1="10" x2="38" y2="10" stroke="#0284c7" strokeWidth="1.2" />
                <line x1="14" y1="14" x2="36" y2="14" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="13" y1="18" x2="34" y2="18" stroke="#94a3b8" strokeWidth="0.8" />
                <line x1="12" y1="22" x2="32" y2="22" stroke="#94a3b8" strokeWidth="0.8" />
              </svg>
            </div>
            <p className="eia-example-text">
              View a sample EIA report structure and content (to understand how the components come together).
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive Modal Dialog (A to H Components & Sample Report) ── */}
      <AnimatePresence>
        {selectedComp && (
          <div
            className="eia-rep-modal-backdrop"
            onClick={() => setSelectedComp(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="eia-rep-modal-window"
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
                className="eia-rep-modal-close-btn"
                onClick={() => setSelectedComp(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eia-rep-modal-body">
                <span className="eia-rep-modal-eyebrow">
                  MoEFCC Statutory EIA Dossier · Component Chapter {selectedComp.letter}
                </span>
                <h2 className="eia-rep-modal-title">{selectedComp.title}</h2>
                <p className="eia-rep-modal-desc">{selectedComp.fullDetail}</p>

                <div className="eia-rep-modal-box">
                  <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '6px' }}>
                    Mandatory Baseline &amp; Prediction Parameters:
                  </strong>
                  <ul className="eia-rep-modal-list">
                    {selectedComp.mandatoryParameters.map((param, i) => (
                      <li key={i}>
                        <Check size={14} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                        <span>{param}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="eia-rep-modal-box" style={{ borderLeftColor: '#4ade80' }}>
                  <strong style={{ color: '#4ade80', display: 'block', marginBottom: '6px' }}>
                    Statutory Mitigation Commitments:
                  </strong>
                  <ul className="eia-rep-modal-list">
                    {selectedComp.mitigationCommitments.map((mit, i) => (
                      <li key={i}>
                        <Check size={14} style={{ color: '#4ade80', flexShrink: 0, marginTop: '2px' }} />
                        <span>{mit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedComp.linkedModule && (
                  <Link
                    to={selectedComp.linkedModule.path}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      color: '#7dd3fc',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                      width: 'fit-content',
                    }}
                  >
                    <span>Connect to {selectedComp.linkedModule.name}</span>
                    <ExternalLink size={13} />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal for Comprehensive / Rapid Comparison or Sample Report */}
        {modalType && (
          <div
            className="eia-rep-modal-backdrop"
            onClick={() => setModalType(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="eia-rep-modal-window"
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
                className="eia-rep-modal-close-btn"
                onClick={() => setModalType(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eia-rep-modal-body">
                {modalType === 'comprehensive' && (
                  <>
                    <span className="eia-rep-modal-eyebrow">Statutory Depth · Comprehensive EIA</span>
                    <h2 className="eia-rep-modal-title">Comprehensive EIA Report (Full-Year Study)</h2>
                    <p className="eia-rep-modal-desc">
                      Mandated for high-impact Category &ldquo;A&rdquo; developmental proposals (mega-dams, thermal power stations, mining leases &gt; 50 ha, petroleum refineries). Requires 12 continuous months of baseline data collection across summer, post-monsoon, and winter seasons (excluding monsoon for air sampling).
                    </p>
                    <div className="eia-rep-modal-box">
                      <strong style={{ color: '#38bdf8' }}>Appraisal Authority:</strong> MoEFCC Expert Appraisal Committee (EAC) at national headquarters in New Delhi.
                    </div>
                  </>
                )}

                {modalType === 'rapid' && (
                  <>
                    <span className="eia-rep-modal-eyebrow" style={{ color: '#4ade80' }}>
                      Expedited Timeline · Rapid EIA
                    </span>
                    <h2 className="eia-rep-modal-title">Rapid EIA Report (Single-Season Study)</h2>
                    <p className="eia-rep-modal-desc">
                      A fast-track statutory assessment utilized for Category &ldquo;B1&rdquo; medium projects. Relies on one season of representative baseline fieldwork (typically during the most ecologically vulnerable non-monsoon season). Enables expedited environmental clearance within 105 statutory days.
                    </p>
                    <div className="eia-rep-modal-box" style={{ borderLeftColor: '#4ade80' }}>
                      <strong style={{ color: '#4ade80' }}>Appraisal Authority:</strong> State Environmental Impact Assessment Authority (SEIAA / SEAC).
                    </div>
                  </>
                )}

                {modalType === 'example' && (
                  <>
                    <span className="eia-rep-modal-eyebrow" style={{ color: '#e879f9' }}>
                      Official Case Study · Executive Summary
                    </span>
                    <h2 className="eia-rep-modal-title">Sample Statutory EIA Report: 500 MW Solar &amp; Pumped Hydro</h2>
                    <p className="eia-rep-modal-desc">
                      An authentic 280-page EIA dossier submitted under MoEFCC guidelines, comprising Chapters 1 through 8 (A to H), including 3D AERMOD dust emission projections, hydrological watershed balance, 33% native neem and peepal greenbelt plantation, and verbatim local village public hearing resolutions.
                    </p>
                    <div className="eia-rep-modal-box" style={{ borderLeftColor: '#c026d3' }}>
                      <strong style={{ color: '#e879f9' }}>Statutory Clearance Status:</strong> Environmental Clearance (EC) Granted with 24 specific ecological monitoring conditions.
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
