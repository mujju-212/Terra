import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOpticalSunFlare() {
  const size = 1024;
  const cx = size * 0.5;
  const cy = size * 0.5;
  const data = Buffer.alloc(size * size * 4); // RGBA

  // Generate crisp optical starburst lens flare
  // Central white-hot core, 8-point primary diffraction spikes, 16 secondary spikes,
  // anamorphic horizontal streak, and crisp radial rays.
  for (let y = 0; y < size; y++) {
    const dy = y - cy;
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      let intensity = 0;

      // 1. Intense White-Hot Stellar Core (sharp exponential falloff)
      if (dist < 45) {
        intensity += Math.pow(Math.max(0, 1 - dist / 45), 2.2) * 2.8;
      }
      if (dist < 120) {
        intensity += Math.pow(Math.max(0, 1 - dist / 120), 3.0) * 1.2;
      }

      // 2. Optical Corona (warm solar glow)
      if (dist < 360) {
        intensity += Math.pow(Math.max(0, 1 - dist / 360), 4.5) * 0.45;
      }

      // 3. Crisp Optical Diffraction Spikes (8-pointed primary starburst)
      // Spikes at 0, 45, 90, 135, 180, 225, 270, 315 degrees
      const spikeAngles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
      for (const sa of spikeAngles) {
        // Distance from pixel to spike line
        const normalDist = Math.abs(dx * Math.sin(sa) - dy * Math.cos(sa));
        const alongDist = Math.abs(dx * Math.cos(sa) + dy * Math.sin(sa));

        if (alongDist > 2 && alongDist < 480) {
          // Sharp width that tapers outwards
          const maxThickness = 3.5 * Math.max(0.1, 1 - alongDist / 500);
          if (normalDist < maxThickness) {
            const spikeIntensity = (1 - normalDist / maxThickness) * Math.pow(1 - alongDist / 500, 1.8) * 1.6;
            intensity += spikeIntensity;
          }
        }
      }

      // 4. Secondary fine solar rays (subtle high-frequency starburst)
      const rayFactor = Math.pow(Math.cos(angle * 12 + 0.3), 32);
      if (rayFactor > 0.1 && dist < 420 && dist > 15) {
        intensity += rayFactor * (1 - dist / 420) * 0.35;
      }

      // 5. Anamorphic Horizontal Flare Streak (cinematic sci-fi lens flare)
      const anamorphicNormal = Math.abs(dy);
      const anamorphicAlong = Math.abs(dx);
      if (anamorphicAlong < 500 && anamorphicNormal < 4) {
        const streak = (1 - anamorphicNormal / 4) * Math.pow(1 - anamorphicAlong / 500, 1.5) * 0.85;
        intensity += streak;
      }

      // Color mapping: Core = Pure White (#ffffff), Mid = Solar Gold (#ffd060), Edge = Deep Amber (#ff7711)
      let r = 0, g = 0, b = 0, a = 0;
      if (intensity > 0.001) {
        const val = Math.min(intensity, 3.0);
        if (val > 1.0) {
          // Blinding white-hot core
          r = 255;
          g = Math.min(255, Math.round(230 + (val - 1.0) * 25));
          b = Math.min(255, Math.round(180 + (val - 1.0) * 75));
          a = 255;
        } else {
          // Golden amber falloff
          r = Math.min(255, Math.round(val * 255));
          g = Math.min(255, Math.round(val * val * 210));
          b = Math.min(255, Math.round(Math.pow(val, 3) * 120));
          a = Math.min(255, Math.round(val * 255));
        }
      }

      const idx = (y * size + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = a;
    }
  }

  const outPath = path.resolve('public/images/sun-flare-optical.png');
  await sharp(data, {
    raw: { width: size, height: size, channels: 4 }
  })
    .png()
    .toFile(outPath);

  console.log(`Generated optical lens flare: ${outPath}`);
}

