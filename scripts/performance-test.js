#!/usr/bin/env node

/**
 * Performance Testing Script
 * Validates performance improvements and generates reports
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Performance thresholds
const THRESHOLDS = {
  LCP: 2000, // 2 seconds
  FID: 50,   // 50ms
  CLS: 0.05, // 0.05
  FCP: 1500, // 1.5 seconds
  SpeedIndex: 2000, // 2 seconds
  BundleSize: 400000, // 400KB
  PerformanceScore: 85 // 85/100
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

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
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

// Check if required tools are installed
function checkDependencies() {
  logHeader('Checking Dependencies');
  
  const dependencies = [
    { name: 'lighthouse', command: 'lighthouse --version' },
    { name: 'webpack-bundle-analyzer', command: 'npx webpack-bundle-analyzer --version' }
  ];
  
  dependencies.forEach(dep => {
    try {
      execSync(dep.command, { stdio: 'pipe' });
      logSuccess(`${dep.name} is installed`);
    } catch (error) {
      logError(`${dep.name} is not installed. Please install it first.`);
      process.exit(1);
    }
  });
}

// Build the project
function buildProject() {
  logHeader('Building Project');
  
  try {
    log('Building project...', 'blue');
    execSync('npm run build', { stdio: 'inherit' });
    logSuccess('Project built successfully');
  } catch (error) {
    logError('Build failed');
    process.exit(1);
  }
}

// Analyze bundle size
function analyzeBundleSize() {
  logHeader('Analyzing Bundle Size');
  
  const buildDir = path.join(__dirname, '..', 'build');
  const staticDir = path.join(buildDir, 'static', 'js');
  
  if (!fs.existsSync(staticDir)) {
    logError('Build directory not found');
    return false;
  }
  
  const jsFiles = fs.readdirSync(staticDir).filter(file => file.endsWith('.js'));
  let totalSize = 0;
  
  jsFiles.forEach(file => {
    const filePath = path.join(staticDir, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
    log(`  ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
  });
  
  const totalSizeKB = totalSize / 1024;
  const totalSizeMB = totalSizeKB / 1024;
  
  log(`\nTotal Bundle Size: ${totalSizeKB.toFixed(2)} KB (${totalSizeMB.toFixed(2)} MB)`);
  
  if (totalSize <= THRESHOLDS.BundleSize) {
    logSuccess(`Bundle size is within threshold (${THRESHOLDS.BundleSize / 1024} KB)`);
    return true;
  } else {
    logError(`Bundle size exceeds threshold (${THRESHOLDS.BundleSize / 1024} KB)`);
    return false;
  }
}

// Run Lighthouse audit
function runLighthouseAudit() {
  logHeader('Running Lighthouse Audit');
  
  const buildDir = path.join(__dirname, '..', 'build');
  const indexPath = path.join(buildDir, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    logError('Build files not found');
    return false;
  }
  
  try {
    log('Running Lighthouse audit...', 'blue');
    const lighthouseCommand = `lighthouse file://${indexPath} --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"`;
    execSync(lighthouseCommand, { stdio: 'pipe' });
    
    // Read and analyze results
    const reportPath = path.join(__dirname, '..', 'lighthouse-report.json');
    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const audits = report.lhr.audits;
      
      // Check Core Web Vitals
      const lcp = (audits['largest-contentful-paint'] && audits['largest-contentful-paint'].numericValue) || 0;
      const fid = (audits['max-potential-fid'] && audits['max-potential-fid'].numericValue) || 0;
      const cls = (audits['cumulative-layout-shift'] && audits['cumulative-layout-shift'].numericValue) || 0;
      const fcp = (audits['first-contentful-paint'] && audits['first-contentful-paint'].numericValue) || 0;
      const speedIndex = (audits['speed-index'] && audits['speed-index'].numericValue) || 0;
      
      log('\nCore Web Vitals:');
      log(`  LCP: ${lcp.toFixed(0)}ms ${lcp <= THRESHOLDS.LCP ? '✅' : '❌'}`);
      log(`  FID: ${fid.toFixed(0)}ms ${fid <= THRESHOLDS.FID ? '✅' : '❌'}`);
      log(`  CLS: ${cls.toFixed(3)} ${cls <= THRESHOLDS.CLS ? '✅' : '❌'}`);
      log(`  FCP: ${fcp.toFixed(0)}ms ${fcp <= THRESHOLDS.FCP ? '✅' : '❌'}`);
      log(`  Speed Index: ${speedIndex.toFixed(0)}ms ${speedIndex <= THRESHOLDS.SpeedIndex ? '✅' : '❌'}`);
      
      // Overall performance score
      const performanceScore = report.lhr.categories.performance.score * 100;
      log(`\nPerformance Score: ${performanceScore.toFixed(0)}/100 ${performanceScore >= THRESHOLDS.PerformanceScore ? '✅' : '❌'}`);
      
      // Check if all thresholds are met
      const allThresholdsMet = 
        lcp <= THRESHOLDS.LCP &&
        fid <= THRESHOLDS.FID &&
        cls <= THRESHOLDS.CLS &&
        fcp <= THRESHOLDS.FCP &&
        speedIndex <= THRESHOLDS.SpeedIndex &&
        performanceScore >= THRESHOLDS.PerformanceScore;
      
      if (allThresholdsMet) {
        logSuccess('All performance thresholds met!');
        return true;
      } else {
        logWarning('Some performance thresholds not met');
        return false;
      }
    }
  } catch (error) {
    logError('Lighthouse audit failed');
    console.error(error.message);
    return false;
  }
}

// Generate performance report
function generateReport(bundleSizePassed, lighthousePassed) {
  logHeader('Performance Test Report');
  
  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    bundleSize: {
      passed: bundleSizePassed,
      threshold: THRESHOLDS.BundleSize
    },
    lighthouse: {
      passed: lighthousePassed,
      thresholds: THRESHOLDS
    },
    overall: bundleSizePassed && lighthousePassed
  };
  
  const reportPath = path.join(__dirname, '..', 'performance-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log(`Report saved to: ${reportPath}`);
  
  if (report.overall) {
    logSuccess('🎉 All performance tests passed!');
  } else {
    logWarning('⚠️  Some performance tests failed. Check the report for details.');
  }
}

// Main execution
function main() {
  logHeader('Performance Testing Suite');
  log('Starting performance validation...\n');
  
  try {
    // Check dependencies
    checkDependencies();
    
    // Build project
    buildProject();
    
    // Analyze bundle size
    const bundleSizePassed = analyzeBundleSize();
    
    // Run Lighthouse audit
    const lighthousePassed = runLighthouseAudit();
    
    // Generate report
    generateReport(bundleSizePassed, lighthousePassed);
    
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
  checkDependencies,
  buildProject,
  analyzeBundleSize,
  runLighthouseAudit,
  generateReport
};
