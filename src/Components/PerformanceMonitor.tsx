import React, { useEffect, useCallback, useRef } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

interface PerformanceMonitorProps {
  onMetric?: (metric: Metric) => void;
  enableAdvancedMonitoring?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  onMetric, 
  enableAdvancedMonitoring = true 
}) => {
  const metricsRef = useRef<Metric[]>([]);

  // Enhanced metric tracking with better error handling and batching
  const trackMetric = useCallback((metric: Metric) => {
    // Store metric for batch processing
    metricsRef.current.push(metric);

    // Send to analytics service with error handling
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      try {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      } catch (error) {
        console.warn('Failed to send metric to Google Analytics:', error);
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric);
    }

    // Callback for custom handling
    onMetric?.(metric);
  }, [onMetric]);

  useEffect(() => {
    // Measure Core Web Vitals
    onCLS(trackMetric);
    onINP(trackMetric);
    onFCP(trackMetric);
    onLCP(trackMetric);
    onTTFB(trackMetric);

    // Enhanced navigation timing with better error handling
    const trackNavigationTiming = () => {
      if (!('performance' in window) || !('getEntriesByType' in performance)) return;

      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics: Metric = {
            name: 'TTFB',
            value: navigation.loadEventEnd - navigation.fetchStart,
            delta: navigation.loadEventEnd - navigation.fetchStart,
            id: 'navigation-timing',
            rating: 'good',
            entries: [navigation],
            navigationType: navigation.type as any,
          };
          
          trackMetric(metrics);
        }
      } catch (error) {
        console.warn('Failed to track navigation timing:', error);
      }
    };

    // Track memory usage
    const trackMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        trackMetric({
          name: 'TTFB',
          value: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
          delta: memory.usedJSHeapSize / 1024 / 1024,
          id: 'memory-usage',
          rating: 'good',
          entries: [],
          navigationType: 'reload' as any,
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
              name: 'TTFB',
              value: resource.duration,
              delta: resource.duration,
              id: `slow-image-${resource.name}`,
              rating: 'good',
              entries: [resource],
              navigationType: 'reload' as any,
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
  }, [onMetric, trackMetric]);

  return null;
};

export default PerformanceMonitor;