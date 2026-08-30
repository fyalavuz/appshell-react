import Link from "next/link";
import {
  DocHeader,
  DocSection,
  DocProse,
  DocNote,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { notificationItemApi, notificationsMenuApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "NotificationsMenu",
  description:
    "Bell trigger + notification dropdown for the header corner — unread badge, mark-all-read slot, and built-in coexistence with UserMenu.",
};

const headerCode = `import { AppShell, Header, NotificationsMenu, NotificationItem, UserMenu } from "appshell-react";
import { GitPullRequest, MessageSquare, Rocket } from "lucide-react";

<Header
  behavior="sticky"
  logo={<span className="font-bold">Console</span>}
  actions={
    <>
      <NotificationsMenu unreadCount={2}>
        <NotificationItem
          icon={<Rocket />}
          title="Deploy finished"
          description="terra-web #482 is live on production."
          time="2m"
          unread
          href="/deploys/482"
        />
        <NotificationItem
          icon={<MessageSquare />}
          title="Mara mentioned you"
          time="1h"
          unread
          onClick={openThread}
        />
        <NotificationItem icon={<GitPullRequest />} title="PR #98 merged" time="1d" />
      </NotificationsMenu>
      <UserMenu username="Mara Kealoha" initials="MK">…</UserMenu>
    </>
  }
/>`;

const actionsCode = `// Heading action + pinned footer. Elements WITHOUT role="menuitem"
// (the mark-all button) keep the menu open; menuitem clicks close it.
<NotificationsMenu
  unreadCount={unread.length}
  action={
    <button onClick={markAllRead} className="text-xs text-muted-foreground hover:text-foreground">
      Mark all read
    </button>
  }
  footer={
    <a href="/notifications" role="menuitem"
       className="block rounded-lg px-3 py-2 text-center text-sm hover:bg-accent">
      View all notifications
    </a>
  }
>
  {unread.map((n) => (
    <NotificationItem key={n.id} title={n.title} time={n.time} unread href={n.href} />
  ))}
</NotificationsMenu>

// Nothing to show? The built-in empty state renders — or bring your own:
<NotificationsMenu emptyState={<InboxZeroIllustration />} />`;

export default async function NotificationsMenuPage() {
  const [headerHtml, actionsHtml] = await Promise.all([
    highlight(headerCode),
    highlight(actionsCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="NotificationsMenu"
        description="The bell next to the avatar: an unread badge on the trigger, a dropdown of recent notifications behind it. Standalone, theme-aware inside a Header — and a good neighbor: opening it closes the UserMenu, and vice versa."
      />

      <DocSection title="In the header">
        <DocProse>
          Drop it into the Header&rsquo;s <InlineCode>actions</InlineCode>{" "}
          slot, right next to the <InlineCode>UserMenu</InlineCode>. The
          bell shows <InlineCode>unreadCount</InlineCode> as a badge
          (capped at 99+), the panel lists your{" "}
          <InlineCode>NotificationItem</InlineCode> rows, and everything
          closes on outside click, Escape, or an item click. The two menus
          never stack: opening one closes the other, so each stays its own
          control instead of taking the other&rsquo;s place.
        </DocProse>
        <ComponentPreview
          name="NotificationsMenu"
          code={headerCode}
          previewUrl="/examples/preview/search-command/"
        />
        <CodePanel html={headerHtml} code={headerCode} filename="header.tsx" />
      </DocSection>

      <DocSection title="Actions, footer, empty state">
        <DocProse>
          <InlineCode>action</InlineCode> sits at the right of the heading
          — the classic &ldquo;Mark all read&rdquo; — and deliberately
          keeps the menu open, since it doesn&rsquo;t navigate.{" "}
          <InlineCode>footer</InlineCode> pins a row under the list for a
          &ldquo;View all&rdquo; link. With no children the panel shows a
          quiet built-in empty state, replaceable via{" "}
          <InlineCode>emptyState</InlineCode>.
        </DocProse>
        <CodePanel html={actionsHtml} code={actionsCode} filename="actions.tsx" />
        <DocNote>
          Near the bottom of the viewport — say, a bell in the
          Sidebar&rsquo;s <InlineCode>bottomContent</InlineCode> slot — the
          panel flips and opens upward, so it never renders off-screen.
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={notificationsMenuApi} />
        <PropsTable api={notificationItemApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          Pair it with the{" "}
          <Link
            href="/docs/components/user-menu"
            className="text-brand hover:underline"
          >
            UserMenu
          </Link>{" "}
          for the full header-corner identity cluster — they share the same
          anchoring, theming, and open/close behavior.
        </DocProse>
      </DocSection>
    </article>
  );
}
