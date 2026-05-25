const CACHE = 'petcard-v36';
const FILES = [
  './dije.html',
  './manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if(e.request.method !== 'GET') return;
  
  // index.html siempre desde la red
  if(e.request.url.includes('index.html') || e.request.url.endsWith('mipetcard.com.ar/') || e.request.url.endsWith('mipetcard.com.ar')){
    e.respondWith(
      fetch(e.request).then(function(response){
        var clone = response.clone();
        caches.open(CACHE).then(function(cache){ cache.put(e.request, clone); });
        return response;
      }).catch(function(){
        return caches.match(e.request);
      })
    );
    return;
  }

  // Todo lo demás: cache first
  e.respondWith(
    caches.match(e.request).then(function(cached){
      if(cached) return cached;
      return fetch(e.request).then(function(response){
        var clone = response.clone();
        caches.open(CACHE).then(function(cache){ cache.put(e.request, clone); });
        return response;
      });
    })
  );
});

// Mostrar notificación push
self.addEventListener('push', function(e) {
  var data = e.data ? e.data.json() : {};
  var title = (data.notification && data.notification.title) || 'PetCard';
  var body = (data.notification && data.notification.body) || '';
  var link = (data.fcmOptions && data.fcmOptions.link) || 'https://mipetcard.com.ar';
  e.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { link: link }
    })
  );
});

// Abrir la app al tocar la notificación
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var link = (e.notification.data && e.notification.data.link) || 'https://mipetcard.com.ar';
  e.waitUntil(clients.openWindow(link));
});
