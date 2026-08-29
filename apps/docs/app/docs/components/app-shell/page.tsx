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
import { appShellApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "AppShell",
  description:
    "The root wrapper: shell context, safe-area orchestration, and automatic placement of Header and docked Sidebar children.",
};

const shellCode = `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={<span className="font-bold">Feedflow</span>}
        title="Timeline"
      />
      <Content className="p-4 pb-24">{/* page content */}</Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" badge={3} />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`;

export default async function AppShellPage() {
  const shellHtml = await highlight(shellCode);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="AppShell"
        description="The root wrapper every shell starts with. It provides the shared context the other components coordinate through, orchestrates safe-area padding, and places Header and docked Sidebar children into the layout for you."
      />

      <DocSection title="What it does">
        <DocProse>
          AppShell renders a full-height (<InlineCode>min-h-dvh</InlineCode>)
          flex column and wraps it in the shell context — the store behind{" "}
          <InlineCode>useAppShell()</InlineCode> that tracks{" "}
          <InlineCode>headerVisible</InlineCode>,{" "}
          <InlineCode>footerVisible</InlineCode>, and the current scroll
          direction. On top of that it does two structural jobs: applying
          safe-area padding in the right place for the header behavior in use,
          and building the column (or two-column) layout from your children.
        </DocProse>
        <ComponentPreview
          name="AppShell"
          code={shellCode}
          previewUrl="/examples/preview/tab-bar/"
        />
        <CodePanel html={shellHtml} code={shellCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Child placement">
        <DocProse>
          AppShell inspects its <em>direct</em> children by component type. A
          direct <InlineCode>&lt;Header&gt;</InlineCode> child is lifted to
          the top of the shell, and any direct{" "}
          <InlineCode>&lt;Sidebar variant=&quot;docked&quot;&gt;</InlineCode>{" "}
          children are pulled into a horizontal row beside a content column —
          that is how the two-column docked layout appears without any wrapper
          markup from you. Everything else flows into the content column in
          the order you wrote it.
        </DocProse>
        <DocProse>
          A docked sidebar in that row sticks below the header when the header
          is pinned (<InlineCode>fixed</InlineCode> or{" "}
          <InlineCode>sticky</InlineCode>, via the{" "}
          <InlineCode>--header-height</InlineCode> variable); when the header
          scrolls away (<InlineCode>static</InlineCode> or any{" "}
          <InlineCode>reveal-*</InlineCode> behavior) or there is no header,
          it sticks to the top of the viewport instead.
        </DocProse>
        <DocNote>
          Detection matches the component type (or a{" "}
          <InlineCode>displayName</InlineCode> of{" "}
          <InlineCode>&quot;Header&quot;</InlineCode>/
          <InlineCode>&quot;Sidebar&quot;</InlineCode>), so it only works for{" "}
          <em>direct</em> children. If you wrap Header in your own component,
          AppShell treats it as ordinary content — it still renders, but it
          loses the automatic placement and the safe-area coordination
          described below. Overlay Sidebars (the default variant) are not
          hoisted; they position themselves.
        </DocNote>
      </DocSection>

      <DocSection title="Safe areas">
        <DocProse>
          With <InlineCode>safeArea</InlineCode> enabled, what happens depends
          on the header behavior. A{" "}
          <InlineCode>behavior=&quot;static&quot;</InlineCode> header must
          scroll away with the page, so the whole shell — header included —
          sits inside a top-and-bottom padded container. For{" "}
          <InlineCode>fixed</InlineCode>, <InlineCode>sticky</InlineCode>, and
          the <InlineCode>reveal-*</InlineCode> behaviors, the header manages
          its own top inset instead: AppShell passes it{" "}
          <InlineCode>forceSafeAreaTop</InlineCode> so the pinned bar extends
          behind the notch, and only the content column gets bottom padding.
          Without <InlineCode>safeArea</InlineCode> (and with no docked
          sidebar), AppShell is just the flex column and renders children
          untouched.
        </DocProse>
        <DocNote>
          Inset values come from the platform standard{" "}
          <InlineCode>env(safe-area-inset-*)</InlineCode> (requires{" "}
          <InlineCode>viewport-fit=cover</InlineCode> in your viewport meta
          tag) — AppShell never invents them. Mockups and tests can simulate
          insets by defining{" "}
          <InlineCode>--appshell-safe-area-inset-*</InlineCode> overrides.
          Details in{" "}
          <Link href="/docs/theming" className="text-brand hover:underline">
            Theming
          </Link>
          .
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={appShellApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          The pieces AppShell places:{" "}
          <Link
            href="/docs/components/header"
            className="text-brand hover:underline"
          >
            Header
          </Link>{" "}
          for the four rows and scroll behaviors,{" "}
          <Link
            href="/docs/components/sidebar"
            className="text-brand hover:underline"
          >
            Sidebar
          </Link>{" "}
          for the docked two-column layout, and{" "}
          <Link
            href="/docs/components/safe-area"
            className="text-brand hover:underline"
          >
            SafeArea
          </Link>{" "}
          for padding arbitrary regions yourself.
        </DocProse>
      </DocSection>
    </article>
  );
}
