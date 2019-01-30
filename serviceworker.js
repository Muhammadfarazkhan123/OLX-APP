
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyBMEDSC3HQVLtLX84QgAyh_49_ePQpLQZc",
    authDomain: "quiz-app-8cdfa.firebaseapp.com",
    databaseURL: "https://quiz-app-8cdfa.firebaseio.com",
    projectId: "quiz-app-8cdfa",
    storageBucket: "quiz-app-8cdfa.appspot.com",
    messagingSenderId: "11116360427"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();









const cacheName = 'rushft';
const staticAssets = [
    './',
    "./index.html",
    "./css/style.css",
    "./pages/chats.html",
    "./pages/form.html",
    "./pages/login.html",
    "./pages/signup.html",
    "./script/add.js",
    "./script/app.js",
    "./script/chat.js",
    "./pics/chat.png",
    "./pics/download.png",
    "./pics/flickering-bokeh-bubbles-particles-random-motion-abstract-background-on-colorfule-gradient-color_hpxt-ill4__F0000.png",
    "./pics/Shopping-Cart-PNG-Image-84606.png"
    

    
    
    
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(staticAssets);
            })
    );
})
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const res = await fetch(req);
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }
}