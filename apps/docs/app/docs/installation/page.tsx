import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Installation",
  description: "How to install and set up AppShell in your project.",
};

const npmInstall = `npm install appshell-react`;
const pnpmInstall = `pnpm add appshell-react`;
const yarnInstall = `yarn add appshell-react`;

const basicSetup = `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header 
        behavior="fixed" 
        logo={<span className="font-bold">My App</span>}
      />
      <Content className="p-4">
        <h1>Hello World</h1>
      </Content>
      <Footer variant="tab-bar">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`;

const framerSetup = `npm install framer-motion`;

const motionSetup = `import { AppShell, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        {/* Your app with smooth animations */}
      </AppShell>
    </MotionProvider>
  );
}`;

const tailwindConfig = `// tailwind.config.js (v3) or globals.css (v4)
// AppShell uses these CSS variables for theming:

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --border: 0 0% 89.8%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode values */
}`;

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          Get started with AppShell in your React project.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Install the package
        </h2>
        <p className="text-muted-foreground">
          Install AppShell using your preferred package manager:
        </p>
        <div className="space-y-3">
          <CodeBlock code={npmInstall} language="bash" filename="npm" />
          <CodeBlock code={pnpmInstall} language="bash" filename="pnpm" />
          <CodeBlock code={yarnInstall} language="bash" filename="yarn" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Basic Setup
        </h2>
        <p className="text-muted-foreground">
          Import and use the components in your app:
        </p>
        <CodeBlock code={basicSetup} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Add Animations (Optional)
        </h2>
        <p className="text-muted-foreground">
          AppShell works without any animation library. For smooth, spring-based animations,
          optionally add Framer Motion:
        </p>
        <CodeBlock code={framerSetup} language="bash" />
        <p className="text-muted-foreground mt-4">
          Then wrap your app with MotionProvider:
        </p>
        <CodeBlock code={motionSetup} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Tailwind CSS Setup
        </h2>
        <p className="text-muted-foreground">
          AppShell uses CSS custom properties for theming, compatible with shadcn/ui tokens.
          Make sure your CSS includes these variables:
        </p>
        <CodeBlock code={tailwindConfig} language="css" filename="globals.css" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Requirements
        </h2>
        <ul className="my-4 ml-6 list-disc [&>li]:mt-2 text-muted-foreground">
          <li>React 18 or higher</li>
          <li>Tailwind CSS 4.x (or 3.x with proper config)</li>
          <li>Framer Motion 10+ (optional, for animations)</li>
        </ul>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold">TypeScript Support</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AppShell is written in TypeScript and includes full type definitions.
          No additional @types packages are needed.
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Link
          href="/docs/theming"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Next: Theming
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
