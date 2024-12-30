const CACHE_NAME = "password-manager-cache";
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/manifest.json",
    "/icons/icon-512x512.png",
    "/icons/icon-256x256.png",
    "/icons/icon-64x64.png",
    "/icons/icon-32x32.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
