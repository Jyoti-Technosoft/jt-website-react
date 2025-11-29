#!/usr/bin/env node

/**
 * Simplified Performance Testing Script
 * Works with Node.js 12+ and focuses on bundle analysis
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Performance thresholds
const THRESHOLDS = {
  BundleSize: 400000, // 400KB
  JSFileCount: 15,
  CSSFileCount: 3,
  ImageFileCount: 15,
  FontFileCount: 3
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color) {
  console.log(`${colors[color] || colors.reset}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${colors.bold}${colors.blue}=== ${message} ===${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// Build the project
function buildProject() {
  logHeader('Building Project');
  
  try {
    log('Building project...', 'blue');
    execSync('npm run build', { stdio: 'inherit' });
    logSuccess('Project built successfully');
    return true;
  } catch (error) {
    logError('Build failed');
    return false;
  }
}

// Analyze bundle size and file counts
function analyzeBundle() {
  logHeader('Analyzing Bundle');
  
  const buildDir = path.join(__dirname, '..', 'build');
  
  if (!fs.existsSync(buildDir)) {
    logError('Build directory not found');
    return false;
  }
  
  // Analyze JavaScript files
  const staticDir = path.join(buildDir, 'static', 'js');
  const cssDir = path.join(buildDir, 'static', 'css');
  const assetsDir = path.join(buildDir, 'assets');
  
  let totalSize = 0;
  let jsFileCount = 0;
  let cssFileCount = 0;
  let imageFileCount = 0;
  let fontFileCount = 0;
  
  // Count and size JavaScript files
  if (fs.existsSync(staticDir)) {
    const jsFiles = fs.readdirSync(staticDir).filter(file => file.endsWith('.js'));
    jsFileCount = jsFiles.length;
    
    jsFiles.forEach(file => {
      const filePath = path.join(staticDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      log(`  JS: ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
    });
  }
  
  // Count and size CSS files
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
    cssFileCount = cssFiles.length;
    
    cssFiles.forEach(file => {
      const filePath = path.join(cssDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      log(`  CSS: ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
    });
  }
  
  // Count image files
  if (fs.existsSync(assetsDir)) {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'];
    const allFiles = fs.readdirSync(assetsDir, { withFileTypes: true });
    
    allFiles.forEach(file => {
      if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase();
        if (imageExtensions.includes(ext)) {
          imageFileCount++;
        } else if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
          fontFileCount++;
        }
      }
    });
  }
  
  const totalSizeKB = totalSize / 1024;
  const totalSizeMB = totalSizeKB / 1024;
  
  log(`\nBundle Analysis Results:`);
  log(`  Total Size: ${totalSizeKB.toFixed(2)} KB (${totalSizeMB.toFixed(2)} MB)`);
  log(`  JS Files: ${jsFileCount}`);
  log(`  CSS Files: ${cssFileCount}`);
  log(`  Image Files: ${imageFileCount}`);
  log(`  Font Files: ${fontFileCount}`);
  
  // Check thresholds
  const bundleSizePassed = totalSize <= THRESHOLDS.BundleSize;
  const jsCountPassed = jsFileCount <= THRESHOLDS.JSFileCount;
  const cssCountPassed = cssFileCount <= THRESHOLDS.CSSFileCount;
  const imageCountPassed = imageFileCount <= THRESHOLDS.ImageFileCount;
  const fontCountPassed = fontFileCount <= THRESHOLDS.FontFileCount;
  
  log(`\nThreshold Checks:`);
  log(`  Bundle Size: ${bundleSizePassed ? '✅' : '❌'} (${totalSizeKB.toFixed(0)}KB / ${THRESHOLDS.BundleSize / 1024}KB)`);
  log(`  JS Files: ${jsCountPassed ? '✅' : '❌'} (${jsFileCount} / ${THRESHOLDS.JSFileCount})`);
  log(`  CSS Files: ${cssCountPassed ? '✅' : '❌'} (${cssFileCount} / ${THRESHOLDS.CSSFileCount})`);
  log(`  Image Files: ${imageCountPassed ? '✅' : '❌'} (${imageFileCount} / ${THRESHOLDS.ImageFileCount})`);
  log(`  Font Files: ${fontCountPassed ? '✅' : '❌'} (${fontFileCount} / ${THRESHOLDS.FontFileCount})`);
  
  const allPassed = bundleSizePassed && jsCountPassed && cssCountPassed && imageCountPassed && fontCountPassed;
  
  if (allPassed) {
    logSuccess('All bundle thresholds met!');
  } else {
    logWarning('Some bundle thresholds not met');
  }
  
  return {
    totalSize,
    jsFileCount,
    cssFileCount,
    imageFileCount,
    fontFileCount,
    bundleSizePassed,
    jsCountPassed,
    cssCountPassed,
    imageCountPassed,
    fontCountPassed,
    allPassed
  };
}

// Check for performance optimizations
function checkOptimizations() {
  logHeader('Checking Performance Optimizations');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const componentsDir = path.join(srcDir, 'Components');
  
  let optimizationsFound = 0;
  let totalChecks = 0;
  
  // Check for React.memo usage
  totalChecks++;
  if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir, { withFileTypes: true })
      .filter(file => file.isFile() && file.name.endsWith('.tsx'))
      .map(file => file.name);
    
    const memoFiles = files.filter(file => {
      const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
      return content.includes('React.memo') || content.includes('memo(');
    });
    
    if (memoFiles.length > 0) {
      logSuccess(`React.memo found in ${memoFiles.length} components`);
      optimizationsFound++;
    } else {
      logWarning('No React.memo usage found');
    }
  }
  
  // Check for lazy loading
  totalChecks++;
  const appFile = path.join(srcDir, 'App.tsx');
  if (fs.existsSync(appFile)) {
    const content = fs.readFileSync(appFile, 'utf8');
    if (content.includes('lazy(') || content.includes('Suspense')) {
      logSuccess('Lazy loading implemented');
      optimizationsFound++;
    } else {
      logWarning('No lazy loading found');
    }
  }
  
  // Check for image optimization
  totalChecks++;
  const imageOptimizerFile = path.join(componentsDir, 'AdvancedImageOptimizer.tsx');
  if (fs.existsSync(imageOptimizerFile)) {
    logSuccess('Advanced image optimization found');
    optimizationsFound++;
  } else {
    logWarning('No advanced image optimization found');
  }
  
  // Check for performance monitoring
  totalChecks++;
  const perfMonitorFile = path.join(componentsDir, 'EnhancedPerformanceMonitor.tsx');
  if (fs.existsSync(perfMonitorFile)) {
    logSuccess('Enhanced performance monitoring found');
    optimizationsFound++;
  } else {
    logWarning('No enhanced performance monitoring found');
  }
  
  const optimizationScore = Math.round((optimizationsFound / totalChecks) * 100);
  log(`\nOptimization Score: ${optimizationScore}% (${optimizationsFound}/${totalChecks})`);
  
  return {
    optimizationsFound,
    totalChecks,
    score: optimizationScore
  };
}

// Generate performance report
function generateReport(buildSuccess, bundleAnalysis, optimizationCheck) {
  logHeader('Performance Test Report');
  
  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    buildSuccess,
    bundleAnalysis,
    optimizationCheck,
    overall: buildSuccess && bundleAnalysis.allPassed && optimizationCheck.score >= 70
  };
  
  const reportPath = path.join(__dirname, '..', 'performance-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log(`Report saved to: ${reportPath}`);
  
  if (report.overall) {
    logSuccess('🎉 All performance tests passed!');
    log('Your website is optimized for excellent performance.');
  } else {
    logWarning('⚠️  Some performance tests failed. Check the report for details.');
    log('Consider implementing the suggested optimizations.');
  }
  
  // Performance recommendations
  logHeader('Performance Recommendations');
  if (bundleAnalysis.totalSize > THRESHOLDS.BundleSize) {
    log('• Consider code splitting to reduce bundle size');
  }
  if (bundleAnalysis.jsFileCount > THRESHOLDS.JSFileCount) {
    log('• Consider combining JavaScript files');
  }
  if (optimizationCheck.score < 70) {
    log('• Implement more performance optimizations');
  }
  log('• Enable gzip compression on your server');
  log('• Use a CDN for static assets');
  log('• Optimize images and use modern formats (WebP, AVIF)');
}

// Main execution
function main() {
  logHeader('Simplified Performance Testing Suite');
  log('Starting performance validation...\n');
  
  try {
    // Build project
    const buildSuccess = buildProject();
    if (!buildSuccess) {
      process.exit(1);
    }
    
    // Analyze bundle
    const bundleAnalysis = analyzeBundle();
    
    // Check optimizations
    const optimizationCheck = checkOptimizations();
    
    // Generate report
    generateReport(buildSuccess, bundleAnalysis, optimizationCheck);
    
  } catch (error) {
    logError('Performance test failed');
    console.error(error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  buildProject,
  analyzeBundle,
  checkOptimizations,
  generateReport
};
