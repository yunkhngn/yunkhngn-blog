const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `yunkhngn-blog-${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  '/writing',
  '/project',
  '/photo',
  '/about',
  '/contact',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  // Add bypass condition for development and debugging
  const url = new URL(event.request.url);
  const bypassCache = url.searchParams.has('nocache') || 
                      event.request.headers.get('cache-control') === 'no-cache' ||
                      url.pathname.includes('_next/static') === false; // Don't cache Next.js pages aggressively

  // Handle API requests with network-first strategy (changed from cache-first)
  if (event.request.url.includes('api.github.com') || 
      event.request.url.includes('contentful.com')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Only cache successful responses for 5 minutes
          if (networkResponse.ok && !bypassCache) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              // Add expiration header
              const headers = new Headers(responseToCache.headers);
              headers.set('sw-cache-timestamp', Date.now().toString());
              const cachedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
              });
              cache.put(event.request, cachedResponse);
            });
          }
          return networkResponse;
        })
        .catch((error) => {
          console.log('Network failed, trying cache:', error);
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              // Check if cache is still valid (5 minutes)
              const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
              if (cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < 300000) {
                return cachedResponse;
              }
            }
            throw error; // Re-throw if no valid cache
          });
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy (but with expiration)
  if (event.request.destination === 'image' || 
      event.request.destination === 'font' ||
      event.request.destination === 'style' ||
      event.request.destination === 'script') {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse && !bypassCache) {
            // Check if static asset cache is still valid (1 hour)
            const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
            if (!cacheTimestamp || (Date.now() - parseInt(cacheTimestamp)) < 3600000) {
              return cachedResponse;
            }
          }
          
          return fetch(event.request).then((fetchResponse) => {
            // Cache the response for future use
            if (fetchResponse.ok) {
              return caches.open(CACHE_NAME).then((cache) => {
                const headers = new Headers(fetchResponse.headers);
                headers.set('sw-cache-timestamp', Date.now().toString());
                const responseToCache = new Response(fetchResponse.body, {
                  status: fetchResponse.status,
                  statusText: fetchResponse.statusText,
                  headers: headers
                });
                cache.put(event.request, responseToCache.clone());
                return fetchResponse;
              });
            }
            return fetchResponse;
          });
        })
    );
    return;
  }

  // Handle HTML pages with network-first strategy (no aggressive caching)
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Only cache HTML pages for 1 minute and only if not bypassing
          if (response.ok && !bypassCache) {
            return caches.open(CACHE_NAME).then((cache) => {
              const headers = new Headers(response.headers);
              headers.set('sw-cache-timestamp', Date.now().toString());
              const responseToCache = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: headers
              });
              cache.put(event.request, responseToCache.clone());
              return response;
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails and cache is recent
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
              if (cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < 60000) { // 1 minute
                return cachedResponse;
              }
            }
            throw new Error('No valid cache available');
          });
        })
    );
    return;
  }

  // Default: network first, minimal caching
  if (!bypassCache) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            return caches.open(CACHE_NAME).then((cache) => {
              const headers = new Headers(response.headers);
              headers.set('sw-cache-timestamp', Date.now().toString());
              const responseToCache = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: headers
              });
              cache.put(event.request, responseToCache.clone());
              return response;
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
