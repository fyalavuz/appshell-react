import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Sidebar",
  description: "A slide-out drawer component with backdrop and keyboard dismiss.",
};

const basicCode = `import { useState } from "react";
import { AppShell, Header, Content, Sidebar, NavGroup, NavItem } from "appshell-react";
import { Menu, Home, Settings, User, X } from "lucide-react";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={
          <button onClick={() => setOpen(true)}>
            <Menu className="size-5" />
          </button>
        }
      />
      
      <Sidebar open={open} onClose={() => setOpen(false)} side="left">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X className="size-4" />
          </button>
        </div>
        
        <NavGroup title="Navigation" defaultOpen>
          <NavItem label="Home" icon={<Home />} active />
          <NavItem label="Profile" icon={<User />} />
          <NavItem label="Settings" icon={<Settings />} />
        </NavGroup>
      </Sidebar>
      
      <Content className="p-4">
        {/* Your content */}
      </Content>
    </AppShell>
  );
}`;

const rightSideCode = `<Sidebar open={open} onClose={() => setOpen(false)} side="right">
  {/* Sidebar content */}
</Sidebar>`;

const sidebarProps = [
  { name: "open", type: "boolean", default: "false", description: "Whether the sidebar is open" },
  { name: "onClose", type: "() => void", default: "-", description: "Callback when sidebar should close" },
  { name: "side", type: '"left" | "right"', default: '"left"', description: "Which side to slide from" },
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", default: "-", description: "Sidebar content" },
];

const navGroupProps = [
  { name: "title", type: "string", default: "-", description: "Group title" },
  { name: "defaultOpen", type: "boolean", default: "true", description: "Whether group is expanded by default" },
  { name: "children", type: "ReactNode", default: "-", description: "NavItem components" },
];

const navItemProps = [
  { name: "label", type: "string", default: "-", description: "Item label" },
  { name: "icon", type: "ReactNode", default: "-", description: "Icon element" },
  { name: "active", type: "boolean", default: "false", description: "Whether this item is active" },
  { name: "badge", type: "number | string", default: "-", description: "Badge count or text" },
  { name: "onClick", type: "() => void", default: "-", description: "Click handler" },
  { name: "href", type: "string", default: "-", description: "Link destination" },
];

export default function SidebarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Sidebar
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          A slide-out drawer with backdrop overlay, smooth animations, and keyboard dismiss support.
        </p>
      </div>

      <ComponentPreview
        name="Sidebar Menu"
        code={basicCode}
        previewUrl="/examples/preview/sidebar"
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
          Right Side
        </h2>
        <p className="text-muted-foreground">
          The sidebar can slide from either side:
        </p>
        <CodeBlock code={rightSideCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Sidebar Props
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
              {sidebarProps.map((prop, i) => (
                <tr key={prop.name} className={i < sidebarProps.length - 1 ? "border-b" : ""}>
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
          NavGroup Props
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
              {navGroupProps.map((prop, i) => (
                <tr key={prop.name} className={i < navGroupProps.length - 1 ? "border-b" : ""}>
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
          NavItem Props
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
              {navItemProps.map((prop, i) => (
                <tr key={prop.name} className={i < navItemProps.length - 1 ? "border-b" : ""}>
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
          Keyboard Support
        </h2>
        <p className="text-muted-foreground">
          The Sidebar automatically handles keyboard interactions:
        </p>
        <ul className="my-4 ml-6 list-disc [&>li]:mt-2 text-muted-foreground">
          <li><kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Escape</kbd> closes the sidebar</li>
          <li>Focus is trapped inside the sidebar when open</li>
          <li>Focus returns to the trigger element when closed</li>
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/docs/components/content"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Content
        </Link>
        <Link
          href="/examples"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          View Examples
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
