// Bundle analysis and optimization utilities

interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkAnalysis[];
  recommendations: string[];
  performanceScore: number;
}

interface ChunkAnalysis {
  name: string;
  size: number;
  gzippedSize: number;
  modules: ModuleAnalysis[];
  isOptimizable: boolean;
  optimizationSuggestions: string[];
}

interface ModuleAnalysis {
  name: string;
  size: number;
  gzippedSize: number;
  isDuplicate: boolean;
  isUnused: boolean;
  isLarge: boolean;
}

// Analyze bundle composition and provide optimization recommendations
export const analyzeBundle = (): BundleAnalysis => {
  const chunks: ChunkAnalysis[] = [];
  const recommendations: string[] = [];
  let totalSize = 0;
  let gzippedSize = 0;

  // Analyze webpack chunks if available
  if (typeof window !== 'undefined' && (window as any).__webpack_require__) {
    const webpackChunks = (window as any).__webpack_require__.cache;
    
    Object.keys(webpackChunks).forEach(chunkName => {
      const chunk = webpackChunks[chunkName];
      const chunkSize = estimateChunkSize(chunk);
      const chunkGzippedSize = estimateGzippedSize(chunkSize);
      
      totalSize += chunkSize;
      gzippedSize += chunkGzippedSize;
      
      chunks.push({
        name: chunkName,
        size: chunkSize,
        gzippedSize: chunkGzippedSize,
        modules: analyzeModules(chunk),
        isOptimizable: chunkSize > 100000, // > 100KB
        optimizationSuggestions: generateOptimizationSuggestions(chunk, chunkSize),
      });
    });
  }

  // Generate performance score (0-100)
  const performanceScore = calculatePerformanceScore(totalSize, gzippedSize, chunks);

  // Generate recommendations
  generateRecommendations(chunks, recommendations);

  return {
    totalSize,
    gzippedSize,
    chunks,
    recommendations,
    performanceScore,
  };
};

// Estimate chunk size based on module content
const estimateChunkSize = (chunk: any): number => {
  if (!chunk || !chunk.exports) return 0;
  
  // Rough estimation based on module content
  const content = JSON.stringify(chunk.exports);
  return new Blob([content]).size;
};

// Estimate gzipped size (typically 30-40% of original)
const estimateGzippedSize = (originalSize: number): number => {
  return Math.round(originalSize * 0.35);
};

// Analyze individual modules within a chunk
const analyzeModules = (chunk: any): ModuleAnalysis[] => {
  const modules: ModuleAnalysis[] = [];
  
  if (chunk && chunk.exports) {
    Object.keys(chunk.exports).forEach(moduleName => {
      const moduleSize = estimateModuleSize(chunk.exports[moduleName]);
      const moduleGzippedSize = estimateGzippedSize(moduleSize);
      
      modules.push({
        name: moduleName,
        size: moduleSize,
        gzippedSize: moduleGzippedSize,
        isDuplicate: isDuplicateModule(moduleName),
        isUnused: isUnusedModule(moduleName),
        isLarge: moduleSize > 50000, // > 50KB
      });
    });
  }
  
  return modules;
};

// Estimate module size
const estimateModuleSize = (module: any): number => {
  if (!module) return 0;
  
  const content = JSON.stringify(module);
  return new Blob([content]).size;
};

// Check if module is duplicated across chunks
const isDuplicateModule = (moduleName: string): boolean => {
  // This would need to be implemented based on actual bundle analysis
  // For now, return false as a placeholder
  return false;
};

// Check if module is unused (dead code)
const isUnusedModule = (moduleName: string): boolean => {
  // This would need to be implemented based on actual usage analysis
  // For now, return false as a placeholder
  return false;
};

// Generate optimization suggestions for a chunk
const generateOptimizationSuggestions = (chunk: any, chunkSize: number): string[] => {
  const suggestions: string[] = [];
  
  if (chunkSize > 200000) { // > 200KB
    suggestions.push('Consider code splitting this chunk');
  }
  
  if (chunkSize > 100000) { // > 100KB
    suggestions.push('Enable tree shaking to remove unused code');
  }
  
  if (chunkSize > 50000) { // > 50KB
    suggestions.push('Consider lazy loading this chunk');
  }
  
  return suggestions;
};

// Calculate overall performance score
const calculatePerformanceScore = (totalSize: number, gzippedSize: number, chunks: ChunkAnalysis[]): number => {
  let score = 100;
  
  // Penalize large total size
  if (totalSize > 1000000) score -= 30; // > 1MB
  else if (totalSize > 500000) score -= 20; // > 500KB
  else if (totalSize > 250000) score -= 10; // > 250KB
  
  // Penalize large gzipped size
  if (gzippedSize > 300000) score -= 20; // > 300KB gzipped
  else if (gzippedSize > 150000) score -= 10; // > 150KB gzipped
  
  // Penalize too many chunks
  if (chunks.length > 50) score -= 10;
  else if (chunks.length > 30) score -= 5;
  
  // Penalize large individual chunks
  const largeChunks = chunks.filter(chunk => chunk.size > 100000).length;
  score -= largeChunks * 5;
  
  return Math.max(0, score);
};

// Generate optimization recommendations
const generateRecommendations = (chunks: ChunkAnalysis[], recommendations: string[]): void => {
  const largeChunks = chunks.filter(chunk => chunk.size > 100000);
  const duplicateModules = chunks.flatMap(chunk => 
    chunk.modules.filter(module => module.isDuplicate)
  );
  const unusedModules = chunks.flatMap(chunk => 
    chunk.modules.filter(module => module.isUnused)
  );
  
  if (largeChunks.length > 0) {
    recommendations.push(`Consider code splitting ${largeChunks.length} large chunks`);
  }
  
  if (duplicateModules.length > 0) {
    recommendations.push(`Remove ${duplicateModules.length} duplicate modules`);
  }
  
  if (unusedModules.length > 0) {
    recommendations.push(`Remove ${unusedModules.length} unused modules`);
  }
  
  // General recommendations
  recommendations.push('Enable gzip compression on your server');
  recommendations.push('Use HTTP/2 for better multiplexing');
  recommendations.push('Implement service worker for caching');
  recommendations.push('Optimize images and use modern formats (WebP, AVIF)');
  recommendations.push('Use CDN for static assets');
};

// Monitor bundle size in real-time
export const monitorBundleSize = (callback: (analysis: BundleAnalysis) => void): (() => void) => {
  let intervalId: NodeJS.Timeout;
  
  const startMonitoring = () => {
    intervalId = setInterval(() => {
      const analysis = analyzeBundle();
      callback(analysis);
    }, 5000); // Check every 5 seconds
  };
  
  startMonitoring();
  
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
};

// Get bundle size recommendations based on current analysis
export const getBundleSizeRecommendations = (): string[] => {
  const analysis = analyzeBundle();
  return analysis.recommendations;
};

// Check if bundle size is within performance budget
export const isWithinPerformanceBudget = (budget: number = 500000): boolean => {
  const analysis = analyzeBundle();
  return analysis.gzippedSize <= budget;
};

const bundleAnalyzer = {
  analyzeBundle,
  monitorBundleSize,
  getBundleSizeRecommendations,
  isWithinPerformanceBudget,
};

export default bundleAnalyzer;
