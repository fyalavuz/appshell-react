import Link from "next/link";
import {
  DocHeader,
  DocSection,
  DocProse,
  DocNote,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { PropsTable } from "@/components/docs/props-table";
import { contentApi } from "@/lib/api-docs";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Content",
  description:
    "The semantic <main> region of the shell — fills the remaining space and clears a fixed Footer automatically.",
};

const basicCode = `import { AppShell, Content, Footer, FooterItem, Header } from "appshell-react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span className="font-bold">MyApp</span>} />
      {/* p-4 for breathing room — no bottom padding needed, Content already
          reserves the tab bar's exact height */}
      <Content className="p-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="mt-2 text-muted-foreground">Your page goes here.</p>
      </Content>
      <Footer variant="tab-bar">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`;

export default async function ContentPage() {
  const basicHtml = await highlight(basicCode);

  return (
    <article>
      <DocHeader
        eyebrow="Components"
        title="Content"
        description="A deliberately thin component: the semantic <main> element that fills the shell's remaining space. Everything else — padding, scrolling, insets — stays under your control."
      />

      <DocSection title="What it is">
        <DocProse>
          Content renders a <InlineCode>&lt;main&gt;</InlineCode> with{" "}
          <InlineCode>flex-1</InlineCode>, so it stretches to fill whatever
          vertical space the shell&rsquo;s flex column has left. It does{" "}
          <em>not</em> create a scroll container (the page scrolls the window
          as usual), does not apply safe-area padding, and does not track
          scroll position — scroll direction comes from{" "}
          <InlineCode>useScrollDirection</InlineCode> listening on the window,
          not from this component. It does clear a fixed Footer for you: a{" "}
          <InlineCode>margin-bottom</InlineCode> bound to the{" "}
          <InlineCode>--appshell-footer-height</InlineCode> variable the
          Footer publishes, resolving to <InlineCode>0px</InlineCode> when
          there is no Footer. A pinned Header needs no matching
          accommodation — it stays in normal document flow (
          <InlineCode>sticky</InlineCode>, not <InlineCode>fixed</InlineCode>)
          and already occupies its own space.
        </DocProse>
        <CodePanel html={basicHtml} code={basicCode} filename="app.tsx" />
        <DocNote>
          There is no <InlineCode>style</InlineCode> prop — Content accepts
          only <InlineCode>className</InlineCode> and{" "}
          <InlineCode>children</InlineCode>. All spacing is done with utility
          classes.
        </DocNote>
      </DocSection>

      <DocSection title="Clearing fixed bars">
        <DocProse>
          Fixed footers overlap the end of the page, but you don&rsquo;t pad
          for it yourself: Content reads{" "}
          <InlineCode>--appshell-footer-height</InlineCode>, the exact pixel
          height the mounted Footer publishes (any variant — tab bar,
          floating, mini), and applies it as{" "}
          <InlineCode>margin-bottom</InlineCode>. Render a different Footer
          and the margin follows; remove it and the margin resolves back to{" "}
          <InlineCode>0px</InlineCode>. Pinned headers need nothing at all —
          the Header stays in normal flow, so top padding is rarely yours to
          manage either. Reach for your own bottom padding only when you want
          extra breathing room beyond the bar&rsquo;s exact height.
        </DocProse>
      </DocSection>

      <DocSection title="Props">
        <PropsTable api={contentApi} />
      </DocSection>

      <DocSection title="When to reach for SafeArea">
        <DocProse>
          With <InlineCode>&lt;AppShell safeArea&gt;</InlineCode> the shell
          already keeps Content&rsquo;s column inside the device&rsquo;s safe
          region, so most pages need nothing more. Reach for{" "}
          <Link
            href="/docs/components/safe-area"
            className="text-brand hover:underline"
          >
            SafeArea
          </Link>{" "}
          when a specific region inside your content needs its own insets — a
          full-bleed map or carousel that must respect the landscape
          notch, for example — by wrapping just that region with the edges it
          should pad.
        </DocProse>
      </DocSection>
    </article>
  );
}
