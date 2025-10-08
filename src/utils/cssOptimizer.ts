// CSS optimization utilities
// This file helps optimize CSS loading and reduce the number of CSS files

export const cssOptimizationConfig = {
  // Critical CSS that should be inlined
  criticalCSS: [
    // Above-the-fold styles
    '.first-section-home',
    '.header',
    '.navigation',
    '.hero-section',
    '.loading-spinner',
    '.skeleton',
  ],
  
  // Non-critical CSS that can be lazy loaded
  nonCriticalCSS: [
    // Below-the-fold styles
    '.footer',
    '.sidebar',
    '.modal',
    '.tooltip',
    '.animation',
    '.hover-effects',
  ],
  
  // CSS files to consolidate
  cssFilesToConsolidate: [
    'main.045d2ae3.css',
    '760.9ad3b17e.chunk.css',
    '533.62ef8417.chunk.css',
    '588.fa05e158.chunk.css',
    '946.62468555.chunk.css',
    '869.6fe21053.chunk.css',
    '832.826b41f1.chunk.css',
    '33.d7003e4d.chunk.css',
    '264.e59ac3ac.chunk.css',
    '216.a4bb3dc3.chunk.css',
    '307.3289702a.chunk.css',
    '165.78badcdf.chunk.css',
    '248.4b40c3ba.chunk.css',
  ],
};

// CSS consolidation strategy
export const cssConsolidationStrategy = {
  // Group CSS files by functionality
  groups: {
    // Core styles (must load first)
    core: [
      'main.045d2ae3.css',
      '33.d7003e4d.chunk.css',
    ],
    
    // Component styles
    components: [
      '760.9ad3b17e.chunk.css',
      '533.62ef8417.chunk.css',
      '588.fa05e158.chunk.css',
      '946.62468555.chunk.css',
    ],
    
    // Layout styles
    layout: [
      '869.6fe21053.chunk.css',
      '832.826b41f1.chunk.css',
      '165.78badcdf.chunk.css',
      '248.4b40c3ba.chunk.css',
    ],
    
    // Utility styles
    utilities: [
      '264.e59ac3ac.chunk.css',
      '216.a4bb3dc3.chunk.css',
      '307.3289702a.chunk.css',
    ],
  },
  
  // Target file structure
  targetStructure: {
    'critical.css': 'core + above-the-fold styles',
    'components.css': 'component-specific styles',
    'layout.css': 'layout and responsive styles',
    'utilities.css': 'utility classes and helpers',
  },
};

// CSS loading optimization
export const cssLoadingOptimization = {
  // Critical CSS inlining
  inlineCriticalCSS: (criticalCSS: string) => {
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);
  },
  
  // Lazy load non-critical CSS
  lazyLoadCSS: (href: string) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve(link);
      link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
      document.head.appendChild(link);
    });
  },
  
  // Preload CSS
  preloadCSS: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  },
};

// CSS optimization recommendations
export const cssOptimizationRecommendations = {
  // Current issues
  currentIssues: [
    '13 CSS files (target: 3-5)',
    'No critical CSS inlining',
    'No CSS lazy loading',
    'Potential unused CSS',
  ],
  
  // Optimization strategies
  strategies: [
    'Consolidate CSS files by functionality',
    'Inline critical CSS in HTML head',
    'Lazy load non-critical CSS',
    'Remove unused CSS',
    'Use CSS modules for better tree shaking',
    'Implement CSS purging',
  ],
  
  // Implementation steps
  implementationSteps: [
    '1. Audit current CSS files',
    '2. Identify critical vs non-critical styles',
    '3. Consolidate files by functionality',
    '4. Implement critical CSS inlining',
    '5. Set up CSS lazy loading',
    '6. Remove unused CSS',
    '7. Test and validate',
  ],
};

// CSS bundle analysis
export const cssBundleAnalysis = {
  // Analyze CSS file sizes
  analyzeFileSizes: (files: { name: string; size: number }[]) => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const averageSize = totalSize / files.length;
    const largestFile = files.reduce((max, file) => 
      file.size > max.size ? file : max
    );
    
    return {
      totalSize,
      averageSize,
      largestFile,
      fileCount: files.length,
      recommendations: totalSize > 50000 ? [
        'CSS bundle is too large',
        'Consider consolidating files',
        'Remove unused CSS',
        'Implement critical CSS inlining',
      ] : [
        'CSS bundle size is reasonable',
        'Consider further optimization',
      ],
    };
  },
  
  // Get optimization score
  getOptimizationScore: (fileCount: number, totalSize: number) => {
    let score = 100;
    
    // Penalize too many files
    if (fileCount > 10) score -= 30;
    else if (fileCount > 5) score -= 15;
    
    // Penalize large total size
    if (totalSize > 100000) score -= 40; // > 100KB
    else if (totalSize > 50000) score -= 20; // > 50KB
    
    return Math.max(0, score);
  },
};

// CSS optimization utilities
export const cssOptimizationUtils = {
  // Remove unused CSS
  removeUnusedCSS: (css: string, usedSelectors: string[]) => {
    // This would be implemented with a CSS parser
    // For now, return a placeholder
    return css;
  },
  
  // Minify CSS
  minifyCSS: (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
      .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
      .replace(/;\s*/g, ';') // Remove spaces after semicolon
      .trim();
  },
  
  // Extract critical CSS
  extractCriticalCSS: (css: string, criticalSelectors: string[]) => {
    // This would be implemented with a CSS parser
    // For now, return a placeholder
    return css;
  },
};

export default {
  cssOptimizationConfig,
  cssConsolidationStrategy,
  cssLoadingOptimization,
  cssOptimizationRecommendations,
  cssBundleAnalysis,
  cssOptimizationUtils,
};
