# Asset Production Document
## "Conservation of Natural Resources" — Interactive Learning Application
### Course BCV755B · HKBK College of Engineering

**Document version:** 1.0
**Scope:** Complete, page-by-page inventory of every **image, video, GIF, animation, 3D scene, and icon** needed, each with a **description/prompt** for sourcing or generating it.
**Companion docs:** `TRD_APPLICATION.md`, `PRD_LANDING_PAGE.md`, `PRD_MODULE_1_LAND.md` … `PRD_MODULE_5_GLOBAL_WARMING_EIA.md`.
**Owner:** klp
**Status:** Production checklist

---

## How to use this document

Each asset row has:
- **ID** — unique reference (e.g. `M1-CH02-3D`) to use in code/filenames.
- **Type** — `3D` (procedural Three.js scene) · `ANIM` (coded CSS/JS/framer-motion) · `IMG` (photo/illustration) · `VIDEO` (looping mp4) · `GIF` (short loop) · `ICON` (SVG) · `DATAVIZ` (chart/graph).
- **Description / Prompt** — what it shows; for `IMG`/`VIDEO` a **search or generation prompt**; for `3D`/`ANIM` a build brief.
- **Notes** — dimensions, loop, licensing, fallback.

### Global asset rules
- **Format:** images → WebP/AVIF (JPG fallback); video → mp4 (H.264) + poster; short loops → mp4 preferred over GIF (smaller); icons → inline SVG.
- **Licensing:** only **CC0 / royalty-free** — Unsplash, Pexels, Pixabay, Wikimedia Commons. Log each source in `public/images/CREDITS.md`.
- **Color grade:** unify all photos to the dark theme — slightly desaturated, warmed shadows, consistent contrast. No bright stock-photo look.
- **3D:** procedural (no downloaded models in v1). Every 3D/animation must have a **static image fallback** (`*-fallback.webp`) for reduced-motion / low-power / WebGL-off.
- **No emoji** as UI icons (emojis in notes are content cues only).
- **Naming:** `moduleN/chNN-slug.ext` (e.g. `module1/ch02-earth-cutaway-fallback.webp`).

---

# PAGE 0 — LANDING PAGE
*(ref: `PRD_LANDING_PAGE.md`)*

| ID | Type | Description / Prompt | Notes |
|---|---|---|---|
| `LP-PRELOAD` | ANIM | Preloader: black screen, thin large `0→100` numeral + small `%`, course line `CONSERVATION OF NATURAL RESOURCES · BCV755B`; counter flies into header. | Coded; reduced-motion → instant. |
| `LP-HERO-3D` | 3D | Full-viewport **resource portal**: rim-lit rotating Earth that cross-fades between 5 "worlds"; starfield behind. | Procedural R3F. Fallback: `lp-hero-fallback.webp`. |
| `LP-WORLD-BG-1..5` | VIDEO/3D | Per-world ambient background (Land, Water, Air, Biodiversity, Global Warming) shown behind the portal title. | Loop 8–15s, muted, ≤1080p, object-cover, dark gradient scrim. |
| `LP-WORLD-BG-1` | VIDEO | **Prompt:** "slow aerial drone over golden savanna grassland at dusk, warm light, cinematic, muted." | Land. |
| `LP-WORLD-BG-2` | VIDEO | **Prompt:** "underwater sunlight caustics in deep blue ocean, slow, serene, cinematic." | Water. |
| `LP-WORLD-BG-3` | VIDEO | **Prompt:** "clouds and thin atmosphere over Earth's curve from high altitude, pale blue, drifting." | Air. |
| `LP-WORLD-BG-4` | VIDEO | **Prompt:** "lush rainforest canopy with dappled light and drifting particles, rich greens." | Biodiversity. |
| `LP-WORLD-BG-5` | VIDEO | **Prompt:** "sun flaring over a warming hazy horizon / heat shimmer, orange-red tones, cinematic." | Global Warming. |
| `LP-NAV-ICONS` | ICON | Globe (brand), menu, arrow-right, arrow-up-right, social (optional). | lucide/inline SVG. |
| `LP-MISSION-ANIM` | ANIM | Per-character opacity 0.2→1 scroll reveal of the mission paragraph. | `ScrollRevealText`. |
| `LP-STAT-COUNT` | DATAVIZ | Animated count-ups row: 4.6 Billion yrs · 71% water · 97.5% saltwater · 8.7M species. | On-view count-up. |
| `LP-MODULE-CARD-1..5` | IMG | 5 module cards' hero imagery (one per module, matching each world above). | 16:9, dark-graded, hover video optional. |
| `LP-CURSOR` | ANIM | Custom cursor: dot + orbit ring, scales on hover. | Disabled on touch. |
| `LP-GRAIN` | ANIM | SVG fractal-noise grain overlay, 4–6% opacity. | Global. |

