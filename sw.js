
const cacheName = 'jh9gkouh8z32x9tayrkl';

// Installing Service Worker
self.addEventListener('install', (e) => {
  const contentToCache = [
    '/hazelcoomans/',
    '/hazelcoomans/index.html',
    '/hazelcoomans/app.js',
    '/hazelcoomans/style.css',
    '/hazelcoomans/manifest.json',
    // '/hazelcoomans/fonts/graduate.eot',
    // '/hazelcoomans/fonts/graduate.ttf',
    // '/hazelcoomans/fonts/graduate.woff',
    // '/hazelcoomans/favicon.ico',
    // '/hazelcoomans/audio/song.mp3',
    // '/hazelcoomans/icons/icon-32.png',
    // '/hazelcoomans/icons/icon-64.png',
    // '/hazelcoomans/icons/icon-76.png',
    // '/hazelcoomans/icons/icon-96.png',
    // '/hazelcoomans/icons/icon-120.png',
    // '/hazelcoomans/icons/icon-128.png',
    // '/hazelcoomans/icons/icon-152.png',
    // '/hazelcoomans/icons/icon-168.png',
    // '/hazelcoomans/icons/icon-192.png',
    // '/hazelcoomans/icons/icon-256.png',
    // '/hazelcoomans/icons/icon-512.png',
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
