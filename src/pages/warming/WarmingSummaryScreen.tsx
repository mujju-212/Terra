import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Globe,
  Leaf,
  Activity,
  FileText,
  Layers,
  Settings,
  FileSpreadsheet,
  Scale,
  Target,
  Lightbulb,
  TrendingUp,
  Trophy,
  ArrowRightCircle,
  Compass,
  HelpCircle,
  X,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './WarmingSummaryScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

// ── Types ──
interface TopicCard {
  id: string;
  title: string;
  theme: string;
  icon: typeof Globe;
  iconColor: string;
  desc: string;
  detailedNotes: string;
}

interface ObjectiveItem {
  id: string;
  text: string;
  syllabusRef: string;
}

interface TakeawayItem {
  num: number;
  color: string;
  text: string;
  deepContext: string;
}

// ── 8 Key Topics Data (Matches Mockup Row 1) ──
const topicsData: TopicCard[] = [
  {
    id: 't1',
    title: 'Global Warming',
    theme: 'topic-blue',
    icon: Globe,
    iconColor: '#3b82f6',
    desc: 'Concept, causes, effects and indicators',
    detailedNotes:
      'Global warming is driven by the human-enhanced greenhouse effect. The planetary radiation budget splits incoming sunlight into ~30% reflected and ~70% absorbed. Anthropogenic emissions (CO₂ 80%, CH₄ 12.5%, N₂O, fluorinated gases) amplify thermal re-radiation, shifting Earth from natural equilibrium (-18°C void vs +15°C baseline).',
  },
  {
    id: 't2',
    title: 'Climate Change',
    theme: 'topic-green',
    icon: Leaf,
    iconColor: '#10b981',
    desc: 'Difference, global trends and major indicators',
    detailedNotes:
      'Climate change represents broad, long-term shifts in planetary meteorological dynamics—not merely surface temperature rises. Tracked via 8 major climate indicators: polar ice pack loss, ocean heat content surge, seawater acidification, wind jet stream deviations, precipitation shifts, intense cyclonic energy, and biome boundary migrations.',
  },
  {
    id: 't3',
    title: 'Human Health',
    theme: 'topic-purple',
    icon: Activity,
    iconColor: '#a855f7',
    desc: 'Impacts of climate change on human health',
    detailedNotes:
      'Global climate disruption directly and indirectly threatens human survival. Direct stressors include lethal urban heatwaves (2003 European heatwave claimed 35,000+ lives). Indirect pathways involve ground-level smog exacerbation (asthma, COPD), expanded mosquito vector corridors (malaria, dengue), and malnutrition from agrarian water stress.',
  },
  {
    id: 't4',
    title: 'Introduction to EIA',
    theme: 'topic-orange',
    icon: FileText,
    iconColor: '#ea580c',
    desc: 'Need, definition and legal framework',
    detailedNotes:
      'EIA is a formal predictive planning tool designed to evaluate environmental consequences prior to major infrastructure development. Rooted in US NEPA 1970 and codified in India under Section 3 of the Environment (Protection) Act 1986, it mandates proactive technological mitigation and site re-engineering.',
  },
  {
    id: 't5',
    title: 'EIA Values',
    theme: 'topic-teal',
    icon: Layers,
    iconColor: '#06b6d4',
    desc: 'Environmental, social and economic values',
    detailedNotes:
      'EIA is anchored by three universal pillars: Integrity (fair, rigorous, scientifically unbiased data collection), Utility (practical, credible decision inputs for regulators), and Sustainability (safeguarding ecological carrying capacity and intergenerational equity without crippling socio-economic progress).',
  },
  {
    id: 't6',
    title: 'EIA Procedure',
    theme: 'topic-pink',
    icon: Settings,
    iconColor: '#ec4899',
    desc: 'Step-by-step process with key stages',
    detailedNotes:
      'India follows a structured 4-stage statutory clearance mechanism under EIA Notification 2006: 1. Screening (Category A vs B1/B2), 2. Scoping (formulating Terms of Reference within 30 days), 3. Public Consultation (mandated 45-day SPCB site hearing), and 4. Appraisal (multidisciplinary EAC technical verdict within 60 days).',
  },
  {
    id: 't7',
    title: 'EIA Report Components',
    theme: 'topic-gold',
    icon: FileSpreadsheet,
    iconColor: '#eab308',
    desc: 'Detailed structure and key elements',
    detailedNotes:
      'A comprehensive Environmental Impact Statement (EIS) spans Chapters A through H: Project Description, Baseline Environmental Profile (Air, Water, Noise, Land, Biology, Socio-Economics), Impact Prediction & Modeling, Mitigation Measures, Environmental Management Plan (EMP), Risk Assessment & DMP, and Vernacular Executive Summary.',
  },
  {
    id: 't8',
    title: 'Benefits & Flaws',
    theme: 'topic-violet',
    icon: Scale,
    iconColor: '#8b5cf6',
    desc: 'Advantages, limitations and critical analysis',
    detailedNotes:
      'Balanced evaluation: EIA provides structured ecological foresight, democratic citizen participation, and avoids catastrophic post-construction remediation. However, limitations persist—including compliance monitoring gaps, consultant conflicts of interest, delays in clearance timelines, and post-facto regularization challenges.',
  },
];

