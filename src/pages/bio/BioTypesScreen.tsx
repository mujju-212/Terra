import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Leaf,
  Trees,
  Compass,
  ArrowRight,
  Droplets,
  Waves,
  Sun,
  Fish,
  Layers,
  GraduationCap,
  Sparkles,
  X,
  Info,
  CheckCircle2,
  Globe,
  Thermometer,
  CloudRain,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

interface BioTypesScreenProps {
  onNavigateNext?: () => void;
}

export interface EcosystemCard {
  id: string;
  title: string;
  image: string;
  bullets: string[];
}

export interface EcosystemTypeDetail {
  id: string;
  title: string;
  category: 'Terrestrial' | 'Aquatic' | 'Transitional';
  badgeTheme: 'emerald' | 'blue' | 'amber';
  subtitle: string;
  image: string;
  stats: {
    coverage: string;
    rainfallOrSalinity: string;
    soilOrDepth: string;
  };
  overview: string;
  producersFlora: string[];
  consumersFauna: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  decomposers: string;
  ecologicalServices: string[];
  vtuExamples: {
    indian: string[];
    global: string[];
  };
  keyFact: string;
}

export interface LakeZoneModalDetail {
  id: 'littoral' | 'limnetic' | 'profundal' | 'benthic';
  name: string;
  subtitle: string;
  color: string;
  depthAndLight: string;
  dominantFlora: string[];
  dominantFauna: string[];
  ecologicalRole: string;
  vtuKeyPoint: string;
}

