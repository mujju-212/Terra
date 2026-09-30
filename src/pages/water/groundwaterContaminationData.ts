export interface ContaminationSource {
  id: string;
  name: string;
  category: string;
  badgeSub: string;
  color: string;
  glowColor: string;
  borderColor: string;
  // Pin coordinate percentages on the 3D cutaway landscape
  pinX: number; // percentage from left
  pinY: number; // percentage from top
  // Seepage arrow direction and targets
  arrowPath: string;
  description: string;
  pollutants: string[];
  healthEffects: string;
  managementAction: string;
}

export interface StrataCallout {
  id: string;
  label: string;
  sublabel: string;
  pinX: number; // percentage
  pinY: number; // percentage
  depthDescription: string;
}

export interface ContaminantInfo {
  symbol: string;
  name: string;
  badgeBg: string;
  badgeText: string;
  isCustomBadge?: boolean;
  iconName?: 'Biohazard' | 'FlaskConical';
  majorSources: string;
  effects: string;
  acceptableLimit: string;
  indianHotspots: string;
}

export interface ContaminationImpact {
  id: string;
  title: string;
  description: string;
  iconName: 'Heart' | 'Leaf' | 'Droplets' | 'Coins' | 'ShieldAlert';
  color: string;
  accentBg: string;
  extendedDetail: string;
}

export interface PreventionMeasure {
  id: string;
  title: string;
  iconName: 'ShieldCheck' | 'Sprout' | 'Factory' | 'Activity' | 'Shield' | 'Users';
  color: string;
  accentBg: string;
  summary: string;
}

// 4 Interactive Sources located across the surface landscape
export const CONTAMINATION_SOURCES: ContaminationSource[] = [
  {
    id: 'agricultural-runoff',
    name: 'Agricultural Runoff',
    category: 'Non-Point Agricultural',
    badgeSub: '(fertilizers & pesticides)',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.45)',
    borderColor: '#4ade80',
    pinX: 41.5,
    pinY: 22.0,
    arrowPath: '',
    description:
      'Excess synthetic nitrogen, phosphorus fertilizers, organophosphates, and herbicides wash into unsaturated topsoil during irrigation and heavy rainfall, percolating into regional aquifers.',
    pollutants: ['Nitrates (NO3-)', 'Phosphates (PO4 3-)', 'Atrazine & Organochlorines', 'Pesticide metabolites'],
    healthEffects: 'Causes methemoglobinemia (blue baby syndrome), endocrine disruption, and chronic renal stress.',
    managementAction: 'Promotion of precision micro-dosing, slow-release bio-fertilizers, and integrated pest management (IPM).',
  },
  {
    id: 'industrial-waste',
    name: 'Industrial Waste',
    category: 'Point Industrial Source',
    badgeSub: '(heavy metals, chemicals)',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    borderColor: '#f87171',
    pinX: 56.5,
    pinY: 17.5,
    arrowPath: '',
    description:
      'Untreated manufacturing effluents, chemical discharges, sludge ponds, and industrial sumps leach toxic heavy metals and solvent hydrocarbons directly into underlying rock fractures.',
    pollutants: ['Chromium (Cr VI)', 'Lead (Pb)', 'Mercury (Hg)', 'Cadmium & Solvents (TCE, Benzene)'],
    healthEffects: 'Severe carcinogenic risk, neurological degradation, organ failure, and irreversible DNA lesions.',
    managementAction: 'Mandatory Zero Liquid Discharge (ZLD) plants, heavy metal precipitation, and closed-circuit recycling.',
  },
  {
    id: 'landfill-leachate',
    name: 'Landfill Leachate',
    category: 'Point Municipal Source',
    badgeSub: '(solid waste)',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    borderColor: '#c084fc',
    pinX: 69.2,
    pinY: 23.5,
    arrowPath: '',
    description:
      'Rainwater percolating through unlined municipal dumps dissolves decomposing organic and inorganic matter, forming concentrated toxic, black leachate that migrates downward.',
    pollutants: ['Dissolved organic carbon', 'Ammoniacal nitrogen', 'Chlorinated organic compounds', 'Heavy metals (Zn, Ni)'],
    healthEffects: 'Acute gastrointestinal toxicity, foul odor, groundwater de-oxygenation, and severe microbial proliferation.',
    managementAction: 'Engineered landfills with double geomembrane liners, active leachate collection, and biological filtration.',
  },
  {
    id: 'septic-tanks',
    name: 'Septic Tanks',
    category: 'Non-Point Domestic Source',
    badgeSub: '(nitrates & pathogens)',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    borderColor: '#fbbf24',
    pinX: 91.0,
    pinY: 42.0,
    arrowPath: '',
    description:
      'Poorly constructed, unsealed, or densely clustered domestic septic pits and soakaways seep raw fecal coliforms, enteric viruses, and dissolved ammonia into shallow groundwater zones.',
    pollutants: ['Escherichia coli & Coliforms', 'Salmonella & Rotavirus', 'Nitrates & Ammonium', 'Surfactants & Detergents'],
    healthEffects: 'High incidence of waterborne diarrheal epidemics, typhoid fever, hepatitis, and infant dehydration.',
    managementAction: 'Standardized sealed septic containment, decentralized faecal sludge treatment plants, and sewer grids.',
  },
];

