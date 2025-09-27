// A robust service worker for caching assets for offline use.
const CACHE_NAME = 'dr-sher-ortho-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/offline.html',
  'https://pwrwwtasf4ic26f4.public.blob.vercel-storage.com/AI%20Images/nas-logo-1.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap'
];

// Pre-cache the application shell on install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Stale-while-revalidate strategy with offline fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Check if we received a valid response to cache
            if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
              // Don't cache the API responses
              if (!event.request.url.includes('/api/chat')) {
                cache.put(event.request, networkResponse.clone());
              }
            }
            return networkResponse;
          })
          .catch(() => {
            // The fetch failed, likely because the user is offline.
            // If the request was for a page navigation, serve the offline fallback page.
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            // For other types of requests (images, API calls), we don't return the offline page.
            // They will fail, and the app's UI should handle it (e.g., SafeImage component).
          });

        // Return cached response immediately if available, otherwise try to fetch.
        // If fetch fails, the catch block above will handle it.
        return response || fetchPromise;
      });
    })
  );
});

// Clean up old caches on activation
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});