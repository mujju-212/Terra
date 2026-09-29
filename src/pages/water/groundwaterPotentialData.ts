export interface GroundwaterRegion {
  id: 'himalayan' | 'alluvial' | 'peninsular' | 'coastal';
  title: string;
  tag: string;
  shortSummary: string;
  color: string;
  accentRgb: string;
  badgeX: string;
  badgeY: string;
  potentialLevel: 'Moderate to High' | 'High' | 'Low to Moderate' | 'Moderate (varies)';
  potentialPct: number;
  image: string;
  geologySummary: string;
  rainfallSnow: string;
  bullets: string[];
  keyFacts: {
    areaShare: string;
    aquiferType: string;
    rechargeRate: string;
    vulnerability: string;
  };
  detailedNotes: string[];
}

export const GW_REGIONS_DATA: GroundwaterRegion[] = [
  {
    id: 'himalayan',
    title: 'Himalayan Region',
    tag: 'Mountain & Foothills Province',
    shortSummary: 'Young and fractured formations, moderate to high potential.',
    color: '#38bdf8',
    accentRgb: '56, 189, 248',
    badgeX: '54%',
    badgeY: '21%',
    potentialLevel: 'Moderate to High',
    potentialPct: 72,
    image: '/images/region-himalayan-hd.jpg',
    geologySummary: 'Complex folded and faulted crystalline metamorphic rocks, limestone, and boulder-gravel valley fills (Bhabar & Terai belts).',
    rainfallSnow: '1,500 – 3,000+ mm annually (Monsoon rainfall + perennial glacial snowmelt)',
    bullets: [
      'Young and fractured rocks',
      'High rainfall and snowmelt',
      'Moderate to high potential',
    ],
    keyFacts: {
      areaShare: '~15% of India',
      aquiferType: 'Fractured crystalline & alluvial gravel fans',
      rechargeRate: 'Rapid mountain runoff with localized retention',
      vulnerability: 'Seismic instability, flash floods, spring depletion',
    },
    detailedNotes: [
      'The Himalayan belt features heterogeneous hydrogeological formations ranging from metamorphic granites to porous Bhabar gravel terraces at the foothills.',
      'Valleys such as Kashmir, Dehradun, and Himachal contain highly productive artesian gravel aquifers with high seasonal yields.',
      'Springs (locally called Naulas and Dharas) are the lifeline for drinking water; rapid urbanization and deforestation pose severe risks to mountain headwater recharge.',
    ],
  },
  {
    id: 'alluvial',
    title: 'Indo-Gangetic Alluvial Region',
    tag: 'Alluvial Plains Province',
    shortSummary: 'High potential due to thick alluvial deposits.',
    color: '#22c55e',
    accentRgb: '34, 197, 94',
    badgeX: '52%',
    badgeY: '33%',
    potentialLevel: 'High',
    potentialPct: 95,
    image: '/images/landform-banner-agriculture.jpg',
    geologySummary: 'Thick unconsolidated sediments (sand, silt, gravel, clay lenses) exceeding 300 to 1,000 meters in depth deposited by Ganga, Indus, and Brahmaputra rivers.',
    rainfallSnow: '600 mm (West Punjab/Haryana) to 2,500 mm (Bengal/Assam)',
    bullets: [
      'Thick alluvial deposits (sand, silt, clay)',
      'High recharge from rivers and rainfall',
      'High groundwater potential',
    ],
    keyFacts: {
      areaShare: '~25% of India',
      aquiferType: 'Multi-tiered unconfined & deep confined sand aquifers',
      rechargeRate: 'Exceptional (permeable sandbeds + river floodplains)',
      vulnerability: 'Intensive agricultural overdraft, arsenic & nitrate pollution',
    },
    detailedNotes: [
      'The vast Indo-Gangetic-Brahmaputra alluvial plain is one of the world’s most prolific groundwater repositories, with vast transmissivity exceeding 1,000–4,000 m²/day.',
      'Supports millions of shallow and deep tube wells, driving India’s Green Revolution wheat and rice production in Punjab, Haryana, Uttar Pradesh, and Bihar.',
      'Over-extraction in the north-western pocket has created severe regional cone of depression and water table drops exceeding 20–30 meters.',
    ],
  },
  {
    id: 'peninsular',
    title: 'Peninsular Region',
    tag: 'Hard-Rock Shield Province',
    shortSummary: 'Hard rock terrain, low to moderate potential.',
    color: '#f59e0b',
    accentRgb: '245, 158, 11',
    badgeX: '48%',
    badgeY: '58%',
    potentialLevel: 'Low to Moderate',
    potentialPct: 38,
    image: '/images/region-peninsular-hd.jpg',
    geologySummary: 'Crystalline igneous and metamorphic shields (granites, gneisses, charnockites) and Deccan Trap basalt volcanic lava flow sequences.',
    rainfallSnow: '500 – 1,200 mm (frequent rain shadow semi-arid belts)',
    bullets: [
      'Hard rock terrain (granite, basalt, gneiss)',
      'Limited pore spaces',
      'Low to moderate potential',
    ],
    keyFacts: {
      areaShare: '~65% of India (predominant hydrogeological province)',
      aquiferType: 'Weathered regolith & deep fractured fissures',
      rechargeRate: 'Low specific yield (1–5%), rapid seasonal exhaustion',
      vulnerability: 'Rapid well drying, borehole failure, fluoride contamination',
    },
    detailedNotes: [
      'Covering about two-thirds of peninsular India across Maharashtra, Karnataka, Telangana, Andhra Pradesh, and Tamil Nadu, hard rocks possess virtually zero primary porosity.',
      'Groundwater is stored exclusively in the upper weathered crust (5–20 m) and interconnected tectonic joints, fault zones, and vesicular basalt horizons.',
      'Borewells frequently face steep decline during summer months, requiring community artificial recharge, check dams, and watershed management.',
    ],
  },
  {
    id: 'coastal',
    title: 'Coastal Region',
    tag: 'Coastal & Deltaic Province',
    shortSummary: 'Variable potential, risk of seawater ingress in coastal areas.',
    color: '#f97316',
    accentRgb: '249, 115, 22',
    badgeX: '57%',
    badgeY: '71%',
    potentialLevel: 'Moderate (varies)',
    potentialPct: 58,
    image: '/images/region-coastal-hd.jpg',
    geologySummary: 'Unconsolidated coastal sands, deltaic clay-silt layers, sand dunes, and beach cheniers adjacent to marine waters.',
    rainfallSnow: '1,000 – 3,500+ mm (SW & NE Monsoons, coastal storms)',
    bullets: [
      'Alluvial and sedimentary deposits',
      'Variable potential',
      'Risk of seawater ingress',
    ],
    keyFacts: {
      areaShare: '~7,500 km coastline',
      aquiferType: 'Coastal unconfined sand dunes & deltaic layered sands',
      rechargeRate: 'High seasonal monsoon recharge into sandy surfaces',
      vulnerability: 'Salinization, Ghyben-Herzberg seawater wedge encroachment',
    },
    detailedNotes: [
      'Coastal aquifers along Gujarat, Maharashtra, Goa, Kerala, Tamil Nadu, Andhra Pradesh, and Odisha exist in dynamic hydro-chemical equilibrium with the sea.',
      'Over-pumping draws saline oceanic water landward (Ghyben-Herzberg relation: 1m freshwater head drawdown causes 40m saltwater upconing).',
      'Management requires restricted coastal draft, subsurface barrier dykes, and recharge of freshwater dune lagoons.',
    ],
  },
];

export const GW_FACTORS_DATA = [
  {
    id: 'geology',
    title: 'Geology',
    subtitle: 'Rock type and porosity',
    icon: 'gem',
    color: '#a855f7',
    desc: 'Determines whether water can permeate and store. Alluvial sands possess high primary porosity; hard crystalline rock relies on secondary joints.',
  },
  {
    id: 'rainfall',
    title: 'Rainfall',
    subtitle: 'Amount and distribution',
    icon: 'cloud-rain',
    color: '#38bdf8',
    desc: 'The fundamental replenishment source. High precipitation in the northeast supports abundant recharge, while arid western tracts face continuous deficit.',
  },
  {
    id: 'topography',
    title: 'Topography',
    subtitle: 'Slope and drainage',
    icon: 'mountain',
    color: '#22c55e',
    desc: 'Steep relief promotes rapid surface runoff without percolation; flat alluvial plains and valley depressions maximize sustained infiltration.',
  },
  {
    id: 'landuse',
    title: 'Land Use',
    subtitle: 'Agriculture, urbanization',
    icon: 'sprout',
    color: '#f59e0b',
    desc: 'Vegetation cover retards runoff and improves infiltration, whereas urban pavement seals recharge zones and creates excessive runoff.',
  },
];