---

# PAGE 1 — MODULE 1: LAND
*(ref: `PRD_MODULE_1_LAND.md` · accent gold `#C9A15A`)*

| ID | Type | Description / Prompt | Notes |
|---|---|---|---|
| `M1-INTRO-3D` | 3D | Slow-rotating rim-lit Earth, gold light, starfield. | Fallback img. |
| `M1-CH01-ANIM` | ANIM/3D | **Formation timeline:** fiery proto-Earth cooling to solid crust; scrubbable 4.6 Bya→today timeline; gas→rock particle morph. | Scroll-scrubbed. |
| `M1-CH02-3D` ★ | 3D | **Interactive cutaway Earth:** rotate + slice to reveal Crust / Mantle (2900 km) / Outer Core (2400 km) / Inner Core (1220 km, 5000°C); glowing molten core; per-layer fact cards. | Centerpiece. Fallback: labeled cross-section img. |
| `M1-CH03-ANIM` | ANIM | **Continental drift:** Pangaea → present continents; water fills low basins. | Scroll-scrubbed + play toggle. |
| `M1-CH04-DATAVIZ` | DATAVIZ | 20%-of-surface donut/globe-fill; land-cover split bar (forests/wetlands/grassland/agri/settlements). | Count-up to 20%. |
| `M1-CH05-ANIM` | ANIM/3D | **Soil-profile cross-section** building horizon-by-horizon (bedrock→subsoil→topsoil→humus); weathering & pedogenesis arrows. | Scroll builds layers. |
| `M1-CH06-IMG-GRASS` | IMG | **Prompt:** "wide golden grassland/savanna, big sky, warm light." | Land-form card. |
| `M1-CH06-IMG-WETLAND` | IMG | **Prompt:** "misty freshwater wetland with reeds and still water, soft light." | + subtle water ripple ANIM. |
| `M1-CH06-IMG-FOREST` | IMG | **Prompt:** "dense temperate forest, tall trees, dappled sunlight." | |
| `M1-CH06-IMG-AGRI` | IMG | **Prompt:** "patchwork of cultivated farmland fields from above." | |
| `M1-CH06-IMG-TUNDRA` | IMG | **Prompt:** "arctic tundra, low vegetation, cold pale light, distant mountains." | |
| `M1-CH06-IMG-DESERT` | IMG | **Prompt:** "sand dunes desert, rippled sand, warm shadows." | + heat-haze ANIM. |
| `M1-CH06-IMG-URBAN` | IMG | **Prompt:** "dense urban cityscape aerial, dusk." | |
| `M1-CH07-IMG` | IMG | Quiet landscape for the conservation pull-quote spread. | Editorial. |
| `M1-CH08-ANIM` ★ | ANIM | **Deforestation before/after slider** (drag to clear forest); agents-vs-causes node diagram; afforestation/reforestation contrast. | Draggable reveal + tree counter. |
| `M1-CH08-IMG-BEFORE/AFTER` | IMG | **Prompt:** "same forest hillside: lush green vs cleared/logged" (pair). | For the slider. |
| `M1-CH09-ANIM` | ANIM | Land-use change map/toggle (natural→developed→agri); **Shire River, Malawi** case-study card + locator. | |
| `M1-CH10-DATAVIZ` | DATAVIZ | Soil composition pie (mineral/organic/water/air); soil-health indicators checklist. | |
| `M1-CH11-ANIM` | ANIM | **6-cause degradation grid** (erosion/fertility/landslide/sealing/contamination/salination) each animating its mechanism; food-security India/SSA tabs. | Erosion particle FX. |
| `M1-CH12-ANIM` ★ | 3D/ANIM | **Interactive farm hillside:** toggle 8 strategies (terraces appear, shelter belts grow, cover crop spreads…); "soil saved" meter. | Fallback: 8 illustrated cards. |
| `M1-CH13-ANIM` | ANIM | Timeline of the land-use concept; planning types; closing landscape vista. | Parallax vista. |
| `M1-ICONS` | ICON | Layer, soil, tree, terrace, erosion, water-drop, factory, etc. | SVG. |

