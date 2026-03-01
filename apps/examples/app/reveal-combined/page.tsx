"use client";

import {
  AppShell,
  Header,
  Content,
  Footer,
  FooterItem,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Home, Search, Library, PlusCircle, User, SlidersHorizontal, Github, Bell, Settings } from "lucide-react";
import { PhotoGallery } from "../_shared/photo-gallery";

export default function RevealCombinedPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-zinc-950 flex items-center justify-center">
                <div className="size-4 rounded bg-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Platform</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Projects" active href="#" />
              <HeaderNavItem label="Deployments" href="#" />
              <HeaderNavItem label="Monitoring" href="#" />
              <HeaderNavItem label="Logs" href="#" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Bell className="size-5" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Settings className="size-5" />
              </button>
              <div className="h-6 w-px bg-border mx-1" />
              <button
                type="button"
                className="size-8 rounded-full bg-accent flex items-center justify-center overflow-hidden"
              >
                <User className="size-5 text-muted-foreground" />
              </button>
            </div>
          }
          title="Active Projects"
          subtitle="Real-time status of your global infrastructure"
          searchContent={
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects or clusters..."
                  className="w-full rounded-md border border-input bg-muted/50 py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none transition-all"
                />
              </div>
            </div>
          }
        />

        <Content className="pb-24 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 p-6 rounded-xl bg-card border shadow-sm">
              <h2 className="text-xl font-bold mb-2">Interface Interaction</h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                This layout demonstrates high-density content management. The header utilizes a 
                reveal-all behavior, maximizing vertical space during active work while 
                ensuring navigation is immediately accessible on minimal upward scroll.
                The tab bar footer automatically hides during downward exploration.
              </p>
            </div>
            <PhotoGallery />
          </div>
        </Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem icon={<Home className="size-5" />} label="Home" active />
          <FooterItem icon={<Search className="size-5" />} label="Search" />
          <FooterItem icon={<PlusCircle className="size-5" />} label="Create" />
          <FooterItem icon={<Library className="size-5" />} label="Library" />
          <FooterItem icon={<User className="size-5" />} label="Account" />
        </Footer>
      </AppShell>

      {/* Floating behavior indicator */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 hidden sm:block">
        <div className="flex flex-col gap-1.5 rounded-xl bg-zinc-950/90 backdrop-blur-md p-3 border border-white/10 shadow-2xl text-white/90">
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
            HEADER: reveal-all
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            FOOTER: auto-hide
          </div>
        </div>
      </div>
    </MotionProvider>
  );
}
