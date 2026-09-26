import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Droplet, Trees, ArrowRight, ArrowLeft, Wheat, Layers, Activity, Sprout, X, Leaf, MapPin, Cloud, TreePine, RotateCw, ShieldCheck } from 'lucide-react';
import '../../soilconservation.css';
import { TiltCard, Reveal } from './motion';

export default function SoilConservationScreen({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Modal states: 'strategy' | 'benefit' | 'nilgiris' | null
  const [activeModal, setActiveModal] = useState<'strategy' | 'benefit' | 'nilgiris' | null>(null);
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);
  const [selectedBenefitId, setSelectedBenefitId] = useState<string | null>(null);

  const openStrategyModal = (id: string) => {
    setSelectedStrategyId(id);
    setActiveModal('strategy');
  };

  const openBenefitModal = (id: string) => {
    setSelectedBenefitId(id);
    setActiveModal('benefit');
  };

  const openNilgirisModal = () => {
    setActiveModal('nilgiris');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Slider drag interaction handlers
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(96, Math.max(4, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleSliderMove(e.touches[0].clientX);
    };
    const onStopDrag = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('mouseup', onStopDrag);
      window.addEventListener('touchend', onStopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onStopDrag);
      window.removeEventListener('touchend', onStopDrag);
    };
  }, [isDragging]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (!activeModal) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (window.__lenis) {
      window.__lenis.stop();
    }

    const handleCaptureWheel = (e: WheelEvent) => {
      const modalDialog = document.querySelector('.soilcons-modal-dialog');
      if (modalDialog && modalDialog.contains(e.target as Node)) {
        const scrollable = modalDialog.querySelector('.soilcons-modal-scrollable') as HTMLElement | null;
        if (scrollable) {
          // If cursor is on modal header, footer, or dialog border, route scroll to scrollable area
          if (e.target !== scrollable && !scrollable.contains(e.target as Node)) {
            scrollable.scrollTop += e.deltaY;
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          const atTop = scrollable.scrollTop === 0 && e.deltaY < 0;
          const atBottom =
            Math.abs(scrollable.scrollHeight - scrollable.clientHeight - scrollable.scrollTop) <= 1 &&
            e.deltaY > 0;
          if (atTop || atBottom) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      } else {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest('.soilcons-modal-scrollable')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('wheel', handleCaptureWheel, { passive: false, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener('wheel', handleCaptureWheel, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  
  // Pedagogical Database: 8 Key Strategies
  
  const strategiesList = [
    {
      id: 'afforestation',
      num: 1,
      title: 'Afforestation',
      color: '#4ade80',
      icon: TreePine,
      short: 'Planting trees to stabilize soil and reduce erosion.',
      mechanisms:
        'Tree root networks form a three-dimensional mechanical anchor within the upper 1.5–3m of the regolith, greatly increasing soil shear resistance and slope stability. Tree canopies intercept raindrops, reducing splash detachment by up to 90%, while leaf litter contributes to a deep protective humus layer.',
      calculation:
        'Reduces the Universal Soil Loss Equation (USLE) Cover Management C-factor from 1.0 (bare earth) to 0.001–0.005 in dense native closed-canopy forest stands.',
      guidelines:
        'Prioritize native indigenous species (e.g. Acacia, Neem, Shola forest taxa); plant along contour lines on slopes exceeding 15%; establish multi-canopy tier spacing.',
      caseStudy:
        'Karnataka Western Ghats Catchment Afforestation: Increased perennial spring discharge duration by 45 days and halted monsoon gully advancement.',
    },
    {
      id: 'cover-cropping',
      num: 2,
      title: 'Cover Cropping',
      color: '#38bdf8',
      icon: Sprout,
      short: 'Growing plants to protect soil surface and add organic matter.',
      mechanisms:
        'Non-cash crops grown between primary cultivation cycles provide 100% ground canopy cover during vulnerable fallow seasons. Living roots continuously exude carbon compounds that stimulate mycorrhizal fungi and glomalin production, binding soil particles into water-stable aggregates.',
      calculation:
        'Symbiotic Rhizobium bacteria in leguminous cover crops fix 50–150 kg of atmospheric nitrogen per hectare annually, cutting synthetic fertilizer needs and boosting Soil Organic Carbon (SOC) by 0.6–1.2 t/ha/yr.',
      guidelines:
        'Species include Sunn Hemp (Crotalaria juncea), Dhaincha (Sesbania bispinosa), Cowpea, and Rye. Terminate mechanically with a roller-crimper to create an in-situ protective mulch blanket.',
      caseStudy:
        'Punjab Green Manuring Initiative: Lowered topsoil compaction, improved soil moisture retention by 22%, and curbed secondary salinization.',
    },
    {
      id: 'contour-farming',
      num: 3,
      title: 'Contour Farming',
      color: '#f59e0b',
      icon: Activity,
      short: 'Ploughing along contours to reduce water runoff.',
      mechanisms:
        'Plowing, harrowing, and planting are conducted along lines of equal elevation (perpendicular to slope gradient). Each ridge furrow acts as an elongated micro-dam that captures sheet runoff, slowing down water velocity below erosive thresholds and enabling deep vertical infiltration.',
      calculation:
        'Reduces surface runoff volume by 30–50% and slashes annual topsoil detachment by half (USLE Practice P-factor = 0.50 compared to 1.0 for up-and-down slope cultivation).',
      guidelines:
        'Optimum for slopes between 2% and 10%. Furrows must be carefully laid out using an A-frame or dumpy level; reinforce with vegetative Vetiver grass contour barrier strips.',
      caseStudy:
        'Deccan Plateau Dryland Watersheds: Contour-furrowed rainfed plots recorded a 35% yield increase in sorghum and groundnut during low-rainfall seasons.',
    },
    {
      id: 'terracing',
      num: 4,
      title: 'Terracing',
      color: '#a855f7',
      icon: Layers,
      short: 'Creating stepped fields on slopes to prevent soil erosion.',
      mechanisms:
        'Converts steep hillside gradients into a stepped series of broad, horizontal or reverse-sloped flat platforms separated by nearly vertical retaining risers. This completely breaks slope length (L) and slope gradient (S), neutralizing gravity-driven sediment transport.',
      calculation:
        'Reduces the combined topographic LS factor in USLE by over 80%, virtually eliminating rill and gully erosion on mountainsides with slopes up to 35°.',
      guidelines:
        'Construct bench terraces with stone-pitched or grass-stabilized risers; ensure a slight inward gradient (0.5–1%) leading to stone-lined drainage disposal channels.',
      caseStudy:
        'Nilgiris Vegetable & Tea Terracing (Tamil Nadu): Reclaimed hundreds of hectares of eroded slopes, lowering sediment yields into hydel reservoirs by 85%.',
    },
    {
      id: 'crop-rotation',
      num: 5,
      title: 'Crop Rotation',
      color: '#06b6d4',
      icon: RotateCw,
      short: 'Alternating crops to maintain soil fertility and reduce pests.',
      mechanisms:
        'Systematic sequential cultivation of plant species from differing botanical families in the same field. Rotates varying root architectural depths (deep taproots vs shallow fibrous systems), balances nutrient extraction profiles, and disrupts host-specific pest and pathogen reproductive cycles.',
      calculation:
        'Increases subsequent grain crop yields by 10–25% (the agronomic "rotation effect") while reducing pest-induced crop losses by up to 40% without chemical insecticides.',
      guidelines:
        'Employ 3-to-4 year rotations: Deep-rooted legume (Pigeon pea) -> Heavy feeder cereal (Wheat/Maize) -> Light feeder oilseed (Mustard) -> Shallow-rooted restorative pulse.',
      caseStudy:
        'Indo-Gangetic Plain Rice-Wheat Diversification: Incorporating mung bean into the cycle restored active bacterial-fungal ratios and arrested zinc deficiencies.',
    },
    {
      id: 'mulching',
      num: 6,
      title: 'Mulching',
      color: '#ea580c',
      icon: Leaf,
      short: 'Covering soil with organic material to retain moisture and prevent erosion.',
      mechanisms:
        'Spreading a uniform layer of plant residues (paddy straw, sugarcane bagasse, dry leaves, compost) directly onto bare soil. Insulates the topsoil from solar radiation, minimizes evaporative moisture loss, prevents surface crusting, and feeds soil microfauna.',
      calculation:
        'Reduces soil evaporation by 30–45%, buffers diurnal topsoil temperature fluctuations by 5–8°C, and dampens kinetic raindrop impact energy to near zero.',
      guidelines:
        'Apply an organic mulch layer 5–10 cm thick; avoid placing mulch in direct contact with plant stems to prevent fungal damping-off; practice stubble mulching in dryland zones.',
      caseStudy:
        'Maharashtra Rainfed Cotton & Horticulture: Trash mulching saved 3–4 protective irrigations per season and prevented wind-blown topsoil detachment.',
    },
    {
      id: 'windbreaks',
      num: 7,
      title: 'Windbreaks',
      color: '#8b5cf6',
      icon: Trees,
      short: 'Planting shelterbelts to reduce wind erosion.',
      mechanisms:
        'Multi-row barrier plantings of trees and shrubs oriented perpendicular to prevailing erosive winds. Lifts the turbulent atmospheric boundary layer upward and dissipates wind shear velocity near the surface below the threshold friction velocity required to dislodge sand/silt grains.',
      calculation:
        'Provides effective wind velocity reduction over a downwind horizontal distance equal to 15 to 20 times the mature height (H) of the tallest tree row.',
      guidelines:
        'Design with 40–50% optical porosity (semi-permeable barrier to avoid downwind turbulence vortexes); utilize a 3-tier structure: tall trees (central), medium trees, and dense outer shrubs.',
      caseStudy:
        'Thar Desert Border Shelterbelts (Rajasthan): Extensive Casuarina and Acacia tortilis belts arrested shifting sand dune encroachment across agricultural canal commands.',
    },
    {
      id: 'sustainable-grazing',
      num: 8,
      title: 'Sustainable Grazing',
      color: '#ef4444',
      icon: ShieldCheck,
      short: 'Controlled grazing to prevent overgrazing and maintain vegetation.',
      mechanisms:
        'Planned rotational stocking that controls livestock residence time and animal density. Animals are grazed on a paddock for 1–3 days and then rotated off, allowing pasture plants 30–90 days of undisturbed vegetative and root recovery before re-grazing.',
      calculation:
        'Maintains grassland basal vegetative cover above 70%, preventing severe soil compaction (bulk density increases) and preserving rainfall infiltration capacity above 45 mm/hr.',
      guidelines:
        'Divide rangeland into 8–16 distinct paddocks; enforce scientific carrying capacity thresholds based on Animal Unit Months (AUM); install off-stream watering points.',
      caseStudy:
        'Kutch Grassland Restoration (Gujarat): Rotational grazing combined with Banni grassland reseeding doubled forage availability and reversed desertification.',
    },
  ];

  
  // Pedagogical Database: 4 Key Benefits
  
  const benefitsList = [
    {
      id: 'fertility',
      title: 'Maintains Soil Fertility',
      color: '#4ade80',
      icon: Sprout,
      short: 'Supports long-term agricultural productivity.',
      details:
        'Conserves the vital organic topsoil (O & A horizons) containing dynamic microbial biomass, essential nitrogen-phosphorus-potassium pools, and humic matter. Prevents acidification, nutrient depletion, and biological sterilization.',
      stat: 'Generations of secure, high-yield agriculture without progressive yield collapses.',
    },
    {
      id: 'erosion',
      title: 'Reduces Soil Erosion',
      color: '#38bdf8',
      icon: Droplet,
      short: 'Protects topsoil from wind and water loss.',
      details:
        'Arrests soil particle detachment caused by torrential raindrop splash and surface runoff shear. Preserves the natural pedological profile that requires centuries to generate just 1 cm of topsoil.',
      stat: 'Cuts annual erosion rates from >30 t/ha/yr to natural tolerable limits (<2 t/ha/yr).',
    },
    {
      id: 'carbon',
      title: 'Enhances Carbon Storage',
      color: '#fbbf24',
      icon: Cloud,
      short: 'Helps mitigate climate change.',
      details:
        'Undisturbed soils with continuous vegetative cover maximize soil organic carbon (SOC) sequestration, converting atmospheric CO2 into long-lived glomalin, humic acid, and deep root residues.',
      stat: 'Agricultural soils under conservation sequester 0.4 to 1.2 metric tons of carbon/ha/year.',
    },
    {
      id: 'biodiversity',
      title: 'Supports Biodiversity',
      color: '#c084fc',
      icon: TreePine,
      short: 'Maintains healthy ecosystems and habitats.',
      details:
        'Vegetative shelterbelts, contour hedgerows, and minimal disturbance create resilient microhabitats for beneficial pollinators, predatory insects, earthworms, mycorrhizal networks, and avian fauna.',
      stat: 'Boosts soil microbial diversity and micro-arthropod populations by over 300%.',
    },
  ];

  const activeStrategy = strategiesList.find((s) => s.id === selectedStrategyId);
  const activeBenefit = benefitsList.find((b) => b.id === selectedBenefitId);

  return (
    <section className="land-screen land-soilcons-screen" id="ch-soilconservation">
      {/* ─── Landscape Backdrop ─── */}
      <div className="soilcons-backdrop-wrap">
        <div
          className="soilcons-backdrop-img"
          style={{ backgroundImage: `url('/images/conservation-hero-clean.jpg')` }}
        />
        <div className="soilcons-backdrop-scrim" />
      </div>

      <div className="soilcons-container">
        {/* ─── 1. Header Block ─── */}
        <div className="soilcons-header-row">
          <div className="soilcons-header-left">
            <span className="soilcons-eyebrow">MODULE 01 | CHAPTER 13</span>
            <h2 className="soilcons-title">
              Soil <em>Conservation</em>
            </h2>
            <h3 className="soilcons-subtitle">Protecting today for a fertile tomorrow.</h3>
            <p className="soilcons-lead-text">
              Soil conservation includes practices and strategies to prevent soil degradation, maintain
              soil fertility and ensure the sustainable use of land for future generations.
            </p>
          </div>

          {/* Top-Right Floating Badges */}
          <div className="soilcons-status-badges">
            <div className="soilcons-status-badge">
              <div className="soilcons-badge-icon badge-icon-green">
                <Leaf size={18} />
              </div>
              <div className="soilcons-badge-info">
                <span className="soilcons-badge-title">Conserved Land</span>
                <span className="soilcons-badge-desc">Healthy soil &bull; Higher productivity</span>
              </div>
            </div>

            <div className="soilcons-status-badge">
              <div className="soilcons-badge-icon badge-icon-amber">
                <Sprout size={18} />
              </div>
              <div className="soilcons-badge-info">
                <span className="soilcons-badge-title">Sustainable Future</span>
                <span className="soilcons-badge-desc">Food security &bull; Resilient ecosystems</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 2. Main Two-Column Layout ─── */}
        <div className="soilcons-main-grid">
          {/* Left Column: Interactive Farm + Benefits */}
          <div className="soilcons-left-col">
            {/* Interactive Farm: See the Impact of Conservation */}
            <div className="interactive-farm-panel">
              <div className="farm-header-group">
                <span className="farm-header-title">Interactive Farm: See the Impact of Conservation</span>
                <p className="farm-header-sub">
                  Explore how different conservation practices improve soil health, reduce erosion and
                  increase productivity.
                </p>
              </div>

              {/* Split Before/After Slider */}
              <div
                ref={sliderRef}
                className="farm-split-slider"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                title="Drag or click to compare Without Conservation vs With Conservation"
              >
                {/* Background: Without Conservation (Degraded, eroded soil) */}
                <div
                  className="farm-slider-bg-layer"
                  style={{ backgroundImage: `url('/images/degradation-degraded.jpg')` }}
                />

                {/* Foreground: With Conservation (Lush, healthy terraced farm) */}
                <div
                  className="farm-slider-fg-layer"
                  style={{
                    backgroundImage: `url('/images/degradation-healthy.jpg')`,
                    clipPath: `inset(0 0 0 ${sliderPos}%)`,
                  }}
                />

                {/* Badge Left: Without Conservation */}
                <div className="farm-split-badge badge-without">
                  <span className="split-badge-title">Without Conservation</span>
                  <span className="split-badge-sub">Eroded soil, low fertility</span>
                </div>

                {/* Badge Right: With Conservation */}
                <div className="farm-split-badge badge-with">
                  <span className="split-badge-title">With Conservation</span>
                  <span className="split-badge-sub">Healthy soil, higher yields</span>
                </div>

                {/* Center Draggable Bar & Pill */}
                <div className="farm-slider-bar" style={{ left: `${sliderPos}%` }}>
                  <div className="farm-slider-pill">&lang; &rang;</div>
                </div>
              </div>
            </div>

            {/* Benefits of Soil Conservation */}
            <div className="benefits-panel">
              <div className="benefits-header-group">
                <span className="farm-header-title">Benefits of Soil Conservation</span>
                <p className="farm-header-sub">
                  Soil conservation supports environmental, economic and social well-being.
                </p>
              </div>

              <div className="benefits-cards-grid">
                {benefitsList.map((b) => {
                  const BIcon = b.icon;
                  return (
                    <TiltCard
                      key={b.id}
                      className="benefit-card-item"
                      style={
                        {
                          '--b-color': b.color,
                          '--b-glow': `${b.color}35`,
                        } as React.CSSProperties
                      }
                      onClick={() => openBenefitModal(b.id)}
                      title={`Click for details on ${b.title}`}
                      role="button"
                      tabIndex={0}
                      spotlight
                      max={7}
                    >
                      <div
                        className="benefit-icon-circle"
                        style={{
                          background: `${b.color}20`,
                          color: b.color,
                          border: `1px solid ${b.color}40`,
                        }}
                      >
                        <BIcon size={16} />
                      </div>
                      <span className="benefit-title">{b.title}</span>
                      <p className="benefit-desc">{b.short}</p>
                    </TiltCard>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Key Soil Conservation Strategies */}
          <div className="soilcons-right-col">
            <div className="strategies-container-panel">
              <div className="strategies-header-group">
                <span className="strategies-header-title">Key Soil Conservation Strategies</span>
                <p className="strategies-header-sub">Click on each practice to learn more.</p>
              </div>

              <div className="strategies-grid-2x4">
                {strategiesList.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <TiltCard
                      key={s.id}
                      className="strategy-tile-card"
                      style={
                        {
                          '--s-color': s.color,
                          '--s-glow': `${s.color}30`,
                        } as React.CSSProperties
                      }
                      onClick={() => openStrategyModal(s.id)}
                      role="button"
                      tabIndex={0}
                      title={`Explore Strategy: ${s.title}`}
                      spotlight
                      max={6}
                    >
                      <div className="strategy-tile-left">
                        <div
                          className="strategy-tile-number"
                          style={{
                            background: `${s.color}20`,
                            color: s.color,
                            border: `1px solid ${s.color}60`,
                          }}
                        >
                          {s.num}
                        </div>
                        <div className="strategy-tile-icon" style={{ color: s.color }}>
                          <SIcon size={20} />
                        </div>
                        <div className="strategy-tile-info">
                          <span className="strategy-tile-title">{s.title}</span>
                          <span className="strategy-tile-copy">{s.short}</span>
                        </div>
                      </div>
                      <div className="strategy-tile-arrow">
                        <ArrowRight size={14} />
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. Real-World Example Banner ─── */}
        <Reveal dir="up" className="soilcons-realworld-banner" onClick={openNilgirisModal}>
          <div className="realworld-left-group">
            <div className="realworld-thumbs-pair">
              <img
                src="/images/river-hd-cauvery.jpg"
                alt="Cauvery watershed in Nilgiris"
                className="realworld-thumb"
              />
              <img
                src="/images/landform-banner-agriculture.jpg"
                alt="Terraced agricultural hills in Nilgiris"
                className="realworld-thumb"
              />
            </div>

            <div className="realworld-content">
              <div className="realworld-title-line">
                <span className="realworld-badge-tag">Real-World Example</span>
                <span className="realworld-heading">Sustainable Soil Conservation in the Nilgiris, India</span>
              </div>
              <p className="realworld-desc">
                Contour farming, terracing and afforestation are widely used in the Nilgiris to prevent soil erosion,
                conserve water and maintain soil fertility, supporting tea and vegetable cultivation.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="realworld-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              openNilgirisModal();
            }}
          >
            <span>Learn More</span>
            <ArrowRight size={14} />
          </button>
        </Reveal>

        {/* ─── 4. Bottom Nav Bar ─── */}
        <div className="soilcons-bottom-nav">
          <button type="button" className="soilcons-prev-btn" onClick={onPrev}>
            <div className="soilcons-prev-circle">
              <ArrowLeft size={16} />
            </div>
            <div className="soilcons-prev-labels">
              <span className="prev-title">Previous</span>
              <span className="prev-sub">Land Degradation</span>
            </div>
          </button>

          <div className="soilcons-dots-tracker">
            {Array.from({ length: 15 }).map((_, idx) => (
              <span
                key={idx}
                className={`soilcons-nav-dot ${idx === 12 ? 'is-active-dot' : ''}`}
                title={`Chapter ${idx + 1}`}
              />
            ))}
          </div>

          <button type="button" className="soilcons-next-pill-btn" onClick={onNext}>
            <div className="soilcons-next-labels">
              <span className="next-title">Next</span>
              <span className="next-sub">Sustainable Land-Use Planning</span>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ─── 5. Modals Portal ─── */}
      {activeModal &&
        createPortal(
          <div className="soilcons-modal-portal" data-lenis-prevent>
            <div className="soilcons-modal-scrim" onClick={closeModal} />
            <div
              className="soilcons-modal-dialog"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Modal 1: Strategy Deep Dive */}
              {activeModal === 'strategy' && activeStrategy && (
                <>
                  <div className="soilcons-modal-header">
                    <div className="modal-header-left">
                      <div
                        className="modal-icon-badge"
                        style={{
                          background: `${activeStrategy.color}20`,
                          color: activeStrategy.color,
                        }}
                      >
                        <activeStrategy.icon size={22} />
                      </div>
                      <div className="modal-header-titles">
                        <span className="modal-pretitle">
                          STRATEGY #{activeStrategy.num} &bull; SCIENTIFIC MECHANISM
                        </span>
                        <h3 className="modal-maintitle">{activeStrategy.title}</h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="modal-close-icon-btn"
                      onClick={closeModal}
                      aria-label="Close Modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="soilcons-modal-scrollable" data-lenis-prevent>
                    <div className="modal-overview-banner">{activeStrategy.short}</div>

                    <div className="modal-curriculum-card">
                      <strong>Erosion &amp; Biophysical Mechanism:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeStrategy.mechanisms}</p>
                    </div>

                    <div className="modal-curriculum-card" style={{ borderColor: activeStrategy.color }}>
                      <strong>Quantitative Impact &amp; Soil Metrics:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6, color: '#f1cb74' }}>
                        {activeStrategy.calculation}
                      </p>
                    </div>

                    <div className="modal-curriculum-card">
                      <strong>Technical Implementation Guidelines:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeStrategy.guidelines}</p>
                    </div>

                    <div className="modal-curriculum-card">
                      <strong>Field Case Study:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeStrategy.caseStudy}</p>
                    </div>
                  </div>

                  <div className="soilcons-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      VTU Natural Resource Management Standard
                    </span>
                    <button
                      type="button"
                      className="modal-footer-close-btn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* Modal 2: Benefit Deep Dive */}
              {activeModal === 'benefit' && activeBenefit && (
                <>
                  <div className="soilcons-modal-header">
                    <div className="modal-header-left">
                      <div
                        className="modal-icon-badge"
                        style={{
                          background: `${activeBenefit.color}20`,
                          color: activeBenefit.color,
                        }}
                      >
                        <activeBenefit.icon size={22} />
                      </div>
                      <div className="modal-header-titles">
                        <span className="modal-pretitle">CORE BENEFIT &bull; ECOSYSTEM SERVICE</span>
                        <h3 className="modal-maintitle">{activeBenefit.title}</h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="modal-close-icon-btn"
                      onClick={closeModal}
                      aria-label="Close Modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="soilcons-modal-scrollable" data-lenis-prevent>
                    <div className="modal-overview-banner">{activeBenefit.short}</div>

                    <div className="modal-curriculum-card">
                      <strong>Ecological &amp; Economic Significance:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>{activeBenefit.details}</p>
                    </div>

                    <div className="modal-curriculum-card" style={{ borderColor: activeBenefit.color }}>
                      <strong>Quantified Outcome:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6, color: '#f1cb74' }}>
                        {activeBenefit.stat}
                      </p>
                    </div>
                  </div>

                  <div className="soilcons-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      BCV755B Principles of Soil Conservation
                    </span>
                    <button
                      type="button"
                      className="modal-footer-close-btn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* Modal 3: Nilgiris Real-World Case Study */}
              {activeModal === 'nilgiris' && (
                <>
                  <div className="soilcons-modal-header">
                    <div className="modal-header-left">
                      <div
                        className="modal-icon-badge"
                        style={{ background: 'rgba(241, 203, 116, 0.2)', color: '#f1cb74' }}
                      >
                        <MapPin size={22} />
                      </div>
                      <div className="modal-header-titles">
                        <span className="modal-pretitle">REGIONAL CASE STUDY &bull; INDIA</span>
                        <h3 className="modal-maintitle">Soil Conservation in the Nilgiris, Tamil Nadu</h3>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="modal-close-icon-btn"
                      onClick={closeModal}
                      aria-label="Close Modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="soilcons-modal-scrollable" data-lenis-prevent>
                    <div className="modal-overview-banner">
                      The Nilgiris district in the Western Ghats (elevation 1,000–2,600m) represents one of
                      India's most successful integrated watershed and soil conservation programs.
                    </div>

                    <div className="modal-stats-3col">
                      <div className="modal-stat-pill">
                        <span className="stat-pill-label">Pre-Conservation Loss</span>
                        <span className="stat-pill-value" style={{ color: '#ef4444' }}>
                          40+ t/ha/yr
                        </span>
                      </div>
                      <div className="modal-stat-pill">
                        <span className="stat-pill-label">Post-Conservation</span>
                        <span className="stat-pill-value" style={{ color: '#4ade80' }}>
                          &lt; 2.5 t/ha/yr
                        </span>
                      </div>
                      <div className="modal-stat-pill">
                        <span className="stat-pill-label">Hydel Silt Reduction</span>
                        <span className="stat-pill-value" style={{ color: '#38bdf8' }}>
                          85% Decrease
                        </span>
                      </div>
                    </div>

                    <div className="modal-curriculum-card">
                      <strong>The Challenge:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        High rainfall intensity (&gt;1,500 mm annually) on steep slopes (16° to 35°) coupled
                        with extensive potato and vegetable cultivation triggered catastrophic debris flows,
                        sheet wash, and heavy siltation of the Bhavani and Moyar hydro-electric reservoirs.
                      </p>
                    </div>

                    <div className="modal-curriculum-card">
                      <strong>Integrated Engineering &amp; Agronomic Solutions:</strong>
                      <ul style={{ margin: '6px 0 0 0', paddingLeft: 18, lineHeight: 1.6 }}>
                        <li>
                          <strong>Bench Terracing with Stone Risers:</strong> Graded inward-sloping terraces
                          constructed along contour lines, breaking slope length and stabilizing hillsides.
                        </li>
                        <li>
                          <strong>Contour Vegetative Hedges:</strong> Vetiver grass and tea contour lines
                          acting as continuous living filters to trap moving silt particles.
                        </li>
                        <li>
                          <strong>Catchment Afforestation:</strong> Re-establishing native Shola forest
                          species along steep ridges and stream headwaters to absorb monsoon torrents.
                        </li>
                        <li>
                          <strong>Drop Spillways &amp; Grassed Waterways:</strong> Engineered chutes to safely
                          convey excess runoff down mountainsides without initiating gully incisions.
                        </li>
                      </ul>
                    </div>

                    <div className="modal-curriculum-card">
                      <strong>Key Takeaway for BCV755B Engineers:</strong>
                      <p style={{ margin: '6px 0 0 0', lineHeight: 1.6 }}>
                        Effective soil conservation requires combining structural engineering (terracing,
                        check dams, retention trenches) with biological stabilization (hedgerows, mulch,
                        agroforestry) tailored to regional geomorphology and slope steepness.
                      </p>
                    </div>
                  </div>

                  <div className="soilcons-modal-footer">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      VTU BCV755B Watershed Management Case Study
                    </span>
                    <button
                      type="button"
                      className="modal-footer-close-btn"
                      onClick={closeModal}
                    >
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// SCREEN 14: SUSTAINABLE LAND-USE PLANNING
