import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Trees,
  Fish,
  Leaf,
  Factory,
  Thermometer,
  Flame,
  TrendingDown,
  Layers,
  Network,
  Droplets,
  PawPrint,
  ArrowRight,
  Info,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Globe,
  Maximize2
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

interface BioThreatsScreenProps {
  onNavigateNext?: () => void;
}

interface ThreatCardItem {
  id: string;
  badge: string;
  title: string;
  image: string;
  icon: React.ReactNode;
  desc: string;
  color: string;
  glowColor: string;
}

export interface ThreatModalDetail {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeTheme: 'amber' | 'emerald' | 'blue';
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

const THREATS_DATA: ThreatCardItem[] = [
  {
    id: 'habitat-loss',
    badge: '01',
    title: 'Habitat Loss & Fragmentation',
    image: '/images/bio-threat-habitat.jpg',
    icon: <Trees className="w-4 h-4 text-emerald-400" />,
    desc: 'Due to urbanization, agriculture, mining, dams and infrastructure development.',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)'
  },
  {
    id: 'overexploitation',
    badge: '02',
    title: 'Overexploitation',
    image: '/images/bio-threat-overexploit.jpg',
    icon: <Fish className="w-4 h-4 text-cyan-400" />,
    desc: 'Excessive hunting, poaching, overfishing and unsustainable resource use.',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.45)'
  },
  {
    id: 'invasive-species',
    badge: '03',
    title: 'Invasive Species',
    image: '/images/bio-threat-invasive.jpg',
    icon: <Leaf className="w-4 h-4 text-lime-400" />,
    desc: 'Non-native species outcompete, prey on or bring diseases to native species.',
    color: '#84cc16',
    glowColor: 'rgba(132, 204, 22, 0.45)'
  },
  {
    id: 'pollution',
    badge: '04',
    title: 'Pollution',
    image: '/images/bio-threat-pollution.jpg',
    icon: <Factory className="w-4 h-4 text-purple-400" />,
    desc: 'Air, water and soil pollution harm organisms and their habitats.',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.45)'
  },
  {
    id: 'climate-change',
    badge: '05',
    title: 'Climate Change',
    image: '/images/bio-threat-climate.jpg',
    icon: <Thermometer className="w-4 h-4 text-amber-400" />,
    desc: 'Changing temperature and rainfall patterns alter habitats and species distribution.',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)'
  },
  {
    id: 'natural-calamities',
    badge: '06',
    title: 'Natural Calamities',
    image: '/images/bio-threat-calamities.jpg',
    icon: <Flame className="w-4 h-4 text-rose-400" />,
    desc: 'Floods, droughts, cyclones, landslides and forest fires can destroy habitats.',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.45)'
  }
];

