export interface SummaryItem {
  id: string;
  category: 'takeaway' | 'stat' | 'challenge' | 'solution';
  title: string;
  value?: string;
  label?: string;
  iconName: string;
  description: string;
  detailTitle: string;
  detailBody: string[];
  keyFacts: { label: string; value: string }[];
  tag?: string;
}

export const SUMMARY_TAKEAWAYS: SummaryItem[] = [
  {
    id: 'takeaway-cycle',
    category: 'takeaway',
    title: 'Water exists in different forms and moves continuously through the hydrological cycle.',
    iconName: 'Droplets',
    description: 'Evaporation, transpiration, condensation, precipitation, and percolation form a closed, dynamic planetary loop.',
    detailTitle: 'Dynamic Planetary Hydrological Cycle',
    detailBody: [
      'The global hydrological cycle operates as a closed continuous engine driven by solar radiation and gravity.',
      'Water perpetually shifts across solid, liquid, and gaseous phases between atmosphere, surface water bodies, soil moisture, and deep lithospheric aquifers.',
      'Understanding residency times—ranging from 9 days in the atmosphere to thousands of years in deep fossil aquifers—is essential for sustainable replenishment calculations.'
    ],
    keyFacts: [
      { label: 'Global Water Volume', value: '1,386 Million km³' },
      { label: 'Atmospheric Turnover', value: '~8 to 10 Days' },
      { label: 'Deep GW Residence', value: 'Up to 10,000+ Years' }
    ],
    tag: 'Hydrology'
  },
  {
    id: 'takeaway-sources',
    category: 'takeaway',
    title: 'Major sources include rainfall, surface water, groundwater and desalinated seawater.',
    iconName: 'Waves',
    description: 'Precipitation feeds surface runoff and aquifer recharge, supplemented by emerging non-conventional desalination.',
    detailTitle: 'Primary & Secondary Water Sources',
    detailBody: [
      'Precipitation constitutes the fundamental input of all terrestrial freshwater systems, feeding rivers, lakes, wetlands, and subterranean aquifers.',
      'Surface reservoirs provide bulk volumetric storage for irrigation and hydropower, but suffer substantial evaporative losses in tropical zones.',
      'Groundwater acts as a natural underground buffer against drought, while thermal and membrane-based seawater desalination serves water-stressed coastal hubs.'
    ],
    keyFacts: [
      { label: 'Indian Annual Rainfall', value: '~4,000 BCM' },
      { label: 'Utilizable Water', value: '1,123 BCM (690 Surface + 433 GW)' },
      { label: 'Coastal Desalination', value: 'Rapidly Growing in TN & Gujarat' }
    ],
    tag: 'Resource Base'
  },
  {
    id: 'takeaway-india',
    category: 'takeaway',
    title: 'India has diverse water resources but faces regional and seasonal imbalances.',
    iconName: 'Globe',
    description: 'Over 75% of annual rainfall is concentrated within the 3-4 months of the Southwest Monsoon.',
    detailTitle: 'Spatio-Temporal Disparities in India',
    detailBody: [
      'India experiences acute temporal skewness: nearly 75% to 80% of total annual precipitation falls during the short 100-day Southwest Monsoon window.',
      'Spatially, per-capita availability varies drastically from over 14,000 m³/year in the Brahmaputra basin to less than 300 m³/year in the Sabarmati and western arid basins.',
      'This mismatch creates concurrent occurrences of severe seasonal flooding in eastern floodplains alongside chronic drought in the peninsular rain-shadow.'
    ],
    keyFacts: [
      { label: 'Monsoon Window', value: 'June to September (~100 Days)' },
      { label: 'Brahmaputra Basin', value: '>14,000 m³/capita/yr' },
      { label: 'Sabarmati Basin', value: '<300 m³/capita/yr (Extreme Stress)' }
    ],
    tag: 'Distribution'
  },
  {
    id: 'takeaway-uses',
    category: 'takeaway',
    title: 'Water is essential for domestic, agricultural, industrial and environmental uses.',
    iconName: 'Factory',
    description: 'Agriculture consumes the vast majority of extracted freshwater, followed by thermal industry and municipal supply.',
    detailTitle: 'Multi-Sectoral Water Allocation',
    detailBody: [
      'Agriculture dominates India’s water footprint, accounting for nearly 85–90% of total freshwater withdrawals primarily for flood-irrigated paddy, sugarcane, and wheat.',
      'Industrial and energy sectors consume approximately 7–9%, with thermal power plant cooling being the single largest industrial consumer.',
      'Domestic consumption accounts for 5–7%, requiring stringent potable water quality compliance under National Jal Jeevan Mission standards.'
    ],
    keyFacts: [
      { label: 'Agriculture Share', value: '~85–90% of Withdrawals' },
      { label: 'Industrial & Energy', value: '~7–9%' },
      { label: 'Domestic Supply', value: '~5–7% (Target 55 LPCD rural)' }
    ],
    tag: 'Demand'
  },
  {
    id: 'takeaway-sustainability',
    category: 'takeaway',
    title: 'Sustainable conservation and management are critical for future water security.',
    iconName: 'Leaf',
    description: 'Proactive conservation, conjunctive management, and community stewardship are indispensable for long-term survival.',
    detailTitle: 'Imperative of Water Security & Stewardship',
    detailBody: [
      'Without rigorous demand-side management and watershed-scale conservation, India risks crossing the severe water scarcity threshold (<1,000 m³/capita/year).',
      'Sustainable management requires transitioning from supply-augmentation paradigms toward end-use efficiency, aquifer-specific recharge, and waste minimization.',
      'Institutional integration across Central, State, and Panchayat tiers is vital to achieve inter-generational water equity.'
    ],
    keyFacts: [
      { label: 'Per Capita Threshold', value: '1,000 m³/yr = Scarcity' },
      { label: 'Target Water Savings', value: '20% Efficiency Gain (NWM)' },
      { label: 'Policy Framework', value: 'National Water Policy (NWP)' }
    ],
    tag: 'Conservation'
  }
];

