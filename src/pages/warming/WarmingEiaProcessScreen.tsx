import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSearch,
  Crosshair,
  Layers,
  BarChart3,
  Settings,
  FileText,
  Users,
  Scale,
  FileCheck,
  Gavel,
  Target,
  Leaf,
  ArrowRight,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  Building,
} from 'lucide-react';
import './WarmingEiaProcessScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface PhaseCardItem {
  num: number;
  theme: string;
  title: string;
  subtitle: string;
  icon: typeof FileSearch;
  // Specific visual indicator type
  visualType: 'checklist' | 'tor' | 'baseline' | 'gis' | 'mitigation' | 'report' | 'public' | 'appraisal' | 'approval';
  authority: string;
  timeline: string;
  fullDetail: string;
  syllabusRef: string;
}

const phasesList: PhaseCardItem[] = [
  {
    num: 1,
    theme: 'theme-blue',
    title: 'Screening',
    subtitle: 'Determine whether a project requires EIA and the level of assessment.',
    icon: FileSearch,
    visualType: 'checklist',
    authority: 'State / Central Regulatory Authority (MoEFCC / SEIAA)',
    timeline: 'Initial Statutory Scrutiny',
    fullDetail:
      'Projects are categorized based on spatial scale and ecological risk: Category A mandates central-level EIA with MoEFCC; Category B is appraised by State authorities (SEIAA), further screened into B1 (mandatory EIA) and B2 (exempted). Category C projects pose negligible threat.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 1 — Project Screening',
  },
  {
    num: 2,
    theme: 'theme-green',
    title: 'Scoping',
    subtitle: 'Identify key issues and prepare Terms of Reference (ToR).',
    icon: Crosshair,
    visualType: 'tor',
    authority: 'Expert Appraisal Committee (EAC) / Proponent Consultant',
    timeline: 'Within 60 days of Form-1 submission',
    fullDetail:
      'Formulates customized, statutory Terms of Reference (ToR). Defines spatial impact boundaries, study timeframe, and quantifiable metrics (magnitude, prevalence, frequency, and duration) across air, water, land, noise, and biodiversity.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 2 — Terms of Reference (ToR)',
  },
  {
    num: 3,
    theme: 'theme-purple',
    title: 'Baseline Studies',
    subtitle: 'Collect and analyze existing environmental, social and economic data.',
    icon: Layers,
    visualType: 'baseline',
    authority: 'Accredited EIA Consultant Organization (NABET/QCI)',
    timeline: '1 season (Rapid EIA) or 4 seasons (Comprehensive EIA)',
    fullDetail:
      'Multi-disciplinary field sampling capturing pre-project ambient quality: ambient air (PM10, PM2.5, SO₂, NOx), surface & groundwater quality, terrestrial flora/fauna diversity, ambient noise levels, and local socio-economic demographics.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 3 — Baseline Data Collection',
  },
  {
    num: 4,
    theme: 'theme-orange',
    title: 'Impact Prediction & Evaluation',
    subtitle: 'Assess the likely environmental, social and economic impacts of the project.',
    icon: BarChart3,
    visualType: 'gis',
    authority: 'Environmental Modeling Specialists',
    timeline: 'Draft EIA Preparation Phase',
    fullDetail:
      'Mathematical simulations of atmospheric plume dispersion (AERMOD), hydrodynamic watershed runoff modeling, and ecological sensitivity matrices to forecast environmental changes comparing "with project" vs "without project" scenarios.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 4 — Impact Prediction & Evaluation',
  },
  {
    num: 5,
    theme: 'theme-red',
    title: 'Mitigation Measures',
    subtitle: 'Propose measures to minimize negative impacts and enhance positive impacts.',
    icon: Settings,
    visualType: 'mitigation',
    authority: 'Project Engineering Team & Environmental Management Cell',
    timeline: 'Integrated into Environmental Management Plan (EMP)',
    fullDetail:
      'Engineering safeguards including bag filters, electrostatic precipitators (ESPs), zero liquid discharge (ZLD) effluent recycling, 33% mandatory greenbelt buffer plantation, and systematic topsoil preservation and reuse plans.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 5 — Delineation of Mitigation Measures',
  },
  {
    num: 6,
    theme: 'theme-cyan',
    title: 'EIA Report Preparation',
    subtitle: 'Compile findings, impact assessment and mitigation plans into a comprehensive EIA report.',
    icon: FileText,
    visualType: 'report',
    authority: 'Accredited Lead EIA Coordinator',
    timeline: 'Formal Compilation for Statutory Submission',
    fullDetail:
      'Compiles baseline inventories, impact matrices, mitigation commitments, risk assessment, disaster management plans, and an executive summary translated into the local regional language for public dissemination.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 6 — EIA Report Compilation',
  },
  {
    num: 7,
    theme: 'theme-magenta',
    title: 'Public Consultation',
    subtitle: 'Share the project details with the public and stakeholders and address concerns.',
    icon: Users,
    visualType: 'public',
    authority: 'State Pollution Control Board (SPCB) & District Collector',
    timeline: '45 days mandatory notice and hearing period',
    fullDetail:
      'Mandatory public hearing organized at or near the project site. Affected local farmers, villagers, indigenous groups, and civic societies voice grievances. All proceedings are video recorded and submitted verbatim to the appraisal committee.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 7 — Mandatory Public Hearing',
  },
  {
    num: 8,
    theme: 'theme-gold',
    title: 'Appraisal',
    subtitle: 'Expert committees review the EIA report and public feedback to recommend decision.',
    icon: Scale,
    visualType: 'appraisal',
    authority: 'Expert Appraisal Committee (EAC / SEAC)',
    timeline: '60 days from receipt of final report & hearing minutes',
    fullDetail:
      'An independent collegiate body of environmental scientists, hydrologists, and legal experts scrutinizes the EIA report, public hearing objections, and proponent commitments to recommend approval, modification, or rejection.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 8 — Collegiate Technical Appraisal',
  },
  {
    num: 9,
    theme: 'theme-emerald',
    title: 'Decision & Clearance',
    subtitle: 'Competent authority grants environmental clearance with specific conditions or rejects the proposal.',
    icon: FileCheck,
    visualType: 'approval',
    authority: 'Ministry of Environment, Forest & Climate Change (MoEFCC)',
    timeline: 'Final Order within 45 days of EAC recommendation',
    fullDetail:
      'Regulatory authority grants formal statutory Environmental Clearance (EC) with legally binding stipulations, or formally rejects the application. Requires six-monthly compliance monitoring reports submitted to regional offices.',
    syllabusRef: 'BCV755B Module 5 · Section 3.5: Phase 9 — Environmental Clearance (EC)',
  },
];

