interface PerformanceBudget {
  scripts: number; // Total JavaScript size in KB
  css: number; // Total CSS size in KB
  images: number; // Total image size in KB
  fonts: number; // Total font size in KB
  totalTime: number; // Total load time in seconds
  lcp: number; // Largest Contentful Paint in seconds
  fid: number; // First Input Delay in milliseconds
  cls: number; // Cumulative Layout Shift
}

const PERFORMANCE_BUDGET: PerformanceBudget = {
  scripts: 250, // 250KB total JS
  css: 50, // 50KB total CSS
  images: 500, // 500KB total images
  fonts: 100, // 100KB total fonts
  totalTime: 3, // 3 seconds total load time
  lcp: 2.5, // 2.5 seconds LCP
  fid: 100, // 100ms FID
  cls: 0.1, // 0.1 CLS
};

interface ResourceSize {
  size: number; // in KB
  url: string;
  type: string;
}

class PerformanceBudgetChecker {
  private resources: ResourceSize[] = [];
  private totalSizes: Record<keyof Omit<PerformanceBudget, 'totalTime' | 'lcp' | 'fid' | 'cls'>, number> = {
    scripts: 0,
    css: 0,
    images: 0,
    fonts: 0,
  };

  constructor() {
    this.trackResources();
  }

  private trackResources() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      resources.forEach(resource => {
        const size = this.estimateSize(resource);
        const type = this.getResourceType(resource);
        const url = resource.name;

        this.resources.push({ size, url, type });
        this.totalSizes[type] += size;
      });
    }
  }

  private estimateSize(resource: PerformanceResourceTiming): number {
    // Estimate size from transfer size (in bytes, convert to KB)
    return (resource.transferSize || 0) / 1024;
  }

  private getResourceType(resource: PerformanceResourceTiming): 'scripts' | 'css' | 'images' | 'fonts' {
    const url = resource.name.toLowerCase();
    
    if (url.includes('.js')) return 'scripts';
    if (url.includes('.css')) return 'css';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp')) return 'images';
    if (url.includes('.woff') || url.includes('.ttf') || url.includes('.otf')) return 'fonts';
    
    // Default to scripts for unknown types
    return 'scripts';
  }

  public checkBudget(): { passed: boolean; violations: string[]; report: any } {
    const violations: string[] = [];
    const report = {
      budget: PERFORMANCE_BUDGET,
      actual: this.totalSizes,
      violations: [] as Array<{type: string, actual: number, budget: number}>,
    };

    // Check script budget
    if (this.totalSizes.scripts > PERFORMANCE_BUDGET.scripts) {
      violations.push(`Scripts exceeded budget: ${this.totalSizes.scripts.toFixed(1)}KB > ${PERFORMANCE_BUDGET.scripts}KB`);
      report.violations.push({ type: 'scripts', actual: this.totalSizes.scripts, budget: PERFORMANCE_BUDGET.scripts });
    }

    // Check CSS budget
    if (this.totalSizes.css > PERFORMANCE_BUDGET.css) {
      violations.push(`CSS exceeded budget: ${this.totalSizes.css.toFixed(1)}KB > ${PERFORMANCE_BUDGET.css}KB`);
      report.violations.push({ type: 'css', actual: this.totalSizes.css, budget: PERFORMANCE_BUDGET.css });
    }

    // Check image budget
    if (this.totalSizes.images > PERFORMANCE_BUDGET.images) {
      violations.push(`Images exceeded budget: ${this.totalSizes.images.toFixed(1)}KB > ${PERFORMANCE_BUDGET.images}KB`);
      report.violations.push({ type: 'images', actual: this.totalSizes.images, budget: PERFORMANCE_BUDGET.images });
    }

    // Check font budget
    if (this.totalSizes.fonts > PERFORMANCE_BUDGET.fonts) {
      violations.push(`Fonts exceeded budget: ${this.totalSizes.fonts.toFixed(1)}KB > ${PERFORMANCE_BUDGET.fonts}KB`);
      report.violations.push({ type: 'fonts', actual: this.totalSizes.fonts, budget: PERFORMANCE_BUDGET.fonts });
    }

    // Log results in development
    if (process.env.NODE_ENV === 'development') {
      console.group('💰 Performance Budget Report');
      console.log('Budget:', PERFORMANCE_BUDGET);
      console.log('Actual:', this.totalSizes);
      
      if (violations.length > 0) {
        console.warn('❌ Budget violations:');
        violations.forEach(violation => console.warn(violation));
      } else {
        console.log('✅ All budgets passed!');
      }
      
      console.groupEnd();
    }

    return {
      passed: violations.length === 0,
      violations,
      report,
    };
  }

  public getLargestResources(limit: number = 10): ResourceSize[] {
    return this.resources
      .sort((a, b) => b.size - a.size)
      .slice(0, limit);
  }

  public getResourceBreakdown() {
    return {
      total: this.resources.reduce((sum, resource) => sum + resource.size, 0),
      byType: this.totalSizes,
      count: this.resources.length,
      largest: this.getLargestResources(5),
    };
  }
}

// Create singleton instance
export const performanceBudgetChecker = new PerformanceBudgetChecker();

// Export for use in CI/build scripts
export { PERFORMANCE_BUDGET };
export default performanceBudgetChecker;
