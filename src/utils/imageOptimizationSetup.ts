// Simple setup for automatic image optimization
// Just import this in your App.tsx and call initializeImageOptimization()

import { initializeImageOptimization } from './imageOptimizer.ts';

// Initialize image optimization
export const setupImageOptimization = () => {
  // Only run on client side
  if (typeof window !== 'undefined') {
    initializeImageOptimization();
  }
};

// Optional: Add to your App.tsx like this:
/*
import { setupImageOptimization } from './utils/imageOptimizationSetup';

function App() {
  useEffect(() => {
    setupImageOptimization();
  }, []);

  return (
    // your app content
  );
}
*/
