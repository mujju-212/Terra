import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBioModalScrollLock } from './useBioModalScrollLock';
import {
  BookOpen,
  BarChart3,
  Lightbulb,
  Leaf,
  Dna,
  Trees,
  AlertTriangle,
  ShieldCheck,
  Network,
  Mountain,
  RefreshCw,
  IndianRupee,
  Fish,
  Pill,
  Waves,
  CloudRain,
  Droplets,
  HeartHandshake,
  Globe,
  Sprout,
  Compass,
  GraduationCap,
  HelpCircle,
  ArrowRight,
  Thermometer,
  CheckCircle2,
  X,
  Info,
  Sparkles,
} from 'lucide-react';
import type { ModuleContent } from '../../content/types';

/* --------------------------------------------------------------------------
   DATA TYPES & STRUCTURES
   -------------------------------------------------------------------------- */
interface TopicItem {
  num: number;
  title: string;
  subtitle: string;
  badgeColor: 'green' | 'blue' | 'red' | 'emerald' | 'teal' | 'gold';
  icon: React.ReactNode;
  targetId: string;
}

interface FactCard {
  id: string;
  theme: 'green' | 'forest' | 'ocean' | 'amber' | 'deep-blue' | 'emerald' | 'teal' | 'purple' | 'cyan';
  icon: React.ReactNode;
  stat: string;
  label: string;
  factDetails: {
    source: string;
    explanation: string;
    significance: string;
  };
}

interface TakeawayItem {
  id: string;
  color: 'emerald' | 'blue' | 'gold' | 'coral' | 'green' | 'purple';
  icon: React.ReactNode;
  text: string;
}

/* --------------------------------------------------------------------------
   MOCKUP EXACT DATA DEFINITIONS
   -------------------------------------------------------------------------- */
const TOPIC_ITEMS: TopicItem[] = [
  {
    num: 1,
    title: 'Introduction to Biodiversity',
    subtitle: 'Definition, flora, fauna and microorganisms',
    badgeColor: 'green',
    icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" />,
    targetId: 'ch-intro-bio',
  },
  {
    num: 2,
    title: 'Levels of Biodiversity',
    subtitle: 'Genetic, species and ecosystem levels',
    badgeColor: 'blue',
    icon: <Dna className="w-3.5 h-3.5 text-sky-400" />,
    targetId: 'ch-levels',
  },
  {
    num: 3,
    title: 'Value of Biodiversity',
    subtitle: 'Ecological, economic, social and cultural importance',
    badgeColor: 'green',
    icon: <Trees className="w-3.5 h-3.5 text-emerald-400" />,
    targetId: 'ch-values',
  },
  {
    num: 4,
    title: 'Threats to Biodiversity',
    subtitle: 'Habitat loss, overexploitation, invasive species, pollution, climate change and others',
    badgeColor: 'red',
    icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />,
    targetId: 'ch-threats',
  },
  {
    num: 5,
    title: 'Conservation of Biodiversity',
    subtitle: 'In-situ and ex-situ methods with real examples',
    badgeColor: 'emerald',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />,
    targetId: 'ch-conservation',
  },
  {
    num: 6,
    title: 'Ecosystem',
    subtitle: 'Biotic and abiotic components, energy and nutrient flow',
    badgeColor: 'blue',
    icon: <Network className="w-3.5 h-3.5 text-sky-400" />,
    targetId: 'ch-ecosystem',
  },
  {
    num: 7,
    title: 'Types of Ecosystems',
    subtitle: 'Forest, desert, grassland, aquatic, estuarine, wetland and lake zones',
    badgeColor: 'teal',
    icon: <Mountain className="w-3.5 h-3.5 text-teal-400" />,
    targetId: 'ch-types',
  },
  {
    num: 8,
    title: 'Significance of Ecosystems',
    subtitle: "Carbon, nitrogen, water cycles and biodiversity's role",
    badgeColor: 'green',
    icon: <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />,
    targetId: 'ch-significance',
  },
  {
    num: 9,
    title: 'Economic Values',
    subtitle: 'Medicinal plants, drugs and fisheries',
    badgeColor: 'gold',
    icon: <IndianRupee className="w-3.5 h-3.5 text-amber-300" />,
    targetId: 'ch-economic',
  },
];

