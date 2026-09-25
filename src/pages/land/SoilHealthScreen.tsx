import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mountain, Droplet, Wind, Globe, ArrowRight, ArrowLeft, Sparkles, Wheat, ChevronRight, ChevronLeft, Layers, Activity, Sprout, X, Leaf, BarChart3, FlaskConical, Bug } from 'lucide-react';
import '../../soilhealth.css';
import { Reveal } from './motion';

export default function SoilHealthScreen({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const [activeHorizon, setActiveHorizon] = useState<string | null>(null);
  const [activeDonutSlice, setActiveDonutSlice] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedModalItem, setSelectedModalItem] = useState<string>('O');

  const openModal = (type: string, itemKey?: string) => {
    setActiveModal(type);
    if (itemKey) setSelectedModalItem(itemKey);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Lock background scroll when any modal is open
  useEffect(() => {
    if (!activeModal) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (window.__lenis) {
      window.__lenis.stop();
    }
    const handleCaptureWheel = (e: WheelEvent) => {
      const modalWindow = document.querySelector('.soilhealth-modal-window');
      if (modalWindow && modalWindow.contains(e.target as Node)) {
        const scrollable = modalWindow.querySelector('.soilhealth-modal-body');
        if (scrollable) {
          const atTop = scrollable.scrollTop === 0 && e.deltaY < 0;
          const atBottom =
            Math.abs(scrollable.scrollHeight - scrollable.clientHeight - scrollable.scrollTop) <= 1 &&
            e.deltaY > 0;
          if (atTop || atBottom) {
            e.preventDefault();
          }
        }
      } else {
        e.preventDefault();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('wheel', handleCaptureWheel, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener('wheel', handleCaptureWheel, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  // Horizons pedagogical database
  const horizonsData: Record<string, {
    code: string;
    name: string;
    sub: string;
    depth: string;
    composition: string;
    functionDesc: string;
    bioActivity: string;
    management: string;
    badgeClass: string;
  }> = {
    O: {
      code: 'O',
      name: 'Organic Layer (Humus)',
      sub: 'Decomposed plant & animal matter',
      depth: '0 – 5 cm (0 – 2 inches)',
      composition: '> 20–30% organic carbon by weight, decaying forest litter, leaf mulch, fungal hyphae',
      functionDesc: 'Acts as protective thermal insulation and sponge, cushioning raindrop kinetic impact, preventing erosion, and providing critical nourishment for decomposers.',
      bioActivity: 'Highest concentration of macro-fauna (earthworms, mites, collembola) and saprophytic fungi.',
      management: 'Vulnerable to clear-cutting, fire, and compaction. Conserved through cover crops and zero-tillage.',
      badgeClass: 'horizon-badge-o',
    },
    A: {
      code: 'A',
      name: 'Topsoil',
      sub: 'Most nutrients, roots and microorganisms',
      depth: '5 – 25 cm (2 – 10 inches)',
      composition: 'Mineral soil intermixed with rich, stabilized humus. Granular and crumb aggregates.',
      functionDesc: 'The primary biological production powerhouse supporting terrestrial life. Holds bio-available N, P, K, Ca, and Mg.',
      bioActivity: '90%+ of root zone biomass, active rhizobia, mycorrhizae, and bacterial populations.',
      management: 'Primary focus of soil conservation (contour plowing, terrace farming, mulching). Highly prone to water/wind erosion.',
      badgeClass: 'horizon-badge-a',
    },
    B: {
      code: 'B',
      name: 'Subsoil (Illuviation Zone)',
      sub: 'Accumulated clay, minerals and iron',
      depth: '25 – 75 cm (10 – 30 inches)',
      composition: 'Zone of illuviation: silicate clays, iron and aluminum sesquioxides, carbonate accumulation.',
      functionDesc: 'Nutrient and moisture reservoir during dry seasons. Dense blocky or prismatic structures that slow downward water drainage.',
      bioActivity: 'Deep tree roots penetrate here; anaerobic or micro-aerophilic microbial colonies.',
      management: 'Subsoil hardpans (plow soles) restrict taproots and require deep ripping or chisel plowing.',
      badgeClass: 'horizon-badge-b',
    },
    C: {
      code: 'C',
      name: 'Parent Material (Regolith)',
      sub: 'Partially weathered rock',
      depth: '75 – 150+ cm (30 – 60+ inches)',
      composition: 'Partially weathered unstratified rocks, unconsolidated geological sediment (alluvium, loess, glacial till).',
      functionDesc: 'Geochemical origin determining base soil texture, native mineral fertility, and natural cation exchange capacity (CEC).',
      bioActivity: 'Extremely sparse biology; devoid of organic matter.',
      management: 'Inaccessible to standard tillage; dictates regional soil pH and natural mineral release rates.',
      badgeClass: 'horizon-badge-c',
    },
    R: {
      code: 'R',
      name: 'Bedrock',
      sub: 'Solid rock basement',
      depth: 'Beneath C Horizon (continuous rock)',
      composition: 'Solid unbroken rock (granite, basalt, limestone, sandstone, or quartzite).',
      functionDesc: 'Impermeable geological foundation of the soil profile that anchors the earth crust and governs regional aquifers.',
      bioActivity: 'None, except specialized endolithic bacteria in deep fractures.',
      management: 'Defines soil depth limits. Shallow soils over bedrock are drought-prone and prone to land degradation.',
      badgeClass: 'horizon-badge-r',
    },
  };

  // Textures pedagogical database
  const texturesData: Record<string, {
    title: string;
    particleSize: string;
    permeability: string;
    waterHolding: string;
    aeration: string;
    fertility: string;
    description: string;
    idealCrops: string;
  }> = {
    sandy: {
      title: 'Sandy Soil',
      particleSize: '0.05 – 2.0 mm (Large, gritty)',
      permeability: 'Very Rapid (> 5.0 cm/hr)',
      waterHolding: 'Very Low (Low available water capacity)',
      aeration: 'Exceptional (Excessive macropores)',
      fertility: 'Low CEC (< 5 cmol/kg), prone to nutrient leaching',
      description: 'Coarse-textured soil dominated by silica quartz particles. Due to large pore spaces, water drains rapidly without being retained, washing away mobile nutrients like nitrates and potassium.',
      idealCrops: 'Carrots, potatoes, radishes, groundnuts, watermelon (crops requiring loose, well-drained media).',
    },
    loamy: {
      title: 'Loamy Soil',
      particleSize: 'Balanced blend: 40% Sand, 40% Silt, 20% Clay',
      permeability: 'Moderate & Optimal (1.5 – 3.0 cm/hr)',
      waterHolding: 'High Available Water Capacity (Optimal)',
      aeration: 'Excellent (Balanced micro and macropores)',
      fertility: 'High CEC (15 – 30 cmol/kg), nutrient-dense',
      description: 'The agricultural gold standard. Combines the rapid warming and aeration of sand, the moisture retention of silt, and the nutrient buffering capacity of clay into resilient crumb aggregates.',
      idealCrops: 'Wheat, corn, sugarcane, cotton, vegetables, orchard fruits (supports virtually all commercial crops).',
    },
    clayey: {
      title: 'Clayey Soil',
      particleSize: '< 0.002 mm (Microscopic, colloidal plate-like)',
      permeability: 'Very Slow (< 0.2 cm/hr, prone to ponding)',
      waterHolding: 'Extremely High (Strong capillary suction)',
      aeration: 'Poor when wet (Dominated by micropores)',
      fertility: 'Very High CEC (30 – 100+ cmol/kg), holds cations tightly',
      description: 'Fine-textured heavy soil composed of layered aluminosilicate clay minerals. When wet, it turns sticky and plastic, sealing the surface. When dry, it contracts into deep shrinkage cracks and hard clods.',
      idealCrops: 'Paddy rice (flooded basins), wetland taro, cabbage, broccoli, leafy greens.',
    },
  };

  // Indicators database
  const indicatorsData: Record<string, {
    title: string;
    domain: string;
    keyTests: string[];
    healthyRange: string;
    managementAction: string;
  }> = {
    physical: {
      title: 'Physical Soil Health',
      domain: 'Structure, Porosity & Hydrology',
      keyTests: ['Soil bulk density (< 1.3 g/cm³)', 'Slake test aggregate stability', 'Infiltration rate test', 'Soil penetrometer resistance (< 200 psi)'],
      healthyRange: 'Well-aggregated granular crumb structure, bulk density 1.1–1.35 g/cm³, 50% pore space.',
      managementAction: 'Adopt minimum tillage, retain 70%+ crop residue cover, plant fibrous-root cover crops, prevent heavy machinery traffic on wet fields.',
    },
    chemical: {
      title: 'Chemical Soil Health',
      domain: 'Nutrient Availability, pH & Salinity',
      keyTests: ['Soil pH reaction in 1:1 water solution', 'Bray/Olsen Available Phosphorus', 'Exchangeable K, Ca, Mg', 'Cation Exchange Capacity (CEC)', 'Electrical Conductivity (EC)'],
      healthyRange: 'pH 6.0 – 7.5, EC < 2 dS/m, Base saturation > 65%, balanced N:P:K stoichiometry.',
      managementAction: 'Apply agricultural lime (CaCO3) to correct acid soils; apply gypsum (CaSO4) for sodic soils; add organic compost to enhance CEC.',
    },
    biological: {
      title: 'Biological Soil Health',
      domain: 'Living Microbes & Nutrient Cycling',
      keyTests: ['Soil Microbial Biomass Carbon (SMBC)', 'Active Carbon (POXC)', 'Solvita CO2-burst respiration test', 'Earthworm count (> 10 per cubic foot)', 'Nematode community index'],
      healthyRange: 'High microbial biodiversity, active mycorrhizal hyphal network, rapid organic decomposition, Soil Organic Matter (SOM) > 3–5%.',
      managementAction: 'Rotate diverse legume and brassica cover crops, eliminate broad-spectrum chemical fumigants, integrate compost and farmyard manure.',
    },
  };

  const horizonOrder = ['O', 'A', 'B', 'C', 'R'];
  const textureOrder = ['sandy', 'loamy', 'clayey'];
  const indicatorOrder = ['physical', 'chemical', 'biological'];

  return (
    <section className="land-screen land-soilhealth-screen" id="ch-soilhealth">
      <div className="soilhealth-screen-container">
        {/* ──────────────────────────────────────────────────────────────────
            1. TOP HERO SECTION (Cutaway Earth, Roots, Seedling & Soil Profile Card)
            ────────────────────────────────────────────────────────────────── */}
        <div className="soilhealth-hero-wrap">
          <div
            className="soilhealth-hero-bg"
            style={{ backgroundImage: `url('/images/soil-hero-clean.jpg')` }}
          />
          <div className="soilhealth-hero-scrim" />

          {/* Left Hero Typography */}
          <div className="soilhealth-hero-copy">
            <span className="soilhealth-eyebrow">MODULE 01 | CHAPTER 11</span>
            <h2 className="soilhealth-grand-title">
              Soil Health &amp; <em>Composition</em>
            </h2>
            <h3 className="soilhealth-subtitle">Healthy soils for a resilient planet.</h3>
            <p className="soilhealth-lead-desc">
              Soil is a dynamic natural resource composed of minerals, organic matter, water, air and living organisms. Soil health refers to its continued capacity to function as a vital living ecosystem that sustains plants, animals and human life.
            </p>
          </div>

          {/* Floating "Healthy Plant Growth" Badge */}
          <div className="healthy-growth-badge">
            <div className="growth-badge-icon">
              <Leaf size={18} />
            </div>
            <div className="growth-badge-text">
              <strong>Healthy Plant Growth</strong>
              <span>Supported by nutrient-rich, well-structured soil</span>
            </div>
          </div>

          {/* Interactive Soil Horizon Callouts directly on the cutaway earth */}
          <div className="soil-callouts-overlay">
            {[
              { id: 'O', title: 'Organic Layer', sub: '(Humus)' },
              { id: 'A', title: 'Topsoil', sub: '(Rich in nutrients)' },
              { id: 'B', title: 'Subsoil', sub: '(Accumulation of minerals)' },
              { id: 'C', title: 'Parent Material', sub: '(Weathered rock)' },
              { id: 'R', title: 'Bedrock', sub: '' },
            ].map((h) => (
              <div
                key={h.id}
                className={`horizon-callout-item ${activeHorizon === h.id ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveHorizon(h.id)}
                onMouseLeave={() => setActiveHorizon(null)}
                onClick={() => openModal('horizon', h.id)}
                role="button"
                tabIndex={0}
                title={`Click to inspect ${h.title}`}
              >
                <div className="callout-dot-line">
                  <span className="callout-dot" />
                  <span className="callout-line" />
                </div>
                <div className="callout-text-group">
                  <span className="callout-title">{h.title}</span>
                  {h.sub && <span className="callout-sub">{h.sub}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Top Right: Soil Profile Card with Core Image & Horizon Buttons */}
          <div className="soil-profile-card">
            <div className="profile-card-header">Soil Profile</div>
            <div className="profile-card-body">
              <div className="profile-core-wrap">
                <img
                  src="/images/soil-profile-core.png"
                  alt="Soil Profile Core"
                  className="profile-core-img"
                />
              </div>
              <div className="profile-horizons-list">
                {[
                  { id: 'O', badgeClass: 'horizon-badge-o', title: 'Organic Layer', desc: 'Decomposed plant & animal matter' },
                  { id: 'A', badgeClass: 'horizon-badge-a', title: 'Topsoil', desc: 'Most nutrients, roots and microorganisms' },
                  { id: 'B', badgeClass: 'horizon-badge-b', title: 'Subsoil', desc: 'Accumulated clay, minerals and iron' },
                  { id: 'C', badgeClass: 'horizon-badge-c', title: 'Parent Material', desc: 'Partially weathered rock' },
                  { id: 'R', badgeClass: 'horizon-badge-r', title: 'Bedrock', desc: 'Solid rock' },
                ].map((hz) => (
                  <button
                    key={hz.id}
                    type="button"
                    className={`horizon-row-btn ${activeHorizon === hz.id ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveHorizon(hz.id)}
                    onMouseLeave={() => setActiveHorizon(null)}
                    onClick={() => openModal('horizon', hz.id)}
                    title={`Click to open deep dive for ${hz.title}`}
                  >
                    <span className={`horizon-badge ${hz.badgeClass}`}>{hz.id}</span>
                    <div className="horizon-row-text">
                      <span className="horizon-row-title">{hz.title}</span>
                      <span className="horizon-row-sub">{hz.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            2. MIDDLE GRID (Soil Composition, Soil Texture, Key Components)
            ────────────────────────────────────────────────────────────────── */}
        <Reveal dir="up" className="soilhealth-middle-grid">
          {/* 2A. SOIL COMPOSITION (SVG Donut Chart + Legend) */}
          <div className="soil-glass-panel">
            <div className="soil-panel-title-group">
              <span className="soil-panel-title">Soil Composition</span>
              <span className="soil-panel-sub">Typical composition of healthy soil (varies by region and land use).</span>
            </div>
            <div className="composition-chart-wrap">
              <div className="donut-svg-container">
                <svg viewBox="0 0 130 130" width="130" height="130" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                  {/* Mineral Particles: 45% (135.717 out of 301.593) */}
                  <circle
                    cx="65"
                    cy="65"
                    r="48"
                    fill="transparent"
                    stroke="#a87954"
                    strokeWidth={activeDonutSlice === 'mineral' ? 24 : 19}
                    strokeDasharray="135.717 301.593"
                    strokeDashoffset="0"
                    style={{ transition: 'stroke-width 0.2s ease, opacity 0.2s ease', cursor: 'pointer', opacity: activeDonutSlice && activeDonutSlice !== 'mineral' ? 0.6 : 1 }}
                    onMouseEnter={() => setActiveDonutSlice('mineral')}
                    onMouseLeave={() => setActiveDonutSlice(null)}
                    onClick={() => openModal('composition', 'mineral')}
                  />
                  {/* Organic Matter: 5% (15.080 out of 301.593) */}
                  <circle
                    cx="65"
                    cy="65"
                    r="48"
                    fill="transparent"
                    stroke="#4ade80"
                    strokeWidth={activeDonutSlice === 'organic' ? 24 : 19}
                    strokeDasharray="15.080 301.593"
                    strokeDashoffset="-135.717"
                    style={{ transition: 'stroke-width 0.2s ease, opacity 0.2s ease', cursor: 'pointer', opacity: activeDonutSlice && activeDonutSlice !== 'organic' ? 0.6 : 1 }}
                    onMouseEnter={() => setActiveDonutSlice('organic')}
                    onMouseLeave={() => setActiveDonutSlice(null)}
                    onClick={() => openModal('composition', 'organic')}
                  />
                  {/* Water: 25% (75.398 out of 301.593) */}
                  <circle
                    cx="65"
                    cy="65"
                    r="48"
                    fill="transparent"
                    stroke="#38bdf8"
                    strokeWidth={activeDonutSlice === 'water' ? 24 : 19}
                    strokeDasharray="75.398 301.593"
                    strokeDashoffset="-150.797"
                    style={{ transition: 'stroke-width 0.2s ease, opacity 0.2s ease', cursor: 'pointer', opacity: activeDonutSlice && activeDonutSlice !== 'water' ? 0.6 : 1 }}
                    onMouseEnter={() => setActiveDonutSlice('water')}
                    onMouseLeave={() => setActiveDonutSlice(null)}
                    onClick={() => openModal('composition', 'water')}
                  />
                  {/* Air: 25% (75.398 out of 301.593) */}
                  <circle
                    cx="65"
                    cy="65"
                    r="48"
                    fill="transparent"
                    stroke="#cbd5e1"
                    strokeWidth={activeDonutSlice === 'air' ? 24 : 19}
                    strokeDasharray="75.398 301.593"
                    strokeDashoffset="-226.195"
                    style={{ transition: 'stroke-width 0.2s ease, opacity 0.2s ease', cursor: 'pointer', opacity: activeDonutSlice && activeDonutSlice !== 'air' ? 0.6 : 1 }}
                    onMouseEnter={() => setActiveDonutSlice('air')}
                    onMouseLeave={() => setActiveDonutSlice(null)}
                    onClick={() => openModal('composition', 'air')}
                  />
                </svg>
                <div className="donut-center-label">
                  {activeDonutSlice === 'mineral' ? (
                    <>
                      <strong style={{ color: '#a87954' }}>45%</strong>
                      <span>Minerals</span>
                    </>
                  ) : activeDonutSlice === 'organic' ? (
                    <>
                      <strong style={{ color: '#4ade80' }}>5%</strong>
                      <span>Organic</span>
                    </>
                  ) : activeDonutSlice === 'water' ? (
                    <>
                      <strong style={{ color: '#38bdf8' }}>25%</strong>
                      <span>Water</span>
                    </>
                  ) : activeDonutSlice === 'air' ? (
                    <>
                      <strong style={{ color: '#cbd5e1' }}>25%</strong>
                      <span>Air</span>
                    </>
                  ) : (
                    <>
                      <strong>100%</strong>
                      <span>Soil</span>
                    </>
                  )}
                </div>
              </div>

              <div className="donut-legend-list">
                {[
                  { id: 'mineral', name: 'Mineral Particles', sub: '(Sand, silt, clay)', pct: '45%', color: '#a87954' },
                  { id: 'organic', name: 'Organic Matter', sub: '(Humus)', pct: '5%', color: '#4ade80' },
                  { id: 'water', name: 'Water', sub: '', pct: '25%', color: '#38bdf8' },
                  { id: 'air', name: 'Air', sub: '', pct: '25%', color: '#cbd5e1' },
                ].map((leg) => (
                  <div
                    key={leg.id}
                    className={`donut-legend-item ${activeDonutSlice === leg.id ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveDonutSlice(leg.id)}
                    onMouseLeave={() => setActiveDonutSlice(null)}
                    onClick={() => openModal('composition', leg.id)}
                    title={`Click for deep dive on ${leg.name}`}
                  >
                    <div className="legend-item-left">
                      <span className="legend-color-dot" style={{ background: leg.color }} />
                      <div className="legend-item-text">
                        <span className="legend-name">{leg.name}</span>
                        {leg.sub && <span className="legend-sub">{leg.sub}</span>}
                      </div>
                    </div>
                    <span className="legend-pct">{leg.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2B. SOIL TEXTURE (Based on particle size) */}
          <div className="soil-glass-panel">
            <div className="soil-panel-title-group">
              <span className="soil-panel-title">Soil Texture (Based on particle size)</span>
            </div>
            <div className="texture-cards-row">
              {[
                {
                  id: 'sandy',
                  title: 'Sandy Soil',
                  img: '/images/soil-texture-sandy.jpg',
                  bullets: ['Large particles', 'Low water holding', 'Good drainage'],
                },
                {
                  id: 'loamy',
                  title: 'Loamy Soil',
                  img: '/images/soil-texture-loamy.jpg',
                  bullets: ['Balanced mix', 'Good fertility', 'Ideal for agriculture'],
                },
                {
                  id: 'clayey',
                  title: 'Clayey Soil',
                  img: '/images/soil-texture-clayey.jpg',
                  bullets: ['Fine particles', 'High water holding', 'Nutrient rich but poor drainage'],
                },
              ].map((tx) => (
                <div
                  key={tx.id}
                  className="texture-sample-card"
                  onClick={() => openModal('texture', tx.id)}
                  title={`Click to explore ${tx.title}`}
                >
                  <div className="texture-thumb-wrap">
                    <img src={tx.img} alt={tx.title} className="texture-thumb-img" />
                  </div>
                  <h4 className="texture-title">{tx.title}</h4>
                  <ul className="texture-bullets">
                    {tx.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 2C. KEY COMPONENTS (2x2 Grid) */}
          <div className="soil-glass-panel">
            <div className="soil-panel-title-group">
              <span className="soil-panel-title">Key Components</span>
            </div>
            <div className="key-components-grid">
              <div className="component-card comp-minerals" onClick={() => openModal('component', 'minerals')}>
                <div className="comp-icon-box box-minerals">
                  <Sparkles size={16} />
                </div>
                <div className="comp-text-col">
                  <strong>Mineral Particles</strong>
                  <span>Provide structure and nutrients</span>
                </div>
              </div>
              <div className="component-card comp-organic" onClick={() => openModal('component', 'organic')}>
                <div className="comp-icon-box box-organic">
                  <Leaf size={16} />
                </div>
                <div className="comp-text-col">
                  <strong>Organic Matter</strong>
                  <span>Improves fertility, water retention</span>
                </div>
              </div>
              <div className="component-card comp-water" onClick={() => openModal('component', 'water')}>
                <div className="comp-icon-box box-water">
                  <Droplet size={16} />
                </div>
                <div className="comp-text-col">
                  <strong>Soil Water</strong>
                  <span>Dissolves nutrients for plant uptake</span>
                </div>
              </div>
              <div className="component-card comp-air" onClick={() => openModal('component', 'air')}>
                <div className="comp-icon-box box-air">
                  <Wind size={16} />
                </div>
                <div className="comp-text-col">
                  <strong>Soil Air</strong>
                  <span>Required for root and microbial respiration</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────────
            3. BOTTOM GRID (Soil Health Indicators + Why Soil Health Matters)
            ────────────────────────────────────────────────────────────────── */}
        <Reveal dir="up" className="soilhealth-bottom-grid">
          {/* 3A. SOIL HEALTH INDICATORS (Physical, Chemical, Biological) */}
          <div className="soil-glass-panel">
            <div className="soil-panel-title-group">
              <span className="soil-panel-title">Soil Health Indicators</span>
              <span className="soil-panel-sub">Healthy soil shows a good balance of physical, chemical and biological properties.</span>
            </div>
            <div className="indicators-subcards-row">
              <div className="indicator-category-card card-physical" onClick={() => openModal('indicator', 'physical')}>
                <div className="indicator-header">
                  <div className="indicator-icon-badge badge-physical">
                    <Layers size={14} />
                  </div>
                  <span className="indicator-title">Physical Health</span>
                </div>
                <ul className="indicator-bullets">
                  <li>Good structure</li>
                  <li>Proper porosity</li>
                  <li>Water infiltration</li>
                  <li>Resistance to erosion</li>
                </ul>
              </div>

              <div className="indicator-category-card card-chemical" onClick={() => openModal('indicator', 'chemical')}>
                <div className="indicator-header">
                  <div className="indicator-icon-badge badge-chemical">
                    <FlaskConical size={14} />
                  </div>
                  <span className="indicator-title">Chemical Health</span>
                </div>
                <ul className="indicator-bullets">
                  <li>Balanced pH (6.0 – 7.5)</li>
                  <li>Adequate nutrients (N, P, K)</li>
                  <li>Low toxic elements</li>
                  <li>Good cation exchange capacity</li>
                </ul>
              </div>

              <div className="indicator-category-card card-biological" onClick={() => openModal('indicator', 'biological')}>
                <div className="indicator-header">
                  <div className="indicator-icon-badge badge-biological">
                    <Bug size={14} />
                  </div>
                  <span className="indicator-title">Biological Health</span>
                </div>
                <ul className="indicator-bullets">
                  <li>Diverse soil organisms (bacteria, fungi, earthworms)</li>
                  <li>Active decomposition</li>
                  <li>High organic matter</li>
                  <li>Supports nutrient cycling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3B. WHY SOIL HEALTH MATTERS? (4 Pillars) */}
          <div className="soil-glass-panel">
            <div className="soil-panel-title-group">
              <span className="soil-panel-title">Why Soil Health Matters?</span>
            </div>
            <div className="matters-columns-row">
              <div className="matter-pillar-card" onClick={() => openModal('importance', 'food')}>
                <div className="matter-icon-wrap" style={{ color: '#4ade80' }}>
                  <Sprout size={20} />
                </div>
                <span className="matter-desc">Sustains crop production and food security</span>
              </div>

              <div className="matter-pillar-card" onClick={() => openModal('importance', 'water')}>
                <div className="matter-icon-wrap" style={{ color: '#38bdf8' }}>
                  <Droplet size={20} />
                </div>
                <span className="matter-desc">Regulates water cycle and reduces flooding</span>
              </div>

              <div className="matter-pillar-card" onClick={() => openModal('importance', 'carbon')}>
                <div className="matter-icon-wrap" style={{ color: '#cbd5e1' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, border: '1.5px solid #94a3b8', borderRadius: 4, padding: '1px 3px', lineHeight: 1 }}>CO₂</div>
                </div>
                <span className="matter-desc">Stores carbon and helps mitigate climate change</span>
              </div>

              <div className="matter-pillar-card" onClick={() => openModal('importance', 'biodiversity')}>
                <div className="matter-icon-wrap" style={{ color: '#4ade80' }}>
                  <Leaf size={20} />
                </div>
                <span className="matter-desc">Supports biodiversity and healthy ecosystems</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────────
            4. BOTTOM NAVIGATION BAR
            ────────────────────────────────────────────────────────────────── */}
        <div className="soilhealth-bottom-bar">
          <button type="button" className="nav-prev-link-btn" onClick={onPrev}>
            <span className="nav-circle-arrow"><ArrowLeft size={16} /></span>
            <div className="nav-prev-text-col">
              <span className="nav-prev-heading">Previous</span>
              <span className="nav-prev-sub">Land-Use Change</span>
            </div>
          </button>

          <div className="nav-center-dots-group">
            {Array.from({ length: 15 }).map((_, idx) => (
              <span
                key={idx}
                className={`nav-chap-dot ${idx === 10 ? 'is-active-dot' : ''}`}
                title={`Chapter ${idx + 1}`}
              />
            ))}
          </div>

          <button type="button" className="nav-next-gold-pill" onClick={onNext}>
            <div className="nav-next-text-col">
              <span className="nav-next-heading">Next</span>
              <span className="nav-next-sub">Land Degradation</span>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          5. MODAL SYSTEM WITH AIRTIGHT SCROLL-LOCK (PORTAL TO DOCUMENT.BODY)
          ────────────────────────────────────────────────────────────────── */}
      {activeModal &&
        createPortal(
          <div
            className="soilhealth-modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="soilhealth-modal-window">
              {/* MODAL: SOIL HORIZONS DEEP DIVE */}
              {activeModal === 'horizon' && (() => {
                const hz = horizonsData[selectedModalItem] || horizonsData['O'];
                const curIdx = horizonOrder.indexOf(selectedModalItem);
                return (
                  <>
                    <div className="soilhealth-modal-header">
                      <div className="soilhealth-modal-title-wrap">
                        <div className={`soilhealth-modal-icon-badge ${hz.badgeClass}`}>
                          <span style={{ fontSize: 16, fontWeight: 800 }}>{hz.code}</span>
                        </div>
                        <div className="soilhealth-modal-title-col">
                          <span className="soilhealth-modal-tag">SOIL HORIZON DEEP DIVE</span>
                          <h3 className="soilhealth-modal-title">{hz.name}</h3>
                        </div>
                      </div>
                      <button type="button" className="soilhealth-modal-close-btn" onClick={closeModal}>
                        <X size={18} />
                      </button>
                    </div>

                    <div className="soilhealth-modal-body">
                      <div className="soilhealth-modal-overview-box">
                        <strong>Overview: </strong> {hz.functionDesc}
                      </div>

                      <div className="soilhealth-modal-stats-grid">
                        <div className="soilhealth-stat-pill">
                          <span>TYPICAL DEPTH</span>
                          <strong>{hz.depth}</strong>
                        </div>
                        <div className="soilhealth-stat-pill">
                          <span>BIOLOGICAL ACTIVITY</span>
                          <strong>{hz.bioActivity.split(' ')[0]} Active</strong>
                        </div>
                        <div className="soilhealth-stat-pill">
                          <span>HORIZON CLASSIFICATION</span>
                          <strong>Master Horizon {hz.code}</strong>
                        </div>
                      </div>

                      <div className="soilhealth-modal-curriculum">
                        <strong>Pedological &amp; Agronomic Significance:</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                          <strong>Composition:</strong> {hz.composition}
                        </p>
                        <p style={{ margin: '6px 0 0 0' }}>
                          <strong>Biological Activity:</strong> {hz.bioActivity}
                        </p>
                        <p style={{ margin: '6px 0 0 0' }}>
                          <strong>Sustainable Management:</strong> {hz.management}
                        </p>
                      </div>
                    </div>

                    <div className="soilhealth-modal-footer">
                      <button
                        type="button"
                        className="soilhealth-modal-cycle-btn"
                        onClick={() => {
                          const prev = (curIdx - 1 + horizonOrder.length) % horizonOrder.length;
                          setSelectedModalItem(horizonOrder[prev]);
                        }}
                      >
                        <ChevronLeft size={14} /> Previous Horizon
                      </button>
                      <button
                        type="button"
                        className="soilhealth-modal-cycle-btn"
                        onClick={() => {
                          const next = (curIdx + 1) % horizonOrder.length;
                          setSelectedModalItem(horizonOrder[next]);
                        }}
                      >
                        Next Horizon <ChevronRight size={14} />
                      </button>
                    </div>
                  </>
                );
              })()}

              {/* MODAL: SOIL COMPOSITION DEEP DIVE */}
              {activeModal === 'composition' && (
                <>
                  <div className="soilhealth-modal-header">
                    <div className="soilhealth-modal-title-wrap">
                      <div className="soilhealth-modal-icon-badge" style={{ background: 'rgba(234,179,8,0.2)', color: '#facc15' }}>
                        <BarChart3 size={18} />
                      </div>
                      <div className="soilhealth-modal-title-col">
                        <span className="soilhealth-modal-tag">SOIL SCIENCE SOCIETY OF AMERICA (SSSA)</span>
                        <h3 className="soilhealth-modal-title">Ideal Soil Volumetric Composition</h3>
                      </div>
                    </div>
                    <button type="button" className="soilhealth-modal-close-btn" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>

                  <div className="soilhealth-modal-body">
                    <div className="soilhealth-modal-overview-box">
                      In an ideal agricultural silt-loam soil under optimal conditions for crop growth, the total soil volume is composed of <strong>50% solid matrix</strong> and <strong>50% pore space</strong>. The pore space is dynamically shared equally between soil water and soil air.
                    </div>

                    <div className="soilhealth-modal-stats-grid">
                      <div className="soilhealth-stat-pill">
                        <span>MINERAL MATRIX</span>
                        <strong>45% Total Volume</strong>
                      </div>
                      <div className="soilhealth-stat-pill">
                        <span>ORGANIC HUMUS</span>
                        <strong>5% Total Volume</strong>
                      </div>
                      <div className="soilhealth-stat-pill">
                        <span>PORE SPACE (AIR + WATER)</span>
                        <strong>50% Total Volume</strong>
                      </div>
                    </div>

                    <div className="soilhealth-modal-curriculum">
                      <strong>Detailed Volumetric Breakdown:</strong>
                      <ul style={{ margin: '6px 0 0 0', paddingLeft: 18, lineHeight: 1.6 }}>
                        <li><strong>45% Mineral Particles:</strong> Weathered fragments of quartz, feldspar, mica, and secondary clay minerals. Determines textural class and stores structural mineral nutrients.</li>
                        <li><strong>5% Soil Organic Matter (SOM):</strong> Composed of 80% humus, 10% active roots, and 10% living soil biota. Drives water-holding capacity, cation exchange capacity, and aggregate stability.</li>
                        <li><strong>25% Soil Solution (Water):</strong> Held in capillary micropores, carrying dissolved nitrates, phosphates, calcium, magnesium, and trace elements essential for osmotic plant uptake.</li>
                        <li><strong>25% Soil Atmosphere (Air):</strong> Fills macropores, providing oxygen for aerobic plant root respiration and heterotrophic microbial decomposition. Contains 10–100× higher CO2 concentrations than atmospheric air due to soil respiration.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="soilhealth-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>BCV755B Natural Resource Principles</span>
                    <button type="button" className="soilhealth-modal-cycle-btn" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* MODAL: SOIL TEXTURE DEEP DIVE */}
              {activeModal === 'texture' && (() => {
                const tx = texturesData[selectedModalItem] || texturesData['loamy'];
                const curIdx = textureOrder.indexOf(selectedModalItem);
                return (
                  <>
                    <div className="soilhealth-modal-header">
                      <div className="soilhealth-modal-title-wrap">
                        <div className="soilhealth-modal-icon-badge" style={{ background: 'rgba(234,179,8,0.2)', color: '#facc15' }}>
                          <Mountain size={18} />
                        </div>
                        <div className="soilhealth-modal-title-col">
                          <span className="soilhealth-modal-tag">USDA SOIL TEXTURAL CLASSIFICATION</span>
                          <h3 className="soilhealth-modal-title">{tx.title}</h3>
                        </div>
                      </div>
                      <button type="button" className="soilhealth-modal-close-btn" onClick={closeModal}>
                        <X size={18} />
                      </button>
                    </div>

                    <div className="soilhealth-modal-body">
                      <div className="soilhealth-modal-overview-box">
                        <strong>Overview: </strong> {tx.description}
                      </div>

                      <div className="soilhealth-modal-stats-grid">
                        <div className="soilhealth-stat-pill">
                          <span>PARTICLE SIZE</span>
                          <strong>{tx.particleSize.split(' ')[0]}</strong>
                        </div>
                        <div className="soilhealth-stat-pill">
                          <span>HYDRAULIC CONDUCTIVITY</span>
                          <strong>{tx.permeability.split(' ')[0]}</strong>
                        </div>
                        <div className="soilhealth-stat-pill">
                          <span>FERTILITY &amp; CEC</span>
                          <strong>{tx.fertility.split(' ')[0]}</strong>
                        </div>
                      </div>

                      <div className="soilhealth-modal-curriculum">
                        <strong>Hydraulic &amp; Agricultural Attributes:</strong>
                        <p style={{ margin: '4px 0 0 0' }}>
                          <strong>Permeability Rate:</strong> {tx.permeability}
                        </p>
                        <p style={{ margin: '6px 0 0 0' }}>
                          <strong>Water-Holding Capacity:</strong> {tx.waterHolding}
                        </p>
                        <p style={{ margin: '6px 0 0 0' }}>
                          <strong>Soil Aeration &amp; Porosity:</strong> {tx.aeration}
                        </p>
                        <p style={{ margin: '6px 0 0 0' }}>
                          <strong>Recommended Crops:</strong> {tx.idealCrops}
                        </p>
                      </div>
                    </div>

                    <div className="soilhealth-modal-footer">
                      <button
                        type="button"
                        className="soilhealth-modal-cycle-btn"
                        onClick={() => {
                          const prev = (curIdx - 1 + textureOrder.length) % textureOrder.length;
                          setSelectedModalItem(textureOrder[prev]);
                        }}
                      >
                        <ChevronLeft size={14} /> Previous Texture
                      </button>
                      <button
                        type="button"
                        className="soilhealth-modal-cycle-btn"
                        onClick={() => {
                          const next = (curIdx + 1) % textureOrder.length;
                          setSelectedModalItem(textureOrder[next]);
                        }}
                      >
                        Next Texture <ChevronRight size={14} />
                      </button>
                    </div>
                  </>
                );
              })()}

              {/* MODAL: KEY COMPONENTS */}
              {activeModal === 'component' && (
                <>
                  <div className="soilhealth-modal-header">
                    <div className="soilhealth-modal-title-wrap">
                      <div className="soilhealth-modal-icon-badge" style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80' }}>
                        <Sparkles size={18} />
                      </div>
                      <div className="soilhealth-modal-title-col">
                        <span className="soilhealth-modal-tag">ESSENTIAL MATRIX</span>
                        <h3 className="soilhealth-modal-title">The Four Vital Soil Components</h3>
                      </div>
                    </div>
                    <button type="button" className="soilhealth-modal-close-btn" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>

                  <div className="soilhealth-modal-body">
                    <div className="soilhealth-modal-overview-box">
                      Soil is not inert dirt — it is a living, breathing bio-physicochemical matrix where the lithosphere, atmosphere, hydrosphere, and biosphere converge.
                    </div>

                    <div className="soilhealth-modal-stats-grid">
                      <div className="soilhealth-stat-pill">
                        <span>MINERAL FRACTION</span>
                        <strong>Structure &amp; Nutrients</strong>
                      </div>
                      <div className="soilhealth-stat-pill">
                        <span>ORGANIC MATTER</span>
                        <strong>Fertility &amp; Sponginess</strong>
                      </div>
                      <div className="soilhealth-stat-pill">
                        <span>FLUID MATRIX</span>
                        <strong>Gas &amp; Solute Transport</strong>
                      </div>
                    </div>

                    <div className="soilhealth-modal-curriculum">
                      <strong>Ecological Roles in Natural Resource Conservation:</strong>
                      <ul style={{ margin: '6px 0 0 0', paddingLeft: 18, lineHeight: 1.6 }}>
                        <li><strong>Mineral Particles (Sand, Silt, Clay):</strong> Form the skeletal structure of soil, providing anchor support for root systems and continuous slow release of weathering mineral ions (K+, Ca2+, Mg2+, Fe3+).</li>
                        <li><strong>Organic Matter (Humus):</strong> Binds individual mineral particles into stable water-resistant aggregates, stores up to 20× its weight in water, and provides food for billions of beneficial microbes.</li>
                        <li><strong>Soil Water:</strong> Acts as the universal biochemical solvent. Without water film, roots cannot take up dissolved minerals via mass flow and diffusion.</li>
                        <li><strong>Soil Air:</strong> Supplies vital oxygen to aerobic fungi, actinomycetes, and plant root mitochondria, while venting excessive carbon dioxide out to the atmosphere.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="soilhealth-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Soil Science Principles</span>
                    <button type="button" className="soilhealth-modal-cycle-btn" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* MODAL: SOIL HEALTH INDICATORS */}
              {activeModal === 'indicator' && (() => {
                const ind = indicatorsData[selectedModalItem] || indicatorsData['physical'];
                const curIdx = indicatorOrder.indexOf(selectedModalItem);
                return (
                  <>
                    <div className="soilhealth-modal-header">
                      <div className="soilhealth-modal-title-wrap">
                        <div className="soilhealth-modal-icon-badge" style={{ background: 'rgba(56,189,248,0.2)', color: '#38bdf8' }}>
                          <Activity size={18} />
                        </div>
                        <div className="soilhealth-modal-title-col">
                          <span className="soilhealth-modal-tag">SOIL QUALITY ASSESSMENT FRAMEWORK</span>
                          <h3 className="soilhealth-modal-title">{ind.title}</h3>
                        </div>
                      </div>
                      <button type="button" className="soilhealth-modal-close-btn" onClick={closeModal}>
                        <X size={18} />
                      </button>
                    </div>

                    <div className="soilhealth-modal-body">
                      <div className="soilhealth-modal-overview-box">
                        <strong>Focus Domain: </strong> {ind.domain}. A balanced assessment across physical, chemical, and biological indicators is essential to quantify sustainable soil function.
                      </div>

                      <div className="soilhealth-modal-stats-grid">
                        <div className="soilhealth-stat-pill">
                          <span>PRIMARY TARGET</span>
                          <strong>{ind.title.split(' ')[0]} Balance</strong>
                        </div>
                        <div className="soilhealth-stat-pill">
                          <span>ASSESSMENT STANDARD</span>
                          <strong>USDA / FAO Criteria</strong>
                        </div>
                        <div className="soilhealth-stat-pill">
                          <span>RESTORATION PERIOD</span>
                          <strong>2 – 5 Years Minimum</strong>
                        </div>
                      </div>

                      <div className="soilhealth-modal-curriculum">
                        <strong>Standard Field &amp; Laboratory Diagnostic Tests:</strong>
                        <ul style={{ margin: '6px 0 0 0', paddingLeft: 18, lineHeight: 1.5 }}>
                          {ind.keyTests.map((t, idx) => (
                            <li key={idx}><strong>{t}</strong></li>
                          ))}
                        </ul>
                        <p style={{ margin: '10px 0 0 0' }}>
                          <strong>Target Healthy Range:</strong> {ind.healthyRange}
                        </p>
                        <p style={{ margin: '8px 0 0 0' }}>
                          <strong>Recommended Management Strategy:</strong> {ind.managementAction}
                        </p>
                      </div>
                    </div>

                    <div className="soilhealth-modal-footer">
                      <button
                        type="button"
                        className="soilhealth-modal-cycle-btn"
                        onClick={() => {
                          const prev = (curIdx - 1 + indicatorOrder.length) % indicatorOrder.length;
                          setSelectedModalItem(indicatorOrder[prev]);
                        }}
                      >
                        <ChevronLeft size={14} /> Previous Domain
                      </button>
                      <button
                        type="button"
                        className="soilhealth-modal-cycle-btn"
                        onClick={() => {
                          const next = (curIdx + 1) % indicatorOrder.length;
                          setSelectedModalItem(indicatorOrder[next]);
                        }}
                      >
                        Next Domain <ChevronRight size={14} />
                      </button>
                    </div>
                  </>
                );
              })()}

              {/* MODAL: WHY SOIL HEALTH MATTERS */}
              {activeModal === 'importance' && (
                <>
                  <div className="soilhealth-modal-header">
                    <div className="soilhealth-modal-title-wrap">
                      <div className="soilhealth-modal-icon-badge" style={{ background: 'rgba(74,222,128,0.2)', color: '#4ade80' }}>
                        <Globe size={18} />
                      </div>
                      <div className="soilhealth-modal-title-col">
                        <span className="soilhealth-modal-tag">GLOBAL ECOSYSTEM SERVICES</span>
                        <h3 className="soilhealth-modal-title">Why Soil Health Matters for Planetary Survival</h3>
                      </div>
                    </div>
                    <button type="button" className="soilhealth-modal-close-btn" onClick={closeModal}>
                      <X size={18} />
                    </button>
                  </div>

                  <div className="soilhealth-modal-body">
                    <div className="soilhealth-modal-overview-box">
                      Soil is the foundation of terrestrial life on Earth. Healthy living soil provides four irreplaceable ecosystem services that sustain civilization and mitigate planetary crises.
                    </div>

                    <div className="soilhealth-modal-stats-grid">
                      <div className="soilhealth-stat-pill">
                        <span>GLOBAL CALORIES</span>
                        <strong>95% from Soil</strong>
                      </div>
                      <div className="soilhealth-stat-pill">
                        <span>CARBON POOL</span>
                        <strong>2,500 Gt Carbon</strong>
                      </div>
                      <div className="soilhealth-stat-pill">
                        <span>MICROBIAL DIVERSITY</span>
                        <strong>&gt; 1 Billion / g</strong>
                      </div>
                    </div>

                    <div className="soilhealth-modal-curriculum">
                      <strong>The Four Fundamental Pillars:</strong>
                      <ul style={{ margin: '6px 0 0 0', paddingLeft: 18, lineHeight: 1.6 }}>
                        <li><strong>1. Food Security:</strong> 95% of our global food supply originates directly or indirectly from soils. Degradation directly threatens UN SDG 2 (Zero Hunger).</li>
                        <li><strong>2. Hydrological Regulation:</strong> Every 1% increase in soil organic matter enables an acre of soil to hold an additional 20,000 gallons of water, dramatically buffering against both devastating floods and severe droughts.</li>
                        <li><strong>3. Climate Change Mitigation:</strong> Soil organic matter holds 2,500 billion tons of carbon — more than the atmosphere and all living plant biomass combined. Regenerative soil practices turn farmland into major global carbon sinks.</li>
                        <li><strong>4. Biodiversity Reservoir:</strong> A single teaspoon of fertile topsoil contains more living organisms than there are humans on Earth, providing critical pharmaceutical compounds, biocontrol agents, and genetic resilience.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="soilhealth-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>UN SDG 2 &amp; SDG 15 Framework</span>
                    <button type="button" className="soilhealth-modal-cycle-btn" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}


// SCREEN 12: LAND / SOIL DEGRADATION — Interactive Replica
