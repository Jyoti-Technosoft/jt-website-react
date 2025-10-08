#!/usr/bin/env node

// Bundle optimization script
// This script performs aggressive optimizations to reduce bundle size

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting bundle optimization...');

// 1. Remove unused dependencies
const removeUnusedDependencies = () => {
  console.log('📦 Removing unused dependencies...');
  
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Dependencies that are likely unused in production
  const potentiallyUnused = [
    '@testing-library/jest-dom',
    '@testing-library/react',
    'lighthouse',
    'webpack-bundle-analyzer',
  ];
  
  // Move to devDependencies if not already there
  potentiallyUnused.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }
      packageJson.devDependencies[dep] = packageJson.dependencies[dep];
      delete packageJson.dependencies[dep];
      console.log(`✅ Moved ${dep} to devDependencies`);
    }
  });
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Dependencies optimized');
};

// 2. Optimize Material-UI imports
const optimizeMaterialUIImports = () => {
  console.log('🎨 Optimizing Material-UI imports...');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const files = getAllFiles(srcDir, ['.tsx', '.ts']);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Replace direct imports with optimized imports
    const importReplacements = [
      {
        from: /import\s+{\s*([^}]+)\s*}\s+from\s+['"]@mui\/material['"];?/g,
        to: (match, imports) => {
          const importList = imports.split(',').map(imp => imp.trim());
          return importList.map(imp => 
            `import ${imp} from '@mui/material/${imp}';`
          ).join('\n');
        }
      },
      {
        from: /import\s+{\s*([^}]+)\s*}\s+from\s+['"]@mui\/icons-material['"];?/g,
        to: (match, imports) => {
          const importList = imports.split(',').map(imp => imp.trim());
          return importList.map(imp => 
            `import ${imp} from '@mui/icons-material/${imp}';`
          ).join('\n');
        }
      }
    ];
    
    importReplacements.forEach(({ from, to }) => {
      const newContent = content.replace(from, to);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`✅ Optimized imports in ${path.relative(srcDir, file)}`);
    }
  });
  
  console.log('✅ Material-UI imports optimized');
};

// 3. Remove unused CSS
const removeUnusedCSS = () => {
  console.log('🎨 Removing unused CSS...');
  
  const stylesDir = path.join(__dirname, '..', 'src', 'styles');
  if (!fs.existsSync(stylesDir)) {
    console.log('⚠️  No styles directory found');
    return;
  }
  
  const cssFiles = fs.readdirSync(stylesDir).filter(file => file.endsWith('.css'));
  
  cssFiles.forEach(file => {
    const filePath = path.join(stylesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove empty rules
    content = content.replace(/[^{}]*{\s*}/g, '');
    
    // Remove comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove extra whitespace
    content = content.replace(/\s+/g, ' ').trim();
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Cleaned CSS file: ${file}`);
  });
  
  console.log('✅ CSS cleaned');
};

// 4. Optimize images
const optimizeImages = () => {
  console.log('🖼️  Optimizing images...');
  
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.log('⚠️  No assets directory found');
    return;
  }
  
  const imageFiles = fs.readdirSync(assetsDir).filter(file => 
    /\.(png|jpg|jpeg|gif|svg)$/i.test(file)
  );
  
  console.log(`Found ${imageFiles.length} image files`);
  console.log('💡 Consider using WebP/AVIF formats for better compression');
  console.log('💡 Consider lazy loading for images below the fold');
  
  console.log('✅ Image optimization recommendations provided');
};

// 5. Generate optimization report
const generateOptimizationReport = () => {
  console.log('📊 Generating optimization report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    optimizations: [
      'Moved testing dependencies to devDependencies',
      'Optimized Material-UI imports for better tree shaking',
      'Cleaned unused CSS',
      'Provided image optimization recommendations',
    ],
    recommendations: [
      'Enable gzip compression on your server',
      'Use a CDN for static assets',
      'Implement service worker caching',
      'Consider code splitting for large components',
      'Use React.memo for expensive components',
      'Implement lazy loading for routes and components',
    ],
    nextSteps: [
      'Run npm run build to test optimizations',
      'Run npm run performance:test to measure improvements',
      'Consider implementing micro-frontends for very large applications',
      'Monitor bundle size in CI/CD pipeline',
    ]
  };
  
  const reportPath = path.join(__dirname, '..', 'optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`✅ Optimization report saved to ${reportPath}`);
};

// Helper function to get all files recursively
const getAllFiles = (dir, extensions) => {
  let files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  });
  
  return files;
};

// Main execution
const main = () => {
  try {
    removeUnusedDependencies();
    optimizeMaterialUIImports();
    removeUnusedCSS();
    optimizeImages();
    generateOptimizationReport();
    
    console.log('\n🎉 Bundle optimization completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run build');
    console.log('2. Run: npm run performance:test');
    console.log('3. Check optimization-report.json for details');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
};

main();
