import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "SafeArea",
  description: "Handle mobile safe area insets for notched and rounded-corner devices.",
};

const basicCode = `import { AppShell, SafeArea } from "appshell-react";

export default function App() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <AppShell>
        {/* Content is padded away from notch and home indicator */}
      </AppShell>
    </SafeArea>
  );
}`;

const customEdgesCode = `// Only apply safe area to specific edges
<SafeArea edges={["top", "left", "right"]}>
  <Header />
</SafeArea>

<SafeArea edges={["bottom"]}>
  <Footer />
</SafeArea>`;

const hookCode = `import { useSafeArea } from "appshell-react";

function MyComponent() {
  const insets = useSafeArea(["top", "bottom"]);

  return (
    <div style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* Manually apply safe area insets */}
    </div>
  );
}`;

const cssVarsCode = `/* SafeArea exposes CSS custom properties */
:root {
  --sa-top: env(safe-area-inset-top, 0px);
  --sa-bottom: env(safe-area-inset-bottom, 0px);
  --sa-left: env(safe-area-inset-left, 0px);
  --sa-right: env(safe-area-inset-right, 0px);
}

/* Use in your own styles */
.my-header {
  padding-top: var(--sa-top);
}`;

const propsTable = [
  { name: "edges", type: 'SafeAreaEdge[]', default: '["top", "bottom", "left", "right"]', description: "Which edges to apply safe area padding" },
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", default: "-", description: "Content to render inside the safe area" },
];

export default function SafeAreaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          SafeArea
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          Automatically handles safe area insets for devices with notches, rounded corners,
          and home indicators. Uses CSS <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">env()</code> functions
          with fallback CSS custom properties.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="text-muted-foreground">
          Wrap your app or specific sections with SafeArea to apply proper padding:
        </p>
        <CodeBlock code={basicCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold">AppShell shortcut</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Instead of using SafeArea directly, you can pass the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">safeArea</code> prop
          to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{"<AppShell safeArea>"}</code> which
          wraps children in a SafeArea automatically.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Custom Edges
        </h2>
        <p className="text-muted-foreground">
          Apply safe area insets to specific edges only:
        </p>
        <CodeBlock code={customEdgesCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          useSafeArea Hook
        </h2>
        <p className="text-muted-foreground">
          For programmatic access to safe area values, use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">useSafeArea</code> hook:
        </p>
        <CodeBlock code={hookCode} language="tsx" filename="my-component.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          CSS Variables
        </h2>
        <p className="text-muted-foreground">
          SafeArea uses CSS custom properties that fall back to environment variables:
        </p>
        <CodeBlock code={cssVarsCode} language="css" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {propsTable.map((prop, i) => (
                <tr key={prop.name} className={i < propsTable.length - 1 ? "border-b" : ""}>
                  <td className="px-4 py-3 font-mono text-xs text-primary whitespace-nowrap">{prop.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{prop.type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{prop.default}</td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/docs/components/sidebar"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Sidebar
        </Link>
        <Link
          href="/docs/components/scroll-nav"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Next: ScrollNav
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
