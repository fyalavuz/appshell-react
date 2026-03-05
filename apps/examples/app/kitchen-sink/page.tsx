"use client";

import React, { useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  FooterItem,
  Content,
  HeaderNav,
  HeaderNavItem,
  Sidebar,
  NavGroup,
  NavItem,
  cn,
} from "appshell-react";
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
  Menu,
  Bell,
  Settings,
  Mail,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronRight,
  Zap,
  Layout,
  Smartphone,
  Shield,
  Palette,
  Sparkles,
} from "lucide-react";

export default function KitchenSinkPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "primary">("light");

  const logo = (
    <div className="flex items-center gap-2 font-bold tracking-tight">
      <div className="size-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 ring-1 ring-white/20">
        <Zap className="size-5 text-primary-foreground fill-primary-foreground" />
      </div>
      <span className="hidden sm:inline-block">AppShell Pro</span>
    </div>
  );

  const actions = (
    <div className="flex items-center gap-1 sm:gap-2">
      <button className="p-2 rounded-full hover:bg-accent/50 transition-colors relative">
        <Bell className="size-5" />
        <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full border-2 border-background" />
      </button>
      <button className="hidden sm:flex p-2 rounded-full hover:bg-accent/50 transition-colors">
        <Settings className="size-5" />
      </button>
      <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 border-2 border-background shadow-sm ml-1" />
    </div>
  );

  const nav = (
    <HeaderNav>
      <HeaderNavItem label="Feed" active />
      <HeaderNavItem label="Discover" />
      <HeaderNavItem label="Community" />
    </HeaderNav>
  );

  const mobileMenu = (
    <div className="grid gap-4 py-4">
      <div className="flex flex-col gap-2">
        <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Menu</h4>
        <NavItem icon={<Home className="size-4" />} label="Home" active />
        <NavItem icon={<Search className="size-4" />} label="Search" />
        <NavItem icon={<Bell className="size-4" />} label="Notifications" />
        <NavItem icon={<Mail className="size-4" />} label="Messages" />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Theme</h4>
        <div className="flex gap-2 p-2">
          {(["light", "dark", "primary"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "flex-1 py-2 text-xs font-medium rounded-lg border capitalize transition-all",
                theme === t ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-muted/50 hover:bg-muted"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AppShell safeArea className="bg-background">
      <Header
        logo={logo}
        actions={actions}
        nav={nav}
        theme={theme}
        behavior="reveal-nav-context"
        title="Experience the Future"
        subtitle="The most powerful app shell for React applications."
        searchContent={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        }
        mobileMenu={mobileMenu}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        side="left"
        className="border-r"
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="size-6 fill-primary" />
            </div>
            <div>
              <h3 className="font-bold">AppShell Pro</h3>
              <p className="text-xs text-muted-foreground">Premium Edition</p>
            </div>
          </div>

          <NavGroup title="Main">
            <NavItem icon={<Home className="size-5" />} label="Dashboard" active />
            <NavItem icon={<Layout className="size-5" />} label="Layouts" badge={12} />
            <NavItem icon={<Smartphone className="size-5" />} label="Mobile" />
          </NavGroup>

          <NavGroup title="Features">
            <NavItem icon={<Shield className="size-5" />} label="Security" />
            <NavItem icon={<Palette className="size-5" />} label="Themes" />
            <NavItem icon={<Sparkles className="size-5" />} label="Animations" />
          </NavGroup>
        </div>
      </Sidebar>

      <Content className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-10">
          {/* Welcome Card */}
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-2xl shadow-primary/20">
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl font-bold tracking-tight">Welcome to the Pro Showcase</h2>
              <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                This example demonstrates all the power of appshell-react: 
                reveal animations, spring-based motion, safe areas, and 
                premium UI components working in harmony.
              </p>
              <button className="mt-6 inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl text-primary font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform">
                Get Started
                <ChevronRight className="size-4" />
              </button>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 size-96 bg-black/10 rounded-full blur-3xl" />
          </div>

          {/* Feature Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { 
                icon: Home, 
                title: "Responsive Sidebar", 
                desc: "Touch-optimized sidebar with seamless transitions.",
                color: "bg-blue-500/10 text-blue-500" 
              },
              { 
                icon: Layout, 
                title: "Reveal Headers", 
                desc: "Intelligent headers that hide on scroll and reveal on up-swipe.",
                color: "bg-purple-500/10 text-purple-500" 
              },
              { 
                icon: Smartphone, 
                title: "Safe Area Support", 
                desc: "Perfect layout on devices with notches and home indicators.",
                color: "bg-emerald-500/10 text-emerald-500" 
              },
              { 
                icon: Sparkles, 
                title: "Premium Motion", 
                desc: "Powered by Framer Motion for that high-end interactive feel.",
                color: "bg-orange-500/10 text-orange-500" 
              },
            ].map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl border bg-card hover:bg-accent/50 transition-all hover:shadow-xl hover:shadow-black/5">
                <div className={cn("size-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", f.color)}>
                  <f.icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Long Content for Scroll Testing */}
          <div className="space-y-8 pb-20">
            <h3 className="text-2xl font-bold tracking-tight px-2">Recent Activity</h3>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl border bg-muted/30">
                <div className="size-12 rounded-full bg-muted shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-muted rounded" />
                  <div className="h-3 w-full bg-muted/60 rounded" />
                  <div className="h-3 w-2/3 bg-muted/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>

      <Footer behavior="auto-hide" variant="tab-bar">
        <FooterItem
          icon={<Home className="size-6" />}
          label="Home"
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />
        <FooterItem
          icon={<Search className="size-6" />}
          label="Explore"
          active={activeTab === "explore"}
          onClick={() => setActiveTab("explore")}
        />
        <FooterItem
          icon={<PlusSquare className="size-6" />}
          label="Create"
          active={activeTab === "create"}
          onClick={() => setActiveTab("create")}
        />
        <FooterItem
          icon={<Heart className="size-6" />}
          label="Activity"
          active={activeTab === "activity"}
          onClick={() => setActiveTab("activity")}
          badge={5}
        />
        <FooterItem
          icon={<Menu className="size-6" />}
          label="Menu"
          active={sidebarOpen}
          onClick={() => setSidebarOpen(true)}
        />
      </Footer>
    </AppShell>
  );
}
