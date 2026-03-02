"use client";

import { useEffect, useRef, useState } from "react";
import {
  AppShell,
  Header,
  Content,
  HeaderNav,
  HeaderNavItem,
  MotionProvider,
  cn,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  BookOpen,
  Layers,
  Zap,
  Palette,
  Shield,
  Terminal,
  Puzzle,
  Globe,
} from "lucide-react";

const sections = [
  {
    id: "overview",
    icon: BookOpen,
    title: "Overview",
    content:
      "AppShell provides a composable set of layout primitives for mobile-first React applications. It handles scroll-aware headers, safe-area insets, and responsive navigation out of the box.",
    details: [
      "Scroll-aware header with multiple behavior modes",
      "CSS variable syncing for sticky siblings",
      "Safe-area insets for notched devices",
      "Tailwind CSS v4 compatible theming",
    ],
  },
  {
    id: "components",
    icon: Layers,
    title: "Components",
    content:
      "The library ships a focused set of components: AppShell, Header, Content, Footer, Sidebar, ScrollNav, and SafeArea. Each one is designed to compose with the others.",
    details: [
      "AppShell — root container with shared scroll state",
      "Header — fixed, static, reveal-all, reveal-nav behaviors",
      "Footer — tab-bar, floating, and minimal variants",
      "Sidebar — slide-out drawer with backdrop and keyboard dismiss",
    ],
  },
  {
    id: "behaviors",
    icon: Zap,
    title: "Header Behaviors",
    content:
      "The Header supports five scroll behaviors: static, fixed, sticky, reveal-all, and reveal-nav. The reveal-nav mode keeps the logo row pinned while the navigation slides away — perfect for content-heavy pages.",
    details: [
      "static — scrolls with page content",
      "fixed — always pinned to the top",
      "reveal-all — hides on scroll down, reveals everything on scroll up",
      "reveal-nav — keeps logo, hides nav row on scroll down",
    ],
  },
  {
    id: "theming",
    icon: Palette,
    title: "Theming",
    content:
      "Built on CSS custom properties and compatible with shadcn/ui token system. Supports light and dark modes with primary, dark, and light header themes.",
    details: [
      "Uses --background, --foreground, --primary tokens",
      "Header themes: primary, dark, light",
      "Dark mode via .dark class on <html>",
      "Full Tailwind CSS v4 support",
    ],
  },
  {
    id: "safe-areas",
    icon: Shield,
    title: "Safe Areas",
    content:
      "The SafeArea component and safeArea prop on AppShell handle notch and home-indicator insets automatically. No more manual env() calculations for iPhone or Android devices.",
    details: [
      "Automatic top/bottom safe-area padding",
      "Works with notched and non-notched devices",
      "Configurable edge selection (top, bottom, left, right)",
      "Footer auto-applies safe-area-inset-bottom",
    ],
  },
  {
    id: "motion",
    icon: Terminal,
    title: "Animations",
    content:
      "Bring-your-own motion library via the MotionProvider adapter pattern. Ships with a first-party Framer Motion adapter. Transitions are SSR-safe and opt-in.",
    details: [
      "MotionProvider adapter pattern (no hard dependency)",
      "Framer Motion adapter included",
      "SSR-safe — no hydration mismatches",
      "Graceful degradation when motion is disabled",
    ],
  },
  {
    id: "patterns",
    icon: Puzzle,
    title: "Layout Patterns",
    content:
      "Combine components to create complex mobile layouts: reveal header with auto-hide footer, sticky tabs below fixed header, or a sidebar with floating action button.",
    details: [
      "Reveal header + auto-hide footer",
      "Fixed header + sticky tab bar",
      "Sidebar drawer + tab bar navigation",
      "Desktop nav with responsive mobile menu",
    ],
  },
  {
    id: "accessibility",
    icon: Globe,
    title: "Accessibility",
    content:
      "All interactive components include proper ARIA attributes, keyboard navigation support, and focus management. The Sidebar traps focus and supports Escape to close.",
    details: [
      "ARIA roles and labels on all interactive elements",
      "Keyboard navigation (Tab, Escape, Arrow keys)",
      "Focus trap in Sidebar and mobile menu",
      "Reduced motion support via prefers-reduced-motion",
    ],
  },
];

export default function InPageNavPage() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="reveal-nav"
          theme="light"
          logo={
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="size-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">Docs</span>
            </div>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Guide" active />
              <HeaderNavItem label="API" />
              <HeaderNavItem label="Examples" />
              <HeaderNavItem label="Blog" />
            </HeaderNav>
          }
          title="AppShell Documentation"
          subtitle="Everything you need to build mobile-first layouts"
        />

        <Content className="pb-16 bg-muted/20">
          {/* In-page anchor nav — sticks below header */}
          <div
            className="sticky z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            style={{ top: "var(--header-height)" }}
          >
            <div className="mx-auto max-w-5xl">
              <nav className="flex items-center gap-1 overflow-x-auto px-4 py-1 no-scrollbar">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      activeId === s.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content sections */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
            <div className="space-y-12">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    if (el) sectionRefs.current.set(section.id, el);
                  }}
                  className="scroll-mt-32"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                      <section.icon className="size-5" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                    {section.content}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {section.details.map((detail, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-3 rounded-lg border bg-card p-4 text-sm"
                      >
                        <div className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="text-card-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
