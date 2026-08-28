"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  FooterItem,
  Header,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  AtSign,
  Bell,
  Heart,
  Home,
  Image,
  Link,
  MessageCircle,
  PlusCircle,
  Repeat2,
  Search,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react";
import { Avatar, DemoHint, MediaBlock } from "@/components/demos/demo-ui";

type TabId = "home" | "search" | "create" | "activity" | "profile";

const feed = [
  {
    author: "Sofia Marchand",
    handle: "@sofia",
    initials: "SM",
    time: "8m",
    text: "Finally moved the blog off a page builder and onto plain HTML. It loads in 40ms and I understand every line. Feels like owning a house again.",
    likes: 182,
    replies: 24,
    kind: "text" as const,
  },
  {
    author: "Dev Okafor",
    handle: "@devo",
    initials: "DO",
    time: "22m",
    text: "Trail run above the fog line this morning. Worth the 5am alarm.",
    likes: 941,
    replies: 63,
    kind: "photo" as const,
  },
  {
    author: "Lena Vogel",
    handle: "@lena",
    initials: "LV",
    time: "1h",
    text: "This piece on calm technology from 1996 predicted basically every notification problem we have today.",
    likes: 356,
    replies: 41,
    kind: "link" as const,
    linkTitle: "Designing Calm Technology",
    linkSource: "calmtech.org · 8 min read",
  },
  {
    author: "Theo Brandt",
    handle: "@theo",
    initials: "TB",
    time: "2h",
    text: "Unpopular opinion: standups should be written. Fifteen minutes of talking is three sentences of typing.",
    likes: 528,
    replies: 147,
    kind: "text" as const,
  },
  {
    author: "Amara Diallo",
    handle: "@amara",
    initials: "AD",
    time: "4h",
    text: "Sourdough attempt #9. The crumb finally looks like the pictures. Persistence is a recipe ingredient.",
    likes: 764,
    replies: 52,
    kind: "photo" as const,
  },
  {
    author: "Nils Ekberg",
    handle: "@nils",
    initials: "NE",
    time: "6h",
    text: "Deleted 14 apps from my phone this weekend. The ones I kept: maps, camera, weather, and this one. Curation is underrated.",
    likes: 1120,
    replies: 89,
    kind: "text" as const,
  },
];

const trending = [
  { rank: 1, topic: "#CalmTech", posts: "12.4K posts" },
  { rank: 2, topic: "Slow productivity", posts: "8.1K posts" },
  { rank: 3, topic: "#TrailRunning", posts: "6.7K posts" },
  { rank: 4, topic: "Design tokens", posts: "5.2K posts" },
  { rank: 5, topic: "#Sourdough", posts: "4.9K posts" },
  { rank: 6, topic: "Written standups", posts: "3.3K posts" },
  { rank: 7, topic: "#DigitalMinimalism", posts: "2.8K posts" },
  { rank: 8, topic: "Personal websites", posts: "2.1K posts" },
];

const activity = [
  { icon: Heart, who: "Dev Okafor", what: "liked your post", detail: "“Deleted 14 apps from my phone…”", time: "12m", unread: true },
  { icon: UserPlus, who: "Lena Vogel", what: "followed you", detail: "", time: "34m", unread: true },
  { icon: AtSign, who: "Theo Brandt", what: "mentioned you", detail: "“…exactly what @jae was saying about written standups”", time: "1h", unread: true },
  { icon: Heart, who: "Amara Diallo", what: "liked your post", detail: "“Curation is underrated.”", time: "3h", unread: false },
  { icon: Repeat2, who: "Sofia Marchand", what: "reposted your post", detail: "“Deleted 14 apps from my phone…”", time: "5h", unread: false },
  { icon: UserPlus, who: "Nils Ekberg", what: "followed you", detail: "", time: "1d", unread: false },
  { icon: Heart, who: "412 people", what: "liked your post", detail: "“Notifications are a design choice.”", time: "2d", unread: false },
];