const FACT_CARDS: FactCard[] = [
  {
    id: 'species-count',
    theme: 'green',
    icon: <Leaf className="w-5 h-5 text-emerald-400" />,
    stat: '~ 8.7 million',
    label: 'estimated species on Earth (1.2 million identified)',
    factDetails: {
      source: 'Mora et al., Census of Marine Life & UNEP-WCMC',
      explanation: 'Over 86% of terrestrial species and 91% of oceanic species remain awaiting formal taxonomic cataloging.',
      significance: 'Reveals immense untapped biochemical and genetic potential essential for medicine and food security.',
    },
  },
  {
    id: 'forest-biodiv',
    theme: 'forest',
    icon: <Trees className="w-5 h-5 text-emerald-300" />,
    stat: '~ 80%',
    label: 'of terrestrial biodiversity is in forests',
    factDetails: {
      source: 'FAO State of the World’s Forests (SOFO)',
      explanation: 'Tropical, temperate, and boreal forests shelter the majority of vertebrate, insect, and plant taxa on land.',
      significance: 'Forest habitat fragmentation represents the single fastest driver of terrestrial species extinction.',
    },
  },
  {
    id: 'ocean-species',
    theme: 'ocean',
    icon: <Fish className="w-5 h-5 text-cyan-300" />,
    stat: '~ 50%',
    label: 'of all species live in oceans',
    factDetails: {
      source: 'World Register of Marine Species (WoRMS) & NOAA',
      explanation: 'From coastal coral reefs to abyssal pelagic trenches, marine environments represent over 95% of biosphere volume.',
      significance: 'Critical for global climate regulation, carbon buffering, and oceanic protein synthesis.',
    },
  },
  {
    id: 'medicines-derived',
    theme: 'amber',
    icon: <Pill className="w-5 h-5 text-amber-400" />,
    stat: '~ 25%',
    label: 'of modern medicines derived from plants',
    factDetails: {
      source: 'World Health Organization (WHO) Traditional Medicine Strategy',
      explanation: 'At least 118 of the top 150 prescription medications in the US originate from botanical and fungal bio-sources.',
      significance: 'Preserving wild ecosystems directly protects future antibiotics, oncology therapies, and antivirals.',
    },
  },
  {
    id: 'marine-coastal-dep',
    theme: 'deep-blue',
    icon: <Waves className="w-5 h-5 text-sky-400" />,
    stat: '~ 3 billion',
    label: 'people depend on marine and coastal biodiversity',
    factDetails: {
      source: 'United Nations Sustainable Development Goal 14 (Life Below Water)',
      explanation: 'Coastal ecosystems deliver direct protein, storm-surge shoreline protection, and blue economy livelihoods.',
      significance: 'Small-island developing states (SIDS) and delta populations rely fundamentally on artisanal fisheries.',
    },
  },
  {
    id: 'co2-absorbed',
    theme: 'emerald',
    icon: <CloudRain className="w-5 h-5 text-emerald-400" />,
    stat: 'Forests absorb ~ 2.6 billion',
    label: 'tons of CO2 annually',
    factDetails: {
      source: 'Intergovernmental Panel on Climate Change (IPCC Sixth Assessment)',
      explanation: 'Net terrestrial photosynthetic sink captures approximately 30% of all anthropogenic fossil fuel emissions.',
      significance: 'Afforestation and standing forest conservation are irreplaceable pillars for planetary carbon stabilization.',
    },
  },
  {
    id: 'wetland-carbon',
    theme: 'teal',
    icon: <Droplets className="w-5 h-5 text-cyan-400" />,
    stat: 'Wetlands store ~ 30%',
    label: "of the world's carbon",
    factDetails: {
      source: 'Ramsar Convention on Wetlands Scientific & Technical Review',
      explanation: 'Peatlands, saltmarshes, and mangrove soils sequester carbon at rates 3–5 times faster than terrestrial forests.',
      significance: 'Wetland degradation releases massive buried methane and carbon dioxide stocks into the atmosphere.',
    },
  },
  {
    id: 'supports-millions',
    theme: 'purple',
    icon: <HeartHandshake className="w-5 h-5 text-amber-300" />,
    stat: 'Biodiversity supports',
    label: 'food, water, healthcare and livelihoods for millions',
    factDetails: {
      source: 'Intergovernmental Science-Policy Platform on Biodiversity (IPBES)',
      explanation: 'Over 70% of the world’s vulnerable populations rely directly on wild harvesting, pollinators, and natural buffers.',
      significance: 'Biodiversity conservation is directly aligned with poverty alleviation and global health equity.',
    },
  },
  {
    id: 'econ-value-trillion',
    theme: 'cyan',
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
    stat: 'Ecosystems provide ~ $125 trillion',
    label: 'per year in ecosystem services (global estimate)',
    factDetails: {
      source: 'Costanza et al., Global Environmental Change & UNEP',
      explanation: 'Natural capital services—pollination, clean water filtering, soil formation, storm mitigation—surpass global GDP.',
      significance: 'Demonstrates that ecological preservation is not an expense, but humanity’s highest-return capital investment.',
    },
  },
];

