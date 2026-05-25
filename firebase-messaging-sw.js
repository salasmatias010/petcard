importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyC_sERFBVgb9PMsGMtGiltcgycxoGqVZLg",
  authDomain: "mipetcard.firebaseapp.com",
  projectId: "mipetcard",
  storageBucket: "mipetcard.firebasestorage.app",
  messagingSenderId: "720369332644",
  appId: "1:720369832644:web:f71bd826ab4d3412211131"
});
const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('https://mipetcard.com.ar'));
});
