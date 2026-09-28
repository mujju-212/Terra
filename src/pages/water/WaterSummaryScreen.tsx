import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ModuleContent } from '../../content/types';
import ModuleCardsStrip from '../../components/ModuleCardsStrip';

interface WaterSummaryScreenProps {
  module: ModuleContent;
}

export function WaterSummaryScreen({ module }: WaterSummaryScreenProps) {
  return (
    <>
          <section className="module-conclusion" id="ch-summary" style={{ '--module-accent': '#4FA3C7' } as React.CSSProperties}>
            <div className="conclusion-top">
              <span>[ END OF MODULE 02 ]</span>
              <span>FIELD NOTES · BCV755B</span>
            </div>
            <p className="eyebrow">RECAP / WATER</p>
            <h2>What this system<br /><em>asks of us.</em></h2>
            <div className="recap-grid">
              {module.recap.map((fact, index) => (
                <div className="recap-card" key={`${fact.label}-${index}`}>
                  <span>0{index + 1}</span>
                  <strong>{fact.value}</strong>
                  <small>{fact.label}</small>
                </div>
              ))}
            </div>

            <div className="conclusion-actions">
              <Link className="button button-primary" to={`/quiz?module=${module.slug}`}>
                Take the Module 02 quiz <ArrowRight size={15} />
              </Link>
              <Link className="button button-ghost" to="/module/air">
                Continue to Module 03 Air <ArrowRight size={15} />
              </Link>
            </div>
          </section>

          <ModuleCardsStrip currentSlug={module.slug} />
    </>
  );
}
