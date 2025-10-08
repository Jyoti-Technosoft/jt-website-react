#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Enhanced image optimization script
class EnhancedImageOptimizer {
  constructor() {
    this.assetsDir = path.join(__dirname, '..', 'public', 'assets');
    this.webpDir = path.join(__dirname, '..', 'public', 'assets', 'webp');
    this.avifDir = path.join(__dirname, '..', 'public', 'assets', 'avif');
    this.manifestPath = path.join(__dirname, '..', 'src', 'imageManifest.json');
    this.stats = {
      total: 0,
      processed: 0,
      webpCreated: 0,
      avifCreated: 0,
      errors: 0,
      originalSize: 0,
      optimizedSize: 0
    };
  }

  // Check if command line tools are available
  checkTools() {
    const tools = {
      cwebp: false,
      avifenc: false,
      imagemagick: false
    };

    try {
      execSync('cwebp -version', { stdio: 'ignore' });
      tools.cwebp = true;
    } catch (e) {
      console.log('⚠️  cwebp not found - WebP conversion will be skipped');
    }

    try {
      execSync('avifenc -V', { stdio: 'ignore' });
      tools.avifenc = true;
    } catch (e) {
      console.log('⚠️  avifenc not found - AVIF conversion will be skipped');
    }

    try {
      execSync('convert -version', { stdio: 'ignore' });
      tools.imagemagick = true;
    } catch (e) {
      console.log('⚠️  ImageMagick not found - fallback conversion will be skipped');
    }

    return tools;
  }

  // Create directories
  createDirectories() {
    [this.webpDir, this.avifDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${path.relative(process.cwd(), dir)}`);
      }
    });
  }

  // Get image files
  getImageFiles() {
    const imageFiles = [];
    
    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          scanDirectory(itemPath);
        } else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(item)) {
          const relativePath = path.relative(this.assetsDir, itemPath);
          imageFiles.push({
            fullPath: itemPath,
            relativePath: relativePath,
            size: stat.size,
            name: item,
            baseName: item.replace(/\.(png|jpg|jpeg)$/i, ''),
            extension: (item.match(/\.(png|jpg|jpeg)$/i) && item.match(/\.(png|jpg|jpeg)$/i)[1]) || 'png'
          });
        }
      });
    };

    scanDirectory(this.assetsDir);
    return imageFiles;
  }

  // Convert to WebP using cwebp
  convertToWebP(imageFile, tools) {
    if (!tools.cwebp) return false;

    const webpPath = path.join(this.webpDir, `${imageFile.baseName}.webp`);
    
    try {
      execSync(`cwebp -q 80 -m 6 "${imageFile.fullPath}" -o "${webpPath}"`, { stdio: 'pipe' });
      
      if (fs.existsSync(webpPath)) {
        const webpSize = fs.statSync(webpPath).size;
        const savings = ((imageFile.size - webpSize) / imageFile.size * 100).toFixed(1);
        console.log(`✅ WebP: ${imageFile.name} (${savings}% smaller)`);
        this.stats.webpCreated++;
        this.stats.optimizedSize += webpSize;
        return true;
      }
    } catch (error) {
      console.log(`❌ WebP conversion failed: ${imageFile.name}`);
      this.stats.errors++;
    }
    
    return false;
  }

  // Convert to AVIF using avifenc
  convertToAVIF(imageFile, tools) {
    if (!tools.avifenc) return false;

    const avifPath = path.join(this.avifDir, `${imageFile.baseName}.avif`);
    
    try {
      execSync(`avifenc -c aom -s 6 -a end-usage=q -a cq-level=32 "${imageFile.fullPath}" "${avifPath}"`, { stdio: 'pipe' });
      
      if (fs.existsSync(avifPath)) {
        const avifSize = fs.statSync(avifPath).size;
        const savings = ((imageFile.size - avifSize) / imageFile.size * 100).toFixed(1);
        console.log(`✅ AVIF: ${imageFile.name} (${savings}% smaller)`);
        this.stats.avifCreated++;
        this.stats.optimizedSize += avifSize;
        return true;
      }
    } catch (error) {
      console.log(`❌ AVIF conversion failed: ${imageFile.name}`);
      this.stats.errors++;
    }
    
    return false;
  }

  // Generate image manifest
  generateManifest(imageFiles) {
    const manifest = {};
    
    imageFiles.forEach(imageFile => {
      const webpPath = path.join(this.webpDir, `${imageFile.baseName}.webp`);
      const avifPath = path.join(this.avifDir, `${imageFile.baseName}.avif`);
      
      manifest[imageFile.relativePath] = {
        original: imageFile.relativePath,
        webp: fs.existsSync(webpPath) ? `webp/${imageFile.baseName}.webp` : null,
        avif: fs.existsSync(avifPath) ? `avif/${imageFile.baseName}.avif` : null,
        size: imageFile.size
      };
    });

    fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`📋 Image manifest generated: ${path.relative(process.cwd(), this.manifestPath)}`);
  }

  // Generate conversion report
  generateReport() {
    const totalSavings = this.stats.originalSize - this.stats.optimizedSize;
    const savingsPercent = ((totalSavings / this.stats.originalSize) * 100).toFixed(1);
    
    console.log('\n📊 Conversion Report:');
    console.log('====================');
    console.log(`Total images processed: ${this.stats.processed}`);
    console.log(`WebP files created: ${this.stats.webpCreated}`);
    console.log(`AVIF files created: ${this.stats.avifCreated}`);
    console.log(`Errors: ${this.stats.errors}`);
    console.log(`Original size: ${(this.stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized size: ${(this.stats.optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${savingsPercent}%)`);
    
    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      savings: {
        total: totalSavings,
        percent: parseFloat(savingsPercent)
      }
    };
    
    fs.writeFileSync(
      path.join(__dirname, '..', 'image-optimization-report.json'),
      JSON.stringify(report, null, 2)
    );
  }

  // Main optimization process
  async optimize() {
    console.log('🚀 Enhanced Image Optimization Starting...\n');
    
    // Check tools
    const tools = this.checkTools();
    
    if (!tools.cwebp && !tools.avifenc) {
      console.log('❌ No conversion tools found!');
      console.log('Please install:');
      console.log('  - cwebp: sudo apt-get install webp');
      console.log('  - avifenc: sudo apt-get install libavif-tools');
      return;
    }
    
    // Create directories
    this.createDirectories();
    
    // Get image files
    const imageFiles = this.getImageFiles();
    this.stats.total = imageFiles.length;
    this.stats.originalSize = imageFiles.reduce((sum, img) => sum + img.size, 0);
    
    console.log(`📁 Found ${imageFiles.length} images to process\n`);
    
    // Process each image
    for (const imageFile of imageFiles) {
      console.log(`Processing: ${imageFile.name} (${(imageFile.size / 1024).toFixed(1)} KB)`);
      
      this.stats.processed++;
      
      // Convert to WebP
      if (tools.cwebp) {
        this.convertToWebP(imageFile, tools);
      }
      
      // Convert to AVIF
      if (tools.avifenc) {
        this.convertToAVIF(imageFile, tools);
      }
      
      console.log(''); // Empty line for readability
    }
    
    // Generate manifest
    this.generateManifest(imageFiles);
    
    // Generate report
    this.generateReport();
    
    console.log('\n🎉 Image optimization completed!');
    console.log('\n💡 Next steps:');
    console.log('1. Test your application');
    console.log('2. Run performance tests');
    console.log('3. Deploy and monitor improvements');
  }
}

// Run the optimizer
const optimizer = new EnhancedImageOptimizer();
optimizer.optimize().catch(console.error);
