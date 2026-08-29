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
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Theming",
  description:
    "The shadcn/ui-style token system, dark mode, header themes, and the CSS variables the library reads and writes.",
};

const brandCss = `/* Re-brand by changing token values — the components pick
   them up through the @theme inline mapping (see Installation). */
:root {
  --primary: oklch(0.55 0.2 260);
  --primary-foreground: oklch(0.98 0.01 260);
  --ring: oklch(0.55 0.2 260);
}

.dark {
  --background: oklch(0.16 0.02 260);
  --foreground: oklch(0.97 0.01 260);
  --primary: oklch(0.7 0.16 260);
  --primary-foreground: oklch(0.16 0.02 260);
}`;

const darkModeCode = `import { AppShell, Header, Content } from "appshell-react";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : undefined}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          logo={<span className="font-bold">Nocturne</span>}
          actions={
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          }
        />
        <Content className="p-4">{/* re-themes instantly via tokens */}</Content>
      </AppShell>
    </div>
  );
}`;

const headerThemeCode = `import { AppShell, Header, Content, type HeaderTheme } from "appshell-react";
import { useState } from "react";

const themes: HeaderTheme[] = ["light", "primary", "dark", "none"];

export default function App() {
  const [index, setIndex] = useState(0);

  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        theme={themes[index]}
        logo={<span className="font-bold">Chroma</span>}
        actions={
          <button
            className="rounded-md border px-2 py-1 text-sm"
            onClick={() => setIndex((i) => (i + 1) % themes.length)}
          >
            {themes[index]}
          </button>
        }
      />
      <Content className="p-4">{/* content */}</Content>
    </AppShell>
  );
}`;

const headerThemeHookCode = `import { Header, useHeaderTheme } from "appshell-react";

/** Custom row content that adapts to the active header theme. */
function PlanBadge() {
  const theme = useHeaderTheme(); // "light" | "primary" | "dark" | "none"
  const onColor = theme === "primary" || theme === "dark";

  return (
    <span
      className={
        onColor
          ? "text-primary-foreground/80 text-xs font-medium"
          : "text-muted-foreground text-xs font-medium"
      }
    >
      Pro plan
    </span>
  );
}

export default function App() {
  return (
    <Header
      theme="primary"
      logo={<span className="font-bold">MyApp</span>}
      actions={<PlanBadge />}
    />
  );
}`;

const stickySubNavCode = `/* --header-height is written by <Header> (in px, via a
   ResizeObserver). Read it — never author it yourself. */
.sub-nav {
  position: sticky;
  top: var(--header-height, 0px);
}`;

const tokens: { name: string; usage: string }[] = [
  {
    name: "background / foreground",
    usage:
      "Base surface and text: light-theme header rows, sidebar panels, footer bars. ScrollNav inverts them for the active pill.",
  },
  {
    name: "primary / primary-foreground",
    usage:
      'theme="primary" header rows, the active tab tint and indicator in the footer, and HeaderNav item states on colored headers.',
  },
  {
    name: "muted / muted-foreground",
    usage: "Inactive labels, subdued text, and idle ScrollNav pills.",
  },
  {
    name: "accent / accent-foreground",
    usage: "Hover and active states on nav items, groups, and menu buttons.",
  },
  {
    name: "popover",
    usage:
      "The HeaderNav dropdown panel background. The panel sets no text color of its own, so also define popover-foreground for content you render inside.",
  },
  {
    name: "destructive",
    usage:
      "The FooterItem badge bubble. (Badge text is fixed white; destructive-foreground is part of the standard set but not read by the shell today.)",
  },
  {
    name: "border",
    usage: "Every row divider, panel edge, and drawer border.",
  },
  {
    name: "ring",
    usage: "Focus-visible rings on nav items, pills, and toggles.",
  },
];

