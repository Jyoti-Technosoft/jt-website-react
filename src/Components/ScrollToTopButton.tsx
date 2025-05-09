import React from 'react';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 18px',
        borderRadius: '50%',
        backgroundColor: '#347CCC',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px'
      }}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
