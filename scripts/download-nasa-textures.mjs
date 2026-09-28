import fs from 'fs';
import path from 'path';
import https from 'https';

const textures = [
  {
    name: 'earth-night.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Solarsystemscope_texture_8k_earth_nightmap.jpg',
  },
  {
    name: 'earth-clouds.jpg',
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Solarsystemscope_texture_8k_earth_clouds.jpg/3840px-Solarsystemscope_texture_8k_earth_clouds.jpg',
  },
];

const destDir = path.resolve('public/images');

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'TerraEducationalFieldGuide/1.0 (academic-conservation-project@bcv755b.edu; contact@hkbk.edu)',
        'Accept': 'image/jpeg,image/png,image/*,*/*',
      },
    };

    function get(currentUrl) {
      https.get(currentUrl, options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`Failed to download ${currentUrl}: HTTP ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(dest));
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }

    get(url);
  });
}

async function run() {
  for (const t of textures) {
    const target = path.join(destDir, t.name);
    console.log(`Downloading ${t.name}...`);
    try {
      await download(t.url, target);
      const stat = fs.statSync(target);
      console.log(`✓ ${t.name} downloaded (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      console.error(`Error downloading ${t.name}:`, err.message);
    }
    await wait(2500);
  }
}

run();
