import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { modules } from '../content';

/**
 * A 5-card strip of every module so a reader can jump straight to any other
 * world from inside a module page. The module currently being read is flagged
 * and not linked.
 */
export default function ModuleCardsStrip({ currentSlug }: { currentSlug: string }) {
  const reduced = useReducedMotion();

  return (
    <section className="module-strip" aria-label="Explore the other modules">
      <div className="module-strip-head">
        <span className="module-strip-eyebrow">[ KEEP EXPLORING ]</span>
        <h2 className="module-strip-title">
          Five systems. <em>One connected planet.</em>
        </h2>
        <p className="module-strip-sub">
          Jump to any other world in the field guide.
        </p>
      </div>

      <div className="module-strip-grid">
        {modules.map((mod, i) => {
          const isCurrent = mod.slug === currentSlug;
          return (
            <motion.div
              key={mod.slug}
              className="module-strip-cell"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {isCurrent ? (
                <div
                  className="module-strip-card is-current"
                  style={{ '--card-accent': mod.accent } as React.CSSProperties}
                  aria-current="page"
                >
                  <div className="module-strip-bg" style={{ backgroundImage: `url(${mod.image})` }} />
                  <div className="module-strip-overlay" />
                  <span className="module-strip-num">[ 0{mod.id} ]</span>
                  <strong className="module-strip-name">{mod.shortName}</strong>
                  <span className="module-strip-tag">{mod.tagline}</span>
                  <span className="module-strip-here">YOU ARE HERE</span>
                </div>
              ) : (
                <Link
                  to={`/module/${mod.slug}`}
                  className="module-strip-card"
                  style={{ '--card-accent': mod.accent } as React.CSSProperties}
                >
                  <div className="module-strip-bg" style={{ backgroundImage: `url(${mod.image})` }} />
                  <div className="module-strip-overlay" />
                  <span className="module-strip-num">[ 0{mod.id} ]</span>
                  <strong className="module-strip-name">{mod.shortName}</strong>
                  <span className="module-strip-tag">{mod.tagline}</span>
                  <span className="module-strip-arrow">
                    <ArrowRight size={13} />
                  </span>
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
