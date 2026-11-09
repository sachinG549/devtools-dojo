# DevTools Dojo

<div class="dojo-hero" markdown>

## 8 broken pages. Fix them with Chrome DevTools.

Most developers use about 10% of DevTools. Each mission here is a short web page with one real-world bug: a button that won't click, an error nobody sees, a wrong price, a frozen filter, a memory leak, a logout, a stale deploy. You find it with DevTools, type your answer, and earn your belt.

**Free · nothing to install · about 60 minutes · works in Chrome or Edge**

[Start mission 1 →](https://sachinG549.github.io/devtools-dojo/labs/00-warm-up/){ .md-button .md-button--primary }
[See all missions](https://sachinG549.github.io/devtools-dojo/labs/){ .md-button }

</div>

!!! warning "On your phone?"
    The missions need DevTools, which runs only on a desktop browser. Send this link to your computer. Meanwhile, the one-page mental model below and the reference guide work fine on mobile.

## Who it's for

- **Developers** who open Elements and Network every day but have never set a breakpoint or taken a heap snapshot.
- **QA and support engineers** who need to tell "frontend bug" from "backend bug" and attach proof.
- **Anyone teaching juniors**: every mission is a ready-made 10-minute exercise.

**By the end you'll be able to:** find what's covering an element, pause on a hidden error, decide frontend vs backend from a Response, find the function that slows a page, prove a memory leak, and debug cookies and service-worker caches.

## The missions

| # | Mission | Tab you'll learn | Time |
|---|---|---|---|
| 1 | [The hidden code](https://sachinG549.github.io/devtools-dojo/labs/00-warm-up/) | Elements + Console | 2 min |
| 2 | [The button that won't click](https://sachinG549.github.io/devtools-dojo/labs/01-hidden-button/) | Elements | 5 min |
| 3 | [Nothing happens, no error](https://sachinG549.github.io/devtools-dojo/labs/02-silent-error/) | Sources | 8 min |
| 4 | [Frontend or backend?](https://sachinG549.github.io/devtools-dojo/labs/03-wrong-data/) | Network | 6 min |
| 5 | [The sluggish filter](https://sachinG549.github.io/devtools-dojo/labs/04-slow-click/) | Performance | 10 min |
| 6 | [The dialog that never leaves](https://sachinG549.github.io/devtools-dojo/labs/05-leak/) | Memory | 12 min |
| 7 | [Logged out after one minute](https://sachinG549.github.io/devtools-dojo/labs/06-cookie-logout/) | Application | 8 min |
| 8 | ["I deployed, but…"](https://sachinG549.github.io/devtools-dojo/labs/07-cache-trap/) | Application | 8 min |

Stuck? Hints unlock one at a time, and the solution unlocks after the hints. Your progress is saved in your browser, and at the end you get a belt card to share.

## The mental model: one line per tab

| Tab | Question it answers |
|---|---|
| [Elements](01-elements.md) | What is on the page right now (the live DOM and its CSS)? |
| [Console](02-console.md) | What is the page saying, and what happens if I run this JavaScript inside it? |
| [Sources](03-sources.md) | What is the code doing, line by line? |
| [Network](04-network.md) | What did the page ask the server for, and what did it get back? |
| [Performance](05-performance.md) | What was the browser busy doing? |
| [Memory](06-memory.md) | What is the page holding on to, and why isn't it freed? |
| [Application](07-application.md) | What did the site store on my machine (cookies, storage, caches)? |
| [Security](08-security.md) | Can this connection and its certificate be trusted? |
| [Lighthouse](09-lighthouse.md) | How does the page score on performance, accessibility, best practices and SEO? |
| [Recorder](10-recorder.md) | Can I record these user steps, replay them, and export them as a test? |

!!! tip "The first skill to learn and teach"
    Open the request in **Network** and look at its **Response**. If the data is wrong, the bug is in the backend. If the data is right but the screen shows it wrong, the bug is in the frontend. Mission 4 drills exactly this.

## The reference guide

Every chapter opens with a mission, a real screenshot of the panel, and then every option explained: what it is, why it exists, and what problem it solves. Start with [Basics](00-basics.md), keep [Debugging playbooks](14-playbooks.md) and [Shortcuts](13-shortcuts.md) open while you work, or follow the [2-week practice plan](15-practice-plan.md). Running a workshop? See [Teach it](16-teaching.md). Prefer paper? [Download the PDF](https://github.com/sachinG549/devtools-dojo/releases/latest).

!!! note "Platform"
    Written for Chrome on macOS. On Windows/Linux, replace ++cmd++ with ++ctrl++ and ++option++ with ++alt++. DevTools changes about every 4 weeks. If something looks outdated, [open an issue](https://github.com/sachinG549/devtools-dojo/issues/new/choose).
