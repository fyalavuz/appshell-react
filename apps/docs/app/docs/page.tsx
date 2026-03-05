import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { ArrowRight } from "lucide-react";

const installCode = `npm install appshell-react
# or
pnpm add appshell-react
# or
yarn add appshell-react`;

const basicUsageCode = `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, Bell, User } from "lucide-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header 
        behavior="fixed" 
        logo={<span className="font-bold">My App</span>}
        title="Dashboard"
        subtitle="Overview"
      />
      <Content className="p-4">
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <p className="text-muted-foreground mt-2">
          Start building your mobile-first app.
        </p>
      </Content>
      <Footer variant="tab-bar">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<Bell />} label="Alerts" badge={3} />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`;

const motionCode = `import { MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";

export default function App() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        {/* Your app content */}
      </AppShell>
    </MotionProvider>
  );
}`;

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-lg text-muted-foreground mt-4 text-balance">
          AppShell is a collection of mobile-first layout components for React.
          Build native-feeling mobile web apps with scroll-aware headers,
          footers, sidebars, and safe areas.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Features
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong>Header</strong> - 6 scroll behaviors including fixed,
            reveal, and sticky variants
          </li>
          <li>
            <strong>Footer</strong> - Tab bar, floating action, and mini bar
            variants with auto-hide
          </li>
          <li>
            <strong>Sidebar</strong> - Slide-out drawer with backdrop and
            keyboard dismiss
          </li>
          <li>
            <strong>SafeArea</strong> - Automatic safe area inset handling for
            notched devices
          </li>
          <li>
            <strong>ScrollNav</strong> - Horizontal scrollable navigation pills
          </li>
          <li>
            <strong>Context</strong> - Shared state for header/footer visibility
            and scroll direction
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <p className="text-muted-foreground">
          Install AppShell using your preferred package manager:
        </p>
        <CodeBlock code={installCode} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Basic Usage
        </h2>
        <p className="text-muted-foreground">
          Here is a simple example showing the core components working together:
        </p>
        <CodeBlock code={basicUsageCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Animations (Optional)
        </h2>
        <p className="text-muted-foreground">
          AppShell works without any animation library. For smooth animations,
          you can optionally add Framer Motion:
        </p>
        <CodeBlock
          code={`npm install framer-motion`}
          language="bash"
        />
        <p className="text-muted-foreground">
          Then wrap your app with the MotionProvider:
        </p>
        <CodeBlock code={motionCode} language="tsx" filename="app.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Design Tokens
        </h2>
        <p className="text-muted-foreground">
          AppShell uses shadcn/ui design tokens out of the box. All components
          automatically adapt to your theme using CSS custom properties like{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            --background
          </code>
          ,{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            --foreground
          </code>
          ,{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            --primary
          </code>
          , etc.
        </p>
        <p className="text-muted-foreground">
          Dark mode works automatically when you toggle the{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            .dark
          </code>{" "}
          class on your root element.
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Link
          href="/docs/components/app-shell"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Components
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link
          href="/examples"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent transition-colors"
        >
          View Examples
        </Link>
      </div>
    </div>
  );
}
