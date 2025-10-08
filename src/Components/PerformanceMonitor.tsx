import React, { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceMonitorProps {
  onMetric?: (metric: any) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onMetric }) => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackMetric = (metric: any) => {
      // Send to analytics service
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metric:', metric);
      }

      // Callback for custom handling
      onMetric?.(metric);
    };

    // Measure Core Web Vitals
    onCLS(trackMetric);
    onFID(trackMetric);
    onFCP(trackMetric);
    onLCP(trackMetric);
    onTTFB(trackMetric);

    // Track additional performance metrics
    const trackNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            name: 'Navigation Timing',
            value: navigation.loadEventEnd - navigation.fetchStart,
            delta: navigation.loadEventEnd - navigation.fetchStart,
            id: 'navigation-timing',
            navigation: {
              domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
              loadComplete: navigation.loadEventEnd - navigation.fetchStart,
              firstByte: navigation.responseStart - navigation.fetchStart,
              domInteractive: navigation.domInteractive - navigation.fetchStart,
              domComplete: navigation.domComplete - navigation.fetchStart,
            }
          };
          
          trackMetric(metrics);
        }
      }
    };

    // Track memory usage
    const trackMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        trackMetric({
          name: 'Memory Usage',
          value: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
          delta: memory.usedJSHeapSize / 1024 / 1024,
          id: 'memory-usage',
          memory: {
            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,
            limit: memory.jsHeapSizeLimit,
          }
        });
      }
    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackNavigationTiming();
      trackMemoryUsage();
    } else {
      window.addEventListener('load', () => {
        trackNavigationTiming();
        trackMemoryUsage();
      });
    }

    // Track resource loading performance
    const trackResourceTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resources = performance.getEntriesByType('resource');
        
        resources.forEach((resource: PerformanceResourceTiming) => {
          if (resource.initiatorType === 'img' && resource.duration > 1000) {
            trackMetric({
              name: 'Slow Image Load',
              value: resource.duration,
              delta: resource.duration,
              id: `slow-image-${resource.name}`,
              url: resource.name,
            });
          }
        });
      }
    };

    // Track resource timing after a delay
    setTimeout(trackResourceTiming, 2000);

    return () => {
      window.removeEventListener('load', trackNavigationTiming);
    };
  }, [onMetric]);

  return null;
};

export default PerformanceMonitor;