// Enhanced Service Worker for better performance and caching
const CACHE_NAME = 'jt-website-v2.0.0';
const STATIC_CACHE = 'static-v2.0.0';
const DYNAMIC_CACHE = 'dynamic-v2.0.0';
const IMAGE_CACHE = 'images-v2.0.0';
const API_CACHE = 'api-v2.0.0';

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Critical resources that should be cached immediately
const CRITICAL_RESOURCES = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/assets/logo192.png',
  '/assets/company-logo.png',
  '/manifest.json'
];

// Resources that can be cached with stale-while-revalidate
const STALE_WHILE_REVALIDATE_RESOURCES = [
  '/about',
  '/services',
  '/contact',
  '/our-work',
  '/career',
  '/hire-developers'
];

// Image resources that should use cache-first strategy
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.gif'];

// API endpoints that should use network-first strategy
const API_ENDPOINTS = ['/api/', '/contact-form', '/newsletter'];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('Service Worker: Critical resources cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache critical resources', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE && 
                cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Determine caching strategy based on request type
  const strategy = getCachingStrategy(request);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(request, IMAGE_CACHE));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(request, API_CACHE));
      break;
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
      break;
    case CACHE_STRATEGIES.NETWORK_ONLY:
      event.respondWith(fetch(request));
      break;
    case CACHE_STRATEGIES.CACHE_ONLY:
      event.respondWith(cacheOnly(request, STATIC_CACHE));
      break;
    default:
      event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
  }
});

// Determine caching strategy based on request
function getCachingStrategy(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Static assets (JS, CSS, fonts) - cache first
  if (pathname.includes('/static/') || 
      pathname.includes('.css') || 
      pathname.includes('.js') || 
      pathname.includes('.woff') || 
      pathname.includes('.woff2')) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  
  // Images - cache first
  if (IMAGE_EXTENSIONS.some(ext => pathname.includes(ext))) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  
  // API calls - network first
  if (API_ENDPOINTS.some(endpoint => pathname.includes(endpoint))) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // HTML pages - stale while revalidate
  if (pathname === '/' || STALE_WHILE_REVALIDATE_RESOURCES.includes(pathname)) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }
  
  // Default strategy
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache First Strategy failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached response if available
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Cache Only Strategy
async function cacheOnly(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  return new Response('Not cached', { status: 404 });
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Background sync');
  // Implement background sync logic here
}

// Push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/logo192.png',
      badge: '/assets/logo192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(clearAllCaches());
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('Service Worker: All caches cleared');
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
  const startTime = performance.now();
  
  event.respondWith(
    handleRequest(event.request).then((response) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log slow requests
      if (duration > 1000) {
        console.warn(`Slow request: ${event.request.url} took ${duration}ms`);
      }
      
      return response;
    })
  );
});

async function handleRequest(request) {
  // This will be handled by the main fetch event listener
  return fetch(request);
}

console.log('Service Worker: Enhanced service worker loaded');
