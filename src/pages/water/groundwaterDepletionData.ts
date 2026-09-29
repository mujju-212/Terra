// Data model for Chapter 14: Groundwater Depletion
// Matches User Reference Mockup with extreme fidelity

export interface DepletionCause {
  id: string;
  title: string;
  color: string;
  bg: string;
  iconName: 'Sprout' | 'Building2' | 'Sun' | 'Droplets';
  detail: string;
}

export interface AffectedState {
  rank: number;
  name: string;
  stateId: string;
  severity: 'high' | 'moderate' | 'low';
  color: string;
  extractionRate: string;
  category: string;
  details: string;
  pinX: number;
  pinY: number;
}

export interface TrendDataPoint {
  year: number;
  depth: number; // in meters below ground level
}

export interface DepletionImpact {
  id: string;
  title: string;
  color: string;
  bg: string;
  iconName: 'Droplets' | 'Sprout' | 'Layers' | 'Trees' | 'TrendingUp' | 'Users';
  detail: string;
}

export interface DepletionSolution {
  id: string;
  text: string;
  detail: string;
}

export interface CutawayCallout {
  id: string;
  badgeText: string;
  type: 'danger' | 'info';
  pinX: number; // %
  pinY: number; // %
  title: string;
  description: string;
}

// 4 Key Causes of Groundwater Depletion
export const DEPLETION_CAUSES: DepletionCause[] = [
  {
    id: 'agriculture',
    title: 'Over-extraction for agriculture',
    color: '#4ade80',
    bg: 'rgba(34, 197, 94, 0.22)',
    iconName: 'Sprout',
    detail: 'Over 85% of India’s pumped groundwater is absorbed by agriculture. Subsidized electricity and tubewells have driven intensive flood-irrigation of thirsty crops like paddy and sugarcane in semi-arid zones.',
  },
  {
    id: 'urbanization',
    title: 'Urbanization and industrial demand',
    color: '#c084fc',
    bg: 'rgba(168, 85, 247, 0.22)',
    iconName: 'Building2',
    detail: 'Metropolises and industrial clusters pump millions of liters daily while extensive concrete pavement seals natural recharge surfaces, preventing rainfall from infiltrating the subsoil.',
  },
  {
    id: 'rainfall',
    title: 'Low and erratic rainfall',
    color: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.22)',
    iconName: 'Sun',
    detail: 'Monsoon variability, prolonged meteorological droughts, and shifting climate patterns reduce the natural replenishment cycles of both shallow and confined aquifers.',
  },
  {
    id: 'inefficiency',
    title: 'Inefficient water use and lack of regulation',
    color: '#38bdf8',
    bg: 'rgba(14, 165, 233, 0.22)',
    iconName: 'Droplets',
    detail: 'Absence of volumetric metering, uncontrolled borewell drilling, and widespread conveyance losses lead to massive resource depletion before regulatory intervention occurs.',
  },
];

// Top Highly Affected States in India
export const AFFECTED_STATES_DATA: AffectedState[] = [
  {
    rank: 1,
    name: 'Punjab',
    stateId: 'Punjab.10m-admin-1-states-provinces-shp.3528_1_',
    severity: 'high',
    color: '#ef4444',
    extractionRate: '166%',
    category: 'Over-Exploited',
    details: 'Centrally irrigated alluvial tracts extract 1.66× more water than rainfall replenishes, lowering the water table by ~0.8m annually.',
    pinX: 415,
    pinY: 330,
  },
  {
    rank: 2,
    name: 'Haryana',
    stateId: 'Haryana.10m-admin-1-states-provinces-shp.2629_1_',
    severity: 'high',
    color: '#ef4444',
    extractionRate: '134%',
    category: 'Over-Exploited',
    details: 'Intensive paddy-wheat rotations in Kurukshetra, Karnal, and Kaithal have drained freshwater aquifers, compelling farmers to bore beyond 70 meters.',
    pinX: 445,
    pinY: 410,
  },
  {
    rank: 3,
    name: 'Rajasthan',
    stateId: 'Rajasthan.10m-admin-1-states-provinces-shp.3529_1_',
    severity: 'high',
    color: '#ef4444',
    extractionRate: '151%',
    category: 'Over-Exploited',
    details: 'Over 70% of assessment units are over-exploited; ancient fossil water reserves are being extracted in hyper-arid zones with negligible natural recharge.',
    pinX: 310,
    pinY: 520,
  },
  {
    rank: 4,
    name: 'Delhi',
    stateId: 'Delhi.10m-admin-1-states-provinces-shp.2627_1_',
    severity: 'high',
    color: '#ef4444',
    extractionRate: '120%',
    category: 'Over-Exploited',
    details: 'Massive urban extraction deficit in South and Southwest districts where extraction rates reach 130–150%, triggering localized land sinking.',
    pinX: 480,
    pinY: 435,
  },
  {
    rank: 5,
    name: 'Uttar Pradesh',
    stateId: 'Uttar_Pradesh.10m-admin-1-states-provinces-shp.3533_1_',
    severity: 'moderate',
    color: '#f97316',
    extractionRate: '74%',
    category: 'Critical / Semi-Critical',
    details: 'Western UP districts have turned critical due to relentless private tubewell density for cash-crop sugarcane cultivation.',
    pinX: 620,
    pinY: 510,
  },
  {
    rank: 6,
    name: 'Gujarat',
    stateId: 'Dadra_and_Nagar_Haveli.10m-admin-1-states-provinces-shp.3544_1_',
    severity: 'moderate',
    color: '#f97316',
    extractionRate: '68%',
    category: 'Semi-Critical / Saline',
    details: 'Severe aquifer depression across Mehsana, Patan, and Saurashtra has drawn seawater 10–15km inland along the Gulf of Khambhat coast.',
    pinX: 220,
    pinY: 730,
  },
];

