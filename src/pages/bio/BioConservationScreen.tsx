import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Trees,
  FlaskConical,
  Landmark,
  CheckCircle2,
  MapPin,
  Settings,
  Globe,
  Users,
  ArrowRight,
  ShieldCheck,
  Building2,
  Dna,
  Lightbulb,
  X,
  Info,
  Sparkles,
  AlertTriangle,
  Maximize2
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

interface BioConservationScreenProps {
  onNavigateNext?: () => void;
}

export interface ConservationModalDetail {
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

interface InSituExample {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface ExSituExample {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const IN_SITU_EXAMPLES: InSituExample[] = [
  {
    id: 'insitu-national-parks',
    title: 'National Parks',
    subtitle: 'e.g., Jim Corbett National Park',
    image: '/images/bio-insitu-national-parks.jpg'
  },
  {
    id: 'insitu-wildlife-sanctuaries',
    title: 'Wildlife Sanctuaries',
    subtitle: 'e.g., Periyar Wildlife Sanctuary',
    image: '/images/bio-insitu-sanctuaries.jpg'
  },
  {
    id: 'insitu-biosphere-reserves',
    title: 'Biosphere Reserves',
    subtitle: 'e.g., Nilgiri Biosphere Reserve',
    image: '/images/bio-insitu-biosphere.jpg'
  },
  {
    id: 'insitu-marine',
    title: 'Marine Protected Areas',
    subtitle: 'e.g., Gulf of Mannar Marine National Park',
    image: '/images/bio-insitu-marine.jpg'
  }
];

const EX_SITU_SHOWCASE = [
  { id: 'exsitu-botanical', label: 'Botanical Gardens', image: '/images/bio-exsitu-botanical-show.jpg', colorClass: 'green' },
  { id: 'exsitu-zoos', label: 'Zoos', image: '/images/bio-exsitu-zoo-show.jpg', colorClass: 'amber' },
  { id: 'exsitu-seedbanks', label: 'Seed Banks', image: '/images/bio-exsitu-seed-show.jpg', colorClass: 'blue' },
  { id: 'exsitu-tissue', label: 'Tissue Culture', image: '/images/bio-exsitu-tissue-show.jpg', colorClass: 'purple' }
];

const EX_SITU_EXAMPLES: ExSituExample[] = [
  {
    id: 'exsitu-zoos',
    title: 'Zoos & Captive Breeding',
    desc: 'Breeding and protection of animals in simulated habitats',
    image: '/images/bio-exsitu-zoos.jpg'
  },
  {
    id: 'exsitu-botanical',
    title: 'Botanical Gardens',
    desc: 'Conservation of rare and endangered plant taxa outside native wild ranges',
    image: '/images/bio-exsitu-botanical.jpg'
  },
  {
    id: 'exsitu-seedbanks',
    title: 'Seed Banks',
    desc: 'Sub-zero desiccated seed storage (e.g., Svalbard & NBPGR New Delhi)',
    image: '/images/bio-exsitu-seedbanks.jpg'
  },
  {
    id: 'exsitu-tissue',
    title: 'Tissue Culture',
    desc: 'In vitro aseptic micropropagation of recalcitrant and threatened flora',
    image: '/images/bio-exsitu-tissue.jpg'
  },
  {
    id: 'exsitu-genebanks',
    title: 'Gene Banks',
    desc: 'Cryogenic storage in liquid nitrogen (-196°C) for germplasm & DNA libraries',
    image: '/images/bio-exsitu-genebanks.jpg'
  }
];

const IN_SITU_BULLETS = [
  'Protects entire ecosystems in their natural geographical range',
  'Maintains ongoing evolutionary adaptation & natural selection',
  'Conserves large viable populations across full trophic webs',
  'Preserves genetic diversity & soil-pollinator mutualisms',
  'Ensures long-term ecological sustainability at landscape scale'
];

export const BIO_CONSERVATION_MODAL_DETAILS: Record<string, ConservationModalDetail> = {
  'insitu-hero': {
    id: 'insitu-hero',
    title: 'In-situ Conservation: Habitat Protection & Ecosystem Integrity',
    subtitle: 'Preserving wild flora and fauna within their original, undisturbed natural ecosystems',
    badge: 'IN-SITU CONSERVATION · NATURAL HABITATS',
    badgeTheme: 'emerald',
    image: '/images/bio-insitu-hero.jpg',
    definition: 'In-situ conservation is the on-site protection and recovery of wild populations of plant or animal species in their natural surroundings. By preserving intact ecosystems, in-situ conservation maintains natural evolutionary processes, ecological trophic food webs, predator-prey dynamics, and mutualistic relationships without human artificial selection.',
    stats: [
      { label: 'Indian Protected Area Network', value: '1,000+ protected areas spanning >173,000 km²' },
      { label: 'Ecosystem Coverage', value: '>5.26% of India’s total geographical land area' },
      { label: 'Core Mechanism', value: 'Perpetuates evolutionary adaptation & natural selection' }
    ],
    keyPoints: [
      'Maintains natural evolutionary adaptations and genetic diversity against emerging pathogens and environmental shifts.',
      'Protects co-dependent symbiotic species, soil microbiomes, pollinators, and keystone top predators in complete trophic cascades.',
      'Cost-effective over large geographic scales compared to artificial captive breeding and environmental control facilities.',
      'Supports indigenous tribal livelihoods and traditional ecological knowledge (TEK) in buffer and transition zones.'
    ],
    vtuExamples: [
      'Wildlife Protection Act (1972) Statutory Framework',
      'Project Tiger (1973) - 55 dedicated Tiger Reserves across India',
      'Project Elephant (1992) - 33 designated Elephant Corridors',
      'UNESCO World Heritage Natural Sites (Kaziranga, Sundarbans, Western Ghats)'
    ],
    scientificTakeaway: 'In-situ conservation is the gold standard of ecological preservation because species do not evolve in isolation; their long-term genetic fitness and resilience depend on wild ecosystem pressures and complex ecological interdependencies.'
  },

  'insitu-national-parks': {
    id: 'insitu-national-parks',
    title: 'National Parks (IUCN Category II)',
    subtitle: 'Strict ecosystem protection with statutory prohibition on biotic interference',
    badge: 'IN-SITU · IUCN CATEGORY II',
    badgeTheme: 'emerald',
    image: '/images/bio-insitu-national-parks.jpg',
    definition: 'National Parks are strictly protected natural areas designated under Section 35 of the Wildlife (Protection) Act, 1972. They are set aside by law to protect outstanding natural ecosystems, geological features, and wildlife. In a National Park, no human activity, private land tenure, livestock grazing, forestry harvesting, or resource extraction is permitted under any circumstances.',
    stats: [
      { label: 'Total in India', value: '106 National Parks spanning ~44,402 km²' },
      { label: 'First National Park', value: 'Jim Corbett National Park (established 1936)' },
      { label: 'Legal Status', value: 'Absolute prohibition of grazing & private rights' }
    ],
    keyPoints: [
      'Strict Prohibition: No private rights or ownership are acknowledged; human settlement, grazing, and harvesting are strictly prohibited.',
      'Focus: Holistic preservation of entire ecosystems, geomorphological features, and biodiversity, rather than a single focal species.',
      'Boundary Alterations: Boundaries can only be altered through a resolution passed by the State Legislature approved by the NBWL (National Board for Wildlife).'
    ],
    vtuExamples: [
      'Jim Corbett National Park (Uttarakhand) - Bengal Tiger, Asian Elephant, Ramganga river ecosystem',
      'Kaziranga National Park (Assam) - World stronghold of the Great Indian One-horned Rhinoceros (Rhinoceros unicornis)',
      'Ranthambore & Bandhavgarh National Parks - Premier dry deciduous tiger habitats',
      'Gir National Park (Gujarat) - The last global sanctuary of the Asiatic Lion (Panthera leo persica)'
    ],
    scientificTakeaway: 'National Parks form the uncompromised core sanctuaries of wild India, where wild species live and reproduce entirely according to the laws of natural selection.'
  },

  'insitu-wildlife-sanctuaries': {
    id: 'insitu-wildlife-sanctuaries',
    title: 'Wildlife Sanctuaries (IUCN Category IV)',
    subtitle: 'Species-oriented habitat protection with strictly regulated human activities',
    badge: 'IN-SITU · IUCN CATEGORY IV',
    badgeTheme: 'emerald',
    image: '/images/bio-insitu-sanctuaries.jpg',
    definition: 'A Wildlife Sanctuary is a protected area declared under Section 18 of the Wildlife (Protection) Act, 1972, primarily focused on safeguarding particular endangered species or specific wildlife communities. Unlike National Parks, certain traditional rights such as controlled livestock grazing, non-timber forest produce (NTFP) collection, and eco-tourism may be regulated and permitted by the Chief Wildlife Warden, provided they do not harm wildlife.',
    stats: [
      { label: 'Total in India', value: '573 Wildlife Sanctuaries covering ~123,000 km²' },
      { label: 'Largest Sanctuary', value: 'Kutch Desert Wildlife Sanctuary (Gujarat, 7,506 km²)' },
      { label: 'Human Interaction', value: 'Regulated customary rights permitted without habitat damage' }
    ],
    keyPoints: [
      'Species-Oriented: Often declared to conserve a specific flagship or endemic organism (e.g., birds, wild ass, grizzled squirrel).',
      'Regulated Rights: Grazing and transit rights may continue under permits, unlike the zero-tolerance stance of National Parks.',
      'Upgradation Potential: A Wildlife Sanctuary can be upgraded into a National Park, but a National Park cannot be downgraded.'
    ],
    vtuExamples: [
      'Periyar Wildlife Sanctuary (Kerala) - Cardamom Hills, Nilgiri Tahr, wild elephants, Lake Periyar',
      'Keoladeo Ghana (Bharatpur, Rajasthan) - Renowned wetland sanctuary for migratory waterfowl and Siberian cranes',
      'Dandeli Wildlife Sanctuary (Karnataka) - Dense Western Ghats canopy, hornbills, black panthers',
      'Indian Wild Ass Sanctuary (Little Rann of Kutch) - Khur (Equus hemionus khur) habitat'
    ],
    scientificTakeaway: 'Wildlife Sanctuaries provide flexible buffer corridors and species-specific protection while balancing sustainable traditional rights of forest-dwelling communities.'
  },

  'insitu-biosphere-reserves': {
    id: 'insitu-biosphere-reserves',
    title: 'Biosphere Reserves (UNESCO MAB Programme)',
    subtitle: 'Integrated landscape management balancing conservation and sustainable socio-economic development',
    badge: 'IN-SITU · UNESCO MAB',
    badgeTheme: 'emerald',
    image: '/images/bio-insitu-biosphere.jpg',
    definition: 'Biosphere Reserves are representative terrestrial and coastal/marine ecosystems recognized under UNESCO’s Man and the Biosphere (MAB) Programme. They are designed to reconcile the conservation of biodiversity with sustainable human economic development, scientific research, and cultural heritage across wide regional landscapes.',
    stats: [
      { label: 'Total in India', value: '18 Biosphere Reserves (12 in World Network of BRs)' },
      { label: 'First in India', value: 'Nilgiri Biosphere Reserve (designated 1986)' },
      { label: 'Zonation Model', value: 'Core Zone · Buffer Zone · Transition/Cooperation Zone' }
    ],
    keyPoints: [
      'Core Zone: Strictly protected non-manipulated ecosystem where human interference is prohibited, dedicated purely to baseline scientific observation and biodiversity conservation.',
      'Buffer Zone: Surrounds the core; used for cooperative activities like ecological research, environmental training, sustainable tourism, and selective forestry.',
      'Transition Zone: Outer cooperative area where local tribal communities, farmers, and conservation authorities collaborate on sustainable resource use and agroforestry.'
    ],
    vtuExamples: [
      'Nilgiri Biosphere Reserve (TN, Kerala, Karnataka) - Spans 5,520 km²; conserves Nilgiri Tahr, Lion-tailed Macaque, Shola grasslands',
      'Gulf of Mannar Biosphere Reserve (Tamil Nadu) - 21 coral islands, seagrass beds, dugong habitats',
      'Sundarbans Biosphere Reserve (West Bengal) - World’s largest mangrove delta, estuarine crocodiles, Royal Bengal Tigers',
      'Nanda Devi Biosphere Reserve (Uttarakhand) - High-altitude Himalayan glacial flora and snow leopard habitat'
    ],
    scientificTakeaway: 'Biosphere Reserves represent the modern gold standard of regional conservation by demonstrating that humans and wildlife can coexist through scientifically planned zonation.'
  },

  'insitu-marine': {
    id: 'insitu-marine',
    title: 'Marine Protected Areas (MPAs)',
    subtitle: 'Oceanic, estuarine, and reef conservation preserving marine trophic networks and coral nurseries',
    badge: 'IN-SITU · MARINE & COASTAL',
    badgeTheme: 'blue',
    image: '/images/bio-insitu-marine.jpg',
    definition: 'Marine Protected Areas (MPAs) are designated ocean and coastal areas managed to conserve marine biodiversity, protect vulnerable coral reef ecosystems, maintain fisheries nurseries, and safeguard endangered marine megafauna (such as dugongs, marine turtles, cetaceans, and whale sharks).',
    stats: [
      { label: 'Indian MPAs', value: '31 MPAs along peninsular coast + >100 in island archipelagos' },
      { label: 'Key Ecosystems', value: 'Coral reefs, seagrass meadows, mangroves, and estuaries' },
      { label: 'Fisheries Benefit', value: 'Spillover effect replenishing adjacent commercial fisheries' }
    ],
    keyPoints: [
      'Nurseries of the Ocean: Mangroves and coral reefs within MPAs provide essential breeding and shelter grounds for larval fishes and crustaceans.',
      'Trawling Restrictions: Strictly prohibit bottom trawling, dynamite fishing, coral dredging, and industrial effluent discharge.',
      'Climate Buffering: Protects coastal communities from tropical cyclone storm surges and tsunami forces while acting as massive blue carbon sinks.'
    ],
    vtuExamples: [
      'Gulf of Mannar Marine National Park (Tamil Nadu) - 560 km²; Dugong (Dugong dugon), 117 coral species, green sea turtles',
      'Gahirmatha Marine Sanctuary (Odisha) - World’s largest mass nesting rookery (Arribada) for Olive Ridley Sea Turtles (Lepidochelys olivacea)',
      'Mahatma Gandhi Marine National Park (Wandoor, Andamans) - Fringing coral reefs, giant clams, sea anemones',
      'Malvan Marine Sanctuary (Sindhudurg, Maharashtra) - Pearl oysters, coral patches, and coastal mangrove fringes'
    ],
    scientificTakeaway: 'Marine Protected Areas act as biological pumps that replenish depleted surrounding waters through the spillover effect, securing both planetary biodiversity and human food security.'
  },

  'exsitu-zoos': {
    id: 'exsitu-zoos',
    title: 'Zoological Parks & Captive Breeding',
    subtitle: 'Ex-situ survival reserves, studbook genetics, and species reintroduction programs',
    badge: 'EX-SITU · FAUNA CONSERVATION',
    badgeTheme: 'amber',
    image: '/images/bio-exsitu-zoos.jpg',
    definition: 'Zoological parks (zoos) and specialized captive breeding centres maintain wild animals in humane, controlled enclosures for scientific study, conservation education, and managed reproduction. High-priority Species Survival Plans (SSPs) use international studbooks to prevent inbreeding depression in critically endangered species and produce healthy offspring for eventual rewilding.',
    stats: [
      { label: 'India Zoo Count', value: '~150 recognized zoos monitored by CZA (Central Zoo Authority)' },
      { label: 'Conservation Breeding', value: '23 prioritized critically endangered Indian animal species' },
      { label: 'Key Metric', value: 'Maintains 90% genetic diversity over 100-year horizons' }
    ],
    keyPoints: [
      'Captive Breeding Protocols: Pairing genetically distant individuals using pedigree records to maintain high heterozygosity.',
      'Public Education: Raising environmental consciousness and empathy among millions of urban visitors every year.',
      'Veterinary Science: Pioneer advancements in wildlife medicine, anesthesia, pathology, and assisted reproductive technologies (ART).'
    ],
    vtuExamples: [
      'Padmaja Naidu Himalayan Zoological Park (Darjeeling) - Internationally acclaimed captive breeding of Red Panda (Ailurus fulgens) and Snow Leopard',
      'National Zoological Park (New Delhi) - Managed conservation breeding of White Tigers and Sangai Brow-antlered Deer',
      'Pygmy Hog Conservation Programme (Assam) - Captive breeding and successful reintroduction into Manas National Park',
      'Vulture Conservation Breeding Centres (Pinjore, Haryana) - Saving Oriental white-backed, long-billed, and slender-billed vultures from diclofenac extinction'
    ],
    scientificTakeaway: 'Modern zoos have transformed from entertainment exhibits into frontline conservation arks that rescue species teetering on the precipice of global extinction.'
  },

  'exsitu-botanical': {
    id: 'exsitu-botanical',
    title: 'Botanical Gardens & Arboreta',
    subtitle: 'Living botanical archives, taxonomic classifications, and rare floral propagation',
    badge: 'EX-SITU · FLORA CONSERVATION',
    badgeTheme: 'emerald',
    image: '/images/bio-exsitu-botanical.jpg',
    definition: 'Botanical gardens and arboreta are scientifically curated institutions holding documented collections of living plants for scientific research, conservation, display, and education. They cultivate rare, endemic, and critically endangered plant taxa outside their native ranges to prevent extinction from wild habitat destruction.',
    stats: [
      { label: 'Global Network', value: '>3,000 botanical gardens holding ~30% of all known plant species' },
      { label: 'Historic Indian Garden', value: 'AJC Bose Indian Botanic Garden, Howrah (founded 1787)' },
      { label: 'Herbarium Holdings', value: 'Millions of dried reference botanical specimens' }
    ],
    keyPoints: [
      'Living Collections: Maintain genetic stocks of wild crop relatives, timber trees, and threatened medicinal flora.',
      'Taxonomic Identification: Fundamental centers for botanical nomenclature, flora documentation, and anatomical research.',
      'Reintroduction to the Wild: Propagating juvenile saplings in controlled nurseries for transplanting back into degraded forest habitats.'
    ],
    vtuExamples: [
      'Acharya Jagadish Chandra Bose Indian Botanic Garden (Howrah, Kolkata) - Home to the 250-year-old Great Banyan Tree spanning 1.5 hectares and Central National Herbarium',
      'Jawaharlal Nehru Tropical Botanic Garden and Research Institute (JNTBGRI, Kerala) - Largest conservatory of tropical plant genetic resources in Asia',
      'Lalbagh Botanical Garden (Bengaluru) - Glass House, world-class collection of exotic tropical trees and endangered Western Ghats flora',
      'Royal Botanic Gardens (Kew, London) - World leader in plant fungal taxonomy and Millennium Seed Bank partner'
    ],
    scientificTakeaway: 'Botanical gardens serve as living genetic storehouses and taxonomic beacons, ensuring that irreplaceable plant lineages survive changing global climates.'
  },

  'exsitu-seedbanks': {
    id: 'exsitu-seedbanks',
    title: 'Seed Banks & Cryo-Vaults',
    subtitle: 'Sub-zero seed desiccation banking protecting global food security and crop genetic diversity',
    badge: 'EX-SITU · SEED VAULTS',
    badgeTheme: 'blue',
    image: '/images/bio-exsitu-seedbanks.jpg',
    definition: 'Seed banks preserve genetic diversity by storing dried orthodox seeds at sub-zero temperatures (typically -18°C to -20°C at 3-7% relative humidity). This induces metabolic dormancy, allowing seeds to remain viable for decades or centuries. Seed banks safeguard wild crop progenitors and landraces against natural disasters, warfare, pests, and climate cataclysms.',
    stats: [
      { label: 'Global Doomsday Vault', value: 'Svalbard Global Seed Vault holding >1.2 million seed accessions' },
      { label: 'India National Genebank', value: 'NBPGR New Delhi: 2nd largest genebank worldwide (~450,000 accessions)' },
      { label: 'Operating Condition', value: '-18°C to -20°C in hermetically sealed moisture-proof foil packets' }
    ],
    keyPoints: [
      'Orthodox Seed Drying: Seeds are carefully dehydrated to low moisture levels without destroying embryo vitality prior to freezing.',
      'Crop Resilience Reserves: Store genetic variations carrying natural resistance to droughts, salinity, blights, and heat stress.',
      'Periodic Viability Testing: Sample batches are germinated every 5-10 years; if germination drops below 85%, seeds are grown out to produce fresh batches.'
    ],
    vtuExamples: [
      'Svalbard Global Seed Vault (Spitsbergen, Norway) - Built inside a permafrost mountain 120m deep, providing fail-safe planetary crop backup',
      'National Bureau of Plant Genetic Resources (NBPGR, Pusa, New Delhi) - Conserves 450,000+ accessions of Indian agricultural cultivars and wild relatives',
      'ICRISAT Genebank (Patancheru, Hyderabad) - Conserves sorghum, pearl millet, chickpea, pigeonpea, and groundnut germplasm for semi-arid tropics',
      'Millennium Seed Bank (Wakehurst, UK) - Aiming to store seeds from 25% of the world’s wild plant species'
    ],
    scientificTakeaway: 'Seed banks are humanity’s insurance policy against global famine, securing genetic traits forged over millennia of natural selection and indigenous agriculture.'
  },

  'exsitu-tissue': {
    id: 'exsitu-tissue',
    title: 'Tissue Culture & In-Vitro Micropropagation',
    subtitle: 'Aseptic clonal propagation of endangered and recalcitrant plant taxa from cellular explants',
    badge: 'EX-SITU · BIOTECHNOLOGY',
    badgeTheme: 'amber',
    image: '/images/bio-exsitu-tissue.jpg',
    definition: 'Plant tissue culture is the aseptic cultivation of plant cells, tissues, or organs (explants such as shoot tips, meristems, nodes, or embryos) on sterile nutrient media containing essential vitamins, salts, sucrose, and plant growth regulators (auxins and cytokinins) under controlled environmental conditions. It enables massive clonal multiplication of species that produce recalcitrant seeds or reproduce slowly.',
    stats: [
      { label: 'Multiplication Factor', value: 'Single explant yields thousands of disease-free plantlets annually' },
      { label: 'Sterility Standard', value: '100% aseptic laminar air flow with HEPA filtration' },
      { label: 'Space Requirement', value: 'Millions of specimens maintained in a single laboratory room' }
    ],
    keyPoints: [
      'Totipotency: Exploits the biological ability of every plant cell to regenerate into a complete, fertile adult organism.',
      'Virus-Free Clones: Meristem-tip culture eliminates systemic viruses and pathogens, restoring vitality to threatened cultivars.',
      'Recalcitrant Species: Essential for conserving tropical timber trees (Shorea, Dipterocarpus), oak species, and orchids whose seeds do not survive drying or freezing.'
    ],
    vtuExamples: [
      'Micropropagation of Endangered Orchids (Vanda coerulea, Paphiopedilum insigne) of Northeast India',
      'Clonal propagation of Himalayan Yew (Taxus wallichiana) for anti-cancer paclitaxel production without wild tree felling',
      'Sarpagandha (Rauvolfia serpentina) and Ashwagandha in-vitro gene conservation',
      'Shoot-tip cryopreservation and slow-growth storage at 4°C to minimize subculturing frequencies'
    ],
    scientificTakeaway: 'Tissue culture breaks the reproductive bottlenecks of endangered flora, multiplying rare specimens into millions of hardy saplings ready for ecological restoration.'
  },

  'exsitu-genebanks': {
    id: 'exsitu-genebanks',
    title: 'Gene Banks & Cryopreservation',
    subtitle: 'Ultra-low temperature preservation in liquid nitrogen (-196°C) for indefinite genetic stability',
    badge: 'EX-SITU · CRYOGENICS',
    badgeTheme: 'blue',
    image: '/images/bio-exsitu-genebanks.jpg',
    definition: 'Gene banks and cryopreservation represent the pinnacle of modern ex-situ preservation technology. Biological materials—including animal semen, oocytes, embryos, stem cells, plant meristems, pollen, and DNA libraries—are frozen and held in liquid nitrogen at -196°C (-321°F) or vapor-phase nitrogen. At this temperature, all biochemical reactions and enzymatic degradations halt completely, ensuring indefinite preservation without genetic mutation.',
    stats: [
      { label: 'Cryogenic Temperature', value: '-196°C in liquid nitrogen (LN2) tanks' },
      { label: 'Preservation Window', value: 'Centuries to theoretical millennia without cellular aging' },
      { label: 'Biological Scope', value: 'Gametes, embryos, somatic cells, DNA libraries & recalcitrant tissues' }
    ],
    keyPoints: [
      'Vitrification Techniques: Use of cryoprotectants (DMSO, glycerol) and rapid cooling rates to prevent intracellular ice crystal formation that punctures cell membranes.',
      'Animal Genetic Resources: Frozen semen and embryo banks preserve vanishing indigenous livestock breeds and critically endangered wild mammals.',
      'Synthetic Rescues: Allows future restoration of extinct-in-the-wild alleles via Artificial Insemination (AI), In-Vitro Fertilization (IVF), and Somatic Cell Nuclear Transfer (SCNT).'
    ],
    vtuExamples: [
      'National Bureau of Animal Genetic Resources (NBAGR, Karnal, Haryana) - Cryo-bank for endangered indigenous cattle, buffalo, and camel breeds',
      'LaCONES (Laboratory for the Conservation of Endangered Species, CCMB Hyderabad) - Frozen Zoo housing gametes and cell lines of Indian tigers, leopards, and Asiatic lions',
      'San Diego Zoo Frozen Zoo - Preserves viable cell cultures from >1,000 taxa, including the extinct Northern White Rhino',
      'NBPGR Cryo-bank (New Delhi) - Liquid nitrogen tanks storing >10,000 accessions of dormant plant embryonic axes'
    ],
    scientificTakeaway: 'Cryopreservation halts biological time itself, building an indestructible genetic backup that can resurrect vanishing evolutionary lineages centuries into the future.'
  },

  'insitu-vs-exsitu': {
    id: 'insitu-vs-exsitu',
    title: 'In-situ vs Ex-situ Conservation: Comparative Paradigm',
    subtitle: 'Complementary strategies safeguarding Earth’s evolutionary continuum & genetic heritage',
    badge: 'VTU BCV755B · COMPARATIVE STRATEGY',
    badgeTheme: 'emerald',
    image: '/images/bio-conservation-bg.jpg',
    definition: 'Modern conservation biology recognizes that neither in-situ nor ex-situ conservation alone is sufficient to avert global mass extinction. In-situ conservation protects organisms within their evolving ecosystems and maintains wild natural selection. Ex-situ conservation provides an indispensable safety net against catastrophic wild die-offs, storing viable germplasm and breeding individuals for genetic re-infusion.',
    stats: [
      { label: 'IUCN Recommendation', value: 'One Plan Approach integrating wild and captive populations' },
      { label: 'Complementarity', value: 'In-situ preserves processes · Ex-situ secures genomes' },
      { label: 'Target 3 (Kunming-Montreal)', value: 'Conserve 30% of planetary land and oceans by 2030' }
    ],
    keyPoints: [
      'In-situ Strength: Conserves entire ecosystems, trophic relationships, evolutionary dynamism, and ecological services (water recharge, carbon sequestration).',
      'In-situ Vulnerability: Susceptible to catastrophic wild events like forest fires, disease epidemics, and climate shifts.',
      'Ex-situ Strength: Immune to wild habitat destruction and poaching; allows precise genetic cataloging, cryopreservation, and controlled breeding.',
      'Ex-situ Limitation: High operational costs, limited capacity, risk of loss of wild foraging behaviors, and artificial selective pressures.'
    ],
    vtuExamples: [
      'California Condor: Rescued when wild population fell to 22 individuals; bred in captivity and successfully reintroduced to the wild',
      'Indian One-Horned Rhino: Rescued through strict in-situ enforcement in Kaziranga from <200 to >3,000 individuals',
      'Cheetah Reintroduction to India (Project Cheetah, Kuno): Combining captive management and wild acclimatization enclosures',
      'Ginkgo biloba: Preserved by Buddhist temple botanical cultivation before being restored worldwide'
    ],
    scientificTakeaway: 'The future of planetary biodiversity lies in the seamless synthesis of In-situ habitat protection and Ex-situ genetic banking—forming an unshakeable ecological shield for life on Earth.'
  }
};

const KEY_TAKEAWAYS = [
  {
    id: 'insitu-hero',
    icon: <Leaf className="w-4 h-4 text-emerald-400" />,
    color: '#10b981',
    text: 'In-situ conserves species in their natural habitats (e.g., national parks, sanctuaries).'
  },
  {
    id: 'exsitu-zoos',
    icon: <Landmark className="w-4 h-4 text-purple-400" />,
    color: '#a855f7',
    text: 'Ex-situ conserves species outside natural habitats (e.g., zoos, botanical gardens).'
  },
  {
    id: 'insitu-vs-exsitu',
    icon: <Users className="w-4 h-4 text-amber-400" />,
    color: '#f59e0b',
    text: 'Both methods are complementary and essential for biodiversity conservation.'
  },
  {
    id: 'insitu-biosphere-reserves',
    icon: <Globe className="w-4 h-4 text-cyan-400" />,
    color: '#06b6d4',
    text: 'Conservation helps maintain ecosystem stability and supports human well-being in the long term.'
  }
];

export function BioConservationScreen({ onNavigateNext }: BioConservationScreenProps) {
  const [selectedDetail, setSelectedDetail] = useState<ConservationModalDetail | null>(null);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedDetail !== null, () => setSelectedDetail(null));

