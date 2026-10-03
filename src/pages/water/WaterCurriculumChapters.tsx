import type { ModuleContent } from '../../content/types';
import ChapterVisual from '../../visuals/ChapterVisual';
import { waterChaptersNav } from './waterData';

interface WaterCurriculumChaptersProps {
  module: ModuleContent;
  chapterIds?: string[];
}

export function WaterCurriculumChapters({ module, chapterIds }: WaterCurriculumChaptersProps) {
  return (
        <div className="water-chapters-container">
          {module.chapters
            .filter((chapter) => {
              if (chapterIds && chapterIds.length > 0) {
                return chapterIds.includes(chapter.id);
              }
              return (
                chapter.id !== 'ch-11' &&
                chapter.id !== 'ch-12' &&
                chapter.id !== 'ch-13' &&
                chapter.id !== 'ch-14' &&
                chapter.id !== 'ch-15' &&
                chapter.id !== 'ch-16' &&
                Number(chapter.id.replace('ch-', '')) >= 11
              );
            })
            .map((chapter, index) => {
            const navMeta = waterChaptersNav.find((n) => n.id === chapter.id);
            return (
              <section
                key={chapter.id}
                id={chapter.id}
                className="chapter-section chapter-water"
                style={{ scrollMarginTop: '90px' }}
              >
                <div className="chapter-number-column">
                  <span className="chapter-index">{navMeta?.num ?? String(index + 13).padStart(2, '0')}</span>
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
