export interface FormationStageData {
  id: string;
  num: string;
  title: string;
  time: string;
  eon: string;
  desc: string;
  thumb: string;
  syllabusRef: string;
  thermalState: string;
  keyLayerDomain: string;
  examRelevance: string;
  curriculumSummary: string;
  curriculumNotes: {
    heading: string;
    points: string[];
  }[];
  scientificMechanisms: {
    title: string;
    description: string;
  }[];
  vtuExamPoints: {
    question: string;
    answer: string;
  }[];
}

export const FORMATION_STAGES: FormationStageData[] = [
  {
    id: 'nebula',
    num: '01',
    title: 'Solar Nebula',
    time: '4.6 – 4.5 bya',
    eon: 'Pre-Solar & Proto-Planetary Era',
    desc: 'A vast swirling cloud of interstellar gas, cosmic dust, and heavy elements collapsed under gravity to form the solar system.',
    thumb: '/images/stage-01-nebula.jpg',
    syllabusRef: 'Part 1: Formation of Earth (4.6 Billion Years Ago)',
    thermalState: 'Cosmic Plasma & Cold Gas Infall (> 2,000 K at central core)',
    keyLayerDomain: 'Circumstellar Disk & Interstellar Protoplanetary Matter',
    examRelevance: '⭐⭐⭐⭐ Core Syllabus Topic — Estimated 4.6 Bya Earth Origin',
    curriculumSummary:
      'According to VTU Module 1 Notes (BCV755B), Earth is estimated to have formed 4.6 billion years ago from primordial cosmic dust and gas collapsing under gravitational forces.',
    curriculumNotes: [
      {
        heading: "Curriculum Lecture Notes: Formation of Earth (Notes Line 9–14)",
        points: [
          'Earth is estimated to have formed 4.6 billion years ago.',
          'Initially it was a hot ball of fire and gas.',
          'Over time, the surface cooled down gradually and compressed into solid rock (exterior).',
          'The interior remained in molten form.',
          'Gravitational contraction concentrated mass at the center to ignite the nascent Sun, while the surrounding nebula flattened into a revolving circumstellar accretion disk.',
        ],
      },
      {
        heading: 'Cosmic Elemental Composition & Raw Materials',
        points: [
          'The solar nebula originated from the gravitational collapse of a giant molecular interstellar cloud enriched by prior supernova explosions.',
          'Composition was roughly 98% hydrogen and helium, and 2% heavier rocky and metallic elements (Iron, Silicon, Magnesium, Oxygen, Aluminum).',
          'High thermal gradients in the inner solar nebula prevented volatile gases (water, methane, ammonia) from condensing, ensuring the inner planets formed as dense rocky bodies.',
        ],
      },
    ],
    scientificMechanisms: [
      {
        title: 'Gravitational Collapse & Conservation of Angular Momentum',
        description:
          'As the diffuse nebular cloud contracted under its own gravity, conservation of angular momentum accelerated its rotational spin. Centrifugal forces flattened the sphere into a spinning protoplanetary disk, funneling dense silicate dust into the midplane.',
      },
      {
        title: 'Thermal Condensation Sequence',
        description:
          'Proximity to the young proto-Sun created a temperature gradient. Only refractory minerals with high crystallization temperatures (refractory oxides, iron-nickel alloys, and magnesium silicates) could solidify at Earth’s 1 AU orbital distance.',
      },
      {
        title: 'Electrostatic Dust Coagulation',
        description:
          'Sub-micron dust grains collided gently at low relative velocities, sticking together via electrostatic van der Waals forces to grow from microscopic particles into centimeter-sized aggregates.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'What is the scientifically estimated age of the Earth as specified in the BCV755B syllabus notes?',
        answer:
          'Earth is estimated to have formed approximately 4.6 billion years ago (4.6 Bya).',
      },
      {
        question: 'Why did Earth form as a rocky terrestrial planet rather than a gas giant?',
        answer:
          'Due to the high thermal condensation gradient near the early Sun, only refractory metallic elements and silicates (iron, magnesium, nickel, silicon) could condense at Earth’s orbit, whereas volatile gases were driven past the frost line.',
      },
    ],
  },
  {
    id: 'accretion',
    num: '02',
    title: 'Accretion',
    time: '4.5 – 4.4 bya',
    eon: 'Early Hadean Eon',
    desc: 'Dust and kilometer-sized planetesimals collided violently and coalesced under gravity, transforming kinetic shock into a fiery molten protoplanet.',
    thumb: '/images/stage-02-accretion.jpg',
    syllabusRef: 'Part 1: Earth as an Initial Hot Ball of Fire and Gas',
    thermalState: 'Superheated Molten Magma (> 3,000°C)',
    keyLayerDomain: 'Homogeneous High-Energy Protoplanetary Slag',
    examRelevance: '⭐⭐⭐⭐⭐ High Priority — Origin of Primordial Internal Heat',
    curriculumSummary:
      'Module 1 notes state: "Initially it was a hot ball of fire and gas." Catastrophic planetesimal bombardment and radiogenic decay melted the young Earth into a global magma ocean.',
    curriculumNotes: [
      {
        heading: 'Syllabus Note: Primordial "Hot Ball of Fire"',
        points: [
          'Lecture notes state: "Initially it was a hot ball of fire and gas."',
          'Relentless collisions of kilometer-sized planetesimals deposited astronomical kinetic energy, converted directly into heat.',
          'Rapid decay of short-lived radioactive radionuclides (Aluminium-26, Iron-60) flooded the interior with radiogenic heat.',
          'Gravitational self-compression compacted the interior, raising core temperatures above the melting point of all rocky minerals.',
        ],
      },
      {
        heading: 'The Theia Giant Impact & Lunar Origin',
        points: [
          'Late in the accretion stage (~4.51 bya), a Mars-sized protoplanet named Theia struck Earth in an oblique glancing collision.',
          'The catastrophic impact vaporized Earth’s outer silicate mantle, ejecting massive debris into orbit that coalesced into the Moon.',
          'The energy released liquefied virtually the entire planet, establishing a global magma ocean hundreds of kilometers deep.',
        ],
      },
    ],
    scientificMechanisms: [
      {
        title: 'Kinetic Energy Dissipation (E = 1/2 mv²)',
        description:
          'Impact velocities of accreting planetesimals exceeded 10–25 km/s. Upon impact, their monumental kinetic energy transformed instantaneously into intense shock compressive heating, melting both the projectile and the target mantle.',
      },
      {
        title: 'Runaway & Oligarchic Accretion',
        description:
          'The largest planetary bodies exerted gravitational focusing, sweeping up surrounding planetesimals faster than smaller bodies. This runaway effect concentrated mass into a single dominant planetary embryo within 10–50 million years.',
      },
      {
        title: 'Radionuclide Thermal Influx',
        description:
          'Short-lived isotopes like 26Al (half-life ~717,000 years) and 60Fe delivered intense volumetric heating throughout the interior, preventing early surface crusts from stabilizing.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'Explain the thermodynamic reasons why early Earth existed as a "hot ball of fire" as described in the notes.',
        answer:
          'Early Earth was superheated into a molten state by three primary heat sources: (1) Astronomical kinetic energy converted into heat during high-velocity planetesimal impacts, (2) Radiogenic decay heat from short-lived isotopes like Aluminium-26 and Iron-60, and (3) Gravitational adiabatic self-compression.',
      },
      {
        question: 'What was the consequence of the Giant Impact event during planetary accretion?',
        answer:
          'The impact completely liquefied Earth’s mantle into a global magma ocean, ejected debris that formed the Moon, and set Earth’s rotational tilt (obliquity) at ~23.5 degrees.',
      },
    ],
  },
  {
    id: 'early-earth',
    num: '03',
    title: 'Early Earth & Layering',
    time: '4.4 – 4.0 bya',
    eon: 'Hadean Eon (Planetary Differentiation)',
    desc: 'In a fully molten state, gravitational differentiation sorted Earth into 4 distinct layers: iron-nickel core, molten silicate mantle, and proto-crust.',
    thumb: '/images/stage-03-early-earth.jpg',
    syllabusRef: 'Part 1: The 4 Major Layers of the Earth',
    thermalState: 'Convective Magma Ocean (~5,000°C Core, ~2,500°C Mantle)',
    keyLayerDomain: 'Core-Mantle Boundary (D″ Layer) & Liquid Outer Core',
    examRelevance: '⭐⭐⭐⭐⭐ Core Syllabus Focus — 4 Major Layers Breakdown',
    curriculumSummary:
      'Module 1 notes define Earth’s 4 major layers: Crust (<1% vol), Mantle (~2900 km molten silicate), Outer Core (~2400 km fluid iron-nickel), and Inner Core (~1220 km solid, ~5000°C). Density sorting created this permanent architecture.',
    curriculumNotes: [
      {
        heading: 'Syllabus Note: Earth has 4 Major Layers (Notes Line 15–49)',
        points: [
          '1. CRUST: Outermost solid shell, covering underlying liquid mantle; thin layer accounting for less than 1% of Earth\'s volume. Forms part of the Lithosphere.',
          '2. MANTLE: Makes up majority of Earth\'s inner structure; spans ~2900 km; contains molten silicate. Tectonic plates float on fluidized mantle in continuous motion.',
          '3. OUTER CORE: Fluid layer ~2,400 km thick; composed mainly of iron and nickel; located above inner core and below mantle.',
          '4. INNER CORE: Innermost part of Earth; solid core with radius of ~1220 km; exact composition not known (no direct sample); temperature estimated around 5000°C.',
        ],
      },
      {
        heading: 'Molten Interior Continuity',
        points: [
          'Lecture notes explicitly emphasize: "The interior remained in molten form."',
          'High density liquid metals sank toward the center under gravity, while buoyant low-density silicates floated upward.',
          'Convection in the liquid iron outer core ignited the geodynamo, generating Earth’s magnetic field.',
        ],
      },
    ],
    scientificMechanisms: [
      {
        title: 'The Iron Catastrophe & Density Differentiation',
        description:
          'Liquid iron-nickel droplets (density 10–13 g/cm³) were completely immiscible in silicate melt (density 3–4 g/cm³). Driven by gravity, massive diapirs of molten metal percolated through the silicate matrix and pooled at the planetary center, forming the Core.',
      },
      {
        title: 'Geodynamo Magnetic Shield Initiation',
        description:
          'Thermal and compositional convection within the 2,400 km thick molten iron-nickel Outer Core generated self-sustaining electrical currents, creating Earth\'s dipolar magnetic field that deflects lethal solar wind radiation.',
      },
      {
        title: 'Magma Ocean Fractional Crystallization',
        description:
          'As the mantle cooled, dense olivine and pyroxene crystallized at depth, while lighter plagioclase feldspar and felsic aluminosilicates floated toward the surface to seed the earliest proto-crustal scums.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'Enumerate and describe the 4 major layers of the Earth with their dimensions and compositions as per lecture notes.',
        answer:
          '1. Crust: Outermost solid shell, < 1% of Earth\'s volume, broken into tectonic plates. 2. Mantle: ~2900 km thick, molten/ductile silicate supporting floating plates. 3. Outer Core: ~2400 km thick, fluid layer of iron and nickel. 4. Inner Core: ~1220 km radius, solid sphere at ~5000°C.',
      },
      {
        question: 'Why is the Inner Core solid while the Outer Core is fluid, despite both being made of iron-nickel?',
        answer:
          'The Inner Core experiences colossal hydrostatic pressure (~3.6 million atm) which forces atoms into a solid crystal lattice, elevating the melting point well above the ambient 5000°C temperature. The Outer Core has slightly lower pressure, allowing it to remain molten and fluid.',
      },
    ],
  },
  {
    id: 'cooling',
    num: '04',
    title: 'Cooling & Crust',
    time: '4.0 – 3.8 bya',
    eon: 'Hadean to Archean Transition',
    desc: 'Surface radiative heat loss chilled the molten lava ocean into a solid rock exterior—the Earth\'s crust—while the interior remained molten, initiating tectonic drift.',
    thumb: '/images/stage-04-cooling.jpg',
    syllabusRef: 'Part 1: Formation of Earth\'s Crust & Solid Exterior',
    thermalState: 'Surface Solidification (< 900°C) with Molten Interior Below',
    keyLayerDomain: 'Lithospheric Brittle Shell & Fluidized Asthenosphere',
    examRelevance: '⭐⭐⭐⭐⭐ High Priority — Crust Solidification & Plate Tectonics',
    curriculumSummary:
      'Syllabus notes: "Over time, the surface cooled down gradually and compressed into solid rock (exterior), while the interior remained in molten form." The brittle crust fractured into dynamic tectonic plates.',
    curriculumNotes: [
      {
        heading: "Syllabus Note: Formation of Earth's Crust (Notes Line 13 & 52–59)",
        points: [
          'Lecture notes state: "Over time, the surface cooled down gradually and compressed into solid rock (exterior). The interior remained in molten form."',
          'Crust: Outermost solid shell of Earth, covering the underlying liquid mantle.',
          'Accounts for less than 1% of Earth’s volume.',
          'Forms an important part of the Lithosphere.',
          'The Lithosphere is broken into tectonic plates that move constantly.',
          'Movement of tectonic plates allows heat to escape from Earth\'s interior into space.',
          'Landforms (tectonic plates) floated on the fluidized mantle layer in continuous dynamic motion.',
        ],
      },
      {
        heading: 'Thermal Dissipation & Structural Organization',
        points: [
          'Blackbody radiation allowed surface rocks to lose heat rapidly into the cold cosmic vacuum.',
          'Compression and crystallization produced dense mafic basalts and buoyant felsic granites.',
          'Oldest terrestrial zircon crystals (Jack Hills, Australia) date to 4.4–4.0 Bya, demonstrating solid continental crust existed early in Earth history.',
        ],
      },
    ],
    scientificMechanisms: [
      {
        title: 'Radiative Blackbody Cooling & Lithosphere Genesis',
        description:
          'Thermal energy escaped Earth’s surface via blackbody radiation (Stefan-Boltzmann law). When temperatures fell below the liquidus of silicate magma (~1000°C), crystallization forged the first rigid, brittle lithospheric lid.',
      },
      {
        title: 'Thermal Convection & Plate Tectonic Fracturing',
        description:
          'The underlying 2900 km molten mantle continued vigorous thermal convection. Friction between convective mantle plumes and the rigid crust sheared the brittle shell into tectonic plates, establishing a planetary heat-loss exhaust system.',
      },
      {
        title: 'Isostatic Flotation on Fluidized Mantle',
        description:
          'Because the solid crust (density ~2.7–3.0 g/cm³) is less dense than the underlying fluidized peridotite mantle (density ~3.3–5.5 g/cm³), crustal plates floated isostatically upon the asthenosphere.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'What percentage of Earth’s volume is occupied by the crust, and what is its role in Earth\'s thermal equilibrium?',
        answer:
          'The crust accounts for less than 1% of Earth\'s total volume. It is broken into tectonic plates whose continuous movement allows internal heat to escape from the molten interior into outer space.',
      },
      {
        question: 'Explain the relationship between the tectonic plates and the fluidized mantle as per lecture notes.',
        answer:
          'Tectonic plates float directly on the underlying fluidized, molten silicate mantle. Thermal convection within the mantle keeps the plates in continuous dynamic motion, driving continental drift.',
      },
    ],
  },
  {
    id: 'water-atmo',
    num: '05',
    title: 'Water & Atmosphere',
    time: '3.8 – 2.5 bya',
    eon: 'Archean Eon',
    desc: 'Violent volcanic outgassing released water vapor and CO2. As temperatures dropped below 100°C, atmospheric water precipitated into oceans, accelerating crust hardening.',
    thumb: '/images/stage-05-water.jpg',
    syllabusRef: 'Part 1: Atmospheric Changes, Precipitation & Ocean Formation',
    thermalState: 'Liquid Water Condensation (< 100°C at surface)',
    keyLayerDomain: 'Hydrosphere, Secondary Atmosphere & Ocean Depressions',
    examRelevance: '⭐⭐⭐⭐⭐ Core Syllabus Focus — Precipitation Accelerating Crust Formation',
    curriculumSummary:
      'Notes state: "Atmospheric changes like precipitation of water accelerated the crust formation process. Low lying areas accumulated water → formed Seas and Oceans." Water was the key catalyst for the biosphere.',
    curriculumNotes: [
      {
        heading: 'Syllabus Note: Formation of Seas and Oceans (Notes Line 52–59)',
        points: [
          'Lecture notes state: "Atmospheric changes like precipitation of water accelerated the process."',
          'Notes state: "Low lying areas accumulated water → formed Seas and Oceans."',
          'Intense volcanic degassing released superheated steam (H2O), carbon dioxide (CO2), nitrogen (N2), and sulfur gases into the proto-atmosphere.',
          'When surface temperatures dropped below 100°C, atmospheric water vapour condensed into clouds, triggering torrential rainfall lasting millions of years.',
          'Precipitating water acted as a powerful thermodynamic coolant, rapidly quenching and solidifying hot rocks on the surface.',
        ],
      },
      {
        heading: 'Depression Accumulation & Ocean Basin Salinity',
        points: [
          'Water flowed down topographic gradients into low-lying depressions formed by tectonic crustal fracturing.',
          'Runoff dissolved soluble mineral ions (sodium, magnesium, calcium, chloride) from rocks, washing them into marine basins and creating saline oceans.',
          'Ocean water began absorbing atmospheric CO2, regulating global greenhouse temperatures.',
        ],
      },
    ],
    scientificMechanisms: [
      {
        title: 'Secondary Atmosphere Volcanic Outgassing',
        description:
          'Widespread volcanic vents released juvenile mantle volatiles (steam H2O, carbon dioxide CO2, sulfur dioxide SO2, ammonia NH3, molecular nitrogen N2), replacing the stripped primordial helium-hydrogen atmosphere.',
      },
      {
        title: 'Hydrological Deluge & Crustal Quenching',
        description:
          'The high latent heat of vaporization of water acted as a colossal planetary radiator. Evaporation and condensation carried heat aloft into the upper atmosphere, rapidly cooling the basaltic surface and speeding up crustal consolidation.',
      },
      {
        title: 'Ocean Basin Hydrostatic Isostasy',
        description:
          'Dense basaltic oceanic crust sank deeper into the ductile mantle than lighter granitic cratons, creating deep low-lying ocean basins that naturally collected and stored Earth’s 1.38 billion cubic kilometers of water.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'How did atmospheric changes accelerate the formation of Earth’s crust according to the lecture notes?',
        answer:
          'Precipitation of water from the cooling atmosphere rapidly quenched hot rock surfaces, accelerating the hardening, compression, and mechanical stabilization of the crust while accumulating in low-lying areas to form seas and oceans.',
      },
      {
        question: 'Where did primordial waters accumulate and what was the result?',
        answer:
          'Water accumulated in low-lying tectonic depressions across the Earth’s surface, forming the world\'s first Seas and Oceans.',
      },
    ],
  },
  {
    id: 'habitable',
    num: '06',
    title: 'A Habitable Earth',
    time: '2.5 bya – Present',
    eon: 'Proterozoic to Phanerozoic Eon',
    desc: 'Tectonic plates stabilized modern continents. The weathered crust developed into soil through pedogenesis, creating the life-supporting Lithosphere.',
    thumb: '/images/stage-06-habitable.jpg',
    syllabusRef: 'Part 2: Land as a Resource, Soil Formation & Pedology',
    thermalState: 'Equilibrium Planetary Temperature (~15°C Global Mean)',
    keyLayerDomain: 'Biosphere, Critical Zone & Soil Pedosphere',
    examRelevance: '⭐⭐⭐⭐⭐ High Priority Syllabus Transition — Soil & Land Conservation',
    curriculumSummary:
      'Notes state: "Dynamic movement of tectonic plates led to the formation of continents. Land forms 1/5th (20%) of Earth\'s surface. Soil is the upper weathered crust supporting plant growth." Pedology is the science of soil.',
    curriculumNotes: [
      {
        heading: 'Syllabus Note: Land as a Resource & Soil (Notes Line 57–90)',
        points: [
          'Lecture notes state: "Dynamic movement of tectonic plates → led to the formation of continents as we see today."',
          'Land is a major constituent of the life-supporting Lithosphere, forming 1/5th (20%) of Earth\'s surface.',
          'Covered by: natural forests, wetlands, grasslands, agricultural land, urban and rural settlements.',
          'Soil = the upper weathered crust of earth that supports plant growth.',
          'Among all land resources, soil is of critical importance — provides water and mineral nutrients to terrestrial plants.',
          'Pedology: Study of origin, formation, and geological distribution of soil (Pedion = ground, logos = discourse).',
          'Soil Formation Processes: 1. Weathering (breaking down rock into smaller particles), 2. Pedogenesis (maturation of soil through development of humus). Soil takes several decades or centuries to form.',
        ],
      },
      {
        heading: 'Landform Conservation Relevance (Civil Engineering)',
        points: [
          'Land is a major source of materials essential to humans and other organisms.',
          'Landform conservation protects the land base, soil, and associated biophysical processes from degradation and erosion.',
          'Soil formation is an extremely slow process taking decades or centuries, making soil conservation and anti-erosion measures imperative.',
        ],
      },
    ],
    scientificMechanisms: [
      {
        title: 'Plate Tectonics & Continental Supercycles',
        description:
          'Continental drift driven by mantle convection cycles continents through supercontinent assemblies (Rodinia, Pangaea) and breakups, shaping global weather, ocean currents, and terrestrial habitats.',
      },
      {
        title: 'Weathering & Pedogenesis in the Critical Zone',
        description:
          'Physical weathering (freeze-thaw, thermal exfoliation) and chemical weathering (carbonation, hydration, oxidation) break bedrock into fine regolith. Biotic colonizers and detritus decay drive pedogenesis, forging fertile topsoil horizons.',
      },
      {
        title: 'Biospheric Climate Stabilization',
        description:
          'The Great Oxidation Event (2.4 bya) and plant colonization of land drew down atmospheric CO2, creating an oxygen-rich atmosphere, the ozone layer (O3), and a stable planetary climate supporting biodiversity.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'Define Soil and Pedology according to the Module 1 syllabus notes.',
        answer:
          'Soil is the upper weathered crust of the earth that supports plant growth. Pedology is the scientific study of the origin, formation, and geological distribution of soil (derived from Greek: Pedion = ground, logos = discourse).',
      },
      {
        question: 'What percentage of Earth’s surface is formed by land, and what are the two main processes of soil formation?',
        answer:
          'Land forms 1/5th (20%) of the Earth’s surface. The two fundamental soil formation processes are: (1) Weathering (breaking down rock into smaller particles), and (2) Pedogenesis (maturation of soil through the development of humus).',
      },
    ],
  },
];
