// Advanced performance optimizations

// Debounce utility for performance-critical functions
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer for lazy loading with better performance
export const createLazyLoadObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical resources dynamically
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/assets/logo192.png', as: 'image' },
    { href: '/assets/company-logo.png', as: 'image' },
    { href: '/assets/hire-us.png', as: 'image' },
    { href: '/assets/our-work-img.png', as: 'image' },
    { href: '/assets/career-img.png', as: 'image' },
    { href: '/assets/about-img.png', as: 'image' },
    { href: '/assets/contact-img.png', as: 'image' },
  ];

  criticalResources.forEach(({ href, as }) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
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
    if (!document.querySelector(`link[href="${page}"]`)) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    }
  });
};

// Optimize images with better loading strategies
export const optimizeImageLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if (images.length === 0) return;

  const observer = createLazyLoadObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => observer.observe(img));
};

// Performance monitoring with better metrics
export const trackPerformanceMetrics = () => {
  // Track First Contentful Paint
  if ('performance' in window && 'getEntriesByType' in performance) {
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    });
  }

  // Track Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }
  }
};

// Optimize scroll performance
export const optimizeScrollPerformance = () => {
  let ticking = false;

  const updateScrollPosition = () => {
    // Add scroll-based optimizations here
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

// Initialize all advanced optimizations
export const initializeAdvancedOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Preload critical resources
  preloadCriticalResources();
  
  // Prefetch next pages
  prefetchNextPages();
  
  // Optimize image loading
  optimizeImageLoading();
  
  // Track performance metrics
  trackPerformanceMetrics();
  
  // Optimize scroll performance
  optimizeScrollPerformance();
  
  console.log('Advanced optimizations initialized');
};
