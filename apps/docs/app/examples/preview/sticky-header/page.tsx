"use client";

import {
  AppShell,
  Content,
  Header,
  MotionProvider,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { MessageSquare, SquarePen } from "lucide-react";
import { Avatar, DemoHint } from "@/components/demos/demo-ui";

const pinned = [
  { name: "Maya", initials: "MC" },
  { name: "Dad", initials: "D" },
  { name: "Design crew", initials: "DC" },
];

const conversations = [
  { name: "Maya Chen", initials: "MC", preview: "Rooftop at 7 then? I'll bring the projector", time: "2m", unread: true },
  { name: "Dad", initials: "D", preview: "Sent you the ferry schedule for Saturday", time: "19m", unread: true },
  { name: "Design crew", initials: "DC", preview: "Priya: new lockups are in Figma, thoughts?", time: "24m", unread: true },
  { name: "Jonah Park", initials: "JP", preview: "ok that ramen place was worth the line", time: "1h" },
  { name: "Aisha Okafor", initials: "AO", preview: "Can you look at my PR when you get a sec?", time: "2h" },
  { name: "Sam Whitmore", initials: "SW", preview: "Voice memo · 0:42", time: "3h" },
  { name: "Book club", initials: "BC", preview: "Elena: moving chapter 12 to Thursday", time: "5h" },
  { name: "Nadia Rahman", initials: "NR", preview: "Tickets are on sale — want me to grab two?", time: "7h" },
  { name: "Leo Martins", initials: "LM", preview: "Landed. The customs line is eternal", time: "9h" },
  { name: "Mom", initials: "M", preview: "Call when you're free, nothing urgent", time: "12h" },
  { name: "Apartment 4B", initials: "4B", preview: "Rob: a package for you with the doorman", time: "Tue" },
  { name: "Grace Liu", initials: "GL", preview: "That essay you sent — so good", time: "Tue" },
  { name: "Tomás Vega", initials: "TV", preview: "Next week works, sending an invite", time: "Mon" },
  { name: "Run club", initials: "RC", preview: "Kat: Sunday 8 am, Prospect Park loop", time: "Mon" },
  { name: "Priya Natarajan", initials: "PN", preview: "The venue said 40 people max, fyi", time: "Mon" },
  { name: "Oscar Reyes", initials: "OR", preview: "Photo · IMG_2094", time: "Sun" },
  { name: "Hana Sato", initials: "HS", preview: "I owe you $18 for the cab, right?", time: "Sun" },
  { name: "Felix Braun", initials: "FB", preview: "Chess rematch this week?", time: "Sat" },
  { name: "Study group", initials: "SG", preview: "Marcus: notes from lecture 9 uploaded", time: "Sat" },
  { name: "Ivy Nguyen", initials: "IN", preview: "The plant you gave me is somehow alive", time: "Fri" },
  { name: "Dr. Patel's office", initials: "DP", preview: "Reminder: cleaning on Sep 3 at 9:30 am", time: "Fri" },
  { name: "Rosa Delgado", initials: "RD", preview: "Send me the sourdough starter schedule", time: "Aug 21" },
  { name: "Wes Coleman", initials: "WC", preview: "Fantasy draft is Sunday, don't forget", time: "Aug 20" },
  { name: "Camping trip", initials: "CT", preview: "Dana: I have the stove and two tents", time: "Aug 19" },
];

export default function StickyHeaderPage() {
  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="sticky"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <MessageSquare className="size-5 text-violet-600 dark:text-violet-400" />
              Chirp
            </span>
          }
          actions={
            <button
              type="button"
              aria-label="New message"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <SquarePen className="size-5" />
            </button>
          }
          title="Messages"
          subtitle="3 unread"
        />

        <Content className="pb-12">
          <DemoHint>
            Scroll the thread list — the bar stays put. Same pin as fixed,
            simpler layout.
          </DemoHint>

          <section>
            <h2 className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pinned
            </h2>
            <div className="flex gap-5 px-4 pb-3">
              {pinned.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  className="flex flex-col items-center gap-1.5"
                >
                  <Avatar initials={p.initials} className="size-14 text-sm" />
                  <span className="text-[11px] text-muted-foreground">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="mt-1 divide-y">
            {conversations.map((c) => (
              <button
                key={c.name}
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
              >
                <Avatar initials={c.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className={`truncate text-sm ${
                        c.unread ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {c.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {c.time}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-xs ${
                        c.unread
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {c.preview}
                    </p>
                    {c.unread && (
                      <span className="size-2 shrink-0 rounded-full bg-violet-500" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            End-to-end encrypted
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
