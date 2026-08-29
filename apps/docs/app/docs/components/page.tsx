import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  DocHeader,
  DocSection,
  DocProse,
} from "@/components/docs/doc-page";

export const metadata = {
  title: "Components",
  description:
    "Every public component in appshell-react, grouped by what it does in the layout.",
};

interface ComponentCard {
  title: string;
  href: string;
  text: string;
}

const structure: ComponentCard[] = [
  {
    title: "AppShell",
    href: "/docs/components/app-shell",
    text: "Root wrapper: shell context, safe-area orchestration, and automatic placement of Header and docked Sidebar children.",
  },
  {
    title: "Content",
    href: "/docs/components/content",
    text: "The main region — a semantic <main> that fills the remaining shell space.",
  },
  {
    title: "SafeArea",
    href: "/docs/components/safe-area",
    text: "Pads any region by the device safe-area insets (notch, home indicator), edge by edge.",
  },
];

const navigation: ComponentCard[] = [
  {
    title: "Header",
    href: "/docs/components/header",
    text: "Up to four rows — nav, title/subtitle, search, mobile menu — with 10 scroll behaviors and 4 themes.",
  },
  {
    title: "HeaderNav & HeaderNavItem",
    href: "/docs/components/header-nav",
    text: "Desktop link row for the Header's nav slot; items with children become hover/click dropdowns.",
  },
  {
    title: "Footer & FooterItem",
    href: "/docs/components/footer",
    text: "Bottom bar as a tab bar, floating slot, or mini bar — with scroll-aware auto-hide.",
  },
  {
    title: "Sidebar",
    href: "/docs/components/sidebar",
    text: "Two variants: a modal overlay drawer (default), and a docked panel that collapses to an icon rail on desktop.",
  },
  {
    title: "NavGroup & NavItem",
    href: "/docs/components/sidebar",
    text: "Collapsible sections and navigation rows for Sidebar content — documented on the Sidebar page.",
  },
  {
    title: "ScrollNav & ScrollNavItem",
    href: "/docs/components/scroll-nav",
    text: "Horizontally scrollable pill filters, typically dropped into the Header's search row.",
  },
];

const searchAndIdentity: ComponentCard[] = [
  {
    title: "SearchField",
    href: "/docs/components/search-field",
    text: "The search input, solved once: a rounded pill or an edge-to-edge bar, theme-aware inside any Header.",
  },
  {
    title: "SearchModal",
    href: "/docs/components/search-modal",
    text: "A full search overlay — sheet on phones, command palette on desktop — triggered from any SearchField, with optional query hand-off.",
  },
  {
    title: "UserMenu & Avatar",
    href: "/docs/components/user-menu",
    text: "The signed-in user's corner: an avatar trigger opening an account dropdown, with a standalone Avatar underneath.",
  },
];

function CardGrid({ cards }: { cards: ComponentCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="group rounded-xl border bg-card p-4 transition-colors hover:border-brand/40"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            {card.title}
            <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
            {card.text}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="Components"
        description="Small pieces that compose into a native-feeling shell. Structure components frame the page; navigation components move people through it."
      />

      <DocSection title="Structure">
        <DocProse>
          The frame of every page: the shell itself, the content column, and
          the insets around device hardware.
        </DocProse>
        <CardGrid cards={structure} />
      </DocSection>

      <DocSection title="Navigation">
        <DocProse>
          Everything scroll-aware: headers, link rows, tab bars, drawers, and
          pill filters. They coordinate through the shell context, so reveal
          and auto-hide behaviors stay in sync.
        </DocProse>
        <CardGrid cards={navigation} />
      </DocSection>

      <DocSection title="Search & identity">
        <DocProse>
          The two things almost every app puts in its chrome: a way to search
          and the signed-in user. All three components work standalone —
          outside a Header, outside the shell — and every layer can be
          customized or replaced.
        </DocProse>
        <CardGrid cards={searchAndIdentity} />
      </DocSection>

      <DocSection title="Beyond components">
        <DocProse>
          The shell also exposes its internals:{" "}
          <Link href="/docs/hooks" className="text-brand hover:underline">
            Hooks
          </Link>{" "}
          covers useAppShell, useScrollDirection, useSafeArea, and
          useHeaderTheme for building your own scroll-aware UI, and{" "}
          <Link href="/docs/motion" className="text-brand hover:underline">
            Motion
          </Link>{" "}
          explains the optional Framer Motion adapter for spring animations.
        </DocProse>
      </DocSection>
    </article>
  );
}
