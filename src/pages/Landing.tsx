import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionValueEvent, useInView, MotionValue } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Droplet,
  Droplets,
  Wind,
  Trees,
  Mountain,
  Globe,
  Globe2,
  Leaf,
  Flame,
  GraduationCap,
  FileText,
  Video,
  BarChart3,
  Download,
  ExternalLink,
  Mail,
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Check,
  Play,
  MousePointer,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';
import CountUp from '../components/CountUp';

interface HeroWorld {
  id: string;
  code: string;
  num: string;
  title: string;
  subtitlePrefix: string;
  italicWord: string;
  desc: string;
  slug: string;
  accent: string;
  stats: { value: string; label: string; sub?: string }[];
  nextWorld: string;
  nextIndex: number;
}

const heroWorlds: HeroWorld[] = [
  {
    id: 'land',
    code: '01',
    num: '01 / 05',
    title: 'LAND',
    subtitlePrefix: 'The ground beneath',
    italicWord: 'everything.',
    desc: 'Soils, forests, mountains and minerals form the foundation of life — shaping ecosystems, economies and our future.',
    slug: 'land',
    accent: '#C9A15A',
    stats: [
      { value: '20%', label: "OF EARTH'S SURFACE" },
      { value: '4.6 BILLION', label: 'YEARS AGO', sub: 'EARTH FORMED' },
      { value: '4 LAYERS', label: 'CRUST · MANTLE', sub: 'OUTER CORE · INNER CORE' },
    ],
    nextWorld: 'WATER',
    nextIndex: 1,
  },
  {
    id: 'water',
    code: '02',
    num: '02 / 05',
    title: 'WATER',
    subtitlePrefix: 'The cradle of',
    italicWord: 'life.',
    desc: 'Rivers, oceans and groundwater form the circulatory system of our biosphere — finite, precious and irreplaceable.',
    slug: 'water',
    accent: '#4FA3C7',
    stats: [
      { value: '71%', label: 'OF EARTH IS WATER' },
      { value: '97.5%', label: 'SALTWATER', sub: 'ONLY 2.5% FRESHWATER' },
      { value: '4,000 km³', label: 'ANNUAL PRECIPITATION', sub: 'IN INDIA' },
    ],
    nextWorld: 'AIR',
    nextIndex: 2,
  },
  {
    id: 'air',
    code: '03',
    num: '03 / 05',
    title: 'AIR',
    subtitlePrefix: 'The thin shell we',
    italicWord: 'breathe.',
    desc: 'Atmosphere, particulate dispersion and photochemical reactions protecting life from cosmic solar radiation.',
    slug: 'air',
    accent: '#9FB8C4',
    stats: [
      { value: '78.084%', label: 'NITROGEN (N₂)', sub: 'PRIMARY CARRIER' },
      { value: '20.946%', label: 'OXYGEN (O₂)', sub: 'RESPIRATION GAS' },
      { value: '5 LAYERS', label: 'TROPO · STRATO · MESO', sub: 'THERMO · EXOSPHERE' },
    ],
    nextWorld: 'BIODIVERSITY',
    nextIndex: 3,
  },
  {
    id: 'biodiversity',
    code: '04',
    num: '04 / 05',
    title: 'BIODIVERSITY',
    subtitlePrefix: 'The web of living',
    italicWord: 'things.',
    desc: 'Genes, species, ecosystems and ecological niches interlocked into an irreplaceable four-billion-year web.',
    slug: 'biodiversity',
    accent: '#6FA96B',
    stats: [
      { value: '8.7M', label: 'ESTIMATED SPECIES', sub: 'AND COUNTING' },
      { value: '3 LEVELS', label: 'GENETIC · SPECIES', sub: 'ECOSYSTEM RICHNESS' },
      { value: '36', label: 'GLOBAL HOTSPOTS', sub: '4 IN INDIA' },
    ],
    nextWorld: 'GLOBAL WARMING & EIA',
    nextIndex: 4,
  },
  {
    id: 'warming',
    code: '05',
    num: '05 / 05',
    title: 'GLOBAL WARMING',
    subtitlePrefix: 'A balance under',
    italicWord: 'stress.',
    desc: 'Radiative forcing, greenhouse kinetics and Environmental Impact Assessment framework for sustainable survival.',
    slug: 'warming',
    accent: '#D8703F',
    stats: [
      { value: '30%', label: 'REFLECTED SUNLIGHT', sub: 'PLANETARY ALBEDO' },
      { value: '70%', label: 'ABSORBED HEAT', sub: 'THERMAL BALANCE' },
      { value: '+1.5°C', label: 'CRITICAL THRESHOLD', sub: 'PARIS CLIMATE LIMIT' },
    ],
    nextWorld: 'LAND',
    nextIndex: 0,
  },
];

interface RevealWordItem {
  text: string;
  isHighlight?: boolean;
  isItalic?: boolean;
}

const motivationHeadlineWords: RevealWordItem[] = [
  { text: 'Land,' },
  { text: 'water,' },
  { text: 'air,' },
  { text: 'and' },
  { text: 'life' },
  { text: 'took' },
  { text: 'four' },
  { text: 'and' },
  { text: 'a' },
  { text: 'half' },
  { text: 'billion' },
  { text: 'years' },
  { text: 'to' },
  { text: 'reach' },
  { text: 'this' },
  { text: 'fragile', isHighlight: true, isItalic: true },
  { text: 'balance.', isHighlight: true, isItalic: true },
];

