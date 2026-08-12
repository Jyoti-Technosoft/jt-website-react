#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const rootDir = path.join(__dirname, "..");
const assetsDir = path.join(rootDir, "public", "assets");
const webpDir = path.join(assetsDir, "webp");
const avifDir = path.join(assetsDir, "avif");
const manifestPath = path.join(rootDir, "src", "imageManifest.json");
const reportPath = path.join(rootDir, "image-optimization-report.json");

const IMAGE_EXTENSIONS = /\.(png|jpe?g)$/i;
const SKIP_SEGMENTS = new Set(["webp", "avif"]);
const RESPONSIVE_WIDTHS = [360, 640, 960, 1280, 1600];
const RESPONSIVE_MIN_SIZE = 80 * 1024;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function getImages(dir, images = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(assetsDir, fullPath);
    const firstSegment = relativePath.split(path.sep)[0];

    if (item.isDirectory()) {
      if (!SKIP_SEGMENTS.has(item.name.toLowerCase())) {
        getImages(fullPath, images);
      }
      continue;
    }

    if (item.isFile() && IMAGE_EXTENSIONS.test(item.name) && !SKIP_SEGMENTS.has(firstSegment)) {
      images.push({
        fullPath,
        relativePath,
        originalSize: fs.statSync(fullPath).size,
      });
    }
  }

  return images;
}

function toAssetPath(filePath) {
  return filePath.split(path.sep).join("/");
}

async function convertImage(image) {
  const outputRelative = image.relativePath.replace(IMAGE_EXTENSIONS, "");
  const webpRelative = `${outputRelative}.webp`;
  const avifRelative = `${outputRelative}.avif`;
  const webpPath = path.join(webpDir, webpRelative);
  const avifPath = path.join(avifDir, avifRelative);

  ensureDir(path.dirname(webpPath));
  ensureDir(path.dirname(avifPath));

  const source = sharp(image.fullPath, { failOn: "none" }).rotate();
  const metadata = await source.metadata();

  await Promise.all([
    source.clone().webp({ quality: 78, effort: 6 }).toFile(webpPath),
    source.clone().avif({ quality: 50, effort: 6 }).toFile(avifPath),
  ]);

  const webpSize = fs.statSync(webpPath).size;
  const avifSize = fs.statSync(avifPath).size;
  const srcSet = {
    webp: [],
    avif: [],
  };

  if (image.originalSize >= RESPONSIVE_MIN_SIZE && metadata.width) {
    const widths = RESPONSIVE_WIDTHS.filter((width) => width < metadata.width);

    for (const width of widths) {
      const webpVariantRelative = `${outputRelative}-${width}w.webp`;
      const avifVariantRelative = `${outputRelative}-${width}w.avif`;
      const webpVariantPath = path.join(webpDir, webpVariantRelative);
      const avifVariantPath = path.join(avifDir, avifVariantRelative);

      ensureDir(path.dirname(webpVariantPath));
      ensureDir(path.dirname(avifVariantPath));

      await Promise.all([
        source
          .clone()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 76, effort: 5 })
          .toFile(webpVariantPath),
        source
          .clone()
          .resize({ width, withoutEnlargement: true })
          .avif({ quality: 48, effort: 5 })
          .toFile(avifVariantPath),
      ]);

      srcSet.webp.push(`/assets/webp/${toAssetPath(webpVariantRelative)} ${width}w`);
      srcSet.avif.push(`/assets/avif/${toAssetPath(avifVariantRelative)} ${width}w`);
    }
  }

  srcSet.webp.push(`/assets/webp/${toAssetPath(webpRelative)} ${metadata.width || 1600}w`);
  srcSet.avif.push(`/assets/avif/${toAssetPath(avifRelative)} ${metadata.width || 1600}w`);

  return {
    original: toAssetPath(image.relativePath),
    webp: `webp/${toAssetPath(webpRelative)}`,
    avif: `avif/${toAssetPath(avifRelative)}`,
    webpSrcSet: srcSet.webp.join(", "),
    avifSrcSet: srcSet.avif.join(", "),
    width: metadata.width || null,
    height: metadata.height || null,
    size: image.originalSize,
    webpSize,
    avifSize,
  };
}

async function main() {
  ensureDir(webpDir);
  ensureDir(avifDir);

  const images = getImages(assetsDir);
  const manifest = {};
  const stats = {
    total: images.length,
    processed: 0,
    webpCreated: 0,
    avifCreated: 0,
    errors: 0,
    originalSize: images.reduce((total, image) => total + image.originalSize, 0),
    optimizedSize: 0,
  };

  console.log(`Found ${images.length} PNG/JPEG images.`);

  for (const image of images) {
    try {
      const entry = await convertImage(image);
      manifest[entry.original] = entry;
      stats.processed += 1;
      stats.webpCreated += 1;
      stats.avifCreated += 1;
      stats.optimizedSize += Math.min(entry.webpSize, entry.avifSize);

      const bestSize = Math.min(entry.webpSize, entry.avifSize);
      const savings = ((image.originalSize - bestSize) / image.originalSize) * 100;
      console.log(`${entry.original}: ${savings.toFixed(1)}% smaller`);
    } catch (error) {
      stats.errors += 1;
      console.warn(`Failed to optimize ${image.relativePath}: ${error.message}`);
    }
  }

  const totalSavings = stats.originalSize - stats.optimizedSize;
  const savingsPercent = stats.originalSize ? (totalSavings / stats.originalSize) * 100 : 0;

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  fs.writeFileSync(
    reportPath,
    `${JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        stats,
        savings: {
          total: totalSavings,
          percent: Number(savingsPercent.toFixed(1)),
        },
      },
      null,
      2
    )}\n`
  );

  console.log(`Manifest written to ${path.relative(rootDir, manifestPath)}`);
  console.log(`Best-format savings: ${savingsPercent.toFixed(1)}%`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
