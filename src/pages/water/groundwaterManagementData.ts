// Data model for Chapter 13: Management of Groundwater
// Matches User Reference Mockup with extreme fidelity

export interface CalloutFeature {
  id: string;
  badgeText: string;
  iconName: string;
  badgeColor: string;
  pinX: number; // percentage
  pinY: number; // percentage
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  technicalDetails: {
    heading: string;
    description: string;
  }[];
  advantages: string[];
  caseStudy: {
    region: string;
    implementation: string;
    impact: string;
  };
}

export interface KeyObjective {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  iconName: string;
  description: string;
}

export interface ManagementPrinciple {
  id: string;
  title: string;
  color: string;
  iconName: string;
  detail: string;
}

export interface StrategyMeasure {
  id: string;
  title: string;
  iconName: string;
  detail: string;
}

export interface ManagementLevel {
  id: string;
  level: string;
  desc: string;
  color: string;
  iconName: string;
}

// 4 Interactive Callouts pinned on the 3D cutaway landscape
export const GW_CALLOUT_POINTS: CalloutFeature[] = [
  {
    id: 'enhance-recharge',
    badgeText: 'Enhance Recharge',
    iconName: 'CloudRain',
    badgeColor: '#22c55e',
    pinX: 38.0,
    pinY: 11.5,
    category: 'Managed Aquifer Recharge (MAR)',
    title: 'Artificial & Natural Aquifer Recharge',
    subtitle: 'Replenishing depleted groundwater reservoirs using surface runoff and dedicated structures',
    summary:
      'Recharge enhancement captures excess monsoon surface runoff through check dams, percolation tanks, and infiltration basins to direct water downward into unconfined aquifers, raising groundwater tables and preventing saline intrusion.',
    technicalDetails: [
      {
        heading: 'Percolation Basins & Tanks',
        description:
          'Excavated surface ponds in permeable strata that capture monsoon runoff, allowing gravity-driven percolation to recharge unconfined aquifers at rates up to 15–30 cm/day.',
      },
      {
        heading: 'Check Dams & Nala Bunds',
        description:
          'Small masonry barriers built across ephemeral seasonal streams that impede water velocity, prevent rapid ocean runoff, and promote deep subsurface infiltration.',
      },
      {
        heading: 'Sub-surface Dykes & Infiltration Shafts',
        description:
          'Underground impermeable clay or masonry barriers across dry riverbeds that arrest lateral subterranean escape and store water safely underground.',
      },
    ],
    advantages: [
      'Eliminates large evaporative losses that plague tropical open reservoirs.',
      'Natural sub-surface soil and sand media acts as a biological and physical filter.',
      'Maintains base flows in downstream rivers and wetlands during severe dry seasons.',
    ],
    caseStudy: {
      region: 'Saurashtra Check Dam Movement (Gujarat)',
      implementation:
        'Community-driven construction of over 100,000 decentralized check dams and farm ponds across hard-rock Saurashtra terrain.',
      impact:
        'Groundwater levels rose by 3 to 9 meters across 4,000 villages, turning drought-prone districts into flourishing agricultural export belts.',
    },
  },
  {
    id: 'regulate-extraction',
    badgeText: 'Regulate Extraction',
    iconName: 'Sliders',
    badgeColor: '#a855f7',
    pinX: 50.4,
    pinY: 17.5,
    category: 'Demand-Side Extraction Control',
    title: 'Well Spacing & Extraction Limits',
    subtitle: 'Preventing acute drawdown cones through metering, borehole permits, and pumping caps',
    summary:
      'Unchecked borehole drilling leads to competitive deepening, drying of shallow community wells, and pump burnout. Statutory extraction regulation enforces well spacing norms, caps pumping durations, and rationalizes agricultural power supply.',
    technicalDetails: [
      {
        heading: 'Mandatory Well Spacing Norms',
        description:
          'Statutory minimum distance (typically 200m–500m) between tube-wells to prevent overlapping radii of influence and localized aquifer collapse.',
      },
      {
        heading: 'Agricultural Feeder Separation',
        description:
          'Rationing agricultural electricity to fixed 8-hour daily slots (e.g. Jyotigram Yojana), curbing uninhibited 24/7 motorized deep-well pumping.',
      },
      {
        heading: 'Industrial Volumetric Metering',
        description:
          'Mandatory digital telemetry flow-meters on commercial abstractions with tiered regulatory tariffs to incentivize industrial recycling and zero liquid discharge.',
      },
    ],
    advantages: [
      'Stops destructive competitive drilling spirals that drive marginal farmers into chronic debt.',
      'Protects deep confined fossil aquifers as strategic multi-year emergency drought reserves.',
      'Incentivizes rapid adoption of micro-irrigation systems (drip and sprinkler networks).',
    ],
    caseStudy: {
      region: 'Jyotigram Yojana Feeder Separation (Gujarat)',
      implementation:
        'Physical segregation of agricultural electricity lines from domestic lines, delivering scheduled 8 hours of high-voltage power for farming.',
      impact:
        'Halted runaway groundwater drawdown in over 18,000 villages while providing uninterrupted 24-hour electricity for rural cottage industries.',
    },
  },
  {
    id: 'monitor-levels',
    badgeText: 'Monitor Groundwater Levels',
    iconName: 'Activity',
    badgeColor: '#f59e0b',
    pinX: 62.8,
    pinY: 21.0,
    category: 'Hydrogeological Telemetry & Data',
    title: 'Digital Water Level Recorders & Piezometers',
    subtitle: 'Real-time telemetry and aquifer mapping for scientific water accounting and budgeting',
    summary:
      'Observation piezometers equipped with Digital Water Level Recorders (DWLRs) and satellite telemetry continuously transmit piezometric head data to national repositories (India-WRIS), enabling early drought warnings and precision water allocation.',
    technicalDetails: [
      {
        heading: 'Piezometric Pressure Transducers',
        description:
          'Automated hydrostatic sensors lowered into dedicated borewells measuring groundwater elevation at hourly intervals with ±1 cm precision.',
      },
      {
        heading: 'Heliborne Geophysical Mapping (NAQUIM)',
        description:
          'State-of-the-art transient electromagnetic (AEM) aerial surveys producing 3D subterranean geological maps down to 500 meters depth.',
      },
      {
        heading: 'Block-Level Stress Classification',
        description:
          'Annual empirical categorisation of assessment units into Safe (<70%), Semi-Critical (70–90%), Critical (90–100%), and Over-Exploited (>100%).',
      },
    ],
    advantages: [
      'Provides empirical, tamper-proof baseline data for village-level participatory water budgeting.',
      'Detects pre-monsoon water table collapse months before surface wells run completely dry.',
      'Guides targeted governmental investments in artificial recharge structures and canal diversions.',
    ],
    caseStudy: {
      region: 'National Aquifer Mapping Project (NAQUIM - CGWB)',
      implementation:
        'Comprehensive 3D hydrogeological mapping of over 25 lakh square kilometers with 60,000+ piezometric telemetry observation wells.',
      impact:
        'Formulated customized, science-backed groundwater management plans for over 7,000 administrative blocks across India.',
    },
  },
  {
    id: 'prevent-contamination',
    badgeText: 'Prevent Contamination',
    iconName: 'ShieldAlert',
    badgeColor: '#38bdf8',
    pinX: 76.5,
    pinY: 21.5,
    category: 'Aquifer Water Quality Protection',
    title: 'Pollution Prevention & Plume Remediation',
    subtitle: 'Safeguarding drinking aquifers from industrial effluents, agricultural nitrates, and geogenic toxins',
    summary:
      'Subsurface groundwater contamination is extraordinarily persistent and prohibitively expensive to remediate. Prevention prioritizes protective wellhead buffer zones, mandatory Zero Liquid Discharge (ZLD), and controlled agricultural chemical application.',
    technicalDetails: [
      {
        heading: 'Wellhead Protection Buffers',
        description:
          'Enforced sanitary protection zones (50m to 300m radius) around drinking water wells where all waste discharge, septic drainage, and pesticide use are banned.',
      },
      {
        heading: 'Industrial Containment & ZLD',
        description:
          'Double-lined impervious effluent lagoons with perimeter groundwater monitoring rings to intercept hazardous leachate before it reaches aquifers.',
      },
      {
        heading: 'Nitrate & Geogenic Toxin Mitigation',
        description:
          'Precision chemical fertigation guidelines and safe-depth paleo-channel tapping to bypass shallow arsenic and fluoride contaminated geological strata.',
      },
    ],
    advantages: [
      'Protects vital drinking water reservoirs serving millions of rural and urban families.',
      'Prevents irreversible geogenic and anthropogenic poisoning such as fluorosis, arsenicosis, and blue-baby syndrome.',
      'Saves millions of dollars in catastrophic pump-and-treat aquifer decontamination costs.',
    ],
    caseStudy: {
      region: 'Arsenic & Fluoride Safe Paleochannel Tapping (West Bengal & Rajasthan)',
      implementation:
        'Hydrogeological exploratory drilling through NAQUIM to locate deep, pristine paleo-channels protected by impermeable confining clay layers.',
      impact:
        'Provided clean, chemical-free drinking water to over 15 million villagers in arsenic-endemic floodplains.',
    },
  },
];

