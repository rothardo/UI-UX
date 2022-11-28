"use strict";
const cacheName = "buildmypc.net-bmpc-pwa-1.0.0";
const startPage = "https://buildmypc.net";
const offlinePage = "https://buildmypc.net/offline.php";
const filesToCache = [startPage, offlinePage];
const neverCacheUrls = [/\/rigs/, /contact.php/];
self.addEventListener("install", function (e) {
  console.log("BMPC-PWA service worker installation");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("BMPC-PWA service worker caching dependencies");
      filesToCache.map(function (url) {
        return cache.add(url).catch(function (reason) {
          return console.log("BMPC-PWA: " + String(reason) + " " + url);
        });
      });
    })
  );
});
self.addEventListener("activate", function (e) {
  console.log("BMPC-PWA service worker activation");
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheName) {
            console.log("BMPC-PWA old cache removed", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  if (!neverCacheUrls.every(checkNeverCacheList, e.request.url)) {
    console.log("BMPC-PWA: Current request is excluded from cache.");
    return;
  }
  if (!e.request.url.match(/^(http|https):\/\//i)) return;
  if (new URL(e.request.url).origin !== location.origin) return;
  if (e.request.method !== "GET") {
    e.respondWith(
      fetch(e.request).catch(function () {
        return caches.match(offlinePage);
      })
    );
    return;
  }
  if (e.request.mode === "navigate" && navigator.onLine) {
    e.respondWith(
      fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      })
    );
    return;
  }
  e.respondWith(
    caches
      .match(e.request)
      .then(function (response) {
        return (
          response ||
          fetch(e.request).then(function (response) {
            return caches.open(cacheName).then(function (cache) {
              cache.put(e.request, response.clone());
              return response;
            });
          })
        );
      })
      .catch(function () {
        return caches.match(offlinePage);
      })
  );
});
function checkNeverCacheList(url) {
  if (this.match(url)) {
    return false;
  }
  return true;
}
