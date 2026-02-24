const CACHE_NAME = 'chacara-triunfo-cache-v1';
+const urlsToCache = [
+  '/',
+  '/index.html',
+  '/termos.html',
+  '/script.js',
+  '/manifest.json',
+  'https://cdn.tailwindcss.com',
+  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap',
+  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
+  'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css',
+  'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css',
+  'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js',
+  'https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js',
+  // Adicione aqui os caminhos para suas imagens locais ou outros recursos estáticos importantes
+  // Exemplo: '/icons/icon-192x192.png',
+  // Note: Imagens de CDNs externas (como Unsplash) podem não ser cacheadas devido a políticas CORS.
+  // Para um PWA robusto, considere hospedar suas imagens localmente.
+];
+
+self.addEventListener('install', (event) => {
+  event.waitUntil(
+    caches.open(CACHE_NAME)
+      .then((cache) => {
+        console.log('Service Worker: Cache aberto');
+        return cache.addAll(urlsToCache);
+      })
+  );
+});
+
+self.addEventListener('fetch', (event) => {
+  event.respondWith(
+    caches.match(event.request)
+      .then((response) => {
+        if (response) {
+          return response; // Retorna o recurso do cache se encontrado
+        }
+        return fetch(event.request); // Caso contrário, busca na rede
+      })
+  );
+});
+
+self.addEventListener('activate', (event) => {
+  const cacheWhitelist = [CACHE_NAME];
+  event.waitUntil(
+    caches.keys().then((cacheNames) => {
+      return Promise.all(
+        cacheNames.map((cacheName) => {
+          if (cacheWhitelist.indexOf(cacheName) === -1) {
+            return caches.delete(cacheName); // Remove caches antigos
+          }
+        })
+      );
+    })
+  );
+});