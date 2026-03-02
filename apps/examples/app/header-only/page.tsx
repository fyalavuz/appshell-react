"use client";

import {
  AppShell,
  Header,
  HeaderNav,
  HeaderNavItem,
  Content,
  MotionProvider,
} from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Search, Bell, User, Bookmark, Share2, Heart, MessageCircle } from "lucide-react";
import { IndicatorPill } from "../_shared/indicator-pill";

export default function HeaderOnlyPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="text-lg font-bold tracking-tight">
              The<span className="text-violet-600">Reader</span>
            </span>
          }
          nav={
            <HeaderNav>
              <HeaderNavItem label="Articles" active />
              <HeaderNavItem label="Essays" />
              <HeaderNavItem label="Reviews" />
              <HeaderNavItem label="About" />
            </HeaderNav>
          }
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="size-5" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="size-5" />
              </button>
              <button
                type="button"
                className="ml-1 flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                aria-label="Profile"
              >
                <User className="size-4" />
              </button>
            </div>
          }
        />

        <Content>
          <article className="mx-auto max-w-2xl px-4 sm:px-6 pt-8 pb-16">
            {/* Article Header */}
            <div className="mb-10">
              <span className="inline-block text-sm font-semibold text-violet-600 mb-4 uppercase tracking-wider">
                Design Engineering
              </span>
              <h1 className="text-3xl sm:text-[2.5rem] font-extrabold text-foreground leading-[1.15] tracking-tight">
                The Art of Invisible Interfaces: Designing Systems That Feel Like Nothing
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                The best interfaces are the ones you never notice. They guide without commanding,
                inform without overwhelming, and adapt without drawing attention to themselves.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center justify-center size-11 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white ring-2 ring-background shadow-md">
                  <User className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Elena Vasquez</p>
                  <p className="text-sm text-muted-foreground/70">Feb 22, 2026 &middot; 12 min read</p>
                </div>
              </div>
            </div>

            {/* Article Actions */}
            <div className="flex items-center gap-4 py-4 border-y border-border mb-10">
              <button type="button" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition-colors">
                <Heart className="size-4" />
                <span className="font-medium">284</span>
              </button>
              <button type="button" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                <MessageCircle className="size-4" />
                <span className="font-medium">42</span>
              </button>
              <div className="flex-1" />
              <button type="button" className="p-1.5 text-muted-foreground/70 hover:text-foreground transition-colors" aria-label="Bookmark">
                <Bookmark className="size-4" />
              </button>
              <button type="button" className="p-1.5 text-muted-foreground/70 hover:text-foreground transition-colors" aria-label="Share">
                <Share2 className="size-4" />
              </button>
            </div>

            {/* Cover Image Placeholder with layered elements */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-100 overflow-hidden mb-10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute size-40 rounded-full border-2 border-violet-200/60 animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute size-56 rounded-full border border-violet-200/30" />
                <div className="absolute size-72 rounded-full border border-violet-200/15" />
                <div className="absolute top-6 right-8 size-12 rounded-xl bg-violet-200/40 rotate-12" />
                <div className="absolute bottom-8 left-10 size-8 rounded-full bg-fuchsia-200/50" />
                <div className="absolute top-12 left-16 size-6 rounded-md bg-purple-200/40 -rotate-6" />
              </div>
              <span className="absolute inset-0 flex items-center justify-center text-violet-400 text-sm font-medium uppercase tracking-widest">
                Cover Illustration
              </span>
            </div>

            {/* Article Body */}
            <div className="prose prose-gray max-w-none">
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                Every pixel on a screen is a decision. Every animation, every transition, every
                micro-interaction represents a choice made by someone who believed it would make
                the experience better. But the most profound design decisions are often the ones
                users never consciously perceive.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-5 tracking-tight">
                The Paradox of Great Design
              </h2>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                There is a fundamental paradox at the heart of interface design: the better
                something is designed, the less likely people are to notice the design itself.
                When navigation feels intuitive, users do not think about navigation.
                When typography is well-set, readers focus on the words, not the font.
                When animations are smooth, attention stays on the content, not the motion.
              </p>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                This is not a failure of design. It is the highest form of success. The goal
                of an interface is not to be admired but to be used, to create a bridge between
                intention and outcome that is so seamless it becomes invisible.
              </p>

              <blockquote className="relative my-10 py-6 pl-8 pr-6 border-l-4 border-violet-400 bg-violet-50/50 rounded-r-xl">
                <p className="text-foreground text-lg sm:text-xl italic leading-relaxed font-serif">
                  &ldquo;The best design is the one you do not notice. It is the one that
                  lets you accomplish what you came to do without ever making you think
                  about how you are doing it.&rdquo;
                </p>
                <footer className="mt-4 text-sm font-medium text-violet-600">
                  &mdash; Dieter Rams, paraphrased
                </footer>
              </blockquote>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-5 tracking-tight">
                Principles of Invisible Design
              </h2>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                Achieving invisibility in design requires a deep understanding of user behavior,
                cognitive load, and the subtle art of anticipation. Here are the principles
                that guide the creation of truly invisible interfaces:
              </p>

              <h3 className="text-xl font-bold text-foreground mt-10 mb-4">
                1. Reduce cognitive friction
              </h3>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                Every element that requires conscious processing adds friction. Labels should
                be self-explanatory, actions should be predictable, and layouts should follow
                established mental models. When users have to stop and think about how to use
                your interface, you have already lost them.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-10 mb-4">
                2. Anticipate, do not react
              </h3>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                The best interfaces predict what users need before they know they need it.
                Smart defaults, contextual suggestions, and progressive disclosure all work
                together to present the right information at the right time, eliminating
                unnecessary steps and decisions.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-10 mb-4">
                3. Embrace progressive complexity
              </h3>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                Start simple and reveal complexity only when needed. A beginner and an expert
                should both feel at home in the same interface. The key is layering: surface
                the essentials immediately, and let users discover advanced features naturally
                as their confidence grows.
              </p>

              {/* Diagram placeholder with layered design */}
              <div className="relative w-full h-48 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/80 border border-input overflow-hidden my-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-end gap-3 opacity-20">
                    <div className="w-8 h-12 rounded-t-md bg-gray-400" />
                    <div className="w-8 h-20 rounded-t-md bg-gray-500" />
                    <div className="w-8 h-28 rounded-t-md bg-gray-600" />
                    <div className="w-8 h-36 rounded-t-md bg-gray-700" />
                  </div>
                </div>
                <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium uppercase tracking-widest">
                  Diagram: Progressive Complexity Model
                </span>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-5 tracking-tight">
                The Role of Motion
              </h2>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                Animation in interface design serves a functional purpose. It maintains spatial
                awareness, provides feedback, and creates a sense of continuity between states.
                But the moment animation becomes decorative, the moment a user notices
                the animation itself rather than the state change it represents, it has failed.
              </p>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                The ideal animation is one that would feel wrong if removed but invisible when
                present. A subtle ease-out on a dropdown, a gentle fade on a page transition,
                a smooth scroll to a target element. These are not embellishments. They are the
                connective tissue of digital space.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-5 tracking-tight">
                Conclusion
              </h2>
              <p className="text-foreground leading-[1.8] text-[17px] sm:text-lg">
                The pursuit of invisible design is not about minimalism for its own sake, nor
                about stripping away features until nothing is left. It is about understanding
                human behavior so deeply that every design decision serves the user without
                demanding their attention. It is about creating systems that feel like nothing
                at all, because the best interface is no interface.
              </p>
            </div>

            {/* Article Footer / Author Bio */}
            <div className="mt-14 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white ring-2 ring-background shadow-lg">
                  <User className="size-7" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Written by Elena Vasquez</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                    Design engineer building tools for creative teams. Writes about
                    design systems, interaction patterns, and the future of interfaces.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Content>

      </AppShell>
      <IndicatorPill>header-only &middot; no footer</IndicatorPill>
    </MotionProvider>
  );
}
