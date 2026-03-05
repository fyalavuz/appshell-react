import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Theming",
  description: "Customize AppShell components with CSS custom properties.",
};

const cssVariables = `:root {
  /* Background colors */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  
  /* Card colors */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  
  /* Primary colors */
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  
  /* Muted colors */
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  
  /* Accent colors */
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  
  /* Border and input */
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  
  /* Radius */
  --radius: 0.5rem;
}`;

const darkMode = `.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}`;

const toggleCode = `// Toggle dark mode
document.documentElement.classList.toggle("dark");

// Or with next-themes
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  );
}`;

const customTheme = `/* Custom brand theme */
:root {
  --primary: 221 83% 53%;        /* Blue */
  --primary-foreground: 0 0% 100%;
  
  --accent: 142 76% 36%;          /* Green */
  --accent-foreground: 0 0% 100%;
}

.dark {
  --primary: 217 91% 60%;         /* Lighter blue for dark mode */
  --primary-foreground: 0 0% 100%;
}`;

export default function ThemingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Theming
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          AppShell uses CSS custom properties for theming, making it fully compatible
          with shadcn/ui and easy to customize.
        </p>
      </div>

      <ComponentPreview
        name="Dark Mode"
        code={toggleCode}
        previewUrl="/examples/preview/dark-mode"
        isMobile={true}
      />

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          CSS Variables
        </h2>
        <p className="text-muted-foreground">
          AppShell components use these CSS custom properties. Values use HSL format
          without the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">hsl()</code> wrapper:
        </p>
        <CodeBlock code={cssVariables} language="css" filename="globals.css" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Dark Mode
        </h2>
        <p className="text-muted-foreground">
          Add a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">.dark</code> class
          to your root element to enable dark mode:
        </p>
        <CodeBlock code={darkMode} language="css" filename="globals.css" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Toggling Theme
        </h2>
        <p className="text-muted-foreground">
          Toggle the dark class on the root element, or use a library like next-themes:
        </p>
        <CodeBlock code={toggleCode} language="tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Custom Themes
        </h2>
        <p className="text-muted-foreground">
          Override the default variables to create your own brand theme:
        </p>
        <CodeBlock code={customTheme} language="css" filename="globals.css" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Safe Area Variables
        </h2>
        <p className="text-muted-foreground">
          AppShell also sets safe area variables for notched devices:
        </p>
        <CodeBlock
          code={`/* Set automatically by AppShell when safeArea is enabled */
:root {
  --sa-top: env(safe-area-inset-top);
  --sa-bottom: env(safe-area-inset-bottom);
  --sa-left: env(safe-area-inset-left);
  --sa-right: env(safe-area-inset-right);
}

/* Header height for sticky positioning */
:root {
  --header-height: 3.5rem;
}`}
          language="css"
        />
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold">shadcn/ui Compatibility</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AppShell uses the same CSS variable naming convention as shadcn/ui.
          If you're already using shadcn/ui, AppShell will automatically use your existing theme.
        </p>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/docs/installation"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Installation
        </Link>
        <Link
          href="/docs/components/app-shell"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Components
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
