"use client";

import { useEffect, useState } from "react";
import { AppShell, Content, Header, MotionProvider } from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import { Moon, Pin, Square, SquareCheckBig, Sun } from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

const pinnedNotes = [
  {
    title: "Chapter 12 — the lighthouse scene",
    snippet:
      "Mara finally tells Ezra about the letters. Keep the storm offstage until the last paragraph — thunder as punctuation, not spectacle.",
    tag: "Novel",
    date: "Edited 2h ago",
  },
  {
    title: "Reading list — September",
    snippet:
      "The Bell Jar (reread), Piranesi, The Summer Book. Finish Piranesi before book club on the 12th — Elena will absolutely quiz me.",
    tag: "Books",
    date: "Edited yesterday",
  },
];

const notes = [
  {
    title: "Brown butter fix",
    snippet:
      "Nutmeg was too loud in the last batch. Halve it, brown the butter thirty seconds longer, rest the dough overnight.",
    tag: "Kitchen",
    date: "Aug 24",
  },
  {
    title: "Names for the ferry town",
    snippet:
      "Saltmere. Gullhaven. Brackwater — too grim? Saltmere keeps winning. It sounds like a place that has a bakery.",
    tag: "Novel",
    date: "Aug 22",
  },
  {
    title: "Piranesi — margins",
    snippet:
      "The flooded halls read like memory itself: rooms you can only reach when the tide is right.",
    tag: "Books",
    date: "Aug 21",
  },
  {
    title: "Miso soup tweak",
    snippet:
      "Add the miso off the heat. Every time I let it boil, the whole pot goes flat. Every time.",
    tag: "Kitchen",
    date: "Aug 19",
  },
  {
    title: "Ezra backstory",
    snippet:
      "He kept the lighthouse log for years after the light was automated. Nobody asked him to. That's the whole character.",
    tag: "Novel",
    date: "Aug 18",
  },
  {
    title: "Morning pages, week 3",
    snippet:
      "Three pages before coffee is a lie. One page after coffee is a habit. Adjust ambitions accordingly.",
    tag: "Journal",
    date: "Aug 16",
  },
  {
    title: "Borrowed from Elena",
    snippet:
      "The blue casserole lid, The Summer Book, the good scissors. Return all three before she notices. Especially the scissors.",
    tag: "Life",
    date: "Aug 12",
  },
];

const initialChecklist = [
  { label: "Gruyère wedge", done: true },
  { label: "Sourdough starter jar", done: true },
  { label: "Damson plums", done: false },
  { label: "Thyme, two bunches", done: false },
  { label: "Eggs from the corner stall", done: false },
];

const earlierNotes = [
  { title: "Rain sounds playlist", date: "Aug 8" },
  { title: "Chapter 11 — cut scenes", date: "Aug 5" },
  { title: "Tomato sauce ratio (3:1:1)", date: "Aug 2" },
  { title: "Library holds to collect", date: "Jul 29" },
  { title: "Gift ideas — Dad's birthday", date: "Jul 25" },
  { title: "Window seat measurements", date: "Jul 21" },
];

function TagChip({ tag }: { tag: string }) {
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {tag}
    </span>
  );
}

function NoteCard({ note }: { note: (typeof notes)[number] }) {
  return (
    <div className="mb-3 break-inside-avoid rounded-xl border bg-card p-4">
      <h3 className="text-sm font-semibold leading-snug">{note.title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {note.snippet}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <TagChip tag={note.tag} />
        <span className="text-[10px] text-muted-foreground">{note.date}</span>
      </div>
    </div>
  );
}

function ChecklistCard() {
  const [items, setItems] = useState(initialChecklist);

  const toggle = (label: string) =>
    setItems((current) =>
      current.map((item) =>
        item.label === label ? { ...item, done: !item.done } : item
      )
    );

  return (
    <div className="mb-3 break-inside-avoid rounded-xl border bg-card p-4">
      <h3 className="text-sm font-semibold leading-snug">Farmers market</h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => toggle(item.label)}
              className="flex w-full items-start gap-2 text-left text-xs leading-relaxed"
            >
              {item.done ? (
                <SquareCheckBig className="mt-0.5 size-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
              ) : (
                <Square className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
              )}
              <span
                className={
                  item.done
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between gap-2">
        <TagChip tag="Errands" />
        <span className="text-[10px] text-muted-foreground">Aug 27</span>
      </div>
    </div>
  );
}

export default function DarkModePage() {
  const [isDark, setIsDark] = useState(false);

  // This demo runs in its own iframe document, so flipping the root class
  // here is fully isolated from the docs site around it.
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Moon className="size-5 fill-amber-400/20 text-amber-500 dark:fill-amber-400/10 dark:text-amber-400" />
              Nocturne
            </span>
          }
          actions={
            <button
              type="button"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={toggleTheme}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-amber-500 dark:hover:text-amber-400"
            >
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          }
          title="All notes"
          subtitle="16 notes · synced just now"
        />

        <Content className="pb-16">
          <DemoHint>
            Flip the sun–moon toggle in the header — every surface re-themes
            instantly through the shared tokens.
          </DemoHint>

          <div className="px-4">
            <h2 className="flex items-center gap-1.5 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Pin className="size-3.5 text-amber-500 dark:text-amber-400" />
              Pinned
            </h2>
            <div className="mt-2.5 space-y-3">
              {pinnedNotes.map((note) => (
                <div key={note.title} className="rounded-xl border bg-card p-4">
                  <h3 className="text-sm font-semibold leading-snug">
                    {note.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {note.snippet}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <TagChip tag={note.tag} />
                    <span className="text-[10px] text-muted-foreground">
                      {note.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="pt-7 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              This month
            </h2>
            <div className="mt-2.5 columns-2 gap-3">
              <NoteCard note={notes[0]} />
              <ChecklistCard />
              {notes.slice(1).map((note) => (
                <NoteCard key={note.title} note={note} />
              ))}
            </div>

            <h2 className="pt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Earlier
            </h2>
            <ul className="mt-1 divide-y">
              {earlierNotes.map((note) => (
                <li
                  key={note.title}
                  className="flex items-baseline justify-between gap-3 py-3"
                >
                  <span className="truncate text-sm">{note.title}</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {note.date}
                  </span>
                </li>
              ))}
            </ul>

            <p className="pt-8 text-center text-xs text-muted-foreground">
              Notes stay put. Only the theme changes.
            </p>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
