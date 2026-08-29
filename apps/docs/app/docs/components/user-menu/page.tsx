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
import { avatarApi, userMenuApi, userMenuItemApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "UserMenu",
  description:
    "Avatar trigger + account dropdown for the header corner — plus the standalone Avatar it's built on.",
};

const headerCode = `import { AppShell, Header, UserMenu, UserMenuItem } from "appshell-react";
import { LogOut, Settings, User } from "lucide-react";

<Header
  behavior="sticky"
  logo={<span className="font-bold">Console</span>}
  actions={
    <UserMenu
      username="Mara Kealoha"
      detail="mara@terra.dev"
      initials="MK"                        // or src="/avatar.jpg"
    >
      <UserMenuItem icon={<User />} label="Profile" href="/profile" />
      <UserMenuItem icon={<Settings />} label="Settings" href="/settings" />
      <UserMenuItem icon={<LogOut />} label="Log out" destructive onClick={signOut} />
    </UserMenu>
  }
/>`;

const customCode = `// Replace the trigger entirely — the dropdown behavior stays.
<UserMenu
  username="Mara Kealoha"
  detail="Administrator"
  trigger={
    <span className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm">
      <Avatar initials="MK" size="1.5rem" />
      Mara
    </span>
  }
>
  {/* any children work; clicks on role="menuitem" elements auto-close */}
  <ThemeSwitcherRow />
  <UserMenuItem label="Log out" destructive onClick={signOut} />
</UserMenu>

// In a Sidebar's bottom slot (the iX "infrastructure section" pattern):
<Sidebar variant="docked" bottomContent={
  <div className="p-2"><UserMenu username="Mara" initials="MK" align="start">…</UserMenu></div>
}>…</Sidebar>`;

export default async function UserMenuPage() {
  const [headerHtml, customHtml] = await Promise.all([
    highlight(headerCode),
    highlight(customCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="UserMenu"
        description="The signed-in user's corner of the app: an avatar that opens a dropdown with their identity and account actions. Standalone, customizable, replaceable — and theme-aware inside a Header."
      />

      <DocSection title="In the header">
        <DocProse>
          Drop it into the Header&rsquo;s <InlineCode>actions</InlineCode>{" "}
          slot. The trigger shows the avatar; the panel opens with an identity
          header (name + <InlineCode>detail</InlineCode> line) above your
          items. It closes on outside click, Escape, or any item click —
          and inside a <InlineCode>primary</InlineCode>/
          <InlineCode>dark</InlineCode> Header the trigger&rsquo;s hover ring
          adapts automatically.
        </DocProse>
        <ComponentPreview
          name="UserMenu"
          code={headerCode}
          previewUrl="/examples/preview/search-command/"
        />
        <CodePanel html={headerHtml} code={headerCode} filename="header.tsx" />
      </DocSection>

      <DocSection title="Customize or replace">
        <DocProse>
          Every layer is swappable: <InlineCode>trigger</InlineCode> replaces
          the avatar button, <InlineCode>children</InlineCode> accepts
          anything (custom rows close the menu when they carry{" "}
          <InlineCode>role=&quot;menuitem&quot;</InlineCode>), and{" "}
          <InlineCode>open</InlineCode>/<InlineCode>onOpenChange</InlineCode>{" "}
          hand you full control of the state. Don&rsquo;t want the component
          at all? <InlineCode>Avatar</InlineCode> is exported standalone for
          building your own.
        </DocProse>
        <CodePanel html={customHtml} code={customCode} filename="custom.tsx" />
        <DocNote>
          The dropdown uses the same <InlineCode>animate-in</InlineCode>{" "}
          entrance utilities as HeaderNav — install{" "}
          <InlineCode>tw-animate-css</InlineCode> for the fade/zoom entrance
          (it degrades gracefully without it).
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={userMenuApi} />
        <PropsTable api={userMenuItemApi} />
        <PropsTable api={avatarApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          Pair it with the{" "}
          <Link
            href="/docs/components/sidebar"
            className="text-brand hover:underline"
          >
            Sidebar
          </Link>
          &rsquo;s <InlineCode>bottomContent</InlineCode> slot for the
          settings-and-account section at the bottom of a docked panel.
        </DocProse>
      </DocSection>
    </article>
  );
}
