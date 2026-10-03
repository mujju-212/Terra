import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  RotateCcw,
  Trophy,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Droplet,
  Mountain,
  Wind,
  Sprout,
  Flame,
  Award,
  BarChart3,
} from 'lucide-react';
import { quizQuestions, type QuizQuestion } from '../content/quiz';
import Footer from '../components/Footer';
import '../quiz.css';

interface QuestionState {
  selectedChoice: number | null;
  isSubmitted: boolean;
  isCorrect: boolean;
}

interface ModuleInfo {
  slug: string;
  num: string;
  name: string;
  shortEyebrow: string;
  fullTitle: string;
  subtitle: string;
  accent: string;
  accentGlow: string;
  accentBg: string;
  icon: typeof Mountain;
  backPath: string;
  nextModule?: { slug: string; name: string; path: string };
}

const MODULE_CONFIGS: Record<string, ModuleInfo> = {
  land: {
    slug: 'land',
    num: '01',
    name: 'Land',
    shortEyebrow: 'MODULE 01 · LAND & SOIL CONSERVATION',
    fullTitle: 'Land & Lithosphere Knowledge Check',
    subtitle: 'Fifteen comprehensive syllabus questions covering planetary accretion, internal layers, pedogenesis, soil horizons, erosion mechanisms, and sustainable land-use planning.',
    accent: '#deb87a',
    accentGlow: 'rgba(222, 184, 122, 0.45)',
    accentBg: 'rgba(222, 184, 122, 0.12)',
    icon: Mountain,
    backPath: '/module/land',
    nextModule: { slug: 'water', name: 'Module 02: Water', path: '/module/water' },
  },
  water: {
    slug: 'water',
    num: '02',
    name: 'Water',
    shortEyebrow: 'MODULE 02 · WATER RESOURCES & HYDROGEOLOGY',
    fullTitle: 'Water Resources & Hydrogeology Knowledge Check',
    subtitle: 'Fifteen questions spanning global water distribution, Indian river interlinking (Himalayan & Peninsular), hard-rock vs alluvial aquifers, conjunctive use, and coastal seawater intrusion control.',
    accent: '#38bdf8',
    accentGlow: 'rgba(56, 189, 248, 0.45)',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    icon: Droplet,
    backPath: '/module/water',
    nextModule: { slug: 'air', name: 'Module 03: Air', path: '/module/air' },
  },
  air: {
    slug: 'air',
    num: '03',
    name: 'Air',
    shortEyebrow: 'MODULE 03 · ATMOSPHERE & AIR QUALITY',
    fullTitle: 'Atmosphere & Air Pollution Knowledge Check',
    subtitle: 'Fifteen questions detailing dry air composition, primary vs secondary pollutants, NAAQS & AQI bands, industrial ESP & cyclone controls, and stratospheric ozone depletion.',
    accent: '#a78bfa',
    accentGlow: 'rgba(167, 139, 250, 0.45)',
    accentBg: 'rgba(167, 139, 250, 0.12)',
    icon: Wind,
    backPath: '/module/air',
    nextModule: { slug: 'biodiversity', name: 'Module 04: Biodiversity', path: '/module/biodiversity' },
  },
  biodiversity: {
    slug: 'biodiversity',
    num: '04',
    name: 'Biodiversity',
    shortEyebrow: 'MODULE 04 · BIODIVERSITY & ECOSYSTEMS',
    fullTitle: 'Biodiversity & Ecological Systems Knowledge Check',
    subtitle: 'Fifteen questions covering genetic/species/ecosystem diversity, in-situ vs ex-situ conservation, National Parks vs Sanctuaries, aquatic zonation, and trophic biomagnification.',
    accent: '#34d399',
    accentGlow: 'rgba(52, 211, 153, 0.45)',
    accentBg: 'rgba(52, 211, 153, 0.12)',
    icon: Sprout,
    backPath: '/module/biodiversity',
    nextModule: { slug: 'warming', name: 'Module 05: Warming & EIA', path: '/module/warming' },
  },
  warming: {
    slug: 'warming',
    num: '05',
    name: 'Warming',
    shortEyebrow: 'MODULE 05 · GLOBAL WARMING & EIA',
    fullTitle: 'Global Warming & EIA Assessment Knowledge Check',
    subtitle: 'Fifteen questions detailing planetary albedo, greenhouse mechanisms, climate change indicators, and the complete 9-phase Environmental Impact Assessment sequence.',
    accent: '#fb923c',
    accentGlow: 'rgba(251, 146, 60, 0.45)',
    accentBg: 'rgba(251, 146, 60, 0.12)',
    icon: Flame,
    backPath: '/module/warming',
    nextModule: { slug: 'all', name: 'All Modules Comprehensive', path: '/quiz?module=all' },
  },
  all: {
    slug: 'all',
    num: 'ALL',
    name: 'All Modules',
    shortEyebrow: 'BCV755B · FULL CURRICULUM EXAMINATION',
    fullTitle: 'Comprehensive Planetary Resource Examination',
    subtitle: 'Seventy-five questions covering all five natural resource conservation domains: Land, Water, Air, Biodiversity, and Global Warming & EIA.',
    accent: '#38bdf8',
    accentGlow: 'rgba(56, 189, 248, 0.45)',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    icon: Sparkles,
    backPath: '/#modules',
    nextModule: undefined,
  },
};

