# 1. Elements

### What it is

A live view of the **DOM** (Document Object Model): the browser's in-memory tree of the page. Important difference: **View Page Source (`Cmd + Option + U`) shows the HTML the server sent. Elements shows the DOM right now**, after JavaScript (React, Vue, or plain JS) has added, removed and changed nodes.

### Why it exists / what problems it solves

- "Why does this button look wrong?" → inspect its CSS.
- "Why is this element invisible / not clickable?" → check `display`, `visibility`, `opacity`, `z-index`, `pointer-events`, or another element sitting on top of it.
- "Is my component actually rendering?" → find it in the tree.
- "What changed after I clicked?" → DOM nodes flash purple when modified.
- Quick prototyping: edit text, classes and CSS live, then copy the result into your code.

### Reading a real DOM tree

A typical modern app's tree looks like this (TaskBoard uses the same patterns):

```html
<html data-theme="light" data-color-mode="light" lang="en">
  <body id="app" class="tb-theme" style="background-color: var(--tb-surface, #fff);">
    <script nonce="r4nd0m">...</script>
    <link rel="modulepreload" href="/assets/vendor.5622f0d5.js" fetchpriority="high">
```
- `data-*` attributes are custom data. Design systems often read `data-theme` / `data-color-mode` to pick colours.
- `<head>…</head>` with the arrow is collapsed. Click the arrow, or `Option + click` to expand **all** descendants.
- `<body id="app" class="tb-theme"> == $0` → `== $0` means this is the **currently selected node**. In the Console, typing `$0` gives you this element.
- `<script nonce ...>` → `nonce` is a one-time token that the Content Security Policy uses to allow specific inline scripts.
- `<link rel="modulepreload" ... fetchpriority="high">` → tells the browser to download JS modules early and with high priority. That is a performance optimisation, and you'll see these files appear early in Network.
- `view-source` badge on `<html>` and the bottom **breadcrumb** (`html > body#app.tb-theme`) show the path to the selected node. Click a crumb to jump up.

### The DOM tree: what you can do

| Action | How |
|---|---|
| Edit text / attribute | Double-click it |
| Edit as raw HTML | Right-click → **Edit as HTML** (or `F2`) |
| Add attribute | Right-click → **Add attribute** |
| Delete node | Select → `Delete` key (undo with `Cmd + Z`) |
| Hide node | Select → press `H` (toggles `visibility: hidden`) |
| Move node | Drag it to a new place in the tree |
| Force state | Right-click → **Force state** → `:hover`, `:focus`, `:active`, `:visited`, `:focus-within`, `:focus-visible`, `:target` |
| Search the DOM | `Cmd + F` inside the tree. Accepts text, a **CSS selector** (`.tb-theme > div`) or **XPath** (`//button[@type="submit"]`) |
| Scroll page to node | Right-click → **Scroll into view** |
| Screenshot one node | Right-click → **Capture node screenshot** |
| Use node in Console | Right-click → **Store as global variable** (becomes `temp1`) |
| Copy a reference | Right-click → **Copy** → **Copy selector**, **Copy JS path**, **Copy XPath**, **Copy full XPath**, **Copy styles**, **Copy outerHTML**, **Copy element** |
| Watch for changes | Right-click → **Break on** → **subtree modifications**, **attribute modifications**, **node removal**. JS pauses in Sources at the line that changed it. |

**Copy selector / Copy JS path** are what QA and automation engineers use to write Selenium/Playwright/Cypress locators.

**Badges** next to nodes: `grid`, `flex`, `scroll`, `container`, `slot`, `top-layer`. Click `grid` or `flex` to draw an overlay on the page showing rows, columns and gaps.

### Right sidebar tabs

The sidebar shows **Styles · Computed · Layout · Event Listeners · `»`** (the `»` hides DOM Breakpoints, Properties, Accessibility).

#### Styles

Every CSS rule that matches the selected element, **most specific at the top**.

