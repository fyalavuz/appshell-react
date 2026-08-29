"use client";

import { useEffect, useState } from "react";
import {
  AppShell,
  Content,
  Footer,
  FooterItem,
  Header,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
  NavGroup,
  NavItem,
  SearchField,
  Sidebar,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Archive,
  Bell,
  Bookmark,
  Compass,
  Home,
  Leaf,
  Menu,
  Plus,
  User,
  Users,
} from "lucide-react";
import { Avatar, MediaBlock } from "@/components/demos/demo-ui";
import { defaultConfig, type PlaygroundConfig } from "../config";

const notes = [
  {
    author: "Iris Chandra",
    initials: "IC",
    time: "07:40",
    title: "Fog over the ridge",
    text: "Left the trailhead before sunrise. The valley was a sea of cloud until eight — by the time it burned off we were already at the saddle.",
    media: true,
  },
  {
    author: "Tomás Vega",
    initials: "TV",
    time: "09:15",
    title: "Sourdough, attempt nine",
    text: "Longer cold proof, hotter oven, and finally an ear worth photographing. Crumb still a little tight near the base.",
    media: false,
  },
  {
    author: "June Park",
    initials: "JP",
    time: "11:02",
    title: "Reading notes — The Peregrine",
    text: "Baker watched one stretch of Essex coastline for ten winters and made it feel like the edge of the known world.",
    media: false,
  },
  {
    author: "Iris Chandra",
    initials: "IC",
    time: "13:30",
    title: "Field sketching",
    text: "Thirty-second gesture sketches of gulls. The first twenty are terrible and that is exactly the exercise.",
    media: true,
  },
  {
    author: "Ansel Roy",
    initials: "AR",
    time: "16:44",
    title: "Darkroom day",
    text: "Printed the harbor series at grade 3. The fog negatives needed a full stop more than expected.",
    media: false,
  },
  {
    author: "June Park",
    initials: "JP",
    time: "19:20",
    title: "Evening list",
    text: "Repot the fig. Fix the squeaky pedal. Answer Maren's letter properly, on paper, with the good pen.",
    media: false,
  },
];

// Hamburger visibility must match the docked sidebar's breakpoint.
const menuGate: Record<string, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  none: "hidden",
};

function FieldnotesNav() {
  return (
    <div className="p-2">
      <NavGroup title="Browse" defaultOpen>
        <NavItem icon={<Home className="size-4" />} label="Today" active />
        <NavItem icon={<Compass className="size-4" />} label="Library" />
        <NavItem icon={<Users className="size-4" />} label="People" />
      </NavGroup>
      <NavGroup title="Collections" defaultOpen>
        <NavItem icon={<Bookmark className="size-4" />} label="Saved" />
        <NavItem icon={<Archive className="size-4" />} label="Archive" />
      </NavGroup>
    </div>
  );
}

export default function PlaygroundPreviewPage() {
  const [config, setConfig] = useState<PlaygroundConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "playground:config" && event.data.config) {
        setConfig({ ...defaultConfig, ...event.data.config });
      }
    };
    window.addEventListener("message", onMessage);
    // Ask the parent for the current config once mounted.
    window.parent?.postMessage(
      { type: "playground:ready" },
      window.location.origin
    );
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const contentPadding =
    config.footer === "tab-bar"
      ? "pb-24"
      : config.footer === "floating"
        ? "pb-28"
        : config.footer === "mini"
          ? "pb-16"
          : "pb-8";

  const showMenuButton =
    config.sidebar === "overlay" ||
    (config.sidebar === "docked" && config.sidebarBreakpoint !== "none");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea={config.safeArea} key={config.safeArea ? "sa" : "no-sa"}>
        <Header
          key={`${config.behavior}-${config.theme}-${config.speed}`}
          behavior={config.behavior}
          theme={config.theme}
          speed={config.speed}
          className={
            config.theme === "none"
              ? "border-b border-dashed border-emerald-400 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
              : undefined
          }
          logo={
            <span className="flex items-center gap-1.5">
              {showMenuButton && (
                <button
                  type="button"
                  aria-label="Open menu"
                  onClick={() => setSidebarOpen(true)}
                  className={
                    config.sidebar === "docked"
                      ? `-ml-1.5 rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100 ${menuGate[config.sidebarBreakpoint]}`
                      : "-ml-1.5 rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100"
                  }
                >
                  <Menu className="size-5" />
                </button>
              )}
              <span className="flex items-center gap-2 font-bold tracking-tight">
                <Leaf className="size-5" />
                Fieldnotes
              </span>
            </span>
          }
          actions={
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-full p-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <Bell className="size-5" />
            </button>
          }
          nav={
            config.showNav ? (
              <HeaderNav>
                <HeaderNavItem label="Today" active />
                <HeaderNavItem label="Library" />
                <HeaderNavItem label="People" />
              </HeaderNav>
            ) : undefined
          }
          title={config.showContext ? "Today" : undefined}
          subtitle={
            config.showContext ? "Six new notes from your circle" : undefined
          }
          searchContent={
            config.showSearch ? (
              <SearchField
                variant={config.searchVariant}
                placeholder="Search notes"
              />
            ) : undefined
          }
        />

        {config.sidebar === "overlay" && (
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
            <FieldnotesNav />
          </Sidebar>
        )}

        {config.sidebar === "docked" && (
          <Sidebar
            variant="docked"
            breakpoint={config.sidebarBreakpoint}
            collapsible={config.sidebarCollapsible}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          >
            <FieldnotesNav />
          </Sidebar>
        )}

        <Content className={contentPadding}>
          {notes.map((note) => (
            <article key={note.title} className="border-b px-4 py-4">
              <div className="flex gap-3">
                <Avatar initials={note.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-semibold">
                      {note.author}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {note.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium">{note.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {note.text}
                  </p>
                  {note.media && (
                    <MediaBlock className="mt-3 h-36">
                      <Leaf
                        className="size-7 text-muted-foreground/40"
                        strokeWidth={1.5}
                      />
                    </MediaBlock>
                  )}
                </div>
              </div>
            </article>
          ))}
          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            End of today&rsquo;s notes
          </p>
        </Content>

        {config.footer === "tab-bar" && (
          <Footer variant="tab-bar" behavior={config.footerBehavior}>
            <FooterItem
              icon={<Home className="size-5" />}
              label="Home"
              active={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            />
            <FooterItem
              icon={<Compass className="size-5" />}
              label="Explore"
              active={activeTab === "explore"}
              onClick={() => setActiveTab("explore")}
            />
            <FooterItem
              icon={<Bookmark className="size-5" />}
              label="Saved"
              badge={2}
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
            />
            <FooterItem
              icon={<User className="size-5" />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
          </Footer>
        )}

        {config.footer === "floating" && (
          <Footer
            variant="floating"
            behavior={config.footerBehavior}
            position={config.footerPosition}
          >
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-primary py-3.5 pl-5 pr-6 text-sm font-semibold text-primary-foreground shadow-lg"
            >
              <Plus className="size-4" />
              New note
            </button>
          </Footer>
        )}

        {config.footer === "mini" && (
          <Footer variant="mini" behavior={config.footerBehavior}>
            <div className="flex w-full items-center gap-3">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="truncate text-xs font-medium">
                Syncing 3 notes…
              </span>
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                2.1 MB
              </span>
            </div>
          </Footer>
        )}
      </AppShell>
    </MotionProvider>
  );
}
