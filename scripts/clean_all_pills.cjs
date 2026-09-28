const sharp = require('sharp');
const fs = require('fs');

async function cleanFullImage() {
  const inputPath = 'public/images/water-ch04-rivers-bg.jpg';
  const img = sharp(inputPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const buffer = Buffer.from(data);

  function getPixel(x, y) {
    const idx = (y * width + x) * channels;
    return [buffer[idx], buffer[idx + 1], buffer[idx + 2]];
  }

  function setPixel(x, y, r, g, b) {
    const idx = (y * width + x) * channels;
    buffer[idx] = Math.round(Math.min(255, Math.max(0, r)));
    buffer[idx + 1] = Math.round(Math.min(255, Math.max(0, g)));
    buffer[idx + 2] = Math.round(Math.min(255, Math.max(0, b)));
  }

  // Exact coordinates of the 6 pills in 1920x1080:
  const pillBoxes = [
    { name: 'Indus', x1: 915, y1: 292, x2: 1055, y2: 335 },
    { name: 'Ganga', x1: 1150, y1: 340, x2: 1300, y2: 386 },
    { name: 'Brahmaputra', x1: 1320, y1: 320, x2: 1485, y2: 360 },
    { name: 'Godavari', x1: 1005, y1: 462, x2: 1165, y2: 506 },
    { name: 'Krishna', x1: 1025, y1: 564, x2: 1175, y2: 606 },
    { name: 'Cauvery', x1: 1062, y1: 652, x2: 1210, y2: 696 },
  ];

  for (const box of pillBoxes) {
    const { x1, y1, x2, y2 } = box;
    const boxH = y2 - y1;
    const boxW = x2 - x1;

    for (let y = y1; y <= y2; y++) {
      const vWeight = (y - y1) / boxH; // 0 at top, 1 at bottom
      for (let x = x1; x <= x2; x++) {
        const hWeight = (x - x1) / boxW; // 0 at left, 1 at right

        // Top sample (above the pill)
        const topY = Math.max(0, y1 - 4 - ((x + y) % 3));
        const [tr, tg, tb] = getPixel(x, topY);

        // Bottom sample (below the pill)
        const botY = Math.min(height - 1, y2 + 4 + ((x + y) % 3));
        const [br, bg, bb] = getPixel(x, botY);

        // Left sample
        const leftX = Math.max(0, x1 - 4 - ((x + y) % 3));
        const [lr, lg, lb] = getPixel(leftX, y);

        // Right sample
        const rightX = Math.min(width - 1, x2 + 4 + ((x + y) % 3));
        const [rr, rg, rb] = getPixel(rightX, y);

        // Vertical interpolation
        const vr = tr * (1 - vWeight) + br * vWeight;
        const vg = tg * (1 - vWeight) + bg * vWeight;
        const vb = tb * (1 - vWeight) + bb * vWeight;

        // Horizontal interpolation
        const hr = lr * (1 - hWeight) + rr * hWeight;
        const hg = lg * (1 - hWeight) + rg * hWeight;
        const hb = lb * (1 - hWeight) + rb * hWeight;

        // Subtle relief noise (±3) to match terrain texture
        const noise = ((x * 17 + y * 31) % 7) - 3;

        // Blend 75% vertical (gradient follows north-south slope), 25% horizontal
        const finalR = vr * 0.75 + hr * 0.25 + noise;
        const finalG = vg * 0.75 + hg * 0.25 + noise;
        const finalB = vb * 0.75 + hb * 0.25 + noise;

        setPixel(x, y, finalR, finalG, finalB);
      }
    }
  }

  // Also remove ghost text on the left (x: 0 to 760) and bottom (y: 820 to 1080)
  // by compositing smooth dark gradients (#04090c)
  const gradientMask = Buffer.from(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leftMask" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="38%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="46%" stop-color="#04090c" stop-opacity="0.95" />
          <stop offset="52%" stop-color="#04090c" stop-opacity="0.6" />
          <stop offset="58%" stop-color="#04090c" stop-opacity="0" />
        </linearGradient>

        <linearGradient id="bottomMask" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="16%" stop-color="#04090c" stop-opacity="0.95" />
          <stop offset="25%" stop-color="#04090c" stop-opacity="0.6" />
          <stop offset="35%" stop-color="#04090c" stop-opacity="0" />
        </linearGradient>

        <linearGradient id="topMask" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="8%" stop-color="#04090c" stop-opacity="0.8" />
          <stop offset="16%" stop-color="#04090c" stop-opacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1920" height="1080" fill="url(#leftMask)" />
      <rect x="0" y="0" width="1920" height="1080" fill="url(#bottomMask)" />
      <rect x="0" y="0" width="1920" height="1080" fill="url(#topMask)" />
    </svg>
  `);

  const intermediate = sharp(buffer, { raw: { width, height, channels } });
  
  await intermediate
    .composite([{ input: gradientMask, left: 0, top: 0 }])
    .sharpen({ sigma: 1.2, m1: 1.1, m2: 0.5 })
    .jpeg({ quality: 96 })
    .toFile('public/images/water-ch04-rivers-master.jpg');

  console.log('Saved water-ch04-rivers-master.jpg with ALL pills removed!');
}

cleanFullImage();
