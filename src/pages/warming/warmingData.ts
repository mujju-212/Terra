// Module 05: Global Warming & EIA — Complete Curriculum Data (BCV755B)

export interface WarmingIndicator {
  id: string;
  num: string;
  name: string;
  direction: 'rising' | 'falling';
  rate: string;
  metric: string;
  tag: 'Atmosphere' | 'Cryosphere' | 'Ocean' | 'Land';
  summary: string;
  detail: string;
  feedback?: string;
}

export interface WarmingCause {
  id: string;
  gas: string;
  formula: string;
  share: string;
  gwp: string;
  lifetime: string;
  color: string;
  sources: { title: string; share?: string; desc: string }[];
  significance: string;
}

export interface WarmingEffect {
  id: string;
  num: string;
  title: string;
  category: 'Extreme Weather' | 'Cryosphere & Oceans' | 'Agriculture & Food' | 'Human Health' | 'Ecosystems';
  severity: 'Critical' | 'Severe' | 'High';
  shortDesc: string;
  longDesc: string;
  stat?: string;
  impactZone: string;
}

export interface ClimateIndicator {
  id: string;
  num: string;
  title: string;
  headline: string;
  badge: string;
  impacts: { subtitle: string; description: string }[];
  caseStudy?: string;
  stat: string;
}

export interface EiaPhase {
  id: string;
  num: string;
  name: string;
  tagline: string;
  whoDoes: string;
  keyAction: string;
  description: string;
  categories?: { label: string; desc: string; example: string }[];
  criteria?: string[];
  components?: string[];
  outcomes?: string[];
}

export interface EiaReportComponent {
  id: string;
  letter: string;
  title: string;
  linkedModule?: { name: string; slug: string; path: string };
  scope: string;
  items: string[];
  mitigations: string[];
  stat?: string;
}

// ─── SECTION 02: 10 GLOBAL WARMING INDICATORS ───
export const warmingIndicatorsData: WarmingIndicator[] = [
  {
    id: 'air-temp',
    num: '01',
    name: 'Air Surface Temperature',
    direction: 'rising',
    rate: '+1.1°C to +2.0°C',
    metric: 'Global surface anomaly',
    tag: 'Atmosphere',
    summary: 'The most direct and widely measured indicator of anthropogenic planetary warming.',
    detail: 'Global average air surface temperatures have risen consistently over the past century. Even a 1–2°C increase has profound, cascading impacts on climate patterns and ecosystems.',
    feedback: 'Drives atmospheric expansion and changes thermal balance.',
  },
  {
    id: 'humidity',
    num: '02',
    name: 'Specific Humidity',
    direction: 'rising',
    rate: '+7% per °C warming',
    metric: 'Atmospheric water vapor',
    tag: 'Atmosphere',
    summary: 'Higher temperatures cause rapid surface evaporation, loading the air with water vapor.',
    detail: 'Water vapor is itself a potent greenhouse gas. As rising temperatures evaporate more water from oceans and soils, the extra vapor traps more heat, creating a relentless positive feedback loop.',
    feedback: 'Critical positive feedback: higher heat → more evaporation → more trapped heat.',
  },
  {
    id: 'glaciers',
    num: '03',
    name: 'Glacial Mass & Extent',
    direction: 'falling',
    rate: 'Unprecedented retreat',
    metric: 'Global ice volume',
    tag: 'Cryosphere',
    summary: 'Mountain glaciers across Himalayas, Alps, Andes, and Polar realms are rapidly shrinking.',
    detail: 'Glacier retreat threatens freshwater river basins that supply drinking water and agriculture for billions downstream, while simultaneously dumping vast meltwater volumes into rising oceans.',
    feedback: 'Reduces seasonal meltwater stability for downstream river basins.',
  },
  {
    id: 'snow-cover',
    num: '04',
    name: 'Snow Cover Duration & Extent',
    direction: 'falling',
    rate: 'Earlier spring thaw',
    metric: 'Northern Hemisphere area',
    tag: 'Cryosphere',
    summary: 'Snow arrives later in autumn, melts earlier in spring, and covers significantly less area.',
    detail: 'Loss of highly reflective white snow reduces Earth’s albedo (reflectivity). Darker exposed ground absorbs solar radiation rather than bouncing it away, magnifying regional warming.',
    feedback: 'Albedo loss: darker ground absorbs 70%+ of solar heat.',
  },
  {
    id: 'land-temp',
    num: '05',
    name: 'Temperature Over Land',
    direction: 'rising',
    rate: 'Warming faster than oceans',
    metric: 'Land surface temperature',
    tag: 'Land',
    summary: 'Continents heat up much faster than oceans due to the lower specific heat capacity of rock and soil.',
    detail: 'Because soil and rock cannot buffer thermal energy like massive water bodies, land temperatures spike dramatically. Northern high-latitude landmasses warm at twice the global average.',
    feedback: 'Amplifies heat wave frequency and severe regional soil desiccation.',
  },
  {
    id: 'sst',
    num: '06',
    name: 'Sea Surface Temperature (SST)',
    direction: 'rising',
    rate: '+0.33°C tropical rise',
    metric: 'Upper ocean thermal energy',
    tag: 'Ocean',
    summary: 'Upper ocean layers absorb massive thermal energy, destabilizing tropical storm systems.',
    detail: 'Rising sea surface temperatures fuel violent super-cyclones and hurricanes, disrupt global conveyor currents like the Gulf Stream, and trigger fatal coral bleaching events worldwide.',
    feedback: 'Directly converts ocean heat into hurricane wind speeds and storm surges.',
  },
  {
    id: 'sea-ice',
    num: '07',
    name: 'Arctic & Antarctic Sea Ice',
    direction: 'falling',
    rate: '−13% per decade',
    metric: 'Polar ice sheet thickness',
    tag: 'Cryosphere',
    summary: 'Perennial Arctic pack ice and Antarctic sea shelves are shrinking at record rates.',
    detail: 'As bright sea ice melts away, it exposes dark open ocean water that absorbs over 90% of solar radiation instead of reflecting it. This devastates polar bear hunting grounds and native Inuit travel.',
    feedback: 'Polar amplification: Arctic warms at 2x the global rate.',
  },
  {
    id: 'sea-level',
    num: '08',
    name: 'Global Sea Level',
    direction: 'rising',
    rate: '+3.7 mm / year',
    metric: 'Mean sea level (tide gauges & satellite)',
    tag: 'Ocean',
    summary: 'Sea levels rise continuously from two drivers: thermal expansion and land ice runoff.',
    detail: 'As ocean water warms it expands in volume (thermal expansion). Concurrently, melting glaciers and polar ice sheets pour millions of metric tons of water into coastal waters, flooding delta regions.',
    feedback: 'Causes permanent inundation of coastal cities and salinization of groundwater.',
  },
  {
    id: 'ocean-heat',
    num: '09',
    name: 'Ocean Heat Content (OHC)',
    direction: 'rising',
    rate: '>90% excess heat absorbed',
    metric: 'Zettajoules in upper 2000m',
    tag: 'Ocean',
    summary: 'Oceans serve as the ultimate thermal buffer, capturing over 90% of excess planetary heat.',
    detail: 'Ocean heat content is the most definitive, irrefutable measurement that Earth’s energy budget is out of balance. Trapped heat in deep ocean waters persists for centuries.',
    feedback: 'Irrefutable proof of planetary thermal imbalance.',
  },
  {
    id: 'ocean-temp',
    num: '10',
    name: 'Temperature Over Oceans',
    direction: 'rising',
    rate: 'Steady marine boundary warming',
    metric: 'Marine boundary air temp',
    tag: 'Ocean',
    summary: 'Air masses above the vast ocean surfaces are warming steadily, shifting global weather.',
    detail: 'Warmer marine boundary layers radically alter evaporation patterns, trade winds, and seasonal monsoons that billions of people in countries like India depend upon for agriculture.',
    feedback: 'Destabilizes the Indian summer monsoon and tropical precipitation belts.',
  },
];

