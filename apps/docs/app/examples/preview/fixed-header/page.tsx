"use client";

import { AppShell, Header, Content, HeaderNav, HeaderNavItem, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Search, Bell, User, Clock, ArrowRight, TrendingUp, PanelTop } from "lucide-react";

const articles = [
  {
    title: "Building Resilient Design Systems at Scale",
    excerpt: "How leading teams create component libraries that stand the test of time.",
    date: "Feb 21, 2026",
    readTime: "8 min read",
    category: "Design Systems",
    trending: true,
  },
  {
    title: "The Rise of Server Components in Production",
    excerpt: "A deep dive into how React Server Components are reshaping data fetching patterns.",
    date: "Feb 19, 2026",
    readTime: "12 min read",
    category: "React",
    trending: false,
  },
  {
    title: "CSS Container Queries Changed Everything",
    excerpt: "Why container queries are the biggest leap in responsive design since media queries.",
    date: "Feb 17, 2026",
    readTime: "6 min read",
    category: "CSS",
    trending: true,
  },
  {
    title: "Rethinking State Management in 2026",
    excerpt: "From Redux to signals, the state management landscape has evolved dramatically.",
    date: "Feb 15, 2026",
    readTime: "10 min read",
    category: "Architecture",
    trending: false,
  },
  {
    title: "Accessibility Beyond Compliance",
    excerpt: "Moving past checklists to truly inclusive experiences.",
    date: "Feb 13, 2026",
    readTime: "7 min read",
    category: "Accessibility",
    trending: false,
  },
  {
    title: "Edge Computing and the Modern Frontend",
    excerpt: "How edge runtimes are transforming web performance.",
    date: "Feb 11, 2026",
    readTime: "9 min read",
    category: "Performance",
    trending: true,
  },
];

export default function FixedHeaderPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-6 rounded bg-primary flex items-center justify-center">
                <PanelTop className="size-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">AppShell</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Overview" active />
              <HeaderNavItem label="Analytics" />
              <HeaderNavItem label="Resources" />
              <HeaderNavItem label="Settings" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Search className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors relative"
              >
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
              </button>
              <div className="size-8 rounded-full bg-accent ml-2 flex items-center justify-center">
                <User className="size-5 text-muted-foreground" />
              </div>
            </div>
          }
          title="Overview"
          subtitle="System performance and resource utilization"
        />
        <Content className="pb-12 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {[
                { label: "Active Nodes", value: "128", change: "+12%", trend: "up" },
                { label: "Throughput", value: "1.2 GB/s", change: "+5.4%", trend: "up" },
                { label: "Error Rate", value: "0.02%", change: "-0.01%", trend: "down" },
              ].map((stat, i) => (
                <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold tracking-tight">{stat.value}</h2>
                    <span className={`text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-blue-600"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {articles.map((article, i) => (
                <article
                  key={i}
                  className="group flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    {article.trending && (
                      <TrendingUp className="size-3.5 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {article.readTime}
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                      Read report <ArrowRight className="size-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