Toolbar:

- **Filter** (with `.*` for regex): find a property quickly, e.g. type `margin`.
- **Stacked-layers icon**: show CSS cascade layers (`@layer`) and their order.
- **`:hov`**: force `:hover`, `:active`, `:focus`, `:focus-within`, `:focus-visible`, `:visited`, `:target`. Essential for styling hover menus and tooltips that disappear when you move the mouse.
- **`.cls`**: toggle existing classes on/off with checkboxes, or add a new class.
- **`+`**: create a new CSS rule for this element's selector (long-press to choose which stylesheet).
- **Paintbrush icon**: toggle common rendering emulations like `prefers-color-scheme: dark` and `print` media.
- **Sidebar icon**: show the Computed pane next to Styles.

How to read the rules:

- `element.style { ... }`: inline `style=""` attribute on the element. Add properties here to test quickly.
- `body#app { overflow-x: hidden; overflow-y: auto; }`: a rule from a stylesheet. The file name and line appear on the right of each rule; click to open it in Sources.
- **Strikethrough** (`-ms-overflow-style`, `background-color` in a less specific `body` rule): that declaration is **overridden** by a more specific or later rule, or it's invalid. A **yellow warning triangle** means invalid value / unknown property. A grey italic declaration means it doesn't apply (for example `flex` properties on a non-flex parent); hover the `i` icon for the reason.
- `var(--tb-surface, #fff)`: a CSS custom property with a fallback. Hover the variable to see its value. `Cmd + click` jumps to its definition.
- The small coloured squares are **colour swatches**: click to open the colour picker (contrast ratio, eyedropper, palettes, format switch with `Shift + click`).
- `margin: ▶ 0;` the arrow expands shorthand properties into longhands.
- Bottom of the pane: the **box model** diagram (margin / border / padding / content). Double-click numbers to edit.

Editing:

- Click a value to edit. `↑`/`↓` changes by 1, `Shift` by 10, `Option` by 0.1.
- Checkbox on hover toggles a declaration on/off.
- Click empty space inside a rule to add a declaration.
- **Inherited from body** sections show inherited properties (font, colour).
- Other tools inside Styles: shadow editor, cubic-bezier (easing) editor, angle editor, font editor, flexbox/grid editors (the small icon next to `display: flex`).

All your edits are tracked in the **Changes** panel (More tools → Changes), so you can copy them into code.

#### Computed

The **final** value of every property after the cascade. Use it when Styles is confusing: "what is the actual `font-size`?" Expand a property to see which rule won. Tick **Show all** to include defaults; **Group** groups by category.

#### Layout

All grid and flex containers on the page with checkboxes to show overlays. Options: show line numbers, line names, track sizes, area names, extend grid lines. Best tool for "why is this column 20px too wide?"

#### Event Listeners

Every listener attached to the element (and ancestors, if **Ancestors** is ticked): `click`, `keydown`, `scroll`... Click the file link to see the handler code. Untick **Framework listeners** to see raw listeners, or tick it to resolve React/jQuery wrappers. **Remove** a listener to test behaviour without it.

#### DOM Breakpoints

List of all the "Break on" breakpoints you set in the tree.

#### Properties

The JS object for the node (`id`, `className`, `dataset`, `value`, `checked`...). Helpful when the attribute and the property disagree, e.g. an `<input>`'s `value` attribute vs the value the user typed.

#### Accessibility

The **accessibility tree**: the node's computed role, name, and ARIA attributes, as a screen reader sees it. Turn on **Enable full-page accessibility tree** to browse the whole page that way.

### Practice

1. Open TaskBoard → inspect a card → press `H` to hide it.
2. Force `:hover` on a menu item and change its background colour.
3. Copy the JS path of the search box, paste it into Console, add `.focus()`.
4. Right-click a list → Break on → subtree modifications, then drag a card. DevTools will pause in the code that re-renders the list.
