export interface KeyProcess {
  id: string;
  iconName: 'ArrowDown' | 'Waves' | 'Droplets';
  title: string;
  color: string;
  bg: string;
  detailedText: string;
}

export interface CutawayIngressPoint {
  id: string;
  title: string;
  subtitle?: string;
  badgeType: 'sea' | 'extraction' | 'seawater' | 'wedge' | 'freshzone' | 'freshaquifer';
  color: string;
  pinX: number; // percentage
  pinY: number; // percentage
  description: string;
  salinityMetric: string;
  hydrogeologySpec: string;
}

export interface IngressFactor {
  id: string;
  title: string;
  iconName: 'Factory' | 'Compass' | 'CloudRain' | 'Waves' | 'Layers';
  color: string;
  bg: string;
  detail: string;
}

export interface IngressImpact {
  id: string;
  title: string;
  iconName: 'Droplet' | 'Sprout' | 'Pipette' | 'Building2' | 'Trees';
  color: string;
  bg: string;
  detail: string;
}

export interface CoastalStateRisk {
  name: string;
  rank: number;
  risk: 'High Risk' | 'Moderate Risk' | 'Low Risk';
  color: string;
  coastlineKm: string;
  salinityPPM: string;
  pinX: number;
  pinY: number;
  hotspots: string;
  description: string;
}

export interface IngressManagement {
  id: string;
  title: string;
  iconName: 'Gauge' | 'Layers' | 'Shield' | 'Activity' | 'Sprout' | 'FileText';
  color: string;
  bg: string;
  detail: string;
}

// ── 1. Key Processes (Bottom-Left in Hero Stage) ──
export const KEY_PROCESSES: KeyProcess[] = [
  {
    id: 'kp-1',
    iconName: 'ArrowDown',
    title: 'Lowering of groundwater levels due to over-extraction',
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.16)',
    detailedText:
      'Excessive pumping lowers the hydraulic head in coastal unconfined and semi-confined aquifers, reversing the natural seaward hydraulic gradient toward the land.',
  },
  {
    id: 'kp-2',
    iconName: 'Waves',
    title: 'Movement of seawater into coastal aquifers',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.16)',
    detailedText:
      'Dense saline marine water (1.025 g/cm³) migrates inland beneath buoyant freshwater (1.000 g/cm³), establishing an advancing saltwater intrusion wedge.',
  },
  {
    id: 'kp-3',
    iconName: 'Droplets',
    title: 'Increase in salinity of groundwater',
    color: '#4ade80',
    bg: 'rgba(74, 222, 128, 0.16)',
    detailedText:
      'Chloride ions penetrate irrigation and drinking water supply wells, elevating Total Dissolved Solids (TDS > 1,500 mg/L) and rendering water non-potable.',
  },
];

