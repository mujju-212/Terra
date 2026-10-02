import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Globe,
  Share2,
  Lightbulb,
  Dna,
  Mountain,
  ArrowRight,
  Sparkles,
  X,
  Info,
  CheckCircle2,
  Trees,
  Fish,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

// Custom Paw icon matching the amber badge in Image 1
function PawIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="7" cy="8.5" r="2.2" />
      <circle cx="17" cy="8.5" r="2.2" />
      <circle cx="12" cy="5.5" r="2.2" />
      <circle cx="4.5" cy="14" r="1.8" />
      <circle cx="19.5" cy="14" r="1.8" />
      <path d="M12 10.5c-3.2 0-5.8 2.2-5.8 5.2 0 1.9 1.1 3.5 2.8 4.4 1 .5 2 .9 3 .9s2-.4 3-.9c1.7-.9 2.8-2.5 2.8-4.4 0-3-2.6-5.2-5.8-5.2z" />
    </svg>
  );
}

// Custom Microbe/Bacteria icon matching the purple badge in Image 1
function MicrobeIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="m5.6 5.6 2.1 2.1" />
      <path d="m16.3 16.3 2.1 2.1" />
      <path d="m5.6 18.4 2.1-2.1" />
      <path d="m16.3 7.7 2.1-2.1" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export interface IntroDetailItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeTheme: 'emerald' | 'amber' | 'blue';
  image: string;
  definition: string;
  stats: {
    label: string;
    value: string;
  }[];
  keyPoints: string[];
  vtuExamples: string[];
  scientificTakeaway: string;
}

