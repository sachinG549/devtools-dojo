# 15. Hands-on practice plan (2 weeks)

Do 20–30 minutes a day on TaskBoard, the labs, and pages you already use.

| Day | Focus | Exercise |
|---|---|---|
| 1 | Setup | Learn Command menu, dock positions, drawer. Turn on the settings from [Basics](00-basics.md) |
| 2 | Elements | Hide, edit, force `:hover`, edit CSS, copy selectors. Make TaskBoard's header pink |
| 3 | Elements | Box model, Computed, Layout overlays, Event Listeners, DOM breakpoint |
| 4 | Console | Utilities (`$$`, `copy`, `monitorEvents`, live expression). Extract all ticket keys from a board with one line |
| 5 | Network | Filters (`-heartbeat`, `status-code:`, `method:`), Payload/Response, Search pane |
| 6 | Network | Copy as cURL, block requests, throttling, Timing tab, export HAR |
| 7 | Review | Use playbook A on a real bug or a public site |
| 8 | Sources | Line, conditional breakpoints, logpoints, stepping, Scope, Call Stack |
| 9 | Sources | Event listener & XHR breakpoints, Snippets, Overrides (mock an API response) |
| 10 | Application | Cookies (flags), storage, clear site data, service worker options |
| 11 | Performance | Live metrics with CPU throttle; record an interaction; Bottom-Up |
| 12 | Memory | Heap snapshot comparison on a simple page you write with a deliberate leak (see below) |
| 13 | Lighthouse + Recorder | Audit a page in incognito; record a flow and export to Puppeteer |
| 14 | More tools | Rendering (paint flashing, dark mode, vision deficiencies), Coverage, Sensors, CSS Overview |

### Leak demo page for day 12

Save as `leak.html`, open it in Chrome:

```html
<button id="add">Add 1000 nodes (leaky)</button>
<script>
  const leaked = [];
  document.getElementById('add').onclick = () => {
    const box = document.createElement('div');
    for (let i = 0; i < 1000; i++) box.appendChild(document.createElement('span'));
    document.body.appendChild(box);
    document.body.removeChild(box); // removed from the page...
    leaked.push(box);               // ...but still referenced: a detached DOM leak
  };
</script>
```

Click a few times, take snapshots, filter by "Detached", follow the Retainers to `leaked`.

### Performance demo for day 11

```html
<button id="slow">Slow click</button>
<script>
  document.getElementById('slow').onclick = () => {
    const start = performance.now();
    while (performance.now() - start < 400) {} // blocks main thread 400 ms
    document.body.style.background = '#' + Math.floor(Math.random()*0xffffff).toString(16);
  };
</script>
```

Click it with the Performance panel open: INP goes red. Record a trace and find the long task.
