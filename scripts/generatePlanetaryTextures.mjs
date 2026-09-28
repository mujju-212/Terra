import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outWidth = 2048;
const outHeight = 1024;

// Function to unwrap a circular planet image (square 1024x1024) into a 2048x1024 equirectangular map
async function unwrapPlanetImage(inputPath, outputPath, options = {}) {
  const { planetRadiusFraction = 0.445, brightness = 1.0, contrast = 1.0 } = options;
  
  const { data: srcData, info } = await sharp(inputPath)
    .resize(1024, 1024)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const srcW = info.width;
  const srcH = info.height;
  const cx = srcW * 0.5;
  const cy = srcH * 0.5;
  const radius = srcW * planetRadiusFraction;

  const dstData = Buffer.alloc(outWidth * outHeight * 3);

  for (let y = 0; y < outHeight; y++) {
    // Latitude from +PI/2 (North Pole) to -PI/2 (South Pole)
    const lat = (0.5 - y / outHeight) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);

    for (let x = 0; x < outWidth; x++) {
      // Longitude from -PI to +PI
      const lon = (x / outWidth - 0.5) * 2.0 * Math.PI;

      // 3D Cartesian coordinates on unit sphere
      const sphereX = cosLat * Math.sin(lon);
      const sphereY = sinLat;
      const sphereZ = cosLat * Math.cos(lon);

      // On facing hemisphere (sphereZ >= 0), map directly to image
      // On rear hemisphere (sphereZ < 0), mirror smoothly
      const effX = sphereZ >= 0 ? sphereX : -sphereX;

      const imgX = Math.round(cx + effX * radius);
      const imgY = Math.round(cy - sphereY * radius);

      const clampedX = Math.max(0, Math.min(srcW - 1, imgX));
      const clampedY = Math.max(0, Math.min(srcH - 1, imgY));

      const srcIdx = (clampedY * srcW + clampedX) * info.channels;
      const dstIdx = (y * outWidth + x) * 3;

      let r = srcData[srcIdx];
      let g = srcData[srcIdx + 1];
      let b = srcData[srcIdx + 2];

      if (brightness !== 1.0) {
        r = Math.min(255, Math.round(r * brightness));
        g = Math.min(255, Math.round(g * brightness));
        b = Math.min(255, Math.round(b * brightness));
      }

      dstData[dstIdx] = r;
      dstData[dstIdx + 1] = g;
      dstData[dstIdx + 2] = b;
    }
  }

  await sharp(dstData, {
    raw: {
      width: outWidth,
      height: outHeight,
      channels: 3,
    },
  })
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log(`Generated: ${outputPath}`);
}

async function run() {
  const publicTexturesDir = path.resolve('public/textures');
  if (!fs.existsSync(publicTexturesDir)) {
    fs.mkdirSync(publicTexturesDir, { recursive: true });
  }

  console.log('Unwrapping Stage 02: Accretion...');
  await unwrapPlanetImage(
    'public/images/stage-02-accretion.jpg',
    'public/textures/stage-02-accretion-sphere.jpg',
    { planetRadiusFraction: 0.45, brightness: 1.15 }
  );

  console.log('Unwrapping Stage 03: Early Earth Magma...');
  await unwrapPlanetImage(
    'public/images/stage-03-early-earth.jpg',
    'public/textures/stage-03-magma-sphere.jpg',
    { planetRadiusFraction: 0.44, brightness: 1.25 }
  );

  console.log('Unwrapping Stage 04: Cooling & Crust...');
  await unwrapPlanetImage(
    'public/images/stage-04-cooling.jpg',
    'public/textures/stage-04-cooling-sphere.jpg',
    { planetRadiusFraction: 0.445, brightness: 1.2 }
  );

  console.log('Unwrapping Stage 05: Water & Atmosphere...');
  await unwrapPlanetImage(
    'public/images/stage-05-water.jpg',
    'public/textures/stage-05-water-sphere.jpg',
    { planetRadiusFraction: 0.445, brightness: 1.1 }
  );

  console.log('All 4 earlier stage textures generated successfully in 2048x1024 2:1 equirectangular format!');
}

run().catch((err) => {
  console.error('Error generating textures:', err);
  process.exit(1);
});
