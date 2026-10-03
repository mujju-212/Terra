import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Layers,
  Droplet,
  Wind,
  Trees,
  Globe,
  ArrowRight,
  FileText,
  Sparkles,
  BookOpen,
  Search,
  GraduationCap,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';
import { MODULE_RESOURCES, COURSE_GENERAL_INFO, ModuleResource } from '../data/resourcesData';
import Footer from '../components/Footer';
import '../modules.css';

const MODULE_ICONS: Record<string, typeof Layers> = {
  land: Layers,
  water: Droplet,
  air: Wind,
  biodiversity: Trees,
  warming: Globe,
};

export default function ModulesIndex() {
  const reducedMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredModules = MODULE_RESOURCES.filter((mod) => {
    const matchesFilter = selectedFilter === 'all' || mod.moduleSlug === selectedFilter;
    if (!matchesFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      mod.title.toLowerCase().includes(q) ||
      mod.domain.toLowerCase().includes(q) ||
      mod.description.toLowerCase().includes(q) ||
      mod.tagline.toLowerCase().includes(q) ||
      mod.keyTopics.some((t) => t.toLowerCase().includes(q)) ||
      mod.chapters.some((c) => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q))
    );
  });

  return (
    <main className="modules-page" id="main-content">
      {/* Dynamic ambient backgrounds */}
      <div className="modules-ambient-glow" aria-hidden="true" />
      <div className="modules-grid-mesh" aria-hidden="true" />

      {/* ─── HERO SECTION ─── */}
      <section className="modules-hero">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="modules-hero-badge-wrap">
            <span className="modules-eyebrow">
              <Compass size={13} />
              <span>[ COURSE CURRICULUM ] · BCV755B</span>
            </span>
            <span className="modules-course-pill">Civil Engineering · VTU / Autonomous Curriculum</span>
          </div>

          <h1 className="modules-title">
            The Five Resource Worlds of<br />
            <em>Natural Conservation.</em>
          </h1>

          <p className="modules-lead">
            Explore Earth’s interconnected biophysical systems through five syllabus-aligned digital
            modules. Each world pairs <strong>3D cutaways, interactive simulations, and official field lecture notes</strong>{' '}
            to transform abstract environmental engineering concepts into tangible understanding.
          </p>

          {/* Quick Metrics Row */}
          <div className="modules-metrics-row">
            <div className="modules-metric-card">
              <div className="modules-metric-icon">
                <Compass size={18} />
              </div>
              <div>
                <div className="modules-metric-num">{COURSE_GENERAL_INFO.totalModules} Worlds</div>
                <div className="modules-metric-label">Interactive Modules</div>
              </div>
            </div>

            <div className="modules-metric-card">
              <div className="modules-metric-icon">
                <BookOpen size={18} />
              </div>
              <div>
                <div className="modules-metric-num">{COURSE_GENERAL_INFO.totalChapters} Chapters</div>
                <div className="modules-metric-label">Complete Syllabus</div>
              </div>
            </div>

            <div className="modules-metric-card">
              <div className="modules-metric-icon">
                <Clock size={18} />
              </div>
              <div>
                <div className="modules-metric-num">50 Hours</div>
                <div className="modules-metric-label">Total Teaching Scope</div>
              </div>
            </div>

            <div className="modules-metric-card">
              <div className="modules-metric-icon">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="modules-metric-num">{COURSE_GENERAL_INFO.credits}</div>
                <div className="modules-metric-label">Academic Credits</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── EARTH SYSTEMS SEQUENTIAL PIPELINE ─── */}
      <section className="modules-pipeline-section">
        <div className="modules-pipeline-card">
          <div className="modules-pipeline-header">
            <span className="modules-pipeline-tag">[ LEARNING PATHWAY ]</span>
            <span className="modules-pipeline-title">
              Holistic Earth System Progression: Solid Ground → Water → Air → Life → Governance
            </span>
          </div>

          <div className="modules-pipeline-track">
            {MODULE_RESOURCES.map((mod) => {
              const Icon = MODULE_ICONS[mod.moduleSlug] || Layers;
              return (
                <a
                  key={mod.id}
                  href={`#${mod.id}`}
                  className="modules-pipeline-node"
                  style={
                    {
                      '--node-accent': mod.accent,
                      '--node-glow': mod.glow,
                    } as React.CSSProperties
                  }
                >
                  <div className="modules-node-top">
                    <span className="modules-node-num">0{mod.moduleNumber}</span>
                    <Icon size={15} style={{ color: mod.accent }} />
                  </div>
                  <strong className="modules-node-title">{mod.shortTitle}</strong>
                  <span className="modules-node-domain">{mod.domain.split('&')[0]}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FILTER & SEARCH BAR ─── */}
      <section className="modules-filter-strip-wrap">
        <div className="modules-filter-strip">
          <div className="modules-filter-pills" role="tablist" aria-label="Filter Modules">
            <button
              type="button"
              className={`modules-filter-btn ${selectedFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              <span>All 5 Modules</span>
            </button>
            {MODULE_RESOURCES.map((mod) => {
              const Icon = MODULE_ICONS[mod.moduleSlug] || Layers;
              const isSelected = selectedFilter === mod.moduleSlug;
              return (
                <button
                  key={mod.id}
                  type="button"
                  className={`modules-filter-btn ${isSelected ? 'is-active' : ''}`}
                  style={
                    {
                      '--pill-accent': mod.accent,
                      '--pill-glow': mod.glow,
                    } as React.CSSProperties
                  }
                  onClick={() => setSelectedFilter(mod.moduleSlug)}
                >
                  <Icon size={13} />
                  <span>{mod.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="modules-search-box">
            <Search size={14} className="modules-search-icon" aria-hidden="true" />
            <input
              type="text"
              className="modules-search-input"
              placeholder="Search topics, degradation, aquifers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter modules"
            />
          </div>
        </div>
      </section>

      {/* ─── 5 DETAILED MODULE SHOWCASE CARDS ─── */}
      <section className="modules-showcase-section">
        <div className="modules-card-list">
          {filteredModules.map((mod, idx) => {
            const Icon = MODULE_ICONS[mod.moduleSlug] || Layers;

            return (
              <motion.article
                key={mod.id}
                id={mod.id}
                className="module-showcase-card"
                style={
                  {
                    '--mod-accent': mod.accent,
                    '--mod-glow': mod.glow,
                  } as React.CSSProperties
                }
                initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Media Column Left */}
                <div
                  className="module-media-col"
                  style={{ backgroundImage: `url('${mod.cardImage}')` }}
                >
                  <div className="module-media-overlay" />
                  <div className="module-media-badges">
                    <span className="module-num-badge">MODULE 0{mod.moduleNumber}</span>
                    <span className="module-hours-badge">{mod.syllabusDetails.teachingHours}</span>
                  </div>
                  <div className="module-icon-floating">
                    <Icon size={22} />
                  </div>
                </div>

                {/* Content Column Right */}
                <div className="module-content-col">
                  <div className="module-domain-row">
                    <span className="module-domain-tag">{mod.domain}</span>
                    <span className="module-code-tag">{mod.code} · VTU SEE {mod.syllabusDetails.examWeightage}</span>
                  </div>

                  <h2 className="module-card-title">{mod.title}</h2>
                  <p className="module-card-tagline">“{mod.tagline}”</p>
                  <p className="module-card-desc">{mod.description}</p>

                  {/* Stat Metrics Trio */}
                  <div className="module-stats-row">
                    {mod.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="module-stat-unit">
                        <span className="module-stat-val">{stat.value}</span>
                        <span className="module-stat-lbl">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chapters Outline Preview */}
                  <div className="module-chapters-preview">
                    <span className="module-chapters-label">
                      CORE SYLLABUS CHAPTERS ({mod.chapters.length} CHAPTERS):
                    </span>
                    <div className="module-chips-wrap">
                      {mod.chapters.map((ch, cIdx) => (
                        <span key={cIdx} className="module-chip" title={ch.summary}>
                          {ch.number}. {ch.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="module-actions-bar">
                    <Link
                      to={`/module/${mod.moduleSlug}`}
                      className="module-primary-btn"
                    >
                      <span>Enter Module Experience</span>
                      <ArrowRight size={14} />
                    </Link>

                    <Link
                      to={`/resources?mod=${mod.moduleSlug}`}
                      className="module-secondary-btn"
                      title={`Read or download ${mod.shortTitle} notes PDF (${mod.fileSize})`}
                    >
                      <FileText size={13} />
                      <span>Study Notes (PDF)</span>
                    </Link>

                    <Link to="/quiz" className="module-quiz-link">
                      <Sparkles size={12} />
                      <span>Test on Quiz</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ─── CURRICULUM SYLLABUS & MARKS MATRIX ─── */}
      <section className="modules-pipeline-section" style={{ marginBottom: '80px' }}>
        <div className="modules-pipeline-card">
          <div className="modules-pipeline-header">
            <span className="modules-pipeline-tag">[ ACADEMIC FRAMEWORK ]</span>
            <span className="modules-pipeline-title">VTU / Autonomous Course Scheme & Evaluation Matrix</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '16px',
            }}
          >
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#deb87a', textTransform: 'uppercase', marginBottom: '4px' }}>
                Course Code & Title
              </div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>
                {COURSE_GENERAL_INFO.courseCode} — {COURSE_GENERAL_INFO.courseTitle}
              </strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#deb87a', textTransform: 'uppercase', marginBottom: '4px' }}>
                Credit Structure
              </div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>
                {COURSE_GENERAL_INFO.credits} · 50 Lecture Hours
              </strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#deb87a', textTransform: 'uppercase', marginBottom: '4px' }}>
                Continuous Internal Evaluation (CIE)
              </div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>
                {COURSE_GENERAL_INFO.cieMarks} (Tests, Assignments, Seminars)
              </strong>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#deb87a', textTransform: 'uppercase', marginBottom: '4px' }}>
                Semester End Exam (SEE)
              </div>
              <strong style={{ color: '#fff', fontSize: '14px' }}>
                {COURSE_GENERAL_INFO.seeMarks} (5 Questions with Internal Choice)
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="modules-pipeline-section" style={{ marginBottom: '96px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(20, 26, 36, 0.9) 0%, rgba(8, 11, 16, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: 'clamp(28px, 4vw, 44px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span style={{ fontSize: '11px', color: '#deb87a', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              [ OFFLINE REVISION & NOTES ]
            </span>
            <h3 style={{ fontFamily: "var(--serif, 'Playfair Display', serif)", fontSize: '28px', margin: '8px 0 10px', color: '#fff' }}>
              Access All 5 Module Lecture PDFs
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)', margin: 0, lineHeight: 1.6 }}>
              All 5 module lecture notes are available in the Document Studio. Read online with Google
              Drive tools or download the complete 70.2 MB bundle for offline exam prep.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/resources" className="module-primary-btn">
              <FileText size={14} />
              <span>Open Document Studio</span>
            </Link>
            <Link to="/quiz" className="module-secondary-btn">
              <Sparkles size={14} />
              <span>Course Quiz</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