// ── 7 Learning Objectives Data (Matches Mockup Row 2 Left) ──
const learningObjectives: ObjectiveItem[] = [
  {
    id: 'o1',
    text: 'Understand the concept and impact of global warming.',
    syllabusRef: 'Module 05 Part 1: Physics of Greenhouse Forcing & Radiation Balance',
  },
  {
    id: 'o2',
    text: 'Differentiate between global warming and climate change.',
    syllabusRef: 'Module 05 Part 1: Global Warming (Surface Temp) vs Climate Change (Systemic Shifts)',
  },
  {
    id: 'o3',
    text: 'Analyze environmental, social and economic impacts.',
    syllabusRef: 'Module 05 Part 1 & 2: Extreme Weather, Aquifer Depletion, Public Health & Agrarian Loss',
  },
  {
    id: 'o4',
    text: 'Learn the complete EIA procedure followed in India.',
    syllabusRef: 'Module 05 Part 3: 4-Stage Statutory Processing under EIA Notification 2006',
  },
  {
    id: 'o5',
    text: 'Identify and explain components of an EIA report.',
    syllabusRef: 'Module 05 Part 3: EIS Report Structure Across Air, Noise, Water, Land & EMP',
  },
  {
    id: 'o6',
    text: 'Evaluate the benefits and limitations of EIA.',
    syllabusRef: 'Module 05 Part 3: Proactive Foresight vs Post-Clearance Enforcement Deficits',
  },
  {
    id: 'o7',
    text: 'Understand the legal framework (Environment Protection Act 1986 and EIA Notification 2006).',
    syllabusRef: 'Module 05 Part 3: Constitutional Mandate (Article 48A/51A(g)) & Ministry Clearance Rules',
  },
];

// ── 6 Key Takeaways Data (Matches Mockup Row 2 Center) ──
const keyTakeaways: TakeawayItem[] = [
  {
    num: 1,
    color: '#3b82f6',
    text: 'EIA is a structured, legally defined process.',
    deepContext: 'Statutory mandate enforced by Central MoEF&CC and State SEIAA authorities under the EPA 1986.',
  },
  {
    num: 2,
    color: '#10b981',
    text: 'Helps in sustainable and informed development.',
    deepContext: 'Integrates ecological carrying capacity calculations directly into initial capital expenditure planning.',
  },
  {
    num: 3,
    color: '#a855f7',
    text: 'Considers environmental, social and economic impacts.',
    deepContext: 'Encompasses bio-physical ecology, indigenous livelihood rehabilitation, and public health safeguards.',
  },
  {
    num: 4,
    color: '#ea580c',
    text: 'Ensures public participation and transparency.',
    deepContext: 'Mandatory district public hearings guarantee local communities have legal voice in project approval.',
  },
  {
    num: 5,
    color: '#06b6d4',
    text: 'Has both significant benefits and certain limitations.',
    deepContext: 'Offers structured foresight but requires continuous drone/IoT audits to enforce post-clearance compliance.',
  },
  {
    num: 6,
    color: '#ec4899',
    text: 'Plays a crucial role in environmental protection and sustainable development.',
    deepContext: 'Crucial bridge aligning infrastructure expansion with the UN Sustainable Development Goals (SDGs 11, 13, 14, 15).',
  },
];

