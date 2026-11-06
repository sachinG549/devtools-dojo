# 11. Extension tabs

**Adblock Plus** adds its own tab to show blocked items. Other extensions add tabs too: **React Developer Tools** (Components, Profiler), **Redux DevTools**, **Vue**, **Angular DevTools**, **Apollo (GraphQL)**.

For React apps, React DevTools is worth installing: it shows the component tree, props, state, hooks, and the Profiler shows which components re-render and why.

**Warning when debugging**: extensions inject scripts (you can see them under Sources → Page) and can cause errors, block requests and slow pages. If something looks weird, retest in **Incognito** or a clean profile. Use "Hide extension URLs" in Network and the ignore list in Sources to cut noise.
