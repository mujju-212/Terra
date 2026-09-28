import type { ModuleContent } from '../../content/types';
import ChapterVisual from '../../visuals/ChapterVisual';
import { waterChaptersNav } from './waterData';

interface WaterCurriculumChaptersProps {
  module: ModuleContent;
}

export function WaterCurriculumChapters({ module }: WaterCurriculumChaptersProps) {
  return (
        <div className="water-chapters-container">
          {module.chapters.slice(6).map((chapter, index) => {
            const navMeta = waterChaptersNav[index + 7];
            return (
              <section
                key={chapter.id}
                id={chapter.id}
                className="chapter-section chapter-water"
                style={{ scrollMarginTop: '90px' }}
              >
                <div className="chapter-number-column">
                  <span className="chapter-index">{navMeta?.num ?? String(index + 4).padStart(2, '0')}</span>
                  <span className="chapter-rule" />
                  <span className="chapter-part-vertical">{chapter.part}</span>
                </div>

                <div className="chapter-layout">
                  <div className="chapter-copy">
                    <div className="chapter-kicker">
                      <span>{chapter.part}</span>
                      <span>WATER / {navMeta?.num ?? String(index + 4).padStart(2, '0')}</span>
                    </div>
                    <h2>{chapter.title}</h2>
                    <p className="chapter-deck">{chapter.deck}</p>

                    {chapter.facts && chapter.facts.length > 0 && (
                      <div className="chapter-facts">
                        {chapter.facts.map((fact) => (
                          <div key={`${fact.label}-${fact.value}`} className="chapter-fact liquid-glass">
                            <span>{fact.label}</span>
                            <strong>{fact.value}</strong>
                            {fact.note && <small>{fact.note}</small>}
                          </div>
                        ))}
                      </div>
                    )}

                    {chapter.bullets && (
                      <ul className="chapter-bullets">
                        {chapter.bullets.map((bullet) => (
                          <li key={bullet}>
                            <span className="bullet-mark" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="chapter-visual-holder" role="group" aria-label={`${chapter.title} interactive study`}>
                    <ChapterVisual module={module} chapter={chapter} />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
  );
}
