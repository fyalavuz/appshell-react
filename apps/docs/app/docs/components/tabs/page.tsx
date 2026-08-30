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
import { tabsApi, tabApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Tabs",
  description:
    "A tab row that docks itself below a pinned Header via --header-height.",
};

const tabsCode = `import { AppShell, Header, Content, Tabs, Tab } from "appshell-react";
import { useState } from "react";

export default function Profile() {
  const [tab, setTab] = useState("posts");

  return (
    <AppShell safeArea>
      <Header behavior="fixed" title="Nadia Reyes" subtitle="@nadia" />

      {/* Docks itself below the fixed header — no manual top offset */}
      <Tabs value={tab} onValueChange={setTab} aria-label="Profile sections">
        <Tab value="posts" label="Posts" />
        <Tab value="replies" label="Replies" badge={<Badge>3</Badge>} />
        <Tab value="media" label="Media" />
      </Tabs>

      <Content>
        {tab === "posts" && <Posts />}
        {tab === "replies" && <Replies />}
        {tab === "media" && <MediaGrid />}
      </Content>
    </AppShell>
  );
}`;

export default async function TabsPage() {
  const tabsHtml = await highlight(tabsCode);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="Tabs"
        description="Sticky sub-navigation, solved once: a tab row that docks below the Header through the --header-height variable the Header publishes, with real tablist semantics and arrow-key navigation."
      />

      <DocSection title="Docked below the header">
        <DocProse>
          Because the Header keeps <InlineCode>--header-height</InlineCode> up
          to date via a ResizeObserver, the row stays glued below it whatever
          rows the header shows — no hand-tuned offsets. Selection is
          controlled (<InlineCode>value</InlineCode>/
          <InlineCode>onValueChange</InlineCode>) or uncontrolled (
          <InlineCode>defaultValue</InlineCode>, falling back to the first
          tab); you render the matching panel from the current value.
        </DocProse>
        <ComponentPreview
          name="Tabs"
          code={tabsCode}
          previewUrl="/examples/preview/sticky-tabs/"
        />
        <CodePanel html={tabsHtml} code={tabsCode} filename="profile.tsx" />
      </DocSection>

      <DocSection title="Accessibility">
        <DocProse>
          The row is a real <InlineCode>role=&quot;tablist&quot;</InlineCode>:
          tabs carry <InlineCode>aria-selected</InlineCode>, only the active
          one is in the Tab order, and{" "}
          <InlineCode>ArrowLeft</InlineCode>/<InlineCode>ArrowRight</InlineCode>{" "}
          move and select with wrap-around at the ends.
        </DocProse>
        <DocNote>
          Pass <InlineCode>sticky={"{false}"}</InlineCode> for an inline,
          non-docking row — segmented filters inside content, for example.
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={tabsApi} />
        <PropsTable api={tabApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          For horizontally scrolling pill filters in the Header&rsquo;s search
          row, use{" "}
          <Link
            href="/docs/components/scroll-nav"
            className="text-brand hover:underline"
          >
            ScrollNav
          </Link>
          .
        </DocProse>
      </DocSection>
    </article>
  );
}
