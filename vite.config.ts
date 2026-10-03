import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', allowedHosts: true },
  preview: { host: '0.0.0.0', allowedHosts: true },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1100,
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ─── Vendor Splits ──────────────────────────────────────────
          if (id.includes('/node_modules/three/')) return 'three-vendor';
          if (id.includes('/node_modules/@react-three/')) return 'react-three-fiber';
          if (id.includes('/node_modules/framer-motion/')) return 'framer-motion';
          if (id.includes('/node_modules/lucide-react/')) return 'lucide';
          if (id.includes('/node_modules/react-router') ||
              id.includes('/node_modules/@remix-run/')) return 'router';

          // ─── Module Experience Splits ───────────────────────────────
          // Each module gets its own lazy chunk so only the current
          // module's code is parsed when the user navigates to it.
          if (id.includes('/pages/land/') ||
              id.includes('/pages/LandModuleExperience')) return 'module-land';

          // Water: split heavy data files separately from screen components
          if (id.includes('/pages/water/waterData') ||
              id.includes('/pages/water/waterSummaryData') ||
              id.includes('/pages/water/riverInterlinkingData') ||
              id.includes('/pages/water/conjunctiveUseData') ||
              id.includes('/pages/water/seawaterIngressData') ||
              id.includes('/pages/water/groundwaterManagementData') ||
              id.includes('/pages/water/groundwaterContaminationData') ||
              id.includes('/pages/water/groundwaterRechargeData') ||
              id.includes('/pages/water/groundwaterData') ||
              id.includes('/pages/water/groundwaterDepletionData') ||
              id.includes('/pages/water/groundwaterPotentialData')) return 'water-data';

          // NOTE: No separate water-groundwater chunk — those screens import waterData
          // which would create a circular dependency. They stay in module-water.

          if (id.includes('/pages/water/') ||
              id.includes('/pages/WaterModuleExperience')) return 'module-water';

          if (id.includes('/pages/air/') ||
              id.includes('/pages/AirModuleExperience')) return 'module-air';

          if (id.includes('/pages/bio') ||
              id.includes('/pages/BioModuleExperience')) return 'module-bio';

          if (id.includes('/pages/warming') ||
              id.includes('/pages/WarmingModuleExperience')) return 'module-warming';

          // ─── Content Data & Visuals Splits ──────────────────────────
          if (id.includes('/content/')) return 'content-data';
          if (id.includes('/visuals/')) return 'visuals';
        },
      },
    },
  },
});
