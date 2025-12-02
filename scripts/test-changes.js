#!/usr/bin/env node
/**
 * Quick test script to verify recent changes:
 * 1. PWA features removed
 * 2. react-app-rewired configuration working
 * 3. Webpack optimizations applied
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, shouldExist = true) {
  const exists = fs.existsSync(filePath);
  if (shouldExist && exists) {
    log(`✅ ${filePath} exists`, 'green');
    return true;
  } else if (!shouldExist && !exists) {
    log(`✅ ${filePath} correctly removed`, 'green');
    return true;
  } else if (shouldExist && !exists) {
    log(`❌ ${filePath} missing`, 'red');
    return false;
  } else {
    log(`❌ ${filePath} still exists (should be removed)`, 'red');
    return false;
  }
}

function checkFileContent(filePath, shouldNotContain = []) {
  if (!fs.existsSync(filePath)) {
    log(`⚠️  ${filePath} not found, skipping content check`, 'yellow');
    return true;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let allPassed = true;
  
  shouldNotContain.forEach(term => {
    if (content.includes(term)) {
      log(`❌ ${filePath} contains "${term}" (should be removed)`, 'red');
      allPassed = false;
    }
  });
  
  if (allPassed && shouldNotContain.length > 0) {
    log(`✅ ${filePath} doesn't contain PWA references`, 'green');
  }
  
  return allPassed;
}

function checkBuildOutput() {
  const buildDir = path.join(__dirname, '..', 'build');
  if (!fs.existsSync(buildDir)) {
    log('⚠️  Build directory not found. Run "npm run build" first.', 'yellow');
    return false;
  }
  
  let passed = true;
  
  // Check for chunk files (code splitting)
  const jsDir = path.join(buildDir, 'static', 'js');
  if (fs.existsSync(jsDir)) {
    const chunkFiles = fs.readdirSync(jsDir).filter(f => f.includes('.chunk.js'));
    if (chunkFiles.length > 3) {
      log(`✅ Code splitting working (${chunkFiles.length} chunk files)`, 'green');
    } else {
      log(`⚠️  Only ${chunkFiles.length} chunk files found (expected more)`, 'yellow');
      passed = false;
    }
  }
  
  // Check for compressed files
  const gzFiles = [];
  function findGzFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findGzFiles(filePath);
      } else if (file.endsWith('.gz')) {
        gzFiles.push(filePath);
      }
    });
  }
  
  if (fs.existsSync(buildDir)) {
    findGzFiles(buildDir);
    if (gzFiles.length > 0) {
      log(`✅ Compression plugin working (${gzFiles.length} .gz files)`, 'green');
    } else {
      log(`⚠️  No compressed files found (compression may not be working)`, 'yellow');
    }
  }
  
  return passed;
}

function main() {
  log('\n🧪 Testing Recent Changes\n', 'blue');
  
  let allPassed = true;
  const projectRoot = path.join(__dirname, '..');
  
  // Test 1: Check PWA files are removed
  log('\n📋 Test 1: PWA Files Removal', 'blue');
  allPassed = checkFileExists(path.join(projectRoot, 'public', 'manifest.json'), false) && allPassed;
  allPassed = checkFileExists(path.join(projectRoot, 'public', 'service-worker.js'), false) && allPassed;
  allPassed = checkFileExists(path.join(projectRoot, 'public', 'sw-enhanced.js'), false) && allPassed;
  allPassed = checkFileExists(path.join(projectRoot, 'src', 'serviceWorkerRegistration.ts'), false) && allPassed;
  allPassed = checkFileExists(path.join(projectRoot, 'src', 'serviceWorker.ts'), false) && allPassed;
  
  // Test 2: Check source code doesn't reference PWA
  log('\n📋 Test 2: Source Code PWA References', 'blue');
  allPassed = checkFileContent(
    path.join(projectRoot, 'src', 'index.tsx'),
    ['serviceWorkerRegistration', 'serviceWorker']
  ) && allPassed;
  
  allPassed = checkFileContent(
    path.join(projectRoot, 'public', 'index.html'),
    ['manifest.json', 'apple-mobile-web-app-capable', 'service-worker']
  ) && allPassed;
  
  // Test 3: Check react-app-rewired configuration
  log('\n📋 Test 3: react-app-rewired Configuration', 'blue');
  allPassed = checkFileExists(path.join(projectRoot, 'config-overrides.js'), true) && allPassed;
  
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  const scripts = packageJson.scripts || {};
  
  if (scripts.start && scripts.start.includes('react-app-rewired')) {
    log('✅ start script uses react-app-rewired', 'green');
  } else {
    log('❌ start script does not use react-app-rewired', 'red');
    allPassed = false;
  }
  
  if (scripts.build && scripts.build.includes('react-app-rewired')) {
    log('✅ build script uses react-app-rewired', 'green');
  } else {
    log('❌ build script does not use react-app-rewired', 'red');
    allPassed = false;
  }
  
  if (scripts.test && scripts.test.includes('react-app-rewired')) {
    log('✅ test script uses react-app-rewired', 'green');
  } else {
    log('❌ test script does not use react-app-rewired', 'red');
    allPassed = false;
  }
  
  // Test 4: Check build output (if build exists)
  log('\n📋 Test 4: Build Output Verification', 'blue');
  log('⚠️  Note: Run "npm run build" first to test build output', 'yellow');
  const buildPassed = checkBuildOutput();
  if (fs.existsSync(path.join(projectRoot, 'build'))) {
    allPassed = buildPassed && allPassed;
  }
  
  // Summary
  log('\n' + '='.repeat(50), 'blue');
  if (allPassed) {
    log('✅ All tests passed!', 'green');
    log('\nNext steps:', 'blue');
    log('1. Run "npm run build" to test production build', 'yellow');
    log('2. Run "npm run build:analyze" to verify code splitting', 'yellow');
    log('3. Check browser DevTools to verify no service workers', 'yellow');
  } else {
    log('❌ Some tests failed. Please review the output above.', 'red');
    process.exit(1);
  }
  log('='.repeat(50) + '\n', 'blue');
}

main();