export const BIO_INTRO_DETAILS: Record<string, IntroDetailItem> = {
  flora: {
    id: 'flora',
    title: 'Flora — The Plant Kingdom (Plantae)',
    subtitle: 'Primary autotrophic producers driving planetary oxygenation & terrestrial biomass',
    badge: 'KINGDOM PLANTAE',
    badgeTheme: 'emerald',
    image: '/images/bio-flora-thumb.jpg',
    definition: 'Flora comprises all plant life inhabiting a particular geographical region or ecosystem. Ranging from microscopic mosses to towering trees, plants are the foundational autotrophs that convert radiant solar photons into chemical bond energy (carbohydrates) via chlorophyll-mediated photosynthesis.',
    stats: [
      { label: 'Global Species', value: '~390,000 vascular plant species identified' },
      { label: 'Indian Flora', value: '~45,000+ species (7% of world flora)' },
      { label: 'Biomass Share', value: 'Over 80% of all Earth biomass' }
    ],
    keyPoints: [
      'Drives the planetary carbon-oxygen cycle, absorbing CO₂ and releasing atmospheric O₂.',
      'Prevents catastrophic soil erosion through dense fibrous and taproot subterranean networks.',
      'Acts as the primary trophic base (T₁) supporting herbivores, carnivores, and decomposers.',
      'Ancestral reservoir of vital crops, timber, Ayurvedic medicines, and industrial fibers.'
    ],
    vtuExamples: [
      'Tectona grandis (Teak)',
      'Shorea robusta (Sal)',
      'Santalum album (Sandalwood)',
      'Azadirachta indica (Neem)',
      'Ficus benghalensis (Banyan)'
    ],
    scientificTakeaway: 'Flora constitutes over 80% of all Earth biomass (~450 gigatons of carbon). Without plants, terrestrial food chains and atmospheric oxygen balance would collapse (VTU Syllabus Part 1).'
  },
  fauna: {
    id: 'fauna',
    title: 'Fauna — The Animal Kingdom (Animalia)',
    subtitle: 'Heterotrophic consumers driving energetic flow, herbivory, predation & pollination',
    badge: 'KINGDOM ANIMALIA',
    badgeTheme: 'amber',
    image: '/images/bio-fauna-thumb.jpg',
    definition: 'Fauna encompasses all animal life across terrestrial, freshwater, and marine habitats. Animals are multicellular, motile heterotrophs that consume organic biomass to fuel cellular metabolism, functioning as herbivores, carnivores, omnivores, detritivores, and mutualistic pollinators.',
    stats: [
      { label: 'Global Animals', value: '~1.5 million described species' },
      { label: 'Indian Fauna', value: '~91,000+ species (~6.5% of world fauna)' },
      { label: 'Invertebrates', value: 'Represent ~97% of all animal species' }
    ],
    keyPoints: [
      'Operates under Lindeman’s 10% trophic efficiency rule, transferring energy across ecological tiers.',
      'Crucial mutualistic pollinators (bees, butterflies, bats) pollinating over 75% of global food crops.',
      'Apex predators maintain the equilibrium and biodiversity of whole ecosystems by preventing herbivore overgrazing.',
      'Seed dispersers and soil burrowers creating soil porosity and forest regeneration.'
    ],
    vtuExamples: [
      'Panthera tigris (Royal Bengal Tiger)',
      'Elephas maximus (Asian Elephant)',
      'Pavo cristatus (Indian Peafowl)',
      'Panthera uncia (Snow Leopard)',
      'Rhinoceros unicornis (One-horned Rhino)'
    ],
    scientificTakeaway: 'Animals act as nature’s active energy distributors. Keystone animal species maintain the architectural diversity and structural health of entire landscapes (VTU Syllabus Part 1).'
  },
  micro: {
    id: 'micro',
    title: 'Microorganisms — The Invisible Engine of Life',
    subtitle: 'Ubiquitous microscopic catalysts driving decomposition, nutrient cycling & nitrogen fixation',
    badge: 'MICROBIAL BIOSPHERE',
    badgeTheme: 'blue',
    image: '/images/bio-microbes-thumb.jpg',
    definition: 'Microorganisms include microscopic single-celled or colonial organisms including bacteria, archaea, microscopic fungi, protozoa, and microalgae. While invisible to the naked human eye, microbes represent the vast majority of genetic diversity and enzymatic machinery on Earth.',
    stats: [
      { label: 'Estimated Species', value: '~1 trillion microbial species globally' },
      { label: 'Soil Density', value: '>100 million bacteria per gram of soil' },
      { label: 'Oxygen Contribution', value: '~50% of atmospheric O₂ from marine microbes' }
    ],
    keyPoints: [
      'Biological Nitrogen Fixation: Converts inert atmospheric N₂ into bioavailable nitrates (Rhizobium, Azotobacter).',
      'Essential Saprotrophic Mineralization: Decomposes corpses, preventing bio-elements (C, N, P, S) from locking up.',
      'Biotechnology & Medicine: Source of life-saving antibiotics (penicillin, streptomycin) and industrial fermentation enzymes.',
      'Bioremediation: Microbes break down industrial toxins, plastics, and marine crude oil spills.'
    ],
    vtuExamples: [
      'Rhizobium leguminosarum (Root nodule symbiont)',
      'Bacillus subtilis & Clostridium',
      'Pseudomonas putida (Bioremediation)',
      'Penicillium chrysogenum (Antibiotics)',
      'Saccharomyces cerevisiae (Yeast)'
    ],
    scientificTakeaway: 'Microorganisms drive every major global biogeochemical cycle. Life on Earth could survive without plants or animals, but could not survive even a few days without microbes (VTU Syllabus Part 1).'
  },
  genes: {
    id: 'genes',
    title: 'Genes — Genetic Diversity',
    subtitle: 'Allelic variations and nucleotide differences within a single biological species',
    badge: 'LEVEL 01 DIVERSITY',
    badgeTheme: 'emerald',
    image: '/images/bio-hero-bg.jpg',
    definition: 'Genetic diversity refers to the total number of genetic characteristics in the genetic makeup of a species. It accounts for why individual organisms within the same species differ in morphology, physiology, disease resistance, and environmental tolerance.',
    stats: [
      { label: 'Genetic Scope', value: 'Variation within DNA nucleotide sequences' },
      { label: 'Crop Varieties', value: '>50,000 traditional rice varieties in India' },
      { label: 'Evolutionary Value', value: 'Raw material for natural selection' }
    ],
    keyPoints: [
      'Enables populations to adapt to changing climatic conditions, emerging pathogens, and droughts.',
      'Wild crop relatives carry vital resistance genes utilized in agricultural biotechnology.',
      'Low genetic diversity causes inbreeding depression, rendering endangered species vulnerable to extinction.'
    ],
    vtuExamples: [
      'Oryza sativa (Over 50,000 indigenous rice strains in India)',
      'Mangifera indica (Over 1,000 varieties of mango)',
      'Canis lupus familiaris (Wide morphological variation across domestic dogs)'
    ],
    scientificTakeaway: 'A broad gene pool is a species’ primary evolutionary insurance policy against sudden environmental catastrophes and epidemics (VTU Syllabus Part 1 & Part 2).'
  },
  species: {
    id: 'species',
    title: 'Species — Species Diversity',
    subtitle: 'The richness and relative abundance of distinct species in a geographical region',
    badge: 'LEVEL 02 DIVERSITY',
    badgeTheme: 'amber',
    image: '/images/bio-aerial-landscape.jpg',
    definition: 'Species diversity measures both species richness (the total count of distinct species in a given community) and species evenness (the relative abundance of individuals belonging to each species). It peaks in tropical rainforests and coral reefs.',
    stats: [
      { label: 'Described Species', value: '~1.8 million species cataloged by science' },
      { label: 'Indian Share', value: '7–8% of recorded global species on 2.4% land' },
      { label: 'Global Ranking', value: 'India is among top 15 mega-diverse nations' }
    ],
    keyPoints: [
      'High species diversity enhances ecological resilience and productivity against external disruptions.',
      'Endemic species (found exclusively in a single geographical zone) face high risk if habitats fragment.',
      'Follows a latitudinal gradient: species richness increases progressively from the poles toward the equator.'
    ],
    vtuExamples: [
      'Western Ghats endemic amphibian and reptile communities',
      'Coral reef fish species assemblages',
      'Tropical moist deciduous forest canopy communities'
    ],
    scientificTakeaway: 'Species richness sets the carrying capacity and ecological stability of ecosystems. India is recognized internationally as one of the 17 megadiverse nations (VTU Syllabus Part 1).'
  },
  ecosystems: {
    id: 'ecosystems',
    title: 'Ecosystems — Ecosystem Diversity',
    subtitle: 'The vast variety of terrestrial and aquatic habitats, biomes, and ecological processes',
    badge: 'LEVEL 03 DIVERSITY',
    badgeTheme: 'blue',
    image: '/images/bio-biosphere-globe.png',
    definition: 'Ecosystem diversity encompasses the broad variety of terrestrial and aquatic habitats, biomes, and ecological niches on Earth. It reflects variations in physical climate, topography, hydrology, and biological communities interacting as functional units.',
    stats: [
      { label: 'Classification', value: 'Terrestrial (land) and Aquatic (water) types' },
      { label: 'Indian Biomes', value: '10 distinct Biogeographic Zones' },
      { label: 'Ecological Scale', value: 'Largest level of biological organization' }
    ],
    keyPoints: [
      'Terrestrial ecosystems: tropical rainforests, deciduous woodlands, deserts, and grasslands.',
      'Aquatic ecosystems: freshwater rivers and lakes, estuarine deltas, coral reefs, and marine oceans.',
      'Each distinct ecosystem performs specialized planetary services: carbon sequestration, flood control, and water filtration.'
    ],
    vtuExamples: [
      'Sundarbans deltaic mangrove ecosystem',
      'Thar arid desert ecosystem',
      'Western Ghats montane rainforests',
      'Chilika brackish coastal lagoon'
    ],
    scientificTakeaway: 'Ecosystem diversity represents the grandest scale of biodiversity, weaving climate, geography, and living communities into functional planetary lifelines (VTU Syllabus Part 1).'
  }
};

