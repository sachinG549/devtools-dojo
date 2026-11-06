// TaskBoard fake backend.
// GitHub Pages only serves static files, so this service worker answers the
// app's api/* requests. They still appear in the Network panel like real calls
// (the Size column shows "(ServiceWorker)").

const TASKS = [
  { key: 'TB-1', title: 'Set up CI pipeline', status: 'todo', assignee: 'Asha', email: 'asha@example.com', points: 3 },
  { key: 'TB-2', title: 'Design login page', status: 'todo', assignee: 'Ravi', email: 'ravi@example.com', points: 5 },
  { key: 'TB-3', title: 'Fix date picker on Safari', status: 'doing', assignee: 'Mei', email: 'mei@example.com', points: 2 },
  { key: 'TB-4', title: 'Write API docs for /tasks', status: 'doing', assignee: 'Asha', email: 'asha@example.com', points: 3 },
  { key: 'TB-5', title: 'Add dark mode', status: 'done', assignee: 'Leo', email: 'leo@example.com', points: 8 },
  { key: 'TB-6', title: 'Upgrade build tooling', status: 'done', assignee: 'Ravi', email: 'ravi@example.com', points: 1 },
];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers },
  });

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const i = url.pathname.indexOf('/api/');
  if (i === -1 || url.origin !== self.location.origin) return;
  const route = url.pathname.slice(i + 5);
  event.respondWith(handle(route, url, event.request));
});

async function handle(route, url, req) {
  if (route === 'tasks' && req.method === 'GET') {
    await delay(250);
    return json({ total: TASKS.length, tasks: TASKS }, 200, { 'x-request-id': crypto.randomUUID() });
  }
  if (route.startsWith('tasks/') && req.method === 'PUT') {
    const key = route.split('/')[1];
    const body = await req.json().catch(() => ({}));
    const task = TASKS.find((t) => t.key === key);
    if (!task) return json({ error: 'not_found', key }, 404);
    Object.assign(task, { status: body.status ?? task.status });
    await delay(150);
    return json(task);
  }
  if (route === 'heartbeat') {
    return json({ ok: true, serverTime: new Date().toISOString(), unread: Math.floor(Math.random() * 3) });
  }
  if (route.startsWith('widgets')) {
    // Deliberate bug for practice: the app forgets the required "board" parameter.
    if (!url.searchParams.get('board')) {
      return json({ error: 'bad_request', message: 'Query parameter "board" is required' }, 400);
    }
    return json({ widgets: ['burndown', 'velocity'] });
  }
  return json({ error: 'not_found', route }, 404);
}
