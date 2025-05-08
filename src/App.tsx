import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/hire-developers" element={<HireDevelopers />} />
          <Route path="/career" element={<Career />} />
          <Route path="/career-details" element={<CareerDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