---

# PAGE 2 — MODULE 2: WATER
*(ref: `PRD_MODULE_2_WATER.md` · accent cyan-blue `#4FA3C7`)*

| ID | Type | Description / Prompt | Notes |
|---|---|---|---|
| `M2-INTRO-3D` | 3D | Water surface caustics / underwater light shaft; single droplet. | Fallback img. |
| `M2-CH01-ANIM` ★ | ANIM/3D | **Hydrological cycle:** evaporation→clouds→rain→runoff→infiltration→sea; particle flow; interactive hotspots. | Scroll-scrubbed. |
| `M2-CH02-ANIM` | ANIM | **4-source cutaway landscape** (rain/surface/ground/reclamation) with expandable sub-methods. | Click to expand. |
| `M2-CH03-3D` ★ | 3D/DATAVIZ | **Shrinking water-globe:** 100% → 2.5% → ~1% accessible sliver; freshwater breakdown donut/treemap (ice 79 / ground 20 / surface 1). | Count-downs 97.5→2.5→1. |
| `M2-CH04-MAP` ★ | DATAVIZ | **Interactive India map** — 6 river basins clickable (Indus, Ganga-Brahmaputra-Meghna, Rajasthan/Gujarat, E-flowing, W-flowing, Western coast); animated flow lines. | Reusable `IndiaMap`. |
| `M2-CH05-DATAVIZ` | DATAVIZ | Water-use sector split (agri/industrial/domestic/recreational); allocation-framework flow. | Bars/donut. |
| `M2-CH06-ANIM` | ANIM | Conservation strategy cards; "drop saved" meter; per-char reveal of key definition. | |
| `M2-CH07-MAP` | DATAVIZ | **IBWT** transfer diagram — surplus→deficit basin flow over map; example callouts. | Reuse map. |
| `M2-CH08-MAP` ★ | DATAVIZ | **River interlinking:** toggle Himalayan (14 links) vs Peninsular (16 links); animated link network; merits/demerits split. | Reuse map. |
| `M2-CH09-3D` | 3D/ANIM | **Aquifer cross-section** — strata + water-table line; labeled terms. | Reusable aquifer scene. |
| `M2-CH10-MAP` | DATAVIZ | India groundwater regions (hard-rock / alluvial / mountainous / coastal) + stats. | Reuse map. |
| `M2-CH11-ANIM` | ANIM | Conjunctive-use split diagram + optimization slider. | |
| `M2-CH12-ANIM` | ANIM | Groundwater management principles checklist. | |
| `M2-CH13-ANIM` ★ | ANIM/MAP | **Falling water-table** animation + India map of most-affected states; traditional harvesting gallery. | Level drops on scroll. |
| `M2-CH14-ANIM` | ANIM | Contaminant seepage into aquifer; geogenic vs anthropogenic toggle; source icons. | |
| `M2-CH15-ANIM` ★ | 3D/ANIM | **Recharge diagram** — natural vs artificial; techniques (percolation tanks, check dams, recharge wells) refill the aquifer (level rises). | Optimistic counter-beat. |
| `M2-CH16-ANIM` | 3D/ANIM | **Coastal salt-wedge** — fresh/salt interface advancing/retreating with a pumping slider; coastal-states map. | |
| `M2-IMG-*` | IMG | River, reservoir/dam, desalination plant, well/borewell, percolation tank/check dam, coastal scene. | Cool-blue grade. |
| `M2-ICONS` | ICON | Droplet, cloud-rain, well, dam, wave, aquifer, salt. | SVG. |

