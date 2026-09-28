const sharp = require('sharp');

async function prepareMapStageGraphic() {
  const input = sharp('public/images/india-3d-map-raw.png');
  const metadata = await input.metadata();
  const { width, height } = metadata; // 680x740

  // Apply a subtle vignette mask around the perimeter of the 680x740 image so the corners and edges fade seamlessly
  const vignetteMask = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="stageVignette" cx="48%" cy="50%" r="52%">
          <stop offset="70%" stop-color="#000000" stop-opacity="0" />
          <stop offset="90%" stop-color="#04090c" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#04090c" stop-opacity="1" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#stageVignette)" />
    </svg>
  `);

  await input
    .modulate({ brightness: 1.05, saturation: 1.15 })
    .sharpen({ sigma: 1.2, m1: 1.3, m2: 0.5 })
    .composite([{ input: vignetteMask, left: 0, top: 0 }])
    .png({ quality: 95 })
    .toFile('public/images/india-3d-map-stage.png');

  console.log('Saved public/images/india-3d-map-stage.png');
}

prepareMapStageGraphic();
