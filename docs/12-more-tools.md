# 12. Hidden panels under "More tools"

Open via `⋮ → More tools` or `Cmd + Shift + P` → type the name. Most open in the drawer (`Esc`).

??? info "Reference table (21 rows), click to expand"
    | Panel | What it does | Problem it solves |
    |---|---|---|
    | **Rendering** | Paint flashing (green = repainted areas), **Layout shift regions** (blue), Layer borders, **Frame rendering stats** (FPS meter), Scrolling performance issues, **Emulate CSS media** (print, `prefers-color-scheme`, `prefers-reduced-motion`, forced colors), **Emulate vision deficiencies** (blurred vision, colour-blindness types), disable local fonts, emulate auto dark mode | Find what repaints too often, test dark mode, test accessibility for colour-blind users |
    | **Coverage** | Record → shows % of each JS/CSS file that was actually used | Find unused code to remove; red/blue gutter in Sources |
    | **Network conditions** | User agent, throttling, accepted encodings, disable cache | Test as mobile/Googlebot, test slow networks |
    | **Network request blocking** | Patterns like `*analytics*` to block | Test failure of third-party scripts or APIs |
    | **Sensors** | Fake **geolocation** (choose a city), device orientation, **touch** emulation, **idle state**, CPU pressure | Test location-based features, mobile gestures |
    | **Animations** | Records CSS animations/transitions; slow down to 25%/10%, scrub, edit timings | Polish or debug animations |
    | **Changes** | Diff of every CSS/JS edit you made in DevTools | Copy your live tweaks into code |
    | **CSS Overview** | Capture → summary of all colours, fonts, media queries, unused declarations, contrast issues | Audit a design system, find inconsistent colours |
    | **Issues** | Structured list of problems: cookie SameSite, CSP, mixed content, deprecated features, CORS, low contrast, form problems | Clearer than Console noise. The orange counter in the top bar |
    | **Layers** | 3D view of compositor layers and why each was created | Advanced rendering/GPU debugging |
    | **Search** (`Cmd + Option + F`) | Search across all loaded sources | Find where a string or function lives |
    | **Developer resources** | Status of source maps and other resources DevTools loaded | "Why aren't my source maps working?" |
    | **Performance monitor** | Live graphs: CPU, JS heap, DOM nodes, listeners, layouts/sec, style recalcs/sec | Quick live leak/jank check |
    | **Memory inspector** | Byte-level view of ArrayBuffers / Wasm memory | Wasm and binary data work |
    | **Media** | Video/audio player properties, events, errors | Debug video playback |
    | **WebAudio** | AudioContext graphs | Audio apps |
    | **WebAuthn** | Virtual authenticators (passkeys, security keys) | Test passkey login without hardware |
    | **Autofill** | How Chrome autofill maps your form fields | Debug address/payment forms |
    | **Quick source** | Small source viewer in the drawer | View code while in Elements |
    | **AI assistance** | Ask about a style, request, performance trace or file, in context | Explanations; verify its answers |
    | **Crash analyzer / Protocol monitor** | Advanced (stack trace analysis, raw Chrome DevTools Protocol messages) | Tooling developers |

### Device toolbar (`Cmd + Shift + M`) in more detail

- Device dropdown (iPhone, Pixel, iPad, or Responsive with draggable edges).
- Width × height, zoom, **DPR**, **throttling**, rotate.
- `⋮` in the toolbar: Show media queries (coloured bars; click to jump to that breakpoint), Show rulers, Capture screenshot / full-size screenshot, Add device pixel ratio, Add device type.
- Emulates touch events and the mobile user agent. It does **not** emulate a real phone's CPU or browser engine (iOS Safari is a different engine), so test on real devices before release.