// ─── SECTION 03: 4 CAUSES OF GLOBAL WARMING ───
export const warmingCausesData: WarmingCause[] = [
  {
    id: 'co2',
    gas: 'Carbon Dioxide',
    formula: 'CO₂',
    share: '80%',
    gwp: '1 (Baseline)',
    lifetime: 'Hundreds to thousands of years',
    color: '#D8703F',
    significance: 'Accounts for ~80% of human-induced radiative warming. Pre-industrial levels were ~280 ppm; today concentrations exceed 420 ppm — the highest in 800,000 years.',
    sources: [
      { title: 'Thermal Power Stations', share: '21.3%', desc: 'Combustion of coal, petroleum, and natural gas for grid electricity is the single largest point source.' },
      { title: 'Industrial Processes', share: '16.8%', desc: 'Steel manufacturing, cement calcination, chemical synthesis, and petroleum refineries.' },
      { title: 'Transportation', share: '14.0%', desc: 'Combustion of gasoline and diesel in cars, trucks, freight trains, shipping, and civil aviation.' },
      { title: 'Deforestation & Land Clearing', share: '10.0%', desc: 'Slashing and burning carbon-rich primary forests immediately releases centuries of stored carbon.' },
    ],
  },
  {
    id: 'ch4',
    gas: 'Methane',
    formula: 'CH₄',
    share: 'Part of 20%',
    gwp: '>20x more potent than CO₂',
    lifetime: '12 years (short-lived climate pollutant)',
    color: '#E8B04B',
    significance: 'Extremely potent greenhouse gas. Traps more than 20 times more heat molecule-for-molecule than CO₂ over a 100-year window.',
    sources: [
      { title: 'Flooded Rice Paddies', desc: 'Anaerobic methanogenic bacteria in waterlogged paddy fields decompose submerged organic matter.' },
      { title: 'Enteric Fermentation (Livestock)', share: '12.5%', desc: 'Bovine flatulence and belching from cattle, sheep, and goats during ruminant digestion.' },
      { title: 'Fossil Fuel Retrieval & Leaks', share: '11.3%', desc: 'Fugitive leaks from coal mine ventilation shafts, natural gas transmission pipelines, and wellheads.' },
      { title: 'Landfills & Solid Waste', share: '3.4%', desc: 'Decomposition of municipal organic trash compacted under oxygen-depleted landfill layers.' },
      { title: 'Natural Wetlands & Bogs', desc: 'Microbial decomposition in pristine swamps, bogs, and thawing arctic permafrost.' },
    ],
  },
  {
    id: 'n2o',
    gas: 'Nitrous Oxide',
    formula: 'N₂O',
    share: 'Part of 20%',
    gwp: '298x more potent than CO₂',
    lifetime: '114 years in the atmosphere',
    color: '#F97316',
    significance: 'Formidable warming potential. Stays in the stratosphere for over a century and actively damages the protective ozone layer while trapping heat.',
    sources: [
      { title: 'Synthetic Nitrogen Fertilizers', desc: 'Excessive chemical fertilizers on agricultural soils stimulate microbial nitrification and denitrification.' },
      { title: 'Nylon & Nitric Acid Plants', desc: 'Industrial chemical production of nylon textiles and nitric acid produces N₂O as an untreated byproduct.' },
      { title: 'Catalytic Converters in Vehicles', desc: 'Certain vehicle exhaust catalysts generate N₂O during the conversion of toxic nitric oxide emissions.' },
      { title: 'Biomass & Stubble Burning', desc: 'Combustion of crop stubble, sugarcane residues, and agricultural waste in open fields.' },
    ],
  },
  {
    id: 'deforest',
    gas: 'Deforestation & Land-Use Change',
    formula: 'Biosphere Loss',
    share: '~10% Global Impact',
    gwp: 'Direct release + lost sink',
    lifetime: 'Permanent loss until reforested',
    color: '#10B981',
    significance: 'Trees naturally absorb vast quantities of CO₂ via photosynthesis. Clear-cutting removes this vital carbon sink while burning releases stored biomass carbon directly.',
    sources: [
      { title: 'Urban & Industrial Expansion', desc: 'Conversion of pristine woodland into housing corridors, factories, and transport infrastructure.' },
      { title: 'Agricultural Encroachment', desc: 'Slashing pristine rainforests to create monoculture pastureland for livestock and cash crops.' },
      { title: 'Albedo Reduction', desc: 'Exposing dark organic forest soil causes the local ground to absorb more heat than reflective foliage.' },
    ],
  },
];

