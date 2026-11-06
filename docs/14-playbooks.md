# 14. Debugging playbooks for real problems

These playbooks are what make you useful every day. Each one lists the order of tabs to use.

### A. "The UI shows wrong / missing data"
1. **Network** → Fetch/XHR → find the request (use Search pane for a known value).
2. Check **Status**, then **Response**/Preview.
   - Response wrong → **backend bug**. Copy as cURL and give it to the backend team.
   - Response right → **frontend bug**. Continue.
3. **Payload**: did the frontend send the right params?
4. **Sources** → XHR/fetch breakpoint on that URL → step through the code that handles the response.

### B. "I click a button and nothing happens"
1. **Console**: any red error after clicking? Click its file link.
2. **Elements** → select button → **Event Listeners**: is there a click handler?
3. Is something on top of it? Use the element picker on the button: if it selects a different element, an overlay is blocking it. Check `pointer-events`, `z-index`.
4. **Sources** → Event listener breakpoints → Mouse → click, then step.
5. Turn on **Pause on caught exceptions** for swallowed errors.

### C. "API returns 401 / 403 / I keep getting logged out"
1. **Network** → request → **Headers**: is the `cookie` or `authorization` header sent?
2. **Cookies** tab in the request: any cookies blocked (yellow highlight, hover for reason: SameSite, Secure, domain)?
3. **Application** → Cookies: check Expires, Domain, SameSite of the session cookie.
4. **Keep log** on, reproduce the redirect chain (`302` → login → `302` back).

### D. "CORS error"
1. **Console** shows the message; **Network** shows the failed request (and a `preflight` `OPTIONS` row).
2. Response headers of the preflight: is `Access-Control-Allow-Origin` your origin? `Access-Control-Allow-Headers` / `-Methods` complete? `-Allow-Credentials: true` when sending cookies?
3. CORS is fixed **on the server**, not the frontend. For local testing only, you can use Overrides → Override headers.

### E. "Layout is broken on mobile / at some width"
1. **Device toolbar** → Responsive → drag width until it breaks. Show media queries.
2. **Elements** → Styles → check which media query rules apply; **Layout** overlays for grid/flex.
3. **Computed** for actual widths. Look for fixed widths, `min-width`, long unbroken words, overflow.
4. Overflowing element hunt: Console `$$('*').filter(e => e.scrollWidth > document.documentElement.clientWidth)`.

### F. "The page is slow"
1. **Lighthouse** (incognito) for a quick diagnosis.
2. **Network**: slow TTFB (backend) vs large downloads vs too many requests vs render-blocking files.
3. **Performance** with 4× CPU throttling: long tasks, Bottom-Up for hot functions.
4. **Coverage** for unused JS/CSS.

### G. "Page freezes / gets slower over time"
1. **Performance monitor**: watch JS heap and DOM nodes while repeating an action.
2. **Memory** → 3-snapshot technique; check **Detached elements**.

### H. "My fix is deployed but I still see the old version"
1. **Network** → Size column: `(disk cache)` / `(ServiceWorker)`?
2. **Disable cache** + long-press reload → **Empty cache and hard reload**.
3. **Application** → Service workers → Update on reload / Unregister; Cache storage → delete.
4. Check the file's response headers: `cache-control`, `etag`, `age` (CDN cache).

### I. "Reproduce a customer's bug"
1. Ask for a **HAR file** (Network → export) and **console log** (Console → right-click → Save as).
2. Import HAR into your Network tab and review requests.
3. Use **Recorder** to capture the steps once, then replay to verify the fix.
