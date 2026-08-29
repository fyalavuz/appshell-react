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
import { scrollNavApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "ScrollNav",
  description:
    "A horizontally scrollable row of filter pills — built for the Header's search row, usable anywhere.",
};

const filterCode = `import { AppShell, Content, Header, ScrollNav, ScrollNavItem } from "appshell-react";
import { useState } from "react";

const filters = ["All", "Landscape", "Portrait", "Street", "Film", "Aerial"];

export default function App() {
  const [filter, setFilter] = useState("All");

  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={<span className="font-bold">Lens</span>}
        searchContent={
          <ScrollNav className="px-4 pb-3">
            {filters.map((f) => (
              <ScrollNavItem
                key={f}
                label={f}
                active={filter === f}
                onClick={() => setFilter(f)}
              />
            ))}
          </ScrollNav>
        }
      />
      <Content className="pb-16">
        <div className="p-4">{/* grid filtered by \`filter\` */}</div>
      </Content>
    </AppShell>
  );
}`;

export default async function ScrollNavPage() {
  const filterHtml = await highlight(filterCode);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="ScrollNav"
        description="The category-pill row from every mobile storefront and photo feed: a single horizontal line of pills that scrolls sideways with no visible scrollbar, while the selected pill stays highlighted."
      />

      <DocSection title="Filter pills that scroll">
        <DocProse>
          <InlineCode>ScrollNav</InlineCode> is a flex row with{" "}
          <InlineCode>overflow-x-auto</InlineCode> that never wraps — extra
          pills simply scroll off the edge, which is exactly what a thumb
          expects on a phone. Each <InlineCode>ScrollNavItem</InlineCode> is a
          real button with hover, focus-ring, and active styling; the active
          pill inverts to the foreground color.
        </DocProse>
        <ComponentPreview
          name="ScrollNav"
          code={filterCode}
          previewUrl="/examples/preview/scroll-nav/"
        />
        <CodePanel html={filterHtml} code={filterCode} filename="app.tsx" />
        <DocNote>
          The scrollbar is hidden with the{" "}
          <InlineCode>scrollbar-hide</InlineCode> utility, which is{" "}
          <em>not</em> a Tailwind built-in — it comes from the{" "}
          <InlineCode>@utility scrollbar-hide</InlineCode> block in the{" "}
          <Link href="/docs/installation" className="text-brand hover:underline">
            Installation
          </Link>{" "}
          stylesheet. Skip that block and the pill row grows a scrollbar.
        </DocNote>
      </DocSection>

      <DocSection title="In the Header — or anywhere">
        <DocProse>
          The natural home is the Header&rsquo;s{" "}
          <InlineCode>searchContent</InlineCode> slot, where the pills become
          the header&rsquo;s search row and take part in reveal behaviors
          like <InlineCode>reveal-search</InlineCode> — filters slide away on
          scroll down and return on scroll up. But nothing ties it to the
          Header: drop a <InlineCode>ScrollNav</InlineCode> at the top of a
          list, inside a section, or in a bottom sheet just as well.
        </DocProse>
      </DocSection>

      <DocSection title="Controlled selection">
        <DocProse>
          ScrollNav keeps no selection state of its own. You hold the current
          value (here in <InlineCode>useState</InlineCode>), mark the matching
          pill with <InlineCode>active</InlineCode>, and update the value in
          each pill&rsquo;s <InlineCode>onClick</InlineCode> — the same
          controlled pattern as{" "}
          <Link
            href="/docs/components/footer"
            className="text-brand hover:underline"
          >
            FooterItem
          </Link>{" "}
          tabs, so single-select, multi-select, or URL-driven filters are all
          just state you own.
        </DocProse>
      </DocSection>

      <DocSection title="ScrollNavItem props">
        <PropsTable api={scrollNavApi} />
        <DocProse>
          <InlineCode>ScrollNav</InlineCode> itself takes only{" "}
          <InlineCode>className</InlineCode> and{" "}
          <InlineCode>children</InlineCode> — use the className for edge
          padding so the first pill aligns with your content while the row
          still scrolls edge to edge.
        </DocProse>
      </DocSection>
    </article>
  );
}
