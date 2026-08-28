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
  Aperture,
  Camera,
  Film,
  Heart,
  Image,
  MessageCircle,
  Pencil,
  Repeat2,
  Settings,
  Sun,
} from "lucide-react";
import { Avatar, DemoHint, MediaBlock } from "@/components/demos/demo-ui";

type TabId = "posts" | "replies" | "media" | "likes";

const tabs: { id: TabId; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "replies", label: "Replies" },
  { id: "media", label: "Media" },
  { id: "likes", label: "Likes" },
];

const posts = [
  {
    time: "2h",
    text: "Design systems tip: name tokens after intent, not appearance. --color-accent survives a rebrand. --color-blue does not.",
    likes: 348,
    replies: 42,
    reposts: 87,
    media: false,
  },
  {
    time: "5h",
    text: "Sketching session for the new onboarding flow. Paper first, pixels later — the eraser is still the best undo.",
    likes: 156,
    replies: 12,
    reposts: 9,
    media: true,
  },
  {
    time: "1d",
    text: "Hot take after 40 usability sessions: users don't read tooltips. They read button labels. Spend your words there.",
    likes: 892,
    replies: 130,
    reposts: 214,
    media: false,
  },
  {
    time: "2d",
    text: "Desk setup, Thursday edition. Minimalism is a constant negotiation with cable clutter.",
    likes: 231,
    replies: 19,
    reposts: 6,
    media: true,
  },
  {
    time: "4d",
    text: "Shipped dark mode across the whole design system today. 214 components, 3 tokens changed. That's the entire point of tokens.",
    likes: 1043,
    replies: 96,
    reposts: 310,
    media: false,
  },
];

const replies = [
  {
    to: "@tomo",
    context:
      "Anyone have a good system for organizing Figma libraries across teams?",
    text: "One library per platform, one page per component family, and a changelog page you actually maintain. Boring beats clever here.",
    time: "3h",
    likes: 64,
  },
  {
    to: "@priya",
    context: "Is a 4pt spacing grid overkill for mobile?",
    text: "It pays off the day two teams ship screens side by side and they just… line up. 4pt on mobile, 8pt everywhere else.",
    time: "6h",
    likes: 41,
  },
  {
    to: "@marcus",
    context: "Portfolio question — full case studies or a visual gallery?",
    text: "Case studies, but cut them in half. Hiring managers skim; make the decisions scannable and the outcomes loud.",
    time: "1d",
    likes: 88,
  },
  {
    to: "@elin",
    context: "How do you run async design critique without it dragging on?",
    text: "Recorded walkthrough, 48-hour comment window, one live session for the gnarly threads. Async surfaces better feedback than a room.",
    time: "2d",
    likes: 57,
  },
];

const mediaTiles = [
  { icon: Pencil, label: "Onboarding sketches", tint: "bg-indigo-100/70 text-indigo-400 dark:bg-indigo-950/30 dark:text-indigo-700" },
  { icon: Sun, label: "Studio, golden hour", tint: "bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-600" },
  { icon: Camera, label: "Desk setup", tint: "bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600" },
  { icon: Aperture, label: "Type specimens", tint: "bg-indigo-100/70 text-indigo-400 dark:bg-indigo-950/30 dark:text-indigo-700" },
  { icon: Film, label: "Prototype walkthrough", tint: "bg-stone-100 text-stone-400 dark:bg-stone-900 dark:text-stone-600" },
  { icon: Image, label: "Moodboard v3", tint: "bg-indigo-100/70 text-indigo-400 dark:bg-indigo-950/30 dark:text-indigo-700" },
];

const likedPosts = [
  {
    author: "Teo Marchetti",
    handle: "@teo",
    initials: "TM",
    text: "The best design feedback starts with “what problem were you solving?” — everything else is preference.",
    time: "4h",
    likes: 1287,
  },
  {
    author: "Priya Anand",
    handle: "@priya",
    initials: "PA",
    text: "Grid systems are like good typography: invisible when right, unmissable when wrong.",
    time: "9h",
    likes: 764,
  },
  {
    author: "Elin Sorensen",
    handle: "@elin",
    initials: "ES",
    text: "Accessibility isn't a feature ticket. It's a definition of done.",
    time: "1d",
    likes: 2941,
  },
  {
    author: "Marcus Bell",
    handle: "@marcus",
    initials: "MB",
    text: "Rewrote my resume like a product spec sheet. Recruiter replies up 3x. Design works.",
    time: "2d",
    likes: 538,
  },
];

