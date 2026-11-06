# DevTools Dojo

Learn Chrome DevTools inside out: every tab, every option, why it exists and what problem it solves. Then practise on small broken pages until finding bugs feels routine.

[Start with the basics](00-basics.md){ .md-button .md-button--primary }
[Open the labs](practice-labs.md){ .md-button }
[Download the PDF](https://github.com/sachinG549/devtools-dojo/releases/latest){ .md-button }

!!! note "Platform"
    Written for Chrome on macOS. On Windows/Linux, replace ++cmd++ with ++ctrl++ and ++option++ with ++alt++.

## The mental model: one line per tab

If you remember only one page, remember this one. Every debugging session starts by picking the right tab for the question you're asking.

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
    Open the request in **Network** and look at its **Response**. If the data is wrong, the bug is in the backend. If the data is right but the screen shows it wrong, the bug is in the frontend.

## How to use this course

1. Read [Basics](00-basics.md) once and turn on the recommended settings.
2. Open **TaskBoard**, the practice app used in every example, in a second window.
3. Read one panel chapter at a time and do its *Practice* exercises on TaskBoard.
4. Solve the matching [lab](practice-labs.md) without peeking at the solution.
5. Keep [Debugging playbooks](14-playbooks.md) and [Shortcuts](13-shortcuts.md) open while you work.

Prefer a structured schedule? Follow the [2-week practice plan](15-practice-plan.md). Want to run a workshop? See [Teach it](16-teaching.md).

!!! warning "DevTools changes every Chrome release"
    Chrome ships about every 4 weeks, and panel names or icon positions can move. If something here looks out of date, hover the icon for its tooltip, search the Command Menu (++cmd+shift+p++), and [open an issue](https://github.com/sachinG549/devtools-dojo/issues/new/choose).
