"use client";

import { useState } from "react";
import { AppShell, Header, Content, HeaderNav, HeaderNavItem, MotionProvider, cn } from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Search, Bell, User, Clock, ArrowRight, TrendingUp, Bookmark, LayoutGrid, List, Info } from "lucide-react";

export default function StickyTabsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <LayoutGrid className="size-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">Console</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Dashboard" active />
              <HeaderNavItem label="Resources" />
              <HeaderNavItem label="Activity" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Search className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Bell className="size-5" />
              </button>
              <div className="size-8 rounded-full bg-accent ml-2 flex items-center justify-center">
                <User className="size-5 text-muted-foreground" />
              </div>
            </div>
          }
          title="Project Infrastructure"
          subtitle="Manage your cloud resources and deployment pipelines"
        />

        <Content className="pb-20">
          {/* Hero Section */}
          <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white/20">
              <LayoutGrid className="size-32" />
            </div>
          </div>

          {/* Sticky Tabs Bar */}
          <div 
            className="sticky z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6"
            style={{ top: "var(--header-height, 112px)" }}
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex h-12 items-center gap-6 overflow-x-auto no-scrollbar">
                {[
                  { id: "overview", label: "Overview", icon: Info },
                  { id: "resources", label: "Resources", icon: LayoutGrid },
                  { id: "logs", label: "Logs", icon: List },
                  { id: "settings", label: "Settings", icon: Bell },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "inline-flex items-center gap-2 border-b-2 px-1 pb-3 pt-4 text-sm font-medium transition-all hover:text-foreground",
                      activeTab === tab.id
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border"
                    )}
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="group rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                      <LayoutGrid className="size-6" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Running
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">
                    Resource Instance {i + 1}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Standard high-performance instance deployed in Region us-east-1.
                    Optimized for compute-intensive workloads.
                  </p>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t">
                    <div className="text-xs text-muted-foreground font-mono">
                      i-0a8f92b{i}
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                      Manage <ArrowRight className="size-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Content>

        {/* Behavior indicator */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 rounded-2xl bg-zinc-950/90 p-3 text-white/90 shadow-2xl backdrop-blur-md border border-white/10 sm:flex-row sm:items-center sm:rounded-full sm:px-4 sm:py-2">
          <div className="flex items-center gap-2 text-[11px] font-mono whitespace-nowrap border-b border-white/10 pb-2 sm:border-b-0 sm:pb-0 sm:pr-3 sm:border-r sm:mr-1">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
            HEADER: behavior=&quot;fixed&quot;
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono whitespace-nowrap">
            <span className="size-2 rounded-full bg-emerald-500" />
            TABS: sticky top-[112px]
          </div>
        </div>
      </AppShell>
    </MotionProvider>
  );
}