// Key Objectives (Left overlaid card on the stage)
export const KEY_OBJECTIVES: KeyObjective[] = [
  {
    id: 'sustainable-use',
    title: 'Sustainable use',
    subtitle: 'Balance withdrawal with replenishment',
    color: '#38bdf8',
    iconName: 'Droplet',
    description: 'Ensure annual extraction rates do not exceed long-term renewable aquifer recharge rates.',
  },
  {
    id: 'prevent-depletion',
    title: 'Prevent depletion',
    subtitle: 'Protect deep storage reserves',
    color: '#22c55e',
    iconName: 'ShieldCheck',
    description: 'Avoid excessive drawdown that dries shallow community wells and collapses aquifer pore spaces.',
  },
  {
    id: 'water-quality',
    title: 'Maintain water quality',
    subtitle: 'Guard against toxic plumes',
    color: '#f59e0b',
    iconName: 'Sparkles',
    description: 'Prevent industrial effluent seepage, agricultural nitrate leaching, and coastal saltwater intrusion.',
  },
  {
    id: 'equitable-access',
    title: 'Equitable access',
    subtitle: 'Fair community sharing',
    color: '#a855f7',
    iconName: 'Users',
    description: 'Ensure smallholder farmers and marginalized communities retain guaranteed access to potable water.',
  },
];

