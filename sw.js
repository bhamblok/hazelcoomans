
const cacheName = 'jh9gkouh8z32x9tayrkl1';

// Installing Service Worker
self.addEventListener('install', (e) => {
  const contentToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css',
    '/manifest.json',
    '/fonts/hazel.woff',
    '/fonts/hazel.woff2',
    '/audio/mindfulness-oefening.m4a',
    '/audio/nieuwe-opname.m4a',
    // '/favicon.ico',
    // '/icons/icon-32.png',
    // '/icons/icon-64.png',
    // '/icons/icon-76.png',
    // '/icons/icon-96.png',
    // '/icons/icon-120.png',
    // '/icons/icon-128.png',
    // '/icons/icon-152.png',
    // '/icons/icon-168.png',
    // '/icons/icon-192.png',
    // '/icons/icon-256.png',
    // '/icons/icon-512.png',
  ];
  e.waitUntil(caches.open(cacheName)
    .then(cache => cache.addAll(contentToCache)));
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => {
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    return r || fetch(e.request).then(response => caches.open(cacheName).then((cache) => {
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    }));
  }));
});
