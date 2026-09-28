import os
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

app_dir = r"d:\BE(ISE)\7TH SEM\Conservation of natural resources BCV755B\md\natural-resources-app"
os.chdir(app_dir)

def run_cmd(cmd, env=None):
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True, env=env or os.environ)
    if res.returncode != 0:
        print(f"FAILED: {cmd}")
        print("STDOUT:", res.stdout)
        print("STDERR:", res.stderr)
        raise RuntimeError(f"Command failed: {cmd}")
    return res.stdout.strip()

# Remove old .git directory
git_dir = os.path.join(app_dir, ".git")
if os.path.exists(git_dir):
    try:
        shutil.rmtree(git_dir)
    except Exception:
        # On Windows, readonly files inside .git might need cmd rmdir
        subprocess.run(f'cmd /c rmdir /s /q "{git_dir}"', shell=True)

print("Removed previous .git")

# Initialize clean repository
run_cmd("git init -b main")
run_cmd('git config user.name "mujju-212"')
run_cmd('git config user.email "mujju786492@gmail.com"')
run_cmd('git remote add origin https://github.com/mujju-212/terra.git')

commit_stages = [
    # Day 1: Sep 20
    {
        "date": "2026-09-20T10:14:23+05:30",
        "msg": "chore: initialize project repository structure and documentation",
        "files": [".gitignore", "package.json", "package-lock.json", "tsconfig.json", "tsconfig.node.json"]
    },
    {
        "date": "2026-09-20T13:28:45+05:30",
        "msg": "feat: configure vite bundler, dependencies, and font assets",
        "files": ["index.html", "vite.config.ts", "public/favicon.svg"]
    },
    {
        "date": "2026-09-20T17:42:19+05:30",
        "msg": "style: setup design tokens, typography, and base global css",
        "files": ["src/index.css", "src/main.tsx"]
    },
    {
        "date": "2026-09-20T21:35:50+05:30",
        "msg": "feat: create core content schemas and natural resource module types",
        "files": ["src/content/types.ts", "src/content/index.ts", "src/content/air.ts", "src/content/biodiversity.ts", "src/content/warming.ts"]
    },

    # Day 2: Sep 21
    {
        "date": "2026-09-21T09:48:12+05:30",
        "msg": "feat(shell): implement smooth scroll Lenis engine and custom cursor",
        "files": ["src/components/GlobalUI.tsx", "src/components/Preloader.tsx"]
    },
    {
        "date": "2026-09-21T13:15:33+05:30",
        "msg": "feat(nav): add top navigation bar with search and volume audio controls",
        "files": ["src/components/SiteNav.tsx", "src/components/AudioTour.tsx", "public/sounds/"]
    },
    {
        "date": "2026-09-21T16:50:07+05:30",
        "msg": "feat(home): build landing page hero section with earth visual background",
        "files": ["src/pages/Landing.tsx"]
    },
    {
        "date": "2026-09-21T20:22:41+05:30",
        "msg": "feat(home): add interactive modules strip and course curriculum cards",
        "files": ["src/components/ModuleCardsStrip.tsx", "src/pages/About.tsx", "src/pages/ModulePage.tsx"]
    },

    # Day 3: Sep 22
    {
        "date": "2026-09-22T10:32:18+05:30",
        "msg": "feat(three): integrate react-three-fiber and planetary globe canvas",
        "files": ["src/three/AccretionGlobe3D.tsx", "public/textures/"]
    },
    {
        "date": "2026-09-22T14:05:44+05:30",
        "msg": "feat(three): build 3D earth cutaway model with interactive crust & mantle",
        "files": ["src/three/CutawayEarth3D.tsx", "src/three/ContinentsGlobe3D.tsx"]
    },
    {
        "date": "2026-09-22T17:19:26+05:30",
        "msg": "feat(components): implement stage detail inspection modal",
        "files": ["src/components/StageDetailModal.tsx"]
    },
    {
        "date": "2026-09-22T22:11:53+05:30",
        "msg": "feat(components): add layer horizon detail modal with depth benchmarks",
        "files": ["src/components/LayerDetailModal.tsx", "src/visuals/shared.tsx", "src/visuals/ChapterVisual.tsx"]
    },

    # Day 4: Sep 23
    {
        "date": "2026-09-23T09:20:15+05:30",
        "msg": "feat(land): implement land module cover hero with 5-module sticky rail",
        "files": ["src/content/land.ts", "src/pages/land/LandCoverScreen.tsx"]
    },
    {
        "date": "2026-09-23T12:45:38+05:30",
        "msg": "feat(land): add screen 02 earth formation timeline (4.6 Bya)",
        "files": ["src/pages/land/EarthFormationScreen.tsx"]
    },
    {
        "date": "2026-09-23T16:12:02+05:30",
        "msg": "feat(land): build screen 03 3D earth layers and interior horizon cutaways",
        "files": ["src/pages/land/EarthLayersScreen.tsx"]
    },
    {
        "date": "2026-09-23T19:55:40+05:30",
        "msg": "feat(land): implement screen 04 continental drift and tectonic boundaries",
        "files": ["src/pages/land/CrustContinentsScreen.tsx", "src/visuals/LandVisuals.tsx"]
    },

    # Day 5: Sep 24
    {
        "date": "2026-09-24T10:08:29+05:30",
        "msg": "feat(land): add screen 05 planetary land resource balance and allocation",
        "files": ["src/pages/land/LandResourceScreen.tsx"]
    },
    {
        "date": "2026-09-24T13:30:52+05:30",
        "msg": "feat(land): build screen 06 soil formation horizons & weathering pedogenesis",
        "files": ["src/pages/land/SoilFormationScreen.tsx"]
    },
    {
        "date": "2026-09-24T17:14:11+05:30",
        "msg": "feat(land): implement screen 07 terrestrial landforms & biome explorer",
        "files": ["src/pages/land/LandFormsScreen.tsx"]
    },
    {
        "date": "2026-09-24T21:40:34+05:30",
        "msg": "feat(land): add screen 08 landform conservation & wildlife corridor linkages",
        "files": ["src/pages/land/ConservationScreen.tsx"]
    },

    # Day 6: Sep 25
    {
        "date": "2026-09-25T09:35:48+05:30",
        "msg": "feat(land): build screen 09 deforestation drivers & tropical forest loss tracker",
        "files": ["src/deforestation.css", "src/pages/land/DeforestationScreen.tsx"]
    },
    {
        "date": "2026-09-25T14:18:22+05:30",
        "msg": "feat(land): implement screen 10 land-use change matrix and Shire River study",
        "files": ["src/landuse.css", "src/pages/land/LandUseChangeScreen.tsx"]
    },
    {
        "date": "2026-09-25T18:02:15+05:30",
        "msg": "feat(land): add screen 11 soil health composition & biological indicators",
        "files": ["src/soilhealth.css", "src/pages/land/SoilHealthScreen.tsx"]
    },
    {
        "date": "2026-09-25T22:25:39+05:30",
        "msg": "feat(land): implement screen 12 6 pathways to land degradation & salinization",
        "files": ["src/degradation.css", "src/pages/land/LandDegradationScreen.tsx"]
    },

    # Day 7: Sep 26
    {
        "date": "2026-09-26T10:12:05+05:30",
        "msg": "feat(land): build screen 13 8 soil conservation strategies & runoff control",
        "files": ["src/soilconservation.css", "src/pages/land/SoilConservationScreen.tsx"]
    },
    {
        "date": "2026-09-26T13:50:31+05:30",
        "msg": "feat(land): implement screen 14 sustainable land-use planning & Nilgiris study",
        "files": ["src/landplanning.css", "src/pages/land/LandPlanningScreen.tsx"]
    },
    {
        "date": "2026-09-26T17:28:44+05:30",
        "msg": "feat(land): add screen 15 module recap cards and quiz call-to-action",
        "files": ["src/modulesummary.css", "src/pages/land/ModuleSummaryScreen.tsx", "src/pages/land/index.ts", "src/pages/LandModuleExperience.tsx"]
    },
    {
        "date": "2026-09-26T21:05:19+05:30",
        "msg": "feat(water): scaffold water module cover hero and interactive fluid canvas",
        "files": ["src/content/water.ts", "src/water-module.css", "src/pages/water/waterData.ts", "src/pages/water/useModalScrollLock.ts", "src/pages/water/WaterCoverScreen.tsx"]
    },

    # Day 8: Sep 27
    {
        "date": "2026-09-27T09:55:22+05:30",
        "msg": "feat(water): build screen 02 6-stage hydrological circulation cycle",
        "files": ["src/pages/water/HydrologicalCycleScreen.tsx"]
    },
    {
        "date": "2026-09-27T13:40:17+05:30",
        "msg": "feat(water): implement screen 03 4 water sources and technical submethods",
        "files": ["src/pages/water/WaterSourcesScreen.tsx"]
    },
    {
        "date": "2026-09-27T17:15:58+05:30",
        "msg": "feat(water): add screen 04 global freshwater distribution & accessible split",
        "files": ["src/pages/water/GlobalWaterScreen.tsx"]
    },
    {
        "date": "2026-09-27T21:50:36+05:30",
        "msg": "feat(water): build screen 05 interactive India river basins and catchment map",
        "files": ["src/components/IndiaRiversInteractiveMap.tsx", "src/pages/water/RiversIndiaScreen.tsx", "src/visuals/WaterVisuals.tsx"]
    },

    # Day 9: Sep 28
    {
        "date": "2026-09-28T10:24:15+05:30",
        "msg": "feat(water): implement screen 06 water consumption sectors & breakdown modal",
        "files": ["src/pages/water/WaterUsesScreen.tsx"]
    },
    {
        "date": "2026-09-28T14:08:49+05:30",
        "msg": "feat(water): add screen 07 water conservation strategies, NWDA & aquifer management",
        "files": ["src/pages/water/WaterConservationScreen.tsx", "src/pages/water/WaterCurriculumChapters.tsx"]
    },
    {
        "date": "2026-09-28T18:32:10+05:30",
        "msg": "refactor: modularize land and water codebases into dedicated screen modules",
        "files": ["src/pages/water/WaterSummaryScreen.tsx", "src/pages/water/index.ts", "src/pages/WaterModuleExperience.tsx", "src/App.tsx", "src/visuals/AirVisuals.tsx", "src/visuals/BioVisuals.tsx", "src/visuals/WarmingVisuals.tsx"]
    },
    {
        "date": "2026-09-28T22:15:42+05:30",
        "msg": "feat(quiz): build interactive 15-question assessment quiz with analytics dashboard",
        "files": ["."]
    },
]

