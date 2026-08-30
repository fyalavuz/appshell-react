---
"appshell-react": patch
---

Overlay layers now coordinate instead of competing. Every open presentation — the Sidebar drawer, SearchModal, a modal BottomSheet, the anchored menus, a HeaderNav dropdown — joins one stack, which fixes three things that were broken whenever two of them were on screen at once:

- **Escape closed everything.** Five components each listened for it, so dismissing a menu opened inside a drawer took the drawer down with it. The stack owns one listener and hands the close request to the frontmost layer only; the next press addresses the one below.
- **The scroll lock leaked.** Each overlay saved and restored `body` overflow on its own, so closing the outer one first let the page scroll behind the inner one — and once both were gone the body could be left locked with nothing open, unscrollable until reload. One refcounted owner now holds the lock, released when the last modal layer closes. It keys off `open`, not mount, so a layer animating out has already let go.
- **Stacking followed component identity, not open order.** A BottomSheet opened from inside a drawer rendered underneath it. z-index now comes from the stack, so whatever opens last is on top.

Nested focus traps also compose: activating one suspends the trap below it rather than fighting it for focus on every Tab, and focus restore skips a trigger that has since been detached.
