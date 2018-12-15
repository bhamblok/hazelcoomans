
const cacheName = 'jh9gkouh8z32x9tayrkl3';

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
    '/audio/wiegenlied.m4a',
    '/audio/aria-bach.m4a',
    '/audio/berceuse.m4a',
    '/audio/gymnopedie.m4a',
    '/audio/claire-de-lune.m4a',
    '/audio/moonlight.m4a',
    '/favicon.ico',
    '/icons/android-chrome-36x36.png',
    '/icons/android-chrome-72x72.png',
    '/icons/android-chrome-96x96.png',
    '/icons/android-chrome-144x144.png',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-256x256.png',
    '/icons/android-chrome-512x512.png',
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
