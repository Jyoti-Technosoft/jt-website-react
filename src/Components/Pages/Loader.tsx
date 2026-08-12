import React from 'react';
import "../../styles/loader.css";

const Loader: React.FC = () => {
  const logoSrc = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/assets/logo.png` : '/assets/logo.png';

  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <span className="ring ring1"></span>
        <span className="ring ring2"></span>
        <span className="ring ring3"></span>
        <img src={logoSrc} alt="Loading..." className="loader-logo" />
      </div>
    </div>
  );
};

export default Loader;
