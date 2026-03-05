import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { getExampleBySlug, getAllExamples, categories } from "@/lib/registry";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ExamplePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const examples = getAllExamples();
  return examples.map((example) => ({
    slug: example.slug,
  }));
}

export async function generateMetadata({ params }: ExamplePageProps) {
  const { slug } = await params;
  const example = getExampleBySlug(slug);
  
  if (!example) {
    return { title: "Example Not Found" };
  }

  return {
    title: example.title,
    description: example.description,
  };
}

// Example code snippets for each example
const exampleCodes: Record<string, string> = {
  "fixed-header": `import { AppShell, Header, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={<span className="font-bold">AppShell</span>}
        title="Overview"
        subtitle="System performance and resource utilization"
        nav={
          <HeaderNav>
            <HeaderNavItem label="Overview" active />
            <HeaderNavItem label="Analytics" />
            <HeaderNavItem label="Settings" />
          </HeaderNav>
        }
      />
      <Content className="p-4">
        {/* Your content here */}
      </Content>
    </AppShell>
  );
}`,
  "static-header": `import { AppShell, Header, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="static"
        logo={<span className="font-bold">My App</span>}
        title="Page Title"
      />
      <Content className="p-4">
        {/* Content scrolls naturally with the header */}
      </Content>
    </AppShell>
  );
}`,
  "reveal-all": `import { AppShell, Header, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="reveal-all"
        logo={<span className="font-bold">Discover</span>}
        title="Explore Photography"
        subtitle="Reveals all rows on scroll up"
        searchContent={<SearchFilter />}
      />
      <Content>
        {/* Header hides on scroll down, reveals on scroll up */}
      </Content>
    </AppShell>
  );
}`,
  "sticky-tabs": `import { AppShell, Header, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span>App</span>} />
      {/* Tabs use var(--header-height) for sticky offset */}
      <div 
        style={{ top: "var(--header-height)" }} 
        className="sticky z-40 bg-background border-b"
      >
        <nav className="flex gap-4 p-4">
          <button>Tab 1</button>
          <button>Tab 2</button>
        </nav>
      </div>
      <Content>
        {/* Content */}
      </Content>
    </AppShell>
  );
}`,
  "tab-bar": `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";
import { Home, Search, Bell, Mail, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span>feedflow</span>} />
      <Content className="pb-24">
        {/* Feed content */}
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
          label="Notifications"
          badge={3}
          active={activeTab === "notifications"}
          onClick={() => setActiveTab("notifications")}
        />
        <FooterItem
          icon={<Mail />}
          label="Messages"
          badge={12}
          active={activeTab === "messages"}
          onClick={() => setActiveTab("messages")}
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
}`,
  "floating-footer": `import { AppShell, Header, Content, Footer } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="fixed" logo={<span>Shop</span>} />
      <Content className="pb-24">
        {/* Product listing */}
      </Content>
      <Footer variant="floating" position="center">
        <button className="rounded-full bg-primary px-7 py-3.5 text-primary-foreground font-medium shadow-lg">
          View Cart (3 items)
        </button>
      </Footer>
    </AppShell>
  );
}`,
  "sidebar": `import { AppShell, Header, Content, Sidebar, NavGroup, NavItem } from "appshell-react";
import { useState } from "react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        logo={
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
        }
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        side="left"
      >
        <NavGroup title="Navigation" defaultOpen>
          <NavItem label="Home" icon={<Home />} active />
          <NavItem label="Products" icon={<Package />} />
          <NavItem label="Settings" icon={<Settings />} />
        </NavGroup>
      </Sidebar>
      <Content>
        {/* Main content */}
      </Content>
    </AppShell>
  );
}`,
  "scroll-nav": `import { AppShell, Header, Content, ScrollNav, ScrollNavItem } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header
        behavior="fixed"
        searchContent={
          <ScrollNav>
            <ScrollNavItem label="All" active />
            <ScrollNavItem label="Technology" />
            <ScrollNavItem label="Design" />
            <ScrollNavItem label="Business" />
            <ScrollNavItem label="Science" />
          </ScrollNav>
        }
      />
      <Content>
        {/* Filtered content */}
      </Content>
    </AppShell>
  );
}`,
  "in-page-nav": `import { AppShell, Header, Content } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header behavior="reveal-nav" logo={<span>Docs</span>} />
      {/* Sticky pill nav synced to scroll position */}
      <div 
        style={{ top: "var(--header-height)" }} 
        className="sticky z-40 bg-background/80 backdrop-blur-sm border-b"
      >
        <nav className="flex gap-2 p-4 overflow-x-auto">
          {sections.map(section => (
            <a 
              key={section.id}
              href={\`#\${section.id}\`}
              className="px-3 py-1.5 rounded-full text-sm"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
      <Content>
        {sections.map(section => (
          <section key={section.id} id={section.id}>
            {/* Section content */}
          </section>
        ))}
      </Content>
    </AppShell>
  );
}`,
  "desktop-nav": `import { AppShell, Header, HeaderNav, HeaderNavItem } from "appshell-react";

export default function App() {
  return (
    <AppShell>
      <Header
        behavior="fixed"
        logo={<span className="font-bold">Brand</span>}
        nav={
          <HeaderNav>
            <HeaderNavItem 
              label="Products" 
              dropdown={<ProductsDropdown />} 
            />
            <HeaderNavItem label="Solutions" />
            <HeaderNavItem label="Pricing" />
            <HeaderNavItem label="Docs" />
          </HeaderNav>
        }
        mobileMenu={
          <NavGroup>
            <NavItem label="Products" />
            <NavItem label="Solutions" />
            <NavItem label="Pricing" />
          </NavGroup>
        }
      />
      <Content>
        {/* Page content */}
      </Content>
    </AppShell>
  );
}`,
  "reveal-combined": `import { AppShell, Header, Content, Footer, FooterItem } from "appshell-react";

export default function App() {
  return (
    <AppShell safeArea>
      <Header 
        behavior="reveal-all" 
        logo={<span>App</span>}
        title="Feed"
      />
      <Content>
        {/* Main content */}
      </Content>
      <Footer variant="tab-bar" behavior="auto-hide">
        <FooterItem icon={<Home />} label="Home" active />
        <FooterItem icon={<Search />} label="Search" />
        <FooterItem icon={<Bell />} label="Alerts" />
        <FooterItem icon={<User />} label="Profile" />
      </Footer>
    </AppShell>
  );
}`,
  "dark-mode": `// Toggle .dark class on <html> to switch themes
document.documentElement.classList.toggle("dark");

// All components use semantic tokens:
// --background, --foreground, --primary, --muted, etc.

// Example toggle button:
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <button onClick={toggle}>
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}`,
};

export default async function ExamplePage({ params }: ExamplePageProps) {
  const { slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  // Find prev/next examples
  const allExamples = getAllExamples();
  const currentIndex = allExamples.findIndex((e) => e.slug === slug);
  const prevExample = currentIndex > 0 ? allExamples[currentIndex - 1] : null;
  const nextExample = currentIndex < allExamples.length - 1 ? allExamples[currentIndex + 1] : null;

  const code = exampleCodes[slug] || `// Example code for ${example.title}`;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/examples" className="hover:text-foreground transition-colors">
                Examples
              </Link>
              <span>/</span>
              <span className="text-foreground">{example.title}</span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <example.icon className="size-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {example.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {example.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {example.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {example.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview */}
            <ComponentPreview
              name={example.title}
              code={code}
              previewUrl={`/examples/preview/${slug}`}
              isMobile={true}
            />

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-between border-t pt-6">
              {prevExample ? (
                <Link
                  href={`/examples/${prevExample.slug}`}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  <span>{prevExample.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextExample ? (
                <Link
                  href={`/examples/${nextExample.slug}`}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>{nextExample.title}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
