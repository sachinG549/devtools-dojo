# Missions

Each mission is a small web page with one deliberate bug. You debug it in your own browser, type your answer, and the page tells you if you're right. Progress is saved in your browser and earns you a belt.

[Open the mission map →](https://sachinG549.github.io/devtools-dojo/labs/){ .md-button .md-button--primary }

| Mission | Bug | Tab that finds it |
|---|---|---|
| [Mission 1 · The hidden code](https://sachinG549.github.io/devtools-dojo/labs/00-warm-up/) | Code hidden in the HTML and the Console | Elements + Console |
| [Mission 2 · The button that won't click](https://sachinG549.github.io/devtools-dojo/labs/01-hidden-button/) | Invisible overlay steals clicks | Elements |
| [Mission 3 · Nothing happens, no error](https://sachinG549.github.io/devtools-dojo/labs/02-silent-error/) | Exception swallowed by `try/catch` | Sources |
| [Mission 4 · Frontend or backend?](https://sachinG549.github.io/devtools-dojo/labs/03-wrong-data/) | Correct API response, wrong UI | Network |
| [Mission 5 · The sluggish filter](https://sachinG549.github.io/devtools-dojo/labs/04-slow-click/) | Long task on every keystroke | Performance |
| [Mission 6 · The dialog that never leaves](https://sachinG549.github.io/devtools-dojo/labs/05-leak/) | Detached DOM nodes | Memory |
| [Mission 7 · Logged out after one minute](https://sachinG549.github.io/devtools-dojo/labs/06-cookie-logout/) | Cookie expiry, path and session storage | Application |
| [Mission 8 · "I deployed, but…"](https://sachinG549.github.io/devtools-dojo/labs/07-cache-trap/) | Service worker serves a stale file | Application |

## How to work through a mission

1. Read the mission. Don't open the hints yet. Hints unlock one at a time; the solution unlocks after the last hint.
2. Decide which tab should answer the question (the [mental model](index.md) helps).
3. Use the hints only after you're stuck for about 10 minutes.
4. After reading the solution, solve it again from scratch without looking.

## Run the labs locally

Service workers need `http://`, not `file://`:

```bash
git clone https://github.com/sachinG549/devtools-dojo.git
cd devtools-dojo
python3 -m http.server 8000
# open http://localhost:8000/labs/
```

!!! tip "Reset a mission"
    Application → Storage → **Clear site data** resets cookies, storage and service workers for the whole site, **including your mission progress**. To reset only progress, use *Reset progress* on the mission map.

## Playground

[TaskBoard](https://sachinG549.github.io/devtools-dojo/labs/taskboard/) is a small task app used by every chapter's *Practice* exercises. It makes real API calls, polls a heartbeat, stores data in Local storage and cookies, and has a deliberate 400 error.