// ─── SECTION 05: 13 EFFECTS OF GLOBAL WARMING ───
export const warmingEffectsData: WarmingEffect[] = [
  {
    id: 'heatwaves',
    num: '01',
    title: 'Frequent Temperature Extremes (Killer Heat Waves)',
    category: 'Extreme Weather',
    severity: 'Critical',
    shortDesc: 'Prolonged lethal heat waves cause widespread heatstroke, organ failure, and dehydration.',
    longDesc: 'As baseline atmospheric temperatures rise, extreme temperature anomalies become far more frequent and intense. Vulnerable populations including outdoor laborers, children, and the elderly suffer high mortality.',
    stat: '35,000+ lives lost in 2003 European heatwave alone',
    impactZone: 'Global urban heat islands and tropical zones',
  },
  {
    id: 'rainfall',
    num: '02',
    title: 'Changing Rainfall Patterns',
    category: 'Extreme Weather',
    severity: 'Severe',
    shortDesc: 'The global hydrological cycle is violently destabilized, causing deluge in some areas and drought in others.',
    longDesc: 'Warm air holds more moisture (7% more per °C), resulting in intense cloudbursts and flooding in certain regions, while stripping moisture from other agricultural heartlands.',
    stat: 'Monsoon uncertainty impacting billions',
    impactZone: 'Subtropical and monsoon-dependent agriculture',
  },
  {
    id: 'sealevel',
    num: '03',
    title: 'Accelerated Rise in Sea Levels',
    category: 'Cryosphere & Oceans',
    severity: 'Critical',
    shortDesc: 'Thermal expansion and collapsing polar ice sheets cause irreversible coastal inundation.',
    longDesc: 'Millions of people living in delta regions (such as the Ganges-Brahmaputra and Nile deltas) and low-lying island nations face permanent displacement and saltwater intrusion into drinking wells.',
    stat: 'Threatens 600M+ people living in coastal lowlands',
    impactZone: 'Coastal cities, islands, and river deltas',
  },
  {
    id: 'storms',
    num: '04',
    title: 'Frequent Storms & Coastal Flooding',
    category: 'Extreme Weather',
    severity: 'Severe',
    shortDesc: 'Warmer ocean waters inject supercharged kinetic energy into hurricanes, typhoons, and cyclones.',
    longDesc: 'Cyclones intensify rapidly, producing extreme storm surges that breach sea dykes, destroy port infrastructure, and swamp low-lying coastal cities with toxic debris and brine.',
    stat: 'Strongest Category 4–5 storms increasing',
    impactZone: 'Tropical and temperate coastlines',
  },
  {
    id: 'regional-climate',
    num: '05',
    title: 'Regional Climate Shifts on Forests & Water',
    category: 'Ecosystems',
    severity: 'High',
    shortDesc: 'Biomes shift poleward; river basins dependent on seasonal snowmelt dry up prematurely.',
    longDesc: 'Forest ecosystems cannot migrate as quickly as climate zones shift, leading to widespread crown dieback, pest infestations (like bark beetles), and collapse of perennial river headwaters.',
    stat: 'Himalayan glacial meltwater feeding 10 major rivers',
    impactZone: 'Mountain basins and boreal/temperate forests',
  },
  {
    id: 'drought',
    num: '06',
    title: 'Severe & Prolonged Drought',
    category: 'Agriculture & Food',
    severity: 'Critical',
    shortDesc: 'Persistent lack of rain and rapid evapotranspiration deplete reservoirs and crack farm soil.',
    longDesc: 'Subtropical regions face mega-droughts lasting years, crippling hydroelectric power generation, shrinking municipal water rations, and forcing farm abandonment.',
    stat: 'Over 2.3 billion people under water stress',
    impactZone: 'Semi-arid plains, Mediterranean, and Central India',
  },
  {
    id: 'food-shortage',
    num: '07',
    title: 'Food Shortages & Agricultural Shift',
    category: 'Agriculture & Food',
    severity: 'Critical',
    shortDesc: 'Traditional staple crop yields (wheat, maize, rice) decline under extreme thermal stress.',
    longDesc: 'High nighttime temperatures prevent grain filling. Shifting agricultural belts trigger global grain market volatility, malnutrition, and cross-border famines in developing economies.',
    stat: '10–25% yield loss projected per degree rise in tropics',
    impactZone: 'Global agricultural grain belts',
  },
  {
    id: 'polar-amplification',
    num: '08',
    title: 'Greater Warming Near the Poles (Polar Amplification)',
    category: 'Cryosphere & Oceans',
    severity: 'Critical',
    shortDesc: 'The Arctic warms at more than double the global rate due to the ice-albedo positive feedback.',
    longDesc: 'Loss of reflective white sea ice exposes dark ocean water, which absorbs more solar radiation and melts more ice. This destabilizes the polar jet stream, causing erratic polar vortex outbreaks.',
    stat: 'Arctic warming at 2x to 3x the global average rate',
    impactZone: 'Arctic Ocean, Greenland, and Antarctic Peninsula',
  },
  {
    id: 'air-pollution',
    num: '09',
    title: 'Air Pollution Exacerbated by Warming',
    category: 'Human Health',
    severity: 'High',
    shortDesc: 'Higher surface temperatures accelerate the photochemical synthesis of toxic ground-level ozone (smog).',
    longDesc: 'Stagnant high-pressure heat domes trap vehicle exhaust and factory plumes close to the ground, triggering severe toxic smog episodes in major metropolitan centers.',
    stat: 'Ground-level ozone spikes on 35°C+ days',
    impactZone: 'Dense metropolitan regions worldwide',
  },
  {
    id: 'respiratory',
    num: '10',
    title: 'Asthma, Bronchitis & Respiratory Complications',
    category: 'Human Health',
    severity: 'High',
    shortDesc: 'Longer pollen seasons, frequent dust storms, and wildfire smoke overwhelm respiratory systems.',
    longDesc: 'Higher atmospheric CO₂ stimulates plants to produce exponentially more pollen. Combined with fine particulate pollution (PM2.5) from wildfires, rates of chronic obstructive pulmonary disease surge.',
    stat: 'Pollen seasons extended by 20+ days',
    impactZone: 'Urban and rural populations vulnerable to allergens',
  },
  {
    id: 'desertification',
    num: '11',
    title: 'Expansion of Deserts into Rangelands',
    category: 'Ecosystems',
    severity: 'Severe',
    shortDesc: 'Arid boundaries creep into productive grasslands through soil erosion and prolonged drought.',
    longDesc: 'Overgrazed pastures turn into barren dust bowls. Topsoil blows away in severe dust storms, permanently destroying the regenerative biological capacity of grazing ecosystems.',
    stat: '12 million hectares of arable land lost annually to desertification',
    impactZone: 'Sahel, Central Asia, and Rajasthan border zones',
  },
  {
    id: 'infectious-diseases',
    num: '12',
    title: 'Uncontained Spread of Infectious Diseases',
    category: 'Human Health',
    severity: 'Severe',
    shortDesc: 'Warmer temperatures allow disease vectors (mosquitoes, ticks) to thrive in previously cold highlands.',
    longDesc: 'Malaria, dengue fever, chikungunya, and Lyme disease vectors multiply rapidly. Mosquito biting rates and viral incubation times shorten dramatically in warm, humid weather.',
    stat: 'WHO estimates 150,000+ deaths/yr from climate factors',
    impactZone: 'Highland plateaus and expanding subtropical zones',
  },
  {
    id: 'coral-bleaching',
    num: '13',
    title: 'Coral Bleaching & Ocean Acidification',
    category: 'Cryosphere & Oceans',
    severity: 'Critical',
    shortDesc: 'Corals expel their photosynthetic symbiotic algae (zooxanthellae) under thermal and acid stress.',
    longDesc: 'Oceans absorb 50% of industrial CO₂, forming carbonic acid (H₂CO₃) and lowering ocean pH. Acidic water dissolves calcium carbonate shells, destroying the foundation of 25% of all marine life.',
    stat: '50%+ of Great Barrier Reef damaged by bleaching',
    impactZone: 'Tropical coral reef systems worldwide',
  },
];

