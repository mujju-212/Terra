import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplets,
  Droplet,
  Waves,
  Globe,
  Factory,
  Leaf,
  Users,
  Layers,
  ArrowDownCircle,
  AlertTriangle,
  ShieldCheck,
  FileQuestion,
  BookOpen,
  ArrowRight,
  Quote,
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import type { ModuleContent } from '../../content/types';
import ModuleCardsStrip from '../../components/ModuleCardsStrip';
import { useModalScrollLock } from './useModalScrollLock';
import {
  SummaryItem,
  SUMMARY_TAKEAWAYS,
  SUMMARY_STATISTICS,
  SUMMARY_CHALLENGES,
  SUMMARY_SOLUTIONS
} from './waterSummaryData';

interface WaterSummaryScreenProps {
  module: ModuleContent;
}

export function WaterSummaryScreen({ module }: WaterSummaryScreenProps) {
  const navigate = useNavigate();
  const [activeModalItem, setActiveModalItem] = useState<SummaryItem | null>(null);

  // Lock body scroll and handle escape/wheel routing when modal is active
  useModalScrollLock(Boolean(activeModalItem), () => setActiveModalItem(null));

  // Icon resolver
  const renderIcon = (name: string, className?: string) => {
    switch (name) {
      case 'Droplets':
        return <Droplets className={className || 'w-4 h-4'} />;
      case 'Droplet':
        return <Droplet className={className || 'w-4 h-4'} />;
      case 'Waves':
        return <Waves className={className || 'w-4 h-4'} />;
      case 'Globe':
        return <Globe className={className || 'w-4 h-4'} />;
      case 'Factory':
        return <Factory className={className || 'w-4 h-4'} />;
      case 'Leaf':
        return <Leaf className={className || 'w-4 h-4'} />;
      case 'Users':
        return <Users className={className || 'w-4 h-4'} />;
      case 'Layers':
        return <Layers className={className || 'w-4 h-4'} />;
      case 'ArrowDownCircle':
        return <ArrowDownCircle className={className || 'w-4 h-4'} />;
      case 'AlertTriangle':
        return <AlertTriangle className={className || 'w-4 h-4'} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className || 'w-4 h-4'} />;
      default:
        return <Sparkles className={className || 'w-4 h-4'} />;
    }
  };

  return (
    <>
      <section className="water-summary-screen" id="ch-summary">
        {/* Background Scenic Master Dam Landscape */}
        <div className="water-summary-backdrop" aria-hidden="true">
          <img
            src="/images/water-ch18-module-summary-master.jpg"
            alt="Hydroelectric Dam and Scenic Reservoir Sunset"
            className="water-summary-bg-img"
          />
          <div className="water-summary-scrim-top" />
          <div className="water-summary-scrim-bottom" />
          <div className="water-summary-scrim-radial" />
        </div>

        {/* Content Container */}
        <div className="water-summary-container">
          {/* Header Row: Chapter Info & Quote Card */}
          <div className="water-summary-header-row">
            <div className="water-summary-heading-col">
              <span className="water-summary-ch-eyebrow">CHAPTER 18</span>
              <h1 className="water-summary-title">
                Module <span className="water-summary-title-gradient">Summary</span>
              </h1>
              <p className="water-summary-desc">
                This module covered the availability, use, challenges and management of water resources, with a special
                focus on groundwater. It highlighted the importance of sustainable water management for environmental
                protection, public health and long-term development in India and globally.
              </p>
            </div>

            <aside className="water-summary-quote-card" aria-label="Module Concluding Quote">
              <div className="water-summary-quote-icon-box">
                <Quote className="water-summary-quote-icon" size={24} />
              </div>
              <blockquote className="water-summary-quote-text">
                &ldquo;Water is a shared resource and a shared responsibility. Sustainable management today ensures a
                healthier, safer and more resilient tomorrow.&rdquo;
              </blockquote>
            </aside>
          </div>

          {/* 4-Column Content Dock Grid */}
          <div className="water-summary-dock-grid">
            {/* Column 1: Key Takeaways */}
            <div className="water-summary-col water-summary-col-takeaways">
              <div className="water-summary-col-header">
                <h3>Key Takeaways</h3>
              </div>
              <div className="water-summary-col-list">
                {SUMMARY_TAKEAWAYS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="water-summary-item-card water-summary-item-takeaway"
                    onClick={() => setActiveModalItem(item)}
                    title="Click to view technical notes"
                  >
                    <div className="water-summary-badge water-summary-badge-takeaway">
                      {renderIcon(item.iconName)}
                    </div>
                    <div className="water-summary-item-text">
                      <p>{item.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Key Statistics */}
            <div className="water-summary-col water-summary-col-stats">
              <div className="water-summary-col-header">
                <h3>Key Statistics</h3>
              </div>
              <div className="water-summary-col-list">
                {SUMMARY_STATISTICS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="water-summary-item-card water-summary-item-stat"
                    onClick={() => setActiveModalItem(item)}
                    title="Click to view statistical breakdown"
                  >
                    <div className="water-summary-badge water-summary-badge-stat">
                      {renderIcon(item.iconName)}
                    </div>
                    <div className="water-summary-item-text">
                      <strong className="water-summary-stat-val">{item.value}</strong>
                      <span className="water-summary-stat-lbl">{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Major Challenges */}
            <div className="water-summary-col water-summary-col-challenges">
              <div className="water-summary-col-header">
                <h3>Major Challenges</h3>
              </div>
              <div className="water-summary-col-list">
                {SUMMARY_CHALLENGES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="water-summary-item-card water-summary-item-challenge"
                    onClick={() => setActiveModalItem(item)}
                    title="Click to explore threat analysis"
                  >
                    <div className="water-summary-badge water-summary-badge-challenge">
                      {renderIcon(item.iconName)}
                    </div>
                    <div className="water-summary-item-text">
                      <p>{item.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: Solutions and Way Forward */}
            <div className="water-summary-col water-summary-col-solutions">
              <div className="water-summary-col-header">
                <h3>Solutions and Way Forward</h3>
              </div>
              <div className="water-summary-col-list">
                {SUMMARY_SOLUTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="water-summary-item-card water-summary-item-solution"
                    onClick={() => setActiveModalItem(item)}
                    title="Click to inspect implementation framework"
                  >
                    <div className="water-summary-badge water-summary-badge-solution">
                      {renderIcon(item.iconName)}
                    </div>
                    <div className="water-summary-item-text">
                      <p>{item.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Launchpad Cards */}
          <div className="water-summary-action-row">
            {/* Left Card: Test Your Knowledge */}
            <div className="water-summary-action-card water-summary-action-quiz">
              <div className="water-summary-action-content">
                <div className="water-summary-action-icon-box water-summary-action-icon-quiz">
                  <FileQuestion size={22} />
                </div>
                <div className="water-summary-action-meta">
                  <h4>Test Your Knowledge</h4>
                  <p>Take a short quiz to check your understanding of key concepts from this module.</p>
                </div>
              </div>
              <button
                type="button"
                className="water-summary-btn water-summary-btn-quiz"
                onClick={() => navigate(`/quiz?module=${module.slug}`)}
              >
                <span>Take Quiz</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Card: Continue Learning */}
            <div className="water-summary-action-card water-summary-action-continue">
              <div className="water-summary-action-content">
                <div className="water-summary-action-icon-box water-summary-action-icon-continue">
                  <BookOpen size={22} />
                </div>
                <div className="water-summary-action-meta">
                  <h4>Continue Learning</h4>
                  <p>Explore additional resources, references and the next module.</p>
                </div>
              </div>
              <button
                type="button"
                className="water-summary-btn water-summary-btn-continue"
                onClick={() => navigate('/module/air')}
              >
                <span>Continue</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Deep-Dive Modal */}
      {activeModalItem && (
        <div className="water-modal-overlay" data-lenis-prevent onClick={() => setActiveModalItem(null)}>
          <div
            className="water-modal-container water-summary-modal-box"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="summary-modal-title"
          >
            <div className="water-modal-header">
              <div className="water-modal-header-titles">
                <span className={`water-summary-modal-badge water-summary-modal-badge-${activeModalItem.category}`}>
                  {activeModalItem.category === 'takeaway' && 'Key Takeaway'}
                  {activeModalItem.category === 'stat' && 'Key Metric'}
                  {activeModalItem.category === 'challenge' && 'Hydrological Challenge'}
                  {activeModalItem.category === 'solution' && 'Strategic Way Forward'}
                </span>
                <h3 id="summary-modal-title">{activeModalItem.detailTitle}</h3>
              </div>
              <button
                type="button"
                className="water-modal-close-btn"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="water-modal-body">
              <div className="water-summary-modal-intro">
                <div className={`water-summary-modal-icon-disc water-summary-modal-icon-${activeModalItem.category}`}>
                  {renderIcon(activeModalItem.iconName, 'w-6 h-6')}
                </div>
                <div className="water-summary-modal-intro-text">
                  <h4>{activeModalItem.title}</h4>
                  <p>{activeModalItem.description}</p>
                </div>
              </div>

              {/* Key Metrics / Facts Strip */}
              {activeModalItem.keyFacts && activeModalItem.keyFacts.length > 0 && (
                <div className="water-summary-modal-facts">
                  {activeModalItem.keyFacts.map((fact, idx) => (
                    <div key={idx} className="water-summary-modal-fact-card">
                      <span className="water-summary-modal-fact-val">{fact.value}</span>
                      <span className="water-summary-modal-fact-lbl">{fact.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technical Detail Body */}
              <div className="water-summary-modal-paragraphs">
                <h5>Technical Context & Framework</h5>
                <ul>
                  {activeModalItem.detailBody.map((paragraph, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="water-summary-modal-bullet-icon" />
                      <span>{paragraph}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="water-modal-footer">
              <button
                type="button"
                className="water-summary-modal-close-action"
                onClick={() => setActiveModalItem(null)}
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Module Strip at the bottom */}
      <ModuleCardsStrip currentSlug={module.slug} />
    </>
  );
}
export default WaterSummaryScreen;
