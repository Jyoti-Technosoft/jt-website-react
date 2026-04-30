// Performance monitoring utilities

interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

interface PerformanceThresholds {
  lcp: number; // Good: <2.5s
  fid: number; // Good: <100ms
  cls: number; // Good: <0.1
  fcp: number; // Good: <1.8s
  ttfb: number; // Good: <800ms
}

const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  fcp: 1800,
  ttfb: 800,
};

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];
  private isSupported = 'performance' in window && 'PerformanceObserver' in window;

  constructor() {
    if (this.isSupported) {
      this.initObservers();
    }
  }

  private initObservers() {
    try {
      // Largest Contentful Paint
      this.observePerformanceEntry('largest-contentful-paint', (entries) => {
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
        this.checkThreshold('lcp', lastEntry.startTime);
      });

      // First Input Delay
      this.observePerformanceEntry('first-input', (entries) => {
        const firstEntry = entries[0] as any;
        this.metrics.fid = firstEntry.processingStart - firstEntry.startTime;
        this.checkThreshold('fid', this.metrics.fid);
      });

      // Cumulative Layout Shift
      let clsValue = 0;
      this.observePerformanceEntry('layout-shift', (entries) => {
        for (const entry of entries) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.metrics.cls = clsValue;
        this.checkThreshold('cls', clsValue);
      });

      // First Contentful Paint
      this.observePerformanceEntry('paint', (entries) => {
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
          this.checkThreshold('fcp', fcpEntry.startTime);
        }
      });

      // Time to First Byte (from navigation timing)
      this.measureTTFB();

    } catch (error) {
      console.warn('Performance monitoring initialization failed:', error);
    }
  }

  private observePerformanceEntry(type: string, callback: (entries: PerformanceEntry[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error);
    }
  }

  private measureTTFB() {
    if ('navigation' in performance) {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      this.metrics.ttfb = ttfb;
      this.checkThreshold('ttfb', ttfb);
    }
  }

  private checkThreshold(metric: keyof PerformanceThresholds, value: number) {
    const threshold = PERFORMANCE_THRESHOLDS[metric];
    const status = value <= threshold ? 'GOOD' : 'NEEDS_IMPROVEMENT';
    
    console.log(`📊 ${metric.toUpperCase()}: ${value.toFixed(2)}ms - ${status}`);
    
    if (value > threshold) {
      console.warn(`⚠️ ${metric.toUpperCase()} exceeds threshold (${threshold}ms): ${value.toFixed(2)}ms`);
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public getPerformanceScore(): number {
    const metrics = this.metrics;
    if (!metrics.lcp || !metrics.fid || !metrics.cls) return 0;

    let score = 0;
    const weights = { lcp: 0.4, fid: 0.3, cls: 0.3 };

    // Calculate individual scores (0-100)
    const lcpScore = Math.max(0, 100 - (metrics.lcp / PERFORMANCE_THRESHOLDS.lcp) * 100);
    const fidScore = Math.max(0, 100 - (metrics.fid / PERFORMANCE_THRESHOLDS.fid) * 100);
    const clsScore = Math.max(0, 100 - (metrics.cls / PERFORMANCE_THRESHOLDS.cls) * 100);

    score = (lcpScore * weights.lcp) + (fidScore * weights.fid) + (clsScore * weights.cls);
    
    return Math.round(score);
  }

  public logFullReport() {
    console.group('📈 Performance Report');
    console.log('Metrics:', this.metrics);
    console.log('Performance Score:', this.getPerformanceScore());
    
    Object.entries(this.metrics).forEach(([key, value]) => {
      const threshold = PERFORMANCE_THRESHOLDS[key as keyof PerformanceThresholds];
      if (threshold) {
        const status = value <= threshold ? '✅ GOOD' : '❌ NEEDS_IMPROVEMENT';
        console.log(`${key.toUpperCase()}: ${value?.toFixed(2)}ms - ${status}`);
      }
    });
    
    console.groupEnd();
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export utility functions
export const measureComponentRender = (componentName: string) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`⏱️ ${componentName} render time: ${renderTime.toFixed(2)}ms`);
    return renderTime;
  };
};

export const measureFunction = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`⏱️ ${name} execution time: ${(end - start).toFixed(2)}ms`);
    return result;
  }) as T;
};

// Development-time performance monitoring
if (process.env.NODE_ENV === 'development') {
  // Log performance metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logFullReport();
    }, 3000); // Wait for metrics to settle
  });

  // Monitor route changes (if using React Router)
  let lastPath = window.location.pathname;
  const originalPushState = window.history.pushState;
  window.history.pushState = function(...args) {
    originalPushState.apply(window.history, args);
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      console.log(`🔄 Route changed to: ${window.location.pathname}`);
      setTimeout(() => {
        performanceMonitor.logFullReport();
      }, 2000);
    }
  };
}

export default performanceMonitor;
