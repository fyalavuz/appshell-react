import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Footer",
  description: "A versatile footer component with tab bar, floating, and mini variants.",
};

const tabBarCode = `import { AppShell, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, Bell, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <AppShell safeArea>
      <Content className="pb-24">
        {/* Your content */}
      </Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem
          icon={<Home />}
          label="Home"
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />
        <FooterItem
          icon={<Search />}
          label="Search"
          active={activeTab === "search"}
          onClick={() => setActiveTab("search")}
        />
        <FooterItem
          icon={<Bell />}
          label="Alerts"
          badge={3}
          active={activeTab === "alerts"}
          onClick={() => setActiveTab("alerts")}
        />
        <FooterItem
          icon={<User />}
          label="Profile"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
      </Footer>
    </AppShell>
  );
}`;

const floatingCode = `<Footer variant="floating" position="center">
  <button className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg">
    Add to Cart
  </button>
</Footer>`;

const miniCode = `<Footer variant="mini">
  <div className="flex items-center justify-between px-4 py-2">
    <span className="text-sm text-muted-foreground">Now Playing</span>
    <button className="text-primary">View</button>
  </div>
</Footer>`;

const variants = [
  { name: "tab-bar", description: "Standard mobile bottom navigation with icons and labels" },
  { name: "floating", description: "Elevated floating action button or pill" },
  { name: "mini", description: "Compact bar for persistent info like media players" },
];

const footerProps = [
  { name: "variant", type: '"tab-bar" | "floating" | "mini"', default: '"tab-bar"', description: "Visual variant" },
  { name: "behavior", type: '"static" | "auto-hide"', default: '"static"', description: "Scroll behavior" },
  { name: "position", type: '"left" | "center" | "right"', default: '"center"', description: "Content alignment (floating only)" },
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", default: "-", description: "FooterItem components or custom content" },
];

const footerItemProps = [
  { name: "icon", type: "ReactNode", default: "-", description: "Icon element" },
  { name: "label", type: "string", default: "-", description: "Text label" },
  { name: "active", type: "boolean", default: "false", description: "Whether this item is active" },
  { name: "badge", type: "number | string", default: "-", description: "Badge count or text" },
  { name: "onClick", type: "() => void", default: "-", description: "Click handler" },
];

export default function FooterPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Footer
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          A versatile footer component with tab bar navigation, floating action buttons,
          and mini bars for persistent content.
        </p>
      </div>

      <ComponentPreview
        name="Tab Bar"
        code={tabBarCode}
        previewUrl="/examples/preview/tab-bar"
        isMobile={true}
      />

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Variants
        </h2>
        <p className="text-muted-foreground">
          The Footer supports 3 different variants:
        </p>
        <div className="grid gap-3">
          {variants.map((v) => (
            <div key={v.name} className="rounded-lg border p-4">
              <code className="font-mono text-sm text-primary">{v.name}</code>
              <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Tab Bar
        </h2>
        <p className="text-muted-foreground">
          The most common mobile navigation pattern with icons, labels, and optional badges:
        </p>
        <CodeBlock code={tabBarCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Floating Action
        </h2>
        <p className="text-muted-foreground">
          Perfect for primary actions like "Add to Cart" or "Create New":
        </p>
        <ComponentPreview
          name="Floating Footer"
          code={floatingCode}
          previewUrl="/examples/preview/floating-footer"
          isMobile={true}
        />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Mini Bar
        </h2>
        <p className="text-muted-foreground">
          Compact bar for persistent information like media players:
        </p>
        <CodeBlock code={miniCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Auto-Hide Behavior
        </h2>
        <p className="text-muted-foreground">
          Set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">behavior="auto-hide"</code> to
          automatically hide the footer when scrolling down and show it when scrolling up:
        </p>
        <CodeBlock
          code={`<Footer variant="tab-bar" behavior="auto-hide">
  {/* Footer items */}
</Footer>`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Footer Props
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
              {footerProps.map((prop, i) => (
                <tr key={prop.name} className={i < footerProps.length - 1 ? "border-b" : ""}>
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
          FooterItem Props
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
              {footerItemProps.map((prop, i) => (
                <tr key={prop.name} className={i < footerItemProps.length - 1 ? "border-b" : ""}>
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
          href="/docs/components/header"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Header
        </Link>
        <Link
          href="/docs/components/content"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Next: Content
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
