// Dynamic imports for better code splitting
// This file provides dynamic imports for large components to reduce initial bundle size

import { lazy } from 'react';

// Lazy load large components
export const LazyHomeWhyUs = lazy(() => import('./Pages/HomeWhyUs'));
export const LazyOurTechnology = lazy(() => import('./Pages/shared/OurTechnology'));
export const LazyWeOffer = lazy(() => import('./Pages/shared/WeOffer'));
export const LazyWeveBuilt = lazy(() => import('./Pages/shared/WeveBuilt'));
export const LazyOurNewsletter = lazy(() => import('./Pages/shared/OurNewsletter'));
export const LazyIndustryExpertise = lazy(() => import('./Pages/shared/IndustryExpertise'));
export const LazyHowWeWork = lazy(() => import('./Pages/shared/HowWeWork'));

// Lazy load page components
export const LazyAbout = lazy(() => import('./Pages/About'));
export const LazyServices = lazy(() => import('./Pages/Services'));
export const LazyContact = lazy(() => import('./Pages/Contact'));
export const LazyOurWork = lazy(() => import('./Pages/OurWork'));
export const LazyHireDevelopers = lazy(() => import('./Pages/HireDevelopers'));
export const LazyHireDevelopersDetails = lazy(() => import('./Pages/HireDevelopersDetails'));
export const LazyPrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
export const LazySiteMap = lazy(() => import('./Pages/SiteMap'));
export const LazyAdminPortal = lazy(() => import('./Pages/AdminPortal'));

// Lazy load shared components
export const LazyHeader = lazy(() => import('./Header'));
export const LazyFooter = lazy(() => import('./Footer'));
export const LazyErrorBoundary = lazy(() => import('./ErrorBoundary'));
export const LazyAnalytics = lazy(() => import('./Analytics'));
export const LazyAccessibilityEnhancer = lazy(() => import('./Accessibility'));

// Lazy load utility components
export const LazyPerformanceMonitor = lazy(() => import('./PerformanceMonitor'));
export const LazyEnhancedPerformanceMonitor = lazy(() => import('./EnhancedPerformanceMonitor'));
export const LazyOptimizedImage = lazy(() => import('./OptimizedImage'));
export const LazyStableImage = lazy(() => import('./StableImage'));
export const LazyAdvancedImageOptimizer = lazy(() => import('./AdvancedImageOptimizer'));

// Lazy load Material-UI components (for very large components)
// Note: @mui/x-data-grid needs to be installed separately if DataGrid is needed

// Preload critical components
export const preloadCriticalComponents = () => {
  // Preload components that are likely to be needed soon
  import('./Pages/HomeWhyUs');
  import('./Pages/shared/OurTechnology');
  import('./Pages/shared/WeOffer');
};

// Preload route components based on user interaction
export const preloadRouteComponents = (route: string) => {
  switch (route) {
    case '/about':
      import('./Pages/About');
      break;
    case '/services':
      import('./Pages/Services');
      break;
    case '/contact':
      import('./Pages/Contact');
      break;
    case '/our-work':
      import('./Pages/OurWork');
      break;
    case '/hire-developers':
      import('./Pages/HireDevelopers');
      break;
    default:
      break;
  }
};

export default {
  LazyHomeWhyUs,
  LazyOurTechnology,
  LazyWeOffer,
  LazyWeveBuilt,
  LazyOurNewsletter,
  LazyIndustryExpertise,
  LazyHowWeWork,
  LazyAbout,
  LazyServices,
  LazyContact,
  LazyOurWork,
  LazyHireDevelopers,
  LazyHireDevelopersDetails,
  LazyPrivacyPolicy,
  LazySiteMap,
  LazyAdminPortal,
  LazyHeader,
  LazyFooter,
  LazyErrorBoundary,
  LazyAnalytics,
  LazyAccessibilityEnhancer,
  LazyPerformanceMonitor,
  LazyEnhancedPerformanceMonitor,
  LazyOptimizedImage,
  LazyStableImage,
  LazyAdvancedImageOptimizer,
  preloadCriticalComponents,
  preloadRouteComponents,
};
