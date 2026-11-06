# Practice labs

The labs are small web pages, each with one deliberate bug. You debug them in your own browser, and there is nothing to install.

[Open the labs](https://sachinG549.github.io/devtools-dojo/labs/){ .md-button .md-button--primary }

| Lab | Bug | Tab that finds it |
|---|---|---|
| [TaskBoard](https://sachinG549.github.io/devtools-dojo/labs/taskboard/) | Playground used by every chapter's exercises | All |
| [01 · The button that won't click](https://sachinG549.github.io/devtools-dojo/labs/01-hidden-button/) | Invisible overlay steals clicks | Elements |
| [02 · Nothing happens, no error](https://sachinG549.github.io/devtools-dojo/labs/02-silent-error/) | Exception swallowed by `try/catch` | Sources |
| [03 · Frontend or backend?](https://sachinG549.github.io/devtools-dojo/labs/03-wrong-data/) | Correct API response, wrong UI | Network |
| [04 · The sluggish filter](https://sachinG549.github.io/devtools-dojo/labs/04-slow-click/) | Long task on every keystroke | Performance |
| [05 · The dialog that never leaves](https://sachinG549.github.io/devtools-dojo/labs/05-leak/) | Detached DOM nodes | Memory |
| [06 · Logged out after one minute](https://sachinG549.github.io/devtools-dojo/labs/06-cookie-logout/) | Cookie expiry, path and session storage | Application |
| [07 · "I deployed, but…"](https://sachinG549.github.io/devtools-dojo/labs/07-cache-trap/) | Service worker serves a stale file | Application |

## How to work through a lab

1. Read the mission. Don't open the hints yet.
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

!!! tip "Reset a lab"
    Application → Storage → **Clear site data** resets cookies, storage and service workers for the whole site.
