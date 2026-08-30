---
"appshell-react": patch
---

`Content` now reserves the Footer's space automatically. A Footer is fixed to the bottom of the viewport, so until now every screen had to guess a bottom padding for it — the repo's own examples used `pb-16`, `pb-20`, `pb-24`, `pb-28` and `pb-32` depending on the variant, and any mismatch either clipped the last row or left a gap. The Footer measures itself and publishes `--appshell-footer-height`; `Content` reserves exactly that. The reservation is a margin, so a `pb-*` of your own still composes on top, and it resolves to `0px` when there is no Footer. The value holds while an `auto-hide` Footer is off screen, so the page does not reflow every time the bar slides away.

Opening an overlay no longer shifts the page sideways on desktop. Taking the scroll lock hides the scrollbar and hands its width back to the viewport; the lock now holds that width open on `body` and publishes it as `--appshell-scrollbar-gap` for fixed chrome to match.
