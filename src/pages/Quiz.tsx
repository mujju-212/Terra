import { useState, useMemo, useEffect } from 'react';
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
  Layers,
  Award,
  BarChart3,
} from 'lucide-react';
import { modules } from '../content';
import { quizQuestions, type QuizQuestion } from '../content/quiz';
import '../quiz.css';

interface QuestionState {
  selectedChoice: number | null;
  isSubmitted: boolean;
  isCorrect: boolean;
}

export default function Quiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedModule = searchParams.get('module') ?? 'land'; // Default to land module

  // Active module scope
  const activeModuleSlug = requestedModule;

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
    if (currentState.isSubmitted) return; // Cannot change after checking
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
  const handleCheckAnswer = () => {
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
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

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
    if (scorePercent >= 90) {
      return {
        badge: '🏆 Master Land Ecologist',
        title: 'Exceptional Scientific Mastery!',
        desc: 'You demonstrated an authoritative understanding of planetary geology, soil horizons, deforestation drivers, and sustainable land management.',
        color: '#34d399',
      };
    }
    if (scorePercent >= 75) {
      return {
        badge: '🌿 Field Conservation Specialist',
        title: 'Strong Planetary Understanding!',
        desc: 'Great job! You have a firm grasp of essential land science concepts, degradation mechanisms, and conservation planning principles.',
        color: '#10b981',
      };
    }
    if (scorePercent >= 50) {
      return {
        badge: '🌱 Environmental Practitioner',
        title: 'Solid Foundation — Review Recommended',
        desc: 'You have grasped the core ideas. Review the detailed explanations below to master specific nuances in soil profiles and watershed dynamics.',
        color: '#fbbf24',
      };
    }
    return {
      badge: '🔍 Apprentice Naturalist',
      title: 'Keep Exploring & Reviewing',
      desc: 'Land systems are rich and complex. Take a moment to review the module chapters and retake the quiz to sharpen your recall.',
      color: '#f87171',
    };
  }, [scorePercent]);

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

  const activeModuleMeta = modules.find((m) => m.slug === activeModuleSlug);

  return (
    <div className="quiz-page-container">
      {/* Ambient background glows */}
      <div className="quiz-ambient-glow" />
      <div className="quiz-grid-pattern" />

      {/* Top Header Navigation */}
      <nav className="quiz-nav-topbar" aria-label="Quiz Navigation">
        <Link
          to={activeModuleSlug === 'land' ? '/module/land' : activeModuleSlug === 'water' ? '/module/water' : '/#modules'}
          className="quiz-back-link"
        >
          <ArrowLeft size={15} />
          <span>
            {activeModuleSlug === 'land' ? 'Back to Module 01: Land' : 'Back to Field Guide'}
          </span>
        </Link>

        <div className="quiz-top-badge">
          <span className="quiz-top-badge-dot" />
          <span>BCV755B · KNOWLEDGE ASSESSMENT</span>
        </div>
      </nav>

      {/* Module Scope Tabs */}
      <div className="quiz-module-tabs" role="tablist" aria-label="Select Quiz Module">
        <button
          type="button"
          role="tab"
          aria-selected={activeModuleSlug === 'land'}
          className={`quiz-module-tab ${activeModuleSlug === 'land' ? 'is-active' : ''}`}
          onClick={() => handleSelectModule('land')}
        >
          <span>Module 01: Land</span>
          <span className="quiz-module-tab-count">15 Questions</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeModuleSlug === 'water'}
          className={`quiz-module-tab ${activeModuleSlug === 'water' ? 'is-active' : ''}`}
          onClick={() => handleSelectModule('water')}
        >
          <span>Module 02: Water</span>
          <span className="quiz-module-tab-count">4</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeModuleSlug === 'air'}
          className={`quiz-module-tab ${activeModuleSlug === 'air' ? 'is-active' : ''}`}
          onClick={() => handleSelectModule('air')}
        >
          <span>Module 03: Air</span>
          <span className="quiz-module-tab-count">4</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeModuleSlug === 'biodiversity'}
          className={`quiz-module-tab ${activeModuleSlug === 'biodiversity' ? 'is-active' : ''}`}
          onClick={() => handleSelectModule('biodiversity')}
        >
          <span>Module 04: Biodiversity</span>
          <span className="quiz-module-tab-count">4</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeModuleSlug === 'warming'}
          className={`quiz-module-tab ${activeModuleSlug === 'warming' ? 'is-active' : ''}`}
          onClick={() => handleSelectModule('warming')}
        >
          <span>Module 05: Warming</span>
          <span className="quiz-module-tab-count">4</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeModuleSlug === 'all'}
          className={`quiz-module-tab ${activeModuleSlug === 'all' ? 'is-active' : ''}`}
          onClick={() => handleSelectModule('all')}
        >
          <span>All Modules</span>
          <span className="quiz-module-tab-count">{quizQuestions.length}</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="quiz-card-wrapper">
        {!showResults ? (
          /* ================================================================
             ACTIVE QUESTION VIEW
             ================================================================ */
          <div className="quiz-question-active-view">
            {/* Header intro */}
            <div className="quiz-header-intro">
              <p className="quiz-header-eyebrow">
                MODULE {activeModuleMeta ? `0${activeModuleMeta.id} · ${activeModuleMeta.shortName.toUpperCase()}` : 'ASSESSMENT'}
              </p>
              <h1 className="quiz-header-title">
                {activeModuleSlug === 'land' ? 'Module 01: Land & Soil Knowledge Check' : 'Planetary Resource Knowledge Check'}
              </h1>
              <p className="quiz-header-desc">
                {activeModuleSlug === 'land'
                  ? 'Fifteen comprehensive questions covering planetary formation, soil horizons, deforestation drivers, and sustainable land-use planning.'
                  : 'Test your understanding of the core environmental science concepts covered across the curriculum.'}
              </p>
            </div>

            {/* Matrix Quick-Jump Navigation */}
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

            {/* Question Meta Tags & Live Score */}
            <div className="quiz-meta-row">
              <div className="quiz-meta-tags">
                <span className="quiz-topic-pill">
                  {currentQ?.topic || `Question ${currentIndex + 1}`}
                </span>
                {currentQ?.difficulty && (
                  <span className={`quiz-difficulty-pill ${currentQ.difficulty.toLowerCase()}`}>
                    {currentQ.difficulty}
                  </span>
                )}
              </div>

              <div className="quiz-score-badge">
                <span>Progress:</span>
                <strong>
                  {submittedCount} / {currentQuestions.length} Answered
                </strong>
                {submittedCount > 0 && (
                  <span style={{ color: '#34d399', marginLeft: 6 }}>
                    ({correctCount} Correct)
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="quiz-progress-track" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={currentQuestions.length}>
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
                  QUESTION {String(currentIndex + 1).padStart(2, '0')} OF {String(currentQuestions.length).padStart(2, '0')}
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

                  let optClass = 'quiz-option-btn';
                  if (isSelected && !isSubmitted) optClass += ' is-selected';
                  if (isSubmitted && isCorrectChoice) optClass += ' is-correct';
                  if (isWrongSelected) optClass += ' is-wrong';

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
                          <CheckCircle2 size={18} color="#10b981" />
                        )}
                        {isWrongSelected && (
                          <XCircle size={18} color="#ef4444" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Feedback & Detailed Scientific Explanation (Revealed when submitted) */}
            {currentState.isSubmitted && currentQ && (
              <div
                className={`quiz-feedback-box ${currentState.isCorrect ? 'is-success' : 'is-fail'}`}
                role="status"
              >
                <div className="quiz-feedback-header">
                  {currentState.isCorrect ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Correct! Excellent scientific recall.</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} />
                      <span>Not quite — review the explanation below:</span>
                    </>
                  )}
                </div>

                <p className="quiz-feedback-explanation">{currentQ.explanation}</p>

                {currentQ.takeaway && (
                  <div className="quiz-takeaway-card">
                    <Lightbulb size={16} className="quiz-takeaway-icon" />
                    <div>
                      <strong>Key Concept:</strong> {currentQ.takeaway}
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
                <ArrowLeft size={15} />
                <span>Previous</span>
              </button>

              {!currentState.isSubmitted ? (
                <button
                  type="button"
                  className="quiz-btn-submit"
                  disabled={currentState.selectedChoice === null}
                  onClick={handleCheckAnswer}
                >
                  <Check size={16} />
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
                  <ArrowRight size={15} />
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
                <Trophy size={36} strokeWidth={2.2} />
              </div>

              <div className="quiz-results-tier-badge">
                <Award size={14} />
                <span>{masteryTier.badge}</span>
              </div>

              <h2 className="quiz-results-title">{masteryTier.title}</h2>
              <p className="quiz-results-summary-text">{masteryTier.desc}</p>
            </div>

            {/* Key Stats Cards */}
            <div className="quiz-results-stats-grid">
              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <BarChart3 size={13} /> Final Score
                </span>
                <span className="quiz-stat-value highlight">
                  {correctCount} <small style={{ fontSize: 16, color: '#94a3b8' }}>/ {currentQuestions.length}</small>
                </span>
                <span className="quiz-stat-sub">Total questions answered</span>
              </div>

              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <Sparkles size={13} /> Accuracy
                </span>
                <span className="quiz-stat-value highlight">{scorePercent}%</span>
                <span className="quiz-stat-sub">Percentage correct</span>
              </div>

              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <CheckCircle2 size={13} color="#10b981" /> Correct Answers
                </span>
                <span className="quiz-stat-value" style={{ color: '#34d399' }}>
                  {correctCount}
                </span>
                <span className="quiz-stat-sub">Valid concepts identified</span>
              </div>

              <div className="quiz-stat-card">
                <span className="quiz-stat-label">
                  <HelpCircle size={13} color="#f87171" /> Review Needed
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
                    Module 01 Knowledge Areas
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
              <span>{showReviewAccordion ? 'Hide Question Review' : 'Review All 15 Questions'}</span>
              {showReviewAccordion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showReviewAccordion && (
              <div className="quiz-review-container">
                {/* Filter pills */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
                  <button
                    type="button"
                    className={`quiz-module-tab ${reviewFilter === 'all' ? 'is-active' : ''}`}
                    onClick={() => setReviewFilter('all')}
                  >
                    All ({currentQuestions.length})
                  </button>
                  <button
                    type="button"
                    className={`quiz-module-tab ${reviewFilter === 'correct' ? 'is-active' : ''}`}
                    onClick={() => setReviewFilter('correct')}
                  >
                    Correct ({correctCount})
                  </button>
                  <button
                    type="button"
                    className={`quiz-module-tab ${reviewFilter === 'wrong' ? 'is-active' : ''}`}
                    onClick={() => setReviewFilter('wrong')}
                  >
                    Incorrect ({currentQuestions.length - correctCount})
                  </button>
                </div>

                <div className="quiz-review-list">
                  {reviewQuestions.map(({ question, idx, state }) => {
                    const isCorrect = state.isSubmitted && state.isCorrect;
                    const userSelected = state.selectedChoice !== null ? question.choices[state.selectedChoice] : 'Not answered';
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
                          <div style={{ marginTop: 8, fontSize: 12, color: '#fbbf24' }}>
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
                <RotateCcw size={15} />
                <span>Retake Quiz</span>
              </button>

              <Link
                to={activeModuleSlug === 'land' ? '/module/land' : '/#modules'}
                className="quiz-cta-btn-secondary"
              >
                <BookOpen size={15} />
                <span>Revisit Module Chapters</span>
              </Link>

              {activeModuleSlug === 'land' && (
                <Link to="/module/water" className="quiz-cta-btn-primary" style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}>
                  <Droplet size={15} />
                  <span>Proceed to Module 02: Water</span>
                  <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