// ─── SECTION 06: GLOBAL WARMING VS GLOBAL CLIMATE CHANGE ───
export const warmingVsClimateData = {
  definitionWarming: 'The gradual increase in the average temperature of Earth’s atmosphere and oceans, primarily driven by the human-enhanced greenhouse effect.',
  definitionClimate: 'A broader, long-term shift in global or regional climate patterns, encompassing changes in temperature, precipitation, wind patterns, sea levels, and the frequency/intensity of extreme weather events.',
  quote: 'Climate change is potentially one of the greatest threats to the environment, to biodiversity, and ultimately to the quality of human life.',
  comparisons: [
    {
      feature: 'Core Concept',
      warming: 'Focuses specifically on rising average planetary surface & ocean temperature.',
      climate: 'Encompasses all systemic alterations across the entire Earth-atmosphere system.',
    },
    {
      feature: 'Primary Driver',
      warming: 'Increased concentrations of greenhouse gases (CO₂, CH₄, N₂O) trapping infrared heat.',
      climate: 'Driven by global warming, which then alters winds, ocean currents, and precipitation.',
    },
    {
      feature: 'Measurable Signals',
      warming: 'Thermometer readings, satellite surface temp, sea surface temperature, ocean heat content.',
      climate: 'Shifting biomes, ocean acidification, wind circulation changes, storm severity, drought cycles.',
    },
    {
      feature: 'Scale & Scope',
      warming: 'Thermal metric (in °C or °F) describing heat energy accumulation.',
      climate: 'Multi-dimensional environmental transformation affecting ecosystems, health, and society.',
    },
  ],
};

// ─── SECTION 07: 8 CLIMATE CHANGE INDICATORS ───
export const climateIndicatorsData: ClimateIndicator[] = [
  {
    id: 'gw-signal',
    num: '01',
    title: 'Global Warming',
    headline: 'The foundational driver of systemic climate disruption',
    badge: 'Primary Driver',
    stat: 'Warmest century in 1,000 years',
    impacts: [
      { subtitle: 'Accelerated Rate', description: 'The rate of temperature increase has accelerated sharply since the 1960s, breaking consecutive global heat records.' },
      { subtitle: 'Planetary Heat Engine', description: 'This temperature rise injects colossal thermal energy into atmospheric and oceanic convection currents.' },
    ],
  },
  {
    id: 'polar-ice',
    num: '02',
    title: 'Changes in Polar & Glacial Ice',
    headline: 'Dwindling cryosphere with profound human & wildlife consequences',
    badge: 'Cryosphere',
    stat: 'Millions of cubic km melted',
    caseStudy: 'Inuit Indigenous Disruption: Traditional Inuit culture relies on hunting and traveling over solid sea ice. Thinning and unpredictable ice shatters centuries of cultural heritage and survival methods.',
    impacts: [
      { subtitle: 'Rising Sea Levels', description: 'Melting polar ice sheets dump massive freshwater loads into oceans, flooding coastal cities.' },
      { subtitle: 'Polar Bear Habitat Collapse', description: 'Polar bears require extensive winter sea ice platforms to hunt seals. Shorter freezing windows lead to starvation.' },
      { subtitle: 'Inuit Cultural Disruption', description: 'Thinning and disappearing sea ice disrupts traditional Inuit travel routes, fishing, and cultural hunting.' },
    ],
  },
  {
    id: 'ocean-acidity',
    num: '03',
    title: 'Ocean Acidity',
    headline: 'Chemical breakdown of marine calcification and food webs',
    badge: 'Ocean Chemistry',
    stat: '50% of fossil CO₂ absorbed by oceans',
    impacts: [
      { subtitle: 'Carbonic Acid Formation', description: 'Dissolving CO₂ forms carbonic acid (H₂CO₃), dropping seawater pH and depleting carbonate ions.' },
      { subtitle: 'Shell-Building Failure', description: 'Oysters, clams, corals, and marine snails struggle or fail completely to synthesize calcium carbonate shells.' },
      { subtitle: 'Plankton Base Disruption', description: 'Disrupting pteropods and phytoplankton threatens the foundation of the global marine trophic web.' },
    ],
  },
  {
    id: 'climate-health',
    num: '04',
    title: 'Climate & Human Health',
    headline: 'Direct physiological stress and disease vector expansion',
    badge: 'Public Health',
    stat: '150,000 annual deaths (WHO)',
    impacts: [
      { subtitle: 'Lethal Heat Stress', description: 'The 2003 European heatwave alone claimed approximately 35,000 lives from heatstroke and cardiovascular failure.' },
      { subtitle: 'Vector-Borne Proliferation', description: 'Malaria and dengue mosquitoes thrive in warmer, wetter conditions, colonizing higher elevations.' },
      { subtitle: 'Airborne Allergens', description: 'Surging atmospheric dust, mould spores, and pollen provoke severe asthma and chronic respiratory diseases.' },
    ],
  },
  {
    id: 'wind-patterns',
    num: '05',
    title: 'Changing Wind Patterns',
    headline: 'Fluctuations in jet streams and atmospheric circulation',
    badge: 'Atmospheric Physics',
    stat: 'Disrupted jet stream circulation',
    impacts: [
      { subtitle: 'Heat Redistribution', description: 'Altered temperature gradients between poles and the equator cause unpredictable wind speed, direction, and strength.' },
      { subtitle: 'Accelerated Ice Melting', description: 'Unusual wind currents push warm air deep into the Arctic circle, accelerating ice pack fragmentation.' },
      { subtitle: 'Precipitation Shifts', description: 'Shifting upper-level wind belts redirect rain-bearing weather fronts away from drought-stricken land.' },
    ],
  },
  {
    id: 'precipitation-patterns',
    num: '06',
    title: 'Changing Precipitation Patterns',
    headline: 'Evaporation spikes causing localized flood-drought extremes',
    badge: 'Hydrology',
    stat: '+1.4°C Ontario case study',
    caseStudy: 'Ontario, Canada Case Study: Since 1948, average temperatures across Ontario rose by 1.4°C, triggering an increase in total rainy days, extreme rainfall, and heavier snowfall in Northern Ontario.',
    impacts: [
      { subtitle: 'Extreme Evaporation', description: 'High temperatures pull water from soils and reservoirs at record speed, forming supercharged rain clouds.' },
      { subtitle: 'Flash Floods & Monsoons', description: 'Deluges cause devastating river overflows and landslides, while adjacent regions suffer arid conditions.' },
      { subtitle: 'Snowfall Shifts', description: 'Precipitation falls as torrential rain rather than slow-melting snowpack, eliminating summer reservoir reserves.' },
    ],
  },
  {
    id: 'storm-intensity',
    num: '07',
    title: 'Storm Intensity & Frequency',
    headline: 'Tropical waters heating up to fuel destructive superstorms',
    badge: 'Meteorology',
    stat: '+0.33°C tropical sea warming since 1981',
    impacts: [
      { subtitle: 'Ocean Heat Conversion', description: 'Tropical ocean water where storms form has warmed by 0.33°C since 1981, loading storms with explosive energy.' },
      { subtitle: 'Category 5 Super-Storms', description: 'While total storm counts fluctuate, the strongest hurricanes and cyclones have become substantially more destructive.' },
      { subtitle: 'Extreme Rainfall Rates', description: 'Warm air circulation causes tropical storms to stall over coastlines, dumping catastrophic rainfall.' },
    ],
  },
  {
    id: 'changing-biomes',
    num: '08',
    title: 'Changing Biomes',
    headline: 'Ecological zones migrating poleward and uphill',
    badge: 'Biodiversity',
    stat: '>1 Million species threatened with extinction',
    impacts: [
      { subtitle: 'Ecological Thresholds', description: 'Plants and animals specialized for specific biomes (tundra, alpine, rainforest) cannot tolerate altered temperatures.' },
      { subtitle: 'Poleward & Altitude Migration', description: 'Species migrate toward higher latitudes and mountain summits; mountain-top species run out of room.' },
      { subtitle: 'Mass Extinction Risk', description: 'Over one million plant and animal species face extinction due to inability to migrate faster than climate zones shift.' },
    ],
  },
];

