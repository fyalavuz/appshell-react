---
"appshell-react": patch
---

Header: `--header-height` now reports the header chrome actually on screen. A static or reveal header publishes the part still visible as it scrolls away (0 once gone) and the floating overlay's height while it is shown, so rows docked under it (Tabs, the docked Sidebar, your own anchor bars) no longer hang below an empty gap. Tabs also never dock above the top safe area.
