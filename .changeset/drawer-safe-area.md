---
"appshell-react": patch
---

Sidebar drawer safe areas: the overlay panel now clears the top inset itself (status bar / notch / Android edge-to-edge), whether or not a `topContent` slot is rendered — previously a plain drawer's content underlapped the status bar. The panel also pads its leading edge in landscape, and when there is no `bottomContent` the scrolling nav owns the bottom inset so the last item rests above the home indicator.
