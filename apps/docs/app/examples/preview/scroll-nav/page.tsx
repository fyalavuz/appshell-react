"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
  ScrollNav,
  ScrollNavItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Newspaper, Clock, User, BookOpen } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "tech", label: "Technology" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "science", label: "Science" },
  { id: "culture", label: "Culture" },
  { id: "sports", label: "Sports" },
  { id: "health", label: "Health" },
];

const articles = [
  { title: "The Future of AI in Healthcare", category: "tech", author: "Dr. Sarah Chen", time: "5 min" },
  { title: "Minimalist Design Principles for 2026", category: "design", author: "Marcus Webb", time: "4 min" },
  { title: "Startup Funding Trends to Watch", category: "business", author: "Alex Rivera", time: "6 min" },
  { title: "New Discovery in Quantum Physics", category: "science", author: "Dr. Priya Patel", time: "8 min" },
  { title: "The Rise of Remote Work Culture", category: "culture", author: "Jordan Lee", time: "5 min" },
  { title: "Championship Finals Preview", category: "sports", author: "Mike Thompson", time: "3 min" },
  { title: "Mental Health in the Digital Age", category: "health", author: "Dr. Emily Ross", time: "7 min" },
  { title: "Web3 and Decentralized Apps", category: "tech", author: "Kenji Tanaka", time: "6 min" },
  { title: "Typography Trends for Modern Brands", category: "design", author: "Sofia Lindgren", time: "4 min" },
  { title: "E-commerce Growth Strategies", category: "business", author: "Marcus Johnson", time: "5 min" },
];

export default function ScrollNavPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <Newspaper className="size-5" />
              <span className="text-lg font-bold tracking-tight">News</span>
            </div>
          }
          searchContent={
            <ScrollNav>
              {categories.map((cat) => (
                <ScrollNavItem
                  key={cat.id}
                  label={cat.label}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </ScrollNav>
          }
        />

        <Content className="pb-12">
          <div className="p-4 space-y-3">
            {filteredArticles.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <BookOpen className="size-12 mx-auto mb-4 opacity-50" />
                <p>No articles in this category</p>
              </div>
            ) : (
              filteredArticles.map((article, i) => (
                <article
                  key={i}
                  className="rounded-xl border bg-card p-4 shadow-sm hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="font-semibold">{article.title}</h2>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {article.time} read
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