function PostCard({ post }: { post: (typeof posts)[number] }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="border-b px-4 py-4">
      <div className="flex gap-3">
        <Avatar initials="NR" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5 text-sm">
            <span className="font-semibold">Nadia Reyes</span>
            <span className="text-muted-foreground">@nadia · {post.time}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed">{post.text}</p>
          {post.media && (
            <MediaBlock className="mt-3 h-44 bg-indigo-100/70 dark:bg-indigo-950/30">
              <Image
                className="size-8 text-indigo-300 dark:text-indigo-800"
                strokeWidth={1.5}
                aria-hidden
              />
            </MediaBlock>
          )}
          <div className="mt-3 flex items-center gap-1 text-muted-foreground">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                liked
                  ? "text-indigo-600 dark:text-indigo-400"
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
          </div>
        </div>
      </div>
    </article>
  );
}

export default function StickyTabsPage() {
  const [tab, setTab] = useState<TabId>("posts");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <span className="flex size-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                O
              </span>
              Orbit
            </span>
          }
          actions={
            <button
              type="button"
              aria-label="Settings"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <Settings className="size-5" />
            </button>
          }
          title="Nadia Reyes"
          subtitle="@nadia · Product designer"
        />

        {/* Sticky tab row — docks below the fixed header via --header-height */}
        <div
          style={{ top: "var(--header-height)" }}
          className="sticky z-40 border-b bg-background/95 backdrop-blur"
        >
          <div className="flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative flex-1 py-3 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        <Content className="pb-20">
          <DemoHint>
            Scroll down — the tab row hitches below the fixed header. Switch
            tabs while everything stays docked.
          </DemoHint>

          {tab === "posts" && (
            <>
              {posts.map((post) => (
                <PostCard key={post.time} post={post} />
              ))}
              <p className="px-4 py-10 text-center text-xs text-muted-foreground">
                Joined March 2021 · 248 posts
              </p>
            </>
          )}

          {tab === "replies" && (
            <>
              {replies.map((r) => (
                <article key={r.to + r.time} className="border-b px-4 py-4">
                  <p className="text-xs text-muted-foreground">
                    Replying to{" "}
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {r.to}
                    </span>
                  </p>
                  <p className="mt-1.5 border-l-2 pl-3 text-xs italic leading-relaxed text-muted-foreground">
                    {r.context}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <Avatar
                      initials="NR"
                      className="size-8 bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-1.5 text-sm">
                        <span className="font-semibold">Nadia Reyes</span>
                        <span className="text-muted-foreground">{r.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed">{r.text}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Heart className="size-3.5" /> {r.likes}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
              <p className="px-4 py-10 text-center text-xs text-muted-foreground">
                That&rsquo;s every reply from the last week
              </p>
            </>
          )}

          {tab === "media" && (
            <>
              <div className="grid grid-cols-2 gap-3 px-4 pt-1">
                {mediaTiles.map((m) => (
                  <figure key={m.label}>
                    <div
                      className={`flex aspect-[4/5] items-center justify-center rounded-xl ${m.tint}`}
                    >
                      <m.icon className="size-7" strokeWidth={1.5} aria-hidden />
                    </div>
                    <figcaption className="mt-1.5 truncate text-xs text-muted-foreground">
                      {m.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="px-4 py-10 text-center text-xs text-muted-foreground">
                6 of 34 uploads
              </p>
            </>
          )}

          {tab === "likes" && (
            <>
              {likedPosts.map((p) => (
                <article key={p.handle} className="border-b px-4 py-4">
                  <div className="flex gap-3">
                    <Avatar initials={p.initials} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-1.5 text-sm">
                        <span className="truncate font-semibold">{p.author}</span>
                        <span className="truncate text-muted-foreground">
                          {p.handle} · {p.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed">{p.text}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400">
                        <Heart className="size-3.5 fill-current" /> {p.likes}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
              <p className="px-4 py-10 text-center text-xs text-muted-foreground">
                Liked recently
              </p>
            </>
          )}
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
