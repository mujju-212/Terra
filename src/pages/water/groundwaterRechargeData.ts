// Data model for Chapter 16: Groundwater Recharge
// Matches User Reference Mockup with extreme fidelity

export interface RechargeType {
  id: string;
  title: string;
  color: string;
  bg: string;
  iconName: 'CloudRain' | 'Landmark';
  description: string;
  detailedText: string;
}

export interface CutawayRechargePoint {
  id: string;
  badgeText: string;
  subText: string;
  category: 'natural' | 'check-dam' | 'percolation-tank' | 'recharge-well' | 'aquifer';
  color: string;
  bgColor: string;
  pinX: number; // percentage from left
  pinY: number; // percentage from top
  title: string;
  description: string;
  engineeringSpec: string;
  efficiency: string;
}

export interface NaturalRechargeItem {
  id: string;
  title: string;
  iconName: 'CloudRain' | 'Waves' | 'Trees' | 'Snowflake';
  color: string;
  bg: string;
  detail: string;
}

export interface ArtificialRechargeMethod {
  id: string;
  title: string;
  iconName: 'Building2' | 'Pipette' | 'Mountain' | 'Droplets' | 'Compass';
  color: string;
  bg: string;
  detail: string;
}

export interface RechargeBenefit {
  id: string;
  text: string;
  detail: string;
}

export interface RechargeConsideration {
  id: string;
  title: string;
  iconName: 'FileText' | 'Wrench' | 'ShieldAlert' | 'Users' | 'Network' | 'Activity';
  color: string;
  detail: string;
}

// 2 Types of Recharge Card
export const RECHARGE_TYPES: RechargeType[] = [
  {
    id: 'natural-recharge',
    title: 'Natural Recharge',
    color: '#4ade80',
    bg: 'rgba(34, 197, 94, 0.22)',
    iconName: 'CloudRain',
    description: 'Occurs through infiltration of rainfall, rivers, lakes and other surface water bodies.',
    detailedText: 'Natural replenishment governed by soil permeability, topographical slope, vegetative interception, and precipitation intensity over catchment basins.',
  },
  {
    id: 'artificial-recharge',
    title: 'Artificial Recharge',
    color: '#fbbf24',
    bg: 'rgba(245, 158, 11, 0.22)',
    iconName: 'Landmark',
    description: 'Involves constructed structures and methods to enhance the infiltration of water into aquifers.',
    detailedText: 'Engineered structures deliberately redirecting surplus surface runoff, flood flows, and harvested rainwater into geological storage horizons.',
  },
];

