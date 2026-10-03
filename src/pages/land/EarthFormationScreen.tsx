import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import InteractiveFormationGlobe from '../../three/InteractiveFormationGlobe';
import StageDetailModal from '../../components/StageDetailModal';
import { FORMATION_STAGES } from '../../data/formationStagesData';
import { TiltCard } from './motion';
import type { ScreenNavProps } from './types';

export default function EarthFormationScreen({ onPrev, onNext }: ScreenNavProps) {
  const [activeStage, setActiveStage] = useState(0);
  const [detailModalStage, setDetailModalStage] = useState<number | null>(null);

  const stages = FORMATION_STAGES;
  const currentStage = stages[activeStage] || stages[0];

  return (
    <section className="land-screen land-formation-screen" id="ch-formation">
      {/* Real Interactive 3D WebGL Formation Globe */}
      <InteractiveFormationGlobe stageIndex={activeStage} />

      <div className="land-screen-inner formation-screen-inner">
        {/* Header Block */}
        <div className="screen-header-block formation-header-block">
          <span className="screen-ch-tag">
            MODULE 01 <span>|</span> CHAPTER 01 <span>•</span> STAGE {currentStage.num} OF 06
          </span>
          <h2 className="screen-main-title">
            Earth <em>{currentStage.title}</em>
          </h2>

          {/* Dynamic Stage Timeline Badge */}
          <div className="formation-stage-time-badge">
            <span className="time-pulse-dot" />
            <span className="time-text">{currentStage.time}</span>
            <span className="time-eon">({currentStage.eon})</span>
          </div>

          <p className="screen-lead-copy">
            {currentStage.curriculumSummary}
          </p>

          {/* Dynamic Interactive Live Syllabus HUD */}
          <div className="formation-live-hud">
            <div className="live-hud-row">
              <span className="live-hud-label">Syllabus Focus:</span>
              <span className="live-hud-value">{currentStage.syllabusRef}</span>
            </div>
            <div className="live-hud-meta-tags">
              <span className="tag-item">{currentStage.thermalState}</span>
              <span className="tag-sep">•</span>
              <span className="tag-item">{currentStage.keyLayerDomain}</span>
            </div>
            <button
              type="button"
              className="live-hud-read-btn"
              onClick={() => setDetailModalStage(activeStage)}
              title={`Open comprehensive notes for Stage ${currentStage.num}`}
            >
              <BookOpen size={13} />
              <span>Inspect Stage {currentStage.num} Syllabus Notes & Exam Details</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Script accent stamp matching reference image */}
          <div className="formation-script-stamp" aria-hidden="true">
            <span>From</span>
            <span>Dust to</span>
            <span>Home.</span>
          </div>
        </div>

        {/* 6-Stage Horizontal Interactive Timeline Node Track with Miniature 3D Spheres */}
        <div className="formation-timeline-track">
          <div className="timeline-connecting-line" />
          <div className="timeline-nodes-row">
            {stages.map((stg, i) => {
              const isSelected = activeStage === i;
              return (
                <button
                  type="button"
                  key={stg.id}
                  className={`timeline-node-bead ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => {
                    setActiveStage(i);
                  }}
                  aria-label={`Jump to stage ${stg.num}: ${stg.title}`}
                >
                  <div className="timeline-sphere-orb-wrap">
                    <div
                      className="timeline-sphere-orb"
                      style={{ backgroundImage: `url('${stg.thumb}')` }}
                    />
                    {isSelected && <span className="timeline-orb-active-ring" />}
                  </div>
                  <div className="node-meta">
                    <span className="node-step-num">{stg.num}</span>
                    <strong className="node-step-title">{stg.title}</strong>
                    <span className="node-step-time">({stg.time})</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Bottom Interactive Cards */}
        <div className="formation-cards-row">
          {stages.map((stg, i) => {
            const isSelected = activeStage === i;
            return (
              <TiltCard
                key={stg.id}
                className={`formation-card-item ${isSelected ? 'is-active-card' : ''}`}
                onClick={() => {
                  if (activeStage === i) {
                    setDetailModalStage(i);
                  } else {
                    setActiveStage(i);
                  }
                }}
                role="button"
                tabIndex={0}
                title={isSelected ? "Click again to read full notes" : `Select Stage ${stg.num}`}
              >
                <div
                  className="formation-card-thumb kenburns-bg"
                  style={{ backgroundImage: `url('${stg.thumb}')` }}
                />
                <div className="formation-card-body">
                  <span className="formation-card-num">{stg.num}</span>
                  <h4 className="formation-card-title">{stg.title}</h4>
                  <p className="formation-card-desc">{stg.desc}</p>
                  <button
                    type="button"
                    className="formation-learn-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStage(i);
                      setDetailModalStage(i);
                    }}
                    title="Read detailed syllabus notes from Module 1"
                  >
                    <BookOpen size={11} strokeWidth={2} />
                    <span>Read Notes & QA</span>
                    <ArrowRight size={11} strokeWidth={2} />
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="formation-bottom-bar">
          <button type="button" className="formation-bar-pill prev-pill" onClick={onPrev}>
            <div className="bar-arrow-circ">
              <ArrowLeft size={15} />
            </div>
            <div className="bar-pill-text">
              <span className="bar-action-sub">Previous</span>
              <span className="bar-title-sub">Module Overview</span>
            </div>
          </button>

          <div className="formation-bar-dots">
            {stages.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`bar-dot ${activeStage === i ? 'is-active' : ''}`}
                onClick={() => setActiveStage(i)}
                aria-label={`Jump to stage ${i + 1}`}
              />
            ))}
          </div>

          <button type="button" className="formation-bar-pill next-pill" onClick={onNext}>
            <div className="bar-pill-text">
              <span className="bar-action-sub">Next</span>
              <span className="bar-title-sub">Earth Layers</span>
            </div>
            <div className="bar-arrow-circ">
              <ArrowRight size={15} />
            </div>
          </button>
        </div>
      </div>

      {/* Comprehensive Stage Syllabus Reader Modal */}
      {detailModalStage !== null && (
        <StageDetailModal
          stage={stages[detailModalStage]}
          stageIndex={detailModalStage}
          allStages={stages}
          isOpen={detailModalStage !== null}
          onClose={() => setDetailModalStage(null)}
          onSelectStage={(newIdx) => {
            setActiveStage(newIdx);
            setDetailModalStage(newIdx);
          }}
        />
      )}
    </section>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SCREEN 03: EARTH LAYERS CUTAWAY COMPONENT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
