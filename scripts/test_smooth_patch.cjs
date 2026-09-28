const sharp = require('sharp');

async function testSmoothPatch() {
  const inputPath = 'public/images/water-ch04-rivers-bg.jpg';
  
  // The 6 pill coordinates on water-ch04-rivers-bg.jpg (1920x1080):
  // Indus: x: 915, y: 295, w: 145, h: 42 -> Color: #1d91dc (sky blue relief)
  // Ganga: x: 1148, y: 342, w: 155, h: 44 -> Color: #29a341 (vibrant emerald green)
  // Brahmaputra: x: 1320, y: 320, w: 165, h: 42 -> Color: #802abf (royal purple)
  // Godavari: x: 1005, y: 462, w: 162, h: 45 -> Color: #db9117 (warm golden amber)
  // Krishna: x: 1025, y: 564, w: 155, h: 44 -> Color: #de5723 (vibrant orange-red)
  // Cauvery: x: 1062, y: 652, w: 150, h: 44 -> Color: #d73387 (deep rose pink)

  // Underneath Krishna pill, there was also a faint text "Krishna Basin" in the orange terrain around y: 610-630.
  // We can cover all 6 pills with custom SVGs that have:
  // - A radial/linear gradient that EXACTLY matches the terrain lighting
  // - Feathered gaussian-blur edges (feGaussianBlur stdDeviation="6") so there is ZERO visible boundary or seam!
  // - An alpha mask that perfectly fades into the surrounding terrain!
  
  const patchesSvg = Buffer.from(`
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <!-- Indus: Sky Blue -->
        <linearGradient id="indusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1b88cf" />
          <stop offset="50%" stop-color="#249ee8" />
          <stop offset="100%" stop-color="#1f93dd" />
        </linearGradient>

        <!-- Ganga: Emerald Green -->
        <linearGradient id="gangaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#259a3c" />
          <stop offset="50%" stop-color="#32b34a" />
          <stop offset="100%" stop-color="#289e40" />
        </linearGradient>

        <!-- Brahmaputra: Violet Purple -->
        <linearGradient id="brahmaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#7322b0" />
          <stop offset="50%" stop-color="#8b34cc" />
          <stop offset="100%" stop-color="#7c27bc" />
        </linearGradient>

        <!-- Godavari: Golden Amber -->
        <linearGradient id="godavariGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#d38914" />
          <stop offset="50%" stop-color="#e89e22" />
          <stop offset="100%" stop-color="#da9118" />
        </linearGradient>

        <!-- Krishna: Vibrant Orange -->
        <linearGradient id="krishnaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#d84e1b" />
          <stop offset="50%" stop-color="#eb632d" />
          <stop offset="100%" stop-color="#df5420" />
        </linearGradient>

        <!-- Cauvery: Rose Pink -->
        <linearGradient id="cauveryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#cc2c7e" />
          <stop offset="50%" stop-color="#e33e93" />
          <stop offset="100%" stop-color="#d33385" />
        </linearGradient>

        <!-- Ghost text masks on left, bottom, top -->
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
      </defs>

      <!-- Pill Terrain Patches with Soft Blurred Feathering -->
      <rect x="912" y="292" width="150" height="46" rx="20" fill="url(#indusGrad)" filter="url(#soft)" />
      <rect x="916" y="296" width="142" height="38" rx="16" fill="url(#indusGrad)" />

      <rect x="1145" y="338" width="160" height="48" rx="20" fill="url(#gangaGrad)" filter="url(#soft)" />
      <rect x="1150" y="342" width="150" height="40" rx="16" fill="url(#gangaGrad)" />

      <rect x="1318" y="318" width="170" height="46" rx="20" fill="url(#brahmaGrad)" filter="url(#soft)" />
      <rect x="1322" y="322" width="162" height="38" rx="16" fill="url(#brahmaGrad)" />

      <rect x="1002" y="458" width="168" height="50" rx="20" fill="url(#godavariGrad)" filter="url(#soft)" />
      <rect x="1006" y="462" width="160" height="42" rx="16" fill="url(#godavariGrad)" />

      <rect x="1022" y="560" width="162" height="52" rx="20" fill="url(#krishnaGrad)" filter="url(#soft)" />
      <rect x="1026" y="564" width="154" height="44" rx="16" fill="url(#krishnaGrad)" />

      <rect x="1058" y="648" width="158" height="50" rx="20" fill="url(#cauveryGrad)" filter="url(#soft)" />
      <rect x="1062" y="652" width="150" height="42" rx="16" fill="url(#cauveryGrad)" />

      <!-- Left and Bottom background scrims to mask ghost text -->
      <rect x="0" y="0" width="1920" height="1080" fill="url(#leftMask)" />
      <rect x="0" y="0" width="1920" height="1080" fill="url(#bottomMask)" />
    </svg>
  `);

  await sharp(inputPath)
    .composite([{ input: patchesSvg, left: 0, top: 0 }])
    .sharpen({ sigma: 1.2, m1: 1.2, m2: 0.5 })
    .jpeg({ quality: 96 })
    .toFile('public/images/water-ch04-rivers-master.jpg');

  console.log('Saved seamless master background!');
}

testSmoothPatch();
