import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Coins,
  Users,
  Palette,
  BookOpen,
  Heart,
  Globe,
  Lightbulb,
  Pill,
  GraduationCap,
  ArrowRight,
  Quote,
  X,
  Info,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { useBioModalScrollLock } from './useBioModalScrollLock';

interface BioValuesScreenProps {
  onNavigateNext?: () => void;
}

export interface ValueItem {
  id: string;
  name: string;
  badgeLabel?: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  subtitle: string;
  image: string;
  bullets: string[];
}

export interface ValueModalDetail {
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

const VALUES_DATA: ValueItem[] = [
  {
    id: 'ecological',
    name: 'Ecological Value',
    badgeLabel: '1',
    color: '#10b981', // emerald green
    glowColor: 'rgba(16, 185, 129, 0.45)',
    icon: <Leaf className="w-4 h-4 text-emerald-300" />,
    subtitle: 'Maintains life support systems',
    image: '/images/bio-val-ecological.jpg',
    bullets: [
      'Maintains ecological balance and life support systems.',
      'Supports nutrient cycling, pollination, soil formation, climate regulation, etc.'
    ]
  },
  {
    id: 'economic',
    name: 'Economic Value',
    badgeLabel: '2',
    color: '#f59e0b', // amber gold
    glowColor: 'rgba(245, 158, 11, 0.45)',
    icon: <Coins className="w-4 h-4 text-amber-300" />,
    subtitle: 'Provides goods and services',
    image: '/images/bio-val-economic.jpg',
    bullets: [
      'Provides food, fuel, fibre, timber, medicines and raw materials.',
      'Supports agriculture, fisheries, forestry and many industries.'
    ]
  },
  {
    id: 'social',
    name: 'Social Value',
    badgeLabel: '3',
    color: '#06b6d4', // sky cyan
    glowColor: 'rgba(6, 182, 212, 0.45)',
    icon: <Users className="w-4 h-4 text-cyan-300" />,
    subtitle: 'Supports communities and livelihoods',
    image: '/images/bio-val-social.jpg',
    bullets: [
      'Supports livelihoods and rural communities.',
      'Important for food security, employment and cultural identity.'
    ]
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic Value',
    badgeLabel: '4',
    color: '#f97316', // warm orange
    glowColor: 'rgba(249, 115, 22, 0.45)',
    icon: <Palette className="w-4 h-4 text-orange-300" />,
    subtitle: 'Inspires art, culture and recreation',
    image: '/images/bio-val-aesthetic.jpg',
    bullets: [
      'Provides natural beauty and inspiration.',
      'Source of recreation, tourism, art, literature and spiritual fulfillment.'
    ]
  },
  {
    id: 'educational',
    name: 'Educational Value',
    badgeLabel: '5',
    color: '#ec4899', // rose magenta
    glowColor: 'rgba(236, 72, 153, 0.45)',
    icon: <BookOpen className="w-4 h-4 text-pink-300" />,
    subtitle: 'Source of knowledge and research',
    image: '/images/bio-val-educational.jpg',
    bullets: [
      'A living laboratory for learning and research.',
      'Helps in scientific discoveries, biotechnology and understanding ecosystems.'
    ]
  },
  {
    id: 'ethical',
    name: 'Ethical Value',
    badgeLabel: '6',
    color: '#a855f7', // purple violet
    glowColor: 'rgba(168, 85, 247, 0.45)',
    icon: <Heart className="w-4 h-4 text-purple-300" />,
    subtitle: 'Moral responsibility to protect life',
    image: '/images/bio-val-ethical.jpg',
    bullets: [
      'Moral responsibility to protect all forms of life.',
      'Every species has an intrinsic right to exist, regardless of its direct use to humans.'
    ]
  }
];

export const BIO_VALUES_MODAL_DETAILS: Record<string, ValueModalDetail> = {
  ecological: {
    id: 'ecological',
    title: 'Ecological Value — Life Support & Biospheric Balance',
    subtitle: 'Regulating biogeochemical cycles, hydrological biofiltration, pedogenesis & climate stability',
    badge: 'VALUE 01 · ECOLOGICAL',
    badgeTheme: 'emerald',
    image: '/images/bio-val-ecological.jpg',
    definition: 'Ecological value refers to the foundational life-support services rendered by natural biodiversity. Unlike commercial commodities sold in markets, ecological services operate continuously across planetary scales to regulate air, water, soil, and climate equilibrium.',
    stats: [
      { label: 'Global Valuation', value: '$125–145 Trillion/year in services (Costanza et al.)' },
      { label: 'Carbon Buffering', value: '~30% of fossil CO₂ absorbed by terrestrial ecosystems' },
      { label: 'Pollination Service', value: '>75% of leading food crops depend on animal pollinators' }
    ],
    keyPoints: [
      'Climate Regulation: Forest canopies drive regional rainfall cycles via evapotranspiration and regulate Earth’s albedo.',
      'Water Purification: Wetland reeds and soil microbes filter nitrates, phosphates, and heavy metals from waterways.',
      'Soil Pedogenesis: Root networks bind topsoil against erosion while earthworms and decomposers build fertile humus.',
      'Biological Pollination: Bees, butterflies, and bats ensure the sexual reproduction and fruit-set of angiosperms.'
    ],
    vtuExamples: [
      'Western Ghats montane forests regulating perennial peninsular river flows (Krishna, Kaveri)',
      'Sundarbans Mangrove delta buffering coastal regions from cyclonic tidal surges',
      'Mycorrhizal fungal networks facilitating nutrient exchange in forest soils'
    ],
    scientificTakeaway: 'Ecosystem services are the non-negotiable life support engines of the biosphere, operating free of charge but valued far higher than the global economy (VTU Syllabus Part 3.1).'
  },
  economic: {
    id: 'economic',
    title: 'Economic Value — Consumptive & Productive Commodities',
    subtitle: 'Timber, commercial fisheries, agricultural crop germplasm, and pharmaceutical discovery',
    badge: 'VALUE 02 · ECONOMIC',
    badgeTheme: 'amber',
    image: '/images/bio-val-economic.jpg',
    definition: 'Economic value encompasses the direct financial, consumptive, and industrial benefits harvested from biodiversity. It is divided into Consumptive Use Value (harvested for local subsistence without entering commercial markets) and Productive Use Value (harvested and traded in national and global commercial markets).',
    stats: [
      { label: 'Fishery Livelihoods', value: '>200 million people employed globally' },
      { label: 'Prescription Drugs', value: '>50% of pharmaceutical drugs originate from biodiversity' },
      { label: 'Wild Crop Genes', value: 'Contribute billions annually to disease-resistant agriculture' }
    ],
    keyPoints: [
      'Consumptive Use: Firewood, wild fruits, bushmeat, fodder, thatch grass, and local medicinal herbs.',
      'Productive Use: Commercial timber (Teak, Pine, Sal), natural rubber, pulpwood, silk, and ocean fisheries.',
      'Bioprospecting: Systematic exploration of wild flora and microbes for novel pharmaceutical compounds and industrial enzymes.'
    ],
    vtuExamples: [
      'Cinchona bark yielding quinine (foundational antimalarial drug)',
      'Tectona grandis (Teak) and Dalbergia latifolia (Rosewood) commercial timber',
      'Marine fisheries (Mackerel, Sardines, Tuna) supporting coastal economies'
    ],
    scientificTakeaway: 'Biodiversity is the fundamental raw material driving the primary productive sector of the world economy (VTU Syllabus Part 3.2).'
  },
  social: {
    id: 'social',
    title: 'Social Value — Community Livelihoods & Sacred Groves',
    subtitle: 'Tribal sustenance, non-timber forest products (NTFPs), and ancient community conservation',
    badge: 'VALUE 03 · SOCIAL',
    badgeTheme: 'blue',
    image: '/images/bio-val-social.jpg',
    definition: 'Social value reflects the role of biodiversity in supporting the everyday livelihoods, cultural identity, and traditional knowledge of rural and indigenous tribal communities. In many cultures, conservation is deeply embedded in social customs and sacred traditions.',
    stats: [
      { label: 'Forest Dwellers', value: '>300 million indigenous people depend on forests' },
      { label: 'Sacred Groves', value: '>100,000 community-protected sacred forest groves in India' },
      { label: 'Traditional Medicine', value: 'Ayurvedic, Siddha & Unani systems rooted in native flora' }
    ],
    keyPoints: [
      'Sustains tribal economies through sustainable harvesting of Non-Timber Forest Products (NTFPs).',
      'Sacred Groves (Deorais, Kavu, Orans): Virgin forest patches protected by communities as abode of deities, serving as micro-refugia for endangered endemic species.',
      'Cultural cohesion: Social rituals, folklore, and festivals are intrinsically synchronized with biodiversity phenology.'
    ],
    vtuExamples: [
      'Sacred Groves of Western Ghats (Maharashtra & Kerala) and Meghalaya',
      'Bishnoi community of Rajasthan actively protecting Blackbuck and Khejri trees',
      'Tribal harvesting of Mahua flowers (Madhuca longifolia) and Tendu leaves'
    ],
    scientificTakeaway: 'Traditional social customs and sacred grove veneration have historically served as India’s most resilient community conservation institutions (VTU Syllabus Part 3.3).'
  },
  aesthetic: {
    id: 'aesthetic',
    title: 'Aesthetic Value — Natural Wonder & Ecotourism',
    subtitle: 'Wilderness beauty, landscape art, birdwatching, and revenue from ecotourism safaris',
    badge: 'VALUE 04 · AESTHETIC',
    badgeTheme: 'amber',
    image: '/images/bio-val-aesthetic.jpg',
    definition: 'Aesthetic value refers to the visual grandeur, emotional awe, and spiritual rejuvenation offered by pristine natural landscapes and diverse wildlife. It inspires literature, art, and poetry, while forming the foundation of the rapidly expanding global ecotourism economy.',
    stats: [
      { label: 'Ecotourism Growth', value: 'Fastest growing sector of global international travel' },
      { label: 'Mental Wellness', value: 'Immersion in biodiverse nature significantly reduces stress' },
      { label: 'Park Revenues', value: 'Millions of eco-tourists visit national parks annually' }
    ],
    keyPoints: [
      'Generates sustainable revenue and employment for local forest communities, tour guides, and artisans.',
      'Inspires conservation: human societies actively fight to preserve landscapes and species that evoke emotional wonder.',
      'Recreational activities: Wildlife safaris, birding, coral reef snorkeling, and nature photography.'
    ],
    vtuExamples: [
      'Kaziranga National Park safaris (One-horned Rhinoceros)',
      'Valley of Flowers National Park (UNESCO World Heritage Site in Uttarakhand)',
      'Lakshadweep and Andaman pristine coral reef diving reserves'
    ],
    scientificTakeaway: 'Ecotourism demonstrates that keeping wild species alive in their natural habitats yields vastly greater long-term economic dividends than harvesting them (VTU Syllabus Part 3.4).'
  },
  educational: {
    id: 'educational',
    title: 'Educational Value — Open-Air Laboratory of Science',
    subtitle: 'Evolutionary research, biomimetic engineering, biotechnology, and ecological literacy',
    badge: 'VALUE 05 · EDUCATIONAL',
    badgeTheme: 'amber',
    image: '/images/bio-val-educational.jpg',
    definition: 'Biodiversity functions as an irreplaceable, living laboratory for scientific research, academic education, and technological biomimicry. Every wild species has evolved ingenious biochemical adaptations and structural blueprints over millions of years of natural evolutionary testing.',
    stats: [
      { label: 'Biomimicry', value: 'Nature-inspired innovations across aerospace, materials & medicine' },
      { label: 'PCR Discovery', value: 'Taq polymerase from hot-spring bacteria enabled modern genetics' },
      { label: 'Research Scope', value: 'Bedrock of pharmacology, agronomy, ecology, and biochemistry' }
    ],
    keyPoints: [
      'Biomimicry: Engineering artificial technologies inspired by biological structures (e.g. kingfisher beak shaping bullet trains; shark skin reducing fluid drag).',
      'Understanding disease vectors and physiological pathways through comparative animal and microbial models.',
      'Environmental education: Teaches systems thinking and ecological stewardship to students and researchers.'
    ],
    vtuExamples: [
      'Darwin’s Galápagos finch observations yielding the foundation of evolutionary biology',
      'Thermus aquaticus (hot-spring bacterium) yielding heat-stable DNA polymerase for PCR',
      'Lotus leaf (Nelumbo nucifera) microscopic nanostructure inspiring self-cleaning paints'
    ],
    scientificTakeaway: 'Biodiversity represents 3.8 billion years of natural research and development. Eradicating a species is like burning an unread textbook of scientific breakthroughs (VTU Syllabus Part 3.5).'
  },
  ethical: {
    id: 'ethical',
    title: 'Ethical Value — The Inherent Right to Exist',
    subtitle: 'Biocentrism, intergenerational equity, stewardship, and the philosophical duty of Ahimsa',
    badge: 'VALUE 06 · ETHICAL',
    badgeTheme: 'blue',
    image: '/images/bio-val-ethical.jpg',
    definition: 'Ethical value asserts that every living species on Earth possesses an intrinsic right to exist, wholly independent of its immediate utilitarian or financial value to human beings. Humans, endowed with planetary dominance, have a profound moral duty of ecological stewardship.',
    stats: [
      { label: 'Philosophy', value: 'Biocentrism: All life forms hold intrinsic worth' },
      { label: 'Intergenerational Duty', value: 'Passing an intact, biodiverse planet to future generations' },
      { label: 'Indian Ethos', value: 'Ancient heritage of Ahimsa (non-harm) & Vasudhaiva Kutumbakam' }
    ],
    keyPoints: [
      'Rejects extreme anthropocentrism (viewing nature merely as a resource stockpile for human exploitation).',
      'Recognizes that all species are integral components of the interconnected web of life.',
      'Intergenerational equity: Denying future generations the privilege of experiencing wild tigers, whales, or ancient forests is an ethical injustice.'
    ],
    vtuExamples: [
      'Reverence for sacred trees: Peepal (Ficus religiosa) and Banyan (Ficus benghalensis)',
      'Jain and Buddhist philosophical traditions of unconditional compassion for all living beings',
      'Recent legal jurisprudence granting rivers (Ganges, Yamuna) the rights of living legal persons'
    ],
    scientificTakeaway: 'Every species has an intrinsic right to exist. Human survival is morally and practically inseparable from our duty to coexist peacefully with non-human life (VTU Syllabus Part 3.6).'
  }
};

export const MEDICINAL_PLANT_DETAILS: Record<string, ValueModalDetail> = {
  cinchona: {
    id: 'cinchona',
    title: 'Cinchona — Source of Quinine (Antimalarial)',
    subtitle: 'Cinchona officinalis / Cinchona calisaya (Family: Rubiaceae)',
    badge: 'ANTIMALARIAL ALKALOID',
    badgeTheme: 'emerald',
    image: '/images/bio-plant-cinchona.jpg',
    definition: 'Cinchona is an evergreen tree native to the Andean mountain cloud forests of South America. The bitter bark of Cinchona contains the potent alkaloid Quinine, which was historically the world’s first effective pharmaceutical treatment for malaria.',
    stats: [
      { label: 'Active Compound', value: 'Quinine & Quinidine (Alkaloids)' },
      { label: 'Clinical Target', value: 'Plasmodium falciparum (Malaria parasite)' },
      { label: 'Historical Impact', value: 'Saved tens of millions of human lives globally' }
    ],
    keyPoints: [
      'Mechanism of action: Interferes with the malaria parasite’s ability to digest hemoglobin in red blood cells, causing lethal toxic heme accumulation.',
      'Synthetic derivatives: Provided the molecular blueprint for modern synthetic antimalarials such as Chloroquine, Primaquine, and Mefloquine.',
      'Cultivation: Successfully transplanted and grown extensively in the Nilgiri hills of India and Darjeeling.'
    ],
    vtuExamples: [
      'Cinchona officinalis (Andean Rainforests & Nilgiri Hills)',
      'Quinine extracted from bark for malaria therapy',
      'Quinidine utilized as a cardiac anti-arrhythmic drug'
    ],
    scientificTakeaway: 'Quinine from Cinchona bark altered the course of human history and demonstrated the irreplaceable value of tropical plant biodiversity to medicine (VTU Syllabus Part 3.2).'
  },
  willow: {
    id: 'willow',
    title: 'Willow — Source of Salicin & Aspirin (Pain Relief)',
    subtitle: 'Salix alba (White Willow) (Family: Salicaceae)',
    badge: 'ANALGESIC & ANTI-INFLAMMATORY',
    badgeTheme: 'emerald',
    image: '/images/bio-plant-willow.jpg',
    definition: 'White Willow bark has been used since antiquity (recorded by Hippocrates in 400 BC) for fever and pain relief. The active glycoside Salicin is converted in the human liver into salicylic acid, leading to the pharmaceutical synthesis of Acetylsalicylic Acid (Aspirin).',
    stats: [
      { label: 'Active Compound', value: 'Salicin (Phenolic Glycoside)' },
      { label: 'Modern Drug', value: 'Aspirin (Acetylsalicylic Acid)' },
      { label: 'Global Usage', value: 'Over 40,000 metric tons consumed annually' }
    ],
    keyPoints: [
      'Mechanism: Irreversibly inhibits Cyclooxygenase (COX-1 and COX-2) enzymes, blocking the biosynthesis of inflammatory prostaglandins.',
      'Cardiovascular prophylaxis: Low-dose aspirin is taken globally by millions to inhibit platelet aggregation and prevent myocardial infarction and stroke.',
      'Natural origin: Direct proof of how indigenous ethnobotanical wisdom leads to the most widely used synthetic drug in human history.'
    ],
    vtuExamples: [
      'Salix alba (White Willow) bark extracts',
      'Acetylsalicylic acid (Aspirin)',
      'Antipyretic, analgesic and blood-thinning therapies'
    ],
    scientificTakeaway: 'Aspirin, synthesized from willow bark salicin, remains the single most widely consumed pharmaceutical drug in medical history (VTU Syllabus Part 3.2).'
  },
  foxglove: {
    id: 'foxglove',
    title: 'Foxglove — Source of Digitalis (Heart Medication)',
    subtitle: 'Digitalis purpurea (Purple Foxglove) (Family: Plantaginaceae)',
    badge: 'CARDIAC GLYCOSIDE',
    badgeTheme: 'amber',
    image: '/images/bio-plant-foxglove.jpg',
    definition: 'Foxglove is a biennial herbaceous flowering plant native to temperate Europe. Its leaves yield cardiac glycosides, primarily Digoxin and Digitoxin, which have served as standard emergency medical therapies for congestive heart failure and cardiac arrhythmias for centuries.',
    stats: [
      { label: 'Active Compound', value: 'Digitoxin & Digoxin (Cardiac Glycosides)' },
      { label: 'Clinical Target', value: 'Na+/K+-ATPase pump in myocardial tissue' },
      { label: 'Discovery', value: 'William Withering (1785 ethnobotanical study)' }
    ],
    keyPoints: [
      'Mechanism: Inhibits the sodium-potassium ATPase pump in cardiac cell membranes, increasing intracellular calcium ions and strengthening myocardial contractions.',
      'Narrow therapeutic index: Minute dosage adjustments distinguish life-saving cardiac stimulation from toxic cardiac arrest.',
      'Demonstrates the power of plant phytochemicals in targeting intricate ion pumps in human organ systems.'
    ],
    vtuExamples: [
      'Digitalis purpurea (Common Foxglove)',
      'Digoxin tablets and emergency intravenous injections',
      'Atrial fibrillation and congestive heart failure therapy'
    ],
    scientificTakeaway: 'Digitalis from foxglove revolutionized cardiology, proving that toxic wild botanical extracts can become life-saving cardiac drugs when precisely titrated (VTU Syllabus Part 3.2).'
  },
  periwinkle: {
    id: 'periwinkle',
    title: 'Madagascar Periwinkle — Vincristine & Vinblastine (Anti-Cancer)',
    subtitle: 'Catharanthus roseus / Vinca rosea (Family: Apocynaceae)',
    badge: 'ONCOLOGY CHEMOTHERAPY',
    badgeTheme: 'blue',
    image: '/images/bio-plant-periwinkle.jpg',
    definition: 'Madagascar Periwinkle is a perennial ornamental herb native to Madagascar, widely cultivated across India. Its leaves yield the vinca alkaloids Vincristine and Vinblastine, which are among the most powerful chemotherapeutic agents ever discovered for pediatric leukemia and lymphomas.',
    stats: [
      { label: 'Active Compounds', value: 'Vincristine & Vinblastine (Vinca Alkaloids)' },
      { label: 'Pediatric Cure Rate', value: 'Raised childhood leukemia survival from 10% to >90%' },
      { label: 'Clinical Target', value: 'Microtubule polymerization in mitotic spindle' }
    ],
    keyPoints: [
      'Mechanism: Binds to tubulin proteins in dividing cancer cells, disrupting the mitotic spindle and halting cancerous cellular division at metaphase.',
      'Miracle oncology drug: Transformed acute lymphoblastic leukemia (ALL) in children from a near-certain fatal diagnosis into a curable disease.',
      'Conservation lesson: If Madagascar’s coastal tropical forests had been fully cleared before 1950, this life-saving drug would have vanished forever.'
    ],
    vtuExamples: [
      'Catharanthus roseus (Sadabahar in Hindi)',
      'Vincristine chemotherapy for pediatric leukemia',
      'Vinblastine therapy for Hodgkin’s lymphoma'
    ],
    scientificTakeaway: 'Vincristine from the humble periwinkle raised childhood leukemia survival rates from 10% to over 90%, proving that tropical flora holds cures to deadly human cancers (VTU Syllabus Part 3.2).'
  },
  turmeric: {
    id: 'turmeric',
    title: 'Turmeric — Source of Curcumin (Anti-Inflammatory & Antioxidant)',
    subtitle: 'Curcuma longa (Family: Zingiberaceae)',
    badge: 'AYURVEDIC POLYPHENOL',
    badgeTheme: 'amber',
    image: '/images/bio-plant-turmeric.jpg',
    definition: 'Turmeric is a rhizomatous herbaceous perennial plant native to the Indian subcontinent. Its underground rhizomes yield Curcumin, a bright golden-yellow polyphenol celebrated in Ayurveda for thousands of years for its potent anti-inflammatory, antioxidant, and antimicrobial properties.',
    stats: [
      { label: 'Active Compound', value: 'Curcumin (Curcuminoid Polyphenol)' },
      { label: 'Tradition', value: 'Over 4,000 years of continuous Ayurvedic usage' },
      { label: 'Molecular Target', value: 'Suppresses NF-κB inflammatory pathway' }
    ],
    keyPoints: [
      'Mechanism: Potent inhibitor of NF-κB, COX-2, and inflammatory cytokines (TNF-α, IL-6), while scavenging free reactive oxygen radicals.',
      'Extensively researched for adjuvant cancer therapy, arthritis pain relief, and cognitive neuroprotection against Alzheimer’s amyloid plaques.',
      'India is the world’s largest producer, consumer, and exporter of turmeric.'
    ],
    vtuExamples: [
      'Curcuma longa rhizomes (Haridra in Sanskrit)',
      'Curcumin dietary supplements and topical antiseptic ointments',
      'Traditional golden milk (Haldi Doodh) for wound healing'
    ],
    scientificTakeaway: 'Curcumin confirms the ancient scientific validity of Indian traditional medicine, serving as a non-toxic natural anti-inflammatory agent (VTU Syllabus Part 3.2).'
  },
  neem: {
    id: 'neem',
    title: 'Neem — Source of Azadirachtin (Antimicrobial & Biopesticide)',
    subtitle: 'Azadirachta indica (Family: Meliaceae)',
    badge: 'NATURAL BIOPESTICIDE & MEDICINE',
    badgeTheme: 'emerald',
    image: '/images/bio-plant-neem.jpg',
    definition: 'Revered in India as the "Village Pharmacy" (Arishta in Sanskrit — meaning imperishable), Neem is a fast-growing evergreen tree. Its leaves, bark, and seeds contain Azadirachtin and nimbin, which exert broad-spectrum antibacterial, antifungal, antiviral, and antifeedant biopesticide activities.',
    stats: [
      { label: 'Active Compound', value: 'Azadirachtin (Tetranortriterpenoid Limonoid)' },
      { label: 'Insect Targets', value: 'Repels >400 species of agricultural pests' },
      { label: 'Safety Profile', value: 'Non-toxic to humans, bees, earthworms, and birds' }
    ],
    keyPoints: [
      'Mechanism: Disrupts insect ecdysone hormone systems, preventing metamorphosis, pupation, and egg-laying without creating chemical pesticide resistance.',
      'Dental & Dermatological care: Traditional neem twigs (datun) prevent oral dental plaque and periodontal bacterial infections.',
      'Global patent victory: India successfully overturned multinational patent attempts on neem, establishing international protection for traditional knowledge.'
    ],
    vtuExamples: [
      'Azadirachta indica (Neem tree)',
      'Cold-pressed Neem seed oil biopesticide',
      'Antimicrobial soaps, toothpaste, and herbal skin formulations'
    ],
    scientificTakeaway: 'Neem is nature’s ultimate biodegradable biopesticide and antimicrobial, proving that natural biodiversity can replace toxic synthetic agrochemicals (VTU Syllabus Part 3.2).'
  },
  aloe: {
    id: 'aloe',
    title: 'Aloe Vera — Source of Aloin (Skin Treatment & Wound Healing)',
    subtitle: 'Aloe barbadensis miller (Family: Asphodelaceae)',
    badge: 'DERMATOLOGICAL HEALING',
    badgeTheme: 'emerald',
    image: '/images/bio-plant-aloe.jpg',
    definition: 'Aloe Vera is a succulent, drought-resistant xeric plant widely cultivated in arid and tropical climates. Its thick mucilaginous leaf parenchyma contains Aloin and acemannan polysaccharides, celebrated across civilizations for accelerating dermal wound healing, burns, and epidermal hydration.',
    stats: [
      { label: 'Active Compounds', value: 'Aloin (Anthraquinone) & Acemannan (Polysaccharide)' },
      { label: 'Tissue Repair', value: 'Accelerates collagen synthesis & cellular regeneration' },
      { label: 'Commercial Value', value: 'Multi-billion dollar global cosmetic & dermatological market' }
    ],
    keyPoints: [
      'Mechanism: Stimulates fibroblast proliferation and epidermal growth factors, dramatically accelerating epithelial wound closure and soothing radiation burns.',
      'Anti-inflammatory: Inhibits the cyclooxygenase pathway and reduces prostaglandin synthesis in sunburned skin.',
      'Highly drought-resistant xerophytic metabolism (CAM photosynthesis) requiring minimal agricultural water.'
    ],
    vtuExamples: [
      'Aloe barbadensis miller (Ghritkumari in Ayurveda)',
      'Topical burn gels and cosmetic dermatological formulations',
      'Digestive tonics and wound healing dressings'
    ],
    scientificTakeaway: 'Aloe Vera illustrates the economic and medicinal potential of desert succulents, turning arid xeric adaptations into high-value dermatological therapies (VTU Syllabus Part 3.2).'
  }
};

interface PlantMedicineRow {
  id: string;
  plantName: string;
  image: string;
  activeCompound: string;
  drugUse: string;
}

const MEDICINAL_PLANTS: PlantMedicineRow[] = [
  {
    id: 'cinchona',
    plantName: 'Cinchona',
    image: '/images/bio-plant-cinchona.jpg',
    activeCompound: 'Quinine',
    drugUse: 'Anti-malarial'
  },
  {
    id: 'willow',
    plantName: 'Willow',
    image: '/images/bio-plant-willow.jpg',
    activeCompound: 'Salicin',
    drugUse: 'Aspirin (pain relief)'
  },
  {
    id: 'foxglove',
    plantName: 'Foxglove',
    image: '/images/bio-plant-foxglove.jpg',
    activeCompound: 'Digitalis',
    drugUse: 'Heart medication'
  },
  {
    id: 'periwinkle',
    plantName: 'Periwinkle',
    image: '/images/bio-plant-periwinkle.jpg',
    activeCompound: 'Vincristine',
    drugUse: 'Anti-cancer drug'
  },
  {
    id: 'turmeric',
    plantName: 'Turmeric',
    image: '/images/bio-plant-turmeric.jpg',
    activeCompound: 'Curcumin',
    drugUse: 'Anti-inflammatory'
  },
  {
    id: 'neem',
    plantName: 'Neem',
    image: '/images/bio-plant-neem.jpg',
    activeCompound: 'Azadirachtin',
    drugUse: 'Antimicrobial'
  },
  {
    id: 'aloe',
    plantName: 'Aloe Vera',
    image: '/images/bio-plant-aloe.jpg',
    activeCompound: 'Aloin',
    drugUse: 'Skin treatment'
  }
];

const KEY_TAKEAWAYS = [
  {
    icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" />,
    color: '#10b981',
    text: 'Biodiversity has ecological, economic, social, aesthetic, educational and ethical values.'
  },
  {
    icon: <Users className="w-3.5 h-3.5 text-amber-400" />,
    color: '#f59e0b',
    text: 'It provides essential goods and services that support human life and well-being.'
  },
  {
    icon: <Pill className="w-3.5 h-3.5 text-pink-400" />,
    color: '#ec4899',
    text: 'Medicinal plants have given us important drugs and continue to be a source of new discoveries.'
  },
  {
    icon: <Globe className="w-3.5 h-3.5 text-cyan-400" />,
    color: '#06b6d4',
    text: 'Conserving biodiversity ensures a healthier environment, stronger economies and a better future for generations.'
  }
];

export function BioValuesScreen({ onNavigateNext }: BioValuesScreenProps) {
  const [activeValueId, setActiveValueId] = useState<string>('ecological');
  const [selectedDetail, setSelectedDetail] = useState<ValueModalDetail | null>(null);

  // Airtight modal scroll lock, wheel routing, and Escape key handling
  useBioModalScrollLock(selectedDetail !== null, () => setSelectedDetail(null));

  const handleNextClick = () => {
    if (onNavigateNext) {
      onNavigateNext();
    } else {
      const el = document.getElementById('ch-threats');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bio-screen bio-values-section" id="ch-values">
      {/* Background Image Layer (Image 2) */}
      <div 
        className="bio-values-bg" 
        style={{ backgroundImage: `url('/images/bio-values-bg.jpg')` }}
      />
      
      {/* Soft Vignette Overlay */}
      <div className="bio-values-vignette" />

      <div className="bio-values-master-wrapper">
        {/* ===================================================================
            TOP HERO ROW: Title Block (Left) | 6-Values Wheel (Center) | Quote Card (Right)
            =================================================================== */}
        <div className="bio-values-hero-row">
          {/* 1. Left Title Block */}
          <div className="bio-values-hero-left">
            <div className="bio-values-badge-pill">
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>MODULE 04 &nbsp;|&nbsp; CHAPTER 03</span>
            </div>
            
            <h1 className="bio-values-title">
              Values of <span className="bio-values-title-highlight">Biodiversity</span>
            </h1>

            <h2 className="bio-values-subtitle">
              More Than Just a Variety of Life
            </h2>

            <p className="bio-values-lead">
              Biodiversity provides enormous value to human society, the environment and the economy. 
              It supports our survival, well-being and cultural heritage in multiple direct and indirect ways.
              Click any value card or medicinal plant to view rich academic case studies.
            </p>
          </div>

          {/* 2. Center 6-Values Orbital Wheel */}
          <div className="bio-values-hero-center">
            <div className="bio-wheel-stage">
              {/* Central Glowing 3D Earth Globe */}
              <div 
                className="bio-wheel-globe-wrap"
                onClick={() => setSelectedDetail(BIO_VALUES_MODAL_DETAILS['ecological'])}
                title="Click for Ecological Biosphere value"
                style={{ cursor: 'pointer' }}
              >
                <div className="bio-wheel-globe-glow" />
                <img 
                  src="/images/bio-earth-globe.png" 
                  alt="Earth Globe" 
                  className="bio-wheel-globe-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/bio-biosphere-globe.png';
                  }}
                />
              </div>

              {/* Orbital Ring Geometry */}
              <div className="bio-wheel-orbit-ring" />

              {/* 6 Radial Value Nodes */}
              {/* 1. Ecological (Top: 12 o'clock) */}
              <div 
                className={`bio-wheel-node node-top ${activeValueId === 'ecological' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveValueId('ecological');
                  setSelectedDetail(BIO_VALUES_MODAL_DETAILS['ecological']);
                }}
                onMouseEnter={() => setActiveValueId('ecological')}
                title="Click for Ecological Value details"
              >
                <div className="bio-wheel-node-badge color-eco">
                  <Leaf className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="bio-wheel-node-text text-center">
                  <span className="node-title">Ecological Value</span>
                  <span className="node-desc">Maintains life support systems</span>
                </div>
              </div>

              {/* 2. Economic (Top-Right: 2 o'clock) */}
              <div 
                className={`bio-wheel-node node-top-right ${activeValueId === 'economic' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveValueId('economic');
                  setSelectedDetail(BIO_VALUES_MODAL_DETAILS['economic']);
                }}
                onMouseEnter={() => setActiveValueId('economic')}
                title="Click for Economic Value details"
              >
                <div className="bio-wheel-node-badge color-econ">
                  <Coins className="w-4 h-4 text-amber-300" />
                </div>
                <div className="bio-wheel-node-text text-left">
                  <span className="node-title">Economic Value</span>
                  <span className="node-desc">Provides goods and services</span>
                </div>
              </div>

              {/* 3. Aesthetic (Bottom-Right: 4 o'clock) */}
              <div 
                className={`bio-wheel-node node-bottom-right ${activeValueId === 'aesthetic' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveValueId('aesthetic');
                  setSelectedDetail(BIO_VALUES_MODAL_DETAILS['aesthetic']);
                }}
                onMouseEnter={() => setActiveValueId('aesthetic')}
                title="Click for Aesthetic Value details"
              >
                <div className="bio-wheel-node-badge color-aes">
                  <Palette className="w-4 h-4 text-orange-300" />
                </div>
                <div className="bio-wheel-node-text text-left">
                  <span className="node-title">Aesthetic Value</span>
                  <span className="node-desc">Inspires art, culture and recreation</span>
                </div>
              </div>

              {/* 4. Educational (Bottom: 6 o'clock) */}
              <div 
                className={`bio-wheel-node node-bottom ${activeValueId === 'educational' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveValueId('educational');
                  setSelectedDetail(BIO_VALUES_MODAL_DETAILS['educational']);
                }}
                onMouseEnter={() => setActiveValueId('educational')}
                title="Click for Educational Value details"
              >
                <div className="bio-wheel-node-badge color-edu">
                  <BookOpen className="w-4 h-4 text-pink-300" />
                </div>
                <div className="bio-wheel-node-text text-center">
                  <span className="node-title">Educational Value</span>
                  <span className="node-desc">Source of knowledge and research</span>
                </div>
              </div>

              {/* 5. Social (Bottom-Left: 8 o'clock) */}
              <div 
                className={`bio-wheel-node node-bottom-left ${activeValueId === 'social' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveValueId('social');
                  setSelectedDetail(BIO_VALUES_MODAL_DETAILS['social']);
                }}
                onMouseEnter={() => setActiveValueId('social')}
                title="Click for Social Value details"
              >
                <div className="bio-wheel-node-badge color-soc">
                  <Users className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="bio-wheel-node-text text-right">
                  <span className="node-title">Social Value</span>
                  <span className="node-desc">Supports communities and livelihoods</span>
                </div>
              </div>

              {/* 6. Ethical (Top-Left: 10 o'clock) */}
              <div 
                className={`bio-wheel-node node-top-left ${activeValueId === 'ethical' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveValueId('ethical');
                  setSelectedDetail(BIO_VALUES_MODAL_DETAILS['ethical']);
                }}
                onMouseEnter={() => setActiveValueId('ethical')}
                title="Click for Ethical Value details"
              >
                <div className="bio-wheel-node-badge color-eth">
                  <Heart className="w-4 h-4 text-purple-300" />
                </div>
                <div className="bio-wheel-node-text text-right">
                  <span className="node-title">Ethical Value</span>
                  <span className="node-desc">Moral responsibility to protect life</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Right Quote Card */}
          <div className="bio-values-hero-right">
            <div className="bio-values-quote-card">
              <span className="bio-values-quote-mark">❝</span>
              <p className="bio-values-quote-text">
                Biodiversity is not just beautiful — it is invaluable. 
                It sustains ecosystems, supports livelihoods, inspires generations and holds solutions to many of our future challenges.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================
            MIDDLE SECTION: 6 Values Explained (Left) & Medicinal Plants Table (Right)
            =================================================================== */}
        <div className="bio-values-main-split">
          {/* LEFT: The Six Values Explained */}
          <div className="bio-explained-panel">
            <div className="bio-panel-heading">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <h3>The Six Values Explained (Click for details)</h3>
            </div>

            <div className="bio-six-cards-grid">
              {VALUES_DATA.map((val) => {
                const isActive = activeValueId === val.id;
                return (
                  <div
                    key={val.id}
                    className={`bio-horizontal-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveValueId(val.id);
                      setSelectedDetail(BIO_VALUES_MODAL_DETAILS[val.id]);
                    }}
                    style={{ '--card-tint': val.color, cursor: 'pointer' } as React.CSSProperties}
                    title={`Click to view comprehensive case study on ${val.name}`}
                  >
                    {/* Left 16:9 Image Thumbnail */}
                    <div className="bio-hcard-thumb-col">
                      <img 
                        src={val.image} 
                        alt={val.name} 
                        className="bio-hcard-img"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/bio-aerial-landscape.jpg';
                        }}
                      />
                      <div className="bio-hcard-overlay" />
                      <div className="bio-card-click-hint">
                        <Maximize2 size={11} className="text-white/90" />
                        <span>Details</span>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="bio-hcard-body">
                      <div className="bio-hcard-title-row">
                        <span 
                          className="bio-hcard-badge"
                          style={{ backgroundColor: `${val.color}25`, color: val.color, borderColor: `${val.color}60` }}
                        >
                          {val.badgeLabel || '•'}
                        </span>
                        <h4 className="bio-hcard-title">{val.name}</h4>
                      </div>

                      <ul className="bio-hcard-bullets">
                        {val.bullets.map((bullet, idx) => (
                          <li key={idx} className="bio-hcard-bullet-item">
                            <span className="bio-bullet-dot" style={{ backgroundColor: val.color }} />
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

          {/* RIGHT: Examples: Medicinal Plants and Drugs Table */}
          <div className="bio-plants-panel">
            <div className="bio-panel-heading">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <h3>Examples: Medicinal Plants &amp; Drugs (Click row for pharmacology)</h3>
            </div>

            <div className="bio-plants-table-box">
              <table className="bio-plants-table">
                <thead>
                  <tr>
                    <th style={{ width: '36%' }}>Plant</th>
                    <th style={{ width: '32%' }}>Active Compound</th>
                    <th style={{ width: '32%' }}>Drug / Use</th>
                  </tr>
                </thead>
                <tbody>
                  {MEDICINAL_PLANTS.map((plant, index) => (
                    <tr 
                      key={index} 
                      className="bio-plant-row"
                      onClick={() => setSelectedDetail(MEDICINAL_PLANT_DETAILS[plant.id])}
                      style={{ cursor: 'pointer' }}
                      title={`Click for clinical pharmacology of ${plant.plantName} (${plant.activeCompound})`}
                    >
                      <td>
                        <div className="bio-plant-name-cell">
                          <div className="bio-plant-icon-frame">
                            <img 
                              src={plant.image} 
                              alt={plant.plantName} 
                              className="bio-plant-icon-img"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/bio-flora-thumb.jpg';
                              }}
                            />
                          </div>
                          <span className="bio-plant-name-text">{plant.plantName}</span>
                        </div>
                      </td>
                      <td className="bio-plant-compound-cell">
                        {plant.activeCompound}
                      </td>
                      <td className="bio-plant-use-cell">
                        <span className="flex items-center justify-between">
                          <span>{plant.drugUse}</span>
                          <ArrowRight size={11} className="text-emerald-400/70 ml-1" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM SECTION: Key Takeaways Bar (Left) & Next Chapter Card (Right)
            =================================================================== */}
        <div className="bio-values-bottom-split">
          {/* Left: Key Takeaways */}
          <div className="bio-takeaways-panel">
            <div className="bio-takeaways-heading">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Key Takeaways</span>
            </div>

            <div className="bio-takeaways-pills-row">
              {KEY_TAKEAWAYS.map((takeaway, idx) => (
                <div key={idx} className="bio-takeaway-card">
                  <div 
                    className="bio-takeaway-icon-circle"
                    style={{ backgroundColor: `${takeaway.color}25`, borderColor: `${takeaway.color}50` }}
                  >
                    {takeaway.icon}
                  </div>
                  <p className="bio-takeaway-card-text">{takeaway.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Next Chapter Navigation Card */}
          <div className="bio-next-action-card">
            <div className="bio-next-thumb-frame">
              <img 
                src="/images/bio-aerial-landscape.jpg" 
                alt="Next Chapter" 
                className="bio-next-thumb-img"
              />
            </div>
            <div className="bio-next-body">
              <p className="bio-next-quote-text">
                Biodiversity enriches our lives in countless ways. Its value goes far beyond what we can measure.
              </p>
              <button 
                type="button" 
                className="bio-next-action-btn"
                onClick={handleNextClick}
              >
                <span>Continue to Next Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          INTERACTIVE DETAIL MODAL: CHAPTER 03 VALUES & MEDICINES
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
                    Overview & Scientific Context
                  </h4>
                  <p className="bio-types-modal-text">{selectedDetail.definition}</p>
                </div>

                {/* Key Points */}
                <div className="bio-types-modal-section">
                  <h4>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Key Mechanisms & Contributions
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

                {/* Representative Examples */}
                <div className="bio-types-modal-section">
                  <h4>
                    <Leaf className="w-3.5 h-3.5" />
                    Curriculum Benchmarks (VTU BCV755B Syllabus)
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

export default BioValuesScreen;
