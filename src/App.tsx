import React, { useEffect, memo } from 'react';

import ErrorBoundary from './Components/ErrorBoundary.tsx';
import EnhancedPerformanceMonitor from './Components/EnhancedPerformanceMonitor.tsx';
import AccessibilityEnhancer from './Components/Accessibility.tsx';
import { initializeAdvancedOptimizations } from './utils/advancedOptimizations.ts';
import webVitalsReporter from './utils/webVitalsReporter.ts';
import { monitorBundleSize } from './utils/bundleAnalyzer.ts';
import { setupImageOptimization } from './utils/imageOptimizationSetup.ts';
import OptimizedRouter from './Components/OptimizedRouter.tsx';

const AppContent = memo(() => {
  // Initialize global optimizations
  // Initialize global optimizations
  useEffect(() => {
    // Initialize image optimization
    setupImageOptimization();

    // Start Web Vitals reporting
    webVitalsReporter.startReporting();

    // Start bundle size monitoring in development
    if (process.env.NODE_ENV === 'development') {
      // Only initialize these in development to avoid main thread blocking in production
      initializeAdvancedOptimizations();
      
      const stopMonitoring = monitorBundleSize((analysis) => {
        console.log('Bundle Analysis:', analysis);
        if (analysis.performanceScore < 70) {
          console.warn('Performance score is low:', analysis.performanceScore);
          console.log('Recommendations:', analysis.recommendations);
        }
      });

      return () => stopMonitoring();
    }
  }, []);

  return (
    <>
      <AccessibilityEnhancer />
      {process.env.NODE_ENV === 'development' && (
        <EnhancedPerformanceMonitor
          enableLongTaskMonitoring={true}
          enableMemoryMonitoring={true}
          enableResourceMonitoring={true}
          enableLayoutShiftMonitoring={true}
        />
      )}
      <main id="main-content" role="main">
        <ErrorBoundary>
          <OptimizedRouter />
        </ErrorBoundary>
      </main>
    </>
  );
});

AppContent.displayName = 'AppContent';

const App: React.FC = memo(() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppContent />
    </div>
  );
});

App.displayName = 'App';

export default App;