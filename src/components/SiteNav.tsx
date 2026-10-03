import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toggleAudioAmbience } from '../utils/audioAmbience';

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

  // When on a module page, render clean header without search or dummy profile
  if (isModulePage) {
    return (
      <header className="site-nav-wrap module-header-wrap">
        <nav className="module-top-nav" aria-label="Main Navigation">
          {/* Left Brand */}
          <Link className="mod-brand-lockup" to="/" aria-label="TERRA — Conservation of Natural Resources">
            <span className="mod-brand-emblem" aria-hidden="true" />
            <span className="mod-brand-name">TERRA</span>
            <span className="mod-brand-sep" aria-hidden="true">|</span>
            <span className="mod-brand-sub">Conservation of Natural Resources</span>
          </Link>

          {/* Center Links */}
          <div className="mod-nav-links">
            <Link to="/modules" className={`mod-nav-link ${isModules ? 'is-active' : ''}`}>Modules</Link>
            <Link to="/about" className={`mod-nav-link ${isAbout ? 'is-active' : ''}`}>About</Link>
            <Link to="/quiz" className={`mod-nav-link ${isQuiz ? 'is-active' : ''}`}>Quiz</Link>
            <Link to="/resources" className={`mod-nav-link ${isResources ? 'is-active' : ''}`}>Resources</Link>
          </div>

          {/* Right Actions */}
          <div className="mod-nav-actions">
            <button
              type="button"
              className="mod-sound-btn"
              onClick={toggleSound}
              aria-label={sound ? 'Mute ambient sound' : 'Enable ambient sound'}
              title={sound ? 'Sound enabled' : 'Ambient mode'}
            >
              <span className={`sound-dot ${sound ? 'is-active' : ''}`} />
            </button>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="site-nav-wrap">
      <nav className="site-nav liquid-glass" aria-label="Main navigation">
        {/* Brand Left */}
        <Link className="brand" to="/" aria-label="TERRA — Conservation of Natural Resources" onClick={close}>
          <span className="brand-logo-disc" aria-hidden="true" />
          <span className="brand-code">TERRA</span>
          <span className="brand-divider" />
          <span className="brand-title">Conservation of Natural Resources</span>
        </Link>

        {/* Center Links */}
        <div id="primary-navigation" className={`nav-links${open ? ' nav-open' : ''}`}>
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
            className="nav-sound-btn"
            onClick={toggleSound}
            aria-label={sound ? 'Mute ambient sound' : 'Enable ambient sound'}
            title={sound ? 'Sound enabled' : 'Ambient mode'}
          >
            <span className="sound-dot" />
          </button>
          <button
            type="button"
            className="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-controls="primary-navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