const TAKEAWAY_ITEMS: TakeawayItem[] = [
  {
    id: 'takeaway-1',
    color: 'emerald',
    icon: <Leaf className="w-4 h-4 text-emerald-400" />,
    text: 'Biodiversity exists at genetic, species and ecosystem levels.',
  },
  {
    id: 'takeaway-2',
    color: 'blue',
    icon: <Mountain className="w-4 h-4 text-sky-400" />,
    text: 'Ecosystems provide essential services and sustain life on Earth.',
  },
  {
    id: 'takeaway-3',
    color: 'gold',
    icon: <Sprout className="w-4 h-4 text-amber-300" />,
    text: 'Biodiversity has immense ecological, economic, social and cultural value.',
  },
  {
    id: 'takeaway-4',
    color: 'coral',
    icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
    text: 'Human activities pose serious threats to biodiversity.',
  },
  {
    id: 'takeaway-5',
    color: 'green',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-300" />,
    text: 'Conservation through in-situ and ex-situ methods is essential for future generations.',
  },
  {
    id: 'takeaway-6',
    color: 'purple',
    icon: <Compass className="w-4 h-4 text-purple-300" />,
    text: 'Sustainable use of natural resources ensures long-term availability and resilience.',
  },
];

interface BioSummaryScreenProps {
  module?: ModuleContent;
}

