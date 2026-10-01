import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Wind,
  Layers,
  Droplets,
  Settings,
  ClipboardList,
  Lightbulb,
  CheckCircle2,
  Quote,
  Maximize2,
  X,
  ArrowRight,
  Flame,
  Activity,
  Filter,
  Check,
} from 'lucide-react';
import './ControlEquipmentScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface EquipmentDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Zap;
  type: 'particulate' | 'gaseous';
  image: string;
  badge: string;
  efficiency: string;
  sizeRange: string;
  pressureDrop: string;
  bullets: string[];
  workingPrinciple: string;
  notesData: {
    definition: string;
    mechanism: string;
    applications: string;
    keyAdvantage: string;
  };
}

const primaryEquipment: EquipmentDetail[] = [
  {
    id: 'esp',
    title: 'Electrostatic Precipitator (ESP)',
    subtitle: 'High-Voltage Corona Ionization & Plate Collection',
    icon: Zap,
    type: 'particulate',
    image: '/images/air-esp-model.jpg',
    badge: 'Fine Particulate Control',
    efficiency: 'Up to 99.9%',
    sizeRange: '0.1 – 10 µm',
    pressureDrop: 'Very Low (~100–200 Pa)',
    bullets: [
      'Removes fine particulates (0.1 – 10 µm)',
      'High collection efficiency (up to 99.9%)',
      'Low pressure drop',
      'Used in thermal power plants, cement plants',
    ],
    workingPrinciple:
      'Unburned carbon and ash particles in smoke pass between high-voltage negative wire electrodes and grounded positive metal plates. The coronal electrical field imparts a negative charge to particulates, which migrate to and deposit on the collection plates, allowing clean hot air to escape.',
    notesData: {
      definition: 'A type of electrical filter that uses static electricity to remove soot, ash, and fly-ash from exhaust fumes before exiting smokestacks.',
      mechanism: 'Negative discharge electrode wires ionize passing gas; electrons attach to dust particles giving them negative charge; positively charged collecting plates attract particles; mechanical rappers shake collected dust into bottom hoppers.',
      applications: 'Coal-fired thermal power stations, cement kilns, steel smelters, paper pulp recovery boilers.',
      keyAdvantage: 'Extremely low operating pressure drop means minimal fan power consumption while handling immense gas volumes (millions of m³/h) at temperatures up to 400°C.',
    },
  },
  {
    id: 'cyclone',
    title: 'Cyclone Separator',
    subtitle: 'Centrifugal Force & Inertial Vortex Separation',
    icon: Wind,
    type: 'particulate',
    image: '/images/air-cyclone-model.jpg',
    badge: 'Coarse Dust Pre-Cleaner',
    efficiency: '85 – 95% (Coarse)',
    sizeRange: '> 10 µm',
    pressureDrop: 'Moderate (~500–1500 Pa)',
    bullets: [
      'Removes coarse particles (> 10 µm)',
      'Simple design and low cost',
      'Low maintenance',
      'Used as a pre-cleaner in industries',
    ],
    workingPrinciple:
      'Dirty flue gas enters tangentially at high velocity into a cylindrical/conical chamber, forming an outer downward vortex. Centrifugal inertia drives heavier particles to the outer wall where they lose velocity and slide into the bottom dust hopper. Clean gas reverses direction and spirals up through the central vortex finder.',
    notesData: {
      definition: 'A mechanical separation device utilizing the fundamental principle of inertia to remove coarse particulate matter from flue gas streams without moving parts.',
      mechanism: 'Tangential gas entry generates rapid swirling vortex similar to a tornado; denser particulates have higher inertia than gas molecules, hit cylinder walls, and drop down; clean gas exits through top vortex finder pipe.',
      applications: 'Sawmills, grain elevators, cement pre-cleaning, mineral processing, chemical grinding, and preliminary stage before baghouses.',
      keyAdvantage: 'No moving components, extremely robust steel construction, low capital cost, handles abrasive particles and high dust loadings effortlessly.',
    },
  },
  {
    id: 'baghouse',
    title: 'Fabric Filter (Baghouse)',
    subtitle: 'Dense Felt Fabric Sieving & Pulse-Jet Cleaning',
    icon: Layers,
    type: 'particulate',
    image: '/images/air-baghouse-model.jpg',
    badge: 'Ultra-Fine Dust Filtration',
    efficiency: '99.0 – 99.9%',
    sizeRange: '< 0.1 – 50 µm',
    pressureDrop: 'Higher (~1000–2500 Pa)',
    bullets: [
      'High efficiency for fine particles',
      'Collection efficiency 95 – 99.9%',
      'Works for a wide range of particle sizes',
      'Used in cement, steel, chemical industries',
    ],
    workingPrinciple:
      'Dust-laden flue gases are drawn through densely woven or needle-punched felt filter bags hanging in an airtight chamber. The fabric weave and growing dust cake catch particles on the bag surface. Periodically, high-pressure compressed air pulses down the bags to dislodge dust cake into hoppers below.',
    notesData: {
      definition: 'An industrial filtration system using cylindrical fabric (typically non-woven needle-punched felt) to physically sieve dust and particulate matter from flue gases.',
      mechanism: 'Fabric captures particles via direct interception, inertial impaction, and Brownian diffusion; cake build-up further increases filtration efficiency; reverse pulse-jet air jets clean bags automatically without process interruption.',
      applications: 'Cement manufacture, metallurgical processing, pharmaceutical dust handling, carbon black production, asphalt mixing plants.',
      keyAdvantage: 'Consistently maintains ultra-low emission levels (< 5 mg/Nm³) independent of particle electrical resistivity or dust loading variations.',
    },
  },
  {
    id: 'scrubber',
    title: 'Scrubber (Wet Scrubber)',
    subtitle: 'Flue Gas Desulfurization (FGD) & Counter-Current Absorption',
    icon: Droplets,
    type: 'gaseous',
    image: '/images/air-scrubber-model.jpg',
    badge: 'Acid Gas & Mist Removal',
    efficiency: '95 – 98% (SO₂ / Acid Gas)',
    sizeRange: 'Gases + PM > 1 µm',
    pressureDrop: 'Variable (~500–5000 Pa)',
    bullets: [
      'Removes gaseous pollutants (SO₂, NOₓ, HCl, NH₃) and some particulates',
      'High removal efficiency',
      'Used in chemical, fertilizer and power plants',
      'Types: Spray tower, Packed bed, Venturi scrubber',
    ],
    workingPrinciple:
      'Polluted flue gas containing acidic sulphur and nitrogen oxides rises through a vertical column packed with high-surface-area packing material. An alkaline scrubbing liquid (lime or limestone slurry) is atomized by spray nozzles from above. Intense counter-current mass transfer absorbs and neutralizes acid gases into non-toxic salts.',
    notesData: {
      definition: 'A chemical absorption system designed to capture and neutralize harmful acidic flue gases (especially SOx) and fine particulates before atmospheric release.',
      mechanism: 'Wet Scrubbers spray liquid droplets through rising gas; dry scrubbers inject lime powder; in Flue Gas Desulfurization (FGD), SO₂ reacts with CaCO₃ slurry: SO₂ + CaCO₃ + ½O₂ + 2H₂O → CaSO₄·2H₂O (gypsum), preventing acid rain.',
      applications: 'Coal-fired power plants, chemical synthesis plants, fertilizer manufacturing, municipal waste incinerators, chlorine plants.',
      keyAdvantage: 'Simultaneously neutralizes highly corrosive acid gases (SO₂, HCl, HF) while quenching gas temperature and capturing residual condensable aerosols.',
    },
  },
];

