import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outWidth = 2048;
const outHeight = 1024;

// ─────────────────────────────────────────────────────────────
// FAST 3D SIMPLEX / PERLIN NOISE ON UNIT SPHERE (100% SEAMLESS)
// ─────────────────────────────────────────────────────────────
const grad3 = [
  [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
];

const p = new Uint8Array(512);
let seedVal = 1337;
function rng() {
  seedVal = (seedVal * 9301 + 49297) % 233280;
  return seedVal / 233280;
}
const perm = new Uint8Array(256);
for (let i = 0; i < 256; i++) perm[i] = i;
for (let i = 255; i > 0; i--) {
  const r = Math.floor(rng() * (i + 1));
  const t = perm[i]; perm[i] = perm[r]; perm[r] = t;
}
for (let i = 0; i < 512; i++) p[i] = perm[i & 255];

function dot3(g, x, y, z) {
  return g[0]*x + g[1]*y + g[2]*z;
}

function noise3D(xin, yin, zin) {
  const F3 = 1.0 / 3.0;
  const s = (xin + yin + zin) * F3;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const k = Math.floor(zin + s);
  const G3 = 1.0 / 6.0;
  const t = (i + j + k) * G3;
  const X0 = i - t;
  const Y0 = j - t;
  const Z0 = k - t;
  const x0 = xin - X0;
  const y0 = yin - Y0;
  const z0 = zin - Z0;

  let i1, j1, k1;
  let i2, j2, k2;
  if (x0 >= y0) {
    if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
    else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
    else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
  } else {
    if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
    else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
    else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
  }

  const x1 = x0 - i1 + G3;
  const y1 = y0 - j1 + G3;
  const z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2.0 * G3;
  const y2 = y0 - j2 + 2.0 * G3;
  const z2 = z0 - k2 + 2.0 * G3;
  const x3 = x0 - 1.0 + 3.0 * G3;
  const y3 = y0 - 1.0 + 3.0 * G3;
  const z3 = z0 - 1.0 + 3.0 * G3;

  const ii = i & 255;
  const jj = j & 255;
  const kk = k & 255;
  const gi0 = p[ii + p[jj + p[kk]]] % 12;
  const gi1 = p[ii + i1 + p[jj + j1 + p[kk + k1]]] % 12;
  const gi2 = p[ii + i2 + p[jj + j2 + p[kk + k2]]] % 12;
  const gi3 = p[ii + 1 + p[jj + 1 + p[kk + 1]]] % 12;

  let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
  let n0 = t0 < 0 ? 0.0 : Math.pow(t0, 4) * dot3(grad3[gi0], x0, y0, z0);

  let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
  let n1 = t1 < 0 ? 0.0 : Math.pow(t1, 4) * dot3(grad3[gi1], x1, y1, z1);

  let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
  let n2 = t2 < 0 ? 0.0 : Math.pow(t2, 4) * dot3(grad3[gi2], x2, y2, z2);

  let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
  let n3 = t3 < 0 ? 0.0 : Math.pow(t3, 4) * dot3(grad3[gi3], x3, y3, z3);

  return 32.0 * (n0 + n1 + n2 + n3);
}

function fbm3D(x, y, z, octaves = 4) {
  let val = 0;
  let amp = 0.5;
  let freq = 1.0;
  for (let o = 0; o < octaves; o++) {
    val += amp * noise3D(x * freq, y * freq, z * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

// ─────────────────────────────────────────────────────────────
// STAGE 01: SOLAR NEBULA (Vortex of incandescent cosmic gas & dust)
// ─────────────────────────────────────────────────────────────
async function generateStage01Nebula() {
  const data = Buffer.alloc(outWidth * outHeight * 3);

  for (let py = 0; py < outHeight; py++) {
    const lat = (0.5 - py / outHeight) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);

    for (let px = 0; px < outWidth; px++) {
      const lon = (px / outWidth) * 2 * Math.PI;
      const sx = cosLat * Math.sin(lon);
      const sy = sinLat;
      const sz = cosLat * Math.cos(lon);

      // Swirling plasma filaments
      const angle = Math.atan2(sy, sx);
      const dist = Math.sqrt(sx * sx + sy * sy);
      const spiral = angle + dist * 4.5 + sz * 1.5;

      const n1 = fbm3D(sx * 3.0, sy * 3.0, sz * 3.0, 4);
      const n2 = Math.sin(spiral * 5.0 + n1 * 3.0) * 0.5 + 0.5;

      // Color: Solar orange, gold, and incandescent core
      const core = Math.max(0, 1 - Math.abs(sy) * 2.2);
      const intensity = n2 * 0.7 + core * 0.3 + (n1 + 1.0) * 0.15;

      let r = Math.min(255, Math.round(intensity * 255 + 40));
      let g = Math.min(255, Math.round(Math.pow(intensity, 1.4) * 190 + 15));
      let b = Math.min(255, Math.round(Math.pow(intensity, 2.5) * 80));

      const idx = (py * outWidth + px) * 3;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
    }
  }

  const outPath = path.resolve('public/textures/stage-01-nebula-sphere.jpg');
  await sharp(data, { raw: { width: outWidth, height: outHeight, channels: 3 } })
    .jpeg({ quality: 92 })
    .toFile(outPath);
  console.log(`Generated: ${outPath}`);
}

// ─────────────────────────────────────────────────────────────
// STAGE 02: ACCRETION (Violent Asteroid Impacts & Molten Shock Craters)
// ─────────────────────────────────────────────────────────────
async function generateStage02Accretion() {
  const bumpImg = await sharp('public/textures/earth-bump.jpg')
    .resize(outWidth, outHeight)
    .grayscale()
    .raw()
    .toBuffer();

  const data = Buffer.alloc(outWidth * outHeight * 3);

  // 16 Violent impact explosion sites across the 3D unit sphere
  const impactSites = [];
  let sRng = 44332;
  function rnd() {
    sRng = (sRng * 9301 + 49297) % 233280;
    return sRng / 233280;
  }

  for (let i = 0; i < 22; i++) {
    const theta = rnd() * 2 * Math.PI;
    const phi = Math.asin(rnd() * 1.8 - 0.9);
    impactSites.push({
      x: Math.cos(phi) * Math.sin(theta),
      y: Math.sin(phi),
      z: Math.cos(phi) * Math.cos(theta),
      radiusAngle: 0.08 + rnd() * 0.16,
      heatIntensity: 0.7 + rnd() * 0.3,
    });
  }

  for (let py = 0; py < outHeight; py++) {
    const lat = (0.5 - py / outHeight) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);

    for (let px = 0; px < outWidth; px++) {
      const lon = (px / outWidth) * 2 * Math.PI;
      const sx = cosLat * Math.sin(lon);
      const sy = sinLat;
      const sz = cosLat * Math.cos(lon);

      const bumpVal = bumpImg[py * outWidth + px] / 255.0;

      // Heavy rocky regolith texture with multi-scale fracture noise
      const rockNoise = fbm3D(sx * 12.0, sy * 12.0, sz * 12.0, 4) * 24;
      const fineNoise = fbm3D(sx * 40.0, sy * 40.0, sz * 40.0, 2) * 10;

      // Dark basalt stone tone
      const baseTone = 48 + Math.round(bumpVal * 36) + Math.round(rockNoise + fineNoise);
      let r = Math.round(baseTone * 1.05);
      let g = Math.round(baseTone * 0.95);
      let b = Math.round(baseTone * 0.88);

      let moltenR = 0, moltenG = 0, moltenB = 0;

      // Check impact craters with jagged shockwave distortion
      for (const site of impactSites) {
        const dot = Math.min(1.0, Math.max(-1.0, sx * site.x + sy * site.y + sz * site.z));
        const angDist = Math.acos(dot);

        // Distort circular shape with 3D noise to make it natural and jagged
        const distDistort = fbm3D(sx * 16 + site.x * 5, sy * 16 + site.y * 5, sz * 16 + site.z * 5, 2) * 0.04;
        const effDist = angDist + distDistort;

        if (effDist < site.radiusAngle * 2.2) {
          const normDist = effDist / site.radiusAngle;

          if (normDist < 0.6) {
            // Blinding molten impact core
            const coreHeat = Math.pow(1 - normDist / 0.6, 1.4) * site.heatIntensity;
            moltenR = Math.max(moltenR, 255 * coreHeat);
            moltenG = Math.max(moltenG, 180 * coreHeat);
            moltenB = Math.max(moltenB, 40 * coreHeat);
          } else if (normDist < 1.0) {
            // Molten lava pool margin
            const poolHeat = (1 - (normDist - 0.6) / 0.4) * site.heatIntensity * 0.85;
            moltenR = Math.max(moltenR, 255 * poolHeat);
            moltenG = Math.max(moltenG, 100 * poolHeat);
            moltenB = Math.max(moltenB, 15 * poolHeat);
          } else if (normDist < 1.4) {
            // Raised jagged rocky rim
            const rim = (1 - Math.abs(normDist - 1.2) / 0.2) * 35;
            r = Math.min(255, r + rim);
            g = Math.min(255, g + rim * 0.95);
            b = Math.min(255, b + rim * 0.9);
          }

          // Radiating jagged molten fractures
          if (normDist >= 0.8 && normDist < 2.2) {
            const fracNoise = fbm3D(sx * 22, sy * 22, sz * 22, 2);
            if (fracNoise > 0.48) {
              const fracHeat = (fracNoise - 0.48) / 0.52 * (1 - (normDist - 0.8) / 1.4) * 190 * site.heatIntensity;
              moltenR = Math.max(moltenR, fracHeat);
              moltenG = Math.max(moltenG, fracHeat * 0.55);
              moltenB = Math.max(moltenB, fracHeat * 0.1);
            }
          }
        }
      }

      if (moltenR > 0) {
        r = Math.min(255, Math.round(r * (1 - moltenR / 255) + moltenR));
        g = Math.min(255, Math.round(g * (1 - moltenR / 255) + moltenG));
        b = Math.min(255, Math.round(b * (1 - moltenR / 255) + moltenB));
      }

      const idx = (py * outWidth + px) * 3;
      data[idx] = Math.min(255, r);
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.min(255, b);
    }
  }

  const outPath = path.resolve('public/textures/stage-02-accretion-sphere.jpg');
  await sharp(data, { raw: { width: outWidth, height: outHeight, channels: 3 } })
    .jpeg({ quality: 92 })
    .toFile(outPath);
  console.log(`Generated: ${outPath}`);
}

// ─────────────────────────────────────────────────────────────
// STAGE 03: EARLY EARTH MAGMA OCEAN (Convective Magma Planet)
// 3D Spherical Cellular Convection - 100% Seamless
// ─────────────────────────────────────────────────────────────
async function generateStage03Magma() {
  const data = Buffer.alloc(outWidth * outHeight * 3);

  // Generate 220 convective cell centers on the 3D unit sphere
  const cellPoints = [];
  let sRng = 98765;
  function rnd() {
    sRng = (sRng * 9301 + 49297) % 233280;
    return sRng / 233280;
  }

  for (let i = 0; i < 220; i++) {
    const theta = rnd() * 2 * Math.PI;
    const phi = Math.asin(rnd() * 2.0 - 1.0);
    cellPoints.push({
      x: Math.cos(phi) * Math.sin(theta),
      y: Math.sin(phi),
      z: Math.cos(phi) * Math.cos(theta),
    });
  }

  for (let py = 0; py < outHeight; py++) {
    const lat = (0.5 - py / outHeight) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);

    for (let px = 0; px < outWidth; px++) {
      const lon = (px / outWidth) * 2 * Math.PI;
      const sx = cosLat * Math.sin(lon);
      const sy = sinLat;
      const sz = cosLat * Math.cos(lon);

      // Find closest and 2nd closest cell on 3D unit sphere
      let maxDot1 = -Infinity;
      let maxDot2 = -Infinity;

      for (let i = 0; i < cellPoints.length; i++) {
        const cp = cellPoints[i];
        const dot = sx * cp.x + sy * cp.y + sz * cp.z;
        if (dot > maxDot1) {
          maxDot2 = maxDot1;
          maxDot1 = dot;
        } else if (dot > maxDot2) {
          maxDot2 = dot;
        }
      }

      const d1 = Math.acos(Math.min(1.0, Math.max(-1.0, maxDot1)));
      const d2 = Math.acos(Math.min(1.0, Math.max(-1.0, maxDot2)));
      const edgeDiff = d2 - d1;

      const turb = fbm3D(sx * 14.0, sy * 14.0, sz * 14.0, 3) * 0.025;
      const crackWidth = 0.038 + turb;

      let r = 0, g = 0, b = 0;

      if (edgeDiff < crackWidth) {
        const heat = 1.0 - edgeDiff / crackWidth;
        if (heat > 0.7) {
          r = 255;
          g = Math.min(255, 235 + Math.round((heat - 0.7) * 60));
          b = Math.min(255, 120 + Math.round((heat - 0.7) * 380));
        } else if (heat > 0.35) {
          r = 255;
          g = Math.round(110 + (heat - 0.35) * 350);
          b = 10;
        } else {
          r = Math.round(180 + heat * 200);
          g = Math.round(25 + heat * 150);
          b = 5;
        }
      } else {
        const crustNorm = Math.min(1.0, (edgeDiff - crackWidth) / 0.12);
        const plateDetail = fbm3D(sx * 24.0, sy * 24.0, sz * 24.0, 2) * 8;
        const baseBasalt = 24 + plateDetail;
        r = Math.round(baseBasalt * 1.3);
        g = Math.round(baseBasalt * 0.85);
        b = Math.round(baseBasalt * 0.75);

        if (crustNorm < 0.5) {
          const underglow = (0.5 - crustNorm) * 2.0;
          r += Math.round(underglow * 70);
          g += Math.round(underglow * 18);
        }
      }

      const idx = (py * outWidth + px) * 3;
      data[idx] = Math.min(255, r);
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.min(255, b);
    }
  }

  const outPath = path.resolve('public/textures/stage-03-magma-sphere.jpg');
  await sharp(data, { raw: { width: outWidth, height: outHeight, channels: 3 } })
    .jpeg({ quality: 92 })
    .toFile(outPath);
  console.log(`Generated: ${outPath}`);
}

// ─────────────────────────────────────────────────────────────
// STAGE 04: COOLING & CRUST (Global Basalt Plates with Incandescent Tectonic Rifts)
// ─────────────────────────────────────────────────────────────
async function generateStage04CoolingCrust() {
  const bumpImg = await sharp('public/textures/earth-bump.jpg')
    .resize(outWidth, outHeight)
    .grayscale()
    .raw()
    .toBuffer();

  const data = Buffer.alloc(outWidth * outHeight * 3);

  // Generate 85 tectonic plate centroids for global oceanic plate boundaries
  const platePoints = [];
  let sRng = 77112;
  function rnd() {
    sRng = (sRng * 9301 + 49297) % 233280;
    return sRng / 233280;
  }
  for (let i = 0; i < 90; i++) {
    const theta = rnd() * 2 * Math.PI;
    const phi = Math.asin(rnd() * 2.0 - 1.0);
    platePoints.push({
      x: Math.cos(phi) * Math.sin(theta),
      y: Math.sin(phi),
      z: Math.cos(phi) * Math.cos(theta),
    });
  }

  for (let py = 1; py < outHeight - 1; py++) {
    const lat = (0.5 - py / outHeight) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);

    for (let px = 0; px < outWidth; px++) {
      const lon = (px / outWidth) * 2 * Math.PI;
      const sx = cosLat * Math.sin(lon);
      const sy = sinLat;
      const sz = cosLat * Math.cos(lon);

      const pxLeft = (px - 1 + outWidth) % outWidth;
      const pxRight = (px + 1) % outWidth;

      const bCenter = bumpImg[py * outWidth + px];
      const bLeft = bumpImg[py * outWidth + pxLeft];
      const bRight = bumpImg[py * outWidth + pxRight];
      const bUp = bumpImg[(py - 1) * outWidth + px];
      const bDown = bumpImg[(py + 1) * outWidth + px];

      const gradX = Math.abs(bRight - bLeft);
      const gradY = Math.abs(bDown - bUp);
      const continentalRidge = Math.sqrt(gradX * gradX + gradY * gradY);
      const heightVal = bCenter / 255.0;

      // Find closest two tectonic plates for global oceanic fractures
      let maxDot1 = -Infinity;
      let maxDot2 = -Infinity;
      for (let i = 0; i < platePoints.length; i++) {
        const pp = platePoints[i];
        const dot = sx * pp.x + sy * pp.y + sz * pp.z;
        if (dot > maxDot1) {
          maxDot2 = maxDot1;
          maxDot1 = dot;
        } else if (dot > maxDot2) {
          maxDot2 = dot;
        }
      }

      const d1 = Math.acos(Math.min(1.0, Math.max(-1.0, maxDot1)));
      const d2 = Math.acos(Math.min(1.0, Math.max(-1.0, maxDot2)));
      const plateBoundaryDist = d2 - d1;

      // Turbulent fracture noise
      const turb = fbm3D(sx * 18.0, sy * 18.0, sz * 18.0, 3) * 0.022;
      const riftThickness = 0.028 + turb;

      let r = 0, g = 0, b = 0;

      // Check if pixel is on a continental mountain fault OR oceanic tectonic rift
      const isContinentalRift = continentalRidge > 18 && heightVal < 0.65;
      const isOceanicRift = plateBoundaryDist < riftThickness;

      if (isContinentalRift || isOceanicRift) {
        let heat = 0;
        if (isContinentalRift) {
          heat = Math.max(heat, Math.min(1.0, (continentalRidge - 18) / 32.0));
        }
        if (isOceanicRift) {
          heat = Math.max(heat, 1.0 - plateBoundaryDist / riftThickness);
        }

        if (heat > 0.7) {
          // White-gold magma center
          r = 255;
          g = Math.min(255, 160 + Math.round((heat - 0.7) * 200));
          b = Math.min(255, 30 + Math.round((heat - 0.7) * 300));
        } else if (heat > 0.3) {
          // Vivid incandescent orange lava
          r = 255;
          g = Math.round(70 + (heat - 0.3) * 180);
          b = 10;
        } else {
          // Fiery crimson rift edge
          r = Math.round(180 + heat * 160);
          g = Math.round(20 + heat * 100);
          b = 5;
        }
      } else {
        // Dark, solidified primordial basaltic crust (charcoal/obsidian rock)
        const rockNoise = fbm3D(sx * 22.0, sy * 22.0, sz * 22.0, 2) * 10;
        const darkBasalt = 32 + Math.round(heightVal * 32) + Math.round(rockNoise);
        r = Math.round(darkBasalt * 1.15);
        g = Math.round(darkBasalt * 0.92);
        b = Math.round(darkBasalt * 0.85);

        // Faint magma glow beneath thin oceanic crust
        if (plateBoundaryDist < riftThickness * 2.5) {
          const underglow = (1 - plateBoundaryDist / (riftThickness * 2.5)) * 40;
          r += Math.round(underglow);
          g += Math.round(underglow * 0.25);
        }
      }

      const idx = (py * outWidth + px) * 3;
      data[idx] = Math.min(255, r);
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.min(255, b);
    }
  }

  const outPath = path.resolve('public/textures/stage-04-cooling-sphere.jpg');
  await sharp(data, { raw: { width: outWidth, height: outHeight, channels: 3 } })
    .jpeg({ quality: 92 })
    .toFile(outPath);
  console.log(`Generated: ${outPath}`);
}

