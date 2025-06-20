import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Header from './Components/Header.tsx';
import Footer from './Components/Footer.tsx';
import Home from './Components/Pages/Home.tsx';
import About from './Components/Pages/About.tsx';
import Services from './Components/Pages/Services.tsx';
import Contact from './Components/Pages/Contact.tsx';
import OurWork from './Components/Pages/OurWork.tsx';
import HireDevelopers from './Components/Pages/HireDevelopers.tsx';
import Career from './Components/Pages/Career.tsx';
import CareerDetails from './Components/Pages/CareerDetails.tsx';
import HireDevelopersDetails from './Components/Pages/HireDevelopersDetails.tsx';
import ServiceDetails from './Components/Pages/ServiceDetails.tsx';
import SiteMap from './Components/Pages/SiteMap.tsx';
import AdminPortal from './Components/Pages/AdminPortal.tsx';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy.tsx';
import Loader from './Components/Pages/Loader.tsx';

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div style={{ flex: 1 }}>
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
        </Routes>
      </div>
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