// ── 2. Interactive Geological Cutaway Overlay Badges ──
export const CUTAWAY_INGRESS_POINTS: CutawayIngressPoint[] = [
  {
    id: 'pt-sealevel',
    title: 'Sea Level Datum',
    subtitle: 'Hydrostatic Boundary',
    badgeType: 'sea',
    color: '#38bdf8',
    pinX: 46.8,
    pinY: 27.2,
    description:
      'The mean sea level acts as the regional hydrostatic boundary head (h = 0). Under pristine equilibrium, freshwater head exceeds sea level, keeping saltwater offshore.',
    salinityMetric: 'TDS: 35,000 mg/L (Standard Ocean Salinity)',
    hydrogeologySpec: 'Seawater density ρs = 1.025 g/cm³ vs Freshwater ρf = 1.000 g/cm³',
  },
  {
    id: 'pt-extraction',
    title: 'Excessive Groundwater Extraction',
    subtitle: 'Induced Cone of Depression',
    badgeType: 'extraction',
    color: '#ef4444',
    pinX: 66.0,
    pinY: 21.8,
    description:
      'Over-pumping from multiple coastal tube wells creates overlapping cones of depression, steepening the reverse hydraulic gradient that actively draws seawater inland.',
    salinityMetric: 'Extraction Rate: Exceeds Safe Aquifer Yield by 180%',
    hydrogeologySpec: 'Ghyben-Herzberg Principle: 1 m freshwater head drop = 40 m saltwater rise',
  },
  {
    id: 'pt-seawater',
    title: 'Seawater (higher salinity)',
    subtitle: 'High Density Marine Front',
    badgeType: 'seawater',
    color: '#f87171',
    pinX: 48.0,
    pinY: 51.5,
    description:
      'Marine water saturating coastal foreshore sediments has high chloride and sodium concentrations, driving aggressive cation exchange with clay minerals in coastal aquifers.',
    salinityMetric: 'Chloride (Cl⁻): > 19,000 mg/L',
    hydrogeologySpec: 'Electrical Conductivity (EC): 45,000 – 55,000 µS/cm',
  },
  {
    id: 'pt-wedge',
    title: 'Saltwater Intrusion (saltwater wedge)',
    subtitle: 'Hydrodynamic Dispersion Zone',
    badgeType: 'wedge',
    color: '#fb7185',
    pinX: 64.0,
    pinY: 52.0,
    description:
      'The transition interface where saltwater forms a parabolic wedge beneath lighter freshwater. Upconing occurs directly beneath over-pumped well screens.',
    salinityMetric: 'Transition Zone TDS: 1,500 – 10,000 mg/L',
    hydrogeologySpec: 'Wedge Toe Inland Penetration: Up to 12 km in Saurashtra & Minjur',
  },
  {
    id: 'pt-freshzone',
    title: 'Freshwater Zone (lower salinity)',
    subtitle: 'Recharged Coastal Lens',
    badgeType: 'freshzone',
    color: '#60a5fa',
    pinX: 91.0,
    pinY: 38.0,
    description:
      'Shallow unconfined freshwater lens supported by local rainfall infiltration and inland recharge mounds. Pressure here holds the saltwater wedge at bay when maintained.',
    salinityMetric: 'Chloride (Cl⁻): < 250 mg/L (Safe Potable)',
    hydrogeologySpec: 'Hydraulic Head: +1.5 to +4.0 m above Mean Sea Level',
  },
  {
    id: 'pt-freshaquifer',
    title: 'Freshwater Aquifer (lower salinity)',
    subtitle: 'Deep Semi-Confined Strata',
    badgeType: 'freshaquifer',
    color: '#38bdf8',
    pinX: 92.5,
    pinY: 54.0,
    description:
      'Deep sandy gravel aquifer strata that store critical freshwater reserves for agriculture, industries, and domestic supply across coastal settlements.',
    salinityMetric: 'TDS: 300 – 600 mg/L (High Purity)',
    hydrogeologySpec: 'Transmissivity: 500 – 1,800 m²/day in alluvial sediments',
  },
];

// ── 3. Card 1: Factors Influencing Seawater Ingress ──
export const FACTORS_INFLUENCING_ITEMS: IngressFactor[] = [
  {
    id: 'factor-1',
    title: 'Excessive groundwater extraction',
    iconName: 'Factory',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.16)',
    detail:
      'Unrestricted motorized pumping for irrigation, hotels, and coastal townships drastically lowers the water table, creating a landward hydraulic suction gradient.',
  },
  {
    id: 'factor-2',
    title: 'Proximity to the coastline',
    iconName: 'Compass',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.16)',
    detail:
      'Aquifers located within 0 – 10 km of the high tide mark face immediate hydrostatic pressure vulnerability whenever the freshwater head declines.',
  },
  {
    id: 'factor-3',
    title: 'Low natural recharge',
    iconName: 'CloudRain',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.16)',
    detail:
      'Erratic monsoon rainfall, rapid surface runoff to the sea, and paving over coastal watersheds severely restrict natural rainwater replenishment of the freshwater lens.',
  },
  {
    id: 'factor-4',
    title: 'Sea level rise (climate change)',
    iconName: 'Waves',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.16)',
    detail:
      'Global warming-induced sea level rise raises the baseline marine hydraulic head, pushing the saline interface further inland even under static groundwater pumping rates.',
  },
  {
    id: 'factor-5',
    title: 'High aquifer permeability',
    iconName: 'Layers',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.16)',
    detail:
      'Coarse sand, coastal alluvium, and fractured limestone formations offer low hydraulic resistance, allowing rapid inland migration of the dense saltwater wedge.',
  },
];

