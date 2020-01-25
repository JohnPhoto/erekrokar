self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.js',
        '/konami.js',
        '/og.png',
        '/manifest.json',
        '/apple-touch-icon-192.png',
        '/apple-touch-icon-512.png'
      ]);
    })
  );
});