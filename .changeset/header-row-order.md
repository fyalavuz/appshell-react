---
"appshell-react": minor
---

`Header` gains `rowOrder`: the two lower rows — the title block and the search row — can be stacked either way round. Default `["context", "search"]` keeps today's layout; `["search", "context"]` puts search directly under the nav row. Reveal thresholds are measured from whatever order you set, so `reveal-search` still waits for exactly the rows above it.

`SearchField variant="full"` no longer paints a surface of its own. It was filling with `bg-white/10` on dark headers and `bg-muted/60` plus its own border on light ones, which read as a box dropped inside the header rather than part of it; it now takes the background it sits on, and the search row's own border does the separating.
