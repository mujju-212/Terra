import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBioModalScrollLock } from './useBioModalScrollLock';
import {
  Leaf,
  Fish,
  Pill,
  Atom,
  Stethoscope,
  BarChart2,
  Globe,
  IndianRupee,
  Users,
  Settings,
  GraduationCap,
  ArrowRight,
  X,
  Info,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';

/* --------------------------------------------------------------------------
   DATA TYPES & STRUCTURES
   -------------------------------------------------------------------------- */
interface DrugRow {
  id: string;
  plantName: string;
  botanicalName?: string;
  thumbnail: string;
  compound: string;
  drugUse: string;
  treatment: string;
  details: {
    origin: string;
    mechanism: string;
    clinicalSignificance: string;
    conservationNote: string;
  };
}

interface FisheryType {
  id: string;
  title: string;
  image: string;
  bullets: string[];
  details: {
    habitatDescription: string;
    keySpecies: string[];
    economicContribution: string;
    sustainabilityChallenge: string;
  };
}

interface PipelineStep {
  id: string;
  stepNum: number;
  title: string;
  subtitle: string;
  iconType: 'plant-photo' | 'molecule' | 'drug' | 'health';
  photoUrl?: string;
  description: string;
  keyActivity: string;
}

/* --------------------------------------------------------------------------
   MOCKUP ACCURATE DATA DEFINITIONS
   -------------------------------------------------------------------------- */
const DRUG_ROWS: DrugRow[] = [
  {
    id: 'cinchona',
    plantName: 'Cinchona (Quinine)',
    botanicalName: 'Cinchona calisaya / Cinchona officinalis',
    thumbnail: '/images/bio-plant-cinchona.jpg',
    compound: 'Quinine',
    drugUse: 'Antimalarial',
    treatment: 'Malaria',
    details: {
      origin: 'Andean cloud forests of South America (bark extracted by Quechua people).',
      mechanism: 'Inhibits hemozoin biocrystallization in Plasmodium falciparum, causing toxic heme build-up in malaria parasites.',
      clinicalSignificance: 'First effective treatment against malaria in world history; basis for synthetic chloroquine and mefloquine.',
      conservationNote: 'Historic wild stands were heavily exploited; now cultivated in sustainable agroforestry plantations.',
    },
  },
  {
    id: 'foxglove',
    plantName: 'Foxglove (Digitalis)',
    botanicalName: 'Digitalis purpurea',
    thumbnail: '/images/bio-plant-foxglove.jpg',
    compound: 'Digitalin',
    drugUse: 'Cardiac drug',
    treatment: 'Heart conditions',
    details: {
      origin: 'Temperate woodlands of Western and Southwestern Europe.',
      mechanism: 'Inhibits the cardiac sodium-potassium ATPase pump (Na+/K+-ATPase), increasing intracellular calcium and myocardial contractility.',
      clinicalSignificance: 'Standard treatment for congestive heart failure and atrial fibrillation to regulate cardiac rhythm.',
      conservationNote: 'Widely cultivated botanically; exact titration is critical due to narrow therapeutic therapeutic index.',
    },
  },
  {
    id: 'willow',
    plantName: 'Willow (Salix)',
    botanicalName: 'Salix alba (White Willow)',
    thumbnail: '/images/bio-plant-willow.jpg',
    compound: 'Salicin',
    drugUse: 'Aspirin',
    treatment: 'Pain, fever, inflammation',
    details: {
      origin: 'Riparian wetlands across temperate North America, Europe, and Asia.',
      mechanism: 'Metabolized into salicylic acid in the human body, irreversibly inhibiting cyclooxygenase (COX-1 & COX-2) enzymes.',
      clinicalSignificance: 'Inspired the chemical synthesis of acetylsalicylic acid (Aspirin) in 1897—the world’s most widely consumed medicine.',
      conservationNote: 'Willow wetlands serve essential riparian buffer functions; sustainable coppicing preserves riverbank ecology.',
    },
  },
  {
    id: 'turmeric',
    plantName: 'Turmeric (Curcuma longa)',
    botanicalName: 'Curcuma longa (Zingiberaceae)',
    thumbnail: '/images/bio-plant-turmeric.jpg',
    compound: 'Curcumin',
    drugUse: 'Anti-inflammatory',
    treatment: 'Arthritis, chronic diseases',
    details: {
      origin: 'Indian subcontinent and Southeast Asia; sacred Ayurvedic medicinal rhizome for over 4,000 years.',
      mechanism: 'Suppresses NF-κB transcription factor, downregulating pro-inflammatory cytokines (TNF-α, IL-6) and COX-2.',
      clinicalSignificance: 'Extensive modern clinical trials for rheumatoid arthritis, inflammatory bowel disease, neuroprotection, and oncology.',
      conservationNote: 'Rich agro-biodiversity preserved through traditional indigenous farming practices in South Asia.',
    },
  },
  {
    id: 'periwinkle',
    plantName: 'Madagascar Periwinkle',
    botanicalName: 'Catharanthus roseus',
    thumbnail: '/images/bio-plant-periwinkle.jpg',
    compound: 'Vincristine, Vinblastine',
    drugUse: 'Anticancer',
    treatment: 'Leukemia, lymphoma',
    details: {
      origin: 'Endemic rainforest and dry scrub regions of Madagascar.',
      mechanism: 'Binds to tubulin dimers, disrupting mitotic spindle formation and arresting cancer cell division in metaphase.',
      clinicalSignificance: 'Increased childhood acute lymphoblastic leukemia survival rate from under 10% in 1960 to over 90% today.',
      conservationNote: 'Classic textbook case of Nagoya Protocol bioprospecting—emphasizes fair benefit-sharing with indigenous territories.',
    },
  },
  {
    id: 'pacific-yew',
    plantName: 'Pacific Yew (Taxus brevifolia)',
    botanicalName: 'Taxus brevifolia',
    thumbnail: '/images/bio-plant-yew.jpg',
    compound: 'Paclitaxel (Taxol)',
    drugUse: 'Anticancer',
    treatment: 'Breast, ovarian cancer',
    details: {
      origin: 'Old-growth Pacific Northwest temperate rainforests of North America.',
      mechanism: 'Hyper-stabilizes microtubule polymers, preventing cancer cells from disassembling spindles during cell division.',
      clinicalSignificance: 'Essential frontline chemotherapy agent for metastatic ovarian, breast, and non-small cell lung carcinomas.',
      conservationNote: 'Early harvesting required stripping mature bark, killing ancient trees. Breakthrough semi-synthesis from renewable needle clippings now safeguards old-growth forests.',
    },
  },
];

const FISHERY_TYPES: FisheryType[] = [
  {
    id: 'marine',
    title: 'Marine Fisheries',
    image: '/images/bio-economic/marine.jpg',
    bullets: [
      'Oceans and seas',
      'High productivity',
      'Important for global food supply',
    ],
    details: {
      habitatDescription: 'Deep oceanic pelagic zones, continental shelves, upwelling ecosystems, and vibrant coral reef habitats.',
      keySpecies: ['Tuna (Albacore, Skipjack)', 'Sardines & Anchovies', 'Cod & Mackerel', 'Deep-sea Squid'],
      economicContribution: 'Generates over $150 billion in global annual marine landings, supplying primary protein to coastal nations.',
      sustainabilityChallenge: 'Overfishing by industrial super-trawlers, destructive bottom trawling, and climate-induced ocean warming.',
    },
  },
  {
    id: 'inland',
    title: 'Inland Fisheries',
    image: '/images/bio-economic/inland.jpg',
    bullets: [
      'Rivers, lakes, ponds',
      'Supports local livelihoods',
      'Rich in freshwater fish species',
    ],
    details: {
      habitatDescription: 'Freshwater river systems (Ganga, Mekong, Amazon), natural floodplains, tectonic lakes, and oxbow reservoirs.',
      keySpecies: ['Rohu (Labeo rohita)', 'Catla (Gibelion catla)', 'Tilapia', 'Freshwater Catfishes (Singhi, Magur)'],
      economicContribution: 'Sustains over 60 million artisanal inland fishers and provides affordable micronutrients to rural communities.',
      sustainabilityChallenge: 'Dams fragmenting migratory routes, industrial effluent runoff, agricultural siltation, and invasive species.',
    },
  },
  {
    id: 'brackishwater',
    title: 'Brackishwater Fisheries',
    image: '/images/bio-economic/brackish.jpg',
    bullets: [
      'Estuaries and lagoons',
      'Supports diverse species (e.g., shrimp, mullet)',
      'High economic value',
    ],
    details: {
      habitatDescription: 'Dynamic tidal transition zones where freshwater meets the sea—mangrove estuaries, tidal creeks, and coastal lagoons (e.g., Chilika Lake).',
      keySpecies: ['Tiger Shrimp (Penaeus monodon)', 'White Leg Shrimp', 'Grey Mullet (Mugil cephalus)', 'Mud Crab (Scylla serrata)'],
      economicContribution: 'High-value export commodity driving coastal trade and blue economy employment in tropical deltas.',
      sustainabilityChallenge: 'Destruction of protective mangrove buffers for unscientific ponds, salinization of coastal agricultural aquifers.',
    },
  },
  {
    id: 'aquaculture',
    title: 'Aquaculture',
    image: '/images/bio-economic/aquaculture.jpg',
    bullets: [
      'Controlled fish farming',
      'Helps meet growing demand',
      'Reduces pressure on wild populations',
    ],
    details: {
      habitatDescription: 'Intensive and semi-intensive engineered aquatic environments—floating marine sea cages, raceways, and recirculating aquaculture systems (RAS).',
      keySpecies: ['Atlantic Salmon', 'Pangasius Catfish', 'Penaeid Shrimps', 'Oysters, Clams & Seaweeds'],
      economicContribution: 'Now surpasses 52% of all aquatic foods consumed globally; fastest-growing agricultural sub-sector.',
      sustainabilityChallenge: 'Fishmeal dependency for feed, local water eutrophication, antibiotic stewardship, and biosecurity containment.',
    },
  },
];

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'step-1',
    stepNum: 1,
    title: 'Medicinal Plant',
    subtitle: '(biodiversity)',
    iconType: 'plant-photo',
    photoUrl: '/images/bio-economic/medicinal-plant.jpg',
    description: 'Indigenous communities and ethnobotanists identify biological species containing therapeutic properties.',
    keyActivity: 'Ethnobotanical surveying & biodiversity prospecting.',
  },
  {
    id: 'step-2',
    stepNum: 2,
    title: 'Bioactive Compound',
    subtitle: '(isolation)',
    iconType: 'molecule',
    description: 'Phytochemists extract, purify, and characterize active secondary metabolites (alkaloids, terpenoids, polyphenols).',
    keyActivity: 'Spectroscopic fractionation (NMR, Mass Spectrometry, HPLC).',
  },
  {
    id: 'step-3',
    stepNum: 3,
    title: 'Drug',
    subtitle: '(development)',
    iconType: 'drug',
    description: 'Medicinal chemists optimize molecules, conducting pre-clinical assays, formulation engineering, and randomized clinical trials.',
    keyActivity: 'Phase I–III human clinical trials & regulatory safety review.',
  },
  {
    id: 'step-4',
    stepNum: 4,
    title: 'Human Health',
    subtitle: '(treatment)',
    iconType: 'health',
    description: 'Final pharmaceutical therapeutic formulation reaches healthcare systems worldwide, curing life-threatening diseases.',
    keyActivity: 'Global therapeutic delivery & saving millions of lives daily.',
  },
];

