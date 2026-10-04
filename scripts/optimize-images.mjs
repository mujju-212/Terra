import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Disable sharp file descriptor cache on Windows
sharp.cache(false);

const IMAGES_DIR = path.resolve('public/images');
const MAX_DIMENSION = 1920;

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const inputBuffer = await fs.readFile(filePath);
  const originalSize = inputBuffer.length;

  try {
    const meta = await sharp(inputBuffer).metadata();

    const needsResize = (meta.width && meta.width > MAX_DIMENSION) || (meta.height && meta.height > MAX_DIMENSION);
    const isLargeFile = originalSize > 180 * 1024; // > 180KB

    if (!needsResize && !isLargeFile) {
      return { skipped: true, originalSize, newSize: originalSize };
    }

    let pipeline = sharp(inputBuffer);
    if (needsResize) {
      pipeline = pipeline.resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    let optimizedBuffer;
    if (ext === '.jpg' || ext === '.jpeg') {
      optimizedBuffer = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    } else if (ext === '.png') {
      if (isLargeFile) {
        optimizedBuffer = await pipeline.png({ compressionLevel: 9, quality: 85, palette: true }).toBuffer();
      } else {
        optimizedBuffer = await pipeline.png({ compressionLevel: 9 }).toBuffer();
      }
    } else if (ext === '.webp') {
      optimizedBuffer = await pipeline.webp({ quality: 82, effort: 5 }).toBuffer();
    }

    if (optimizedBuffer && optimizedBuffer.length < originalSize) {
      await fs.writeFile(filePath, optimizedBuffer);
      return {
        optimized: true,
        originalSize,
        newSize: optimizedBuffer.length,
        saved: originalSize - optimizedBuffer.length,
        file: path.relative(IMAGES_DIR, filePath),
      };
    }

    return { skipped: true, originalSize, newSize: originalSize };
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
    return { error: true, originalSize, newSize: originalSize };
  }
}

async function run() {
  console.log('Scanning images in:', IMAGES_DIR);
  const files = await getFiles(IMAGES_DIR);
  console.log(`Found ${files.length} images to check.`);

  let totalOriginal = 0;
  let totalNew = 0;
  let optimizedCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const res = await optimizeImage(file);
    totalOriginal += res.originalSize;
    totalNew += res.newSize;
    if (res.optimized) {
      optimizedCount++;
      const savedMB = (res.saved / (1024 * 1024)).toFixed(2);
      if (res.saved > 300 * 1024) {
        console.log(`[${i + 1}/${files.length}] Optimized ${res.file}: ${(res.originalSize / (1024 * 1024)).toFixed(2)}MB -> ${(res.newSize / 1024).toFixed(1)}KB (-${savedMB}MB)`);
      }
    }
  }

  const origMB = (totalOriginal / (1024 * 1024)).toFixed(2);
  const newMB = (totalNew / (1024 * 1024)).toFixed(2);
  const diffMB = ((totalOriginal - totalNew) / (1024 * 1024)).toFixed(2);
  const pct = (((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1);

  console.log('\n--- Optimization Summary ---');
  console.log(`Images optimized: ${optimizedCount} / ${files.length}`);
  console.log(`Original total:   ${origMB} MB`);
  console.log(`Optimized total:  ${newMB} MB`);
  console.log(`Total saved:      ${diffMB} MB (${pct}% reduction)`);
}

run();
