import Link from "next/link";
import {
  DocHeader,
  DocSection,
  DocProse,
  DocNote,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Routing",
  description:
    "Plug your router's Link into every href-rendering component with one provider — Next.js, React Router, TanStack Router.",
};

const nextCode = `import Link from "next/link";
import { LinkProvider, AppShell, Sidebar, NavGroup, NavItem } from "appshell-react";

export default function RootLayout({ children }) {
  return (
    <LinkProvider component={Link}>
      <AppShell safeArea>
        <Sidebar variant="docked">
          <NavGroup title="Browse" defaultOpen>
            {/* Renders a Next.js <Link> — client-side navigation, prefetching */}
            <NavItem href="/today" label="Today" active />
            <NavItem href="/library" label="Library" />
          </NavGroup>
        </Sidebar>
        {children}
      </AppShell>
    </LinkProvider>
  );
}`;

const adapterCode = `// React Router / TanStack Router take "to" instead of "href" —
// adapt with one line and pass the adapter to the provider.
import { Link } from "react-router";

const RouterLink = ({ href, ...rest }) => <Link to={href} {...rest} />;

<LinkProvider component={RouterLink}>
  <App />
</LinkProvider>`;

export default async function RoutingPage() {
  const [nextHtml, adapterHtml] = await Promise.all([
    highlight(nextCode),
    highlight(adapterCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Advanced"
        title="Routing"
        description="The library never hard-codes a router. Components that render an href — NavItem, HeaderNavItem, UserMenuItem — ask one provider which link component to use, and fall back to a plain <a>."
      />

      <DocSection title="The problem it solves">
        <DocProse>
          Without a router integration, <InlineCode>href</InlineCode> items
          render a plain <InlineCode>&lt;a&gt;</InlineCode> — every click is a
          full page reload, losing client-side transitions, prefetching, and
          state. <InlineCode>LinkProvider</InlineCode> fixes that once, at the
          root: wrap your app, pass your router&rsquo;s link component, and
          every href-rendering component in the tree — sidebar items, header
          nav links, user-menu rows — navigates through your router. All
          styling, active states, tooltips, and rail behavior carry over
          unchanged.
        </DocProse>
        <CodePanel html={nextHtml} code={nextCode} filename="app/layout.tsx" />
      </DocSection>

      <DocSection title="Other routers">
        <DocProse>
          The provider accepts any component that takes{" "}
          <InlineCode>
            {"{ href, className, children, onClick }"}
          </InlineCode>
          . Next.js <InlineCode>Link</InlineCode> matches directly; routers
          whose link takes <InlineCode>to</InlineCode> plug in through a
          one-line adapter:
        </DocProse>
        <CodePanel html={adapterHtml} code={adapterCode} filename="router.tsx" />
        <DocNote>
          Without a provider nothing changes — the default is a plain{" "}
          <InlineCode>&lt;a&gt;</InlineCode>, so static sites and MPA setups
          keep working with zero configuration. Custom components can read the
          active link component themselves via{" "}
          <InlineCode>useLinkComponent()</InlineCode>.
        </DocNote>
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          The components that consume it:{" "}
          <Link
            href="/docs/components/sidebar"
            className="text-brand hover:underline"
          >
            Sidebar
          </Link>
          &rsquo;s NavItem,{" "}
          <Link
            href="/docs/components/header-nav"
            className="text-brand hover:underline"
          >
            HeaderNav
          </Link>
          , and{" "}
          <Link
            href="/docs/components/user-menu"
            className="text-brand hover:underline"
          >
            UserMenu
          </Link>
          &rsquo;s items.
        </DocProse>
      </DocSection>
    </article>
  );
}
