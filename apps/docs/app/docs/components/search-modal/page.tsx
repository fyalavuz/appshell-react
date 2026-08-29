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
import { searchModalApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "SearchModal",
  description:
    "A full search experience in an overlay — sheet on phones, command palette on desktop — triggered from any SearchField.",
};

const triggerCode = `import { AppShell, Header, Content, SearchField, SearchModal } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-search"
        logo={<span className="font-bold">Docs</span>}
        searchContent={
          <SearchField
            placeholder="Search docs"
            value={query}
            onChange={setQuery}
            onClick={() => setOpen(true)}   // tapping search opens the modal
          />
        }
      />
      <Content>{/* … */}</Content>

      <SearchModal
        open={open}
        onClose={() => setOpen(false)}
        defaultQuery={query}               // optional: continue what was typed
        placeholder="Search everything"
        onSubmit={(value) => runSearch(value)}
      >
        {(q) => <Results query={q} />}     {/* results are fully yours */}
      </SearchModal>
    </AppShell>
  );
}`;

const standaloneCode = `// No Header, no AppShell — the modal is standalone.
<SearchModal open={open} onClose={close} placeholder="Search commands">
  <RecentSearches />
</SearchModal>`;

export default async function SearchModalPage() {
  const [triggerHtml, standaloneHtml] = await Promise.all([
    highlight(triggerCode),
    highlight(standaloneCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="SearchModal"
        description="Tapping search should open a real search surface. SearchModal is that surface: a full-screen sheet on phones, a centered command palette on desktop — with its own input, and a results area that's entirely yours."
      />

      <DocSection title="Triggered from a SearchField">
        <DocProse>
          The intended flow: a <InlineCode>SearchField</InlineCode> in the
          header acts as the trigger via its <InlineCode>onClick</InlineCode>{" "}
          passthrough, and — optionally — hands over whatever was already
          typed through <InlineCode>defaultQuery</InlineCode>, which re-seeds
          the modal&rsquo;s input on every open. Skip{" "}
          <InlineCode>defaultQuery</InlineCode> and the modal starts blank
          each time.
        </DocProse>
        <ComponentPreview
          name="SearchModal"
          code={triggerCode}
          previewUrl="/examples/preview/search-command/"
        />
        <CodePanel html={triggerHtml} code={triggerCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Results are yours">
        <DocProse>
          The modal owns the input, the backdrop, Escape/backdrop dismissal,
          scroll locking, and focus restore. Everything below the input row is{" "}
          <InlineCode>children</InlineCode>: pass a render function to build
          live results from the current query, or plain nodes for recents and
          suggestions. Nothing else is prescribed — list, grid, sections,
          empty states are your components.
        </DocProse>
        <CodePanel
          html={standaloneHtml}
          code={standaloneCode}
          filename="standalone.tsx"
        />
        <DocNote>
          SearchModal renders through a portal on the client and renders
          nothing during SSR — safe to keep mounted in server-rendered pages.
          It positions itself with the platform&rsquo;s{" "}
          <InlineCode>env(safe-area-inset-*)</InlineCode> values, so the sheet
          clears notches and home indicators on real devices.
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={searchModalApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          The trigger lives in{" "}
          <Link
            href="/docs/components/search-field"
            className="text-brand hover:underline"
          >
            SearchField
          </Link>
          ; see both wired together in the{" "}
          <Link href="/playground" className="text-brand hover:underline">
            playground
          </Link>
          .
        </DocProse>
      </DocSection>
    </article>
  );
}
