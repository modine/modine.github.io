const staticCalc = "v3";
var version_status ="local version";
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
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

async function detectSWUpdate() {
  const registration = await navigator.serviceWorker.ready;

  registration.addEventListener("updatefound", event => {
    const newSW = registration.installing;
    newSW.addEventListener("statechange", event => {
      if (newSW.state == "installed") {
         // New service worker is installed, but waiting activation
      }
    });
  })
}

self.addEventListener("install", event => {

   self.skipWaiting();
  });

self.addEventListener("activate", event => {

  event.waitUntil(clients.claim());
});



self.addEventListener("controllerchange", event => {
   version_status = "(new updated)";
 });

sendMessageToClients({
        msg: "test!",
        version: staticCalc,
		version_status: version_status,
      });

function sendMessageToClients(msg) {
  clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      client.postMessage(msg);
    });
  });
}