  const handleNextClick = () => {
    if (onNavigateNext) {
      onNavigateNext();
    } else {
      const el = document.getElementById('ch-ecosystem') || document.getElementById('ch-types');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bio-screen bio-conservation-section" id="ch-conservation">
      {/* Background Image Layer */}
      <div 
        className="bio-conservation-bg" 
        style={{ backgroundImage: `url('/images/bio-conservation-bg.jpg')` }}
      />
      
      {/* Ambient Vignette & Scrims */}
      <div className="bio-conservation-vignette" />

      <div className="bio-conservation-container">
        {/* ===================================================================
            TOP HERO ROW: Title Block (Left) | Wildlife Scene & Wooden Sign (Center) | Quote Card (Right)
            =================================================================== */}
        <div className="bio-conservation-hero-row">
          {/* Header Left */}
          <div className="bio-conservation-hero-left">
            <div className="bio-conservation-badge-pill">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 05</span>
            </div>
            
            <h1 className="bio-conservation-title">
              Conservation of <span className="bio-conservation-title-highlight">Biodiversity</span>
            </h1>

            <h2 className="bio-conservation-subtitle">
              Protecting the Web of Life
            </h2>

            <p className="bio-conservation-lead">
              Conservation of biodiversity involves protecting, maintaining and sustainably using the variety of life 
              on Earth. It ensures the survival of species, the stability of ecosystems and the continued flow of benefits to 
              present and future generations.
            </p>
          </div>

          {/* Wooden Conservation Sign Element with timber posts (Clickable for In-situ vs Ex-situ Overview) */}
          <div 
            className="bio-conservation-sign-holder"
            onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS['insitu-vs-exsitu'])}
            title="Click to view In-situ vs Ex-situ Comparative Case Study"
            style={{ cursor: 'pointer' }}
          >
            <div className="bio-rustic-signpost">
              <div className="bio-rustic-sign-board">
                <span className="sign-line">PROTECT</span>
                <span className="sign-line">CONSERVE</span>
                <span className="sign-line">SUSTAIN</span>
                <span className="sign-highlight">OUR WILDLIFE</span>
              </div>
              <div className="bio-rustic-posts">
                <div className="bio-sign-post post-left" />
                <div className="bio-sign-post post-right" />
              </div>
            </div>
          </div>

