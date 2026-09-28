export interface LayerSyllabusData {
  key: 'crust' | 'mantle' | 'outer' | 'inner';
  name: string;
  subtitle: string;
  thickness: string;
  volumePct: string;
  temp: string;
  state: string;
  composition: string;
  density: string;
  pressure: string;
  syllabusQuote?: string;
  syllabusSection: string;
  icon: string;
  summary: string;
  syllabusPoints: {
    heading: string;
    points: string[];
  }[];
  geodynamicMechanisms: {
    title: string;
    description: string;
  }[];
  vtuExamPoints: {
    question: string;
    answer: string;
  }[];
}

export const EARTH_LAYERS_DATA: Record<'crust' | 'mantle' | 'outer' | 'inner', LayerSyllabusData> = {
  crust: {
    key: 'crust',
    name: 'Crust',
    subtitle: 'Outermost Solid Shell & Lithosphere (< 1% Volume)',
    thickness: '5 – 70 km (Continental: 35–70 km, Oceanic: 5–10 km)',
    volumePct: '< 1% of Earth’s total volume',
    temp: 'Ambient surface to ~400°C at base',
    state: 'Rigid, brittle crystalline solid rock',
    composition: 'Felsic Granite (SIAL) & Mafic Basalt (SIMA)',
    density: '2.7 – 3.0 g/cm³',
    pressure: 'Surface 1 atm to ~10,000 atm at base',
    syllabusSection: 'Part 1: Earth and Formation of Earth’s Crust (Notes Line 25–32 & 52–60)',
    icon: '/images/layer-icon-crust.png',
    summary:
      'According to VTU Module 1 Notes, the Crust is the outermost solid shell of Earth covering the underlying liquid mantle. A very thin layer accounting for less than 1% of Earth’s volume, it forms part of the Lithosphere and is broken into constantly moving tectonic plates that allow internal heat to escape.',
    syllabusPoints: [
      {
        heading: 'Syllabus Note: Crust Structural Characteristics (Notes Line 25–32)',
        points: [
          'The outermost solid shell of Earth covering the underlying liquid mantle.',
          'Very thin layer — accounts for less than 1% of Earth\'s total volume.',
          'Forms an essential constituent of the life-supporting Lithosphere.',
          'The Lithosphere is broken into tectonic plates that move constantly.',
          'Movement of tectonic plates allows heat to escape from Earth\'s interior into outer space.',
          'Two primary divisions: Continental crust (thicker 35–70 km, granitic, rich in Silica-Alumina SIAL) and Oceanic crust (thinner 5–10 km, basaltic, rich in Silica-Magnesia SIMA).',
        ],
      },
      {
        heading: 'Syllabus Note: Formation of Earth’s Crust (Notes Line 52–60)',
        points: [
          '4.6 billion years ago, the hot ball of fire gradually cooled down → surface hardened → land forms created.',
          'Atmospheric changes like precipitation of water accelerated the cooling and crust formation process.',
          'Low-lying areas and tectonic depressions accumulated runoff water → formed Seas and Oceans.',
          'Landforms (tectonic plates) floated on the fluidized mantle layer.',
          'Dynamic movement of tectonic plates led to the formation of continents as we see today.',
        ],
      },
    ],
    geodynamicMechanisms: [
      {
        title: 'Thermal Venting via Plate Boundaries',
        description:
          'Because the crust is rigid and thermally insulating, radiogenic heat from the interior escapes at divergent spreading ridges and volcanic subduction arcs, regulating planetary temperature.',
      },
      {
        title: 'Hydrosphere Quenching & Mineral Reorganization',
        description:
          'When atmospheric steam condensed into torrential rain, water quenched molten surface basalt into hard crystalline crust while washing soluble minerals into marine depressions.',
      },
      {
        title: 'Isostatic Flotation on Ductile Asthenosphere',
        description:
          'Less dense granitic continental rock (2.7 g/cm³) floats buoyantly atop denser mantle peridotite (3.3 g/cm³), maintaining elevated landmasses above sea level for terrestrial life.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'What percentage of Earth’s volume is occupied by the crust, and what is its role in heat dissipation?',
        answer:
          'The Crust accounts for less than 1% of Earth’s total volume. It is broken into tectonic plates whose continuous dynamic movement allows internal heat to escape from the molten interior into outer space.',
      },
      {
        question: 'How did atmospheric precipitation accelerate the formation of Earth’s crust and oceans as per lecture notes?',
        answer:
          'Precipitation of water from the cooling atmosphere rapidly quenched and hardened the hot surface rocks, accelerating crust formation. The accumulated water gathered in low-lying surface depressions to form the first Seas and Oceans.',
      },
    ],
  },
  mantle: {
    key: 'mantle',
    name: 'Mantle',
    subtitle: 'Convective Molten Silicate Interior (~2,900 km Thick)',
    thickness: '~2,900 km depth',
    volumePct: '~84% of Earth’s total volume',
    temp: '~1,000°C (upper asthenosphere) to ~3,700°C (D″ layer)',
    state: 'Ductile / plastic semi-solid molten silicate (fluidized)',
    composition: 'Ultramafic Peridotite (Iron & Magnesium Silicates)',
    density: '3.3 – 5.5 g/cm³',
    pressure: 'Up to ~1.36 million atmospheres (140 GPa)',
    syllabusSection: 'Part 1: Layers of the Earth — Mantle (Notes Line 33–38)',
    icon: '/images/layer-icon-mantle.png',
    summary:
      'Module 1 notes state that the Mantle makes up the majority of Earth’s inner structure, spanning ~2,900 km of molten silicate. Tectonic plates float directly on this fluidized mantle, keeping them in continuous motion.',
    syllabusPoints: [
      {
        heading: 'Syllabus Note: Mantle Structure & Convection (Notes Line 33–38)',
        points: [
          'Makes up the majority of Earth\'s inner structure (occupying ~84% of planetary volume).',
          'Spans approximately 2900 km from the base of the crust down to the outer core.',
          'Contains molten silicate and ductile ultramafic rock.',
          'Tectonic plates float on the fluidized mantle — this keeps them in continuous dynamic motion.',
          'Thermal convection currents in the mantle drag the overlying lithospheric plates, driving continental drift and volcanic activity.',
        ],
      },
    ],
    geodynamicMechanisms: [
      {
        title: 'Thermal Convection Cells (Advective Heat Engine)',
        description:
          'Heat from the core warms deep mantle rock, reducing its density. Buoyant hot mantle plumes rise toward the lithosphere, while cold subducting slabs sink back down, acting as a conveyor belt that drives tectonic drift.',
      },
      {
        title: 'Fluidized Asthenosphere Lubrication',
        description:
          'A semi-molten low-velocity zone (asthesnosphere) beneath the lithosphere exhibits ductile plastic rheology, providing low-friction shear support on which crustal plates slide.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'Describe the thickness, composition, and physical behavior of Earth’s mantle as specified in the BCV755B syllabus.',
        answer:
          'The mantle spans approximately 2,900 km, composed predominantly of molten silicate minerals rich in iron and magnesium. It behaves as a fluidized, ductile medium upon which tectonic plates float and move in continuous motion.',
      },
      {
        question: 'Explain why the fluid nature of the mantle is essential to continental drift.',
        answer:
          'Because the mantle is fluidized and ductile, thermal convection currents can flow through it, exerting viscous drag forces on the base of tectonic plates and causing continents to drift over geological time.',
      },
    ],
  },
  outer: {
    key: 'outer',
    name: 'Outer Core',
    subtitle: 'Swirling Liquid Iron-Nickel Ocean (~2,400 km Thick)',
    thickness: '~2,400 km thick',
    volumePct: '~15% of Earth’s total volume',
    temp: '~4,000°C to 5,000°C',
    state: 'Fluid / liquid molten metal',
    composition: 'Liquid Iron (~85%), Nickel (~10%), Sulfur & Oxygen (~5%)',
    density: '9.9 – 12.2 g/cm³',
    pressure: '1.3 to 3.3 million atmospheres (130–330 GPa)',
    syllabusSection: 'Part 1: Layers of the Earth — Outer Core (Notes Line 39–43)',
    icon: '/images/layer-icon-outer.png',
    summary:
      'Module 1 notes state that the Outer Core is a fluid layer approximately 2,400 km thick, composed mainly of iron and nickel, situated above the inner core and below the mantle. Convection in this metallic fluid generates Earth’s magnetic field.',
    syllabusPoints: [
      {
        heading: 'Syllabus Note: Outer Core Definition (Notes Line 39–43)',
        points: [
          'A fluid layer approximately 2,400 km thick.',
          'Composed mainly of molten iron and nickel.',
          'Located above the inner core and below the mantle (at depths between 2,890 km and 5,150 km).',
          'Liquid state is maintained because the temperature exceeds the melting point of iron-nickel at these pressures.',
          'Rapid convective circulation of electrically conductive liquid metal powers the geodynamo.',
        ],
      },
    ],
    geodynamicMechanisms: [
      {
        title: 'Geodynamo Self-Exciting Induction',
        description:
          'Coriolis forces from Earth’s rotation twist rising convective columns of molten iron into helical spirals, inducing electric currents that create Earth’s dipolar geomagnetic shield.',
      },
      {
        title: 'Atmospheric Radiation Shielding',
        description:
          'The magnetosphere generated by the liquid outer core deflects high-energy solar wind and cosmic rays, preventing atmospheric stripping and preserving water and life on Earth.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'What is the thickness and composition of the Outer Core according to lecture notes?',
        answer:
          'The Outer Core is a fluid layer approximately 2,400 km thick, composed mainly of liquid iron and nickel.',
      },
      {
        question: 'Why is the liquid state of the outer core critical to terrestrial habitability?',
        answer:
          'The convection of molten conductive iron-nickel in the outer core generates Earth’s planetary magnetic field (magnetosphere), which shields the atmosphere from being stripped away by the solar wind.',
      },
    ],
  },
  inner: {
    key: 'inner',
    name: 'Inner Core',
    subtitle: 'Incandescent Solid Iron Sphere (~1,220 km Radius)',
    thickness: '~1,220 km radius sphere (~2,440 km diameter)',
    volumePct: '< 1% of Earth’s volume (~1.7% of planetary mass)',
    temp: 'Estimated around 5,000°C (comparable to the Sun’s surface)',
    state: 'Solid crystalline metallic alloy',
    composition: 'Solid Iron-Nickel alloy (exact composition not directly sampled)',
    density: '12.8 – 13.1 g/cm³',
    pressure: '~3.6 million atmospheres (360 GPa)',
    syllabusSection: 'Part 1: Layers of the Earth — Inner Core (Notes Line 44–49)',
    icon: '/images/layer-icon-inner.png',
    summary:
      'Module 1 notes state that the Inner Core is the innermost part of Earth, a solid core with radius ~1,220 km. Exact composition is not known as direct sampling is impossible; temperature is estimated around 5,000°C, kept solid by colossal pressure.',
    syllabusPoints: [
      {
        heading: 'Syllabus Note: Inner Core Characteristics (Notes Line 44–49)',
        points: [
          'The innermost part of the Earth.',
          'A solid core with a radius of approximately 1220 km.',
          'Exact composition is not known (no direct sample available due to extreme depth).',
          'Temperature is estimated around 5000°C.',
          'Remains solid despite solar-surface temperatures because colossal overburden pressure (~3.6 million atm) compresses atoms into a tight crystalline lattice.',
        ],
      },
    ],
    geodynamicMechanisms: [
      {
        title: 'Pressure Freezing (Clapeyron Thermodynamic Boundary)',
        description:
          'At central pressures exceeding 360 GPa, the melting point of iron-nickel rises above 6,000 K, forcing the metallic alloy to crystallize into a hexagonal close-packed (hcp) solid crystal lattice.',
      },
      {
        title: 'Latent Heat of Solidification',
        description:
          'As Earth gradually cools over billions of years, the inner core slowly crystallizes and grows outward (~1 mm/year), releasing latent heat that sustains convection in the outer core.',
      },
    ],
    vtuExamPoints: [
      {
        question: 'State the radius, estimated temperature, and physical state of the Inner Core as per syllabus notes.',
        answer:
          'The Inner Core has a radius of approximately 1,220 km, an estimated temperature around 5,000°C, and exists in a solid metallic state.',
      },
      {
        question: 'Why is the Inner Core solid while the Outer Core is liquid, even though the inner core is hotter?',
        answer:
          'Because the colossal overburden pressure at Earth’s center (~3.6 million atmospheres) forces iron-nickel atoms into a solid crystal lattice, raising the melting point well above the ambient 5,000°C temperature.',
      },
    ],
  },
};
