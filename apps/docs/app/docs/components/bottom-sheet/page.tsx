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
import { bottomSheetApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "BottomSheet",
  description:
    "A draggable bottom sheet with snap points — modal, or non-modal over a map.",
};

const mapCode = `import { AppShell, BottomSheet } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <AppShell safeArea>
      <MapCanvas />

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        modal={false}                // the map behind stays interactive
        snapPoints={[0.4, 0.85]}     // rest at 40%, drag up to 85%
        onSnapChange={(i) => console.log("snapped to", i)}
        aria-label="Nearby places"
      >
        <PlacesList />               {/* scrolls internally */}
      </BottomSheet>
    </AppShell>
  );
}`;

const modalCode = `// Modal by default: backdrop, scroll lock, Escape, focus trap.
<BottomSheet open={open} onClose={close} snapPoints={[0.5]}>
  <ShareOptions />
</BottomSheet>`;

export default async function BottomSheetPage() {
  const [mapHtml, modalHtml] = await Promise.all([
    highlight(mapCode),
    highlight(modalCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="BottomSheet"
        description="The mobile pattern for content layered over a map, a player, or a feed: a sheet that rests at snap points, drags between them, and dismisses when flung down. Pure CSS transforms — no motion adapter needed, 60fps drags."
      />

      <DocSection title="Over a map (non-modal)">
        <DocProse>
          Pass <InlineCode>modal={"{false}"}</InlineCode> and the page behind
          stays fully interactive — no backdrop, no scroll lock. Snap points
          are viewport fractions: the sheet opens at{" "}
          <InlineCode>defaultSnap</InlineCode>, dragging the grabber moves it
          between points, and dragging well below the lowest one calls{" "}
          <InlineCode>onClose</InlineCode>.
        </DocProse>
        <ComponentPreview
          name="BottomSheet"
          code={mapCode}
          previewUrl="/examples/preview/bottom-sheet/"
        />
        <CodePanel html={mapHtml} code={mapCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="As a modal">
        <DocProse>
          Left modal (the default), the sheet behaves like a dialog: a dimmed
          backdrop that closes on tap, body scroll locking, Escape to close,
          and a focus trap that hands focus back where it came from.
        </DocProse>
        <CodePanel html={modalHtml} code={modalCode} filename="share.tsx" />
        <DocNote>
          The sheet is portaled and renders nothing during SSR. Its content
          area pads itself past the home indicator with the platform&rsquo;s{" "}
          <InlineCode>env(safe-area-inset-bottom)</InlineCode>, and the panel
          centers at <InlineCode>max-w-lg</InlineCode> on larger screens so a
          phone-wide sheet never stretches across a desktop.
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable api={bottomSheetApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          For full-screen modal surfaces, see{" "}
          <Link
            href="/docs/components/search-modal"
            className="text-brand hover:underline"
          >
            SearchModal
          </Link>
          ; for a persistent bottom bar, the{" "}
          <Link
            href="/docs/components/footer"
            className="text-brand hover:underline"
          >
            Footer
          </Link>{" "}
          variants.
        </DocProse>
      </DocSection>
    </article>
  );
}
