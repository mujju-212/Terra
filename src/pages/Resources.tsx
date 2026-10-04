import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  Share2,
  Check,
  Search,
  BookOpen,
  Layers,
  Droplet,
  Wind,
  Trees,
  Globe,
  RefreshCw,
  FolderDown,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Eye,
  X,
  FileCheck,
} from 'lucide-react';
import { MODULE_RESOURCES, COURSE_GENERAL_INFO, ModuleResource } from '../data/resourcesData';
import Footer from '../components/Footer';
import '../resources.css';

// Domain icon map
const MODULE_ICONS: Record<string, typeof Layers> = {
  land: Layers,
  water: Droplet,
  air: Wind,
  biodiversity: Trees,
  warming: Globe,
};

export default function Resources() {
  const reducedMotion = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();

  // Find initial module from URL param or default to Module 1
  const modParam = searchParams.get('mod') || searchParams.get('module');
  const initialMod = MODULE_RESOURCES.find(
    (m) => m.moduleSlug === modParam || m.id === modParam || String(m.moduleNumber) === modParam
  ) || MODULE_RESOURCES[0];

  const [activeModule, setActiveModule] = useState<ModuleResource>(initialMod);
  const [viewerMode, setViewerMode] = useState<'drive' | 'local'>('drive');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({
    [initialMod.id]: true,
  });

  const studioRef = useRef<HTMLDivElement>(null);

  // Sync active module if URL parameter changes
  useEffect(() => {
    if (modParam) {
      const match = MODULE_RESOURCES.find(
        (m) => m.moduleSlug === modParam || m.id === modParam || String(m.moduleNumber) === modParam
      );
      if (match && match.id !== activeModule.id) {
        setActiveModule(match);
        setIframeLoading(true);
      }
    }
  }, [modParam, activeModule.id]);

  // Handle module selection
  const handleSelectModule = (mod: ModuleResource, scrollIntoStudio = false) => {
    setActiveModule(mod);
    setIframeLoading(true);
    setSearchParams({ mod: mod.moduleSlug });
    if (scrollIntoStudio && studioRef.current) {
      studioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset loading state on mode switch
  const handleSwitchMode = (mode: 'drive' | 'local') => {
    if (mode !== viewerMode) {
      setIframeLoading(true);
      setViewerMode(mode);
    }
  };

  // Copy share link
  const handleCopyLink = () => {
    const url = `${window.location.origin}/resources?mod=${activeModule.moduleSlug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2400);
    });
  };

  // Keyboard escape listener for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreen]);


  // Filter modules based on search query
  const filteredModules = MODULE_RESOURCES.filter((mod) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      mod.title.toLowerCase().includes(q) ||
      mod.code.toLowerCase().includes(q) ||
      mod.description.toLowerCase().includes(q) ||
      mod.domain.toLowerCase().includes(q) ||
      mod.keyTopics.some((topic) => topic.toLowerCase().includes(q)) ||
      mod.chapters.some((ch) => ch.title.toLowerCase().includes(q) || ch.summary.toLowerCase().includes(q))
    );
  });

  const toggleAccordion = (id: string) => {
    setExpandedAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const ActiveIcon = MODULE_ICONS[activeModule.moduleSlug] || FileText;

  // Construct iframe source
  const currentIframeSrc =
    viewerMode === 'drive'
      ? activeModule.drivePreviewUrl
      : `${activeModule.localPdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`;

  return (
    <main
      className="resources-page"
      id="main-content"
      style={
        {
          '--res-accent': activeModule.accent,
          '--res-glow': activeModule.glow,
          '--res-bg-tint': activeModule.bgGlow,
        } as React.CSSProperties
      }
    >
      {/* Background Ambience */}
      <div className="res-ambient-glow" aria-hidden="true" />
      <div className="res-grid-mesh" aria-hidden="true" />

      {/* ─── HERO HEADER ─── */}
      <section className="res-hero">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="res-hero-badge-wrap">
            <span className="res-eyebrow">
              <GraduationCap size={13} />
              <span>[ ACADEMIC ARCHIVES & NOTES ] · BCV755B</span>
            </span>
            <span className="res-course-pill">Civil Engineering · VTU / Autonomous Curriculum</span>
          </div>

          <h1 className="res-title">
            Module-Wise Field Notes &<br />
            <em>Official Study Curricula.</em>
          </h1>

          <p className="res-lead">
            Comprehensive, syllabus-aligned lecture notes, figures, and exhaustive study PDFs for all{' '}
            <strong>five natural resource domains</strong>. Read directly within our high-performance
            embedded document studio or download offline copies for thorough revision.
          </p>

          {/* Quick Metrics Bar */}
          <div className="res-metrics-bar">
            <div className="res-metric-card">
              <div className="res-metric-icon">
                <BookOpen size={18} />
              </div>
              <div>
                <div className="res-metric-num">{COURSE_GENERAL_INFO.totalModules} Modules</div>
                <div className="res-metric-label">Complete Syllabus</div>
              </div>
            </div>

            <div className="res-metric-card">
              <div className="res-metric-icon">
                <FileCheck size={18} />
              </div>
              <div>
                <div className="res-metric-num">{COURSE_GENERAL_INFO.totalChapters} Chapters</div>
                <div className="res-metric-label">In-Depth Topics</div>
              </div>
            </div>

            <div className="res-metric-card">
              <div className="res-metric-icon">
                <Download size={18} />
              </div>
              <div>
                <div className="res-metric-num">{COURSE_GENERAL_INFO.totalPdfSize}</div>
                <div className="res-metric-label">Original High-Res PDFs</div>
              </div>
            </div>

            <div className="res-metric-card">
              <div className="res-metric-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="res-metric-num">100% Free</div>
                <div className="res-metric-label">Open Student Access</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── STICKY MODULE FILTER / SEARCH STRIP ─── */}
      <section className="res-filter-strip-wrap">
        <div className="res-filter-strip">
          <div className="res-module-tabs" role="tablist" aria-label="Select Module Notes">
            {MODULE_RESOURCES.map((mod) => {
              const Icon = MODULE_ICONS[mod.moduleSlug] || FileText;
              const isActive = activeModule.id === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`res-tab-btn ${isActive ? 'is-active' : ''}`}
                  style={
                    {
                      '--tab-accent': mod.accent,
                      '--tab-glow': mod.glow,
                    } as React.CSSProperties
                  }
                  onClick={() => handleSelectModule(mod, true)}
                >
                  <span className="res-tab-num">MOD 0{mod.moduleNumber}</span>
                  <span className="res-tab-icon">
                    <Icon size={14} />
                  </span>
                  <span>{mod.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="res-search-input-wrap">
            <Search size={14} className="res-search-icon" aria-hidden="true" />
            <input
              type="text"
              className="res-search-input"
              placeholder="Search syllabus, topics, chapters…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter course resources"
            />
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE EMBEDDED DOCUMENT READER STUDIO ─── */}
      <section className="res-studio-section" ref={studioRef} id="document-studio">
        <div className="res-studio-container">
          {/* Studio Top Control Bar */}
          <div className="res-studio-header">
            <div className="res-studio-meta">
              <div className="res-studio-indicator">
                <span className="res-studio-dot" />
                <span>MODULE 0{activeModule.moduleNumber}</span>
              </div>
              <div className="res-studio-title">
                <ActiveIcon size={16} style={{ color: activeModule.accent }} />
                <span>{activeModule.title}</span>
                <span className="res-studio-size-pill">{activeModule.fileSize}</span>
              </div>
            </div>

            <div className="res-studio-controls">
              {/* Cloud vs Local Engine Switcher */}
              <div className="res-mode-switcher" title="Toggle Document Engine">
                <button
                  type="button"
                  className={`res-mode-btn ${viewerMode === 'drive' ? 'is-active' : ''}`}
                  onClick={() => handleSwitchMode('drive')}
                  aria-label="Use Google Drive cloud viewer"
                >
                  <Globe size={12} />
                  <span>Google Drive View</span>
                </button>
                <button
                  type="button"
                  className={`res-mode-btn ${viewerMode === 'local' ? 'is-active' : ''}`}
                  onClick={() => handleSwitchMode('local')}
                  aria-label="Use fast local PDF engine"
                >
                  <FileText size={12} />
                  <span>Local PDF View</span>
                </button>
              </div>

              {/* Direct Download Button */}
              <a
                href={activeModule.localPdfUrl}
                download={`${activeModule.id}-notes.pdf`}
                className="res-ctrl-btn res-ctrl-btn-primary"
                title={`Download ${activeModule.shortTitle} Notes PDF (${activeModule.fileSize})`}
              >
                <Download size={13} />
                <span>Download PDF</span>
              </a>

              {/* External Google Drive Link */}
              <a
                href={activeModule.driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="res-ctrl-btn"
                title="Open in Google Drive in new tab"
              >
                <ExternalLink size={13} />
                <span>Open in Drive</span>
              </a>

              {/* Copy Share Link */}
              <button
                type="button"
                className="res-ctrl-btn"
                onClick={handleCopyLink}
                title="Copy direct link to this module's notes"
                aria-label="Copy link"
              >
                {copiedToast ? <Check size={13} style={{ color: '#4ade80' }} /> : <Share2 size={13} />}
                <span>{copiedToast ? 'Copied Link!' : 'Share'}</span>
              </button>

              {/* Fullscreen Expand */}
              <button
                type="button"
                className="res-ctrl-btn"
                onClick={() => setFullscreen(true)}
                title="Expand reader to fullscreen view"
                aria-label="Enter fullscreen"
              >
                <Maximize2 size={13} />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Studio Viewport with Iframe */}
          <div className="res-studio-viewport">
            {iframeLoading && (
              <div className="res-frame-loading" aria-live="polite">
                <div className="res-orbital-spinner" />
                <span className="res-loading-text">
                  Loading Module 0{activeModule.moduleNumber} Notes ({viewerMode === 'drive' ? 'Google Drive Cloud Reader' : 'Local PDF Engine'})…
                </span>
              </div>
            )}

            <iframe
              key={`${activeModule.id}-${viewerMode}`}
              src={currentIframeSrc}
              className="res-studio-frame"
              title={`${activeModule.title} Notes Viewer`}
              allow="autoplay"
              loading="lazy"
              onLoad={() => setIframeLoading(false)}
            />
          </div>

          {/* Studio Sub-Footer Bar */}
          <div className="res-studio-subfooter">
            <div className="res-subfooter-info">
              <span>{activeModule.code}</span> · <span>{activeModule.pageCountApprox}</span> ·{' '}
              <span>Official Department Study Notes</span>
            </div>

            <div className="res-subfooter-links">
              <Link to={`/module/${activeModule.moduleSlug}`} className="res-subfooter-link">
                <span>Explore Interactive Web Experience</span>
                <ArrowRight size={12} />
              </Link>
              <a
                href={activeModule.driveDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="res-subfooter-link"
              >
                <span>Direct Drive Download Link</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FULLSCREEN MODAL VIEWER ─── */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="res-fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="res-fullscreen-bar">
              <div className="res-studio-meta">
                <div className="res-studio-indicator">
                  <span className="res-studio-dot" />
                  <span>MODULE 0{activeModule.moduleNumber} FULLSCREEN</span>
                </div>
                <div className="res-studio-title">
                  <span>{activeModule.title}</span>
                </div>
              </div>

              <div className="res-studio-controls">
                <a
                  href={activeModule.localPdfUrl}
                  download={`${activeModule.id}-notes.pdf`}
                  className="res-ctrl-btn res-ctrl-btn-primary"
                >
                  <Download size={13} />
                  <span>Download PDF ({activeModule.fileSize})</span>
                </a>

                <a
                  href={activeModule.driveViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="res-ctrl-btn"
                >
                  <ExternalLink size={13} />
                  <span>Open Drive</span>
                </a>

                <button
                  type="button"
                  className="res-ctrl-btn"
                  onClick={() => setFullscreen(false)}
                  aria-label="Exit fullscreen"
                  title="Close fullscreen (Esc)"
                >
                  <X size={15} />
                  <span>Exit Fullscreen</span>
                </button>
              </div>
            </div>

            <div className="res-fullscreen-viewport">
              <iframe
                src={currentIframeSrc}
                className="res-fullscreen-frame"
                title={`${activeModule.title} Fullscreen Viewer`}
                allow="autoplay"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MODULE DIRECTORY CARDS SHOWCASE (5 MODULES) ─── */}
      <section className="res-cards-section">
        <div className="res-section-header">
          <span className="res-section-tag">[ COURSE DIRECTORY ]</span>
          <h2 className="res-section-title">All 5 Module Field Notes</h2>
          <p className="res-section-subtitle">
            Browse through each module’s syllabus scope, examine key concepts, and choose whether to
            read online in the viewer studio or download for offline exam preparation.
          </p>
        </div>

        <div className="res-cards-grid">
          {filteredModules.map((mod) => {
            const Icon = MODULE_ICONS[mod.moduleSlug] || FileText;
            const isCurrentlyActive = activeModule.id === mod.id;

            return (
              <motion.article
                key={mod.id}
                className={`res-module-card ${isCurrentlyActive ? 'is-active-card' : ''}`}
                style={
                  {
                    '--card-accent': mod.accent,
                    '--card-glow': mod.glow,
                    '--card-bg': mod.bgGlow,
                  } as React.CSSProperties
                }
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Media Header */}
                <div
                  className="res-card-media"
                  style={{ backgroundImage: `url('${mod.cardImage}')` }}
                >
                  <div className="res-card-overlay" />
                  <div className="res-card-badges">
                    <span className="res-card-mod-num">MODULE 0{mod.moduleNumber}</span>
                    <span className="res-card-size-badge">{mod.fileSize}</span>
                  </div>
                  <div className="res-card-icon-floating">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Body */}
                <div className="res-card-body">
                  <span className="res-card-domain">{mod.domain}</span>
                  <h3 className="res-card-title">{mod.title}</h3>
                  <p className="res-card-desc">{mod.description}</p>

                  {/* Key Topics */}
                  <div className="res-card-topics">
                    {mod.keyTopics.slice(0, 5).map((topic, idx) => (
                      <span key={idx} className="res-topic-pill">
                        {topic}
                      </span>
                    ))}
                    {mod.keyTopics.length > 5 && (
                      <span className="res-topic-pill">+{mod.keyTopics.length - 5} more</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="res-card-actions">
                    <button
                      type="button"
                      className="res-card-btn-read"
                      onClick={() => handleSelectModule(mod, true)}
                    >
                      <Eye size={13} />
                      <span>{isCurrentlyActive ? 'Reading Now' : 'Read Notes'}</span>
                    </button>

                    <a
                      href={mod.localPdfUrl}
                      download={`${mod.id}-notes.pdf`}
                      className="res-card-btn-download"
                      title={`Download ${mod.shortTitle} PDF`}
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </a>
                  </div>

                  {/* Sublinks */}
                  <div className="res-card-sublinks">
                    <a
                      href={mod.driveViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="res-card-sublink"
                    >
                      <span>Google Drive Link</span>
                      <ExternalLink size={10} />
                    </a>

                    <Link to={`/module/${mod.moduleSlug}`} className="res-card-sublink">
                      <span>Explore Exhibit</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ─── CHAPTER BREAKDOWN ACCORDION ─── */}
      <section className="res-chapters-section">
        <div className="res-section-header">
          <span className="res-section-tag">[ DETAILED SYLLABUS BREAKDOWN ]</span>
          <h2 className="res-section-title">Chapter Outlines & Lecture Topics</h2>
          <p className="res-section-subtitle">
            Scan chapter summaries and key theoretical subtopics covered inside each PDF document
            before opening or printing.
          </p>
        </div>

        <div className="res-accordion-container">
          {MODULE_RESOURCES.map((mod) => {
            const isExpanded = !!expandedAccordions[mod.id];
            const Icon = MODULE_ICONS[mod.moduleSlug] || FileText;

            return (
              <div
                key={mod.id}
                className="res-accordion-card"
                style={{ '--mod-accent': mod.accent } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="res-accordion-head"
                  onClick={() => toggleAccordion(mod.id)}
                  aria-expanded={isExpanded}
                >
                  <div className="res-accordion-left">
                    <span className="res-accordion-num">0{mod.moduleNumber}</span>
                    <Icon size={18} style={{ color: mod.accent }} />
                    <div>
                      <h4 className="res-accordion-title">{mod.title}</h4>
                      <span className="res-accordion-code">
                        {mod.code} · {mod.chapters.length} Chapters · {mod.fileSize}
                      </span>
                    </div>
                  </div>

                  <div className="res-accordion-right">
                    <span>{isExpanded ? 'Collapse' : 'Expand Chapters'}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="res-accordion-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="res-chapter-list">
                        {mod.chapters.map((ch, idx) => (
                          <div key={idx} className="res-chapter-tile">
                            <div className="res-tile-header">
                              <span className="res-tile-num">CH {ch.number}</span>
                              <span className="res-tile-title">{ch.title}</span>
                            </div>
                            <p className="res-tile-summary">{ch.summary}</p>
                            <div className="res-tile-subtopics">
                              {ch.subtopics.map((sub, sIdx) => (
                                <span key={sIdx} className="res-subtopic-tag">
                                  {sub}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SYLLABUS & EXAM GUIDE REFERENCE ─── */}
      <section className="res-syllabus-section">
        <div className="res-syllabus-card">
          <div className="res-syllabus-grid">
            <div className="res-syllabus-info-box">
              <span className="res-section-tag">[ COURSE MATRIX ]</span>
              <h3 style={{ margin: '0 0 16px', fontSize: '22px' }}>Academic Framework</h3>
              <div className="res-info-row">
                <span className="res-info-label">Course Code</span>
                <span className="res-info-val">{COURSE_GENERAL_INFO.courseCode}</span>
              </div>
              <div className="res-info-row">
                <span className="res-info-label">Scheme</span>
                <span className="res-info-val">{COURSE_GENERAL_INFO.scheme}</span>
              </div>
              <div className="res-info-row">
                <span className="res-info-label">Credits</span>
                <span className="res-info-val">{COURSE_GENERAL_INFO.credits}</span>
              </div>
              <div className="res-info-row">
                <span className="res-info-label">Continuous Internal Eval (CIE)</span>
                <span className="res-info-val">{COURSE_GENERAL_INFO.cieMarks}</span>
              </div>
              <div className="res-info-row">
                <span className="res-info-label">Semester End Exam (SEE)</span>
                <span className="res-info-val">{COURSE_GENERAL_INFO.seeMarks}</span>
              </div>
              <div className="res-info-row">
                <span className="res-info-label">Total Marks</span>
                <span className="res-info-val">{COURSE_GENERAL_INFO.totalMarks}</span>
              </div>
            </div>

            <div className="res-syllabus-textbooks">
              <span className="res-section-tag">[ REFERENCE LITERATURE ]</span>
              <h3 style={{ margin: '0 0 16px', fontSize: '22px' }}>Standard Reference Textbooks</h3>
              <div className="res-textbook-list">
                <div className="res-textbook-item">
                  <BookOpen size={16} style={{ color: 'var(--res-accent)', marginTop: '2px' }} />
                  <div>
                    <div className="res-textbook-title">
                      Environmental Science: Working with the Earth (10th / 11th Edition)
                    </div>
                    <div className="res-textbook-author">
                      G. Tyler Miller Jr. · Thomson Brooks/Cole Publishing
                    </div>
                  </div>
                </div>

                <div className="res-textbook-item">
                  <BookOpen size={16} style={{ color: 'var(--res-accent)', marginTop: '2px' }} />
                  <div>
                    <div className="res-textbook-title">
                      Environmental Science: A Global Concern
                    </div>
                    <div className="res-textbook-author">
                      William P. Cunningham & Mary Ann Cunningham · McGraw-Hill Higher Education
                    </div>
                  </div>
                </div>

                <div className="res-textbook-item">
                  <BookOpen size={16} style={{ color: 'var(--res-accent)', marginTop: '2px' }} />
                  <div>
                    <div className="res-textbook-title">
                      Introduction to Environmental Engineering & Science
                    </div>
                    <div className="res-textbook-author">
                      Gilbert M. Masters & Wendell P. Ela · Pearson Prentice Hall
                    </div>
                  </div>
                </div>

                <div className="res-textbook-item">
                  <BookOpen size={16} style={{ color: 'var(--res-accent)', marginTop: '2px' }} />
                  <div>
                    <div className="res-textbook-title">
                      Environmental Impact Assessment Notification 2006 & EIA Guidelines
                    </div>
                    <div className="res-textbook-author">
                      Ministry of Environment, Forest and Climate Change (MoEFCC), Govt. of India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD ALL BUNDLE CALL TO ACTION ─── */}
      <section className="res-bundle-cta">
        <div className="res-bundle-box">
          <div className="res-bundle-text">
            <span className="res-bundle-eyebrow">[ OFFLINE REVISION PACKAGE ]</span>
            <h3 className="res-bundle-title">Ready for Your Semester End Exam?</h3>
            <p className="res-bundle-desc">
              All 5 module PDFs are bundled and formatted for crisp printing or offline tablet
              reading. Download individual chapters above or explore the interactive 3D exhibits.
            </p>
          </div>

          <div className="res-bundle-actions">
            <Link to="/quiz" className="res-ctrl-btn res-ctrl-btn-primary">
              <Sparkles size={14} />
              <span>Test Knowledge on Quiz</span>
            </Link>
            <Link to="/module/land" className="res-ctrl-btn">
              <span>Begin Module Journey</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