export const BIO_THREATS_MODAL_DETAILS: Record<string, ThreatModalDetail> = {
  'habitat-loss': {
    id: 'habitat-loss',
    title: 'Habitat Loss & Fragmentation',
    subtitle: 'Primary driver of global terrestrial species extinctions and biodiversity loss',
    badge: 'THREAT 01 · HABITAT LOSS',
    badgeTheme: 'amber',
    image: '/images/bio-threat-habitat.jpg',
    definition: 'Habitat loss occurs when natural ecosystems are transformed for agriculture, urban sprawling, highways, dams, and mineral open-cast mining. Fragmentation divides continuous virgin habitats into small, isolated patches, creating edge effects, isolating gene pools, and disrupting wide-ranging migratory wildlife.',
    stats: [
      { label: 'Primary Cause', value: 'Responsible for >80% of terrestrial extinctions' },
      { label: 'Forest Loss', value: '>10 million hectares of forest cleared annually' },
      { label: 'Edge Effect', value: 'Alters microclimates up to 100m into forest interiors' }
    ],
    keyPoints: [
      'Agricultural Expansion: Clearing tropical forests for cattle ranching, soy monocultures, and palm oil plantations.',
      'Linear Infrastructure: Highways, railway lines, and power grids bisecting animal corridors, causing severe wildlife roadkill.',
      'Genetic Bottlenecks: Fragmented populations suffer from restricted gene flow, leading to inbreeding depression and local extinctions.'
    ],
    vtuExamples: [
      'Western Ghats linear infrastructure severing Asian Elephant migratory corridors',
      'Deforestation of Amazonian Rainforest for commercial soybean farming',
      'Construction of massive river dams submerging pristine riparian valleys'
    ],
    scientificTakeaway: 'Habitat loss is the single greatest threat to global biodiversity. When habitat shrinks below a threshold, population declines become irreversible (VTU Syllabus Part 4.1).'
  },
  overexploitation: {
    id: 'overexploitation',
    title: 'Overexploitation & Commercial Poaching',
    subtitle: 'Harvesting wild organisms at rates exceeding natural reproductive replenishment',
    badge: 'THREAT 02 · OVEREXPLOITATION',
    badgeTheme: 'amber',
    image: '/images/bio-threat-overexploit.jpg',
    definition: 'Overexploitation refers to the unsustainable harvesting of wild flora and fauna for food, timber, commercial trade, luxury status items, or traditional medicines. When hunting, poaching, or logging rates outstrip species fertility rates, populations collapse rapidly.',
    stats: [
      { label: 'Marine Overfishing', value: '>34% of global marine fish stocks overexploited' },
      { label: 'Illegal Trade', value: '$20+ Billion illegal international wildlife trade' },
      { label: 'Historic Collapse', value: 'Passenger Pigeon (billions to extinction in 50 yrs)' }
    ],
    keyPoints: [
      'Commercial Poaching: Targeted killing of apex wildlife for ivory (elephants), horns (rhinos), skins, and bones (tigers).',
      'Industrial Marine Trawling: Massive bottom trawlers scraping ocean floors and taking vast incidental bycatch.',
      'Over-harvesting of Medicinal Flora: Wild populations of Himalayan Yew (*Taxus wallichiana*) depleted for the cancer drug Paclitaxel.'
    ],
    vtuExamples: [
      'Poaching of Indian One-horned Rhino for keratin horns in Kaziranga',
      'Red Sanders (Pterocarpus santalinus) illicit logging in Andhra Pradesh',
      'Collapse of North Atlantic Cod fisheries due to industrial factory trawlers'
    ],
    scientificTakeaway: 'Overexploitation drove the Passenger Pigeon, Dodo, and Steller’s Sea Cow to extinction, proving that even abundant species can be wiped out by industrial harvest (VTU Syllabus Part 4.2).'
  },
  'invasive-species': {
    id: 'invasive-species',
    title: 'Invasive Alien Species — Ecological Disruptors',
    subtitle: 'Non-native species outcompeting, predating, and introducing pathogens to native fauna & flora',
    badge: 'THREAT 03 · INVASIVE SPECIES',
    badgeTheme: 'amber',
    image: '/images/bio-threat-invasive.jpg',
    definition: 'Invasive alien species are organisms introduced outside their natural geographic range through human trade, transport, or agriculture. Lacking native predators and pathogens, they spread aggressively, outcompeting native endemic species, altering hydrology, and causing immense ecological damage.',
    stats: [
      { label: 'Extinction Role', value: 'Major factor in ~40% of all animal extinctions since 1600' },
      { label: 'Economic Cost', value: 'Over $400 Billion annually in global damage and control' },
      { label: 'Island Impact', value: 'Devastates endemic island ground-nesting birds' }
    ],
    keyPoints: [
      'Lantana camara: Invasive Neotropical thorny shrub smothering over 40% of Indian tiger reserves and inhibiting native grass growth.',
      'Water Hyacinth (Eichhornia crassipes): "Terror of Bengal" choking freshwater waterways and blocking solar light from aquatic life.',
      'Parthenium hysterophorus (Congress grass): Highly allergenic invasive weed degrading Indian agricultural pastures.',
      'Nile Perch: Introduced into Lake Victoria, eradicating over 200 endemic cichlid fish species.'
    ],
    vtuExamples: [
      'Lantana camara invading Corbett, Bandipur, and Mudumalai reserves',
      'Eichhornia crassipes (Water Hyacinth) suffocating Indian wetlands',
      'Parthenium hysterophorus degrading pasture land across India'
    ],
    scientificTakeaway: 'Invasive species alter the evolutionary trajectory of native ecosystems by hijacking ecological niches and driving native species to localized extinction (VTU Syllabus Part 4.3).'
  },
  pollution: {
    id: 'pollution',
    title: 'Pollution — Chemical & Environmental Toxification',
    subtitle: 'Agrochemical runoff, industrial effluent, plastic debris, and toxic bioaccumulation',
    badge: 'THREAT 04 · POLLUTION',
    badgeTheme: 'amber',
    image: '/images/bio-threat-pollution.jpg',
    definition: 'Pollution introduces harmful synthetic contaminants (heavy metals, pesticides, plastic polymers, industrial sulfur dioxide, sewage effluents) into air, water, and soil environments. Toxic pollutants cause chronic physiological disorders, reproductive failures, and trophic biomagnification.',
    stats: [
      { label: 'Marine Plastics', value: '>14 million tons of plastic enter oceans each year' },
      { label: 'Vulture Decline', value: '>99% Indian vulture collapse from Diclofenac' },
      { label: 'Eutrophication', value: '>400 ocean hypoxic dead zones worldwide' }
    ],
    keyPoints: [
      'Biomagnification: Non-biodegradable toxins (DDT, methylmercury) concentrate up trophic levels, causing eggshell thinning in raptors.',
      'Indian Vulture Crisis: Diclofenac administered to cattle caused acute renal failure in Gyps vultures, leading to a 99% population crash.',
      'Agricultural Eutrophication: Fertilizer runoff causes explosive algal blooms, depleting dissolved oxygen and killing fish.',
      'Acid Precipitation: Industrial SO₂ and NOx acidifying freshwater lakes and stunting forest canopies.'
    ],
    vtuExamples: [
      'Diclofenac poisoning decimating Indian Gyps vulture populations',
      'Ganges and Yamuna river pollution impacting Ganges River Dolphins',
      'Pesticide runoff triggering massive fish kills in agricultural canals'
    ],
    scientificTakeaway: 'Chemical pollutants biomagnify exponentially up food chains, making top predators the most vulnerable victims of toxic pollution (VTU Syllabus Part 4.4).'
  },
  'climate-change': {
    id: 'climate-change',
    title: 'Climate Change — Shifting Thermal Boundaries',
    subtitle: 'Anthropogenic global warming, ocean acidification, phenological mismatches & coral bleaching',
    badge: 'THREAT 05 · CLIMATE CHANGE',
    badgeTheme: 'amber',
    image: '/images/bio-threat-climate.jpg',
    definition: 'Rapid anthropogenic greenhouse gas emissions have raised global average temperatures by ~1.2°C above pre-industrial levels. Climate change alters precipitation patterns, melts polar glaciers, acidifies ocean waters, and forces species to shift their geographic and elevation ranges.',
    stats: [
      { label: 'Thermal Anomaly', value: '+1.2°C global surface temperature increase' },
      { label: 'Coral Reefs', value: '70–90% of coral reefs face severe bleaching at 1.5°C' },
      { label: 'Rate of Change', value: '10x faster than post-ice-age natural warming rates' }
    ],
    keyPoints: [
      'Mass Coral Bleaching: Elevated sea surface temperatures cause corals to expel their symbiotic zooxanthellae algae, leading to mass mortality.',
      'Phenological Asynchrony: Shifting seasonal cues cause mismatches between flowering times and insect pollinator emergence.',
      'Mountain & Polar Trapping: High-altitude endemic species (e.g. Snow Leopard, Himalayan alpine flora) have no higher elevation to migrate to as warming progresses.'
    ],
    vtuExamples: [
      'Mass bleaching across Lakshadweep and Andaman coral reef atolls',
      'Shrinking alpine meadow ranges of the Himalayan Snow Leopard',
      'Melting of Arctic sea ice threatening Polar Bear hunting seasons'
    ],
    scientificTakeaway: 'Climate change acts as an omnipresent threat multiplier, exacerbating the harmful effects of habitat fragmentation and invasive species (VTU Syllabus Part 4.5).'
  },
  'natural-calamities': {
    id: 'natural-calamities',
    title: 'Natural Calamities — Episodic Catastrophes',
    subtitle: 'Wildfires, catastrophic floods, volcanic eruptions, tsunamis, and severe droughts',
    badge: 'THREAT 06 · CALAMITIES',
    badgeTheme: 'amber',
    image: '/images/bio-threat-calamities.jpg',
    definition: 'While natural disturbances are normal components of ecosystem dynamics, severe episodic calamities (intense forest wildfires, catastrophic monsoonal floods, prolonged droughts, tsunamis) can push already stressed, fragmented, and small populations over the brink into extinction.',
    stats: [
      { label: 'Wildfire Scale', value: 'Australian bushfires (2019) killed ~3 billion animals' },
      { label: 'Kaziranga Floods', value: 'Annual Brahmaputra flooding submerges >70% of park' },
      { label: 'Vulnerability', value: 'Localized endemic populations risk total annihilation' }
    ],
    keyPoints: [
      'Wildfires: Prolonged mega-fires incinerate entire canopy ecosystems, killing slow-moving wildlife and destroying seed banks.',
      'Extreme Monsoonal Floods: Brahmaputra annual floods in Kaziranga submerge rhino habitats, forcing animals into perilous highway crossings.',
      'Prolonged Megadroughts: Desiccates water holes in arid zones, starving herbivore populations.'
    ],
    vtuExamples: [
      'Kaziranga Brahmaputra annual monsoon inundations',
      'Forest fires across dry deciduous tracts of Bandipur and Corbett',
      '2004 Indian Ocean Tsunami destroying coastal mangrove fringing reefs'
    ],
    scientificTakeaway: 'When habitats are fragmented into small islands, a single localized natural calamity can eradicate an entire species (VTU Syllabus Part 4.6).'
  },
  'impact-destruction': {
    id: 'impact-destruction',
    title: 'Impact: Habitat Destruction & Fragmentation',
    subtitle: 'Conversion of primary wilderness into agricultural and urban matrices',
    badge: 'BIODIVERSITY IMPACT',
    badgeTheme: 'amber',
    image: '/images/bio-threat-habitat.jpg',
    definition: 'Habitat destruction directly eradicates the physical living space, food supply, and nesting sites of wild organisms. As habitats fracture into small disjunct islands, edge effects alter humidity, wind exposure, and sunlight penetration, causing interior forest species to perish.',
    stats: [
      { label: 'Impact Type', value: 'Structural loss of ecological space' },
      { label: 'Consequence', value: 'Direct local extirpation of specialist taxa' },
      { label: 'Key Vector', value: 'Roads, agriculture, dams & mining' }
    ],
    keyPoints: [
      'Large mammals requiring vast territorial home ranges (Elephants, Tigers) cannot survive in small fragmented forest pockets.',
      'Forces wildlife into human settlements, triggering catastrophic human-wildlife conflicts.',
      'Loss of primary old-growth trees depletes specialized nesting cavities for hornbills and raptors.'
    ],
    vtuExamples: ['Elephant-human conflict in Assam and Karnataka', 'Western Ghats plantation fragmentation'],
    scientificTakeaway: 'Preventing habitat destruction through connected wildlife corridors is the single most cost-effective conservation measure.'
  },
  'species-risk-modal': {
    id: 'species-risk-modal',
    title: 'IUCN Red List Categories & Species at Risk',
    subtitle: 'The international standard for assessing global extinction vulnerability of wild taxa',
    badge: 'IUCN RED LIST CRITERIA',
    badgeTheme: 'amber',
    image: '/images/bio-threat-overexploit.jpg',
    definition: 'The International Union for Conservation of Nature (IUCN) Red List of Threatened Species classifies species into progressive categories based on population decline rates, geographical range size, and total adult breeding numbers. Approximately 28% of all assessed species worldwide are threatened with extinction.',
    stats: [
      { label: 'Global Risk', value: '>44,000 species threatened with extinction' },
      { label: 'Critically Endangered', value: 'Extremely high risk of extinction in the wild' },
      { label: 'Assessment Standard', value: 'IUCN Red List Categories and Criteria Version 3.1' }
    ],
    keyPoints: [
      'Critically Endangered (CR): Extremely high risk of extinction (e.g. Gharial, Great Indian Bustard, Bengal Florican).',
      'Endangered (EN): High risk of extinction in the wild (e.g. Royal Bengal Tiger, Asian Elephant, Lion-tailed Macaque, Ganges Dolphin).',
      'Vulnerable (VU): High risk of endangerment in the medium term (e.g. Snow Leopard, Greater One-horned Rhino, Nilgiri Tahr).',
      'Near Threatened (NT) & Least Concern (LC): Monitored populations with lower immediate threat levels.'
    ],
    vtuExamples: [
      'Great Indian Bustard (<150 individuals remaining in Thar desert — CR)',
      'Gharial (Gavialis gangeticus in Chambal River — CR)',
      'Royal Bengal Tiger (Panthera tigris — EN)',
      'Snow Leopard (Panthera uncia — VU)'
    ],
    scientificTakeaway: 'The IUCN Red List is the global barometer of biodiversity health, guiding international legal protections and captive breeding priorities (VTU Syllabus Part 4).'
  }
};

