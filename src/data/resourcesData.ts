export interface ChapterOutline {
  number: string;
  title: string;
  summary: string;
  subtopics: string[];
}

export interface ModuleResource {
  id: string;
  moduleNumber: number;
  moduleSlug: string;
  code: string;
  title: string;
  shortTitle: string;
  domain: string;
  description: string;
  accent: string;
  glow: string;
  bgGlow: string;
  badge: string;
  cardImage: string;
  fileSize: string;
  fileSizeBytes: number;
  pageCountApprox: string;
  driveFileId: string;
  driveViewUrl: string;
  drivePreviewUrl: string;
  driveDownloadUrl: string;
  localPdfUrl: string;
  markdownDocUrl: string;
  tagline: string;
  stats: { label: string; value: string; sub?: string }[];
  keyTopics: string[];
  chapters: ChapterOutline[];
  syllabusDetails: {
    unitName: string;
    teachingHours: string;
    examWeightage: string;
    focusAreas: string[];
  };
}

export const MODULE_RESOURCES: ModuleResource[] = [
  {
    id: 'mod-1-land',
    moduleNumber: 1,
    moduleSlug: 'land',
    code: 'BCV755B · Module 01',
    title: 'Land Resources, Crustal Dynamics & Soil Conservation',
    shortTitle: 'Land Resources',
    domain: 'Lithosphere & Terrestrial Ecology',
    description:
      'Complete field study notes covering Earth’s 4.6 Bya origin, crustal and mantle stratification, continental drift dynamics, land as a finite natural resource (20% habitable), pedogenesis and soil horizons (O, A, E, B, C, R), the 6 major pathways of land degradation, and sustainable land-use planning protocols.',
    accent: '#C9A15A',
    glow: 'rgba(201, 161, 90, 0.45)',
    bgGlow: 'rgba(201, 161, 90, 0.12)',
    badge: '15.4 MB · 7 Core Chapters',
    cardImage: '/images/card-land.jpg',
    fileSize: '15.4 MB',
    fileSizeBytes: 15371068,
    pageCountApprox: '~46 Pages',
    driveFileId: '1zeM9YOopw2Rb6_zfVi3Ld-XMvJxhXeAJ',
    driveViewUrl: 'https://drive.google.com/file/d/1zeM9YOopw2Rb6_zfVi3Ld-XMvJxhXeAJ/view?usp=sharing',
    drivePreviewUrl: 'https://drive.google.com/file/d/1zeM9YOopw2Rb6_zfVi3Ld-XMvJxhXeAJ/preview',
    driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1zeM9YOopw2Rb6_zfVi3Ld-XMvJxhXeAJ',
    localPdfUrl: '/notes/pdf/module-01-land-resources.pdf',
    markdownDocUrl: '/notes/module-01-land.md',
    tagline: 'The ground beneath everything.',
    stats: [
      { label: "Earth's Surface", value: '20%' },
      { label: 'Earth Formed', value: '4.6 Bya' },
      { label: 'Concentric Layers', value: '4 Layers' },
    ],
    keyTopics: [
      'Origin of Earth (4.6 Bya)',
      'Crust, Mantle, Outer & Inner Core',
      'Continental Drift & Tectonics',
      'Land as a Finite Resource (20%)',
      'Pedogenesis & Soil Horizons (O-R)',
      '6 Pathways to Land Degradation',
      'Terracing & Soil Conservation',
      'Sustainable Land-Use Planning',
    ],
    chapters: [
      {
        number: '01',
        title: "Earth & Formation of Earth's Crust",
        summary: '4.6 Bya timeline, accretion of cosmic dust, differentiation of planetary layers, tectonic plate mobility on fluid mantle.',
        subtopics: ['4.6 Bya Accretion', '4 Concentric Planetary Layers', 'Silicate Mantle & Iron-Nickel Core', 'Crustal Solidification'],
      },
      {
        number: '02',
        title: 'Land as a Finite Natural Resource',
        summary: 'Terrestrial biosphere accounting for 20% of Earth surface, human ecological footprint, and multi-functional land capability.',
        subtopics: ['20% Terrestrial Coverage', 'Ecosystem Services of Land', 'Human Habitation Zones', 'Global Land Allocation'],
      },
      {
        number: '03',
        title: 'Soil Formation & Horizon Profiling',
        summary: 'Physical, chemical, and biological weathering of bedrock into mature soil horizons (O, A, E, B, C, and parent R layer).',
        subtopics: ['Pedogenesis Weathering', 'Master Horizons O, A, E, B, C, R', 'Humus Enrichment', 'Soil Texture & Porosity'],
      },
      {
        number: '04',
        title: 'Landforms & Morphological Diversity',
        summary: 'Classification of mountains, plateaus, floodplains, arid deserts, and coastal wetlands with tectonic evolution.',
        subtopics: ['Orogenesis & Mountain Formation', 'Fluvial Landforms & Deltas', 'Arid Eolian Landforms', 'Karst Landscapes'],
      },
      {
        number: '05',
        title: 'Deforestation & Forest Loss Vectors',
        summary: 'Primary catalysts for tropical and temperate deforestation, loss of moisture recycling, and global carbon release.',
        subtopics: ['Agricultural Expansion', 'Commercial Logging & Fuelwood', 'Infrastructure Fragmentation', 'Microclimate Disruption'],
      },
      {
        number: '06',
        title: '6 Pathways of Land Degradation',
        summary: 'Exhaustive analysis of soil erosion, salinization, waterlogging, desertification, compaction, and agrochemical contamination.',
        subtopics: ['Sheet & Gully Water Erosion', 'Wind Detachment in Arid Zones', 'Secondary Salinization', 'Chemical Nutrient Mining'],
      },
      {
        number: '07',
        title: 'Soil Conservation & Land-Use Planning',
        summary: 'Agronomic, mechanical, and biological soil conservation engineering, agroforestry, watershed contouring, and GIS land zoning.',
        subtopics: ['Contour Bunding & Terracing', 'Shelterbelts & Windbreaks', 'Agroforestry Systems', 'GIS-Guided Land Classification'],
      },
    ],
    syllabusDetails: {
      unitName: 'Unit I — Terrestrial & Soil Resources',
      teachingHours: '10 Hours',
      examWeightage: '20 Marks (VTU SEE)',
      focusAreas: ['Soil Horizon Differentiation', 'Land Degradation Mechanisms', 'Conservation Engineering Designs'],
    },
  },
  {
    id: 'mod-2-water',
    moduleNumber: 2,
    moduleSlug: 'water',
    code: 'BCV755B · Module 02',
    title: 'Water Resources, Hydrological Systems & Groundwater Dynamics',
    shortTitle: 'Water Resources',
    domain: 'Hydrosphere & Aquatic Engineering',
    description:
      'Exhaustive documentation on the global hydrological cycle, planetary freshwater reserves (2.5%), surface runoff systems, unconfined and confined aquifer hydrogeology, river basin interlinking (NRLP & IBWT), conjunctive water use management, and watershed harvesting systems.',
    accent: '#4FA3C7',
    glow: 'rgba(79, 163, 199, 0.45)',
    bgGlow: 'rgba(79, 163, 199, 0.12)',
    badge: '15.7 MB · 8 Core Chapters',
    cardImage: '/images/card-water.jpg',
    fileSize: '15.7 MB',
    fileSizeBytes: 15666876,
    pageCountApprox: '~52 Pages',
    driveFileId: '1b1F5ZZsdQqFe2cmgTIJt2JglWq2qbZoZ',
    driveViewUrl: 'https://drive.google.com/file/d/1b1F5ZZsdQqFe2cmgTIJt2JglWq2qbZoZ/view?usp=sharing',
    drivePreviewUrl: 'https://drive.google.com/file/d/1b1F5ZZsdQqFe2cmgTIJt2JglWq2qbZoZ/preview',
    driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1b1F5ZZsdQqFe2cmgTIJt2JglWq2qbZoZ',
    localPdfUrl: '/notes/pdf/module-02-water-resources.pdf',
    markdownDocUrl: '/notes/module-02-water.md',
    tagline: 'The cradle of life.',
    stats: [
      { label: 'Hydrosphere Cover', value: '71%' },
      { label: 'Freshwater Ratio', value: '2.5%' },
      { label: 'Annual Replenish', value: '433 BCM' },
    ],
    keyTopics: [
      'Global Hydrological Cycle & Budget',
      'Freshwater Partitioning (2.5%)',
      'Surface Water Bodies & Reservoirs',
      'Hydrogeology: Confined vs Unconfined',
      'Groundwater Potential in India (433 BCM)',
      'Interbasin Water Transfers (IBWT/NRLP)',
      'Conjunctive Surface & Subsurface Use',
      'Rooftop Rainwater Harvesting & Recharging',
    ],
    chapters: [
      {
        number: '01',
        title: 'Hydrological Cycle & Planetary Budget',
        summary: 'Global closed mass conservation cycle: evaporation, evapotranspiration, cloud condensation, precipitation, and runoff flux.',
        subtopics: ['Solar-Driven Kinetic Engine', 'Global Evaporation vs Runoff', 'Residence Times of Water Reservoirs', 'Water Balance Equation'],
      },
      {
        number: '02',
        title: 'Distribution of Global Water Resources',
        summary: 'Saline oceans (97.5%) vs freshwater (2.5%), glaciers/ice caps (68.7%), groundwater (30.1%), and accessible surface water (1.2%).',
        subtopics: ['Oceanic Saline Dominance', 'Cryosphere Locked Reserves', 'Liquid Accessible Freshwater Ratio', 'Global Per Capita Scarcity'],
      },
      {
        number: '03',
        title: 'Surface Water & Major River Basins',
        summary: 'Hydrology of perennial and ephemeral river basins in India (Ganga, Brahmaputra, Indus, Godavari, Krishna, and Cauvery).',
        subtopics: ['Catchment Hydrology & Yield', 'Drainage Basin Geomorphology', 'Reservoir Storage Capacities', 'Monsoonal Discharge Fluctuations'],
      },
      {
        number: '04',
        title: 'Groundwater Systems & Hydrogeology',
        summary: 'Subsurface water table, vadose zone, unconfined phreatic aquifers, confined artesian formations, Darcy’s Law, and transmissivity.',
        subtopics: ['Aquifer Porosity & Permeability', 'Piezometric Surface Dynamics', 'Confining Aquitards & Aquicludes', 'Well Hydraulics & Drawdown'],
      },
      {
        number: '05',
        title: 'Groundwater Potential & Regional Assessment',
        summary: 'Central Ground Water Board (CGWB) categorization of assessment units: Safe, Semi-Critical, Critical, and Over-Exploited blocks.',
        subtopics: ['433 BCM Annual Replenishability', 'Alluvial vs Hard Rock Hydrogeology', 'Stage of Groundwater Extraction', 'Fluoride & Arsenic Geogenic Threats'],
      },
      {
        number: '06',
        title: 'Interbasin Water Transfers (IBWT) & NRLP',
        summary: 'Engineering appraisal of India’s National River Linking Project: Himalayan component (14 links) and Peninsular component (16 links).',
        subtopics: ['Ken-Betwa & Godavari-Krishna Links', 'Gravity Canals & Pumping Head', 'Ecological Impact & Submergence', 'Water Conflict Resolutions'],
      },
      {
        number: '07',
        title: 'Conjunctive Use of Surface & Subsurface Water',
        summary: 'Optimum coordinated scheduling of surface canal deliveries and groundwater pumping to mitigate waterlogging and combat overdraft.',
        subtopics: ['Hydro-Salinity Equilibrium', 'Artificial Recharge through Canals', 'Optimal Pumping Trajectories', 'Mathematical Optimization Models'],
      },
      {
        number: '08',
        title: 'Watershed Management & Rainwater Harvesting',
        summary: 'Micro-watershed engineering techniques: check dams, percolation tanks, continuous contour trenches, and urban rooftop recharge wells.',
        subtopics: ['Ridge-to-Valley Soil-Water Conservation', 'Rooftop Rain Harvesting Design', 'Recharge Shafts & Filtration Media', 'Participatory Community Management'],
      },
    ],
    syllabusDetails: {
      unitName: 'Unit II — Hydrological & Water Resources',
      teachingHours: '10 Hours',
      examWeightage: '20 Marks (VTU SEE)',
      focusAreas: ['Aquifer Hydraulics & Formulas', 'Interlinking River Projects (IBWT)', 'Conjunctive Use Mathematical Principles'],
    },
  },
  {
    id: 'mod-3-air',
    moduleNumber: 3,
    moduleSlug: 'air',
    code: 'BCV755B · Module 03',
    title: 'Atmospheric Resources, Air Quality & Pollution Control Engineering',
    shortTitle: 'Atmospheric Resources',
    domain: 'Atmosphere & Environmental Control',
    description:
      'Detailed analytical notes examining atmospheric vertical stratification (Troposphere to Exosphere), gas composition, solar radiation budget, criteria air pollutants (PM2.5, PM10, SOx, NOx, CO, Ozone), atmospheric stability and inversion kinetics, acid precipitation, and industrial particulate control systems.',
    accent: '#9FB8C4',
    glow: 'rgba(159, 184, 196, 0.45)',
    bgGlow: 'rgba(159, 184, 196, 0.12)',
    badge: '11.1 MB · 6 Core Chapters',
    cardImage: '/images/card-air.jpg',
    fileSize: '11.1 MB',
    fileSizeBytes: 11076897,
    pageCountApprox: '~40 Pages',
    driveFileId: '1cxI1a96mywy-9SZj-M_B0n9OoNNGu5Rq',
    driveViewUrl: 'https://drive.google.com/file/d/1cxI1a96mywy-9SZj-M_B0n9OoNNGu5Rq/view?usp=sharing',
    drivePreviewUrl: 'https://drive.google.com/file/d/1cxI1a96mywy-9SZj-M_B0n9OoNNGu5Rq/preview',
    driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1cxI1a96mywy-9SZj-M_B0n9OoNNGu5Rq',
    localPdfUrl: '/notes/pdf/module-03-atmospheric-resources.pdf',
    markdownDocUrl: '/notes/module-03-air.md',
    tagline: 'The thin protective shell we breathe.',
    stats: [
      { label: 'Tropospheric Mass', value: '80%' },
      { label: 'Nitrogen / Oxygen', value: '78% / 21%' },
      { label: 'Atmospheric Layers', value: '5 Strata' },
    ],
    keyTopics: [
      'Atmospheric Layers (Troposphere to Exosphere)',
      'Atmospheric Composition & Solar Flux',
      'Criteria Air Pollutants (PM2.5, SO2, NOx, CO)',
      'Thermal Inversions & Gaussian Plume Models',
      'Acid Deposition & Photochemical Smog',
      'Electrostatic Precipitators (ESP)',
      'Cyclone Separators & Baghouse Filters',
      'National Clean Air Programme (NCAP) & NAAQS',
    ],
    chapters: [
      {
        number: '01',
        title: 'Atmospheric Stratification & Solar Energy Balance',
        summary: 'Vertical thermal gradient across Troposphere, Stratosphere (ozone layer), Mesosphere, Thermosphere, and Exosphere with incoming insolation budget.',
        subtopics: ['Tropospheric Lapse Rate (6.5°C/km)', 'Stratospheric Ozone Thermal Inversion', 'Planetary Albedo (30%)', 'Earth Shortwave vs Longwave Flux'],
      },
      {
        number: '02',
        title: 'Composition of Clean Air & Anthropogenic Perturbations',
        summary: 'Nitrogen (78.08%), Oxygen (20.95%), Argon (0.93%), and trace greenhouse and reactive gaseous constituents.',
        subtopics: ['Chemical Tropospheric Baseline', 'Residence Times of Pollutants', 'Natural vs Anthropogenic Fluxes', 'Biogeochemical Atmospheric Cycles'],
      },
      {
        number: '03',
        title: 'Classification of Criteria Air Pollutants',
        summary: 'Primary vs secondary pollutants, particulate dynamics (PM10, PM2.5, ultrafine particles), and hazardous gaseous emissions.',
        subtopics: ['Particulate Matter Aerodynamics', 'Sulfur Dioxide (SO2) from Coal', 'Nitrogen Oxides (NOx) from Combustion', 'Carbon Monoxide & Toxic VOCs'],
      },
      {
        number: '04',
        title: 'Atmospheric Dispersion & Inversion Meteorology',
        summary: 'Dry and saturated adiabatic lapse rates (DALR/SALR), radiation and subsidence inversions, mixing heights, and plume behavior.',
        subtopics: ['Atmospheric Stability Classes (A-F)', 'Nocturnal Ground Inversion Trap', 'Plume Geometries: Looping to Fanning', 'Gaussian Dispersion Equations'],
      },
      {
        number: '05',
        title: 'Secondary Pollution Phenomena: Smog & Acid Rain',
        summary: 'Photochemical smog kinetics (PAN, tropospheric ozone formation) and sulfuric/nitric acid wet/dry deposition damaging aquatic and stone ecosystems.',
        subtopics: ['Los Angeles Photochemical Smog Cycle', 'London Reducing Smog Events', 'Acid Rain pH (<5.6) Kinetics', 'Taj Trapezium Marble Cancer Case Study'],
      },
      {
        number: '06',
        title: 'Air Pollution Control Technology & Regulations',
        summary: 'Design mechanics of Cyclone Separators, Fabric Baghouses, Wet Venturi Scrubbers, and Electrostatic Precipitators (ESP) with NAAQS standards.',
        subtopics: ['Cyclone Centrifugal Particle Cut-Size', 'Electrostatic Precipitator Corona Charging', 'Fabric Filter Cleaning Cycles', 'NAAQS 12-Pollutant Norms & AQI'],
      },
    ],
    syllabusDetails: {
      unitName: 'Unit III — Atmospheric Resources & Air Quality',
      teachingHours: '10 Hours',
      examWeightage: '20 Marks (VTU SEE)',
      focusAreas: ['Lapse Rate & Atmospheric Stability', 'Industrial Particulate Control Equipment Design', 'NAAQS Standards & Health Impacts'],
    },
  },
  {
    id: 'mod-4-biodiversity',
    moduleNumber: 4,
    moduleSlug: 'biodiversity',
    code: 'BCV755B · Module 04',
    title: 'Biodiversity Systems, Ecosystem Valuation & Conservation Protocols',
    shortTitle: 'Biodiversity Resources',
    domain: 'Biosphere & Conservation Biology',
    description:
      'Comprehensive field lecture notes on hierarchical biodiversity levels (genetic, species, ecosystem diversity), global megadiversity hotspots, direct/indirect economic and ethical valuation, anthropogenic extinction drivers (HIPPO framework), and dual-tier in-situ and ex-situ conservation protocols under the Biological Diversity Act 2002.',
    accent: '#6FA96B',
    glow: 'rgba(111, 169, 107, 0.45)',
    bgGlow: 'rgba(111, 169, 107, 0.12)',
    badge: '18.0 MB · 8 Core Chapters',
    cardImage: '/images/card-bio.jpg',
    fileSize: '18.0 MB',
    fileSizeBytes: 17961542,
    pageCountApprox: '~56 Pages',
    driveFileId: '1FoGgO9P7K7AqkdDp2_ACKR3GrEsL5XRe',
    driveViewUrl: 'https://drive.google.com/file/d/1FoGgO9P7K7AqkdDp2_ACKR3GrEsL5XRe/view?usp=sharing',
    drivePreviewUrl: 'https://drive.google.com/file/d/1FoGgO9P7K7AqkdDp2_ACKR3GrEsL5XRe/preview',
    driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1FoGgO9P7K7AqkdDp2_ACKR3GrEsL5XRe',
    localPdfUrl: '/notes/pdf/module-04-biodiversity-resources.pdf',
    markdownDocUrl: '/notes/module-04-biodiversity.md',
    tagline: 'The four-billion-year web of living things.',
    stats: [
      { label: 'Estimated Species', value: '8.7 Million' },
      { label: 'Diversity Levels', value: '3 Tiers' },
      { label: 'Global Hotspots', value: '36 Worldwide' },
    ],
    keyTopics: [
      '3 Hierarchical Levels of Biodiversity',
      'Global Biodiversity Hotspots (Western Ghats & Himalayas)',
      'Economic Valuation: Consumptive vs Productive',
      'Ecological Services: Pollination, Nutrient Cycling',
      'HIPPO Threats & Anthropogenic Extinction',
      'In-Situ Conservation: National Parks & Sanctuaries',
      'Ex-Situ Conservation: Gene Banks & Cryopreservation',
      'Biological Diversity Act 2002 & Access Benefit Sharing',
    ],
    chapters: [
      {
        number: '01',
        title: 'Concept & 3 Levels of Biological Diversity',
        summary: 'Foundational framework of biosphere diversity spanning genetic polymorphism, species richness/evenness, and ecosystem landscape complexity.',
        subtopics: ['Allelic & Genetic Variation', 'Alpha, Beta & Gamma Species Diversity', 'Community & Biome Architecture', 'Bio-Indicator Organisms'],
      },
      {
        number: '02',
        title: 'Global Biodiversity Hotspots & India as Mega-Diversity Center',
        summary: 'Myers criteria for hotspot qualification (≥1,500 endemic vascular plants, ≥70% primary habitat loss); Western Ghats, Himalayas, Indo-Burma, and Sundaland.',
        subtopics: ['Norman Myers Hotspot Qualification', 'Western Ghats Endemic Flora & Fauna', 'Eastern Himalayas Biodiversity Wealth', 'Indo-Burma & Nicobar Sundaland'],
      },
      {
        number: '03',
        title: 'Total Economic Value (TEV) of Ecosystems',
        summary: 'Direct use values (food, medicine, industrial timber), indirect use values (carbon sequestration, watershed buffering), option value, and intrinsic existence value.',
        subtopics: ['Consumptive Use of Bio-Resources', 'Phytomedicines (Quinine, Taxol, Artemisinin)', 'Ecosystem Pollination & Soil Genesis', 'Existence & Bequest Ethical Values'],
      },
      {
        number: '04',
        title: 'Threats to Biodiversity — The HIPPO Matrix',
        summary: 'Systematic analysis of Habitat destruction, Invasive alien species, Population expansion, Pollution loading, and Over-harvesting.',
        subtopics: ['Forest Habitat Fragmentation', 'Invasive Flora: Lantana Camara & Water Hyacinth', 'Poaching & Illegal Wildlife Trade', 'Sixth Mass Extinction Acceleration'],
      },
      {
        number: '05',
        title: 'In-Situ Conservation Systems',
        summary: 'On-site natural reserve management: Wildlife Sanctuaries (IUCN IV), National Parks (IUCN II), and Man & Biosphere (MAB) three-tier reserves.',
        subtopics: ['Core, Buffer & Transition Zoning', 'Project Tiger & Corridors', 'Community Sacred Groves (Devarakadus)', 'Marine Protected Areas'],
      },
      {
        number: '06',
        title: 'Ex-Situ Conservation Strategies',
        summary: 'Off-site preservation of endangered taxa: Botanical Gardens, Zoological Parks, Seed Banks, Cryopreservation, and In-Vitro Tissue Culture.',
        subtopics: ['Svalbard & National Gene Banks', 'Liquid Nitrogen (-196°C) Cryopreservation', 'Captive Breeding & Reintroduction', 'Botanical Arboreta Germplasm Pools'],
      },
      {
        number: '07',
        title: 'Biological Diversity Act 2002 & Institutional Architecture',
        summary: 'Three-tiered statutory governance in India: National Biodiversity Authority (NBA), State Biodiversity Boards (SBB), and Biodiversity Management Committees (BMC).',
        subtopics: ['People’s Biodiversity Register (PBR)', 'Access & Benefit Sharing (ABS) Norms', 'IPR Protection of Indigenous Knowledge', 'Penalties for Biopiracy'],
      },
      {
        number: '08',
        title: 'International Conventions: CBD, CITES, IUCN',
        summary: 'Multilateral treaties: 1992 Rio Convention on Biological Diversity, CITES Appendices I-III, and IUCN Red Data Book threatened categories.',
        subtopics: ['Rio CBD Three Core Objectives', 'IUCN Red List Categories (CR, EN, VU)', 'CITES Trade Restrictions', 'Nagoya & Cartagena Protocols'],
      },
    ],
    syllabusDetails: {
      unitName: 'Unit IV — Biodiversity & Ecosystem Conservation',
      teachingHours: '10 Hours',
      examWeightage: '20 Marks (VTU SEE)',
      focusAreas: ['In-Situ vs Ex-Situ Comparative Analysis', 'Hotspot Criteria & Indian Geography', 'Biological Diversity Act 2002 Framework'],
    },
  },
  {
    id: 'mod-5-warming',
    moduleNumber: 5,
    moduleSlug: 'warming',
    code: 'BCV755B · Module 05',
    title: 'Global Warming, Climate Radiative Forcing & Environmental Impact Assessment (EIA)',
    shortTitle: 'Global Warming & EIA',
    domain: 'Climatology & Environmental Policy',
    description:
      'Complete analytical notes covering the enhanced greenhouse effect, radiative balance calculations, greenhouse gas kinetics & Global Warming Potentials (GWP), positive feedback mechanisms, climate mitigation treaties, and the statutory Environmental Impact Assessment (EIA) 2006 framework with EMP preparation.',
    accent: '#D8703F',
    glow: 'rgba(216, 112, 63, 0.45)',
    bgGlow: 'rgba(216, 112, 63, 0.12)',
    badge: '10.2 MB · 7 Core Chapters',
    cardImage: '/images/card-warming.jpg',
    fileSize: '10.2 MB',
    fileSizeBytes: 10207468,
    pageCountApprox: '~44 Pages',
    driveFileId: '1572WndCaCTBHNchHBV4EgD-EZnuuxL3P',
    driveViewUrl: 'https://drive.google.com/file/d/1572WndCaCTBHNchHBV4EgD-EZnuuxL3P/view?usp=sharing',
    drivePreviewUrl: 'https://drive.google.com/file/d/1572WndCaCTBHNchHBV4EgD-EZnuuxL3P/preview',
    driveDownloadUrl: 'https://drive.google.com/uc?export=download&id=1572WndCaCTBHNchHBV4EgD-EZnuuxL3P',
    localPdfUrl: '/notes/pdf/module-05-global-warming-eia.pdf',
    markdownDocUrl: '/notes/module-05-warming-eia.md',
    tagline: 'Radiative balance, climate kinetics & human governance.',
    stats: [
      { label: 'Natural Greenhouse', value: '+33°C Life Base' },
      { label: 'Pre-Industrial CO2', value: '280 → 420 ppm' },
      { label: 'EIA Clearances', value: '4 Stages' },
    ],
    keyTopics: [
      'Greenhouse Effect & Radiative Forcing',
      'GHG Profiles & 100-Year GWP (CO2, CH4, N2O, SF6)',
      'Climate Feedback: Ice-Albedo & Permafrost Methane',
      'IPCC Scenarios & Sea Level Rise Projections',
      'EIA Notification 2006 & Category A vs B',
      '4 Statutory Stages: Screening, Scoping, Public Hearing, Appraisal',
      'Environmental Management Plan (EMP) & Monitoring',
      'Environmental Auditing & Post-Project Verification',
    ],
    chapters: [
      {
        number: '01',
        title: 'Thermodynamics of Global Warming & Greenhouse Effect',
        summary: 'Electromagnetic absorption of infrared radiation by triatomic and polyatomic atmospheric molecules, raising planetary mean temperature from -18°C to +15°C.',
        subtopics: ['Stefan-Boltzmann & Wien’s Displacement Laws', 'Atmospheric Infrared Window (8-14 μm)', 'Natural vs Enhanced Greenhouse Effect', 'Equilibrium Climate Sensitivity'],
      },
      {
        number: '02',
        title: 'Greenhouse Gas Profiles & Global Warming Potentials (GWP)',
        summary: 'Kinetic lifetime, radiative forcing efficiency, and 100-year GWP comparisons for CO2 (1), CH4 (28), N2O (265), and fluorinated industrial gases (up to 23,500).',
        subtopics: ['CO2 Keeling Curve & Carbon Budgets', 'Methane Enteric & Wetland Fluxes', 'Nitrous Oxide from Nitrogenous Fertilizers', 'CFCs, HCFCs, HFCs & SF6 Synthetic Gases'],
      },
      {
        number: '03',
        title: 'Climate Feedbacks & Biogeophysical Impacts',
        summary: 'Positive feedbacks (polar ice-albedo decay, Arctic permafrost methane release, ocean thermal uptake saturation) and cascading hydrological disruptions.',
        subtopics: ['Cryosphere Albedo Nonlinearities', 'Marine Ocean Acidification (Carbonate Depletion)', 'Extreme Weather Events & Monsoonal Shifts', 'Sea Level Rise & Coastal Inundation'],
      },
      {
        number: '04',
        title: 'International Climate Governance: UNFCCC & Paris Agreement',
        summary: 'Evolution from 1992 UNFCCC, 1997 Kyoto Protocol (Annex I targets & Clean Development Mechanism) to the 2015 Paris Agreement 1.5°C threshold and NDCs.',
        subtopics: ['Common but Differentiated Responsibilities (CBDR)', 'Kyoto Flexibility Mechanisms & Carbon Credits', 'Paris Agreement Article 6 Framework', 'India’s Nationally Determined Contributions (NDCs)'],
      },
      {
        number: '05',
        title: 'Fundamentals & Origin of Environmental Impact Assessment (EIA)',
        summary: 'Proactive engineering planning tool to predict, evaluate, and mitigate environmental consequences of proposed developmental projects prior to execution.',
        subtopics: ['Historical Origin: US NEPA 1969', 'Evolution of Indian EIA under EPA 1986', 'Objectives & Scope of Pre-Feasibility EIA', 'Strategic Environmental Assessment (SEA)'],
      },
      {
        number: '06',
        title: 'Indian EIA Notification 2006 — The 4 Regulatory Stages',
        summary: 'Categorization into Category A (MoEFCC central appraisal) and Category B (SEIAA state appraisal) across the mandatory 4-stage clearance cycle.',
        subtopics: ['Stage 1: Screening (Category B1 vs B2)', 'Stage 2: Scoping & Terms of Reference (ToR)', 'Stage 3: Public Consultation & Hearing Process', 'Stage 4: EAC Appraisal & Environmental Clearance'],
      },
      {
        number: '07',
        title: 'Environmental Management Plan (EMP) & Environmental Audit',
        summary: 'Engineering layout of mitigation measures, recurring budget allocations, greenbelt development, pollution control systems, and post-project compliance auditing.',
        subtopics: ['Mitigation Hierarchy: Avoid, Minimize, Offset', 'Air, Water & Noise Baseline Monitoring', 'Corporate Environmental Responsibility (CER)', 'Annual Environmental Statement Form V'],
      },
    ],
    syllabusDetails: {
      unitName: 'Unit V — Climate Change & Environmental Impact Assessment',
      teachingHours: '10 Hours',
      examWeightage: '20 Marks (VTU SEE)',
      focusAreas: ['EIA 2006 Flowchart & Stages', 'Greenhouse Gas GWP Calculations', 'Environmental Management Plan (EMP) Structure'],
    },
  },
];

export const COURSE_GENERAL_INFO = {
  courseCode: 'BCV755B',
  courseTitle: 'Conservation of Natural Resources',
  department: 'Department of Civil Engineering',
  institution: 'HKBK College of Engineering / VTU Curriculum',
  scheme: '2022/2021 Autonomous & VTU Scheme',
  credits: '3 Credits (3-0-0)',
  cieMarks: '50 Marks',
  seeMarks: '50 Marks',
  totalMarks: '100 Marks',
  totalPdfSize: '70.2 MB',
  totalModules: 5,
  totalChapters: 36,
};