export function BioIntroScreen() {
  const reducedMotion = useReducedMotion();
  const [activeComponent, setActiveComponent] = useState<'flora' | 'fauna' | 'micro' | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<IntroDetailItem | null>(null);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedDetail !== null, () => setSelectedDetail(null));

  const scrollToNextChapter = () => {
    const el = document.getElementById('ch-levels');
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bio-screen bio-intro-section" id="ch-intro-bio">
      {/* ── Pristine Background (Image 2 Provided by User) ── */}
      <div className="bio-intro-bg-wrap">
        <img
          src="/images/bio-hero-bg.jpg"
          alt="Ancient tree of life, waterfalls, misty valley and wildlife under golden sunrise"
          className="bio-intro-bg-image"
        />
      </div>

      {/* ── Cinematic Atmosphere & Scrim Overlays ── */}
      <div className="bio-intro-scrim-left" />
      <div className="bio-intro-scrim-bottom" />
      <div className="bio-intro-scrim-top" />
      <div className="bio-intro-vignette" />

      <div className="bio-intro-content-container">
        {/* ── TOP ROW: TITLE & QUOTE CARD ── */}
        <div className="bio-intro-header-row">
          <motion.div
            className="bio-intro-header-left"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
          >
            {/* Pill Tag */}
            <div className="bio-intro-pill-badge">
              <Leaf size={13} className="bio-intro-pill-leaf" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 01</span>
            </div>

            {/* Main Heading */}
            <h1 className="bio-intro-title">
              Biodiversity: <span className="bio-intro-title-accent">Introduction</span>
            </h1>

            {/* Subtitle */}
            <h2 className="bio-intro-subtitle">The Variety of Life on Earth</h2>

            {/* Paragraph Text */}
            <p className="bio-intro-lead">
              Biodiversity refers to the differences in genes, the variety and richness of
              species at all scales, and the types of ecosystems (terrestrial and aquatic).
              It is the degree of nature's variety in the biosphere. Click on any component to explore in-depth details.
            </p>
          </motion.div>

          {/* Top-Right Liquid-Glass Quote Card */}
          <motion.div
            className="bio-intro-quote-card"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="bio-intro-quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote className="bio-intro-quote-text">
              Biodiversity is the degree of nature's variety in the biosphere — the{' '}
              <strong className="bio-text-green-glow">web of life</strong> that sustains us all.
            </blockquote>
          </motion.div>
        </div>

        {/* ── MIDDLE ROW: COMPONENTS CARD + ARROW + BIODIVERSITY GLOBE CARD ── */}
        <div className="bio-intro-middle-row">
          {/* LEFT CONTAINER: Components of Biological Diversity */}
          <motion.div
            className="bio-intro-panel bio-components-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bio-panel-heading-row">
              <div className="bio-panel-icon-circle green">
                <Share2 size={16} />
              </div>
              <h3 className="bio-panel-heading-title">Components of Biological Diversity</h3>
            </div>

            {/* 3 Inner Cards: Flora, Fauna, Microorganisms */}
            <div className="bio-components-grid">
              {/* 1. Flora Card */}
              <div
                className={`bio-component-subcard ${activeComponent === 'flora' ? 'is-highlighted' : ''}`}
                onMouseEnter={() => setActiveComponent('flora')}
                onMouseLeave={() => setActiveComponent(null)}
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['flora'])}
                title="Click to view detailed analysis of Flora (Plant Life)"
                style={{ cursor: 'pointer' }}
              >
                <div className="bio-subcard-header">
                  <div className="bio-badge-circle green">
                    <Leaf size={14} />
                  </div>
                  <div className="bio-subcard-text">
                    <h4 className="bio-subcard-title">Flora</h4>
                    <p className="bio-subcard-subtitle">Plant life in all its forms.</p>
                  </div>
                </div>
                <div className="bio-subcard-thumb-holder">
                  <img
                    src="/images/bio-flora-thumb.jpg"
                    alt="Flora: lush green tropical foliage with blooming pink hibiscus flower"
                    className="bio-subcard-thumb-img"
                    loading="lazy"
                  />
                  <div className="bio-subcard-thumb-overlay" />
                  <div className="bio-card-click-hint">
                    <Maximize2 size={12} className="text-white/90" />
                    <span>Click for details</span>
                  </div>
                </div>
              </div>

              {/* 2. Fauna Card */}
              <div
                className={`bio-component-subcard ${activeComponent === 'fauna' ? 'is-highlighted' : ''}`}
                onMouseEnter={() => setActiveComponent('fauna')}
                onMouseLeave={() => setActiveComponent(null)}
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['fauna'])}
                title="Click to view detailed analysis of Fauna (Animal Life)"
                style={{ cursor: 'pointer' }}
              >
                <div className="bio-subcard-header">
                  <div className="bio-badge-circle amber">
                    <PawIcon size={14} />
                  </div>
                  <div className="bio-subcard-text">
                    <h4 className="bio-subcard-title">Fauna</h4>
                    <p className="bio-subcard-subtitle">Animal life in all its forms.</p>
                  </div>
                </div>
                <div className="bio-subcard-thumb-holder">
                  <img
                    src="/images/bio-fauna-thumb.jpg"
                    alt="Fauna: majestic wildlife in natural reserve"
                    className="bio-subcard-thumb-img"
                    loading="lazy"
                  />
                  <div className="bio-subcard-thumb-overlay" />
                  <div className="bio-card-click-hint">
                    <Maximize2 size={12} className="text-white/90" />
                    <span>Click for details</span>
                  </div>
                </div>
              </div>

              {/* 3. Microorganisms Card */}
              <div
                className={`bio-component-subcard ${activeComponent === 'micro' ? 'is-highlighted' : ''}`}
                onMouseEnter={() => setActiveComponent('micro')}
                onMouseLeave={() => setActiveComponent(null)}
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['micro'])}
                title="Click to view detailed analysis of Microorganisms"
                style={{ cursor: 'pointer' }}
              >
                <div className="bio-subcard-header">
                  <div className="bio-badge-circle purple">
                    <MicrobeIcon size={14} />
                  </div>
                  <div className="bio-subcard-text">
                    <h4 className="bio-subcard-title">Microorganisms</h4>
                    <p className="bio-subcard-subtitle">Microscopic life forms (bacteria, fungi, algae, etc.).</p>
                  </div>
                </div>
                <div className="bio-subcard-thumb-holder">
                  <img
                    src="/images/bio-microbes-thumb.jpg"
                    alt="Microorganisms: fluorescent glowing bacteria and microbial colonies under microscope"
                    className="bio-subcard-thumb-img"
                    loading="lazy"
                  />
                  <div className="bio-subcard-thumb-overlay" />
                  <div className="bio-card-click-hint">
                    <Maximize2 size={12} className="text-white/90" />
                    <span>Click for details</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* GLOWING CONNECTOR ARROW */}
          <div className="bio-flow-arrow-wrap" aria-hidden="true">
            <div className="bio-flow-arrow-pill">
              <ArrowRight size={22} className="bio-flow-arrow-icon" />
            </div>
          </div>

          {/* RIGHT CONTAINER: Biodiversity = Flora + Fauna + Microorganisms */}
          <motion.div
            className="bio-intro-panel bio-biodiversity-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bio-panel-heading-row">
              <div className="bio-panel-icon-circle blue">
                <Globe size={16} />
              </div>
              <div className="bio-panel-heading-group">
                <h3 className="bio-panel-heading-title">Biodiversity</h3>
                <span className="bio-panel-heading-sub">Flora + Fauna + Microorganisms</span>
              </div>
            </div>

            <div className="bio-biodiversity-body">
              {/* Left Sub-column: The Biosphere Terrarium Orb */}
              <div 
                className="bio-orb-column"
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['ecosystems'])}
                title="Click to explore Biosphere Ecosystems"
                style={{ cursor: 'pointer' }}
              >
                <div className="bio-orb-glow-backdrop" aria-hidden="true" />
                <div className="bio-orb-wrap">
                  <img
                    src="/images/bio-biosphere-globe.png"
                    alt="Biosphere globe enclosing terrestrial forest canopy and aquatic coral reef"
                    className="bio-orb-image"
                  />
                  <div className="bio-orb-specular-ring" />
                </div>
              </div>

              {/* Right Sub-column: 3 Levels / Facets Badges */}
              <div className="bio-facets-column">
                {/* 1. Genes */}
                <div 
                  className="bio-facet-item"
                  onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['genes'])}
                  title="Click to view details on Genetic Diversity"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bio-badge-circle green">
                    <Leaf size={14} />
                  </div>
                  <div className="bio-facet-info">
                    <h5 className="bio-facet-title">Genes</h5>
                    <p className="bio-facet-desc">Differences in genes within species</p>
                  </div>
                  <ArrowRight size={13} className="text-emerald-400 opacity-60 ml-auto" />
                </div>

                {/* 2. Species */}
                <div 
                  className="bio-facet-item"
                  onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['species'])}
                  title="Click to view details on Species Diversity"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bio-badge-circle amber">
                    <PawIcon size={14} />
                  </div>
                  <div className="bio-facet-info">
                    <h5 className="bio-facet-title">Species</h5>
                    <p className="bio-facet-desc">Variety and richness of species at all scales</p>
                  </div>
                  <ArrowRight size={13} className="text-amber-400 opacity-60 ml-auto" />
                </div>

                {/* 3. Ecosystems */}
                <div 
                  className="bio-facet-item"
                  onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['ecosystems'])}
                  title="Click to view details on Ecosystem Diversity"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bio-badge-circle cyan">
                    <Mountain size={14} />
                  </div>
                  <div className="bio-facet-info">
                    <h5 className="bio-facet-title">Ecosystems</h5>
                    <p className="bio-facet-desc">Types of ecosystems (terrestrial &amp; aquatic)</p>
                  </div>
                  <ArrowRight size={13} className="text-cyan-400 opacity-60 ml-auto" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM ROW: KEY POINTS CARD + LANDSCAPE CALLOUT CARD ── */}
        <div className="bio-intro-bottom-row">
          {/* BOTTOM LEFT: Key Points Card */}
          <motion.div
            className="bio-intro-panel bio-keypoints-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="bio-panel-heading-row">
              <div className="bio-panel-icon-circle amber">
                <Lightbulb size={16} />
              </div>
              <h3 className="bio-panel-heading-title">Key Points</h3>
            </div>

            <div className="bio-keypoints-grid">
              {/* Point 1: Genes */}
              <div 
                className="bio-keypoint-chip"
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['genes'])}
                style={{ cursor: 'pointer' }}
                title="Click for Genetic Diversity insights"
              >
                <div className="bio-badge-circle green">
                  <Dna size={15} />
                </div>
                <div className="bio-keypoint-text">
                  <h5 className="bio-keypoint-name">Genes</h5>
                  <p className="bio-keypoint-detail">
                    Differences in genetic makeup within a species lead to variation.
                  </p>
                </div>
              </div>

              {/* Point 2: Species */}
              <div 
                className="bio-keypoint-chip"
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['species'])}
                style={{ cursor: 'pointer' }}
                title="Click for Species Diversity insights"
              >
                <div className="bio-badge-circle amber">
                  <PawIcon size={14} />
                </div>
                <div className="bio-keypoint-text">
                  <h5 className="bio-keypoint-name">Species</h5>
                  <p className="bio-keypoint-detail">
                    Variety and richness of species across regions and scales.
                  </p>
                </div>
              </div>

              {/* Point 3: Ecosystems */}
              <div 
                className="bio-keypoint-chip"
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['ecosystems'])}
                style={{ cursor: 'pointer' }}
                title="Click for Ecosystem Diversity insights"
              >
                <div className="bio-badge-circle green">
                  <Mountain size={14} />
                </div>
                <div className="bio-keypoint-text">
                  <h5 className="bio-keypoint-name">Ecosystems</h5>
                  <p className="bio-keypoint-detail">
                    Different types of ecosystems such as terrestrial and aquatic.
                  </p>
                </div>
              </div>

              {/* Point 4: Biosphere */}
              <div 
                className="bio-keypoint-chip"
                onClick={() => setSelectedDetail(BIO_INTRO_DETAILS['ecosystems'])}
                style={{ cursor: 'pointer' }}
                title="Click for Biosphere insights"
              >
                <div className="bio-badge-circle blue">
                  <Globe size={14} />
                </div>
                <div className="bio-keypoint-text">
                  <h5 className="bio-keypoint-name">Biosphere</h5>
                  <p className="bio-keypoint-detail">
                    Biodiversity represents the total variety of life in the biosphere.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM RIGHT: Landscape Callout Card */}
          <motion.div
            className="bio-intro-panel bio-landscape-callout-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="bio-landscape-split-layout">
              {/* Left: Aerial Landscape Thumbnail */}
              <div className="bio-landscape-thumb-container">
                <img
                  src="/images/bio-aerial-landscape.jpg"
                  alt="Aerial view of lush green winding river delta connecting all life on Earth"
                  className="bio-landscape-img"
                  loading="lazy"
                />
                <div className="bio-landscape-thumb-vignette" />
              </div>

              {/* Right: Message & Advance Button */}
              <div className="bio-landscape-info-container">
                <p className="bio-landscape-quote-text">
                  From the smallest microbe to the largest forest, biodiversity{' '}
                  <strong className="bio-text-green-bold">connects all life</strong> on Earth.
                </p>

                <button
                  type="button"
                  className="bio-advance-circle-btn"
                  onClick={scrollToNextChapter}
                  aria-label="Proceed to Chapter 02: Levels of Biodiversity"
                >
                  <ArrowRight size={17} className="bio-advance-arrow" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL: CHAPTER 01 COMPONENTS
          =================================================================== */}
      <AnimatePresence>
        {selectedDetail && (
          <div 
            className="bio-types-modal-backdrop" 
            data-lenis-prevent
            onClick={() => setSelectedDetail(null)}
          >
            <motion.div
              className={`bio-types-modal-card ${selectedDetail.badgeTheme}-theme`}
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Hero Banner */}
              <div className="bio-types-modal-hero">
                <img 
                  src={selectedDetail.image} 
                  alt={selectedDetail.title} 
                  className="bio-types-modal-hero-img" 
                />
                <div className="bio-types-modal-hero-scrim" />

                {/* Close Button */}
                <button
                  type="button"
                  className="bio-types-modal-close-btn"
                  onClick={() => setSelectedDetail(null)}
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Category Badge */}
                <div className="bio-types-modal-category-row">
                  <span className={`bio-types-modal-cat-pill ${selectedDetail.badgeTheme}`}>
                    {selectedDetail.badge}
                  </span>
                </div>

                {/* Hero Title & Subtitle */}
                <div className="bio-types-modal-title-box">
                  <h2>{selectedDetail.title}</h2>
                  <p>{selectedDetail.subtitle}</p>
                </div>
              </div>

              {/* Modal Body Scroll Container */}
              <div className="bio-types-modal-body" data-lenis-prevent>
                {/* Quick Stats Grid */}
                <div className="bio-types-stats-grid">
                  {selectedDetail.stats.map((st, sIdx) => (
                    <div key={sIdx} className="bio-types-stat-cell">
                      <span className="stat-label">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        {st.label}
                      </span>
                      <span className="stat-val">{st.value}</span>
                    </div>
                  ))}
                </div>

                {/* Definition Section */}
                <div className="bio-types-modal-section">
                  <h4>
                    <Info className="w-3.5 h-3.5" />
                    Scientific Overview & Definition
                  </h4>
                  <p className="bio-types-modal-text">{selectedDetail.definition}</p>
                </div>

                {/* Key Ecological Points */}
                <div className="bio-types-modal-section">
                  <h4>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Key Ecological Roles & Functions
                  </h4>
                  <div className="bio-types-services-wrap">
                    {selectedDetail.keyPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="bio-types-service-pill">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus Benchmarks & Indian Examples */}
                <div className="bio-types-modal-section">
                  <h4>
                    <Leaf className="w-3.5 h-3.5" />
                    Representative Examples (VTU BCV755B Syllabus)
                  </h4>
                  <div className="example-tags">
                    {selectedDetail.vtuExamples.map((ex, eIdx) => (
                      <span key={eIdx} className="example-tag-pill indian">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scientific Takeaway Callout Box */}
                <div className="bio-types-modal-takeaway-box">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Key Scientific Takeaway:</strong>
                    <p>{selectedDetail.scientificTakeaway}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default BioIntroScreen;
