export interface CalloutPoint {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeColor: string;
  pinX: number; // percentage from left
  pinY: number; // percentage from top
  category: string;
  iconName: string;
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

export interface MonthlyHydrology {
  month: string;
  surfacePct: number;
  gwPct: number;
  season: 'Monsoon' | 'Post-Monsoon' | 'Winter / Rabi' | 'Summer / Lean';
  surfaceFlowBCM: number;
  gwPumpedBCM: number;
  description: string;
}

export interface WhyConjunctivePoint {
  id: string;
  title: string;
  detail: string;
  iconName: string;
  accentColor: string;
}

export interface KeyConsideration {
  id: string;
  title: string;
  detail: string;
  iconName: string;
}

export const CALLOUT_POINTS: CalloutPoint[] = [
  {
    id: 'surface-water',
    title: 'Surface Water (Canal / Reservoir)',
    subtitle: 'Gravity canal conveyance & storage dams',
    badgeText: 'Surface Water (Canal/Reservoir)',
    badgeColor: '#1d4ed8',
    pinX: 51,
    pinY: 23,
    category: 'Surface Infrastructure',
    iconName: 'Waves',
    summary: 'Surface reservoirs and gravity canals capture excess monsoon runoff, supplying massive volumetric irrigation while preventing flood peaks in river basins.',
    technicalDetails: [
      {
        heading: 'Monsoon Surplus Diversion',
        description: 'During July–September high flows, canals run at full design capacity (Full Supply Level - FSL), distributing water across extensive agricultural command areas.'
      },
      {
        heading: 'Induced Aquifer Infiltration',
        description: 'Seepage from earthen and unlined canal beds actively recharges adjacent unconfined aquifers, replenishing the local water table by 15% to 30% annually.'
      },
      {
        heading: 'Gravity-Fed Energy Efficiency',
        description: 'Zero fuel or electricity consumption for water delivery across downstream command areas compared to motorized deep tube-well extraction.'
      }
    ],
    advantages: [
      'Captures seasonal floods that would otherwise drain into oceans',
      'Direct gravity delivery minimizes pumping energy costs',
      'Provides incidental sub-surface recharge to surrounding farmland',
      'Reduces soil salinity when used for periodic flushing'
    ],
    caseStudy: {
      region: 'Indira Gandhi Canal Command (Rajasthan)',
      implementation: 'Introduction of perennial surface canal water into the Thar desert ecosystem paired with selective shallow groundwater pumping.',
      impact: 'Transformed 1.9 million hectares of arid land into fertile cropland while controlling waterlogging through conjunctive farm drainage wells.'
    }
  },
  {
    id: 'irrigation',
    title: 'Agricultural Irrigation Network',
    subtitle: 'Kharif & Rabi dual water scheduling',
    badgeText: 'Irrigation',
    badgeColor: '#15803d',
    pinX: 64,
    pinY: 36,
    category: 'Productive Use',
    iconName: 'Sprout',
    summary: 'The primary beneficiary of conjunctive water use. Integrating canal turns with farm tube wells ensures round-the-year multi-cropping without water stress.',
    technicalDetails: [
      {
        heading: 'Kharif (Monsoon) Surface Dominance',
        description: 'Farmers utilize canal releases during heavy river flow periods, keeping groundwater pumps idle to conserve energy and permit aquifer recovery.'
      },
      {
        heading: 'Rabi / Zaid (Dry Season) Borewell Backup',
        description: 'When canal discharges drop in winter and pre-summer, energized shallow and deep borewells provide on-demand, precision micro-irrigation.'
      },
      {
        heading: 'Waterlogging & Salinity Prevention',
        description: 'In canal commands without tube wells, the water table often rises into root zones, causing waterlogging and salinization. Conjunctive pumping depresses the water table to a safe depth (2–5m below ground).'
      }
    ],
    advantages: [
      'Guarantees 100% crop security even during delayed or erratic monsoons',
      'Eliminates waterlogging by maintaining root-zone drainage',
      'Enables high-yield multiple cropping (Kharif, Rabi, and Summer Zaid)',
      'Improves water application efficiency from 35% (flood) to 75%+ (conjunctive drip)'
    ],
    caseStudy: {
      region: 'Western Yamuna Canal Command (Haryana)',
      implementation: 'Augmentation tube wells drilled along canal banks pumped saline/brackish groundwater mixed with sweet canal water at 1:4 ratio.',
      impact: 'Lowered hazardous water tables by 1.8 meters, completely reclaimed 25,000 hectares of saline soil, and increased cropping intensity by 42%.'
    }
  },
  {
    id: 'domestic-supply',
    title: 'Domestic & Municipal Supply',
    subtitle: 'Dual-source urban & rural drinking water grids',
    badgeText: 'Domestic Supply',
    badgeColor: '#6b21a8',
    pinX: 77,
    pinY: 31,
    category: 'Municipal Infrastructure',
    iconName: 'Home',
    summary: 'Cities and villages blend filtered surface reservoir supplies with potable groundwater to ensure 24/7 drinking water security and buffer against dry spells.',
    technicalDetails: [
      {
        heading: 'Quality Blending Standards',
        description: 'Groundwater high in dissolved minerals (TDS) or fluorides is blended with low-mineral surface water to achieve BIS 10500 drinking compliance.'
      },
      {
        heading: 'Peak Demand Smoothing',
        description: 'Surface water plants handle steady baseline domestic consumption, while deep municipal tube wells are spun up during peak morning hours and summer heatwaves.'
      },
      {
        heading: 'Dual-Reticulation Infrastructure',
        description: 'Treated surface water for drinking/cooking alongside reclaimed or shallow groundwater for sanitation, gardening, and fire hydrants.'
      }
    ],
    advantages: [
      'Uninterrupted potable water supply throughout seasonal droughts',
      'Safe mineral balancing compliant with WHO and BIS drinking standards',
      'Reduces strain on municipal treatment plants during turbidity spikes',
      'Decentralized borewell nodes ensure disaster resilience if main canal fails'
    ],
    caseStudy: {
      region: 'Bengaluru Metropolitan Grid (Karnataka)',
      implementation: 'Integration of Cauvery Stage V surface piped water (1,450 MLD) with decentralized ward-level borewells and rainwater recharge wells.',
      impact: 'Stabilized domestic distribution across 110 peripheral villages and cushioned against reservoir shortages during 2024 low rainfall.'
    }
  },
  {
    id: 'industrial-use',
    title: 'Industrial & Power Generation Use',
    subtitle: 'Zero Liquid Discharge (ZLD) & process water',
    badgeText: 'Industrial Use',
    badgeColor: '#9a3412',
    pinX: 92,
    pinY: 32,
    category: 'Industrial Sector',
    iconName: 'Factory',
    summary: 'Heavy industries and thermal power stations utilize surface canal allocations for cooling towers while maintaining standby deep aquifer wells to safeguard continuous production.',
    technicalDetails: [
      {
        heading: 'Continuous Process Cooling',
        description: 'Thermal power plants require steady thermal sink flows. Surface river flows meet volume requirements while recycling through multi-cycle cooling towers.'
      },
      {
        heading: 'Standby Aquifer Insurance',
        description: 'In the event of upstream canal maintenance, canal breaches, or toxic river spills, licensed on-site industrial aquifers ensure emergency manufacturing continuity.'
      },
      {
        heading: 'Mandatory Recharging Offset',
        description: 'Central Ground Water Authority (CGWA) guidelines require all heavy industries extracting groundwater to artificially recharge 150% to 200% of volume back into aquifers.'
      }
    ],
    advantages: [
      'Prevents multimillion-dollar daily production shutdowns from water shortages',
      'Incentivizes water recycling and Zero Liquid Discharge (ZLD) technology',
      'Mandatory recharge ponds replenish local village water table',
      'Strict monitoring meters prevent clandestine over-abstraction'
    ],
    caseStudy: {
      region: 'Dahej Petrochemical SEZ (Gujarat)',
      implementation: 'Narmada River industrial canal supply coupled with coastal deep aquifer reserves and desalination water sharing.',
      impact: 'Sustains over $12B of chemical processing without depleting shallow agricultural aquifers of local farming communities.'
    }
  },
  {
    id: 'groundwater-borewell',
    title: 'Groundwater (Borewell & Aquifer)',
    subtitle: 'Nature’s underground multi-year storage tank',
    badgeText: 'Groundwater (Borewell)',
    badgeColor: '#0369a1',
    pinX: 81,
    pinY: 42,
    category: 'Subsurface Reservoir',
    iconName: 'Droplet',
    summary: 'Deep confined and shallow unconfined aquifers serve as gigantic, zero-evaporation underground reservoirs that are drawn down in summer and replenished during monsoons.',
    technicalDetails: [
      {
        heading: 'Zero Evaporation Advantage',
        description: 'While tropical surface reservoirs lose 1.5 to 2.5 meters of water depth annually to solar evaporation, subsurface aquifers experience virtually zero evaporation.'
      },
      {
        heading: 'Submersible Casing & Strainers',
        description: 'Perforated casing pipes tap high-yield sand and gravel strata, utilizing multi-stage submersible turbine pumps for rapid on-demand extraction.'
      },
      {
        heading: 'Base Flow Contribution',
        description: 'A healthy groundwater table sustains hydraulic gradient toward rivers, feeding perennial dry-season base flow (effluent stream conditions).'
      }
    ],
    advantages: [
      'Protected from solar evaporation, surface siltation, and contamination',
      'Ubiquitous spatial access directly at farm plots without conveyance losses',
      'Acts as a multi-year drought buffer when surface reservoirs dry up',
      'Natural filtration through sand strata delivers biologically clean water'
    ],
    caseStudy: {
      region: 'Ganga-Brahmaputra Alluvial Basin (India)',
      implementation: 'The "Ganga Water Machine" concept: Intensive dry-season pumping creates underground storage space which naturally absorbs huge monsoon floods.',
      impact: 'Creates up to 40 BCM of additional renewable water storage capacity annually without building submergence-causing mega dams.'
    }
  }
];

export const MONTHLY_HYDROLOGY: MonthlyHydrology[] = [
  { month: 'Jun', surfacePct: 25, gwPct: 75, season: 'Monsoon', surfaceFlowBCM: 18, gwPumpedBCM: 32, description: 'Onset of South-West monsoon; early surface runoff begins replenishing canals.' },
  { month: 'Jul', surfacePct: 60, gwPct: 40, season: 'Monsoon', surfaceFlowBCM: 65, gwPumpedBCM: 15, description: 'Heavy monsoon rains; canals run full, canal seepage vigorously charges shallow aquifers.' },
  { month: 'Aug', surfacePct: 78, gwPct: 22, season: 'Monsoon', surfaceFlowBCM: 92, gwPumpedBCM: 8, description: 'Peak river flows; reservoir gates open, maximum surface diversion for Kharif paddy.' },
  { month: 'Sep', surfacePct: 72, gwPct: 28, season: 'Monsoon', surfaceFlowBCM: 78, gwPumpedBCM: 12, description: 'Late monsoon showers maintain full reservoirs; aquifers reach peak yearly water table.' },
  { month: 'Oct', surfacePct: 55, gwPct: 45, season: 'Post-Monsoon', surfaceFlowBCM: 45, gwPumpedBCM: 22, description: 'Transitional month; Kharif harvest and early Rabi seedbed preparation.' },
  { month: 'Nov', surfacePct: 38, gwPct: 62, season: 'Post-Monsoon', surfaceFlowBCM: 30, gwPumpedBCM: 35, description: 'Rabi sowing (wheat, mustard); canal rotation begins, tube wells activated.' },
  { month: 'Dec', surfacePct: 26, gwPct: 74, season: 'Winter / Rabi', surfaceFlowBCM: 22, gwPumpedBCM: 42, description: 'Cold weather; river baseflows recede, groundwater provides 74% of crop irrigation.' },
  { month: 'Jan', surfacePct: 18, gwPct: 82, season: 'Winter / Rabi', surfaceFlowBCM: 18, gwPumpedBCM: 48, description: 'Peak Rabi vegetative stage; tube well grids operate at high utilization.' },
  { month: 'Feb', surfacePct: 14, gwPct: 86, season: 'Winter / Rabi', surfaceFlowBCM: 14, gwPumpedBCM: 52, description: 'End of winter; snowmelt has not begun, groundwater is the primary lifeline.' },
  { month: 'Mar', surfacePct: 12, gwPct: 88, season: 'Summer / Lean', surfaceFlowBCM: 10, gwPumpedBCM: 58, description: 'Pre-summer heat; surface reservoirs drop to dead storage, groundwater buffers all demand.' },
  { month: 'Apr', surfacePct: 10, gwPct: 90, season: 'Summer / Lean', surfaceFlowBCM: 8, gwPumpedBCM: 62, description: 'Peak dry season; maximum aquifer drawdown, water table drops to seasonal low.' },
  { month: 'May', surfacePct: 15, gwPct: 85, season: 'Summer / Lean', surfaceFlowBCM: 9, gwPumpedBCM: 60, description: 'Pre-monsoon thunderstorms begin; preparations for incoming Kharif cycle.' }
];

export const WHY_CONJUNCTIVE_POINTS: WhyConjunctivePoint[] = [
  {
    id: 'why-1',
    title: 'Increases total water availability',
    detail: 'Combines dynamic seasonal river runoff with static underground storage to deliver 30–50% more usable water than relying on either source alone.',
    iconName: 'Droplets',
    accentColor: '#38bdf8'
  },
  {
    id: 'why-2',
    title: 'Improves reliability during droughts and dry seasons',
    detail: 'When monsoon rains fail and surface reservoirs run dry, deep aquifers act as a drought shock-absorber, preventing crop failures.',
    iconName: 'ShieldCheck',
    accentColor: '#38bdf8'
  },
  {
    id: 'why-3',
    title: 'Prevents over-exploitation of groundwater',
    detail: 'Using surface water during high-flow months rests the aquifers and allows water tables to naturally rebound and recharge.',
    iconName: 'Sprout',
    accentColor: '#22c55e'
  },
  {
    id: 'why-4',
    title: 'Optimizes use of existing infrastructure',
    detail: 'Leverages existing canal barrages and farm borewell installations synergistically without requiring expensive new mega-dams.',
    iconName: 'TrendingUp',
    accentColor: '#38bdf8'
  },
  {
    id: 'why-5',
    title: 'Maintains ecological balance',
    detail: 'Prevents land subsidence, halts coastal seawater ingress, and maintains base stream flows for aquatic habitats.',
    iconName: 'ShieldAlert',
    accentColor: '#22c55e'
  }
];

export const BENEFITS_LIST: string[] = [
  'Sustainable use of both surface and sub-surface water resources',
  'Reduces acute drawdown stress on deep aquifers during monsoons',
  'Improves multi-season water security across climate fluctuations',
  'Supports agriculture, industry and domestic needs seamlessly',
  'Acts as a vital insurance mechanism in regional drought management',
  'Maintains environmental base flow in rivers throughout dry months',
  'Enhances overall socio-economic resilience to climate variability'
];

export const KEY_CONSIDERATIONS: KeyConsideration[] = [
  {
    id: 'kc-1',
    title: 'Proper planning and integrated management',
    detail: 'Hydrological basin modeling to determine safe seasonal abstraction limits and recharge rates.',
    iconName: 'ClipboardList'
  },
  {
    id: 'kc-2',
    title: 'Monitoring of surface and groundwater levels',
    detail: 'Digital piezometers, telemetry river gauges, and satellite GRACE monitoring of aquifer mass anomalies.',
    iconName: 'Activity'
  },
  {
    id: 'kc-3',
    title: 'Institutional coordination between departments',
    detail: 'Bridging the administrative divide between Irrigation / Canal departments and Central Ground Water Boards.',
    iconName: 'Users'
  },
  {
    id: 'kc-4',
    title: 'Environmental impact assessment',
    detail: 'Evaluating salinity gradients, waterlogging risks, soil leaching, and minimum ecological river flows.',
    iconName: 'TreePine'
  },
  {
    id: 'kc-5',
    title: 'Equitable and efficient water allocation',
    detail: 'Fair water pricing, energy-metered pumping, and canal rostering for tail-end farming communities.',
    iconName: 'Scale'
  },
  {
    id: 'kc-6',
    title: 'Cost-effective and location-specific solutions',
    detail: 'Customizing strategies based on hydrogeology (e.g. alluvial plains vs. hard-rock peninsular basalt).',
    iconName: 'DollarSign'
  }
];
