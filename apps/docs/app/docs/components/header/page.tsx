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
import { headerApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Header",
  description:
    "Four composable rows with ten scroll behaviors, four themes, and an animated mobile menu.",
};

const fixedCode = `import { AppShell, Header, Content } from "appshell-react";
import { Bell } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={<span className="font-bold">Atlas</span>}
        actions={
          <button aria-label="Notifications">
            <Bell className="size-5" />
          </button>
        }
      />
      <Content className="p-4">{/* itinerary */}</Content>
    </AppShell>
  );
}`;

const revealCode = `import { AppShell, Header, Content, ScrollNav, ScrollNavItem } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-all"
        logo={<span className="font-bold">Pulse</span>}
        title="Your feed"
        subtitle="34 new posts since this morning"
        searchContent={
          <ScrollNav>
            <ScrollNavItem label="All" active />
            <ScrollNavItem label="Following" />
            <ScrollNavItem label="Trending" />
          </ScrollNav>
        }
        mobileMenu={
          <nav className="flex flex-col gap-1">
            <a className="rounded-md px-3 py-2 hover:bg-accent" href="/feed">
              Feed
            </a>
            <a className="rounded-md px-3 py-2 hover:bg-accent" href="/messages">
              Messages
            </a>
          </nav>
        }
      />
      <Content className="p-4">{/* posts */}</Content>
    </AppShell>
  );
}`;

const behaviors: { name: string; text: string }[] = [
  {
    name: "static",
    text: "Rendered in the page flow — the whole header scrolls away with the content and comes back at the top.",
  },
  {
    name: "fixed",
    text: "The whole header (all rows) pins to the top of the viewport; content scrolls beneath it.",
  },
  {
    name: "sticky",
    text: "Pins the whole header exactly like fixed — the two values currently render identically and are kept as separate names for future divergence.",
  },
  {
    name: "reveal-all",
    text: "Nav row stays pinned while the context and search rows scroll away; scrolling up brings all rows back as a fixed overlay.",
  },
  {
    name: "reveal-nav",
    text: "Same pinned nav row; on scroll up, only the nav row returns in the overlay (it floats over the page with a shadow).",
  },
  {
    name: "reveal-context",
    text: "On scroll up, only the context (title/subtitle) row returns.",
  },
  {
    name: "reveal-search",
    text: "On scroll up, only the search row returns — discovery stays one gesture away.",
  },
  {
    name: "reveal-nav-context",
    text: "On scroll up, the nav and context rows return together.",
  },
  {
    name: "reveal-nav-search",
    text: "On scroll up, the nav and search rows return together.",
  },
  {
    name: "reveal-context-search",
    text: "On scroll up, the context and search rows return together.",
  },
];

