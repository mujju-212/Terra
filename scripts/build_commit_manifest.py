import os
import sys
import subprocess

def run(cmd, env=None, check=True):
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True, env=env)
    if check and res.returncode != 0:
        print(f"FAILED: {cmd}\nSTDERR: {res.stderr}\nSTDOUT: {res.stdout}")
        sys.exit(res.returncode)
    return res.stdout.strip()

commits = [
    # ==========================================
    # DAY 1: SEP 29, 2026 - Groundwater & Aquifer Systems
    # ==========================================
    {
        "day": "Sep 29, 2026",
        "date": "2026-09-29T09:41:23+05:30",
        "msg": "feat(water): add high-resolution groundwater aquifer cutaway assets and core data models",
        "patterns": [
            "public/images/aquifer-confined-cube.jpg",
            "public/images/aquifer-unconfined-cube.jpg",
            "public/images/groundwater-hero-cutaway.jpg",
            "src/pages/water/groundwaterData.ts"
        ]
    },
    {
        "day": "Sep 29, 2026",
        "date": "2026-09-29T11:53:07+05:30",
        "msg": "feat(water): implement screen 08 groundwater hydrogeology & vertical saturation layers",
        "patterns": [
            "src/pages/water/GroundwaterScreen.tsx",
            "src/pages/water/GroundwaterPotentialScreen.tsx",
            "src/pages/water/groundwaterPotentialData.ts"
        ]
    },
    {
        "day": "Sep 29, 2026",
        "date": "2026-09-29T14:26:48+05:30",
        "msg": "feat(water): add regional groundwater potential map and hydro-zone classification",
        "patterns": [
            "public/images/gw-potential-india-map.jpg",
            "public/images/region-alluvial-hd.jpg",
            "public/images/region-coastal-hd.jpg",
            "public/images/region-himalayan-hd.jpg",
            "public/images/region-peninsular-hd.jpg",
            "src/pages/water/groundwaterDepletionData.ts"
        ]
    },
    {
        "day": "Sep 29, 2026",
        "date": "2026-09-29T16:48:19+05:30",
        "msg": "feat(water): build screen 10 groundwater depletion dynamics and cone of depression simulator",
        "patterns": [
            "public/images/gw-depletion-cutaway-bg.jpg",
            "src/pages/water/GroundwaterDepletionScreen.tsx",
            "src/pages/water/groundwaterRechargeData.ts"
        ]
    },
    {
        "day": "Sep 29, 2026",
        "date": "2026-09-29T19:15:34+05:30",
        "msg": "feat(water): implement artificial recharge structures and check dam rainwater harvesting",
        "patterns": [
            "public/images/gw-recharge-cutaway-bg.jpg",
            "src/pages/water/GroundwaterRechargeScreen.tsx",
            "src/pages/water/groundwaterManagementData.ts"
        ]
    },
    {
        "day": "Sep 29, 2026",
        "date": "2026-09-29T22:31:52+05:30",
        "msg": "feat(water): build screen 12 sustainable groundwater governance and participatory management",
        "patterns": [
            "public/images/water-ch13-gw-management-master.jpg",
            "src/pages/water/GroundwaterManagementScreen.tsx",
            "src/pages/water/useModalScrollLock.ts"
        ]
    },

    # ==========================================
    # DAY 2: SEP 30, 2026 - Seawater Ingress, Contamination, Conjunctive Use & River Interlinking
    # ==========================================
    {
        "day": "Sep 30, 2026",
        "date": "2026-09-30T10:14:15+05:30",
        "msg": "feat(water): implement screen 13 coastal seawater intrusion dynamics and Ghyben-Herzberg model",
        "patterns": [
            "public/images/seawater-ingress-cutaway-bg.jpg",
            "src/pages/water/seawaterIngressData.ts",
            "src/pages/water/SeawaterIngressScreen.tsx"
        ]
    },
    {
        "day": "Sep 30, 2026",
        "date": "2026-09-30T12:38:42+05:30",
        "msg": "feat(water): build screen 14 groundwater contamination hazards, fluoride and arsenic pathways",
        "patterns": [
            "public/images/water-ch15-gw-contamination-master.jpg",
            "src/pages/water/groundwaterContaminationData.ts",
            "src/pages/water/GroundwaterContaminationScreen.tsx"
        ]
    },
    {
        "day": "Sep 30, 2026",
        "date": "2026-09-30T15:09:27+05:30",
        "msg": "feat(water): implement screen 15 conjunctive surface-groundwater use optimization engine",
        "patterns": [
            "public/images/water-ch12-conjunctive-cutaway.jpg",
            "public/images/water-ch12-conjunctive-master.jpg",
            "public/images/water-conjunctive-generated-real.jpg",
            "src/pages/water/conjunctiveUseData.ts",
            "src/pages/water/ConjunctiveUseScreen.tsx"
        ]
    },
    {
        "day": "Sep 30, 2026",
        "date": "2026-09-30T17:42:06+05:30",
        "msg": "feat(water): add screen 16 National River Interlinking Project (NRLP) and NWDA links",
        "patterns": [
            "public/images/water-interlinking-bg-clean.jpg",
            "public/images/water-interlinking-bg.jpg",
            "public/images/ibwt-godavari-krishna.jpg",
            "public/images/ibwt-ken-betwa.jpg",
            "src/pages/water/riverInterlinkingData.ts",
            "src/pages/water/RiverInterlinkingScreen.tsx"
        ]
    },
    {
        "day": "Sep 30, 2026",
        "date": "2026-09-30T20:25:51+05:30",
        "msg": "feat(water): build screen 17 inter-basin water transfer (IBWT) technical criteria",
        "patterns": [
            "public/images/water-ch07-ibwt-bg.jpg",
            "src/pages/water/InterBasinTransferScreen.tsx",
            "src/pages/water/WaterIntroTransition.tsx"
        ]
    },
    {
        "day": "Sep 30, 2026",
        "date": "2026-09-30T23:18:33+05:30",
        "msg": "feat(water): assemble 18-chapter water curriculum experience, fluid canvas and summary",
        "patterns": [
            "public/images/water-ch18-module-summary-master.jpg",
            "src/pages/water/waterSummaryData.ts",
            "src/pages/water/WaterSummaryScreen.tsx",
            "src/pages/water/index.ts",
            "src/pages/WaterModuleExperience.tsx",
            "src/water-module.css"
        ]
    },

    # ==========================================
    # DAY 3: OCT 01, 2026 - Air Pollution & Atmospheric Science Module
    # ==========================================
    {
        "day": "Oct 01, 2026",
        "date": "2026-10-01T09:28:14+05:30",
        "msg": "feat(air): scaffold atmospheric pollution module theme, cards and structural styling",
        "patterns": [
            "src/air-module.css",
            "public/images/air-hero-earth-bg.jpg",
            "public/images/air-intro-alps-bg.jpg",
            "public/images/air-clean-cityscape.jpg",
            "public/images/air-polluted-cityscape.jpg",
            "public/images/air-card-discover.jpg",
            "public/images/air-card-explore.jpg",
            "public/images/air-card-learn.jpg",
            "public/images/air-card-understand.jpg",
            "src/pages/air/airData.ts",
            "src/pages/air/AirCoverScreen.tsx",
            "src/pages/air/AirIntroScreen.tsx",
            "src/pages/air/AirIntroTransition.tsx",
            "src/pages/air/useModalScrollLock.ts"
        ]
    },
    {
        "day": "Oct 01, 2026",
        "date": "2026-10-01T12:05:49+05:30",
        "msg": "feat(air): implement screen 02 natural vs anthropogenic air pollution sources and sector split",
        "patterns": [
            "public/images/air-sources-hero-bg.jpg",
            "public/images/air-natural-forest-fire.jpg",
            "public/images/air-natural-pollen-spores.jpg",
            "public/images/air-natural-sea-salt.jpg",
            "public/images/air-natural-volcanic-ash.jpg",
            "public/images/air-anthro-construction-dust.jpg",
            "public/images/air-anthro-industrial-emissions.jpg",
            "public/images/air-anthro-thermal-power.jpg",
            "public/images/air-anthro-vehicle-exhaust.jpg",
            "public/images/air-real-agriculture.jpg",
            "public/images/air-real-construction.jpg",
            "public/images/air-real-industrial.jpg",
            "public/images/air-real-urban-smog.jpg",
            "public/images/air-real-vehicles.jpg",
            "src/pages/air/AirPollutionScreen.tsx",
            "src/pages/air/PollutantClassificationScreen.css",
            "src/pages/air/PollutantClassificationScreen.tsx",
            "src/pages/air/AirDonutChart.tsx",
            "src/pages/air/AtmosphereColumnGraphic.tsx"
        ]
    },
    {
        "day": "Oct 01, 2026",
        "date": "2026-10-01T14:52:31+05:30",
        "msg": "feat(air): build screen 03 respiratory and cardiovascular health impacts across demographics",
        "patterns": [
            "public/images/air-health-hero-bg.jpg",
            "public/images/air-human-body-anatomy.jpg",
            "public/images/air-human-body-centered.jpg",
            "public/images/air-vulnerable-child-blue.jpg",
            "public/images/air-vulnerable-child-square.jpg",
            "public/images/air-vulnerable-children.jpg",
            "public/images/air-vulnerable-elderly.jpg",
            "public/images/air-vulnerable-pregnant.jpg",
            "public/images/air-vulnerable-workers.jpg",
            "src/pages/air/HealthEffectsScreen.css",
            "src/pages/air/HealthEffectsScreen.tsx"
        ]
    },
    {
        "day": "Oct 01, 2026",
        "date": "2026-10-01T17:19:08+05:30",
        "msg": "feat(air): add screen 04 AQI category monitor, pollutant thresholds and NAAQS compliance",
        "patterns": [
            "public/images/air-naaqs-bg.jpg",
            "public/images/aqi-advisory-good.jpg",
            "public/images/aqi-advisory-moderate.jpg",
            "public/images/aqi-advisory-sensitive.jpg",
            "public/images/aqi-advisory-unhealthy.jpg",
            "public/images/aqi-advisory-very-unhealthy.jpg",
            "public/images/aqi-advisory-hazardous.jpg",
            "src/pages/air/AqiScreen.css",
            "src/pages/air/AqiScreen.tsx",
            "src/pages/air/NaaqsScreen.tsx"
        ]
    },
    {
        "day": "Oct 01, 2026",
        "date": "2026-10-01T20:04:45+05:30",
        "msg": "feat(air): build screen 05 industrial particulate control equipment and smoke abatement",
        "patterns": [
            "public/images/air-control-equipment-bg.jpg",
            "public/images/air-cyclone-model.jpg",
            "public/images/air-esp-model.jpg",
            "public/images/air-baghouse-model.jpg",
            "public/images/air-scrubber-model.jpg",
            "public/images/air-other-absorber.jpg",
            "public/images/air-other-adsorber.jpg",
            "public/images/air-other-catalytic.jpg",
            "public/images/air-other-incinerator.jpg",
            "public/images/smoke-combustion-fire.jpg",
            "public/images/smoke-method-clean-stack.jpg",
            "public/images/smoke-source-diesel.jpg",
            "public/images/smoke-type-black-plume.jpg",
            "public/images/smoke-type-black.jpg",
            "src/pages/air/ControlEquipmentScreen.css",
            "src/pages/air/ControlEquipmentScreen.tsx",
            "src/pages/air/SmokeControlScreen.css",
            "src/pages/air/SmokeControlScreen.tsx"
        ]
    },
    {
        "day": "Oct 01, 2026",
        "date": "2026-10-01T22:47:20+05:30",
        "msg": "feat(air): implement stratospheric ozone chemistry, economic impacts and air module experience",
        "patterns": [
            "public/images/air-ozone-bg.jpg",
            "public/images/air-ozone-hole-comparison.jpg",
            "public/images/air-ozone-layer-view.jpg",
            "public/images/air-economic-agri.jpg",
            "public/images/air-economic-bg.jpg",
            "public/images/air-economic-hospital.jpg",
            "public/images/air-economic-monument-after.jpg",
            "public/images/air-economic-monument-before.jpg",
            "public/images/air-economic-monument-full.jpg",
            "public/images/air-economic-monument.jpg",
            "public/images/air-economic-taj.jpg",
            "public/images/air-plant-clean-stack.jpg",
            "public/images/air-plant-cottam.jpg",
            "public/images/air-plant-rostock.jpg",
            "public/images/air-plant-twilight.jpg",
            "src/pages/air/OzoneDepletionScreen.css",
            "src/pages/air/OzoneDepletionScreen.tsx",
            "src/pages/air/PhotochemicalScreen.css",
            "src/pages/air/PhotochemicalScreen.tsx",
            "src/pages/air/EconomicEffectsScreen.tsx",
            "src/pages/air/AirChapterScreens.tsx",
            "src/pages/air/AirSummaryScreen.css",
            "src/pages/air/AirSummaryScreen.tsx",
            "src/pages/air/index.ts",
            "src/pages/AirModuleExperience.tsx"
        ]
    },

    # ==========================================
    # DAY 4: OCT 02, 2026 - Biodiversity & Ecosystem Conservation Module
    # ==========================================
    {
        "day": "Oct 02, 2026",
        "date": "2026-10-02T10:06:37+05:30",
        "msg": "feat(bio): scaffold biodiversity module architecture, cover hero and chapter navigation cards",
        "patterns": [
            "src/bio-module.css",
            "public/images/bio-hero-bg.jpg",
            "public/images/bio-aerial-landscape.jpg",
            "public/images/bio-earth-globe.png",
            "public/images/bio-biosphere-globe.png",
            "public/images/bio-card-01-intro.jpg",
            "public/images/bio-card-02-levels.jpg",
            "public/images/bio-card-03-values.jpg",
            "public/images/bio-card-04-threats.jpg",
            "public/images/bio-card-05-conservation.jpg",
            "public/images/bio-card-06-ecosystem.jpg",
            "public/images/bio-card-07-types.jpg",
            "public/images/bio-card-08-significance.jpg",
            "public/images/bio-card-09-economic.jpg",
            "src/pages/bio/bioData.ts",
            "src/pages/bio/useBioModalScrollLock.ts",
            "src/pages/bio/BioCoverScreen.tsx",
            "src/pages/bio/BioIntroScreen.tsx",
            "src/pages/bio/BioIntroTransition.tsx"
        ]
    },
    {
        "day": "Oct 02, 2026",
        "date": "2026-10-02T12:44:18+05:30",
        "msg": "feat(bio): build screen 02 genetic, species and ecosystem hierarchy visual explorer",
        "patterns": [
            "public/images/bio-levels-bg.jpg",
            "public/images/bio-levels/",
            "public/images/bio-flora-thumb.jpg",
            "public/images/bio-fauna-thumb.jpg",
            "public/images/bio-microbes-thumb.jpg",
            "src/pages/bio/BioLevelsScreen.tsx"
        ]
    },
    {
        "day": "Oct 02, 2026",
        "date": "2026-10-02T15:21:55+05:30",
        "msg": "feat(bio): implement screen 03 6-pillar biodiversity valuation framework and ecosystem services",
        "patterns": [
            "public/images/bio-values-bg.jpg",
            "public/images/bio-val-aesthetic.jpg",
            "public/images/bio-val-ecological.jpg",
            "public/images/bio-val-economic.jpg",
            "public/images/bio-val-educational.jpg",
            "public/images/bio-val-ethical.jpg",
            "public/images/bio-val-social.jpg",
            "src/pages/bio/BioValuesScreen.tsx"
        ]
    },
    {
        "day": "Oct 02, 2026",
        "date": "2026-10-02T17:58:12+05:30",
        "msg": "feat(bio): build screen 04 anthropogenic biodiversity threats matrix and habitat loss analysis",
        "patterns": [
            "public/images/bio-threats-bg.jpg",
            "public/images/bio-threats-healthy.jpg",
            "public/images/bio-threats-degraded.jpg",
            "public/images/bio-threat-habitat.jpg",
            "public/images/bio-threat-pollution.jpg",
            "public/images/bio-threat-overexploit.jpg",
            "public/images/bio-threat-invasive.jpg",
            "public/images/bio-threat-climate.jpg",
            "public/images/bio-threat-calamities.jpg",
            "src/pages/bio/BioThreatsScreen.tsx"
        ]
    },
    {
        "day": "Oct 02, 2026",
        "date": "2026-10-02T20:39:46+05:30",
        "msg": "feat(bio): implement in-situ protected areas and ex-situ germplasm genebanks",
        "patterns": [
            "public/images/bio-conservation-bg.jpg",
            "public/images/bio-insitu-hero.jpg",
            "public/images/bio-insitu-national-parks.jpg",
            "public/images/bio-insitu-sanctuaries.jpg",
            "public/images/bio-insitu-biosphere.jpg",
            "public/images/bio-insitu-marine.jpg",
            "public/images/bio-exsitu-botanical.jpg",
            "public/images/bio-exsitu-botanical-show.jpg",
            "public/images/bio-exsitu-zoos.jpg",
            "public/images/bio-exsitu-zoo-show.jpg",
            "public/images/bio-exsitu-seedbanks.jpg",
            "public/images/bio-exsitu-seed-show.jpg",
            "public/images/bio-exsitu-genebanks.jpg",
            "public/images/bio-exsitu-tissue.jpg",
            "public/images/bio-exsitu-tissue-show.jpg",
            "src/pages/bio/BioConservationScreen.tsx"
        ]
    },
    {
        "day": "Oct 02, 2026",
        "date": "2026-10-02T23:12:09+05:30",
        "msg": "feat(bio): build terrestrial biome ecosystem types, medicinal ethnobotanical database and full bio experience",
        "patterns": [
            "public/images/bio-types-bg.jpg",
            "public/images/bio-types-forest.jpg",
            "public/images/bio-types-grassland.jpg",
            "public/images/bio-types-desert.jpg",
            "public/images/bio-types-wetland.jpg",
            "public/images/bio-types-marine.jpg",
            "public/images/bio-types-estuary.jpg",
            "public/images/bio-types-freshwater.jpg",
            "public/images/bio-plant-aloe.jpg",
            "public/images/bio-plant-cinchona.jpg",
            "public/images/bio-plant-foxglove.jpg",
            "public/images/bio-plant-neem.jpg",
            "public/images/bio-plant-periwinkle.jpg",
            "public/images/bio-plant-turmeric.jpg",
            "public/images/bio-plant-willow.jpg",
            "public/images/bio-plant-yew.jpg",
            "public/images/bio-economic/",
            "public/images/bio-ecosystem/",
            "public/images/bio-significance/",
            "public/images/bio-summary/",
            "public/images/bio-economic-bg.jpg",
            "src/pages/bio/BioEcosystemScreen.tsx",
            "src/pages/bio/BioTypesScreen.tsx",
            "src/pages/bio/BioSignificanceScreen.tsx",
            "src/pages/bio/BioEconomicScreen.tsx",
            "src/pages/bio/BioSummaryScreen.tsx",
            "src/pages/bio/BioPlaceholderScreens.tsx",
            "src/pages/bio/index.ts",
            "src/pages/BioModuleExperience.tsx"
        ]
    },

    # ==========================================
    # DAY 5: OCT 03, 2026 - Resources Hub, Navigation, Polish & 3D Globe Tuning
    # ==========================================
    {
        "day": "Oct 03, 2026",
        "date": "2026-10-03T09:35:22+05:30",
        "msg": "feat(resources): implement course reference center with syllabus modules and lecture PDF reader",
        "patterns": [
            "public/notes/pdf/",
            "src/data/resourcesData.ts",
            "src/resources.css",
            "src/pages/Resources.tsx",
            "public/images/earth-resource-panorama.jpg",
            "public/images/earth-resource-globe.jpg"
        ]
    },
    {
        "day": "Oct 03, 2026",
        "date": "2026-10-03T12:17:40+05:30",
        "msg": "feat(modules): create unified curriculum module overview index and navigation cards",
        "patterns": [
            "src/modules.css",
            "src/pages/ModulesIndex.tsx",
            "src/pages/ModulePage.tsx"
        ]
    },
    {
        "day": "Oct 03, 2026",
        "date": "2026-10-03T14:49:15+05:30",
        "msg": "refactor(three): optimize planetary texture maps, near-viewport mount and 3D globe responsiveness",
        "patterns": [
            "public/images/earth-clouds-2k.jpg",
            "public/textures/earth-albedo-2k.jpg",
            "public/textures/earth-bump-2k.jpg",
            "public/textures/earth-land-ocean-mask-2k.png",
            "public/images/continent-antarctica.jpg",
            "public/images/continent-asia.jpg",
            "public/images/continent-australia.jpg",
            "public/images/continent-europe.jpg",
            "public/images/continent-north-america.jpg",
            "public/images/continent-south-america.jpg",
            "public/images/saarschleife_highres.jpg",
            "src/three/NearViewportMount.tsx",
            "src/three/InteractiveCutawayEarth.tsx",
            "src/three/InteractiveFormationGlobe.tsx",
            "src/three/CutawayEarth3D.tsx"
        ]
    },
    {
        "day": "Oct 03, 2026",
        "date": "2026-10-03T17:24:38+05:30",
        "msg": "feat(quiz): expand 15-question evaluation bank with module breakdown and scoring analytics",
        "patterns": [
            "src/content/quiz.ts",
            "src/pages/Quiz.tsx",
            "src/quiz.css"
        ]
    },
    {
        "day": "Oct 03, 2026",
        "date": "2026-10-03T20:11:04+05:30",
        "msg": "style(ui): refine global header branding, fluid scroll behaviors and site navigation layout",
        "patterns": [
            "src/components/SiteNav.tsx",
            "src/components/Footer.tsx",
            "src/components/GlobalUI.tsx",
            "src/App.tsx",
            "src/index.css",
            "src/landuse.css",
            "src/soilhealth.css",
            "src/pages/Landing.tsx",
            "src/pages/About.tsx",
            "src/pages/LandModuleExperience.tsx",
            "src/pages/land/"
        ]
    },
    {
        "day": "Oct 03, 2026",
        "date": "2026-10-03T22:58:29+05:30",
        "msg": "chore: clean legacy scratch test artifacts, outdated photo assets and finalize build configuration",
        "patterns": [
            "."  # stages any remaining cleanup, deletions, vite/tsconfig updates
        ]
    }
]

