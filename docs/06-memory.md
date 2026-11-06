# 6. Memory

### What it is

Tools to see **what JavaScript objects are in memory, how big they are, and what keeps them alive**.

### Why it exists / problems it solves

- **Memory leaks**: the tab gets slower and slower over hours, or crashes with "Aw, Snap! Out of memory". Common in single-page apps that never reload.
- Typical leak causes: event listeners not removed, timers (`setInterval`) not cleared, caches/arrays that only grow, closures holding big data, **detached DOM nodes** (removed from the page but still referenced from JS).

The panel shows the total JS heap for each VM instance (e.g. **207 MB** for `Main` on a big app). That number alone doesn't mean a leak; a leak is a number that **keeps growing** after repeating the same action and forcing GC.

### Profiling types

| Type | What you get | Use when |
|---|---|---|
| **Heap snapshot** | A full picture of every object at that moment | Main leak-hunting tool. Compare two snapshots |
| **Allocations on timeline** | Blue bars over time for new allocations. Bars that stay blue are still alive; grey ones were collected | Find *which action* allocates memory that never gets freed. Tick *Allocation stack traces* to see the code that allocated (more overhead) |
| **Allocation sampling** | Low-overhead sampling, broken down by JS function | Long sessions, production-like conditions; "which function allocates the most?" |
| **Detached elements** | DOM nodes no longer in the document but retained by JS | Quick check for the most common SPA leak |

**Select JavaScript VM instance**: main page, iframes and workers each have their own heap.

Toolbar: ⏺ take/record, ⊘ clear profiles, ⬆⬇ load/save (`.heapsnapshot` files), 🧹 **collect garbage** (always click before a snapshot so only truly retained objects remain).

### Reading a heap snapshot

Views (dropdown at top):

- **Summary**: objects grouped by **constructor** (`Array`, `Object`, `HTMLDivElement`, your class names). Filter by class name. The filter dropdown has *Objects allocated between snapshots*, *Duplicated strings*, and *Detached DOM nodes/elements*.
- **Comparison**: diff between two snapshots: `# New`, `# Deleted`, `# Delta`, `Size Delta`. **This is how you find leaks.**
- **Containment**: browse from roots (window, GC roots) downward.
- **Statistics**: pie chart by type (code, strings, arrays, typed arrays, system objects).

Columns:

- **Distance**: steps from the GC root.
- **Shallow size**: memory the object itself uses.
- **Retained size**: memory that would be freed if this object were deleted, including everything only it keeps alive. **Sort by retained size** to find what matters.

Bottom pane **Retainers**: the chain of references keeping the selected object alive (e.g. `Window → myCache → Map → HTMLDivElement`). Following this chain shows you which variable to clean up. Yellow = referenced from JS directly; red = detached node referenced indirectly.

### The 3-snapshot leak technique (teach this)

1. Load the page, do the action once (warm-up), click 🧹, take **Snapshot 1**.
2. Repeat the action (e.g. open and close an issue dialog) 5–10 times, 🧹, take **Snapshot 2**.
3. Repeat again 5–10 times, 🧹, take **Snapshot 3**.
4. Select Snapshot 3, set view to "Objects allocated between Snapshot 1 and Snapshot 2". Things allocated in that window and *still alive* in 3 are almost certainly leaks. Check their Retainers.

Quick alternative: Performance panel with **Memory** ticked. A sawtooth that returns to the same baseline is healthy; a staircase that keeps rising is a leak.

Also see: **More tools → Performance monitor** for live JS heap, DOM node count, and listener count graphs.
