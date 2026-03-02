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
import { SearchFilter } from "../_shared/search-filter";
import { IndicatorPill } from "../_shared/indicator-pill";
import { PhotoGallery } from "../_shared/photo-gallery";

export default function RevealTopContentPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-nav-context"
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
          subtitle="Reveals top bar + content row on scroll up"
          searchContent={<SearchFilter />}
          actions={
            <button
              type="button"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Upload
            </button>
          }
        />

        <Content className="pb-12">
          <PhotoGallery />
        </Content>
      </AppShell>

      <IndicatorPill>
        behavior=&quot;reveal-nav-context&quot;
        <span className="text-background/40 mx-0.5">|</span>
        <span className="text-background/60 font-sans font-normal">
          theme=&quot;light&quot;
        </span>
      </IndicatorPill>
    </MotionProvider>
  );
}
