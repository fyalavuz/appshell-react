"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Header,
  MotionProvider,
  NotificationItem,
  NotificationsMenu,
  SearchField,
  SearchModal,
  UserMenu,
  UserMenuItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  BookOpen,
  Cloud,
  Compass,
  FileText,
  LogOut,
  MessageSquare,
  Rocket,
  Settings,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const articles = [
  { title: "Getting started with Nimbus", category: "Basics", icon: Compass, minutes: 4 },
  { title: "Organizing spaces and collections", category: "Basics", icon: BookOpen, minutes: 6 },
  { title: "Importing docs from other tools", category: "Basics", icon: FileText, minutes: 5 },
  { title: "Keyboard shortcuts that matter", category: "Productivity", icon: Sparkles, minutes: 3 },
  { title: "Templates for meeting notes", category: "Productivity", icon: FileText, minutes: 4 },
  { title: "Automations and scheduled digests", category: "Productivity", icon: Wrench, minutes: 8 },
  { title: "Sharing and permission levels", category: "Collaboration", icon: User, minutes: 5 },
  { title: "Comments, mentions, and inbox zero", category: "Collaboration", icon: BookOpen, minutes: 6 },
  { title: "Publishing a public knowledge base", category: "Collaboration", icon: Cloud, minutes: 7 },
  { title: "Backups and version history", category: "Admin", icon: Settings, minutes: 4 },
  { title: "SSO and directory sync", category: "Admin", icon: Settings, minutes: 9 },
  { title: "Usage analytics for admins", category: "Admin", icon: Wrench, minutes: 5 },
];

function ArticleRow({
  article,
  onSelect,
}: {
  article: (typeof articles)[number];
  onSelect?: () => void;
}) {
  const Icon = article.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{article.title}</span>
        <span className="block text-xs text-muted-foreground">
          {article.category} · {article.minutes} min read
        </span>
      </span>
    </button>
  );
}

const initialNotifications = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Mara commented on your doc",
    description: "“The shortcuts table is exactly what was missing.”",
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    icon: Rocket,
    title: "Knowledge base published",
    description: "Your public help center is live at help.nimbus.app.",
    time: "1h",
    unread: true,
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Weekly digest ready",
    description: "12 article updates across 3 spaces.",
    time: "yesterday",
    unread: false,
  },
];

export default function SearchCommandPage() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () =>
    setNotifications((current) => current.map((n) => ({ ...n, unread: false })));
  const markRead = (id: number) =>
    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="sticky"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Cloud className="size-5 text-sky-500" />
              Nimbus
            </span>
          }
          actions={
            <>
              <NotificationsMenu
                unreadCount={unreadCount}
                action={
                  unreadCount > 0 ? (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Mark all read
                    </button>
                  ) : undefined
                }
              >
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <NotificationItem
                      key={n.id}
                      icon={<Icon />}
                      title={n.title}
                      description={n.description}
                      time={n.time}
                      unread={n.unread}
                      onClick={() => markRead(n.id)}
                    />
                  );
                })}
              </NotificationsMenu>
              <UserMenu
                username="Mara Kealoha"
                detail="mara@nimbus.app"
                initials="MK"
              >
                <UserMenuItem icon={<User />} label="Profile" onClick={() => {}} />
                <UserMenuItem
                  icon={<Settings />}
                  label="Settings"
                  onClick={() => {}}
                />
                <UserMenuItem
                  icon={<LogOut />}
                  label="Log out"
                  destructive
                  onClick={() => {}}
                />
              </UserMenu>
            </>
          }
          searchContent={
            <SearchField
              placeholder="Search articles"
              value={query}
              onChange={setQuery}
              onClick={() => setSearchOpen(true)}
            />
          }
        />

        <Content className="mx-auto w-full max-w-2xl pb-16 sm:border-x">
          <DemoHint>
            Tap the search field — the full search modal opens with whatever
            you typed. Up in the corner, the bell and the avatar each open
            their own menu; opening one closes the other.
          </DemoHint>

          <div className="px-4 pb-2 pt-1">
            <p className="eyebrow text-muted-foreground/70">Popular guides</p>
          </div>
          <div className="divide-y">
            {articles.map((a) => (
              <ArticleRow key={a.title} article={a} />
            ))}
          </div>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Can&rsquo;t find it? Search covers every article, space, and
            comment.
          </p>
        </Content>

        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          defaultQuery={query}
          placeholder="Search the knowledge base"
          onSubmit={() => setSearchOpen(false)}
        >
          {(q) => {
            const matches = articles.filter((a) =>
              `${a.title} ${a.category}`.toLowerCase().includes(q.toLowerCase())
            );
            if (q && matches.length === 0) {
              return (
                <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Nothing for &ldquo;{q}&rdquo; — try a different word.
                </p>
              );
            }
            return (
              <div className="py-1">
                <p className="px-4 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                  {q ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "Suggested"}
                </p>
                {matches.map((a) => (
                  <ArticleRow
                    key={a.title}
                    article={a}
                    onSelect={() => setSearchOpen(false)}
                  />
                ))}
              </div>
            );
          }}
        </SearchModal>
      </AppShell>
    </MotionProvider>
  );
}
