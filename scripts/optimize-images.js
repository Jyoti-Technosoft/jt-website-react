#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if sharp is available, if not, install it
function ensureSharp() {
  try {
    require('sharp');
    console.log('✅ Sharp is available');
  } catch (error) {
    console.log('📦 Installing sharp for image optimization...');
    try {
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      console.log('✅ Sharp installed successfully');
    } catch (installError) {
      console.error('❌ Failed to install sharp. Please install manually: npm install sharp --save-dev');
      process.exit(1);
    }
  }
}

function convertImagesToWebP() {
  const sharp = require('sharp');
  const assetsDir = path.join(__dirname, 'public', 'assets');
  const outputDir = path.join(__dirname, 'public', 'assets', 'webp');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Create corresponding directory in webp folder
        const relativePath = path.relative(assetsDir, itemPath);
        const webpDir = path.join(outputDir, relativePath);
        if (!fs.existsSync(webpDir)) {
          fs.mkdirSync(webpDir, { recursive: true });
        }
        processDirectory(itemPath);
      } else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(item)) {
        const relativePath = path.relative(assetsDir, itemPath);
        const webpPath = path.join(outputDir, relativePath.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        
        try {
          console.log(`Converting: ${relativePath} → ${path.relative(outputDir, webpPath)}`);
          
          sharp(itemPath)
            .webp({ 
              quality: 80,
              effort: 6,
              lossless: false
            })
            .toFile(webpPath)
            .then(() => {
              const originalSize = fs.statSync(itemPath).size;
              const webpSize = fs.statSync(webpPath).size;
              const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
              console.log(`✅ Saved ${savings}% (${originalSize} → ${webpSize} bytes)`);
            })
            .catch(error => {
              console.error(`❌ Failed to convert ${relativePath}:`, error.message);
            });
        } catch (error) {
          console.error(`❌ Error processing ${relativePath}:`, error.message);
        }
      }
    });
  }

  console.log('🖼️  Starting image conversion to WebP...');
  processDirectory(assetsDir);
  console.log('✅ Image conversion completed!');
}

function generateImageManifest() {
  const assetsDir = path.join(__dirname, 'public', 'assets');
  const webpDir = path.join(__dirname, 'public', 'assets', 'webp');
  const manifest = {};
  
  function scanDirectory(dir, baseDir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath, baseDir);
      } else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(item)) {
        const relativePath = path.relative(baseDir, itemPath);
        const webpPath = relativePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        
        // Check if WebP version exists
        const webpFullPath = path.join(webpDir, webpPath);
        if (fs.existsSync(webpFullPath)) {
          manifest[relativePath] = webpPath;
        }
      }
    });
  }
  
  scanDirectory(assetsDir, assetsDir);
  
  const manifestPath = path.join(__dirname, 'src', 'imageManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('📋 Image manifest generated:', manifestPath);
}

// Main execution
console.log('🚀 Starting image optimization process...');
ensureSharp();
convertImagesToWebP();

// Wait a bit for async operations to complete
setTimeout(() => {
  generateImageManifest();
  console.log('🎉 Image optimization completed!');
}, 2000);
