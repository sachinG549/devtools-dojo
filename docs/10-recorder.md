# 10. Recorder

### What it is

Records your clicks, typing, scrolls and navigation as a **user flow** you can replay, measure, and export as test code.

### Why it exists / problems it solves

- Reproduce a bug in exactly the same way every time ("Steps to reproduce" that actually run).
- Create an end-to-end test without writing code, then export it.
- Measure performance of a whole user journey (not only page load).
- Share a reproducible flow with a teammate (export JSON, they import it).

### How to use

1. **Create recording** (or `+`). Name it, choose **selector types** to record: CSS, ARIA, Text, XPath, Pierce (through shadow DOM). Optionally set a custom attribute like `data-testid`, which gives the most stable selectors.
2. **Start recording**, do the flow, **End recording**.
3. Each step appears in a list: `setViewport`, `navigate`, `click`, `change`, `keyDown`, `scroll`, `waitForElement`... Expand to edit selectors, values, timeouts. Add **assertions** with "Add assertion" (e.g. wait for an element to appear).
4. Toolbar:
   - **Replay** (with speed: normal, slow, very slow, extremely slow).
   - **Measure performance**: replays while recording a Performance trace.
   - **⬆ Import / ⬇ Export**: export to **JSON**, **Puppeteer** script, **Puppeteer for Firefox**, **Puppeteer (with Lighthouse report)**, and via extensions to **Playwright, Cypress, WebdriverIO, Nightwatch** and others.
   - 🗑 delete recording.
5. Right-click a step to add breakpoints, then replay step by step.
