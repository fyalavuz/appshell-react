"use client";

import { useState } from "react";
import {
  AppShell,
  Avatar,
  BottomSheet,
  MotionProvider,
  SafeArea,
  SearchModal,
  Sidebar,
} from "appshell-react";
import { framerMotionAdapter } from "appshell-react/motion-framer";
import {
  Menu,
  Mountain,
  Search,
  TrendingUp,
  Waves,
} from "lucide-react";
import { DemoHint } from "@/components/demos/demo-ui";
import { cn } from "@/lib/utils";

interface Trail {
  id: string;
  name: string;
  distance: string;
  elevation: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  description: string;
}

const trails: Trail[] = [
  {
    id: "widowmaker",
    name: "Widowmaker Ridge",
    distance: "8.2 mi",
    elevation: "2,150 ft gain",
    difficulty: "Hard",
    description:
      "A steep ridge walk with panoramic views west over the valley — exposed along the last mile, bring poles.",
  },
  {
    id: "creekside",
    name: "Creekside Loop",
    distance: "3.4 mi",
    elevation: "420 ft gain",
    difficulty: "Easy",
    description:
      "A shaded loop along Alder Creek — a good quick morning hike, easy enough to bring the kids.",
  },
  {
    id: "saddle",
    name: "Saddle Pass",
    distance: "6.1 mi",
    elevation: "1,380 ft gain",
    difficulty: "Moderate",
    description:
      "Climbs to the saddle between Finch and Osprey peaks — wildflowers line the switchbacks through July.",
  },
  {
    id: "overlook",
    name: "Overlook Point",
    distance: "2.0 mi",
    elevation: "310 ft gain",
    difficulty: "Easy",
    description:
      "A short climb to the valley's best sunset spot — paved for the first half mile, gravel after.",
  },
];

const difficultyStyles: Record<Trail["difficulty"], string> = {
  Easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  Moderate: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  Hard: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
};

const pins = [
  { top: "28%", left: "22%" },
  { top: "40%", left: "58%" },
  { top: "58%", left: "34%" },
  { top: "70%", left: "68%" },
];

export default function NestedOverlaysPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(trails[0].id);

  const selected = trails.find((t) => t.id === selectedId)!;

  const openTrail = (id: string) => {
    setSelectedId(id);
    setSheetOpen(true);
  };

  // Nesting guarantees the open order, so the labels list itself in that
  // order — no separate bookkeeping needed to keep it legible.
  const openLayers = [
    sidebarOpen && "Saved trails",
    sheetOpen && "Trail details",
    searchOpen && "Search",
  ].filter((label): label is string => Boolean(label));

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell safeArea>
        {/* The "map" — a full-bleed, out-of-flow canvas the chrome floats over */}
        <div className="fixed inset-0 overflow-hidden bg-[#eef2ea] dark:bg-[#12160f]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(110,130,90,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,130,90,0.25) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            aria-hidden
            className="absolute -right-1/4 top-0 h-2/3 w-1/2 skew-x-12 bg-sky-200/60 dark:bg-sky-950/50"
          />
          {pins.map((pin, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute flex size-6 -translate-x-1/2 -translate-y-full items-center justify-center"
              style={{ top: pin.top, left: pin.left }}
            >
              <Mountain className="size-5 fill-amber-600/80 text-amber-800 drop-shadow" />
            </span>
          ))}
        </div>

        <SafeArea
          edges={["top"]}
          className="pointer-events-none fixed inset-x-0 top-0 z-10 flex-none"
        >
          <header className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3">
            <button
              type="button"
              aria-label="Open saved trails"
              onClick={() => setSidebarOpen(true)}
              className="flex size-9 items-center justify-center rounded-full bg-background/95 text-foreground shadow-md backdrop-blur"
            >
              <Menu className="size-5" />
            </button>
            <span className="rounded-full bg-background/95 px-4 py-1.5 text-sm font-bold tracking-tight shadow-md backdrop-blur">
              Ridgeline
            </span>
            <Avatar
              initials="JT"
              size="2.25rem"
              className="shadow-md ring-2 ring-background/80"
            />
          </header>

          <div className="pointer-events-auto px-4">
            <DemoHint className="border-background/40 bg-background/95 backdrop-blur">
              Open the trail list, tap a trail for its details, then search
              from inside the sheet — each layer stacks on the one before it.
              Escape (or Android back) closes just the top layer.
            </DemoHint>

            <div className="mb-1 flex flex-wrap items-center gap-1.5 rounded-lg bg-background/90 px-3 py-2 text-xs shadow-sm backdrop-blur">
              <span className="font-medium text-muted-foreground">
                Open layers:
              </span>
              {openLayers.length === 0 ? (
                <span className="text-muted-foreground">none</span>
              ) : (
                openLayers.map((label, i) => (
                  <span
                    key={label}
                    className={cn(
                      "rounded-full px-2 py-0.5 font-medium",
                      i === openLayers.length - 1
                        ? "bg-amber-600 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                ))
              )}
            </div>
          </div>
        </SafeArea>

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          aria-label="Saved trails"
          topContent={
            <div className="flex items-center gap-2 p-4 pb-3">
              <Mountain className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <span className="truncate font-bold tracking-tight">
                Saved trails
              </span>
            </div>
          }
        >
          <div className="divide-y">
            {trails.map((trail) => (
              <button
                key={trail.id}
                type="button"
                onClick={() => openTrail(trail.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-muted/60"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                  <TrendingUp className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {trail.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {trail.distance} · {trail.elevation}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Sidebar>

        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          snapPoints={[0.5, 0.85]}
          aria-label="Trail details"
        >
          <div className="px-4 pb-2">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold tracking-tight">
                {selected.name}
              </h2>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
                  difficultyStyles[selected.difficulty]
                )}
              >
                {selected.difficulty}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {selected.distance} · {selected.elevation}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 bg-muted px-4 py-8 text-xs text-muted-foreground">
            <Waves className="size-4" /> Trail map preview
          </div>
          <p className="px-4 py-3 text-sm text-muted-foreground">
            {selected.description}
          </p>
          <div className="px-4 pb-6">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium"
            >
              <Search className="size-4" /> Search other trails
            </button>
          </div>
        </BottomSheet>

        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          placeholder="Search trails"
          aria-label="Search trails"
          onSubmit={() => setSearchOpen(false)}
        >
          {(q) => {
            const matches = trails.filter((t) =>
              t.name.toLowerCase().includes(q.toLowerCase())
            );
            if (q && matches.length === 0) {
              return (
                <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Nothing for &ldquo;{q}&rdquo; — try another name.
                </p>
              );
            }
            return (
              <div className="py-1">
                {matches.map((trail) => (
                  <button
                    key={trail.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(trail.id);
                      setSearchOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-start transition-colors hover:bg-muted/60"
                  >
                    <TrendingUp className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {trail.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {trail.distance} · {trail.difficulty}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            );
          }}
        </SearchModal>
      </AppShell>
    </MotionProvider>
  );
}