// ─── SECTION 08: HUMAN HEALTH IMPACTS ───
export const humanHealthData = {
  whoStat: '150,000 deaths worldwide annually from climate change factors (malaria, diarrhea, malnutrition, floods)',
  ipccStat: '250 million additional Africans without safe drinking water due to climate stress',
  heatwaveExample: '2003 European heatwave caused ~35,000 deaths',
  pathways: [
    {
      title: 'Heat Stress & Mortality',
      icon: 'Sun',
      driver: 'Rising maximum temperatures & humidity',
      consequence: 'Heat stroke, dehydration, cardiovascular collapse, kidney strain.',
      example: 'Most common cause of weather-related mortality worldwide.',
    },
    {
      title: 'Vector-Borne Epidemics',
      icon: 'Bug',
      driver: 'Warm, humid stagnant water pools',
      consequence: 'Expansion of malaria mosquitoes and dengue Aedes aegypti into temperate zones.',
      example: 'Outbreaks of plague and infectious pathogens spike during warm periods.',
    },
    {
      title: 'Respiratory & Allergens',
      icon: 'Wind',
      driver: 'Ground-level ozone, dust storms, prolonged pollen bloom',
      consequence: 'Severe asthma attacks, bronchitis, emphysema, and allergic rhinitis.',
      example: 'Extended growing seasons produce exponentially more airborne pollen.',
    },
    {
      title: 'Water & Food-Borne Illness',
      icon: 'Droplets',
      driver: 'Floods contaminating municipal water supplies',
      consequence: 'Diarrheal cholera outbreaks, cryptosporidiosis, and agricultural malnutrition.',
      example: 'Floodwaters breach sewage pipelines, contaminating municipal wells.',
    },
    {
      title: 'Climate Refugees & Displacement',
      icon: 'Users',
      driver: 'Coastal inundation, desertification, and crop failures',
      consequence: 'Millions forced to flee homes; stress, refugee camp outbreaks, and civil strife.',
      example: 'Rising sea levels displace millions living along river deltas.',
    },
  ],
};

// ─── SECTION 09: THREE CORE VALUES OF EIA ───
export const eiaValuesData = [
  {
    num: '01',
    name: 'Integrity',
    tagline: 'Fair, objective, unbiased, and scientifically honest',
    color: '#38BDF8',
    description: 'The EIA process must adhere to recognized professional standards and ethical practices. It must present all potential impacts — both positive and adverse — honestly and transparently, completely free from political interference or developer pressure.',
    bulletPoints: [
      'Unbiased and balanced environmental investigation.',
      'Protected from developer or political lobbying.',
      'Transparent disclosure of scientific uncertainty.',
    ],
  },
  {
    num: '02',
    name: 'Utility',
    tagline: 'Balanced, credible, actionable information for decision-makers',
    color: '#10B981',
    description: 'An EIA report is not a theoretical exercise; it must be practical and actionable. It must deliver clear, credible, and understandable environmental insights so that authorities, communities, and developers can make informed, responsible project choices.',
    bulletPoints: [
      'Clear, understandable findings for non-technical stakeholders.',
      'Actionable mitigation strategies with defined timelines.',
      'Realistic comparative analysis of project alternatives.',
    ],
  },
  {
    num: '03',
    name: 'Sustainability',
    tagline: 'Achieving permanent environmental safeguards for future generations',
    color: '#E8B04B',
    description: 'The overarching objective of EIA is environmental safeguard. It ensures developmental activities do not deplete natural capital or compromise the ability of future generations to thrive, striking a disciplined balance between economic growth and ecological conservation.',
    bulletPoints: [
      'Preserves ecological balance and resource availability.',
      'Prevents irreversible ecological harm.',
      'Implements precautionary safeguards and biodiversity protection.',
    ],
  },
];

// ─── SECTION 10: EIA BENEFITS & HISTORY ───
export const eiaBenefitsData = [
  { title: 'Protection of Environment', desc: 'Identifies impacts before ground is broken, preventing irreversible destruction of sensitive habitats and aquifers.' },
  { title: 'Optimum Utilization of Resources', desc: 'Ensures scarce natural resources (water, land, minerals) are utilized efficiently with zero waste.' },
  { title: 'Saves Overall Time & Project Cost', desc: 'Fixing design flaws on paper during feasibility is exponentially cheaper than retrofitting or stopping a built plant.' },
  { title: 'Promotes Community Participation', desc: 'Mandates public hearings, giving indigenous and local populations a formal voice in environmental decisions.' },
  { title: 'Informs Decision-Makers', desc: 'Provides government ministries and regulatory agencies with unbiased, peer-reviewed scientific data.' },
  { title: 'Lays Base for Environmentally Sound Projects', desc: 'Guides engineers to integrate cleaner production technology and recycling systems from day one.' },
];

export const eiaHistoryMilestones = [
  {
    year: '1969 / 1970',
    title: 'Origin in the United States (NEPA)',
    location: 'United States of America',
    detail: 'EIA originated with the National Environmental Policy Act (NEPA) of 1969, implemented in 1970. It was the world’s first statute requiring federal agencies to evaluate environmental consequences before approving major projects.',
  },
  {
    year: 'Mid-1980s',
    title: 'World Bank Adoption & Global Spread',
    location: 'International Lending Institutions',
    detail: 'EIA expanded globally after the World Bank made environmental assessments mandatory for all major development and infrastructure projects it funded, requiring borrower nations to establish assessment frameworks.',
  },
  {
    year: 'Present Day',
    title: 'Legally Mandated in 100+ Nations',
    location: 'Global International Law',
    detail: 'Today, EIA is a formal, statutory requirement in over 100 countries worldwide, each tailoring the regulatory framework to its unique ecological, legal, and socio-economic landscape.',
  },
  {
    year: 'EIA in India',
    title: 'Mandatory Environmental Clearance for 32 Sectors',
    location: 'India (MoEFCC & EIA Notification 2006)',
    detail: 'In India, Environmental Clearance from the central/state government is mandatory for 32 categories of development projects, including Mining (coal, minerals), Thermal Power Plants, River Valley Projects (hydro/irrigation dams), and major Infrastructure (highways, ports, airports).',
  },
];