---

# PAGE 3 — MODULE 3: AIR
*(ref: `PRD_MODULE_3_AIR.md` · accent sky-grey-blue `#9FB8C4`)*

| ID | Type | Description / Prompt | Notes |
|---|---|---|---|
| `M3-INTRO-3D` | 3D | Atmospheric gradient + drifting particle field; thin glowing atmosphere arc over dark Earth curve. | Reusable `ParticleField`. |
| `M3-CH01-DATAVIZ` ★ | DATAVIZ | **Air composition** donut/bubble (N₂ 78.084 / O₂ 20.946 / Ar 0.934 / trace) + vertical atmosphere-layers diagram (troposphere highlighted ~12 km). | Count-ups; hover for formula. |
| `M3-CH02-ANIM` | ANIM | Clean-air ↔ polluted-air toggle; aerosol forms (gas/solid/liquid) illustrated; natural-examples chips. | Particle density. |
| `M3-CH03-ANIM` ★ | ANIM | **Classification matrix:** tabs for 4 schemes (origin/state/source/location); pollutant tokens regroup; primary→secondary reaction arrow. | Tokens fly/regroup. |
| `M3-CH04-DATAVIZ` | DATAVIZ | NAAQS standards table (pollutant · averaging period · limit) as glass rows; objectives panel. | |
| `M3-CH05-ANIM` ★ | ANIM/DATAVIZ | **AQI gauge/dial** slider 0–500 sweeping green→maroon; updates category + health advice + page haze; worked example. | Reusable `Gauge`. |
| `M3-CH06-ANIM` ★ | ANIM | **Interactive human-body diagram** — click a pollutant to highlight affected organs; SPM deep-dive panel. | SVG body + hotspots. |
| `M3-CH07-IMG` | IMG | Materials-damage before/after tiles (building stone, paint, textile, rubber, leather, paper, glass, electronics, vegetation). | **Prompt:** "corroded/eroded building facade vs clean" etc. |
| `M3-CH08-3D` ★ | 3D/ANIM | **Equipment cutaways** animating how each works: ESP (charged plates), cyclone (spin), fabric filter (baghouse), scrubber (spray), incineration, carbon capture. | Select device → mechanism animates. |
| `M3-CH09-ANIM` | ANIM | Smoke plume that thins as control methods toggle on. | |
| `M3-CH10-3D` ★ | 3D/ANIM | **Stratospheric ozone scene:** ozone layer with growing hole; CFC→Cl→O₃ destruction cycle; UV-to-surface meter; Montreal Protocol (1987) timeline + recovery curve. | Hole grows/shrinks with timeline. |
| `M3-CH11-ANIM` | ANIM | Photochemical smog: sunlight + NOₓ + VOCs → smog over skyline; key reactions step-by-step. | Sun-angle driven. |
| `M3-IMG-*` | IMG | City smog, factory stacks, ESP/scrubber equipment, hazy skyline. | **Prompt:** "industrial smokestacks emitting smoke, hazy polluted city skyline." |
| `M3-ICONS` | ICON | Gas molecule, particle, lung, factory, filter, ozone, sun. | SVG. |

---

# PAGE 4 — MODULE 4: BIODIVERSITY & ECOSYSTEM
*(ref: `PRD_MODULE_4_BIODIVERSITY.md` · accent green `#6FA96B`)*

