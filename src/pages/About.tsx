import { motion, useReducedMotion } from 'framer-motion';
import {
  Github,
  Youtube,
  Linkedin,
  Mail,
  Layers,
  Droplet,
  Wind,
  Trees,
  Globe,
  Sparkles,
  Database,
  BarChart3,
  Trophy,
  ArrowUpRight,
} from 'lucide-react';

const domains = [
  { icon: Layers, name: 'Land', accent: '#C9A15A', line: 'Soils, forests, mountains & minerals — the ground beneath everything.' },
  { icon: Droplet, name: 'Water', accent: '#4FA3C7', line: 'Rivers, oceans & groundwater — the circulatory system of the biosphere.' },
  { icon: Wind, name: 'Air', accent: '#9FB8C4', line: 'The thin protective shell of atmosphere that we breathe.' },
  { icon: Trees, name: 'Biodiversity', accent: '#6FA96B', line: 'Genes, species & ecosystems woven into a four-billion-year web.' },
  { icon: Globe, name: 'Global Warming & EIA', accent: '#D8703F', line: 'Radiative balance, greenhouse kinetics & impact assessment.' },
];

const stack = ['React', 'Vite', 'TypeScript', 'Framer Motion', 'Three.js', 'Lenis', 'Tailwind CSS'];

const skills = ['SQL', 'Python', 'Excel', 'Power BI', 'Data Cleaning', 'Exploratory Analysis', 'Statistical Testing', 'Dashboard Reporting'];

const highlights = [
  { icon: Database, text: 'Cleaned & analysed a 298,780-record logistics dataset to isolate delay drivers.' },
  { icon: BarChart3, text: 'Built a 10-year, 2,240-question trend & weightage analysis.' },
  { icon: Trophy, text: 'National hackathon achiever seeking a Data Analyst internship.' },
];

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/mujju-212' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@mujjumn3615' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mujutaba-mn/' },
];

const rise = (reduced: boolean | null, delay = 0) => ({
  initial: reduced ? false : { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function About() {
  const reduced = useReducedMotion();

  return (
    <main className="about-page" id="main-content">
      {/* ─── HERO ─── */}
      <section className="about-hero">
        <div className="about-hero-glow" aria-hidden="true" />
        <motion.div className="about-hero-inner" {...rise(reduced)}>
          <span className="about-eyebrow">[ ABOUT ] THE PROJECT & ITS MAKER</span>
          <h1 className="about-title">
            A field guide to the
            <br />
            planet we <em>call home.</em>
          </h1>
          <p className="about-lead">
            TERRA is an interactive learning experience for <strong>BCV755B — Conservation of Natural
            Resources</strong>. It turns a conventional syllabus into a cinematic, scroll-driven
            exhibit: five resource worlds, real course data, and motion that explains rather than
            decorates.
          </p>
        </motion.div>
      </section>

      {/* ─── MISSION / WHAT THIS IS ─── */}
      <section className="about-section">
        <motion.div className="about-grid" {...rise(reduced)}>
          <div className="about-col-label">
            <span className="about-tag-code">[ 01 ] WHAT THIS IS</span>
          </div>
          <div className="about-col-body">
            <h2 className="about-h2">Not a textbook. An exhibit.</h2>
            <p className="about-p">
              Most course material is read. TERRA is <em>explored</em>. Each of the five natural-resource
              domains is presented as its own world — with real figures drawn from the syllabus, layered
              visuals, and interactions that make cause-and-effect visible.
            </p>
            <p className="about-p">
              The design language borrows from a science museum's flagship digital exhibit: a dark,
              immersive canvas, editorial serif typography, one accent colour at a time, and intentional
              physics-based motion. Every element earns its place.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── THE FIVE DOMAINS ─── */}
      <section className="about-section">
        <motion.div className="about-grid" {...rise(reduced)}>
          <div className="about-col-label">
            <span className="about-tag-code">[ 02 ] WHAT YOU'LL EXPLORE</span>
          </div>
          <div className="about-col-body">
            <div className="about-domain-list">
              {domains.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={d.name}
                    className="about-domain-row"
                    style={{ '--row-accent': d.accent } as React.CSSProperties}
                    initial={reduced ? false : { opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="about-domain-num">0{i + 1}</span>
                    <span className="about-domain-icon"><Icon size={15} /></span>
                    <span className="about-domain-name">{d.name}</span>
                    <span className="about-domain-line">{d.line}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── BUILT WITH ─── */}
      <section className="about-section">
        <motion.div className="about-grid" {...rise(reduced)}>
          <div className="about-col-label">
            <span className="about-tag-code">[ 03 ] BUILT WITH</span>
          </div>
          <div className="about-col-body">
            <p className="about-p">
              A modern, performance-minded front-end stack. Scroll choreography is driven by
              Framer&nbsp;Motion and Lenis; the hero planet is rendered procedurally with Three.js — no
              heavy downloaded models.
            </p>
            <div className="about-stack-row">
              {stack.map((s) => (
                <span key={s} className="about-stack-chip">{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── DEVELOPER ─── */}
      <section className="about-section about-dev-section">
        <motion.div className="about-grid" {...rise(reduced)}>
          <div className="about-col-label">
            <span className="about-tag-code">[ 04 ] THE DEVELOPER</span>
          </div>
          <div className="about-col-body">
            <div className="about-dev-card">
              <div className="about-dev-head">
                <div className="about-dev-avatar" aria-hidden="true">MN</div>
                <div className="about-dev-id">
                  <h2 className="about-dev-name">Mujutaba M N</h2>
                  <span className="about-dev-role">
                    Final-year Information Science Undergraduate · Data Analyst
                  </span>
                </div>
                <div className="about-dev-socials">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        className="about-social-btn"
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        title={s.label}
                      >
                        <Icon size={14} />
                        <ArrowUpRight size={10} className="about-social-ext" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <p className="about-dev-bio">
                Final-year Information Science undergraduate with hands-on experience in SQL, Python,
                Excel, and Power BI. Cleaned and analysed a 298,780-record logistics dataset to isolate
                delay drivers, and built a 10-year, 2,240-question trend and weightage analysis.
                Comfortable across the full analyst workflow — data cleaning, exploratory analysis,
                statistical testing, and dashboard reporting. National hackathon achiever seeking a Data
                Analyst internship.
              </p>

              <div className="about-dev-highlights">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.text} className="about-highlight-item">
                      <span className="about-highlight-icon"><Icon size={14} /></span>
                      <span>{h.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="about-skill-wrap">
                <span className="about-skill-label">CORE TOOLKIT</span>
                <div className="about-stack-row">
                  {skills.map((s) => (
                    <span key={s} className="about-stack-chip">{s}</span>
                  ))}
                </div>
              </div>

              <a className="about-contact-row" href="mailto:?subject=TERRA%20—%20Conservation%20of%20Natural%20Resources">
                <Mail size={13} />
                <span>Open to collaborations & Data Analyst opportunities</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── CLOSING ─── */}
      <section className="about-closing">
        <motion.div {...rise(reduced)}>
          <Sparkles size={16} className="about-closing-icon" />
          <p className="about-closing-line">
            Knowledge today. A brighter tomorrow.
          </p>
          <span className="about-closing-course">
            BCV755B · Conservation of Natural Resources · An academic project by Mujutaba M N
          </span>
        </motion.div>
      </section>
    </main>
  );
}