export function BioEconomicScreen() {
  const [selectedDrug, setSelectedDrug] = useState<DrugRow | null>(null);
  const [selectedFishery, setSelectedFishery] = useState<FisheryType | null>(null);
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<PipelineStep | null>(null);

  // Robust modal scroll lock & wheel forwarding
  const isModalOpen = selectedDrug !== null || selectedFishery !== null || selectedPipelineStep !== null;
  useBioModalScrollLock(isModalOpen, () => {
    setSelectedDrug(null);
    setSelectedFishery(null);
    setSelectedPipelineStep(null);
  });

  // Smooth scroll to next chapter
  const handleContinue = () => {
    const el = document.getElementById('ch-summary');
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="bio-screen bio-economic-section" id="ch-economic">
      <div className="bio-economic-container">
        {/* ===================================================================
            HERO PANORAMA CARD (Scenic Mountains, Water, Fishery & Herbal Tinctures)
            =================================================================== */}
        <div className="bio-econ-hero-card">
          {/* Pristine Background Scenery */}
          <div className="bio-econ-hero-bg-wrap">
            <img
              src="/images/bio-economic/hero-bg.jpg"
              alt="Medicinal Herbs, Waterfall, Fishing Trawler, and Coral Reef Panorama"
              className="bio-econ-hero-bg-img"
            />
            {/* Seamless gradient overlay ensuring left typography readability */}
            <div className="bio-econ-hero-gradient-overlay" />
          </div>

          {/* Left Title, Subtitle, and Lead Content */}
          <div className="bio-econ-hero-left">
            <div className="bio-econ-badge">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 10</span>
            </div>

            <h1 className="bio-econ-title">
              Economic Values: Medicinal Plants, Drugs &amp; Fisheries
            </h1>

            <h2 className="bio-econ-subtitle">
              Biodiversity for Human Well-being
            </h2>

            <p className="bio-econ-lead">
              Biodiversity provides immense economic value through medicinal plants, pharmaceuticals, fisheries and other
              bioresources. Sustainable use of these resources supports livelihoods, healthcare and food security.
            </p>
          </div>

          {/* Floating Pill Badges on the Scenery Backdrop */}
          {/* 1. Amber Pill near Mortar & Pestle */}
          <div
            className="bio-econ-scenery-pill pill-medicines"
            style={{ left: '55%', top: '24%' }}
            onClick={() => setSelectedPipelineStep(PIPELINE_STEPS[0])}
            role="button"
            tabIndex={0}
            title="Click to view medicinal discovery pipeline"
          >
            <span className="pill-text-line">From Nature</span>
            <span className="pill-text-line">to New Medicines</span>
          </div>

          {/* 2. Cyan Pill near Fishing Trawler / Aquaculture Cage */}
          <div
            className="bio-econ-scenery-pill pill-fisheries"
            style={{ right: '6%', top: '56%' }}
            onClick={() => setSelectedFishery(FISHERY_TYPES[0])}
            role="button"
            tabIndex={0}
            title="Click to explore sustainable fisheries"
          >
            <Fish className="w-3.5 h-3.5 text-cyan-300 inline-block mr-1.5" />
            <div className="pill-stacked">
              <span>Healthy Fisheries</span>
              <span>Sustain Communities</span>
            </div>
          </div>

          {/* Top-Right Liquid Glass Quote Card */}
          <div className="bio-econ-hero-quote-card">
            <span className="bio-econ-quote-mark">❝</span>
            <p className="bio-econ-quote-body">
              Biodiversity fuels medicine, food and livelihoods — it is a foundation of healthy and resilient societies.
            </p>
            <span className="bio-econ-quote-mark-end">❞</span>
          </div>
        </div>

        {/* ===================================================================
            MIDDLE SECTION: TWO MAIN PANELS (Medicinal Plants & Fisheries)
            =================================================================== */}
        <div className="bio-econ-middle-row">
          {/* ---------------------------------------------------------------
              PANEL 1: 1 Medicinal Plants and Drugs (Left ~50% Column)
              --------------------------------------------------------------- */}
          <div className="bio-econ-panel bio-econ-panel-medicinal" id="panel-medicinal">
            {/* Panel Header */}
            <div className="bio-econ-panel-header">
              <div className="bio-econ-step-badge badge-green">
                <span className="step-num">1</span>
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="bio-econ-panel-titles">
                <h3>Medicinal Plants and Drugs</h3>
                <p>Plants and other organisms are rich sources of bioactive compounds used in modern medicine.</p>
              </div>
            </div>

            {/* 4-Step Drug Discovery Pathway */}
            <div className="bio-econ-pipeline">
              {PIPELINE_STEPS.map((step, idx) => (
                <React.Fragment key={step.id}>
                  <div
                    className="bio-econ-pipeline-node"
                    onClick={() => setSelectedPipelineStep(step)}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Node Visual / Thumbnail */}
                    <div className="bio-econ-node-visual">
                      {step.iconType === 'plant-photo' && (
                        <div className="node-photo-wrapper">
                          <img
                            src={step.photoUrl}
                            alt="Medicinal Plant"
                            className="node-photo-img"
                          />
                        </div>
                      )}
                      {step.iconType === 'molecule' && (
                        <div className="node-icon-wrapper icon-molecule">
                          <Atom className="w-6 h-6 text-purple-300 animate-pulse" />
                        </div>
                      )}
                      {step.iconType === 'drug' && (
                        <div className="node-icon-wrapper icon-drug">
                          <Pill className="w-6 h-6 text-sky-300" />
                        </div>
                      )}
                      {step.iconType === 'health' && (
                        <div className="node-icon-wrapper icon-health">
                          <Stethoscope className="w-6 h-6 text-emerald-300" />
                        </div>
                      )}
                    </div>

                    {/* Node Text */}
                    <div className="bio-econ-node-labels">
                      <strong className="node-title">{step.title}</strong>
                      <span className="node-sub">{step.subtitle}</span>
                    </div>
                  </div>

                  {/* Flow Arrow between steps */}
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <div className="bio-econ-pipeline-arrow">
                      <span>➔</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom Table: Examples of Drugs from Plants */}
            <div className="bio-econ-table-wrap">
              <div className="bio-econ-table-title-bar">
                <Pill className="w-4 h-4 text-emerald-400" />
                <h4>Examples of Drugs from Plants</h4>
                <span className="bio-econ-table-hint">Click row for pharmacological bio-mechanism</span>
              </div>

              <div className="bio-econ-table-scroller">
                <table className="bio-econ-table">
                  <thead>
                    <tr>
                      <th style={{ width: '28%' }}>Plant</th>
                      <th style={{ width: '26%' }}>Active Compound</th>
                      <th style={{ width: '20%' }}>Drug / Use</th>
                      <th style={{ width: '26%' }}>Use / Treatment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DRUG_ROWS.map((row) => (
                      <tr
                        key={row.id}
                        className="bio-econ-table-row"
                        onClick={() => setSelectedDrug(row)}
                        role="button"
                        tabIndex={0}
                      >
                        <td className="cell-plant">
                          <div className="cell-plant-flex">
                            <img
                              src={row.thumbnail}
                              alt={row.plantName}
                              className="cell-plant-thumb"
                            />
                            <span className="cell-plant-name">{row.plantName}</span>
                          </div>
                        </td>
                        <td className="cell-compound">{row.compound}</td>
                        <td className="cell-drug">{row.drugUse}</td>
                        <td className="cell-treatment">{row.treatment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------
              PANEL 2: 2 Fisheries and Aquatic Resources (Right ~50% Column)
              --------------------------------------------------------------- */}
          <div className="bio-econ-panel bio-econ-panel-fisheries" id="panel-fisheries">
            {/* Panel Header */}
            <div className="bio-econ-panel-header">
              <div className="bio-econ-step-badge badge-blue">
                <span className="step-num">2</span>
                <Fish className="w-4 h-4 text-sky-400" />
              </div>
              <div className="bio-econ-panel-titles">
                <h3>Fisheries and Aquatic Resources</h3>
                <p>Fisheries provide food, employment and economic benefits to millions of people worldwide.</p>
              </div>
            </div>

            {/* Top Stat Cards Grid (4 Key Metrics) */}
            <div className="bio-econ-stats-grid">
              {/* Stat 1: 200+ million */}
              <div className="bio-econ-stat-card card-livelihood">
                <div className="stat-icon-wrap icon-blue">
                  <Fish className="w-5 h-5 text-sky-400" />
                </div>
                <div className="stat-content">
                  <div className="stat-value text-sky-300">200+ million</div>
                  <div className="stat-label">People depend on fisheries for livelihood</div>
                </div>
              </div>

              {/* Stat 2: 20% protein */}
              <div className="bio-econ-stat-card card-protein">
                <div className="stat-icon-wrap icon-amber">
                  <BarChart2 className="w-5 h-5 text-amber-400" />
                </div>
                <div className="stat-content">
                  <div className="stat-value text-amber-300">20%</div>
                  <div className="stat-label">of animal protein consumed globally from fish</div>
                </div>
              </div>

              {/* Stat 3: ~62 million */}
              <div className="bio-econ-stat-card card-employed">
                <div className="stat-icon-wrap icon-cyan">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="stat-content">
                  <div className="stat-value text-cyan-300">~62 million</div>
                  <div className="stat-label">People employed directly in fisheries and aquaculture</div>
                </div>
              </div>

              {/* Stat 4: High Economic Value */}
              <div className="bio-econ-stat-card card-economy">
                <div className="stat-icon-wrap icon-gold">
                  <IndianRupee className="w-5 h-5 text-amber-300" />
                </div>
                <div className="stat-content">
                  <div className="stat-value text-amber-300">High Economic Value</div>
                  <div className="stat-label">Supports food security, trade and coastal communities</div>
                </div>
              </div>
            </div>

            {/* Bottom Sub-section: Types of Fisheries */}
            <div className="bio-econ-fisheries-section">
              <div className="bio-econ-fisheries-title-bar">
                <Fish className="w-4 h-4 text-sky-400" />
                <h4>Types of Fisheries</h4>
                <span className="bio-econ-table-hint">Click card to explore ecology &amp; species</span>
              </div>

              <div className="bio-econ-fisheries-grid">
                {FISHERY_TYPES.map((fishType) => (
                  <div
                    key={fishType.id}
                    className="bio-econ-fish-card"
                    onClick={() => setSelectedFishery(fishType)}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Visual Card Image */}
                    <div className="fish-card-image-wrap">
                      <img
                        src={fishType.image}
                        alt={fishType.title}
                        className="fish-card-img"
                      />
                      <div className="fish-card-img-overlay" />
                    </div>

                    {/* Card Content */}
                    <div className="fish-card-body">
                      <h5 className="fish-card-title">{fishType.title}</h5>
                      <ul className="fish-card-bullets">
                        {fishType.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <span className="fish-bullet-dot" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM ROW: KEY TAKEAWAYS (Left) & CONTINUE BUTTON (Right)
            =================================================================== */}
        <div className="bio-econ-bottom-row">
          {/* Left: Key Takeaways Bar */}
          <div className="bio-econ-takeaways-card">
            <div className="takeaways-header">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Key Takeaways</span>
            </div>

            <div className="takeaways-pills-wrap">
              {/* Pill 1: Medicinal plants */}
              <div className="takeaway-pill pill-medicinal">
                <div className="takeaway-icon-circle icon-green">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="takeaway-text">
                  Medicinal plants provide vital drugs and healthcare solutions.
                </span>
              </div>

              {/* Pill 2: Fisheries livelihood */}
              <div className="takeaway-pill pill-fisheries">
                <div className="takeaway-icon-circle icon-amber">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="takeaway-text">
                  Fisheries support food security and millions of livelihoods.
                </span>
              </div>

              {/* Pill 3: Sustainable use */}
              <div className="takeaway-pill pill-sustainable">
                <div className="takeaway-icon-circle icon-cyan">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="takeaway-text">
                  Sustainable use ensures long-term economic and ecological benefits.
                </span>
              </div>

              {/* Pill 4: Conservation */}
              <div className="takeaway-pill pill-conservation">
                <div className="takeaway-icon-circle icon-blue">
                  <Settings className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <span className="takeaway-text">
                  Conservation of biodiversity helps maintain these economic values.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Continue Navigation Button */}
          <button
            onClick={handleContinue}
            className="bio-econ-continue-btn"
            title="Proceed to Chapter 11: Module Summary"
          >
            <div className="btn-text-wrap">
              <span>Continue to</span>
              <strong>Module Summary</strong>
            </div>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* ===================================================================
            INTERACTIVE MODAL 1: DRUG PHARMACOLOGY & BIOPROSPECTING
            =================================================================== */}
        <AnimatePresence>
          {selectedDrug && (
            <div 
              className="bio-econ-modal-backdrop" 
              data-lenis-prevent
              onClick={() => setSelectedDrug(null)}
            >
              <motion.div
                className="bio-econ-modal-card"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bio-econ-modal-header">
                  <div className="modal-title-left">
                    <img
                      src={selectedDrug.thumbnail}
                      alt={selectedDrug.plantName}
                      className="modal-plant-avatar"
                    />
                    <div>
                      <h3>{selectedDrug.plantName}</h3>
                      {selectedDrug.botanicalName && (
                        <p className="modal-botanical-name">
                          <em>{selectedDrug.botanicalName}</em>
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    className="modal-close-btn"
                    onClick={() => setSelectedDrug(null)}
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="bio-econ-modal-body" data-lenis-prevent>
                  {/* Key Stats Bar */}
                  <div className="modal-meta-grid">
                    <div className="meta-item">
                      <span className="meta-label">Active Compound</span>
                      <strong className="meta-val text-emerald-400">{selectedDrug.compound}</strong>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Pharmaceutical Class</span>
                      <strong className="meta-val text-sky-400">{selectedDrug.drugUse}</strong>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Therapeutic Indication</span>
                      <strong className="meta-val text-amber-300">{selectedDrug.treatment}</strong>
                    </div>
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Geographic &amp; Ethnobotanical Origin</span>
                    </div>
                    <p className="section-text">{selectedDrug.details.origin}</p>
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <Atom className="w-4 h-4 text-purple-400" />
                      <span>Biochemical Mechanism of Action</span>
                    </div>
                    <p className="section-text">{selectedDrug.details.mechanism}</p>
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <Stethoscope className="w-4 h-4 text-cyan-400" />
                      <span>Modern Clinical Significance</span>
                    </div>
                    <p className="section-text">{selectedDrug.details.clinicalSignificance}</p>
                  </div>

                  <div className="modal-section-block highlight-conservation">
                    <div className="section-title">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Biodiversity Conservation &amp; Nagoya Protocol</span>
                    </div>
                    <p className="section-text">{selectedDrug.details.conservationNote}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            INTERACTIVE MODAL 2: FISHERY SYSTEM & BLUE ECONOMY
            =================================================================== */}
        <AnimatePresence>
          {selectedFishery && (
            <div 
              className="bio-econ-modal-backdrop" 
              data-lenis-prevent
              onClick={() => setSelectedFishery(null)}
            >
              <motion.div
                className="bio-econ-modal-card modal-wide"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bio-econ-modal-header">
                  <div className="modal-title-left">
                    <div className="modal-fishery-badge">
                      <Fish className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <h3>{selectedFishery.title}</h3>
                      <p className="modal-botanical-name">Global Aquatic Ecosystem &amp; Livelihoods</p>
                    </div>
                  </div>
                  <button
                    className="modal-close-btn"
                    onClick={() => setSelectedFishery(null)}
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="bio-econ-modal-body" data-lenis-prevent>
                  <div className="modal-banner-img-wrap">
                    <img
                      src={selectedFishery.image}
                      alt={selectedFishery.title}
                      className="modal-banner-img"
                    />
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>Habitat &amp; Ecological Characteristics</span>
                    </div>
                    <p className="section-text">{selectedFishery.details.habitatDescription}</p>
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <Fish className="w-4 h-4 text-sky-400" />
                      <span>Key Commercial Species</span>
                    </div>
                    <div className="modal-tags-row">
                      {selectedFishery.details.keySpecies.map((spec, sIdx) => (
                        <span key={sIdx} className="modal-tag">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <IndianRupee className="w-4 h-4 text-amber-300" />
                      <span>Economic &amp; Nutritional Value</span>
                    </div>
                    <p className="section-text">{selectedFishery.details.economicContribution}</p>
                  </div>

                  <div className="modal-section-block highlight-conservation">
                    <div className="section-title">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Conservation &amp; Sustainable Resource Management</span>
                    </div>
                    <p className="section-text">{selectedFishery.details.sustainabilityChallenge}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            INTERACTIVE MODAL 3: DRUG DISCOVERY PIPELINE STEP
            =================================================================== */}
        <AnimatePresence>
          {selectedPipelineStep && (
            <div 
              className="bio-econ-modal-backdrop" 
              data-lenis-prevent
              onClick={() => setSelectedPipelineStep(null)}
            >
              <motion.div
                className="bio-econ-modal-card"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bio-econ-modal-header">
                  <div className="modal-title-left">
                    <div className="modal-step-number-badge">
                      Step {selectedPipelineStep.stepNum}
                    </div>
                    <div>
                      <h3>{selectedPipelineStep.title}</h3>
                      <p className="modal-botanical-name">{selectedPipelineStep.subtitle}</p>
                    </div>
                  </div>
                  <button
                    className="modal-close-btn"
                    onClick={() => setSelectedPipelineStep(null)}
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bio-econ-modal-body" data-lenis-prevent>
                  <div className="modal-section-block">
                    <div className="section-title">
                      <Info className="w-4 h-4 text-emerald-400" />
                      <span>Process Overview</span>
                    </div>
                    <p className="section-text">{selectedPipelineStep.description}</p>
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <CheckCircle2 className="w-4 h-4 text-sky-400" />
                      <span>Key Scientific Activity</span>
                    </div>
                    <p className="section-text">{selectedPipelineStep.keyActivity}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default BioEconomicScreen;
