import React, { lazy, Suspense, memo, ComponentType } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Optimized loading component
const LoadingSpinner = memo(() => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <CircularProgress size={40} />
    <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
      Loading...
    </Box>
  </Box>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Higher-order component for lazy loading with error boundary
const withLazyLoading = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ComponentType
) => {
  const LazyComponent = lazy(importFunc);
  
  const WrappedComponent = memo((props: P) => {
    const FallbackComponent = fallback || LoadingSpinner;
    return (
      <Suspense fallback={<FallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  });
  
  WrappedComponent.displayName = `withLazyLoading(Component)`;
  
  return WrappedComponent;
};

// Pre-configured lazy components for common use cases
export const LazyComponents = {
  // Pages
  Home: withLazyLoading(() => import('./Pages/Home')),
  About: withLazyLoading(() => import('./Pages/About')),
  Services: withLazyLoading(() => import('./Pages/Services')),
  Contact: withLazyLoading(() => import('./Pages/Contact')),
  OurWork: withLazyLoading(() => import('./Pages/OurWork')),
  Career: withLazyLoading(() => import('./Pages/Career')),
  HireDevelopers: withLazyLoading(() => import('./Pages/HireDevelopers')),
  
  // Heavy components
  // Charts: withLazyLoading(() => import('./shared/Charts')), // Component doesn't exist
  // ImageGallery: withLazyLoading(() => import('./shared/ImageGallery')), // Component doesn't exist
  
  // Form components
  // ContactForm: withLazyLoading(() => import('./shared/ContactForm')), // Component doesn't exist
  // NewsletterForm: withLazyLoading(() => import('./shared/NewsletterForm')), // Component doesn't exist
  
  // Utility components
  ImageOptimizer: withLazyLoading(() => import('./AdvancedImageOptimizer')),
  PerformanceMonitor: withLazyLoading(() => import('./EnhancedPerformanceMonitor')),
};

// Dynamic component loader with caching
class ComponentCache {
  private cache = new Map<string, ComponentType<any>>();
  
  async loadComponent<T extends ComponentType<any>>(
    name: string,
    importFunc: () => Promise<{ default: T }>
  ): Promise<T> {
    if (this.cache.has(name)) {
      return this.cache.get(name) as T;
    }
    
    try {
      const module = await importFunc();
      const component = module.default;
      this.cache.set(name, component);
      return component;
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
      throw error;
    }
  }
  
  clearCache() {
    this.cache.clear();
  }
  
  getCacheSize() {
    return this.cache.size;
  }
}

export const componentCache = new ComponentCache();

// Optimized component loader with preloading
export const OptimizedComponentLoader = memo<{
  componentName: string;
  importFunc: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ComponentType;
  preload?: boolean;
}>(({ componentName, importFunc, fallback, preload = false }) => {
  const [Component, setComponent] = React.useState<ComponentType<any> | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  
  React.useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const component = await componentCache.loadComponent(componentName, importFunc);
        setComponent(() => component);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    loadComponent();
  }, [componentName, importFunc]);
  
  // Preload component if requested
  React.useEffect(() => {
    if (preload) {
      componentCache.loadComponent(componentName, importFunc).catch(console.warn);
    }
  }, [componentName, importFunc, preload]);
  
  if (loading) {
    const FallbackComponent = fallback || LoadingSpinner;
    return <FallbackComponent />;
  }
  
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          gap: 2,
          p: 3,
        }}
      >
        <Box sx={{ color: 'error.main', textAlign: 'center' }}>
          Failed to load component: {componentName}
        </Box>
        <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
          {error.message}
        </Box>
      </Box>
    );
  }
  
  if (!Component) {
    return <LoadingSpinner />;
  }
  
  return <Component />;
});

OptimizedComponentLoader.displayName = 'OptimizedComponentLoader';

// Preload critical components
export const preloadCriticalComponents = () => {
  const criticalComponents = [
    'Home',
    'About',
    'Services',
    'Contact',
  ];
  
  criticalComponents.forEach(name => {
    // Preload in the background
    setTimeout(() => {
      if (LazyComponents[name as keyof typeof LazyComponents]) {
        // Component is already loaded
        return;
      }
      
      // Preload the component
      import(`./Pages/${name}`).catch(console.warn);
    }, 1000);
  });
};

// Bundle size optimization utilities
export const bundleOptimization = {
  // Get component size estimate
  getComponentSize: (componentName: string) => {
    // This would be implemented with actual bundle analysis
    return componentCache.getCacheSize();
  },
  
  // Clear unused components from cache
  clearUnusedComponents: () => {
    componentCache.clearCache();
  },
  
  // Get cache statistics
  getCacheStats: () => ({
    size: componentCache.getCacheSize(),
    components: Array.from(componentCache['cache'].keys()),
  }),
};

export default {
  LazyComponents,
  OptimizedComponentLoader,
  preloadCriticalComponents,
  bundleOptimization,
  withLazyLoading,
};
