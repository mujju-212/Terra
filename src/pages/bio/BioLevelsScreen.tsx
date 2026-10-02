import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  CheckCircle2,
  TreePine,
  Droplets,
  Sprout,
  Fish,
  Bug,
  MapPin,
  Lightbulb,
  X,
  Info,
  Sparkles,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

// Rich Illustrated Icons matching Image 1
function PawIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="7" cy="8.5" r="2.2" />
      <circle cx="17" cy="8.5" r="2.2" />
      <circle cx="12" cy="5.5" r="2.2" />
      <circle cx="4.5" cy="14" r="1.8" />
      <circle cx="19.5" cy="14" r="1.8" />
      <path d="M12 10.5c-3.2 0-5.8 2.2-5.8 5.2 0 1.9 1.1 3.5 2.8 4.4 1 .5 2 .9 3 .9s2-.4 3-.9c1.7-.9 2.8-2.5 2.8-4.4 0-3-2.6-5.2-5.8-5.2z" />
    </svg>
  );
}

function DnaIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="m17 6-2.5-2.5" />
      <path d="m14 8-1-1" />
      <path d="m7 18 2.5 2.5" />
      <path d="m3.5 14.5.5.5" />
      <path d="m20 9 .5.5" />
      <path d="m6.5 12.5 1 1" />
      <path d="m16.5 10.5 1 1" />
      <path d="m10 16 1.5 1.5" />
    </svg>
  );
}

// 7 Rich Multi-Colored Icons for Bottom Stat Bar
function RichTreeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 14H8L5 19H19L16 14H20L12 2Z" fill="#22c55e" stroke="#86efac" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="10.5" y="19" width="3" height="4" rx="0.8" fill="#a16207" />
    </svg>
  );
}

function RichOceanIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#0284c7" />
      <path d="M3 13C6 11 9 15 12 13C15 11 18 15 21 13" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 17C6 15 9 19 12 17C15 15 18 19 21 17" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="8" r="2.5" fill="#f8fafc" opacity="0.8" />
    </svg>
  );
}

function RichPlantIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#14532d" stroke="#22c55e" strokeWidth="1" />
      <path d="M7 16C7 10 12 8 16 7C16 12 14 17 8 18" fill="#4ade80" />
      <path d="M12 19V11" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RichFishIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2 12C5 8 14 6 18 10L22 7V17L18 14C14 18 5 16 2 12Z" fill="#ea580c" />
      <path d="M9 7.5C10 9 10 15 9 16.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 9C14.5 10 14.5 14 14 15" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="6" cy="11.5" r="1.2" fill="#ffffff" />
      <circle cx="6.2" cy="11.5" r="0.6" fill="#000000" />
    </svg>
  );
}

function RichButterflyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 12C9 6 3 6 4 11C4.5 14 9 13.5 12 12Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
      <path d="M12 12C15 6 21 6 20 11C19.5 14 15 13.5 12 12Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
      <path d="M12 12C8 13.5 6 18 9 19.5C11 20 12 16 12 12Z" fill="#0ea5e9" stroke="#7dd3fc" strokeWidth="0.8" />
      <path d="M12 12C16 13.5 18 18 15 19.5C13 20 12 16 12 12Z" fill="#0ea5e9" stroke="#7dd3fc" strokeWidth="0.8" />
      <ellipse cx="12" cy="13" rx="1" ry="5" fill="#0f172a" />
      <path d="M11.5 8L10 5" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" />
      <path d="M12.5 8L14 5" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function RichBacteriaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="8" rx="4" transform="rotate(-20 12 12)" fill="#9333ea" stroke="#c084fc" strokeWidth="1.2" />
      <circle cx="9" cy="11" r="1.2" fill="#4ade80" />
      <circle cx="14" cy="13" r="1.2" fill="#4ade80" />
      <circle cx="12" cy="10" r="0.8" fill="#e9d5ff" />
      <path d="M3 13L1.5 14" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" />
      <path d="M5 8L4 6.5" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" />
      <path d="M19 16L20.5 17.5" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" />
      <path d="M21 11L22.5 10.5" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function RichMushroomIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 14C4 7.5 7.5 5 12 5C16.5 5 20 7.5 20 14C20 15 19 15.5 18 15.5H6C5 15.5 4 15 4 14Z" fill="#b45309" stroke="#fde047" strokeWidth="1" />
      <circle cx="8" cy="10" r="1.5" fill="#fef3c7" />
      <circle cx="15" cy="9.5" r="1.8" fill="#fef3c7" />
      <circle cx="12" cy="12" r="1.2" fill="#fef3c7" />
      <path d="M10 15.5V20C10 20.5 10.8 21 12 21C13.2 21 14 20.5 14 20V15.5" fill="#fef3c7" />
    </svg>
  );
}

