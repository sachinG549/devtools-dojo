# 5. Performance

### What it is

Two modes:
1. **Live metrics** (the landing view): Core Web Vitals measured live while you use the page.
2. **Recording a trace**: a millisecond-by-millisecond recording of everything the browser did: JS, style calculation, layout, paint, network, frames.

### Why it exists / problems it solves

- "The page feels slow / janky / freezes when I click." Network only shows downloads. Performance shows **CPU work on the main thread**, which is usually the real cause of slowness in heavy single-page apps.
- Find **long tasks** (>50 ms of JS blocking the page), layout thrashing, unnecessary re-renders, slow scroll.

### Live metrics

| Metric | Measures | Good | Needs work | Poor |
|---|---|---|---|---|
| **LCP** Largest Contentful Paint | When the biggest visible element (image/text block) rendered: "did it load?" | ≤ 2.5 s | ≤ 4 s | > 4 s |
| **CLS** Cumulative Layout Shift | How much content jumped around unexpectedly: "is it stable?" | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| **INP** Interaction to Next Paint | Delay between a click/tap/key and the screen updating: "is it responsive?" | ≤ 200 ms | ≤ 500 ms | > 500 ms |

A typical result on a developer laptop: LCP 1.48 s, CLS 0.00, INP 48 ms → all good, **but only on a fast machine**. Users on slower laptops will see worse numbers, which is why the **Environment settings** panel exists:

- **CPU throttling**: 4× or 6× slowdown simulates a mid/low-end device. Always test perf with this on.
- **Network throttling**.
- **Disable network cache**.
- **Field metrics → Set up**: compares your local numbers with real Chrome users' data from the Chrome UX Report (only for sites with enough public traffic).

The **Interactions** and **Layout shifts** lists below show each click and each shift. Click the `<node>` to see which element caused it. "Worst cluster: 2 shifts" links to the shifts that make up the CLS score.

### Toolbar

| Control | Does |
|---|---|
| ⏺ Record (`Cmd + E`) | Start/stop tracing while you interact |
| ↻ Record and reload (`Cmd + Shift + E`) | Reload and trace the page load |
| ⊘ Clear | |
| ⬆ / ⬇ | Load / save a trace file (`.json`). Share with teammates |
| 🏠 | Back to live metrics |
| Dropdown | History of recent recordings |
| **Screenshots** | Filmstrip of the page during the recording |
| **Memory** | Adds a memory graph (JS heap, DOM nodes, listeners) |
| 🧹 | Force garbage collection |
| **Dim 3rd parties** | Grey out code from other origins (extensions, analytics) so you focus on first-party code |
| ⚙ | Capture settings: disable JS samples (lower overhead), enable advanced paint instrumentation, enable CSS selector stats (slow), CPU/network throttling |

### Reading a recorded trace

1. **Overview** at the top: CPU usage chart (colours: yellow = scripting, purple = rendering/layout, green = painting, grey = other). **Red bars** above = long tasks / jank. Drag to zoom into a region. `W`/`S` zoom, `A`/`D` pan.
2. **Tracks**:
   - **Network**: requests over time.
   - **Frames**: each frame drawn. Red/yellow frames are dropped or partial frames (jank).
   - **Interactions**: your clicks/keys with duration. Long ones are the INP culprits.
   - **Timings / Layout shifts**: LCP, FCP, DCL markers, plus your own `performance.mark()` marks (e.g. `app:render-start`; TaskBoard adds its own marks you can find here).
   - **Main**: the **flame chart** of the main thread. Each bar is a function call. Width = time. Bars below are what it called. Tasks with a **red triangle** are long tasks (>50 ms).
   - Also: Thread pool, GPU, Raster, Compositor.
3. **Bottom pane** (select a region or event):
   - **Summary**: time breakdown (Scripting / Rendering / Painting / Loading / Idle) and details of the selected event, including the source link.
   - **Bottom-Up**: which functions took the most time **themselves** (Self time). Start here to find the hottest function.
   - **Call Tree**: top-down: which root activity caused the most work.
   - **Event Log**: chronological list.
4. **Insights sidebar** (left): automatic findings such as "LCP breakdown", "Render-blocking requests", "Layout shift culprits", "Forced reflow", "Third parties", "DOM size", each linked to the right spot in the trace.
5. **Annotations**: label entries, draw ranges, link two events. Save the trace and send it with your notes.

Common things you'll find:

- **Forced reflow / layout thrashing**: purple "Layout" blocks inside JS, triggered by reading `offsetHeight` right after changing styles in a loop.
- **Recalculate Style** huge: too many elements or expensive selectors.
- **Long "Function call" / "Evaluate Script"**: heavy JS. Look at Bottom-Up.
- **GC (garbage collection)** events frequently: lots of temporary objects.

### Practice

1. Set CPU 4× slowdown, record while opening a TaskBoard task, find the longest task, read Bottom-Up.
2. Record and reload a page; find LCP marker; read the "LCP breakdown" insight.
3. In Console run `performance.mark('a'); for(let i=0;i<1e8;i++); performance.mark('b')` while recording. Find the marks and the long task.
