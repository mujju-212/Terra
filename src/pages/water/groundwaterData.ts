export interface GroundwaterStrataPin {
  id: string;
  name: string;
  category: 'surface' | 'strata' | 'well';
  x: number; // percentage from left
  y: number; // percentage from top
  shortDesc: string;
  detailedDesc: string;
  permeability: string;
  porosity: string;
  keyFact: string;
}

export const GROUNDWATER_STRATA_PINS: GroundwaterStrataPin[] = [
  {
    id: 'rain-infiltrate',
    name: 'Infiltration from Rainfall',
    category: 'surface',
    x: 48,
    y: 12,
    shortDesc: 'Precipitation soaking into permeable topsoil',
    detailedDesc: 'When rainfall reaches unsaturated topsoil, gravity draws moisture downward through soil micropores. This primary input replenishes soil moisture and initiates downward recharge.',
    permeability: 'High (0.1–10 cm/s)',
    porosity: '35–50% in loose soil',
    keyFact: 'Only 10–20% of Indian monsoon rainfall infiltrates to recharge deep aquifers.',
  },
  {
    id: 'recharge-area',
    name: 'Recharge Zone',
    category: 'surface',
    x: 58,
    y: 28,
    shortDesc: 'Surface catchment supplying water to the aquifer',
    detailedDesc: 'Recharge zones are exposed outcrop areas where water enters the saturated zone. Protecting recharge areas from pavement, industrial chemicals, and contamination is crucial for aquifer security.',
    permeability: 'Medium to High',
    porosity: 'Varies with surface soil cover',
    keyFact: 'Urbanization and asphalt sealing drastically reduce natural recharge areas.',
  },
  {
    id: 'dug-well',
    name: 'Shallow Dug Well',
    category: 'well',
    x: 62,
    y: 42,
    shortDesc: 'Extracts water from the unconfined aquifer',
    detailedDesc: 'Traditional masonry or concrete-lined open well tapping the water table aquifer. Its water level rises during monsoons and falls during summer dry months.',
    permeability: 'Direct atmospheric contact',
    porosity: 'Open storage reservoir',
    keyFact: 'Subject to seasonal fluctuation and susceptible to surface runoff contamination.',
  },
  {
    id: 'deep-borewell',
    name: 'Deep Tube Well / Borewell',
    category: 'well',
    x: 74,
    y: 46,
    shortDesc: 'Cased steel pipe tapping pressurized confined aquifer',
    detailedDesc: 'Drilled deep through impermeable clay/shale strata into confined rock fractures. Water inside rises above the aquifer boundary under hydrostatic artesian pressure.',
    permeability: 'Taps high-transmissivity deep gravel/rock',
    porosity: 'Pressurized artesian or sub-artesian',
    keyFact: 'Over-drilling in hard-rock India has pushed borewell depths beyond 300 meters.',
  },
  {
    id: 'river-seepage',
    name: 'River (Seepage & Baseflow)',
    category: 'surface',
    x: 84,
    y: 38,
    shortDesc: 'Dynamic interaction between stream and groundwater',
    detailedDesc: 'In gaining streams (effluent), groundwater discharges baseflow into the riverbed, keeping rivers flowing through summer. In losing streams (influent), river water recharges adjacent aquifers.',
    permeability: 'Alluvial sand bed: High',
    porosity: 'High gravel/sand beds',
    keyFact: 'Perennial rivers in dry seasons are sustained almost entirely by groundwater baseflow.',
  },
  {
    id: 'soil-layer',
    name: 'Soil Layer (Unsaturated / Vadose Zone)',
    category: 'strata',
    x: 32,
    y: 37,
    shortDesc: 'Pores filled with air and moisture above water table',
    detailedDesc: 'The upper geological zone where void spaces contain both air and water. Plant roots draw moisture from here before gravitational water percolates deeper.',
    permeability: 'Permeable',
    porosity: '40–55%',
    keyFact: 'Provides natural biological filtration of surface water as it moves downward.',
  },
  {
    id: 'water-table',
    name: 'Water Table (Phreatic Surface)',
    category: 'strata',
    x: 21,
    y: 41,
    shortDesc: 'Upper boundary of the saturated zone',
    detailedDesc: 'The undulating plane where pore water pressure equals atmospheric pressure. Below this boundary, 100% of rock fractures and sediment pores are completely filled with water.',
    permeability: 'Equilibrium boundary',
    porosity: '100% saturated below line',
    keyFact: 'Can range from 1 meter below ground in coastal deltas to over 80 meters in arid Rajasthan.',
  },
  {
    id: 'unconfined-aquifer',
    name: 'Unconfined Aquifer (Water Table Aquifer)',
    category: 'strata',
    x: 21,
    y: 48,
    shortDesc: 'Direct atmospheric contact, easily recharged',
    detailedDesc: 'An aquifer bounded below by an impermeable confining bed, but open to the atmosphere above through permeable soil. Recharges rapidly from local rainfall.',
    permeability: 'Moderate to High (Sand/Gravel)',
    porosity: '20–35% specific yield',
    keyFact: 'Most widespread source for rural open wells across northern Indian plains.',
  },
  {
    id: 'confining-layer',
    name: 'Confining Layer (Aquitard / Aquiclude)',
    category: 'strata',
    x: 21,
    y: 54,
    shortDesc: 'Dense impermeable clay or shale rock barrier',
    detailedDesc: 'A dense geological stratum of clay, shale, or unfractured crystalline rock with low hydraulic conductivity that acts as a natural seal between upper and lower aquifers.',
    permeability: 'Extremely Low (< 10⁻⁷ cm/s)',
    porosity: 'High porosity but near-zero permeability',
    keyFact: 'Protects deeper aquifers from surface chemical contaminants and agro-pesticides.',
  },
  {
    id: 'confined-aquifer',
    name: 'Confined Aquifer (Artesian Aquifer)',
    category: 'strata',
    x: 21,
    y: 60,
    shortDesc: 'Sandwiched between confining beds under pressure',
    detailedDesc: 'Trapped under an impermeable caprock stratum under hydrostatic pressure. When pierced by a borewell, water rises up the casing toward the potentiometric surface.',
    permeability: 'High in fractured rock/coarse sand',
    porosity: 'Elastic storage coefficient (10⁻⁵ to 10⁻³)',
    keyFact: 'Stores ancient, highly purified groundwater, but recharges slowly over centuries.',
  },
];

