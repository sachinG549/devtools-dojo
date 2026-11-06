# 3. Sources

### What it is

A code editor + **debugger** for every file the page loaded: JS, CSS, HTML, images, workers. You pause JavaScript mid-execution and inspect variables.

### Why it exists / problems it solves

- `console.log` debugging is slow: add log, rebuild, reload. With breakpoints you pause, look at everything, step line by line, all without editing code.
- Answer "who called this?" (Call Stack), "what is this variable right now?" (Scope), "why did this `if` take the wrong branch?"
- Edit code or mock API responses locally without deploying (Overrides).

### Left pane tabs (Page · Workspace · Overrides · `»`)

- **Page**: every loaded resource grouped by **frame** (`top`) → **origin** (`app.example.com`, `cdn.example.com`, `www.gravatar.com`) → folder → file. Extensions (ad blockers, screen recorders) appear here too because they inject scripts.
  - A file like `board?groupBy=assignee` is the HTML document of the page itself.
- **Workspace** (Filesystem): drop your local project folder in. DevTools maps served files to local files, and edits you make in DevTools **save to disk**. Works best with local dev servers.
- **Overrides**: **Local Overrides**. Pick a folder, then any file or **network response** you edit is saved locally and served instead of the real one on every reload. Uses:
  - Test a CSS/JS fix on production without deploying.
  - **Mock an API response** (Network → right-click a request → **Override content**) to test UI with edge-case data.
  - **Override response headers** (e.g. add CORS headers) via Network → right-click → **Override headers**.
- **`»` → Content scripts**: code injected by extensions.
- **`»` → Snippets**: save reusable JS scripts and run them on any page (`Cmd + Enter`, or `Cmd + P` then `!name`). Great for team utilities like "dump all ticket IDs on this board".

### Middle: the editor

- `Cmd + P` to open a file, `Cmd + Shift + O` to jump to a function, `Cmd + Option + F` to search across all files.
- **`{ }` Pretty print** button at the bottom: un-minifies a one-line bundle so you can read and set breakpoints.
- **Source maps**: if the site ships them, you see original files (Console links pointing at files like `index.ts` or `Board.tsx` instead of `bundle.min.js` mean source maps are working).
- Right-click a file → **Add script to ignore list**: hides library code from stepping and stack traces so you only see your code.
- Coverage colours in the gutter after running the Coverage panel.

### Right pane: the debugger

Toolbar icons (top-right):

| Icon | Name | Shortcut | Does |
|---|---|---|---|
| ▶‖ | Pause / Resume | `F8` / `Cmd + \` | Continue running until the next breakpoint |
| ↷ | Step over | `F10` / `Cmd + '` | Run the current line, don't go into function calls |
| ↓ | Step into | `F11` / `Cmd + ;` | Go into the function called on this line |
| ↑ | Step out | `Shift + F11` | Finish current function, return to caller |
| →• | Step | `F9` | Step to the next statement, including into async code |
| ⧸ breakpoint | Deactivate breakpoints | `Cmd + F8` | Keep breakpoints but ignore them temporarily |

Sections:

- **Watch**: expressions you want to see at every pause (`user.id`, `items.length`).
- **Breakpoints**: list of all line breakpoints, plus
  - **Pause on uncaught exceptions**: stops right where a crash happens. Turn this on when you see a red error in Console.
  - **Pause on caught exceptions**: also stops on errors that code swallows with `try/catch`. Great for "nothing happens and no error shows".
- **Scope**: when paused, shows **Local**, **Closure**, **Script**, **Global** variables. Double-click a value to change it live.
- **Call Stack**: the chain of functions that led here. Click a frame to see its variables. Async calls (promises, `setTimeout`) are shown as connected frames.
- **XHR/fetch breakpoints**: pause when a request URL contains a string (e.g. `/api/tasks`). Answers "which code sent this API call?"
- **DOM breakpoints**: those set from Elements.
- **Global listeners**: listeners on `window`.
- **Event listener breakpoints**: pause on any event category: Mouse → `click`, Keyboard, Timer → `setTimeout fired`, Load, XHR, Script → "first statement" etc. Answers "what code runs when I click this?" when you don't know where the handler is.
- **CSP violation breakpoints**: pause when a Content Security Policy blocks something.

### Types of breakpoints

| Type | How | Use |
|---|---|---|
| Line breakpoint | Click the line number | Normal |
| **Conditional** | Right-click line number → Add conditional breakpoint → `id === 'TB-42'` | Pause only for the interesting case inside a loop |
| **Logpoint** | Right-click → Add logpoint → `'user', user` | A `console.log` without editing code or redeploying |
| `debugger;` statement | In your code | Pauses when DevTools is open |
| DOM / XHR / Event / Exception | See above | When you don't know which line |

Bonus: while paused, hover any variable to see its value, and use the Console: it runs in the **paused scope**, so you can type local variable names.

### Practice

1. Sources → Event listener breakpoints → Mouse → `click`. Click a TaskBoard card. Step over a few lines.
2. XHR/fetch breakpoints → `+` → `heartbeat`. Wait (TaskBoard polls every 5 s). Look at the Call Stack.
3. Create a Snippet: `console.table($$('a').map(a=>({text:a.innerText, href:a.href})))` and run it on 3 different sites.
4. Enable Overrides, then change a CSS colour in a stylesheet and reload. The change persists.