// ─── SECTION 11: 9 PHASES OF INDIAN EIA PROCEDURE ───
export const eiaPhasesData: EiaPhase[] = [
  {
    id: 'phase-01',
    num: '01',
    name: 'Screening',
    tagline: 'Determining if a project requires EIA and at what depth',
    whoDoes: 'Regulatory Authority / State Level Environment Impact Assessment Authority (SEIAA)',
    keyAction: 'Classifying proposed projects into Category A, B, or C',
    description: 'Screening is the very first stage. It decides whether an assessment is required based on the investment scale, type of development, and location sensitivity.',
    categories: [
      { label: 'Category A', desc: 'Mandatory full, comprehensive EIA at central MoEFCC level. Projects have potentially severe, irreversible impacts across large areas.', example: 'Large thermal power plants, major river valley hydro dams, heavy chemical refineries, major ports.' },
      { label: 'Category B', desc: 'Appraised at State level (SEIAA). Differ from Category A primarily in scale; mitigation is simpler and projects are not in sensitive zones.', example: 'Medium-sized power plants, smaller industrial estates, local highway widenings.' },
      { label: 'Category C', desc: 'Low-risk, small-scale activities that typically DO NOT require an environmental clearance or formal study.', example: 'Small artisanal cottage units, non-polluting localized facilities in non-sensitive areas.' },
    ],
  },
  {
    id: 'phase-02',
    num: '02',
    name: 'Scoping & Consideration of Alternatives',
    tagline: 'Defining the study boundaries, significant impacts & project options',
    whoDoes: 'Accredited Environmental Consultant + Project Proponent with Regulatory Guidance',
    keyAction: 'Drafting Terms of Reference (ToR) and bounding the study zone',
    description: 'Scoping identifies the key environmental concerns and sets the spatial and temporal boundaries. It evaluates quantifiable impacts (magnitude, prevalence, frequency, duration) and non-quantifiable aesthetic and cultural values.',
    criteria: [
      'Magnitude: How severe is the anticipated ecological change?',
      'Prevalence: Over what geographical radius does the impact spread (e.g. 7–10 km)?',
      'Frequency: How often will emissions or effluent discharges occur?',
      'Duration: Will the disturbance be temporary (construction) or permanent (operation)?',
    ],
  },
  {
    id: 'phase-03',
    num: '03',
    name: 'Baseline Data Collection',
    tagline: 'Establishing the pre-project reference state of the environment',
    whoDoes: 'Scientific Survey Teams & Accredited Environmental Laboratories',
    keyAction: 'Field monitoring across 6 environmental domains (Air, Noise, Water, Land, Biology, Socio-economic)',
    description: 'Baseline data captures the existing pristine or current state of the local environment before construction. Environmental impacts can never be predicted with absolute certainty, but rigorous baseline data drastically reduces predictive uncertainty.',
    components: [
      'Air: Ambient SO₂, NOₓ, PM10, PM2.5, wind speed, wind direction, lapse rate, and background point/line/area sources.',
      'Noise: Ambient day/night decibel levels, vehicular noise, machinery sound, and wildlife disturbance.',
      'Water: Surface and groundwater availability, chemical quality, sediment transport, and saltwater intrusion risk.',
      'Land: Soil fertility, permeability, topography, existing land use, drainage, and riverbank stability.',
      'Biological: Flora/fauna cataloging across seasons, breeding/nesting grounds, endangered species, and migratory corridors.',
      'Socio-Economic: Demographics, employment, epidemiological health baselines, endemic diseases, and cultural heritage.',
    ],
  },
  {
    id: 'phase-04',
    num: '04',
    name: 'Impact Analysis',
    tagline: 'Detailed quantitative and qualitative prediction of ecological changes',
    whoDoes: 'Environmental Scientists & Mathematical Modeling Specialists',
    keyAction: 'Running dispersion models, hydrological simulations, and ecological stress models',
    description: 'Predicts the nature, extent, and magnitude of likely impacts on all physical and biological systems using validated mathematical models (e.g. air dispersion models, hydrological effluent models).',
    criteria: [
      'Simulates pollutant plumes and ground-level concentrations under various wind regimes.',
      'Forecasts water extraction impacts on surrounding community water tables.',
      'Evaluates cumulative environmental stresses over the entire project lifecycle.',
    ],
  },
  {
    id: 'phase-05',
    num: '05',
    name: 'Alternatives, Mitigation & EIA Report',
    tagline: 'Ranking options, designing controls, and producing the official report',
    whoDoes: 'Project Engineering Team & Environmental Consultants',
    keyAction: 'Always assessing the "No Project" alternative alongside engineering solutions',
    description: 'For every project, alternatives in location, cleaner process technologies, and the mandatory "No Project" option are ranked. A detailed mitigation plan is produced to prevent, reduce, or compensate for damages.',
    components: [
      '"With Project" vs "Without Project" comparison scenarios.',
      'Delineation of mitigation measures at source, pathway, and receptor levels.',
      'Drafting the Environmental Impact Assessment (EIA) Report and non-technical Executive Summary.',
    ],
  },
  {
    id: 'phase-06',
    num: '06',
    name: 'Public Hearing',
    tagline: 'Democratic, mandatory consultation with all affected communities',
    whoDoes: 'State Pollution Control Board (SPCB) with District Administration & Local Public',
    keyAction: 'Gathering feedback, objections, and community knowledge in an open forum',
    description: 'Mandatory by law under EIA Notification 2006. The summary of the EIA report must be made available to bona fide local residents, local associations, environmental groups, and displaced persons before the public hearing.',
    criteria: [
      'Bona fide local residents living in the project impact zone.',
      'Local resident welfare associations and community councils.',
      'Environmental NGOs and civil society groups active in the region.',
      'Persons located at the project site or potential displacement resettlement sites.',
    ],
  },
  {
    id: 'phase-07',
    num: '07',
    name: 'Environmental Management Plan (EMP)',
    tagline: 'The operational blueprint for executing mitigation and monitoring',
    whoDoes: 'Project Proponent with Environmental Management Division',
    keyAction: 'Allocating human, financial, and technical resources to ensure compliance',
    description: 'The EMP details exactly how impacts identified in the EIA will be mitigated, monitored, and managed throughout construction and operation.',
    components: [
      'Mitigation Plan: Specific equipment (ESPs, baghouses, ETPs, noise barriers) and rehabilitation/resettlement schemes.',
      'Monitoring Scheme: Clear schedule of environmental parameters to test, sampling locations, and frequency.',
      'Implementation Plan: Explicit financial budgets, organizational staffing, and compliance reporting milestones.',
    ],
  },
  {
    id: 'phase-08',
    num: '08',
    name: 'Decision Making',
    tagline: 'Appraisal by Expert Advisory Committee and formal clearance verdict',
    whoDoes: 'Impact Assessment Authority (MoEFCC / SEIAA) assisted by Expert Appraisal Committee (EAC)',
    keyAction: 'Arriving at an informed, formal regulatory determination',
    description: 'The regulatory committee evaluates the EIA report, the EMP, public hearing proceedings, and proponent presentations before issuing a legal clearance decision.',
    outcomes: [
      'Approved: Environmental Clearance granted with binding statutory conditions.',
      'Not Approved: Project rejected due to unacceptable, irreversible environmental costs.',
      'Redesign Required: Project must modify layout, technology, or location and re-evaluate.',
      'Resubmit: Proponent must gather additional baseline data or address public concerns.',
    ],
  },
  {
    id: 'phase-09',
    num: '09',
    name: 'Monitoring Clearance Conditions',
    tagline: 'Post-approval verification during construction and long-term operation',
    whoDoes: 'Regional MoEFCC Offices, State Pollution Control Boards & Third-Party Auditors',
    keyAction: 'Ensuring EIA commitments are compiled with; enforcing corrective actions',
    description: 'Monitoring must be carried out during BOTH the construction phase and normal plant operation. It verifies whether predictive models were accurate and enforces punitive or corrective measures if clearance standards are breached.',
    criteria: [
      'Verification: Do emissions and effluent match predicted EIA limits?',
      'Continuous compliance: Are air filters and effluent treatment plants operational 24/7?',
      'Corrective Action: Mandatory equipment upgrades if pollution limits are exceeded.',
    ],
  },
];