export function WarmingSummaryScreen() {
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
      className="warming-chapter-screen warming-summary-screen-container"
      id="warming-summary"
      aria-label="Module 05: Module Summary & Key Learnings"
    >
      {/* ── Background Layer with Image 2 (Sunset Hydro Dam Landscape) ── */}
      <div className="summary-screen-bg">
        <img
          src="/images/warming-summary-bg.jpg"
          alt="Sunset Hydroelectric Mountain Dam and Alpine Reservoir Backdrop"
          loading="lazy"
        />
        <div className="summary-screen-vignette" />
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          TOP BAR: HEADER BLOCK & QUOTE CARD
          ────────────────────────────────────────────────────────────────────── */}
      <header className="summary-top-bar">
        <div className="summary-header-block">
          <div className="summary-eyebrow">
            <Sparkles size={13} className="text-amber-400" />
            <span>MODULE 05 | CHAPTER 16</span>
          </div>
          <h2 className="summary-main-title">Module Summary</h2>
          <h3 className="summary-subtitle">Key Learnings and Takeaways</h3>
          <p className="summary-lead-text">
            This module explored the Environmental Impact Assessment (EIA) in India, covering its need, process, report components, benefits and limitations. EIA helps balance development with environmental protection by ensuring informed, transparent and participatory decision-making.
          </p>
        </div>

        {/* Floating Quote Box */}
        <aside className="summary-quote-box" aria-label="EIA Synthesis Quote">
          <span className="summary-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote className="summary-quote-text">
            “EIA bridges the gap between development and environmental conservation for a sustainable future.”
          </blockquote>
        </aside>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────
          ROW 1: KEY TOPICS COVERED (8 CARDS + VIEW ALL MODULES BUTTON)
          ────────────────────────────────────────────────────────────────────── */}
      <section className="summary-topics-panel" aria-label="Key Topics Covered">
        <div className="summary-topics-header">
          <div className="topics-title-group">
            <div className="topics-badge-icon">
              <BookOpen size={16} />
            </div>
            <h3 className="topics-main-heading">Key Topics Covered</h3>
          </div>
          <Link to="/#modules" className="view-all-modules-btn">
            <span>View All Modules</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="summary-topics-grid">
          {topicsData.map((topic) => {
            const IconComp = topic.icon;
            return (
              <div
                key={topic.id}
                className={`topic-card-tile ${topic.theme}`}
                onClick={() =>
                  setActiveModal({
                    title: topic.title,
                    badge: 'TOPIC SYNTHESIS',
                    badgeColor: topic.iconColor,
                    body: topic.detailedNotes,
                    subtext: `Key Scope: ${topic.desc}`,
                  })
                }
              >
                <div className="topic-tile-icon-box" style={{ color: topic.iconColor }}>
                  <IconComp size={18} />
                </div>
                <h4 className="topic-tile-title">{topic.title}</h4>
                <p className="topic-tile-desc">{topic.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────
          ROW 2: THREE GLASS CARDS (OBJECTIVES, TAKEAWAYS, RELEVANCE)
          ────────────────────────────────────────────────────────────────────── */}
      <div className="summary-middle-grid">
        {/* Column 1: Learning Objectives Achieved */}
        <div className="summary-panel-card" aria-label="Learning Objectives Achieved">
          <div className="panel-card-header">
            <div
              className="panel-header-badge"
              style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
            >
              <Target size={16} />
            </div>
            <h4 className="panel-main-title">Learning Objectives Achieved</h4>
          </div>

          <div className="objectives-checklist">
            {learningObjectives.map((obj) => (
              <div
                key={obj.id}
                className="objective-item-row"
                onClick={() =>
                  setActiveModal({
                    title: 'Learning Objective Verified',
                    badge: 'COMPETENCY OUTCOME',
                    badgeColor: '#10b981',
                    body: obj.text,
                    subtext: `Syllabus Unit: ${obj.syllabusRef}`,
                  })
                }
              >
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="objective-text">{obj.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Key Takeaways */}
        <div className="summary-panel-card" aria-label="Key Takeaways">
          <div className="panel-card-header">
            <div
              className="panel-header-badge"
              style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}
            >
              <Lightbulb size={16} />
            </div>
            <h4 className="panel-main-title">Key Takeaways</h4>
          </div>

          <div className="takeaways-numbered-list">
            {keyTakeaways.map((takeaway) => (
              <div
                key={takeaway.num}
                className="takeaway-pill-row"
                onClick={() =>
                  setActiveModal({
                    title: `Key Takeaway 0${takeaway.num}`,
                    badge: 'CORE TAKEAWAY',
                    badgeColor: takeaway.color,
                    body: takeaway.text,
                    subtext: takeaway.deepContext,
                  })
                }
              >
                <span
                  className="takeaway-num-pill"
                  style={{ background: takeaway.color }}
                >
                  {takeaway.num}
                </span>
                <p className="takeaway-pill-desc">{takeaway.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Real-World Relevance */}
        <div className="summary-panel-card" aria-label="Real-World Relevance">
          <div className="panel-card-header">
            <div
              className="panel-header-badge"
              style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
            >
              <TrendingUp size={16} />
            </div>
            <h4 className="panel-main-title">Real-World Relevance</h4>
          </div>

          <div className="relevance-layout">
            <div className="relevance-thumb-box">
              <img
                src="/images/warming-summary-bg.jpg"
                alt="Real World Hydroelectric Dam and Clean Energy Grid"
                loading="lazy"
              />
            </div>
            <p className="relevance-copy-text">
              EIA ensures that infrastructure, industrial and developmental projects are planned and implemented in an environmentally sustainable and socially responsible manner.
            </p>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          ROW 3: COMPLETION, NEXT STEP & FURTHER LEARNING
          ────────────────────────────────────────────────────────────────────── */}
      <div className="summary-bottom-grid">
        {/* Bottom 1: Module Completion */}
        <div className="summary-panel-card">
          <div className="panel-card-header">
            <div
              className="panel-header-badge"
              style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
            >
              <Trophy size={16} />
            </div>
            <h4 className="panel-main-title">Module Completion</h4>
          </div>

          <div className="completion-body">
            <div className="progress-track-row">
              <div className="progress-bar-rail">
                <div className="progress-bar-fill" />
              </div>
              <span className="progress-pct-badge">100%</span>
            </div>

            <div className="completion-success-banner">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>You have completed all topics in this module!</span>
            </div>
          </div>
        </div>

        {/* Bottom 2: Next Step */}
        <div className="summary-panel-card">
          <div className="panel-card-header">
            <div
              className="panel-header-badge"
              style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
            >
              <ArrowRightCircle size={16} />
            </div>
            <h4 className="panel-main-title">Next Step</h4>
          </div>

          <div className="next-step-body">
            <p className="next-step-prompt">
              Proceed to the Final Assessment to test your understanding.
            </p>
            <Link to="/quiz?module=warming" className="start-assessment-btn">
              <span>Start Final Assessment</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom 3: Further Learning */}
        <div className="summary-panel-card">
          <div className="panel-card-header">
            <div
              className="panel-header-badge"
              style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
            >
              <BookOpen size={16} />
            </div>
            <h4 className="panel-main-title">Further Learning</h4>
          </div>

          <div className="further-learning-list">
            <Link to="/resources" className="further-item-row">
              <div className="further-left-group">
                <Compass size={14} className="further-bullet-icon" />
                <span>Explore additional resources</span>
              </div>
              <ChevronRight size={14} className="further-chevron" />
            </Link>

            <Link to="/quiz?module=warming" className="further-item-row">
              <div className="further-left-group">
                <HelpCircle size={14} className="further-bullet-icon" />
                <span>Take the module quiz</span>
              </div>
              <ChevronRight size={14} className="further-chevron" />
            </Link>

            <div
              className="further-item-row cursor-pointer"
              onClick={() =>
                setActiveModal({
                  title: 'EIA Case Studies & Real Projects',
                  badge: 'CASE STUDIES',
                  badgeColor: '#a855f7',
                  body: 'Explore major Indian infrastructure EIA case studies: Sardar Sarovar Dam, Delhi Metro Phase IV, Mumbai Coastal Road, and Ultra Mega Solar Parks across Rajasthan and Gujarat.',
                })
              }
            >
              <div className="further-left-group">
                <FileText size={14} className="further-bullet-icon" />
                <span>Read case studies and examples</span>
              </div>
              <ChevronRight size={14} className="further-chevron" />
            </div>

            <div
              className="further-item-row cursor-pointer"
              onClick={() =>
                setActiveModal({
                  title: 'Apply Concepts to Real-World Projects',
                  badge: 'FIELD IMPLEMENTATION',
                  badgeColor: '#a855f7',
                  body: 'Discover how environmental engineers prepare real Terms of Reference (ToR), conduct seasonal baseline air/water sampling, model particulate plumes using AERMOD, and draft actionable Environmental Management Plans (EMPs).',
                })
              }
            >
              <div className="further-left-group">
                <Globe size={14} className="further-bullet-icon" />
                <span>Apply concepts to real-world projects</span>
              </div>
              <ChevronRight size={14} className="further-chevron" />
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          INTERACTIVE DETAIL MODAL / POPUP
          ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeModal && (
          <div
            className="summary-detail-overlay"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="summary-detail-modal"
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
                className="summary-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div
                className="summary-modal-badge"
                style={{
                  background: `${activeModal.badgeColor}22`,
                  border: `1px solid ${activeModal.badgeColor}66`,
                  color: activeModal.badgeColor,
                }}
              >
                <Sparkles size={12} />
                <span>{activeModal.badge}</span>
              </div>

              <h4 className="summary-modal-title">{activeModal.title}</h4>

              <div className="summary-modal-body">
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

              <div className="summary-modal-footer">
                <button
                  type="button"
                  className="summary-modal-primary-btn"
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

export default WarmingSummaryScreen;
