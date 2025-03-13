const CACHE_NAME = 'jleibl-portfolio-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

const STYLE_ASSETS = [
  '/styles/global.css',
  '/styles/theme.css'
];

const IMAGE_ASSETS = [
  '/images/profile-image.jpg'
];

const ALL_ASSETS = [
  ...PRECACHE_ASSETS,
  ...STYLE_ASSETS,
  ...IMAGE_ASSETS
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  return self.clients.claim();
});

function shouldCache(url) {
  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith('.html') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.jpeg') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.webp') ||
        url.pathname.endsWith('.woff') ||
        url.pathname.endsWith('.woff2') ||
        url.pathname.endsWith('.json')) {
      return true;
    }
    
    if (url.pathname === '/') {
      return true;
    }
  }
  
  return false;
}

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || shouldCache(new URL(event.request.url))) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          
          const fetchRequest = event.request.clone();
          
          return fetch(fetchRequest)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              
              if (shouldCache(new URL(event.request.url))) {
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
              
              return response;
            })
            .catch(error => {
              console.log('Fetch failed:', error);
              
              if (event.request.mode === 'navigate') {
                return caches.match('/');
              }
              
              return null;
            });
        })
    );
  }
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 