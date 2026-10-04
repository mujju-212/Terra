import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ChevronRight, List, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Chapter, ModuleContent } from '../content/types';
import ChapterVisual from '../visuals/ChapterVisual';
import ModuleCardsStrip from '../components/ModuleCardsStrip';
import MobileChapterBar from '../components/MobileChapterBar';

function useNearViewport() {
  const [visible, setVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!element || visible) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '180px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, visible]);
  return { visible, setElement };
}

function LazyChapterVisual({ module, chapter, index }: { module: ModuleContent; chapter: Chapter; index: number }) {
  const { visible, setElement } = useNearViewport();
  return <div ref={setElement} className="chapter-visual-holder" role="group" aria-label={`${chapter.title} interactive figure`}>
    {visible ? <ChapterVisual module={module} chapter={chapter} /> : <div className="visual-placeholder"><span className="placeholder-orbit" /><span>FIGURE {String(module.id).padStart(2, '0')}.{String(index + 1).padStart(2, '0')}</span><small>Scroll into view to load interactive study</small></div>}
  </div>;
}

function ChapterSection({ module, chapter, index }: { module: ModuleContent; chapter: Chapter; index: number }) {
  const reduced = useReducedMotion();
  const eia = module.slug === 'warming' && index >= 7;
  const layer = module.slug === 'warming' && index >= 7 ? 'eia' : 'core';
  return <motion.section
    id={chapter.id}
    className={`chapter-section chapter-${module.slug} ${index % 2 ? 'chapter-reverse' : ''} ${eia ? 'chapter-eia' : ''}`}
    data-chapter-section="true"
    data-act={layer}
    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reduced ? 0.15 : 0.72, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="chapter-number-column"><span className="chapter-index">{String(index + 1).padStart(2, '0')}</span><span className="chapter-rule" /><span className="chapter-part-vertical">{chapter.part}</span></div>
    <div className="chapter-layout">
      <div className="chapter-copy">
        <div className="chapter-kicker"><span>{chapter.part}</span><span>{module.shortName} / {String(index + 1).padStart(2, '0')}</span></div>
        <h2>{chapter.title}</h2>
        <p className="chapter-deck">{chapter.deck}</p>
        {chapter.quote && <blockquote className="chapter-quote">“{chapter.quote}”</blockquote>}
        {chapter.facts && chapter.facts.length > 0 && <div className="chapter-facts">{chapter.facts.map((fact) => <div key={`${fact.label}-${fact.value}`} className="chapter-fact liquid-glass"><span>{fact.label}</span><strong>{fact.value}</strong>{fact.note && <small>{fact.note}</small>}</div>)}</div>}
        {chapter.bullets && <ul className="chapter-bullets">{chapter.bullets.map((bullet) => <li key={bullet}><span className="bullet-mark" />{bullet}</li>)}</ul>}
        <a className="chapter-backlink" href={`#${chapter.id === 'ch-01' ? 'module-cover' : module.chapters[index - 1]?.id ?? 'module-cover'}`}><ArrowLeft size={13} /> Previous field note</a>
      </div>
      <LazyChapterVisual module={module} chapter={chapter} index={index} />
    </div>
  </motion.section>;
}

function ChapterRail({ module, active, onSelect }: { module: ModuleContent; active: number; onSelect: (index: number) => void }) {
  const railLabel = module.slug === 'land' ? 'DEPTH / CHAPTER' : module.slug === 'water' ? 'WATER LEVEL' : module.slug === 'air' ? 'AQI / HAZE' : module.slug === 'biodiversity' ? 'LIVING WEB' : active >= 7 ? 'EIA PHASE' : 'GLOBAL TEMPERATURE';
  return <aside className="chapter-rail" aria-label="Chapter navigation">
    <div className="rail-sticky"><div className="rail-progress-label"><span>{railLabel}</span><strong>{String(active + 1).padStart(2, '0')}<small> / {String(module.chapters.length).padStart(2, '0')}</small></strong></div>
      <div className="rail-meter"><span style={{ height: `${((active + 1) / module.chapters.length) * 100}%` }} /></div>
      <nav className="rail-chapters">{module.chapters.map((chapter, index) => <button type="button" key={chapter.id} className={active === index ? 'selected' : ''} aria-current={active === index ? 'step' : undefined} onClick={() => onSelect(index)}><span>{String(index + 1).padStart(2, '0')}</span><small>{chapter.title}</small></button>)}</nav>
      <Link to="/#modules" className="rail-return"><ArrowLeft size={13} /> All worlds</Link>
    </div>
  </aside>;
}

function ModuleCover({ module }: { module: ModuleContent }) {
  return <section className={`module-cover module-cover-${module.slug}`} id="module-cover" style={{ '--module-accent': module.accent } as React.CSSProperties}>
    <div className="module-cover-image" style={{ backgroundImage: `url(${module.image})` }} />
    <div className="module-cover-grid" />
    <div className="module-cover-copy"><p className="eyebrow">CONSERVATION OF NATURAL RESOURCES · BCV755B</p><span className="module-overline">MODULE 0{module.id} / FIELD EXPERIENCE</span><h1>{module.name === 'Biodiversity & Ecosystem' ? <>Biodiversity<br /><em>&amp; Ecosystem</em></> : module.slug === 'warming' ? <>Global Warming<br /><em>&amp; EIA</em></> : <>{module.name}<em>.</em></>}</h1><p className="module-cover-subtitle">{module.tagline} <span>{module.subtitle}</span></p><div className="module-cover-meta"><span>{String(module.chapters.length).padStart(2, '0')} CHAPTERS</span><span>CURRICULUM · BCV755B</span><a href={module.noteFile} download>{module.noteLabel} <ArrowUpRight size={13} /></a></div></div>
    <div className="module-cover-graphic" aria-hidden="true"><div className="cover-orbit orbit-a" /><div className="cover-orbit orbit-b" /><div className="cover-orbit orbit-c" /><div className="cover-core"><span>0{module.id}</span></div><span className="cover-graphic-label">{module.shortName}<br />FIELD STUDY</span></div>
    <div className="module-cover-footer"><span>SCROLL TO BEGIN</span><ArrowDown size={14} /><span>{module.shortName} / 01—{String(module.chapters.length).padStart(2, '0')}</span></div>
  </section>;
}

