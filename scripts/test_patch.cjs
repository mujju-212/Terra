const sharp = require('sharp');
const fs = require('fs');

async function testKrishnaPatch() {
  const crop = sharp('public/images/debug-map-crop.jpg');
  
  const patchSvg = Buffer.from(`
    <svg width="170" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="feather" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stop-color="#db5622" stop-opacity="1" />
          <stop offset="85%" stop-color="#e0622a" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#d8501c" stop-opacity="0.8" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="170" height="60" rx="15" fill="url(#feather)" />
    </svg>
  `);
  
  await crop
    .composite([{ input: patchSvg, left: 220, top: 505 }])
    .toFile('public/images/test-patch-krishna.jpg');
    
  console.log('Saved test-patch-krishna.jpg');
}

testKrishnaPatch();
