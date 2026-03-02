"use client";

import { useState } from "react";
import {
  AppShell,
  Header,
  Content,
  Footer,
  FooterItem,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
} from "react-appshell";
import { framerMotionAdapter } from "react-appshell/motion-framer";
import {
  Sun,
  Moon,
  Home,
  Search,
  Bell,
  User,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Mail,
  Settings,
} from "lucide-react";

const stats = [
  { label: "Monthly Revenue", value: "$48,200", change: "+12.5%", trend: "up", icon: TrendingUp },
  { label: "Active Users", value: "2,847", change: "+8.3%", trend: "up", icon: Activity },
  { label: "Conversion Rate", value: "3.24%", change: "+0.4%", trend: "up", icon: BarChart3 },
  { label: "Avg. Response", value: "1.2s", change: "-15%", trend: "down", icon: Zap },
];

const articles = [
  {
    title: "Understanding Design Tokens",
    excerpt: "How semantic tokens enable seamless theming across light and dark modes without hardcoded color values.",
    date: "Mar 1, 2026",
    category: "Design Systems",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Building Accessible Color Palettes",
    excerpt: "Ensuring WCAG contrast ratios are maintained across both light and dark themes using OKLCH color space.",
    date: "Feb 28, 2026",
    category: "Accessibility",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "CSS Custom Properties at Scale",
    excerpt: "Leveraging CSS variables for theme switching that works without JavaScript and supports user preferences.",
    date: "Feb 25, 2026",
    category: "CSS",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function DarkModePage() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Moon className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">themekit</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Dashboard" active />
              <HeaderNavItem label="Analytics" />
              <HeaderNavItem label="Settings" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Bell className="size-5" />
              </button>
              <div className="size-8 rounded-full bg-accent ml-1 flex items-center justify-center">
                <User className="size-5 text-muted-foreground" />
              </div>
            </div>
          }
          title="Dashboard"
          subtitle="Overview of key metrics and recent activity"
        />

        <Content className="pb-24 bg-muted/30">
          {/* Gradient Hero Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-4 sm:px-6 py-10">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 size-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 size-48 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-white/70 max-w-lg">
                Toggle the theme using the {isDark ? "sun" : "moon"} icon in the header to see how all surfaces adapt between light and dark modes.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-card p-5 shadow-sm transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <stat.icon className="size-4" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                  <span
                    className={`text-xs font-medium ${
                      stat.trend === "up"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {stat.change} from last month
                  </span>
                </div>
              ))}
            </div>

            {/* Article Cards */}
            <h3 className="text-lg font-bold tracking-tight mb-4">Recent Articles</h3>
            <div className="grid gap-5 lg:grid-cols-3 mb-8">
              {articles.map((article) => (
                <article
                  key={article.title}
                  className="group flex flex-col rounded-xl border bg-card shadow-sm overflow-hidden transition-all hover:shadow-md"
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${article.gradient} relative`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white/10">
                      <Moon className="size-16" />
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <h4 className="font-bold tracking-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Form Section */}
            <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
              <h3 className="text-lg font-bold tracking-tight mb-1">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Manage how you receive updates and alerts.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="dark-email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                    <input
                      id="dark-email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-input bg-muted/50 py-2.5 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="dark-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                    <input
                      id="dark-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-lg border border-input bg-muted/50 py-2.5 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Color Surface Showcase */}
            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              <div className="rounded-xl bg-primary p-5 text-primary-foreground">
                <h4 className="font-bold text-sm">Primary Surface</h4>
                <p className="mt-1 text-xs opacity-80">bg-primary / text-primary-foreground</p>
              </div>
              <div className="rounded-xl bg-secondary p-5 text-secondary-foreground">
                <h4 className="font-bold text-sm">Secondary Surface</h4>
                <p className="mt-1 text-xs opacity-80">bg-secondary / text-secondary-foreground</p>
              </div>
              <div className="rounded-xl bg-accent p-5 text-accent-foreground">
                <h4 className="font-bold text-sm">Accent Surface</h4>
                <p className="mt-1 text-xs opacity-80">bg-accent / text-accent-foreground</p>
              </div>
            </div>
          </div>
        </Content>

        <Footer variant="tab-bar">
          <FooterItem
            icon={<Home className="size-5" />}
            label="Home"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <FooterItem
            icon={<Search className="size-5" />}
            label="Search"
            active={activeTab === "search"}
            onClick={() => setActiveTab("search")}
          />
          <FooterItem
            icon={<Bell className="size-5" />}
            label="Alerts"
            active={activeTab === "alerts"}
            onClick={() => setActiveTab("alerts")}
          />
          <FooterItem
            icon={<Settings className="size-5" />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