const otherEquipment = [
  {
    name: 'Adsorber (Activated Carbon)',
    image: '/images/air-other-adsorber.jpg',
    caption: 'Removes VOCs and odorous gases',
    detail: 'Porous carbon pellets provide over 1,000 m²/g surface area to capture volatile hydrocarbons.',
  },
  {
    name: 'Catalytic Converter',
    image: '/images/air-other-catalytic.jpg',
    caption: 'Reduces CO, NOx and hydrocarbons (in vehicles)',
    detail: 'Three-way platinum/rhodium honeycomb substrate converts CO and HC into CO₂ and H₂O, and NOₓ to N₂.',
  },
  {
    name: 'Absorber',
    image: '/images/air-other-absorber.jpg',
    caption: 'Removes gaseous pollutants using chemical absorbents',
    detail: 'Bubble-cap or sieve tray column facilitating selective dissolution of gaseous contaminants into scrubbing liquor.',
  },
  {
    name: 'Thermal Incinerator',
    image: '/images/air-other-incinerator.jpg',
    caption: 'Destroys organic pollutants (VOCs) at high temperatures',
    detail: 'Refractory afterburners maintain 750°C–1000°C with 0.5–2.0s residence time for complete oxidation.',
  },
];

const selectionFactors = [
  'Type of pollutant (particulate or gaseous)',
  'Particle size and concentration',
  'Required collection efficiency',
  'Gas flow rate and temperature',
  'Space availability and maintenance',
  'Cost and operational requirements',
];

