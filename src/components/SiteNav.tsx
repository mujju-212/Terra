import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Volume2, VolumeX, Sparkles, Layers, Droplet, Wind, Trees, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleAudioAmbience } from '../utils/audioAmbience';
import './MobileNav.css';

const drawerModules = [
  { id: 'land', num: '01', title: 'Land & Lithosphere', icon: Layers, path: '/module/land', accent: '#C9A15A' },
  { id: 'water', num: '02', title: 'Water Resources', icon: Droplet, path: '/module/water', accent: '#4FA3C7' },
  { id: 'air', num: '03', title: 'Atmosphere & Air Quality', icon: Wind, path: '/module/air', accent: '#9FB8C4' },
  { id: 'bio', num: '04', title: 'Biodiversity & Ecosystems', icon: Trees, path: '/module/biodiversity', accent: '#6FA96B' },
  { id: 'warming', num: '05', title: 'Global Warming & EIA', icon: Globe, path: '/module/warming', accent: '#D8703F' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isModulePage = location.pathname.startsWith('/module/');
  const isModules = location.pathname === '/modules' || location.pathname === '/module';
  const isResources = location.pathname === '/resources';
  const isAbout = location.pathname === '/about';
  const isQuiz = location.pathname === '/quiz';

  const close = () => setOpen(false);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    toggleAudioAmbience(next);
  };

  // Lock background scrolling when mobile navigation drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close drawer automatically on route navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {isModulePage ? (
        /* ─── MODULE EXPERIENCE HEADER ─── */
        <header className="site-nav-wrap module-header-wrap">
          <nav className="module-top-nav site-nav" aria-label="Main Navigation">
            {/* Left Brand */}
            <Link className="mod-brand-lockup brand" to="/" aria-label="TERRA — Conservation of Natural Resources" onClick={close}>
              <span className="mod-brand-emblem brand-logo-disc" aria-hidden="true" />
              <span className="mod-brand-name brand-code">TERRA</span>
              <span className="mod-brand-sep brand-divider" aria-hidden="true">|</span>
              <span className="mod-brand-sub brand-title">Conservation of Natural Resources</span>
            </Link>

            {/* Center Links (Desktop only via CSS) */}
            <div className="mod-nav-links">
              <Link to="/modules" className={`mod-nav-link ${isModules ? 'is-active' : ''}`}>Modules</Link>
              <Link to="/about" className={`mod-nav-link ${isAbout ? 'is-active' : ''}`}>About</Link>
              <Link to="/quiz" className={`mod-nav-link ${isQuiz ? 'is-active' : ''}`}>Quiz</Link>
              <Link to="/resources" className={`mod-nav-link ${isResources ? 'is-active' : ''}`}>Resources</Link>
            </div>

            {/* Right Actions */}
            <div className="mod-nav-actions nav-right-actions">
              <button
                type="button"
                className={`mod-sound-btn mobile-sound-btn ${sound ? 'is-active' : ''}`}
                onClick={toggleSound}
                aria-label={sound ? 'Mute ambient sound' : 'Enable ambient sound'}
                title={sound ? 'Sound enabled' : 'Ambient mode'}
              >
                {sound ? <Volume2 size={16} /> : <span className={`sound-dot ${sound ? 'is-active' : ''}`} />}
              </button>

              {/* Mobile Menu Hamburger Toggle (Visible <= 900px) */}
              <button
                type="button"
                className="mobile-menu-btn"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </header>
      ) : (
        /* ─── GENERAL PAGES / LANDING HEADER ─── */
        <header className="site-nav-wrap">
          <nav className="site-nav liquid-glass" aria-label="Main navigation">
            {/* Brand Left */}
            <Link className="brand" to="/" aria-label="TERRA — Conservation of Natural Resources" onClick={close}>
              <span className="brand-logo-disc" aria-hidden="true" />
              <span className="brand-code">TERRA</span>
              <span className="brand-divider" />
              <span className="brand-title">Conservation of Natural Resources</span>
            </Link>

            {/* Center Links (Desktop only via CSS) */}
            <div id="primary-navigation" className="nav-links">
              <Link to="/" className={isHome ? 'active-nav-link' : ''} onClick={close}>
                HOME
                {isHome && <span className="nav-active-pill" />}
              </Link>
              <Link to="/about" className={isAbout ? 'active-nav-link' : ''} onClick={close}>
                ABOUT
                {isAbout && <span className="nav-active-pill" />}
              </Link>
              <Link to="/modules" className={isModules ? 'active-nav-link' : ''} onClick={close}>
                MODULES
                {isModules && <span className="nav-active-pill" />}
              </Link>
              <Link to="/resources" className={isResources ? 'active-nav-link' : ''} onClick={close}>
                RESOURCES
                {isResources && <span className="nav-active-pill" />}
              </Link>
              <Link to="/quiz" className={isQuiz ? 'active-nav-link' : ''} onClick={close}>
                QUIZ
                {isQuiz && <span className="nav-active-pill" />}
              </Link>
            </div>

            {/* Right Actions */}
            <div className="nav-right-actions">
              <Link className="nav-begin-btn" to="/module/land" onClick={close}>
                <span>Begin Journey</span>
                <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                className={`nav-sound-btn mobile-sound-btn ${sound ? 'is-active' : ''}`}
                onClick={toggleSound}
                aria-label={sound ? 'Mute ambient sound' : 'Enable ambient sound'}
                title={sound ? 'Sound enabled' : 'Ambient mode'}
              >
                {sound ? <Volume2 size={16} /> : <span className="sound-dot" />}
              </button>
              <button
                type="button"
                className="mobile-menu-btn"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </header>
      )}

      {/* ─── FULL MOBILE NAVIGATION DRAWER / SHEET OVERLAY ─── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.aside
              className="mobile-nav-drawer"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Drawer Header */}
              <div className="mnd-header">
                <Link to="/" className="mnd-brand" onClick={close} aria-label="TERRA Home">
                  <span className="mnd-brand-disc" aria-hidden="true" />
                  <span className="mnd-brand-text">TERRA</span>
                </Link>
                <button
                  type="button"
                  className="mnd-close-btn"
                  onClick={close}
                  aria-label="Close Navigation Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="mnd-body">
                {/* Main Navigation Links */}
                <nav className="mnd-nav-list" aria-label="Primary Mobile Navigation">
                  <Link to="/" className={`mnd-nav-link ${isHome ? 'is-active' : ''}`} onClick={close}>
                    <span>HOME</span>
                    {isHome && <span className="mnd-link-pill" />}
                  </Link>
                  <Link to="/modules" className={`mnd-nav-link ${isModules ? 'is-active' : ''}`} onClick={close}>
                    <span>MODULES</span>
                    {isModules && <span className="mnd-link-pill" />}
                  </Link>
                  <Link to="/about" className={`mnd-nav-link ${isAbout ? 'is-active' : ''}`} onClick={close}>
                    <span>ABOUT</span>
                    {isAbout && <span className="mnd-link-pill" />}
                  </Link>
                  <Link to="/resources" className={`mnd-nav-link ${isResources ? 'is-active' : ''}`} onClick={close}>
                    <span>RESOURCES</span>
                    {isResources && <span className="mnd-link-pill" />}
                  </Link>
                  <Link to="/quiz" className={`mnd-nav-link ${isQuiz ? 'is-active' : ''}`} onClick={close}>
                    <span>QUIZ</span>
                    {isQuiz && <span className="mnd-link-pill" />}
                  </Link>
                </nav>

                {/* Direct Module Switcher */}
                <div>
                  <h4 className="mnd-section-title">EXPLORE RESOURCE WORLDS</h4>
                  <div className="mnd-modules-grid">
                    {drawerModules.map((m) => {
                      const isActive = location.pathname === m.path;
                      const Icon = m.icon;
                      return (
                        <Link
                          key={m.id}
                          to={m.path}
                          className={`mnd-module-card ${isActive ? 'is-active' : ''}`}
                          style={{ '--mod-accent': m.accent } as React.CSSProperties}
                          onClick={close}
                        >
                          <span className="mnd-module-num">0{m.num}</span>
                          <span className="mnd-module-name">{m.title}</span>
                          <ArrowRight size={14} className="mnd-module-arrow" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Ambient Sound Controller */}
                <div className="mnd-audio-card">
                  <div className="mnd-audio-info">
                    <span className="mnd-audio-label">Ambient Audio FX</span>
                    <span className="mnd-audio-status">
                      <span className={`mnd-audio-dot ${sound ? 'is-active' : ''}`} />
                      {sound ? 'Soundscape Active' : 'Sound Muted'}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`mnd-audio-toggle ${sound ? 'is-active' : ''}`}
                    onClick={toggleSound}
                  >
                    {sound ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    <span>{sound ? 'Mute' : 'Play'}</span>
                  </button>
                </div>

                {/* Begin Journey CTA */}
                <Link to="/module/land" className="mnd-cta-btn" onClick={close}>
                  <span>Begin Field Journey</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Drawer Footer */}
              <div className="mnd-footer">
                <span>BCV755B · VTU 7TH SEM</span>
                <span>TERRA FIELD GUIDE</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
