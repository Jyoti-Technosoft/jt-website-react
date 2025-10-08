// Web Vitals reporting utility
import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

interface WebVitalsConfig {
  debug?: boolean;
  reportToAnalytics?: boolean;
  customEndpoint?: string;
}

class WebVitalsReporter {
  private config: WebVitalsConfig;
  private metrics: Metric[] = [];

  constructor(config: WebVitalsConfig = {}) {
    this.config = {
      debug: false,
      reportToAnalytics: true,
      ...config,
    };
  }

  private logMetric(metric: Metric) {
    if (this.config.debug) {
      console.log('Web Vital:', metric);
    }
    
    this.metrics.push(metric);
  }

  private reportToGoogleAnalytics(metric: Metric) {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  }

  private reportToCustomEndpoint(metric: Metric) {
    if (this.config.customEndpoint) {
      fetch(this.config.customEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      }).catch((error) => {
        console.warn('Failed to report metric:', error);
      });
    }
  }

  private handleMetric = (metric: Metric) => {
    this.logMetric(metric);
    
    if (this.config.reportToAnalytics) {
      this.reportToGoogleAnalytics(metric);
    }
    
    if (this.config.customEndpoint) {
      this.reportToCustomEndpoint(metric);
    }
  };

  public startReporting() {
    // Core Web Vitals
    onCLS(this.handleMetric);
    onFID(this.handleMetric);
    onFCP(this.handleMetric);
    onLCP(this.handleMetric);
    onTTFB(this.handleMetric);
  }

  public getMetrics(): Metric[] {
    return [...this.metrics];
  }

  public getMetricByName(name: string): Metric | undefined {
    return this.metrics.find(metric => metric.name === name);
  }

  public getAverageMetricValue(name: string): number {
    const metrics = this.metrics.filter(metric => metric.name === name);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }
}

// Create singleton instance
export const webVitalsReporter = new WebVitalsReporter({
  debug: process.env.NODE_ENV === 'development',
  reportToAnalytics: true,
});

// Export for easy access
export default webVitalsReporter;