async function generateSpaceStarfield() {
  const width = 1920;
  const height = 1080;
  const data = Buffer.alloc(width * height * 3);

  // Generate deep black cosmic starfield with realistic stellar distribution
  // Pseudo-random deterministic stars
  let seed = 42;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Deep space base gradient: pitch black on bottom left, subtle cosmic navy on upper right
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const ny = y / height;
      const distFromTopRight = Math.sqrt(Math.pow(1 - nx, 2) + Math.pow(ny, 2));

      // Subtle celestial nebula haze in upper right
      const nebula = Math.max(0, 1 - distFromTopRight / 1.3);
      const r = Math.round(nebula * 12);
      const g = Math.round(nebula * 18);
      const b = Math.round(nebula * 32);

      const idx = (y * width + x) * 3;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
    }
  }

  // Scatter ~1200 realistic pinpoint stars
  const starCount = 1200;
  for (let i = 0; i < starCount; i++) {
    const sx = Math.floor(random() * width);
    const sy = Math.floor(random() * height);
    const brightness = Math.pow(random(), 3.5); // Most stars are faint, few are bright

    if (brightness > 0.05) {
      const starColor = random();
      let sr = 255, sg = 255, sb = 255;
      if (starColor < 0.2) {
        // Warm gold star
        sr = 255; sg = 220; sb = 170;
      } else if (starColor < 0.4) {
        // Blue giant star
        sr = 180; sg = 210; sb = 255;
      }

      const idx = (sy * width + sx) * 3;
      data[idx] = Math.min(255, data[idx] + Math.round(brightness * sr));
      data[idx + 1] = Math.min(255, data[idx + 1] + Math.round(brightness * sg));
      data[idx + 2] = Math.min(255, data[idx + 2] + Math.round(brightness * sb));

      // Faint star glow for brighter stars
      if (brightness > 0.6) {
        const neighbors = [
          [-1, 0], [1, 0], [0, -1], [0, 1]
        ];
        for (const [ox, oy] of neighbors) {
          const nx = sx + ox;
          const ny = sy + oy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nidx = (ny * width + nx) * 3;
            data[nidx] = Math.min(255, data[nidx] + Math.round(brightness * 0.3 * sr));
            data[nidx + 1] = Math.min(255, data[nidx + 1] + Math.round(brightness * 0.3 * sg));
            data[nidx + 2] = Math.min(255, data[nidx + 2] + Math.round(brightness * 0.3 * sb));
          }
        }
      }
    }
  }

  const outPath = path.resolve('public/images/space-starfield-bg.jpg');
  await sharp(data, {
    raw: { width, height, channels: 3 }
  })
    .jpeg({ quality: 92 })
    .toFile(outPath);

  console.log(`Generated space starfield: ${outPath}`);
}