const IMPACTS_DATA = [
  {
    id: 'habitat-destruction',
    title: 'Habitat Destruction',
    desc: 'Leads to loss of species and fragmented populations.',
    icon: <Layers className="w-4 h-4 text-rose-400" />,
    color: '#ef4444',
    borderClass: 'impact-border-red'
  },
  {
    id: 'species-decline',
    title: 'Species Decline',
    desc: 'Many species face reduced population sizes and risk of extinction.',
    icon: <TrendingDown className="w-4 h-4 text-amber-400" />,
    color: '#f59e0b',
    borderClass: 'impact-border-amber'
  },
  {
    id: 'ecosystem-imbalance',
    title: 'Ecosystem Imbalance',
    desc: 'Disrupts food chains, nutrient cycles and ecological processes.',
    icon: <Network className="w-4 h-4 text-purple-400" />,
    color: '#a855f7',
    borderClass: 'impact-border-purple'
  },
  {
    id: 'loss-services',
    title: 'Loss of Ecosystem Services',
    desc: 'Affects clean air, water, food, climate regulation and human well-being.',
    icon: <Droplets className="w-4 h-4 text-cyan-400" />,
    color: '#06b6d4',
    borderClass: 'impact-border-cyan'
  }
];

const SPECIES_RISK_DATA = [
  { label: 'Critically Endangered', pct: 12, color: '#ef4444' },
  { label: 'Endangered', pct: 8, color: '#f97316' },
  { label: 'Vulnerable', pct: 8, color: '#eab308' },
  { label: 'Near Threatened', pct: 10, color: '#06b6d4' },
  { label: 'Least Concern', pct: 62, color: '#10b981' }
];