// ── 4. Card 2: Impacts of Seawater Ingress ──
export const IMPACTS_ITEMS: IngressImpact[] = [
  {
    id: 'impact-1',
    title: 'Degradation of groundwater quality (increased salinity)',
    iconName: 'Droplet',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.16)',
    detail:
      'Salinization elevates electrical conductivity and total dissolved solids well beyond WHO/BIS drinking limits (TDS > 2,000 ppm), spoiling freshwater reserves permanently.',
  },
  {
    id: 'impact-2',
    title: 'Loss of agricultural productivity',
    iconName: 'Sprout',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.16)',
    detail:
      'Irrigating with saline groundwater induces soil sodicity, burns crop roots, stunts vegetative growth, and leads to abandonment of fertile coastal agricultural land.',
  },
  {
    id: 'impact-3',
    title: 'Unusable water for drinking and domestic purposes',
    iconName: 'Pipette',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.16)',
    detail:
      'Coastal villages experience acute drinking water crises, forcing reliance on expensive water tankers, long-distance pipelines, and energy-intensive desalination.',
  },
  {
    id: 'impact-4',
    title: 'Damage to industrial processes and infrastructure',
    iconName: 'Building2',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.16)',
    detail:
      'High chloride concentrations corrode steel pipes, boilers, concrete foundations, and industrial machinery, causing premature structural decay and high replacement costs.',
  },
  {
    id: 'impact-5',
    title: 'Ecosystem disruption in coastal areas (mangroves, wetlands)',
    iconName: 'Trees',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.16)',
    detail:
      'Excessive interstitial salinity damages delicate brackish water biodiversity, kills sensitive freshwater flora, and degrades coastal mangrove nurseries and bird sanctuaries.',
  },
];

// ── 5. Card 3: Regions at Risk in India (Major Affected Coastal States) ──
export const COASTAL_RISK_STATES: CoastalStateRisk[] = [
  {
    name: 'Gujarat',
    rank: 1,
    risk: 'High Risk',
    color: '#ef4444',
    coastlineKm: '1,600 km',
    salinityPPM: '3,200 – 8,500 PPM',
    pinX: 205,
    pinY: 750,
    hotspots: 'Saurashtra Coast, Junagadh, Kutch & Gulf of Khambhat',
    description:
      'Extensive cash crop irrigation (groundnut & cotton) has drawn seawater up to 10 – 15 km inland in Saurashtra, turning hundreds of coastal tube wells permanently saline.',
  },
  {
    name: 'Maharashtra',
    rank: 2,
    risk: 'High Risk',
    color: '#ef4444',
    coastlineKm: '720 km',
    salinityPPM: '2,500 – 6,000 PPM',
    pinX: 350,
    pinY: 920,
    hotspots: 'Mumbai Metropolitan, Vasai-Virar, Raigad & Ratnagiri',
    description:
      'Massive urbanization and industrial demand in the Konkan belt have lowered coastal water tables below sea level, causing severe tidal ingress along creek aquifers.',
  },
  {
    name: 'Goa',
    rank: 3,
    risk: 'Moderate Risk',
    color: '#f97316',
    coastlineKm: '105 km',
    salinityPPM: '1,800 – 4,200 PPM',
    pinX: 330,
    pinY: 1100,
    hotspots: 'Salcete, Bardez & Zuari-Mandovi Coastal Belts',
    description:
      'Concentrated beach resort pumping and iron ore pit dewatering have accelerated saline intrusion along fragile coastal sand dunes and laterite aquifers.',
  },
  {
    name: 'Karnataka',
    rank: 4,
    risk: 'Moderate Risk',
    color: '#f97316',
    coastlineKm: '320 km',
    salinityPPM: '1,600 – 3,800 PPM',
    pinX: 390,
    pinY: 1150,
    hotspots: 'Mangaluru, Udupi & Uttara Kannada Coast',
    description:
      'Post-monsoon extraction in coastal alluvial pockets causes seasonal upconing of brackish water in shallow domestic open wells.',
  },
  {
    name: 'Kerala',
    rank: 5,
    risk: 'Moderate Risk',
    color: '#f97316',
    coastlineKm: '580 km',
    salinityPPM: '1,500 – 3,500 PPM',
    pinX: 425,
    pinY: 1340,
    hotspots: 'Vembanad Estuary, Alappuzha, Kochi & Kollam',
    description:
      'Interconnected backwater lagoons and tidal rivers push seawater deep into barrier islands during low summer river discharges.',
  },
  {
    name: 'Tamil Nadu',
    rank: 6,
    risk: 'High Risk',
    color: '#ef4444',
    coastlineKm: '1,076 km',
    salinityPPM: '2,800 – 7,500 PPM',
    pinX: 535,
    pinY: 1320,
    hotspots: 'Minjur Aquifer (North Chennai), Cuddalore & Ramanathapuram',
    description:
      'The Minjur aquifer near Chennai is India’s classic case study where over-pumping caused the seawater wedge to advance over 10 km inland before barrier recharge was introduced.',
  },
  {
    name: 'Andhra Pradesh',
    rank: 7,
    risk: 'Moderate Risk',
    color: '#f97316',
    coastlineKm: '974 km',
    salinityPPM: '1,800 – 4,500 PPM',
    pinX: 630,
    pinY: 1040,
    hotspots: 'Krishna-Godavari Deltas, Visakhapatnam & Nellore',
    description:
      'Extensive aquaculture (shrimp ponds) and intensive deltaic agriculture have contaminated shallow coastal freshwater pockets with saline seepage.',
  },
  {
    name: 'Odisha',
    rank: 8,
    risk: 'Moderate Risk',
    color: '#f97316',
    coastlineKm: '480 km',
    salinityPPM: '1,400 – 3,200 PPM',
    pinX: 815,
    pinY: 865,
    hotspots: 'Chilika Lagoon Perimeter, Puri Coast & Kendrapara',
    description:
      'Storm surges from frequent Bay of Bengal cyclones combined with localized extraction push saltwater into coastal alluvial unconfined aquifers.',
  },
  {
    name: 'West Bengal',
    rank: 9,
    risk: 'Low Risk',
    color: '#06b6d4',
    coastlineKm: '158 km',
    salinityPPM: '1,200 – 2,800 PPM',
    pinX: 980,
    pinY: 790,
    hotspots: 'Sundarbans Delta, Digha & South 24 Parganas',
    description:
      'Tidal rivers carry marine salinity deep inland across mangrove islands; freshwater is restricted to deeper confined aquifers (> 250 m depth).',
  },
];