const keyTakeaways = [
  'Different control equipment is used for different types of pollutants.',
  'ESP, cyclone and bag filters are mainly used for particulate control.',
  'Scrubbers, absorbers and adsorbers are used for gaseous pollutant control.',
  'Proper selection and maintenance improve air quality and ensure regulatory compliance.',
];

export function ControlEquipmentScreen() {
  const [filterMode, setFilterMode] = useState<'particulate' | 'gaseous' | 'combined'>('particulate');
  const [inspectItem, setInspectItem] = useState<EquipmentDetail | null>(null);

  // Lock scroll, pause Lenis, route wheel delta and handle Escape
  useModalScrollLock(Boolean(inspectItem), () => setInspectItem(null));

  return (
    <section className="air-chapter-screen control-equipment-screen" id="ch-equipment">
      {/* ─── INDUSTRIAL BACKGROUND (Image 2: Sunset Refinery with Towers & Smokestacks) ─── */}
      <div className="equipment-hero-backdrop" aria-hidden="true">
        <img
          src="/images/air-control-equipment-bg.jpg"
          alt="Modern industrial plant and refinery at sunset with emissions control smokestacks"
          className="equipment-backdrop-img"
        />
        <div className="equipment-backdrop-scrim-left" />
        <div className="equipment-backdrop-scrim-bottom" />
        <div className="equipment-backdrop-scrim-top" />
      </div>

      {/* ─── TOP HEADER SECTION ─── */}
      <div className="equipment-header-wrapper">
        <div className="equipment-header-left">
          <div className="equipment-ch-badge">
            <span className="equipment-ch-num">CHAPTER 08</span>
            <span className="equipment-ch-sep">/</span>
            <span className="equipment-ch-sub">PART 08 · ENGINEERING SOLUTIONS</span>
          </div>

          <h1 className="equipment-main-title">
            Control Equipment <span className="equipment-title-gradient">for Air Pollution</span>
          </h1>

          <p className="equipment-header-desc">
            Air pollution control equipment is used to remove or reduce pollutants from industrial and
            other emission sources before they are released into the atmosphere. The choice of
            equipment depends on the type of pollutant, particle size, concentration, gas flow rate
            and cost.
          </p>

          {/* Interactive Filter Pills */}
          <div className="equipment-filter-bar">
            <button
              type="button"
              className={`equipment-filter-pill ${filterMode === 'particulate' ? 'is-active' : ''}`}
              onClick={() => setFilterMode('particulate')}
            >
              <Zap size={14} className="filter-pill-icon" />
              <span>Particulate Control</span>
            </button>

            <button
              type="button"
              className={`equipment-filter-pill ${filterMode === 'gaseous' ? 'is-active' : ''}`}
              onClick={() => setFilterMode('gaseous')}
            >
              <Droplets size={14} className="filter-pill-icon" />
              <span>Gaseous Control</span>
            </button>

            <button
              type="button"
              className={`equipment-filter-pill ${filterMode === 'combined' ? 'is-active' : ''}`}
              onClick={() => setFilterMode('combined')}
            >
              <Settings size={14} className="filter-pill-icon" />
              <span>Combined Systems</span>
            </button>
          </div>
        </div>

        {/* Top Right Glassmorphic Quote Box */}
        <div className="equipment-quote-box">
          <div className="equipment-quote-icon-wrap">
            <Quote size={28} className="equipment-quote-icon" />
          </div>
          <p className="equipment-quote-text">
            Control equipment helps industries reduce harmful emissions and meet environmental
            standards, leading to cleaner air and a healthier environment.
          </p>
          <div className="equipment-quote-footer">
            <span className="equipment-quote-tag">CPCB Clean Technology Directive</span>
          </div>
        </div>
      </div>

      {/* ─── COMBINED SYSTEMS PROCESS TRAIN (When 'Combined' is Active) ─── */}
      <AnimatePresence>
        {filterMode === 'combined' && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="equipment-process-train"
          >
            <div className="process-train-header">
              <span className="process-train-label">MULTI-STAGE INDUSTRIAL CLEANING TRAIN</span>
              <span className="process-train-stat">Standard Thermal Power & Smelter Layout</span>
            </div>
            <div className="process-train-steps">
              <div className="process-step">
                <span className="process-step-num">STAGE 01</span>
                <strong>Cyclone Separator</strong>
                <p>Arrests 90%+ coarse dust (&gt;10 µm) by inertia</p>
              </div>
              <ArrowRight size={18} className="process-arrow" />
              <div className="process-step">
                <span className="process-step-num">STAGE 02</span>
                <strong>ESP / Baghouse</strong>
                <p>Captures submicron fly-ash (0.1–10 µm) with 99.9% efficiency</p>
              </div>
              <ArrowRight size={18} className="process-arrow" />
              <div className="process-step">
                <span className="process-step-num">STAGE 03</span>
                <strong>Wet Scrubber (FGD)</strong>
                <p>Neutralizes SO₂ &amp; acid gases into synthetic gypsum</p>
              </div>
              <ArrowRight size={18} className="process-arrow" />
              <div className="process-step is-clean">
                <span className="process-step-num">RESULT</span>
                <strong>Clean Stack Emission</strong>
                <p>&lt; 30 mg/Nm³ compliant with 2009 NAAQS</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── ROW 1: 4 PRIMARY EQUIPMENT CARDS ─── */}
      <div className="equipment-primary-grid">
        {primaryEquipment.map((item) => {
          const IconComponent = item.icon;
          const isHighlighted =
            filterMode === 'combined' ||
            filterMode === item.type;

          return (
            <motion.div
              key={item.id}
              className={`equipment-card ${isHighlighted ? 'is-highlighted' : 'is-dimmed'}`}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Card Header */}
              <div className="equipment-card-header">
                <div className="equipment-icon-circle">
                  <IconComponent size={16} />
                </div>
                <h3 className="equipment-card-title">{item.title}</h3>
              </div>

              {/* 3D Cutaway Model Window */}
              <div
                className="equipment-model-box"
                onClick={() => setInspectItem(item)}
                title="Click to inspect 3D technical cutaway"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setInspectItem(item)}
              >
                <img
                  src={item.image}
                  alt={`${item.title} 3D cutaway engineering diagram`}
                  className="equipment-model-img"
                  loading="lazy"
                />
                <div className="equipment-model-badge">
                  <Maximize2 size={12} />
                  <span>Inspect Cutaway</span>
                </div>
              </div>

              {/* Bullet Points with Green Checkmarks */}
              <ul className="equipment-bullet-list">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="equipment-bullet-item">
                    <span className="equipment-check-icon">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="equipment-bullet-text">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* ─── ROW 2: OTHER EQUIPMENT · SELECTION FACTORS · KEY TAKEAWAYS ─── */}
      <div className="equipment-secondary-grid">
        {/* BLOCK 1: Other Control Equipment */}
        <div className="equipment-secondary-card other-equipment-card">
          <div className="secondary-card-header">
            <Settings size={18} className="secondary-header-icon" />
            <h4 className="secondary-card-title">Other Control Equipment</h4>
          </div>

          <div className="other-equipment-subgrid">
            {otherEquipment.map((sub, sIdx) => (
              <div key={sIdx} className="other-equipment-item">
                <div className="other-equipment-thumb-box">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="other-equipment-thumb-img"
                    loading="lazy"
                  />
                </div>
                <div className="other-equipment-info">
                  <h5 className="other-equipment-name">{sub.name}</h5>
                  <p className="other-equipment-caption">{sub.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCK 2: Selection Factors */}
        <div className="equipment-secondary-card selection-factors-card">
          <div className="secondary-card-header factors-header">
            <ClipboardList size={18} className="secondary-header-icon" />
            <h4 className="secondary-card-title">Selection Factors</h4>
          </div>

          <ul className="factors-list">
            {selectionFactors.map((factor, fIdx) => (
              <li key={fIdx} className="factor-item">
                <span className="factor-bullet-circle">
                  <span className="factor-bullet-dot" />
                </span>
                <span className="factor-text">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BLOCK 3: Key Takeaways */}
        <div className="equipment-secondary-card takeaways-card">
          <div className="secondary-card-header takeaways-header">
            <Lightbulb size={18} className="secondary-header-icon" />
            <h4 className="secondary-card-title">Key Takeaways</h4>
          </div>

          <ul className="takeaways-list">
            {keyTakeaways.map((takeaway, tIdx) => (
              <li key={tIdx} className="takeaway-item">
                <span className="takeaway-check-circle">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="takeaway-text">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ─── MODAL: FULL RESOLUTION 3D CUTAWAY INSPECTION ─── */}
      <AnimatePresence>
        {inspectItem && (
          <motion.div
            className="equipment-modal-overlay"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectItem(null)}
          >
            <motion.div
              className="equipment-modal-content"
              data-lenis-prevent
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="modal-header">
                <div>
                  <span className="modal-kicker">ENGINEERING 3D CUTAWAY BLUEPRINT</span>
                  <h3 className="modal-title">{inspectItem.title}</h3>
                  <p className="modal-subtitle">{inspectItem.subtitle}</p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setInspectItem(null)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Image */}
              <div className="modal-image-wrap">
                <img
                  src={inspectItem.image}
                  alt={`${inspectItem.title} High-resolution technical cutaway`}
                  className="modal-img"
                />
              </div>

              {/* Key Specs Bar */}
              <div className="modal-specs-bar">
                <div className="modal-spec-chip">
                  <span className="chip-label">Collection Efficiency</span>
                  <strong className="chip-val">{inspectItem.efficiency}</strong>
                </div>
                <div className="modal-spec-chip">
                  <span className="chip-label">Particle Size Range</span>
                  <strong className="chip-val">{inspectItem.sizeRange}</strong>
                </div>
                <div className="modal-spec-chip">
                  <span className="chip-label">Pressure Drop</span>
                  <strong className="chip-val">{inspectItem.pressureDrop}</strong>
                </div>
                <div className="modal-spec-chip">
                  <span className="chip-label">Classification</span>
                  <strong className="chip-val" style={{ textTransform: 'capitalize' }}>
                    {inspectItem.type} Removal
                  </strong>
                </div>
              </div>

              {/* Syllabus Technical Notes Deep Dive */}
              <div className="modal-notes-grid">
                <div className="modal-note-box">
                  <h4>Working Principle &amp; Mechanism</h4>
                  <p>{inspectItem.notesData.mechanism}</p>
                </div>
                <div className="modal-note-box">
                  <h4>Key Industrial Applications</h4>
                  <p>{inspectItem.notesData.applications}</p>
                </div>
                <div className="modal-note-box full-width">
                  <h4>Engineering Advantages &amp; Operating Rationale</h4>
                  <p>{inspectItem.notesData.keyAdvantage}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default ControlEquipmentScreen;
