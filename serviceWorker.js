const staticCalc = "calc-site-v1"
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