// Historical Depletion Trend 2010-2022
export const DEPLETION_TREND_DATA: TrendDataPoint[] = [
  { year: 2010, depth: 4.5 },
  { year: 2012, depth: 9.8 },
  { year: 2014, depth: 15.4 },
  { year: 2016, depth: 21.2 },
  { year: 2018, depth: 27.0 },
  { year: 2020, depth: 32.6 },
  { year: 2022, depth: 38.5 },
];

// 6 Key Impacts of Depletion
export const DEPLETION_IMPACTS: DepletionImpact[] = [
  {
    id: 'reduced-water',
    title: 'Reduced water availability',
    color: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.18)',
    iconName: 'Droplets',
    detail: 'Shallow open wells and village handpumps dry up completely, creating severe domestic water distress and tanker dependence.',
  },
  {
    id: 'lower-agri',
    title: 'Lower agricultural productivity',
    color: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.18)',
    iconName: 'Sprout',
    detail: 'Irrigation shortfalls reduce crop yields, force reduction in cultivated acreage, and risk complete harvest failures during dry spells.',
  },
  {
    id: 'subsidence',
    title: 'Land subsidence and sinkholes',
    color: '#c084fc',
    bg: 'rgba(168, 85, 247, 0.18)',
    iconName: 'Layers',
    detail: 'Pore water pressure loss causes irreversible compaction of fine clay layers, damaging roads, canals, building foundations, and aqueducts.',
  },
  {
    id: 'ecosystems',
    title: 'Impact on ecosystems and wetlands',
    color: '#2dd4bf',
    bg: 'rgba(45, 212, 191, 0.18)',
    iconName: 'Trees',
    detail: 'Groundwater baseflow to perennial streams stops, causing wetlands, marshes, and riparian habitats to desicate.',
  },
  {
    id: 'higher-cost',
    title: 'Higher cost of water extraction',
    color: '#fb7185',
    bg: 'rgba(251, 113, 133, 0.18)',
    iconName: 'TrendingUp',
    detail: 'Farmers must re-drill ever deeper borewells and install larger 15–25 HP submersible motors, driving farm debt spirals.',
  },
  {
    id: 'conflicts',
    title: 'Water conflicts between users',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.18)',
    iconName: 'Users',
    detail: 'Severe competition sparks localized socio-legal disputes between upstream-downstream farmers, cities, and neighboring states.',
  },
];

// 6 Solutions and Way Forward
export const DEPLETION_SOLUTIONS: DepletionSolution[] = [
  {
    id: 'sol-1',
    text: 'Regulate and monitor groundwater extraction',
    detail: 'Enforce legal metering for industrial/commercial wells and establish state water authorities with powers to seal illegal borewells.',
  },
  {
    id: 'sol-2',
    text: 'Promote efficient irrigation methods (e.g., drip and sprinkler)',
    detail: 'Micro-irrigation achieves 90% water efficiency versus 35% for flood irrigation, cutting farm water demands by over half.',
  },
  {
    id: 'sol-3',
    text: 'Enhance groundwater recharge structures',
    detail: 'Scale construction of check dams, recharge shafts, percolation tanks, and mandatory rooftop rainwater harvesting in cities.',
  },
  {
    id: 'sol-4',
    text: 'Adopt crop diversification and water-efficient crops',
    detail: 'Incentivize farmers in over-exploited zones to switch from paddy/sugarcane to drought-tolerant millets, pulses, and oilseeds.',
  },
  {
    id: 'sol-5',
    text: 'Strengthen policy and community participation',
    detail: 'Empower village water security committees under Atal Bhujal Yojana to budget groundwater usage through participatory hydrogeology.',
  },
  {
    id: 'sol-6',
    text: 'Use conjunctive water management (surface + groundwater)',
    detail: 'Recharge aquifers using excess canal runoff during monsoon seasons and restrict extraction exclusively to dry emergency periods.',
  },
];

// Interactive Geological Callouts on the Cutaway Stage
export const CUTAWAY_CALLOUTS: CutawayCallout[] = [
  {
    id: 'excessive-extraction',
    badgeText: 'Excessive Extraction',
    type: 'danger',
    pinX: 58.5,
    pinY: 20.0,
    title: 'Excessive Pumping & Over-Extraction',
    description: 'High-yield mechanical tubewells extract deep groundwater faster than seasonal monsoons recharge the porous strata, creating steep cones of depression.',
  },
  {
    id: 'falling-water-table',
    badgeText: 'Falling Water Table',
    type: 'info',
    pinX: 51.5,
    pinY: 37.5,
    title: 'Receding Aquifer & Falling Water Table',
    description: 'The regional water table drops precipitously (dashed line), dropping below historical dug-well depths and draining shallow unconfined aquifers.',
  },
];
