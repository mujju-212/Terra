import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Leaf,
  ClipboardList,
  BarChart3,
  Search,
  ShieldCheck,
  Users,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Trash2,
  FileEdit,
  GitBranch,
  Briefcase,
  Building2,
  GraduationCap,
  MessageCircle,
  Lightbulb,
  X,
} from 'lucide-react';
import './WarmingEiaFlowchartScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

// ── Types ──
interface StepNode {
  num: number;
  title: string;
  theme: string;
  icon: typeof FileText;
  badgeBg: string;
  badgeColor: string;
  desc: string;
  actor: string;
  timeline: string;
  statutoryDetail: string;
  keyOutputs: string;
}

// ── 9 Sequential Process Steps (Matches Reference Mockup) ──
const stepsData: StepNode[] = [
  {
    num: 1,
    title: 'Project Proposal',
    theme: 'step-blue',
    icon: FileText,
    badgeBg: '#0284c7',
    badgeColor: '#ffffff',
    desc: 'Submit project details to competent authority.',
    actor: 'Project Proponent',
    timeline: 'Day 0 (Initial Submission)',
    statutoryDetail:
      'The project proponent conceives the industrial, mining, or infrastructure project and submits Form 1, Form 1A, and a Pre-Feasibility Report (PFR) on the central PARIVESH portal for statutory assessment.',
    keyOutputs: 'Form 1 application, Pre-Feasibility Report (PFR), proposed draft Terms of Reference (ToR).',
  },
  {
    num: 2,
    title: 'Screening',
    theme: 'step-green',
    icon: Leaf,
    badgeBg: '#059669',
    badgeColor: '#ffffff',
    desc: 'Determine whether EIA is required and the level of assessment.',
    actor: 'Competent Authority',
    timeline: 'Within 30 Days of Submission',
    statutoryDetail:
      'Under the EIA Notification 2006, the regulatory authority classifies the project into Category A (central clearance by MoEFCC) or Category B (state clearance by SEIAA). Category B projects are further screened into B1 (mandatory EIA study) and B2 (exempt from comprehensive EIA study).',
    keyOutputs: 'Statutory categorization letter, formal decision on whether EIA is mandated or exempted.',
  },
  {
    num: 3,
    title: 'Scoping',
    theme: 'step-purple',
    icon: ClipboardList,
    badgeBg: '#9333ea',
    badgeColor: '#ffffff',
    desc: 'Identify key issues and prepare Terms of Reference (ToR).',
    actor: 'EAC / SEAC',
    timeline: 'Within 30–60 Days',
    statutoryDetail:
      'The Expert Appraisal Committee (EAC) determines comprehensive Terms of Reference (ToR) detailing the spatial study boundary (typically 10 km buffer), seasonal baseline monitoring requirements, and sector-specific environmental parameters to model.',
    keyOutputs: 'Approved Terms of Reference (ToR) document, environmental baseline survey guidelines.',
  },
  {
    num: 4,
    title: 'Baseline Studies',
    theme: 'step-orange',
    icon: BarChart3,
    badgeBg: '#ea580c',
    badgeColor: '#ffffff',
    desc: 'Collect data on environmental, social and economic conditions.',
    actor: 'Project Proponent',
    timeline: 'One Full Season (Excluding Monsoon)',
    statutoryDetail:
      'QCI-NABET accredited environmental consultants conduct field sampling to establish the existing environmental status across Air (PM2.5, PM10, SO2, NOx), Water (groundwater & surface), Noise levels, Soil chemistry, Flora/Fauna biodiversity, and socio-economic demographics.',
    keyOutputs: 'Baseline environmental data inventory, hydro-geological maps, ecological surveys.',
  },
  {
    num: 5,
    title: 'Impact Assessment',
    theme: 'step-red',
    icon: Search,
    badgeBg: '#dc2626',
    badgeColor: '#ffffff',
    desc: 'Predict and evaluate likely environmental, social and economic impacts.',
    actor: 'Project Proponent',
    timeline: '30–45 Days Analysis',
    statutoryDetail:
      'Applying scientific modeling tools (e.g. AERMOD dispersion models, noise contouring, and Leopold matrices), consultants quantify potential adverse deviations across construction, operational, and decommissioning phases, evaluating cumulative environmental consequences.',
    keyOutputs: 'Draft Environmental Impact Assessment (EIA) Report and Executive Summary in English and vernacular language.',
  },
  {
    num: 6,
    title: 'Mitigation Measures',
    theme: 'step-cyan',
    icon: ShieldCheck,
    badgeBg: '#0891b2',
    badgeColor: '#ffffff',
    desc: 'Propose measures to avoid, minimize or compensate for negative impacts.',
    actor: 'Project Proponent',
    timeline: 'Concurrent with Report Drafting',
    statutoryDetail:
      'Formulates an actionable Environmental Management Plan (EMP) specifying mandatory pollution prevention equipment (ETPs, STPs, Electrostatic Precipitators, baghouse filters), 33% mandatory greenbelt canopy, rainwater harvesting, and occupational safety protocols.',
    keyOutputs: 'Standalone Environmental Management Plan (EMP), capital & recurring budget allocation.',
  },
  {
    num: 7,
    title: 'Public Consultation',
    theme: 'step-magenta',
    icon: Users,
    badgeBg: '#a21caf',
    badgeColor: '#ffffff',
    desc: 'Share project details with the public and incorporate feedback.',
    actor: 'State Pollution Control Board',
    timeline: 'Within 45 Days of Application',
    statutoryDetail:
      'The State Pollution Control Board (SPCB) conducts a formal Public Hearing at the project site, presided over by the District Magistrate. Affected local inhabitants, tribal communities, and NGOs inspect the draft EIA, air grievances, and record official objections.',
    keyOutputs: 'Signed Public Hearing Minutes, video recording, proponent written commitments.',
  },
  {
    num: 8,
    title: 'Appraisal',
    theme: 'step-gold',
    icon: Award,
    badgeBg: '#ca8a04',
    badgeColor: '#ffffff',
    desc: 'Expert committee reviews the EIA report, public feedback and recommends decision.',
    actor: 'EAC / SEAC',
    timeline: 'Within 60 Days',
    statutoryDetail:
      'A multidisciplinary Expert Appraisal Committee evaluates the final EIA report, baseline datasets, public hearing submissions, and developer commitments in a formal hearing, deciding whether to recommend approval (with specific stipulations) or rejection.',
    keyOutputs: 'Official EAC Recommendation Minutes, list of site-specific clearance conditions.',
  },
  {
    num: 9,
    title: 'Decision & Clearance',
    theme: 'step-emerald',
    icon: CheckCircle2,
    badgeBg: '#15803d',
    badgeColor: '#ffffff',
    desc: 'Competent authority grants environmental clearance with specific conditions or rejects.',
    actor: 'MoEF&CC / State Authority',
    timeline: 'Within 45 Days of Recommendation',
    statutoryDetail:
      'The regulatory ministry (MoEF&CC for Category A, SEIAA for Category B) reviews EAC advice and issues a legally binding Environmental Clearance (EC) order, valid for 7 to 10 years, contingent upon half-yearly compliance reporting.',
    keyOutputs: 'Official Environmental Clearance (EC) Letter, gazette notification, compliance monitoring mandate.',
  },
];

