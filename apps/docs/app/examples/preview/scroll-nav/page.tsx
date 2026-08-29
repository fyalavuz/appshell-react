"use client";

import { useState } from "react";
import {
  AppShell,
  Content,
  Header,
  MotionProvider,
  ScrollNav,
  ScrollNavItem,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Aperture,
  Building2,
  Camera,
  Film,
  Heart,
  Mountain,
  Plane,
  Search,
  User,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";

type Category =
  | "All"
  | "Landscape"
  | "Portrait"
  | "Street"
  | "Film"
  | "Aerial"
  | "Studio";

const filters: Category[] = [
  "All",
  "Landscape",
  "Portrait",
  "Street",
  "Film",
  "Aerial",
  "Studio",
];

const categoryIcons = {
  Landscape: Mountain,
  Portrait: User,
  Street: Building2,
  Film: Film,
  Aerial: Plane,
  Studio: Camera,
} as const;

const hues = {
  cyan: "bg-cyan-100/70 text-cyan-400 dark:bg-cyan-950/40 dark:text-cyan-700",
  sky: "bg-sky-100/60 text-sky-400 dark:bg-sky-950/40 dark:text-sky-700",
  slate: "bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-600",
  zinc: "bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600",
  stone: "bg-stone-100 text-stone-400 dark:bg-stone-900 dark:text-stone-600",
} as const;

const photos: {
  title: string;
  cat: Exclude<Category, "All">;
  likes: number;
  hue: keyof typeof hues;
  aspect: string;
}[] = [
  { title: "Ridge at dawn", cat: "Landscape", likes: 412, hue: "cyan", aspect: "aspect-[3/4]" },
  { title: "Mara, window light", cat: "Portrait", likes: 268, hue: "slate", aspect: "aspect-[4/5]" },
  { title: "Ninth Ave, 7:42am", cat: "Street", likes: 189, hue: "zinc", aspect: "aspect-square" },
  { title: "Harbor from 400 ft", cat: "Aerial", likes: 534, hue: "sky", aspect: "aspect-[4/3]" },
  { title: "HP5 · roll 12, frame 3", cat: "Film", likes: 147, hue: "stone", aspect: "aspect-[3/4]" },
  { title: "Backdrop test, set B", cat: "Studio", likes: 96, hue: "slate", aspect: "aspect-[4/5]" },
  { title: "Fog over the pass", cat: "Landscape", likes: 723, hue: "sky", aspect: "aspect-square" },
  { title: "Jonas, profile study", cat: "Portrait", likes: 204, hue: "stone", aspect: "aspect-[3/4]" },
  { title: "Crosswalk umbrellas", cat: "Street", likes: 318, hue: "cyan", aspect: "aspect-[4/5]" },
  { title: "Delta braids, low tide", cat: "Aerial", likes: 461, hue: "cyan", aspect: "aspect-square" },
  { title: "Portra 400 · the lake", cat: "Film", likes: 385, hue: "zinc", aspect: "aspect-[4/3]" },
  { title: "Two-light setup", cat: "Studio", likes: 122, hue: "zinc", aspect: "aspect-square" },
  { title: "Dunes after rain", cat: "Landscape", likes: 296, hue: "stone", aspect: "aspect-[4/5]" },
  { title: "Night market vendor", cat: "Street", likes: 251, hue: "slate", aspect: "aspect-[3/4]" },
  { title: "Runway 27, final", cat: "Aerial", likes: 178, hue: "slate", aspect: "aspect-[4/3]" },
  { title: "Tri-X · rain on glass", cat: "Film", likes: 209, hue: "sky", aspect: "aspect-[4/5]" },
  { title: "Elsa, catalog shoot", cat: "Studio", likes: 143, hue: "cyan", aspect: "aspect-[3/4]" },
  { title: "Birch stand, first snow", cat: "Landscape", likes: 587, hue: "zinc", aspect: "aspect-square" },
];

export default function ScrollNavPage() {
  const [filter, setFilter] = useState<Category>("All");

  const visible =
    filter === "All" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        <Header
          behavior="fixed"
          theme="light"
          logo={
            <span className="flex items-center gap-2 font-bold tracking-tight">
              <Aperture className="size-5 text-cyan-600 dark:text-cyan-400" />
              Lens
            </span>
          }
          actions={
            <button
              type="button"
              aria-label="Search photos"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <Search className="size-5" />
            </button>
          }
          searchContent={
            <ScrollNav className="px-4 pb-3">
              {filters.map((f) => (
                <ScrollNavItem
                  key={f}
                  label={f}
                  active={filter === f}
                  onClick={() => setFilter(f)}
                  className={
                    filter === f
                      ? "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-cyan-950"
                      : undefined
                  }
                />
              ))}
            </ScrollNav>
          }
        />

        <Content className="mx-auto w-full max-w-5xl pb-16">
          <DemoHint>
            Swipe the pills sideways, then pick a category — the grid filters
            instantly.
          </DemoHint>

          <p className="px-4 pb-3 text-xs text-muted-foreground">
            {visible.length} {visible.length === 1 ? "photo" : "photos"}
            {filter !== "All" && <> · {filter}</>}
          </p>

          <div className="columns-2 gap-3 px-4 sm:columns-3 lg:columns-4">
            {visible.map((photo) => {
              const Icon = categoryIcons[photo.cat];
              return (
                <figure key={photo.title} className="mb-3 break-inside-avoid">
                  <div
                    className={`flex items-center justify-center rounded-xl ${photo.aspect} ${hues[photo.hue]}`}
                  >
                    <Icon className="size-7" strokeWidth={1.5} aria-hidden />
                  </div>
                  <figcaption className="mt-1.5 flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-medium">
                      {photo.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-[11px] tabular-nums text-muted-foreground">
                      <Heart className="size-3" aria-hidden />
                      {photo.likes}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            Shot on assignment · Winter–Spring 2026
          </p>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
