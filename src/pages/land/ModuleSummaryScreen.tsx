import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, ArrowRight, ArrowLeft, Check, Clock, Leaf, BarChart3, Trophy, Star, FileText } from 'lucide-react';
import '../../modulesummary.css';
import { Reveal, Magnetic } from './motion';

interface RecapTopicItem {
  num: string;
  title: string;
  desc: string;
  badgeBg: string;
  badgeColor: string;
  image: string;
  chapterIndex: number;
}

const MODULE_RECAP_TOPICS: RecapTopicItem[] = [
  {
    num: '01',
    title: 'Earth Formation',
    desc: '4.6 billion-year formation timeline.',
    badgeBg: 'rgba(56, 189, 248, 0.25)',
    badgeColor: '#38bdf8',
    image: '/images/stage-06-habitable.jpg',
    chapterIndex: 1,
  },
  {
    num: '02',
    title: 'Earth Layers',
    desc: 'Structure from crust to core.',
    badgeBg: 'rgba(168, 85, 247, 0.25)',
    badgeColor: '#c084fc',
    image: '/images/earth-cutaway-photoreal.jpg',
    chapterIndex: 2,
  },
  {
    num: '03',
    title: 'Crust & Continents',
    desc: "Formation of Earth's crust and continental drift.",
    badgeBg: 'rgba(234, 179, 8, 0.25)',
    badgeColor: '#facc15',
    image: '/images/landform-thumb-mountains.jpg',
    chapterIndex: 3,
  },
  {
    num: '04',
    title: 'Land as a Resource',
    desc: 'Only ~20% of Earth is land.',
    badgeBg: 'rgba(249, 115, 22, 0.25)',
    badgeColor: '#fb923c',
    image: '/images/earth-resource-globe.jpg',
    chapterIndex: 4,
  },
  {
    num: '05',
    title: 'Soil Formation',
    desc: 'Weathering, organic matter and soil profile.',
    badgeBg: 'rgba(34, 197, 94, 0.25)',
    badgeColor: '#4ade80',
    image: '/images/how-works-seedling.jpg',
    chapterIndex: 5,
  },
  {
    num: '06',
    title: 'Land Forms',
    desc: 'Grasslands, forests, wetlands, deserts and more.',
    badgeBg: 'rgba(16, 185, 129, 0.25)',
    badgeColor: '#34d399',
    image: '/images/landform-thumb-forests.jpg',
    chapterIndex: 6,
  },
  {
    num: '07',
    title: 'Conservation of Land Forms',
    desc: 'Protecting and maintaining land forms.',
    badgeBg: 'rgba(99, 102, 241, 0.25)',
    badgeColor: '#818cf8',
    image: '/images/cons-method-seedling.jpg',
    chapterIndex: 7,
  },
  {
    num: '08',
    title: 'Deforestation',
    desc: 'Causes, impacts and loss of biodiversity.',
    badgeBg: 'rgba(239, 68, 68, 0.25)',
    badgeColor: '#f87171',
    image: '/images/degradation-cause-deforestation.jpg',
    chapterIndex: 8,
  },
  {
    num: '09',
    title: 'Land-Use Change',
    desc: 'Natural → developed → agricultural land. Shire River case study.',
    badgeBg: 'rgba(6, 182, 212, 0.25)',
    badgeColor: '#22d3ee',
    image: '/images/cons-method-urban.jpg',
    chapterIndex: 9,
  },
  {
    num: '10',
    title: 'Soil Health & Composition',
    desc: 'Soil layers, composition and key indicators.',
    badgeBg: 'rgba(245, 158, 11, 0.25)',
    badgeColor: '#fbbf24',
    image: '/images/how-works-seedling.jpg',
    chapterIndex: 10,
  },
  {
    num: '11',
    title: 'Land Degradation',
    desc: 'Causes, impacts and threats to food security.',
    badgeBg: 'rgba(20, 184, 166, 0.25)',
    badgeColor: '#2dd4bf',
    image: '/images/land-degraded-drought.jpg',
    chapterIndex: 11,
  },
  {
    num: '12',
    title: 'Soil Conservation',
    desc: '8 key strategies for sustainable soil use.',
    badgeBg: 'rgba(132, 204, 22, 0.25)',
    badgeColor: '#a3e635',
    image: '/images/cons-method-terraces.jpg',
    chapterIndex: 12,
  },
  {
    num: '13',
    title: 'Sustainable Land-Use Planning',
    desc: 'Balanced planning for people, nature and economy.',
    badgeBg: 'rgba(244, 63, 94, 0.25)',
    badgeColor: '#fb7185',
    image: '/images/planning-hero-landscape.jpg',
    chapterIndex: 13,
  },
];