// ── 6. Card 4: Management and Prevention ──
export const MANAGEMENT_PREVENTION_ITEMS: IngressManagement[] = [
  {
    id: 'mgmt-1',
    title: 'Regulate and control groundwater extraction',
    iconName: 'Gauge',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.16)',
    detail:
      'Enforce strict regulatory quotas on coastal tube well depths, spacing, and pumping schedules to maintain freshwater hydrostatic head above sea level.',
  },
  {
    id: 'mgmt-2',
    title: 'Artificial recharge (recharge wells, percolation tanks)',
    iconName: 'Layers',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.16)',
    detail:
      'Inject treated surface water and harvested rainwater into coastal injection wells to build a freshwater pressure ridge that pushes back the saline wedge.',
  },
  {
    id: 'mgmt-3',
    title: 'Subsurface barriers and cutoff walls',
    iconName: 'Shield',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.16)',
    detail:
      'Construct impermeable underground slurry cutoff walls, sheet pile diaphragms, or grout curtains along the coastline to physically block seawater penetration.',
  },
  {
    id: 'mgmt-4',
    title: 'Monitoring of groundwater levels and salinity',
    iconName: 'Activity',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.16)',
    detail:
      'Install automated telemetry piezometers and electrical conductivity sensors along coastal monitoring transects for early detection of wedge movement.',
  },
  {
    id: 'mgmt-5',
    title: 'Integrated coastal zone management',
    iconName: 'Sprout',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.16)',
    detail:
      'Harmonize land-use zoning, mangrove shelterbelt conservation, and coastal aquaculture restrictions within comprehensive watershed master plans.',
  },
  {
    id: 'mgmt-6',
    title: 'Policy and regulatory measures',
    iconName: 'FileText',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.16)',
    detail:
      'Implement Central Ground Water Authority (CGWA) coastal notifications, mandatory rainwater harvesting permits, and tariffs discouraging over-extraction.',
  },
];
