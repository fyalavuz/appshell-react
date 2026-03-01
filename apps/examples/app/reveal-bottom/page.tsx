"use client";

import {
  AppShell,
  Header,
  Content,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Search, SlidersHorizontal } from "lucide-react";
import { PhotoGallery } from "../_shared/photo-gallery";

export default function RevealBottomPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-search"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">Discover</span>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Explore" active />
              <HeaderNavItem label="Collections" />
              <HeaderNavItem label="Photographers" />
              <HeaderNavItem label="Trending" />
            </HeaderNav>
          }
          title="Explore Photography"
          subtitle="Reveals the bottom row (search) on scroll up"
          searchContent={
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search photos, people, or locations..."
                  className="w-full rounded-xl border border-gray-200/80 bg-gray-50/80 py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200/80 transition-all"
                />
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl border border-gray-200/80 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
              >
                <SlidersHorizontal className="size-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          }
          actions={
            <button
              type="button"
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Upload
            </button>
          }
        />

        <Content className="pb-12">
          <PhotoGallery />
        </Content>
      </AppShell>

      {/* Floating variant indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]">
        <div className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          behavior=&quot;reveal-search&quot;
          <span className="text-white/40 mx-0.5">|</span>
          <span className="text-white/60 font-sans font-normal">
            theme=&quot;light&quot;
          </span>
        </div>
      </div>
    </MotionProvider>
  );
}
