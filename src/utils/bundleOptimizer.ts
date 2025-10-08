// Bundle optimization utilities and configuration

// Preload critical resources
export const preloadCriticalResources = () => {
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

// Prefetch next likely pages
export const prefetchNextPages = () => {
  const nextPages = [
    '/about',
    '/services',
    '/contact',
    '/our-work',
    '/career',
    '/hire-developers',
  ];

  nextPages.forEach((page) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
};

// Resource hints for external domains
export const addResourceHints = () => {
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

// Lazy load non-critical components
export const lazyLoadComponents = () => {
  // Intersection Observer for lazy loading
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const dataSrc = element.getAttribute('data-src');
          if (dataSrc) {
            if (element.tagName === 'IMG') {
              element.setAttribute('src', dataSrc);
            } else if (element.tagName === 'IFRAME') {
              element.setAttribute('src', dataSrc);
            }
            element.removeAttribute('data-src');
            observer.unobserve(element);
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  // Observe all elements with data-src attribute
  const lazyElements = document.querySelectorAll('[data-src]');
  lazyElements.forEach((element) => observer.observe(element));

  return observer;
};

// Optimize images based on viewport
export const optimizeImagesForViewport = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  images.forEach((img) => {
    const image = img as HTMLImageElement;
    const rect = image.getBoundingClientRect();
    
    // If image is in viewport, load it
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const src = image.getAttribute('data-src');
      if (src) {
        image.src = src;
        image.removeAttribute('data-src');
      }
    }
  });
};

// Initialize all optimizations
export const initializeOptimizations = () => {
  preloadCriticalResources();
  prefetchNextPages();
  addResourceHints();
  
  // Initialize lazy loading
  const observer = lazyLoadComponents();
  
  // Optimize images on scroll
  window.addEventListener('scroll', optimizeImagesForViewport, { passive: true });
  
  // Preload critical fonts
  preloadCriticalFonts();
  
  // Initialize performance monitoring
  initializePerformanceMonitoring();
  
  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', optimizeImagesForViewport);
  };
};

// Preload critical fonts
export const preloadCriticalFonts = () => {
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  ];

  criticalFonts.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontUrl;
    link.as = 'style';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Performance monitoring utilities
export const initializePerformanceMonitoring = () => {
  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry);
        }
      }
    });
    
    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
    }
  }

  // Monitor layout shifts
  if ('PerformanceObserver' in window) {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          console.warn('Layout shift detected:', entry);
        }
      }
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Layout shift API not supported
    }
  }
};

// Resource prioritization
export const prioritizeResources = () => {
  // High priority resources
  const highPrioritySelectors = [
    'link[rel="preload"]',
    'script[src*="critical"]',
    'img[loading="eager"]',
  ];

  highPrioritySelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.setAttribute('fetchpriority', 'high');
      }
    });
  });

  // Low priority resources
  const lowPrioritySelectors = [
    'img[loading="lazy"]',
    'script[src*="analytics"]',
    'script[src*="ads"]',
  ];

  lowPrioritySelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.setAttribute('fetchpriority', 'low');
      }
    });
  });
};