          {/* Top Right Liquid-Glass Quote Card */}
          <div 
            className="bio-conservation-hero-right"
            onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS['insitu-vs-exsitu'])}
            style={{ cursor: 'pointer' }}
            title="Click to inspect conservation principles"
          >
            <div className="bio-conservation-quote-card">
              <span className="bio-conservation-quote-mark">❝</span>
              <p className="bio-conservation-quote-text">
                Conserving biodiversity today ensures healthy ecosystems, resilient communities and a sustainable future for generations to come.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MAIN 2-COLUMN SPLIT: In-situ Conservation (Left) | Ex-situ Conservation (Right)
            =================================================================== */}
        <div className="bio-conservation-main-split">
          {/* ---------------------------------------------------------------
              1. LEFT COLUMN: IN-SITU CONSERVATION (In Natural Habitats)
              --------------------------------------------------------------- */}
          <div className="bio-cons-column bio-insitu-panel">
            {/* Header with pill tag */}
            <div 
              className="bio-cons-panel-header"
              onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS['insitu-hero'])}
              style={{ cursor: 'pointer' }}
              title="Click to view In-situ Habitat Preservation Details"
            >
              <div className="bio-cons-header-left">
                <div className="bio-cons-icon-box green">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="bio-cons-title-group">
                  <h3 className="bio-cons-title">In-situ Conservation</h3>
                  <span className="bio-cons-sub">Conservation within the natural habitats where species live.</span>
                </div>
              </div>
              <div className="bio-cons-pill-tag green">
                <Trees className="w-3.5 h-3.5" />
                <span>In Natural Habitats</span>
              </div>
            </div>

            {/* In-situ Hero Card: Wide Landscape + 5 Checkmark Bullets */}
            <div 
              className="bio-insitu-hero-card"
              onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS['insitu-hero'])}
              style={{ cursor: 'pointer' }}
              title="Click to inspect In-situ Ecological Framework & Mechanisms"
            >
              <div className="bio-insitu-landscape-col">
                <img 
                  src="/images/bio-insitu-hero.jpg" 
                  alt="In-situ Natural Habitat" 
                  className="bio-insitu-hero-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/bio-values-bg.jpg';
                  }}
                />
                <div className="bio-insitu-landscape-overlay" />
              </div>

              <div className="bio-insitu-bullets-col">
                <ul className="bio-insitu-checklist">
                  {IN_SITU_BULLETS.map((bullet, idx) => (
                    <li key={idx} className="bio-insitu-check-item">
                      <div className="bio-check-bubble">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="bio-check-text">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* In-situ Examples (4 columns) */}
            <div className="bio-cons-subheading">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <h4>Examples of In-situ Conservation</h4>
            </div>

            <div className="bio-insitu-examples-grid">
              {IN_SITU_EXAMPLES.map((ex) => (
                <div 
                  key={ex.id} 
                  className="bio-insitu-card"
                  onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS[ex.id])}
                  style={{ cursor: 'pointer' }}
                  title={`Click to view case study: ${ex.title}`}
                >
                  <div className="bio-insitu-thumb-wrap">
                    <img 
                      src={ex.image} 
                      alt={ex.title} 
                      className="bio-insitu-thumb-img"
                    />
                  </div>
                  <div className="bio-insitu-card-body">
                    <h5 className="bio-insitu-card-title">{ex.title}</h5>
                    <span className="bio-insitu-card-sub">{ex.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------
              2. RIGHT COLUMN: EX-SITU CONSERVATION (Outside Natural Habitats)
              --------------------------------------------------------------- */}
          <div className="bio-cons-column bio-exsitu-panel">
            {/* Header with pill tag */}
            <div 
              className="bio-cons-panel-header"
              onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS['insitu-vs-exsitu'])}
              style={{ cursor: 'pointer' }}
              title="Click to view Ex-situ Conservation Overview"
            >
              <div className="bio-cons-header-left">
                <div className="bio-cons-icon-box cyan">
                  <FlaskConical className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="bio-cons-title-group">
                  <h3 className="bio-cons-title">Ex-situ Conservation</h3>
                  <span className="bio-cons-sub">Conservation outside the natural habitats.</span>
                </div>
              </div>
              <div className="bio-cons-pill-tag cyan">
                <Landmark className="w-3.5 h-3.5" />
                <span>Outside Natural Habitats</span>
              </div>
            </div>

            {/* Ex-situ Hero Showcase: 4 Vertical Tiles with Color Pills */}
            <div className="bio-exsitu-showcase-strip">
              {EX_SITU_SHOWCASE.map((tile) => (
                <div 
                  key={tile.id} 
                  className="bio-exsitu-tile"
                  onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS[tile.id])}
                  style={{ cursor: 'pointer' }}
                  title={`Click to view ${tile.label} case study`}
                >
                  <img 
                    src={tile.image} 
                    alt={tile.label} 
                    className="bio-exsitu-tile-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/bio-plant-willow.jpg';
                    }}
                  />
                  <div className="bio-exsitu-tile-overlay" />
                  <span className={`bio-exsitu-tile-pill ${tile.colorClass}`}>{tile.label}</span>
                </div>
              ))}
            </div>

            {/* Ex-situ Examples (5 columns) */}
            <div className="bio-cons-subheading">
              <Settings className="w-3.5 h-3.5 text-cyan-400" />
              <h4>Examples of Ex-situ Conservation</h4>
            </div>

            <div className="bio-exsitu-examples-grid">
              {EX_SITU_EXAMPLES.map((ex) => (
                <div 
                  key={ex.id} 
                  className="bio-exsitu-card"
                  onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS[ex.id])}
                  style={{ cursor: 'pointer' }}
                  title={`Click to view case study: ${ex.title}`}
                >
                  <div className="bio-exsitu-thumb-wrap">
                    <img 
                      src={ex.image} 
                      alt={ex.title} 
                      className="bio-exsitu-thumb-img"
                    />
                  </div>
                  <div className="bio-exsitu-card-body">
                    <h5 className="bio-exsitu-card-title">{ex.title}</h5>
                    <p className="bio-exsitu-card-desc">{ex.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM SECTION: Key Takeaways (Left) & Continue Button (Right)
            =================================================================== */}
        <div className="bio-conservation-footer-bar">
          <div className="bio-conservation-takeaways-block">
            <div 
              className="bio-conservation-takeaways-heading"
              onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS['insitu-vs-exsitu'])}
              style={{ cursor: 'pointer' }}
              title="Click to view Comparative Conservation Analysis"
            >
              <div className="bio-takeaway-bulb-circle">
                <Lightbulb className="w-4 h-4 text-amber-300" />
              </div>
              <span>Key Takeaways</span>
            </div>

            <div className="bio-conservation-pills-row">
              {KEY_TAKEAWAYS.map((takeaway, idx) => (
                <div 
                  key={idx} 
                  className="bio-cons-takeaway-pill"
                  onClick={() => setSelectedDetail(BIO_CONSERVATION_MODAL_DETAILS[takeaway.id])}
                  style={{ cursor: 'pointer' }}
                  title="Click to view detailed case study"
                >
                  <div 
                    className="bio-cons-takeaway-circle"
                    style={{ backgroundColor: `${takeaway.color}22`, borderColor: `${takeaway.color}50` }}
                  >
                    {takeaway.icon}
                  </div>
                  <p className="bio-cons-takeaway-text">{takeaway.text}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="button" 
            className="bio-cons-next-btn"
            onClick={handleNextClick}
          >
            <span>Continue to Ecosystem</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL OVERLAY (Liquid-Glass Modal Architecture)
          =================================================================== */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div
            className="bio-types-modal-backdrop"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedDetail(null)}
          >
            <motion.div
              className={`bio-types-modal-card ${selectedDetail.badgeTheme}-theme`}
              data-lenis-prevent
              initial={{ scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 18 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Hero Header with Image, Gradient Scrim & Close Button */}
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
                    Conservation Framework &amp; Ecological Mechanics
                  </h4>
                  <p className="bio-types-modal-text">{selectedDetail.definition}</p>
                </div>

                {/* Key Points */}
                <div className="bio-types-modal-section">
                  <h4>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Core Pillars &amp; Operational Strengths
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
                    Field Case Studies &amp; VTU BCV755B Benchmarks
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default BioConservationScreen;