export function BioThreatsScreen({ onNavigateNext }: BioThreatsScreenProps) {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeThreatId, setActiveThreatId] = useState<string>('habitat-loss');
  const [selectedDetail, setSelectedDetail] = useState<ThreatModalDetail | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedDetail !== null, () => setSelectedDetail(null));

  const handleNextClick = () => {
    if (onNavigateNext) {
      onNavigateNext();
    } else {
      const el = document.getElementById('ch-conservation') || document.getElementById('ch-ecosystem');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <section className="bio-screen bio-threats-section" id="ch-threats">
      {/* Background Image Layer (Image 2) */}
      <div 
        className="bio-threats-bg" 
        style={{ backgroundImage: `url('/images/bio-threats-bg.jpg')` }}
      />
      
      {/* Ambient Vignette & Scrims */}
      <div className="bio-threats-vignette" />

      <div className="bio-threats-container">
        {/* ===================================================================
            TOP HERO ROW: Title Block (Left) | Crimson Quote Card (Right)
            =================================================================== */}
        <div className="bio-threats-hero-row">
          {/* Header Left */}
          <div className="bio-threats-hero-left">
            <div className="bio-threats-badge-pill">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 04</span>
            </div>
            
            <h1 className="bio-threats-title">
              Threats to <span className="bio-threats-title-highlight">Biodiversity</span>
            </h1>

            <h2 className="bio-threats-subtitle">
              Challenges to the Web of Life
            </h2>

            <p className="bio-threats-lead">
              Biodiversity is under serious threat due to human activities and natural factors. 
              These threats lead to habitat loss, species decline and ecosystem imbalance, 
              affecting the survival of life on Earth. Click on any threat or chart to explore detailed analysis.
            </p>
          </div>

          {/* Top Right Liquid-Glass Quote Card with Red Glow */}
          <div className="bio-threats-hero-right">
            <div className="bio-threats-quote-card">
              <span className="bio-threats-quote-mark">❝</span>
              <p className="bio-threats-quote-text">
                When we lose biodiversity, we do not just lose species — 
                we weaken the very systems that sustain life on Earth.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MIDDLE SECTION: Major Threats to Biodiversity (6 Cards Strip)
            =================================================================== */}
        <div className="bio-threats-major-panel">
          <div className="bio-threats-panel-heading">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3>Major Threats to Biodiversity (Click for in-depth analysis)</h3>
          </div>

          <div className="bio-threats-cards-strip">
            {THREATS_DATA.map((threat) => {
              const isActive = activeThreatId === threat.id;
              return (
                <div
                  key={threat.id}
                  className={`bio-threat-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveThreatId(threat.id);
                    setSelectedDetail(BIO_THREATS_MODAL_DETAILS[threat.id]);
                  }}
                  style={{ '--threat-accent': threat.color, cursor: 'pointer' } as React.CSSProperties}
                  title={`Click to view comprehensive case study on ${threat.title}`}
                >
                  {/* Top Badge & Title Row */}
                  <div className="bio-threat-card-top">
                    <span 
                      className="bio-threat-badge-num"
                      style={{ 
                        backgroundColor: `${threat.color}22`, 
                        borderColor: `${threat.color}66`,
                        color: threat.color 
                      }}
                    >
                      {threat.badge}
                    </span>
                    <h4 className="bio-threat-card-title">{threat.title}</h4>
                  </div>

                  {/* 16:9 Image Thumbnail */}
                  <div className="bio-threat-thumb-wrap">
                    <img 
                      src={threat.image} 
                      alt={threat.title} 
                      className="bio-threat-thumb-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/bio-threats-degraded.jpg';
                      }}
                    />
                    <div className="bio-threat-thumb-overlay" />
                    <div className="bio-card-click-hint">
                      <Maximize2 size={11} className="text-white/90" />
                      <span>Details</span>
                    </div>
                  </div>

                  {/* Bottom Icon & Description */}
                  <div className="bio-threat-card-bottom">
                    <div 
                      className="bio-threat-icon-box"
                      style={{ backgroundColor: `${threat.color}20`, borderColor: `${threat.color}45` }}
                    >
                      {threat.icon}
                    </div>
                    <p className="bio-threat-card-desc">{threat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            BOTTOM 3 PANELS: Impact (Left) | Species at Risk (Center) | Before vs After (Right)
            =================================================================== */}
        <div className="bio-threats-bottom-grid">
          {/* Panel 1: Impact on Biodiversity (~38%) */}
          <div className="bio-bottom-panel bio-impacts-panel">
            <div className="bio-threats-panel-heading">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <h3>Impact on Biodiversity</h3>
            </div>

            <div className="bio-impacts-subcards-row">
              {IMPACTS_DATA.map((impact) => (
                <div 
                  key={impact.id} 
                  className={`bio-impact-subcard ${impact.borderClass}`}
                  onClick={() => setSelectedDetail(BIO_THREATS_MODAL_DETAILS['impact-destruction'])}
                  style={{ cursor: 'pointer' }}
                  title="Click for Impact analysis"
                >
                  <div 
                    className="bio-impact-icon-circle"
                    style={{ backgroundColor: `${impact.color}22`, borderColor: `${impact.color}50` }}
                  >
                    {impact.icon}
                  </div>
                  <h4 className="bio-impact-title">{impact.title}</h4>
                  <p className="bio-impact-desc">{impact.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Species at Risk Donut Chart (~32%) */}
          <div 
            className="bio-bottom-panel bio-species-risk-panel"
            onClick={() => setSelectedDetail(BIO_THREATS_MODAL_DETAILS['species-risk-modal'])}
            style={{ cursor: 'pointer' }}
            title="Click to view IUCN Red List Categories & Species Analysis"
          >
            <div className="bio-threats-panel-heading">
              <PawPrint className="w-4 h-4 text-emerald-400" />
              <h3>Species at Risk (Click for IUCN)</h3>
            </div>

            <div className="bio-species-risk-body">
              {/* Donut Chart Visual */}
              <div className="bio-donut-chart-wrap">
                <svg className="bio-donut-svg" viewBox="0 0 100 100">
                  {/* Background track */}
                  <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                  
                  {/* Segment 1: Least Concern (62%) - offset 0 */}
                  <circle
                    cx="50" cy="50" r="38" fill="none"
                    stroke="#10b981" strokeWidth="12"
                    strokeDasharray="148 238.7"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Segment 2: Near Threatened (10%) */}
                  <circle
                    cx="50" cy="50" r="38" fill="none"
                    stroke="#06b6d4" strokeWidth="12"
                    strokeDasharray="23.8 238.7"
                    strokeDashoffset="-148"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Segment 3: Vulnerable (8%) */}
                  <circle
                    cx="50" cy="50" r="38" fill="none"
                    stroke="#eab308" strokeWidth="12"
                    strokeDasharray="19.1 238.7"
                    strokeDashoffset="-171.8"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Segment 4: Endangered (8%) */}
                  <circle
                    cx="50" cy="50" r="38" fill="none"
                    stroke="#f97316" strokeWidth="12"
                    strokeDasharray="19.1 238.7"
                    strokeDashoffset="-190.9"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Segment 5: Critically Endangered (12%) */}
                  <circle
                    cx="50" cy="50" r="38" fill="none"
                    stroke="#ef4444" strokeWidth="12"
                    strokeDasharray="28.6 238.7"
                    strokeDashoffset="-210"
                    transform="rotate(-90 50 50)"
                  />
                </svg>

                {/* Donut Center Label */}
                <div className="bio-donut-center-info">
                  <span className="bio-donut-center-pct">~28%</span>
                  <span className="bio-donut-center-sub">species at risk</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="bio-species-legend">
                {SPECIES_RISK_DATA.map((item, idx) => (
                  <div key={idx} className="bio-species-legend-row">
                    <span className="bio-legend-dot" style={{ backgroundColor: item.color }} />
                    <span className="bio-legend-label">{item.label}</span>
                    <span className="bio-legend-val">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Sub-Note */}
            <div className="bio-species-risk-note">
              <Info className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Thousands of species are facing extinction. Click to view IUCN Red List categories.</span>
            </div>
          </div>

          {/* Panel 3: Before vs After Interactive Slider (~30%) */}
          <div className="bio-bottom-panel bio-before-after-panel">
            <div className="bio-threats-panel-heading">
              <PawPrint className="w-4 h-4 text-emerald-400" />
              <h3>Before vs After (Drag slider)</h3>
            </div>

            <div 
              className="bio-compare-slider-box"
              ref={sliderRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* After: Degraded Habitat (Full background) */}
              <img 
                src="/images/bio-threats-degraded.jpg" 
                alt="Degraded Habitat" 
                className="bio-compare-img degraded-img"
              />

              {/* Before: Healthy Habitat (Clipped overlay) */}
              <div 
                className="bio-compare-clipped" 
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img 
                  src="/images/bio-threats-healthy.jpg" 
                  alt="Healthy Habitat" 
                  className="bio-compare-img healthy-img"
                />
              </div>

              {/* Slider Divider Bar with Drag Handle */}
              <div 
                className="bio-compare-handle" 
                style={{ left: `${sliderPos}%` }}
              >
                <div className="bio-compare-handle-line" />
                <div className="bio-compare-handle-circle">
                  <span>⟨ ⟩</span>
                </div>
              </div>

              {/* Floating Pill Badges */}
              <span className="bio-compare-badge badge-healthy">
                Healthy Habitat
              </span>
              <span className="bio-compare-badge badge-degraded">
                Degraded Habitat
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM ACTION BAR: Key Takeaway (Left) & Continue Button (Right)
            =================================================================== */}
        <div className="bio-threats-footer-bar">
          <div className="bio-threats-takeaway-left">
            <div className="bio-threats-takeaway-pill">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Key Takeaway</span>
            </div>
            <p className="bio-threats-takeaway-text">
              Human activities are the biggest threat to biodiversity. Addressing these threats is essential to ensure 
              the survival of species and the stability of ecosystems for future generations.
            </p>
          </div>

          <button 
            type="button" 
            className="bio-threats-next-btn"
            onClick={handleNextClick}
          >
            <span>Continue to Conservation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL: CHAPTER 04 THREATS TO BIODIVERSITY
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
                    Mechanisms & Ecological Impact
                  </h4>
                  <p className="bio-types-modal-text">{selectedDetail.definition}</p>
                </div>

                {/* Key Points */}
                <div className="bio-types-modal-section">
                  <h4>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Key Threats & Vulnerability Factors
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

                {/* Syllabus Benchmarks & Indian Case Studies */}
                <div className="bio-types-modal-section">
                  <h4>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Indian Case Studies (VTU BCV755B Syllabus)
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
                    <strong>Conservation Takeaway:</strong>
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

export default BioThreatsScreen;
