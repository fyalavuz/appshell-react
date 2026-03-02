"use client";

import { useState } from "react";
import { AppShell, Content, MotionProvider, Header, Footer } from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Phone, Video, MoreVertical, ChevronLeft, Check, CheckCheck, Send, Paperclip, Smile } from "lucide-react";
import { IndicatorPill } from "../_shared/indicator-pill";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  time: string;
  read: boolean;
}

const messages: Message[] = [
  { id: 1, text: "Hey! Are you coming to the design review today?", sender: "them", time: "9:00 AM", read: true },
  { id: 2, text: "Yes, I'll be there! Just finishing up the footer component docs.", sender: "me", time: "9:02 AM", read: true },
  { id: 3, text: "Perfect. We need to go over the variant system.", sender: "them", time: "9:03 AM", read: true },
  { id: 4, text: "I've been working on the tab-bar variant with auto-hide behavior. It feels really smooth now.", sender: "me", time: "9:05 AM", read: true },
  { id: 5, text: "Nice! Did you test it on mobile?", sender: "them", time: "9:06 AM", read: true },
  { id: 6, text: "Yep, tested on iOS and Android. The safe area insets are handled correctly too.", sender: "me", time: "9:08 AM", read: true },
  { id: 7, text: "What about the floating variant? I saw the PR.", sender: "them", time: "9:10 AM", read: true },
  { id: 8, text: "The floating variant supports three positions: center, left, and right. Center is the default for FAB-style buttons.", sender: "me", time: "9:12 AM", read: true },
  { id: 9, text: "That's great. Can we customize the animation?", sender: "them", time: "9:14 AM", read: true },
  { id: 10, text: "The motion adapter handles all animations. We're using framer-motion by default but it's pluggable.", sender: "me", time: "9:15 AM", read: true },
  { id: 11, text: "Love the architecture decision there. Keeps the bundle small for those who don't need animations.", sender: "them", time: "9:17 AM", read: true },
  { id: 12, text: "Exactly! The mini variant is super compact too. Only 48px height, perfect for chat input bars.", sender: "me", time: "9:19 AM", read: true },
  { id: 13, text: "Speaking of which, can you show a demo of the mini variant in the examples app?", sender: "them", time: "9:20 AM", read: true },
  { id: 14, text: "Already on it! This page you're looking at IS the mini footer demo.", sender: "me", time: "9:22 AM", read: true },
  { id: 15, text: "Ha, meta. I like it. What about badge support?", sender: "them", time: "9:23 AM", read: true },
  { id: 16, text: "Badges are supported on FooterItem in the tab-bar variant. They show a count with a destructive color background.", sender: "me", time: "9:25 AM", read: true },
  { id: 17, text: "And the auto-hide behavior works across all variants?", sender: "them", time: "9:26 AM", read: true },
  { id: 18, text: "It can be applied to any variant, but it's most useful on tab-bar. The floating variant auto-hides by animating opacity and position.", sender: "me", time: "9:28 AM", read: true },
  { id: 19, text: "Sounds like we're in good shape for the review. See you at 2!", sender: "them", time: "9:30 AM", read: true },
  { id: 20, text: "See you then! I'll have the Storybook stories ready too.", sender: "me", time: "9:31 AM", read: false },
];

function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm ${
          isMe
            ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-sm"
            : "bg-card/90 backdrop-blur-sm text-foreground rounded-bl-sm ring-1 ring-black/[0.04]"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div
          className={`mt-1.5 flex items-center justify-end gap-1 ${
            isMe ? "text-white/60" : "text-muted-foreground/70"
          }`}
        >
          <span className="text-[10px]">{message.time}</span>
          {isMe && (
            message.read ? (
              <CheckCheck className="size-3" />
            ) : (
              <Check className="size-3" />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function MiniFooterPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell>
        <Header
          behavior="fixed"
          theme="light"
          className="bg-card/80 backdrop-blur-xl border-b border-border"
          logo={
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-full p-1 hover:bg-accent transition-colors -ml-1"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-xs font-bold text-white shadow-sm shadow-emerald-200">
                    AK
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight text-foreground">
                    Alex Kim
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium">online</p>
                </div>
              </div>
            </div>
          }
          actions={
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                <Phone className="size-[18px] text-muted-foreground" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                <Video className="size-[18px] text-muted-foreground" />
              </button>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                <MoreVertical className="size-[18px] text-muted-foreground" />
              </button>
            </div>
          }
        />

        <Content className="pb-16">
          {/* Chat wallpaper background */}
          <div
            className="fixed inset-0 -z-10"
            style={{
              backgroundColor: "#eae6df",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c3ba' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Date separator */}
          <div className="flex items-center justify-center py-5">
            <div className="flex items-center gap-2 rounded-lg bg-white/80 backdrop-blur-sm px-4 py-1.5 shadow-sm ring-1 ring-black/[0.04]">
              <span className="text-[11px] font-semibold text-muted-foreground tracking-wide uppercase">
                Today
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 px-4 pb-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </Content>

        <Footer variant="mini" className="border-t-0 bg-card/90 backdrop-blur-xl shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
          <div className="flex flex-1 items-center gap-1.5">
            <button
              type="button"
              className="shrink-0 rounded-full p-1.5 text-muted-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
            >
              <Smile className="size-5" />
            </button>
            <button
              type="button"
              className="shrink-0 rounded-full p-1.5 text-muted-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
            >
              <Paperclip className="size-5" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              aria-label="Type a message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:border-emerald-300 focus:bg-background focus:ring-2 focus:ring-emerald-500/10 transition-all"
            />
            <button
              type="button"
              className="shrink-0 flex items-center justify-center size-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-200 hover:shadow-md hover:shadow-emerald-200 active:scale-95 transition-all"
            >
              <Send className="size-4 translate-x-[0.5px]" />
            </button>
          </div>
        </Footer>

      </AppShell>

      <IndicatorPill>variant=&quot;mini&quot;</IndicatorPill>
    </MotionProvider>
  );
}