// ─── SECTION 13: 8 EIA REPORT COMPONENTS (A–H) ───
export const eiaReportComponentsData: EiaReportComponent[] = [
  {
    id: 'comp-air',
    letter: 'A',
    title: 'Air Environment',
    linkedModule: { name: 'Module 03: Air', slug: 'air', path: '/module/air' },
    scope: 'Assessment of ambient air quality, emissions, meteorology, and atmospheric dispersion within a 7–10 km radial impact zone.',
    stat: '7–10 km impact monitoring radius',
    items: [
      'Determination of impact zone and monitoring station grid.',
      'Baseline measuring of SO₂, NOₓ, PM10, PM2.5, and CO.',
      'Site meteorological data: wind speed, direction, ambient temperature, humidity, and lapse rate.',
      'Emission inventory from proposed point (stacks), line (roads), and area sources.',
      'Air dispersion modeling (Gaussian plume / mathematical models).',
      'Assessment of existing emissions from surrounding industries.',
      'Evaluation of proposed control equipment (ESPs, scrubbers, baghouse filters).',
    ],
    mitigations: [
      'Source-level: High-efficiency scrubbers, catalytic reduction, clean fuel switching.',
      'Pathway-level: Stack height optimization according to CPCB guidelines, green belts.',
      'Receptor-level: Establishing buffer zones, protective respirators, and local air shelters.',
    ],
  },
  {
    id: 'comp-noise',
    letter: 'B',
    title: 'Noise Environment',
    linkedModule: { name: 'Module 03: Air', slug: 'air', path: '/module/air' },
    scope: 'Monitoring baseline acoustic levels, predicting industrial machinery and vehicular decibels, and evaluating human/wildlife stress.',
    stat: 'Day / Night decibel (dBA) compliance',
    items: [
      'Monitoring baseline ambient noise levels (Leq day/night).',
      'Acoustic prediction models for machinery, generators, and heavy trucks.',
      'Identification of noise impacts on human health (hearing loss, hypertension, sleep disruption).',
      'Assessment of noise stress on wildlife communication, nesting, and migration.',
    ],
    mitigations: [
      'Acoustic enclosures, silencers, and vibration dampeners around heavy turbines.',
      'Erection of noise barrier walls and thick evergreen green belts along perimeters.',
      'Strict operational scheduling prohibiting noisy activities during nighttime.',
    ],
  },
  {
    id: 'comp-water',
    letter: 'C',
    title: 'Water Environment',
    linkedModule: { name: 'Module 02: Water', slug: 'water', path: '/module/water' },
    scope: 'Baseline hydrological evaluation, competing user availability, wastewater characterization, and effluent discharge models.',
    stat: 'Zero Liquid Discharge (ZLD) goal',
    items: [
      'Baseline quantity and quality of regional surface and groundwater aquifers.',
      'Impact of project water abstraction on competing municipal and farming users.',
      'Quantification and chemical characterization of industrial and domestic wastewater.',
      'Hydrological dispersion modeling of effluent discharge into rivers, lakes, or oceans.',
      'Risk of saltwater intrusion into coastal freshwater aquifers due to over-pumping.',
      'Feasibility analysis of water recycling, rainwater harvesting, and Zero Liquid Discharge.',
    ],
    mitigations: [
      'Installation of state-of-the-art Effluent Treatment Plants (ETP) with tertiary filtration.',
      'Closed-loop water recycling for cooling towers and slag quenching.',
      'Perimeter groundwater monitoring borewells to detect toxic leachate immediately.',
    ],
  },
  {
    id: 'comp-biological',
    letter: 'D',
    title: 'Biological Environment',
    linkedModule: { name: 'Module 04: Biodiversity', slug: 'biodiversity', path: '/module/biodiversity' },
    scope: 'Seasonal flora and fauna surveys, habitat shrinkage, endangered species protection, and ecosystem stress predictions.',
    stat: 'Multi-season biodiversity surveys',
    items: [
      'Comprehensive flora and fauna surveys delineating survey season and duration.',
      'Census of rare, endangered, endemic, and scheduled wildlife species.',
      'Mapping of migratory flight paths of birds and wildlife movement corridors.',
      'Assessment of habitat destruction, fragmentation, and tree felling requirements.',
      'Predicting impact of gaseous emissions (acid rain) and warm effluent on aquatic life.',
    ],
    mitigations: [
      'Establishment of compensatory afforestation at 2:1 or higher sapling ratios.',
      'Preservation of dedicated wildlife transit corridors and eco-sensitive buffer rings.',
      'Restrictions on heavy blasting during local wildlife breeding and nesting seasons.',
    ],
  },
  {
    id: 'comp-land',
    letter: 'E',
    title: 'Land Environment',
    linkedModule: { name: 'Module 01: Land', slug: 'land', path: '/module/land' },
    scope: 'Soil characteristics, topography, drainage integrity, solid waste management, and riverbank/shoreline stability.',
    stat: 'Topsoil preservation & reclamation',
    items: [
      'Soil classification, nutrient profiling, permeability, and erosion vulnerability.',
      'Topographical and visual landscape surveys, slope stability analysis.',
      'Mapping natural watershed drainage paths to prevent localized flash flooding.',
      'Characterization and quantification of industrial hazardous and non-hazardous solid waste.',
      'Evaluating feasibility of applying treated effluent for agricultural landscaping.',
      'Shoreline and riverbank stability analysis against erosion from jetty construction.',
    ],
    mitigations: [
      'Topsoil stripping, preservation, and reuse for post-mining greening.',
      'Engineered secured sanitary landfills with double HDPE liners and leachate traps.',
      'Terracing, check dams, and bio-engineering to prevent hillside landslides.',
    ],
  },
  {
    id: 'comp-socio',
    letter: 'F',
    title: 'Socio-Economic & Health',
    scope: 'Demographic tracking, epidemiological disease baselines, cultural heritage protection, and rehabilitation packages.',
    stat: 'Special emphasis on Scheduled Areas',
    items: [
      'Demographic census: population, literacy, employment, and income distribution.',
      'Epidemiological health profiling: endemic diseases and local morbidity rates.',
      'Assessment of involuntary displacement, land acquisition, and livelihood loss.',
      'Archaeological and historical survey of cultural heritage and religious shrines.',
      'Projection of employment generation, local tax revenue, and market growth.',
    ],
    mitigations: [
      'Comprehensive Rehabilitation & Resettlement (R&R) packages with housing and skill training.',
      'Establishing subsidized community healthcare dispensaries and clean drinking water.',
      'Special constitutional protections and cultural safeguards for Scheduled Tribes and Castes.',
    ],
  },
  {
    id: 'comp-risk',
    letter: 'G',
    title: 'Risk Assessment & DMP',
    scope: 'Hazard identification, Maximum Credible Accident (MCA) analysis, HAZOP studies, and On-site/Off-site Disaster Management Plans.',
    stat: 'On-site & Off-site Disaster Management Plans',
    items: [
      'Hazard identification: toxic chemical inventories, flammables, pressure vessels.',
      'Maximum Credible Accident (MCA) modeling: worst-case plausible explosion/fire scenarios.',
      'Consequence analysis: fireball radiation radius, toxic vapor dispersion, dam breaks.',
      'Hazard and Operability (HAZOP) systematic operational engineering audit.',
      'Evaluation of natural disaster vulnerability (earthquake seismic zoning, floods, landslides).',
    ],
    mitigations: [
      'Automated gas detection, emergency automatic shut-off valves, and fire-deluge networks.',
      'On-site Disaster Management Plan (DMP): plant evacuation routes, siren alarms, trained squads.',
      'Off-site Disaster Management Plan coordinated with district police, fire, and hospitals.',
    ],
  },
  {
    id: 'comp-emp',
    letter: 'H',
    title: 'Environmental Management Plan (EMP)',
    scope: 'Operational execution: prevention measures, compliance monitoring schemes, financial budgeting, and institutional scheduling.',
    stat: 'Legally binding compliance charter',
    items: [
      'Delineation of mitigation measures for every single environmental component.',
      'Detailed environmental monitoring scheme: sampling points, frequencies, and standards.',
      'Implementation schedule tied directly to project construction milestones.',
      'Explicit capital expenditure (CAPEX) and recurring operational budget (OPEX) allocation.',
      'Establishment of an in-house Environmental Management Cell (EMC) reporting to top leadership.',
    ],
    mitigations: [
      'Dedicated statutory funding exclusively reserved for pollution control operation.',
      'Six-monthly compliance submissions to MoEFCC regional office and online portal.',
      'Third-party environmental auditing and ISO 14001 certification commitments.',
    ],
  },
];

