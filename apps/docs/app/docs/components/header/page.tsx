import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Header",
  description: "A scroll-aware header component with multiple behavior modes.",
};

const basicCode = `import { AppShell, Header, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={<span className="font-bold">MyApp</span>}
        title="Dashboard"
        subtitle="Welcome back"
      />
      <Content className="p-4">
        {/* Your content */}
      </Content>
    </AppShell>
  );
}`;

const revealCode = `<Header
  behavior="reveal-all"
  logo={<span>Logo</span>}
  title="Feed"
  subtitle="Latest updates"
  searchContent={<SearchBar />}
/>`;

const withNavCode = `import { Header, HeaderNav, HeaderNavItem } from "appshell-react";

<Header
  behavior="fixed"
  logo={<Logo />}
  nav={
    <HeaderNav>
      <HeaderNavItem label="Home" active />
      <HeaderNavItem label="Products" />
      <HeaderNavItem label="About" />
    </HeaderNav>
  }
/>`;

const behaviors = [
  { name: "fixed", description: "Header stays fixed at the top, always visible" },
  { name: "static", description: "Header scrolls with content" },
  { name: "reveal-all", description: "Header hides on scroll down, reveals all rows on scroll up" },
  { name: "reveal-nav", description: "Header hides on scroll down, reveals only navigation row on scroll up" },
  { name: "reveal-title", description: "Header hides on scroll down, reveals only title row on scroll up" },
  { name: "sticky", description: "Header sticks after scrolling past a threshold" },
];

const propsTable = [
  { name: "behavior", type: "HeaderBehavior", default: '"fixed"', description: "Scroll behavior mode" },
  { name: "theme", type: '"light" | "dark" | "auto"', default: '"auto"', description: "Visual theme" },
  { name: "logo", type: "ReactNode", default: "-", description: "Logo/brand element (left side)" },
  { name: "title", type: "string", default: "-", description: "Main title text" },
  { name: "subtitle", type: "string", default: "-", description: "Secondary subtitle text" },
  { name: "nav", type: "ReactNode", default: "-", description: "Navigation component (HeaderNav)" },
  { name: "actions", type: "ReactNode", default: "-", description: "Action buttons (right side)" },
  { name: "searchContent", type: "ReactNode", default: "-", description: "Search bar or filter content" },
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
];

export default function HeaderPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Header
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          A scroll-aware header with 6 different behavior modes, support for logos,
          titles, navigation, and search content.
        </p>
      </div>

      <ComponentPreview
        name="Fixed Header"
        code={basicCode}
        previewUrl="/examples/preview/fixed-header"
        isMobile={true}
      />

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={basicCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Behaviors
        </h2>
        <p className="text-muted-foreground">
          The Header supports 6 different scroll behaviors:
        </p>
        <div className="grid gap-3">
          {behaviors.map((b) => (
            <div key={b.name} className="rounded-lg border p-4">
              <code className="font-mono text-sm text-primary">{b.name}</code>
              <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Reveal Header
        </h2>
        <p className="text-muted-foreground">
          Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">reveal-all</code> for
          headers that hide when scrolling down and reveal when scrolling up:
        </p>
        <ComponentPreview
          name="Reveal Header"
          code={revealCode}
          previewUrl="/examples/preview/reveal-all"
          isMobile={true}
        />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          With Navigation
        </h2>
        <p className="text-muted-foreground">
          Add horizontal navigation using HeaderNav and HeaderNavItem:
        </p>
        <CodeBlock code={withNavCode} language="tsx" />
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

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          CSS Variables
        </h2>
        <p className="text-muted-foreground">
          The Header exposes its height as a CSS variable for sticky positioning:
        </p>
        <CodeBlock
          code={`/* Use for sticky elements below the header */
.sticky-element {
  top: var(--header-height, 3.5rem);
}`}
          language="css"
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/docs/components/app-shell"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          AppShell
        </Link>
        <Link
          href="/docs/components/footer"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Next: Footer
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