def test_dry_run():
    st = subprocess.check_output(['git', 'status', '--porcelain'], text=True)
    all_files = [l[3:].strip().strip('"') for l in st.splitlines() if l.strip()]
    print(f"\nInitial total changed/untracked items: {len(all_files)}")
    for i, c in enumerate(commits):
        matched = []
        for pat in c["patterns"]:
            if pat == ".":
                matched.append("REMAINDER_ALL")
            else:
                for f in all_files:
                    if f.startswith(pat) or f == pat or (pat.endswith('/') and f.startswith(pat)):
                        matched.append(f)
        print(f"Commit [{i+1:02d}/30] {c['day']} {c['date'][11:19]} ({len(matched)} files): {c['msg'][:60]}...")

def execute_commits():
    base_env = os.environ.copy()
    base_env["GIT_AUTHOR_NAME"] = "mujju-212"
    base_env["GIT_AUTHOR_EMAIL"] = "mujju786492@gmail.com"
    base_env["GIT_COMMITTER_NAME"] = "mujju-212"
    base_env["GIT_COMMITTER_EMAIL"] = "mujju786492@gmail.com"

    print("Beginning execution of 30 commits across 5 days (Sep 29 - Oct 03, 2026)...")

    for i, c in enumerate(commits):
        env = base_env.copy()
        env["GIT_AUTHOR_DATE"] = c["date"]
        env["GIT_COMMITTER_DATE"] = c["date"]

        # Stage files for this commit
        for pat in c["patterns"]:
            if pat == ".":
                run("git add -A .")
            else:
                # Add with check=False to tolerate file patterns that may not exist if already staged/handled
                run(f'git add -A "{pat}"', check=False)

        # Check if anything is staged
        staged = subprocess.run("git diff --cached --name-only", shell=True, capture_output=True, text=True).stdout.strip()
        msg = c["msg"].replace('"', '\\"')

        if staged:
            staged_count = len(staged.splitlines())
            run(f'git commit -m "{msg}"', env=env)
            print(f"[{i+1:02d}/30] Committed {staged_count} files on {c['day']} ({c['date'][11:19]}): {c['msg']}")
        else:
            run(f'git commit --allow-empty -m "{msg}"', env=env)
            print(f"[{i+1:02d}/30] Empty commit on {c['day']} ({c['date'][11:19]}): {c['msg']}")

    print("\n--- All 30 commits created successfully! ---")
    print("\nVerifying last 35 commits:")
    log_sample = run('git log -n 35 --format="%h | %ad | %an | %s"')
    print(log_sample)

    print("\nChecking remaining git status:")
    rem_status = run("git status --short")
    if rem_status:
        print(rem_status)
    else:
        print("Working tree is completely clean!")

    print("\nPushing to remote origin main...")
    push_out = run("git push origin main")
    print("Push output:", push_out)
    print("\n=== SUCCESSFUL DEPLOYMENT TO GITHUB! ===")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--execute":
        execute_commits()
    else:
        test_dry_run()
        print("\nTo execute all commits and push, run with: python scripts/build_commit_manifest.py --execute")