function FeedCard({ post }: { post: (typeof feed)[number] }) {
  const [liked, setLiked] = useState(false);

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
          {post.kind === "photo" && (
            <MediaBlock className="mt-3 h-44 bg-amber-100/70 dark:bg-amber-950/30">
              <Image
                className="size-8 text-amber-300 dark:text-amber-800"
                strokeWidth={1.5}
                aria-hidden
              />
            </MediaBlock>
          )}
          {post.kind === "link" && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border p-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Link className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{post.linkTitle}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {post.linkSource}
                </p>
              </div>
            </div>
          )}
          <div className="mt-3 flex items-center gap-1 text-muted-foreground">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                liked
                  ? "text-amber-600 dark:text-amber-400"
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
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TabBarPage() {
  const [tab, setTab] = useState<TabId>("home");

  const switchTab = (next: TabId) => {
    setTab(next);
    window.scrollTo({ top: 0 });
  };

  const items: { id: TabId; label: string; icon: typeof Home; badge?: number }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "create", label: "Create", icon: PlusCircle },
    { id: "activity", label: "Activity", icon: Bell, badge: 3 },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="sticky"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">
              Feedflow<span className="text-amber-500">.</span>
            </span>
          }
        />

        <Content className="pb-24">
          <DemoHint>
            Scroll down — the tab bar slips away. Scroll up to summon it back,
            badges intact.
          </DemoHint>

          {tab === "home" && (
            <>
              {feed.map((post) => (
                <FeedCard key={post.handle} post={post} />
              ))}
              <p className="px-4 py-8 text-center text-xs text-muted-foreground">
                You&rsquo;re all caught up
              </p>
            </>
          )}

          {tab === "search" && (
            <div className="px-4">
              <label className="flex items-center gap-2 rounded-full bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
                <Search className="size-4" />
                <input
                  className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                  placeholder="Search Feedflow"
                />
              </label>
              <h2 className="mt-6 text-sm font-semibold">Trending today</h2>
              <ul className="mt-2">
                {trending.map((t) => (
                  <li
                    key={t.rank}
                    className="flex items-center gap-3 border-b py-3.5 last:border-0"
                  >
                    <span className="w-5 text-sm font-semibold text-muted-foreground">
                      {t.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{t.topic}</p>
                      <p className="text-xs text-muted-foreground">{t.posts}</p>
                    </div>
                    <TrendingUp className="size-4 text-muted-foreground" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "create" && (
            <div className="px-4">
              <div className="flex gap-3">
                <Avatar
                  initials="JW"
                  className="bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                />
                <textarea
                  rows={5}
                  placeholder="What's on your mind?"
                  className="w-full resize-none bg-transparent pt-2 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="mt-2 flex items-center gap-1 border-t pt-3">
                <button
                  type="button"
                  aria-label="Add photo"
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
                >
                  <Image className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Add link"
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
                >
                  <Link className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Mention someone"
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
                >
                  <AtSign className="size-5" />
                </button>
                <button
                  type="button"
                  className="ml-auto rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
                >
                  Post
                </button>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Drafts are saved automatically. Your last draft:
                &ldquo;Three weeks with a paper notebook and honestly…&rdquo;
              </p>
            </div>
          )}

          {tab === "activity" && (
            <ul>
              {activity.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border-b px-4 py-3.5 last:border-0"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <a.icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.what}</span>
                    </p>
                    {a.detail && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {a.detail}
                      </p>
                    )}
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                    {a.time}
                    {a.unread && (
                      <span className="size-1.5 rounded-full bg-amber-500" />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === "profile" && (
            <div className="px-4">
              <div className="flex items-center gap-4">
                <Avatar
                  initials="JW"
                  className="size-16 text-base bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                />
                <div>
                  <h1 className="text-lg font-bold">Jae Winters</h1>
                  <p className="text-sm text-muted-foreground">@jae</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed">
                Writing about calm software and loud coffee. Weekly notes on
                building smaller, slower, better.
              </p>
              <div className="mt-4 flex gap-6 border-b pb-4 text-sm">
                <span>
                  <span className="font-bold">184</span>{" "}
                  <span className="text-muted-foreground">posts</span>
                </span>
                <span>
                  <span className="font-bold">6,204</span>{" "}
                  <span className="text-muted-foreground">followers</span>
                </span>
                <span>
                  <span className="font-bold">312</span>{" "}
                  <span className="text-muted-foreground">following</span>
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <MediaBlock
                    key={i}
                    className={`aspect-square ${
                      i % 3 === 0
                        ? "bg-amber-100/70 dark:bg-amber-950/30"
                        : "bg-muted"
                    }`}
                  >
                    <Image
                      className={`size-6 ${
                        i % 3 === 0
                          ? "text-amber-300 dark:text-amber-800"
                          : "text-muted-foreground/50"
                      }`}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </MediaBlock>
                ))}
              </div>
            </div>
          )}
        </Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          {items.map((item) => (
            <FooterItem
              key={item.id}
              icon={<item.icon className="size-5" />}
              label={item.label}
              active={tab === item.id}
              badge={item.badge}
              onClick={() => switchTab(item.id)}
              className={
                tab === item.id
                  ? "text-amber-600 dark:text-amber-400 [&>div]:bg-amber-500"
                  : undefined
              }
            />
          ))}
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