export const SUMMARY_STATISTICS: SummaryItem[] = [
  {
    id: 'stat-earth-surface',
    category: 'stat',
    title: '~71%',
    value: '~71%',
    label: "of Earth's surface is covered by water",
    iconName: 'Globe',
    description: 'Earth is the Blue Planet, yet saline oceans comprise over 97% of the total hydrosphere.',
    detailTitle: 'Global Oceanic & Terrestrial Coverage',
    detailBody: [
      'Approximately 361 million km² of the Earth’s 510 million km² total surface area is blanketed by water bodies.',
      'The vast ocean volume of 1.338 billion km³ governs planetary climate, atmospheric circulation, and heat distribution across hemispheres.',
      'Despite this immense marine expanse, saline water cannot be utilized directly for agriculture or human hydration without energy-intensive desalination.'
    ],
    keyFacts: [
      { label: 'Total Hydrosphere', value: '1.386 Billion km³' },
      { label: 'Oceans & Seas', value: '97.2%' },
      { label: 'Salinity Average', value: '35 PSU (Parts per Thousand)' }
    ],
    tag: 'Global Metric'
  },
  {
    id: 'stat-freshwater',
    category: 'stat',
    title: '~2.5%',
    value: '~2.5%',
    label: 'of total water is freshwater',
    iconName: 'Droplet',
    description: 'The usable slice of global water is remarkably slim, with the majority locked in ice sheets and glaciers.',
    detailTitle: 'The Global Freshwater Fraction',
    detailBody: [
      'Freshwater accounts for only ~35 million km³ of all water on Earth.',
      'Nearly 68.7% of this freshwater is locked in ice caps and glaciers (Greenland, Antarctica), and 30.1% exists underground as groundwater.',
      'Accessible surface freshwater in rivers, lakes, and freshwater wetlands constitutes a mere 0.3% of all freshwater (~0.007% of all planetary water).'
    ],
    keyFacts: [
      { label: 'Glaciers & Ice Caps', value: '68.7% of Freshwater' },
      { label: 'Groundwater Fraction', value: '30.1% of Freshwater' },
      { label: 'Surface Lakes & Rivers', value: '~0.3% of Freshwater' }
    ],
    tag: 'Freshwater Slice'
  },
  {
    id: 'stat-india-population',
    category: 'stat',
    title: '~18%',
    value: '~18%',
    label: "of the world's population lives in India (but has only ~4% of global freshwater)",
    iconName: 'Users',
    description: 'India bears an extreme demographic burden relative to its finite endowment of renewable freshwater.',
    detailTitle: 'India Demographic vs Hydrological Disparity',
    detailBody: [
      'India sustains over 1.4 billion citizens (~18% of global humanity) on just 2.4% of the world’s geographical area and ~4% of its freshwater resources.',
      'Per-capita water availability has plunged from 5,177 m³ in 1951 to approximately 1,486 m³ in 2021, categorizing India under official water stress (<1,700 m³).',
      'By 2050, continued demographic and economic growth threatens to push per-capita availability dangerously close to the 1,000 m³ absolute scarcity line.'
    ],
    keyFacts: [
      { label: 'India Population', value: '1.42+ Billion (~18% Global)' },
      { label: 'Renewable Freshwater', value: '~4% of Global Total' },
      { label: 'Per Capita (2021)', value: '1,486 m³/year (Water Stressed)' }
    ],
    tag: 'Demographic Stress'
  },
  {
    id: 'stat-irrigation-gw',
    category: 'stat',
    title: '~60–65%',
    value: '~60–65%',
    label: "of India's irrigation depends on groundwater",
    iconName: 'Layers',
    description: 'Over 20 million motorized tube-wells underpin the green revolution and national food security.',
    detailTitle: 'Groundwater Irrigation Backbone',
    detailBody: [
      'Groundwater is the linchpin of Indian agrarian food security, irrigating ~62% of net irrigated farmland compared to only ~24% served by surface canals.',
      'Groundwater-irrigated agriculture yields 30–50% higher crop productivity per hectare than canal systems due to on-demand localized reliability.',
      'However, subsidized or free agricultural electricity in states like Punjab, Haryana, and Rajasthan has catalyzed rampant unmetered extraction from deep aquifers.'
    ],
    keyFacts: [
      { label: 'GW Irrigated Share', value: '62–65% Net Irrigated Area' },
      { label: 'Tubewells / Borewells', value: '>20 Million Operational Units' },
      { label: 'Agricultural GW Share', value: '89% of Total GW Draft' }
    ],
    tag: 'Agrarian Baseline'
  },
  {
    id: 'stat-natural-recharge',
    category: 'stat',
    title: 'Only ~15–20%',
    value: 'Only ~15–20%',
    label: 'of annual groundwater extraction is naturally recharged',
    iconName: 'ArrowDownCircle',
    description: 'Extraction rates severely outpace natural precipitation infiltration in critical hydrogeological zones.',
    detailTitle: 'Groundwater Recharge Deficit',
    detailBody: [
      'In high-extraction agricultural and urban basins, annual extraction drafts substantially outstrip meteoric infiltration volumes.',
      'Natural recharge through hard-rock peninsular basalt and crystalline granites is sluggish, yielding infiltration coefficients of merely 7% to 12%.',
      'Urban impervious surfaces prevent storm runoff infiltration, converting potential aquifer replenishment into urban flash floods.'
    ],
    keyFacts: [
      { label: 'Annual GW Extraction', value: '~245–250 BCM' },
      { label: 'Annual Recharge Potential', value: '437.6 BCM (National Total)' },
      { label: 'Over-Exploited Blocks', value: '>1,100 Assessment Units' }
    ],
    tag: 'Recharge Deficit'
  }
];