// Interactive Callouts pinned on the 3D Geological Cutaway
export const CUTAWAY_RECHARGE_POINTS: CutawayRechargePoint[] = [
  {
    id: 'rainwater-infiltration',
    badgeText: 'Rainwater',
    subText: '(infiltration)',
    category: 'natural',
    color: '#38bdf8',
    bgColor: 'rgba(14, 116, 144, 0.75)',
    pinX: 48.5,
    pinY: 21.0,
    title: 'Atmospheric Precipitation & Direct Infiltration',
    description: 'Monsoon showers percolate through topsoil horizons under gravitational pull, feeding shallow unconfined aquifers through natural pore networks.',
    engineeringSpec: 'Infiltration rate: 10–50 mm/hr across permeable loamy soils.',
    efficiency: 'Accounts for ~65% of annual natural groundwater replenishment in India.',
  },
  {
    id: 'soil-infiltration',
    badgeText: 'Infiltration',
    subText: '',
    category: 'natural',
    color: '#60a5fa',
    bgColor: 'rgba(30, 58, 138, 0.82)',
    pinX: 49.0,
    pinY: 43.0,
    title: 'Percolation through Vadose Rock Strata',
    description: 'Water migrates vertically past the unsaturated vadose zone, undergoing natural mechanical filtration through sand and gravel beds.',
    engineeringSpec: 'Hydraulic conductivity: 10⁻⁴ to 10⁻² m/s across gravelly sand layers.',
    efficiency: 'Removes suspended particulate matter and turbidity naturally.',
  },
  {
    id: 'check-dam',
    badgeText: 'Check Dam',
    subText: '(increases infiltration)',
    category: 'check-dam',
    color: '#4ade80',
    bgColor: 'rgba(21, 128, 61, 0.8)',
    pinX: 61.5,
    pinY: 27.0,
    title: 'Check Dam / Masonry Weirs across Ephemeral Streams',
    description: 'Small stone or reinforced concrete barriers constructed across secondary streams to slow streamflow velocity, retain post-monsoon runoff, and increase recharge contact time.',
    engineeringSpec: 'Ponding height: 1.5–2.5 meters with stone apron to prevent downstream scouring.',
    efficiency: 'Enhances surrounding well water levels by 1.5–3.0 meters within a 1.2 km radius.',
  },
  {
    id: 'percolation-tank',
    badgeText: 'Percolation Tank',
    subText: '(recharge structure)',
    category: 'percolation-tank',
    color: '#fb923c',
    bgColor: 'rgba(194, 65, 12, 0.8)',
    pinX: 74.5,
    pinY: 29.0,
    title: 'Excavated Percolation Tank / Surface Infiltration Basin',
    description: 'Artificially excavated earthen depressions sited on porous alluvial or fractured rock formations to store non-monsoon floodwater and maximize downward hydraulic head.',
    engineeringSpec: 'Storage capacity: 10,000–50,000 m³ with silt-settling forebay.',
    efficiency: 'Converts 70–85% of retained surface storage into groundwater recharge.',
  },
  {
    id: 'recharge-well',
    badgeText: 'Recharge Well',
    subText: '(direct recharge)',
    category: 'recharge-well',
    color: '#c084fc',
    bgColor: 'rgba(126, 34, 206, 0.8)',
    pinX: 89.0,
    pinY: 30.0,
    title: 'Deep Injection / Direct Borewell Recharge Shaft',
    description: 'A deep borehole or cased shaft penetrating impermeable aquitards to inject pre-filtered surface water directly into deep, confined aquifer strata under gravity head.',
    engineeringSpec: 'Slotted PVC/steel screen pipe with multi-layer inverted gravel-sand filter bed.',
    efficiency: 'Directly replenishes deep confined aquifers that natural surface seepage cannot reach.',
  },
  {
    id: 'recharged-aquifer',
    badgeText: 'Recharged Aquifer',
    subText: '(groundwater storage)',
    category: 'aquifer',
    color: '#22d3ee',
    bgColor: 'rgba(8, 145, 178, 0.85)',
    pinX: 67.0,
    pinY: 57.0,
    title: 'Saturated Aquifer Storage & Lateral Distribution',
    description: 'Subterranean porous rock reservoirs store vast volumes of fresh water insulated from evaporation, naturally dispersing water through regional hydraulic gradients.',
    engineeringSpec: 'Storage coefficient (S): 0.15–0.25 (unconfined) / 10⁻⁴ (confined).',
    efficiency: 'Zero evaporative loss compared to surface dams which lose 15–25% to evaporation.',
  },
];

// Card 1: Natural Recharge (4 Items)
export const NATURAL_RECHARGE_ITEMS: NaturalRechargeItem[] = [
  {
    id: 'nat-1',
    title: 'Infiltration of rainfall',
    iconName: 'CloudRain',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.18)',
    detail: 'Direct percolation of rainwater through the soil matrix into shallow unconfined aquifers during monsoon downpours.',
  },
  {
    id: 'nat-2',
    title: 'Seepage from rivers, lakes and streams',
    iconName: 'Waves',
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.18)',
    detail: 'Influent (losing) stream conditions where riverbed water surface elevations exceed surrounding water tables, discharging into banks.',
  },
  {
    id: 'nat-3',
    title: 'Infiltration in forest and permeable areas',
    iconName: 'Trees',
    color: '#4ade80',
    bg: 'rgba(74, 222, 128, 0.18)',
    detail: 'Dense root channels, leaf litter mulch, and undisturbed forest humus maximize soil permeability and slow runoff velocities.',
  },
  {
    id: 'nat-4',
    title: 'Snowmelt in mountainous regions',
    iconName: 'Snowflake',
    color: '#a5f3fc',
    bg: 'rgba(165, 243, 252, 0.18)',
    detail: 'Gradual springtime thawing of Himalayan snowpacks provides steady, low-velocity infiltration into foothill gravel bhabar belts.',
  },
];