export function WarmingEiaProcessScreen() {
  const [selectedPhase, setSelectedPhase] = useState<PhaseCardItem | null>(null);
  useModalScrollLock(Boolean(selectedPhase), () => setSelectedPhase(null));

  // Ultra-crisp vector illustrations matching Image 1 without any blurry crops
  const renderCardThumbnail = (phase: PhaseCardItem) => {
    switch (phase.visualType) {
      case 'checklist':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="EIA Required Checklist">
            <rect width="120" height="72" fill="#0b1728" />
            {/* Paper sheet */}
            <rect x="20" y="8" width="80" height="56" rx="3" fill="#ffffff" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.6))" />
            <rect x="25" y="13" width="48" height="2" fill="#0284c7" />
            <text x="25" y="23" fill="#0f172a" fontSize="6.8" fontWeight="800" fontFamily="Inter, sans-serif">
              EIA REQUIRED?
            </text>
            {/* Checked Yes */}
            <rect x="25" y="29" width="8" height="8" rx="1.5" stroke="#ef4444" strokeWidth="1.2" fill="#fee2e2" />
            <path d="M27 33 L29.5 35.5 L34 30" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="37" y="36" fill="#1e293b" fontSize="6.8" fontWeight="800" fontFamily="Inter, sans-serif">
              Yes
            </text>
            {/* Box No */}
            <rect x="25" y="42" width="8" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="#ffffff" />
            <text x="37" y="49" fill="#64748b" fontSize="6.8" fontWeight="700" fontFamily="Inter, sans-serif">
              No
            </text>
            {/* Paper subtle ruling lines */}
            <line x1="68" y1="33" x2="90" y2="33" stroke="#e2e8f0" strokeWidth="1.2" />
            <line x1="68" y1="41" x2="86" y2="41" stroke="#e2e8f0" strokeWidth="1.2" />
            <line x1="68" y1="49" x2="90" y2="49" stroke="#e2e8f0" strokeWidth="1.2" />
          </svg>
        );

      case 'tor':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="Terms of Reference Conference">
            <rect width="120" height="72" fill="#06181e" />
            {/* Ambient screen glow */}
            <radialGradient id="torGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#06181e" stopOpacity="0" />
            </radialGradient>
            <rect width="120" height="48" fill="url(#torGlow)" />
            {/* Projection Screen */}
            <rect x="22" y="6" width="76" height="34" rx="2" fill="#082f25" stroke="#16a34a" strokeWidth="1" />
            <rect x="25" y="9" width="70" height="28" rx="1.5" fill="#0f3d2e" />
            <text x="60" y="20" fill="#4ade80" fontSize="5.2" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.04em">
              TERMS OF REFERENCE
            </text>
            <text x="60" y="29" fill="#86efac" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">
              (ToR)
            </text>
            {/* Conference boardroom table & attendee silhouettes */}
            <ellipse cx="60" cy="58" rx="48" ry="14" fill="#04151a" stroke="#134e4a" strokeWidth="0.8" />
            <circle cx="34" cy="48" r="4" fill="#1e293b" />
            <path d="M28 58 C28 52, 40 52, 40 58 Z" fill="#1e293b" />
            <circle cx="60" cy="46" r="4.2" fill="#334155" />
            <path d="M53 58 C53 51, 67 51, 67 58 Z" fill="#334155" />
            <circle cx="86" cy="48" r="4" fill="#1e293b" />
            <path d="M80 58 C80 52, 92 52, 92 58 Z" fill="#1e293b" />
          </svg>
        );

      case 'baseline':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="Baseline Environmental Studies Fieldwork">
            {/* Sky and distant mountains */}
            <linearGradient id="blSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>
            <rect width="120" height="38" fill="url(#blSky)" />
            {/* Snowcapped peaks */}
            <polygon points="0,32 26,14 46,28 74,10 102,26 120,18 120,44 0,44" fill="#475569" />
            <polygon points="68,28 74,12 84,26" fill="#f8fafc" />
            <polygon points="20,30 26,16 34,28" fill="#f8fafc" />
            {/* Pine forest ridge */}
            <polygon points="0,38 12,32 22,38 34,30 46,38 60,32 76,38 90,30 108,38 120,32 120,48 0,48" fill="#14532d" />
            {/* Blue Alpine Lake */}
            <rect x="0" y="40" width="120" height="32" fill="#0284c7" />
            <path d="M0,45 Q30,43 60,45 T120,45 L120,72 L0,72 Z" fill="#0369a1" />
            {/* Green shoreline */}
            <path d="M68,48 Q85,44 120,50 L120,72 L50,72 Z" fill="#15803d" />
            {/* Surveyor optical theodolite tripod */}
            <line x1="84" y1="52" x2="76" y2="68" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="84" y1="52" x2="84" y2="69" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="84" y1="52" x2="91" y2="68" stroke="#0f172a" strokeWidth="1.2" />
            <rect x="81" y="47" width="6" height="5" fill="#f59e0b" />
            <line x1="77" y1="48" x2="89" y2="48" stroke="#0f172a" strokeWidth="1.5" />
            {/* Field Surveyor in high-vis vest */}
            <circle cx="102" cy="46" r="3.5" fill="#eab308" />
            <rect x="99" y="50" width="7" height="12" rx="1.5" fill="#84cc16" />
            <line x1="102" y1="50" x2="102" y2="62" stroke="#ffffff" strokeWidth="1" />
            <line x1="100" y1="62" x2="98" y2="70" stroke="#1e3a8a" strokeWidth="1.5" />
            <line x1="104" y1="62" x2="105" y2="70" stroke="#1e3a8a" strokeWidth="1.5" />
          </svg>
        );

      case 'gis':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="3D GIS Topographic Heatmap Dispersion">
            <rect width="120" height="72" fill="#0b1322" />
            {/* Mountain terrain mesh */}
            <polygon points="0,26 30,14 62,24 88,10 120,22 120,38 0,38" fill="#1e293b" />
            {/* Isometric 3D Terrain grid */}
            <path d="M10,48 L60,32 L110,48 L60,66 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.7" />
            {/* GIS Rainbow Heatmap Plume */}
            <ellipse cx="60" cy="50" rx="36" ry="14" fill="#06b6d4" opacity="0.35" />
            <ellipse cx="60" cy="49" rx="26" ry="10" fill="#22c55e" opacity="0.55" />
            <ellipse cx="60" cy="48" rx="17" ry="7" fill="#f59e0b" opacity="0.75" />
            <ellipse cx="60" cy="47" rx="9" ry="4" fill="#ef4444" opacity="0.9" />
            {/* Contour lines */}
            <path d="M24,46 Q60,30 96,46" stroke="#f97316" strokeWidth="1" strokeDasharray="2 1" fill="none" />
            <path d="M34,50 Q60,36 86,50" stroke="#fbbf24" strokeWidth="1" fill="none" />
            <text x="60" y="20" fill="#fdba74" fontSize="5.2" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
              GIS DISPERSION MODEL
            </text>
          </svg>
        );

      case 'mitigation':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="Engineered Hillside Mitigation and Retaining Walls">
            <rect width="120" height="72" fill="#0d1f18" />
            {/* Mountain hillside */}
            <polygon points="0,0 120,0 120,38 0,58" fill="#14532d" />
            {/* Stepped terraced retaining walls */}
            <polygon points="20,12 110,4 115,10 25,18" fill="#78716c" stroke="#d6d3d1" strokeWidth="0.5" />
            <polygon points="18,22 105,14 110,20 23,28" fill="#57534e" stroke="#d6d3d1" strokeWidth="0.5" />
            <polygon points="15,32 100,24 105,30 20,38" fill="#44403c" stroke="#d6d3d1" strokeWidth="0.5" />
            {/* Vegetative slope pins */}
            <line x1="20" y1="12" x2="23" y2="28" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="1 1" />
            <line x1="50" y1="9" x2="52" y2="25" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="1 1" />
            <line x1="80" y1="6" x2="82" y2="22" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="1 1" />
            {/* Engineered mountain highway */}
            <path d="M0,72 Q35,62 55,52 T120,38" stroke="#1e293b" strokeWidth="14" fill="none" />
            <path d="M0,72 Q35,62 55,52 T120,38" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 2" fill="none" />
            {/* Red safety crash barrier */}
            <path d="M0,72 Q35,62 55,52 T120,38" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 1" fill="none" transform="translate(0, -6)" />
          </svg>
        );

      case 'report':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="Formal EIA Report Volumes">
            <rect width="120" height="72" fill="#082032" />
            {/* Stack of Report Volumes */}
            <polygon points="34,22 104,22 94,62 24,62" fill="#94a3b8" />
            <polygon points="24,62 94,62 92,65 22,65" fill="#64748b" />
            <polygon points="30,18 100,18 90,58 20,58" fill="#cbd5e1" />
            <polygon points="20,58 90,58 88,61 18,61" fill="#94a3b8" />
            {/* Top report */}
            <polygon points="26,14 96,14 86,54 16,54" fill="#ffffff" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))" />
            <polygon points="16,54 86,54 84,57 14,57" fill="#cbd5e1" />
            {/* Blue spine */}
            <polygon points="26,14 31,14 21,54 16,54" fill="#0284c7" />
            {/* Title & Crest */}
            <text x="60" y="27" fill="#0f172a" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.05em">
              EIA REPORT
            </text>
            <line x1="42" y1="31" x2="78" y2="31" stroke="#0284c7" strokeWidth="0.8" />
            <circle cx="60" cy="41" r="6" stroke="#16a34a" strokeWidth="0.8" fill="#f0fdf4" />
            <path d="M57,43 C57,39 63,38 63,38 C63,38 64,43 59,44 Z" fill="#16a34a" />
          </svg>
        );

      case 'public':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="Town Hall Public Consultation Hearing">
            <rect width="120" height="72" fill="#1b0e2b" />
            {/* Stage illumination glow */}
            <radialGradient id="hearingGlow" cx="50%" cy="10%" r="60%">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1b0e2b" stopOpacity="0" />
            </radialGradient>
            <rect width="120" height="40" fill="url(#hearingGlow)" />
            {/* Presentation Stage Screen */}
            <rect x="35" y="4" width="50" height="24" rx="1.5" fill="#3b0764" stroke="#c026d3" strokeWidth="0.8" />
            <rect x="38" y="7" width="44" height="18" fill="#581c87" />
            <text x="60" y="16" fill="#f5d0fe" fontSize="4.6" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">
              PUBLIC HEARING
            </text>
            <text x="60" y="21" fill="#c084fc" fontSize="3.6" textAnchor="middle" fontFamily="Inter, sans-serif">
              SPCB & Stakeholders
            </text>
            {/* Audience rows */}
            <circle cx="20" cy="38" r="2.8" fill="#4a1d96" />
            <circle cx="34" cy="37" r="2.8" fill="#4a1d96" />
            <circle cx="48" cy="36" r="2.8" fill="#4a1d96" />
            <circle cx="60" cy="35" r="2.8" fill="#581c87" />
            <circle cx="72" cy="36" r="2.8" fill="#4a1d96" />
            <circle cx="86" cy="37" r="2.8" fill="#4a1d96" />
            <circle cx="100" cy="38" r="2.8" fill="#4a1d96" />
            <circle cx="16" cy="48" r="3.2" fill="#6b21a8" />
            <circle cx="30" cy="47" r="3.2" fill="#6b21a8" />
            <circle cx="45" cy="46" r="3.2" fill="#6b21a8" />
            <circle cx="60" cy="45" r="3.2" fill="#7e22ce" />
            <circle cx="75" cy="46" r="3.2" fill="#6b21a8" />
            <circle cx="90" cy="47" r="3.2" fill="#6b21a8" />
            <circle cx="104" cy="48" r="3.2" fill="#6b21a8" />
            {/* Front row foreground */}
            <circle cx="22" cy="60" r="4.2" fill="#2e1065" />
            <path d="M14,72 C14,64 30,64 30,72 Z" fill="#2e1065" />
            <circle cx="46" cy="58" r="4.2" fill="#3b0764" />
            <path d="M38,72 C38,62 54,62 54,72 Z" fill="#3b0764" />
            <circle cx="74" cy="58" r="4.2" fill="#3b0764" />
            <path d="M66,72 C66,62 82,62 82,72 Z" fill="#3b0764" />
            <circle cx="98" cy="60" r="4.2" fill="#2e1065" />
            <path d="M90,72 C90,64 106,64 106,72 Z" fill="#2e1065" />
          </svg>
        );

      case 'appraisal':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="Expert Appraisal Committee Boardroom">
            <rect width="120" height="72" fill="#1c1406" />
            {/* Boardroom glow */}
            <radialGradient id="apprGlow" cx="50%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1c1406" stopOpacity="0" />
            </radialGradient>
            <rect width="120" height="48" fill="url(#apprGlow)" />
            {/* Wall Presentation Screen */}
            <rect x="24" y="5" width="72" height="28" rx="2" fill="#291e0a" stroke="#d97706" strokeWidth="0.8" />
            <rect x="27" y="8" width="66" height="22" fill="#451a03" />
            <text x="60" y="17" fill="#fbbf24" fontSize="4.6" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.04em">
              EXPERT APPRAISAL
            </text>
            <text x="60" y="24" fill="#fde68a" fontSize="5.2" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">
              COMMITTEE
            </text>
            {/* Boardroom deliberation table */}
            <ellipse cx="60" cy="54" rx="42" ry="12" fill="#291e0a" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="34" cy="44" r="3.8" fill="#451a03" />
            <path d="M28,54 C28,48 40,48 40,54 Z" fill="#451a03" />
            <circle cx="50" cy="42" r="3.8" fill="#78350f" />
            <path d="M44,52 C44,46 56,46 56,52 Z" fill="#78350f" />
            <circle cx="70" cy="42" r="3.8" fill="#78350f" />
            <path d="M64,52 C64,46 76,46 76,52 Z" fill="#78350f" />
            <circle cx="86" cy="44" r="3.8" fill="#451a03" />
            <path d="M80,54 C80,48 92,48 92,54 Z" fill="#451a03" />
            <rect x="54" y="50" width="12" height="6" fill="#fef3c7" rx="0.5" />
          </svg>
        );

      case 'approval':
        return (
          <svg viewBox="0 0 120 72" className="phase-thumb-svg" fill="none" aria-label="Official Environmental Clearance Approved Certificate">
            <rect width="120" height="72" fill="#041f16" />
            {/* Formal statutory certificate */}
            <rect x="16" y="6" width="88" height="60" rx="2" fill="#ffffff" filter="drop-shadow(0 3px 8px rgba(0,0,0,0.6))" />
            <rect x="20" y="10" width="80" height="2" fill="#059669" />
            <text x="60" y="18" fill="#064e3b" fontSize="5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.04em">
              ENVIRONMENTAL CLEARANCE
            </text>
            <line x1="24" y1="23" x2="96" y2="23" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="24" y1="27" x2="90" y2="27" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="24" y1="31" x2="94" y2="31" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="24" y1="35" x2="76" y2="35" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* Green ink Approved stamp */}
            <g transform="rotate(-6 60 48)">
              <rect x="36" y="38" width="50" height="20" rx="3" stroke="#059669" strokeWidth="1.8" fill="#d1fae5" fillOpacity="0.85" />
              <rect x="39" y="41" width="44" height="14" rx="2" stroke="#059669" strokeWidth="0.8" fill="none" strokeDasharray="2 1" />
              <text x="61" y="51" fill="#047857" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
                APPROVED
              </text>
            </g>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <section
      className="eia-process-screen-container"
      id="ch-11-eia-process"
      aria-label="Chapter 12: 9-Phase Indian EIA Procedure — From Proposal to Clearance"
    >
      {/* ── Background Layer with Mountain River with Construction ── */}
      <div className="eia-process-screen-bg">
        <img
          src="/images/warming-eia-intro-bg.jpg"
          alt="9-Phase Indian EIA: Hydroelectric Construction & Sustainable Infrastructure"
          loading="eager"
        />
        <div className="eia-process-screen-vignette" />
      </div>

      {/* ── Top Bar: Header Block (Left) + Cyan Ambient Quote Card (Right) ── */}
      <div className="eia-proc-top-bar">
        {/* Left Header */}
        <div className="eia-proc-header-block">
          <div className="eia-proc-eyebrow">
            <span>MODULE 05</span>
            <span className="eia-proc-eyebrow-pipe">|</span>
            <span>CHAPTER 12</span>
          </div>
          <h1 className="eia-proc-main-title">
            <span className="eia-proc-title-prefix">9-Phase Indian </span>
            <span className="eia-proc-title-highlight">EIA Procedure</span>
          </h1>
          <h2 className="eia-proc-subtitle">From Proposal to Clearance</h2>
          <p className="eia-proc-lead-text">
            The Environmental Impact Assessment (EIA) in India follows a structured 9-phase
            procedure as per the EIA Notification, 2006 (and subsequent amendments) to ensure
            development is environmentally sustainable and socially responsible.
          </p>
        </div>

        {/* Right Quote Card matching Image 1 */}
        <div className="eia-proc-quote-card">
          <span className="eia-proc-quote-symbol" aria-hidden="true">
            “
          </span>
          <p className="eia-proc-quote-text">
            &ldquo;A systematic EIA procedure ensures that development and environmental protection
            go hand in hand.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Main Stage: 3×3 Cards Grid (9 Phases) ── */}
      <div className="eia-proc-cards-grid">
        {phasesList.map((phase) => {
          const Icon = phase.icon;

          return (
            <div
              key={phase.num}
              className={`eia-phase-glass-card ${phase.theme}`}
              onClick={() => setSelectedPhase(phase)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect Phase ${phase.num}: ${phase.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPhase(phase);
                }
              }}
            >
              {/* Left Badge Column */}
              <div className="eia-phase-badge-col">
                <span className="eia-phase-num-circle">{phase.num}</span>
                <div className="eia-phase-icon-box">
                  <Icon size={16} />
                </div>
              </div>

              {/* Middle Info Column */}
              <div className="eia-phase-info-col">
                <span className="eia-phase-title">{phase.title}</span>
                <p className="eia-phase-desc">{phase.subtitle}</p>
              </div>

              {/* Right Thumbnail & Action Column */}
              <div className="eia-phase-visual-col">
                {renderCardThumbnail(phase)}
                <div className="eia-phase-arrow-btn" aria-hidden="true">
                  <ArrowRight size={11} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Strip: 3 Wide Summary Panels (Matches Image 1) ── */}
      <div className="eia-proc-bottom-strip">
        {/* Panel 1: Governing Framework */}
        <div className="eia-summary-col theme-blue">
          <div className="eia-summary-icon-wrap">
            <Gavel size={18} />
          </div>
          <div className="eia-summary-body">
            <h3 className="eia-summary-title">Governing Framework</h3>
            <p className="eia-summary-desc">
              Conducted as per the EIA Notification, 2006 (and subsequent amendments), under the
              Environment (Protection) Act, 1986.
            </p>
          </div>
        </div>

        {/* Panel 2: Objective */}
        <div className="eia-summary-col theme-purple">
          <div className="eia-summary-icon-wrap">
            <Target size={18} />
          </div>
          <div className="eia-summary-body">
            <h3 className="eia-summary-title">Objective</h3>
            <p className="eia-summary-desc">
              Ensure environmentally sound, socially acceptable and economically viable
              development.
            </p>
          </div>
        </div>

        {/* Panel 3: Key Takeaway */}
        <div className="eia-summary-col theme-green">
          <div className="eia-summary-icon-wrap">
            <Leaf size={18} />
          </div>
          <div className="eia-summary-body">
            <h3 className="eia-summary-title">Key Takeaway</h3>
            <p className="eia-summary-desc">
              The 9-phase EIA procedure helps balance development needs with environmental
              protection and public participation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive Detail Modal ── */}
      <AnimatePresence>
        {selectedPhase && (
          <div
            className="eia-proc-modal-backdrop"
            onClick={() => setSelectedPhase(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="eia-proc-modal-window"
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
                className="eia-proc-modal-close-btn"
                onClick={() => setSelectedPhase(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eia-proc-modal-body">
                <span className="eia-proc-modal-eyebrow">
                  {selectedPhase.syllabusRef} · Phase #{selectedPhase.num}
                </span>
                <h2 className="eia-proc-modal-title">{selectedPhase.title}</h2>
                <p className="eia-proc-modal-desc">{selectedPhase.fullDetail}</p>

                <div className="eia-proc-modal-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Building size={15} style={{ color: '#38bdf8' }} />
                    <strong style={{ color: '#ffffff' }}>Executing Authority:</strong>
                    <span>{selectedPhase.authority}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} style={{ color: '#f59e0b' }} />
                    <strong style={{ color: '#ffffff' }}>Statutory Timeline:</strong>
                    <span>{selectedPhase.timeline}</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    fontSize: '12px',
                    color: '#bae6fd',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Sparkles size={16} className="shrink-0" />
                  <span>
                    <strong>Objective: </strong>
                    {selectedPhase.subtitle}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