export default function ModuleSummaryScreen({
  onPrev,
  onSelectChapter,
}: {
  onPrev: () => void;
  onSelectChapter: (idx: number) => void;
}) {
  return (
    <section className="land-screen land-summary-screen" id="ch-summary">
      <div className="summary-screen-inner">
        {/* ─── 1. Top Header & Floating Quote Card ─── */}
        <Reveal dir="up" className="summary-top-header">
          <div className="summary-header-left">
            <span className="summary-eyebrow">MODULE 01 | FINAL SECTION</span>
            <h2 className="summary-main-heading">
              Module
              <span className="summary-heading-italic">Summary</span>
            </h2>
            <p className="summary-subheading">
              Key takeaways, what you've learned, and what's next.
            </p>
            <p className="summary-lead-paragraph">
              Land is a vital natural resource that supports ecosystems, human life and
              economic activities. Understanding its formation, composition, use, challenges
              and conservation is essential for building a sustainable future.
            </p>
          </div>

          <div className="summary-quote-card">
            <div className="summary-quote-icon-wrap">
              <Leaf size={24} strokeWidth={2.2} />
            </div>
            <div className="summary-quote-text-col">
              <span className="summary-quote-text">
                “Healthy land today, thriving tomorrow.”
              </span>
              <span className="summary-quote-underline" />
            </div>
          </div>
        </Reveal>

        {/* ─── 2. Main Content Grid (Left 2/3 + Right 1/3) ─── */}
        <div className="summary-main-content-grid">
          {/* Left Box: What You've Learned */}
          <Reveal dir="left" className="summary-learned-box">
            <div className="summary-learned-header">
              <div className="summary-learned-icon-badge">
                <FileText size={18} strokeWidth={2.2} />
              </div>
              <div className="summary-learned-title-group">
                <h3>What You've Learned</h3>
                <p>A quick recap of the major topics covered in Module 01.</p>
              </div>
            </div>

            <div className="summary-topics-grid">
              {MODULE_RECAP_TOPICS.map((topic) => (
                <button
                  key={topic.num}
                  type="button"
                  className="summary-topic-card"
                  onClick={() => onSelectChapter(topic.chapterIndex)}
                  title={`Revisit Chapter: ${topic.title}`}
                >
                  <div className="summary-topic-info">
                    <div className="summary-topic-top">
                      <span
                        className="summary-topic-num-pill"
                        style={{
                          background: topic.badgeBg,
                          color: topic.badgeColor,
                        }}
                      >
                        {topic.num}
                      </span>
                      <span className="summary-topic-title">{topic.title}</span>
                    </div>
                    <p className="summary-topic-desc">{topic.desc}</p>
                  </div>
                  <div className="summary-topic-thumb-wrap">
                    <img
                      src={topic.image}
                      alt={topic.title}
                      className="summary-topic-thumb-img"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Right Column: 3 Action Cards */}
          <Reveal dir="right" className="summary-right-actions-col">
            {/* Card 1: Module 01 Quiz */}
            <div className="summary-quiz-card">
              <div className="summary-quiz-header">
                <div className="summary-quiz-icon-badge">
                  <Trophy size={18} strokeWidth={2.2} />
                </div>
                <div className="summary-quiz-title-group">
                  <h4>Module 01 Quiz</h4>
                  <p>Test your understanding of Module 01.</p>
                </div>
              </div>

              <div className="summary-quiz-metrics-row">
                <div className="summary-quiz-metric-item">
                  <FileText size={14} />
                  <span className="summary-quiz-metric-text">
                    15<br />Questions
                  </span>
                </div>
                <div className="summary-quiz-metric-item">
                  <Clock size={14} />
                  <span className="summary-quiz-metric-text">
                    ~10<br />Minutes
                  </span>
                </div>
                <div className="summary-quiz-metric-item">
                  <BarChart3 size={14} />
                  <span className="summary-quiz-metric-text">
                    Instant<br />Results
                  </span>
                </div>
                <div className="summary-quiz-metric-item">
                  <Star size={14} />
                  <span className="summary-quiz-metric-text">
                    Track<br />Progress
                  </span>
                </div>
              </div>

              <Magnetic className="summary-quiz-mag">
              <Link to="/quiz?module=land" className="summary-quiz-start-btn">
                <span>Start Module 01 Quiz</span>
                <ArrowRight size={15} />
              </Link>
              </Magnetic>
            </div>

            {/* Card 2: Module 01 Completed! */}
            <div className="summary-completed-card">
              <div className="summary-completed-header">
                <div className="summary-completed-icon-badge">
                  <Check size={18} strokeWidth={3} />
                </div>
                <div className="summary-completed-title-group">
                  <h4>Module 01 Completed!</h4>
                  <p>Great job! You've finished all sections of Module 01: Land.</p>
                </div>
              </div>

              <div className="summary-completed-body">
                <div className="summary-checklist">
                  <div className="summary-checklist-item">
                    <span className="summary-checklist-icon">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>Explored 13 interactive sections</span>
                  </div>
                  <div className="summary-checklist-item">
                    <span className="summary-checklist-icon">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>Learned key concepts and real-world examples</span>
                  </div>
                  <div className="summary-checklist-item">
                    <span className="summary-checklist-icon">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>Understood the challenges and solutions</span>
                  </div>
                  <div className="summary-checklist-item">
                    <span className="summary-checklist-icon">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span>You're ready for the next module!</span>
                  </div>
                </div>

                <div className="summary-celebration-graphic">
                  <Trophy size={36} className="celebration-trophy" />
                  <span className="confetti-dot confetti-1" />
                  <span className="confetti-dot confetti-2" />
                  <span className="confetti-dot confetti-3" />
                  <span className="confetti-dot confetti-4" />
                  <span className="confetti-dot confetti-5" />
                </div>
              </div>
            </div>

            {/* Card 3: Continue to Module 02: Water */}
            <div className="summary-water-card">
              <div className="summary-water-header">
                <div className="summary-water-title-group">
                  <h4>Continue to Module 02: Water</h4>
                  <p>Explore the next vital natural resource in our ecosystem.</p>
                </div>
                <div className="summary-water-droplet-badge">
                  <Droplet size={20} fill="#0284c7" color="#0284c7" />
                </div>
              </div>

              <Magnetic className="summary-water-mag">
              <Link to="/module/water" className="summary-water-go-btn">
                <span>Go to Module 02</span>
                <ArrowRight size={15} />
              </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* ─── 3. Bottom Nav Bar ─── */}
        <div className="summary-bottom-nav">
          <button
            type="button"
            className="summary-prev-btn"
            onClick={onPrev}
            title="Return to Chapter 14: Sustainable Land-Use Planning"
          >
            <div className="summary-prev-circle">
              <ArrowLeft size={16} />
            </div>
            <div className="summary-prev-labels">
              <span className="summary-prev-label-title">Previous</span>
              <span className="summary-prev-label-sub">
                Sustainable Land-Use Planning
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