export const ECOSYSTEM_DETAILS: Record<string, EcosystemTypeDetail> = {
  forest: {
    id: 'forest',
    title: 'Forest Ecosystems',
    category: 'Terrestrial',
    badgeTheme: 'emerald',
    subtitle: 'Dense Canopy, Multi-Tiered Stratification & Vital Carbon Sinks',
    image: '/images/bio-types-forest.jpg',
    stats: {
      coverage: '31% of World Land (~13,076M ha); ~19% in India',
      rainfallOrSalinity: '1,200 to >3,000 mm/year (High & humid)',
      soilOrDepth: 'Deep humus layer with acidic to neutral pH'
    },
    overview: 'Forest ecosystems represent the largest biomass repositories on land. Characterized by vertical stratification from the upper emergent canopy down to the forest floor, forests regulate global climate cycles, store monumental carbon volumes, prevent massive soil loss, and host more than 80% of terrestrial biodiversity.',
    producersFlora: [
      'Tectona grandis (Teak) & Shorea robusta (Sal)',
      'Pinus (Pine), Cedrus (Deodar), Picea (Spruce)',
      'Acer (Maple) & Betula (Birch) temperate trees',
      'Dense understory: epiphytes, lianas, ferns & ground mosses'
    ],
    consumersFauna: {
      primary: 'Elephants, spotted deer, barking deer, primates, canopy beetles & leaf-cutting ants',
      secondary: 'Chameleons, tree snakes, forest frogs, insectivorous birds & foxes',
      tertiary: 'Bengal Tiger (Panthera tigris), Leopard (Panthera pardus) & Asiatic Lion'
    },
    decomposers: 'Saprotrophic bacteria (Bacillus sp., Pseudomonas, Clostridium), fungi (Aspergillus sp., Ganoderma sp., Fusarium), and actinomycetes (Streptomyces) mineralizing leaf litter into humus.',
    ecologicalServices: [
      'Massive carbon sink buffering global greenhouse warming',
      'Groundwater aquifer recharge and rainfall cycle regulation',
      'Mitigates catastrophic flash floods and river siltation',
      'Provides vital timber, resins, wild fruits and Ayurvedic medicinal herbs'
    ],
    vtuExamples: {
      indian: ['Western Ghats Wet Evergreen Forests', 'Corbett & Bandipur Deciduous Forests', 'Sundarbans Mangrove Forest', 'Himalayan Pine & Deodar Belts'],
      global: ['Amazon River Basin Rainforest (South America)', 'Congo Basin Tropical Forest', 'Boreal Taiga Belt (Siberia & Canada)']
    },
    keyFact: 'Forests cover 31% of the Earth’s land area and provide critical environmental services including nutrient cycling, flood regulation, and soil erosion prevention (VTU Syllabus Part 7.1).'
  },
  desert: {
    id: 'desert',
    title: 'Desert Ecosystems',
    category: 'Terrestrial',
    badgeTheme: 'amber',
    subtitle: 'Extreme Aridity, Diurnal Temperature Swings & Specialized Xeric Adaptations',
    image: '/images/bio-types-desert.jpg',
    stats: {
      coverage: '~17% of Earth Land Area (~250 mm/yr limit)',
      rainfallOrSalinity: 'Scanty precipitation (< 250 mm/year)',
      soilOrDepth: 'Mineral-rich alkaline soils (low organic matter)'
    },
    overview: 'Deserts are landscapes receiving less than 250 mm of precipitation per year, characterized by scorching daytime temperatures and rapid radiative cooling at night. Life in desert ecosystems has evolved remarkable physiological, morphological, and behavioral adaptations to thrive in extreme water deficits.',
    producersFlora: [
      'Succulents & Cacti (Opuntia, Carnegiea) storing water with waxy cuticles',
      'Deep-rooted phreatophytes: Prosopis cineraria (Khejri) & Acacia senegal',
      'Drought-hardy xerophytic shrubs (Calotropis procera) & ephemeral grasses',
      'Cryptobiotic soil crusts, lichens and xerophytic mosses'
    ],
    consumersFauna: {
      primary: 'Dromedary camels (Camelus dromedarius), kangaroo rats, desert gerbils & locusts',
      secondary: 'Spiny-tailed lizards (Uromastyx), saw-scaled vipers, scorpions & horned owls',
      tertiary: 'Desert monitor lizards, caracals, desert foxes & raptors (falcons)'
    },
    decomposers: 'Sparse thermophilic (heat-loving) bacteria and drought-resistant actinomycetes that activate during rare episodic dew and rainfall events.',
    ecologicalServices: [
      'Houses drought-resilient wild genetic strains vital for dryland agriculture',
      'Vast natural solar irradiation and wind energy harvesting zones',
      'Mineral deposits: borax, lithium, gypsum and industrial salts',
      'Endemic xerophytic vegetation halts the spread of creeping desertification'
    ],
    vtuExamples: {
      indian: ['Thar Great Indian Desert (Rajasthan)', 'Cold Desert Biosphere Reserve (Spiti & Ladakh)'],
      global: ['Sahara Desert (North Africa)', 'Mojave & Sonoran Deserts (North America)', 'Atacama Desert (Chile)', 'Gobi Desert (Central Asia)']
    },
    keyFact: 'Deserts occupy 17% of the Earth’s surface, defined strictly by < 250 mm annual precipitation. Soils are rich in nutrients but critically deficient in organic carbon (VTU Syllabus Part 7.2).'
  },
  grassland: {
    id: 'grassland',
    title: 'Grassland Ecosystems',
    category: 'Terrestrial',
    badgeTheme: 'emerald',
    subtitle: 'Open Herbaceous Plains, Fire Ecology & Giant Herbivore Herds (Greenswards)',
    image: '/images/bio-types-grassland.jpg',
    stats: {
      coverage: '~24% of Earth Land Surface',
      rainfallOrSalinity: '250–750 mm/year (Seasonal rainfall)',
      soilOrDepth: 'Deep, dark, nutrient-rich Chernozem & Mollisol soils'
    },
    overview: 'Grasslands (Greenswards) occupy areas where rainfall is too low to support dense forests yet too high for desert conditions. Dominated by grasses and non-woody herbaceous plants, grasslands sustain the highest abundance and greatest diversity of large grazing mammals on Earth.',
    producersFlora: [
      'Brachiaria sp., Cynodon dactylon (Bermuda grass) & Digitaria',
      'Desmodium sp. and native drought-resistant leguminous herbs',
      'Themeda and Cenchrus tussock pasture grasses',
      'Scattered fire-resistant thorny Acacia and scrub thickets'
    ],
    consumersFauna: {
      primary: 'American Bison, African Wildebeest, Antelopes, Blackbuck, Indian Wild Ass (Khur) & Zebras',
      secondary: 'Jackals, grassland foxes, burrowing owls, monitor lizards & prairie snakes',
      tertiary: 'Lions, Cheetahs, Hyenas, and apex raptors (Hawks & Harriers)'
    },
    decomposers: 'Prolific soil saprotrophic bacteria, mycorrhizal fungi, and dung beetle assemblages rapidly recycling organic matter into fertile soil humus.',
    ecologicalServices: [
      'Huge below-ground carbon store (root networks safely isolate carbon from surface fires)',
      'Natural evolutionary ancestral cradle of cereal staples: wheat, corn, barley & millet',
      'Primary livestock grazing pastures supporting global dairy and pastoral economies',
      'Extensive fibrous root turf binds topsoil and prevents wind erosion'
    ],
    vtuExamples: {
      indian: ['Banni Grasslands of Kutch (Gujarat)', 'Shola Montane Grasslands (Nilgiris & Western Ghats)', 'Terai Duars Savanna (Himalayan foothills)'],
      global: ['Prairies (USA & Canada)', 'Pampas (Argentina & Uruguay)', 'Steppes (Eurasia — Russia & Ukraine)', 'Veldts & Savannas (Africa)']
    },
    keyFact: 'Grasslands cover 24% of the Earth’s surface. Because moisture is intermediate (25–75 cm/yr), trees cannot form closed canopies, allowing grasses to dominate (VTU Syllabus Part 7.3).'
  },
  freshwater: {
    id: 'freshwater',
    title: 'Freshwater Ecosystems',
    category: 'Aquatic',
    badgeTheme: 'blue',
    subtitle: 'Lotic Rivers, Lentic Lakes & Critical Inland Life Support Systems',
    image: '/images/bio-types-freshwater.jpg',
    stats: {
      coverage: '0.8% of Earth Surface; 0.009% of Total Water',
      rainfallOrSalinity: 'Salinity < 0.5 parts per thousand (ppt)',
      soilOrDepth: 'Lentic standing lakes & Lotic flowing streams'
    },
    overview: 'Despite occupying less than 1% of the Earth’s surface, freshwater ecosystems support 41% of all known fish species and provide life-sustaining resources for human civilisations. They are broadly divided into standing waters (Lentic: ponds, lakes) and moving waters (Lotic: streams, rivers).',
    producersFlora: [
      'Rooted & submerged macrophytes: Hydrilla verticillata, Vallisneria & Typha (Cattail)',
      'Free-floating macrophytes: Eichhornia, Lemna (Duckweed), Wolffia & Azolla',
      'Carnivorous water plants: Utricularia (Bladderwort)',
      'Phytoplankton & filamentous algae: Spirogyra, Ulothrix, Oedogonium & Diatoms'
    ],
    consumersFauna: {
      primary: 'Zooplankton (Daphnia, copepods, rotifers), freshwater snails & mayfly nymphs',
      secondary: 'Predatory water beetles, dragonfly larvae, minnows, frogs & small fishes',
      tertiary: 'Mahseer (Tor putitora), Catla, Rohu, Ganges River Dolphin & Otters'
    },
    decomposers: 'Benthic aquatic fungi, actinomycetes, and aerobic/anaerobic bacteria decomposing organic sediment across lake beds and river bottoms.',
    ecologicalServices: [
      'Primary global source of potable drinking water and agricultural irrigation',
      'Inland aquaculture and food security supporting millions of livelihoods',
      'Natural groundwater recharge, flood attenuation and sediment trapping',
      'Hydroelectric power generation and continental freshwater transport corridors'
    ],
    vtuExamples: {
      indian: ['Ganges & Brahmaputra River Basin', 'Dal Lake & Wular Lake (Jammu & Kashmir)', 'Narmada & Kaveri River Basins', 'Bhimtal & Nainital Lakes (Uttarakhand)'],
      global: ['Lake Baikal (Siberia — 20% of world unfrozen surface water)', 'Amazon River (South America)', 'Lake Victoria & Lake Tanganyika (East Africa)']
    },
    keyFact: 'Freshwater covers just 0.8% of Earth’s surface and holds 0.009% of its water, yet contains 41% of the world’s known fish species (VTU Syllabus Part 7.4).'
  },
  marine: {
    id: 'marine',
    title: 'Marine Ecosystems',
    category: 'Aquatic',
    badgeTheme: 'blue',
    subtitle: 'Global Oceans, Coral Reefs, Pelagic Zones & Oceanic Abyssal Trenches',
    image: '/images/bio-types-marine.jpg',
    stats: {
      coverage: '~71% of Earth Surface (~361 million sq km)',
      rainfallOrSalinity: 'Salinity ~35 parts per thousand (3.5% NaCl)',
      soilOrDepth: 'Average depth 3,700m (down to 11,000m Mariana Trench)'
    },
    overview: 'The marine ecosystem is the largest continuous biome on Earth, covering approximately 71% of the planet’s surface. It encompasses coastal coral reefs, open pelagic waters, and deep benthic abyssal plains. Marine phytoplankton generate over half of the oxygen in Earth’s atmosphere.',
    producersFlora: [
      'Microscopic phytoplankton: Diatoms, Dinoflagellates & Prochlorococcus cyanobacteria',
      'Marine macroalgae: Chlorophyceae (green), Phaeophyceae (kelp) & Rhodophyceae (red)',
      'Submerged marine angiosperms (Seagrasses): Zostera (Eelgrass) & Posidonia',
      'Coral endosymbionts: Photosynthetic Zooxanthellae living in reef-building polyps'
    ],
    consumersFauna: {
      primary: 'Zooplankton, Antarctic Krill (Euphausia superba), mollusks, copepods & sea urchins',
      secondary: 'Schooling carnivorous fish: Herring, Mackerel, Sardines, Squid & Flying Fish',
      tertiary: 'Apex pelagic predators: Great White Sharks, Bluefin Tuna, Orcas & Baleen Whales'
    },
    decomposers: 'Marine heterotrophic bacteria, marine fungi, and deep-sea barophilic piezophiles active across vast abyssal ooze sediment planes.',
    ecologicalServices: [
      'Drives the global oceanic conveyor belt and moderates planetary climate',
      'Marine Biological Pump: absorbs ~30% of anthropogenic atmospheric CO₂ emissions',
      'Primary source of animal protein for over 3 billion coastal residents worldwide',
      'Rich reserves of marine pharmaceuticals, bio-compounds and offshore renewable energy'
    ],
    vtuExamples: {
      indian: ['Arabian Sea & Bay of Bengal Waters', 'Gulf of Mannar Coral Biosphere Reserve', 'Lakshadweep Atolls & Andaman Coral Reefs'],
      global: ['Great Barrier Reef (Australia)', 'Pacific Ocean Pelagic Gyres', 'Mariana Trench (Deepest ocean floor at 10,994m)']
    },
    keyFact: 'Oceans cover 71% of Earth with an average salinity of 35 ppt. Oceanic phytoplankton generate more than 50% of the world’s atmospheric oxygen (VTU Syllabus Part 7.4.C).'
  },
  estuarine: {
    id: 'estuarine',
    title: 'Estuarine Ecosystems',
    category: 'Aquatic',
    badgeTheme: 'blue',
    subtitle: 'Tidal Mixing Zones, Brackish Ecotones & High-Productivity Coastal Nurseries',
    image: '/images/bio-types-estuary.jpg',
    stats: {
      coverage: 'Dynamic coastal ecotone interfaces worldwide',
      rainfallOrSalinity: 'Variable brackish salinity (0.5 to 30 ppt)',
      soilOrDepth: 'Nutrient-saturated tidal silt and organic mudflats'
    },
    overview: 'An estuary is a coastal body where freshwater from inland rivers mingles with oceanic saltwater. As a dynamic transitional ecotone, estuaries trap continental nutrients and exhibit extraordinarily high biological productivity, serving as irreplaceable nurseries for marine wildlife.',
    producersFlora: [
      'Mangrove trees: Rhizophora mucronata (stilt roots) & Avicennia (pneumatophores)',
      'Saltmarsh halophytic grasses: Spartina alterniflora (Cordgrass) & Salicornia',
      'Estuarine phytoplankton: Brackish diatoms, dinoflagellates & blue-green algae',
      'Benthic microalgal mats coating intertidal mudflats'
    ],
    consumersFauna: {
      primary: 'Detritivores: Fiddler crabs (Uca), mud crabs (Scylla serrata), shrimp postlarvae & bivalves',
      secondary: 'Mudskippers (Periophthalmus), mullet, juvenile sea bream & wading curlews',
      tertiary: 'Saltwater Crocodile (Crocodylus porosus), Royal Bengal Tiger & Brahminy Kites'
    },
    decomposers: 'Vigorous sulfate-reducing anaerobic bacteria and saprotrophic marine fungi decomposing tidal mangrove litter into detrital food chains.',
    ecologicalServices: [
      'Critical nursery habitat for >75% of commercially harvested marine seafood species',
      'Superb hydrodynamic storm surge, hurricane, and tsunami wave barrier',
      'Exceptional blue carbon sequestration in anaerobic waterlogged peat sediments',
      'Traps industrial sediments and land-based agrochemical runoff before reaching coral reefs'
    ],
    vtuExamples: {
      indian: ['Sundarbans Delta (West Bengal) — Largest mangrove delta on Earth', 'Chilika Lake Lagoon (Odisha) — Irrawaddy dolphin habitat', 'Zuari & Mandovi Estuaries (Goa)', 'Hooghly River Estuary'],
      global: ['Chesapeake Bay (USA — Largest North American estuary)', 'Thames Estuary (UK)', 'Amazon River Estuary (Brazil)']
    },
    keyFact: 'Estuaries are nutrient-rich transition zones where rivers meet the sea. Their variable brackish salinity and tidal churning make them among the most productive biomes on Earth (VTU Syllabus Part 7.5).'
  },
  wetland: {
    id: 'wetland',
    title: 'Wetland Ecosystems',
    category: 'Transitional',
    badgeTheme: 'emerald',
    subtitle: 'Kidneys of the Earth — Saturated Marshes, Peat Bogs, Swamps & Flood Sinks',
    image: '/images/bio-types-wetland.jpg',
    stats: {
      coverage: '~6% of Earth Land Area (Protected under Ramsar Convention)',
      rainfallOrSalinity: 'Permanently or seasonally water-inundated',
      soilOrDepth: 'Hydric soils with deep anaerobic carbon-rich peat'
    },
    overview: 'Wetlands are areas where the soil is saturated with water or inundated for part or all of the year. Known universally as the "Kidneys of the Earth", wetlands filter pollutants, prevent devastating floods, store massive volumes of carbon, and support extraordinary biodiversity.',
    producersFlora: [
      'Emergent hydrophytes: Typha latifolia (Cattails), Phragmites (Reeds) & Cyperus papyrus',
      'Floating hydrophytes: Nelumbo nucifera (Sacred Lotus) & Nymphaea (Water Lilies)',
      'Peat mosses: Sphagnum moss forming deep, acidic, carbon-sequestering peat bogs',
      'Woody wetland trees: Taxodium (Cypress) and wetland willows'
    ],
    consumersFauna: {
      primary: 'Amphipods, freshwater snails, tadpoles, water boatmen & migratory waterfowl (Teals, Geese)',
      secondary: 'Bullfrogs, salamanders, predatory diving beetles, Herons, Egrets & Bitterns',
      tertiary: 'Otters, Fishing Cats, Marsh Harriers, Osprey & Marsh Mugger Crocodiles'
    },
    decomposers: 'Anaerobic methanogens and denitrifying bacteria carrying out natural bio-filtration and nitrogen transformation in waterlogged hydric soils.',
    ecologicalServices: [
      'Kidneys of the Earth: natural biological filtration of nitrates, phosphorus and heavy metals',
      'Flood mitigation: a single acre of wetland can absorb over 1.5 million gallons of floodwater',
      'Unmatched carbon store: peatlands hold twice as much carbon as all global forests combined',
      'Vital staging and wintering sanctuaries for millions of migratory birds across global flyways'
    ],
    vtuExamples: {
      indian: ['Keoladeo Ghana National Park (Bharatpur, Rajasthan — Ramsar Site)', 'Loktak Lake (Manipur — Famous for floating Phumdis & Sangai deer)', 'Vembanad-Kol Wetland (Kerala — Largest Ramsar site in India)', 'Harike Wetland (Punjab)'],
      global: ['Pantanal (Brazil, Bolivia, Paraguay — World’s largest tropical wetland)', 'Florida Everglades (USA)', 'Okavango Delta (Botswana)']
    },
    keyFact: 'Wetlands act as natural filters and flood control buffers. Protected worldwide under the Ramsar Convention (1971), peat wetlands store twice the carbon of all global forests combined (VTU Syllabus Part 7.6).'
  }
};

