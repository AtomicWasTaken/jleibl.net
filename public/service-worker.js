const CACHE_NAME = 'jleibl-portfolio-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html'
];

const AUTH_ASSETS = [
  '/manifest.json'
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
  ...AUTH_ASSETS,
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
  const urlObj = new URL(url);
  
  if (urlObj.hostname.includes('cloudflareaccess.com')) {
    return false;
  }
  
  if (urlObj.origin === self.location.origin) {
    if (urlObj.pathname.endsWith('.html') ||
        urlObj.pathname.endsWith('.css') ||
        urlObj.pathname.endsWith('.js') ||
        urlObj.pathname.endsWith('.jpg') ||
        urlObj.pathname.endsWith('.jpeg') ||
        urlObj.pathname.endsWith('.png') ||
        urlObj.pathname.endsWith('.svg') ||
        urlObj.pathname.endsWith('.webp') ||
        urlObj.pathname.endsWith('.woff') ||
        urlObj.pathname.endsWith('.woff2') ||
        urlObj.pathname.endsWith('.json')) {
      return true;
    }
    
    if (urlObj.pathname === '/') {
      return true;
    }
  }
  
  return false;
}

function isAuthProtectedAsset(url) {
  const urlPath = new URL(url).pathname;
  return AUTH_ASSETS.some(asset => asset === urlPath);
}

self.addEventListener('fetch', event => {
  if (isAuthProtectedAsset(event.request.url)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(error => {
          console.log('Fetch failed for auth protected asset:', error);
          return caches.match(event.request);
        })
    );
    return;
  }

  if (event.request.mode === 'navigate' || shouldCache(event.request.url)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          
          const fetchRequest = event.request.clone();
          
          return fetch(fetchRequest)
            .then(response => {
              if (response.url.includes('cloudflareaccess.com')) {
                console.log('Request redirected to authentication page:', response.url);
                return response;
              }
              
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