// Card 2: Artificial Recharge Methods (5 Items)
export const ARTIFICIAL_RECHARGE_METHODS: ArtificialRechargeMethod[] = [
  {
    id: 'art-1',
    title: 'Check dams and percolation tanks',
    iconName: 'Building2',
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.18)',
    detail: 'Community masonry barriers and excavated percolation ponds designed to impound ephemeral stream runoff for prolonged soil absorption.',
  },
  {
    id: 'art-2',
    title: 'Recharge wells and injection wells',
    iconName: 'Pipette',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.18)',
    detail: 'Deep cased shafts equipped with desilting chambers that bypass thick impermeable clay strata to recharge confined aquifers.',
  },
  {
    id: 'art-3',
    title: 'Contour bunding and trenching',
    iconName: 'Mountain',
    color: '#4ade80',
    bg: 'rgba(74, 222, 128, 0.18)',
    detail: 'Earthen embankments and continuous contour trenches across sloped hillsides to capture sheet runoff and break velocity.',
  },
  {
    id: 'art-4',
    title: 'Rainwater harvesting structures',
    iconName: 'Droplets',
    color: '#22d3ee',
    bg: 'rgba(34, 211, 238, 0.18)',
    detail: 'Rooftop rainwater catchment networks with filter beds routing urban clean runoff into abandoned dug wells or recharge pits.',
  },
  {
    id: 'art-5',
    title: 'Spreading basins and infiltration ponds',
    iconName: 'Compass',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.18)',
    detail: 'Wide, shallow surface spreading basins with high surface-area-to-depth ratios deployed across porous river floodplains.',
  },
];

// Card 3: Benefits of Recharge (7 Items)
export const RECHARGE_BENEFITS: RechargeBenefit[] = [
  {
    id: 'ben-1',
    text: 'Increases groundwater levels',
    detail: 'Reverses localized cones of depression, lifts regional water tables, and restores perennial flow to dried agricultural dug wells.',
  },
  {
    id: 'ben-2',
    text: 'Improves water availability during dry periods',
    detail: 'Buffers agricultural irrigation and municipal supplies against prolonged summer droughts without relying on tanker deliveries.',
  },
  {
    id: 'ben-3',
    text: 'Reduces land subsidence',
    detail: 'Restores pore hydrostatic pressure within compressible fine-grained silt and clay beds, halting ground compaction and fissures.',
  },
  {
    id: 'ben-4',
    text: 'Helps prevent seawater ingress in coastal areas',
    detail: 'Elevates coastal hydraulic gradients, building a freshwater barrier that repels landward encroachment of saline oceanic wedges.',
  },
  {
    id: 'ben-5',
    text: 'Improves water quality',
    detail: 'Dilutes concentrations of harmful fluoride, arsenic, and nitrates in geochemically distressed aquifers through natural filtration.',
  },
  {
    id: 'ben-6',
    text: 'Supports agriculture, industry and domestic use',
    detail: 'Ensures reliable, decentralized round-the-year water security for rural farming communities and industrial enterprises alike.',
  },
  {
    id: 'ben-7',
    text: 'Enhances climate resilience',
    detail: 'Transforms erratic extreme precipitation events into secure underground storage shielded from evaporative losses.',
  },
];

// Card 4: Key Considerations (6 Items)
export const RECHARGE_CONSIDERATIONS: RechargeConsideration[] = [
  {
    id: 'con-1',
    title: 'Site selection based on geology and permeability',
    iconName: 'FileText',
    color: '#38bdf8',
    detail: 'Hydrogeological mapping to locate fracture zones, paleo-channels, and permeable sandy strata with sufficient vadose thickness.',
  },
  {
    id: 'con-2',
    title: 'Proper design and maintenance of recharge structures',
    iconName: 'Wrench',
    color: '#60a5fa',
    detail: 'Regular de-silting of percolation pond beds, backwashing well screens, and grading aggregate filter media before each monsoon.',
  },
  {
    id: 'con-3',
    title: 'Avoid contamination of recharge zones',
    iconName: 'ShieldAlert',
    color: '#f87171',
    detail: 'Strict exclusion of chemical runoff, untreated sewage, and industrial effluents from entering recharge channels to protect aquifers.',
  },
  {
    id: 'con-4',
    title: 'Community participation and awareness',
    iconName: 'Users',
    color: '#fbbf24',
    detail: 'Mobilizing village water security committees (Panchayats) to maintain catchment bunds and regulate extraction rates equitably.',
  },
  {
    id: 'con-5',
    title: 'Integration with watershed management',
    iconName: 'Network',
    color: '#2dd4bf',
    detail: 'Coordinating ridge-to-valley soil conservation, afforestation, check dams, and drainage lines for unified catchment health.',
  },
  {
    id: 'con-6',
    title: 'Regular monitoring of groundwater levels and quality',
    iconName: 'Activity',
    color: '#a78bfa',
    detail: 'Deploying digital water level recorders (DWLRs) and telemetry piezometers to measure recharge efficiency and chemical balance.',
  },
];
