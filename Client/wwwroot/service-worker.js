// wwwroot/service-worker.js
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('offline-cache').then(cache => {
            return cache.addAll([
                './offline.html',
                './',
                // Add other assets you want to cache for offline use
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then(response => {
                return response || caches.match('./offline.html');
            });
        })
    );
});