export function WarmingEiaFlowchartScreen() {
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
      className="warming-chapter-screen eia-flowchart-screen-container"
      id="ch-12-eia-flowchart"
      aria-label="Chapter 13: EIA Process Flowchart with Decision Path"
    >
      {/* ── Background Dam Reservoir Layer with Clear Day Sun & Mountain Valley ── */}
      <div className="eia-flowchart-screen-bg">
        <img
          src="/images/water-ch07-ibwt-bg.jpg"
          alt="Hydroelectric Dam and Mountain Reservoir Valley Backdrop"
          loading="lazy"
        />
        <div className="eia-flowchart-screen-vignette" />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          TOP BAR: HEADER BLOCK & QUOTE CARD
          ────────────────────────────────────────────────────────────────────── */}
      <header className="eia-flowchart-top-bar">
        <div className="eia-flowchart-header-block">
          <div className="eia-flowchart-eyebrow">
            <Sparkles size={13} className="text-amber-400" />
            <span>MODULE 05 | CHAPTER 13</span>
          </div>
          <h2 className="eia-flowchart-main-title">EIA Flowchart</h2>
          <h3 className="eia-flowchart-subtitle">Complete Process with Decision Path</h3>
          <p className="eia-flowchart-lead-text">
            The EIA flowchart shows the step-by-step process from project proposal to environmental clearance, including key decision points, public consultation and possible outcomes.
          </p>
        </div>

        {/* Floating Quote Box */}
        <aside className="eia-flowchart-quote-box" aria-label="EIA Transparency Quote">
          <span className="flowchart-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote className="flowchart-quote-text">
            “A transparent and structured EIA process helps ensure informed decisions and a sustainable future.”
          </blockquote>
        </aside>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          MAIN STAGE: COMPLETE PROCESS FLOWCHART WITH DECISION PATH & LOOPS
          ────────────────────────────────────────────────────────────────────── */}
      <div className="eia-flowchart-stage-panel">
        {/* Start / End Boundary Indicators */}
        <div className="flowchart-boundary-row">
          <span className="boundary-pill pill-start">Start</span>
          <span className="boundary-pill pill-end">End</span>
        </div>

        {/* 9 Process Step Cards Horizontal Grid */}
        <div className="flowchart-steps-grid">
          {stepsData.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className={`flowchart-step-card ${step.theme}`}
                onClick={() =>
                  setActiveModal({
                    title: `Step ${step.num}: ${step.title}`,
                    badge: `STAGE ACTOR: ${step.actor.toUpperCase()}`,
                    badgeColor: step.badgeBg,
                    body: `${step.statutoryDetail}\n\nTimeline: ${step.timeline}`,
                    subtext: `Key Deliverables: ${step.keyOutputs}`,
                  })
                }
              >
                {/* Step Number Circle */}
                <div
                  className="step-num-badge"
                  style={{ background: step.badgeBg, color: step.badgeColor }}
                >
                  {step.num}
                </div>

                {/* Step Icon */}
                <div className="step-icon-wrap" style={{ color: step.badgeBg }}>
                  <IconComp size={20} />
                </div>

                {/* Title */}
                <h4 className="step-card-title">{step.title}</h4>

                {/* Description */}
                <p className="step-card-desc">{step.desc}</p>

                {/* Responsible Actor Badge */}
                <div className="step-actor-pill">{step.actor}</div>

                {/* Connecting Arrow (except last step) */}
                {idx < stepsData.length - 1 && (
                  <span className="step-arrow-connector">→</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Decision Network & Iterative Revision Loops (Matches Image 2) ── */}
        <div className="flowchart-decision-stage">
          {/* SVG Connector Lines */}
          <svg className="decision-svg-lines" viewBox="0 0 1000 150" preserveAspectRatio="none">
            <defs>
              <marker
                id="arrowYellowUp"
                viewBox="0 0 10 10"
                refX="5"
                refY="3"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 6 L 5 0 L 10 6 z" fill="#facc15" />
              </marker>
              <marker
                id="arrowGreenRight"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#34d399" />
              </marker>
              <marker
                id="arrowRedRight"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#f87171" />
              </marker>
              <marker
                id="arrowYellowLeft"
                viewBox="0 0 10 10"
                refX="4"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 10 1 L 2 5 L 10 9 z" fill="#facc15" />
              </marker>
            </defs>

            {/* Path 1 (Green Line): From Card 2 (Screening) down and into left of Review */}
            <path
              d="M 166 0 L 166 22 Q 166 34, 180 34 L 436 34"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              markerEnd="url(#arrowGreenRight)"
            />

            {/* Path 2 (Yellow Line): From Send Back for Revisions loopback left and UP into Card 1 (Project Proposal) */}
            <path
              d="M 235 118 L 68 118 Q 55 118, 55 105 L 55 6"
              fill="none"
              stroke="#facc15"
              strokeWidth="2.5"
              markerEnd="url(#arrowYellowUp)"
            />

            {/* Path 3 (Green Line): From right of Review -> through Yes -> into Grant Clearance */}
            <path
              d="M 645 34 L 678 34"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
            />
            <path
              d="M 732 34 L 766 34"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              markerEnd="url(#arrowGreenRight)"
            />

            {/* Path 4 (Red Line): From branch between Review and Yes down to No pill and into Reject Proposal */}
            <path
              d="M 660 34 L 660 105 Q 660 118, 678 118"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
            />
            <path
              d="M 732 118 L 766 118"
              fill="none"
              stroke="#f87171"
              strokeWidth="2.5"
              markerEnd="url(#arrowRedRight)"
            />

            {/* Path 5 (Yellow Line): From branch between Review and No down and into right of Send Back for Revisions */}
            <path
              d="M 660 85 Q 660 118, 642 118 L 440 118"
              fill="none"
              stroke="#facc15"
              strokeWidth="2.5"
              markerEnd="url(#arrowYellowLeft)"
            />
          </svg>

          {/* 9-Column Decision Grid Stage (Exactly mirrors the 9 steps above) */}
          <div className="decision-grid-stage">
            <div className="decision-col-blank" />
            <div className="decision-col-blank" />

            {/* Col 3-4: Send Back for Revisions */}
            <div className="decision-col-revision">
              <div
                className="outcome-revision-card"
                onClick={() =>
                  setActiveModal({
                    title: 'Send Back for Revisions (Resubmit EIA Report)',
                    badge: 'ITERATIVE FEEDBACK LOOP',
                    badgeColor: '#fbbf24',
                    body: 'When baseline data is incomplete, modeling methodologies are flawed, or public concerns remain unaddressed, the EAC does not outright reject the proposal. Instead, it instructs the proponent to collect additional seasonal data, redesign site boundaries, or strengthen the EMP and resubmit.',
                    subtext: 'Flowchart Loop: Resets proposal review back to Stage 1/4 for amended documentation.',
                  })
                }
              >
                <FileEdit size={16} className="text-amber-400 shrink-0" />
                <div style={{ flex: 1 }}>
                  <span className="outcome-revision-title">Send Back for Revisions</span>
                  <span className="outcome-revision-sub">(Resubmit EIA Report)</span>
                </div>
                <RotateCcw size={16} className="text-amber-400 shrink-0" />
              </div>
            </div>

            {/* Col 5-6: Review by Competent Authority */}
            <div className="decision-col-review">
              <div
                className="decision-review-card"
                onClick={() =>
                  setActiveModal({
                    title: 'Review by Competent Authority',
                    badge: 'DECISION JUNCTION',
                    badgeColor: '#38bdf8',
                    body: 'The regulatory authority and expert appraisal committees conduct a comprehensive technical audit of the final EIA report and EMP. If all Terms of Reference are met and public hearing concerns resolved, clearance is approved; otherwise, it is returned for mandatory revision or formally rejected.',
                    subtext: 'Criteria: Adequacy of baseline sampling, modeling accuracy, and feasibility of mitigation technologies.',
                  })
                }
              >
                <div className="decision-review-icon">
                  <Search size={18} />
                </div>
                <div>
                  <h5 className="decision-review-title">Review by Competent Authority</h5>
                  <p className="decision-review-sub">Is the EIA report satisfactory?</p>
                </div>
              </div>
            </div>

            {/* Col 7: Yes / No Choice Pills */}
            <div className="decision-col-pills">
              <span className="decision-choice-pill choice-yes">Yes</span>
              <span className="decision-choice-pill choice-no">No</span>
            </div>

            {/* Col 8-9: Grant Environmental Clearance / Reject Proposal */}
            <div className="decision-col-outcomes">
              {/* Row 1: Grant Clearance */}
              <div
                className="outcome-grant-card"
                onClick={() =>
                  setActiveModal({
                    title: 'Grant Environmental Clearance (with conditions)',
                    badge: 'CLEARANCE GRANTED',
                    badgeColor: '#34d399',
                    body: 'Statutory approval issued under Environment (Protection) Act 1986. Mandates specific conditions including online continuous emission monitoring (OCEMS), creation of a greenbelt, groundwater abstraction permits, and bi-annual compliance audit submissions.',
                    subtext: 'Enables developer to obtain Consent to Establish (CTE) and begin construction.',
                  })
                }
              >
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <div style={{ flex: 1 }}>
                  <h5 className="outcome-grant-title">Grant Environmental Clearance</h5>
                  <p className="outcome-grant-sub">(with conditions)</p>
                </div>
                <Leaf size={16} className="text-emerald-400 shrink-0" />
              </div>

              {/* Row 2: Reject Proposal */}
              <div
                className="outcome-reject-card"
                onClick={() =>
                  setActiveModal({
                    title: 'Reject Proposal',
                    badge: 'CLEARANCE REJECTED',
                    badgeColor: '#ef4444',
                    body: 'The project is officially denied clearance due to unacceptable ecological damage, location in ecologically sensitive areas (ESAs) like national parks, non-mitigable aquifer contamination, or unresolved community displacement.',
                    subtext: 'Proponent cannot proceed with construction. Aggrieved parties may appeal before the National Green Tribunal (NGT) within 30 days.',
                  })
                }
              >
                <XCircle size={16} className="text-rose-400 shrink-0" />
                <span className="outcome-reject-text">Reject Proposal</span>
                <Trash2 size={15} className="text-rose-400 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          BOTTOM ROW: THREE INFO CARDS (MATCHES MOCKUP)
          ────────────────────────────────────────────────────────────────────── */}
      <div className="eia-flowchart-bottom-grid">
        {/* Card 1: Key Stakeholders in the Process */}
        <div className="flowchart-bottom-card">
          <div className="bottom-card-header">
            <div className="bottom-card-title-group">
              <div
                className="bottom-card-badge"
                style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
              >
                <Users size={16} />
              </div>
              <h4 className="bottom-card-title">Key Stakeholders in the Process</h4>
            </div>
            <ArrowRight size={14} className="text-slate-400 cursor-pointer" />
          </div>

          <div className="stakeholders-cols-grid">
            {/* Stakeholder 1 */}
            <div
              className="stakeholder-item-col"
              onClick={() =>
                setActiveModal({
                  title: 'Project Proponent',
                  badge: 'INITIATOR & APPLICANT',
                  badgeColor: '#38bdf8',
                  body: 'The individual developer, public sector enterprise, or corporate entity seeking approval. Responsible for commissioning accredited consultants, funding baseline surveys, preparing the EIA report, and complying with all post-clearance conditions.',
                })
              }
            >
              <Briefcase size={16} className="stakeholder-icon text-sky-400" />
              <h5 className="stakeholder-name">Project Proponent</h5>
              <p className="stakeholder-desc">Prepares and submits the proposal and EIA report.</p>
            </div>

            {/* Stakeholder 2 */}
            <div
              className="stakeholder-item-col"
              onClick={() =>
                setActiveModal({
                  title: 'Regulatory Authorities',
                  badge: 'CLEARANCE ISSUER',
                  badgeColor: '#c084fc',
                  body: 'Ministry of Environment, Forest and Climate Change (MoEF&CC) at the central level, and State Environmental Impact Assessment Authorities (SEIAA) at the state level. Responsible for issuing legally binding clearance orders.',
                })
              }
            >
              <Building2 size={16} className="stakeholder-icon text-purple-400" />
              <h5 className="stakeholder-name">Regulatory Authorities</h5>
              <p className="stakeholder-desc">Screen, appraise and grant clearance.</p>
            </div>

            {/* Stakeholder 3 */}
            <div
              className="stakeholder-item-col"
              onClick={() =>
                setActiveModal({
                  title: 'Expert Committees',
                  badge: 'TECHNICAL SCRUTINY',
                  badgeColor: '#fbbf24',
                  body: 'Multidisciplinary bodies including the Expert Appraisal Committee (EAC) and State Expert Appraisal Committee (SEAC) consisting of environmental scientists, hydrologists, mining engineers, and socio-economic specialists who critically examine project viability.',
                })
              }
            >
              <GraduationCap size={16} className="stakeholder-icon text-amber-400" />
              <h5 className="stakeholder-name">Expert Committees</h5>
              <p className="stakeholder-desc">Review and evaluate the project.</p>
            </div>

            {/* Stakeholder 4 */}
            <div
              className="stakeholder-item-col"
              onClick={() =>
                setActiveModal({
                  title: 'Public & Stakeholders',
                  badge: 'DEMOCRATIC PARTICIPATION',
                  badgeColor: '#34d399',
                  body: 'Local residents, tribal gram sabhas, farmers, fishermen, and civil society NGOs likely to be affected by environmental contamination or displacement. Ensure community interests and traditional ecological knowledge are accounted for.',
                })
              }
            >
              <MessageCircle size={16} className="stakeholder-icon text-emerald-400" />
              <h5 className="stakeholder-name">Public &amp; Stakeholders</h5>
              <p className="stakeholder-desc">Provide feedback during consultation.</p>
            </div>
          </div>
        </div>

        {/* Card 2: Important Decision Points */}
        <div className="flowchart-bottom-card">
          <div className="bottom-card-header">
            <div className="bottom-card-title-group">
              <div
                className="bottom-card-badge"
                style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
              >
                <GitBranch size={16} />
              </div>
              <h4 className="bottom-card-title">Important Decision Points</h4>
            </div>
          </div>

          <div className="decision-points-list">
            <div
              className="decision-point-item"
              onClick={() =>
                setActiveModal({
                  title: 'Decision 1: Is EIA Required? (Screening)',
                  badge: 'STATUTORY SCREENING',
                  badgeColor: '#38bdf8',
                  body: 'Checks the project category in the EIA Notification Schedule. Category A requires central EIA; Category B requires state-level screening into B1 (EIA required) or B2 (exempt).',
                })
              }
            >
              <span className="decision-point-dot" style={{ background: '#38bdf8' }} />
              <span>Is EIA required? (Screening)</span>
            </div>

            <div
              className="decision-point-item"
              onClick={() =>
                setActiveModal({
                  title: 'Decision 2: Are the ToR Adequate? (Scoping)',
                  badge: 'SCOPING GATEWAY',
                  badgeColor: '#34d399',
                  body: 'The EAC scrutinizes whether standard Terms of Reference address unique environmental vulnerabilities, such as proximity to eco-sensitive zones, wildlife corridors, or dense human habitations.',
                })
              }
            >
              <span className="decision-point-dot" style={{ background: '#34d399' }} />
              <span>Are the ToR adequate? (Scoping)</span>
            </div>

            <div
              className="decision-point-item"
              onClick={() =>
                setActiveModal({
                  title: 'Decision 3: Is the EIA Report Satisfactory? (Appraisal)',
                  badge: 'APPRAISAL VERDICT',
                  badgeColor: '#fbbf24',
                  body: 'Verifies whether baseline datasets accurately represent ground reality and whether the proposed EMP mitigation measures adequately handle worst-case discharge scenarios.',
                })
              }
            >
              <span className="decision-point-dot" style={{ background: '#fbbf24' }} />
              <span>Is the EIA report satisfactory? (Appraisal)</span>
            </div>

            <div
              className="decision-point-item"
              onClick={() =>
                setActiveModal({
                  title: 'Decision 4: Grant Clearance with Conditions / Reject?',
                  badge: 'FINAL DETERMINATION',
                  badgeColor: '#f43f5e',
                  body: 'The competent ministry issues formal environmental clearance accompanied by specific safeguards, or rejects the proposal if environmental costs outweigh economic benefits.',
                })
              }
            >
              <span className="decision-point-dot" style={{ background: '#f43f5e' }} />
              <span>Grant clearance with conditions / Reject?</span>
            </div>
          </div>
        </div>

        {/* Card 3: Key Takeaway */}
        <div className="flowchart-bottom-card">
          <div className="bottom-card-header">
            <div className="bottom-card-title-group">
              <div
                className="bottom-card-badge"
                style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}
              >
                <Lightbulb size={16} />
              </div>
              <h4 className="bottom-card-title">Key Takeaway</h4>
            </div>
            <ArrowRight size={14} className="text-slate-400 cursor-pointer" />
          </div>

          <div className="takeaway-flex-layout">
            <div className="takeaway-thumb-wrap">
              <img
                src="/images/water-ch07-ibwt-bg.jpg"
                alt="Hydroelectric Dam River Valley"
                className="takeaway-thumb-img"
                loading="lazy"
              />
            </div>
            <p className="takeaway-text-copy">
              The EIA flowchart ensures a transparent and participatory decision-making process, balancing development with environmental protection.
            </p>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          INTERACTIVE DETAIL MODAL / POPUP
          ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <div
            className="flowchart-detail-overlay"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="flowchart-detail-modal"
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
                className="flowchart-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div
                className="flowchart-modal-badge"
                style={{
                  background: `${activeModal.badgeColor}22`,
                  border: `1px solid ${activeModal.badgeColor}66`,
                  color: activeModal.badgeColor,
                }}
              >
                <Sparkles size={12} />
                <span>{activeModal.badge}</span>
              </div>

              <h4 className="flowchart-modal-title">{activeModal.title}</h4>

              <div className="flowchart-modal-body">
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

              <div className="flowchart-modal-footer">
                <button
                  type="button"
                  className="flowchart-modal-primary-btn"
                  onClick={() => setActiveModal(null)}
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WarmingEiaFlowchartScreen;