export interface LevelModalDetail {
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

export const BIO_LEVEL_MODAL_DETAILS: Record<string, LevelModalDetail> = {
  genetic: {
    id: 'genetic',
    title: 'Genetic Diversity — Variation Within Species',
    subtitle: 'The total genetic information and allelic variation contained in a species’ gene pool',
    badge: 'LEVEL 01 DIVERSITY',
    badgeTheme: 'emerald',
    image: '/images/bio-levels/orb-dna.jpg',
    definition: 'Genetic diversity refers to the variation of genes and alleles within individuals of a single species or between isolated populations. It determines how organisms adapt to climatic stress, resist pathogens, and survive ecological changes. High genetic variation is the raw fuel for natural selection.',
    stats: [
      { label: 'Scope', value: 'Nucleotide sequences, alleles & chromosomes' },
      { label: 'Gene Pool', value: 'Reservoir of wild disease-resistant alleles' },
      { label: 'Vulnerability', value: 'Low genetic diversity causes inbreeding depression' }
    ],
    keyPoints: [
      'Every individual organism differs genetically; wild species maintain a rich gene pool.',
      'Enables populations to adapt to shifting temperatures, droughts, and novel pathogens.',
      'Critical for agricultural security: wild crop varieties save modern monocultures from virulent blights.'
    ],
    vtuExamples: [
      'Canis lupus familiaris: 340+ domestic dog breeds (Chihuahua to Rottweiler) sharing one genome',
      'Oryza sativa: Over 50,000 traditional Indian varieties of rice',
      'Mangifera indica: Over 1,000 distinct mango cultivars across India'
    ],
    scientificTakeaway: 'Without genetic diversity, a species loses the evolutionary flexibility required to survive environmental disruptions (VTU Syllabus Part 2.1).'
  },
  'dog-genetics': {
    id: 'dog-genetics',
    title: 'Canine Genetics — Same Species, Different Alleles',
    subtitle: 'Artificial selection demonstrating morphological and allelic variation in Canis lupus familiaris',
    badge: 'GENETIC CASE STUDY',
    badgeTheme: 'emerald',
    image: '/images/bio-levels/dog-chihuahua-sq.jpg',
    definition: 'All domestic dogs belong to one single biological species (Canis lupus familiaris). Despite vast morphological differences in skull shape, ear morphology, coat texture, and body mass (a 40-fold difference between Chihuahua and Rottweiler), their genetic blueprints remain cross-fertile.',
    stats: [
      { label: 'Species', value: 'Canis lupus familiaris (Single Species)' },
      { label: 'Karyotype', value: '78 chromosomes (39 pairs) shared across all breeds' },
      { label: 'Key Gene', value: 'IGF1 allele variants control miniature vs giant size' }
    ],
    keyPoints: [
      'Shows how selective breeding acts on standing genetic variation within a single species gene pool.',
      'Chihuahua: Selected for tiny companion stature and miniature cranial proportions.',
      'Beagle: Selected for olfactory scent receptors and floppy scent-trapping ears.',
      'Rottweiler: Selected for heavy skeletal bone density and powerful guarding jaw musculature.',
      'Caution: Intensive inbreeding reduces heterozygosity, concentrating dangerous recessive genetic disorders.'
    ],
    vtuExamples: [
      'Chihuahua (Mexico) — Smallest dog breed (~2 kg)',
      'Beagle (UK) — Medium scent-hound tracking breed (~10 kg)',
      'Rottweiler (Germany) — Heavy working mastiff-descendant breed (~50 kg)'
    ],
    scientificTakeaway: 'The domestic dog is science’s most dramatic visual illustration of intraspecific genetic variation: different genes, same species (VTU Syllabus Part 2.1).'
  },
  species: {
    id: 'species',
    title: 'Species Diversity — Richness & Hotspots',
    subtitle: 'The count and relative abundance of biological species inhabiting a geographical region',
    badge: 'LEVEL 02 DIVERSITY',
    badgeTheme: 'amber',
    image: '/images/bio-levels/orb-tiger.jpg',
    definition: 'Species diversity measures the variety of species in a given region, combining species richness (total count) and species evenness (equitability of population sizes). Approximately 1.8 million species have been formally identified. India is recognized globally as one of the world’s 15 most species-rich nations.',
    stats: [
      { label: 'Described Species', value: '~1.8 million species classified by science' },
      { label: 'India Ranking', value: 'Among world’s top 15 mega-diverse countries' },
      { label: 'Global Hotspots', value: '4 Biodiversity Hotspots located in India' }
    ],
    keyPoints: [
      'Species richness is highest in tropical equatorial rainforests and coral reefs.',
      'India harbors 7–8% of recorded world species despite occupying only 2.4% of Earth’s land area.',
      'Hotspots of Diversity: Regions with exceptionally high endemic species facing severe habitat threats.'
    ],
    vtuExamples: [
      'Western Ghats: Over 5,000 flowering plants and endemic Lion-tailed Macaque',
      'Eastern Himalayas: Red Panda, Snow Leopard and diverse orchid species',
      'Indo-Burma: Vast freshwater turtle and amphibian species richness',
      'Sundaland: Nicobar island tropical rainforests with endemic megapode birds'
    ],
    scientificTakeaway: 'Species richness forms the foundational trophic structure of ecosystems. India is one of the world’s designated mega-diversity nations (VTU Syllabus Part 2.2).'
  },
  ecosystem: {
    id: 'ecosystem',
    title: 'Ecosystem Diversity — Global Biome Mosaic',
    subtitle: 'The broad variety of terrestrial and aquatic ecosystems, habitats, and ecological processes',
    badge: 'LEVEL 03 DIVERSITY',
    badgeTheme: 'blue',
    image: '/images/bio-levels/orb-ecosystem.jpg',
    definition: 'Ecosystem diversity represents the grandest scale of biodiversity, integrating physical topography, local climate, hydrology, and biological communities into self-sustaining functional ecological units. It includes both terrestrial biomes (forests, deserts, grasslands) and aquatic systems (lakes, rivers, estuaries, marine oceans).',
    stats: [
      { label: 'Indian Zones', value: '10 distinct Biogeographic Zones in India' },
      { label: 'Main Divisions', value: 'Terrestrial (Land) & Aquatic (Water) systems' },
      { label: 'Service Value', value: 'Provides global climate regulation & nutrient cycling' }
    ],
    keyPoints: [
      'Different habitats, climates, and soils support completely different communities of living organisms.',
      'Terrestrial ecosystems: Vertical stratification from canopy crowns down to organic forest floor humus.',
      'Aquatic ecosystems: Depth stratification from sunlit photic surface zones down to lightless benthic sediments.'
    ],
    vtuExamples: [
      'Tropical Wet Evergreen Rainforests of Western Ghats',
      'Thar Xeric Sand Dune Desert Ecosystem of Rajasthan',
      'Chilika Brackish Water Lagoon Ecosystem of Odisha',
      'Sundarbans Mangrove Tidal Delta Ecosystem of West Bengal'
    ],
    scientificTakeaway: 'Ecosystem diversity provides the macroscopic physical habitats where all genetic and species interactions take place (VTU Syllabus Part 2.3).'
  },
  'terrestrial-eco': {
    id: 'terrestrial-eco',
    title: 'Terrestrial Ecosystems — Land-Based Biomes',
    subtitle: 'Biomes defined by terrestrial vegetation, regional climate, and soil pedology',
    badge: 'TERRESTRIAL BIOMES',
    badgeTheme: 'emerald',
    image: '/images/bio-levels/eco-terrestrial.jpg',
    definition: 'Terrestrial ecosystems comprise all land-based ecological communities where atmospheric oxygen and carbon dioxide exist as gases. They are shaped predominantly by rainfall patterns and temperature ranges, forming forests, grasslands, and deserts.',
    stats: [
      { label: 'Global Coverage', value: '~29% of Earth’s surface area' },
      { label: 'Forest Share', value: '~31% of terrestrial land (13,076M ha)' },
      { label: 'Key Factor', value: 'Rainfall gradient (Deserts <25cm to Rainforests >300cm)' }
    ],
    keyPoints: [
      'Forests: High rainfall, dense multi-tiered tree canopies, and massive carbon sequestration.',
      'Grasslands: Intermediate rainfall (25–75 cm/yr), dominated by grasses supporting vast herbivore herds.',
      'Deserts: Arid conditions (<25 cm/yr), extreme diurnal temperature swings, and xerophytic CAM succulents.'
    ],
    vtuExamples: [
      'Western Ghats Evergreen Forests',
      'Banni Grasslands of Gujarat',
      'Thar Desert of Rajasthan',
      'Himalayan Alpine Coniferous Belts'
    ],
    scientificTakeaway: 'Terrestrial biomes are delineated by climatic temperature and moisture regimes, supporting specialized adaptations from root systems to canopy foliage (VTU Syllabus Part 2.3).'
  },
  'aquatic-eco': {
    id: 'aquatic-eco',
    title: 'Aquatic Ecosystems — Water-Based Biomes',
    subtitle: 'Lentic, lotic, estuarine, and marine environments where gases exist in dissolved states',
    badge: 'AQUATIC REALMS',
    badgeTheme: 'blue',
    image: '/images/bio-levels/eco-aquatic.jpg',
    definition: 'Aquatic ecosystems encompass all water-based environments, covering over 71% of the Earth. Unlike land biomes, respiratory oxygen and carbon dioxide are present in dissolved states, and organisms must adapt to hydrostatic pressure, light penetration depth, and salinity gradients.',
    stats: [
      { label: 'Ocean Surface', value: '~71% of Earth surface (361M sq km)' },
      { label: 'Freshwater Share', value: '0.8% of surface, yet harbors 41% of all fish' },
      { label: 'Salinity Range', value: '<0.5 ppt (freshwater) to ~35 ppt (marine)' }
    ],
    keyPoints: [
      'Freshwater (Lentic lakes & Lotic rivers): Essential source of drinking water and agricultural irrigation.',
      'Marine Oceans: Massive thermohaline conveyor belt, global climate buffer, and marine phytoplankton producing >50% of planetary oxygen.',
      'Estuaries & Wetlands: Nutrient-rich ecotones serving as vital coastal nurseries and flood sponges.'
    ],
    vtuExamples: [
      'River Ganges & Brahmaputra River Basin',
      'Chilika Coastal Brackish Lagoon',
      'Gulf of Mannar Coral Reef Reserve',
      'Arabian Sea & Bay of Bengal waters'
    ],
    scientificTakeaway: 'Water bodies contain unique zonation based on solar light penetration (Euphotic, Profundal, Benthic) that controls aquatic primary productivity (VTU Syllabus Part 2.3).'
  },
  'species-estimates': {
    id: 'species-estimates',
    title: 'Estimated Global Species Numbers — Taxonomic Breakdown',
    subtitle: 'Robert May’s global biodiversity estimates across terrestrial and oceanic taxonomic groups',
    badge: 'TAXONOMIC ESTIMATES',
    badgeTheme: 'emerald',
    image: '/images/bio-levels/species-wildlife.jpg',
    definition: 'While taxonomists have formally cataloged approximately 1.8 million species, scientific statistical models (such as Robert May’s global extrapolations) estimate that Earth supports between 8.7 million to over 30 million species. The vast majority of insects, nematodes, deep-sea organisms, and soil bacteria remain undiscovered.',
    stats: [
      { label: 'Terrestrial Total', value: '8.7 Million estimated species' },
      { label: 'Oceanic Total', value: '2.2 Million estimated species' },
      { label: 'Insects Alone', value: '10 to 30 Million estimated species' }
    ],
    keyPoints: [
      'Insects constitute over 70% of all animal species; beetles alone represent 25% of all known animals.',
      'Vascular Plants: ~220,000 to 390,000 species cataloged, anchoring continental primary production.',
      'Bacterial & Microbial Diversity: 5 to 10 million species estimated; less than 1% cultured in laboratory media.',
      'Fungi: ~1.5 million estimated species, functioning as indispensable saprotrophic decomposers.'
    ],
    vtuExamples: [
      'Terrestrial Species: 8.7M estimated',
      'Oceanic Species: 2.2M estimated',
      'Vascular Plants: 220,000 cataloged',
      'Marine Species: 0.7–1.0M estimated',
      'Insects: 10–30M estimated',
      'Bacteria: 5–10M estimated',
      'Fungi: 1.5M estimated'
    ],
    scientificTakeaway: 'Only about 20% of Earth’s species have been formally described by science. Millions of species risk extinction before they are even discovered (VTU Syllabus Part 2).'
  },
  hotspots: {
    id: 'hotspots',
    title: 'Hotspots of Diversity — Biodiversity Sanctuaries',
    subtitle: 'Biogeographic regions with exceptionally high endemic species facing imminent habitat loss',
    badge: 'BIODIVERSITY HOTSPOTS',
    badgeTheme: 'amber',
    image: '/images/bio-levels/hotspot-thumb.jpg',
    definition: 'Coined by Norman Myers (1988), a Biodiversity Hotspot is a region that meets two strict criteria: (1) It must contain at least 1,500 species of vascular plants (>0.5% of world total) as endemics; (2) It must have lost at least 70% of its original primary native vegetation. There are 36 designated Hotspots globally, of which 4 cover India.',
    stats: [
      { label: 'Global Hotspots', value: '36 recognized Biodiversity Hotspots on Earth' },
      { label: 'Indian Hotspots', value: '4 Hotspots overlap Indian territory' },
      { label: 'Strict Criterion', value: '>1,500 endemic plants & >70% habitat loss' }
    ],
    keyPoints: [
      'Western Ghats & Sri Lanka: Exceptional amphibian and reptile endemism; threatened by monoculture plantations and mining.',
      'Himalayas: Encompassing the entire Indian Himalayan mountain tract with endangered Snow Leopards and medicinal herbs.',
      'Indo-Burma: Spanning North-East India (south of Brahmaputra), exceptional freshwater turtle and primate diversity.',
      'Sundaland: Encompassing the Nicobar group of islands, ancient tropical evergreen rainforests with high marine richness.'
    ],
    vtuExamples: [
      'Western Ghats (Silent Valley, Agasthyamalai)',
      'Himalayas (Trans-Himalayan & Eastern Himalayan belts)',
      'Indo-Burma (North-East India & Myanmar borderlands)',
      'Sundaland (Nicobar Islands biosphere zone)'
    ],
    scientificTakeaway: 'Although hotspots cover only 2.4% of Earth’s land surface, they shelter over 50% of the world’s plant species and 42% of terrestrial vertebrate species as endemics (VTU Syllabus Part 2.2).'
  }
};

export function BioLevelsScreen() {
  const reducedMotion = useReducedMotion();
  const [activeDog, setActiveDog] = useState<'chihuahua' | 'beagle' | 'rottweiler'>('chihuahua');
  const [activeEcoTab, setActiveEcoTab] = useState<'terrestrial' | 'aquatic'>('terrestrial');
  const [selectedDetail, setSelectedDetail] = useState<LevelModalDetail | null>(null);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedDetail !== null, () => setSelectedDetail(null));

