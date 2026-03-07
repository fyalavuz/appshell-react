import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "useAppShell",
  description: "Access shared AppShell state including header/footer visibility and scroll direction.",
};

const basicCode = `import { useAppShell } from "appshell-react";

function MyComponent() {
  const {
    headerVisible,
    footerVisible,
    scrollDirection,
    setHeaderVisible,
    setFooterVisible,
  } = useAppShell();

  return (
    <div>
      <p>Header is {headerVisible ? "visible" : "hidden"}</p>
      <p>Footer is {footerVisible ? "visible" : "hidden"}</p>
      <p>Scroll direction: {scrollDirection ?? "idle"}</p>
      <button onClick={() => setHeaderVisible(false)}>
        Hide Header
      </button>
    </div>
  );
}`;

const toggleCode = `import { useAppShell } from "appshell-react";

function FullscreenToggle() {
  const { setHeaderVisible, setFooterVisible } = useAppShell();

  const enterFullscreen = () => {
    setHeaderVisible(false);
    setFooterVisible(false);
  };

  const exitFullscreen = () => {
    setHeaderVisible(true);
    setFooterVisible(true);
  };

  return (
    <button onClick={enterFullscreen}>
      Enter Fullscreen
    </button>
  );
}`;

const returnValues = [
  { name: "headerVisible", type: "boolean", description: "Whether the header is currently visible" },
  { name: "footerVisible", type: "boolean", description: "Whether the footer is currently visible" },
  { name: "scrollDirection", type: '"up" | "down" | null', description: "Current scroll direction, null when idle" },
  { name: "setHeaderVisible", type: "(visible: boolean) => void", description: "Programmatically show/hide the header" },
  { name: "setFooterVisible", type: "(visible: boolean) => void", description: "Programmatically show/hide the footer" },
];

export default function UseAppShellPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          useAppShell
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          Access the shared AppShell context to read and control header/footer
          visibility and scroll direction from any component inside the AppShell tree.
        </p>
      </div>

      <div className="rounded-lg border bg-amber-500/10 border-amber-500/30 p-4">
        <h3 className="font-semibold text-amber-700 dark:text-amber-400">Requirement</h3>
        <p className="text-sm text-muted-foreground mt-1">
          This hook must be used inside an <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{"<AppShell>"}</code> or <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{"<AppShellProvider>"}</code> component.
          It will throw an error if used outside the provider tree.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={basicCode} language="tsx" filename="my-component.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Fullscreen Toggle
        </h2>
        <p className="text-muted-foreground">
          Use setHeaderVisible and setFooterVisible to create fullscreen experiences:
        </p>
        <CodeBlock code={toggleCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Return Values
        </h2>
        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Property</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {returnValues.map((prop, i) => (
                <tr key={prop.name} className={i < returnValues.length - 1 ? "border-b" : ""}>
                  <td className="px-4 py-3 font-mono text-xs text-primary whitespace-nowrap">{prop.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{prop.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/docs/components/scroll-nav"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          ScrollNav
        </Link>
        <Link
          href="/docs/hooks/use-scroll-direction"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Next: useScrollDirection
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
