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
import { safeAreaApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "SafeArea",
  description:
    "Pad any region by the device safe-area insets — notch, Dynamic Island, home indicator, landscape ears.",
};

const fullBleedCode = `import { AppShell, Content, Header, SafeArea } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span className="font-bold">Atlas</span>} />
      <Content className="pb-16">
        {/* Full-bleed map: pad only the sides so landscape
            notches never cover the controls */}
        <SafeArea edges={["left", "right"]} className="h-72 bg-muted">
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Map canvas
          </div>
        </SafeArea>
      </Content>
    </AppShell>
  );
}`;

export default async function SafeAreaPage() {
  const fullBleedHtml = await highlight(fullBleedCode);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="SafeArea"
        description="A wrapper that pads its children by the device safe-area insets, edge by edge — so notches, the Dynamic Island, the home indicator, and landscape ears never cover your UI."
      />

      <DocSection title="What safe areas are">
        <DocProse>
          Modern phones draw the web page under their hardware: the status bar
          and notch or Dynamic Island at the top, the home-indicator gesture
          bar at the bottom, and — in landscape — the camera housing eating
          into the left or right edge (the &ldquo;ears&rdquo;). The safe area
          is the rectangle guaranteed free of all of that. Anything
          interactive or legible that sits at a screen edge needs to be
          padded into it.
        </DocProse>
      </DocSection>

      <DocSection title="How insets resolve">
        <DocProse>
          Every inset in the library resolves as{" "}
          <InlineCode>var(--sa-top, env(safe-area-inset-top, 0px))</InlineCode>{" "}
          (and likewise for <InlineCode>bottom</InlineCode>,{" "}
          <InlineCode>left</InlineCode>, <InlineCode>right</InlineCode>): a{" "}
          <InlineCode>--sa-*</InlineCode> CSS variable is read first, falling
          back to the platform&rsquo;s{" "}
          <InlineCode>env(safe-area-inset-*)</InlineCode> value, falling back
          to zero. The library never sets those variables itself — on a real
          device the <InlineCode>env()</InlineCode> values do the work, while
          the phone mockup on this site injects{" "}
          <InlineCode>--sa-top: 59px</InlineCode> and{" "}
          <InlineCode>--sa-bottom: 34px</InlineCode> to simulate an iPhone.
          Your tests and Storybook stories can do the same.
        </DocProse>
        <DocNote>
          For <InlineCode>env()</InlineCode> to report anything on a real
          device, your page must opt in with{" "}
          <InlineCode>
            &lt;meta name=&quot;viewport&quot;
            content=&quot;viewport-fit=cover, width=device-width,
            initial-scale=1&quot; /&gt;
          </InlineCode>
          . Without <InlineCode>viewport-fit=cover</InlineCode> the browser
          letterboxes the page and every inset is 0.
        </DocNote>
      </DocSection>

      <DocSection title="Shell-wide vs. per-region">
        <DocProse>
          Most apps only need{" "}
          <InlineCode>&lt;AppShell safeArea&gt;</InlineCode> — the shell pads
          its content column and hands pinned headers their own top inset, so
          the whole layout stays inside the safe region. Wrap a region in{" "}
          <InlineCode>{"<SafeArea edges={…}>"}</InlineCode> when one
          specific piece of UI needs its own insets: a full-bleed map or
          carousel that should respect only the sides, a custom bottom sheet
          that must clear the home indicator, an overlay that positions
          itself against raw screen edges.
        </DocProse>
        <ComponentPreview
          name="SafeArea"
          code={fullBleedCode}
          previewUrl="/examples/preview/safe-area/"
        />
        <CodePanel html={fullBleedHtml} code={fullBleedCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Props">
        <PropsTable api={safeAreaApi} />
        <DocNote>
          SafeArea writes its padding into the element&rsquo;s{" "}
          <InlineCode>style</InlineCode> attribute imperatively and owns that
          attribute — there is no <InlineCode>style</InlineCode> prop, and any
          inline styles applied to the element by other means get overwritten.
          Use <InlineCode>className</InlineCode> for everything else.
        </DocNote>
      </DocSection>

      <DocSection title="Reading insets in JavaScript">
        <DocProse>
          When you need the numbers rather than CSS padding — canvas drawing,
          absolutely positioned overlays, gesture math — the{" "}
          <InlineCode>useSafeArea()</InlineCode> hook returns the current
          insets in pixels, resolved from the same variables. See{" "}
          <Link href="/docs/hooks" className="text-brand hover:underline">
            Hooks
          </Link>
          .
        </DocProse>
      </DocSection>
    </article>
  );
}
