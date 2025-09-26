// Bundle optimization utilities and configuration

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  const criticalResources = [
    '/assets/logo192.png',
    '/assets/company-logo.png',
    '/assets/hire-us.png',
    '/assets/our-work-img.png',
    '/assets/career-img.png',
    '/assets/about-img.png',
    '/assets/contact-img.png',
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Resource hints for external domains
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;
  
  const externalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google.com',
    'https://www.gstatic.com',
  ];

  externalDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Initialize all optimizations
export const initializeOptimizations = () => {
  if (typeof window === 'undefined') return () => {};
  
  preloadCriticalResources();
  addResourceHints();
  
  return () => {
    // Cleanup function
  };
};