const motivationSubWords: RevealWordItem[] = [
  { text: 'This' },
  { text: 'is' },
  { text: 'a' },
  { text: 'field' },
  { text: 'guide' },
  { text: 'to' },
  { text: 'the' },
  { text: 'systems' },
  { text: 'that' },
  { text: 'sustain' },
  { text: 'us' },
  { text: '—' },
  { text: 'and' },
  { text: 'a' },
  { text: 'record' },
  { text: 'of' },
  { text: 'what' },
  { text: 'we' },
  { text: 'stand' },
  { text: 'to' },
  { text: 'lose.' },
];

interface AnimatedWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlight?: boolean;
  isItalic?: boolean;
  dimOpacity?: number;
  brightOpacity?: number;
}

function AnimatedWord({
  word,
  progress,
  range,
  isHighlight,
  isItalic,
  dimOpacity = 0.18,
  brightOpacity = 1,
}: AnimatedWordProps) {
  const opacity = useTransform(progress, range, [dimOpacity, brightOpacity]);
  const y = useTransform(progress, range, [6, 0]);
  const color = isHighlight
    ? useTransform(progress, range, ['rgba(222, 184, 122, 0.22)', '#deb87a'])
    : useTransform(progress, range, ['rgba(255, 255, 255, 0.22)', '#fdfbf7']);

  const shadow = isHighlight
    ? useTransform(
        progress,
        range,
        ['0 0 0px rgba(222, 184, 122, 0)', '0 0 24px rgba(222, 184, 122, 0.45)']
      )
    : useTransform(
        progress,
        range,
        ['0 0 0px rgba(255, 255, 255, 0)', '0 2px 14px rgba(0, 0, 0, 0.6)']
      );

  return (
    <motion.span
      className={`scroll-word ${isHighlight ? 'is-highlight' : ''}`}
      style={{
        opacity,
        y,
        color,
        textShadow: shadow,
        display: 'inline-block',
        marginRight: '0.24em',
      }}
    >
      {isItalic ? <em>{word}</em> : word}
    </motion.span>
  );
}

function StaticWord({
  word,
  isHighlight,
  isItalic,
}: {
  word: string;
  isHighlight?: boolean;
  isItalic?: boolean;
}) {
  return (
    <span
      className={`scroll-word ${isHighlight ? 'is-highlight' : ''}`}
      style={{
        display: 'inline-block',
        marginRight: '0.24em',
        color: isHighlight ? '#deb87a' : '#fdfbf7',
        opacity: 1,
      }}
    >
      {isItalic ? <em>{word}</em> : word}
    </span>
  );
}

/**
 * Line-mask "rise out of the mask" reveal for big editorial headings.
 * IMPORTANT: the IntersectionObserver is attached to the OUTER mask (which is
 * never clipped), NOT the translated child. Observing the child directly would
 * report zero intersection while it sits fully clipped inside overflow:hidden,
 * so whileInView would never fire and the heading would stay hidden forever.
 */
function MaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <div ref={ref} className="heading-rise-mask">
      <motion.div
        initial={reduced ? false : { y: '110%' }}
        animate={inView ? { y: 0 } : undefined}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const howResources = [
  { name: 'Land', icon: Mountain },
  { name: 'Water', icon: Droplet },
  { name: 'Air', icon: Wind },
  { name: 'Biodiversity', icon: Trees },
  { name: 'Global Warming', icon: Globe },
];

