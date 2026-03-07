import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "ScrollNav",
  description: "Horizontal scrollable pill navigation for categories and filters.",
};

const basicCode = `import { ScrollNav, ScrollNavItem } from "appshell-react";

function CategoryFilter() {
  const [active, setActive] = useState("all");

  return (
    <ScrollNav>
      <ScrollNavItem
        label="All"
        active={active === "all"}
        onClick={() => setActive("all")}
      />
      <ScrollNavItem
        label="Technology"
        active={active === "tech"}
        onClick={() => setActive("tech")}
      />
      <ScrollNavItem
        label="Design"
        active={active === "design"}
        onClick={() => setActive("design")}
      />
      <ScrollNavItem
        label="Business"
        active={active === "business"}
        onClick={() => setActive("business")}
      />
    </ScrollNav>
  );
}`;

const headerIntegrationCode = `import { Header, ScrollNav, ScrollNavItem } from "appshell-react";

<Header
  behavior="reveal-nav"
  logo={<Logo />}
  searchContent={
    <ScrollNav>
      <ScrollNavItem label="All" active />
      <ScrollNavItem label="Following" />
      <ScrollNavItem label="Trending" />
    </ScrollNav>
  }
/>`;

const scrollNavPropsTable = [
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
  { name: "children", type: "ReactNode", default: "-", description: "ScrollNavItem components" },
];

const scrollNavItemPropsTable = [
  { name: "label", type: "string", default: "-", description: "Display text for the pill" },
  { name: "active", type: "boolean", default: "false", description: "Whether this item is currently selected" },
  { name: "onClick", type: "() => void", default: "-", description: "Click handler" },
  { name: "className", type: "string", default: "-", description: "Additional CSS classes" },
];

export default function ScrollNavPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          ScrollNav
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          A horizontal scrollable pill navigation for category filtering,
          section navigation, and tab-like interfaces. Hides scrollbars
          and supports touch swiping.
        </p>
      </div>

      <ComponentPreview
        name="Scroll Navigation"
        code={basicCode}
        previewUrl="/examples/preview/scroll-nav"
        isMobile={true}
      />

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={basicCode} language="tsx" filename="category-filter.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          With Header
        </h2>
        <p className="text-muted-foreground">
          ScrollNav works great as the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">searchContent</code> slot
          in the Header component:
        </p>
        <CodeBlock code={headerIntegrationCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          ScrollNav Props
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
              {scrollNavPropsTable.map((prop, i) => (
                <tr key={prop.name} className={i < scrollNavPropsTable.length - 1 ? "border-b" : ""}>
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
          ScrollNavItem Props
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
              {scrollNavItemPropsTable.map((prop, i) => (
                <tr key={prop.name} className={i < scrollNavItemPropsTable.length - 1 ? "border-b" : ""}>
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
          href="/docs/components/safe-area"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          SafeArea
        </Link>
        <Link
          href="/examples"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          View Examples
        </Link>
      </div>
    </div>
  );
}
