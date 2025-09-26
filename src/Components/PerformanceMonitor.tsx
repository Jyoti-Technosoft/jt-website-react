import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceMetrics {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Function to send metrics to analytics (replace with your analytics service)
    const sendToAnalytics = (metric: PerformanceMetrics) => {
      // Example: Google Analytics 4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }
      
      // Example: Custom analytics
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metric:', metric);
        // Send to your analytics service here
      }
    };

    // Measure Core Web Vitals
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Additional performance monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Navigation timing:', {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
          });
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
