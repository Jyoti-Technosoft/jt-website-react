#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple image optimization without Sharp
function optimizeImages() {
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  const outputDir = path.join(__dirname, '..', 'public', 'assets', 'optimized');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  const imageManifest = {};

  function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Skip if it's the output directory to prevent recursion
        if (itemPath === outputDir) {
          return;
        }
        // Create corresponding directory in optimized folder
        const relativePath = path.relative(assetsDir, itemPath);
        const optimizedDir = path.join(outputDir, relativePath);
        if (!fs.existsSync(optimizedDir)) {
          fs.mkdirSync(optimizedDir, { recursive: true });
        }
        processDirectory(itemPath);
      } else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(item)) {
        const relativePath = path.relative(assetsDir, itemPath);
        const optimizedPath = path.join(outputDir, relativePath);
        
        try {
          console.log(`Processing: ${relativePath}`);
          
          // For now, just copy the file and create a manifest
          // In a real scenario, you'd use a tool like imagemin or similar
          fs.copyFileSync(itemPath, optimizedPath);
          
          const originalSize = fs.statSync(itemPath).size;
          const optimizedSize = fs.statSync(optimizedPath).size;
          
          totalOriginalSize += originalSize;
          totalOptimizedSize += optimizedSize;
          processedCount++;
          
          // Create entry in manifest
          imageManifest[relativePath] = relativePath;
          
          console.log(`✅ Processed (${originalSize} bytes)`);
        } catch (error) {
          console.error(`❌ Failed to process ${relativePath}:`, error.message);
        }
      }
    });
  }

  console.log('🖼️  Starting simple image processing...');
  processDirectory(assetsDir);
  
  // Generate image manifest
  const manifestPath = path.join(__dirname, '..', 'src', 'imageManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(imageManifest, null, 2));
  
  console.log('📋 Image manifest generated:', manifestPath);
  console.log(`✅ Processed ${processedCount} images`);
  console.log(`📊 Total size: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
  console.log('🎉 Simple image processing completed!');
  console.log('');
  console.log('💡 Next steps:');
  console.log('1. Use an online tool like TinyPNG or Squoosh to convert PNG/JPG to WebP');
  console.log('2. Replace the optimized images with WebP versions');
  console.log('3. Update your components to use the OptimizedImageV2 component');
}

// Main execution
console.log('🚀 Starting simple image optimization...');
optimizeImages();
