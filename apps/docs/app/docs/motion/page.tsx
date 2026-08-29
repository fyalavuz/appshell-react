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
  title: "Motion",
  description:
    "Plain CSS transitions by default, real springs when you opt in — and a public adapter contract in between.",
};

const providerCode = `import { AppShell, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import type { ReactNode } from "react";

export default function App({ children }: { children: ReactNode }) {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>{children}</AppShell>
    </MotionProvider>
  );
}`;

const adapterShapeCode = `import type { ComponentType, ForwardRefExoticComponent } from "react";

/** Public — import type { MotionAdapter } from "appshell-react". */
interface MotionAdapter {
  AnimatePresence: ComponentType<any>;
  motion: {
    div: ForwardRefExoticComponent<any>;
    footer: ForwardRefExoticComponent<any>;
    nav: ForwardRefExoticComponent<any>;
    header: ForwardRefExoticComponent<any>;
    section: ForwardRefExoticComponent<any>;
    main: ForwardRefExoticComponent<any>;
    span: ForwardRefExoticComponent<any>;
    button: ForwardRefExoticComponent<any>;
    h1: ForwardRefExoticComponent<any>;
    p: ForwardRefExoticComponent<any>;
  };
}`;

const customAdapterCode = `import React, { forwardRef, type ReactNode } from "react";
import type { MotionAdapter } from "appshell-react";

/** Render children straight through — exiting elements simply unmount. */
function InstantPresence({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

/**
 * One motion element. This skeleton drops the animation props and renders
 * the plain tag — swap that for calls into your animation engine, which
 * receives framer-motion-shaped props (initial / animate / exit /
 * transition / layoutId) from the shell components.
 */
function createMotionElement(tag: string) {
  return forwardRef<HTMLElement, Record<string, unknown>>(
    function MotionElement(props, ref) {
      const {
        initial: _initial,
        animate: _animate,
        exit: _exit,
        transition: _transition,
        layoutId: _layoutId,
        whileHover: _whileHover,
        whileTap: _whileTap,
        ...rest
      } = props;
      return React.createElement(tag, { ...rest, ref });
    }
  );
}

export const myAdapter: MotionAdapter = {
  AnimatePresence: InstantPresence,
  motion: {
    div: createMotionElement("div"),
    footer: createMotionElement("footer"),
    nav: createMotionElement("nav"),
    header: createMotionElement("header"),
    section: createMotionElement("section"),
    main: createMotionElement("main"),
    span: createMotionElement("span"),
    button: createMotionElement("button"),
    h1: createMotionElement("h1"),
    p: createMotionElement("p"),
  },
};`;

const motionProviderProps = [
  {
    name: "adapter",
    type: "MotionAdapter",
    required: true,
    description:
      "The animation engine to use — framerMotionAdapter, or your own object satisfying the contract below.",
  },
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Your app — typically the AppShell and everything inside it.",
  },
];

export default async function MotionPage() {
  const [providerHtml, shapeHtml, customHtml] = await Promise.all([
    highlight(providerCode),
    highlight(adapterShapeCode, "ts"),
    highlight(customAdapterCode),
  ]);

  return (
    <article>
      <DocHeader
        eyebrow="Advanced"
        title="Motion"
        description="Every animation in appshell-react runs on plain CSS transitions by default — zero dependencies. One provider at the root upgrades reveals, drawers, and footers to real springs, through a public adapter contract you can also implement yourself."
      />

      <DocSection title="CSS by default">
        <DocProse>
          Without any setup, the shell animates with CSS transitions alone.
          Internally every animated element is rendered through a motion
          adapter, and the built-in CSS adapter is deliberately boring: its{" "}
          <InlineCode>AnimatePresence</InlineCode> passes children straight
          through, and its motion elements strip the animation props (
          <InlineCode>initial</InlineCode>, <InlineCode>animate</InlineCode>,{" "}
          <InlineCode>exit</InlineCode>, <InlineCode>transition</InlineCode>,{" "}
          <InlineCode>layoutId</InlineCode>, …) and render the plain HTML tag.
          No animation runtime ships in your bundle, and header reveals and
          footer hide/show still transition smoothly via CSS.
        </DocProse>
      </DocSection>

      <DocSection title="Upgrading to springs">
        <DocProse>
          Wrap your app once — at the root, above the AppShell — in{" "}
          <InlineCode>MotionProvider</InlineCode> with the Framer Motion
          adapter, imported from the{" "}
          <InlineCode>appshell-react/motion-framer</InlineCode> subpath:
        </DocProse>
        <CodePanel html={providerHtml} code={providerCode} filename="app.tsx" />
        <DocProse>
          Header reveals, sidebar drawers, and footer hide/show now run as
          spring-based enter/exit animations, and details like the tab
          bar&rsquo;s active indicator glide between tabs with a shared-layout
          spring. Every shell component below the provider picks it up
          through context — which is why one wrapper at the root is the whole
          setup.
        </DocProse>
        <DocNote>
          <InlineCode>framer-motion</InlineCode> is an optional peer
          dependency: the core never imports it, only the{" "}
          <InlineCode>motion-framer</InlineCode> subpath does. Install it
          yourself (<InlineCode>pnpm add framer-motion</InlineCode>) when you
          use the adapter — skip both and it never touches your bundle.
        </DocNote>
      </DocSection>

      <DocSection title="MotionProvider">
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left">
                <th className="px-4 py-2.5 font-semibold">Prop</th>
                <th className="px-4 py-2.5 font-semibold">Type</th>
                <th className="px-4 py-2.5 font-semibold">Default</th>
                <th className="px-4 py-2.5 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {motionProviderProps.map((prop) => (
                <tr key={prop.name} className="border-b last:border-0 align-top">
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">
                    {prop.name}
                    {prop.required && <span className="text-brand">*</span>}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    {prop.type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    —
                  </td>
                  <td className="min-w-56 px-4 py-2.5 leading-relaxed text-muted-foreground">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="The MotionAdapter contract">
        <DocProse>
          The adapter type is public, so Framer Motion is a choice, not a
          requirement. An adapter is an{" "}
          <InlineCode>AnimatePresence</InlineCode> component plus a map of
          motion-wrapped HTML elements:
        </DocProse>
        <CodePanel
          html={shapeHtml}
          code={adapterShapeCode}
          filename="MotionAdapter (shape)"
        />
        <DocProse>
          Shell components hand these elements framer-motion-shaped props —{" "}
          <InlineCode>initial</InlineCode>/<InlineCode>animate</InlineCode>/
          <InlineCode>exit</InlineCode> variants, a{" "}
          <InlineCode>transition</InlineCode>, sometimes a{" "}
          <InlineCode>layoutId</InlineCode> — so any engine that can
          interpret (or deliberately ignore) that vocabulary can plug in.
          This skeleton is a working starting point; it behaves like a
          reduced-motion adapter until you wire the props into your engine:
        </DocProse>
        <CodePanel
          html={customHtml}
          code={customAdapterCode}
          filename="my-adapter.tsx"
        />
      </DocSection>

      <DocSection title="Related">
        <DocProse>
          The install command for the optional dependency lives in{" "}
          <Link href="/docs/installation" className="text-brand hover:underline">
            Installation
          </Link>
          , and every preview in the{" "}
          <Link href="/examples" className="text-brand hover:underline">
            examples gallery
          </Link>{" "}
          runs with the Framer Motion adapter enabled so you can feel the
          springs.
        </DocProse>
      </DocSection>
    </article>
  );
}
