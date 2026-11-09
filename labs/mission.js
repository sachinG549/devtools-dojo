// DevTools Dojo mission engine.
// One list of missions, answer checking, gated hints, solved banner, progress.
// Progress lives in localStorage on this site only. No accounts, no tracking.

export const MISSIONS = [
  { id: '00', slug: '00-warm-up', title: 'Warm-up: the hidden code', tab: 'Elements + Console', mins: 2 },
  { id: '01', slug: '01-hidden-button', title: "The button that won't click", tab: 'Elements', mins: 5 },
  { id: '02', slug: '02-silent-error', title: 'Nothing happens, no error', tab: 'Sources', mins: 8 },
  { id: '03', slug: '03-wrong-data', title: 'Frontend or backend?', tab: 'Network', mins: 6 },
  { id: '04', slug: '04-slow-click', title: 'The sluggish filter', tab: 'Performance', mins: 10 },
  { id: '05', slug: '05-leak', title: 'The dialog that never leaves', tab: 'Memory', mins: 12 },
  { id: '06', slug: '06-cookie-logout', title: 'Logged out after one minute', tab: 'Application', mins: 8 },
  { id: '07', slug: '07-cache-trap', title: '"I deployed, but…"', tab: 'Application', mins: 8 },
];

// Accent colour and icon per DevTools tab (used by the mission pages and the map)
export const TABS = {
  'Elements + Console': { color: '#60a5fa', icon: '🔍' },
  Elements: { color: '#60a5fa', icon: '🧱' },
  Console: { color: '#a78bfa', icon: '⌨️' },
  Sources: { color: '#fb923c', icon: '🐛' },
  Network: { color: '#34d399', icon: '🌐' },
  Performance: { color: '#f87171', icon: '⚡' },
  Memory: { color: '#e879f9', icon: '🧠' },
  Application: { color: '#22d3ee', icon: '🗄️' },
};
export const tabOf = (m) => TABS[m.tab] || { color: '#818cf8', icon: '🛠️' };
const CHAPTER = { 'Elements + Console': '01-elements', Elements: '01-elements', Console: '02-console', Sources: '03-sources',
  Network: '04-network', Performance: '05-performance', Memory: '06-memory', Application: '07-application' };

export const BELTS = [
  { min: 0, name: 'White belt', color: '#e5e7eb', ink: '#374151' },
  { min: 1, name: 'Yellow belt', color: '#facc15', ink: '#422006' },
  { min: 3, name: 'Orange belt', color: '#fb923c', ink: '#431407' },
  { min: 5, name: 'Green belt', color: '#22c55e', ink: '#052e16' },
  { min: 7, name: 'Brown belt', color: '#92400e', ink: '#fff7ed' },
  { min: 8, name: 'Black belt', color: '#111827', ink: '#f9fafb' },
];

const KEY = 'dojo:progress';

export function getProgress() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(KEY, JSON.stringify(p)); }
export function solvedCount(p = getProgress()) { return MISSIONS.filter((m) => p[m.id]?.solved).length; }
export function beltFor(n) { return [...BELTS].reverse().find((b) => n >= b.min); }

