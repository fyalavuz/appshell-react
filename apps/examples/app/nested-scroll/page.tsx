"use client";

import { useState } from "react";
import {
  AppShell,
  Header,
  Content,
  Footer,
  FooterItem,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Home,
  Search,
  Library,
  Download,
  User,
  Play,
  Star,
  Clock,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const featured = [
  { id: 1, title: "Cosmic Voyage", subtitle: "New Season", gradient: "from-indigo-600 to-violet-700", accent: "bg-indigo-400/30" },
  { id: 2, title: "Neon Horizons", subtitle: "Trending", gradient: "from-pink-600 to-rose-700", accent: "bg-pink-400/30" },
  { id: 3, title: "Deep Current", subtitle: "Editor's Pick", gradient: "from-cyan-600 to-blue-700", accent: "bg-cyan-400/30" },
  { id: 4, title: "Solar Winds", subtitle: "Exclusive", gradient: "from-amber-600 to-orange-700", accent: "bg-amber-400/30" },
  { id: 5, title: "Arctic Pulse", subtitle: "New Episodes", gradient: "from-teal-600 to-emerald-700", accent: "bg-teal-400/30" },
];

const trending = [
  { id: 1, title: "Signal Lost", rating: "9.2", gradient: "from-rose-500 to-pink-600" },
  { id: 2, title: "The Algorithm", rating: "8.8", gradient: "from-violet-500 to-purple-600" },
  { id: 3, title: "Quantum Break", rating: "9.0", gradient: "from-blue-500 to-indigo-600" },
  { id: 4, title: "Carbon Copy", rating: "8.5", gradient: "from-emerald-500 to-teal-600" },
  { id: 5, title: "Void Walker", rating: "8.9", gradient: "from-amber-500 to-orange-600" },
  { id: 6, title: "Pixel Dream", rating: "8.7", gradient: "from-fuchsia-500 to-pink-600" },
  { id: 7, title: "Glass City", rating: "9.1", gradient: "from-sky-500 to-cyan-600" },
];

const continueWatching = [
  { id: 1, title: "Neon Horizons", episode: "S2 E4", progress: 65, gradient: "from-pink-500 to-rose-600" },
  { id: 2, title: "Deep Current", episode: "S1 E8", progress: 30, gradient: "from-cyan-500 to-blue-600" },
  { id: 3, title: "Signal Lost", episode: "S3 E2", progress: 80, gradient: "from-rose-500 to-red-600" },
  { id: 4, title: "The Algorithm", episode: "S1 E12", progress: 45, gradient: "from-violet-500 to-purple-600" },
  { id: 5, title: "Quantum Break", episode: "S2 E1", progress: 10, gradient: "from-blue-500 to-indigo-600" },
];

const newReleases = [
  { id: 1, title: "Echo Chamber", date: "Mar 1", gradient: "from-lime-500 to-green-600" },
  { id: 2, title: "Rust Belt", date: "Feb 28", gradient: "from-orange-500 to-red-600" },
  { id: 3, title: "Midnight Oil", date: "Feb 25", gradient: "from-indigo-500 to-blue-600" },
  { id: 4, title: "Paper Trail", date: "Feb 22", gradient: "from-yellow-500 to-amber-600" },
  { id: 5, title: "Frozen Light", date: "Feb 20", gradient: "from-sky-500 to-blue-600" },
  { id: 6, title: "Dark Matter", date: "Feb 18", gradient: "from-slate-500 to-zinc-600" },
];

const topPicks = [
  { id: 1, title: "Starfield", match: "98%", gradient: "from-violet-600 to-indigo-700" },
  { id: 2, title: "Wavelength", match: "95%", gradient: "from-rose-600 to-pink-700" },
  { id: 3, title: "Basecamp", match: "93%", gradient: "from-emerald-600 to-teal-700" },
  { id: 4, title: "Overdrive", match: "91%", gradient: "from-amber-600 to-orange-700" },
  { id: 5, title: "Catalyst", match: "89%", gradient: "from-blue-600 to-cyan-700" },
  { id: 6, title: "Frostbite", match: "87%", gradient: "from-sky-600 to-blue-700" },
  { id: 7, title: "Helix", match: "85%", gradient: "from-fuchsia-600 to-purple-700" },
  { id: 8, title: "Firewall", match: "83%", gradient: "from-red-600 to-rose-700" },
];

export default function NestedScrollPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                <Play className="size-3.5 text-white fill-white ml-0.5" />
              </div>
              <span className="text-lg font-bold tracking-tight">streamline</span>
            </div>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Search className="size-5" />
              </button>
              <div className="size-8 rounded-full bg-accent flex items-center justify-center">
                <User className="size-5 text-muted-foreground" />
              </div>
            </div>
          }
        />

        <Content className="pb-24 bg-background">
          {/* Featured — large hero cards */}
          <section className="pt-4 pb-2">
            <div className="flex items-center justify-between px-4 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Featured</h2>
              </div>
              <button type="button" className="text-sm text-primary font-medium">See All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
              {featured.map((item) => (
                <div
                  key={item.id}
                  className={`shrink-0 w-[300px] h-[180px] rounded-2xl bg-gradient-to-br ${item.gradient} relative overflow-hidden snap-start shadow-lg`}
                >
                  <div className="absolute inset-0">
                    <div className={`absolute -top-8 -right-8 size-32 rounded-full ${item.accent} blur-2xl`} />
                    <div className={`absolute -bottom-8 -left-8 size-24 rounded-full ${item.accent} blur-xl`} />
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-5">
                    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider mb-2">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                    aria-label="Play"
                  >
                    <Play className="size-4 fill-white ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Now — medium cards */}
          <section className="pb-2">
            <div className="flex items-center justify-between px-4 mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Trending Now</h2>
              </div>
              <button type="button" className="text-sm text-primary font-medium">See All</button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
              {trending.map((item) => (
                <div key={item.id} className="shrink-0 w-[200px] snap-start">
                  <div className={`h-[120px] rounded-xl bg-gradient-to-br ${item.gradient} relative overflow-hidden mb-2`}>
                    <div className="absolute inset-0 flex items-center justify-center text-white/10">
                      <Play className="size-10" />
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/40 backdrop-blur-sm px-1.5 py-0.5">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-white">{item.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight truncate">{item.title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Continue Watching — progress bar cards */}
          <section className="pb-2">
            <div className="flex items-center justify-between px-4 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Continue Watching</h2>
              </div>
              <button type="button" className="text-sm text-primary font-medium">See All</button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
              {continueWatching.map((item) => (
                <div key={item.id} className="shrink-0 w-[200px] snap-start">
                  <div className={`h-[120px] rounded-xl bg-gradient-to-br ${item.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 transition-colors"
                        aria-label="Resume"
                      >
                        <Play className="size-4 fill-white ml-0.5" />
                      </button>
                    </div>
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                      <div
                        className="h-full bg-primary rounded-r-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-semibold tracking-tight truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.episode}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* New Releases */}
          <section className="pb-2">
            <div className="flex items-center justify-between px-4 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">New Releases</h2>
              </div>
              <button type="button" className="text-sm text-primary font-medium">See All</button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
              {newReleases.map((item) => (
                <div key={item.id} className="shrink-0 w-[200px] snap-start">
                  <div className={`h-[120px] rounded-xl bg-gradient-to-br ${item.gradient} relative overflow-hidden mb-2`}>
                    <div className="absolute inset-0 flex items-center justify-center text-white/10">
                      <Play className="size-10" />
                    </div>
                    <span className="absolute bottom-2 left-2 rounded-md bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">Just added</p>
                </div>
              ))}
            </div>
          </section>

          {/* Top Picks For You — smaller compact cards */}
          <section className="pb-4">
            <div className="flex items-center justify-between px-4 mb-3">
              <div className="flex items-center gap-2">
                <Star className="size-4 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Top Picks For You</h2>
              </div>
              <button type="button" className="text-sm text-primary font-medium">See All</button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
              {topPicks.map((item) => (
                <div key={item.id} className="shrink-0 w-[160px] snap-start">
                  <div className={`h-[100px] rounded-xl bg-gradient-to-br ${item.gradient} relative overflow-hidden mb-2`}>
                    <div className="absolute inset-0 flex items-center justify-center text-white/10">
                      <Play className="size-8" />
                    </div>
                    <span className="absolute top-2 left-2 rounded-md bg-emerald-500/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {item.match} match
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold tracking-tight truncate">{item.title}</h3>
                </div>
              ))}
            </div>
          </section>
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
            icon={<Library className="size-5" />}
            label="Library"
            active={activeTab === "library"}
            onClick={() => setActiveTab("library")}
          />
          <FooterItem
            icon={<Download className="size-5" />}
            label="Downloads"
            active={activeTab === "downloads"}
            onClick={() => setActiveTab("downloads")}
          />
          <FooterItem
            icon={<User className="size-5" />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
