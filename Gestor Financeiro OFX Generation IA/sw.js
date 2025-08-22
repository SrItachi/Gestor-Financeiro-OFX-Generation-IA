// Nome do cache
const CACHE_NAME = 'gestor-financeiro-v1';

// Arquivos que serão armazenados em cache
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Se você tiver um arquivo de estilo separado
  '/manifest.json',
  // Adicione outros arquivos importantes aqui (JS, imagens, etc.)
];

// Instalação do Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptando requisições para servir do cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Retorna a resposta do cache, se encontrada
        if (response) {
          return response;
        }
        // Se não, busca na rede
        return fetch(event.request);
      })
  );
});