// ─────────────────────────────────────────────────────────────
// STAGE 05: WATER & PRIMORDIAL ATMOSPHERE (Archean Ocean World)
// Built directly using NASA's authentic Earth Albedo, Bump, & Real Clouds!
// ─────────────────────────────────────────────────────────────
async function generateStage05WaterWorld() {
  const albedoImg = await sharp('public/textures/earth-albedo.jpg')
    .resize(outWidth, outHeight)
    .raw()
    .toBuffer();

  const maskImg = await sharp('public/textures/earth-land-ocean-mask.png')
    .resize(outWidth, outHeight)
    .grayscale()
    .raw()
    .toBuffer();

  const cloudsImg = await sharp('public/textures/clouds-earth.png')
    .resize(outWidth, outHeight)
    .grayscale()
    .raw()
    .toBuffer();

  const data = Buffer.alloc(outWidth * outHeight * 3);

  for (let py = 0; py < outHeight; py++) {
    for (let px = 0; px < outWidth; px++) {
      const idx = (py * outWidth + px) * 3;
      const maskVal = maskImg[py * outWidth + px]; // 255 = land, 0 = ocean
      const cloudVal = cloudsImg[py * outWidth + px];

      const origR = albedoImg[idx];
      const origG = albedoImg[idx + 1];
      const origB = albedoImg[idx + 2];

      let r = 0, g = 0, b = 0;

      if (maskVal > 190) {
        // Archean Proto-Continents (Kaapvaal, Pilbara, Canadian Shield cratons)
        // Volcanic rock, granite, and iron-rich red-brown regolith (pre-vegetation)
        const lum = (origR * 0.3 + origG * 0.5 + origB * 0.2);
        r = Math.min(255, Math.round(lum * 0.72 + 28));
        g = Math.min(255, Math.round(lum * 0.62 + 20));
        b = Math.min(255, Math.round(lum * 0.52 + 16));
      } else {
        // Primordial Archean Ocean: deep cyan-blue / indigo water
        const oceanDepth = (255 - maskVal) / 255.0;
        r = Math.round(12 + (1 - oceanDepth) * 20);
        g = Math.round(55 + (1 - oceanDepth) * 60);
        b = Math.round(125 + (1 - oceanDepth) * 45);
      }

      // Blend real NASA atmospheric cloud patterns (steam & storms)
      if (cloudVal > 20) {
        const cloudDensity = (cloudVal / 255.0) * 0.55;
        r = Math.min(255, Math.round(r * (1 - cloudDensity) + 240 * cloudDensity));
        g = Math.min(255, Math.round(g * (1 - cloudDensity) + 245 * cloudDensity));
        b = Math.min(255, Math.round(b * (1 - cloudDensity) + 255 * cloudDensity));
      }

      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
    }
  }

  const outPath = path.resolve('public/textures/stage-05-water-sphere.jpg');
  await sharp(data, { raw: { width: outWidth, height: outHeight, channels: 3 } })
    .jpeg({ quality: 92 })
    .toFile(outPath);
  console.log(`Generated: ${outPath}`);
}

async function main() {
  console.log('Generating Stage 01: Solar Nebula...');
  await generateStage01Nebula();

  console.log('Generating Stage 02: Accretion (Cratered Proto-Earth)...');
  await generateStage02Accretion();

  console.log('Generating Stage 03: Early Earth Magma Ocean...');
  await generateStage03Magma();

  console.log('Generating Stage 04: Cooling & Crust (Tectonic Faults)...');
  await generateStage04CoolingCrust();

  console.log('Generating Stage 05: Water & Primordial Atmosphere...');
  await generateStage05WaterWorld();

  console.log('All 5 master planetary maps generated flawlessly!');
}

main().catch(console.error);
