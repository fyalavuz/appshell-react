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
import { footerApi, footerItemApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Footer",
  description:
    "Bottom bar in three shapes — tab bar, floating slot, mini bar — with scroll-aware auto-hide.",
};

const tabBarCode = `import { AppShell, Content, Footer, FooterItem } from "appshell-react";
import { useState } from "react";
import { Bell, Home, Search, User } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <AppShell safeArea>
      {/* pb-24 keeps the last item clear of the fixed tab bar */}
      <Content className="pb-24">
        <div className="p-4">{/* active tab's screen */}</div>
      </Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem
          icon={<Home />}
          label="Home"
          active={tab === "home"}
          onClick={() => setTab("home")}
        />
        <FooterItem
          icon={<Search />}
          label="Search"
          active={tab === "search"}
          onClick={() => setTab("search")}
        />
        <FooterItem
          icon={<Bell />}
          label="Alerts"
          badge={12}
          active={tab === "alerts"}
          onClick={() => setTab("alerts")}
        />
        <FooterItem
          icon={<User />}
          label="Profile"
          active={tab === "profile"}
          onClick={() => setTab("profile")}
        />
      </Footer>
    </AppShell>
  );
}`;

const floatingCode = `import { AppShell, Content, Footer } from "appshell-react";
import { ShoppingBag } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Content className="pb-28">
        <div className="p-4">{/* product grid */}</div>
      </Content>
      <Footer variant="floating" position="center" behavior="auto-hide">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg"
        >
          <ShoppingBag className="size-4" />
          Add to cart
        </button>
      </Footer>
    </AppShell>
  );
}`;

const miniCode = `import { AppShell, Content, Footer } from "appshell-react";
import { Pause } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Content className="pb-20">
        <div className="p-4">{/* track list */}</div>
      </Content>
      <Footer variant="mini">
        <div className="flex flex-1 items-center justify-between">
          <span className="text-sm font-medium">Now playing — Midnight Sun</span>
          <button type="button" aria-label="Pause" className="text-primary">
            <Pause className="size-5" />
          </button>
        </div>
      </Footer>
    </AppShell>
  );
}`;

export default async function FooterPage() {
  const [tabBarHtml, floatingHtml, miniHtml] = await Promise.all([
    highlight(tabBarCode),
    highlight(floatingCode),
    highlight(miniCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="Footer"
        description="One component, three shapes: a tab bar for primary navigation, a floating slot for pills and FABs, and a slim mini bar for persistent status — all fixed to the bottom, safe-area aware, and optionally scroll-aware."
      />

      <DocSection title="Tab bar">
        <DocProse>
          The default variant is a fixed bottom bar that lays out{" "}
          <InlineCode>FooterItem</InlineCode> children as equal-width tabs.
          Active state is fully controlled — pass{" "}
          <InlineCode>active</InlineCode> and switch it in{" "}
          <InlineCode>onClick</InlineCode>. A <InlineCode>badge</InlineCode>{" "}
          number renders a count bubble on the icon; values over 99 render as
          &ldquo;99+&rdquo;. Three to five tabs is the sweet spot — beyond
          five, each tab gets too narrow for a comfortable tap target.
        </DocProse>
        <ComponentPreview
          name="Tab bar"
          code={tabBarCode}
          previewUrl="/examples/preview/tab-bar/"
        />
        <CodePanel html={tabBarHtml} code={tabBarCode} filename="app.tsx" />
        <DocNote>
          <InlineCode>badge</InlineCode> is a <InlineCode>number</InlineCode>,
          not a string — the bubble only renders for values greater than 0, so
          there is no &ldquo;dot&rdquo; or text-badge mode. Need one? Put your
          own element inside <InlineCode>icon</InlineCode>.
        </DocNote>
      </DocSection>

      <DocSection title="Floating">
        <DocProse>
          <InlineCode>variant=&quot;floating&quot;</InlineCode> renders no bar
          at all — it is a fixed, full-width slot along the bottom edge that
          positions whatever you put inside it. Your pill, FAB, or button
          group is the child; <InlineCode>position</InlineCode> docks it{" "}
          <InlineCode>left</InlineCode>, <InlineCode>center</InlineCode>, or{" "}
          <InlineCode>right</InlineCode>, and the slot pads itself above the
          bottom safe-area inset. The slot itself ignores pointer events, so
          the page stays tappable around your content.
        </DocProse>
        <ComponentPreview
          name="Floating footer"
          code={floatingCode}
          previewUrl="/examples/preview/floating-footer/"
        />
        <CodePanel html={floatingHtml} code={floatingCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Mini">
        <DocProse>
          <InlineCode>variant=&quot;mini&quot;</InlineCode> is a slim strip —
          a 3rem (<InlineCode>h-12</InlineCode>) content row with a top border
          and background blur, sitting above the bottom safe-area inset. Use
          it for now-playing bars, upload progress, or connection status.
          Children render inside the centered row; lay them out yourself with
          flex utilities.
        </DocProse>
        <CodePanel html={miniHtml} code={miniCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Auto-hide">
        <DocProse>
          <InlineCode>behavior=&quot;auto-hide&quot;</InlineCode> slips the
          footer away when the user scrolls down and brings it back the moment
          they scroll up — the same{" "}
          <InlineCode>useScrollDirection</InlineCode> hook that powers reveal
          headers, so both bars move in sync. All three variants support it.
          Tune the animation with{" "}
          <InlineCode>
            speed=&quot;slow&quot; | &quot;normal&quot; | &quot;fast&quot;
          </InlineCode>
          ; with the Framer Motion adapter
          installed the hide/show becomes a real exit/enter transition (see{" "}
          <Link href="/docs/motion" className="text-brand hover:underline">
            Motion
          </Link>
          ).
        </DocProse>
      </DocSection>

      <DocSection title="Clearing the footer">
        <DocProse>
          Every variant is <InlineCode>position: fixed</InlineCode>, so it
          overlaps the end of your page — the Footer does not reserve space
          for itself. Give{" "}
          <Link
            href="/docs/components/content"
            className="text-brand hover:underline"
          >
            Content
          </Link>{" "}
          enough bottom padding to scroll the last element clear:{" "}
          <InlineCode>pb-24</InlineCode> for a tab bar,{" "}
          <InlineCode>pb-28</InlineCode> for a floating pill,{" "}
          <InlineCode>pb-20</InlineCode> for a mini bar — the values the{" "}
          <Link href="/examples" className="text-brand hover:underline">
            examples
          </Link>{" "}
          use.
        </DocProse>
      </DocSection>

      <DocSection title="Footer props">
        <PropsTable api={footerApi} />
      </DocSection>

      <DocSection title="FooterItem props">
        <PropsTable api={footerItemApi} />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          See the{" "}
          <Link
            href="/examples/preview/mini-footer/"
            className="text-brand hover:underline"
          >
            mini footer example
          </Link>{" "}
          for a full now-playing bar, or mix footer variants with every header
          behavior in the{" "}
          <Link href="/playground" className="text-brand hover:underline">
            playground
          </Link>
          .
        </DocProse>
      </DocSection>
    </article>
  );
}
