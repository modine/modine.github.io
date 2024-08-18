const staticCalc = 'v0.62'; // Update version number
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js"
];

self.addEventListener('install', event => {
    self.skipWaiting(); // Force the waiting service worker to become the active service worker
    event.waitUntil(
        caches.open(staticCalc).then(cache => {
            console.log(`Opened cache: ${staticCalc}`);
            return cache.addAll(assets);
        })
    );
});

// Listen for messages from clients
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'GET_VERSION') {
        event.source.postMessage({
            type: 'VERSION',
            version: staticCalc
        });
    }
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== staticCalc) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Claiming clients for version', staticCalc);
            return self.clients.claim(); // Immediately control all clients
        }).then(() => {
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => client.navigate(client.url)); // Reload each client
            });
        })
    );
});