export default async function ThemingPage() {
  const [brandHtml, darkModeHtml, headerThemeHookHtml, stickySubNavHtml] =
    await Promise.all([
      highlight(brandCss, "css"),
      highlight(darkModeCode),
      highlight(headerThemeHookCode),
      highlight(stickySubNavCode, "css"),
    ]);

  return (
    <article>
      <DocHeader
        eyebrow="Getting started"
        title="Theming"
        description="The shell has no colors of its own — every surface resolves through shadcn/ui-style design tokens, so one palette themes your app and the shell together, and dark mode is a class flip."
      />

      <DocSection title="How the tokens work">
        <DocProse>
          Components style themselves with Tailwind utilities like{" "}
          <InlineCode>bg-background</InlineCode> and{" "}
          <InlineCode>border-border</InlineCode>. Those utilities exist because
          your stylesheet defines CSS custom properties (
          <InlineCode>--background</InlineCode>,{" "}
          <InlineCode>--border</InlineCode>, …) and maps them to Tailwind v4
          colors with an <InlineCode>@theme inline</InlineCode> block — the
          same convention shadcn/ui uses, so an existing shadcn palette works
          unchanged. The full setup lives in{" "}
          <Link
            href="/docs/installation"
            className="text-brand hover:underline"
          >
            Installation
          </Link>
          .
        </DocProse>
        <DocNote>
          Token values must be complete CSS colors —{" "}
          <InlineCode>oklch(1 0 0)</InlineCode>,{" "}
          <InlineCode>hsl(220 15% 97%)</InlineCode>, hex, anything the browser
          can paint. Bare HSL triples like <InlineCode>0 0% 100%</InlineCode>{" "}
          (the Tailwind v3 / early-shadcn convention) are <em>not</em> valid
          colors under the v4 <InlineCode>@theme inline</InlineCode> mapping
          and render as no color at all.
        </DocNote>
      </DocSection>

      <DocSection title="Token reference">
        <DocProse>
          These are the tokens the library&rsquo;s components actually consume.
          Define the whole set (plus{" "}
          <InlineCode>popover-foreground</InlineCode> and{" "}
          <InlineCode>destructive-foreground</InlineCode>, which your own
          content inside dropdowns and badges will want) and map each one in{" "}
          <InlineCode>@theme inline</InlineCode>:
        </DocProse>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left">
                <th className="px-4 py-2.5 font-semibold">Token</th>
                <th className="px-4 py-2.5 font-semibold">
                  Where the shell uses it
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.name} className="border-b last:border-0 align-top">
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
                    {token.name}
                  </td>
                  <td className="min-w-56 px-4 py-2.5 leading-relaxed text-muted-foreground">
                    {token.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DocProse>
          Re-branding is just changing values — no component props involved:
        </DocProse>
        <CodePanel html={brandHtml} code={brandCss} filename="globals.css" />
      </DocSection>

      <DocSection title="Dark mode">
        <DocProse>
          The library ships zero <InlineCode>dark:</InlineCode> utilities — it
          re-themes entirely through the tokens. Redefine them under a{" "}
          <InlineCode>.dark</InlineCode> class and everything (headers,
          drawers, tab bars, pills) flips at once. For your own{" "}
          <InlineCode>dark:</InlineCode> utilities to follow that same class
          instead of the OS setting, your stylesheet must declare{" "}
          <InlineCode>@custom-variant dark (&amp;:is(.dark *))</InlineCode> —
          it is part of the{" "}
          <Link
            href="/docs/installation"
            className="text-brand hover:underline"
          >
            Installation
          </Link>{" "}
          setup.
        </DocProse>
        <ComponentPreview
          name="Dark mode"
          code={darkModeCode}
          previewUrl="/examples/preview/dark-mode/"
        />
        <CodePanel html={darkModeHtml} code={darkModeCode} filename="app.tsx" />
      </DocSection>

      <DocSection title="Header themes">
        <DocProse>
          Independently of your palette, the Header takes a{" "}
          <InlineCode>theme</InlineCode> prop for all of its rows:{" "}
          <InlineCode>&quot;light&quot;</InlineCode> follows your
          background/foreground tokens, <InlineCode>&quot;primary&quot;</InlineCode>{" "}
          paints the rows with your primary tokens,{" "}
          <InlineCode>&quot;dark&quot;</InlineCode> is a fixed near-black
          (zinc) palette that stays dark regardless of tokens, and{" "}
          <InlineCode>&quot;none&quot;</InlineCode> ships zero styles so you
          can bring your own via <InlineCode>className</InlineCode>.
        </DocProse>
        <ComponentPreview
          name="Header themes"
          code={headerThemeCode}
          previewUrl="/examples/preview/header-themes/"
        />
        <DocProse>
          Custom content rendered inside header rows can read the active theme
          with <InlineCode>useHeaderTheme()</InlineCode> and adapt its colors
          — the same mechanism HeaderNav items use:
        </DocProse>
        <CodePanel
          html={headerThemeHookHtml}
          code={headerThemeHookCode}
          filename="app.tsx"
        />
      </DocSection>

      <DocSection title="CSS variables: read vs. written">
        <DocProse>
          The library <em>reads</em> four safe-area variables —{" "}
          <InlineCode>--sa-top</InlineCode>,{" "}
          <InlineCode>--sa-bottom</InlineCode>,{" "}
          <InlineCode>--sa-left</InlineCode>,{" "}
          <InlineCode>--sa-right</InlineCode> — each with an{" "}
          <InlineCode>env(safe-area-inset-*)</InlineCode> fallback. It never
          sets them: on a real device the <InlineCode>env()</InlineCode>{" "}
          fallback supplies the insets, and defining{" "}
          <InlineCode>--sa-*</InlineCode> yourself is an override hook for
          phone mockups, Storybook, and tests.
        </DocProse>
        <DocProse>
          It <em>writes</em> exactly one variable:{" "}
          <InlineCode>--header-height</InlineCode>, set in pixels on the root
          element by the Header via a ResizeObserver whenever the header
          resizes. Use it to dock sticky sub-navigation or a docked sidebar
          below the header:
        </DocProse>
        <CodePanel
          html={stickySubNavHtml}
          code={stickySubNavCode}
          filename="styles.css"
        />
        <DocNote>
          Do not author <InlineCode>--header-height</InlineCode> statically in
          your stylesheet — the Header overwrites it with the measured pixel
          value as soon as it mounts, and keeps it in sync as rows appear,
          wrap, or animate. See the{" "}
          <Link
            href="/examples/sticky-tabs"
            className="text-brand hover:underline"
          >
            sticky sub-navigation example
          </Link>{" "}
          for it in action.
        </DocNote>
      </DocSection>
    </article>
  );
}