// Answers are compared as SHA-256 hashes of a normalised string, so reading
// the page source doesn't hand you the answer.
export function normalise(s) {
  return String(s).toLowerCase().replace(/[\s'"`$();]/g, '');
}
export async function hash(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalise(s)));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const el = (tag, attrs = {}, html = '') => Object.assign(document.createElement(tag), attrs, html ? { innerHTML: html } : {});

/**
 * startMission({ id, learned, questions: [{ prompt, hashes, placeholder }] })
 * Returns { solve() } so a page can also mark itself solved when it detects the fix.
 */
export function startMission(cfg) {
  const idx = MISSIONS.findIndex((m) => m.id === cfg.id);
  const mission = MISSIONS[idx];
  const next = MISSIONS[idx + 1];
  const progress = getProgress();
  const state = progress[cfg.id] || { solved: false, hints: 0 };

  document.title = `Mission ${idx + 1} · ${mission.title} · DevTools Dojo`;
  const tab = tabOf(mission);
  document.body.classList.add('dojo-mission');
  document.documentElement.style.setProperty('--tab', tab.color);
  document.querySelector('.tag')?.setAttribute('data-icon', tab.icon);
  const stageEl = document.querySelector('.stage');
  stageEl?.setAttribute('data-url', `shop.example.com/${mission.slug.slice(3)}`);
  // Right column on wide screens: the broken page plus a small toolkit card
  if (stageEl) {
    const side = el('aside', { className: 'dojo-side' });
    stageEl.before(side);
    side.appendChild(stageEl);
    const mac = /Mac|iPhone|iPad/.test(navigator.platform);
    side.appendChild(el('div', { className: 'card dojo-kit' }, `
      <h3>${tab.icon} Your toolkit</h3>
      <p>Open DevTools: ${mac ? '<kbd>⌘</kbd><kbd>⌥</kbd><kbd>I</kbd>' : '<kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>I</kbd>'} · Command Menu: ${mac ? '<kbd>⌘</kbd><kbd>⇧</kbd><kbd>P</kbd>' : '<kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>P</kbd>'}</p>
      <p>Tab for this mission: <b style="color:var(--tab)">${mission.tab}</b></p>
      <p>📖 <a href="../../${CHAPTER[mission.tab] || ''}/" target="_blank" rel="noopener">Read the ${mission.tab.split(' ')[0]} chapter</a> (opens in a new tab)</p>`));
  }

  // Progress strip under the breadcrumb
  const strip = el('div', { className: 'dojo-strip' });
  strip.innerHTML = `Mission <b>${idx + 1}</b> of ${MISSIONS.length} · ⏱ ~${mission.mins} min · <span class="dojo-dots">${MISSIONS.map((m) =>
    `<a href="../${m.slug}/" title="${m.title}" class="${progress[m.id]?.solved ? 'done' : ''} ${m.id === cfg.id ? 'here' : ''}"></a>`).join('')}</span>`;
  document.querySelector('.crumbs')?.after(strip);

  // Answer box
  const box = el('form', { className: 'dojo-check', autocomplete: 'off' });
  box.innerHTML = `<b>Your answer</b>` + (cfg.questions || []).map((q, i) => `
      <label>${q.prompt}<input name="q${i}" placeholder="${q.placeholder || ''}" spellcheck="false"></label>`).join('') +
    `<div class="dojo-row"><button class="primary" type="submit">Check answer</button><span class="dojo-msg" role="status"></span></div>`;
  if (!cfg.questions?.length) box.innerHTML = `<b>Your answer</b><p>This mission checks itself. Fix the bug with DevTools and it will turn green.</p><span class="dojo-msg" role="status"></span>`;
  const mount = document.querySelector('.mission');
  mount.after(box);

  const banner = el('div', { className: 'dojo-solved', hidden: true });
  box.after(banner);

  function showSolved(firstTime) {
    const stars = state.hints === 0 ? '⭐ Solved without hints!' : `Solved with ${state.hints} hint${state.hints > 1 ? 's' : ''}.`;
    banner.innerHTML = `<h2>✅ Mission solved</h2><p>${stars}</p>
      <p><b>What you just learned:</b> ${cfg.learned}</p>
      <div class="dojo-row">${next ? `<a class="primary btn" href="../${next.slug}/">Next mission: ${next.title} →</a>` : `<a class="primary btn" href="../">🥋 See your belt and share it →</a>`}
      <a class="btn ghost" href="../">Mission map</a></div>`;
    banner.hidden = false;
    box.classList.add('ok');
    box.querySelector('.dojo-msg').textContent = 'Correct!';
    if (firstTime) { banner.scrollIntoView({ behavior: 'smooth', block: 'center' }); confetti(); }
    strip.querySelector('.here')?.classList.add('done');
  }

  function solve() {
    if (state.solved) return;
    state.solved = true;
    state.at = new Date().toISOString();
    progress[cfg.id] = state;
    saveProgress(progress);
    showSolved(true);
  }

  box.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = box.querySelector('.dojo-msg');
    const results = await Promise.all(cfg.questions.map(async (q, i) =>
      q.hashes.includes(await hash(box.elements[`q${i}`].value))));
    results.forEach((ok, i) => box.elements[`q${i}`].classList.toggle('bad', !ok));
    if (results.every(Boolean)) solve();
    else msg.textContent = results.length > 1
      ? `${results.filter(Boolean).length} of ${results.length} correct. Keep digging.`
      : 'Not quite. Keep digging, or open a hint.';
  });

  // Gate hints: hint N+1 unlocks after hint N is opened; solution unlocks after all hints.
  const details = [...document.querySelectorAll('details')];
  const hints = details.filter((d) => /hint/i.test(d.querySelector('summary').textContent));
  const solution = details.find((d) => /solution/i.test(d.querySelector('summary').textContent));
  const opened = new Set();
  const lock = (d, text) => { d.classList.add('locked'); d.querySelector('summary').dataset.lock = text; };
  const unlock = (d) => { d.classList.remove('locked'); delete d.querySelector('summary').dataset.lock; };
  hints.forEach((h, i) => {
    if (i > 0 && !state.solved && state.hints < i) lock(h, `Open hint ${i} first`);
    h.addEventListener('toggle', () => {
      if (!h.open || opened.has(i)) return;
      opened.add(i);
      if (!state.solved) { state.hints = Math.max(state.hints, i + 1); progress[cfg.id] = state; saveProgress(progress); }
      if (hints[i + 1]) unlock(hints[i + 1]); else if (solution) unlock(solution);
    });
  });
  hints.forEach((h, i) => h.querySelector('summary').addEventListener('click', (e) => { if (h.classList.contains('locked')) { e.preventDefault(); void i; } }));
  if (solution) {
    if (!state.solved && state.hints < hints.length) lock(solution, 'Try the hints first');
    solution.querySelector('summary').textContent = 'Solution (I give up)';
    solution.querySelector('summary').addEventListener('click', (e) => {
      if (solution.classList.contains('locked')) return e.preventDefault();
      if (!solution.open && !state.solved && !confirm('Show the solution? You learn far more by finding it yourself.')) e.preventDefault();
    });
  }

  if (state.solved) showSolved(false);
  return { solve, get solved() { return state.solved; } };
}

// Small dependency-free confetti burst. Skipped when the user prefers reduced motion.
export function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = Object.assign(document.createElement('canvas'), { width: innerWidth, height: innerHeight });
  Object.assign(c.style, { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 });
  document.body.appendChild(c);
  const g = c.getContext('2d');
  const colors = ['#818cf8', '#22d3ee', '#34d399', '#facc15', '#f472b6', '#fb923c'];
  const bits = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight / 2.4, vx: (Math.random() - .5) * 16, vy: Math.random() * -14 - 4,
    s: Math.random() * 7 + 4, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: colors[Math.floor(Math.random() * colors.length)],
  }));
  let t = 0;
  (function frame() {
    g.clearRect(0, 0, c.width, c.height);
    for (const b of bits) {
      b.vy += .45; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      g.save(); g.translate(b.x, b.y); g.rotate(b.r); g.fillStyle = b.c; g.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); g.restore();
    }
    if (++t < 140) requestAnimationFrame(frame); else c.remove();
  })();
}
