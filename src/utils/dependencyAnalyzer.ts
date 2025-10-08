// Dependency analysis utilities
// This file helps identify unused dependencies and optimize package.json

export const dependencyAnalysis = {
  // Current dependencies that might be unused or oversized
  potentiallyUnusedDependencies: [
    {
      name: '@testing-library/jest-dom',
      size: '~50KB',
      reason: 'Testing library - not needed in production',
      recommendation: 'Move to devDependencies',
    },
    {
      name: '@testing-library/react',
      size: '~200KB',
      reason: 'Testing library - not needed in production',
      recommendation: 'Move to devDependencies',
    },
    {
      name: 'react-google-recaptcha',
      size: '~30KB',
      reason: 'Only used on contact form',
      recommendation: 'Lazy load or use CDN',
    },
  ],
  
  // Dependencies that can be optimized
  optimizableDependencies: [
    {
      name: '@mui/material',
      size: '~500KB',
      reason: 'Large library with many unused components',
      recommendation: 'Use specific imports, enable tree shaking',
    },
    {
      name: '@mui/icons-material',
      size: '~300KB',
      reason: 'Large icon library',
      recommendation: 'Import only needed icons, use tree shaking',
    },
    {
      name: 'react-helmet',
      size: '~20KB',
      reason: 'SEO library',
      recommendation: 'Consider lighter alternatives',
    },
  ],
  
  // Dependencies that are essential
  essentialDependencies: [
    'react',
    'react-dom',
    'react-router-dom',
    'axios',
    'web-vitals',
  ],
};

// Bundle size analysis for dependencies
export const bundleSizeAnalysis = {
  // Analyze dependency impact on bundle size
  analyzeDependencyImpact: (dependencies: string[]) => {
    const impact = dependencies.map(dep => {
      const analysis = dependencyAnalysis.optimizableDependencies.find(d => d.name === dep);
      return {
        name: dep,
        impact: analysis ? analysis.size : 'Unknown',
        optimization: analysis ? analysis.recommendation : 'No optimization needed',
      };
    });
    
    return impact;
  },
  
  // Get total estimated bundle size from dependencies
  getTotalDependencySize: () => {
    const totalSize = dependencyAnalysis.optimizableDependencies.reduce((sum, dep) => {
      const size = parseInt(dep.size.replace(/[^\d]/g, ''));
      return sum + size;
    }, 0);
    
    return totalSize;
  },
};

// Dependency optimization strategies
export const dependencyOptimizationStrategies = {
  // Move to devDependencies
  moveToDevDependencies: [
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@types/jest',
    'webpack-bundle-analyzer',
    'lighthouse',
  ],
  
  // Replace with lighter alternatives
  lighterAlternatives: [
    {
      current: 'react-helmet',
      alternative: 'react-helmet-async',
      sizeReduction: '~10KB',
    },
    {
      current: 'axios',
      alternative: 'fetch API',
      sizeReduction: '~20KB',
    },
  ],
  
  // Lazy load dependencies
  lazyLoadDependencies: [
    'react-google-recaptcha',
    'react-helmet',
    'web-vitals',
  ],
};

// Package.json optimization
export const packageJsonOptimization = {
  // Dependencies to move to devDependencies
  moveToDev: [
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@types/jest',
  ],
  
  // Dependencies to remove
  remove: [
    // Add any unused dependencies here
  ],
  
  // Dependencies to replace
  replace: [
    {
      from: 'react-helmet',
      to: 'react-helmet-async',
      reason: 'Smaller bundle size',
    },
  ],
  
  // Dependencies to add for optimization
  add: [
    {
      name: 'react-helmet-async',
      version: '^1.3.0',
      reason: 'Lighter alternative to react-helmet',
    },
  ],
};

// Bundle optimization recommendations
export const bundleOptimizationRecommendations = {
  // Immediate actions
  immediate: [
    'Move testing libraries to devDependencies',
    'Enable tree shaking for Material-UI',
    'Use specific imports instead of barrel imports',
    'Remove unused dependencies',
  ],
  
  // Short-term optimizations
  shortTerm: [
    'Implement code splitting',
    'Lazy load non-critical components',
    'Optimize Material-UI imports',
    'Use CDN for large libraries',
  ],
  
  // Long-term optimizations
  longTerm: [
    'Consider micro-frontends',
    'Implement module federation',
    'Use lighter alternatives',
    'Implement aggressive caching',
  ],
};

// Dependency usage analysis
export const dependencyUsageAnalysis = {
  // Check if dependency is used in code
  isDependencyUsed: (dependencyName: string, codebase: string) => {
    const patterns = [
      `import.*${dependencyName}`,
      `require.*${dependencyName}`,
      `from.*${dependencyName}`,
    ];
    
    return patterns.some(pattern => 
      new RegExp(pattern, 'g').test(codebase)
    );
  },
  
  // Get unused dependencies
  getUnusedDependencies: (dependencies: string[], codebase: string) => {
    return dependencies.filter(dep => 
      !dependencyUsageAnalysis.isDependencyUsed(dep, codebase)
    );
  },
  
  // Get dependency usage statistics
  getUsageStatistics: (dependencies: string[], codebase: string) => {
    return dependencies.map(dep => ({
      name: dep,
      used: dependencyUsageAnalysis.isDependencyUsed(dep, codebase),
      usageCount: (codebase.match(new RegExp(dep, 'g')) || []).length,
    }));
  },
};

// Bundle size monitoring
export const bundleSizeMonitoring = {
  // Set size thresholds
  thresholds: {
    total: 400, // KB
    main: 200, // KB
    vendor: 150, // KB
    css: 50, // KB
  },
  
  // Check if bundle size is within thresholds
  checkThresholds: (sizes: { total: number; main: number; vendor: number; css: number }) => {
    const results = {
      total: sizes.total <= bundleSizeMonitoring.thresholds.total,
      main: sizes.main <= bundleSizeMonitoring.thresholds.main,
      vendor: sizes.vendor <= bundleSizeMonitoring.thresholds.vendor,
      css: sizes.css <= bundleSizeMonitoring.thresholds.css,
    };
    
    return {
      ...results,
      allPassed: Object.values(results).every(Boolean),
    };
  },
  
  // Get optimization recommendations based on current size
  getRecommendations: (currentSize: number, targetSize: number) => {
    const reductionNeeded = currentSize - targetSize;
    const reductionPercentage = (reductionNeeded / currentSize) * 100;
    
    if (reductionPercentage > 50) {
      return [
        'Critical: Bundle size is significantly over target',
        'Implement aggressive code splitting',
        'Remove unused dependencies',
        'Consider micro-frontends',
      ];
    } else if (reductionPercentage > 25) {
      return [
        'Bundle size exceeds target by 25%+',
        'Implement code splitting',
        'Optimize dependencies',
        'Remove unused code',
      ];
    } else if (reductionPercentage > 10) {
      return [
        'Bundle size exceeds target by 10%+',
        'Fine-tune code splitting',
        'Optimize imports',
        'Remove unused CSS',
      ];
    } else {
      return [
        'Bundle size is close to target',
        'Continue monitoring',
        'Consider further optimizations',
      ];
    }
  },
};

export default {
  dependencyAnalysis,
  bundleSizeAnalysis,
  dependencyOptimizationStrategies,
  packageJsonOptimization,
  bundleOptimizationRecommendations,
  dependencyUsageAnalysis,
  bundleSizeMonitoring,
};
