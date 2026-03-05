"use client";

import {
  AppShell,
  Content,
  MotionProvider,
  Header,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Camera } from "lucide-react";
import { PhotoGallery } from "@/components/examples/photo-gallery";
import { SearchFilter } from "@/components/examples/search-filter";

export default function RevealAllPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Camera className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Discover</span>
            </div>
          }
          title="Explore Photography"
          subtitle="Curated galleries from around the world"
          searchContent={<SearchFilter />}
        />
        <Content className="pb-8">
          <PhotoGallery />
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
