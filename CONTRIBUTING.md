# Contributing

Thanks for helping. DevTools changes roughly every 4 weeks, so fixes for outdated content are the most valuable contribution.

## Ways to help

- **Something is outdated or wrong:** open an issue with the "Outdated / incorrect" template. Include your Chrome version (`chrome://version`).
- **Lab idea:** open an issue with the "Lab idea" template. Describe the bug, and which tab finds it.
- **Pull requests:** small, focused PRs are easiest to review.

## Local setup

```bash
pip install -r requirements.txt
mkdocs serve                 # preview docs at http://127.0.0.1:8000
python3 -m http.server 8000  # or serve labs/ on their own
```

## Writing style

- Plain, direct language. One idea per sentence.
- Say what a feature does, why it exists, and what problem it solves.
- Use TaskBoard (`labs/taskboard/`) or `example.com` for examples. Don't use real company sites, internal URLs, or screenshots containing personal data, cookies or tokens.
- New labs: one bug per lab, a `README.md` mission, hints, and a solution hidden in `<details>`.
