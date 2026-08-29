import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  DocHeader,
  DocSection,
  DocProse,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Introduction",
  description:
    "What appshell-react is, what it solves, and how the pieces fit together.",
};

const quickStart = `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-all"
        logo={<span className="font-bold">MyApp</span>}
        title="Home"
      />
      <Content className="pb-24">{/* your content */}</Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`;

const pieces = [
  {
    title: "AppShell",
    href: "/docs/components/app-shell",
    text: "Root wrapper: shell context, safe areas, and automatic placement of Header and docked Sidebar children.",
  },
  {
    title: "Header",
    href: "/docs/components/header",
    text: "Four composable rows with 10 scroll behaviors, from pinned to per-row reveal.",
  },
  {
    title: "Footer",
    href: "/docs/components/footer",
    text: "Tab bar, floating slot, or mini bar — with scroll-aware auto-hide.",
  },
  {
    title: "Sidebar",
    href: "/docs/components/sidebar",
    text: "Modal drawer on phones; persistent, collapsible docked panel on desktop.",
  },
  {
    title: "SafeArea",
    href: "/docs/components/safe-area",
    text: "Notch and home-indicator padding for arbitrary regions.",
  },
  {
    title: "Hooks",
    href: "/docs/hooks",
    text: "useAppShell, useScrollDirection, useSafeArea, useHeaderTheme.",
  },
];

export default async function DocsPage() {
  const highlighted = await highlight(quickStart);

  return (
    <article>
      <DocHeader
        eyebrow="Getting started"
        title="Introduction"
        description="appshell-react is a composable layout system for mobile-first React apps: scroll-aware headers, tab bars, drawers, docked sidebars, and safe areas — without writing a single scroll listener."
      />

      <DocSection title="The idea">
        <DocProse>
          Every mobile web app rewrites the same tricky 10% of UI: a header
          that hides politely on scroll, a tab bar that returns exactly when
          the thumb needs it, insets around notches, and a sidebar that is a
          drawer on phones but a persistent panel on desktop. appshell-react
          ships those as small composable components that coordinate through
          shared context and CSS variables like{" "}
          <InlineCode>--header-height</InlineCode>.
        </DocProse>
        <DocProse>
          Animations run on plain CSS transitions by default — the core has
          zero runtime dependencies. Wrap your app in{" "}
          <InlineCode>MotionProvider</InlineCode> with the optional Framer
          Motion adapter when you want springs. See{" "}
          <Link href="/docs/motion" className="text-brand hover:underline">
            Motion
          </Link>
          .
        </DocProse>
      </DocSection>

      <DocSection title="Quick start">
        <CodePanel html={highlighted} code={quickStart} filename="app.tsx" />
        <DocProse>
          That is a complete native-feeling shell: the header reveals on
          scroll up, the tab bar auto-hides, and safe areas are handled. Head
          to{" "}
          <Link
            href="/docs/installation"
            className="text-brand hover:underline"
          >
            Installation
          </Link>{" "}
          for the Tailwind v4 setup.
        </DocProse>
      </DocSection>

      <DocSection title="The pieces">
        <div className="grid gap-3 sm:grid-cols-2">
          {pieces.map((piece) => (
            <Link
              key={piece.href}
              href={piece.href}
              className="group rounded-xl border bg-card p-4 transition-colors hover:border-brand/40"
            >
              <span className="flex items-center gap-1.5 font-semibold">
                {piece.title}
                <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {piece.text}
              </span>
            </Link>
          ))}
        </div>
      </DocSection>

      <DocSection title="See it live">
        <DocProse>
          The{" "}
          <Link href="/examples" className="text-brand hover:underline">
            examples gallery
          </Link>{" "}
          covers every variant as a small believable app, and the{" "}
          <Link href="/playground" className="text-brand hover:underline">
            playground
          </Link>{" "}
          lets you mix every behavior, theme, speed, and footer variant on one
          phone — then copy the code.
        </DocProse>
      </DocSection>
    </article>
  );
}
