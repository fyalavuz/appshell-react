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
import { headerNavApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "HeaderNav",
  description:
    "Desktop link row for the Header's nav slot — items with children become hover/click dropdown menus.",
};

const navCode = `import { AppShell, Header, HeaderNav, HeaderNavItem, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={<span className="font-bold">Nimbus</span>}
        nav={
          <HeaderNav>
            {/* children make this item a dropdown */}
            <HeaderNavItem label="Products" active>
              <a
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                href="/analytics"
              >
                Analytics
              </a>
              <a
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                href="/automation"
              >
                Automation
              </a>
            </HeaderNavItem>
            <HeaderNavItem label="Pricing" href="/pricing" />
            <HeaderNavItem label="Docs" href="/docs" />
          </HeaderNav>
        }
        mobileMenu={
          <nav className="flex flex-col gap-1">
            <a className="rounded-md px-3 py-2 hover:bg-accent" href="/products">
              Products
            </a>
            <a className="rounded-md px-3 py-2 hover:bg-accent" href="/pricing">
              Pricing
            </a>
            <a className="rounded-md px-3 py-2 hover:bg-accent" href="/docs">
              Docs
            </a>
          </nav>
        }
      />
      <Content className="p-4">{/* landing content */}</Content>
    </AppShell>
  );
}`;

export default async function HeaderNavPage() {
  const navHtml = await highlight(navCode);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="HeaderNav"
        description="The desktop link row: a simple flex container of HeaderNavItems for the Header's nav slot. Give an item children and it becomes a dropdown menu that opens on hover or click."
      />

      <DocSection title="Overview">
        <DocProse>
          <InlineCode>HeaderNav</InlineCode> itself is deliberately small — a
          flex <InlineCode>&lt;nav&gt;</InlineCode> that lines up{" "}
          <InlineCode>HeaderNavItem</InlineCode>s (its only props are{" "}
          <InlineCode>className</InlineCode> and{" "}
          <InlineCode>children</InlineCode>). Pass it to the Header&rsquo;s{" "}
          <InlineCode>nav</InlineCode> prop; the Header renders that slot only
          from the <InlineCode>md</InlineCode> breakpoint up, so on phones the
          links disappear and the <InlineCode>mobileMenu</InlineCode> panel
          takes over. Without children, an item renders as a plain link (
          <InlineCode>href</InlineCode>) or a button.
        </DocProse>
        <ComponentPreview
          name="Desktop navigation"
          code={navCode}
          previewUrl="/examples/preview/desktop-nav/"
        />
        <CodePanel html={navHtml} code={navCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Dropdowns">
        <DocProse>
          Passing <InlineCode>children</InlineCode> to a HeaderNavItem turns
          it into a dropdown trigger: a button with a rotating chevron,{" "}
          <InlineCode>aria-haspopup</InlineCode>, and{" "}
          <InlineCode>aria-expanded</InlineCode>. The panel opens on hover
          (with a 150ms grace period when the pointer leaves, so you can move
          into the panel) or on click as a toggle, and closes on{" "}
          <InlineCode>Escape</InlineCode> or a click outside. It renders
          absolutely below the trigger as a{" "}
          <InlineCode>role=&quot;menu&quot;</InlineCode> panel styled with the
          popover tokens (<InlineCode>bg-popover</InlineCode>,{" "}
          <InlineCode>border-border</InlineCode>) — the content inside is
          entirely yours, typically a column of links.
        </DocProse>
        <DocNote>
          Two honest caveats: the entrance animation uses{" "}
          <InlineCode>animate-in fade-in zoom-in-95</InlineCode> utilities
          from <InlineCode>tw-animate-css</InlineCode> — install and import
          that plugin (see{" "}
          <Link
            href="/docs/installation"
            className="text-brand hover:underline"
          >
            Installation
          </Link>
          ) or the panel simply appears without the fade. And keyboard support
          inside the panel is minimal: <InlineCode>Escape</InlineCode> closes
          it, but there is no arrow-key menu navigation — items are plain
          focusable links.
        </DocNote>
      </DocSection>

      <DocSection title="Theme awareness">
        <DocProse>
          Items read the active Header theme through{" "}
          <InlineCode>useHeaderTheme()</InlineCode> and adapt automatically:
          accent-token hover/active styles on{" "}
          <InlineCode>&quot;light&quot;</InlineCode>, translucent
          primary-foreground styles on{" "}
          <InlineCode>&quot;primary&quot;</InlineCode> and{" "}
          <InlineCode>&quot;dark&quot;</InlineCode> headers. (On{" "}
          <InlineCode>theme=&quot;none&quot;</InlineCode> items fall back to
          the light styles — override with <InlineCode>className</InlineCode>{" "}
          if you are bringing your own header skin.) See{" "}
          <Link href="/docs/theming" className="text-brand hover:underline">
            Theming
          </Link>{" "}
          for the token details.
        </DocProse>
      </DocSection>

      <DocSection title="HeaderNavItem API">
        <PropsTable api={headerNavApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          The nav slot, hamburger, and mobile menu panel are covered on the{" "}
          <Link
            href="/docs/components/header"
            className="text-brand hover:underline"
          >
            Header
          </Link>{" "}
          page, and the{" "}
          <Link
            href="/examples/desktop-nav"
            className="text-brand hover:underline"
          >
            desktop navigation example
          </Link>{" "}
          shows the full responsive pattern — dropdowns on desktop folding
          into the mobile menu on phones.
        </DocProse>
      </DocSection>
    </article>
  );
}