export default async function HeaderPage() {
  const [fixedHtml, revealHtml] = await Promise.all([
    highlight(fixedCode),
    highlight(revealCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="Header"
        description="One component, four composable rows, ten scroll behaviors. Rows only render when you pass their props, so the same Header scales from a single slim bar to a full nav + title + search stack with a mobile menu."
      />

      <DocSection title="The four rows">
        <DocProse>
          Each row appears only when its props are provided, top to bottom:
          the <strong className="text-foreground">nav row</strong> (
          <InlineCode>logo</InlineCode> on the left,{" "}
          <InlineCode>nav</InlineCode> links beside it — hidden below{" "}
          <InlineCode>md</InlineCode> — and <InlineCode>actions</InlineCode> on
          the right), the{" "}
          <strong className="text-foreground">context row</strong> (
          <InlineCode>title</InlineCode> and <InlineCode>subtitle</InlineCode>
          ), the <strong className="text-foreground">search row</strong> (
          <InlineCode>searchContent</InlineCode> — an input, filters, or a
          ScrollNav), and the{" "}
          <strong className="text-foreground">mobile menu panel</strong> (
          <InlineCode>mobileMenu</InlineCode>), an accordion that the
          hamburger button toggles on small screens.
        </DocProse>
        <ComponentPreview
          name="Fixed header"
          code={fixedCode}
          previewUrl="/examples/preview/fixed-header/"
        />
        <CodePanel html={fixedHtml} code={fixedCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Behaviors">
        <DocProse>
          The <InlineCode>behavior</InlineCode> prop picks one of ten scroll
          strategies. In every <InlineCode>reveal-*</InlineCode> behavior the
          slim nav row stays sticky at the top while the heavier context and
          search rows scroll away with the page; the moment you scroll up, the
          behavior&rsquo;s named rows glide back as a fixed overlay (and{" "}
          <InlineCode>onVisibilityChange</InlineCode> fires as the overlay
          shows and hides).
        </DocProse>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left">
                <th className="px-4 py-2.5 font-semibold">Behavior</th>
                <th className="px-4 py-2.5 font-semibold">What happens</th>
              </tr>
            </thead>
            <tbody>
              {behaviors.map((b) => (
                <tr key={b.name} className="border-b last:border-0 align-top">
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
                    {b.name}
                  </td>
                  <td className="min-w-56 px-4 py-2.5 leading-relaxed text-muted-foreground">
                    {b.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ComponentPreview
          name="Reveal all rows"
          code={revealCode}
          previewUrl="/examples/preview/reveal-all/"
        />
        <CodePanel html={revealHtml} code={revealCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Themes and speed">
        <DocProse>
          <InlineCode>theme</InlineCode> styles all rows at once:{" "}
          <InlineCode>&quot;light&quot;</InlineCode> (your
          background/foreground tokens, the default),{" "}
          <InlineCode>&quot;primary&quot;</InlineCode> (your primary tokens),{" "}
          <InlineCode>&quot;dark&quot;</InlineCode> (a fixed near-black zinc
          palette), and <InlineCode>&quot;none&quot;</InlineCode> (zero
          styles — bring your own). Custom row content can adapt via{" "}
          <InlineCode>useHeaderTheme()</InlineCode>; see{" "}
          <Link href="/docs/theming" className="text-brand hover:underline">
            Theming
          </Link>
          . <InlineCode>speed</InlineCode> sets the duration preset for the
          reveal overlay and mobile menu animations:{" "}
          <InlineCode>&quot;slow&quot;</InlineCode> (0.6s),{" "}
          <InlineCode>&quot;normal&quot;</InlineCode> (0.3s),{" "}
          <InlineCode>&quot;fast&quot;</InlineCode> (0.15s).
        </DocProse>
      </DocSection>

      <DocSection title="Mobile menu">
        <DocProse>
          Desktop <InlineCode>nav</InlineCode> links hide below the{" "}
          <InlineCode>md</InlineCode> breakpoint, and{" "}
          <InlineCode>mobileMenu</InlineCode> is the small-screen counterpart:
          providing it renders a hamburger button next to the logo (below{" "}
          <InlineCode>md</InlineCode> only), which toggles an animated
          accordion panel under the header rows containing whatever you pass —
          typically a vertical link list. Without{" "}
          <InlineCode>mobileMenu</InlineCode>, no hamburger renders.
        </DocProse>
        <DocNote>
          The panel opens and closes only through the hamburger button — it
          does not auto-close when a link inside is tapped, so on
          client-side-routed apps close it yourself (or let the navigation
          unmount the header).
        </DocNote>
      </DocSection>

      <DocSection title="The --header-height variable">
        <DocProse>
          Header measures itself with a ResizeObserver and writes{" "}
          <InlineCode>--header-height</InlineCode> (in pixels) to the root
          element, keeping it in sync as rows appear or wrap. Anything that
          should dock below the header — sticky tab strips, in-page anchors, a
          docked Sidebar — can use{" "}
          <InlineCode>top: var(--header-height)</InlineCode>. See the{" "}
          <Link
            href="/examples/sticky-tabs"
            className="text-brand hover:underline"
          >
            sticky sub-navigation example
          </Link>
          . Never author the variable statically in CSS — the Header
          overwrites it on mount.
        </DocProse>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={headerApi} />
      </DocSection>
    </article>
  );
}
