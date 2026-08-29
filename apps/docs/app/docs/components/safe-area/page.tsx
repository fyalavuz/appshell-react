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

      <DocSection title="The platform standard, nothing invented">
        <DocProse>
          Safe-area geometry is the operating system&rsquo;s to report, and
          both platforms report it the same way: once your page opts into
          edge-to-edge rendering with{" "}
          <InlineCode>viewport-fit=cover</InlineCode>, iOS Safari/WebKit and
          Android Chrome/WebView expose the notch, Dynamic Island, display
          cutout and gesture-bar geometry through the CSS{" "}
          <InlineCode>env(safe-area-inset-*)</InlineCode> variables. That
          standard is the library&rsquo;s single source of truth — every
          padded edge resolves straight to{" "}
          <InlineCode>env(safe-area-inset-top)</InlineCode> and friends, and
          the library never invents inset values of its own.
        </DocProse>
        <DocNote>
          Required setup:{" "}
          <InlineCode>
            &lt;meta name=&quot;viewport&quot;
            content=&quot;width=device-width, initial-scale=1,
            viewport-fit=cover&quot; /&gt;
          </InlineCode>
          . Without <InlineCode>viewport-fit=cover</InlineCode> the browser
          letterboxes the page and every inset is 0. On Android 15+ the system
          renders apps edge-to-edge by default, so handling these insets is no
          longer optional there.
        </DocNote>
        <DocProse>
          One escape hatch exists for environments where real insets are
          zero — a desktop browser, an iframe, a test runner: defining{" "}
          <InlineCode>--appshell-safe-area-inset-top</InlineCode> (and{" "}
          <InlineCode>-bottom</InlineCode>/<InlineCode>-left</InlineCode>/
          <InlineCode>-right</InlineCode>) overrides the corresponding{" "}
          <InlineCode>env()</InlineCode> value. The device frames on this site
          inject <InlineCode>59px</InlineCode>/<InlineCode>34px</InlineCode>{" "}
          that way to simulate an iPhone; your Storybook stories and tests can
          do the same. It is a simulation hook, not a parallel system.
        </DocProse>
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
          SafeArea renders its padding as inline styles on the wrapper — it
          works under server rendering with no hydration flash. There is no{" "}
          <InlineCode>style</InlineCode> prop; use{" "}
          <InlineCode>className</InlineCode> for everything else.
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
