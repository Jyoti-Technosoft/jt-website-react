import React, { Suspense, lazy, memo, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

// Lazy load components with better error boundaries
// Group related routes to reduce chunk count
const Home = lazy(() => import(/* webpackChunkName: "main-pages" */ './Pages/Home.tsx'));
const About = lazy(() => import(/* webpackChunkName: "main-pages" */ './Pages/About.tsx'));
const Services = lazy(() => import(/* webpackChunkName: "main-pages" */ './Pages/Services.tsx'));
const Contact = lazy(() => import(/* webpackChunkName: "main-pages" */ './Pages/Contact.tsx'));

const OurWork = lazy(() => import(/* webpackChunkName: "content-pages" */ './Pages/OurWork.tsx'));
const HireDevelopers = lazy(() => import(/* webpackChunkName: "content-pages" */ './Pages/HireDevelopers.tsx'));
const Career = lazy(() => import(/* webpackChunkName: "content-pages" */ './Pages/Career.tsx'));

const ServiceDetails = lazy(() => import(/* webpackChunkName: "detail-pages" */ './Pages/ServiceDetails.tsx'));
const HireDevelopersDetails = lazy(() => import(/* webpackChunkName: "detail-pages" */ './Pages/HireDevelopersDetails.tsx'));
const CareerDetails = lazy(() => import(/* webpackChunkName: "detail-pages" */ './Pages/CareerDetails.tsx'));

const SiteMap = lazy(() => import(/* webpackChunkName: "utility-pages" */ './Pages/SiteMap.tsx'));
const PrivacyPolicy = lazy(() => import(/* webpackChunkName: "utility-pages" */ './Pages/PrivacyPolicy.tsx'));
const NotFound = lazy(() => import(/* webpackChunkName: "utility-pages" */ './Pages/NotFound.tsx'));

const AdminPortal = lazy(() => import(/* webpackChunkName: "admin" */ './Pages/AdminPortal.tsx'));

// Optimized loading component
const LoadingSpinner = memo(() => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
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

// Error boundary component for route-level errors
const RouteErrorBoundary = memo(({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = React.useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Route error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 2,
          p: 3,
        }}
      >
        <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'error.main' }}>
          Something went wrong
        </Box>
        <Box sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Please refresh the page or try again later.
        </Box>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Refresh Page
        </button>
      </Box>
    );
  }

  return <>{children}</>;
});

RouteErrorBoundary.displayName = 'RouteErrorBoundary';

// Route component with optimized loading
const RouteComponent = memo(({ 
  component: Component, 
  fallback 
}: { 
  component: React.ComponentType; 
  fallback?: React.ReactNode;
}) => (
  <Suspense fallback={fallback || <LoadingSpinner />}>
    <RouteErrorBoundary>
      <Component />
    </RouteErrorBoundary>
  </Suspense>
));

RouteComponent.displayName = 'RouteComponent';

// Scroll to top component
const ScrollToTop = memo(() => {
  const location = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame for better performance
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    requestAnimationFrame(scrollToTop);
  }, [location.pathname]);

  return null;
});

ScrollToTop.displayName = 'ScrollToTop';

// Main router component
const OptimizedRouter: React.FC = () => {
  // Preload critical routes
  const preloadCriticalRoutes = useCallback(() => {
    // Preload critical pages in the background
    const criticalRoutes = [
      () => import('./Pages/About.tsx'),
      () => import('./Pages/Services.tsx'),
      () => import('./Pages/Contact.tsx'),
    ];

    // Preload after initial load
    setTimeout(() => {
      criticalRoutes.forEach(loadRoute => {
        loadRoute().catch(console.warn);
      });
    }, 2000);
  }, []);

  useEffect(() => {
    preloadCriticalRoutes();
  }, [preloadCriticalRoutes]);

  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={<RouteComponent component={Home} />} 
        />
        <Route 
          path="/about" 
          element={<RouteComponent component={About} />} 
        />
        <Route 
          path="/services" 
          element={<RouteComponent component={Services} />} 
        />
        <Route 
          path="/services/:id" 
          element={<RouteComponent component={ServiceDetails} />} 
        />
        <Route 
          path="/contact" 
          element={<RouteComponent component={Contact} />} 
        />
        <Route 
          path="/site-map" 
          element={<RouteComponent component={SiteMap} />} 
        />
        <Route 
          path="/privacy-policy" 
          element={<RouteComponent component={PrivacyPolicy} />} 
        />
        <Route 
          path="/our-work" 
          element={<RouteComponent component={OurWork} />} 
        />
        <Route 
          path="/hire-developers" 
          element={<RouteComponent component={HireDevelopers} />} 
        />
        <Route 
          path="/hire-developers/:id" 
          element={<RouteComponent component={HireDevelopersDetails} />} 
        />
        <Route 
          path="/career" 
          element={<RouteComponent component={Career} />} 
        />
        <Route 
          path="/career-details" 
          element={<RouteComponent component={CareerDetails} />} 
        />
        <Route 
          path="/jt-admin" 
          element={<RouteComponent component={AdminPortal} />} 
        />
        <Route 
          path="*" 
          element={<RouteComponent component={NotFound} />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default memo(OptimizedRouter);
