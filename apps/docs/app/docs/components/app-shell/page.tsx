import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "AppShell",
  description: "The root layout component that wraps your entire application.",
};

const basicCode = `import { AppShell, Header, Content, Footer } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span>Logo</span>} />
      <Content className="p-4">
        {/* Your content */}
      </Content>
      <Footer variant="tab-bar">
        {/* Footer items */}
      </Footer>
    </AppShell>
  );
}`;

const withMotionCode = `import { AppShell, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        {/* Your app content with smooth animations */}
      </AppShell>
    </MotionProvider>
  );
}`;

const propsTable = [
  { name: "safeArea", type: "boolean", default: "false", description: "Enable safe area insets for notched devices" },
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", default: "-", description: "Header, Content, Footer, and Sidebar components" },
];

export default function AppShellPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          AppShell
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          The root layout component that provides context for all child components
          and handles safe area insets for mobile devices.
        </p>
      </div>

      <ComponentPreview
        name="AppShell Demo"
        code={basicCode}
        previewUrl="/examples/preview/tab-bar"
        isMobile={true}
      />

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <CodeBlock code="npm install appshell-react" language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="text-muted-foreground">
          Wrap your application with AppShell to enable the layout system:
        </p>
        <CodeBlock code={basicCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          With Animations
        </h2>
        <p className="text-muted-foreground">
          For smooth animations, wrap your app with MotionProvider and pass a motion adapter:
        </p>
        <CodeBlock code={withMotionCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Props
        </h2>
        <div className="rounded-lg border">
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
                  <td className="px-4 py-3 font-mono text-xs text-primary">{prop.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{prop.default}</td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Safe Areas
        </h2>
        <p className="text-muted-foreground">
          When <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">safeArea</code> is
          enabled, AppShell automatically handles insets for devices with notches, rounded corners,
          or home indicators. It sets CSS custom properties that child components use:
        </p>
        <CodeBlock
          code={`/* These variables are set automatically */
:root {
  --sa-top: env(safe-area-inset-top);
  --sa-bottom: env(safe-area-inset-bottom);
  --sa-left: env(safe-area-inset-left);
  --sa-right: env(safe-area-inset-right);
}`}
          language="css"
        />
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Link
          href="/docs/components/header"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Next: Header
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
