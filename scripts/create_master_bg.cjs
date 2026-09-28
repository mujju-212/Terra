const sharp = require('sharp');
const path = require('path');

async function createMasterBackground() {
  const inputPath = 'public/images/water-ch04-rivers-bg.jpg';
  const outputPath = 'public/images/water-ch04-rivers-master.jpg';

  // Create an SVG overlay to cleanly black out / gradient fade the ghost text on the left and bottom
  // Left side: x from 0 to 820 has ghost text from previous UI. We cover it with deep sleek dark gradient #04090c.
  // Bottom: y from 820 to 1080 has ghost stat cards. We fade it cleanly into #04090c.
  // Top: y from 0 to 120 has faint ghost header. We fade it cleanly into #04090c.
  // The map of India (x: 820 to 1600, y: 80 to 800) and scenery remain 100% visible, enhanced and sharp.
  const gradientMask = Buffer.from(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Horizontal gradient to mask left ghost text -->
        <linearGradient id="leftMask" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="38%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="46%" stop-color="#04090c" stop-opacity="0.95" />
          <stop offset="52%" stop-color="#04090c" stop-opacity="0.6" />
          <stop offset="58%" stop-color="#04090c" stop-opacity="0" />
        </linearGradient>

        <!-- Bottom gradient to mask bottom ghost cards -->
        <linearGradient id="bottomMask" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="18%" stop-color="#04090c" stop-opacity="0.95" />
          <stop offset="28%" stop-color="#04090c" stop-opacity="0.6" />
          <stop offset="38%" stop-color="#04090c" stop-opacity="0" />
        </linearGradient>

        <!-- Top gradient to mask top ghost headers -->
        <linearGradient id="topMask" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#04090c" stop-opacity="1" />
          <stop offset="10%" stop-color="#04090c" stop-opacity="0.8" />
          <stop offset="20%" stop-color="#04090c" stop-opacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1920" height="1080" fill="url(#leftMask)" />
      <rect x="0" y="0" width="1920" height="1080" fill="url(#bottomMask)" />
      <rect x="0" y="0" width="1920" height="1080" fill="url(#topMask)" />
    </svg>
  `);

  await sharp(inputPath)
    .modulate({ brightness: 1.04, saturation: 1.12 })
    .sharpen({ sigma: 1.2, m1: 1.2, m2: 0.5 })
    .composite([{ input: gradientMask, left: 0, top: 0 }])
    .jpeg({ quality: 96 })
    .toFile(outputPath);

  console.log('Created pristine master background:', outputPath);
}

createMasterBackground();
