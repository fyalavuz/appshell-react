"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
  Footer,
  FooterItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Home,
  Search,
  Bell,
  Mail,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Repeat2,
} from "lucide-react";

const avatars = [
  { name: "Sarah Chen", initials: "SC", color: "from-pink-500 to-rose-400" },
  {
    name: "Marcus Johnson",
    initials: "MJ",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Priya Patel",
    initials: "PP",
    color: "from-violet-500 to-purple-400",
  },
  {
    name: "Alex Rivera",
    initials: "AR",
    color: "from-amber-500 to-orange-400",
  },
  {
    name: "Jordan Lee",
    initials: "JL",
    color: "from-emerald-500 to-teal-400",
  },
  {
    name: "Taylor Kim",
    initials: "TK",
    color: "from-indigo-500 to-blue-400",
  },
  {
    name: "Casey Morgan",
    initials: "CM",
    color: "from-fuchsia-500 to-pink-400",
  },
  { name: "Sam Brooks", initials: "SB", color: "from-sky-500 to-cyan-400" },
  { name: "Dana Wilson", initials: "DW", color: "from-red-500 to-rose-400" },
  {
    name: "Riley Cooper",
    initials: "RC",
    color: "from-lime-500 to-green-400",
  },
];

const posts = [
  {
    avatar: avatars[0],
    time: "2m ago",
    text: "Just shipped the new design system update! Really proud of how the component library turned out. The accessibility improvements alone make it worth the effort.",
    likes: 42,
    comments: 8,
    shares: 3,
    image: "from-pink-100 to-rose-50",
  },
  {
    avatar: avatars[1],
    time: "15m ago",
    text: "Hot take: CSS container queries will change how we build responsive components more than media queries ever did. The future of component-driven design is here.",
    likes: 128,
    comments: 34,
    shares: 12,
    image: null,
  },
  {
    avatar: avatars[2],
    time: "1h ago",
    text: "Spent the morning optimizing our bundle size. Went from 450kb to 180kb by lazy-loading routes and tree-shaking unused imports. Performance matters!",
    likes: 89,
    comments: 15,
    shares: 7,
    image: "from-violet-100 to-purple-50",
  },
  {
    avatar: avatars[3],
    time: "2h ago",
    text: "Anyone else excited about React Server Components? The mental model shift is real but the DX improvements are worth it. No more waterfall fetching!",
    likes: 67,
    comments: 22,
    shares: 5,
    image: null,
  },
  {
    avatar: avatars[4],
    time: "3h ago",
    text: "Built a custom hook for managing form state today. Sometimes the simplest solutions are the best. No need for heavy libraries when useState does the job.",
    likes: 156,
    comments: 41,
    shares: 18,
    image: "from-emerald-100 to-teal-50",
  },
  {
    avatar: avatars[5],
    time: "4h ago",
    text: "TypeScript 5.5 type predicates are a game changer. Narrowing arrays just got so much cleaner. The TS team keeps delivering!",
    likes: 203,
    comments: 28,
    shares: 9,
    image: null,
  },
  {
    avatar: avatars[6],
    time: "5h ago",
    text: "Reminder: your CI pipeline is only as good as your test suite. Invested time in writing integration tests this week and already caught two production bugs.",
    likes: 78,
    comments: 12,
    shares: 4,
    image: "from-fuchsia-100 to-pink-50",
  },
  {
    avatar: avatars[7],
    time: "6h ago",
    text: "Just discovered the View Transitions API. The possibilities for page transitions in SPAs are incredible. No more janky route changes!",
    likes: 94,
    comments: 19,
    shares: 6,
    image: null,
  },
  {
    avatar: avatars[8],
    time: "8h ago",
    text: "Pair programming session today was incredibly productive. Two minds really are better than one when tackling complex state management problems.",
    likes: 51,
    comments: 7,
    shares: 2,
    image: "from-red-100 to-rose-50",
  },
  {
    avatar: avatars[9],
    time: "10h ago",
    text: "Published my first open source package today! A tiny utility for generating accessible color palettes. Feels great to give back to the community.",
    likes: 312,
    comments: 56,
    shares: 24,
    image: null,
  },
];

function PostCard({ post }: { post: (typeof posts)[0] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex gap-3 p-4">
        <div className="relative shrink-0">
          <div
            className={`flex size-11 items-center justify-center rounded-full bg-gradient-to-br ${post.avatar.color} text-xs font-bold text-white shadow-md ring-2 ring-white/80`}
          >
            {post.avatar.initials}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              {post.avatar.name}
            </span>
            <span className="text-[11px] text-muted-foreground/70">
              {post.time}
            </span>
          </div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/85">
            {post.text}
          </p>
          {post.image && (
            <div
              className={`mt-3 h-44 overflow-hidden rounded-xl bg-gradient-to-br ${post.image} ring-1 ring-black/[0.04]`}
            >
              <div className="flex h-full items-center justify-center opacity-[0.15]">
                <svg
                  viewBox="0 0 120 80"
                  className="size-20 text-current"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <rect
                    x="10"
                    y="10"
                    width="100"
                    height="60"
                    rx="8"
                    strokeDasharray="4 3"
                  />
                  <circle cx="38" cy="32" r="8" />
                  <path d="M10 55 l30-20 l20 15 l15-8 l35 23" />
                </svg>
              </div>
            </div>
          )}
          <div className="mt-3 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all ${
                liked
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <Heart
                className={`size-3.5 ${liked ? "fill-rose-500 text-rose-500" : ""}`}
              />
              <span className="font-medium tabular-nums">
                {liked ? post.likes + 1 : post.likes}
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
            >
              <MessageCircle className="size-3.5" />
              <span className="font-medium tabular-nums">{post.comments}</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
            >
              <Repeat2 className="size-3.5" />
              <span className="font-medium tabular-nums">{post.shares}</span>
            </button>
            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className={`ml-auto rounded-full p-1.5 transition-all ${
                saved
                  ? "text-amber-500"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <Bookmark
                className={`size-3.5 ${saved ? "fill-amber-500 text-amber-500" : ""}`}
              />
            </button>
            <button
              type="button"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted/60"
            >
              <Share2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function TabBarPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">feedflow</span>
          }
          actions={
            <button
              type="button"
              className="rounded-full p-2 hover:bg-muted transition-colors"
            >
              <MoreHorizontal className="size-5 text-muted-foreground" />
            </button>
          }
        />

        <Content className="pb-24 pt-3">
          {/* Social feed */}
          <div className="flex flex-col gap-0">
            {posts.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </div>
        </Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem
            icon={<Home className="size-5" />}
            label="Home"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <FooterItem
            icon={<Search className="size-5" />}
            label="Search"
            active={activeTab === "search"}
            onClick={() => setActiveTab("search")}
          />
          <FooterItem
            icon={<Bell className="size-5" />}
            label="Notifications"
            badge={3}
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
          <FooterItem
            icon={<Mail className="size-5" />}
            label="Messages"
            badge={12}
            active={activeTab === "messages"}
            onClick={() => setActiveTab("messages")}
          />
          <FooterItem
            icon={<User className="size-5" />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
