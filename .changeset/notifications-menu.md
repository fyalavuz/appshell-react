---
"appshell-react": minor
---

New NotificationsMenu + NotificationItem: a bell trigger with an unread badge (99+ cap) opening a notification dropdown with heading action, pinned footer, and built-in empty state. Anchored menus (UserMenu included) now share one popover engine: opening one closes the other instead of stacking, and panels flip upward near the bottom of the viewport, so a menu in the Sidebar's bottom slot no longer opens off-screen.