const MODULE_LIST = [
  MODULE_CONFIGS.land,
  MODULE_CONFIGS.water,
  MODULE_CONFIGS.air,
  MODULE_CONFIGS.biodiversity,
  MODULE_CONFIGS.warming,
  MODULE_CONFIGS.all,
];

export default function Quiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawModule = searchParams.get('module') ?? 'land';
  const activeModuleSlug = MODULE_CONFIGS[rawModule] ? rawModule : 'land';
  const activeConfig = MODULE_CONFIGS[activeModuleSlug];

  // Dynamic question counts
  const getQuestionCount = useCallback((slug: string) => {
    if (slug === 'all') return quizQuestions.length;
    return quizQuestions.filter((q) => q.module === slug).length;
  }, []);

  // Filter questions according to selected module
  const currentQuestions: QuizQuestion[] = useMemo(() => {
    if (activeModuleSlug === 'all') return quizQuestions;
    const filtered = quizQuestions.filter((q) => q.module === activeModuleSlug);
    return filtered.length > 0 ? filtered : quizQuestions;
  }, [activeModuleSlug]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, QuestionState>>({});
  const [showResults, setShowResults] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [showReviewAccordion, setShowReviewAccordion] = useState(false);

  // Reset when switching modules
  useEffect(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setShowReviewAccordion(false);
  }, [activeModuleSlug]);

  const currentQ = currentQuestions[currentIndex];
  const currentState = userAnswers[currentIndex] || {
    selectedChoice: null,
    isSubmitted: false,
    isCorrect: false,
  };

  // Switch Module Scope
  const handleSelectModule = (slug: string) => {
    setSearchParams(slug === 'all' ? { module: 'all' } : { module: slug });
  };

  // Select Option
  const handleSelectOption = (choiceIndex: number) => {
    if (currentState.isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selectedChoice: choiceIndex,
        isSubmitted: false,
        isCorrect: false,
      },
    }));
  };

  // Submit / Check Answer
  const handleCheckAnswer = useCallback(() => {
    if (currentState.selectedChoice === null || currentState.isSubmitted || !currentQ) return;
    const isCorrect = currentState.selectedChoice === currentQ.answer;
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selectedChoice: currentState.selectedChoice,
        isSubmitted: true,
        isCorrect,
      },
    }));
  }, [currentState, currentQ, currentIndex]);

  // Navigation
  const handleNext = useCallback(() => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentIndex, currentQuestions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleJumpToQuestion = (idx: number) => {
    if (idx >= 0 && idx < currentQuestions.length) {
      setCurrentIndex(idx);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
    setShowReviewAccordion(false);
  };

  // Keyboard navigation & quick shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (!showResults && currentQ) {
        // Choice keys: 1-4 or A-D
        if (!currentState.isSubmitted) {
          if (e.key === '1' || e.key.toLowerCase() === 'a') handleSelectOption(0);
          if (e.key === '2' || e.key.toLowerCase() === 'b') handleSelectOption(1);
          if (e.key === '3' || e.key.toLowerCase() === 'c') handleSelectOption(2);
          if (e.key === '4' || e.key.toLowerCase() === 'd') handleSelectOption(3);
        }

        // Enter key: check answer if unsubmitted, or next question if submitted
        if (e.key === 'Enter') {
          if (!currentState.isSubmitted && currentState.selectedChoice !== null) {
            handleCheckAnswer();
          } else if (currentState.isSubmitted) {
            handleNext();
          }
        }

        // Arrow navigation
        if (e.key === 'ArrowRight' && currentState.isSubmitted) {
          handleNext();
        }
        if (e.key === 'ArrowLeft') {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showResults, currentQ, currentState, handleCheckAnswer, handleNext, handlePrev]);

  // Calculations for Score & Mastery
  const submittedCount = Object.values(userAnswers).filter((s) => s.isSubmitted).length;
  const correctCount = Object.values(userAnswers).filter((s) => s.isSubmitted && s.isCorrect).length;
  const scorePercent = currentQuestions.length > 0 ? Math.round((correctCount / currentQuestions.length) * 100) : 0;

  // Compute Topic Performance
  const topicStats = useMemo(() => {
    const map: Record<string, { total: number; correct: number }> = {};
    currentQuestions.forEach((q, idx) => {
      const topic = q.topic || 'General Concepts';
      if (!map[topic]) map[topic] = { total: 0, correct: 0 };
      map[topic].total += 1;
      const state = userAnswers[idx];
      if (state && state.isSubmitted && state.isCorrect) {
        map[topic].correct += 1;
      }
    });
    return Object.entries(map).map(([topic, data]) => ({
      topic,
      total: data.total,
      correct: data.correct,
      pct: Math.round((data.correct / data.total) * 100),
    }));
  }, [currentQuestions, userAnswers]);

  // Mastery Tier Info
  const masteryTier = useMemo(() => {
    const modTitle = activeConfig.name;
    if (scorePercent >= 90) {
      return {
        badge: `🏆 Master ${modTitle} Ecologist`,
        title: 'Exceptional Scientific Mastery!',
        desc: `You demonstrated authoritative, comprehensive recall of official BCV755B ${modTitle} curriculum concepts, standards, and conservation mechanisms.`,
        color: '#34d399',
      };
    }
    if (scorePercent >= 75) {
      return {
        badge: `🌿 ${modTitle} Conservation Specialist`,
        title: 'Strong Planetary Understanding!',
        desc: `Great job! You have a solid grasp of core ${modTitle} concepts, degradation pathways, and sustainable resource management principles.`,
        color: '#10b981',
      };
    }
    if (scorePercent >= 50) {
      return {
        badge: `🌱 Environmental Practitioner`,
        title: 'Solid Foundation — Review Recommended',
        desc: `You have grasped the general framework. Review the detailed explanations and key takeaways below to master specific quantitative nuances.`,
        color: '#fbbf24',
      };
    }
    return {
      badge: '🔍 Apprentice Naturalist',
      title: 'Keep Exploring & Reviewing',
      desc: `Natural resource systems are intricate. Review the module chapters and retake the assessment to reinforce your understanding.`,
      color: '#f87171',
    };
  }, [scorePercent, activeConfig.name]);

  // Questions for Review Filter
  const reviewQuestions = useMemo(() => {
    return currentQuestions.map((q, idx) => {
      const state = userAnswers[idx] || { selectedChoice: null, isSubmitted: false, isCorrect: false };
      return { question: q, idx, state };
    }).filter(({ state }) => {
      if (reviewFilter === 'correct') return state.isSubmitted && state.isCorrect;
      if (reviewFilter === 'wrong') return state.isSubmitted && !state.isCorrect;
      return true;
    });
  }, [currentQuestions, userAnswers, reviewFilter]);

  return (
    <div
      className="quiz-page-container"
      style={
        {
          '--module-accent': activeConfig.accent,
          '--module-glow': activeConfig.accentGlow,
          '--module-bg': activeConfig.accentBg,
        } as React.CSSProperties
      }
    >
      {/* Ambient background glows */}
      <div className="quiz-ambient-glow" />
      <div className="quiz-grid-pattern" />

      {/* Top Header Navigation */}
      <nav className="quiz-nav-topbar" aria-label="Quiz Navigation">
        <Link to={activeConfig.backPath} className="quiz-back-link">
          <ArrowLeft size={15} />
          <span>Back to {activeConfig.name === 'All Modules' ? 'Field Guide' : `Module ${activeConfig.num}: ${activeConfig.name}`}</span>
        </Link>

        <div className="quiz-top-brand-group">
          <span className="quiz-brand-title">TERRA</span>
          <span className="quiz-brand-divider">|</span>
          <span className="quiz-brand-sub">BCV755B Conservation Assessment</span>
        </div>

        <div className="quiz-top-badge">
          <span className="quiz-top-badge-dot" />
          <span>{activeConfig.shortEyebrow}</span>
        </div>
      </nav>

      {/* Module Scope Tabs */}
      <div className="quiz-module-tabs" role="tablist" aria-label="Select Quiz Module">
        {MODULE_LIST.map((mod) => {
          const isActive = activeModuleSlug === mod.slug;
          const count = getQuestionCount(mod.slug);
          const Icon = mod.icon;

          return (
            <button
              key={mod.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`quiz-module-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSelectModule(mod.slug)}
              style={
                isActive
                  ? ({
                      '--tab-accent': mod.accent,
                      '--tab-glow': mod.accentGlow,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="quiz-tab-icon-wrap" style={{ color: isActive ? mod.accent : '#94a3b8' }}>
                <Icon size={15} />
              </span>
              <span className="quiz-tab-title">
                {mod.num === 'ALL' ? 'All Modules' : `Module ${mod.num}: ${mod.name}`}
              </span>
              <span className="quiz-module-tab-count">
                {count} {count === 1 ? 'Question' : 'Questions'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <main className="quiz-card-wrapper">
        {/* Luminous Top Accent Bar */}
        <div className="quiz-card-accent-bar" />

        {!showResults ? (
          /* ================================================================
             ACTIVE QUESTION VIEW
             ================================================================ */
          <div className="quiz-question-active-view">
            {/* Header intro */}
            <div className="quiz-header-intro">
              <div className="quiz-header-eyebrow-row">
                <span className="quiz-header-pulse-dot" />
                <p className="quiz-header-eyebrow">{activeConfig.shortEyebrow}</p>
              </div>
              <h1 className="quiz-header-title">{activeConfig.fullTitle}</h1>
              <p className="quiz-header-desc">{activeConfig.subtitle}</p>
            </div>

            {/* Matrix Quick-Jump Navigation */}
            <div className="quiz-matrix-wrapper">
              <div className="quiz-matrix-header">
                <span className="quiz-matrix-label">QUESTION SELECTOR</span>
                <span className="quiz-matrix-hint">Jump directly to any question</span>
              </div>
              <div className="quiz-matrix-bar" aria-label="Question Jump Matrix">
                {currentQuestions.map((_, idx) => {
                  const qState = userAnswers[idx];
                  const isCurrent = idx === currentIndex;
                  const isCorrect = qState?.isSubmitted && qState.isCorrect;
                  const isWrong = qState?.isSubmitted && !qState.isCorrect;

                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`quiz-matrix-item ${isCurrent ? 'is-current' : ''} ${
                        isCorrect ? 'is-correct' : ''
                      } ${isWrong ? 'is-wrong' : ''}`}
                      onClick={() => handleJumpToQuestion(idx)}
                      title={`Question ${idx + 1}${
                        qState?.isSubmitted ? (isCorrect ? ' (Correct)' : ' (Incorrect)') : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Meta Tags & Live Score */}
            <div className="quiz-meta-row">
              <div className="quiz-meta-tags">
                <span className="quiz-topic-pill">
                  <Sparkles size={12} />
                  <span>{currentQ?.topic || `Question ${currentIndex + 1}`}</span>
                </span>
                {currentQ?.difficulty && (
                  <span className={`quiz-difficulty-pill ${currentQ.difficulty.toLowerCase()}`}>
                    {currentQ.difficulty}
                  </span>
                )}
              </div>

              <div className="quiz-score-badge">
                <span className="quiz-score-label">Progress:</span>
                <strong>
                  {submittedCount} / {currentQuestions.length} Answered
                </strong>
                {submittedCount > 0 && (
                  <span className="quiz-score-correct-tag">
                    ({correctCount} Correct)
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div
              className="quiz-progress-track"
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={currentQuestions.length}
            >
              <div
                className="quiz-progress-fill"
                style={{
                  width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Prompt */}
            {currentQ && (
              <div className="quiz-prompt-section">
                <div className="quiz-prompt-number">
                  <span>QUESTION</span>
                  <span className="quiz-num-highlight">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span>OF {String(currentQuestions.length).padStart(2, '0')}</span>
                </div>
                <h2 className="quiz-prompt-text">{currentQ.prompt}</h2>
              </div>
            )}

            {/* Options List */}
            {currentQ && (
              <div className="quiz-options-list" role="radiogroup" aria-label="Question choices">
                {currentQ.choices.map((choice, choiceIdx) => {
                  const letter = String.fromCharCode(65 + choiceIdx);
                  const isSelected = currentState.selectedChoice === choiceIdx;
                  const isSubmitted = currentState.isSubmitted;
                  const isCorrectChoice = choiceIdx === currentQ.answer;
                  const isWrongSelected = isSubmitted && isSelected && !isCorrectChoice;
                  const isRevealedCorrect = isSubmitted && !isSelected && isCorrectChoice;

                  let optClass = 'quiz-option-btn';
                  if (isSelected && !isSubmitted) optClass += ' is-selected';
                  if (isSubmitted && isCorrectChoice) optClass += ' is-correct';
                  if (isWrongSelected) optClass += ' is-wrong';
                  if (isRevealedCorrect) optClass += ' is-revealed-correct';

                  return (
                    <button
                      key={choiceIdx}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={isSubmitted}
                      className={optClass}
                      onClick={() => handleSelectOption(choiceIdx)}
                    >
                      <span className="quiz-option-letter">{letter}</span>
                      <span className="quiz-option-text">{choice}</span>

                      <div className="quiz-option-status-icon">
                        {isSubmitted && isCorrectChoice && (
                          <span className="quiz-icon-pill correct">
                            <CheckCircle2 size={18} />
                          </span>
                        )}
                        {isWrongSelected && (
                          <span className="quiz-icon-pill wrong">
                            <XCircle size={18} />
                          </span>
                        )}
                        {isRevealedCorrect && (
                          <span className="quiz-icon-pill revealed">
                            <Check size={16} />
                          </span>
                        )}
                        {!isSubmitted && (
                          <span className="quiz-key-hint">{choiceIdx + 1}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Feedback & Detailed Scientific Explanation */}
            {currentState.isSubmitted && currentQ && (
              <div
                className={`quiz-feedback-box ${currentState.isCorrect ? 'is-success' : 'is-fail'}`}
                role="status"
              >
                <div className="quiz-feedback-header">
                  {currentState.isCorrect ? (
                    <>
                      <CheckCircle2 size={20} className="quiz-feedback-status-icon" />
                      <span>Correct! Excellent scientific recall.</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} className="quiz-feedback-status-icon" />
                      <span>Not quite — review the syllabus rationale below:</span>
                    </>
                  )}
                </div>

                <p className="quiz-feedback-explanation">{currentQ.explanation}</p>

                {currentQ.takeaway && (
                  <div className="quiz-takeaway-card">
                    <Lightbulb size={16} className="quiz-takeaway-icon" />
                    <div>
                      <strong>Core Exam Takeaway:</strong> {currentQ.takeaway}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions Row */}
            <div className="quiz-actions-row">
              <button
                type="button"
                className="quiz-btn-prev"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>

              {!currentState.isSubmitted ? (
                <button
                  type="button"
                  className="quiz-btn-submit"
                  disabled={currentState.selectedChoice === null}
                  onClick={handleCheckAnswer}
                >
                  <Check size={17} />
                  <span>Check Answer</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="quiz-btn-next"
                  onClick={handleNext}
                >
                  <span>
                    {currentIndex === currentQuestions.length - 1
                      ? 'View Results 🏆'
                      : 'Next Question'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ================================================================
             RESULTS & ANALYTICS DASHBOARD
             ================================================================ */
          <div className="quiz-results-view">
            <div className="quiz-results-hero">
              <div className="quiz-results-trophy-wrap">
                <Trophy size={42} strokeWidth={2.2} />
              </div>

              <div className="quiz-results-tier-badge">
                <Award size={15} />
                <span>{masteryTier.badge}</span>
              </div>

              <h2 className="quiz-results-title">{masteryTier.title}</h2>
              <p className="quiz-results-summary-text">{masteryTier.desc}</p>
            </div>

            {/* Key Stats Cards */}
            <div className="quiz-results-stats-grid">
              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <BarChart3 size={14} /> Final Score
                </span>
                <span className="quiz-stat-value highlight">
                  {correctCount}{' '}
                  <small style={{ fontSize: 16, color: '#94a3b8' }}>
                    / {currentQuestions.length}
                  </small>
                </span>
                <span className="quiz-stat-sub">Total questions answered</span>
              </div>

              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <Sparkles size={14} /> Accuracy
                </span>
                <span className="quiz-stat-value highlight">{scorePercent}%</span>
                <span className="quiz-stat-sub">Overall score percentage</span>
              </div>

              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <CheckCircle2 size={14} color="#10b981" /> Correct Answers
                </span>
                <span className="quiz-stat-value" style={{ color: '#34d399' }}>
                  {correctCount}
                </span>
                <span className="quiz-stat-sub">Valid concepts identified</span>
              </div>

              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <HelpCircle size={14} color="#f87171" /> Review Needed
                </span>
                <span className="quiz-stat-value" style={{ color: '#f87171' }}>
                  {currentQuestions.length - correctCount}
                </span>
                <span className="quiz-stat-sub">Missed or unattempted</span>
              </div>
            </div>

            {/* Topic Performance Breakdown */}
            {topicStats.length > 1 && (
              <div className="quiz-topic-breakdown-card">
                <div className="quiz-breakdown-heading">
                  <span>Topic Breakdown & Strengths</span>
                  <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
                    Module {activeConfig.num} Knowledge Areas
                  </span>
                </div>

                <div className="quiz-topic-bars-list">
                  {topicStats.map((item) => (
                    <div key={item.topic} className="quiz-topic-bar-row">
                      <div className="quiz-topic-bar-meta">
                        <span>{item.topic}</span>
                        <span>
                          {item.correct}/{item.total} ({item.pct}%)
                        </span>
                      </div>
                      <div className="quiz-topic-bar-track">
                        <div
                          className="quiz-topic-bar-fill"
                          style={{
                            width: `${item.pct}%`,
                            background:
                              item.pct >= 80
                                ? '#10b981'
                                : item.pct >= 50
                                ? '#fbbf24'
                                : '#f87171',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review All Questions Accordion */}
            <button
              type="button"
              className="quiz-review-toggle-btn"
              onClick={() => setShowReviewAccordion((prev) => !prev)}
            >
              <span>
                {showReviewAccordion
                  ? 'Hide Question Review'
                  : `Review All ${currentQuestions.length} Questions`}
              </span>
              {showReviewAccordion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showReviewAccordion && (
              <div className="quiz-review-container">
                {/* Filter pills */}
                <div className="quiz-review-filter-row">
                  <button
                    type="button"
                    className={`quiz-review-filter-btn ${reviewFilter === 'all' ? 'is-active' : ''}`}
                    onClick={() => setReviewFilter('all')}
                  >
                    All ({currentQuestions.length})
                  </button>
                  <button
                    type="button"
                    className={`quiz-review-filter-btn ${reviewFilter === 'correct' ? 'is-active' : ''}`}
                    onClick={() => setReviewFilter('correct')}
                  >
                    Correct ({correctCount})
                  </button>
                  <button
                    type="button"
                    className={`quiz-review-filter-btn ${reviewFilter === 'wrong' ? 'is-active' : ''}`}
                    onClick={() => setReviewFilter('wrong')}
                  >
                    Incorrect ({currentQuestions.length - correctCount})
                  </button>
                </div>

                <div className="quiz-review-list">
                  {reviewQuestions.map(({ question, idx, state }) => {
                    const isCorrect = state.isSubmitted && state.isCorrect;
                    const userSelected =
                      state.selectedChoice !== null
                        ? question.choices[state.selectedChoice]
                        : 'Not answered';
                    const correctAnswer = question.choices[question.answer];

                    return (
                      <div
                        key={idx}
                        className={`quiz-review-item ${
                          isCorrect ? 'is-correct-card' : 'is-wrong-card'
                        }`}
                      >
                        <div className="quiz-review-top">
                          <span className="quiz-review-num">
                            QUESTION {String(idx + 1).padStart(2, '0')} · {question.topic || 'General'}
                          </span>
                          <span className={`quiz-review-badge ${isCorrect ? 'correct' : 'wrong'}`}>
                            {isCorrect ? (
                              <>
                                <Check size={12} /> Correct
                              </>
                            ) : (
                              <>
                                <X size={12} /> Incorrect
                              </>
                            )}
                          </span>
                        </div>

                        <h4 className="quiz-review-prompt">{question.prompt}</h4>

                        <div className="quiz-review-answers-box">
                          <div className="quiz-review-row">
                            <span className="quiz-review-label">Your Choice:</span>
                            <span style={{ color: isCorrect ? '#34d399' : '#f87171' }}>
                              {userSelected}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="quiz-review-row">
                              <span className="quiz-review-label">Correct Choice:</span>
                              <span style={{ color: '#34d399', fontWeight: 600 }}>
                                {correctAnswer}
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="quiz-review-explanation">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>

                        {question.takeaway && (
                          <div className="quiz-review-takeaway">
                            💡 <em>{question.takeaway}</em>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action CTA Bar */}
            <div className="quiz-results-cta-bar">
              <button
                type="button"
                className="quiz-cta-btn-primary"
                onClick={handleRetake}
              >
                <RotateCcw size={16} />
                <span>Retake Assessment</span>
              </button>

              <Link to={activeConfig.backPath} className="quiz-cta-btn-secondary">
                <BookOpen size={16} />
                <span>Revisit Module Chapters</span>
              </Link>

              {activeConfig.nextModule && (
                <Link
                  to={activeConfig.nextModule.path}
                  className="quiz-cta-btn-primary quiz-next-module-cta"
                  style={{
                    background: `linear-gradient(135deg, ${activeConfig.accent}, #0284c7)`,
                  }}
                >
                  <Sparkles size={16} />
                  <span>Proceed to {activeConfig.nextModule.name}</span>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
