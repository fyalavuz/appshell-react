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
import { searchFieldApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "SearchField",
  description:
    "A ready-made search input for the Header's search row — rounded pill or edge-to-edge full-width.",
};

const pillCode = `import { AppShell, Header, Content, SearchField } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-search"
        logo={<span className="font-bold">Market</span>}
        searchContent={
          <SearchField
            placeholder="Search 2,400 products"
            value={query}
            onChange={setQuery}
            onSubmit={(value) => console.log("search:", value)}
          />
        }
      />
      <Content>{/* filtered results */}</Content>
    </AppShell>
  );
}`;

const fullCode = `<Header
  behavior="fixed"
  logo={<span className="font-bold">Library</span>}
  searchContent={
    // Flat bar spanning the whole row, edge to edge
    <SearchField variant="full" placeholder="Search the catalog" />
  }
/>`;

export default async function SearchFieldPage() {
  const [pillHtml, fullHtml] = await Promise.all([
    highlight(pillCode),
    highlight(fullCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="SearchField"
        description="The search input, solved once: a rounded pill or an edge-to-edge bar for the Header's search row, theme-aware and controlled or uncontrolled."
      />

      <DocSection title="Pill (default)">
        <DocProse>
          The classic mobile search bar — a rounded, inset field with its own
          horizontal padding, ready to drop into{" "}
          <InlineCode>searchContent</InlineCode>.
        </DocProse>
        <ComponentPreview
          name="SearchField"
          code={pillCode}
          previewUrl="/examples/preview/reveal-search/"
        />
        <CodePanel html={pillHtml} code={pillCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Full-width">
        <DocProse>
          <InlineCode>variant=&quot;full&quot;</InlineCode> spans the entire
          row as a flat bar with hairline borders — no side margins, no
          rounding. Use it when search is the primary action of the screen.
        </DocProse>
        <CodePanel html={fullHtml} code={fullCode} filename="header.tsx" />
      </DocSection>

      <DocSection title="Theme awareness">
        <DocProse>
          Inside a <InlineCode>theme=&quot;primary&quot;</InlineCode> or{" "}
          <InlineCode>theme=&quot;dark&quot;</InlineCode> Header, the field
          switches to translucent light-on-dark surfaces automatically via{" "}
          <InlineCode>useHeaderTheme()</InlineCode> — no extra classes needed.
        </DocProse>
        <DocNote>
          Outside a Header the theme context falls back to{" "}
          <InlineCode>light</InlineCode>, so SearchField works anywhere a
          search box is needed — a sidebar, a page body, a dialog.
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={searchFieldApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          Wire its <InlineCode>onFocus</InlineCode> to open a{" "}
          <Link
            href="/docs/components/search-modal"
            className="text-brand hover:underline"
          >
            SearchModal
          </Link>{" "}
          for a full search surface. Pair it with{" "}
          <Link
            href="/docs/components/header"
            className="text-brand hover:underline"
          >
            Header
          </Link>
          &rsquo;s <InlineCode>reveal-search</InlineCode> behavior to bring
          search back on scroll up, or try both variants live in the{" "}
          <Link href="/playground" className="text-brand hover:underline">
            playground
          </Link>
          .
        </DocProse>
      </DocSection>
    </article>
  );
}
