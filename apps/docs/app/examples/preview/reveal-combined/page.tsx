"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  FooterItem,
  Header,
  MotionProvider,
  SearchField,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Bell,
  Bookmark,
  CirclePlus,
  Heart,
  House,
  Image as ImageIcon,
  MessageCircle,
  Music4,
  Repeat2,
  Search,
  User,
} from "lucide-react";
import { Avatar, DemoHint, MediaBlock } from "@/components/demos/demo-ui";

const posts = [
  {
    author: "Priya Raghavan",
    handle: "@priya",
    initials: "PR",
    time: "8m",
    text: "Finally wired the tab bar to auto-hide alongside the header. Scroll down and the content owns the whole screen; scroll up and everything is back before your thumb lifts.",
    likes: 342,
    replies: 41,
    reposts: 58,
    media: null,
  },
  {
    author: "Owen Gallagher",
    handle: "@owen",
    initials: "OG",
    time: "27m",
    text: "Recorded the last track for the EP in one take. Sometimes the demo is the record.",
    likes: 918,
    replies: 76,
    reposts: 114,
    media: "audio",
  },
  {
    author: "Lucia Ferretti",
    handle: "@lucia",
    initials: "LF",
    time: "1h",
    text: "Ninth week of baking the same sourdough. This one finally has the open crumb I was chasing. Consistency beats novelty, in bread and everything else.",
    likes: 764,
    replies: 92,
    reposts: 37,
    media: null,
  },
  {
    author: "Dev Okafor",
    handle: "@dev",
    initials: "DO",
    time: "3h",
    text: "Fog rolled over the ridge right at sunrise. Waited two hours in the cold for this one frame. Worth it.",
    likes: 1873,
    replies: 141,
    reposts: 402,
    media: "photo",
  },
  {
    author: "June Nakamura",
    handle: "@june",
    initials: "JN",
    time: "4h",
    text: "Unpopular opinion: meeting notes should be written for the people who weren't there. Future-you counts as one of them.",
    likes: 526,
    replies: 188,
    reposts: 95,
    media: null,
  },
  {
    author: "Sasha Petrov",
    handle: "@sasha",
    initials: "SP",
    time: "6h",
    text: "First cold plunge of the season. 4°C. I have never felt more awake or more foolish, simultaneously.",
    likes: 1105,
    replies: 97,
    reposts: 61,
    media: null,
  },
];

const suggestions = [
  { name: "Field Notes Daily", handle: "@fieldnotes", initials: "FN" },
  { name: "Marta Silva", handle: "@marta", initials: "MS" },
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
              {post.media === "audio" ? (
                <Music4
                  className="size-8 text-rose-300 dark:text-rose-800"
                  strokeWidth={1.5}
                />
              ) : (
                <ImageIcon
                  className="size-8 text-rose-300 dark:text-rose-800"
                  strokeWidth={1.5}
                />
              )}
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

function SuggestionRow({
  suggestion,
}: {
  suggestion: (typeof suggestions)[number];
}) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Avatar initials={suggestion.initials} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{suggestion.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {suggestion.handle}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setFollowing(!following)}
        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
          following
            ? "bg-muted text-muted-foreground"
            : "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
        }`}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default function RevealCombinedPage() {
  const [tab, setTab] = useState("home");

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
            <SearchField variant="full" placeholder="Search Pulse" />
          }
        />

        <Content className="mx-auto w-full max-w-2xl sm:border-x">
          <DemoHint>
            Scroll down — the header and the tab bar clear the screen together.
            Scroll up and both glide back in sync.
          </DemoHint>

          {posts.slice(0, 4).map((post) => (
            <PostCard key={post.handle} post={post} />
          ))}

          <div className="border-b bg-muted/30 py-2">
            <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Suggested for you
            </p>
            {suggestions.map((suggestion) => (
              <SuggestionRow key={suggestion.handle} suggestion={suggestion} />
            ))}
          </div>

          {posts.slice(4).map((post) => (
            <PostCard key={post.handle} post={post} />
          ))}

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            You&rsquo;re all caught up
          </p>
        </Content>

        <Footer variant="tab-bar" behavior="auto-hide">
          <FooterItem
            icon={<House className="size-5" />}
            label="Home"
            active={tab === "home"}
            onClick={() => setTab("home")}
          />
          <FooterItem
            icon={<Search className="size-5" />}
            label="Search"
            active={tab === "search"}
            onClick={() => setTab("search")}
          />
          <FooterItem
            icon={<CirclePlus className="size-5" />}
            label="Create"
            active={tab === "create"}
            onClick={() => setTab("create")}
          />
          <FooterItem
            icon={<Bell className="size-5" />}
            label="Alerts"
            badge={2}
            active={tab === "alerts"}
            onClick={() => setTab("alerts")}
          />
          <FooterItem
            icon={<User className="size-5" />}
            label="Profile"
            active={tab === "profile"}
            onClick={() => setTab("profile")}
          />
        </Footer>
      </AppShell>
    </MotionProvider>
  );
}
