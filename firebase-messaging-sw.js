importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC_sERFBVgb9PMsGMtGiltcgycxoGqVZLg",
  authDomain: "mipetcard.firebaseapp.com",
  projectId: "mipetcard",
  storageBucket: "mipetcard.firebasestorage.app",
  messagingSenderId: "720369332644",
  appId: "1:720369332644:web:f71bd826ab4d3412211131"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: 'https://mipetcard.com.ar' }
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://mipetcard.com.ar'));
});