export const LAKE_ZONE_DETAILS: Record<string, LakeZoneModalDetail> = {
  littoral: {
    id: 'littoral',
    name: 'Littoral Zone',
    subtitle: 'Shallow Shoreline Waters with High Sunlight Penetration',
    color: '#10b981',
    depthAndLight: 'Shallow marginal waters (0–2m depth) where solar radiation penetrates all the way to the lake bottom substrate.',
    dominantFlora: [
      'Rooted emergent macrophytes: Typha (Cattail) & Phragmites (Reeds)',
      'Submerged macrophytes: Hydrilla verticillata & Vallisneria spiralis',
      'Floating macrophytes: Nelumbo (Lotus) & Nymphaea (Water lily)',
      'Attached periphyton and filamentous green algae'
    ],
    dominantFauna: [
      'Tadpoles, aquatic snails, dragonfly nymphs & water striders',
      'Spawning juvenile fishes (Minnows, Sunfish & Carp fry)',
      'Wading herons, ducks and amphibious salamanders'
    ],
    ecologicalRole: 'Highest biological productivity of any lake zone. Serves as the primary spawning, breeding and shelter sanctuary for fish, amphibians, and waterfowl.',
    vtuKeyPoint: 'Littoral Zone: Shallow water zone near the shore with rooted vegetation and high light intensity (VTU Syllabus Part 7.4.B).'
  },
  limnetic: {
    id: 'limnetic',
    name: 'Limnetic Zone (Euphotic Zone)',
    subtitle: 'Open Water Column Down to Light Compensation Depth',
    color: '#06b6d4',
    depthAndLight: 'Open sunlit water column away from the shore, extending down to the light compensation depth where photosynthesis equals respiration.',
    dominantFlora: [
      'Microscopic phytoplankton: Diatoms, Dinoflagellates & Chlorophyta',
      'Floating colonial algae: Volvox & Microcystis',
      'Filamentous microalgae: Spirogyra & Ulothrix'
    ],
    dominantFauna: [
      'Herbivorous zooplankton: Daphnia (water fleas), rotifers & copepods',
      'Carnivorous plankton and insect larvae',
      'Active free-swimming nekton fish: Trout, Bass, Catla & Rohu'
    ],
    ecologicalRole: 'Drives primary production for the open-water lake food web. Generates dissolved oxygen during daylight hours that sustains all pelagic aquatic life.',
    vtuKeyPoint: 'Limnetic Zone: Open water zone where effective solar light penetration takes place, driving high photosynthetic productivity (VTU Syllabus Part 7.4.B).'
  },
  profundal: {
    id: 'profundal',
    name: 'Profundal Zone (Aphotic Zone)',
    subtitle: 'Deep, Cold Water Layer Below Sunlight Penetration',
    color: '#3b82f6',
    depthAndLight: 'Deep water zone below the compensation level; receives < 1% of surface solar radiation and is completely devoid of effective light for photosynthesis.',
    dominantFlora: [
      'No rooted plants or photosynthetic phytoplankton can survive due to insufficient photon flux density (darkness).'
    ],
    dominantFauna: [
      'Scavenger bottom-feeding fishes: Catfish, Sturgeon & Eels',
      'Specialized benthic larvae: Chironomid bloodworms and phantom midge larvae (Chaoborus)',
      'Oligochaete worms tolerant of low dissolved oxygen'
    ],
    ecologicalRole: 'Heterotrophic respiration zone. Organic matter sinking from the limnetic zone is consumed here, resulting in lower dissolved oxygen and colder temperatures.',
    vtuKeyPoint: 'Profundal Zone: Deep water zone where light penetration is negligible, leading to zero photosynthesis and little biological productivity (VTU Syllabus Part 7.4.B).'
  },
  benthic: {
    id: 'benthic',
    name: 'Benthic Zone',
    subtitle: 'Bottom Sediment Layer & Lake Decomposition Furnace',
    color: '#f97316',
    depthAndLight: 'The entire lake floor substrate, composed of accumulated fine silt, mineral mud, and decaying organic detritus.',
    dominantFlora: [
      'Generally devoid of photosynthetic plants except in extreme shallow littoral fringes.'
    ],
    dominantFauna: [
      'Benthic detritivores: Tubifex sludge worms, freshwater clams & mussels',
      'Chironomid midge larvae and burrowing nematodes',
      'Bottom-dwelling crawlers and scavenger snails'
    ],
    ecologicalRole: 'Essential nutrient recycling engine. Microorganisms decompose organic corpses sinking from upper layers, liberating nitrates and phosphates back into water.',
    vtuKeyPoint: 'Benthic Zone: Lake bottom sediment occupied by decomposer microorganisms and benthic detritivores that regenerate vital nutrients (VTU Syllabus Part 7.4.B).'
  }
};