export default function Landing() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeHeroWorldIndex, setActiveHeroWorldIndex] = useState(0);
  const [isMotivationActive, setIsMotivationActive] = useState(false);
  const [metricsStarted, setMetricsStarted] = useState(false);
  const [selectedHowResource, setSelectedHowResource] = useState(0);
  const reduced = useReducedMotion();

  const universeRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLElement>(null);
  const howRef = useRef<HTMLElement>(null);
  const beginRef = useRef<HTMLElement>(null);
  const { scrollYProgress: universeProgress } = useScroll({
    target: universeRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(universeProgress, 'change', (latest) => {
    setIsMotivationActive(latest >= 0.26);
    setMetricsStarted(latest >= 0.78);
  });

  // Hero layer: fades out and slides up as user scrolls
  const heroOpacity = useTransform(universeProgress, [0.08, 0.24], [1, 0]);
  const heroY = useTransform(universeProgress, [0.08, 0.24], [0, -45]);

  // Shared background dynamics
  const earthScale = useTransform(universeProgress, [0, 0.9], [1, 1.05]);
  const scrimOpacity = useTransform(universeProgress, [0.15, 0.35], [0, 0.45]);

  // Motivation stage layer: fades in and slides up into place
  const motivationStageOpacity = useTransform(universeProgress, [0.24, 0.35], [0, 1]);
  const motivationStageY = useTransform(universeProgress, [0.24, 0.35], [30, 0]);

  // Motivation metrics bar: fades in at the end of word scrub
  const metricsOpacity = useTransform(universeProgress, [0.72, 0.88], [0, 1]);
  const metricsY = useTransform(universeProgress, [0.72, 0.88], [24, 0]);

  // Live scroll progress width
  const progressWidth = useTransform(universeProgress, [0.28, 0.95], ['0%', '100%']);

  // ─── Continuous scroll-scrubbed parallax for the lower sections ───
  // Each backdrop layer drifts against the scroll direction as its section
  // travels through the viewport, giving every section depth (not just fades).
  const { scrollYProgress: modulesProgress } = useScroll({
    target: modulesRef,
    offset: ['start end', 'end start'],
  });
  const modulesParallax = useTransform(modulesProgress, [0, 1], ['-7%', '7%']);

  const { scrollYProgress: howProgress } = useScroll({
    target: howRef,
    offset: ['start end', 'end start'],
  });
  const howArcParallax = useTransform(howProgress, [0, 1], ['5%', '-5%']);
  const howLandParallax = useTransform(howProgress, [0, 1], ['-4%', '4%']);

  const { scrollYProgress: beginProgress } = useScroll({
    target: beginRef,
    offset: ['start end', 'end start'],
  });
  const beginParallax = useTransform(beginProgress, [0, 1], ['-6%', '6%']);

  const currentHeroWorld = heroWorlds[activeHeroWorldIndex];

  const scrollToSection = (id: string) => {
    const lenis = window.__lenis;
    const useLenis = Boolean(lenis) && !reduced;
    if (id === 'about' && universeRef.current) {
      const rect = universeRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetOffset = scrollTop + rect.top + universeRef.current.offsetHeight * 0.48;
      if (useLenis) lenis!.scrollTo(targetOffset, { duration: 1.2 });
      else window.scrollTo({ top: targetOffset, behavior: 'auto' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (useLenis) lenis!.scrollTo(el, { offset: -24, duration: 1.2 });
    else el.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <main className="landing-masterpiece" id="main-content">
      {/* ─── 01: PRELOADER (Minimal Initialization) ─── */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/* ─── UNIFIED HERO & MOTIVATION SCROLLYTELLING UNIVERSE (Shared Earth Background) ─── */}
      <section
        ref={universeRef}
        className={`hero-motivation-universe ${reduced ? 'is-reduced-motion' : ''}`}
        aria-label="The Resource Portal & Why This Matters"
      >
        {/* Navigation Anchors for In-Page Navigation */}
        <div id="hero" className="universe-anchor-target" style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, pointerEvents: 'none' }} />
        <div id="about" className="universe-anchor-target" style={{ position: 'absolute', top: '48%', left: 0, width: 1, height: 1, pointerEvents: 'none' }} />

        {/* Sticky 100vh Viewport Stage */}
        <div className="universe-sticky-stage">
          {/* THE SINGLE SHARED CONTINUOUS EARTH BACKDROP — NEVER DUPLICATED */}
          <div className="universe-shared-backdrop">
            <motion.div
              className="hero-photoreal-bg"
              style={reduced ? undefined : { scale: earthScale }}
            />
            <div className="hero-sun-burst-accent" />
            <motion.div
              className="universe-scrim-blend"
              style={reduced ? undefined : { opacity: scrimOpacity }}
            />
          </div>

          {/* ─── LAYER 1: HERO CONTENT (Fades out and moves up as you scroll) ─── */}
          <motion.div
            className="universe-hero-layer"
            style={
              reduced
                ? undefined
                : {
                    opacity: heroOpacity,
                    y: heroY,
                    pointerEvents: isMotivationActive ? 'none' : 'auto',
                  }
            }
          >
            {/* Main Middle Row: Left Vertical Domain Rail + Left Editorial Copy */}
            <div className="hero-portal-main">
              {/* Left Vertical Domain Rail */}
              <div className="hero-vertical-rail" role="tablist" aria-label="Planetary Worlds">
                <div className="hero-rail-line" />
                {heroWorlds.map((world, idx) => {
                  const isActive = idx === activeHeroWorldIndex;
                  return (
                    <button
                      key={world.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`hero-rail-node ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveHeroWorldIndex(idx)}
                    >
                      <span className="rail-bead">
                        <span className="rail-bead-dot" />
                      </span>
                      <span>
                        {world.code} {world.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Left Editorial Block */}
              <motion.div
                className="hero-editorial-col"
                key={currentHeroWorld.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Top Kicker Category Tag */}
                <div className="hero-kicker-row">
                  <span className="hero-kicker-code">{currentHeroWorld.num}</span>
                  <span className="hero-kicker-label">THE RESOURCE PORTAL</span>
                  <span className="hero-kicker-rule" />
                </div>

                {/* Grand Serif World Title */}
                <h1 className="hero-world-title">{currentHeroWorld.title}</h1>

                {/* Subtitle with Elegant Italic Word */}
                <p className="hero-world-subtitle">
                  {currentHeroWorld.subtitlePrefix} <em>{currentHeroWorld.italicWord}</em>
                </p>

                <div className="hero-editorial-divider" />

                {/* Narrative Description */}
                <p className="hero-world-desc">{currentHeroWorld.desc}</p>

                {/* Key Metric Trio Columns */}
                <div className="hero-stat-trio">
                  {currentHeroWorld.stats.map((stat, i) => (
                    <div className="hero-stat-col" key={i}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                      {stat.sub && <small>{stat.sub}</small>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Rail: Interactive Experience · Scroll to Explore · Next World */}
            <div className="hero-portal-bottom">
              <span className="hero-bottom-left">INTERACTIVE LEARNING EXPERIENCE</span>

              <div
                className="hero-bottom-center"
                onClick={() => scrollToSection('about')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')}
              >
                <span>SCROLL TO EXPLORE</span>
                <div className="scroll-track-line" />
              </div>

              <div className="hero-bottom-right">
                <button
                  type="button"
                  className="next-world-btn"
                  onClick={() => setActiveHeroWorldIndex(currentHeroWorld.nextIndex)}
                >
                  <span>
                    <small>NEXT WORLD</small>
                    <strong>{currentHeroWorld.nextWorld}</strong>
                  </span>
                  <span className="next-world-arrow">
                    <ArrowRight size={14} />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* ─── LAYER 2: MOTIVATION CONTENT (Appears on the SAME Earth backdrop as you scroll) ─── */}
          <motion.div
            className="universe-motivation-layer"
            style={
              reduced
                ? undefined
                : {
                    opacity: motivationStageOpacity,
                    y: motivationStageY,
                    pointerEvents: isMotivationActive ? 'auto' : 'none',
                  }
            }
          >
            {/* Top Section Header Row */}
            <div className="motivation-top-header">
              <div className="motivation-section-tag">
                <span className="tag-dot" />
                <span>[ 02 ] WHY THIS MATTERS</span>
              </div>
              {!reduced && (
                <div className="motivation-scroll-status" aria-hidden="true">
                  <span className="status-label">PLANETARY EQUILIBRIUM</span>
                  <div className="status-track">
                    <motion.div className="status-indicator" style={{ width: progressWidth }} />
                  </div>
                </div>
              )}
            </div>

            {/* Left Narrative Column with Ambient Glow & Celestial Coordinates (Matching media_1790627971714.jpg) */}
            <div className="motivation-narrative-shell">
              <div className="heading-ambient-aura" aria-hidden="true" />
              <div className="heading-celestial-rings" aria-hidden="true">
                <svg viewBox="0 0 600 400" fill="none">
                  <circle cx="80" cy="180" r="260" stroke="rgba(222, 184, 122, 0.18)" strokeWidth="1" strokeDasharray="3 6" />
                  <circle cx="80" cy="180" r="200" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.8" />
                  <path d="M 0 90 Q 140 180 320 230" stroke="rgba(79, 163, 199, 0.22)" strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="280" cy="222" r="3" fill="#deb87a" />
                </svg>
              </div>

              <h2
                className="motivation-grand-headline"
                aria-label="Land, water, air, and life took four and a half billion years to reach this fragile balance."
              >
                {motivationHeadlineWords.map((item, index) => {
                  const step = (0.64 - 0.32) / motivationHeadlineWords.length;
                  const start = 0.32 + index * step;
                  const end = Math.min(0.68, start + 0.035);

                  return reduced ? (
                    <StaticWord
                      key={index}
                      word={item.text}
                      isHighlight={item.isHighlight}
                      isItalic={item.isItalic}
                    />
                  ) : (
                    <AnimatedWord
                      key={index}
                      word={item.text}
                      progress={universeProgress}
                      range={[start, end]}
                      isHighlight={item.isHighlight}
                      isItalic={item.isItalic}
                    />
                  );
                })}
              </h2>

              <p
                className="motivation-lead-sub"
                aria-label="This is a field guide to the systems that sustain us — and a record of what we stand to lose."
              >
                {motivationSubWords.map((item, index) => {
                  const step = (0.78 - 0.58) / motivationSubWords.length;
                  const start = 0.58 + index * step;
                  const end = Math.min(0.82, start + 0.022);

                  return reduced ? (
                    <StaticWord key={index} word={item.text} />
                  ) : (
                    <AnimatedWord
                      key={index}
                      word={item.text}
                      progress={universeProgress}
                      range={[start, end]}
                      dimOpacity={0.20}
                      brightOpacity={0.88}
                    />
                  );
                })}
              </p>
            </div>

            {/* Bottom Full-Width 4-Column Metric Rail */}
            <motion.div
              className="motivation-metrics-bar"
              style={reduced ? undefined : { opacity: metricsOpacity, y: metricsY }}
            >
              <div className="motivation-metric-col">
                <strong className="metric-number">
                  <CountUp to={4.6} decimals={1} suffix=" BILLION" start={metricsStarted} />
                </strong>
                <span className="metric-label">YEARS</span>
                <div className="metric-hairline" />
                <span className="metric-detail">SINCE EARTH WAS FORMED</span>
              </div>

              <div className="motivation-metric-col">
                <strong className="metric-number">
                  <CountUp to={71} suffix="%" start={metricsStarted} />
                </strong>
                <span className="metric-label">OF EARTH IS WATER</span>
                <div className="metric-hairline" />
                <span className="metric-detail">OCEANS, SEAS AND ICE</span>
              </div>

              <div className="motivation-metric-col">
                <strong className="metric-number">
                  <CountUp to={97.5} decimals={1} suffix="%" start={metricsStarted} />
                </strong>
                <span className="metric-label">SALTWATER</span>
                <div className="metric-hairline" />
                <span className="metric-detail">ONLY 2.5% IS FRESHWATER</span>
              </div>

              <div className="motivation-metric-col">
                <strong className="metric-number">
                  <CountUp to={8.7} decimals={1} suffix="M" start={metricsStarted} />
                </strong>
                <span className="metric-label">ESTIMATED SPECIES</span>
                <div className="metric-hairline" />
                <span className="metric-detail">AND COUNTING</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 03: THE FIVE MODULES ─── */}
      <section
        ref={modulesRef}
        className="modules-reference-section"
        id="modules"
        aria-label="03 — The Five Modules: Five systems. One connected planet."
      >
        {/* Atmospheric Natural Landscape Backdrop (Misty Mountains, Waterfalls, Atmosphere & Forests) */}
        <div className="modules-backdrop" aria-hidden="true">
          <motion.div
            className="modules-backdrop-landscape parallax-layer"
            style={reduced ? undefined : { y: modulesParallax, scale: 1.18 }}
          />
          <div className="modules-backdrop-scrim" />
          <div className="modules-backdrop-aura" />
        </div>

        {/* Header Block with Title, Description, and System Badges */}
        <div className="modules-ref-header">
          <div className="modules-header-left">
            <motion.div
              className="modules-tag-code"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              [ 03 ] THE FIVE MODULES
            </motion.div>
            <MaskReveal>
              <h2 className="modules-main-heading">
                Five systems.
                <br />
                One <em>connected planet.</em>
              </h2>
            </MaskReveal>
          </div>

          <div className="modules-header-right">
            <motion.p
              className="modules-header-desc"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Explore the systems that sustain life — from the ground beneath us to a climate under
              stress.
            </motion.p>
            <div className="modules-system-pills" aria-label="Curriculum Domains">
              <span className="system-pill pill-land">Land</span>
              <span className="system-pill-dot" />
              <span className="system-pill pill-water">Water</span>
              <span className="system-pill-dot" />
              <span className="system-pill pill-air">Air</span>
              <span className="system-pill-dot" />
              <span className="system-pill pill-bio">Biodiversity</span>
              <span className="system-pill-dot" />
              <span className="system-pill pill-warming">Warming</span>
            </div>
          </div>
        </div>

        {/* 2-Row Bento Grid (Exact 3-Card Top Row, 2-Card Bottom Row) */}
        <div className="modules-bento-grid">
          {/* Top Row: Land (~44%), Water (~28%), Air (~28%) */}
          <div className="bento-row-top">
            {/* Card 1: LAND */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/module/land"
                className="ref-bento-card"
                style={{ '--card-accent': '#deb87a' } as React.CSSProperties}
              >
                <div
                  className="bento-card-bg"
                  style={{ backgroundImage: `url('/images/card-land.jpg')` }}
                />
                <div className="bento-card-overlay" />

                <div className="bento-top-meta">
                  <span className="bento-card-num">[ 01 ]</span>
                  <h3 className="bento-card-title">LAND</h3>
                  <p className="bento-card-sub">The ground beneath everything.</p>
                </div>

                <div className="bento-bottom-content">
                  <div className="bento-stats-group">
                    <div className="bento-stat-item">
                      <strong>20%</strong>
                      <span>OF EARTH'S SURFACE</span>
                    </div>
                    <div className="bento-stat-item">
                      <strong>4.6 BILLION</strong>
                      <span>YEARS OF EVOLUTION</span>
                    </div>
                  </div>
                  <span className="bento-arrow-circle">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Card 2: WATER (Signature Cyan Highlight) */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/module/water"
                className="ref-bento-card card-water-highlight"
                style={{ '--card-accent': '#4fa3c7' } as React.CSSProperties}
              >
                <div
                  className="bento-card-bg"
                  style={{ backgroundImage: `url('/images/card-water.jpg')` }}
                />
                <div className="bento-card-overlay" />

                <div className="bento-top-meta">
                  <span className="bento-card-num">[ 02 ]</span>
                  <h3 className="bento-card-title">WATER</h3>
                  <p className="bento-card-sub">The cradle of life.</p>
                </div>

                <div className="bento-bottom-content">
                  <div className="bento-stats-group">
                    <div className="bento-stat-item">
                      <strong>97.5%</strong>
                      <span>SALTWATER</span>
                    </div>
                    <div className="bento-stat-item">
                      <strong>2.5%</strong>
                      <span>FRESHWATER</span>
                    </div>
                  </div>
                  <span className="bento-arrow-circle">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Card 3: AIR */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/module/air"
                className="ref-bento-card"
                style={{ '--card-accent': '#9fb8c4' } as React.CSSProperties}
              >
                <div
                  className="bento-card-bg"
                  style={{ backgroundImage: `url('/images/card-air.jpg')` }}
                />
                <div className="bento-card-overlay" />

                <div className="bento-top-meta">
                  <span className="bento-card-num">[ 03 ]</span>
                  <h3 className="bento-card-title">AIR</h3>
                  <p className="bento-card-sub">The thin shell we breathe.</p>
                </div>

                <div className="bento-bottom-content">
                  <div className="bento-stats-group">
                    <div className="bento-stat-item">
                      <strong>N₂ 78.084%</strong>
                      <span>NITROGEN</span>
                    </div>
                    <div className="bento-stat-item">
                      <strong>O₂ 20.946%</strong>
                      <span>OXYGEN</span>
                    </div>
                  </div>
                  <span className="bento-arrow-circle">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Row: Biodiversity (50%), Global Warming & EIA (50%) */}
          <div className="bento-row-bottom">
            {/* Card 4: BIODIVERSITY */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/module/biodiversity"
                className="ref-bento-card"
                style={{ '--card-accent': '#6fa96b' } as React.CSSProperties}
              >
                <div
                  className="bento-card-bg"
                  style={{ backgroundImage: `url('/images/card-bio.jpg')` }}
                />
                <div className="bento-card-overlay" />

                <div className="bento-top-meta">
                  <span className="bento-card-num">[ 04 ]</span>
                  <h3 className="bento-card-title">BIODIVERSITY</h3>
                  <p className="bento-card-sub">The web of living things.</p>
                </div>

                <div className="bento-bottom-content">
                  <div className="bento-stats-group">
                    <div className="bento-stat-item">
                      <strong>8.7M</strong>
                      <span>ESTIMATED SPECIES</span>
                    </div>
                    <div className="bento-stat-item">
                      <strong>GENETIC · SPECIES · ECOSYSTEM</strong>
                      <span>THREE LEVELS</span>
                    </div>
                  </div>
                  <span className="bento-arrow-circle">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Card 5: GLOBAL WARMING & EIA */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/module/warming"
                className="ref-bento-card"
                style={{ '--card-accent': '#d8703f' } as React.CSSProperties}
              >
                <div
                  className="bento-card-bg"
                  style={{ backgroundImage: `url('/images/card-warming.jpg')` }}
                />
                <div className="bento-card-overlay" />

                <div className="bento-top-meta">
                  <span className="bento-card-num">[ 05 ]</span>
                  <h3 className="bento-card-title">GLOBAL WARMING & EIA</h3>
                  <p className="bento-card-sub">A balance under stress.</p>
                </div>

                <div className="bento-bottom-content">
                  <div className="bento-stats-group">
                    <div className="bento-stat-item">
                      <strong>30%</strong>
                      <span>REFLECTED SUNLIGHT</span>
                    </div>
                    <div className="bento-stat-item">
                      <strong>70%</strong>
                      <span>ABSORBED</span>
                    </div>
                  </div>
                  <span className="bento-arrow-circle">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 04: HOW IT WORKS (Image Reference: media_1790626959401.jpg) ─── */}
      <section className="how-it-works-section" id="how-it-works" ref={howRef} aria-label="04 — How It Works">
        {/* Dual Atmospheric Backdrop: Cosmic Earth Orbital Arc + Sunrise Mountain Horizon */}
        <div className="how-backdrop" aria-hidden="true">
          <motion.div
            className="how-backdrop-orbit-arc parallax-layer"
            style={reduced ? undefined : { y: howArcParallax }}
          />
          <div className="how-backdrop-stars" />
          <div className="how-backdrop-auras" />
          <motion.div
            className="how-backdrop-landscape parallax-layer"
            style={reduced ? undefined : { y: howLandParallax, scale: 1.1 }}
          />
          <div className="how-backdrop-scrim-top" />
          <div className="how-backdrop-scrim-bottom" />
        </div>

        {/* Section Header Row */}
        <div className="how-header-row">
          <div className="how-header-left">
            <motion.span
              className="how-tag-code"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              [ 04 ] HOW IT WORKS
            </motion.span>
            <MaskReveal>
              <h2 className="how-main-title">
                A simple journey
                <br />
                to <em>deeper understanding.</em>
              </h2>
            </MaskReveal>
          </div>
          <motion.p
            className="how-header-desc"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore real-world resources through interactive learning, visual stories and quick assessments — all in one place.
          </motion.p>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="how-pipeline-grid">
          {/* Step 01: Choose a Resource */}
          <motion.div
            className="how-step-column"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="how-step-head">
              <span className="how-step-num">01</span>
              <span className="how-step-label">CHOOSE A RESOURCE</span>
            </div>
            <div className="how-step-card">
              <div className="step-resource-list">
                {howResources.map((res, i) => {
                  const Icon = res.icon;
                  const active = i === selectedHowResource;
                  return (
                    <button
                      type="button"
                      key={res.name}
                      className={`step-resource-item ${active ? 'is-selected' : ''}`}
                      onClick={() => setSelectedHowResource(i)}
                      aria-pressed={active}
                    >
                      <div className="step-item-left">
                        <Icon size={12} />
                        <span>{res.name}</span>
                      </div>
                      {active && (
                        <span className="step-mouse-cursor">
                          <MousePointer size={11} fill="#ffffff" stroke="#111" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="how-step-desc">Select a resource world to begin your exploration.</p>
            <div className="how-pipeline-connector" aria-hidden="true">
              <ArrowRight size={11} />
            </div>
          </motion.div>

          {/* Step 02: Explore & Learn */}
          <motion.div
            className="how-step-column"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="how-step-head">
              <span className="how-step-num">02</span>
              <span className="how-step-label">EXPLORE & LEARN</span>
            </div>
            <div className="how-step-card">
              <div className="step-video-preview">
                <div className="step-play-bead">
                  <Play size={10} fill="currentColor" style={{ marginLeft: '1px' }} />
                </div>
              </div>
              <div className="step-content-row">
                <div className="step-thumb-mini" style={{ backgroundImage: "url('/images/card-bio.jpg')" }} />
                <div className="step-lines-mock">
                  <span style={{ width: '85%' }} />
                  <span style={{ width: '52%' }} />
                </div>
              </div>
              <div className="step-content-row">
                <div className="step-thumb-mini" style={{ backgroundImage: "url('/images/card-land.jpg')" }} />
                <div className="step-lines-mock">
                  <span style={{ width: '92%' }} />
                  <span style={{ width: '64%' }} />
                </div>
              </div>
            </div>
            <p className="how-step-desc">Go through curated content with rich visuals, animations and real-world examples.</p>
            <div className="how-pipeline-connector" aria-hidden="true">
              <ArrowRight size={11} />
            </div>
          </motion.div>

          {/* Step 03: Interact & Discover */}
          <motion.div
            className="how-step-column"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="how-step-head">
              <span className="how-step-num">03</span>
              <span className="how-step-label">INTERACT & DISCOVER</span>
            </div>
            <div className="how-step-card" style={{ padding: 0 }}>
              <div className="step-earth-crop">
                <div className="step-hotspot-pin hotspot-pin-a" title="Forest Cover">
                  <span className="hotspot-pulse-ring" />
                  <Trees size={10} />
                </div>
                <div className="step-hotspot-pin hotspot-pin-b" title="Hydrosphere">
                  <Droplet size={10} />
                </div>
                <div className="step-hotspot-popover">
                  <div className="step-popover-header">
                    <span className="step-popover-leaf-icon">
                      <Trees size={9} />
                    </span>
                    <div className="step-popover-text">
                      <strong>Forest Cover 31%</strong>
                      <span>Global terrestrial distribution</span>
                    </div>
                  </div>
                  <div className="step-mini-distribution-bar">
                    <span className="dist-fill" style={{ width: '31%' }} />
                  </div>
                </div>
              </div>
            </div>
            <p className="how-step-desc">Engage with interactive maps, data visualizations and hands-on learning experiences.</p>
            <div className="how-pipeline-connector" aria-hidden="true">
              <ArrowRight size={11} />
            </div>
          </motion.div>

          {/* Step 04: Test Your Knowledge */}
          <motion.div
            className="how-step-column"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="how-step-head">
              <span className="how-step-num">04</span>
              <span className="how-step-label">TEST YOUR KNOWLEDGE</span>
            </div>
            <div className="how-step-card">
              <div className="step-quiz-box">
                <span className="step-quiz-q">Which layer of Earth is composed mainly of silicate rocks?</span>
                <div className="step-quiz-opt">
                  <span>A. Core</span>
                </div>
                <div className="step-quiz-opt is-correct">
                  <span>B. Mantle</span>
                  <span className="quiz-check-badge">
                    <Check size={9} strokeWidth={3} />
                  </span>
                </div>
                <div className="step-quiz-opt">
                  <span>C. Crust</span>
                </div>
                <div className="step-quiz-opt">
                  <span>D. Atmosphere</span>
                </div>
              </div>
            </div>
            <p className="how-step-desc">Take short quizzes to reinforce what you learn and track your progress.</p>
            <div className="how-pipeline-connector" aria-hidden="true">
              <ArrowRight size={11} />
            </div>
          </motion.div>

          {/* Step 05: Build a Greener Future */}
          <motion.div
            className="how-step-column"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="how-step-head">
              <span className="how-step-num">05</span>
              <span className="how-step-label">BUILD A GREENER FUTURE</span>
            </div>
            <div className="how-step-card" style={{ padding: 0 }}>
              <div className="step-future-card">
                <div className="step-future-badge">
                  <span className="step-future-leaf-icon">
                    <Leaf size={10} />
                  </span>
                  <span>Knowledge today for a sustainable tomorrow.</span>
                </div>
              </div>
            </div>
            <p className="how-step-desc">Gain knowledge, make better choices and contribute to a sustainable planet.</p>
          </motion.div>
        </div>

        {/* Bottom CTA Row with Hairline and Gold Button */}
        <div className="how-bottom-cta">
          <div className="how-cta-divider" aria-hidden="true">
            <span className="how-divider-dot" />
            <span className="how-divider-line" />
            <span className="how-divider-dot" />
          </div>
          <span className="how-tagline">SAME PLANET. BRIGHTER TOMORROW.</span>
          <Link to="/module/land" className="how-begin-pill">
            <span>Begin Your Journey</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ─── SECTION 05: BEGIN YOUR JOURNEY (Image Reference: media_1790627021923.jpg) ─── */}
      <section className="begin-journey-section" id="begin-journey" ref={beginRef} aria-label="05 — Begin Your Journey">
        <motion.div
          className="begin-journey-backdrop parallax-layer"
          style={reduced ? undefined : { y: beginParallax, scale: 1.16 }}
        />
        <div className="begin-journey-scrim" />

        <div className="begin-journey-main-row">
          <motion.div
            className="begin-journey-editorial"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="begin-journey-tag">[ 05 ] BEGIN YOUR JOURNEY</span>
            <h2 className="begin-journey-title">
              Same Planet.
              <br />
              <em>Brighter Tomorrow.</em>
            </h2>
            <p className="begin-journey-sub">
              Explore. Learn. Take action. Your journey through land, water, air, biodiversity and global warming starts here.
            </p>

            <Link to="/module/land" className="begin-journey-cta-btn">
              <span className="cta-play-icon">
                <Play size={12} fill="currentColor" style={{ marginLeft: '2px' }} />
              </span>
              <span>Begin Your Journey</span>
              <ArrowRight size={14} />
            </Link>

            <div className="begin-features-row">
              <div className="begin-feature-item">
                <span className="begin-feature-icon">
                  <GraduationCap size={15} />
                </span>
                <span>Interactive Learning</span>
              </div>
              <div className="begin-feature-item">
                <span className="begin-feature-icon">
                  <Globe size={15} />
                </span>
                <span>Real-World Insights</span>
              </div>
              <div className="begin-feature-item">
                <span className="begin-feature-icon">
                  <Leaf size={15} />
                </span>
                <span>A Greener Future</span>
              </div>
            </div>
          </motion.div>

          {/* Top Right Golden Script Accent */}
          <div className="begin-script-accent" aria-hidden="true">
            <span>Explore</span>
            <span>Understand</span>
            <span>Take Action</span>
          </div>
        </div>

        {/* Bottom 5 Mini Module Cards Strip */}
        <div className="begin-bottom-cards">
          {[
            {
              num: '01',
              title: 'LAND',
              desc: 'Soils, forests and sustainable use',
              slug: 'land',
              img: '/images/card-land.jpg',
            },
            {
              num: '02',
              title: 'WATER',
              desc: 'Rivers, groundwater and conservation',
              slug: 'water',
              img: '/images/card-water.jpg',
            },
            {
              num: '03',
              title: 'AIR',
              desc: 'Atmosphere, pollution and cleaner futures',
              slug: 'air',
              img: '/images/card-air.jpg',
            },
            {
              num: '04',
              title: 'BIODIVERSITY',
              desc: 'Ecosystems and the web of life',
              slug: 'biodiversity',
              img: '/images/card-bio.jpg',
            },
            {
              num: '05',
              title: 'GLOBAL WARMING',
              desc: 'A balance under stress',
              slug: 'warming',
              img: '/images/card-warming.jpg',
            },
          ].map((mod, i) => (
            <motion.div
              key={mod.slug}
              className="begin-mini-wrap"
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/module/${mod.slug}`} className="begin-mini-card">
                <div className="begin-mini-bg" style={{ backgroundImage: `url('${mod.img}')` }} />
                <div className="begin-mini-top">
                  <span>{mod.num}</span>
                  <span>{mod.desc}</span>
                </div>
                <div className="begin-mini-bot">
                  <strong className="begin-mini-title">{mod.title}</strong>
                  <span className="begin-mini-arrow">
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 06: SITE FOOTER (Image Reference: media_1790627931446.jpg) ─── */}
      <footer className="site-footer-reference" id="footer" aria-label="Site Footer">
        {/* Upper Banner: Same Planet. Brighter Tomorrow */}
        <div className="footer-banner-header">
          <div className="footer-banner-scrim" />
          <div className="footer-banner-content">
            <motion.div
              className="footer-banner-left"
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="footer-brand-overline">
                <span className="footer-brand-logo-mark">T</span>
                <span>TERRA | Conservation of Natural Resources</span>
              </div>
              <h2 className="footer-banner-title">
                Same Planet.
                <br />
                <em>Brighter Tomorrow.</em>
              </h2>
              <p className="footer-banner-desc">
                Explore, learn and take action for a more sustainable and balanced planet through
                land, water, air, biodiversity and global warming.
              </p>
            </motion.div>
            <motion.div
              className="footer-script-tag"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              A Greener
              <br />
              Future Together.
            </motion.div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="footer-main-columns">
          {/* Column 1: Explore Modules */}
          <motion.div
            className="footer-col"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="footer-col-title">Explore Modules</h3>
            <div className="footer-module-list">
              <Link to="/module/land" className="footer-module-item is-highlighted">
                <Mountain size={14} />
                <span className="footer-item-num">01</span>
                <span>Land</span>
              </Link>
              <Link to="/module/water" className="footer-module-item">
                <Droplet size={13} />
                <span className="footer-item-num">02</span>
                <span>Water</span>
              </Link>
              <Link to="/module/air" className="footer-module-item">
                <Wind size={13} />
                <span className="footer-item-num">03</span>
                <span>Air</span>
              </Link>
              <Link to="/module/biodiversity" className="footer-module-item">
                <Trees size={13} />
                <span className="footer-item-num">04</span>
                <span>Biodiversity</span>
              </Link>
              <Link to="/module/warming" className="footer-module-item">
                <Globe size={13} />
                <span className="footer-item-num">05</span>
                <span>Global Warming</span>
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            className="footer-col"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="footer-col-title">Quick Links</h3>
            <div className="footer-quick-list">
              <a href="#hero">Home</a>
              <Link to="/about">About</Link>
              <a href="#modules">Modules</a>
              <Link to="/quiz">Quiz</Link>
              <a href="#how-it-works">Resources</a>
              <a href="#about">FAQs</a>
            </div>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div
            className="footer-col"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="footer-col-title">Resources</h3>
            <div className="footer-resources-list">
              <a href="#modules" className="footer-resource-item">
                <FileText size={13} />
                <span>Study Materials</span>
              </a>
              <a href="#modules" className="footer-resource-item">
                <Video size={13} />
                <span>Videos</span>
              </a>
              <a href="#modules" className="footer-resource-item">
                <BarChart3 size={13} />
                <span>Infographics</span>
              </a>
              <a href="#modules" className="footer-resource-item">
                <BookOpen size={13} />
                <span>Articles</span>
              </a>
              <a href="#modules" className="footer-resource-item">
                <Download size={13} />
                <span>Downloads</span>
              </a>
              <a href="#about" className="footer-resource-item">
                <ExternalLink size={13} />
                <span>External Links</span>
              </a>
            </div>
          </motion.div>

          {/* Column 4: Stay Connected */}
          <motion.div
            className="footer-col footer-stay-col"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="footer-col-title">Stay Connected</h3>
            <p className="footer-stay-desc">Get the latest updates, new modules and resources.</p>
            <form className="footer-subscribe-box" onSubmit={(e) => e.preventDefault()}>
              <Mail size={14} />
              <input type="email" placeholder="Enter your email" aria-label="Email address" required />
              <button type="submit" className="footer-subscribe-btn">
                <span>Subscribe</span>
                <ArrowRight size={11} />
              </button>
            </form>
            <label className="footer-agree-row">
              <input type="checkbox" defaultChecked />
              <span>I agree to receive educational updates from TERRA.</span>
            </label>
          </motion.div>
        </div>

        {/* Bottom Bar: Brand | Motto | Socials */}
        <motion.div
          className="footer-bottom-reference"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="footer-bottom-brand">
            <span className="footer-bottom-brand-circle">T</span>
            <span>TERRA | Conservation of Natural Resources</span>
          </div>

          <div className="footer-bottom-motto">
            KNOWLEDGE TODAY. A BRIGHTER TOMORROW.
          </div>

          <div className="footer-bottom-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social-btn">
              <Linkedin size={13} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer-social-btn">
              <Youtube size={13} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-btn">
              <Instagram size={13} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (formerly Twitter)" className="footer-social-btn">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
