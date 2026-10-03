import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Trees, ArrowRight, Flame, Building2, Users2, ChevronRight, ChevronLeft, Thermometer, Sprout, X, Leaf, PawPrint, Route, Pickaxe } from 'lucide-react';
import '../../deforestation.css';
import { Reveal } from './motion';
import { useModalScrollLock } from './helpers/useModalScrollLock';
import { useCompareSlider } from './helpers/useCompareSlider';
import { keyActivate } from './helpers/keyActivate';
import ChapterDots from './helpers/ChapterDots';
import type { ScreenNavProps } from './types';

export default function DeforestationScreen({ onPrev, onNext, onJumpChapter }: ScreenNavProps) {
  const slider = useCompareSlider({ initial: 58 });
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [selectedCauseIndex, setSelectedCauseIndex] = useState<number | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'direct' | 'underlying' | 'agents' | 'concepts'>('direct');
  const [hoveredHotspot, setHoveredHotspot] = useState<{
    name: string;
    loss: string;
    reason: string;
    x: number;
    y: number;
  } | null>(null);

  const isAnyModalOpen = isExploreOpen || selectedCauseIndex !== null;
  const closeAnyModal = () => {
    setSelectedCauseIndex(null);
    setIsExploreOpen(false);
  };
  // Airtight background scroll lock + Escape-to-close while a modal is open
  useModalScrollLock(isAnyModalOpen, {
    scrollableSelector: '.cause-detail-body, .deforest-modal-body',
    onClose: closeAnyModal,
  });

  // 6 Major causes with comprehensive syllabus data for detailed popup
  const causesList = [
    {
      id: 'agri',
      title: 'Agriculture Expansion',
      desc: 'Conversion of forests to cropland and pasture land.',
      icon: Sprout,
      iconColor: '#4ade80',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
      fallback: '/images/landform-banner-agriculture.jpg',
      badge: 'LARGEST DIRECT DRIVER (~80% OF GLOBAL LOSS)',
      statBig: '~80%',
      statDesc: 'Of all global deforestation is driven by agricultural expansion for crops and livestock.',
      mechanism:
        'Dense primary rainforest canopy is systematically cleared, burned, and plowed to convert fertile tropical soils into arable monoculture croplands (soybeans, oil palm, sugarcane) and extensive pasture lands for commercial cattle ranching.',
      curriculumPoints: [
        'Part 5 of BCV755B notes notes that agricultural conversion is responsible for the vast majority of tropical forest loss worldwide.',
        'Slash-and-burn subsistence farming clears localized forest fallow; while traditionally rotational, shortened fallow cycles prevent secondary forest regeneration.',
        'Commercial agribusiness permanently clears hundreds of thousands of hectares for cash crop monocultures, leaving soils vulnerable to rapid erosion.',
        'Cattle ranching in the Amazon and South American biomes is responsible for extensive pasture expansion, where topsoil loses fertility within 5–10 years.',
      ],
      agents: [
        { name: 'Slash-and-burn farmers', role: 'Clear primary forest to cultivate subsistence food crops and short-term cash yields' },
        { name: 'Commercial agribusiness', role: 'Large-scale corporate farming establishing massive monocultures (soy, palm oil)' },
        { name: 'Cattle ranchers', role: 'Clear forest canopy to plant permanent pasture for beef production' },
        { name: 'Livestock herders', role: 'Intensify grazing on marginal lands, inhibiting natural tree sapling regeneration' },
      ],
      solutions: [
        'Promotion of agroforestry and multi-tiered perennial crops to retain protective tree canopy.',
        'Implementation of silvopasture (integrating trees with pasture lands) to preserve soil carbon and microclimate.',
        'Strict enforcement of forest conservation moratoriums on conversion of primary virgin soils.',
        'Sustainable intensification of existing farmlands instead of expanding into forest margins.',
      ],
    },
    {
      id: 'logging',
      title: 'Logging & Timber',
      desc: 'Commercial and illegal logging for timber.',
      icon: Trees,
      iconColor: '#4ade80',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      fallback: '/images/landform-banner-forests.jpg',
      badge: '45–74% RESIDUAL TREE MORTALITY',
      statBig: '45–74%',
      statDesc: 'Of residual standing trees are destroyed during commercial selective timber logging operations.',
      mechanism:
        'Commercial operators fell high-value target timber trees (hardwoods, mahogany, teak). Heavy bulldozers and falling tree crowns crush surrounding saplings, severely compact delicate forest soils, and open access roads that facilitate subsequent illegal clearing.',
      curriculumPoints: [
        'BCV755B lecture notes state that selective commercial logging directly destroys 45% to 74% of residual, non-targeted standing trees.',
        'Loggers construct extensive networks of bulldozer skid trails and unpaved roads into previously inaccessible primary forests.',
        'Logging roads act as penetration arteries that allow colonizers, slash-and-burn farmers, illegal miners, and poachers to flood into forest interiors.',
        'Canopy openings created by logging reduce relative humidity and allow sunlight to desiccate the forest understory, drastically multiplying forest fire risk.',
      ],
      agents: [
        { name: 'Commercial loggers', role: 'Concession operators extracting high-value timber for domestic and export markets' },
        { name: 'Illegal timber cartels', role: 'Harvesting protected old-growth hardwood species inside national parks and reserves' },
        { name: 'Commercial tree planters', role: 'Clearing natural forest fallow to plant uniform monoculture pulp plantations' },
        { name: 'Firewood collectors', role: 'Intensive gathering of fuelwood and charcoal production in dryland forest margins' },
      ],
      solutions: [
        'Adoption of Reduced-Impact Logging (RIL) techniques, directional felling, and pre-planned skid trails.',
        'Strict enforcement of Forest Stewardship Council (FSC) certification and chain-of-custody timber tracking.',
        'Implementation of export bans on unprocessed raw logs from endangered tropical hardwood forests.',
        'Subsidizing engineered bio-composites and bamboo alternatives to reduce solid hardwood demand.',
      ],
    },
    {
      id: 'infra',
      title: 'Infrastructure',
      desc: 'Roads, dams, and other infrastructure projects.',
      icon: Route,
      iconColor: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      fallback: '/images/landform-banner-urban.jpg',
      badge: 'CATALYST FOR MASS FRAGMENTATION',
      statBig: '95% of Loss',
      statDesc: 'In tropical zones occurs within 5.5 km of a road or navigable river corridor.',
      mechanism:
        'Construction of highways, railways, hydroelectric dams, and transmission lines divides continuous forests into fragmented, vulnerable parcels, fundamentally altering microclimates and triggering widespread secondary deforestation.',
      curriculumPoints: [
        'The notes identify infrastructure development as a major agent of both deforestation and severe forest fragmentation.',
        'Highways slice continuous canopies into disconnected forest fragments, creating harmful edge effects (elevated temperatures, windthrow, invasive species).',
        'Hydroelectric dams flood immense tracts of pristine lowland forests, drowning wildlife habitats and decaying submerged biomass into greenhouse gases.',
        'Road construction dramatically lowers transportation costs for extracted timber, minerals, and agricultural commodities, spurring speculative land clearing.',
      ],
      agents: [
        { name: 'Infrastructure developers', role: 'Government ministries and contractors constructing trans-continental highways and bridges' },
        { name: 'Hydroelectric power authorities', role: 'Damming rivers and flooding vast valleys of standing rainforest biomass' },
        { name: 'Oil & gas pipeline operators', role: 'Clearing seismic exploration corridors and pipeline right-of-ways through wilderness' },
        { name: 'Land settlement planners', role: 'Relocating agrarian populations into forested frontiers via state-sponsored resettlement schemes' },
      ],
      solutions: [
        'Mandatory comprehensive Environmental Impact Assessments (EIA) prior to approving infrastructure projects.',
        'Incorporating wildlife overpasses, subterranean tunnels, and canopy rope bridges to preserve ecological corridors.',
        'Prioritizing upgrading existing road infrastructure over building new penetration roads through primary forests.',
        'Establishing legally protected buffer zones alongside highway corridors to prohibit ribbon sprawl.',
      ],
    },
    {
      id: 'urban',
      title: 'Urbanization',
      desc: 'Expansion of cities and settlements.',
      icon: Building2,
      iconColor: '#eab308',
      image: '/images/landform-banner-urban.jpg',
      fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      badge: 'IRREVERSIBLE SOIL SEALING',
      statBig: '100% Sealed',
      statDesc: 'Soil pores are permanently closed by asphalt and concrete, destroying water infiltration.',
      mechanism:
        'Rapid expansion of metropolitan areas, suburban housing tracts, industrial corridors, and commercial hubs completely clears native vegetation and covers the soil surface with impervious materials, extinguishing all biological and hydrological soil functions.',
      curriculumPoints: [
        'Soil sealing is defined in the notes as the closure of soil pores on the surface due to materials used for urbanization (housing, roads, pavements).',
        'Sealed soil is completely unable to absorb rainwater for aquifer recharge or perform its natural pollutant-filtering functions.',
        'Loss of tree canopy combined with heat absorption by buildings and asphalt produces the Urban Heat Island effect, raising temperatures by 2–5°C.',
        'Urban sprawl radiates intense indirect pressures into surrounding hinterlands for timber, aggregate stone, sand mining, and municipal waste disposal.',
      ],
      agents: [
        { name: 'Urban land settlement planners', role: 'Designing sprawling residential layouts and converting peri-urban agricultural and forest land' },
        { name: 'Industrial & commercial developers', role: 'Constructing logistics centers, factory complexes, and highway interchanges' },
        { name: 'Municipal infrastructure authorities', role: 'Paving roads, parking lots, and building concrete flood control channels' },
      ],
      solutions: [
        'Rigorous Urban Growth Boundaries (UGB) to constrain outward sprawl and promote high-density brownfield infill.',
        'Water-Sensitive Urban Design (WSUD) incorporating permeable pavements, bioswales, and rain gardens.',
        'Preserving contiguous urban green belts and ecological corridors to mitigate heat island formation.',
        'Enacting strict municipal regulations requiring tree canopy replacement quotas for all new developments.',
      ],
    },
    {
      id: 'mining',
      title: 'Mining',
      desc: 'Mineral extraction and associated land clearing.',
      icon: Pickaxe,
      iconColor: '#f97316',
      image: '/images/deforest-mining.jpg',
      fallback: '/images/landform-banner-deserts.jpg',
      badge: 'TOXIC CONTAMINATION & TOPSOIL STRIPPING',
      statBig: '> 30% Basins',
      statDesc: 'Of tropical forest watersheds overlap with active mining concessions or exploration permits.',
      mechanism:
        'Open-cast surface mining for minerals (bauxite, iron ore, copper, gold, coal) requires stripping away entire forest canopies and deep topsoil layers. Processing chemicals, tailings dams, and heavy machinery create chronic toxic runoff and irreversible land degradation.',
      curriculumPoints: [
        'The notes highlight mining and oil exploitation as significant localized direct causes of forest destruction and soil contamination.',
        'Open-pit quarries remove not only vegetative biomass but destroy the entire weathered soil profile, taking centuries to naturally recover.',
        'Heavy chemical use in mineral processing (mercury, cyanide, sulfuric acid) contaminates river basins and bioaccumulates through the aquatic food chain.',
        'Tailings dam failures and sediment runoff cause massive downstream siltation, degrading aquatic life and municipal water sources.',
      ],
      agents: [
        { name: 'Multinational mining corporations', role: 'Operating massive open-cast iron, bauxite, copper, and coal extraction complexes' },
        { name: 'Artisanal gold miners (Garimpeiros)', role: 'Dredging riverbanks and using mercury amalgam to extract alluvial gold in pristine reserves' },
        { name: 'Petroleum & gas extraction firms', role: 'Drilling exploration wells, constructing access roads, and managing flare pits in forest biomes' },
      ],
      solutions: [
        'Mandatory post-mining ecological restoration bonds guaranteeing topsoil replacement and reforestation.',
        'Phytoremediation using native hyper-accumulator plant species to detoxify heavy metal contamination in soils.',
        'Establishing strict No-Go exclusion zones protecting biodiversity hotspots, headwaters, and indigenous reserves.',
        'Eliminating toxic mercury amalgam use through closed-circuit cyanide-free gravimetric processing technologies.',
      ],
    },
    {
      id: 'fires',
      title: 'Forest Fires',
      desc: 'Intentional or accidental forest fires.',
      icon: Flame,
      iconColor: '#ef4444',
      image: '/images/deforest-fire.jpg',
      fallback: 'https://images.unsplash.com/photo-1602980085566-4c9973215284?auto=format&fit=crop&w=800&q=80',
      badge: 'FEEDBACK ACCELERATOR OF CLIMATE CHANGE',
      statBig: 'Billions of Tons',
      statDesc: 'Of CO₂ emitted annually, converting tropical rainforest sinks into dangerous net carbon sources.',
      mechanism:
        'Deliberate fires set to clear agricultural residues and felled trees frequently escape into surrounding desiccated forests. Under changing climatic conditions and prolonged droughts, repeated burns destroy the seed bank, eradicate soil organic matter, and convert biodiverse forests into degraded scrublands.',
      curriculumPoints: [
        'The notes identify the combined effect of uncontrolled grazing and recurring fires as a primary driver of deforestation in dry and seasonal biomes.',
        'Repeated fires prevent the natural regeneration of young trees, converting dense closed-canopy forests into impoverished savanna wastelands.',
        'Wildfires volatilize essential soil nutrients (nitrogen and carbon) and destroy beneficial mycorrhizal fungi, permanently degrading soil health.',
        'Deforestation creates drier local microclimates that increase forest flammability, creating a vicious, accelerating climate-fire feedback cycle.',
      ],
      agents: [
        { name: 'Agricultural burners & ranchers', role: 'Ignite slash-and-burn fires at the end of dry seasons to clear pasture brush and crop waste' },
        { name: 'Arsonists & speculative land grabbers', role: 'Intentionally burn protected public forests to claim and sell de-facto deforested parcels' },
        { name: 'Climate-induced lightning strikes', role: 'Ignite desiccated understories during prolonged, extreme El Niño drought events' },
      ],
      solutions: [
        'Deploying real-time satellite thermal anomaly detection (MODIS/VIIRS) for immediate wildfire dispatch.',
        'Strict seasonal burn bans enforced with heavy civil and criminal penalties during dry weather periods.',
        'Creating landscaped fuel breaks and firebreaks between agricultural frontiers and native forest reserves.',
        'Empowering and equipping local indigenous and community-based volunteer wildfire brigades.',
      ],
    },
  ];

  // Impacts data
  const impactsList = [
    {
      id: 'bio',
      title: 'Loss of Biodiversity',
      desc: 'Habitat destruction for countless species.',
      icon: Leaf,
      themeClass: 'impact-theme-biodiversity',
    },
    {
      id: 'climate',
      title: 'Climate Change',
      desc: 'Increased carbon emissions and reduced carbon sinks.',
      icon: Thermometer,
      themeClass: 'impact-theme-climate',
    },
    {
      id: 'soil',
      title: 'Soil Erosion',
      desc: 'Loss of fertile topsoil and reduced soil quality.',
      icon: Sprout,
      themeClass: 'impact-theme-soil',
    },
    {
      id: 'water',
      title: 'Disrupted Water Cycle',
      desc: 'Changes in rainfall patterns and increased flood/drought risk.',
      icon: Droplet,
      themeClass: 'impact-theme-water',
    },
    {
      id: 'community',
      title: 'Impact on Communities',
      desc: 'Loss of livelihoods and displacement of indigenous peoples.',
      icon: Users2,
      themeClass: 'impact-theme-community',
    },
  ];

  // Syllabus details for explore causes modal
  const directCauses = [
    'Logging — commercial timber operations build access roads into primary forests; logging destroys 45–74% of residual trees',
    'Conversion of forested lands for agriculture (subsistence & commercial crops)',
    'Cattle-raising and extensive pasture expansion in tropical biomes',
    'Urbanization and infrastructure development (highways, dams, reservoirs)',
    'Mining and petroleum exploitation (quarries, open pits, seismic cutlines)',
    'Acid rain and atmospheric pollutant deposition',
    'Forest fires (deliberate burning for clearing and accidental wildfires)',
  ];

  const underlyingCauses = [
    'Unpriced forest goods and ecosystem services in conventional market metrics',
    'Monopolies in timber and agricultural commodity markets; perverse subsidies',
    'Improper and unenforced environmental regulatory measures',
    'Illegal logging and unregulated land grabbing in public forest reserves',
    'Weak governance, land tenure insecurity, and lack of enforcement resources',
    'Rapid population growth and escalating global demand for meat, soy, palm oil, and timber',
    'Excessive consumption patterns and climate-induced drought stressors',
    'Armed conflict, military operations, and civil instability',
  ];

  const agentsTable = [
    { agent: 'Slash-and-burn farmers', link: 'Clear forest plots to grow subsistence food and cash crops' },
    { agent: 'Commercial farmers', link: 'Clear large-scale forest tracks for soy, oil palm, and monocultures' },
    { agent: 'Cattle ranchers', link: 'Clear forest canopy to plant permanent pasture for beef production' },
    { agent: 'Livestock herders', link: 'Intensify grazing pressure, inhibiting tree sapling regeneration' },
    { agent: 'Loggers', link: 'Harvest valuable timber species; access roads open interior to settlers' },
    { agent: 'Commercial tree planters', link: 'Clear native forest fallow to establish monoculture plantations' },
    { agent: 'Firewood collectors', link: 'Intensive gathering in drylands exceeds sustainable yield' },
    { agent: 'Mining & petroleum industries', link: 'Direct open-cast excavation, tailings ponds, seismic survey grids' },
    { agent: 'Land settlement planners', link: 'Government resettlement schemes translocating populations to forests' },
    { agent: 'Infrastructure developers', link: 'Trans-continental highways, hydroelectric dams inundating valleys' },
  ];

  const currentCause = selectedCauseIndex !== null ? causesList[selectedCauseIndex] : null;

  return (
    <section className="land-screen land-deforestation-screen" id="ch-deforestation">
      <div className="deforest-screen-container">
        {/* ================================================================
            1. HERO BEFORE / AFTER SECTION (Interactive Draggable Split)
           ================================================================ */}          <div
          ref={slider.containerRef}
          className="deforest-hero-interactive"
          onMouseDown={slider.onMouseDown}
          onTouchMove={slider.onTouchMove}
          style={{ '--split-pct': `${slider.pos}%` } as React.CSSProperties}
          role="region"
          aria-label="Interactive before and after deforestation comparison slider"
        >
          {/* BEFORE: Pristine Rainforest with winding river */}
          <div
            className="deforest-hero-side deforest-side-before"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1800&q=80'), url('/images/landform-banner-forests.jpg')`,
            }}
          />

          {/* AFTER: Barren Deforested Land with cut tree stumps */}
          <div
            className="deforest-hero-side deforest-side-after"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1800&q=80'), url('/images/land-degraded-drought.jpg')`,
            }}
          />

          {/* Scrim overlay on left for readable typography */}
          <div className="deforest-hero-scrim" />

          {/* Text Overlay on Left */}
          <div className="deforest-hero-copy">
            <span className="deforest-eyebrow">MODULE 01 &nbsp;|&nbsp; CHAPTER 09</span>
            <h2 className="deforest-grand-title">
              Defore<em>station</em>
            </h2>
            <p className="deforest-subtitle">Loss of forests, loss of balance.</p>
            <p className="deforest-lead-desc">
              Deforestation is the large-scale removal of forests, leading to the conversion of forest land to
              non-forest uses such as agriculture, urban areas, mining and infrastructure. It affects biodiversity,
              climate, soil, water cycles and human communities.
            </p>
          </div>

          {/* Floating Pill Badges */}
          <div className="deforest-pill-badge badge-before">
            <strong>Before</strong>
            <span>Dense forest cover</span>
            <span>Rich biodiversity</span>
          </div>

          <div className="deforest-pill-badge badge-after">
            <strong>After</strong>
            <span>Cleared land</span>
            <span>Reduced biodiversity</span>
          </div>

          {/* Draggable Vertical Divider Line & Handle */}
          <div className="deforest-divider-line">
            <div className="deforest-divider-handle" title="Drag to compare before and after">
              <ChevronLeft size={13} strokeWidth={2.6} />
              <ChevronRight size={13} strokeWidth={2.6} />
            </div>
          </div>
        </div>

        {/* ================================================================
            2. MIDDLE GRID: KEY FACTS + REALISTIC DEFORESTATION WORLD MAP
           ================================================================ */}
        <Reveal dir="up" className="deforest-middle-grid">
          {/* LEFT: Key Facts Card */}
          <div className="deforest-glass-card key-facts-card">
            <h3 className="deforest-card-heading">Key Facts</h3>
            <div className="deforest-facts-grid">
              {/* Fact 1: Rate of Loss */}
              <div className="deforest-fact-item">
                <div className="fact-icon-wrap">
                  <Trees size={22} />
                </div>
                <div className="fact-stat-highlight">
                  ~10 million
                  <br />
                  hectares per year
                </div>
                <span className="fact-subtext">Global forest loss (approx.)</span>
              </div>

              {/* Fact 2: Greenhouse Gases */}
              <div className="deforest-fact-item">
                <div className="fact-co2-badge">
                  <span>CO₂</span>
                </div>
                <div className="fact-stat-highlight">~10–15%</div>
                <span className="fact-subtext">Global greenhouse gas emissions from deforestation</span>
              </div>

              {/* Fact 3: Habitat Loss */}
              <div className="deforest-fact-item">
                <div className="fact-icon-wrap" style={{ color: '#86efac' }}>
                  <PawPrint size={20} />
                </div>
                <div className="fact-title-white">Loss of Habitat</div>
                <span className="fact-subtext">Threatens thousands of plant and animal species</span>
              </div>

              {/* Fact 4: Ecosystem Services */}
              <div className="deforest-fact-item">
                <div className="fact-icon-wrap" style={{ color: '#86efac' }}>
                  <Leaf size={20} />
                </div>
                <div className="fact-title-white">Ecosystem Services</div>
                <span className="fact-subtext">Reduced carbon storage, rainfall regulation and soil protection</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Global Deforestation Hotspots Card */}
          <div className="deforest-glass-card hotspots-card">
            <h3 className="deforest-card-heading">Global Deforestation Hotspots</h3>
            <div className="hotspots-card-content">
              {/* Authentic High-Resolution World Map with Exact Tropical Deforestation Hotspots */}
              <div className="hotspots-map-wrapper">
                <img
                  src="/images/deforest-hotspots-map.jpg"
                  alt="Global Deforestation Hotspots showing Amazon, Congo, and Southeast Asia biomes"
                  className="hotspots-raster-map"
                />

                {/* Hotspot Pulse 1: Amazon Basin */}
                <div
                  className="hotspot-interactive-marker marker-amazon"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredHotspot({
                      name: 'Amazon Basin · South America',
                      loss: '🔴 High Loss: ~1.8M ha/year',
                      reason: 'Cattle ranching, soy monocultures & illegal logging',
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  title="Amazon Basin Deforestation Hotspot"
                >
                  <span className="marker-radar-ring" />
                  <span className="marker-core-dot" />
                </div>

                {/* Hotspot Pulse 2: Congo Basin */}
                <div
                  className="hotspot-interactive-marker marker-congo"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredHotspot({
                      name: 'Congo Basin · Central Africa',
                      loss: '🔴 High Loss: ~0.5M ha/year',
                      reason: 'Smallholder slash-and-burn & charcoal fuelwood extraction',
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  title="Congo Basin Deforestation Hotspot"
                >
                  <span className="marker-radar-ring" />
                  <span className="marker-core-dot" />
                </div>

                {/* Hotspot Pulse 3: Southeast Asia */}
                <div
                  className="hotspot-interactive-marker marker-seasia"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredHotspot({
                      name: 'Southeast Asia · Borneo & Sumatra',
                      loss: '🔴 High Loss: ~0.8M ha/year',
                      reason: 'Industrial oil palm plantations & commercial timber',
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  title="Southeast Asia Deforestation Hotspot"
                >
                  <span className="marker-radar-ring" />
                  <span className="marker-core-dot" />
                </div>
              </div>

              {/* Legend on Right */}
              <div className="hotspots-legend-col">
                <div className="hotspot-legend-row">
                  <span className="legend-dot dot-red" />
                  <span>High loss</span>
                </div>
                <div className="hotspot-legend-row">
                  <span className="legend-dot dot-orange" />
                  <span>Moderate loss</span>
                </div>
                <div className="hotspot-legend-row">
                  <span className="legend-dot dot-yellow" />
                  <span>Low loss</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Floating Tooltip for Hotspots */}
        {hoveredHotspot &&
          typeof document !== 'undefined' &&
          createPortal(
            <div
              className="hotspot-floating-tooltip"
              style={{
                left: `${hoveredHotspot.x}px`,
                top: `${hoveredHotspot.y}px`,
              }}
            >
              <span className="tooltip-title">{hoveredHotspot.name}</span>
              <span className="tooltip-loss">{hoveredHotspot.loss}</span>
              <span className="tooltip-reason">{hoveredHotspot.reason}</span>
            </div>,
            document.body
          )}

        {/* ================================================================
            3. MAJOR CAUSES OF DEFORESTATION (6 Interactive Clickable Cards)
           ================================================================ */}
        <Reveal dir="up" className="deforest-causes-section">
          <div className="deforest-causes-header">
            <div className="causes-titles-group">
              <h3 className="causes-main-title">Major Causes of Deforestation</h3>
              <p className="causes-subtitle">
                Human activities are the primary drivers of forest loss across the world. Click any card to inspect.
              </p>
            </div>
            <button
              type="button"
              className="explore-causes-btn"
              onClick={() => setIsExploreOpen(true)}
              aria-label="Open detailed syllabus notes on causes and agents of deforestation"
            >
              <Leaf size={14} style={{ color: '#4ade80' }} />
              <span>Explore Causes</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="causes-cards-row">
            {causesList.map((cause, index) => {
              const IconComp = cause.icon;
              return (
                <div
                  key={cause.id}
                  className="cause-photo-card"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCauseIndex(index);
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                  onKeyDown={keyActivate(() => setSelectedCauseIndex(index))}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open syllabus details for ${cause.title}`}
                  title={`Click to open deep dive on ${cause.title}`}
                >
                  <span className="cause-click-prompt">Click to view</span>
                  <div className="cause-card-thumb-wrap">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="cause-card-thumb"
                      onError={(e) => {
                        e.currentTarget.src = cause.fallback;
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="cause-card-content">
                    <IconComp size={16} className="cause-card-icon" style={{ color: cause.iconColor }} />
                    <div className="cause-card-text">
                      <strong className="cause-card-title">{cause.title}</strong>
                      <span className="cause-card-desc">{cause.desc}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ================================================================
            4. IMPACTS OF DEFORESTATION (5 Themed Cards Row)
           ================================================================ */}
        <Reveal dir="up" className="deforest-impacts-section">
          <div className="impacts-header-group">
            <h3 className="impacts-main-title">Impacts of Deforestation</h3>
            <p className="impacts-header-desc">
              Deforestation has wide-ranging effects on the environment, climate and human societies.
            </p>
          </div>

          <div className="impacts-cards-row">
            {impactsList.map((impact) => {
              const IconComp = impact.icon;
              return (
                <div key={impact.id} className={`impact-badge-card ${impact.themeClass}`}>
                  <div className="impact-icon-col">
                    <IconComp size={15} />
                  </div>
                  <div className="impact-text-col">
                    <strong className="impact-card-title">{impact.title}</strong>
                    <span className="impact-card-desc">{impact.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ================================================================
            5. BOTTOM NAVIGATION BAR (Exact Match to Mockup)
           ================================================================ */}
        <div className="deforest-bottom-bar">
          <button type="button" className="nav-prev-link-btn" onClick={onPrev} aria-label="Go to Conservation chapter">
            <div className="nav-circle-arrow">
              <ChevronLeft size={16} />
            </div>
            <div className="nav-prev-text-col">
              <span className="nav-prev-heading">Previous</span>
              <span className="nav-prev-sub">Conservation of Land Forms</span>
            </div>
          </button>

          {/* 15 Chapter indicator dots (9th dot active) — clickable */}
          <div className="nav-center-dots-group">
            <ChapterDots activeIndex={8} onJump={onJumpChapter} className="nav-center-dots-group" dotClassName="nav-chap-dot" activeClassName="is-active-dot" />
          </div>

          <button
            type="button"
            className="nav-next-gold-pill"
            onClick={onNext}
            aria-label="Continue to Land-Use Change chapter"
          >
            <span>Next</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ================================================================
          6. SPECIFIC CAUSE DETAIL POPUP / MODAL (Portal to document.body)
         ================================================================ */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {currentCause && (
              <motion.div
                className="deforest-modal-overlay"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCauseIndex(null)}
              >                <motion.div
                className="cause-detail-modal-window"
                role="dialog"
                aria-modal="true"
                data-lenis-prevent
                  initial={{ scale: 0.94, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 20 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Hero Banner with Photo */}
                  <div className="cause-detail-hero-banner">
                    <img
                      src={currentCause.image}
                      alt={currentCause.title}
                      className="cause-detail-hero-img"
                      onError={(e) => {
                        e.currentTarget.src = currentCause.fallback;
                      }}
                    />
                    <div className="cause-detail-hero-scrim" />

                    <button
                      type="button"
                      className="cause-detail-close-btn"
                      onClick={() => setSelectedCauseIndex(null)}
                      aria-label="Close cause detail modal"
                    >
                      <X size={18} />
                    </button>

                    <div className="cause-detail-hero-badges">
                      <div className="cause-detail-title-group">
                        <div className="cause-detail-icon-circle">
                          {(() => {
                            const Icon = currentCause.icon;
                            return <Icon size={20} style={{ color: currentCause.iconColor }} />;
                          })()}
                        </div>
                        <div className="cause-detail-hero-titles">
                          <h2>{currentCause.title}</h2>
                          <p>{currentCause.desc}</p>
                        </div>
                      </div>
                      <span className="cause-detail-tag-badge">{currentCause.badge}</span>
                    </div>
                  </div>

                  {/* Modal Body with internal scroll & data-lenis-prevent */}
                  <div className="cause-detail-body" data-lenis-prevent>
                    {/* Statistic highlight card */}
                    <div className="cause-stat-card">
                      <span className="cause-stat-big">{currentCause.statBig}</span>
                      <span className="cause-stat-desc">{currentCause.statDesc}</span>
                    </div>

                    {/* Mechanism description */}
                    <div>
                      <span className="cause-detail-section-title">Ecological &amp; Physical Mechanism</span>
                      <p className="cause-mechanism-p">{currentCause.mechanism}</p>
                    </div>

                    {/* Lecture notes curriculum points */}
                    <div>
                      <span className="cause-detail-section-title">BCV755B Syllabus Lecture Notes</span>
                      <ul className="cause-bullet-list">
                        {currentCause.curriculumPoints.map((point, idx) => (
                          <li key={idx} className="cause-bullet-item">
                            <span className="cause-bullet-dot" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Primary Agents Table/Grid */}
                    <div>
                      <span className="cause-detail-section-title">Primary Economic Agents Involved</span>
                      <div className="cause-agents-grid">
                        {currentCause.agents.map((agent, idx) => (
                          <div key={idx} className="cause-agent-chip">
                            <span className="cause-agent-name">{agent.name}</span>
                            <span className="cause-agent-role">{agent.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Solutions */}
                    <div>
                      <span className="cause-detail-section-title" style={{ color: '#4ade80' }}>
                        Conservation &amp; Mitigation Solutions
                      </span>
                      <ul className="cause-bullet-list">
                        {currentCause.solutions.map((sol, idx) => (
                          <li key={idx} className="cause-bullet-item">
                            <span className="cause-bullet-dot" style={{ background: '#4ade80' }} />
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer with Cycle Buttons */}
                  <div className="cause-modal-footer">
                    <button
                      type="button"
                      className="cause-cycle-btn"
                      onClick={() => {
                        setSelectedCauseIndex((prev) => (prev! > 0 ? prev! - 1 : causesList.length - 1));
                      }}
                    >
                      <ChevronLeft size={14} />
                      <span>Previous Cause</span>
                    </button>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                      Cause {selectedCauseIndex! + 1} of {causesList.length}
                    </span>
                    <button
                      type="button"
                      className="cause-cycle-btn"
                      onClick={() => {
                        setSelectedCauseIndex((prev) => (prev! < causesList.length - 1 ? prev! + 1 : 0));
                      }}
                    >
                      <span>Next Cause</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ================================================================
          7. EXPLORE CAUSES CATALOG MODAL (Portal to document.body)
         ================================================================ */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isExploreOpen && (
              <motion.div
                className="deforest-modal-overlay"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExploreOpen(false)}
              >                <motion.div
                className="deforest-modal-window"
                role="dialog"
                aria-modal="true"
                data-lenis-prevent
                  initial={{ scale: 0.94, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: 20 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="deforest-modal-header">
                    <div className="modal-header-left">
                      <span className="modal-overline">VTU BCV755B · CURRICULUM NOTES</span>
                      <h3 className="modal-title">Causes, Agents &amp; Mechanisms of Deforestation</h3>
                    </div>
                    <button
                      type="button"
                      className="modal-close-btn"
                      onClick={() => setIsExploreOpen(false)}
                      aria-label="Close modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Modal Tabs */}
                  <div className="deforest-modal-tabs">
                    <button
                      type="button"
                      className={`modal-tab-btn ${activeModalTab === 'direct' ? 'is-active-tab' : ''}`}
                      onClick={() => setActiveModalTab('direct')}
                    >
                      Direct Causes
                    </button>
                    <button
                      type="button"
                      className={`modal-tab-btn ${activeModalTab === 'underlying' ? 'is-active-tab' : ''}`}
                      onClick={() => setActiveModalTab('underlying')}
                    >
                      Underlying Causes
                    </button>
                    <button
                      type="button"
                      className={`modal-tab-btn ${activeModalTab === 'agents' ? 'is-active-tab' : ''}`}
                      onClick={() => setActiveModalTab('agents')}
                    >
                      Agents of Forest Loss
                    </button>
                    <button
                      type="button"
                      className={`modal-tab-btn ${activeModalTab === 'concepts' ? 'is-active-tab' : ''}`}
                      onClick={() => setActiveModalTab('concepts')}
                    >
                      FAO &amp; Solutions
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="deforest-modal-body" data-lenis-prevent>
                    {/* Quick Access to 6 Detailed Causes from inside the catalog */}
                    <div className="catalog-causes-shortcut-bar">
                      <span className="shortcut-label">Jump to Detailed Cause Study:</span>
                      <div className="shortcut-pills">
                        {causesList.map((c, idx) => (
                          <button
                            key={c.id}
                            type="button"
                            className="shortcut-cause-pill"
                            onClick={() => {
                              setIsExploreOpen(false);
                              setSelectedCauseIndex(idx);
                            }}
                          >
                            <span>{c.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {activeModalTab === 'direct' && (
                      <div className="modal-list-grid">
                        {directCauses.map((c, i) => (
                          <div key={i} className="modal-item-card">
                            <span className="modal-item-num">{String(i + 1).padStart(2, '0')}</span>
                            <p>{c}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeModalTab === 'underlying' && (
                      <div className="modal-list-grid">
                        {underlyingCauses.map((c, i) => (
                                                    <div key={i} className="modal-item-card">
                            <span className="modal-item-num" style={{ color: '#f59e0b' }}>
                              ●
                            </span>
                            <p>{c}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeModalTab === 'agents' && (
                      <div className="agents-grid-table">
                        {agentsTable.map((row, i) => (
                          <div key={i} className="agent-table-row">
                            <span className="agent-row-name">{row.agent}</span>
                            <span className="agent-row-link">{row.link}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeModalTab === 'concepts' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div className="fao-quote-block">
                          <strong>FAO (Food and Agriculture Organisation of UNO) Official Definition:</strong>
                          <br />
                          &ldquo;The conversion of forest to another land use OR the long-term reduction of tree canopy
                          cover below the 10% threshold.&rdquo;
                        </div>

                        <div className="modal-list-grid">
                          <div className="modal-item-card">
                            <div>
                              <strong style={{ color: '#f5f2ed', display: 'block', marginBottom: '4px' }}>
                                Forest Degradation
                              </strong>
                              <p>
                                A process leading to temporary or permanent deterioration in density or structure of
                                vegetation cover or species composition, resulting in lower productive capacity.
                              </p>
                            </div>
                          </div>

                          <div className="modal-item-card">
                            <div>
                              <strong style={{ color: '#f5f2ed', display: 'block', marginBottom: '4px' }}>
                                Forest Fragmentation
                              </strong>
                              <p>
                                Conversion of continuous forest into smaller isolated patches separated by non-forest lands,
                                creating an edge-affected mosaic that disrupts species migration.
                              </p>
                            </div>
                          </div>

                          <div className="modal-item-card">
                            <div>
                              <strong style={{ color: '#4ade80', display: 'block', marginBottom: '4px' }}>
                                Afforestation
                              </strong>
                              <p>
                                Conversion from other land uses into forest, or intentional increase of tree canopy cover
                                above the 10% threshold on land that was not recently forested.
                              </p>
                            </div>
                          </div>

                          <div className="modal-item-card">
                            <div>
                              <strong style={{ color: '#4ade80', display: 'block', marginBottom: '4px' }}>
                                Reforestation
                              </strong>
                              <p>
                                Re-establishment of forest cover on deforested lands through natural regeneration or
                                assisted planting following disturbances.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}


// SCREEN 10: LAND-USE CHANGE — Shire River Case Study
