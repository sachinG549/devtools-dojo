// TaskBoard: a small app to practise Chrome DevTools on.
// Features that the guide's exercises rely on:
//   - GET  api/tasks          (Network → Fetch/XHR, Search for "TB-")
//   - PUT  api/tasks/:key     (method:POST/PUT filter, Payload tab)
//   - GET  api/heartbeat      (polling every 5 s; filter with -heartbeat)
//   - GET  api/widgets        (returns 400 on purpose; Console shows the error)
//   - localStorage "tb:filters" (Application → Local storage)
//   - cookie "tb_session"     (Application → Cookies)
//   - performance marks app:render-start / app:render-end (Performance → Timings)
//   - avatars from www.gravatar.com (Network → Block request domain)

const NEXT = { todo: 'doing', doing: 'done', done: 'todo' };
const $ = (s, el = document) => el.querySelector(s);

async function registerFakeBackend() {
  if (!('serviceWorker' in navigator)) throw new Error('Service workers are not supported in this browser');
  await navigator.serviceWorker.register('sw.js');
  await navigator.serviceWorker.ready;
  // First visit: the page isn't controlled yet, so reload once.
  if (!navigator.serviceWorker.controller) {
    location.reload();
    return new Promise(() => {});
  }
}

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text.trim().toLowerCase()));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function renderCard(task) {
  const card = document.createElement('article');
  card.className = 'tb-card';
  card.dataset.key = task.key;
  card.tabIndex = 0;
  const avatar = `https://www.gravatar.com/avatar/${await sha256(task.email)}?d=identicon&s=48`;
  card.innerHTML = `
    <img class="tb-avatar" src="${avatar}" alt="" width="24" height="24">
    <div class="tb-card-body">
      <span class="tb-key">${task.key}</span>
      <p class="tb-title">${task.title}</p>
      <span class="tb-meta">${task.assignee} · ${task.points} pts</span>
    </div>`;
  card.addEventListener('click', () => moveCard(task));
  card.addEventListener('keydown', (e) => e.key === 'Enter' && moveCard(task));
  return card;
}

async function render(tasks) {
  for (const col of document.querySelectorAll('.tb-col')) $('.tb-list', col).replaceChildren();
  for (const task of tasks) {
    $(`.tb-col[data-status="${task.status}"] .tb-list`).appendChild(await renderCard(task));
  }
  applyFilter();
}

let tasks = [];

async function loadTasks() {
  const res = await fetch('api/tasks');
  const data = await res.json();
  tasks = data.tasks;
  await render(tasks);
}

async function moveCard(task) {
  const status = NEXT[task.status];
  const res = await fetch(`api/tasks/${task.key}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) return console.error('Move failed', res.status);
  Object.assign(task, await res.json());
  console.info(`Moved ${task.key} → ${status}`);
  await render(tasks);
}

function applyFilter() {
  const q = $('#search').value.trim().toLowerCase();
  localStorage.setItem('tb:filters', JSON.stringify({ q, savedAt: new Date().toISOString() }));
  for (const card of document.querySelectorAll('.tb-card')) {
    card.hidden = q !== '' && !card.textContent.toLowerCase().includes(q);
  }
}

function startHeartbeat() {
  const beat = async () => {
    try {
      const res = await fetch('api/heartbeat');
      const data = await res.json();
      $('#sync').textContent = `synced ${new Date(data.serverTime).toLocaleTimeString()}`;
    } catch {
      $('#sync').textContent = 'offline';
    }
  };
  beat();
  setInterval(beat, 5000);
}

async function loadWidgets() {
  // Deliberate bug: the required "board" query parameter is missing, so this returns 400.
  const res = await fetch('api/widgets');
  if (!res.ok) console.warn('Widgets unavailable:', res.status);
}

async function main() {
  await registerFakeBackend();
  document.cookie = 'tb_session=demo-' + Math.random().toString(36).slice(2) + '; path=/; max-age=86400; SameSite=Lax';
  const saved = JSON.parse(localStorage.getItem('tb:filters') || '{}');
  $('#search').value = saved.q || '';
  $('#search').addEventListener('input', applyFilter);
  await loadTasks();
  performance.mark('app:render-end');
  performance.measure('app:render', 'app:render-start', 'app:render-end');
  startHeartbeat();
  loadWidgets();
}

main().catch((err) => {
  console.error(err);
  $('#board').innerHTML = `<p class="tb-error">TaskBoard needs to be served over http(s), not opened as a file. ${err.message}</p>`;
});