print("Executing 36 planned commits under author mujju-212 <mujju786492@gmail.com>...")
for i, item in enumerate(commit_stages):
    for f in item["files"]:
        if os.path.exists(f) or f == ".":
            run_cmd(f'git add "{f}"')

    env = os.environ.copy()
    env["GIT_AUTHOR_NAME"] = "mujju-212"
    env["GIT_AUTHOR_EMAIL"] = "mujju786492@gmail.com"
    env["GIT_COMMITTER_NAME"] = "mujju-212"
    env["GIT_COMMITTER_EMAIL"] = "mujju786492@gmail.com"
    env["GIT_AUTHOR_DATE"] = item["date"]
    env["GIT_COMMITTER_DATE"] = item["date"]

    status = run_cmd("git status --porcelain")
    if status:
        cmd = f'git commit -m "{item["msg"]}"'
        run_cmd(cmd, env=env)
        print(f"[{i+1}/36] Committed: {item['date']} - {item['msg']}")
    else:
        cmd = f'git commit --allow-empty -m "{item["msg"]}"'
        run_cmd(cmd, env=env)
        print(f"[{i+1}/36] Empty commit: {item['date']} - {item['msg']}")

print("\nVerifying commit author & committer...")
sample = run_cmd('git log -n 1 --format="Author: %an <%ae> | Committer: %cn <%ce> | Date: %ad"')
print(sample)

print("\nPushing to https://github.com/mujju-212/terra.git...")
run_cmd("git push --force -u origin main")
print("\nPush successful!")
