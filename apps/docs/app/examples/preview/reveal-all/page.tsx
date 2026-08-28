"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Header,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Bell,
  Bookmark,
  Heart,
  MessageCircle,
  Repeat2,
  Search,
} from "lucide-react";
import { Avatar, DemoHint, MediaBlock } from "@/components/demos/demo-ui";

const stories = [
  { initials: "You", self: true },
  { initials: "MK" },
  { initials: "AL" },
  { initials: "JD" },
  { initials: "RS" },
  { initials: "TW" },
  { initials: "NP" },
];

const posts = [
  {
    author: "Mara Kealoha",
    handle: "@mara",
    initials: "MK",
    time: "12m",
    text: "Shipped the new onboarding flow today. Four screens became one, and activation is already up. Deleting UI is still the best feature work.",
    likes: 218,
    replies: 34,
    reposts: 19,
    media: false,
  },
  {
    author: "Alva Lindqvist",
    handle: "@alva",
    initials: "AL",
    time: "48m",
    text: "Morning light over the harbor. No filter needed.",
    likes: 1204,
    replies: 87,
    reposts: 260,
    media: true,
  },
  {
    author: "Jonas Duarte",
    handle: "@jonas",
    initials: "JD",
    time: "2h",
    text: "Hot take: a tab bar that hides on scroll gives you back 8% of the screen exactly when you're reading. Small number, huge feel.",
    likes: 456,
    replies: 122,
    reposts: 71,
    media: false,
  },
  {
    author: "Ren Sato",
    handle: "@ren",
    initials: "RS",
    time: "3h",
    text: "Week 6 of learning woodworking. Made my first dovetail joint that doesn't wobble. Progress is slow and that's the point.",
    likes: 892,
    replies: 64,
    reposts: 33,
    media: true,
  },
  {
    author: "Tess Whitfield",
    handle: "@tess",
    initials: "TW",
    time: "5h",
    text: "Reading through old design systems from the 70s — NASA's Graphics Standards Manual still beats most modern brand guides.",
    likes: 731,
    replies: 45,
    reposts: 188,
    media: false,
  },
  {
    author: "Noor Patel",
    handle: "@noor",
    initials: "NP",
    time: "7h",
    text: "Ran my first 10k this morning. Legs: destroyed. Mood: unreasonably good.",
    likes: 1590,
    replies: 203,
    reposts: 42,
    media: false,
  },
];

function PostCard({ post }: { post: (typeof posts)[number] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="border-b px-4 py-4">
      <div className="flex gap-3">
        <Avatar initials={post.initials} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5 text-sm">
            <span className="truncate font-semibold">{post.author}</span>
            <span className="truncate text-muted-foreground">
              {post.handle} · {post.time}
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed">{post.text}</p>
          {post.media && (
            <MediaBlock className="mt-3 h-44 bg-rose-100/70 dark:bg-rose-950/30">
              <svg
                className="size-8 text-rose-300 dark:text-rose-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
              </svg>
            </MediaBlock>
          )}
          <div className="mt-3 flex items-center gap-1 text-muted-foreground">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                liked
                  ? "text-rose-600 dark:text-rose-400"
                  : "hover:bg-muted hover:text-foreground"
              }`}
            >
              <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors hover:bg-muted hover:text-foreground"
            >
              <MessageCircle className="size-4" />
              {post.replies}
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors hover:bg-muted hover:text-foreground"
            >
              <Repeat2 className="size-4" />
              {post.reposts}
            </button>
            <button
              type="button"
              aria-label="Save post"
              onClick={() => setSaved(!saved)}
              className={`ml-auto rounded-full p-1.5 transition-colors ${
                saved
                  ? "text-rose-600 dark:text-rose-400"
                  : "hover:bg-muted hover:text-foreground"
              }`}
            >
              <Bookmark className={`size-4 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function RevealAllPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <span className="flex size-6 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white">
                P
              </span>
              Pulse
            </span>
          }
          actions={
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-rose-500" />
            </button>
          }
          title="Home"
          subtitle="Catch up on today"
          searchContent={
            <label className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-muted px-3.5 py-2 text-sm text-muted-foreground">
              <Search className="size-4" />
              <input
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Search Pulse"
              />
            </label>
          }
        />

        <Content className="pb-16">
          <DemoHint>
            Scroll down — the title and search rows tuck away. Scroll up to
            bring the full header gliding back.
          </DemoHint>

          <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {stories.map((s) => (
              <div key={s.initials} className="flex flex-col items-center gap-1.5">
                <div
                  className={`rounded-full p-[2px] ${
                    s.self
                      ? "bg-border"
                      : "bg-gradient-to-tr from-rose-500 to-amber-400"
                  }`}
                >
                  <div className="rounded-full border-2 border-background">
                    <Avatar initials={s.initials} className="size-12 text-[11px]" />
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {s.self ? "Your story" : s.initials}
                </span>
              </div>
            ))}
          </div>

          {posts.map((post) => (
            <PostCard key={post.handle} post={post} />
          ))}

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            You&rsquo;re all caught up
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