// Left geological strata callout pills
export const STRATA_CALLOUTS: StrataCallout[] = [
  {
    id: 'soil-layer',
    label: 'Soil layer',
    sublabel: '(unsaturated zone)',
    pinX: 24,
    pinY: 54.0,
    depthDescription: 'The aeration zone where soil pores contain both air and moisture; primary natural attenuation barrier.',
  },
  {
    id: 'water-table',
    label: 'Water table',
    sublabel: '',
    pinX: 24,
    pinY: 61.0,
    depthDescription: 'The fluctuating upper surface boundary of the saturated zone where pore water pressure equals atmospheric pressure.',
  },
  {
    id: 'aquifer',
    label: 'Aquifer',
    sublabel: '(saturated zone)',
    pinX: 24,
    pinY: 68.0,
    depthDescription: 'Permeable geological formation (sand, gravel, fractured basalt) completely saturated with slowly flowing groundwater.',
  },
];

// Bottom Card 1: Types of Contamination (Geogenic vs Anthropogenic)
export const CONTAMINATION_TYPES = {
  geogenic: {
    title: 'Geogenic Contamination',
    subtitle: '(natural sources)',
    color: '#f59e0b',
    description: 'Pollutants originating from natural dissolution of mineral rocks, geological weathering, and geothermal activity.',
    items: [
      { name: 'Arsenic (As)', note: 'Dissolution of arsenic-bearing pyrites in Ganga-Brahmaputra alluvial deposits' },
      { name: 'Fluoride (F)', note: 'Leaching of fluorite, apatite, and hornblende minerals in granite/gneiss basements' },
      { name: 'Iron (Fe)', note: 'Weathering of ferruginous minerals in laterite and acid soils' },
      { name: 'Nitrate (natural sources)', note: 'Atmospheric fixation and natural organic mineralization' },
      { name: 'Salinity', note: 'Inherent marine palaeo-sediments and mineral evaporites in arid zones' },
      { name: 'Other trace elements', note: 'Uranium, selenium, boron, and manganese in selected rock strata' },
    ],
  },
  anthropogenic: {
    title: 'Anthropogenic Contamination',
    subtitle: '(human activities)',
    color: '#ef4444',
    description: 'Pollutants introduced directly or indirectly by human municipal, industrial, agricultural, and domestic actions.',
    items: [
      { name: 'Agricultural chemicals', note: 'Heavy runoff of chemical fertilizers (NPK) and pesticide formulations' },
      { name: 'Industrial effluents', note: 'Discharge of toxic electroplating acids, heavy metals, and dyes without ZLD' },
      { name: 'Sewage and septic waste', note: 'Leakage from soak-pits, pit latrines, and unlined open urban sewer drains' },
      { name: 'Landfill leachate', note: 'Percolation of toxic liquor from unsegregated, unlined garbage dumpsites' },
      { name: 'Oil and fuel spills', note: 'Underground storage tank (UST) leaks, pipeline bursts, and automotive runoff' },
      { name: 'Urban and domestic waste', note: 'Synthetic detergents, microplastics, and pharmaceutical residues' },
    ],
  },
};

