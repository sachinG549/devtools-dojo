# 2. Console

### What it is

Two things in one:
1. A **log viewer** for messages from the page (`console.log`, errors, warnings, network failures, browser violations).
2. A **JavaScript REPL** that runs code *inside the page*, with access to the page's variables, DOM, cookies and storage.

### Why it exists / problems it solves

- See errors that explain why something is broken.
- Test a piece of JS against the real page before putting it in code.
- Inspect app state (`window.__SOMETHING__`), call APIs with your logged-in session (`fetch('/rest/api/2/myself').then(r=>r.json())`), and extract data from a page.

### Toolbar

- **Sidebar icon**: groups messages by type (errors, warnings, info, verbose) and by **source file**. Fastest way to find "which script is spamming".
- **⊘ Clear** (`Cmd + K`).
- **`top ▾`** (JavaScript context): which frame your code runs in. Apps often embed iframes (widgets, plugins, payment forms); choose the iframe here, otherwise `document.querySelector` won't find elements inside it. Extensions' contexts appear here too.
- **👁 Create live expression**: pin an expression that re-evaluates continuously (e.g. `document.activeElement` to see which element has focus while you Tab around).
- **Filter**: text, regex (`/heartbeat|widget/`), `-text` to exclude, `url:app.js`, `-url:react-dom`.
- **Default levels ▾**: Verbose, Info, Warnings, Errors. Turn on **Verbose** to see violations like "long task" warnings.
- **7 issues** → opens the **Issues** panel (cookie problems, CSP, mixed content, deprecated APIs), more structured than raw console text.
- **Gear**: shows the settings checkboxes described below.

### The settings checkboxes, one by one

| Setting | Meaning | When to change |
|---|---|---|
| **Network messages** | Show failed network requests (like your `400` line) | Keep on |
| **Keep log** (Preserve log) | Don't clear on navigation/reload | Turn on when debugging login redirects or errors that happen right before a page change |
| **Selected context only** | Only show messages from the context picked in `top ▾` | When iframes are noisy |
| **Group similar messages** | Collapse repeats into one line with a counter | Turn off if you need the exact order |
| **CORS errors in console** | Show CORS failures | Keep on |
| **Log XMLHttpRequests** | Log every XHR/fetch | Quick way to watch API calls without the Network tab |
| **Eager evaluation** | Preview the result as you type (only side-effect-free code) | Keep on |
| **Autocomplete from history** | Suggest earlier commands | Keep on |
| **Treat code evaluation as user action** | Code you run counts as a user gesture, so things like `navigator.clipboard`, `play()`, popups are allowed | Keep on |

### Reading typical messages

| Message | What it means | Your action |
|---|---|---|
| `Uncaught SyntaxError: Cannot use 'import.meta' outside a module` | A script using ES-module syntax was loaded with `<script>` instead of `<script type="module">` | Usually a third-party/app bug. Click the file link to see who |
| `[Violation] Permissions policy violation: unload is not allowed` | The page or a library registered an `unload` handler but the Permissions-Policy header forbids it (Chrome is phasing out `unload` for back/forward cache) | Not your bug unless you own that code |
| `Multiple versions of <library> found on the page` | Two copies of the same library are loaded | Bundle bloat / possible state bugs |
| `Failed to load resource: ... status of 400 ()` with URL `/api/widgets/...` | An API call returned 400 Bad Request. The pink icon on the right jumps to the request in Network | Open in Network → Payload/Response to see what was wrong |
| A long banner like `SOME-LIBRARY v5 is now available...` | A plain `console.log` from a library | Noise |
| `Unrecognized feature: 'local-network-access'` | An iframe `allow=""` attribute uses a feature this Chrome doesn't know | Noise |
| `State changed: ▶ Array(1)` | Debug log with an expandable object | Click ▶ to explore |

The **file:line link** on the right (e.g. `app.js:28`) opens the exact line in Sources. Hover an error's ▶ to see the **stack trace** (the chain of function calls that led to the error).

Right-click a message: **Save as...** (export the log), **Hide messages from <file>**, **Copy**, **Copy console** (all messages).

### Console Utilities API (only works when typed in the Console)

| Command | What it does |
|---|---|
| `$0`, `$1`…`$4` | Currently selected element in Elements, and the previous 4 |
| `$('css')` | Same as `document.querySelector` |
| `$$('css')` | `querySelectorAll` returned as a real array |
| `$x('//xpath')` | Query by XPath |
| `$_` | Result of the last expression |
| `copy(obj)` | Copy anything to clipboard as text/JSON, e.g. `copy($$('a').map(a=>a.href))` |
| `inspect(el)` | Jump to element in Elements (or function in Sources) |
| `getEventListeners(el)` | All listeners on an element |
| `monitorEvents(el, 'click')` / `unmonitorEvents(el)` | Log events as they fire. Try `monitorEvents(window, 'resize')` |
| `monitor(fn)` / `unmonitor(fn)` | Log every call to a function with arguments |
| `debug(fn)` / `undebug(fn)` | Pause in debugger whenever `fn` is called |
| `queryObjects(Promise)` | All live objects created by a constructor (memory hunting) |
| `keys(obj)`, `values(obj)` | Shortcuts |
| `table(data)` | Same as `console.table` |
| `clear()` | Clear console |

Also: **top-level `await`** works, e.g. `await (await fetch('/rest/api/2/myself')).json()`.

### `console` methods to use in your own code

```js
console.log('value', x);               // basic
console.info / console.warn / console.error / console.debug  // levels (debug = Verbose)
console.table(arrayOfObjects);         // spreadsheet view, sortable
console.dir(element);                  // show as JS object instead of HTML
console.group('Fetch user'); ...; console.groupEnd();   // collapsible sections
console.time('render'); ...; console.timeEnd('render'); // measure duration
console.count('clicked');              // how many times hit
console.assert(user.id, 'no user id'); // logs only when false
console.trace();                       // print current stack
console.log('%cBig red', 'color:red;font-size:20px');   // CSS styling
```

Multi-line input: `Shift + Enter`. Previous commands: `↑`.

### Practice

1. `copy($$('a').map(a => a.href))` on any page, paste in a text editor.
2. Live expression `document.activeElement`, then press Tab repeatedly.
3. `monitorEvents(document.body, 'click')` and click around.
4. In TaskBoard, click the `400` error link → see which request failed.
