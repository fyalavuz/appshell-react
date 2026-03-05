"use client";

import {
  AppShell,
  Content,
  MotionProvider,
  Header,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { FileText, Clock, User, ArrowRight } from "lucide-react";

const articles = Array.from({ length: 15 }, (_, i) => ({
  title: `Article ${i + 1}: Understanding Modern Web Development`,
  excerpt: "Learn about the latest techniques and best practices for building performant web applications.",
  author: ["Sarah Chen", "Marcus Johnson", "Priya Patel", "Alex Rivera"][i % 4],
  date: `Feb ${20 - i}, 2026`,
  readTime: `${5 + (i % 8)} min read`,
}));

export default function StaticHeaderPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="static"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <FileText className="size-5" />
              <span className="text-lg font-bold tracking-tight">Blog</span>
            </div>
          }
          title="Latest Articles"
          subtitle="Scroll to see the static header behavior"
        />

        <Content className="pb-12">
          <div className="divide-y">
            {articles.map((article, i) => (
              <article
                key={i}
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <h2 className="font-semibold text-sm">{article.title}</h2>
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="size-3" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {article.readTime}
                  </div>
                  <span className="ml-auto text-primary font-medium flex items-center gap-1">
                    Read <ArrowRight className="size-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
