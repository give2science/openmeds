"use strict";
// Cache Name
const CACHE_NAME = "static-cache-v1";
// Cache Files
// install
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
//   evt.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("[ServiceWorker] Pre-caching offline page");
//       return cache.addAll(FILES_TO_CACHE);
//     })
//   );
});
// Active PWA Cache and clear out anything older
// listen for fetch events in page navigation and return anything that has been cached
// self.addEventListener("fetch", (evt) => {
//   console.log("[ServiceWorker] Fetch", evt.request.url);
//   // when not a navigation event return
//   if (evt.request.mode !== "navigate") {
//     return;
//   }

// });