export function BioSummaryScreen({ module }: BioSummaryScreenProps) {
  const [selectedFact, setSelectedFact] = useState<FactCard | null>(null);

  // Modal scroll lock and wheel forwarding
  useBioModalScrollLock(selectedFact !== null, () => setSelectedFact(null));

  // Smooth scroll to chapter within the biodiversity page
  const scrollToChapter = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="bio-screen bio-summary-section" id="ch-summary">
      <div className="bio-summary-container">
        {/* ===================================================================
            HERO PANORAMA CARD (Wild Elephants, Deer, Eagle & Mountains)
            =================================================================== */}
        <div className="bio-sum-hero-card">
          {/* Pristine Background Scenery */}
          <div className="bio-sum-hero-bg-wrap">
            <img
              src="/images/bio-summary/hero-bg.jpg"
              alt="Wild Elephants, Spotted Deer, Soaring Hawk, River, and Alpine Mountains Panorama"
              className="bio-sum-hero-bg-img"
            />
            {/* Seamless gradient overlay ensuring left typography readability */}
            <div className="bio-sum-hero-gradient-overlay" />
          </div>

          {/* Left Title, Subtitle, and Lead Content */}
          <div className="bio-sum-hero-left">
            <div className="bio-sum-badge">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER SUMMARY</span>
            </div>

            <h1 className="bio-sum-title">
              Module Summary
            </h1>

            <h2 className="bio-sum-subtitle">
              Biodiversity &amp; Ecosystem
            </h2>

            <p className="bio-sum-lead">
              Biodiversity and ecosystems form the foundation of life on Earth. They provide essential services,
              support human well-being and have immense ecological, economic and cultural value. Conserving them
              is crucial for a sustainable and resilient future.
            </p>
          </div>

          {/* Top-Right Liquid Glass Quote Card */}
          <div className="bio-sum-hero-quote-card">
            <span className="bio-sum-quote-mark">❝</span>
            <p className="bio-sum-quote-body">
              Biodiversity is life. Biodiversity is our life. <em>Let us protect it today</em> for a healthier,
              safer and more prosperous tomorrow.
            </p>
            <span className="bio-sum-quote-mark-end">❞</span>
          </div>
        </div>

        {/* ===================================================================
            MIDDLE SECTION: 3 PANELS ROW (Topics Covered | Facts Grid | Takeaways)
            =================================================================== */}
        <div className="bio-sum-middle-row">
          {/* ---------------------------------------------------------------
              PANEL 1 (Left): Key Topics Covered (9 Topics)
              --------------------------------------------------------------- */}
          <div className="bio-sum-panel bio-sum-panel-topics" id="panel-topics">
            <div className="bio-sum-panel-header">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h3>Key Topics Covered</h3>
            </div>

            <div className="bio-sum-topics-list">
              {TOPIC_ITEMS.map((item) => (
                <div
                  key={item.num}
                  className="bio-sum-topic-item"
                  onClick={() => scrollToChapter(item.targetId)}
                  role="button"
                  tabIndex={0}
                  title={`Jump to Chapter: ${item.title}`}
                >
                  <div className={`topic-num-badge badge-${item.badgeColor}`}>
                    <span className="num-text">{item.num}</span>
                    <span className="badge-icon-wrap">{item.icon}</span>
                  </div>
                  <div className="topic-text-wrap">
                    <strong className="topic-title">{item.title}</strong>
                    <span className="topic-subtitle">{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------
              PANEL 2 (Center): Key Numbers & Facts (3x3 Grid of 9 Cards)
              --------------------------------------------------------------- */}
          <div className="bio-sum-panel bio-sum-panel-facts" id="panel-facts">
            <div className="bio-sum-panel-header">
              <BarChart3 className="w-4 h-4 text-sky-400" />
              <h3>Key Numbers &amp; Facts</h3>
              <span className="panel-header-hint">Click any stat for scientific reference</span>
            </div>

            <div className="bio-sum-facts-grid">
              {FACT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`bio-sum-fact-card theme-${card.theme}`}
                  onClick={() => setSelectedFact(card)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="fact-icon-wrap">
                    {card.icon}
                  </div>
                  <div className="fact-content">
                    <div className="fact-stat">{card.stat}</div>
                    <div className="fact-label">{card.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------
              PANEL 3 (Right): Key Takeaways (6 Cards)
              --------------------------------------------------------------- */}
          <div className="bio-sum-panel bio-sum-panel-takeaways" id="panel-takeaways">
            <div className="bio-sum-panel-header">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h3>Key Takeaways</h3>
            </div>

            <div className="bio-sum-takeaways-list">
              {TAKEAWAY_ITEMS.map((item) => (
                <div key={item.id} className={`bio-sum-takeaway-card card-${item.color}`}>
                  <div className="takeaway-icon-wrap">
                    {item.icon}
                  </div>
                  <p className="takeaway-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM ROW: TEST YOUR KNOWLEDGE & NEXT MODULE 05 NAVIGATION
            =================================================================== */}
        <div className="bio-sum-bottom-row">
          {/* Card 1: Test Your Knowledge (Quiz CTA) */}
          <div className="bio-sum-test-card">
            <div className="test-card-content">
              <div className="test-card-icon-wrap">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="test-card-text">
                <h4>Test Your Knowledge</h4>
                <p>Try a quick quiz to check your understanding of this module.</p>
              </div>
            </div>

            <Link
              to="/quiz?module=biodiversity"
              className="bio-sum-start-quiz-btn"
              title="Start Module 04 Knowledge Quiz"
            >
              <div className="quiz-q-circle">?</div>
              <span>Start Quiz</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 2: Next Module 05: Global Warming & EIA */}
          <div className="bio-sum-next-module-card">
            {/* Background Iceberg Scenery */}
            <div className="next-mod-bg-wrap">
              <img
                src="/images/bio-summary/glacier-bg.jpg"
                alt="Arctic Glaciers and Iceberg Scenery"
                className="next-mod-bg-img"
              />
              <div className="next-mod-gradient-overlay" />
            </div>

            <div className="next-mod-content">
              <div className="next-mod-icon-wrap">
                <Globe className="w-6 h-6 text-emerald-400" />
                <Thermometer className="w-4 h-4 text-amber-400 absolute -bottom-1 -right-1" />
              </div>
              <div className="next-mod-text">
                <span className="next-mod-badge">MODULE 05</span>
                <h4 className="next-mod-title">Global Warming &amp; EIA</h4>
                <p className="next-mod-desc">
                  Understand climate change, its impacts and the role of Environmental Impact Assessment.
                </p>
              </div>
            </div>

            <Link
              to="/module/warming"
              className="bio-sum-continue-mod5-btn"
              title="Proceed to Module 05: Global Warming & EIA"
            >
              <span>Continue to</span>
              <strong>Module 05</strong>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ===================================================================
            INTERACTIVE MODAL: FACT SCIENTIFIC REFERENCE & INSIGHT
            =================================================================== */}
        <AnimatePresence>
          {selectedFact && (
            <div 
              className="bio-sum-modal-backdrop" 
              data-lenis-prevent
              onClick={() => setSelectedFact(null)}
            >
              <motion.div
                className="bio-sum-modal-card"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bio-sum-modal-header">
                  <div className="modal-title-left">
                    <div className="modal-fact-icon-badge">
                      {selectedFact.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedFact.stat}</h3>
                      <p className="modal-fact-label">{selectedFact.label}</p>
                    </div>
                  </div>
                  <button
                    className="modal-close-btn"
                    onClick={() => setSelectedFact(null)}
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="bio-sum-modal-body" data-lenis-prevent>
                  <div className="modal-section-block">
                    <div className="section-title">
                      <Info className="w-4 h-4 text-emerald-400" />
                      <span>Scientific Context &amp; Elaboration</span>
                    </div>
                    <p className="section-text">{selectedFact.factDetails.explanation}</p>
                  </div>

                  <div className="modal-section-block highlight-conservation">
                    <div className="section-title">
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      <span>Planetary &amp; Anthropogenic Significance</span>
                    </div>
                    <p className="section-text">{selectedFact.factDetails.significance}</p>
                  </div>

                  <div className="modal-section-block">
                    <div className="section-title">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      <span>Data Reference / Authority</span>
                    </div>
                    <p className="section-text text-sky-300 font-mono text-xs">
                      {selectedFact.factDetails.source}
                    </p>
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

export default BioSummaryScreen;
