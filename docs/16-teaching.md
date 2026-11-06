# 16. How to teach this to others

1. **Start with the mental model, not the buttons**:
   - Elements = *what is on the page now* (DOM + CSS).
   - Console = *talk to the page* (logs + run JS).
   - Sources = *pause the code*.
   - Network = *what the page asked the server and what it got back*.
   - Performance = *what the browser was busy doing*.
   - Memory = *what the page is holding on to*.
   - Application = *what the site stored on your machine*.
   - Security = *is the connection trustworthy*.
   - Lighthouse = *automated report card*.
   - Recorder = *record and replay user steps*.
2. **Teach the "frontend or backend?" split early** (playbook A). It's the most valuable everyday skill, especially for QA and support people.
3. **Live demo on a real app** your audience uses, or on TaskBoard. Break something on purpose: hide an element, block an API, delete the session cookie, and let them figure out which tab shows the problem.
4. **One tab per session**, 30–45 minutes, with 2–3 exercises from the [practice plan](15-practice-plan.md).
5. **Give them a "bug hunt" homework**: a small HTML page with a CSS bug, a JS error, a failing fetch, and a leak. They report which tab found each one.
6. **Common beginner mistakes to warn about**:
   - Forgetting "Disable cache" is on, then being surprised production is cached.
   - Forgetting "Preserve log", so errors vanish on redirect.
   - Debugging with extensions enabled.
   - Editing CSS in DevTools and losing it on reload (use Changes panel or Overrides).
   - Sharing a HAR file or screenshot that contains session cookies or tokens.
   - Treating one Lighthouse score as the truth.
7. **Official references** to point people to:
   - Chrome DevTools docs: https://developer.chrome.com/docs/devtools
   - "What's new in DevTools" (each Chrome release): https://developer.chrome.com/blog (search "What's new in DevTools")
   - Web Vitals: https://web.dev/articles/vitals
   - MDN HTTP reference (status codes, headers, CORS, cookies): https://developer.mozilla.org/en-US/docs/Web/HTTP

> Note: DevTools changes every Chrome release (about every 4 weeks). Names and icon positions may shift. When in doubt, hover an icon for its tooltip or search the Command menu.