// Bottom Card 2: Common Contaminants and Sources Table (1:1 with reference)
export const COMMON_CONTAMINANTS: ContaminantInfo[] = [
  {
    symbol: 'As',
    name: 'Arsenic',
    badgeBg: '#ef4444',
    badgeText: '#ffffff',
    majorSources: 'Natural geology',
    effects: 'Cancer, skin lesions, organ damage',
    acceptableLimit: '0.01 mg/L (BIS 10500)',
    indianHotspots: 'West Bengal, Bihar, Assam, Eastern UP (Ganga plains)',
  },
  {
    symbol: 'F',
    name: 'Fluoride',
    badgeBg: '#8b5cf6',
    badgeText: '#ffffff',
    majorSources: 'Natural geology, industrial waste',
    effects: 'Dental fluorosis, bone fluorosis',
    acceptableLimit: '1.0 - 1.5 mg/L',
    indianHotspots: 'Rajasthan, Gujarat, Andhra Pradesh, Telangana, Karnataka',
  },
  {
    symbol: 'NO₃',
    name: 'Nitrates',
    badgeBg: '#22c55e',
    badgeText: '#ffffff',
    majorSources: 'Fertilizers, septic tanks',
    effects: 'Methemoglobinemia (blue baby syndrome)',
    acceptableLimit: '45 mg/L',
    indianHotspots: 'Punjab, Haryana, Western UP, Tamil Nadu agricultural belts',
  },
  {
    symbol: 'Pb',
    name: 'Lead',
    badgeBg: '#3b82f6',
    badgeText: '#ffffff',
    majorSources: 'Industrial waste, pipelines',
    effects: 'Neurological disorders',
    acceptableLimit: '0.01 mg/L',
    indianHotspots: 'Industrial clusters in Maharashtra, Delhi-NCR, Gujarat',
  },
  {
    symbol: 'Hg',
    name: 'Mercury',
    badgeBg: '#f59e0b',
    badgeText: '#ffffff',
    majorSources: 'Industrial effluents, mining',
    effects: 'Nervous system damage',
    acceptableLimit: '0.001 mg/L',
    indianHotspots: 'Chlor-alkali, thermal power ash sumps, mining belts',
  },
  {
    symbol: 'Bio',
    name: 'Pathogens',
    badgeBg: '#dc2626',
    badgeText: '#ffffff',
    isCustomBadge: true,
    iconName: 'Biohazard',
    majorSources: 'Sewage, septic tanks',
    effects: 'Waterborne diseases',
    acceptableLimit: '0 CFU / 100 mL (E. coli)',
    indianHotspots: 'Dense peri-urban settlements and flood-prone lowlands nationwide',
  },
  {
    symbol: 'Pest',
    name: 'Pesticides',
    badgeBg: '#06b6d4',
    badgeText: '#ffffff',
    isCustomBadge: true,
    iconName: 'FlaskConical',
    majorSources: 'Agricultural runoff',
    effects: 'Endocrine disruption, chronic health',
    acceptableLimit: '< 0.0001 mg/L (Individual)',
    indianHotspots: 'Cotton, paddy, and intensive horticulture belts in Malwa & South India',
  },
];

