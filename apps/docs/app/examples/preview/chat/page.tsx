"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AppShell,
  Avatar,
  Content,
  Header,
  MotionProvider,
  useKeyboardInset,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Send } from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";
import { cn } from "@/lib/utils";

type Sender = "you" | "mara" | "iris" | "jonas";

const members: Record<
  Exclude<Sender, "you">,
  { name: string; initials: string; tint: string }
> = {
  mara: {
    name: "Mara",
    initials: "M",
    tint: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
  },
  iris: {
    name: "Iris",
    initials: "I",
    tint: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
  jonas: {
    name: "Jonas",
    initials: "J",
    tint: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
};

interface Message {
  id: number;
  sender: Sender;
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: "mara", text: "Found a hut that doesn't need reservations for night 2 🏔️" },
  { id: 2, sender: "mara", text: "Falkenhütte — only 6km off the main trail" },
  { id: 3, sender: "jonas", text: "That solves the water resupply problem too" },
  { id: 4, sender: "iris", text: "How much extra elevation gain is that?" },
  { id: 5, sender: "mara", text: "About 300m — nothing crazy" },
  { id: 6, sender: "you", text: "I'm in. What about the pass on day 3 if the weather turns?" },
  { id: 7, sender: "jonas", text: "There's a lower alternate — adds 2 hours but stays under treeline" },
  { id: 8, sender: "iris", text: "Let's each carry a printed map just in case" },
  { id: 9, sender: "mara", text: "Agreed, I'll bring copies for everyone" },
  { id: 10, sender: "jonas", text: "Sunday evening works for a gear check call" },
];

function Bubble({
  message,
  showMeta,
}: {
  message: Message;
  showMeta: boolean;
}) {
  const isYou = message.sender === "you";
  const member = message.sender === "you" ? null : members[message.sender];

  return (
    <div
      className={cn(
        "flex gap-2 px-4",
        isYou ? "justify-end" : "justify-start",
        showMeta ? "mt-3" : "mt-0.5"
      )}
    >
      {!isYou && (
        <div className="flex w-7 shrink-0 items-end">
          {showMeta && (
            <Avatar initials={member!.initials} size="1.75rem" className={member!.tint} />
          )}
        </div>
      )}
      <div className={cn("flex max-w-[75%] flex-col", isYou ? "items-end" : "items-start")}>
        {showMeta && !isYou && (
          <span className="mb-0.5 px-1 text-xs font-medium text-muted-foreground">
            {member!.name}
          </span>
        )}
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isYou
              ? "rounded-br-sm bg-sky-600 text-white"
              : "rounded-bl-sm bg-muted"
          )}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

function Composer({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: (e: FormEvent<HTMLFormElement>) => void;
}) {
  // Pixels the on-screen keyboard covers right now — 0 when it's down.
  const keyboardInset = useKeyboardInset();

  return (
    <form
      onSubmit={onSend}
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur-xl"
      style={{
        // Rise above the keyboard when it's up; otherwise clear the home
        // indicator like the library's own Footer does.
        paddingBottom:
          keyboardInset > 0
            ? keyboardInset
            : "var(--appshell-safe-area-inset-bottom, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-3 py-2.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Message the group"
          aria-label="Message"
          className="w-full rounded-full bg-muted px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!value.trim()}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white transition-opacity disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </div>
    </form>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: "you", text }]);
    setDraft("");
  };

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex -space-x-2.5">
              <Avatar
                initials="M"
                size="1.65rem"
                className="ring-2 ring-background bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300"
              />
              <Avatar
                initials="I"
                size="1.65rem"
                className="ring-2 ring-background bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
              />
              <Avatar
                initials="J"
                size="1.65rem"
                className="ring-2 ring-background bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
              />
            </span>
          }
          title="Alpine Traverse"
          subtitle="Mara, Iris, Jonas · trip planning"
        />

        <Content className="mx-auto w-full max-w-2xl pb-24 sm:border-x">
          <DemoHint>
            Tap the composer on a phone — it rises above the keyboard instead
            of hiding underneath it.
          </DemoHint>

          <div className="pb-2">
            {messages.map((m, i) => (
              <Bubble
                key={m.id}
                message={m}
                showMeta={i === 0 || messages[i - 1].sender !== m.sender}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        </Content>

        <Composer value={draft} onChange={setDraft} onSend={send} />
      </AppShell>
    </MotionProvider>
  );
}