| ID | Type | Description / Prompt | Notes |
|---|---|---|---|
| `M4-INTRO-3D` | 3D/ANIM | Animated **tree-of-life / branching organism** or living canopy; drifting spores/fireflies. | Generative branches. |
| `M4-CH01-ANIM` | ANIM | Flora + fauna + microorganism triad combining into "biodiversity". | Per-char reveal. |
| `M4-CH02-3D` ★ | 3D/ANIM | **Scale zoom:** DNA helix → single species → whole ecosystem; + species-count **treemap** (terrestrial 8.7M, oceanic 2.2M, insects 10–30M, bacteria 5–10M, fungi 1.5–3M, vascular plants 220k…). | Continuous scroll-zoom + count-ups. |
| `M4-CH03-ANIM` ★ | ANIM | **6-value wheel/hexagon** (consumptive/productive/social/ethical/aesthetic/option); expands examples; drugs-from-plants table. | Click segment to expand. |
| `M4-CH04-ANIM` ★ | ANIM/3D | **Habitat degradation scene:** thriving habitat degrades per threat (habitat loss/overpopulation/pollution/climate/exotic species/overuse); solutions toggle restores; species meter drops. | Toggle-driven. |
| `M4-CH05-ANIM` ★ | ANIM | **In-situ vs ex-situ split scene** (wild habitat vs facility/lab) slider; conservation-method gallery (parks, sanctuaries, zoos, gene banks, pollen culture, ecological restoration, social forestry). | |
| `M4-CH06-ANIM` | ANIM | Ecosystem components diagram: biotic (producers/consumers/decomposers) vs abiotic; energy/nutrient arrows. | Category toggle. |
| `M4-CH07-EXPLORER` ★ | 3D/IMG | **Biome explorer:** forest/desert/grassland/aquatic/estuarine/wetland scenes; aquatic includes **lake-zones cross-section** (littoral/limnetic/profundal). | Signature motion per biome. |
| `M4-CH07-IMG-FOREST` | IMG | **Prompt:** "layered forest ecosystem, canopy to floor." | |
| `M4-CH07-IMG-DESERT` | IMG | **Prompt:** "desert ecosystem with sparse hardy plants." | |
| `M4-CH07-IMG-GRASSLAND` | IMG | **Prompt:** "open grassland with grazing herbivores." | |
| `M4-CH07-IMG-AQUATIC` | IMG | **Prompt:** "freshwater lake and vibrant coral reef ocean scene." | |
| `M4-CH07-IMG-ESTUARY` | IMG | **Prompt:** "river-meets-sea estuary, mangroves, brackish water." | |
| `M4-CH07-IMG-WETLAND` | IMG | **Prompt:** "biodiverse wetland marsh with birds." | |
| `M4-CH08-ANIM` | ANIM | **Biogeochemical cycle** loops (carbon / nitrogen / water) with biodiversity's role; toggle between cycles. | Animated loops. |
| `M4-CH09-IMG/DATAVIZ` | IMG/DATAVIZ | Medicinal plant → drug pairing gallery; fisheries stats panel. | Plant→drug flip cards. |
| `M4-ICONS` | ICON | DNA, leaf, paw, fish, tree, globe, recycle. | SVG. |

---

# PAGE 5 — MODULE 5: GLOBAL WARMING & EIA
*(ref: `PRD_MODULE_5_GLOBAL_WARMING_EIA.md` · accent orange-red `#D8703F`)*

## Act 1 — Global Warming & Climate Change
| ID | Type | Description / Prompt | Notes |
|---|---|---|---|
| `M5-INTRO-3D` | 3D | Earth + Sun with heat glow / shimmer; ray pulses. | Reuse `Earth`. |
| `M5-CH01-3D` ★ | 3D/ANIM | **Greenhouse-effect simulator:** sunlight arrows (30% reflected / 70% absorbed), re-radiated IR; **GHG slider** traps more heat; temperature gauge −18°C→+15°C→warming; background warms. | Centerpiece Act 1. |
| `M5-CH02-DATAVIZ` ★ | DATAVIZ | **10-indicator dashboard** tiles (air temp↑, humidity↑, glaciers↓, snow↓, land temp↑, SST↑, sea ice↓, sea level↑, ocean heat↑, ocean temp↑) each a mini trend. | Red-up / blue-down. |
| `M5-CH03-ANIM` | ANIM | Causes panel: CO₂ / CH₄ / N₂O / deforestation with sources + stacked contribution bar. | Gas molecules drift. |
| `M5-CH04-ANIM/IMG` | ANIM/IMG | Effects scene / consequence map; before/after tiles. **Prompt:** "melting glacier, flooded coastline, drought-cracked earth." | |
| `M5-CH05-ANIM` | ANIM | Warming (temperature) vs climate change (long-term patterns) comparison. | Per-char reveal. |
| `M5-CH06-3D` ★ | 3D/MAP | **Climate-indicator globe:** select indicator (polar/glacial ice retreat, ocean acidity, wind, precipitation, storms, biomes) → globe visualizes it. | Reuse `Earth`/globe. |
| `M5-CH07-ANIM` | ANIM | Climate→health flow diagram (heat stress, disease, air quality). | Arrows draw in. |

