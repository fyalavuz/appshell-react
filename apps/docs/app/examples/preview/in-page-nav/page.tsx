"use client";

import { useState, useEffect, useRef } from "react";
import {
  AppShell,
  Content,
  MotionProvider,
  Header,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { BookOpen } from "lucide-react";

const sections = [
  { id: "overview", title: "Overview", content: "AppShell provides a comprehensive set of mobile-first layout components for React applications. It handles safe areas, headers, footers, sidebars, and more with an intuitive API." },
  { id: "installation", title: "Installation", content: "Install AppShell using your preferred package manager. The library has zero required dependencies and works with any styling solution." },
  { id: "usage", title: "Basic Usage", content: "Wrap your app with the AppShell component and use Header, Content, and Footer to structure your layout. Each component is highly customizable." },
  { id: "theming", title: "Theming", content: "AppShell uses CSS custom properties for theming, making it compatible with shadcn/ui tokens. Dark mode is supported out of the box." },
  { id: "animations", title: "Animations", content: "Animations are optional. You can use the built-in CSS animations or add Framer Motion for spring-based physics animations." },
  { id: "examples", title: "Examples", content: "Check out our collection of examples showing various header behaviors, footer variants, and layout patterns." },
];

export default function InPageNavPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
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
              <div className="size-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <BookOpen className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Docs</span>
            </div>
          }
          title="Getting Started"
        />

        {/* Sticky pill nav - uses var(--header-height) */}
        <div
          style={{ top: "var(--header-height, 3.5rem)" }}
          className="sticky z-40 bg-background/95 backdrop-blur-sm border-b"
        >
          <nav className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        <Content className="pb-12">
          <div className="p-4 space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => { sectionRefs.current[section.id] = el; }}
                className="scroll-mt-28"
              >
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                <div className="mt-4 rounded-xl bg-muted/50 p-6 h-48 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    {section.title} content placeholder
                  </span>
                </div>
              </section>
            ))}
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
