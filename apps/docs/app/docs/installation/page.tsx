import Link from "next/link";
import {
  DocHeader,
  DocSection,
  DocProse,
  DocNote,
  InlineCode,
} from "@/components/docs/doc-page";
import { CodePanel } from "@/components/docs/code-panel";
import { highlight } from "@/lib/highlight";

export const metadata = {
  title: "Installation",
  description: "Install appshell-react and wire up Tailwind CSS v4.",
};

const installCmd = `pnpm add appshell-react
# optional, for spring animations:
pnpm add framer-motion`;

const cssSetup = `@import "tailwindcss";

/* 1. Let Tailwind see the library's classes.
      Without this line the shell renders completely unstyled. */
@source "../node_modules/appshell-react/dist";

/* 2. Dark mode as a class (the library follows your tokens) */
@custom-variant dark (&:is(.dark *));

/* 3. Design tokens — shadcn/ui-style custom properties */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* …dark values for the same tokens */
}

/* 4. Map tokens to Tailwind utilities (bg-background, text-foreground, …) */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
}

/* 5. Small utilities some components rely on */
@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}`;

const motionSetup = `import { MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

export default function App({ children }) {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      {children}
    </MotionProvider>
  );
}`;

export default async function InstallationPage() {
  const [installHtml, cssHtml, motionHtml] = await Promise.all([
    highlight(installCmd, "bash"),
    highlight(cssSetup, "css"),
    highlight(motionSetup),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Getting started"
        title="Installation"
        description="Two steps: install the package, then wire Tailwind CSS v4 up to the library's classes and tokens."
      />

      <DocSection title="Requirements">
        <ul className="space-y-2 text-[15px] leading-relaxed text-muted-foreground">
          <li>• React 18 or 19</li>
          <li>
            • <span className="font-medium text-foreground">Tailwind CSS 4</span>{" "}
            — the library uses v4-only syntax and utilities; v3 is not
            supported
          </li>
          <li>
            • Framer Motion 11+ — optional, only for the spring animation
            adapter
          </li>
        </ul>
      </DocSection>

      <DocSection title="Install">
        <CodePanel html={installHtml} code={installCmd} filename="terminal" />
      </DocSection>

      <DocSection title="Tailwind v4 setup">
        <DocProse>
          appshell-react ships unstyled-by-convention: its components use
          Tailwind utility classes driven by shadcn/ui-style tokens, and your
          build generates the CSS. Your global stylesheet needs four things —
          the <InlineCode>@source</InlineCode> line, the dark-mode custom
          variant, the tokens, and the{" "}
          <InlineCode>@theme inline</InlineCode> mapping:
        </DocProse>
        <CodePanel html={cssHtml} code={cssSetup} filename="globals.css" />
        <DocNote>
          The <InlineCode>@source</InlineCode> line is the step everyone
          misses: Tailwind v4 only scans your own source by default, so
          without it none of the library&rsquo;s classes are generated and the
          shell renders unstyled. If you use HeaderNav dropdowns, also install{" "}
          <InlineCode>tw-animate-css</InlineCode> (and import it) for the{" "}
          <InlineCode>animate-in</InlineCode> entrance utilities.
        </DocNote>
      </DocSection>

      <DocSection title="Optional: spring animations">
        <DocProse>
          Out of the box every transition is plain CSS. For spring-based
          reveal and drawer animations, wrap your app once:
        </DocProse>
        <CodePanel html={motionHtml} code={motionSetup} filename="app.tsx" />
        <DocProse>
          Details and the adapter contract live in{" "}
          <Link href="/docs/motion" className="text-brand hover:underline">
            Motion
          </Link>
          .
        </DocProse>
      </DocSection>

      <DocSection title="Next steps">
        <DocProse>
          Set up your palette in{" "}
          <Link href="/docs/theming" className="text-brand hover:underline">
            Theming
          </Link>
          , or jump straight to the{" "}
          <Link
            href="/docs/components/app-shell"
            className="text-brand hover:underline"
          >
            AppShell reference
          </Link>
          .
        </DocProse>
      </DocSection>
    </article>
  );
}