// Card 1: Management Principles
export const MANAGEMENT_PRINCIPLES: ManagementPrinciple[] = [
  {
    id: 'p1',
    title: 'Regulate and monitor extraction',
    color: '#38bdf8',
    iconName: 'Droplet',
    detail: 'Maintain strict control over well density, pumping horsepower, and seasonal discharge rates.',
  },
  {
    id: 'p2',
    title: 'Enhance natural and artificial recharge',
    color: '#22c55e',
    iconName: 'Sprout',
    detail: 'Construct catchment-wide percolation structures to harness monsoon runoff.',
  },
  {
    id: 'p3',
    title: 'Protect groundwater quality',
    color: '#14b8a6',
    iconName: 'ShieldCheck',
    detail: 'Eliminate toxic surface dumping and enforce sanitary wellhead protection zones.',
  },
  {
    id: 'p4',
    title: 'Integrated and participatory management',
    color: '#38bdf8',
    iconName: 'Users',
    detail: 'Empower village water and sanitation committees (VWSCs) to govern local extraction.',
  },
  {
    id: 'p5',
    title: 'Policy, legal and institutional framework',
    color: '#60a5fa',
    iconName: 'FileText',
    detail: 'Implement model groundwater bills, statutory licensing, and community water rights.',
  },
  {
    id: 'p6',
    title: 'Long-term sustainability focus',
    color: '#818cf8',
    iconName: 'Compass',
    detail: 'Safeguard intergenerational water security through climate-resilient resource planning.',
  },
];

// Card 2: Strategies and Measures
export const STRATEGIES_MEASURES: StrategyMeasure[] = [
  {
    id: 's1',
    title: 'Rainwater harvesting and recharge structures (check dams, percolation tanks)',
    iconName: 'Landmark',
    detail: 'Check dams, recharge shafts, percolation ponds, and farm contour bunding.',
  },
  {
    id: 's2',
    title: 'Regulation of well drilling and extraction limits',
    iconName: 'Sliders',
    detail: 'Permit requirements for commercial borewells, depth caps, and well spacing norms.',
  },
  {
    id: 's3',
    title: 'Watershed management and land use planning',
    iconName: 'Trees',
    detail: 'Reforestation, vegetative contour barriers, and drainage ridge-to-valley treatments.',
  },
  {
    id: 's4',
    title: 'Pollution control and waste management',
    iconName: 'Factory',
    detail: 'Zero liquid discharge mandates, sewage treatment plants, and safe pesticide protocols.',
  },
  {
    id: 's5',
    title: 'Monitoring, data collection and groundwater modelling',
    iconName: 'LineChart',
    detail: 'Automated DWLR telemetry, geophysical surveys, and predictive GIS flow models.',
  },
  {
    id: 's6',
    title: 'Community participation and awareness',
    iconName: 'HeartHandshake',
    detail: 'Jal Chaupals, water budgeting workshops, and participatory aquifer literacy drives.',
  },
];

// Card 3: Management at Different Levels
export const MANAGEMENT_LEVELS: ManagementLevel[] = [
  {
    id: 'policy',
    level: 'Policy Level',
    desc: 'Laws, regulations, allocation and institutional setup',
    color: '#22c55e',
    iconName: 'Landmark',
  },
  {
    id: 'planning',
    level: 'Planning Level',
    desc: 'Assessment, modelling and management plans',
    color: '#38bdf8',
    iconName: 'Cog',
  },
  {
    id: 'implementation',
    level: 'Implementation Level',
    desc: 'Recharge structures, demand management, monitoring',
    color: '#f59e0b',
    iconName: 'MapPin',
  },
  {
    id: 'community',
    level: 'Community Level',
    desc: 'Awareness, participation and local water governance',
    color: '#c084fc',
    iconName: 'Users',
  },
];

// Card 4: Expected Outcomes
export const EXPECTED_OUTCOMES: string[] = [
  'Maintained groundwater levels',
  'Improved water quality',
  'Reduced risk of depletion and contamination',
  'Sustainable water supply for agriculture, industry and domestic use',
  'Resilient ecosystems and water security for future generations',
];