export const GROUNDWATER_FORMATION_STEPS = [
  {
    step: 1,
    title: 'Rainfall Infiltration',
    icon: 'cloud-rain',
    desc: 'Monsoon precipitation and surface runoff soak into topsoil through gravitational suction and soil micropores.',
  },
  {
    step: 2,
    title: 'Percolation Through Strata',
    icon: 'chevrons-down',
    desc: 'Water moves downwards past the root zone, percolating through sand, silt, weathered rock, and fractured strata.',
  },
  {
    step: 3,
    title: 'Pore Storage in Aquifers',
    icon: 'layers',
    desc: 'Reaches impermeable rock boundaries, collecting in interconnected rock pores, gravel matrices, and joint fissures.',
  },
  {
    step: 4,
    title: 'Slow Natural Discharge',
    icon: 'waves',
    desc: 'Under gravity and hydraulic gradients, groundwater discharges slowly into perennial rivers, springs, lakes, and wetlands.',
  },
];

export const GROUNDWATER_FACTORS = [
  {
    id: 'rainfall',
    title: 'Rainfall & Climate',
    icon: 'cloud-rain',
    impact: 'Controls precipitation volume, infiltration rate, and annual recharge replenishment.',
  },
  {
    id: 'geology',
    title: 'Geology & Soil Type',
    icon: 'mountain',
    impact: 'Determines hydraulic conductivity, rock porosity, transmissivity, and specific yield.',
  },
  {
    id: 'land-use',
    title: 'Land Use & Vegetation',
    icon: 'leaf',
    impact: 'Forests and grass cover slow surface runoff, facilitating sustained deep percolation.',
  },
  {
    id: 'topography',
    title: 'Topography & Slope',
    icon: 'trending-down',
    impact: 'Steep hillslopes promote rapid runoff; gentle undulating plains maximize recharge.',
  },
  {
    id: 'human',
    title: 'Human Activities',
    icon: 'factory',
    impact: 'Deep tube well extractions, pavement sealing, and pollution alter the water table.',
  },
];

export const GROUNDWATER_USES = [
  {
    id: 'agri',
    title: 'Agriculture',
    subtitle: 'Irrigation & Crop Yields',
    image: '/images/water-hd-agriculture.jpg',
    stat: '60–70%',
    statLabel: 'of India’s Irrigation',
    desc: 'Groundwater is the primary driver of the Green Revolution, powering tube well irrigation for rice, wheat, and cash crops across 35+ million hectares.',
    points: [
      'Provides drought-resilient on-demand irrigation independent of canal schedules',
      'Enables intensive multi-cropping seasons (Kharif, Rabi, and Zaid)',
      'High reliance leads to severe water table depletion in Punjab, Haryana & Tamil Nadu',
    ],
  },
  {
    id: 'domestic',
    title: 'Domestic Use',
    subtitle: 'Drinking & Household Needs',
    image: '/images/water-hd-domestic.jpg',
    stat: '85%+',
    statLabel: 'of Rural Drinking Water',
    desc: 'Supplies clean drinking, cooking, and sanitary water to hundreds of millions of households via hand pumps, overhead tanks, and municipal borewells.',
    points: [
      'Naturally filtered by soil strata, requiring lower primary treatment than river water',
      'Lifeline for rural panchayats and semi-urban habitations without piped supplies',
      'Vulnerable to geogenic fluoride and arsenic in specific geological belts',
    ],
  },
  {
    id: 'industry',
    title: 'Industrial Use',
    subtitle: 'Manufacturing & Processing',
    image: '/images/water-hd-industry.jpg',
    stat: '15–20%',
    statLabel: 'of Industrial Demand',
    desc: 'Crucial for thermal power cooling towers, pharmaceutical plants, textile dyeing, food processing, and chemical production requiring constant water quality.',
    points: [
      'Ensures reliable 24/7 process water without seasonal monsoon interruptions',
      'Demands strict effluent recycling (Zero Liquid Discharge) to protect aquifers',
      'Requires regulatory compliance under Central Ground Water Authority (CGWA)',
    ],
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem Support',
    subtitle: 'Rivers, Wetlands & Springs',
    image: '/images/landform-banner-wetlands.jpg',
    stat: 'Perennial',
    statLabel: 'River Baseflow',
    desc: 'Groundwater feeds subterranean root systems, mountain springs, marshlands, and supplies baseflow maintaining river ecologies throughout harsh summer months.',
    points: [
      'Preserves aquatic life in rivers during dry seasons when rainfall runoff is zero',
      'Supports Ramsar wetland biodiversity, oxbow lakes, and coastal mangrove estuarine zones',
      'Maintains freshwater hydraulic pressure against coastal seawater intrusion',
    ],
  },
];