// Bottom Card 3: Impacts of Contamination (5 Circular rows)
export const CONTAMINATION_IMPACTS: ContaminationImpact[] = [
  {
    id: 'human-health',
    title: 'Human Health',
    description: 'Cancer, neurological disorders, fluorosis, waterborne diseases',
    iconName: 'Heart',
    color: '#ef4444',
    accentBg: 'rgba(239, 68, 68, 0.16)',
    extendedDetail:
      'Over 200 million people across 20+ states live in districts where groundwater exceeds safety limits for arsenic, fluoride, nitrate, or heavy metals, inducing chronic multi-generational morbidity.',
  },
  {
    id: 'ecosystems',
    title: 'Ecosystems',
    description: 'Harm to aquatic life and wetland ecosystems',
    iconName: 'Leaf',
    color: '#22c55e',
    accentBg: 'rgba(34, 197, 94, 0.16)',
    extendedDetail:
      'Baseflow seepage of contaminated groundwater into streams and marshes causes toxic bioaccumulation across trophic chains, eutrophic algae blooms, and loss of native wetland biodiversity.',
  },
  {
    id: 'water-usability',
    title: 'Water Usability',
    description: 'Makes water unsafe for drinking, irrigation and industry',
    iconName: 'Droplets',
    color: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.16)',
    extendedDetail:
      'Salinized or metal-laden water corrodes industrial cooling tubes, causes severe soil sodicity and crop stunting, and renders municipal supply pumps toxic without cost-prohibitive reverse osmosis.',
  },
  {
    id: 'economic-impact',
    title: 'Economic Impact',
    description: 'Increased treatment costs and loss of productivity',
    iconName: 'Coins',
    color: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.16)',
    extendedDetail:
      'India expends billions of dollars annually managing waterborne illnesses, loss of working person-hours, drilling progressively deeper unaffected wells, and funding specialized de-fluoridation plants.',
  },
  {
    id: 'long-term-risk',
    title: 'Long-term Risk',
    description: 'Persistent contaminants are difficult and costly to remove',
    iconName: 'ShieldAlert',
    color: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.16)',
    extendedDetail:
      'Because groundwater velocity is extremely sluggish (meters per year) and deep rock fractures lack sunlight and aeration, in-situ aquifer contamination persists for centuries even after surface cessation.',
  },
];

// Bottom Card 4: Prevention and Management (6 Icon items)
export const PREVENTION_MEASURES: PreventionMeasure[] = [
  {
    id: 'waste-disposal',
    title: 'Proper waste disposal and efficient sewage treatment',
    iconName: 'ShieldCheck',
    color: '#22c55e',
    accentBg: 'rgba(34, 197, 94, 0.18)',
    summary: 'Ensuring 100% biological and chemical processing of domestic sewage and strict lining of municipal solid waste landfills.',
  },
  {
    id: 'fertilizer-rationing',
    title: 'Rational use of fertilizers and pesticides',
    iconName: 'Sprout',
    color: '#84cc16',
    accentBg: 'rgba(132, 204, 22, 0.18)',
    summary: 'Soil-health card-based balanced nutrient application, organic composting, and avoidance of hazardous synthetic pesticides.',
  },
  {
    id: 'effluent-treatment',
    title: 'Treatment of industrial effluents before discharge',
    iconName: 'Factory',
    color: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.18)',
    summary: 'Mandating Common Effluent Treatment Plants (CETPs) with real-time online monitoring and closed-loop water reuse.',
  },
  {
    id: 'gw-monitoring',
    title: 'Regular monitoring of groundwater quality',
    iconName: 'Activity',
    color: '#c084fc',
    accentBg: 'rgba(192, 132, 252, 0.18)',
    summary: 'Quarterly sensor profiling of heavy metals, fluoride, and microbiological parameters by CGWB and State pollution control boards.',
  },
  {
    id: 'recharge-protection',
    title: 'Protection of recharge zones and well heads',
    iconName: 'Shield',
    color: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.18)',
    summary: 'Demarcating statutory sanitary protection perimeters around public drinking borewells and natural infiltration wetlands.',
  },
  {
    id: 'policy-awareness',
    title: 'Policy, regulation and community awareness',
    iconName: 'Users',
    color: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.18)',
    summary: 'Enforcing the Central Ground Water Authority (CGWA) guidelines, community water testing kits, and village sanitation committees.',
  },
];
