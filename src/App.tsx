import React, { useEffect, memo, lazy, Suspense } from 'react';

import ErrorBoundary from './Components/ErrorBoundary.tsx';
import EnhancedPerformanceMonitor from './Components/EnhancedPerformanceMonitor.tsx';
import AccessibilityEnhancer from './Components/Accessibility.tsx';
import { initializeAdvancedOptimizations } from './utils/advancedOptimizations.ts';
import webVitalsReporter from './utils/webVitalsReporter.ts';
import { monitorBundleSize } from './utils/bundleAnalyzer.ts';
import { setupImageOptimization } from './utils/imageOptimizationSetup.ts';

// Lazy load the router component
const OptimizedRouter = lazy(() => import('./Components/OptimizedRouter.tsx'));

const AppContent = memo(() => {
  // Initialize global optimizations
  useEffect(() => {
    // Initialize image optimization
    setupImageOptimization();
    // Initialize advanced optimizations
    initializeAdvancedOptimizations();
    
    // Start Web Vitals reporting
    webVitalsReporter.startReporting();
    
    // Start bundle size monitoring in development
    if (process.env.NODE_ENV === 'development') {
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
      <EnhancedPerformanceMonitor 
        enableLongTaskMonitoring={true}
        enableMemoryMonitoring={true}
        enableResourceMonitoring={true}
        enableLayoutShiftMonitoring={true}
      />
      <main id="main-content" role="main">
        <ErrorBoundary>
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>Loading...</div>}>
            <OptimizedRouter />
          </Suspense>
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