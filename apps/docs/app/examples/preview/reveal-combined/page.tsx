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
import { Home, Search, Compass, Bell, User, Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";

const posts = [
  {
    author: "Sarah Chen",
    initials: "SC",
    color: "from-pink-500 to-rose-400",
    time: "2h ago",
    content: "Just finished my morning hike! The view from the summit was absolutely breathtaking. Sometimes you need to disconnect to reconnect.",
    likes: 847,
    comments: 56,
    gradient: "from-emerald-100 to-teal-50",
  },
  {
    author: "Marcus Lee",
    initials: "ML",
    color: "from-blue-500 to-cyan-400",
    time: "4h ago",
    content: "New personal record at the gym today! Consistency is key. Who else is working on their fitness goals this year?",
    likes: 432,
    comments: 89,
    gradient: null,
  },
  {
    author: "Emma Wilson",
    initials: "EW",
    color: "from-violet-500 to-purple-400",
    time: "6h ago",
    content: "Reading recommendations? I just finished an amazing book on design thinking and looking for my next read.",
    likes: 156,
    comments: 203,
    gradient: "from-amber-100 to-orange-50",
  },
  {
    author: "Alex Rivera",
    initials: "AR",
    color: "from-amber-500 to-orange-400",
    time: "8h ago",
    content: "Coffee shop hopping today. Found this hidden gem with the best cold brew I've ever had. Supporting local businesses!",
    likes: 628,
    comments: 34,
    gradient: null,
  },
  {
    author: "Jordan Kim",
    initials: "JK",
    color: "from-emerald-500 to-teal-400",
    time: "12h ago",
    content: "Meal prep Sunday complete! Planning ahead makes such a difference. What are your go-to recipes for the week?",
    likes: 294,
    comments: 67,
    gradient: "from-pink-100 to-rose-50",
  },
];

function PostCard({ post }: { post: (typeof posts)[0] }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="mx-4 mb-3 rounded-2xl border bg-card shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`size-10 rounded-full bg-gradient-to-br ${post.color} flex items-center justify-center text-xs font-bold text-white shadow-md`}>
            {post.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{post.author}</p>
            <p className="text-xs text-muted-foreground">{post.time}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-3">{post.content}</p>
        {post.gradient && (
          <div className={`rounded-xl bg-gradient-to-br ${post.gradient} h-40 mb-3`} />
        )}
        <div className="flex items-center gap-1 pt-2 border-t">
          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all ${
              liked ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10" : "text-muted-foreground hover:bg-muted/60"
            }`}
          >
            <Heart className={`size-3.5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
            <span className="font-medium">{liked ? post.likes + 1 : post.likes}</span>
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/60">
            <MessageCircle className="size-3.5" />
            <span className="font-medium">{post.comments}</span>
          </button>
          <button type="button" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/60">
            <Share2 className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setSaved(!saved)}
            className={`ml-auto rounded-full p-1.5 transition-all ${saved ? "text-amber-500" : "text-muted-foreground hover:bg-muted/60"}`}
          >
            <Bookmark className={`size-3.5 ${saved ? "fill-amber-500" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function RevealCombinedPage() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-all"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">social</span>
          }
          title="Your Feed"
          subtitle="See what friends are sharing"
        />

        <Content className="pb-24 pt-3">
          {posts.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
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
            icon={<Compass className="size-5" />}
            label="Explore"
            active={activeTab === "explore"}
            onClick={() => setActiveTab("explore")}
          />
          <FooterItem
            icon={<Bell className="size-5" />}
            label="Alerts"
            badge={5}
            active={activeTab === "alerts"}
            onClick={() => setActiveTab("alerts")}
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