const TERRESTRIAL_CARDS: EcosystemCard[] = [
  {
    id: 'forest',
    title: 'Forest Ecosystems',
    image: '/images/bio-types-forest.jpg',
    bullets: ['High rainfall', 'Dense vegetation', 'High biodiversity']
  },
  {
    id: 'desert',
    title: 'Desert Ecosystems',
    image: '/images/bio-types-desert.jpg',
    bullets: ['Low rainfall', 'Extreme temperatures', 'Drought-resistant species']
  },
  {
    id: 'grassland',
    title: 'Grassland Ecosystems',
    image: '/images/bio-types-grassland.jpg',
    bullets: ['Moderate rainfall', 'Grasses dominate', 'Large herbivores']
  }
];

const AQUATIC_CARDS: EcosystemCard[] = [
  {
    id: 'freshwater',
    title: 'Freshwater Ecosystems',
    image: '/images/bio-types-freshwater.jpg',
    bullets: ['Rivers, lakes, ponds', 'Low salinity (< 0.5 ppt)', 'Diverse aquatic life']
  },
  {
    id: 'marine',
    title: 'Marine Ecosystems',
    image: '/images/bio-types-marine.jpg',
    bullets: ['Oceans and seas', 'High salinity (~35 ppt)', 'Rich marine biodiversity']
  },
  {
    id: 'estuarine',
    title: 'Estuarine Ecosystems',
    image: '/images/bio-types-estuary.jpg',
    bullets: ['Mix of fresh and salt water', 'Nutrient-rich', 'High productivity']
  }
];

