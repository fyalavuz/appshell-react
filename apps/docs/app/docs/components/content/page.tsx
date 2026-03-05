import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Content",
  description: "The main content area that handles scrolling and safe area padding.",
};

const basicCode = `import { AppShell, Header, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span>App</span>} />
      <Content className="p-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p>Your content goes here...</p>
      </Content>
    </AppShell>
  );
}`;

const withFooterCode = `<AppShell safeArea>
  <Header behavior="fixed" logo={<span>App</span>} />
  <Content className="pb-24">
    {/* Extra bottom padding for footer */}
  </Content>
  <Footer variant="tab-bar">
    {/* Footer items */}
  </Footer>
</AppShell>`;

const propsTable = [
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
  { name: "style", type: "CSSProperties", default: "-", description: "Inline styles" },
  { name: "children", type: "ReactNode", default: "-", description: "Content children" },
];

export default function ContentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Content
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          The main scrollable area that automatically handles spacing for headers
          and footers.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="text-muted-foreground">
          Content is the main scrollable container for your application:
        </p>
        <CodeBlock code={basicCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          With Footer
        </h2>
        <p className="text-muted-foreground">
          When using a footer, add bottom padding to prevent content from being hidden:
        </p>
        <CodeBlock code={withFooterCode} language="tsx" />
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
          Scroll Events
        </h2>
        <p className="text-muted-foreground">
          Content automatically tracks scroll position and direction, which is used
          by Header and Footer components for auto-hide behavior. You can access this
          information using the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">useAppShell</code> hook.
        </p>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/docs/components/footer"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Footer
        </Link>
        <Link
          href="/docs/components/sidebar"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Next: Sidebar
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