  return (
    <section className="bio-screen bio-levels-section" id="ch-levels">
      {/* ── Pristine Panoramic Island & Reef Background (Image 2 Provided by User) ── */}
      <div className="bio-levels-bg-wrap">
        <img
          src="/images/bio-levels-bg.jpg"
          alt="Pristine archipelago with tropical rainforest, waterfalls and turquoise coral lagoons"
          className="bio-levels-bg-image"
        />
      </div>

      {/* ── Atmosphere & Readability Scrims ── */}
      <div className="bio-levels-scrim-left" />
      <div className="bio-levels-scrim-bottom" />
      <div className="bio-levels-scrim-top" />
      <div className="bio-levels-vignette" />

      <div className="bio-levels-content-container">
        {/* ── Top Header Row with Title (Left) and Progression Orbs (Right) ── */}
        <div className="bio-levels-header-row">
          <div className="bio-levels-header-left">
            <div className="bio-levels-pill-badge">
              <span className="bio-levels-pill-leaf" aria-hidden="true">🍃</span>
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 02</span>
            </div>

            <h2 className="bio-levels-title">
              Levels of <span className="bio-levels-title-accent">Biodiversity</span>
            </h2>

            <p className="bio-levels-subtitle">From Genes to Ecosystems</p>

            <p className="bio-levels-lead">
              Biodiversity exists at three levels — genetic, species and ecosystem. These
              levels are interconnected and together create the rich variety of life on Earth.
              Click on any level, diagram, or statistic to view in-depth academic details.
            </p>
          </div>

          {/* ── Progression Pipeline (From Genes to Ecosystems) ── */}
          <div className="bio-levels-pipeline-container" aria-label="Progression from Genes to Ecosystems">
            {/* 1. Genetic Diversity Orb */}
            <div 
              className="bio-pipeline-node"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['genetic'])}
              title="Click to view Genetic Diversity analysis"
              style={{ cursor: 'pointer' }}
            >
              <span className="bio-pipeline-tag cyan-tag">Genetic Diversity</span>
              <div className="bio-pipeline-orb-frame cyan-glow">
                <img
                  src="/images/bio-levels/orb-dna.jpg"
                  alt="Genetic DNA double helix"
                  className="bio-pipeline-orb-img"
                />
                <span className="bio-pipeline-orb-specular" />
              </div>
            </div>

            {/* Glowing Green Curved Flow Arrow 1 */}
            <div className="bio-pipeline-connector" aria-hidden="true">
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                <path
                  d="M 4 18 C 16 6, 32 6, 44 14"
                  stroke="#4ade80"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                />
                <polygon points="44,9 47,15 41,16" fill="#4ade80" />
              </svg>
            </div>

            {/* 2. Species Diversity Orb */}
            <div 
              className="bio-pipeline-node"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['species'])}
              title="Click to view Species Diversity analysis"
              style={{ cursor: 'pointer' }}
            >
              <span className="bio-pipeline-tag green-tag">Species Diversity</span>
              <div className="bio-pipeline-orb-frame green-glow">
                <img
                  src="/images/bio-levels/orb-tiger.jpg"
                  alt="Bengal Tiger portrait representing species diversity"
                  className="bio-pipeline-orb-img"
                />
                <span className="bio-pipeline-orb-specular" />
              </div>
            </div>

            {/* Glowing Green Curved Flow Arrow 2 */}
            <div className="bio-pipeline-connector" aria-hidden="true">
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                <path
                  d="M 4 18 C 16 6, 32 6, 44 14"
                  stroke="#4ade80"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                />
                <polygon points="44,9 47,15 41,16" fill="#4ade80" />
              </svg>
            </div>

            {/* 3. Ecosystem Diversity Orb / Dome */}
            <div 
              className="bio-pipeline-node large-dome"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['ecosystem'])}
              title="Click to view Ecosystem Diversity analysis"
              style={{ cursor: 'pointer' }}
            >
              <span className="bio-pipeline-tag cyan-tag">Ecosystem Diversity</span>
              <div className="bio-pipeline-orb-frame dome-glow">
                <img
                  src="/images/bio-levels/orb-ecosystem.jpg"
                  alt="Ecosystem Biosphere island dome"
                  className="bio-pipeline-orb-img"
                />
                <span className="bio-pipeline-orb-specular dome-specular" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Middle Row: 3 Deep-Dive Cards (Levels 01, 02, 03) ── */}
        <div className="bio-levels-cards-grid">
          {/* ── CARD 01: GENETIC DIVERSITY ── */}
          <div 
            className="bio-level-deep-card liquid-glass"
            style={{ cursor: 'pointer' }}
          >
            <div 
              className="bio-card-top-badge"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['genetic'])}
            >
              <span className="bio-badge-index">01</span>
              <div className="bio-badge-pill green">
                <DnaIcon size={14} className="bio-badge-icon" />
                <span>Genetic Diversity</span>
              </div>
            </div>

            <p 
              className="bio-card-body-text"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['genetic'])}
            >
              Total genetic characteristics in a species' makeup. Every individual differs
              genetically. Wild species have a <strong className="bio-text-green">'gene pool'</strong>,
              which helps in adaptation and disease resistance.
            </p>

            <div className="bio-card-subhead">Examples (Click breed for genetics)</div>

            {/* 3 Dog Breeds */}
            <div className="bio-dogs-grid">
              <div
                className={`bio-dog-item ${activeDog === 'chihuahua' ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDog('chihuahua');
                  setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['dog-genetics']);
                }}
                title="Click for Chihuahua genetics"
              >
                <div className="bio-dog-thumb-wrap">
                  <img
                    src="/images/bio-levels/dog-chihuahua-sq.jpg"
                    alt="Chihuahua dog"
                    className="bio-dog-img"
                  />
                </div>
                <span className="bio-dog-name">Chihuahua</span>
              </div>

              <div
                className={`bio-dog-item ${activeDog === 'beagle' ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDog('beagle');
                  setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['dog-genetics']);
                }}
                title="Click for Beagle genetics"
              >
                <div className="bio-dog-thumb-wrap">
                  <img
                    src="/images/bio-levels/dog-beagle-sq.jpg"
                    alt="Beagle dog"
                    className="bio-dog-img"
                  />
                </div>
                <span className="bio-dog-name">Beagle</span>
              </div>

              <div
                className={`bio-dog-item ${activeDog === 'rottweiler' ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDog('rottweiler');
                  setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['dog-genetics']);
                }}
                title="Click for Rottweiler genetics"
              >
                <div className="bio-dog-thumb-wrap">
                  <img
                    src="/images/bio-levels/dog-rottweiler-sq.jpg"
                    alt="Rottweiler dog"
                    className="bio-dog-img"
                  />
                </div>
                <span className="bio-dog-name">Rottweiler</span>
              </div>
            </div>

            {/* Bottom Pill */}
            <div 
              className="bio-dog-caption-pill"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['dog-genetics'])}
            >
              <span>Same species, different genes</span>
              <small>(Click for allele study)</small>
            </div>

            {/* Floating 3D DNA Helix on the right */}
            <div 
              className="bio-card-dna-graphic" 
              aria-hidden="true"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['genetic'])}
            >
              <img
                src="/images/bio-levels/orb-dna.jpg"
                alt=""
                className="bio-card-dna-img"
              />
            </div>
          </div>

          {/* ── CARD 02: SPECIES DIVERSITY ── */}
          <div 
            className="bio-level-deep-card liquid-glass"
            onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['species'])}
            title="Click to explore Species Diversity & Megadiverse Nations"
            style={{ cursor: 'pointer' }}
          >
            <div className="bio-card-top-badge with-badge-right">
              <div className="bio-badge-left-group">
                <span className="bio-badge-index">02</span>
                <div className="bio-badge-pill green">
                  <PawIcon size={14} className="bio-badge-icon" />
                  <span>Species Diversity</span>
                </div>
              </div>
              <div className="bio-badge-circle-emblem green" aria-hidden="true">
                <PawIcon size={14} />
              </div>
            </div>

            <p className="bio-card-body-text">
              <span className="bio-underline-text">Variety of species in a region</span>, including the{' '}
              <span className="bio-underline-text">number and relative abundance</span> of species.{' '}
              <span className="bio-underline-text">About 1.8 million</span> species have been identified.{' '}
              <span className="bio-underline-text">Areas with high species richness</span> are called '
              <span className="bio-underline-text">hotspots of diversity</span>'. India is among the
              world's 15 most species-rich nations.
            </p>

            {/* Wildlife Panorama / Montage Image */}
            <div className="bio-wildlife-montage-holder">
              <img
                src="/images/bio-levels/species-wildlife.jpg"
                alt="Montage of wild species: Elephant, Bengal Tiger, Flying Macaw, and Deer"
                className="bio-wildlife-montage-img"
              />
              <div className="bio-wildlife-scrim" />
              <div className="bio-card-click-hint">
                <Maximize2 size={12} className="text-white/90" />
                <span>Click for details</span>
              </div>
            </div>
          </div>

          {/* ── CARD 03: ECOSYSTEM DIVERSITY ── */}
          <div className="bio-level-deep-card liquid-glass">
            <div 
              className="bio-card-top-badge with-badge-right"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['ecosystem'])}
              style={{ cursor: 'pointer' }}
            >
              <div className="bio-badge-left-group">
                <span className="bio-badge-index">03</span>
                <div className="bio-badge-pill green">
                  <TreePine size={14} className="bio-badge-icon" />
                  <span>Ecosystem Diversity</span>
                </div>
              </div>
              <div className="bio-badge-circle-emblem cyan" aria-hidden="true">
                <Globe size={14} />
              </div>
            </div>

            <p 
              className="bio-card-body-text"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['ecosystem'])}
              style={{ cursor: 'pointer' }}
            >
              Variety of ecosystems in a region, including terrestrial and aquatic ecosystems.
              Different habitats, climates and ecological processes support different communities
              of organisms.
            </p>

            {/* Two Comparative Ecosystem Cards with central slider handle */}
            <div className="bio-eco-compare-container">
              <div className="bio-eco-compare-grid">
                {/* Terrestrial */}
                <div
                  className={`bio-eco-card ${activeEcoTab === 'terrestrial' ? 'is-selected' : ''}`}
                  onClick={() => {
                    setActiveEcoTab('terrestrial');
                    setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['terrestrial-eco']);
                  }}
                  title="Click for Terrestrial Biomes deep dive"
                >
                  <div className="bio-eco-thumb-wrap">
                    <img
                      src="/images/bio-levels/eco-terrestrial.jpg"
                      alt="Terrestrial Ecosystems alpine forest"
                      className="bio-eco-img"
                    />
                    <div className="bio-eco-scrim" />
                    <div className="bio-card-click-hint">
                      <Maximize2 size={11} className="text-white/90" />
                      <span>Details</span>
                    </div>
                  </div>
                  <div className="bio-eco-pill-btn green">
                    <span>Terrestrial Ecosystems</span>
                  </div>
                </div>

                {/* Aquatic */}
                <div
                  className={`bio-eco-card ${activeEcoTab === 'aquatic' ? 'is-selected' : ''}`}
                  onClick={() => {
                    setActiveEcoTab('aquatic');
                    setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['aquatic-eco']);
                  }}
                  title="Click for Aquatic Realms deep dive"
                >
                  <div className="bio-eco-thumb-wrap">
                    <img
                      src="/images/bio-levels/eco-aquatic.jpg"
                      alt="Aquatic Ecosystems coral reef"
                      className="bio-eco-img"
                    />
                    <div className="bio-eco-scrim" />
                    <div className="bio-card-click-hint">
                      <Maximize2 size={11} className="text-white/90" />
                      <span>Details</span>
                    </div>
                  </div>
                  <div className="bio-eco-pill-btn blue">
                    <span>Aquatic Ecosystems</span>
                  </div>
                </div>
              </div>
              {/* Subtle divider slider indicator */}
              <div className="bio-eco-slider-handle" aria-hidden="true">
                <span className="bio-eco-slider-dot top" />
                <span className="bio-eco-slider-line" />
                <span className="bio-eco-slider-dot bottom" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Estimated Global Species Numbers (Left) + Key Facts & Hotspots (Right) ── */}
        <div className="bio-levels-bottom-row">
          {/* ── Bottom Left: Estimated Global Species Numbers ── */}
          <div 
            className="bio-levels-panel bio-species-count-panel liquid-glass"
            onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['species-estimates'])}
            title="Click to view Taxonomic Breakdown of Robert May Estimates"
            style={{ cursor: 'pointer' }}
          >
            <div className="bio-panel-heading-row">
              <div className="bio-panel-icon-circle green">
                <Globe size={15} />
              </div>
              <h3 className="bio-panel-heading-title">Estimated Global Species Numbers</h3>
              <span className="text-[0.65rem] text-emerald-400/80 ml-auto">(Click for breakdown)</span>
            </div>

            <div className="bio-species-count-strip">
              {/* 1. Terrestrial */}
              <div className="bio-count-pill">
                <div className="bio-count-icon-circle green">
                  <RichTreeIcon size={18} />
                </div>
                <div className="bio-count-info">
                  <strong className="bio-count-number">8.7M</strong>
                  <span className="bio-count-label">
                    Terrestrial<br />species (estimated)
                  </span>
                </div>
              </div>

              {/* 2. Oceanic */}
              <div className="bio-count-pill">
                <div className="bio-count-icon-circle blue">
                  <RichOceanIcon size={18} />
                </div>
                <div className="bio-count-info">
                  <strong className="bio-count-number">2.2M</strong>
                  <span className="bio-count-label">
                    Oceanic<br />species (estimated)
                  </span>
                </div>
              </div>

              {/* 3. Vascular Plants */}
              <div className="bio-count-pill">
                <div className="bio-count-icon-circle green">
                  <RichPlantIcon size={18} />
                </div>
                <div className="bio-count-info">
                  <strong className="bio-count-number">220K</strong>
                  <span className="bio-count-label">
                    Vascular<br />plants
                  </span>
                </div>
              </div>

              {/* 4. Marine Species */}
              <div className="bio-count-pill">
                <div className="bio-count-icon-circle orange">
                  <RichFishIcon size={18} />
                </div>
                <div className="bio-count-info">
                  <strong className="bio-count-number">0.7–1M</strong>
                  <span className="bio-count-label">
                    Marine<br />species
                  </span>
                </div>
              </div>

              {/* 5. Insects */}
              <div className="bio-count-pill">
                <div className="bio-count-icon-circle cyan">
                  <RichButterflyIcon size={18} />
                </div>
                <div className="bio-count-info">
                  <strong className="bio-count-number">10–30M</strong>
                  <span className="bio-count-label">
                    Insect<br />species
                  </span>
                </div>
              </div>

              {/* 6. Bacteria */}
              <div className="bio-count-pill">
                <div className="bio-count-icon-circle purple">
                  <RichBacteriaIcon size={18} />
                </div>
                <div className="bio-count-info">
                  <strong className="bio-count-number">5–10M</strong>
                  <span className="bio-count-label">
                    Bacterial<br />species
                  </span>
                </div>
              </div>

              {/* 7. Fungi */}
              <div className="bio-count-pill">
                <div className="bio-count-icon-circle amber">
                  <RichMushroomIcon size={18} />
                </div>
                <div className="bio-count-info">
                  <strong className="bio-count-number">1.5M</strong>
                  <span className="bio-count-label">
                    Fungal<br />species
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom Right: Key Facts & Hotspots of Diversity ── */}
          <div className="bio-levels-panel bio-facts-hotspots-panel liquid-glass">
            {/* Left: Key Facts */}
            <div className="bio-facts-column">
              <div className="bio-panel-heading-row">
                <div className="bio-panel-icon-circle amber">
                  <Lightbulb size={14} />
                </div>
                <h3 className="bio-panel-heading-title">Key Facts</h3>
              </div>

              <ul className="bio-facts-checklist">
                <li>
                  <CheckCircle2 size={13} className="bio-fact-check" />
                  <span>~1.8 million species identified so far.</span>
                </li>
                <li>
                  <CheckCircle2 size={13} className="bio-fact-check" />
                  <span>India is among the world's 15 most species-rich nations.</span>
                </li>
                <li>
                  <CheckCircle2 size={13} className="bio-fact-check" />
                  <span>Many more species are yet to be discovered.</span>
                </li>
                <li>
                  <CheckCircle2 size={13} className="bio-fact-check" />
                  <span>Species richness is highest in tropical regions (hotspots of diversity).</span>
                </li>
              </ul>
            </div>

            {/* Right: Hotspots of Diversity */}
            <div 
              className="bio-hotspot-column"
              onClick={() => setSelectedDetail(BIO_LEVEL_MODAL_DETAILS['hotspots'])}
              title="Click to view 4 Biodiversity Hotspots in India"
              style={{ cursor: 'pointer' }}
            >
              <div className="bio-hotspot-thumb-wrap">
                <img
                  src="/images/bio-levels/hotspot-thumb.jpg"
                  alt="Aerial view of tropical rainforest biodiversity hotspot"
                  className="bio-hotspot-img"
                />
                <div className="bio-hotspot-scrim" />
                <div className="bio-card-click-hint">
                  <Maximize2 size={11} className="text-white/90" />
                  <span>Explore</span>
                </div>
              </div>

              <div className="bio-hotspot-info">
                <div className="bio-hotspot-label-row">
                  <MapPin size={14} className="bio-hotspot-pin" />
                  <span className="bio-hotspot-title">Hotspots of Diversity</span>
                </div>
                <p className="bio-hotspot-desc">
                  Regions with very high species richness and endemic species.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL: CHAPTER 02 LEVELS OF BIODIVERSITY
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
                    Key Ecological Principles & Insights
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
                    <TreePine className="w-3.5 h-3.5" />
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

export default BioLevelsScreen;
