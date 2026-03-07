import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "useScrollDirection",
  description: "Detect scroll direction with configurable threshold for custom scroll-aware behaviors.",
};

const basicCode = `import { useScrollDirection } from "appshell-react";

function ScrollIndicator() {
  const direction = useScrollDirection();

  return (
    <div className="fixed bottom-4 right-4 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
      {direction === "up" ? "Scrolling Up" : direction === "down" ? "Scrolling Down" : "Idle"}
    </div>
  );
}`;

const thresholdCode = `// Only trigger after 20px of scroll movement
const direction = useScrollDirection(20);`;

const customBehaviorCode = `import { useScrollDirection } from "appshell-react";

function CustomToolbar() {
  const direction = useScrollDirection();

  return (
    <div
      className="fixed bottom-0 inset-x-0 transition-transform duration-300"
      style={{
        transform: direction === "down" ? "translateY(100%)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-around bg-background border-t p-3">
        {/* toolbar items */}
      </div>
    </div>
  );
}`;

const paramsTable = [
  { name: "threshold", type: "number", default: "10", description: "Minimum scroll distance in pixels before direction changes" },
];

export default function UseScrollDirectionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          useScrollDirection
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          A hook that detects the current scroll direction with a configurable threshold.
          Uses <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">requestAnimationFrame</code> for
          optimal performance with passive scroll listeners.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={basicCode} language="tsx" filename="scroll-indicator.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Custom Threshold
        </h2>
        <p className="text-muted-foreground">
          Adjust the threshold to control sensitivity. Higher values require more
          scroll movement before the direction is updated:
        </p>
        <CodeBlock code={thresholdCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Custom Scroll Behavior
        </h2>
        <p className="text-muted-foreground">
          Build your own scroll-aware components using the direction value:
        </p>
        <CodeBlock code={customBehaviorCode} language="tsx" filename="custom-toolbar.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Parameters
        </h2>
        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Parameter</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {paramsTable.map((prop) => (
                <tr key={prop.name}>
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
          Return Value
        </h2>
        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Value</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs text-primary">{'"up"'}</td>
                <td className="px-4 py-3 text-muted-foreground">User is scrolling upward</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs text-primary">{'"down"'}</td>
                <td className="px-4 py-3 text-muted-foreground">User is scrolling downward</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-primary">null</td>
                <td className="px-4 py-3 text-muted-foreground">No scroll detected yet (initial state)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/docs/hooks/use-app-shell"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          useAppShell
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
