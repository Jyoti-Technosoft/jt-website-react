import React, { useEffect, useRef, useCallback } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Custom metric interface for non-web-vitals metrics
interface CustomMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  startTime?: number;
  duration?: number;
  memory?: any;
  url?: string;
  sources?: any[];
  navigation?: any;
  resourceType?: string;
  transferSize?: number;
  decodedBodySize?: number;
}

interface EnhancedPerformanceMonitorProps {
  onMetric?: (metric: Metric | CustomMetric) => void;
  enableLongTaskMonitoring?: boolean;
  enableMemoryMonitoring?: boolean;
  enableResourceMonitoring?: boolean;
  enableLayoutShiftMonitoring?: boolean;
}

const EnhancedPerformanceMonitor: React.FC<EnhancedPerformanceMonitorProps> = ({
  onMetric,
  enableLongTaskMonitoring = true,
  enableMemoryMonitoring = true,
  enableResourceMonitoring = true,
  enableLayoutShiftMonitoring = true,
}) => {
  const longTaskObserverRef = useRef<PerformanceObserver | null>(null);
  const layoutShiftObserverRef = useRef<PerformanceObserver | null>(null);
  const resourceObserverRef = useRef<PerformanceObserver | null>(null);

  // Enhanced metric tracking with better error handling
  const trackMetric = useCallback((metric: Metric | CustomMetric) => {
    // Send to analytics service
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

  // Long Task monitoring for better performance insights
  const setupLongTaskMonitoring = useCallback(() => {
    if (!enableLongTaskMonitoring || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) { // Tasks longer than 50ms
            trackMetric({
              name: 'Long Task',
              value: entry.duration,
              delta: entry.duration,
              id: `long-task-${Date.now()}`,
              startTime: entry.startTime,
              duration: entry.duration,
            });
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });
      longTaskObserverRef.current = observer;
    } catch (error) {
      console.warn('Long task monitoring not supported:', error);
    }
  }, [enableLongTaskMonitoring, trackMetric]);

  // Memory usage monitoring
  const setupMemoryMonitoring = useCallback(() => {
    if (!enableMemoryMonitoring || !('memory' in performance)) return;

    const trackMemoryUsage = () => {
      const memory = (performance as any).memory;
      if (memory) {
        trackMetric({
          name: 'Memory Usage',
          value: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
          delta: memory.usedJSHeapSize / 1024 / 1024,
          id: 'memory-usage',
          memory: {
            used: memory.usedJSHeapSize,
            total: memory.totalJSHeapSize,
            limit: memory.jsHeapSizeLimit,
            usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
          }
        });
      }
    };

    // Track memory usage periodically (reduced frequency for better performance)
    const memoryInterval = setInterval(trackMemoryUsage, 60000); // Every 60 seconds

    return () => clearInterval(memoryInterval);
  }, [enableMemoryMonitoring, trackMetric]);

  // Resource loading performance monitoring
  const setupResourceMonitoring = useCallback(() => {
    if (!enableResourceMonitoring || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const resourceEntry = entry as PerformanceResourceTiming;
          // Track slow resources
          if (resourceEntry.duration > 1000) {
            trackMetric({
              name: 'Slow Resource',
              value: resourceEntry.duration,
              delta: resourceEntry.duration,
              id: `slow-resource-${resourceEntry.name}`,
              url: resourceEntry.name,
              resourceType: resourceEntry.initiatorType,
              transferSize: resourceEntry.transferSize,
              decodedBodySize: resourceEntry.decodedBodySize,
            });
          }

          // Track large resources
          if (resourceEntry.transferSize > 1024 * 1024) { // > 1MB
            trackMetric({
              name: 'Large Resource',
              value: resourceEntry.transferSize,
              delta: resourceEntry.transferSize,
              id: `large-resource-${resourceEntry.name}`,
              url: resourceEntry.name,
              resourceType: resourceEntry.initiatorType,
              duration: resourceEntry.duration,
            });
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });
      resourceObserverRef.current = observer;
    } catch (error) {
      console.warn('Resource monitoring not supported:', error);
    }
  }, [enableResourceMonitoring, trackMetric]);

  // Layout shift monitoring
  const setupLayoutShiftMonitoring = useCallback(() => {
    if (!enableLayoutShiftMonitoring || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            trackMetric({
              name: 'Layout Shift',
              value: entry.value,
              delta: entry.value,
              id: `layout-shift-${Date.now()}`,
              sources: entry.sources,
              startTime: entry.startTime,
            });
          }
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      layoutShiftObserverRef.current = observer;
    } catch (error) {
      console.warn('Layout shift monitoring not supported:', error);
    }
  }, [enableLayoutShiftMonitoring, trackMetric]);

  // Navigation timing analysis
  const trackNavigationTiming = useCallback(() => {
    if (!('performance' in window) || !('getEntriesByType' in performance)) return;

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
          dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcpConnect: navigation.connectEnd - navigation.connectStart,
          sslNegotiation: navigation.secureConnectionStart > 0 ? 
            navigation.connectEnd - navigation.secureConnectionStart : 0,
        }
      };
      
      trackMetric(metrics);
    }
  }, [trackMetric]);

  // Paint timing analysis
  const trackPaintTiming = useCallback(() => {
    if (!('performance' in window) || !('getEntriesByType' in performance)) return;

    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      trackMetric({
        name: entry.name === 'first-contentful-paint' ? 'FCP' : 'Paint',
        value: entry.startTime,
        delta: entry.startTime,
        id: entry.name,
        startTime: entry.startTime,
      });
    });
  }, [trackMetric]);

  useEffect(() => {
    // Core Web Vitals
    onCLS(trackMetric);
    onFID(trackMetric);
    onFCP(trackMetric);
    onLCP(trackMetric);
    onTTFB(trackMetric);

    // Setup additional monitoring
    setupLongTaskMonitoring();
    setupResourceMonitoring();
    setupLayoutShiftMonitoring();
    
    const memoryCleanup = setupMemoryMonitoring();

    // Track navigation and paint timing
    if (document.readyState === 'complete') {
      trackNavigationTiming();
      trackPaintTiming();
    } else {
      const handleLoad = () => {
        trackNavigationTiming();
        trackPaintTiming();
      };
      
      window.addEventListener('load', handleLoad);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        memoryCleanup?.();
      };
    }

    return () => {
      // Cleanup observers
      longTaskObserverRef.current?.disconnect();
      resourceObserverRef.current?.disconnect();
      layoutShiftObserverRef.current?.disconnect();
      memoryCleanup?.();
    };
  }, [
    trackMetric,
    setupLongTaskMonitoring,
    setupResourceMonitoring,
    setupLayoutShiftMonitoring,
    setupMemoryMonitoring,
    trackNavigationTiming,
    trackPaintTiming,
  ]);

  return null;
};

export default React.memo(EnhancedPerformanceMonitor);