function ModuleConclusion({ module }: { module: ModuleContent }) {
  return <section className="module-conclusion" style={{ '--module-accent': module.accent } as React.CSSProperties}>
    <div className="conclusion-top"><span>[ END OF MODULE 0{module.id} ]</span><span>FIELD NOTES · BCV755B</span></div>
    <p className="eyebrow">RECAP / {module.shortName}</p>
    <h2>What this system<br /><em>asks of us.</em></h2>
    <div className="recap-grid">{module.recap.map((fact, index) => <div className="recap-card" key={`${fact.label}-${index}`}><span>0{index + 1}</span><strong>{fact.value}</strong><small>{fact.label}</small></div>)}</div>
    <p className="source-note"><BookOpen size={15} /> Figures and summaries follow the supplied BCV755B notes. Open the original module notes for the full syllabus text.</p>
    <div className="conclusion-actions"><Link className="button button-primary" to={`/quiz?module=${module.slug}`}>Take the Module 0{module.id} quiz <ArrowUpRight size={15} /></Link>{module.next ? <Link className="button button-ghost" to={`/module/${module.next.slug}`}>Continue to {module.next.name} <ArrowRight size={15} /></Link> : <Link className="button button-ghost" to="/#modules">Back to all modules <ArrowRight size={15} /></Link>}</div>
    <div className="conclusion-note-download"><a href={module.noteFile} download><BookOpen size={14} /> Download full source notes <ArrowUpRight size={12} /></a></div>
  </section>;
}

import { lazy, Suspense } from 'react';

// ── Lazy-loaded module experiences ───────────────────────────────────────────
// Each experience is its own chunk (~300-500 KB JS + CSS), loaded ONLY when
// the user navigates to that specific module route.
const LandModuleExperience  = lazy(() => import('./LandModuleExperience'));
const WaterModuleExperience = lazy(() => import('./WaterModuleExperience'));
const AirModuleExperience   = lazy(() => import('./AirModuleExperience'));
const BioModuleExperience   = lazy(() => import('./BioModuleExperience'));
const WarmingModuleExperience = lazy(() => import('./WarmingModuleExperience'));

function ModuleExperienceShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="module-experience-loading" role="status" aria-live="polite">
          <span className="loading-orbit" />
          <span>Loading module…</span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default function ModulePage({ module }: { module: ModuleContent }) {
  if (module.slug === 'land') {
    return (
      <ModuleExperienceShell>
        <LandModuleExperience module={module} />
      </ModuleExperienceShell>
    );
  }
  if (module.slug === 'water') {
    return (
      <ModuleExperienceShell>
        <WaterModuleExperience module={module} />
      </ModuleExperienceShell>
    );
  }
  if (module.slug === 'air') {
    return (
      <ModuleExperienceShell>
        <AirModuleExperience module={module} />
      </ModuleExperienceShell>
    );
  }
  if (module.slug === 'biodiversity') {
    return (
      <ModuleExperienceShell>
        <BioModuleExperience module={module} />
      </ModuleExperienceShell>
    );
  }
  if (module.slug === 'warming') {
    return (
      <ModuleExperienceShell>
        <WarmingModuleExperience module={module} />
      </ModuleExperienceShell>
    );
  }


  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const chapters = module.chapters;
  const chapterIds = useMemo(() => chapters.map((chapter) => chapter.id), [chapters]);
  useEffect(() => { setActive(0); }, [module.slug]);
  const selectChapter = (index: number) => {
    setActive(index);
    document.getElementById(chapterIds[index])?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };
  useEffect(() => {
    const nodes = chapterIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (current) {
        const index = chapterIds.indexOf(current.target.id);
        if (index >= 0) setActive(index);
      }
    }, { rootMargin: '-22% 0px -60% 0px', threshold: 0 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [chapterIds]);

  return <main id="main-content" className={`module-page module-${module.slug}`} style={{ '--accent': module.accent, '--module-accent': module.accent } as React.CSSProperties}>
    <ModuleCover module={module} />
    <div className="module-reading-shell">
      <ChapterRail module={module} active={active} onSelect={selectChapter} />
      <div className="module-chapters">
        <div className="module-introduction"><div><span className="eyebrow">FIELD GUIDE / MODULE 0{module.id}</span><h2>{module.subtitle}</h2></div><p>Scroll to move through the material. Use the chapter rail to jump between ideas. Figures and key facts are based on the supplied course notes.</p></div>
        {chapters.map((chapter, index) => <ChapterSection key={chapter.id} module={module} chapter={chapter} index={index} />)}
        <ModuleConclusion module={module} />
      </div>
    </div>
    <ModuleCardsStrip currentSlug={module.slug} />
    <MobileChapterBar
      chapters={chapters}
      activeChapterIndex={active}
      onSelectChapter={selectChapter}
      accentColor={module.accent}
      moduleName={`Module 0${module.id}: ${module.shortName}`}
    />
  </main>;
}
