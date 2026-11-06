# 0. Before the tabs: the frame around everything

### Opening DevTools

| Action | Shortcut |
|---|---|
| Open / close DevTools | `Cmd + Option + I` |
| Open with Element picker active | `Cmd + Shift + C` |
| Open straight to Console | `Cmd + Option + J` |
| Right-click anything → **Inspect** | opens Elements with that node selected |

### The top bar (left to right)

- **Arrow-in-box icon (Select element)**: click it, then hover the page. The hovered element highlights with its size, margins (orange) and padding (green). Click to jump to it in Elements.
- **Phone/tablet icon (Device toolbar, `Cmd + Shift + M`)**: renders the page as a phone/tablet. Choose device presets, rotate, set DPR (pixel ratio), throttle the network and CPU. This is how you test responsive layouts without a phone.
- **Tabs**: Elements, Console, Sources, Network, Performance, Memory, Application, Security, Lighthouse, Recorder, and extension tabs like Adblock Plus. Drag tabs to reorder them. Tabs with an `×` were opened from "More tools" and can be closed.
- **`⊗ 18` `⚠ 18` `▮ 6`**: counts of console **errors**, **warnings**, and **Issues**. Click them to jump to Console / Issues.
- **Blue square icon**: AI assistance / Gemini in DevTools (shows if enabled for your account/region).
- **Gear (`F1`)**: Settings. Preferences, theme, ignore list, experiments, shortcuts, device list, throttling profiles.
- **Kebab `⋮`**:
  - **Dock side**: undock into a separate window, or dock left / bottom / right. Undocked is best on big monitors.
  - **Run command** (`Cmd + Shift + P`).
  - **More tools**: dozens of extra panels (see [More tools](12-more-tools.md)).
  - **Show console drawer** (`Esc`).
  - Help, shortcuts.

### The Command Menu: the most important shortcut

`Cmd + Shift + P` opens a VS Code-style palette. Type anything:

- `screenshot` → "Capture full size screenshot", "Capture node screenshot", "Capture area screenshot"
- `dark` / `light` → switch DevTools theme
- `disable javascript` → see how the page behaves without JS
- `coverage`, `rendering`, `sensors`, `animations` → open hidden panels
- `dock` → change dock position

Inside the same box:

- `Cmd + P` (no Shift) opens a **file** by name (any loaded JS/CSS).
- Type `?` to see all modes. `@` lists functions in the current file, `:` goes to a line number, `!` runs a snippet.

### The Drawer

Press `Esc` in any panel. A bottom pane opens with the Console (and other tools like Network conditions, Rendering, Search). This lets you use the Console while looking at Elements or Sources at the same time.

### Settings worth turning on once

`F1` → Preferences:

- **Appearance → Theme**: match your eyes.
- **Console → Preserve log upon navigation** if you debug redirects/logins often.
- **Network → Preserve log** same reason.
- **Sources → Enable JavaScript source maps / CSS source maps** (usually on by default). They let you see original TypeScript/SCSS instead of minified bundles.
- **Ignore list → "Add content scripts to ignore list"** so extension code doesn't clutter stack traces.
- **Global → Auto-open DevTools for popups** helps when debugging OAuth popups.
