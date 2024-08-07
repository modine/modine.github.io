const staticCalc = "v3.2";

const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCalc).then(cache => {
            cache.addAll(assets)
        })
    )
    self.skipWaiting();
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})



self.addEventListener('activate', event => {
  event.waitUntil(
      (async () => {
          const allClients = await self.clients.matchAll({
              includeUncontrolled: true,
              type: 'window'
          });

          for (const client of allClients) {
              client.postMessage({
                  version: staticCalc
              });
          }
      })()
  );
});