async function generateCinematicSpaceBackground() {
  const width = 2560;
  const height = 1440;
  const data = Buffer.alloc(width * height * 3);

  // Sun coordinates: top right corner (approx 88% x, 12% y)
  const sunX = width * 0.86;
  const sunY = height * 0.14;

  let seed = 77;
  function random() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Pre-generate ~1800 stars
  const stars = [];
  for (let i = 0; i < 1800; i++) {
    stars.push({
      x: Math.floor(random() * width),
      y: Math.floor(random() * height),
      brightness: Math.pow(random(), 3.8),
      colorType: random(),
    });
  }

  // 16 primary ray angles for natural optical diffraction
  const primaryAngles = [
    0, Math.PI / 8, Math.PI / 4, (3 * Math.PI) / 8,
    Math.PI / 2, (5 * Math.PI) / 8, (3 * Math.PI) / 4, (7 * Math.PI) / 8,
    Math.PI, (9 * Math.PI) / 8, (5 * Math.PI) / 4, (11 * Math.PI) / 8,
    (3 * Math.PI) / 2, (13 * Math.PI) / 8, (7 * Math.PI) / 4, (15 * Math.PI) / 8
  ];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - sunX;
      const dy = y - sunY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Deep space base: pitch black on bottom left
      let r = 3;
      let g = 4;
      let b = 8;

      // Subtle celestial nebula gradient near the sun
      if (dist < 1800) {
        const nebulaFactor = Math.pow(1 - dist / 1800, 2.5);
        r += Math.round(nebulaFactor * 24);
        g += Math.round(nebulaFactor * 22);
        b += Math.round(nebulaFactor * 38);
      }

      // ── Optical Sun and Rays ──
      let sunIntensity = 0;

      // 1. Blinding White-Hot Stellar Core
      if (dist < 40) {
        sunIntensity += Math.pow(1 - dist / 40, 2.0) * 4.5;
      }
      if (dist < 90) {
        sunIntensity += Math.pow(1 - dist / 90, 2.5) * 2.0;
      }

      // 2. Solar Corona Halo
      if (dist < 320) {
        sunIntensity += Math.pow(1 - dist / 320, 3.2) * 0.85;
      }
      if (dist < 750) {
        sunIntensity += Math.pow(1 - dist / 750, 4.0) * 0.35;
      }

      // 3. Crisp Optical Diffraction Spikes (Sharp starburst rays)
      for (let i = 0; i < primaryAngles.length; i++) {
        const sa = primaryAngles[i];
        const normalDist = Math.abs(dx * Math.sin(sa) - dy * Math.cos(sa));
        const alongDist = Math.abs(dx * Math.cos(sa) + dy * Math.sin(sa));

        // Major spikes (every 45 deg) reach further, minor spikes are shorter
        const isMajor = (i % 2 === 0);
        const maxLen = isMajor ? 1200 : 650;
        const maxThickness = (isMajor ? 4.0 : 2.2) * Math.max(0.05, 1 - alongDist / maxLen);

        if (alongDist > 5 && alongDist < maxLen && normalDist < maxThickness) {
          const spikeInt = (1 - normalDist / maxThickness) * Math.pow(1 - alongDist / maxLen, 1.8) * (isMajor ? 1.5 : 0.8);
          sunIntensity += spikeInt;
        }
      }

      // 4. Volumetric Solar God Rays (subtle diagonal shafts of light pointing down-left)
      // Rays pointing southwest (angle between 2.0 and 2.9 rad)
      const rayFreq = Math.sin(angle * 36) * Math.cos(angle * 14 + 1.2);
      if (rayFreq > 0.2 && dist < 1400 && dist > 30) {
        // Boost rays pointing down and to the left
        const dirWeight = (dx < 0 && dy > 0) ? 1.3 : 0.6;
        const rayInt = Math.pow(rayFreq, 2.5) * Math.pow(1 - dist / 1400, 1.6) * 0.45 * dirWeight;
        sunIntensity += rayInt;
      }

      // 5. Cinematic Anamorphic Horizontal Flare
      const anamorphNormal = Math.abs(dy);
      const anamorphAlong = Math.abs(dx);
      if (anamorphAlong < 1100 && anamorphNormal < 5.5) {
        const streak = (1 - anamorphNormal / 5.5) * Math.pow(1 - anamorphAlong / 1100, 1.4) * 0.95;
        sunIntensity += streak;
      }

      // Color mapping for sun illumination
      if (sunIntensity > 0.002) {
        if (sunIntensity >= 1.0) {
          // Blinding white-hot core
          r = 255;
          g = Math.min(255, Math.round(240 + Math.min(15, (sunIntensity - 1.0) * 15)));
          b = Math.min(255, Math.round(200 + Math.min(55, (sunIntensity - 1.0) * 55)));
        } else {
          // Golden radiant falloff
          r = Math.min(255, r + Math.round(sunIntensity * 255));
          g = Math.min(255, g + Math.round(Math.pow(sunIntensity, 1.2) * 220));
          b = Math.min(255, b + Math.round(Math.pow(sunIntensity, 2.2) * 140));
        }
      }

      const idx = (y * width + x) * 3;
      data[idx] = Math.min(255, r);
      data[idx + 1] = Math.min(255, g);
      data[idx + 2] = Math.min(255, b);
    }
  }

  // Draw pinpoint stars
  for (const st of stars) {
    if (st.brightness > 0.04) {
      // Don't draw stars inside the bright sun corona
      const dx = st.x - sunX;
      const dy = st.y - sunY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) continue;

      let sr = 255, sg = 255, sb = 255;
      if (st.colorType < 0.25) {
        sr = 255; sg = 215; sb = 160; // warm star
      } else if (st.colorType < 0.45) {
        sr = 175; sg = 210; sb = 255; // cool blue star
      }

      const idx = (st.y * width + st.x) * 3;
      data[idx] = Math.min(255, data[idx] + Math.round(st.brightness * sr));
      data[idx + 1] = Math.min(255, data[idx + 1] + Math.round(st.brightness * sg));
      data[idx + 2] = Math.min(255, data[idx + 2] + Math.round(st.brightness * sb));
    }
  }

  const outPath = path.resolve('public/images/space-formation-bg.jpg');
  await sharp(data, {
    raw: { width, height, channels: 3 }
  })
    .jpeg({ quality: 94 })
    .toFile(outPath);

  console.log(`Generated cinematic space formation background: ${outPath}`);
}

async function main() {
  await generateCinematicSpaceBackground();
}

main().catch(console.error);

