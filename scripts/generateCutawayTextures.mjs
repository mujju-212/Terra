import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateCoreCrossSection() {
  const size = 2048;
  const cx = size * 0.5;
  const cy = size * 0.5;
  const data = Buffer.alloc(size * size * 4); // RGBA

  const rMax = size * 0.485; // Outer crust edge
  const rCrustInner = rMax * 0.965; // Crust boundary
  const rMantleInner = rMax * 0.68; // Mantle-Outer Core boundary (Gutenberg discontinuity)
  const rOuterCoreInner = rMax * 0.355; // Outer-Inner Core boundary (Lehmann discontinuity)

  for (let y = 0; y < size; y++) {
    const dy = y - cy;
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      let r = 0, g = 0, b = 0, a = 0;

      if (dist <= rMax) {
        a = 255;
        // Fine convective turbulence & radial striations
        const radStripes = Math.sin(angle * 72) * 0.5 + Math.cos(angle * 36) * 0.5;
        const turb1 = Math.sin(angle * 18 + dist * 0.05) * Math.cos(angle * 9 - dist * 0.03);
        const turb2 = Math.sin(angle * 45 + dist * 0.12) * 0.4;
        const turb = turb1 + turb2;

        if (dist <= rOuterCoreInner) {
          // ── 1. INNER CORE (Solid Iron-Nickel, ~6,000°C) ──
          // White-hot star-like center with intense radial radiance
          const normR = dist / rOuterCoreInner;
          const heat = Math.pow(1 - normR, 1.4);
          const rim = Math.pow(normR, 4) * 0.3; // subtle golden edge
          r = 255;
          g = Math.min(255, Math.round(242 + heat * 13 - rim * 20));
          b = Math.min(255, Math.round(180 + heat * 75 - rim * 60));

          // Boundary glow ring at Lehmann discontinuity
          if (dist > rOuterCoreInner - 6) {
            r = 255;
            g = 255;
            b = 230;
          }
        } else if (dist <= rMantleInner) {
          // ── 2. OUTER CORE (Liquid Molten Iron-Nickel, 4,500°C - 5,500°C) ──
          // Swirling molten gold-orange convective fluid
          const normR = (dist - rOuterCoreInner) / (rMantleInner - rOuterCoreInner);
          const swirl = turb * 24;
          // Inner edge is brilliant golden yellow, transitioning to blazing fiery orange
          const yellowGrad = Math.pow(1 - normR, 1.2);
          r = 255;
          g = Math.max(50, Math.min(235, Math.round(yellowGrad * 185 + 50 + swirl)));
          b = Math.max(10, Math.min(90, Math.round(yellowGrad * 70 + 10 + swirl * 0.2)));

          // Boundary glow at Gutenberg discontinuity
          if (dist > rMantleInner - 7) {
            r = 255;
            g = 210;
            b = 100;
          }
        } else if (dist <= rCrustInner) {
          // ── 3. MANTLE (Semi-Solid Convective Silicate Rock, 1,000°C - 3,700°C) ──
          // Deep rich fiery crimson/vermilion with radial heat convection streaks
          const normR = (dist - rMantleInner) / (rCrustInner - rMantleInner);
          const plume = turb * 18 + radStripes * 12;
          const heatR = (1 - normR);
          // Vivid fiery orange-red near outer core, darker rich carmine near crust
          r = Math.max(80, Math.min(240, Math.round(heatR * 135 + 85 + plume)));
          g = Math.max(20, Math.min(130, Math.round(heatR * 90 + 22 + plume * 0.4)));
          b = Math.max(10, Math.min(45, Math.round(heatR * 25 + 10)));

          // Boundary at Moho discontinuity
          if (dist > rCrustInner - 5) {
            r = 210;
            g = 140;
            b = 75;
          }
        } else {
          // ── 4. CRUST (Solid Lithosphere, 0 - 500°C) ──
          // Rocky basaltic / granitic mineral cross section with fine crystalline grain
          const normR = (dist - rCrustInner) / (rMax - rCrustInner);
          const rockGrain = (Math.sin(dist * 0.8) + Math.cos(angle * 120)) * 12;
          r = Math.max(70, Math.min(180, Math.round(145 - normR * 20 + rockGrain)));
          g = Math.max(55, Math.min(150, Math.round(115 - normR * 20 + rockGrain * 0.8)));
          b = Math.max(40, Math.min(120, Math.round(85 - normR * 15 + rockGrain * 0.6)));
        }
      }

      const idx = (y * size + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;
    }
  }

  const outPath = path.resolve('public/textures/earth-core-cross-section.png');
  await sharp(data, {
    raw: { width: size, height: size, channels: 4 }
  })
    .png({ compressionLevel: 8 })
    .toFile(outPath);

  console.log(`Generated enhanced 2K cross-section: ${outPath}`);
}

generateCoreCrossSection().catch(console.error);
