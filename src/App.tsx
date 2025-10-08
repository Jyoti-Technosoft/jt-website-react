import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Header from './Components/Header.tsx';
import Footer from './Components/Footer.tsx';
import Loader from './Components/Pages/Loader.tsx';
import ProjectDetail from './Components/Pages/ProjectDetail.tsx';
import ErrorBoundary from './Components/ErrorBoundary.tsx';
import PerformanceMonitor from './Components/PerformanceMonitor.tsx';
import Analytics from './Components/Analytics.tsx';
import AccessibilityEnhancer from './Components/Accessibility.tsx';
import { initializeAdvancedOptimizations } from './utils/advancedOptimizations.ts';
import webVitalsReporter from './utils/webVitalsReporter.ts';

// Lazily loaded pages
const Home = lazy(() => import('./Components/Pages/Home.tsx'));
const About = lazy(() => import('./Components/Pages/About.tsx'));
const Services = lazy(() => import('./Components/Pages/Services.tsx'));
const Contact = lazy(() => import('./Components/Pages/Contact.tsx'));
const OurWork = lazy(() => import('./Components/Pages/OurWork.tsx'));
const HireDevelopers = lazy(() => import('./Components/Pages/HireDevelopers.tsx'));
const Career = lazy(() => import('./Components/Pages/Career.tsx'));
const CareerDetails = lazy(() => import('./Components/Pages/CareerDetails.tsx'));
const HireDevelopersDetails = lazy(() => import('./Components/Pages/HireDevelopersDetails.tsx'));
const ServiceDetails = lazy(() => import('./Components/Pages/ServiceDetails.tsx'));
const SiteMap = lazy(() => import('./Components/Pages/SiteMap.tsx'));
const AdminPortal = lazy(() => import('./Components/Pages/AdminPortal.tsx'));
const PrivacyPolicy = lazy(() => import('./Components/Pages/PrivacyPolicy.tsx'));
const NotFound = lazy(() => import('./Components/Pages/NotFound.tsx'));

const AppContent = () => {
  const location = useLocation();

  // Initialize global optimizations
  useEffect(() => {
    // Initialize advanced optimizations
    initializeAdvancedOptimizations();
    
    // Start Web Vitals reporting
    webVitalsReporter.startReporting();
    
    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <>
      <Analytics />
      <AccessibilityEnhancer />
      <PerformanceMonitor />
      <Header />
      <main id="main-content" role="main">
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/site-map" element={<SiteMap />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/our-work" element={<OurWork />} />
              <Route path="/hire-developers" element={<HireDevelopers />} />
              <Route path="/hire-developers/:id" element={<HireDevelopersDetails />} />
              <Route path="/career" element={<Career />} />
              <Route path="/career-details" element={<CareerDetails />} />
              <Route path="/jt-admin" element={<AdminPortal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppContent />
      </div>
    </Router>
  );
};

export default App;