export const SUMMARY_CHALLENGES: SummaryItem[] = [
  {
    id: 'chal-distribution',
    category: 'challenge',
    title: 'Uneven distribution of water resources',
    iconName: 'AlertTriangle',
    description: 'Spatial and seasonal precipitation variations create chronic dryland zones alongside perennial flood plains.',
    detailTitle: 'Geographical Disparities & Regional Aridity',
    detailBody: [
      'The Indo-Gangetic and Brahmaputra basins receive substantial glacier and monsoon inflows, whereas peninsular and western river basins suffer severe deficit.',
      'Over 68% of the country’s cultivated land is vulnerable to drought of varying intensities across the Deccan plateau and Thar desert regions.',
      'Seasonal concentration of rainfall into roughly 100 rainy days leaves the remaining 265 days reliant entirely on stored storage.'
    ],
    keyFacts: [
      { label: 'High Inflow Basins', value: 'Ganga & Brahmaputra (>60% Runoff)' },
      { label: 'Drought-Prone Area', value: '~68% Cultivable Area' },
      { label: 'Seasonal Runoff Ratio', value: '>80% in Monsoon Months' }
    ]
  },
  {
    id: 'chal-demand',
    category: 'challenge',
    title: 'Increasing demand due to population, agriculture and industrial growth',
    iconName: 'AlertTriangle',
    description: 'Expanding urbanization, intensive multi-cropping, and industrialization drive exponential withdrawal pressures.',
    detailTitle: 'Surging Multi-Sectoral Consumption',
    detailBody: [
      'Rapid urbanization is projected to push urban population past 600 million by 2030, multiplying municipal demand and sewage loads.',
      'High-water-intensity crops like sugarcane and summer paddy continue to be incentivized by minimum support pricing in moisture-deficient zones.',
      'Total annual freshwater demand is projected to escalate from 825 BCM (2025) to over 1,180 BCM by 2050, exceeding total utilizable resources.'
    ],
    keyFacts: [
      { label: 'Projected 2050 Demand', value: '1,180 BCM/year' },
      { label: 'Current Utilizable Cap', value: '1,123 BCM/year' },
      { label: 'Urban Population 2030', value: '~600 Million' }
    ]
  },
  {
    id: 'chal-depletion',
    category: 'challenge',
    title: 'Groundwater depletion in many regions',
    iconName: 'AlertTriangle',
    description: 'Water tables are falling at rates up to 1 meter per year in the northwestern agricultural breadbasket.',
    detailTitle: 'Aquifer Exhaustion & Falling Water Tables',
    detailBody: [
      'Intensive deep-tube-well irrigation has drawn down ancient unconfined and semi-confined aquifers across Punjab, Haryana, and Rajasthan.',
      'Falling water tables compel farmers to drill down to 300–400 meters, consuming high electricity and encountering saline fossil water.',
      'Land subsidence and irreversible compaction of clay aquitard layers permanently destroy pore storage capacity.'
    ],
    keyFacts: [
      { label: 'Depletion Rate (NW India)', value: 'Up to 0.5–1.0 m/year' },
      { label: 'Critical Assessment Units', value: '17% Over-Exploited (CGWB)' },
      { label: 'Energy Burden', value: '>20% Farm Power for Tubewells' }
    ]
  },
  {
    id: 'chal-contamination',
    category: 'challenge',
    title: 'Contamination of surface and groundwater',
    iconName: 'AlertTriangle',
    description: 'Geogenic arsenic and fluoride combine with anthropogenic sewage, agrochemicals, and industrial effluents.',
    detailTitle: 'Severe Water Quality Degradation',
    detailBody: [
      'Over 80% of untreated municipal sewage flows directly into rivers, transforming major waterways into biologically degraded conduits.',
      'Geogenic contamination afflicts millions: fluoride causes fluorosis in 230 districts; arsenic in the Bengal basin causes severe carcinogenicity.',
      'Excessive synthetic nitrogenous fertilizers (urea) leach nitrates (>45 mg/L) into shallow drinking water wells, posing blue baby syndrome risks.'
    ],
    keyFacts: [
      { label: 'Untreated Sewage Entry', value: '>70% Municipal Wastewater' },
      { label: 'Fluoride-Affected Dists', value: '230+ Districts Across 19 States' },
      { label: 'Nitrate Limit Exceeded', value: '>45 mg/L in 380+ Districts' }
    ]
  },
  {
    id: 'chal-seawater-ingress',
    category: 'challenge',
    title: 'Seawater ingress in coastal areas',
    iconName: 'AlertTriangle',
    description: 'Over-pumping in coastal aquifers reverses the natural hydraulic gradient, drawing hyper-saline oceanic water inland.',
    detailTitle: 'Marine Intrusion into Coastal Freshwater Aquifers',
    detailBody: [
      'Intensive groundwater extraction along Saurashtra, Chennai, Minjur, and Puri coasts has disrupted the fragile Ghyben-Herzberg balance.',
      'Dense seawater invades fresh coastal aquifers, elevating chloride concentrations from <250 mg/L to over 3,000 mg/L, ruining wells.',
      'Salinized soils cause extensive agricultural barrenness and destroy coastal drinking water supplies, forcing expensive tanker logistics.'
    ],
    keyFacts: [
      { label: 'Inland Intrusion Reach', value: 'Up to 10–12 km in Saurashtra' },
      { label: 'Chloride Threshold Exceeded', value: '>1,000 mg/L (Potable <250)' },
      { label: 'Vulnerable Coastline', value: '7,516 km Indian Coastline' }
    ]
  },
  {
    id: 'chal-disputes',
    category: 'challenge',
    title: 'Inter-state and regional disputes over water',
    iconName: 'AlertTriangle',
    description: 'Federal river water sharing disputes create socio-political friction and impede coordinated basin-wide planning.',
    detailTitle: 'Riparian Tensions & Inter-State River Disputes',
    detailBody: [
      'Shared river basins—such as Cauvery (Karnataka/TN), Krishna (AP/Telangana/Karnataka), and Ravi-Beas—face prolonged tribunal litigations.',
      'During drought years, upstream impoundments lead to acute distress downstream, provoking severe civil strikes and economic uncertainty.',
      'Fragmented state-level administrative jurisdictions hinder the deployment of cohesive Integrated River Basin Management.'
    ],
    keyFacts: [
      { label: 'Active Water Tribunals', value: 'Cauvery, Krishna, Mahanadi, Mahadayi' },
      { label: 'Constitutional Clause', value: 'Article 262 (Inter-State Disputes)' },
      { label: 'Basin Fragmentation', value: '14 Major Rivers Span Multiple States' }
    ]
  },
  {
    id: 'chal-climate-change',
    category: 'challenge',
    title: 'Climate change and uncertain rainfall patterns',
    iconName: 'AlertTriangle',
    description: 'Accelerated Himalayan glacial retreat and erratic monsoonal cloudbursts intensify flood-drought cycles.',
    detailTitle: 'Climatic Volatility & Monsoonal Perturbations',
    detailBody: [
      'Warming climatic baselines have shifted rainfall regimes into fewer, more intense downpours, reducing soil infiltration and elevating flash runoff.',
      'Himalayan cryospheric retreat threatens long-term dry-season baseflows of perennial northern lifelines: Indus, Ganga, and Brahmaputra.',
      'Prolonged dry spells alternate with localized cloudbursts, severely challenging hydraulic dam management and municipal drainage.'
    ],
    keyFacts: [
      { label: 'Monsoon Rain Intensity', value: '+30% Heavy Rainfall Events' },
      { label: 'Glacial Mass Loss', value: '~0.5 m/yr Retreat Rate' },
      { label: 'Projected Flow Variations', value: 'Higher Monsoon, Lower Summer Baseflow' }
    ]
  }
];