## Act 2 — EIA *(palette cools to slate/blue)*
| ID | Type | Description / Prompt | Notes |
|---|---|---|---|
| `M5-CH08-ANIM` | ANIM | EIA definition spread; tone shift from heat → calm/blueprint. | Per-char reveal. |
| `M5-CH09-ANIM` | ANIM | 3 core values triad (Integrity / Utility / Sustainability) — glass pillars. | Rise in sequence. |
| `M5-CH10-DATAVIZ` | DATAVIZ | EIA history timeline (origin → global spread → India) + benefits list. | Reusable `Timeline`. |
| `M5-CH11-ANIM` ★ | ANIM | **9-phase EIA process flow** (Screening→Scoping→Baseline→Impact analysis→Alternatives/EIA report→Public hearing→EMP→Decision→Monitoring); progress rail; click phase to expand. | Centerpiece Act 2. |
| `M5-CH12-ANIM` | ANIM | Blueprint-style animated flowchart with decision branches. | |
| `M5-CH13-ANIM` ★ | ANIM | **EIA report explorer** — tabs for components A–H (Air/Noise/Water/Biological/Land/Socio-economic & Health/Risk/EMP); comprehensive-vs-rapid toggle; **cross-links to Modules 1–4**. | Ties site together. |
| `M5-CH14-ANIM` | ANIM | Benefits vs flaws split panel (green vs slate). | |
| `M5-SUMMARY` | ANIM | "Course complete" moment showing all 5 module worlds; recap cards. | |
| `M5-IMG-*` | IMG | Glaciers melting, rising seas, storms, drought, emissions; EIA/blueprint/public-hearing/monitoring imagery. | Act1 warm grade; Act2 cool grade. |
| `M5-ICONS` | ICON | Sun, CO₂, thermometer, glacier, storm, document, checklist, gavel. | SVG. |

---

## Cross-page shared assets (build once, reuse)
| ID | Type | Used by |
|---|---|---|
| `SHARED-CURSOR` | ANIM | All pages (module variants: ripple/heat-haze/leaf). |
| `SHARED-GRAIN` | ANIM | All pages. |
| `SHARED-EARTH` | 3D | Landing hero, M1 cutaway, M5 globe. |
| `SHARED-PARTICLES` | 3D | M3 pollutants, M2 droplets, M4 spores. |
| `SHARED-INDIAMAP` | DATAVIZ | M2 (rivers/interlinking/groundwater/states/coasts). |
| `SHARED-GAUGE` | DATAVIZ | M3 AQI, M5 temperature. |
| `SHARED-TIMELINE` | DATAVIZ | M1 formation, M3 Montreal Protocol, M5 EIA history. |
| `SHARED-REVEALTEXT` / `SHARED-COUNTUP` | ANIM | All modules. |

---

## Asset counts (planning estimate)
| Page | 3D scenes | Coded animations | Photos/Videos | Data-viz |
|---|---|---|---|---|
| Landing | 1 (+5 world bg) | ~4 | ~10 | 1 |
| Module 1 | 2–3 | ~8 | ~10 | 2 |
| Module 2 | 2–3 | ~9 | ~8 | 4 (+map ×5) |
| Module 3 | 3 | ~6 | ~8 | 3 |
| Module 4 | 3 | ~7 | ~8 | 2 |
| Module 5 | 3 | ~9 | ~8 | 3 |

---

## Production checklist per asset
- [ ] Sourced/generated · [ ] Dark-theme color-graded · [ ] Optimized (WebP/AVIF/mp4) · [ ] Responsive sizes · [ ] Fallback image created (for 3D/ANIM) · [ ] `alt`/aria text written · [ ] License logged in `CREDITS.md` · [ ] Filed under correct `moduleN/` path.

---

*End of Asset Production Document v1.0*
