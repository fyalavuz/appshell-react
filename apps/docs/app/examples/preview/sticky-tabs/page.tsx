"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { User, MapPin, Calendar, Star, Heart, MessageCircle, Grid, Bookmark } from "lucide-react";

const tabs = [
  { id: "posts", label: "Posts", icon: Grid },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "liked", label: "Liked", icon: Heart },
];

const posts = Array.from({ length: 9 }, (_, i) => ({
  gradient: [
    "from-pink-400 to-rose-500",
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
    "from-violet-400 to-purple-500",
    "from-cyan-400 to-sky-500",
    "from-red-400 to-pink-500",
    "from-green-400 to-emerald-500",
    "from-indigo-400 to-blue-500",
  ][i],
  likes: Math.floor(Math.random() * 500) + 50,
  comments: Math.floor(Math.random() * 50) + 5,
}));

export default function StickyTabsPage() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={<span className="text-lg font-bold tracking-tight">Profile</span>}
        />

        <Content className="pb-12">
          {/* Profile Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <div className="size-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                SC
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold">Sarah Chen</h1>
                <p className="text-sm text-muted-foreground">@sarahchen</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  San Francisco, CA
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Product designer and creative director. Building beautiful experiences one pixel at a time.
            </p>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div>
                <span className="font-bold">248</span>
                <span className="text-muted-foreground ml-1">Posts</span>
              </div>
              <div>
                <span className="font-bold">12.4K</span>
                <span className="text-muted-foreground ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold">892</span>
                <span className="text-muted-foreground ml-1">Following</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground">
                Follow
              </button>
              <button className="flex-1 rounded-lg border bg-background py-2 text-sm font-medium">
                Message
              </button>
            </div>
          </div>

          {/* Sticky Tabs */}
          <div
            style={{ top: "var(--header-height)" }}
            className="sticky z-40 bg-background border-b"
          >
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {posts.map((post, i) => (
              <div
                key={i}
                className={`relative aspect-square bg-gradient-to-br ${post.gradient} group cursor-pointer`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/40 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <Heart className="size-4 fill-white" />
                      <span className="text-xs font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="size-4 fill-white" />
                      <span className="text-xs font-medium">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
