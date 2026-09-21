import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Volume2, VolumeX, Menu, X, Search, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleAudioAmbience } from '../utils/audioAmbience';

interface SearchOption {
  title: string;
  category: string;
  action: () => void;
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';
  const isModulePage = location.pathname.startsWith('/module');
  const close = () => setOpen(false);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    toggleAudioAmbience(next);
  };

  // Search quick jump options
  const searchDatabase: SearchOption[] = [
    { title: "Module 01: Land Cover", category: "Module", action: () => { navigate('/module/land#cover'); close(); } },
    { title: "Earth Formation (4.6 Bya)", category: "Land Chapter", action: () => { navigate('/module/land#ch-formation'); close(); } },
    { title: "Earth Layers & Cutaway", category: "Land Chapter", action: () => { navigate('/module/land#ch-layers'); close(); } },
    { title: "Crust & Continental Drift", category: "Land Chapter", action: () => { navigate('/module/land#ch-continents'); close(); } },
    { title: "Land as a Resource (20%)", category: "Land Chapter", action: () => { navigate('/module/land#ch-resource'); close(); } },
    { title: "Soil Formation & Horizons", category: "Land Chapter", action: () => { navigate('/module/land#ch-soil'); close(); } },
    { title: "Land Forms Explorer", category: "Land Chapter", action: () => { navigate('/module/land#ch-landforms'); close(); } },
    { title: "Conservation of Land Forms", category: "Land Chapter", action: () => { navigate('/module/land#ch-conservation'); close(); } },
    { title: "Deforestation & Forest Loss", category: "Land Chapter", action: () => { navigate('/module/land#ch-deforestation'); close(); } },
    { title: "Land-Use Change & Shire River", category: "Land Chapter", action: () => { navigate('/module/land#ch-landuse'); close(); } },
    { title: "Soil Health & Composition", category: "Land Chapter", action: () => { navigate('/module/land#ch-soilhealth'); close(); } },
    { title: "6 Pathways to Land Degradation", category: "Land Chapter", action: () => { navigate('/module/land#ch-degradation'); close(); } },
    { title: "Soil Conservation Strategies", category: "Land Chapter", action: () => { navigate('/module/land#ch-soilconservation'); close(); } },
    { title: "Sustainable Land-Use Planning", category: "Land Chapter", action: () => { navigate('/module/land#ch-planning'); close(); } },
    { title: "Module 02: Water", category: "Module", action: () => { navigate('/module/water'); close(); } },
    { title: "Module 03: Air", category: "Module", action: () => { navigate('/module/air'); close(); } },
    { title: "Module 04: Biodiversity", category: "Module", action: () => { navigate('/module/biodiversity'); close(); } },
    { title: "Module 05: Global Warming", category: "Module", action: () => { navigate('/module/warming'); close(); } },
    { title: "Course Quiz & Knowledge Check", category: "Quiz", action: () => { navigate('/quiz'); close(); } },
  ];

  const searchResults = searchQuery.trim()
    ? searchDatabase.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When on a module page, render the exact header from the user reference image
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
            <Link to="/#modules" className={`mod-nav-link ${isModulePage ? 'is-active' : ''}`}>Modules</Link>
            <Link to="/about" className="mod-nav-link">About</Link>
            <Link to="/quiz" className="mod-nav-link">Quiz</Link>
            <Link to="/quiz?tab=resources" className="mod-nav-link">Resources</Link>
          </div>

          {/* Right Search & Profile */}
          <div className="mod-nav-actions" ref={searchRef}>
            <div className={`mod-search-pill ${searchFocused ? 'has-focus' : ''}`}>
              <Search size={14} className="mod-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                aria-label="Search resources"
              />
              {searchResults.length > 0 && searchFocused && (
                <div className="mod-search-dropdown">
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="mod-search-result-item"
                      onClick={() => {
                        item.action();
                        setSearchQuery('');
                        setSearchFocused(false);
                      }}
                    >
                      <span className="search-res-title">{item.title}</span>
                      <span className="search-res-badge">{item.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="mod-user-avatar"
              aria-label="User profile"
              title="User profile"
            >
              <User size={15} />
            </button>

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
          <Link to="/about" onClick={close}>
            ABOUT
          </Link>
          <a href="#modules" onClick={close}>
            MODULES
          </a>
          <Link to="/quiz" onClick={close}>
            RESOURCES
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
