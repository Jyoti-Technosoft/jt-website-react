#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateImageConversionGuide() {
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  const manifestPath = path.join(__dirname, '..', 'src', 'imageManifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    console.log('❌ Image manifest not found. Please run npm run optimize:images first.');
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const imageFiles = Object.keys(manifest);
  
  console.log('🖼️  Image Conversion Guide');
  console.log('========================');
  console.log(`Found ${imageFiles.length} images to convert`);
  console.log('');
  
  // Group images by directory
  const imagesByDir = {};
  imageFiles.forEach(image => {
    const dir = path.dirname(image);
    if (!imagesByDir[dir]) {
      imagesByDir[dir] = [];
    }
    imagesByDir[dir].push(image);
  });

  console.log('📁 Images by directory:');
  Object.keys(imagesByDir).forEach(dir => {
    console.log(`\n${dir === '.' ? 'Root' : dir}:`);
    imagesByDir[dir].forEach(image => {
      const fullPath = path.join(assetsDir, image);
      const stats = fs.statSync(fullPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`  - ${path.basename(image)} (${sizeKB} KB)`);
    });
  });

  console.log('\n🛠️  Conversion Instructions:');
  console.log('============================');
  console.log('');
  console.log('1. **Online Tools (Recommended):**');
  console.log('   - Squoosh.app (Google) - Best quality');
  console.log('   - TinyPNG.com - Good compression');
  console.log('   - Convertio.co - Batch conversion');
  console.log('');
  console.log('2. **Command Line Tools (if available):**');
  console.log('   - cwebp for WebP conversion');
  console.log('   - avifenc for AVIF conversion');
  console.log('');
  console.log('3. **Target Formats:**');
  console.log('   - WebP: 80-85% quality');
  console.log('   - AVIF: 50-60% quality (better compression)');
  console.log('   - Keep original as fallback');
  console.log('');
  console.log('4. **File Organization:**');
  console.log('   - Place WebP files in: public/assets/webp/');
  console.log('   - Place AVIF files in: public/assets/avif/');
  console.log('   - Keep original files in: public/assets/');
  console.log('');
  console.log('5. **Expected Size Reduction:**');
  console.log('   - WebP: 25-35% smaller than PNG');
  console.log('   - AVIF: 50-70% smaller than PNG');
  console.log('   - Total expected savings: 15-25 MB');
  console.log('');
  console.log('6. **Implementation:**');
  console.log('   - Use ResponsiveImage component for automatic format selection');
  console.log('   - Update existing img tags to use ResponsiveImage');
  console.log('   - Test in different browsers for compatibility');
  console.log('');
  
  // Generate a batch conversion script for reference
  const batchScript = `#!/bin/bash
# Batch image conversion script (requires cwebp and avifenc)
# Install tools: sudo apt-get install webp libavif-tools

ASSETS_DIR="public/assets"
WEBP_DIR="public/assets/webp"
AVIF_DIR="public/assets/avif"

# Create directories
mkdir -p "$WEBP_DIR" "$AVIF_DIR"

# Convert to WebP
find "$ASSETS_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read file; do
  filename=$(basename "$file")
  name="\${filename%.*}"
  webp_file="$WEBP_DIR/$name.webp"
  
  echo "Converting to WebP: $filename"
  cwebp -q 80 "$file" -o "$webp_file"
done

# Convert to AVIF
find "$ASSETS_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read file; do
  filename=$(basename "$file")
  name="\${filename%.*}"
  avif_file="$AVIF_DIR/$name.avif"
  
  echo "Converting to AVIF: $filename"
  avifenc -c aom -s 6 -a end-usage=q -a cq-level=32 "$file" "$avif_file"
done

echo "Conversion complete!"
`;

  fs.writeFileSync(path.join(__dirname, '..', 'convert-images.sh'), batchScript);
  console.log('📝 Batch conversion script created: convert-images.sh');
  console.log('   Run: chmod +x convert-images.sh && ./convert-images.sh');
  console.log('');
  console.log('🎯 Next Steps:');
  console.log('1. Convert images using the tools above');
  console.log('2. Update components to use ResponsiveImage');
  console.log('3. Test the application');
  console.log('4. Run performance tests to measure improvements');
}

generateImageConversionGuide();
