// Deliberate bug: cache-first forever. Once cached, version.json is never fetched again.
const CACHE = 'lab07-v1';
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['version.json'])));
});
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (!new URL(e.request.url).pathname.endsWith('version.json')) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => {
      if (!hit) return fetch(e.request);
      const headers = new Headers(hit.headers);
      headers.set('x-sw', 'cache'); // lets the page (and you, in Network → Headers) see it came from the SW cache
      return hit.blob().then((body) => new Response(body, { status: hit.status, headers }));
    })
  );
});