const WETLAND_BULLETS = [
  'Includes marshes, swamps, bogs and mangroves',
  'Acts as a natural filter',
  'Supports high biodiversity',
  'Controls floods and prevents erosion'
];

interface LakeZone {
  id: 'littoral' | 'limnetic' | 'profundal' | 'benthic';
  name: string;
  shortDesc: string;
  legendDesc: string;
  color: string;
}

const LAKE_ZONES: LakeZone[] = [
  {
    id: 'littoral',
    name: 'Littoral Zone',
    shortDesc: '(shallow water, high light)',
    legendDesc: '- near shore, rooted plants',
    color: '#10b981'
  },
  {
    id: 'limnetic',
    name: 'Limnetic Zone',
    shortDesc: '(open water, sunlight)',
    legendDesc: '- open water, photosynthesis',
    color: '#06b6d4'
  },
  {
    id: 'profundal',
    name: 'Profundal Zone',
    shortDesc: '(deep water, low light)',
    legendDesc: '- deep, low light, low productivity',
    color: '#3b82f6'
  },
  {
    id: 'benthic',
    name: 'Benthic Zone',
    shortDesc: '(bottom, decomposers)',
    legendDesc: '- lake bottom, decomposers',
    color: '#f97316'
  }
];

export function BioTypesScreen({ onNavigateNext }: BioTypesScreenProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [selectedEcosystem, setSelectedEcosystem] = useState<EcosystemTypeDetail | null>(null);
  const [selectedLakeZone, setSelectedLakeZone] = useState<LakeZoneModalDetail | null>(null);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedEcosystem !== null || selectedLakeZone !== null, () => {
    setSelectedEcosystem(null);
    setSelectedLakeZone(null);
  });

  const handleNextClick = () => {
    if (onNavigateNext) {
      onNavigateNext();
    } else {
      const el = document.getElementById('ch-significance') || document.getElementById('ch-economic');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bio-screen bio-types-section" id="ch-types">
      {/* Background Image Layer */}
      <div 
        className="bio-types-bg" 
        style={{ backgroundImage: `url('/images/bio-types-bg.jpg')` }}
      />
      
      {/* Ambient Vignette & Darkening Scrims */}
      <div className="bio-types-vignette" />

      <div className="bio-types-container">
        {/* ===================================================================
            TOP HERO ROW: Title Block (Left) + Panoramic Callouts (Right)
            =================================================================== */}
        <div className="bio-types-hero-row">
          <div className="bio-types-hero-left">
            <div className="bio-types-badge-pill">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 08</span>
            </div>

            <h1 className="bio-types-title">
              Types of <span className="bio-types-title-highlight">Ecosystems</span>
            </h1>

            <h2 className="bio-types-subtitle">
              Diverse Habitats, Unique Life
            </h2>

            <p className="bio-types-lead">
              Ecosystems can be broadly classified into terrestrial and aquatic types, each with unique climatic 
              conditions, organisms and ecological processes. Different ecosystems support different kinds of 
              biodiversity and provide essential services for life on Earth.
            </p>
          </div>

          {/* Interactive Landscape Feature Callouts */}
          <div className="bio-types-hero-callouts">
            {/* Terrestrial Callout Pill (Left) */}
            <div className="bio-types-callout terrestrial">
              <div className="bio-callout-pill">
                <span className="bio-callout-title">Terrestrial Ecosystems</span>
                <span className="bio-callout-sub">(on land)</span>
              </div>
              <div className="bio-callout-stem">
                <span className="bio-callout-dot pulse-green" />
              </div>
            </div>

            {/* Aquatic Callout Pill (Right) */}
            <div className="bio-types-callout aquatic">
              <div className="bio-callout-pill blue">
                <span className="bio-callout-title">Aquatic Ecosystems</span>
                <span className="bio-callout-sub">(in water)</span>
              </div>
              <div className="bio-callout-stem">
                <span className="bio-callout-dot pulse-blue" />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MIDDLE 2-PANEL ROW: Terrestrial Ecosystems (1) | Aquatic Ecosystems (2)
            =================================================================== */}
        <div className="bio-types-split-grid">
          {/* ─────────────────────────────────────────────────────────────
              PANEL 1: TERRESTRIAL ECOSYSTEMS
              ───────────────────────────────────────────────────────────── */}
          <div className="bio-types-panel terrestrial-panel">
            <div className="bio-types-panel-header">
              <div className="bio-types-num-circle green">1</div>
              <div className="bio-types-header-info">
                <h3 className="bio-types-panel-title">Terrestrial Ecosystems</h3>
                <p className="bio-types-panel-desc">
                  Major land-based ecosystems with distinct climate, vegetation and wildlife. Click any card for in-depth details.
                </p>
              </div>
            </div>

            <div className="bio-types-cards-grid">
              {TERRESTRIAL_CARDS.map((card) => {
                const detail = ECOSYSTEM_DETAILS[card.id];
                return (
                  <div 
                    key={card.id} 
                    className={`bio-ecosystem-card ${selectedEcosystem?.id === card.id ? 'is-selected' : ''}`}
                    onClick={() => setSelectedEcosystem(detail)}
                    title={`Click to view detailed analysis of ${card.title}`}
                  >
                    <div className="bio-ecosystem-thumb-wrap">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="bio-ecosystem-thumb-img" 
                        loading="lazy"
                      />
                      <div className="bio-ecosystem-thumb-overlay" />
                      <div className="bio-card-click-hint">
                        <Maximize2 className="w-3 h-3 text-white/90" />
                        <span>Click for details</span>
                      </div>
                    </div>
                    <div className="bio-ecosystem-card-body">
                      <div className="bio-ecosystem-title-row">
                        <h4 className="bio-ecosystem-card-title">{card.title}</h4>
                        <button 
                          type="button" 
                          className="bio-ecosystem-arrow-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEcosystem(detail);
                          }}
                          aria-label={`Explore ${card.title}`}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <ul className="bio-ecosystem-bullet-list">
                        {card.bullets.map((bullet, idx) => (
                          <li key={idx} className="bio-ecosystem-bullet-item">
                            <span className="bullet-dot" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              PANEL 2: AQUATIC ECOSYSTEMS
              ───────────────────────────────────────────────────────────── */}
          <div className="bio-types-panel aquatic-panel">
            <div className="bio-types-panel-header">
              <div className="bio-types-num-circle blue">2</div>
              <div className="bio-types-header-info">
                <h3 className="bio-types-panel-title">Aquatic Ecosystems</h3>
                <p className="bio-types-panel-desc">
                  Water-based ecosystems with unique physical and biological characteristics. Click any card for in-depth details.
                </p>
              </div>
            </div>

            <div className="bio-types-cards-grid">
              {AQUATIC_CARDS.map((card) => {
                const detail = ECOSYSTEM_DETAILS[card.id];
                return (
                  <div 
                    key={card.id} 
                    className={`bio-ecosystem-card blue-card ${selectedEcosystem?.id === card.id ? 'is-selected' : ''}`}
                    onClick={() => setSelectedEcosystem(detail)}
                    title={`Click to view detailed analysis of ${card.title}`}
                  >
                    <div className="bio-ecosystem-thumb-wrap">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="bio-ecosystem-thumb-img" 
                        loading="lazy"
                      />
                      <div className="bio-ecosystem-thumb-overlay blue-tint" />
                      <div className="bio-card-click-hint">
                        <Maximize2 className="w-3 h-3 text-white/90" />
                        <span>Click for details</span>
                      </div>
                    </div>
                    <div className="bio-ecosystem-card-body">
                      <div className="bio-ecosystem-title-row">
                        <h4 className="bio-ecosystem-card-title">{card.title}</h4>
                        <button 
                          type="button" 
                          className="bio-ecosystem-arrow-btn blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEcosystem(detail);
                          }}
                          aria-label={`Explore ${card.title}`}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <ul className="bio-ecosystem-bullet-list">
                        {card.bullets.map((bullet, idx) => (
                          <li key={idx} className="bio-ecosystem-bullet-item">
                            <span className="bullet-dot blue" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================================
            LOWER 2-PANEL ROW: Wetland Ecosystems (3) | Zones in a Lake (4)
            =================================================================== */}
        <div className="bio-types-lower-grid">
          {/* ─────────────────────────────────────────────────────────────
              PANEL 3: WETLAND ECOSYSTEMS (38%)
              ───────────────────────────────────────────────────────────── */}
          <div className="bio-types-panel wetland-panel">
            <div className="bio-types-panel-header">
              <div className="bio-types-num-circle green">3</div>
              <h3 className="bio-types-panel-title">Wetland Ecosystems</h3>
            </div>

            <div 
              className={`bio-wetland-card-layout is-interactive ${selectedEcosystem?.id === 'wetland' ? 'is-selected' : ''}`}
              onClick={() => setSelectedEcosystem(ECOSYSTEM_DETAILS['wetland'])}
              title="Click to view detailed analysis of Wetland Ecosystems"
            >
              <div className="bio-wetland-img-wrap">
                <img 
                  src="/images/bio-types-wetland.jpg" 
                  alt="Wetland Ecosystem" 
                  className="bio-wetland-img"
                  loading="lazy"
                />
                <div className="bio-wetland-img-scrim" />
                <div className="bio-card-click-hint">
                  <Maximize2 className="w-3 h-3 text-white/90" />
                  <span>Click for details</span>
                </div>
              </div>

              <div className="bio-wetland-info-col">
                <ul className="bio-wetland-bullets">
                  {WETLAND_BULLETS.map((bullet, idx) => (
                    <li key={idx} className="bio-wetland-item">
                      <span className="bullet-dot" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  type="button" 
                  className="bio-ecosystem-arrow-btn bottom-right"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEcosystem(ECOSYSTEM_DETAILS['wetland']);
                  }}
                  aria-label="Learn more about Wetlands"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              PANEL 4: ZONES IN A LAKE (AQUATIC ECOSYSTEM) (62%)
              ───────────────────────────────────────────────────────────── */}
          <div className="bio-types-panel lake-panel">
            <div className="bio-types-panel-header">
              <div className="bio-types-num-circle blue">4</div>
              <h3 className="bio-types-panel-title">Zones in a Lake <span className="title-muted">(Aquatic Ecosystem)</span></h3>
            </div>

            <div className="bio-lake-diagram-wrapper">
              {/* Lake Cross-Section Graphical Stage */}
              <div className="bio-lake-stage">
                {/* SVG Stratification / Light & Organisms Diagram */}
                <svg className="bio-lake-svg" viewBox="0 0 700 220" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lakeWaterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e88e5" stopOpacity="0.45" />
                      <stop offset="45%" stopColor="#0d47a1" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#041228" stopOpacity="0.95" />
                    </linearGradient>

                    <linearGradient id="littoralGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
                    </linearGradient>

                    <linearGradient id="benthicGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#78350f" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3d1a04" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  {/* Sky/Surface Line */}
                  <line x1="0" y1="20" x2="700" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Water Volume Body */}
                  <polygon points="0,20 700,20 700,180 500,200 0,140" fill="url(#lakeWaterGrad)" />

                  {/* Littoral Shallows Area (Left) */}
                  <polygon points="0,20 200,20 220,150 0,140" fill="url(#littoralGrad)" />

                  {/* Lakebed / Benthic Sediment Layer */}
                  <path 
                    d="M 0,140 Q 150,150 300,180 T 700,180 L 700,220 L 0,220 Z" 
                    fill="url(#benthicGrad)" 
                  />

                  {/* Shoreline reeds and rooted plants on left (Littoral) */}
                  <path d="M 25,140 Q 20,80 30,35" stroke="#34d399" strokeWidth="2.5" fill="none" />
                  <path d="M 40,145 Q 45,75 35,28" stroke="#10b981" strokeWidth="2.8" fill="none" />
                  <path d="M 55,148 Q 65,90 50,40" stroke="#059669" strokeWidth="2.2" fill="none" />
                  <path d="M 75,152 Q 70,105 85,55" stroke="#34d399" strokeWidth="2.2" fill="none" />
                  <path d="M 95,155 Q 110,115 100,75" stroke="#10b981" strokeWidth="2" fill="none" />

                  {/* Swimming fish in Limnetic Zone */}
                  <g transform="translate(340, 70) scale(0.6)">
                    <path d="M0,0 Q15,-10 30,0 Q15,10 0,0 M30,0 L42,-8 L38,0 L42,8 Z" fill="#67e8f9" />
                  </g>
                  <g transform="translate(380, 95) scale(0.5)">
                    <path d="M0,0 Q15,-10 30,0 Q15,10 0,0 M30,0 L42,-8 L38,0 L42,8 Z" fill="#38bdf8" />
                  </g>

                  {/* Zone Boundaries Dotted Lines */}
                  <line x1="200" y1="20" x2="200" y2="160" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
                  <line x1="480" y1="20" x2="480" y2="185" stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
                  <line x1="200" y1="120" x2="700" y2="120" stroke="rgba(255,255,255,0.18)" strokeDasharray="3 3" />
                </svg>

                {/* Overlay Interactive Zone Labels */}
                <div 
                  className={`bio-lake-zone-label littoral ${activeZone === 'littoral' ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveZone('littoral')}
                  onMouseLeave={() => setActiveZone(null)}
                  onClick={() => setSelectedLakeZone(LAKE_ZONE_DETAILS['littoral'])}
                  title="Click to view Littoral Zone details"
                >
                  <span className="zone-name">Littoral Zone</span>
                  <span className="zone-sub">(shallow water, high light)</span>
                </div>

                <div 
                  className={`bio-lake-zone-label limnetic ${activeZone === 'limnetic' ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveZone('limnetic')}
                  onMouseLeave={() => setActiveZone(null)}
                  onClick={() => setSelectedLakeZone(LAKE_ZONE_DETAILS['limnetic'])}
                  title="Click to view Limnetic Zone details"
                >
                  <span className="zone-name">Limnetic Zone</span>
                  <span className="zone-sub">(open water, sunlight)</span>
                </div>

                <div 
                  className={`bio-lake-zone-label profundal ${activeZone === 'profundal' ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveZone('profundal')}
                  onMouseLeave={() => setActiveZone(null)}
                  onClick={() => setSelectedLakeZone(LAKE_ZONE_DETAILS['profundal'])}
                  title="Click to view Profundal Zone details"
                >
                  <span className="zone-name">Profundal Zone</span>
                  <span className="zone-sub">(deep water, low light)</span>
                </div>

                <div 
                  className={`bio-lake-zone-label benthic ${activeZone === 'benthic' ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveZone('benthic')}
                  onMouseLeave={() => setActiveZone(null)}
                  onClick={() => setSelectedLakeZone(LAKE_ZONE_DETAILS['benthic'])}
                  title="Click to view Benthic Zone details"
                >
                  <span className="zone-pill-benthic">
                    <span className="zone-name">Benthic Zone</span>
                    <span className="zone-sub">(bottom, decomposers)</span>
                  </span>
                </div>
              </div>

              {/* Lake Legend Column on Right */}
              <div className="bio-lake-legend-col">
                {LAKE_ZONES.map((zone) => {
                  const isActive = activeZone === zone.id;
                  return (
                    <div 
                      key={zone.id} 
                      className={`bio-lake-legend-item ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveZone(zone.id)}
                      onMouseLeave={() => setActiveZone(null)}
                      onClick={() => setSelectedLakeZone(LAKE_ZONE_DETAILS[zone.id])}
                      title={`Click for ${zone.name} in-depth limnology`}
                    >
                      <span 
                        className="legend-dot"
                        style={{ backgroundColor: zone.color, boxShadow: isActive ? `0 0 10px ${zone.color}` : 'none' }}
                      />
                      <div className="legend-text">
                        <span className="legend-title" style={{ color: isActive ? '#ffffff' : undefined }}>{zone.name}</span>
                        <span className="legend-desc">{zone.legendDesc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM SECTION: Key Takeaways Bar & Continue Button
            =================================================================== */}
        <div className="bio-types-footer-bar">
          <div className="bio-types-takeaways-block">
            <div className="bio-types-takeaways-heading">
              <div className="bio-takeaway-cap-circle">
                <GraduationCap className="w-4 h-4 text-emerald-300" />
              </div>
              <span>Key Takeaways</span>
            </div>

            <div className="bio-types-pills-row">
              <div className="bio-types-takeaway-chip">
                <div className="bio-chip-icon-circle green">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="bio-chip-text">
                  Ecosystems vary by climate, water availability, vegetation and organisms.
                </p>
              </div>

              <div className="bio-types-takeaway-chip">
                <div className="bio-chip-icon-circle cyan">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="bio-chip-text">
                  Terrestrial: forests, deserts, grasslands.
                </p>
              </div>

              <div className="bio-types-takeaway-chip">
                <div className="bio-chip-icon-circle blue">
                  <Waves className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <p className="bio-chip-text">
                  Aquatic: freshwater, marine, estuarine, wetlands.
                </p>
              </div>

              <div className="bio-types-takeaway-chip">
                <div className="bio-chip-icon-circle emerald">
                  <Trees className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="bio-chip-text">
                  Each ecosystem has unique biodiversity and ecological processes.
                </p>
              </div>

              <div className="bio-types-mini-landscape">
                <img 
                  src="/images/bio-types-bg.jpg" 
                  alt="Ecosystems Landscape" 
                  className="bio-mini-thumb"
                />
              </div>
            </div>
          </div>

          <button 
            type="button" 
            className="bio-types-next-btn"
            onClick={handleNextClick}
          >
            <span>Continue to Ecosystem Significance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL: ECOSYSTEM TYPES
          =================================================================== */}
      <AnimatePresence>
        {selectedEcosystem && (
          <div 
            className="bio-types-modal-backdrop" 
            data-lenis-prevent
            onClick={() => setSelectedEcosystem(null)}
          >
            <motion.div
              className={`bio-types-modal-card ${selectedEcosystem.badgeTheme}-theme`}
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
                  src={selectedEcosystem.image} 
                  alt={selectedEcosystem.title} 
                  className="bio-types-modal-hero-img" 
                />
                <div className="bio-types-modal-hero-scrim" />

                {/* Close Button */}
                <button
                  type="button"
                  className="bio-types-modal-close-btn"
                  onClick={() => setSelectedEcosystem(null)}
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Category Badge */}
                <div className="bio-types-modal-category-row">
                  <span className={`bio-types-modal-cat-pill ${selectedEcosystem.badgeTheme}`}>
                    {selectedEcosystem.category.toUpperCase()} ECOSYSTEM
                  </span>
                </div>

                {/* Hero Title & Subtitle */}
                <div className="bio-types-modal-title-box">
                  <h2>{selectedEcosystem.title}</h2>
                  <p>{selectedEcosystem.subtitle}</p>
                </div>
              </div>

              {/* Modal Body Scroll Container */}
              <div className="bio-types-modal-body" data-lenis-prevent>
                {/* Quick Stats Grid */}
                <div className="bio-types-stats-grid">
                  <div className="bio-types-stat-cell">
                    <span className="stat-label">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      Global Cover
                    </span>
                    <span className="stat-val">{selectedEcosystem.stats.coverage}</span>
                  </div>
                  <div className="bio-types-stat-cell">
                    <span className="stat-label">
                      <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                      Precipitation / Water
                    </span>
                    <span className="stat-val">{selectedEcosystem.stats.rainfallOrSalinity}</span>
                  </div>
                  <div className="bio-types-stat-cell">
                    <span className="stat-label">
                      <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                      Substrate / Chemistry
                    </span>
                    <span className="stat-val">{selectedEcosystem.stats.soilOrDepth}</span>
                  </div>
                </div>

                {/* Overview Section */}
                <div className="bio-types-modal-section">
                  <h4>
                    <Info className="w-3.5 h-3.5" />
                    Ecosystem Overview
                  </h4>
                  <p className="bio-types-modal-text">{selectedEcosystem.overview}</p>
                </div>

                {/* Biotic Structure (Producers & Consumers & Decomposers) */}
                <div className="bio-types-modal-section">
                  <h4>
                    <Leaf className="w-3.5 h-3.5" />
                    Biotic Components (VTU BCV755B Syllabus)
                  </h4>
                  
                  <div className="bio-types-biotic-grid">
                    {/* Producers */}
                    <div className="bio-types-biotic-card">
                      <div className="biotic-card-header">
                        <Trees className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Producers (Flora)</span>
                      </div>
                      <ul className="biotic-item-list">
                        {selectedEcosystem.producersFlora.map((p, idx) => (
                          <li key={idx}>
                            <span className="bullet-dot" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Consumers */}
                    <div className="bio-types-biotic-card">
                      <div className="biotic-card-header">
                        <Fish className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Consumers (Fauna Tiers)</span>
                      </div>
                      <div className="biotic-tiers">
                        <div className="tier-row">
                          <span className="tier-badge primary">Primary</span>
                          <span className="tier-desc">{selectedEcosystem.consumersFauna.primary}</span>
                        </div>
                        <div className="tier-row">
                          <span className="tier-badge secondary">Secondary</span>
                          <span className="tier-desc">{selectedEcosystem.consumersFauna.secondary}</span>
                        </div>
                        <div className="tier-row">
                          <span className="tier-badge tertiary">Tertiary</span>
                          <span className="tier-desc">{selectedEcosystem.consumersFauna.tertiary}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decomposers Bar */}
                  <div className="bio-types-decomposer-bar">
                    <span className="decomposer-title">Decomposers:</span>
                    <span className="decomposer-desc">{selectedEcosystem.decomposers}</span>
                  </div>
                </div>

                {/* Ecological Services */}
                <div className="bio-types-modal-section">
                  <h4>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Key Ecological & Environmental Services
                  </h4>
                  <div className="bio-types-services-wrap">
                    {selectedEcosystem.ecologicalServices.map((service, idx) => (
                      <div key={idx} className="bio-types-service-pill">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus Examples (Indian & Global) */}
                <div className="bio-types-modal-section">
                  <h4>
                    <Globe className="w-3.5 h-3.5" />
                    Curriculum Benchmarks & Real-World Examples
                  </h4>
                  <div className="bio-types-examples-grid">
                    <div className="example-group">
                      <span className="example-group-title">🇮🇳 Indian Ecosystems:</span>
                      <div className="example-tags">
                        {selectedEcosystem.vtuExamples.indian.map((ex, idx) => (
                          <span key={idx} className="example-tag-pill indian">{ex}</span>
                        ))}
                      </div>
                    </div>
                    <div className="example-group">
                      <span className="example-group-title">🌍 Global Ecosystems:</span>
                      <div className="example-tags">
                        {selectedEcosystem.vtuExamples.global.map((ex, idx) => (
                          <span key={idx} className="example-tag-pill global">{ex}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scientific Key Takeaway Callout */}
                <div className="bio-types-modal-takeaway-box">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Scientific & Exam Takeaway:</strong>
                    <p>{selectedEcosystem.keyFact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL: LAKE ZONES (LIMNOLOGY)
          =================================================================== */}
      <AnimatePresence>
        {selectedLakeZone && (
          <div 
            className="bio-types-modal-backdrop" 
            data-lenis-prevent
            onClick={() => setSelectedLakeZone(null)}
          >
            <motion.div
              className="bio-types-modal-card blue-theme lake-zone-modal"
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bio-types-modal-hero lake-hero">
                <img 
                  src="/images/bio-types-freshwater.jpg" 
                  alt={selectedLakeZone.name} 
                  className="bio-types-modal-hero-img" 
                />
                <div className="bio-types-modal-hero-scrim" />

                <button
                  type="button"
                  className="bio-types-modal-close-btn"
                  onClick={() => setSelectedLakeZone(null)}
                  aria-label="Close zone details"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="bio-types-modal-category-row">
                  <span 
                    className="bio-types-modal-cat-pill"
                    style={{ backgroundColor: `${selectedLakeZone.color}33`, borderColor: selectedLakeZone.color, color: '#ffffff' }}
                  >
                    LAKE ZONATION · AQUATIC ECOSYSTEM
                  </span>
                </div>

                <div className="bio-types-modal-title-box">
                  <h2>{selectedLakeZone.name}</h2>
                  <p>{selectedLakeZone.subtitle}</p>
                </div>
              </div>

              <div className="bio-types-modal-body" data-lenis-prevent>
                <div className="bio-types-stat-cell full-width">
                  <span className="stat-label">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    Depth & Solar Light Penetration
                  </span>
                  <span className="stat-val">{selectedLakeZone.depthAndLight}</span>
                </div>

                <div className="bio-types-modal-section">
                  <h4>
                    <Info className="w-3.5 h-3.5" />
                    Limnological Role & Biological Productivity
                  </h4>
                  <p className="bio-types-modal-text">{selectedLakeZone.ecologicalRole}</p>
                </div>

                <div className="bio-types-biotic-grid">
                  <div className="bio-types-biotic-card">
                    <div className="biotic-card-header">
                      <Trees className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Dominant Flora & Phytoplankton</span>
                    </div>
                    <ul className="biotic-item-list">
                      {selectedLakeZone.dominantFlora.map((fl, idx) => (
                        <li key={idx}>
                          <span className="bullet-dot" />
                          <span>{fl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bio-types-biotic-card">
                    <div className="biotic-card-header">
                      <Fish className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Characteristic Fauna & Nekton</span>
                    </div>
                    <ul className="biotic-item-list">
                      {selectedLakeZone.dominantFauna.map((fa, idx) => (
                        <li key={idx}>
                          <span className="bullet-dot blue" />
                          <span>{fa}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bio-types-modal-takeaway-box">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>VTU Syllabus Key Point:</strong>
                    <p>{selectedLakeZone.vtuKeyPoint}</p>
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

export default BioTypesScreen;