// ─── SECTION 14: EIA BENEFITS VS FLAWS ───
export const eiaBenefitsVsFlawsData = {
  benefits: [
    { title: 'Provides systematic method of impact assessment', desc: 'Provides a structured, scientific approach to evaluating environmental impacts, ensuring nothing is overlooked.' },
    { title: 'Estimates cost/benefit trade-off of alternative actions', desc: 'Compares different project options, helping identify which option gives the best balance between economic benefits and environmental costs.' },
    { title: 'Facilitates public participation', desc: 'EIA processes include public hearings, giving communities a voice in decisions affecting their environment.' },
    { title: 'Provides effective mechanism for coordination', desc: 'EIA brings together different departments, agencies, and stakeholders.' },
    { title: 'Environmental integration', desc: 'EIA integrates environmental considerations into the development planning process from the start.' },
    { title: 'Negotiations', desc: 'EIA provides a platform for negotiating between developers and affected communities.' },
    { title: 'Feedback loop', desc: 'Information from monitoring contributes to improving future projects and policies.' },
    { title: 'Top-level decision making', desc: 'EIA informs high-level government decisions about project approvals with scientific rigor.' },
    { title: 'Achieves balance between development & environment', desc: 'EIA is the primary tool for ensuring that development is environmentally responsible and sustainable.' },
  ],
  flaws: [
    { title: 'Time consuming', desc: 'The EIA process can take months or years, which may delay urgently needed infrastructure projects.' },
    { title: 'Costly', desc: 'Conducting a comprehensive EIA requires significant financial resources for surveys, studies, consultations, and report preparation.' },
    { title: 'Little public participation in actual implementation', desc: 'While public hearings are held, communities often have little say in the actual decision or how the project is implemented.' },
    { title: 'Unavailability of reliable data', desc: 'EIA depends on good baseline data, which is often lacking in developing countries due to poor monitoring infrastructure.' },
    { title: 'Too focused on scientific analysis at times', desc: 'EIA can sometimes over-emphasize quantitative scientific data at the expense of qualitative concerns like cultural values and community perceptions.' },
    { title: 'Compliance monitoring after EIA is seldom carried out', desc: 'Even when environmental clearances are given with conditions, monitoring of whether these conditions are met is often inadequate.' },
  ],
};

// ─── 5-MODULE GLOBAL NAVIGATION RAIL (COVER SCREEN) ───
export const modulesNav = [
  { id: 'land', num: '01', title: 'Land', path: '/module/land' },
  { id: 'water', num: '02', title: 'Water', path: '/module/water' },
  { id: 'air', num: '03', title: 'Air', path: '/module/air' },
  { id: 'bio', num: '04', title: 'Biodiversity', path: '/module/biodiversity' },
  { id: 'warming', num: '05', title: 'Global Warming', path: '/module/warming' },
];

// ─── CHAPTERS NAVIGATION LIST (16 ENTRIES) ───
export const warmingChaptersNav = [
  { id: 'warming-cover',       num: '01', title: 'Module Intro',                    part: 'COVER' },
  { id: 'ch-01-greenhouse',    num: '02', title: 'Global Warming',                  part: 'ACT 1' },
  { id: 'ch-02-indicators',    num: '03', title: 'Warming Indicators',              part: 'ACT 1' },
  { id: 'ch-03-causes',        num: '04', title: 'Causes',                          part: 'ACT 1' },
  { id: 'ch-04-effects',       num: '05', title: 'Effects',                         part: 'ACT 1' },
  { id: 'ch-05-climate-vs-gw', num: '06', title: 'Global Warming vs Climate Change',part: 'ACT 1' },
  { id: 'ch-06-climate-ind',   num: '07', title: 'Climate Indicators',              part: 'ACT 1' },
  { id: 'ch-07-human-health',  num: '08', title: 'Human Health',                    part: 'ACT 1' },
  { id: 'ch-08-eia-intro',     num: '09', title: 'Introduction to EIA',             part: 'ACT 2' },
  { id: 'ch-09-eia-values',    num: '10', title: 'EIA Values',                      part: 'ACT 2' },
  { id: 'ch-10-eia-history',   num: '11', title: 'Benefits & History',              part: 'ACT 2' },
  { id: 'ch-11-eia-process',   num: '12', title: 'EIA Procedure',                   part: 'ACT 2' },
  { id: 'ch-12-eia-flowchart', num: '13', title: 'EIA Flowchart',                   part: 'ACT 2' },
  { id: 'ch-13-eia-report',    num: '14', title: 'EIA Report Components',           part: 'ACT 2' },
  { id: 'ch-14-benefits-flaws',num: '15', title: 'Benefits & Flaws',                part: 'ACT 2' },
  { id: 'warming-summary',     num: '16', title: 'Module Summary',                  part: 'RECAP' },
];


