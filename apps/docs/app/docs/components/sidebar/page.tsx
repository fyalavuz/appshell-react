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
import {
  sidebarOverlayApi,
  sidebarDockedApi,
  navGroupApi,
  navItemApi,
} from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Sidebar",
  description:
    "Modal drawer on phones, persistent docked panel on desktop — one component, two variants.",
};

const overlayCode = `import { AppShell, Header, Content, Sidebar, NavGroup, NavItem } from "appshell-react";
import { useState } from "react";
import { Menu, Home, Package, Settings } from "lucide-react";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={
          <button aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu />
          </button>
        }
      />
      <Sidebar open={open} onClose={() => setOpen(false)} side="left">
        <NavGroup title="Navigation" defaultOpen>
          <NavItem label="Home" icon={<Home />} active />
          <NavItem label="Products" icon={<Package />} />
          <NavItem label="Settings" icon={<Settings />} />
        </NavGroup>
      </Sidebar>
      <Content>{/* main content */}</Content>
    </AppShell>
  );
}`;

const dockedCode = `import { AppShell, Header, Content, Sidebar, NavGroup, NavItem } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false); // mobile drawer fallback

  return (
    <AppShell>
      <Header behavior="fixed" logo={<span className="font-bold">Console</span>} />

      {/* Docked on md+, drawer below md. AppShell builds the two-column
          layout automatically for direct docked-Sidebar children. */}
      <Sidebar
        variant="docked"
        breakpoint="md"
        collapsible
        open={open}
        onClose={() => setOpen(false)}
      >
        <NavGroup title="Workspace" defaultOpen>
          <NavItem label="Dashboard" active />
          <NavItem label="Reports" />
          <NavItem label="Members" badge={2} />
        </NavGroup>
      </Sidebar>

      <Content className="p-6">{/* main content */}</Content>
    </AppShell>
  );
}`;

export default async function SidebarPage() {
  const [overlayHtml, dockedHtml] = await Promise.all([
    highlight(overlayCode),
    highlight(dockedCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="Sidebar"
        description="One component, two presentations: a modal overlay drawer (the default), and a persistent docked panel that collapses to an icon rail and degrades to the drawer on small screens."
      />

      <DocSection title="Overlay drawer">
        <DocProse>
          The default variant slides in over the page with a blurred backdrop.
          It closes on backdrop click or Escape and locks body scroll while
          open.
        </DocProse>
        <ComponentPreview
          name="Sidebar"
          code={overlayCode}
          previewUrl="/examples/preview/sidebar/"
        />
        <CodePanel html={overlayHtml} code={overlayCode} filename="app.tsx" />
        <PropsTable api={sidebarOverlayApi} />
      </DocSection>

      <DocSection title="Docked panel">
        <DocProse>
          <InlineCode>variant=&quot;docked&quot;</InlineCode> turns the
          sidebar into a layout column: it sticks below the Header (via the{" "}
          <InlineCode>--header-height</InlineCode> variable), scrolls
          independently, and — with{" "}
          <InlineCode>collapsible</InlineCode> — collapses to an icon rail
          where NavItem labels hide and become tooltips. Below the{" "}
          <InlineCode>breakpoint</InlineCode> the panel disappears and the
          same children open as the overlay drawer through{" "}
          <InlineCode>open</InlineCode>/<InlineCode>onClose</InlineCode>.
        </DocProse>
        <ComponentPreview
          name="Docked sidebar"
          code={dockedCode}
          previewUrl="/examples/preview/docked-sidebar/"
        />
        <CodePanel html={dockedHtml} code={dockedCode} filename="app.tsx" />
        <PropsTable api={sidebarDockedApi} />
        <DocNote>
          This documentation site&rsquo;s own navigation is a{" "}
          <InlineCode>variant=&quot;docked&quot;</InlineCode> Sidebar — resize
          the window to watch it fold into the drawer. Two v1 limitations to
          know: fixed Footers and the Header&rsquo;s reveal overlay span the
          full viewport width (they do not stop at the rail), and docked
          children render in both the panel and the drawer, so avoid
          hard-coded element ids inside.
        </DocNote>
      </DocSection>

      <DocSection title="Top and bottom sections">
        <DocProse>
          Both variants take a <InlineCode>topContent</InlineCode> and a{" "}
          <InlineCode>bottomContent</InlineCode> prop — slots pinned above
          and below the scrolling nav. The top slot is the desktop home for
          a{" "}
          <Link
            href="/docs/components/search-field"
            className="text-brand hover:underline"
          >
            SearchField
          </Link>{" "}
          (pass <InlineCode>inset={"{false}"}</InlineCode> and pad the slot
          yourself) or a workspace switcher: with a docked panel the header
          stays clean, and the space the sidebar usually leaves empty earns
          its keep. The bottom slot holds the infrastructural actions that
          don&rsquo;t navigate — settings, about, a theme toggle, or a{" "}
          <Link
            href="/docs/components/user-menu"
            className="text-brand hover:underline"
          >
            UserMenu
          </Link>
          . In the drawer, the top slot pads itself past the status bar and
          the bottom slot past the home indicator. The pattern comes
          straight from industrial design systems: navigation scrolls,
          infrastructure stays put.
        </DocProse>
      </DocSection>

      <DocSection title="NavGroup">
        <PropsTable api={navGroupApi} />
      </DocSection>

      <DocSection title="NavItem">
        <PropsTable api={navItemApi} />
      </DocSection>

      <DocSection title="Keyboard support">
        <ul className="space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          <li>
            • <InlineCode>Escape</InlineCode> closes the drawer presentation
            (overlay variant, or the docked variant&rsquo;s mobile fallback)
          </li>
          <li>
            • The collapse toggle is a native button:{" "}
            <InlineCode>Enter</InlineCode>/<InlineCode>Space</InlineCode>{" "}
            activate it, with <InlineCode>aria-expanded</InlineCode> and a
            visible focus ring
          </li>
        </ul>
        <DocNote>
          The drawer does not trap focus yet — if your menu contains many
          focusable elements, consider a focus-trap utility until that lands.
        </DocNote>
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          See the{" "}
          <Link
            href="/examples/docked-sidebar"
            className="text-brand hover:underline"
          >
            docked sidebar example
          </Link>{" "}
          for a full workspace app, and{" "}
          <Link href="/examples/sidebar" className="text-brand hover:underline">
            the drawer example
          </Link>{" "}
          for the modal pattern.
        </DocProse>
      </DocSection>
    </article>
  );
}
