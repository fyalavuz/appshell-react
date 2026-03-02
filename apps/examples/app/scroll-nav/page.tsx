"use client";

import { useState } from "react";
import {
  AppShell,
  Header,
  Content,
  ScrollNav,
  ScrollNavItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import {
  Search,
  Bell,
  User,
  Bookmark,
  Clock,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";
import { IndicatorPill } from "../_shared/indicator-pill";

type Category =
  | "all"
  | "tech"
  | "design"
  | "biz"
  | "science"
  | "health"
  | "sports"
  | "entertainment";

interface Article {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: Category;
  gradient: string;
  likes: number;
  comments: number;
  trending?: boolean;
}

const articles: Article[] = [
  {
    title: "GPT-5 and the New Age of Reasoning Models",
    excerpt:
      "How the latest generation of language models is shifting from pattern matching to genuine multi-step reasoning capabilities.",
    author: "Sarah Chen",
    date: "Feb 23, 2026",
    readTime: "8 min",
    category: "tech",
    gradient: "from-blue-500 to-cyan-500",
    likes: 842,
    comments: 156,
    trending: true,
  },
  {
    title: "The Return of Brutalism in Digital Design",
    excerpt:
      "Raw aesthetics, bold typography, and intentional roughness are making a comeback in web and product design.",
    author: "Marcus Rivera",
    date: "Feb 22, 2026",
    readTime: "5 min",
    category: "design",
    gradient: "from-pink-500 to-rose-500",
    likes: 631,
    comments: 89,
  },
  {
    title: "Why Bootstrapped Startups Are Outperforming VC-Backed Ones",
    excerpt:
      "A growing body of data shows that founder-funded companies achieve better long-term outcomes than their venture-backed peers.",
    author: "James Park",
    date: "Feb 22, 2026",
    readTime: "11 min",
    category: "biz",
    gradient: "from-emerald-500 to-teal-500",
    likes: 1203,
    comments: 287,
    trending: true,
  },
  {
    title: "CRISPR 3.0: Editing Genes with Single-Base Precision",
    excerpt:
      "The third generation of CRISPR technology enables unprecedented accuracy in genetic modification with near-zero off-target effects.",
    author: "Dr. Emily Watson",
    date: "Feb 21, 2026",
    readTime: "9 min",
    category: "science",
    gradient: "from-violet-500 to-purple-500",
    likes: 534,
    comments: 72,
  },
  {
    title: "The Longevity Diet: What the Data Actually Says",
    excerpt:
      "Separating evidence-based nutrition strategies from fad diets. A comprehensive review of 20 years of longevity research.",
    author: "Dr. Anika Patel",
    date: "Feb 21, 2026",
    readTime: "12 min",
    category: "health",
    gradient: "from-green-500 to-emerald-500",
    likes: 967,
    comments: 198,
    trending: true,
  },
  {
    title: "How Variable Fonts Are Changing Web Typography",
    excerpt:
      "A single font file that replaces dozens of weights and widths. The performance and design implications are enormous.",
    author: "Lisa Tanaka",
    date: "Feb 20, 2026",
    readTime: "6 min",
    category: "design",
    gradient: "from-amber-500 to-orange-500",
    likes: 412,
    comments: 54,
  },
  {
    title: "The Premier League's Data Revolution",
    excerpt:
      "Inside the analytics departments transforming how top football clubs scout, train, and make tactical decisions.",
    author: "Tom Bradley",
    date: "Feb 20, 2026",
    readTime: "7 min",
    category: "sports",
    gradient: "from-lime-500 to-green-500",
    likes: 389,
    comments: 121,
  },
  {
    title: "Quantum Computing Hits 1000 Logical Qubits",
    excerpt:
      "IBM and Google achieve a major milestone that brings practical quantum computing closer to reality for cryptography and drug discovery.",
    author: "Prof. David Liu",
    date: "Feb 19, 2026",
    readTime: "10 min",
    category: "tech",
    gradient: "from-indigo-500 to-blue-600",
    likes: 723,
    comments: 143,
  },
  {
    title: "The Streaming Wars: Who Won?",
    excerpt:
      "After years of fragmentation, the streaming landscape is consolidating. A look at who survived, who merged, and what comes next.",
    author: "Rachel Kim",
    date: "Feb 19, 2026",
    readTime: "8 min",
    category: "entertainment",
    gradient: "from-fuchsia-500 to-pink-500",
    likes: 556,
    comments: 201,
  },
  {
    title: "Sleep Science: The 90-Minute Cycle Myth",
    excerpt:
      "New research challenges the popular belief about sleep cycles and offers a more nuanced view of how rest works.",
    author: "Dr. Maria Santos",
    date: "Feb 18, 2026",
    readTime: "7 min",
    category: "health",
    gradient: "from-sky-500 to-blue-500",
    likes: 1089,
    comments: 234,
  },
  {
    title: "The $100B Creator Economy in 2026",
    excerpt:
      "From YouTube to Substack, how individual creators are building media empires and reshaping the business of content.",
    author: "Alex Morgan",
    date: "Feb 18, 2026",
    readTime: "9 min",
    category: "biz",
    gradient: "from-orange-500 to-red-500",
    likes: 445,
    comments: 98,
  },
  {
    title: "Mars Sample Return: First Results Are In",
    excerpt:
      "NASA and ESA analyze the first rock samples brought back from Mars, revealing surprising evidence of ancient microbial environments.",
    author: "Dr. James Webb",
    date: "Feb 17, 2026",
    readTime: "14 min",
    category: "science",
    gradient: "from-red-500 to-orange-500",
    likes: 1567,
    comments: 312,
    trending: true,
  },
  {
    title: "Olympic Esports: The IOC Makes It Official",
    excerpt:
      "Competitive gaming is officially part of the Olympic program starting 2028. What it means for the industry and athletes.",
    author: "Kevin Nakamura",
    date: "Feb 17, 2026",
    readTime: "6 min",
    category: "sports",
    gradient: "from-yellow-500 to-amber-500",
    likes: 678,
    comments: 176,
  },
  {
    title: "AI-Generated Films Debut at Sundance 2026",
    excerpt:
      "The first fully AI-generated feature film screens at a major festival, igniting heated debate about creativity and authorship.",
    author: "Julia Fernandez",
    date: "Feb 16, 2026",
    readTime: "8 min",
    category: "entertainment",
    gradient: "from-purple-500 to-violet-600",
    likes: 892,
    comments: 445,
    trending: true,
  },
  {
    title: "Rust in Production: Two Years at Scale",
    excerpt:
      "Lessons learned from migrating a high-traffic service from Go to Rust. The wins, the pain points, and the tooling gaps.",
    author: "Daniel Ostrowski",
    date: "Feb 16, 2026",
    readTime: "13 min",
    category: "tech",
    gradient: "from-orange-600 to-red-600",
    likes: 534,
    comments: 167,
  },
  {
    title: "Designing for Spatial Computing in 2026",
    excerpt:
      "Apple Vision Pro and Meta Quest have matured. Here is how design teams are rethinking interfaces for 3D environments.",
    author: "Yuki Tanaka",
    date: "Feb 15, 2026",
    readTime: "10 min",
    category: "design",
    gradient: "from-teal-500 to-cyan-500",
    likes: 378,
    comments: 62,
  },
];

const tabs: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tech", label: "Technology" },
  { id: "design", label: "Design" },
  { id: "biz", label: "Business" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
];

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function ScrollNavPage() {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered =
    activeTab === "all"
      ? articles
      : articles.filter((a) => a.category === activeTab);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                <TrendingUp className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Pulse</span>
            </div>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
              </button>
              <button
                type="button"
                className="ml-1 flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white"
                aria-label="Profile"
              >
                <User className="size-4" />
              </button>
            </div>
          }
          searchContent={
            <ScrollNav>
              {tabs.map((tab) => (
                <ScrollNavItem
                  key={tab.id}
                  label={tab.label}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </ScrollNav>
          }
        />

        <Content className="pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6">
            {/* Trending Banner */}
            {activeTab === "all" && (
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500" />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="relative p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center size-7 rounded-lg bg-white/20 backdrop-blur-sm">
                      <TrendingUp className="size-4" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                      Trending Today
                    </span>
                  </div>
                  <div className="space-y-3">
                    {articles
                      .filter((a) => a.trending)
                      .slice(0, 3)
                      .map((a, i) => (
                        <div
                          key={i}
                          className="group flex items-start gap-4 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 hover:bg-white/15 transition-colors cursor-pointer"
                        >
                          <span className="shrink-0 text-2xl font-bold text-white/25 leading-none mt-0.5 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold leading-snug line-clamp-1 group-hover:text-white/90">
                              {a.title}
                            </h3>
                            <span className="text-xs text-white/50">
                              {a.author} &middot; {a.readTime}
                            </span>
                          </div>
                          <ArrowRight className="size-4 shrink-0 text-white/30 group-hover:text-white/60 transition-colors mt-0.5" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Category Header */}
            {activeTab !== "all" && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground capitalize">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {/* Articles */}
            <div className="flex flex-col gap-5">
              {filtered.map((article, i) => (
                <article
                  key={`${article.title}-${i}`}
                  className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-input transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <div
                      className={`shrink-0 w-full sm:w-48 h-40 sm:h-auto bg-gradient-to-br ${article.gradient} relative flex items-center justify-center overflow-hidden`}
                    >
                      {/* Layered decorative elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-24 rounded-2xl border border-white/10 rotate-12 absolute" />
                        <div className="size-16 rounded-xl border border-white/15 -rotate-6 absolute" />
                        <div className="size-10 rounded-lg bg-white/10 rotate-3 absolute" />
                      </div>
                      <span className="relative text-white/70 text-xs font-semibold uppercase tracking-widest">
                        {tabs.find((t) => t.id === article.category)?.label}
                      </span>
                      {article.trending && (
                        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white">
                          <TrendingUp className="size-3" />
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 min-w-0 p-5">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground capitalize">
                            {tabs.find((t) => t.id === article.category)?.label}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                            <Clock className="size-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="size-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 ring-2 ring-background" />
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {article.author}
                            </span>
                            <span>&middot;</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-red-500 transition-colors">
                            <Heart className="size-3.5" />
                            {formatNumber(article.likes)}
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-blue-500 transition-colors">
                            <MessageCircle className="size-3.5" />
                            {formatNumber(article.comments)}
                          </button>
                          <button className="text-muted-foreground/70 hover:text-foreground transition-colors">
                            <Bookmark className="size-3.5" />
                          </button>
                          <button className="text-muted-foreground/70 hover:text-foreground transition-colors">
                            <Share2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-muted mb-4">
                  <Search className="size-7 text-muted-foreground/70" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  No articles found
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  There are no articles in this category yet. Check back soon.
                </p>
              </div>
            )}

            {/* Load More */}
            {filtered.length > 0 && (
              <div className="mt-10 text-center">
                <button className="rounded-xl border border-border px-8 py-3 text-sm font-medium text-foreground hover:bg-accent/50 hover:shadow-sm transition-all">
                  Load More Articles
                </button>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-14 relative rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Accent glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-500/15 to-transparent rounded-full blur-3xl" />
              <div className="relative p-8 sm:p-10 text-center">
                <div className="inline-flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white mb-5 shadow-lg shadow-orange-500/25">
                  <Mail className="size-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Stay in the loop
                </h3>
                <p className="mt-3 text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                  Get the top stories delivered to your inbox every morning.
                  Curated by humans, not algorithms.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="flex-1 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                  <button className="shrink-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white hover:from-orange-600 hover:to-red-600 transition-colors shadow-lg shadow-orange-500/25">
                    Subscribe
                  </button>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  No spam, unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </Content>
      </AppShell>
      <IndicatorPill>ScrollNav</IndicatorPill>
    </MotionProvider>
  );
}