export const SUMMARY_SOLUTIONS: SummaryItem[] = [
  {
    id: 'sol-conserve-manage',
    category: 'solution',
    title: 'Conserve and manage surface and groundwater resources',
    iconName: 'ShieldCheck',
    description: 'Establish integrated holistic watershed development, check dams, and revive traditional water bodies.',
    detailTitle: 'Comprehensive Watershed & Aquifer Conservation',
    detailBody: [
      'Implement ridge-to-valley soil and water conservation measures, contour bunds, gabion structures, and percolation tanks.',
      'Revive traditional water harvesting heritage: stepwells (Baolis), Johads, Eri tanks, and Ahar-Pynes across historical rain catchments.',
      'Implement water accounting frameworks to strictly balance safe extraction yields against verifiable annual replenishment.'
    ],
    keyFacts: [
      { label: 'Traditional Tanks', value: '>500,000 Historical Water Bodies' },
      { label: 'Amrit Sarovar Goal', value: '50,000+ Revived Water Bodies' },
      { label: 'Watershed Impact', value: '15–30% Groundwater Table Recovery' }
    ]
  },
  {
    id: 'sol-rainwater-recharge',
    category: 'solution',
    title: 'Promote rainwater harvesting and artificial recharge',
    iconName: 'ShieldCheck',
    description: 'Mandate rooftop rainwater capture and inject storm runoff into depleted aquifers via recharge shafts.',
    detailTitle: 'Universal Rainwater Harvesting & Managed Aquifer Recharge (MAR)',
    detailBody: [
      'Enforce municipal bylaws requiring mandatory rooftop rainwater harvesting systems on all urban residential and commercial plots.',
      'Deploy subsurface injection wells, filter shafts, and percolation trenches to capture silt-free storm runoff directly into dry unconfined zones.',
      'Central Ground Water Board (CGWB) master plans target artificial recharge of over 85 BCM through 11 million tailored recharge structures.'
    ],
    keyFacts: [
      { label: 'CGWB Master Plan Target', value: '85.8 BCM Artificial Recharge' },
      { label: 'Urban Rooftop Potential', value: '150–200 Litres/m² of Roof Area' },
      { label: 'Recharge Structures Planned', value: '11.1 Million National Units' }
    ]
  },
  {
    id: 'sol-conjunctive-use',
    category: 'solution',
    title: 'Adopt conjunctive use of surface and groundwater',
    iconName: 'ShieldCheck',
    description: 'Synchronize canal deliveries and tubewell pumping to suppress waterlogging while preventing aquifer drawdown.',
    detailTitle: 'Conjunctive Operation in Command Areas',
    detailBody: [
      'Coordinate surface canal releases with selective groundwater pumping to prevent canal command waterlogging and salinization.',
      'Recharge surplus monsoon canal flows into underlying regional aquifers through dedicated spreading basins and abandoned river channels.',
      'Optimizes total cropping intensity, enhances agricultural resilience, and guarantees buffer supplies during dry canal maintenance rotations.'
    ],
    keyFacts: [
      { label: 'Cropping Intensity Boost', value: 'Up to 150–200%' },
      { label: 'Waterlogging Prevention', value: 'Controls Capillary Salinization' },
      { label: 'Command Synergy', value: 'Canal Head + Tubewell Tail Balance' }
    ]
  },
  {
    id: 'sol-efficiency-practices',
    category: 'solution',
    title: 'Implement efficient water use practices in agriculture, industry and domestic sectors',
    iconName: 'ShieldCheck',
    description: 'Expand micro-irrigation (drip and sprinkler), industrial zero-liquid discharge, and aerated domestic faucets.',
    detailTitle: 'Demand-Side Efficiency & Micro-Irrigation',
    detailBody: [
      'Scale PMKSY (Per Drop More Crop) micro-irrigation: drip and sprinkler technologies deliver 40–60% water savings while elevating crop yields by 20–35%.',
      'Encourage System of Rice Intensification (SRI) and direct-seeded rice (DSR) to slash agrarian water requirements by 30% without yield penalty.',
      'Enforce Zero Liquid Discharge (ZLD) protocols for high-polluting industries (textiles, tanneries, distilleries) to mandate 95%+ recycling.'
    ],
    keyFacts: [
      { label: 'Drip Irrigation Savings', value: '40–60% Less Water vs Flood' },
      { label: 'Yield Increase', value: '20–35% Higher Productivity' },
      { label: 'Industrial Reuse Target', value: 'Mandatory 20% Recycled Water Use' }
    ]
  },
  {
    id: 'sol-prevent-contamination',
    category: 'solution',
    title: 'Prevent contamination through proper waste management',
    iconName: 'ShieldCheck',
    description: 'Treat 100% of municipal sewage, build industrial CETPs, and enforce stringent effluent discharge norms.',
    detailTitle: 'Wastewater Treatment & Source-Water Protection',
    detailBody: [
      'Upgrade Sewage Treatment Plants (STPs) with tertiary filtration and UV disinfection to repurpose treated wastewater for municipal landscaping and cooling.',
      'Construct Common Effluent Treatment Plants (CETPs) in industrial clusters with online continuous effluent monitoring systems (OCEMS).',
      'Establish protective sanitary wellhead protection zones around public drinking water borewells to prevent septic and livestock runoff ingress.'
    ],
    keyFacts: [
      { label: 'STP National Target', value: '100% Urban Sewage Treatment' },
      { label: 'Reclaimed Water Use', value: 'Power Plant Cooling & Construction' },
      { label: 'Wellhead Protection', value: '30m Sanitary Exclusion Radius' }
    ]
  },
  {
    id: 'sol-iwrm-policies',
    category: 'solution',
    title: 'Develop integrated water resources management policies',
    iconName: 'ShieldCheck',
    description: 'Transition to River Basin Authorities, real-time telemetry networks, and transparent legal extraction quotas.',
    detailTitle: 'Integrated Water Resources Management (IWRM) Governance',
    detailBody: [
      'Establish River Basin Organizations (RBOs) with statutory powers to manage river ecosystems beyond state territorial disputes.',
      'Implement the National Aquifer Mapping and Management Program (NAQUIM) to demarcate 3D aquifer geometries and calculate safe extraction caps.',
      'Enact participatory groundwater legislation that links power tariffs or quotas directly to verified local aquifer replenishment.'
    ],
    keyFacts: [
      { label: 'NAQUIM Coverage', value: '>25 Lakh km² Mapped Nationally' },
      { label: 'Governance Level', value: 'River Basin Scale vs State Borders' },
      { label: 'Policy Blueprint', value: 'Model Bill for Groundwater Regulation' }
    ]
  },
  {
    id: 'sol-awareness-community',
    category: 'solution',
    title: 'Raise public awareness and ensure community participation',
    iconName: 'ShieldCheck',
    description: 'Empower village Water and Sanitation Committees (Pani Samitis) and institutionalize community water budgeting.',
    detailTitle: 'Participatory Groundwater Management (PGWM)',
    detailBody: [
      'Empower local communities through Gram Panchayat Pani Samitis to conduct democratic annual water budgeting based on monsoon rainfall.',
      'Educate farmers with low-cost monitoring tools like water level indicators in local observation wells to visualize hidden groundwater declines.',
      'School curricula and mass public campaigns (Jal Shakti Abhiyan - Catch the Rain) transform water conservation from a government chore into a Jan Andolan (people’s movement).'
    ],
    keyFacts: [
      { label: 'Atal Bhujal Yojana', value: 'Community GW Management in 7 States' },
      { label: 'Pani Samiti Mandate', value: '50% Female Representation' },
      { label: 'Flagship Campaign', value: 'Catch the Rain: Where it falls, when it falls' }
    ]
  }
];
